// myMedKitt - Transplant Patient in the ED: liver transplant recipient page (DRAFT for the assembler).
// Tree id transplant-patient-ed, node prefix tpe-. Module numbers are 0 for the assembler to set.
// Sources: [1] AASLD/AST graft-related complications guideline; [2] AASLD/AST non-graft-related complications guideline.
// Node bodies are short bedside rules; verified detail lives in the info pages tpe-liver-*.info.ts (links are #/info/<id>).
// Tiers: GUIDELINE sentences carry a [n] citation; lines starting "Editor note:" are NOT from a source and await owner approval.
// No review-paper tier is present. No doses on this page by design (team-owned treatments).

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-liver" },
  { text: "Hepatic artery or portal vein stenosis or thrombosis: manage in a timely fashion, particularly urgent when the hepatic artery is involved (Strong, Level 4).", nodeId: "tpe-liver-vascular" },
  { text: "Contrast-enhanced CT angiography or venography provides more detail when a vascular abnormality is suspected or Doppler findings are inconclusive.", nodeId: "tpe-liver-vascular" },
  { text: "Unexplained graft dysfunction with thrombocytopenia and hypocomplementemia: suspect acute antibody-mediated rejection; obtain donor-specific antibodies and biopsy with C4d staining (Strong, Level 3).", nodeId: "tpe-liver-rejection" },
  { text: "Donor-derived infection should be suspected in all early post-transplant infections, particularly an unusual pathogen or atypical course (typically first month).", nodeId: "tpe-liver" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-liver",
    type: "question",
    module: 0,
    title: "Liver transplant recipient with a possible graft problem",
    safetyLevel: "warning",
    body: "**RULE**\n\u2022 Question 16 concerns peripheral blood biomarkers developed as a noninvasive alternative to liver biopsy: peripheral blood biomarkers alone should not be used to diagnose or exclude T-cell-mediated rejection and other forms of allograft injury (Strong, Level 4). [1]\n\u2022 Protocol liver biopsy is not recommended in the routine management of stable adult liver transplant recipients (Strong, Level 4). [1]\n\u2022 Not in the guideline: a stepwise approach to an abnormal liver test in a recipient, or a threshold that should trigger urgent action. [1]\n\n**INFECTION**\n\u2022 Donor-derived infection should be suspected in all early post-transplant infections (typically the first month), particularly with an unusual pathogen or atypical course, including unexplained fever, hepatitis or altered mental status. [2]\n\n**CALL**\n\u2022 Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\n**INTERACTIONS**\nApp content: the Sepsis consult's pneumonia regimen offers azithromycin as one atypical-coverage option.\n\u2022 Table 4 lists macrolide antibiotics among the drugs that raise calcineurin inhibitor levels. [1]\nRelated consults: [Sepsis](#/tree/sepsis) (fever, infection); [Altered mental status hub](#/tree/altered-mental-status-hub) (confusion); [Acute jaundice hub](#/tree/acute-jaundice-hub) (native liver); [Hepatitis](#/tree/hepatitis) (native liver); [CMV page](#/tree/transplant-patient-ed/node/tpe-cmv) (viral infection).\nDetail: [recognition detail](#/info/tpe-liver-recognition-detail).",
    summary: "Liver recipients (AASLD/AST 2025): donor-derived infection should be suspected in all early post-transplant infections (typically the first month), particularly with an unusual pathogen or atypical course.",
    options: [
      { label: "Vascular complications: hepatic artery, portal vein, outflow", next: "tpe-liver-vascular", urgency: "urgent" },
      { label: "Biliary complications and cholangitis", next: "tpe-liver-biliary" },
      { label: "Rejection and graft dysfunction", next: "tpe-liver-rejection" },
      { label: "Immunosuppression and interactions", next: "tpe-liver-drugs" },
      { label: "Chronic problems: kidney, hernia, cancer, PTLD", next: "tpe-liver-chronic" },
      { label: "Disposition and who to call", next: "tpe-liver-disposition" },
    ],
    calculatorLinks: [
      { id: "sepsis", label: "Sepsis", kind: 'tree' },
      { id: "altered-mental-status-hub", label: "Altered mental status hub", kind: 'tree' },
      { id: "acute-jaundice-hub", label: "Acute jaundice hub", kind: 'tree' },
      { id: "hepatitis", label: "Hepatitis", kind: 'tree' },
      { id: "transplant-patient-ed", label: "CMV page", kind: 'tree', node: "tpe-cmv" },
    ],
    citation: [1, 2],
  },
  {
    id: "tpe-liver-vascular",
    type: "info",
    module: 0,
    title: "Vascular complications: hepatic artery, portal vein, outflow",
    safetyLevel: "critical",
    body: "**RULE**\n\u2022 Hepatic artery or portal vein stenosis or thrombosis should be managed in a timely fashion, which is particularly urgent when the hepatic artery is involved (Strong, Level 4). [1]\n\u2022 Doppler ultrasound is widely used as a screening tool to assess the liver graft vessels in the immediate postoperative period. [1]\n\u2022 Contrast-enhanced CT angiography or venography gives more detail when a vascular abnormality is suspected or when Doppler findings are inconclusive; MRI can be used as an alternative when contrast-enhanced CT is contraindicated. [1]\n\u2022 When early hepatic artery thrombosis (within 5 days of transplant) leads to progressive liver failure, urgent re-transplantation is needed. [1]\n\u2022 For stenosis or thrombosis: surgical or percutaneous endovascular intervention and anticoagulation should be considered for cases detected in the immediate postoperative period, and percutaneous endovascular intervention and/or anticoagulation for diagnoses made later (Strong, Level 4); the choice of intervention is mainly driven by center practice and the condition of the patient. [1]\n\u2022 Editor note: name suspected vascular compromise to the transplant team at the first call.\nRelated consults: [GI bleed hub](#/tree/gi-bleed-hub) (variceal bleeding); [Paracentesis](#/tree/paracentesis) (ascites).\nDetail: [vascular detail](#/info/tpe-liver-vascular-detail).",
    summary: "Liver recipients (AASLD/AST 2025): hepatic artery or portal vein stenosis or thrombosis: timely management, particularly urgent for the hepatic artery (Strong, 4); CT angiography if suspected or Doppler inconclusive.",
    next: "tpe-liver-disposition",
    calculatorLinks: [
      { id: "gi-bleed-hub", label: "GI bleed hub", kind: 'tree' },
      { id: "paracentesis", label: "Paracentesis", kind: 'tree' },
      { id: "altered-mental-status-hub", label: "Altered mental status hub", kind: 'tree' },
    ],
    citation: [1],
  },
  {
    id: "tpe-liver-biliary",
    type: "info",
    module: 0,
    title: "Biliary complications and cholangitis",
    safetyLevel: "warning",
    body: "**RULE**\n\u2022 MRCP should be used as the first-line diagnostic tool for anastomotic and non-anastomotic biliary strictures in adult liver transplant recipients (Strong, Level 2). [1]\n\u2022 An ERCP can be pursued, without a preceding MRCP or following a negative MRCP, when there is high clinical suspicion for biliary pathology or for the need of endoscopic intervention (Weak, Level 5). [1]\n\u2022 Duct-to-duct or choledochoduodenostomy anastomosis: endoscopic characterization, balloon dilation and stenting are first-line for anastomotic strictures (Strong, Level 2). [1]\n\u2022 Roux-en-Y choledochojejunostomy: either endoscopic stents or percutaneous transhepatic biliary drains, depending on the center's expertise (Strong, Level 3). [1]\n\u2022 Percutaneous transhepatic biliary drains should be reserved for strictures that have failed endoscopic management (Strong, Level 3). [1]\n\u2022 Percutaneous transhepatic biliary drain placement may be appropriate in patients with surgically altered foregut anatomy, such as a Roux-en-Y gastrojejunostomy, or who are critically ill with hemodynamic instability. [1]\n\u2022 Not in the guideline: timing, work-up or management for bile leak, or a cholangitis work-up. [1]\n\u2022 Table 2 names bile leak as a presentation of hepatic artery thrombosis. [1]\n\n**MORE**\nRelated consults: [Biliary pathology](#/tree/gallbladder/node/gb-cholangitis-severity) (cholangitis severity).\nDetail: [biliary detail](#/info/tpe-liver-biliary-detail).",
    summary: "Liver recipients (AASLD/AST 2025): MRCP should be first-line for biliary strictures (Strong, 2); ERCP may be pursued without it if suspicion or need for endoscopic intervention is high (Weak, 5).",
    next: "tpe-liver-disposition",
    calculatorLinks: [
      { id: "gallbladder", label: "Biliary pathology: cholangitis severity", kind: 'tree', node: "gb-cholangitis-severity" },
      { id: "sepsis", label: "Sepsis", kind: 'tree' },
    ],
    citation: [1],
  },
  {
    id: "tpe-liver-rejection",
    type: "info",
    module: 0,
    title: "Rejection and graft dysfunction",
    safetyLevel: "warning",
    body: "**RULE**\n\u2022 Acute antibody-mediated rejection should be suspected in a recipient with unexplained graft dysfunction, thrombocytopenia and hypocomplementemia; donor-specific antibody testing and liver biopsy should be obtained with C4d staining (Strong, Level 3). [1]\n\u2022 The guideline defines T-cell-mediated rejection by biopsy features; not in the guideline: a symptom list or liver-test pattern for it. [1]\n\u2022 Suboptimal immunosuppression and non-adherence increase the risk of developing de novo donor-specific antibodies. [1]\nTreatment statements by type are on the detail page; no doses are given here.\n\n**MORE**\nRelated consults: [Acute jaundice hub](#/tree/acute-jaundice-hub) (native liver); [Hepatitis](#/tree/hepatitis) (native liver).\nDetail: [rejection detail](#/info/tpe-liver-rejection-detail).",
    summary: "Liver recipients (AASLD/AST 2025): suspect acute antibody-mediated rejection with unexplained graft dysfunction, thrombocytopenia and hypocomplementemia; donor-specific antibody testing and biopsy with C4d staining should be obtained.",
    next: "tpe-liver-disposition",
    calculatorLinks: [
      { id: "acute-jaundice-hub", label: "Acute jaundice hub", kind: 'tree' },
      { id: "hepatitis", label: "Hepatitis", kind: 'tree' },
    ],
    citation: [1],
  },
  {
    id: "tpe-liver-drugs",
    type: "info",
    module: 0,
    title: "Immunosuppression and interactions",
    safetyLevel: "warning",
    body: "**RULE**\n\u2022 Dosing and target trough levels vary at the discretion of the transplant professional (Table 4 footnote a). [1]\n\u2022 Table 4 lists drugs that raise calcineurin inhibitor levels (including macrolide antibiotics, azole antifungals, proton pump inhibitors) and drugs that lower them (including anticonvulsants, St. John's wort). [1]\nSources differ on tacrolimus troughs and on calcium channel blockers: [immunosuppression detail](#/info/tpe-liver-immunosuppression).\n\u2022 Not in the guideline: a tacrolimus toxicity threshold, advice on a missed dose, vomiting or nothing by mouth, or advice on whether to hold immunosuppression in sepsis or any other emergency. [1]\n\u2022 For elective surgery, a transplant professional should be involved in the management of immunosuppression before and after surgery (Strong, Level 5); the guideline's surgery advice is for elective surgery, not emergencies. [2]\n\n**MORE**\nRelated consults: [Sepsis](#/tree/sepsis) (fever, infection); [GI bleed hub](#/tree/gi-bleed-hub) (PPI use); [Biliary pathology](#/tree/gallbladder/node/gb-cholangitis-severity) (aminoglycoside use).",
    summary: "Liver recipients (AASLD/AST 2025): Table 4: macrolides, azoles, PPIs raise calcineurin inhibitor levels; anticonvulsants, St. John's wort lower them; sources differ on trough figures.",
    next: "tpe-liver-disposition",
    calculatorLinks: [
      { id: "sepsis", label: "Sepsis", kind: 'tree' },
      { id: "gi-bleed-hub", label: "GI bleed hub", kind: 'tree' },
      { id: "gallbladder", label: "Biliary pathology: cholangitis severity", kind: 'tree', node: "gb-cholangitis-severity" },
    ],
    citation: [1, 2],
  },
  {
    id: "tpe-liver-chronic",
    type: "info",
    module: 0,
    title: "Chronic problems: kidney, hernia, cancer, PTLD",
    body: "**HERNIA AND PTLD**\n\u2022 Incisional hernia can present with severe pain and bowel obstruction when abdominal contents become incarcerated and/or strangulated; it can also present as an asymptomatic bulge or with vague abdominal pain and/or fullness. [2]\n\u2022 PTLD presentation is often nonspecific, with no or vague symptoms such as fevers, night sweats or weight loss; imaging may show bulky lymphadenopathy, and biopsy confirms the diagnosis. [2]\n\n**KIDNEY**\n\u2022 Proteinuria may be absent even with advanced kidney disease because of the antiproteinuric effect of calcineurin inhibitors. [2]\n\u2022 Table 4 lists nephrotoxicity, electrolyte disorders, neurotoxicity and hypertension among calcineurin inhibitor side effects. [1]\n\u2022 Not in the guideline: symptoms, levels or management for neurotoxicity, hyperkalemia or magnesium disorders. [1]\n\n**STEROIDS**\n\u2022 Not in the guideline: stress-dose steroid or adrenal insufficiency advice. [1]\n\u2022 Corticosteroids are among the maintenance agents (Table 4). [1]\n\n**MORE**\nRelated consults: [Potassium](#/tree/potassium) (high potassium); [Adrenal insufficiency](#/tree/adrenal-insufficiency) (steroid use); [Abdominal pain hub](#/tree/abdominal-pain-hub) (abdominal pain).\nDetail: [late-problems detail](#/info/tpe-liver-chronic-detail).",
    summary: "Liver recipients (AASLD/AST 2025): incisional hernia can present with severe pain and bowel obstruction when contents are incarcerated or strangulated; PTLD presentation is often nonspecific.",
    next: "tpe-liver-disposition",
    calculatorLinks: [
      { id: "potassium", label: "Potassium", kind: 'tree' },
      { id: "adrenal-insufficiency", label: "Adrenal insufficiency", kind: 'tree' },
      { id: "abdominal-pain-hub", label: "Abdominal pain hub", kind: 'tree' },
    ],
    citation: [1, 2],
  },
  {
    id: "tpe-liver-disposition",
    type: "result",
    module: 0,
    title: "Disposition: who to call, what the guideline leaves open",
    body: "**NEAREST STATEMENTS**\n\u2022 Not in the guideline: an emergency-department section, or a statement of when a non-transplant clinician should call or transfer to the transplant center. [1]\n\u2022 Hepatic artery or portal vein stenosis or thrombosis should be managed in a timely fashion, which is particularly urgent when the hepatic artery is involved (Strong, Level 4). [1]\n\u2022 Suspected donor-derived infection must be reported by the organ procurement organization and/or the transplant center within 24 hours (Strong, Level 5). [2]\n\u2022 Recipients should not use herbal and dietary supplements without discussing them with their transplant providers (Strong, Level 4). [2]\nRelated consults: [CMV page](#/tree/transplant-patient-ed/node/tpe-cmv) (viral infection).\nDetail: [disposition detail](#/info/tpe-liver-disposition-detail).\n\n**CALL**\nEditor note: disposition is decided with the treating transplant team.",
    summary: "Liver recipients (AASLD/AST 2025): not in the guideline: an emergency or disposition section; nearest statement: vascular stenosis or thrombosis should be managed in a timely fashion.",
    recommendation: "The guideline has no emergency or disposition section; its closest statements are listed above. Editor note: disposition is decided with the treating transplant team.",
    confidence: 'consider',
    calculatorLinks: [
      { id: "transplant-patient-ed", label: "CMV page", kind: 'tree', node: "tpe-cmv" },
    ],
    citation: [1, 2],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "Te H, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and management of graft-related complications. Liver Transpl. 2026;32(3):444-490 (online 2025-08-22). doi:10.1097/LVT.0000000000000715. https://doi.org/10.1097/LVT.0000000000000715" },
  { num: 2, text: "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications. Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785. https://doi.org/10.1097/LVT.0000000000000785" },
];
