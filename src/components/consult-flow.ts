// myMedKitt — Consult Flow (replaces tree-wizard.ts)
// Renders stacked decision cards on pearl white background.
// Uses ConsultFlowController for state management.

import { ConsultFlowController } from '../services/consult-flow-controller.js';
import { getTreeConfig } from '../services/tree-service.js';
import type { TreeConfig } from '../services/tree-service.js';
import { createDecisionCard } from './decision-card.js';
import { handleInlineLinkClick } from './text-renderer.js';
import { renderContextualToolbar, removeContextualToolbar } from './contextual-toolbar.js';
import { getSpecialtyGradient } from './button-3d.js';
import { router } from '../services/router.js';
import { getAllCategories } from '../services/category-service.js';
// SAFE: Dosing banner now only shows doses the user explicitly adds (no regex extraction)
import { renderDosingBanner, removeDosingBanner } from './dosing-banner.js';
import { isQuickFireMode, renderQuickFireToggle, initQuickFireMode } from './quick-fire-mode.js';

let controller: ConsultFlowController | null = null;
let currentConfig: TreeConfig | null = null;
let currentEntryNodeId: string | null = null;
let currentTreeId: string | null = null;
let delegatedContainer: HTMLElement | null = null;
let jumpNodeListenerRegistered = false;
let searchOpen = false;
let quickFireListenerRegistered = false;

// Initialize quick fire mode state on module load
initQuickFireMode();

