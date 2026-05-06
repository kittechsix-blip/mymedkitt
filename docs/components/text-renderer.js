// myMedKitt — Shared Text Rendering Utilities
// Extracted from tree-wizard.ts. Renders body text with markdown links, bold, and line breaks.
import { showInfoModal } from './info-page.js';
import { showDrugModal, buildWeightCalcPanel } from './drug-store.js';
import { router } from '../services/router.js';
/** Append text to a parent element, converting **bold** markers to <strong> elements. */
export function appendBoldAware(parent, text) {
    const boldPattern = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let match;
    while ((match = boldPattern.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
        }
        const strong = document.createElement('strong');
        strong.textContent = match[1];
        parent.appendChild(strong);
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        parent.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    else if (lastIndex === 0) {
        parent.appendChild(document.createTextNode(text));
    }
}
/** Render body text with line breaks preserved. Supports [text](#/info/id), [text](#/drug/id),
 *  [text](#/calculator/id), [text](#/tree/id), [text](https://url) links, and [N] citation refs. */
export function renderBodyText(container, text) {
    const lines = text.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed)
            continue;
        const p = document.createElement('p');
        renderLineWithLinksAndCitations(p, trimmed);
        container.appendChild(p);
    }
}
/** Parse a single line for markdown links [text](url), citation refs [N], and weight-dose patterns (e.g. 0.5 mg/kg/hr). */
function renderLineWithLinksAndCitations(container, line) {
    // Four-way combined pattern (in priority order — leftmost-longest wins per JS regex semantics):
    //   1) Bold span:        **inner**                                → groups 1
    //   2) Markdown links:   [text](url)                              → groups 2,3
    //   3) Citation refs:    [N]                                      → groups 4,5
    //   4) Weight-dose:      optional ** + number unit/kg/time + **   → groups 6,7,8,9,10
    // Bold span comes first so **[Drug](#/drug/x)** is captured as a single bold token,
    // then its inner content is recursively rendered (preserving inline links/citations).
    const combinedPattern = /\*\*([\s\S]+?)\*\*|\[([^\]]+)\]\(([^)]+)\)|(\[(\d+)\])|(\*\*)?(\d+\.?\d*(?:\s*[-–]\s*\d+\.?\d*)?)\s*(mg|mcg|units?|U|mL|mEq|g)\/kg(?:\/(day|hr?|min|dose))?(\*\*)?/g;
    let lastIndex = 0;
    let match;
    while ((match = combinedPattern.exec(line)) !== null) {
        // Text before match
        if (match.index > lastIndex) {
            appendBoldAware(container, line.slice(lastIndex, match.index));
        }
        if (match[1] !== undefined) {
            // Bold span: **inner** — render inner recursively into a <strong> so any
            // markdown links, citation refs, or dose patterns inside still work.
            const inner = match[1];
            const strong = document.createElement('strong');
            // Guard: only recurse if inner contains tokens we'd parse. Otherwise just set text.
            if (/\[|\*\*|\d/.test(inner)) {
                renderLineWithLinksAndCitations(strong, inner);
            }
            else {
                strong.textContent = inner;
            }
            container.appendChild(strong);
        }
        else if (match[2] !== undefined && match[3] !== undefined) {
            // Markdown link: [text](url)
            const linkLabel = match[2];
            const linkUrl = match[3];
            if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
                const link = document.createElement('a');
                link.className = 'body-inline-link';
                link.href = linkUrl;
                link.textContent = linkLabel;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                container.appendChild(link);
            }
            else {
                const parts = linkUrl.replace(/^#\//, '').split('/');
                const linkType = parts[0];
                const linkId = parts.slice(1).join('/');
                const link = document.createElement('button');
                link.className = 'body-inline-link';
                link.textContent = linkLabel;
                link.setAttribute('data-link-type', linkType);
                link.setAttribute('data-link-id', linkId);
                container.appendChild(link);
            }
        }
        else if (match[5] !== undefined) {
            // Citation ref: [N]
            const num = match[5];
            const btn = document.createElement('button');
            btn.className = 'cite-link';
            btn.textContent = `[${num}]`;
            btn.addEventListener('click', () => scrollToCardCitation(num));
            container.appendChild(btn);
        }
        else if (match[7] !== undefined) {
            // Weight-dose pattern: e.g. "0.5 mg/kg/hr", "**0.1 U/kg/hr**"
            const doseText = match[0].replace(/\*\*/g, '');
            const boldOpen = match[6];
            const boldClose = match[10];
            // Parse dose value and unit from the match for pre-filling the calculator
            const dosePerKg = parseFloat(match[7]);
            const unit = match[8] === 'U' ? 'units' : match[8]; // normalize U → units
            const timeSuffix = match[9]; // day, hr, h, min, dose — or undefined
            const btn = document.createElement('button');
            btn.className = 'dose-calc-link';
            btn.textContent = doseText;
            btn.setAttribute('aria-label', `Calculate ${doseText} dose`);
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showInlineDoseCalc(btn, dosePerKg, unit, timeSuffix);
            });
            if (boldOpen && boldClose) {
                const strong = document.createElement('strong');
                strong.appendChild(btn);
                container.appendChild(strong);
            }
            else {
                container.appendChild(btn);
            }
        }
        lastIndex = match.index + match[0].length;
    }
    // Remaining text (or entire line if no matches)
    if (lastIndex < line.length) {
        appendBoldAware(container, line.slice(lastIndex));
    }
}
/** Scroll to a citation in the nearest card's inline citations panel. */
function scrollToCardCitation(num) {
    // Find the closest <details> with inline citations (within the card or globally)
    const allDetails = document.querySelectorAll('.reference-citations-inline');
    for (const details of allDetails) {
        const target = details.querySelector(`[data-cite-num="${num}"]`);
        if (target) {
            if (!details.open)
                details.open = true;
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('cite-highlight');
            setTimeout(() => target.classList.remove('cite-highlight'), 1500);
            return;
        }
    }
}
/** Show a fullscreen image lightbox. imageSrc is relative to docs/ (e.g. 'images/ugib/blakemore-tube.jpg'). */
function showImageLightbox(imageSrc, caption) {
    const overlay = document.createElement('div');
    overlay.className = 'image-lightbox-overlay';
    const img = document.createElement('img');
    img.className = 'image-lightbox-img';
    img.src = imageSrc;
    img.alt = caption;
    const captionEl = document.createElement('p');
    captionEl.className = 'image-lightbox-caption';
    captionEl.textContent = caption;
    const closeBtn = document.createElement('button');
    closeBtn.className = 'image-lightbox-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Close image');
    overlay.appendChild(closeBtn);
    overlay.appendChild(img);
    overlay.appendChild(captionEl);
    document.body.appendChild(overlay);
    const dismiss = () => overlay.remove();
    closeBtn.addEventListener('click', dismiss);
    overlay.addEventListener('click', (e) => { if (e.target === overlay)
        dismiss(); });
}
/** Handle clicks on inline links via event delegation (most reliable on iOS Safari).
 *  Attach to a container element — handles drug, calculator, tree, node, and info link types.
 *  Optional onNodeJump callback for jumping to nodes within the current tree. */
