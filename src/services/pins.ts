// myMedKitt — Pinned consults (per device, localStorage). No patient data: ids + titles only.

import { storageGet, storageSet } from './storage.js';

export const PINS_KEY = 'mymedkitt_pins';
export const MAX_PINS = 12;

export interface PinnedConsult {
  id: string;
  title: string;
  categoryId: string;
  pinnedAt: number;
}

/** Pinned consults, most recently pinned first. */
export function getPins(): PinnedConsult[] {
  const raw = storageGet<unknown>(PINS_KEY, []);
  if (!Array.isArray(raw)) return [];
  return raw.filter((p): p is PinnedConsult =>
    !!p && typeof p.id === 'string' && typeof p.title === 'string' && typeof p.categoryId === 'string');
}

export function isPinned(id: string): boolean {
  return getPins().some(p => p.id === id);
}

/** Toggle a pin. Returns true when the consult is now pinned. Oldest pin is dropped at the cap. */
export function togglePin(id: string, title: string, categoryId: string): boolean {
  const pins = getPins();
  if (pins.some(p => p.id === id)) {
    storageSet(PINS_KEY, pins.filter(p => p.id !== id));
    return false;
  }
  const next = [{ id, title, categoryId, pinnedAt: Date.now() }, ...pins].slice(0, MAX_PINS);
  storageSet(PINS_KEY, next);
  return true;
}
