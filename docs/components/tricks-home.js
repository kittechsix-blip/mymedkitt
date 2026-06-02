// myMedKitt — Tricks of the Trade
//
// Two views:
//   renderTricksHome      -> /tricks            : specialty grid + global-in-section
//                                                  search box that filters across ALL tricks.
//   renderTricksSpecialty -> /tricks/:specialty : alphabetical scannable list (title +
//                                                  one-line blurb). A row opens the full
//                                                  InfoPage modal scrolled to that trick.
//
// Source of truth is the InfoPages themselves: getTrickList(page) distills each
// page's sections into {title, blurb, anchorId}. Adding a trick (a new section)
// automatically populates both the directory and search — no extra bookkeeping.
import { router } from '../services/router.js';
import { TRICK_SPECIALTIES, getTrickSpecialty, getTrickList } from '../data/tricks-registry.js';
import { getInfoPage } from '../services/info-service.js';
import { showInfoModal } from './info-page.js';
/** Build the full alphabetical list of every trick across all specialties. */
function allTricks() {
    const out = [];
    for (const spec of TRICK_SPECIALTIES) {
        const page = getInfoPage(spec.infoPageId);
        for (const t of getTrickList(page)) {
            out.push({ ...t, specialtyId: spec.id, specialtyLabel: spec.label, infoPageId: spec.infoPageId });
        }
    }
    out.sort((a, b) => a.title.localeCompare(b.title));
    return out;
}
/** Open the full detail for a trick at its anchor. Modal overlays the directory;
 *  closing it returns to the list underneath — no navigation needed. */
