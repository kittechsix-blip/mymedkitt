// Nodes whose "<number> mg/kg" text must NOT become the tap-to-calculate weight calculator, because the figure is not a dose to give
// (a threshold, another product's labelled dose for a different indication, or a chemotherapy resumption schedule).
// Keyed on node id in code, not a node field: nodes loaded from Supabase / IndexedDB pass through fixed columns (tree-service.ts mapNodeRow)
// and would lose a per-node flag. Ids are unique to the oncology drug consult, so no other consult is affected.
export const NO_DOSE_CALC_NODES = new Set([
    'odse-tox-hemorrhagic-cystitis',
    'odse-tox-ifosfamide-encephalopathy',
    'odse-tox-qt-arsenic',
]);
export const isDoseCalcOptedOut = (nodeId) => !!nodeId && NO_DOSE_CALC_NODES.has(nodeId);
