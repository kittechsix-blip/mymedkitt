// myMedKitt — Overlay Panel
// Sliding pearl white panel from bottom. Singleton — only one at a time.
// Used for info pages, calculators, and dense reference content.

let currentBackdrop: HTMLElement | null = null;
let currentPanel: HTMLElement | null = null;

/** Hide the current overlay panel */
export function hideOverlayPanel(): void {
  currentBackdrop?.remove();
  currentPanel?.remove();
  currentBackdrop = null;
  currentPanel = null;
}

/** Show an overlay panel with the given content.
 *  Returns the body container for appending content. */
export function showOverlayPanel(title?: string): HTMLElement {
  hideOverlayPanel();

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'overlay-panel-backdrop';
  backdrop.addEventListener('click', hideOverlayPanel);
  document.body.appendChild(backdrop);
  currentBackdrop = backdrop;

  // Panel
  const panel = document.createElement('div');
  panel.className = 'overlay-panel';

  // Header
  if (title) {
    const header = document.createElement('div');
    header.className = 'overlay-panel__header';

    const titleEl = document.createElement('h3');
    titleEl.className = 'overlay-panel__title';
    titleEl.textContent = title;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'overlay-panel__close';
    closeBtn.textContent = '\u2715';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', hideOverlayPanel);

    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    panel.appendChild(header);
  }

  // Body
  const body = document.createElement('div');
  body.className = 'overlay-panel__body';
  panel.appendChild(body);

  document.body.appendChild(panel);
  currentPanel = panel;

  return body;
}

/** Check if an overlay is currently showing */
export function isOverlayVisible(): boolean {
  return currentPanel !== null;
}
