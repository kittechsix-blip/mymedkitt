# Adult Hypertensive Emergency (htne) — Sign-off

Status: DRAFT for Andy's and Dr. Kitlowski's sign-off. Not deployed. Not committed. Not wired into the registry, Supabase, or the SW cache.

## Files in this pass
- `src/data/trees/hypertensive-emergency-adult.ts` — first-hour node rewritten to the guideline rule; definition inequality changed to >180/>120; pitfalls node linked from first-hour and disposition nodes.
- `src/components/htne-bp-target.ts` — pure calculator rewritten: guideline SBP floor, separately named MAP floors, strict >180/>120 severe-range test, compelling-condition flag, calculator citations renumbered to 1-3 with full references.
- `src/data/new-content/hypertensive-emergency-adult-info.ts` — steps and Do-NOT pages updated to the guideline rule.
- `scripts/new-calculators.test.mjs` — HTNE cases updated. `node --test --test-name-pattern="HTNE"` passes 3/3. Local `tsc --noEmit --skipLibCheck --noUnusedLocals false` is clean.
- Not touched, per instruction: `src/components/calculator.ts`, `src/data/toolbar-configs.ts`, `docs/`, `sw.js`, and the untracked `src/data/new-content/hypertensive-emergency-adult-toolbar.ts`.

## Sources checked in this pass (primary text read or quoted from the publisher page)
- [1] Whelton PK, et al. 2017 ACC/AHA High Blood Pressure Guideline. Hypertension. 2018;71(6):e13-e115. doi:10.1161/HYP.0000000000000065. Section 11.2 text read: synopsis, recommendations 1-3, Table 19, Table 20, supportive text 1-3.
- [2] Marik PE, Varon J. Hypertensive crises: challenges and management. Chest. 2007;131(6):1949-1962. doi:10.1378/chest.06-2490. Read from a third-party PDF copy (anaesthetics.ukzn.ac.za), pages 1949-1951. Confirm against the CHEST publisher copy before sign-off.
- [3] Powers WJ, et al. Guidelines for the Early Management of Patients With Acute Ischemic Stroke: 2019 Update. Stroke. 2019;50:e344-e418. doi:10.1161/STR.0000000000000211. Publisher page read. Table 9 text read. Table 5 (BP options) is an image and was not readable.
- 2025 AHA/ACC guideline (Circulation, doi:10.1161/CIR.0000000000001356; Hypertension, doi:10.1161/HYP.0000000000000249). Only search-result excerpts were read (recommendation 3 and section 6.2 synopsis). The full text was not read. Pending.
- Repo: `src/data/trees/stroke.ts`, `src/data/drug-store.ts` (hydralazine entry), `src/data/drug-store.ts` (no phenoxybenzamine entry).

---

## Conflicts (both sources)

### C1. First-hour BP limit: guideline SBP rule vs draft MAP rule
- **2017 ACC/AHA [1], section 11.2 rec 3 (COR I, LOE C-EO):** "For adults without a compelling condition, SBP should be reduced by no more than 25% within the first hour; then, if stable, to 160/100 mm Hg within the next 2 to 6 hours; and then cautiously to normal during the following 24 to 48 hours." The limit is on SBP, not MAP.
- **2025 AHA/ACC (Circulation, CIR.0000000000001356) rec 3 (COR 1, LOE C-LD), excerpt only:** "For adults with a hypertensive emergency but without a compelling condition, SBP should be reduced with oral or parenteral therapy by no more than 25% within the first hour; then, if stable, to..." The rest of the sentence was cut off in the excerpt. Full text needed. A secondary PMC summary (PMC12817854) says "20-25% within the first hour, then 160/100-110 within 2 to 6 hours." Not primary.
- **Marik & Varon 2007 [2], pp. 1949-1951:** the text gives the immediate goal in hypertensive emergency as "reduce DBP by 10% to 15% or to approximately 110 mm Hg over a period of 30 to 60 min." Aortic dissection: "SBP of ≤120 mm Hg and mean arterial pressure (MAP) 80 mm Hg," reduced within 5-10 minutes. **A MAP-percentage rule was not found in the text read.** Neither the 25% nor the 20-25% MAP figure appears.
- **Draft (old tree and calc):** "MAP drop no more than 25%" and "20-25%," both attributed to Marik & Varon ([2]).
- **Decision in code:** the guideline SBP rule is shown as the sourced general-case rule (SBP floor = 0.75 x SBP, [1]). The Marik & Varon DBP rule is shown as its own named line ([2]). The MAP floors (0.75 x MAP and 0.80 x MAP) are shown under "DRAFT MAP RULES (NOT CONFIRMED)" with no source claimed. Nothing is dosed to them.
- **Difference, listed plainly:**
  - SBP floor (guideline [1]): 0.75 x SBP.
  - MAP floor, draft 25%: 0.75 x MAP. This is a different number. The guideline rule is on SBP. Example: 200/120 gives an SBP floor of 150 and a MAP floor of 110 (MAP 146.7). The two rules imply different targets for the same patient.
  - MAP floor, draft 20%: 0.80 x MAP. No source confirmed.
- **Needed:** Andy and Dr. Kitlowski to pick the rule (SBP per guideline is the proposed default) and to decide whether the MAP percentages are removed. Full 2025 rec 3 text is also needed.

