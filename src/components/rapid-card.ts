// myMedKitt — RAPID card.
// A full-screen strip of tappable action tiles for one consult. Every number on it was verified
// against the consult's own nodes / the drug entry, and every expansion line is a verbatim excerpt of a consult
// node line or the drug store's own regimen text (see services/rapid-verify.ts). DOM APIs only:
// no innerHTML anywhere in this file.

import type { RapidStrip, RapidTile, RapidDrugTile, RapidStepsTile, RapidExcerpt, WeightCalcSnapshot } from '../data/rapid/types.js';
import { getRapidStrip, isRapidPreview, rapidApproved, rapidLive, rapidLiveResult } from '../services/rapid-service.js';
import { numberSpans } from '../services/rapid-verify.js';
import { getDrug } from '../services/drug-service.js';
import type { TreeConfig } from '../services/tree-service.js';
import { calcDose, fmtNum } from './drug-store.js';
import { renderInlineCitations } from './reference-table.js';
import { claimOverlayEntry } from '../services/consult-history.js';
import { openCriticalActionsModal } from './critical-actions.js';
import type { WeightCalc } from '../data/drug-store.js';

/** Owner decision: drug-wide contraindications and cautions are always shown on drug tiles (verbatim from the live
 *  entry, headed as drug-wide). Set to false to hide them. */
export const RAPID_SHOW_DRUG_WARNINGS = true;

/** Roots of overlays/modals that sit above the card: Esc belongs to them while one is open. */
const HIGHER_OVERLAYS = '.modal-overlay, .overlay-panel, .image-lightbox-overlay, .share-modal-overlay, .infographic-overlay, .toolbar-tools-overlay, .decision-map-overlay, .critical-actions-overlay, .legal-splash-overlay, #legal-modal.active';

export interface RapidCardOpts {
  treeId: string;
  consultTitle: string;
  config: TreeConfig;
  disclaimer: string;
  /** Jump to a source node in the consult. The card has already closed. */
  onJumpToNode: (nodeId: string) => void;
}

interface CardState {
  opts: RapidCardOpts;
  strip: RapidStrip;
  overlay: HTMLElement;
  variantIdx: number;
  openTileId: string | null;
  weightKg: number | null;
  opener: HTMLElement | null;
  mismatch: Set<string>;
  stripMismatch: string[];
  preview: boolean;
  escHandler: (e: KeyboardEvent) => void;
  navHandler: () => void;
  syncTop: () => void;
  bannerObserver: MutationObserver | null;
}

let state: CardState | null = null;

const SVG_NS = 'http://www.w3.org/2000/svg';

const ALERT_PATHS = ['M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z', 'M12 9v4', 'M12 17h.01'];

function svgIcon(paths: string[], size = 22): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.75');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  for (const d of paths) {
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', d);
    svg.appendChild(p);
  }
  return svg;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

// ---------------------------------------------------------------------------
// Entry points
// ---------------------------------------------------------------------------

/** The in-consult key: occupies the Critical button's slot. */
export function createRapidKey(opts: RapidCardOpts): HTMLButtonElement {
  const btn = el('button', 'rapid-key', 'RAPID');
  btn.type = 'button';
  btn.setAttribute('aria-label', `Open RAPID card for ${opts.consultTitle}`);
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.addEventListener('click', () => openRapidCard(opts));
  return btn;
}

/** The Home-search key inside a consult result row. */
export function createRapidSearchKey(treeId: string, onGo: () => void, label?: string): HTMLButtonElement {
  const btn = el('button', 'rapid-search-key', 'RAPID');
  btn.type = 'button';
  btn.setAttribute('aria-label', `Open RAPID card for ${label ?? treeId}`);
  const go = (e: Event): void => { e.stopPropagation(); e.preventDefault(); onGo(); };
  btn.addEventListener('click', go);
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') go(e);
    else e.stopPropagation();
  });
  return btn;
}

