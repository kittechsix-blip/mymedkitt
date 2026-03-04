// MedKitt — Wizard UI Component
// Renders one decision node at a time with progress, back nav, and option buttons.

import { TreeEngine } from '../services/tree-engine.js';
import { getTreeConfig } from '../services/tree-service.js';
import type { TreeConfig } from '../services/tree-service.js';
import { router } from '../services/router.js';

import { renderInlineCitations } from './reference-table.js';
import { showInfoModal } from './info-page.js';
import { showDrugModal } from './drug-store.js';
import { findDrugIdByName } from '../data/drug-store.js';
import type { DecisionNode, TreatmentRegimen } from '../models/types.js';

let engine: TreeEngine | null = null;
let currentTreeId: string | null = null;
let currentConfig: TreeConfig | null = null;
let currentEntryNodeId: string | null = null;
let delegatedContainer: HTMLElement | null = null;
let jumpNodeListenerRegistered = false;
let visitedModules: Set<number> = new Set();
let moduleFirstNodeMap: Map<number, string> = new Map();

/** Handle clicks on inline links via event delegation (most reliable on iOS Safari) */
function handleInlineLinkClick(e: Event): void {
  const target = (e.target as HTMLElement).closest('[data-link-type]') as HTMLElement | null;
  if (!target) return;
  e.preventDefault();
  e.stopPropagation();
  const linkType = target.getAttribute('data-link-type');
  const linkId = target.getAttribute('data-link-id');
  if (!linkType || !linkId) return;
  if (linkType === 'drug') {
    const slashIdx = linkId.indexOf('/');
    if (slashIdx !== -1) {
      showDrugModal(linkId.slice(0, slashIdx), linkId.slice(slashIdx + 1));
    } else {
      showDrugModal(linkId);
    }
  } else if (linkType === 'calculator') router.navigate(`/calculator/${linkId}`);
  else if (linkType === 'tree') router.navigate('/tree/' + linkId);
  else if (linkType === 'node') {
    // Jump to a specific node within the current tree
    if (engine && delegatedContainer) {
      engine.jumpToNode(linkId);
      renderCurrentNode(delegatedContainer);
    }
  }
  else showInfoModal(linkId);
}

/** Initialize and render the wizard for a given tree */
export async function renderTreeWizard(container: HTMLElement, treeId: string): Promise<void> {
  const config = await getTreeConfig(treeId);
  if (!config) {
    renderUnavailable(container, treeId);
    return;
  }

  currentTreeId = treeId;
  currentConfig = config;
  engine = new TreeEngine(config.nodes);

  // Build module → first node map and reset visited tracking
  visitedModules = new Set();
  moduleFirstNodeMap = new Map();
  for (const node of config.nodes) {
    if (!moduleFirstNodeMap.has(node.module)) {
      moduleFirstNodeMap.set(node.module, node.id);
    }
  }

  // Set up delegated click handler for inline links (once per container)
  if (delegatedContainer !== container) {
    if (delegatedContainer) {
      delegatedContainer.removeEventListener('click', handleInlineLinkClick);
    }
    container.addEventListener('click', handleInlineLinkClick);
    delegatedContainer = container;
  }

  // Listen for node-jump events from info page modals (register once)
  if (!jumpNodeListenerRegistered) {
    jumpNodeListenerRegistered = true;
    window.addEventListener('medkitt-jump-node', ((e: CustomEvent) => {
      if (engine && delegatedContainer) {
        engine.jumpToNode(e.detail);
        renderCurrentNode(delegatedContainer);
      }
    }) as EventListener);
  }

  // Check for category-specific entry point override
  const entryOverride = sessionStorage.getItem('medkitt-tree-entry');
  sessionStorage.removeItem('medkitt-tree-entry');
  const entryNodeId = entryOverride || config.entryNodeId;
  currentEntryNodeId = entryNodeId;

  // If entry override differs from default, always start fresh at that entry
  if (entryOverride && entryOverride !== config.entryNodeId) {
    engine.startTree(treeId, entryNodeId);
  } else {
    // Try to restore a saved session
    const restored = engine.restoreSession(treeId);
    if (!restored) {
      engine.startTree(treeId, entryNodeId);
    }
  }

  renderCurrentNode(container);
}

