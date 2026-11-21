# Review-round meaning check: tpe-liver (7 nodes)

Read-only. Sources: G/N saved HTML as text (statements and grades re-read), repo trees. Verdict: READY AFTER LISTED FIXES (no false sentence; findings are scope/grade fusions).

## Findings, ranked
| # | Id | Text | Class | Source | Fix |
|---|---|---|---|---|---|
| 1 | tpe-liver-biliary summary | "MRCP should be first-line; ERCP can be pursued without MRCP when suspicion ... or the need for endoscopic intervention is high." | MERGED: two statements (Strong, Level 2; Weak, Level 5) in one sentence, no grades, so ERCP reads as firm as MRCP | G Q6: MRCP "(Strong, Level 2)"; ERCP "(Weak, Level 5)" "high clinical suspicion for biliary pathology or for the need of endoscopic intervention" | Add "(Strong, 2)" and "(Weak, 5)" or "may be pursued". Body and CA3/CA4 are correct and separate. |
| 2 | tpe-liver-drugs summary | "Table 4 lists many drugs that raise or lower calcineurin inhibitor levels; sources differ..." | UNCLEAR: leads with no check or action | G Table 4 | Lead with "Before adding a drug, check Table 4 (macrolides, azoles, PPIs raise; anticonvulsants, St. John's wort lower calcineurin inhibitor levels)". |
| 3 | tpe-liver-vascular body | "The choice of intervention is mainly driven by center practice and the condition of the patient." | UNCLEAR: orphaned; the treatment statement it explains is not on the node | G Q5 rationale | Name "intervention for stenosis or thrombosis" or move to detail. |
| 4 | tpe-liver App content (entry) | "the Sepsis consult's regimens include azithromycin." | slightly broad (one CAP atypical option) | sepsis.ts: "Add atypical coverage for CAP: Doxycycline ... OR Azithromycin 500 mg IV" (1 occurrence) | "the Sepsis consult's pneumonia regimen offers azithromycin" (as the overlays say). Not worded as a reason to withhold: OK. |
| 5 | tpe-liver entry body | "Liver biopsy has been the gold standard ..." without its paired graded exclusion | LOST QUALIFIER (minor) | G: "...protocol liver biopsy is not recommended in the routine management of stable adult liver transplant recipients (Strong, Level 4)" | Add the exclusion or move the clause to detail. |

## 1b. Summaries
Entry: FAITHFUL (exact "should not be used ... T-cell-mediated rejection and other forms of allograft injury", G Q16 Strong 4; "peripheral blood biomarkers alone"). Vascular: FAITHFUL, exact G Q5 wording ("timely fashion", "particularly urgent ... hepatic artery involvement"), 29 words, no grade shown (body has Strong, 4). Biliary: see #1. Rejection: FAITHFUL (G Q? "Strong, Level 3": suspect AMR with unexplained graft dysfunction, thrombocytopenia, hypocomplementemia; DSA testing and biopsy with C4d "should be obtained"). Drugs: #2. Chronic: FAITHFUL (N Q25 and Q12 wording). Disposition: FAITHFUL ("not in the guideline" true; nearest statement correct). No quotation marks in any summary. No summary leads with a pure instruction except through the rule wording.

## 2. Critical actions (words)
CA1 shared note first, 13 (APPROVED). CA2 vascular 24, CA3 MRCP 14 (Strong 2), CA4 ERCP 24 (Weak 5), CA5 AMR 22 (Strong 3), CA6 biomarkers 23 (Strong 4), CA7 donor-derived infection 20 ("typically first month" = N timeline for DDI; ungraded; ok), CA8 hernia 16, CA9 PTLD 20 ("no or vague symptoms such as" restored). Grades sit on the right statements; MRCP and ERCP are split. None names reducing, holding, stopping, withdrawing or substituting an immunosuppressant except the approved shared note, so the "(call the transplant team first)" parenthetical is not required anywhere on this page.

## 3. Editor notes (verbatim)
- "Editor note: call the transplant team before changing, holding or stopping any immunosuppressant." (entry body, CA1): APPROVED-WORDING.
- "Editor note: name suspected vascular compromise to the transplant team at the first call." (vascular): APPROVED-WORDING.
- "Editor note: disposition is decided with the treating transplant team." (disposition body and recommendation): APPROVED-WORDING.
- Overlay tpe-liver-immunosuppression: "Editor note: the interaction list above is the guideline's Table 4 (calcineurin inhibitor rows) and is not a complete list of interacting drugs; tell the transplant team about any drug started or stopped in the ED." APPROVED-WORDING. No note NOT ON THE LIST.

## 4. App content
Entry node only: Sepsis consult azithromycin: CONFIRMED (sepsis.ts CAP atypical line), followed by Table 4 "macrolide antibiotics" fact (G Table 4); not a reason to withhold. Overlays (recognition, vascular, biliary) carry more App content lines (pantoprazole bolus+infusion in gi-bleed-hub; tobramycin in the Biliary pathology consult's grade III options): both confirmed in the tree files; node rule "one per node" holds for nodes.

## 5. Silence and navigation
Every "Not in the guideline:" is true (anticoagulant agent/dose; bile leak and cholangitis work-up; stepwise abnormal-LFT approach; tacrolimus toxicity threshold, missed dose, NPO, hold-in-sepsis; neurotoxicity/hyperkalemia/magnesium management; stress-dose steroids; ED section) and each is followed by a sourced fact and a "Related consults:" line in its node. Targets exist: sepsis, altered-mental-status-hub, acute-jaundice-hub, hepatitis, gi-bleed-hub, paracentesis, gallbladder/gb-cholangitis-severity, potassium, adrenal-insufficiency, abdominal-pain-hub, tpe-cmv.

## 7. Mechanics
Summary words: 24, 29, 30, 26, 27, 25, 26. Body words (links stripped): entry 171, vascular 170, biliary 175, rejection 93, drugs 134, chronic 146, disposition 112 (recommendation 24). Hub options ordered vascular, biliary, rejection, drugs, chronic, disposition; every leaf next = tpe-liver-disposition. All ids and #/info/ files resolve; vascular has summary and citation [1]. No file names, line numbers or "(searched)" in nodes or overlays. Final body and recommendation end with exactly "Editor note: disposition is decided with the treating transplant team." outside any bold.
