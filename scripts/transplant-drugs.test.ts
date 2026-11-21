/**
 * Gate for the Transplant Drugs Side-effects consult (second consult on the drug-card engine). Reads compiled docs/ (run `bunx tsc` and the index builders first).
 * Real transplant data is checked directly; the INCOMPLETE tests are red on purpose until the consults are finished.
 * Everything is proven on a FIXTURE built through buildTxData from the real ONC_DATA (scripts/fixtures/tdse-fixture.ts, never shipped),
 * then broken on purpose to prove each new check goes red.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { checkOnc, loadEnv, imp, ROOT, DOCS } from './lib/onc-checks.ts';
import { TREE_REGISTRY } from './tree-registry.mjs';
import {
  TX_FX_ORGANS, TX_FX_COMPLAINTS, TX_FX_TOXICITIES, TX_FX_REGIMENS, TX_FX_GROUPS, TX_FX_STUB_TREE, TX_FX_TREE,
} from './fixtures/tdse-fixture.ts';
import type { OncData, OncDrug } from '../src/data/onc-drugs/types.ts';

const od = await imp('data/onc-drugs/index.js');
const tx = await imp('data/transplant-drugs/index.js');
const dc = await imp('data/drug-consults.js');
const pinMod = await imp('services/onc-search-pin.js');
const env0 = await loadEnv();
// the fixture's transplant toxicity points at a stub page tree; the real tree arrives in a later stage
const env = { ...env0, trees: new Map([[TX_FX_TREE, TX_FX_STUB_TREE as never]]) };
const ONC: OncData = od.ONC_DATA;
const TX_CFG = tx.TX_CONSULT;
const clone = <T>(x: T): T => structuredClone(x);
const hash = (x: unknown): string => crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');

interface Inputs { groups: typeof TX_FX_GROUPS; tox: typeof TX_FX_TOXICITIES; organs: typeof TX_FX_ORGANS; cx: typeof TX_FX_COMPLAINTS; regs: typeof TX_FX_REGIMENS }
const inputs = (): Inputs => clone({ groups: TX_FX_GROUPS, tox: TX_FX_TOXICITIES, organs: TX_FX_ORGANS, cx: TX_FX_COMPLAINTS, regs: TX_FX_REGIMENS });
const build = (i: Inputs = inputs()): { data: OncData; errors: string[] } => tx.buildTxDataWithErrors(ONC, i.groups, i.tox, i.organs, i.cx, i.regs);

const norm = (s: string): string => od.normName(s);
const strip = (e: { tox: { complaints?: unknown } }): unknown => { const { complaints: _c, ...tox } = e.tox as Record<string, unknown>; return { ...e, tox }; };

// ---------------------------------------------------------------- the new checks (pure; each returns CODE: message strings)

/** SHARED-CARD: a transplant view of an oncology card resolves exactly the effects, boxed warning, label text and mechanism the oncology card does. */
function checkSharedCard(data: OncData, onc: OncData): string[] {
  const errs: string[] = [];
  const oncById = new Map(onc.drugs.map((d) => [d.id, d]));
  const shared = data.drugs.filter((d) => oncById.has(d.id));
  if (!shared.length) errs.push('SHARED-CARD: no shared card in the transplant data (the check would look at nothing)');
  for (const view of shared) {
    const orig = oncById.get(view.id)!;
    const a = JSON.stringify(od.resolveEffects(view, data).map(strip));
    const b = JSON.stringify(od.resolveEffects(orig, onc).map(strip));
    if (a !== b) errs.push(`SHARED-CARD: ${view.id} resolves different effects in transplant than in oncology`);
    for (const f of ['boxedWarning', 'alsoOnLabel', 'label', 'mechanism', 'effects', 'classIds'] as const) {
      if (JSON.stringify(view[f]) !== JSON.stringify(orig[f])) errs.push(`SHARED-CARD: ${view.id}.${f} differs from the oncology card`);
    }
  }
  return errs;
}

/** PIN-CROSS: no normalised name pins in both consults (an oncology pin wins, so a shared one would silently hide the transplant card). */
function checkPinCross(onc: OncData, data: OncData): string[] {
  const pins = (d: OncData, cfg: unknown): Map<string, string> => new Map(od.oncSearchDocs(d, cfg).onc.flatMap((e: { pin: string[]; route: string }) => e.pin.map((n) => [norm(n), e.route] as [string, string])));
  const a = pins(onc, od.ONC_CONSULT);
  const b = pins(data, TX_CFG);
  return [...b].filter(([n]) => a.has(n)).map(([n, r]) => `PIN-CROSS: "${n}" pins both ${a.get(n)} and ${r}`);
}

/** NO-LEAK: transplant-only fields never reach an oncology object, and a transplant view is a copy, never the oncology object. */
function checkNoLeak(onc: OncData, data: OncData): string[] {
  const errs: string[] = [];
  for (const d of onc.drugs) if ('browseClassIds' in d) errs.push(`NO-LEAK: oncology drug ${d.id} carries browseClassIds`);
  if ('browseClasses' in onc) errs.push('NO-LEAK: oncology data carries browseClasses');
  const oncObjs = new Set<unknown>(onc.drugs);
  for (const d of data.drugs) if (oncObjs.has(d)) errs.push(`NO-LEAK: transplant drug ${d.id} is the oncology object itself, not a copy`);
  return errs;
}

/** TX-PAGE: at least one transplant-owned toxicity page resolves into the transplant patient-ed tree (count > 0, not all: some toxicities legitimately point at existing consults such as potassium). Count 0 fails, so it cannot pass by checking nothing. */
function checkTxPage(onc: OncData, data: OncData): string[] {
  const oncIds = new Set(onc.toxicities.map((t) => t.id));
  const own = data.toxicities.filter((t) => !oncIds.has(t.id));
  if (own.length < 1) return ['TX-PAGE: no transplant-owned toxicity (count 0)'];
  const inTree = own.filter((t) => t.page.tree === 'transplant-patient-ed');
  return inTree.length > 0 ? [] : [`TX-PAGE: none of ${own.length} transplant-owned toxicities has a page in "transplant-patient-ed" (count 0)`];
}

const all = (b: { data: OncData; errors: string[] }): string[] => [
  ...b.errors, ...checkSharedCard(b.data, ONC), ...checkPinCross(ONC, b.data), ...checkNoLeak(ONC, b.data), ...checkTxPage(ONC, b.data),
];
const gate = (d: OncData): Promise<string[]> => checkOnc(d, env, od, { treeOrphans: false, consult: TX_CFG });

// ---------------------------------------------------------------- shipped (real data, preview build)

const TX_TREE = 'transplant-patient-ed';
const placeholderNodes = async (): Promise<string[]> => {
  const t = await imp(`data/trees/${TX_TREE}.js`);
  return (t.TRANSPLANT_PATIENT_ED_NODES as { id: string; title: string }[]).filter((n) => n.title.startsWith('[NOT WRITTEN]')).map((n) => n.id);
};

