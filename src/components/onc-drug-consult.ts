// myMedKitt — Oncology Drugs Side-effects: drug / regimen / class / cancer / complaint cards and the consult home.
// Data: src/data/onc-drugs (typed source, shipped in the bundle). Toxicity pages are real tree nodes
// (src/data/trees/onc-drug-side-effects.ts or any registered tree) opened through the normal consult flow.
// A card's two-line workup/treatment text is the target node's own `summary` + `citation`, read at render time.

import { ConsultFlowController } from '../services/consult-flow-controller.js';
import { getTreeConfig } from '../services/tree-service.js';
import type { TreeConfig } from '../services/tree-service.js';
import type { Citation } from '../data/trees/neurosyphilis.js';
import { router } from '../services/router.js';
import { isTreeHidden } from '../data/feature-flags.js';
import { renderContextualToolbar, removeContextualToolbar } from './contextual-toolbar.js';
import { getSpecialtyGradient } from './button-3d.js';
import { createCriticalActionsButton } from './critical-actions.js';
import { renderInlineCitations } from './reference-table.js';
import { renderBodyText } from './text-renderer.js';
import { isDoseCalcOptedOut } from '../data/dose-calc-optout.js';
import { addRecentConsult } from './dashboard.js';
import { showDrugModal } from './drug-store.js';
import { getDrug } from '../data/drug-store.js';
import { trackConsultOpen } from '../services/kittmd-analytics.js';
import { CONSULT_DISCLAIMER, RETURN_ROUTE_KEY } from './consult-flow.js';
import {
  ONC_TREE_ID, cardTitle, resolveEffects, virtualIds,
  normName, searchNames, regimenNames, shortTiming, boxedItems, displayBrands, splitEffects, plainEffectLine,
} from '../data/onc-drugs/index.js';
import type { Cancer, Cited, DrugConsultConfig, OncData, OncDrug, Regimen, ResolvedEffect, Toxicity, VirtualKind } from '../data/onc-drugs/index.js';
import { DRUG_CONSULTS } from '../data/drug-consults.js';

/** The consult being shown. ONE variable, assigned synchronously after the stale-hash guard in renderOncConsult and read at event time by listeners. */
interface Active { cfg: DrugConsultConfig; data: OncData; ids: ReturnType<typeof virtualIds> }
const activeOf = (treeId: string): Active => {
  const e = DRUG_CONSULTS[treeId] ?? DRUG_CONSULTS[ONC_TREE_ID];
  return { cfg: e.cfg, data: e.data, ids: virtualIds(e.cfg) };
};
let active: Active = activeOf(ONC_TREE_ID);

type Tab = 'complaint' | 'class' | 'cancer' | 'regimen';
const homeTabs = new Map<string, Tab>(); // per consult; absent = 'complaint'

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

const routeFor = (kind: VirtualKind, slug: string): string => `/tree/${active.cfg.treeId}/node/${active.ids.virtualNodeId(kind, slug)}`;

function button(cls: string, text: string, onClick: () => void): HTMLButtonElement {
  const b = el('button', cls, text);
  b.type = 'button';
  b.addEventListener('click', onClick);
  return b;
}

/** A full-width 56px row that navigates to an in-consult route. */
function linkRow(label: string, sub: string | undefined, route: string, stacked = false): HTMLButtonElement {
  const b = button(stacked ? 'onc-row onc-row--stacked' : 'onc-row', '', () => router.navigate(route));
  if (stacked && sub) {
    const col = el('span', 'onc-row__col');
    col.append(el('span', 'onc-row__label', label), el('span', 'onc-row__sub', sub));
    b.appendChild(col);
  } else {
    b.appendChild(el('span', 'onc-row__label', label));
    if (sub) b.appendChild(el('span', 'onc-row__sub', sub));
  }
  b.appendChild(el('span', 'onc-row__chev', '›'));
  return b;
}

// -------------------------------------------------------------------
// Per-page references: each page renumbers the sources it shows 1..n and makes the [n] chips tappable.
// -------------------------------------------------------------------

/** Same-paper test: equal DOI, else equal normalised first author + year + journal (and equal volume/pages when both give them). */
interface PaperId { doi?: string; author?: string; year?: string; journal?: string; loc?: string }

