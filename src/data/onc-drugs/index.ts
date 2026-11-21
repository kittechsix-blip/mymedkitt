// myMedKitt — Oncology Drugs Side-effects: aggregate data + pure helpers (no DOM, no I/O).

import type { Cancer, Cited, ClassEffect, DrugClass, OncData, OncDrug, OncGroup, OncSource, Regimen, SourceKey, Toxicity } from './types.js';
import { ONC_SOURCES } from './sources.js';
import { ONC_CANCERS } from './cancers.js';
import { ONC_COMPLAINTS } from './complaints.js';
import { ONC_TOXICITIES } from './toxicities.js';
import { ONC_CLASSES } from './classes.js';
import { ONC_REGIMENS } from './regimens.js';
import { ONC_GROUPS } from './drugs/index.js';
import { virtualIds } from './consult.js';
import type { DrugConsultConfig, VirtualKind } from './consult.js';
import { ONC_CANCER_TYPES, OTHER_CANCER_TYPE } from './cancer-types.js';

export * from './types.js';
export * from './cancer-types.js';
export * from './consult.js';
export { ONC_SOURCES, ONC_CANCERS, ONC_COMPLAINTS, ONC_TOXICITIES, ONC_CLASSES, ONC_REGIMENS, ONC_GROUPS };

export const ONC_TREE_ID = 'onc-drug-side-effects';

/**
 * Merge the shared files with every group file. First declaration wins; every clash is reported with both file names.
 * An identical cancer id + name declared in two files is merged silently; the same id with a different name is a clash.
 * Pure, so the gate can run it on synthetic groups.
 */
export function mergeOncData(
  shared: Pick<OncData, 'sources' | 'cancers' | 'classes' | 'regimens'> & { drugs?: OncDrug[] },
  groups: Record<string, OncGroup>,
): { merged: Pick<OncData, 'sources' | 'cancers' | 'classes' | 'regimens' | 'drugs'>; errors: string[] } {
  const errors: string[] = [];
  const sources: Record<SourceKey, OncSource> = {};
  const sourceFile = new Map<string, string>();
  const cancers: Cancer[] = [];
  const cancerFile = new Map<string, { file: string; name: string }>();
  const classes: DrugClass[] = [];
  const classFile = new Map<string, string>();
  const regimens: Regimen[] = [];
  const regimenFile = new Map<string, string>();
  const drugs: OncDrug[] = [];
  const drugFile = new Map<string, string>();

  const addSources = (file: string, src: Record<SourceKey, OncSource> | undefined): void => {
    for (const [k, v] of Object.entries(src ?? {})) {
      if (sourceFile.has(k)) { errors.push(`DUPLICATE-SOURCE: source key "${k}" is declared in both ${sourceFile.get(k)} and ${file}`); continue; }
      sourceFile.set(k, file); sources[k] = v;
    }
  };
  const addCancers = (file: string, list: Cancer[] | undefined): void => {
    for (const c of list ?? []) {
      const prev = cancerFile.get(c.id);
      if (prev) {
        if (prev.name !== c.name) errors.push(`DUPLICATE-CANCER: cancer id "${c.id}" is "${prev.name}" in ${prev.file} but "${c.name}" in ${file}`);
        // identical id + name: merged silently, and the aliases from every file are kept
        const kept = cancers.find((x) => x.id === c.id)!;
        if (kept.type && c.type && kept.type !== c.type) errors.push(`DUPLICATE-CANCER: cancer id "${c.id}" has type "${kept.type}" in ${prev.file} but "${c.type}" in ${file}`);
        if (!kept.type && c.type) kept.type = c.type;
        const extra = (c.aliases ?? []).filter((a) => !(kept.aliases ?? []).includes(a));
        if (extra.length) kept.aliases = [...(kept.aliases ?? []), ...extra];
        continue;
      }
      cancerFile.set(c.id, { file, name: c.name });
      cancers.push({ ...c, ...(c.aliases ? { aliases: [...c.aliases] } : {}) }); // copy: the source file's own object is never mutated
    }
  };
  const addUnique = <T extends { id: string }>(kind: string, file: string, list: T[] | undefined, out: T[], seen: Map<string, string>): void => {
    for (const x of list ?? []) {
      if (seen.has(x.id)) { errors.push(`DUPLICATE-${kind.toUpperCase()}: ${kind} id "${x.id}" is declared in both ${seen.get(x.id)} and ${file}`); continue; }
      seen.set(x.id, file); out.push(x);
    }
  };

  addSources('sources.ts', shared.sources);
  addCancers('cancers.ts', shared.cancers);
  addUnique('class', 'classes.ts', shared.classes, classes, classFile);
  addUnique('regimen', 'regimens.ts', shared.regimens, regimens, regimenFile);
  addUnique('drug', 'drugs/index.ts', shared.drugs, drugs, drugFile);
  for (const [file, g] of Object.entries(groups)) {
    const f = `drugs/${file}`;
    addSources(f, g.SOURCES);
    addCancers(f, g.CANCERS);
    addUnique('class', f, g.CLASSES, classes, classFile);
    addUnique('regimen', f, g.REGIMENS, regimens, regimenFile);
    addUnique('drug', f, g.DRUGS, drugs, drugFile);
  }
  return { merged: { sources, cancers, classes, regimens, drugs }, errors };
}

