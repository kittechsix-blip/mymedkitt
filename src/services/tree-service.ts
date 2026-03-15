// MedKitt — Tree Data Service
// Three-tier fallback: Supabase → IndexedDB → hardcoded static data.
// Loads tree data on demand (per tree) instead of all 22 trees upfront.

import { supabaseFetch } from './supabase.js';
import { cacheGetFiltered, cachePutMany, setLastSync, getLastSync } from './cache-db.js';
import type { DecisionNode } from '../models/types.js';

export interface Citation {
  num: number;
  text: string;
}

export interface TreeConfig {
  nodes: DecisionNode[];
  entryNodeId: string;
  categoryId: string;
  moduleLabels: string[];
  citations: Citation[];
}

// In-memory cache keyed by tree ID
const treeCache = new Map<string, TreeConfig>();

const STALE_MS = 60 * 60 * 1000;

// Supabase row types
interface NodeRow {
  id: string;
  tree_id: string;
  type: string;
  module: number;
  title: string;
  body: string;
  citation: number[] | null;
  options: unknown[] | null;
  inputs: unknown[] | null;
  next: string | null;
  recommendation: string | null;
  treatment: unknown | null;
  confidence: string | null;
  images: unknown[] | null;
  calculator_links: unknown[] | null;
  sort_order: number;
}

interface CitationRow {
  tree_id: string;
  num: number;
  text: string;
}

interface TreeMetaRow {
  id: string;
  title: string;
  subtitle: string;
  version: string;
  node_count: number;
  entry_node_id: string;
  module_labels: string[];
}

function mapNodeRow(row: NodeRow): DecisionNode {
  const node: DecisionNode = {
    id: row.id,
    type: row.type as DecisionNode['type'],
    module: row.module,
    title: row.title,
    body: row.body,
  };
  if (row.citation && row.citation.length > 0) node.citation = row.citation;
  if (row.options && row.options.length > 0) node.options = row.options as DecisionNode['options'];
  if (row.inputs && row.inputs.length > 0) node.inputs = row.inputs as DecisionNode['inputs'];
  if (row.next) node.next = row.next;
  if (row.recommendation) node.recommendation = row.recommendation;
  if (row.treatment) node.treatment = row.treatment as DecisionNode['treatment'];
  if (row.confidence) node.confidence = row.confidence as DecisionNode['confidence'];
  if (row.images && row.images.length > 0) node.images = row.images as DecisionNode['images'];
  if (row.calculator_links && row.calculator_links.length > 0) node.calculatorLinks = row.calculator_links as DecisionNode['calculatorLinks'];
  return node;
}

/** Try loading a tree from IndexedDB cache */
async function loadFromCache(treeId: string): Promise<TreeConfig | null> {
  try {
    const nodes = await cacheGetFiltered<NodeRow>('decision_nodes', r => r.tree_id === treeId);
    if (nodes.length === 0) return null;

    const citations = await cacheGetFiltered<CitationRow>('tree_citations', r => r.tree_id === treeId);

    // We need tree metadata (module_labels, entry_node_id) — stored in category service's cache
    // For simplicity, extract from the cached category_trees or fall back
    const meta = await getTreeMeta(treeId);
    if (!meta) return null;

    return {
      nodes: nodes.sort((a, b) => a.sort_order - b.sort_order).map(mapNodeRow),
      entryNodeId: meta.entry_node_id,
      categoryId: '',  // Not critical — only used for reference panel routing
      moduleLabels: meta.module_labels,
      citations: citations.sort((a, b) => a.num - b.num).map(c => ({ num: c.num, text: c.text })),
    };
  } catch {
    return null;
  }
}

/** Get tree metadata from Supabase cache or fetch */
async function getTreeMeta(treeId: string): Promise<TreeMetaRow | null> {
  try {
    const result = await supabaseFetch<TreeMetaRow[]>(
      'decision_trees',
      `select=*&id=eq.${treeId}`
    );
    if (result.data && result.data.length > 0) return result.data[0];
  } catch {
    // offline
  }
  return null;
}

/** Fetch a tree from Supabase and cache it */
async function fetchFromSupabase(treeId: string): Promise<TreeConfig | null> {
  const [nodesResult, citationsResult, metaResult] = await Promise.all([
    supabaseFetch<NodeRow[]>('decision_nodes', `select=*&tree_id=eq.${treeId}&order=sort_order`),
    supabaseFetch<CitationRow[]>('tree_citations', `select=*&tree_id=eq.${treeId}&order=num`),
    supabaseFetch<TreeMetaRow[]>('decision_trees', `select=*&id=eq.${treeId}`),
  ]);

  if (!nodesResult.data || nodesResult.data.length === 0 || !metaResult.data || metaResult.data.length === 0) {
    return null;
  }

  const meta = metaResult.data[0];
  const config: TreeConfig = {
    nodes: nodesResult.data.map(mapNodeRow),
    entryNodeId: meta.entry_node_id,
    categoryId: '',
    moduleLabels: meta.module_labels,
    citations: (citationsResult.data ?? []).map(c => ({ num: c.num, text: c.text })),
  };

  // Cache for offline
  await cachePutMany('decision_nodes', nodesResult.data);
  await cachePutMany('tree_citations', citationsResult.data ?? []);
  await setLastSync(`tree:${treeId}`);

  return config;
}

