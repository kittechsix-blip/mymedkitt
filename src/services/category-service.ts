// MedKitt — Category Data Service
// Three-tier fallback: Supabase → IndexedDB → hardcoded static data.
// Exposes the same synchronous API as the old data/categories.ts exports.

import { supabaseFetch } from './supabase.js';
import { cacheGetAll, cachePutAll, setLastSync, getLastSync } from './cache-db.js';
import type { Category, DecisionTreeMeta } from '../models/types.js';

// In-memory cache
let categoryCache: Category[] = [];
let colorsCache: Record<string, { card: string; iconBg: string; textColor?: string; outline?: string }> = {};
let initialized = false;

const STALE_MS = 60 * 60 * 1000;

// Supabase row types
interface CategoryRow {
  id: string;
  name: string;
  icon: string;
  is_custom: boolean;
  card_color: string | null;
  icon_bg: string | null;
  text_color: string | null;
  outline: string | null;
  sort_order: number;
}

interface CategoryTreeRow {
  category_id: string;
  tree_id: string;
  display_title: string | null;
  display_subtitle: string | null;
  entry_node_id: string | null;
  sort_order: number;
  // Joined from decision_trees
  decision_trees: {
    id: string;
    title: string;
    subtitle: string;
    version: string;
    node_count: number;
    entry_node_id: string;
  };
}

/** Build Category[] from Supabase rows */
function buildCategories(catRows: CategoryRow[], treeRows: CategoryTreeRow[]): Category[] {
  // Group tree rows by category
  const treesByCategory = new Map<string, DecisionTreeMeta[]>();
  for (const row of treeRows) {
    const tree = row.decision_trees;
    const meta: DecisionTreeMeta = {
      id: tree.id,
      title: row.display_title ?? tree.title,
      subtitle: row.display_subtitle ?? tree.subtitle,
      categoryId: row.category_id,
      version: tree.version,
      nodeCount: tree.node_count,
      entryNodeId: row.entry_node_id ?? tree.entry_node_id,
    };
    const list = treesByCategory.get(row.category_id) ?? [];
    list.push(meta);
    treesByCategory.set(row.category_id, list);
  }

  return catRows.map(row => ({
    id: row.id,
    name: row.name,
    icon: row.icon,
    decisionTrees: treesByCategory.get(row.id) ?? [],
    isCustom: row.is_custom,
  }));
}

/** Build CATEGORY_COLORS from Supabase rows */
function buildColors(catRows: CategoryRow[]): typeof colorsCache {
  const colors: typeof colorsCache = {};
  for (const row of catRows) {
    if (row.card_color && row.icon_bg) {
      colors[row.id] = {
        card: row.card_color,
        iconBg: row.icon_bg,
        ...(row.text_color ? { textColor: row.text_color } : {}),
        ...(row.outline ? { outline: row.outline } : {}),
      };
    }
  }
  return colors;
}

function setCategoryCache(categories: Category[], colors: typeof colorsCache): void {
  categoryCache = categories;
  colorsCache = colors;
}

/** Background refresh from Supabase */
async function refreshFromSupabase(): Promise<void> {
  const [catResult, treeResult] = await Promise.all([
    supabaseFetch<CategoryRow[]>('categories', 'select=*&order=sort_order'),
    supabaseFetch<CategoryTreeRow[]>('category_trees', 'select=*,decision_trees(*)&order=sort_order'),
  ]);

  if (catResult.data && catResult.data.length > 0 && treeResult.data) {
    const categories = buildCategories(catResult.data, treeResult.data);
    const colors = buildColors(catResult.data);
    setCategoryCache(categories, colors);
    // Re-merge hardcoded consults that Supabase doesn't have yet
    await mergeHardcodedConsults();
    await cachePutAll('categories', catResult.data);
    await cachePutAll('category_trees', treeResult.data);
    await setLastSync('categories');
  }
}

/** Load hardcoded fallback */
async function loadHardcodedFallback(): Promise<void> {
  const mod = await import('../data/categories.js');
  setCategoryCache(mod.getAllCategories(), mod.CATEGORY_COLORS);
}

/** Merge hardcoded consults that are missing from the current cache.
 *  Solves: new consults deployed in code but not yet in Supabase/IndexedDB. */
async function mergeHardcodedConsults(): Promise<void> {
  const mod = await import('../data/categories.js');
  const hardcoded = mod.getAllCategories() as Category[];

  for (const hCat of hardcoded) {
    const cached = categoryCache.find(c => c.id === hCat.id);
    if (!cached) {
      // Entire category is new — add it to the cache
      categoryCache.push(hCat);
      const hColors = mod.CATEGORY_COLORS as typeof colorsCache;
      if (hColors[hCat.id]) {
        colorsCache[hCat.id] = hColors[hCat.id];
      }
      continue;
    }

    // Find consults in hardcoded that are missing from cached
    const cachedIds = new Set(cached.decisionTrees.map(t => t.id));
    const missing = hCat.decisionTrees.filter(t => !cachedIds.has(t.id));
    if (missing.length > 0) {
      cached.decisionTrees.push(...missing);
    }
  }
}

/** Initialize category data. Called once at app boot. */
export async function initCategories(): Promise<void> {
  if (initialized) return;

  // 1. Try IndexedDB
  try {
    const cachedCats = await cacheGetAll<CategoryRow>('categories');
    const cachedTrees = await cacheGetAll<CategoryTreeRow>('category_trees');
    if (cachedCats.length > 0) {
      const categories = buildCategories(cachedCats, cachedTrees);
      const colors = buildColors(cachedCats);
      setCategoryCache(categories, colors);
      initialized = true;
    }
  } catch {
    // IndexedDB unavailable
  }

  // 2. Hardcoded fallback (or merge missing consults)
  if (!initialized) {
    await loadHardcodedFallback();
    initialized = true;
  } else {
    // Merge any hardcoded consults missing from IndexedDB/Supabase
    // This ensures newly deployed consults appear immediately
    await mergeHardcodedConsults();
  }

  // 3. Background refresh if stale
  try {
    const lastSync = await getLastSync('categories');
    const isStale = !lastSync || (Date.now() - lastSync) > STALE_MS;
    if (isStale) {
      refreshFromSupabase().catch(() => {});
    }
  } catch {
    // skip refresh
  }
}

// ---- Public API (same signatures as data/categories.ts) ----

export function getAllCategories(): Category[] {
  // Merge with custom categories from localStorage
  try {
    const raw = localStorage.getItem('em-custom-categories');
    if (raw) {
      const custom = JSON.parse(raw) as Category[];
      return [...categoryCache, ...custom];
    }
  } catch {
    // ignore
  }
  return categoryCache;
}

export { addCustomCategory } from '../data/categories.js';

export function getCategoryColors(): typeof colorsCache {
  return colorsCache;
}
