// MedKitt — Category Grid (Home Screen)
// Renders rolodex-style horizontal cards with 3D icons + global search.
import { getAllCategories, addCustomCategory, getCategoryColors } from '../services/category-service.js';
import { getAllCalculators } from './calculator.js';
import { getAllDrugs } from '../services/drug-service.js';
import { showDrugModal } from './drug-store.js';
import { router } from '../services/router.js';
import { isSharedMode, getSharedTreeIds, grantFullAccess } from '../services/shared-mode.js';
/** Tool categories route to special pages instead of /category/{id} */
const TOOL_ROUTES = {
    'pharmacy': { route: '/drugs', getCount: () => getAllDrugs().length, unit: 'drug' },
    'med-calc': { route: '/calculators', getCount: () => getAllCalculators().length, unit: 'tool' },
};
/** Darken or lighten a hex color by a percentage (-15 = 15% darker) */
function adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) + Math.round(2.55 * percent)));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + Math.round(2.55 * percent)));
    const b = Math.min(255, Math.max(0, (num & 0xFF) + Math.round(2.55 * percent)));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
/** Check if a hex color is perceptually dark (ITU-R BT.601) */
function isDark(hex) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = (num >> 16) & 0xFF;
    const g = (num >> 8) & 0xFF;
    const b = num & 0xFF;
    return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}
