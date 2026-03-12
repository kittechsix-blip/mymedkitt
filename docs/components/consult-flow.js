// myMedKitt — Consult Flow (replaces tree-wizard.ts)
// Renders stacked decision cards on pearl white background.
// Uses ConsultFlowController for state management.
import { ConsultFlowController } from '../services/consult-flow-controller.js';
import { getTreeConfig } from '../services/tree-service.js';
import { createDecisionCard } from './decision-card.js';
import { handleInlineLinkClick } from './text-renderer.js';
import { renderContextualToolbar, removeContextualToolbar } from './contextual-toolbar.js';
import { getSpecialtyGradient } from './button-3d.js';
import { router } from '../services/router.js';
import { getAllCategories } from '../services/category-service.js';
let controller = null;
let currentConfig = null;
let currentEntryNodeId = null;
let currentTreeId = null;
let delegatedContainer = null;
let jumpNodeListenerRegistered = false;
/** Initialize and render the consult flow for a given tree */
export async function renderConsultFlow(container, treeId) {
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
        window.addEventListener('medkitt-jump-node', ((e) => {
            if (controller && delegatedContainer) {
                controller.jumpToNode(e.detail);
                renderFlow(delegatedContainer);
            }
        }));
    }
    // Check for category-specific entry point override
    const entryOverride = sessionStorage.getItem('medkitt-tree-entry');
    sessionStorage.removeItem('medkitt-tree-entry');
    const entryNodeId = entryOverride || config.entryNodeId;
    currentEntryNodeId = entryNodeId;
    // Restore or start fresh
    if (entryOverride && entryOverride !== config.entryNodeId) {
        controller.startConsult(treeId, entryNodeId);
    }
    else {
        const restored = controller.restoreSession(treeId);
        if (!restored) {
            controller.startConsult(treeId, entryNodeId);
        }
    }
    renderFlow(container);
}
/** Render the full card stack + active card + header + toolbar */
function renderFlow(container) {
    if (!controller || !currentConfig)
        return;
    container.innerHTML = '';
    // Specialty-colored header
    const categoryId = currentConfig.categoryId || findCategoryId(currentTreeId ?? '');
    renderFlowHeader(container, categoryId);
    // Card stack container
    const stackContainer = document.createElement('div');
    stackContainer.className = 'card-stack-container';
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
                if (!controller)
                    return;
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
                if (!controller)
                    return;
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
                if (!controller || !currentEntryNodeId)
                    return;
                controller.reset(currentEntryNodeId);
                renderFlow(container);
            },
            onHome: () => {
                if (controller)
                    controller.fullReset();
                removeContextualToolbar();
                router.navigate('/');
            },
        });
        stackContainer.appendChild(activeCard);
    }
    container.appendChild(stackContainer);
    // Contextual toolbar
    renderContextualToolbar(currentTreeId ?? '', controller, currentEntryNodeId ?? '');
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
/** Render specialty-colored header bar */
function renderFlowHeader(container, categoryId) {
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
        }
        else {
            if (controller)
                controller.fullReset();
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
    // Home button
    const homeBtn = document.createElement('button');
    homeBtn.className = 'consult-flow-header__home';
    homeBtn.textContent = '\uD83C\uDFE0';
    homeBtn.setAttribute('aria-label', 'Home');
    homeBtn.addEventListener('click', () => {
        if (controller)
            controller.fullReset();
        removeContextualToolbar();
        router.navigate('/');
    });
    header.appendChild(backBtn);
    header.appendChild(resetBtn);
    header.appendChild(title);
    header.appendChild(homeBtn);
    container.appendChild(header);
}
/** Find category ID for a tree */
function findCategoryId(treeId) {
    const categories = getAllCategories();
    for (const cat of categories) {
        if (cat.decisionTrees.some(t => t.id === treeId)) {
            return cat.id;
        }
    }
    return '';
}
/** Get consult title from category metadata */
function getConsultTitle(treeId) {
    const categories = getAllCategories();
    for (const cat of categories) {
        const tree = cat.decisionTrees.find(t => t.id === treeId);
        if (tree)
            return tree.title;
    }
    return '';
}
/** Handle inline link clicks with node jump support */
function onInlineLinkClick(e) {
    handleInlineLinkClick(e, (nodeId) => {
        if (controller && delegatedContainer) {
            controller.jumpToNode(nodeId);
            renderFlow(delegatedContainer);
        }
    });
}
/** Render unavailable state */
function renderUnavailable(container, treeId) {
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
