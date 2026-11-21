// myMedKitt — Transplant Drugs Side-effects: the second consult on the drug-card engine (src/data/onc-drugs).
// Pure data + a pure projection from the oncology data. No DOM, no I/O. Cards live in src/data/onc-drugs unless transplant-only.
import { ONC_DATA, mergeOncData, resolveEffects, searchNames } from '../onc-drugs/index.js';
import { TX_ORGANS } from './organs.js';
import { TX_COMPLAINTS } from './complaints.js';
import { TX_TOXICITIES } from './toxicities.js';
import { TX_CLASSES } from './classes.js';
import { TX_REGIMENS } from './regimens.js';
import { TX_SOURCES } from './sources.js';
import { TX_GROUPS } from './drugs/index.js';
import { TX_DRUG_NOTES } from './drug-notes.js';
/** Effect categories that keep a row on a transplant card: every transplant-owned category plus the borrowed oncology categories TAXONOMY.md marks ALLOWED. Any other effect (a shared oncology card's) renders as a plain line. A test pins this list to TAXONOMY.md. */
export const TX_ROW_CATEGORIES = [...TX_TOXICITIES.filter((t) => t.plainOnly !== true).map((t) => t.id), 'drug-qt-prolongation', 'drug-adrenal-insufficiency', 'drug-gi-perforation', 'drug-hepatotoxicity', 'drug-pancreatitis', 'drug-severe-skin', 'rhabdomyolysis', 'drug-hypertension'];
export * from './types.js';
export { TX_ORGANS, TX_COMPLAINTS, TX_TOXICITIES, TX_CLASSES, TX_REGIMENS, TX_SOURCES, TX_GROUPS };
export const TX_TREE_ID = 'transplant-drug-side-effects';
export const TX_CONSULT = {
    key: 'tdse',
    treeId: TX_TREE_ID,
    title: 'Transplant Drugs Side-effects',
    categoryId: 'nephro-rheum-endo',
    prefix: 'tdse-',
    kinds: ['drug', 'reg', 'class', 'organ', 'cx'],
    indicationKind: 'organ',
    indicationTab: 'Organ',
    indicationHeading: 'Organs',
    filterPlaceholder: 'Drug, brand, class, organ, complaint',
    complaintNote: 'Drug causes only. The usual workup (rejection, infection, graft function) still applies.',
    classSections: {
        'tx-cni': 'Maintenance', 'tx-antimetabolite': 'Maintenance', 'tx-mtor': 'Maintenance', 'tx-costimulation-blocker': 'Maintenance', 'tx-corticosteroid': 'Maintenance',
        'tx-il2-receptor-antagonist': 'Induction and rejection', 'tx-lymphocyte-depleting-antibody': 'Induction and rejection', 'tx-immune-globulin': 'Induction and rejection',
        'tx-c5-inhibitor': 'Induction and rejection', 'tx-il6-antagonist': 'Induction and rejection', 'tx-anti-cd20': 'Induction and rejection',
        'tx-anti-cd52': 'Induction and rejection', 'tx-proteasome-inhibitor': 'Induction and rejection',
        'tx-cmv-nucleoside': 'Prophylaxis', 'tx-hsv-nucleoside': 'Prophylaxis', 'tx-cmv-terminase': 'Prophylaxis', 'tx-pjp-smx-tmp': 'Prophylaxis',
        'tx-pjp-atovaquone': 'Prophylaxis', 'tx-pjp-dapsone': 'Prophylaxis', 'tx-pjp-pentamidine': 'Prophylaxis', 'tx-azole': 'Prophylaxis',
    },
    classSectionOrder: ['Maintenance', 'Induction and rejection', 'Prophylaxis'],
    startNode: 'tdse-start',
    timingTimeUnits: true,
    rowCategories: TX_ROW_CATEGORIES,
    drugNotes: TX_DRUG_NOTES,
    cardNote: 'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.',
    editorAliasPinFloor: 3,
};
/**
 * Project the oncology data into the transplant consult. Pure: no input object is mutated.
 *  - drugs: transplant-only cards, then one COPY per membership row of a shared (oncology) card.
 *  - effect classes: transplant classes, then only the oncology classes a member drug references (oncology order); browseClasses = transplant classes.
 *  - toxicities: transplant ones first, then every oncology toxicity any card reaches through resolveEffects (a copy whose complaints are
 *    filtered to the transplant complaint ids). resolveEffects skips an unknown tox id silently, so omitting one would drop a hazard.
 *  - clashes (duplicate drug / class / source / regimen id across consults, toxicity id repeating an oncology one, bad membership rows) are returned in `errors`.
 * A shared card's own names never pin in transplant (they pin its oncology page); only names the membership row adds can.
 */