### C2. Compelling conditions: the general rule does not apply
- **2017 [1], rec 2 (COR I, LOE C-EO):** for compelling conditions (aortic dissection, severe preeclampsia or eclampsia, pheochromocytoma crisis), "SBP should be reduced to less than 140 mm Hg during the first hour and to less than 120 mm Hg in aortic dissection."
- **Table 20 [1]:** dissection, esmolol or labetalol; "Requires rapid lowering of SBP to ≤120 mm Hg. Beta blockade should precede vasodilator ... if needed."
- **Marik & Varon 2007 [2]:** dissection SBP ≤120 and MAP 80, within 5-10 min.
- **Draft:** no numeric dissection goal ("SBP and HR goals come from the dissection consult"). The calculator used to print the general floor even when dissection or pheochromocytoma was ticked.
- **Change in code:** the calculator now flags "COMPELLING CONDITION SELECTED" and says the general rule is not the target. No new number was added. "Pregnant" is treated as compelling for this flag, which is broader than the guideline (it names severe preeclampsia or eclampsia). Confirm.
- **Needed:** the dissection SBP goal (both the 2017 value of <120 and Table 20's ≤120 need reconciling with the 2022 ACC/AHA aortic guideline, not yet verified) and the heart-rate goal.

### C3. Hypertensive emergency BP definition (non-pregnant)
- **2017 [1], section 11.2 synopsis:** "severe elevations in BP (>180/120 mm Hg) associated with evidence of new or worsening target organ damage." Used in code now as SBP >180 and/or DBP >120.
- **2025 AHA/ACC §6.2 synopsis (HYP.0000000000000249), excerpt:** ">180/120 mm Hg associated with evidence of acute target organ damage." Same inequality.
- **Medscape overview (secondary):** cites a 2024 AHA scientific statement as "above 180/110-120." This is a different DBP threshold. The 2024 statement is not read.
- **Decision in code:** the guideline's >180 and/or >120 is used. The "pending" note is removed. The 2024 statement's DBP 110 variant is left as an open conflict, not adopted.
- **Edge test:** 180/120 is NOT severe. 181/100 and 170/121 are severe.

### C4. Pregnancy severe range and timing
- **Draft:** SBP >=160 or DBP >=110 mmHg, treat within 30-60 minutes, first-line IV labetalol, IV hydralazine, or IR oral nifedipine. Cited to ACOG Committee Opinion 767 [4] (not verified in this pass).
- **2017 [1], section 11.2 rec 2:** compelling condition SBP goal <140 in the first hour for severe preeclampsia or eclampsia. This is a different goal from the draft's pregnancy branch, which gives no goal after treatment.
- **Drug-store, hydralazine entry:** "Severe hypertension pregnancy (SBP ≥160 or DBP ≥110)" ACOG protocol: 5-10 mg IV, then 10 mg, then switch to labetalol 20 mg IV, "max cumulative 30 mg." Its citations are VAD documents, not ACOG.
- **Needed:** ACOG CO 767 read directly to confirm the thresholds, the 30-60 minute window, and the first-line list. Decide whether pregnancy shares the <140 goal in rec 2.

### C5. Hydralazine maximum dose: drug-store vs 2017 guideline
- **Drug-store hydralazine, "Hypertensive emergency":** 10-20 mg IV over 1-2 min, repeat every 20-30 min PRN, **maximum cumulative 40 mg**. Citations: AHA VAD statement 2020 and HFSA/SAEM/ISHLT 2019 consensus.
- **2017 [1], Table 19:** initial 10 mg slow IV, **maximum initial dose 20 mg**, repeat every 4-6 h as needed. Not a cumulative cap. Also: "Unpredictability of response and prolonged duration of action do not make hydralazine a desirable first-line agent."
- **Drug-store pregnancy:** max cumulative 30 mg. Conflicts with the hypertensive-emergency 40 mg cap in the same entry.
- **Not changed:** no dose changed. The tree links `[Hydralazine](#/drug/hydralazine/pregnancy)` and does not state a max dose. Drug-store owner decision.
- **Needed:** one hydralazine dose ceiling for emergency and one for pregnancy, each with a primary source.

### C6. Clevidipine contraindications: tree vs 2017 Table 19
- **Tree (pitfalls and agent node):** "do not use with known hypersensitivity to dihydropyridines, soybean oil, egg, or egg lecithin."
- **2017 [1], Table 19:** "Contraindicated in patients with soybean, soy product, egg, and egg product allergy and in patients with defective lipid metabolism (eg, pathological hyperlipidemia, lipoid nephrosis or acute pancreatitis)."
- **Difference:** the tree omits the lipid-metabolism and acute-pancreatitis contraindications. It adds dihydropyridine hypersensitivity, which is not in Table 19 text read. Not changed in code (contraindication text is clinical). Needed: add or confirm.

### C7. Nicardipine contraindication missing from tree
- **2017 [1], Table 19:** "Contraindicated in advanced aortic stenosis." Not in the tree. Not changed in code. Needed: add or confirm.

### C8. Labetalol screen: tree vs 2017 Table 19
- **Tree:** "avoid in asthma or heart failure ... general pharmacology; source pending."
- **2017 [1], Table 19:** "Contraindicated in reactive airways disease or COPD ... May worsen HF and should not be given in patients with second- or third-degree heart block or bradycardia." This source exists now. The "source pending" marker can be replaced by [1]. Not changed in code. Needed: Andy approval for the citation change.

---

## Open questions

Each item from the original draft and the request.

1. **First-hour wording** (C1). Which rule is the general case: SBP per the 2017 and 2025 guidelines, or the draft MAP rule? Are the MAP percentages removed? Full 2025 rec 3 text needed.
2. **Aortic dissection SBP and HR goals** (C2). 2017: SBP <120 (rec 2) and ≤120 (Table 20). Marik 2007: SBP ≤120, MAP 80 within 5-10 min. Heart-rate goal not found. 2022 ACC/AHA aortic guideline not verified. Needed: Dr. Kitlowski decision.
3. **Ischemic stroke thresholds 185/110 (before lysis) and 180/105 (after lysis).**
   - After lysis, verified: Powers 2019 Table 9 text: "Increase the frequency of BP measurements if SBP is >180 mm Hg or if DBP is >105 mm Hg; administer antihypertensive medications to maintain BP at or below these levels." This matches the repo `stroke.ts` (`BP <180/105 x 24h`).
   - Before lysis, not verified in the primary text read. The 185/110 value is in the repo `stroke.ts` (lines 101, 109, 117, 120, 135) and is attributed to Powers 2019 section 3.2. Table 5 is an image in the publisher HTML and was not readable. Needed: Andy or Dr. Kitlowski to read Table 5 or section 3.2 directly.
   - The draft node does not state either number. It says "stroke consult governs." No change made.
4. **Missing agent doses.** None were added. Only sources already in hand are listed. Dosing lives in the drug store; the tree has none.
   - Nicardipine: 2017 Table 19 usual range 5 mg/h, +2.5 mg/h every 5 min, max 15 mg/h [1]. Needed: compare with the drug-store nicardipine entry.
   - Clevidipine: 2017 Table 19 initial 1-2 mg/h, doubling every 90 s, max 32 mg/h, max duration 72 h [1]. Needed: drug-store entry check.
   - Nitroglycerin IV: 2017 Table 19 initial 5 mcg/min, +5 mcg/min every 3-5 min, max 20 mcg/min [1]. Needed: drug-store check.
   - Labetalol IV: 2017 Table 19 0.3-1.0 mg/kg (max 20 mg) every 10 min, or 0.4-1.0 mg/kg/h up to 3 mg/kg/h, cumulative max 300 mg [1]. Needed: drug-store check.
   - Esmolol: 2017 Table 19 500-1000 mcg/kg over 1 min, then 50 mcg/kg/min, max 200 mcg/kg/min [1]. Needed: drug-store check.
   - Phentolamine: 2017 Table 19 5 mg IV bolus, repeat every 10 min [1]. Needed: drug-store entry (none verified in this pass).
   - Hydralazine: see C5. Needed: one ceiling.
   - Nifedipine IR (pregnancy): no primary dose verified. Needed: ACOG CO 767 read directly.
   - Nitroprusside: 2017 Table 19 row not extracted in this pass. Needed: read the row.
   - Phenoxybenzamine: see Open question 9.
5. **Cocaine or sympathomimetic toxicity node.** No first-line agent in the draft, and none is sourced. 2017 Table 19 (phentolamine row) mentions cocaine toxicity as a catecholamine-excess cause [1]. Dedicated cocaine source needed (AHA, ACC, or toxicology). Chest pain hub (`chest-pain-hub`) governs. Needed: primary source plus Andy decision.
6. **SCAPE node.** Nitrate dosing is not restated. Routed to `scape-nitroglycerin`. 2017 nitroglycerin row [1] (ACS and acute pulmonary edema, do not use in volume depletion) is the only primary nitrate source found. SCAPE-specific source needed.
7. **Sublingual nifedipine source.** Marik & Varon 2007 [2] text: "Due to unpredictable pharmacodynamics, the sublingual and IM route should be avoided." This is a general primary statement for hypertensive emergency and is now available. The pregnancy-specific "never sublingual" claim is cited to ACOG CO 767 [4], not yet verified. Needed: Andy to accept [2] for the general statement, and ACOG read for pregnancy.
8. **Hydralazine maximum dose conflict** (C5). Drug-store 40 mg cumulative (emergency) vs 30 mg (pregnancy) vs 2017 Table 19 (20 mg initial, no cumulative cap). Needed: decision.
9. **Definition source.** Resolved in code: >180 and/or >120 [1] (2017) and §6.2 of 2025 (excerpt). Open: the 2024 AHA scientific statement DBP 110-120 variant (C3). Needed: Andy to confirm 120 as the DBP cutoff.
10. **Missing drug: phenoxybenzamine.** The pheo node says "Oral phenoxybenzamine is the preoperative agent. It is not in the drug store yet." No primary source for phenoxybenzamine was read in this pass. Endocrine Society pheochromocytoma guideline [7] (Lenders 2014) is cited in the draft and not verified. Needed: entry only after a primary source is read and Andy approves.

---

## Unsourced statements

Statements in the tree, info pages, or calculator that do not have a verified primary source in this pass. They remain as written unless marked for change above.

- Tree, exceptions and dispo nodes: ICU or step-down level of care. The 2017 guideline supports ICU admission for hypertensive emergency (rec 1, COR I, LOE B-NR) [1], but not step-down.
- Tree, agent-by-organ: "titratable short-acting IV agent with continuous monitoring." Supported by 2017 supportive text [1] and by Marik & Varon [2]. Cited to [2,4,9] in the tree. Reference [9] (Varon 2008) not verified.
- Tree, nitroglycerin node: PDE-5 inhibitor and preload-dependent-physiology cautions. Not verified in this pass.
- Tree, labetalol: asthma and heart-failure screen (C8).
- Tree, pheochromocytoma: "alpha before beta" order and "IV phentolamine before any beta-blocker." Phentolamine dosing row is in 2017 Table 19 [1] (catecholamine-excess crises). The ordering claim is cited to [7] (not verified).
- Tree, nitroprusside: cyanide toxicity risk and arterial-line requirement. Cited to [9]. Not verified.
- Tree, pregnancy node: 30-60 minute window, first-line agent list, and "escalate early" wording. Cited to [4] ACOG (not verified).
- Tree, Do-NOT page, pregnancy line: "Never sublingual." See Open question 7.
- Tree, ICH node: "evidence for the intensive target is largely post hoc." Cited to [5] Greenberg 2022 (not verified).
- Tree, aortic dissection node: "beta-blocker is first-line under the 2022 ACC/AHA guideline [6]." Guideline cited is 2022 (not verified). The 2017 Table 20 beta-blocker-first statement [1] is verified and could replace or support it.
- Calculator (`htne-bp-target`): "Pregnancy severe range SBP >=160 or DBP >=110." Source pending (C4).
- Calculator: ICH and cocaine and SCAPE lines have no bracket number, deliberately, because no primary source is verified.
- Tree and info citations 3-7 and 9 (Rhoney 2009, ACOG 767, Greenberg 2022, Isselbacher 2022, Lenders 2014, Varon 2008) are full references as written in the draft, not verified in this pass. Verified: [1] Whelton 2017 and [2] Marik 2007 (text read). [8] Powers 2019 (publisher page and DOI read; Table 9 read). Remaining references need checking before they stay.
- Info Do-NOT page: "Do NOT give hydralazine alone for rate control, or labetalol in asthma or heart failure" (C8).
- Info Do-NOT page: "Do NOT give nitroprusside with raised intracranial pressure." The 2017 Table 19 nitroprusside row was not extracted, so the ICP claim is unverified.

Also not verified in this pass: `[Nicardipine]`, `[Clevidipine]`, `[Labetalol]`, `[Esmolol]`, `[Nitroprusside]`, `[Phentolamine]`, `[Nifedipine IR]`, `[Hydralazine]` drug-entry anchor links (these depend on the drug store, not changed here).

---

## Changes made in this pass (for review)

| Item | Before | After |
|---|---|---|
| First-hour rule | "MAP drop 25% or 20-25%, sources disagree" | Guideline SBP rule [1], with Marik & Varon DBP rule [2] as its own line; draft MAP percentages marked unconfirmed |
| Definition | ">=180 and/or >=120, pending" | ">180 and/or >120 [1]", pending note removed |
| Calc citations | [1][2][4][5][6][7][8] printed, array of 4 | Printed [1][2][3] only; array of 3 with full references; stroke printed as [3] (tree uses [8]) |
| Pitfalls reachability | No inbound link | Linked from first-hour node and disposition node |
| Compelling conditions | General floor always printed | Flag added; general floor labelled as not the target |
| Tests | floor25/floor20, >=180 | sbpFloor25/mapFloor25/mapFloor20, strict >180, compelling flag; 3/3 pass |

Reachability check: the info page and the critical-action list also point to `hypertensive-emergency-adult-pitfalls`. Node IDs referenced in the edited text (`first-hour`, `pitfalls`, `dispo`) exist in `HTNE_NODES`.

---

## Sign-off checklist

Andy
- [ ] C1: pick the general first-hour rule (guideline SBP, per proposal) and decide on the draft MAP percentages (remove or keep as unconfirmed)
- [ ] C1: confirm the full 2025 AHA/ACC rec 3 wording (Circulation CIR.0000000000001356)
- [ ] C2: confirm the compelling-condition flag (pregnancy included or only severe preeclampsia or eclampsia)
- [ ] C3: confirm DBP 120 as the emergency cutoff (vs the 2024 AHA statement's 110-120)
- [ ] Open question 3: read Powers 2019 section 3.2 or Table 5 to confirm the pre-lysis <185/110
- [ ] Open question 5 and 6: cocaine and SCAPE primary sources, or accept "no sourced agent" as the final text
- [ ] Open question 7: accept Marik & Varon 2007 for the general sublingual-route statement
- [ ] Open question 8: one hydralazine ceiling for emergency and one for pregnancy
- [ ] Open question 10: phenoxybenzamine (source first, then drug-store entry)
- [ ] Doses: decide which agent doses to add to the drug store from the 2017 Table 19 rows above (none added here)
- [ ] Register `htne-bp-target` in `calculator.ts` and confirm `map-calculator` exists (other session's file, not checked here)

Dr. Kitlowski
- [ ] Dissection SBP and HR goals (Open question 2)
- [ ] Clevidipine contraindication list (C6)
- [ ] Nicardipine aortic stenosis contraindication (C7)
- [ ] Labetalol asthma, COPD, heart-block, and HF screen with [1] Table 19 (C8)
- [ ] Nitroglycerin PDE-5 caution (unsourced)
- [ ] Pregnancy thresholds and 30-60 minute window after reading ACOG CO 767 (C4)
- [ ] Stroke BP thresholds for the stroke branch (Open question 3)
- [ ] Verify the remaining citations 3-7 and 9 before any of them stay in the tree or info pages

## Drug-entry conflicts added at wiring (2026-10-27, both sources shown, none resolved)
Source: `src/data/new-content/drugs-htn.ts`. Shown in the drug entries; Dr. Kitlowski to rule.
- **Labetalol IV bolus:** FDA label 0.25 mg/kg (max 20 mg) over 2 min, repeat 20-80 mg q10 min, total above 300 mg not established. 2017 ACC/AHA Table 19: 0.3-1.0 mg/kg (max 20 mg) q10 min, or infusion 0.4-1.0 mg/kg/h up to 3 mg/kg/h, cumulative up to 300 mg. The weightCalc uses the label value.
- **Esmolol loading:** label (perioperative tachycardia and hypertension) 500 mcg/kg over 1 min, then 50 mcg/kg/min, max 300 mcg/kg/min. 2017 ACC/AHA Table 19: 500-1000 mcg/kg, max 200 mcg/kg/min. The dissection use is off-label relative to the label indication.
- **Phenoxybenzamine final dose (preop, not ED):** Endocrine Society 2014 gives 1 mg/kg/day (start 10 mg BID 10-14 days pre-op). Label gives usually 20-40 mg 2-3 times/day, but its Carcinogenesis section names 20 mg BID as the maximum recommended human dose. The weightCalc uses the guideline value.
- **Phenoxybenzamine stock:** Dibenzyline brand set shows marketing end 02/29/2024. The generic capsule label is the listed product. Confirm local stock.
- **Hint fix (not a dose change):** the tree's nitroglycerin link hint changed from "acute coronary syndrome" to "acs" so it opens the ACS/NSTEMI card.

---

## Dr. Kitlowski audit, 2026-10-27 (verdict: REVISE, not safe to deploy until flagged items are cleared)

Scope: tree `hypertensive-emergency-adult`, info and toolbar new-content, `htne-bp-target` calculator, and every drug entry the tree links (including the drugs-htn additions wired into `drug-store.ts`). Acute pancreatitis Ranson nodes not audited here.

### Primary sources read this run
- **2025 AHA/ACC High Blood Pressure Guideline, section 6.2 and Tables 26 and 27** (publisher page, jacc.org/doi/10.1016/j.jacc.2025.05.007). Recommendations 1 to 3 read in full, Tables 26 and 27 read in full, supportive text for rec 1 read. This settles most of C1, C2, C3 and C5 below.
- **DailyMed / FDA labels:** Brevibloc (esmolol) setid 9a3e69ab-3ffe-33af-e053-2a95a90a6524; Cardene IV (nicardipine) setid a14a6a4d-232b-634f-e053-2a95a90a2323; Cleviprex (clevidipine) FDA 022156 s007; labetalol HCl injection setid abfc6b75-1ed5-41f1-0484-4597488237bc; Dibenzyline (phenoxybenzamine) FDA 008708 s025 (rev. 03/08).
- **Not read this run:** ACOG CO 767 (pregnancy thresholds and first-line list), Powers 2019 Table 5, Greenberg 2022 (ICH), Isselbacher 2022, Lenders 2014 (Endocrine Society), Varon 2008 [9], the 2024 AHA scientific statement, hydralazine, nitroglycerin and phentolamine labels, and the Table 19 rows of the 2017 guideline. Those items stay flagged.

### Citation gate (guideline-versions.md)
- The 2025 AHA/ACC hypertension guideline is NOT in `~/Desktop/claude-brain/wikis/emergency-medicine/guideline-versions.md`. Per the gate it is not applied to any consult text in this audit. Proposed row for Andy to approve: JACC 2025, DOI 10.1016/j.jacc.2025.05.007 (fetched from the publisher page this run). The DOIs in this sign-off for the 2025 guideline (CIR.0000000000001356, HYP.0000000000000249) were NOT verified.
- The 2017 Whelton guideline ([1] in the tree and calculator) is superseded by the 2025 guideline. Every use of [1] now needs Andy's decision.
- Isselbacher 2022 DOI 10.1016/j.jacc.2022.08.004 is listed in the wiki as resolving to an unrelated paper. Citation [6] is unverified until a correct DOI is fetched.

### Auto-fixes applied this run (wording and citations only, no number or directive changed)
1. `drugs-htn.ts`, phenoxybenzamine contraindication: "would be undesirable" changed to "may be undesirable" (label wording, FDA 008708 s025).
2. `drugs-htn.ts`, phenoxybenzamine citations: added the FDA accessdata label I read (008708s025, rev. 03/08) as citation 1. The two DailyMed setids and their "Rev. 11/23" and "7/2026" dates are still unverified and remain listed.
3. `drugs-htn.ts`, esmolol source-conflict note: added the Brevibloc label caps (200 mcg/kg/min for tachycardia, 300 for hypertension). The 300 dose already in the entry is unchanged.
4. `hypertensive-emergency-adult.ts`, pheochromocytoma node: "It is not in the drug store yet" was stale (phenoxybenzamine is wired into ALL_DRUGS). Replaced with a live link `[Phenoxybenzamine](#/drug/phenoxybenzamine/pheochromocytoma)`. The link hint matches the drug's indication.

Typecheck: `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` clean after the edits. No commit, push, deploy or Supabase action.

### Flagged for Andy (clinical numbers, directives, contraindications, or citation gate). Not changed.

**F1. First-hour and 24-48 hour targets (conflict, C1 extended).** 2025 rec 3 (COR 1, LOE C-LD), full text read: "SBP should be reduced with oral or parenteral therapy by no more than 25% within the first hour; then, if stable, to <160/100 mm Hg within the next 2 to 6 hours; and then cautiously to 130 to 140 mm Hg during the next 24 to 48 hours." The draft (tree first-hour node, Steps and Do-NOT info pages, calculator line) says "cautiously to normal over 24 to 48 hours" from the 2017 rule. Both guidelines agree on the 25% SBP limit. They disagree on the 24-48 hour target (normal versus 130-140). Where the draft says "normal", the 2025 guideline gives 130-140. Andy to pick. Until then the consult should not say "normal".

**F2. Disposition (structural).** 2025 rec 1 (COR 1, LOE B-NR): "In adults with a hypertensive emergency (BP >180 and/or >120 mm Hg and evidence of acute target organ damage), admission to an intensive care unit is recommended for continuous monitoring of BP and target organ damage." The draft's dispo node sends "stable after the first hour, organ injury treated" to admit or observe, and the ICU branch is limited to ongoing titration or exceptions. Step-down is not in the guideline. Andy to decide whether the disposition branch changes.

**F3. Clevidipine (multiple).**
- Maximum dose. The label allows up to 32 mg/h with limited experience and states most patients reach 16 mg/h or less. 2025 Table 26 gives "maximum dose 21 mg/h; maximum duration 72 h." The draft's line "Sources agree (label; 2017 ACC/AHA Table 19)" is inaccurate. Andy to pick the ceiling and show both values.
- Contraindications. The draft lists "hypersensitivity to dihydropyridines, soybean oil, egg, or egg lecithin." Label Section 4 lists: (4.1) allergy to soybeans, soy products, eggs or egg products; (4.2) defective lipid metabolism (pathologic hyperlipemia, lipoid nephrosis, or acute pancreatitis accompanied by hyperlipidemia); (4.3) severe aortic stenosis. The draft omits 4.2 and 4.3. Dihydropyridine hypersensitivity is not on the label list. This is a safety omission. Add or confirm.
- Duration. The 72-hour limit ("little experience beyond 72 hours") is missing from the drug addition.

**F4. Labetalol IV bolus (titration number).** The draft says "Repeat 20-80 mg IV every 10 min." The label (Trandate-type injection, setid abfc6b75) says: initial 20 mg (corresponds to 0.25 mg/kg for an 80 kg patient) over 2 minutes, then additional 40 or 80 mg at 10-minute intervals, to a cumulative total of 300 mg. The 20 mg repeat is not in the label. The draft also says "label: safety of total dose above 300 mg is not established," which I could not find in the label text read. The 0.25 mg/kg weightCalc is a label equivalence for an 80 kg patient, not a weight-based label dose. Changing any of these changes a titrated number, so per Dr. K autopilot guardrail this is stopped for Andy. The ACC/AHA 2017 and 2025 table range is 0.3-1.0 mg/kg (max 20 mg), which the draft also shows.

**F5. Hydralazine (existing drug-store entry, linked from the pregnancy node).** The entry's hypertensive-emergency regimen says "10-20 mg IV over 1-2 minutes, repeat q20-30 min PRN, maximum cumulative 40 mg." 2025 Table 26 (and 2017 Table 19) says initial 10 mg slow IV (maximum initial 20 mg), repeat every 4-6 hours as needed, cumulative cap 200 mg/24 h, and calls hydralazine an undesirable first-line agent. The repeat interval conflicts (20-30 min versus 4-6 h). The pregnancy 30 mg cap is unverified. Andy and the drug-store owner decide one ceiling per indication.

**F6. Phentolamine and the cocaine branch (directive).** 2025 Table 26 gives phentolamine IV bolus 5 mg, repeat every 10 minutes, cumulative maximum 50 mg/24 h, and lists cocaine toxicity among catecholamine-excess causes. 2025 Table 27 lists phentolamine for acute catecholamine-excess states. The draft's cocaine branch says "no sourced first-line agent." That is now contradicted by the guideline. The existing phentolamine entry says "5 mg IV or IM," with no repeat interval or cap. The IM route is not in the guideline. Andy decides whether the cocaine branch names an agent, and whether the phentolamine entry gets the repeat interval and cap.

**F7. Dissection goals (open question 2, partly sourced).** 2025 rec 2 (COR 1, LOE C-LD): for a compelling condition, SBP <140 mm Hg for most conditions and <120 mm Hg in aortic dissection during the first hour. Table 27: "Requires rapid lowering of SBP to ≤120 mm Hg... SBP ≤120 mm Hg should be achieved within 20 min"; beta-blockade should precede vasodilator. The draft prints no number. Adding the number changes a directive, so Andy and Dr. K decide. The beta-blocker-first order is already in the draft and is supported by Table 27.

**F8. Compelling conditions other than dissection.** 2025 rec 2 gives SBP <140 mm Hg in the first hour for most compelling conditions (pregnancy-related, pheochromocytoma and others not named). The draft's flag and the calculator flag pregnancy and pheochromocytoma as compelling without a number. Andy confirms whether the <140 goal is added and which conditions it covers.

**F9. Beta-blocker contraindications (new contraindication).** 2025 Table 27: "Acute pulmonary edema: beta blockers contraindicated." ACS contraindications to beta-blockers in the same table: moderate to severe LV failure with pulmonary edema, HR <60, SBP <100, poor peripheral perfusion, second- or third-degree heart block, reactive airways disease. The draft's beta-blocker node lists asthma, bradycardia, heart block, decompensated HF, and cocaine. Pulmonary edema is missing. Add.

**F10. Nitrates.** The nitrate node's PDE-5 caution is supported by 2025 Table 27 ("nitrates given in the presence of PDE-5 inhibitors may induce profound hypotension"). Table 26 adds "Do not use in volume-depleted patients" for nitroglycerin, which the node omits. The existing nitroglycerin ACS entry starts at 5-10 mcg/min. Table 26 starts at 5 mcg/min, +5 every 3-5 min, max 200 mcg/min. Both caution lines need the 2025 citation, which is not yet in the gate table (see above).

**F11. Nitroprusside.** The existing entry matches Table 26 (start 0.3 mcg/kg/min, max 10 mcg/kg/min, titrate every 5 min). The tree cites [9] (Varon 2008, unverified) for "raises intracranial pressure." The 2025 table gives a different reason: "should be avoided in acute cerebrovascular disease unless other agents are not available" (increased mortality). It also gives the cyanide threshold: infusion rate ≥3 mcg/kg/min and/or duration ≥3 days, with thiosulfate or cyanocobalamin for toxicity. Andy decides whether the wording changes and whether the threshold is added. The ICP claim itself is not verified in this pass.

**F12. Pheochromocytoma.** Alpha before beta is still cited to Lenders 2014 (not read). Table 27 names phentolamine and clevidipine and nicardipine for catecholamine excess and does not state an order. The phenoxybenzamine 1 mg/kg/day figure is taken secondhand from a CVS Caremark PA document, which cites Lenders 2014. The Endocrine Society text was not read. The monitoring targets (seated BP <130/80, standing SBP >90) are unverified. Andy decides whether to keep the 1 mg/kg/day weightCalc.

**F13. Phenoxybenzamine label conflict (kept as drafted).** The FDA label (008708 s025) says usual dose 20-40 mg 2-3 times a day, but its Carcinogenesis section names 20 mg BID as the "maximum recommended human dosage." The draft keeps both values and labels the conflict. Confirmed as drafted.

**F14. Definition and C3 (confirmed).** 2025 section 6.2 synopsis and rec 1 use ">180/120 mm Hg" with target organ damage. The draft's >180 and/or >120 matches both guidelines. The 2024 AHA statement's 110-120 variant is not needed. Andy to close C3.

**F15. MAP rules (C1 remainder).** Neither the 2017 nor the 2025 guideline has a MAP percentage. Both use SBP. The draft's MAP-25% and MAP-20% floors (calculator lines "DRAFT MAP RULES") have no source. Recommend removing them from the calculator output. Removal is a change to displayed numbers, so Andy decides.

**F16. Nicardipine (confirmed).** Label (Cardene IV): start 5 mg/h, +2.5 mg/h every 5 min (rapid) to 15 min (gradual), maximum 15 mg/h, restart at 3-5 mg/h after hypotension, contraindicated in advanced aortic stenosis, titrate slowly in heart failure or hepatic or renal impairment. Matches the drug addition and 2025 Table 26. No change.

**F17. Esmolol (confirmed, one note).** Label: loading 500 mcg/kg over 1 min, maintenance 50 mcg/kg/min, maximum 300 mcg/kg/min for hypertension. Matches the draft. The "contraindicated with concurrent beta-blocker therapy" line comes from 2025 Table 26, not the label. The label's contraindications are severe sinus bradycardia, heart block greater than first degree, decompensated HF, and cardiogenic shock. Dissection use is off-label, as the draft already says.

**F18. Stroke thresholds (open question 3).** The 185/110 (pre-lysis) and 180/105 (post-lysis) values are unchanged. 2025 Table 27 points to section 5.3.9.2 for ischemic stroke, which I did not read. Powers 2019 Table 5 is still unread. Andy or Dr. K needs the primary source before the stroke branch is signed.

**F19. Citations still unverified.** ACOG CO 767 [4] (pregnancy thresholds, 30-60 min window, first-line list, and the "never sublingual" line), Greenberg 2022 [5], Isselbacher 2022 [6] (DOI flagged), Lenders 2014 [7], Varon 2008 [9] (PMID 18257607), Rhoney 2009 [3] (not cited in any node text read). Keep or remove each after reading the source.

**F20. Pregnancy and ACOG.** The severe-range threshold (SBP ≥160 or DBP ≥110) and the first-line agents stay unverified until ACOG CO 767 is read. The 2025 Table 27 preferred agents for eclampsia or preeclampsia (hydralazine, labetalol, nicardipine, nifedipine) are consistent with the draft.

**F21. Lower-priority wording.** The labetalol contraindication "second- or third-degree heart block" matches 2025 Table 26, while the label says "greater than first degree heart block." Same meaning, no change made. The stroke citation title in the calculator ("2019 Update to the 2018 Guidelines") differs from the tree title ("2019 Update to Guidelines for Early Management..."). Harmonize after the stroke source is read.

### What Dr. K signs for now
- Dr. K can sign the wording and citation fixes above and the nicardipine, esmolol and phenoxybenzamine (label-based) content.
- Dr. K cannot sign the first-hour target (F1), disposition (F2), clevidipine (F3), labetalol repeat (F4), hydralazine (F5), phentolamine and cocaine (F6), or dissection goals (F7) without Andy's decision.

### Verdict
REVISE. The consult is not safe to deploy as written. It gives a 24-48 hour "normal" target that the 2025 guideline does not give (F1), a disposition that does not follow the 2025 ICU recommendation (F2), and a clevidipine contraindication list that omits severe aortic stenosis and lipid disorders (F3). Once Andy clears F1 to F3, F9 and the citation gate row, the rest of the flagged list can be closed in one more pass.

## Fixed after Dr. K audit (2026-10-27, mechanical only)
- Phenoxybenzamine (`src/data/new-content/drugs-htn.ts`): label maximum 20 mg BID (generic phenoxybenzamine capsules, DailyMed setid 0be6a394, read 2026-10-27, Carcinogenesis section) now shown beside the 1 mg/kg/day Endocrine Society figure. No maxDose was set; the conflict is shown, not resolved. Unsourced "1-2 week pre-operative" duration removed from the entry and from `src/data/trees/hypertensive-emergency-adult.ts`.
- Draft and sign-off wording removed from node text and header in `src/data/trees/hypertensive-emergency-adult.ts`. No number changed.


### Ruling 6 (Andy, 2026-10-27)
Dissection first-hour target RULED: SBP <120 mm Hg in the first hour (2025 AHA/ACC section 6.2, text re-read), HR control first. Added to exc-dissection node with citation [10]. NOTE for re-audit: the same 6.2 sentence says '<140 mm Hg for most other conditions' in the first hour, which differs from the drafted 'SBP no more than 25% in the first hour' general rule; re-check the exact 2025 wording and reconcile with Dr. K before deploy.

### Ruling 7 (Andy, 2026-10-27)
'2025 target only': first-hour node and BP calculator now follow 2025 AHA/ACC section 6.2 + Table 27 exactly: dissection SBP <=120 within 20 min (beta-blocker first); most other compelling conditions SBP <140 in the first hour; pheochromocytoma not an indication for immediate <120/<140; no compelling indication: ~25% SBP reduction in hour 1 then gradual over 24-48 h; avoid SBP 110-139 early without dissection/pheo, esp. SBP >220 (AKI risk). The 2017 '160/100 at 2-6 h' step is removed. NOTE: the 25% rule remains in 2025 for the no-compelling-indication group; so '2025 only' keeps a 25% rule there. Calculator citation [1] is now the 2025 guideline. Still open: MAP-percentage lines (no source), stroke thresholds, drug doses.

## Applied recommendations (2026-10-27), drugs pass
Sources: `src/data/new-content/drugs-htn.ts`, `src/data/drug-store.ts`. Existing-entry changes: `research/new-content/drug-store-changes.md`.
- Row 3 clevidipine: **applied**. Shows 21 mg/h (2025 AHA/ACC Table 26, maximum duration 72 h) and 32 mg/h (Cleviprex label, limited experience). Contraindications (severe aortic stenosis, defective lipid metabolism / pancreatitis with hyperlipidemia, soy/egg) are already in the drug-store entry; no change needed there. **Caveat:** the 2025 guideline pages (publisher and Hypertension journal) returned 403 this run, so Table 26 was not re-opened; the value is from the earlier read recorded above (F3). Re-verify before deploy.
- Row 4 labetalol: **applied**. Label: 20 mg IV over 2 min, then 40-80 mg at 10-minute intervals, cumulative max 300 mg. weightCalc dropped. Source: labetalol HCl injection label (abfc6b75-1ed5-41f1-0484-4597488237bc), read earlier this sign-off.
- Row 5 hydralazine: **applied-with-change**. Hypertensive-emergency row: 10 mg IV, max initial 20 mg, repeat q4-6 h (Table 26; re-open blocked this run, see caveat). The q20-30 min repeat and 40 mg cap are removed. The Table 26 cumulative 200 mg/24 h limit is NOT added; Andy to decide. Pregnancy row: ACOG CO 767 could not be read, so its numbers are **removed-unverified** and replaced by "dose not stated". Existing-entry edit, Andy's OK.
- Row 6 phentolamine and cocaine: **applied-with-change**. Phentolamine entry gains "catecholamine excess including cocaine toxicity: 5 mg IV, repeat every 10 min, cumulative max 50 mg per 24 h" (Table 26, same caveat). The tree-side "benzodiazepine first" wording is a consult-tree change and is not in this drug pass. Existing-entry edit, Andy's OK.
- Row 14 phenoxybenzamine (drug part): **applied**. 1 mg/kg/day weightCalc and Endocrine 1 mg/kg/day figure removed; "start low, titrate, specialist-directed"; label maximum 20 mg BID shown; unverified monitoring targets removed.
- Not applied in this pass: ACOG CO 767 pregnancy numbers (not readable); 2025 Table 26 cumulative 200 mg/24 h for hydralazine (Andy's decision).

---

## Applied recommendations (2026-10-27)

Source of RECOMMENDATIONS.md rows applied to this consult. Read first: `research/new-content/RECOMMENDATIONS.md`. Status key: applied / applied-with-change / removed-unverified / not applied.

### Sources read in this pass
- **2025 AHA/ACC guideline, Circulation (doi:10.1161/CIR.0000000000001356), section 6.2 synopsis, supportive text 1-4, Tables 26 and 27, and section 5.3.9.2 (acute ischemic stroke).** Read from the publisher HTML rendering. The recommendation table cells (COR/LOE wording for recs 1-3) are images and are not in the text read.
- **Cleviprex (clevidipine) label, DailyMed setid a6826aa3-fabb-4ff1-a7a3-cd4c34e3a330.** Read sections 2.2 and 4.1-4.3 via a summarized fetch. The label revision date is not consistent across the page (11/2016 vs 11/2022).
- **Not readable this pass:** JACC 2025 page (HTTP 403), AHA Powers 2019 page (HTTP 403, so Table 5 unread), ACOG CO 767 (the guessed acog.org URL returned 404; search not completed), Elsevier/DOI page for the Isselbacher citation (redirect returned a bare "Redirecting" page, title not confirmed). Firecrawl credits were exhausted mid-pass.

### Row status
- **Row 1, 24-48 h target: applied-with-change.** The verbatim sentence used is the 2025 section 6.2 supportive text for rec 3: "strategies to reduce BP should be more conservative to achieve 25% reduction in the first hour, followed by gradual further reduction within 24 to 48 hours." Its wording is used in the first-hour node, the summary, the Steps page, and the calculator. The word "normal" is gone. NOT applied: the "130 to 140 mm Hg" target and the "<160/100 within 2-6 hours" step from Dr. K's F1 quote. The rec 3 COR/LOE text itself was not readable, so those numbers are not confirmed. Andy's Ruling 7 already removed the 2-6 h step. Needed: Andy and Dr. K confirm the rec 3 sentence against the full text before deploy.
- **Row 2, ICU disposition: not applied (could not confirm).** The COR 1 ICU recommendation text is not in the readable material. The existing ICU branch for ongoing titration, arterial monitoring, and exceptions is unchanged. Needed: rec 1 text from the 2025 guideline.
- **Row 3, clevidipine (node text only): applied-with-change.**
  - Maximum: 21 mg/h (2025 Table 26) shown. The label figure "32 mg/h" is removed because I could not confirm it. The label states "most patients were treated with maximum doses of 16 mg/hour or less," and that sentence is shown.
  - Contraindications (label 4.1-4.3, and 2025 Table 26 for 4.1 and 4.2): soy or egg allergy; defective lipid metabolism (pathologic hyperlipemia, lipoid nephrosis, acute pancreatitis accompanied by hyperlipidemia); severe aortic stenosis. Dihydropyridine hypersensitivity removed (not on the label or in Table 26).
  - Node text changed in the nicardipine/clevidipine node and the pitfalls node. Drug entry untouched (drugs agent).
- **Row 6, cocaine node text: applied-with-change.** Phentolamine 5 mg IV, repeat every 10 minutes, cumulative maximum 50 mg per 24 hours, and cocaine toxicity as a listed catecholamine-excess cause: 2025 Table 26 (verified). "Name benzodiazepine first": NOT applied. No benzodiazepine statement appears in the 2025 Tables 26-27 or the sections read, so I did not write it. Needed: a source and Andy's decision. The phentolamine entry's IM route and repeat interval belong to the drugs agent.
- **Row 8, beta-blocker contraindications: applied.** 2025 Table 27 (ACS row): moderate-to-severe LV failure with pulmonary edema, HR <60, SBP <100, poor peripheral perfusion, second- or third-degree heart block, reactive airways disease. Table 27 (acute pulmonary edema row): beta blockers contraindicated. Labetalol line in pitfalls aligned to Table 26.
- **Row 9, nitrates and nitroprusside: applied.** Nitroglycerin: "Do not use in volume-depleted patients" (Table 26). Nitroprusside: "should be avoided in acute cerebrovascular disease unless other agents are not available" (Table 26). The "raises intracranial pressure [9]" claim is removed from the nitroprusside node, the agent-by-organ node, the pitfalls node, and the Do-NOT page.
- **Row 11, citations: partially applied.**
  - Isselbacher DOI: NOT changed. The DOI 10.1016/j.jacc.2022.08.004 redirects to Elsevier PII S0735109722057692, which I could not identify. Needed: confirm the correct DOI.
  - ACOG CO 767: not read. The numeric severe-range thresholds (SBP >=160 or DBP >=110) and the 30-60 minute window are removed from the pregnancy node, the recommendation, the summary, and the calculator. The calculator's pregnancy severe-range value is now null, and the test is updated. First-line agents (IV labetalol, IV hydralazine, immediate-release oral nifedipine) are kept and cited [4,10]; 2025 Table 27 lists hydralazine, labetalol, nicardipine, and nifedipine for eclampsia or preeclampsia, which is consistent. Needed: read ACOG CO 767 to restore thresholds, and decide on nicardipine.
- **Row 12, stroke thresholds: applied-with-change.** 2025 section 5.3.9.2 (read): the alteplase RCTs required SBP <185 and DBP <110 mm Hg before treatment, and SBP <180 and DBP <105 mm Hg for the first 24 hours after. The ischemic-stroke node now states these and links the stroke consult nodes `stroke-ivt-check` (BP <185/110 before IVT) and `stroke-post-treatment` (BP <180/105 x 24 h). Powers 2019 Table 5 NOT read (HTTP 403). Secondary sources disagree on whether the pre-lysis 185/110 threshold was removed in 2019; this is open. Needed: Table 5 read directly.
- **Row 13, MAP-percentage lines: applied.** Removed the MAP-25% and MAP-20% floors from `computeHtneBpTarget` (no `mapFloor25` or `mapFloor20` returned), from the calculator lines, and from the tests. The threshold note now cites only the 25% SBP limit. Draft tags ("source pending", "not confirmed", "see signoff") removed from calculator and Steps-page text.
- **Row 14, pheochromocytoma node text: applied-with-change.** Added "Start low, titrate, and direct it with a specialist." Alpha-before-beta is kept and still cites [7] (Lenders 2014, not read). Monitoring targets are not in this node. The 1 mg/kg/day weightCalc is the drugs agent's.

### Other edits in this pass (not row-specific, for review)
- First-hour summary and Steps page: the "160/100 at 2-6 hours" step is removed, consistent with Ruling 7. The MAP-percentage sentence is removed.
- Citation [10] text in the consult now says Tables 26-27 and section 5.3.9.2 were read. It no longer claims rec 3 wording was read.
- Stop page: the Do-NOT headings for nitroprusside, labetalol, and cocaine are reworded to match the sourced text.
- Checks: `node --test --test-name-pattern="HTNE" scripts/new-calculators.test.mjs` 3/3 pass. `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` clean.
- No commit, push, deploy, or Supabase action.

---

## Dr. Kitlowski re-audit, 2026-10-27 (after Rulings 6-7 and the applied recommendations)

Scope: tree `hypertensive-emergency-adult.ts`, `hypertensive-emergency-adult-info.ts`, `htne-bp-target.ts` calculator, `drugs-htn.ts` additions and the drug-store entries the tree links (clevidipine, nicardipine, labetalol, esmolol, nitroglycerin, nitroprusside, phentolamine, hydralazine, phenoxybenzamine). Acute pancreatitis Ranson additions are not part of this consult and were not audited here.

### Primary sources this run
- 2025 AHA/ACC HBP guideline (CIR.0000000000001356): section 6.2, rec 1-3 and Tables 26-27 were read in full in the earlier Dr. K pass (F1-F9 above). Publisher re-open this run was not possible (HTTP 403).
- Cleviprex and DailyMed label re-fetch this run: no dosing text extracted (HTML shell). Not re-verified.
- Firecrawl credits exhausted; no new scrape possible this run.
- Citation gate: `~/Desktop/claude-brain/wikis/emergency-medicine/guideline-versions.md` (2025 HBP row, ACOG CO 767 row, Powers 2019 row, 2022 aortic row, all DOI-fetched 2026-10-27).

### Auto-fixes applied this run (wording, citations, and removal of a source that contradicts Ruling 7)
1. `src/data/trees/hypertensive-emergency-adult.ts`, first-hour node: removed the "Marik & Varon (2007) [2]" paragraph that gave a second first-hour goal (DBP down 10-15% or to about 110 over 30-60 min). Ruling 7 set the first-hour node to the 2025 target only; this paragraph contradicted it.
2. `src/components/htne-bp-target.ts`: removed the "MARIK & VARON 2007" output line for the same reason (Ruling 7). The line also carried an unsourced "not outside an ICU-monitored setting" claim.
3. `src/data/trees/hypertensive-emergency-adult.ts`, pitfalls summary: "nitroprusside with raised ICP" changed to "nitroprusside in acute cerebrovascular disease" (matches Row 9; the ICP claim was removed from the node text but not the summary).
4. Citation [4] (ACOG CO 767): DOI 10.1097/AOG.0000000000003075 added (wiki row, fetched 2026-10-27).
5. Citation [6] (2022 ACC/AHA aortic guideline): DOI replaced with the Circulation DOI 10.1161/CIR.0000000000001106, Circulation 2022;146(24), per the wiki row. The JACC DOI 10.1016/j.jacc.2022.08.004 is not used.

Checks after edits: `bunx tsc --noEmit --skipLibCheck --noUnusedLocals false` clean. `node --test --test-name-pattern="HTNE" scripts/new-calculators.test.mjs` 3/3 pass.

### Remaining flags (not changed; each needs Andy's decision or a primary source)

**Patient safety, directive text**
- **P1. Disposition (2025 rec 1, COR 1, LOE B-NR, read in full earlier):** ICU admission is recommended for hypertensive emergency. The dispo node still sends "stable after the first hour, organ injury treated" to admit or observe, and the ICU branch names "ICU or step-down" (step-down is not in the guideline). Row 2 was not applied. Andy to decide the branch.
- **P2. Cocaine or sympathomimetic branch:** the node now names phentolamine 5 mg IV, repeat every 10 min, max 50 mg per 24 h (Table 26). No benzodiazepine or other first-line step is stated, because no source was read for it. Cocaine-associated hypertension is a toxicology decision. Andy and toxicology to decide the first step and whether the phentolamine branch stays in the first position. Until then the branch is incomplete for a clinician acting on it.
- **P3. Labetalol pregnancy entry (`drug-store.ts`, labetalol, indication "Severe hypertension pregnancy"):** still shows the ACOG escalating protocol (20 mg, 40 mg, 80 mg, 80 mg, max 300 mg) and target BP 140-150/90-100. ACOG CO 767 was not read, so these numbers are unverified. Under the removal rule (RECOMMENDATIONS, citation gate and the hydralazine pregnancy precedent) they should be removed or verified. This is a titration number, so it is flagged, not removed.
- **P4. Clevidipine "usual maintenance 4-6 mg/h"** (drug-store acute stroke, ICH and SAH rows, and the drugs-htn hypertensive-emergency addition): not verified against the label or Table 26 this run. Verify or remove.
- **P5. Nitroglycerin ACS start "5-10 mcg/min"** (drug-store): Table 26 gives a start of 5 mcg/min, titrated by 5 mcg/min every 3-5 min, max 200 mcg/min. The existing entry is an existing-entry edit that needs Andy's OK. Conservative default is the 5 mcg/min start.
- **P6. Dispo, first-hour, and compelling-condition goals** (F1, F7, F8 above): the first-hour node follows Ruling 7. The 2025 "<140 mmHg for most compelling conditions" goal is stated for "most other compelling conditions" without naming them. Andy to confirm which conditions the <140 goal covers.
- **P7. Nicardipine drugs-htn text** says "Sources agree (Cardene IV label; 2017 ACC/AHA Table 19)". The 2017 guideline is superseded (see C1 below). Dose content matches the label (F16). Change the citation to the label plus 2025 Table 26 once Andy approves.
- **P8. Nitroprusside drug entry**: the cyanide threshold text ("buffering capacity exceeded in under one hour at 10 mcg/kg/min") is not reconciled with Table 26 (infusion ≥3 mcg/kg/min and/or ≥3 days). Both thresholds should be shown or the entry checked against the label. Not verified this run.
- **P9. Phentolamine entry**: "5 mg IV or IM" is kept. The IM route is label-based for pheochromocytoma (not re-read this run); the repeat interval and cap are from Table 26.

**Citation gate (guideline-versions.md), flagged, not applied**
- **C1. Tree citation [1] and info-page citation [1] are the 2017 ACC/AHA HBP guideline.** The wiki lists it as superseded by the 2025 guideline. The gate says FLAG. The tree uses [1] for definitions and general statements; the calculator uses [1] for the 2025 guideline, so the same number means different documents in two places. Andy to decide: renumber the tree to the 2025 guideline [10] everywhere the statement is still supported, or keep [1] as a labelled historical source.
- **C2. Citation [5] (Greenberg 2022, ICH), [7] (Lenders 2014, pheochromocytoma), [9] (Varon 2008), [3] (Rhoney 2009):** none appear in guideline-versions.md. The ICH branch and the "alpha before beta" claim rest on [5] and [7]. The gate says flag. Keep or remove after the primary source is read.
- **C3. Citation [2] (Marik and Varon 2007):** not a guideline, so the gate does not apply directly. The text was read from a third-party copy in an earlier pass. Confirm against the CHEST publisher copy before deploy.
- **C4. Citation [8] (Powers 2019):** in the wiki table. Table 5 (the pre-lysis 185/110 table) was not read. The consult now cites [10] section 5.3.9.2 for the thresholds, which was read. Read Table 5 to close this.
- **C5. Isselbacher DOI:** corrected above (auto-fix 5). The earlier sign-off note that the JACC DOI was unrelated is contradicted by the 2026-10-27 wiki row. Use the Circulation DOI.

**Consistency**
- **K1. Stroke thresholds (tree stroke node, calculator line, drug-store nicardipine and labetalol rows):** 185/110 before alteplase and 180/105 for 24 h after, from 2025 section 5.3.9.2 (read). The 2019 Table 5 pre-lysis check is still open (C4).
- **K2. Pregnancy severe-range threshold:** removed from the node and calculator (Row 11). The drug-store pregnancy rows still state "SBP ≥160 or DBP ≥110" in the labetalol and nifedipine entries (P3 covers labetalol). Keep the threshold out of every entry until ACOG CO 767 is read.

### Re-derived numbers (primary text read in the earlier pass, unchanged this run)
- Definition: SBP >180 and/or DBP >120 with acute target-organ damage (2025 section 6.2 synopsis, rec 1). Matches the tree and the calculator.
- Dissection: SBP ≤120 mmHg within 20 min, beta-blocker first (2025 Table 27; Ruling 6).
- Most other compelling conditions: SBP <140 mmHg in the first hour (2025 rec 2, read in full earlier).
- General case: SBP reduced by no more than 25% in the first hour, then gradual reduction over 24-48 h (2025 rec 3 supportive text; Ruling 7).
- Labetalol IV: 20 mg over 2 min, then 40-80 mg every 10 min, cumulative max 300 mg (label, abfc6b75). Matches the drugs-htn addition.
- Nicardipine IV: 5 mg/h, +2.5 mg/h every 5-15 min, max 15 mg/h; contraindicated in advanced aortic stenosis (label). Matches.
- Esmolol: loading 500 mcg/kg over 1 min, 50 mcg/kg/min, max 300 mcg/kg/min for hypertension (label). Matches. The beta-blocker contraindication line is from Table 26, not the label.
- Hydralazine (emergency row): 10 mg IV, max initial 20 mg, repeat every 4-6 h (Table 26, read earlier). The cumulative 200 mg per 24 h limit is not added; Andy's decision (open from the earlier pass).
- Phentolamine (catecholamine excess, including cocaine): 5 mg IV, repeat every 10 min, cumulative max 50 mg per 24 h (Table 26, read earlier).
- Phenoxybenzamine: label maximum 20 mg BID shown beside the 1 mg/kg/day Endocrine figure, unresolved (F13). No maxDose set.

### Verdict
**REVISE.** Not safe to deploy. Open patient-safety items: P1 (ICU disposition against 2025 rec 1), P2 (cocaine branch with no first-line step), P3 (unverified labetalol pregnancy titration numbers), P4 (clevidipine maintenance not re-verified), P5 (nitroglycerin start). Each needs Andy's ruling, a primary source, or both. The citation-gate items C1 to C4 must be resolved before the consult is signed. Deploy only after Andy rules on P1 to P5 and C1, and this audit is re-run.


## Patch 2026-10-27 (cocaine and beta-blocker conflict)

- Tree `exc-cocaine` node, summary, recommendation, exceptions list, the beta-blocker node, and the BP-target calculator line (`htne-bp-target.ts`) now say the same thing: benzodiazepine first; avoid pure beta-blockers (propranolol, metoprolol, esmolol) in acute cocaine toxicity; mixed alpha/beta agents (labetalol, carvedilol) are evidence-conflicted and not first line. Phentolamine stays second-line as already written. Citation [11] (McCord 2008) is cited where the statement sits.
- The beta-blocker node now carries a cocaine warning and cites [11]. Its esmolol recommendation is unchanged for non-cocaine heart-rate control.
- Not changed, outside the listed files: the learn cards in `src/data/learn-cards-conditions.ts` (line 574, 581) and stop pages in `src/data/stop-pages/batch-09.ts` (lines 39, 121) say "avoid beta-blockers in cocaine" without the mixed-agent distinction. Andy to decide whether those are patched in a follow-up.
- Note: [11] was read as metadata only (per its citation text), not as full text. The mixed-agent "evidence conflicts" wording rests on the sources already cited for the labetalol drug entry, which are not re-read here.
