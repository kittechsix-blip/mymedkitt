// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-).
// Page: CMV in the adult solid-organ transplant recipient. Root node: tpe-cmv.
// Imports below assume the assembler moves this into src/data/trees/; module numbers are left at 0 for the assembler.
// Source tiers: GUIDELINE sentences carry [n] citations; sentences beginning "Editor note:" are NOT from any source and need owner approval.
// Hub shape: entry tpe-cmv; leaves go to tpe-cmv-dispo. Detail lives in info pages: tpe-cmv-risk, tpe-cmv-test, tpe-cmv-dosing, tpe-cmv-resistance, tpe-cmv-team (drafts/<id>.info.ts).
// Claims ledger: research/transplant-sources/drafts/tpe-cmv.ledger.md

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-cmv" },
  { text: "IV ganciclovir is recommended for severe or life-threatening CMV (strong, low); preferred for life- or sight-threatening disease when optimal exposure is essential.", nodeId: "tpe-cmv-treat" },
  { text: "CMV disease treatment, normal kidney function: valganciclovir 900 mg every 12 h or IV ganciclovir 5 mg/kg every 12 h (strong, moderate).", nodeId: "tpe-cmv-safety" },
  { text: "CMV disease treatment: below normal kidney function use the dose bands; reduce the antiviral dose only for worsening kidney function (strong, low).", nodeId: "tpe-cmv-safety" },
  { text: "During CMV treatment, leukopenia alone: antiviral dose reduction is not recommended (strong, moderate); options: G-CSF, adjusting other myelosuppressive drugs (call the transplant team first).", nodeId: "tpe-cmv-safety" },
  { text: "Changing antivirals is not recommended in the first 2 weeks of therapy if clinically improving, even with rising DNA (strong, moderate).", nodeId: "tpe-cmv-safety" },
  { text: "Send CMV QNAT on plasma or whole blood (strong, high); serology has no role; culture of blood, urine, stool or oral secretions is not recommended.", nodeId: "tpe-cmv-workup" },
  { text: "Blood CMV DNA can be low or undetectable in gut disease and, rarely, lung disease; histology is recommended for tissue-invasive disease (strong, moderate).", nodeId: "tpe-cmv-workup" },
  { text: "Transfusion: leukoreduced or CMV-seronegative blood products are recommended (strong, moderate), especially in D-/R- recipients.", nodeId: "tpe-cmv-safety" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-cmv",
    type: "question",
    module: 0,
    title: "Transplant recipient with possible CMV",
    safetyLevel: "warning",
    summary: "CMV consensus 2025: send CMV PCR on blood; blood DNA can be low or undetectable in gut disease and, rarely, in lung recipients with pneumonia.",
    body: "**CMV RISK**\n\u2022 High risk is donor CMV+/recipient CMV\u2212 (D+/R\u2212); intermediate D+/R+ or D\u2212/R+; low D\u2212/R\u2212. [1]\n\u2022 Late-onset CMV (after prophylaxis ends) is associated with D+/R\u2212, shorter prophylaxis, higher immunosuppression and rejection; observational studies show more CMV after rejection treatment with lymphocyte-depleting antibodies. [1]\n\u2022 **Blood CMV DNA can be low or undetectable in gastrointestinal disease and, rarely, in lung recipients with CMV pneumonia.** [1]\n\u2022 Serology has no role in diagnosing active CMV. [1]\n\u2022 Liver recipients: CMV can present as asymptomatic viremia, CMV syndrome (fatigue, myalgias, fevers, neutropenia, viremia) or end-organ disease, most often gastrointestinal, including the liver. [2]\n\n[Timing, presentation and related consults](#/info/tpe-cmv-risk)\n\nEditor note: tell the transplant team the organ, transplant date, donor and recipient CMV status, and when prophylaxis ended or rejection was treated.\n\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.",
    citation: [1, 2],
    options: [
      { label: "Severe, life-threatening or sight-threatening CMV: treatment", description: "IV ganciclovir, valganciclovir, first dose", next: "tpe-cmv-treat", urgency: "critical" },
      { label: "Work-up: confirm CMV, and what a negative blood test misses", description: "PCR, tissue, CSF, eye", next: "tpe-cmv-workup", urgency: "urgent" },
      { label: "Drug safety and kidney dosing", description: "Dose bands, leukopenia, switching, transfusion", next: "tpe-cmv-safety" },
      { label: "What the transplant team will do", description: "Immunosuppression, resistance, second-line drugs", next: "tpe-cmv-team" },
    ],
    calculatorLinks: [
      { id: "sepsis", label: "Sepsis: fever, shock or organ dysfunction, cause unknown", kind: 'tree' },
      { id: "pneumonia", label: "Pneumonia: CMV pneumonia is a recognised lung presentation", kind: 'tree' },
      { id: "diarrhea", label: "Diarrhea: GI tract is the most common CMV site (liver guideline)", kind: 'tree' },
      { id: "hepatitis", label: "Hepatitis: CMV end-organ disease can involve the liver", kind: 'tree' },
      { id: "meningitis", label: "Meningitis: fever with headache or altered mentation", kind: 'tree' },
    ],
  },
  {
    id: "tpe-cmv-treat",
    type: "info",
    module: 0,
    title: "Treatment: first-line drugs, route and first dose",
    safetyLevel: "warning",
    summary: "CMV consensus 2025: recommended: IV ganciclovir in severe or life-threatening disease; oral valganciclovir in mild to moderate disease if the patient can tolerate and adhere (strong, moderate).",
    body: "**FIRST-LINE, normal kidney function (strong, moderate):** [Valganciclovir](#/drug/valganciclovir/cmv-treatment) 900 mg every 12 h, or [Ganciclovir](#/drug/ganciclovir/cmv-treatment) 5 mg/kg IV every 12 h. Below normal kidney function: [kidney dose bands](#/info/tpe-cmv-dosing).\n\u2022 IV ganciclovir is recommended in life-threatening and severe disease (strong, low); preferred for life- or sight-threatening disease when optimal drug exposure is essential. [1]\n\u2022 Oral valganciclovir is recommended in mild to moderate disease if oral therapy is tolerated and adhered to (strong, moderate). [1]\n\u2022 Liver guideline (liver recipients): IV ganciclovir if viral load is 100,000 IU/mL or more, absorption is impaired or infection is severe (Strong, Level 1); the sources differ. [2]\n\u2022 Valcyte label: transplant indication is prevention; this page's treatment doses rest on the guideline ([Guideline and label differ](#/info/tpe-cmv-dosing)). [3]\n\nEditor note: the guideline does not say whether to start an antiviral in the ED before a result is back; agree this with the transplant team before the first dose.\n\nDuring treatment, weekly CMV DNA is recommended (strong, high). [1]\n\nRelated consults: [Sepsis](#/tree/sepsis) fever, shock; [Pneumonia](#/tree/pneumonia) lung disease; [Diarrhea](#/tree/diarrhea) gut disease.",
    citation: [1, 2, 3],
    next: "tpe-cmv-dispo",
  },
  {
    id: "tpe-cmv-workup",
    type: "info",
    module: 0,
    title: "Work-up: the test, and what a negative blood test misses",
    safetyLevel: "warning",
    summary: "CMV consensus 2025: send CMV PCR on plasma or whole blood; histology is recommended for tissue-invasive disease; culture of blood, urine, stool or oral secretions is not recommended.",
    body: "\u2022 CMV QNAT (PCR) calibrated to the WHO standard, on plasma or whole blood, is the recommended test (strong, high); keep the same specimen type and assay when monitoring (strong, high). [1]\n\u2022 No universal viral-load threshold for treatment has been established; centers set their own (strong, moderate). [1]\n\u2022 Not recommended: viral culture of blood, urine, stool or oral secretions (strong, high); QNAT on urine, stool or oral secretions (strong, low). Serology has no role. [1]\n\u2022 **Blood CMV DNA can be low or undetectable in gastrointestinal disease and, rarely, in lung recipients with CMV pneumonia.** [1]\n\u2022 **Organ disease:** histology with immunohistochemistry is recommended (strong, moderate). CMV DNA in CSF (assuming no blood contamination) likely represents disease; retinitis is diagnosed by eye examination. [1]\n\n[Test details, thresholds, organ-by-organ diagnosis](#/info/tpe-cmv-test)\n\nEditor note: send the CMV QNAT from the ED and tell the transplant team which specimen type (plasma or whole blood) was sent, because the guideline asks that monitoring use the same specimen type and assay.",
    citation: [1, 2],
    next: "tpe-cmv-dispo",
  },
  {
    id: "tpe-cmv-safety",
    type: "info",
    module: 0,
    title: "Drug safety and kidney dosing",
    safetyLevel: "warning",
    summary: "CMV consensus 2025: dose by kidney-function bands; in CMV treatment, leukopenia alone: antiviral dose cut not recommended; options include adjusting other myelosuppressive drugs (call the transplant team first).",
    body: "\u2022 **Below normal kidney function use the [kidney dose bands](#/info/tpe-cmv-dosing)** (Cockcroft-Gault, mL/min): frequent kidney-function monitoring is recommended (strong, moderate); reduce the antiviral dose only for worsening kidney function (strong, low). [1]\n\u2022 **During CMV treatment, leukopenia alone:** reducing the antiviral dose is not recommended (strong, moderate); options include G-CSF and adjusting other myelosuppressive drugs (call the transplant team first). Labels say avoid below stated counts: [Guideline and label differ](#/info/tpe-cmv-dosing). [1,3,4]\n\u2022 Changing antivirals is not recommended in the first 2 weeks if clinically improving, even with unchanged or rising DNA (strong, moderate); DNA commonly rises in week 1. [1]\n\u2022 Transfusion: leukoreduced or CMV-seronegative blood products are recommended, especially in D\u2212/R\u2212 recipients (strong, moderate). [1]\n\u2022 Oral ganciclovir, acyclovir and valacyclovir are not recommended for treatment (strong, moderate). [1]\n\u2022 Letermovir: dose reduction is required with cyclosporine; may alter tacrolimus levels; close monitoring is needed. [1]",
    citation: [1, 3, 4],
    next: "tpe-cmv-dispo",
  },
  {
    id: "tpe-cmv-team",
    type: "info",
    module: 0,
    title: "What the transplant team will do",
    summary: "CMV consensus 2025: reducing immunosuppression is suggested in severe disease without rejection (call the transplant team first). Not in the guideline: second-line drug doses.",
    body: "\u2022 Without concomitant rejection, reducing immunosuppression is suggested in severe disease, inadequate response, high viral loads and cytopenia (weak, very low) (call the transplant team first). [1]\n\u2022 Not in the guideline: how much or which drug to reduce, or what to do if rejection coexists. Nearest sourced fact: optimization of immunosuppression and drug dosing is recommended as feasible in resistant or refractory CMV (strong, low). [1]\n\u2022 Suspect resistance with prior cumulative antiviral exposure exceeding 4 weeks and clinical failure despite at least 2 weeks of appropriately dosed treatment (strong, moderate); genotyping is recommended after that exposure and response (strong, high). [1]\n\u2022 Maribavir or foscarnet are recommended second-line treatments when valganciclovir or ganciclovir is not tolerated (strong, low); maribavir is the principal alternative in resistance to ganciclovir or foscarnet (strong, high). Avoid maribavir in CNS disease or retinitis (flowchart footnote, not graded). [1]\n\u2022 The two guidelines give different viral-load markers for foscarnet: see the resistance page.\n\n[Resistance, second-line drugs, source conflicts](#/info/tpe-cmv-resistance)\n[Immunosuppression, rejection, IVIG, secondary prophylaxis, letermovir](#/info/tpe-cmv-team)\n\nRelated consults: [Calcineurin inhibitor toxicity](#/tree/transplant-patient-ed/node/tpe-cni-toxicity) tacrolimus, cyclosporine.",
    citation: [1, 2],
    next: "tpe-cmv-dispo",
  },
  {
    id: "tpe-cmv-dispo",
    type: "result",
    module: 0,
    title: "Disposition for CMV in a transplant recipient",
    confidence: "consider",
    summary: "Not in either guideline: a graded admission rule. CMV consensus 2025: IV ganciclovir is recommended in severe or life-threatening disease (strong, low).",
    body: "\u2022 Not in the guideline: a graded admission or discharge rule, a definition of mild, moderate or severe, or an ED follow-up interval.\n\u2022 Nearest sourced facts: for non-life-threatening disease, valganciclovir is preferred when feasible because its oral form may reduce or prevent hospital stays. [1]\n\u2022 **Liver recipients, narrative (not graded):** \"those with resistant or refractory CMV infection with high viral loads (>20,000\u201350,000 IU/mL) require hospitalization, or failure of maribavir will require intravenous therapy, typically with foscarnet\"; management of refractory or resistant CMV should be directed by a transplant infectious diseases specialist. [2] [Source conflicts](#/info/tpe-cmv-resistance)\n\n\u2022 Monitoring: weekly CMV DNA during treatment (strong, high) [1]; liver guideline: weekly monitoring for 4 weeks off therapy once viral load is undetectable (Strong, Level 1) [2].\n\nRelated consults: [Sepsis](#/tree/sepsis) fever, shock; [Pneumonia](#/tree/pneumonia) lung disease.\n\nEditor note: before discharge on oral therapy, check the patient can swallow and keep down tablets, that the repeat CMV DNA, blood count and creatinine are booked, and that the patient knows whom to call.\n\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**CMV: for non-life-threatening disease valganciclovir is preferred when feasible; IV ganciclovir is recommended for life-threatening and severe disease. Liver recipients, text not graded: resistant or refractory CMV with viral load >20,000\u201350,000 IU/mL requires hospitalization, or failure of maribavir requires IV therapy, typically foscarnet.** Editor note: disposition is decided with the treating transplant team.",
    citation: [1, 2],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "Kotton CN, Kumar D, Manuel O, Chou S, Hayden RT, Danziger-Isakov L, Asberg A, Tedesco-Silva H, Humar A; The Transplantation Society International CMV Consensus Group. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374. https://pmc.ncbi.nlm.nih.gov/articles/PMC12180710/" },
  { num: 2, text: "Sharma P, et al. (AASLD/AST) Practice Guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications (Question 10, cytomegalovirus). Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785" },
  { num: 3, text: "Valcyte (valganciclovir) tablets and for oral solution, prescribing information. H2-Pharma. DailyMed set id 4c517a39-2ded-4c5a-8d56-276853414b31; label effective 2025-12-08 (Revised 04/2023)." },
  { num: 4, text: "Ganciclovir for injection, prescribing information. Par Pharmaceutical. DailyMed set id 87afd103-6e64-444f-971d-0e732e9ae995; label effective 2026-09-25 (Revised 09/2026)." },
];
