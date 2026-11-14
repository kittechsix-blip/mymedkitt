-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-14
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: hg-start (4 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":1,"title":"Hyperglycemia: what do I prescribe?","body":"Adult ED hyperglycemia. Rule out a crisis, find the patient type, then get an exact prescription with a cash price. Every underlined term opens a plain-English explainer.\n\n[Roadmap](#/info/hg-steps) • [Terms](#/info/hg-x-terms) • [Do NOT](#/info/hyperglycemia-ed-stop)\n\n**Safety screen.** Any of: vomiting, belly pain, deep or fast breathing, confusion, ketones or acidosis, glucose 600 or more, or weight loss with ketones?","citation":[2,3],"options":[{"label":"Yes: possible crisis or insulin deficiency","next":"hg-crisis","urgency":"critical"},{"label":"No red flags","next":"hg-scope"}],"calculatorLinks":[{"id":"hg-plan-builder","label":"Plan Builder","kind":"calculator"}]}'::jsonb
WHERE id = 'hg-start' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-crisis (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":1,"title":"Possible DKA, HHS or insulin deficiency","body":"[Diagnostic criteria and labs](#/info/hg-labs). Check ketones and acidosis even with a near-normal glucose, especially on an [SGLT2 inhibitor](#/info/hg-x-sglt2). Get IV access, monitor, check volume and electrolytes, treat the trigger. Use a monitored crisis pathway, not oral outpatient therapy.\n\n[DKA/HHS consult](#/tree/dka). Mixed pictures happen: treat as a crisis.","citation":[2],"options":[{"label":"Crisis confirmed, cannot exclude, or unstable","next":"hg-admit","urgency":"critical"},{"label":"Crisis excluded after evaluation","next":"hg-scope"}]}'::jsonb
WHERE id = 'hg-crisis' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-scope (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":1,"title":"Is this routine adult type 2 bridge care?","body":"Not routine: pregnant, under 18, pump or essential basal insulin interrupted, or **looks like type 1** (thin or young, weeks of weight loss, ketones, autoimmune history). See [spotting insulin deficiency](#/info/hg-x-insulin-deficiency). Adult age or body size does not exclude type 1.","citation":[1,2],"options":[{"label":"Pregnant, under 18, pump, or looks like type 1","next":"hg-special"},{"label":"Stable nonpregnant adult, likely type 2","next":"hg-labs-node"}]}'::jsonb
WHERE id = 'hg-scope' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-special (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"Special population: specialist or monitored pathway","body":"**Pregnant:** obstetric plus endocrine, insulin-based plan. **Under 18:** [pediatric DKA](#/tree/peds-dka) and pediatric endocrine. **Suspected new type 1 or LADA:** insulin and teaching today, not pills alone. **Pump failure or missed basal:** restore basal insulin urgently and check ketones. Do not use the type 2 starter doses here. The [Plan Builder](#/calculator/hg-plan-builder) withholds these cases.","citation":[1,2,3],"next":"hg-admit"}'::jsonb
WHERE id = 'hg-special' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-labs-node (5 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":2,"title":"Labs that change today’s plan","body":"[Labs and crisis criteria](#/info/hg-labs). Get glucose, bicarbonate, potassium and **eGFR** before choosing a drug. Add an [A1c](#/info/hg-x-a1c) if none in 3 months.\n\n**eGFR decides the pills ([ladder](#/info/hg-x-egfr)):**\n• 45 or more: all allowed\n• 30 to 44: do not START metformin\n• Under 30: no metformin\n• Under 15 or dialysis: stop, call nephrology/endocrine\n\n**A1c sets severity:** under 8.5 = one drug; 8.5 to 10 = two drugs; over 10 (or glucose 300 or more with symptoms, or weight loss) = basal insulin plus metformin.","citation":[1,2,3,5],"next":"hg-ed-care","images":[{"src":"images/hyperglycemia-ed/egfr-ladder.svg","alt":"eGFR ladder showing which diabetes drugs are allowed at each kidney function band.","caption":"eGFR ladder (original diagram; ADA 2026 and DailyMed labels)."}]}'::jsonb
WHERE id = 'hg-labs-node' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-ed-care (4 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":2,"title":"Treat the patient first, then plan","body":"Oral fluids if they can drink; IV isotonic fluid for real volume depletion (reassess often in heart failure or CKD). Fix potassium or sodium problems. Treat the trigger (infection, ischemia, steroids, missed medicine). If you give insulin in the ED, watch the glucose long enough to see its effect wear off.","citation":[2,3],"options":[{"label":"Stable, drinking and eating, ready for a plan","next":"hg-access-check"},{"label":"Persistent symptoms, AKI, electrolyte problem or unsafe trajectory","next":"hg-admit","urgency":"urgent"}]}'::jsonb
WHERE id = 'hg-ed-care' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-access-check (5 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":2,"title":"Can this patient actually get and use the medicine?","body":"Ask now, before you pick a drug: **Insurance** (none, Medicaid, Medicare)? **Pharmacy** open and close by? **Cash** on hand today? **Meals** reliable? **Meter and strips**? **Follow-up** possible within 1 to 2 weeks? Uninsured costs and $35 insulin programs: [Costs](#/info/hg-access). Every result card shows an uninsured version.","citation":[1,3,13],"options":[{"label":"Medicine, supplies and follow-up can be arranged","next":"hg-cause"},{"label":"Need help arranging them","next":"hg-case-management"}]}'::jsonb
WHERE id = 'hg-access-check' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-case-management (5 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":2,"title":"Close the access gap before discharge","body":"Involve case management and pharmacy now. Call the pharmacy for the quote, book the safety-net clinic ([HRSA Find a Health Center](https://findahealthcenter.hrsa.gov/)) while the patient is here, and enroll in an insulin program if insulin is likely ([$35 programs](#/info/hg-access)). Budget the meter, strips and syringes too.","citation":[1,3,13],"options":[{"label":"Plan secured","next":"hg-cause"},{"label":"Essential medicine or monitoring still unavailable","next":"hg-admit"}]}'::jsonb
WHERE id = 'hg-case-management' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-cause (5 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":3,"title":"Who is this patient?","body":"Pick the closest match. The prescription card follows.\n\n**A.** New diagnosis, never treated\n**B.** Known diabetes, ran out or stopped medicine\n**C.** Taking pills, still high\n**D.** Taking [insulin](#/info/hg-x-basal-meal): still high, having lows, or cannot afford it\n**E.** [Steroid](#/info/hg-x-steroid)-induced or illness-driven\n\nOr enter everything in the [Plan Builder](#/calculator/hg-plan-builder).","citation":[1,3],"options":[{"label":"A. New diagnosis, never treated","next":"hg-sev"},{"label":"B. Known diabetes, ran out or stopped","next":"hg-refill"},{"label":"C. Taking pills, still high","next":"hg-pattern"},{"label":"D. Taking insulin: still high, lows, or cannot afford","next":"hg-d-start"},{"label":"E. Steroid-induced or illness-driven","next":"hg-e-start"}],"calculatorLinks":[{"id":"hg-plan-builder","label":"Plan Builder","kind":"calculator"}]}'::jsonb
WHERE id = 'hg-cause' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-refill (5 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":3,"title":"B. Ran out or stopped: what were they on?","body":"Find out what, what dose, and why it stopped (cost, side effect, access). Do not call an unaffordable prescription a drug failure. Restart pills at the label starting dose and retitrate (do not resume the old maximum). Do not double insulin to catch up.","citation":[1,3],"options":[{"label":"Pills (or nothing known)","next":"hg-sev"},{"label":"Insulin","next":"hg-d-start"}]}'::jsonb
WHERE id = 'hg-refill' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-pattern (4 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"C. Pills, still high: rule out the boring causes","body":"Before adding drugs: Are they taking it (pharmacy fill history, cost)? At the right dose and not skipping? Steroids, infection or a new interacting drug? Has eGFR fallen (metformin cap 1000 mg/day under 45; stop under 30)? Is metformin at 2000 mg ER or the highest tolerated dose? Then pick severity: you will **add** a drug, not replace the current one. Existing agents are credited in the [Plan Builder](#/calculator/hg-plan-builder).","citation":[1,3,5],"next":"hg-sev"}'::jsonb
WHERE id = 'hg-pattern' AND tree_id = 'hyperglycemia-ed';

-- NEW NODE: hg-sev — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-mild — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-moderate — use generate-supabase-sql.mjs for full INSERT
-- Node: hg-basal (8 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":5,"title":"Severe: basal insulin plus metformin","body":"[Basal insulin](#/info/hg-x-basal-meal): 10 units once daily, or 0.1 to 0.2 units/kg (low end if age 65+, frail, eGFR under 45, unreliable meals). Never write a [total daily dose](#/info/hg-x-tdd) as basal. Add metformin if eGFR is 45 or more. Do NOT start an SGLT2 inhibitor or GLP-1 now.\n\nCan the patient inject? Need a meter, strips, syringes or pen needles, a fridge or cool spot, and teach-back. Insulin curves: [analog vs human](#/info/hg-x-analog-human).","citation":[1,3,10,17],"options":[{"label":"Uninsured","next":"hg-r-basal-unins"},{"label":"Insured (or Medicare/Medicaid)","next":"hg-r-basal-ins"},{"label":"Cannot self-inject safely or no supplies or follow-up","next":"hg-case-management"}],"images":[{"src":"images/hyperglycemia-ed/insulin-curves.svg","alt":"Schematic insulin action curves: glargine flat, NPH peaks about 4 to 12 hours, regular, rapid analog.","caption":"Insulin action curves (schematic, original diagram)."}],"calculatorLinks":[{"id":"hg-basal-start","label":"Basal starter","kind":"calculator"},{"id":"hg-plan-builder","label":"Plan Builder","kind":"calculator"}]}'::jsonb
WHERE id = 'hg-basal' AND tree_id = 'hyperglycemia-ed';

-- NEW NODE: hg-r-met — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-sglt — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-sita — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-met-glip — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-met-sita — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-met-pio — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-met-sglt — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-nomet-two — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-basal-unins — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-basal-ins — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-d-start — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-d-titrate — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-d-lows — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-d-afford — use generate-supabase-sql.mjs for full INSERT
-- Node: hg-meal-plan (7 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":6,"title":"D: fasting OK, high after meals: add ONE mealtime dose","body":"**Rx:** Add rapid-acting insulin ([lispro](#/drug/hg-lispro/ED bridge care)) at the biggest meal: 4 units or 10% of the basal dose. Give within 15 minutes before or right after eating. Adjust by 1 to 2 units or 10 to 15% twice a week. No meal means no dose. Established ratios: [Meal + Correction](#/calculator/hg-meal-correction) (no active bolus, no pump).\n\n**Uninsured:** Humalog $35 (Lilly program) or NovoLog $35 (MyInsulinRx). Cheaper fallback: [regular insulin](#/drug/hg-regular/ED bridge care) about 30 minutes before the meal; start dose per pharmacy/endocrine.\n\n**Why?** Fasting is at goal, so more basal will not help ([fasting vs after meals](#/info/hg-x-fasting-vs-post)). Mealtime vs correction: [terms](#/info/hg-x-basal-meal). No [sliding scale](#/info/hg-x-no-sliding-scale).\n\n**Don''t use if:** Skipped meals, unknown active insulin, pump, NPH or 70/30 regimen. If A1c is under 8%, consider cutting basal by 4 units or 10% when adding mealtime insulin.\n\n**Recheck when:** Clinic within 1 to 2 weeks with a meal log.\n\n[Discharge bundle](#/info/hg-discharge) • [Sick-day rules](#/info/hg-sickday) • [Plan Builder](#/calculator/hg-plan-builder) • [Terms](#/info/hg-x-terms)","citation":[1,3,4,11,18],"recommendation":"Add 4 units (or 10% of basal) of rapid insulin at the largest meal.","confidence":"recommended","calculatorLinks":[{"id":"hg-meal-correction","label":"Meal + Correction","kind":"calculator"}]}'::jsonb
WHERE id = 'hg-meal-plan' AND tree_id = 'hyperglycemia-ed';

-- NEW NODE: hg-r-d-restart — use generate-supabase-sql.mjs for full INSERT
-- Node: hg-dose-review (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":6,"title":"Complex or unverified regimen: get a reviewed plan","body":"Unknown doses, pumps and AID, U-200 or U-500, NPH or 70/30 titration, dexamethasone or split-dose steroids, and any insulin conversion have no sourced rule here. Treat low glucose, review eGFR, meals and timing, then call the pharmacist or endocrine on call with the full regimen. Observe or admit if a safe plan cannot be made. [Conversions](#/info/hg-x-conversions) • [Hypoglycemia](#/tree/hypoglycemia).","citation":[1,3,10,18,19],"next":"hg-dispo"}'::jsonb
WHERE id = 'hg-dose-review' AND tree_id = 'hyperglycemia-ed';

-- NEW NODE: hg-e-start — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-e-none — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hg-r-e-nph — use generate-supabase-sql.mjs for full INSERT
-- Node: hg-dispo (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":7,"title":"Is the discharge bundle complete?","body":"Use the [discharge checklist](#/info/hg-discharge): medicine and supplies actually in hand or obtainable today, teach-back done, written dose and hold plan, named follow-up with a date. Do not require one arbitrary discharge glucose; do not ignore persistent symptoms just because glucose fell.","citation":[3,12],"options":[{"label":"Complete and appropriate for discharge","next":"hg-discharge"},{"label":"Essential elements missing or continued concern","next":"hg-admit"}]}'::jsonb
WHERE id = 'hg-dispo' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-discharge (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":7,"title":"Discharge with a concrete bridge plan","body":"Give [written discharge instructions](#/info/hg-discharge) and [sick-day and low-glucose rules](#/info/hg-sickday). Document the drug, dose, supplies, how the patient will pay for and get them, teach-back, and the follow-up date. Phone check in 2 to 3 days for any new insulin or sulfonylurea. [Costs](#/info/hg-access).","citation":[1,3,12],"recommendation":"Discharge only with a feasible treatment, monitoring and follow-up plan.","confidence":"recommended"}'::jsonb
WHERE id = 'hg-discharge' AND tree_id = 'hyperglycemia-ed';

-- Node: hg-admit (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":7,"title":"Observe, admit or escalate","body":"Choose monitored care for crisis, suspected insulin deficiency needing initiation and teaching, continued illness, important electrolyte or kidney problems, or an unsafe discharge plan. Fix the clinical and access barriers rather than prescribing a complex outpatient regimen without support. [DKA/HHS](#/tree/dka).","citation":[2,3],"recommendation":"Use observation or admission and the appropriate crisis or specialist pathway.","confidence":"recommended"}'::jsonb
WHERE id = 'hg-admit' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-insulin-decision
DELETE FROM decision_nodes WHERE id = 'hg-insulin-decision' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-no-insulin
DELETE FROM decision_nodes WHERE id = 'hg-no-insulin' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-metformin
DELETE FROM decision_nodes WHERE id = 'hg-metformin' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-oral-choice
DELETE FROM decision_nodes WHERE id = 'hg-oral-choice' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-oral-titrate
DELETE FROM decision_nodes WHERE id = 'hg-oral-titrate' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-insulin-status
DELETE FROM decision_nodes WHERE id = 'hg-insulin-status' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-basal-pattern
DELETE FROM decision_nodes WHERE id = 'hg-basal-pattern' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-titrate
DELETE FROM decision_nodes WHERE id = 'hg-titrate' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-prandial
DELETE FROM decision_nodes WHERE id = 'hg-prandial' AND tree_id = 'hyperglycemia-ed';

-- DELETED NODE: hg-existing
DELETE FROM decision_nodes WHERE id = 'hg-existing' AND tree_id = 'hyperglycemia-ed';

-- Module labels changed
UPDATE decision_trees SET module_labels = '["Safety","Labs & access","Who & how severe","Pick the pills","Start insulin","Already on insulin / steroid","Disposition"]'::jsonb
WHERE id = 'hyperglycemia-ed';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'hyperglycemia-ed';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 1, 'ADA Professional Practice Committee. Pharmacologic Approaches to Glycemic Treatment: Standards of Care in Diabetes 2026. https://doi.org/10.2337/dc26-S009');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 2, 'Umpierrez GE et al. Hyperglycemic Crises in Adults With Diabetes: Consensus Report. Diabetes Care 2024. https://doi.org/10.2337/dci24-0032');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 3, 'ADA Professional Practice Committee. Diabetes Care in the Hospital: Standards of Care 2026. https://doi.org/10.2337/dc26-S016');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 4, 'AACE. Comprehensive Diabetes Care Guideline 2022. https://doi.org/10.1016/j.eprac.2022.08.002');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 5, 'DailyMed. Metformin ER prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=68d0b1a6-c99e-42cf-afdf-b71ee73c4424');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 6, 'DailyMed. Glipizide immediate-release prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c4dfe64-d1c5-65ec-e063-6394a90aead5');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 7, 'DailyMed. Pioglitazone prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d740d2a2-b26d-4b16-aedc-e4b4b1c94daa');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 8, 'DailyMed. Sitagliptin prescribing information. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f85a48d0-0407-4c50-b0fa-7673a160bf01');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 9, 'DailyMed. Jardiance prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5777b8a8-ada6-4950-8548-43a1de11f075');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 10, 'Sanofi. Lantus U-100 prescribing information. https://products.sanofi.us/lantus/lantus.html');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 11, 'Lilly. Humalog prescribing information. https://pi.lilly.com/us/humalog-uspi.pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 12, 'Driver BE et al. Comparison of two glycemic discharge goals in ED patients: randomized trial. Am J Emerg Med 2019. https://pubmed.ncbi.nlm.nih.gov/30316635/');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 13, 'HRSA Find a Health Center. https://findahealthcenter.hrsa.gov/ ; Walmart Prescription Program. https://www.walmart.com/cp/4-prescriptions/1078664 ; verify actual dispensing price and eligibility.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 14, 'DailyMed. Metformin immediate-release prescribing information. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=fb296500-55cb-45ce-be0c-59aa2e3d4624');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 15, 'DailyMed. Glimepiride tablets prescribing information (start 1-2 mg daily with breakfast; 1 mg if elderly or renal impairment; increase 1-2 mg every 1-2 weeks; maximum 8 mg daily). https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=101cdc41-2131-4425-b550-6a0a60b5f4a4');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 16, 'DailyMed. Dapagliflozin tablets prescribing information (glycemic start 5 mg daily, may increase to 10 mg; not for glycemic control at eGFR <45; 10 mg for heart failure and CKD indications; initiation for CKD at eGFR 25 or higher). https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5dc0e9df-3b45-4469-93fe-3d2eddbfe2b7');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 17, 'FDA. Humulin N (isophane insulin human, NPH) prescribing information (individualize dose; median maximum effect about 6.5 hours, range 2.8 to 13 hours). https://www.accessdata.fda.gov/Drugsatfda_Docs/Label/2015/018781s154lbl.Pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 18, 'DailyMed. Humulin R (regular human insulin) prescribing information (inject about 30 minutes before meals). https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=b519bd83-038c-4ec5-a231-a51ec5cc291f');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 19, 'FDA. Humulin 70/30 prescribing information (inject about 30 to 45 minutes before a meal; individualize dose). https://www.accessdata.fda.gov/drugsatfda_docs/label/2018/019717s161lbl.pdf');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 20, 'Lilly Insulin Value Program: $35 for a 30-day supply, uninsured eligible, excludes Medicaid/Medicare/VA/TRICARE; covers Basaglar, Rezvoglar, Humalog, Humulin R/N/70-30; card expires 12/31/2026. Verified 2026-11-14. https://insulins.lilly.com/lilly-insulin-value-program ');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 21, 'NovoCare MyInsulinRx: $35 per month, up to 3 vials or 2 pen packs, uninsured eligible, excludes government programs; covers Novolin N/R/70-30, NovoLog, Tresiba. Verified 2026-11-14. https://www.novocare.com/eligibility/myinsulinrx.html ');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 22, 'Sanofi Insulins Valyou Savings Program: $35 per month for Sanofi insulins including Lantus from 2026-01-01 (medium confidence; confirm eligibility with the program before promising it). https://www.sanofi.us');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 23, 'ClinicalTrials.gov NCT03511521. Randomized trial of weight-based NPH insulin for glucocorticoid-induced hyperglycemia (0.15 units/kg for prednisone 10 to 40 mg; 0.3 units/kg for more than 40 mg, given with the morning steroid). https://clinicaltrials.gov/study/NCT03511521');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('hyperglycemia-ed', 24, 'Price and access notes, verified 2026-11-14 and still to be confirmed at the dispensing pharmacy: Walmart $4 generic list (active 2026); ReliOn human insulin vial about $25 (unverified 2026); first generic dapagliflozin FDA approved 2026-04-07 (price unknown); AstraZeneca AZ&Me closed new Farxiga enrollment 2026-05-01 (secondary source); Boehringer Ingelheim BI Cares for Jardiance (about 200% of the federal poverty level). Walmart: https://www.walmart.com/cp/4-prescriptions/1078664');

COMMIT;