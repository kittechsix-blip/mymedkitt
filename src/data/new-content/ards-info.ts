// MedKitt - ARDS info pages (DRAFT, not wired). Integrator merges into INFO_PAGES.
// Clinical sign-off required before use.

import type { InfoPage } from '../info-pages.js';

export const INFO_PAGES_ARDS: Record<string, InfoPage> = {
  'ards-stop': {
    id: 'ards-stop',
    title: 'ARDS - Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '\u{1F6D1} Do NOT size tidal volume on actual body weight',
        body: `Tidal volume is set on predicted body weight. Actual weight in an obese or edematous patient gives a large VT and high plateau pressure. [3,4] [Ventilation start](#/node/ards-vent-set)`,
      },
      {
        heading: '\u{1F6D1} Do NOT start at the old high tidal volume',
        body: `The 12 mL/kg PBW comparator in the ARDSNet trial had higher mortality than 6 mL/kg PBW. [3] [Ventilation start](#/node/ards-vent-set)`,
      },
      {
        heading: '\u{1F6D1} Do NOT keep plateau above 30 cmH2O',
        body: `Reduce VT in 1 mL/kg PBW steps to the 4 mL/kg floor. Plateau above 30 is the protocol trigger to act. [4] [Plateau check](#/node/ards-vt-check) | [Reduce VT](#/node/ards-reduce-vt)`,
      },
      {
        heading: '\u{1F6D1} Do NOT chase a normal PaCO2 with high tidal volume',
        body: `Permissive hypercapnia is the protocol. Raise rate first. Raise VT only for pH below 7.15, and only then accept plateau above 30. [4] [Acidosis](#/node/ards-acidosis)`,
      },
      {
        heading: '\u{1F6D1} Do NOT label ARDS on a ratio without checking mimics',
        body: `The Berlin definition needs PEEP or CPAP of at least 5 cmH2O, bilateral opacities, and no full cardiac or fluid explanation. [1] [Start](#/node/ards-start) | [Berlin check](#/node/ards-berlin-check) | [Mimics](#/node/ards-mimics)`,
      },
      {
        heading: '\u{1F6D1} Do NOT give liberal fluids once perfusing',
        body: `After shock is corrected, the conservative strategy improved ventilator-free and ICU-free days. Do not withhold fluid in shock. [12] [Fluids](#/node/ards-fluids)`,
      },
      {
        heading: '\u{1F6D1} Do NOT start continuous paralysis as routine',
        body: `ESICM 2023 strongly recommends against routine continuous neuromuscular blockade in moderate to severe non-COVID ARDS. ATS 2024 conditionally suggests it in early severe ARDS. ROSE showed no mortality benefit from early continuous blockade. Treat the dyssynchrony cause first. [7,8,10] [Blockade check](#/node/ards-nmb-check) | [Blockade](#/node/ards-nmb)`,
      },
      {
        heading: '\u{1F6D1} Do NOT delay prone when the entry ratio is met',
        body: `Prone ventilation reduced 28-day mortality in severe ARDS (P/F <150, FiO2 ≥0.6, PEEP ≥5) on invasive ventilation when sessions were long enough. Check screening, then turn. [6,7,8] [Prone criteria](#/node/ards-prone) | [Prone schedule](#/node/ards-prone-result)`,
      },
      {
        heading: '\u{1F6D1} Do NOT treat ECMO as a proven survival step',
        body: `EOLIA did not significantly reduce 60-day mortality and stopped for futility. Refer for assessment when gates are met. [13] [ECMO gate](#/node/ards-rescue-check) | [ECMO referral](#/node/ards-ecmo-referral)`,
      },
    ],
    citations: [
      { num: 1, text: 'ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA. 2012;307(23):2526-2533.' },
      { num: 3, text: 'ARDS Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342(18):1301-1308.' },
      { num: 4, text: 'NHLBI ARDS Clinical Network. Mechanical Ventilation Protocol Summary (July 2008 update). ardsnet.org/files/ventilator_protocol_2008-07.pdf.' },
      { num: 6, text: 'Guerin C, Reignier J, Richard JC, et al. Prone positioning in severe acute respiratory distress syndrome. N Engl J Med. 2013;368(23):2159-2168.' },
      { num: 7, text: 'Grasselli G, et al. ESICM guidelines on acute respiratory distress syndrome: definition, phenotyping and respiratory support strategies. Intensive Care Med. 2023;49(7):727-759.' },
      { num: 8, text: 'Qadir N, Sahetya S, Munshi L, et al. An Update on Management of Adult Patients with Acute Respiratory Distress Syndrome: An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2024;209(1):24-36.' },
      { num: 10, text: 'Moss M, Huang DT, Brower RG, et al. Early Neuromuscular Blockade in the Acute Respiratory Distress Syndrome. N Engl J Med. 2019;380(21):1997-2008.' },
      { num: 12, text: 'Wiedemann HP, Wheeler AP, Bernard GR, et al. Comparison of two fluid-management strategies in acute lung injury. N Engl J Med. 2006;354(24):2564-2575.' },
      { num: 13, text: 'Combes A, Hajage D, Capellier G, et al. Extracorporeal membrane oxygenation for severe acute respiratory distress syndrome. N Engl J Med. 2018;378(21):1965-1975.' },
    ],
  },
  'ards-steps': {
    id: 'ards-steps',
    title: 'ARDS Steps Summary',
    subtitle: 'Recognize, stabilize, ventilate, rescue, disposition',
    sections: [
      {
        heading: 'Recognize',
        body: `- [Confirm Berlin criteria with an ABG on PEEP of at least 5](#/node/ards-berlin-check)
- [Exclude cardiac and volume mimics](#/node/ards-mimics)
- [Grade severity](#/node/ards-severity)`,
      },
      {
        heading: 'Stabilize',
        body: `- [Size VT on predicted body weight; start 6 mL/kg PBW (2008 protocol summary starts at 8)](#/node/ards-vent-set)
- [Keep plateau at or below 30 cmH2O](#/node/ards-vt-check)
- [Reduce VT in 1 mL/kg steps to a 4 mL/kg floor](#/node/ards-reduce-vt)
- [Permissive hypercapnia: rate first, VT only below pH 7.15](#/node/ards-acidosis)
- [Set PEEP and FiO2 pairs, minimum PEEP 5](#/node/ards-oxygenation)
- [Conservative fluids once perfusing](#/node/ards-fluids)`,
      },
      {
        heading: 'Ventilate',
        body: `- [Prone for severe ARDS (P/F <150, FiO2 ≥0.6, PEEP ≥5), invasive ventilation](#/node/ards-prone)
- [Prone session length per ESICM and ATS](#/node/ards-prone-result)
- [No routine continuous neuromuscular blockade for non-COVID ARDS (ATS 2024 conditional in early severe ARDS); treat dyssynchrony cause first](#/node/ards-nmb-check)`,
      },
      {
        heading: 'Rescue',
        body: `- [Check EOLIA-type gates despite optimal ventilation](#/node/ards-rescue-check)
- [Refer for ECMO evaluation when gates are met](#/node/ards-ecmo-referral)`,
      },
      {
        heading: 'Disposition',
        body: `- [ICU admission with the ventilation plan in the handoff](#/node/ards-icu)`,
      },
    ],
    citations: [
      { num: 1, text: 'ARDS Definition Task Force. Acute respiratory distress syndrome: the Berlin Definition. JAMA. 2012;307(23):2526-2533.' },
      { num: 3, text: 'ARDS Network. Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome. N Engl J Med. 2000;342(18):1301-1308.' },
      { num: 4, text: 'NHLBI ARDS Clinical Network. Mechanical Ventilation Protocol Summary (July 2008 update). ardsnet.org/files/ventilator_protocol_2008-07.pdf.' },
      { num: 6, text: 'Guerin C, Reignier J, Richard JC, et al. Prone positioning in severe acute respiratory distress syndrome. N Engl J Med. 2013;368(23):2159-2168.' },
      { num: 12, text: 'Wiedemann HP, Wheeler AP, Bernard GR, et al. Comparison of two fluid-management strategies in acute lung injury. N Engl J Med. 2006;354(24):2564-2575.' },
      { num: 7, text: 'Grasselli G, et al. ESICM guidelines on acute respiratory distress syndrome: definition, phenotyping and respiratory support strategies. Intensive Care Med. 2023;49(7):727-759.' },
      { num: 8, text: 'Qadir N, Sahetya S, Munshi L, et al. An Update on Management of Adult Patients with Acute Respiratory Distress Syndrome: An Official American Thoracic Society Clinical Practice Guideline. Am J Respir Crit Care Med. 2024;209(1):24-36.' },
      { num: 13, text: 'Combes A, Hajage D, Capellier G, et al. Extracorporeal membrane oxygenation for severe acute respiratory distress syndrome. N Engl J Med. 2018;378(21):1965-1975.' },
    ],
  },
};