export function closeRapidCard(): void {
  const s = state;
  if (!s) return;
  state = null;
  document.removeEventListener('keydown', s.escHandler);
  window.removeEventListener('resize', s.syncTop);
  s.bannerObserver?.disconnect();
  window.removeEventListener('hashchange', s.navHandler);
  s.overlay.remove();
  document.body.classList.remove('rapid-open');
  if (s.opener && s.opener.isConnected) {
    try { s.opener.focus(); } catch { /* ignore */ }
  }
}

export function openRapidCard(opts: RapidCardOpts): void {
  // One guard for every caller: refuse unless the strip is live (approved or preview, and verified).
  if (!rapidLive(opts.treeId, opts.config)) return;
  const strip = getRapidStrip(opts.treeId);
  if (!strip) return;
  closeRapidCard();

  const result = rapidLiveResult(opts.treeId, opts.config);
  const overlay = el('div', 'rapid-overlay');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'rapid-title');

  const escHandler = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return;
    // a visible higher overlay owns Esc (hidden roots such as the dismissed legal splash do not count)
    const higher = Array.from(document.querySelectorAll<HTMLElement>(HIGHER_OVERLAYS)).some((n) => n.getClientRects().length > 0 && getComputedStyle(n).visibility !== 'hidden');
    if (higher) return;
    closeRapidCard();
  };
  const navHandler = (): void => closeRapidCard();

  const active = document.activeElement;
  const s: CardState = {
    opts,
    strip,
    overlay,
    variantIdx: 0,
    openTileId: null,
    weightKg: null,
    opener: active instanceof HTMLElement ? active : null,
    mismatch: new Set(result && !result.ok ? result.failingTileIds : []),
    stripMismatch: result && !result.ok ? result.failures.filter((f) => !f.tileId).map((f) => f.message) : [],
    preview: isRapidPreview() && !rapidApproved(opts.treeId),
    escHandler,
    navHandler,
    syncTop: () => syncTop(overlay),
    bannerObserver: null,
  };
  state = s;

  buildOverlay(s);
  overlay.addEventListener('keydown', trapTab);
  overlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', escHandler);
  window.addEventListener('hashchange', navHandler);

  // Start below the fixed legal banner while it is showing; at the top once it is dismissed.
  syncTop(overlay);
  window.addEventListener('resize', s.syncTop);
  s.bannerObserver = new MutationObserver(s.syncTop);
  s.bannerObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  claimOverlayEntry(); // route-opened cards still get their own history entry
  document.body.appendChild(overlay);
  document.body.classList.add('rapid-open');
  const title = overlay.querySelector<HTMLElement>('#rapid-title');
  title?.focus();
}

