// myMedKitt — Contextual Toolbar
// Per-consult bottom bar replacing the global tab bar when inside a consult.
// Configurable tools per consult + ••• overflow.
import { getToolbarConfig } from '../data/toolbar-configs.js';
import { router } from '../services/router.js';
let toolbarEl = null;
let branchListEl = null;
let branchListCloseHandler = null;
/** Remove the contextual toolbar from the DOM */
export function removeContextualToolbar() {
    toolbarEl?.remove();
    toolbarEl = null;
    closeBranchList();
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
/** Build an ordered list of all major branch points in the tree.
 *  A "major branch point" is any question node with 2+ options.
 *  Sorted by module number, then by first-reachable order within module. */
function collectAllBranchPoints(controller, entryNodeId) {
    const engine = controller.getEngine();
    const allNodes = engine.getAllNodes();
    // Collect question nodes with 2+ options
    const branchNodes = allNodes.filter(n => n.type === 'question' && n.options && n.options.length >= 2);
    // Always include entry node at the top even if it's info type
    const entryNode = engine.getNode(entryNodeId);
    const hasEntry = branchNodes.some(n => n.id === entryNodeId);
    const points = [];
    if (entryNode && !hasEntry) {
        points.push({ nodeId: entryNodeId, title: entryNode.title, module: entryNode.module });
    }
    // Sort by module, then alphabetically by title within module
    branchNodes.sort((a, b) => a.module - b.module || a.title.localeCompare(b.title));
    for (const node of branchNodes) {
        points.push({ nodeId: node.id, title: node.title, module: node.module });
    }
    return points;
}
/** Clean up branch list and its close handler */
function closeBranchList() {
    if (branchListCloseHandler) {
        document.removeEventListener('click', branchListCloseHandler);
        branchListCloseHandler = null;
    }
    if (branchListEl) {
        branchListEl.remove();
        branchListEl = null;
    }
}
/** Toggle the branch point overflow list */
function toggleBranchPointList(controller, entryNodeId) {
    if (branchListEl) {
        closeBranchList();
        return;
    }
    const engine = controller.getEngine();
    const session = engine.getSession();
    if (!session)
        return;
    const currentNodeId = session.currentNodeId;
    const visitedIds = new Set(session.history);
    visitedIds.add(currentNodeId);
    const branchPoints = collectAllBranchPoints(controller, entryNodeId);
    const list = document.createElement('div');
    list.className = 'branch-point-list';
    // Header
    const header = document.createElement('div');
    header.className = 'branch-point-list__header';
    header.textContent = 'Decision Map';
    list.appendChild(header);
    // Scrollable container
    const scroller = document.createElement('div');
    scroller.className = 'branch-point-list__scroller';
    let lastModule = -1;
    for (const bp of branchPoints) {
        // Module divider
        if (bp.module !== lastModule) {
            const divider = document.createElement('div');
            divider.className = 'branch-point-list__module';
            divider.textContent = `Module ${bp.module}`;
            scroller.appendChild(divider);
            lastModule = bp.module;
        }
        const item = document.createElement('button');
        const isCurrent = bp.nodeId === currentNodeId;
        const isVisited = visitedIds.has(bp.nodeId);
        item.className = 'branch-point-list__item';
        if (isCurrent)
            item.classList.add('branch-point-list__item--current');
        else if (isVisited)
            item.classList.add('branch-point-list__item--visited');
        item.textContent = bp.title;
        item.addEventListener('click', () => {
            closeBranchList();
            controller.jumpToNode(bp.nodeId);
            window.dispatchEvent(new CustomEvent('medkitt-jump-node', { detail: bp.nodeId }));
        });
        scroller.appendChild(item);
    }
    list.appendChild(scroller);
    // Close on outside click
    branchListCloseHandler = (e) => {
        if (branchListEl && !branchListEl.contains(e.target)) {
            closeBranchList();
        }
    };
    setTimeout(() => {
        if (branchListCloseHandler) {
            document.addEventListener('click', branchListCloseHandler);
        }
    }, 0);
    document.body.appendChild(list);
    branchListEl = list;
    // Scroll the current item into view
    const currentItem = list.querySelector('.branch-point-list__item--current');
    if (currentItem) {
        currentItem.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
}
