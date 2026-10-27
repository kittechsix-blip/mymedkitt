# ARDS and Lung-Protective Ventilation: Sign-off (DRAFT, not deployed)

Status: DRAFT for Andy's sign-off and Dr. Kitlowski's clinical review. Not wired to the deploy pipeline. Nothing here was committed, pushed, or deployed.

## Files
- `src/data/trees/ards.ts`: ARDS tree (`ARDS_NODES`, `ARDS_CITATIONS` 1 to 14, no entry 11). One Berlin node edited (see Changes). No ids or `next` targets changed.
- `src/components/ards-pf-berlin.ts`: P/F and Berlin calculator. New support-mode select and CPAP/NIV cap.
- `src/data/new-content/ards-info.ts`: info pages `ards-stop` and `ards-steps`. Not edited.
- `scripts/new-calculators.test.mjs`: ARDS cases only. Added cap and calculator-gate cases.
- This file.

Not touched (by instruction): `docs/`, `sw.js`, `src/components/calculator.ts`, `src/data/toolbar-configs.ts`, `src/data/info-pages.ts`.

## Changes made in this pass
1. **Berlin CPAP/NIV cap (calculator).** `berlinSeverity(pf, peep, support = 'invasive')`. Non-invasive support caps a ratio at or below 200 at `mild-capped`. Moderate and severe require invasive ventilation with PEEP of 5 or more. The calculator has a new `support` select (not set / invasive / non-invasive / high-flow only). Not set shows the entry prompt. High-flow only shows "not a Berlin support mode" and points to the 2023 global pathway.
2. **Prone line gated to invasive support.** PROSEVA enrolled intubated patients, so the calculator shows the prone-entry line only on invasive support. This is a new decision (see Conflicts C9).
3. **Berlin node (`ards-berlin-check`).** Added one line under the severity cutoffs: moderate and severe need invasive ventilation with PEEP of 5 or more; CPAP or NIV qualifies only for mild. Cited [1].
4. **Tests.** New `ARDS Berlin: CPAP or NIV caps...` and `ARDS Berlin calculator: support mode gates...` cases. Existing cases unchanged. The ARDS cases pass (`node --test scripts/new-calculators.test.mjs`). `tsc --noEmit --skipLibCheck --noUnusedLocals false` reports no ARDS errors.

No existing dose or threshold was changed. Every pre-existing number in `ards.ts` is kept as written.

## Conflicts (both sources; NOT resolved here)

### C1. Starting tidal volume, PBW basis
- **6 mL/kg PBW start:** ARDSNet 2000 trial arm [3]; ESICM 2023 [7] (as written in the tree).
- **8 mL/kg PBW start, step down by 1 mL/kg to 6:** ARDSNet 2008 protocol summary [4].
- **ATS 2024 accepts 4 to 8 mL/kg PBW** [8].
- Both ARDS sources use predicted body weight. The tree says "never actual body weight" in both the critical action and the node.
- Shown in: critical action 2 (`ards-vent-set`), `ards-vent-set`, `ards-stop` (12 mL/kg comparator), `ards-steps`.
- Decision needed: which start is the app's default, and whether the tree shows both or one.

### C2. Pre-existing vent info pages with different basis and thresholds (REPORT ONLY, not edited)
The task named a pre-existing vent info page in `src/data/info-pages.ts`. The two ranges I found are both asthma pages, not ARDS pages:
- `asthma-steps` (info-pages.ts, ~line 13424, heading "6. Vent Settings for Obstructive Physiology"): "Low tidal volume (6-8 mL/kg IBW)", "Permissive hypercapnia is acceptable (pH >7.15)", "Target plateau pressure <30".
- `asthma-vent-strategy` (info-pages.ts, ~line 13557): "Tidal Volume 6-8 mL/kg IBW" in the settings table, "Permissive Hypercapnia: Target pH >7.15". A "Plateau pressure <30" target also appears on the same page (section boundary not re-checked).
- Conflict: these use IBW, and a pH floor of 7.15. The ARDS tree uses PBW, and a pH floor of 7.15 applies only to the VT-raise step (ARDS node `ards-acidosis`).
- Decision needed: whether the IBW wording in the asthma pages is intended for obstructive disease. Not edited.

