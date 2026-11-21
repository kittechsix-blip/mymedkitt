// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-). Page: Possible PTLD (post-transplant lymphoproliferative disorder) in an adult transplant recipient (entry node tpe-ptld, linked from the post-transplant PTLD row of the infection and organ pages).
// 5 nodes: tpe-ptld, tpe-ptld-signs, tpe-ptld-diagnosis, tpe-ptld-team, tpe-ptld-dispo. Overlay: tpe-ptld-detail (register it in the info-page registry).
// Every clinical sentence restates a row of evidence/ptld.ledger.md; the sentence-to-row map is drafts/tpe-ptld.compose.md. Review-level text is framing only: no instruction, threshold or disposition rule from it. General-population guidelines are named as such in the sentence.
// Fixed editor notes only (scripts/fixtures/transplant-approved-editor-notes.json); "Not in the guidelines read:" lines carry the nearest sourced fact; "App content:" lines name consults only. Module numbers are 0 for the assembler.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-ptld" },
  { text: "In a patient on belatacept, the label says consider PTLD with new or worsening neurological, cognitive or behavioral signs or symptoms.", nodeId: "tpe-ptld-signs" },
  { text: "KDIGO 2009, kidney: it is imperative that suspected PTLD lesions be biopsied and read by an experienced pathologist (rationale, ungraded).", nodeId: "tpe-ptld-diagnosis" },
  { text: "ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan should be done at the transplant centre by physicians familiar with transplant malignancies.", nodeId: "tpe-ptld-team" },
  { text: "KDIGO 2009, kidney (1C): reduction or cessation of immunosuppression is recommended for EBV disease including PTLD (call the transplant team first).", nodeId: "tpe-ptld-team" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-ptld",
    type: "question",
    module: 0,
    title: "Possible PTLD (post-transplant lymphoproliferative disorder)",
    safetyLevel: "warning",
    summary: "In a patient on belatacept, the label says consider PTLD with new or worsening neurological, cognitive or behavioral signs. AASLD/AST 2025, liver: presentation is often nonspecific.",
    body: "\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\u2022 Not in the guidelines read: an ED red-flag list for PTLD, when to image, or which tests to send. Nearest sourced fact: AASLD/AST 2025, liver: presentation is often nonspecific, with vague symptoms such as fevers, night sweats or weight loss; imaging may show bulky lymphadenopathy; diagnosis is by biopsy. [3]\n\u2022 KDIGO 2009, kidney: EBV disease can present as a nonspecific febrile illness, gastroenteritis or hepatitis, which may look like CMV or other infection (rationale, ungraded). [1]\n\u2022 Review (emergency medicine, 2018; narrative review, framing only): EBV may present initially with fever, malaise, fatigue, weight loss and lymphadenopathy. [6]\n\u2022 App content: the Lymphadenopathy consult is a general chief-complaint hub for swollen nodes.\n\u2022 Related consults: [Lymphadenopathy](#/tree/lymphadenopathy-hub/node/lad-start), swollen nodes; [Oncological Emergencies](#/tree/oncological-emergencies/node/onc-start), cancer emergencies; [Brain symptoms](#/tree/transplant-patient-ed/node/tpe-cni-brain), neurotoxicity; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [CMV](#/tree/transplant-patient-ed/node/tpe-cmv), CMV page.\n\u2022 More: [PTLD statements and source differences](#/info/tpe-ptld-detail).",
    citation: [1, 3, 6],
    options: [
      {"label": "New neurological, cognitive or behavioral signs", "description": "Belatacept label; ISHLT heart", "next": "tpe-ptld-signs", "urgency": "critical"},
      {"label": "Fever, night sweats, weight loss, nodes or a mass", "description": "Tissue diagnosis and EBV load", "next": "tpe-ptld-diagnosis", "urgency": "urgent"},
      {"label": "PTLD or EBV disease already known", "description": "Immunosuppression and the transplant team", "next": "tpe-ptld-team"},
      {"label": "Not in the sources; disposition", "description": "Admission, tests, imaging", "next": "tpe-ptld-dispo"},
    ],
  },
  {
    id: "tpe-ptld-signs",
    type: "info",
    module: 0,
    title: "Signs that raise PTLD in a transplant recipient",
    safetyLevel: "warning",
    summary: "On belatacept, label says consider PTLD with new or worsening neurological, cognitive or behavioral signs. ISHLT 2023, heart: CNS PTLD is listed among causes of seizure or mental status change.",
    body: "\n\u2022 Belatacept (Nulojix) label, in a patient on belatacept: consider PTLD in patients reporting new or worsening neurological, cognitive or behavioral signs or symptoms; the label says PTLD with belatacept predominantly involves the central nervous system. [4]\n\u2022 ISHLT 2023, heart: tumor including central nervous system PTLD is listed among causes of seizure or mental status change; no management is given (ungraded). [2]\n\u2022 AASLD/AST 2025, liver: PTLD occurs in about 2% of adult liver recipients, most often in the first 3 years but sometimes many years later; recipients who are EBV negative at transplant are at the highest risk. [3]\n\u2022 AST IDCOP 2019, all organs: PTLD may present in the lung or chest with nodules or mediastinal adenopathy, especially in lung and heart-lung recipients, and can mimic pneumonia on imaging (ungraded). [10]\n\u2022 Review (Semin Nephrol 2024; kidney-focused; framing only): PTLD within the intestine can cause diarrhea and vomiting. [7]\n\u2022 Not in the guidelines read: a central nervous system approach for the ED. Nearest sourced facts are the first two lines above.\n\u2022 Related consults: [Brain symptoms](#/tree/transplant-patient-ed/node/tpe-cni-brain), neurotoxicity; [Diarrhea](#/tree/transplant-patient-ed/node/tpe-diarrhea), diarrhea page.",
    citation: [2, 3, 4, 7, 10],
    next: "tpe-ptld-diagnosis",
  },
  {
    id: "tpe-ptld-diagnosis",
    type: "info",
    module: 0,
    title: "Tissue diagnosis and EBV load",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney (rationale): it is imperative that suspected PTLD lesions be biopsied; EBV load alone is sensitive but not specific; with a compatible illness a high load is both.",
    body: "\n\u2022 KDIGO 2009, kidney: it is imperative that suspected PTLD lesions be biopsied and read by a pathologist experienced with PTLD; EBV-negative lesions may behave differently, and nodules may be fungal (rationale, ungraded). [1]\n\u2022 KDIGO 2009, kidney (rationale): EBV load alone is sensitive but not specific; a compatible illness with a high load is a sensitive and specific approach to diagnosis, yet many patients have asymptomatic elevations; in a patient with an asymptomatic elevation and another infection, tissue may be the only way to confirm or exclude EBV disease. [1]\n\u2022 Review (Semin Nephrol 2024; framing only): the peripheral EBV load is not useful for EBV-negative PTLD. [7]\n\u2022 AASLD/AST 2025, liver (Weak, Level 3): screening for PTLD with serial EBV PCR is not supported. [3]\n\u2022 Not in the guidelines read: which tests to send from the ED, or when to image. Nearest sourced fact: AASLD/AST 2025, liver: imaging may show bulky lymphadenopathy, with confirmation by biopsy. Review (Semin Nephrol 2024): imaging can identify which lesions are amenable to biopsy. [3,7]\n\u2022 Related consults: [Lymphadenopathy](#/tree/lymphadenopathy-hub/node/lad-start), swollen nodes.",
    citation: [1, 3, 7],
    next: "tpe-ptld-team",
  },
  {
    id: "tpe-ptld-team",
    type: "info",
    module: 0,
    title: "Immunosuppression and the transplant team",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney (1C): reduction or cessation of immunosuppression for EBV disease including PTLD (call the transplant team first). ISHLT 2023, heart: PTLD plan at the centre (Class I, C).",
    body: "\n\u2022 KDIGO 2009, kidney (1C): reduction or cessation of immunosuppression is recommended for EBV disease including PTLD (call the transplant team first). [1]\n\u2022 KDIGO 2009, kidney (2D): reducing immunosuppression is suggested for EBV-seronegative patients with an increasing EBV load (call the transplant team first). [1]\n\u2022 ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan should be done at the transplant centre by physicians familiar with transplant-associated malignancies. [2]\n\u2022 Sources differ: response to reducing immunosuppression alone. KDIGO 2009, kidney: as many as two thirds respond, less likely after 1 year or with lymphoma, though it may still be considered then with reduced expectations (rationale). A 2021 review (framing only): the response rate from reduction alone is low. None is chosen (call the transplant team first). [1,8]\n\u2022 Not in the guidelines read: how to adjust immunosuppression in the ED for suspected PTLD. Nearest sourced fact: KDIGO 2009 (chapter on post-transplant cancer) rationale: the decision to reduce or withdraw must balance quality of life with and without a functioning transplant if rejection follows (call the transplant team first). [1]\n\u2022 Related consults: [Oncological Emergencies](#/tree/oncological-emergencies/node/onc-start), cancer emergencies.",
    citation: [1, 2, 8],
    next: "tpe-ptld-dispo",
  },
  {
    id: "tpe-ptld-dispo",
    type: "result",
    module: 0,
    title: "Disposition with possible PTLD",
    safetyLevel: "warning",
    confidence: "consider",
    summary: "Not in the guidelines read: a PTLD admission rule or ED test list. ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan at the transplant centre.",
    body: "\n\u2022 Not in the guidelines read: when to admit for suspected PTLD, an ED test list, or an imaging rule.\n\u2022 Nearest sourced fact: ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan should be done at the transplant centre by physicians familiar with transplant-associated malignancies. [2]\n\u2022 Review (Semin Nephrol 2024; framing only): collaboration between specialists is essential when weighing PTLD timing, immunosuppression, graft function and histology. [7]\n\u2022 Review (emergency medicine, 2018; framing only): discusses admission of transplant patients with serious infection; it is not about PTLD and sets no rule here. [6]\n\u2022 Related consults: [Oncological Emergencies](#/tree/oncological-emergencies/node/onc-start), cancer emergencies; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care.\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**Possible PTLD: an admission rule, ED tests and imaging are not in the guidelines read.** ISHLT 2023, heart (Class I, C): initial PTLD evaluation and plan at the transplant centre. Editor note: disposition is decided with the treating transplant team.",
    citation: [2, 6, 7],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "KDIGO Transplant Work Group. KDIGO clinical practice guideline for the care of kidney transplant recipients. Am J Transplant. 2009;9(Suppl 3):S1-S155. doi:10.1111/j.1600-6143.2009.02834.x." },
  { num: 2, text: "Velleca A, et al. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015. Tables print the 2010 and 2023 columns; a grade in the 2010 column carries forward where the 2023 column reads continuing approval without change." },
  { num: 3, text: "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications. Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785. Question 12, PTLD; grades are printed as (strength, Level n)." },
  { num: 4, text: "NULOJIX (belatacept). FDA prescribing information. SPL effective 2021-07-28. Setid c16ac648-d5d2-9f7d-8637-e2328572754e. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c16ac648-d5d2-9f7d-8637-e2328572754e." },
  { num: 5, text: "PROGRAF (tacrolimus). FDA prescribing information. SPL effective 2023-08-25. Setid 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b." },
  { num: 6, text: "Zhong D, et al. Approach to Transplant Infectious Diseases in the Emergency Department. Emerg Med Clin North Am. 2018;36(4):811. doi:10.1016/j.emc.2018.06.010. Narrative review (solid organ and hematopoietic cell transplant); no grades. PMC6237280." },
  { num: 7, text: "Dharnidharka VR. Post-transplant lymphoproliferative disorders. Semin Nephrol. 2024;44(1):151503. doi:10.1016/j.semnephrol.2024.151503. Narrative review, kidney-focused; no grades. PMC11213680." },
  { num: 8, text: "EBV post-transplant lymphoproliferative disorder: update on management and outcomes. Curr Opin Infect Dis. 2021;34(6):635-645. doi:10.1097/QCO.0000000000000787. Narrative review (solid organ and hematopoietic cell transplant); no grades. PMC8589110." },
  { num: 9, text: "CELLCEPT (mycophenolate mofetil). FDA prescribing information. SPL effective 2026-08-05. Setid 37241e87-4af4-4dc3-a1aa-ea6f20d8dc40. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=37241e87-4af4-4dc3-a1aa-ea6f20d8dc40." },
  { num: 10, text: "Pneumonia in solid organ transplantation: guidelines from the American Society of Transplantation Infectious Diseases Community of Practice. Clin Transplant. 2019;33(9):e13545. doi:10.1111/ctr.13545. Grades are printed as (strength, quality). PMC7162188." },
  { num: 11, text: "Stewart S, et al. Revision of the 1996 working formulation for the standardization of nomenclature in the diagnosis of lung rejection. J Heart Lung Transplant. 2007;26(12):1229-1242. Pathology consensus; no clinical grades." },
];
