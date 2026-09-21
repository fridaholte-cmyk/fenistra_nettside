declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: { portalId: string; formId: string; region: string; target: string; onFormSubmitted?: () => void }) => void;
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

/** `formName` is reported to GTM as the generate_lead event's form_name (conversion tracking). */
export function createHubspotForm(targetSelector: string, formName: string): void {
  if (typeof window === 'undefined') return; // prerendering
  loadHubspotScript().then(() => {
    window.hbspt?.forms.create({
      portalId: HUBSPOT_PORTAL_ID,
      formId: HUBSPOT_FORM_ID,
      region: HUBSPOT_REGION,
      target: targetSelector,
      onFormSubmitted: () => window.dataLayer?.push({ event: 'generate_lead', form_name: formName }),
    });
  });
}
