// myMedKitt — Tricks of the Trade home
//
// Lists every specialty from TRICK_SPECIALTIES as a colored card. Tapping a card
// opens that specialty's InfoPage modal (#/info/<infoPageId>), which holds the
// individual tricks (one section per trick: Accomplishes / How to / Equipment).
//
// Mirrors the renderHubsHome pattern. New specialties auto-appear by adding an
// entry to tricks-registry.ts — no change needed here.
import { router } from '../services/router.js';
import { TRICK_SPECIALTIES } from '../data/tricks-registry.js';
export function renderTricksHome(container) {
    container.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'tricks-home';
    // ---- Header ----
    const header = document.createElement('div');
    header.className = 'tricks-home__header';
    const back = document.createElement('button');
    back.className = 'tricks-home__back';
    back.type = 'button';
    back.setAttribute('aria-label', 'Back to home');
    back.textContent = '\u2190 Home';
    back.addEventListener('click', () => router.navigate('/'));
    header.appendChild(back);
    const title = document.createElement('h1');
    title.className = 'tricks-home__title';
    title.textContent = 'Tricks of the Trade';
    header.appendChild(title);
    const subtitle = document.createElement('p');
    subtitle.className = 'tricks-home__subtitle';
    subtitle.textContent = 'Clever, often-overlooked ways to get clinical tasks done \u2014 organized by specialty. What it does, how to do it, and what you need.';
    header.appendChild(subtitle);
    page.appendChild(header);
    // ---- Specialty grid ----
    const grid = document.createElement('div');
    grid.className = 'tricks-home__grid';
    for (const spec of TRICK_SPECIALTIES) {
        const card = document.createElement('button');
        card.className = 'trick-card';
        card.type = 'button';
        card.setAttribute('aria-label', `Open ${spec.label} tricks`);
        card.style.background = `linear-gradient(135deg, ${spec.color} 0%, ${shade(spec.color, -18)} 100%)`;
        const icon = document.createElement('div');
        icon.className = 'trick-card__icon';
        icon.textContent = spec.icon;
        icon.setAttribute('aria-hidden', 'true');
        card.appendChild(icon);
        const cardTitle = document.createElement('div');
        cardTitle.className = 'trick-card__title';
        cardTitle.textContent = spec.label;
        card.appendChild(cardTitle);
        const cardSub = document.createElement('div');
        cardSub.className = 'trick-card__sub';
        cardSub.textContent = spec.subtitle;
        card.appendChild(cardSub);
        const count = document.createElement('div');
        count.className = 'trick-card__count';
        count.textContent = spec.trickCount === 1 ? '1 trick' : `${spec.trickCount} tricks`;
        card.appendChild(count);
        card.addEventListener('click', () => router.navigate(`/info/${spec.infoPageId}`));
        grid.appendChild(card);
    }
    page.appendChild(grid);
    container.appendChild(page);
}
/** Darken (negative pct) or lighten a hex color for the gradient end-stop. */
function shade(hex, pct) {
    const m = hex.replace('#', '');
    const num = parseInt(m.length === 3 ? m.split('').map((c) => c + c).join('') : m, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    const factor = pct / 100;
    r = Math.round(Math.min(255, Math.max(0, r + r * factor)));
    g = Math.round(Math.min(255, Math.max(0, g + g * factor)));
    b = Math.round(Math.min(255, Math.max(0, b + b * factor)));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
