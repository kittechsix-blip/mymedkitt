#!/usr/bin/env node
/**
 * lint-citation-refs.mjs
 *
 * Catches DANGLING citation references — the bug class found on 2026-08-03,
 * when a legal-compliance audit run rewrote node `citation: [...]` arrays in
 * chs / gallbladder / lambert-eaton to point at reference numbers it never
 * appended to those files' CITATIONS arrays.
 *
 * chs.ts declared 1-14 and referenced up to 22. In the live app a clinician
 * taps [15] and gets nothing. Worse, the same edit REPLACED working citations
 * with dangling ones — the QTc node cited [2] (SAEM GRACE-4) before the run
 * and [15, 17, 18, 22] after it, none of which resolve. An audit whose entire
 * purpose is that every recommendation be independently reviewable had made
 * three consults less reviewable than before.
 *
 * A citation you cannot open is worse than no citation: it reads as evidence
 * and provides none. Sibling of lint-calculator-refs.mjs (dead buttons),
 * lint-image-refs.mjs (empty figures), and validate-cross-links.mjs.
 *
 * Two reference channels are checked, per tree file:
 *   1. citation: [N, ...]        the node's structured citation array
 *   2. [N] and [N,M] in prose    inline marks, which must be tappable
 *
 * Exit 0 = every reference resolves. Exit 1 = one or more dangle.
 *
 * Usage:
 *   node scripts/lint-citation-refs.mjs                    report everything
 *   node scripts/lint-citation-refs.mjs --gate             fail only on NEW
 *   node scripts/lint-citation-refs.mjs --update-baseline  accept current debt
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Overridable so the gate can be aimed at a checkout of another revision —
// that is how the baseline was proven to be HEAD's debt rather than the
// working tree's. A gate you cannot aim is a gate you cannot calibrate.
const TREES_DIR = process.env.CITATION_LINT_DIR ?? join(ROOT, 'src/data/trees');
const BASELINE_FILE = join(ROOT, 'scripts/lint-citation-refs.baseline.json');

const args = process.argv.slice(2);
const gate = args.includes('--gate');
const updateBaseline = args.includes('--update-baseline');

/**
 * Pull the declared reference numbers out of a `*_CITATIONS: Citation[] = [`
 * array by walking brackets. A bare /num:\s*(\d+)/ scan over the whole file
 * would also swallow any `num:` that appears elsewhere and quietly declare
 * references that do not exist — the failure this file exists to catch.
 */
