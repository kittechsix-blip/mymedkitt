// myMedKitt — Dashboard (Home Screen)
// Phase 1 shell: Logo header, 2-column grid of 3D specialty buttons
// (alphabetical), search icon, bottom toolbar (Lab/Pharmacy/Med-Calc).

import { getAllCategories } from '../services/category-service.js';
import { getSpecialtyGradient } from './button-3d.js';
import { router } from '../services/router.js';
import { isSharedMode, getSharedTreeIds, grantFullAccess } from '../services/shared-mode.js';
import type { Category } from '../models/types.js';
import { getAllDrugs } from '../services/drug-service.js';
import { getAllCalculators } from './calculator.js';
import { showDrugModal } from './drug-store.js';
import { search, buildSearchIndex, type SearchResult } from '../services/search-service.js';

/** Tool categories route to special pages instead of category view */
const TOOL_ROUTES: Record<string, { route: string; getCount: () => number; unit: string }> = {
  'pharmacy': { route: '/drugs', getCount: () => getAllDrugs().length, unit: 'drug' },
  'med-calc': { route: '/calculators', getCount: () => getAllCalculators().length, unit: 'tool' },
};

// ===================================================================
// Dashboard Render
// ===================================================================

export function renderDashboard(container: HTMLElement): void {
  container.innerHTML = '';

  const dashboard = document.createElement('div');
  dashboard.className = 'dashboard';

  // ---- Logo Header ----
  const logoHeader = document.createElement('div');
  logoHeader.className = 'dashboard-header';

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

  // ---- Search Icon (expands to search bar on tap) ----
  const subheader = document.createElement('div');
  subheader.className = 'dashboard-subheader';

  const searchIcon = document.createElement('button');
  searchIcon.className = 'dashboard-subheader__search';
  searchIcon.textContent = '\uD83D\uDD0D';
  searchIcon.setAttribute('aria-label', 'Search');

  const searchBar = document.createElement('div');
  searchBar.className = 'dashboard-search';
  searchBar.id = 'dashboard-search';

  const searchInput = document.createElement('input');
  searchInput.className = 'dashboard-search__input';
  searchInput.type = 'search';
  searchInput.placeholder = 'Search consults, drugs, calculators\u2026';
  searchInput.setAttribute('aria-label', 'Search');
  searchBar.appendChild(searchInput);

  searchIcon.addEventListener('click', () => {
    const isOpen = searchBar.classList.toggle('dashboard-search--open');
    if (isOpen) searchInput.focus();
  });

  // Share app button — sends full app URL
  const shareAppBtn = document.createElement('button');
  shareAppBtn.className = 'dashboard-subheader__share';
  shareAppBtn.textContent = '\u{1F517}';
  shareAppBtn.setAttribute('aria-label', 'Share app');
  shareAppBtn.addEventListener('click', () => {
    const url = `${window.location.origin}${window.location.pathname}`;
    if (navigator.share) {
      navigator.share({ title: 'myMedKitt', text: 'Clinical decision support for emergency medicine', url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        shareAppBtn.textContent = '\u2713';
        setTimeout(() => { shareAppBtn.textContent = '\u{1F517}'; }, 1500);
      }).catch(() => {});
    }
  });

  subheader.appendChild(shareAppBtn);
  subheader.appendChild(searchIcon);
  dashboard.appendChild(subheader);
  dashboard.appendChild(searchBar);

  // ---- Search Results ----
  const searchResults = document.createElement('div');
  searchResults.className = 'dashboard-search-results';
  searchResults.style.display = 'none';
  dashboard.appendChild(searchResults);

  // ---- Specialty Grid ----
  const grid = document.createElement('div');
  grid.className = 'dashboard-grid';
  grid.id = 'dashboard-grid';

  const allCategories = getAllCategories();
  const sharedMode = isSharedMode();
  const sharedIds = sharedMode ? new Set(getSharedTreeIds()) : null;

  // Filter: remove tool categories, apply shared mode filter
  let categories: Category[];
  if (sharedMode) {
    categories = allCategories
      .map(cat => {
        if (TOOL_ROUTES[cat.id]) return null;
        const filtered = cat.decisionTrees.filter(t => sharedIds!.has(t.id));
        if (filtered.length === 0) return null;
        return { ...cat, decisionTrees: filtered } as Category;
      })
      .filter((c): c is Category => c !== null);
  } else {
    categories = allCategories.filter(cat => !TOOL_ROUTES[cat.id]);
  }

  // Sort alphabetically
  categories.sort((a, b) => a.name.localeCompare(b.name));

  for (const cat of categories) {
    const btn = document.createElement('button');
    btn.className = 'dashboard-card';
    btn.style.background = getSpecialtyGradient(cat.id);
    btn.setAttribute('aria-label', `${cat.name} \u2014 ${cat.decisionTrees.length} consults`);

    btn.addEventListener('click', () => {
      router.navigate(`/category/${cat.id}`);
    });

    // Category name
    const name = document.createElement('div');
    name.className = 'dashboard-card__name';
    name.textContent = cat.name;

    // Consult count
    const count = document.createElement('div');
    count.className = 'dashboard-card__count';
    const n = cat.decisionTrees.length;
    count.textContent = `${n} consult${n !== 1 ? 's' : ''}`;

    btn.appendChild(name);
    btn.appendChild(count);
    grid.appendChild(btn);
  }

  dashboard.appendChild(grid);

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
  const appHeader = document.querySelector('.app-header') as HTMLElement | null;
  if (appHeader) appHeader.style.display = 'none';

  // ---- Show global tab bar ----
  const globalTabBar = document.getElementById('bottom-tab-bar');
  if (globalTabBar) globalTabBar.style.display = '';

  // ---- Search Logic (Fuse.js fuzzy search) ----
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
      grid.style.display = '';
      searchResults.style.display = 'none';
      searchResults.innerHTML = '';
      return;
    }
    grid.style.display = 'none';
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';
    const results = search(query);
    searchResults.appendChild(renderSearchResultsList(results));
  });
}

// ===================================================================
// Search (powered by SearchService with Fuse.js fuzzy matching)
// ===================================================================

const TYPE_LABELS: Record<string, string> = {
  category: 'Categories',
  consult: 'Consults',
  drug: 'Drugs',
  calculator: 'Calculators',
};

function renderSearchResultsList(results: SearchResult[]): HTMLElement {
  const wrapper = document.createElement('div');

  if (results.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'search-empty';
    empty.textContent = 'No results found.';
    wrapper.appendChild(empty);
    return wrapper;
  }

  const grouped: Record<string, SearchResult[]> = {};
  for (const r of results) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  }

  for (const type of ['category', 'consult', 'drug', 'calculator']) {
    const group = grouped[type];
    if (!group?.length) continue;

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
        } else {
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