/** Get a contrasting channel color — darker for bright cards, lighter for dark cards */
function getChannelColor(cardHex) {
    return isDark(cardHex)
        ? adjustBrightness(cardHex, 22)
        : adjustBrightness(cardHex, -22);
}
/** Render the category rolodex into the given container */
export function renderCategoryGrid(container) {
    container.innerHTML = '';
    // Search bar
    const searchBar = document.createElement('div');
    searchBar.className = 'home-search-bar';
    const searchIcon = document.createElement('span');
    searchIcon.className = 'search-icon';
    searchIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search consults, drugs, calculators\u2026';
    searchInput.setAttribute('aria-label', 'Search categories, consults, drugs, and calculators');
    searchBar.appendChild(searchIcon);
    searchBar.appendChild(searchInput);
    container.appendChild(searchBar);
    // Rolodex container
    const rolodex = document.createElement('div');
    rolodex.className = 'rolodex';
    const allCategories = getAllCategories();
    const sharedMode = isSharedMode();
    const sharedIds = sharedMode ? new Set(getSharedTreeIds()) : null;
    // In shared mode, filter categories to only those containing shared consults
    const categories = sharedMode
        ? allCategories
            .map(cat => {
            if (cat.id === 'pharmacy' || cat.id === 'med-calc')
                return null;
            const filtered = cat.decisionTrees.filter(t => sharedIds.has(t.id));
            if (filtered.length === 0)
                return null;
            return { ...cat, decisionTrees: filtered };
        })
            .filter((c) => c !== null)
        : allCategories;
    for (const cat of categories) {
        // Skip pharmacy and med-calc — they're in the bottom tab bar
        if (cat.id === 'pharmacy' || cat.id === 'med-calc')
            continue;
        const toolInfo = TOOL_ROUTES[cat.id];
        if (toolInfo) {
            // Hide tool categories in shared mode
            if (sharedMode)
                continue;
            const count = toolInfo.getCount();
            rolodex.appendChild(createRolodexCard(cat, count, toolInfo.route, toolInfo.unit));
        }
        else {
            rolodex.appendChild(createRolodexCard(cat, cat.decisionTrees.length));
        }
    }
    // Add button — only in full mode
    if (!sharedMode) {
        rolodex.appendChild(createAddCard());
    }
    container.appendChild(rolodex);
    // Unlock All button — shared mode only
    if (sharedMode) {
        const unlockBtn = document.createElement('button');
        unlockBtn.className = 'btn-primary unlock-all-btn';
        unlockBtn.textContent = 'Unlock All Consults';
        unlockBtn.style.cssText = 'display:block;margin:20px auto 0;padding:12px 32px;font-size:15px;';
        unlockBtn.addEventListener('click', () => {
            grantFullAccess();
            renderCategoryGrid(container);
        });
        container.appendChild(unlockBtn);
    }
    // Disclaimer
    const disclaimer = document.createElement('p');
    disclaimer.className = 'home-disclaimer';
    disclaimer.textContent = 'This tool is for educational and clinical decision support purposes only. It does not replace clinical judgment. All treatment decisions should be verified against current guidelines and institutional protocols.';
    container.appendChild(disclaimer);
    // Search handler
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim().toLowerCase();
        if (query.length === 0) {
            rolodex.style.display = '';
            disclaimer.style.display = '';
            const existingResults = container.querySelector('.search-results');
            if (existingResults)
                existingResults.remove();
            return;
        }
        rolodex.style.display = 'none';
        disclaimer.style.display = 'none';
        const existingResults = container.querySelector('.search-results');
        if (existingResults)
            existingResults.remove();
        const results = buildSearchResults(query);
        const resultsEl = renderSearchResults(results);
        container.appendChild(resultsEl);
    });
}
/** Create a rolodex card for a category */
function createRolodexCard(cat, count, route, unit) {
    const effectiveRoute = route || `/category/${cat.id}`;
    const effectiveUnit = unit || 'consult';
    const colors = getCategoryColors()[cat.id] || { card: '#607D8B', iconBg: '#ECEFF1' };
    const card = document.createElement('a');
    card.className = 'rolodex-card';
    card.href = '#' + effectiveRoute;
    card.style.background = `linear-gradient(135deg, ${colors.card}, ${adjustBrightness(colors.card, -15)})`;
    if (colors.outline) {
        card.style.border = `2px solid ${colors.outline}`;
    }
    card.setAttribute('aria-label', `${cat.name} \u2014 ${count} ${effectiveUnit}${count !== 1 ? 's' : ''}`);
    card.addEventListener('click', (e) => {
        e.preventDefault();
        router.navigate(effectiveRoute);
    });
    // Icon (left side)
    const iconWrap = document.createElement('div');
    iconWrap.className = 'rolodex-icon';
    iconWrap.style.background = colors.iconBg;
    if (cat.icon.endsWith('.png')) {
        const img = document.createElement('img');
        img.src = `assets/icons/${cat.icon}`;
        img.alt = '';
        img.width = 52;
        img.height = 52;
        img.loading = 'lazy';
        iconWrap.appendChild(img);
    }
    else {
        iconWrap.textContent = cat.icon;
        iconWrap.style.fontSize = '24px';
    }
    card.appendChild(iconWrap);
    // Name (center)
    const nameEl = document.createElement('div');
    nameEl.className = 'rolodex-name';
    nameEl.textContent = cat.name;
    if (colors.textColor) {
        nameEl.style.color = colors.textColor;
    }
    card.appendChild(nameEl);
    // Contrasting channel color for indent + bottom line
    const channelColor = getChannelColor(colors.card);
    // Bottom line — thin strip extending full width of card bottom
    const bottomLine = document.createElement('div');
    bottomLine.className = 'rolodex-bottom-line';
    bottomLine.style.background = channelColor;
    card.appendChild(bottomLine);
    // Badge — recessed inlet at bottom-right corner
    if (count > 0) {
        const badge = document.createElement('span');
        badge.className = 'rolodex-badge';
        badge.style.background = channelColor;
        badge.textContent = `${count} ${effectiveUnit}${count !== 1 ? 's' : ''}`.toUpperCase();
        if (colors.textColor) {
            badge.style.color = colors.textColor;
        }
        card.appendChild(badge);
    }
    return card;
}
/** Create the "+ Add Category" card */
function createAddCard() {
    const card = document.createElement('button');
    card.className = 'rolodex-card rolodex-card--add';
    card.setAttribute('aria-label', 'Add custom category');
    const nameEl = document.createElement('div');
    nameEl.className = 'rolodex-name';
    nameEl.textContent = '+ Add Category';
    card.appendChild(nameEl);
    card.addEventListener('click', () => {
        const name = prompt('Enter category name:');
        if (name && name.trim()) {
            addCustomCategory(name.trim());
            const main = document.getElementById('main-content');
            if (main) {
                renderCategoryGrid(main);
            }
        }
    });
    return card;
}
function buildSearchResults(query) {
    const results = [];
    const categories = getAllCategories();
    const seenTreeIds = new Set();
    // Search categories
    for (const cat of categories) {
        if (cat.name.toLowerCase().includes(query)) {
            const toolInfo = TOOL_ROUTES[cat.id];
            const route = toolInfo ? toolInfo.route : `/category/${cat.id}`;
            results.push({
                type: 'category',
                label: cat.name,
                sublabel: `${cat.decisionTrees.length} consult${cat.decisionTrees.length !== 1 ? 's' : ''}`,
                route,
            });
        }
        // Search consults (deduplicated)
        for (const tree of cat.decisionTrees) {
            if (seenTreeIds.has(tree.id))
                continue;
            if (tree.title.toLowerCase().includes(query) || tree.subtitle.toLowerCase().includes(query)) {
                seenTreeIds.add(tree.id);
                results.push({
                    type: 'consult',
                    label: tree.title,
                    sublabel: tree.subtitle,
                    route: `/tree/${tree.id}`,
                });
            }
        }
    }
    // Search drugs
    for (const drug of getAllDrugs()) {
        if (drug.name.toLowerCase().includes(query) ||
            drug.genericName.toLowerCase().includes(query) ||
            drug.drugClass.toLowerCase().includes(query)) {
            results.push({
                type: 'drug',
                label: drug.name,
                sublabel: drug.drugClass,
                route: '/drugs',
                drugId: drug.id,
            });
        }
    }
    // Search calculators
    for (const calc of getAllCalculators()) {
        if (calc.title.toLowerCase().includes(query) || calc.subtitle.toLowerCase().includes(query)) {
            results.push({
                type: 'calculator',
                label: calc.title,
                sublabel: calc.subtitle,
                route: `/calculator/${calc.id}`,
            });
        }
    }
    return results;
}
const TYPE_LABELS = {
    category: 'Categories',
    consult: 'Consults',
    drug: 'Drugs',
    calculator: 'Calculators',
};
function renderSearchResults(results) {
    const wrapper = document.createElement('div');
    wrapper.className = 'search-results';
    if (results.length === 0) {
        const empty = document.createElement('p');
        empty.className = 'search-empty';
        empty.textContent = 'No results found.';
        wrapper.appendChild(empty);
        return wrapper;
    }
    // Group by type
    const grouped = {};
    for (const r of results) {
        if (!grouped[r.type])
            grouped[r.type] = [];
        grouped[r.type].push(r);
    }
    for (const type of ['category', 'consult', 'drug', 'calculator']) {
        const group = grouped[type];
        if (!group || group.length === 0)
            continue;
        const groupLabel = document.createElement('h3');
        groupLabel.className = 'search-group-label';
        groupLabel.textContent = TYPE_LABELS[type];
        wrapper.appendChild(groupLabel);
        for (const item of group) {
            const row = document.createElement('a');
            row.className = 'search-result-item';
            row.href = '#' + item.route;
            row.addEventListener('click', (e) => {
                e.preventDefault();
                if (item.drugId) {
                    showDrugModal(item.drugId);
                }
                else {
                    router.navigate(item.route);
                }
            });
            const label = document.createElement('span');
            label.className = 'search-result-label';
            label.textContent = item.label;
            const sublabel = document.createElement('span');
            sublabel.className = 'search-result-sublabel';
            sublabel.textContent = item.sublabel;
            row.appendChild(label);
            row.appendChild(sublabel);
            wrapper.appendChild(row);
        }
    }
    return wrapper;
}
