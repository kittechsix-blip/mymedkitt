// myMedKitt — Shared Text Rendering Utilities
// Extracted from tree-wizard.ts. Renders body text with markdown links, bold, and line breaks.

import { showInfoModal } from './info-page.js';
import { showDrugModal } from './drug-store.js';
import { router } from '../services/router.js';

/** Append text to a parent element, converting **bold** markers to <strong> elements. */
export function appendBoldAware(parent: HTMLElement, text: string): void {
  const boldPattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
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
  } else if (lastIndex === 0) {
    parent.appendChild(document.createTextNode(text));
  }
}

/** Render body text with line breaks preserved. Supports [text](#/info/id), [text](#/drug/id),
 *  [text](#/calculator/id), [text](#/tree/id), [text](https://url) links, and [N] citation refs. */
export function renderBodyText(container: HTMLElement, text: string): void {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
      container.appendChild(document.createElement('br'));
    } else {
      const p = document.createElement('p');
      renderLineWithLinksAndCitations(p, line);
      container.appendChild(p);
    }
  }
}

/** Parse a single line for markdown links [text](url) and citation refs [N], rendering both. */
function renderLineWithLinksAndCitations(container: HTMLElement, line: string): void {
  // Combined pattern: markdown links OR citation references [N] (one or more digits)
  const combinedPattern = /\[([^\]]+)\]\(([^)]+)\)|(\[(\d+)\])/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let hasMatch = false;

  while ((match = combinedPattern.exec(line)) !== null) {
    hasMatch = true;
    // Text before match
    if (match.index > lastIndex) {
      appendBoldAware(container, line.slice(lastIndex, match.index));
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      // Markdown link: [text](url)
      const linkLabel = match[1];
      const linkUrl = match[2];
      if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
        const link = document.createElement('a');
        link.className = 'body-inline-link';
        link.href = linkUrl;
        link.textContent = linkLabel;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        container.appendChild(link);
      } else {
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
    } else if (match[4] !== undefined) {
      // Citation ref: [N]
      const num = match[4];
      const btn = document.createElement('button');
      btn.className = 'cite-link';
      btn.textContent = `[${num}]`;
      btn.addEventListener('click', () => scrollToCardCitation(num));
      container.appendChild(btn);
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining text
  if (lastIndex < line.length) {
    appendBoldAware(container, line.slice(lastIndex));
  }

  // If no matches, render with bold support
  if (!hasMatch) {
    appendBoldAware(container, line);
  }
}

/** Scroll to a citation in the nearest card's inline citations panel. */
function scrollToCardCitation(num: string): void {
  // Find the closest <details> with inline citations (within the card or globally)
  const allDetails = document.querySelectorAll('.reference-citations-inline') as NodeListOf<HTMLDetailsElement>;
  for (const details of allDetails) {
    const target = details.querySelector(`[data-cite-num="${num}"]`) as HTMLElement | null;
    if (target) {
      if (!details.open) details.open = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('cite-highlight');
      setTimeout(() => target.classList.remove('cite-highlight'), 1500);
      return;
    }
  }
}

/** Handle clicks on inline links via event delegation (most reliable on iOS Safari).
 *  Attach to a container element — handles drug, calculator, tree, node, and info link types.
 *  Optional onNodeJump callback for jumping to nodes within the current tree. */
export function handleInlineLinkClick(e: Event, onNodeJump?: (nodeId: string) => void): void {
  const target = (e.target as HTMLElement).closest('[data-link-type]') as HTMLElement | null;
  if (!target) return;
  e.preventDefault();
  e.stopPropagation();
  const linkType = target.getAttribute('data-link-type');
  const linkId = target.getAttribute('data-link-id');
  if (!linkType || !linkId) return;

  if (linkType === 'drug') {
    const slashIdx = linkId.indexOf('/');
    if (slashIdx !== -1) {
      showDrugModal(linkId.slice(0, slashIdx), linkId.slice(slashIdx + 1));
    } else {
      showDrugModal(linkId);
    }
  } else if (linkType === 'calculator') {
    router.navigate(`/calculator/${linkId}`);
  } else if (linkType === 'tree') {
    router.navigate('/tree/' + linkId);
  } else if (linkType === 'node') {
    if (onNodeJump) {
      onNodeJump(linkId);
    }
  } else {
    showInfoModal(linkId);
  }
}
