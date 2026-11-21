# Trim verification: tpe-liver (nodes + 7 overlays + ledger)

Verdict: READY AFTER LISTED FIXES. No regression of the earlier corrected errors (no "Doppler first", "peripheral blood biomarkers" wording kept, no "most urgent", no "low/ high" invention, tacrolimus/CCB shown as differing, elective-surgery labelled, rejection hedges "should be considered" intact in overlay). Sources: G/N saved HTML as text (Tables 2, 4, 6 are HTML text tables; read as text, no render needed); about 22 overlay sentences and every number/grade checked.

## Findings (ranked)
| # | Where | Sentence | Class | Source | Fix |
|---|---|---|---|---|---|
| 1 | tpe-liver-biliary node | "Percutaneous transhepatic biliary drains should be reserved for strictures that have failed endoscopic management (Strong, Level 3)" | LOST A SAFETY QUALIFIER (exception only in overlay) | G Q6 rationale: "percutaneous transhepatic biliary drain placement may be appropriate in patients with surgically altered foregut anatomy ... or who are critically ill with hemodynamic instability" | Add one clause to the node. |
| 2 | tpe-liver summary; CRITICAL_ACTIONS[0] | "Peripheral blood biomarkers alone cannot diagnose or exclude rejection" / "...rejection or other graft injury" | FIRMER ("cannot" vs "should not be used") and BROADER (drops "T-cell-mediated") | G Q16 (Strong, 4): "peripheral blood biomarkers alone should not be used to diagnose or exclude T-cell-mediated rejection and other forms of allograft injury" | Use source wording incl. "T-cell-mediated". |
| 3 | tpe-liver INFECTION bullet; CRITICAL_ACTIONS[4] | "Suspect donor-derived infection in every early post-transplant infection ... " / "Unexplained fever, hepatitis or altered mental status early after transplant: donor-derived infection should be suspected" | BROADER (CA drops "all early post-LT infections, particularly unusual pathogen / atypical course"); "early" has no window in node | N Q9 rationale (ungraded): "A DDI should be suspected in all early post-LT infections, particularly if it involves an unusual pathogen or ... atypical post-LT course, including unexplained fever..."; N timeline: DDI "typically occur during the first month" | Restore the qualifier in the CA; give "first month" window or say the source gives none. |
| 4 | tpe-liver entry editor note | "call the transplant team before changing, holding or stopping any immunosuppressant; the guideline does not address emergencies, sepsis or drug toxicity" | EDITOR NOTE rule breach (prohibition + claim); "drug toxicity" is wrong: Table 4 lists CNI side effects, node itself says only that no toxicity threshold is given | G Table 4 side effects | "Editor note: call the transplant team about any immunosuppressant question; the guideline has no emergency section." |
| 5 | tpe-liver-rejection node; overlay headings (rejection, vascular) | "Treatment follows the biopsy and is the transplant team's"; "THE TRANSPLANT TEAM DECIDES THE TREATMENT"; "TRANSPLANT AND INTERVENTIONAL TEAMS DECIDE" | NEW CLAIM / ownership the guideline does not assign | G Q5 rationale: choice "mainly driven by center practice and the condition of the patient"; no statement assigns rejection therapy | Reword to "treatment statements are on the detail page; no doses". |
| 6 | tpe-liver-biliary/vascular/entry | Cautions beside general-consult links (azithromycin in Sepsis, pantoprazole in GI bleed bundle, tobramycin in cholangitis grade III with CNI nephrotoxicity, ERCP 2-4 h timing not written for recipients) now ONLY in overlays | safety item removed from node | Verified true in gallbladder.ts (gb-cholangitis-severe), sepsis.ts (azithromycin CAP atypical), gi-bleed-hub.ts (pantoprazole 80 mg bundle) | One compact line in the entry node: macrolides/azoles/PPIs raise CNI levels, so check before accepting the linked consults' antibiotic and PPI bundles. |
| 7 | CRITICAL_ACTIONS[6]; chronic node | "PTLD presentation is often nonspecific (fevers, night sweats, weight loss)" | LOST QUALIFIER ("no or vague symptoms such as") | N Q12 rationale | Restore "such as". |
| 8 | CRITICAL_ACTIONS[2] | MRCP first-line; ERCP "can be pursued ... if suspicion ... high" | MERGED (Strong 2 and Weak 5 fused, grades dropped) | G Q6 | Show "(Weak, Level 5)" for ERCP or say "may". |
| 9 | tpe-liver-chronic-detail | "CNI minimized but not eliminated within the first year, and minimized but not stopped beyond 1 year" | MERGED (two statements, Strong 1 and Strong 3, grades dropped) | N Q23 | Split and grade. |
| 10 | tpe-liver-vascular editor note | "the call does not replace imaging the ED can already order" | borderline clinical claim in an editor note | n/a | Drop the clause. |

Chronic node opens with description, not an action (all other nodes lead with the rule). "RULE" heading above descriptive Table 2 bullets in entry node: cosmetic.

## Conflict lines
Tacrolimus troughs (Table 4 7-10/4-8/4 ng/mL vs N trial arm 8-12 ng/dL) and CCB (Table 4 raises levels vs N amlodipine/felodipine first-line, minimal interaction): node says "Sources differ" and links; overlay shows both with grades and says unreconciled. OK. Elective-surgery statement labelled in node and overlay (full rationale quoted). OK.

## Overlays
Carried over verbatim (grades, 10-30%, 15%/40%, 94-96/94-95, 56 vs 15 months, 60-90%, 5-35%, 2.45-fold, 59/57/82%, status 1 within 7 days, ~2% PTLD, >50% MetS all match). Tables 2, 4, 6 content matches the overlays (Table 4 interaction list item for item). Citations cover markers in all 7. Only #9 above.

## Existing consults
Confirmed in src/data/trees: gallbladder (gb-cholangitis-severity grading; timing in moderate 24 h / severe 2-4 h), sepsis (azithromycin as CAP atypical option), gi-bleed-hub (pantoprazole bolus+infusion bundle), paracentesis, acute-jaundice-hub, hepatitis, potassium, adrenal-insufficiency, altered-mental-status-hub all exist; overlay statements accurate.

## Nothing lost
Ledger C1-C115 (C17, C55 and E17/E55 retired): every numbered claim present in its named node or overlay (programmatic phrase match plus reading); none vanished or changed meaning. Safety items living only in overlay that should return: #1 and #6; the "hepatic artery particularly urgent" and anticonvulsant/macrolide/azole/PPI lines ARE in nodes.

## Editor notes
Entry: see #4. Vascular: #10. Immunosuppression overlay: "the interaction list above is the guideline's Table 4 (calcineurin inhibitor rows) and is not a complete list...; tell the transplant team about any drug started or stopped in the ED" (acceptable). Final: "Editor note: disposition is decided with the treating transplant team." OK, once in body and once in recommendation, outside bold, nothing after. Critical actions now OMIT the single most important instruction (call the transplant team); only the entry body carries it. Add one CA pointing to tpe-liver.

## Mechanics
Body words (links stripped): entry 167, vascular 166, biliary 169, rejection 171, chronic 159, disposition 113 (recommendation 24). CAs 15-24 words. All option/next/CA ids resolve; every #/info/ link has a file with matching id; entry has summary + citation [1,2].
