// myMedKitt — Dosing List Service
// Manages an explicit list of drugs/doses the user has selected or calculated.
// Safe alternative to regex extraction.

import { storageGet, storageSet } from './storage.js';

const STORAGE_KEY = 'medkitt-dosing-list';

export interface DosingEntry {
  id: string;
  drug: string;
  dose: string;
  route?: string;
  indication?: string;
  weight?: number;
  timestamp: number;
}

/** Get all entries in the dosing list */
export function getDosingList(): DosingEntry[] {
  return storageGet<DosingEntry[]>(STORAGE_KEY, []);
}

/** Add a new entry to the dosing list */
export function addToDosingList(entry: Omit<DosingEntry, 'id' | 'timestamp'>): DosingEntry {
  const list = getDosingList();
  const newEntry: DosingEntry = {
    ...entry,
    id: `dose-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
  };
  list.push(newEntry);
  storageSet(STORAGE_KEY, list);
  notifyListeners();
  return newEntry;
}

/** Remove an entry by ID */
export function removeFromDosingList(id: string): void {
  const list = getDosingList().filter(e => e.id !== id);
  storageSet(STORAGE_KEY, list);
  notifyListeners();
}

/** Clear all entries */
export function clearDosingList(): void {
  storageSet(STORAGE_KEY, []);
  notifyListeners();
}

/** Check if an entry already exists (by drug + dose) */
export function isDoseInList(drug: string, dose: string): boolean {
  const list = getDosingList();
  return list.some(e => e.drug === drug && e.dose === dose);
}

// Event system for reactivity
type DosingListListener = (list: DosingEntry[]) => void;
const listeners: Set<DosingListListener> = new Set();

/** Subscribe to list changes */
export function subscribeToDosingList(fn: DosingListListener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notifyListeners(): void {
  const list = getDosingList();
  listeners.forEach(fn => fn(list));
}
