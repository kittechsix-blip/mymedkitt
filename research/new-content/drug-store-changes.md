# Existing-entry changes, drug-store.ts (2026-10-27, "apply recs" drugs pass)

Andy's explicit OK covers these existing entries: acetaminophen, ibuprofen, hydralazine, bupivacaine, clevidipine, labetalol, phentolamine. Every other dose in drug-store.ts is untouched.
Source for each change is the primary text read for the consult signoff (see the Applied recommendations section in each signoff). Items that could not be re-opened this run are marked.

## acetaminophen (ACETAMINOPHEN)
1. Headache/analgesia row. Old: "Max 4000 mg/24h (2000 mg/24h in hepatic impairment or chronic alcohol use)." New: "Max 4000 mg/24h." Source: Ofirmev US PI (DailyMed 9a38f63a-8852-6dab-e053-2a95a90a90d6). The label has no 2000 mg cap; it says use caution.
2. New row added: "Analgesia - adult IV under 50 kg (Ofirmev label)". New: "15 mg/kg IV every 6 hours (or 12.5 mg/kg every 4 hours). Max 75 mg/kg/day." Source: Ofirmev US PI.
3. Caution. Old: "Reduce max dose to 2 g/day in chronic alcohol use or hepatic impairment". New: "Hepatic impairment, chronic alcohol use, malnutrition, severe hypovolemia: use caution (Ofirmev label; no fixed dose cap stated)." Source: Ofirmev US PI.
4. Citation added: Ofirmev US PI.

## ibuprofen (IBUPROFEN)
1. Pain/Fever (Adult) row. Old: "400-600 mg PO q6-8h PRN (max 3200 mg/day)." New: "400 mg PO every 4-6 hours PRN for mild-to-moderate pain (Rx label). Max 3200 mg/day." Source: Ibuprofen Rx tablet US PI (DailyMed 0fa4cd66-66ad-4ec9-b38c-6b5840df39df).
2. Boxed-warning line added to cautions: serious CV thrombotic events and serious GI bleeding, ulceration and perforation; contraindicated for peri-CABG pain. Source: same label. The boxed text was not re-read line by line this run (fetch blocked); it reflects the standard NSAID boxed warning.
3. Citation added: same DailyMed label.
4. Pediatric row (10 mg/kg, max 400) untouched.

## hydralazine (HYDRALAZINE)
1. Hypertensive-emergency row. Old: "10-20 mg IV over 1-2 minutes. May repeat q20-30 min PRN. Maximum cumulative dose 40 mg." New: "10 mg IV slowly. Maximum initial dose 20 mg. Repeat every 4-6 hours as needed (2025 AHA/ACC Table 26)." Source: 2025 AHA/ACC HBP guideline Table 26 (read in the HTNE pass 2026-10-27; re-open blocked this run, publisher 403). The 40 mg cap and q20-30 min repeat are removed for this indication. The Table 26 cumulative 200 mg/24 h limit is NOT added here; it is recorded in the HTNE signoff for Andy to decide.
2. Pregnancy row. Old: "ACOG protocol: 5-10 mg IV over 2 min, wait 20 min, 10 mg IV, ... switch to labetalol 20 mg IV. Max cumulative 30 mg ..." New: "Dose not stated in this entry. The ACOG Committee Opinion 767 protocol previously shown here is not verified against its source; follow the obstetric severe-hypertension protocol." Source: none. ACOG CO 767 was not readable this run, so the numbers were removed (removed-unverified).
3. Citation added: 2025 AHA/ACC HBP guideline, Table 26.

## bupivacaine (BUPIVACAINE)
1. Caution. Old: "Treatment: lipid emulsion 20% 1.5 mL/kg bolus + 0.25 mL/kg/min infusion." New: "Lipid rescue: follow the local LAST checklist (ASRA 2017); dose per checklist." Source for the pointer: ASRA 2017 checklist (no dose stated in this entry, per the RECOMMENDATIONS lipid-rescue row).
2. Caution added: "Total dose limit: 400 mg per 24 hours (Marcaine label, total daily maximum)." Source: Marcaine US PI (DailyMed 67578b56-7540-487e-1fba-481255620e78), read in the BCT pass 2026-10-27.

## clevidipine (CLEVIDIPINE, existing rows in drug-store.ts)
1. Stroke row. Old: "Max 21 mg/hr (or 1000 mL per 24h due to lipid load)." New: "Maximum 21 mg/hr (2025 AHA/ACC Table 26); label allows up to 32 mg/hr with limited experience (most patients need 16 mg/hr or less). Lipid limit 1000 mL per 24h."
2. ICH row. Old: "Max 21 mg/hr. Smoothest titration agent" New: "Maximum 21 mg/hr (2025 AHA/ACC Table 26); label allows up to 32 mg/hr with limited experience. Smoothest titration agent".
3. SAH row. Old: "Max 21 mg/hr. Ultra-short" New: "Maximum 21 mg/hr (2025 AHA/ACC Table 26); label allows up to 32 mg/hr with limited experience. Ultra-short".
4. Citation added: 2025 AHA/ACC HBP guideline, Table 26.
5. Contraindications: NO change needed. The entry already lists severe aortic stenosis, defective lipid metabolism / acute pancreatitis with hyperlipidemia, and soy/egg allergy. The omission flagged in the HTNE consult is in the consult's clevidipine text, not here.
- Clevidipine addition in drugs-htn.ts (hypertensive emergency row, new content) also updated: 21 mg/h Table 26 maximum and 32 mg/h label value shown; the "average 21 mg/h per 24 h" lipid phrasing removed (not in the label read).

