/**
 * SearchService — Fuzzy search powered by Fuse.js
 * Phase 1: Replace substring search with intelligent fuzzy matching
 */
import { getAllCategories } from './category-service.js';
import { getAllDrugs } from './drug-service.js';
import { getAllCalculators } from '../components/calculator.js';
import { sanitizeSearchInput } from './sanitize.js';
import { CLINICAL_SYNONYMS, DRUG_SYNONYMS } from './search-synonyms.js';
import { buildQuestionDocs, createQuestionIndex, drugInput, previewFor, routeFor } from './question-search.js';
// ===================================================================
// Search Index
// ===================================================================
let searchIndex = null;
let indexedDocs = [];
// Node-body docs are pre-baked at build time (scripts/build-search-node-index.mjs)
// and fetched lazily. The flag prevents double-fetching across rapid keystrokes.
let nodeDocs = [];
let trickDocs = [];
let nodeIndexLoading = false;
let nodeIndexLoaded = false;
// Question search (question-search.ts) reads the same node index plus the answer index
// (info-page sections, whole pages, nodes of consults the node scrape cannot read).
let rawNodes = [];
let rawTricks = [];
let answerIndex = null;
let answerIndexLoading = false;
let questionIndex = null;
let questionIndexStale = true;
/** Focused search entries for high-yield subtools that clinicians expect by name. */
const ADDITIONAL_SEARCH_DOCS = [
    {
        id: 'burns',
        type: 'consult',
        title: 'Escharotomy',
        subtitle: 'Burns consult — circumferential burn decompression',
        keywords: ['eschar', 'burn eschar', 'eschar release', 'circumferential burn decompression', 'burn compartment syndrome', 'fasciotomy'],
        categoryId: 'trauma-surgery',
    },
];
/**
 * Lazy-load the pre-baked node body index (docs/data/search-node-index.json).
 * Called by buildSearchIndex() — fire-and-forget. When the JSON lands we
 * re-run buildSearchIndex() to merge nodeDocs into the Fuse instance so the
 * next keystroke sees node hits. Cached by SW after first hit.
 */
