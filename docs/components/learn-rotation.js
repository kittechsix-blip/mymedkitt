// myMedKitt — MedKitt Learn rotation page
// Shows the 4 learner sections + Pre-Round and Shelf High-Yield tiles.
import { getRotation, getCardsForSection } from '../services/learn-service.js';
import { router } from '../services/router.js';
import { getCategoryColors } from '../services/category-service.js';
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
    // 4 sections of student cards
    for (const section of rotation.sections) {
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
        const cards = getCardsForSection(rotationId, section.id);
        const list = document.createElement('div');
        list.className = 'learn-section__cards';
        for (const card of cards) {
            const cardBtn = document.createElement('button');
            cardBtn.className = 'learn-card-link';
            cardBtn.type = 'button';
            const cardTitle = document.createElement('div');
            cardTitle.className = 'learn-card-link__title';
            cardTitle.textContent = card.title;
            cardBtn.appendChild(cardTitle);
            const cardTrigger = document.createElement('div');
            cardTrigger.className = 'learn-card-link__trigger';
            cardTrigger.textContent = card.trigger;
            cardBtn.appendChild(cardTrigger);
            cardBtn.addEventListener('click', () => {
                router.navigate(`/learn/${rotationId}/card/${card.id}`);
            });
            list.appendChild(cardBtn);
        }
        sectionEl.appendChild(list);
        page.appendChild(sectionEl);
    }
    container.appendChild(page);
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
