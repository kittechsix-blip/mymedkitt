// MedKitt — Consult Wizard (Mayo/Stroke MD Pattern)
// Step-by-step clinical decision support with minimal UI
// Based on JMIR 2025 design guidelines

import { router } from '../services/router.js';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export interface WizardOption {
  id: string;
  label: string;
  shortLabel?: string;
  variant?: 'default' | 'urgent' | 'safe' | 'warning';
  nextStep?: string;
  isTerminal?: boolean;
  info?: string;
  type?: 'checkbox';
}

export interface WizardStep {
  id: string;
  title: string;
  question: string;
  subtitle?: string;
  options: WizardOption[];
  info?: string;
  type?: 'question' | 'checklist';
  calculatorLink?: { label: string; id: string };
}

export interface TerminalStep {
  title: string;
  summary: string;
  actions: string[];
  returnPrecautions?: string[];
}

export interface ConsultWizardData {
  id: string;
  name: string;
  category: string;
  accentColor?: string;
  steps: WizardStep[];
  terminalSteps: Record<string, TerminalStep>;
}

interface PathEntry {
  stepId: string;
  stepTitle: string;
  choiceLabel: string;
}

// -------------------------------------------------------------------
// State
// -------------------------------------------------------------------

let currentConsult: ConsultWizardData | null = null;
let currentStepId: string = '';
let path: PathEntry[] = [];
let isComplete: boolean = false;
let terminalId: string | null = null;
let expandedInfo: string | null = null;
let checkedItems: Set<string> = new Set();
let calculatorModalOpen: boolean = false;
let activeCalculatorId: string | null = null;

// -------------------------------------------------------------------
// Colors (Burnt Umber Brand)
// -------------------------------------------------------------------

const COLORS = {
  brand: '#8B4513',
  brandLight: '#A0522D',
  brandDark: '#6B3410',
  brandBg: '#FDF5F0',
  danger: '#DC2626',
  warning: '#D97706',
  success: '#059669',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A5A',
  textMuted: '#9A9AB0',
  border: '#E5E7EB',
  surface: '#F8F9FA',
  bg: '#FFFFFF',
};

// -------------------------------------------------------------------
// Main Render Function
// -------------------------------------------------------------------

export function renderConsultWizard(container: HTMLElement, consultData: ConsultWizardData): void {
  currentConsult = consultData;
  currentStepId = consultData.steps[0].id;
  path = [];
  isComplete = false;
  terminalId = null;
  expandedInfo = null;
  checkedItems = new Set();
  calculatorModalOpen = false;
  activeCalculatorId = null;

  render(container);
}

function render(container: HTMLElement): void {
  if (!currentConsult) return;

  container.innerHTML = '';
  container.className = 'consult-wizard';

  if (isComplete && terminalId) {
    renderCompletionScreen(container);
  } else {
    renderStepScreen(container);
  }

  // Render calculator modal if open
  if (calculatorModalOpen && activeCalculatorId) {
    renderCalculatorModal(container);
  }
}

// -------------------------------------------------------------------
// Step Screen
// -------------------------------------------------------------------

