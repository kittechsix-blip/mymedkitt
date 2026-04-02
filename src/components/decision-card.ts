// myMedKitt — Decision Card Component
// Renders a single decision node as a card in the card stack.
// Active cards show full content + 3D buttons. Answered cards show compact summary.

import { renderBodyText } from './text-renderer.js';
import { renderInlineCitations } from './reference-table.js';
import { create3DButton } from './button-3d.js';
import { findDrugIdByName } from '../data/drug-store.js';
import type { DecisionNode, TreatmentRegimen } from '../models/types.js';
import type { TreeConfig } from '../services/tree-service.js';
import { router } from '../services/router.js';

export interface CardOptions {
  state: 'active' | 'answered';
  selectedOptionIndex?: number;
  selectedLabel?: string;
  onOptionSelect?: (index: number) => void;
  onContinue?: () => void;
  onStartOver?: () => void;
  onHome?: () => void;
  config?: TreeConfig;
  treeId?: string;
  entryNodeId?: string;
  quickFireMode?: boolean;
}

/** Create a decision card DOM element for the given node */
export function createDecisionCard(node: DecisionNode, opts: CardOptions): HTMLElement {
  const card = document.createElement('div');
  card.className = 'decision-card';
  card.setAttribute('data-node-id', node.id);

  if (opts.state === 'answered') {
    card.classList.add('decision-card--answered');
    renderAnsweredCard(card, node, opts);
  } else {
    card.classList.add('decision-card--active');
    switch (node.type) {
      case 'question':
        renderActiveQuestion(card, node, opts);
        break;
      case 'info':
        renderActiveInfo(card, node, opts);
        break;
      case 'result':
        renderActiveResult(card, node, opts);
        break;
      case 'input':
        renderActiveQuestion(card, node, opts);
        break;
    }
  }

  return card;
}

// -------------------------------------------------------------------
// Answered card (compact)
// -------------------------------------------------------------------

function renderAnsweredCard(card: HTMLElement, node: DecisionNode, opts: CardOptions): void {
  // Quick fire mode: ultra-compact pill format
  if (opts.quickFireMode) {
    card.classList.add('decision-card--quick-fire');

    if (node.options && opts.selectedOptionIndex !== undefined) {
      const selectedOpt = node.options[opts.selectedOptionIndex];
      // Single line: Question → Answer
      const pill = document.createElement('div');
      pill.className = 'quick-fire-pill';
      pill.innerHTML = `<span class="quick-fire-pill__q">${node.title}</span> <span class="quick-fire-pill__arrow">&rarr;</span> <span class="quick-fire-pill__a">${selectedOpt.label}</span>`;
      card.appendChild(pill);
    } else if (node.type === 'info') {
      const pill = document.createElement('div');
      pill.className = 'quick-fire-pill quick-fire-pill--info';
      pill.innerHTML = `<span class="quick-fire-pill__q">${node.title}</span> <span class="quick-fire-pill__arrow">&check;</span>`;
      card.appendChild(pill);
    }
    return;
  }

  // Standard answered card: Question + Answer format for better context
  if (node.options && opts.selectedOptionIndex !== undefined) {
    const selectedOpt = node.options[opts.selectedOptionIndex];

    // Question label (small, muted)
    const questionLabel = document.createElement('div');
    questionLabel.className = 'answered-card__question';
    questionLabel.textContent = node.title;
    card.appendChild(questionLabel);

    // Selected answer (prominent)
    let variant: 'yes' | 'critical' | 'urgent';
    if (selectedOpt.urgency === 'critical') {
      variant = 'critical';
    } else if (selectedOpt.urgency === 'urgent') {
      variant = 'urgent';
    } else {
      variant = 'yes';
    }

    const answerBtn = create3DButton(selectedOpt.label, { variant });
    answerBtn.className += ' answered-card__answer';
    answerBtn.style.minHeight = '36px';
    answerBtn.style.padding = '6px 14px';
    answerBtn.style.fontSize = '14px';
    answerBtn.style.pointerEvents = 'none';
    card.appendChild(answerBtn);
  } else if (node.type === 'info') {
    // Info nodes show "Continued →" indicator
    const indicator = document.createElement('div');
    indicator.style.fontSize = '13px';
    indicator.style.color = 'var(--color-text-muted)';
    indicator.textContent = 'Continued \u2192';
    card.appendChild(indicator);
  }
}

// -------------------------------------------------------------------
// Active question card
// -------------------------------------------------------------------

