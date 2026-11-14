# Hyperglycemia ED v2: Clinical Audit (Dr. Kitlowski)

Date: 2026-11-14. Scope: `hyperglycemia-ed` redesign (tree, info pages, drug cards, evidence, Plan Builder and calculators, `scripts/hg-plan-builder.test.mjs`). Not staged, committed, or deployed.

## Verdict: CONDITIONAL PASS

- Build and tests: `bunx tsc` clean. `npm test` 163 of 163 pass.
- Source edits made by this audit: none. Every finding below is either a verified-correct item or a clinical judgment or logic change that the autopilot rules send to Andy as FLAGGED.
- Recommend resolving flags 1, 2, 3, 5 and 8 before deploy.

## Sources checked

| Source | What was checked | Result |
|---|---|---|
| ADA Standards 2026, Section 9 (PMC12690185) | Rec 9.20 initiation, basal 0.1 to 0.2 units/kg, prandial 4 units or 10%, metformin eGFR, SGLT2 eGFR, overbasalization | Partial fetch (first 100k of about 358k characters). Confirmed: 9.20 (A1c over 10, glucose 300 or more, or symptoms), 0.1 to 0.2 units/kg, prandial 4 units or 10% of basal, metformin not started under 45 and contraindicated under 30, SGLT2 start at eGFR "above 20". Not found in the fetched text: "2 units every 3 days", the 0.5 units/kg overbasalization threshold, and the "A1c under 8%" basal-reduction rule. |
| Hyperglycemic crises consensus 2024 (Umpierrez) | DKA and HHS thresholds | Full text returned 403. Secondary summaries (ACP, CCJM) agree with the code: DKA pH under 7.3 and/or bicarbonate under 18; HHS glucose 600 or more, effective osmolality over 300 or total over 320, BHB under 3. Exact "or equal to" wording not verified. |
| Glipizide IR label (DailyMed) | Start dose, 2.5 mg groups, max | Label names only geriatric patients and liver disease for the 2.5 mg start. Once-daily max 15 mg, doses above 15 mg divided, total max 40 mg. |
| Lantus label (via search, PDF unreadable) | 10 units or 0.2 units/kg start; 80% NPH to glargine | Consistent: insulin-naive type 2 start is 0.2 units/kg or up to 10 units daily; twice-daily NPH to glargine starts at 80% of total NPH. |
| Lilly Insulin Value Program | Uninsured $35 and card expiry | Confirmed: $35 per 30 days, card expires 12/31/2026. Phone 1-800-545-5979 NOT confirmed (Lilly page lists 1-866-923-1953 for leaving the program). |
| NovoCare MyInsulinRx | $35 per month, 3 vials or 2 pen packs | Confirmed. Phone 1-888-910-0632 NOT confirmed (single third-party listing). |
| Sanofi Insulins Valyou | Lantus $35 | Not checked this pass. Still marked "medium confidence, confirm" in the code. |
| Metformin, sitagliptin, pioglitazone, glimepiride, dapagliflozin labels | Doses and renal rules | Not fetched. Drug-card values are consistent with the labels as I know them; treat as "consistent, not re-verified". |

## Verified correct (no change needed)

- Metformin: ER start 500 mg with dinner, +500 mg weekly, max 2000 mg; IR 500 mg BID start, max 2550 mg/day (label), with the tree's practical 2000 mg ceiling. Not started at eGFR 30 to 44; contraindicated under 30; existing users capped at 1000 mg/day under 45 (ADA/KDIGO convention).
- Sitagliptin renal doses: 100 / 50 / 25 mg daily at eGFR 45+, 30 to 44, under 30.
- Glimepiride: 1 to 2 mg start, 1 mg for elderly or renal impairment, max 8 mg (matches citation 15).
- Pioglitazone: 15 to 30 mg start, max 45 mg, 15 mg cap with strong CYP2C8 inhibitor; no initiation in NYHA III to IV heart failure.
- Dapagliflozin: glycemic 5 mg (may increase to 10 mg); HF and CKD 10 mg; CKD initiation at eGFR 25+ (label).
- Empagliflozin: 10 mg daily; not for glycemic control under eGFR 30.
- Prandial add-on 4 units or 10% of basal (ADA verified). Lispro given within 15 minutes before or after the meal.
- Glargine start 10 units or 0.1 to 0.2 units/kg (ADA). Overbasalization wording needs a source fix (see flag 5).
- Steroid NPH: 0.15 units/kg for prednisone 10 to 40 mg, 0.3 units/kg above 40 mg. Matches the Andy-approved dosing. Math checked: 80 kg on 40 mg = 12 units; 75 kg on 60 mg = 22 units.
- Basal Start, Titrate and Meal + Correction calculators: withhold logic reviewed; fail-closed for unknown or unsafe inputs.
- Plan Builder hard stops (crisis, pregnancy, under 18, type 1 clues, dialysis, eGFR under 15 or unknown, unselected type) all block output. Covered by the test file.
- No em dashes in new text. Two occurrences remain in `hyperglycemia-calculators.ts`: the "—" placeholder value (asserted by the tests) and the official ADA citation title "Standards of Care in Diabetes—2026". Both are kept.
- Citation numbers in tree nodes all resolve to entries 1 to 24 in `HG_CITATIONS`.
- Image assets referenced by the tree and info pages all exist in `docs/images/hyperglycemia-ed/`.

