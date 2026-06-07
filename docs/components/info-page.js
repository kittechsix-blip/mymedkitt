// MedKitt — Clinical Info Modal Renderer
// Slide-up modal overlays for detailed clinical reference content.
// Data loaded via info-service (Supabase → IndexedDB → hardcoded fallback).
import { getInfoPage } from '../services/info-service.js';
// -------------------------------------------------------------------
// Body Text with Clickable Footnotes
// -------------------------------------------------------------------
/** Append text to a parent element, converting **bold** markers to <strong> elements. */
function infoBoldAware(parent, text) {
    const boldPattern = /\*\*(.+?)\*\*/g;
    let last = 0;
    let m;
    while ((m = boldPattern.exec(text)) !== null) {
        if (m.index > last)
            parent.appendChild(document.createTextNode(text.slice(last, m.index)));
        const strong = document.createElement('strong');
        strong.textContent = m[1];
        parent.appendChild(strong);
        last = m.index + m[0].length;
    }
    if (last < text.length)
        parent.appendChild(document.createTextNode(text.slice(last)));
}
/** Render a line of info page body text with inline links, bold, and citation refs. */
function renderInfoBodyLine(container, line) {
    // Combined pattern: markdown links [text](#/path) OR citation refs [N]
    const combinedPattern = /\[([^\]]+)\]\((#\/[^)]+)\)|\[(\d+)\](?:\[(\d+)\])*/g;
    let lastIndex = 0;
    let match;
    while ((match = combinedPattern.exec(line)) !== null) {
        // Text before this match
        if (match.index > lastIndex) {
            infoBoldAware(container, line.slice(lastIndex, match.index));
        }
        if (match[1] && match[2]) {
            // Markdown link: [label](#/type/id)
            const linkLabel = match[1];
            const linkUrl = match[2];
            const parts = linkUrl.replace(/^#\//, '').split('/');
            const linkType = parts[0];
            const linkId = parts.slice(1).join('/');
            const btn = document.createElement('button');
            btn.className = 'body-inline-link';
            btn.textContent = linkLabel;
            btn.setAttribute('data-link-type', linkType);
            btn.setAttribute('data-link-id', linkId);
            btn.addEventListener('click', () => {
                destroyOverlay();
                if (linkType === 'node') {
                    // Dispatch custom event for tree wizard to handle node jump
                    window.dispatchEvent(new CustomEvent('medkitt-jump-node', { detail: linkId }));
                }
                else if (linkType === 'tree') {
                    window.location.hash = '#/tree/' + linkId;
                }
                else if (linkType === 'drug') {
                    // Re-open as drug modal after brief delay to let overlay destroy
                    const slashIdx = linkId.indexOf('/');
                    setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('medkitt-show-drug', {
                            detail: slashIdx !== -1 ? { id: linkId.slice(0, slashIdx), hint: linkId.slice(slashIdx + 1) } : { id: linkId }
                        }));
                    }, 50);
                }
                else if (linkType === 'calculator') {
                    window.location.hash = '#/calculator/' + linkId;
                }
            });
            container.appendChild(btn);
        }
        else {
            // Citation ref: [N] or [N][N]
            const fullMatch = match[0];
            const nums = fullMatch.match(/\d+/g) ?? [];
            for (let i = 0; i < nums.length; i++) {
                const num = nums[i];
                const btn = document.createElement('button');
                btn.className = 'cite-link';
                btn.textContent = `[${num}]`;
                btn.addEventListener('click', () => scrollToCitation(num));
                container.appendChild(btn);
            }
        }
        lastIndex = match.index + match[0].length;
    }
    // Remaining text after last match (or entire line if no matches)
    if (lastIndex < line.length) {
        infoBoldAware(container, line.slice(lastIndex));
    }
}
/** Scroll to a citation in the references section, opening it if collapsed. */
function scrollToCitation(num) {
    // Open the details element if closed
    const details = document.querySelector('.info-page-citations');
    if (details && !details.open) {
        details.open = true;
    }
    // Scroll to the citation
    const target = document.getElementById(`info-cite-${num}`);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Brief highlight
        target.classList.add('cite-highlight');
        setTimeout(() => target.classList.remove('cite-highlight'), 1500);
    }
}
function renderInfoImage(container, image) {
    const figure = document.createElement('figure');
    figure.className = 'wizard-image-figure';
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.className = 'wizard-image';
    img.loading = 'lazy';
    figure.appendChild(img);
    if (image.caption) {
        const caption = document.createElement('figcaption');
        caption.className = 'wizard-image-caption';
        caption.textContent = image.caption;
        figure.appendChild(caption);
    }
    container.appendChild(figure);
}
// -------------------------------------------------------------------
// Pictograph Renderer
// -------------------------------------------------------------------
function renderPictograph(picto) {
    const container = document.createElement('div');
    container.className = 'pictograph';
    const title = document.createElement('div');
    title.className = 'pictograph-title';
    title.textContent = picto.title;
    container.appendChild(title);
    // Dot grid — 10 per row
    const grid = document.createElement('div');
    grid.className = 'pictograph-grid';
    for (const group of picto.groups) {
        for (let i = 0; i < group.count; i++) {
            if (group.symbol) {
                const sym = document.createElement('span');
                sym.className = 'pictograph-symbol';
                sym.textContent = group.symbol;
                grid.appendChild(sym);
            }
            else {
                const dot = document.createElement('span');
                dot.className = 'pictograph-dot';
                dot.style.backgroundColor = group.color;
                grid.appendChild(dot);
            }
        }
    }
    container.appendChild(grid);
    // Legend
    const legend = document.createElement('div');
    legend.className = 'pictograph-legend';
    for (const group of picto.groups) {
        const item = document.createElement('div');
        item.className = 'pictograph-legend-item';
        if (group.symbol) {
            const sym = document.createElement('span');
            sym.className = 'pictograph-legend-symbol';
            sym.textContent = group.symbol;
            item.appendChild(sym);
        }
        else {
            const dot = document.createElement('span');
            dot.className = 'pictograph-legend-dot';
            dot.style.backgroundColor = group.color;
            item.appendChild(dot);
        }
        const label = document.createElement('span');
        label.textContent = group.label;
        item.appendChild(label);
        legend.appendChild(item);
    }
    container.appendChild(legend);
    return container;
}
function renderComparisonTable(tableData) {
    const wrap = document.createElement('div');
    wrap.className = `info-page-comparison-wrap${tableData.variant ? ` info-page-comparison-wrap--${tableData.variant}` : ''}`;
    const table = document.createElement('table');
    table.className = `info-page-comparison-table${tableData.variant ? ` info-page-comparison-table--${tableData.variant}` : ''}`;
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (const column of tableData.columns) {
        const th = document.createElement('th');
        th.scope = 'col';
        th.textContent = column.label;
        th.dataset.columnKey = column.key;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    for (const row of tableData.rows) {
        const tr = document.createElement('tr');
        for (const column of tableData.columns) {
            const td = document.createElement('td');
            td.dataset.columnKey = column.key;
            renderComparisonCell(td, column.key, row.cells[column.key] ?? '');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    wrap.appendChild(table);
    return wrap;
}
function renderComparisonCell(td, columnKey, value) {
    const lines = value.split('\n').map((line) => line.trim()).filter(Boolean);
    if (lines.length <= 1) {
        renderInfoBodyLine(td, value);
        return;
    }
    td.classList.add('info-page-comparison-cell--stacked');
    if (columnKey === 'drug') {
        td.classList.add('info-page-comparison-cell--drug');
    }
    for (let i = 0; i < lines.length; i++) {
        const line = document.createElement('div');
        line.className = getComparisonCellLineClass(columnKey, i);
        renderInfoBodyLine(line, lines[i]);
        td.appendChild(line);
    }
}
function getComparisonCellLineClass(columnKey, lineIndex) {
    if (columnKey !== 'drug') {
        return 'info-page-comparison-cell-line';
    }
    if (lineIndex === 0) {
        return 'info-page-comparison-drug-name';
    }
    if (lineIndex === 1) {
        return 'info-page-comparison-drug-dose';
    }
    return 'info-page-comparison-drug-note';
}
// -------------------------------------------------------------------
// Modal Overlay
// -------------------------------------------------------------------
let overlayEl = null;
function destroyOverlay() {
    if (overlayEl) {
        // Tear down a11y handlers + restore focus to the launcher (FlowRider 2026-05-28)
        const keyHandler = overlayEl._keyHandler;
        if (keyHandler) {
            document.removeEventListener('keydown', keyHandler);
        }
        const prev = overlayEl._previouslyFocused;
        overlayEl.remove();
        overlayEl = null;
        if (prev && typeof prev.focus === 'function') {
            try {
                prev.focus();
            }
            catch { /* element no longer in DOM — ignore */ }
        }
    }
}
/** Build plain-text version of an info page for sharing via SMS/email */
function buildShareText(page) {
    const lines = [];
    lines.push(page.title.toUpperCase());
    lines.push('');
    for (const section of page.sections) {
        if (section.heading) {
            lines.push(section.heading.toUpperCase());
        }
        if (section.body) {
            // Strip **bold** markers for plain text
            lines.push(section.body.replace(/\*\*(.+?)\*\*/g, '$1'));
        }
        if (section.pictographs) {
            for (const picto of section.pictographs) {
                lines.push(picto.title);
                for (const group of picto.groups) {
                    lines.push(`\u2022 ${group.label}`);
                }
                lines.push('');
            }
        }
        if (section.comparisonTable) {
            const headers = section.comparisonTable.columns.map((column) => column.label).join(' | ');
            lines.push(headers);
            for (const row of section.comparisonTable.rows) {
                const rowText = section.comparisonTable.columns.map((column) => row.cells[column.key] ?? '').join(' | ');
                lines.push(rowText);
            }
        }
        lines.push('');
    }
    lines.push('Source: MedKitt Clinical Decision Support \u2014 for informational purposes only.');
    return lines.join('\n').trim();
}
/** Share an info page via Web Share API, with clipboard fallback */
async function shareInfoPage(page) {
    const text = buildShareText(page);
    if (navigator.share) {
        try {
            await navigator.share({
                title: page.title,
                text: text,
            });
        }
        catch {
            // User cancelled share — do nothing
        }
    }
    else {
        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(text);
            showCopiedToast();
        }
        catch {
            // Last resort: prompt with text
            prompt('Copy this text to share:', text);
        }
    }
}
/** Brief toast notification for clipboard copy */
function showCopiedToast() {
    const toast = document.createElement('div');
    toast.className = 'share-toast';
    toast.textContent = 'Copied to clipboard';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
/** Show an info page as a modal overlay. Returns false if pageId not found. */
/** Slugify a section heading into a stable anchor id (shared with tricks directory). */
export function trickAnchorId(heading) {
    return 'trick-' + heading
        .toLowerCase()
        .replace(/[\u2018\u2019']/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
export function showInfoModal(pageId, anchorId) {
    const page = getInfoPage(pageId);
    if (!page)
        return false;
    destroyOverlay();
    // Create overlay — a11y (FlowRider 2026-05-28): tag as dialog/modal so screen
    // readers announce it correctly, and trap Tab focus inside the panel while
    // open so keyboard users can't drift into the underlying consult content.
    overlayEl = document.createElement('div');
    overlayEl.className = 'modal-overlay info-modal-overlay active';
    overlayEl.setAttribute('role', 'dialog');
    overlayEl.setAttribute('aria-modal', 'true');
    const titleElId = `info-modal-title-${page.id}`;
    overlayEl.setAttribute('aria-labelledby', titleElId);
    overlayEl.addEventListener('click', (e) => {
        if (e.target === overlayEl)
            destroyOverlay();
    });
    // Save the element that had focus before the modal opened so we can restore
    // it on close. Listen for Escape to close. Trap Tab cycles within the panel.
    const previouslyFocused = document.activeElement;
    const keyHandler = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            destroyOverlay();
            return;
        }
        if (e.key !== 'Tab' || !overlayEl)
            return;
        const focusables = overlayEl.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0)
            return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && active === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
        }
    };
    document.addEventListener('keydown', keyHandler);
    overlayEl.setAttribute('data-restore-focus', previouslyFocused ? 'yes' : 'no');
    overlayEl._keyHandler = keyHandler;
    overlayEl._previouslyFocused = previouslyFocused;
    // Panel
    const panel = document.createElement('div');
    panel.className = 'modal-content info-modal-panel';
    if (page.sections.some((section) => section.comparisonTable)) {
        panel.classList.add('info-modal-panel--wide');
    }
    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    const titleWrap = document.createElement('div');
    const title = document.createElement('h3');
    title.id = titleElId;
    title.textContent = page.title;
    titleWrap.appendChild(title);
    const subtitle = document.createElement('div');
    subtitle.className = 'info-modal-subtitle';
    subtitle.textContent = page.subtitle;
    titleWrap.appendChild(subtitle);
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn-text';
    closeBtn.textContent = '\u2715';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', destroyOverlay);
    header.appendChild(titleWrap);
    header.appendChild(closeBtn);
    panel.appendChild(header);
    // Body
    const body = document.createElement('div');
    body.className = 'modal-body info-modal-body';
    if (page.image) {
        renderInfoImage(body, page.image);
    }
    const isStopPage = page.id.endsWith('-stop');
    for (const section of page.sections) {
        let sectionEl;
        if (isStopPage && section.heading) {
            // Stop pages: accordion — heading is the tap target, body expands below
            const details = document.createElement('details');
            details.className = 'info-page-stop-item';
            const summary = document.createElement('summary');
            summary.className = 'info-page-stop-heading';
            summary.textContent = section.heading;
            details.appendChild(summary);
            if (section.body) {
                const bodyEl = document.createElement('div');
                bodyEl.className = 'info-page-stop-body';
                const lines = section.body.split('\n');
                for (const line of lines) {
                    if (line.trim() === '') {
                        bodyEl.appendChild(document.createElement('br'));
                    }
                    else {
                        const p = document.createElement('p');
                        p.className = 'info-page-text';
                        renderInfoBodyLine(p, line);
                        bodyEl.appendChild(p);
                    }
                }
                details.appendChild(bodyEl);
            }
            body.appendChild(details);
            continue;
        }
        sectionEl = document.createElement('div');
        sectionEl.className = 'info-page-section';
        if (section.heading) {
            // Stable anchor so the Tricks directory can deep-link to a single trick.
            sectionEl.id = trickAnchorId(section.heading);
            const h = document.createElement('h2');
            h.className = 'info-page-section-heading';
            h.textContent = section.heading;
            sectionEl.appendChild(h);
        }
        if (section.image) {
            renderInfoImage(sectionEl, section.image);
        }
        if (section.body) {
            const lines = section.body.split('\n');
            for (const line of lines) {
                if (line.trim() === '') {
                    sectionEl.appendChild(document.createElement('br'));
                }
                else {
                    const p = document.createElement('p');
                    p.className = 'info-page-text';
                    renderInfoBodyLine(p, line);
                    sectionEl.appendChild(p);
                }
            }
        }
        if (section.drugTable) {
            for (const drug of section.drugTable) {
                const card = document.createElement('div');
                card.className = 'info-page-drug-card';
                const drugName = document.createElement('div');
                drugName.className = 'info-page-drug-name';
                renderInfoBodyLine(drugName, drug.drug);
                card.appendChild(drugName);
                const regimen = document.createElement('div');
                regimen.className = 'info-page-drug-regimen';
                renderInfoBodyLine(regimen, drug.regimen);
                card.appendChild(regimen);
                sectionEl.appendChild(card);
            }
        }
        if (section.comparisonTable) {
            sectionEl.appendChild(renderComparisonTable(section.comparisonTable));
        }
        if (section.pictographs) {
            for (const picto of section.pictographs) {
                sectionEl.appendChild(renderPictograph(picto));
            }
        }
        body.appendChild(sectionEl);
    }
    // Citations
    const citSection = document.createElement('details');
    citSection.className = 'info-page-citations';
    const citSummary = document.createElement('summary');
    citSummary.textContent = `References (${page.citations.length})`;
    citSection.appendChild(citSummary);
    const citList = document.createElement('div');
    citList.className = 'reference-citation-list';
    for (const cite of page.citations) {
        const item = document.createElement('div');
        item.className = 'reference-citation-item';
        item.id = `info-cite-${cite.num}`;
        const numEl = document.createElement('span');
        numEl.className = 'reference-citation-num';
        numEl.textContent = `[${cite.num}]`;
        const textEl = document.createElement('span');
        textEl.className = 'reference-citation-text';
        textEl.textContent = cite.text;
        item.appendChild(numEl);
        item.appendChild(textEl);
        citList.appendChild(item);
    }
    citSection.appendChild(citList);
    body.appendChild(citSection);
    // Share button (patient-facing info pages only)
    if (page.shareable) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn-primary info-share-btn';
        shareBtn.textContent = 'Share with Patient';
        shareBtn.addEventListener('click', () => shareInfoPage(page));
        body.appendChild(shareBtn);
    }
    // Disclaimer
    const disclaimer = document.createElement('div');
    disclaimer.className = 'reference-disclaimer';
    disclaimer.textContent = 'Clinical decision support only. Verify against current guidelines and institutional protocols.';
    body.appendChild(disclaimer);
    panel.appendChild(body);
    overlayEl.appendChild(panel);
    document.body.appendChild(overlayEl);
    // Deep-link: if an anchor was requested, scroll that trick into view and flash it.
    if (anchorId) {
        requestAnimationFrame(() => {
            const target = overlayEl?.querySelector(`#${CSS.escape(anchorId)}`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                target.classList.add('cite-highlight');
                setTimeout(() => target.classList.remove('cite-highlight'), 1500);
            }
        });
    }
    return true;
}
