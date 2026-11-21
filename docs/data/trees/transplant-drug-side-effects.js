// MedKitt - Transplant Drugs Side-effects
// Drug / class / organ / complaint cards are typed data in src/data/transplant-drugs/ (and shared oncology cards), rendered by
// components/onc-drug-consult.ts. This tree holds only the start node the engine needs; the management pages the cards link to
// live in the Transplant Patient in the ED tree (transplant-patient-ed).
// This array must stay a literal `_NODES = [ ... ];` (regex gates read it): do not spread or generate into it.
export const TRANSPLANT_DRUG_SIDE_EFFECTS_CRITICAL_ACTIONS = [];
export const TRANSPLANT_DRUG_SIDE_EFFECTS_NODES = [
    {
        id: 'tdse-start',
        type: 'info',
        module: 1,
        title: 'Transplant Drugs Side-effects',
        body: 'Search a drug, or browse by organ, class or complaint.',
        summary: 'Transplant drugs side-effects: search a drug, or browse by organ, class or complaint',
    },
];
export const TRANSPLANT_DRUG_SIDE_EFFECTS_NODE_COUNT = TRANSPLANT_DRUG_SIDE_EFFECTS_NODES.length;
export const TRANSPLANT_DRUG_SIDE_EFFECTS_MODULE_LABELS = ['Drug side-effects'];
export const TRANSPLANT_DRUG_SIDE_EFFECTS_CITATIONS = [];
