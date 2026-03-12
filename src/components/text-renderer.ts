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
 *  [text](#/calculator/id), [text](#/tree/id), and [text](https://url) links. */
export function renderBodyText(container: HTMLElement, text: string): void {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
      container.appendChild(document.createElement('br'));
    } else if (linkPattern.test(line)) {
      linkPattern.lastIndex = 0;
      const p = document.createElement('p');
      let lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = linkPattern.exec(line)) !== null) {
        const linkLabel = match[1];
        const linkUrl = match[2];
        if (match.index > lastIndex) {
          appendBoldAware(p, line.slice(lastIndex, match.index));
        }
        if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
          const link = document.createElement('a');
          link.className = 'body-inline-link';
          link.href = linkUrl;
          link.textContent = linkLabel;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          p.appendChild(link);
        } else {
          const parts = linkUrl.replace(/^#\//, '').split('/');
          const linkType = parts[0];
          const linkId = parts.slice(1).join('/');
          const link = document.createElement('button');
          link.className = 'body-inline-link';
          link.textContent = linkLabel;
          link.setAttribute('data-link-type', linkType);
          link.setAttribute('data-link-id', linkId);
          p.appendChild(link);
        }
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        appendBoldAware(p, line.slice(lastIndex));
      }
      container.appendChild(p);
    } else {
      const p = document.createElement('p');
      appendBoldAware(p, line);
      container.appendChild(p);
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