## FLAGGED for Andy (not changed)

1. **Plan Builder ignores "Unknown" insulin product (type D).** Scenarios 1 (titrate basal) and 4 (add mealtime dose) proceed when `insulinKind` is 0 (Unknown). They only withhold for NPH/regular or 70/30. Suggested fix: withhold scenarios 1 and 4 when the product is unknown ("reconcile the product first"). Logic change, so not applied.
2. **Type D, post-meal high, basal-plus-mealtime patient gets a new mealtime dose.** Scenario 4 and tree node `hg-meal-plan` both say "add 4 units or 10%", even for a patient already on mealtime insulin. Such a patient should adjust the existing mealtime dose by 1 to 2 units or 10 to 15%, not add a new one. Clinical logic, so FLAGGED.
3. **Moderate with heavy alcohol: tree and builder disagree.** Tree node `hg-r-met-sita` says "skip metformin, sitagliptin alone", but a moderate patient needs two drugs. The builder gives sitagliptin plus pioglitazone. Andy should choose the two-drug answer, or a one-drug exception with a note.
4. **"A1c under 8%: cut basal 4 units or 10%" is not sourced.** It appears in `hg-meal-plan`, the Plan Builder notes, and the insulin info page, cited to [1] (ADA). ADA 2026 says to consider decreasing basal when prandial is added, especially at the evening meal, and does not give an A1c threshold. Needs a rewording or a different source, and Andy's OK for the rule.
5. **Overbasalization 0.5 units/kg and "+2 units every 3 days" are not found in the ADA text checked.** The ADA fetch was partial (first 100k characters). ADA mentions a bedtime-to-morning glucose difference of 50 mg/dL or more as a reevaluation prompt. The 0.5 units/kg and 2-unit rules drive "stop raising" instructions, so the citation should be re-checked against the full section before deploy.
6. **Glipizide 2.5 mg for CKD or eGFR under 60 is not label-based.** The tree (`hg-r-met-glip`), the Plan Builder (`egfr < 60`), and the drug card say so. The label supports 2.5 mg only for geriatric patients and liver disease. The drug card's parenthetical is accurate; the tree line overstates the label. Clinical judgment, so FLAGGED.
7. **SGLT2 initiation threshold wording.** ADA says "above 20"; the code says "20 or more" (`hg-r-sglt`, drug cards, Plan Builder). Boundary only, minor.
8. **Uninsured phone numbers and the "verified" label.** The info text and citation 20 say the Lilly program was "verified 2026-11-14". Only the card expiry (12/31/2026) is confirmed. The phone 1-800-545-5979 is not, and Lilly's own page lists 1-866-923-1953 for a different purpose. The NovoCare number 1-888-910-0632 is also unconfirmed. Patients will call these numbers, so verify both before deploy. Sanofi Valyou is not checked.
9. **Basal starter calculator, 0.2 units/kg option has no cap.** The Lantus label phrasing is "0.2 units/kg or up to 10 units". The calculator says "no automatic maximum", a deliberate design choice. Andy should confirm.
10. **Steroid NPH citation NCT03511521 not verified.** The dosing was approved by Andy. The trial ID and description in citation 23 were not checked. Confirm the NCT number before deploy.
11. **DKA/HHS threshold wording.** Matches the secondary summaries. The "under" versus "or equal to" boundary and the HHS bicarbonate 15 cutoff were not confirmed against the full consensus text (403 on the primary source).
12. **No explicit eGFR under 15 hard-stop node in the tree.** The Plan Builder withholds, and the labs node and result cards say "stop, call nephrology". The tree's clinical flow still runs past that point. Consider a stop node.
13. **Approved outline is broader than the build (no change needed, FYI).** The outline proposed unsourced conversions (glargine to NPH 2/3 and 1/3 split, lispro to regular same units, 70/30 at 80% of total). The code omits them and withholds to "per pharmacy/endocrine". The code is the more conservative choice; Andy should know the approved outline and the build differ here.

## Not reviewed this pass

- Full ADA Section 9 beyond the first 100k characters.
- Full 2024 consensus text.
- Metformin, sitagliptin, pioglitazone, glimepiride and dapagliflozin label text (values consistent, not re-fetched).
- Sanofi Valyou program terms.
