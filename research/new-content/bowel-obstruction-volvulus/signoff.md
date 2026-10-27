# Bowel Obstruction & Volvulus (sbo) — sign-off for Andy and Dr. Kitlowski

Status: DRAFT for sign-off. Not registered, not deployed. Tree file: `src/data/trees/bowel-obstruction-volvulus.ts` (only file edited, plus this file). `docs/`, `sw.js`, `calculator.ts` and `toolbar-configs.ts` were NOT touched.

## What changed in this pass
- **Citation 1 replaced.** The 2013 Bologna ASBO cite is now the 2017 WSES update: ten Broek RPG, Krielen P, Di Saverio S, et al. World J Emerg Surg. 2018;13:24. doi:10.1186/s13017-018-0185-2 (DOI and volume checked on PubMed; article number 24 is from the task brief and the PubMed citation string, both matching). The full text was re-read; numbers were checked against it (see Conflicts).
- **Citation 8 (Cochrane CD004651) completed.** Abbas S, Bissett IP, Parry BR. Cochrane Database Syst Rev. 2007;(3):CD004651. doi:10.1002/14651858.CD004651.pub3. PubMed lists pub2 as 2005 (PMID 15674958) and pub3 as 2007 Issue 3 (PMID 17636770). The version cited is pub3. The Cochrane text itself was NOT re-read this pass (rate-limited).
- **Citation 7 (Cureus meta-analysis) retired.** Its numbers (length of stay mean difference 2.17 days, RR 0.63, pooled OR 0.63 with P=0.053) were removed from the tree. They were not in a society guideline and the source is weak.
- **Citation 10 (Pak J Med Sci, 792 patients) retired.** Its recurrence finding was removed from the sigmoid endoscopy node. The flatus-tube directive is kept and now cites WSES 2023 [9] alone.
- **Citation 13 (single-centre stent-first series) retired.** Its numbers (77.9% decompression, 30-day mortality 7.4% vs 6.9%) were removed from the LBO node.
- **Single-centre 12-hour plain film figure removed.** Sensitivity 91.9% and specificity 100% (cite 16, one single-centre series) are no longer in the tree. Cite 16 is kept for the aspiration-safety and do-not-give statements (not re-verified).
- **Thresholds aligned to the 2017 text** (see Conflicts C1, C2, C6): WBC stop criterion, day-3 drainage wording, and the "persistent ileus" qualifier removed.
- **Closed-loop wording corrected.** The draft said "Bologna does not address closed loop". The 2017 text does list closed-loop signs among those that suggest surgery without delay (no graded level). Node updated; the consensus directive is unchanged.
- **Long-tube wording corrected** to what the 2017 text says (see C3).
- Cosmetic: citation array lines re-indented. `tsc --noEmit --skipLibCheck --noUnusedLocals false` runs clean on the whole project after these edits (rc=0, no errors referencing the consult).
- Citation numbers in use: 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 14, 15, 16. Retired (gaps left, not renumbered): 7, 10, 13. Every number used in the tree is defined.

## Conflicts (both sources shown; not resolved silently)

**C1. WBC stop threshold (surgery triggers, trial checkpoint, critical action).**
- WSES 2017 (ten Broek 2018) algorithm box, failure criteria: "Peritonitis or ischemia: exacerbation of pain, CRP > 75 mg/l, WBC 10.000/mm3, free intraperitoneal fluid > 500 ml" (the 2017 text writes 10.000 with a decimal point, meaning 10,000). Lab section: "white blood cell count > 10.000/mm3 ... sensitivity and specificity relatively low."
- Earlier draft (and the old tree): WBC above 15,000/mm3, paired with fever ("the source pairs fever with leukocytosis"). The 2017 text does NOT contain 15,000 and does NOT mention fever as a trial-failure criterion.
- Tree now states 10,000/mm3 (the cited 2017 value, the more conservative stop). **Andy decides** whether 10,000 stays. Confirm against the 2013 text if the 15,000 figure came from there.

**C2. Timing of the water-soluble contrast check.**
- WSES 2017 text, water-soluble contrast section: "If the contrast has not reached the colon on an abdominal X-ray taken 24 h following administration ... highly indicative of failure."
- WSES 2017 algorithm (Fig. 2): "Contrast in colon after 24-36 hours? yes / No".
- Tree uses 24 h (matches the text). Algorithm allows 24–36 h. **Andy decides** the reassessment window.

**C3. Long tube versus NG tube.**
- Earlier draft: "long tube gives no advantage over NG tube [1]".
- WSES 2017 Table 5, Level IIC: "Long trilumen naso-intestinal tubes are more efficacious than naso-gastric tubes in non-operative management, but require endoscopic placement" (A2, Chen 2012; the Chen trial is a transnasal ileus tube vs NG tube trial).
- Tree now states the 2017 finding and that both NG and long tube are accepted. **Andy decides** whether the NG-equivalence statement is kept as an open question.

**C4. Drainage criterion and ileus qualifier.**
- Earlier draft: "persistent ileus beyond day 3 with long-tube drainage above 500 mL on day 3".
- WSES 2017 algorithm: "Drainage volume > 500 ml on 3rd day" (no ileus qualifier, no tube-type qualifier).
- Tree uses the 2017 wording. Tube-type equivalence remains an open question.

