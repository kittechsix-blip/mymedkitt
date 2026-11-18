import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Emergency Burr Hole. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (the consult does not fork into different resuscitation paths); 7 tiles in node FLOW order. Findings: research/rapid/burr-hole.findings.json

export const RAPID_BURR_HOLE: RapidStrip = {
  treeId: 'burr-hole',
  variants: [
    {
      id: 'burr-hole',
      label: 'Burr hole',
      tiles: [
        {
          id: 'indications',
          layout: 'steps',
          action: 'Confirm indications',
          figure: 'CT + shift + GCS < 8 + pupil',
          condition: 'Neurosurgery unavailable within 2 hours',
          nodeIds: ['bh-indications'],
          lines: [
            { nodeId: 'bh-indications', text: 'Absolute Indications:' },
            { nodeId: 'bh-indications', text: '✅ CT-confirmed epidural or subdural hematoma' },
            { nodeId: 'bh-indications', text: '✅ AND Midline shift on imaging' },
            { nodeId: 'bh-indications', text: '✅ AND GCS < 8 or rapidly deteriorating' },
            { nodeId: 'bh-indications', text: '✅ AND Unilateral fixed/dilated pupil (anisocoria)' },
            { nodeId: 'bh-indications', text: '✅ AND Neurosurgery unavailable within 2 hours' },
          ],
        },
        {
          id: 'contraindications',
          layout: 'steps',
          action: 'Check contraindications',
          figure: 'GCS 3, both pupils fixed',
          condition: 'Do NOT drill if present',
          nodeIds: ['bh-contraindications'],
          warning: { nodeId: 'bh-contraindications', text: '❌ GCS 3 with bilateral fixed/dilated pupils' },
          lines: [
            { nodeId: 'bh-contraindications', text: 'DO NOT Perform Burr Hole If:' },
            { nodeId: 'bh-contraindications', text: '❌ Neurosurgery available within reasonable timeframe' },
            { nodeId: 'bh-contraindications', text: '❌ Clinical improvement with medical management' },
            { nodeId: 'bh-contraindications', text: '❌ Intraparenchymal hemorrhage without extra-axial component' },
            { nodeId: 'bh-contraindications', text: '❌ Posterior fossa lesion' },
          ],
        },
        {
          id: 'site-side',
          layout: 'steps',
          action: 'Pick site',
          figure: '>=3 cm from midline',
          condition: 'CT-guided preferred',
          nodeIds: ['bh-side-selection', 'bh-anatomy-landmarks'],
          warning: { nodeId: 'bh-anatomy-landmarks', text: '🚫 Sagittal Sinus: Stay ≥3 cm lateral to midline' },
          lines: [
            { nodeId: 'bh-side-selection', text: 'Rule #1: CT-Guided is ALWAYS Preferred' },
            { nodeId: 'bh-side-selection', text: 'Do not open a head on pupil alone if CT is obtainable.' },
            { nodeId: 'bh-anatomy-landmarks', text: '📍 Location: 2 finger-breadths (3-4 cm) ABOVE and ANTERIOR to the tragus' },
          ],
        },
        {
          id: 'osmotherapy',
          layout: 'drug',
          action: 'Mannitol',
          figure: '0.5-1.5 g/kg',
          condition: 'Osmotherapy, start now',
          nodeIds: ['bh-pre-procedure'],
          drug: {
            id: 'mannitol',
            indication: 'Brain herniation',
            weightCalcs: [{ dosePerKg: 1, unit: 'g', label: 'Standard herniation dose (1 g/kg)' }],
          },
          lines: [
            { nodeId: 'bh-pre-procedure', text: '□ Osmotherapy (Start Now):' },
            { nodeId: 'bh-pre-procedure', text: 'Mannitol 0.5-1 g/kg IV OR' },
            { nodeId: 'bh-pre-procedure', text: 'Hypertonic saline 23.4% 30mL' },
          ],
        },
        {
          id: 'drill',
          layout: 'steps',
          action: 'Drill, clutch bit',
          figure: 'Do not stop, restart',
          condition: 'Perpendicular, steady pressure',
          nodeIds: ['bh-drill-technique'],
          lines: [
            { nodeId: 'bh-drill-technique', text: '⚠️ CRITICAL: Use Clutch Bit If Available' },
            { nodeId: 'bh-drill-technique', text: 'Position: Drill PERPENDICULAR to skull surface' },
            { nodeId: 'bh-drill-technique', text: 'Pressure: Apply firm, STEADY downward pressure' },
            { nodeId: 'bh-drill-technique', text: 'Drill Continuously: Do NOT stop and restart' },
          ],
        },
        {
          id: 'evacuate',
          layout: 'steps',
          action: 'Decompress clot',
          figure: 'Do not suction brain',
          condition: 'Epidural: spontaneous drainage first',
          nodeIds: ['bh-edh-drainage', 'bh-evacuate-edh', 'bh-sdh-drainage'],
          warning: { nodeId: 'bh-edh-drainage', text: 'NEVER suction brain tissue' },
          lines: [
            { nodeId: 'bh-edh-drainage', text: 'Allow Spontaneous Drainage:' },
            { nodeId: 'bh-edh-drainage', text: 'Blood under pressure will drain on its own' },
            { nodeId: 'bh-edh-drainage', text: 'Do NOT explore beyond visible area' },
            { nodeId: 'bh-edh-drainage', text: 'Goal is decompression, not complete removal' },
            { nodeId: 'bh-sdh-drainage', text: 'Must open dura to drain.' },
            { nodeId: 'bh-evacuate-edh', text: 'D. Brain Tissue Visible' },
            { nodeId: 'bh-evacuate-edh', text: 'Stop — do NOT explore further' },
          ],
        },
        {
          id: 'close-loose',
          layout: 'steps',
          action: 'Loose dressing',
          figure: 'No tight packing',
          condition: 'Tamponade raises ICP',
          nodeIds: ['bh-wound-closure'],
          warning: { nodeId: 'bh-wound-closure', text: 'Tight packing INCREASES ICP' },
          lines: [
            { nodeId: 'bh-wound-closure', text: '⚠️ CRITICAL: DO NOT Tamponade' },
            { nodeId: 'bh-wound-closure', text: 'Loose Dressing ONLY:' },
            { nodeId: 'bh-wound-closure', text: 'Do NOT apply pressure dressing' },
          ],
        },
      ],
    },
  ],
};
