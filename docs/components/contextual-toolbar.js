// myMedKitt — Contextual Toolbar
// Per-consult bottom bar replacing the global tab bar when inside a consult.
// Configurable tools per consult + ••• overflow → full-screen Decision Map.
import { getToolbarConfig } from '../data/toolbar-configs.js';
import { router } from '../services/router.js';
import { showInfoModal } from './info-page.js';
import { showDrugModal } from './drug-store.js';
import { FLAGS } from '../data/feature-flags.js';
import { logTelemetry } from '../services/kittmd-analytics.js';
let toolbarEl = null;
let decisionMapEl = null;
let toolsSheetEl = null;
let infographicEl = null;
/** How many items render inline before overflowing into the Tools drawer (when opted in). */
const TOOLBAR_VISIBLE_CAP = 5;
/** Check if a consult toolbar is currently active */
export function hasContextualToolbar() {
    return toolbarEl !== null;
}
/** Remove the contextual toolbar from the DOM */
export function removeContextualToolbar() {
    toolbarEl?.remove();
    toolbarEl = null;
    closeDecisionMap();
    closeToolsSheet();
    closeInfographic();
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
    // Split items into inline vs overflow per `toolbarOverflow` opt-in. Existing
    // toolbars (40+, including vertigo=6, oncological-emergencies=14, ocular-trauma=10)
    // are NOT in TOOLBAR_OVERFLOW so `useOverflow` stays false and they render
    // inline-everything exactly as before. Master kill switch:
    // `FLAGS.toolbarOverflowEnabled = false` forces fallback regardless of opt-in.
    const useOverflow = !!config.toolbarOverflow && FLAGS.toolbarOverflowEnabled;
    let inlineItems;
    let drawerItems;
    if (useOverflow) {
        const pinned = config.tools.filter(t => t.pinned);
        const unpinned = config.tools.filter(t => !t.pinned);
        const remaining = Math.max(0, TOOLBAR_VISIBLE_CAP - pinned.length);
        inlineItems = [...pinned, ...unpinned.slice(0, remaining)];
        drawerItems = unpinned.slice(remaining);
    }
    else {
        inlineItems = config.tools;
        drawerItems = [];
    }
    // Inline tool buttons
    for (const item of inlineItems) {
        toolbar.appendChild(createToolbarButton(item, controller));
    }
    // Tools drawer button — only when there are overflow items (>5 with opt-in)
    if (drawerItems.length > 0) {
        const toolsBtn = document.createElement('button');
        toolsBtn.className = 'contextual-toolbar__item toolbar-tools-btn';
        const toolsIcon = document.createElement('span');
        toolsIcon.className = 'contextual-toolbar__icon';
        toolsIcon.textContent = '\u{1F9F0}'; // 🧰
        const toolsLabel = document.createElement('span');
        toolsLabel.textContent = 'Tools ▾'; // Tools ▾
        toolsBtn.appendChild(toolsIcon);
        toolsBtn.appendChild(toolsLabel);
        toolsBtn.addEventListener('click', () => {
            toggleToolsSheet(consultId, drawerItems, controller);
        });
        toolbar.appendChild(toolsBtn);
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
/** Build a toolbar/drawer button for a single ToolbarItem. */
function createToolbarButton(item, controller) {
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
        dispatchToolbarAction(item, controller);
    });
    return btn;
}
/**
 * Dispatch a toolbar item's action. `route` is gated by `FLAGS.routeActionEnabled`
 * — when off, route taps log via telemetry rather than failing silently.
 */
function dispatchToolbarAction(item, controller) {
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
    else if (item.action === 'route' && item.target) {
        if (FLAGS.routeActionEnabled) {
            window.location.hash = `#/tree/${item.target}`;
        }
        else {
            logTelemetry('route_action_disabled', { target_tree_id: item.target });
        }
    }
    else if (item.action === 'infographic' && item.target) {
        openInfographicOverlay(item.target);
    }
}
// -------------------------------------------------------------------
// Interactive Infographic — full-screen iframe overlay
// -------------------------------------------------------------------
let infographicEscHandler = null;
/** Close and remove the infographic overlay. */
function closeInfographic() {
    if (infographicEscHandler) {
        document.removeEventListener('keydown', infographicEscHandler);
        infographicEscHandler = null;
    }
    if (infographicEl) {
        infographicEl.remove();
        infographicEl = null;
    }
}
/**
 * Route a link tapped INSIDE the infographic iframe through the app's normal
 * handlers. The iframe is same-origin, so we intercept its anchor clicks here
 * (they render with target="_top", which would otherwise blow the whole app
 * away to the raw infographic file). Internal `#/type/id` links dispatch to the
 * same modal/route the app uses everywhere; external links open in a new tab.
 */
