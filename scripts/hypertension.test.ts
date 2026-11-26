// Reads the compiled consult in docs/ (the deploy compiles before it tests), because the source modules import each other by .js path.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { HYPERTENSION_NODES as nodes, HYPERTENSION_CITATIONS as citations, HYPERTENSION_CRITICAL_ACTIONS as critical, HYPERTENSION_NODE_COUNT } from '../docs/data/trees/hypertension.js';
import { HTN_INFO_PAGES as info } from '../docs/data/new-content/hypertension-info.js';
import { HTN_DRUGS as drugs } from '../docs/data/new-content/hypertension-drugs.js';
import { TOOLBAR_HTN as toolbar } from '../docs/data/new-content/hypertension-toolbar.js';
import { TREE_REGISTRY } from './tree-registry.mjs';

const byId = new Map(nodes.map(n => [n.id, n]));
const cites = new Set(citations.map(c => c.num));
const infoBodies = Object.values(info).flatMap(p => p.sections.map(s => s.body));
const allText = [...nodes.map(n => n.body), ...infoBodies].join('\n');
const body = (id: string): string => { const n = byId.get(id); assert.ok(n, `node ${id} exists`); return n.body; };

test('structure: ids unique, every edge resolves, every node is walkable from the start', () => {
  assert.equal(byId.size, nodes.length);
  assert.equal(HYPERTENSION_NODE_COUNT, nodes.length);
  assert.ok(nodes.length >= 35, 'the consult did not shrink');
  const seen = new Set(['htn-start']); const queue = ['htn-start'];
  while (queue.length) {
    const n = byId.get(queue.pop()!)!;
    for (const next of [...(n.options ?? []).map(o => o.next), ...(n.next ? [n.next] : [])]) {
      assert.ok(byId.has(next), `${n.id} -> ${next}`);
      if (!seen.has(next)) { seen.add(next); queue.push(next); }
    }
  }
  assert.deepEqual(nodes.filter(n => !seen.has(n.id)).map(n => n.id), []);
  for (const n of nodes) {
    if (n.type === 'question') assert.ok((n.options ?? []).length >= 2, `${n.id} has options`);
    if (n.type === 'info') assert.ok(n.next, `${n.id} has next`);
    if (n.type === 'result') assert.ok(n.recommendation, `${n.id} has a recommendation`);
  }
});

test('citations: every node cites, every number resolves, inline refs are declared on the node', () => {
  for (const n of nodes) {
    assert.ok((n.citation ?? []).length > 0, `${n.id} cites a source`);
    for (const c of n.citation ?? []) assert.ok(cites.has(c), `${n.id} cites [${c}]`);
    for (const m of n.body.matchAll(/\[(\d+(?:,\s*\d+)*)\]/g)) for (const c of m[1].split(',')) assert.ok(n.citation!.includes(Number(c)), `${n.id} inline [${c}] is in its citation array`);
  }
  for (const m of infoBodies.join('\n').matchAll(/\[(\d+(?:,\s*\d+)*)\]/g)) for (const c of m[1].split(',')) assert.ok(cites.has(Number(c)), `info inline [${c}]`);
});