const MERGE = mergeOncData({ sources: ONC_SOURCES, cancers: ONC_CANCERS, classes: ONC_CLASSES, regimens: ONC_REGIMENS }, ONC_GROUPS);
/** Clashes between files; the gate requires this to be empty. */
export const ONC_MERGE_ERRORS: string[] = MERGE.errors;
export const ONC_DRUGS: OncDrug[] = MERGE.merged.drugs;

export const ONC_DATA: OncData = {
  sources: MERGE.merged.sources,
  cancers: MERGE.merged.cancers,
  complaints: ONC_COMPLAINTS,
  toxicities: ONC_TOXICITIES,
  classes: MERGE.merged.classes,
  regimens: MERGE.merged.regimens,
  drugs: MERGE.merged.drugs,
};

// ---- virtual node ids (public deep-link contract: do not rename) ----

export const VIRTUAL_PREFIX = 'odse-';

export const ONC_CONSULT: DrugConsultConfig = {
  key: 'onc',
  treeId: ONC_TREE_ID,
  title: 'Oncology Drugs Side-effects',
  categoryId: 'heme-onc',
  prefix: VIRTUAL_PREFIX,
  kinds: ['drug', 'reg', 'class', 'cancer', 'ctype', 'cx'],
  indicationKind: 'cancer',
  indicationTab: 'Cancer',
  indicationHeading: 'Cancers',
  indicationTypes: { types: ONC_CANCER_TYPES, other: OTHER_CANCER_TYPE },
  filterPlaceholder: 'Drug, brand, class, cancer, complaint',
  complaintNote: 'Drug causes only. The usual workup (infection, progression, clot) still applies.',
  classSectionOrder: ['Cytotoxic chemotherapy', 'Targeted therapy', 'Hormonal therapy', 'Antibodies and cell therapies', 'Immune checkpoint inhibitors', 'Other classes'],
  startNode: 'odse-start',
  editorAliasPinFloor: 4,
};

const ONC_IDS = virtualIds(ONC_CONSULT);
export const virtualNodeId = ONC_IDS.virtualNodeId;
/** Cheap check used by the router before loading the component. */
export const isVirtualNodeId = ONC_IDS.isVirtualNodeId;
export const parseVirtualNodeId = ONC_IDS.parseVirtualNodeId;

export const cardNodeId = (drug: Pick<OncDrug, 'id'>): string => virtualNodeId('drug', drug.id);

// ---- effect resolution ----

export interface ResolvedEffect {
  tox: Toxicity;
  /** undefined when the source states no onset: show no badge */
  timing?: Cited;
  /** sources documenting the effect itself (used when there is no timing) */
  cite: SourceKey[];
  /** 'postmarketing' effects are shown in the collapsed "Reported after approval" group */
  basis?: 'postmarketing';
  /** true when the effect row corresponds to a hazard in the drug's FDA boxed warning (no effect on rendering yet) */
  boxed?: true;
  /** explicit promotion, if any; undefined = ordered by lethality */
  rank?: number;
  /** class note, if any */
  note?: Cited;
  /** drug-specific quirk, if any */
  quirk?: Cited;
  /** screening questions: the drug's own override, else the toxicity's */
  ask: Cited[];
}