async function loadNodeIndex() {
    if (nodeIndexLoaded || nodeIndexLoading)
        return;
    nodeIndexLoading = true;
    try {
        // Relative path resolves correctly under GitHub Pages base path. The
        // service worker precaches this asset (regenerated via deploy-cache-sync).
        const res = await fetch('data/search-node-index.json');
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        const data = (await res.json());
        nodeDocs = data.nodes.map(n => ({
            id: `node-${n.treeId}-${n.id}`,
            type: 'node',
            title: n.title,
            // Subtitle shows which consult the snippet lives in.
            subtitle: `In: ${n.treeId.replace(/-/g, ' ')}`,
            // Pour body/summary/recommendation into keywords so they're searchable
            // without dominating the title-weighted ranking.
            keywords: [n.summary, n.body, n.recommendation].filter(Boolean),
            treeId: n.treeId,
            nodeId: n.id,
        }));
        // Tricks of the Trade — each section becomes a globally searchable doc that
        // deep-links to /tricks/{specialtyId}/trick/{anchorId}.
        trickDocs = (data.tricks ?? []).map(t => ({
            id: `trick-${t.specialtyId}-${t.anchorId}`,
            type: 'trick',
            title: t.title,
            subtitle: `Trick \u2014 ${t.specialtyLabel}`,
            keywords: [t.blurb, t.specialtyLabel].filter(Boolean),
            specialtyId: t.specialtyId,
            anchorId: t.anchorId,
        }));
        rawNodes = data.nodes;
        rawTricks = data.tricks ?? [];
        questionIndexStale = true;
        nodeIndexLoaded = true;
        console.log(`[SearchService] Loaded ${nodeDocs.length} node docs + ${trickDocs.length} trick docs from search-node-index.json`);
        // Rebuild index so subsequent searches include node hits.
        buildSearchIndex();
        scheduleQuestionIndex();
    }
    catch (e) {
        // Non-fatal — search still works against titles/synonyms. Log once.
        console.warn('[SearchService] Could not load search-node-index.json:', e);
    }
    finally {
        nodeIndexLoading = false;
    }
}
/** Lazy-load the answer index (docs/data/search-answer-index.json). Non-fatal: question search just has less to read. */
async function loadAnswerIndex() {
    if (answerIndex || answerIndexLoading)
        return;
    answerIndexLoading = true;
    try {
        const res = await fetch('data/search-answer-index.json');
        if (!res.ok)
            throw new Error(`HTTP ${res.status}`);
        answerIndex = (await res.json());
        questionIndexStale = true;
        scheduleQuestionIndex();
    }
    catch (e) {
        console.warn('[SearchService] Could not load search-answer-index.json:', e);
    }
    finally {
        answerIndexLoading = false;
    }
}
/** Build the question index off the typing path once both indexes are in. */
function scheduleQuestionIndex() {
    if (!nodeIndexLoaded || !answerIndex)
        return; // wait for both files; a question typed sooner builds it on demand
    const idle = globalThis.requestIdleCallback;
    const run = () => { if (questionIndexStale)
        ensureQuestionIndex(); };
    if (idle)
        idle(run);
    else
        setTimeout(run, 50);
}
/** The question index over everything the app can answer from. Rebuilt when an index file lands. */
function ensureQuestionIndex() {
    if (questionIndex && !questionIndexStale)
        return questionIndex;
    const seen = new Set();
    const consults = [];
    for (const cat of getAllCategories()) {
        for (const tree of cat.decisionTrees) {
            if (seen.has(tree.id))
                continue;
            seen.add(tree.id);
            consults.push({ id: tree.id, title: tree.title, subtitle: tree.subtitle, synonyms: CLINICAL_SYNONYMS[tree.id] ?? [] });
        }
    }
    const docs = buildQuestionDocs({
        consults,
        nodes: [...rawNodes, ...(answerIndex?.extraNodes ?? [])],
        tricks: rawTricks,
        info: answerIndex?.info ?? [],
        pages: answerIndex?.pages ?? [],
        drugs: getAllDrugs().map(d => drugInput(d, DRUG_SYNONYMS[d.name.toLowerCase()] ?? [])),
        calcs: getAllCalculators().map(c => ({ id: c.id, title: c.title, subtitle: c.subtitle })),
    });
    questionIndex = createQuestionIndex(docs);
    questionIndexStale = false;
    return questionIndex;
}
/** Build search index from all content */
export function buildSearchIndex() {
    indexedDocs = [];
    const categories = getAllCategories();
    const seenTreeIds = new Set();
    // Index categories
    for (const cat of categories) {
        indexedDocs.push({
            id: `cat-${cat.id}`,
            type: 'category',
            title: cat.name,
            subtitle: `${cat.decisionTrees.length} consults`,
            keywords: [cat.id],
        });
        // Index consults
        for (const tree of cat.decisionTrees) {
            if (seenTreeIds.has(tree.id))
                continue;
            seenTreeIds.add(tree.id);
            const synonyms = CLINICAL_SYNONYMS[tree.id] || [];
            indexedDocs.push({
                id: tree.id,
                type: 'consult',
                title: tree.title,
                subtitle: tree.subtitle,
                keywords: [tree.id, ...synonyms],
                categoryId: cat.id,
            });
        }
    }
    indexedDocs.push(...ADDITIONAL_SEARCH_DOCS);
    // Index drugs
    for (const drug of getAllDrugs()) {
        const synonyms = DRUG_SYNONYMS[drug.name.toLowerCase()] || [];
        indexedDocs.push({
            id: drug.id,
            type: 'drug',
            title: drug.name,
            subtitle: drug.drugClass,
            keywords: [drug.genericName, drug.drugClass, ...synonyms],
            drugId: drug.id,
        });
    }
    // Index calculators
    for (const calc of getAllCalculators()) {
        indexedDocs.push({
            id: calc.id,
            type: 'calculator',
            title: calc.title,
            subtitle: calc.subtitle,
            keywords: [calc.id],
        });
    }
    // Merge in pre-baked node-body docs once loaded. First-paint paths use the
    // title-only index; node hits appear after the JSON fetches in.
    if (nodeIndexLoaded && nodeDocs.length > 0) {
        indexedDocs.push(...nodeDocs);
    }
    // Tricks of the Trade docs ship in the same lazy index file.
    if (nodeIndexLoaded && trickDocs.length > 0) {
        indexedDocs.push(...trickDocs);
    }
    // Create Fuse index. Threshold bumped 0.35 -> 0.4 so common transposition
    // typos (e.g. "hydroflouric" vs "hydrofluoric") still hit. Higher than 0.4
    // starts producing noisy false positives in QA.
    if (typeof Fuse !== 'undefined') {
        searchIndex = new Fuse(indexedDocs, {
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'subtitle', weight: 0.15 },
                { name: 'keywords', weight: 0.45 },
            ],
            threshold: 0.4,
            includeScore: true,
            ignoreLocation: true,
            minMatchCharLength: 2,
            findAllMatches: true,
        });
        console.log(`[SearchService] Indexed ${indexedDocs.length} items with Fuse.js (nodeIndex=${nodeIndexLoaded})`);
    }
    else {
        console.warn('[SearchService] Fuse.js not loaded, falling back to substring search');
    }
    // Kick off lazy node-index load on the first build call. It will re-invoke
    // buildSearchIndex() once the JSON lands.
    if (!nodeIndexLoaded && !nodeIndexLoading) {
        void loadNodeIndex();
    }
    void loadAnswerIndex();
}
/**
 * Two-stage search:
 *   1. Alphabetical prefix first — keeps "afib", "stem" instantly responsive.
 *   2. If the prefix path yields few/no hits, expand via Fuse against the
 *      pre-built index (which carries clinical/drug synonyms in `keywords`).
 * Without stage 2, "heart attack" found nothing because STEMI has no title
 * prefix match — its synonym "heart attack" was indexed but never queried.
 */
