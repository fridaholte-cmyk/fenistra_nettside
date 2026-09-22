/**
 * Remembers which element had focus when a dialog/panel opens, and returns a function that puts focus
 * back there when it closes (WCAG 2.4.3). If the close leads to a route change, the route change moves
 * focus to the new page afterwards, which is what we want.
 */
export function rememberFocus(): () => void {
  if (typeof document === 'undefined') return () => {};
  const opener = document.activeElement as HTMLElement | null;
  return () =>
    setTimeout(() => {
      if (opener && opener !== document.body && opener.isConnected) opener.focus();
    }, 0);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab / Shift+Tab inside the open modal dialog (any visible [aria-modal="true"]), so keyboard users
 * can't wander into the page behind it (WCAG 2.4.3). Call from a document keydown listener.
 */
export function trapTabInOpenDialog(event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;
  const dialogs = Array.from(document.querySelectorAll<HTMLElement>('[aria-modal="true"]')).filter(isShown);
  const dialog = dialogs[dialogs.length - 1];
  if (!dialog) return;
  const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(isShown);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  const active = document.activeElement as HTMLElement | null;
  if (!active || !dialog.contains(active)) {
    event.preventDefault();
    (event.shiftKey ? last : first).focus();
  } else if (event.shiftKey && (active === first || active === dialog)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}

function isShown(el: HTMLElement): boolean {
  return el.checkVisibility ? el.checkVisibility({ visibilityProperty: true }) : el.offsetParent !== null;
}
