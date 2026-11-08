/**
 * Gate for the reviewed synonym pairs (engine >= 1.7; decision 2026-11-08-vocab-misses-synonym-experiment).
 * Separate from the app-side CLINICAL_SYNONYMS / DRUG_SYNONYMS (consult and drug aliases), which this never touches.
 *
 *   a. exact      the pairs shipped in docs/data/search-answer-index.json are exactly the `y` rows of scripts/synonyms.review.tsv
 *   b. in text    every shipped pair's words appear in the indexed text (both sides for kind=mined, the target side for missed-word)
 *   c. no clash   no pair has a single-word side that is an ALTS key or in AMBIGUOUS_ABBREV (the engine would drop it silently)
 *
 * Each check is a pure function; the last tests feed it a broken fixture and require it to report a violation, so a gate
 * that has gone blind fails instead of passing.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { stem } from '../src/services/question-search.ts';
import { loadCorpus, loadInput } from './search-corpus.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

interface Pair { a: string; b: string; oneWay?: true }
interface Row { pair: string; kind: string; accept: string }

const words = (s: string): string[] => s.toLowerCase().match(/[a-z0-9]+/g) ?? [];
const pairText = (p: Pair) => `${p.a} = ${p.b}`;

function readRows(file: string): Row[] {
  const lines = fs.readFileSync(file, 'utf8').split('\n').filter((l) => l.trim());
  const head = lines[0].split('\t');
  const col = (n: string) => head.indexOf(n);
  for (const n of ['pair', 'kind', 'accept']) assert.ok(col(n) >= 0, `review file has no ${n} column`);
  return lines.slice(1).map((l) => {
    const c = l.split('\t');
    return { pair: c[col('pair')].trim(), kind: c[col('kind')].trim(), accept: (c[col('accept')] ?? '').trim() };
  });
}

/** ALTS keys and AMBIGUOUS_ABBREV read from the vendored engine source, so the gate cannot drift from what the engine does. */
function readEngineRules(file: string): { alts: Set<string>; ambiguous: Set<string> } {
  const src = fs.readFileSync(file, 'utf8');
  const start = src.indexOf('const ALTS');
  const end = src.indexOf('\n};', start);
  assert.ok(start > 0 && end > start, 'could not find the ALTS table in the engine');
  const alts = new Set<string>();
  for (const m of src.slice(start, end).matchAll(/(?:^|[\s,{])'?([a-z0-9]+)'?\s*:\s*\[/g)) alts.add(m[1]);
  const amb = src.match(/const AMBIGUOUS_ABBREV[^=]*=\s*new Set\(\[([^\]]*)\]\)/);
  assert.ok(amb, 'could not find AMBIGUOUS_ABBREV in the engine');
  const ambiguous = new Set([...amb[1].matchAll(/'([^']+)'/g)].map((m) => m[1]));
  return { alts, ambiguous };
}

/** a. shipped pairs equal the y rows, same order. */
export function checkExact(shipped: Pair[], rows: Row[]): string[] {
  const want = rows.filter((r) => r.accept === 'y').map((r) => r.pair);
  const got = shipped.map(pairText);
  const out: string[] = [];
  for (const w of want) if (!got.includes(w)) out.push(`y row not shipped: ${w}`);
  for (const g of got) if (!want.includes(g)) out.push(`shipped but not a y row: ${g}`);
  if (!out.length && JSON.stringify(want) !== JSON.stringify(got)) out.push('same pairs, different order');
  if (new Set(got).size !== got.length) out.push('duplicate shipped pair');
  return out;
}

/** b. words present in the indexed text. mined: both sides. missed-word: the target (b) side only. */
export function checkInText(shipped: Pair[], rows: Row[], textWords: Set<string>): string[] {
  const kindOf = new Map(rows.map((r) => [r.pair, r.kind]));
  const present = (side: string) => words(side).every((w) => textWords.has(w) || textWords.has(stem(w)));
  const out: string[] = [];
  for (const p of shipped) {
    const kind = kindOf.get(pairText(p));
    if (kind !== 'mined' && kind !== 'missed-word') { out.push(`no known kind for: ${pairText(p)}`); continue; }
    if (kind === 'mined') {
      if (!present(p.a)) out.push(`"${p.a}" not in the indexed text (${pairText(p)})`);
      if (!present(p.b)) out.push(`"${p.b}" not in the indexed text (${pairText(p)})`);
    } else if (!present(p.b)) out.push(`target "${p.b}" not in the indexed text (${pairText(p)})`);
  }
  return out;
}

/** c. a single-word side that is a built-in rule is dropped by the engine; refuse to ship it. */
export function checkNoClash(shipped: Pair[], alts: Set<string>, ambiguous: Set<string>): string[] {
  const out: string[] = [];
  for (const p of shipped) {
    for (const side of [p.a, p.b]) {
      const w = words(side);
      if (w.length !== 1) continue;
      if (alts.has(w[0]) || alts.has(stem(w[0]))) out.push(`"${side}" is an ALTS key (${pairText(p)})`);
      if (ambiguous.has(w[0])) out.push(`"${side}" is in AMBIGUOUS_ABBREV (${pairText(p)})`);
    }
  }
  return out;
}

const REVIEW = path.join(ROOT, 'scripts', 'synonyms.review.tsv');
const ENGINE = path.join(ROOT, 'src', 'services', 'question-search.ts');
const rows = readRows(REVIEW);
const rules = readEngineRules(ENGINE);
const input = await loadInput();
const shipped = (input.synonyms ?? []) as Pair[];
const { docs } = await loadCorpus();
const textWords = new Set<string>();
for (const d of docs) {
  const all = [d.title, d.subtitle, ...d.keywords, d.text ?? '', d.parentTitle ?? '', d.moduleLabel ?? '', d.parentSubtitle ?? ''].join(' ');
  for (const w of words(all)) textWords.add(w);
  // an abbreviation written with a hyphen in the text ("ADD-RS") is reviewed as one word ("addrs")
  for (const m of all.toLowerCase().matchAll(/[a-z0-9]+(?:-[a-z0-9]+)+/g)) textWords.add(m[0].replace(/-/g, ''));
}

test('self-check: the gate saw the review file, the engine rules and the indexed text', () => {
  assert.ok(rows.filter((r) => r.accept === 'y').length >= 100, 'fewer than 100 y rows read');
  assert.ok(rules.alts.size >= 100, `only ${rules.alts.size} ALTS keys parsed (expected >= 100)`);
  assert.ok(rules.alts.has('dka') && rules.ambiguous.has('acs'), 'ALTS / AMBIGUOUS_ABBREV parse lost known entries');
  assert.ok(textWords.size > 5000, `only ${textWords.size} indexed words`);
  assert.ok(shipped.length >= 100, 'fewer than 100 shipped pairs');
});

test('a. shipped synonyms equal the y rows of synonyms.review.tsv exactly', () => {
  assert.deepEqual(checkExact(shipped, rows), []);
});

test('b. every shipped pair\'s words appear in the indexed text (both sides for mined)', () => {
  assert.deepEqual(checkInText(shipped, rows, textWords), []);
});

test('c. no shipped pair has a single-word side that is an ALTS key or in AMBIGUOUS_ABBREV', () => {
  assert.deepEqual(checkNoClash(shipped, rules.alts, rules.ambiguous), []);
});

// Proof each assertion can fail: broken in-memory copies must be reported.
test('proof a: a dropped, an extra and a reordered pair are all caught', () => {
  assert.ok(checkExact(shipped.slice(1), rows).length > 0, 'dropped pair not caught');
  assert.ok(checkExact([...shipped, { a: 'zzfake', b: 'zzfake long form' }], rows).length > 0, 'extra pair not caught');
  assert.ok(checkExact([shipped[1], shipped[0], ...shipped.slice(2)], rows).length > 0, 'reordered pair not caught');
  const asN = rows.map((r, i) => (i === rows.findIndex((x) => x.accept === 'y') ? { ...r, accept: 'n' } : r));
  assert.ok(checkExact(shipped, asN).length > 0, 'a y row flipped to n is not caught');
});

test('proof b: a pair whose words are not in the text is caught (mined: either side; missed-word: target only)', () => {
  const bogus: Pair = { a: 'qqxzv', b: 'qqxzv long form' };
  const mined = [...rows, { pair: pairText(bogus), kind: 'mined', accept: 'y' }];
  assert.ok(checkInText([...shipped, bogus], mined, textWords).length > 0, 'mined pair with absent words not caught');
  const oneSide: Pair = { a: shipped[0].a, b: 'qqxzv' };
  const mined2 = [...rows, { pair: pairText(oneSide), kind: 'mined', accept: 'y' }];
  assert.ok(checkInText([oneSide], mined2, textWords).length > 0, 'mined pair with one absent side not caught');
  const missedTarget = [...rows, { pair: pairText(bogus), kind: 'missed-word', accept: 'y' }];
  assert.ok(checkInText([bogus], missedTarget, textWords).length > 0, 'missed-word with absent target not caught');
  const missedOk: Pair = { a: 'qqxzv', b: shipped[0].b };
  const missedOkRows = [...rows, { pair: pairText(missedOk), kind: 'missed-word', accept: 'y' }];
  assert.deepEqual(checkInText([missedOk], missedOkRows, textWords), [], 'missed-word with absent user word must be allowed');
  assert.ok(checkInText([bogus], rows, textWords).length > 0, 'pair with no review row not caught');
});

test('proof c: an ALTS key and an AMBIGUOUS_ABBREV single-word side are caught', () => {
  assert.ok(checkNoClash([{ a: 'dka', b: 'diabetic ketoacidosis' }], rules.alts, rules.ambiguous).length > 0, 'ALTS key not caught');
  assert.ok(checkNoClash([{ a: 'acute coronary syndrome', b: 'acs' }], rules.alts, rules.ambiguous).length > 0, 'ambiguous abbreviation not caught');
  assert.deepEqual(checkNoClash([{ a: 'rug', b: 'retrograde urethrogram' }], rules.alts, rules.ambiguous), [], 'a clean pair must pass');
});
