// RAPID strip (format v3), Sepsis. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant (the consult's start-node options mostly converge). Findings: research/rapid/sepsis.findings.json
export const RAPID_SEPSIS = {
    treeId: 'sepsis',
    variants: [
        {
            id: 'sepsis',
            label: 'Sepsis',
            tiles: [
                {
                    id: 'cultures',
                    layout: 'steps',
                    action: 'Blood cultures',
                    figure: '2 sets, 2 sites',
                    condition: 'BEFORE antibiotics when possible',
                    nodeIds: ['sepsis-labs'],
                    warning: { nodeId: 'sepsis-labs', text: 'Obtain within 45 minutes (do NOT delay fluids or antibiotics):' },
                    lines: [
                        { nodeId: 'sepsis-labs', text: 'Microbiology (BEFORE antibiotics when possible):' },
                        { nodeId: 'sepsis-labs', text: '2 sets blood cultures from 2 separate peripheral sites' },
                        { nodeId: 'sepsis-labs', text: 'Do NOT draw through indwelling lines (high false positive rate)' },
                    ],
                },
                {
                    id: 'fluids',
                    layout: 'steps',
                    action: 'IV crystalloid',
                    figure: '30 mL/kg',
                    condition: 'Stop if pulmonary edema develops',
                    nodeIds: ['sepsis-fluids'],
                    lines: [
                        { nodeId: 'sepsis-fluids', text: '30 mL/kg IV crystalloid — start within 1 hour, complete within 3 hours' },
                        { nodeId: 'sepsis-fluids', text: 'Fluid choice:' },
                        { nodeId: 'sepsis-fluids', text: 'Balanced crystalloid preferred (Lactated Ringer\'s)' },
                        { nodeId: 'sepsis-fluids', text: 'Boluses of 500 mL, reassess between each' },
                        { nodeId: 'sepsis-fluids', text: 'Stop if pulmonary edema develops or no further response' },
                    ],
                },
                {
                    id: 'antibiotics',
                    layout: 'steps',
                    action: 'Antibiotics',
                    figure: 'within 1 hour',
                    condition: 'Beta-lactam FIRST, then vancomycin',
                    nodeIds: ['sepsis-abx-empiric', 'sepsis-mrsa'],
                    lines: [
                        { nodeId: 'sepsis-abx-empiric', text: 'beta-lactam FIRST before vancomycin' },
                        { nodeId: 'sepsis-abx-empiric', text: 'Administer within 1 hour of sepsis recognition. Each hour of delay increases mortality.' },
                        { nodeId: 'sepsis-mrsa', text: 'Discontinue vancomycin if no MRSA cultured within 48 hours' },
                    ],
                },
                {
                    id: 'source-control',
                    layout: 'steps',
                    action: 'Source control',
                    figure: 'within 6-12 hours',
                    condition: 'when feasible',
                    nodeIds: ['sepsis-source-ctrl'],
                    lines: [
                        { nodeId: 'sepsis-source-ctrl', text: 'Source control within 6-12 hours when feasible — undrained foci may not respond to antibiotics alone.' },
                        { nodeId: 'sepsis-source-ctrl', text: 'Interventions by source:' },
                        { nodeId: 'sepsis-source-ctrl', text: 'Intravascular catheter infection: Remove catheter after establishing alternative access' },
                        { nodeId: 'sepsis-source-ctrl', text: 'Necrotizing fasciitis: Emergent surgical debridement' },
                    ],
                },
                {
                    id: 'norepinephrine',
                    layout: 'drug',
                    action: 'Norepinephrine',
                    figure: 'Titrate to MAP ≥65 mmHg',
                    condition: 'Septic shock; first-line vasopressor',
                    nodeIds: ['sepsis-vp-init'],
                    drug: { id: 'norepinephrine', indication: 'Septic / Vasodilatory Shock' },
                    lines: [
                        { nodeId: 'sepsis-vp-init', text: 'Norepinephrine is the first-line vasopressor for septic shock.' },
                        { nodeId: 'sepsis-vp-init', text: 'Start 0.05 mcg/kg/min (4-6 mcg/min), titrate by 0.02-0.05 mcg/kg/min to MAP ≥65 mmHg' },
                        { nodeId: 'sepsis-vp-init', text: 'Can start peripherally for <6 hours while obtaining central access (SSC 2021).' },
                    ],
                },
                {
                    id: 'vasopressin',
                    layout: 'drug',
                    action: 'Add vasopressin',
                    figure: '0.03-0.04 units/min',
                    condition: 'If norepinephrine alone insufficient',
                    nodeIds: ['sepsis-vp-second'],
                    drug: { id: 'vasopressin', indication: 'Septic shock (second-line)' },
                    lines: [
                        { nodeId: 'sepsis-vp-second', text: 'Add vasopressin to norepinephrine when norepinephrine requirements are escalating, rather than relying only on further norepinephrine escalation.' },
                        { nodeId: 'sepsis-vp-second', text: 'Best as early second agent — add before escalating NE to high doses' },
                    ],
                },
                {
                    id: 'hydrocortisone',
                    layout: 'drug',
                    action: 'Hydrocortisone',
                    figure: '50 mg IV q6h',
                    condition: 'Vasopressor-dependent septic shock',
                    nodeIds: ['sepsis-steroids'],
                    drug: { id: 'hydrocortisone', indication: 'Septic shock' },
                    lines: [
                        { nodeId: 'sepsis-steroids', text: 'Persistent vasopressor-dependent septic shock: when to start hydrocortisone' },
                        { nodeId: 'sepsis-steroids', text: 'When vasopressors discontinued, taper over 2-3 days (do not stop abruptly).' },
                    ],
                },
            ],
        },
    ],
};
