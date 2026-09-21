import { Injectable, computed, signal } from '@angular/core';

/**
 * Cookie consent.
 *
 * "Nødvendige" is always on and is not a category here. Every script that sets
 * non-essential cookies (analytics, marketing pixels, HubSpot tracking code etc.)
 * MUST be loaded through `whenGranted()`, never directly in index.html:
 *
 *   consent.whenGranted('statistikk', () => loadScript('https://…'));
 *
 * Withdrawing consent deletes the category's known cookies and reloads the page,
 * which is the only reliable way to stop third-party scripts that are already running.
 */
export type ConsentCategory = 'statistikk' | 'markedsforing';

export interface ConsentState {
  statistikk: boolean;
  markedsforing: boolean;
  version: number;
  updatedAt: string;
}

const STORAGE_KEY = 'fenistra_cookie_consent';
// Bump when categories or vendors change materially, so everyone is asked again.
const CONSENT_VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

// Cookie name prefixes set by the vendors we may use, per category.
const COOKIE_PREFIXES: Record<ConsentCategory, string[]> = {
  statistikk: ['_ga', '_gid', '_gat', '_hj', '_clck', '_clsk', 'CLID', 'MUID'],
  markedsforing: [
    '__hstc', '__hssc', '__hssrc', 'hubspotutk', 'messagesUtk', '__hs',
    '_fbp', '_fbc', '_gcl', 'li_', 'lidc', 'bcookie', 'AnalyticsSyncHistory', 'UserMatchHistory',
    'ELOQUA', 'ELQSTATUS',
  ],
};

@Injectable({ providedIn: 'root' })
export class ConsentService {
  readonly state = signal<ConsentState | null>(null);
  /** false until init() has read the stored choice in the browser (never true during prerendering) */
  readonly ready = signal(false);
  readonly settingsOpen = signal(false);
  readonly needsChoice = computed(() => this.ready() && this.state() === null);

  private pending: { category: ConsentCategory; run: () => void }[] = [];

  /** Called once in the browser after the first render. */
  init(): void {
    if (this.ready()) return;
    const stored = this.load();
    this.state.set(stored);
    this.ready.set(true);
    if (stored) this.flushPending(stored);
  }

  has(category: ConsentCategory): boolean {
    return this.state()?.[category] === true;
  }

  /** Runs `run` now if consent is given, otherwise as soon as it is given (never if it isn't). */
  whenGranted(category: ConsentCategory, run: () => void): void {
    if (this.has(category)) run();
    else this.pending.push({ category, run });
  }

  acceptAll(): void {
    this.save({ statistikk: true, markedsforing: true });
  }

  rejectAll(): void {
    this.save({ statistikk: false, markedsforing: false });
  }

  save(choice: Pick<ConsentState, ConsentCategory>): void {
    const prev = this.state();
    const next: ConsentState = { ...choice, version: CONSENT_VERSION, updatedAt: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage blocked: choice still applies for this page view */
    }
    this.state.set(next);
    this.settingsOpen.set(false);

    const revoked = (Object.keys(COOKIE_PREFIXES) as ConsentCategory[]).filter((c) => prev?.[c] && !next[c]);
    if (revoked.length) {
      revoked.forEach((c) => deleteCookies(COOKIE_PREFIXES[c]));
      location.reload();
      return;
    }

    this.flushPending(next);
  }

  private flushPending(s: ConsentState): void {
    const ready = this.pending.filter((p) => s[p.category]);
    this.pending = this.pending.filter((p) => !s[p.category]);
    ready.forEach((p) => p.run());
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
      if (s.version !== CONSENT_VERSION || expired || typeof s.statistikk !== 'boolean' || typeof s.markedsforing !== 'boolean') {
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