## labetalol (LABETALOL)
- The drug-store labetalol entry is NOT changed. The change is to the hypertensive-emergency addition in drugs-htn.ts (new content): old "0.25 mg/kg IV (max 20 mg) ... Repeat 20-80 mg IV every 10 min ... 2017 ACC/AHA Table 19 ..." and weightCalc {dosePerKg 0.25, maxDose 20}. New: "20 mg IV over 2 minutes first. Then 40-80 mg IV at 10-minute intervals until BP at goal, to a cumulative maximum of 300 mg." weightCalc removed. Source: labetalol HCl injection label (DailyMed setid abfc6b75-1ed5-41f1-0484-4597488237bc), read in the HTNE pass 2026-10-27.

## phentolamine (PHENTOLAMINE)
1. Pheochromocytoma row. Appended: "Catecholamine excess including cocaine toxicity (2025 AHA/ACC Table 26): 5 mg IV bolus, repeat every 10 minutes, cumulative maximum 50 mg per 24 hours." The original "5 mg IV or IM" text is kept. Source: 2025 AHA/ACC HBP guideline Table 26 (read in the HTNE pass; re-open blocked this run).
2. Citation added: 2025 AHA/ACC HBP guideline, Table 26.

## Summary of non-existing-entry changes (new content, in my owned files)
- drugs-htn.ts: phenoxybenzamine (regimen rewritten, weightCalc removed, Endocrine 1 mg/kg/day and monitoring targets removed); clevidipine and labetalol additions as above.
- drugs-ards-bct.ts: ropivacaine label 300 mg shown as label maximum; lipid pointer; cisatracurium Nimbex set and ROSE/ACURASYS details.
- drugs-sbo-scad.ts: diatrizoate "no default volume" line; ISMN, amlodipine, diltiazem, verapamil doses removed (name only, dose per cardiology); ISMN asymmetric 7 h schedule line removed.

## 2026-10-27 safety-gap pass (Andy directed; sources checked as noted)

### hydralazine (HYDRALAZINE)
1. Pregnancy row, indication "Severe hypertension pregnancy (SBP ≥160 or DBP ≥110)". Regimen restored verbatim from commit 2a46c6ef (pre-session text: "ACOG protocol: 5–10 mg IV over 2 min → wait 20 min → 10 mg IV → wait 20 min → switch to labetalol 20 mg IV ..."). Replaces the "Dose not stated ... not verified" wording. Source: ACOG Committee Opinion No. 767, PubMed PMID 30575639 (metadata and abstract checked; the dosing table was not read in full this pass). Andy directed the restore.
2. The indication string is unchanged. The htn-pregnancy deep link `#/drug/hydralazine/severe hypertension pregnancy` matches this row by word match.
3. The non-pregnancy hypertensive-emergency row (10 mg IV, Table 26) is not touched in this pass.

### labetalol (LABETALOL)
- The pregnancy row "Severe hypertension pregnancy (SBP ≥160 or DBP ≥110)" (ACOG escalating protocol: 20 mg IV, 40 mg, 80 mg, 80 mg; max 300 mg) is already identical to commit 2a46c6ef. No change was needed. Verified by diff.

### clevidipine (CLEVIDIPINE)
1. Three dosing rows (acute stroke, ICH, SAH). Old: "Maximum 21 mg/hr (2025 AHA/ACC Table 26); label allows up to 32 mg/hr with limited experience ..." New: label wording. Source: Cleviprex (clevidipine) injectable emulsion, Chiesi USA, DailyMed setid f9290625-b723-4eda-bab8-a97bef6041f6, version 26, published 2025-11-17, read 2026-10-27, section 2.2.
   - Label text: "Most patients have received maximum doses of 16 mg/hour or less. There is limited experience with short-term dosing as high as 32 mg/hour. Because of lipid load restrictions, no more than 1000 mL or an average of 21 mg/hour of Cleviprex infusion is recommended per 24 hour period. There is little experience beyond 72 hours at any dose."
   - Comparison: the label does NOT state 21 mg/h as a maximum infusion rate. Its 21 mg/h is a 24-hour average under a lipid-load limit (1000 mL per 24 h). It is not a storage limit. The "21 mg/h (2025 AHA/ACC Table 26)" value and the label figure are recorded side by side and are not presented as the same statement.
