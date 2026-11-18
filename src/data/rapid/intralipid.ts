import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Intralipid / lipid emulsion. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (the indication question does not fork the resuscitation path); LAST-first. Findings: research/rapid/intralipid.findings.json

export const RAPID_INTRALIPID: RapidStrip = {
  treeId: 'intralipid',
  variants: [
    {
      id: 'ile',
      label: 'Lipid emulsion',
      tiles: [
        {
          id: 'stop-la',
          layout: 'steps',
          action: 'Stop LA injection',
          figure: 'Immediately',
          condition: 'First signs of toxicity',
          nodeIds: ['ile-last'],
          lines: [
            { nodeId: 'ile-last', text: 'Stop LA injection immediately' },
            { nodeId: 'ile-last', text: 'At first signs of severe toxicity: Do NOT wait for cardiac arrest' },
          ],
        },
        {
          id: 'lipid-bolus',
          layout: 'drug',
          action: 'Lipid emulsion 20%',
          figure: '1.5 mL/kg IV',
          condition: 'Do NOT wait for cardiac arrest',
          nodeIds: ['ile-dosing-protocol', 'ile-admin-details'],
          warning: { nodeId: 'ile-admin-details', text: 'Bolus should be given over 2-3 minutes (lean body mass) — push it, do not run as a slow drip' },
          drug: {
            id: 'lipid-emulsion',
            indication: 'Local Anesthetic Systemic Toxicity (LAST)',
            weightCalcs: [{ dosePerKg: 1.5, unit: 'mL', label: 'IV bolus dose' }],
          },
          lines: [
            { nodeId: 'ile-dosing-protocol', text: '1.5 mL/kg IV (lean body mass) over 2-3 minutes' },
            { nodeId: 'ile-dosing-protocol', text: 'May double to 0.5 mL/kg/min if circulatory stability not attained' },
            { nodeId: 'ile-dosing-protocol', text: 'If cardiac arrest or recurrent instability:' },
            { nodeId: 'ile-dosing-protocol', text: 'Repeat bolus 1-2 times at 5-minute intervals' },
          ],
        },
        {
          id: 'small-epi',
          layout: 'steps',
          action: 'Small-dose epinephrine',
          figure: '<1 mcg/kg',
          condition: 'LAST arrest, NOT 1 mg',
          nodeIds: ['ile-cpr-modifications'],
          warning: { nodeId: 'ile-cpr-modifications', text: 'High-dose epinephrine may worsen arrhythmias and reduce ILE efficacy' },
          lines: [
            { nodeId: 'ile-cpr-modifications', text: 'Use smaller doses than standard ACLS (<1 mcg/kg)' },
            { nodeId: 'ile-cpr-modifications', text: 'Start with 10-100 mcg IV, NOT 1 mg' },
          ],
        },
        {
          id: 'avoid-drugs',
          layout: 'steps',
          action: 'Avoid these drugs',
          figure: 'Vasopressin, blockers',
          condition: 'During LAST arrest',
          nodeIds: ['ile-cpr-modifications'],
          lines: [
            { nodeId: 'ile-cpr-modifications', text: 'Avoid:' },
            { nodeId: 'ile-cpr-modifications', text: 'Vasopressin - may worsen outcomes in LA toxicity' },
            { nodeId: 'ile-cpr-modifications', text: 'Calcium channel blockers - contraindicated' },
            { nodeId: 'ile-cpr-modifications', text: 'Beta-blockers - contraindicated' },
            { nodeId: 'ile-cpr-modifications', text: 'Lidocaine or local anesthetics - will worsen toxicity' },
          ],
        },
        {
          id: 'prolonged-cpr',
          layout: 'steps',
          action: 'Prolonged CPR',
          figure: '60+ minutes',
          condition: 'LAST arrest',
          nodeIds: ['ile-cpr-modifications'],
          lines: [
            { nodeId: 'ile-cpr-modifications', text: 'LAST patients may have ROSC after 60+ minutes of CPR' },
            { nodeId: 'ile-cpr-modifications', text: 'Continue CPR longer than usual before terminating' },
          ],
        },
        {
          id: 'wean-monitor',
          layout: 'steps',
          action: 'Wean infusion',
          figure: 'Stable 10-15 minutes',
          condition: 'Monitor 4-6 hours after',
          nodeIds: ['ile-endpoints'],
          lines: [
            { nodeId: 'ile-endpoints', text: 'Once stable 10-15 minutes, decrease infusion rate by 50%' },
            { nodeId: 'ile-endpoints', text: 'Monitor for 4-6 hours minimum after discontinuation' },
            { nodeId: 'ile-endpoints', text: 'Toxicity may return as ILE metabolized (6-12 hours)' },
          ],
        },
        {
          id: 'ecmo',
          layout: 'steps',
          action: 'Consider VA-ECMO',
          figure: 'Early cannulation',
          condition: 'Refractory LAST arrest',
          nodeIds: ['ile-dispo-refractory'],
          lines: [
            { nodeId: 'ile-dispo-refractory', text: 'Consider early ECMO cannulation for refractory LAST arrest' },
            { nodeId: 'ile-dispo-refractory', text: 'Continue high-quality CPR while arranging ECMO' },
            { nodeId: 'ile-dispo-refractory', text: 'Continue ILE during CPR (at infusion rate)' },
          ],
        },
      ],
    },
  ],
};
