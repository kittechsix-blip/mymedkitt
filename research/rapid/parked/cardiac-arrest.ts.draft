import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Cardiac Arrest hub. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant; tile order follows the consult's node FLOW. Findings: research/rapid/cardiac-arrest.findings.json

export const RAPID_CARDIAC_ARREST: RapidStrip = {
  treeId: 'cardiac-arrest',
  variants: [
    {
      id: 'arrest',
      label: 'Cardiac Arrest',
      tiles: [
        {
          id: 'cpr',
          layout: 'steps',
          action: 'Confirm, start CPR',
          figure: '100-120/min',
          condition: 'If unsure, start CPR',
          nodeIds: ['ca-confirm', 'ca-cpr-start'],
          lines: [
            { nodeId: 'ca-confirm', text: 'Confirm arrest in ≤10 seconds:' },
            { nodeId: 'ca-confirm', text: 'No pulse (carotid)' },
            { nodeId: 'ca-confirm', text: 'No breathing or only agonal gasps' },
            { nodeId: 'ca-confirm', text: 'Begin CPR immediately. Do not delay for equipment.' },
            { nodeId: 'ca-cpr-start', text: 'Rate: 100-120 compressions/min' },
            { nodeId: 'ca-cpr-start', text: 'Depth: 2-2.4 inches (5-6 cm) in adults' },
            { nodeId: 'ca-cpr-start', text: 'Full recoil — allow complete chest recoil between compressions' },
            { nodeId: 'ca-cpr-start', text: 'Minimize interruptions — <10 sec for rhythm checks and shocks' },
          ],
        },
        {
          id: 'rhythm-check',
          layout: 'steps',
          action: 'Rhythm check',
          figure: '<10 sec pause',
          condition: 'Shockable vs non-shockable',
          nodeIds: ['ca-rhythm-check', 'ca-shockable-branch'],
          warning: { nodeId: 'ca-shockable-branch', text: 'Polymorphic VT / Torsades: Twisting QRS axis, often with prolonged QTc. Do NOT give amiodarone.' },
          lines: [
            { nodeId: 'ca-rhythm-check', text: 'At 2 minutes: Pause compressions briefly (<10 sec) for rhythm analysis.' },
            { nodeId: 'ca-rhythm-check', text: 'Shockable: VF (chaotic, no organized QRS) or pulseless VT (wide, regular, fast)' },
            { nodeId: 'ca-rhythm-check', text: 'Non-shockable: PEA (organized rhythm, no pulse) or asystole (flatline — confirm in 2 leads)' },
          ],
        },
        {
          id: 'etco2',
          layout: 'steps',
          action: 'Watch ETCO2',
          figure: '>20 mmHg adequate',
          condition: 'Waveform capnography',
          nodeIds: ['ca-universal'],
          lines: [
            { nodeId: 'ca-universal', text: 'ETCO2 targets (waveform capnography):' },
            { nodeId: 'ca-universal', text: '>20 mmHg = adequate CPR quality' },
            { nodeId: 'ca-universal', text: 'Sudden jump >10 mmHg = likely ROSC — check pulse' },
          ],
        },
        {
          id: 'access',
          layout: 'steps',
          action: 'IV, else IO',
          figure: 'no IV within 60 seconds',
          condition: 'Do not delay CPR',
          nodeIds: ['ca-access'],
          lines: [
            { nodeId: 'ca-access', text: 'Access priority (do not delay CPR):' },
            { nodeId: 'ca-access', text: 'Large-bore peripheral IV — antecubital preferred, follow with 20 mL flush' },
            { nodeId: 'ca-access', text: 'IO — if no IV within 60 seconds' },
            { nodeId: 'ca-access', text: 'Proximal tibia (tibial plateau) — preferred in adults' },
          ],
        },
        {
          id: 'epinephrine',
          layout: 'steps',
          action: 'Epinephrine',
          figure: '1 mg IV/IO',
          condition: 'Non-shock: 1st cycle; VF/pVT: 2nd shock',
          nodeIds: ['ca-epi'],
          warning: { nodeId: 'ca-epi', text: 'Do NOT use high-dose epinephrine (Class 3: No Benefit)' },
          lines: [
            { nodeId: 'ca-epi', text: 'Epinephrine 1 mg IV/IO every 3-5 minutes' },
            { nodeId: 'ca-epi', text: '| Non-shockable (PEA/asystole) | After 1st cycle — give ASAP |' },
            { nodeId: 'ca-epi', text: '| Shockable (VF/pVT) | After 2nd shock |' },
            { nodeId: 'ca-epi', text: 'Follow each dose with 20 mL NS flush' },
            { nodeId: 'ca-epi', text: 'Continue throughout resuscitation until ROSC or termination' },
          ],
        },
        {
          id: 'reversible-causes',
          layout: 'steps',
          action: 'Treat reversible causes',
          figure: '5 H\'s and 5 T\'s',
          condition: 'At every pulse check',
          nodeIds: ['ca-hs-ts', 'ca-pocus-arrest'],
          warning: { nodeId: 'ca-pocus-arrest', text: 'POCUS during pulse checks ONLY — do NOT interrupt compressions.' },
          lines: [
            { nodeId: 'ca-hs-ts', text: 'Search for reversible causes at EVERY pulse check.' },
            { nodeId: 'ca-hs-ts', text: 'Hypoxia — POCUS: lung sliding, B-lines. Rx: secure airway, FiO2 100%' },
            { nodeId: 'ca-hs-ts', text: 'Hypovolemia — POCUS: flat IVC, no cardiac activity. Rx: volume, blood' },
            { nodeId: 'ca-hs-ts', text: 'Tension PTX — POCUS: absent lung sliding. Rx: needle decompression → chest tube' },
            { nodeId: 'ca-hs-ts', text: 'Tamponade — POCUS: pericardial effusion + RV collapse. Rx: pericardiocentesis' },
          ],
        },
        {
          id: 'termination',
          layout: 'steps',
          action: 'Consider termination',
          figure: 'ETCO2 <10 at 20 min',
          condition: 'Causes treated, CPR adequate',
          nodeIds: ['ca-tor-criteria', 'ca-universal', 'ca-no-activity'],
          lines: [
            { nodeId: 'ca-universal', text: '<10 mmHg after 20 min = consider termination of resuscitation' },
            { nodeId: 'ca-tor-criteria', text: 'These are guidelines, not mandates. Clinical judgment supersedes.' },
            { nodeId: 'ca-no-activity', text: 'Adequate CPR quality maintained (ETCO2 was >20 at some point)' },
            { nodeId: 'ca-no-activity', text: 'All reversible causes considered and treated' },
            { nodeId: 'ca-no-activity', text: 'No hypothermia (warm the patient before declaring death)' },
          ],
        },
      ],
    },
  ],
};
