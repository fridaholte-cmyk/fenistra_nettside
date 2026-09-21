/**
 * Password gate for the pre-launch preview. Set to false at go-live.
 * While true, prerendered pages only contain the gate (so the preview can't be indexed)
 * and client hydration is off, because the server can't know if the visitor has unlocked it.
 */
export const PREVIEW_GATE_ENABLED = true;
export const PREVIEW_GATE_KEY = 'fenistra_preview_unlocked';
export const PREVIEW_GATE_PASSWORD = 'fenistra-preview-2026';