**C5. Closed-loop evidence.**
- Earlier draft: "Bologna does not address closed loop."
- WSES 2017 text: "Signs of a closed loop, bowel ischemia, and free fluid are signs that suggest the need for surgery without delay." No level grade given.
- Okumura 2025 (cite 4): closed loop not significant after adjustment (OR 0.895, 95% CI 0.15–5.22).
- Tree keeps the consensus directive (treat as strangulation) and states both. **Andy decides** the directive.

**C6. Cochrane CD004651 (pub3) versus WSES 2017.**
- Tree (Cochrane, cite 8): no reduction in surgery in the version reviewed.
- WSES 2017 text: water-soluble contrast "accurately predicts the need for surgery and reduces hospital stay" (refs 62–63, which include Abbas 2005 = pub2).
- The Cochrane pub3 text was NOT re-read this pass, so its finding is unverified. The tree shows the conflict; no benefit is claimed. **Andy decides** after reading pub3 directly.

**C7. Fever as a stop criterion.** Draft says fever ends the trial and is a strangulation red flag, sourced to [1]. The 2017 text does not list fever. Kept as a conservative draft criterion, labelled "unsourced draft criterion". Listed again under Open questions.

## Open questions (not resolved in this pass)
1. **Fever** as strangulation red flag and trial stop (C7). Source needed, or remove.
2. **CRP > 75 mg/L** is a WSES 2017 failure criterion that the draft does not use. Add to the trial checkpoint? Clinical directive change, so Andy decides.
3. **Free intraperitoneal fluid > 500 mL** (WSES 2017 failure box). The draft says "free fluid" with no number. Add the number? Andy decides.
4. **Raised CPK** with complete obstruction and no colonic air (surgery node). CPK is NOT in the 2017 text (no match for CPK or creatine kinase). It was cited to [1] in the draft. Flagged inline as a sign-off item. Source needed, or remove.
5. **Strangulation red flags** (fever, tachycardia, leukocytosis, metabolic acidosis, continuous pain) are cited to [1]. The 2017 text lists peritonitis, strangulation and ischemia as contraindications, not those vitals. Re-cite or re-label.
6. **Level grades.** The draft says "guideline-graded at level 2 or 2c". The 2017 Table 5 uses A/B/C/D-style levels (e.g., IIC, IIB, IA). The draft's grading label is not the 2017 grading. Removed from the surgery node text; needs a source-grade check.
7. **"Surgery within the previous 6 weeks" as an exclusion** (nom-entry) and "signs of resolution at admission" are NOT found in the 2017 text as searched. Source needed.
8. **"Contrast does not change recurrence or recurrence-related surgery" [1].** The 2017 text reports recurrence rates but does not make this statement in the passages checked. Source needed.
9. **Cochrane pub3 "no reduction in surgery"** (C6): read the pub3 text directly. Also confirm pub3 is the current version (the PubMed record shows pub3 2007; a later version was not checked this pass).
10. **Sigmoid volvulus (cite 9, WSES 2023, Tian et al.).** Not re-verified this pass. Success percentage, recurrence figures and upfront-colectomy percentage are withheld in the tree. The flatus-tube directive and the colectomy-after-detorsion directive still rest on this source; verify them against the full text.
11. **Cite 11 (ESGE 2020 stent) and cite 12 (Colorectal Dis 2026 Bayesian NMA).** The procedure-related perforation figures (6.8% stent, 7.5% transanal tube) are from cite 12 and were NOT re-verified this pass. Verify or remove the numbers.
12. **Cecal volvulus** has no cited management source. Unchanged from the draft.
13. **ACR Appropriateness Criteria (small bowel obstruction, and acute abdominal pain)** were NOT retrieved this pass. No ACR number is used in the tree. Add only after the primary document is read.
14. **Cite 16 (Von-Diemen 2023)** is still used for the aspiration-safety statement, the "do not give if strangulation" statement, and the 24-hour contrast statement context. Not re-read this pass. The 2017 WSES text should carry these if it can.
15. **Water-soluble contrast dose, volume and route** are not sourced (see drug entry below).
16. **Discharge criteria** for SBO/LBO are not sourced (unchanged).
17. **Antibiotic and fluid choices and volumes** in strangulation and ICU nodes are not sourced (unchanged).

## Missing drugs
- **Diatrizoate meglumine and sodium (Gastrografin) oral/NG solution:** the consult names it in `bowel-obstruction-volvulus-nom-entry` but there is no entry in `drug-store.ts`. A drug entry needs a **label source** (the US prescribing information for the oral/NG solution) for the dose, dilution, volume, route and timing. The tree does not dose it and says so. Do NOT write a dose from memory.
- The tree contains no `[Drug](#/drug/...)` links, so no indication-hint links need checking in this consult.

