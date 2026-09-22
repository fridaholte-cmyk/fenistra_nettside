import { Injectable, computed, signal } from '@angular/core';

/**
 * Cookie consent.
 *
 * One single choice: the visitor either accepts or rejects all optional cookies
 * (statistics and marketing together). "Nødvendige" is always on and is not part of
 * the choice. Every script that sets non-essential cookies (analytics, marketing pixels,
 * HubSpot tracking code etc.) MUST be loaded through `whenGranted()`, never directly in
 * index.html:
 *
 *   consent.whenGranted(() => loadScript('https://…'));
 *
 * Withdrawing consent deletes the known optional cookies and reloads the page,
 * which is the only reliable way to stop third-party scripts that are already running.
 */
export interface ConsentState {
  /** consent to all optional cookies (statistics + marketing) */
  granted: boolean;
  version: number;
  updatedAt: string;
}

const STORAGE_KEY = 'fenistra_cookie_consent';
// Bump when purposes or vendors change materially, so everyone is asked again.
// v2: the two categories (statistikk/markedsforing) were merged into one choice.
const CONSENT_VERSION = 2;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

// Cookie name prefixes set by the vendors we may use for optional purposes.
const OPTIONAL_COOKIE_PREFIXES = [
  '_ga', '_gid', '_gat', '_hj', '_clck', '_clsk', 'CLID', 'MUID',
  '__hstc', '__hssc', '__hssrc', 'hubspotutk', 'messagesUtk', '__hs',
  '_fbp', '_fbc', '_gcl', 'li_', 'lidc', 'bcookie', 'AnalyticsSyncHistory', 'UserMatchHistory',
  'ELOQUA', 'ELQSTATUS',
];

@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly state = signal<ConsentState | null>(null);
  /** false until init() has read the stored choice in the browser (never true during prerendering) */
  readonly ready = signal(false);
  readonly settingsOpen = signal(false);
  readonly needsChoice = computed(() => this.ready() && this.state() === null);

  private pending: (() => void)[] = [];

  /** Called once in the browser after the first render. */
  init(): void {
    if (this.ready()) return;
    const stored = this.load();
    this.state.set(stored);
    this.ready.set(true);
    if (stored) this.flushPending(stored);
  }

  granted(): boolean {
    return this.state()?.granted === true;
  }

  /** Runs `run` now if consent is given, otherwise as soon as it is given (never if it isn't). */
  whenGranted(run: () => void): void {
    if (this.granted()) run();
    else this.pending.push(run);
  }

  acceptAll(): void {
    this.save(true);
  }

  rejectAll(): void {
    this.save(false);
  }

  save(granted: boolean): void {
    const prev = this.state();
    const next: ConsentState = { granted, version: CONSENT_VERSION, updatedAt: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: choice still applies for this page view */
    }
    this.state.set(next);
    this.settingsOpen.set(false);

    if (prev?.granted && !granted) {
      deleteCookies(OPTIONAL_COOKIE_PREFIXES);
      location.reload();
      return;
    }

    this.flushPending(next);
  }

  private flushPending(s: ConsentState): void {
    if (!s.granted) return;
    const ready = this.pending;
    this.pending = [];
    ready.forEach((run) => run());
  }

  openSettings(): void {
    this.settingsOpen.set(true);
  }

  private load(): ConsentState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw) as ConsentState;
      const expired = Date.now() - new Date(s.updatedAt).getTime() > MAX_AGE_MS;
      if (s.version !== CONSENT_VERSION || expired || typeof s.granted !== 'boolean') {
        return null;
      }
      return s;
    } catch {
      return null;
    }
  }
}

function deleteCookies(prefixes: string[]): void {
  const names = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(Boolean);
  const host = location.hostname;
  const parts = host.split('.');
  // host itself, plus every parent domain (www.fenistra.no -> .fenistra.no)
  const domains = [''];
  for (let i = 0; i < parts.length - 1; i++) domains.push('; domain=.' + parts.slice(i).join('.'));
  for (const name of names) {
    if (!prefixes.some((p) => name.startsWith(p))) continue;
    for (const d of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
    }
  }
}