/** Render the current node into the container */
function renderCurrentNode(container: HTMLElement): void {
  if (!engine) return;

  const node = engine.getCurrentNode();
  if (!node) return;

  visitedModules.add(node.module);

  container.innerHTML = '';

  // Disclaimer banner on the first node of each consult
  if (currentEntryNodeId && node.id === currentEntryNodeId) {
    const banner = document.createElement('div');
    banner.className = 'wizard-disclaimer';
    banner.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
    container.appendChild(banner);
  }

  // Header bar: back button + nav
  const header = renderHeader(node);
  container.appendChild(header);

  // Module progress bubble bar
  if (currentConfig && currentConfig.moduleLabels.length > 1) {
    const moduleBar = renderModuleBar(node.module);
    container.appendChild(moduleBar);
  }

  // Node content
  const content = document.createElement('div');
  content.className = 'wizard-content';

  switch (node.type) {
    case 'question':
      renderQuestionNode(content, node, container);
      break;
    case 'info':
      renderInfoNode(content, node, container);
      break;
    case 'result':
      renderResultNode(content, node, container);
      break;
    case 'input':
      renderInputNode(content, node, container);
      break;
  }

  container.appendChild(content);
}

// -------------------------------------------------------------------
// Header (back button + progress)
// -------------------------------------------------------------------

function renderHeader(node: DecisionNode): HTMLElement {
  const header = document.createElement('div');
  header.className = 'wizard-header';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text wizard-back';

  if (engine?.canGoBack()) {
    backBtn.textContent = '\u2190 Back';
    backBtn.addEventListener('click', () => {
      if (!engine) return;
      engine.goBack();
      const container = document.querySelector('.main-content') as HTMLElement;
      if (container) renderCurrentNode(container);
    });
  } else {
    backBtn.textContent = '\u2190 Exit';
    backBtn.addEventListener('click', () => {
      if (engine) engine.reset();
      visitedModules = new Set();
      const sourceCategory = sessionStorage.getItem('medkitt-source-category') || currentConfig?.categoryId || '';
      router.navigate(sourceCategory ? `/category/${sourceCategory}` : '/');
    });
  }

  // "Top" button — right-aligned, hidden on entry node
  const isOnEntry = currentEntryNodeId && node.id === currentEntryNodeId;

  const topBtn = document.createElement('button');
  topBtn.className = 'btn-text wizard-top';
  topBtn.textContent = '\u2191 Top';
  topBtn.setAttribute('aria-label', 'Go to beginning of consult');

  if (isOnEntry) {
    topBtn.style.visibility = 'hidden';
  }

  topBtn.addEventListener('click', () => {
    if (!engine || !currentEntryNodeId) return;
    engine.goToEntry(currentEntryNodeId);
    const cont = document.querySelector('.main-content') as HTMLElement;
    if (cont) renderCurrentNode(cont);
  });

  // Share button
  const shareBtn = document.createElement('button');
  shareBtn.className = 'btn-text wizard-share';
  shareBtn.textContent = '\u{1F517}';
  shareBtn.setAttribute('aria-label', 'Share consult link');
  shareBtn.addEventListener('click', () => {
    if (!currentConfig) return;
    const treeId = currentTreeId ?? '';
    const url = `${window.location.origin}${window.location.pathname}#/tree/${treeId}`;
    if (navigator.share) {
      navigator.share({ title: `MedKitt: ${node.title}`, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        shareBtn.textContent = '\u2713';
        setTimeout(() => { shareBtn.textContent = '\u{1F517}'; }, 1500);
      }).catch(() => {});
    }
  });

  const rightGroup = document.createElement('div');
  rightGroup.className = 'wizard-header-right';
  rightGroup.appendChild(shareBtn);
  rightGroup.appendChild(topBtn);

  header.appendChild(backBtn);
  header.appendChild(rightGroup);

  return header;
}

// -------------------------------------------------------------------
// Module Progress Bubble Bar
// -------------------------------------------------------------------

