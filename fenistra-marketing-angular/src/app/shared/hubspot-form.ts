declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: { portalId: string; formId: string; region: string; target: string; onFormReady?: () => void; onFormSubmitted?: () => void }) => void;
      };
    };
  }
}

const HUBSPOT_SCRIPT_SRC = '//js-eu1.hsforms.net/forms/embed/v2.js';
export const HUBSPOT_PORTAL_ID = '139505393';
const HUBSPOT_FORM_ID = 'f751c7f2-91b2-4450-a0fc-b84b6f736224';
const HUBSPOT_REGION = 'eu1';

let hubspotScriptPromise: Promise<void> | null = null;

function loadHubspotScript(): Promise<void> {
  if (window.hbspt) return Promise.resolve();
  if (hubspotScriptPromise) return hubspotScriptPromise;
  hubspotScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = HUBSPOT_SCRIPT_SRC;
    script.charset = 'utf-8';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load HubSpot forms script'));
    document.body.appendChild(script);
  });
  return hubspotScriptPromise;
}

export type HubspotFormState = 'loading' | 'ready' | 'failed';

// if the form isn't there by then (blocked by an ad blocker, network down), show the fallback
const FORM_TIMEOUT_MS = 12000;

/**
 * `formName` is reported to GTM as the generate_lead event's form_name (conversion tracking).
 * Resolves 'ready' when the form is rendered, or 'failed' if it can't be loaded.
 */
export function createHubspotForm(targetSelector: string, formName: string): Promise<HubspotFormState> {
  if (typeof window === 'undefined') return Promise.resolve('loading'); // prerendering
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve('failed'), FORM_TIMEOUT_MS);
    loadHubspotScript()
      .then(() => {
        window.hbspt?.forms.create({
          portalId: HUBSPOT_PORTAL_ID,
          formId: HUBSPOT_FORM_ID,
          region: HUBSPOT_REGION,
          target: targetSelector,
          onFormReady: () => {
            clearTimeout(timer);
            resolve('ready');
          },
          onFormSubmitted: () => window.dataLayer?.push({ event: 'generate_lead', form_name: formName }),
        });
      })
      .catch(() => {
        clearTimeout(timer);
        resolve('failed');
      });
  });
}
