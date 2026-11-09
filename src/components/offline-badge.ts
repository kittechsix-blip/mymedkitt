// Offline indicator: a small non-interactive pill shown while the browser reports offline.
// Initialised once from app.ts. Purely informational; the service worker already serves
// the saved copy.

import { showToast } from './toast.js';

let badge: HTMLElement | null = null;
let started = false;

function show(): void {
  if (badge) return;
  badge = document.createElement('div');
  badge.className = 'offline-badge';
  badge.setAttribute('role', 'status');
  badge.textContent = 'Offline · using saved copy';
  document.body.appendChild(badge);
}

function hide(): boolean {
  if (!badge) return false;
  badge.remove();
  badge = null;
  return true;
}

export function initOfflineBadge(): void {
  if (started) return;
  started = true;
  window.addEventListener('offline', show);
  window.addEventListener('online', () => {
    if (hide()) showToast('Back online');
  });
  if (!navigator.onLine) show();
}
