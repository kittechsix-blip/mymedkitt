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

## Drug entries: diatrizoate (Gastrografin) for adhesive SBO (drugs-sbo-scad pass, 2026-10-27)

Module `src/data/new-content/drugs-sbo-scad.ts`. Nothing wired, deployed, or pushed. The tree has no `#/drug/` link yet.

**Source conflict on dose.**
- Label (DailyMed setid 8c2340e4, SPL section dated August 2019): GI radiography only. Adult oral 30-90 mL. Oral or rectal only. Not for parenteral use.
- Trial regimen (Cochrane Abbas 2007, CD004651.pub3): 100 mL orally or via NG, NG clamped 60 min (one trial 2-3 h), abdominal film at 4-6 h. 100 mL is above the label maximum.
- Bologna 2018: contrast not in the colon at 24 h is highly indicative of failure. No volume stated in the text checked.
- Cochrane pooled sensitivity 0.97, specificity 0.96 for 24 h colon contrast predicting resolution.

**Decision needed (Andy):** consult dose (label 30-90 mL, or the 100 mL off-label trial dose) and NG clamp time (60 min or 2-3 h).

**Safety items.**
- Aspiration (label WARNINGS; Cochrane): empty stomach, NG drainage first, do not give to a patient who keeps vomiting.
- "Do NOT give if strangulation, peritonitis, or perforation suspected": from the tree text, not a label item. Wording not re-verified against Bologna.
- Label version: a Bracco ISI PDF dated 2024-10-02 exists. The DailyMed copy read is dated August 2019. Check for dosing or contraindication changes before signing.

**Dr. Kitlowski (clinical audit).**
- [ ] Confirm label version (2019 DailyMed vs 2024 Bracco ISI)
- [ ] Confirm trial dose and clamp time against the Cochrane primary trials
- [ ] Confirm strangulation / perforation exclusion wording

---

## Dr. Kitlowski audit (2026-10-27)

**Verdict: REVISE. Not safe to deploy until the flagged items below are decided by Andy.** Andexanet is out of scope and was not touched. No commit, push, deploy, or supabase step was run. `tsc --noEmit --skipLibCheck --noUnusedLocals false` runs clean.

### Primary sources opened this pass
- ten Broek 2018 (WSES 2017 ASBO), full text: wjes.biomedcentral.com/articles/10.1186/s13017-018-0185-2. Read: lab section (CRP > 75, WBC > 10.000/mm3 as peritonitis markers, low sens/spec), water-soluble contrast section (24 h, "highly indicative of failure"), CT section (closed loop, ischemia, free fluid "suggest the need for surgery without delay"), non-operative section (72 h "safe and appropriate", duration "subject to debate", long tube vs NG). Table 5 and Fig. 2 (algorithm) are images or full-size tables not in the text; NOT verified.
- Tian 2023 (WSES sigmoid volvulus), full text: wjes.biomedcentral.com/articles/10.1186/s13017-023-00502-x. Read Recs 2-10 and grades.
- ESGE 2020 (van Hooft, Endoscopy 2020;52:389-407), Main Recommendations read from the Thieme page.
- DailyMed Gastrografin label (setid 8c2340e4), read in full: page "Updated October 4, 2021", label Rev. August 2019.
- Cochrane CD004651.pub3 (Abbas 2007): abstract only; full text paywalled.
- Ranson 1976 (PMID 941075) abstract read in full. Ranson 1974 (PMID 4834279) and 1982 (PMID 7051819): PubMed metadata only, no abstract.
- Crossref: all 13 consult DOIs resolve to the cited titles and years.
- Secondary calculator pages (MDCalc snippet, medaptly) for Ranson gallstone cutoffs.

