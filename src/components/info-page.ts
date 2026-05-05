// MedKitt — Clinical Info Modal Renderer
// Slide-up modal overlays for detailed clinical reference content.
// Data loaded via info-service (Supabase → IndexedDB → hardcoded fallback).

import { getInfoPage } from '../services/info-service.js';
import type { InfoPage, InfoPageImage, Pictograph } from '../data/info-pages.js';

// -------------------------------------------------------------------
// Body Text with Clickable Footnotes
// -------------------------------------------------------------------

/** Append text to a parent element, converting **bold** markers to <strong> elements. */
function infoBoldAware(parent: HTMLElement, text: string): void {
  const boldPattern = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = boldPattern.exec(text)) !== null) {
    if (m.index > last) parent.appendChild(document.createTextNode(text.slice(last, m.index)));
    const strong = document.createElement('strong');
    strong.textContent = m[1];
    parent.appendChild(strong);
    last = m.index + m[0].length;
  }
  if (last < text.length) parent.appendChild(document.createTextNode(text.slice(last)));
}

/** Render a line of info page body text with inline links, bold, and citation refs. */
function renderInfoBodyLine(container: HTMLElement, line: string): void {
  // Combined pattern: markdown links [text](#/path) OR citation refs [N]
  const combinedPattern = /\[([^\]]+)\]\((#\/[^)]+)\)|\[(\d+)\](?:\[(\d+)\])*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

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
        } else if (linkType === 'tree') {
          window.location.hash = '#/tree/' + linkId;
        } else if (linkType === 'drug') {
          // Re-open as drug modal after brief delay to let overlay destroy
          const slashIdx = linkId.indexOf('/');
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('medkitt-show-drug', {
              detail: slashIdx !== -1 ? { id: linkId.slice(0, slashIdx), hint: linkId.slice(slashIdx + 1) } : { id: linkId }
            }));
          }, 50);
        } else if (linkType === 'calculator') {
          window.location.hash = '#/calculator/' + linkId;
        }
      });
      container.appendChild(btn);
    } else {
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
function scrollToCitation(num: string): void {
  // Open the details element if closed
  const details = document.querySelector('.info-page-citations') as HTMLDetailsElement | null;
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

function renderInfoImage(container: HTMLElement, image: InfoPageImage): void {
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

function renderPictograph(picto: Pictograph): HTMLElement {
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
      } else {
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
    } else {
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

// -------------------------------------------------------------------
// Modal Overlay
// -------------------------------------------------------------------

let overlayEl: HTMLElement | null = null;

function destroyOverlay(): void {
  overlayEl?.remove();
  overlayEl = null;
}

/** Build plain-text version of an info page for sharing via SMS/email */
function buildShareText(page: InfoPage): string {
  const lines: string[] = [];
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
    lines.push('');
  }
  lines.push('Source: MedKitt Clinical Decision Support \u2014 for informational purposes only.');
  return lines.join('\n').trim();
}

/** Share an info page via Web Share API, with clipboard fallback */
async function shareInfoPage(page: InfoPage): Promise<void> {
  const text = buildShareText(page);

  if (navigator.share) {
    try {
      await navigator.share({
        title: page.title,
        text: text,
      });
    } catch {
      // User cancelled share — do nothing
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(text);
      showCopiedToast();
    } catch {
      // Last resort: prompt with text
      prompt('Copy this text to share:', text);
    }
  }
}

/** Brief toast notification for clipboard copy */
function showCopiedToast(): void {
  const toast = document.createElement('div');
  toast.className = 'share-toast';
  toast.textContent = 'Copied to clipboard';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

/** Show an info page as a modal overlay. Returns false if pageId not found. */
export function showInfoModal(pageId: string): boolean {
  const page = getInfoPage(pageId);
  if (!page) return false;

  destroyOverlay();

  // Create overlay
  overlayEl = document.createElement('div');
  overlayEl.className = 'modal-overlay info-modal-overlay active';
  overlayEl.addEventListener('click', (e) => {
    if (e.target === overlayEl) destroyOverlay();
  });

  // Panel
  const panel = document.createElement('div');
  panel.className = 'modal-content info-modal-panel';

  // Header
  const header = document.createElement('div');
  header.className = 'modal-header';

  const titleWrap = document.createElement('div');

  const title = document.createElement('h3');
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
    let sectionEl: HTMLElement;

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
          } else {
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
        } else {
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

  return true;
}
