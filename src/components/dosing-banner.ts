/**
 * Dosing Banner — Sticky summary of user-selected doses
 * SAFE: Only displays doses the user explicitly adds (no regex extraction).
 * Drugs are added via:
 *   1. Completing a weight-based calculator
 *   2. Clicking "Add to list" on a drug card
 */

import {
  getDosingList,
  removeFromDosingList,
  clearDosingList,
  subscribeToDosingList,
  type DosingEntry,
} from '../services/dosing-list.js';

let bannerEl: HTMLElement | null = null;
let unsubscribe: (() => void) | null = null;

/** Render the sticky dosing banner from the explicit list */
export function renderDosingBanner(container: HTMLElement): void {
  removeDosingBanner();

  const list = getDosingList();

  // Subscribe to updates
  unsubscribe = subscribeToDosingList(() => {
    renderDosingBanner(container);
  });

  if (list.length === 0) return; // Nothing to show

  const banner = document.createElement('div');
  banner.className = 'dosing-banner';

  const label = document.createElement('span');
  label.className = 'dosing-banner__label';
  label.textContent = 'Doses:';
  banner.appendChild(label);

  const pills = document.createElement('div');
  pills.className = 'dosing-banner__pills';

  for (const entry of list) {
    const pill = document.createElement('div');
    pill.className = 'dosing-banner__pill';

    // Build display text
    let text = entry.drug;
    if (entry.dose) text += ` ${entry.dose}`;
    if (entry.route) text += ` ${entry.route}`;

    const textSpan = document.createElement('span');
    textSpan.className = 'dosing-banner__pill-text';
    textSpan.textContent = text;
    pill.appendChild(textSpan);

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'dosing-banner__pill-remove';
    removeBtn.textContent = '\u00D7';
    removeBtn.setAttribute('aria-label', `Remove ${entry.drug}`);
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeFromDosingList(entry.id);
    });
    pill.appendChild(removeBtn);

    // Copy to clipboard on tap (not on remove button)
    textSpan.addEventListener('click', () => {
      navigator.clipboard.writeText(text).then(() => {
        pill.classList.add('dosing-banner__pill--copied');
        setTimeout(() => pill.classList.remove('dosing-banner__pill--copied'), 1000);
      }).catch(() => {});
    });

    pills.appendChild(pill);
  }

  banner.appendChild(pills);

  // Clear all button (if 2+ items)
  if (list.length >= 2) {
    const clearBtn = document.createElement('button');
    clearBtn.className = 'dosing-banner__clear';
    clearBtn.textContent = 'Clear';
    clearBtn.addEventListener('click', () => {
      clearDosingList();
    });
    banner.appendChild(clearBtn);
  }

  // Insert after the header
  const header = container.querySelector('.consult-flow-header');
  if (header && header.nextSibling) {
    header.parentNode?.insertBefore(banner, header.nextSibling);
  } else {
    container.prepend(banner);
  }

  bannerEl = banner;
}

/** Remove the dosing banner */
export function removeDosingBanner(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  bannerEl?.remove();
  bannerEl = null;
}

/** Check if banner is currently visible */
export function hasDosingBanner(): boolean {
  return bannerEl !== null;
}
