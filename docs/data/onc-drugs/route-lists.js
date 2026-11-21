/** "Class name (drug, drug)" per class that carries any of the toxicities, in class order; more than 5 members is shown as "(N drugs)".
 *  A class name that already ends in a parenthesised drug list (for example "Estrogen receptor antagonists (tamoxifen, fulvestrant)") is shown without it,
 *  so the parentheses name only the drugs that carry the effect. No class carries it yet: "no card lists it yet". */
export function routeClassList(toxIds, data) {
    const want = new Set(toxIds);
    const browse = data.browseClasses ?? data.classes;
    const classIdx = new Map(browse.map((c, i) => [c.id, i]));
    const classHas = new Set(data.classes.filter((c) => c.effects.some((e) => want.has(e.tox))).map((c) => c.id));
    // a drug carries the effect when one of its classes lists it or it declares it itself, unless it drops it; drugs sharing the same classes are grouped
    const groups = new Map();
    for (const d of data.drugs) {
        const ov = (d.effects ?? []).filter((o) => want.has(o.tox));
        if (ov.some((o) => o.drop))
            continue;
        if (!(d.classIds.some((c) => classHas.has(c)) || ov.length > 0))
            continue;
        const ids = (d.browseClassIds ?? d.classIds).filter((c) => classIdx.has(c)).sort((a, b) => classIdx.get(a) - classIdx.get(b));
        if (!ids.length)
            continue;
        const key = ids.join('|');
        const g = groups.get(key) ?? { order: classIdx.get(ids[0]), name: ids.map((c) => browse[classIdx.get(c)].name).join(' / '), members: [] };
        g.members.push(d.generic);
        groups.set(key, g);
    }
    const bareName = (name, members) => {
        const m = name.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
        if (!m)
            return name;
        const inner = m[2].toLowerCase();
        return members.some((x) => inner.includes(x.toLowerCase().split(/[\s-]/)[0])) ? m[1] : name;
    };
    if (!groups.size)
        return 'no card lists it yet';
    return [...groups.values()].sort((a, b) => a.order - b.order).map((g) => `${bareName(g.name, g.members)} (${g.members.length > 5 ? `${g.members.length} drugs` : g.members.join(', ')})`).join('; ');
}
/** Per-page overrides of the fixed phrases (the HLH page words its first bullet differently). */
export const ROUTE_REGIONS = {
    'odse-tox-route-hlh': { before: 'the labels of the drugs on the cards that carry it: ', after: '. The Breyanzi label calls it' },
};
/** Fixed phrases around the generated list in a routing node's body: the only "markers", and they are ordinary text. */
export const ROUTE_LIST_BEFORE = 'the drug classes on the cards that carry it: ';
export const ROUTE_LIST_AFTER = ".\n• The drug's own label instruction";
