// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-).
// Page A (principal-review fix round, 2026-11-20): calcineurin inhibitor (tacrolimus, cyclosporine) toxicity, drug levels and interactions, as a hub. Entry node: tpe-cni-toxicity.
// 10 nodes: hub, brain, seizure, lytes, kidney, tma, overdose, drugs (merged interactions), level, dispo. PRES and TMA were folded in on 2026-11-20.
// Reference material lives in five info pages: tpe-cni-targets, tpe-cni-interactions, tpe-cni-detail, tpe-cni-brain-detail, tpe-cni-tma-detail (register them in the info-page registry).
// Every clinical sentence is SOURCED ([n]; grades only where printed) or begins "Editor note:" / "PROPOSED Editor note:" (not yet approved by the owner) or "App content:" (names the consult only; file, line and search evidence are in the ledger).
// Summaries: 30 words or fewer, no quotation marks. Any sentence naming reduction, holding, stopping, withdrawal or substitution of an immunosuppressant in a summary or critical action carries "(call the transplant team first)".
// Module numbers are 0 for the assembler. Ledger: drafts/tpe-cni-toxicity.ledger.md

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-cni-toxicity" },
  { text: "Neurotoxicity: tacrolimus labels say monitor for neurologic symptoms and consider dosage reduction or discontinuation (call the transplant team first).", nodeId: "tpe-cni-brain" },
  { text: "Editor note: run the Status Epilepticus consult's first-line treatment unchanged; before a second-line agent, check it against the list on this page; tell the transplant team which agent was given.", nodeId: "tpe-cni-seizure" },
  { text: "ISHLT heart 2023 (narrative), ongoing antiepileptic choice: in general avoid phenytoin, phenobarbital, carbamazepine, valproic acid; fosphenytoin with caution.", nodeId: "tpe-cni-seizure" },
  { text: "Monitor serum potassium (tacrolimus labels); with low potassium, calcium or magnesium, consider an ECG and electrolyte monitoring.", nodeId: "tpe-cni-lytes" },
  { text: "Raised creatinine with trough above range: tacrolimus labels say consider dosage reduction or temporary interruption (call the transplant team first).", nodeId: "tpe-cni-kidney" },
  { text: "Editor note: involve a poison centre or a medical toxicologist and the transplant team.", nodeId: "tpe-cni-overdose" },
  { text: "Strong CYP3A inhibitor started (e.g., clarithromycin, voriconazole): tacrolimus labels say reduce the tacrolimus dose, trough within 1-3 days (call the transplant team first).", nodeId: "tpe-cni-drugs" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-cni-toxicity",
    type: "question",
    module: 0,
    title: "Transplant patient on tacrolimus or cyclosporine: possible drug toxicity",
    safetyLevel: "warning",
    summary: "Tacrolimus labels: for neurotoxicity, or raised creatinine with a trough above range, consider dosage reduction (call the transplant team first). Not in the sources used: one toxic level.",
    body: "\n\u2022 Tacrolimus labels: with a raised creatinine and a trough \"greater than the recommended range\", \"consider dosage reduction or temporary interruption of tacrolimus administration\"; for neurotoxicity (PRES, delirium, seizure, coma), \"consider dosage reduction or discontinuation\" (call the transplant team first). [1,2,3]\n\u2022 Also named: hyperkalemia, hypertension, thrombotic microangiopathy (see the TMA node); diabetes (tacrolimus labels: new-onset diabetes; liver guideline: \"diabetes (more with TAC)\"; Neoral: hyperglycemia in 2% or less); QT prolongation with torsades (tacrolimus labels only); low magnesium (tacrolimus adverse reactions; cyclosporine convulsions). [1,4,9]\n\u2022 Not in the labels or guidelines used: one toxic level. The consensus says a single target range cannot be recommended, and the level cautions are organ specific ([target ranges](#/info/tpe-cni-targets)). [7]\n\u2022 The tacrolimus Medication Guides (Prograf, Astagraf XL, Envarsus XR; \"How should I take ...?\") say: \"Do not stop taking or change your dose of [the drug] without talking to your healthcare provider.\" [1,2,3]\n\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\nEditor note: ask which calcineurin inhibitor product the patient takes and how to reach the transplant centre.",
    citation: [1, 2, 3, 4, 7, 9],
    options: [
      {"label": "Neurotoxicity: PRES, delirium", "description": "Labels and heart guideline", "next": "tpe-cni-brain", "urgency": "critical"},
      {"label": "Seizure and antiepileptic drugs", "description": "Heart guideline, labels, Status Epilepticus consult", "next": "tpe-cni-seizure", "urgency": "critical"},
      {"label": "Potassium, magnesium, QT", "description": "Hyperkalemia, low magnesium, torsades", "next": "tpe-cni-lytes", "urgency": "critical"},
      {"label": "Kidney injury; toxicity versus rejection", "description": "Tacrolimus and cyclosporine labels", "next": "tpe-cni-kidney", "urgency": "urgent"},
      {"label": "Thrombotic microangiopathy", "description": "Tacrolimus and cyclosporine labels", "next": "tpe-cni-tma", "urgency": "urgent"},
      {"label": "Overdose", "description": "Dialysis, charcoal, supportive care", "next": "tpe-cni-overdose", "urgency": "urgent"},
      {"label": "Before you give a drug", "description": "Interactions, diarrhea", "next": "tpe-cni-drugs"},
      {"label": "Reading a level", "description": "Trough, assays, missed dose", "next": "tpe-cni-level"},
    ],
  },
  {
    id: "tpe-cni-brain",
    type: "info",
    module: 0,
    title: "Neurotoxicity: PRES, delirium",
    safetyLevel: "warning",
    summary: "Tacrolimus labels, neurotoxicity: consider dosage reduction or discontinuation; heart recipients, PRES: gradual blood pressure reduction, CNI reduction or withdrawal, alternate immunosuppressant or CNI (call the transplant team first).",
    body: "\n\u2022 Tacrolimus labels: \"monitor for neurologic symptoms and consider dosage reduction or discontinuation\" if neurotoxicity occurs (call the transplant team first). [1,2,3]\n\u2022 Heart recipients (ISHLT, Class I, C): PRES \"should be managed with gradual blood pressure reduction and withdrawal or reduction of CNI along with substitution for an alternate immunosuppressive agent or an alternate CNI\" (call the transplant team first). [8]\n\u2022 Cyclosporine labels (PRES described): \"The changes in most cases have been reversible upon discontinuation of cyclosporine\"; no instruction is printed. [4,5,6]\n\u2022 Not in the labels or guidelines used: diagnostic criteria or an imaging protocol for PRES. Nearest fact (heart recipients): late encephalopathy \"should prompt neurological consultation and imaging\" (2010 text, Class I, C; continued without change in 2023). [8]\n\u2022 App content: the Hypertensive Emergency (Adult) consult lists nicardipine; no transplant text.\n\u2022 Tacrolimus labels: with calcium-channel blockers, monitor the trough ([blood pressure page](#/tree/transplant-patient-ed/node/tpe-cni-hypertension)).\n\nEditor note: use the Hypertensive Emergency (Adult) consult unchanged; tell the transplant team which agent was started; the drug level is rechecked afterwards. [Hypertensive Emergency (Adult)](#/tree/hypertensive-emergency-adult/node/hypertensive-emergency-adult-agent-by-organ).\n\nRelated consults: [Altered Mental Status hub](#/tree/altered-mental-status-hub) (work-up); [High blood pressure page](#/tree/transplant-patient-ed/node/tpe-cni-hypertension); [detail](#/info/tpe-cni-brain-detail).",
    citation: [1, 2, 3, 4, 5, 6, 8],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-seizure",
    type: "info",
    module: 0,
    title: "Seizures and antiepileptic drugs in a transplant recipient",
    safetyLevel: "warning",
    summary: "Active seizure: Status Epilepticus consult (editor note). Heart recipients (ISHLT), new-onset seizure not from stroke or structural disease: CNI dose reduction, correct low magnesium (call the transplant team first).",
    body: "\n\u2022 Heart recipients (ISHLT, Class I, C): new-onset seizures not due to stroke or structural brain disease, management \"should include reduction of CNI doses (taking into consideration the risk of inadequate immunosuppression) and correction of hypomagnesemia, if present\" (call the transplant team first). [8]\n\u2022 Heart recipients (ISHLT, Class IIb, C): seizures continuing after CNI dose reduction \"may benefit from CNI withdrawal and substitution with a PSI\" (call the transplant team first). [8]\n\u2022 ISHLT narrative, ongoing choice in epilepsy or antiepileptic therapy (drug interactions, not stopping a seizure): \"In general, phenytoin, phenobarbital, carbamazepine, and valproic acid should be avoided and fosphenytoin should be used with caution\". No ISHLT seizure statement names benzodiazepines or levetiracetam. [8]\n\u2022 Not in the labels or guidelines used: an acceptable antiepileptic. Nearest fact (candidates with epilepsy, Class IIa, C): balance seizure efficacy and immunosuppression interactions. [8]\n\u2022 App content: Status Epilepticus consult second-line agents: levetiracetam, fosphenytoin, valproate; phenobarbital if unavailable.\n\nEditor note: run the Status Epilepticus consult's first-line treatment unchanged; before a second-line agent, check it against the list on this page; tell the transplant team which agent was given. [Status Epilepticus](#/tree/status-epilepticus/node/se-2nd-line-choice).",
    citation: [8],
    calculatorLinks: [
      {"id": "status-epilepticus", "label": "Status epilepticus: second-line choice", "kind": "tree", "node": "se-2nd-line-choice"},
    ],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-lytes",
    type: "info",
    module: 0,
    title: "Potassium, magnesium and QT",
    safetyLevel: "warning",
    summary: "Tacrolimus labels: monitor serum potassium; with heart failure, bradyarrhythmias, QT-prolonging drugs or low potassium, calcium or magnesium, consider ECGs and electrolyte monitoring.",
    body: "\n\u2022 Hyperkalemia is reported with both drugs: tacrolimus labels say to monitor serum potassium; cyclosporine labels: \"Significant hyperkalemia (sometimes associated with hyperchloremic metabolic acidosis)\". [1,2,3,4,5,6]\n\u2022 Potassium (tacrolimus labels): Prograf asks for \"careful consideration\" before potassium-sparing diuretics, ACE inhibitors, ARBs; Astagraf XL and Envarsus XR say such agents \"may increase the risk for hyperkalemia\". [1,2,3]\n\u2022 Tacrolimus labels: QT prolongation and torsades (Prograf: \"may cause\"; Astagraf XL and Envarsus XR: \"cause\"); \"Avoid PROGRAF in patients with congenital long QT syndrome\" (Astagraf XL and Envarsus XR say the same of their products); with hypokalemia, hypocalcemia or hypomagnesemia, \"consider obtaining electrocardiograms and monitoring electrolytes (magnesium, potassium, calcium)\". The cyclosporine labels carry no QT statement. [1,2,3]\n\u2022 Cyclosporine labels: \"Hypomagnesemia has been reported in some, but not all, patients exhibiting convulsions while on cyclosporine therapy\". [4,5,6]\n\u2022 Not in the labels or guidelines used: a potassium or magnesium level to act on, or a replacement. Nearest facts: the monitoring statements above.\n\nRelated consults: [Potassium](#/tree/potassium/node/k-hyper-ecg), [Torsades de pointes](#/tree/torsades-de-pointes/node/tdp-acquired), [Magnesium disorders](#/tree/magnesium-disorders/node/mg-hypo-workup).",
    citation: [1, 2, 3, 4, 5, 6],
    calculatorLinks: [
      {"id": "potassium", "label": "Potassium: ECG and treatment", "kind": "tree", "node": "k-hyper-ecg"},
      {"id": "torsades-de-pointes", "label": "Torsades de pointes: acquired QT prolongation", "kind": "tree", "node": "tdp-acquired"},
      {"id": "magnesium-disorders", "label": "Magnesium disorders: hypomagnesemia work-up", "kind": "tree", "node": "mg-hypo-workup"},
    ],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-kidney",
    type: "info",
    module: 0,
    title: "Kidney injury; toxicity versus rejection",
    safetyLevel: "warning",
    summary: "Tacrolimus labels: raised creatinine with trough above range, consider dosage reduction or temporary interruption (call the transplant team first). Cyclosporine labels, kidney graft: no criteria reliably separate toxicity from rejection.",
    body: "\n\u2022 Label action: \"In patients with elevated serum creatinine and tacrolimus whole blood trough concentrations greater than the recommended range, consider dosage reduction or temporary interruption of tacrolimus administration.\" (call the transplant team first). [1,2,3]\n\u2022 Tacrolimus labels: acute kidney impairment from tacrolimus toxicity \"can result in high serum creatinine, hyperkalemia, decreased secretion of urea and hyperuricemia, and is usually reversible\". [1,2,3]\n\u2022 Kidney-toxic drugs (tacrolimus labels): aminoglycosides, ganciclovir, amphotericin B; monitor renal function and tacrolimus concentrations. [1,2,3]\n\u2022 Kidney graft only, cyclosporine labels: \"specific diagnostic criteria which reliably differentiate renal graft rejection from drug toxicity have not been found\". [4,5,6]\n\u2022 Consensus: in the first months after kidney transplantation, as the prednisolone dose is tapered, \"a rise in serum creatinine as a result of increasing tacrolimus concentrations may be misinterpreted as a rejection\". [7]\n\nEditor note: tell the transplant team the creatinine trend, the drug level and the time of the last dose together.\n\nLabel table and detail: [kidney, brain and electrolyte detail](#/info/tpe-cni-detail). [BK](#/tree/transplant-patient-ed/node/tpe-bk); [liver graft](#/tree/transplant-patient-ed/node/tpe-liver-rejection).",
    citation: [1, 2, 3, 4, 5, 6, 7],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-tma",
    type: "info",
    module: 0,
    title: "Thrombotic microangiopathy on a calcineurin inhibitor",
    safetyLevel: "warning",
    summary: "Tacrolimus labels: with signs and symptoms of TMA, consider tacrolimus a risk factor. Cyclosporine labels: management of this thrombocytopenia and microangiopathic hemolytic anemia syndrome is unclear.",
    body: "\n\u2022 Tacrolimus labels (Prograf, Astagraf XL; Envarsus XR names itself): \"In patients with signs and symptoms of TMA, consider tacrolimus as a risk factor\". Risk factors include, for example, severe infections, GVHD, HLA mismatch, calcineurin and mTOR inhibitors. Prograf only (5.10): sirolimus \"may increase the risk of thrombotic microangiopathy\". [1,2,3]\n\u2022 Cyclosporine labels: a syndrome of thrombocytopenia and microangiopathic hemolytic anemia \"which may result in graft failure\"; \"Neither the pathogenesis nor the management of this syndrome is clear.\" [4,5,6]\n\u2022 Not in the labels or guidelines used: a treatment protocol, or a way to tell TMA from TTP, HUS or DIC in a recipient. Nearest fact: tacrolimus labels say TMA, including HUS and TTP, has been reported.\n\u2022 App content: the Hemolytic Anemia consult lists calcineurin inhibitors among causes of drug-induced TMA and has no transplant text.\n\nRelated consults: [TTP](#/tree/ttp) (work-up), [Thrombocytopenia](#/tree/thrombocytopenia) (platelets), [Hemolytic anemia](#/tree/hemolytic-anemia/node/hemolytic-anemia-tma) (hemolysis); [detail](#/info/tpe-cni-tma-detail).",
    citation: [1, 2, 3, 4, 5, 6],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-overdose",
    type: "info",
    module: 0,
    title: "Overdose",
    safetyLevel: "warning",
    summary: "Tacrolimus labels: not dialyzable to any significant extent; charcoal not recommended for lack of experience; general supportive measures. Sandimmune label: consider contacting the Poison Help line.",
    body: "\n\u2022 Tacrolimus labels: \"not dialyzable to any significant extent\"; activated charcoal \"experience has not been sufficient to warrant recommending its use\"; \"General supportive measures and treatment of specific symptoms\". [1,2,3]\n\u2022 Tacrolimus overdose, Prograf: up to 30 times the intended dose reported, \"Almost all cases have been asymptomatic\"; effects included tremors, abnormal renal function, hypertension, peripheral edema. Astagraf XL and Envarsus XR: tremor, confusional state, encephalopathy, lethargy, raised creatinine, hypertension. [1,2,3]\n\u2022 Cyclosporine: not dialyzable \"to any great extent\" nor cleared well by charcoal hemoperfusion; supportive care; Neoral and Gengraf report oral doses up to 10 g \"tolerated with relatively minor clinical consequences\" (vomiting, drowsiness, headache, tachycardia, in a few reversible renal impairment); Sandimmune says \"associated with\" these effects. [4,5,6]\n\u2022 Not in the labels or guidelines used: an overdose level, a time to repeat a level, an antidote, or whether to hold the next dose (call the transplant team first). Nearest fact, Sandimmune label: \"consider contacting the Poison Help line (1-800-222-1222) or a medical toxicologist\". [6]\n\nEditor note: involve a poison centre or a medical toxicologist and the transplant team.",
    citation: [1, 2, 3, 4, 5, 6],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-drugs",
    type: "info",
    module: 0,
    title: "Before you give a drug: what raises or lowers the level",
    safetyLevel: "warning",
    summary: "Strong CYP3A inhibitor started: tacrolimus labels say reduce the tacrolimus dose and check a trough within 1-3 days (call the transplant team first).",
    body: "\n\u2022 Tacrolimus labels, strong inhibitors (e.g., clarithromycin, voriconazole, ritonavir): reduce the tacrolimus dose, first trough \"within 1-3 days\" (call the transplant team first). Mild or moderate (calcium-channel blockers): monitor the trough, reduce the tacrolimus dose if needed. Consensus: immediate reduction for triazoles. [1,2,3,7]\n\u2022 Macrolides: tacrolimus labels name clarithromycin (strong inhibitor) and erythromycin (Prograf, Envarsus XR); cyclosporine labels name azithromycin, clarithromycin, erythromycin. Azithromycin is named in no tacrolimus label. [1,2,3,4,5,6]\n\u2022 Lowering (tacrolimus labels): phenytoin, carbamazepine, phenobarbital, rifampin, rifabutin; increase the tacrolimus dose, monitor troughs. [1,2,3]\n\u2022 Kidney: aminoglycosides (tacrolimus labels); NSAIDs \"may potentiate renal dysfunction\", potassium-sparing diuretics \"should not be used\" (cyclosporine labels). [1,2,3,4,5,6]\n\u2022 Diarrhea: \"Temporary elevation of tacrolimus trough concentrations (about 2-fold and more)\" (consensus). [7]\n\u2022 Prograf label: not used simultaneously with cyclosporine; one \"should be discontinued at least 24 hours before initiating the other\" (call the transplant team first). Injection: not with pH 9 or greater solutions (e.g., ganciclovir, acyclovir); observe 30 minutes for anaphylaxis. [1]\n\nEditor note: before adding or stopping any drug, ask the transplant team or a transplant pharmacist whether it changes the immunosuppressant level.\n\n[Full lists](#/info/tpe-cni-interactions)",
    citation: [1, 2, 3, 4, 5, 6, 7],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-level",
    type: "info",
    module: 0,
    title: "Reading a level",
    safetyLevel: "warning",
    summary: "Tacrolimus labels: a level is a whole blood trough drawn immediately before the dose; assays differ. Not in the sources used: reading a non-trough level or a vomited dose.",
    body: "\n\nEditor note: write the time of the last dose and the time of the blood draw on the lab request.\n\u2022 A level is a whole blood trough (C0), a sample drawn \"immediately before dose\", in an EDTA tube. [1,7]\n\u2022 The tacrolimus products are not interchangeable with each other; Neoral and Gengraf are not bioequivalent to Sandimmune and \"cannot be used interchangeably without physician supervision\". [1,2,3,4,5]\n\u2022 Missed dose: Astagraf XL, up to 14 hours after the scheduled time; Envarsus XR, as soon as possible within 15 hours; neither is to be doubled. The Prograf and cyclosporine labels give no missed-dose instruction. [2,3]\n\u2022 Not in the labels or guidelines used: how to interpret a level that is not a trough, or what to do after a vomited dose. Nearest fact: the trough is drawn \"immediately before dose\"; missed-dose windows are above.\n\u2022 IATDMCT consensus 2019: the target depends on the perceived risk of acute rejection, the time after transplantation and the comedication used; Prograf label 2.6: the bias \"may depend upon the specific assay and laboratory\". No range is given here. [1,7]\n\n[Target ranges](#/info/tpe-cni-targets).",
    citation: [1, 2, 3, 4, 5, 7],
    next: "tpe-cni-dispo",
  },
  {
    id: "tpe-cni-dispo",
    type: "result",
    module: 0,
    title: "Disposition when a calcineurin inhibitor may be the problem",
    safetyLevel: "warning",
    confidence: "consider",
    summary: "Tacrolimus labels: for neurotoxicity or raised creatinine with trough above range, consider dosage reduction (call the transplant team first). Astagraf XL, Envarsus XR: re-measure trough after an interacting drug changes.",
    body: "\n\u2022 Tacrolimus labels: with a raised creatinine and a trough \"greater than the recommended range\", \"consider dosage reduction or temporary interruption of tacrolimus administration\"; for neurotoxicity (PRES, delirium, seizure, coma), \"consider dosage reduction or discontinuation\" (call the transplant team first). [1,2,3]\n\u2022 Not in the labels or guidelines used: an admission or discharge rule, a creatinine or level at which to act, or a follow-up interval after an ED visit. Nearest facts follow.\n\u2022 After an interacting drug is started or stopped, or kidney or liver function changes, Astagraf XL and Envarsus XR say to measure the trough again; steady state takes about 7 days. [2,3]\n\u2022 Heart recipients (ISHLT): \"Care must be taken to prevent sub-optimal anti-rejection therapy dosing when CNI is withdrawn or reduced in dose.\" [8]\n\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**Calcineurin inhibitor problem: the tacrolimus labels say to consider dosage reduction or temporary interruption for a raised creatinine with a trough above range, and dosage reduction or discontinuation for neurotoxicity (call the transplant team first); an admission rule is not in the labels or guidelines used.** Editor note: disposition is decided with the treating transplant team.",
    citation: [1, 2, 3, 8],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "PROGRAF (tacrolimus) capsules, injection and granules for oral suspension. FDA prescribing information, SPL version 30. DailyMed page revised 8/2023; SPL effective 2023-08-25 (DailyMed published 2025-03-21). Setid 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. Cited by section number." },
  { num: 2, text: "ASTAGRAF XL (tacrolimus extended-release capsules). FDA prescribing information. DailyMed page revised 8/2023; SPL effective 2026-01-14. Setid 550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e. Cited by section number." },
  { num: 3, text: "ENVARSUS XR (tacrolimus extended-release tablets). FDA prescribing information. DailyMed page revised 4/2024; SPL effective 2025-02-26. Setid de2315b0-6344-43ac-9aea-3e3b68d828e7. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=de2315b0-6344-43ac-9aea-3e3b68d828e7. Cited by section number." },
  { num: 4, text: "NEORAL (cyclosporine capsules and oral solution, USP, MODIFIED). FDA prescribing information (older format, no section numbers; cited by heading). DailyMed page revised September 2023; SPL effective 2026-08-10. Setid 94461af3-11f1-4670-95d4-2965b9538ae3. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=94461af3-11f1-4670-95d4-2965b9538ae3" },
  { num: 5, text: "GENGRAF (cyclosporine capsules, USP [MODIFIED]). FDA prescribing information (older format, cited by heading). DailyMed page revised date not shown; SPL effective 2024-08-21. Setid e896cbfe-4745-4088-82a3-8dc10b75c41f. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e896cbfe-4745-4088-82a3-8dc10b75c41f" },
  { num: 6, text: "SANDIMMUNE (cyclosporine capsules and injection). FDA prescribing information (older format, cited by heading). DailyMed page revised March 2026; SPL effective 2026-07-10. Setid 5e5926a7-1de0-4b54-a5c0-286b6200ff82. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5e5926a7-1de0-4b54-a5c0-286b6200ff82" },
  { num: 7, text: "Brunet M, van Gelder T, Asberg A, Haufroid V, Hesselink DA, Langman L, Lemaitre F, Marquet P, Seger C, Shipkova M, Vinks A, Wallemacq P, Wieland E, Woillard JB, Barten MJ, Budde K, Colom H, Dieterlen MT, Elens L, Johnson-Davis KL, Kunicki PK, MacPhee I, Masuda S, Mathew BS, Millan O, Mizuno T, Moes DAR, Monchaud C, Noceti O, Pawinski T, Picard N, van Schaik R, Sommerer C, Vethe NT, de Winter B, Christians U, Bergan S. Therapeutic Drug Monitoring of Tacrolimus-Personalized Therapy: Second Consensus Report. Ther Drug Monit. 2019;41(3):261-307. doi:10.1097/FTD.0000000000000640. IATDMCT Immunosuppressive Drugs Scientific Committee. Tacrolimus only; Tables 1 and 2 read from the page images." },
  { num: 8, text: "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015. Cited by printed page (e41, e44, e64, e65, e66, e96)." },
  { num: 9, text: "Te H, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and management of graft-related complications (Table 4, immunosuppressive agents, dosing, side effects and drug interactions). Liver Transpl. 2026;32(3):444-490 (online 2025-08-22). doi:10.1097/LVT.0000000000000715. https://doi.org/10.1097/LVT.0000000000000715" },
];
