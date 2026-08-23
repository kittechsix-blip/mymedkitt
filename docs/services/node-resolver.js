// myMedKitt — Bare Node-Link Resolver
//
// WHY THIS EXISTS
// ---------------
// Consult bodies, stop pages and info pages contain ~3,200 in-body markdown links
// written as `[label](#/node/some-node-id)` — no consult id in the path. The router
// matches on segment count plus literal segments, and the only node routes ever
// registered were `/tree/:id/node/:nodeId` and `/consult/:id/node/:nodeId`. A bare
// `#/node/x` is a two-segment path whose first segment is the literal `node`, which
// matches nothing, so every one of those links fell through to the not-found handler
// and stranded the clinician on a blank "Loading…" screen mid-consult. Confirmed
// live in production 2026-08-23 (`app.html#/node/hep-disposition` → dead screen;
// `app.html#/tree/hepatitis/node/hep-disposition` → renders fine).
//
// This module supplies the missing nodeId → treeId lookup so a `/node/:nodeId`
// route can redirect to the canonical path.
//
// RESOLUTION ORDER
//   1. The consult the user is already in. In-body node links are overwhelmingly
//      intra-consult, so this is both the fastest answer and the correct one when a
//      node id is duplicated across consults (33 such ids today).
//   2. docs/data/node-tree-map.json — baked by scripts/build-node-tree-map.mjs,
//      ~300 KB raw / ~55 KB gzipped, fetched lazily the first time a bare node link
//      is followed and then held in module scope. Never touched on first paint.
//   3. null → caller shows not-found. ~65 links point at node ids that genuinely do
//      not exist anywhere; those are a content bug, not a routing bug.
let nodeTreeMap = null;
let loadPromise = null;
/** Consult id of the flow currently on screen, if any. Set by the tree routes. */
let currentTreeId = null;
/** Node ids belonging to `currentTreeId`, populated opportunistically from the map. */
let currentTreeNodeIds = null;
/**
 * Record which consult the user is looking at. Called from app.ts's tree route
 * handlers so intra-consult node links resolve without any network round-trip and
 * without ambiguity when a node id is reused in another consult.
 */
export function setCurrentTreeId(treeId) {
    if (treeId === currentTreeId)
        return;
    currentTreeId = treeId;
    currentTreeNodeIds = null;
}
/** Fetch + cache the baked map. Resolves to null if the asset is unavailable. */
async function loadNodeTreeMap() {
    if (nodeTreeMap)
        return nodeTreeMap;
    if (loadPromise)
        return loadPromise;
    loadPromise = (async () => {
        try {
            // Relative path so it resolves under the GitHub Pages base path. Precached
            // by the service worker, so this is a no-op hit once the app is installed.
            const res = await fetch('data/node-tree-map.json');
            if (!res.ok)
                throw new Error(`HTTP ${res.status}`);
            const data = (await res.json());
            nodeTreeMap = data.map ?? {};
            console.log(`[NodeResolver] Loaded ${Object.keys(nodeTreeMap).length} node→consult entries`);
            return nodeTreeMap;
        }
        catch (e) {
            console.warn('[NodeResolver] Could not load node-tree-map.json:', e);
            return null;
        }
        finally {
            loadPromise = null;
        }
    })();
    return loadPromise;
}
/**
 * Resolve a bare node id to the consult that owns it.
 * Returns null when the node does not exist anywhere (caller → not-found).
 */
export async function resolveNodeTreeId(nodeId) {
    if (!nodeId)
        return null;
    const map = await loadNodeTreeMap();
    if (!map)
        return null;
    // 1. Prefer the consult already on screen — correct by authoring convention and
    //    the tie-breaker for the 33 node ids that appear in more than one consult.
    //    The map is first-writer-wins, so without this a duplicated id could bounce
    //    the clinician into an unrelated consult.
    if (currentTreeId) {
        if (currentTreeNodeIds === null) {
            currentTreeNodeIds = new Set(Object.keys(map).filter((id) => map[id] === currentTreeId));
        }
        if (currentTreeNodeIds.has(nodeId))
            return currentTreeId;
    }
    // 2. Fall back to the baked global map.
    return map[nodeId] ?? null;
}
