// myMedKitt — RAPID traceability verifier (contract v3, "quote, don't paraphrase").
// PURE functions (type-only imports): used by the gate (scripts/rapid-strips.test.ts), the proof
// page, the approve and status scripts and the runtime self-check. One verifier, five callers.
//
// Agents author only a tile's FACE (action, figure, condition). Everything inside an expansion is verbatim:
//  - excerpts of node lines are checked as EXACT substrings of one normalised source line, clause-complete,
//    with every negation of that line kept (HARD);
//  - a drug tile's dosing text is the drug store's own regimen, pinned by hash at approval.
// The face is checked by number (value + unit + comparator exist in the declared source) and by flags that
// the physician acknowledges by id before approval.
import { RAPID_FORMAT_VERSION } from '../data/rapid/types.js';
export const RAPID_VERIFIER_VERSION = 3;
export const RAPID_MAX_TILES = 7;
/** Layout limits so a tile never breaks: enforced by the gate. */
export const RAPID_MAX_ACTION_CHARS = 24;
export const RAPID_MAX_FIGURE_CHARS = 28;
export const RAPID_MAX_CONDITION_CHARS = 40;
export const RAPID_EXCERPT_MIN = 3;
export const RAPID_EXCERPT_MAX = 160;
export const RAPID_STEPS_MAX_LINES = 8;
export const RAPID_DRUG_MAX_LINES = 4;
function replaceMapped(m, re, rep) {
    const out = { t: '', s: [], e: [] };
    const parts = [];
    let last = 0;
    re.lastIndex = 0;
    let x;
    const push = (from, to) => {
        for (let i = from; i < to; i++) {
            parts.push(m.t[i]);
            out.s.push(m.s[i]);
            out.e.push(m.e[i]);
        }
    };
    while ((x = re.exec(m.t)) !== null) {
        if (x[0].length === 0) {
            re.lastIndex++;
            continue;
        }
        push(last, x.index);
        const r = rep(x);
        const s0 = m.s[x.index];
        const e0 = m.e[x.index + x[0].length - 1];
        for (const ch of r) {
            parts.push(ch);
            out.s.push(s0);
            out.e.push(e0);
        }
        last = x.index + x[0].length;
    }
    push(last, m.t.length);
    out.t = parts.join('');
    return out;
}
const MULT = '¤'; // multiplier marker, never present in source text
function normalizeMapped(text) {
    let m = { t: '', s: [], e: [] };
    const parts = [];
    let i = 0;
    for (const cp of text) {
        const nf = cp.normalize('NFKC');
        for (const ch of nf) {
            for (let k = 0; k < ch.length; k++) {
                parts.push(ch[k]);
                m.s.push(i);
                m.e.push(i + cp.length);
            }
        }
        i += cp.length;
    }
    m.t = parts.join('');
    m = replaceMapped(m, /[‐-―−]/g, () => '-');
    m = replaceMapped(m, /≤/g, () => '<=');
    m = replaceMapped(m, /≥/g, () => '>=');
    m = replaceMapped(m, /≈/g, () => '~');
    m = replaceMapped(m, /\bapprox\.?/gi, () => '~');
    m = replaceMapped(m, /[μµ]/g, () => 'mc');
    m = replaceMapped(m, /\*\*/g, () => '');
    m = replaceMapped(m, /\[\d+(?:[,\s-]\d+)*\]/g, () => ' ');
    m = replaceMapped(m, /\]\([^)]*\)/g, () => '');
    m = replaceMapped(m, /[[\]]/g, () => ' ');
    for (let pass = 0; pass < 3; pass++) {
        const before = m.t;
        m = replaceMapped(m, /(\d),(\d{3})(?!\d)/g, (x) => x[1] + x[2]);
        if (m.t === before)
            break;
    }
    m = replaceMapped(m, /(?<![\d.])\.(\d)/g, (x) => '0.' + x[1]);
    m = replaceMapped(m, /\bmm\s?Hg\b/gi, () => 'mmHg');
    m = replaceMapped(m, /×/g, () => 'x');
    m = replaceMapped(m, /(?<![A-Za-z0-9])x(?=\s?\d)/gi, () => MULT);
    return m;
}
/** Canonical units (keys lower-case). Anything else after a number means the number is unitless. */
const UNIT_TABLE = {
    mcg: 'mcg', ug: 'mcg', mg: 'mg', g: 'g', kg: 'kg', ml: 'ml', dl: 'dl', l: 'l', liter: 'l', liters: 'l', litre: 'l', litres: 'l',
    unit: 'units', units: 'units', u: 'units', iu: 'units',
    meq: 'meq', mmol: 'mmol', cm: 'cm', mm: 'mm', hz: 'hz',
    j: 'j', joule: 'j', joules: 'j',
    '%': '%',
    min: 'min', mins: 'min', minute: 'min', minutes: 'min',
    h: 'h', hr: 'h', hrs: 'h', hour: 'h', hours: 'h',
    s: 's', sec: 's', secs: 's', second: 's', seconds: 's',
    mmhg: 'mmhg', bpm: 'bpm',
};
/** Short explicit count-noun list (singular form). */
const COUNT_NOUNS = new Set([
    'dose', 'shock', 'attempt', 'defibrillator', 'pad', 'operator', 'vial', 'ampule', 'tablet', 'capsule', 'bag',
    'syringe', 'bolus', 'breath', 'cycle', 'round', 'day', 'week', 'month', 'year', 'puff', 'spray', 'person',
]);
const ROUTE_WORD_SET = new Set(['iv', 'io', 'im', 'sc', 'sq', 'po', 'pr', 'in', 'et', 'neb', 'nebulized', 'inhaled']);
function canonUnitPart(p) {
    const k = p.toLowerCase();
    if (UNIT_TABLE[k] !== undefined)
        return UNIT_TABLE[k];
    const cands = [k, k.endsWith('es') ? k.slice(0, -2) : '', k.endsWith('s') && !k.endsWith('ss') ? k.slice(0, -1) : ''];
    for (const c of cands)
        if (c && COUNT_NOUNS.has(c))
            return c;
    return null;
}
function canonUnit(raw) {
    if (!raw)
        return '';
    const low = raw.toLowerCase();
    if (low === 'beats/min')
        return 'bpm';
    const parts = low.split('/').map(canonUnitPart);
    if (parts.some((x) => x === null))
        return '';
    return parts.join('/');
}
const TOKEN_RE = new RegExp('(?<pre>(?:(?<![-=])(?<cmp><=|>=|<|>|~)\\s?)?(?:(?<mult>' + MULT + ')\\s?)?)' +
    '(?<a>\\d+(?:\\.\\d+)?)' +
    '(?:\\s?(?:-|to)\\s?(?<b>\\d+(?:\\.\\d+)?))?' +
    '(?:\\s?:\\s?(?<r>\\d+(?:\\.\\d+)?))?' +
    '(?:[\\s-]?(?<unit>[A-Za-z%]+(?:\\/[A-Za-z]+)*)(?:\\s+(?<unit2>[A-Za-z]+))?)?', 'g');
