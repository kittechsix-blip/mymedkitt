/**
 * Quick Fire Mode — Expert toggle for rapid navigation
 * When enabled, answered cards collapse into minimal pills showing just
 * the selected answer. Experts can fly through decisions without scrolling.
 */
const STORAGE_KEY = 'medkitt-quick-fire-mode';
/** Check if quick fire mode is enabled */
export function isQuickFireMode() {
    return localStorage.getItem(STORAGE_KEY) === 'true';
}
/** Toggle quick fire mode */
export function toggleQuickFireMode() {
    const newValue = !isQuickFireMode();
    localStorage.setItem(STORAGE_KEY, String(newValue));
    document.body.classList.toggle('quick-fire-mode', newValue);
    return newValue;
}
/** Set quick fire mode explicitly */
export function setQuickFireMode(enabled) {
    localStorage.setItem(STORAGE_KEY, String(enabled));
    document.body.classList.toggle('quick-fire-mode', enabled);
}
/** Initialize quick fire mode on page load */
export function initQuickFireMode() {
    if (isQuickFireMode()) {
        document.body.classList.add('quick-fire-mode');
    }
}
/** Render the quick fire toggle button in the header */
export function renderQuickFireToggle() {
    const btn = document.createElement('button');
    btn.className = 'quick-fire-toggle';
    btn.setAttribute('aria-label', 'Toggle Quick Fire Mode');
    btn.setAttribute('title', 'Quick Fire Mode (Expert)');
    const updateButton = () => {
        const enabled = isQuickFireMode();
        btn.innerHTML = '&#x26A1;';
        btn.classList.toggle('quick-fire-toggle--active', enabled);
    };
    updateButton();
    btn.addEventListener('click', () => {
        toggleQuickFireMode();
        updateButton();
        // Dispatch event so consult-flow can re-render
        window.dispatchEvent(new CustomEvent('medkitt-quick-fire-toggle'));
    });
    return btn;
}
