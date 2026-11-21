// Gate logic for the oncology drug data (used by scripts/onc-drugs.test.ts). Pure over (data, env).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { TREE_REGISTRY } from '../tree-registry.mjs';
import { CLINICAL_SYNONYMS, DRUG_SYNONYMS } from '../../src/services/search-synonyms.ts';
import type { Cited, OncData } from '../../src/data/onc-drugs/types.ts';
import type { DrugConsultConfig } from '../../src/data/onc-drugs/consult.ts';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const DOCS = path.join(ROOT, 'docs');
export const imp = (rel: string) => import(pathToFileURL(path.join(DOCS, rel)).href);
const json = (rel: string) => JSON.parse(fs.readFileSync(path.join(DOCS, rel), 'utf8'));

interface TreeInfo { nodes: { id: string; summary?: string; citation?: number[]; next?: string; options?: { next?: string }[] }[]; cites: Set<number> }

export interface Env {
  trees: Map<string, TreeInfo>;
  realNodeIds: Set<string>;
  consultNames: Set<string>;     // normalized titles, ids, synonyms
  drugNames: Set<string>;        // normalized pharmacy names and synonyms
  calcTitles: Set<string>;
  pharmacyIds: Set<string>;
  infoPages: Set<string>;
  infoAnchors: Set<string>;      // "page#anchor"
  norm: (s: string) => string;
  oncTreeId: string;
}

export async function loadEnv(): Promise<Env> {
  const od = await imp('data/onc-drugs/index.js');
  const norm: (s: string) => string = od.normName;
  const cats = await imp('data/categories.js');
  const calcMod = await imp('components/calculator.js');
  const drugMod = await imp('data/drug-store.js');
  const nodeIdx = json('data/search-node-index.json');
  const ans = json('data/search-answer-index.json');

  const consultNames = new Set<string>();
  const seen = new Set<string>();
  for (const c of cats.getAllCategories()) for (const t of c.decisionTrees) {
    if (seen.has(t.id)) continue;
    seen.add(t.id);
    consultNames.add(norm(t.title)); consultNames.add(norm(t.id));
    for (const s of CLINICAL_SYNONYMS[t.id] ?? []) consultNames.add(norm(s));
  }
  const drugNames = new Set<string>();
  for (const d of drugMod.ALL_DRUGS) {
    drugNames.add(norm(d.name)); if (d.genericName) drugNames.add(norm(d.genericName));
    for (const s of DRUG_SYNONYMS[String(d.name).toLowerCase()] ?? []) drugNames.add(norm(s));
  }
  const realNodeIds = new Set<string>();
  for (const n of nodeIdx.nodes) realNodeIds.add(n.id);
  // the virtual card ids of EVERY drug consult are not real nodes
  const dc = await imp('data/drug-consults.js');
  const virtualPrefixes: string[] = Object.values(dc.DRUG_CONSULTS as Record<string, { cfg: DrugConsultConfig }>).flatMap((x) => [`${x.cfg.prefix}drug-`, `${x.cfg.prefix}reg-`]);
  for (const n of ans.extraNodes) if (!virtualPrefixes.some((p) => n.id.startsWith(p))) realNodeIds.add(n.id);
  return {
    trees: new Map(), realNodeIds, consultNames, drugNames,
    calcTitles: new Set(calcMod.getAllCalculators().map((c: { title: string }) => norm(c.title))),
    pharmacyIds: new Set(drugMod.ALL_DRUGS.map((d: { id: string }) => d.id)),
    infoPages: new Set(ans.pages.map((p: { p: string }) => p.p)),
    infoAnchors: new Set(ans.info.map((i: { p: string; a: string }) => `${i.p}#${i.a}`)),
    norm, oncTreeId: od.ONC_TREE_ID,
  };
}

