// myMedKitt — MedKitt Learn student card
// Renders the 7-field Student Card and links to the underlying consult tree.
import { getCard, getRotation } from '../services/learn-service.js';
import { router } from '../services/router.js';
import { appendBoldAware } from './text-renderer.js';
export function renderLearnCard(container, rotationId, cardId) {
    container.innerHTML = '';
    const card = getCard(cardId);
    if (!card) {
        renderNotFound(container, cardId);
        return;
    }
    const rotation = getRotation(rotationId);
    const page = document.createElement('div');
    page.className = 'learn-card-page';
    // Header
    const header = document.createElement('div');
    header.className = 'learn-card__header';
    const back = document.createElement('button');
    back.className = 'learn-back-btn';
    back.type = 'button';
    back.textContent = `← ${rotation?.name ?? 'Back'}`;
    back.addEventListener('click', () => router.navigate(`/learn/${rotationId}`));
    header.appendChild(back);
    const title = document.createElement('h1');
    title.className = 'learn-card__title';
    title.textContent = card.title;
    header.appendChild(title);
    page.appendChild(header);
    // Field 1: Use this when (trigger)
    page.appendChild(renderField('Use this when', card.trigger, 'trigger'));
    // Field 2: Ask these 3 things
    page.appendChild(renderListField('Ask these 3 things', card.askThree, 'ask'));
    // Field 3: In one breath, this is
    page.appendChild(renderField('In one breath, this is', card.oneBreathReframe, 'reframe'));
    // Field 4: Say this on rounds
    page.appendChild(renderRichField('Say this on rounds', card.sayOnRounds, 'rounds'));
    // Field 5: Do not miss
    page.appendChild(renderListField('Do not miss', card.doNotMiss, 'donotmiss', true));
    // Field 6: They might pimp you on (tap-to-reveal)
    page.appendChild(renderPimpField('They might pimp you on', card.pimpPrep));
    // Field 7: Shelf high-yield
    page.appendChild(renderListField('Shelf high-yield', card.shelfHighYield, 'shelf'));
    // Open Consult button
    const cta = document.createElement('div');
    cta.className = 'learn-card__cta';
    const openBtn = document.createElement('button');
    openBtn.className = 'learn-open-consult-btn';
    openBtn.type = 'button';
    openBtn.textContent = `Open Consult → ${card.title}`;
    openBtn.addEventListener('click', () => {
        router.navigate(`/tree/${card.linkedTreeId}`);
    });
    cta.appendChild(openBtn);
    const ctaHint = document.createElement('div');
    ctaHint.className = 'learn-card__cta-hint';
    ctaHint.textContent = 'Opens the full clinician decision tree. Browser back returns here.';
    cta.appendChild(ctaHint);
    page.appendChild(cta);
    container.appendChild(page);
}
function renderField(label, body, modifier) {
    const wrap = document.createElement('section');
    wrap.className = `learn-field learn-field--${modifier}`;
    const labelEl = document.createElement('div');
    labelEl.className = 'learn-field__label';
    labelEl.textContent = label;
    wrap.appendChild(labelEl);
    const bodyEl = document.createElement('div');
    bodyEl.className = 'learn-field__body';
    appendBoldAware(bodyEl, body);
    wrap.appendChild(bodyEl);
    return wrap;
}
function renderRichField(label, body, modifier) {
    const wrap = document.createElement('section');
    wrap.className = `learn-field learn-field--${modifier}`;
    const labelEl = document.createElement('div');
    labelEl.className = 'learn-field__label';
    labelEl.textContent = label;
    wrap.appendChild(labelEl);
    const bodyEl = document.createElement('div');
    bodyEl.className = 'learn-field__body learn-field__body--rich';
    appendBoldAware(bodyEl, body);
    wrap.appendChild(bodyEl);
    return wrap;
}
function renderListField(label, items, modifier, danger = false) {
    const wrap = document.createElement('section');
    wrap.className = `learn-field learn-field--${modifier}${danger ? ' learn-field--danger' : ''}`;
    const labelEl = document.createElement('div');
    labelEl.className = 'learn-field__label';
    labelEl.textContent = label;
    wrap.appendChild(labelEl);
    const ul = document.createElement('ul');
    ul.className = 'learn-field__list';
    for (const item of items) {
        const li = document.createElement('li');
        appendBoldAware(li, item);
        ul.appendChild(li);
    }
    wrap.appendChild(ul);
    return wrap;
}
function renderPimpField(label, items) {
    const wrap = document.createElement('section');
    wrap.className = 'learn-field learn-field--pimp';
    const labelEl = document.createElement('div');
    labelEl.className = 'learn-field__label';
    labelEl.textContent = label;
    wrap.appendChild(labelEl);
    for (const item of items) {
        const details = document.createElement('details');
        details.className = 'learn-pimp-toggle';
        const summary = document.createElement('summary');
        summary.className = 'learn-pimp-toggle__q';
        const tag = document.createElement('span');
        tag.className = `learn-pimp-tag learn-pimp-tag--${item.tag}`;
        tag.textContent = item.tag.replace('-', ' ');
        summary.appendChild(tag);
        const qText = document.createElement('span');
        qText.className = 'learn-pimp-toggle__qtext';
        qText.textContent = item.question;
        summary.appendChild(qText);
        details.appendChild(summary);
        const answer = document.createElement('div');
        answer.className = 'learn-pimp-toggle__a';
        appendBoldAware(answer, item.answer);
        details.appendChild(answer);
        wrap.appendChild(details);
    }
    return wrap;
}
function renderNotFound(container, cardId) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    const t = document.createElement('h3');
    t.textContent = 'Card not found';
    const s = document.createElement('p');
    s.textContent = `No student card registered for "${cardId}".`;
    empty.appendChild(t);
    empty.appendChild(s);
    container.appendChild(empty);
}
