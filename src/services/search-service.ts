/**
 * SearchService — Fuzzy search powered by Fuse.js
 * Phase 1: Replace substring search with intelligent fuzzy matching
 */

import { getAllCategories } from './category-service.js';
import { getAllDrugs } from './drug-service.js';
import { getAllCalculators } from '../components/calculator.js';
// Types imported from data services directly

// ===================================================================
// Types
// ===================================================================

export interface SearchDoc {
  id: string;
  type: 'category' | 'consult' | 'drug' | 'calculator';
  title: string;
  subtitle: string;
  keywords: string[];
  categoryId?: string;
  drugId?: string;
}

export interface SearchResult {
  type: 'category' | 'consult' | 'drug' | 'calculator';
  label: string;
  sublabel: string;
  route: string;
  drugId?: string;
  score?: number;
}

// Fuse.js types (loaded from CDN)
interface FuseResult<T> {
  item: T;
  score?: number;
  refIndex: number;
}

interface FuseInstance<T> {
  search(query: string): FuseResult<T>[];
}

interface FuseConstructor {
  new <T>(list: T[], options?: FuseOptions): FuseInstance<T>;
}

interface FuseOptions {
  keys: Array<string | { name: string; weight: number }>;
  threshold?: number;
  includeScore?: boolean;
  ignoreLocation?: boolean;
  minMatchCharLength?: number;
  findAllMatches?: boolean;
}

// Global Fuse reference (loaded from CDN)
declare const Fuse: FuseConstructor;

// ===================================================================
// Search Index
// ===================================================================

let searchIndex: FuseInstance<SearchDoc> | null = null;
let indexedDocs: SearchDoc[] = [];

/** Clinical synonyms for common queries */
const CLINICAL_SYNONYMS: Record<string, string[]> = {
  'afib-rvr': ['afib', 'a-fib', 'atrial fibrillation', 'rvr', 'rapid ventricular', 'rate control', 'cardioversion'],
  'pe-treatment': ['pe', 'pulmonary embolism', 'dvt', 'anticoagulation', 'clot', 'thrombus'],
  'pneumothorax': ['pneumo', 'ptx', 'collapsed lung', 'chest tube', 'needle decompression'],
  'sepsis': ['septic', 'infection', 'bacteremia', 'lactate', 'qsofa', 'sofa'],
  'stroke': ['cva', 'tpa', 'thrombectomy', 'nihss', 'ischemic', 'hemorrhagic'],
  'stemi': ['mi', 'myocardial infarction', 'heart attack', 'pci', 'cath lab'],
  'nstemi': ['mi', 'acs', 'acute coronary', 'troponin'],
  'intubation': ['rsi', 'airway', 'etomidate', 'rocuronium', 'tube'],
  'dka': ['diabetic ketoacidosis', 'hyperglycemia', 'insulin', 'bicarb'],
  'syncope': ['passed out', 'fainted', 'loss of consciousness', 'loc'],
  'meningitis': ['meningeal', 'lumbar puncture', 'lp', 'csf'],
  'syphilis': ['neurosyphilis', 'treponemal', 'rpr', 'vdrl'],
  'status-epilepticus': ['seizure', 'convulsion', 'epilepsy', 'benzodiazepine'],
};

/** Drug synonyms */
const DRUG_SYNONYMS: Record<string, string[]> = {
  'metoprolol': ['lopressor', 'beta blocker', 'bb'],
  'diltiazem': ['cardizem', 'calcium channel blocker', 'ccb'],
  'amiodarone': ['cordarone', 'antiarrhythmic'],
  'heparin': ['anticoagulant', 'blood thinner'],
  'enoxaparin': ['lovenox', 'lmwh', 'anticoagulant'],
  'fentanyl': ['pain', 'opioid', 'narcotic', 'sedation'],
  'ketamine': ['sedation', 'dissociative', 'psi'],
  'propofol': ['diprivan', 'sedation', 'induction'],
  'rocuronium': ['paralytic', 'nmb', 'rsi'],
  'succinylcholine': ['sux', 'paralytic', 'depolarizing'],
  'norepinephrine': ['levophed', 'norepi', 'pressor', 'vasopressor'],
  'epinephrine': ['epi', 'adrenaline', 'pressor'],
  'magnesium': ['mag', 'torsades', 'eclampsia'],
};

