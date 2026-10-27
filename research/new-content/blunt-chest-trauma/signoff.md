# Blunt Chest Trauma — sign-off (DRAFT, not deployed)

Status: DRAFT for Andy's and Dr. Kitlowski's sign-off. Not wired. Nothing here was deployed, committed or pushed.

## Files
- `src/data/trees/blunt-chest-trauma.ts` — 18 nodes, 5 modules, critical actions, `BCT_CITATIONS` re-exported. Node ids and `next` targets unchanged from revision 2.
- `src/data/new-content/blunt-chest-trauma-citations.ts` — new shared citation list (#1 to #20). The tree and the info module both import it.
- `src/data/new-content/blunt-chest-trauma-info.ts` — no longer imports the tree. Imports `BCT_CITATIONS` from the constants module.
- `src/data/new-content/blunt-chest-trauma-toolbar.ts` — reviewed, not changed. Every target resolves: calculator `ribscore` exists, overlay `blunt-chest-trauma-steps` exists, jump targets exist.
- this file.

## What changed in this pass
- Every "not sourced in this draft" phrase removed from clinician-facing text. Each open item is now listed below.
- Numbers added only where a primary record supports them (see Corrections and Verification).
- Numbers that could not be sourced were removed and the qualitative instruction kept (hemothorax surgical thresholds, decompression site and catheter length, lung-protective numeric targets).
- Citation metadata corrected to the PubMed record (titles, PMIDs, population descriptions). The draft had three title or description errors (#5, #6, #14) and a missing PMID (#3).
- Galvagno 2016 is a pain-management guideline for blunt thoracic trauma, not a rib-fracture guideline. The node text now cites it that way. No rib-fracture-specific EAST guideline was found in this pass.

## Conflicts (both sources)

**C1 Needle decompression site (not coded).**
- Azizi 2021 (Injury 52(2):213-218, PMID 34756305): in overweight and obese adults, chest wall was thinner at the 2nd ICS midclavicular line than at the 4th/5th ICS anterior axillary line (differences significant in those subgroups; normal BMI not significant). Theoretical failure at 2nd ICS MCL: 2.5% (45 mm catheter), 0.8% (50 mm angiocatheter). At 4th/5th ICS AAL: 6.2% and 2.5%. Theoretical only.
- Goh 2018 (Eur J Trauma Emerg Surg 44(5):767-771, PMID 28975363): in Asian trauma patients, lateral approach gave thinner chest wall than the anterior approach. Adequate with 5.0 cm catheter: 78.8% anterior vs 88.2% lateral. With 7.0 cm catheter: 98.2% anterior, 98.5% lateral. Theoretical only.
- Inside this repo the consults disagree: `src/data/trees/pneumothorax.ts` (line ~189) says 14 g at the 2nd ICS MCL, or the 4th/5th ICS AAL. `src/data/trees/chest-tube.ts` (lines ~9 and ~103) says the 4th/5th ICS AAL has "higher success than 2nd ICS". Neither cites a source. Not edited (outside this task).
- Handling in this draft: the site is not coded. The life-threat node says the studies disagree and points to the trauma protocol, citing #18 and #19.

**C2 Catheter length (not coded).** Goh 2018 supports a 7.0 cm catheter over 5.0 cm on CT. Device-standard lengths in the sibling consults are not cited. Andy to choose or leave to protocol.

**C3 Hemothorax surgical thresholds (not coded).**
- `src/data/trees/chest-tube.ts` (lines ~14, ~595, ~622) codes "initial drainage >1500 mL, or >200 mL/hr for 2-4 consecutive hours = emergent thoracotomy". No citation is attached.
- ATLS 10th ed (cited in `traumatic-arrest.ts` and `peds-trauma.ts`) is the likely origin. It was NOT opened in this pass: it is a licensed course manual and no open text was found. No primary source for the numbers was retrieved.
- Handling here: no volume threshold in this tree. The node says to use the institutional trauma protocol. Andy to decide whether the ATLS figures are cited, and whether the chest-tube consult's uncited numbers stay.

**C4 Epidural analgesia (structural; Andy decides).**
- Galvagno 2016 (all adults with blunt thoracic trauma, #16): conditionally recommends epidural analgesia and multimodal analgesia as options; very low-quality evidence.
- Mukherjee 2023 (older adults with multiple rib fractures, #20): "no recommendation for or against ... epidural, or other locoregional analgesia."
- The tree's analgesia branch offers only serratus or erector spinae blocks as adjuncts, with no epidural option. Adding one would change a decision branch, so it is not done here.

**C5 Flail chest surgical outcomes.**
- Meyer 2023 RCT (#14, n=84): hospital LOS longer with fixation (RR 1.48); ICU LOS and ventilator days similar; no QoL benefit at 6 months.
- Dehghan 2021 (#15, conference, not peer-reviewed; n=207): 28-day ventilator-free days did not differ overall; a ventilated subgroup showed about 2.8 more days with surgery.
- The two are not directly comparable: Meyer reports no ventilated-subgroup result. The node keeps both under "mixed"; the "benefit concentrated in ventilated patients" wording now says it comes only from the unpublished conference data.

**C6 Pneumonia with surgery: non-flail vs flail.**
- He 2023 (#3, pooled, mainly non-flail, Asian populations): pneumonia RR 0.46 (95% CI 0.23 to 0.95) favoring fixation.
- Sanchez 2026 (#5, flail chest, claims cohort): pneumonia OR 1.67 favoring no surgery (higher odds with surgery).
- Populations and designs differ. Both are shown; neither is resolved. The node does not promise a pneumonia benefit.

**C7 Restrictive fluid data.** Hu 2026 (#10) reports better survival with restrictive resuscitation in hemorrhagic shock. It is observational and does not address non-shocked contusion. The node shows the data without a fluid target. No conflicting primary source was retrieved.

## Open questions
1. Units of the He 2023 mean difference for mechanical ventilation (-5.23). The abstract gives the number without units. Shown without units.
2. Study-design mix in He 2023 (#3). The node says "mixed designs" from the draft. Not checked against the full text.
3. Serratus block description (#6): the draft claimed rib fracture pain as a target population. The paper is a four-volunteer description. The text was corrected; Andy to confirm the rib-fracture block evidence wanted.
4. Erector spinae plane block: no primary citation in this draft. Source needed if the block is to be discussed.
5. NSAID guidance for rib fractures: no primary source. The ketorolac US labeling (contraindications around bleeding and renal function) is a candidate primary source; not opened in this pass.
6. Ketamine: EAST/CWIS 2023 makes no recommendation. Keep as an adjunct listed in the ladder, or remove?
7. NIPPV (#20) is an older-adult guideline. Applying the conditional recommendation to all adults is an extrapolation. Confirm acceptable.
8. Dehghan 2021 (#15) is an unpublished conference report. Keep, or remove until a peer-reviewed version exists?
9. CWIS 2025 (#13): full text (PMC12893141) not read. Criteria for surgical stabilization are not coded. Read and decide whether to add.
10. Positive-pressure ventilation worsens a flail segment (flail node): consensus statement, no citation.
11. Blunt thoracic aortic and great-vessel screening criteria: no primary source retrieved. The node keeps only "low threshold for aortic imaging per protocol."
12. Hemothorax and tension decompression: ATLS 10th ed source (C3) and needle site (C1).
13. Discharge checklist, return precautions and admission-factor list: expert consensus, no citation.
14. Opioid rescue and acute-trauma dosing: drug entries for fentanyl, hydromorphone, morphine and ketamine in the acute-trauma setting do not exist yet. Doses are not coded here.

## Unsourced statements (kept qualitative; not cited)
- Immediate physiology "decompress, drain, resuscitate and call for help" and "follow the trauma protocol for decompression technique and sequence."
- Lung-protective ventilation "per the unit protocol"; watch plateau pressure and auto-PEEP.
- Tidal volume, PEEP and FiO2: protocol only. No numbers.
- "A plain film may miss fractures and contusion."
- Great-vessel "low threshold for aortic imaging."
- Anticoagulated patients: repeat exam and imaging before discharge.
- Repeat chest imaging when the exam changes, oxygenation falls or the first film was limited.
- Positive-pressure ventilation can worsen a flail segment.
- Pulmonary contusion oxygen target and early support if failing.
- Multimodal and regional analgesia to allow deep breathing (flail node).
- NSAIDs only after bleeding, renal and anticoagulation review.
- Opioid titration to breathing; stacked sedatives raise hypoventilation risk.
- Opioid-sparing effect: not established; do not promise it.
- RibScore "not validated as a mortality predictor": the derivation report does not analyze mortality. This is an absence-based statement.
- Admission cutoffs: none coded.
- Discharge return precautions and reassessment wording.

## Corrections to the draft citations (verified against PubMed records, 2026-10-27)
- #1 RibScore: PMID 26683395 added. Abstract: 385 patients; AUC 0.71, 0.71, 0.75 (pneumonia, respiratory failure, tracheostomy). AUCs now in the node.
- #3 He 2023: title corrected to "...in an Asian population..."; PMID 37868848 added. Pneumonia RR 0.46 (0.23 to 0.95) verified. Draft text "figures taken from the reviewer check" removed.
- #4 NONFLAIL: full title and PMID 31804414 added; authors per record. Results (n=110; 23 randomized; pain 2.9 vs 4.5; pleural complications 0% vs 10.2%) verified. Pneumonia not reported in the abstract.
- #5 Sanchez: title corrected to "Rib Plating Versus Nonsurgical Treatment of Flail Chest: Comparison of Adverse Events in More than 12,500 Patients"; PMID 42715400; authors per record. Draft "national cohort" description replaced with "retrospective matched cohort (claims)". ORs 1.67, 2.00, 3.07 verified.
- #6 Blanco 2013: PMID 23923989 added. The draft said "rib fracture pain as a target population." Not supported: four volunteers. Corrected.
- #10 Hu 2026: title corrected; PMID 42528643 added. Single-center retrospective propensity-matched cohort; 100 per group; ARDS 16% vs 34%; 28-day survival 95% vs 82% (P=0.003). Verified.
- #13 CWIS 2025: metadata verified (J Trauma Acute Care Surg 2025;99(4):522-532; PMID 40802491). Content not read.
- #14 Meyer 2023: full citation added (Ann Surg 2023;278(3):357-365; PMID 37317861; authors Meyer DE et al.). The draft described it as flail evidence; the population is severe chest wall injury without clinical flail in the conclusions. Corrected; results added.
- #15 Dehghan 2021: unchanged; not re-verified.
- #16 Galvagno 2016 (new): pain management for blunt thoracic trauma. J Trauma Acute Care Surg 2016;81(5), doi 10.1097/TA.0000000000001209, PMID 27533913. Page range not verified from the record, so omitted.
- #17 Clancy 2012 (new): "Screening for blunt cardiac injury: an EAST practice management guideline." J Trauma Acute Care Surg 2012;73(5 Suppl 4):S301-S306, doi 10.1097/TA.0b013e318270193a, PMID 23114485. The draft did not cite this guideline; it was added for the BCI screening statement.
- #18 Azizi 2021 (new) and #19 Goh 2018 (new): decompression studies. Cited only for the disagreement (C1).
- #20 Mukherjee 2023 (new): older-adults rib fracture PMG. J Trauma Acute Care Surg 2023;94(3):398-407, PMID 36730672. Used for NIPPV, ketamine, epidural and older-adult ICU/spirometry statements.

## Verification done
- PubMed abstracts retrieved via NCBI E-utilities on 2026-10-27 for PMIDs 26683395, 37868848, 31804414, 42715400, 42528643, 37317861, 23923989, 36730672, 27533913 (via search), 23114485, 34756305, 28975363, 40802491 (metadata). Full texts not read except where stated.
- Galvagno 2016 recommendation wording taken from the PubMed abstract; the EAST page scrape was rate-limited and not read.
- Clancy 2012 recommendation wording taken from the PubMed abstract.
- Reference integrity (run after the edit): 18 nodes; every `next`, option, and critical-action target resolves; info-page `#/node/` links resolve; toolbar targets resolve; every `citation` number used is defined in the citations module and every defined number is used (1, 3, 4, 5, 6, 10, 13 to 20).
- No draft phrases remain in the three edited source files ("not sourced", "not in this draft", "openQuestions").
- Type check: `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` run; no errors reported in the blunt-chest-trauma files.
- Not touched: `src/components/calculator.ts`, `src/data/toolbar-configs.ts` (another session's uncommitted us-iv edits), `docs/`, `sw.js`, Supabase, deploy, git.

## Sign-off checklist

Andy:
- [ ] C1 Needle decompression site: choose, or leave to protocol
- [ ] C2 Catheter length: choose, or leave to protocol
- [ ] C3 Hemothorax surgical thresholds: confirm ATLS source or leave to protocol; decide on the uncited chest-tube numbers
- [ ] C4 Epidural analgesia branch: add an option or not
- [ ] C5 Flail surgical wording (Meyer population, "benefit concentrated in ventilated patients" from unpublished data)
- [ ] C6 Pneumonia wording for both non-flail and flail surgery
- [ ] Open question 5: NSAID rule source
- [ ] Open question 6: keep ketamine adjunct
- [ ] Open question 7: NIPPV applied to all adults or older adults only
- [ ] Open question 8: keep Dehghan 2021 or remove
- [ ] Open question 14: acute-trauma opioid and ketamine doses (drug entries not yet built)

Dr. Kitlowski:
- [ ] Each citation checked against the primary text (full text not read for #3, #4, #5, #10, #14, #16, #17, #18, #19, #20; abstract only)
- [ ] Decompression wording (life-threat node) reviewed
- [ ] BCI screening wording ("obtain" ECG and troponin I; ruled out only when both normal; echo for hypotension/arrhythmia) matches EAST 2012 intent
- [ ] Older-adult ICU and spirometry statement (disposition) reviewed
- [ ] Unsourced statements list reviewed; keep or cite each one

Build (after approval only):
- [ ] Integrator registers the tree (categories, tree-service, trees index) and the info pages; toolbar entry merged into `toolbar-configs.ts` (not touched here)
- [ ] Flow Rider reachability check on all 18 nodes
- [ ] Full deploy through the deploy skill (not run)
