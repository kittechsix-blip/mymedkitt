// MedKitt — Critical Actions Component
// Red 3D button + modal overlay showing 5-10 critical actions for quick reference
// Each action links directly to the relevant node in the consult tree
let modalOpen = false;
/**
 * Render the Critical Actions button next to the search icon
 */
export function renderCriticalActionsButton(container, criticalActions, controller, onJump) {
    if (!criticalActions || criticalActions.length === 0)
        return;
    const btn = document.createElement('button');
    btn.className = 'critical-actions-btn';
    btn.textContent = 'Critical Actions';
    btn.setAttribute('aria-label', 'View critical actions for this consult');
    btn.addEventListener('click', () => {
        openCriticalActionsModal(criticalActions, controller, onJump);
    });
    container.appendChild(btn);
}
/**
 * Open the Critical Actions modal overlay
 */
function openCriticalActionsModal(criticalActions, controller, onJump) {
    if (modalOpen)
        return;
    modalOpen = true;
    // Modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'critical-actions-overlay';
    // Modal content
    const modal = document.createElement('div');
    modal.className = 'critical-actions-modal';
    // Header
    const header = document.createElement('div');
    header.className = 'critical-actions-modal__header';
    const title = document.createElement('h2');
    title.textContent = 'Critical Actions';
    header.appendChild(title);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'critical-actions-modal__close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', () => {
        closeModal(overlay);
    });
    header.appendChild(closeBtn);
    modal.appendChild(header);
    // Actions list
    const list = document.createElement('ul');
    list.className = 'critical-actions-modal__list';
    criticalActions.forEach((action) => {
        const item = document.createElement('li');
        item.className = 'critical-actions-modal__item';
        const link = document.createElement('button');
        link.className = 'critical-actions-modal__link';
        link.textContent = action.text;
        link.addEventListener('click', () => {
            controller.jumpToNode(action.nodeId);
            onJump();
            closeModal(overlay);
            // Scroll to the active card after jump
            requestAnimationFrame(() => {
                const activeCard = document.querySelector('.decision-card--active');
                if (activeCard) {
                    activeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
        item.appendChild(link);
        list.appendChild(item);
    });
    modal.appendChild(list);
    overlay.appendChild(modal);
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal(overlay);
        }
    });
    // Close on Escape key
    const escListener = (e) => {
        if (e.key === 'Escape') {
            closeModal(overlay);
            document.removeEventListener('keydown', escListener);
        }
    };
    document.addEventListener('keydown', escListener);
    document.body.appendChild(overlay);
    // Trigger CSS transition
    requestAnimationFrame(() => {
        overlay.classList.add('critical-actions-overlay--open');
    });
}
/**
 * Close the modal
 */
function closeModal(overlay) {
    overlay.classList.remove('critical-actions-overlay--open');
    // Wait for transition to finish
    overlay.addEventListener('transitionend', () => {
        overlay.remove();
        modalOpen = false;
    }, { once: true });
}
