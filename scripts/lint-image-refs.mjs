#!/usr/bin/env node
/**
 * lint-image-refs.mjs
 *
 * Verifies that every image a consult references (`images: [{ src: 'images/...' }]`
 * in a tree node) actually exists as a file under `docs/`. A dangling src = a
 * broken/empty figure in production (the <img> renders with no content).
 *
 * This is the bug class that let the pericarditis ECG figure ship EMPTY
 * (2026-07-19) — the node pointed at images/pericarditis/pericarditis-ecg.png,
 * a file that never existed. Flow Rider's click-through audit never caught it
 * because it never opened that specific info node.
 *
 * Modes (mirrors lint-calculator-refs.mjs):
 *   (default)            report all broken image refs, exit 1 if any exist.
 *   --gate               RATCHET mode for the deploy pipeline: fail ONLY on
 *                        broken refs NOT in the baseline. Known debt (baseline)
 *                        prints as a warning but does not block.
 *   --update-baseline    freeze the CURRENT broken set as accepted debt. Run
 *                        deliberately when you accept the backlog, or after
 *                        fixing some so the baseline shrinks (ratchet only
 *                        turns one way — new broken images can never sneak in).
 *
 * TEXT-LEVEL lint. No compilation required. Fast.
 *
 * Usage: node scripts/lint-image-refs.mjs [--gate | --update-baseline]
 */

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TREES_DIR = join(ROOT, 'src/data/trees');
const DOCS_DIR = join(ROOT, 'docs');
const BASELINE_FILE = join(ROOT, 'scripts/lint-image-refs.baseline.json');

const args = process.argv.slice(2);
const gate = args.includes('--gate');
const updateBaseline = args.includes('--update-baseline');

// ---------------------------------------------------------------------------
// 1. Collect every referenced image src from tree nodes, with source location.
//    Match: src: 'images/....' or src: "images/...."
// ---------------------------------------------------------------------------
const refs = []; // { src, tree }
for (const f of readdirSync(TREES_DIR)) {
  if (!f.endsWith('.ts') || f === 'index.ts' || f.startsWith('_')) continue;
  const body = readFileSync(join(TREES_DIR, f), 'utf8');
  for (const m of body.matchAll(/src\s*:\s*["'](images\/[^"']+)["']/g)) {
    refs.push({ src: m[1], tree: f });
  }
}

if (refs.length === 0) {
  console.error('❌ Parsed 0 image references — parser is broken, aborting to avoid false positives.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. A ref is broken iff docs/<src> does not exist on disk.
// ---------------------------------------------------------------------------
const broken = refs.filter(r => !existsSync(join(DOCS_DIR, r.src)));

// Group by src for readable output + de-dup source trees.
const bySrc = new Map();
for (const b of broken) {
  if (!bySrc.has(b.src)) bySrc.set(b.src, new Set());
  bySrc.get(b.src).add(b.tree);
}
const brokenSrcs = [...bySrc.keys()].sort();

console.log('🖼  Image reference lint');
console.log(`   Total image refs   : ${refs.length}`);
console.log(`   Unique refs        : ${new Set(refs.map(r => r.src)).size}`);
console.log(`   Broken (missing)   : ${brokenSrcs.length}`);
console.log('');

function printGroup(srcs) {
  for (const src of srcs) {
    console.error(`   ${src}`);
    for (const t of bySrc.get(src)) console.error(`       ← trees/${t}`);
  }
}

// --- Mode: --update-baseline -----------------------------------------------
if (updateBaseline) {
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ generated: new Date().toISOString().slice(0, 10), broken: brokenSrcs }, null, 2) + '\n',
  );
  console.log(`📌 Baseline written: ${brokenSrcs.length} known broken image(s) → scripts/lint-image-refs.baseline.json`);
  process.exit(0);
}

// --- Mode: --gate (deploy ratchet) -----------------------------------------
if (gate) {
  let baseline = new Set();
  if (existsSync(BASELINE_FILE)) {
    try {
      baseline = new Set(JSON.parse(readFileSync(BASELINE_FILE, 'utf8')).broken || []);
    } catch {
      console.error('❌ Baseline file is corrupt. Regenerate with --update-baseline.');
      process.exit(1);
    }
  }
  const newlyBroken = brokenSrcs.filter(s => !baseline.has(s));
  const knownDebt = brokenSrcs.filter(s => baseline.has(s));
  const fixed = [...baseline].filter(s => !bySrc.has(s));

  if (knownDebt.length) {
    console.warn(`⚠  ${knownDebt.length} KNOWN broken image(s) (in baseline — not blocking).`);
    console.warn('');
  }
  if (fixed.length) {
    console.warn(`✨ ${fixed.length} baseline image(s) now resolve — tighten the ratchet with:`);
    console.warn('   node scripts/lint-image-refs.mjs --update-baseline');
    console.warn(`   (fixed: ${fixed.join(', ')})`);
    console.warn('');
  }
  if (newlyBroken.length === 0) {
    console.log('✅ No NEW broken image references. Deploy gate passes.');
    process.exit(0);
  }
  console.error(`❌ ${newlyBroken.length} NEW broken image reference(s) introduced — these render as empty figures:\n`);
  printGroup(newlyBroken);
  console.error('');
  console.error('This deploy ADDS an empty figure. FIX before shipping:');
  console.error('  • add the image file under docs/<path> (with a MANIFEST.json license entry), OR');
  console.error('  • correct the src in the consult, OR');
  console.error('  • remove the images: entry from the node.');
  process.exit(1);
}

// --- Mode: default (full report) -------------------------------------------
if (brokenSrcs.length === 0) {
  console.log('✅ All image references resolve to a file under docs/.');
  process.exit(0);
}
console.error(`❌ ${brokenSrcs.length} broken image reference(s) — these render as empty figures in production:\n`);
printGroup(brokenSrcs);
console.error('');
console.error('FIX: add the image under docs/<path>, correct the src, or remove the images entry.');
process.exit(1);
