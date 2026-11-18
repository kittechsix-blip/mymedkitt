import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Pediatric Submersion Injuries. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (the consult's scene-status node routes to different workups, not different resuscitation paths).
// Tile order follows the consult's node FLOW. Findings: research/rapid/peds-submersion.findings.json

export const RAPID_PEDS_SUBMERSION: RapidStrip = {
  treeId: 'peds-submersion',
  variants: [
    {
      id: 'submersion',
      label: 'Submersion',
      tiles: [
        {
          id: 'duration',
          layout: 'steps',
          action: 'Get submersion time',
          figure: 'most important predictor',
          nodeIds: ['submersion-start', 'submersion-scene-info'],
          lines: [
            { nodeId: 'submersion-start', text: 'Submersion duration — most important predictor' },
            { nodeId: 'submersion-scene-info', text: 'Estimated duration of submersion' },
            { nodeId: 'submersion-scene-info', text: 'Time to first breath/pulse' },
          ],
        },
        {
          id: 'breaths',
          layout: 'steps',
          action: 'Airway, rescue breaths',
          figure: '5 rescue breaths',
          condition: 'Cardiac arrest',
          nodeIds: ['submersion-arrest'],
          warning: { nodeId: 'submersion-arrest', text: 'Do NOT attempt Heimlich — aspirated water cannot be expelled' },
          lines: [
            { nodeId: 'submersion-arrest', text: 'Clear airway of water/debris' },
            { nodeId: 'submersion-arrest', text: '5 rescue breaths before compressions' },
            { nodeId: 'submersion-arrest', text: 'Then standard PALS CPR 15:2' },
            { nodeId: 'submersion-arrest', text: 'VF/pVT rare but shockable if present' },
          ],
        },
        {
          id: 'cold-arrest',
          layout: 'steps',
          action: 'Cold arrest',
          figure: 'limit shocks to 3, hold meds',
          condition: 'Core temp <30°C',
          nodeIds: ['submersion-severe-hypothermia', 'submersion-arrest'],
          lines: [
            { nodeId: 'submersion-arrest', text: 'If core temp <30°C: limit shocks to 3, hold meds' },
            { nodeId: 'submersion-severe-hypothermia', text: 'Modified resuscitation:' },
            { nodeId: 'submersion-severe-hypothermia', text: 'Limit defibrillation to 3 attempts until temp >30°C' },
            { nodeId: 'submersion-severe-hypothermia', text: 'Withhold IV medications until temp >30°C' },
            { nodeId: 'submersion-severe-hypothermia', text: 'Continue high-quality CPR' },
          ],
        },
        {
          id: 'rewarm',
          layout: 'steps',
          action: 'Rewarm, continue CPR',
          figure: 'Not dead until warm and dead',
          condition: 'Core temp <30°C: do not terminate',
          nodeIds: ['submersion-severe-hypothermia', 'submersion-termination', 'submersion-arrest'],
          warning: { nodeId: 'submersion-termination', text: 'Core temperature <30°C (continue until rewarmed)' },
          lines: [
            { nodeId: 'submersion-termination', text: 'Do NOT terminate if:' },
            { nodeId: 'submersion-termination', text: 'Core temperature <30°C (continue until rewarmed)' },
            { nodeId: 'submersion-arrest', text: '"Not dead until warm and dead"' },
            { nodeId: 'submersion-severe-hypothermia', text: 'ECMO/cardiopulmonary bypass (if available):' },
            { nodeId: 'submersion-severe-hypothermia', text: 'Gold standard for severe hypothermic arrest' },
            { nodeId: 'submersion-severe-hypothermia', text: 'If ECMO unavailable:' },
            { nodeId: 'submersion-severe-hypothermia', text: 'Warm IV fluids (38-42°C)' },
            { nodeId: 'submersion-severe-hypothermia', text: 'Continue CPR during transport — prolonged resuscitation may be appropriate' },
          ],
        },
        {
          id: 'post-rosc',
          layout: 'steps',
          action: 'Post-ROSC care',
          figure: 'SpO2 94-98%',
          condition: 'After ROSC',
          nodeIds: ['submersion-post-arrest'],
          lines: [
            { nodeId: 'submersion-post-arrest', text: 'Target SpO2 94-98% (avoid hyperoxia)' },
            { nodeId: 'submersion-post-arrest', text: 'Avoid hyperventilation (worsens brain injury)' },
            { nodeId: 'submersion-post-arrest', text: 'Avoid hypotension' },
            { nodeId: 'submersion-post-arrest', text: 'Treat seizures aggressively' },
            { nodeId: 'submersion-post-arrest', text: 'Avoid hypoglycemia and hyperglycemia' },
          ],
        },
        {
          id: 'intubate',
          layout: 'steps',
          action: 'Consider intubation',
          figure: 'GCS ≤8',
          condition: 'Altered mental status',
          nodeIds: ['submersion-ams'],
          warning: { nodeId: 'submersion-ams', text: 'Do NOT attribute AMS solely to drowning — rule out:' },
          lines: [
            { nodeId: 'submersion-ams', text: 'Consider intubation if:' },
            { nodeId: 'submersion-ams', text: 'GCS ≤8' },
            { nodeId: 'submersion-ams', text: 'Unable to protect airway' },
            { nodeId: 'submersion-ams', text: 'Severe hypoxia despite supplemental O2' },
            { nodeId: 'submersion-ams', text: 'Hypoglycemia' },
            { nodeId: 'submersion-ams', text: 'Seizure (pre-drowning)' },
            { nodeId: 'submersion-ams', text: 'Head trauma' },
            { nodeId: 'submersion-ams', text: 'Toxic ingestion' },
          ],
        },
        {
          id: 'observe',
          layout: 'steps',
          action: 'Observe 4-8 hours',
          figure: '4-8 hours',
          condition: 'Low-risk patients',
          nodeIds: ['submersion-observation-ed'],
          lines: [
            { nodeId: 'submersion-observation-ed', text: 'Observe for 4-8 hours if:' },
            { nodeId: 'submersion-observation-ed', text: 'GCS 15, normal mentation throughout' },
            { nodeId: 'submersion-observation-ed', text: 'SpO2 ≥95% on room air at 4-6 hours' },
            { nodeId: 'submersion-observation-ed', text: 'Adequate home observation possible' },
          ],
        },
      ],
    },
  ],
};
