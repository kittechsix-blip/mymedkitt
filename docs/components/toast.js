// Small reusable toast. Visual style is the existing `.share-toast` pill; `.app-toast`
// adds the optional action button and bottom-bar-safe positioning (see style.css).
// Existing ad-hoc `share-toast` call sites are intentionally left as they are.
export function showToast(message, opts = {}) {
    const { actionLabel, onAction, durationMs = 2500 } = opts;
    const toast = document.createElement('div');
    toast.className = 'share-toast app-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    const text = document.createElement('span');
    text.className = 'app-toast__text';
    text.textContent = message;
    toast.appendChild(text);
    let timer;
    const dismiss = () => {
        if (timer !== undefined)
            window.clearTimeout(timer);
        toast.remove();
    };
    if (actionLabel) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'app-toast__action';
        btn.textContent = actionLabel;
        btn.addEventListener('click', () => {
            try {
                onAction?.();
            }
            finally {
                dismiss();
            }
        });
        toast.appendChild(btn);
    }
    document.body.appendChild(toast);
    if (durationMs > 0)
        timer = window.setTimeout(dismiss, durationMs);
    return { dismiss };
}