/** Hardcoded fallback — dynamically import the tree file */
async function loadHardcodedFallback(treeId: string): Promise<TreeConfig | null> {
  const TREE_IMPORTS: Record<string, () => Promise<TreeConfig>> = {
    'pneumothorax': async () => {
      const m = await import('../data/trees/pneumothorax.js');
      return { nodes: m.PNEUMOTHORAX_NODES, entryNodeId: 'pneumothorax-start', categoryId: 'us-rads', moduleLabels: m.PNEUMOTHORAX_MODULE_LABELS, citations: m.PNEUMOTHORAX_CITATIONS };
    },
    'pe-treatment': async () => {
      const m = await import('../data/trees/pe-treatment.js');
      return { nodes: m.PE_TREATMENT_NODES, entryNodeId: 'pe-start', categoryId: 'critical-care', moduleLabels: m.PE_TREATMENT_MODULE_LABELS, citations: m.PE_TREATMENT_CITATIONS };
    },
    'priapism': async () => {
      const m = await import('../data/trees/priapism.js');
      return { nodes: m.PRIAPISM_NODES, entryNodeId: 'priapism-start', categoryId: 'procedures', moduleLabels: m.PRIAPISM_MODULE_LABELS, citations: m.PRIAPISM_CITATIONS };
    },
    'afib-rvr': async () => {
      const m = await import('../data/trees/afib-rvr.js');
      return { nodes: m.AFIB_RVR_NODES, entryNodeId: 'afib-start', categoryId: 'cardiology', moduleLabels: m.AFIB_RVR_MODULE_LABELS, citations: m.AFIB_RVR_CITATIONS };
    },
    'chest-tube': async () => {
      const m = await import('../data/trees/chest-tube.js');
      return { nodes: m.CHEST_TUBE_NODES, entryNodeId: 'ctube-start', categoryId: 'trauma-surg', moduleLabels: m.CHEST_TUBE_MODULE_LABELS, citations: m.CHEST_TUBE_CITATIONS };
    },
    'pep': async () => {
      const m = await import('../data/trees/pep.js');
      return { nodes: m.PEP_NODES, entryNodeId: 'pep-start', categoryId: 'infectious-disease', moduleLabels: m.PEP_MODULE_LABELS, citations: m.PEP_CITATIONS };
    },
    'stroke': async () => {
      const m = await import('../data/trees/stroke.js');
      return { nodes: m.STROKE_NODES, entryNodeId: 'stroke-start', categoryId: 'neurology', moduleLabels: m.STROKE_MODULE_LABELS, citations: m.STROKE_CITATIONS };
    },
    'nstemi': async () => {
      const m = await import('../data/trees/nstemi.js');
      return { nodes: m.NSTEMI_NODES, entryNodeId: 'nstemi-start', categoryId: 'cardiology', moduleLabels: m.NSTEMI_MODULE_LABELS, citations: m.NSTEMI_CITATIONS };
    },
    'stemi': async () => {
      const m = await import('../data/trees/stemi.js');
      return { nodes: m.STEMI_NODES, entryNodeId: 'stemi-start', categoryId: 'cardiology', moduleLabels: m.STEMI_MODULE_LABELS, citations: m.STEMI_CITATIONS };
    },
    'syncope': async () => {
      const m = await import('../data/trees/syncope.js');
      return { nodes: m.SYNCOPE_NODES, entryNodeId: 'sync-start', categoryId: 'cardiology', moduleLabels: m.SYNCOPE_MODULE_LABELS, citations: m.SYNCOPE_CITATIONS };
    },
    'potassium': async () => {
      const m = await import('../data/trees/potassium.js');
      return { nodes: m.POTASSIUM_NODES, entryNodeId: 'k-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.POTASSIUM_MODULE_LABELS, citations: m.POTASSIUM_CITATIONS };
    },
    'sodium': async () => {
      const m = await import('../data/trees/sodium.js');
      return { nodes: m.SODIUM_NODES, entryNodeId: 'na-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.SODIUM_MODULE_LABELS, citations: m.SODIUM_CITATIONS };
    },
    'acid-base': async () => {
      const m = await import('../data/trees/acid-base.js');
      return { nodes: m.ACID_BASE_NODES, entryNodeId: 'ab-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.ACID_BASE_MODULE_LABELS, citations: m.ACID_BASE_CITATIONS };
    },
    'croup': async () => {
      const m = await import('../data/trees/croup.js');
      return { nodes: m.CROUP_NODES, entryNodeId: 'croup-start', categoryId: 'pediatrics', moduleLabels: m.CROUP_MODULE_LABELS, citations: m.CROUP_CITATIONS };
    },
    'uti-peds': async () => {
      const m = await import('../data/trees/uti-peds.js');
      return { nodes: m.UTI_PEDS_NODES, entryNodeId: 'uti-start', categoryId: 'pediatrics', moduleLabels: m.UTI_PEDS_MODULE_LABELS, citations: m.UTI_PEDS_CITATIONS };
    },
    'peds-fever': async () => {
      const m = await import('../data/trees/peds-fever.js');
      return { nodes: m.PEDS_FEVER_NODES, entryNodeId: 'pf-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_FEVER_MODULE_LABELS, citations: m.PEDS_FEVER_CITATIONS };
    },
    'bronchiolitis': async () => {
      const m = await import('../data/trees/bronchiolitis.js');
      return { nodes: m.BRONCHIOLITIS_NODES, entryNodeId: 'bronch-start', categoryId: 'pediatrics', moduleLabels: m.BRONCHIOLITIS_MODULE_LABELS, citations: m.BRONCHIOLITIS_CITATIONS };
    },
    'echo-epss': async () => {
      const m = await import('../data/trees/echo-epss.js');
      return { nodes: m.ECHO_EPSS_NODES, entryNodeId: 'epss-start', categoryId: 'us-rads', moduleLabels: m.ECHO_EPSS_MODULE_LABELS, citations: m.ECHO_EPSS_CITATIONS };
    },
    'shoulder-dystocia': async () => {
      const m = await import('../data/trees/shoulder-dystocia.js');
      return { nodes: m.SHOULDER_DYSTOCIA_NODES, entryNodeId: 'sd-start', categoryId: 'ob-gyn', moduleLabels: m.SHOULDER_DYSTOCIA_MODULE_LABELS, citations: m.SHOULDER_DYSTOCIA_CITATIONS };
    },
    'precip-delivery': async () => {
      const m = await import('../data/trees/precip-delivery.js');
      return { nodes: m.PRECIP_DELIVERY_NODES, entryNodeId: 'precip-start', categoryId: 'ob-gyn', moduleLabels: m.PRECIP_DELIVERY_MODULE_LABELS, citations: m.PRECIP_DELIVERY_CITATIONS };
    },
    'neonatal-resus': async () => {
      const m = await import('../data/trees/neonatal-resus.js');
      return { nodes: m.NEONATAL_RESUS_NODES, entryNodeId: 'nrp-start', categoryId: 'pediatrics', moduleLabels: m.NEONATAL_RESUS_MODULE_LABELS, citations: m.NEONATAL_RESUS_CITATIONS };
    },
    'distal-radius': async () => {
      const m = await import('../data/trees/distal-radius.js');
      return { nodes: m.DISTAL_RADIUS_NODES, entryNodeId: 'dr-start', categoryId: 'orthopedics', moduleLabels: m.DISTAL_RADIUS_MODULE_LABELS, citations: m.DISTAL_RADIUS_CITATIONS };
    },
    'splinting': async () => {
      const m = await import('../data/trees/splinting.js');
      return { nodes: m.SPLINTING_NODES, entryNodeId: 'splint-start', categoryId: 'orthopedics', moduleLabels: m.SPLINTING_MODULE_LABELS, citations: m.SPLINTING_CITATIONS };
    },
    'neurosyphilis': async () => {
      const m = await import('../data/trees/neurosyphilis.js');
      return { nodes: m.NEUROSYPHILIS_NODES, entryNodeId: 'ns-start', categoryId: 'infectious-disease', moduleLabels: m.NEUROSYPHILIS_MODULE_LABELS, citations: m.NEUROSYPHILIS_CITATIONS };
    },
    'rabies': async () => {
      const m = await import('../data/trees/rabies.js');
      return { nodes: m.RABIES_NODES, entryNodeId: 'rabies-start', categoryId: 'infectious-disease', moduleLabels: m.RABIES_MODULE_LABELS, citations: m.RABIES_CITATIONS };
    },
    'burns': async () => {
      const m = await import('../data/trees/burns.js');
      return { nodes: m.BURNS_NODES, entryNodeId: 'burn-start', categoryId: 'trauma-surg', moduleLabels: m.BURNS_MODULE_LABELS, citations: m.BURNS_CITATIONS };
    },
    'psych-assessment': async () => {
      const m = await import('../data/trees/psych-assessment.js');
      return { nodes: m.PSYCH_ASSESSMENT_NODES, entryNodeId: 'psych-start', categoryId: 'emergency-medicine', moduleLabels: m.PSYCH_ASSESSMENT_MODULE_LABELS, citations: m.PSYCH_ASSESSMENT_CITATIONS };
    },
    'ich': async () => {
      const m = await import('../data/trees/ich.js');
      return { nodes: m.ICH_NODES, entryNodeId: 'ich-start', categoryId: 'neurology', moduleLabels: m.ICH_MODULE_LABELS, citations: m.ICH_CITATIONS };
    },
    'aub': async () => {
      const m = await import('../data/trees/aub.js');
      return { nodes: m.AUB_NODES, entryNodeId: 'aub-start', categoryId: 'ob-gyn', moduleLabels: m.AUB_MODULE_LABELS, citations: m.AUB_CITATIONS };
    },
    'status-epilepticus': async () => {
      const m = await import('../data/trees/status-epilepticus.js');
      return { nodes: m.STATUS_EPILEPTICUS_NODES, entryNodeId: 'se-start', categoryId: 'neurology', moduleLabels: m.STATUS_EPILEPTICUS_MODULE_LABELS, citations: m.STATUS_EPILEPTICUS_CITATIONS };
    },
    'first-trimester': async () => {
      const m = await import('../data/trees/first-trimester.js');
      return { nodes: m.FIRST_TRIMESTER_NODES, entryNodeId: 'ft-start', categoryId: 'ob-gyn', moduleLabels: m.FIRST_TRIMESTER_MODULE_LABELS, citations: m.FIRST_TRIMESTER_CITATIONS };
    },
    'diarrhea': async () => {
      const m = await import('../data/trees/diarrhea.js');
      return { nodes: m.DIARRHEA_NODES, entryNodeId: 'diarrhea-start', categoryId: 'gastroenterology', moduleLabels: m.DIARRHEA_MODULE_LABELS, citations: m.DIARRHEA_CITATIONS };
    },
    'hiv': async () => {
      const m = await import('../data/trees/hiv.js');
      return { nodes: m.HIV_NODES, entryNodeId: 'hiv-start', categoryId: 'infectious-disease', moduleLabels: m.HIV_MODULE_LABELS, citations: m.HIV_CITATIONS };
    },
    'meningitis': async () => {
      const m = await import('../data/trees/meningitis.js');
      return { nodes: m.MENINGITIS_NODES, entryNodeId: 'mening-start', categoryId: 'infectious-disease', moduleLabels: m.MENINGITIS_MODULE_LABELS, citations: m.MENINGITIS_CITATIONS };
    },
    'delirium': async () => {
      const m = await import('../data/trees/delirium.js');
      return { nodes: m.DELIRIUM_NODES, entryNodeId: 'delirium-start', categoryId: 'neurology', moduleLabels: m.DELIRIUM_MODULE_LABELS, citations: m.DELIRIUM_CITATIONS };
    },
  };

  const loader = TREE_IMPORTS[treeId];
  if (!loader) return null;
  return loader();
}

/**
 * Get a tree config by ID. Tries: memory → IndexedDB → Supabase → hardcoded.
 * Returns null if tree doesn't exist.
 */
export async function getTreeConfig(treeId: string): Promise<TreeConfig | null> {
  // 1. In-memory
  const cached = treeCache.get(treeId);
  if (cached) return cached;

  // 2. IndexedDB
  const fromCache = await loadFromCache(treeId);
  if (fromCache) {
    treeCache.set(treeId, fromCache);
    // Background refresh if stale
    refreshIfStale(treeId);
    return fromCache;
  }

  // 3. Supabase
  const fromSupabase = await fetchFromSupabase(treeId).catch(() => null);
  if (fromSupabase) {
    treeCache.set(treeId, fromSupabase);
    return fromSupabase;
  }

  // 4. Hardcoded fallback
  const fallback = await loadHardcodedFallback(treeId);
  if (fallback) {
    treeCache.set(treeId, fallback);
  }
  return fallback;
}

/** Background refresh for a specific tree */
function refreshIfStale(treeId: string): void {
  getLastSync(`tree:${treeId}`).then(lastSync => {
    const isStale = !lastSync || (Date.now() - lastSync) > STALE_MS;
    if (isStale) {
      fetchFromSupabase(treeId).then(config => {
        if (config) treeCache.set(treeId, config);
      }).catch(() => {});
    }
  }).catch(() => {});
}
