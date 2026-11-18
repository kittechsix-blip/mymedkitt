import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { ROOT, makeCtx } from './lib/rapid-load.ts'; // registers the .js -> .ts resolve hook
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import type { RapidStrip } from '../src/data/rapid/types.ts';

// Dynamic import: the hook must be live before src/ (which uses .js specifiers) is linked.
const {
  tokenize, tokenFound, sha256Hex, canonicalJson, stripHash, isLocalHost, isPreviewContext, verifyStrip, verifyStripSafe, flagIds, ackDiff, approvalHolds,
  approvalStatus, approvalBinding, regimenPins, excerptContext, makeCanary, makeExcerptCanary, normalizeExcerpt, checkExcerpt, nodeLines,
} = await import(pathToFileURL(`${ROOT}/src/services/rapid-verify.ts`).href);

const found = (tile: string, src: string): boolean => {
  const ts = tokenize(tile);
  assert.ok(ts.length > 0, `tile "${tile}" produced no token`);
  const ss = tokenize(src);
  return ts.every((t) => tokenFound(t, ss));
};

test('matcher: found cases (blueprint section 9)', () => {
  const cases: [string, string][] = [
    ['200 J', '200J biphasic'],
    ['1-1.5 mg/kg', '1–1.5 mg/kg'],
    ['1-1.5 mg/kg', '1 to 1.5 mg/kg'],
    ['0.5 mg', '.5 mg'],
    ['1000', '1,000'],
    ['1:1000', '1:1,000'],
    ['10 mcg/min', '10 μg/min'],
    ['5 min', 'q5min'],
    ['3 h', '3 hours'],
    ['x3', '×3'],
    ['<48 h', '<48h'],
    ['3 doses', '3 IM doses'],
    ['3 IM doses', '3 doses'],
    ['2 liters', '2 L'],
  ];
  for (const [t, s] of cases) assert.ok(found(t, s), `"${t}" should be found in "${s}"`);
});

test('matcher: not-found cases (blueprint section 9)', () => {
  const cases: [string, string][] = [
    ['1.5 mg/kg', '1-1.5 mg/kg'],
    ['>48 h', '<48h'],
    ['300 mcg', '300 mg'],
    ['2 mg/kg', '2 mg'],
    ['2', 'SpO2'],
    ['3', '[3]'],
    ['20 mL/kg', '20-30 mL/kg'],
    ['48 h', '>48h'],
    ['>40%', '\u226440%'],
    ['>48 h', '<48h'],
    ['3 mg', '3 tablets'],
  ];
  for (const [t, s] of cases) assert.ok(!found(t, s), `"${t}" should NOT be found in "${s}"`);
});

test('tokenizer: SpO2 / CHA2DS2 produce no quantity; citation refs dropped', () => {
  assert.equal(tokenize('SpO2 and CHA2DS2-VASc').length, 0);
  assert.equal(tokenize('give it [3] now [1,2]').length, 0);
  assert.equal(tokenize('SpO2 90-94%').length, 1);
});

test('tokenizer: original spans map back through normalisation', () => {
  const s = 'Give 1–1.5 mg/kg now';
  const [t] = tokenize(s);
  assert.equal(s.slice(t.os, t.oe), '1–1.5 mg/kg');
});

test('sha256 equals node:crypto on 4 vectors', () => {
  const vecs = ['', 'abc', 'héllo 世界 😀', 'x'.repeat(1000)];
  for (const v of vecs) assert.equal(sha256Hex(v), createHash('sha256').update(v, 'utf8').digest('hex'));
});

test('canonicalJson: key order irrelevant, undefined dropped, edit-sensitive', () => {
  assert.equal(canonicalJson({ b: 1, a: [2, { d: 1, c: undefined }] }), canonicalJson({ a: [2, { c: undefined, d: 1 }], b: 1 }));
  const s1: RapidStrip = { treeId: 'x', variants: [{ id: 'v', label: 'L', tiles: [{ id: 't', layout: 'steps', action: 'A', figure: '1 J', nodeIds: ['n'], lines: [{ nodeId: 'n', text: 'Give 1 J' }] }] }] };
  const s2 = JSON.parse(JSON.stringify(s1));
  const reordered = { variants: s2.variants, treeId: s2.treeId } as RapidStrip;
  assert.equal(stripHash(s1), stripHash(reordered));
  s2.variants[0].tiles[0].lines[0].text = 'Give 2 J';
  assert.notEqual(stripHash(s1), stripHash(s2));
  assert.match(stripHash(s1), /^[0-9a-f]{64}$/);
});

test('isLocalHost / preview context', () => {
  for (const h of ['localhost', '127.0.0.1', '[::1]', 'andy-mac.local', '10.0.0.5', '192.168.1.20', '172.16.0.1', '172.31.255.1', '100.64.0.1', '100.127.255.254']) assert.ok(isLocalHost(h), h);
  for (const h of ['kittechsix-blip.github.io', 'example.com', '172.32.0.1', '172.15.0.1', '100.128.0.1', '100.63.0.1', '11.0.0.1', '192.169.0.1', 'local', '8.8.8.8']) assert.ok(!isLocalHost(h), h);
  assert.equal(isPreviewContext('https:', 'kittechsix-blip.github.io', '1'), false);
  assert.equal(isPreviewContext('https:', 'localhost', '1'), false);
  assert.equal(isPreviewContext('http:', 'example.com', '1'), false);
  assert.equal(isPreviewContext('http:', '192.168.1.5', null), false);
  assert.equal(isPreviewContext('http:', '192.168.1.5', '1'), true);
});

