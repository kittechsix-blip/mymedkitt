// myMedKitt — MedKitt Learn home (rotation picker)
// Lists available learning rotations. Phase 1 ships only Psychiatry.

import { listRotations } from '../services/learn-service.js';
import { router } from '../services/router.js';
import { buildSpecialtyGradient } from './button-3d.js';
import { getCategoryColors } from '../services/category-service.js';

export function renderLearnHome(container: HTMLElement): void {
  container.innerHTML = '';

  const page = document.createElement('div');
  page.className = 'learn-home';

  // Header
  const header = document.createElement('div');
  header.className = 'learn-home__header';

  const back = document.createElement('button');
  back.className = 'learn-back-btn';
  back.type = 'button';
  back.setAttribute('aria-label', 'Back to home');
  back.textContent = '← Home';
  back.addEventListener('click', () => router.navigate('/'));
  header.appendChild(back);

  const title = document.createElement('h1');
  title.className = 'learn-home__title';
  title.textContent = 'MedKitt Learn';
  header.appendChild(title);

  const subtitle = document.createElement('p');
  subtitle.className = 'learn-home__subtitle';
  subtitle.textContent = 'Clinical rotation mode — for medical students. Ninety seconds before you walk in the room.';
  header.appendChild(subtitle);

  page.appendChild(header);

  // Rotation tiles
  const grid = document.createElement('div');
  grid.className = 'learn-home__grid';

  const rotations = listRotations();
  const colors = getCategoryColors();

  for (const rotation of rotations) {
    const tile = document.createElement('button');
    tile.className = 'learn-rotation-tile';
    tile.type = 'button';

    const colorEntry = colors[rotation.categoryId];
    if (colorEntry) {
      tile.style.background = buildSpecialtyGradient(colorEntry.card);
    }

    const tileTitle = document.createElement('div');
    tileTitle.className = 'learn-rotation-tile__title';
    tileTitle.textContent = `Core Rotation: ${rotation.name}`;
    tile.appendChild(tileTitle);

    const tileSub = document.createElement('div');
    tileSub.className = 'learn-rotation-tile__sub';
    tileSub.textContent = 'What to ask, what to look for, what to say on rounds, and when to escalate.';
    tile.appendChild(tileSub);

    tile.addEventListener('click', () => router.navigate(`/learn/${rotation.id}`));
    grid.appendChild(tile);
  }

  // Coming soon placeholder
  const comingSoon = document.createElement('div');
  comingSoon.className = 'learn-coming-soon';
  comingSoon.textContent = 'More rotations coming: Internal Medicine · Emergency · Pediatrics · OB/GYN · Surgery · Family Medicine.';
  grid.appendChild(comingSoon);

  page.appendChild(grid);
  container.appendChild(page);
}
