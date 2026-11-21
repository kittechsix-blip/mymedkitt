// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-).
// Page: Kidney transplant recipient: rejection and graft emergencies (KDIGO 2009). Entry node: tpe-kidney.
// 7 nodes: hub, vascular, rejection, infection, drugs, chronic, dispo. Reference material lives in five info pages: tpe-kidney-rejection-detail, tpe-kidney-vascular-detail, tpe-kidney-infection-detail, tpe-kidney-drugs-detail, tpe-kidney-chronic-detail (register them in the info-page registry).
// Every clinical sentence restates a row of evidence/kidney.ledger.md; the sentence-to-row map is drafts/tpe-kidney.compose.md. Module numbers are 0 for the assembler.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-kidney" },
  { text: "Editor note: name suspected vascular compromise to the transplant team at the first call.", nodeId: "tpe-kidney-vascular" },
  { text: "KDIGO 2009, kidney recipients: for a persistent unexplained creatinine rise, recommend biopsy (1C); first rule out dehydration, obstruction, acute CNI toxicity (rationale).", nodeId: "tpe-kidney" },
  { text: "KDIGO 2009, kidney recipients: suggest allograft ultrasound as part of assessing graft dysfunction (2C).", nodeId: "tpe-kidney-vascular" },
  { text: "KDIGO 2009, kidney recipients: recommend biopsy before treating acute rejection unless it substantially delays treatment (1C).", nodeId: "tpe-kidney-rejection" },
  { text: "KDIGO 2009, kidney recipients: allograft pyelonephritis: suggest initial hospitalization and intravenous antibiotics (2C).", nodeId: "tpe-kidney-infection" },
  { text: "KDIGO 2009: Pneumocystis pneumonia (diagnosis by lavage or biopsy): recommend high-dose intravenous trimethoprim-sulfamethoxazole, corticosteroids (1C); also reduced immunosuppression (call the transplant team first).", nodeId: "tpe-kidney-infection" },
  { text: "KDIGO 2009, kidney recipients: systemic HSV: recommend intravenous acyclovir (1B); also reduced immunosuppression (1D) (call the transplant team first).", nodeId: "tpe-kidney-infection" },
  { text: "KDIGO 2009, kidney recipients: recommend avoiding allopurinol in patients receiving azathioprine (1B).", nodeId: "tpe-kidney-drugs" },
  { text: "KDIGO 2009, kidney recipients: suggest avoiding NSAIDs and COX-2 inhibitors whenever possible (2D).", nodeId: "tpe-kidney-drugs" },
  { text: "KDIGO 2009, kidney recipients: recommend monitoring CNI and mTOR inhibitor blood levels in patients receiving rifampin (1C).", nodeId: "tpe-kidney-drugs" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-kidney",
    type: "question",
    module: 0,
    title: "Kidney transplant recipient: rejection and graft emergencies",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney recipients: persistent unexplained creatinine rise: recommend biopsy (1C); first rule out dehydration, obstruction, acute CNI toxicity (rationale). Extra immunosuppression for non-rejection causes may be harmful (rationale).",
    body: "\nKDIGO 2009, kidney recipients:\n\u2022 This guideline dates from 2009.\n\u2022 acute rejection is suspected when serum creatinine rises after other causes of graft dysfunction are excluded (rationale) [1]\n\u2022 suggest measuring CNI levels at least whenever kidney function declines in a way that may indicate nephrotoxicity or rejection (2C) [1]\n\u2022 risk of acute rejection is highest in the first 3 months after transplant (background) [1]\n\u2022 Not in KDIGO 2009: red-flag symptoms, or a creatinine threshold for suspecting rejection. Nearest: only a persistent creatinine rise outside normal variability counts; studies often use a 25-50% rise over baseline (rationale) [1]\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\nRelated consults: [Sepsis](#/tree/sepsis/node/sepsis-start) (fever, shock); [Potassium](#/tree/potassium/node/k-start) (high potassium); [Hemodialysis Emergencies](#/tree/hd-emergencies/node/hd-start) (dialysis problems).",
    citation: [1],
    options: [
      {"label": "Fever, infection, pyelonephritis, Pneumocystis, herpes", "description": "Infection statements, KDIGO 2009", "next": "tpe-kidney-infection", "urgency": "critical"},
      {"label": "Graft vessels, obstruction, urine leak", "description": "Ultrasound and rapid-treatment causes", "next": "tpe-kidney-vascular", "urgency": "critical"},
      {"label": "Suspected rejection: biopsy and treatment", "description": "Biopsy before treatment; treatment names", "next": "tpe-kidney-rejection", "urgency": "urgent"},
      {"label": "Drug cautions: allopurinol, NSAIDs, rifampin, gout", "description": "What KDIGO 2009 says an ED meets", "next": "tpe-kidney-drugs", "urgency": "urgent"},
      {"label": "Chronic and metabolic problems, pregnancy", "description": "Diabetes, blood pressure, cytopenias, cancer, bone", "next": "tpe-kidney-chronic"},
      {"label": "Disposition", "description": "Hospitalization statements", "next": "tpe-kidney-dispo"},
    ],
    calculatorLinks: [
      {"id": "sepsis", "label": "Sepsis: fever, shock", "kind": "tree", "node": "sepsis-start"},
      {"id": "potassium", "label": "Potassium: high potassium", "kind": "tree", "node": "k-start"},
      {"id": "hd-emergencies", "label": "Hemodialysis Emergencies: dialysis problems", "kind": "tree", "node": "hd-start"},
    ],
  },
  {
    id: "tpe-kidney-vascular",
    type: "info",
    module: 0,
    title: "Graft vessels, obstruction and urine leak",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney recipients: suggest allograft ultrasound for dysfunction (2C); it can show arterial occlusion, venous thrombosis, obstruction; hard-to-control hypertension, especially with unexplained dysfunction: consider vascular screening (rationale).",
    body: "\nKDIGO 2009, kidney recipients:\nEditor note: name suspected vascular compromise to the transplant team at the first call.\n\u2022 suggest kidney allograft ultrasound as part of assessing graft dysfunction (2C) [1]\n\u2022 ultrasound can diagnose arterial occlusion, venous thrombosis, urinary obstruction, urine leak, perinephric hematoma and post-biopsy arteriovenous fistula (rationale) [1]\n\u2022 causes needing rapid treatment: acute rejection, obstruction, urine leak, vascular compromise, some recurrent diseases such as FSGS (rationale) [1]\n\u2022 those rapid-treatment causes are more common in the first days to weeks after transplant than in later months to years (rationale) [1]\n\u2022 when hypertension is hard to control, especially with unexplained graft dysfunction, consider screening for vascular compromise (within or proximal to the allograft artery) (rationale) [1]\n\u2022 Not in KDIGO 2009: treatment of ureteric obstruction, urine leak, renal artery stenosis or graft thrombosis. Nearest: screening for allograft vascular compromise usually needs an angiogram, CT angiography or magnetic resonance imaging of the allograft vasculature (rationale) [1]\n[Details](#/info/tpe-kidney-vascular-detail)\nRelated consults: [Hypertensive Emergency (Adult)](#/tree/hypertensive-emergency-adult/node/hypertensive-emergency-adult-start) (severe hypertension); [Adult UTI](#/tree/adult-uti/node/uti-pyelonephritis) (pyelonephritis care).",
    citation: [1],
    calculatorLinks: [
      {"id": "hypertensive-emergency-adult", "label": "Hypertensive Emergency (Adult): severe hypertension", "kind": "tree", "node": "hypertensive-emergency-adult-start"},
      {"id": "adult-uti", "label": "Adult UTI: pyelonephritis care", "kind": "tree", "node": "uti-pyelonephritis"},
    ],
    next: "tpe-kidney-dispo",
  },
  {
    id: "tpe-kidney-rejection",
    type: "info",
    module: 0,
    title: "Suspected rejection: biopsy first, then treatment",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney recipients: recommend biopsy before treating acute rejection unless substantially delaying treatment (1C); recommend corticosteroids for initial treatment of acute cellular rejection (1D) (call the transplant team first).",
    body: "\nKDIGO 2009, kidney recipients:\n\u2022 recommend corticosteroids for the initial treatment of acute cellular rejection (1D) (call the transplant team first) [1]\n\u2022 suggest lymphocyte-depleting antibodies or OKT3 for cellular rejection not responding to corticosteroids, and for recurrent cellular rejection (2C) (call the transplant team first) [1]\n\u2022 if function does not return to baseline, or declines again after successful treatment, consider repeat biopsy for rejection, BK nephropathy and other causes (rationale) [BK page](#/tree/transplant-patient-ed/node/tpe-bk) [1]\n\u2022 suggest biopsy every 7-10 days during delayed graft function (2C) [1]\n\u2022 during delayed graft function treated with dialysis, kidney function cannot be the indication for biopsy to diagnose superimposed acute rejection (rationale) [1]\n\u2022 Not in KDIGO 2009: a symptom list or onset time for antibody-mediated rejection. Nearest: optimal treatment protocol for acute antibody-mediated (humoral) rejection remains to be determined; no adequately powered trials compare options (rationale) [1]\n[Details](#/info/tpe-kidney-rejection-detail)\nRelated consults: [Hemodialysis Emergencies](#/tree/hd-emergencies/node/hd-start) (dialysis problems).",
    citation: [1],
    calculatorLinks: [
      {"id": "hd-emergencies", "label": "Hemodialysis Emergencies: dialysis problems", "kind": "tree", "node": "hd-start"},
    ],
    next: "tpe-kidney-dispo",
  },
  {
    id: "tpe-kidney-infection",
    type: "info",
    module: 0,
    title: "Kidney recipient: allograft pyelonephritis, Pneumocystis, herpes viruses",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney recipients: allograft pyelonephritis: suggest initial hospitalization and intravenous antibiotics (2C). Systemic HSV: recommend intravenous acyclovir (1B); also reduced immunosuppression (1D) (call the transplant team first).",
    body: "\nKDIGO 2009, kidney recipients:\n\u2022 Pneumocystis pneumonia diagnosed by lavage or lung biopsy: recommend high-dose intravenous trimethoprim-sulfamethoxazole, corticosteroids (1C); also reduced immunosuppression (1C) (call the transplant team first) [1]\n\u2022 recommend corticosteroids for moderate to severe Pneumocystis pneumonia (PaO2 under 70 mm Hg on room air, or gradient over 35 mm Hg) (1C) [1]\n\u2022 Newer consensus documents exist for BK (2024) and CMV (2025): [BK page](#/tree/transplant-patient-ed/node/tpe-bk), [CMV page](#/tree/transplant-patient-ed/node/tpe-cmv). [5,6]\n\u2022 Not in KDIGO 2009: which antibiotic for allograft pyelonephritis. Nearest: allograft pyelonephritis is usually accompanied by signs of systemic inflammation and a positive urine or blood culture (background) [1]\n\u2022 Not in KDIGO 2009: treatment before the diagnosis is proven. Nearest: the diagnosis of Pneumocystis pneumonia should be confirmed by lung biopsy or bronchoalveolar lavage because no imaging pattern is specific (background) [1]\n[Details](#/info/tpe-kidney-infection-detail)\nRelated consults: [Sepsis](#/tree/sepsis/node/sepsis-start) (fever, shock); [Adult UTI](#/tree/adult-uti/node/uti-pyelonephritis) (pyelonephritis care); [Pneumonia](#/tree/pneumonia/node/pna-start) (lung infection); [HIV](#/tree/hiv/node/hiv-pulm-oi) (Pneumocystis node).",
    citation: [1, 5, 6],
    calculatorLinks: [
      {"id": "sepsis", "label": "Sepsis: fever, shock", "kind": "tree", "node": "sepsis-start"},
      {"id": "adult-uti", "label": "Adult UTI: pyelonephritis care", "kind": "tree", "node": "uti-pyelonephritis"},
      {"id": "pneumonia", "label": "Pneumonia: lung infection", "kind": "tree", "node": "pna-start"},
      {"id": "hiv", "label": "HIV: Pneumocystis node", "kind": "tree", "node": "hiv-pulm-oi"},
    ],
    next: "tpe-kidney-dispo",
  },
  {
    id: "tpe-kidney-drugs",
    type: "info",
    module: 0,
    title: "Drug cautions in a kidney recipient",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney recipients: recommend avoiding allopurinol in patients receiving azathioprine (1B); suggest avoiding NSAIDs whenever possible (2D); recommend monitoring CNI and mTOR inhibitor levels in patients receiving rifampin (1C).",
    body: "\nKDIGO 2009, kidney recipients:\n\u2022 allopurinol with azathioprine can cause profound, life-threatening pancytopenia; use with extreme caution or not at all (rationale) [1]\n\u2022 NSAIDs and COX-2 inhibitors can significantly reduce kidney function and cause acute kidney injury (rationale) [1]\n\u2022 suggest colchicine for acute gout, with dose reduction for reduced kidney function and concomitant CNI use (2D) [1]\n\u2022 colchicine levels may be raised in reduced kidney function and with cyclosporine, and presumably tacrolimus (rationale) [1]\n\u2022 dose: in patients with eGFR under 60, avoid prolonged colchicine and avoid doses above 0.6 mg/day (rationale) [1]\n\u2022 rifampin strongly induces enzymes that metabolize CNIs and mTOR inhibitors, so adequate levels may be hard to keep (rationale) [1]\n\u2022 Not in KDIGO 2009: cautions for macrolides, aminoglycosides or vancomycin. Nearest: the guideline notes interactions between fluconazole and CNIs, and a report of a possible clotrimazole-tacrolimus interaction (rationale) [1]\n[Details](#/info/tpe-kidney-drugs-detail); [Tacrolimus and cyclosporine labels](#/tree/transplant-patient-ed/node/tpe-cni-drugs)\nRelated consults: [Sepsis](#/tree/sepsis/node/sepsis-start) (fever, shock).",
    citation: [1],
    calculatorLinks: [
      {"id": "sepsis", "label": "Sepsis: fever, shock", "kind": "tree", "node": "sepsis-start"},
    ],
    next: "tpe-kidney-dispo",
  },
  {
    id: "tpe-kidney-chronic",
    type: "info",
    module: 0,
    title: "Chronic and metabolic problems in a kidney recipient",
    safetyLevel: "warning",
    summary: "KDIGO 2009, kidney recipients: suggest diabetes screening after starting, or substantially increasing the dose of, a CNI or corticosteroid (2D); suggest blood pressure below 130/80 mm Hg in adults (2C).",
    body: "\nKDIGO 2009, kidney recipients:\n\u2022 untreated diabetes may increase metabolic complications including hyperkalemia and even ketoacidosis; frequency after transplant is unknown (background) [1]\n\u2022 assess and treat anemia by removing underlying causes and using standard measures for chronic kidney disease (not graded) [1]\n\u2022 treat neutropenia and thrombocytopenia by treating underlying causes whenever possible (not graded) [1] [Cytopenia page](#/tree/transplant-patient-ed/node/tpe-cytopenia)\n\u2022 EBV: recommend reduction or cessation of immunosuppression in patients with EBV disease, including PTLD (1C) (call the transplant team first) [1]\n\u2022 suggest adult recipients do skin and lip self-examinations and report new lesions to a health-care provider (2D) [1]\n\u2022 Not in KDIGO 2009: stress-dose steroids or adrenal insufficiency. Nearest: for acute cellular rejection, suggest adding or restoring maintenance prednisone in patients not on steroids (2D) (call the transplant team first) [1]\n[Details](#/info/tpe-kidney-chronic-detail)\nRelated consults: [Adrenal Insufficiency](#/tree/adrenal-insufficiency/node/ai-start) (steroid crisis); [Hypertensive Emergency (Adult)](#/tree/hypertensive-emergency-adult/node/hypertensive-emergency-adult-start) (severe hypertension).",
    citation: [1],
    calculatorLinks: [
      {"id": "adrenal-insufficiency", "label": "Adrenal Insufficiency: steroid crisis", "kind": "tree", "node": "ai-start"},
      {"id": "hypertensive-emergency-adult", "label": "Hypertensive Emergency (Adult): severe hypertension", "kind": "tree", "node": "hypertensive-emergency-adult-start"},
    ],
    next: "tpe-kidney-dispo",
  },
  {
    id: "tpe-kidney-dispo",
    type: "result",
    module: 0,
    title: "Disposition: kidney transplant recipient",
    safetyLevel: "warning",
    confidence: "consider",
    summary: "KDIGO 2009, kidney recipients: allograft pyelonephritis: suggest initial hospitalization (2C); systemic HSV: hospitalization warranted (rationale); creatinine not back to baseline after rejection treatment: suggest biopsy (2D).",
    body: "\nKDIGO 2009, kidney recipients:\n\u2022 for allograft pyelonephritis, suggest initial hospitalization and treatment with intravenous antibiotics (2C) [1]\n\u2022 for systemic HSV, hospitalization and intravenous acyclovir are warranted (rationale); immunosuppression should be reduced or withdrawn if possible until infection resolves (rationale) (call the transplant team first) [1]\n\u2022 suggest biopsy when creatinine has not returned to baseline after treatment of acute rejection (2D) [1]\n\u2022 Not in KDIGO 2009: admission or discharge criteria in general. Nearest: allograft pyelonephritis may bring bacteremia, metastatic spread, impaired graft function and even death (rationale) [1]\n\u2022 App content: the Adult UTI consult's pyelonephritis default is outpatient treatment if tolerating oral intake, not septic, not pregnant, no significant comorbidities, reliable follow-up; its inpatient list names immunocompromised patients.\nRelated consults: [Sepsis](#/tree/sepsis/node/sepsis-start) (fever, shock); [Hemodialysis Emergencies](#/tree/hd-emergencies/node/hd-start) (dialysis problems); [Potassium](#/tree/potassium/node/k-start) (high potassium).\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**KDIGO 2009, kidney recipients: initial hospitalization is suggested for allograft pyelonephritis (2C) and warranted for systemic HSV (rationale); admission criteria in general are not in KDIGO 2009.** Editor note: disposition is decided with the treating transplant team.",
    citation: [1],
    calculatorLinks: [
      {"id": "sepsis", "label": "Sepsis: fever, shock", "kind": "tree", "node": "sepsis-start"},
      {"id": "hd-emergencies", "label": "Hemodialysis Emergencies: dialysis problems", "kind": "tree", "node": "hd-start"},
      {"id": "potassium", "label": "Potassium: high potassium", "kind": "tree", "node": "k-start"},
    ],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "Kidney Disease: Improving Global Outcomes (KDIGO) Transplant Work Group. KDIGO clinical practice guideline for the care of kidney transplant recipients. Am J Transplant 2009;9(Suppl 3):S1-S155. Cited by recommendation number or section, with the printed page (S6-S111). Based on information available as of March 2009." },
  { num: 2, text: "PROGRAF (tacrolimus) capsules, injection and granules for oral suspension. FDA prescribing information, SPL version 30. DailyMed page revised 8/2023; SPL effective 2023-08-25. Setid 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. Cited by section number." },
  { num: 3, text: "ASTAGRAF XL (tacrolimus extended-release capsules). FDA prescribing information. DailyMed page revised 8/2023. Setid 550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e. Cited by section number." },
  { num: 4, text: "ENVARSUS XR (tacrolimus extended-release tablets). FDA prescribing information. DailyMed page revised 4/2024. Setid de2315b0-6344-43ac-9aea-3e3b68d828e7. Cited by section number." },
  { num: 5, text: "Kotton CN, Kamar N, Wojciechowski D, et al. The Second International Consensus Guidelines on the Management of BK Polyomavirus in Kidney Transplantation. Transplantation 2024;108(9):1834-1866." },
  { num: 6, text: "Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. The Transplantation Society, 2025 (PMC12180710)." },
  { num: 8, text: "Te H, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and management of non-graft-related complications. Liver Transpl 2025 (LVT0785); Question 15." },
  { num: 7, text: "NEORAL, GENGRAF and SANDIMMUNE (cyclosporine). FDA prescribing information (older format, cited by heading). Setids 94461af3-11f1-4670-95d4-2965b9538ae3, e896cbfe-4745-4088-82a3-8dc10b75c41f, 5e5926a7-1de0-4b54-a5c0-286b6200ff82." },
];
