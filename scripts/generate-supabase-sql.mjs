#!/usr/bin/env node
// =====================================================================
// MedKitt — Supabase SQL Generator
// Reads compiled JS data files and generates INSERT/UPSERT SQL for a
// given consult. Output goes to supabase-{id}-insert.sql in project root.
//
// Usage: node scripts/generate-supabase-sql.mjs <consult-id> [--drugs id1,id2,...] [--update-drugs id1,id2,...] [--info-pages id1,id2,...]
//
// Examples:
//   node scripts/generate-supabase-sql.mjs burns
//   node scripts/generate-supabase-sql.mjs burns --drugs bacitracin,fentanyl --update-drugs calcium-gluconate,calcium-chloride
//   node scripts/generate-supabase-sql.mjs burns --info-pages burns-summary,burns-depth-guide
// =====================================================================

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const docsDir = resolve(projectRoot, 'docs');

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const consultId = args.find(a => !a.startsWith('--'));

if (!consultId) {
  console.error('Usage: node scripts/generate-supabase-sql.mjs <consult-id> [--drugs id1,id2,...] [--update-drugs id1,id2,...] [--info-pages id1,id2,...]');
  process.exit(1);
}

function getArgList(flag) {
  const idx = args.indexOf(flag);
  if (idx === -1 || idx + 1 >= args.length) return [];
  return args[idx + 1].split(',').map(s => s.trim()).filter(Boolean);
}

const drugIds = getArgList('--drugs');
const updateDrugIds = getArgList('--update-drugs');
const infoPageIds = getArgList('--info-pages');