function syncTop(overlay: HTMLElement): void {
  const banner = document.getElementById('legal-banner');
  const showing = !!banner && document.body.classList.contains('has-legal-banner') && banner.getBoundingClientRect().height > 0;
  const bottom = showing ? Math.ceil((banner as HTMLElement).getBoundingClientRect().bottom) : 0;
  overlay.style.top = `${bottom}px`;
  overlay.classList.toggle('rapid-overlay--banner', showing);
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function buildOverlay(s: CardState): void {
  const { overlay, strip, opts } = s;
  overlay.textContent = '';

  const plate = el('header', 'rapid-plate');
  const row = el('div', 'rapid-plate__row');
  const title = el('h2', 'rapid-plate__title');
  title.id = 'rapid-title';
  title.tabIndex = -1;
  title.appendChild(el('span', 'rapid-plate__word', 'RAPID'));
  title.appendChild(el('span', 'rapid-plate__consult', opts.consultTitle));
  row.appendChild(title);

  const weight = el('div', 'rapid-plate__weight');
  weight.hidden = s.weightKg === null;
  weight.appendChild(el('span', 'rapid-plate__weight-value', s.weightKg === null ? '' : `${fmtNum(s.weightKg)} kg`));
  const clear = el('button', 'rapid-plate__weight-clear');
  clear.type = 'button';
  clear.setAttribute('aria-label', 'Clear weight');
  clear.appendChild(svgIcon(['M18 6 6 18', 'm6 6 12 12'], 18));
  clear.addEventListener('click', () => setWeight(null));
  weight.appendChild(clear);
  row.appendChild(weight);

  const close = el('button', 'rapid-close');
  close.type = 'button';
  close.setAttribute('aria-label', 'Close RAPID card');
  close.appendChild(svgIcon(['M18 6 6 18', 'm6 6 12 12'], 24));
  close.addEventListener('click', closeRapidCard);
  row.appendChild(close);
  plate.appendChild(row);

  if (strip.variants.length > 1) {
    const track = el('div', 'rapid-plate__track');
    track.setAttribute('role', 'radiogroup');
    track.setAttribute('aria-label', 'Pathway');
    strip.variants.forEach((v, i) => {
      const k = el('button', 'rapid-plate__key', v.label);
      k.type = 'button';
      k.setAttribute('role', 'radio');
      k.setAttribute('aria-checked', String(i === s.variantIdx));
      k.dataset.variantIdx = String(i);
      k.tabIndex = i === s.variantIdx ? 0 : -1;
      k.addEventListener('click', () => switchVariant(i));
      k.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); switchVariant((i + 1) % strip.variants.length, true); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); switchVariant((i - 1 + strip.variants.length) % strip.variants.length, true); }
      });
      track.appendChild(k);
    });
    plate.appendChild(track);
  }
  if (s.preview) plate.appendChild(el('p', 'rapid-plate__preview', 'Unapproved preview · local only'));
  overlay.appendChild(plate);

  const body = el('div', 'rapid-body');
  if (s.preview && s.stripMismatch.length > 0) {
    body.appendChild(el('p', 'rapid-exp__mismatch', 'Source mismatch: ' + s.stripMismatch.join(' | ')));
  }
  const frame = el('section', 'rapid-frame');
  frame.appendChild(buildStrip(s));
  body.appendChild(frame);
  const crit = opts.config.criticalActions;
  if (crit && crit.length > 0) {
    // content left off the strip keeps an entry point: close RAPID, open the consult's existing Critical-actions modal
    const all = el('button', 'rapid-crit-all', 'All critical actions');
    all.type = 'button';
    all.addEventListener('click', () => {
      const { consultTitle, onJumpToNode } = opts;
      closeRapidCard();
      openCriticalActionsModal({ actions: crit, consultTitle, onJumpToNode });
    });
    body.appendChild(all);
  }
  body.appendChild(el('p', 'rapid-disclaimer', opts.disclaimer));
  overlay.appendChild(body);
}

function buildStrip(s: CardState): HTMLElement {
  const variant = s.strip.variants[s.variantIdx];
  const strip = el('div', 'rapid-strip');
  strip.style.setProperty('--rapid-n', String(variant.tiles.length));
  variant.tiles.forEach((tile, i) => {
    const btn = el('button', 'rapid-tile');
    btn.type = 'button';
    btn.id = `rapid-tile-${tile.id}`;
    btn.dataset.tileId = tile.id;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', `rapid-exp-${tile.id}`);
    btn.setAttribute('aria-label', `Step ${i + 1} of ${variant.tiles.length}: ${tile.action}, ${tile.figure}${tile.condition ? ', ' + tile.condition : ''}`);
    btn.appendChild(el('span', 'rapid-tile__step', String(i + 1)));
    btn.appendChild(el('span', 'rapid-tile__action', tile.action));
    btn.appendChild(el('span', 'rapid-tile__figure', tile.figure));
    if (tile.condition) btn.appendChild(el('span', 'rapid-tile__condition', tile.condition));
    btn.addEventListener('click', () => toggleTile(tile.id));
    strip.appendChild(btn);

    const exp = el('div', 'rapid-exp');
    exp.id = `rapid-exp-${tile.id}`;
    exp.setAttribute('role', 'region');
    exp.setAttribute('aria-labelledby', btn.id);
    exp.hidden = true;
    strip.appendChild(exp);
  });
  return strip;
}

// ---------------------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------------------

