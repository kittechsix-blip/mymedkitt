// MedKitt — Sticky Patient Context Header
// Shows persistent weight/age bar across calculators.
// One tap toggles visibility, clear button resets for next patient.

import {
  getPatientContext,
  clearPatientContext,
  subscribeToPatientContext,
  formatPatientContext,
  PatientContext,
} from '../services/patient-context.js';

let headerContainer: HTMLElement | null = null;
let unsubscribe: (() => void) | null = null;

// ---------------------------------------------------------------------------
// Render (call once when calculator view mounts)
// ---------------------------------------------------------------------------

export function renderStickyPatientHeader(parent: HTMLElement): void {
  // Check if already rendered
  if (headerContainer && parent.contains(headerContainer)) {
    return;
  }

  headerContainer = document.createElement('div');
  headerContainer.className = 'sticky-patient-header sticky-patient-header--hidden';
  headerContainer.innerHTML = `
    <div class="sticky-patient-content">
      <span class="sticky-patient-icon">👤</span>
      <span class="sticky-patient-text">No patient data</span>
    </div>
    <button class="sticky-patient-clear" title="Clear for next patient">✕</button>
  `;

  // Insert at top of parent
  parent.insertBefore(headerContainer, parent.firstChild);

  // Wire up clear button
  const clearBtn = headerContainer.querySelector('.sticky-patient-clear') as HTMLElement;
  clearBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    clearPatientContext();
  });

  // Subscribe to context changes
  unsubscribe = subscribeToPatientContext(updateDisplay);
}

// ---------------------------------------------------------------------------
// Update Display
// ---------------------------------------------------------------------------

function updateDisplay(ctx: PatientContext): void {
  if (!headerContainer) return;

  const textEl = headerContainer.querySelector('.sticky-patient-text');
  const hasData = ctx.weight || ctx.age !== undefined;

  if (hasData) {
    headerContainer.classList.remove('sticky-patient-header--hidden');
    if (textEl) {
      textEl.textContent = formatPatientContext(ctx);
    }
  } else {
    headerContainer.classList.add('sticky-patient-header--hidden');
  }
}

// ---------------------------------------------------------------------------
// Cleanup (call when leaving calculator view)
// ---------------------------------------------------------------------------

export function cleanupStickyPatientHeader(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
  if (headerContainer) {
    headerContainer.remove();
    headerContainer = null;
  }
}

// ---------------------------------------------------------------------------
// Manual Toggle (optional — tap to show/hide)
// ---------------------------------------------------------------------------

export function toggleStickyPatientHeader(): void {
  if (!headerContainer) return;
  headerContainer.classList.toggle('sticky-patient-header--collapsed');
}