### C3. Prone session length
- **ESICM 2023 [7]:** prolonged sessions of 16 consecutive hours or more per day, moderate to severe ARDS (as written in `ards-prone-result`).
- **ATS 2024 [8]:** more than 12 h/day in severe ARDS, strong recommendation, moderate certainty.
- The tree shows both and asks the local protocol to decide.
- Internal inconsistency (not edited): `ards-prone-result` body says "moderate to severe ARDS", but its `recommendation` field says "severe ARDS". Decision needed: which population the recommendation covers.

### C4. Neuromuscular blockade: ACURASYS vs ROSE
- **ACURASYS [9]** (Papazian 2010, cisatracurium 48 h, early moderate to severe ARDS): 90-day mortality 31.6% vs 40.7% crude, P=0.08; adjusted HR 0.68 (95% CI 0.48 to 0.98).
- **ROSE [10]** (Moss 2019, cisatracurium 48 h, moderate to severe ARDS, 1006 patients): 90-day mortality 42.5% vs 42.8%, P=0.93; more adverse cardiovascular events in the blockade arm.
- **ESICM 2023 [7]:** recommends against routine continuous blockade in moderate to severe non-COVID ARDS (strong). The tree cites "Recommendation 8.1". Not verified (see Open questions).
- The app follows ESICM and says the trials disagree. Decision needed: confirm the position, and whether ATS 2024's NMB statement should be transcribed (it is not in the tree).

### C5. Driving pressure: no cutoff
- The tree states "This app does not set a bedside cutoff" [5]. The PBW calculator computes driving pressure (plateau minus PEEP) with no threshold.
- Amato 2015 [5] reports an association between driving pressure and survival in pooled trial data. It is not a trial-proven target.
- Decision needed: keep "no cutoff", or add a reference value with its source and label. Not added here.

### C6. PEEP strategy
- **ARDSNet lower-PEEP / higher-FiO2 table [4]:** FiO2 0.3 PEEP 5 up to FiO2 1.0 PEEP 18 to 24. Shown in `ards-oxygenation` as incremental options.
- **Brower 2004 [14]:** higher vs lower PEEP did not show a clear mortality difference. Cited in `ards-oxygenation`.
- The ESICM 2023 PEEP statement is not transcribed in the tree.
- `ards-oxygenation` also says "The higher-PEEP / lower-FiO2 table is not transcribed here", which reads ambiguously next to the lower-PEEP table it does show. Decision needed: which table is authoritative, and whether the note is accurate.

### C7. 2023 global definition vs the Berlin definition
- **Global definition [2]** (Matthay 2024): non-intubated ARDS is met on PaO2/FiO2 ≤300 or SpO2/FiO2 ≤315 (SpO2 ≤97%), with high-flow at 30 L/min or more, or NIV/CPAP with PEEP 5 or more.
- **Berlin [1]:** requires PEEP or CPAP of 5 or more. The calculator now caps CPAP/NIV at mild (see C8).
- The tree says intubated severity keeps Berlin-style cutoffs (`ards-global-2023`). The global document's own intubated severity text was not re-read.
- Non-intubated severity (mild, moderate, severe) under the global definition is not set in the tree.
- A secondary summary (LITFL) states that the global definition requires PEEP of 5 or more for all categories except mild, which can also be met with CPAP of 5 or more. This agrees with the calculator cap. Primary text not opened.
- The tree cites Matthay 2024 [2] for the 2023 global definition, and ESICM 2023 [7] for prone, VT and blockade statements. The ESICM guideline title covers "definition, phenotyping and respiratory support", but the tree does not cite [7] for the definition itself. Decision needed: whether the ESICM definition content should be cited alongside [2].

### C8. Berlin CPAP/NIV cap (implemented; confirm)
- Implemented per the task: CPAP or NIV qualifies only for mild, so a ratio at or below 200 on non-invasive support is shown as `mild-capped`.
- The mild cohort mortality figure (27%, 95% CI 24 to 30) is shown on the capped result, but it comes from the invasive Berlin cohort. Decision needed: whether to show that figure on the capped result at all.
- Secondary sources agree on the cap (LITFL summary; an MDPI snippet). The primary JAMA text was not opened (see Verification).

### C9. Prone entry on non-invasive support (new calculator decision)
- PROSEVA [6] enrolled intubated patients. The calculator shows the prone line only on invasive support. The tree's `ards-prone` node still lists the entry ratio without that restriction.
- Decision needed: confirm the invasive-only gate, and whether the tree node should say the same.