function renderStepScreen(container: HTMLElement): void {
  if (!currentConsult) return;

  const currentStep = currentConsult.steps.find(s => s.id === currentStepId);
  if (!currentStep) return;

  const stepIndex = currentConsult.steps.findIndex(s => s.id === currentStepId);
  const accentColor = currentConsult.accentColor || COLORS.brand;

  // Build list of visited step IDs from path
  const visitedStepIds = new Set(path.map(p => p.stepId));

  // Header
  const header = document.createElement('div');
  header.className = 'cw-header';
  header.innerHTML = `
    <button class="cw-back-btn" aria-label="Go back">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    <h1 class="cw-title" style="color: ${accentColor}">${currentConsult.name}</h1>
    <div class="cw-header-spacer"></div>
  `;
  container.appendChild(header);

  // Back button handler
  header.querySelector('.cw-back-btn')?.addEventListener('click', handleBack);

  // Progress dots navigation
  const progressContainer = document.createElement('div');
  progressContainer.className = 'cw-progress';

  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'cw-progress-dots';

  currentConsult.steps.forEach((step, i) => {
    const dot = document.createElement('button');
    dot.className = 'cw-progress-dot';
    dot.setAttribute('aria-label', `Step ${i + 1}: ${step.title}`);

    const isVisited = visitedStepIds.has(step.id);
    const isCurrent = step.id === currentStepId;

    if (isCurrent) {
      dot.classList.add('cw-progress-dot-current');
      dot.style.background = accentColor;
      dot.style.borderColor = accentColor;
      dot.style.boxShadow = `0 0 0 3px ${accentColor}33`;
    } else if (isVisited) {
      dot.classList.add('cw-progress-dot-visited');
      dot.style.background = accentColor;
      dot.style.borderColor = accentColor;
      dot.style.cursor = 'pointer';
    } else {
      dot.classList.add('cw-progress-dot-future');
      dot.style.background = COLORS.border;
      dot.style.borderColor = COLORS.border;
      dot.style.cursor = 'not-allowed';
    }

    // Click handler for visited dots
    if (isVisited) {
      dot.addEventListener('click', () => navigateToStep(step.id, container));
    }

    dotsContainer.appendChild(dot);
  });

  progressContainer.appendChild(dotsContainer);

  const progressText = document.createElement('span');
  progressText.className = 'cw-progress-text';
  progressText.textContent = `Step ${stepIndex + 1} of ${currentConsult.steps.length}`;
  progressContainer.appendChild(progressText);

  container.appendChild(progressContainer);

  // Running summary (path chips)
  if (path.length > 0) {
    const summary = document.createElement('div');
    summary.className = 'cw-running-summary';
    summary.style.background = COLORS.brandBg;
    summary.innerHTML = path.map(entry =>
      `<span class="cw-chip" style="background: ${accentColor}">${entry.choiceLabel}</span>`
    ).join('');
    container.appendChild(summary);
  }

  // Main content
  const content = document.createElement('div');
  content.className = 'cw-content';

  // Step header
  const stepHeader = document.createElement('div');
  stepHeader.className = 'cw-step-header';
  stepHeader.innerHTML = `
    <h2 class="cw-step-title">${currentStep.title}</h2>
    ${currentStep.subtitle ? `<p class="cw-step-subtitle">${currentStep.subtitle}</p>` : ''}
  `;
  content.appendChild(stepHeader);

  // Question card
  const questionCard = document.createElement('div');
  questionCard.className = 'cw-question-card';
  questionCard.innerHTML = `
    <p class="cw-question-text">${currentStep.question}</p>
    ${currentStep.info ? `
      <button class="cw-info-toggle" data-info-id="${currentStep.id}">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 16v-4M12 8h.01"/>
        </svg>
        <span style="color: ${accentColor}">${expandedInfo === currentStep.id ? 'Hide details' : 'Learn more'}</span>
      </button>
      ${expandedInfo === currentStep.id ? `
        <div class="cw-info-content">
          <p>${currentStep.info}</p>
        </div>
      ` : ''}
    ` : ''}
  `;
  content.appendChild(questionCard);

  // Info toggle handler
  questionCard.querySelector('.cw-info-toggle')?.addEventListener('click', () => {
    expandedInfo = expandedInfo === currentStep.id ? null : currentStep.id;
    render(container);
  });

  // Calculator link button (if present)
  if (currentStep.calculatorLink) {
    const calcButton = document.createElement('button');
    calcButton.className = 'cw-calculator-btn';
    calcButton.style.borderColor = accentColor;
    calcButton.style.color = accentColor;
    calcButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2">
        <rect x="4" y="2" width="16" height="20" rx="2"/>
        <line x1="8" y1="6" x2="16" y2="6"/>
        <line x1="8" y1="10" x2="8" y2="10.01"/>
        <line x1="12" y1="10" x2="12" y2="10.01"/>
        <line x1="16" y1="10" x2="16" y2="10.01"/>
        <line x1="8" y1="14" x2="8" y2="14.01"/>
        <line x1="12" y1="14" x2="12" y2="14.01"/>
        <line x1="16" y1="14" x2="16" y2="14.01"/>
        <line x1="8" y1="18" x2="8" y2="18.01"/>
        <line x1="12" y1="18" x2="12" y2="18.01"/>
        <line x1="16" y1="18" x2="16" y2="18.01"/>
      </svg>
      <span>${currentStep.calculatorLink.label}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    `;
    calcButton.addEventListener('click', () => {
      activeCalculatorId = currentStep.calculatorLink!.id;
      calculatorModalOpen = true;
      render(container);
    });
    content.appendChild(calcButton);
  }

  // Render based on step type
  if (currentStep.type === 'checklist') {
    renderChecklistOptions(content, currentStep, accentColor, container);
  } else {
    renderQuestionOptions(content, currentStep, accentColor, container);
  }

  container.appendChild(content);

  // Footer disclaimer
  const footer = document.createElement('div');
  footer.className = 'cw-footer';
  footer.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${COLORS.textMuted}" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4M12 8h.01"/>
    </svg>
    <span>Clinical decision support only - NOT FDA cleared</span>
  `;
  container.appendChild(footer);
}

// -------------------------------------------------------------------
// Question Options (default)
// -------------------------------------------------------------------

function renderQuestionOptions(content: HTMLElement, currentStep: WizardStep, _accentColor: string, container: HTMLElement): void {
  const optionsContainer = document.createElement('div');
  optionsContainer.className = 'cw-options';

  currentStep.options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = `cw-option cw-option-${option.variant || 'default'}`;
    btn.innerHTML = `
      <span class="cw-option-label">${option.label}</span>
      ${option.info ? `
        <button class="cw-option-info" data-option-info="${option.id}" aria-label="More info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${COLORS.textMuted}" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
        </button>
      ` : ''}
    `;

    btn.addEventListener('click', (e) => {
      // Don't trigger if clicking the info button
      if ((e.target as HTMLElement).closest('.cw-option-info')) return;
      handleOptionSelect(option, container);
    });

    optionsContainer.appendChild(btn);

    // Option info expansion
    if (expandedInfo === option.id && option.info) {
      const infoDiv = document.createElement('div');
      infoDiv.className = 'cw-option-info-content';
      infoDiv.innerHTML = `<p>${option.info}</p>`;
      optionsContainer.appendChild(infoDiv);
    }
  });

  // Option info handlers
  optionsContainer.querySelectorAll('.cw-option-info').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const optionId = (btn as HTMLElement).dataset.optionInfo;
      if (optionId) {
        expandedInfo = expandedInfo === optionId ? null : optionId;
        render(container);
      }
    });
  });

  content.appendChild(optionsContainer);
}

