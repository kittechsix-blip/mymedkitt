// DRAFT info page for tpe-bk: who and when, the test, definitions and thresholds, timing wordings, diagnosis, presentation.
// Text is moved verbatim from the first drafts of tpe-bk / tpe-bk-test. Opens from [..](#/info/tpe-bk-definitions).
// Import path is draft-relative; the assembler rewrites it.

import type { InfoPage } from '../../../src/data/info-pages.js';

export const TPE_BK_DEFINITIONS: InfoPage = {
  id: 'tpe-bk-definitions',
  title: 'BK polyomavirus: who, when, the test and how to read it',
  subtitle: 'Kidney transplant recipients. Second International Consensus Guidelines on BK polyomavirus, 2024.',
  sections: [
    {
      heading: 'Who and when',
      body: "• Kidney transplant recipients. In the first 12 months about 20% to 40% have new high-level BK in the urine, 10% to 20% have BK DNA in plasma (DNAemia), and 8% (range 1% to 15%) have biopsy-proven BK nephropathy. Another 10% to 20% are seen over the next 24 months and 1% to 10% over the next 3 to 5 years. [1]\n• The guideline recommends screening plasma BK DNA monthly until month 9, then every 3 months until 2 years after transplant (strong, B; Table 5), to find it early while the kidney is still little damaged. [1]\n• Plasma BK DNA is also sent when allograft dysfunction occurs or an allograft biopsy is done (Figure 1). [1]\n• BK can recur late after treatment for rejection. [1]\n• Non-kidney organ recipients: rarely reported; no routine screening is recommended (strong, B), but the guideline suggests testing plasma BK DNA when renal function is declining with no other reason (weak, C). [1]",
    },
    {
      heading: 'The test',
      body: "• Quantitative molecular testing (QNAT) of BK DNA, reported in copies per mL (c/mL), is the key diagnostic tool, and plasma is the screening sample. [1]\n• Plasma BK DNA has a higher positive predictive value for biopsy-proven nephropathy than high-level urine BK loads or decoy cells. [1]\n• A qualitative positive urine result cannot tell high-level from low-level viruria. If urine decoy cells or urine BK DNA above 10 million c/mL are found, the guideline recommends measuring plasma BK DNA (strong, B). [1]\n• For monitoring, use the same specimen type and the same assay in the same laboratory (strong, B). [1]",
    },
    {
      heading: 'How to read the plasma result (guideline definitions)',
      body: "• Presumptive BK nephropathy: plasma BK DNA above 10 000 c/mL (or equivalent); the guideline says this necessitates prompt reduction of immunosuppression (call the transplant team first) if laboratory error is unlikely. [1]\n• Probable BK nephropathy: plasma BK DNA above 1000 c/mL (or equivalent) sustained for more than 2 weeks. [1]\n• A result of 1000 to 10 000 c/mL: the guideline suggests confirmatory testing within 2 to 3 weeks (weak, B). [1]\n• Persistent DNAemia below 10 000 c/mL has been reported in patients later diagnosed with biopsy-proven nephropathy. [1]\n• Possible BK nephropathy: high-level urine BK load (above 10 million c/mL) or decoy cells, with undetectable plasma DNA. [1]",
    },
    {
      heading: 'Where the guideline wording differs',
      body: "• Introduction definition: sustained for more than 2 weeks. Table 7: reduce immunosuppression at 1000 to 10 000 c/mL on 2 measurements within 2 to 3 weeks (weak, B) (call the transplant team first). Figure 1 (flowchart, ungraded): 1000 to 10 000 c/mL twice more than 2 weeks apart, or above 10 000 c/mL once. The abstract is stronger than Table 7: loads persisting above 1000 c/mL, \"immunosuppression should be reduced\". Table 7 prints the grade (weak, B); the Introduction definition and the abstract wording print none. [1]\n• The interval from high-level viruria to plasma DNAemia is also given two ways: on average about 6 weeks (range 1 to 12 weeks) in the text, and about 2 to 6 weeks in the Figure 2 caption. [1]",
    },
    {
      heading: 'Diagnosis is by biopsy',
      body: "• Biopsy-proven nephropathy needs compatible cytopathic effects plus immunohistochemistry and a test that identifies BK as opposed to JC polyomavirus. [1]\n• Biopsy can miss the virus in 10% to 30% of patients with DNAemia early on or when nephropathy is resolving. [1]\n• DNAemia alone is not an indication for biopsy in a recipient with baseline renal function and standard immunological risk. [1]",
    },
    {
      heading: 'Presentation',
      body: "• Not in the guideline: a symptom list. Its general reasons to biopsy an allograft are altered renal function or signs of pathology, for example a rise in serum creatinine of more than 15% from baseline, hematuria or proteinuria. [1]\n\nRelated consults: [Adult UTI](#/tree/adult-uti) (urinary infection); [Calcineurin kidney injury](#/node/tpe-cni-kidney) (graft dysfunction).",
    },
    {
      heading: 'Other guidance',
      body: "• KDIGO 2009 gives different screening and threshold figures; this page follows the 2024 consensus.",
    },
  ],
  citations: [
    { num: 1, text: 'Kotton CN, Kamar N, Wojciechowski D, Eder M, Hopfer H, Randhawa P, Sester M, Comoli P, Tedesco Silva H, Knoll G, Brennan DC, Trofe-Clark J, Pape L, Axelrod D, Kiberd B, Wong G, Hirsch HH. The Second International Consensus Guidelines on the Management of BK Polyomavirus in Kidney Transplantation. Transplantation 2024;108(9):1834-1866. doi:10.1097/TP.0000000000004976. PMC11335089. https://pmc.ncbi.nlm.nih.gov/articles/PMC11335089/' },
  ],
};
