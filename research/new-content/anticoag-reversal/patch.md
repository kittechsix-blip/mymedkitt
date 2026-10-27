# Patch spec: anticoag-reversal, andexanet alfa pathway (DRAFT, not wired, not deployed)

Target: `src/data/trees/anticoag-reversal.ts`. NOT edited in this run. The integrator applies these edits.
New nodes: `src/data/new-content/anticoag-reversal-andexanet-nodes.ts` (exports `ANDEXANET_NODES`, `ANDEXANET_CITATIONS`).
New calculator: `src/components/andexanet-regimen.ts` (exports `ANDEXANET_REGIMEN_CALCULATOR`, `computeAndexanetRegimen`).

## 0. STOP: safety-critical finding (Andy sign-off required before merge)

**Andexanet alfa (Andexxa) US commercial sales ended 12/22/2025.** FDA safety communication (posted 12/18/2025): FDA considers the risks of the product to outweigh its benefits. AstraZeneca submitted a request to voluntarily withdraw the BLA and ended US commercial sales 12/22/2025. [22] (Verified against the FDA page, 2026-10-27.)

The live app still presents andexanet as an active US option in:
- `src/data/trees/anticoag-reversal.ts`: `acr-xa-critical` body bullet [2] (line 169), `treatment.alternative` (line 181), `CRITICAL_ACTIONS` entry (line 446)
- `src/data/drug-store.ts`: `andexanet` entry (line ~11717)
- `src/data/info-pages.ts`: ~line 3254, ~13873, ~21505

These are out of scope for this run. They must change in the same release as this patch. Changing andexanet from "option" to "not available in the US" alters the clinical recommendation text, so it needs Andy's approval.

## 1. New node ids (all in ANDEXANET_NODES)

| id | type | module | purpose |
|---|---|---|---|
| acr-andexanet-status | question | 2 | Entry gate: US withdrawn vs ex-US licensed supply |
| acr-andexanet-unavailable | result | 2 | Not available: 4F-PCC (dose conflict flagged, not resolved) |
| acr-andexanet-agent | question | 2 | Apixaban/rivaroxaban (labeled) vs other |
| acr-andexanet-timing | question | 2 | 8 h or more: low; under 8 h or unknown: dose check. Links calculator |
| acr-andexanet-dose | question | 2 | Apixaban 5 mg or less / rivaroxaban 10 mg or less: low; else high |
| acr-andexanet-low | result | 2 | 400 mg bolus at 30 mg/min, then 4 mg/min x 120 min |
| acr-andexanet-high | result | 2 | 800 mg bolus at 30 mg/min, then 8 mg/min x 120 min |
| acr-andexanet-not-indicated | result | 2 | Other agents: alternatives |
| acr-andexanet-caveats | info | 2 | ANNEXA-I, FDA thrombosis analysis, ANNEXA-4 (pending verification), boxed warning |

Reachability: all nodes are reached from `acr-andexanet-status`. That node must be linked from `acr-xa-critical` (see 2a). `acr-andexanet-caveats` is linked from the low and high bodies, and `acr-andexanet-caveats.next` = `acr-monitoring`, which exists in the live file (line 401).

## 2. Edits to existing content (exact substrings, live file)

### 2a. `acr-xa-critical` body, bullet [2] (same line 169; replace the substring from `**[2] [Andexanet alfa` up to but not including `\n\n**[3] If ingested`)

OLD (exact):
```
**[2] [Andexanet alfa (Andexxa)](#/drug/andexanet/doac reversal)** — specific Xa antidote, AHA/ASA Class I for ICH if available [1]\n• **Low dose** (rivaroxaban ≤10 mg or apixaban ≤5 mg, OR last dose ≥8h ago): 400 mg IV bolus + 4 mg/min × 120 min\n• **High dose** (rivaroxaban >10 mg, apixaban >5 mg, OR unknown dose within 8h): 800 mg IV bolus + 8 mg/min × 120 min\n• ANNEXA-I (NEJM 2024, n=530): superior hemostatic efficacy vs usual care (mostly PCC) in Xa-associated ICH, stopped early [17]\n• ⚠️ **Thrombotic events 10.3% vs 5.6%** (ischemic stroke 6.5% vs 1.5%) with andexanet vs usual care; no mortality benefit (30-day death 27.8% vs 25.5%) [17]\n• ⚠️ NOT shown superior outside ICH; cost ~$25,000+ per dose vs ~$5,000 for PCC\n• Practical: most US centers default to PCC; reserve andexanet for ICH with andexanet on formulary and no acute thrombotic contraindication
```
NEW:
```
**[2] Andexanet alfa (Andexxa): WITHDRAWN IN THE US 12/22/2025.** FDA judged the risks outweigh the benefits. Do not order in the US. [21,22]\n• Ex-US only, if licensed supply is confirmed: [Andexanet pathway](#/node/acr-andexanet-status)\n• Evidence, thrombosis data, and boxed warning: [Andexanet evidence and safety](#/node/acr-andexanet-caveats) [17,22,23]
```
Notes: the old bullet about cost and the "AHA/ASA Class I" claim are removed (no primary source retrieved; see Section 5, C3). The `[Andexanet alfa]` drug link to `#/drug/andexanet/doac reversal` is removed on purpose. Re-add it only if Andy keeps andexanet as an ex-US drug entry.

