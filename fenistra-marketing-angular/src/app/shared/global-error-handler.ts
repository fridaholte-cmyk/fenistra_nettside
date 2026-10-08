import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

/**
 * After a new deploy the file names of the lazy-loaded pages change. A tab that was opened before the
 * deploy still points at the old files, so the next page change fails to load its code. That is not a
 * real error: loading the page again fetches the new version.
 */
export function isChunkLoadError(error: unknown): boolean {
  const message = String((error as { message?: string })?.message ?? error ?? '');
  return /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|Loading chunk [\w-]+ failed|ChunkLoadError/i.test(message);
}

const RELOAD_KEY = 'fenistra_chunk_reload';
let reloading = false;

/** Full page load of `url` (a router URL such as /pakke-resultat), at most once per minute to avoid loops. */
export function reloadForNewVersion(url: string): boolean {
  if (reloading) return true; // the router and the error handler can both report the same failure
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 60_000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    /* storage blocked: reload anyway */
  }
  reloading = true;
  // relative to <base href>, so it also works under /Fenistra-Marketing/
  window.location.assign(new URL(url.replace(/^\//, ''), document.baseURI).href);
  return true;
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: unknown): void {
    console.error(error);
    if (typeof window !== 'undefined' && isChunkLoadError(error)) {
      const router = this.injector.get(Router, null);
      const target = router?.getCurrentNavigation()?.finalUrl?.toString() ?? router?.url ?? '/';
      if (reloadForNewVersion(target)) return;
    }
    try {
      const router = this.injector.get(Router);
      if (!router.url.startsWith('/500')) {
        router.navigateByUrl('/500');
      }
    } catch {
      /* router unavailable this early, or navigation itself failed */
    }
  }
}
