// myMedKitt — Dashboard V2 (Command Center)
// Hero search bar, recents row, clean category cards, quick actions

import { getAllCategories } from '../services/category-service.js';
import { getSpecialtyGradient } from './button-3d.js';
import { router } from '../services/router.js';
import { isSharedMode, getSharedTreeIds, grantFullAccess } from '../services/shared-mode.js';
import type { Category } from '../models/types.js';
import { getAllDrugs } from '../services/drug-service.js';
import { getAllCalculators } from './calculator.js';
import { buildSearchIndex } from '../services/search-service.js';
import { openSpotlight } from './spotlight.js';

/** Tool categories route to special pages instead of category view */
const TOOL_ROUTES: Record<string, { route: string; getCount: () => number; unit: string }> = {
  'pharmacy': { route: '/drugs', getCount: () => getAllDrugs().length, unit: 'drug' },
  'med-calc': { route: '/calculators', getCount: () => getAllCalculators().length, unit: 'tool' },
};

/** Category icons (emoji fallbacks) */
const CATEGORY_ICONS: Record<string, string> = {
  'airway': '🫁',
  'cardiology': '❤️',
  'critical-care': '🏥',
  'derm': '🔬',
  'endo': '⚗️',
  'gi': '🔄',
  'gyn': '👶',
  'heme': '🩸',
  'id': '🦠',
  'neuro': '🧠',
  'psych': '🧘',
  'pulm': '💨',
  'renal': '💧',
  'tox': '☠️',
  'trauma': '🚑',
};

/** Recent consults storage key */
const RECENTS_KEY = 'mymedkitt_recents';
const MAX_RECENTS = 6;

// ===================================================================
// Recents Management
// ===================================================================

interface RecentItem {
  id: string;
  title: string;
  timestamp: number;
}

function getRecents(): RecentItem[] {
  try {
    const stored = localStorage.getItem(RECENTS_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as RecentItem[];
  } catch {
    return [];
  }
}

export function addRecentConsult(id: string, title: string): void {
  const recents = getRecents().filter(r => r.id !== id);
  recents.unshift({ id, title, timestamp: Date.now() });
  if (recents.length > MAX_RECENTS) recents.length = MAX_RECENTS;
  localStorage.setItem(RECENTS_KEY, JSON.stringify(recents));
}

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

  // Tap header to open Spotlight
  logoHeader.addEventListener('click', openSpotlight);

  dashboard.appendChild(logoHeader);

  // ---- Hero Search Bar ----
  const heroSearch = document.createElement('div');
  heroSearch.className = 'dashboard-hero-search';

  const heroSearchBtn = document.createElement('button');
  heroSearchBtn.className = 'dashboard-hero-search__btn';
  heroSearchBtn.type = 'button';

  const searchIcon = document.createElement('span');
  searchIcon.className = 'dashboard-hero-search__icon';
  searchIcon.textContent = '🔍';

  const searchText = document.createElement('span');
  searchText.className = 'dashboard-hero-search__text';
  searchText.textContent = 'Search consults, drugs, calculators...';

  const searchShortcut = document.createElement('span');
  searchShortcut.className = 'dashboard-hero-search__shortcut';
  searchShortcut.textContent = '⌘K';

  heroSearchBtn.appendChild(searchIcon);
  heroSearchBtn.appendChild(searchText);
  heroSearchBtn.appendChild(searchShortcut);
  heroSearchBtn.addEventListener('click', openSpotlight);

  heroSearch.appendChild(heroSearchBtn);
  dashboard.appendChild(heroSearch);

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

    for (const recent of recents) {
      const item = document.createElement('div');
      item.className = 'dashboard-recent-item';

      const iconBox = document.createElement('div');
      iconBox.className = 'dashboard-recent-item__icon';
      iconBox.textContent = '🏥';

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
    const card = document.createElement('button');
    card.className = 'category-card-v2';
    card.type = 'button';
    card.setAttribute('aria-label', `${cat.name} - ${cat.decisionTrees.length} consults`);

    // Icon with gradient background
    const iconBox = document.createElement('div');
    iconBox.className = 'category-card-v2__icon';
    iconBox.textContent = CATEGORY_ICONS[cat.id] || '📋';
    iconBox.style.background = getSpecialtyGradient(cat.id);

    // Content
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

    // Arrow
    const arrow = document.createElement('span');
    arrow.className = 'category-card-v2__arrow';
    arrow.textContent = '›';

    card.appendChild(iconBox);
    card.appendChild(content);
    card.appendChild(arrow);

    card.addEventListener('click', () => {
      router.navigate(`/category/${cat.id}`);
    });

    categoriesSection.appendChild(card);
  }

  dashboard.appendChild(categoriesSection);

  // ---- Quick Actions ----
  const quickActions = document.createElement('div');
  quickActions.className = 'dashboard-quick-actions';

  const drugsBtn = document.createElement('button');
  drugsBtn.className = 'dashboard-quick-action';
  drugsBtn.type = 'button';
  const drugsIcon = document.createElement('span');
  drugsIcon.className = 'dashboard-quick-action__icon';
  drugsIcon.textContent = '💊';
  drugsBtn.appendChild(drugsIcon);
  drugsBtn.appendChild(document.createTextNode('Drugs'));
  drugsBtn.addEventListener('click', () => router.navigate('/drugs'));

  const calcsBtn = document.createElement('button');
  calcsBtn.className = 'dashboard-quick-action';
  calcsBtn.type = 'button';
  const calcsIcon = document.createElement('span');
  calcsIcon.className = 'dashboard-quick-action__icon';
  calcsIcon.textContent = '🧮';
  calcsBtn.appendChild(calcsIcon);
  calcsBtn.appendChild(document.createTextNode('Calculators'));
  calcsBtn.addEventListener('click', () => router.navigate('/calculators'));

  quickActions.appendChild(drugsBtn);
  quickActions.appendChild(calcsBtn);
  dashboard.appendChild(quickActions);

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
}