// ---------------------------------------------------------------------------
// Synthetic consult + drug store. HARD checks block the build; FLAGS are acknowledged by id before approval.
// ---------------------------------------------------------------------------
const wcA = { dosePerKg: 0.01, unit: 'mg', maxDose: 0.5 };
const drugX = {
  id: 'drug-x', name: 'Drugexa', genericName: 'drugexamine',
  dosing: [{ indication: 'Ind', regimen: '0.5 mg IM into the thigh. Repeat every 5 min.\n\nPediatric: 0.01 mg/kg IM (max 0.5 mg). NO absolute contraindications.', weightCalc: wcA }],
};
const wcB1 = { dosePerKg: 0.25, unit: 'mg', label: 'Initial bolus' };
const wcB2 = { dosePerKg: 0.35, unit: 'mg', label: 'Second bolus' };
const drugY = { id: 'drug-y', name: 'Yeltiazem', genericName: 'yeltiazem', dosing: [{ indication: 'Rate', regimen: 'Initial bolus: 0.25 mg/kg IV over 2 min. Second bolus: 0.35 mg/kg IV.', weightCalc: [wcB1, wcB2] }] };
const drugZ = { id: 'drug-z', name: 'Zeroxa', genericName: 'zeroxamide', dosing: [{ indication: 'Z', regimen: '5 mg IV once.' }] };
const stores: Record<string, unknown> = { 'drug-x': drugX, 'drug-y': drugY, 'drug-z': drugZ };
const synth = {
  nodes: [
    { id: 'fork', title: 'Fork', body: 'Stability?', options: [{ label: 'Unstable', next: 'a1' }, { label: 'Stable', next: 'b1' }] },
    { id: 'a1', title: 'A', body: 'Cardiovert at 200 J. Then 300 J.\n• Sedate first\n• Do NOT delay cardioversion for NPO status\nUse [midazolam](#/drug/midazolam) 3-5 mg IV [2]\n**Bold line:** keep **this** [3] text', next: 'shared' },
    { id: 'b1', title: 'B', body: '**Drugexa:**\n• 0.5 mg IM into the thigh\n• Repeat every 5 min up to 3 IM doses\n• Max 1 mg', next: 'shared' },
    { id: 'shared', title: 'S', body: 'Two operators needed.\nEF ≤40%: CCBs contraindicated.\nNew AFib <48 hours: may cardiovert.\nDo NOT delay intubation if the patient is deteriorating.\nDo NOT cardiovert if AF >48 hours without anticoagulation.\nHyperdynamic IVC: more fluid.\nThree attempts maximum.\nUnsuitable as sole agent.\nAtrial rate is irregular.\nWe get all the numbers.\nSmith et al showed 99 mg was safe.\nSeveral trials report 98 mg.', evidence: 'A trial gave 0.3 mg IM in 12 patients.', next: 'crit' },
    { id: 'crit', title: 'Crit', body: 'Give 5 mg now.', safetyLevel: 'critical', next: 'neg2' },
    { id: 'neg2', title: 'Neg', body: 'Do NOT give Drugexa with alcohol.\nOK to give 0.5 mg.', next: 'lnk' },
    { id: 'lnk', title: 'Lnk', body: 'Give [it](#/drug/drug-x/ind) 5 mg IM now', next: 'hdr' },
    { id: 'hdr', title: 'Hdr', body: 'Equipment:\nVideo laryngoscopy first\nSmaller ETT\nNebulized epinephrine: use it.', route: 'Nebulized', dose: '0.5 mL of 2.25% in 4.5 mL NS PRN' },
    { id: 'iv', title: 'IV', body: 'IV access first.' },
  ],
  criticalActions: [{ text: 'Giving 9 mg is critical', nodeId: 'shared' }],
  entryNodeId: 'fork',
  getDrug: (id: string) => stores[id] as never,
};
const ex = (nodeId: string, text: string) => ({ nodeId, text });
const wrap = (tiles: unknown[], extra: Record<string, unknown> = {}): RapidStrip =>
  ({ treeId: 'synth', variants: [{ id: 'v', label: 'Only', tiles }], ...extra }) as unknown as RapidStrip;
const stepTile = (over: Record<string, unknown> = {}) => ({ id: 't', layout: 'steps', action: 'Cardiovert', figure: '200 J', nodeIds: ['a1'], lines: [ex('a1', 'Cardiovert at 200 J. Then 300 J.')], ...over });
const V_excerptContext = (e: { nodeId: string; text: string }) => excerptContext(e, new Map(synth.nodes.map((n) => [n.id, n])) as never, [e]);
const has = (strip: RapidStrip, id: string, ctx: unknown = synth) => flags(strip, ctx).includes(id);
const ofKind = (strip: RapidStrip, kind: string, ctx: unknown = synth) => flags(strip, ctx).filter((x: string) => x.split('/')[3] === kind);
const drugTile = (over: Record<string, unknown> = {}) => ({
  id: 'd', layout: 'drug', action: 'Drugexa IM', figure: '0.5 mg', nodeIds: ['b1'],
  drug: { id: 'drug-x', indication: 'Ind', weightCalcs: [wcA] }, ...over,
});
const hard = (strip: RapidStrip, ctx: unknown = synth) => verifyStrip(strip, ctx as never).failures.map((f: { message: string }) => f.message);
const flags = (strip: RapidStrip, ctx: unknown = synth) => flagIds(verifyStrip(strip, ctx as never));
const pins = (strip: RapidStrip, ctx: any = synth) => regimenPins(strip, ctx.getDrug);

/** A flag: (a) it is flagged with this id and nothing hard fails, (b) approval without it is refused,
 *  (c) an approval lacking it is not live; with it, live. */
function expectFlag(strip: RapidStrip, id: string, ctx: any = synth): void {
  const r = verifyStrip(strip, ctx as never);
  assert.deepEqual(r.failures.map((f: { message: string }) => f.message), [], 'no hard failure');
  assert.ok(flagIds(r).includes(id), `flag ${id} expected, got ${JSON.stringify(flagIds(r))}`);
  assert.ok(ackDiff(r, []).missing.includes(id), '(b) approval without --ack is refused');
  const h = stripHash(strip);
  const others = flagIds(r).filter((x: string) => x !== id);
  assert.equal(approvalHolds(strip, r, { stripHash: h, ackedFlags: others, regimenPins: pins(strip, ctx) }, pins(strip, ctx)), false, '(c) a strip lacking this ack is not live');
  assert.equal(approvalHolds(strip, r, { stripHash: h, ackedFlags: flagIds(r), regimenPins: pins(strip, ctx) }, pins(strip, ctx)), true, 'fully acknowledged is live');
}
const noFlag = (strip: RapidStrip, id: string, ctx: unknown = synth) => assert.ok(!flags(strip, ctx).includes(id), `flag ${id} should not be raised`);

test('baseline tiles: no hard failure and no flag', () => {
  assert.deepEqual(hard(wrap([stepTile()])), []);
  assert.deepEqual(flags(wrap([stepTile()])), []);
  assert.deepEqual(hard(wrap([drugTile()])), []);
  assert.deepEqual(flags(wrap([drugTile()])), ['v/d/action/phrase/drugexa-im', 'v/d/figure/multi-dose/0.5-mg'], 'the drug action is authored (phrase); the regimen holds several dose tokens');
  assert.deepEqual(hard(wrap([drugTile({ lines: [ex('b1', 'Max 1 mg')] })])), []);
});

// ---- Section 2: excerpts ----------------------------------------------------
test('excerpts: normalisation strips **, link labels, [N] refs, bullets, whitespace', () => {
  assert.equal(normalizeExcerpt('  • **Bold** [x](#/y) text [3].  '), 'Bold x text.');
  assert.equal(normalizeExcerpt('1. Give it'), 'Give it');
});

test('excerpts PASS: whole line, clause after ". ", before ". ", bullets, bold, link, citation ref', () => {
  const ok = (nodeId: string, text: string) => assert.deepEqual(hard(wrap([stepTile({ nodeIds: [nodeId], lines: [ex(nodeId, text)] })])).filter((m) => /excerpt|lines/.test(m)), [], text);
  ok('a1', 'Cardiovert at 200 J. Then 300 J.');
  ok('a1', 'Cardiovert at 200 J');
  ok('a1', 'Then 300 J.');
  ok('a1', 'Sedate first');
  ok('a1', 'Use midazolam 3-5 mg IV');
  ok('a1', 'Bold line: keep this text');
  ok('b1', 'Drugexa:');
  ok('b1', 'Repeat every 5 min up to 3 IM doses');
  ok('shared', 'Do NOT delay intubation if the patient is deteriorating');
});