### Auto-fixed in this pass
1. **Strangulation vitals list, mis-attributed to [1]** (`src/data/trees/bowel-obstruction-volvulus.ts`, start node, strangulation node, nom-check node). The WSES 2017 text names peritonitis, strangulation and ischemia as trial contraindications. It does not list fever, tachycardia, leukocytosis, acidosis or continuous pain (grep of the full text: zero hits for each term). The directive is unchanged. The attribution now reads "clinical consensus; not listed in [1]". Andy still owns whether the list stays (see flagged items).
2. **Gastrografin dilution, misread from the label** (`src/data/new-content/drugs-sbo-scad.ts`, GI radiography row). The old text said "dilute 1:1 for dehydrated or debilitated patients". The label says pediatric doses (30 or 60 mL) may be used in dehydrated or debilitated adults, 1:1 dilution is recommended for elderly cachectic patients, and pediatric doses may be diluted 1:1 if desired.
3. **Thyroid caution, overstated** (same entry). The label reports thyroid storm after an intravascular agent and says a similar event could follow oral iodides. The entry said "reported with oral iodinated contrast".
4. **IV line wording** (same entry). The label says an open IV line "may be advisable" in pediatric and severely debilitated patients. The entry said "maintain".
5. **Aspiration and empty-stomach wording** (same entry). "Give only with an empty stomach" and "do not give to a patient who keeps vomiting" are not label text. They are now labelled as practice points with an unverified source.
6. **Trial regimen marked UNVERIFIED** (same entry). The Cochrane abstract gives sensitivity 0.97, specificity 0.96 and the 24 h rule. It gives no volume, clamp time or film timing. The 100 mL, 60 min to 2-3 h and 4-6 h figures remain in the entry, labelled as drafted and not verified. They are NOT chosen here.
7. **Label citation updated** to the DailyMed revision and update dates read this pass.

### Verified, no change needed
- Cochrane CD004651.pub3 abstract: 24 h colon contrast pooled sensitivity 0.97, specificity 0.96; no reduction in surgery (OR 0.81, p = 0.3); reduced hospital stay (WMD -1.83). The consult's Cochrane statement is accurate. Conflict C6 is partly resolved: the abstract is confirmed, the full text is not.
- WSES 2023 Rec 4 (flexible endoscopy first-line when no ischemia or perforation; strong, low or very-low quality, 1C), Rec 5 (urgent resection for failed detorsion, non-viable or perforated colon; 5-25% present with ischemia, perforation, peritonitis or shock), Rec 6 (offer colectomy, as early as possible including index admission), Rec 7 (detorsion alone, sigmoidoplasty and mesosigmoidoplasty inferior and to be avoided), Rec 8 (endoscopic fixation for prohibitive risk; weak, 2C), Rec 9 (megacolon: subtotal colectomy). The tree's directives match these recommendations. Flat-tube after detorsion, abort criteria for ischemia, perforation or impending perforation, CT with IV contrast for ischemia, and the whirl sign are all confirmed. Mortality risk factors (age over 60, shock, prior episode) are confirmed (Bhatnagar, as cited in the 2023 text).
- ESGE 2020 Recs 1, 2, 5 and 7: no prophylactic stent; stent only for symptomatic malignant LBO without perforation (strong, low quality); stent bridge to surgery as shared decision for curable left-sided cancer (strong, high-quality evidence); about 2 weeks before resection when bridging (weak, low quality); decompressing stoma valid if stenting expertise is unavailable (weak, low quality). The LBO node matches.
- Ranson 1976 abstract confirms the non-gallstone admission cutoffs (age >55, glucose >200, WBC >16,000, LDH >350, AST >250 Sigma-Frankel) and the 48 h cutoffs (Hct fall >10 points, Ca <8, base deficit >4, BUN rise >5, sequestered fluid >6 L, PaO2 <60). The Ranson node and the calculator agree with it. No change needed.
- PubMed metadata confirms the Ranson 1974, 1976 and 1982 PMIDs, journals, volumes and pages.
- All 13 consult DOIs resolve in Crossref to the cited article.
- Internal link targets: all node, tree, calculator and info links resolve, except the three acute-pancreatitis node IDs (ap-complications-q, ap-dispo-complicated, ap-severe-resus), which exist in `src/data/trees/acute-pancreatitis.ts`.

### FLAGGED for Andy (not changed)