export function search(query) {
    if (!query || query.trim().length === 0)
        return [];
    // Security: sanitize user input before searching
    const sanitized = sanitizeSearchInput(query);
    if (sanitized.length === 0)
        return [];
    // Safety: rebuild index if it's empty (race condition guard)
    if (indexedDocs.length === 0) {
        buildSearchIndex();
    }
    const q = sanitized.toLowerCase();
    const prefixResults = alphabeticalPrefixSearch(q);
    // Questions ("what are risks for ectopic pregnancy") and multi-word topics ("dka fluids")
    // are answered by the question index; single words and title-style queries fall through unchanged.
    const asked = searchQuestion(q, prefixResults);
    if (asked)
        return asked;
    // Single-character queries: prefix-only to avoid fuzzing whole index.
    // Plenty of prefix hits: skip Fuse cost.
    if (q.length < 2 || prefixResults.length >= 3)
        return prefixResults;
    const fuzzyResults = [];
    if (searchIndex) {
        for (const r of searchIndex.search(q)) {
            const mapped = docToResult(r.item);
            if (mapped) {
                mapped.score = r.score;
                fuzzyResults.push(mapped);
            }
        }
    }
    // Merge prefix-first, de-dupe by route+drugId (covers drug rows that share
    // the /drugs route but identify by drugId, and any tree matched twice).
    const seen = new Set();
    const merged = [];
    for (const r of [...prefixResults, ...fuzzyResults]) {
        const key = (r.drugId ?? '') + '|' + r.route;
        if (seen.has(key))
            continue;
        seen.add(key);
        merged.push(r);
    }
    return merged;
}
const compactKey = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
/** Merge two result lists, first occurrence wins (a drug row is identified by drugId + route). */
function dedupe(list) {
    const seen = new Set();
    return list.filter(r => {
        const key = (r.drugId ?? '') + '|' + r.route;
        if (seen.has(key))
            return false;
        seen.add(key);
        return true;
    });
}
/**
 * Question path. Returns null when the query is a plain title / single word
 * (the caller then runs the unchanged prefix + Fuse search) or the question index finds nothing.
 */
