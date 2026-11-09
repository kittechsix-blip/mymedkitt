// myMedKitt — Consult open counts (per device) for the Home "Most used" row.
// Stores ids, titles and counters only.

import { storageGet, storageSet } from './storage.js';

export const OPEN_COUNTS_KEY = 'mymedkitt_open_counts';
const MIN_OPENS = 3;
const MIN_CONSULTS = 3;
const TOP_N = 6;

export interface OpenCount {
  n: number;
  title: string;
  categoryId: string;
  last: number;
}

export interface UsedConsult {
  id: string;
  title: string;
  categoryId: string;
}

function readCounts(): Record<string, OpenCount> {
  const raw = storageGet<unknown>(OPEN_COUNTS_KEY, {});
  return raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, OpenCount>) : {};
}

export function recordConsultOpen(id: string, title: string, categoryId: string): void {
  const counts = readCounts();
  const prev = counts[id];
  counts[id] = { n: (prev && typeof prev.n === 'number' ? prev.n : 0) + 1, title, categoryId, last: Date.now() };
  storageSet(OPEN_COUNTS_KEY, counts);
}

/** Top consults by opens, or [] until at least 3 consults have 3+ opens each. */
export function getMostUsed(): UsedConsult[] {
  const rows = Object.entries(readCounts())
    .filter(([, c]) => c && typeof c.n === 'number' && c.n >= MIN_OPENS)
    .sort((a, b) => b[1].n - a[1].n || b[1].last - a[1].last);
  if (rows.length < MIN_CONSULTS) return [];
  return rows.slice(0, TOP_N).map(([id, c]) => ({ id, title: c.title, categoryId: c.categoryId }));
}