function currentTiles(s: CardState): readonly RapidTile[] {
  return s.strip.variants[s.variantIdx].tiles;
}

function toggleTile(tileId: string): void {
  const s = state;
  if (!s) return;
  const wasOpen = s.openTileId === tileId;
  if (s.openTileId) setTileOpen(s, s.openTileId, false);
  s.openTileId = null;
  if (wasOpen) return;
  const tile = currentTiles(s).find((t) => t.id === tileId);
  if (!tile) return;
  setTileOpen(s, tileId, true);
  s.openTileId = tileId;
  const btn = s.overlay.querySelector<HTMLElement>(`#rapid-tile-${CSS.escape(tileId)}`);
  const plate = s.overlay.querySelector<HTMLElement>('.rapid-plate');
  if (btn) {
    const top = s.overlay.scrollTop + btn.getBoundingClientRect().top - (plate ? plate.getBoundingClientRect().height : 0) - 8;
    s.overlay.scrollTo({ top: Math.max(0, top), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }
}

function setTileOpen(s: CardState, tileId: string, open: boolean): void {
  const btn = s.overlay.querySelector<HTMLElement>(`#rapid-tile-${CSS.escape(tileId)}`);
  const exp = s.overlay.querySelector<HTMLElement>(`#rapid-exp-${CSS.escape(tileId)}`);
  if (!btn || !exp) return;
  btn.setAttribute('aria-expanded', String(open));
  btn.classList.toggle('rapid-tile--open', open);
  if (open && exp.childElementCount === 0) {
    const tile = currentTiles(s).find((t) => t.id === tileId);
    if (tile) buildExpansion(s, tile, exp);
  }
  exp.hidden = !open;
}

function switchVariant(idx: number, focusKey = false): void {
  const s = state;
  if (!s || idx === s.variantIdx) return;
  s.variantIdx = idx;
  s.openTileId = null;
  const frame = s.overlay.querySelector('.rapid-frame');
  if (frame) { frame.textContent = ''; frame.appendChild(buildStrip(s)); }
  const keys = s.overlay.querySelectorAll<HTMLElement>('.rapid-plate__key');
  keys.forEach((k, i) => {
    k.setAttribute('aria-checked', String(i === idx));
    k.tabIndex = i === idx ? 0 : -1;
  });
  if (focusKey) keys[idx]?.focus();
}

function setWeight(kg: number | null, source?: HTMLInputElement): void {
  const s = state;
  if (!s) return;
  s.weightKg = kg;
  const box = s.overlay.querySelector<HTMLElement>('.rapid-plate__weight');
  const val = s.overlay.querySelector<HTMLElement>('.rapid-plate__weight-value');
  if (box && val) { box.hidden = kg === null; val.textContent = kg === null ? '' : `${fmtNum(kg)} kg`; }
  s.overlay.querySelectorAll<HTMLInputElement>('.rapid-weight__input').forEach((inp) => {
    if (inp !== source) inp.value = kg === null ? '' : fmtNum(kg);
  });
  s.overlay.querySelectorAll<HTMLElement>('.rapid-weight').forEach((w) => refreshWeightOutput(s, w));
}

function onOverlayClick(e: Event): void {
  const s = state;
  if (!s) return;
  const t = e.target as HTMLElement | null;
  const open = t?.closest<HTMLElement>('.rapid-open-consult');
  if (open && open.dataset.nodeId) {
    const nodeId = open.dataset.nodeId;
    const cb = s.opts.onJumpToNode;
    closeRapidCard();
    cb(nodeId);
  }
}

function trapTab(e: KeyboardEvent): void {
  if (e.key !== 'Tab' || !state) return;
  const focusables = Array.from(state.overlay.querySelectorAll<HTMLElement>('button, input, summary, [tabindex]:not([tabindex="-1"])'))
    .filter((n) => !n.hasAttribute('disabled') && n.offsetParent !== null);
  if (focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const a = document.activeElement;
  if (e.shiftKey && (a === first || a === state.overlay.querySelector('#rapid-title'))) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
}

// ---------------------------------------------------------------------------
// Text rendering: authored + live strings, one renderer
// ---------------------------------------------------------------------------

function appendNumbers(parent: HTMLElement, text: string, mono: boolean): void {
  const spans = mono ? numberSpans(text) : [];
  let at = 0;
  for (const sp of spans) {
    if (sp.start < at) continue;
    if (sp.start > at) parent.appendChild(document.createTextNode(text.slice(at, sp.start)));
    parent.appendChild(el('span', 'rapid-num', text.slice(sp.start, sp.end)));
    at = sp.end;
  }
  if (at < text.length) parent.appendChild(document.createTextNode(text.slice(at)));
}

function appendBold(parent: HTMLElement, text: string, mono: boolean): void {
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) appendNumbers(parent, text.slice(last, m.index), mono);
    const strong = el('strong');
    appendNumbers(strong, m[1], mono);
    parent.appendChild(strong);
    last = m.index + m[0].length;
  }
  if (last < text.length) appendNumbers(parent, text.slice(last), mono);
}

/** Verbatim text with markdown links shown as their labels and **bold** honoured. */
function renderRich(parent: HTMLElement, text: string, mono = true): void {
  const re = /\[([^\]]*)\]\(([^)]*)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) appendBold(parent, text.slice(last, m.index), mono);
    appendBold(parent, m[1], mono);
    last = m.index + m[0].length;
  }
  if (last < text.length) appendBold(parent, text.slice(last), mono);
}

