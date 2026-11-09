// myMedKitt — Consult history glue.
// Wires the pure HistoryStepTracker (history-steps.ts) to window.history / popstate so the
// OS back gesture steps back one card inside a consult. Bookkeeping lives in history-steps.ts.

import { HistoryStepTracker } from './history-steps.js';
import type { HistoryOp } from './history-steps.js';

const tracker = new HistoryStepTracker(() => Math.random().toString(36).slice(2, 10));

/** Marker on the synthetic hashchange that closes overlays; the router ignores it. */
export const OVERLAY_CLOSE_FLAG = 'mkOverlayClose';

/** Roots of the body-level overlays. All of them dismiss on `hashchange`. */
const OVERLAY_SELECTOR = [
  '.modal-overlay',
  '.overlay-panel',
  '.image-lightbox-overlay',
  '.share-modal-overlay',
  '.critical-actions-overlay',
  '.infographic-overlay',
  '.toolbar-tools-overlay',
  '.decision-map-overlay',
].join(',');

let consultHash = '';
let swallow = 0;
let swallowTimer: number | undefined;
let stepBackHandler: ((steps: number) => void) | null = null;
let listening = false;

function applyOps(ops: HistoryOp[]): void {
  try {
    for (const op of ops) {
      if (op.type === 'replace') window.history.replaceState(op.state, '');
      else window.history.pushState(op.state, '');
    }
  } catch {
    // Browser refused (throttling / sandbox): fall back to the plain Back button.
    tracker.disable();
  }
}

function goBy(delta: number): void {
  if (delta === 0) return;
  swallow += 1;
  if (swallowTimer !== undefined) window.clearTimeout(swallowTimer);
  swallowTimer = window.setTimeout(() => { swallow = 0; }, 800);
  window.history.go(delta);
}

function overlayOpen(): boolean {
  return document.querySelector(OVERLAY_SELECTOR) !== null;
}

/** Every overlay listens for `hashchange` to dismiss; the router skips this synthetic one. */
function closeOverlays(): void {
  const ev = new Event('hashchange');
  (ev as unknown as Record<string, boolean>)[OVERLAY_CLOSE_FLAG] = true;
  window.dispatchEvent(ev);
}

function onPopState(ev: PopStateEvent): void {
  if (swallow > 0) {
    swallow -= 1;
    return;
  }
  if (!tracker.active) return;
  if (window.location.hash !== consultHash) {
    // Real navigation away from the consult (the router handles the route change).
    tracker.leave();
    return;
  }

  // An open overlay owns the gesture: close it, then put history back where the UI is.
  if (overlayOpen()) {
    closeOverlays();
    if (!overlayOpen()) {
      // Valid entry of this consult: realign by the exact distance. Stale or unknown
      // entry: assume the gesture was a single step back and undo it.
      const d = tracker.distanceToUi(ev.state);
      goBy(d === null ? 1 : d);
      return;
    }
    // Overlay refused to close: do not trap the gesture, fall through to card stepping.
  }

  const action = tracker.onPop(ev.state);
  switch (action.type) {
    case 'back':
      stepBackHandler?.(action.steps);
      break;
    case 'resync':
      goBy(action.delta);
      break;
    case 'skip':
      goBy(-1);
      break;
    default:
      break;
  }
}

/** Start tracking a consult. `onStepBack(n)` must goBack n cards and re-render. */
export function beginConsultHistory(treeId: string, onStepBack: (steps: number) => void): void {
  stepBackHandler = onStepBack;
  consultHash = window.location.hash;
  applyOps(tracker.begin(treeId, window.history.state));
  if (!listening) {
    listening = true;
    window.addEventListener('popstate', onPopState);
  }
}

/** Call after every render with the number of answered cards on screen. */
export function syncConsultHistory(cards: number): void {
  applyOps(tracker.sync(cards));
}

/** True when on-screen Back should defer to history.back(). */
export function canStepBackViaHistory(): boolean {
  return tracker.canStepBack();
}

export function stepBackViaHistory(): void {
  window.history.back();
}

export function leaveConsultHistory(): void {
  tracker.leave();
}