function isLetter(c) {
    return c !== undefined && /[A-Za-z]/.test(c);
}
export function tokenize(text) {
    const m = normalizeMapped(text);
    const t = m.t;
    const out = [];
    const re = new RegExp(TOKEN_RE.source, 'g');
    let x;
    while ((x = re.exec(t)) !== null) {
        const g = x.groups;
        const pre = g.pre ?? '';
        const apos = x.index + pre.length;
        // A number glued to a letter on its left (SpO2, CHA2DS2, H2) is part of a name, not a quantity.
        if (pre === '' && isLetter(t[apos - 1])) {
            const qPrefix = t[apos - 1] === 'q' && !isLetter(t[apos - 2]);
            if (!qPrefix)
                continue;
        }
        const a = parseFloat(g.a);
        let kind = 'single';
        let hi;
        if (g.b !== undefined) {
            kind = 'range';
            hi = parseFloat(g.b);
        }
        else if (g.r !== undefined) {
            kind = 'ratio';
            hi = parseFloat(g.r);
        }
        // "3 IM doses": a route word between the number and its unit is skipped.
        let unitRaw = g.unit ?? '';
        let usedUnit2 = false;
        if (unitRaw && ROUTE_WORD_SET.has(unitRaw.toLowerCase()) && g.unit2) {
            unitRaw = g.unit2;
            usedUnit2 = true;
        }
        let matchText = x[0];
        if (g.unit2 && !usedUnit2)
            matchText = matchText.replace(/\s+[A-Za-z]+$/, '');
        const end = x.index + matchText.length;
        out.push({
            raw: t.slice(x.index, end),
            os: m.s[x.index],
            oe: m.e[end - 1],
            cmp: (g.cmp ?? ''),
            mult: g.mult !== undefined,
            kind,
            lo: a,
            hi,
            unit: canonUnit(unitRaw),
        });
    }
    return out;
}
/** Spans (in the original string) of every numeric token, for number highlighting. */
export function numberSpans(text) {
    return tokenize(text).map((k) => ({ start: k.os, end: k.oe }));
}
// ---------------------------------------------------------------------------
// Matcher
// ---------------------------------------------------------------------------
/** A tile token T is found when S has the same unit (if T has one), value(s), kind, multiplier and
 *  the SAME comparator (none matches only none). A unitless T matches any S with the same value. */
export function tokenFound(T, corpus) {
    for (const S of corpus) {
        if (T.unit && S.unit !== T.unit)
            continue;
        if (S.kind !== T.kind)
            continue;
        if (S.lo !== T.lo)
            continue;
        if (T.kind !== 'single' && S.hi !== T.hi)
            continue;
        if (T.cmp !== S.cmp)
            continue;
        if (T.mult && !S.mult)
            continue;
        return true;
    }
    return false;
}
// ---------------------------------------------------------------------------
// Excerpt normalisation and source lines (HARD rule: excerpts are exact substrings)
// ---------------------------------------------------------------------------
/** Applied identically to source lines and authored excerpts: strip `**`, `[label](url)` -> label, drop `[N]` citation
 *  refs, NFKC, collapse whitespace, remove a leading bullet / list number. */
export function normalizeExcerpt(s) {
    let t = s.normalize('NFKC');
    t = t.replace(/\*\*/g, '');
    t = t.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');
    t = t.replace(/\s*\[\d+(?:[,\s-]+\d+)*\]/g, '');
    t = t.replace(/\s+/g, ' ').trim();
    t = t.replace(/^(?:[•·▪◦*-]|\d+[.)])\s+/, '');
    return t;
}
/** Lines that read as evidence prose are never excerpt sources. */
const SKIP_LINE_RE = /\bet al\b|\btrials?\b|\bpatients\b.*%|\bsurvival\b/i;
/** Negation words (a line's negations must all be inside an excerpt of it). */
const NEG_SRC = "(?<![A-Za-z])(?:no|not|never|avoid\\w*|without|cannot|contraindicat(?:ed|ions?)|don['’]t)(?![A-Za-z])";
function hasNegation(text) {
    return new RegExp(NEG_SRC, 'i').test(text);
}
/** `evidence` (trial / statistics prose) and structural keys are not sources. */
const SKIP_KEYS = new Set(['id', 'next', 'src', 'images', 'calculatorLinks', 'citation', 'module', 'type', 'confidence', 'evidence', 'safetyLevel']);
function collectStrings(v, out) {
    if (typeof v === 'string') {
        out.push(v);
        return;
    }
    if (Array.isArray(v)) {
        for (const it of v)
            collectStrings(it, out);
        return;
    }
    if (v && typeof v === 'object') {
        for (const [k, val] of Object.entries(v)) {
            if (SKIP_KEYS.has(k))
                continue;
            collectStrings(val, out);
        }
    }
}
const PROSE_KEYS = new Set(['title', 'body', 'recommendation']);
function collectEntries(v, out, key = '') {
    if (typeof v === 'string') {
        out.push({ value: v, key });
        return;
    }
    if (Array.isArray(v)) {
        for (const it of v)
            collectEntries(it, out, key);
        return;
    }
    if (v && typeof v === 'object') {
        for (const [k, val] of Object.entries(v)) {
            if (SKIP_KEYS.has(k))
                continue;
            collectEntries(val, out, key === '' ? k : key);
        }
    }
}
/** Every newline-delimited line of every text field of a node, normalised. */
export function nodeLines(node) {
    const entries = [];
    collectEntries(node, entries);
    const out = [];
    entries.forEach((en, sIdx) => {
        let para = 0;
        for (const raw of en.value.split(/\r?\n/)) {
            const text = normalizeExcerpt(raw);
            if (text === '') {
                para++;
                continue;
            }
            out.push({ text, raw: raw.trim(), skip: SKIP_LINE_RE.test(text), sIdx, para, structured: !PROSE_KEYS.has(en.key) });
        }
    });
    return out;
}
export function nodeTitle(node) {
    const t = node?.title;
    return typeof t === 'string' ? t : '';
}
const START_TERM_RE = /(?:\. |; |: | — | - |\()$/;
const END_TERM_RE = /^(?:[.;:](?:\s|$)|\)|\s[—-]\s)/;
function stem(w) {
    if (w.endsWith('ies') && w.length > 5)
        return w.slice(0, -3) + 'y';
    if (w.endsWith('ing') && w.length > 6)
        return w.slice(0, -3);
    if (w.endsWith('ed') && w.length > 5)
        return w.slice(0, -2);
    if (w.endsWith('s') && !w.endsWith('ss') && w.length > 4)
        return w.slice(0, -1);
    return w;
}
function wordSet(text) {
    const out = new Set();
    for (const w of text.split(/[^A-Za-z]+/))
        if (w.length >= 3)
            out.add(stem(w.toLowerCase()));
    return out;
}
/** The `n` lines sharing the most words with `text` (score > 0). */
export function nearestByWords(text, lines, n = 3) {
    const w = wordSet(normalizeExcerpt(text));
    if (w.size === 0)
        return [];
    return lines
        .map((l, i) => {
        const lw = wordSet(l);
        let s = 0;
        for (const x of w)
            if (lw.has(x))
                s++;
        return { l, i, s };
    })
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s || a.i - b.i)
        .slice(0, n)
        .map((x) => x.l.slice(0, 160));
}
/** Verify one excerpt against the live nodes. `allowed` = the tile's declared node ids. */
export function checkExcerpt(ex, allowed, nodes) {
    if (!allowed.includes(ex.nodeId))
        return { ok: false, reason: `excerpt cites node "${ex.nodeId}", which is not in the tile's nodeIds`, nearest: [] };
    const node = nodes.get(ex.nodeId);
    if (!node)
        return { ok: false, reason: `excerpt node "${ex.nodeId}" does not exist`, nearest: [] };
    const text = normalizeExcerpt(ex.text);
    const lines = nodeLines(node);
    const nearest = nearestByWords(text, lines.filter((l) => !l.skip).map((l) => l.text));
    if (text.length < RAPID_EXCERPT_MIN || text.length > RAPID_EXCERPT_MAX) {
        return { ok: false, reason: `excerpt is ${text.length} characters (after normalising), allowed ${RAPID_EXCERPT_MIN}-${RAPID_EXCERPT_MAX}`, nearest };
    }
    let sawSubstring = false;
    let firstWhy = '';
    for (let li = 0; li < lines.length; li++) {
        const L = lines[li];
        if (L.skip)
            continue;
        let from = 0;
        for (;;) {
            const at = L.text.indexOf(text, from);
            if (at < 0)
                break;
            from = at + 1;
            sawSubstring = true;
            const end = at + text.length;
            const before = L.text.slice(0, at);
            const rest = L.text.slice(end);
            const startOk = at === 0 || START_TERM_RE.test(before);
            const endOk = rest === '' || END_TERM_RE.test(rest) || (/[.;:)]$/.test(text) && /^\s/.test(rest));
            if (!startOk || !endOk) {
                if (!firstWhy)
                    firstWhy = `excerpt is not clause-complete: it must start at the line start or after ". " "; " ": " " - " or "(", and end at the line end or before a terminator or ")" (line: "${L.text.slice(0, 120)}")`;
                continue;
            }
            const re = new RegExp(NEG_SRC, 'gi');
            let dropped = null;
            let m;
            while ((m = re.exec(L.text)) !== null) {
                if (m.index < at || m.index + m[0].length > end) {
                    dropped = m[0];
                    break;
                }
            }
            if (dropped !== null) {
                if (!firstWhy)
                    firstWhy = `excerpt drops the negation "${dropped}" that its source line carries (line: "${L.text.slice(0, 120)}")`;
                continue;
            }
            return { ok: true, nearest, lineIdx: li };
        }
    }
    if (sawSubstring)
        return { ok: false, reason: firstWhy, nearest };
    return { ok: false, reason: `excerpt is not word-for-word inside ONE line of node "${ex.nodeId}"`, nearest };
}
/** Context of a VERIFIED excerpt: its governing header, its full source line, and the reasons it can mislead out of context.
 *  `quoted` = every excerpt on the same tile. Returns null when the excerpt does not verify. */
