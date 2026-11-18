// myMedKitt — RAPID service: who may see a RAPID card, and the live self-check.
// A consult is RAPID iff it has a strip. Users see it only when the strip is approved (hash match)
// or the device is in local preview. Every other path falls back to the old Critical button.
import { RAPID_STRIPS } from '../data/rapid/index.js';
import { RAPID_APPROVALS } from '../data/rapid/approvals.js';
import { getDrug } from './drug-service.js';
import { getTreeConfig } from './tree-service.js';
import { approvalDropReasons, isPreviewContext, regimenPins, stripHash, verifyStripSafe } from './rapid-verify.js';
const PREVIEW_KEY = 'rapid-preview';
export function getRapidStrip(treeId) {
    return Object.prototype.hasOwnProperty.call(RAPID_STRIPS, treeId) ? RAPID_STRIPS[treeId] : undefined;
}
const approvedCache = new Map();
/** Sync, memoised: strip exists and its hash equals the approved hash. */
export function rapidApproved(treeId) {
    const cached = approvedCache.get(treeId);
    if (cached !== undefined)
        return cached;
    const strip = getRapidStrip(treeId);
    const a = Object.prototype.hasOwnProperty.call(RAPID_APPROVALS, treeId) ? RAPID_APPROVALS[treeId] : undefined;
    const ok = !!strip && !!a && a.stripHash === stripHash(strip);
    approvedCache.set(treeId, ok);
    return ok;
}
function readFlag() {
    try {
        return window.sessionStorage.getItem(PREVIEW_KEY);
    }
    catch {
        return null;
    }
}
/** True only on a plain-http local/LAN host with the session flag set. Never on production. */
export function isRapidPreview() {
    return isPreviewContext(window.location.protocol, window.location.hostname, readFlag());
}
/** Call once at startup: `?rapid-preview=1` sets the flag, `?rapid-preview=0` clears it.
 *  The flag is only ever set on a local host over http. */
export function initRapidPreview() {
    try {
        const q = new URLSearchParams(window.location.search).get(PREVIEW_KEY);
        if (q === null)
            return;
        if (q === '0') {
            window.sessionStorage.removeItem(PREVIEW_KEY);
            return;
        }
        if (q === '1' && isPreviewContext(window.location.protocol, window.location.hostname, '1')) {
            window.sessionStorage.setItem(PREVIEW_KEY, '1');
        }
    }
    catch {
        // sessionStorage blocked: preview stays off.
    }
}
/** Last full-check verdict per tree (set by rapidLive, the same check the card uses). */
const verdict = new Map();
/** Sync, for the Home-search key: true only after the SAME full check as the card has passed for this tree
 *  (hash + hard checks on live data + flags + regimen pins, or local preview). Never true from the hash alone. */
export function rapidShown(treeId) {
    return !!getRapidStrip(treeId) && verdict.get(treeId) === true;
}
/** Load the consult and run the full check, so rapidShown is meaningful for a tree that has not been opened yet. */
export async function primeRapid(treeId) {
    if (!getRapidStrip(treeId))
        return false;
    try {
        const config = await getTreeConfig(treeId);
        return config ? rapidLive(treeId, config) : false;
    }
    catch {
        return false;
    }
}
const liveCache = new WeakMap();
const warned = new Set();
/** The strip's drug entries as they are right now (by identity): a background drug refresh replaces them. */
function drugRefs(strip) {
    const m = new Map();
    for (const v of strip.variants)
        for (const t of v.tiles)
            if (t.layout === 'drug')
                m.set(t.drug.id, getDrug(t.drug.id));
    return m;
}
function sameDrugs(a, b) {
    if (a.size !== b.size)
        return false;
    for (const [k, v] of a)
        if (b.get(k) !== v)
            return false;
    return true;
}
/** Re-runs the gate's verifier against the LIVE nodes and drug entries (Supabase can drift). Memoised per
 *  (config object, drug-data generation): a drug refresh swaps the entries, which re-verifies.
 *  criticalActions is deliberately empty: bundled critical-action text is never a source.
 *  Never throws: a malformed live row fails closed. */
function liveEntry(treeId, config) {
    const strip = getRapidStrip(treeId);
    if (!strip)
        return null;
    let perConfig = liveCache.get(config);
    if (!perConfig) {
        perConfig = new Map();
        liveCache.set(config, perConfig);
    }
    const refs = drugRefs(strip);
    let e = perConfig.get(treeId);
    if (!e || !sameDrugs(e.drugs, refs)) {
        e = {
            drugs: refs,
            result: verifyStripSafe(strip, { nodes: config.nodes, criticalActions: [], getDrug, entryNodeId: config.entryNodeId }),
            pins: regimenPins(strip, getDrug),
        };
        perConfig.set(treeId, e);
    }
    return e;
}
export function rapidLiveResult(treeId, config) {
    return liveEntry(treeId, config)?.result ?? null;
}
/** The single gate for every RAPID surface.
 *  Live iff approved (hash match + hard checks incl. every excerpt pass on LIVE data + every live flag acknowledged +
 *  every drug regimen matches its pin), or in local preview. Any miss: Critical button, one console.warn per tree. */
export function rapidLive(treeId, config) {
    const v = rapidLiveInner(treeId, config);
    verdict.set(treeId, v);
    return v;
}
function rapidLiveInner(treeId, config) {
    try {
        const strip = getRapidStrip(treeId);
        if (!strip)
            return false;
        const preview = isRapidPreview();
        const approval = Object.prototype.hasOwnProperty.call(RAPID_APPROVALS, treeId) ? RAPID_APPROVALS[treeId] : undefined;
        if (!approval && !preview)
            return false;
        const e = liveEntry(treeId, config);
        if (!e)
            return false;
        const why = approvalDropReasons(strip, e.result, approval, e.pins);
        if (why.length === 0)
            return true;
        if (!warned.has(treeId) && (approval || !e.result.ok)) {
            warned.add(treeId);
            console.warn('[rapid] not live', treeId, approval ? why : e.result.failingTileIds);
        }
        return preview; // preview shows the card with notes; production falls back to Critical
    }
    catch {
        return false;
    }
}
