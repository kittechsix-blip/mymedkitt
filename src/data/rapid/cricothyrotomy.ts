import type { RapidStrip } from './types.js';

// RAPID strip (format v3), Emergency Cricothyrotomy. Faces authored; every expansion line is a verbatim node excerpt. Not approved.
// Single variant (the consult's only fork, cric-start, does not split into different resuscitation paths); tile order follows the consult's node FLOW.
// Findings: research/rapid/cricothyrotomy.findings.json

export const RAPID_CRICOTHYROTOMY: RapidStrip = {
  treeId: 'cricothyrotomy',
  variants: [
    {
      id: 'cico',
      label: 'CICO',
      tiles: [
        {
          id: 'declare-cico',
          layout: 'steps',
          action: 'Declare CICO',
          figure: 'Do NOT delay',
          condition: 'Age <10-12: needle cric instead',
          nodeIds: ['cric-start', 'cric-contraindications'],
          warning: { nodeId: 'cric-start', text: 'Do NOT delay — cognitive paralysis kills.' },
          lines: [
            { nodeId: 'cric-start', text: 'CICO = Can\'t Intubate, Can\'t Oxygenate' },
            { nodeId: 'cric-start', text: '"If I cannot intubate AND cannot oxygenate, I MUST perform a surgical airway."' },
            { nodeId: 'cric-contraindications', text: 'Age <10-12 years — cricothyroid membrane too small; use needle cricothyrotomy + jet ventilation' },
          ],
        },
        {
          id: 'find-ctm',
          layout: 'steps',
          action: 'Find membrane',
          figure: 'Notch DOWN',
          condition: 'Laryngeal handshake',
          nodeIds: ['cric-anatomy'],
          lines: [
            { nodeId: 'cric-anatomy', text: '"Laryngeal handshake" technique:' },
            { nodeId: 'cric-anatomy', text: 'Grasp larynx with non-dominant hand (thumb + middle finger on each side)' },
            { nodeId: 'cric-anatomy', text: 'Use index finger to palpate DOWN from thyroid notch' },
            { nodeId: 'cric-anatomy', text: 'Go from notch DOWN, not chin down.' },
          ],
        },
        {
          id: 'vertical-incision',
          layout: 'steps',
          action: 'Vertical incision',
          figure: '4 cm VERTICAL',
          condition: 'Ignore bleeding',
          nodeIds: ['cric-technique-vertical'],
          lines: [
            { nodeId: 'cric-technique-vertical', text: 'Vertical skin incision:' },
            { nodeId: 'cric-technique-vertical', text: 'Make a 4 cm VERTICAL incision through skin' },
            { nodeId: 'cric-technique-vertical', text: 'Start above thyroid notch, extend below cricoid' },
            { nodeId: 'cric-technique-vertical', text: 'Bleeding:' },
            { nodeId: 'cric-technique-vertical', text: 'Expect it. Ignore it.' },
            { nodeId: 'cric-technique-vertical', text: 'Control bleeding AFTER airway is secured' },
          ],
        },
        {
          id: 'stab-ctm',
          layout: 'steps',
          action: 'Stab membrane',
          figure: 'HORIZONTAL stab',
          condition: 'Keep finger in incision',
          nodeIds: ['cric-technique-blunt', 'cric-technique-horizontal'],
          lines: [
            { nodeId: 'cric-technique-blunt', text: 'Push tissue aside until you palpate the CTM' },
            { nodeId: 'cric-technique-horizontal', text: 'Make a HORIZONTAL stab incision through the membrane' },
            { nodeId: 'cric-technique-horizontal', text: 'After incision:' },
            { nodeId: 'cric-technique-horizontal', text: 'Rotate scalpel 90° so blade faces caudally (toward feet)' },
            { nodeId: 'cric-technique-horizontal', text: 'Then REMOVE the scalpel — don\'t leave it in place' },
            { nodeId: 'cric-technique-horizontal', text: 'Keep finger in incision to maintain tract and guide bougie.' },
          ],
        },
        {
          id: 'bougie',
          layout: 'steps',
          action: 'Place bougie',
          figure: 'Feel clicking',
          condition: 'Do NOT force against resistance',
          nodeIds: ['cric-technique-bougie'],
          lines: [
            { nodeId: 'cric-technique-bougie', text: 'Bougie placement:' },
            { nodeId: 'cric-technique-bougie', text: 'Slide bougie alongside your finger through the CTM incision' },
            { nodeId: 'cric-technique-bougie', text: 'Direct caudally (toward feet) into trachea' },
            { nodeId: 'cric-technique-bougie', text: '"Clicking" sensation = bougie passing over tracheal cartilage rings' },
            { nodeId: 'cric-technique-bougie', text: 'Do NOT force against resistance' },
          ],
        },
        {
          id: 'ett-over-bougie',
          layout: 'steps',
          action: 'Tube over bougie',
          figure: '6.0 cuffed ETT',
          condition: 'Do NOT advance far',
          nodeIds: ['cric-technique-ett'],
          warning: { nodeId: 'cric-technique-ett', text: 'Do NOT advance far — risk of right mainstem intubation' },
          lines: [
            { nodeId: 'cric-technique-ett', text: 'Tube insertion:' },
            { nodeId: 'cric-technique-ett', text: 'Thread 6.0 cuffed ETT over the bougie' },
            { nodeId: 'cric-technique-ett', text: 'Advance until cuff is just past skin incision (not too deep)' },
            { nodeId: 'cric-technique-ett', text: 'After ETT in place:' },
            { nodeId: 'cric-technique-ett', text: 'Remove bougie while holding ETT steady' },
            { nodeId: 'cric-technique-ett', text: 'Inflate cuff with 5-10 mL air' },
          ],
        },
        {
          id: 'confirm-etco2',
          layout: 'steps',
          action: 'Confirm ETCO₂',
          figure: 'Waveform capnography',
          condition: 'No ETCO₂ or chest rise: reassess',
          nodeIds: ['cric-confirm'],
          lines: [
            { nodeId: 'cric-confirm', text: 'Gold standard:' },
            { nodeId: 'cric-confirm', text: 'Waveform capnography (ETCO2) — sustained waveform = tracheal' },
            { nodeId: 'cric-confirm', text: 'If NO ETCO2 / no chest rise:' },
            { nodeId: 'cric-confirm', text: 'Deflate cuff, withdraw slightly, reassess' },
          ],
        },
      ],
    },
  ],
};