**Patient-safety tier, decide before deploy:**
- **F1. Gastrografin dose conflict.** Label oral adult dose is 30-90 mL. The trial dose in the drafted entry is 100 mL, which is above the label maximum. Two sources disagree, so Dr. K does not pick. The trial figure cannot be verified because the Cochrane full text is paywalled. Andy needs to supply or approve a source (full Cochrane text, or the primary trial).
- **F2. Gastrografin route.** The label says oral or rectal only. NG use, which the trial regimen and the consult both describe, is off-label and not in the label. This needs an explicit decision and wording.
- **F3. Surgery trigger, WBC 10,000 vs 15,000.** WSES 2017 gives WBC > 10.000/mm3 and CRP > 75 as peritonitis lab markers with low sensitivity and specificity. The text does not state them as non-operative failure criteria. Mapping them to a trial stop is an interpretation and a number clinicians act on. The 15,000 figure does not appear in the 2017 text. Andy decides.
- **F4. 72 hours as a surgery trigger.** The 2017 text calls 72 h "safe and appropriate" and says duration is debated. It does not state "no resolution at 72 h means operate". Andy decides whether this stays a hard trigger.
- **F5. Day-3 drainage above 500 mL.** Not found in the 2017 text. It may be in the algorithm figure (Fig. 2), which I could not read. Needs the figure checked by Andy.
- **F6. Fever as stop and strangulation criterion** (C7, open Q1). Not in the 2017 text. Keep labelled, re-source, or remove.
- **F7. CRP > 75 and free fluid > 500 mL.** Both are in the 2017 text (CRP as a peritonitis marker; free fluid without a number in the body). Add to the checkpoint or not.
- **F8. Raised CPK predictor** (surgery node). Not in the 2017 text. Keep, source, or remove.
- **F9. Closed loop directive** (treat as strangulation). The 2017 text says closed-loop signs "suggest the need for surgery without delay" with no grade. Okumura (cite 4) found no significance after adjustment. Andy owns the directive.
- **F10. ICU node graded "definitive" with no source for its management.** Antibiotics and fluid volumes are unsourced. Grade inflation. Andy decides the grade and content.
- **F11. Disposition directives** ("Admit for every obstruction managed here", ICU criteria, "do not discharge from ED") are unsourced clinical directives.
- **F12. Sigmoid-surgery grading.** The result node is graded "definitive". WSES 2023 Rec 5 is strong but based on low or very-low quality evidence (1C). Andy decides whether to change the grade. I did not downgrade, per the Tier 1 rule.
- **F13. Non-candidate list for non-operative trial** ("surgery within 6 weeks", "irreducible hernia", "signs of resolution at admission", "complete obstruction with no colonic air"). Not in the 2017 text as searched. Needs a source or removal.
- **F14. "Recurrence is not changed by contrast" [1]** and Cochrane-related recurrence wording. Not found in the 2017 text passages checked, and not in the Cochrane abstract.
- **F15. Cecal volvulus** has no cited management source. Keep as a labelled consensus directive, or source it.
- **F16. Crohn cross-link** (`ibd-flare` node). Its IV steroid and imaging advice differs from this consult's SBO advice. Andy and the ibd-flare owner decide.

**Citation gate (guideline-versions.md):** WSES 2017 (ten Broek 2018), WSES 2023 (Tian 2023) and ESGE 2020 are NOT in `~/Desktop/claude-brain/wikis/emergency-medicine/guideline-versions.md`. Under the gate I have not applied any new guideline-sourced number or grade change. Those items are below. DOIs were fetched this run (Crossref and the publisher pages): 10.1186/s13017-018-0185-2, 10.1186/s13017-023-00502-x, 10.1055/a-1140-3017. Andy or the table owner should add these rows before any guideline citation is auto-applied.

**Verified numbers withheld pending gate clearance (apply only after Andy OKs the citation):**
- Sigmoid: endoscopic detorsion effective in 60-95%, morbidity about 4%, mortality about 3% (WSES 2023). Long-term recurrence after endoscopic detorsion 43-75%. Upfront colectomy for presentation with ischemia, perforation, peritonitis or shock 5-25%.
- Megacolon: 29-patient series, overall recurrence 36%; 6% if sigmoid-only versus 82% with megacolon (p = .005); no recurrence in the subtotal colectomy group.
- Sigmoid grade for endoscopy: "strong recommendation based on low- or very-low-quality evidence, 1C". The consult currently says "low-quality evidence". Correct wording, flagged because of the gate.
- Mortality risk factors for sigmoid volvulus: age over 60, shock on admission, prior episode (confirmed; already in consult).

