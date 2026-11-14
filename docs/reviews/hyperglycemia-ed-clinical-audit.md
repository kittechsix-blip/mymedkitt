# Hyperglycemia ED: focused clinical evidence audit

Date: 2026-11-14. Review performed using the Dr. Kitlowski playbook. This is an AI-assisted source/content review, not independent clinician signoff.

## Status

FINAL PASS for the focused clinical content and calculator safety logic reviewed here. All requested corrections were inspected in the final source files. No deployment approval is implied. Compilation, browser checks and deployment verification belong to the implementation workflow and are not certified by this report.

Scope: `src/data/trees/hyperglycemia-ed.ts`, `src/data/new-content/hyperglycemia-info.ts`, `hyperglycemia-drugs.ts`, `hyperglycemia-evidence.ts`, and `src/components/hyperglycemia-calculators.ts`. Existing diabetes/DKA consult treatment content is outside this audit.

## Findings and resolution

- Confirmed corrected: glipizide's 15 mg limit describes the maximum recommended **once-daily regimen**, not an absolute limit on each administration within divided dosing.
- Confirmed corrected: empagliflozin bridge guidance now avoids initiation after prior DKA and cites ADA 2026.
- Confirmed corrected: meal-dose output is withheld below the individualized glucose target; the affirmative safety screen explicitly excludes falling glucose, premixed and concentrated insulin plans. The incorrect Figure 9.4 pinpoint was removed; the retained chapter citation supports the algorithm in Figure 9.5.
- Removing title-only node summaries does not alter the reviewed clinical recommendations. Final visible-node/browser verification remains required.

## Verified numerical recommendations

| Content | Verified interpretation |
| --- | --- |
| DKA | All three components: glucose >=200 mg/dL OR prior diabetes; beta-hydroxybutyrate >=3 mmol/L OR urine ketones >=2+; pH <7.3 OR bicarbonate <18 mmol/L. |
| HHS | All four components: glucose >=600 mg/dL; effective osmolality >300 OR total >320 mOsm/kg; beta-hydroxybutyrate <3 OR urine ketones **<2+**; pH >=7.3 AND bicarbonate >=15. |
| Osmolality | Effective = 2 x measured sodium + glucose/18; total adds BUN/2.8, with glucose/BUN in mg/dL. |
| Insulin consideration | Symptoms/catabolism, HbA1c >10% or glucose >=300 mg/dL prompt consideration, not an automatic prescription or admission. |
| Metformin IR | Label start 500 mg BID or 850 mg daily with meals; increase 500 mg weekly or 850 mg every two weeks; maximum 2,550 mg/day divided. |
| Metformin ER | Selected product: 500 mg with evening meal; increase 500 mg weekly; maximum 2,000 mg/day; swallow whole. Product-specific limits matter. |
| Metformin renal safety | Contraindicated below eGFR 30; initiation at 30-45 not recommended; reassess continuation below 45. Acute illness/AKI precautions remain necessary. |
| Glipizide IR | Usual 5 mg before breakfast, conservative 2.5 mg where appropriate; about 30 minutes before meals; increments 2.5-5 mg separated by at least several days; maximum recommended once-daily regimen 15 mg, daily maximum 40 mg divided. |
| Pioglitazone | Label start 15-30 mg/day; chosen bridge start 15 mg; increments 15 mg; maximum 45 mg/day, or 15 mg with strong CYP2C8 inhibitors. No initiation in NYHA III-IV HF; symptomatic HF avoidance and edema precautions retained. |
| Sitagliptin | 100 mg/day at eGFR >=45; 50 mg at 30 to <45; 25 mg below 30, including dialysis. These are renal tiers, not a titration ladder. |
| Empagliflozin | 10 mg AM, optionally 25 mg for additional glycemic effect; glycemic use not recommended below eGFR 30, distinct from HF/CKD indications; hold at least three days before surgery/prolonged fasting. |
| Glargine U-100 start | Label: up to 10 units OR 0.2 units/kg daily; ADA: 10 units or 0.1-0.2 units/kg/day. The 10-unit option is not a cap on the weight-based option. Basal is not basal-bolus TDD. |
| Basal titration | ADA example +2 units every three days toward individualized fasting goal without hypoglycemia; unexplained hypoglycemia may warrant 10-20% reduction after cause review. Requiring all three fasting readings above goal is a conservative tool rule. |
| Prandial initiation/titration | ADA: 4 units OR 10% of basal at largest meal/greatest excursion; increase 1-2 units or 10-15% twice weekly in an individualized outpatient plan. If HbA1c <8%, consider basal reduction 4 units or 10% when adding prandial insulin. |
| Lispro timing | Within 15 minutes before or immediately after a meal, per label. |
| Ratio estimates | AACE supports 500/TDD for rapid-analog carbohydrate ratio and 1800/TDD for sensitivity as starting estimates. Teaching is separated from the calculator, which requires established prescribed ratios. |
| Meal example | 60 g / 15 g per unit = 4 units; (250-150)/50 = 2 units; total 6 only after eligibility and active-insulin review. |
| Hypoglycemia | Awake and swallowing safely: 15 g fast carbohydrate, recheck after 15 minutes and repeat if still low. Glucose <70 triggers low-glucose management. |
| Follow-up | ADA hospital transition guidance supports 1-2 weeks after medication changes; earlier ED bridge safety contact is individualized, not represented as a universal validated interval. |

