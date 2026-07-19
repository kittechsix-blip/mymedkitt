#!/usr/bin/env node
/**
 * lint-calculator-refs.mjs
 *
 * Catches DANGLING calculator references — the bug class that let the
 * pericarditis high-risk calculator ship broken (2026-07-19). A consult
 * pointed at calculator IDs ('pericarditis-risk', 'pericarditis-diagnostic')
 * that were never defined in the CALCULATORS registry, so every button hit
 * the "not found" screen silently. Flow Rider's click-through audit missed it.
 *
 * This script verifies the static invariant: EVERY calculator ID referenced
 * by a consult MUST exist as a key in the CALCULATORS registry.
 *
 * Three reference channels are checked:
 *   1. calculatorLinks: [{ id: '<id>' }]         (decision-node buttons)
 *   2. action: 'calculator', target: '<id>'       (bottom-toolbar buttons)
 *   3. [label](#/calculator/<id>)                 (in-body markdown links)
 *
 * Exit 0 = all references resolve. Exit 1 = one or more dangling refs.
 *
 * Usage: node scripts/lint-calculator-refs.mjs
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CALC_FILE = join(ROOT, 'src/components/calculator.ts');
const TOOLBAR_FILE = join(ROOT, 'src/data/toolbar-configs.ts');
const TREES_DIR = join(ROOT, 'src/data/trees');
const BASELINE_FILE = join(ROOT, 'scripts/lint-calculator-refs.baseline.json');

// ---------------------------------------------------------------------------
// Modes:
//   (default)            report all dangling refs, exit 1 if any exist.
//   --gate               RATCHET mode for the deploy pipeline: fail ONLY on
//                        dangling IDs that are NOT in the baseline. Known debt
//                        (baseline) is printed as a warning but does not block.
//                        This is how the check goes live today without blocking
//                        every deploy on the 54 pre-existing dead buttons.
//   --update-baseline    write the CURRENT dangling set to the baseline file.
//                        Run this deliberately when you accept the known debt,
//                        or after fixing some so the baseline shrinks (ratchet
//                        only turns one way — new dangles can never sneak in).
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const gate = args.includes('--gate');
const updateBaseline = args.includes('--update-baseline');

// ---------------------------------------------------------------------------
// 1. Collect all REGISTERED calculator IDs (keys in the CALCULATORS map).
// ---------------------------------------------------------------------------
const calcSrc = readFileSync(CALC_FILE, 'utf8');
const mapStart = calcSrc.indexOf('const CALCULATORS: Record<string, CalculatorDefinition> = {');
if (mapStart === -1) {
  console.error('❌ Could not locate the CALCULATORS registry map. Did the declaration change?');
  process.exit(1);
}
// Bound the parse to JUST the CALCULATORS object literal by walking braces from
// its opening '{' to the matching close. Without this we'd scan the rest of the
// file and pick up unrelated `'key':` lines as false registrations.
const braceOpen = calcSrc.indexOf('{', mapStart);
let depth = 0;
let braceClose = -1;
for (let i = braceOpen; i < calcSrc.length; i++) {
  const ch = calcSrc[i];
  if (ch === '{') depth++;
  else if (ch === '}') { depth--; if (depth === 0) { braceClose = i; break; } }
}
if (braceClose === -1) {
  console.error('❌ Could not find the end of the CALCULATORS map. Brace matching failed.');
  process.exit(1);
}
const mapBody = calcSrc.slice(mapStart, braceClose + 1);

// Registry entries take several value shapes:
//   'id': SOME_CALCULATOR,   'id': SOME_CARD,   'id': SOME_GUIDE,   'id': SOME_GENERATOR,
//   'id': { ...inline object... },
// So we match any key that maps to an UPPER_SNAKE const OR an inline object literal.
const registered = new Set();
for (const m of mapBody.matchAll(/^\s*'([a-z0-9][a-z0-9-]*)'\s*:\s*(?:[A-Z][A-Z0-9_]*|\{)/gm)) {
  registered.add(m[1]);
}
if (registered.size === 0) {
  console.error('❌ Parsed 0 registered calculator IDs — parser is broken, aborting to avoid false positives.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Collect all REFERENCED calculator IDs from consults + toolbar.
//    Each ref: { id, source }  for actionable error output.
// ---------------------------------------------------------------------------
const refs = [];

function scanFile(path, label) {
  const src = readFileSync(path, 'utf8');
  // Channel 1: calculatorLinks: [{ id: '<id>', ... }]
  for (const m of src.matchAll(/calculatorLinks\s*:\s*\[([\s\S]*?)\]/g)) {
    for (const idm of m[1].matchAll(/id\s*:\s*'([a-z0-9-]+)'/g)) {
      refs.push({ id: idm[1], source: `${label} (calculatorLinks)` });
    }
  }
  // Channel 2: action: 'calculator', target: '<id>'
  for (const m of src.matchAll(/action\s*:\s*'calculator'\s*,\s*target\s*:\s*'([a-z0-9-]+)'/g)) {
    refs.push({ id: m[1], source: `${label} (toolbar calculator target)` });
  }
  // Channel 3: [label](#/calculator/<id>)
  for (const m of src.matchAll(/#\/calculator\/([a-z0-9-]+)/g)) {
    refs.push({ id: m[1], source: `${label} (in-body link)` });
  }
}

// Toolbar config file
scanFile(TOOLBAR_FILE, 'toolbar-configs.ts');
// Every tree file
for (const f of readdirSync(TREES_DIR)) {
  if (f.endsWith('.ts')) scanFile(join(TREES_DIR, f), `trees/${f}`);
}

// ---------------------------------------------------------------------------
// 3. Report dangling references (referenced but not registered).
// ---------------------------------------------------------------------------
const dangling = refs.filter(r => !registered.has(r.id));

// Group dangling by id for readability + de-dup sources.
const byId = new Map();
for (const d of dangling) {
  if (!byId.has(d.id)) byId.set(d.id, new Set());
  byId.get(d.id).add(d.source);
}
const danglingIds = [...byId.keys()].sort();

console.log(`🔍 Calculator reference lint`);
console.log(`   Registered calculators : ${registered.size}`);
console.log(`   Total references       : ${refs.length}`);
console.log(`   Unique referenced IDs  : ${new Set(refs.map(r => r.id)).size}`);
console.log(`   Dangling IDs           : ${danglingIds.length}`);
console.log('');

function printGroup(ids, prefix) {
  for (const id of ids) {
    console.error(`   ${prefix}'${id}'`);
    for (const s of byId.get(id)) console.error(`       ← ${s}`);
  }
}

// --- Mode: --update-baseline -----------------------------------------------
// Freeze the current dangling set as accepted debt. Ratchet baseline.
if (updateBaseline) {
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ generated: new Date().toISOString().slice(0, 10), dangling: danglingIds }, null, 2) + '\n',
  );
  console.log(`📌 Baseline written: ${danglingIds.length} known dangling ID(s) → scripts/lint-calculator-refs.baseline.json`);
  process.exit(0);
}

// --- Mode: --gate (deploy ratchet) -----------------------------------------
// Load baseline; block ONLY on NEW dangling IDs. Baseline debt = warning.
if (gate) {
  let baseline = new Set();
  if (existsSync(BASELINE_FILE)) {
    try {
      baseline = new Set(JSON.parse(readFileSync(BASELINE_FILE, 'utf8')).dangling || []);
    } catch {
      console.error('❌ Baseline file is corrupt. Regenerate with --update-baseline.');
      process.exit(1);
    }
  }
  const newlyBroken = danglingIds.filter(id => !baseline.has(id));
  const knownDebt = danglingIds.filter(id => baseline.has(id));
  // If any baseline entry got FIXED, tell the author to tighten the ratchet.
  const fixed = [...baseline].filter(id => !byId.has(id));

  if (knownDebt.length) {
    console.warn(`⚠  ${knownDebt.length} KNOWN dangling ID(s) (in baseline — not blocking): ${knownDebt.join(', ')}`);
    console.warn('');
  }
  if (fixed.length) {
    console.warn(`✨ ${fixed.length} baseline ID(s) now resolve — tighten the ratchet with:`);
    console.warn('   node scripts/lint-calculator-refs.mjs --update-baseline');
    console.warn(`   (fixed: ${fixed.join(', ')})`);
    console.warn('');
  }
  if (newlyBroken.length === 0) {
    console.log('✅ No NEW dangling calculator references. Deploy gate passes.');
    process.exit(0);
  }
  console.error(`❌ ${newlyBroken.length} NEW dangling calculator ID(s) introduced — these buttons hit the "not found" screen:\n`);
  printGroup(newlyBroken, '');
  console.error('');
  console.error('This deploy ADDS a dead calculator button. FIX before shipping:');
  console.error('  • add the calculator to the CALCULATORS registry in src/components/calculator.ts, OR');
  console.error('  • correct the referenced ID in the consult.');
  process.exit(1);
}

// --- Mode: default (full report) -------------------------------------------
if (danglingIds.length === 0) {
  console.log('✅ All calculator references resolve to a registered calculator.');
  process.exit(0);
}
console.error(`❌ ${danglingIds.length} dangling calculator ID(s) — these buttons hit the "not found" screen:\n`);
printGroup(danglingIds, '');
console.error('');
console.error('FIX: either add the missing calculator to the CALCULATORS registry in');
console.error('src/components/calculator.ts, or correct the referenced ID in the consult.');
process.exit(1);