/**
 * Class effects (for every class the drug belongs to) with the drug's overrides merged by tox id.
 * Order: an explicit `rank` (drug override, else class) is a promotion and sorts first, lowest rank first;
 * everything else follows lethality ascending (1 = most lethal), then declaration order (class order, then the
 * order effects are listed in the class), which is stable. A drop removes the effect.
 */
export function resolveEffects(drug: OncDrug, data: Pick<OncData, 'classes' | 'toxicities'> = ONC_DATA): ResolvedEffect[] {
  const toxById = new Map(data.toxicities.map((t) => [t.id, t]));
  const merged = new Map<string, { base: ClassEffect; tox: Toxicity }>();
  for (const cid of drug.classIds) {
    const cls = data.classes.find((c) => c.id === cid);
    if (!cls) continue;
    for (const e of cls.effects) {
      const tox = toxById.get(e.tox);
      if (!tox || merged.has(e.tox)) continue;
      merged.set(e.tox, { base: e, tox });
    }
  }
  const out: ResolvedEffect[] = [];
  const overrides = new Map((drug.effects ?? []).map((o) => [o.tox, o]));
  for (const [id, { base, tox }] of merged) {
    const o = overrides.get(id);
    if (o?.drop) continue;
    out.push({
      tox,
      timing: o?.timing ?? base.timing,
      cite: o?.cite ?? base.cite ?? [],
      basis: o?.basis ?? base.basis,
      boxed: o?.boxed ?? base.boxed,
      rank: o?.rank ?? base.rank,
      note: base.note,
      quirk: o?.quirk,
      ask: o?.ask ?? tox.ask,
    });
  }
  // drug-only effects (override on a tox no class lists)
  for (const o of drug.effects ?? []) {
    if (o.drop || merged.has(o.tox) || (!o.timing && !o.cite?.length)) continue;
    const tox = toxById.get(o.tox);
    if (!tox) continue;
    out.push({ tox, timing: o.timing, cite: o.cite ?? [], basis: o.basis, boxed: o.boxed, rank: o.rank, quirk: o.quirk, ask: o.ask ?? tox.ask });
  }
  const order = new Map(out.map((e, i) => [e, i]));
  return out.sort((a, b) => {
    const ra = a.rank ?? Infinity;
    const rb = b.rank ?? Infinity;
    if (ra !== rb) return ra < rb ? -1 : 1;
    return a.tox.lethality - b.tox.lethality || order.get(a)! - order.get(b)!;
  });
}

/**
 * Consult option `rowCategories` (transplant only): an effect whose category is NOT in the list is not a row with a category link;
 * it is shown as a plain line (the effect's own existing text and citations, unchanged) at the top of "Also on the label".
 * Boxed ones first, in effect order. Without the option every effect is a row (oncology).
 */
export function splitEffects(effects: ResolvedEffect[], rowCategories?: readonly string[]): { rows: ResolvedEffect[]; plain: ResolvedEffect[] } {
  if (!rowCategories) return { rows: effects, plain: [] };
  const keep = new Set(rowCategories);
  const rows = effects.filter((e) => keep.has(e.tox.id));
  const plain = effects.filter((e) => !keep.has(e.tox.id)).sort((a, b) => Number(b.boxed === true) - Number(a.boxed === true));
  return { rows, plain };
}
/** The plain line for an effect: its category label as the head, then its own drug-specific text, timing and class note exactly as written, with their citations. */
export function plainEffectLine(e: ResolvedEffect): Cited {
  const parts = [e.quirk, e.timing, e.note].filter((x): x is Cited => !!x);
  const cite = [...new Set([...parts.flatMap((p) => p.cite), ...e.cite])];
  return { v: parts.length ? `${e.tox.label}: ${parts.map((p) => p.v).join('; ')}` : e.tox.label, cite };
}

// ---- display helpers ----

/** Transplant consult only (DrugConsultConfig.timingTimeUnits): a first clause with a stated time unit, or the owner-approved clause, is also a badge. Oncology never passes the flag. */
const TIME_UNIT = /\b(minutes?|hours?|days?|weeks?|months?|years?)\b/i;
const TIMING_NON_DIABETIC = 'Non-diabetic cases: usually after a few days';