**Ranson (acute pancreatitis additions):**
- **R1. Gallstone base deficit.** Nodes say ">4 mEq/L (one reference) vs >5 (other teaching)". The retrieved secondary calculators (MDCalc, medaptly) both give >5 mEq/L for gallstone. The 1982 primary review was not retrievable (no PubMed abstract). Andy decides. Calculator and nodes share the same conflict.
- **R2. Gallstone admission and 48 h cutoffs** (age >70, WBC >18,000, glucose >220, LDH >400, Hct fall >10, BUN rise >2, Ca <8, sequestered fluid >4 L). Secondary sources agree; the primary 1982 review was not read. Mark provisional until read.
- **R3. Gallstone AST cutoff** (C2) and the BUN ">2 after IV hydration" qualifier (C8). Unresolved.
- **R4. Severe threshold at Ranson 3 or higher** ("commonly taught as severe"). Unsourced teaching point. Escalation threshold is Andy's call.
- **R5. Non-gallstone set is now verified** against the 1976 abstract. Node text "verified against the 1976 abstract" is accurate.
- **R6. "Do not de-escalate on the score alone"** (Ranson 0-2 result). A directive without its own source. Andy decides.

**Drug entry and consult gaps:**
- **D1. Diatrizoate (Gastrografin) entry is wired to nothing yet.** The consult has no `#/drug/` link. The entry needs an integrator decision (Andy) before registration.
- **D2. Amlodipine, isosorbide mononitrate, and the diltiazem, verapamil and nitroglycerin additions** in `drugs-sbo-scad.ts` belong to the SCAD / vasospasm work. They were out of scope and NOT reviewed here.
- **D3. Bracco ISI PDF dated 2024-10-02** not read. Dosing or contraindication changes since the 2019 and 2021 DailyMed text are unknown.

**Other:**
- **O1. Toolbar and info pages already appear wired** (`src/data/toolbar-configs.ts` imports `TOOLBAR_SBOV`; `src/data/categories.ts` and `info-pages.ts` reference the consult). The header still says "Not registered". Andy confirms which is live before deploy.
- **O2. Not re-verified this pass:** cites 2, 3, 4, 5, 6, 14, 15 and 16 (only DOIs checked), cite 12 (6.8% and 7.5% perforation figures), Okumura's OR 0.895, and the Zielinski 2010 "100-patient cohort" claim.

### Audit checklist status (Dr. Kitlowski items)
- [x] Strangulation and surgery-trigger thresholds against the WSES 2017 text (results above; directives flagged F3-F8).
- [x] Closed-loop directive and CT ischemia wording (CT wording matches the 2017 text; directive flagged F9).
- [x] Non-operative trial checkpoint sequence (24 h film confirmed; 72 h softer than stated, F4; day-3 drainage not in the text, F5).
- [x] Sigmoid pathway against WSES 2023 full text (matches; numbers withheld pending gate).
- [x] Contrast safety wording (aspiration and do-not-give list; partly confirmed; route off-label, F2).
- [x] Gastrografin label version (2019 Rev. with 2021 DailyMed update read; Bracco 2024 not read, D3).
- [ ] Trial dose and clamp time against primary trials: NOT verified (F1).
- [x] Strangulation and perforation exclusion wording: the perforation wording is a reasonable clinical extension; the 2017 text names peritonitis and ischemia, not perforation as such. Andy to confirm.

### Signoff (Dr. Kitlowski)
The core SBO logic is mostly sound. The sigmoid pathway matches WSES 2023 closely, the LBO stent guidance matches ESGE 2020, and the Ranson non-gallstone set is now primary-sourced. Three things stop me from calling this safe to deploy. The Gastrografin dose conflict (100 mL against a 30-90 mL label maximum) and the off-label NG route are patient-safety items I will not pick between. Several surgery-trigger numbers (72 h, 500 mL on day 3, fever, CPK) are not stated in the WSES 2017 text as written, so they are interpretations and need Andy's decision. The gallstone Ranson base-deficit cutoff conflicts across the sources I could reach. Once Andy decides F1 through F8 and R1, this can be re-audited quickly. The auto-fixes above only correct attributions and label wording to match the primary sources.

