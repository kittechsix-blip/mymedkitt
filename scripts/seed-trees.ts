// MedKitt — Seed decision_nodes, tree_citations, and module_labels from hardcoded data
// Run: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... bun scripts/seed-trees.ts

// NOTE: neurosyphilis, pe-treatment, pneumothorax, echo-views use old ConsultTree format
// (nested TreeNode, not flat DecisionNode[]). Skipped here — seed separately after conversion.
import { PRIAPISM_NODES, PRIAPISM_CITATIONS, PRIAPISM_MODULE_LABELS } from '../src/data/trees/priapism.js';
import { AFIB_RVR_NODES, AFIB_RVR_CITATIONS, AFIB_RVR_MODULE_LABELS } from '../src/data/trees/afib-rvr.js';
import { CHEST_TUBE_NODES, CHEST_TUBE_CITATIONS, CHEST_TUBE_MODULE_LABELS } from '../src/data/trees/chest-tube.js';
import { CROUP_NODES, CROUP_CITATIONS, CROUP_MODULE_LABELS } from '../src/data/trees/croup.js';
import { PEP_NODES, PEP_CITATIONS, PEP_MODULE_LABELS } from '../src/data/trees/pep.js';
import { STROKE_NODES, STROKE_CITATIONS, STROKE_MODULE_LABELS } from '../src/data/trees/stroke.js';
import { NSTEMI_NODES, NSTEMI_CITATIONS, NSTEMI_MODULE_LABELS } from '../src/data/trees/nstemi.js';
import { POTASSIUM_NODES, POTASSIUM_CITATIONS, POTASSIUM_MODULE_LABELS } from '../src/data/trees/potassium.js';
import { UTI_PEDS_NODES, UTI_PEDS_CITATIONS, UTI_PEDS_MODULE_LABELS } from '../src/data/trees/uti-peds.js';
import { PEDS_FEVER_NODES, PEDS_FEVER_CITATIONS, PEDS_FEVER_MODULE_LABELS } from '../src/data/trees/peds-fever.js';
import { BRONCHIOLITIS_NODES, BRONCHIOLITIS_CITATIONS, BRONCHIOLITIS_MODULE_LABELS } from '../src/data/trees/bronchiolitis.js';
import { ECHO_EPSS_NODES, ECHO_EPSS_CITATIONS, ECHO_EPSS_MODULE_LABELS } from '../src/data/trees/echo-epss.js';
import { SHOULDER_DYSTOCIA_NODES, SHOULDER_DYSTOCIA_CITATIONS, SHOULDER_DYSTOCIA_MODULE_LABELS } from '../src/data/trees/shoulder-dystocia.js';
import { PRECIP_DELIVERY_NODES, PRECIP_DELIVERY_CITATIONS, PRECIP_DELIVERY_MODULE_LABELS } from '../src/data/trees/precip-delivery.js';
import { NEONATAL_RESUS_NODES, NEONATAL_RESUS_CITATIONS, NEONATAL_RESUS_MODULE_LABELS } from '../src/data/trees/neonatal-resus.js';
import { DISTAL_RADIUS_NODES, DISTAL_RADIUS_CITATIONS, DISTAL_RADIUS_MODULE_LABELS } from '../src/data/trees/distal-radius.js';
import { SODIUM_NODES, SODIUM_CITATIONS, SODIUM_MODULE_LABELS } from '../src/data/trees/sodium.js';
import { SPLINTING_NODES, SPLINTING_CITATIONS, SPLINTING_MODULE_LABELS } from '../src/data/trees/splinting.js';
// @ts-expect-error — pure JS helper, untyped on purpose (consumed by both .mjs scripts and this .ts file)
import { nodeRowFromDecisionNode } from './node-row.mjs';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars');
  process.exit(1);
}

const headers = {
  'apikey': SUPABASE_SERVICE_KEY,
  'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates',
};

async function post(table: string, rows: unknown[]) {
  // Batch in groups of 100 to avoid payload limits
  for (let i = 0; i < rows.length; i += 100) {
    const batch = rows.slice(i, i + 100);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(batch),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`${table} batch ${i}: ${res.status} ${text}`);
    }
  }
}