// ---------------------------------------------------------------------------
// SQL helpers
// ---------------------------------------------------------------------------
function sqlEscape(str) {
  if (str === null || str === undefined) return 'NULL';
  return "'" + String(str).replace(/'/g, "''") + "'";
}

function sqlEscapeOrNull(str) {
  if (str === null || str === undefined) return 'NULL';
  return sqlEscape(str);
}

function jsonbVal(obj) {
  if (obj === null || obj === undefined) return "'[]'::jsonb";
  if (Array.isArray(obj) && obj.length === 0) return "'[]'::jsonb";
  const json = JSON.stringify(obj).replace(/'/g, "''");
  return "'" + json + "'::jsonb";
}

function jsonbValOrNull(obj) {
  if (obj === null || obj === undefined) return 'NULL';
  if (Array.isArray(obj) && obj.length === 0) return "'[]'::jsonb";
  const json = JSON.stringify(obj).replace(/'/g, "''");
  return "'" + json + "'::jsonb";
}

// ---------------------------------------------------------------------------
// Tree registration data (mirrors tree-service.ts TREE_IMPORTS)
// ---------------------------------------------------------------------------
const TREE_REGISTRY = {
  'pneumothorax':     { prefix: 'PNEUMOTHORAX',       entryNodeId: 'pneumothorax-start', categoryId: 'us-rads' },
  'pe-treatment':     { prefix: 'PE_TREATMENT',       entryNodeId: 'pe-start',           categoryId: 'critical-care' },
  'priapism':         { prefix: 'PRIAPISM',            entryNodeId: 'priapism-start',     categoryId: 'procedures' },
  'afib-rvr':         { prefix: 'AFIB_RVR',            entryNodeId: 'afib-start',         categoryId: 'cardiology' },
  'chest-tube':       { prefix: 'CHEST_TUBE',          entryNodeId: 'ctube-start',        categoryId: 'trauma-surg' },
  'pep':              { prefix: 'PEP',                 entryNodeId: 'pep-start',          categoryId: 'infectious-disease' },
  'stroke':           { prefix: 'STROKE',              entryNodeId: 'stroke-start',       categoryId: 'neurology' },
  'nstemi':           { prefix: 'NSTEMI',              entryNodeId: 'nstemi-start',       categoryId: 'cardiology' },
  'potassium':        { prefix: 'POTASSIUM',           entryNodeId: 'k-start',            categoryId: 'nephro-rheum-endo' },
  'sodium':           { prefix: 'SODIUM',              entryNodeId: 'na-start',           categoryId: 'nephro-rheum-endo' },
  'croup':            { prefix: 'CROUP',               entryNodeId: 'croup-start',        categoryId: 'pediatrics' },
  'uti-peds':         { prefix: 'UTI_PEDS',            entryNodeId: 'uti-start',          categoryId: 'pediatrics' },
  'peds-fever':       { prefix: 'PEDS_FEVER',          entryNodeId: 'pf-start',           categoryId: 'pediatrics' },
  'bronchiolitis':    { prefix: 'BRONCHIOLITIS',       entryNodeId: 'bronch-start',       categoryId: 'pediatrics' },
  'echo-epss':        { prefix: 'ECHO_EPSS',           entryNodeId: 'epss-start',         categoryId: 'us-rads' },
  'shoulder-dystocia':{ prefix: 'SHOULDER_DYSTOCIA',   entryNodeId: 'sd-start',           categoryId: 'ob-gyn' },
  'precip-delivery':  { prefix: 'PRECIP_DELIVERY',     entryNodeId: 'precip-start',       categoryId: 'ob-gyn' },
  'neonatal-resus':   { prefix: 'NEONATAL_RESUS',      entryNodeId: 'nrp-start',          categoryId: 'pediatrics' },
  'distal-radius':    { prefix: 'DISTAL_RADIUS',       entryNodeId: 'dr-start',           categoryId: 'orthopedics' },
  'splinting':        { prefix: 'SPLINTING',           entryNodeId: 'splint-start',       categoryId: 'orthopedics' },
  'neurosyphilis':    { prefix: 'NEUROSYPHILIS',       entryNodeId: 'ns-start',           categoryId: 'infectious-disease' },
  'syphilis':         { prefix: 'SYPHILIS',            entryNodeId: 'syph-start',         categoryId: 'infectious-disease' },
  'rabies':           { prefix: 'RABIES',              entryNodeId: 'rabies-start',       categoryId: 'infectious-disease' },
  'burns':            { prefix: 'BURNS',               entryNodeId: 'burn-start',         categoryId: 'trauma-surg' },
  'ich':              { prefix: 'ICH',                 entryNodeId: 'ich-start',          categoryId: 'neurology' },
  'aub':              { prefix: 'AUB',                 entryNodeId: 'aub-start',          categoryId: 'ob-gyn' },
  'status-epilepticus': { prefix: 'STATUS_EPILEPTICUS', entryNodeId: 'se-start',           categoryId: 'neurology' },
  'first-trimester':  { prefix: 'FIRST_TRIMESTER',    entryNodeId: 'ft-start',           categoryId: 'ob-gyn' },
  'diarrhea':         { prefix: 'DIARRHEA',            entryNodeId: 'diarrhea-start',     categoryId: 'gastroenterology' },
  'hiv':              { prefix: 'HIV',                 entryNodeId: 'hiv-start',          categoryId: 'infectious-disease' },
  'meningitis':       { prefix: 'MENINGITIS',          entryNodeId: 'mening-start',       categoryId: 'infectious-disease' },
  'sah':              { prefix: 'SAH',                 entryNodeId: 'sah-start',          categoryId: 'neurology' },
  'syncope':          { prefix: 'SYNCOPE',             entryNodeId: 'sync-start',         categoryId: 'cardiology' },
  'stemi':            { prefix: 'STEMI',               entryNodeId: 'stemi-start',        categoryId: 'cardiology' },
  'delirium':         { prefix: 'DELIRIUM',            entryNodeId: 'delirium-start',     categoryId: 'neurology' },
  'acid-base':        { prefix: 'ACID_BASE',           entryNodeId: 'ab-start',           categoryId: 'nephro-rheum-endo' },
  'adrenal-insufficiency': { prefix: 'ADRENAL_INSUFFICIENCY', entryNodeId: 'ai-start',      categoryId: 'nephro-rheum-endo' },
  'thyroid':              { prefix: 'THYROID',               entryNodeId: 'thyroid-start',  categoryId: 'nephro-rheum-endo' },
  'anaphylaxis':          { prefix: 'ANAPHYLAXIS',           entryNodeId: 'anaph-start',    categoryId: 'emergency-medicine' },
  'angioedema':           { prefix: 'ANGIOEDEMA',            entryNodeId: 'angio-start',    categoryId: 'emergency-medicine' },
  'sickle-cell':          { prefix: 'SICKLE_CELL',           entryNodeId: 'scd-start',      categoryId: 'heme-onc' },
};

// Cross-listing: which consults appear in multiple categories
// Map of treeId → array of { categoryId, displayTitle?, displaySubtitle?, entryNodeId? }
const CROSS_LISTINGS = {
  'pe-treatment':     [{ categoryId: 'emergency-medicine' }],
  'pep':              [{ categoryId: 'emergency-medicine' }],
  'stroke':           [{ categoryId: 'emergency-medicine' }],
  'nstemi':           [{ categoryId: 'emergency-medicine' }],
  'potassium':        [{ categoryId: 'emergency-medicine' }],
  'sodium':           [{ categoryId: 'emergency-medicine' }],
  'uti-peds':         [{ categoryId: 'emergency-medicine' }],
  'bronchiolitis':    [{ categoryId: 'emergency-medicine' }],
  'peds-fever':       [{ categoryId: 'emergency-medicine' }],
  'neonatal-resus':   [{ categoryId: 'emergency-medicine' }],
  'chest-tube':       [{ categoryId: 'procedures', displayTitle: 'Tube Thoracostomy', displaySubtitle: 'Preparation → Insertion → Management', entryNodeId: 'ctube-anatomy' }],
  'priapism':         [{ categoryId: 'urology' }],
  'afib-rvr':         [{ categoryId: 'procedures', displayTitle: 'Synchronized Cardioversion', displaySubtitle: 'A-Fib RVR: Stability → Cardioversion Protocol' }],
  'diarrhea':         [{ categoryId: 'emergency-medicine' }],
  'hiv':              [{ categoryId: 'emergency-medicine' }],
  'sah':              [{ categoryId: 'emergency-medicine' }],
  'delirium':         [{ categoryId: 'emergency-medicine' }],
  'sickle-cell':      [{ categoryId: 'pediatrics' }],
};

const reg = TREE_REGISTRY[consultId];
if (!reg) {
  console.error(`Unknown consult ID: "${consultId}". Known IDs:\n  ${Object.keys(TREE_REGISTRY).join(', ')}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Dynamic imports of compiled JS data
// ---------------------------------------------------------------------------
console.log(`Loading tree data for "${consultId}"...`);

const treeModule = await import(pathToFileURL(resolve(docsDir, 'data', 'trees', `${consultId}.js`)).href);
const nodes = treeModule[`${reg.prefix}_NODES`];
const moduleLabels = treeModule[`${reg.prefix}_MODULE_LABELS`];
const citations = treeModule[`${reg.prefix}_CITATIONS`];

if (!nodes || !moduleLabels || !citations) {
  console.error(`Could not find expected exports: ${reg.prefix}_NODES, ${reg.prefix}_MODULE_LABELS, ${reg.prefix}_CITATIONS`);
  process.exit(1);
}

console.log(`  ${nodes.length} nodes, ${moduleLabels.length} modules, ${citations.length} citations`);

// Load drugs and info pages
let allDrugs = [];
let allInfoPages = {};

if (drugIds.length > 0 || updateDrugIds.length > 0) {
  console.log('Loading drug store...');
  const drugModule = await import(pathToFileURL(resolve(docsDir, 'data', 'drug-store.js')).href);
  const drugList = drugModule.ALL_DRUGS || drugModule.default?.ALL_DRUGS;
  if (drugList) {
    for (const d of drugList) {
      allDrugs.push(d);
    }
  }
  console.log(`  ${allDrugs.length} total drugs loaded`);
}

if (infoPageIds.length > 0) {
  console.log('Loading info pages...');
  const infoModule = await import(pathToFileURL(resolve(docsDir, 'data', 'info-pages.js')).href);
  allInfoPages = infoModule.INFO_PAGES || infoModule.default?.INFO_PAGES || {};
  console.log(`  ${Object.keys(allInfoPages).length} total info pages loaded`);
}

// ---------------------------------------------------------------------------
// Find the category listing to get display title/subtitle
// ---------------------------------------------------------------------------
// Read categories from the compiled JS
const catModule = await import(pathToFileURL(resolve(docsDir, 'data', 'categories.js')).href);
const categories = catModule.DEFAULT_CATEGORIES || catModule.default?.DEFAULT_CATEGORIES || [];

// Find the tree's listing in its primary category
function findTreeInCategory(catId, treeId) {
  const cat = categories.find(c => c.id === catId);
  if (!cat) return null;
  return cat.decisionTrees?.find(t => t.id === treeId) || null;
}

const primaryListing = findTreeInCategory(reg.categoryId, consultId);
const treeTitle = primaryListing?.title || consultId;
const treeSubtitle = primaryListing?.subtitle || '';
const treeVersion = primaryListing?.version || '1.0';
const treeNodeCount = primaryListing?.nodeCount || nodes.length;

// ---------------------------------------------------------------------------
// Build SQL output
// ---------------------------------------------------------------------------
const lines = [];
const now = new Date().toISOString().slice(0, 10);

lines.push(`-- =====================================================================`);
lines.push(`-- MedKitt — ${treeTitle} Consult: Supabase INSERT Statements`);
lines.push(`-- Generated: ${now}`);
lines.push(`-- Paste this into Supabase SQL Editor and run.`);
lines.push(`-- =====================================================================`);
lines.push('');
lines.push('BEGIN;');
lines.push('');

// ---- 1. decision_trees ----
lines.push(`-- 1. decision_trees (metadata)`);
lines.push(`INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)`);
lines.push(`VALUES (`);
lines.push(`  ${sqlEscape(consultId)},`);
lines.push(`  ${sqlEscape(treeTitle)},`);
lines.push(`  ${sqlEscape(treeSubtitle)},`);
lines.push(`  ${sqlEscape(treeVersion)},`);
lines.push(`  ${treeNodeCount},`);
lines.push(`  ${sqlEscape(reg.entryNodeId)},`);
lines.push(`  ${jsonbVal(moduleLabels)}`);
lines.push(`)`);
lines.push(`;`);
lines.push('');

// ---- 2. category_trees ----
lines.push(`-- 2. category_trees`);
// Primary category
lines.push(`INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)`);
lines.push(`VALUES (${sqlEscape(reg.categoryId)}, ${sqlEscape(consultId)}, NULL, NULL, NULL, 0)`);
lines.push(`ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;`);

// Cross-listings
const crossListings = CROSS_LISTINGS[consultId] || [];
crossListings.forEach((cl, idx) => {
  const clListing = findTreeInCategory(cl.categoryId, consultId);
  lines.push(`INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)`);
  lines.push(`VALUES (${sqlEscape(cl.categoryId)}, ${sqlEscape(consultId)}, ${sqlEscapeOrNull(cl.displayTitle || null)}, ${sqlEscapeOrNull(cl.displaySubtitle || null)}, ${sqlEscapeOrNull(cl.entryNodeId || null)}, ${idx + 1})`);
  lines.push(`ON CONFLICT (category_id, tree_id) DO UPDATE SET`);
  lines.push(`  display_title = EXCLUDED.display_title,`);
  lines.push(`  display_subtitle = EXCLUDED.display_subtitle,`);
  lines.push(`  entry_node_id = EXCLUDED.entry_node_id,`);
  lines.push(`  sort_order = EXCLUDED.sort_order;`);
});
lines.push('');

// ---- 3. tree_citations ----
lines.push(`-- 3. tree_citations (${citations.length} citations)`);
if (citations.length > 0) {
  lines.push(`DELETE FROM tree_citations WHERE tree_id = ${sqlEscape(consultId)};`);
  lines.push(`INSERT INTO tree_citations (tree_id, num, text) VALUES`);
  citations.forEach((c, i) => {
    const comma = i < citations.length - 1 ? ',' : ';';
    lines.push(`(${sqlEscape(consultId)}, ${c.num}, ${sqlEscape(c.text)})${comma}`);
  });
}
lines.push('');

// ---- 4. decision_nodes ----
lines.push(`DELETE FROM decision_nodes WHERE tree_id = ${sqlEscape(consultId)};`);
lines.push('');
lines.push(`-- 4. decision_nodes (${nodes.length} nodes)`);

// Group by module for readability
const modules = new Map();
for (const node of nodes) {
  const m = node.module || 0;
  if (!modules.has(m)) modules.set(m, []);
  modules.get(m).push(node);
}

let sortOrder = 0;
for (const [moduleNum, moduleNodes] of [...modules.entries()].sort((a, b) => a[0] - b[0])) {
  const moduleLabel = moduleLabels[moduleNum - 1] || `Module ${moduleNum}`;
  lines.push('');
  lines.push(`-- MODULE ${moduleNum}: ${moduleLabel.toUpperCase()}`);

  for (const node of moduleNodes) {
    lines.push(`INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES`);
    lines.push(`(${sqlEscape(node.id)}, ${sqlEscape(consultId)}, ${sqlEscape(node.type)}, ${node.module || 0},`);
    lines.push(` ${sqlEscape(node.title)},`);
    lines.push(` ${sqlEscape(node.body)},`);
    lines.push(` ${jsonbVal(node.citation || [])}, ${jsonbVal(node.options || [])}, ${jsonbVal(node.inputs || [])}, ${sqlEscapeOrNull(node.next || null)}, ${sqlEscapeOrNull(node.recommendation || null)}, ${jsonbValOrNull(node.treatment || null)}, ${sqlEscapeOrNull(node.confidence || null)}, ${jsonbVal(node.images || [])}, ${jsonbVal(node.calculatorLinks || [])}, ${sortOrder})`);
    lines.push(`;`);
    lines.push('');
    sortOrder++;
  }
}

// ---- 5. drugs (NEW) ----
if (drugIds.length > 0) {
  lines.push('');
  lines.push(`-- 5. drugs (${drugIds.length} new drugs)`);

  let drugSortOrder = 0;
  for (const drugId of drugIds) {
    const drug = allDrugs.find(d => d.id === drugId);
    if (!drug) {
      lines.push(`-- WARNING: Drug "${drugId}" not found in drug store!`);
      continue;
    }

    lines.push(`INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES`);
    lines.push(`(${sqlEscape(drug.id)}, ${sqlEscape(drug.name)}, ${sqlEscape(drug.genericName)}, ${sqlEscape(drug.drugClass)}, ${sqlEscape(drug.route)},`);
    lines.push(` ${jsonbVal(drug.indications || [])},`);
    lines.push(` ${jsonbVal(drug.dosing || [])},`);
    lines.push(` ${jsonbVal(drug.contraindications || [])},`);
    lines.push(` ${jsonbVal(drug.cautions || [])},`);
    lines.push(` ${sqlEscapeOrNull(drug.monitoring || null)},`);
    lines.push(` ${sqlEscapeOrNull(drug.notes || null)},`);
    lines.push(` ${jsonbValOrNull(drug.image || null)},`);
    lines.push(` ${jsonbVal(drug.citations || [])},`);
    lines.push(` ${drugSortOrder})`);
    lines.push(`;`);
    lines.push('');
    drugSortOrder++;
  }
}

// ---- 5b. drugs (UPDATE existing) ----
if (updateDrugIds.length > 0) {
  lines.push('');
  lines.push(`-- 5b. drugs — UPDATE existing entries (${updateDrugIds.length} drugs)`);

  for (const drugId of updateDrugIds) {
    const drug = allDrugs.find(d => d.id === drugId);
    if (!drug) {
      lines.push(`-- WARNING: Drug "${drugId}" not found in drug store!`);
      continue;
    }

    lines.push(`-- Updating ${drug.name} with full current data (includes new burn dosing entries)`);
    lines.push(`UPDATE drugs SET`);
    lines.push(`  indications = ${jsonbVal(drug.indications || [])},`);
    lines.push(`  dosing = ${jsonbVal(drug.dosing || [])},`);
    lines.push(`  contraindications = ${jsonbVal(drug.contraindications || [])},`);
    lines.push(`  cautions = ${jsonbVal(drug.cautions || [])},`);
    lines.push(`  monitoring = ${sqlEscapeOrNull(drug.monitoring || null)},`);
    lines.push(`  notes = ${sqlEscapeOrNull(drug.notes || null)},`);
    lines.push(`  citations = ${jsonbVal(drug.citations || [])}`);
    lines.push(`WHERE id = ${sqlEscape(drugId)};`);
    lines.push('');
  }
}

// ---- 6. info_pages ----
if (infoPageIds.length > 0) {
  lines.push('');
  lines.push(`-- 6. info_pages (${infoPageIds.length} pages)`);

  let infoSortOrder = 0;
  for (const pageId of infoPageIds) {
    const page = allInfoPages[pageId];
    if (!page) {
      lines.push(`-- WARNING: Info page "${pageId}" not found!`);
      continue;
    }

    lines.push(`INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES`);
    lines.push(`(${sqlEscape(page.id)}, ${sqlEscape(page.title)}, ${sqlEscapeOrNull(page.subtitle || null)},`);
    lines.push(` ${jsonbVal(page.sections || [])},`);
    lines.push(` ${jsonbVal(page.citations || [])},`);
    lines.push(` ${page.shareable ? 'true' : 'false'},`);
    lines.push(` ${infoSortOrder})`);
    lines.push(`;`);
    lines.push('');
    infoSortOrder++;
  }
}

lines.push('COMMIT;');
lines.push('');

// ---------------------------------------------------------------------------
// Write output
// ---------------------------------------------------------------------------
const outputFile = resolve(projectRoot, `supabase-${consultId}-insert.sql`);
writeFileSync(outputFile, lines.join('\n'), 'utf-8');

console.log('');
console.log(`SQL written to: ${outputFile}`);
console.log(`  decision_trees:  1 row`);
console.log(`  category_trees:  ${1 + crossListings.length} row(s)`);
console.log(`  tree_citations:  ${citations.length} rows`);
console.log(`  decision_nodes:  ${nodes.length} rows`);
if (drugIds.length > 0) console.log(`  drugs (new):     ${drugIds.length} rows`);
if (updateDrugIds.length > 0) console.log(`  drugs (update):  ${updateDrugIds.length} rows`);
if (infoPageIds.length > 0) console.log(`  info_pages:      ${infoPageIds.length} rows`);