function paperId(text: string, url?: string): PaperId {
  const all = `${text} ${url ?? ''}`;
  const doi = all.match(/10\.\d{4,9}\/[^\s"<>,;]+/)?.[0].replace(/[.)\]]+$/, '').toLowerCase();
  const author = text.match(/^([A-Z][A-Za-z'\u2019-]+)\s+[A-Z]{1,3}\b/)?.[1].toLowerCase();
  const m = text.match(/\.\s+([A-Z][^.]{1,60}?)\.\s+((?:19|20)\d\d)\b([;:]\s*[\w()]+(?::[\w-]+)?)?/);
  return { doi, author, year: m?.[2], journal: m?.[1].toLowerCase().replace(/[^a-z0-9]+/g, ''), loc: m?.[3]?.replace(/[^\w:()-]/g, '').toLowerCase() };
}

export function samePaper(a: PaperId, b: PaperId): boolean {
  if (a.doi && b.doi) return a.doi === b.doi;
  if (!a.author || !a.year || !a.journal || !b.author || !b.year || !b.journal) return false;
  if (a.author !== b.author || a.year !== b.year || a.journal !== b.journal) return false;
  return !(a.loc && b.loc && a.loc !== b.loc);
}

class Refs {
  readonly list: Citation[] = [];
  private entries: { n: number; id: PaperId; key: string }[] = [];
  constructor(private data: OncData, private root: () => HTMLElement | null) {}

  private num(key: string, text: string, url?: string): number {
    const id = paperId(text, url);
    const hit = this.entries.find((e) => e.key === key || samePaper(e.id, id));
    if (hit) return hit.n;
    const n = this.list.length + 1;
    this.entries.push({ n, id, key });
    this.list.push({ num: n, text });
    return n;
  }

  fromSource(key: string): number {
    const s = this.data.sources[key];
    return this.num(`s:${key}`, s ? [s.text, s.revised ? `Revised ${s.revised}` : '', s.url ?? ''].filter(Boolean).join(' ') : key, s?.url);
  }

  fromTree(tree: string, cfg: TreeConfig | null, n: number): number {
    const c = cfg?.citations.find((x) => x.num === n);
    return this.num(`t:${tree}#${n}`, c ? c.text : `${tree} reference ${n}`);
  }

  chips(nums: number[]): HTMLElement {
    const wrap = el('span', 'onc-cites');
    for (const n of nums) {
      const b = el('button', 'onc-cite', String(n));
      b.type = 'button';
      b.setAttribute('aria-label', `Reference ${n}`);
      b.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const root = this.root();
        const details = root?.querySelector<HTMLDetailsElement>('.reference-citations-inline');
        if (!details) return;
        details.open = true;
        const item = details.querySelector<HTMLElement>(`[data-cite-num="${n}"]`);
        item?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        item?.classList.add('onc-cite-flash');
        setTimeout(() => item?.classList.remove('onc-cite-flash'), 1800);
      });
      wrap.appendChild(b);
    }
    return wrap;
  }

  /** Text of a Cited claim followed by its reference chips. */
  /** Like cited(), but the text before the first colon (up to 50 characters) is shown bold as a head: presentation only, the text is unchanged. */
  citedHead(tag: 'li' | 'p', cls: string, c: Cited): HTMLElement {
    const e = el(tag, cls);
    const k = c.v.indexOf(':');
    if (k > 0 && k <= 50) {
      e.appendChild(el('strong', 'onc-head', c.v.slice(0, k + 1)));
      e.appendChild(document.createTextNode(c.v.slice(k + 1)));
    } else e.appendChild(document.createTextNode(c.v));
    if (c.cite.length) e.appendChild(this.chips(c.cite.map((x) => this.fromSource(x))));
    return e;
  }

  cited(tag: 'p' | 'span' | 'li', cls: string, c: Cited): HTMLElement {
    const e = el(tag, cls);
    e.appendChild(document.createTextNode(c.v));
    if (c.cite.length) e.appendChild(this.chips(c.cite.map((k) => this.fromSource(k))));
    return e;
  }

  /** The "References (n)" list; call after everything on the page has been added. */
  render(into: HTMLElement): void {
    if (this.list.length) renderInlineCitations(into, this.list.map((c) => c.num), this.list);
  }
}

// -------------------------------------------------------------------
// Page chrome
// -------------------------------------------------------------------

function header(main: HTMLElement, title: string): void {
  const h = el('div', 'consult-flow-header');
  h.style.background = getSpecialtyGradient(active.cfg.categoryId);
  const back = el('button', 'consult-flow-header__back', '←');
  back.setAttribute('aria-label', 'Back');
  back.addEventListener('click', () => {
    if (window.history.length > 1) window.history.back();
    else router.navigate(`/category/${active.cfg.categoryId}`);
  });
  const t = el('div', 'consult-flow-header__title', title);
  const home = el('button', 'consult-flow-header__home', '🏠');
  home.setAttribute('aria-label', 'Home');
  home.addEventListener('click', () => { removeContextualToolbar(); router.navigate('/'); });
  h.append(back, t, home);
  main.appendChild(h);
}

function notFound(main: HTMLElement, what: string): void {
  const box = el('div', 'onc-notfound');
  box.setAttribute('role', 'status');
  box.appendChild(el('h2', 'onc-notfound__title', 'Not found'));
  box.appendChild(el('p', 'onc-notfound__text', `${what} is not in this consult.`));
  box.appendChild(button('onc-btn', `Back to ${active.cfg.title}`, () => router.navigate(`/tree/${active.cfg.treeId}`)));
  main.appendChild(box);
}

let jumpHooked = false;
/**
 * Info overlays (the Stop pages), the Decision Map and jump buttons announce a node with `medkitt-jump-node`. Only the consult flow listens,
 * and the drug / home pages here are not the consult flow, so on these pages the event is turned into a normal route to that node.
 * Capture phase + stopImmediatePropagation so a consult flow left over from an earlier visit cannot re-render itself over this page.
 */
function hookJumpEvents(): void {
  if (jumpHooked) return;
  jumpHooked = true;
  window.addEventListener('medkitt-jump-node', ((e: CustomEvent) => {
    if (!document.querySelector('.onc-body')) return; // not showing an oncology card/home page: the consult flow handles it
    const id = e.detail;
    if (typeof id !== 'string' || !id) return;
    e.stopImmediatePropagation();
    try { sessionStorage.setItem(RETURN_ROUTE_KEY, window.location.hash.replace(/^#/, '') || `/tree/${active.cfg.treeId}`); } catch { /* back falls through to the category */ }
    router.navigate(`/tree/${active.cfg.treeId}/node/${id}`);
  }) as EventListener, true);
}

/** Entry point from app.ts. `nodeId` is a virtual odse-<kind>-<slug> id, or undefined for the consult home. */
export async function renderOncConsult(main: HTMLElement, nodeId?: string, treeId: string = ONC_TREE_ID): Promise<void> {
  const requested = window.location.hash;
  const cfg = isTreeHidden(treeId) ? null : await getTreeConfig(treeId);
  if (window.location.hash !== requested) return; // user already moved on
  active = activeOf(treeId); // after the await and the stale guard, never before
  const TITLE = active.cfg.title;
  const CATEGORY_ID = active.cfg.categoryId;
  main.innerHTML = '';
  main.classList.add('onc-root');
  document.querySelector<HTMLElement>('.app-header')?.style.removeProperty('display');
  if (!cfg) {
    removeContextualToolbar();
    header(main, TITLE);
    notFound(main, TITLE);
    return;
  }

  hookJumpEvents();
  addRecentConsult(active.cfg.treeId, TITLE, CATEGORY_ID);
  trackConsultOpen(active.cfg.treeId);

  const data = active.data;
  const body = el('div', 'onc-body');
  const refs = new Refs(data, () => body);
  header(main, TITLE);
  main.appendChild(body);

  const parsed = nodeId ? active.ids.parseVirtualNodeId(nodeId) : null;
  if (!nodeId) renderHome(body, data);
  else if (!parsed) notFound(body, 'This page');
  else {
    const found = renderVirtual(body, data, refs, cfg, parsed.kind, parsed.slug);
    if (!found) notFound(body, 'This page');
  }

  body.appendChild(el('div', 'wizard-disclaimer', CONSULT_DISCLAIMER));

  // Overlay and calculator actions only: a `jump` action would act on a controller that is not showing a tree node.
  const controller = new ConsultFlowController(cfg.nodes);
  renderContextualToolbar(active.cfg.treeId, controller, cfg.entryNodeId, cfg.moduleLabels);
  // The red Critical button stays on the consult home only: drug, class, cancer, regimen and complaint pages need the first screen for content.
  // The management pages (real tree nodes) keep it through the normal consult flow.
  if (!nodeId && cfg.criticalActions && cfg.criticalActions.length > 0) {
    const bar = el('div', 'onc-critical');
    bar.appendChild(createCriticalActionsButton({
      actions: cfg.criticalActions,
      consultTitle: TITLE,
      onJumpToNode: (id) => router.navigate(`/tree/${active.cfg.treeId}/node/${id}`),
    }));
    body.insertBefore(bar, body.firstChild);
  }
  main.scrollTop = 0;
}

// -------------------------------------------------------------------
// Consult home: filter box + Complaint / Class / Cancer tabs
// -------------------------------------------------------------------

function countLabel(n: number): string { return `${n} ${n === 1 ? 'drug' : 'drugs'}`; }

function renderHome(body: HTMLElement, data: OncData): void {
  const cfg = active.cfg;
  const browse = data.browseClasses ?? data.classes;
  const classCount = new Map<string, number>();
  const cancerCount = new Map<string, number>();
  for (const d of data.drugs) {
    for (const c of d.browseClassIds ?? d.classIds) classCount.set(c, (classCount.get(c) ?? 0) + 1);
    for (const c of d.cancers) cancerCount.set(c, (cancerCount.get(c) ?? 0) + 1);
  }
  const filter = el('input', 'onc-filter');
  filter.type = 'search';
  filter.placeholder = cfg.filterPlaceholder;
  filter.setAttribute('aria-label', 'Filter');
  filter.autocomplete = 'off';
  filter.setAttribute('autocapitalize', 'off');

  const tabs = el('div', 'onc-tabs');
  tabs.setAttribute('role', 'tablist');
  const out = el('div', 'onc-list');
  const defs: [Tab, string][] = [['complaint', 'Complaint'], ['class', 'Class'], ['cancer', cfg.indicationTab], ['regimen', 'Regimen']];
  const tabBtns = defs.map(([id, label]) => {
    const b = el('button', 'onc-tab', label);
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.addEventListener('click', () => { homeTabs.set(cfg.treeId, id); paint(); });
    tabs.appendChild(b);
    return { id, b };
  });

  // Only the list is rebuilt while typing: re-rendering the input would drop focus and the keyboard.
  function paint(): void {
    const homeTab = homeTabs.get(cfg.treeId) ?? 'complaint';
    for (const { id, b } of tabBtns) {
      b.classList.toggle('onc-tab--on', id === homeTab);
      b.setAttribute('aria-selected', String(id === homeTab));
    }
    out.textContent = '';
    const q = normName(filter.value);
    let matched = 0;
    const has = (...names: (string | undefined)[]) => !q || names.some((n) => n && normName(n).includes(q));

    if (q.length >= 2) {
      // exact generic / brand / alias first, then names that start with the text, then names that contain it
      const rankOf = (names: string[]): number => {
        const ns = names.map(normName);
        return ns.some((n) => n === q) ? 0 : ns.some((n) => n.startsWith(q)) ? 1 : ns.some((n) => n.includes(q)) ? 2 : 3;
      };
      const drugs = data.drugs.map((d) => ({ d, r: rankOf(searchNames(d)) })).filter((x) => x.r < 3).sort((a, b) => a.r - b.r).map((x) => x.d);
      const regs = data.regimens.map((r) => ({ r, k: rankOf([...regimenNames(r), r.expansion]) })).filter((x) => x.k < 3).sort((a, b) => a.k - b.k).map((x) => x.r);
      matched = drugs.length + regs.length;
      if (matched) {
        out.appendChild(el('h2', 'onc-section', 'Drugs and regimens'));
        for (const d of drugs) out.appendChild(linkRow(d.generic, [d.brands.join(', '), browse.find((c) => (d.browseClassIds ?? d.classIds)[0] === c.id)?.name].filter(Boolean).join(' \u00B7 '), routeFor('drug', d.id), true));
        for (const r of regs) out.appendChild(linkRow(`${r.acronym} (${r.expansion})`, 'Regimen', routeFor('reg', r.id)));
      }
    }

    if (homeTab === 'complaint') {
      const items = [...data.complaints].sort((a, b) => a.order - b.order).filter((c) => has(c.label));
      const grid = el('div', 'onc-grid');
      for (const c of items) grid.appendChild(button('onc-tile', c.label, () => router.navigate(routeFor('cx', c.id))));
      out.appendChild(grid);
      if (!items.length && !matched) out.appendChild(emptyNote(data.complaints.length === 0, q));
    } else if (homeTab === 'class') {
      const items = browse.filter((c) => has(c.name));
      // sections by class id prefix only (no clinical grouping): cyto- / tgt- / horm- / bio- and the checkpoint-inhibitor classes
      const section = (id: string): string => id.startsWith('cyto-') ? 'Cytotoxic chemotherapy' : id.startsWith('tgt-') ? 'Targeted therapy' : id.startsWith('horm-') ? 'Hormonal therapy'
        : id.startsWith('bio-') ? 'Antibodies and cell therapies' : ['pd1', 'pdl1', 'ctla4', 'lag3-pd1'].includes(id) ? 'Immune checkpoint inhibitors' : 'Other classes';
      const txSections = cfg.classSections;
      const sectionOf = txSections ? (id: string): string => txSections[id] ?? 'Other classes' : section;
      const order = txSections ? [...cfg.classSectionOrder, 'Other classes'] : cfg.classSectionOrder;
      for (const name of order) {
        const group = items.filter((c) => sectionOf(c.id) === name);
        if (!group.length) continue;
        out.appendChild(el('h3', 'onc-letter', `${name} (${group.length})`));
        for (const c of group) out.appendChild(linkRow(c.name, countLabel(classCount.get(c.id) ?? 0), routeFor('class', c.id)));
      }
      if (!items.length && !matched) out.appendChild(emptyNote(browse.length === 0, q));
    } else if (homeTab === 'regimen') {
      // every regimen, alphabetical by acronym, whether or not its acronym is pinned in Home search
      const items = data.regimens.filter((r) => has(...regimenNames(r), r.expansion)).sort((a, b) => a.acronym.localeCompare(b.acronym, 'en', { sensitivity: 'base' }));
      for (const r of items) out.appendChild(linkRow(r.acronym, r.expansion.length > 60 ? `${r.expansion.slice(0, 57)}...` : r.expansion, routeFor('reg', r.id)));
      if (!items.length && !matched) out.appendChild(emptyNote(data.regimens.length === 0, q));
    } else {
      if (cfg.indicationTypes) {
        // browse by plain cancer type (alphabetical, with drug counts); entries with no type sit under "Other label indications"
        const rows = typeRows(data).filter((r) => has(r.name, ...r.cancers.flatMap((c) => [c.name, ...(c.aliases ?? [])]), ...r.drugs.flatMap((d) => searchNames(d))));
        for (const r of rows) out.appendChild(linkRow(r.name, countLabel(r.drugs.length), routeFor('ctype', r.id)));
        if (!rows.length && !matched) out.appendChild(emptyNote(data.cancers.length === 0, q));
      } else {
        // no grouping: a flat list of the indications (organs), with drug counts
        const rows = data.cancers.map((c) => ({ c, drugs: data.drugs.filter((d) => d.cancers.includes(c.id)) }))
          .filter((r) => r.drugs.length > 0 && has(r.c.name, ...(r.c.aliases ?? []), ...r.drugs.flatMap((d) => searchNames(d))));
        for (const r of rows) out.appendChild(linkRow(r.c.name, countLabel(r.drugs.length), routeFor(cfg.indicationKind, r.c.id)));
        // organ consults: cards whose label names no organ sit in one group (absent when there is no such card)
        const noOrgan = cfg.indicationKind === 'organ' ? data.drugs.filter((d) => d.cancers.length === 0 && has(NO_ORGAN_NAME, ...searchNames(d))) : [];
        if (noOrgan.length) out.appendChild(linkRow(NO_ORGAN_NAME, countLabel(noOrgan.length), routeFor('organ', NO_ORGAN_SLUG)));
        if (!rows.length && !noOrgan.length && !matched) out.appendChild(emptyNote(data.cancers.length === 0, q));
      }
    }
  }
  filter.addEventListener('input', paint);
  body.append(filter, tabs, out);
  paint();
}

function emptyNote(dataEmpty: boolean, q: string): HTMLElement {
  return el('p', 'onc-empty', dataEmpty ? 'No entries loaded yet.' : q ? 'No match. Try a shorter name.' : 'Nothing here.');
}

// -------------------------------------------------------------------
// Virtual pages
// -------------------------------------------------------------------

function renderVirtual(body: HTMLElement, data: OncData, refs: Refs, cfg: TreeConfig | null, kind: VirtualKind, slug: string): boolean {
  switch (kind) {
    case 'drug': {
      const d = data.drugs.find((x) => x.id === slug);
      if (!d) return false;
      return renderDrug(body, data, refs, d), true;
    }
    case 'reg': {
      const r = data.regimens.find((x) => x.id === slug);
      if (!r) return false;
      return renderRegimen(body, data, refs, r), true;
    }
    case 'class': return renderClass(body, data, refs, slug);
    case 'cancer':
    case 'organ': return renderCancer(body, data, refs, slug);
    case 'ctype': return renderCancerType(body, data, refs, slug);
    case 'cx': return renderComplaint(body, data, refs, slug, cfg);
  }
}

/** Open a toxicity page; back from it returns to the page the user is on now. */
function openTox(tox: Toxicity): void {
  try { sessionStorage.setItem(RETURN_ROUTE_KEY, window.location.hash.replace(/^#/, '') || `/tree/${active.cfg.treeId}`); } catch { /* private mode: back falls through to the category */ }
  router.navigate(`/tree/${tox.page.tree}/node/${tox.page.node}`);
}

const cfgCache = new Map<string, Promise<TreeConfig | null>>();
function treeOf(tree: string): Promise<TreeConfig | null> {
  let p = cfgCache.get(tree);
  if (!p) { p = getTreeConfig(tree).catch(() => null); cfgCache.set(tree, p); }
  return p;
}

/** Per consult; oncology's stored strings are exactly 'medkitt-onc-open:<id>'. */
const openKeyPrefix = (): string => `medkitt-${active.cfg.key}-open:`;
function readOpen(key: string): Set<string> | null {
  try { const r = sessionStorage.getItem(openKeyPrefix() + key); return r ? new Set(JSON.parse(r) as string[]) : null; } catch { return null; }
}
function writeOpen(key: string, set: Set<string>): void {
  try { sessionStorage.setItem(openKeyPrefix() + key, JSON.stringify([...set])); } catch { /* private mode: state just resets */ }
}

function chipLink(label: string, route: string): HTMLAnchorElement {
  const a = el('a', 'onc-chip', label);
  a.href = `#${route}`;
  return a;
}

function renderDrug(body: HTMLElement, data: OncData, refs: Refs, d: OncDrug): void {
  const card = el('article', 'onc-card');

  // identity: generic and brands are one visual unit; the patient says the brand
  const id = el('section', 'onc-identity');
  const names = el('h1', 'onc-identity__names');
  names.appendChild(el('span', 'onc-identity__name', d.generic));
  // a brand that is just another brand plus a formulation suffix ("Jevtana Kit" beside "Jevtana") is not shown twice
  const shownBrands = displayBrands(d);
  const BRAND_CAP = 3;
  if (shownBrands.length) {
    const brandEl = el('span', 'onc-identity__brand');
    const paintBrands = (all: boolean): void => {
      brandEl.textContent = (all ? shownBrands : shownBrands.slice(0, BRAND_CAP)).join(' \u00B7 ');
      if (shownBrands.length > BRAND_CAP) {
        const more = el('button', 'onc-brand-more', all ? 'fewer' : `+${shownBrands.length - BRAND_CAP}`);
        more.type = 'button';
        more.setAttribute('aria-expanded', String(all));
        more.setAttribute('aria-label', all ? 'Show fewer brand names' : `Show ${shownBrands.length - BRAND_CAP} more brand names`);
        more.addEventListener('click', () => paintBrands(!all));
        brandEl.append(' ', more);
      }
    };
    paintBrands(false);
    names.appendChild(brandEl);
  }
  id.appendChild(names);
  // secondary brand line: discontinued brands and brands of the same drug for non-oncologic products, one small line that truncates with "+N more"
  const secondary: { name: string; group: 'former' | 'other' }[] = [
    ...(d.formerBrands ?? []).map((name) => ({ name, group: 'former' as const })),
    ...(d.searchOnlyBrands ?? []).map((name) => ({ name, group: 'other' as const })),
  ];
  if (secondary.length) {
    let used = 0; let shown = 0;
    for (const b of secondary) { if (shown > 0 && used + b.name.length > 30) break; used += b.name.length + 2; shown++; }
    const line = el('p', 'onc-former');
    const label = (items: typeof secondary): string => {
      const f = items.filter((x) => x.group === 'former').map((x) => x.name);
      const o = items.filter((x) => x.group === 'other').map((x) => x.name);
      return [f.length ? 'FDA-listed as discontinued: ' + f.join(', ') : '', o.length ? 'other FDA-listed brands: ' + o.join(', ') : ''].filter(Boolean).join(' \u00B7 ');
    };
    const paintFormer = (all: boolean): void => {
      line.textContent = '';
      line.classList.toggle('onc-former--open', all);
      line.appendChild(el('span', 'onc-former__text', label(all ? secondary : secondary.slice(0, shown))));
      if (secondary.length > shown) {
        const more = el('button', 'onc-brand-more', all ? 'fewer' : `+${secondary.length - shown} more`);
        more.type = 'button';
        more.setAttribute('aria-expanded', String(all));
        more.addEventListener('click', () => paintFormer(!all));
        line.appendChild(more);
      }
    };
    paintFormer(false);
    id.appendChild(line);
  }
  if (d.labelAge) id.appendChild(el('p', 'onc-label-age', d.labelAge));
  if (d.brandSource) refs.fromSource(d.brandSource); // listed in the card's references, nothing else shown

  const classes = d.classIds.map((c) => data.classes.find((x) => x.id === c)).filter((c): c is NonNullable<typeof c> => !!c);
  const browseList = data.browseClasses ?? data.classes;
  const chipClasses = (d.browseClassIds ?? d.classIds).map((c) => browseList.find((x) => x.id === c)).filter((c): c is NonNullable<typeof c> => !!c);
  if (chipClasses.length) {
    const row = el('div', 'onc-identity__chips');
    for (const c of chipClasses) row.appendChild(chipLink(c.name, routeFor('class', c.id)));
    row.appendChild(refs.chips([refs.fromSource(d.label)])); // the FDA label this card is anchored to
    id.appendChild(row);
  }

  const mech = d.mechanism ?? classes[0]?.mechanism;
  if (mech) {
    const m = el('button', 'onc-mech');
    m.type = 'button';
    m.setAttribute('aria-expanded', 'false');
    m.appendChild(el('span', 'onc-mech__text', mech.v));
    m.appendChild(el('span', 'onc-mech__more', 'more'));
    m.addEventListener('click', () => {
      const open = m.getAttribute('aria-expanded') !== 'true';
      m.setAttribute('aria-expanded', String(open));
      m.querySelector('.onc-mech__more')!.textContent = open ? 'less' : 'more';
    });
    id.appendChild(m);
    if (mech.cite.length) {
      const cites = refs.chips(mech.cite.map((k) => refs.fromSource(k)));
      cites.classList.add('onc-mech__cites');
      id.appendChild(cites); // a sibling of the button: a chip is a button and cannot sit inside one
    }
  }

  const cancers = d.cancers.map((c) => data.cancers.find((x) => x.id === c)).filter((c): c is NonNullable<typeof c> => !!c);
  if (cancers.length) {
    // the first names that fit one line, the rest behind "+N more" (expands in place, every name still tappable)
    let used = 0;
    let shown = 0;
    for (const c of cancers) { if (shown > 0 && used + c.name.length > 36) break; used += c.name.length + 2; shown++; }
    const row = el('div', 'onc-cancers');
    const list = el('span', 'onc-cancers__list');
    const more = el('button', 'onc-cancers__more');
    more.type = 'button';
    const paint = (open: boolean): void => {
      list.textContent = '';
      (open ? cancers : cancers.slice(0, shown)).forEach((c, i) => {
        if (i) list.appendChild(document.createTextNode(', '));
        const a = el('a', 'onc-link', c.name);
        a.href = `#${routeFor(active.cfg.indicationKind, c.id)}`;
        list.appendChild(a);
      });
      more.setAttribute('aria-expanded', String(open));
      more.textContent = open ? 'Show fewer' : `+${cancers.length - shown} more`;
      row.classList.toggle('onc-cancers--open', open);
    };
    more.addEventListener('click', () => paint(more.getAttribute('aria-expanded') !== 'true'));
    paint(false);
    row.appendChild(list);
    if (cancers.length > shown) row.appendChild(more);
    id.appendChild(row);
  }
  card.appendChild(id);
  if (active.cfg.cardNote) card.appendChild(el('p', 'onc-card-note', active.cfg.cardNote));
  for (const note of active.cfg.drugNotes?.[d.id] ?? []) card.appendChild(el('p', 'onc-card-note onc-card-note--drug', note));

  // FDA boxed warning: collapsed to one compact block (label, item count, each item's head), full items with chips on demand.
  // The head is the text before the item's first colon; an item with no colon is shown in full (the gate reports those).
  const boxed = boxedItems(d);
  if (boxed.length) {
    const bw = el('section', 'onc-boxed');
    bw.setAttribute('aria-label', 'FDA boxed warning');
    const titleRow = el('div', 'onc-boxed__row');
    titleRow.appendChild(el('h2', 'onc-boxed__title', boxed.length > 1 ? `\u26A0 FDA boxed warning (${boxed.length} items)` : '\u26A0 FDA boxed warning'));
    bw.appendChild(titleRow);
    const heads = el('p', 'onc-boxed__heads', boxed.map((it) => { const i = it.v.indexOf(':'); return i > 0 ? it.v.slice(0, i) : it.v; }).join(' \u00B7 '));
    bw.appendChild(heads);
    const ul = el('ul', 'onc-boxed__list');
    ul.hidden = true;
    for (const it of boxed) ul.appendChild(refs.cited('li', 'onc-boxed__text', it));
    bw.appendChild(ul);
    const toggle = el('button', 'onc-boxed__more');
    toggle.type = 'button';
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Show full warning';
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Hide full warning' : 'Show full warning';
      ul.hidden = !open;
      heads.hidden = open;
    });
    titleRow.appendChild(toggle);
    card.appendChild(bw);
  }

  // serious adverse effects: compact rows, most lethal first; tap a row to open it in place
  const split = splitEffects(resolveEffects(d, data), active.cfg.rowCategories);
  const all = split.rows;
  const plainLines = split.plain;
  const effects = all.filter((e) => e.basis !== 'postmarketing');
  const reported = all.filter((e) => e.basis === 'postmarketing');
  if (effects.length) card.appendChild(el('h2', 'onc-section', 'Serious adverse effects'));
  else if (!reported.length && !boxedItems(d).length && (d.alsoOnLabel?.length || plainLines.length)) card.appendChild(el('p', 'onc-no-effects', 'No label warning with an emergency presentation; see below.'));
  const open = readOpen(d.id) ?? new Set<string>();
  const addRow = (parent: HTMLElement, e: (typeof all)[number]): void => {
    parent.appendChild(effectRow(refs, e, open.has(e.tox.id), (isOpen) => {
      if (isOpen) open.add(e.tox.id); else open.delete(e.tox.id);
      writeOpen(d.id, open);
    }));
  };
  for (const e of effects) addRow(card, e);
  // effects the label lists only from post-approval reports: a collapsed second group, same rows, same links
  if (reported.length) {
    const GROUP = '__reported';
    const groupOpen = open.has(GROUP);
    const head = el('button', 'onc-group-toggle');
    head.type = 'button';
    head.setAttribute('aria-expanded', String(groupOpen));
    head.setAttribute('aria-controls', 'onc-reported');
    head.appendChild(el('span', 'onc-group-toggle__label', `Reported after approval (${reported.length})`));
    head.appendChild(el('span', 'onc-effect__chev', '\u203A'));
    const box = el('div', 'onc-group');
    box.id = 'onc-reported';
    box.hidden = !groupOpen;
    for (const e of reported) addRow(box, e);
    head.addEventListener('click', () => {
      const next = head.getAttribute('aria-expanded') !== 'true';
      head.setAttribute('aria-expanded', String(next));
      box.hidden = !next;
      if (next) open.add(GROUP); else open.delete(GROUP);
      writeOpen(d.id, open);
    });
    card.append(head, box);
  }

  // drug interactions: its own collapsed section (lines in array order), directly under the effect rows and above "Also on the label"
  if (d.interactions?.length) {
    const sec = el('section', 'onc-label onc-interactions');
    const head = el('button', 'onc-group-toggle');
    head.type = 'button';
    head.setAttribute('aria-expanded', 'false');
    head.appendChild(el('span', 'onc-group-toggle__label', `Drug interactions (${d.interactions.length})`));
    head.appendChild(el('span', 'onc-effect__chev', '\u203A'));
    const ul = el('ul', 'onc-label__list');
    ul.hidden = true;
    for (const it of d.interactions) ul.appendChild(refs.citedHead('li', 'onc-label__item', it));
    head.addEventListener('click', () => {
      const next = head.getAttribute('aria-expanded') !== 'true';
      head.setAttribute('aria-expanded', String(next));
      ul.hidden = !next;
    });
    sec.append(head, ul);
    card.appendChild(sec);
  }

  // also on the label: warnings and interactions with no management page; plain styling (danger colours are for the boxed warning)
  if (d.alsoOnLabel?.length || plainLines.length) {
    const SHOW = 3;
    const sec = el('section', 'onc-label');
    sec.appendChild(el('h2', 'onc-section', 'Also on the label'));
    const ul = el('ul', 'onc-label__list');
    const extra: HTMLElement[] = [];
    const items: { it: Cited; boxed: boolean }[] = [...plainLines.map((e) => ({ it: plainEffectLine(e), boxed: e.boxed === true })), ...(d.alsoOnLabel ?? []).map((it) => ({ it, boxed: false }))];
    items.forEach(({ it, boxed }, i) => {
      const li = refs.citedHead('li', 'onc-label__item', it);
      if (boxed) li.insertBefore(el('span', 'onc-boxed-mark', 'Boxed warning'), li.firstChild);
      if (i >= SHOW) { li.hidden = true; extra.push(li); }
      ul.appendChild(li);
    });
    sec.appendChild(ul);
    if (extra.length) {
      const more = el('button', 'onc-label__more');
      more.type = 'button';
      more.setAttribute('aria-expanded', 'false');
      const paint = (open: boolean): void => {
        extra.forEach((li) => { li.hidden = !open; });
        more.setAttribute('aria-expanded', String(open));
        more.textContent = open ? 'Show fewer' : `${extra.length} more`;
      };
      more.addEventListener('click', () => paint(more.getAttribute('aria-expanded') !== 'true'));
      paint(false);
      sec.appendChild(more);
    }
    card.appendChild(sec);
  }

  // pharmacy
  if (d.pharmacyDrugId && getDrug(d.pharmacyDrugId)) {
    const pid = d.pharmacyDrugId;
    card.appendChild(button('onc-btn onc-btn--full', 'Dosing (Pharmacy)', () => { showDrugModal(pid); }));
  }

  body.appendChild(card);
  refs.render(body);
}

function effectRow(refs: Refs, e: ResolvedEffect, startOpen: boolean, onToggle: (open: boolean) => void): HTMLElement {
  // flagged when the effect is a hazard in the drug's boxed warning or its toxicity is tier 1
  const top = e.boxed === true || e.tox.lethality === 1;
  const row = el('section', top ? 'onc-effect onc-effect--top' : 'onc-effect');
  const panelId = `onc-fx-${e.tox.id}`;

  const toggle = el('button', 'onc-effect__toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', String(startOpen));
  toggle.setAttribute('aria-controls', panelId);
  const left = el('span', 'onc-effect__main');
  const lab = el('span', 'onc-effect__label', e.tox.label);
  lab.title = e.tox.label;
  left.appendChild(lab);
  if (top || e.boxed) {
    const flags = el('span', 'onc-flags');
    if (top) flags.appendChild(el('span', 'onc-flag', '⚠ Life-threatening'));
    if (e.boxed) flags.appendChild(el('span', 'onc-boxed-mark', 'Boxed warning'));
    left.appendChild(flags);
  }
  toggle.appendChild(left);
  if (e.timing) {
    const badgeText = shortTiming(e.timing.v, active.cfg.timingTimeUnits === true);
    // a long badge (a whole sentence) drops to its own full-width line under the name, so it wraps cleanly and the chevron stays on screen
    toggle.appendChild(el('span', badgeText.length > 60 ? 'onc-badge onc-badge--long' : 'onc-badge', badgeText)); // no stated onset: no badge
  }
  toggle.appendChild(el('span', 'onc-effect__chev', '›'));
  row.appendChild(toggle);

  const panel = el('div', 'onc-effect__panel');
  panel.id = panelId;
  panel.hidden = !startOpen;
  toggle.addEventListener('click', () => {
    const next = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(next));
    panel.hidden = !next;
    onToggle(next);
  });

  if (e.tox.label.length > 36) panel.appendChild(el('p', 'onc-effect__full', e.tox.label)); // the collapsed row clamps long names
  if (e.timing) panel.appendChild(refs.cited('p', 'onc-effect__timing', e.timing));
  if (e.cite.length) {
    const src = el('p', 'onc-effect__sources', 'Sources');
    src.appendChild(refs.chips(e.cite.map((k) => refs.fromSource(k))));
    panel.appendChild(src);
  }
  if (e.note) panel.appendChild(refs.cited('p', 'onc-effect__note', e.note));
  if (e.quirk) panel.appendChild(refs.cited('p', 'onc-effect__quirk', e.quirk));
  if (e.ask.length) {
    panel.appendChild(el('h3', 'onc-ask__for', 'Ask about'));
    const ul = el('ul', 'onc-ask__list');
    for (const q of e.ask) ul.appendChild(refs.cited('li', 'onc-ask__q', q));
    panel.appendChild(ul);
  }

  // management summary: the target node's own words, filled in once the tree is read
  const line = el('p', 'onc-effect__line');
  panel.appendChild(line);
  void treeOf(e.tox.page.tree).then((cfg) => {
    const node = cfg?.nodes.find((n) => n.id === e.tox.page.node);
    if (!node || !node.summary) { line.remove(); return; }
    renderBodyText(line, node.summary, { noDoseCalc: isDoseCalcOptedOut(node.id) });
    const nums = (node.citation ?? []).map((n) => refs.fromTree(e.tox.page.tree, cfg, n));
    if (nums.length) {
      line.appendChild(refs.chips(nums));
      // the reference list is already on screen: rebuild it so the new numbers show
      const old = line.closest('.onc-body')?.querySelector('.reference-citations-inline');
      if (old) { const host = old.parentElement as HTMLElement; old.remove(); refs.render(host); }
    }
  });

  panel.appendChild(button('onc-btn onc-btn--full', 'Workup & treatment →', () => openTox(e.tox)));
  for (const m of e.tox.more ?? []) {
    panel.appendChild(button('onc-more', m.label, () => router.navigate(m.anchor ? `/info/${m.info}/at/${m.anchor}` : `/info/${m.info}`)));
  }
  row.appendChild(panel);
  return row;
}

function renderRegimen(body: HTMLElement, data: OncData, refs: Refs, r: Regimen): void {
  const card = el('article', 'onc-card');
  const id = el('section', 'onc-identity');
  id.appendChild(el('h1', 'onc-identity__name', r.acronym));
  id.appendChild(el('p', 'onc-identity__mech', r.expansion));
  if (r.cite.length) id.appendChild(refs.chips(r.cite.map((k) => refs.fromSource(k))));
  card.appendChild(id);
  card.appendChild(el('h2', 'onc-section', 'Drugs in this regimen'));
  for (const did of r.drugs) {
    const d = data.drugs.find((x) => x.id === did);
    if (d) { card.appendChild(linkRow(cardTitle(d), undefined, routeFor('drug', d.id))); continue; }
    // a component without a card yet: plain text, never a dead link
    const u = r.uncarded?.find((x) => x.id === did);
    if (u) {
      const row = el('div', 'onc-row onc-row--plain');
      row.appendChild(el('span', 'onc-row__label', u.name));
      row.appendChild(el('span', 'onc-row__sub', 'card not yet available'));
      card.appendChild(row);
    }
  }
  if (r.note) card.appendChild(refs.cited('p', 'onc-note', r.note));
  const cancers = r.cancers.map((c) => data.cancers.find((x) => x.id === c)).filter((c): c is NonNullable<typeof c> => !!c);
  if (cancers.length) {
    card.appendChild(el('h2', 'onc-section', active.cfg.indicationHeading));
    for (const c of cancers) card.appendChild(linkRow(c.name, undefined, routeFor(active.cfg.indicationKind, c.id)));
  }
  body.appendChild(card);
  refs.render(body);
}

function renderClass(body: HTMLElement, data: OncData, refs: Refs, slug: string): boolean {
  const c = (data.browseClasses ?? data.classes).find((x) => x.id === slug);
  if (!c) return false;
  const card = el('article', 'onc-card');
  const id = el('section', 'onc-identity');
  id.appendChild(el('h1', 'onc-identity__name', c.name));
  id.appendChild(refs.cited('p', 'onc-identity__mech', c.mechanism));
  card.appendChild(id);
  card.appendChild(el('h2', 'onc-section', 'Drugs'));
  for (const d of data.drugs.filter((x) => (x.browseClassIds ?? x.classIds).includes(c.id))) card.appendChild(linkRow(cardTitle(d), undefined, routeFor('drug', d.id)));
  body.appendChild(card);
  refs.render(body);
  return true;
}

/** Cancer types that have at least one drug, alphabetical, "Other label indications" last. */
function typeRows(data: OncData): { id: string; name: string; cancers: Cancer[]; drugs: OncDrug[] }[] {
  const { types: ONC_CANCER_TYPES, other: OTHER_CANCER_TYPE } = active.cfg.indicationTypes!;
  const typeOf = (c: Cancer): string => (c.type && ONC_CANCER_TYPES.some((t) => t.id === c.type) ? c.type : OTHER_CANCER_TYPE.id);
  const byType = new Map<string, Cancer[]>();
  for (const c of data.cancers) byType.set(typeOf(c), [...(byType.get(typeOf(c)) ?? []), c]);
  const rows = [...byType].map(([id, cancers]) => ({
    id, name: (ONC_CANCER_TYPES.find((t) => t.id === id) ?? OTHER_CANCER_TYPE).name, cancers,
    drugs: data.drugs.filter((d) => d.cancers.some((cid) => cancers.some((c) => c.id === cid))),
  })).filter((r) => r.drugs.length > 0);
  return rows.sort((a, b) => (a.id === OTHER_CANCER_TYPE.id ? 1 : b.id === OTHER_CANCER_TYPE.id ? -1 : a.name.localeCompare(b.name)));
}

/** A cancer type page: its member drugs, each with the label's own indication wording beside it. */
function renderCancerType(body: HTMLElement, data: OncData, refs: Refs, slug: string): boolean {
  if (!active.cfg.indicationTypes) return false;
  const row = typeRows(data).find((r) => r.id === slug);
  if (!row) return false;
  const card = el('article', 'onc-card');
  const id = el('section', 'onc-identity');
  id.appendChild(el('h1', 'onc-identity__name', row.name));
  card.appendChild(id);
  card.appendChild(el('h2', 'onc-section', 'Drugs'));
  for (const d of row.drugs) {
    const wording = row.cancers.filter((c) => d.cancers.includes(c.id)).map((c) => c.name).join('; ');
    card.appendChild(linkRow(cardTitle(d), wording, routeFor('drug', d.id), true));
  }
  body.appendChild(card);
  refs.render(body);
  return true;
}

const NO_ORGAN_SLUG = 'all-organs';
const NO_ORGAN_NAME = 'All organs (label names none)';

function renderNoOrgan(body: HTMLElement, data: OncData, refs: Refs): boolean {
  const drugs = data.drugs.filter((x) => x.cancers.length === 0);
  if (!drugs.length) return false;
  const card = el('article', 'onc-card');
  const id = el('section', 'onc-identity');
  id.appendChild(el('h1', 'onc-identity__name', NO_ORGAN_NAME));
  card.appendChild(id);
  card.appendChild(el('h2', 'onc-section', 'Drugs'));
  for (const d of drugs) card.appendChild(linkRow(cardTitle(d), undefined, routeFor('drug', d.id)));
  body.appendChild(card);
  refs.render(body);
  return true;
}

function renderCancer(body: HTMLElement, data: OncData, refs: Refs, slug: string): boolean {
  if (active.cfg.indicationKind === 'organ' && slug === NO_ORGAN_SLUG && !data.cancers.some((x) => x.id === slug)) return renderNoOrgan(body, data, refs);
  const c = data.cancers.find((x) => x.id === slug);
  if (!c) return false;
  const card = el('article', 'onc-card');
  const id = el('section', 'onc-identity');
  id.appendChild(el('h1', 'onc-identity__name', c.name));
  card.appendChild(id);
  card.appendChild(el('h2', 'onc-section', 'Drugs'));
  for (const d of data.drugs.filter((x) => x.cancers.includes(c.id))) card.appendChild(linkRow(cardTitle(d), undefined, routeFor('drug', d.id)));
  const regs = data.regimens.filter((x) => x.cancers.includes(c.id));
  if (regs.length) {
    card.appendChild(el('h2', 'onc-section', 'Regimens'));
    for (const r of regs) card.appendChild(linkRow(`${r.acronym} (${r.expansion})`, undefined, routeFor('reg', r.id)));
  }
  body.appendChild(card);
  refs.render(body);
  return true;
}

function renderComplaint(body: HTMLElement, data: OncData, refs: Refs, slug: string, _cfg: TreeConfig | null): boolean {
  const cx = data.complaints.find((x) => x.id === slug);
  if (!cx) return false;
  const card = el('article', 'onc-card');
  const id = el('section', 'onc-identity');
  id.appendChild(el('h1', 'onc-identity__name', cx.label));
  id.appendChild(el('p', 'onc-cx-note', active.cfg.complaintNote));
  card.appendChild(id);

  // One row per toxicity. Order: lethality first (1 = most lethal), so a life-threatening cause is never buried; then how
  // directly the complaint points at it (its position in the toxicity's complaints list, first = primary); then data
  // order. A single complaints order per toxicity cannot serve every page, so directness is only the tiebreak.
  // Timing is read from each class, never copied.
  const rows = data.toxicities
    .map((tox, i) => ({ tox, i, direct: tox.complaints.indexOf(cx.id) }))
    .filter((r) => r.direct >= 0 && (!active.cfg.rowCategories || active.cfg.rowCategories.includes(r.tox.id)))
    .sort((a, b) => a.tox.lethality - b.tox.lethality || a.direct - b.direct || a.i - b.i);
  for (const { tox } of rows) {
    // classes with the same timing share one line
    const groups = new Map<string, { timing?: Cited; classes: string[] }>();
    for (const cls of data.classes) {
      const eff = cls.effects.find((x) => x.tox === tox.id);
      if (!eff) continue;
      const k = eff.timing?.v ?? ''; // effects with no stated onset share one line with no timing text
      const g = groups.get(k) ?? { timing: eff.timing, classes: [] };
      g.classes.push(cls.id);
      groups.set(k, g);
    }
    const wrap = el('div', tox.lethality === 1 ? 'onc-cxrow onc-cxrow--top' : 'onc-cxrow');
    const main = button('onc-cxrow__main', '', () => openTox(tox));
    const lab = el('span', 'onc-cxrow__label');
    lab.appendChild(el('span', 'onc-cxrow__name', tox.label));
    if (tox.lethality === 1) lab.appendChild(el('span', 'onc-flag', '⚠ Life-threatening'));
    main.append(lab, el('span', 'onc-row__chev', '›'));
    wrap.appendChild(main);
    const meta = el('div', 'onc-cxrow__meta');
    for (const g of groups.values()) {
      const line = el('div', 'onc-cxrow__line');
      const chips = el('span', 'onc-cxrow__classes');
      for (const cid of g.classes) chips.appendChild(el('span', 'onc-tag', data.classes.find((c) => c.id === cid)?.name ?? cid));
      line.appendChild(chips);
      if (g.timing) line.appendChild(refs.cited('span', 'onc-cxrow__timing', { v: shortTiming(g.timing.v, active.cfg.timingTimeUnits === true), cite: g.timing.cite }));
      meta.appendChild(line);
    }
    wrap.appendChild(meta);
    card.appendChild(wrap);
  }
  body.appendChild(card);
  refs.render(body);
  return true;
}
