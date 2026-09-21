import { ApplicationConfig, ErrorHandler, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { PREVIEW_GATE_ENABLED } from './shared/preview-gate';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Reuse the prerendered HTML instead of re-rendering it (off while the preview gate is on)
    ...(PREVIEW_GATE_ENABLED ? [] : [provideClientHydration(withEventReplay())]),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]
};
