// myMedKitt — Chief Complaint Hubs home
//
// Lists every tree with `type: 'hub'` from the categories registry,
// rendered as category-colored cards. Mirrors the renderLearnHome pattern.
//
// COLOR RULE: each hub adopts the color of its `displayCategoryId` if set,
// else falls back to its canonical `categoryId`. This keeps a hub's
// presentation aligned with the specialty it triages to (e.g., headache-hub
// uses Neurology color even though canonical category is Emergency Medicine).
//
// HIDDEN GATE: hubs in `FLAGS.hiddenTreeIds` are filtered out of the list,
// matching the rest of the app's hidden-gate behavior (PLAN.md R16).
// Hubs in `FLAGS.hiddenHubs` are also filtered (R14).

import { getAllCategories, getCategoryColors } from '../services/category-service.js';
import { router } from '../services/router.js';
import { isSharedMode } from '../services/shared-mode.js';
import { buildSpecialtyGradient } from './button-3d.js';
import { FLAGS } from '../data/feature-flags.js';
import type { DecisionTreeMeta } from '../models/types.js';

interface HubListEntry {
  tree: DecisionTreeMeta;
  displayCategoryId: string;
}

function listVisibleHubs(): HubListEntry[] {
  const seen = new Set<string>();
  const hubs: HubListEntry[] = [];
  for (const cat of getAllCategories()) {
    for (const tree of cat.decisionTrees) {
      if (tree.type !== 'hub') continue;
      if (seen.has(tree.id)) continue;
      seen.add(tree.id);
      if (FLAGS.hiddenTreeIds.includes(tree.id)) continue;
      if (FLAGS.hiddenHubs.includes(tree.id)) continue;
      hubs.push({
        tree,
        displayCategoryId: tree.displayCategoryId || tree.categoryId,
      });
    }
  }
  // Alphabetical by title — same convention as consults / categories
  hubs.sort((a, b) => a.tree.title.localeCompare(b.tree.title));
  return hubs;
}

export function renderHubsHome(container: HTMLElement): void {
  container.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'hubs-home';

  // ---- Header ----
  const header = document.createElement('div');
  header.className = 'hubs-home__header';

  const back = document.createElement('button');
  back.className = 'hubs-home__back';
  back.type = 'button';
  back.setAttribute('aria-label', 'Back to home');
  back.textContent = '← Home';
  back.addEventListener('click', () => router.navigate('/'));
  header.appendChild(back);

  const title = document.createElement('h1');
  title.className = 'hubs-home__title';
  title.textContent = 'MedKitt Chief Complaint Hubs';
  header.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'hubs-home__subtitle';
  subtitle.textContent = 'Triage by chief complaint — SNOOP10 red-flag screen → phenotype → the right deep-dive consult.';
  header.appendChild(subtitle);

  page.appendChild(header);

  // ---- Hub grid ----
  const grid = document.createElement('div');
  grid.className = 'hubs-home__grid';

  const hubs = listVisibleHubs();
  const colors = getCategoryColors();

  if (hubs.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'hubs-home__empty';
    empty.textContent = isSharedMode()
      ? 'No Chief Complaint Hubs have been shared with you yet.'
      : 'No Chief Complaint Hubs are available yet. More are on the way.';
    grid.appendChild(empty);
  } else {
    for (const { tree, displayCategoryId } of hubs) {
      const card = document.createElement('button');
      card.className = 'hub-card';
      card.type = 'button';
      card.setAttribute('aria-label', `Open ${tree.title}`);

      const colorEntry = colors[displayCategoryId];
      if (colorEntry) {
        card.style.background = buildSpecialtyGradient(colorEntry.card);
        if (colorEntry.textColor) {
          card.style.color = colorEntry.textColor;
        }
      }

      const cardTitle = document.createElement('div');
      cardTitle.className = 'hub-card__title';
      cardTitle.textContent = tree.title;
      card.appendChild(cardTitle);

      const cardSub = document.createElement('div');
      cardSub.className = 'hub-card__sub';
      cardSub.textContent = tree.subtitle;
      card.appendChild(cardSub);

      const cardCount = document.createElement('div');
      cardCount.className = 'hub-card__count';
      cardCount.textContent = `${tree.nodeCount} nodes`;
      card.appendChild(cardCount);

      card.addEventListener('click', () => router.navigate(`/tree/${tree.id}`));
      grid.appendChild(card);
    }
  }

  page.appendChild(grid);

  container.appendChild(page);
}
