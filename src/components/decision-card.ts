// myMedKitt — Decision Card Component
// Renders a single decision node as a card in the card stack.
// Active cards show full content + 3D buttons. Answered cards show compact summary.

import { renderBodyText } from './text-renderer.js';
import { renderInlineCitations } from './reference-table.js';
import { create3DButton } from './button-3d.js';
import { findDrugIdByName } from '../data/drug-store.js';
import type { DecisionNode, TreatmentRegimen, DrugRegimen } from '../models/types.js';
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
  /** Whether this card was auto-advanced (smart skip) */
  autoAdvanced?: boolean;
}

/** Create a decision card DOM element for the given node */
export function createDecisionCard(node: DecisionNode, opts: CardOptions): HTMLElement {
  const card = document.createElement('div');
  card.className = 'decision-card';
  card.setAttribute('data-node-id', node.id);
  card.setAttribute('translate', 'no'); // Prevent browser auto-translation

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
  // All answered cards render as compact pills
  const pill = document.createElement('div');
  pill.className = 'answered-pill';

  if (node.safetyLevel) {
    pill.setAttribute('data-safety-level', node.safetyLevel);
  }

  if (node.options && opts.selectedOptionIndex !== undefined) {
    // Question node: Title → Selected Answer
    const selectedOpt = node.options[opts.selectedOptionIndex];
    const q = document.createElement('span');
    q.className = 'answered-pill__q';
    q.textContent = node.title;
    const arrow = document.createElement('span');
    arrow.className = 'answered-pill__arrow';
    arrow.textContent = '\u2192';
    const a = document.createElement('span');
    a.className = 'answered-pill__a';
    a.textContent = selectedOpt.label;
    if (selectedOpt.urgency === 'critical') a.classList.add('answered-pill__a--critical');
    else if (selectedOpt.urgency === 'urgent') a.classList.add('answered-pill__a--urgent');
    pill.appendChild(q);
    pill.appendChild(arrow);
    pill.appendChild(a);
  } else if (node.type === 'info') {
    // Info node: Title ✓
    pill.classList.add('answered-pill--info');
    if (opts.autoAdvanced) pill.classList.add('answered-pill--auto-advanced');
    const q = document.createElement('span');
    q.className = 'answered-pill__q';
    q.textContent = node.title;
    const check = document.createElement('span');
    check.className = 'answered-pill__check';
    check.textContent = '\u2713';
    pill.appendChild(q);
    pill.appendChild(check);
  }

  card.appendChild(pill);

  // Expanded content container (hidden by default, shown on tap)
  const expandedContent = document.createElement('div');
  expandedContent.className = 'pill-expanded-content';

  // Render read-only full card content inside
  if (node.body) {
    const body = document.createElement('div');
    body.className = 'decision-card__body';
    renderBodyText(body, node.body);
    expandedContent.appendChild(body);
  }

  if (node.options && opts.selectedOptionIndex !== undefined) {
    const selectedOpt = node.options[opts.selectedOptionIndex];
    const answer = document.createElement('div');
    answer.className = 'pill-expanded-answer';
    answer.textContent = '\u2713 ' + selectedOpt.label;
    expandedContent.appendChild(answer);
  }

  card.appendChild(expandedContent);

  // Tap pill to toggle expansion
  pill.addEventListener('click', () => {
    card.classList.toggle('answered-pill--expanded');
  });
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

  // Safety banner (always visible, above everything)
  renderSafetyBanner(card, node);

  // Images (before body so visual examples appear above explanatory text)
  renderNodeImages(card, node);

  // Summary + accordion body OR plain body
  renderBodyWithAccordion(card, node);

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

  // Safety banner (always visible, above everything)
  renderSafetyBanner(card, node);

  renderNodeImages(card, node);

  // Summary + accordion body OR plain body
  renderBodyWithAccordion(card, node);

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

  renderNodeImages(card, node);

  if (node.body) {
    const body = document.createElement('div');
    body.className = 'decision-card__body';
    renderBodyText(body, node.body);
    card.appendChild(body);
  }

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

  // Feature 2: Progressive Disclosure Tabs
  renderProgressiveTabs(card, node);

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

/** Need-to-Know: Safety banner — always visible above accordion */
function renderSafetyBanner(container: HTMLElement, node: DecisionNode): void {
  if (!node.safetyLevel) return;
  const banner = document.createElement('div');
  banner.className = 'safety-banner';
  if (node.safetyLevel === 'critical') {
    banner.classList.add('safety-banner--critical');
    banner.innerHTML = '<span class="safety-banner__icon">\u26D4</span> <span class="safety-banner__text">Critical Safety Point</span>';
  } else {
    banner.classList.add('safety-banner--warning');
    banner.innerHTML = '<span class="safety-banner__icon">\u26A0\uFE0F</span> <span class="safety-banner__text">Safety Consideration</span>';
  }
  container.appendChild(banner);
}

/** Need-to-Know: Render body with summary + accordion, or plain body if no summary */
function renderBodyWithAccordion(container: HTMLElement, node: DecisionNode): void {
  if (node.summary) {
    // Summary paragraph (always visible)
    const summaryEl = document.createElement('p');
    summaryEl.className = 'card-summary';
    summaryEl.textContent = node.summary;
    container.appendChild(summaryEl);

    // Full body in accordion
    if (node.body) {
      const details = document.createElement('details');
      details.className = 'card-accordion';
      const summary = document.createElement('summary');
      summary.className = 'card-accordion__trigger';
      summary.textContent = 'More Details';
      details.appendChild(summary);

      const content = document.createElement('div');
      content.className = 'card-accordion__content';
      renderBodyText(content, node.body);

      // Pearls callout inside accordion
      if (node.pearls) {
        const pearlBox = document.createElement('div');
        pearlBox.className = 'pearl-callout';
        pearlBox.textContent = node.pearls;
        content.appendChild(pearlBox);
      }

      details.appendChild(content);
      container.appendChild(details);
    }
  } else {
    // No summary — render body as normal (backward compatible)
    if (node.body) {
      const body = document.createElement('div');
      body.className = 'decision-card__body';
      renderBodyText(body, node.body);
      container.appendChild(body);
    }
  }
}

/** Feature 2: Progressive Disclosure Tabs (When to Use, Pearls, Evidence) */
function renderProgressiveTabs(container: HTMLElement, node: DecisionNode): void {
  if (!node.whenToUse && !node.pearls && !node.evidence) return;

  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'decision-card__tabs';

  if (node.whenToUse) {
    const tab = document.createElement('details');
    tab.className = 'decision-card__tab decision-card__tab--when';
    tab.innerHTML = `<summary>When to Use</summary><div class="decision-card__tab-content">${node.whenToUse}</div>`;
    tabsContainer.appendChild(tab);
  }

  if (node.pearls) {
    const tab = document.createElement('details');
    tab.className = 'decision-card__tab decision-card__tab--pearls';
    tab.innerHTML = `<summary>Clinical Pearls</summary><div class="decision-card__tab-content">${node.pearls}</div>`;
    tabsContainer.appendChild(tab);
  }

  if (node.evidence) {
    const tab = document.createElement('details');
    tab.className = 'decision-card__tab decision-card__tab--evidence';
    tab.innerHTML = `<summary>Evidence</summary><div class="decision-card__tab-content">${node.evidence}</div>`;
    tabsContainer.appendChild(tab);
  }

  container.appendChild(tabsContainer);
}

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

  // First line dosing row with confidence attribute
  const firstLineRow = document.createElement('div');
  firstLineRow.className = 'dosing-summary-row';
  if (treatment.firstLine.confidence) {
    firstLineRow.setAttribute('data-confidence', treatment.firstLine.confidence);
  }
  const firstLineConfAttr = treatment.firstLine.confidence ? ` data-confidence="${treatment.firstLine.confidence}"` : '';
  firstLineRow.innerHTML = `<span class="dosing-label">1st:</span> <span class="dosing-value"${firstLineConfAttr}>${treatment.firstLine.drug} ${treatment.firstLine.dose} ${treatment.firstLine.route}</span>`;
  summary.appendChild(firstLineRow);

  if (treatment.alternative) {
    const altRow = document.createElement('div');
    altRow.className = 'dosing-summary-row';
    if (treatment.alternative.confidence) {
      altRow.setAttribute('data-confidence', treatment.alternative.confidence);
    }
    const altConfAttr = treatment.alternative.confidence ? ` data-confidence="${treatment.alternative.confidence}"` : '';
    altRow.innerHTML = `<span class="dosing-label">Alt:</span> <span class="dosing-value"${altConfAttr}>${treatment.alternative.drug} ${treatment.alternative.dose} ${treatment.alternative.route}</span>`;
    summary.appendChild(altRow);
  }

  if (treatment.pcnAllergy) {
    const pcnRow = document.createElement('div');
    pcnRow.className = 'dosing-summary-row dosing-pcn';
    if (treatment.pcnAllergy.confidence) {
      pcnRow.setAttribute('data-confidence', treatment.pcnAllergy.confidence);
    }
    const pcnConfAttr = treatment.pcnAllergy.confidence ? ` data-confidence="${treatment.pcnAllergy.confidence}"` : '';
    pcnRow.innerHTML = `<span class="dosing-label">PCN\u2205:</span> <span class="dosing-value"${pcnConfAttr}>${treatment.pcnAllergy.drug} ${treatment.pcnAllergy.dose}</span>`;
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

function renderDrugCard(drug: DrugRegimen): HTMLElement {
  const card = document.createElement('div');
  card.className = 'drug-regimen-card';

  // Apply confidence attribute to the card for left border coloring
  if (drug.confidence) {
    card.setAttribute('data-confidence', drug.confidence);
  }

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
  // Apply confidence attribute to dose highlight for color coding
  if (drug.confidence) {
    doseSpan.setAttribute('data-confidence', drug.confidence);
  }
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