## Fixed after Dr. K audit (2026-10-27, mechanical only)
- Diatrizoate (Gastrografin) entry in `src/data/new-content/drugs-sbo-scad.ts` rewritten to show only sourced numbers. Label oral adult dose 30-90 mL (DailyMed setid 8c2340e4, read 2026-10-27) and, as a labelled off-label trial regimen, Cochrane CD004651 (100 mL, NG clamped 60 min, radiograph window 4-24 h; full text via PMC6465054). The 100 mL vs 90 mL label maximum conflict is shown, not resolved. The unsourced "4-6 h film", "2-3 h clamp" and Bologna colon-at-24-h claims were removed. NG use is flagged off-label (label: oral or rectal only). Timing per local protocol.
- `src/data/trees/bowel-obstruction-volvulus.ts`: draft and sign-off wording removed from node text and the stop-criteria list. "Fever" is described as clinical judgment, not a sourced threshold. No number changed.

## Applied recommendations (2026-10-27)

Source read this pass: WSES 2017 (ten Broek 2018, wjes.biomedcentral.com/articles/10.1186/s13017-018-0185-2) full text, Table 5 (full-size table page), and Fig. 2 (algorithm image, read directly). Tian 2023 (WSES 2023) was read by Dr. Kitlowski in the 2026-10-27 audit above and was not re-opened here.

- **Row 2, NG use: applied-with-change.** Nom-entry and the water-soluble contrast stop item now say the NG route is off-label (label: oral or rectal only). Contrast wording is "per local protocol". Source: DailyMed label, as read in the Dr. K pass.
- **Row 3, WBC above 10,000: applied.** Demoted to a peritonitis marker with low sensitivity and specificity, not a stop rule. Removed from the strangulation option, the surgery triggers and the critical action. Source: WSES 2017 lab section ("CRP > 75 and WBC > 10.000/mm3 ... sensitivity and specificity relatively low"). Note: Fig. 2 lists WBC 10.000/mm3 inside its failure box, so the figure and text differ. The text wording was used.
- **Row 4, 72 h: applied-with-change.** Now "consider surgery if no resolution by 72 hours", not a hard stop. Source: WSES 2017 Table 5 Level IIB ("trial of non-operative management can be continued safely for 72 h") and the non-operative section. Note: Fig. 2 labels "persistent obstruction >72 hours" as a failure criterion. The row's wording was applied, so the figure and the row differ.
- **Row 5, day-3 drainage above 500 mL: applied-with-change (kept, attributed).** Kept as a failure criterion, cited to WSES 2017 Fig. 2 ("Drainage volume >500ml on 3rd day"). It is not in the 2017 text body. Source: Fig. 2 read directly.
- **Row 6, fever and CPK: applied.** Fever kept as a clinical sign that needs surgical review (no numeric threshold). CPK bullet removed from the surgery node. Source: WSES 2017 text, no CPK or creatine kinase match. Fig. 2 does not list fever.
- **Row 7, closed loop: applied-with-change.** Now "closed-loop signs: surgical consult now", citing the WSES 2017 CT section ("signs of a closed loop ... suggest the need for surgery without delay"). Okumura (cite 4) conflict is kept and shown. The "Treat as Strangulation" title became "Surgical Consult Now". Source: WSES 2017 CT section, read this pass.
- **Row 8, ICU node grade: applied.** "definitive" changed to "recommended".
- **Row 9, admit-all and ICU criteria: applied.** Labelled "(consensus)" in the disposition node.
- **Row 10, sigmoid surgery grade: applied.** Result node "definitive" changed to "recommended" (WSES 2023, Rec 5, 1C). Not changed, and flagged: the endoscopy node still reads "strong recommendation, low-quality evidence". Dr. K's correction to "low- or very-low-quality evidence, 1C" was not in row 10, so it was left alone.
- **Row 11, non-candidate list: applied (removed four items).** Kept peritonitis, strangulation and bowel ischemia, per WSES 2017 ("unless there are signs of peritonitis, strangulation, or bowel ischemia") and Table 5 Level IIC. Removed "surgery within 6 weeks", "irreducible hernia", "signs of resolution at admission" and "complete obstruction with no colonic air". None of the four is in the 2017 text as read. Note: "complete obstruction with no colonic air" still appears as a CT surgery predictor in the CT node. That is not part of this row and is unsourced. Flagged for Andy.
- **Row 15, integration state: confirmed, no change.** Registered in `src/data/categories.ts`, `src/data/info-pages.ts`, `src/data/trees/index.ts`, `src/services/tree-service.ts`, and via `src/data/new-content/bowel-obstruction-volvulus-toolbar.ts` in `src/data/toolbar-configs.ts`. The tree contains no `#/drug/` link. Calculator `anion-gap` exists in `calculator.ts`.

