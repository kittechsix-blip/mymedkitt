// myMedKitt — MedKitt Learn rotation page
// Action mode (default): 4 sections of survival cards.
// Domain mode: same cards regrouped under ADMSEP domains, plus Drills row +
// Texas module row + Pharmacology + Conditions automatically picked up by
// pillar/domain filters.
import { getRotation, getCardsForSection, getCardsForDomain, getCompletionStats, getLearnMode, setLearnMode, isCardReviewed, getDrillBestScore, ADMSEP_DOMAINS, } from '../services/learn-service.js';
import { router } from '../services/router.js';
import { getCategoryColors } from '../services/category-service.js';
import { showInfoModal } from './info-page.js';
export function renderLearnRotation(container, rotationId) {
    container.innerHTML = '';
    const rotation = getRotation(rotationId);
    if (!rotation) {
        renderNotFound(container, rotationId);
        return;
    }
    const page = document.createElement('div');
    page.className = 'learn-rotation';
    // Header (specialty-colored)
    const colors = getCategoryColors();
    const colorEntry = colors[rotation.categoryId];
    const accent = colorEntry?.card ?? '#6A1B9A';
    const header = document.createElement('div');
    header.className = 'learn-rotation__header';
    header.style.borderLeftColor = accent;
    const back = document.createElement('button');
    back.className = 'learn-back-btn';
    back.type = 'button';
    back.textContent = '← Learn';
    back.addEventListener('click', () => router.navigate('/learn'));
    header.appendChild(back);
    const title = document.createElement('h1');
    title.className = 'learn-rotation__title';
    title.textContent = rotation.name;
    header.appendChild(title);
    const sub = document.createElement('p');
    sub.className = 'learn-rotation__subtitle';
    sub.textContent = rotation.subtitle;
    header.appendChild(sub);
    page.appendChild(header);
    // ADMSEP coverage bar
    page.appendChild(renderCoverageBar(rotationId, accent));
    // Mode toggle
    const currentMode = getLearnMode();
    page.appendChild(renderModeToggle(currentMode, (m) => {
        setLearnMode(m);
        renderLearnRotation(container, rotationId);
    }));
    // Tools row: Pre-Round + Shelf High-Yield
    const tools = document.createElement('div');
    tools.className = 'learn-rotation__tools';
    const preRoundTile = createToolTile('🗒️', rotation.preRoundTitle, 'AM checklist for psych pre-rounding', () => {
        router.navigate(`/learn/${rotationId}/pre-round`);
    });
    tools.appendChild(preRoundTile);
    const shelfTile = createToolTile('📚', rotation.shelfTitle, 'NBME-flavored mnemonics, tables, drug list', () => {
        router.navigate(`/learn/${rotationId}/shelf`);
    });
    tools.appendChild(shelfTile);
    page.appendChild(tools);
    // Mode-specific body
    if (currentMode === 'action') {
        renderActionMode(page, rotationId);
    }
    else {
        renderDomainMode(page, rotationId);
    }
    container.appendChild(page);
}
// ===================================================================
// Action mode — original 4 sections, survival cards only
// ===================================================================
function renderActionMode(page, rotationId) {
    const rotation = getRotation(rotationId);
    if (!rotation)
        return;
    for (const section of rotation.sections) {
        const cards = getCardsForSection(rotationId, section.id);
        if (cards.length === 0)
            continue;
        const sectionEl = document.createElement('div');
        sectionEl.className = 'learn-section';
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'learn-section__title';
        sectionTitle.textContent = section.title;
        sectionEl.appendChild(sectionTitle);
        const blurb = document.createElement('p');
        blurb.className = 'learn-section__blurb';
        blurb.textContent = section.blurb;
        sectionEl.appendChild(blurb);
        const list = document.createElement('div');
        list.className = 'learn-section__cards';
        for (const card of cards)
            list.appendChild(renderCardLink(rotationId, card));
        sectionEl.appendChild(list);
        page.appendChild(sectionEl);
    }
}
// ===================================================================
// Domain mode — survival + condition + pharmacology cards under ADMSEP
// domains. Plus dedicated rows for OSCE drills and the Texas module.
// ===================================================================
function renderDomainMode(page, rotationId) {
    const rotation = getRotation(rotationId);
    if (!rotation)
        return;
    // Drills row at top — flagship feature, surface it first.
    if (rotation.drills && rotation.drills.length > 0) {
        const drillSection = document.createElement('div');
        drillSection.className = 'learn-section learn-section--drills';
        const t = document.createElement('h2');
        t.className = 'learn-section__title';
        t.textContent = '🩺 OSCE Drills';
        drillSection.appendChild(t);
        const blurb = document.createElement('p');
        blurb.className = 'learn-section__blurb';
        blurb.textContent = 'Interactive bedside skill drills — practice the calls you will be tested on.';
        drillSection.appendChild(blurb);
        const list = document.createElement('div');
        list.className = 'learn-section__cards';
        for (const drill of rotation.drills) {
            const btn = document.createElement('button');
            btn.className = 'learn-card-link learn-card-link--drill';
            btn.type = 'button';
            const drillTitle = document.createElement('div');
            drillTitle.className = 'learn-card-link__title';
            drillTitle.textContent = drill.title;
            btn.appendChild(drillTitle);
            const drillSub = document.createElement('div');
            drillSub.className = 'learn-card-link__trigger';
            drillSub.textContent = `${drill.estMinutes} min · ${drill.scenario.slice(0, 80)}${drill.scenario.length > 80 ? '…' : ''}`;
            btn.appendChild(drillSub);
            const best = getDrillBestScore(drill.id);
            if (best !== null) {
                const badge = document.createElement('div');
                badge.className = 'learn-drill-badge';
                const totalPoints = drill.scoringRubric.reduce((s, r) => s + r.points, 0);
                badge.textContent = `Best: ${best}/${totalPoints}`;
                btn.appendChild(badge);
            }
            btn.addEventListener('click', () => {
                router.navigate(`/learn/${rotationId}/drill/${drill.id}`);
            });
            list.appendChild(btn);
        }
        drillSection.appendChild(list);
        page.appendChild(drillSection);
    }
    // Texas module row
    if (rotation.texasModule) {
        const txSection = document.createElement('div');
        txSection.className = 'learn-section learn-section--texas';
        const t = document.createElement('h2');
        t.className = 'learn-section__title';
        t.textContent = '⭐ Texas-Specific';
        txSection.appendChild(t);
        const list = document.createElement('div');
        list.className = 'learn-section__cards';
        const btn = document.createElement('button');
        btn.className = 'learn-card-link learn-card-link--texas';
        btn.type = 'button';
        const tt = document.createElement('div');
        tt.className = 'learn-card-link__title';
        tt.textContent = rotation.texasModule.title;
        btn.appendChild(tt);
        const sub = document.createElement('div');
        sub.className = 'learn-card-link__trigger';
        sub.textContent = rotation.texasModule.subtitle ?? 'Chapter 573/574, Tarasoff in TX, capacity vs commitment';
        btn.appendChild(sub);
        btn.addEventListener('click', () => {
            showInfoModal(rotation.texasModule.infoPageId);
        });
        list.appendChild(btn);
        txSection.appendChild(list);
        page.appendChild(txSection);
    }
    // Domain rows
    for (const dom of ADMSEP_DOMAINS) {
        const cards = getCardsForDomain(rotationId, dom.id);
        if (cards.length === 0)
            continue;
        // Sort cards by tier (1 first), then alphabetically
        const sorted = [...cards].sort((a, b) => {
            if (a.tier !== b.tier)
                return a.tier - b.tier;
            return a.title.localeCompare(b.title);
        });
        const sectionEl = document.createElement('div');
        sectionEl.className = 'learn-section';
        const sectionTitle = document.createElement('h2');
        sectionTitle.className = 'learn-section__title';
        sectionTitle.textContent = dom.label;
        sectionEl.appendChild(sectionTitle);
        const list = document.createElement('div');
        list.className = 'learn-section__cards';
        for (const card of sorted)
            list.appendChild(renderCardLink(rotationId, card));
        sectionEl.appendChild(list);
        page.appendChild(sectionEl);
    }
}
// ===================================================================
// Shared helpers
// ===================================================================
function renderCardLink(rotationId, card) {
    const cardBtn = document.createElement('button');
    cardBtn.className = 'learn-card-link';
    if (card.pillar === 'pharmacology')
        cardBtn.classList.add('learn-card-link--pharm');
    if (card.pillar === 'condition')
        cardBtn.classList.add('learn-card-link--condition');
    cardBtn.type = 'button';
    const titleRow = document.createElement('div');
    titleRow.className = 'learn-card-link__title-row';
    const cardTitle = document.createElement('div');
    cardTitle.className = 'learn-card-link__title';
    cardTitle.textContent = card.title;
    titleRow.appendChild(cardTitle);
    if (isCardReviewed(card.id)) {
        const check = document.createElement('span');
        check.className = 'learn-card-link__check';
        check.textContent = '✓';
        check.setAttribute('aria-label', 'Reviewed');
        titleRow.appendChild(check);
    }
    cardBtn.appendChild(titleRow);
    const cardTrigger = document.createElement('div');
    cardTrigger.className = 'learn-card-link__trigger';
    cardTrigger.textContent = card.trigger;
    cardBtn.appendChild(cardTrigger);
    cardBtn.addEventListener('click', () => {
        router.navigate(`/learn/${rotationId}/card/${card.id}`);
    });
    return cardBtn;
}
function renderModeToggle(current, onChange) {
    const wrap = document.createElement('div');
    wrap.className = 'learn-mode-toggle';
    wrap.setAttribute('role', 'tablist');
    wrap.setAttribute('aria-label', 'Browse mode');
    const make = (mode, label, desc) => {
        const btn = document.createElement('button');
        btn.className = 'learn-mode-toggle__pill';
        btn.type = 'button';
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', current === mode ? 'true' : 'false');
        if (current === mode)
            btn.classList.add('selected');
        btn.title = desc;
        const t = document.createElement('span');
        t.className = 'learn-mode-toggle__label';
        t.textContent = label;
        btn.appendChild(t);
        const s = document.createElement('span');
        s.className = 'learn-mode-toggle__desc';
        s.textContent = desc;
        btn.appendChild(s);
        btn.addEventListener('click', () => {
            if (current !== mode)
                onChange(mode);
        });
        return btn;
    };
    wrap.appendChild(make('action', 'Action', 'Bedside survival'));
    wrap.appendChild(make('domain', 'Domain', 'ADMSEP framework'));
    return wrap;
}
function renderCoverageBar(rotationId, accent) {
    const stats = getCompletionStats(rotationId);
    const wrap = document.createElement('div');
    wrap.className = 'learn-coverage';
    const label = document.createElement('div');
    label.className = 'learn-coverage__label';
    const pct = stats.total === 0 ? 0 : Math.round((stats.reviewed / stats.total) * 100);
    label.textContent = `ADMSEP coverage · ${stats.reviewed} of ${stats.total} cards reviewed (${pct}%)`;
    wrap.appendChild(label);
    const bar = document.createElement('div');
    bar.className = 'learn-coverage__bar';
    const fill = document.createElement('div');
    fill.className = 'learn-coverage__fill';
    fill.style.width = `${pct}%`;
    fill.style.backgroundColor = accent;
    bar.appendChild(fill);
    wrap.appendChild(bar);
    return wrap;
}
function createToolTile(icon, title, subtitle, onClick) {
    const btn = document.createElement('button');
    btn.className = 'learn-tool-tile';
    btn.type = 'button';
    const iconEl = document.createElement('div');
    iconEl.className = 'learn-tool-tile__icon';
    iconEl.textContent = icon;
    btn.appendChild(iconEl);
    const titleEl = document.createElement('div');
    titleEl.className = 'learn-tool-tile__title';
    titleEl.textContent = title;
    btn.appendChild(titleEl);
    const subEl = document.createElement('div');
    subEl.className = 'learn-tool-tile__sub';
    subEl.textContent = subtitle;
    btn.appendChild(subEl);
    btn.addEventListener('click', onClick);
    return btn;
}
function renderNotFound(container, rotationId) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const t = document.createElement('h3');
    t.textContent = 'Rotation not found';
    const s = document.createElement('p');
    s.textContent = `No rotation registered for "${rotationId}".`;
    empty.appendChild(t);
    empty.appendChild(s);
    container.appendChild(empty);
}
