// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-). Page: Low blood counts on a transplant drug (entry node tpe-cytopenia, the target of the "Low blood counts" row on the drug cards).
// 4 nodes: entry, labels, differ, dispo. Overlays: tpe-cytopenia-by-drug, tpe-cytopenia-detail (register them in the info-page registry).
// Every clinical sentence restates a row of evidence/cytopenia.ledger.md (map: drafts/tpe-cytopenia.compose.md); grades stay with their own statement. Review-level text (Zhong 2018) is framing only: no number, time target or regimen from it.
// Fixed editor notes only; "App content:" lines name consults only. Module numbers are 0 for the assembler.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-cytopenia" },
  { text: "Editor note: give the Sepsis consult's empiric antibiotics without delay; the febrile neutropenia pathway's risk score is written for cancer patients; call the transplant team.", nodeId: "tpe-cytopenia-fever" },
  { text: "CellCept label: if ANC is below 1.3 x 10^3/\u00b5L, interrupt or reduce the dose (call the transplant team first).", nodeId: "tpe-cytopenia-drug" },
  { text: "Myfortic label: if ANC is below 1.3 x 10^3/mcL or anemia occurs, interrupt or reduce the dose (call the transplant team first).", nodeId: "tpe-cytopenia-drug" },
  { text: "CMV consensus 2025 treatment: attempt to continue valganciclovir or ganciclovir (ungraded); dose reduction for leukopenia alone not recommended (strong, moderate) (call the transplant team first).", nodeId: "tpe-cytopenia-differ" },
  { text: "Sources differ: Valcyte label: should be avoided if ANC is below 500/\u00b5L, platelets below 25,000/\u00b5L or hemoglobin below 8 g/dL (call the transplant team first).", nodeId: "tpe-cytopenia-differ" },
  { text: "Sources differ: ganciclovir label: not recommended if ANC is below 500/\u00b5L, hemoglobin below 8 g/dL or platelets below 25,000/\u00b5L (call the transplant team first).", nodeId: "tpe-cytopenia-differ" },
  { text: "Bactrim label (any use): discontinue if a significant electrolyte abnormality, renal insufficiency or reduction in the count of any formed blood element is noted.", nodeId: "tpe-cytopenia-drug" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-cytopenia",
    type: "question",
    module: 0,
    title: "Low blood counts on a transplant drug",
    safetyLevel: "warning",
    summary: "Fever with low neutrophils: first option; editor note points to the Sepsis consult. Review (emergency medicine, 2018): neutropenic fever in a transplant recipient is a time-sensitive emergency.",
    body: "\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\u2022 Review (emergency medicine, 2018; solid organ and stem cell transplant patients; a narrative review, not a guideline): sepsis and neutropenic fever are life-threatening emergencies; both are time-sensitive diagnoses. [1]\n\u2022 Not in the labels or guidelines used: how the cancer febrile-neutropenia pathway, including its risk score, applies to a transplant recipient with drug-induced neutropenia.\n\u2022 App content: the febrile neutropenia pathway's risk score and references are written for cancer patients, and its low-risk branch requires an oncologist's agreement.\n\u2022 Related consults: [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [Febrile neutropenia (Oncological Emergencies)](#/tree/oncological-emergencies/node/onc-fn-recognize), cancer pathway; [Thrombocytopenia](#/tree/thrombocytopenia/node/thrombocytopenia-start), low platelets; [Hemolytic anemia](#/tree/hemolytic-anemia/node/hemolytic-anemia-start), red-cell destruction; [Blood transfusions](#/tree/blood-transfusions/node/bt-start), blood products.\n\u2022 Which drug is the likely cause: [Labels by drug](#/info/tpe-cytopenia-by-drug) gives the counts each label names, its threshold, action and timing.",
    citation: [1],
    options: [
      {"label": "Fever with low neutrophils", "description": "Editor note, Sepsis consult, febrile neutropenia pathway", "next": "tpe-cytopenia-fever", "urgency": "critical"},
      {"label": "What each drug's label says to do", "description": "Counts, thresholds and actions, by label", "next": "tpe-cytopenia-drug", "urgency": "urgent"},
      {"label": "Where the sources differ", "description": "Valganciclovir, G-CSF, allopurinol, febuxostat", "next": "tpe-cytopenia-differ"},
      {"label": "Not in the sources; disposition", "description": "Admission, transfusion", "next": "tpe-cytopenia-dispo"},
    ],
  },
  {
    id: "tpe-cytopenia-fever",
    type: "info",
    module: 0,
    title: "Fever with low neutrophils in a transplant recipient",
    safetyLevel: "warning",
    summary: "Fever with low neutrophils: Sepsis consult's empiric antibiotics without delay (editor note). Review (emergency medicine, 2018): time-sensitive emergency. Not in the labels or guidelines used: a transplant-specific regimen.",
    body: "\nEditor note: give the Sepsis consult's empiric antibiotics without delay; the febrile neutropenia pathway's risk score is written for cancer patients; call the transplant team.\n\u2022 Review (emergency medicine, 2018; solid organ and stem cell transplant patients; a narrative review, not a guideline): sepsis and neutropenic fever are life-threatening emergencies; both are time-sensitive diagnoses. [1]\n\u2022 Not in the labels or guidelines used: a transplant-specific regimen, or how the cancer febrile-neutropenia pathway, including its risk score, applies to a transplant recipient with drug-induced neutropenia.\n\u2022 KDIGO 2009, non-transplant population: with drug-induced neutropenia (ANC below 500/\u00b5L), patients are at increased risk for serious infection (ungraded). [18]\n\u2022 App content: the febrile neutropenia pathway's risk score and references are written for cancer patients, and its low-risk branch requires an oncologist's agreement.\n\u2022 Related consults: [Sepsis](#/tree/sepsis/node/sepsis-start), sepsis care; [Febrile neutropenia (Oncological Emergencies)](#/tree/oncological-emergencies/node/onc-fn-recognize), cancer pathway.",
    citation: [1, 18],
    next: "tpe-cytopenia-drug",
  },
  {
    id: "tpe-cytopenia-drug",
    type: "info",
    module: 0,
    title: "What the drug labels say to do about low counts",
    safetyLevel: "warning",
    summary: "CellCept label: interrupt or reduce at ANC below 1.3 x 10^3/\u00b5L (call the transplant team first). Valcyte label and the CMV consensus differ at low counts: see Sources differ.",
    body: "\n\u2022 CellCept label (ANC below 1.3 x 10^3/\u00b5L) and Myfortic label (ANC below 1.3 x 10^3/mcL or anemia): interrupt or reduce the dose (call the transplant team first). [2,3]\n\u2022 Valcyte label: should be avoided if ANC is below 500/\u00b5L, platelets below 25,000/\u00b5L or hemoglobin below 8 g/dL; ganciclovir label: not recommended at those counts (call the transplant team first). [5,6]\n\u2022 Imuran label, prompt dose reduction or temporary withdrawal may be necessary if leukocytes fall rapidly or stay low; Atgam label, consider discontinuing if thrombocytopenia or neutropenia is severe and unremitting (call the transplant team first). [4,10]\n\u2022 Bactrim label: discontinue if a significant electrolyte abnormality, renal insufficiency or reduction in the count of any formed blood element is noted; dapsone label: if leucocytes, platelets or hemopoiesis fall significantly, discontinue. [7,8]\n\u2022 Prograf label: if pure red cell aplasia is diagnosed, consider discontinuing (call the transplant team first). [14] Sirolimus and Zortress labels give no count threshold or count-based action; Zortress says monitor hematologic parameters. [12,13]\n\u2022 Thymoglobulin, Actemra, timing, more: [Labels by drug](#/info/tpe-cytopenia-by-drug).",
    citation: [2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14],
    next: "tpe-cytopenia-differ",
  },
  {
    id: "tpe-cytopenia-differ",
    type: "info",
    module: 0,
    title: "Where the sources differ",
    safetyLevel: "warning",
    summary: "Labels advise against valganciclovir or ganciclovir below ANC 500/\u00b5L; CMV consensus 2025 treatment: attempt to continue (ungraded), no dose reduction for leukopenia alone (strong, moderate) (call the transplant team first).",
    body: "\n\u2022 Valcyte label: should be avoided at ANC below 500/\u00b5L; ganciclovir label: not recommended (call the transplant team first). [5,6]\n\u2022 CMV consensus 2025, treating CMV disease: attempt to continue valganciclovir or ganciclovir (ungraded); no dose reduction for leukopenia alone (strong, moderate). On intolerance: maribavir or foscarnet (strong, low) (call the transplant team first). [19]\n\u2022 Prophylaxis, intolerance, D+/R- or R+ lung, heart, liver or kidney: preemptive therapy or letermovir (CMV consensus 2025, weak, low). AASLD/AST, liver, in the absence of HSV and VZV seropositivity: letermovir for persistent neutropenia (Strong, Level 2) (call the transplant team first). [19,20]\n\u2022 No source read gives a blood-count threshold at which to switch.\n\u2022 G-CSF: CMV consensus 2025 (ungraded): CSFs could be considered. KDIGO 2009 rationale, kidney recipients (ungraded): evidence is case reports; potential for harm; one report of worsening graft function. [18,19]\n\u2022 KDIGO 2009, kidney (1B): avoid allopurinol with azathioprine. Imuran label, used together: reduce azathioprine to about 1/3 to 1/4 of the usual dose; KDIGO rationale: reduce by at least 50% and monitor counts (call the transplant team first). [4,18]\n\u2022 Febuxostat: Uloric label, contraindicated with azathioprine; Imuran label, not recommended. [4,25]\n[Detail](#/info/tpe-cytopenia-detail)",
    citation: [4, 5, 6, 18, 19, 20, 25],
    next: "tpe-cytopenia-dispo",
  },
  {
    id: "tpe-cytopenia-dispo",
    type: "result",
    module: 0,
    title: "Disposition with low blood counts on a transplant drug",
    safetyLevel: "warning",
    confidence: "consider",
    summary: "Not in the labels or guidelines used: an admission rule or transfusion thresholds. Atgam label: if thrombocytopenia occurs, consider platelet transfusions; no number is given.",
    body: "\n\u2022 Not in the labels or guidelines used: an admission rule for neutropenia, red cell or platelet transfusion thresholds for a transplant recipient, or an ED rule for G-CSF.\n\u2022 Atgam label: if thrombocytopenia occurs, consider platelet transfusions to keep platelets at clinically acceptable levels; no number is given. [10]\n\u2022 KDIGO 2009, kidney (Not Graded): do a blood count after any change in medication that may cause neutropenia, anemia or thrombocytopenia; for neutropenia and thrombocytopenia, include treatment of underlying causes whenever possible. [18]\n\u2022 App content: the Thrombocytopenia consult's drug node says to stop a suspected nonessential culprit.\n\u2022 Related consults: [Blood transfusions](#/tree/blood-transfusions/node/bt-start), blood products; [Thrombocytopenia](#/tree/thrombocytopenia/node/thrombocytopenia-start), low platelets.\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**Low blood counts on a transplant drug: an admission rule and transfusion thresholds are not in the labels or guidelines used.** Editor note: disposition is decided with the treating transplant team.",
    citation: [10, 18],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "Zhong D, et al. Approach to Transplant Infectious Diseases in the Emergency Department. Emerg Med Clin North Am. 2018;36(4):811. doi:10.1016/j.emc.2018.06.010. Narrative review (solid organ and hematopoietic cell transplant); no grades. PMC6237280." },
  { num: 2, text: "CELLCEPT (mycophenolate mofetil). FDA prescribing information. SPL effective 2026-08-05. Setid 37241e87-4af4-4dc3-a1aa-ea6f20d8dc40. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=37241e87-4af4-4dc3-a1aa-ea6f20d8dc40." },
  { num: 3, text: "MYFORTIC (mycophenolic acid delayed-release tablets). FDA prescribing information. SPL effective 2026-07-29. Setid eed26501-890d-4ff6-88e7-6dbea4726e53. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eed26501-890d-4ff6-88e7-6dbea4726e53." },
  { num: 4, text: "IMURAN (azathioprine). FDA prescribing information. SPL effective 2026-03-19. Setid 4d62b6e4-a9d4-4818-e063-6394a90aa208. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4d62b6e4-a9d4-4818-e063-6394a90aa208" },
  { num: 5, text: "VALCYTE (valganciclovir). FDA prescribing information. SPL effective 2025-12-08. Setid 4c517a39-2ded-4c5a-8d56-276853414b31. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4c517a39-2ded-4c5a-8d56-276853414b31." },
  { num: 6, text: "Ganciclovir injection (Par). FDA prescribing information. SPL effective 2026-09-25. Setid 87afd103-6e64-444f-971d-0e732e9ae995. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=87afd103-6e64-444f-971d-0e732e9ae995." },
  { num: 7, text: "BACTRIM (sulfamethoxazole and trimethoprim). FDA prescribing information. SPL effective 2024-12-30. Setid f59d0c04-9c66-4d53-a0e1-cb55570deb62. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f59d0c04-9c66-4d53-a0e1-cb55570deb62" },
  { num: 8, text: "Dapsone tablets (Sun). FDA prescribing information. SPL effective 2026-03-17. Setid cb312185-b9f1-4fa4-9481-bcf5d9bb3edf. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cb312185-b9f1-4fa4-9481-bcf5d9bb3edf" },
  { num: 9, text: "THYMOGLOBULIN (anti-thymocyte globulin [rabbit]). FDA prescribing information. SPL effective 2026-06-24. Setid bbd8ab99-552e-4b81-aca4-6b0c7af8b9ae. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=bbd8ab99-552e-4b81-aca4-6b0c7af8b9ae." },
  { num: 10, text: "ATGAM (lymphocyte immune globulin, anti-thymocyte globulin [equine]). FDA prescribing information. SPL effective 2024-06-18. Setid bd545ba1-2366-4df1-bd67-10dfd7632b54. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=bd545ba1-2366-4df1-bd67-10dfd7632b54." },
  { num: 11, text: "ACTEMRA (tocilizumab). FDA prescribing information. Indications are RA, GCA, SSc-ILD, PJIA, SJIA, CRS and COVID-19; no transplant indication. SPL effective 2025-12-16. Setid 2e5365ff-cb2a-4b16-b2c7-e35c6bf2de13. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=2e5365ff-cb2a-4b16-b2c7-e35c6bf2de13." },
  { num: 12, text: "Sirolimus tablets. FDA prescribing information. SPL effective 2026-03-26. Setid 5908cd1a-fc5a-462f-99ed-1d8983e253c9. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5908cd1a-fc5a-462f-99ed-1d8983e253c9." },
  { num: 13, text: "ZORTRESS (everolimus). FDA prescribing information. SPL effective 2026-09-16. Setid e082a024-7850-400b-a5c2-2a140612562a. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e082a024-7850-400b-a5c2-2a140612562a." },
  { num: 14, text: "PROGRAF (tacrolimus). FDA prescribing information. SPL effective 2023-08-25. Setid 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b." },
  { num: 15, text: "ASTAGRAF XL (tacrolimus extended-release capsules). FDA prescribing information. SPL effective 2026-01-14. Setid 550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e." },
  { num: 16, text: "ENVARSUS XR (tacrolimus extended-release tablets). FDA prescribing information. SPL effective 2025-02-26. Setid de2315b0-6344-43ac-9aea-3e3b68d828e7. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=de2315b0-6344-43ac-9aea-3e3b68d828e7." },
  { num: 17, text: "Cyclosporine labels: NEORAL (setid 94461af3-11f1-4670-95d4-2965b9538ae3), GENGRAF (setid e896cbfe-4745-4088-82a3-8dc10b75c41f), SANDIMMUNE (setid 5e5926a7-1de0-4b54-a5c0-286b6200ff82). FDA prescribing information. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=94461af3-11f1-4670-95d4-2965b9538ae3" },
  { num: 18, text: "KDIGO Transplant Work Group. KDIGO clinical practice guideline for the care of kidney transplant recipients. Am J Transplant. 2009;9(Suppl 3):S1-S155. doi:10.1111/j.1600-6143.2009.02834.x." },
  { num: 19, text: "Kotton CN, et al. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374. The leukopenia statement is in the treatment of CMV disease section; grades are printed as (strength, quality)." },
  { num: 20, text: "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications. Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785. Question 10, CMV." },
  { num: 21, text: "PREVYMIS (letermovir). FDA prescribing information. SPL effective 2026-01-14. Setid 1b49df80-be4f-47e0-a0b7-123f3e69395b. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=1b49df80-be4f-47e0-a0b7-123f3e69395b." },
  { num: 22, text: "PENTAM 300 (pentamidine isethionate for injection). FDA prescribing information. SPL effective 2022-09-13. Setid cc2b635e-4840-4dc3-a177-5484371680e8. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cc2b635e-4840-4dc3-a177-5484371680e8" },
  { num: 23, text: "Velleca A, et al. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015. Malignancy topic; the recommendation text is printed in the 2010 column and continued in 2023 without change." },
  { num: 24, text: "Te H, et al. AASLD/AST practice guideline on adult liver transplantation: graft-related complications (immunosuppressant table). Liver Transpl. 2026;32(3):444-490. doi:10.1097/LVT.0000000000000715." },
  { num: 25, text: "ULORIC (febuxostat). FDA prescribing information. DailyMed page revised April 2023, SPL published December 2025. Setid 54de10ef-fe5f-4930-b91d-6bbb04c664bd. https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/54de10ef-fe5f-4930-b91d-6bbb04c664bd.xml" },
];