async function tree(env: Env, id: string): Promise<TreeInfo | null> {
  if (env.trees.has(id)) return env.trees.get(id)!;
  const reg = (TREE_REGISTRY as Record<string, { prefix: string }>)[id];
  if (!reg) return null;
  const mod = await imp(`data/trees/${id}.js`);
  const nodes = mod[`${reg.prefix}_NODES`];
  if (!nodes) return null;
  const info = { nodes, cites: new Set<number>((mod[`${reg.prefix}_CITATIONS`] ?? []).map((c: { num: number }) => c.num)) };
  env.trees.set(id, info);
  return info;
}

/** Every clinical claim in the data, with a label for error messages. */
function allCited(d: OncData): { where: string; c: Cited }[] {
  const out: { where: string; c: Cited }[] = [];
  for (const t of d.toxicities) t.ask.forEach((c, i) => out.push({ where: `tox ${t.id}.ask[${i}]`, c }));
  for (const k of d.classes) {
    out.push({ where: `class ${k.id}.mechanism`, c: k.mechanism });
    for (const e of k.effects) {
      if (e.timing) out.push({ where: `class ${k.id}.${e.tox}.timing`, c: e.timing });
      if (e.cite) out.push({ where: `class ${k.id}.${e.tox}.cite`, c: { v: '', cite: e.cite } });
      if (e.note) out.push({ where: `class ${k.id}.${e.tox}.note`, c: e.note });
    }
  }
  for (const r of d.drugs) {
    if (r.mechanism) out.push({ where: `drug ${r.id}.mechanism`, c: r.mechanism });
    (r.alsoOnLabel ?? []).forEach((c, i) => out.push({ where: `drug ${r.id}.alsoOnLabel[${i}]`, c }));
    (r.interactions ?? []).forEach((c, i) => out.push({ where: `drug ${r.id}.interactions[${i}]`, c }));
    (Array.isArray(r.boxedWarning) ? r.boxedWarning : r.boxedWarning ? [r.boxedWarning] : []).forEach((c, i) => out.push({ where: `drug ${r.id}.boxedWarning[${i}]`, c }));
    for (const e of r.effects ?? []) {
      if (e.timing) out.push({ where: `drug ${r.id}.${e.tox}.timing`, c: e.timing });
      if (e.cite) out.push({ where: `drug ${r.id}.${e.tox}.cite`, c: { v: '', cite: e.cite } });
      if (e.quirk) out.push({ where: `drug ${r.id}.${e.tox}.quirk`, c: e.quirk });
      (e.ask ?? []).forEach((c, i) => out.push({ where: `drug ${r.id}.${e.tox}.ask[${i}]`, c }));
    }
  }
  return out;
}