// -------------------------------------------------------------------
// Checklist Options
// -------------------------------------------------------------------

function renderChecklistOptions(content: HTMLElement, currentStep: WizardStep, accentColor: string, container: HTMLElement): void {
  const checklistContainer = document.createElement('div');
  checklistContainer.className = 'cw-checklist';

  currentStep.options.forEach(option => {
    const itemId = `${currentStep.id}-${option.id}`;
    const isChecked = checkedItems.has(itemId);

    const item = document.createElement('label');
    item.className = `cw-checklist-item ${isChecked ? 'cw-checklist-item-checked' : ''}`;
    item.innerHTML = `
      <div class="cw-checkbox ${isChecked ? 'cw-checkbox-checked' : ''}" style="${isChecked ? `background: ${COLORS.success}; border-color: ${COLORS.success}` : `border-color: ${COLORS.border}`}">
        ${isChecked ? `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        ` : ''}
      </div>
      <span class="cw-checklist-label">${option.label}</span>
      ${option.info ? `
        <button class="cw-option-info" data-option-info="${option.id}" aria-label="More info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${COLORS.textMuted}" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
        </button>
      ` : ''}
    `;

    item.addEventListener('click', (e) => {
      // Don't toggle if clicking info button
      if ((e.target as HTMLElement).closest('.cw-option-info')) return;

      if (isChecked) {
        checkedItems.delete(itemId);
      } else {
        checkedItems.add(itemId);
      }
      render(container);
    });

    checklistContainer.appendChild(item);

    // Option info expansion
    if (expandedInfo === option.id && option.info) {
      const infoDiv = document.createElement('div');
      infoDiv.className = 'cw-option-info-content';
      infoDiv.innerHTML = `<p>${option.info}</p>`;
      checklistContainer.appendChild(infoDiv);
    }
  });

  // Option info handlers
  checklistContainer.querySelectorAll('.cw-option-info').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const optionId = (btn as HTMLElement).dataset.optionInfo;
      if (optionId) {
        expandedInfo = expandedInfo === optionId ? null : optionId;
        render(container);
      }
    });
  });

  content.appendChild(checklistContainer);

  // Proceed button (only enabled when all items checked)
  const allChecked = currentStep.options.every(opt => checkedItems.has(`${currentStep.id}-${opt.id}`));

  const proceedBtn = document.createElement('button');
  proceedBtn.className = `cw-proceed-btn ${allChecked ? '' : 'cw-proceed-btn-disabled'}`;
  proceedBtn.style.background = allChecked ? accentColor : COLORS.border;
  proceedBtn.disabled = !allChecked;
  proceedBtn.innerHTML = `
    <span>Proceed</span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  `;

  if (allChecked) {
    proceedBtn.addEventListener('click', () => {
      // Find the first option with nextStep or isTerminal
      const targetOption = currentStep.options.find(opt => opt.nextStep || opt.isTerminal);
      if (targetOption) {
        handleOptionSelect(targetOption, container);
      }
    });
  }

  content.appendChild(proceedBtn);
}