/**
 * Short badge for a timing string, derived mechanically: the text before the first top-level comma (not inside parentheses,
 * not the thousands comma in a number such as 1,000 mg/m2), only when it contains a digit and is at most 48 characters.
 * Anything else is returned whole. The full string always appears, with its citations, in the expanded row.
 */
export function shortTiming(v: string, timeUnits = false): string {
  let depth = 0;
  for (let i = 0; i < v.length; i++) {
    const ch = v[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth = Math.max(0, depth - 1);
    else if (ch === ',' && depth === 0 && !(/\d/.test(v[i - 1] ?? '') && /\d/.test(v[i + 1] ?? ''))) {
      const head = v.slice(0, i).trim();
      return (/\d/.test(head) || (timeUnits && (TIME_UNIT.test(head) || head === TIMING_NON_DIABETIC))) && head.length <= 48 ? head : v;
    }
  }
  return v;
}

/** Boxed-warning items of a drug, always as a list. */
export function boxedItems(drug: Pick<OncDrug, 'boxedWarning'>): Cited[] {
  const b = drug.boxedWarning;
  return !b ? [] : Array.isArray(b) ? b : [b];
}

// ---- names and pinning ----

/** Lowercase, letters and digits only: "R-CHOP", "r chop" and "Rchop" are one name. */
export function normName(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export const MIN_PIN_LENGTH = 4;

/**
 * Formulation-suffix rule (mechanical, not hand-entered): FDA lists some brands with a trailing formulation or kit token
 * ("Adriamycin PFS", "Jevtana Kit", "Etopophos Preservative Free", "Cytosar-U", "Mexate-AQ Preserved"). The name with those
 * trailing tokens removed is also a searchable and pinnable name for the same card. Tokens: PFS, PF, KIT, AQ, PRESERVED,
 * PRESERVATIVE FREE (space separated) and a hyphen plus U or AQ, repeated, at the END of the name only, case-insensitive.
 * Returns null when nothing is stripped or nothing would remain.
 */
export function derivedBrandName(name: string): string | null {
  const out = name.replace(/(?:\s+(?:PFS|PF|KIT|AQ|PRESERVED|PRESERVATIVE\s+FREE)|-(?:AQ|U))+$/i, '').trim();
  return out && out.toLowerCase() !== name.trim().toLowerCase() ? out : null;
}

/** Every name that should resolve to the card: generic, current and former brands, aliases, and suffix-stripped brand names. */
export function searchNames(drug: OncDrug): string[] {
  const base = [drug.generic, ...drug.brands, ...(drug.formerBrands ?? []), ...(drug.searchOnlyBrands ?? []), ...(drug.aliases ?? []), ...(drug.editorAliases ?? [])];
  const seen = new Set(base.map(normName));
  const derived: string[] = [];
  for (const b of [...drug.brands, ...(drug.formerBrands ?? []), ...(drug.searchOnlyBrands ?? [])]) {
    const d = derivedBrandName(b);
    if (d && !seen.has(normName(d))) { seen.add(normName(d)); derived.push(d); }
  }
  return [...base, ...derived];
}

export function regimenNames(r: Regimen): string[] {
  return [r.acronym, ...(r.aliases ?? [])];
}

/** Shortest normalized name that can pin: 4, or 3 for an editor alias that contains a digit (5FU, 6MP, 6TG). */
export const MIN_PIN_LENGTH_DIGIT_ALIAS = 3;

/**
 * Names that are pinned to rank 1: pin !== false, normalized length >= 4 (3 for an editor alias with a digit; with cfg.editorAliasPinFloor 3, for any editor alias).
 * `pinAlso` (drug only) pins the listed names even when the drug itself is pin:false; each must still be a searchable name and clear the length rule.
 */
export function pinNames(item: OncDrug | Regimen, cfg: DrugConsultConfig = ONC_CONSULT): string[] {
  const isDrug = 'generic' in item;
  const also = isDrug ? new Set((item.pinAlso ?? []).map(normName)) : new Set<string>();
  if (item.pin === false && !also.size) return [];
  const skip = new Set(((isDrug ? item.unpinnedNames : undefined) ?? []).map(normName));
  const shortAliases = new Set(isDrug ? (item.editorAliases ?? []).filter((a) => cfg.editorAliasPinFloor === 3 || /\d/.test(a)).map(normName) : []);
  const names = isDrug ? searchNames(item) : regimenNames(item);
  return names.filter((n) => {
    const k = normName(n);
    if (skip.has(k)) return false;
    if (item.pin === false && !also.has(k)) return false;
    return k.length >= MIN_PIN_LENGTH || (shortAliases.has(k) && k.length >= MIN_PIN_LENGTH_DIGIT_ALIAS);
  });
}

/** Current brands for display: a brand that is another brand plus a formulation suffix ("Jevtana Kit" beside "Jevtana") is not listed twice. */
export function displayBrands(drug: Pick<OncDrug, 'brands'>): string[] {
  return drug.brands.filter((b) => { const dn = derivedBrandName(b); return !(dn && drug.brands.some((o) => normName(o) === normName(dn))); });
}

/** Display title of a drug card search result, e.g. "Generic (Brand, Brand)". */
export function cardTitle(drug: OncDrug): string {
  // at most three brands in a title: the rest stay searchable but would make a list row unreadable
  const b = displayBrands(drug);
  return b.length ? `${drug.generic} (${b.slice(0, 3).join(', ')}${b.length > 3 ? ', ...' : ''})` : drug.generic;
}

// ---- search documents (read by scripts/build-search-answer-index.mjs and the gate) ----

export interface OncSearchNode { id: string; treeId: string; title: string; summary: string; body: string; recommendation: string; ml: string }
export interface OncSearchEntry { route: string; title: string; sub: string; pin: string[]; all: string[] }

const squash = (s: string): string => s.replace(/\s+/g, ' ').trim();

/**
 * One identity-only document per card: title, class, brands and cancers ONLY. Never side-effect text, so symptom
 * queries ("fever after chemo") are not disturbed. `onc` feeds src/services/onc-search-pin.ts.
 */
export function oncSearchDocs(data: OncData = ONC_DATA, cfg: DrugConsultConfig = ONC_CONSULT): { nodes: OncSearchNode[]; onc: OncSearchEntry[] } {
  const cancerName = new Map(data.cancers.map((c) => [c.id, c.name]));
  const className = new Map((data.browseClasses ?? data.classes).map((c) => [c.id, c.name]));
  const ids = cfg === ONC_CONSULT ? ONC_IDS : virtualIds(cfg);
  const nodes: OncSearchNode[] = [];
  const onc: OncSearchEntry[] = [];
  const seen = new Set<string>();
  const add = (kind: VirtualKind, slug: string, title: string, sub: string, parts: string[], pin: string[], all: string[]): void => {
    const id = ids.virtualNodeId(kind, slug);
    if (seen.has(id)) throw new Error(`duplicate onc card id ${id}`);
    seen.add(id);
    nodes.push({ id, treeId: cfg.treeId, title: squash(title), summary: '', body: squash(parts.filter(Boolean).join('. ')).slice(0, 600), recommendation: '', ml: squash(sub) });
    onc.push({ route: `/tree/${cfg.treeId}/node/${id}`, title: squash(title), sub: squash(sub), pin, all });
  };
  for (const d of data.drugs) {
    const cls = (d.browseClassIds ?? d.classIds).map((c) => className.get(c)).filter(Boolean).join(', ');
    const cancers = d.cancers.map((c) => cancerName.get(c)).filter(Boolean).join(', ');
    add('drug', d.id, cardTitle(d), cls, [[...d.brands, ...(d.formerBrands ?? []), ...(d.searchOnlyBrands ?? [])].join(', '), cls, cancers], pinNames(d, cfg), searchNames(d));
  }
  for (const r of data.regimens) {
    const cancers = r.cancers.map((c) => cancerName.get(c)).filter(Boolean).join(', ');
    const comps = r.drugs.map((id) => data.drugs.find((d) => d.id === id)?.generic ?? r.uncarded?.find((u) => u.id === id)?.name).filter(Boolean).join(', ');
    add('reg', r.id, `${r.acronym} (${r.expansion})`, 'Regimen', [comps, cancers], pinNames(r, cfg), regimenNames(r));
  }
  return { nodes, onc };
}
