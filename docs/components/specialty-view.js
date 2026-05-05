// myMedKitt — Specialty View (replaces category-view.ts)
// Header in specialty color, 3D consult buttons, specialty-aware order.
import { getAllCategories, getCategoryColors } from '../services/category-service.js';
import { isSharedMode, getSharedTreeIds } from '../services/shared-mode.js';
import { create3DButton, getSpecialtyGradient } from './button-3d.js';
import { router } from '../services/router.js';
const PINNED_TREE_ORDER = {
    psychiatry: [
        'psych-triage',
        'medical-clearance-psych',
        'acute-agitation',
        'acute-psychosis',
        'capacity-assessment',
        'catatonia',
        'psych-assessment',
        'psychiatry-assessment',
    ],
};
/** Render the specialty view into the given container */
export function renderSpecialtyView(container, categoryId) {
    container.innerHTML = '';
    const categories = getAllCategories();
    const category = categories.find(c => c.id === categoryId);
    if (!category) {
        renderNotFound(container, categoryId);
        return;
    }
    const wrapper = document.createElement('div');
    wrapper.className = 'specialty-view';
    // Specialty-colored header
    const header = document.createElement('div');
    header.className = 'specialty-view__header';
    header.style.background = getSpecialtyGradient(categoryId);
    // Apply custom text color for light-background categories
    const specColors = getCategoryColors()[categoryId];
    if (specColors?.textColor) {
        header.style.color = specColors.textColor;
    }
    const backBtn = document.createElement('button');
    backBtn.className = 'specialty-view__back';
    backBtn.textContent = '\u2190';
    backBtn.setAttribute('aria-label', 'Back to dashboard');
    backBtn.addEventListener('click', () => router.navigate('/'));
    const title = document.createElement('div');
    title.className = 'specialty-view__title';
    title.textContent = category.name;
    const homeBtn = document.createElement('button');
    homeBtn.className = 'specialty-view__home';
    homeBtn.textContent = '\uD83C\uDFE0';
    homeBtn.setAttribute('aria-label', 'Home');
    homeBtn.addEventListener('click', () => router.navigate('/'));
    header.appendChild(backBtn);
    header.appendChild(title);
    header.appendChild(homeBtn);
    wrapper.appendChild(header);
    // Filter shared mode
    let trees = category.decisionTrees;
    if (isSharedMode()) {
        const sharedIds = new Set(getSharedTreeIds());
        trees = trees.filter(t => sharedIds.has(t.id));
    }
    if (trees.length === 0) {
        renderEmptyState(wrapper);
        container.appendChild(wrapper);
        return;
    }
    // Keep high-frequency psychiatry consults in clinical workflow order, then sort the rest alphabetically.
    const pinned = new Map((PINNED_TREE_ORDER[categoryId] ?? []).map((id, index) => [id, index]));
    const sorted = [...trees].sort((a, b) => {
        const aPinned = pinned.get(a.id);
        const bPinned = pinned.get(b.id);
        if (aPinned !== undefined || bPinned !== undefined) {
            if (aPinned === undefined)
                return 1;
            if (bPinned === undefined)
                return -1;
            return aPinned - bPinned;
        }
        return a.title.localeCompare(b.title);
    });
    // Search filter (3+ consults)
    if (sorted.length >= 3) {
        const searchWrap = document.createElement('div');
        searchWrap.className = 'specialty-view__search';
        const searchInput = document.createElement('input');
        searchInput.type = 'search';
        searchInput.placeholder = 'Filter consults\u2026';
        searchInput.setAttribute('aria-label', 'Filter consults');
        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim().toLowerCase();
            const buttons = list.querySelectorAll('.btn-3d');
            if (!q) {
                // Reset to default specialty order
                buttons.forEach((btn, i) => { btn.style.display = ''; btn.style.order = String(i); });
                return;
            }
            // Strict prefix match on title only, alphabetical order
            buttons.forEach((btn, i) => {
                const t = sorted[i].title.toLowerCase();
                const matches = t.startsWith(q);
                btn.style.display = matches ? '' : 'none';
                // Keep default specialty order (sorted array index)
                btn.style.order = matches ? String(i) : '';
            });
        });
        searchWrap.appendChild(searchInput);
        wrapper.appendChild(searchWrap);
    }
    // Consult list
    const list = document.createElement('div');
    list.className = 'specialty-view__list';
    for (const tree of sorted) {
        const btn = create3DButton(tree.title, {
            variant: 'specialty',
            specialtyId: categoryId,
            description: tree.subtitle,
            onClick: () => {
                if (tree.entryNodeId) {
                    sessionStorage.setItem('medkitt-tree-entry', tree.entryNodeId);
                }
                sessionStorage.setItem('medkitt-source-category', categoryId);
                router.navigate(`/tree/${tree.id}`);
            },
        });
        btn.style.textAlign = 'left';
        btn.style.flexDirection = 'column';
        btn.style.alignItems = 'flex-start';
        list.appendChild(btn);
    }
    wrapper.appendChild(list);
    container.appendChild(wrapper);
}
function renderEmptyState(container) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const icon = document.createElement('div');
    icon.className = 'empty-state-icon';
    icon.textContent = '\uD83D\uDEA7';
    const title = document.createElement('h3');
    title.textContent = 'Coming Soon';
    const body = document.createElement('p');
    body.textContent = 'No decision trees available in this category yet.';
    empty.appendChild(icon);
    empty.appendChild(title);
    empty.appendChild(body);
    container.appendChild(empty);
}
function renderNotFound(container, categoryId) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const icon = document.createElement('div');
    icon.className = 'empty-state-icon';
    icon.textContent = '\u2753';
    const title = document.createElement('h3');
    title.textContent = 'Category Not Found';
    const body = document.createElement('p');
    body.textContent = `No category with ID "${categoryId}".`;
    const homeBtn = document.createElement('button');
    homeBtn.className = 'btn-primary';
    homeBtn.textContent = 'Go Home';
    homeBtn.style.marginTop = '16px';
    homeBtn.addEventListener('click', () => router.navigate('/'));
    empty.appendChild(icon);
    empty.appendChild(title);
    empty.appendChild(body);
    empty.appendChild(homeBtn);
    container.appendChild(empty);
}
