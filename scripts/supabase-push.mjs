#!/usr/bin/env node
// =====================================================================
// MedKitt — Supabase REST Push
// Reads compiled JS data and pushes directly to Supabase via REST API.
// No SQL editor, no copy-paste. Just run it.
//
// Usage:
//   node scripts/supabase-push.mjs <consult-id>              # New consult (full insert)
//   node scripts/supabase-push.mjs <consult-id> --update     # Update existing nodes
//   node scripts/supabase-push.mjs <consult-id> --drugs id1,id2
//   node scripts/supabase-push.mjs <consult-id> --info-pages id1,id2
//   node scripts/supabase-push.mjs <consult-id> --dry-run    # Preview without pushing
//
// Requires: SUPABASE_SERVICE_ROLE_KEY in .env
// =====================================================================

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const docsDir = resolve(projectRoot, 'docs');
const envPath = resolve(projectRoot, '.env');

// ---------------------------------------------------------------------------
// Load .env
// ---------------------------------------------------------------------------
function loadEnv() {
  if (!existsSync(envPath)) {
    console.error('ERROR: No .env file found. Need SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.+)$/);
    if (match) env[match[1]] = match[2].trim();
  }
  return env;
}

const env = loadEnv();
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY not found in .env');
  process.exit(1);
}

const BASE = 'https://kzzqloklnxlqbccxbxgr.supabase.co/rest/v1';
const HEADERS = {
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal',
};

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const consultId = args.find(a => !a.startsWith('--'));
const isUpdate = args.includes('--update');
const isDryRun = args.includes('--dry-run');