2. Citation added: the Cleviprex US Prescribing Information (DailyMed setid above).
3. Discard rule ("use within 12 hours of puncture", label section 2.3) is already in cautions; no change.

### Not changed in this pass (outside the named files)
- src/data/new-content/drugs-htn.ts still carries the clevidipine "21 mg/h Table 26 maximum" text. Re-word it to the label text above in the next pass.

## Patch 2026-10-27 (Andy-approved)

### labetalol (LABETALOL), indication "ACS / Cocaine-Associated"
1. Regimen. Old: "10-20 mg IV over 2 minutes. May repeat or double dose q10 min (max 300 mg total). Preferred beta-blocker in cocaine-associated STEMI due to combined alpha/beta blockade ... Avoid pure beta-blockers (metoprolol, atenolol) in acute cocaine-associated ACS." New: "Evidence conflicts. Benzodiazepine and a vasodilator come first. Avoid pure beta-blockers (propranolol, metoprolol, esmolol) in acute cocaine toxicity. Mixed alpha/beta agents such as labetalol are not first line." Source for the wording: Andy's patch instruction (evidence conflict stated as such; no primary source asserted for the new sentence).
2. Dose removed. Old "10-20 mg IV over 2 minutes; repeat or double q10 min, max 300 mg" is NOT label-supported. Labetalol HCl injection label (DailyMed setid abfc6b75-1ed5-41f1-0484-4597488237bc, read 2026-10-27) gives 20 mg IV over 2 minutes, then 40 or 80 mg at 10-minute intervals, cumulative max 300 mg. Not written into this row (per instruction: remove unsupported dose). Andy may decide whether to restate the label dose here.
3. Indication string unchanged: 'ACS / Cocaine-Associated'. Link check: `#/drug/labetalol/acs` (src/data/trees/stemi.ts, cocaine-associated STEMI bullet) still matches.
4. CONFLICT NOT FIXED (tree, not owned): stemi.ts cocaine bullet still says "consider [Labetalol](#/drug/labetalol/acs) if beta-blockade needed", which the new row now calls not first line. Tree owner must reconcile.

### diatrizoate (DIATRIZOATE, drugs-sbo-scad.ts)
1. Dosing field. Old: two rows, an SBO row (label 30-90 mL plus 100 mL off-label NG-clamp trial, with conflict text) and a GI-radiography row (label 30-90 mL plus pediatric doses). New: one row, "GI radiography (label, adult oral dose)": "Label adult oral dose: 30-90 mL (11-33 g iodine), depending on the nature of the examination and the size of the patient. Oral or rectal use only. Not for parenteral use. Discard unused portion." Source: GASTROGRAFIN Prescribing information, DailyMed setid 8c2340e4-2b42-45dc-8fac-9960e8172547 (re-opened 2026-10-27; Adult oral dosage section confirmed 30 to 90 mL).
2. Moved to notes. "Off-label trial regimen (Cochrane CD004651 full text via PMC6465054): 100 mL orally or via NG, NG clamped 60 minutes; NG route is off-label per the label." Pediatric label doses (under 5 y 30 mL; 5-10 y 60 mL) also moved from the dosing field to notes so no label text is lost. Source: same label.
3. Unlinked: no `#/drug/diatrizoate` link exists in src/. Unchanged.
4. Indication "Adhesive SBO: water-soluble contrast ... (OFF-LABEL)" stays in the indications list (no dosing row for it now).

### ketorolac (KETOROLAC, drug-store.ts and BCT acute-pain row in drugs-ards-bct.ts)
1. BCT acute-pain row, regimen. Added: "The IV bolus must be given over no less than 15 seconds." Source: Ketorolac tromethamine injection, Hospira US PI (DailyMed setid 8accbb78-fc64-45d5-69b0-35c23a1d2a2e, re-read 2026-10-27, Dosage and Administration).
2. BCT acute-pain row, boxed-warning sentence. Old: "Contraindicated with hypovolemia not corrected, labor and delivery, ..." New: "Hypovolemia should be corrected prior to administration. Contraindicated in labor and delivery, ...". Source: same label. Verified: the label's Dosage and Administration states "Hypovolemia should be corrected prior to the administration of ketorolac tromethamine injection". Uncorrected hypovolemia is NOT listed as a contraindication in the label; the label's contraindication about volume is "advanced renal impairment and ... risk of renal failure due to volume depletion" (Boxed Warning / Contraindications).
3. Existing ketorolac entry (drug-store.ts), cautions. Added two lines: "IV bolus must be given over no less than 15 seconds (Hospira ketorolac injection label, rev 11/2024)" and "Hypovolemia should be corrected prior to administration (same label, Dosage and Administration)". Source: same label. No existing dose changed (SCD 0.5 mg/kg row and migraine 15-30 mg row untouched).
4. Not changed: the BCT row's boxed-warning list (GI, CV, renal, bleeding) and the "Single dose / Multiple dose" label doses; those were not in the patch scope and were already label-consistent on re-read.
