// myMedKitt — MSE Dictation Summary Modal
// Auto-opens when the user finishes the Build Dictation flow on the
// Psychiatric Assessment consult. Shows a clinician-readable prose summary
// of the selected MSE descriptors, with Copy + Share + Close actions.
import { buildMseDictation, MSE_BUILDER_DOMAINS } from '../services/mse-dictation.js';
let overlayEl = null;
function destroyOverlay() {
    overlayEl?.remove();
    overlayEl = null;
}
function showCopiedToast(message) {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
async function copyDictation(text) {
    try {
        await navigator.clipboard.writeText(text);
        showCopiedToast('Copied to clipboard');
    }
    catch {
        prompt('Copy this text:', text);
    }
}
async function shareDictation(text) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'MSE Dictation Summary',
                text,
            });
        }
        catch {
            // user cancelled — no-op
        }
        return;
    }
    await copyDictation(text);
}
/**
 * Render the dictation text into a stack of per-domain rows (bold label + prose).
 * Splits on the formatter's line break pattern so we can style each domain.
 */
function renderDictationBlock(container, result) {
    const block = document.createElement('div');
    block.className = 'mse-dictation-text';
    // Header line
    const header = document.createElement('div');
    header.className = 'mse-dictation-header';
    header.textContent = 'Mental Status Exam';
    block.appendChild(header);
    for (const domain of MSE_BUILDER_DOMAINS) {
        // Find the line for this domain in the formatted text
        const lineRegex = new RegExp(`^${domain.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: (.+)$`, 'm');
        const match = result.text.match(lineRegex);
        if (!match)
            continue;
        const row = document.createElement('div');
        row.className = 'mse-dictation-row';
        const label = document.createElement('span');
        label.className = 'mse-dictation-label';
        label.textContent = domain.label + ':';
        const value = document.createElement('span');
        value.className = 'mse-dictation-value';
        value.textContent = ' ' + match[1];
        if (match[1].trim() === 'not assessed.') {
            row.classList.add('mse-dictation-row--empty');
        }
        row.appendChild(label);
        row.appendChild(value);
        block.appendChild(row);
    }
    container.appendChild(block);
}
/**
 * Open the MSE Dictation Summary modal. `answers` is the live session.answers
 * map from the tree engine; the formatter pulls the MSE builder node entries.
 */
export function showMseSummaryModal(answers) {
    const result = buildMseDictation(answers);
    destroyOverlay();
    overlayEl = document.createElement('div');
    overlayEl.className = 'modal-overlay mse-summary-overlay active';
    overlayEl.addEventListener('click', (e) => {
        if (e.target === overlayEl)
            destroyOverlay();
    });
    const panel = document.createElement('div');
    panel.className = 'modal-content mse-summary-panel';
    // Header
    const header = document.createElement('div');
    header.className = 'mse-summary-header';
    const headerTitle = document.createElement('div');
    headerTitle.className = 'mse-summary-title';
    headerTitle.textContent = 'MSE — Dictation Summary';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mse-summary-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', destroyOverlay);
    header.appendChild(headerTitle);
    header.appendChild(closeBtn);
    panel.appendChild(header);
    // Critical findings banner (if any)
    if (result.hasCritical) {
        const banner = document.createElement('div');
        banner.className = 'safety-banner safety-banner--critical mse-summary-banner';
        const icon = document.createElement('span');
        icon.className = 'safety-banner__icon';
        icon.textContent = '⛔';
        const text = document.createElement('span');
        text.className = 'safety-banner__text';
        text.textContent = 'High-risk findings present — see Risk section below.';
        banner.appendChild(icon);
        banner.appendChild(text);
        panel.appendChild(banner);
    }
    // Body
    const body = document.createElement('div');
    body.className = 'mse-summary-body';
    const intro = document.createElement('p');
    intro.className = 'mse-summary-intro';
    intro.textContent =
        'Review and dictate into the EMR. Verify accuracy before submission.';
    body.appendChild(intro);
    renderDictationBlock(body, result);
    panel.appendChild(body);
    // Actions
    const actions = document.createElement('div');
    actions.className = 'mse-summary-actions';
    const copyBtn = document.createElement('button');
    copyBtn.className = 'mse-summary-action mse-summary-action--primary';
    copyBtn.textContent = 'Copy to Clipboard';
    copyBtn.addEventListener('click', () => {
        void copyDictation(result.text);
    });
    const shareBtn = document.createElement('button');
    shareBtn.className = 'mse-summary-action mse-summary-action--secondary';
    shareBtn.textContent = 'Share';
    shareBtn.addEventListener('click', () => {
        void shareDictation(result.text);
    });
    const closeAction = document.createElement('button');
    closeAction.className = 'mse-summary-action mse-summary-action--tertiary';
    closeAction.textContent = 'Close';
    closeAction.addEventListener('click', destroyOverlay);
    actions.appendChild(copyBtn);
    actions.appendChild(shareBtn);
    actions.appendChild(closeAction);
    panel.appendChild(actions);
    // Disclaimer footer
    const footer = document.createElement('div');
    footer.className = 'mse-summary-disclaimer';
    footer.textContent =
        'Generated by myMedKitt. Clinician verification required before EMR entry.';
    panel.appendChild(footer);
    overlayEl.appendChild(panel);
    document.body.appendChild(overlayEl);
}