/** Initialize and render the consult flow for a given tree */
export async function renderConsultFlow(container: HTMLElement, treeId: string): Promise<void> {
  const config = await getTreeConfig(treeId);
  if (!config) {
    renderUnavailable(container, treeId);
    return;
  }

  currentConfig = config;
  currentTreeId = treeId;
  controller = new ConsultFlowController(config.nodes);

  // Set up delegated click handler for inline links
  if (delegatedContainer !== container) {
    if (delegatedContainer) {
      delegatedContainer.removeEventListener('click', onInlineLinkClick);
    }
    container.addEventListener('click', onInlineLinkClick);
    delegatedContainer = container;
  }

  // Listen for node-jump events from info page modals
  if (!jumpNodeListenerRegistered) {
    jumpNodeListenerRegistered = true;
    window.addEventListener('medkitt-jump-node', ((e: CustomEvent) => {
      if (controller && delegatedContainer) {
        controller.jumpToNode(e.detail);
        renderFlow(delegatedContainer);
        // Scroll to the active card after jump
        requestAnimationFrame(() => {
          if (!delegatedContainer) return;
          const activeCard = delegatedContainer.querySelector('.decision-card--active');
          if (activeCard) {
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      }
    }) as EventListener);
  }

  // Listen for quick fire mode toggle
  if (!quickFireListenerRegistered) {
    quickFireListenerRegistered = true;
    window.addEventListener('medkitt-quick-fire-toggle', () => {
      if (delegatedContainer) {
        renderFlow(delegatedContainer);
      }
    });
  }

  // Check for category-specific entry point override
  const entryOverride = sessionStorage.getItem('medkitt-tree-entry');
  sessionStorage.removeItem('medkitt-tree-entry');
  const entryNodeId = entryOverride || config.entryNodeId;
  currentEntryNodeId = entryNodeId;

  // Restore or start fresh
  if (entryOverride && entryOverride !== config.entryNodeId) {
    controller.startConsult(treeId, entryNodeId);
  } else {
    const restored = controller.restoreSession(treeId);
    if (!restored) {
      controller.startConsult(treeId, entryNodeId);
    }
  }

  renderFlow(container);
}

/** Render the full card stack + active card + header + toolbar */
function renderFlow(container: HTMLElement): void {
  if (!controller || !currentConfig) return;

  container.innerHTML = '';

  // Specialty-colored header
  const categoryId = currentConfig.categoryId || findCategoryId(currentTreeId ?? '');
  renderFlowHeader(container, categoryId);

  // Dosing banner (shows user-added doses, safe - no regex extraction)
  renderDosingBanner(container);

  // Consult search bar
  renderConsultSearch(container);

  // Card stack container
  const stackContainer = document.createElement('div');
  stackContainer.className = 'card-stack-container';

  // Add quick fire mode class if enabled
  const quickFire = isQuickFireMode();
  if (quickFire) {
    stackContainer.classList.add('card-stack-container--quick-fire');
  }

  // Disclaimer on first render (no answered cards)
  const cardStack = controller.getCardStack();
  if (cardStack.length === 0) {
    const disclaimer = document.createElement('div');
    disclaimer.className = 'wizard-disclaimer';
    disclaimer.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
    stackContainer.appendChild(disclaimer);
  }

  // Render answered cards
  for (const entry of cardStack) {
    const card = createDecisionCard(entry.node, {
      state: 'answered',
      selectedOptionIndex: entry.selectedOptionIndex,
      selectedLabel: entry.selectedLabel,
      config: currentConfig,
      treeId: currentTreeId ?? undefined,
      quickFireMode: quickFire,
    });
    stackContainer.appendChild(card);
  }

  // Render active card
  const currentNode = controller.getCurrentNode();
  if (currentNode) {
    const activeCard = createDecisionCard(currentNode, {
      state: 'active',
      config: currentConfig,
      treeId: currentTreeId ?? undefined,
      entryNodeId: currentEntryNodeId ?? undefined,
      onOptionSelect: (i) => {
        if (!controller) return;
        controller.selectOption(i);
        renderFlow(container);
        // Auto-scroll to new card
        requestAnimationFrame(() => {
          const cards = container.querySelectorAll('.decision-card--active');
          const last = cards[cards.length - 1];
          if (last) {
            last.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      },
      onContinue: () => {
        if (!controller) return;
        controller.continueToNext();
        renderFlow(container);
        requestAnimationFrame(() => {
          const cards = container.querySelectorAll('.decision-card--active');
          const last = cards[cards.length - 1];
          if (last) {
            last.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      },
      onStartOver: () => {
        if (!controller || !currentEntryNodeId) return;
        controller.reset(currentEntryNodeId);
        renderFlow(container);
      },
      onHome: () => {
        if (controller) controller.fullReset();
        removeContextualToolbar();
        router.navigate('/');
      },
    });
    stackContainer.appendChild(activeCard);
  }

  container.appendChild(stackContainer);

  // Contextual toolbar
  renderContextualToolbar(currentTreeId ?? '', controller, currentEntryNodeId ?? '', currentConfig?.moduleLabels);

  // Auto-scroll to active card on session restore
  if (cardStack.length > 0) {
    requestAnimationFrame(() => {
      const activeCards = container.querySelectorAll('.decision-card--active');
      const last = activeCards[activeCards.length - 1];
      if (last) {
        last.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
}

/** Render the consult search bar below the header */
function renderConsultSearch(container: HTMLElement): void {
  if (!controller) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'consult-search';
  if (searchOpen) wrapper.classList.add('consult-search--open');

  // Toggle button (magnifying glass)
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'consult-search__toggle';
  toggleBtn.innerHTML = '&#x1F50D;';
  toggleBtn.setAttribute('aria-label', 'Search this consult');
  toggleBtn.addEventListener('click', () => {
    searchOpen = !searchOpen;
    wrapper.classList.toggle('consult-search--open', searchOpen);
    if (searchOpen) {
      const input = wrapper.querySelector('.consult-search__input') as HTMLInputElement;
      if (input) { input.value = ''; input.focus(); }
      clearResults();
    } else {
      clearResults();
    }
  });

  // Input
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'consult-search__input';
  input.placeholder = 'Search this consult\u2026';
  input.setAttribute('autocomplete', 'off');
  input.setAttribute('autocorrect', 'off');
  input.setAttribute('spellcheck', 'false');

  // Results dropdown
  const results = document.createElement('div');
  results.className = 'consult-search__results';

  function clearResults(): void {
    results.innerHTML = '';
    results.style.display = 'none';
  }

  // Search logic
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  input.addEventListener('input', () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value.trim().toLowerCase();
      if (query.length < 2) { clearResults(); return; }
      const matches = searchNodes(query);
      renderResults(matches, results, container);
    }, 150);
  });

  // Close on escape
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      searchOpen = false;
      wrapper.classList.remove('consult-search--open');
      clearResults();
      input.blur();
    }
  });

  wrapper.appendChild(toggleBtn);
  wrapper.appendChild(input);
  wrapper.appendChild(results);
  container.appendChild(wrapper);
}

/** Search all nodes in the current tree for a query */
function searchNodes(query: string): { node: import('../models/types.js').DecisionNode; matchContext: string }[] {
  if (!controller) return [];
  const engine = controller.getEngine();
  const allNodes = engine.getAllNodes();
  const results: { node: import('../models/types.js').DecisionNode; matchContext: string }[] = [];
  const terms = query.split(/\s+/).filter(t => t.length > 0);

  for (const node of allNodes) {
    // Build searchable text from all node fields
    const fields = [
      node.title,
      node.body,
      node.recommendation || '',
      (node.options || []).map(o => `${o.label} ${o.description || ''}`).join(' '),
    ];
    const fullText = fields.join(' ').toLowerCase();

    // All terms must match somewhere in the node
    if (terms.every(t => fullText.includes(t))) {
      // Find the best matching context snippet
      const matchContext = getMatchContext(fullText, terms);
      results.push({ node, matchContext });
    }
  }

  return results;
}

/** Extract a short context snippet around the first match */
function getMatchContext(text: string, terms: string[]): string {
  // Find position of first term match
  let earliest = text.length;
  for (const t of terms) {
    const idx = text.indexOf(t);
    if (idx >= 0 && idx < earliest) earliest = idx;
  }

  // Extract ~80 chars around the match
  const start = Math.max(0, earliest - 20);
  const end = Math.min(text.length, earliest + 60);
  let snippet = text.slice(start, end).replace(/\s+/g, ' ').trim();
  if (start > 0) snippet = '\u2026' + snippet;
  if (end < text.length) snippet = snippet + '\u2026';
  return snippet;
}

/** Render search results dropdown */
function renderResults(
  matches: { node: import('../models/types.js').DecisionNode; matchContext: string }[],
  resultsEl: HTMLElement,
  container: HTMLElement,
): void {
  resultsEl.innerHTML = '';
  if (matches.length === 0) {
    resultsEl.style.display = 'block';
    const empty = document.createElement('div');
    empty.className = 'consult-search__empty';
    empty.textContent = 'No matching nodes';
    resultsEl.appendChild(empty);
    return;
  }

  resultsEl.style.display = 'block';

  // Limit to 10 results
  const shown = matches.slice(0, 10);
  for (const { node, matchContext } of shown) {
    const item = document.createElement('button');
    item.className = 'consult-search__result-item';

    const title = document.createElement('div');
    title.className = 'consult-search__result-title';
    title.textContent = node.title;

    const context = document.createElement('div');
    context.className = 'consult-search__result-context';
    context.textContent = matchContext;

    const badge = document.createElement('span');
    badge.className = 'consult-search__result-badge';
    badge.textContent = node.type;

    title.appendChild(badge);
    item.appendChild(title);
    item.appendChild(context);

    item.addEventListener('click', () => {
      if (!controller) return;
      controller.jumpToNode(node.id);
      searchOpen = false;
      renderFlow(container);
      // Scroll active card into view
      requestAnimationFrame(() => {
        const active = container.querySelector('.decision-card--active');
        if (active) active.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });

    resultsEl.appendChild(item);
  }

  if (matches.length > 10) {
    const more = document.createElement('div');
    more.className = 'consult-search__empty';
    more.textContent = `+ ${matches.length - 10} more results`;
    resultsEl.appendChild(more);
  }
}

/** Render specialty-colored header bar */
function renderFlowHeader(container: HTMLElement, categoryId: string): void {
  const header = document.createElement('div');
  header.className = 'consult-flow-header';
  header.style.background = getSpecialtyGradient(categoryId);

  // Back button — scroll up or exit
  const backBtn = document.createElement('button');
  backBtn.className = 'consult-flow-header__back';
  backBtn.textContent = '\u2190';
  backBtn.setAttribute('aria-label', 'Back');
  backBtn.addEventListener('click', () => {
    if (controller?.canGoBack()) {
      controller.goBack();
      renderFlow(container);
    } else {
      if (controller) controller.fullReset();
      removeContextualToolbar();
      const sourceCategory = sessionStorage.getItem('medkitt-source-category') || categoryId;
      router.navigate(sourceCategory ? `/category/${sourceCategory}` : '/');
    }
  });

  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.className = 'consult-flow-header__reset';
  resetBtn.textContent = '\u21BA';
  resetBtn.setAttribute('aria-label', 'Reset to start');
  resetBtn.addEventListener('click', () => {
    if (controller && currentEntryNodeId) {
      controller.reset(currentEntryNodeId);
      renderFlow(container);
    }
  });

  // Title
  const title = document.createElement('div');
  title.className = 'consult-flow-header__title';
  title.textContent = getConsultTitle(currentTreeId ?? '');

  // Module progress indicator
  const progress = document.createElement('div');
  progress.className = 'consult-flow-header__progress';
  if (controller) {
    const engine = controller.getEngine();
    const currentModule = engine.getCurrentModule();
    const totalModules = engine.getTotalModules();
    if (currentModule !== null && totalModules > 0) {
      progress.textContent = `${currentModule}/${totalModules}`;
      progress.setAttribute('aria-label', `Module ${currentModule} of ${totalModules}`);
    }
  }

  // Share button
  const shareBtn = document.createElement('button');
  shareBtn.className = 'consult-flow-header__share';
  shareBtn.textContent = '\u{1F517}';
  shareBtn.setAttribute('aria-label', 'Share consult link');
  shareBtn.addEventListener('click', () => {
    const treeId = currentTreeId ?? '';
    if (!treeId) return;
    const url = `${window.location.origin}${window.location.pathname}#/share/${treeId}`;
    const consultTitle = getConsultTitle(treeId);
    const categories = getAllCategories();
    const cat = categories.find(c => c.decisionTrees.some(t => t.id === treeId));
    const catName = cat ? cat.name : '';
    const shareTitle = `myMedKitt: ${consultTitle}`;
    const shareText = catName ? `${catName} — ${consultTitle}` : consultTitle;

    if (navigator.share) {
      navigator.share({ title: shareTitle, text: shareText, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        shareBtn.textContent = '\u2713';
        setTimeout(() => { shareBtn.textContent = '\u{1F517}'; }, 1500);
      }).catch(() => {});
    }
  });

  // Home button
  const homeBtn = document.createElement('button');
  homeBtn.className = 'consult-flow-header__home';
  homeBtn.textContent = '\uD83C\uDFE0';
  homeBtn.setAttribute('aria-label', 'Home');
  homeBtn.addEventListener('click', () => {
    if (controller) controller.fullReset();
    removeContextualToolbar();
    router.navigate('/');
  });

  // Quick fire toggle
  const quickFireBtn = renderQuickFireToggle();

  header.appendChild(backBtn);
  header.appendChild(resetBtn);
  header.appendChild(title);
  header.appendChild(progress);
  header.appendChild(quickFireBtn);
  header.appendChild(shareBtn);
  header.appendChild(homeBtn);
  container.appendChild(header);
}

/** Find category ID for a tree */
function findCategoryId(treeId: string): string {
  const categories = getAllCategories();
  for (const cat of categories) {
    if (cat.decisionTrees.some(t => t.id === treeId)) {
      return cat.id;
    }
  }
  return '';
}

/** Get consult title from category metadata */
function getConsultTitle(treeId: string): string {
  const categories = getAllCategories();
  for (const cat of categories) {
    const tree = cat.decisionTrees.find(t => t.id === treeId);
    if (tree) return tree.title;
  }
  return '';
}

/** Handle inline link clicks with node jump support */
function onInlineLinkClick(e: Event): void {
  handleInlineLinkClick(e, (nodeId) => {
    if (controller && delegatedContainer) {
      controller.jumpToNode(nodeId);
      renderFlow(delegatedContainer);
    }
  });
}

/** Render unavailable state */
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
