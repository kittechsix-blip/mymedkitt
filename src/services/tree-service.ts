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
    'difficult-airway-bougie': async () => {
      const m = await import('../data/trees/difficult-airway-bougie.js');
      return { nodes: m.DIFFICULT_AIRWAY_BOUGIE_NODES, entryNodeId: 'dab-start', categoryId: 'anesthesia-airway', moduleLabels: m.DIFFICULT_AIRWAY_BOUGIE_MODULE_LABELS, citations: m.DIFFICULT_AIRWAY_BOUGIE_CITATIONS };
    },
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
    'chs': async () => {
      const m = await import('../data/trees/chs.js');
      return { nodes: m.CHS_NODES, entryNodeId: 'chs-start', categoryId: 'gastroenterology', moduleLabels: m.CHS_MODULE_LABELS, citations: m.CHS_CITATIONS };
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
    'adrenal-insufficiency': async () => {
      const m = await import('../data/trees/adrenal-insufficiency.js');
      return { nodes: m.ADRENAL_INSUFFICIENCY_NODES, entryNodeId: 'ai-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.ADRENAL_INSUFFICIENCY_MODULE_LABELS, citations: m.ADRENAL_INSUFFICIENCY_CITATIONS };
    },
    'thyroid': async () => {
      const m = await import('../data/trees/thyroid.js');
      return { nodes: m.THYROID_NODES, entryNodeId: 'thyroid-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.THYROID_MODULE_LABELS, citations: m.THYROID_CITATIONS };
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
    'echo-views': async () => {
      const m = await import('../data/trees/echo-views.js');
      return { nodes: m.ECHO_VIEWS_NODES, entryNodeId: 'echo-views-start', categoryId: 'us-rads', moduleLabels: m.ECHO_VIEWS_MODULE_LABELS, citations: m.ECHO_VIEWS_CITATIONS };
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
    'syphilis': async () => {
      const m = await import('../data/trees/syphilis.js');
      return { nodes: m.SYPHILIS_NODES, entryNodeId: 'syph-start', categoryId: 'infectious-disease', moduleLabels: m.SYPHILIS_MODULE_LABELS, citations: m.SYPHILIS_CITATIONS };
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
    'sah': async () => {
      const m = await import('../data/trees/sah.js');
      return { nodes: m.SAH_NODES, entryNodeId: 'sah-start', categoryId: 'neurology', moduleLabels: m.SAH_MODULE_LABELS, citations: m.SAH_CITATIONS };
    },
    'aub': async () => {
      const m = await import('../data/trees/aub.js');
      return { nodes: m.AUB_NODES, entryNodeId: 'aub-start', categoryId: 'ob-gyn', moduleLabels: m.AUB_MODULE_LABELS, citations: m.AUB_CITATIONS };
    },
    'status-epilepticus': async () => {
      const m = await import('../data/trees/status-epilepticus.js');
      return { nodes: m.STATUS_EPILEPTICUS_NODES, entryNodeId: 'se-start', categoryId: 'neurology', moduleLabels: m.STATUS_EPILEPTICUS_MODULE_LABELS, citations: m.STATUS_EPILEPTICUS_CITATIONS };
    },
    'opioid-withdrawal': async () => {
      const m = await import('../data/trees/opioid-withdrawal.js');
      return { nodes: m.OPIOID_WITHDRAWAL_NODES, entryNodeId: 'ow-start', categoryId: 'emergency-medicine', moduleLabels: m.OPIOID_WITHDRAWAL_MODULE_LABELS, citations: m.OPIOID_WITHDRAWAL_CITATIONS };
    },
    'alcohol-withdrawal': async () => {
      const m = await import('../data/trees/alcohol-withdrawal.js');
      return { nodes: m.ALCOHOL_WITHDRAWAL_NODES, entryNodeId: 'aw-start', categoryId: 'emergency-medicine', moduleLabels: m.ALCOHOL_WITHDRAWAL_MODULE_LABELS, citations: m.ALCOHOL_WITHDRAWAL_CITATIONS };
    },
    'first-trimester': async () => {
      const m = await import('../data/trees/first-trimester.js');
      return { nodes: m.FIRST_TRIMESTER_NODES, entryNodeId: 'ft-start', categoryId: 'ob-gyn', moduleLabels: m.FIRST_TRIMESTER_MODULE_LABELS, citations: m.FIRST_TRIMESTER_CITATIONS };
    },
    'acute-pancreatitis': async () => {
      const m = await import('../data/trees/acute-pancreatitis.js');
      return { nodes: m.ACUTE_PANCREATITIS_NODES, entryNodeId: 'ap-start', categoryId: 'gastroenterology', moduleLabels: m.ACUTE_PANCREATITIS_MODULE_LABELS, citations: m.ACUTE_PANCREATITIS_CITATIONS };
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
    'anaphylaxis': async () => {
      const m = await import('../data/trees/anaphylaxis.js');
      return { nodes: m.ANAPHYLAXIS_NODES, entryNodeId: 'anaph-start', categoryId: 'emergency-medicine', moduleLabels: m.ANAPHYLAXIS_MODULE_LABELS, citations: m.ANAPHYLAXIS_CITATIONS };
    },
    'angioedema': async () => {
      const m = await import('../data/trees/angioedema.js');
      return { nodes: m.ANGIOEDEMA_NODES, entryNodeId: 'angio-start', categoryId: 'emergency-medicine', moduleLabels: m.ANGIOEDEMA_MODULE_LABELS, citations: m.ANGIOEDEMA_CITATIONS };
    },
    'sickle-cell': async () => {
      const m = await import('../data/trees/sickle-cell.js');
      return { nodes: m.SICKLE_CELL_NODES, entryNodeId: 'scd-start', categoryId: 'heme-onc', moduleLabels: m.SICKLE_CELL_MODULE_LABELS, citations: m.SICKLE_CELL_CITATIONS };
    },
    'hemophilia': async () => {
      const m = await import('../data/trees/hemophilia.js');
      return { nodes: m.HEMOPHILIA_NODES, entryNodeId: 'hemo-start', categoryId: 'heme-onc', moduleLabels: m.HEMOPHILIA_MODULE_LABELS, citations: m.HEMOPHILIA_CITATIONS };
    },
    'anticoag-reversal': async () => {
      const m = await import('../data/trees/anticoag-reversal.js');
      return { nodes: m.ANTICOAG_REVERSAL_NODES, entryNodeId: 'acr-start', categoryId: 'heme-onc', moduleLabels: m.ANTICOAG_REVERSAL_MODULE_LABELS, citations: m.ANTICOAG_REVERSAL_CITATIONS };
    },
    'tca-toxidrome': async () => {
      const m = await import('../data/trees/tca-toxidrome.js');
      return { nodes: m.TCA_TOXIDROME_NODES, entryNodeId: 'tca-start', categoryId: 'toxicology', moduleLabels: m.TCA_TOXIDROME_MODULE_LABELS, citations: m.TCA_TOXIDROME_CITATIONS };
    },
    'salicylate': async () => {
      const m = await import('../data/trees/salicylate.js');
      return { nodes: m.SALICYLATE_NODES, entryNodeId: 'sal-start', categoryId: 'toxicology', moduleLabels: m.SALICYLATE_MODULE_LABELS, citations: m.SALICYLATE_CITATIONS };
    },
    'acetaminophen': async () => {
      const m = await import('../data/trees/acetaminophen.js');
      return { nodes: m.ACETAMINOPHEN_OD_NODES, entryNodeId: 'apap-start', categoryId: 'toxicology', moduleLabels: m.ACETAMINOPHEN_OD_MODULE_LABELS, citations: m.ACETAMINOPHEN_OD_CITATIONS };
    },
    'dka': async () => {
      const m = await import('../data/trees/dka.js');
      return { nodes: m.DKA_NODES, entryNodeId: 'dka-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.DKA_MODULE_LABELS, citations: m.DKA_CITATIONS };
    },
    'diabetes-management': async () => {
      const m = await import('../data/trees/diabetes-management.js');
      return { nodes: m.DIABETES_MANAGEMENT_NODES, entryNodeId: 'dm-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.DIABETES_MANAGEMENT_MODULE_LABELS, citations: m.DIABETES_MANAGEMENT_CITATIONS };
    },
    'sepsis': async () => {
      const m = await import('../data/trees/sepsis.js');
      return { nodes: m.SEPSIS_NODES, entryNodeId: 'sepsis-start', categoryId: 'infectious-disease', moduleLabels: m.SEPSIS_MODULE_LABELS, citations: m.SEPSIS_CITATIONS };
    },
    'tuberculosis': async () => {
      const m = await import('../data/trees/tuberculosis.js');
      return { nodes: m.TUBERCULOSIS_NODES, entryNodeId: 'tb-start', categoryId: 'infectious-disease', moduleLabels: m.TUBERCULOSIS_MODULE_LABELS, citations: m.TUBERCULOSIS_CITATIONS };
    },
    'combative-patient': async () => {
      const m = await import('../data/trees/combative-patient.js');
      return { nodes: m.COMBATIVE_PATIENT_NODES, entryNodeId: 'comb-start', categoryId: 'emergency-medicine', moduleLabels: m.COMBATIVE_PATIENT_MODULE_LABELS, citations: m.COMBATIVE_PATIENT_CITATIONS };
    },
    'chf-exacerbation': async () => {
      const m = await import('../data/trees/chf-exacerbation.js');
      return { nodes: m.CHF_EXACERBATION_NODES, entryNodeId: 'chf-start', categoryId: 'cardiology', moduleLabels: m.CHF_EXACERBATION_MODULE_LABELS, citations: m.CHF_EXACERBATION_CITATIONS };
    },
    'migraine': async () => {
      const m = await import('../data/trees/migraine.js');
      return { nodes: m.MIGRAINE_NODES, entryNodeId: 'migraine-start', categoryId: 'neurology', moduleLabels: m.MIGRAINE_MODULE_LABELS, citations: m.MIGRAINE_CITATIONS };
    },
    'snake-envenomation': async () => {
      const m = await import('../data/trees/snake-envenomation.js');
      return { nodes: m.SNAKE_ENVENOMATION_NODES, entryNodeId: 'snake-start', categoryId: 'emergency-medicine', moduleLabels: m.SNAKE_ENVENOMATION_MODULE_LABELS, citations: m.SNAKE_ENVENOMATION_CITATIONS };
    },
    'aacg': async () => {
      const m = await import('../data/trees/aacg.js');
      return { nodes: m.AACG_NODES, entryNodeId: 'aacg-start', categoryId: 'ophthalmology', moduleLabels: m.AACG_MODULE_LABELS, citations: m.AACG_CITATIONS };
    },
    'chemical-burn': async () => {
      const m = await import('../data/trees/chemical-burn.js');
      return { nodes: m.CHEMICAL_BURN_NODES, entryNodeId: 'chemburn-start', categoryId: 'ophthalmology', moduleLabels: m.CHEMICAL_BURN_MODULE_LABELS, citations: m.CHEMICAL_BURN_CITATIONS };
    },
    'orbital-cellulitis': async () => {
      const m = await import('../data/trees/orbital-cellulitis.js');
      return { nodes: m.ORBITAL_CELLULITIS_NODES, entryNodeId: 'orbital-start', categoryId: 'ophthalmology', moduleLabels: m.ORBITAL_CELLULITIS_MODULE_LABELS, citations: m.ORBITAL_CELLULITIS_CITATIONS };
    },
    'crao': async () => {
      const m = await import('../data/trees/crao.js');
      return { nodes: m.CRAO_NODES, entryNodeId: 'crao-start', categoryId: 'ophthalmology', moduleLabels: m.CRAO_MODULE_LABELS, citations: m.CRAO_CITATIONS };
    },
    'globe-rupture': async () => {
      const m = await import('../data/trees/globe-rupture.js');
      return { nodes: m.GLOBE_RUPTURE_NODES, entryNodeId: 'globe-start', categoryId: 'ophthalmology', moduleLabels: m.GLOBE_RUPTURE_MODULE_LABELS, citations: m.GLOBE_RUPTURE_CITATIONS };
    },
    'urinary-retention': async () => {
      const m = await import('../data/trees/urinary-retention.js');
      return { nodes: m.URINARY_RETENTION_NODES, entryNodeId: 'aur-start', categoryId: 'urology', moduleLabels: m.URINARY_RETENTION_MODULE_LABELS, citations: m.URINARY_RETENTION_CITATIONS };
    },
    'caustic-ingestion': async () => {
      const m = await import('../data/trees/caustic-ingestion.js');
      return { nodes: m.CAUSTIC_INGESTION_NODES, entryNodeId: 'caustic-start', categoryId: 'toxicology', moduleLabels: m.CAUSTIC_INGESTION_MODULE_LABELS, citations: m.CAUSTIC_INGESTION_CITATIONS };
    },
    'epistaxis': async () => {
      const m = await import('../data/trees/epistaxis.js');
      return { nodes: m.EPISTAXIS_NODES, entryNodeId: 'epi-start', categoryId: 'emergency-medicine', moduleLabels: m.EPISTAXIS_MODULE_LABELS, citations: m.EPISTAXIS_CITATIONS };
    },
    'psychiatry-assessment': async () => {
      const m = await import('../data/trees/psychiatry-assessment.js');
      return { nodes: m.PSYCHIATRY_ASSESSMENT_NODES, entryNodeId: 'mse-start', categoryId: 'emergency-medicine', moduleLabels: m.PSYCHIATRY_ASSESSMENT_MODULE_LABELS, citations: m.PSYCHIATRY_ASSESSMENT_CITATIONS };
    },
    'massive-transfusion': async () => {
      const m = await import('../data/trees/massive-transfusion.js');
      return { nodes: m.MASSIVE_TRANSFUSION_NODES, entryNodeId: 'mtp-start', categoryId: 'trauma-surg', moduleLabels: m.MASSIVE_TRANSFUSION_MODULE_LABELS, citations: m.MASSIVE_TRANSFUSION_CITATIONS };
    },
    'pelvic-fracture': async () => {
      const m = await import('../data/trees/pelvic-fracture.js');
      return { nodes: m.PELVIC_FRACTURE_NODES, entryNodeId: 'pelvic-start', categoryId: 'trauma-surg', moduleLabels: m.PELVIC_FRACTURE_MODULE_LABELS, citations: m.PELVIC_FRACTURE_CITATIONS };
    },
    'serotonin-syndrome': async () => {
      const m = await import('../data/trees/serotonin-syndrome.js');
      return { nodes: m.SEROTONIN_SYNDROME_NODES, entryNodeId: 'ss-start', categoryId: 'toxicology', moduleLabels: m.SEROTONIN_SYNDROME_MODULE_LABELS, citations: m.SEROTONIN_SYNDROME_CITATIONS };
    },
    'digoxin-toxicity': async () => {
      const m = await import('../data/trees/digoxin-toxicity.js');
      return { nodes: m.DIGOXIN_TOXICITY_NODES, entryNodeId: 'dig-start', categoryId: 'toxicology', moduleLabels: m.DIGOXIN_TOXICITY_MODULE_LABELS, citations: m.DIGOXIN_TOXICITY_CITATIONS };
    },
    'beta-blocker-od': async () => {
      const m = await import('../data/trees/beta-blocker-od.js');
      return { nodes: m.BETA_BLOCKER_OD_NODES, entryNodeId: 'bb-start', categoryId: 'toxicology', moduleLabels: m.BETA_BLOCKER_OD_MODULE_LABELS, citations: m.BETA_BLOCKER_OD_CITATIONS };
    },
    'ccb-od': async () => {
      const m = await import('../data/trees/ccb-od.js');
      return { nodes: m.CCB_OD_NODES, entryNodeId: 'ccb-start', categoryId: 'toxicology', moduleLabels: m.CCB_OD_MODULE_LABELS, citations: m.CCB_OD_CITATIONS };
    },
    'iron-od': async () => {
      const m = await import('../data/trees/iron-od.js');
      return { nodes: m.IRON_OD_NODES, entryNodeId: 'iron-start', categoryId: 'toxicology', moduleLabels: m.IRON_OD_MODULE_LABELS, citations: m.IRON_OD_CITATIONS };
    },
    'co-toxicity': async () => {
      const m = await import('../data/trees/co-toxicity.js');
      return { nodes: m.CO_TOXICITY_NODES, entryNodeId: 'co-start', categoryId: 'toxicology', moduleLabels: m.CO_TOXICITY_MODULE_LABELS, citations: m.CO_TOXICITY_CITATIONS };
    },
    'guillain-barre': async () => {
      const m = await import('../data/trees/guillain-barre.js');
      return { nodes: m.GUILLAIN_BARRE_NODES, entryNodeId: 'gbs-start', categoryId: 'neurology', moduleLabels: m.GUILLAIN_BARRE_MODULE_LABELS, citations: m.GUILLAIN_BARRE_CITATIONS };
    },
    'myasthenia-gravis': async () => {
      const m = await import('../data/trees/myasthenia-gravis.js');
      return { nodes: m.MYASTHENIA_GRAVIS_NODES, entryNodeId: 'mg-start', categoryId: 'neurology', moduleLabels: m.MYASTHENIA_GRAVIS_MODULE_LABELS, citations: m.MYASTHENIA_GRAVIS_CITATIONS };
    },
    'botulism': async () => {
      const m = await import('../data/trees/botulism.js');
      return { nodes: m.BOTULISM_NODES, entryNodeId: 'bot-start', categoryId: 'neurology', moduleLabels: m.BOTULISM_MODULE_LABELS, citations: m.BOTULISM_CITATIONS };
    },
    'ecmo': async () => {
      const m = await import('../data/trees/ecmo.js');
      return { nodes: m.ECMO_NODES, entryNodeId: 'ecmo-start', categoryId: 'critical-care', moduleLabels: m.ECMO_MODULE_LABELS, citations: m.ECMO_CITATIONS };
    },
    'push-dose-pressors': async () => {
      const m = await import('../data/trees/push-dose-pressors.js');
      return { nodes: m.PUSH_DOSE_PRESSORS_NODES, entryNodeId: 'pdp-start', categoryId: 'pharmacist', moduleLabels: m.PUSH_DOSE_PRESSORS_MODULE_LABELS, citations: m.PUSH_DOSE_PRESSORS_CITATIONS };
    },
    'aortic-aneurysm': async () => {
      const m = await import('../data/trees/aortic-aneurysm.js');
      return { nodes: m.AORTIC_ANEURYSM_NODES, entryNodeId: 'aortic-start', categoryId: 'cardiology', moduleLabels: m.AORTIC_ANEURYSM_MODULE_LABELS, citations: m.AORTIC_ANEURYSM_CITATIONS };
    },
    'measles': async () => {
      const m = await import('../data/trees/measles.js');
      return { nodes: m.MEASLES_NODES, entryNodeId: 'measles-start', categoryId: 'infectious-disease', moduleLabels: m.MEASLES_MODULE_LABELS, citations: m.MEASLES_CITATIONS };
    },
    'trach-emergency': async () => {
      const m = await import('../data/trees/trach-emergency.js');
      return { nodes: m.TRACH_EMERGENCY_NODES, entryNodeId: 'trach-start', categoryId: 'emergency-medicine', moduleLabels: m.TRACH_EMERGENCY_MODULE_LABELS, citations: m.TRACH_EMERGENCY_CITATIONS };
    },
    'methemoglobinemia': async () => {
      const m = await import('../data/trees/methemoglobinemia.js');
      return { nodes: m.METHEMOGLOBINEMIA_NODES, entryNodeId: 'methb-start', categoryId: 'toxicology', moduleLabels: m.METHEMOGLOBINEMIA_MODULE_LABELS, citations: m.METHEMOGLOBINEMIA_CITATIONS };
    },
    'extensor-tendon': async () => {
      const m = await import('../data/trees/extensor-tendon.js');
      return { nodes: m.EXTENSOR_TENDON_NODES, entryNodeId: 'ext-start', categoryId: 'procedures', moduleLabels: m.EXTENSOR_TENDON_MODULE_LABELS, citations: m.EXTENSOR_TENDON_CITATIONS };
    },
    'deep-neck-infection': async () => {
      const m = await import('../data/trees/deep-neck-infection.js');
      return { nodes: m.DEEP_NECK_INFECTION_NODES, entryNodeId: 'dni-start', categoryId: 'infectious-disease', moduleLabels: m.DEEP_NECK_INFECTION_MODULE_LABELS, citations: m.DEEP_NECK_INFECTION_CITATIONS };
    },
    'vp-shunt': async () => {
      const m = await import('../data/trees/vp-shunt.js');
      return { nodes: m.VP_SHUNT_NODES, entryNodeId: 'vps-start', categoryId: 'neurology', moduleLabels: m.VP_SHUNT_MODULE_LABELS, citations: m.VP_SHUNT_CITATIONS };
    },
    'peds-osteomyelitis': async () => {
      const m = await import('../data/trees/peds-osteomyelitis.js');
      return { nodes: m.PEDS_OSTEOMYELITIS_NODES, entryNodeId: 'osteo-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_OSTEOMYELITIS_MODULE_LABELS, citations: m.PEDS_OSTEOMYELITIS_CITATIONS };
    },
    'copd-exacerbation': async () => {
      const m = await import('../data/trees/copd-exacerbation.js');
      return { nodes: m.COPD_EXACERBATION_NODES, entryNodeId: 'copd-start', categoryId: 'emergency-medicine', moduleLabels: m.COPD_EXACERBATION_MODULE_LABELS, citations: m.COPD_EXACERBATION_CITATIONS };
    },
    'septic-arthritis': async () => {
      const m = await import('../data/trees/septic-arthritis.js');
      return { nodes: m.SEPTIC_ARTHRITIS_NODES, entryNodeId: 'sa-start', categoryId: 'orthopedics', moduleLabels: m.SEPTIC_ARTHRITIS_MODULE_LABELS, citations: m.SEPTIC_ARTHRITIS_CITATIONS };
    },
    'hfnc': async () => {
      const m = await import('../data/trees/hfnc.js');
      return { nodes: m.HFNC_NODES, entryNodeId: 'hfnc-start', categoryId: 'critical-care', moduleLabels: m.HFNC_MODULE_LABELS, citations: m.HFNC_CITATIONS };
    },
    'oxygen-delivery': async () => {
      const m = await import('../data/trees/oxygen-delivery.js');
      return { nodes: m.OXYGEN_DELIVERY_NODES, entryNodeId: 'o2-start', categoryId: 'critical-care', moduleLabels: m.OXYGEN_DELIVERY_MODULE_LABELS, citations: m.OXYGEN_DELIVERY_CITATIONS };
    },
    'peds-stec-hus': async () => {
      const m = await import('../data/trees/peds-stec-hus.js');
      return { nodes: m.PEDS_STEC_HUS_NODES, entryNodeId: 'stec-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_STEC_HUS_MODULE_LABELS, citations: m.PEDS_STEC_HUS_CITATIONS };
    },
    'nail-bed-injuries': async () => {
      const m = await import('../data/trees/nail-bed-injuries.js');
      return { nodes: m.NAIL_BED_INJURIES_NODES, entryNodeId: 'nail-start', categoryId: 'procedures', moduleLabels: m.NAIL_BED_INJURIES_MODULE_LABELS, citations: m.NAIL_BED_INJURIES_CITATIONS };
    },
    'eclampsia': async () => {
      const m = await import('../data/trees/eclampsia.js');
      return { nodes: m.ECLAMPSIA_NODES, entryNodeId: 'eclampsia-start', categoryId: 'ob-gyn', moduleLabels: m.ECLAMPSIA_MODULE_LABELS, citations: m.ECLAMPSIA_CITATIONS };
    },
    'aortic-dissection': async () => {
      const m = await import('../data/trees/aortic-dissection.js');
      return { nodes: m.AORTIC_DISSECTION_NODES, entryNodeId: 'dissect-start', categoryId: 'cardiology', moduleLabels: m.AORTIC_DISSECTION_MODULE_LABELS, citations: m.AORTIC_DISSECTION_CITATIONS };
    },
    'intralipid': async () => {
      const m = await import('../data/trees/intralipid.js');
      return { nodes: m.INTRALIPID_NODES, entryNodeId: 'ile-start', categoryId: 'pharmacist', moduleLabels: m.INTRALIPID_MODULE_LABELS, citations: m.INTRALIPID_CITATIONS };
    },
    'rhabdomyolysis': async () => {
      const m = await import('../data/trees/rhabdomyolysis.js');
      return { nodes: m.RHABDOMYOLYSIS_NODES, entryNodeId: 'rhabdo-start', categoryId: 'nephro-rheum-endo', moduleLabels: m.RHABDOMYOLYSIS_MODULE_LABELS, citations: m.RHABDOMYOLYSIS_CITATIONS };
    },
    'viral-myositis': async () => {
      const m = await import('../data/trees/viral-myositis.js');
      return { nodes: m.VIRAL_MYOSITIS_NODES, entryNodeId: 'vm-start', categoryId: 'pediatrics', moduleLabels: m.VIRAL_MYOSITIS_MODULE_LABELS, citations: m.VIRAL_MYOSITIS_CITATIONS };
    },
    'ed-methadone': async () => {
      const m = await import('../data/trees/ed-methadone.js');
      return { nodes: m.ED_METHADONE_NODES, entryNodeId: 'meth-start', categoryId: 'emergency-medicine', moduleLabels: m.ED_METHADONE_MODULE_LABELS, citations: m.ED_METHADONE_CITATIONS };
    },
    'cvst': async () => {
      const m = await import('../data/trees/cvst.js');
      return { nodes: m.CVST_NODES, entryNodeId: 'cvst-start', categoryId: 'emergency-medicine', moduleLabels: m.CVST_MODULE_LABELS, citations: m.CVST_CITATIONS };
    },
    'shoulder-dislocation': async () => {
      const m = await import('../data/trees/shoulder-dislocation.js');
      return { nodes: m.SHOULDER_DISLOCATION_NODES, entryNodeId: 'shoulder-start', categoryId: 'orthopedics', moduleLabels: m.SHOULDER_DISLOCATION_MODULE_LABELS, citations: m.SHOULDER_DISLOCATION_CITATIONS };
    },
    'peds-submersion': async () => {
      const m = await import('../data/trees/peds-submersion.js');
      return { nodes: m.PEDS_SUBMERSION_NODES, entryNodeId: 'submersion-start', categoryId: 'pediatrics', moduleLabels: m.PEDS_SUBMERSION_MODULE_LABELS, citations: m.PEDS_SUBMERSION_CITATIONS };
    },
    'brugada-syndrome': async () => {
      const m = await import('../data/trees/brugada-syndrome.js');
      return { nodes: m.BRUGADA_SYNDROME_NODES, entryNodeId: 'brugada-start', categoryId: 'cardiology', moduleLabels: m.BRUGADA_SYNDROME_MODULE_LABELS, citations: m.BRUGADA_SYNDROME_CITATIONS };
    },
    'hd-emergencies': async () => {
      const m = await import('../data/trees/hd-emergencies.js');
      return { nodes: m.HD_EMERGENCIES_NODES, entryNodeId: 'hd-start', categoryId: 'critical-care', moduleLabels: m.HD_EMERGENCIES_MODULE_LABELS, citations: m.HD_EMERGENCIES_CITATIONS };
    },
    'marine-envenomation': async () => {
      const m = await import('../data/trees/marine-envenomation.js');
      return { nodes: m.MARINE_ENVENOMATION_NODES, entryNodeId: 'marine-start', categoryId: 'toxicology', moduleLabels: m.MARINE_ENVENOMATION_MODULE_LABELS, citations: m.MARINE_ENVENOMATION_CITATIONS };
    },
    'button-battery': async () => {
      const m = await import('../data/trees/button-battery.js');
      return { nodes: m.BUTTON_BATTERY_NODES, entryNodeId: 'battery-start', categoryId: 'pediatrics', moduleLabels: m.BUTTON_BATTERY_MODULE_LABELS, citations: m.BUTTON_BATTERY_CITATIONS };
    },
    'nat-screening': async () => {
      const m = await import('../data/trees/nat-screening.js');
      return { nodes: m.NAT_SCREENING_NODES, entryNodeId: 'nat-start', categoryId: 'pediatrics', moduleLabels: m.NAT_SCREENING_MODULE_LABELS, citations: m.NAT_SCREENING_CITATIONS };
    },
    'massive-hemoptysis': async () => {
      const m = await import('../data/trees/massive-hemoptysis.js');
      return { nodes: m.MASSIVE_HEMOPTYSIS_NODES, entryNodeId: 'hemo-start', categoryId: 'critical-care', moduleLabels: m.MASSIVE_HEMOPTYSIS_MODULE_LABELS, citations: m.MASSIVE_HEMOPTYSIS_CITATIONS };
    },
    'xylazine-toxicity': async () => {
      const m = await import('../data/trees/xylazine-toxicity.js');
      return { nodes: m.XYLAZINE_TOXICITY_NODES, entryNodeId: 'xyl-start', categoryId: 'toxicology', moduleLabels: m.XYLAZINE_TOXICITY_MODULE_LABELS, citations: m.XYLAZINE_TOXICITY_CITATIONS };
    },
    'laryngeal-trauma': async () => {
      const m = await import('../data/trees/laryngeal-trauma.js');
      return { nodes: m.LARYNGEAL_TRAUMA_NODES, entryNodeId: 'larynx-start', categoryId: 'trauma-surg', moduleLabels: m.LARYNGEAL_TRAUMA_MODULE_LABELS, citations: m.LARYNGEAL_TRAUMA_CITATIONS };
    },
    'refractory-vfvt': async () => {
      const m = await import('../data/trees/refractory-vfvt.js');
      return { nodes: m.REFRACTORY_VFVT_NODES, entryNodeId: 'rvf-start', categoryId: 'cardiology', moduleLabels: m.REFRACTORY_VFVT_MODULE_LABELS, citations: m.REFRACTORY_VFVT_CITATIONS };
    },
    'vad': async () => {
      const m = await import('../data/trees/vad.js');
      return { nodes: m.VAD_NODES, entryNodeId: 'vad-start', categoryId: 'cardiology', moduleLabels: m.VAD_MODULE_LABELS, citations: m.VAD_CITATIONS };
    },
    'torsades-de-pointes': async () => {
      const m = await import('../data/trees/torsades-de-pointes.js');
      return { nodes: m.TORSADES_DE_POINTES_NODES, entryNodeId: 'tdp-start', categoryId: 'cardiology', moduleLabels: m.TORSADES_DE_POINTES_MODULE_LABELS, citations: m.TORSADES_DE_POINTES_CITATIONS };
    },
    'cardiogenic-shock': async () => {
      const m = await import('../data/trees/cardiogenic-shock.js');
      return { nodes: m.CARDIOGENIC_SHOCK_NODES, entryNodeId: 'cs-start', categoryId: 'critical-care', moduleLabels: m.CARDIOGENIC_SHOCK_MODULE_LABELS, citations: m.CARDIOGENIC_SHOCK_CITATIONS };
    },
    'pe-pregnancy': async () => {
      const m = await import('../data/trees/pe-pregnancy.js');
      return { nodes: m.PE_PREGNANCY_NODES, entryNodeId: 'pep-start', categoryId: 'ob-gyn', moduleLabels: m.PE_PREGNANCY_MODULE_LABELS, citations: m.PE_PREGNANCY_CITATIONS };
    },
    'cervical-artery-dissection': async () => {
      const m = await import('../data/trees/cervical-artery-dissection.js');
      return { nodes: m.CERVICAL_ARTERY_DISSECTION_NODES, entryNodeId: 'cad-start', categoryId: 'neurology', moduleLabels: m.CERVICAL_ARTERY_DISSECTION_MODULE_LABELS, citations: m.CERVICAL_ARTERY_DISSECTION_CITATIONS };
    },
    'code-status': async () => {
      const m = await import('../data/trees/code-status.js');
      return { nodes: m.CODE_STATUS_NODES, entryNodeId: 'code-start', categoryId: 'emergency-medicine', moduleLabels: m.CODE_STATUS_MODULE_LABELS, citations: m.CODE_STATUS_CITATIONS };
    },
    'human-trafficking': async () => {
      const m = await import('../data/trees/human-trafficking.js');
      return { nodes: m.HUMAN_TRAFFICKING_NODES, entryNodeId: 'ht-start', categoryId: 'emergency-medicine', moduleLabels: m.HUMAN_TRAFFICKING_MODULE_LABELS, citations: m.HUMAN_TRAFFICKING_CITATIONS };
    },
    'dental-avulsion': async () => {
      const m = await import('../data/trees/dental-avulsion.js');
      return { nodes: m.DENTAL_AVULSION_NODES, entryNodeId: 'avulsion-start', categoryId: 'emergency-medicine', moduleLabels: m.DENTAL_AVULSION_MODULE_LABELS, citations: m.DENTAL_AVULSION_CITATIONS };
    },
    'heat-stroke': async () => {
      const m = await import('../data/trees/heat-stroke.js');
      return { nodes: m.HEAT_STROKE_NODES, entryNodeId: 'hs-start', categoryId: 'emergency-medicine', moduleLabels: m.HEAT_STROKE_MODULE_LABELS, citations: m.HEAT_STROKE_CITATIONS };
    },
    'hypothermia': async () => {
      const m = await import('../data/trees/hypothermia.js');
      return { nodes: m.HYPOTHERMIA_NODES, entryNodeId: 'hypo-start', categoryId: 'emergency-medicine', moduleLabels: m.HYPOTHERMIA_MODULE_LABELS, citations: m.HYPOTHERMIA_CITATIONS };
    },
    'awake-intubation': async () => {
      const m = await import('../data/trees/awake-intubation.js');
      return { nodes: m.AWAKE_INTUBATION_NODES, entryNodeId: 'awake-start', categoryId: 'anesthesia-airway', moduleLabels: m.AWAKE_INTUBATION_MODULE_LABELS, citations: m.AWAKE_INTUBATION_CITATIONS };
    },
    'ear-fb': async () => {
      const m = await import('../data/trees/ear-fb.js');
      return { nodes: m.EAR_FB_NODES, entryNodeId: 'earfb-start', categoryId: 'procedures', moduleLabels: m.EAR_FB_MODULE_LABELS, citations: m.EAR_FB_CITATIONS };
    },
    'suicide-risk-assessment': async () => {
      const m = await import('../data/trees/suicide-risk-assessment.js');
      return { nodes: m.SUICIDE_RISK_NODES, entryNodeId: 'sui-start', categoryId: 'emergency-medicine', moduleLabels: m.SUICIDE_RISK_MODULE_LABELS, citations: m.SUICIDE_RISK_CITATIONS };
    },
    'ct-decision-support': async () => {
      const m = await import('../data/trees/ct-decision-support.js');
      return { nodes: m.CT_DECISION_SUPPORT_NODES, entryNodeId: 'ct-start', categoryId: 'us-rads', moduleLabels: m.CT_DECISION_SUPPORT_MODULE_LABELS, citations: m.CT_DECISION_SUPPORT_CITATIONS };
    },
    'dfsa-workup': async () => {
      const m = await import('../data/trees/dfsa-workup.js');
      return { nodes: m.DFSA_WORKUP_NODES, entryNodeId: 'dfsa-start', categoryId: 'emergency-medicine', moduleLabels: m.DFSA_WORKUP_MODULE_LABELS, citations: m.DFSA_WORKUP_CITATIONS };
    },
    'urinary-sphincter': async () => {
      const m = await import('../data/trees/urinary-sphincter.js');
      return { nodes: m.URINARY_SPHINCTER_NODES, entryNodeId: 'sphincter-start', categoryId: 'urology', moduleLabels: m.URINARY_SPHINCTER_MODULE_LABELS, citations: m.URINARY_SPHINCTER_CITATIONS };
    },
    'eating-disorders': async () => {
      const m = await import('../data/trees/eating-disorders.js');
      return { nodes: m.EATING_DISORDERS_NODES, entryNodeId: 'ed-start', categoryId: 'emergency-medicine', moduleLabels: m.EATING_DISORDERS_MODULE_LABELS, citations: m.EATING_DISORDERS_CITATIONS };
    },
    'peds-trauma': async () => {
      const m = await import('../data/trees/peds-trauma.js');
      return { nodes: m.PEDS_TRAUMA_NODES, entryNodeId: 'peds-trauma-start', categoryId: 'trauma-surg', moduleLabels: m.PEDS_TRAUMA_MODULE_LABELS, citations: m.PEDS_TRAUMA_CITATIONS };
    },
    'ohss': async () => {
      const m = await import('../data/trees/ohss.js');
      return { nodes: m.OHSS_NODES, entryNodeId: 'ohss-start', categoryId: 'ob-gyn', moduleLabels: m.OHSS_MODULE_LABELS, citations: m.OHSS_CITATIONS };
    },
    'rhogam-early-pregnancy': async () => {
      const m = await import('../data/trees/rhogam-early-pregnancy.js');
      return { nodes: m.RHOGAM_EARLY_PREGNANCY_NODES, entryNodeId: 'rhogam-start', categoryId: 'ob-gyn', moduleLabels: m.RHOGAM_EARLY_PREGNANCY_MODULE_LABELS, citations: m.RHOGAM_EARLY_PREGNANCY_CITATIONS };
    },
    'sti-comprehensive': async () => {
      const m = await import('../data/trees/sti-comprehensive.js');
      return { nodes: m.STI_COMPREHENSIVE_NODES, entryNodeId: 'sti-start', categoryId: 'infectious-disease', moduleLabels: m.STI_COMPREHENSIVE_MODULE_LABELS, citations: m.STI_COMPREHENSIVE_CITATIONS };
    },
    'approach-to-arthritis': async () => {
      const m = await import('../data/trees/approach-to-arthritis.js');
      return { nodes: m.APPROACH_TO_ARTHRITIS_NODES, entryNodeId: 'arth-start', categoryId: 'rheumatology', moduleLabels: m.APPROACH_TO_ARTHRITIS_MODULE_LABELS, citations: m.APPROACH_TO_ARTHRITIS_CITATIONS };
    },
    'diabetic-foot-wounds': async () => {
      const m = await import('../data/trees/diabetic-foot-wounds.js');
      return { nodes: m.DIABETIC_FOOT_WOUNDS_NODES, entryNodeId: 'dfw-start', categoryId: 'trauma-surg', moduleLabels: m.DIABETIC_FOOT_WOUNDS_MODULE_LABELS, citations: m.DIABETIC_FOOT_WOUNDS_CITATIONS };
    },
    'pediatric-arthritis': async () => {
      const m = await import('../data/trees/pediatric-arthritis.js');
      return { nodes: m.PEDIATRIC_ARTHRITIS_NODES, entryNodeId: 'peds-arth-start', categoryId: 'pediatrics', moduleLabels: m.MODULE_LABELS, citations: m.CITATIONS };
    },
    'gout': async () => {
      const m = await import('../data/trees/gout.js');
      return { nodes: m.GOUT_NODES, entryNodeId: 'gout-start', categoryId: 'rheumatology', moduleLabels: m.GOUT_MODULE_LABELS, citations: m.GOUT_CITATIONS };
    },
    'hop-killers': async () => {
      const m = await import('../data/trees/hop-killers.js');
      return { nodes: m.HOP_KILLERS_NODES, entryNodeId: 'hop-start', categoryId: 'anesthesia-airway', moduleLabels: m.HOP_KILLERS_MODULE_LABELS, citations: m.HOP_KILLERS_CITATIONS };
    },
    'tia-workup': async () => {
      const m = await import('../data/trees/tia-workup.js');
      return { nodes: m.TIA_WORKUP_NODES, entryNodeId: 'tia-start', categoryId: 'neurology', moduleLabels: m.TIA_WORKUP_MODULE_LABELS, citations: m.TIA_WORKUP_CITATIONS };
    },
    'peripartum-cardiomyopathy': async () => {
      const m = await import('../data/trees/peripartum-cardiomyopathy.js');
      return { nodes: m.PERIPARTUM_CARDIOMYOPATHY_NODES, entryNodeId: 'ppcm-start', categoryId: 'ob-gyn', moduleLabels: m.PERIPARTUM_CARDIOMYOPATHY_MODULE_LABELS, citations: m.PERIPARTUM_CARDIOMYOPATHY_CITATIONS };
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
