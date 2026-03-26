// Sticky Dosing Header — auto-shows primary treatment when result has dosing info
// Stays visible at top while scrolling through result content

import type { TreatmentRegimen, DrugRegimen } from '../models/types.js';

let headerElement: HTMLElement | null = null;

/**
 * Render the sticky dosing header container into the flow.
 * Call once when setting up the consult flow.
 */
export function renderStickyDosingHeader(container: HTMLElement): void {
  // Create header container (hidden by default)
  headerElement = document.createElement('div');
  headerElement.className = 'sticky-dosing-header sticky-dosing-header--hidden';
  headerElement.setAttribute('aria-hidden', 'true');
  container.appendChild(headerElement);
}

/**
 * Update the sticky header with treatment data from current result node.
 * Pass null to hide the header.
 */
export function updateStickyDosingHeader(treatment: TreatmentRegimen | null): void {
  if (!headerElement) return;

  if (!treatment) {
    headerElement.classList.add('sticky-dosing-header--hidden');
    headerElement.setAttribute('aria-hidden', 'true');
    headerElement.innerHTML = '';
    return;
  }

  // Show header
  headerElement.classList.remove('sticky-dosing-header--hidden');
  headerElement.setAttribute('aria-hidden', 'false');

  // Build content using <details> for collapsible behavior
  headerElement.innerHTML = '';

  const details = document.createElement('details');
  details.className = 'sticky-dosing-details';

  // Summary (collapsed view) - shows primary drug + dose + route
  const summary = document.createElement('summary');
  summary.className = 'sticky-dosing-summary';

  const primaryText = `${treatment.firstLine.drug} ${treatment.firstLine.dose} ${treatment.firstLine.route}`;
  summary.innerHTML = `
    <span class="sticky-dosing-label">Rx:</span>
    <span class="sticky-dosing-primary">${primaryText}</span>
    <span class="sticky-dosing-expand-icon"></span>
  `;
  details.appendChild(summary);

  // Expanded content
  const content = document.createElement('div');
  content.className = 'sticky-dosing-content';

  // First line (full details)
  content.appendChild(createDosingRow('1st Line', treatment.firstLine, true));

  // Alternative (if exists)
  if (treatment.alternative) {
    content.appendChild(createDosingRow('Alt', treatment.alternative, false));
  }

  // PCN allergy (if exists)
  if (treatment.pcnAllergy) {
    content.appendChild(createDosingRow('PCN\u2205', treatment.pcnAllergy, false));
  }

  // Copy button
  const copyBtn = document.createElement('button');
  copyBtn.className = 'sticky-dosing-copy';
  copyBtn.textContent = 'Copy to clipboard';
  copyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    copyTreatmentToClipboard(treatment);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => { copyBtn.textContent = 'Copy to clipboard'; }, 2000);
  });
  content.appendChild(copyBtn);

  details.appendChild(content);
  headerElement.appendChild(details);
}

function createDosingRow(label: string, drug: DrugRegimen, isPrimary: boolean): HTMLElement {
  const row = document.createElement('div');
  row.className = `sticky-dosing-row ${isPrimary ? 'sticky-dosing-row--primary' : ''}`;

  const fullDose = [
    drug.drug,
    drug.dose,
    drug.route,
    drug.frequency,
    drug.duration ? `x ${drug.duration}` : ''
  ].filter(Boolean).join(' ');

  row.innerHTML = `
    <span class="sticky-dosing-row-label">${label}:</span>
    <span class="sticky-dosing-row-value">${fullDose}</span>
  `;

  if (drug.notes) {
    const notes = document.createElement('div');
    notes.className = 'sticky-dosing-row-notes';
    notes.textContent = drug.notes;
    row.appendChild(notes);
  }

  return row;
}

function copyTreatmentToClipboard(treatment: TreatmentRegimen): void {
  const lines: string[] = [];

  const formatDrug = (drug: DrugRegimen): string => {
    return [
      drug.drug,
      drug.dose,
      drug.route,
      drug.frequency,
      drug.duration ? `x ${drug.duration}` : ''
    ].filter(Boolean).join(' ');
  };

  lines.push(`1st Line: ${formatDrug(treatment.firstLine)}`);

  if (treatment.alternative) {
    lines.push(`Alt: ${formatDrug(treatment.alternative)}`);
  }

  if (treatment.pcnAllergy) {
    lines.push(`PCN allergy: ${formatDrug(treatment.pcnAllergy)}`);
  }

  navigator.clipboard.writeText(lines.join('\n')).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = lines.join('\n');
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  });
}

/**
 * Clear sticky header state (call on consult exit/reset)
 */
export function clearStickyDosingHeader(): void {
  if (headerElement) {
    headerElement.classList.add('sticky-dosing-header--hidden');
    headerElement.setAttribute('aria-hidden', 'true');
    headerElement.innerHTML = '';
  }
}