if (!consultId) {
  console.error('Usage: node scripts/supabase-push.mjs <consult-id> [--update] [--dry-run] [--drugs id1,id2] [--info-pages id1,id2]');
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
// Tree registry (same as generate-supabase-sql.mjs)
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
  'tca-toxidrome':        { prefix: 'TCA_TOXIDROME',         entryNodeId: 'tca-start',      categoryId: 'toxicology' },
  'acetaminophen':        { prefix: 'ACETAMINOPHEN_OD',      entryNodeId: 'apap-start',     categoryId: 'toxicology' },
  'salicylate':           { prefix: 'SALICYLATE',            entryNodeId: 'sal-start',      categoryId: 'toxicology' },
  'dka':                  { prefix: 'DKA',                   entryNodeId: 'dka-start',      categoryId: 'nephro-rheum-endo' },
  'sepsis':               { prefix: 'SEPSIS',                entryNodeId: 'sepsis-start',   categoryId: 'infectious-disease' },
  'chf-exacerbation':     { prefix: 'CHF_EXACERBATION',      entryNodeId: 'chf-start',      categoryId: 'cardiology' },
  'migraine':             { prefix: 'MIGRAINE',              entryNodeId: 'migraine-start', categoryId: 'neurology' },
  'snake-envenomation':   { prefix: 'SNAKE_ENVENOMATION',    entryNodeId: 'snake-start',    categoryId: 'emergency-medicine' },
  'aacg':                 { prefix: 'AACG',                  entryNodeId: 'aacg-start',     categoryId: 'ophthalmology' },
  'chemical-burn':        { prefix: 'CHEMICAL_BURN',         entryNodeId: 'chemburn-start', categoryId: 'ophthalmology' },
  'orbital-cellulitis':   { prefix: 'ORBITAL_CELLULITIS',    entryNodeId: 'orbital-start',  categoryId: 'ophthalmology' },
  'crao':                 { prefix: 'CRAO',                   entryNodeId: 'crao-start',     categoryId: 'ophthalmology' },
  'globe-rupture':        { prefix: 'GLOBE_RUPTURE',          entryNodeId: 'globe-start',    categoryId: 'ophthalmology' },
  'opioid-withdrawal':    { prefix: 'OPIOID_WITHDRAWAL',      entryNodeId: 'ow-start',       categoryId: 'toxicology' },
  'alcohol-withdrawal':   { prefix: 'ALCOHOL_WITHDRAWAL',     entryNodeId: 'aws-start',      categoryId: 'toxicology' },
  'anticoag-reversal':    { prefix: 'ANTICOAG_REVERSAL',      entryNodeId: 'acr-start',      categoryId: 'heme-onc' },
  'tuberculosis':         { prefix: 'TUBERCULOSIS',           entryNodeId: 'tb-start',       categoryId: 'infectious-disease' },
  'combative-patient':    { prefix: 'COMBATIVE_PATIENT',      entryNodeId: 'cp-start',       categoryId: 'emergency-medicine' },
  'hemophilia':           { prefix: 'HEMOPHILIA',             entryNodeId: 'hemo-start',     categoryId: 'heme-onc' },
  'epistaxis':            { prefix: 'EPISTAXIS',              entryNodeId: 'epi-start',      categoryId: 'emergency-medicine' },
  'urinary-retention':    { prefix: 'URINARY_RETENTION',      entryNodeId: 'aur-start',      categoryId: 'urology' },
  'caustic-ingestion':    { prefix: 'CAUSTIC_INGESTION',      entryNodeId: 'caustic-start',  categoryId: 'toxicology' },
  'diabetes-management':  { prefix: 'DIABETES_MANAGEMENT',    entryNodeId: 'dm-start',       categoryId: 'nephro-rheum-endo' },
  'massive-transfusion':  { prefix: 'MASSIVE_TRANSFUSION',    entryNodeId: 'mtp-start',      categoryId: 'trauma-surg' },
  'pelvic-fracture':      { prefix: 'PELVIC_FRACTURE',        entryNodeId: 'pelvic-start',   categoryId: 'trauma-surg' },
  'psychiatry-assessment': { prefix: 'PSYCHIATRY_ASSESSMENT', entryNodeId: 'mse-start',      categoryId: 'emergency-medicine' },
  'acute-pancreatitis':   { prefix: 'ACUTE_PANCREATITIS',     entryNodeId: 'ap-start',       categoryId: 'gastroenterology' },
  'serotonin-syndrome':   { prefix: 'SEROTONIN_SYNDROME',     entryNodeId: 'ss-start',       categoryId: 'toxicology' },
  'digoxin-toxicity':     { prefix: 'DIGOXIN_TOXICITY',       entryNodeId: 'dig-start',      categoryId: 'toxicology' },
  'beta-blocker-od':      { prefix: 'BETA_BLOCKER_OD',        entryNodeId: 'bb-start',       categoryId: 'toxicology' },
  'ccb-od':               { prefix: 'CCB_OD',                 entryNodeId: 'ccb-start',      categoryId: 'toxicology' },
  'iron-od':              { prefix: 'IRON_OD',                entryNodeId: 'iron-start',     categoryId: 'toxicology' },
  'co-toxicity':          { prefix: 'CO_TOXICITY',            entryNodeId: 'co-start',       categoryId: 'toxicology' },
  'guillain-barre':       { prefix: 'GUILLAIN_BARRE',         entryNodeId: 'gbs-start',      categoryId: 'neurology' },
  'myasthenia-gravis':    { prefix: 'MYASTHENIA_GRAVIS',      entryNodeId: 'mg-start',       categoryId: 'neurology' },
  'botulism':             { prefix: 'BOTULISM',               entryNodeId: 'bot-start',      categoryId: 'neurology' },
};

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
  'sepsis':           [{ categoryId: 'critical-care' }],
};

const reg = TREE_REGISTRY[consultId];
if (!reg) {
  console.error(`Unknown consult ID: "${consultId}". Known IDs:\n  ${Object.keys(TREE_REGISTRY).join(', ')}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// REST helpers
// ---------------------------------------------------------------------------
async function supaPost(table, data) {
  if (isDryRun) {
    console.log(`  [DRY RUN] POST ${table}: ${Array.isArray(data) ? data.length + ' rows' : '1 row'}`);
    return true;
  }
  const res = await fetch(`${BASE}/${table}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Prefer': 'return=minimal,resolution=merge-duplicates' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  ERROR POST ${table}: ${res.status} ${err}`);
    return false;
  }
  return true;
}

