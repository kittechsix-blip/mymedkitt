// myMedKitt — Dashboard V2 (Command Center)
// Hero search bar, recents row, clean category cards, quick actions
import { getAllCategories, getCategoryColors } from '../services/category-service.js';
import { getSpecialtyGradient, buildSpecialtyGradient } from './button-3d.js';
import { router } from '../services/router.js';
import { isSharedMode, getSharedTreeIds, grantFullAccess } from '../services/shared-mode.js';
import { getAllDrugs } from '../services/drug-service.js';
import { getAllCalculators } from './calculator.js';
import { buildSearchIndex, search } from '../services/search-service.js';
import { showDrugModal } from './drug-store.js';
/** Tool categories route to special pages instead of category view */
const TOOL_ROUTES = {
    'pharmacy': { route: '/drugs', getCount: () => getAllDrugs().length, unit: 'drug' },
    'med-calc': { route: '/calculators', getCount: () => getAllCalculators().length, unit: 'tool' },
};
/** Recent consults storage key */
const RECENTS_KEY = 'mymedkitt_recents';
const MAX_RECENTS = 6;
function getRecents() {
    try {
        const stored = localStorage.getItem(RECENTS_KEY);
        if (!stored)
            return [];
        return JSON.parse(stored);
    }
    catch {
        return [];
    }
}
export function addRecentConsult(id, title, categoryId = 'emergency-medicine') {
    const recents = getRecents().filter(r => r.id !== id);
    recents.unshift({ id, title, categoryId, timestamp: Date.now() });
    if (recents.length > MAX_RECENTS)
        recents.length = MAX_RECENTS;
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
}
// ===================================================================
// Dashboard Render
// ===================================================================
export function renderDashboard(container) {
    container.innerHTML = '';
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard';
    // ---- Logo Header ----
    const logoHeader = document.createElement('div');
    logoHeader.className = 'dashboard-header';
    logoHeader.style.cursor = 'pointer';
    logoHeader.setAttribute('role', 'button');
    logoHeader.setAttribute('aria-label', 'Open search');
    const logoImg = document.createElement('img');
    logoImg.className = 'dashboard-header__logo';
    logoImg.src = 'assets/mymedkitt-bag-transparent.png';
    logoImg.alt = 'myMedKitt';
    const logoText = document.createElement('span');
    logoText.className = 'dashboard-header__title';
    logoText.textContent = 'myMedKitt';
    logoHeader.appendChild(logoImg);
    logoHeader.appendChild(logoText);
    dashboard.appendChild(logoHeader);
    // ---- Hero Search Bar ----
    const heroSearch = document.createElement('div');
    heroSearch.className = 'dashboard-hero-search';
    const searchField = document.createElement('div');
    searchField.className = 'dashboard-hero-search__field';
    const searchIcon = document.createElement('span');
    searchIcon.className = 'dashboard-hero-search__icon';
    searchIcon.textContent = '🔍';
    searchIcon.setAttribute('aria-hidden', 'true');
    const searchInput = document.createElement('input');
    searchInput.className = 'dashboard-hero-search__input';
    searchInput.type = 'search';
    searchInput.placeholder = 'Search consults, drugs, calculators…';
    searchInput.setAttribute('aria-label', 'Search consults, drugs, and calculators');
    searchInput.autocomplete = 'off';
    searchInput.autocapitalize = 'off';
    searchInput.spellcheck = false;
    searchInput.enterKeyHint = 'search';
    searchField.appendChild(searchIcon);
    searchField.appendChild(searchInput);
    const resultsList = document.createElement('ul');
    resultsList.className = 'dashboard-hero-search__results';
    resultsList.setAttribute('role', 'listbox');
    resultsList.hidden = true;
    heroSearch.appendChild(searchField);
    heroSearch.appendChild(resultsList);
    dashboard.appendChild(heroSearch);
    function navigateToResult(r) {
        searchInput.value = '';
        resultsList.hidden = true;
        resultsList.innerHTML = '';
        if (r.type === 'drug' && r.drugId) {
            showDrugModal(r.drugId);
            return;
        }
        router.navigate(r.route);
    }
    function renderResults(query) {
        if (!query.trim()) {
            resultsList.hidden = true;
            resultsList.innerHTML = '';
            return;
        }
        const results = search(query).slice(0, 12);
        resultsList.innerHTML = '';
        if (results.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'dashboard-hero-search__empty';
            empty.textContent = 'No matches';
            resultsList.appendChild(empty);
            resultsList.hidden = false;
            return;
        }
        for (const r of results) {
            const li = document.createElement('li');
            li.className = 'dashboard-hero-search__result';
            li.setAttribute('role', 'option');
            li.tabIndex = 0;
            const badge = document.createElement('span');
            badge.className = `dashboard-hero-search__badge dashboard-hero-search__badge--${r.type}`;
            badge.textContent = r.type;
            const labelWrap = document.createElement('span');
            labelWrap.className = 'dashboard-hero-search__label-wrap';
            const label = document.createElement('span');
            label.className = 'dashboard-hero-search__label';
            label.textContent = r.label;
            labelWrap.appendChild(label);
            if (r.sublabel) {
                const sub = document.createElement('span');
                sub.className = 'dashboard-hero-search__sublabel';
                sub.textContent = r.sublabel;
                labelWrap.appendChild(sub);
            }
            li.appendChild(badge);
            li.appendChild(labelWrap);
            li.addEventListener('click', () => navigateToResult(r));
            li.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter' || ev.key === ' ') {
                    ev.preventDefault();
                    navigateToResult(r);
                }
            });
            resultsList.appendChild(li);
        }
        resultsList.hidden = false;
    }
    searchInput.addEventListener('input', () => renderResults(searchInput.value));
    searchInput.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter') {
            const first = resultsList.querySelector('.dashboard-hero-search__result');
            if (first)
                first.click();
        }
        else if (ev.key === 'Escape') {
            searchInput.value = '';
            resultsList.hidden = true;
            resultsList.innerHTML = '';
            searchInput.blur();
        }
    });
    document.addEventListener('click', (ev) => {
        if (!heroSearch.contains(ev.target)) {
            resultsList.hidden = true;
        }
    });
    // ---- Recents Row ----
    const recents = getRecents();
    if (recents.length > 0) {
        const recentsSection = document.createElement('div');
        recentsSection.className = 'dashboard-recents';
        const recentsHeader = document.createElement('div');
        recentsHeader.className = 'dashboard-recents__header';
        const recentsTitle = document.createElement('span');
        recentsTitle.className = 'dashboard-recents__title';
        recentsTitle.textContent = 'Recent';
        recentsHeader.appendChild(recentsTitle);
        recentsSection.appendChild(recentsHeader);
        const recentsScroll = document.createElement('div');
        recentsScroll.className = 'dashboard-recents__scroll';
        const colors = getCategoryColors();
        for (const recent of recents) {
            const item = document.createElement('div');
            item.className = 'dashboard-recent-item';
            // Glassmorphic 3D icon with category color
            const iconBox = document.createElement('div');
            iconBox.className = 'dashboard-recent-item__icon dashboard-recent-item__icon--glass';
            // Get category color and apply gradient
            const catColor = colors[recent.categoryId || 'emergency-medicine'];
            const baseColor = catColor?.card || '#4a90d9';
            iconBox.style.background = buildSpecialtyGradient(baseColor);
            // Medical cross SVG
            iconBox.innerHTML = `
        <svg viewBox="0 0 24 24" class="dashboard-recent-item__cross">
          <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" fill="currentColor"/>
        </svg>
      `;
            const label = document.createElement('span');
            label.className = 'dashboard-recent-item__label';
            label.textContent = recent.title;
            item.appendChild(iconBox);
            item.appendChild(label);
            item.addEventListener('click', () => {
                router.navigate(`/tree/${recent.id}`);
            });
            recentsScroll.appendChild(item);
        }
        recentsSection.appendChild(recentsScroll);
        dashboard.appendChild(recentsSection);
    }
    // ---- Categories ----
    const categoriesSection = document.createElement('div');
    categoriesSection.className = 'dashboard-categories';
    const allCategories = getAllCategories();
    const sharedMode = isSharedMode();
    const sharedIds = sharedMode ? new Set(getSharedTreeIds()) : null;
    // Filter: remove tool categories, apply shared mode filter
    let categories;
    if (sharedMode) {
        categories = allCategories
            .map(cat => {
            if (TOOL_ROUTES[cat.id])
                return null;
            const filtered = cat.decisionTrees.filter(t => sharedIds.has(t.id));
            if (filtered.length === 0)
                return null;
            return { ...cat, decisionTrees: filtered };
        })
            .filter((c) => c !== null);
    }
    else {
        categories = allCategories.filter(cat => !TOOL_ROUTES[cat.id]);
    }
    // Sort alphabetically
    categories.sort((a, b) => a.name.localeCompare(b.name));
    for (const cat of categories) {
        const card = document.createElement('button');
        card.className = 'category-card-v2';
        card.type = 'button';
        card.setAttribute('aria-label', `${cat.name} - ${cat.decisionTrees.length} consults`);
        // Apply gradient background to the card itself (glass overlay on top)
        card.style.background = getSpecialtyGradient(cat.id);
        // Apply custom text color if defined (e.g., black text on light cards)
        const catColors = getCategoryColors()[cat.id];
        if (catColors?.textColor) {
            card.style.color = catColors.textColor;
        }
        // Content - just name and count, vertically stacked
        const content = document.createElement('div');
        content.className = 'category-card-v2__content';
        const name = document.createElement('div');
        name.className = 'category-card-v2__name';
        name.textContent = cat.name;
        const count = document.createElement('div');
        count.className = 'category-card-v2__count';
        const n = cat.decisionTrees.length;
        count.textContent = `${n} consult${n !== 1 ? 's' : ''}`;
        content.appendChild(name);
        content.appendChild(count);
        card.appendChild(content);
        card.addEventListener('click', () => {
            router.navigate(`/category/${cat.id}`);
        });
        categoriesSection.appendChild(card);
    }
    dashboard.appendChild(categoriesSection);
    // ---- Unlock All (shared mode only) ----
    if (sharedMode) {
        const unlockBtn = document.createElement('button');
        unlockBtn.className = 'btn-primary dashboard-unlock';
        unlockBtn.textContent = 'Unlock All Consults';
        unlockBtn.addEventListener('click', () => {
            grantFullAccess();
            renderDashboard(container);
        });
        dashboard.appendChild(unlockBtn);
    }
    // ---- Disclaimer ----
    const disclaimer = document.createElement('p');
    disclaimer.className = 'dashboard-disclaimer';
    disclaimer.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment.';
    dashboard.appendChild(disclaimer);
    container.appendChild(dashboard);
    // ---- Build search index eagerly so first keystroke always has results ----
    buildSearchIndex();
    // ---- Hide global app header (dashboard has its own logo) ----
    const appHeader = document.querySelector('.app-header');
    if (appHeader)
        appHeader.style.display = 'none';
    // ---- Show global tab bar ----
    const globalTabBar = document.getElementById('bottom-tab-bar');
    if (globalTabBar)
        globalTabBar.style.display = '';
}