Not applied by this pass (outside the assigned rows):
- Row 1 (diatrizoate volume) and rows 12-13 (Ranson): other agents own these. No `#/drug/diatrizoate` link was added.
- Row 14 (citation rows in `guideline-versions.md`): not in this consult's assigned rows and not in an owned file. Still needs an owner.

Text edits (tree and info files): `tsc --noEmit --skipLibCheck --noUnusedLocals false` passed after the edits. No commit, push, or deploy.

## Applied recommendations (2026-10-27), drugs pass
Source: `src/data/new-content/drugs-sbo-scad.ts`. The entry stays unlinked from the consult.
- Row 1 diatrizoate volume: **applied**. Label 30-90 mL (oral, GI radiography; not an SBO indication) and off-label trial 100 mL shown side by side, with "no default volume; clinician-directed." Off-label NG use is stated. Source: Gastrografin DailyMed setid 8c2340e4-2b42-45dc-8fac-9960e8172547 (read earlier this sign-off); Cochrane CD004651 (full text via PMC6465054).
- Row 2 NG use: **already applied** (off-label stated in the entry).
- Not applied: no other rows in the drugs scope. Consult-tree rows are outside this pass.

## Applied recommendations (2026-10-27), re-audit pass
Scope: RECOMMENDATIONS.md rows 1-15 for this consult. Sources opened in this pass are listed with each row.

- **Row 1, diatrizoate volume: applied (drugs pass, carried forward).** Label 30-90 mL and off-label trial 100 mL shown side by side, no default. Not re-opened in this pass.
- **Row 2, NG use: applied-with-change.** Off-label route stated in the nom-entry node and the stop page. Not changed in this pass.
- **Row 3, WBC above 10,000/mm3: applied (completed this pass).** The earlier pass said WBC was removed from the surgery triggers, but the surgery node still listed it as a trigger bullet. This pass removed that bullet and added a separate sentence: peritonitis marker, low sensitivity and specificity, not a trigger on its own. Source: WSES 2017 lab section (ten Broek 2018, read in the prior pass).
- **Row 4, 72 h: applied-with-change.** Unchanged in this pass. Source: WSES 2017 text (prior pass).
- **Row 5, day-3 drainage above 500 mL: applied-with-change (kept, attributed to Fig. 2).** Fig. 2 was not viewed again in this pass. Still open for Andy (see F5 below).
- **Row 6, fever and CPK: applied.** Re-checked: no CPK text remains in the tree or info pages.
- **Row 7, closed loop: applied-with-change (completed this pass).** The strangulation node still said "also treat as strangulation" for closed-loop pattern, which conflicted with the closed-loop node. Now: closed-loop pattern means surgical consult now, no non-operative trial. Okumura 2025 (cite 4) verified this pass in the full text (PMC12653211, Table 5): closed loop OR 0.895, 95% CI 0.153-5.22, p = 0.902, not significant. The same full text shows absent bowel wall enhancement as the only independent indicator (OR 19.71), and ascites and mesenteric edema lacking specificity. Both are now stated in the CT node.
- **Row 8, ICU node grade: applied.** "recommended".
- **Row 9, admit-all and ICU criteria: applied.** Labelled consensus.
- **Row 10, sigmoid surgery grade: applied. Endoscopy grade corrected this pass.** The endoscopy node now reads "strong recommendation, based on low- or very-low-quality evidence, 1C", matching WSES 2023 Rec 4 (Tian 2023, PMC10186802, full text read this pass; the same "low- or very-low-quality evidence, 1C" wording appears for Rec 2 and Rec 5). Result node stays "recommended" (Rec 5, 1C).
- **Row 11, non-candidate list: applied.** Four items removed. "Complete obstruction with no colonic air" remains as a CT surgery predictor in the CT node. Not in the 2017 text as read. Flagged (F13).
- **Row 12-13, Ranson gallstone items: not applicable to this consult.** Grep confirms the consult tree has no Ranson node, calculator or link. Those rows belong to the acute-pancreatitis consult.
- **Row 14, citation rows in guideline-versions.md: already present and verified.** WSES 2017, WSES 2023 and ESGE 2020 rows exist with DOI status "fetched 2026-10-27". Crossref was re-checked this pass for Tian 2023 (volume 18, article 34, matches cite 9). The citation gate is cleared for these three.
- **Row 15, integration state: confirmed.** Registered via categories, info pages, tree index, tree service and the toolbar file. The tree has no drug link.