// -------------------------------------------------------------------
// Calculator Modal
// -------------------------------------------------------------------

function renderCalculatorModal(container: HTMLElement): void {
  if (!activeCalculatorId) return;

  const accentColor = currentConsult?.accentColor || COLORS.brand;

  const overlay = document.createElement('div');
  overlay.className = 'cw-modal-overlay';
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeCalculatorModal(container);
    }
  });

  const modal = document.createElement('div');
  modal.className = 'cw-modal';

  const modalHeader = document.createElement('div');
  modalHeader.className = 'cw-modal-header';
  modalHeader.innerHTML = `
    <h3 class="cw-modal-title" style="color: ${accentColor}">Calculator</h3>
    <button class="cw-modal-close" aria-label="Close">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${COLORS.textSecondary}" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
  `;
  modal.appendChild(modalHeader);

  modalHeader.querySelector('.cw-modal-close')?.addEventListener('click', () => closeCalculatorModal(container));

  const modalContent = document.createElement('div');
  modalContent.className = 'cw-modal-content';
  modalContent.id = 'cw-calculator-container';

  // Placeholder for calculator - the actual calculator will be loaded here
  modalContent.innerHTML = `
    <div class="cw-calculator-placeholder">
      <p>Loading calculator: ${activeCalculatorId}</p>
    </div>
  `;

  modal.appendChild(modalContent);
  overlay.appendChild(modal);
  container.appendChild(overlay);

  // Dispatch custom event for external calculator loading
  const event = new CustomEvent('medkitt-load-calculator', {
    detail: {
      calculatorId: activeCalculatorId,
      containerId: 'cw-calculator-container',
      onResult: (resultOptionId: string) => {
        selectOptionById(resultOptionId, container);
        closeCalculatorModal(container);
      }
    }
  });
  window.dispatchEvent(event);
}

function closeCalculatorModal(container: HTMLElement): void {
  calculatorModalOpen = false;
  activeCalculatorId = null;
  render(container);
}

// -------------------------------------------------------------------
// Completion Screen
// -------------------------------------------------------------------

function renderCompletionScreen(container: HTMLElement): void {
  if (!currentConsult || !terminalId) return;

  const terminal = currentConsult.terminalSteps[terminalId];
  if (!terminal) return;

  const accentColor = currentConsult.accentColor || COLORS.brand;

  // Header
  const header = document.createElement('div');
  header.className = 'cw-header';
  header.innerHTML = `
    <button class="cw-back-btn" aria-label="Go back">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>
    <h1 class="cw-title" style="color: ${accentColor}">${currentConsult.name}</h1>
    <button class="cw-restart-btn" aria-label="Restart">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="${accentColor}" stroke-width="2">
        <path d="M1 4v6h6M23 20v-6h-6"/>
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
      </svg>
    </button>
  `;
  container.appendChild(header);

  header.querySelector('.cw-back-btn')?.addEventListener('click', handleBack);
  header.querySelector('.cw-restart-btn')?.addEventListener('click', () => handleRestart(container));

  // Content
  const content = document.createElement('div');
  content.className = 'cw-content cw-completion';

  // Summary banner
  const banner = document.createElement('div');
  banner.className = 'cw-summary-banner';
  banner.style.background = accentColor;
  banner.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span class="cw-summary-title">${terminal.title}</span>
  `;
  content.appendChild(banner);

  // Path taken
  const pathSection = document.createElement('div');
  pathSection.className = 'cw-section';
  pathSection.innerHTML = `
    <h3 class="cw-section-label">PATH TAKEN</h3>
    <div class="cw-path-container">
      ${path.map((entry, i) => `
        <div class="cw-path-item">
          <div class="cw-path-dot" style="background: ${accentColor}"></div>
          <div class="cw-path-content">
            <span class="cw-path-step">${entry.stepTitle}</span>
            <span class="cw-path-choice">${entry.choiceLabel}</span>
          </div>
          ${i < path.length - 1 ? `<div class="cw-path-line" style="background: ${accentColor}"></div>` : ''}
        </div>
      `).join('')}
    </div>
  `;
  content.appendChild(pathSection);

  // Summary
  const summarySection = document.createElement('div');
  summarySection.className = 'cw-section';
  summarySection.innerHTML = `
    <h3 class="cw-section-label">SUMMARY</h3>
    <p class="cw-summary-text">${terminal.summary}</p>
  `;
  content.appendChild(summarySection);

  // Actions
  const actionsSection = document.createElement('div');
  actionsSection.className = 'cw-section';
  actionsSection.innerHTML = `
    <h3 class="cw-section-label">NEXT ACTIONS</h3>
    ${terminal.actions.map(action => `
      <div class="cw-action-item">
        <div class="cw-action-bullet" style="background: ${accentColor}"></div>
        <span>${action}</span>
      </div>
    `).join('')}
  `;
  content.appendChild(actionsSection);

  // Return precautions
  if (terminal.returnPrecautions?.length) {
    const precautionsSection = document.createElement('div');
    precautionsSection.className = 'cw-section';
    precautionsSection.innerHTML = `
      <h3 class="cw-section-label">RETURN PRECAUTIONS</h3>
      ${terminal.returnPrecautions.map(precaution => `
        <div class="cw-precaution-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${COLORS.warning}" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <span>${precaution}</span>
        </div>
      `).join('')}
    `;
    content.appendChild(precautionsSection);
  }

  // Share button
  const shareBtn = document.createElement('button');
  shareBtn.className = 'cw-share-btn';
  shareBtn.style.background = accentColor;
  shareBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
    <span>Copy to EMR</span>
  `;
  shareBtn.addEventListener('click', () => copyToClipboard(terminal));
  content.appendChild(shareBtn);

  container.appendChild(content);
}

