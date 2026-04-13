/**
 * SearchService — Fuzzy search powered by Fuse.js
 * Phase 1: Replace substring search with intelligent fuzzy matching
 */

import { getAllCategories } from './category-service.js';
import { getAllDrugs } from './drug-service.js';
import { getAllCalculators } from '../components/calculator.js';
import { sanitizeSearchInput } from './sanitize.js';
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

/** Search with strict alphabetical prefix matching */
export function search(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) return [];

  // Security: sanitize user input before searching
  const sanitized = sanitizeSearchInput(query);
  if (sanitized.length === 0) return [];

  // Safety: rebuild index if it's empty (race condition guard)
  if (indexedDocs.length === 0) {
    buildSearchIndex();
  }

  const q = sanitized.toLowerCase();

  // Use strict alphabetical prefix search
  return alphabeticalPrefixSearch(q);
}

// ===================================================================
// Feature 4: Faceted Search with Type Filters
// ===================================================================

export type SearchFilterType = 'category' | 'consult' | 'drug' | 'calculator';

/** Search with optional type filters */
export function searchWithFilters(query: string, filters?: SearchFilterType[]): SearchResult[] {
  let results = search(query);

  // Apply type filters if provided
  if (filters && filters.length > 0) {
    results = results.filter(r => filters.includes(r.type));
  }

  return results;
}

/** Get available filter types (for UI) */
export function getAvailableFilterTypes(): { type: SearchFilterType; label: string }[] {
  return [
    { type: 'consult', label: 'Consults' },
    { type: 'drug', label: 'Drugs' },
    { type: 'calculator', label: 'Calculators' },
  ];
}

/** Normalize string for prefix matching (remove hyphens, spaces, special chars) */
function normalizeForSearch(str: string): string {
  return str.toLowerCase().replace(/[-\s\/\\().,:']/g, '');
}

/** Check if title matches query prefix (handles "A-Fib" matching "af", "afib", etc.) */
function matchesPrefix(title: string, query: string): boolean {
  const normalizedTitle = normalizeForSearch(title);
  const normalizedQuery = normalizeForSearch(query);

  // Primary: normalized prefix match ("afib" matches "A-Fib RVR")
  if (normalizedTitle.startsWith(normalizedQuery)) return true;

  // Secondary: word-boundary prefix match (each word in title)
  const words = title.toLowerCase().split(/[-\s\/\\]+/);
  for (const word of words) {
    if (word.startsWith(query)) return true;
  }

  return false;
}

/** Strict alphabetical prefix search - matches items starting with query */
function alphabeticalPrefixSearch(query: string): SearchResult[] {
  const results: SearchResult[] = [];
  const categories = getAllCategories();
  const seenTreeIds = new Set<string>();

  // Categories - prefix match on name
  for (const cat of categories) {
    if (matchesPrefix(cat.name, query)) {
      results.push({
        type: 'category',
        label: cat.name,
        sublabel: `${cat.decisionTrees.length} consults`,
        route: `/category/${cat.id}`,
      });
    }
    // Consults - prefix match on title OR id
    for (const tree of cat.decisionTrees) {
      if (seenTreeIds.has(tree.id)) continue;
      if (matchesPrefix(tree.title, query) || tree.id.startsWith(query)) {
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

  // Drugs - prefix match on name
  for (const drug of getAllDrugs()) {
    if (matchesPrefix(drug.name, query)) {
      results.push({
        type: 'drug',
        label: drug.name,
        sublabel: drug.drugClass,
        route: '/drugs',
        drugId: drug.id,
      });
    }
  }

  // Calculators - prefix match on title
  for (const calc of getAllCalculators()) {
    if (matchesPrefix(calc.title, query)) {
      results.push({
        type: 'calculator',
        label: calc.title,
        sublabel: calc.subtitle,
        route: `/calculator/${calc.id}`,
      });
    }
  }

  // Sort all results alphabetically by label
  results.sort((a, b) => a.label.localeCompare(b.label));

  return results;
}

/** Check if Fuse.js is available */
export function isFuzzySearchAvailable(): boolean {
  return typeof Fuse !== 'undefined' && searchIndex !== null;
}