### 2b. `acr-xa-critical` citation array (line 170)
OLD: `citation: [1, 3, 4, 5, 6, 17],`
NEW: `citation: [1, 3, 4, 5, 6, 17, 21, 22, 23],`

### 2c. `acr-xa-critical` `treatment.alternative` (lines 181 to 186)
OLD (drug line): `drug: 'Andexanet alfa (Andexxa)',`
NEW: `drug: 'Andexanet alfa (Andexxa): NOT AVAILABLE IN US (withdrawn 12/22/2025)',`

OLD (dose line): `dose: 'Low dose: 400 mg IV bolus + 4 mg/min × 120 min | High dose: 800 mg IV bolus + 8 mg/min × 120 min (see body for dose criteria)',`
NEW: `dose: 'Ex-US with licensed supply only. Low: 400 mg IV bolus + 4 mg/min × 120 min. High: 800 mg IV bolus + 8 mg/min × 120 min. Regimen per Andexanet pathway node.',`

OLD (notes line): `notes: 'AHA/ASA Class I for ICH if available. ANNEXA-I 2024: superior hemostasis vs usual care, no mortality benefit, higher thrombotic risk (10.3% vs 5.6%; ischemic stroke 6.5% vs 1.5%). Reserve for Xa-ICH with andexanet on formulary and no acute thrombotic contraindication.',`
NEW: `notes: 'FDA withdrawal 12/22/2025 (risks outweigh benefits). Do not use in the US. Ex-US only; see Andexanet pathway. Thrombosis figures (ANNEXA-I published vs FDA analysis) are in the caveats node.',`

### 2d. `acr-xa-critical` firstLine (4F-PCC) and PCC doses: NO CHANGE. Existing PCC doses are preserved. The dose conflict is flagged in Section 5 (C5), not resolved here.

### 2e. `ANTICOAG_REVERSAL_CRITICAL_ACTIONS` (line 446)
OLD: `{ text: 'Apixaban/rivaroxaban: 4-factor PCC 50 units/kg or andexanet alfa 400-800 mg IV', nodeId: 'acr-xa-critical' },`
NEW: `{ text: 'Apixaban/rivaroxaban: 4-factor PCC (andexanet alfa withdrawn from US market 12/22/2025)', nodeId: 'acr-xa-critical' },`

### 2f. `acr-agent-critical`: no change (routes to acr-xa-critical).

### 2g. Node arrays and citations
- Add `import { ANDEXANET_NODES, ANDEXANET_CITATIONS } from '../new-content/anticoag-reversal-andexanet-nodes.js';` and spread `...ANDEXANET_NODES` into `ANTICOAG_REVERSAL_NODES` (after acr-xa-critical or at the end of module 2).
- Append `ANDEXANET_CITATIONS` after num 20 in `ANTICOAG_REVERSAL_CITATIONS` (line 458 onward). Citation nums 21, 22, 23 are the new ones.
- Citation 17 (ANNEXA-I, NEJM 2024;390(19):1745-1755, doi:10.1056/NEJMoa2313040) already exists. Keep it.

### 2h. Calculator registration (after the other session's calculator.ts/toolbar-configs.ts edits are merged)
- Import `ANDEXANET_REGIMEN_CALCULATOR` from `src/components/andexanet-regimen.ts` and register it under id `andexanet-regimen`. The file does not import `CalculatorDefinition` (that interface is not exported from calculator.ts), so type-check at registration.
- Add a toolbar button `{ action: 'calculator', target: 'andexanet-regimen' }` to the acr-xa-critical toolbar (toolbar-configs.ts), only if Andy keeps the ex-US path.

