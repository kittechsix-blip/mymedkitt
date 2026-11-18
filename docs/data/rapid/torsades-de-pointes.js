// RAPID strip (format v3), Torsades de Pointes. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant; tile order follows the consult's node FLOW. Findings: research/rapid/torsades-de-pointes.findings.json
export const RAPID_TORSADES_DE_POINTES = {
    treeId: 'torsades-de-pointes',
    variants: [
        {
            id: 'torsades',
            label: 'Torsades',
            tiles: [
                {
                    id: 'defibrillate',
                    layout: 'steps',
                    action: 'Defibrillate',
                    figure: 'Unsynchronized',
                    condition: 'Pulseless TdP',
                    nodeIds: ['tdp-pulseless', 'tdp-avoid'],
                    warning: { nodeId: 'tdp-avoid', text: 'If the standard ACLS "VT" protocol is followed with amiodarone, the patient may worsen or die.' },
                    lines: [
                        { nodeId: 'tdp-pulseless', text: 'Unsynchronized defibrillation per standard ACLS energy dosing.' },
                        { nodeId: 'tdp-pulseless', text: 'Repeat defibrillation as needed' },
                    ],
                },
                {
                    id: 'cardiovert',
                    layout: 'steps',
                    action: 'Cardiovert',
                    figure: 'Synchronized',
                    condition: 'Unstable TdP, pulse present',
                    nodeIds: ['tdp-unstable', 'tdp-avoid'],
                    warning: { nodeId: 'tdp-avoid', text: 'If the standard ACLS "VT" protocol is followed with amiodarone, the patient may worsen or die.' },
                    lines: [
                        { nodeId: 'tdp-unstable', text: 'Synchronized cardioversion at standard energy dosing.' },
                        { nodeId: 'tdp-unstable', text: 'Stop all QT-prolonging medications' },
                    ],
                },
                {
                    id: 'magnesium',
                    layout: 'drug',
                    action: 'IV magnesium',
                    figure: '2 g IV',
                    condition: 'All patients, even if serum Mg normal',
                    nodeIds: ['tdp-mg-protocol'],
                    drug: { id: 'magnesium-sulfate', indication: 'Torsades de pointes' },
                    lines: [
                        { nodeId: 'tdp-mg-protocol', text: 'Guideline dose (ACLS / Tzivoni 1988):' },
                        { nodeId: 'tdp-mg-protocol', text: 'Bolus: 2 g IV — over 1–2 min if pulseless/unstable, over 5–15 min if perfusing' },
                        { nodeId: 'tdp-mg-protocol', text: 'Repeat: a second 2 g bolus at 5–15 min if TdP persists or recurs' },
                        { nodeId: 'tdp-mg-protocol', text: 'Infusion — REQUIRED: 1–4 g/hr titrated to serum Mg 3.5–5.0 mg/dL, continued ~24 h or until QTc <500 ms. A bolus alone wears off over hours and TdP recurs.' },
                    ],
                },
                {
                    id: 'overdrive-pacing',
                    layout: 'steps',
                    action: 'Overdrive pacing',
                    figure: '90-110 bpm',
                    condition: 'Refractory to or recurrent after Mg',
                    nodeIds: ['tdp-overdrive'],
                    lines: [
                        { nodeId: 'tdp-overdrive', text: 'For TdP refractory to or recurrent despite magnesium.' },
                        { nodeId: 'tdp-overdrive', text: 'Overdrive Pacing (preferred):' },
                        { nodeId: 'tdp-overdrive', text: 'Transvenous pacing at 90–110 bpm (up to 140 bpm if needed)' },
                        { nodeId: 'tdp-overdrive', text: 'Eliminates the short-long-short sequences that trigger TdP' },
                    ],
                },
                {
                    id: 'isoproterenol',
                    layout: 'drug',
                    action: 'Isoproterenol',
                    figure: '1-10 mcg/min IV',
                    condition: 'Acquired LQTS only; if no pacing',
                    nodeIds: ['tdp-overdrive', 'tdp-congenital'],
                    warning: { nodeId: 'tdp-congenital', text: 'Isoproterenol is CONTRAINDICATED — paradoxically prolongs QT and increases TdP risk' },
                    drug: { id: 'isoproterenol', indication: 'Torsades de pointes (acquired)' },
                    lines: [
                        { nodeId: 'tdp-overdrive', text: 'Pharmacologic Overdrive (bridge to pacing):' },
                        { nodeId: 'tdp-overdrive', text: 'Isoproterenol 1–10 mcg/min IV, titrate to HR 90–110 bpm' },
                        { nodeId: 'tdp-overdrive', text: 'Start at 2 mcg/min, increase every 3–5 min' },
                    ],
                },
                {
                    id: 'lidocaine',
                    layout: 'drug',
                    action: 'IV lidocaine',
                    figure: '1-1.5 mg/kg IV',
                    condition: 'Refractory to Mg + pacing',
                    nodeIds: ['tdp-lidocaine'],
                    drug: {
                        id: 'lidocaine',
                        indication: 'Torsades de pointes',
                        weightCalcs: [{ dosePerKg: 1.5, unit: 'mg', maxDose: 100, label: 'IV push (high end)' }],
                    },
                    lines: [
                        { nodeId: 'tdp-lidocaine', text: 'Lidocaine is one of the few antiarrhythmics SAFE in TdP.' },
                        { nodeId: 'tdp-lidocaine', text: 'Use when TdP is refractory to magnesium + overdrive pacing.' },
                    ],
                },
                {
                    id: 'stop-qt-drugs',
                    layout: 'steps',
                    action: 'Stop QT drugs',
                    figure: 'ALL QT-prolonging',
                    nodeIds: ['tdp-stop-drugs'],
                    lines: [
                        { nodeId: 'tdp-stop-drugs', text: 'Review and discontinue ALL medications that prolong QT.' },
                    ],
                },
            ],
        },
    ],
};
