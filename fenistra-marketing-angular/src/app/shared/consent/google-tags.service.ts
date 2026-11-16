import { Injectable, PLATFORM_ID, effect, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ConsentService, ConsentState } from './consent.service';
import { startSiteEvents } from './site-events';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Tag Manager container (GTM-XXXXXXX), owned by the ads/analytics agency. Empty = no Google tags at all.
// GA4, Google Ads conversions etc. are configured inside GTM, not here.
const GTM_ID = 'GTM-P9894S36';

/**
 * Google Consent Mode v2, "basic" mode: GTM is not loaded at all until the visitor has
 * accepted optional cookies, so nothing is sent to Google without consent.
 *
 * Events for GTM triggers (pushed to dataLayer, harmless while GTM is not loaded):
 *   virtual_page_view  { page_path, page_title }   on every route change (SPA)
 *   generate_lead      { form_name }                HubSpot form submitted
 *   chat_question      { answered, page_path }      question asked in the chat
 *   chat_open          { page_path }                the chat window is opened
 *   form_start         { form_name }                first field of a HubSpot form is touched
 *   site_search        { search_term, results_count }  search in the menu, after a pause in typing
 *   cta_click, contact_click, outbound_click, file_download   see site-events.ts
 */
@Injectable({ providedIn: 'root' })
export class GoogleTagsService {
  private readonly consent = inject(ConsentService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private loaded = false;

  constructor() {
    if (!this.isBrowser) return;
    window.dataLayer = window.dataLayer || [];
    // gtag() must push the `arguments` object itself, that is what Consent Mode expects
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      wait_for_update: 500,
    });

    startSiteEvents((event, params) => this.push(event, params));

    effect(() => {
      const s = this.consent.state();
      if (!s) return;
      window.gtag!('consent', 'update', toGoogleConsent(s));
      if (s.granted) this.loadGtm();
    });
  }

  push(event: string, params: Record<string, unknown> = {}): void {
    if (!this.isBrowser) return;
    window.dataLayer!.push({ event, ...params });
  }

  private loadGtm(): void {
    if (this.loaded || !GTM_ID) return;
    this.loaded = true;
    window.dataLayer!.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.appendChild(script);
  }
}

function toGoogleConsent(s: ConsentState): Record<string, 'granted' | 'denied'> {
  const g = (on: boolean) => (on ? 'granted' : 'denied');
  return {
    analytics_storage: g(s.granted),
    ad_storage: g(s.granted),
    ad_user_data: g(s.granted),
    ad_personalization: g(s.granted),
  };
}