/** Build search index from all content */
export function buildSearchIndex(): void {
  indexedDocs = [];
  const categories = getAllCategories();
  const seenTreeIds = new Set<string>();

  // Index categories
  for (const cat of categories) {
    indexedDocs.push({
      id: `cat-${cat.id}`,
      type: 'category',
      title: cat.name,
      subtitle: `${cat.decisionTrees.length} consults`,
      keywords: [cat.id],
    });

    // Index consults
    for (const tree of cat.decisionTrees) {
      if (seenTreeIds.has(tree.id)) continue;
      seenTreeIds.add(tree.id);

      const synonyms = CLINICAL_SYNONYMS[tree.id] || [];
      indexedDocs.push({
        id: tree.id,
        type: 'consult',
        title: tree.title,
        subtitle: tree.subtitle,
        keywords: [tree.id, ...synonyms],
        categoryId: cat.id,
      });
    }
  }

  // Index drugs
  for (const drug of getAllDrugs()) {
    const synonyms = DRUG_SYNONYMS[drug.name.toLowerCase()] || [];
    indexedDocs.push({
      id: drug.id,
      type: 'drug',
      title: drug.name,
      subtitle: drug.drugClass,
      keywords: [drug.genericName, drug.drugClass, ...synonyms],
      drugId: drug.id,
    });
  }

  // Index calculators
  for (const calc of getAllCalculators()) {
    indexedDocs.push({
      id: calc.id,
      type: 'calculator',
      title: calc.title,
      subtitle: calc.subtitle,
      keywords: [calc.id],
    });
  }

  // Create Fuse index
  if (typeof Fuse !== 'undefined') {
    searchIndex = new Fuse(indexedDocs, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'subtitle', weight: 0.2 },
        { name: 'keywords', weight: 0.4 },
      ],
      threshold: 0.35,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2,
      findAllMatches: true,
    });
    console.log(`[SearchService] Indexed ${indexedDocs.length} items with Fuse.js`);
  } else {
    console.warn('[SearchService] Fuse.js not loaded, falling back to substring search');
  }
}

/** Search with fuzzy matching */
export function search(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  const q = query.trim().toLowerCase();

  // Use Fuse.js if available
  if (searchIndex) {
    const fuseResults = searchIndex.search(q);
    return fuseResults.slice(0, 20).map((r) => docToResult(r.item, r.score));
  }

  // Fallback to substring search
  return fallbackSearch(q);
}

/** Convert SearchDoc to SearchResult */
function docToResult(doc: SearchDoc, score?: number): SearchResult {
  let route: string;

  switch (doc.type) {
    case 'category':
      route = `/category/${doc.id.replace('cat-', '')}`;
      break;
    case 'consult':
      route = `/tree/${doc.id}`;
      break;
    case 'drug':
      route = '/drugs';
      break;
    case 'calculator':
      route = `/calculator/${doc.id}`;
      break;
    default:
      route = '/';
  }

  return {
    type: doc.type,
    label: doc.title,
    sublabel: doc.subtitle,
    route,
    drugId: doc.drugId,
    score,
  };
}

/** Fallback substring search (same as current implementation) */
function fallbackSearch(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const categories = getAllCategories();
  const seenTreeIds = new Set<string>();

  for (const cat of categories) {
    if (cat.name.toLowerCase().includes(query)) {
      results.push({
        type: 'category',
        label: cat.name,
        sublabel: `${cat.decisionTrees.length} consults`,
        route: `/category/${cat.id}`,
      });
    }
    for (const tree of cat.decisionTrees) {
      if (seenTreeIds.has(tree.id)) continue;
      if (tree.title.toLowerCase().includes(query) || tree.subtitle.toLowerCase().includes(query)) {
        seenTreeIds.add(tree.id);
        results.push({
          type: 'consult',
          label: tree.title,
          sublabel: tree.subtitle,
          route: `/tree/${tree.id}`,
        });
      }
    }
  }

  for (const drug of getAllDrugs()) {
    if (
      drug.name.toLowerCase().includes(query) ||
      drug.genericName.toLowerCase().includes(query) ||
      drug.drugClass.toLowerCase().includes(query)
    ) {
      results.push({
        type: 'drug',
        label: drug.name,
        sublabel: drug.drugClass,
        route: '/drugs',
        drugId: drug.id,
      });
    }
  }

  for (const calc of getAllCalculators()) {
    if (calc.title.toLowerCase().includes(query) || calc.subtitle.toLowerCase().includes(query)) {
      results.push({
        type: 'calculator',
        label: calc.title,
        sublabel: calc.subtitle,
        route: `/calculator/${calc.id}`,
      });
    }
  }

  return results;
}

/** Check if Fuse.js is available */
export function isFuzzySearchAvailable(): boolean {
  return typeof Fuse !== 'undefined' && searchIndex !== null;
}
