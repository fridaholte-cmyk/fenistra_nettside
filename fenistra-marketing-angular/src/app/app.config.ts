import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { GlobalErrorHandler, isChunkLoadError, reloadForNewVersion } from './shared/global-error-handler';
import { PREVIEW_GATE_ENABLED } from './shared/preview-gate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // a page whose code can't be loaded (tab opened before a new deploy) is loaded fresh instead of showing 500
    provideRouter(routes, withNavigationErrorHandler((e) => {
      if (typeof window !== 'undefined' && isChunkLoadError(e.error)) reloadForNewVersion(e.url);
    })),
    // Reuse the prerendered HTML instead of re-rendering it (off while the preview gate is on)
    ...(PREVIEW_GATE_ENABLED ? [] : [provideClientHydration(withEventReplay())]),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
};
