declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: { portalId: string; formId: string; region: string; target: string; onFormReady?: (form?: unknown) => void; onFormSubmitted?: () => void }) => void;
      };
    };
  }
}

const HUBSPOT_SCRIPT_SRC = '//js-eu1.hsforms.net/forms/embed/v2.js';
export const HUBSPOT_PORTAL_ID = '139505393';
// «Book et møte»
export const HUBSPOT_FORM_ID = 'f751c7f2-91b2-4450-a0fc-b84b6f736224';
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

/**
 * A tighter version of HubSpot's default form, injected into the form's iframe (same origin) so the
 * booking form fits beside the text without scrolling. Only cosmetic: if HubSpot changes its
 * markup the form still works, it just gets its default height back.
 */
const COMPACT_FORM_CSS = `
  .hs-form-field{margin-bottom:10px;}
  .hs-form-field > label{margin-bottom:2px;}
  textarea.hs-input{min-height:54px;height:54px;}
  .legal-consent-container,
  .legal-consent-container p,
  .legal-consent-container label,
  .legal-consent-container span{font-size:12.5px;line-height:1.4;}
  .legal-consent-container p{margin:0;}
  .legal-consent-container .hs-form-field{margin-bottom:0;}
  .hs_submit{margin-top:2px;}

  @supports selector(:has(*)) {
    /* two fields per row, with the long fields across the full width */
    form{display:grid;grid-template-columns:1fr 1fr;column-gap:16px;align-items:start;}
    form > fieldset{max-width:none;width:auto;}
    form > fieldset .input{margin-right:0;}
    form > fieldset.form-columns-2{grid-column:1 / -1;}
    form > fieldset.form-columns-2 .hs-form-field{width:calc(50% - 8px);}
    form > fieldset:has(textarea){grid-column:1 / -1;}
    form > fieldset:has(input[type="tel"]){grid-column:1 / -1;}
    form > fieldset:has(.legal-consent-container){grid-column:1 / -1;}
    form > .hs_submit, form > div{grid-column:1 / -1;}

    @media (max-width:400px){
      form{grid-template-columns:1fr;}
      form > fieldset.form-columns-2 .hs-form-field{width:100%;}
    }
  }
`;

/** The form renders in an iframe on the same origin, so its stylesheet can be extended from here. */
function applyCompactStyles(targetSelector: string): void {
  const doc = document.querySelector<HTMLIFrameElement>(`${targetSelector} iframe`)?.contentDocument;
  if (!doc) return;
  const style = doc.createElement('style');
  style.textContent = COMPACT_FORM_CSS;
  doc.head.appendChild(style);
}

/**
 * form_start for GTM: pushed once, the first time a field in the form gets focus or input.
 * HubSpot hands onFormReady the <form> itself (inside its iframe), or a jQuery wrapper around it.
 */
function trackFormStart(form: unknown, formName: string): void {
  const el = (form as { 0?: unknown })?.[0] ?? form;
  if (!el || typeof (el as EventTarget).addEventListener !== 'function') return;
  let sent = false;
  const once = () => {
    if (sent) return;
    sent = true;
    window.dataLayer?.push({ event: 'form_start', form_name: formName });
  };
  (el as EventTarget).addEventListener('focusin', once);
  (el as EventTarget).addEventListener('input', once);
}

export type HubspotFormState = 'loading' | 'ready' | 'failed';

// if the form isn't there by then (blocked by an ad blocker, network down), show the fallback
const FORM_TIMEOUT_MS = 12000;

/**
 * `formName` is reported to GTM as the generate_lead event's form_name (conversion tracking).
 * HubSpot's own embed, in HubSpot's iframe with HubSpot's styling. `compact` tightens it where it shares the screen.
 * Resolves 'ready' when the form is rendered, or 'failed' if it can't be loaded.
 */
export function createHubspotForm(targetSelector: string, formName: string, formId = HUBSPOT_FORM_ID, compact = false): Promise<HubspotFormState> {
  if (typeof window === 'undefined') return Promise.resolve('loading'); // prerendering
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve('failed'), FORM_TIMEOUT_MS);
    loadHubspotScript()
      .then(() => {
        window.hbspt?.forms.create({
          portalId: HUBSPOT_PORTAL_ID,
          formId,
          region: HUBSPOT_REGION,
          target: targetSelector,
          onFormReady: (form?: unknown) => {
            clearTimeout(timer);
            if (compact) applyCompactStyles(targetSelector);
            trackFormStart(form, formName);
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

/**
 * HubSpot's newer embed (the code HubSpot gives for forms made in the new form editor):
 * a `<div class="hs-form-frame" data-form-id=…>` in the template, and this script. Angular strips <script>
 * from templates, so the script is added here, and added again on each visit, because it only looks for
 * the form's div when it runs. `formName` goes to GTM with form_start and generate_lead.
 */
export function embedHubspotFrameForms(formName: string): () => void {
  if (typeof window === 'undefined') return () => {};
  document.querySelectorAll('script[data-hs-frame-embed]').forEach((el) => el.remove());
  const script = document.createElement('script');
  script.src = `https://js-eu1.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;
  script.defer = true;
  script.dataset['hsFrameEmbed'] = '';
  document.body.appendChild(script);
  // the embed reports what happens in the form as events on window
  let started = false;
  const onStart = () => {
    if (started) return;
    started = true;
    window.dataLayer?.push({ event: 'form_start', form_name: formName });
  };
  const onSubmit = () => window.dataLayer?.push({ event: 'generate_lead', form_name: formName });
  window.addEventListener('hs-form-event:on-interaction:navigate', onStart);
  window.addEventListener('hs-form-event:on-submission:success', onSubmit);
  return () => {
    window.removeEventListener('hs-form-event:on-interaction:navigate', onStart);
    window.removeEventListener('hs-form-event:on-submission:success', onSubmit);
  };
}
