// myMedKitt — explainer info pages kept out of the massive global info-pages.ts.
// (File name is historical: the Learn feature it was created for was removed.)
// Merged into the global registry by services/info-service.ts.

import type { InfoPage } from './info-pages.js';

// ===================================================================
// Adrogué-Madias: how far a bag of fluid moves the sodium (2026-11-09)
// Explainer opened from the "Sodium Change per Liter" calculator.
// ===================================================================

const LEARN_ADROGUE_MADIAS: InfoPage = {
  id: 'learn-adrogue-madias',
  title: 'How the Sodium Change per Liter Works',
  subtitle: 'Adrogué-Madias formula: the logic, a worked example and the trap',
  image: {
    src: 'images/sodium/total-body-water-compartments.png',
    alt: "Block chart of an adult man's body weight: 40% solids and 60% water; the water splits two-thirds inside cells and one-third outside, and the outside part splits into interstitial fluid and plasma.",
    caption: 'Total body water, the volume the formula divides by. Alan Sved and David Walsh, Wikimedia Commons, CC BY-SA 4.0.',
  },
  sections: [
    {
      body: '**Change in Na (after 1 L) = (infusate Na + infusate K − serum Na) ÷ (TBW + 1)**\n\nUse it when you are about to give sodium-containing fluid to someone with a sodium disorder and want to know roughly how far a bag or a bolus will move the number [1][2].',
    },
    {
      heading: 'Why it works',
      body: 'It is simple dilution. The fluid’s sodium mixes into all of the body’s water, not just the blood, so the gap between the fluid and the serum is divided by total body water. The **+ 1** is the liter you just added. Potassium counts too: it enters cells and pushes sodium out, with the same effect on the serum number [1].\n\nIt turns “hang some 3%” into a dose with a predicted result, and it shows in advance how quickly you would reach the 24-hour correction limit.',
    },
    {
      heading: 'Total body water (TBW)',
      body: 'TBW = weight (kg) × fraction [1]:\n• Children and adult men: **0.6**\n• Adult women: **0.5**\n• Older men (65+): **0.5**\n• Older women (65+): **0.45**\n\nFluid sodium per liter: 3% saline **513**, 0.9% saline **154**, D5W **0**.',
    },
    {
      heading: 'Worked example',
      body: 'An 80-year-old, 60 kg woman is seizing with a sodium of 112.\n\n• TBW = 0.45 × 60 = **27 L**\n• 3% saline: (513 − 112) ÷ (27 + 1) = 401 ÷ 28 = **+14.3 mEq/L per liter**\n• One 100 mL bolus: about **+1.5 mEq/L** (multiplying the per-liter number by 0.1 gives 1.4; the calculator uses the exact volume)\n• Three 100 mL boluses: about **+4.4 mEq/L**, in the 4 to 6 mEq/L range this consult targets for severe symptoms\n• An 8 mEq/L limit is reached after about **550 mL** of 3%, if nothing else changed\n• 0.9% saline in the same patient: (154 − 112) ÷ 28 = **+1.5 mEq/L per liter**. That is why a liter of saline barely moves a profoundly low sodium.',
    },
    {
      heading: '⚠️ The trap: urine',
      body: 'The formula treats the body as a closed jar and ignores urine. Dangerous overcorrection usually comes from the kidneys, not the 3%. When the stimulus for ADH goes away (volume repletion, stopping a thiazide, treating nausea or pain), the patient can pass large volumes of dilute urine and the sodium can rise far faster than predicted [3].\n\nTreat the number as a starting estimate. Recheck Na+ every 2 hours during active correction and follow urine output.',
    },
  ],
  citations: [
    { num: 1, text: 'Adrogué HJ, Madias NE. Hyponatremia. N Engl J Med. 2000;342(21):1581-1589.' },
    { num: 2, text: 'Adrogué HJ, Madias NE. Hypernatremia. N Engl J Med. 2000;342(20):1493-1499.' },
    { num: 3, text: 'Mohmand HK, Issa D, Ahmad Z, et al. Hypertonic saline for hyponatremia: risk of inadvertent overcorrection. Clin J Am Soc Nephrol. 2007;2(6):1110-1117.' },
  ],
};

export const LEARN_INFO_PAGES: Record<string, InfoPage> = {
  'learn-adrogue-madias': LEARN_ADROGUE_MADIAS,
};

export function getAllLearnInfoPages(): InfoPage[] {
  return Object.values(LEARN_INFO_PAGES);
}
