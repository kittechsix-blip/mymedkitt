// myMedKitt — Critical Actions
// Bright red 3D glass button at the top of each consult. Tap opens a modal
// listing the 5-10 "must-know NOW" actions for ED physicians. Each action
// jumps directly to the relevant node in the decision tree.
/** Create the red 3D glass Critical Actions button. */
export function createCriticalActionsButton(opts) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'critical-actions-btn';
    btn.setAttribute('aria-label', 'Show critical actions for this consult');
    const icon = document.createElement('span');
    icon.className = 'critical-actions-btn__icon';
    icon.textContent = '\u26A0';
    icon.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'critical-actions-btn__label';
    label.textContent = 'Critical';
    btn.appendChild(icon);
    btn.appendChild(label);
    btn.addEventListener('click', () => openCriticalActionsModal(opts));
    return btn;
}
/** Render the Critical Actions modal. */
function openCriticalActionsModal(opts) {
    closeCriticalActionsModal();
    const overlay = document.createElement('div');
    overlay.className = 'critical-actions-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Critical Actions');
    const panel = document.createElement('div');
    panel.className = 'critical-actions-panel';
    const header = document.createElement('div');
    header.className = 'critical-actions-panel__header';
    const titleWrap = document.createElement('div');
    titleWrap.className = 'critical-actions-panel__title-wrap';
    const title = document.createElement('h2');
    title.className = 'critical-actions-panel__title';
    title.textContent = 'Critical Actions';
    const subtitle = document.createElement('div');
    subtitle.className = 'critical-actions-panel__subtitle';
    subtitle.textContent = opts.consultTitle;
    titleWrap.appendChild(title);
    titleWrap.appendChild(subtitle);
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'critical-actions-panel__close';
    closeBtn.setAttribute('aria-label', 'Close critical actions');
    closeBtn.textContent = '\u2715';
    closeBtn.addEventListener('click', closeCriticalActionsModal);
    header.appendChild(titleWrap);
    header.appendChild(closeBtn);
    const list = document.createElement('ol');
    list.className = 'critical-actions-panel__list';
    opts.actions.forEach((action, i) => {
        const item = document.createElement('li');
        item.className = 'critical-actions-panel__item';
        const itemBtn = document.createElement('button');
        itemBtn.type = 'button';
        itemBtn.className = 'critical-actions-panel__item-btn';
        const num = document.createElement('span');
        num.className = 'critical-actions-panel__item-num';
        num.textContent = String(i + 1);
        const text = document.createElement('span');
        text.className = 'critical-actions-panel__item-text';
        text.textContent = action.text;
        const chev = document.createElement('span');
        chev.className = 'critical-actions-panel__item-chev';
        chev.textContent = '\u203A';
        chev.setAttribute('aria-hidden', 'true');
        itemBtn.appendChild(num);
        itemBtn.appendChild(text);
        itemBtn.appendChild(chev);
        itemBtn.addEventListener('click', () => {
            closeCriticalActionsModal();
            opts.onJumpToNode(action.nodeId);
        });
        item.appendChild(itemBtn);
        list.appendChild(item);
    });
    panel.appendChild(header);
    panel.appendChild(list);
    overlay.appendChild(panel);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay)
            closeCriticalActionsModal();
    });
    const escHandler = (e) => {
        if (e.key === 'Escape')
            closeCriticalActionsModal();
    };
    document.addEventListener('keydown', escHandler);
    overlay.dataset.escHandler = 'attached';
    overlay.__escHandler = escHandler;
    document.body.appendChild(overlay);
    document.body.classList.add('critical-actions-open');
}
function closeCriticalActionsModal() {
    const existing = document.querySelector('.critical-actions-overlay');
    if (!existing)
        return;
    if (existing.__escHandler) {
        document.removeEventListener('keydown', existing.__escHandler);
    }
    existing.remove();
    document.body.classList.remove('critical-actions-open');
}