The four-hour bolus exclusion is a conservative workflow guard, **not** a declaration that rapid insulin has finished acting at four hours. The separate confirmation of no active insulin remains essential. Whole-unit floor rounding is an explicit tool implementation choice requiring device/prescription review. No unsupported universal maximum insulin dose was added.

## Source verification

Primary guidance and product labels were reviewed. Publisher/PMC direct pages intermittently returned access challenges; the remaining ADA figure and AACE ratio claims were verified through indexed text from their primary publisher/PMC sources, not from AI summaries or tertiary dosing pages.

- [ADA 2026 pharmacologic chapter](https://doi.org/10.2337/dc26-S009), specifically [Figure 9.5, page S198](https://diabetesjournals.org/care/article-pdf/49/Supplement_1/S183/848878/dc26s009.pdf).
- [2024 hyperglycemic crises consensus](https://doi.org/10.2337/dci24-0032), corroborated by the [official ADA 2026 hospital abridgment](https://diabetesjournals.org/docm-care/article-pdf/doi/10.2337/doc26-a016/860538/docm26a016.pdf), including urine ketones <2+ for HHS.
- [ADA 2026 hospital chapter](https://doi.org/10.2337/dc26-S016).
- [AACE 2022 comprehensive care guideline](https://pmc.ncbi.nlm.nih.gov/articles/PMC10200071/).
- [Metformin IR label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fb296500-55cb-45ce-be0c-59aa2e3d4624) and [ER label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=68d0b1a6-c99e-42cf-afdf-b71ee73c4424).
- [Glipizide label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c4dfe64-d1c5-65ec-e063-6394a90aead5), [pioglitazone label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d740d2a2-b26d-4b16-aedc-e4b4b1c94daa), [sitagliptin label](https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f85a48d0-0407-4c50-b0fa-7673a160bf01), and [empagliflozin label](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5777b8a8-ada6-4950-8548-43a1de11f075).
- [Lantus label](https://products.sanofi.us/lantus/lantus.html) and [Humalog label](https://pi.lilly.com/us/humalog-uspi.pdf).
- [ED discharge-goal randomized trial](https://pubmed.ncbi.nlm.nih.gov/30316635/): selected patients suitable for discharge; no inference of safety for patients without feasible treatment or follow-up.

## Safety branches reviewed

Crisis, suspected insulin deficiency, pediatric/pregnancy/pump presentations, renal/electrolyte problems and unsafe access plans leave routine adult type 2 bridge care. Noninsulin treatment remains available when appropriate. Insulin initiation requires product-specific eligibility, supplies, monitoring, education and follow-up. Unknown insulin history does not receive a new-start dose. Hypoglycemia overrides escalation. Food insecurity weighs against sulfonylureas and unsafe insulin plans. No universal discharge glucose replaces clinical and practical disposition criteria.
