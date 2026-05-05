// myMedKitt - Stop Pages Batch 15
// Airway consult critical pitfalls.

import type { InfoPage } from '../info-pages.js';

const SUPRAGLOTTIC_AIRWAY_STOP: InfoPage = {
  id: 'supraglottic-airway-stop',
  title: 'Supraglottic Airway - Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: 'Do NOT confuse ventilation with airway protection',
      body: 'An SGA can ventilate but does not seal the trachea like a cuffed ETT. If aspiration risk or prolonged ventilation matters, use it as a bridge while preparing the definitive airway. [See this node](#/node/sga-definitive-airway).',
    },
    {
      heading: 'Do NOT ignore RODS predictors',
      body: 'Restricted mouth opening, obstruction, distorted anatomy, and stiff lungs/spine predict SGA failure. In a crash airway, RODS does not forbid an attempt, but it should trigger early backup planning. [See this node](#/node/sga-rods-screen).',
    },
    {
      heading: 'Do NOT keep repeating the same failed insertion',
      body: 'Limit SGA placement to 3 attempts total. Change size, device, position, depth, or operator. Repeated attempts add trauma and can worsen BVM, intubation, and cric options. [See this node](#/node/sga-failed-sga).',
    },
    {
      heading: 'Do NOT rely on SGA for obstruction below the glottis',
      body: 'An SGA sits above the glottis. It will not bypass subglottic stenosis, tracheal obstruction, tumor, foreign body, or severe distal bronchospasm. [See this node](#/node/sga-troubleshoot-obstruction).',
    },
    {
      heading: 'Do NOT delay cric in CICO',
      body: 'Failed intubation plus failed SGA plus failed BVM is CICO. Declare it and move to emergency front-of-neck access. More supraglottic attempts are not the rescue. [See this node](#/node/sga-cico).',
    },
    {
      heading: 'Do NOT skip confirmation',
      body: 'Use chest rise, EtCO2, SpO2 trend, bilateral breath sounds, and leak assessment. A device sitting in the mouth is not enough. [See this node](#/node/sga-confirmation).',
    },
  ],
  citations: [],
};

export const STOP_PAGES_15: Record<string, InfoPage> = {
  'supraglottic-airway-stop': SUPRAGLOTTIC_AIRWAY_STOP,
};