// ---------------------------------------------------------------------------
// Expansions (v3): everything here is verbatim. Excerpts were verified against the live node lines;
// the regimen is read from the live drug entry; nothing in an expansion is authored prose.
// ---------------------------------------------------------------------------

function buildExpansion(s: CardState, tile: RapidTile, exp: HTMLElement): void {
  if (s.mismatch.has(tile.id)) {
    exp.appendChild(el('p', 'rapid-exp__mismatch', 'Source mismatch: this tile does not match the live consult or drug text.'));
  }
  if (tile.condition) {
    // authored summary, not a quote: labelled and set apart from the quoted lines below
    const when = el('p', 'rapid-exp__condition');
    when.appendChild(el('span', 'rapid-exp__when', 'When'));
    when.appendChild(document.createTextNode(tile.condition));
    exp.appendChild(when);
  }
  if (tile.warning) {
    const w = el('div', 'rapid-danger rapid-danger--warning');
    const head = el('p', 'rapid-danger__head');
    head.appendChild(svgIcon(ALERT_PATHS, 20));
    head.appendChild(el('span', undefined, 'Warning'));
    w.appendChild(head);
    const body = el('p', 'rapid-danger__body');
    renderRich(body, tile.warning.text);
    w.appendChild(body);
    exp.appendChild(w);
  }
  if (tile.layout === 'drug') buildDrug(s, tile, exp);
  else buildSteps(s, tile, exp);

  const open = el('button', 'rapid-open-consult', 'Open in consult');
  open.type = 'button';
  open.dataset.nodeId = tile.nodeIds[0];
  exp.appendChild(open);
}

/** Citations of every node the tile quotes (and its primary node), merged. */
function appendReferences(s: CardState, tile: RapidTile, exp: HTMLElement): void {
  const ids = new Set<string>([tile.nodeIds[0]]);
  if (tile.warning) ids.add(tile.warning.nodeId);
  const lines: readonly RapidExcerpt[] = tile.layout === 'drug' ? tile.lines ?? [] : tile.lines;
  for (const l of lines) ids.add(l.nodeId);
  if (tile.layout === 'steps' && tile.image) ids.add(tile.image.nodeId);
  const nums = new Set<number>();
  for (const n of s.opts.config.nodes) if (ids.has(n.id)) for (const c of n.citation ?? []) nums.add(c);
  if (nums.size > 0) renderInlineCitations(exp, [...nums].sort((x, y) => x - y), s.opts.config.citations);
}