test('excerpt HARD: drops a negation ("delay intubation" out of "do NOT delay intubation")', () => {
  const t = (text: string) => wrap([stepTile({ id: 'n', action: 'Intubate', figure: 'Two operators', nodeIds: ['shared'], lines: [ex('shared', text)] })]);
  assert.ok(hard(t('delay intubation if the patient is deteriorating')).some((m) => /not clause-complete|drops the negation/.test(m)));
  // starting exactly at a clause start but ending before the negation of a later clause
  const r = checkExcerpt(ex('shared', 'Do NOT delay intubation'), ['shared'], new Map(synth.nodes.map((n) => [n.id, n])));
  assert.equal(r.ok, false, 'ends mid-clause');
  // a negation word elsewhere in the same line must also be inside the excerpt
  const nodes = new Map([['q', { id: 'q', title: 't', body: 'No pulse: start CPR. Never delay shocks.' }]]);
  assert.equal(checkExcerpt(ex('q', 'start CPR'), ['q'], nodes as never).ok, false, '"No" in the same line is outside the excerpt');
  assert.equal(checkExcerpt(ex('q', 'No pulse: start CPR. Never delay shocks.'), ['q'], nodes as never).ok, true);
});

test('excerpt HARD: node not in the tile nodeIds; unknown node', () => {
  assert.ok(hard(wrap([stepTile({ lines: [ex('shared', 'Two operators needed')] })])).some((m) => /not in the tile's nodeIds/.test(m)));
  assert.ok(hard(wrap([stepTile({ nodeIds: ['a1', 'ghost'], lines: [ex('ghost', 'Two operators needed')] })])).some((m) => /does not exist/.test(m)));
});

test('excerpt HARD: spanning two lines, mid-clause, one changed character, evidence line, length', () => {
  const t = (text: string, nodeId = 'a1') => wrap([stepTile({ nodeIds: [nodeId], lines: [ex(nodeId, text)] })]);
  const bad = (strip: RapidStrip, re: RegExp) => assert.ok(hard(strip).some((m) => re.test(m)), `${re} expected in ${JSON.stringify(hard(strip))}`);
  bad(t('Sedate first Do NOT delay cardioversion for NPO status'), /word-for-word inside ONE line/);
  bad(t('Sedate first\nDo NOT delay cardioversion for NPO status'), /word-for-word inside ONE line/);
  bad(t('at 200 J'), /not clause-complete/);
  bad(t('Cardiovert at 200'), /not clause-complete/);
  bad(t('Cardiovert at 200 K'), /word-for-word/);
  bad(t('cardiovert at 200 J'), /word-for-word/);
  bad(t('Smith et al showed 99 mg was safe', 'shared'), /word-for-word/);
  bad(t('A trial gave 0.3 mg IM in 12 patients', 'shared'), /word-for-word/);
  bad(t('ab'), /characters/);
  bad(t('x'.repeat(161)), /characters/);
  bad(t('Hyperdynamic', 'shared'), /not clause-complete/);
  assert.deepEqual(hard(t('Hyperdynamic IVC', 'shared')).filter((m) => /excerpt/.test(m)), [], 'ends right before ": " (a terminator)');
  bad(wrap([stepTile({ lines: [] })]), /needs 1-8 lines/);
});

test('excerpt HARD on real data: anaphylaxis airway negation, afib cardioversion line', async () => {
  const { ctx } = await makeCtx('anaphylaxis');
  const t = (text: string) => wrap([{ id: 'x', layout: 'steps', action: 'Secure airway', figure: 'Video laryngoscopy', nodeIds: ['anaph-airway-critical'], lines: [ex('anaph-airway-critical', text)] }]);
  const excerptMsgs = (strip: RapidStrip, c: unknown) => verifyStrip(strip, c as never).failures.filter((f: { kind: string }) => f.kind === 'excerpt').map((f: { message: string }) => f.message);
  assert.deepEqual(excerptMsgs(t('Do NOT delay intubation if patient is deteriorating'), ctx), []);
  assert.deepEqual(excerptMsgs(t('Prepare for difficult airway — call anesthesia/ENT early'), ctx), []);
  assert.ok(excerptMsgs(t('delay intubation if patient is deteriorating'), ctx).length > 0);
  assert.ok(excerptMsgs(t('Do NOT delay intubation if patient is deteriorating — airway edema worsens rapidly. Post-intubation'), ctx).length > 0, 'spans two sentences of different lines');
  const { ctx: afib } = await makeCtx('afib-rvr');
  const a = wrap([{ id: 'c', layout: 'steps', action: 'Cardiovert', figure: '200 J', nodeIds: ['afib-cardioversion-protocol'], lines: [ex('afib-cardioversion-protocol', 'Start at 200J biphasic (use maximal energy available)')] }]);
  assert.deepEqual(excerptMsgs(a, afib), []);
});

// ---- Section 3: drug tiles --------------------------------------------------
test('HARD drug tile: identity, indication, name word, figure from the drug entry', () => {
  assert.ok(hard(wrap([drugTile({ drug: { id: 'nope', indication: 'Ind' } })])).some((m) => /does not exist/.test(m)));
  assert.ok(hard(wrap([drugTile({ drug: { id: 'drug-x', indication: 'ind', weightCalcs: [wcA] } })])).some((m) => /exact indication/.test(m)));
  assert.ok(hard(wrap([drugTile({ action: 'IV metoprolol' })])).some((m) => /name/.test(m)));
  assert.deepEqual(hard(wrap([drugTile({ action: 'Drugexamine' })])), []);
  assert.ok(hard(wrap([drugTile({ figure: '0.7 mg' })])).some((m) => /0\.7 mg/.test(m)), 'figure not in the regimen');
  assert.ok(hard(wrap([drugTile({ figure: '1 mg' })])).some((m) => /not found in the drug entry/.test(m)), 'figure from the node text only is refused');
  assert.deepEqual(hard(wrap([drugTile({ figure: '0.01 mg/kg' })])), [], 'weightCalc / regimen token');
  assert.deepEqual(hard(wrap([drugTile({ condition: 'up to 3 IM doses' })])), [], 'condition may use the node text');
});

test('HARD drug tile: weightCalcs deep-equal the FULL live list, in order; absent iff none', () => {
  const y = (wcs?: unknown[]) => wrap([drugTile({ action: 'Yeltiazem', figure: '0.25 mg/kg', nodeIds: ['b1'], drug: { id: 'drug-y', indication: 'Rate', ...(wcs ? { weightCalcs: wcs } : {}) } })]);
  assert.deepEqual(hard(y([wcB1, wcB2])), []);
  assert.ok(hard(y([wcB1])).some((m) => /deep-equal/.test(m)), 'only one of two');
  assert.ok(hard(y([wcB2, wcB1])).some((m) => /deep-equal/.test(m)), 'order');
  assert.ok(hard(y([wcB1, { ...wcB2, maxDose: 99 }])).some((m) => /deep-equal/.test(m)), 'changed cap');
  assert.ok(hard(y()).some((m) => /must snapshot all/.test(m)), 'omitted although the dose has some');
  const z = (wcs?: unknown[]) => wrap([drugTile({ action: 'Zeroxa', figure: '5 mg', drug: { id: 'drug-z', indication: 'Z', ...(wcs ? { weightCalcs: wcs } : {}) } })]);
  assert.deepEqual(hard(z()), []);
  assert.ok(hard(z([wcA])).some((m) => /no weightCalc/.test(m)), 'snapshot set although the dose has none');
  assert.ok(hard(z([])).some((m) => /empty/.test(m)));
});

// ---- Section 4: face checks -------------------------------------------------
test('HARD face: numbers, comparators, evidence and critical-action text are not sources', () => {
  assert.ok(hard(wrap([stepTile({ figure: '300 J', nodeIds: ['b1'], lines: [ex('b1', 'Max 1 mg')] })])).some((m) => /300 J/.test(m)), '300 J absent from b1');
  assert.deepEqual(hard(wrap([stepTile({ figure: '300 J' })])), []);
  const cc = (figure: string, cond?: string) => wrap([stepTile({ id: 'h', action: 'CCBs', figure, ...(cond ? { condition: cond } : {}), nodeIds: ['shared'], lines: [ex('shared', 'Two operators needed')] })]);
  assert.ok(hard(cc('EF >40%')).some((m) => /EF >40%|>40%/.test(m)), 'wrong comparator');
  assert.deepEqual(hard(cc('EF ≤40%')), []);
  assert.ok(hard(cc('<48 hours', 'EF >40%')).some((m) => /condition/.test(m)), 'condition numbers are verified too');
  assert.ok(hard(cc('>49 h')).some((m) => />49 h/.test(m)), 'no such number in the node');
  assert.ok(hard(cc('<49 hours')).some((m) => /<49 hours/.test(m)));
  assert.ok(hard(cc('0.3 mg')).some((m) => /0\.3 mg/.test(m)), 'evidence text is not a source');
  assert.ok(hard(cc('9 mg')).some((m) => /9 mg/.test(m)), 'critical-action text is not a source (gate and runtime agree)');
  assert.ok(hard(wrap([stepTile({ action: 'Give 77 mg' })])).some((m) => /77 mg/.test(m)), 'a number in the action must exist too');
});

test('HARD face: numberless figure words, limits, ids, tile count, fork rules', () => {
  const nl = (figure: string) => wrap([stepTile({ id: 'n', action: 'Intubate', figure, nodeIds: ['shared'], lines: [ex('shared', 'Hyperdynamic IVC: more fluid')] })]);
  assert.ok(hard(nl('Intubate sooner')).some((m) => /word "sooner"/.test(m)));
  assert.deepEqual(hard(nl('more fluid')), []);
  assert.ok(hard(wrap([stepTile({ action: 'Four words in action' })])).some((m) => /1-3 words/.test(m)));
  assert.ok(hard(wrap([stepTile({ action: 'x'.repeat(25) })])).some((m) => /action is 25/.test(m)));
  assert.ok(hard(wrap([stepTile({ figure: 'F'.repeat(29) })])).some((m) => /figure is 29/.test(m)));
  assert.ok(hard(wrap([stepTile({ condition: 'x'.repeat(41) })])).some((m) => /condition is 41/.test(m)));
  assert.ok(hard(wrap([stepTile(), stepTile()])).some((m) => /duplicate tile id/.test(m)));
  assert.ok(hard(wrap(Array.from({ length: 8 }, (_, i) => stepTile({ id: `t${i}` })))).some((m) => /1-7 tiles/.test(m)));
  assert.ok(hard(wrap([])).some((m) => /1-7 tiles/.test(m)));
  assert.ok(hard(wrap([stepTile({ nodeIds: ['ghost'], lines: [ex('ghost', 'Two operators needed')] })])).some((m) => /does not exist/.test(m)));
  assert.ok(hard(wrap([drugTile({ lines: Array.from({ length: 5 }, () => ex('b1', 'Max 1 mg')) })])).some((m) => /at most 4 lines/.test(m)));
  assert.ok(hard(wrap([stepTile({ lines: Array.from({ length: 9 }, () => ex('a1', 'Sedate first')) })])).some((m) => /1-8 lines/.test(m)));
  assert.ok(hard(wrap([stepTile({ image: { nodeId: 'a1', index: 0 } })])).some((m) => /no image/.test(m)));
  const two = (l1: string, l2: string, n1: string, n2: string): RapidStrip => ({
    treeId: 'synth', forkNodeId: 'fork',
    variants: [
      { id: 'u', label: l1, tiles: [stepTile({ id: 't1', nodeIds: [n1], lines: [ex(n1, n1 === 'a1' ? 'Sedate first' : 'Two operators needed')] })] },
      { id: 's', label: l2, tiles: [drugTile({ id: 't2', nodeIds: [n2] })] },
    ],
  } as unknown as RapidStrip);
  assert.deepEqual(hard(two('Unstable', 'Stable', 'a1', 'b1')), []);
  assert.ok(hard(two('Stable', 'Unstable', 'a1', 'b1')).some((m) => /reachable only through the fork option/.test(m)), 'swapped labels');
  assert.ok(hard(two('Unstable', 'Stable (rate control)', 'a1', 'b1')).some((m) => /does not equal any option label/.test(m)));
  assert.deepEqual(hard(two('Unstable', 'Stable', 'shared', 'b1')).filter((m) => /fork/.test(m)), []);
});

test('HARD drug-as-steps: a steps tile naming a drug with a dose needs a GAP finding with the detected drugId', () => {
  const tile = stepTile({ id: 't', action: 'Drugexa', figure: '0.5 mg', nodeIds: ['b1'], lines: [ex('b1', '0.5 mg IM into the thigh')] });
  const ctx = (findings: unknown[]) => ({ ...synth, criticalActions: [], allDrugs: [drugX, drugY], findings });
  assert.ok(hard(wrap([tile]), ctx([])).some((m) => /make it a drug tile/.test(m)));
  assert.deepEqual(hard(wrap([tile]), ctx([{ kind: 'gap', tileId: 't', drugId: 'drug-x', nodeIds: [], text: 'store has no entry for this use' }])).filter((m) => /drug tile/.test(m)), []);
  assert.ok(hard(wrap([tile]), ctx([{ kind: 'other', tileId: 't', drugId: 'drug-x', nodeIds: [], text: 'x' }])).some((m) => /drug tile/.test(m)), 'kind other no longer satisfies');
  assert.ok(hard(wrap([tile]), ctx([{ kind: 'conflict', tileId: 't', drugId: 'drug-x', nodeIds: [], text: 'x' }])).some((m) => /drug tile/.test(m)), 'wrong kind');
  assert.ok(hard(wrap([tile]), ctx([{ kind: 'gap', tileId: 't', nodeIds: [], text: 'x' }])).some((m) => /drug tile/.test(m)), 'no drugId');
  assert.ok(hard(wrap([tile]), ctx([{ kind: 'gap', tileId: 't', drugId: 'drug-y', nodeIds: [], text: 'x' }])).some((m) => /drug tile/.test(m)), 'drugId must equal the detected drug');
  assert.ok(hard(wrap([tile]), ctx([{ kind: 'gap', tileId: 'other', drugId: 'drug-x', nodeIds: [], text: 'x' }])).some((m) => /drug tile/.test(m)), 'other tile');
  // quoted lines are scanned too (the face names no drug), and so is a #/drug/<id> link on the quoted line's source
  const quoted = stepTile({ id: 't', action: 'Give', figure: 'Two operators', nodeIds: ['b1'], lines: [ex('b1', 'Repeat every 5 min up to 3 IM doses'), ex('b1', 'Max 1 mg')] });
  assert.deepEqual(hard(wrap([quoted]), ctx([])).filter((m) => /drug tile/.test(m)), [], 'no drug named on the same line as a dose');
  const named = stepTile({ id: 't', action: 'Give', figure: 'Two operators', nodeIds: ['b1'], lines: [ex('b1', 'Drugexa:'), ex('b1', '0.5 mg IM into the thigh')] });
  assert.deepEqual(hard(wrap([named]), ctx([])).filter((m) => /drug tile/.test(m)), [], 'name and dose on different lines');
  const linked = stepTile({ id: 't', action: 'Give', figure: 'Two operators', nodeIds: ['lnk'], lines: [ex('lnk', 'Give it 5 mg IM now')] });
  assert.ok(hard(wrap([linked]), ctx([])).some((m) => /drug-x/.test(m) && /drug tile/.test(m)), 'link on the quoted source line names drug-x');
  assert.deepEqual(hard(wrap([stepTile({ id: 't', action: 'Drugexa', figure: 'Two operators', nodeIds: ['shared'], lines: [ex('shared', 'Two operators needed.')] })]), ctx([])).filter((m) => /drug tile/.test(m)), [], 'no dose token: allowed');
  assert.deepEqual(hard(wrap([stepTile()]), ctx([])), [], 'no drug named');
});

// ---- Section 4: flags -------------------------------------------------------
test('FLAG phrase: action, figure and condition; word-for-word carries none; compression is flagged', () => {
  assert.ok(!has(wrap([stepTile()]), 'v/t/figure/phrase/200-j'));
  assert.ok(!has(wrap([stepTile()]), 'v/t/action/phrase/cardiovert'));
  expectFlag(wrap([stepTile({ figure: 'J 200' })]), 'v/t/figure/phrase/j-200');
  expectFlag(wrap([stepTile({ action: 'Defibrillate' })]), 'v/t/action/phrase/defibrillate');
  expectFlag(wrap([stepTile({ condition: 'Cardiovert 200 J now' })]), 'v/t/condition/phrase/cardiovert-200-j-now');
  const n = (figure: string) => wrap([stepTile({ id: 'n', action: 'Fluids', figure, nodeIds: ['shared'], lines: [ex('shared', 'Hyperdynamic IVC: more fluid.')] })]);
  assert.ok(!has(n('more fluid'), 'v/n/figure/phrase/more-fluid'));
  expectFlag(n('fluid more'), 'v/n/figure/phrase/fluid-more');
  assert.ok(!has(wrap([drugTile({ figure: '0.5 mg IM' })]), 'v/d/figure/phrase/0.5-mg-im'));
  expectFlag(wrap([drugTile({ figure: '0.5 mg thigh IM' })]), 'v/d/figure/phrase/0.5-mg-thigh-im');
});

test('FLAG phrase needs word boundaries: not preceded by a word char or ".", not followed by a word char', () => {
  const n = (condition: string) => wrap([stepTile({ id: 'n', action: 'Agent', figure: 'Two operators', condition, nodeIds: ['shared'], lines: [ex('shared', 'Unsuitable as sole agent.')] })]);
  expectFlag(n('suitable as sole agent'), 'v/n/condition/phrase/suitable-as-sole-agent');
  assert.ok(!has(n('Unsuitable as sole agent'), 'v/n/condition/phrase/unsuitable-as-sole-agent'));
  assert.ok(!has(n('as sole'), 'v/n/condition/phrase/as-sole'));
  expectFlag(n('as sol'), 'v/n/condition/phrase/as-sol');
});

test('FLAG phrase boundary on real data: "5 mL of 2.25%" inside "0.5 mL of 2.25%"', async () => {
  const { ctx } = await makeCtx('anaphylaxis');
  const t = (figure: string) => wrap([{ id: 'x', layout: 'steps', action: 'Nebulized epinephrine', figure, nodeIds: ['anaph-airway-critical'], lines: [ex('anaph-airway-critical', 'Do NOT delay intubation if patient is deteriorating')] }]);
  assert.ok(has(t('5 mL of 2.25%'), 'v/x/figure/phrase/5-ml-of-2.25%', ctx), 'preceded by "."');
  assert.ok(!has(t('0.5 mL of 2.25%'), 'v/x/figure/phrase/0.5-ml-of-2.25%', ctx));
});

test('FLAG negation: every face field, numbered or not, against the exact (else best-matching) line', () => {
  const t = (over: Record<string, unknown>) => wrap([stepTile({ id: 'n', action: 'AV', figure: 'Two operators', nodeIds: ['neg2'], lines: [ex('neg2', 'OK to give 0.5 mg.')], ...over })]);
  // numbered
  expectFlag(wrap([stepTile({ id: 'n', action: 'AF', figure: '>48 hours', nodeIds: ['shared'], lines: [ex('shared', 'Three attempts maximum.')] })]), 'v/n/figure/negation/>48-hours');
  assert.ok(!has(wrap([stepTile({ id: 'n', action: 'AF', figure: 'Do NOT cardiovert >48 hours', nodeIds: ['shared'], lines: [ex('shared', 'Three attempts maximum.')] })]), 'v/n/figure/negation/do-not-cardiovert->48-hours'));
  expectFlag(wrap([stepTile({ figure: 'NOT 200 J' })]), 'v/t/figure/negation/not-200-j');
  // numberless: face dropped the negation of an exactly matching line, or added one the line does not have
  assert.ok(has(t({ figure: 'give Drugexa with alcohol' }), 'v/n/figure/negation/give-drugexa-with-alcohol'), 'face lifted without the Do NOT');
  assert.ok(!has(t({ figure: 'Do NOT give Drugexa with alcohol' }), 'v/n/figure/negation/do-not-give-drugexa-with-alcohol'));
  assert.ok(!has(t({ figure: 'No Drugexa with alcohol' }), 'v/n/figure/negation/no-drugexa-with-alcohol'), 'face and line both negated');
  assert.ok(has(t({ figure: 'No 0.5 mg given' }), 'v/n/figure/negation/no-0.5-mg-given'), 'face negated, the best line for 0.5 mg is not');
});

test('FLAG negation on real data: "AV nodal blockers" / "delay for IV access" without their negation', async () => {
  const { ctx } = await makeCtx('anaphylaxis');
  const t = (figure: string, condition?: string) => wrap([{ id: 'x', layout: 'steps', action: 'Source control', figure, ...(condition ? { condition } : {}), nodeIds: ['anaph-source-control'], lines: [ex('anaph-source-control', 'Remove insect stinger (scrape, do not squeeze)')] }]);
  assert.ok(has(t('Two doses', 'delay for IV access'), 'v/x/condition/negation/delay-for-iv-access', ctx));
  assert.ok(!has(t('Two doses', 'Do NOT delay for IV access'), 'v/x/condition/negation/do-not-delay-for-iv-access', ctx));
  const { ctx: afib } = await makeCtx('afib-rvr');
  const a = (figure: string) => wrap([{ id: 'w', layout: 'steps', action: 'Screen for WPW', figure, nodeIds: ['afib-wpw-result'], lines: [ex('afib-wpw-result', 'Immediate synchronized cardioversion')] }]);
  const without = flags(a('AV nodal blockers'), afib);
  assert.ok(without.some((x: string) => x.includes('/figure/negation/') || x.includes('/figure/phrase/')), `"AV nodal blockers" must be flagged, got ${JSON.stringify(without)}`);
});

test('FLAG on real data: action words changed ("IV epinephrine", "Defibrillate", "Delay intubation")', async () => {
  const { ctx } = await makeCtx('anaphylaxis');
  const epi = (action: string) => wrap([{ id: 'x', layout: 'drug', action, figure: '0.5 mg', nodeIds: ['anaph-source-control'], drug: { id: 'epinephrine', indication: 'Anaphylaxis — IM (first-line)', weightCalcs: [{ dosePerKg: 0.01, unit: 'mg', maxDose: 0.5, label: 'Pediatric IM', concentration: { amount: 1, perMl: 1, displayName: '1:1,000 (1 mg/mL)' } }] } }]);
  assert.ok(has(epi('IV epinephrine'), 'v/x/action/phrase/iv-epinephrine', ctx));
  assert.ok(!has(epi('IM epinephrine'), 'v/x/action/phrase/im-epinephrine', ctx), '"IM Epinephrine" is in the node text');
  const air = (action: string) => wrap([{ id: 'x', layout: 'steps', action, figure: 'Video laryngoscopy', nodeIds: ['anaph-airway-critical'], lines: [ex('anaph-airway-critical', 'Video laryngoscopy (first attempt)')] }]);
  assert.ok(has(air('Delay intubation'), 'v/x/action/negation/delay-intubation', ctx), 'the exact line says "Do NOT delay intubation"');
  assert.ok(!has(air('Secure airway'), 'v/x/action/negation/secure-airway', ctx));
  const { ctx: afib } = await makeCtx('afib-rvr');
  const cv = (action: string) => wrap([{ id: 'x', layout: 'steps', action, figure: '200 J', nodeIds: ['afib-cardioversion-protocol'], lines: [ex('afib-cardioversion-protocol', 'Start at 200J biphasic (use maximal energy available)')] }]);
  assert.ok(has(cv('Defibrillate'), 'v/x/action/phrase/defibrillate', afib));
});

test('HARD route words on the face must appear in the regimen (drug) / declared node text (steps)', () => {
  assert.ok(hard(wrap([drugTile({ action: 'PO Drugexa' })])).some((m) => /route word "po"/.test(m)));
  assert.deepEqual(hard(wrap([drugTile({ action: 'Drugexa IM' })])).filter((m) => /route word/.test(m)), []);
  assert.ok(hard(wrap([stepTile({ action: 'PO cardiovert' })])).some((m) => /route word "po"/.test(m)));
  assert.ok(hard(wrap([stepTile({ action: 'po cardiovert' })])).some((m) => /route word "po"/.test(m)), 'any case');
  assert.deepEqual(hard(wrap([stepTile({ action: 'iv cardiovert' })])).filter((m) => /route word/.test(m)), [], 'lower-case iv matches IV in the node');
  assert.ok(hard(wrap([stepTile({ condition: 'IN only' })])).some((m) => /route word "IN"/.test(m)), '"IN" stays case-sensitive');
  assert.deepEqual(hard(wrap([stepTile({ condition: 'in order' })])).filter((m) => /route word/.test(m)), [], 'lower-case "in" is a plain word');
  assert.ok(hard(wrap([stepTile({ condition: 'Nebulized only' })])).some((m) => /route word "nebulized"/.test(m)));
  assert.deepEqual(hard(wrap([stepTile({ condition: 'IV midazolam first' })])).filter((m) => /route word/.test(m)), [], 'IV is in the a1 node text');
});

test('FLAG multi-dose: every drug figure while the regimen holds more than one distinct dose token', async () => {
  expectFlag(wrap([drugTile({ figure: '0.01 mg/kg' })]), 'v/d/figure/multi-dose/0.01-mg/kg');
  const f = verifyStrip(wrap([drugTile()]), synth as never).flags.find((x: { kind: string }) => x.kind === 'multi-dose');
  assert.ok(f && /0\.5 mg/.test(f.nearest[0]) && /0\.01 mg\/kg/.test(f.nearest[0]), 'lists every dose token');
  assert.ok(!has(wrap([drugTile({ action: 'Zeroxa', figure: '5 mg', drug: { id: 'drug-z', indication: 'Z' } })]), 'v/d/figure/multi-dose/5-mg'), 'one dose token only: no flag');
  const { ctx } = await makeCtx('anaphylaxis');
  const infusion = wrap([{ id: 'x', layout: 'drug', action: 'IV epinephrine', figure: '1 mg', nodeIds: ['anaph-epi-infusion'], drug: { id: 'epinephrine', indication: 'Anaphylaxis — IV infusion' } }]);
  assert.ok(has(infusion, 'v/x/figure/multi-dose/1-mg', ctx));
});

test('FLAG store-node: a drug figure token absent from the declared node text', () => {
  expectFlag(wrap([drugTile({ figure: '0.01 mg/kg' })]), 'v/d/figure/store-node/0.01-mg/kg');
  assert.ok(!has(wrap([drugTile()]), 'v/d/figure/store-node/0.5-mg'));
});

test('FLAG context: governing header not quoted, short structured value; a partial line is NOT a flag', () => {
  const h = (lines: unknown[]) => wrap([stepTile({ id: 'h', action: 'Airway', figure: 'Video laryngoscopy', nodeIds: ['hdr'], lines })]);
  const ids = (strip: RapidStrip) => ofKind(strip, 'context');
  // (a) header above the line, not quoted
  assert.deepEqual(ids(h([ex('hdr', 'Video laryngoscopy first')])), ['v/h/lines[0]/context/hdr:video-laryngoscopy-first']);
  const withHdr = verifyStrip(h([ex('hdr', 'Video laryngoscopy first')]), synth as never).flags[0];
  assert.deepEqual(withHdr.nearest.slice(0, 2), ['header: Equipment:', 'full line: Video laryngoscopy first'], 'detail carries the header and the FULL line');
  assert.deepEqual(ids(h([ex('hdr', 'Equipment:'), ex('hdr', 'Video laryngoscopy first')])), [], 'header quoted on the same tile');
  // (b) structured field value of fewer than 4 words
  assert.deepEqual(ids(h([ex('hdr', 'Nebulized')])).map((x: string) => x.split('/')[2]), ['lines[0]']);
  assert.deepEqual(ids(h([ex('hdr', '0.5 mL of 2.25% in 4.5 mL NS PRN')])), []);
  // a strict part of its source line is shown on the proof page but raises no flag
  assert.deepEqual(ids(wrap([stepTile({ lines: [ex('a1', 'Cardiovert at 200 J')] })])), []);
  assert.equal(V_excerptContext(ex('a1', 'Cardiovert at 200 J'))?.partial, true);
  assert.equal(V_excerptContext(ex('a1', 'Cardiovert at 200 J. Then 300 J.'))?.partial, false);
  assert.deepEqual(ids(wrap([stepTile()])), [], 'the whole line carries no context flag');
  expectFlag(h([ex('hdr', 'Video laryngoscopy first')]), 'v/h/lines[0]/context/hdr:video-laryngoscopy-first');
});

test('HARD excerpts are authored in normalised form (no **, [N], link markup)', () => {
  const t = (text: string) => wrap([stepTile({ nodeIds: ['a1'], lines: [ex('a1', text)] })]);
  assert.ok(hard(t('Bold line: keep **this** text')).some((m) => /normalised form/.test(m)));
  assert.ok(hard(t('Use [midazolam](#/drug/midazolam) 3-5 mg IV')).some((m) => /normalised form/.test(m)));
  assert.ok(hard(t('Sedate first [2]')).some((m) => /normalised form/.test(m)));
  assert.deepEqual(hard(t('Bold line: keep this text')).filter((m) => /excerpt/.test(m)), []);
});

test('SKIP lines use word boundaries; skipped lines feed no face number', () => {
  const lines = nodeLines(synth.nodes.find((n) => n.id === 'shared') as never) as { text: string; skip: boolean }[];
  const skip = (re: RegExp) => lines.find((l) => re.test(l.text))?.skip;
  assert.equal(skip(/^Atrial rate/), false, '"atrial" is quotable');
  assert.equal(skip(/^We get all/), false, '"get all" is quotable');
  assert.equal(skip(/^Smith et al/), true);
  assert.equal(skip(/^Several trials/), true);
  const t = (figure: string) => wrap([stepTile({ id: 's', action: 'Operators', figure, nodeIds: ['shared'], lines: [ex('shared', 'Atrial rate is irregular.')] })]);
  assert.deepEqual(hard(t('Two operators')).filter((m) => /excerpt/.test(m)), []);
  assert.ok(hard(t('99 mg')).some((m) => /99 mg/.test(m)), 'a number only on an evidence line');
  assert.ok(hard(t('98 mg')).some((m) => /98 mg/.test(m)));
});

test('FLAG outside-branch and HARD unquoted nodeIds', () => {
  const two = (nodeIdsU: string[], linesU: unknown[]): RapidStrip => ({
    treeId: 'synth', forkNodeId: 'fork',
    variants: [
      { id: 'u', label: 'Unstable', tiles: [stepTile({ id: 't1', nodeIds: nodeIdsU, lines: linesU })] },
      { id: 's', label: 'Stable', tiles: [drugTile({ id: 't2', nodeIds: ['b1'] })] },
    ],
  } as unknown as RapidStrip);
  assert.ok(!flags(two(['a1'], [ex('a1', 'Sedate first')])).some((x: string) => x.includes('outside-branch')));
  assert.ok(has(two(['a1', 'b1'], [ex('a1', 'Sedate first'), ex('b1', 'Max 1 mg')]), 'u/t1/nodeIds/outside-branch/b1'));
  assert.ok(hard(two(['a1', 'b1'], [ex('a1', 'Sedate first')])).some((m) => /"b1" is neither the primary node nor quoted/.test(m)));
  assert.deepEqual(hard(two(['a1'], [ex('a1', 'Sedate first')])).filter((m) => /neither the primary/.test(m)), []);
});

test('HARD critical-coverage: every critical-action node is cited by a tile or listed in a finding (gate time only)', () => {
  const ctx = (findings: unknown, crit = [{ text: 'Do the shared thing', nodeId: 'shared' }]) => ({ ...synth, criticalActions: crit, findings });
  const strip = wrap([stepTile()]);
  assert.ok(hard(strip, ctx([])).some((m) => /critical action "Do the shared thing"/.test(m)));
  assert.deepEqual(hard(strip, ctx([{ kind: 'gap', nodeIds: ['shared'], text: 'left off on purpose' }])).filter((m) => /critical action/.test(m)), []);
  assert.deepEqual(hard(wrap([stepTile({ nodeIds: ['shared', 'a1'], lines: [ex('shared', 'Two operators needed.')] })]), ctx([])).filter((m) => /critical action/.test(m)), [], 'cited by a tile');
  assert.deepEqual(hard(strip, { ...synth, criticalActions: [] , findings: undefined }), [], 'the runtime context (no findings) does not enforce coverage');
});

test('FLAG no-condition: also a negated declared line naming the tile drug with no condition (a warning alone does not clear)', () => {
  const d = (over: Record<string, unknown> = {}) => wrap([drugTile({ id: 'd', nodeIds: ['neg2'], ...over })]);
  expectFlag(d(), 'v/d/condition/no-condition/negated-neg2');
  assert.ok(has(d({ warning: ex('neg2', 'Do NOT give Drugexa with alcohol.') }), 'v/d/condition/no-condition/negated-neg2'));
  assert.ok(!has(d({ condition: 'Not with alcohol' }), 'v/d/condition/no-condition/negated-neg2'));
  const c = (over: Record<string, unknown> = {}) => wrap([stepTile({ id: 'c', action: 'Give', figure: '5 mg', nodeIds: ['crit'], lines: [ex('crit', 'Give 5 mg now.')], ...over })]);
  expectFlag(c(), 'v/c/condition/no-condition/crit');
  assert.ok(!has(c({ condition: 'Give 5 mg now' }), 'v/c/condition/no-condition/crit'));
  assert.ok(!has(c({ warning: ex('crit', 'Give 5 mg now.') }), 'v/c/condition/no-condition/crit'));
});

test('FLAG order: primary nodes follow the consult traversal order (BFS from entry / from the fork option)', () => {
  const s = (first: string, second: string) => wrap([
    stepTile({ id: 't1', nodeIds: [first], lines: [ex(first, first === 'a1' ? 'Sedate first' : 'Two operators needed.')], figure: first === 'a1' ? '200 J' : 'Two operators', action: 'First' }),
    stepTile({ id: 't2', nodeIds: [second], lines: [ex(second, second === 'a1' ? 'Sedate first' : 'Two operators needed.')], figure: second === 'a1' ? '200 J' : 'Two operators', action: 'Second' }),
  ]);
  assert.deepEqual(ofKind(s('a1', 'shared'), 'order'), []);
  expectFlag(s('shared', 'a1'), 'v/t2/nodeIds/order/a1');
});

test('deleted v2 flags stay deleted', () => {
  const r = verifyStrip(wrap([stepTile()]), synth as never);
  for (const f of r.flags) assert.ok(['phrase', 'negation', 'multi-dose', 'order', 'no-condition', 'context', 'outside-branch', 'store-node'].includes(f.kind));
});

// ---- Section 5: approval and runtime ----------------------------------------
test('approval: live iff hash + hard checks on LIVE data + flags + regimen pins', () => {
  const strip = wrap([drugTile(), stepTile({ id: 't', nodeIds: ['a1'] })]);
  const r1 = verifyStrip(strip, synth as never);
  const approval = { stripHash: stripHash(strip), ackedFlags: flagIds(r1), regimenPins: pins(strip) };
  assert.deepEqual(r1.failures, []);
  assert.equal(approvalHolds(strip, r1, approval, pins(strip)), true);
  assert.deepEqual(Object.keys(approval.regimenPins), ['d'], 'pins cover exactly the drug tiles');

  // one character of the live regimen changes
  const drifted = { ...synth, getDrug: (id: string) => (id === 'drug-x' ? { ...drugX, dosing: [{ ...drugX.dosing[0], regimen: drugX.dosing[0].regimen.replace('5 min', '6 min') }] } : stores[id]) as never };
  const r2 = verifyStrip(strip, drifted as never);
  assert.equal(r2.ok, true, 'the strip itself still verifies');
  assert.equal(approvalHolds(strip, r2, approval, pins(strip, drifted)), false, 'changed regimen => not live');
  // a changed weightCalc cap
  const capped = { ...synth, getDrug: (id: string) => (id === 'drug-x' ? { ...drugX, dosing: [{ ...drugX.dosing[0], weightCalc: { ...wcA, maxDose: 0.6 } }] } : stores[id]) as never };
  const r3 = verifyStrip(strip, capped as never);
  assert.equal(r3.ok, false);
  assert.equal(approvalHolds(strip, r3, approval, pins(strip, capped)), false, 'changed cap => not live');
  // an excerpt that no longer matches the live node
  const gone = { ...synth, nodes: synth.nodes.map((n) => (n.id === 'a1' ? { ...n, body: n.body.replace('Cardiovert at 200 J', 'Escalate at 200 J') } : n)) };
  assert.equal(approvalHolds(strip, verifyStrip(strip, gone as never), approval, pins(strip)), false, 'live excerpt drift => not live');
  // edited strip, missing pin
  assert.equal(approvalHolds(wrap([drugTile({ figure: '0.01 mg/kg' }), stepTile()]), r1, approval, pins(strip)), false);
  assert.equal(approvalHolds(strip, r1, { ...approval, regimenPins: {} }, pins(strip)), false, 'no pin');
  assert.equal(approvalHolds(strip, r1, undefined, pins(strip)), false);
});

test('approval refused with a missing or extra ack (ackDiff)', () => {
  const strip = wrap([stepTile({ figure: 'J 200' })]);
  const r = verifyStrip(strip, synth as never);
  assert.deepEqual(ackDiff(r, []).missing, ['v/t/figure/phrase/j-200']);
  assert.deepEqual(ackDiff(r, ['v/t/figure/phrase/j-200', 'v/zzz/figure/phrase/x']).extra, ['v/zzz/figure/phrase/x']);
  assert.deepEqual(ackDiff(r, ['v/t/figure/phrase/j-200']), { missing: [], extra: [] });
});

test('approvalStatus: draft / live / dropped with reasons', () => {
  const strip = wrap([drugTile()]);
  const r = verifyStrip(strip, synth as never);
  const good = { stripHash: stripHash(strip), ackedFlags: flagIds(r), regimenPins: pins(strip) };
  assert.equal(approvalStatus(strip, synth as never, undefined).status, 'draft');
  assert.equal(approvalStatus(strip, synth as never, good).status, 'live');
  const edited = approvalStatus(wrap([drugTile({ id: 'd2' })]), synth as never, good);
  assert.equal(edited.status, 'dropped');
  assert.match(edited.reasons[0], /edited after approval/);
  const pinned = approvalStatus(strip, synth as never, { ...good, regimenPins: { d: 'f'.repeat(64) } });
  assert.equal(pinned.status, 'dropped');
  assert.match(pinned.reasons.join(' '), /regimen text differs/);
});

test('canaries: a mutated face number and a one-character excerpt change both go red on exactly that tile', () => {
  const strip = wrap([stepTile({ id: 'a' }), drugTile({ lines: [ex('b1', 'Max 1 mg')] })]);
  assert.deepEqual(hard(strip), []);
  const c = makeCanary(strip, synth as never);
  assert.ok(c);
  const r = verifyStrip(c.strip, synth as never);
  assert.ok(!r.ok && r.failures.every((f: { tileId: string }) => f.tileId === c.tileId) && r.failures.some((f: { kind: string }) => f.kind === 'token'));
  const e = makeExcerptCanary(strip);
  assert.ok(e);
  const r2 = verifyStrip(e.strip, synth as never);
  assert.ok(!r2.ok && r2.failures.every((f: { tileId: string; kind: string }) => f.tileId === e.tileId && f.kind === 'excerpt'), JSON.stringify(r2.failures.map((f: { message: string }) => f.message)));
});

test('changing one excerpt character changes the strip hash', () => {
  assert.notEqual(stripHash(wrap([stepTile()])), stripHash(wrap([stepTile({ lines: [ex('a1', 'Cardiovert at 200 K')] })])));
});

test('C2 a malformed live drug row never throws out of the verifier', () => {
  const bad = { ...synth, getDrug: () => ({ id: 'drug-x', name: 'Drugexa' }) as never };
  assert.doesNotThrow(() => verifyStripSafe(wrap([drugTile()]), bad));
  assert.equal(verifyStripSafe(wrap([drugTile()]), bad).ok, false);
  const boom = { ...synth, getDrug: () => { throw new Error('boom'); } };
  const r2 = verifyStripSafe(wrap([drugTile()]), boom as never);
  assert.equal(r2.ok, false);
  assert.match(r2.failures[0].message, /verifier threw/);
  void nodeLines;
});

test('rapid-approve: refuses without --hash and on a hash mismatch, and never touches approvals.ts', () => {
  const file = `${ROOT}/src/data/rapid/approvals.ts`;
  const before = readFileSync(file, 'utf8');
  const run = (...a: string[]) => spawnSync(process.execPath, [`${ROOT}/scripts/rapid-approve.ts`, ...a], { encoding: 'utf8', cwd: ROOT });
  const none = run('anaphylaxis');
  assert.equal(none.status, 2);
  assert.match(none.stderr, /--hash/);
  const bad = run('anaphylaxis', '--hash', '000000000000');
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /does not match the current strip/);
  assert.equal(run('anaphylaxis', 'afib-rvr', '--hash', '000000000000').status, 2, 'one tree per approval');
  assert.equal(readFileSync(file, 'utf8'), before);
});

test('proof pages: an index (statement, grouped table, parked list) and one page per strip with the fixed section order', () => {
  const r = spawnSync(process.execPath, [`${ROOT}/scripts/rapid-proof.ts`], { encoding: 'utf8', cwd: ROOT });
  assert.equal(r.status, 0, r.stderr);
  const index = readFileSync(`${ROOT}/rapid-proof/index.html`, 'utf8');
  assert.ok(index.includes('NOT checked by machine, and yours to judge: which tiles were chosen and what was left out'));
  assert.ok(index.length < 100_000, `the index must stay small (${index.length} bytes)`);
  assert.ok(index.includes('<h2>Review first (') || index.includes('<h2>Pilot ('), 'review groups');
  assert.ok(index.includes('Parked: not registered'));
  const ids = [...index.matchAll(/href="([a-z0-9-]+)\.html">Proof</g)].map((m) => m[1]);
  assert.ok(ids.includes('anaphylaxis') && ids.includes('afib-rvr'));
  assert.ok(index.includes('/app.html?rapid-preview=1#/tree/anaphylaxis/rapid'), 'preview link');
  for (const id of ['anaphylaxis', 'afib-rvr']) {
    const html = readFileSync(`${ROOT}/rapid-proof/${id}.html`, 'utf8');
    const at = (m: string) => html.indexOf(m);
    assert.ok(html.includes('href="index.html"'), 'link back to the index');
    assert.ok(at('Findings (read first)') > 0 && at('Findings (read first)') < at("The consult's Critical actions") && at("The consult's Critical actions") < at('<h4>') && html.lastIndexOf('<h3>Approve (owner)</h3>') > html.lastIndexOf('<h4>'), 'section order');
    assert.ok(/--hash [0-9a-f]{12}/.test(html));
    assert.ok(/not on strip|on strip/.test(html));
    assert.ok(!/max-height/.test(html.slice(html.indexOf('<body>'))), 'no fixed-height scroll boxes');
  }
  const first = readFileSync(`${ROOT}/rapid-proof/${ids[0]}.html`, 'utf8');
  assert.ok(ids.length > 1 && first.includes(`href="${ids[1]}.html"`), 'next link follows the index order');
});
