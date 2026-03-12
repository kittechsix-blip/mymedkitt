// myMedKitt — Contextual Toolbar
// Per-consult bottom bar replacing the global tab bar when inside a consult.
// Configurable tools per consult + Home + ••• overflow.
import { getToolbarConfig } from '../data/toolbar-configs.js';
import { router } from '../services/router.js';
let toolbarEl = null;
let branchListEl = null;
/** Remove the contextual toolbar from the DOM */
export function removeContextualToolbar() {
    toolbarEl?.remove();
    toolbarEl = null;
    branchListEl?.remove();
    branchListEl = null;
}
/** Render the contextual toolbar for a consult */
export function renderContextualToolbar(consultId, controller, entryNodeId) {
    removeContextualToolbar();
    // Hide the global tab bar
    const globalTabBar = document.getElementById('bottom-tab-bar');
    if (globalTabBar)
        globalTabBar.style.display = 'none';
    const toolbar = document.createElement('div');
    toolbar.className = 'contextual-toolbar';
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
            else if (item.action === 'jump' && item.target) {
                controller.jumpToNode(item.target);
                // Re-render is handled by the consult-flow listener
                window.dispatchEvent(new CustomEvent('medkitt-jump-node', { detail: item.target }));
            }
        });
        toolbar.appendChild(btn);
    }
    // Home button
    const homeBtn = document.createElement('button');
    homeBtn.className = 'contextual-toolbar__item';
    const homeIcon = document.createElement('span');
    homeIcon.className = 'contextual-toolbar__icon';
    homeIcon.textContent = '\uD83C\uDFE0';
    const homeLabel = document.createElement('span');
    homeLabel.textContent = 'Home';
    homeBtn.appendChild(homeIcon);
    homeBtn.appendChild(homeLabel);
    homeBtn.addEventListener('click', () => {
        controller.fullReset();
        removeContextualToolbar();
        router.navigate('/');
    });
    toolbar.appendChild(homeBtn);
    // Overflow (•••) button
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
        toggleBranchPointList(controller, entryNodeId);
    });
    toolbar.appendChild(overflowBtn);
    document.body.appendChild(toolbar);
    toolbarEl = toolbar;
}
/** Toggle the branch point overflow list */
function toggleBranchPointList(controller, entryNodeId) {
    if (branchListEl) {
        branchListEl.remove();
        branchListEl = null;
        return;
    }
    const engine = controller.getEngine();
    const branchPoints = [];
    // Scan all nodes for question nodes with 2+ options (major branch points)
    // We iterate through all nodes available via the engine
    const session = engine.getSession();
    if (!session)
        return;
    // Get all visited nodes + look ahead for branch points
    const allNodeIds = new Set();
    // Add history
    for (const id of session.history)
        allNodeIds.add(id);
    allNodeIds.add(session.currentNodeId);
    // Also scan all nodes in the tree for branch points
    // We need to iterate the engine's node map — but it's private.
    // Instead, we'll use the answer history and current path.
    // For now, show history branch points.
    for (const id of session.history) {
        const node = engine.getNode(id);
        if (node && node.type === 'question' && node.options && node.options.length >= 2) {
            branchPoints.push({ nodeId: id, title: node.title });
        }
    }
    // Also add entry point
    const entryNode = engine.getNode(entryNodeId);
    if (entryNode) {
        branchPoints.unshift({ nodeId: entryNodeId, title: 'Start: ' + entryNode.title });
    }
    const list = document.createElement('div');
    list.className = 'branch-point-list';
    const title = document.createElement('div');
    title.className = 'branch-point-list__title';
    title.textContent = 'Branch Points';
    list.appendChild(title);
    if (branchPoints.length === 0) {
        const empty = document.createElement('div');
        empty.style.padding = '12px';
        empty.style.color = 'var(--color-text-muted)';
        empty.textContent = 'No branch points visited yet.';
        list.appendChild(empty);
    }
    else {
        for (const bp of branchPoints) {
            const item = document.createElement('button');
            item.className = 'branch-point-list__item';
            item.textContent = bp.title;
            item.addEventListener('click', () => {
                controller.jumpToNode(bp.nodeId);
                branchListEl?.remove();
                branchListEl = null;
                // Trigger re-render via custom event
                window.dispatchEvent(new CustomEvent('medkitt-jump-node', { detail: bp.nodeId }));
            });
            list.appendChild(item);
        }
    }
    // Close on outside click
    const closeHandler = (e) => {
        if (branchListEl && !branchListEl.contains(e.target)) {
            branchListEl.remove();
            branchListEl = null;
            document.removeEventListener('click', closeHandler);
        }
    };
    setTimeout(() => document.addEventListener('click', closeHandler), 0);
    document.body.appendChild(list);
    branchListEl = list;
}
