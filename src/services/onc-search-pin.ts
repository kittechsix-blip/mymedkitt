// Oncology drug cards in Home search: exact-name pin to rank 1 and prefix matching on names.
// Pure module (no imports): the app loads the entries from data/search-answer-index.json (`onc`),
// built by scripts/build-search-answer-index.mjs from src/data/onc-drugs. No clinical text lives here.

export interface OncIndexEntry {
  /** card route, /tree/onc-drug-side-effects/node/odse-drug-<slug> */
  route: string;
  /** "Generic (Brand)" */
  title: string;
  /** class name */
  sub: string;
  /** names that pin the card to rank 1 (empty when the drug or regimen has pin:false) */
  pin: string[];
  /** every name that should find the card by prefix or typo (generic, brands, aliases) */
  all: string[];
}

export const ONC_MIN_NAME = 4;
/** Pin floor: the data layer only puts 3-character names in `pin` for editor aliases that contain a digit (5FU); prefix matching keeps ONC_MIN_NAME. */
export const ONC_MIN_PIN = 3;

/** Lowercase letters and digits only: "R-CHOP", "r chop" and "RCHOP" are one name. */
export function oncNorm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

let pinMap = new Map<string, OncIndexEntry>();
let prefixList: { n: string; e: OncIndexEntry }[] = [];

/** Install the entries from the answer index (or a test). Replaces any earlier set. */
export function setOncEntries(entries: readonly OncIndexEntry[] | undefined): void {
  pinMap = new Map();
  prefixList = [];
  for (const e of entries ?? []) {
    for (const name of e.pin) {
      const n = oncNorm(name);
      if (n.length >= ONC_MIN_PIN && !pinMap.has(n)) pinMap.set(n, e);
    }
    for (const name of e.all) {
      const n = oncNorm(name);
      if (n.length >= ONC_MIN_NAME) prefixList.push({ n, e });
    }
  }
}

/** The card an exact (case / spacing / punctuation-insensitive) name resolves to, or null. Constant time. */
export function oncPin(query: string): OncIndexEntry | null {
  if (!query) return null;
  const n = oncNorm(query);
  return n.length >= ONC_MIN_PIN ? pinMap.get(n) ?? null : null;
}

/** Cards whose name starts with the query (query of 4+ characters), each card once. */
export function oncPrefix(query: string): OncIndexEntry[] {
  const q = oncNorm(query);
  if (q.length < ONC_MIN_NAME || prefixList.length === 0) return [];
  const seen = new Set<OncIndexEntry>();
  for (const { n, e } of prefixList) if (n.startsWith(q)) seen.add(e);
  return [...seen];
}

export function oncEntryCount(): number {
  return new Set(prefixList.map((p) => p.e)).size;
}
