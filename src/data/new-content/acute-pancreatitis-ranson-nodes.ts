// DRAFT — Acute Pancreatitis: Ranson severity module (patch content). Not wired.
// Integrator merges RANSON_NODES into ACUTE_PANCREATITIS_NODES (module 1) and RANSON_CITATIONS into the tree CITATIONS.
// Citation numbers 22-24 do not collide with the parent tree's 1-21. Wu 2008 and Banks 2013 are cited as parent #4 and #3 (no duplicate entries).
// Clinical sign-off pending: research/new-content/acute-pancreatitis/patch.md and signoff.md (conflicts, open questions, sign-off checklist).
// Unresolved numbers are shown with their conflict ID; none is presented as a settled cutoff.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const RANSON_NODES: DecisionNode[] = [

  {
    id: 'acute-pancreatitis-ranson-start',
    type: 'info',
    module: 1,
    title: 'Ranson Criteria: When to Use It',
    body: '**Ranson is a 48-hour score. Admission items alone are not a final score.** [22][23][24]\n\n**Which tool, when:**\n• **First 24 h:** BISAP (five items, within 24 h) [4]\n• **Any time:** Revised Atlanta. Organ failure drives classification and management [3]\n• **48 h:** full Ranson score (5 admission items plus 5 or 6 at 48 h) [22][23][24]\n\n**Ranson 3 or higher is commonly taught as severe.** This is an unsourced teaching point. The severe threshold is pending clinician sign-off (patch C6). Do not act on it as an instruction.\n\n**Ranson does not direct therapy.** Read the item breakdown together with Atlanta organ-failure status. [3]\n\n**Open the [Ranson calculator](#/calculator/ranson).**',
    citation: [3, 4, 22, 23, 24],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-variant',
  },

  {
    id: 'acute-pancreatitis-ranson-variant',
    type: 'question',
    module: 1,
    title: 'Which Ranson Cutoffs Apply?',
    body: 'Ranson\'s non-gallstone cutoffs and gallstone cutoffs differ. The non-gallstone set is verified against the 1976 abstract [23]. The gallstone set is attributed to the 1982 review [24] and is provisional.\n\n**Use the etiology you can document.**\n\n**If the cause is still unknown:** no sourced rule says which set to score. The calculator scores one set per run. Which set to use is pending Andy\'s confirmation of the workflow (patch open question).',
    citation: [23, 24],
    options: [
      {
        label: 'Gallstone etiology',
        description: 'Stones on US/CT/ERCP, or biliary history. Gallstone cutoffs (provisional, see node).',
        next: 'acute-pancreatitis-ranson-admit-gs',
      },
      {
        label: 'Non-gallstone etiology',
        description: 'Alcohol, hypertriglyceridemia, post-ERCP, drug, other. Non-gallstone cutoffs.',
        next: 'acute-pancreatitis-ranson-admit-ng',
      },
    ],
  },

  {
    id: 'acute-pancreatitis-ranson-admit-gs',
    type: 'info',
    module: 1,
    title: 'Admission Items: Gallstone Cutoffs',
    body: '**Score each item 1 point if over the cutoff:** [24]\n• Age >70 years\n• WBC >18,000/mm³\n• Glucose >220 mg/dL\n• LDH >400 IU/L\n• AST: one reference gives >250 (units recorded as IU/100 mL there). Other teaching uses a lower value. Unresolved (patch C2). Enter only after the value is confirmed.\n\n**GALLSTONE SET IS PROVISIONAL.** AST (C2), base deficit (C3) and BUN operator (C8) are unresolved. Show the total only with that caveat.\n\n**Admission items are incomplete alone.** Enter them in the [Ranson calculator](#/calculator/ranson) with the gallstone switch on. Leave the 48-hour items for later.',
    citation: [24],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-48h',
  },

  {
    id: 'acute-pancreatitis-ranson-admit-ng',
    type: 'info',
    module: 1,
    title: 'Admission Items: Non-Gallstone Cutoffs',
    body: '**Score each item 1 point if over the cutoff:** [22][23]\n• Age >55 years\n• WBC >16,000/mm³\n• Glucose >200 mg/dL\n• LDH >350 IU/L\n• AST >250 (the 1976 abstract gives Sigma-Frankel units per 100 mL; IU/L not converted, patch C2)\n\n**Admission items are incomplete alone.** Enter them in the [Ranson calculator](#/calculator/ranson) with the gallstone switch off. Leave the 48-hour items for later.',
    citation: [22, 23],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-48h',
  },

  {
    id: 'acute-pancreatitis-ranson-48h',
    type: 'info',
    module: 1,
    title: '48-Hour Items',
    body: '**Score each item 1 point at 48 hours:** [22][23][24]\n\n**Non-gallstone (6 items):**\n• Hematocrit fall >10%\n• BUN rise >5 mg/dL (1976 abstract). The "after IV hydration" qualifier comes from secondary summaries (patch C8).\n• Serum calcium <8 mg/dL (<2.0 mmol/L)\n• PaO₂ <60 mmHg\n• Base deficit >4 mEq/L\n• Sequestered fluid >6 L\n\n**Gallstone (5 items, no PaO₂ item):**\n• Hematocrit fall >10%\n• BUN rise >2 mg/dL after IV hydration. Value and operator unconfirmed (patch C8).\n• Serum calcium <8 mg/dL\n• Base deficit: one reference gives >4 mEq/L. Other teaching gives >5 mEq/L. Both shown; unresolved (patch C3).\n• Sequestered fluid >4 L\n\n**Any 48-hour value missing = score is incomplete. Do not quote a total.**',
    citation: [22, 23, 24],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-total',
  },

  {
    id: 'acute-pancreatitis-ranson-total',
    type: 'question',
    module: 1,
    title: 'Ranson Total at 48 Hours',
    body: '**Total = admission items + 48-hour items.** Maximum 11 (non-gallstone) or 10 (gallstone).\n\n**Pick the band the total falls in.** Band cutoffs come from a reference summary of Ranson 1974. The primary table was not retrieved (patch C1).\n\n**The band does not set severity alone.** Atlanta organ-failure status is separate. [3]',
    citation: [22, 24, 3],
    options: [
      {
        label: '0-2 points',
        description: 'Lowest band',
        next: 'acute-pancreatitis-ranson-result-low',
      },
      {
        label: '3-4 points',
        description: 'Commonly taught as severe (unsourced; C6)',
        next: 'acute-pancreatitis-ranson-result-moderate',
        urgency: 'urgent',
      },
      {
        label: '5-6 points',
        description: 'Band only',
        next: 'acute-pancreatitis-ranson-result-high',
        urgency: 'critical',
      },
      {
        label: '7 or more points',
        description: 'Top band (maximum 11 or 10)',
        next: 'acute-pancreatitis-ranson-result-very-high',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'acute-pancreatitis-ranson-result-low',
    type: 'result',
    module: 1,
    title: 'Ranson 0-2 at 48 Hours',
    body: '**Band 0-2 at 48 h.** Mortality figure not carried here (patch C1). [22][24]\n\n**Still governs:**\n• Atlanta organ-failure status. Persistent organ failure >48 h = severe, regardless of score [3]\n• Re-score if the 48-hour data change',
    recommendation: 'Ranson 0-2 at 48 h: lowest band. Do not de-escalate on the score alone. Atlanta organ-failure status governs.',
    confidence: 'recommended',
    citation: [22, 24, 3],
  },

  {
    id: 'acute-pancreatitis-ranson-result-moderate',
    type: 'result',
    module: 1,
    title: 'Ranson 3-4 at 48 Hours',
    body: '**Band 3-4 at 48 h.** Commonly taught as severe. This is an unsourced teaching point (patch C6). Mortality figure not carried here (patch C1). [22][24]\n\n**Classify with Atlanta organ-failure status, not the score alone.** [3]\n• Check organ failure and local complications ([Complications](#/node/ap-complications-q))\n• Severe pathway, reference only: [Severe AP: critical care](#/node/ap-severe-resus)\n\n**Escalation threshold is pending clinician sign-off (C6).**',
    recommendation: 'Ranson 3-4 at 48 h: commonly taught as severe, unsourced. Classify by Atlanta organ-failure status. Escalation threshold pending clinician sign-off.',
    confidence: 'recommended',
    citation: [22, 24, 3],
  },

  {
    id: 'acute-pancreatitis-ranson-result-high',
    type: 'result',
    module: 1,
    title: 'Ranson 5-6 at 48 Hours',
    body: '**Band 5-6 at 48 h.** Mortality figure not carried here (patch C1). [22][24]\n\n**Classify with Atlanta organ-failure status.** [3]\n• Check organ failure and local complications ([Complications](#/node/ap-complications-q))\n• Severe pathway, reference only: [Severe AP: critical care](#/node/ap-severe-resus)\n• Disposition, reference only: [Disposition](#/node/ap-dispo-complicated)\n\n**Escalation threshold is pending clinician sign-off (C6).**',
    recommendation: 'Ranson 5-6 at 48 h: band only. Classify by Atlanta organ-failure status. Escalation threshold pending clinician sign-off.',
    confidence: 'recommended',
    citation: [22, 24, 3],
  },

  {
    id: 'acute-pancreatitis-ranson-result-very-high',
    type: 'result',
    module: 1,
    title: 'Ranson 7 or More at 48 Hours',
    body: '**Top band: total 7 or more at 48 h.** Maximum 11 (non-gallstone) or 10 (gallstone). Older-series mortality figure not carried here (patch C1). [22][24]\n\n**Classify with Atlanta organ-failure status.** [3]\n• Check organ failure and local complications ([Complications](#/node/ap-complications-q))\n• Disposition, reference only: [Disposition](#/node/ap-dispo-complicated)\n• Re-check each item against the chart before quoting the total\n\n**Escalation threshold is pending clinician sign-off (C6).**',
    recommendation: 'Ranson 7 or more at 48 h: top band. Classify by Atlanta organ-failure status. Escalation threshold pending clinician sign-off.',
    confidence: 'recommended',
    citation: [22, 24, 3],
  },
];

export const RANSON_CITATIONS: Citation[] = [
  { num: 22, text: 'Ranson JH, Rifkind KM, Roses DF, Fink SD, Eng K, Spencer FC. Prognostic signs and the role of operative management in acute pancreatitis. Surg Gynecol Obstet. 1974;139(1):69-81. PMID 4834279.' },
  { num: 23, text: 'Ranson JH, Rifkind KM, Turner JW. Prognostic signs and nonoperative peritoneal lavage in acute pancreatitis. Surg Gynecol Obstet. 1976;143(2):209-219. PMID 941075.' },
  { num: 24, text: 'Ranson JH. Etiological and prognostic factors in human acute pancreatitis: a review. Am J Gastroenterol. 1982;77(9):633-638. PMID 7051819.' },
];
