// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-). Page: Possible Pneumocystis pneumonia (PJP/PCP) in an adult transplant recipient (entry node tpe-pjp).
// 5 nodes: tpe-pjp, tpe-pjp-test, tpe-pjp-treat, tpe-pjp-prophylaxis, tpe-pjp-dispo. Overlay: tpe-pjp-detail (register it in the info-page registry).
// Every clinical sentence restates a row of evidence/pjp.ledger.md; the sentence-to-row map is drafts/tpe-pjp.compose.md. Review-level text is framing only: no instruction, threshold or disposition rule from it. General-population guidelines are named as such in the sentence.
// Fixed editor notes only (scripts/fixtures/transplant-approved-editor-notes.json); "Not in the guidelines read:" lines carry the nearest sourced fact; "App content:" lines name consults only. Module numbers are 0 for the assembler.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-pjp" },
  { text: "AST IDCOP 2019, all organs: chest X-ray for all with suspected pneumonia (strong, moderate); chest CT if acuity or immunosuppression is high (weak, low).", nodeId: "tpe-pjp-test" },
  { text: "AST IDCOP 2019, all organs: include PJP stains or nucleic-acid testing in lavage fluid testing (strong, high), especially off prophylaxis or on non-TMP-SMX prophylaxis.", nodeId: "tpe-pjp-test" },
  { text: "KDIGO 2009, kidney (1C), PCP diagnosed by lavage or biopsy: high-dose IV TMP-SMX with corticosteroids; also reduced immunosuppression (call the transplant team first).", nodeId: "tpe-pjp-treat" },
  { text: "KDIGO 2009, kidney (1C): corticosteroids for moderate to severe PCP, PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg.", nodeId: "tpe-pjp-treat" },
  { text: "Bactrim label: high-dose trimethoprim raises serum potassium in many patients; close monitoring is warranted with renal insufficiency or hyperkalemia-inducing drugs; evaluate hyponatremia in symptomatic patients.", nodeId: "tpe-pjp-treat" },
  { text: "Sources differ: KDIGO 2009, kidney (1C): high-dose IV TMP-SMX for diagnosed PCP; Bactrim label interaction table: cyclosporine, avoid concurrent use (call the transplant team first).", nodeId: "tpe-pjp-treat" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-pjp",
    type: "question",
    module: 0,
    title: "Possible Pneumocystis pneumonia (PJP)",
    safetyLevel: "warning",
    summary: "AST IDCOP 2019: most empiric pneumonia regimens will not optimally treat Pneumocystis. Not in the guidelines read: treatment before diagnosis. KDIGO 2009 (kidney, 1C): PCP diagnosed by lavage or biopsy.",
    body: "\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\u2022 Not in the guidelines read: whether to start Pneumocystis treatment before a diagnosis. KDIGO 2009, kidney, addresses PCP already diagnosed by lavage or biopsy and does not address starting earlier. [1]\n\u2022 Nearest sourced fact: AST IDCOP 2019: most empiric pneumonia regimens will not optimally treat Nocardia or Pneumocystis; late-onset and outbreak-associated PJP remain a problem despite prophylaxis (ungraded). [4]\n\u2022 AST IDCOP 2019, same chapter: for the slower-onset pathogens it lists (Nocardia, tuberculosis, non-tuberculous mycobacteria, endemic fungi, invasive molds), empiric therapy is usually not instituted before testing, but may be needed with high acuity or inability to perform procedures; Pneumocystis is not named in that passage. [4]\n\u2022 App content: the HIV consult's pulmonary opportunistic infection node gives Pneumocystis treatment for patients with HIV.\n\u2022 Related consults: [Pneumonia](#/tree/pneumonia/node/pna-start), pneumonia care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [HIV pulmonary infections](#/tree/hiv/node/hiv-pulm-oi), Pneumocystis in HIV; [Kidney recipient infections](#/tree/transplant-patient-ed/node/tpe-kidney-infection), kidney page.\n\u2022 More: [Pneumocystis statements and source differences](#/info/tpe-pjp-detail).",
    citation: [1, 4],
    options: [
      {"label": "Low oxygen or worsening breathing", "description": "Steroid threshold, treatment scope, TMP-SMX label cautions", "next": "tpe-pjp-treat", "urgency": "critical"},
      {"label": "Cough, fever or infiltrate: tests and imaging", "description": "Chest X-ray, CT, lavage testing", "next": "tpe-pjp-test", "urgency": "urgent"},
      {"label": "Which prophylaxis, and for how long", "description": "Agents; sources differ on duration", "next": "tpe-pjp-prophylaxis"},
      {"label": "Not in the sources; disposition", "description": "Admission, oxygen, dose", "next": "tpe-pjp-dispo"},
    ],
  },
  {
    id: "tpe-pjp-test",
    type: "info",
    module: 0,
    title: "Pneumonia in a recipient: tests and imaging",
    safetyLevel: "warning",
    summary: "AST IDCOP 2019, all organs: chest X-ray for all suspected pneumonia (strong, moderate); chest CT when acuity or immunosuppression is high (weak, low); lavage testing should include PJP (strong, high).",
    body: "\n\u2022 AST IDCOP 2019, all organs: a chest X-ray should be performed in all transplant patients with suspected pneumonia (strong, moderate); chest CT in the initial evaluation is recommended when acuity or net immunosuppression is high (weak, low). [4]\n\u2022 KDIGO 2009, kidney: no specific imaging pattern exists for PCP, so it is imperative that the diagnosis be confirmed by lung biopsy or bronchoalveolar lavage (background, ungraded). [1]\n\u2022 AST IDCOP 2019: lavage fluid testing should include PJP-directed stains or nucleic-acid testing (strong, high), especially off prophylaxis or on non-TMP-SMX prophylaxis; lavage is recommended when infiltrates fail to improve on empiric antibacterial therapy and non-invasive testing gives no diagnosis (strong, moderate). [4]\n\u2022 Sources differ: KDIGO 2009, kidney: confirming by lavage or biopsy is imperative; AST IDCOP 2019: a tiered approach, with lavage if not improving. None is chosen. [1,4]\n\u2022 Not in the guidelines read: which ED tests raise or lower suspicion for PJP. Nearest sourced fact: AST IDCOP 2019 does not recommend 1,3-beta-D-glucan testing in transplant recipients for now (strong, very low). [4]\n\u2022 Related consults: [Pneumonia](#/tree/pneumonia/node/pna-start), pneumonia care.",
    citation: [1, 4],
    next: "tpe-pjp-treat",
  },
  {
    id: "tpe-pjp-treat",
    type: "info",
    module: 0,
    title: "Treatment statements and TMP-SMX label cautions",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney (1C), PCP diagnosed by lavage or biopsy: high-dose IV TMP-SMX with corticosteroids; also reduced immunosuppression (call the transplant team first). Steroid threshold is a separate 1C statement.",
    body: "\n\u2022 KDIGO 2009, kidney (1C), PCP diagnosed by lavage or biopsy: high-dose intravenous TMP-SMX and corticosteroids are recommended; also reduction in immunosuppression (call the transplant team first). [1]\n\u2022 KDIGO 2009, kidney (1C), a separate recommendation: corticosteroids for moderate to severe PCP, PaO2 <70 mm Hg in room air or alveolar gradient >35 mm Hg. [1]\n\u2022 Bactrim label: high-dose trimethoprim, as used for PJP, raises serum potassium in many patients; close monitoring of serum potassium is warranted with renal insufficiency, potassium disorders or hyperkalemia-inducing drugs; evaluate hyponatremia in symptomatic patients. [5]\n\u2022 Sources differ: KDIGO 2009, kidney (1C): high-dose intravenous TMP-SMX is recommended for diagnosed PCP. Bactrim label interaction table: cyclosporine, avoid concurrent use; marked but reversible nephrotoxicity reported in renal transplant recipients (call the transplant team first). [1,5]\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\u2022 Not in the guidelines read: treatment dose in recipients, steroid dose, or oxygen and ICU criteria.\n\u2022 Related consults: [Potassium](#/tree/potassium/node/k-start); [Sodium](#/tree/sodium/node/na-start); [Potassium, magnesium and QT](#/tree/transplant-patient-ed/node/tpe-cni-lytes).",
    citation: [1, 5],
    next: "tpe-pjp-prophylaxis",
  },
  {
    id: "tpe-pjp-prophylaxis",
    type: "info",
    module: 0,
    title: "Prophylaxis: agents and duration, where sources differ",
    safetyLevel: "warning",
    summary: "Sources differ by organ on prophylaxis duration: see body. AST IDCOP 2019: lavage PJP testing (strong, high), in particular if off prophylaxis or on non-TMP-SMX prophylaxis.",
    body: "\n\u2022 ISHLT 2023, heart: TMP-SMX is the preferred prophylaxis (Class I, A); alternatives for those intolerant include dapsone, atovaquone, clindamycin, pyrimethamine and inhaled pentamidine (Class I, B). [2]\n\u2022 KDIGO 2009, kidney: TMP-SMX is first-line; alternatives for allergy or drug-induced neutropenia include dapsone, aerosolized pentamidine, atovaquone, and clindamycin with pyrimethamine; screen for G6PD deficiency before dapsone. [1]\n\u2022 Sources differ, duration by source: KDIGO 2009, kidney: 3 to 6 months (1B), 6 to 12 months in its UTI rationale, and most experts at least 6 months, perhaps 1 year (rationale). ISHLT 2023, heart: at least 6 to 12 months (Class I, B). AASLD/AST 2025, liver: 6 months with TMP-SMX or atovaquone (Strong, Level 2). Sirolimus label, renal transplant: 1 year. None is chosen. [1,2,3,8]\n\u2022 Nulojix and Zortress labels: Pneumocystis prophylaxis is recommended after transplantation or in transplant recipients; no duration is given. [9,10]\n\u2022 Not in the guidelines read: whether this patient should still be on prophylaxis now, or any duration for lung, pancreas or intestinal recipients. Nearest sourced fact: the organ-specific durations above.\n\u2022 Related consults: [Kidney recipient infections](#/tree/transplant-patient-ed/node/tpe-kidney-infection), kidney page.",
    citation: [1, 2, 3, 8, 9, 10],
    next: "tpe-pjp-dispo",
  },
  {
    id: "tpe-pjp-dispo",
    type: "result",
    module: 0,
    title: "Disposition with possible Pneumocystis pneumonia",
    safetyLevel: "warning",
    confidence: "consider",
    summary: "Not in the guidelines read: PJP-specific admission criteria or doses. AST IDCOP 2019, pneumonia: for outpatient care, inpatient management is favored if monitoring is not feasible or doubts prevail.",
    body: "\n\u2022 Not in the guidelines read: a PJP-specific admission rule, oxygen or ICU criteria, a steroid dose, or the TMP-SMX treatment dose in recipients.\n\u2022 AST IDCOP 2019, pneumonia (ungraded): for outpatient care, close monitoring with repeated clinical evaluation is a prerequisite; if this is not feasible or doubts prevail, inpatient management should be favored. Severity scores are not recommended in recipients (strong, very low). [4]\n\u2022 ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of added antibiotic, antifungal or antiviral therapy and of pneumonia or any respiratory infection. [2]\n\u2022 Review (emergency medicine, 2018; framing only): discusses admission of transplant patients with serious infection and notes pneumonia scores do not account for transplantation; it sets no rule here. [7]\n\u2022 Related consults: [Pneumonia](#/tree/pneumonia/node/pna-start), pneumonia care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care.\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**Possible Pneumocystis pneumonia: PJP-specific admission criteria, oxygen or ICU criteria and treatment doses are not in the guidelines read.** AST IDCOP 2019, pneumonia: for outpatient care, inpatient management is favored if monitoring is not feasible or doubts prevail. Editor note: disposition is decided with the treating transplant team.",
    citation: [2, 4, 7],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "KDIGO Transplant Work Group. KDIGO clinical practice guideline for the care of kidney transplant recipients. Am J Transplant. 2009;9(Suppl 3):S1-S155. doi:10.1111/j.1600-6143.2009.02834.x. Chapter 14.2 recommendations are graded 1B, 2C, 1C, 1C." },
  { num: 2, text: "Velleca A, et al. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015. Tables print the 2010 and 2023 columns." },
  { num: 3, text: "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications. Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785. Question 8; grades are printed as (strength, Level n)." },
  { num: 4, text: "Pneumonia in solid organ transplantation: guidelines from the American Society of Transplantation Infectious Diseases Community of Practice. Clin Transplant. 2019;33(9):e13545. doi:10.1111/ctr.13545. Grades are printed as (strength, quality). PMC7162188." },
  { num: 5, text: "BACTRIM (sulfamethoxazole and trimethoprim). FDA prescribing information. SPL effective 2024-12-30. Setid f59d0c04-9c66-4d53-a0e1-cb55570deb62. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f59d0c04-9c66-4d53-a0e1-cb55570deb62" },
  { num: 6, text: "MEPRON (atovaquone oral suspension). FDA prescribing information. SPL effective 2026-03-20. Setid b426b6bf-f07e-4580-97ae-dfca1ddf5b8f. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b426b6bf-f07e-4580-97ae-dfca1ddf5b8f." },
  { num: 7, text: "Zhong D, et al. Approach to Transplant Infectious Diseases in the Emergency Department. Emerg Med Clin North Am. 2018;36(4):811. doi:10.1016/j.emc.2018.06.010. Narrative review (solid organ and hematopoietic cell transplant); no grades. PMC6237280." },
  { num: 8, text: "Sirolimus tablets. FDA prescribing information. SPL effective 2026-03-26. Setid 5908cd1a-fc5a-462f-99ed-1d8983e253c9. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5908cd1a-fc5a-462f-99ed-1d8983e253c9." },
  { num: 9, text: "NULOJIX (belatacept). FDA prescribing information. SPL effective 2021-07-28. Setid c16ac648-d5d2-9f7d-8637-e2328572754e. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c16ac648-d5d2-9f7d-8637-e2328572754e." },
  { num: 10, text: "ZORTRESS (everolimus). FDA prescribing information. SPL effective 2026-09-16. Setid e082a024-7850-400b-a5c2-2a140612562a. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e082a024-7850-400b-a5c2-2a140612562a." },
  { num: 11, text: "PENTAM 300 (pentamidine isethionate for injection). FDA prescribing information. SPL effective 2022-09-13. Setid cc2b635e-4840-4dc3-a177-5484371680e8. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cc2b635e-4840-4dc3-a177-5484371680e8" },
  { num: 12, text: "NEBUPENT (pentamidine isethionate for inhalation). FDA prescribing information. SPL effective 2024-10-15. Setid e2ad9d3c-b6c3-4f70-87e0-722a8ff94ccb. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e2ad9d3c-b6c3-4f70-87e0-722a8ff94ccb" },
  { num: 13, text: "Dapsone tablets (Sun). FDA prescribing information. SPL effective 2026-03-17. Setid cb312185-b9f1-4fa4-9481-bcf5d9bb3edf. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cb312185-b9f1-4fa4-9481-bcf5d9bb3edf" },
  { num: 14, text: "Stewart S, et al. Revision of the 1996 working formulation for the standardization of nomenclature in the diagnosis of lung rejection. J Heart Lung Transplant. 2007;26(12):1229-1242. Pathology consensus; no clinical grades." },
];
