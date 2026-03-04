// MedKitt — Drug Data Service
// Three-tier fallback: Supabase → IndexedDB → hardcoded static data.
// Exposes the same synchronous API as the old data/drug-store.ts exports.

import { supabaseFetch } from './supabase.js';
import { cacheGetAll, cachePutAll, setLastSync, getLastSync } from './cache-db.js';
import type { DrugEntry } from '../data/drug-store.js';

// In-memory cache — what consumers read from (always synchronous)
let drugCache: DrugEntry[] = [];
let drugMap: Map<string, DrugEntry> = new Map();
let initialized = false;

// Re-fetch from Supabase if cache is older than 1 hour
const STALE_MS = 60 * 60 * 1000;

/** Map Supabase row (snake_case) to TypeScript interface (camelCase) */
function mapDrugRow(row: Record<string, unknown>): DrugEntry {
  return {
    id: row.id as string,
    name: row.name as string,
    genericName: row.generic_name as string,
    drugClass: row.drug_class as string,
    route: row.route as string,
    indications: row.indications as string[],
    dosing: row.dosing as DrugEntry['dosing'],
    contraindications: row.contraindications as string[] | undefined,
    cautions: row.cautions as string[] | undefined,
    monitoring: row.monitoring as string | undefined,
    notes: row.notes as string | undefined,
    image: row.image as DrugEntry['image'],
    citations: row.citations as string[],
  };
}

/** Set the in-memory cache */
function setDrugCache(drugs: DrugEntry[]): void {
  drugCache = drugs.sort((a, b) => a.name.localeCompare(b.name));
  drugMap = new Map(drugCache.map(d => [d.id, d]));
}

/** Background refresh from Supabase */
async function refreshFromSupabase(): Promise<void> {
  const result = await supabaseFetch<Record<string, unknown>[]>(
    'drugs',
    'select=*&order=sort_order'
  );
  if (result.data && result.data.length > 0) {
    const drugs = result.data.map(mapDrugRow);
    setDrugCache(drugs);
    await cachePutAll('drugs', drugs);
    await setLastSync('drugs');
  }
}

/** Load hardcoded drug data as last-resort fallback */
async function loadHardcodedFallback(): Promise<void> {
  const mod = await import('../data/drug-store.js');
  setDrugCache(mod.getAllDrugs());
}

/** Merge hardcoded drugs missing from cached data */
async function mergeHardcodedDrugs(): Promise<void> {
  const mod = await import('../data/drug-store.js');
  const hardcoded = mod.getAllDrugs() as DrugEntry[];
  let added = false;
  for (const drug of hardcoded) {
    if (!drugMap.has(drug.id)) {
      drugCache.push(drug);
      drugMap.set(drug.id, drug);
      added = true;
    }
  }
  if (added) {
    drugCache.sort((a, b) => a.name.localeCompare(b.name));
  }
}

/**
 * Initialize drug data. Called once at app boot.
 * Loads from the fastest available source, then refreshes in background.
 */
export async function initDrugs(): Promise<void> {
  if (initialized) return;

  // 1. Try IndexedDB (fast, works offline)
  try {
    const cached = await cacheGetAll<DrugEntry>('drugs');
    if (cached.length > 0) {
      setDrugCache(cached);
      initialized = true;
    }
  } catch {
    // IndexedDB unavailable — continue to next source
  }

  // 2. If no cached data yet, load hardcoded as immediate fallback
  if (!initialized) {
    await loadHardcodedFallback();
    initialized = true;
  } else {
    // Merge any hardcoded drugs missing from IndexedDB/Supabase
    await mergeHardcodedDrugs();
  }

  // 3. If cache is stale (or never synced), refresh from Supabase in background
  try {
    const lastSync = await getLastSync('drugs');
    const isStale = !lastSync || (Date.now() - lastSync) > STALE_MS;
    if (isStale) {
      refreshFromSupabase().catch(() => {
        // Network unavailable — cached/hardcoded data is fine
      });
    }
  } catch {
    // getLastSync failed — skip background refresh
  }
}

// ---- Public API (same signatures as data/drug-store.ts) ----

export function getAllDrugs(): DrugEntry[] {
  return drugCache;
}

export function getDrug(id: string): DrugEntry | undefined {
  return drugMap.get(id);
}