### C10. ECMO gates: EOLIA vs the existing ECMO tree
- **EOLIA [13]** in `ards-rescue-check`: P/F below 50 for more than 3 h; below 80 for more than 6 h; pH below 7.25 with PaCO2 60 or more for more than 6 h, despite optimal ventilation.
- **Existing ECMO tree** (`src/data/trees/ecmo.ts`, line 19 and `ecmo-vv-indications`): "VV-ECMO indication: PaO2/FiO2 <80 on FiO2 100% despite optimal ventilator settings".
- The two thresholds differ in form (duration-based vs a single FiO2-100 cutoff). Not reconciled.
- EOLIA showed a non-significant mortality difference (35% vs 46%, P=0.09) and was stopped for futility. The "stopped for futility" wording is cited to [13] but not re-verified.
- Decision needed: align the ARDS gate with the ECMO tree, or cross-reference only.

## Open questions
1. **Starting VT (C1):** 6 or 8 mL/kg PBW as the default? Show both or one?
2. **Prone session length (C3):** the local ICU protocol decides, or the app gives one number?
3. **Prone population wording:** "moderate to severe" (body) or "severe" (recommendation) in `ards-prone-result`?
4. **NMB (C4):** confirm ESICM "Recommendation 8.1" and its strength. Add ATS 2024's NMB statement? Leave blockade dosing out of scope?
5. **Driving pressure cutoff (C5):** keep "no cutoff", or add a sourced reference value?
6. **PEEP table (C6):** keep the lower-PEEP table only, add the higher-PEEP option, or cite ESICM's PEEP statement?
7. **Non-invasive severity under the global definition (C7):** what grades (mild, moderate, severe) apply to HFNO and NIV patients? The tree gives none.
8. **Global definition ownership (C7):** the tree calls Matthay 2024 "2023 global" and cites ESICM 2023 for the same definition. Which label and citation stay?
9. **Berlin non-invasive mortality figure (C8):** show the invasive-cohort mild figure on a capped result or not?
10. **Prone on non-invasive (C9):** confirm the invasive-only gate.
11. **ECMO thresholds (C10):** EOLIA gate vs ecmo.ts P/F <80 on FiO2 100%.
12. **Sodium bicarbonate in pH <7.15** (`ards-acidosis`): the tree says "may be given per protocol". Confirm the 2008 protocol wording.
13. **Cisatracurium drug entry (see Missing drugs).**

## Unsourced statements
Statements in the ARDS content that have no citation of their own or that are expert practice. Each is listed for Andy to keep, cite, or cut.

**ards.ts**
- `ards-start`: "Immediate: get an ABG on the current PEEP. Start lung-protective settings now." (practice)
- `ards-mimics`: the list of signs (low EF, new arrhythmia, high filling pressures, positive balance, renal failure, large IV volume). Cited [1] for the exclusion principle only.
- `ards-prone`: the pre-turn screening list (lines secured, hemodynamic stability, no unstable spine or pelvic fracture, no recent sternotomy or open abdomen, no active bleeding, no raised ICP concern, facial or airway edema). Self-labelled "expert practice" in the node; not from a cited trial.
- `ards-vt-check`: "Plateau below 25 at VT under 6 mL/kg PBW: may raise VT by 1 mL/kg PBW..." cited [4]. Verify against the 2008 protocol text.
- `ards-vt-check`: "Driving pressure ... is the ventilator variable most associated with survival across pooled ARDS trials [5]". Wording to verify; Amato 2015 is a pooled analysis, not a trial.
- `ards-reduce-vt`: "Look for a bedside cause (chest wall or abdominal loading, auto-PEEP, patient effort)". Practice; not cited.
- `ards-acidosis`: "Sodium bicarbonate may be given per protocol [4]". Verify (open question 12).
- `ards-acidosis`: "Clinical caution (not from the protocol)": raised ICP, RV failure, severe bleeding. Self-labelled; unsourced.
- `ards-fluids`: "Confirm perfusion before diuresing." Practice; not cited.
- `ards-nmb`: "If blockade is used, document the reason and a reassessment time. A paralyzed patient cannot show neurologic change." Practice; not cited.
- `ards-nmb-check`: "ESICM 2023 ... Recommendation 8.1, strong recommendation, moderate evidence". Number and grading not verified.
- `ards-rescue-check`: "stopped for futility" for EOLIA [13]. Verify.
- `ards-ecmo-referral`: "Have ready before the call" list (PEEP, FiO2, plateau, driving pressure, ABG time, prone sessions, fluid balance, vasopressor dose, contraindications, goals of care). Practice; not cited.
- `ards-icu`: "Handoff must include" list (PBW, VT in mL, plateau, PEEP, prone schedule, fluid strategy, sedation, blockade reassessment, ECMO trigger). Cited [1,3,4] on the node, but these handoff items are not in those sources. Practice.
- `ards-global-2023`: "Practical point: a non-intubated patient on high-flow still needs the mimic check..." Practice.

