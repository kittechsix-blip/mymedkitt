/**
 * Spotlight Search — Global Command Palette
 * Triggered by Cmd+K (Mac) / Ctrl+K (Win) or tapping dashboard header
 * Inspired by Linear, Raycast, Arc
 */
import { search, buildSearchIndex } from '../services/search-service.js';
import { router } from '../services/router.js';
import { showDrugModal } from './drug-store.js';
// ===================================================================
// State
// ===================================================================
let spotlightOverlay = null;
let spotlightInput = null;
let spotlightResults = null;
let selectedIndex = -1;
let currentResults = [];
let isOpen = false;
// ===================================================================
// Type Icons
// ===================================================================
const TYPE_ICONS = {
    category: '📁',
    consult: '🏥',
    drug: '💊',
    calculator: '🧮',
};
const TYPE_LABELS = {
    category: 'Categories',
    consult: 'Consults',
    drug: 'Drugs',
    calculator: 'Calculators',
};
// ===================================================================
// Open / Close
// ===================================================================
export function openSpotlight() {
    if (isOpen)
        return;
    isOpen = true;
    // Ensure search index is built
    buildSearchIndex();
    // Create overlay
    spotlightOverlay = document.createElement('div');
    spotlightOverlay.className = 'spotlight-overlay';
    spotlightOverlay.setAttribute('role', 'dialog');
    spotlightOverlay.setAttribute('aria-modal', 'true');
    spotlightOverlay.setAttribute('aria-label', 'Search');
    // Backdrop (click to close)
    const backdrop = document.createElement('div');
    backdrop.className = 'spotlight-backdrop';
    backdrop.addEventListener('click', closeSpotlight);
    spotlightOverlay.appendChild(backdrop);
    // Modal container
    const modal = document.createElement('div');
    modal.className = 'spotlight-modal';
    // Search input container
    const inputContainer = document.createElement('div');
    inputContainer.className = 'spotlight-input-container';
    const searchIcon = document.createElement('span');
    searchIcon.className = 'spotlight-search-icon';
    searchIcon.textContent = '🔍';
    spotlightInput = document.createElement('input');
    spotlightInput.className = 'spotlight-input';
    spotlightInput.type = 'text';
    spotlightInput.placeholder = 'Search consults, drugs, calculators...';
    spotlightInput.setAttribute('aria-label', 'Search');
    spotlightInput.setAttribute('autocomplete', 'off');
    spotlightInput.setAttribute('autocapitalize', 'off');
    spotlightInput.setAttribute('spellcheck', 'false');
    const shortcutHint = document.createElement('span');
    shortcutHint.className = 'spotlight-shortcut';
    shortcutHint.textContent = 'esc';
    inputContainer.appendChild(searchIcon);
    inputContainer.appendChild(spotlightInput);
    inputContainer.appendChild(shortcutHint);
    modal.appendChild(inputContainer);
    // Results container
    spotlightResults = document.createElement('div');
    spotlightResults.className = 'spotlight-results';
    spotlightResults.setAttribute('role', 'listbox');
    modal.appendChild(spotlightResults);
    spotlightOverlay.appendChild(modal);
    document.body.appendChild(spotlightOverlay);
    // Focus input
    requestAnimationFrame(() => {
        spotlightInput?.focus();
    });
    // Event listeners
    spotlightInput.addEventListener('input', handleInput);
    spotlightInput.addEventListener('keydown', handleKeydown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    // Animate in
    requestAnimationFrame(() => {
        spotlightOverlay?.classList.add('spotlight-overlay--open');
    });
}
export function closeSpotlight() {
    if (!isOpen || !spotlightOverlay)
        return;
    isOpen = false;
    // Animate out
    spotlightOverlay.classList.remove('spotlight-overlay--open');
    // Remove after animation
    setTimeout(() => {
        spotlightOverlay?.remove();
        spotlightOverlay = null;
        spotlightInput = null;
        spotlightResults = null;
        selectedIndex = -1;
        currentResults = [];
        document.body.style.overflow = '';
    }, 150);
}
export function isSpotlightOpen() {
    return isOpen;
}
// ===================================================================
// Input Handling
// ===================================================================
function handleInput() {
    if (!spotlightInput || !spotlightResults)
        return;
    const query = spotlightInput.value.trim();
    selectedIndex = -1;
    if (query.length === 0) {
        spotlightResults.innerHTML = '';
        spotlightResults.classList.remove('spotlight-results--has-results');
        currentResults = [];
        return;
    }
    currentResults = search(query);
    renderResults();
}
function handleKeydown(e) {
    switch (e.key) {
        case 'Escape':
            e.preventDefault();
            closeSpotlight();
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (currentResults.length > 0) {
                selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
                updateSelection();
            }
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (currentResults.length > 0) {
                selectedIndex = Math.max(selectedIndex - 1, 0);
                updateSelection();
            }
            break;
        case 'Enter':
            e.preventDefault();
            if (selectedIndex >= 0 && currentResults[selectedIndex]) {
                selectResult(currentResults[selectedIndex]);
            }
            else if (currentResults.length > 0) {
                selectResult(currentResults[0]);
            }
            break;
    }
}
// ===================================================================
// Results Rendering
// ===================================================================
function renderResults() {
    if (!spotlightResults)
        return;
    spotlightResults.innerHTML = '';
    if (currentResults.length === 0) {
        spotlightResults.classList.remove('spotlight-results--has-results');
        const empty = document.createElement('div');
        empty.className = 'spotlight-empty';
        empty.textContent = 'No results found';
        spotlightResults.appendChild(empty);
        return;
    }
    spotlightResults.classList.add('spotlight-results--has-results');
    // Group results by type
    const grouped = {};
    for (const result of currentResults) {
        if (!grouped[result.type])
            grouped[result.type] = [];
        grouped[result.type].push(result);
    }
    let flatIndex = 0;
    for (const type of ['consult', 'drug', 'calculator', 'category']) {
        const group = grouped[type];
        if (!group?.length)
            continue;
        // Group header
        const header = document.createElement('div');
        header.className = 'spotlight-group-header';
        header.textContent = TYPE_LABELS[type];
        spotlightResults.appendChild(header);
        // Group items
        for (const result of group) {
            const item = document.createElement('div');
            item.className = 'spotlight-result-item';
            item.setAttribute('role', 'option');
            item.dataset.index = String(flatIndex);
            const icon = document.createElement('span');
            icon.className = 'spotlight-result-icon';
            icon.textContent = TYPE_ICONS[result.type];
            const content = document.createElement('div');
            content.className = 'spotlight-result-content';
            const label = document.createElement('span');
            label.className = 'spotlight-result-label';
            label.textContent = result.label;
            const sublabel = document.createElement('span');
            sublabel.className = 'spotlight-result-sublabel';
            sublabel.textContent = result.sublabel;
            content.appendChild(label);
            content.appendChild(sublabel);
            item.appendChild(icon);
            item.appendChild(content);
            // Click handler
            item.addEventListener('click', () => selectResult(result));
            // Hover to select
            item.addEventListener('mouseenter', () => {
                selectedIndex = flatIndex;
                updateSelection();
            });
            spotlightResults.appendChild(item);
            flatIndex++;
        }
    }
}
function updateSelection() {
    if (!spotlightResults)
        return;
    const items = spotlightResults.querySelectorAll('.spotlight-result-item');
    items.forEach((item, i) => {
        if (i === selectedIndex) {
            item.classList.add('spotlight-result-item--selected');
            item.scrollIntoView({ block: 'nearest' });
        }
        else {
            item.classList.remove('spotlight-result-item--selected');
        }
    });
}
function selectResult(result) {
    closeSpotlight();
    if (result.drugId) {
        showDrugModal(result.drugId);
    }
    else {
        router.navigate(result.route);
    }
}
// ===================================================================
// Global Keyboard Shortcut
// ===================================================================
export function initSpotlightShortcut() {
    document.addEventListener('keydown', (e) => {
        // Cmd+K (Mac) or Ctrl+K (Windows)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            if (isOpen) {
                closeSpotlight();
            }
            else {
                openSpotlight();
            }
        }
    });
}