export function buildTxDataWithErrors(onc, groups, toxicities, organs, complaints, regimens, own = {}) {
    const errors = [];
    const asRegimen = (r) => { const { organs: o, ...rest } = r; return { ...rest, cancers: [...o] }; };
    // 1. merge, oncology as the shared set: a duplicate id across consults fails naming both files
    const mapped = new Map();
    const reg = (r) => { let m = mapped.get(r); if (!m) {
        m = asRegimen(r);
        mapped.set(r, m);
    } return m; };
    const mergeGroups = {
        'transplant/classes.ts': { CLASSES: own.classes ?? [] },
        'transplant/sources.ts': { SOURCES: own.sources ?? {} },
        'transplant/regimens.ts': { REGIMENS: regimens.map(reg) },
    };
    for (const [file, g] of Object.entries(groups))
        mergeGroups[`transplant/${file}`] = { DRUGS: g.DRUGS, CLASSES: g.CLASSES, SOURCES: g.SOURCES, REGIMENS: (g.REGIMENS ?? []).map(reg) };
    const { merged, errors: mergeErrors } = mergeOncData({ sources: onc.sources, cancers: onc.cancers, classes: onc.classes, regimens: onc.regimens, drugs: onc.drugs }, mergeGroups);
    errors.push(...mergeErrors);
    const txDrugObjs = new Set(Object.values(groups).flatMap((g) => g.DRUGS ?? []));
    const txClassObjs = new Set([...(own.classes ?? []), ...Object.values(groups).flatMap((g) => g.CLASSES ?? [])]);
    const txRegObjs = new Set(mapped.values());
    const txOnlyDrugs = merged.drugs.filter((d) => txDrugObjs.has(d));
    const txClasses = merged.classes.filter((c) => txClassObjs.has(c));
    const txRegimens = merged.regimens.filter((r) => txRegObjs.has(r));
    // 2. toxicities: ids unique against oncology and within transplant
    const oncToxIds = new Set(onc.toxicities.map((t) => t.id));
    const txTox = [];
    const seenTox = new Set();
    for (const t of toxicities) {
        if (oncToxIds.has(t.id))
            errors.push(`TOX-DUP: transplant toxicity id "${t.id}" repeats an oncology toxicity id`);
        else if (seenTox.has(t.id))
            errors.push(`TOX-DUP: transplant toxicity id "${t.id}" is declared twice`);
        else {
            seenTox.add(t.id);
            txTox.push(t);
        }
    }
    // 3. membership rows -> one copy of the shared card each (spread only; the oncology object is never touched)
    const oncById = new Map(onc.drugs.map((d) => [d.id, d]));
    const txOnlyIds = new Set(txOnlyDrugs.map((d) => d.id));
    const rowFile = new Map();
    const views = [];
    const referenced = new Set();
    for (const [file, g] of Object.entries(groups)) {
        for (const m of g.MEMBERS ?? []) {
            const where = `drugs/${file}`;
            const orig = oncById.get(m.drug);
            if (!orig) {
                errors.push(txOnlyIds.has(m.drug)
                    ? `TX-MEMBER: ${where} has a membership row for "${m.drug}", which is a transplant-only card, not an oncology card`
                    : `TX-MEMBER: ${where} has a membership row for unknown drug "${m.drug}"`);
                continue;
            }
            if (rowFile.has(m.drug)) {
                errors.push(`TX-MEMBER: drug "${m.drug}" has two membership rows (${rowFile.get(m.drug)} and ${where})`);
                continue;
            }
            rowFile.set(m.drug, where);
            const view = {
                ...orig,
                cancers: [...m.organs],
                browseClassIds: [...m.classIds],
                editorAliases: [...(orig.editorAliases ?? []), ...(m.editorAliases ?? [])],
                unpinnedNames: [...(m.unpinnedNames ?? []), ...searchNames(orig)],
            };
            if (m.pin !== undefined)
                view.pin = m.pin;
            else
                delete view.pin;
            views.push(view);
            for (const c of orig.classIds)
                referenced.add(c);
        }
    }
    const drugs = [...txOnlyDrugs, ...views];
    // 4. effect classes and toxicities
    const effectClasses = [...txClasses, ...onc.classes.filter((c) => referenced.has(c.id))];
    const pool = [...txTox, ...onc.toxicities];
    const reached = new Set();
    for (const d of drugs)
        for (const e of resolveEffects(d, { classes: effectClasses, toxicities: pool }))
            reached.add(e.tox.id);
    const cxIds = new Set(complaints.map((c) => c.id));
    const borrowed = onc.toxicities.filter((t) => reached.has(t.id)).map((t) => ({ ...t, complaints: t.complaints.filter((c) => cxIds.has(c)) }));
    const cancers = organs.map((o) => ({ id: o.id, name: o.name, ...(o.aliases ? { aliases: [...o.aliases] } : {}) }));
    return {
        data: { sources: merged.sources, cancers, complaints, toxicities: [...txTox, ...borrowed], classes: effectClasses, browseClasses: txClasses, regimens: txRegimens, drugs },
        errors,
    };
}
export function buildTxData(onc, groups, toxicities, organs, complaints, regimens) {
    return buildTxDataWithErrors(onc, groups, toxicities, organs, complaints, regimens).data;
}
const BUILD = buildTxDataWithErrors(ONC_DATA, TX_GROUPS, TX_TOXICITIES, TX_ORGANS, TX_COMPLAINTS, TX_REGIMENS, { classes: TX_CLASSES, sources: TX_SOURCES });
/** Clashes found while building; the gate requires this to be empty. */
export const TX_BUILD_ERRORS = BUILD.errors;
export const TX_DATA = BUILD.data;
