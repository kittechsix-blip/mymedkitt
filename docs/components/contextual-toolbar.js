// myMedKitt — Contextual Toolbar
// Per-consult bottom bar replacing the global tab bar when inside a consult.
// Configurable tools per consult + ••• overflow → full-screen Decision Map.
import { getToolbarConfig } from '../data/toolbar-configs.js';
import { router } from '../services/router.js';
import { showInfoModal } from './info-page.js';
let toolbarEl = null;
let decisionMapEl = null;
/** Check if a consult toolbar is currently active */
export function hasContextualToolbar() {
    return toolbarEl !== null;
}
/** Remove the contextual toolbar from the DOM */
export function removeContextualToolbar() {
    toolbarEl?.remove();
    toolbarEl = null;
    closeDecisionMap();
}
/** Render the contextual toolbar for a consult */
export function renderContextualToolbar(consultId, controller, _entryNodeId, moduleLabels) {
    removeContextualToolbar();
    // Hide the global tab bar
    const globalTabBar = document.getElementById('bottom-tab-bar');
    if (globalTabBar)
        globalTabBar.style.display = 'none';
    const toolbar = document.createElement('div');
    toolbar.className = 'contextual-toolbar';
    toolbar.setAttribute('translate', 'no'); // Prevent browser auto-translation
    const config = getToolbarConfig(consultId);
    // Configurable tool buttons
    for (const item of config.tools) {
        const btn = document.createElement('button');
        btn.className = 'contextual-toolbar__item';
        const icon = document.createElement('span');
        icon.className = 'contextual-toolbar__icon';
        icon.textContent = item.icon;
        const label = document.createElement('span');
        label.textContent = item.label;
        btn.appendChild(icon);
        btn.appendChild(label);
        btn.addEventListener('click', () => {
            if (item.action === 'calculator' && item.target) {
                router.navigate(`/calculator/${item.target}`);
            }
            else if (item.action === 'overlay' && item.target) {
                showInfoModal(item.target);
            }
            else if (item.action === 'jump' && item.target) {
                controller.jumpToNode(item.target);
                window.dispatchEvent(new CustomEvent('medkitt-jump-node', { detail: item.target }));
            }
        });
        toolbar.appendChild(btn);
    }
    // Overflow (•••) button → opens Decision Map
    const overflowBtn = document.createElement('button');
    overflowBtn.className = 'contextual-toolbar__item';
    const overflowIcon = document.createElement('span');
    overflowIcon.className = 'contextual-toolbar__icon';
    overflowIcon.textContent = '\u2022\u2022\u2022';
    const overflowLabel = document.createElement('span');
    overflowLabel.textContent = 'More';
    overflowBtn.appendChild(overflowIcon);
    overflowBtn.appendChild(overflowLabel);
    overflowBtn.addEventListener('click', () => {
        toggleDecisionMap(controller, moduleLabels || []);
    });
    toolbar.appendChild(overflowBtn);
    document.body.appendChild(toolbar);
    toolbarEl = toolbar;
}
/** Collect ALL nodes grouped by module with real label names */
function collectAllNodesByModule(controller, moduleLabels) {
    const engine = controller.getEngine();
    const allNodes = engine.getAllNodes();
    // Group by module number (preserving insertion order within each group)
    const groups = new Map();
    for (const node of allNodes) {
        const list = groups.get(node.module) || [];
        list.push({ nodeId: node.id, title: node.title, type: node.type });
        groups.set(node.module, list);
    }
    // Sort module numbers, map to real labels
    const sortedModules = Array.from(groups.keys()).sort((a, b) => a - b);
    return sortedModules.map(mod => ({
        module: mod,
        label: moduleLabels[mod - 1] || `Module ${mod}`,
        nodes: groups.get(mod) || [],
    }));
}
/** Close and remove the Decision Map overlay */
function closeDecisionMap() {
    if (decisionMapEl) {
        decisionMapEl.remove();
        decisionMapEl = null;
    }
}
/** Toggle the full-screen Decision Map */
function toggleDecisionMap(controller, moduleLabels) {
    if (decisionMapEl) {
        closeDecisionMap();
        return;
    }
    const engine = controller.getEngine();
    const session = engine.getSession();
    if (!session)
        return;
    const currentNodeId = session.currentNodeId;
    const visitedIds = new Set(session.history);
    visitedIds.add(currentNodeId);
    const moduleGroups = collectAllNodesByModule(controller, moduleLabels);
    // Full-screen overlay
    const overlay = document.createElement('div');
    overlay.className = 'decision-map-overlay';
    const map = document.createElement('div');
    map.className = 'decision-map';
    // Header
    const header = document.createElement('div');
    header.className = 'decision-map__header';
    const title = document.createElement('span');
    title.textContent = 'Decision Map';
    header.appendChild(title);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'decision-map__close';
    closeBtn.textContent = '\u2715';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', closeDecisionMap);
    header.appendChild(closeBtn);
    map.appendChild(header);
    // Scrollable content
    const scroller = document.createElement('div');
    scroller.className = 'decision-map__scroller';
    for (const group of moduleGroups) {
        const section = document.createElement('div');
        section.className = 'decision-map__section';
        // Section header (tappable to collapse/expand)
        const sectionHeader = document.createElement('button');
        sectionHeader.className = 'decision-map__section-header';
        const chevron = document.createElement('span');
        chevron.className = 'decision-map__chevron';
        chevron.textContent = '\u25BE'; // ▾ expanded
        const sectionLabel = document.createElement('span');
        sectionLabel.className = 'decision-map__section-label';
        sectionLabel.textContent = group.label;
        const sectionCount = document.createElement('span');
        sectionCount.className = 'decision-map__section-count';
        sectionCount.textContent = `${group.nodes.length}`;
        sectionHeader.appendChild(chevron);
        sectionHeader.appendChild(sectionLabel);
        sectionHeader.appendChild(sectionCount);
        sectionHeader.addEventListener('click', () => {
            section.classList.toggle('decision-map__section--collapsed');
            chevron.textContent = section.classList.contains('decision-map__section--collapsed') ? '\u25B8' : '\u25BE';
        });
        section.appendChild(sectionHeader);
        // Section body (node list)
        const sectionBody = document.createElement('div');
        sectionBody.className = 'decision-map__section-body';
        for (const node of group.nodes) {
            const nodeBtn = document.createElement('button');
            const isCurrent = node.nodeId === currentNodeId;
            const isVisited = visitedIds.has(node.nodeId);
            nodeBtn.className = 'decision-map__node';
            if (isCurrent)
                nodeBtn.classList.add('decision-map__node--current');
            // State indicator
            const indicator = document.createElement('span');
            indicator.className = 'decision-map__indicator';
            if (isCurrent) {
                indicator.classList.add('decision-map__indicator--current');
                indicator.textContent = '\u25CF'; // ● filled
            }
            else if (isVisited) {
                indicator.classList.add('decision-map__indicator--visited');
                indicator.textContent = '\u25CF'; // ● filled
            }
            else {
                indicator.classList.add('decision-map__indicator--unvisited');
                indicator.textContent = '\u25CB'; // ○ empty
            }
            // Node title
            const nodeTitle = document.createElement('span');
            nodeTitle.className = 'decision-map__node-title';
            nodeTitle.textContent = node.title;
            // Node type badge
            const typeBadge = document.createElement('span');
            typeBadge.className = 'decision-map__node-type';
            typeBadge.textContent = node.type;
            nodeBtn.appendChild(indicator);
            nodeBtn.appendChild(nodeTitle);
            nodeBtn.appendChild(typeBadge);
            nodeBtn.addEventListener('click', () => {
                closeDecisionMap();
                // Dispatch event — consult-flow listener handles jumpToNode + renderFlow + scroll
                window.dispatchEvent(new CustomEvent('medkitt-jump-node', { detail: node.nodeId }));
            });
            sectionBody.appendChild(nodeBtn);
        }
        section.appendChild(sectionBody);
        scroller.appendChild(section);
    }
    map.appendChild(scroller);
    overlay.appendChild(map);
    document.body.appendChild(overlay);
    decisionMapEl = overlay;
    // Auto-scroll to current node
    requestAnimationFrame(() => {
        const currentItem = overlay.querySelector('.decision-map__node--current');
        if (currentItem) {
            currentItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
    });
}
