// Class lists on the routing pages (odse-tox-route-*) are generated from the data, never typed.
// routeClassList() is pure; scripts/build-onc-route-pages.mjs rewrites the list inside each routing node's body in the literal tree file,
// and scripts/onc-drugs.test.ts fails when a page's list differs from this function's output.
import type { OncData } from './types.js';

/** "Class name (drug, drug)" per class that carries any of the toxicities, in class order; more than 5 members is shown as "(N drugs)".
 *  A class name that already ends in a parenthesised drug list (for example "Estrogen receptor antagonists (tamoxifen, fulvestrant)") is shown without it,
 *  so the parentheses name only the drugs that carry the effect. No class carries it yet: "no card lists it yet". */
export function routeClassList(toxIds: string[], data: Pick<OncData, 'classes' | 'drugs'>): string {
  const want = new Set(toxIds);
  const classIdx = new Map(data.classes.map((c, i) => [c.id, i]));
  const classHas = new Set(data.classes.filter((c) => c.effects.some((e) => want.has(e.tox))).map((c) => c.id));
  // a drug carries the effect when one of its classes lists it or it declares it itself, unless it drops it; drugs sharing the same classes are grouped
  const groups = new Map<string, { order: number; name: string; members: string[] }>();
  for (const d of data.drugs) {
    const ov = (d.effects ?? []).filter((o) => want.has(o.tox));
    if (ov.some((o) => o.drop)) continue;
    if (!(d.classIds.some((c) => classHas.has(c)) || ov.length > 0)) continue;
    const ids = d.classIds.filter((c) => classIdx.has(c)).sort((a, b) => classIdx.get(a)! - classIdx.get(b)!);
    if (!ids.length) continue;
    const key = ids.join('|');
    const g = groups.get(key) ?? { order: classIdx.get(ids[0])!, name: ids.map((c) => data.classes[classIdx.get(c)!].name).join(' / '), members: [] as string[] };
    g.members.push(d.generic);
    groups.set(key, g);
  }
  const bareName = (name: string, members: string[]): string => {
    const m = name.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
    if (!m) return name;
    const inner = m[2].toLowerCase();
    return members.some((x) => inner.includes(x.toLowerCase().split(/[\s-]/)[0])) ? m[1] : name;
  };
  if (!groups.size) return 'no card lists it yet';
  return [...groups.values()].sort((a, b) => a.order - b.order).map((g) => `${bareName(g.name, g.members)} (${g.members.length > 5 ? `${g.members.length} drugs` : g.members.join(', ')})`).join('; ');
}

/** Per-page overrides of the fixed phrases (the HLH page words its first bullet differently). */
export const ROUTE_REGIONS: Record<string, { before: string; after: string }> = {
  'odse-tox-route-hlh': { before: 'the labels of the drugs on the cards that carry it: ', after: '. The Breyanzi label calls it' },
};

/** Fixed phrases around the generated list in a routing node's body: the only "markers", and they are ordinary text. */
export const ROUTE_LIST_BEFORE = 'the drug classes on the cards that carry it: ';
export const ROUTE_LIST_AFTER = ".\n• The drug's own label instruction";
