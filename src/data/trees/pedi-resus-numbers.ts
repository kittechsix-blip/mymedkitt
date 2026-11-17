// MedKitt: Pedi Resus Numbers (added 2026-11-16)
// Color Zone Tape (Broselow-equivalent): age, weight or length to zone, equipment and resuscitation doses.
// All numbers live in the calculators (src/components/pedi-resus-engine.ts); this tree explains how they are chosen.
// 5 modules. Sources: Randall card 2020, Children's MN card 06/2025, AHA 2020 and 2025, ERC/RCUK 2025, ECRI/ISMP alert Jan 2026,
// Duracher 2008, Holliday and Segar 1957, Luscombe and Owens 2007, APLS 2011.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const PEDI_RESUS_NUMBERS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: COLOR ZONE TAPE
  // =====================================================================

  {
    id: 'prn-start',
    type: 'info',
    module: 1,
    title: 'Pedi Resus Numbers: Color Zone Tape',
    body: '[Steps Summary](#/info/pedi-resus-summary)\n\n**Open the Color Zone Tape first.** Enter an age, a weight or a length. The zone, tube sizes, lines and every resuscitation dose (mg and mL, cap applied) recompute as you type, and the tool works offline. [1][2]\n\nThe focused tools below use the same engine, so the numbers never disagree.',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'pedi-zone', label: 'Color Zone Tape (all tabs)' },
      { id: 'pedi-weight', label: 'Weight Estimate' },
      { id: 'pedi-airway', label: 'ETT Size and Depth' },
      { id: 'pedi-tubes', label: 'Tubes and Lines' },
      { id: 'pedi-arrest', label: 'Arrest and Rhythm' },
      { id: 'pedi-rsi', label: 'RSI' },
      { id: 'pedi-seizure', label: 'Seizure' },
      { id: 'pedi-shock', label: 'Shock, Fluids and Vitals' },
    ],
    next: 'prn-weight',
    summary: 'Enter age, weight or length: zone, sizes and doses at once',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 2: WHICH WEIGHT
  // =====================================================================

  {
    id: 'prn-weight',
    type: 'info',
    module: 2,
    title: 'How the Weight Is Chosen',
    body: '**Priority: measured weight, then length, then age.** A measured weight always wins. Length maps to a zone and uses the zone midpoint. [1][2]\n\n**Age estimate (APLS 2011):** under 12 months, 0.5 x months + 4; 1 to 5 years, 2 x age + 8; 6 to 12 years, 3 x age + 7. Over 12 years the formula is unreliable: use the actual weight. [10][9]\n\n**Obese child:** dose resuscitation drugs by the weight estimated from length or age (ideal weight), not by actual weight.\n\nUnder 3 kg, an age under 1 month, or a gestational age is outside the tape: use [Neonate Numbers](#/node/prn-neonate).',
    citation: [1, 2, 9, 10],
    next: 'prn-airway',
    summary: 'Measured weight, then length, then APLS age estimate; obese children by ideal weight',
  },

  // =====================================================================
  // MODULE 3: AIRWAY
  // =====================================================================

  {
    id: 'prn-airway',
    type: 'info',
    module: 3,
    title: 'Airway Sizing Notes',
    body: '**Cuffed tubes are preferred at every age;** the uncuffed size is shown beside it. [3][2]\n\nFrom age 2 years the tool also shows the formula check: cuffed age/4 + 3.5, uncuffed age/4 + 4, depth at the lip age/2 + 12 cm. [7]\n\n**Formulas predict the right size only about 50 to 75% of the time:** have a half size up and a half size down open, and confirm placement with waveform capnography. [7]',
    citation: [2, 3, 7],
    calculatorLinks: [{ id: 'pedi-airway', label: 'ETT Size and Depth' }],
    next: 'prn-neonate',
    summary: 'Cuffed first; formulas are right 50 to 75% of the time; have half sizes ready',
  },

  // =====================================================================
  // MODULE 4: NEONATE
  // =====================================================================

  {
    id: 'prn-neonate',
    type: 'info',
    module: 4,
    title: 'Neonate or Under 3 kg',
    body: 'The zone tape starts at 3 kg. For a newborn, an infant under 1 month or a preterm infant use **Neonate Numbers (<3 kg)**: tube size and depth by weight and gestational age, ventilation, compressions and epinephrine in mg and mL (2025 AHA/AAP). The pedi tool opens it automatically from the same input. The Neonatal Resuscitation (NRP) consult has the full algorithm. [1][2]',
    citation: [1, 2],
    calculatorLinks: [{ id: 'neo-numbers', label: 'Neonate Numbers (<3 kg)' }, { id: 'neonatal-resus', label: 'Neonatal Resuscitation (NRP)', kind: 'tree' }],
    next: 'prn-safety',
    summary: 'Under 3 kg or under 1 month: use Neonate Numbers',
  },

  // =====================================================================
  // MODULE 5: SAFETY
  // =====================================================================

  {
    id: 'prn-safety',
    type: 'result',
    module: 5,
    title: 'Pitfall: Verify Printed Tapes',
    body: 'ECRI and ISMP issued a joint hazard alert (revised January 22, 2026) on the **2025 AirLife Broselow Rainbow Tape, Rev 3**: vecuronium listed in mg/mL instead of mg/kg, a 10-fold flumazenil error, and a 10-fold ketamine analgesia error. [6]\n\nThis tool omits vecuronium on purpose (Children\'s Minnesota: not recommended, overdose risk) and lists no flumazenil or analgesic ketamine row. [2]',
    citation: [2, 6],
    recommendation: 'Check any printed length-based tape against the ECRI/ISMP alert before use, and confirm concentrations against the vial in hand.',
    confidence: 'recommended',
    summary: 'Recalled tape had 10-fold errors; verify printed tapes and vial concentrations',
    safetyLevel: 'critical',
  },

];