## 3. Calculator: ANDEXANET_REGIMEN_CALCULATOR (built, not registered)

File: `src/components/andexanet-regimen.ts`. Pure function `computeAndexanetRegimen({agent, lastDoseMg, hoursSinceLastDose})`, returns status `low | high | not-indicated`, with bolus, infusion, total, and 200 mg vial count.

Rule order (ANDEXXA dosing table, timing column "< 8 Hours or Unknown" [21], fact 3-4 below):
1. agent other: not indicated, use 4F-PCC.
2. time since last dose 8 hours or more: LOW (any dose).
3. under 8 h or unknown timing: apixaban <=5 mg LOW, else HIGH; rivaroxaban <=10 mg LOW, else HIGH; unknown dose HIGH.

Output per regimen: bolus 400 mg (low) or 800 mg (high) at 30 mg/min; infusion 4 or 8 mg/min x 120 min; total 880 or 1,760 mg; 5 or 9 vials (200 mg each, rounded up). Each regimen body says US label dosing only (ex-US: local SmPC).

FIX (2026-10-27): the free-text hours number input is removed. Timing is now a select: "Less than 8 hours" (1) / "8 hours or more" (2) / "Unknown" (3). A cleared or non-numeric number box can no longer be stored as 0 hours. Unanswered timing returns a prompt. Only the dose remains a number, and a dose of 0 or less returns the "enter dose" prompt.

Test vectors run in a scratch copy (node strip-types) after the fix, all PASS (14/14):
- apixaban 5 mg, <8 h: LOW
- apixaban 10 mg, <8 h: HIGH
- apixaban 8 mg, 8 h or more: LOW
- apixaban dose unknown, <8 h: HIGH
- apixaban dose unknown, 8 h or more: LOW
- rivaroxaban 15 mg, 8 h or more: LOW
- rivaroxaban 10 mg, <8 h: LOW
- rivaroxaban 20 mg, unknown timing: HIGH
- other agent: not-indicated
- apixaban 9 mg, timing not answered: prompt, no regimen
- dose cleared (0): "Enter dose" prompt
- timing select mapping: 2 -> 8 h, 1 or 3 -> null (under 8 h / unknown)
- pure function: 8 h = low; null hours with 9 mg apixaban = high

Calculator fields: anticoagulant (select), last dose known (select), last dose mg (number), time since last dose (select: under 8 h / 8 h or more / unknown). Incomplete inputs return a prompt, not a regimen. Result colors: `--color-primary` for a regimen; `--color-warning` for not indicated; `--color-text-muted` for incomplete.

## 4. Facts used (the research fact sheet; no other numbers are printed in node text)

Dosing and label (ANDEXXA US PI, rev 03/2025) [21]:
1. Low dose: 400 mg IV bolus at target 30 mg/min, then 4 mg/min x 120 min (480 mg); total 880 mg = 5 x 200 mg vials.
2. High dose: 800 mg IV bolus at 30 mg/min, then 8 mg/min x 120 min (960 mg); total 1,760 mg = 9 vials.
3. Low when apixaban <=5 mg, or rivaroxaban <=10 mg, or last dose >=8 h (any dose).
4. High when apixaban >5 mg, or rivaroxaban >10 mg, or unknown dose, with last dose <8 h or unknown timing.
5. Labeled for apixaban and rivaroxaban only. Not indicated for edoxaban, betrixaban, fondaparinux.
6. UFH/LMWH is not a heparin antidote.
7. Start the infusion within 2 min of finishing the bolus. 0.2 or 0.22 micron in-line, low-protein-binding filter.
8. Anti-Xa assays are unsuitable for measuring reversal after andexanet.
9. Unresponsiveness to UFH (failure to prolong ACT) with serious thrombosis reported.
10. Boxed warning: thromboembolic and ischemic events, cardiac arrest, sudden death.
11. Anti-Xa returns toward placebo about 2 h after bolus or infusion end; re-elevation and incomplete reversal occur.
12. Resume anticoagulation as soon as medically appropriate.

Withdrawal (FDA) [22], VERIFIED 2026-10-27 against https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/update-safety-andexxa:
13. FDA Safety Communication dated 12/18/2025: FDA "considers the risks of the product to outweigh its benefits." AstraZeneca submitted a request to voluntarily withdraw the BLA; no US manufacture or sale after 12/22/2025.
14. FDA analysis of ANNEXA-I (advisory committee 11/21/2024): thrombosis 14.6% vs 6.9%; death related to thrombotic events through day 30 2.5% (6 patients) vs 0.9% (2 patients); of 35 andexanet thrombotic events, 18 (53%) occurred earlier than usual-care events, versus 1 of 16 (6.3%) usual-care events.

