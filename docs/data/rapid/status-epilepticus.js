// RAPID strip (format v3), Status Epilepticus. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant. Tile order follows the consult's node FLOW. Findings: research/rapid/status-epilepticus.findings.json
export const RAPID_STATUS_EPILEPTICUS = {
    treeId: 'status-epilepticus',
    variants: [
        {
            id: 'status-epilepticus',
            label: 'Status epilepticus',
            tiles: [
                {
                    id: 'bao-eyes',
                    layout: 'steps',
                    action: 'Check the eyes',
                    figure: 'Any red flag: pivot to BAO',
                    condition: 'Convulsing: treat SE, re-exam later',
                    nodeIds: ['se-bao-check', 'se-bao-mimicker'],
                    warning: { nodeId: 'se-bao-check', text: 'A "seizure" that won\'t respond to Ativan until you chemically coma them is BASILAR until proven otherwise.' },
                    lines: [
                        { nodeId: 'se-bao-check', text: 'Dysconjugate gaze (one eye drifts away from the other) — SE never makes this; conjugacy is maintained by an intact MLF.' },
                        { nodeId: 'se-bao-mimicker', text: 'Stop chasing SE. Get the CTA. Call neuro-IR.' },
                        { nodeId: 'se-bao-mimicker', text: 'CTA head and neck STAT' },
                        { nodeId: 'se-bao-mimicker', text: 'Activate neuro-IR / stroke team' },
                        { nodeId: 'se-bao-mimicker', text: 'Do not paralyze the brainstem exam away, and do not stop treating seizures.' },
                    ],
                },
                {
                    id: 'glucose',
                    layout: 'steps',
                    action: 'Fingerstick glucose',
                    figure: 'Glucose <60 mg/dL',
                    condition: 'STAT, adults',
                    nodeIds: ['se-glucose-labs'],
                    lines: [
                        { nodeId: 'se-glucose-labs', text: 'Fingerstick glucose STAT — hypoglycemia is a common, easily reversible seizure trigger.' },
                        { nodeId: 'se-glucose-labs', text: 'If glucose <60 mg/dL: D50W 25 g IV (adults) or D10W 2-5 mL/kg (peds)' },
                    ],
                },
                {
                    id: 'lorazepam',
                    layout: 'drug',
                    action: 'IV lorazepam',
                    figure: '0.1 mg/kg',
                    condition: 'IV access; repeat once if still seizing',
                    nodeIds: ['se-iv-bzd'],
                    warning: { nodeId: 'se-iv-bzd', text: 'Monitor for respiratory depression — have bag-valve mask and suction at bedside.' },
                    drug: {
                        id: 'lorazepam',
                        indication: 'Status Epilepticus — IV (first-line)',
                        weightCalcs: [{ dosePerKg: 0.1, unit: 'mg', maxDose: 4 }],
                    },
                    lines: [
                        { nodeId: 'se-iv-bzd', text: 'Lorazepam 0.1 mg/kg IV (max 4 mg/dose), push over 2 min.' },
                        { nodeId: 'se-iv-bzd', text: 'May repeat once in 5-10 minutes if seizure persists' },
                    ],
                },
                {
                    id: 'midazolam-im',
                    layout: 'drug',
                    action: 'IM midazolam',
                    figure: '0.2 mg/kg',
                    condition: 'Only if no IV access',
                    nodeIds: ['se-no-iv-bzd'],
                    drug: {
                        id: 'midazolam',
                        indication: 'Status Epilepticus — IM (no IV access)',
                        weightCalcs: [{ dosePerKg: 0.2, unit: 'mg', maxDose: 10 }],
                    },
                    lines: [
                        { nodeId: 'se-no-iv-bzd', text: 'Midazolam 0.2 mg/kg IM (max 10 mg) into deltoid or vastus lateralis.' },
                        { nodeId: 'se-no-iv-bzd', text: 'Continue attempting IV access — will be needed for 2nd-line agents if BZD fails.' },
                    ],
                },
                {
                    id: 'levetiracetam',
                    layout: 'drug',
                    action: 'IV levetiracetam',
                    figure: '60 mg/kg',
                    condition: 'BZD-refractory; give within 5-10 min',
                    nodeIds: ['se-levetiracetam', 'se-2nd-line-choice'],
                    drug: {
                        id: 'levetiracetam',
                        indication: 'Status Epilepticus — 2nd line (ESETT)',
                        weightCalcs: [{ dosePerKg: 60, unit: 'mg', maxDose: 4500, label: 'SE loading dose (ESETT)' }],
                    },
                    lines: [
                        { nodeId: 'se-2nd-line-choice', text: 'BZD-refractory convulsive SE. Administer within 5-10 minutes of BZD failure.' },
                        { nodeId: 'se-levetiracetam', text: 'Levetiracetam 60 mg/kg IV (max 4500 mg) over 10-15 min.' },
                    ],
                },
                {
                    id: 'rse-airway-eeg',
                    layout: 'steps',
                    action: 'Intubate, start EEG',
                    figure: 'Short-acting paralytic',
                    condition: 'Refractory SE (BZD + 2nd-line failed)',
                    nodeIds: ['se-rse-prep'],
                    lines: [
                        { nodeId: 'se-rse-prep', text: 'Immediate actions:' },
                        { nodeId: 'se-rse-prep', text: 'Secure airway with rapid sequence intubation' },
                        { nodeId: 'se-rse-prep', text: 'Avoid prolonged paralysis — use short-acting agent (succinylcholine preferred over rocuronium) to allow clinical seizure assessment' },
                        { nodeId: 'se-rse-prep', text: 'Continuous EEG monitoring — MANDATORY (cannot assess seizure activity in paralyzed/sedated patient)' },
                    ],
                },
                {
                    id: 'midazolam-infusion',
                    layout: 'drug',
                    action: 'Midazolam infusion',
                    figure: '0.2 mg/kg load',
                    condition: 'Refractory SE; intubated, on EEG',
                    nodeIds: ['se-rse-infusion'],
                    drug: {
                        id: 'midazolam',
                        indication: 'Refractory SE — continuous infusion',
                        weightCalcs: [{ dosePerKg: 0.2, unit: 'mg', label: 'Loading bolus' }],
                    },
                    lines: [
                        { nodeId: 'se-rse-infusion', text: 'Goal: EEG seizure suppression or burst suppression for 24-48 hours before weaning attempt.' },
                    ],
                },
            ],
        },
    ],
};