export function excerptContext(ex, nodes, quoted) {
    const v = checkExcerpt(ex, [ex.nodeId], nodes);
    const node = nodes.get(ex.nodeId);
    if (!v.ok || v.lineIdx === undefined || !node)
        return null;
    const lines = nodeLines(node);
    const L = lines[v.lineIdx];
    const text = normalizeExcerpt(ex.text);
    let header;
    // a quoted line that is itself a heading ("Amiodarone:") has no governing header; the search stops at a blank-line break
    for (let j = v.lineIdx - 1; !L.text.endsWith(':') && j >= 0 && v.lineIdx - j <= 12; j--) {
        const P = lines[j];
        if (P.sIdx !== L.sIdx || P.para !== L.para)
            break;
        if (P.text.endsWith(':')) {
            header = P.text;
            break;
        }
        if (/[.!?]$/.test(P.text) && P.text.split(' ').length > 6)
            break;
    }
    const reasons = [];
    if (header) {
        const h = header.replace(/:$/, '');
        const headerQuoted = quoted.some((q) => q.nodeId === ex.nodeId && normalizeExcerpt(q.text).replace(/:$/, '') === h);
        if (!headerQuoted)
            reasons.push(`sits under the header "${header}", which is not quoted on this tile`);
    }
    if (L.structured && text.split(' ').length < 4)
        reasons.push('a structured-field value of fewer than 4 words');
    return { header, full: L.text, reasons, partial: text !== L.text };
}
/** `needle` (already lower-case) inside `hay` (lower-case), not preceded by a word char or ".", not followed by a word char. */
export function containsBounded(hay, needle) {
    if (needle === '')
        return false;
    let from = 0;
    for (;;) {
        const at = hay.indexOf(needle, from);
        if (at < 0)
            return false;
        from = at + 1;
        const b = hay[at - 1];
        const a = hay[at + needle.length];
        if (b !== undefined && /[\w.]/.test(b))
            continue;
        if (a !== undefined && /\w/.test(a))
            continue;
        return true;
    }
}
const ROUTE_CASE = ['IN'];
const ROUTE_ANY = ['iv', 'im', 'io', 'po', 'sc', 'sq', 'neb', 'nebulized', 'inhaled'];
/** Route words on a face field (iv / im / io / po / sc / sq / neb / nebulized / inhaled in any case; "IN" upper-case only). */
export function routeWordsIn(text) {
    const out = [];
    for (const w of ROUTE_CASE)
        if (new RegExp(`(?<![A-Za-z0-9])${w}(?![A-Za-z0-9])`).test(text))
            out.push(w);
    for (const w of ROUTE_ANY)
        if (new RegExp(`(?<![A-Za-z0-9])${w}(?![A-Za-z0-9])`, 'i').test(text))
            out.push(w);
    return out;
}
// ---------------------------------------------------------------------------
// Drug helpers
// ---------------------------------------------------------------------------
export function weightCalcList(d) {
    if (!d.weightCalc)
        return [];
    return Array.isArray(d.weightCalc) ? [...d.weightCalc] : [d.weightCalc];
}
/** Strings of the one dose entry the FIGURE may quote: regimen + synthesised weightCalc tokens (not the indication). */
export function doseCorpusStrings(d) {
    const out = [d.regimen];
    for (const wc of weightCalcList(d)) {
        out.push(`${wc.dosePerKg} ${wc.unit}/kg`);
        if (wc.maxDose !== undefined)
            out.push(`${wc.maxDose} ${wc.unit}`);
        if (wc.concentration) {
            out.push(wc.concentration.displayName);
            out.push(`${wc.concentration.amount} ${wc.unit}/mL`);
        }
    }
    return out;
}
export function findDose(drug, indication) {
    return drug?.dosing.find((d) => d.indication === indication);
}
function wcKey(w) {
    return canonicalJson({
        dosePerKg: w.dosePerKg, unit: w.unit, maxDose: w.maxDose, dailyDivided: w.dailyDivided, label: w.label,
        concentration: w.concentration ? { amount: w.concentration.amount, perMl: w.concentration.perMl, displayName: w.concentration.displayName } : undefined,
    });
}
/** Name words of a drug (name + genericName): 4+ letters; a name shorter than 4 letters counts whole. */
export function drugNameWords(drug) {
    const out = new Set();
    for (const n of [drug?.name, drug?.genericName]) {
        if (!n)
            continue;
        for (const w of n.toLowerCase().split(/[^a-z]+/))
            if (w.length >= 4)
                out.add(w);
        const whole = n.toLowerCase().replace(/[^a-z]/g, '');
        if (whole.length > 0 && whole.length < 4)
            out.add(whole);
    }
    return [...out];
}
/** Dose-unit tokens: mass / volume / amount units and any per-kg or per-minute rate. */
const DOSE_UNITS = new Set(['mg', 'mcg', 'g', 'ml', 'units', 'meq', 'mmol']);
export function isDoseToken(t) {
    return DOSE_UNITS.has(t.unit) || t.unit.includes('/kg') || t.unit.includes('/min');
}
/** sha256 of the live regimen text of every drug tile (the approval pins these). Tiles whose drug/dose is missing are absent. */
export function regimenPins(strip, getDrug) {
    const out = {};
    for (const v of strip.variants) {
        for (const t of v.tiles) {
            if (t.layout !== 'drug')
                continue;
            const dose = findDose(getDrug(t.drug.id), t.drug.indication);
            if (dose && typeof dose.regimen === 'string')
                out[t.id] = sha256Hex(dose.regimen);
        }
    }
    return out;
}
// ---------------------------------------------------------------------------
// Public helpers for the proof page and the card
// ---------------------------------------------------------------------------
function nodeMap(ctx) {
    const m = new Map();
    for (const n of ctx.nodes)
        m.set(n.id, n);
    return m;
}
/** Per declared node: id, title, and its quotable source lines (normalised). */
export function tileSources(tile, ctx) {
    const nodes = nodeMap(ctx);
    return tile.nodeIds.map((id) => {
        const n = nodes.get(id);
        return { nodeId: id, title: nodeTitle(n), lines: n ? nodeLines(n).filter((l) => !l.skip).map((l) => l.text) : [] };
    });
}
/** Every excerpt on a tile with the field it sits in. */
export function tileExcerpts(tile) {
    const out = [];
    if (tile.warning)
        out.push({ field: 'warning', ex: tile.warning });
    const lines = tile.layout === 'drug' ? tile.lines ?? [] : tile.lines;
    lines.forEach((ex, i) => out.push({ field: `lines[${i}]`, ex }));
    return out;
}
/** The authored face fields. */
export function tileFields(tile) {
    const f = [{ name: 'action', text: tile.action }, { name: 'figure', text: tile.figure }];
    if (tile.condition !== undefined)
        f.push({ name: 'condition', text: tile.condition });
    return f;
}
const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function flagId(variantId, tileId, field, kind, token) {
    return `${variantId}/${tileId}/${field}/${kind}/${token.trim().toLowerCase().replace(/\s+/g, '-')}`;
}
export function flagIds(r) {
    return Array.from(new Set(r.flags.map((f) => f.id))).sort();
}
/** missing = flags the strip has now that are not acknowledged; extra = acknowledged ids that are not flagged now. */
export function ackDiff(r, acked) {
    const now = new Set(flagIds(r));
    const have = new Set(acked);
    return { missing: [...now].filter((x) => !have.has(x)).sort(), extra: [...have].filter((x) => !now.has(x)).sort() };
}
/** Why an approval does not hold right now (empty = it holds). */
export function approvalDropReasons(strip, live, approval, livePins) {
    if (!approval)
        return ['no approval'];
    if (approval.stripHash !== stripHash(strip))
        return ['the strip was edited after approval'];
    const why = [];
    if (!live.ok)
        why.push(`hard checks fail on live data (${live.failures.length}): ${live.failures[0]?.message ?? ''}`);
    const miss = ackDiff(live, approval.ackedFlags ?? []).missing;
    if (miss.length)
        why.push(`new unacknowledged flag(s): ${miss.join(', ')}`);
    const pins = approval.regimenPins ?? {};
    for (const v of strip.variants) {
        for (const t of v.tiles) {
            if (t.layout !== 'drug')
                continue;
            if (livePins[t.id] === undefined)
                why.push(`tile ${t.id}: live regimen not found`);
            else if (pins[t.id] !== livePins[t.id])
                why.push(`tile ${t.id}: live regimen text differs from the approved pin`);
        }
    }
    return why;
}
/** Runtime rule: live iff the strip hash matches, the hard checks (incl. every excerpt) pass on LIVE data, every live flag was
 *  acknowledged, and every drug tile's live regimen hashes to its pin. `livePins` = regimenPins() over the live drug data. */
