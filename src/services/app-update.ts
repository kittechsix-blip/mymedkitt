// App update + cache-warm coordination with the service worker.
//
// Update policy: a new service worker must never yank a clinician out of a case.
//  - The SW no longer navigates windows. It posts {type:'sw-activated'} after an upgrade,
//    and the browser fires `controllerchange`; either one lands in onUpdateSignal().
//  - Non-case route (home, lists, hubs...) -> reload now.
//  - Case route (/tree, /calculator, /info, /reference, open modal) -> show an
//    "Update ready - Refresh" chip and reload at the next safe moment: the route leaves the
//    case, or the app comes back after 3+ minutes in the background.
//  - A suppressed reload always leaves the chip up, so no tab is stranded on old code.

import { showToast } from '../components/toast.js';

const RELOAD_GUARD_KEY = 'medkitt-update-reload-ts';
const RELOAD_GUARD_MS = 30_000;

/** Routes where the user is working a case. Everything else is safe to reload on. */
const CASE_ROUTE = /^\/(tree|consult|node|share|calculator|info|reference)(\/|$)/;
const OPEN_MODAL = '.modal-overlay, .infographic-overlay, .decision-map-overlay, .toolbar-tools-overlay, .image-lightbox-overlay, [role="dialog"]';

let hadController = false;
let updatePending = false;

function currentRoute(): string {
  return window.location.hash.slice(1).split('?')[0] || '/';
}

/** True while the user is inside a consult, calculator, info page, reference, or a modal. */
export function isCaseContext(): boolean {
  if (CASE_ROUTE.test(currentRoute())) return true;
  return document.querySelector(OPEN_MODAL) !== null;
}

/** Reload now. Returns false when the loop guard suppressed it (caller must keep a way to retry). */
function reloadGuarded(force: boolean): boolean {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) || 0);
    if (!force && Date.now() - last < RELOAD_GUARD_MS) {
      console.warn('[update] reload suppressed (loop guard)');
      return false;
    }
    sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
  } catch {
    // sessionStorage unavailable: reload anyway, the SW only upgrades once per deploy
  }
  window.location.reload();
  return true;
}

let chipShown = false;
function ensureChip(): void {
  if (chipShown) return;
  chipShown = true;
  showToast('Update ready', {
    actionLabel: 'Refresh',
    onAction: () => { reloadGuarded(true); },
    durationMs: 0,
  });
}

/** Reload if it is safe; otherwise make sure the chip is up. Never leaves a tab with neither. */
function evaluate(): void {
  if (!updatePending) return;
  if (!isCaseContext() && reloadGuarded(false)) return;
  ensureChip();
}

/** How long the app must sit in the background, mid-case, before we reload it on return. A
 *  quick switch to the EHR and back must not wipe a half-filled calculator. */
const HIDDEN_RELOAD_MS = 3 * 60_000;
let hiddenAt = 0;

function onVisibility(): void {
  if (!updatePending) return;
  if (document.visibilityState === 'hidden') {
    hiddenAt = Date.now();
    if (!isCaseContext()) reloadGuarded(false);
    return;
  }
  if (hiddenAt && Date.now() - hiddenAt >= HIDDEN_RELOAD_MS && reloadGuarded(false)) return;
  evaluate();
}

/** A page still running old code can fail to lazy-load a new module while the chip is up
 *  (the SW serves new files network-first). Reloading is the fix, and it is what the chip does. */
const MODULE_LOAD_ERROR = /dynamically imported module|Importing a module script failed|does not provide an export named/i;
function onRuntimeError(message: unknown): void {
  if (updatePending && typeof message === 'string' && MODULE_LOAD_ERROR.test(message)) reloadGuarded(true);
}

function onUpdateSignal(): void {
  if (updatePending) return; // dedupe: controllerchange + sw-activated both arrive
  updatePending = true;
  window.addEventListener('hashchange', evaluate);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('error', (ev) => onRuntimeError(ev.message));
  window.addEventListener('unhandledrejection', (ev) => onRuntimeError(String((ev.reason && ev.reason.message) || ev.reason)));
  if (document.visibilityState === 'hidden') { onVisibility(); return; }
  evaluate();
}

export function initAppUpdates(): void {
  if (!('serviceWorker' in navigator)) return;
  hadController = navigator.serviceWorker.controller !== null;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // First install: the SW claims a page that had no controller. Nothing to update.
    if (!hadController) {
      hadController = true;
      return;
    }
    onUpdateSignal();
  });

  navigator.serviceWorker.addEventListener('message', (event: MessageEvent) => {
    if (event.data && event.data.type === 'sw-activated') onUpdateSignal();
  });
}

/** Ask the SW to warm its lazy assets once the app is idle. Skipped on Data Saver / offline. */
export function scheduleCacheWarm(reg: ServiceWorkerRegistration): void {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return;

  const run = (): void => {
    if (!navigator.onLine) return;
    const sw = reg.active ?? navigator.serviceWorker.controller;
    sw?.postMessage({ type: 'warm-cache' });
  };
  const arm = (): void => {
    window.setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => number })
          .requestIdleCallback(run, { timeout: 15_000 });
      } else {
        run();
      }
    }, 4000);
  };
  if (document.readyState === 'complete') arm();
  else window.addEventListener('load', arm, { once: true });
}
