import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Difficult Airway / Bougie-First. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// One variant: the consult does not fork into different resuscitation paths. Findings: research/rapid/difficult-airway-bougie.findings.json

export const RAPID_DIFFICULT_AIRWAY_BOUGIE: RapidStrip = {
  treeId: 'difficult-airway-bougie',
  variants: [
    {
      id: 'airway',
      label: 'Difficult airway',
      tiles: [
        {
          id: 'surgical-kit',
          layout: 'steps',
          action: 'Backup at bedside',
          figure: 'surgical airway kit',
          condition: 'Before paralysis / induction',
          nodeIds: ['dab-start'],
          lines: [
            { nodeId: 'dab-start', text: 'Before paralysis: Assess predicted difficulty using validated mnemonics.' },
            { nodeId: 'dab-start', text: 'Have backup equipment at bedside — including surgical airway kit — before induction.' },
          ],
        },
        {
          id: 'lemon',
          layout: 'steps',
          action: 'LEMON assessment',
          figure: 'LEMON score ≥4',
          condition: 'Before induction',
          nodeIds: ['dab-lemon'],
          lines: [
            { nodeId: 'dab-lemon', text: 'LEMON score ≥4 predicts difficult intubation.' },
          ],
        },
        {
          id: 'bougie',
          layout: 'steps',
          action: 'Bougie, railroad ETT',
          figure: 'coude tip anterior',
          condition: 'Predicted difficult airway',
          nodeIds: ['dab-technique', 'dab-equipment'],
          warning: { nodeId: 'dab-equipment', text: 'Do NOT preload the bougie through the ETT — it restricts maneuverability.' },
          lines: [
            { nodeId: 'dab-technique', text: 'Coude tip anterior, advance along midline under epiglottis into trachea.' },
            { nodeId: 'dab-technique', text: 'Confirm tracheal placement:' },
            { nodeId: 'dab-technique', text: 'Tracheal clicks — felt at ~15-25 cm (unreliable — do not rely solely)' },
            { nodeId: 'dab-technique', text: 'Hold-up sign — bougie meets resistance at ~30-35 cm (carina). In esophagus, advances freely past 40 cm.' },
            { nodeId: 'dab-technique', text: 'Railroad ETT:' },
            { nodeId: 'dab-technique', text: 'Slide pre-lubricated ETT over bougie' },
            { nodeId: 'dab-technique', text: 'Maintain laryngoscopy during advancement — keep view until tube passes cords' },
          ],
        },
        {
          id: 'limit-attempts',
          layout: 'steps',
          action: 'Limit attempts',
          figure: '3rd failed = failed airway',
          nodeIds: ['dab-max-attempts'],
          lines: [
            { nodeId: 'dab-max-attempts', text: 'Limit intubation attempts.' },
            { nodeId: 'dab-max-attempts', text: 'Between attempts:' },
            { nodeId: 'dab-max-attempts', text: 'Mask ventilate / apneic oxygenation' },
            { nodeId: 'dab-max-attempts', text: 'Change device (DL → VL, or different blade)' },
            { nodeId: 'dab-max-attempts', text: 'Change operator (most experienced available)' },
            { nodeId: 'dab-max-attempts', text: '3rd failed — Declare failed airway' },
          ],
        },
        {
          id: 'capnography',
          layout: 'steps',
          action: 'Waveform capnography',
          figure: 'sustained 4-phase waveform',
          condition: 'Any doubt: remove the tube',
          nodeIds: ['dab-confirm', 'dab-etco2-check', 'dab-no-etco2'],
          lines: [
            { nodeId: 'dab-confirm', text: 'Look for sustained 4-phase waveform × 5-6 breaths' },
            { nodeId: 'dab-etco2-check', text: 'If ANY doubt about tube placement — remove the tube.' },
            { nodeId: 'dab-no-etco2', text: 'No sustained ETCO2 waveform = esophageal placement until proven otherwise.' },
          ],
        },
        {
          id: 'failed-airway',
          layout: 'steps',
          action: 'Declare failed airway',
          figure: 'ALL three lifelines failed',
          condition: 'CICO = cannot oxygenate',
          nodeIds: ['dab-failed', 'dab-can-oxygenate'],
          warning: { nodeId: 'dab-failed', text: 'The hardest part is making the decision to cut — procedures performed too late are the primary cause of bad outcomes.' },
          lines: [
            { nodeId: 'dab-failed', text: 'Declare: "This is a failed airway." Communicate clearly to entire team.' },
            { nodeId: 'dab-failed', text: 'Green Zone = adequate oxygenation by ANY lifeline. Time to think, plan, call for help.' },
            { nodeId: 'dab-failed', text: 'CICO (Can\'t Intubate, Can\'t Oxygenate) = ALL three lifelines failed after best effort. → Immediate front-of-neck access (eFONA).' },
            { nodeId: 'dab-can-oxygenate', text: 'If SpO2 is falling and you cannot ventilate by any method — this is CICO. Proceed immediately to surgical airway.' },
          ],
        },
        {
          id: 'cric',
          layout: 'steps',
          action: 'Cricothyrotomy',
          figure: 'scalpel-bougie, 6.0 mm ETT',
          condition: 'CICO: cannot oxygenate',
          nodeIds: ['dab-cric-go', 'dab-cric-technique'],
          lines: [
            { nodeId: 'dab-cric-technique', text: 'Step 2: Vertical skin incision (~4 cm) over CTM — exposes landmarks even if anatomy is obscured. If anatomy is clear, single horizontal stab may suffice.' },
            { nodeId: 'dab-cric-technique', text: 'Step 3: Palpate CTM with finger through incision — confirm depression between thyroid and cricoid' },
            { nodeId: 'dab-cric-technique', text: 'Step 4: Horizontal stab through CTM (lower half to avoid superior vessels and vocal cords)' },
            { nodeId: 'dab-cric-technique', text: 'Step 5: Extend incision — rotate scalpel 180° and extend in opposite direction (blade stays in)' },
            { nodeId: 'dab-cric-technique', text: 'Step 6: Finger in — replace scalpel with non-dominant index finger through CTM into airway lumen' },
            { nodeId: 'dab-cric-technique', text: 'Step 7: Bougie insertion — slide lubricated bougie alongside finger into trachea, advance until resistance at 10-15 cm' },
            { nodeId: 'dab-cric-technique', text: 'Step 8: Railroad ETT (6.0 mm cuffed) over bougie — advance until cuff disappears into airway' },
            { nodeId: 'dab-cric-technique', text: 'Step 9: Inflate cuff, remove bougie' },
          ],
        },
      ],
    },
  ],
};
