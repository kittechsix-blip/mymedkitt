// RAPID strip (format v3), TCA Overdose. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (the consult's only fork is severity, not different resuscitation paths); 6 of 7 critical actions are on tiles,
// the 7th (infusion / pH target) rides on the bicarbonate tile. Findings: research/rapid/tca-toxidrome.findings.json
export const RAPID_TCA_TOXIDROME = {
    treeId: 'tca-toxidrome',
    variants: [
        {
            id: 'tca-overdose',
            label: 'TCA overdose',
            tiles: [
                {
                    id: 'ecg-stat',
                    layout: 'steps',
                    action: '12-lead ECG',
                    figure: 'STAT',
                    condition: 'Most important test',
                    nodeIds: ['tca-critical'],
                    lines: [
                        { nodeId: 'tca-critical', text: 'Initiate immediately:' },
                        { nodeId: 'tca-critical', text: 'Continuous cardiac monitoring' },
                        { nodeId: 'tca-critical', text: 'Two large-bore IVs' },
                        { nodeId: 'tca-critical', text: '12-lead ECG STAT — most important test' },
                    ],
                },
                {
                    id: 'intubate',
                    layout: 'steps',
                    action: 'Intubate',
                    figure: 'GCS ≤12',
                    condition: 'Avoid hypoventilation afterward',
                    nodeIds: ['tca-intubation', 'tca-critical'],
                    warning: { nodeId: 'tca-intubation', text: '⚠️ CRITICAL: Avoid hypoventilation post-intubation — respiratory acidosis worsens TCA toxicity by increasing free (unbound) drug, creating a vicious spiral.' },
                    lines: [
                        { nodeId: 'tca-critical', text: 'If airway compromise or GCS ≤12 → intubate (see intubation considerations below)' },
                        { nodeId: 'tca-intubation', text: 'Indications: GCS ≤12, seizures, hypoventilation with respiratory acidosis' },
                        { nodeId: 'tca-intubation', text: 'Post-intubation:' },
                        { nodeId: 'tca-intubation', text: 'Immediately hyperventilate — target ETCO2 ~25-30 mmHg while bicarb takes effect' },
                        { nodeId: 'tca-intubation', text: 'Intubation should be done by the most experienced operator available.' },
                    ],
                },
                {
                    id: 'bicarb-bolus',
                    layout: 'drug',
                    action: 'Sodium bicarbonate',
                    figure: '1-2 mEq/kg',
                    condition: 'QRS >100 ms or arrhythmia',
                    nodeIds: ['tca-bicarb', 'tca-bicarb-infusion', 'tca-bicarb-goals'],
                    drug: {
                        id: 'sodium-bicarbonate',
                        indication: 'TCA Overdose — Sodium Channel Blockade',
                        weightCalcs: [{ dosePerKg: 1.5, unit: 'mEq', maxDose: 150, label: 'Bolus (midpoint dose)' }],
                    },
                    lines: [
                        { nodeId: 'tca-bicarb', text: 'Repeat every 3-5 minutes until QRS narrows' },
                        { nodeId: 'tca-bicarb-goals', text: 'Serum pH 7.50–7.55 — achieve via bicarb + hyperventilation if intubated' },
                        { nodeId: 'tca-bicarb-infusion', text: 'Maintenance infusion: 150 mEq (3 amps) in 1L D5W at 150-250 mL/hr' },
                        { nodeId: 'tca-bicarb-infusion', text: 'Continue until QRS normalizes AND remains <100 ms for ≥6 hours' },
                    ],
                },
                {
                    id: 'benzo-seizure',
                    layout: 'drug',
                    action: 'Lorazepam',
                    figure: '0.1 mg/kg IV',
                    condition: 'Active seizure',
                    nodeIds: ['tca-seizure-bzd'],
                    drug: {
                        id: 'lorazepam',
                        indication: 'TCA Overdose — Seizure',
                        weightCalcs: [{ dosePerKg: 0.1, unit: 'mg', maxDose: 4 }],
                    },
                    lines: [
                        { nodeId: 'tca-seizure-bzd', text: 'First-line — choose one:' },
                        { nodeId: 'tca-seizure-bzd', text: 'Lorazepam 0.1 mg/kg IV (max 4 mg) — repeat q5 min' },
                        { nodeId: 'tca-seizure-bzd', text: 'Simultaneously give Sodium Bicarbonate — alkalinize to prevent TCA crossing the BBB and to counteract seizure-induced acidosis' },
                    ],
                },
                {
                    id: 'norepinephrine',
                    layout: 'drug',
                    action: 'Norepinephrine',
                    figure: '0.1-0.5 mcg/kg/min',
                    condition: 'Hypotension; first-line pressor',
                    nodeIds: ['tca-vasopressors'],
                    warning: { nodeId: 'tca-vasopressors', text: '🚫 Avoid pure beta-agonists (dobutamine, low-dose dopamine) — may worsen tachycardia without adequate vasoconstriction.' },
                    drug: {
                        id: 'norepinephrine',
                        indication: 'TCA Overdose — Hypotension',
                    },
                    lines: [
                        { nodeId: 'tca-vasopressors', text: 'Choose vasopressor based on heart rate:' },
                        { nodeId: 'tca-vasopressors', text: 'Norepinephrine — first-line. Alpha agonism directly counters TCA alpha-receptor blockade' },
                    ],
                },
                {
                    id: 'wide-rhythm',
                    layout: 'steps',
                    action: 'Avoid IA/IC agents',
                    figure: 'Wide-complex rhythm',
                    condition: 'Bicarbonate first',
                    nodeIds: ['tca-vtach'],
                    lines: [
                        { nodeId: 'tca-vtach', text: '⚠️ Wide-complex tachycardia in TCA often represents sinus tachycardia with a widened QRS from delayed conduction — NOT true ventricular tachycardia.' },
                        { nodeId: 'tca-vtach', text: '🚫 AVOID: amiodarone (further QTc prolongation), procainamide, flecainide, and ALL Class IA/IC agents — worsen sodium channel blockade.' },
                    ],
                },
                {
                    id: 'lipid-rescue',
                    layout: 'drug',
                    action: 'Lipid emulsion',
                    figure: '1.5 mL/kg',
                    condition: 'Refractory or arrest only',
                    nodeIds: ['tca-lipid'],
                    drug: {
                        id: 'lipid-emulsion',
                        indication: 'TCA Overdose — Cardiac Arrest / Refractory Toxicity',
                        weightCalcs: [{ dosePerKg: 1.5, unit: 'mL', label: 'IV bolus dose' }],
                    },
                    lines: [
                        { nodeId: 'tca-lipid', text: 'rescue therapy for cardiac arrest or refractory toxicity' },
                        { nodeId: 'tca-lipid', text: '⚠️ Should be reserved for life-threatening toxicity unresponsive to other treatments.' },
                    ],
                },
            ],
        },
    ],
};
