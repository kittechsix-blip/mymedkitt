// DRAFT — info pages for Blunt Chest Trauma (not wired). Integrator spreads INFO_PAGES_BCT into INFO_PAGES in info-pages.ts.
// Citations come from the shared constants module so this file does not load the tree.

import type { InfoPage } from '../info-pages.js';
import { BCT_CITATIONS } from './blunt-chest-trauma-citations.js';

const CITATIONS = BCT_CITATIONS.map(c => ({ num: c.num, text: c.text }));

const BCT_STOP: InfoPage = {
  id: 'blunt-chest-trauma-stop',
  title: 'Blunt Chest Trauma — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  citations: CITATIONS,
  sections: [
    {
      heading: '🛑 Contusion without shock: guide fluid by exam and oxygenation',
      body: 'With hemorrhagic shock or bleeding, hemorrhage resuscitation still governs. Without shock, the restrictive-fluid data are observational and do not justify a reflex volume target. Volume overload can worsen oxygenation. [Contusion management](#/node/blunt-chest-trauma-contusion).',
    },
    {
      heading: '🛑 Do NOT clear a patient on a low RibScore or a normal first film',
      body: 'RibScore predicts pulmonary complications; it does not rule them out. A normal first film does not exclude occult pneumothorax, hemothorax or contusion. [RibScore](#/node/blunt-chest-trauma-ribscore) | [Occult injury](#/node/blunt-chest-trauma-occult).',
    },
    {
      heading: '🛑 Do NOT treat rib fractures with opioids alone',
      body: 'Opioid-only plans leave splinting pain in place and limit deep breathing and coughing. Regional block and a multimodal plan are the goal. [Analgesia route](#/node/blunt-chest-trauma-analgesia).',
    },
    {
      heading: '🛑 Do NOT give an NSAID before bleeding and renal review',
      body: 'Anticoagulation, bleeding risk and reduced renal function change the risk. Check all three before any NSAID. [Systemic ladder](#/node/blunt-chest-trauma-multimodal).',
    },
    {
      heading: '🛑 Do NOT promise a pneumonia benefit from non-flail fixation',
      body: 'The pooled signal is mixed-design and mostly non-flail Asian cohorts; the single non-flail RCT does not report pneumonia in its abstract. Refer to thoracic or trauma surgery; the ED does not decide fixation. [Surgical evidence](#/node/blunt-chest-trauma-surgery).',
    },
    {
      heading: '🛑 Do NOT ventilate a flail chest without reassessing after each change',
      body: 'Positive-pressure ventilation can make a flail segment worse. Reassess work of breathing and oxygenation after every change in support. [Flail chest](#/node/blunt-chest-trauma-flail).',
    },
    {
      heading: '🛑 Do NOT discharge with an unresolved anticoagulation or bleeding question',
      body: 'Discharge needs oxygenation normal, pain controlled orally and bleeding concerns resolved, with written return precautions. [Disposition](#/node/blunt-chest-trauma-disposition).',
    },
    {
      heading: '🛑 Do NOT assume a flail or bilateral injury is "just ribs"',
      body: 'A flail or bilateral pattern changes ventilation, analgesia and surgical referral. [Fracture pattern](#/node/blunt-chest-trauma-pattern).',
    },
  ],
};

const BCT_STEPS: InfoPage = {
  id: 'blunt-chest-trauma-steps',
  title: 'Blunt Chest Trauma — Steps Summary',
  subtitle: 'Tap a step to jump to it',
  citations: CITATIONS,
  shareable: true,
  sections: [
    {
      heading: '1. Stabilize',
      body: '- [Immediate physiology](#/node/blunt-chest-trauma-immediate)\n- [Life-threatening chest injury](#/node/blunt-chest-trauma-life-threat)\n- [Occult injury check](#/node/blunt-chest-trauma-occult)',
    },
    {
      heading: '2. Injury pattern',
      body: '- [Imaging for fracture pattern](#/node/blunt-chest-trauma-imaging)\n- [Choose the fracture pattern](#/node/blunt-chest-trauma-pattern)',
    },
    {
      heading: '3. Treatment',
      body: '- [Flail chest](#/node/blunt-chest-trauma-flail)\n- [Pulmonary contusion](#/node/blunt-chest-trauma-contusion)\n- [Ventilation strategy](#/node/blunt-chest-trauma-ventilation)\n- [RibScore](#/node/blunt-chest-trauma-ribscore)\n- [Analgesia route](#/node/blunt-chest-trauma-analgesia)\n- [Regional blocks](#/node/blunt-chest-trauma-block)\n- [Systemic multimodal ladder](#/node/blunt-chest-trauma-multimodal)',
    },
    {
      heading: '4. Risk and surgery',
      body: '- [Surgical stabilization evidence](#/node/blunt-chest-trauma-surgery)',
    },
    {
      heading: '5. Disposition',
      body: '- [Disposition question](#/node/blunt-chest-trauma-disposition)\n- [Admit or observe](#/node/blunt-chest-trauma-admit)\n- [Surgical opinion or transfer](#/node/blunt-chest-trauma-transfer)\n- [Discharge checklist](#/node/blunt-chest-trauma-discharge)',
    },
  ],
};

export const INFO_PAGES_BCT: Record<string, InfoPage> = {
  'blunt-chest-trauma-stop': BCT_STOP,
  'blunt-chest-trauma-steps': BCT_STEPS,
};
