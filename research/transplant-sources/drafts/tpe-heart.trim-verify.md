# Trim verification: tpe-heart (nodes + 8 overlays + ledger)

Verdict: READY AFTER LISTED FIXES. Checked against rendered PDF pages e19, e20, e44, e52, e79, e80, e96, e97 (images) and extracted text of e51, e61, e65, e69, e91, e98. No regression: no "low dose only", rejection not framed as conflict, no rejection dose, adenosine both figures with sections/strength and "unresolved", atropine carries "anaesthesia section, 2010 text continued, I C", entry says once (body; also in summary) that there is no ED section, gap for unstable patient before biopsy stated.

## Findings (ranked)
| # | Where | Sentence | Class | Source | Fix |
|---|---|---|---|---|---|
| 1 | tpe-heart-drugs | "New seizures (I C): management includes reducing the CNI dose and correcting low magnesium" beside "Immunosuppression should not be discontinued or modified without discussion with the HT team" | BROADER (drops "not due to stroke or structural brain disease", "considering the risk of inadequate immunosuppression") and CONFLICT NOT SHOWN (overlay says guideline does not reconcile; node silent) | e65 neurologic table (I C); e97 surgery section (I C) | Add qualifier; add "these differ; guideline does not reconcile" with link. |
| 2 | tpe-heart-tachy | "Non-dihydropyridine calcium channel blockers and beta-blockers may be used for rate control (IIa B); Table 5 lists diltiazem, verapamil and amiodarone..." | MERGED + lost section/population: e20 early-postoperative table (rate control) and e80 arrhythmia table (AF, PRESERVED EF only) fused; no section label; "minimal interaction" vs Table 5 vs e15 "dose adjustment required" tension not stated | e20, e80 (both IIa, B) | Label both sections, keep "preserved ejection fraction", add "guideline statements on interaction differ; see detail". |
| 3 | tpe-heart-brady | "temporary pacing for relative bradycardia, rates above 90/min (I B)" | misreadable (reads as a trigger rate) | e19: "temporary pacing should be initiated in the setting of relative bradycardia to maintain heart rates of > 90 beats/min" | "to maintain rates above 90/min". |
| 4 | tpe-heart-brady, CA[2] | "Not tested in late recipients" | NEW CLAIM (source is silent, not "untested"); also drops "relative" ("a relative, symptomatic bradycardia") | e96 | "the guideline gives no late-recipient evidence"; restore "relative". |
| 5 | CRITICAL_ACTIONS[1] and entry editor note | "call the transplant team before changing, holding or stopping any immunosuppressant or starting rejection treatment" | EDITOR NOTE rule breach (prohibition; assigns ownership of starting rejection treatment the guideline does not assign, e97 is surgery-only); appears twice with different wording, plus drugs-node bullet | e97 | One short note: "Editor note: call the transplant team before any immunosuppressant change." Keep once. |
| 6 | CRITICAL_ACTIONS[5] | "Suspected rejection: biopsy as early as possible (I C); late dysfunction of unknown cause..." | BROADER (drops "symptomatic acute"; "late" undefined, "unknown cause" is the page's) | e51 (I C) "suspicion of symptomatic acute heart allograft rejection"; e61 (IIa C) after first year, signs or symptoms of dysfunction | Add "symptomatic" and "after the first year". |
| 7 | tpe-heart-compromise | Table 14: norepinephrine, epinephrine, isoproterenol, dopamine "are effective" | LOST QUALIFIER | e98: "although the beta-adrenergic inotropic effects are attenuated early after HT" | Add. |
| 8 | consult-check notes (4) | see below | accuracy/clutter | | |

## Existing-consult notes (quoted) and accuracy
- brady: "the Bradycardia consult was checked: it is pacing-first, but its isoproterenol dose has no ISHLT source" ACCURATE (bradycardic-arrest.ts line 9 pacing first; line 152 "Isoproterenol 2-10 mcg/min"). Helps.
- tachy: "the AF with RVR and SVT consults were checked; they differ from the cautions above" VAGUE: afib-rvr has no transplant text (diltiazem first-line, line 11) so it lacks rather than differs; svt critical action (line 13) says 6 mg then 12 mg while svt-adenosine says reduce to 3 mg for transplanted heart (line 135). Reword to name the 6 mg figure. Helps if specific, clutters as written.
- compromise: "none has transplant text" LITERALLY FALSE: cardiogenic-shock (bridge to transplant, transplant evaluation), right-heart-failure, chf-exacerbation mention transplant as candidacy/bridge, none for recipients. Reword "no recipient text". Mostly clutter.
- dispo: sepsis, pneumonia, chest-pain-hub, syncope: 0 occurrences of "transplant" ACCURATE. Clutter; the "(no transplant text)" link labels already say it.
Each has the same content again in tpe-heart-other-consults overlay, so remove or merge into the link.

## Safety items living only in overlay that should return to a node
The SVT consult's 6/12 mg start and the AF consult's diltiazem-without-level-warning (node note too vague); cardiogenic-shock/sepsis consults' ketamine vs Table 14 caution; etomidate/adrenal and DOAC cautions are acceptable overlay-only. Already in nodes: atropine, adenosine, anticonvulsants avoided (e65), macrolide/azole/amiodarone/diltiazem/verapamil, aminoglycoside/erythromycin (labelled prophylaxis), blood products.

## Overlays and Table 5 (e44 read from image)
Raise list complete and correctly sorted (only the unnamed "Antivirals" row omitted); lower list complete (24 items checked). About 24 overlay sentences checked against e15-e98 images/text: classes and numbers match (adenosine IIb C 1.5 mg e20; 3 mg e79; I C atropine e96; Mobitz II I B / Mobitz I IIa C e80; DC cardioversion IIa A; ECG III C etc. from earlier report; late-rejection adherence IIa B e61). tpe-heart-other-consults facts confirmed in trees (see above); its text includes svt line 13/135, afib line 359 as stated.

## Nothing lost
73 ledger claims (H, B, T, P, D, X, Z series) all present in their named overlay or node; none vanished. Fever item in dispo shortened (drops the 48 h clause) but flagged "2010 and 2023 wording differ" with link.

## Editor notes and critical actions
Remaining: entry x2 (second, "ask the patient how to reach the transplant centre and which medicines they take", clean); brady "apply pacing pads early when a recipient is symptomatic with a slow rate" (clinical directive, borderline); drugs "before adding or stopping any drug, ask the transplant team or a transplant pharmacist..." (clean); final dispo note exact. Critical actions still carry call-the-team (CA[0] guideline list, CA[1] editor note), so this page does not omit it.

## Mechanics
Body words: entry 171, brady 152, tachy 164, compromise 138, drugs 153, chronic 104, dispo 139 (recommendation 45). CAs 14-24 words. All ids and #/info/ files resolve (8 overlays). Final body and recommendation end exactly with the required note, outside bold. Adenosine drug link points to an existing card that still lists 6/12 mg (owner decision logged in ledger section 5).