function renderActiveQuestion(card: HTMLElement, node: DecisionNode, opts: CardOptions): void {
  // Title
  const title = document.createElement('h2');
  title.className = 'decision-card__title';
  title.textContent = node.title;
  card.appendChild(title);

  // Body
  if (node.body) {
    const body = document.createElement('div');
    body.className = 'decision-card__body';
    renderBodyText(body, node.body);
    card.appendChild(body);
  }

  // Images
  renderNodeImages(card, node);

  // Calculator links
  renderCalcLinks(card, node);

  // Citations
  if (node.citation?.length && opts.config) {
    renderInlineCitations(card, node.citation, opts.config.citations);
  }

  // Option buttons
  if (node.options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'decision-card__options';

    for (let i = 0; i < node.options.length; i++) {
      const opt = node.options[i];

      let variant: 'charcoal' | 'critical' | 'urgent' = 'charcoal';
      if (opt.urgency === 'critical') variant = 'critical';
      else if (opt.urgency === 'urgent') variant = 'urgent';

      const btn = create3DButton(opt.label, {
        variant,
        description: opt.description,
        onClick: () => opts.onOptionSelect?.(i),
      });

      optionsContainer.appendChild(btn);
    }

    card.appendChild(optionsContainer);
  }
}

// -------------------------------------------------------------------
// Active info card
// -------------------------------------------------------------------

function renderActiveInfo(card: HTMLElement, node: DecisionNode, opts: CardOptions): void {
  const title = document.createElement('h2');
  title.className = 'decision-card__title';
  title.textContent = node.title;
  card.appendChild(title);

  if (node.body) {
    const body = document.createElement('div');
    body.className = 'decision-card__body';
    renderBodyText(body, node.body);
    card.appendChild(body);
  }

  renderNodeImages(card, node);
  renderCalcLinks(card, node);

  if (node.citation?.length && opts.config) {
    renderInlineCitations(card, node.citation, opts.config.citations);
  }

  if (node.next) {
    const continueBtn = create3DButton('Continue \u2192', {
      variant: 'charcoal',
      onClick: () => opts.onContinue?.(),
    });
    card.appendChild(continueBtn);
  }
}

// -------------------------------------------------------------------
// Active result card
// -------------------------------------------------------------------

function renderActiveResult(card: HTMLElement, node: DecisionNode, opts: CardOptions): void {
  // Add result-specific class for confidence pulse animation
  card.classList.add('decision-card--result');

  // Confidence badge
  if (node.confidence) {
    const badge = document.createElement('div');
    badge.className = 'decision-card__result-badge';
    if (node.confidence === 'definitive') badge.classList.add('decision-card__result-badge--definitive');
    else if (node.confidence === 'recommended') badge.classList.add('decision-card__result-badge--recommended');
    else if (node.confidence === 'consider') badge.classList.add('decision-card__result-badge--consider');
    badge.textContent = node.title;
    card.appendChild(badge);
  } else {
    const title = document.createElement('h2');
    title.className = 'decision-card__title';
    title.textContent = node.title;
    card.appendChild(title);
  }

  if (node.body) {
    const body = document.createElement('div');
    body.className = 'decision-card__body';
    renderBodyText(body, node.body);
    card.appendChild(body);
  }

  renderNodeImages(card, node);

  // Recommendation
  if (node.recommendation) {
    const rec = document.createElement('div');
    rec.className = 'result-recommendation';
    renderBodyText(rec, node.recommendation);
    card.appendChild(rec);
  }

  // Treatment
  if (node.treatment) {
    renderTreatment(card, node.treatment);
  }

  // Citations
  if (node.citation?.length && opts.config) {
    renderInlineCitations(card, node.citation, opts.config.citations);
  }

  // Reference link
  const refLink = document.createElement('button');
  refLink.className = 'btn-text reference-link';
  refLink.textContent = '\uD83D\uDCCB Full Reference Tables';
  refLink.addEventListener('click', () => {
    const treeId = opts.treeId || '';
    router.navigate(`/reference/${treeId}`);
  });
  card.appendChild(refLink);

  // Actions
  const actions = document.createElement('div');
  actions.className = 'result-actions';

  const restartBtn = create3DButton('Start Over', {
    variant: 'charcoal',
    onClick: () => opts.onStartOver?.(),
  });
  restartBtn.style.flex = '1';
  actions.appendChild(restartBtn);

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn-text';
  homeBtn.textContent = '\u2190 All Categories';
  homeBtn.addEventListener('click', () => opts.onHome?.());
  actions.appendChild(homeBtn);

  card.appendChild(actions);
}

// -------------------------------------------------------------------
// Shared render helpers
// -------------------------------------------------------------------

function renderNodeImages(container: HTMLElement, node: DecisionNode): void {
  if (!node.images || node.images.length === 0) return;

  const gallery = document.createElement('div');
  gallery.className = 'wizard-images';

  for (const img of node.images) {
    const figure = document.createElement('figure');
    figure.className = 'wizard-image-figure';

    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = img.alt;
    imgEl.className = 'wizard-image';
    imgEl.loading = 'lazy';
    figure.appendChild(imgEl);

    if (img.caption) {
      const caption = document.createElement('figcaption');
      caption.className = 'wizard-image-caption';
      caption.textContent = img.caption;
      figure.appendChild(caption);
    }

    gallery.appendChild(figure);
  }

  container.appendChild(gallery);
}

