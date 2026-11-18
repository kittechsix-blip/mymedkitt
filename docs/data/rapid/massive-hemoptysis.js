// RAPID strip (format v3), Massive Hemoptysis. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant (the consult's fork at hemo-initial has three options: stable / unstable / arrest; this strip follows the unstable airway path).
// Tile order follows the consult's node FLOW. Findings: research/rapid/massive-hemoptysis.findings.json
export const RAPID_MASSIVE_HEMOPTYSIS = {
    treeId: 'massive-hemoptysis',
    variants: [
        {
            id: 'main',
            label: 'Massive hemoptysis',
            tiles: [
                {
                    id: 'position',
                    layout: 'steps',
                    action: 'Bleeding side down',
                    figure: 'Lateral decubitus',
                    condition: 'Side unknown: upright',
                    nodeIds: ['hemo-positioning'],
                    warning: { nodeId: 'hemo-positioning', text: 'lay flat only after hemorrhage control or intubation' },
                    lines: [
                        { nodeId: 'hemo-positioning', text: 'Lateral decubitus with bleeding lung DOWN' },
                        { nodeId: 'hemo-positioning', text: 'Apply as soon as bleeding is lateralized' },
                        { nodeId: 'hemo-positioning', text: 'If side unknown: Patient upright or semi-recumbent to minimize aspiration.' },
                    ],
                },
                {
                    id: 'intubate',
                    layout: 'steps',
                    action: 'Intubate if indicated',
                    figure: '≥8.5 mm ID',
                    condition: 'Not a double-lumen tube',
                    nodeIds: ['hemo-ett-selection', 'hemo-airway-decision', 'hemo-arrest'],
                    warning: { nodeId: 'hemo-ett-selection', text: 'Narrow lumens clog with blood' },
                    lines: [
                        { nodeId: 'hemo-airway-decision', text: 'Indications for intubation:' },
                        { nodeId: 'hemo-airway-decision', text: 'Ineffective cough with blood accumulation' },
                        { nodeId: 'hemo-airway-decision', text: 'Worsening hypoxemia (SpO2 <90% despite O2)' },
                        { nodeId: 'hemo-airway-decision', text: 'Altered mental status' },
                        { nodeId: 'hemo-airway-decision', text: 'Hemodynamic instability' },
                        { nodeId: 'hemo-airway-decision', text: 'Procedural airway control needed' },
                        { nodeId: 'hemo-ett-selection', text: 'Use LARGE ETT:' },
                        { nodeId: 'hemo-arrest', text: 'Intubate with large ETT (≥8.5 mm)' },
                    ],
                },
                {
                    id: 'isolate',
                    layout: 'steps',
                    action: 'Isolate lung',
                    figure: 'Blocker or mainstem',
                    condition: 'Confirm with bronchoscope',
                    nodeIds: ['hemo-lung-isolation'],
                    lines: [
                        { nodeId: 'hemo-lung-isolation', text: 'Option 1: Mainstem Intubation' },
                        { nodeId: 'hemo-lung-isolation', text: 'Advance ETT into unaffected bronchus' },
                        { nodeId: 'hemo-lung-isolation', text: 'Option 2: Endobronchial Blocker (preferred)' },
                        { nodeId: 'hemo-lung-isolation', text: 'Temporizing measure for 48-72 hours' },
                    ],
                },
                {
                    id: 'txa',
                    layout: 'steps',
                    action: 'Nebulized TXA',
                    figure: '1000 mg nebulized',
                    condition: 'IV if neb impairs expectoration',
                    nodeIds: ['hemo-txa'],
                    lines: [
                        { nodeId: 'hemo-txa', text: 'Nebulized TXA (preferred):' },
                        { nodeId: 'hemo-txa', text: 'IV TXA (if neb impairs expectoration):' },
                        { nodeId: 'hemo-txa', text: '500 mg IV TID' },
                    ],
                },
                {
                    id: 'reverse',
                    layout: 'steps',
                    action: 'Reverse anticoagulant',
                    figure: 'Agent-specific reversal',
                    condition: 'Anticoagulated or antiplatelet',
                    nodeIds: ['hemo-coag-reversal'],
                    lines: [
                        { nodeId: 'hemo-coag-reversal', text: 'Check for anticoagulant/antiplatelet use:' },
                        { nodeId: 'hemo-coag-reversal', text: 'Is the patient on anticoagulation or antiplatelet therapy?' },
                    ],
                },
                {
                    id: 'bronch',
                    layout: 'steps',
                    action: 'Rigid bronchoscopy',
                    figure: 'Massive bleeding',
                    condition: 'Flexible first to localize',
                    nodeIds: ['hemo-bronchoscopy'],
                    lines: [
                        { nodeId: 'hemo-bronchoscopy', text: 'Recommendation: Flexible first for localization; rigid if therapeutic intervention needed or massive bleeding' },
                    ],
                },
                {
                    id: 'bae',
                    layout: 'steps',
                    action: 'Bronchial embolization',
                    figure: 'BAE first-line',
                    nodeIds: ['hemo-bae'],
                    lines: [
                        { nodeId: 'hemo-bae', text: 'First-line definitive therapy for most patients' },
                    ],
                },
            ],
        },
    ],
};
