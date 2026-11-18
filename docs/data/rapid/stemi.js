// RAPID strip (format v3), STEMI. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant (the consult forks by ECG pattern, not into different resuscitation paths). Findings: research/rapid/stemi.findings.json
export const RAPID_STEMI = {
    treeId: 'stemi',
    variants: [
        {
            id: 'stemi',
            label: 'STEMI',
            tiles: [
                {
                    id: 'ecg',
                    layout: 'steps',
                    action: '12-lead ECG',
                    figure: 'within 10 minutes',
                    condition: 'of first medical contact',
                    nodeIds: ['stemi-start'],
                    warning: { nodeId: 'stemi-start', text: 'Do NOT delay for troponin. A negative troponin does NOT rule out STEMI.' },
                    lines: [
                        { nodeId: 'stemi-start', text: 'Obtain 12-lead ECG within 10 minutes of first medical contact.' },
                        { nodeId: 'stemi-start', text: 'STEMI is an ECG diagnosis. Do NOT delay for troponin. A negative troponin does NOT rule out STEMI.' },
                    ],
                },
                {
                    id: 'cath-lab',
                    layout: 'steps',
                    action: 'Activate cath lab',
                    figure: 'FMC-to-device ≤90 min',
                    condition: 'STEMI confirmed',
                    nodeIds: ['stemi-confirmed', 'stemi-reperfusion-q'],
                    lines: [
                        { nodeId: 'stemi-confirmed', text: 'Immediately activate cardiac catheterization laboratory.' },
                        { nodeId: 'stemi-reperfusion-q', text: 'FMC-to-device ≤90 min at PCI-capable facility' },
                        { nodeId: 'stemi-confirmed', text: 'Start initial therapies immediately while preparing for reperfusion.' },
                    ],
                },
                {
                    id: 'posterior-leads',
                    layout: 'steps',
                    action: 'Posterior leads',
                    figure: 'STE ≥0.5 mm',
                    condition: 'V1-V3 ST depression, upright T',
                    nodeIds: ['stemi-posterior'],
                    lines: [
                        { nodeId: 'stemi-posterior', text: 'ST depression in V1-V3 with upright T waves and prominent R wave suggests posterior (inferobasal) STEMI.' },
                        { nodeId: 'stemi-posterior', text: 'Obtain posterior leads V7, V8, V9:' },
                        { nodeId: 'stemi-posterior', text: 'STE ≥0.5 mm in any posterior lead (≥1 mm in men <40y has higher specificity)' },
                    ],
                },
                {
                    id: 'right-leads',
                    layout: 'steps',
                    action: 'Right-sided leads',
                    figure: 'inferior STEMI',
                    condition: 'RV involvement: avoid nitrates',
                    nodeIds: ['stemi-confirmed', 'stemi-rv'],
                    lines: [
                        { nodeId: 'stemi-confirmed', text: 'If inferior STEMI: Get right-sided leads to assess for RV involvement (→ avoid nitrates, volume-dependent)' },
                        { nodeId: 'stemi-rv', text: 'STE ≥1 mm in V4R is diagnostic' },
                        { nodeId: 'stemi-rv', text: 'AVOID nitrates (reduce preload → hemodynamic collapse)' },
                        { nodeId: 'stemi-rv', text: 'AVOID diuretics' },
                    ],
                },
                {
                    id: 'aspirin',
                    layout: 'drug',
                    action: 'Aspirin',
                    figure: '162–325 mg chewed',
                    condition: 'if not given prehospital',
                    nodeIds: ['stemi-initial-tx'],
                    warning: { nodeId: 'stemi-initial-tx', text: 'Morphine 4–8 mg IV only if refractory pain — may delay P2Y12 absorption and increase mortality' },
                    drug: { id: 'aspirin', indication: 'ACS / STEMI (loading)' },
                    lines: [
                        { nodeId: 'stemi-initial-tx', text: 'Aspirin 162–325 mg chewed (if not given prehospital)' },
                    ],
                },
                {
                    id: 'p2y12',
                    layout: 'steps',
                    action: 'Load P2Y12 inhibitor',
                    figure: 'ONE P2Y12 inhibitor',
                    condition: 'before or at time of PCI',
                    nodeIds: ['stemi-p2y12'],
                    lines: [
                        { nodeId: 'stemi-p2y12', text: 'Load with ONE P2Y12 inhibitor before or at time of PCI.' },
                        { nodeId: 'stemi-p2y12', text: 'Discuss with interventional cardiologist.' },
                    ],
                },
                {
                    id: 'lytics',
                    layout: 'drug',
                    action: 'Tenecteplase',
                    figure: 'Single IV bolus',
                    condition: 'PCI NOT available within 120 min',
                    nodeIds: ['stemi-lytics', 'stemi-reperfusion-q'],
                    drug: { id: 'tenecteplase', indication: 'STEMI / Fibrinolysis' },
                    lines: [
                        { nodeId: 'stemi-reperfusion-q', text: 'PCI NOT available within 120 min' },
                        { nodeId: 'stemi-lytics', text: 'Door-to-needle ≤30 minutes.' },
                        { nodeId: 'stemi-lytics', text: 'Check Fibrinolytic Contraindications' },
                        { nodeId: 'stemi-lytics', text: 'Tenecteplase — single weight-based IV bolus (preferred)' },
                    ],
                },
            ],
        },
    ],
};
