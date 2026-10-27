// Acute Pancreatitis: Ranson severity module. Not wired (integrator merges it into the tree).
// Integrator merges RANSON_NODES into ACUTE_PANCREATITIS_NODES (module 1) and RANSON_CITATIONS into the tree CITATIONS.
// Citation numbers 22-24 do not collide with the parent tree's 1-21. Wu 2008 and Banks 2013 are cited as parent #4 and #3 (no duplicate entries).
// Unresolved numbers are shown with their caveat; none is presented as a settled cutoff.

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
    body: '**Ranson is a 48-hour score. Admission items alone are not a final score.** [22][23][24]\n\n**Which tool, when:**\n• **First 24 h:** BISAP (five items, within 24 h) [4]\n• **Any time:** Revised Atlanta. Organ failure drives classification and management [3]\n• **48 h:** full Ranson score (5 admission items plus 5 or 6 at 48 h) [22][23][24]\n\n**Ranson 3 or higher is commonly taught as severe.** This is a teaching convention, not a sourced cutoff. Do not act on it as an instruction on its own.\n\n**Ranson does not direct therapy.** Read the item breakdown together with Atlanta organ-failure status.\n\n**Open the [Ranson calculator](#/calculator/ranson).**',
    citation: [3, 4, 22, 23, 24],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-variant',
  },

  {
    id: 'acute-pancreatitis-ranson-variant',
    type: 'question',
    module: 1,
    title: 'Which Ranson Cutoffs Apply?',
    body: 'Ranson\'s non-gallstone cutoffs and gallstone cutoffs differ. The non-gallstone set is taken from the 1976 abstract [23]. The gallstone set is attributed to the 1982 review [24] and is provisional.\n\n**Rule:** use the gallstone set only when a biliary cause is confirmed. If the biliary cause is not confirmed, including when the etiology is unknown, use the non-gallstone set.\n\nThe calculator scores one set per run.',
    citation: [23, 24],
    options: [
      {
        label: 'Gallstone etiology',
        description: 'Biliary cause confirmed, for example stones on US, CT or ERCP. Gallstone cutoffs (provisional).',
        next: 'acute-pancreatitis-ranson-admit-gs',
      },
      {
        label: 'Non-gallstone etiology',
        description: 'Biliary cause not confirmed (includes unknown etiology), or alcohol, hypertriglyceridemia, post-ERCP, drug, other. Non-gallstone cutoffs.',
        next: 'acute-pancreatitis-ranson-admit-ng',
      },
    ],
  },

  {
    id: 'acute-pancreatitis-ranson-admit-gs',
    type: 'info',
    module: 1,
    title: 'Admission Items: Gallstone Cutoffs',
    body: '**Gallstone set (provisional). Score each item 1 point if over the cutoff:** [24]\n• Age >70 years\n• WBC >18,000/mm³\n• Glucose >220 mg/dL\n• LDH >400 IU/L\n• AST >250 (units not verified for this set; the 1976 Sigma-Frankel units belong to the non-gallstone set). Other teaching uses a lower value. Confirm the value and its units with the lab before entering it.\n\n**Gallstone cutoffs are provisional.** The AST cutoff, the base-deficit cutoff and the BUN rule for the 48-hour items differ across references. Show the total only with that caveat.\n\n**Admission items are incomplete alone.** Enter them in the [Ranson calculator](#/calculator/ranson) with the gallstone switch on. Leave the 48-hour items for later.',
    citation: [24],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-48h',
  },

  {
    id: 'acute-pancreatitis-ranson-admit-ng',
    type: 'info',
    module: 1,
    title: 'Admission Items: Non-Gallstone Cutoffs',
    body: '**Score each item 1 point if over the cutoff:** [22][23]\n• Age >55 years\n• WBC >16,000/mm³\n• Glucose >200 mg/dL\n• LDH >350 IU/L\n• AST >250 Sigma-Frankel units/100 mL (1976 abstract units; convert per lab)\n\n**Admission items are incomplete alone.** Enter them in the [Ranson calculator](#/calculator/ranson) with the gallstone switch off. Leave the 48-hour items for later.',
    citation: [22, 23],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-48h',
  },

  {
    id: 'acute-pancreatitis-ranson-48h',
    type: 'info',
    module: 1,
    title: '48-Hour Items',
    body: '**Score each item 1 point at 48 hours:** [22][23][24]\n\n**Non-gallstone (6 items):**\n• Hematocrit fall >10%\n• BUN rise >5 mg/dL (1976 abstract). The "after IV hydration" qualifier comes from secondary summaries, not the primary abstract.\n• Serum calcium <8 mg/dL (<2.0 mmol/L)\n• PaO₂ <60 mmHg\n• Base deficit >4 mEq/L\n• Sequestered fluid >6 L\n\n**Gallstone set (provisional; 5 items, no PaO₂ item):**\n• Hematocrit fall >10%\n• BUN rise >2 mg/dL (provisional; not confirmed against the primary text).\n• Serum calcium <8 mg/dL\n• Base deficit: one reference gives >4 mEq/L. Other teaching gives >5 mEq/L. Both shown; the sources differ.\n• Sequestered fluid >4 L (provisional)\n\n**Any 48-hour value missing = score is incomplete. Do not quote a total.**',
    citation: [22, 23, 24],
    calculatorLinks: [{ id: 'ranson', label: 'Ranson Criteria' }],
    next: 'acute-pancreatitis-ranson-total',
  },

  {
    id: 'acute-pancreatitis-ranson-total',
    type: 'question',
    module: 1,
    title: 'Ranson Total at 48 Hours',
    body: '**Total = admission items + 48-hour items.** Maximum 11 (non-gallstone) or 10 (gallstone).\n\n**Pick the band the total falls in.** These are commonly used bands, not a sourced cutoff set.\n\n**The band does not set severity alone.** Atlanta organ-failure status is separate. [3]',
    citation: [3],
    options: [
      {
        label: '0-2 points',
        description: 'Lowest band',
        next: 'acute-pancreatitis-ranson-result-low',
      },
      {
        label: '3-4 points',
        description: 'Commonly taught as severe (teaching convention, not sourced)',
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
    body: '**Band 0-2 at 48 h (commonly used band).** Mortality figures are not reproduced in this module.\n\n**Still governs:**\n• Atlanta organ-failure status. Persistent organ failure >48 h = severe, regardless of score [3]\n• Re-score if the 48-hour data change',
    recommendation: 'Ranson 0-2 at 48 h: lowest band. Do not de-escalate on the score alone. Atlanta organ-failure status governs.',
    confidence: 'recommended',
    citation: [3],
  },

  {
    id: 'acute-pancreatitis-ranson-result-moderate',
    type: 'result',
    module: 1,
    title: 'Ranson 3-4 at 48 Hours',
    body: '**Band 3-4 at 48 h (commonly used band).** Commonly taught as severe. This is a teaching convention, not a sourced cutoff. Mortality figures are not reproduced in this module.\n\n**Classify with Atlanta organ-failure status, not the score alone.** [3]\n• Check organ failure and local complications ([Complications](#/node/ap-complications-q))\n• Severe pathway, reference only: [Severe AP: critical care](#/node/ap-severe-resus)\n\n**Escalation threshold: not set by a sourced reference here. Follow local protocol.**',
    recommendation: 'Ranson 3-4 at 48 h: commonly taught as severe, not a sourced cutoff. Classify by Atlanta organ-failure status. Escalation threshold per local protocol.',
    confidence: 'recommended',
    citation: [3],
  },

  {
    id: 'acute-pancreatitis-ranson-result-high',
    type: 'result',
    module: 1,
    title: 'Ranson 5-6 at 48 Hours',
    body: '**Band 5-6 at 48 h (commonly used band).** Mortality figures are not reproduced in this module.\n\n**Classify with Atlanta organ-failure status.** [3]\n• Check organ failure and local complications ([Complications](#/node/ap-complications-q))\n• Severe pathway, reference only: [Severe AP: critical care](#/node/ap-severe-resus)\n• Disposition, reference only: [Disposition](#/node/ap-dispo-complicated)\n\n**Escalation threshold: not set by a sourced reference here. Follow local protocol.**',
    recommendation: 'Ranson 5-6 at 48 h: band only. Classify by Atlanta organ-failure status. Escalation threshold per local protocol.',
    confidence: 'recommended',
    citation: [3],
  },

  {
    id: 'acute-pancreatitis-ranson-result-very-high',
    type: 'result',
    module: 1,
    title: 'Ranson 7 or More at 48 Hours',
    body: '**Top band: total 7 or more at 48 h.** Maximum 11 (non-gallstone) or 10 (gallstone). Older-series mortality figures are not reproduced in this module.\n\n**Classify with Atlanta organ-failure status.** [3]\n• Check organ failure and local complications ([Complications](#/node/ap-complications-q))\n• Disposition, reference only: [Disposition](#/node/ap-dispo-complicated)\n• Re-check each item against the chart before quoting the total\n\n**Escalation threshold: not set by a sourced reference here. Follow local protocol.**',
    recommendation: 'Ranson 7 or more at 48 h: top band. Classify by Atlanta organ-failure status. Escalation threshold per local protocol.',
    confidence: 'recommended',
    citation: [3],
  },
];

export const RANSON_CITATIONS: Citation[] = [
  { num: 22, text: 'Ranson JH, Rifkind KM, Roses DF, Fink SD, Eng K, Spencer FC. Prognostic signs and the role of operative management in acute pancreatitis. Surg Gynecol Obstet. 1974;139(1):69-81. PMID 4834279.' },
  { num: 23, text: 'Ranson JH, Rifkind KM, Turner JW. Prognostic signs and nonoperative peritoneal lavage in acute pancreatitis. Surg Gynecol Obstet. 1976;143(2):209-219. PMID 941075.' },
  { num: 24, text: 'Ranson JH. Etiological and prognostic factors in human acute pancreatitis: a review. Am J Gastroenterol. 1982;77(9):633-638. PMID 7051819.' },
];
