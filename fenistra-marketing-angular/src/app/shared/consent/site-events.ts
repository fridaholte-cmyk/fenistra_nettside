/**
 * Click events for GTM, caught once for the whole site (event delegation), so new pages and links
 * are tracked without extra code. Pushed to dataLayer only; nothing leaves the browser before GTM
 * is loaded, and GTM loads only after consent (google-tags.service.ts).
 *
 *   cta_click      { cta_text, cta_location, link_url }       a button (.btn) or the menu's call to action
 *   contact_click  { contact_type, contact_target, cta_location }  mailto: / tel: links (never the address itself)
 *   outbound_click { link_domain, link_url, link_text }       a link to another website
 *   file_download  { file_name, file_extension, link_url }    PDF, Word, Excel, PowerPoint, zip
 */
type Push = (event: string, params?: Record<string, unknown>) => void;

const FILE_EXT = /\.(pdf|docx?|xlsx?|pptx?|csv|zip)$/i;
const SUPPORT_ADDRESS = 'support.fenistra@visma.com';

export function startSiteEvents(push: Push): void {
  document.addEventListener('click', (e) => onClick(e, push), { capture: true, passive: true });
}

function onClick(e: MouseEvent, push: Push): void {
  const target = e.target instanceof Element ? e.target : null;
  const el = target?.closest<HTMLElement>('a[href], button');
  if (!el) return;
  const location = locationOf(el);
  const text = textOf(el);

  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') || '';
    if (/^mailto:/i.test(href)) {
      const address = decodeURIComponent(href.slice(7).split('?')[0]).toLowerCase();
      push('contact_click', { contact_type: 'email', contact_target: address === SUPPORT_ADDRESS ? 'support' : 'ansatt', cta_location: location });
      return;
    }
    if (/^tel:/i.test(href)) {
      push('contact_click', { contact_type: 'phone', contact_target: 'sentralbord', cta_location: location });
      return;
    }
    const url = safeUrl(el.href);
    if (url && FILE_EXT.test(url.pathname)) {
      const name = url.pathname.split('/').pop() || '';
      push('file_download', { file_name: name, file_extension: name.split('.').pop()?.toLowerCase(), link_url: url.origin + url.pathname });
      return;
    }
    if (url && /^https?:$/.test(url.protocol) && url.hostname !== window.location.hostname) {
      push('outbound_click', { link_domain: url.hostname.replace(/^www\./, ''), link_url: url.origin + url.pathname, link_text: text });
      return;
    }
  }

  if (isCta(el)) {
    const href = el instanceof HTMLAnchorElement ? el.getAttribute('href') : null;
    push('cta_click', { cta_text: text, cta_location: location, link_url: href ? href.split('?')[0] : null });
  }
}

function isCta(el: HTMLElement): boolean {
  return el.classList.contains('btn') || el.classList.contains('hp-link') || !!el.closest('.nav-cta') || el.hasAttribute('data-cta');
}

/** Where on the page the click happened: an explicit data-cta-location, the header/footer, or the section's id or first class. */
function locationOf(el: HTMLElement): string {
  const explicit = el.closest<HTMLElement>('[data-cta-location]')?.dataset['ctaLocation'];
  if (explicit) return explicit;
  if (el.closest('header, app-header')) return 'meny';
  if (el.closest('footer, app-footer')) return 'bunntekst';
  if (el.closest('.chat-panel, app-chat-widget')) return 'chat';
  const section = el.closest<HTMLElement>('section');
  if (section) return section.id || section.classList.item(0) || 'seksjon';
  return 'annet';
}

function textOf(el: HTMLElement): string {
  // innerText keeps the line break between a link's title and its description; textContent runs them together
  return (el.getAttribute('aria-label') || el.innerText || el.textContent || '').replace(/\s+/g, ' ').replace(/[→›»]/g, '').trim().slice(0, 100);
}

function safeUrl(href: string): URL | null {
  try { return new URL(href, window.location.href); } catch { return null; }
}
