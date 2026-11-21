/**
 * Transplant-owned toxicities. Ids must not repeat an oncology toxicity id. Every page target must carry `summary` + `citation` (TOX-PAGE).
 * Tiers (owner-approved, research/transplant-sources/DECISIONS.md): lethality 1 = tier 1 (can kill within hours), 2 = tier 2, 3 = tier 3.
 * Table of every allowed category and every borrowed oncology category: research/transplant-sources/cards/TAXONOMY.md.
 */
const tp = (node) => ({ tree: 'transplant-patient-ed', node });
/** sentinel for plain-line-only categories (no management page is written): never navigated, never checked (plainOnly) */
const NO_PAGE = { tree: '', node: '' };
export const TX_TOXICITIES = [
    // ---- tier 1
    { id: 'tx-serious-infection', label: 'Serious infection', page: NO_PAGE, plainOnly: true, lethality: 1,
        complaints: ['fever', 'dyspnea-cough', 'confusion-neuro', 'fatigue-hypotension', 'diarrhea-abdominal-pain', 'headache-vision'], ask: [] },
    { id: 'tx-neurotoxicity', label: 'Neurotoxicity', page: tp('tpe-cni-brain'), lethality: 1,
        complaints: ['confusion-neuro', 'headache-vision', 'numbness-tingling', 'tremor'], ask: [] },
    { id: 'tx-hyperkalemia', label: 'Hyperkalemia', page: { tree: 'potassium', node: 'k-hyper-ecg' }, lethality: 1,
        complaints: ['weakness', 'fainting-palpitations'], ask: [] },
    { id: 'tx-infusion-anaphylaxis', label: 'Anaphylaxis, infusion reaction or cytokine release', page: { tree: 'anaphylaxis', node: 'anaph-start' }, lethality: 1,
        complaints: ['dyspnea-cough', 'rash-skin', 'fatigue-hypotension', 'chest-pain'], ask: [] },
    { id: 'tx-cytopenia', label: 'Low blood counts', page: tp('tpe-cytopenia'), lethality: 1,
        complaints: ['fever', 'bleeding-bruising', 'fatigue-hypotension'], ask: [] },
    { id: 'tx-gi-bleed', label: 'Gastrointestinal bleeding', page: { tree: 'gi-bleed-hub', node: 'gib-start' }, lethality: 1,
        complaints: ['diarrhea-abdominal-pain', 'fatigue-hypotension', 'bleeding-bruising'], ask: [] },
    { id: 'tx-angioedema', label: 'Angioedema', page: { tree: 'angioedema', node: 'angio-start' }, lethality: 1,
        complaints: ['dyspnea-cough', 'rash-skin'], ask: [] },
    { id: 'tx-kidney-graft-thrombosis', label: 'Kidney graft thrombosis', page: tp('tpe-kidney-vascular'), lethality: 1,
        complaints: ['less-urine', 'diarrhea-abdominal-pain'], ask: [] },
    // graft-threatening vascular event, tier 1 like kidney graft thrombosis; no complaint filing: the page is about vascular complications, not a presenting complaint
    { id: 'tx-hepatic-artery-thrombosis', label: 'Hepatic artery thrombosis', page: tp('tpe-liver-vascular'), lethality: 1,
        complaints: [], ask: [] },
    { id: 'tx-meningococcal-infection', label: 'Meningococcal infection', page: { tree: 'meningitis', node: 'mening-start' }, lethality: 1,
        complaints: ['fever', 'headache-vision', 'confusion-neuro', 'rash-skin'], ask: [] },
    { id: 'tx-methemoglobinemia', label: 'Methemoglobinemia', page: { tree: 'methemoglobinemia', node: 'methb-g6pd' }, lethality: 1,
        complaints: ['dyspnea-cough', 'confusion-neuro', 'fatigue-hypotension'], ask: [] },
    { id: 'tx-shock', label: 'Hypotension and shock', page: { tree: 'hypotension-workup', node: 'hypotension-start' }, lethality: 1,
        complaints: ['fatigue-hypotension', 'fainting-palpitations', 'confusion-neuro'], ask: [] },
    // transplant-owned twins of two oncology categories that rank tier 2 there; same general pages, tier 1 here (oncology data untouched)
    { id: 'tx-qt-prolongation', label: 'QT prolongation', page: { tree: 'torsades-de-pointes', node: 'tdp-risk-factors' }, lethality: 1,
        complaints: ['fainting-palpitations', 'chest-pain', 'fatigue-hypotension'], ask: [] },
    { id: 'tx-adrenal-insufficiency', label: 'Adrenal insufficiency', page: { tree: 'adrenal-insufficiency', node: 'ai-start' }, lethality: 1,
        complaints: ['fatigue-hypotension', 'vomiting-polyuria', 'diarrhea-abdominal-pain', 'weakness'], ask: [] },
    // ---- tier 2
    { id: 'tx-cni-nephrotoxicity', label: 'Kidney injury from the drug', page: tp('tpe-cni-toxicity'), lethality: 2,
        complaints: ['less-urine'], ask: [] },
    { id: 'tx-tma', label: 'Thrombotic microangiopathy', page: tp('tpe-cni-tma'), lethality: 2,
        complaints: ['bleeding-bruising', 'fatigue-hypotension', 'less-urine', 'confusion-neuro', 'fever'], ask: [] },
    { id: 'tx-hemolysis', label: 'Hemolysis', page: { tree: 'hemolytic-anemia', node: 'hemolytic-anemia-start' }, lethality: 2,
        complaints: ['fatigue-hypotension', 'jaundice-lfts', 'less-urine'], ask: [] },
    { id: 'tx-hypoglycemia', label: 'Hypoglycemia', page: { tree: 'hypoglycemia', node: 'hypoglycemia-start' }, lethality: 2,
        complaints: ['confusion-neuro', 'tremor', 'fainting-palpitations', 'weakness'], ask: [] },
    { id: 'tx-hyponatremia', label: 'Hyponatremia', page: { tree: 'sodium', node: 'na-hypo-symptoms' }, lethality: 2,
        complaints: ['confusion-neuro', 'headache-vision', 'weakness', 'vomiting-polyuria'], ask: [] },
    { id: 'tx-ttp-hus', label: 'TTP or HUS', page: { tree: 'ttp', node: 'ttp-start' }, lethality: 2,
        complaints: ['bleeding-bruising', 'confusion-neuro', 'less-urine', 'fever'], ask: [] },
    // ---- tier 3
    { id: 'tx-malignancy', label: 'Lymphoma and other malignancy', page: NO_PAGE, plainOnly: true, lethality: 3,
        complaints: ['rash-skin', 'fever', 'diarrhea-abdominal-pain'], ask: [] },
    { id: 'tx-nodat', label: 'New-onset diabetes after transplant', page: { tree: 'diabetes-management', node: 'dm-new-dx' }, lethality: 3,
        complaints: ['vomiting-polyuria', 'confusion-neuro'], ask: [] },
    { id: 'tx-hypertension', label: 'Hypertension', page: tp('tpe-cni-hypertension'), lethality: 3,
        complaints: ['headache-vision', 'chest-pain', 'confusion-neuro'], ask: [] },
];
