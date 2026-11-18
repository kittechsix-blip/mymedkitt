import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Eclampsia. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant (the consult's branch node eclampsia-branch is a triage, not a resuscitation fork). Tile order follows node FLOW.
// Findings: research/rapid/eclampsia.findings.json

export const RAPID_ECLAMPSIA: RapidStrip = {
  treeId: 'eclampsia',
  variants: [
    {
      id: 'active-seizure',
      label: 'Active seizure',
      tiles: [
        {
          id: 'protect',
          layout: 'steps',
          action: 'Protect, O2, IVs',
          figure: 'Two large-bore IVs',
          condition: 'Active eclamptic seizure',
          nodeIds: ['eclampsia-seizure-active'],
          warning: { nodeId: 'eclampsia-seizure-active', text: 'Do NOT restrain or place anything in mouth' },
          lines: [
            { nodeId: 'eclampsia-seizure-active', text: 'OB stat consult' },
            { nodeId: 'eclampsia-seizure-active', text: 'Left lateral decubitus position (after seizure) to improve uteroplacental flow' },
            { nodeId: 'eclampsia-seizure-active', text: 'High-flow O2 via non-rebreather' },
            { nodeId: 'eclampsia-seizure-active', text: 'Two large-bore IVs' },
          ],
        },
        {
          id: 'magnesium',
          layout: 'drug',
          action: 'Magnesium sulfate',
          figure: '4-6 g IV',
          condition: 'First-line for eclamptic seizures',
          nodeIds: ['eclampsia-mag-loading', 'eclampsia-mag-toxicity'],
          warning: { nodeId: 'eclampsia-mag-toxicity', text: 'Never give mag if reflexes absent' },
          drug: { id: 'magnesium-sulfate', indication: 'Eclampsia / Pregnancy SE' },
          lines: [
            { nodeId: 'eclampsia-mag-loading', text: '4-6g IV over 15-20 minutes' },
            { nodeId: 'eclampsia-mag-loading', text: 'If seizure ongoing: give 4g IV push over 5 minutes' },
            { nodeId: 'eclampsia-mag-loading', text: 'If already on magnesium when seizure occurs:' },
            { nodeId: 'eclampsia-mag-loading', text: 'Give additional 2g IV bolus over 3-5 minutes' },
          ],
        },
        {
          id: 'mag-toxicity',
          layout: 'drug',
          action: 'Calcium gluconate',
          figure: '1-2 grams IV',
          condition: 'Mg toxicity: absent reflexes, low RR',
          nodeIds: ['eclampsia-mag-toxicity', 'eclampsia-mag-maintenance'],
          warning: { nodeId: 'eclampsia-mag-maintenance', text: 'Do not wait for a serum level.' },
          drug: { id: 'calcium-gluconate', indication: 'Hypermagnesemia / Magnesium Toxicity' },
          lines: [
            { nodeId: 'eclampsia-mag-toxicity', text: 'Stop magnesium infusion immediately' },
            { nodeId: 'eclampsia-mag-toxicity', text: '1g (10mL of 10% solution) IV over 3-5 minutes' },
            { nodeId: 'eclampsia-mag-toxicity', text: 'Can repeat in 5 minutes if needed' },
          ],
        },
        {
          id: 'lorazepam',
          layout: 'drug',
          action: 'IV lorazepam',
          figure: '0.1 mg/kg IV',
          condition: 'Seizures continue despite magnesium',
          nodeIds: ['eclampsia-refractory'],
          drug: {
            id: 'lorazepam',
            indication: 'Status Epilepticus — IV (first-line)',
            weightCalcs: [{ dosePerKg: 0.1, unit: 'mg', maxDose: 4 }],
          },
          lines: [
            { nodeId: 'eclampsia-refractory', text: 'Lorazepam 2-4mg IV' },
            { nodeId: 'eclampsia-refractory', text: 'Use if mag fails or if concern for non-eclamptic etiology' },
            { nodeId: 'eclampsia-refractory', text: 'If seizing on adequate magnesium, consider other causes' },
          ],
        },
        {
          id: 'labetalol',
          layout: 'drug',
          action: 'IV labetalol',
          figure: '20 mg IV, escalating doses',
          condition: 'SBP ≥160 or DBP ≥110',
          nodeIds: ['eclampsia-bp-labetalol', 'eclampsia-bp-assessment'],
          warning: { nodeId: 'eclampsia-bp-assessment', text: 'Never drop MAP by >25% in first hour' },
          drug: { id: 'labetalol', indication: 'Severe hypertension pregnancy (SBP ≥160 or DBP ≥110)' },
          lines: [
            { nodeId: 'eclampsia-bp-assessment', text: 'Treat within 30-60 minutes of confirmed severe hypertension' },
            { nodeId: 'eclampsia-bp-labetalol', text: 'Maximum: 300mg total in escalating protocol' },
            { nodeId: 'eclampsia-bp-labetalol', text: 'Alternative if labetalol contraindicated: Start with hydralazine' },
          ],
        },
        {
          id: 'hydralazine',
          layout: 'drug',
          action: 'IV hydralazine',
          figure: '5–10 mg IV',
          condition: 'Labetalol contraindicated or failed',
          nodeIds: ['eclampsia-bp-hydralazine'],
          drug: { id: 'hydralazine', indication: 'Severe hypertension pregnancy (SBP ≥160 or DBP ≥110)' },
          lines: [
            { nodeId: 'eclampsia-bp-hydralazine', text: 'When to use:' },
            { nodeId: 'eclampsia-bp-hydralazine', text: 'Labetalol contraindicated (asthma, bradycardia)' },
            { nodeId: 'eclampsia-bp-hydralazine', text: 'Labetalol max dose reached without BP control' },
          ],
        },
        {
          id: 'delivery',
          layout: 'steps',
          action: 'Plan delivery',
          figure: 'Stabilize first',
          condition: 'Not during active seizure',
          nodeIds: ['eclampsia-delivery-decision'],
          warning: { nodeId: 'eclampsia-delivery-decision', text: 'Do NOT rush to cesarean during active seizure or immediate postictal period' },
          lines: [
            { nodeId: 'eclampsia-delivery-decision', text: 'Delivery is the definitive treatment for eclampsia.' },
            { nodeId: 'eclampsia-delivery-decision', text: 'Stabilize first (seizure control, BP management)' },
          ],
        },
      ],
    },
  ],
};