**ards-info.ts**
- `ards-stop`: no unsourced statements beyond the cited ones. Note that citation 4 in this file has no URL (the full entry in `ARDS_CITATIONS` has one).

**ards-pf-berlin.ts**
- Mortality figures on the mild-capped result (see C8).
- The prone screening note is a tree statement, not a calculator one.

## Missing drugs
- **Cisatracurium:** no drug-store entry found in `src/data` (grep on the full `src/` tree finds the name only in tree text: `ards.ts`, `right-heart-failure.ts`, `asthma-exacerbation.ts`, `peds-asthma-exacerbation.ts`). The ARDS tree names it in `ards-nmb-check` and `ards-nmb` with no `[drug](#/drug/...)` link and no dosing entry. Adding one needs a dose decision and a `weightCalc` decision (per the Weight-Based Dose Calculator rule). Dose is not set in this draft.
- No other drugs are named in the ARDS tree.

## Verification done
- Test run: `node --test scripts/new-calculators.test.mjs`. All ARDS cases pass, including the two new cases. Other suites in the same file were not edited by this pass.
- Type check: `npx tsc --noEmit --skipLibCheck --noUnusedLocals false`, output filtered for ARDS. No ARDS errors.
- Re-read of changed files: `ards.ts` (node `ards-berlin-check`, line 87 added), `ards-pf-berlin.ts`, and `scripts/new-calculators.test.mjs` (ARDS cases, lines 77 to 98). Ids, `next` targets and `citation` arrays are unchanged. Citation numbers used in the tree (1 to 10, 12 to 14) all exist in `ARDS_CITATIONS`.
- **Primary-source re-check: NOT completed.** Firecrawl rate-limited the primary fetches (Berlin, Matthay 2024, ARDSNet 2008, ESICM 2023, ATS 2024, PROSEVA). The only sources read in this pass were search snippets: a LITFL summary of the 2012 and 2023 definitions and an MDPI abstract. Those are secondary. Every citation and number in this file is as written in the draft and still needs primary verification before sign-off.

## Sign-off checklist
- [ ] Andy: starting VT default (C1), with both sources in the note
- [ ] Andy: asthma vent pages (C2) reviewed; IBW wording confirmed as asthma-specific. Not edited here
- [ ] Andy: prone session length (C3) and the prone population wording inconsistency
- [ ] Andy: NMB position, ESICM Recommendation 8.1 number verified, ATS 2024 statement decision (C4)
- [ ] Andy: driving pressure cutoff decision (C5)
- [ ] Andy: PEEP table and PEEP statement decision (C6)
- [ ] Andy: non-invasive severity under the global definition, and which document owns the "2023 definition" label (C7)
- [ ] Andy: Berlin CPAP/NIV cap confirmed (C8), including whether the mild mortality figure stays on the capped result
- [ ] Andy: prone on non-invasive support gated to invasive (C9)
- [ ] Andy: EOLIA gate vs ecmo.ts reconciled or cross-referenced (C10)
- [ ] Andy: cisatracurium drug entry decision (dose and weightCalc)
- [ ] Andy: each unsourced statement kept with a citation, reworded as expert practice, or cut
- [ ] Primary-source re-verification of Berlin, Matthay 2024, ARDSNet 2008, ESICM 2023, ATS 2024, ROSE, ACURASYS, PROSEVA, EOLIA, Amato 2015 (not done in this pass)
- [ ] Dr. Kitlowski: clinical review of the Berlin cap, the prone gate, and the NMB position
- [ ] Integrator: register the calculator in `calculator.ts` (not done here), and add the cisatracurium drug entry if approved

## Open questions for the integrator
- `calculator.ts` must register `ARDS_PF_BERLIN_CALCULATOR` and export the `CalculatorDefinition` interface. The file currently imports it, but that is another session's change; confirm it is wired.
- The new `support` select uses points 0 to 3 with `hideOptionPoints: true`, the same pattern as `mma` and `hcy` in the B12 calculator. Confirm the renderer does not sum select points into a score for this calculator (`results` is empty; `computeResult` reads raw values).
