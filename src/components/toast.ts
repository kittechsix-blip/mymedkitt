// Small reusable toast. Visual style is the existing `.share-toast` pill; `.app-toast`
// adds the optional action button and bottom-bar-safe positioning (see style.css).
// Existing ad-hoc `share-toast` call sites are intentionally left as they are.

export interface ToastOptions {
  /** Label of the action button. Omit for a plain message toast. */
  actionLabel?: string;
  /** Called when the action button is tapped. */
  onAction?: () => void;
  /** Auto-dismiss delay in ms. 0 = stay until dismissed. Default 2500. */
  durationMs?: number;
}

export interface ToastHandle {
  dismiss(): void;
}

export function showToast(message: string, opts: ToastOptions = {}): ToastHandle {
  const { actionLabel, onAction, durationMs = 2500 } = opts;

  const toast = document.createElement('div');
  toast.className = 'share-toast app-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  const text = document.createElement('span');
  text.className = 'app-toast__text';
  text.textContent = message;
  toast.appendChild(text);

  let timer: number | undefined;
  const dismiss = (): void => {
    if (timer !== undefined) window.clearTimeout(timer);
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
      } finally {
        dismiss();
      }
    });
    toast.appendChild(btn);
  }

  document.body.appendChild(toast);
  if (durationMs > 0) timer = window.setTimeout(dismiss, durationMs);
  return { dismiss };
}
