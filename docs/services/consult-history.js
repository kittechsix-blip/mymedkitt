// myMedKitt — Consult history glue.
// Wires the pure HistoryStepTracker (history-steps.ts) to window.history / popstate so the
// OS back gesture steps back one card inside a consult. Bookkeeping lives in history-steps.ts.
import { HistoryStepTracker } from './history-steps.js';
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
let swallowTimer;
let stepBackHandler = null;
let listening = false;
function applyOps(ops) {
    try {
        for (const op of ops) {
            if (op.type === 'replace')
                window.history.replaceState(op.state, '');
            else
                window.history.pushState(op.state, '');
        }
    }
    catch {
        // Browser refused (throttling / sandbox): fall back to the plain Back button.
        tracker.disable();
    }
}
function goBy(delta) {
    if (delta === 0)
        return;
    swallow += 1;
    if (swallowTimer !== undefined)
        window.clearTimeout(swallowTimer);
    swallowTimer = window.setTimeout(() => { swallow = 0; }, 800);
    window.history.go(delta);
}
function overlayOpen() {
    return document.querySelector(OVERLAY_SELECTOR) !== null;
}
/** Every overlay listens for `hashchange` to dismiss; the router skips this synthetic one. */
function closeOverlays() {
    const ev = new Event('hashchange');
    ev[OVERLAY_CLOSE_FLAG] = true;
    window.dispatchEvent(ev);
}
function onPopState(ev) {
    if (swallow > 0) {
        swallow -= 1;
        return;
    }
    // Back gesture while an overlay owns the top history entry: close the overlay and stop.
    // History is already on the entry underneath, which matches what is on screen.
    if (overlayEntry) {
        overlayEntry = false;
        if (window.location.hash === overlayHash) {
            if (overlayOpen())
                closeOverlays();
            return;
        }
        // The hash changed: a link inside the overlay navigated away. Not a back gesture.
    }
    if (!tracker.active)
        return;
    if (window.location.hash !== consultHash) {
        // Real navigation away from the consult (the router handles the route change).
        tracker.leave();
        return;
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
            // Stale entry (after Reset / jump). Keep walking back WITHOUT swallowing, so the next
            // popstate is re-evaluated: one gesture skips every stale entry and leaves the consult.
            window.history.go(-1);
            break;
        default:
            break;
    }
}
// ---------------------------------------------------------------------------
// Overlay history: every body-level overlay (drug modal, infographic, tools sheet,
// lightbox...) gets one history entry while it is open, so the OS back gesture closes
// the overlay instead of leaving the screen underneath. Works on every route.
// ---------------------------------------------------------------------------
let overlayEntry = false;
let overlayHash = '';
let lastHashChange = 0;
function onOverlayMutation() {
    const open = overlayOpen();
    if (open && !overlayEntry) {
        // Overlays opened BY a route change (#/info/<id>) already have their own entry.
        if (Date.now() - lastHashChange < 500)
            return;
        try {
            const base = (window.history.state && typeof window.history.state === 'object') ? window.history.state : {};
            window.history.pushState({ ...base, mkOverlay: true }, '');
            overlayEntry = true;
            overlayHash = window.location.hash;
        }
        catch {
            // Browser refused the entry: the overlay still closes with its own controls.
        }
    }
    else if (!open && overlayEntry) {
        // Closed with its own control (X, backdrop, Escape): drop the entry we added, unless
        // something else already replaced or left it (a jump, a route change).
        overlayEntry = false;
        const st = window.history.state;
        if (st && st.mkOverlay)
            goBy(-1);
    }
}
/** Call once at startup. */
export function initOverlayHistory() {
    window.addEventListener('hashchange', (ev) => {
        if (!ev[OVERLAY_CLOSE_FLAG])
            lastHashChange = Date.now();
    });
    if (!listening) {
        listening = true;
        window.addEventListener('popstate', onPopState);
    }
    new MutationObserver(onOverlayMutation).observe(document.body, { childList: true, subtree: true });
}
/** Start tracking a consult. `onStepBack(n)` must goBack n cards and re-render. */
export function beginConsultHistory(treeId, onStepBack) {
    stepBackHandler = onStepBack;
    consultHash = window.location.hash;
    applyOps(tracker.begin(treeId, window.history.state));
    if (!listening) {
        listening = true;
        window.addEventListener('popstate', onPopState);
    }
}
/** Call after every render with the number of answered cards on screen. */
export function syncConsultHistory(cards) {
    applyOps(tracker.sync(cards));
}
/** True when on-screen Back should defer to history.back(). */
export function canStepBackViaHistory() {
    return tracker.canStepBack();
}
export function stepBackViaHistory() {
    window.history.back();
}
export function leaveConsultHistory() {
    tracker.leave();
}