function openTrick(infoPageId, anchorId) {
    showInfoModal(infoPageId, anchorId);
}
function makeBack(label, to) {
    const back = document.createElement('button');
    back.className = 'tricks-home__back';
    back.type = 'button';
    back.setAttribute('aria-label', label);
    back.textContent = `\u2190 ${label.replace(/^Back to /, '')}`;
    back.addEventListener('click', () => router.navigate(to));
    return back;
}
/** A single tappable directory row: bold title + grey blurb + chevron. */
function trickRow(title, blurb, specialtyLabel, onClick) {
    const row = document.createElement('button');
    row.className = 'trick-row';
    row.type = 'button';
    const main = document.createElement('div');
    main.className = 'trick-row__main';
    const t = document.createElement('div');
    t.className = 'trick-row__title';
    t.textContent = title;
    main.appendChild(t);
    if (blurb) {
        const b = document.createElement('div');
        b.className = 'trick-row__blurb';
        b.textContent = blurb;
        main.appendChild(b);
    }
    if (specialtyLabel) {
        const tag = document.createElement('div');
        tag.className = 'trick-row__tag';
        tag.textContent = specialtyLabel;
        main.appendChild(tag);
    }
    row.appendChild(main);
    const chev = document.createElement('span');
    chev.className = 'trick-row__chevron';
    chev.setAttribute('aria-hidden', 'true');
    chev.textContent = '\u203A';
    row.appendChild(chev);
    row.addEventListener('click', onClick);
    return row;
}
// ===================================================================
// /tricks — specialty grid + cross-specialty search
// ===================================================================
export function renderTricksHome(container) {
    container.innerHTML = '';
    const page = document.createElement('div');
    page.className = 'tricks-home';
    // ---- Header ----
    const header = document.createElement('div');
    header.className = 'tricks-home__header';
    header.appendChild(makeBack('Back to Home', '/'));
    const title = document.createElement('h1');
    title.className = 'tricks-home__title';
    title.textContent = 'Tricks of the Trade';
    header.appendChild(title);
    const subtitle = document.createElement('p');
    subtitle.className = 'tricks-home__subtitle';
    subtitle.textContent = 'Clever, often-overlooked ways to get clinical tasks done. Browse by specialty or search across all tricks.';
    header.appendChild(subtitle);
    page.appendChild(header);
    // ---- Search box ----
    const searchWrap = document.createElement('div');
    searchWrap.className = 'tricks-search';
    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'tricks-search__input';
    input.placeholder = 'Search all tricks (e.g. epistaxis, IV access, priapism)\u2026';
    input.setAttribute('aria-label', 'Search all tricks');
    searchWrap.appendChild(input);
    page.appendChild(searchWrap);
    // ---- Grid (default) ----
    const grid = document.createElement('div');
    grid.className = 'tricks-home__grid';
    for (const spec of TRICK_SPECIALTIES) {
        const count = getTrickList(getInfoPage(spec.infoPageId)).length;
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
        const countEl = document.createElement('div');
        countEl.className = 'trick-card__count';
        countEl.textContent = count === 1 ? '1 trick' : `${count} tricks`;
        card.appendChild(countEl);
        card.addEventListener('click', () => router.navigate(`/tricks/${spec.id}`));
        grid.appendChild(card);
    }
    page.appendChild(grid);
    // ---- Search results (hidden until typing) ----
    const results = document.createElement('div');
    results.className = 'tricks-directory';
    results.style.display = 'none';
    page.appendChild(results);
    const flat = allTricks();
    const renderResults = (q) => {
        const query = q.trim().toLowerCase();
        if (!query) {
            results.style.display = 'none';
            grid.style.display = '';
            return;
        }
        grid.style.display = 'none';
        results.style.display = '';
        results.innerHTML = '';
        const hits = flat.filter((t) => t.title.toLowerCase().includes(query) || t.blurb.toLowerCase().includes(query) || t.specialtyLabel.toLowerCase().includes(query));
        if (hits.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'tricks-directory__empty';
            empty.textContent = `No tricks match \u201C${q.trim()}\u201D.`;
            results.appendChild(empty);
            return;
        }
        for (const t of hits) {
            results.appendChild(trickRow(t.title, t.blurb, t.specialtyLabel, () => openTrick(t.infoPageId, t.anchorId)));
        }
    };
    input.addEventListener('input', () => renderResults(input.value));
    container.appendChild(page);
}
// ===================================================================
// /tricks/:specialtyId — alphabetical directory for one specialty
// ===================================================================
export function renderTricksSpecialty(container, specialtyId, anchorId) {
    container.innerHTML = '';
    const spec = getTrickSpecialty(specialtyId);
    if (!spec) {
        router.navigate('/tricks');
        return;
    }
    const page = document.createElement('div');
    page.className = 'tricks-home';
    const header = document.createElement('div');
    header.className = 'tricks-home__header';
    header.appendChild(makeBack('Back to Tricks', '/tricks'));
    const title = document.createElement('h1');
    title.className = 'tricks-home__title';
    title.textContent = `${spec.icon} ${spec.label}`;
    header.appendChild(title);
    const subtitle = document.createElement('p');
    subtitle.className = 'tricks-home__subtitle';
    subtitle.textContent = spec.subtitle;
    header.appendChild(subtitle);
    page.appendChild(header);
    const tricks = getTrickList(getInfoPage(spec.infoPageId));
    // Per-specialty search box (only useful when the list is long).
    const searchWrap = document.createElement('div');
    searchWrap.className = 'tricks-search';
    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'tricks-search__input';
    input.placeholder = `Search ${spec.label} tricks\u2026`;
    input.setAttribute('aria-label', `Search ${spec.label} tricks`);
    searchWrap.appendChild(input);
    page.appendChild(searchWrap);
    const list = document.createElement('div');
    list.className = 'tricks-directory';
    page.appendChild(list);
    const render = (q) => {
        const query = q.trim().toLowerCase();
        list.innerHTML = '';
        const hits = query
            ? tricks.filter((t) => t.title.toLowerCase().includes(query) || t.blurb.toLowerCase().includes(query))
            : tricks;
        if (hits.length === 0) {
            const empty = document.createElement('p');
            empty.className = 'tricks-directory__empty';
            empty.textContent = query ? `No ${spec.label} tricks match \u201C${q.trim()}\u201D.` : 'New tricks are being added daily \u2014 check back soon.';
            list.appendChild(empty);
            return;
        }
        for (const t of hits) {
            list.appendChild(trickRow(t.title, t.blurb, null, () => openTrick(spec.infoPageId, t.anchorId)));
        }
    };
    input.addEventListener('input', () => render(input.value));
    render('');
    container.appendChild(page);
    // Deep-link from global search: open the requested trick over the directory.
    if (anchorId) {
        openTrick(spec.infoPageId, anchorId);
    }
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