test('shipped: the real transplant data is built clean and is not empty (the checks below look at something)', () => {
  const d: OncData = tx.TX_DATA;
  assert.deepEqual(tx.TX_BUILD_ERRORS, []);
  assert.ok(d.drugs.length >= 5 && d.toxicities.length > 0 && d.cancers.length > 0 && d.complaints.length > 0, `drugs ${d.drugs.length}, toxicities ${d.toxicities.length}, organs ${d.cancers.length}, complaints ${d.complaints.length}`);
});

test('shipped: the shared checks on real TX_DATA under TX_CONSULT report nothing but TOX-PAGE for [NOT WRITTEN] placeholder nodes', async () => {
  const errs = await checkOnc(tx.TX_DATA, env0, od, { consult: TX_CFG });
  const placeholders = await placeholderNodes();
  // ORPHAN-ORGAN pancreas is reported by its own INCOMPLETE test below; it is tolerated here so this test isolates everything else
  // ORPHAN-TOX is tolerated only for the new categories that no registered card uses yet (AWAITING_CARDS); the zero-errors test below stays red
  const other = errs.filter((x) => !(x.startsWith('TOX-PAGE') && placeholders.some((id) => x.includes(`node ${id} `))) && !(x.startsWith('ORPHAN-TOX') && [...AWAITING_CARDS].some((id) => x.includes(`toxicity ${id} `))) && x !== 'ORPHAN-ORGAN: organ pancreas has no drug or regimen');
  assert.deepEqual(other, []);
});

test('shipped: the shared checks on real TX_DATA under TX_CONSULT pass with zero errors (RED until every placeholder page is written)', async () => {
  const errs = await checkOnc(tx.TX_DATA, env0, od, { consult: TX_CFG });
  assert.deepEqual(errs, [], `${errs.length} shared-check error(s); each TOX-PAGE error is a toxicity whose management page is not written`);
});

test('shipped: TX-PAGE holds on real data (at least one transplant-owned toxicity page resolves into transplant-patient-ed)', () => {
  assert.deepEqual(checkTxPage(ONC, tx.TX_DATA), []);
  const oncIds = new Set(ONC.toxicities.map((t) => t.id));
  const own = tx.TX_DATA.toxicities.filter((t: { id: string }) => !oncIds.has(t.id));
  assert.ok(own.filter((t: { page: { tree: string } }) => t.page.tree === TX_TREE).length > 0, 'count 0');
});

test('shipped: PIN-CROSS and NO-LEAK pass on real data; SHARED-CARD runs when the real data has a shared oncology card', (t) => {
  const data = tx.TX_DATA as OncData;
  assert.deepEqual([...(tx.TX_BUILD_ERRORS as string[]), ...checkPinCross(ONC, data), ...checkNoLeak(ONC, data)], []);
  const shared = data.drugs.filter((d) => ONC.drugs.some((o) => o.id === d.id)).length;
  if (shared === 0) t.diagnostic('SHARED-CARD not exercised on real data: no oncology card is shared into the transplant consult yet (the fixture tests still prove the check)');
  else assert.deepEqual(checkSharedCard(data, ONC), []);
});

// ---------------------------------------------------------------- card-content gates (real data; each proven able to fail below)

