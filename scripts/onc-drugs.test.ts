/**
 * Gate for the Oncology Drugs Side-effects data. Reads compiled docs/ (run `bunx tsc` and the index builders first).
 * The shipped drug list MUST be non-empty: a gate that looked at nothing is a failure, not a pass.
 * The same checks run against scripts/fixtures/onc-fixture.ts (fake data, never shipped), and the fixture is then
 * broken in several ways to prove each check goes red.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { checkOnc, loadEnv, imp, ROOT, DOCS } from './lib/onc-checks.ts';
import { FIXTURE } from './fixtures/onc-fixture.ts';
import { scaledGroups } from './fixtures/onc-scale.ts';
import type { OncData } from '../src/data/onc-drugs/types.ts';

const od = await imp('data/onc-drugs/index.js');
const pinMod = await imp('services/onc-search-pin.js');
const env = await loadEnv();
const checkFx = (d: OncData, e = env) => checkOnc(d, e, od, { treeOrphans: false });
const clone = (d: OncData): OncData => structuredClone(d);

test('shipped: the drug list is not empty (a gate must prove it looked at something)', () => {
  assert.ok(od.ONC_DATA.drugs.length > 0, 'ONC_DATA.drugs is empty: awaiting the clinical content pass');
});

test('shipped: every consistency check passes', async () => {
  const errs = await checkOnc(od.ONC_DATA, env, od);
  assert.deepEqual(errs, []);
});

test('shipped: answer index carries every card, names under 4 characters are never pinned (digit editor aliases excepted), every pinnable name resolves', () => {
  const ans = JSON.parse(fs.readFileSync(path.join(DOCS, 'data', 'search-answer-index.json'), 'utf8'));
  const expected = od.ONC_DATA.drugs.length + od.ONC_DATA.regimens.length;
  assert.equal(ans.onc.length, expected, 'answer index onc count must equal compiled drugs + regimens (rebuild the index)');
  assert.equal(ans.extraNodes.filter((n: { treeId: string; id: string }) => n.treeId === 'onc-drug-side-effects' && /^odse-(drug|reg)-/.test(n.id)).length, expected);
  pinMod.setOncEntries(ans.onc);
  for (const e of ans.onc) for (const n of e.pin) {
    const k = pinMod.oncNorm(n);
    assert.ok(k.length >= 4 || (k.length === 3 && /\d/.test(k)), `${n} is pinned but under 4 characters (3 allowed only for a digit alias)`);
    for (const v of [n, n.toUpperCase(), `  ${n.toLowerCase()}  `, n.replace(/\s+/g, '   ')]) assert.equal(pinMod.oncPin(v)?.route, e.route, `oncPin("${v}")`);
  }
  pinMod.setOncEntries([]);
});

test('shipped: every drugs/*.ts file is imported by drugs/index.ts', () => {
  const dir = path.join(ROOT, 'src', 'data', 'onc-drugs', 'drugs');
  const index = fs.readFileSync(path.join(dir, 'index.ts'), 'utf8');
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
    assert.ok(index.includes(`./${f.replace(/\.ts$/, '.js')}`), `${f} is not imported by drugs/index.ts`);
  }
});

test('shipped: no fixture name leaks into src/ or docs/', () => {
  const hits: string[] = [];
  const walk = (dir: string): void => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name);
      if (f.isDirectory()) { if (f.name !== 'images' && f.name !== 'infographics') walk(p); continue; }
      if (!/\.(ts|js|json|html|css)$/.test(f.name)) continue;
      const s = fs.readFileSync(p, 'utf8');
      if (/testdrugumab|fixturda|fixturab|tdgx|scalebrand|scaledrug|fixtureuncarded|fx-pharma/i.test(s)) hits.push(p);
    }
  };
  walk(path.join(ROOT, 'src')); walk(DOCS);
  assert.deepEqual(hits, []);
});

// ---------------------------------------------------------------- fixture: proves the checks look at real things

test('fixture: clean data produces no errors', async () => {
  assert.deepEqual(await checkFx(FIXTURE, env), []);
});

test('fixture: the card resolves ranked effects, aliases pin, short names never pin', () => {
  const d = FIXTURE.drugs[0];
  const eff = od.resolveEffects(d, FIXTURE);
  assert.deepEqual(eff.map((x: { tox: { id: string } }) => x.tox.id), ['fx-tox-a', 'fx-tox-b', 'fx-tox-c', 'fx-tox-d', 'fx-tox-e', 'fx-tox-f'], 'lethality 1 (most lethal) sorts first even though the class lists B first');
  assert.equal(eff[0].quirk.v, 'Fixture quirk.');
  const promoted = od.resolveEffects({ ...d, effects: [{ tox: 'fx-tox-b', rank: 5 }] }, FIXTURE);
  assert.deepEqual(promoted.map((x: { tox: { id: string } }) => x.tox.id), ['fx-tox-b', 'fx-tox-a', 'fx-tox-c', 'fx-tox-d', 'fx-tox-e', 'fx-tox-f'], 'an explicit rank promotes an effect above lethality order');
  const dropped = od.resolveEffects({ ...d, effects: [{ tox: 'fx-tox-a', drop: true }] }, FIXTURE);
  assert.deepEqual(dropped.map((x: { tox: { id: string } }) => x.tox.id), ['fx-tox-b', 'fx-tox-c', 'fx-tox-d', 'fx-tox-e', 'fx-tox-f']);
  const { nodes, onc } = od.oncSearchDocs(FIXTURE);
  assert.equal(nodes.length, 4, 'two drugs and two regimens');
  assert.equal(od.cardNodeId(d), 'odse-drug-testdrugumab');
  pinMod.setOncEntries(onc);
  const route = '/tree/onc-drug-side-effects/node/odse-drug-testdrugumab';
  for (const q of ['Fixturda', 'FIXTURDA', '  fixturda ', 'testdrugumab', 'fixturab']) assert.equal(pinMod.oncPin(q)?.route, route, q);
  assert.equal(pinMod.oncPin('tdg'), null, '3-character alias is never pinned');
  assert.equal(pinMod.oncPin('fix'), null);
  assert.equal(pinMod.oncPin('tdgx4')?.route, '/tree/onc-drug-side-effects/node/odse-reg-tdgx-4', 'regimen acronym normalizes punctuation');
  assert.ok(pinMod.oncPrefix('fixtu').length === 1 && pinMod.oncPrefix('fix').length === 0, 'prefix needs 4+ characters');
  const body = nodes[0].body.toLowerCase();
  assert.ok(!body.includes('fixture effect'), 'card search text carries identity only, never side-effect text');
  const noPin = od.oncSearchDocs({ ...FIXTURE, drugs: [{ ...d, pin: false }], regimens: [] });
  pinMod.setOncEntries(noPin.onc);
  assert.equal(pinMod.oncPin('Fixturda'), null, 'pin:false is not pinned');
  assert.equal(pinMod.oncPrefix('Fixtu').length, 1, 'but still found by prefix');
  pinMod.setOncEntries([]);
});

const breaks: [string, string, (d: OncData) => void][] = [
  ['BOXED', 'boxed effect with no rank', (d) => { d.drugs[0].effects = [{ tox: 'fx-tox-a', boxed: true }]; }],
  ['BOXED', 'boxed effect on a drug with no boxed warning', (d) => { d.drugs[1].effects = [{ tox: 'fx-tox-a', boxed: true, rank: 1 }]; }],
  ['EDITOR-ALIAS', 'editor alias equal to another drug name', (d) => { d.drugs[0].editorAliases = ['Acetaminophen']; }],
  ['EDITOR-ALIAS', 'editor alias listed twice', (d) => { d.drugs[0].editorAliases = ['FXX1', 'fxx1']; }],
  ['BASIS', 'drug effect with an unknown basis value', (d) => { d.drugs[0].effects = [{ tox: 'fx-tox-a', basis: 'trial' as unknown as 'postmarketing' }]; }],
  ['BOXED', 'boxed with a value other than true', (d) => { d.drugs[0].effects = [{ tox: 'fx-tox-a', boxed: false as unknown as true }]; }],
  ['BOXED', 'boxed on a drug that has no boxedWarning', (d) => { delete d.drugs[0].boxedWarning; d.drugs[0].effects = [{ tox: 'fx-tox-a', boxed: true }]; }],
  ['DRUG-EFFECT', 'toxicity declared twice on one drug', (d) => { d.drugs[0].effects = [{ tox: 'fx-tox-a' }, { tox: 'fx-tox-a' }]; }],
  ['CANCER-TYPE', 'cancer with a type that is not in the list', (d) => { d.cancers[0].type = 'not-a-type'; }],
  ['CITE-DIGIT', 'digit string in a boxed item without a citation', (d) => { (d.drugs[0].boxedWarning as { v: string; cite: string[] }[])[1].cite = []; }],
  ['LABEL-CITE', 'also-on-the-label item with no citation (no digits)', (d) => { d.drugs[0].alsoOnLabel![1].cite = []; }],
  ['CITE-KEY', 'also-on-the-label item citing an unknown source', (d) => { d.drugs[0].alsoOnLabel![0].cite = ['nope']; }],
  ['MG-KG', 'per-kg dosing in an also-on-the-label item', (d) => { d.drugs[0].alsoOnLabel![0].v = 'Fixture 5 mg/kg'; }],
  ['CITE-DIGIT', 'digit string without a citation', (d) => { d.classes[0].mechanism = { v: 'Fixture 5 mechanism', cite: [] }; }],
  ['CITE-KEY', 'citation key that resolves to nothing', (d) => { d.classes[0].mechanism.cite = ['nope']; }],
  ['TOX-PAGE', 'dangling toxicity page', (d) => { d.toxicities[0].page.node = 'no-such-node'; }],
  ['TOX-PAGE', 'unregistered toxicity tree', (d) => { d.toxicities[0].page.tree = 'no-such-tree'; }],
  ['TOX-MORE', 'missing info page', (d) => { d.toxicities[0].more = [{ info: 'no-such-info-page', label: 'x' }]; }],
  ['PIN-COLLIDE', 'pin name colliding with a consult title', (d) => { d.drugs[0].brands = ['Oncological Emergencies']; }],
  ['PIN-DUP', 'two drugs with the same pinned name', (d) => { d.drugs.push({ ...clone(d).drugs[0], id: 'second', generic: 'secondumab', brands: ['Fixturda'], aliases: [] }); d.classes[0].effects = d.classes[0].effects.slice(); }],
  ['ORPHAN-TOX', 'toxicity used by nothing', (d) => { d.toxicities.push({ ...d.toxicities[1], id: 'fx-tox-orphan' }); }],
  ['ORPHAN-CLASS', 'class with no drug', (d) => { d.classes.push({ ...clone(d).classes[0], id: 'empty-class' }); }],
  ['DRUG-LABEL', 'label that is not an FDA label', (d) => { d.drugs[0].label = 'fx-gl'; }],
  ['TIMING', 'timing without a citation', (d) => { d.classes[0].effects[1].timing!.cite = []; }],
  ['EFFECT-CITE', 'effect with neither timing nor any citation', (d) => { d.classes[0].effects[0] = { tox: 'fx-tox-b' }; }],
  ['CITE-KEY', 'effect whose only cite key is unknown', (d) => { d.classes[0].effects[0] = { tox: 'fx-tox-b', cite: ['nope'] }; }],
  ['REGIMEN', 'regimen component id typo (not in the uncarded list)', (d) => { d.regimens[0].drugs = ['testdrugumabb']; }],
  ['REGIMEN', 'uncarded entry for a drug that now has a card', (d) => { d.regimens[1].uncarded!.push({ id: 'testdrugumab', name: 'x' }); }],
  ['MG-KG', 'mcg/kg in a boxed item', (d) => { d.drugs[0].boxedWarning = [{ v: 'Fixture 5 mcg/kg', cite: ['fx-pi'] }]; }],
  ['PHARMACY', 'pharmacy id that does not exist', (d) => { d.drugs[0].pharmacyDrugId = 'no-such-drug'; }],
  ['MG-KG', 'mg/kg in card data', (d) => { d.drugs[0].boxedWarning = { v: 'Fixture 5 mg/kg', cite: ['fx-pi'] }; }],
  ['VID', 'duplicate virtual id', (d) => { d.cancers.push({ ...d.cancers[0] }); }],
];
for (const [code, what, mutate] of breaks) {
  test(`fixture broken (${what}) goes red with ${code}`, async () => {
    const d = clone(FIXTURE);
    mutate(d);
    const errs = await checkFx(d, env);
    assert.ok(errs.some((x) => x.startsWith(code)), `expected ${code}; got ${JSON.stringify(errs)}`);
  });
}

test('fixture: a pin:true drug colliding with a pharmacy drug name goes red, a pin:false one passes', async () => {
  const pharmacyName = [...env.drugNames].find((n) => n.length >= 4 && !env.consultNames.has(n) && !env.calcTitles.has(n));
  assert.ok(pharmacyName, 'no pharmacy name available for the collision case');
  const mk = (pin: boolean): OncData => { const d = clone(FIXTURE); d.drugs[0].brands = [pharmacyName!]; d.drugs[0].pin = pin; return d; };
  const red = await checkFx(mk(true), env);
  assert.ok(red.some((x) => x.startsWith('PIN-COLLIDE') && x.includes('pharmacy drug')), `pin:true collision must be red; got ${JSON.stringify(red)}`);
  const ok = await checkFx(mk(false), env);
  assert.deepEqual(ok.filter((x) => x.startsWith('PIN-')), [], 'pin:false name is not pinned, so it is exempt');
});

test('fixture broken (virtual id equals a real node id in some tree) goes red with VID', async () => {
  const e2 = { ...env, realNodeIds: new Set([...env.realNodeIds, 'odse-drug-testdrugumab']) };
  const errs = await checkFx(clone(FIXTURE), e2);
  assert.ok(errs.some((x) => x.startsWith('VID') && x.includes('real node')), JSON.stringify(errs));
});

// ---------------------------------------------------------------- parallel group files, badges, boxed items, scale

test('merge: a duplicate drug, class, regimen or source key across two files fails naming both files', () => {
  const shared = { sources: {}, cancers: [], classes: [], regimens: [] };
  const d1 = clone(FIXTURE).drugs[0];
  const g = (over: object) => ({ DRUGS: [d1], ...over });
  const r1 = od.mergeOncData(shared, { 'a.ts': g({}), 'b.ts': g({}) });
  assert.ok(r1.errors.some((x: string) => x.startsWith('DUPLICATE-DRUG') && x.includes('drugs/a.ts') && x.includes('drugs/b.ts')), JSON.stringify(r1.errors));
  const cls = clone(FIXTURE).classes[0];
  const r2 = od.mergeOncData(shared, { 'a.ts': { CLASSES: [cls] }, 'b.ts': { CLASSES: [cls] } });
  assert.ok(r2.errors.some((x: string) => x.startsWith('DUPLICATE-CLASS') && x.includes('a.ts') && x.includes('b.ts')));
  const reg = clone(FIXTURE).regimens[0];
  const r3 = od.mergeOncData(shared, { 'a.ts': { REGIMENS: [reg] }, 'b.ts': { REGIMENS: [reg] } });
  assert.ok(r3.errors.some((x: string) => x.startsWith('DUPLICATE-REGIMEN')));
  const src = clone(FIXTURE).sources;
  const r4 = od.mergeOncData(shared, { 'a.ts': { SOURCES: src }, 'b.ts': { SOURCES: { 'fx-pi': src['fx-pi'] } } });
  assert.ok(r4.errors.some((x: string) => x.startsWith('DUPLICATE-SOURCE') && x.includes('"fx-pi"') && x.includes('a.ts') && x.includes('b.ts')));
  const r5 = od.mergeOncData({ ...shared, sources: src }, { 'a.ts': { SOURCES: { 'fx-gl': src['fx-gl'] } } });
  assert.ok(r5.errors.some((x: string) => x.includes('sources.ts') && x.includes('a.ts')), 'a group clashing with a shared file names the shared file');
});

test('merge: an identical cancer id + name in two files merges silently; the same id with another name fails', () => {
  const shared = { sources: {}, cancers: [], classes: [], regimens: [] };
  const same = od.mergeOncData(shared, { 'a.ts': { CANCERS: [{ id: 'x', name: 'Xoma' }] }, 'b.ts': { CANCERS: [{ id: 'x', name: 'Xoma' }] } });
  assert.deepEqual(same.errors, []);
  assert.equal(same.merged.cancers.length, 1);
  const diff = od.mergeOncData(shared, { 'a.ts': { CANCERS: [{ id: 'x', name: 'Xoma' }] }, 'b.ts': { CANCERS: [{ id: 'x', name: 'Other' }] } });
  assert.ok(diff.errors.some((x: string) => x.startsWith('DUPLICATE-CANCER') && x.includes('a.ts') && x.includes('b.ts')));
});

test('shipped: no id or source key is declared twice across the group files', () => {
  assert.deepEqual(od.ONC_MERGE_ERRORS, []);
  for (const f of Object.keys(od.ONC_GROUPS)) assert.ok(fs.existsSync(path.join(ROOT, 'src', 'data', 'onc-drugs', 'drugs', f)), `${f} is registered but missing`);
});

test('shortTiming: dose-relative strings give sensible badges, numbers and ranges are never cut', () => {
  const st = od.shortTiming as (v: string) => string;
  assert.equal(st('Nadir day 10-14 (range 7-21), recovery by day 28'), 'Nadir day 10-14 (range 7-21)');
  assert.equal(st('Within 24 hours of infusion'), 'Within 24 hours of infusion');
  assert.equal(st('Cumulative dose above 550 mg/m2 (anthracycline), cardiomyopathy'), 'Cumulative dose above 550 mg/m2 (anthracycline)');
  assert.equal(st('Cumulative dose above 1,000 mg/m2, usually late'), 'Cumulative dose above 1,000 mg/m2', 'a thousands comma is not a separator');
  assert.equal(st('Median 40 days for hemolytic anemia and immune thrombocytopenia (pharmacovigilance data cited by ASCO); no range given').slice(0, 10), 'Median 40 ');
  assert.equal(st('Occurs with prolonged exposure, in some patients'), 'Occurs with prolonged exposure, in some patients', 'no digit in the head: whole string');
  assert.equal(st('A long descriptive head with 3 words that runs well past forty-eight characters, then more'), 'A long descriptive head with 3 words that runs well past forty-eight characters, then more');
  assert.equal(st('Nadir (day 10, range 7-21) then recovery'), 'Nadir (day 10, range 7-21) then recovery', 'a comma inside parentheses is not a separator');
});

test('fixture: boxed items are a list, per-m2 thresholds pass, per-kg dosing does not', async () => {
  assert.equal(od.boxedItems(FIXTURE.drugs[0]).length, 4);
  assert.equal(od.boxedItems({ boxedWarning: { v: 'one', cite: [] } }).length, 1);
  assert.equal(od.boxedItems({}).length, 0);
  assert.deepEqual(await checkFx(FIXTURE, env), [], 'the fixture carries mg/m2 and 1,000 mg/m2 text and is clean');
});

test('fixture: an effect with no timing resolves without one, and keeps its cite', () => {
  const eff = od.resolveEffects(FIXTURE.drugs[0], FIXTURE).find((x: { tox: { id: string } }) => x.tox.id === 'fx-tox-b');
  assert.equal(eff.timing, undefined);
  assert.deepEqual(eff.cite, ['fx-pi']);
});

test('fixture: a regimen may carry an uncarded component, and search text names it', () => {
  const { nodes } = od.oncSearchDocs(FIXTURE);
  assert.ok(nodes.find((n: { id: string }) => n.id === 'odse-reg-fxreg').body.includes('Fixtureuncardedumab'));
});

test('fixture: pin:false keeps the card findable by prefix, exact name is not pinned', () => {
  const { onc } = od.oncSearchDocs(FIXTURE);
  pinMod.setOncEntries(onc);
  assert.equal(pinMod.oncPin('Acetaminophen'), null);
  assert.equal(pinMod.oncPrefix('acetamin').length, 1);
  assert.equal(pinMod.oncPrefix('acetaminophen')[0].route, '/tree/onc-drug-side-effects/node/odse-drug-fx-pharma');
  pinMod.setOncEntries([]);
});

test('fixture: scaled data (about 85 drugs, 20 classes, 20 regimens in 4 group files) merges and passes every gate', async () => {
  const groups = scaledGroups();
  const { merged, errors } = od.mergeOncData({ sources: FIXTURE.sources, cancers: FIXTURE.cancers, classes: FIXTURE.classes, regimens: FIXTURE.regimens }, groups);
  assert.deepEqual(errors, []);
  const data: OncData = { ...FIXTURE, ...merged, drugs: [...FIXTURE.drugs, ...merged.drugs] };
  assert.ok(data.drugs.length >= 80 && data.classes.length >= 20 && data.regimens.length >= 20, `${data.drugs.length}/${data.classes.length}/${data.regimens.length}`);
  assert.deepEqual(await checkFx(data, env), []);
  const t0 = performance.now();
  const { onc, nodes } = od.oncSearchDocs(data);
  pinMod.setOncEntries(onc);
  for (let i = 0; i < 1000; i++) pinMod.oncPin('scalebrandaa');
  const ms = performance.now() - t0;
  assert.ok(ms < 200, `index build + 1000 pin lookups took ${ms} ms`);
  assert.ok(JSON.stringify({ nodes, onc }).length < 120_000, 'search documents stay small');
  pinMod.setOncEntries([]);
  // a clash introduced across two scale files is caught and names both
  const clash = scaledGroups(); clash['scale-1.ts'].DRUGS!.push({ ...clash['scale-0.ts'].DRUGS![0] });
  assert.ok(od.mergeOncData({ sources: {}, cancers: [], classes: [], regimens: [] }, clash).errors.some((x: string) => x.includes('scale-0.ts') && x.includes('scale-1.ts')));
});

test('shipped tree: a management page no toxicity points at goes ORPHAN-NODE (the check bites on real data)', async () => {
  const d = clone(od.ONC_DATA) as OncData;
  const victim = d.toxicities.find((t) => t.page.tree === 'onc-drug-side-effects')!;
  const victimNode = victim.page.node;
  for (const t of d.toxicities.filter((x) => x.page.node === victimNode)) t.page.node = 'odse-start';
  const errs = await checkOnc(d, env, od);
  assert.ok(errs.some((x) => x.startsWith('ORPHAN-NODE') && x.includes(victimNode)), JSON.stringify(errs.slice(0, 3)));
});

test('cancer types: ids are unique, a valid type passes, entries without a type are allowed', async () => {
  const ids = od.ONC_CANCER_TYPES.map((t: { id: string }) => t.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.ok(ids.length >= 35 && ids.length <= 55, `${ids.length} types`);
  const d = clone(FIXTURE); d.cancers[0].type = ids[0];
  assert.deepEqual((await checkFx(d)).filter((x) => x.startsWith('CANCER-TYPE')), []);
  delete d.cancers[0].type;
  assert.deepEqual((await checkFx(d)).filter((x) => x.startsWith('CANCER-TYPE')), []);
  const r = od.mergeOncData({ sources: {}, cancers: [], classes: [], regimens: [] }, { 'a.ts': { CANCERS: [{ id: 'x', name: 'Xoma', type: 'breast' }] }, 'b.ts': { CANCERS: [{ id: 'x', name: 'Xoma', type: 'melanoma' }] } });
  assert.ok(r.errors.some((x: string) => x.startsWith('DUPLICATE-CANCER') && x.includes('type')));
});

test('basis: postmarketing is accepted and carried through resolveEffects', async () => {
  const d = clone(FIXTURE); d.drugs[0].effects = [{ tox: 'fx-tox-a', basis: 'postmarketing', quirk: { v: 'Postmarketing: fixture.', cite: ['fx-pi'] } }];
  assert.deepEqual((await checkFx(d)).filter((x) => x.startsWith('BASIS')), []);
  assert.equal(od.resolveEffects(d.drugs[0], d).find((x: { tox: { id: string } }) => x.tox.id === 'fx-tox-a').basis, 'postmarketing');
});

test('card with nothing to show: an empty card goes red, an alsoOnLabel-only card and a boxed-only card pass, labelAge is strict', async () => {
  const bare = (): OncData => { const d = clone(FIXTURE); d.classes[0].effects = []; d.drugs = [d.drugs[0]]; d.drugs[0].effects = []; delete d.drugs[0].alsoOnLabel; delete d.drugs[0].boxedWarning; return d; };
  const empty = await checkFx(bare());
  assert.ok(empty.some((x) => x.startsWith('DRUG-EFFECT') && x.includes('no resolved effect')), JSON.stringify(empty));
  const line = bare(); line.drugs[0].alsoOnLabel = [{ v: 'Fixture head: only a label line.', cite: ['fx-pi'] }];
  assert.deepEqual((await checkFx(line)).filter((x) => x.startsWith('DRUG-EFFECT')), []);
  const box = bare(); box.drugs[0].boxedWarning = [{ v: 'Fixture head: boxed.', cite: ['fx-pi'] }];
  assert.deepEqual((await checkFx(box)).filter((x) => x.startsWith('DRUG-EFFECT')), []);
  const age = bare(); age.drugs[0].alsoOnLabel = line.drugs[0].alsoOnLabel; age.drugs[0].labelAge = 'Label last revised 2016; current availability not confirmed.';
  assert.deepEqual((await checkFx(age)).filter((x) => x.startsWith('LABEL-AGE')), []);
  age.drugs[0].labelAge = 'Old label [1].';
  assert.ok((await checkFx(age)).some((x) => x.startsWith('LABEL-AGE')));
});

test('routing pages: every generated class list is current with the data (run scripts/build-onc-route-pages.mjs to refresh)', async () => {
  const rl = await imp('data/onc-drugs/route-lists.js');
  const tree = await imp('data/trees/onc-drug-side-effects.js');
  const nodes = tree.ONC_DRUG_SIDE_EFFECTS_NODES as { id: string; body: string }[];
  let checked = 0;
  for (const n of nodes) {
    if (!n.id.startsWith('odse-tox-route-')) continue;
    const reg = rl.ROUTE_REGIONS[n.id] ?? { before: rl.ROUTE_LIST_BEFORE, after: rl.ROUTE_LIST_AFTER };
    const a = n.body.indexOf(reg.before); const b = n.body.indexOf(reg.after, a + 1);
    assert.ok(a >= 0 && b > a, `${n.id}: generated-list region not found`);
    const tox = od.ONC_DATA.toxicities.filter((t: { page: { node: string } }) => t.page.node === n.id).map((t: { id: string }) => t.id);
    assert.equal(n.body.slice(a + reg.before.length, b), rl.routeClassList(tox, od.ONC_DATA), `${n.id}: class list is out of date`);
    checked++;
  }
  assert.ok(checked >= 15, `only ${checked} routing pages checked`);
});

test('routing pages: the list generator groups by class, counts above five, and a stale list is detected', async () => {
  const rl = await imp('data/onc-drugs/route-lists.js');
  const d = clone(FIXTURE);
  const list = rl.routeClassList(['fx-tox-a'], d);
  assert.ok(list.startsWith('Fixture class ('), list);
  assert.ok(list.includes('testdrugumab'), 'five or fewer members are named');
  const many = clone(FIXTURE); for (let i = 0; i < 4; i++) many.drugs.push({ ...clone(FIXTURE).drugs[0], id: `m${i}`, generic: `many${i}` });
  assert.ok(rl.routeClassList(['fx-tox-a'], many).includes('(6 drugs)'), 'more than five members are counted');
  assert.notEqual(rl.routeClassList(['fx-tox-a'], many), list, 'a changed dataset changes the list, so a stale page is detected');
});

test('editor aliases pin, are searchable, and short ones are never pinned', () => {
  const d = clone(FIXTURE); d.drugs[0].editorAliases = ['FXAB', 'FXA', 'FX1'];
  const { onc } = od.oncSearchDocs(d);
  pinMod.setOncEntries(onc);
  assert.equal(pinMod.oncPin('fx-ab')?.route, '/tree/onc-drug-side-effects/node/odse-drug-testdrugumab');
  assert.equal(pinMod.oncPin('FXA'), null, '3-character alias without a digit is not pinned');
  assert.ok(pinMod.oncPin('FX1'), '3-character alias with a digit is pinned');
  assert.ok(onc[0].all.includes('FXA'), 'but it is a searchable name');
  pinMod.setOncEntries([]);
});