async function patch(table: string, id: string, data: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...headers, 'Prefer': 'return=minimal' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PATCH ${table} ${id}: ${res.status} ${text}`);
  }
}

// All trees with their data
const TREES: { id: string; nodes: any[]; citations: any[]; moduleLabels: string[] }[] = [
  { id: 'priapism', nodes: PRIAPISM_NODES, citations: PRIAPISM_CITATIONS, moduleLabels: PRIAPISM_MODULE_LABELS },
  { id: 'afib-rvr', nodes: AFIB_RVR_NODES, citations: AFIB_RVR_CITATIONS, moduleLabels: AFIB_RVR_MODULE_LABELS },
  { id: 'chest-tube', nodes: CHEST_TUBE_NODES, citations: CHEST_TUBE_CITATIONS, moduleLabels: CHEST_TUBE_MODULE_LABELS },
  { id: 'croup', nodes: CROUP_NODES, citations: CROUP_CITATIONS, moduleLabels: CROUP_MODULE_LABELS },
  { id: 'pep', nodes: PEP_NODES, citations: PEP_CITATIONS, moduleLabels: PEP_MODULE_LABELS },
  { id: 'stroke', nodes: STROKE_NODES, citations: STROKE_CITATIONS, moduleLabels: STROKE_MODULE_LABELS },
  { id: 'nstemi', nodes: NSTEMI_NODES, citations: NSTEMI_CITATIONS, moduleLabels: NSTEMI_MODULE_LABELS },
  { id: 'potassium', nodes: POTASSIUM_NODES, citations: POTASSIUM_CITATIONS, moduleLabels: POTASSIUM_MODULE_LABELS },
  { id: 'uti-peds', nodes: UTI_PEDS_NODES, citations: UTI_PEDS_CITATIONS, moduleLabels: UTI_PEDS_MODULE_LABELS },
  { id: 'peds-fever', nodes: PEDS_FEVER_NODES, citations: PEDS_FEVER_CITATIONS, moduleLabels: PEDS_FEVER_MODULE_LABELS },
  { id: 'bronchiolitis', nodes: BRONCHIOLITIS_NODES, citations: BRONCHIOLITIS_CITATIONS, moduleLabels: BRONCHIOLITIS_MODULE_LABELS },
  { id: 'echo-epss', nodes: ECHO_EPSS_NODES, citations: ECHO_EPSS_CITATIONS, moduleLabels: ECHO_EPSS_MODULE_LABELS },
  { id: 'shoulder-dystocia', nodes: SHOULDER_DYSTOCIA_NODES, citations: SHOULDER_DYSTOCIA_CITATIONS, moduleLabels: SHOULDER_DYSTOCIA_MODULE_LABELS },
  { id: 'precip-delivery', nodes: PRECIP_DELIVERY_NODES, citations: PRECIP_DELIVERY_CITATIONS, moduleLabels: PRECIP_DELIVERY_MODULE_LABELS },
  { id: 'neonatal-resus', nodes: NEONATAL_RESUS_NODES, citations: NEONATAL_RESUS_CITATIONS, moduleLabels: NEONATAL_RESUS_MODULE_LABELS },
  { id: 'distal-radius', nodes: DISTAL_RADIUS_NODES, citations: DISTAL_RADIUS_CITATIONS, moduleLabels: DISTAL_RADIUS_MODULE_LABELS },
  { id: 'sodium', nodes: SODIUM_NODES, citations: SODIUM_CITATIONS, moduleLabels: SODIUM_MODULE_LABELS },
  { id: 'splinting', nodes: SPLINTING_NODES, citations: SPLINTING_CITATIONS, moduleLabels: SPLINTING_MODULE_LABELS },
];

async function seed() {
  let totalNodes = 0;
  let totalCitations = 0;

  // 1. Update module_labels on decision_trees
  console.log('Updating module_labels on decision_trees...');
  for (const tree of TREES) {
    await patch('decision_trees', tree.id, { module_labels: tree.moduleLabels });
  }
  console.log(`  Updated ${TREES.length} trees with module labels.`);

  // 2. Seed all nodes
  const allNodes: unknown[] = [];
  for (const tree of TREES) {
    for (let i = 0; i < tree.nodes.length; i++) {
      allNodes.push(nodeRowFromDecisionNode(tree.nodes[i], tree.id, i));
    }
    totalNodes += tree.nodes.length;
  }
  console.log(`Seeding ${totalNodes} nodes across ${TREES.length} trees...`);
  await post('decision_nodes', allNodes);
  console.log('  Nodes done.');

  // 3. Seed all citations
  const allCitations: unknown[] = [];
  for (const tree of TREES) {
    for (const cit of tree.citations) {
      // Handle both formats: { num, text } and { id, title, source, ... }
      if ('text' in cit) {
        allCitations.push({ tree_id: tree.id, num: cit.num, text: cit.text });
      } else if ('title' in cit) {
        // Older format (neurosyphilis) — build text from fields
        const parts = [cit.title];
        if (cit.authors) parts.unshift(cit.authors);
        if (cit.source) parts.push(cit.source);
        if (cit.year) parts.push(String(cit.year));
        allCitations.push({ tree_id: tree.id, num: cit.id, text: parts.join('. ') + '.' });
      }
    }
    totalCitations += tree.citations.length;
  }
  console.log(`Seeding ${totalCitations} citations...`);
  await post('tree_citations', allCitations);
  console.log('  Citations done.');

  console.log(`\nAll tree data seeded: ${totalNodes} nodes, ${totalCitations} citations across ${TREES.length} trees.`);
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
