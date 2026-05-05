// MedKitt — Info Page Data Service
// Three-tier fallback: Supabase → IndexedDB → hardcoded static data.
// Exposes synchronous lookup API for showInfoModal.

import { supabaseFetch } from './supabase.js';
import { cacheGetAll, cachePutAll, setLastSync, getLastSync } from './cache-db.js';
import type { InfoPage } from '../data/info-pages.js';

// Supabase row shape (matches info_pages table)
interface InfoPageRow {
  id: string;
  title: string;
  subtitle: string;
  image?: InfoPage['image'];
  sections: InfoPage['sections'];
  citations: InfoPage['citations'];
  shareable: boolean;
  sort_order: number;
}

// In-memory cache — what consumers read from (always synchronous)
let infoPageMap: Map<string, InfoPage> = new Map();
let initialized = false;

// Re-fetch from Supabase if cache is older than 1 hour
const STALE_MS = 60 * 60 * 1000;

/** Map Supabase row to InfoPage interface */
function mapRow(row: InfoPageRow): InfoPage {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    ...(row.image ? { image: row.image } : {}),
    sections: row.sections,
    citations: row.citations,
    ...(row.shareable ? { shareable: true } : {}),
  };
}

/** Set the in-memory cache */
function setCache(pages: InfoPage[]): void {
  infoPageMap = new Map(pages.map(p => [p.id, p]));
}

/** Background refresh from Supabase */
async function refreshFromSupabase(): Promise<void> {
  const result = await supabaseFetch<InfoPageRow[]>(
    'info_pages',
    'select=*&order=sort_order'
  );
  if (result.data && result.data.length > 0) {
    const pages = result.data.map(mapRow);
    setCache(pages);
    // Re-merge hardcoded pages that Supabase doesn't have yet
    await mergeHardcodedInfoPages();
    await cachePutAll('info_pages', result.data);
    await setLastSync('info_pages');
  }
}

/** Load hardcoded data as last-resort fallback */
async function loadHardcodedFallback(): Promise<void> {
  const mod = await import('../data/info-pages.js');
  const stopMod = await import('../data/stop-pages.js');
  setCache([...mod.getAllInfoPagesFallback(), ...stopMod.getAllStopPages()]);
}

/** Merge hardcoded info pages missing from cached data */
async function mergeHardcodedInfoPages(): Promise<void> {
  const mod = await import('../data/info-pages.js');
  const stopMod = await import('../data/stop-pages.js');
  const hardcoded = [...mod.getAllInfoPagesFallback(), ...stopMod.getAllStopPages()] as InfoPage[];
  for (const page of hardcoded) {
    const existing = infoPageMap.get(page.id);
    if (!existing) {
      infoPageMap.set(page.id, page);
    } else {
      let changed = false;
      let merged = existing;

      if (!existing.image && page.image) {
        merged = { ...merged, image: page.image };
        changed = true;
      }

      const sections = existing.sections.map((section, idx) => {
        const hardcodedSection = page.sections[idx];
        const hardcodedImage = hardcodedSection?.image;
        if (!section.image && hardcodedImage) {
          changed = true;
          return { ...section, image: hardcodedImage, body: hardcodedSection.body };
        }
        return section;
      });

      if (changed) {
        infoPageMap.set(page.id, { ...merged, sections });
      }
    }
  }
}

/**
 * Initialize info page data. Called once at app boot.
 * Loads from the fastest available source, then refreshes in background.
 */
export async function initInfoPages(): Promise<void> {
  if (initialized) return;

  // 1. Try IndexedDB (fast, works offline)
  try {
    const cached = await cacheGetAll<InfoPageRow>('info_pages');
    if (cached.length > 0) {
      const pages = cached.map(mapRow);
      setCache(pages);
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
    // Merge any hardcoded info pages missing from IndexedDB/Supabase
    await mergeHardcodedInfoPages();
  }

  // 3. If cache is stale (or never synced), refresh from Supabase in background
  try {
    const lastSync = await getLastSync('info_pages');
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

// ---- Public API ----

/** Get a single info page by ID (synchronous after init) */
export function getInfoPage(id: string): InfoPage | undefined {
  return infoPageMap.get(id);
}

/** Get all info pages */
export function getAllInfoPages(): InfoPage[] {
  return Array.from(infoPageMap.values());
}