Label timing and exclusions [21] (DailyMed setid 2d9d90a6-63e6-46ef-96ff-dd6519ae7b6c), VERIFIED 2026-10-27:
12a. Dosing table timing column header: "< 8 Hours or Unknown" (low/high by agent and dose as in facts 3-4). Unknown timing is therefore in the under-8-hour column. Closes the unsourced-rule gap from the review.
12b. Section 5.1: safety has not been evaluated in patients with a thromboembolic event or disseminated intravascular coagulation within two weeks before the bleed. Basis for the pre-dose screen.

ANNEXA-I (NEJM 2024;390(19):1745-1755, doi:10.1056/NEJMoa2313040) [17], VERIFIED 2026-10-27 against the full text:
15. n=530; ICH within 15 hours of a factor Xa inhibitor. "Of the patients receiving usual care, 85.5% received prothrombin complex concentrate" (Table 2: PCC within 3 h, 195 of 228). The earlier review could not find this figure; it is now sourced.
15a. Exclusion: thrombotic event within 2 weeks before enrollment.
16. Hemostatic efficacy 67.0% (150/224) vs 53.1% (121/228); adjusted difference 13.4 points (95% CI 4.6-22.2; P=0.003). Stopped after an interim analysis met the efficacy criterion.
17. Anti-Xa activity reduction at 1-2 h nadir: 94.5% vs 26.9%.
18. Thrombotic events 27/263 (10.3%) vs 15/267 (5.6%); difference 4.6 points (95% CI 0.1-9.2; P=0.048). Ischemic stroke 17 (6.5%) vs 4 (1.5%).
19. Death 27.8% (73) vs 25.5% (68); adjusted difference 2.5 points (95% CI -5.0 to 10.0; P=0.51). VERIFIED (closes Gap G8 for these figures).

ANNEXA-4 (NEJM 2019;380:1326-1335) [23]:
20. Single-arm, apixaban or rivaroxaban. The fact sheet gave hemostasis ~82%, thrombosis ~10%, 30-day mortality ~14%, all from a secondary summary. NOT printed in node text. Pending verification (Gap G2).

Alternatives (label-consistent):
21. Edoxaban and fondaparinux: no andexanet indication; 4F-PCC is the alternative.
22. Dabigatran: idarucizumab 5 g IV as two 2.5 g doses no more than 15 min apart. Existing app value, NOT re-verified this run (Gap G6).

Not used: cost figures (no primary source), the "AHA/ASA Class I" claim (unverified), and any claim about pre-heparin timing or post-dose monitoring intervals beyond the label facts above.

## 5. Conflicts (for the integrator and Andy)

C1 (CRITICAL, patient-safety tier): US withdrawal (12/22/2025) vs the live app presenting andexanet as an active US option (acr-xa-critical body, treatment.alternative, CRITICAL_ACTIONS, drug-store, info-pages). Recommended: remove as an active US option; ex-US path only if Andy approves. Changing the recommendation needs Andy's OK.

C2 (show both, do not choose): ANNEXA-I thrombosis 10.3% vs 5.6% (published) vs 14.6% vs 6.9% (FDA analysis). Both are printed in acr-andexanet-caveats with sources [17] and [22]. Definitions differ, so neither is picked.

C3 (guideline class, unverified): existing consult says "AHA/ASA Class I for ICH if available." drug-store says "Class 1." The 2022 AHA/ASA ICH guideline (DOI 10.1161/STR.0000000000000407) could not be read this run (403). Recollection is a weaker class (2b) for andexanet and 4F-PCC in FXa-ICH, but this is not verified. Do not print a class until read from the guideline. The new text prints none.

C4 (no dose conflict in andexanet doses): existing low/high criteria and doses match the US label (checked against fact 1-4). No change.

C5 (existing PCC dose conflict, not resolved): CRITICAL_ACTIONS says "4-factor PCC 50 units/kg"; the acr-xa-critical body says 25 units/kg non-CNS (max 2,500 units or fixed 2,000 units) and 50 units/kg CNS. Existing doses unchanged. The new unavailable node flags this and does not choose. Andy to resolve.

C6 (citation policy): existing consult cites [16] = EMCrit IBCC and several non-primary items. Hub and task policy require primary sources. Flagged, not edited here.

