// myMedKitt — Expandable Section Component
// Styled <details>/<summary> for inline expand/collapse within cards.
/** Create an expandable section with a label and content.
 *  Content can be a string (rendered as text) or an HTMLElement. */
export function createExpandableSection(label, content) {
    const details = document.createElement('details');
    details.className = 'expandable-section';
    const summary = document.createElement('summary');
    summary.textContent = label;
    details.appendChild(summary);
    const contentEl = document.createElement('div');
    contentEl.className = 'expandable-section__content';
    if (typeof content === 'string') {
        contentEl.textContent = content;
    }
    else {
        contentEl.appendChild(content);
    }
    details.appendChild(contentEl);
    return details;
}