export const PEDI_RESUS_NUMBERS_MODULE_LABELS = [
  'Color Zone Tape',
  'Which Weight',
  'Airway',
  'Neonate',
  'Safety',
];

export const PEDI_RESUS_NUMBERS_CITATIONS: Citation[] = [
  { num: 1, text: 'Randall Children\'s Hospital. Pediatric Emergency Quick Reference (Randall card). Oregon EMS for Children; Oct 2020. https://www.oregon.gov/oha/PH/PROVIDERPARTNERRESOURCES/EMS/EMSFORCHILDREN/Documents/Emergency-Quick-Reference-Randall.PDF' },
  { num: 2, text: 'Children\'s Minnesota. Pediatric Emergency Reference Card M0055; 06/2025. https://cmn.education.childrensmn.org/sites/default/files/media/2025-06/M0055_CRT_EDT_Ped%20Emergency%20reference%20card.pdf' },
  { num: 3, text: 'Topjian AA, Raymond TT, Atkins D, et al. Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2020;142(16 suppl 2):S469-S523.' },
  { num: 4, text: 'Lasa JJ, Dhillon GS, Duff JP, et al. Part 8: Pediatric Advanced Life Support: 2025 American Heart Association and American Academy of Pediatrics Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2025;152(16 suppl 2). doi:10.1161/CIR.0000000000001368.' },
  { num: 5, text: 'European Resuscitation Council and Resuscitation Council UK. Paediatric Life Support Guidelines 2025. Resuscitation. 2025.' },
  { num: 6, text: 'ECRI and ISMP. Joint hazard alert: action needed to address incorrect information on the Broselow Rainbow Tape; rev. Jan 22, 2026. https://home.ecri.org/blogs/ismp-alerts-and-articles-library/joint-hazard-alert-action-needed-to-address-incorrect-information-on-the-broselow-rainbow-tape' },
  { num: 7, text: 'Duracher C, Schmautz E, Martinon C, et al. Evaluation of cuffed tracheal tube size predicted using the Khine formula in children. Paediatr Anaesth. 2008;18(2):113-118. PMID 18184241.' },
  { num: 8, text: 'Holliday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. Pediatrics. 1957;19(5):823-832. PMID 13431307.' },
  { num: 9, text: 'Luscombe M, Owens B. Weight estimation in resuscitation: is the current formula still valid? Arch Dis Child. 2007;92(5):412-415. PMID 17213259.' },
  { num: 10, text: 'Advanced Life Support Group. Advanced Paediatric Life Support: The Practical Approach. 5th ed. Wiley-Blackwell; 2011.' },
];

export const PEDI_RESUS_NUMBERS_CRITICAL_ACTIONS = [
  { text: 'Open the Color Zone Tape: enter age, weight or length', nodeId: 'prn-start' },
  { text: 'Measured weight first; obese child: dose by ideal weight', nodeId: 'prn-weight' },
  { text: 'Under 3 kg or under 1 month: use Neonate Numbers', nodeId: 'prn-neonate' },
  { text: 'Verify printed tapes against the ECRI/ISMP alert and the vial concentration', nodeId: 'prn-safety' },
];

export const PEDI_RESUS_NUMBERS_NODE_COUNT = PEDI_RESUS_NUMBERS_NODES.length;