function declaredNums(src) {
  const decl = /export const [A-Z0-9_]*CITATIONS\s*:\s*Citation\[\]\s*=\s*\[/g;
  const nums = new Set();
  let m;
  while ((m = decl.exec(src)) !== null) {
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    while (i < src.length && depth > 0) {
      const c = src[i];
      if (c === '[') depth++;
      else if (c === ']') depth--;
      i++;
    }
    const body = src.slice(start, i - 1);
    for (const n of body.matchAll(/\{\s*num:\s*(\d+)\s*,/g)) nums.add(Number(n[1]));
  }
  return nums;
}

/** `citation: [1, 6, 7]` — the structured array on a node. */
function arrayRefs(src) {
  const refs = new Map(); // num -> count
  for (const m of src.matchAll(/citation:\s*\[([\d,\s]*)\]/g)) {
    for (const raw of m[1].split(',')) {
      const t = raw.trim();
      if (!t) continue;
      const n = Number(t);
      refs.set(n, (refs.get(n) ?? 0) + 1);
    }
  }
  return refs;
}

/**
 * Inline `[22]` / `[1,9]` marks in body prose. Markdown links `[text](url)`
 * are excluded by the negative lookahead; a numeric label followed by `(` is
 * a link, not a citation.
 *
 * The citation arrays are stripped first — otherwise every structured ref
 * would be double-counted here and the two channels could not be told apart.
 */
function inlineRefs(src) {
  const stripped = src.replace(/citation:\s*\[[\d,\s]*\]/g, '');
  const refs = new Map();
  for (const m of stripped.matchAll(/\[(\d{1,3}(?:\s*,\s*\d{1,3})*)\](?!\()/g)) {
    for (const raw of m[1].split(',')) {
      const n = Number(raw.trim());
      refs.set(n, (refs.get(n) ?? 0) + 1);
    }
  }
  return refs;
}

const files = readdirSync(TREES_DIR)
  .filter((f) => f.endsWith('.ts'))
  .sort();

const dangling = []; // { key, file, num, channel, count }
let filesWithCitations = 0;
let totalDeclared = 0;
let totalRefs = 0;

for (const f of files) {
  const src = readFileSync(join(TREES_DIR, f), 'utf8');
  const declared = declaredNums(src);
  if (declared.size === 0) continue; // tree carries no citation array of its own
  filesWithCitations++;
  totalDeclared += declared.size;

  for (const [channel, refs] of [['array', arrayRefs(src)], ['inline', inlineRefs(src)]]) {
    for (const [num, count] of refs) {
      totalRefs += count;
      if (!declared.has(num)) {
        dangling.push({ key: `${f}#${num}#${channel}`, file: f, num, channel, count });
      }
    }
  }
}

dangling.sort((a, b) => a.file.localeCompare(b.file) || a.num - b.num || a.channel.localeCompare(b.channel));

if (updateBaseline) {
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify(
      {
        generated: 'run --update-baseline to regenerate',
        // The floor the gate may never silently drop below. If a tree stops
        // parsing, its references stop being checked, and a green verdict
        // would mean "found nothing" rather than "nothing is wrong".
        coverage: { trees: filesWithCitations, declared: totalDeclared },
        keys: dangling.map((d) => d.key),
      },
      null,
      2,
    ) + '\n',
  );
  console.log(`✅ baseline written: ${dangling.length} known dangling citation ref(s)`);
  process.exit(0);
}

const baseline = new Set(
  existsSync(BASELINE_FILE) ? (JSON.parse(readFileSync(BASELINE_FILE, 'utf8')).keys ?? []) : [],
);
const fresh = dangling.filter((d) => !baseline.has(d.key));
const known = dangling.filter((d) => baseline.has(d.key));

console.log(
  `citation refs — ${filesWithCitations} tree(s) with a citation array, ` +
    `${totalDeclared} declared, ${totalRefs} reference(s) checked`,
);

// ── PROVE THE CHECK LOOKED ────────────────────────────────────────────────
// `=== 0` is not enough, and this gate learned that the hard way on
// 2026-08-03. A repair script inserted entries into the `Citation[]` TYPE
// ANNOTATION instead of the array literal, so three trees stopped parsing
// entirely — and because their references stopped being collected along with
// their declarations, this gate reported "✅ no NEW dangling references" on a
// file that no longer compiled. Coverage had fallen 353 → 350 and declarations
// 4821 → 4783 while the verdict stayed green.
//
// A gate must fail when it can no longer SEE its subject, not only when the
// subject is absent. Coverage is therefore itself ratcheted: it may rise, and
// it may never silently fall.
if (filesWithCitations === 0 || totalRefs === 0) {
  console.error('❌ parsed no citations at all — the declaration format changed and this gate is blind.');
  process.exit(1);
}

const floor = existsSync(BASELINE_FILE)
  ? (JSON.parse(readFileSync(BASELINE_FILE, 'utf8')).coverage ?? null)
  : null;
if (floor && !updateBaseline) {
  if (filesWithCitations < floor.trees) {
    console.error(
      `\n❌ citation coverage FELL: ${floor.trees} tree(s) parsed when the baseline was written, ` +
        `${filesWithCitations} now.\n   ${floor.trees - filesWithCitations} tree(s) stopped parsing — their references are no ` +
        `longer being checked at all.\n   This is the gate going blind, not the code getting cleaner. Fix the ` +
        `declaration, do not re-baseline.`,
    );
    process.exit(1);
  }
  if (totalDeclared < floor.declared) {
    console.error(
      `\n❌ declared citations FELL: ${floor.declared} → ${totalDeclared}. ` +
        `Entries were deleted or an array stopped parsing.`,
    );
    process.exit(1);
  }
}

const show = (list) => {
  let last = '';
  for (const d of list) {
    if (d.file !== last) {
      console.log(`\n  ${d.file}`);
      last = d.file;
    }
    console.log(`    [${d.num}]  ${d.channel === 'array' ? 'citation: [...]' : 'inline prose'}  ×${d.count}  → not declared`);
  }
};

if (known.length && gate) {
  console.log(`\n⚠️  ${known.length} known dangling ref(s) in the baseline (not blocking):`);
  show(known);
}

if (gate) {
  if (fresh.length === 0) {
    console.log('\n✅ no NEW dangling citation references');
    process.exit(0);
  }
  console.log(`\n❌ ${fresh.length} NEW dangling citation reference(s):`);
  show(fresh);
  console.log(
    '\nA [N] that resolves to nothing reads as evidence and provides none.\n' +
      'Append the entry to that tree\'s CITATIONS array, or point the node at a\n' +
      'reference that exists. Do not invent one to close the gap.\n',
  );
  process.exit(1);
}

if (dangling.length === 0) {
  console.log('\n✅ every citation reference resolves');
  process.exit(0);
}
console.log(`\n❌ ${dangling.length} dangling citation reference(s):`);
show(dangling);
process.exit(1);
