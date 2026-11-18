import type { RapidStrip } from './types.js';

// RAPID strip (format v3), SVT. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant: the consult forks at svt-start (stable / unstable / suspected WPW) but the strip is kept as one ordered list.
// Findings: research/rapid/svt.findings.json

export const RAPID_SVT: RapidStrip = {
  treeId: 'svt',
  variants: [
    {
      id: 'svt',
      label: 'SVT',
      tiles: [
        {
          id: 'cardiovert',
          layout: 'steps',
          action: 'Sync cardiovert',
          figure: 'Start 50-100J',
          condition: 'Unstable SVT',
          nodeIds: ['svt-unstable'],
          warning: { nodeId: 'svt-unstable', text: 'Do NOT delay for vagal maneuvers or adenosine if truly unstable.' },
          lines: [
            { nodeId: 'svt-unstable', text: 'Hypotension (SBP <90)' },
            { nodeId: 'svt-unstable', text: 'Altered mental status' },
            { nodeId: 'svt-unstable', text: 'Chest pain/ischemic ECG changes' },
            { nodeId: 'svt-unstable', text: 'Pulmonary edema' },
            { nodeId: 'svt-unstable', text: 'Signs of shock' },
            { nodeId: 'svt-unstable', text: 'Start: 50-100J' },
            { nodeId: 'svt-unstable', text: 'Escalate: 100 → 200 → 360J if unsuccessful' },
            { nodeId: 'svt-unstable', text: 'Ensure SYNC mode is ON' },
          ],
        },
        {
          id: 'valsalva',
          layout: 'steps',
          action: 'Modified Valsalva',
          figure: 'Blow 15 seconds',
          condition: 'Stable SVT',
          nodeIds: ['svt-valsalva'],
          lines: [
            { nodeId: 'svt-valsalva', text: 'Step 1: Patient sitting upright at 45°' },
            { nodeId: 'svt-valsalva', text: 'Step 2: Blow into 10mL syringe (move plunger) for 15 seconds (~40 mmHg pressure)' },
            { nodeId: 'svt-valsalva', text: 'Step 3: IMMEDIATELY lie patient flat' },
            { nodeId: 'svt-valsalva', text: 'Step 4: Elevate legs to 45° for 15 seconds' },
            { nodeId: 'svt-valsalva', text: 'Step 5: Return to sitting, check rhythm' },
            { nodeId: 'svt-valsalva', text: 'Can repeat 2-3 times' },
          ],
        },
        {
          id: 'adenosine',
          layout: 'drug',
          action: 'Adenosine',
          figure: '6 mg rapid IV push',
          condition: 'Not for pre-excited AF',
          nodeIds: ['svt-adenosine', 'svt-wpw-af'],
          drug: {
            id: 'adenosine',
            indication: 'Adult SVT',
          },
          lines: [
            { nodeId: 'svt-adenosine', text: 'Repeat: 12mg if no response in 1-2 minutes' },
            { nodeId: 'svt-adenosine', text: 'Immediately follow with 20mL NS flush' },
            { nodeId: 'svt-adenosine', text: 'Reduce to 3mg: Central line, transplanted heart, carbamazepine, dipyridamole' },
            { nodeId: 'svt-wpw-af', text: 'WPW + AF: AVOID adenosine/diltiazem/beta-blockers' },
          ],
        },
        {
          id: 'diltiazem',
          layout: 'steps',
          action: 'Diltiazem IV',
          figure: '15-20mg IV over 2 minutes',
          condition: 'Not if SBP <90 or pre-excited AF',
          nodeIds: ['svt-diltiazem'],
          warning: { nodeId: 'svt-diltiazem', text: 'WPW with pre-excited AF' },
          lines: [
            { nodeId: 'svt-diltiazem', text: '15-20mg (0.25 mg/kg) IV over 2 minutes' },
            { nodeId: 'svt-diltiazem', text: 'Repeat Bolus (if needed):' },
            { nodeId: 'svt-diltiazem', text: '20-25mg (0.35 mg/kg) IV in 15 minutes' },
            { nodeId: 'svt-diltiazem', text: 'Contraindications:' },
            { nodeId: 'svt-diltiazem', text: 'Hypotension (SBP <90)' },
            { nodeId: 'svt-diltiazem', text: 'Severe LV dysfunction' },
            { nodeId: 'svt-diltiazem', text: 'Sick sinus syndrome' },
          ],
        },
        {
          id: 'wpw-af-avoid',
          layout: 'steps',
          action: 'AVOID AV blockers',
          figure: 'Irregular, wide, very fast',
          condition: 'WPW + pre-excited AF',
          nodeIds: ['svt-wpw-af'],
          warning: { nodeId: 'svt-wpw-af', text: 'AV nodal blockers remove the "brakes" — AF conducts rapidly down accessory pathway → VF' },
          lines: [
            { nodeId: 'svt-wpw-af', text: 'WPW + AF: AVOID adenosine/diltiazem/beta-blockers' },
            { nodeId: 'svt-wpw-af', text: 'Synchronized Cardioversion (preferred if unstable):' },
            { nodeId: 'svt-wpw-af', text: '100-200J synchronized' },
          ],
        },
        {
          id: 'procainamide',
          layout: 'drug',
          action: 'Procainamide',
          figure: '20-50 mg/min IV',
          condition: 'Pre-excited AF, if stable',
          nodeIds: ['svt-wpw-af'],
          drug: {
            id: 'procainamide',
            indication: 'WPW + A-Fib / Wide-complex tachycardia',
          },
          lines: [
            { nodeId: 'svt-wpw-af', text: 'Procainamide (if stable):' },
            { nodeId: 'svt-wpw-af', text: '20-50 mg/min IV (max 17 mg/kg)' },
          ],
        },
      ],
    },
  ],
};