// -------------------------------------------------------------------
// Event Handlers
// -------------------------------------------------------------------

function handleOptionSelect(option: WizardOption, container: HTMLElement): void {
  if (!currentConsult) return;

  const currentStep = currentConsult.steps.find(s => s.id === currentStepId);
  if (!currentStep) return;

  // Add to path
  path.push({
    stepId: currentStepId,
    stepTitle: currentStep.title,
    choiceLabel: option.shortLabel || option.label,
  });

  if (option.isTerminal) {
    terminalId = option.id;
    isComplete = true;
  } else if (option.nextStep) {
    currentStepId = option.nextStep;
  }

  expandedInfo = null;
  checkedItems = new Set(); // Reset checklist for new step
  render(container);
}

function selectOptionById(optionId: string, container: HTMLElement): void {
  if (!currentConsult) return;

  const currentStep = currentConsult.steps.find(s => s.id === currentStepId);
  if (!currentStep) return;

  const option = currentStep.options.find(o => o.id === optionId);
  if (option) {
    handleOptionSelect(option, container);
  }
}

function navigateToStep(targetStepId: string, container: HTMLElement): void {
  // Find the index in path where this step was visited
  const pathIndex = path.findIndex(p => p.stepId === targetStepId);

  if (pathIndex === -1) return;

  // Truncate path to that point (remove all entries from that index onward)
  path = path.slice(0, pathIndex);

  // Navigate to the target step
  currentStepId = targetStepId;
  isComplete = false;
  terminalId = null;
  expandedInfo = null;
  checkedItems = new Set();

  render(container);
}

function handleBack(): void {
  if (path.length === 0) {
    // Exit to category view
    if (currentConsult) {
      router.navigate(`/category/${currentConsult.category}`);
    } else {
      router.navigate('/');
    }
    return;
  }

  const lastEntry = path.pop();
  if (lastEntry) {
    currentStepId = lastEntry.stepId;
  }
  isComplete = false;
  terminalId = null;
  expandedInfo = null;
  checkedItems = new Set();

  const container = document.querySelector('.consult-wizard') as HTMLElement;
  if (container) render(container);
}

function handleRestart(container: HTMLElement): void {
  if (!currentConsult) return;
  currentStepId = currentConsult.steps[0].id;
  path = [];
  isComplete = false;
  terminalId = null;
  expandedInfo = null;
  checkedItems = new Set();
  render(container);
}

function copyToClipboard(terminal: TerminalStep): void {
  if (!currentConsult) return;

  const text = `
${currentConsult.name} - ${terminal.title}

PATH: ${path.map(p => p.choiceLabel).join(' > ')}

SUMMARY:
${terminal.summary}

NEXT ACTIONS:
${terminal.actions.map(a => `- ${a}`).join('\n')}

${terminal.returnPrecautions ? `RETURN PRECAUTIONS:\n${terminal.returnPrecautions.map(p => `- ${p}`).join('\n')}` : ''}

Generated by MedKitt
  `.trim();

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.cw-share-btn') as HTMLElement;
    if (btn) {
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>Copied!</span>
      `;
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    }
  });
}