function renderCalcLinks(container: HTMLElement, node: DecisionNode): void {
  if (!node.calculatorLinks?.length) return;
  const linkRow = document.createElement('div');
  linkRow.className = 'wizard-calc-links';
  for (const link of node.calculatorLinks) {
    const btn = document.createElement('button');
    btn.className = 'btn-secondary wizard-calc-link';
    btn.textContent = link.label;
    btn.addEventListener('click', () => router.navigate(`/calculator/${link.id}`));
    linkRow.appendChild(btn);
  }
  container.appendChild(linkRow);
}

function renderTreatment(container: HTMLElement, treatment: TreatmentRegimen): void {
  const section = document.createElement('div');
  section.className = 'treatment-section';

  const heading = document.createElement('h2');
  heading.className = 'treatment-heading';
  heading.textContent = 'Treatment';
  section.appendChild(heading);

  // Dosing Summary Bar - quick glance at key doses
  const summary = document.createElement('div');
  summary.className = 'dosing-summary';

  const firstLineRow = document.createElement('div');
  firstLineRow.className = 'dosing-summary-row';
  firstLineRow.innerHTML = `<span class="dosing-label">1st:</span> <span class="dosing-value">${treatment.firstLine.drug} ${treatment.firstLine.dose} ${treatment.firstLine.route}</span>`;
  summary.appendChild(firstLineRow);

  if (treatment.alternative) {
    const altRow = document.createElement('div');
    altRow.className = 'dosing-summary-row';
    altRow.innerHTML = `<span class="dosing-label">Alt:</span> <span class="dosing-value">${treatment.alternative.drug} ${treatment.alternative.dose} ${treatment.alternative.route}</span>`;
    summary.appendChild(altRow);
  }

  if (treatment.pcnAllergy) {
    const pcnRow = document.createElement('div');
    pcnRow.className = 'dosing-summary-row dosing-pcn';
    pcnRow.innerHTML = `<span class="dosing-label">PCN\u2205:</span> <span class="dosing-value">${treatment.pcnAllergy.drug} ${treatment.pcnAllergy.dose}</span>`;
    summary.appendChild(pcnRow);
  }

  section.appendChild(summary);

  section.appendChild(renderDrugCard(treatment.firstLine));

  if (treatment.alternative) {
    const altDetails = document.createElement('details');
    altDetails.className = 'treatment-expandable';
    const altSummary = document.createElement('summary');
    altSummary.textContent = '\u25B8 Alternative regimen';
    altDetails.appendChild(altSummary);
    altDetails.appendChild(renderDrugCard(treatment.alternative));
    section.appendChild(altDetails);
  }

  if (treatment.pcnAllergy) {
    const pcnDetails = document.createElement('details');
    pcnDetails.className = 'treatment-expandable';
    const pcnSummary = document.createElement('summary');
    pcnSummary.textContent = '\u25B8 PCN allergy alternatives';
    pcnDetails.appendChild(pcnSummary);
    pcnDetails.appendChild(renderDrugCard(treatment.pcnAllergy));
    section.appendChild(pcnDetails);
  }

  if (treatment.monitoring) {
    const monDetails = document.createElement('details');
    monDetails.className = 'treatment-expandable';
    const monSummary = document.createElement('summary');
    monSummary.textContent = '\u25B8 Follow-up monitoring';
    monDetails.appendChild(monSummary);
    const monBody = document.createElement('div');
    monBody.className = 'treatment-monitoring';
    renderBodyText(monBody, treatment.monitoring);
    monDetails.appendChild(monBody);
    section.appendChild(monDetails);
  }

  container.appendChild(section);
}

function renderDrugCard(drug: { drug: string; dose: string; route: string; frequency: string; duration: string; notes?: string }): HTMLElement {
  const card = document.createElement('div');
  card.className = 'drug-regimen-card';

  const drugName = document.createElement('div');
  drugName.className = 'drug-regimen-name';
  const drugStoreId = findDrugIdByName(drug.drug);
  if (drugStoreId) {
    const drugLink = document.createElement('button');
    drugLink.className = 'body-inline-link';
    drugLink.textContent = drug.drug;
    drugLink.setAttribute('data-link-type', 'drug');
    drugLink.setAttribute('data-link-id', drugStoreId);
    drugName.appendChild(drugLink);
  } else {
    drugName.textContent = drug.drug;
  }
  card.appendChild(drugName);

  const doseRow = document.createElement('div');
  doseRow.className = 'drug-regimen-dose';
  const doseSpan = document.createElement('span');
  doseSpan.className = 'dose-highlight';
  doseSpan.textContent = `${drug.dose} ${drug.route}`;
  doseRow.appendChild(doseSpan);
  card.appendChild(doseRow);

  const freqRow = document.createElement('div');
  freqRow.className = 'drug-regimen-detail';
  freqRow.textContent = `Frequency: ${drug.frequency}`;
  card.appendChild(freqRow);

  const durRow = document.createElement('div');
  durRow.className = 'drug-regimen-detail';
  durRow.textContent = `Duration: ${drug.duration}`;
  card.appendChild(durRow);

  if (drug.notes) {
    const notes = document.createElement('div');
    notes.className = 'drug-regimen-notes';
    renderBodyText(notes, drug.notes);
    card.appendChild(notes);
  }

  return card;
}
