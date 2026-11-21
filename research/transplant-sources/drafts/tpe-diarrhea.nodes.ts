// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-). Page: Diarrhea in an adult transplant recipient (entry node tpe-diarrhea).
// 5 nodes: tpe-diarrhea, tpe-diarrhea-severe, tpe-diarrhea-cni, tpe-diarrhea-cause, tpe-diarrhea-dispo. Overlay: tpe-diarrhea-detail (register it in the info-page registry).
// Every clinical sentence restates a row of evidence/diarrhea.ledger.md; the sentence-to-row map is drafts/tpe-diarrhea.compose.md. Review-level text is framing only: no instruction, threshold or disposition rule from it. General-population guidelines are named as such in the sentence.
// Fixed editor notes only (scripts/fixtures/transplant-approved-editor-notes.json); "Not in the guidelines read:" lines carry the nearest sourced fact; "App content:" lines name consults only. Module numbers are 0 for the assembler.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-diarrhea" },
  { text: "IDSA 2017, general population: evaluate all people with acute diarrhea for dehydration (strong, high).", nodeId: "tpe-diarrhea-severe" },
  { text: "IDSA/SHEA 2017, general adults, fulminant: oral vancomycin is the regimen of choice (strong, moderate); subtotal colectomy with rectal preservation if surgery is necessary (strong, moderate).", nodeId: "tpe-diarrhea-severe" },
  { text: "IATDMCT 2019 consensus: note that temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea.", nodeId: "tpe-diarrhea-cni" },
  { text: "KDIGO 2009, kidney: rule out treatable causes other than the immunosuppressant first, then consider reducing or switching mycophenolate (call the transplant team first).", nodeId: "tpe-diarrhea-cause" },
  { text: "ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of nausea, vomiting or diarrhea.", nodeId: "tpe-diarrhea-dispo" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-diarrhea",
    type: "question",
    module: 0,
    title: "Diarrhea in a transplant recipient",
    safetyLevel: "warning",
    summary: "IATDMCT 2019: temporary elevation of tacrolimus troughs (about 2-fold and more) has been observed in diarrhea. Not in the guidelines read: empirical antibiotics before diagnosis in transplant recipients.",
    body: "\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\u2022 IATDMCT 2019 consensus: temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea. Level page: [Reading a level](#/tree/transplant-patient-ed/node/tpe-cni-level). [1]\n\u2022 Not in the guidelines read: an empirical antimicrobial before a diagnosis in transplant recipients. Nearest sourced facts, general population: IDSA 2017: empiric antibacterial treatment should be considered in immunocompromised people with severe illness and bloody diarrhea (strong, low); IDSA/SHEA 2017: empiric C. difficile therapy if a substantial delay in confirmation is expected, or for fulminant disease (weak, low). [3,4]\n\u2022 KDIGO 2009, kidney: mycophenolate and tacrolimus may cause or worsen diarrhea; rule out treatable, underlying causes other than the immunosuppressive medication first (rationale, ungraded). [2]\n\u2022 App content: the Acute Diarrhea consult's Immunocompromised Patient node lists additional pathogens, and its C. difficile treatment node gives IDSA/SHEA 2021-based regimens.\n\u2022 Related consults: [Acute Diarrhea](#/tree/diarrhea/node/diarrhea-start), diarrhea care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [Potassium](#/tree/potassium/node/k-start), potassium; [CMV](#/tree/transplant-patient-ed/node/tpe-cmv), CMV page; [Low blood counts](#/tree/transplant-patient-ed/node/tpe-cytopenia), cytopenia page.\n\u2022 More: [Diarrhea statements and source differences](#/info/tpe-diarrhea-detail).",
    citation: [1, 2, 3, 4],
    options: [
      {"label": "Shock, severe dehydration, ileus or megacolon", "description": "IDSA, general population; severe C. difficile", "next": "tpe-diarrhea-severe", "urgency": "critical"},
      {"label": "Taking tacrolimus", "description": "Trough concentrations have risen with diarrhea", "next": "tpe-diarrhea-cni", "urgency": "urgent"},
      {"label": "Infection or drug: finding the cause", "description": "CMV, C. difficile, mycophenolate", "next": "tpe-diarrhea-cause"},
      {"label": "Not in the sources; disposition", "description": "Admission, imaging, empiric antibiotic", "next": "tpe-diarrhea-dispo"},
    ],
  },
  {
    id: "tpe-diarrhea-severe",
    type: "info",
    module: 0,
    title: "Severe illness: dehydration, shock, ileus, C. difficile",
    safetyLevel: "warning",
    summary: "IDSA 2017, general population: evaluate dehydration (strong, high). IDSA/SHEA 2017, general adults, fulminant C. difficile: oral vancomycin is the regimen of choice (strong, moderate).",
    body: "\n\u2022 IDSA 2017, general population: evaluate all people with acute diarrhea for dehydration (strong, high); isotonic IV fluids for severe dehydration, shock or altered mental status with failure of oral rehydration (strong, high), or for ileus (strong, moderate). [3]\n\u2022 IDSA/SHEA 2017, general adults (expert opinion): severe C. difficile is white count 15000 cells/mL or more (as printed) or creatinine above 1.5 mg/dL; fulminant is hypotension or shock, ileus or megacolon. [4]\n\u2022 IDSA/SHEA 2017, general adults, fulminant C. difficile: oral vancomycin is the regimen of choice (strong, moderate); rectal vancomycin if ileus (weak, low); IV metronidazole together with it, particularly if ileus (strong, moderate). Doses: detail page. [4]\n\u2022 IDSA/SHEA 2017, general adults: if surgery is necessary, perform subtotal colectomy with preservation of the rectum (strong, moderate). The 2021 update does not address fulminant disease. [4,5]\n\u2022 Sources differ: C. difficile frequency in solid organ recipients. IDSA/SHEA 2017: prevalence 7.4%, 5-fold general medicine patients. A 2018 review (emergency medicine): up to 30%. Neither is chosen. [4,11]",
    citation: [3, 4, 5, 11],
    next: "tpe-diarrhea-cni",
  },
  {
    id: "tpe-diarrhea-cni",
    type: "info",
    module: 0,
    title: "Diarrhea on tacrolimus: the trough concentration",
    safetyLevel: "warning",
    summary: "IATDMCT 2019: temporary elevation of tacrolimus troughs (about 2-fold and more) has been observed with diarrhea. Not in the guidelines read: dose changes (call the transplant team first).",
    body: "\n\u2022 IATDMCT 2019 consensus: temporary elevation of tacrolimus trough concentrations (about 2-fold and more) has been observed in patients with diarrhea; this may be because intestinal P-glycoprotein activity is impaired in persistent diarrhea, leading to increased bioavailability. [1]\n\u2022 Not in the guidelines read: whether to check a tacrolimus level, or hold or reduce a dose, during diarrhea (call the transplant team first). The Prograf, Envarsus XR, Astagraf XL and sirolimus labels list diarrhea as an adverse reaction; the Envarsus XR label lists diarrhea among overdose reactions. [14,8,16,17]\n\u2022 KDIGO 2009, kidney: monitoring MPA AUC and tacrolimus C0 levels may help with the diarrhea, nausea and vomiting that mycophenolate and tacrolimus may cause or worsen (rationale, ungraded). [2]\n\u2022 Related consults: [Reading a level](#/tree/transplant-patient-ed/node/tpe-cni-level), levels; [Potassium, magnesium and QT](#/tree/transplant-patient-ed/node/tpe-cni-lytes), electrolytes; [Before you give a drug](#/tree/transplant-patient-ed/node/tpe-cni-drugs), interactions.",
    citation: [1, 2, 8, 14, 16, 17],
    next: "tpe-diarrhea-cause",
  },
  {
    id: "tpe-diarrhea-cause",
    type: "info",
    module: 0,
    title: "Infection or drug: finding the cause",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney: rule out treatable causes other than the immunosuppressant first, then consider reducing or switching mycophenolate (call the transplant team first).",
    body: "\n\u2022 KDIGO 2009, kidney (rationale, ungraded): rule out treatable causes other than the immunosuppressant first; only then consider reducing mycophenolate or changing it to azathioprine (call the transplant team first). [2]\n\u2022 IDSA 2017, general population: test stool, including for C. difficile, with fever, bloody or mucoid stools, severe cramping or tenderness, or sepsis signs (strong, moderate); broad stool differential in immunocompromised people (strong, moderate). [3]\n\u2022 IDSA/SHEA 2017, general adults: patients with unexplained new-onset 3 or more unformed stools in 24 hours are the preferred population for C. difficile testing (weak, very low); discontinue the inciting antibiotic as soon as possible (strong, moderate). [4]\n\u2022 CMV consensus 2025: plasma PCR sensitivity for gut disease can fall in R+ patients, sometimes low or undetectable (ungraded); histology with immunohistochemistry is recommended (strong, moderate); no stool CMV PCR (strong, low). [6]\n\u2022 Bactrim label: C. difficile diarrhea has followed nearly all antibacterials, including TMP-SMX. [9]\n\u2022 Sources differ, IDSA 2017, general population: blood cultures should be obtained from immunocompromised people (strong, moderate); the rationale says may be considered if febrile. [3]\n\u2022 Related consults: [CMV](#/tree/transplant-patient-ed/node/tpe-cmv), CMV page.",
    citation: [2, 3, 4, 6, 9],
    next: "tpe-diarrhea-dispo",
  },
  {
    id: "tpe-diarrhea-dispo",
    type: "result",
    module: 0,
    title: "Disposition with diarrhea in a transplant recipient",
    safetyLevel: "warning",
    confidence: "consider",
    summary: "Not in the guidelines read for transplant recipients: admission or imaging rules, antimotility or probiotic safety, parasites. IDSA 2017, general population: loperamide may be given to immunocompetent adults (weak, moderate).",
    body: "\n\u2022 Not in the guidelines read for transplant recipients: an admission rule, an imaging rule, antimotility or probiotic safety, or a parasite work-up.\n\u2022 ISHLT 2023, heart (Class I, C): the transplant centre should educate local clinicians to inform it of nausea, vomiting or diarrhea. [7]\n\u2022 IDSA 2017, general population: loperamide may be given to immunocompetent adults with acute watery diarrhea (weak, moderate), avoided at any age if toxic megacolon may result in inflammatory diarrhea or fever (strong, low); probiotics may be offered to immunocompetent adults and children (weak, moderate); in immunocompromised people, a broad differential including examination for parasites is recommended (strong, moderate). [3]\n\u2022 Review (emergency medicine, 2018; framing only): discusses admission of transplant patients with serious infection; it sets no rule here. [11]\n\u2022 Related consults: [Acute Diarrhea](#/tree/diarrhea/node/diarrhea-start), diarrhea care; [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care.\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**Diarrhea in a transplant recipient: admission and imaging rules, antimotility or probiotic safety and parasite work-up are not in the guidelines read for transplant recipients.** IDSA 2017, general population: loperamide may be given to immunocompetent adults (weak, moderate). Editor note: disposition is decided with the treating transplant team.",
    citation: [3, 7, 11],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "Brunet M, et al. Therapeutic drug monitoring of tacrolimus-personalized therapy: second consensus report. Ther Drug Monit. 2019. doi:10.1097/FTD.0000000000000640. International Association of Therapeutic Drug Monitoring and Clinical Toxicology consensus report; statements are ungraded." },
  { num: 2, text: "KDIGO Transplant Work Group. KDIGO clinical practice guideline for the care of kidney transplant recipients. Am J Transplant. 2009;9(Suppl 3):S1-S155. doi:10.1111/j.1600-6143.2009.02834.x. The diarrhea statements are in the chapter 3 rationale and are ungraded." },
  { num: 3, text: "Shane AL, et al. 2017 Infectious Diseases Society of America clinical practice guidelines for the diagnosis and management of infectious diarrhea. Clin Infect Dis. 2017;65(12):e45-e80. doi:10.1093/cid/cix669. General population guideline; grades are printed as (strength, quality of evidence). PMC5850553." },
  { num: 4, text: "McDonald LC, et al. Clinical practice guidelines for Clostridium difficile infection in adults and children: 2017 update by the IDSA and SHEA. Clin Infect Dis. 2018;66(7):e1-e48. doi:10.1093/cid/cix1085. General population guideline. PMC6018983." },
  { num: 5, text: "Johnson S, et al. Clinical practice guideline by the IDSA and SHEA: 2021 focused update guidelines on management of Clostridioides difficile infection in adults. Clin Infect Dis. 2021. doi:10.1093/cid/ciab549. General adult population; the abridged recommendations on the IDSA site were read; strength is printed as conditional or strong with certainty of evidence." },
  { num: 6, text: "Kotton CN, et al. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374. Grades are printed as (strength, quality). PMC12180710." },
  { num: 7, text: "Velleca A, et al. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015. Tables print the 2010 and 2023 columns." },
  { num: 8, text: "ENVARSUS XR (tacrolimus extended-release tablets). FDA prescribing information. SPL effective 2025-02-26. Setid de2315b0-6344-43ac-9aea-3e3b68d828e7. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=de2315b0-6344-43ac-9aea-3e3b68d828e7." },
  { num: 9, text: "BACTRIM (sulfamethoxazole and trimethoprim). FDA prescribing information. SPL effective 2024-12-30. Setid f59d0c04-9c66-4d53-a0e1-cb55570deb62. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f59d0c04-9c66-4d53-a0e1-cb55570deb62" },
  { num: 10, text: "CELLCEPT (mycophenolate mofetil). FDA prescribing information. SPL effective 2026-08-05. Setid 37241e87-4af4-4dc3-a1aa-ea6f20d8dc40. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=37241e87-4af4-4dc3-a1aa-ea6f20d8dc40." },
  { num: 11, text: "Zhong D, et al. Approach to Transplant Infectious Diseases in the Emergency Department. Emerg Med Clin North Am. 2018;36(4):811. doi:10.1016/j.emc.2018.06.010. Narrative review (solid organ and hematopoietic cell transplant); no grades. PMC6237280." },
  { num: 12, text: "Loucif Y, et al. Infectious diarrhea in kidney transplant recipients: pathogen spectrum and risk factors. Cureus. 2025;17(4):e82194. doi:10.7759/cureus.82194. Single-centre retrospective cohort of hospitalised patients (not a guideline or review); no grades. PMC12076263." },
  { num: 13, text: "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications. Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785. Question 8; grades are printed as (strength, Level n)." },
  { num: 14, text: "PROGRAF (tacrolimus). FDA prescribing information. SPL effective 2023-08-25. Setid 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b." },
  { num: 15, text: "MYFORTIC (mycophenolic acid delayed-release tablets). FDA prescribing information. SPL effective 2026-07-29. Setid eed26501-890d-4ff6-88e7-6dbea4726e53. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eed26501-890d-4ff6-88e7-6dbea4726e53." },
  { num: 16, text: "ASTAGRAF XL (tacrolimus extended-release capsules). FDA prescribing information. SPL effective 2026-01-14. Setid 550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e." },
  { num: 17, text: "Sirolimus tablets. FDA prescribing information. SPL effective 2026-03-26. Setid 5908cd1a-fc5a-462f-99ed-1d8983e253c9. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5908cd1a-fc5a-462f-99ed-1d8983e253c9." },
  { num: 18, text: "ZORTRESS (everolimus). FDA prescribing information. SPL effective 2026-09-16. Setid e082a024-7850-400b-a5c2-2a140612562a. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e082a024-7850-400b-a5c2-2a140612562a." },
  { num: 19, text: "Te H, et al. AASLD/AST practice guideline on adult liver transplantation: graft-related complications (immunosuppressant table). Liver Transpl. 2026;32(3):444-490. doi:10.1097/LVT.0000000000000715." },
];