function appendExcerpts(list: HTMLElement, lines: readonly RapidExcerpt[]): void {
  for (const ex of lines) {
    const li = el('li');
    renderRich(li, ex.text);
    list.appendChild(li);
  }
}

function buildSteps(s: CardState, tile: RapidStepsTile, exp: HTMLElement): void {
  const ol = el('ol', 'rapid-lines');
  appendExcerpts(ol, tile.lines);
  exp.appendChild(ol);
  if (tile.image) {
    const node = s.opts.config.nodes.find((n) => n.id === tile.image!.nodeId);
    const img = node?.images?.[tile.image.index];
    if (img) {
      const fig = el('figure', 'rapid-figure');
      const im = el('img');
      im.src = img.src;
      im.alt = img.alt;
      im.loading = 'lazy';
      fig.appendChild(im);
      if (img.caption) fig.appendChild(el('figcaption', undefined, img.caption));
      exp.appendChild(fig);
    }
  }
  appendReferences(s, tile, exp);
}

function buildDrug(s: CardState, tile: RapidDrugTile, exp: HTMLElement): void {
  const drug = getDrug(tile.drug.id);
  exp.appendChild(el('h3', 'rapid-exp__title', drug ? drug.name : tile.drug.id));
  exp.appendChild(el('p', 'rapid-exp__sub', tile.drug.indication));

  // the LIVE regimen, verbatim (no reflow into dose / route rows)
  const dose = drug?.dosing.find((d) => d.indication === tile.drug.indication);
  if (dose) {
    exp.appendChild(el('h4', 'rapid-exp__heading', 'Dosing'));
    for (const para of dose.regimen.split(/\n\s*\n/)) {
      if (para.trim() === '') continue;
      const p = el('p', 'rapid-regimen');
      renderRich(p, para.trim());
      exp.appendChild(p);
    }
  }

  // one weight box per snapshot (verified equal to the live weightCalc list)
  (tile.drug.weightCalcs ?? []).forEach((wc, i) => exp.appendChild(buildWeightBox(s, `${tile.id}-${i}`, wc)));

  if (tile.lines && tile.lines.length > 0) {
    exp.appendChild(el('h4', 'rapid-exp__heading', 'In this consult'));
    const ul = el('ul', 'rapid-lines');
    appendExcerpts(ul, tile.lines);
    exp.appendChild(ul);
  }

  if (RAPID_SHOW_DRUG_WARNINGS && drug && drug.contraindications && drug.contraindications.length > 0) {
    const box = el('div', 'rapid-danger');
    const head = el('p', 'rapid-danger__head');
    head.appendChild(svgIcon(ALERT_PATHS, 20));
    head.appendChild(el('span', undefined, `Contraindications (all uses of ${drug.name})`));
    box.appendChild(head);
    const ul = el('ul', 'rapid-danger__list');
    for (const c of drug.contraindications) {
      const li = el('li');
      renderRich(li, c, false);
      ul.appendChild(li);
    }
    box.appendChild(ul);
    exp.appendChild(box);
  }
  if (RAPID_SHOW_DRUG_WARNINGS && drug && drug.cautions && drug.cautions.length > 0) {
    const c = el('div', 'rapid-cautions');
    c.appendChild(el('p', 'rapid-cautions__head', `Cautions (all uses of ${drug.name})`));
    const ul = el('ul', 'rapid-cautions__list');
    for (const t of drug.cautions) {
      const li = el('li');
      renderRich(li, t, false);
      ul.appendChild(li);
    }
    c.appendChild(ul);
    exp.appendChild(c);
  }

  appendReferences(s, tile, exp);
  if (drug && drug.citations.length > 0) {
    const d = el('details', 'rapid-drug-refs');
    d.appendChild(el('summary', undefined, `Drug references (${drug.citations.length})`));
    const ul = el('ul');
    for (const c of drug.citations) ul.appendChild(el('li', undefined, c));
    d.appendChild(ul);
    exp.appendChild(d);
  }
}

// ---------------------------------------------------------------------------
// Weight box (Pharmacy math: calcDose / fmtNum)
// ---------------------------------------------------------------------------

