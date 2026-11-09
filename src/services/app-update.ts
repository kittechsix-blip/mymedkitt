// App update + cache-warm coordination with the service worker.
//
// Update policy: a new service worker must never yank a clinician out of a case.
//  - The SW no longer navigates windows. It posts {type:'sw-activated'} after an upgrade,
//    and the browser fires `controllerchange`; either one lands in onUpdateSignal().
//  - Hidden page or a non-case route (home, lists, hubs...)  -> reload now.
//  - Case route (/tree, /calculator, /info, /reference, open modal) -> show an
//    "Update ready - Refresh" chip and reload at the next safe moment (route leaves the
//    case, or the document is hidden).

import { showToast } from '../components/toast.js';

const RELOAD_GUARD_KEY = 'medkitt-update-reload-ts';
const RELOAD_GUARD_MS = 30_000;

/** Routes where the user is working a case. Everything else is safe to reload on. */
const CASE_ROUTE = /^\/(tree|consult|node|share|calculator|info|reference)(\/|$)/;
const OPEN_MODAL = '.modal-overlay, .overlay-panel-backdrop, [role="dialog"]';

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

function reloadGuarded(force: boolean): void {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_GUARD_KEY) || 0);
    if (!force && Date.now() - last < RELOAD_GUARD_MS) {
      console.warn('[update] reload suppressed (loop guard)');
      return;
    }
    sessionStorage.setItem(RELOAD_GUARD_KEY, String(Date.now()));
  } catch {
    // sessionStorage unavailable: reload anyway, the SW only upgrades once per deploy
  }
  window.location.reload();
}

function onRouteOrVisibilityChange(): void {
  if (!updatePending) return;
  if (document.visibilityState === 'hidden' || !isCaseContext()) {
    reloadGuarded(false);
  }
}

function onUpdateSignal(): void {
  if (updatePending) return; // dedupe: controllerchange + sw-activated both arrive
  updatePending = true;

  if (document.visibilityState === 'hidden' || !isCaseContext()) {
    reloadGuarded(false);
    return;
  }

  showToast('Update ready', {
    actionLabel: 'Refresh',
    onAction: () => reloadGuarded(true),
    durationMs: 0,
  });
  window.addEventListener('hashchange', onRouteOrVisibilityChange);
  document.addEventListener('visibilitychange', onRouteOrVisibilityChange);
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
