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
import { showShareModal } from './share-modal.js';
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
    // ---- Chief Complaint Hubs hero card (sits ABOVE MedKitt Learn) ----
    // Hub list filtering happens inside renderHubsHome — we always show the tile
    // so future hubs auto-appear without a dashboard change. In shared mode the
    // tile still opens, and the hubs-home empty state handles the no-hubs case.
    if (!isSharedMode()) {
        const hubsCard = document.createElement('button');
        hubsCard.className = 'dashboard-hubs-card';
        hubsCard.type = 'button';
        hubsCard.setAttribute('aria-label', 'Open Chief Complaint Hubs — triage by presenting complaint');
        const hubsBadge = document.createElement('div');
        hubsBadge.className = 'dashboard-hubs-card__badge';
        hubsBadge.textContent = 'NEW';
        hubsCard.appendChild(hubsBadge);
        const hubsTitle = document.createElement('div');
        hubsTitle.className = 'dashboard-hubs-card__title';
        hubsTitle.textContent = 'Chief Complaint Hubs';
        hubsCard.appendChild(hubsTitle);
        const hubsSub = document.createElement('div');
        hubsSub.className = 'dashboard-hubs-card__sub';
        hubsSub.textContent = 'Triage by chief complaint: sick check, exclusions, rescue, imaging, disposition.';
        hubsCard.appendChild(hubsSub);
        const hubsArrow = document.createElement('div');
        hubsArrow.className = 'dashboard-hubs-card__arrow';
        hubsArrow.textContent = '→';
        hubsArrow.setAttribute('aria-hidden', 'true');
        hubsCard.appendChild(hubsArrow);
        hubsCard.addEventListener('click', () => router.navigate('/hubs'));
        dashboard.appendChild(hubsCard);
    }
    // ---- MedKitt Learn hero card (full-access only) ----
    if (!isSharedMode()) {
        const learnCard = document.createElement('button');
        learnCard.className = 'dashboard-learn-card';
        learnCard.type = 'button';
        learnCard.setAttribute('aria-label', 'Open MedKitt Learn — student rotation mode');
        const learnBadge = document.createElement('div');
        learnBadge.className = 'dashboard-learn-card__badge';
        learnBadge.textContent = 'NEW';
        learnCard.appendChild(learnBadge);
        const learnTitle = document.createElement('div');
        learnTitle.className = 'dashboard-learn-card__title';
        learnTitle.textContent = 'MedKitt Learn';
        learnCard.appendChild(learnTitle);
        const learnSub = document.createElement('div');
        learnSub.className = 'dashboard-learn-card__sub';
        learnSub.textContent = 'Clinical rotation mode for medical students — Psychiatry available now.';
        learnCard.appendChild(learnSub);
        const learnArrow = document.createElement('div');
        learnArrow.className = 'dashboard-learn-card__arrow';
        learnArrow.textContent = '→';
        learnArrow.setAttribute('aria-hidden', 'true');
        learnCard.appendChild(learnArrow);
        learnCard.addEventListener('click', () => router.navigate('/learn'));
        dashboard.appendChild(learnCard);
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
    // ---- Share & Install card ----
    const shareCard = document.createElement('button');
    shareCard.className = 'dashboard-share-card';
    shareCard.type = 'button';
    shareCard.setAttribute('aria-label', 'Share myMedKitt — show QR code to install on another device');
    const shareIcon = document.createElement('div');
    shareIcon.className = 'dashboard-share-card__icon';
    shareIcon.innerHTML = `
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <path d="M14 14h3v3h-3zM18 18h3M14 21h3M21 14v3M21 21h0"/>
    </svg>
  `;
    shareCard.appendChild(shareIcon);
    const shareBody = document.createElement('div');
    shareBody.className = 'dashboard-share-card__body';
    const shareTitle = document.createElement('div');
    shareTitle.className = 'dashboard-share-card__title';
    shareTitle.textContent = 'Share & Install';
    shareBody.appendChild(shareTitle);
    const shareSub = document.createElement('div');
    shareSub.className = 'dashboard-share-card__sub';
    shareSub.textContent = 'Show the QR code so anyone can scan to install myMedKitt on their phone.';
    shareBody.appendChild(shareSub);
    shareCard.appendChild(shareBody);
    const shareArrow = document.createElement('div');
    shareArrow.className = 'dashboard-share-card__arrow';
    shareArrow.textContent = '→';
    shareArrow.setAttribute('aria-hidden', 'true');
    shareCard.appendChild(shareArrow);
    shareCard.addEventListener('click', () => showShareModal());
    dashboard.appendChild(shareCard);
    // ---- Get the Claude Skill card (WingMan coordinator — links to skill.html) ----
    const skillCard = document.createElement('button');
    skillCard.className = 'dashboard-share-card';
    skillCard.type = 'button';
    skillCard.setAttribute('aria-label', 'Get the myMedKitt Claude skill — for licensed clinicians');
    const skillIcon = document.createElement('div');
    skillIcon.className = 'dashboard-share-card__icon';
    skillIcon.innerHTML = `
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M12 3l1.9 4.6L18.5 9l-4.6 1.4L12 15l-1.9-4.6L5.5 9l4.6-1.4z"/>
      <path d="M18 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>
    </svg>
  `;
    skillCard.appendChild(skillIcon);
    const skillBody = document.createElement('div');
    skillBody.className = 'dashboard-share-card__body';
    const skillTitle = document.createElement('div');
    skillTitle.className = 'dashboard-share-card__title';
    skillTitle.textContent = 'Get the Claude Skill';
    skillBody.appendChild(skillTitle);
    const skillSub = document.createElement('div');
    skillSub.className = 'dashboard-share-card__sub';
    skillSub.textContent = "Bring myMedKitt's consult reasoning into Claude. For licensed clinicians.";
    skillBody.appendChild(skillSub);
    skillCard.appendChild(skillBody);
    const skillArrow = document.createElement('div');
    skillArrow.className = 'dashboard-share-card__arrow';
    skillArrow.textContent = '→';
    skillArrow.setAttribute('aria-hidden', 'true');
    skillCard.appendChild(skillArrow);
    skillCard.addEventListener('click', () => {
        window.location.href = 'skill.html';
    });
    dashboard.appendChild(skillCard);
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