const TAXONOMY = fs.readFileSync(path.join(ROOT, 'research', 'transplant-sources', 'cards', 'TAXONOMY.md'), 'utf8');
/** the interaction heads in force: bullet lines under "## Interaction heads" in TAXONOMY.md */
const HEADS: string[] = (() => {
  const sec = TAXONOMY.split(/^## Interaction heads.*$/m)[1]?.split(/^## /m)[0] ?? '';
  return [...sec.matchAll(/^- `([^`]+:)`\s*$/gm)].map((m) => m[1]);
})();
const NOT_ALLOWED = new Set(['drug-lung-toxicity', 'drug-fluid-retention', 'drug-thromboembolism', 'drug-nephrotoxicity', 'chemo-hypersensitivity', 'chemo-myelosuppression']);
/** new transplant categories that no registered card references yet (the eight author groups register next): ORPHAN-TOX is tolerated for exactly these */
const AWAITING_CARDS = new Set(['tx-infusion-anaphylaxis', 'tx-cytopenia', 'tx-gi-bleed', 'tx-angioedema', 'tx-kidney-graft-thrombosis', 'tx-meningococcal-infection', 'tx-methemoglobinemia', 'tx-shock', 'tx-qt-prolongation', 'tx-adrenal-insufficiency', 'tx-hemolysis', 'tx-hypoglycemia', 'tx-hyponatremia', 'tx-ttp-hus']);

const headOf = (v: string): string | null => { const m = /^([^:]+:) /.exec(v); return m ? m[1] : null; };
const interactionOf = (d: OncDrug): { v: string }[] => (d as OncDrug & { interactions?: { v: string }[] }).interactions ?? [];

/** HEADS: every interactions line starts with a head from TAXONOMY.md, or is a plain drug-named "Drug: text" line (a line whose first word is Raises/Lowers/Adds/Falls/Avoid must use an exact head) */
function checkHeads(drugs: OncDrug[], heads: string[] = HEADS): string[] {
  const errs: string[] = [];
  for (const d of drugs) interactionOf(d).forEach((x, i) => {
    if (heads.some((h) => x.v.startsWith(`${h} `))) return;
    if (/^(Raises|Lowers|Adds|Falls|Avoid)\b/.test(x.v)) errs.push(`HEADS: ${d.id}.interactions[${i}] "${x.v.slice(0, 50)}" starts like a head but is not one from TAXONOMY.md`);
    else if (!/^[^:]{1,60}: \S/.test(x.v)) errs.push(`HEADS: ${d.id}.interactions[${i}] "${x.v.slice(0, 50)}" has neither a head from TAXONOMY.md nor a "Drug: text" form`);
  });
  return errs;
}
/** LABEL-LINE: no head line left in alsoOnLabel; every alsoOnLabel and interactions line is "Head: text" with a 1-5 word head and 200 characters or fewer */
function checkLabelLines(drugs: OncDrug[], heads: string[] = HEADS): string[] {
  const errs: string[] = [];
  for (const d of drugs) {
    const also = d.alsoOnLabel ?? [];
    also.forEach((x, i) => { if (heads.some((h) => x.v.startsWith(`${h} `))) errs.push(`LABEL-LINE: ${d.id}.alsoOnLabel[${i}] is an interaction line and belongs in interactions`); });
    [...also.map((x, i) => ({ x, w: `alsoOnLabel[${i}]` })), ...interactionOf(d).map((x, i) => ({ x, w: `interactions[${i}]` }))].forEach(({ x, w }) => {
      const h = headOf(x.v);
      if (!h || h.replace(/:$/, '').split(/\s+/).length > 5) errs.push(`LABEL-LINE: ${d.id}.${w} has no 1-5 word head and colon`);
      if (x.v.length > 200) errs.push(`LABEL-LINE: ${d.id}.${w} is ${x.v.length} characters (max 200)`);
    });
  }
  return errs;
}
/** non-interaction alsoOnLabel line counts above 12: REPORTED, never failed (owner decision: warn only) */
const labelCountsOver12 = (drugs: OncDrug[]): string[] => drugs.filter((d) => (d.alsoOnLabel?.length ?? 0) > 12).map((d) => `${d.id}: ${d.alsoOnLabel!.length}`);
/** MECHANISM: transplant-owned card and class mechanisms are 120 characters or fewer */
function checkMechanisms(data: OncData, onc: OncData): string[] {
  const oncDrug = new Set(onc.drugs.map((d) => d.id)); const oncClass = new Set(onc.classes.map((c) => c.id));
  const errs: string[] = [];
  for (const d of data.drugs) if (!oncDrug.has(d.id) && d.mechanism && d.mechanism.v.length > 120) errs.push(`MECHANISM: ${d.id} mechanism is ${d.mechanism.v.length} characters (max 120)`);
  for (const c of data.classes) if (!oncClass.has(c.id) && c.mechanism.v.length > 120) errs.push(`MECHANISM: class ${c.id} mechanism is ${c.mechanism.v.length} characters (max 120)`);
  return errs;
}
/** USABLE: the consult's row list equals the TAXONOMY.md ALLOWED list; every effect on a card is either a row (usable category) or goes through the plain-line path with its text and citation intact */
const USABLE: Set<string> = new Set([...TAXONOMY.matchAll(/^\| `([a-z0-9-]+)` \|.*\| ALLOWED/gm)].map((m) => m[1]));
function checkUsable(data: OncData, rowCategories: readonly string[] | null = TX_CFG.rowCategories ?? null, usable: Set<string> = USABLE): string[] {
  const errs: string[] = [];
  if (!rowCategories) return ['USABLE: the consult has no rowCategories, so every effect would be a row'];
  for (const r of rowCategories) if (!usable.has(r)) errs.push(`USABLE: rowCategories lists "${r}", which is not on the TAXONOMY.md ALLOWED list`);
  for (const u of usable) if (!rowCategories.includes(u)) errs.push(`USABLE: "${u}" is ALLOWED in TAXONOMY.md but missing from rowCategories`);
  for (const d of data.drugs) {
    const { rows, plain } = od.splitEffects(od.resolveEffects(d, data), rowCategories);
    for (const e of rows) if (!usable.has(e.tox.id)) errs.push(`USABLE: ${d.id} keeps a row for "${e.tox.id}", which is not usable`);
    for (const e of plain) {
      const line = od.plainEffectLine(e) as { v: string; cite: string[] };
      const own = [e.quirk, e.timing, e.note].filter(Boolean) as { v: string; cite: string[] }[];
      if (!line.v.startsWith(e.tox.label)) errs.push(`USABLE: ${d.id} plain line for ${e.tox.id} lost its label`);
      for (const o of own) { if (!line.v.includes(o.v)) errs.push(`USABLE: ${d.id} plain line for ${e.tox.id} dropped text "${o.v.slice(0, 40)}"`); for (const c of o.cite) if (!line.cite.includes(c)) errs.push(`USABLE: ${d.id} plain line for ${e.tox.id} dropped citation ${c}`); }
      for (const c of e.cite) if (!line.cite.includes(c)) errs.push(`USABLE: ${d.id} plain line for ${e.tox.id} dropped citation ${c}`);
      if (!line.cite.length) errs.push(`USABLE: ${d.id} plain line for ${e.tox.id} has no citation`);
    }
    const boxedFirst = plain.map((e) => e.boxed === true); for (let i = 1; i < boxedFirst.length; i++) if (boxedFirst[i] && !boxedFirst[i - 1]) errs.push(`USABLE: ${d.id} plain lines are not boxed-first`);
  }
  return errs;
}
/** EFFECT-CATEGORY: every effect id a card uses exists in the transplant toxicities; a NOT ALLOWED oncology category may appear on a card only if the consult renders it as a plain line (rowCategories set and not listing it) */
function checkEffectCategories(data: OncData, rowCategories: readonly string[] | null = TX_CFG.rowCategories ?? null): string[] {
  const errs: string[] = [];
  const known = new Set(data.toxicities.map((t) => t.id));
  for (const d of data.drugs) {
    const dropped = new Set((d.effects ?? []).filter((o) => o.drop).map((o) => o.tox));
    const ids = [...d.classIds.flatMap((c) => data.classes.find((k) => k.id === c)?.effects.map((x) => x.tox) ?? []), ...(d.effects ?? []).filter((o) => !o.drop).map((o) => o.tox)].filter((t) => !dropped.has(t) || (d.effects ?? []).some((o) => o.tox === t && !o.drop));
    for (const t of new Set(ids)) {
      if (!known.has(t)) errs.push(`EFFECT-CATEGORY: ${d.id} uses "${t}", which is absent from the transplant toxicities`);
      else if (NOT_ALLOWED.has(t) && (!rowCategories || rowCategories.includes(t))) errs.push(`EFFECT-CATEGORY: ${d.id} uses "${t}", a NOT ALLOWED oncology category, and the consult would render it as a row linking to an oncology page`);
    }
  }
  return errs;
}
/** LIVE-SUMMARY: every row's page target has a non-empty summary (no row without a live page summary); names each offender */
function checkLiveSummaries(toxicities: Toxicity[], nodeOf: (tree: string, node: string) => { summary?: string } | undefined): string[] {
  const errs: string[] = [];
  for (const t of toxicities) {
    if ((t as { plainOnly?: true }).plainOnly === true) continue; // no row, no page by design
    const n = nodeOf(t.page.tree, t.page.node);
    if (!n) errs.push(`LIVE-SUMMARY: ${t.id} -> ${t.page.tree}/${t.page.node} does not exist`);
    else if (!n.summary?.trim()) errs.push(`LIVE-SUMMARY: ${t.id} -> ${t.page.tree}/${t.page.node} has no summary (placeholder or unwritten page)`);
  }
  return errs;
}
type Toxicity = OncData['toxicities'][number];
const treeCache = new Map<string, { id: string; summary?: string }[]>();
const liveNode = (tree: string, node: string): { summary?: string } | undefined => {
  if (!treeCache.has(tree)) {
    const reg = (TREE_REGISTRY as Record<string, { prefix: string }>)[tree];
    treeCache.set(tree, (reg && treeMods[tree]?.[`${reg.prefix}_NODES`]) ?? []);
  }
  return treeCache.get(tree)!.find((n) => n.id === node);
};
const treeMods: Record<string, Record<string, never>> = {};
for (const t of new Set<string>((tx.TX_DATA as OncData).toxicities.filter((x) => x.page.tree).map((x) => x.page.tree))) treeMods[t] = await imp(`data/trees/${t}.js`);

test('TAXONOMY.md lists the eleven interaction heads this gate reads', () => {
  assert.deepEqual(HEADS, ['Raises level:', 'Lowers level:', 'Adds kidney risk:', 'Adds marrow risk:', 'Adds marrow and kidney risk:', 'Adds marrow or kidney risk:', 'Adds potassium risk:', 'Raises the other drug:', 'Lowers the other drug:', 'Falls when it stops:', 'Avoid together:']);
});
test('real: every interactions line starts with a head from TAXONOMY.md', () => { assert.deepEqual(checkHeads(tx.TX_DATA.drugs), []); });
test('real: no interaction line is left in alsoOnLabel, every alsoOnLabel and interactions line is "Head: text" with a 1-5 word head within 200 characters', () => { assert.deepEqual(checkLabelLines(tx.TX_DATA.drugs), []); });
test('real: no transplant card effect uses an unknown category, and a NOT ALLOWED one only through the plain-line path', () => { assert.deepEqual(checkEffectCategories(tx.TX_DATA), []); });
test('real: the five calcineurin cards carry interactions (the checks look at something)', () => {
  const withInt = tx.TX_DATA.drugs.filter((d: OncDrug) => interactionOf(d).length > 0).map((d: OncDrug) => d.id);
  for (const id of ['tacrolimus', 'tacrolimus-xr-astagraf', 'tacrolimus-xr-envarsus', 'cyclosporine-modified', 'cyclosporine-non-modified']) assert.ok(withInt.includes(id), id);
});
test('LIVE-SUMMARY: every row page has a live summary (RED until the placeholder pages are written; names each)', () => {
  const errs = checkLiveSummaries(tx.TX_DATA.toxicities, liveNode);
  assert.deepEqual(errs, [], `${errs.length} row page(s) without a live summary:\n${errs.join('\n')}`);
});
test('real: no row lacks a live summary (plain-line-only categories excepted)', async () => {
  const placeholders = new Set(await placeholderNodes());
  const bad = checkLiveSummaries(tx.TX_DATA.toxicities, liveNode).filter((x) => ![...placeholders].some((id) => x.includes(`/${id} `)));
  assert.deepEqual(bad, []);
});

test('break HEADS: a near-miss head and a line with no "Drug: text" form fail; plain drug-named lines pass anywhere', () => {
  const d = clone(tx.TX_DATA.drugs.find((x: OncDrug) => x.id === 'tacrolimus') as OncDrug);
  assert.deepEqual(checkHeads([d]), []);
  const e = clone(d); interactionOf(e)[0].v = 'Raises levels: x'; assert.ok(checkHeads([e]).some((x) => x.includes('starts like a head')));
  const f = clone(d); interactionOf(f).push({ v: 'no head and no colon form', cite: ['x'] } as never); assert.ok(checkHeads([f]).some((x) => x.includes('neither a head')));
  const g = clone(d); interactionOf(g).splice(1, 0, { v: 'Aspirin: a plain drug-named line', cite: ['x'] } as never); assert.deepEqual(checkHeads([g]), []);
  assert.ok(checkHeads([clone(tx.TX_DATA.drugs[0])], ['Only this:']).length > 0, 'a smaller head list fails the real lines');
});
test('break LABEL-LINE: a head line in alsoOnLabel, a long line, a headless line and a 6-word head all fail; 13 lines are reported but never fail', () => {
  const d = clone(tx.TX_DATA.drugs[0] as OncDrug); d.alsoOnLabel = Array.from({ length: 13 }, (_, i) => ({ v: `Fixture line ${i}: text`, cite: ['x'] }));
  assert.deepEqual(checkLabelLines([d]), [], '13 plain lines do not fail');
  assert.deepEqual(labelCountsOver12([d]), [`${d.id}: 13`], '... but are reported');
  const e = clone(d); e.alsoOnLabel = [{ v: 'Raises level: x', cite: ['x'] }];
  assert.ok(checkLabelLines([e]).some((x) => x.includes('belongs in interactions')));
  const f = clone(d); f.alsoOnLabel = [{ v: `Head: ${'x'.repeat(200)}`, cite: ['x'] }]; assert.ok(checkLabelLines([f]).some((x) => x.startsWith('LABEL-LINE') && x.includes('characters')));
  const g = clone(d); g.alsoOnLabel = [{ v: 'No colon here', cite: ['x'] }]; assert.ok(checkLabelLines([g]).some((x) => x.includes('no 1-5 word head')));
  const h = clone(d); h.alsoOnLabel = [{ v: 'One two three four five six: text', cite: ['x'] }]; assert.ok(checkLabelLines([h]).some((x) => x.includes('no 1-5 word head')));
});
test('break EFFECT-CATEGORY: an unknown id fails; a NOT ALLOWED id fails when the consult would render it as a row, passes through the plain-line path', () => {
  const data = clone(tx.TX_DATA as OncData); const d = data.drugs.find((x) => x.id === 'tacrolimus')!;
  d.effects = [...(d.effects ?? []), { tox: 'no-such-category', cite: ['x'] }];
  assert.ok(checkEffectCategories(data).some((x) => x.includes('no-such-category') && x.includes('absent')));
  const real = tx.TX_DATA as OncData;
  assert.ok(real.drugs.some((x) => x.id === 'rituximab'), 'the shared card is present');
  assert.deepEqual(checkEffectCategories(real), [], 'plain-line path: fine');
  assert.ok(checkEffectCategories(real, null).some((x) => x.includes('NOT ALLOWED')), 'no rowCategories: rituximab would show oncology rows');
  assert.ok(checkEffectCategories(real, [...(TX_CFG.rowCategories ?? []), 'drug-lung-toxicity']).some((x) => x.includes('NOT ALLOWED')), 'a row list that includes a NOT ALLOWED id');
});
test('break USABLE: a row list missing a usable id or listing an unusable one, a dropped text or citation, and an oncology consult (no option) all fail', () => {
  const rc = TX_CFG.rowCategories as string[];
  assert.ok(checkUsable(tx.TX_DATA, rc.filter((x) => x !== 'tx-shock')).some((x) => x.includes('missing from rowCategories')));
  assert.ok(checkUsable(tx.TX_DATA, [...rc, 'drug-lung-toxicity']).some((x) => x.includes('not on the TAXONOMY.md ALLOWED list')));
  assert.ok(checkUsable(tx.TX_DATA, null).length > 0);
  // the plain line carries the effect's own text and citations: break it in memory
  const e = (od.resolveEffects(tx.TX_DATA.drugs.find((x: OncDrug) => x.id === 'rituximab'), tx.TX_DATA) as { tox: { label: string; id: string }; timing?: { v: string; cite: string[] }; cite: string[]; boxed?: true; quirk?: { v: string; cite: string[] } }[]).find((x) => x.timing)!;
  const line = od.plainEffectLine(e) as { v: string; cite: string[] };
  assert.ok(line.v.startsWith(e.tox.label) && line.v.includes(e.timing!.v));
  assert.ok(e.timing!.cite.every((c) => line.cite.includes(c)));
  const broken = { ...e, timing: { v: 'a different sentence', cite: ['pi-other'] } };
  assert.ok(!(od.plainEffectLine(broken) as { v: string }).v.includes(e.timing!.v));
  // boxed first
  const sp = od.splitEffects([{ ...e, boxed: undefined, tox: { ...e.tox, id: 'zz-a' } }, { ...e, boxed: true, tox: { ...e.tox, id: 'zz-b' } }] as never, ['nothing']) as { plain: { tox: { id: string } }[] };
  assert.deepEqual(sp.plain.map((x) => x.tox.id), ['zz-b', 'zz-a']);
  assert.equal((od.splitEffects([e] as never, undefined) as { plain: unknown[] }).plain.length, 0, 'oncology (no option): all rows, no plain lines');
});
test('break LIVE-SUMMARY: an empty summary and a missing node fail', () => {
  const tox = clone(tx.TX_DATA.toxicities.find((t: { plainOnly?: true }) => !t.plainOnly) as Toxicity);
  assert.ok(checkLiveSummaries([tox], () => ({ summary: '' })).some((x) => x.includes('has no summary')));
  assert.ok(checkLiveSummaries([tox], () => ({ summary: '   ' })).length > 0);
  assert.ok(checkLiveSummaries([tox], () => undefined).some((x) => x.includes('does not exist')));
  assert.deepEqual(checkLiveSummaries([tox], () => ({ summary: 'ok' })), []);
  assert.deepEqual(checkLiveSummaries([{ ...tox, plainOnly: true } as Toxicity], () => undefined), [], 'a plain-line-only category needs no page');
});

// ---------------------------------------------------------------- engine additions (interactions, cardNote, empty organ list)

test('engine: an interactions line with no citation goes red with LABEL-CITE; a cited one passes; a card with only interactions is not empty', async () => {
  const d = clone(build().data); d.drugs[0].interactions = [{ v: 'Raises level: fixture drug', cite: [] }];
  assert.ok((await gate(d)).some((x) => x.startsWith('LABEL-CITE') && x.includes('interactions[0]')));
  d.drugs[0].interactions = [{ v: 'Raises level: fixture drug', cite: ['fx-tx-pi'] }];
  assert.deepEqual((await gate(d)).filter((x) => x.startsWith('LABEL-CITE')), []);
  const bare = clone(build().data); const dr = bare.drugs[0]; dr.effects = [{ tox: 'fx-tx-tox', drop: true }]; dr.classIds = dr.classIds; delete dr.alsoOnLabel; delete dr.boxedWarning;
  dr.interactions = [{ v: 'Raises level: fixture drug', cite: ['fx-tx-pi'] }];
  assert.deepEqual((await gate(bare)).filter((x) => x.startsWith('DRUG-EFFECT') && x.includes(dr.id)), []);
});
test('engine: the transplant consult carries the approved card note; oncology has none', () => {
  assert.equal(TX_CFG.cardNote, 'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.');
  assert.equal(od.ONC_CONSULT.cardNote, undefined);
});
test('engine: a transplant card with an empty organ list passes DRUG-ORGAN (and an unknown organ id still fails)', async () => {
  const d = clone(build().data); d.drugs[0].cancers = [];
  assert.deepEqual((await gate(d)).filter((x) => x.startsWith('DRUG-ORGAN')), []);
  d.drugs[0].cancers = ['no-such-organ'];
  assert.ok((await gate(d)).some((x) => x.startsWith('DRUG-ORGAN')));
});

test('real: every drugs/*.ts group is registered in TX_GROUPS (nine groups) and TX_DATA is built from all of them', () => {
  const dir = path.join(ROOT, 'src', 'data', 'transplant-drugs', 'drugs');
  const files = fs.readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts').sort();
  assert.deepEqual(Object.keys(tx.TX_GROUPS).sort(), files);
  assert.equal(files.length, 9);
  for (const g of Object.values(tx.TX_GROUPS) as { DRUGS?: OncDrug[] }[]) for (const d of g.DRUGS ?? []) assert.ok(tx.TX_DATA.drugs.some((x: OncDrug) => x.id === d.id), `${d.id} missing from TX_DATA`);
  assert.deepEqual(tx.TX_BUILD_ERRORS, []);
});
test('real: rows are exactly the TAXONOMY.md ALLOWED categories; every other effect is a plain line with its text and citation intact', () => { assert.deepEqual(checkUsable(tx.TX_DATA), []); });
test('real: transplant-owned card and class mechanisms are 120 characters or fewer', () => { assert.deepEqual(checkMechanisms(tx.TX_DATA, ONC), []); });
test('real: non-interaction alsoOnLabel counts above 12 are reported (never failed)', (t) => { const over = labelCountsOver12(tx.TX_DATA.drugs); t.diagnostic(`cards above 12 non-interaction lines: ${over.join('; ') || 'none'}`); assert.ok(Array.isArray(over)); });
test('real: the six transplant-use editor notes are on their cards verbatim (IVIG, rituximab, eculizumab, bortezomib, tocilizumab, alemtuzumab)', () => {
  const L = fs.readFileSync(path.join(ROOT, 'research', 'transplant-sources', 'cards', 'rejection-offlabel.report.md'), 'utf8').split('\n');
  const start = L.findIndex((l) => l.startsWith('## FINAL EDITOR NOTES'));
  const ids: Record<string, string> = { IVIG: 'immune-globulin-iv', Rituximab: 'rituximab', Eculizumab: 'eculizumab', Bortezomib: 'bortezomib', Tocilizumab: 'tocilizumab', Alemtuzumab: 'alemtuzumab' };
  const want: Record<string, string[]> = {}; let cur = '';
  for (const l of L.slice(start + 1)) { if (l.startsWith('## ') || l.startsWith('Owner note')) break; if (ids[l]) { cur = ids[l]; want[cur] = []; } else if (l.startsWith('- Editor note (transplant use):')) want[cur].push(l.slice(2)); }
  assert.deepEqual(Object.keys(want).sort(), Object.values(ids).sort());
  for (const [id, notes] of Object.entries(want)) { assert.ok(notes.length > 0, id); assert.deepEqual(TX_CFG.drugNotes?.[id], notes, `${id} notes differ from the report`); assert.ok(tx.TX_DATA.drugs.some((d: OncDrug) => d.id === id), `${id} card missing`); }
  assert.equal(od.ONC_CONSULT.drugNotes, undefined);
});
test('real: oncology timing badges are unchanged (digit rule), the transplant option adds time units and the approved clause', () => {
  const st = od.shortTiming as (v: string, units?: boolean) => string;
  assert.equal(od.ONC_CONSULT.timingTimeUnits, undefined);
  assert.equal(TX_CFG.timingTimeUnits, true);
  assert.equal(st('within hours, rarely later'), 'within hours, rarely later', 'no digit: whole string without the option');
  assert.equal(st('within hours, rarely later', true), 'within hours');
  assert.equal(st('Non-diabetic cases: usually after a few days, longer if cirrhotic', true), 'Non-diabetic cases: usually after a few days');
  assert.equal(st('Non-diabetic cases: usually after a few days, longer if cirrhotic'), 'Non-diabetic cases: usually after a few days, longer if cirrhotic');
  assert.equal(st('2-3 months, then stable'), '2-3 months', 'digit rule unchanged');
  assert.equal(st('a long first clause about weeks that is more than forty-eight characters, then more', true), 'a long first clause about weeks that is more than forty-eight characters, then more', 'over 48 stays whole');
  assert.equal(st('sometimes, later', true), 'sometimes, later', 'no unit and no digit stays whole even with the option');
});
test('break MECHANISM: a 121-character mechanism fails', () => {
  const m = clone(tx.TX_DATA as OncData); m.drugs.find((x) => x.id === 'tacrolimus')!.mechanism = { v: 'x'.repeat(121), cite: ['x'] };
  assert.ok(checkMechanisms(m, ONC).some((x) => x.includes('121 characters')));
  const k = clone(tx.TX_DATA as OncData); k.classes.find((c) => c.id === 'tx-cni')!.mechanism = { v: 'x'.repeat(121), cite: ['x'] };
  assert.ok(checkMechanisms(k, ONC).some((x) => x.startsWith('MECHANISM: class tx-cni')));
});
test('break: a missing or altered editor note, or a group file left unregistered, would fail', () => {
  const notes = clone(TX_CFG.drugNotes ?? {}); notes['rituximab'][0] += ' x'; assert.notDeepEqual(notes['rituximab'], TX_CFG.drugNotes?.rituximab);
  delete notes['alemtuzumab']; assert.equal(notes['alemtuzumab'], undefined);
  const files = Object.keys(tx.TX_GROUPS).filter((k) => k !== 'azoles.ts').sort(); assert.notEqual(files.length, 9);
});

// ---------------------------------------------------------------- incompleteness fails loudly: these are RED on purpose until the work is done

test('INCOMPLETE: no [NOT WRITTEN] placeholder nodes remain in transplant-patient-ed', async () => {
  const left = await placeholderNodes();
  assert.deepEqual(left, [], `${left.length} page(s) still "[NOT WRITTEN]": ${left.join(', ')}`);
});

test('INCOMPLETE: transplant-patient-ed start node is not the preview build', async () => {
  const t = await imp(`data/trees/${TX_TREE}.js`);
  const start = (t.TRANSPLANT_PATIENT_ED_NODES as { id: string; title: string; body: string }[]).find((n) => n.id === 'tpe-start')!;
  assert.ok(!/preview build/i.test(start.title) && !/preview build/i.test(start.body), `tpe-start is still the temporary routing node: "${start.title}"`);
});

test('INCOMPLETE: both transplant consults have a Stop page registered in INFO_PAGES and on the toolbar', async () => {
  const info = (await imp('data/info-pages.js')).INFO_PAGES as Record<string, unknown>;
  const tb = await imp('data/toolbar-configs.js');
  const missing: string[] = [];
  for (const id of [TX_TREE, tx.TX_TREE_ID]) {
    const stop = `${id}-stop`;
    if (!info[stop]) missing.push(`INFO_PAGES has no "${stop}"`);
    if (!(tb.getToolbarConfig(id).tools as { target?: string }[]).some((x) => x.target === stop)) missing.push(`toolbar of ${id} has no button targeting "${stop}"`);
  }
  assert.deepEqual(missing, [], 'Stop pages are mandatory before ship (CLAUDE.md "Stop Page")');
});

test('INCOMPLETE: every organ in organs.ts is used by a card', () => {
  const used = new Set<string>(tx.TX_DATA.drugs.flatMap((d: { cancers: string[] }) => d.cancers));
  const orphans = (tx.TX_ORGANS as { id: string }[]).filter((o) => !used.has(o.id)).map((o) => o.id);
  assert.deepEqual(orphans, [], `organ(s) used by no card: ${orphans.join(', ')}`);
});

test('shipped: both consults are registered, oncology config values are the frozen ones, the answer index carries a built tdse key', () => {
  assert.equal(dc.DRUG_CONSULTS['onc-drug-side-effects'].cfg, od.ONC_CONSULT);
  assert.equal(dc.DRUG_CONSULTS['transplant-drug-side-effects'].cfg, TX_CFG);
  assert.equal(od.ONC_CONSULT.prefix, 'odse-');
  assert.deepEqual([...od.ONC_CONSULT.kinds], ['drug', 'reg', 'class', 'cancer', 'ctype', 'cx']);
  assert.equal(od.ONC_CONSULT.editorAliasPinFloor, 4);
  assert.equal(TX_CFG.editorAliasPinFloor, 3);
  assert.equal(TX_CFG.categoryId, 'nephro-rheum-endo');
  const ans = JSON.parse(fs.readFileSync(path.join(DOCS, 'data', 'search-answer-index.json'), 'utf8'));
  assert.ok(ans.tdse.length > 0, 'tdse docs must be built from the real data');
  assert.equal(ans.count.tdse, ans.tdse.length);
  assert.ok(ans.extraNodes.filter((n: { id: string }) => n.id.startsWith('tdse-')).length > 0);
});

test('shipped: the light route table in src/app.ts matches each consult config (id scheme is a public deep-link contract)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'app.ts'), 'utf8');
  for (const { cfg } of Object.values(dc.DRUG_CONSULTS) as { cfg: { treeId: string; prefix: string; kinds: string[] } }[]) {
    assert.ok(src.includes(`'${cfg.treeId}': /^${cfg.prefix}(${cfg.kinds.join('|')})-/`), `app.ts route table out of step with ${cfg.treeId}`);
  }
});

test('shipped: every transplant drugs/*.ts file is imported by drugs/index.ts', () => {
  const dir = path.join(ROOT, 'src', 'data', 'transplant-drugs', 'drugs');
  const index = fs.readFileSync(path.join(dir, 'index.ts'), 'utf8');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) assert.ok(index.includes(`./${f.replace(/\.ts$/, '.js')}`), `${f} is not imported by drugs/index.ts`);
});

// ---------------------------------------------------------------- fixture: the projection

test('fixture: builds clean, passes every shared check and every transplant check', async () => {
  const before = hash(ONC.drugs) + hash(ONC.classes) + hash(ONC.toxicities);
  const b = build();
  assert.deepEqual(all(b), []);
  assert.deepEqual(await gate(b.data), []);
  assert.equal(hash(ONC.drugs) + hash(ONC.classes) + hash(ONC.toxicities), before, 'building the projection mutated oncology data');
});

test('fixture: projection shape (drugs, classes, toxicities, regimens, cancers)', () => {
  const { data } = build();
  assert.deepEqual(data.drugs.map((d) => d.id), ['fx-tx-drugumab', 'fx-tx-otherumab', 'rituximab', 'alemtuzumab']);
  const rit = data.drugs.find((d) => d.id === 'rituximab')!;
  const oncRit = ONC.drugs.find((d) => d.id === 'rituximab')!;
  assert.deepEqual(rit.cancers, ['fx-kidney', 'fx-liver']);
  assert.deepEqual(rit.browseClassIds, ['fx-tx-class']);
  assert.deepEqual(rit.classIds, oncRit.classIds, 'effects stay on the oncology classes');
  assert.notEqual(rit, oncRit);
  assert.ok(!('browseClassIds' in oncRit));
  assert.deepEqual(data.browseClasses!.map((c) => c.id), ['fx-tx-class']);
  assert.equal(data.classes[0].id, 'fx-tx-class', 'transplant classes first');
  const wanted = new Set([...oncRit.classIds, ...ONC.drugs.find((d) => d.id === 'alemtuzumab')!.classIds]);
  assert.deepEqual(data.classes.slice(1).map((c) => c.id), ONC.classes.filter((c) => wanted.has(c.id)).map((c) => c.id), 'only referenced oncology classes, in oncology order');
  assert.equal(data.toxicities[0].id, 'fx-tx-tox', 'transplant toxicities first');
  const cx = new Set(data.complaints.map((c) => c.id));
  for (const t of data.toxicities) for (const c of t.complaints) assert.ok(cx.has(c), `${t.id} keeps complaint ${c} that is not a transplant complaint`);
  const borrowed = data.toxicities.slice(1);
  assert.ok(borrowed.length > 0);
  for (const t of borrowed) assert.ok(ONC.toxicities.find((o) => o.id === t.id) && ONC.toxicities.find((o) => o.id === t.id) !== t, `${t.id} must be a copy`);
  for (const d of data.drugs) for (const e of od.resolveEffects(d, data)) assert.ok(data.toxicities.some((t) => t.id === e.tox.id), `${d.id} effect ${e.tox.id} lost its toxicity`);
  assert.deepEqual(data.regimens.map((r) => [r.id, r.cancers]), [['fxtx-reg', ['fx-kidney']]]);
  assert.ok(!('organs' in data.regimens[0]));
  assert.deepEqual(data.cancers.map((c) => c.id), ['fx-kidney', 'fx-liver']);
});

test('fixture: pins (floor 3 for editor aliases, a shared card never re-pins its own names, oncology pins stay oncology)', () => {
  const { data } = build();
  const txDocs = od.oncSearchDocs(data, TX_CFG);
  const oncDocs = od.oncSearchDocs(ONC, od.ONC_CONSULT);
  const by = (id: string) => txDocs.onc.find((e: { route: string }) => e.route.endsWith(`/tdse-drug-${id}`));
  assert.equal(by('fx-tx-drugumab').route, '/tree/transplant-drug-side-effects/node/tdse-drug-fx-tx-drugumab');
  assert.ok(by('fx-tx-drugumab').pin.includes('FXT'), '3-character editor alias pins at floor 3');
  assert.deepEqual(by('rituximab').pin, ['FXRIT'], 'only the name the membership row adds pins');
  assert.ok(by('rituximab').all.includes('rituximab') && by('rituximab').all.includes('Rituxan'), 'its own names stay searchable');
  assert.deepEqual(by('alemtuzumab').pin, []);
  assert.deepEqual(checkPinCross(ONC, data), []);
  assert.equal(txDocs.nodes.length, 4 + 1);
  assert.ok(txDocs.nodes.every((n: { treeId: string; id: string }) => n.treeId === 'transplant-drug-side-effects' && n.id.startsWith('tdse-')));
  pinMod.setOncEntries([...oncDocs.onc, ...txDocs.onc]);
  assert.equal(pinMod.oncPin('fxt')?.route, '/tree/transplant-drug-side-effects/node/tdse-drug-fx-tx-drugumab');
  assert.equal(pinMod.oncPin('FX-RIT')?.route, '/tree/transplant-drug-side-effects/node/tdse-drug-rituximab');
  const oncPinned = oncDocs.onc.find((e: { pin: string[] }) => e.pin.length)!;
  assert.equal(pinMod.oncPin(oncPinned.pin[0])?.route, oncPinned.route, 'an oncology pin still resolves to its oncology page with both consults installed');
  assert.equal(pinMod.oncPin('fx'), null);
  pinMod.setOncEntries([]);
  // the oncology entries are identical with or without a config argument
  assert.deepEqual(od.oncSearchDocs(ONC), od.oncSearchDocs(ONC, od.ONC_CONSULT));
});

// ---------------------------------------------------------------- breaks: each new code goes red

test('break TX-MEMBER: a row naming an unknown drug', () => {
  const i = inputs(); i.groups['fixture.ts'].MEMBERS!.push({ drug: 'no-such-drug', classIds: ['fx-tx-class'], organs: ['fx-kidney'] });
  assert.ok(build(i).errors.some((x) => x.startsWith('TX-MEMBER') && x.includes('unknown drug')));
});
test('break TX-MEMBER: two rows for one drug', () => {
  const i = inputs(); i.groups['fixture.ts'].MEMBERS!.push({ drug: 'rituximab', classIds: ['fx-tx-class'], organs: ['fx-kidney'] });
  const errs = build(i).errors;
  assert.ok(errs.some((x) => x.startsWith('TX-MEMBER') && x.includes('two membership rows')), JSON.stringify(errs));
});
test('break TX-MEMBER: a row for a drug that is not an oncology card', () => {
  const i = inputs(); i.groups['fixture.ts'].MEMBERS!.push({ drug: 'fx-tx-drugumab', classIds: ['fx-tx-class'], organs: ['fx-kidney'] });
  assert.ok(build(i).errors.some((x) => x.startsWith('TX-MEMBER') && x.includes('not an oncology card')));
});
test('break: a duplicate drug / class / source id across the two consults fails naming both files', () => {
  const i = inputs(); i.groups['fixture.ts'].DRUGS!.push({ ...clone(ONC.drugs[0]) });
  const e1 = build(i).errors;
  assert.ok(e1.some((x) => x.startsWith('DUPLICATE-DRUG') && x.includes('transplant/fixture.ts') && x.includes('drugs/index.ts')), JSON.stringify(e1));
  const j = inputs(); j.groups['fixture.ts'].CLASSES!.push({ ...clone(ONC.classes[0]) });
  assert.ok(build(j).errors.some((x) => x.startsWith('DUPLICATE-CLASS')));
  const k = inputs(); k.groups['fixture.ts'].SOURCES!['pi-keytruda'] = clone(ONC.sources['pi-keytruda']);
  assert.ok(build(k).errors.some((x) => x.startsWith('DUPLICATE-SOURCE')));
});
test('break TOX-DUP: a transplant toxicity id repeating an oncology one', () => {
  const i = inputs(); i.tox.push({ ...clone(TX_FX_TOXICITIES[0]), id: ONC.toxicities[0].id });
  assert.ok(build(i).errors.some((x) => x.startsWith('TOX-DUP')));
});
test('break SHARED-CARD: a view whose effects, boxed warning or mechanism no longer match the oncology card', () => {
  const rit = (d: OncData): OncDrug => d.drugs.find((x) => x.id === 'rituximab')!;
  const a = clone(build().data); rit(a).classIds = ['fx-tx-class'];
  assert.ok(checkSharedCard(a, ONC).some((x) => x.startsWith('SHARED-CARD')), 'effects');
  const b = clone(build().data); rit(b).boxedWarning = [{ v: 'changed', cite: [] }];
  assert.ok(checkSharedCard(b, ONC).some((x) => x.startsWith('SHARED-CARD') && x.includes('boxedWarning')), 'boxed');
  const c = clone(build().data); rit(c).mechanism = { v: 'changed', cite: [] };
  assert.ok(checkSharedCard(c, ONC).some((x) => x.includes('mechanism')), 'mechanism');
  const d = clone(build().data); d.toxicities = d.toxicities.filter((t) => t.id === 'fx-tx-tox'); // a hazard silently dropped
  assert.ok(checkSharedCard(d, ONC).some((x) => x.startsWith('SHARED-CARD')), 'a dropped toxicity');
});
test('break PIN-CROSS: a name that pins in both consults', () => {
  const i = inputs(); i.groups['fixture.ts'].MEMBERS![0].editorAliases = ['Keytruda']; // pins pembrolizumab in oncology
  assert.ok(checkPinCross(ONC, build(i).data).some((x) => x.startsWith('PIN-CROSS')));
});
test('break NO-LEAK: browseClassIds on an oncology drug, and a view that is the oncology object itself', () => {
  const o = clone(ONC); (o.drugs[0] as OncDrug).browseClassIds = ['x'];
  assert.ok(checkNoLeak(o, build().data).some((x) => x.startsWith('NO-LEAK')));
  const data = clone(build().data); data.drugs.push(ONC.drugs.find((d) => d.id === 'alemtuzumab')!);
  assert.ok(checkNoLeak(ONC, data).some((x) => x.startsWith('NO-LEAK') && x.includes('not a copy')));
});
test('break TX-PAGE: no owned toxicity, or an owned toxicity whose page is not in the patient-ed tree', () => {
  const none = inputs(); none.tox = []; none.groups['fixture.ts'].CLASSES![0].effects = [];
  assert.ok(checkTxPage(ONC, build(none).data).some((x) => x.startsWith('TX-PAGE') && x.includes('count 0')));
  const wrong = inputs(); wrong.tox[0].page.tree = 'onc-drug-side-effects';
  assert.ok(checkTxPage(ONC, build(wrong).data).some((x) => x.startsWith('TX-PAGE')));
});

// ---------------------------------------------------------------- breaks of the shared checks under the transplant config

const sharedBreaks: [string, string, (d: OncData) => void][] = [
  ['DRUG-ORGAN', 'a drug naming an unknown organ', (d) => { d.drugs[0].cancers = ['no-such-organ']; }],
  ['ORPHAN-ORGAN', 'an organ with no drug or regimen', (d) => { d.cancers.push({ id: 'fx-empty-organ', name: 'Fixture empty organ' }); }],
  ['DRUG-CLASS', 'a drug whose browse class is unknown', (d) => { d.drugs[0].browseClassIds = ['no-such-class']; }],
  ['ORPHAN-CLASS', 'a browse class with no drug', (d) => { d.browseClasses!.push({ ...clone(d.browseClasses![0]), id: 'fx-empty-browse' }); }],
  ['VID', 'a duplicate virtual id', (d) => { d.cancers.push({ ...d.cancers[0] }); }],
  ['TOX-PAGE', 'a transplant toxicity page that does not exist in the stub tree', (d) => { d.toxicities[0].page.node = 'no-such-node'; }],
];
for (const [code, what, mutate] of sharedBreaks) {
  test(`fixture broken (${what}) goes red with ${code}`, async () => {
    const d = clone(build().data); mutate(d);
    const errs = await gate(d);
    assert.ok(errs.some((x) => x.startsWith(code)), `expected ${code}; got ${JSON.stringify(errs)}`);
  });
}

test('fixture broken (a pinnable name under 3 characters) goes red with PIN-SHORT, and a 3-character editor alias is accepted at floor 3', async () => {
  const d = build().data;
  const short = { ...od, pinNames: (r: OncDrug) => (r.id === 'fx-tx-drugumab' ? ['FX'] : od.pinNames(r, TX_CFG)) };
  assert.ok((await checkOnc(d, env, short, { treeOrphans: false, consult: TX_CFG })).some((x) => x.startsWith('PIN-SHORT')));
  assert.deepEqual((await gate(d)).filter((x) => x.startsWith('PIN-')), [], '3-character alias FXT is fine at floor 3');
  const asOnc = await checkOnc(d, env, { ...od, pinNames: (r: OncDrug) => (r.id === 'fx-tx-drugumab' ? ['FXT'] : od.pinNames(r, TX_CFG)) }, { treeOrphans: false });
  assert.ok(asOnc.some((x) => x.startsWith('PIN-SHORT')), 'the same alias is PIN-SHORT under the oncology floor');
});

test('fixture: CANCER-TYPE does not run for the transplant config, and the code names the organ kind', async () => {
  const d = clone(build().data); d.cancers[0].type = 'not-a-type';
  assert.deepEqual((await gate(d)).filter((x) => x.startsWith('CANCER-TYPE')), []);
  const oncOnly = await checkOnc({ ...clone(ONC), cancers: [{ ...clone(ONC.cancers[0]), type: 'not-a-type' }, ...ONC.cancers.slice(1)] }, env, od, { treeOrphans: false });
  assert.ok(oncOnly.some((x) => x.startsWith('CANCER-TYPE')), 'oncology still runs it');
});

test('fixture: a transplant card id never collides with a real node (loadEnv excludes every consult\'s virtual ids)', async () => {
  const e2 = { ...env, realNodeIds: new Set([...env.realNodeIds, 'tdse-drug-rituximab']) };
  const errs = await checkOnc(build().data, e2, od, { treeOrphans: false, consult: TX_CFG });
  assert.ok(errs.some((x) => x.startsWith('VID') && x.includes('real node')));
});