test('links: info pages, drug cards (with hint), node jumps, cross-consult trees and toolbar targets all resolve', () => {
  const drugIds = new Set(drugs.map(d => d.id));
  const found = { info: 0, drug: 0, node: 0, tree: 0 };
  for (const m of allText.matchAll(/#\/info\/([a-z0-9-]+)/g)) { found.info++; assert.ok(info[m[1]], `info ${m[1]}`); }
  for (const m of allText.matchAll(/#\/drug\/([a-z0-9-]+)(\/[^)]*)?\)/g)) { found.drug++; assert.ok(drugIds.has(m[1]), `drug ${m[1]}`); assert.equal(m[2], '/chronic hypertension', `drug link ${m[1]} carries the indication hint`); }
  for (const m of allText.matchAll(/#\/node\/([a-z0-9-]+)/g)) { found.node++; assert.ok(byId.has(m[1]), `node ${m[1]}`); }
  for (const m of allText.matchAll(/#\/tree\/([a-z0-9-]+)/g)) { found.tree++; assert.ok(m[1] in TREE_REGISTRY, `tree ${m[1]}`); }
  // The scan must have found something to check; an empty scan is not a pass.
  assert.ok(found.info > 20 && found.drug > 20 && found.node > 10 && found.tree > 5, JSON.stringify(found));
  for (const d of drugs) assert.ok(d.dosing.some(x => x.indication === 'Chronic hypertension'), `${d.id} has the hinted dosing row`);
  for (const t of toolbar) {
    if (t.action === 'overlay') assert.ok(info[t.target!], `toolbar overlay ${t.target}`);
    if (t.action === 'jump') assert.ok(byId.has(t.target!), `toolbar jump ${t.target}`);
  }
  assert.ok(info['hypertension-stop'], 'Stop page exists under the id the toolbar expects');
  for (const c of critical) assert.ok(byId.has(c.nodeId), `critical action -> ${c.nodeId}`);
  assert.deepEqual(TREE_REGISTRY['hypertension'], { prefix: 'HYPERTENSION', entryNodeId: 'htn-start', categoryId: 'emergency-medicine' });
});

// Pinned routing. Rewiring one of these edges sends a patient down the wrong arm.
test('pinned routing: organ damage, severe range and pregnancy go where they must', () => {
  const edge = (from: string, label: RegExp): string => {
    const o = (byId.get(from)!.options ?? []).find(x => label.test(x.label));
    assert.ok(o, `${from} has an option matching ${label}`);
    return o.next;
  };
  assert.equal(edge('htn-start', /organ damage present or suspected/), 'htn-emergency');
  assert.equal(edge('htn-start', /^Pregnant or postpartum/), 'htn-pregnant');
  assert.equal(edge('htn-start', /^No acute organ damage/), 'htn-how-high');
  assert.equal(edge('htn-how-high', /over 180 or diastolic over 120/), 'htn-severe');
  assert.equal(byId.get('htn-severe')!.next, 'htn-severe-test');
  assert.equal(edge('htn-severe-test', /^Organ damage found/), 'htn-emergency');
  assert.equal(edge('htn-severe-test', /^No organ damage/), 'htn-who');
  assert.equal(edge('htn-dispo', /^No:/), 'htn-r-admit');
  const comorbid = byId.get('htn-comorbid')!.options!;
  assert.match(comorbid[0].label, /^Pregnant, planning pregnancy/);
  assert.equal(comorbid[0].next, 'htn-r-preg-potential');
  assert.equal(edge('htn-resistant', /^eGFR 45 or higher/), 'htn-r-spiro');
  assert.equal(edge('htn-resistant', /^eGFR under 45/), 'htn-r-resistant-alt');
  assert.equal(edge('htn-ckd', /^eGFR under 30/), 'htn-r-ckd-adv');
  assert.equal(edge('htn-hf', /40% or lower/), 'htn-r-hfref');
});

// Pinned clinical facts (2025 AHA/ACC guideline). A change here is a clinical change and needs Andy.
// Numbers are matched with a left boundary so "12.5 to 10" cannot pass for "2.5 to 10".
const num = (text: string): RegExp => new RegExp(`(?<![\\d.])${text.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}`);

test('pinned: emergency definition and lowering rules', () => {
  const b = body('htn-emergency');
  assert.match(b, /BP over 180\/120 with acute target-organ damage/);
  assert.match(b, /no more than 25% in the first hour/);
  assert.match(b, /under 160\/100 over the next 2 to 6 hours/);
  assert.match(b, /130 to 140 over 24 to 48 hours/);
  assert.match(b, /systolic under 140 in the first hour for most, under 120 in aortic dissection/);
  assert.match(b, /severe range starts at 160\/110, not 180\/120/);
});

test('pinned: severe hypertension without organ damage is not treated with IV drugs or rapid lowering', () => {
  assert.match(body('htn-severe'), /no aggressive short-term lowering and no IV drugs/);
  assert.match(body('htn-severe'), /0 of 852 sent home vs 2 of 426 sent to hospital/);
  assert.match(body('htn-severe'), /10\.3% vs 7\.9%\) and myocardial injury \(1\.2% vs 0\.6%\)/);
  assert.match(body('htn-r-admit'), /do not write as-needed IV or extra oral antihypertensives/);
  assert.match(body('htn-r-admit'), /8\.7% vs 6\.9%; OR 1\.28\), worst with IV drugs \(OR 1\.90\)/);
});

test('pinned: categories, treatment thresholds, goal and recheck window', () => {
  const b = body('htn-how-high');
  for (const s of ['Normal: under 120 and under 80', 'Elevated: 120 to 129 and under 80', 'Stage 1: 130 to 139 or 80 to 89', 'Stage 2: 140 or more, or 90 or more']) assert.ok(b.includes(s), s);
  const n = body('htn-new');
  assert.match(n, /140\/90 or higher: everyone/);
  assert.match(n, /PREVENT risk of 7\.5% or more/);
  assert.match(n, /after 3 to 6 months/);
  assert.match(body('htn-r-mono'), /under 130\/80, with encouragement toward a systolic under 120/);
  assert.match(body('htn-r-mono'), /Basic metabolic panel 2 to 4 weeks after starting or changing a diuretic, ACE inhibitor, ARB or MRA/);
  assert.match(body('htn-r-discharge'), /basic metabolic panel 2 to 4 weeks after starting or changing a diuretic, ACE inhibitor, ARB or MRA/);
  assert.match(body('htn-ckd'), /KDIGO suggests under 120/);
  assert.match(body('htn-stage'), /systolic 20 and diastolic 10 mm Hg or more above target, which no stage 1 reading reaches/);
});

test('pinned: dose ranges match the guideline drug table on the cards, in the tree and on the doses page', () => {
  const ranges: Record<string, string> = {
    'htn-amlodipine': '2.5 to 10 mg once daily', 'htn-chlorthalidone': '12.5 to 25 mg once daily', 'htn-hctz': '25 to 50 mg once daily',
    'htn-indapamide': '1.25 to 2.5 mg once daily', 'htn-lisinopril': '10 to 40 mg once daily', 'htn-losartan': '50 to 100 mg per day',
    'htn-spironolactone': '25 to 50 mg once daily as the fourth drug', 'htn-nifedipine-er': '30 to 90 mg once daily',
    'htn-carvedilol': '12.5 to 50 mg per day in 2 doses', 'htn-metoprolol-succinate': '50 to 200 mg once daily',
    'htn-labetalol': '200 to 1200 mg per day in 2 doses', 'htn-torsemide': '5 to 10 mg once daily',
  };
  assert.equal(drugs.length, Object.keys(ranges).length);
  for (const d of drugs) assert.match(d.dosing[0].regimen, num(`range ${ranges[d.id]}`.replace(/^range /, '')), d.id);
  // In the tree, each range must sit right after its own drug link.
  const link = (id: string): string => `(#/drug/${id}/chronic hypertension) `;
  const mono = body('htn-r-mono');
  for (const [id, r] of [['htn-amlodipine', '2.5 to 10 mg'], ['htn-chlorthalidone', '12.5 to 25 mg'], ['htn-lisinopril', '10 to 40 mg'], ['htn-losartan', '50 to 100 mg']]) assert.ok(mono.includes(link(id) + r), `${id} ${r} in htn-r-mono`);
  assert.ok(body('htn-r-spiro').includes(link('htn-spironolactone') + '25 to 50 mg once daily'));
  assert.ok(body('htn-r-ckd-adv').includes(link('htn-torsemide') + '5 to 10 mg once daily'));
  assert.ok(body('htn-resistant').includes(link('htn-chlorthalidone') + '12.5 to 25 mg or '));
  assert.ok(body('htn-resistant').includes(link('htn-indapamide') + '1.25 to 2.5 mg'));
  const doses = info['htn-drugs'].sections.map(x => x.body).join('\n');
  for (const line of ['**Amlodipine:** 2.5 to 10 mg once daily', '**Chlorthalidone:** 12.5 to 25 mg once daily', '**Hydrochlorothiazide:** 25 to 50 mg once daily', '**Lisinopril:** 10 to 40 mg once daily',
    '**Losartan:** 50 to 100 mg/day in 1 or 2 doses', '**Spironolactone:** 25 to 100 mg once daily', '**Metoprolol succinate:** 50 to 200 mg once daily', '**Labetalol:** 200 to 1200 mg/day in 2 doses',
    '**Torsemide:** 5 to 10 mg once daily', '**Clonidine (oral):** 0.1 to 0.8 mg/day in 2 doses', '**Hydralazine:** 100 to 200 mg/day in 2 or 3 doses', '**Aprocitentan:** 12.5 mg once daily']) assert.ok(doses.includes(line), line);
  for (const s of ['Benazepril + amlodipine: 10/2.5, 10/5, 20/5, 20/10, 40/5, 40/10', 'Lisinopril + HCTZ: 10/12.5, 20/12.5, 20/25', 'Losartan + HCTZ: 50/12.5, 100/12.5, 100/25', 'Valsartan + amlodipine: 160/5, 160/10, 320/5, 320/10']) assert.ok(body('htn-r-combo').includes(s), s);
});

test('pinned: kidney, potassium, pregnancy and combination safety rules', () => {
  assert.match(body('htn-ckd'), /never both/);
  assert.match(body('htn-ckd'), /eGFR dip of up to 30% is expected/);
  assert.match(body('htn-r-ckd'), /if potassium is high, or if eGFR falls more than 30% and stays there/);
  assert.doesNotMatch(body('htn-r-ckd'), /only if eGFR/);
  assert.match(body('htn-r-ckd'), /No spironolactone, amiloride or triamterene when GFR is under 45/);
  assert.match(body('htn-resistant'), /whatever the potassium/);
  assert.match(body('htn-resistant'), /above goal on 3 drugs with complementary mechanisms including a diuretic/);
  assert.match(body('htn-r-spiro'), /eGFR under 45/);
  assert.match(body('htn-r-resistant-alt'), /avoided when GFR is under 45 or potassium is high/);
  assert.match(body('htn-r-hfref'), /an MRA if eGFR is over 30 and potassium under 5\.0 mEq\/L/);
  assert.match(body('htn-r-hfref'), /No diltiazem or verapamil/);
  assert.match(body('htn-r-preg-potential'), /no atenolol, ACE inhibitor, ARB, direct renin inhibitor, nitroprusside or MRA/);
  const preg = body('htn-pregnant');
  assert.match(preg, /systolic 160 or more, or diastolic 110 or more, confirmed on repeat within 15 minutes/);
  assert.match(preg, /under 160\/110 within 30 to 60 minutes/);
  assert.match(preg, /treat to under 140\/90/);
  assert.match(preg, /aspirin \(81 mg\/day\)/);
  assert.match(body('htn-r-combo'), /Never an ACE inhibitor with an ARB/);
  assert.match(body('htn-r-stroke'), /BP under 220\/120, starting or restarting BP medicine in the first 48 to 72 hours/);
  // Pregnancy must route to the pregnancy card, never to amlodipine or a thiazide, from the general cards.
  for (const id of ['htn-r-mono', 'htn-r-combo', 'htn-r-ckd', 'htn-r-dm']) assert.match(body(id), /Pregnant or planning pregnancy: use the \[pregnancy card\]\(#\/node\/htn-r-preg-potential\)/, id);
  for (const id of ['htn-lisinopril', 'htn-losartan', 'htn-spironolactone']) assert.ok(drugs.find(d => d.id === id)!.contraindications!.some(c => /[Pp]regnancy/.test(c)), `${id} lists pregnancy`);
});

test('pinned: Stop page keeps its ten pitfalls', () => {
  const heads = info['hypertension-stop'].sections.map(x => x.heading ?? '');
  assert.equal(heads.length, 10);
  for (const h of [/treat the number as the emergency/, /IV drugs or lower BP fast when there is no organ damage/, /as-needed antihypertensives for an inpatient number/, /combine an ACE inhibitor with an ARB/,
    /ACE inhibitor, ARB, renin inhibitor or MRA in pregnancy/, /stop clonidine or a beta blocker abruptly/, /diltiazem or verapamil in HFrEF/, /spironolactone or amiloride for blood pressure when GFR is under 45/,
    /stop an ACE inhibitor or ARB for an eGFR dip of 30% or less/, /resistant before checking adherence/]) assert.ok(heads.some(x => h.test(x)), String(h));
  assert.ok(heads.every(x => x.startsWith('🛑 Do NOT ')));
});

test('pinned: race does not select the drug class', () => {
  assert.match(body('htn-stage'), /does not choose the drug by race/);
});

test('pinned: diet targets and home BP equivalents', () => {
  const b = body('htn-diet');
  assert.match(b, /Sodium under 2,300 mg\/day, ideally under 1,500/);
  assert.match(b, /Check potassium first in CKD or on an ACE inhibitor, ARB, spironolactone/);
  assert.match(b, /at most 2 drinks\/day for men, 1 for women/);
  const home = info['htn-home-bp'].sections.map(x => x.body).join('\n');
  for (const s of ['**Office 130/80** = home 130/80 = 24-hour ambulatory 125/75', '**Office 140/90** = home 135/85 = 24-hour ambulatory 130/80', '**Office 160/100** = home 145/90 = 24-hour ambulatory 145/90']) assert.ok(home.includes(s), s);
});

test('picker drug links resolve to a unique dosage section and retain a return path', () => {
  const sections = info['htn-drugs'].sections;
  const slug = (name: string) => 'trick-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const links = info['htn-picker'].sections.flatMap(s => [...s.body.matchAll(/\[([^\]]+)\]\(#\/info\/htn-drugs#([^)]+)\)/g)]);
  assert.ok(links.length >= 20);
  for (const [, label, anchor] of links) {
    const matches = sections.filter(s => s.heading && slug(s.heading) === anchor);
    assert.equal(matches.length, 1, label);
    assert.ok(matches[0].body.includes('[Back to Drug Picker](#/info/htn-picker)'), label);
  }
  const stage1 = info['htn-picker'].sections.find(s => s.heading?.includes('stage 1'))!;
  assert.ok(stage1.body.includes('[amlodipine](#/info/htn-drugs#trick-amlodipine)'));
});