async function supaUpsert(table, data) {
  if (isDryRun) {
    console.log(`  [DRY RUN] UPSERT ${table}: ${Array.isArray(data) ? data.length + ' rows' : '1 row'}`);
    return true;
  }
  const res = await fetch(`${BASE}/${table}`, {
    method: 'POST',
    headers: { ...HEADERS, 'Prefer': 'return=minimal,resolution=merge-duplicates' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  ERROR UPSERT ${table}: ${res.status} ${err}`);
    return false;
  }
  return true;
}

async function supaDelete(table, filter) {
  if (isDryRun) {
    console.log(`  [DRY RUN] DELETE ${table} where ${filter}`);
    return true;
  }
  const res = await fetch(`${BASE}/${table}?${filter}`, {
    method: 'DELETE',
    headers: HEADERS,
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  ERROR DELETE ${table}: ${res.status} ${err}`);
    return false;
  }
  return true;
}

async function supaPatch(table, filter, data) {
  if (isDryRun) {
    console.log(`  [DRY RUN] PATCH ${table} where ${filter}`);
    return true;
  }
  const res = await fetch(`${BASE}/${table}?${filter}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`  ERROR PATCH ${table}: ${res.status} ${err}`);
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Load compiled data
// ---------------------------------------------------------------------------
console.log(`\n📦 Loading tree data for "${consultId}"...`);

const treeModule = await import(pathToFileURL(resolve(docsDir, 'data', 'trees', `${consultId}.js`)).href);
const nodes = treeModule[`${reg.prefix}_NODES`];
const moduleLabels = treeModule[`${reg.prefix}_MODULE_LABELS`];
const citations = treeModule[`${reg.prefix}_CITATIONS`];

if (!nodes || !moduleLabels || !citations) {
  console.error(`Could not find exports: ${reg.prefix}_NODES, ${reg.prefix}_MODULE_LABELS, ${reg.prefix}_CITATIONS`);
  process.exit(1);
}

console.log(`  ${nodes.length} nodes, ${moduleLabels.length} modules, ${citations.length} citations`);

// Load categories for display title/subtitle
const catModule = await import(pathToFileURL(resolve(docsDir, 'data', 'categories.js')).href);
const categories = catModule.DEFAULT_CATEGORIES || catModule.default?.DEFAULT_CATEGORIES || [];
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
// Push to Supabase
// ---------------------------------------------------------------------------
console.log(`\n🚀 Pushing "${consultId}" to Supabase...${isDryRun ? ' (DRY RUN)' : ''}`);

if (!isUpdate) {
  // ---- FULL INSERT (new consult) ----

  // 1. decision_trees metadata
  console.log('\n1️⃣  decision_trees...');
  await supaUpsert('decision_trees', {
    id: consultId,
    title: treeTitle,
    subtitle: treeSubtitle,
    version: treeVersion,
    node_count: treeNodeCount,
    entry_node_id: reg.entryNodeId,
    module_labels: moduleLabels,
  });

  // 2. category_trees
  console.log('2️⃣  category_trees...');
  const catRows = [
    { category_id: reg.categoryId, tree_id: consultId, display_title: null, display_subtitle: null, entry_node_id: null, sort_order: 0 },
  ];
  const crossListings = CROSS_LISTINGS[consultId] || [];
  crossListings.forEach((cl, idx) => {
    catRows.push({
      category_id: cl.categoryId,
      tree_id: consultId,
      display_title: cl.displayTitle || null,
      display_subtitle: cl.displaySubtitle || null,
      entry_node_id: cl.entryNodeId || null,
      sort_order: idx + 1,
    });
  });
  await supaUpsert('category_trees', catRows);

  // 3. tree_citations (delete + insert)
  console.log(`3️⃣  tree_citations (${citations.length})...`);
  await supaDelete('tree_citations', `tree_id=eq.${consultId}`);
  if (citations.length > 0) {
    const citRows = citations.map(c => ({
      tree_id: consultId,
      num: c.num,
      text: c.text,
    }));
    await supaPost('tree_citations', citRows);
  }

  // 4. decision_nodes (delete + insert in batches)
  console.log(`4️⃣  decision_nodes (${nodes.length})...`);
  await supaDelete('decision_nodes', `tree_id=eq.${consultId}`);

  // Convert nodes to Supabase format
  const nodeRows = nodes.map(n => ({
    id: n.id,
    tree_id: consultId,
    type: n.type,
    module: n.module !== undefined ? n.module : null,
    title: n.title || null,
    body: n.body || null,
    recommendation: n.recommendation || null,
    next: n.next || null,
    options: n.options || null,
    calculator_links: n.calculatorLinks || null,
    treatment: n.treatment || null,
    citation: n.citation || null,
    confidence: n.confidence || null,
    images: n.images || null,
  }));

  // Batch insert (Supabase has row limits)
  const BATCH_SIZE = 50;
  for (let i = 0; i < nodeRows.length; i += BATCH_SIZE) {
    const batch = nodeRows.slice(i, i + BATCH_SIZE);
    const ok = await supaPost('decision_nodes', batch);
    if (ok) {
      console.log(`    Inserted nodes ${i + 1}-${Math.min(i + BATCH_SIZE, nodeRows.length)}`);
    }
  }

} else {
  // ---- UPDATE MODE (existing consult, just update nodes) ----
  console.log('\n🔄 Update mode — patching existing nodes...');

  // Delete and re-insert all nodes (cleanest approach for updates)
  console.log(`  Replacing ${nodes.length} nodes...`);
  await supaDelete('decision_nodes', `tree_id=eq.${consultId}`);

  const nodeRows = nodes.map(n => ({
    id: n.id,
    tree_id: consultId,
    type: n.type,
    module: n.module !== undefined ? n.module : null,
    title: n.title || null,
    body: n.body || null,
    recommendation: n.recommendation || null,
    next: n.next || null,
    options: n.options || null,
    calculator_links: n.calculatorLinks || null,
    treatment: n.treatment || null,
    citation: n.citation || null,
    confidence: n.confidence || null,
    images: n.images || null,
  }));

  const BATCH_SIZE = 50;
  for (let i = 0; i < nodeRows.length; i += BATCH_SIZE) {
    const batch = nodeRows.slice(i, i + BATCH_SIZE);
    const ok = await supaPost('decision_nodes', batch);
    if (ok) {
      console.log(`    Inserted nodes ${i + 1}-${Math.min(i + BATCH_SIZE, nodeRows.length)}`);
    }
  }

  // Also update citations
  console.log(`  Replacing ${citations.length} citations...`);
  await supaDelete('tree_citations', `tree_id=eq.${consultId}`);
  if (citations.length > 0) {
    await supaPost('tree_citations', citations.map(c => ({
      tree_id: consultId, num: c.num, text: c.text,
    })));
  }

  // Update metadata
  await supaPatch('decision_trees', `id=eq.${consultId}`, {
    title: treeTitle,
    subtitle: treeSubtitle,
    version: treeVersion,
    node_count: treeNodeCount,
    module_labels: moduleLabels,
  });
}

// 5. Drugs (if specified)
if (drugIds.length > 0 || updateDrugIds.length > 0) {
  console.log(`\n💊 Drugs...`);
  const drugModule = await import(pathToFileURL(resolve(docsDir, 'data', 'drug-store.js')).href);
  const allDrugs = drugModule.ALL_DRUGS || drugModule.default?.ALL_DRUGS || [];

  for (const did of drugIds) {
    const drug = allDrugs.find(d => d.id === did);
    if (!drug) { console.error(`  Drug not found: ${did}`); continue; }
    await supaUpsert('drugs', drug);
    console.log(`  Inserted: ${did}`);
  }

  for (const did of updateDrugIds) {
    const drug = allDrugs.find(d => d.id === did);
    if (!drug) { console.error(`  Drug not found: ${did}`); continue; }
    await supaPatch('drugs', `id=eq.${did}`, drug);
    console.log(`  Updated: ${did}`);
  }
}

// 6. Info pages (if specified)
if (infoPageIds.length > 0) {
  console.log(`\n📄 Info pages...`);
  const infoModule = await import(pathToFileURL(resolve(docsDir, 'data', 'info-pages.js')).href);
  const allInfoPages = infoModule.INFO_PAGES || infoModule.default?.INFO_PAGES || {};

  for (const pid of infoPageIds) {
    const page = allInfoPages[pid];
    if (!page) { console.error(`  Info page not found: ${pid}`); continue; }
    await supaUpsert('info_pages', { id: pid, ...page });
    console.log(`  Inserted: ${pid}`);
  }
}

console.log(`\n✅ Done! "${consultId}" pushed to Supabase.${isDryRun ? ' (DRY RUN — nothing was actually pushed)' : ''}\n`);