## Unsourced statements (kept in the tree, flagged)
- Strangulation red flags list (fever, tachycardia, acidosis) cited to [1] (see Open question 5).
- CPK predictor (Open question 4).
- Fever as trial stop (C7).
- Surgery within 6 weeks, signs of resolution at admission (Open question 7).
- Recurrence statement for contrast (Open question 8).
- Cecal volvulus: entire pathway (Open question 12).
- Sigmoid numbers withheld, procedural claims cited to [9] pending full-text check (Open question 10).
- Dispo: "Admit for every obstruction managed here" is a clinical directive without a cited source.
- Lactate / D-dimer / immature granulocyte "observational and conflicting" statements cite [14], [15]. Numeric cut-offs are NOT given; the statements are not re-verified this pass.

## Contradictions with pre-existing nodes (listed, NOT edited)
Searched `src/data/trees/*.ts` for node titles "Bowel Obstruction" and "Small Bowel Obstruction". No node is titled exactly "Bowel Obstruction". One node is titled "Small Bowel Obstruction":
- `src/data/trees/ibd-flare.ts`, node `ibd-obstruction` (module 3, title "Small Bowel Obstruction", Crohn's):
  - Says "If inflammatory: trial of IV steroids" and "If complete or not resolving: surgery". It has no defined window. The consult uses 72 hours and day-3 drainage above 500 mL. These are different triggers for the same condition in Crohn's disease. Not directly in conflict (Crohn's is a different population), but the consult's start node cross-links to it as "Crohn stricture obstruction" and the Crohn's node never states the 72-hour rule.
  - Says "NPO, NG tube if vomiting" and "CT abdomen/pelvis with contrast". The consult uses water-soluble contrast for adhesive SBO; the Crohn's node does not mention it. Not a contradiction, but the two nodes give different imaging advice for SBO.
  - Cites [2][5] from the ibd-flare numbering. Not checked.

Symptom-list nodes (not contradictions, listed for completeness):
- `src/data/trees/constipation.ts` (red flags list "Bowel Obstruction": bilious vomiting, complete obstipation, severe cramping, high-pitched or absent bowel sounds, distended tympanic abdomen; "immediate imaging and surgical consult").
- `src/data/trees/peds-constipation.ts` (red flags "Bowel Obstruction": bilious vomiting, severe distention, absent bowel sounds).
  - The consult's start node does not list bilious vomiting or absent bowel sounds. Both are obstruction red flags in those nodes. Worth adding to the consult's recognition list, but that is a clinical text change for Andy.

## Other things noticed (outside this task's file list)
- The consult is already referenced in files other than the tree: `src/data/trees/index.ts`, `src/services/tree-service.ts`, `src/data/categories.ts`, `src/data/info-pages.ts`, `src/data/toolbar-configs.ts`, and `src/data/new-content/bowel-obstruction-volvulus-info.ts` and `...-toolbar.ts`. The header says "Not registered". Someone has wired or is wiring it (probably the other session, uncommitted). Confirm before any deploy. The info-pages and toolbar files were NOT checked for the citation numbers changed here, so any info page citing [7], [10] or [13] or the 2013 Bologna text would be stale.

## Sign-off checklist

Andy:
- [ ] C1: WBC stop threshold — 10,000/mm3 (WSES 2017) or 15,000/mm3 (earlier draft)? Decide and confirm.
- [ ] C2: contrast reassessment at 24 h (text) or 24–36 h (algorithm)?
- [ ] C3: long tube wording (2017 Level IIC) accepted? NG equivalence kept as open question?
- [ ] C4: drainage > 500 mL on day 3, no ileus qualifier — accepted?
- [ ] C5: closed-loop consensus directive kept (treat as strangulation)?
- [ ] C6: read Cochrane CD004651 pub3 directly; confirm current version; decide wording.
- [ ] C7 / Open Q1: fever as strangulation red flag and trial stop — keep with label, re-source, or remove?
- [ ] Open Q2–3: add CRP > 75 mg/L and free fluid > 500 mL to the failure checkpoint?
- [ ] Open Q4: raised CPK predictor — keep (flagged), source, or remove?
- [ ] Open Q6: level grading in the surgery node — confirm the removed grade label is correct to drop.
- [ ] Open Q9–11: sigmoid (WSES 2023) and LBO (cite 11/12) numbers verified or removed.
- [ ] Open Q13: ACR Appropriateness Criteria — add or skip.
- [ ] Missing drug: diatrizoate (Gastrografin) drug entry with a label source (no dosing until sourced).
- [ ] Decide whether the consult should be wired (it already appears in several registries — see "Other things noticed").

Dr. Kitlowski (clinical audit):
- [ ] Independent check of the strangulation and surgery-trigger thresholds against the WSES 2017 text (the 2017 box, Table 5 and Fig. 2).
- [ ] Closed-loop directive and CT ischemia wording.
- [ ] Non-operative trial checkpoint sequence (24 h film, 72 h, day-3 drainage).
- [ ] Sigmoid pathway against the WSES 2023 full text (cite 9).
- [ ] Contrast safety wording (aspiration, do-not-give list).

Flow Rider / reachability (when wired):
- [ ] Every node reachable from start, zero orphans.
- [ ] Toolbar and info-page references match the new citation numbers (7, 10, 13 retired).
