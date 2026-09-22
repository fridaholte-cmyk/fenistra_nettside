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
