// DRAFT page for tpe-* (Transplant Patient in the ED): BK polyomavirus in the kidney transplant recipient. Revision 5 (principal-review shape).
// Source: Second International Consensus Guidelines on BK Polyomavirus in Kidney Transplantation (2024) only; every [1] below is that guideline.
// Imports use draft-relative paths; the assembler rewrites them. Module numbers are 0 for the assembler.
// Revision 3: node bodies trimmed; detail moved verbatim to info pages tpe-bk-definitions and tpe-bk-team-detail (separate files).
// Editor notes (lines beginning "Editor note:") are listed in tpe-bk.ledger.md. HIGH STAKES editor note: the immunosuppression one (E3), once in tpe-bk body and as critical action 1. Summaries 30 words or fewer, no quotation marks; summaries and critical actions naming reduction carry "(call the transplant team first)".

import type { DecisionNode } from '../../../src/models/types.js';
import type { CriticalAction } from '../../../src/services/tree-service.js';

type Citation = { num: number; text: string };

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.', nodeId: 'tpe-bk' },
  { text: 'Kidney recipients with allograft dysfunction: plasma BK DNA (Figure 1, ungraded); above 10 000 c/mL is presumptive BK nephropathy.', nodeId: 'tpe-bk-test' },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-bk",
    type: "question",
    module: 0,
    title: "BK polyomavirus in the kidney transplant recipient",
    body: "**BK polyomavirus nephropathy** complicates kidney transplantation by directly and indirectly causing premature kidney allograft failure. No effective antiviral is currently established for clinical use. [1]\n\n\u2022 Test: quantitative plasma BK DNA; screening monthly until month 9, then every 3 months until 2 years (strong, B); also with allograft dysfunction or a biopsy (Figure 1, ungraded). [1]\n\u2022 For sustained DNAemia or biopsy-proven nephropathy without high immunologic risk or concurrent acute rejection, reducing maintenance immunosuppression is the recommended primary treatment (strong, B). [1]\n\u2022 Not in the guideline: a symptom list. General biopsy reasons: altered renal function or signs of pathology (e.g., creatinine rise above 15%, hematuria, proteinuria). [1]\n\n[Definitions](#/info/tpe-bk-definitions)\n\nEditor note: in a kidney transplant recipient with new graft dysfunction, raise BK with the transplant team.\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\nRelated consults: [Adult UTI](#/tree/adult-uti) (urinary infection); [Calcineurin kidney injury](#/node/tpe-cni-kidney) (graft dysfunction).",
    options: [
      { label: "The test, and how to read it", next: "tpe-bk-test" },
      { label: "Treatment, drugs not recommended for BK, disposition", next: "tpe-bk-team" },
    ],
    summary: "Kidney recipients: check plasma BK DNA. For sustained DNAemia or biopsy-proven nephropathy without high immunologic risk or concurrent acute rejection, reducing immunosuppression is primary treatment (call the transplant team first).",
    citation: [1],
    calculatorLinks: [
      { id: "adult-uti", label: "Adult UTI consult", kind: "tree", node: "uti-start" },
    ],
  },
  {
    id: "tpe-bk-test",
    type: "info",
    module: 0,
    title: "BK polyomavirus: the test and how to read it",
    body: "**Test:** quantitative plasma BK DNA (c/mL). It has a higher positive predictive value for biopsy-proven nephropathy than urine loads or decoy cells. [1]\n\n**ACTION LEVELS (guideline)**\n\u2022 Above 10 000 c/mL (or equivalent) is presumptive BK nephropathy, \u201cnecessitating prompt reduction of immunosuppression if laboratory errors are unlikely\u201d. Reduction on one such measurement is recommended (strong, B) in recipients without high immunologic risk or concurrent acute rejection; Figure 1 sends high-immunologic-risk recipients to allograft biopsy first. [1]\n\u2022 1000 to 10 000 c/mL: Table 5: confirmatory testing within 2 to 3 weeks (weak, B); other parts word it differently, and the abstract is stronger. See the link below. [1]\n\u2022 Urine decoy cells or urine BK DNA above 10 million c/mL: measure plasma (strong, B). [1]\n\n[Definitions, the three timing wordings, diagnosis by biopsy](#/info/tpe-bk-definitions)\n\nEditor note: tell the transplant team the test was sent and which laboratory ran it.",
    next: "tpe-bk-team",
    summary: "Kidney recipients, BK consensus 2024: plasma BK DNA above 10 000 c/mL is presumptive BK nephropathy. Urine decoy cells or urine DNA above 10 million c/mL: measure plasma (strong, B).",
    citation: [1],
  },
  {
    id: "tpe-bk-team",
    type: "result",
    module: 0,
    title: "BK polyomavirus: treatment, and what is not recommended",
    confidence: "recommended",
    body: "**Reducing maintenance immunosuppression** is the guideline's primary treatment of sustained DNAemia or biopsy-proven nephropathy in recipients without high immunologic risk or concurrent acute rejection (strong, B). First step: confirm immunosuppressant doses and concentrations are within the institutional target range (weak, C). [1]\n\n\u2022 Not recommended as treatment for BK: cidofovir, leflunomide (strong, B); fluoroquinolones, statins, to prevent or treat BK (strong, A). Their use for other indications is not addressed. [1]\n\u2022 Not in the guideline: ED admission or discharge criteria. After reduction, Figure 1 shows serum creatinine every 1 to 2 weeks (ungraded); BK DNA every 2 to 4 weeks until clearance (strong, B). [1]\n\n[Details, rejection, IVIG](#/info/tpe-bk-team-detail)\n\nEditor note: urinary symptoms or an abnormal urinalysis in a transplant recipient still need their own assessment: [Adult UTI](#/tree/adult-uti).\n\nRelated consults: [Calcineurin kidney injury](#/node/tpe-cni-kidney) (graft dysfunction).\n\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**BK polyomavirus: the guideline test is plasma BK DNA PCR; reducing maintenance immunosuppression is the primary treatment for sustained DNAemia or biopsy-proven nephropathy in recipients without high immunologic risk or concurrent acute rejection (strong, B) (call the transplant team first), and the guideline suggests each center keep its own algorithm (weak, D); it recommends against cidofovir and leflunomide to treat BK and fluoroquinolones and statins to prevent or treat BK.** Editor note: disposition is decided with the treating transplant team.",
    summary: "BK consensus 2024: for sustained DNAemia or biopsy-proven nephropathy without high immunologic risk or concurrent acute rejection, reducing immunosuppression is the primary treatment (strong, B) (call the transplant team first).",
    citation: [1],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: 'Kotton CN, Kamar N, Wojciechowski D, Eder M, Hopfer H, Randhawa P, Sester M, Comoli P, Tedesco Silva H, Knoll G, Brennan DC, Trofe-Clark J, Pape L, Axelrod D, Kiberd B, Wong G, Hirsch HH. The Second International Consensus Guidelines on the Management of BK Polyomavirus in Kidney Transplantation. Transplantation 2024;108(9):1834-1866. doi:10.1097/TP.0000000000004976. PMC11335089. https://pmc.ncbi.nlm.nih.gov/articles/PMC11335089/' },
];
