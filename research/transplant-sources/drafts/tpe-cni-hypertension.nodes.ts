// DRAFT page for the "Transplant Patient in the ED" consult (tree id transplant-patient-ed, node prefix tpe-).
// Page B (principal-review fix round, 2026-11-20): high blood pressure on a calcineurin inhibitor. Entry node: tpe-cni-hypertension.
// Reference material lives in the info page tpe-cni-htn-agents (register it in the info-page registry).
// Every clinical sentence is SOURCED or begins "Editor note:" / "PROPOSED Editor note:" (not yet approved) or "App content:" (consult named only; file and line in the ledger).
// PRES is covered on node tpe-cni-brain of the toxicity page. Ledger: drafts/tpe-cni-hypertension.ledger.md

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.", nodeId: "tpe-cni-hypertension" },
  { text: "Prograf label: blood pressure control can be accomplished with any of the common antihypertensive agents; careful consideration before agents associated with hyperkalemia.", nodeId: "tpe-cni-hypertension" },
  { text: "Tacrolimus labels: calcium-channel blockers (e.g., nicardipine) may raise the trough; none says avoid them; monitor; reduce tacrolimus dose if needed (call the transplant team first).", nodeId: "tpe-cni-htn-agents" },
  { text: "Cyclosporine labels: potassium-sparing diuretics should not be used.", nodeId: "tpe-cni-htn-agents" },
  { text: "Heart recipients with PRES (ISHLT, Class I, C): gradual blood pressure reduction, CNI withdrawal or reduction, alternate immunosuppressant or CNI (call the transplant team first).", nodeId: "tpe-cni-htn-dispo" },
  { text: "Editor note: use the Hypertensive Emergency (Adult) consult unchanged; tell the transplant team which agent was started; the drug level is rechecked afterwards.", nodeId: "tpe-cni-htn-dispo" },
];