function handleInfographicLink(e) {
    const anchor = e.target?.closest('a');
    if (!anchor)
        return;
    const href = anchor.getAttribute('href') || '';
    // In-iframe citation anchors (#cite-...) scroll within the infographic — leave them.
    if (href.startsWith('#cite') || href === '#' || href === '')
        return;
    if (/^https?:\/\//i.test(href)) {
        e.preventDefault();
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
    }
    if (href.startsWith('#/')) {
        e.preventDefault();
        const parts = href.replace(/^#\//, '').split('/');
        const linkType = parts[0];
        const linkId = parts.slice(1).join('/');
        if (!linkId)
            return;
        closeInfographic();
        if (linkType === 'drug') {
            const slash = linkId.indexOf('/');
            if (slash !== -1)
                showDrugModal(linkId.slice(0, slash), linkId.slice(slash + 1));
            else
                showDrugModal(linkId);
        }
        else if (linkType === 'calculator') {
            router.navigate(`/calculator/${linkId}`);
        }
        else if (linkType === 'tree') {
            router.navigate(`/tree/${linkId}`);
        }
        else if (linkType === 'info') {
            showInfoModal(linkId);
        }
        else {
            // Unknown internal type — fall back to a hash route rather than silently dropping.
            window.location.hash = href;
        }
    }
}
/** Open the consult's interactive infographic in a full-screen iframe overlay. */
function openInfographicOverlay(consultId) {
    // Toggle: tapping again while open closes it.
    if (infographicEl) {
        closeInfographic();
        return;
    }
    const overlay = document.createElement('div');
    overlay.className = 'infographic-overlay';
    overlay.addEventListener('click', e => {
        if (e.target === overlay)
            closeInfographic();
    });
    const panel = document.createElement('div');
    panel.className = 'infographic-panel';
    const header = document.createElement('div');
    header.className = 'infographic-panel__header';
    const title = document.createElement('span');
    title.className = 'infographic-panel__title';
    title.textContent = 'Interactive Infographic';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'infographic-panel__close';
    closeBtn.textContent = '✕'; // ✕
    closeBtn.setAttribute('aria-label', 'Close infographic');
    closeBtn.addEventListener('click', closeInfographic);
    header.appendChild(title);
    header.appendChild(closeBtn);
    const frame = document.createElement('iframe');
    frame.className = 'infographic-frame';
    frame.setAttribute('title', 'Interactive infographic');
    frame.setAttribute('loading', 'lazy');
    frame.src = `infographics/${consultId}.html`;
    frame.addEventListener('load', () => {
        try {
            const doc = frame.contentDocument;
            if (!doc)
                return;
            // Use the infographic's own <title> for the overlay header.
            if (doc.title)
                title.textContent = doc.title;
            // Same-origin: intercept internal/external link taps at capture phase.
            doc.addEventListener('click', handleInfographicLink, true);
        }
        catch {
            /* cross-origin guard — should never trip for same-origin infographics */
        }
    });
    panel.appendChild(header);
    panel.appendChild(frame);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);
    infographicEl = overlay;
    infographicEscHandler = (e) => {
        if (e.key === 'Escape')
            closeInfographic();
    };
    document.addEventListener('keydown', infographicEscHandler);
}
// -------------------------------------------------------------------
// Tools drawer — bottom sheet, separate from the Decision Map
// -------------------------------------------------------------------
function closeToolsSheet() {
    if (toolsSheetEl) {
        toolsSheetEl.remove();
        toolsSheetEl = null;
    }
}
function toggleToolsSheet(consultId, items, controller) {
    if (toolsSheetEl) {
        closeToolsSheet();
        return;
    }
    const overlay = document.createElement('div');
    overlay.className = 'toolbar-tools-overlay';
    overlay.addEventListener('click', e => {
        if (e.target === overlay)
            closeToolsSheet();
    });
    const sheet = document.createElement('div');
    sheet.className = 'toolbar-tools-sheet';
    sheet.setAttribute('data-consult-id', consultId);
    const header = document.createElement('div');
    header.className = 'toolbar-tools-sheet__header';
    const title = document.createElement('span');
    title.className = 'toolbar-tools-sheet__title';
    title.textContent = 'Tools';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toolbar-tools-sheet__close';
    closeBtn.textContent = '✕'; // ✕
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', closeToolsSheet);
    header.appendChild(title);
    header.appendChild(closeBtn);
    sheet.appendChild(header);
    const list = document.createElement('div');
    list.className = 'toolbar-tools-sheet__list';
    for (const item of items) {
        const row = document.createElement('button');
        row.className = 'toolbar-tools-item';
        const icon = document.createElement('span');
        icon.className = 'toolbar-tools-item__icon';
        icon.textContent = item.icon;
        const label = document.createElement('span');
        label.className = 'toolbar-tools-item__label';
        label.textContent = item.label;
        row.appendChild(icon);
        row.appendChild(label);
        row.addEventListener('click', () => {
            closeToolsSheet();
            dispatchToolbarAction(item, controller);
        });
        list.appendChild(row);
    }
    sheet.appendChild(list);
    overlay.appendChild(sheet);
    document.body.appendChild(overlay);
    toolsSheetEl = overlay;
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