C7 (EU vs US bolus duration): the earlier note cites EMA SmPC bolus 15 min (low) / 30 min (high). The SmPC was NOT checked in this fix pass, so the minutes are not printed. Node bodies now say only: "US LABEL DOSING (ANDEXXA PI) ONLY. Ex-US, use the local SmPC; the EU bolus duration differs." Verify the SmPC before any EU use.

C8 (fixed in this pass): unknown-timing rule. The earlier draft cited it to [21] without a quoted source. The DailyMed table (fact 12a) now sources it. Calculator option label and thresholdNote quote the column header.

C9 (fixed in this pass): the ANNEXA-I usual-care PCC figure (85.5%) was not found in the earlier retrieved text. Full NEJM text now confirms it. All ANNEXA-I numbers in the caveats node were checked against that text.

## 6. Gaps (not sourced this run; left out or flagged)

G1. 2022 AHA/ASA ICH guideline class/LOE for andexanet and 4F-PCC in FXa-ICH: blocked (403). Blocks any class statement.
G2. ANNEXA-4 numbers (hemostasis ~82%, thrombosis ~10%, mortality ~14%): secondary summary only; NEJM 403. Not printed in node text.
G3. ACC 2020 ECDP / ISTH 2024 PCC dosing for FXa bleeding: not retrieved. Existing PCC doses not validated here (see C5).
G4. Cost per dose: no primary source. Removed from text.
G5. Non-US regulatory status of andexanet: not checked. Ex-US branch gated behind the status node. OPEN for Andy.
G6. Idarucizumab 5 g, protamine percent for enoxaparin, fondaparinux protamine: existing values not re-verified. OPEN.
G7. Post-withdrawal society guidance (ACC/AHA/ESO/ISTH): not found. Society position cannot be stated. OPEN.
G8. CLOSED 2026-10-27: ANNEXA-I 30-day death (27.8% vs 25.5%) and all other ANNEXA-I figures in the caveats node were checked against the full NEJM text. The FDA thrombosis figures were checked against the FDA page (fact 14). Thrombosis definitions differ by source (C2); both still shown.
G9. EU SmPC bolus duration (C7): not checked. OPEN before EU use.
G10. 2022 AHA/ASA class (G1/C3): still blocked. No class printed. OPEN.

## 8. Fix pass 2026-10-27: applied and open items

Applied to files (this pass only):
- src/components/andexanet-regimen.ts: timing numeric input replaced by a select (no 0-hour storage path); test vectors pass; thresholdNote and citations updated.
- src/data/new-content/anticoag-reversal-andexanet-nodes.ts: US-label caveat added to low and high bodies; pre-dose thrombotic screen added (timing, low, high); unknown-timing rule sourced to the label column; ANNEXA-I header, exclusion, and FDA bullets corrected to the verified text; FDA status wording corrected; citation 22 given the FDA URL.
- research/new-content/anticoag-reversal/patch.md: this file.

Open for Andy (not resolved here):
- O1. Whether andexanet stays as an ex-US pathway at all (C1, changes the live recommendation text).
- O2. C5: PCC dose conflict (50 vs 25 units/kg). Not resolved.
- O3. C3/G10: guideline class for andexanet and 4F-PCC in FXa-ICH. Not printed.
- O4. G5/G9: ex-US regulatory status and EU SmPC bolus duration.
- O5. ANNEXA-4 numbers in the caveats node are still "pending verification", not printed as figures.
- O6. Citation policy (C6): the existing consult's non-primary citations are not fixed here.

## 7. Integration checklist (integrator, not run in this session)

1. Import and spread `ANDEXANET_NODES`; append `ANDEXANET_CITATIONS` (nums 21-23) to the citation list.
2. Apply edits 2a-2g by exact substring. Verify each OLD string is found once before replacing.
3. Confirm every node is reachable from `acr-start` via `acr-xa-critical` -> `acr-andexanet-status`. Flow Rider check: zero orphan nodes.
4. Register `ANDEXANET_REGIMEN_CALCULATOR` (id `andexanet-regimen`) and type-check at registration.
5. Withdrawal changes to drug-store.ts and info-pages.ts ship in the same release (Andy approval required).
6. Dr. Kitlowski clinical audit before deploy. Andy sign-off on C1 and C3.
7. Supabase: this is a structural change (new node ids). Use FULL push mode, not `--update`.
8. No images added. No patient data.