### Numbers added this pass (sourced, gate cleared by the row 14 table entries)
- Sigmoid detorsion effective in 60-95%; morbidity about 4%; mortality about 3% (WSES 2023 text, PMC10186802).
- Upfront colectomy in 5-25% of presentations with ischemia, perforation, peritonitis or septic shock (WSES 2023).
- Long-term recurrence after endoscopic detorsion 43-75% (WSES 2023).
- Megacolon series of 29 patients (Morrissey, cited in WSES 2023): overall recurrence 36%; 6% sigmoid-only vs 82% with megacolon (p = .005); no recurrence after subtotal colectomy.
- LBO perforation: 6.8% stent (100/1467) vs 7.5% transanal tube (13/173), Kitaguchi 2026 Bayesian NMA (Colorectal Dis 28:e70498; abstract read this pass). The "(not re-verified)" tag is removed.

### Removed this pass (unverified claims)
- "Contrast does not change recurrence or recurrence-related surgery [1]" removed from the nom-entry node. Also removed the "[1]" attribution from "Recurrence is not changed by contrast" (nom-resolving) and "does not prove recurrence risk is lower" (nom-check). The same sentence was removed from the Resolving info page. The 2017 text as searched does not contain it. Cochrane abstract does not either. Replaced with "not sourced here".

### Re-audit result (Dr. Kitlowski, 2026-10-27, second pass)
**Verdict: REVISE.** `tsc --noEmit --skipLibCheck --noUnusedLocals false` passes (rc 0). Citation numbers used in the tree (1-6, 8, 9, 11, 12, 14-16) are all defined; 7, 10 and 13 are not used. All internal link targets resolve except as already listed in the prior pass. Crossref confirms DOIs for cites 3, 5, 6, 8, 9, 11, 12, 14, 15, 16 this pass.

Remaining patient-safety flags (Andy decides):
- **F1. Gastrografin dose.** Label 30-90 mL vs off-label trial 100 mL. Both shown, no default (row 1). The Cochrane trial volume is still not verified from full text. Andy confirms he accepts "no default, clinician-directed" wording before any drug link is added.
- **F5. Day-3 drainage above 500 mL as a failure criterion.** Cited to WSES 2017 Fig. 2 (read in the prior pass). The figure is not in the 2017 body text. Andy confirms the figure reading before deploy.
- **F13. "Complete obstruction with no colonic air" as a CT surgery predictor** (CT node, surgery-predictor option, routes to the surgery node). Unsourced. Keep as labelled consensus, source it, or remove it.
- **F10. ICU node** antibiotic and fluid choices are unsourced (labelled as not sourced). Andy decides whether the node stays graded "recommended" with that gap.
- **F16. Crohn cross-link** (`ibd-flare` node `ibd-obstruction`): its steroid and imaging advice differs from this consult. Andy and the ibd-flare owner decide.
- **Stop page "Lethal aspiration is reported"**: qualitative, no source in this pass. Source it or soften it.

Not re-verified this pass (no change, flagged): cites 3 and 5 (abstract titles match; numeric content not read), 6, 14, 15 and 16 (DOIs only), and WSES 2017 Table 5 and Fig. 2 (prior pass).

Verified this pass with no change needed: Zielinski 2010 (cite 2) is a 100-consecutive-patient cohort, and its predictors are free intraperitoneal fluid, mesenteric edema, absent small-bowel feces sign and vomiting, as the tree states. Emmett and Narins 1977 anion-gap citation and corrected-AG formula in `calculator.ts` are consistent with the standard formula.

Approve path: decide F1, F5, F13 and the stop-page aspiration wording. Then re-run this audit; the remaining items are small.