function renderModuleBar(currentModuleNumber: number): HTMLElement {
  const bar = document.createElement('div');
  bar.className = 'wizard-module-bar';

  const labels = currentConfig!.moduleLabels;
  const totalModules = labels.length;

  for (let i = 0; i < totalModules; i++) {
    const moduleNum = i + 1;
    const label = labels[i] ?? `Module ${moduleNum}`;
    const isVisited = visitedModules.has(moduleNum);
    const isCurrent = moduleNum === currentModuleNumber;
    const firstNodeId = moduleFirstNodeMap.get(moduleNum);

    const bubble = document.createElement('button');
    bubble.className = 'wizard-module-bubble';
    bubble.textContent = label;

    if (isCurrent) {
      bubble.classList.add('wizard-module-bubble--current');
    } else if (isVisited) {
      bubble.classList.add('wizard-module-bubble--visited');
    }

    if (firstNodeId) {
      bubble.addEventListener('click', () => {
        if (!engine || !delegatedContainer) return;
        engine.jumpToNode(firstNodeId);
        renderCurrentNode(delegatedContainer);
      });
    }

    bar.appendChild(bubble);
  }

  // Auto-scroll to current bubble after paint
  requestAnimationFrame(() => {
    const currentBubble = bar.querySelector('.wizard-module-bubble--current') as HTMLElement | null;
    if (currentBubble) {
      currentBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  return bar;
}

// -------------------------------------------------------------------
// Question Node
// -------------------------------------------------------------------

function renderQuestionNode(content: HTMLElement, node: DecisionNode, container: HTMLElement): void {
  const title = document.createElement('h2');
  title.className = 'wizard-title';
  title.textContent = node.title;
  content.appendChild(title);

  const body = document.createElement('div');
  body.className = 'wizard-body';
  renderBodyText(body, node.body);
  content.appendChild(body);

  // Images (e.g., ultrasound reference images)
  renderNodeImages(content, node);

  // Calculator links (e.g., PESI / sPESI buttons)
  if (node.calculatorLinks?.length) {
    const linkRow = document.createElement('div');
    linkRow.className = 'wizard-calc-links';
    for (const link of node.calculatorLinks) {
      const btn = document.createElement('button');
      btn.className = 'btn-secondary wizard-calc-link';
      btn.textContent = link.label;
      btn.addEventListener('click', () => router.navigate(`/calculator/${link.id}`));
      linkRow.appendChild(btn);
    }
    content.appendChild(linkRow);
  }

  if (node.citation?.length) {
    const cite = document.createElement('div');
    cite.className = 'wizard-citation';
    cite.textContent = `Evidence: ${node.citation.map(n => `[${n}]`).join(' ')}`;
    content.appendChild(cite);
  }

  // Option buttons
  if (node.options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'wizard-options';

    for (let i = 0; i < node.options.length; i++) {
      const opt = node.options[i];
      const btn = document.createElement('button');
      btn.className = 'option-btn';

      if (opt.urgency === 'critical') {
        btn.classList.add('option-critical');
      } else if (opt.urgency === 'urgent') {
        btn.classList.add('option-urgent');
      }

      const label = document.createElement('span');
      label.className = 'option-label';
      label.textContent = opt.label;
      btn.appendChild(label);

      if (opt.description) {
        const desc = document.createElement('span');
        desc.className = 'option-description';
        desc.textContent = opt.description;
        btn.appendChild(desc);
      }

      btn.addEventListener('click', () => {
        if (!engine) return;
        engine.selectOption(i);
        renderCurrentNode(container);
      });

      optionsContainer.appendChild(btn);
    }

    content.appendChild(optionsContainer);
  }
}

// -------------------------------------------------------------------
// Info Node
// -------------------------------------------------------------------

function renderInfoNode(content: HTMLElement, node: DecisionNode, container: HTMLElement): void {
  const title = document.createElement('h2');
  title.className = 'wizard-title';
  title.textContent = node.title;
  content.appendChild(title);

  const body = document.createElement('div');
  body.className = 'wizard-body';
  renderBodyText(body, node.body);
  content.appendChild(body);

  // Images (e.g., ultrasound reference images)
  renderNodeImages(content, node);

  if (node.citation?.length) {
    const cite = document.createElement('div');
    cite.className = 'wizard-citation';
    cite.textContent = `Evidence: ${node.citation.map(n => `[${n}]`).join(' ')}`;
    content.appendChild(cite);
  }

  if (node.next) {
    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn-primary wizard-continue';
    continueBtn.textContent = 'Continue \u2192';
    continueBtn.addEventListener('click', () => {
      if (!engine) return;
      engine.continueToNext();
      renderCurrentNode(container);
    });
    content.appendChild(continueBtn);
  }
}

// -------------------------------------------------------------------
// Result Node
// -------------------------------------------------------------------

function renderResultNode(content: HTMLElement, node: DecisionNode, _container: HTMLElement): void {
  // Urgency badge
  const badge = document.createElement('div');
  badge.className = 'result-badge';
  if (node.confidence === 'definitive') {
    badge.classList.add('badge-definitive');
  } else if (node.confidence === 'recommended') {
    badge.classList.add('badge-recommended');
  } else if (node.confidence === 'consider') {
    badge.classList.add('badge-consider');
  }
  badge.textContent = node.title;
  content.appendChild(badge);

  const body = document.createElement('div');
  body.className = 'wizard-body';
  renderBodyText(body, node.body);
  content.appendChild(body);

  // Images (e.g., ultrasound reference images on result cards)
  renderNodeImages(content, node);

  // Recommendation
  if (node.recommendation) {
    const rec = document.createElement('div');
    rec.className = 'result-recommendation';
    renderBodyText(rec, node.recommendation);
    content.appendChild(rec);
  }

  // Treatment regimen
  if (node.treatment) {
    renderTreatment(content, node.treatment);
  }

  // Expandable citations on result cards
  if (node.citation?.length && currentConfig) {
    renderInlineCitations(content, node.citation, currentConfig.citations);
  }

  // Full reference link
  const refLink = document.createElement('button');
  refLink.className = 'btn-text reference-link';
  refLink.textContent = '\uD83D\uDCCB Full Reference Tables';
  refLink.addEventListener('click', () => {
    
    router.navigate(`/reference/${currentTreeId}`);
  });
  content.appendChild(refLink);

  // Answer summary
  const history = engine?.getAnswerHistory();
  if (history && history.length > 0) {
    const summarySection = document.createElement('details');
    summarySection.className = 'result-summary';

    const summaryTitle = document.createElement('summary');
    summaryTitle.textContent = `Decision path (${history.length} steps)`;
    summarySection.appendChild(summaryTitle);

    const summaryList = document.createElement('div');
    summaryList.className = 'result-summary-list';
    for (const entry of history) {
      const item = document.createElement('div');
      item.className = 'result-summary-item';

      const q = document.createElement('span');
      q.className = 'summary-question';
      q.textContent = entry.nodeTitle;

      const a = document.createElement('span');
      a.className = 'summary-answer';
      a.textContent = entry.answer;

      item.appendChild(q);
      item.appendChild(a);
      summaryList.appendChild(item);
    }
    summarySection.appendChild(summaryList);
    content.appendChild(summarySection);
  }

  // Start Over button
  const actions = document.createElement('div');
  actions.className = 'result-actions';

  const restartBtn = document.createElement('button');
  restartBtn.className = 'btn-secondary';
  restartBtn.textContent = 'Start Over';
  restartBtn.addEventListener('click', () => {
    if (engine) engine.reset();
    visitedModules = new Set();
    const container = document.getElementById('main-content');
    if (container && currentTreeId) {
      container.innerHTML = '';
      void renderTreeWizard(container, currentTreeId);
    }
  });

  const homeBtn = document.createElement('button');
  homeBtn.className = 'btn-text';
  homeBtn.textContent = '\u2190 All Categories';
  homeBtn.addEventListener('click', () => {
    if (engine) engine.reset();
    visitedModules = new Set();
    router.navigate('/');
  });

  actions.appendChild(restartBtn);
  actions.appendChild(homeBtn);
  content.appendChild(actions);
}

// -------------------------------------------------------------------
// Input Node (placeholder — CSF values etc.)
// -------------------------------------------------------------------

function renderInputNode(content: HTMLElement, node: DecisionNode, container: HTMLElement): void {
  // Render same as question for now — input fields come with Task 8 refinements
  renderQuestionNode(content, node, container);
}

// -------------------------------------------------------------------
// Treatment Display
// -------------------------------------------------------------------

function renderTreatment(container: HTMLElement, treatment: TreatmentRegimen): void {
  const section = document.createElement('div');
  section.className = 'treatment-section';

  const heading = document.createElement('h2');
  heading.className = 'treatment-heading';
  heading.textContent = 'Treatment';
  section.appendChild(heading);

  // First-line
  section.appendChild(renderDrugCard('First-Line', treatment.firstLine));

  // Alternative (expandable)
  if (treatment.alternative) {
    const altDetails = document.createElement('details');
    altDetails.className = 'treatment-expandable';
    const altSummary = document.createElement('summary');
    altSummary.textContent = '\u25B8 Alternative regimen';
    altDetails.appendChild(altSummary);
    altDetails.appendChild(renderDrugCard('Alternative', treatment.alternative));
    section.appendChild(altDetails);
  }

  // PCN allergy (expandable)
  if (treatment.pcnAllergy) {
    const pcnDetails = document.createElement('details');
    pcnDetails.className = 'treatment-expandable';
    const pcnSummary = document.createElement('summary');
    pcnSummary.textContent = '\u25B8 PCN allergy alternatives';
    pcnDetails.appendChild(pcnSummary);
    pcnDetails.appendChild(renderDrugCard('PCN Allergy', treatment.pcnAllergy));
    section.appendChild(pcnDetails);
  }

  // Monitoring (expandable)
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

function renderDrugCard(_label: string, drug: { drug: string; dose: string; route: string; frequency: string; duration: string; notes?: string }): HTMLElement {
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

// -------------------------------------------------------------------
// Image Rendering
// -------------------------------------------------------------------

/** Render node images as responsive figures with optional captions */
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

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------

/** Render body text with line breaks preserved. Supports [text](#/info/id), [text](#/drug/id), [text](#/calculator/id), [text](#/tree/id), and [text](https://url) links. */
function renderBodyText(container: HTMLElement, text: string): void {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
      container.appendChild(document.createElement('br'));
    } else if (linkPattern.test(line)) {
      // Line contains inline link(s) — build DOM manually
      linkPattern.lastIndex = 0;
      const p = document.createElement('p');
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = linkPattern.exec(line)) !== null) {
        const linkLabel = match[1];
        const linkUrl = match[2];
        // Text before the link
        if (match.index > lastIndex) {
          appendBoldAware(p, line.slice(lastIndex, match.index));
        }
        if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
          // External link — opens in new tab
          const link = document.createElement('a');
          link.className = 'body-inline-link';
          link.href = linkUrl;
          link.textContent = linkLabel;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          p.appendChild(link);
        } else {
          // Internal link — uses data attributes + event delegation for iOS Safari reliability
          const parts = linkUrl.replace(/^#\//, '').split('/');
          const linkType = parts[0];
          const linkId = parts.slice(1).join('/');
          const link = document.createElement('button');
          link.className = 'body-inline-link';
          link.textContent = linkLabel;
          link.setAttribute('data-link-type', linkType);
          link.setAttribute('data-link-id', linkId);
          p.appendChild(link);
        }
        lastIndex = match.index + match[0].length;
      }
      // Text after the last link
      if (lastIndex < line.length) {
        appendBoldAware(p, line.slice(lastIndex));
      }
      container.appendChild(p);
    } else {
      const p = document.createElement('p');
      appendBoldAware(p, line);
      container.appendChild(p);
    }
  }
}

/** Append text to a parent element, converting **bold** markers to <strong> elements. */
function appendBoldAware(parent: HTMLElement, text: string): void {
  const boldPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const strong = document.createElement('strong');
    strong.textContent = match[1];
    parent.appendChild(strong);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parent.appendChild(document.createTextNode(text.slice(lastIndex)));
  } else if (lastIndex === 0) {
    parent.appendChild(document.createTextNode(text));
  }
}

/** Render "tree not available" state */
function renderUnavailable(container: HTMLElement, treeId: string): void {
  container.innerHTML = '';

  const backBtn = document.createElement('button');
  backBtn.className = 'btn-text';
  backBtn.textContent = '\u2190 Categories';
  backBtn.addEventListener('click', () => router.navigate('/'));
  container.appendChild(backBtn);

  const empty = document.createElement('div');
  empty.className = 'empty-state';

  const icon = document.createElement('div');
  icon.className = 'empty-state-icon';
  icon.textContent = '\uD83D\uDEA7';

  const title = document.createElement('h3');
  title.textContent = 'Coming Soon';

  const body = document.createElement('p');
  body.textContent = `Decision tree "${treeId}" is not yet available.`;

  empty.appendChild(icon);
  empty.appendChild(title);
  empty.appendChild(body);
  container.appendChild(empty);
}