/** Accepts a comma decimal ("2,5"). Returns null for empty, 'bad' outside 0.1-300 kg. */
function parseWeight(raw: string): number | null | 'bad' {
  const t = raw.trim().replace(',', '.');
  if (t === '') return null;
  if (!/^\d+(?:\.\d+)?$|^\.\d+$/.test(t)) return 'bad';
  const n = parseFloat(t);
  return n >= 0.1 && n <= 300 ? n : 'bad';
}

function buildWeightBox(s: CardState, boxId: string, wc: WeightCalcSnapshot): HTMLElement {
  const box = el('div', 'rapid-weight');
  box.dataset.tileId = boxId;
  box.appendChild(el('h4', 'rapid-weight__title', wc.label ?? 'Weight-based dose'));
  const label = el('label', 'rapid-weight__label', 'Weight (kg)');
  const inp = el('input', 'rapid-weight__input');
  inp.type = 'text';
  inp.inputMode = 'decimal';
  inp.autocomplete = 'off';
  inp.id = `rapid-weight-${boxId}`;
  label.htmlFor = inp.id;
  inp.value = s.weightKg === null ? '' : fmtNum(s.weightKg);
  const out = el('div', 'rapid-weight__out');
  out.setAttribute('aria-live', 'polite');
  inp.addEventListener('input', () => {
    const p = parseWeight(inp.value);
    setWeight(p === 'bad' ? null : p, inp);
    if (p === 'bad') showHint(box);
  });
  box.appendChild(label);
  box.appendChild(inp);
  box.appendChild(out);
  (box as unknown as { __wc: WeightCalc }).__wc = wc;
  refreshWeightOutput(s, box);
  return box;
}

function showHint(box: HTMLElement): void {
  const out = box.querySelector<HTMLElement>('.rapid-weight__out');
  if (out) out.textContent = 'Enter 0.1-300 kg';
}

function refreshWeightOutput(s: CardState, box: HTMLElement): void {
  const out = box.querySelector<HTMLElement>('.rapid-weight__out');
  const inp = box.querySelector<HTMLInputElement>('.rapid-weight__input');
  const wc = (box as unknown as { __wc?: WeightCalc }).__wc;
  if (!out || !inp || !wc) return;
  const parsed = parseWeight(inp.value);
  if (parsed === 'bad') { out.textContent = 'Enter 0.1-300 kg'; return; }
  if (parsed === null || s.weightKg === null) { out.textContent = ''; return; }
  const { dose, capped, rawDose } = calcDose(wc, parsed);
  out.textContent = '';
  const per = wc.dailyDivided ? `${fmtNum(wc.dosePerKg)} ${wc.unit}/kg/day / ${wc.dailyDivided}` : `${fmtNum(wc.dosePerKg)} ${wc.unit}/kg`;
  const line = el('p', 'rapid-weight__formula');
  line.appendChild(document.createTextNode(`${per} \u00D7 ${fmtNum(parsed)} kg = ${fmtNum(rawDose)} ${wc.unit}`));
  if (capped && wc.maxDose !== undefined) {
    line.appendChild(document.createTextNode(' \u2192 capped at max '));
    line.appendChild(el('strong', 'rapid-num', `${fmtNum(wc.maxDose)} ${wc.unit}`));
  } else {
    // uncapped: the product is the dose
    line.textContent = '';
    line.appendChild(document.createTextNode(`${per} \u00D7 ${fmtNum(parsed)} kg = `));
    line.appendChild(el('strong', 'rapid-num', `${fmtNum(dose)} ${wc.unit}`));
  }
  out.appendChild(line);
  if (wc.concentration && wc.concentration.amount > 0) {
    const ml = dose / wc.concentration.amount;
    out.appendChild(el('p', 'rapid-weight__note', `${fmtNum(dose)} ${wc.unit} = ${fmtNum(Math.round(ml * 100) / 100)} mL of ${wc.concentration.displayName}`));
  }
}