/** Returns error strings, each starting with a CODE. Empty array = clean. Does NOT require the data to be non-empty. */
export async function checkOnc(d: OncData, env: Env, od: { resolveEffects: Function; pinNames: Function; virtualIds: Function; ONC_CONSULT: DrugConsultConfig; ONC_CANCER_TYPES?: { id: string }[] }, opts: { treeOrphans?: boolean; consult?: DrugConsultConfig } = {}): Promise<string[]> {
  const cfg = opts.consult ?? od.ONC_CONSULT;
  const kind = cfg.indicationKind; // 'cancer' | 'organ'
  const KIND = kind.toUpperCase();
  const errs: string[] = [];
  const e = (code: string, msg: string) => errs.push(`${code}: ${msg}`);
  const norm = env.norm;

  // sources
  for (const [k, s] of Object.entries(d.sources)) {
    if (s.key !== k) e('SOURCE', `${k} has key ${s.key}`);
    if (!s.text || s.text.trim().length < 10) e('SOURCE', `${k} has no bibliographic text`);
  }
  // cited strings
  for (const { where, c } of allCited(d)) {
    if (/\d/.test(c.v) && c.cite.length < 1) e('CITE-DIGIT', `${where} "${c.v}" has a number and no citation`);
    if ((where.includes('.alsoOnLabel[') || where.includes('.interactions[')) && c.cite.length < 1) e('LABEL-CITE', `${where} "${c.v.slice(0, 60)}" has no citation (every label item must be cited)`);
    for (const k of c.cite) if (!d.sources[k]?.text) e('CITE-KEY', `${where} cites unknown source ${k}`);
  }
  for (const r of d.regimens) for (const k of r.cite) if (!d.sources[k]?.text) e('CITE-KEY', `regimen ${r.id} cites unknown source ${k}`);

  const classIds = new Set(d.classes.map((c) => c.id));
  const browseIds = new Set((d.browseClasses ?? d.classes).map((c) => c.id));
  const cancerIds = new Set(d.cancers.map((c) => c.id));
  const cxIds = new Set(d.complaints.map((c) => c.id));
  const toxIds = new Set(d.toxicities.map((t) => t.id));
  const drugIds = new Set(d.drugs.map((x) => x.id));

  // drugs
  for (const r of d.drugs) {
    if (!r.classIds.length || r.classIds.some((c) => !classIds.has(c))) e('DRUG-CLASS', `${r.id} needs >=1 valid class`);
    if (r.browseClassIds && (!r.browseClassIds.length || r.browseClassIds.some((c) => !browseIds.has(c)))) e('DRUG-CLASS', `${r.id} needs >=1 valid browse class`);
    if (r.brandSource && !d.sources[r.brandSource]?.text) e('CITE-KEY', `drug ${r.id}.brandSource cites unknown source ${r.brandSource}`);
    { const seenN = new Map<string, string>(); for (const n of [r.generic, ...r.brands, ...(r.formerBrands ?? []), ...(r.searchOnlyBrands ?? [])]) { const k = norm(n); if (seenN.has(k) && k) e('BRAND-DUP', `${r.id} lists "${n}" twice (also "${seenN.get(k)}")`); seenN.set(k, n); } }
    if (d.sources[r.label]?.kind !== 'fda-pi') e('DRUG-LABEL', `${r.id} label must be an fda-pi source`);
    if (r.cancers.some((c) => !cancerIds.has(c))) e(`DRUG-${KIND}`, `${r.id} has an unknown ${kind}`);
    const eff = od.resolveEffects(r, d) as { tox: { id: string }; timing?: Cited; note?: Cited; cite: string[] }[];
    // a card needs something to show: a resolved effect, an alsoOnLabel line or a boxed warning (a label with no emergency-presentation warning is legitimate)
    const boxedN = Array.isArray(r.boxedWarning) ? r.boxedWarning.length : r.boxedWarning ? 1 : 0;
    if (eff.length < 1 && !(r.alsoOnLabel?.length) && !(r.interactions?.length) && boxedN < 1) e('DRUG-EFFECT', `${r.id} has no resolved effect, no alsoOnLabel or interactions line and no boxed warning`);
    if (r.labelAge !== undefined && !/^Label last revised (19|20)\d\d; current availability not confirmed\.$/.test(r.labelAge)) e('LABEL-AGE', `${r.id}.labelAge must be the plain sentence "Label last revised <year>; current availability not confirmed." (no citation, nothing else)`);
    for (const x of eff) {
      // a timing, when present, must be cited; every effect needs at least one citation from timing, note or its own cite list
      if (x.timing && !x.timing.cite.length) e('TIMING', `${r.id}.${x.tox.id} has a timing with no citation`);
      if (!x.timing?.cite.length && !x.note?.cite.length && !x.cite.length) e('EFFECT-CITE', `${r.id}.${x.tox.id} has no citation (needs a cited timing, a cited note, or a cite list)`);
    }
    if (r.pharmacyDrugId && !env.pharmacyIds.has(r.pharmacyDrugId)) e('PHARMACY', `${r.id} pharmacyDrugId ${r.pharmacyDrugId} not in ALL_DRUGS`);
    for (const o of r.effects ?? []) if (!toxIds.has(o.tox)) e('DRUG-EFFECT', `${r.id} overrides unknown toxicity ${o.tox}`);
    { const seenT = new Set<string>(); for (const o of r.effects ?? []) { if (seenT.has(o.tox)) e('DRUG-EFFECT', `${r.id} declares toxicity ${o.tox} twice`); seenT.add(o.tox); } }
    for (const o of r.effects ?? []) if (o.boxed !== undefined && o.boxed !== true) e('BOXED', `${r.id}.${o.tox} has boxed "${String(o.boxed)}" (only true is allowed)`);
    for (const o of r.effects ?? []) if (o.boxed === true) {
      if (o.rank === undefined) e('BOXED', `${r.id}.${o.tox} is boxed but has no rank`);
      if (boxedN < 1) e('BOXED', `${r.id}.${o.tox} is boxed but the drug has no boxed warning`);
    }
    for (const o of r.effects ?? []) if (o.basis !== undefined && o.basis !== 'postmarketing') e('BASIS', `${r.id}.${o.tox} has basis "${String(o.basis)}" (only "postmarketing" is allowed)`);
    {
      // boxed: only `true`, and only on a drug that has a boxed warning (a class-level flag counts for every drug of the class that keeps the effect)
      const hasBox = (Array.isArray(r.boxedWarning) ? r.boxedWarning.length : r.boxedWarning ? 1 : 0) > 0;
      for (const o of r.effects ?? []) {
        if (o.boxed !== undefined && o.boxed !== true) e('BOXED', `${r.id}.${o.tox} has boxed ${JSON.stringify(o.boxed)} (only true is allowed)`);
        else if (o.boxed === true && !hasBox) e('BOXED', `${r.id}.${o.tox} is marked boxed but ${r.id} has no boxedWarning`);
      }
      const dropped = new Set((r.effects ?? []).filter((o) => o.drop).map((o) => o.tox));
      for (const cid of r.classIds) for (const x of d.classes.find((c) => c.id === cid)?.effects ?? []) if (x.boxed === true && !hasBox && !dropped.has(x.tox)) e('BOXED', `${r.id} inherits boxed ${x.tox} from class ${cid} but has no boxedWarning`);
    }
  }
  for (const c of d.classes) for (const x of c.effects) { if (!toxIds.has(x.tox)) e('CLASS-EFFECT', `${c.id} lists unknown toxicity ${x.tox}`); if (x.basis !== undefined && x.basis !== 'postmarketing') e('BASIS', `${c.id}.${x.tox} has basis "${String(x.basis)}" (only "postmarketing" is allowed)`); if (x.boxed !== undefined && x.boxed !== true) e('BOXED', `${c.id}.${x.tox} has boxed ${JSON.stringify(x.boxed)} (only true is allowed)`); }
  for (const r of d.regimens) {
    // a component without a card is allowed only when the regimen declares it in `uncarded`, so a typo in an id still fails
    const allowed = new Set((r.uncarded ?? []).map((u) => u.id));
    for (const x of r.drugs) if (!drugIds.has(x) && !allowed.has(x)) e('REGIMEN', `${r.id} component "${x}" has no card and is not in its uncarded list`);
    for (const u of r.uncarded ?? []) {
      if (!r.drugs.includes(u.id)) e('REGIMEN', `${r.id} lists uncarded "${u.id}" that is not one of its drugs`);
      if (drugIds.has(u.id)) e('REGIMEN', `${r.id} lists "${u.id}" as uncarded but it now has a card: remove it from uncarded`);
      if (!u.name?.trim()) e('REGIMEN', `${r.id} uncarded "${u.id}" has no display name`);
    }
    if (r.cancers.some((x) => !cancerIds.has(x))) e('REGIMEN', `${r.id} has an unknown ${kind}`);
  }

  // cancer types: a `type` must be one of the plain types in cancer-types.ts
  const typeIds = new Set((od.ONC_CANCER_TYPES ?? []).map((t) => t.id));
  if (cfg.indicationTypes) for (const c of d.cancers) if (c.type !== undefined && !typeIds.has(c.type)) e('CANCER-TYPE', `cancer ${c.id} has unknown type "${c.type}"`);

  // toxicity pages
  const oncTree = await tree(env, cfg.treeId);
  const referenced = new Set<string>();
  for (const t of d.toxicities) {
    if (t.plainOnly === true) continue; // no page by design: effects render as plain lines
    const tr = await tree(env, t.page.tree);
    if (!tr) { e('TOX-PAGE', `${t.id}: tree ${t.page.tree} is not registered`); continue; }
    const n = tr.nodes.find((x) => x.id === t.page.node);
    if (!n) { e('TOX-PAGE', `${t.id}: node ${t.page.node} does not exist in ${t.page.tree}`); continue; }
    if (t.page.tree === cfg.treeId) referenced.add(n.id);
    if (!n.summary || !n.summary.trim()) e('TOX-PAGE', `${t.id}: node ${n.id} has no summary`);
    if (!n.citation?.length) e('TOX-PAGE', `${t.id}: node ${n.id} has no citation`);
    for (const num of n.citation ?? []) if (!tr.cites.has(num)) e('TOX-PAGE', `${t.id}: node ${n.id} cites [${num}] missing from ${t.page.tree}`);
    for (const m of t.more ?? []) {
      if (!env.infoPages.has(m.info)) e('TOX-MORE', `${t.id}: info page ${m.info} does not exist`);
      else if (m.anchor && !env.infoAnchors.has(`${m.info}#${m.anchor}`)) e('TOX-MORE', `${t.id}: anchor ${m.info}#${m.anchor} does not exist`);
    }
    for (const c of t.complaints) if (!cxIds.has(c)) e('BAD-COMPLAINT', `${t.id} names unknown complaint ${c}`);
  }

  // orphans
  const usedTox = new Set<string>();
  for (const c of d.classes) for (const x of c.effects) usedTox.add(x.tox);
  for (const r of d.drugs) for (const o of r.effects ?? []) usedTox.add(o.tox);
  for (const t of d.toxicities) if (!usedTox.has(t.id)) e('ORPHAN-TOX', `toxicity ${t.id} is used by no class or drug`);
  for (const c of d.classes) if (!d.drugs.some((x) => x.classIds.includes(c.id) || (x.browseClassIds ?? []).includes(c.id))) e('ORPHAN-CLASS', `class ${c.id} has no drug`);
  for (const c of d.browseClasses ?? []) if (!d.drugs.some((x) => (x.browseClassIds ?? x.classIds).includes(c.id))) e('ORPHAN-CLASS', `browse class ${c.id} has no drug`);
  for (const c of d.cancers) if (!d.drugs.some((x) => x.cancers.includes(c.id)) && !d.regimens.some((x) => x.cancers.includes(c.id))) e(`ORPHAN-${KIND}`, `${kind} ${c.id} has no drug or regimen`);
  for (const c of d.complaints) if (!d.toxicities.some((t) => t.complaints.includes(c.id))) e('ORPHAN-COMPLAINT', `complaint ${c.id} has no toxicity`);
  // ORPHAN-NODE applies to the shipped tree only: a synthetic dataset (the fixture) cannot own its management pages
  if (oncTree && opts.treeOrphans !== false) {
    const byId = new Map(oncTree.nodes.map((n) => [n.id, n]));
    const reach = new Set<string>();
    const queue = [cfg.startNode];
    while (queue.length) {
      const id = queue.pop()!;
      if (reach.has(id) || !byId.has(id)) continue;
      reach.add(id);
      const n = byId.get(id)!;
      if (n.next) queue.push(n.next);
      for (const o of n.options ?? []) if (o.next) queue.push(o.next);
    }
    for (const n of oncTree.nodes) {
      if (!n.id.startsWith(`${cfg.prefix}tox-`)) continue;
      if (!reach.has(n.id)) e('ORPHAN-NODE', `${n.id} is not reachable from ${cfg.startNode}`);
      if (!referenced.has(n.id)) e('ORPHAN-NODE', `${n.id} is referenced by no toxicity page`);
    }
  }

  // virtual ids
  const vids = new Set<string>();
  const vid = (vkind: string, slug: string) => {
    const id = od.virtualIds(cfg).virtualNodeId(vkind, slug) as string;
    if (vids.has(id)) e('VID', `duplicate virtual id ${id}`);
    vids.add(id);
    if (env.realNodeIds.has(id)) e('VID', `virtual id ${id} collides with a real node`);
  };
  d.drugs.forEach((x) => vid('drug', x.id));
  d.regimens.forEach((x) => vid('reg', x.id));
  d.classes.forEach((x) => vid('class', x.id));
  (d.browseClasses ?? []).forEach((x) => { if (!d.classes.some((c) => c.id === x.id)) vid('class', x.id); });
  d.cancers.forEach((x) => vid(kind, x.id));
  d.complaints.forEach((x) => vid('cx', x.id));

  // no weight-based dosing in card data
  const strings: string[] = [];
  const walk = (v: unknown): void => { if (typeof v === 'string') strings.push(v); else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') Object.values(v).forEach(walk); };
  walk([d.drugs, d.classes, d.toxicities, d.regimens, d.cancers]);
  // Rule: per-kilogram dosing (mg/kg, mcg/kg, units/kg, mL/kg ...) is banned anywhere in card data because dosing belongs to Pharmacy.
  // Body-surface-area figures such as "mg/m2" are allowed: a cumulative-dose threshold in a timing or boxed warning is not a dosing instruction.
  const perKg = strings.find((s) => /\b(?:mg|mcg|\u00b5g|ug|g|units?|iu|meq|mmol|ml)\s*\/\s*kg\b/i.test(s));
  if (perKg) e('MG-KG', `card data contains per-kg dosing (dosing belongs to Pharmacy): "${perKg.slice(0, 80)}"`);

  // editor aliases: unique within the card and not the name of another drug (any generic, brand, alias or editor alias)
  { const owners = new Map<string, string>();
    for (const r of d.drugs) for (const n of [r.generic, ...r.brands, ...(r.formerBrands ?? []), ...(r.searchOnlyBrands ?? []), ...(r.aliases ?? [])]) if (norm(n)) owners.set(norm(n), r.id);
    for (const r of d.drugs) { const seenA = new Set<string>(); for (const a of r.editorAliases ?? []) { const k = norm(a); /* spelling variants such as 5-FU / 5FU normalise to one searchable name and are allowed; the same string twice is not */ if (seenA.has(a.toLowerCase())) e('EDITOR-ALIAS', `${r.id} lists "${a}" twice`); seenA.add(a.toLowerCase()); const o = owners.get(k); if (o && o !== r.id) e('EDITOR-ALIAS', `${r.id} editor alias "${a}" is also a name of ${o}`); if (o === r.id) e('EDITOR-ALIAS', `${r.id} editor alias "${a}" is already one of its own names`); } } }

  // pinnable names
  const owner = new Map<string, string>();
  const pin = (label: string, names: string[]) => {
    for (const nm of names) {
      const n = norm(nm);
      // 3 characters pin only for an editor alias that contains a digit (5FU, 6MP), or for any editor alias when the consult's floor is 3; everything else keeps the 4-character floor
      const digitAlias = n.length === 3 && (cfg.editorAliasPinFloor === 3 || /\d/.test(n)) && d.drugs.some((r) => label === `drug:${r.id}` && (r.editorAliases ?? []).some((a) => norm(a) === n));
      if (n.length < 4 && !digitAlias) { e('PIN-SHORT', `${label} pinnable name "${nm}" is under 4 characters`); continue; }
      if (owner.has(n) && owner.get(n) !== label) e('PIN-DUP', `"${nm}" pins both ${owner.get(n)} and ${label}`);
      owner.set(n, label);
      if (env.consultNames.has(n)) e('PIN-COLLIDE', `"${nm}" (${label}) collides with a consult title, id or synonym`);
      if (env.drugNames.has(n)) e('PIN-COLLIDE', `"${nm}" (${label}) collides with a pharmacy drug name or synonym`);
      if (env.calcTitles.has(n)) e('PIN-COLLIDE', `"${nm}" (${label}) collides with a calculator title`);
    }
  };
  for (const r of d.drugs) pin(`drug:${r.id}`, od.pinNames(r, cfg) as string[]);
  for (const r of d.regimens) pin(`reg:${r.id}`, od.pinNames(r, cfg) as string[]);
  return errs;
}
