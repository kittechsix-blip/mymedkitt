// DRAFT info page for tpe-bk: reducing immunosuppression, rejection differential, drugs not recommended for BK, IVIG.
// Text is moved verbatim from the first drafts of tpe-bk-team (plus the Figure 1 monitoring interval, read from the figure image). Opens from [..](#/info/tpe-bk-team-detail).
// Import path is draft-relative; the assembler rewrites it.

import type { InfoPage } from '../../../src/data/info-pages.js';

export const TPE_BK_TEAM_DETAIL: InfoPage = {
  id: 'tpe-bk-team-detail',
  title: 'BK polyomavirus: reducing immunosuppression, rejection, drugs not recommended',
  subtitle: 'Reduction of immunosuppression, rejection, and what is not recommended for BK. Second International Consensus Guidelines, 2024.',
  sections: [
    {
      heading: 'Reducing immunosuppression',
      body: "• There are no effective antivirals, so the primary treatment of sustained DNAemia or biopsy-proven nephropathy is reducing maintenance immunosuppression (call the transplant team first). The guideline recommends this in recipients without high immunologic risk or concurrent acute rejection (strong, B). [1]\n• In those recipients it recommends reduction on one measurement above 10 000 c/mL or for biopsy-proven nephropathy (strong, B), even while plasma results are pending (strong, B) (call the transplant team first), and suggests it in kidney transplant recipients for 1000 to 10 000 c/mL on two measurements within 2 to 3 weeks (weak, B). Figure 1 sends high-immunologic-risk recipients to allograft biopsy first. [1]\n• The guideline's first step is confirming that all immunosuppressive drug doses and concentrations are within the institutional target range (weak, C). [1]\n• The guideline says the best strategy has not been defined, varies among centers and is often individualized, and suggests each center keep its own algorithm (weak, D). Its Table 6 gives two strategies, antimetabolite first or calcineurin inhibitor first, whose calcineurin inhibitor trough targets differ; targets and doses are not given here (call the transplant team first). [1]\n• Monitoring: plasma BK DNA every 2 to 4 weeks until clearance (strong, B). Figure 1 shows serum creatinine every 1 to 2 weeks and BK DNA every 2 to 4 weeks after reduction. If DNAemia persists despite the lowest acceptable immunosuppression and renal function is abnormal, the guideline suggests testing for de novo donor-specific antibodies to assist decisions about biopsy (weak, D). [1]\n• Reducing immunosuppression has a price: acute cellular rejection and later de novo donor-specific antibodies were reported in around 10% to 30% of patients during or after clearance in some studies. [1]",
    },
    {
      heading: 'BK nephropathy versus rejection',
      body: "• Pathologists are confronted with the question whether they can diagnose BK nephropathy, rejection, or both with certainty. [1]\n• The guideline: \"A combination of the 2 poses a dilemma because, currently, both conditions cannot be treated at the same time.\" [1]\n• The Banff rules for T cell-mediated rejection grade IA/B should not be applied to a recipient with BK DNAemia or biopsy-proven nephropathy (strong, B). Antibody-mediated rejection can still be diagnosed if Banff criteria are met (strong, C). Intimal arteritis should be reported as possible concomitant rejection (text, ungraded). [1]\n• A rise in creatinine may come from antiviral immune reconstitution or from acute rejection; the former may be transient, unlike the latter. [1]",
    },
    {
      heading: 'Not recommended as treatment for BK',
      body: "• The guideline recommends against using cidofovir to treat BK (strong, B), leflunomide to treat BK (strong, B), fluoroquinolones to prevent or treat BK (strong, A) and statins to prevent or treat BK (strong, A), in kidney transplant recipients. It is written for transplant clinicians and does not address fluoroquinolones or statins given for other reasons, including bacterial infection. [1]\n• IVIG: the guideline is inconsistent. The abstract says current studies do not support IVIG; Table 7 suggests considering IVIG as an adjunct when response to reduced immunosuppression is insufficient (weak, D) (call the transplant team first). [1]",
    },
    {
      heading: 'Disposition',
      body: "• Not in the guideline: ED admission or discharge criteria. After reduction, Figure 1 shows serum creatinine every 1 to 2 weeks (ungraded); BK DNA every 2 to 4 weeks until clearance (strong, B). [1]\n\nRelated consults: [Calcineurin kidney injury](#/node/tpe-cni-kidney) (graft dysfunction).",
    },
  ],
  citations: [
    { num: 1, text: 'Kotton CN, Kamar N, Wojciechowski D, Eder M, Hopfer H, Randhawa P, Sester M, Comoli P, Tedesco Silva H, Knoll G, Brennan DC, Trofe-Clark J, Pape L, Axelrod D, Kiberd B, Wong G, Hirsch HH. The Second International Consensus Guidelines on the Management of BK Polyomavirus in Kidney Transplantation. Transplantation 2024;108(9):1834-1866. doi:10.1097/TP.0000000000004976. PMC11335089. https://pmc.ncbi.nlm.nih.gov/articles/PMC11335089/' },
  ],
};