export function approvalHolds(strip, live, approval, livePins) {
    return approvalDropReasons(strip, live, approval, livePins).length === 0;
}
function reach(start, nodes) {
    const seen = new Set();
    const stack = [start];
    while (stack.length && seen.size < 2000) {
        const id = stack.pop();
        if (seen.has(id))
            continue;
        seen.add(id);
        const n = nodes.get(id);
        if (!n)
            continue;
        if (n.next)
            stack.push(n.next);
        for (const o of n.options ?? [])
            stack.push(o.next);
    }
    return seen;
}
/** Breadth-first discovery order from `start` (node.next first, then options in order). */
function bfsOrder(start, nodes) {
    const order = new Map();
    const queue = [start];
    while (queue.length && order.size < 2000) {
        const id = queue.shift();
        if (order.has(id))
            continue;
        order.set(id, order.size);
        const n = nodes.get(id);
        if (!n)
            continue;
        if (n.next)
            queue.push(n.next);
        for (const o of n.options ?? [])
            queue.push(o.next);
    }
    return order;
}
const paragraphs = (s) => String(s).split(/\r?\n/).map(normalizeExcerpt).filter((x) => x !== '');
export function verifyStrip(strip, ctx) {
    const failures = [];
    const flagMap = new Map();
    const reports = [];
    const nodes = nodeMap(ctx);
    const treeId = strip.treeId;
    const fail = (variantId, tileId, field, kind, message, extra) => {
        failures.push({ treeId, variantId, tileId, field, kind, message: `${treeId} > ${variantId || '-'} > ${tileId || '-'} > ${field}: ${message}`, ...extra });
    };
    const addFlag = (variantId, tileId, field, kind, token, text, nearest) => {
        const id = flagId(variantId, tileId, field, kind, token);
        if (!flagMap.has(id))
            flagMap.set(id, { id, kind, variantId, tileId, field, token, text, nearest });
    };
    // ---- strip-level structure
    const variants = strip.variants;
    if (variants.length < 1)
        fail('', '', 'variants', 'structure', 'a strip needs at least 1 variant');
    let forkOptions = [];
    if (variants.length > 1) {
        if (!strip.forkNodeId)
            fail('', '', 'forkNodeId', 'structure', 'forkNodeId is required when there is more than 1 variant');
        else if (!nodes.has(strip.forkNodeId))
            fail('', '', 'forkNodeId', 'structure', `fork node "${strip.forkNodeId}" does not exist`);
        else {
            forkOptions = nodes.get(strip.forkNodeId).options ?? [];
            if (forkOptions.length === 0)
                fail('', '', 'forkNodeId', 'fork', `fork node "${strip.forkNodeId}" has no options`);
        }
    }
    else if (strip.forkNodeId) {
        fail('', '', 'forkNodeId', 'structure', 'forkNodeId must be absent when there is only 1 variant');
    }
    const entryId = ctx.entryNodeId ?? ctx.nodes[0]?.id ?? '';
    const seenVariant = new Set();
    const seenTile = new Set();
    const usedOptions = new Set();
    let excerptsTotal = 0;
    for (const v of variants) {
        if (!KEBAB.test(v.id))
            fail(v.id, '', 'variant.id', 'structure', `variant id "${v.id}" is not kebab-case`);
        if (seenVariant.has(v.id))
            fail(v.id, '', 'variant.id', 'structure', `duplicate variant id "${v.id}"`);
        seenVariant.add(v.id);
        if (v.tiles.length < 1 || v.tiles.length > RAPID_MAX_TILES) {
            fail(v.id, '', 'tiles', 'structure', `a variant needs 1-${RAPID_MAX_TILES} tiles, has ${v.tiles.length}`);
        }
        if (v.label.trim() === '')
            fail(v.id, '', 'label', 'structure', 'empty variant label');
        // label EQUALS a fork option label; tiles must not belong to a different option's subtree
        let optIdx = -1;
        if (variants.length > 1 && forkOptions.length > 0) {
            optIdx = forkOptions.findIndex((o) => o.label.trim() === v.label.trim());
            if (optIdx < 0) {
                fail(v.id, '', 'label', 'fork', `variant label "${v.label}" does not equal any option label of fork node "${strip.forkNodeId}" (${forkOptions.map((o) => `"${o.label.trim()}"`).join(', ')})`);
            }
            else if (usedOptions.has(optIdx)) {
                fail(v.id, '', 'label', 'fork', `two variants map to the fork option "${forkOptions[optIdx].label.trim()}"`);
            }
            else
                usedOptions.add(optIdx);
        }
        // traversal order (flag): BFS from the entry node, or from this variant's fork option
        const startId = optIdx >= 0 && forkOptions[optIdx] ? forkOptions[optIdx].next : entryId;
        const order = bfsOrder(startId, nodes);
        let prevIdx = -1;
        for (const tile of v.tiles) {
            const f = (field, kind, message, extra) => fail(v.id, tile.id, field, kind, message, extra);
            if (!KEBAB.test(tile.id))
                f('id', 'structure', `tile id "${tile.id}" is not kebab-case`);
            if (seenTile.has(tile.id))
                f('id', 'structure', `duplicate tile id "${tile.id}" (ids are unique across the whole strip)`);
            seenTile.add(tile.id);
            const actionWords = tile.action.trim().split(/\s+/).filter(Boolean).length;
            if (actionWords < 1 || actionWords > 3)
                f('action', 'structure', `action must be 1-3 words, has ${actionWords}`);
            if (tile.action.length > RAPID_MAX_ACTION_CHARS)
                f('action', 'structure', `action is ${tile.action.length} characters, max ${RAPID_MAX_ACTION_CHARS} (it must fit a tile)`);
            if (tile.figure.length > RAPID_MAX_FIGURE_CHARS)
                f('figure', 'structure', `figure is ${tile.figure.length} characters, max ${RAPID_MAX_FIGURE_CHARS} (it must fit a tile)`);
            if (tile.condition !== undefined && tile.condition.length > RAPID_MAX_CONDITION_CHARS)
                f('condition', 'structure', `condition is ${tile.condition.length} characters, max ${RAPID_MAX_CONDITION_CHARS}`);
            if (tile.figure.trim() === '')
                f('figure', 'structure', 'empty figure');
            // ---- declared nodes
            const declared = [];
            for (const id of tile.nodeIds) {
                const n = nodes.get(id);
                if (!n)
                    f('nodeIds', 'source', `source node "${id}" does not exist in consult "${treeId}"`);
                else
                    declared.push({ id, node: n });
            }
            const nodeStrings = [];
            let emptyNode = false;
            for (const d of declared) {
                const strs = [];
                collectStrings(d.node, strs);
                if (strs.join('').trim() === '') {
                    emptyNode = true;
                    f('nodeIds', 'source', `source node "${d.id}" has an empty corpus (the gate did not read real data)`);
                }
                nodeStrings.push(...strs);
            }
            // quotable lines only: evidence-style lines feed neither excerpts nor face numbers / words
            const declaredLines = declared.flatMap((d) => nodeLines(d.node).filter((l) => !l.skip).map((l) => ({ ...l, nodeId: d.id })));
            const allNodeLines = declaredLines.map((l) => l.text);
            const nodeTokens = allNodeLines.flatMap((l) => tokenize(l));
            const nodeWords = new Set();
            for (const l of allNodeLines)
                for (const w of wordSet(l))
                    nodeWords.add(w);
            // ---- drug resolution
            let dose;
            let drugEntry;
            let drugTokens = [];
            const drugWords = new Set();
            let regimenParas = [];
            let regimenSentences = [];
            if (tile.layout === 'drug') {
                const drug = ctx.getDrug(tile.drug.id);
                drugEntry = drug;
                dose = findDose(drug, tile.drug.indication);
                if (!drug)
                    f('drug.id', 'source', `drug "${tile.drug.id}" does not exist`);
                else if (!dose)
                    f('drug.indication', 'source', `drug "${tile.drug.id}" has no dose with the exact indication "${tile.drug.indication}"`);
                else {
                    const corpus = doseCorpusStrings(dose);
                    drugTokens = corpus.flatMap((s) => tokenize(s));
                    for (const s of corpus)
                        for (const w of wordSet(normalizeExcerpt(s)))
                            drugWords.add(w);
                    regimenParas = paragraphs(dose.regimen);
                    regimenSentences = regimenParas.flatMap((p) => p.split(/(?<=[.!?])\s+/)).filter((x) => x !== '');
                    // weightCalcs must deep-equal the live list; absent iff the dose has none
                    const live = weightCalcList(dose).map(wcKey);
                    const mine = (tile.drug.weightCalcs ?? []).map(wcKey);
                    if (tile.drug.weightCalcs !== undefined && tile.drug.weightCalcs.length === 0)
                        f('drug.weightCalcs', 'weight', 'weightCalcs is present but empty: leave it out when the dose has none');
                    else if (live.length === 0 && mine.length > 0)
                        f('drug.weightCalcs', 'weight', 'weightCalcs snapshot is set but the dose has no weightCalc');
                    else if (live.length > 0 && mine.length === 0)
                        f('drug.weightCalcs', 'weight', `the dose has ${live.length} weightCalc(s) in the store: the tile must snapshot all of them, in order`);
                    else if (live.length !== mine.length || live.some((k, i) => k !== mine[i]))
                        f('drug.weightCalcs', 'weight', "weightCalcs must deep-equal the dose entry's FULL weightCalc list, in order; the store may have changed");
                    const act = tile.action.toLowerCase();
                    const named = drugNameWords(drug).some((w) => (w.length < 4 ? new RegExp(`(?<![a-z])${w}(?![a-z])`).test(act) : act.includes(w)));
                    if (!named)
                        f('action', 'drug', `action "${tile.action}" does not contain a word of the drug's name (${[drug.name, drug.genericName].filter(Boolean).join(' / ')})`);
                }
            }
            // ---- lines / image structure
            const lines = tile.layout === 'drug' ? tile.lines ?? [] : tile.lines;
            if (tile.layout === 'steps' && (lines.length < 1 || lines.length > RAPID_STEPS_MAX_LINES))
                f('lines', 'structure', `a steps tile needs 1-${RAPID_STEPS_MAX_LINES} lines, has ${lines.length}`);
            if (tile.layout === 'drug' && lines.length > RAPID_DRUG_MAX_LINES)
                f('lines', 'structure', `a drug tile takes at most ${RAPID_DRUG_MAX_LINES} lines, has ${lines.length}`);
            if (tile.layout === 'steps' && tile.image) {
                const n = nodes.get(tile.image.nodeId);
                if (!n)
                    f('image', 'source', `image node "${tile.image.nodeId}" does not exist`);
                else if (!n.images || !n.images[tile.image.index])
                    f('image', 'source', `node "${tile.image.nodeId}" has no image at index ${tile.image.index}`);
            }
            // ---- excerpts (HARD): authored in normalised form, verbatim, declared node, one line, clause-complete, negations kept
            let excerptsChecked = 0;
            const tileEx = tileExcerpts(tile);
            const quotedNodes = new Set([tile.nodeIds[0], ...tileEx.map((x) => x.ex.nodeId), ...(tile.layout === 'steps' && tile.image ? [tile.image.nodeId] : [])]);
            for (const id of tile.nodeIds)
                if (!quotedNodes.has(id))
                    f('nodeIds', 'source', `nodeId "${id}" is neither the primary node nor quoted by a line, warning or image: remove it or quote it`);
            for (const { field, ex } of tileEx) {
                excerptsChecked++;
                if (ex.text.replace(/\s+/g, ' ').trim() !== normalizeExcerpt(ex.text)) {
                    f(field, 'excerpt', `excerpt text must equal its own normalised form (no ** bold marks, [N] refs, link markup, leading bullet or odd spacing): "${normalizeExcerpt(ex.text)}"`);
                    continue;
                }
                const verdict = checkExcerpt(ex, tile.nodeIds, nodes);
                if (!verdict.ok) {
                    f(field, 'excerpt', verdict.reason ?? 'excerpt does not verify', { nearest: verdict.nearest });
                    continue;
                }
                const cx = excerptContext(ex, nodes, tileEx.map((x) => x.ex));
                if (cx && cx.reasons.length) {
                    addFlag(v.id, tile.id, field, 'context', `${ex.nodeId}:${normalizeExcerpt(ex.text).split(' ').slice(0, 6).join(' ')}`, ex.text, [...(cx.header ? [`header: ${cx.header}`] : []), `full line: ${cx.full}`, ...cx.reasons.map((r) => `reason: ${r}`)]);
                }
            }
            excerptsTotal += excerptsChecked;
            // primary node must not be reachable only through a different fork option
            if (optIdx >= 0 && forkOptions[optIdx]) {
                const own = reach(forkOptions[optIdx].next, nodes);
                const primary = tile.nodeIds[0];
                if (!own.has(primary)) {
                    const other = forkOptions.findIndex((o, j) => j !== optIdx && reach(o.next, nodes).has(primary));
                    if (other >= 0)
                        f('nodeIds', 'fork', `primary node "${primary}" is reachable only through the fork option "${forkOptions[other].label.trim()}", not through "${forkOptions[optIdx].label.trim()}"`);
                }
            }
            // ---- face numbers: value + unit + comparator exist in the declared source
            const bothTokens = nodeTokens.concat(drugTokens);
            const nearestTokens = (T, pool) => {
                const same = pool.filter((S) => S.unit === T.unit);
                return [...(same.length ? same : pool)].sort((a, b) => Math.abs(a.lo - T.lo) - Math.abs(b.lo - T.lo)).slice(0, 4).map((S) => S.raw.trim());
            };
            let tokensChecked = 0;
            let numeric = false;
            const figTokens = tokenize(tile.figure);
            const checkField = (name, text, pool, where) => {
                for (const T of tokenize(text)) {
                    tokensChecked++;
                    numeric = true;
                    if (!tokenFound(T, pool))
                        f(name, 'token', `token "${T.raw.trim()}" not found in ${where}`, { token: T.raw.trim(), nearest: nearestTokens(T, pool) });
                }
            };
            if (tile.layout === 'drug') {
                checkField('figure', tile.figure, drugTokens, 'the drug entry (regimen / weightCalc)');
                if (tile.condition !== undefined)
                    checkField('condition', tile.condition, bothTokens, 'its source nodes or the drug entry');
            }
            else {
                checkField('figure', tile.figure, nodeTokens, 'its source nodes');
                if (tile.condition !== undefined)
                    checkField('condition', tile.condition, nodeTokens, 'its source nodes');
            }
            checkField('action', tile.action, bothTokens, 'its source nodes or the drug entry');
            // numberless figure: every 3+ letter word exists in the declared node text (a drug tile may also use its regimen)
            let figureWordsChecked = 0;
            if (figTokens.length === 0 && tile.figure.trim() !== '') {
                const figWords = tile.figure.split(/[^A-Za-z]+/).filter((w) => w.length >= 3);
                if (figWords.length === 0)
                    f('figure', 'figure-word', 'numberless figure has no word of 3+ letters to verify');
                else {
                    figureWordsChecked = 1;
                    for (const w of figWords) {
                        const st = stem(w.toLowerCase());
                        if (!nodeWords.has(st) && !(tile.layout === 'drug' && drugWords.has(st)))
                            f('figure', 'figure-word', `numberless figure: word "${w}" does not appear in its declared source text`, { token: w });
                    }
                }
            }
            if (tokensChecked + figureWordsChecked + excerptsChecked < 1)
                f('figure', 'structure', 'tile contributes nothing to verify');
            // ---- route words on the face (HARD): must appear in the regimen (drug tiles) / the declared node lines (steps tiles)
            const routeSrc = (tile.layout === 'drug' ? regimenParas : allNodeLines).join('\n');
            for (const fld of tileFields(tile)) {
                for (const rw of routeWordsIn(fld.text)) {
                    if (!routeWordsIn(routeSrc).includes(rw))
                        f(fld.name, 'route-word', `route word "${rw}" does not appear in ${tile.layout === 'drug' ? "the drug's regimen" : 'the tile\'s declared node text'}`, { token: rw });
                }
            }
            // ---- drug-as-steps (gate time: needs the whole drug store and the findings file). Scans the face AND the quoted lines,
            // and any drug link on a quoted line's source. The satisfying finding is kind "gap" with the detected drugId.
            if (tile.layout === 'steps' && ctx.allDrugs) {
                // one unit per text: the face, and each quoted line. A unit hits a drug when it names the drug (leading word of its
                // name / genericName, 5+ letters, or a #/drug/<id> link on the quoted line's source) AND carries a dose token itself.
                const lead = (n) => (n ?? '').toLowerCase().split(/[^a-z]+/).filter(Boolean)[0] ?? '';
                const units = [{ text: tile.action + ' ' + tile.figure, links: new Set() }];
                for (const { ex } of tileEx) {
                    const t = normalizeExcerpt(ex.text);
                    const links = new Set();
                    const n = nodes.get(ex.nodeId);
                    for (const l of n ? nodeLines(n) : [])
                        if (l.text.includes(t)) {
                            const re = /#\/drug\/([a-z0-9-]+)/gi;
                            let m;
                            while ((m = re.exec(l.raw)) !== null)
                                links.add(m[1].toLowerCase());
                        }
                    units.push({ text: t, links });
                }
                const detected = new Map();
                for (const u of units) {
                    if (!tokenize(u.text).some(isDoseToken))
                        continue;
                    const words = new Set(u.text.toLowerCase().split(/[^a-z]+/).filter(Boolean));
                    for (const d of ctx.allDrugs) {
                        const named = [lead(d.name), lead(d.genericName)].some((w) => w.length >= 5 && words.has(w));
                        if (named || u.links.has(d.id.toLowerCase()))
                            detected.set(d.id, d);
                    }
                }
                // a figure with a dose-unit token needs a gap finding for this tile even when no drug name is detected ("Push dig / 0.25-0.5 mg")
                if (detected.size === 0 && figTokens.some(isDoseToken) && !(ctx.findings ?? []).some((x) => x.tileId === tile.id && x.kind === 'gap')) {
                    f('layout', 'drug-as-steps', `this steps tile's figure carries a dose ("${tile.figure}"): make it a drug tile, or add a finding of kind "gap" with tileId "${tile.id}" explaining why it is not one`);
                }
                for (const hit of detected.values()) {
                    const ok = (ctx.findings ?? []).some((x) => x.tileId === tile.id && x.kind === 'gap' && x.drugId === hit.id);
                    if (!ok)
                        f('layout', 'drug-as-steps', `this steps tile names a drug ("${hit.name ?? hit.id}", id ${hit.id}) with a dose: make it a drug tile, or add a finding of kind "gap" with tileId "${tile.id}" and drugId "${hit.id}" explaining why the store has no entry for this use`, { token: hit.id });
                }
            }
            // ---- FLAGS
            const regimenWhole = regimenParas;
            for (const fld of tileFields(tile)) {
                if (fld.text.trim() === '')
                    continue;
                const drugFigure = tile.layout === 'drug' && fld.name === 'figure';
                // whole source lines for the phrase test; sentence-level regimen lines for the negation comparison
                const wholeLines = drugFigure ? regimenWhole : tile.layout === 'drug' ? allNodeLines.concat(regimenWhole) : allNodeLines;
                const pickLines = drugFigure ? regimenSentences : tile.layout === 'drug' ? allNodeLines.concat(regimenSentences) : allNodeLines;
                const norm = normalizeExcerpt(fld.text).toLowerCase();
                // phrase: not a contiguous, word-bounded normalised substring of ONE source line
                if (norm !== '' && !wholeLines.some((l) => containsBounded(l.toLowerCase(), norm))) {
                    addFlag(v.id, tile.id, fld.name, 'phrase', fld.text, fld.text, nearestByWords(fld.text, pickLines));
                }
                // negation, every field: compare with the exactly matching line, else the line carrying the number, else the best-overlap line
                const fieldNeg = hasNegation(fld.text);
                const exact = pickLines.filter((l) => containsBounded(l.toLowerCase(), norm));
                const fw = wordSet(normalizeExcerpt(fld.text));
                const score = (l) => { const lw = wordSet(l); let n = 0; for (const w of fw)
                    if (lw.has(w))
                        n++; return n; };
                let compare = exact;
                if (compare.length === 0) {
                    const toks = tokenize(fld.text);
                    const withNum = toks.length ? pickLines.filter((l) => toks.some((T) => tokenFound(T, tokenize(l)))) : [];
                    const pool = withNum.length ? withNum : pickLines;
                    let best;
                    let bs = 0;
                    for (const l of pool) {
                        const sc = score(l);
                        if (sc > bs || (withNum.length && best === undefined)) {
                            best = l;
                            bs = sc;
                        }
                    }
                    compare = best !== undefined && (bs > 0 || withNum.length) ? [best] : [];
                }
                if (compare.length > 0 && !compare.some((l) => hasNegation(l) === fieldNeg)) {
                    addFlag(v.id, tile.id, fld.name, 'negation', fld.text, fld.text, [compare[0].slice(0, 160)]);
                }
            }
            // multi-dose: a drug figure while the regimen holds more than one distinct dose token
            if (tile.layout === 'drug' && dose) {
                const seen = new Map();
                for (const T of tokenize(String(dose.regimen)))
                    if (isDoseToken(T))
                        seen.set(`${T.cmp}|${T.kind}|${T.lo}|${T.hi ?? ''}|${T.unit}`, T.raw.trim());
                if (seen.size > 1)
                    addFlag(v.id, tile.id, 'figure', 'multi-dose', tile.figure, tile.figure, [`the regimen holds ${seen.size} distinct dose tokens: ${[...seen.values()].join(' | ')}`]);
                // store-node: a figure token absent from the declared node text
                for (const T of figTokens) {
                    if (!tokenFound(T, nodeTokens))
                        addFlag(v.id, tile.id, 'figure', 'store-node', T.raw.trim(), tile.figure, [`"${T.raw.trim()}" is in the drug store but not in the declared node text (the store and the consult disagree, or the node is silent)`]);
                }
            }
            // order: primary nodes follow the consult's traversal order
            const pi = order.get(tile.nodeIds[0]);
            if (pi === undefined)
                addFlag(v.id, tile.id, 'nodeIds', 'order', tile.nodeIds[0], tile.nodeIds[0], [`"${tile.nodeIds[0]}" is not reachable from "${startId || 'the entry node'}"`]);
            else {
                if (pi < prevIdx)
                    addFlag(v.id, tile.id, 'nodeIds', 'order', tile.nodeIds[0], tile.nodeIds[0], [`an earlier tile's primary node comes later in the consult than "${tile.nodeIds[0]}"`]);
                prevIdx = Math.max(prevIdx, pi);
            }
            // outside-branch: any cited node outside this variant's subtree
            const own = reach(startId, nodes);
            for (const id of tile.nodeIds)
                if (nodes.has(id) && !own.has(id))
                    addFlag(v.id, tile.id, 'nodeIds', 'outside-branch', id, id, [`"${id}" is not reachable from ${optIdx >= 0 ? `the fork option "${forkOptions[optIdx].label.trim()}"` : `"${startId}"`}`]);
            // no-condition: a critical / warning node needs a condition or a warning; a negated line naming the drug needs a condition
            if (tile.condition === undefined && tile.warning === undefined) {
                const hot = declared.find((d) => d.node.safetyLevel === 'critical' || d.node.safetyLevel === 'warning');
                if (hot)
                    addFlag(v.id, tile.id, 'condition', 'no-condition', hot.id, '(no condition or warning)', [`node "${hot.id}" is marked ${hot.node.safetyLevel}`]);
            }
            if (tile.layout === 'drug' && tile.condition === undefined && drugEntry) {
                const nameWords = drugNameWords(drugEntry);
                const neg = declaredLines.find((l) => hasNegation(l.text) && nameWords.some((w) => new RegExp(`(?<![a-z])${w}`).test(l.text.toLowerCase())));
                if (neg)
                    addFlag(v.id, tile.id, 'condition', 'no-condition', `negated-${neg.nodeId}`, '(no condition)', [`node "${neg.nodeId}" has a negated line naming the drug: ${neg.text.slice(0, 160)}`, 'a warning alone does not clear this']);
            }
            reports.push({ variantId: v.id, tileId: tile.id, tokensChecked, figureWordsChecked, excerptsChecked, numeric, nodeCorpusEmpty: emptyNode });
        }
    }
    // critical-coverage (gate time: only when the caller supplies the findings): every critical-action node is cited or listed in a finding
    if (ctx.findings !== undefined && ctx.criticalActions) {
        const cited = new Set();
        for (const v of variants)
            for (const t of v.tiles)
                for (const id of t.nodeIds)
                    cited.add(id);
        const listed = new Set((ctx.findings ?? []).flatMap((x) => x.nodeIds));
        for (const c of ctx.criticalActions) {
            if (!cited.has(c.nodeId) && !listed.has(c.nodeId))
                fail('', '', 'criticalActions', 'critical-coverage', `critical action "${c.text.slice(0, 90)}" (node ${c.nodeId}) is not cited by any tile and not listed in a finding's nodeIds`, { token: c.nodeId });
        }
    }
    const failingTileIds = Array.from(new Set(failures.filter((x) => x.tileId).map((x) => x.tileId)));
    return {
        treeId,
        ok: failures.length === 0,
        failures,
        flags: [...flagMap.values()],
        tiles: reports,
        tokensChecked: reports.reduce((n, r) => n + r.tokensChecked, 0),
        excerptsChecked: excerptsTotal,
        failingTileIds,
    };
}
/** Never throws. A malformed live row (or any bug) fails closed. */
export function verifyStripSafe(strip, ctx) {
    try {
        return verifyStrip(strip, ctx);
    }
    catch (e) {
        return {
            treeId: strip.treeId, ok: false, tiles: [], flags: [], tokensChecked: 0, excerptsChecked: 0, failingTileIds: [],
            failures: [{ treeId: strip.treeId, variantId: '', tileId: '', field: 'verify', kind: 'structure', message: `${strip.treeId}: verifier threw: ${e?.message ?? String(e)}` }],
        };
    }
}
/** The `--hash` that binds an approval to what was proofed: first 12 chars of sha256(stripHash + sorted regimenPins + sorted flag ids).
 *  A change to the strip, to a live regimen, or to the flag set between proofing and approving changes it. */