export function handleInlineLinkClick(e, onNodeJump) {
    const target = e.target.closest('[data-link-type]');
    if (!target)
        return;
    e.preventDefault();
    e.stopPropagation();
    const linkType = target.getAttribute('data-link-type');
    const linkId = target.getAttribute('data-link-id');
    if (!linkType || !linkId)
        return;
    if (linkType === 'drug') {
        const slashIdx = linkId.indexOf('/');
        if (slashIdx !== -1) {
            showDrugModal(linkId.slice(0, slashIdx), linkId.slice(slashIdx + 1));
        }
        else {
            showDrugModal(linkId);
        }
    }
    else if (linkType === 'calculator') {
        router.navigate(`/calculator/${linkId}`);
    }
    else if (linkType === 'tree') {
        router.navigate('/tree/' + linkId);
    }
    else if (linkType === 'node') {
        if (onNodeJump) {
            onNodeJump(linkId);
        }
    }
    else if (linkType === 'image') {
        const caption = target.textContent || '';
        showImageLightbox('images/' + linkId, caption);
    }
    else {
        showInfoModal(linkId);
    }
}
// -------------------------------------------------------------------
// Inline Dose Calculator Popup
// -------------------------------------------------------------------
let activeDosePopup = null;
/** Show a floating dose calculator popup near the tapped dose link.
 *  Pre-fills the dose/unit from the matched pattern — user only enters weight
 *  (via direct kg, Broselow tape, or age estimation). */
function showInlineDoseCalc(_anchor, dosePerKg, unit, timeSuffix) {
    // Dismiss any existing popup
    if (activeDosePopup) {
        activeDosePopup.remove();
        activeDosePopup = null;
    }
    // Build WeightCalc from parsed pattern
    const label = timeSuffix
        ? `${dosePerKg} ${unit}/kg/${timeSuffix}`
        : `${dosePerKg} ${unit}/kg`;
    const wc = { dosePerKg, unit, label };
    // Build the 3-tab calculator panel (reuse Pharmacy's buildWeightCalcPanel)
    const calcPanel = buildWeightCalcPanel([wc]);
    // Wrap in a dismissible overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay info-modal-overlay active';
    overlay.style.zIndex = '10000';
    const popup = document.createElement('div');
    popup.className = 'dose-popup-panel';
    // Header with dose context + close button
    const header = document.createElement('div');
    header.className = 'dose-popup-header';
    const title = document.createElement('div');
    title.className = 'dose-popup-title';
    title.textContent = `Dose: ${label}`;
    const closeBtn = document.createElement('button');
    closeBtn.className = 'dose-popup-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Close calculator');
    header.appendChild(title);
    header.appendChild(closeBtn);
    popup.appendChild(header);
    popup.appendChild(calcPanel);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    activeDosePopup = overlay;
    const dismiss = () => {
        overlay.remove();
        activeDosePopup = null;
    };
    closeBtn.addEventListener('click', dismiss);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay)
            dismiss();
    });
    // Auto-focus the weight input
    const firstInput = calcPanel.querySelector('input');
    if (firstInput) {
        requestAnimationFrame(() => firstInput.focus());
    }
}