function searchQuestion(q, prefixResults) {
    if (q.length < 3)
        return null;
    const { parsed, results } = ensureQuestionIndex().rank(q, 40);
    if (!parsed.active && !parsed.wide)
        return null;
    if (results.length === 0)
        return null;
    const mapped = results.map((r, i) => questionToResult(r, i < PREVIEW_COUNT ? parsed : null));
    if (parsed.active) {
        // a query that IS a title ("Dose Adjustment") still opens that title first
        const exact = prefixResults.filter(p => compactKey(p.label) === compactKey(q));
        return dedupe([...exact, ...mapped, ...prefixResults]);
    }
    // a topic typed as a title ("pelvic inflammatory disease") keeps the title-first order
    return dedupe([...prefixResults, ...mapped]);
}
const PREVIEW_COUNT = 3;
function questionToResult(r, previewFor_) {
    const d = r.doc;
    const out = { type: 'consult', label: d.title, sublabel: d.subtitle, route: routeFor(d), score: r.score };
    switch (d.kind) {
        case 'consult':
            out.type = 'consult';
            break;
        case 'node':
            out.type = 'node';
            break;
        case 'info':
            out.type = 'info';
            break;
        case 'trick':
            out.type = 'trick';
            break;
        case 'calc':
            out.type = 'calculator';
            break;
        case 'drug':
            out.type = 'drug';
            out.drugId = d.drugId;
            if (r.indication) {
                out.indication = r.indication;
                out.sublabel = `${d.subtitle} \u00B7 ${r.indication}`;
            }
            break;
    }
    if (previewFor_ && d.kind !== 'consult') {
        // the dosing line for the indication asked about, else the best sentence of the card's own text
        const text = d.kind === 'drug' && r.indication ? d.text?.split(' \u2022 ').find(t => t.startsWith(r.indication + ':')) : d.text;
        // a whole page opens at its top: only show a sentence that really mentions the question, else its own subtitle
        const wholePage = d.kind === 'info' && !d.anchor;
        const p = previewFor(text, previewFor_, 170, wholePage) || (wholePage && d.subtitle && d.subtitle !== d.title ? d.subtitle : '');
        if (p)
            out.preview = p;
    }
    return out;
}
/** Map an indexed SearchDoc to a routable SearchResult. */
function docToResult(doc) {
    switch (doc.type) {
        case 'category': {
            const catId = doc.id.replace(/^cat-/, '');
            return { type: 'category', label: doc.title, sublabel: doc.subtitle, route: `/category/${catId}` };
        }
        case 'consult':
            return { type: 'consult', label: doc.title, sublabel: doc.subtitle, route: `/tree/${doc.id}` };
        case 'drug':
            return { type: 'drug', label: doc.title, sublabel: doc.subtitle, route: '/drugs', drugId: doc.drugId || doc.id };
        case 'calculator':
            return { type: 'calculator', label: doc.title, sublabel: doc.subtitle, route: `/calculator/${doc.id}` };
        case 'node':
            // Route via /tree/:id/node/:nodeId — registered in app.ts router so the
            // consult opens directly on the matching node.
            return {
                type: 'node',
                label: doc.title || `Node ${doc.nodeId}`,
                sublabel: doc.subtitle,
                route: `/tree/${doc.treeId}/node/${doc.nodeId}`,
            };
        case 'trick':
            // Route via /tricks/:specialtyId/trick/:anchorId — opens the specialty
            // directory then surfaces the full trick modal scrolled to the anchor.
            return {
                type: 'trick',
                label: doc.title,
                sublabel: doc.subtitle,
                route: `/tricks/${doc.specialtyId}/trick/${doc.anchorId}`,
            };
        default:
            return null;
    }
}
/** Search with optional type filters */
export function searchWithFilters(query, filters) {
    let results = search(query);
    // Apply type filters if provided
    if (filters && filters.length > 0) {
        results = results.filter(r => filters.includes(r.type));
    }
    return results;
}
/** Get available filter types (for UI) */
export function getAvailableFilterTypes() {
    return [
        { type: 'consult', label: 'Consults' },
        { type: 'drug', label: 'Drugs' },
        { type: 'calculator', label: 'Calculators' },
        { type: 'trick', label: 'Tricks' },
    ];
}
/** Normalize string for prefix matching (remove hyphens, spaces, special chars) */
function normalizeForSearch(str) {
    return str.toLowerCase().replace(/[-\s\/\\().,:']/g, '');
}
/** Check if title matches query prefix (handles "A-Fib" matching "af", "afib", etc.) */
function matchesPrefix(title, query) {
    const normalizedTitle = normalizeForSearch(title);
    const normalizedQuery = normalizeForSearch(query);
    // Primary: normalized prefix match ("afib" matches "A-Fib RVR")
    if (normalizedTitle.startsWith(normalizedQuery))
        return true;
    // Secondary: word-boundary prefix match (each word in title)
    const words = title.toLowerCase().split(/[-\s\/\\]+/);
    for (const word of words) {
        if (word.startsWith(query))
            return true;
    }
    return false;
}
/** Strict alphabetical prefix search - matches items starting with query */
function alphabeticalPrefixSearch(query) {
    const results = [];
    const categories = getAllCategories();
    const seenTreeIds = new Set();
    // Categories - prefix match on name
    for (const cat of categories) {
        if (matchesPrefix(cat.name, query)) {
            results.push({
                type: 'category',
                label: cat.name,
                sublabel: `${cat.decisionTrees.length} consults`,
                route: `/category/${cat.id}`,
            });
        }
        // Consults - prefix match on title OR id
        for (const tree of cat.decisionTrees) {
            if (seenTreeIds.has(tree.id))
                continue;
            if (matchesPrefix(tree.title, query) || tree.id.startsWith(query)) {
                seenTreeIds.add(tree.id);
                results.push({
                    type: 'consult',
                    label: tree.title,
                    sublabel: tree.subtitle,
                    route: `/tree/${tree.id}`,
                });
            }
        }
    }
    // Drugs - prefix match on name
    for (const drug of getAllDrugs()) {
        if (matchesPrefix(drug.name, query)) {
            results.push({
                type: 'drug',
                label: drug.name,
                sublabel: drug.drugClass,
                route: '/drugs',
                drugId: drug.id,
            });
        }
    }
    // Calculators - prefix match on title
    for (const calc of getAllCalculators()) {
        if (matchesPrefix(calc.title, query)) {
            results.push({
                type: 'calculator',
                label: calc.title,
                sublabel: calc.subtitle,
                route: `/calculator/${calc.id}`,
            });
        }
    }
    // Named subtools/info cards - prefix match on title or high-yield keywords.
    for (const doc of ADDITIONAL_SEARCH_DOCS) {
        if (matchesPrefix(doc.title, query) || doc.keywords.some(keyword => matchesPrefix(keyword, query))) {
            const mapped = docToResult(doc);
            if (mapped)
                results.push(mapped);
        }
    }
    // Sort all results alphabetically by label
    results.sort((a, b) => a.label.localeCompare(b.label));
    return results;
}
/** Check if Fuse.js is available */
export function isFuzzySearchAvailable() {
    return typeof Fuse !== 'undefined' && searchIndex !== null;
}