export const NODES: DecisionNode[] = [
  {
    id: "tpe-cni-hypertension",
    type: "question",
    module: 0,
    title: "High blood pressure on tacrolimus or cyclosporine",
    safetyLevel: "warning",
    summary: "Prograf label: blood pressure can be controlled with any of the common antihypertensive agents, with careful consideration before agents associated with hyperkalemia. Tacrolimus labels: calcium-channel blockers can raise levels.",
    body: "\n\u2022 Prograf: \"The control of blood pressure can be accomplished with any of the common antihypertensive agents, though careful consideration should be given prior to use of antihypertensive agents associated with hyperkalemia (e.g., potassium-sparing diuretics, ACE inhibitors, angiotensin receptor blockers)\". [1]\n\u2022 Neoral, Gengraf and Sandimmune: \"potassium-sparing diuretics should not be used\". [4,5,6]\n\u2022 Hypertension is a common effect of both drugs: tacrolimus labels, \"may require antihypertensive therapy\"; cyclosporine labels, \"antihypertensive therapy may be required\". [1,2,3,4]\n\u2022 Tacrolimus labels list calcium-channel blockers (including nicardipine) as able to raise tacrolimus levels; action: monitor the trough, reduce the tacrolimus dose if needed (call the transplant team first). Cyclosporine labels list diltiazem, nicardipine and verapamil as raising cyclosporine concentrations (next node). [1,2,3,4,5,6]\n\nEditor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\n[Toxicity and levels](#/tree/transplant-patient-ed/node/tpe-cni-toxicity) | [PRES and neurotoxicity](#/tree/transplant-patient-ed/node/tpe-cni-brain) | [Hypertensive Emergency (Adult)](#/tree/hypertensive-emergency-adult/node/hypertensive-emergency-adult-agent-by-organ) | [what each label says](#/info/tpe-cni-htn-agents)",
    citation: [1, 2, 3, 4, 5, 6],
    calculatorLinks: [
      {"id": "hypertensive-emergency-adult", "label": "Hypertensive Emergency (Adult): agent by organ", "kind": "tree", "node": "hypertensive-emergency-adult-agent-by-organ"},
    ],
    options: [
      {"label": "Hypertensive emergency or PRES; disposition", "description": "PRES, emergency, who to tell", "next": "tpe-cni-htn-dispo", "urgency": "critical"},
      {"label": "Calcium-channel blockers and potassium-raising agents", "description": "What the labels list and say to do", "next": "tpe-cni-htn-agents", "urgency": "urgent"},
    ],
  },
  {
    id: "tpe-cni-htn-agents",
    type: "info",
    module: 0,
    title: "Calcium-channel blockers and potassium-raising agents",
    safetyLevel: "warning",
    summary: "Tacrolimus labels: calcium-channel blockers may raise levels; monitor the trough, reduce the tacrolimus dose if needed (call the transplant team first). No label says to avoid nicardipine, verapamil or diltiazem.",
    body: "\n\u2022 Tacrolimus labels (7.2): verapamil, diltiazem, nifedipine and nicardipine may raise the tacrolimus trough; action: \"Monitor tacrolimus whole blood trough concentrations and reduce [product] dose if needed\" (call the transplant team first). [1,2,3]\n\u2022 Cyclosporine labels list diltiazem, nicardipine and verapamil as raising levels. Neoral and Gengraf: \"While calcium antagonists can be effective agents in treating cyclosporine-associated hypertension, they can interfere with cyclosporine metabolism\". [4,5]\n\u2022 No label says to avoid nicardipine, verapamil or diltiazem; cyclosporine labels say nifedipine \"should be avoided in patients in whom gingival hyperplasia develops\". [4,5,6]\n\u2022 Sources differ: tacrolimus labels, calcium-channel blockers may raise the trough (monitor); AASLD/AST 2025 liver guideline, Question 15: amlodipine or felodipine first-line in adult liver recipients with no cardiovascular or chronic kidney disease (Strong, Level 5). [1,2,3,8]\n\u2022 App content: the Hypertensive Emergency (Adult) consult lists nicardipine; no transplant text.\n\u2022 Potassium: Prograf asks for \"careful consideration\" before potassium-sparing diuretics, ACE inhibitors, ARBs; cyclosporine labels: \"should not be used\". [1,4,5,6]\n\nEditor note: tell the transplant team which blood pressure drug is being given or planned, and any calcineurin inhibitor level drawn.\n\n[Detail](#/info/tpe-cni-htn-agents)",
    citation: [1, 2, 3, 4, 5, 6, 8],
    calculatorLinks: [
      {"id": "hypertensive-emergency-adult", "label": "Hypertensive Emergency (Adult): calcium-channel blocker infusion", "kind": "tree", "node": "hypertensive-emergency-adult-agent-nicardipine"},
    ],
    next: "tpe-cni-htn-dispo",
  },
  {
    id: "tpe-cni-htn-dispo",
    type: "result",
    module: 0,
    title: "Disposition: high blood pressure on a calcineurin inhibitor",
    safetyLevel: "warning",
    confidence: "consider",
    summary: "Heart recipients (ISHLT, Class I, C), PRES: gradual blood pressure reduction, CNI reduction or withdrawal, alternate immunosuppressant or CNI (call the transplant team first).",
    body: "\n\u2022 Heart recipients (ISHLT, PRES, Class I, C): \"should be managed with gradual blood pressure reduction and withdrawal or reduction of CNI along with substitution for an alternate immunosuppressive agent or an alternate CNI\" (call the transplant team first). [7]\n\u2022 Cyclosporine labels list hypertension among the predisposing factors for PRES. [4,5,6]\n\u2022 Not in the labels or guidelines used: a treatment threshold, a rate of lowering, an agent or an admission rule for a hypertensive emergency in a recipient on a calcineurin inhibitor. Nearest fact: the ISHLT statement above.\n\u2022 Tacrolimus labels: for calcium-channel blockers, monitor the trough, reduce the tacrolimus dose if needed (call the transplant team first). Cyclosporine labels (Neoral, Gengraf): \"While calcium antagonists can be effective agents in treating cyclosporine-associated hypertension, they can interfere with cyclosporine metabolism\". [1,2,3,4,5]\n\nEditor note: use the Hypertensive Emergency (Adult) consult unchanged; tell the transplant team which agent was started; the drug level is rechecked afterwards. [Hypertensive Emergency (Adult)](#/tree/hypertensive-emergency-adult/node/hypertensive-emergency-adult-agent-by-organ).\n\nEditor note: disposition is decided with the treating transplant team.",
    recommendation: "**High blood pressure on a calcineurin inhibitor: the Prograf label says blood pressure can be controlled with any of the common antihypertensive agents, with careful consideration before agents associated with hyperkalemia; tacrolimus labels: calcium-channel blockers can raise the drug level (monitor the trough); heart recipients with PRES (ISHLT, Class I, C): gradual blood pressure reduction and reduction or withdrawal of the calcineurin inhibitor (call the transplant team first); a threshold or admission rule is not in the labels or guidelines used.** Editor note: disposition is decided with the treating transplant team.",
    citation: [1, 2, 3, 4, 5, 6, 7],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: "PROGRAF (tacrolimus) capsules, injection and granules for oral suspension. FDA prescribing information, SPL version 30. DailyMed page revised 8/2023; SPL effective 2023-08-25 (DailyMed published 2025-03-21). Setid 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b. Cited by section number." },
  { num: 2, text: "ASTAGRAF XL (tacrolimus extended-release capsules). FDA prescribing information. DailyMed page revised 8/2023; SPL effective 2026-01-14. Setid 550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e. Cited by section number." },
  { num: 3, text: "ENVARSUS XR (tacrolimus extended-release tablets). FDA prescribing information. DailyMed page revised 4/2024; SPL effective 2025-02-26. Setid de2315b0-6344-43ac-9aea-3e3b68d828e7. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=de2315b0-6344-43ac-9aea-3e3b68d828e7. Cited by section number." },
  { num: 4, text: "NEORAL (cyclosporine capsules and oral solution, USP, MODIFIED). FDA prescribing information (older format, no section numbers; cited by heading). DailyMed page revised September 2023; SPL effective 2026-08-10. Setid 94461af3-11f1-4670-95d4-2965b9538ae3. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=94461af3-11f1-4670-95d4-2965b9538ae3" },
  { num: 5, text: "GENGRAF (cyclosporine capsules, USP [MODIFIED]). FDA prescribing information (older format, cited by heading). DailyMed page revised date not shown; SPL effective 2024-08-21. Setid e896cbfe-4745-4088-82a3-8dc10b75c41f. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e896cbfe-4745-4088-82a3-8dc10b75c41f" },
  { num: 6, text: "SANDIMMUNE (cyclosporine capsules and injection). FDA prescribing information (older format, cited by heading). DailyMed page revised March 2026; SPL effective 2026-07-10. Setid 5e5926a7-1de0-4b54-a5c0-286b6200ff82. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5e5926a7-1de0-4b54-a5c0-286b6200ff82" },
  { num: 7, text: "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015. Cited by printed page (e15, e44, e64, e65)." },
  { num: 8, text: "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications (Question 15, hypertension). Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785. https://doi.org/10.1097/LVT.0000000000000785" },
];