export function approvalBinding(strip, getDrug, result) {
    const pins = regimenPins(strip, getDrug);
    const pinText = Object.keys(pins).sort().map((k) => `${k}=${pins[k]}`).join(',');
    return sha256Hex([stripHash(strip), pinText, flagIds(result).join('\n')].join('\n--\n')).slice(0, 12);
}
/** One status per strip: draft (no approval) / live / dropped (approved but does not hold now, with reasons). */
export function approvalStatus(strip, ctx, approval) {
    const result = verifyStripSafe(strip, ctx);
    if (!approval)
        return { status: 'draft', reasons: [], result };
    const reasons = approvalDropReasons(strip, result, approval, regimenPins(strip, ctx.getDrug));
    return { status: reasons.length ? 'dropped' : 'live', reasons, result };
}
// ---------------------------------------------------------------------------
// Findings (owner notes) checks
// ---------------------------------------------------------------------------
const FINDING_KINDS = ['conflict', 'gap', 'missing-weightcalc', 'node-silent', 'other'];
/** Returns the parsed findings, or a string describing why `raw` is not RapidFinding[]. */
export function parseFindings(raw) {
    if (!Array.isArray(raw))
        return 'findings file must be a JSON array';
    for (let i = 0; i < raw.length; i++) {
        const f = raw[i];
        if (!f || typeof f !== 'object')
            return `finding ${i} is not an object`;
        if (typeof f.kind !== 'string' || !FINDING_KINDS.includes(f.kind))
            return `finding ${i} has an invalid kind`;
        if (!Array.isArray(f.nodeIds) || !f.nodeIds.every((x) => typeof x === 'string'))
            return `finding ${i} needs nodeIds: string[]`;
        if (typeof f.text !== 'string' || f.text.trim() === '')
            return `finding ${i} needs text`;
        if (f.tileId !== undefined && typeof f.tileId !== 'string')
            return `finding ${i} tileId must be a string`;
        if (f.drugId !== undefined && typeof f.drugId !== 'string')
            return `finding ${i} drugId must be a string`;
    }
    return raw;
}
/** Mutate the first numeric token of a face field to a value that exists nowhere in the tile's sources. */
export function makeCanary(strip, ctx) {
    const nodes = nodeMap(ctx);
    const clone = JSON.parse(JSON.stringify(strip));
    for (const v of clone.variants) {
        for (let ti = 0; ti < v.tiles.length; ti++) {
            const tile = strip.variants.find((x) => x.id === v.id).tiles[ti];
            const all = [];
            for (const id of tile.nodeIds) {
                const n = nodes.get(id);
                if (!n)
                    continue;
                const strs = [];
                collectStrings(n, strs);
                for (const s of strs)
                    all.push(...tokenize(s));
            }
            if (tile.layout === 'drug') {
                const dose = findDose(ctx.getDrug(tile.drug.id), tile.drug.indication);
                if (dose)
                    for (const s of doseCorpusStrings(dose))
                        all.push(...tokenize(s));
            }
            for (const fld of tileFields(tile)) {
                const toks = tokenize(fld.text);
                if (toks.length === 0)
                    continue;
                const T = toks[0];
                let nv = T.lo * 1000 + 7;
                while (all.some((S) => S.lo === nv || S.hi === nv))
                    nv += 0.123;
                const orig = fld.text.slice(T.os, T.oe);
                const num = /\d[\d,]*(?:\.\d+)?|\.\d+/.exec(orig);
                if (!num)
                    continue;
                const mutated = fld.text.slice(0, T.os) + orig.replace(num[0], String(nv)) + fld.text.slice(T.oe);
                v.tiles[ti][fld.name] = mutated;
                return { strip: clone, variantId: v.id, tileId: tile.id, field: fld.name, token: String(nv) };
            }
        }
    }
    return null;
}
/** Change ONE character of the first excerpt found (a letter inside its text becomes a different letter). */
export function makeExcerptCanary(strip) {
    const clone = JSON.parse(JSON.stringify(strip));
    for (const v of clone.variants) {
        for (const t of v.tiles) {
            const targets = [];
            if (t.warning)
                targets.push({ field: 'warning', ex: t.warning });
            (t.lines ?? []).forEach((ex, i) => targets.push({ field: `lines[${i}]`, ex }));
            for (const { field, ex } of targets) {
                const i = ex.text.search(/[A-Za-z]/);
                if (i < 0)
                    continue;
                const c = ex.text[i];
                ex.text = ex.text.slice(0, i) + (c.toLowerCase() === 'q' ? 'z' : 'q') + ex.text.slice(i + 1);
                return { strip: clone, variantId: v.id, tileId: t.id, field, token: ex.text };
            }
        }
    }
    return null;
}
// ---------------------------------------------------------------------------
// canonicalJson, sha256, hashes
// ---------------------------------------------------------------------------
export function canonicalJson(value) {
    if (value === null)
        return 'null';
    if (typeof value === 'string')
        return JSON.stringify(value.normalize('NFC'));
    if (typeof value === 'number' || typeof value === 'boolean')
        return JSON.stringify(value);
    if (Array.isArray(value))
        return '[' + value.map((x) => (x === undefined ? 'null' : canonicalJson(x))).join(',') + ']';
    if (typeof value === 'object') {
        const o = value;
        const keys = Object.keys(o).filter((k) => o[k] !== undefined).sort();
        return '{' + keys.map((k) => JSON.stringify(k.normalize('NFC')) + ':' + canonicalJson(o[k])).join(',') + '}';
    }
    return 'null';
}
const K256 = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
];
/** Pure-TS SHA-256 (crypto.subtle is unavailable on http LAN previews). Returns lowercase hex. */
export function sha256Hex(message) {
    const bytes = new TextEncoder().encode(message);
    const bitLen = bytes.length * 8;
    const padded = new Uint8Array(((bytes.length + 9 + 63) >> 6) << 6);
    padded.set(bytes);
    padded[bytes.length] = 0x80;
    const dv = new DataView(padded.buffer);
    dv.setUint32(padded.length - 8, Math.floor(bitLen / 0x100000000));
    dv.setUint32(padded.length - 4, bitLen >>> 0);
    const h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const w = new Uint32Array(64);
    const rotr = (x, n) => (x >>> n) | (x << (32 - n));
    for (let off = 0; off < padded.length; off += 64) {
        for (let i = 0; i < 16; i++)
            w[i] = dv.getUint32(off + i * 4);
        for (let i = 16; i < 64; i++) {
            const s0 = rotr(w[i - 15], 7) ^ rotr(w[i - 15], 18) ^ (w[i - 15] >>> 3);
            const s1 = rotr(w[i - 2], 17) ^ rotr(w[i - 2], 19) ^ (w[i - 2] >>> 10);
            w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
        }
        let [a, b, c, d, e, f, g, hh] = h;
        for (let i = 0; i < 64; i++) {
            const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
            const ch = (e & f) ^ (~e & g);
            const t1 = (hh + S1 + ch + K256[i] + w[i]) >>> 0;
            const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const t2 = (S0 + maj) >>> 0;
            hh = g;
            g = f;
            f = e;
            e = (d + t1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) >>> 0;
        }
        h[0] = (h[0] + a) >>> 0;
        h[1] = (h[1] + b) >>> 0;
        h[2] = (h[2] + c) >>> 0;
        h[3] = (h[3] + d) >>> 0;
        h[4] = (h[4] + e) >>> 0;
        h[5] = (h[5] + f) >>> 0;
        h[6] = (h[6] + g) >>> 0;
        h[7] = (h[7] + hh) >>> 0;
    }
    return h.map((x) => x.toString(16).padStart(8, '0')).join('');
}
export function stripHash(strip) {
    return sha256Hex(`rapid-v${RAPID_FORMAT_VERSION}\n` + canonicalJson(strip));
}
// ---------------------------------------------------------------------------
// Preview-context checks (pure, unit-tested with production hostnames)
// ---------------------------------------------------------------------------
export function isLocalHost(hostname) {
    const h = hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (h === 'localhost' || h === '127.0.0.1' || h === '::1')
        return true;
    if (h.endsWith('.local') && h.length > '.local'.length)
        return true;
    const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(h);
    if (!m)
        return false;
    const [a, b, c, d] = [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])];
    if ([a, b, c, d].some((n) => n > 255))
        return false;
    if (a === 10)
        return true;
    if (a === 192 && b === 168)
        return true;
    if (a === 172 && b >= 16 && b <= 31)
        return true;
    if (a === 100 && b >= 64 && b <= 127)
        return true; // Tailscale CGNAT 100.64.0.0/10
    return false;
}
/** Preview is possible only on plain-http local/LAN hosts with the session flag set. */
export function isPreviewContext(protocol, hostname, sessionFlag) {
    return protocol === 'http:' && isLocalHost(hostname) && sessionFlag === '1';
}
