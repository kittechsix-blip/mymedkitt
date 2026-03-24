-- =====================================================================
-- MedKitt — Thyroid Disorders Consult: Supabase INSERT Statements
-- Generated: 2026-03-23
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'thyroid',
  'Thyroid Disorders',
  'Storm vs Myxedema → Recognition → Multimodal Treatment → Disposition',
  '1.0',
  32,
  'thyroid-start',
  '["Initial Assessment","Decompensated Hypothyroidism — Evaluation","Decompensated Hypothyroidism — Monitoring","Thyroid Storm — Treatment Sequence","Thyroid Storm — Special Situations","Subclinical Findings"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('nephro-rheum-endo', 'thyroid', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (18 citations)
DELETE FROM tree_citations WHERE tree_id = 'thyroid';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('thyroid', 1, 'Ono Y, Ono S, Yasunaga H, et al. Clinical characteristics and outcomes of myxedema coma: analysis of a national inpatient database in Japan. J Epidemiol. 2017;27(3):117-122.'),
('thyroid', 2, 'Farkas J. Thyroid Storm. Internet Book of Critical Care (IBCC). Updated November 25, 2025. https://emcrit.org/ibcc/thyroid-storm/'),
('thyroid', 3, 'Farkas J. Decompensated Hypothyroidism (aka Myxedema Coma). Internet Book of Critical Care (IBCC). Updated November 29, 2025. https://emcrit.org/ibcc/myxedema/'),
('thyroid', 4, 'Burch HB, Wartofsky L. Life-threatening thyrotoxicosis. Thyroid storm. Endocrinol Metab Clin North Am. 1993;22(2):263-277.'),
('thyroid', 5, 'Jonklaas J, Bianco AC, Bauer AJ, et al. Guidelines for the treatment of hypothyroidism: prepared by the American Thyroid Association Task Force on Thyroid Hormone Replacement. Thyroid. 2014;24(12):1670-1751.'),
('thyroid', 6, 'Bourcier S, Coutrot M, Ferré A, et al. Critically ill severe hypothyroidism: a retrospective multicenter cohort study. Ann Intensive Care. 2023;13(1):15.'),
('thyroid', 7, 'Senda A, Endo A, Tachimori H, et al. Early administration of glucocorticoid for thyroid storm: analysis of a national administrative database. Crit Care. 2020;24(1):470.'),
('thyroid', 8, 'Ross DS, Burch HB, Cooper DS, et al. 2016 American Thyroid Association guidelines for diagnosis and management of hyperthyroidism and other causes of thyrotoxicosis. Thyroid. 2016;26(10):1343-1421.'),
('thyroid', 9, 'Akamizu T, Satoh T, Isozaki O, et al. Diagnostic criteria, clinical features, and incidence of thyroid storm based on nationwide surveys. Thyroid. 2012;22(7):661-679.'),
('thyroid', 10, 'Swee DS, Chng CL, Lim A. Clinical characteristics and outcome of thyroid storm: a case series and review of neuropsychiatric derangements in thyrotoxicosis. Endocr Pract. 2015;21(2):182-189.'),
('thyroid', 11, 'Galindo RJ, Hurtado CR, Pasquel FJ, et al. National trends in incidence, mortality, and clinical outcomes of patients hospitalized for thyrotoxicosis with and without thyroid storm in the United States, 2004-2013. Thyroid. 2019;29(1):36-43.'),
('thyroid', 12, 'Ono Y, Ono S, Yasunaga H, et al. Factors associated with mortality of thyroid storm: analysis using a national inpatient database in Japan. Medicine. 2016;95(7):e2848.'),
('thyroid', 13, 'Vyas AA, Vyas P, Fillipon NL, et al. Successful treatment of thyroid storm with plasmapheresis in a patient with methimazole-induced agranulocytosis. Endocr Pract. 2010;16(4):673-676.'),
('thyroid', 14, 'Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318.'),
('thyroid', 15, 'Alexander EK, Pearce EN, Brent GA, et al. 2017 Guidelines of the American Thyroid Association for the diagnosis and management of thyroid disease during pregnancy and the postpartum. Thyroid. 2017;27(3):315-389.'),
('thyroid', 16, 'Kaykhaei MA, Shams M, Sadegholvad A, et al. Low doses of cholestyramine in the treatment of hyperthyroidism. Endocrine. 2008;34(1-3):52-55.'),
('thyroid', 17, 'Rodondi N, den Elzen WPJ, Bauer DC, et al. Subclinical hypothyroidism and the risk of coronary heart disease and mortality. JAMA. 2010;304(12):1365-1374.'),
('thyroid', 18, 'Satoh T, Isozaki O, Suzuki A, et al. 2016 Guidelines for the management of thyroid storm from The Japan Thyroid Association and Japan Endocrine Society. Endocr J. 2016;63(12):1025-1064.');

DELETE FROM decision_nodes WHERE tree_id = 'thyroid';

-- 4. decision_nodes (32 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-start', 'thyroid', 'question', 1,
 'Thyroid Disorders — Presentation',
 '[Thyroid Disorders Steps Summary](#/info/thyroid-summary)

**Thyroid emergencies are rare but lethal.** Decompensated hypothyroidism mortality: 25-50%. Thyroid storm mortality: 8-25%. Both are **clinical diagnoses** — lab values reflect chronic state, not acute severity. Do NOT delay treatment for lab confirmation. [1][14]

Sepsis is the most common precipitant for BOTH conditions and can occur concurrently. Always consider endocrine emergency in the undifferentiated critically ill patient, especially if elderly, known thyroid disease, or on thyroid-altering medications (amiodarone, lithium, checkpoint inhibitors). [6][14]',
 '[1,6,14]'::jsonb, '[{"label":"Suspected Decompensated Hypothyroidism","description":"AMS, hypothermia, bradycardia, hemodynamic instability","next":"thyroid-hypo-confirm","urgency":"critical"},{"label":"Suspected Thyroid Storm / Thyrotoxicosis","description":"Fever, tachycardia, agitation, known hyperthyroid or new presentation","next":"thyroid-storm-confirm","urgency":"critical"},{"label":"Incidental Subclinical Finding","description":"Abnormal TSH on routine labs, asymptomatic or mildly symptomatic","next":"thyroid-subclinical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"burch-wartofsky","label":"Burch-Wartofsky Score"}]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-confirm', 'thyroid', 'question', 1,
 'Confirm Decompensated Hypothyroidism',
 '**"Myxedema coma" is a misnomer** — most patients are NOT comatose, and most do not have myxedema. Better termed **decompensated hypothyroidism**: hypothyroidism causing organ failure, with the brain typically failing first. [3][14]

**Core features (IBCC):**
• **Altered mental status** (~90%) — usually hypoactive delirium, rarely frank coma
• **Hypothermia** (70-90%) — may be severe; concurrent infection can mask this
• **Bradycardia** (~70%)

**Additional features:** hypoventilation/CO₂ narcosis, hyponatremia (~50%), hypoglycemia, non-pitting edema (face/hands/ankles), delayed DTR relaxation (Woltman sign), pericardial effusion, constipation/ileus, macroglossia

**Common precipitants:**
• Levothyroxine noncompliance (#1)
• Infection/sepsis
• Cold exposure (90% present in winter)
• Medications: amiodarone, lithium, checkpoint inhibitors, sedatives, opioids
• Surgery, trauma, MI, stroke, GI bleed

[Precipitants & Differential Diagnosis](#/info/thyroid-precipitants)',
 '[3,6,8,14]'::jsonb, '[{"label":"Clinical Features Present — Treat Emergently","next":"thyroid-hypo-airway","urgency":"critical"},{"label":"Mild / Compensated Hypothyroidism","next":"thyroid-subclinical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-confirm', 'thyroid', 'question', 1,
 'Confirm Thyroid Storm',
 '**Thyroid storm = thyrotoxicosis causing end-organ dysfunction.** No validated diagnostic test — diagnosis is clinical. The Burch-Wartofsky Score helps frame the assessment but is NOT diagnostic. [4][9]

**IBCC cognitive triggers to consider thyroid storm:**
1. Known hyperthyroid + any acute deterioration
2. New-onset AFib and/or dilated cardiomyopathy
3. New delirium/psychosis + fever + tachycardia
4. Hyperthermia (temp >40°C / 104°F)
5. Septic-appearing patient without infection source

**Common precipitants:**
• Antithyroid medication noncompliance
• Infection (#1 in most series)
• Acute iodine load (contrast, amiodarone)
• Surgery, trauma
• DKA, pregnancy/delivery, PE, MI
• No identifiable trigger in ~30% [2]

**Underlying etiologies:** Graves disease (~30%), amiodarone-induced thyroiditis (~30%), toxic multinodular goiter, toxic adenoma [2]

[Precipitants & Differential Diagnosis](#/info/thyroid-precipitants)',
 '[2,4,9,14]'::jsonb, '[{"label":"Thyroid Storm (BWS ≥45 or High Clinical Suspicion)","next":"thyroid-storm-eval","urgency":"critical"},{"label":"Impending Storm (BWS 25-44)","description":"Treat aggressively — same protocol as confirmed storm","next":"thyroid-storm-eval","urgency":"urgent"},{"label":"Mild Thyrotoxicosis — Not Storm","next":"thyroid-tox-mild"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"burch-wartofsky","label":"Burch-Wartofsky Score"}]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-tox-mild', 'thyroid', 'result', 1,
 'Mild Thyrotoxicosis — Outpatient Management',
 'No features of thyroid storm or end-organ dysfunction.

**ED Workup:** TSH, free T4, free T3

**Symptomatic relief:** [Propranolol](#/drug/propranolol/thyrotoxicosis) 10-40 mg PO TID for palpitations, tremor, anxiety (if no contraindications)

**Disposition:**
• Urgent endocrinology referral (1-2 weeks)
• Return precautions: fever >38.5°C, confusion, persistent vomiting, palpitations at rest, inability to take fluids',
 '[4,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Endocrinology referral within 1-2 weeks. Return for worsening symptoms.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;


-- MODULE 2: DECOMPENSATED HYPOTHYROIDISM — EVALUATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-airway', 'thyroid', 'info', 2,
 'Airway Assessment & Supportive Care',
 '**Airway is the first priority — these patients have a physiologically AND anatomically difficult airway.**

**Anatomic challenges:** macroglossia, posterior pharyngeal myxedema, goiter (tracheal compression, laryngeal deviation), vocal cord edema, reduced neck mobility

**Physiologic challenges:** severe respiratory muscle weakness, depressed central ventilatory drive (CO₂ narcosis), decreased lung elasticity, pleural effusions

**Video laryngoscopy as first-line.** Fiberoptic backup. Surgical airway technically challenging with goiter. If stable + predicted difficult airway → consider awake intubation with ENT/anesthesia standby. [14]

[Airway Management in Thyroid Disease](#/info/thyroid-airway)

**Supportive care (SIMULTANEOUS with hormone therapy):**
• **Passive rewarming ONLY** — blankets, warm room, warm IV fluids. **NO active rewarming** (heating blankets, forced air) — causes peripheral vasodilation → cardiovascular collapse [3][14]
• NS bolus for hypotension — careful not to overresuscitate (impaired free water excretion)
• Dextrose for hypoglycemia — follow glucose q2-4h
• **Avoid sedatives, opioids, antipsychotics** — extreme sensitivity, may precipitate further decompensation [3]',
 '[3,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-hypo-steroids', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-steroids', 'thyroid', 'info', 2,
 'Step 1 — Stress-Dose Steroids FIRST',
 '**CRITICAL SEQUENCE: Give steroids BEFORE thyroid hormone replacement.**

Concomitant adrenal insufficiency is present in ~5-10% of patients (autoimmune polyglandular syndrome or pituitary disease). Thyroid hormone accelerates cortisol metabolism — giving T4 without cortisol can **precipitate adrenal crisis**. [1][5][14]

**Adults:**
• [Hydrocortisone](#/drug/hydrocortisone/decompensated hypothyroidism) 100 mg IV bolus, then 50 mg IV q8h
• IBCC protocol: 50 mg IV q6h

**If hydrocortisone unavailable:**
• [Methylprednisolone](#/drug/methylprednisolone/thyroid crisis) 40 mg IV

**Draw random cortisol BEFORE steroids if practical — but do NOT delay treatment.** A cortisol <18 μg/dL during acute stress is suggestive of AI. [5]

**Taper:** Wean steroids over 2-3 days once hemodynamically stable and cortisol results available. If cortisol was adequate (>18 μg/dL), steroids may be discontinued.',
 '[1,3,5,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-hypo-t4', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-t4', 'thyroid', 'info', 2,
 'Step 2 — IV Levothyroxine (T4)',
 '**[Levothyroxine](#/drug/levothyroxine/decompensated hypothyroidism) — mainstay of thyroid replacement:**

**Loading dose:** 200-400 mcg IV
• IBCC: 200 mcg for most patients (lower end preferred)
• ATA guidelines: 200-400 mcg based on severity, age, body weight, cardiac history [5]
• Use lower end (200 mcg) for: elderly, low body weight, coronary artery disease, arrhythmias

**Maintenance:** 50-100 mcg IV daily (or 1.2 mcg/kg/day IV) [5]

**Why IV?** GI absorption is unreliable in decompensated hypothyroidism (ileus, mucosal edema). Oral levothyroxine should NOT be used for initial treatment. Transition to PO (1.6 mcg/kg/day) once GI function restored. [3][5]

**Safety note:** IV levothyroxine is safe to give empirically. T4 is the inactive pro-hormone — the normal circulating pool is ~1,000 mcg, so even if the diagnosis is wrong, 200-400 mcg won''t cause harm. [3]',
 '[3,5,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-hypo-t3', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-t3', 'thyroid', 'question', 2,
 'Step 3 — Consider IV Liothyronine (T3)',
 '**T3 is the biologically active form — faster onset but higher risk.**

Rationale: In decompensated hypothyroidism, peripheral T4→T3 conversion may be impaired. T3 bypasses this step. However, older studies associated high-dose T3 (>75 mcg/day) with increased mortality. [5]

**IBCC recommendation:** Reserve T3 for critically ill patients requiring hemodynamic or ventilatory support. Not mandatory. [3]

**If adding T3:**
• [Liothyronine](#/drug/liothyronine/decompensated hypothyroidism) 5-20 mcg IV loading dose
• Then 2.5-10 mcg IV q8h
• Use lower end for elderly, cardiac disease, smaller patients [5]

**When to stop T3:**
• Clinical improvement (improved consciousness, hemodynamics)
• T3 levels become elevated on monitoring
• After 48 hours regardless (by then, T4→T3 conversion should resume) [3]',
 '[3,5]'::jsonb, '[{"label":"Adding T3 — Critically Ill / No T4 Response","next":"thyroid-hypo-labs"},{"label":"T4 Alone — Standard Approach","next":"thyroid-hypo-labs"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;


-- MODULE 3: DECOMPENSATED HYPOTHYROIDISM — MONITORING
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-labs', 'thyroid', 'info', 3,
 'Evaluation & Lab Workup',
 '**Core labs:**
• TSH — very high in primary hypothyroidism (most common), low/normal in central (pituitary)
• Free T4 — should be low; low-normal does not exclude diagnosis [3]
• Random cortisol — rule out concurrent adrenal insufficiency
• BMP — hyponatremia (~50%), hypoglycemia, hyperkalemia (rare)
• CBC — anemia common, leukopenia possible
• Lactate
• ABG/VBG — hypercapnia, respiratory acidosis (even without obvious respiratory distress) [3]
• CK — rhabdomyolysis from hypothermia/immobility
• Coagulation studies — acquired von Willebrand syndrome possible [3]

**Imaging:**
• ECG — bradycardia, low voltages, flattened T waves, QT prolongation, heart block [14]
• CXR — pleural effusions, cardiomegaly
• Echocardiogram — pericardial effusion, reduced EF
• Abdominal XR if distended — ileus, megacolon

**Infection workup (sepsis is #1 precipitant):**
• Blood cultures, UA/UCx, CXR
• Consider CT head + LP if etiology unclear [14]

[Lab Interpretation Guide](#/info/thyroid-labs)',
 '[3,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-hypo-monitoring', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-monitoring', 'thyroid', 'info', 3,
 'Monitoring & Ongoing Care',
 '**ICU-level monitoring is mandatory for decompensated hypothyroidism.**

**Monitoring parameters:**
• Core temperature q1h — goal: passive rewarming to normothermia
• Continuous cardiac monitoring — bradycardia, QT prolongation, heart block
• Glucose q2-4h — risk of recurrent hypoglycemia
• Sodium q4-6h — hyponatremia corrects with T4 therapy; fluid restrict if Na <130
• Hemodynamics q1h — BP, HR, urine output
• ABG/VBG if intubated — track CO₂ clearance

**Medications to AVOID:**
• Sedatives, opioids (extreme sensitivity → respiratory depression)
• Amiodarone (can worsen hypothyroidism)
• Diuretics (volume depletion + electrolyte shifts)

**Vasopressor-refractory shock:** May occur — myocardium is profoundly depressed. Vasopressors are unlikely to work until thyroid hormone replacement takes effect. Prioritize thyroid replacement alongside standard resuscitation. Consider T3 if not already started. [3]

**Thyroid labs for monitoring:** Check TSH + fT4 every 1-2 days (trough levels). TSH falls ~50%/week. fT4 should normalize within 4 days. If TSH not trending down → increase T4 dose. [3]',
 '[3,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-hypo-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-dispo', 'thyroid', 'question', 3,
 'Disposition',
 'Clinical improvement expected in 24-72h with appropriate treatment. TSH/fT4 are NOT useful for acute decision-making — changes lag by days. Follow **clinical parameters:** mental status, temperature, hemodynamics. [3][5]

**All patients with decompensated hypothyroidism require admission.** The question is ICU vs monitored floor. [14]',
 '[3,5,14]'::jsonb, '[{"label":"ICU Admission","description":"Hemodynamic instability, intubated, severe AMS, requiring IV T4/T3","next":"thyroid-hypo-icu"},{"label":"Monitored Floor","description":"Improving on IV T4, stable hemodynamics, mild-moderate presentation","next":"thyroid-hypo-floor"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-icu', 'thyroid', 'result', 3,
 'ICU Admission — Decompensated Hypothyroidism',
 '**Continue:**
• IV levothyroxine maintenance (50-100 mcg/day or 1.2 mcg/kg/day)
• Stress-dose hydrocortisone until cortisol results available
• IV liothyronine if started (reassess at 48h)
• Aggressive treatment of precipitant (antibiotics if infection suspected)
• Passive rewarming
• Glucose + electrolyte monitoring

**Consults:**
• Endocrinology
• Consider ENT/anesthesia if airway concerns

**Complications to watch for:**
• Arrhythmias during hormone replacement (especially if T3 used)
• Pericardial tamponade (rare — effusion usually improves with treatment; avoid pericardiocentesis if possible due to bleeding risk from acquired vWD) [3]
• Seizures (potentially exacerbated by hyponatremia)
• Ileus → megacolon → perforation',
 '[3,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU admission. Endocrinology consult. Continue IV T4 + steroids.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-hypo-floor', 'thyroid', 'result', 3,
 'Monitored Floor Admission',
 '**Transition plan:**
• Switch to PO levothyroxine (1.6 mcg/kg/day) when tolerating oral intake
• Taper hydrocortisone over 2-3 days once cortisol results confirm adequate adrenal function
• Aggressive bowel regimen (hypothyroid patients have severe constipation)
• Telemetry monitoring for arrhythmias

**Follow-up:**
• TSH recheck in 6-8 weeks (adjustments in 12.5-25 mcg increments)
• Endocrinology referral for dose titration
• Patient education: lifelong therapy, medication adherence, sick-day rules, MedicAlert bracelet
• Identify and address precipitant (medication noncompliance? new drug interaction?)',
 '[5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Monitored floor with telemetry. Transition to PO T4. Endocrinology follow-up.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;


-- MODULE 4: THYROID STORM — TREATMENT SEQUENCE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-eval', 'thyroid', 'info', 4,
 'Step 1 — Evaluation & Sepsis Workup',
 '**Thyroid storm mimics sepsis — and sepsis can trigger thyroid storm.** Always perform full sepsis workup. [2][14]

**Labs:**
• TSH, free T4, free T3 (T3 often disproportionately elevated in storm)
• BMP, CBC with differential, lactate
• Blood cultures, UA/UCx
• LFTs (hepatic dysfunction common — if severe, consider congestive hepatopathy from heart failure) [14]
• Coags + fibrinogen (DIC can occur) [2]
• CK (rhabdomyolysis)
• Calcium (hypercalcemia from enhanced bone resorption)
• Glucose (mild hyperglycemia common from catecholamine-mediated glycogenolysis)

**Critical — ECHO BEFORE beta-blockers:** Up to 38% of thyroid storm patients develop cardiogenic shock. Beta-blockers in decompensated systolic heart failure = cardiac arrest. [2]

**ECG:** Sinus tachycardia (most common), AFib (~15%), VT/VF possible
**CXR:** Evaluate for pulmonary edema, pneumonia, pleural effusion

**Empiric antibiotics if any concern for infection.** Infection is the #1 trigger. [2][14]',
 '[2,12,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-steroids', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-steroids', 'thyroid', 'info', 4,
 'Step 2 — Steroids',
 '**Give early — dual benefit:**
1. Blocks peripheral T4→T3 conversion (reduces active hormone)
2. Treats potential concurrent adrenal insufficiency

**IBCC protocol (preferred):**
• [Hydrocortisone](#/drug/hydrocortisone/thyroid storm) 300 mg IV loading dose, then 100 mg IV q8h [2]

**ATA protocol:**
• [Hydrocortisone](#/drug/hydrocortisone/thyroid storm) 100 mg IV q8h (no separate load) [8]

**Alternative if HC unavailable:**
• [Methylprednisolone](#/drug/methylprednisolone/thyroid crisis) 125 mg IV load, then 60 mg IV daily

**Duration:** Continue until clinical improvement (usually 3-5 days), then rapid taper.

**Note:** Data is limited — one retrospective study of 811 patients found no mortality difference with early glucocorticoids in thyroid storm. [2] However, the theoretical benefit + low risk profile supports routine use.',
 '[2,7,8,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-thionamide', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-thionamide', 'thyroid', 'question', 4,
 'Step 3 — Thionamide (Block Synthesis)',
 '**Thionamides block new thyroid hormone synthesis** by inhibiting thyroid peroxidase. They have NO effect on pre-formed hormone already released. Must give BEFORE iodine. [2][8]

[Thionamide Comparison — Methimazole vs PTU](#/info/thyroid-thionamide-compare)

**Methimazole (IBCC preferred — safer long-term):**
• [Methimazole](#/drug/methimazole/thyroid storm) 40 mg PO load, then 20 mg PO q6h [2]
• Longer duration of action, irreversible binding to thyroperoxidase
• Lower risk of hepatotoxicity and agranulocytosis

**PTU (alternative — pregnancy 1st trimester, or theoretical preference):**
• [PTU](#/drug/ptu/thyroid storm) 500-1000 mg PO load, then 250 mg PO q4h [8]
• Additional benefit: blocks peripheral T4→T3 conversion
• ATA guidelines favor PTU in acute setting for this reason, but IBCC notes no clinical evidence this matters [2]

**Administration:** PO, via NG tube, or rectally (compounded) if NPO. No IV formulation exists.

**Pregnancy:** PTU is mandatory in 1st trimester — methimazole is teratogenic (aplasia cutis, choanal atresia). Switch to methimazole after 1st trimester. [8][15]',
 '[2,8,15,18]'::jsonb, '[{"label":"Methimazole — Standard Choice","next":"thyroid-storm-iodine"},{"label":"PTU — Pregnancy or Methimazole Contraindication","next":"thyroid-storm-iodine"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-iodine', 'thyroid', 'info', 4,
 'Step 4 — Iodine (Block Release)',
 '**Iodine immediately suppresses thyroid hormone release** via the Wolff-Chaikoff effect. [2]

**TIMING: Give ≥1 hour after thionamide.** Without thionamide on board, iodine can be used as substrate for NEW hormone synthesis — potentially worsening thyrotoxicosis (especially with toxic multinodular goiter or toxic adenoma). [2][8]

**Dosing options:**
• [SSKI](#/drug/sski/thyroid storm) 5 drops (250 mg) PO q6h
• Lugol''s 5% solution 8 drops (0.4 mL) PO q6h — take with food/fluid to avoid gastritis

**Duration:** Up to 10 days (suppressive effect eventually wears off). [2]

**Alternative (if iodine "allergy" claimed):**
• Lithium carbonate 300 mg PO q8h — blocks thyroid hormone release
• Note: true iodine allergy does not exist — iodine is an essential element. Allergies are to carrier molecules (shellfish, contrast dye), not iodine itself. [2]',
 '[2,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-cholestyramine', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-cholestyramine', 'thyroid', 'info', 4,
 'Step 5 — Cholestyramine (Block Recirculation)',
 '**[Cholestyramine](#/drug/cholestyramine/thyroid storm) 4 g PO q6h**

Binds thyroid hormone in the gut, preventing enterohepatic recirculation. Effective even in endogenous thyrotoxicosis (Graves, toxic adenoma) — not just exogenous overdose. Can reduce T4 levels by an additional 20-30%. [2][16]

IBCC considers this an important adjunct that is often overlooked. Extremely safe (available OTC for diarrhea). [2]

**Drug interaction warning:** Cholestyramine binds many oral medications, reducing their absorption. Separate ALL oral drugs by ≥1 hour before or 2 hours after cholestyramine. This includes the thionamide — coordinate timing carefully. [14]',
 '[2,14,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-hyperthermia', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-hyperthermia', 'thyroid', 'info', 4,
 'Step 6 — Hyperthermia Management',
 '**[Acetaminophen](#/drug/acetaminophen/fever) 650-1000 mg PO/IV q6h** (max 4g/day)

**Active cooling** for temp >40°C: cooling blankets, ice packs to axillae/groin [2][12]

**AVOID aspirin and NSAIDs** — they displace T4 from thyroxine-binding globulin, increasing free (active) T4 and T3 levels. This can worsen thyrotoxicosis. [14]

Hyperthermia is harmful: increases myocardial oxygen demand and can cause rhabdomyolysis, delirium, and organ damage. However, avoid inducing shivering (also increases cardiac workload). [2]',
 '[2,12,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-agitation', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-agitation', 'thyroid', 'info', 4,
 'Step 7 — Agitation Management',
 'Agitation worsens hyperthermia and impedes care.

**IBCC preferred: Olanzapine** 5-10 mg IM/PO [2]
• Provides sedation without respiratory depression
• May have direct antithyroid properties

**Alternatives:**
• Benzodiazepines (midazolam 2-5 mg IM) — avoid in elderly
• Dexmedetomidine (ICU setting) — alpha-2 agonist, no respiratory depression
• Phenobarbital — historical agent, enhances T4 hepatic metabolism

**Avoid haloperidol** — QT prolongation risk is elevated in thyrotoxicosis. Case reports of haloperidol precipitating thyroid storm (dubious but concerning). [2]

**Avoid ketamine** if possible — sympathomimetic properties may worsen tachycardia/hypertension.',
 '[2,18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-cardiovascular', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-cardiovascular', 'thyroid', 'question', 4,
 'Step 8 — Cardiovascular Management',
 '**THE most controversial topic in thyroid storm management.**

**ECHO FIRST** — this is the critical step before ANY cardiovascular intervention. [2]

Thyroid storm causes complex hemodynamic derangements:
1. **Hypovolemia** (diaphoresis, vomiting, diarrhea)
2. **Systolic heart failure** (thyrotoxic cardiomyopathy — up to 38% of ICU patients)
3. **Distributive shock** (systemic vasodilation from tissue hypermetabolism)
4. **Tachycardia** (sinus or AFib — may be compensatory)

**Standard ICU hemodynamic management:**
• Fluid resuscitation guided by POCUS
• Vasopressors if needed (phenylephrine may be preferred — avoids exacerbating tachycardia)
• Treat the CAUSE: steps 2-7 will reduce heart rate as storm resolves

[Beta-Blocker Controversy in Thyroid Storm](#/info/thyroid-bb-controversy)',
 '[2,6,14]'::jsonb, '[{"label":"Preserved EF — Consider Beta-Blocker","next":"thyroid-storm-bb"},{"label":"Reduced EF / Heart Failure — Avoid Beta-Blockers","next":"thyroid-storm-no-bb","urgency":"urgent"},{"label":"AFib in Thyroid Storm","next":"thyroid-storm-afib"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-bb', 'thyroid', 'info', 4,
 'Beta-Blocker Use — Preserved EF',
 '**ONLY if echo confirms preserved ejection fraction and no decompensated heart failure.**

**Traditional ATA/EMP view:** Beta-blockers are first-line for rate/symptom control. Propranolol preferred (also blocks T4→T3 conversion at high doses). [8][14]

**IBCC critical view:** Beta-blockers may be harmful — use for standard accepted indications (hypertension, preserved-EF rate control) rather than reflexively in all thyroid storm. One meta-analysis linked beta-blockers to cardiogenic collapse and cardiac arrest in thyroid storm. [2]

**If using beta-blocker:**
• [Propranolol](#/drug/propranolol/thyroid storm) 20-40 mg PO q4-6h — start low, titrate to HR <110
• [Esmolol](#/drug/esmolol/thyroid storm) 250-500 mcg/kg IV load → 50-100 mcg/kg/min infusion — **preferred in unstable patients** (ultra-short acting, immediately titratable, can be stopped if hypotension develops) [2][8]

**Reactive airway disease:** Use cardioselective agent (esmolol, metoprolol) with caution, or calcium-channel blocker (diltiazem, verapamil) for rate control [8]

**KEY: Start low, monitor closely, stop immediately if hypotension develops.**',
 '[2,8,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-no-bb', 'thyroid', 'info', 4,
 'Reduced EF / Heart Failure — Avoid Beta-Blockers',
 '**If EF is reduced or clinical signs of decompensated heart failure: do NOT give beta-blockers.** [2]

**Manage tachycardia by treating the storm:**
1. Aggressive multimodal thyroid storm treatment (steps 2-7) will reduce heart rate as thyroid hormone levels fall
2. **Digoxin** 0.25-0.5 mg IV — lacks negative inotropic properties. However, thyrotoxicosis increases renal clearance and Vd, so higher doses may be needed and response may be blunted [2]
3. **Diltiazem** with extreme caution ONLY if rate control is desperate — still carries negative inotropic risk
4. **Vasopressor selection:** Phenylephrine (pure alpha — no beta stimulation) or vasopressin. Avoid catecholamines that worsen tachycardia (norepinephrine, epinephrine)

**Permissive tachycardia:** Targeting HR <130 may be more realistic and safer than aggressive rate control in decompensated HF + thyroid storm. [2]

**Cardiogenic pulmonary edema:** NIV (BiPAP) for respiratory support. These patients are often intravascularly depleted despite pulmonary edema — diuretics may worsen hemodynamics. [14]',
 '[2,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;


-- MODULE 5: THYROID STORM — SPECIAL SITUATIONS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-afib', 'thyroid', 'info', 5,
 'AFib in Thyroid Storm',
 '**AFib occurs in 10-35% of thyroid storm.** Usually resolves spontaneously once thyrotoxicosis is treated (within 8-10 weeks). [14]

**Rate control (depends on EF):**
• **Preserved EF:** Cautious beta-blocker (esmolol preferred — titratable) or diltiazem
• **Reduced EF:** Digoxin (reduced effectiveness in thyrotoxicosis but no negative inotropy), amiodarone (contains iodine — give AFTER methimazole; reasonable short-term bridge)

**Magnesium repletion** — good first step. Hyperthyroidism causes hypomagnesemia. [2]

**Anticoagulation:**
• CHA₂DS₂-VASc score still applies
• Embolic risk may be elevated in thyrotoxicosis even without traditional risk factors
• Consider LMWH acutely

**Cardioversion** is usually ineffective until thyroid hormones normalize — defer elective cardioversion. [2]

**Cross-reference:** [A-Fib RVR Consult](#/tree/afib-rvr) for full AFib management pathway',
 '[2,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-pregnancy', 'thyroid', 'info', 5,
 'Thyroid Storm in Pregnancy',
 '**Treatment is similar to non-pregnant patients with key modifications:** [15]

[Special Populations Guide](#/info/thyroid-special-pops)

**Thionamide:**
• **1st trimester: PTU is MANDATORY** — [PTU](#/drug/ptu/thyroid storm pregnancy) methimazole is teratogenic (aplasia cutis, choanal/esophageal atresia, cardiac malformations)
• **2nd/3rd trimester:** Switch to methimazole (lower hepatotoxicity risk)
• Use the lowest effective dose — both drugs cross the placenta and can cause fetal hypothyroidism [15]

**Iodine:** Use cautiously — crosses placenta, can cause fetal goiter/hypothyroidism

**Beta-blocker:** Propranolol category C. Use lowest effective dose. Prolonged use associated with IUGR. [15]

**Steroids:** Hydrocortisone — same dosing as non-pregnant

**Additional concerns:**
• Thyrotoxic heart failure + cardiomyopathy more common in pregnancy from uncontrolled hyperthyroidism [15]
• Coordinate with OB/MFM
• Fetal thyroid function monitoring needed
• Beta-agonist tocolytics are contraindicated

**TSH reference ranges in pregnancy:** Lower TSH normal range (reduce upper limit by ~0.5 mIU/L in 1st trimester). T4/T3 total values increase 50% after 16 weeks due to increased TBG. [15]',
 '[15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'thyroid-storm-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-dispo', 'thyroid', 'question', 5,
 'Thyroid Storm — Disposition',
 '**All thyroid storm patients require ICU admission.** Mortality 8-25%. [1][14]

**Monitor for complications:**
• Worsening hemodynamics / cardiogenic shock
• Arrhythmias (AFib, VT)
• Hepatic failure (elevated LFTs common — liver failure is a grave prognostic sign)
• DIC
• Rhabdomyolysis

**Clinical improvement expected in 24-72h** with aggressive multimodal therapy. [2]

**Risk factors for mortality:** Age >60, neuropsychiatric manifestations, mechanical ventilation, non-use of antithyroid drugs or beta-blockers. [12]',
 '[1,2,12,14]'::jsonb, '[{"label":"ICU Admission — Standard","next":"thyroid-storm-icu"},{"label":"Refractory Storm — No Improvement Despite Treatment","description":"Consider rescue therapies","next":"thyroid-storm-refractory","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-icu', 'thyroid', 'result', 5,
 'ICU Admission — Thyroid Storm',
 '**Continue full multimodal regimen:**
• Steroids (taper as storm resolves)
• Thionamide (transition to maintenance dosing — methimazole 10-20 mg daily preferred long-term)
• Iodine (continue up to 10 days, then discontinue)
• Cholestyramine (continue until improved)
• Supportive care (temperature, agitation, hemodynamics)

**Consults:**
• Endocrinology
• Consider cardiology if cardiomyopathy or persistent AFib

**Definitive therapy planning** (once stable):
• Radioactive iodine ablation (RAI)
• Thyroidectomy
• Long-term antithyroid medication

**Monitoring:** TSH may remain suppressed for weeks. Follow free T4 and free T3 to guide thionamide dose titration.',
 '[2,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU admission. Multimodal thyroid storm treatment. Endocrinology consult.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-storm-refractory', 'thyroid', 'result', 5,
 'Refractory Thyroid Storm',
 '**If no improvement after 24-48h of maximal medical therapy:** [2]

1. **Therapeutic plasma exchange (plasmapheresis)** — most effective short-term rescue. Removes circulating thyroid hormones, autoantibodies, catecholamines, cytokines. Can be a bridge to thyroidectomy. [13]

2. **Emergency thyroidectomy** — definitive treatment. Very high surgical risk in unstable patients. Typically done after plasmapheresis to stabilize. [2][8]

3. **Lithium carbonate** 300 mg PO q8h — if not already using. Blocks thyroid hormone release via mechanism distinct from iodine.

4. **CVVH (continuous venovenous hemofiltration)** — case reports of successful thyroid hormone removal [2]

**Mortality in refractory thyroid storm approaches 50%.** [2]',
 '[2,8,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Multidisciplinary: endocrinology, surgery, critical care, nephrology (if plasmapheresis).', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 27)
;


-- MODULE 6: SUBCLINICAL FINDINGS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-subclinical', 'thyroid', 'question', 6,
 'Incidental Thyroid Lab Abnormality',
 'Incidental finding on ED labs. Most common: elevated TSH with normal free T4 (subclinical hypothyroidism). Prevalence: 4-10% of general population, higher in elderly and women. [14]

**Euthyroid sick syndrome:** Acutely ill patients often have low T3 with low/normal TSH and free T4. This is NOT primary thyroid disease — do not treat. Reassess thyroid function after illness resolves. [14]

[Lab Interpretation Guide](#/info/thyroid-labs)',
 '[14]'::jsonb, '[{"label":"TSH ≥ 10 mIU/L","description":"Overt or significant subclinical hypothyroidism","next":"thyroid-subclinical-treat"},{"label":"TSH 4.5-10 mIU/L","description":"Mild subclinical hypothyroidism","next":"thyroid-subclinical-observe"},{"label":"Suppressed TSH (< 0.1 mIU/L)","description":"Subclinical hyperthyroidism","next":"thyroid-subclinical-hyper"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-subclinical-treat', 'thyroid', 'result', 6,
 'Subclinical Hypothyroidism — Initiate Treatment',
 'TSH ≥10 mIU/L is associated with progression to overt hypothyroidism, increased risk of coronary heart disease, heart failure, and cardiovascular mortality. Treatment is recommended. [14][17]

**Start:** [Levothyroxine](#/drug/levothyroxine/subclinical hypothyroidism) 25-50 mcg PO daily
• Elderly or cardiac disease: start 12.5-25 mcg
• Take on empty stomach, 30-60 min before breakfast
• Separate from calcium, iron, antacids by 4 hours

**Follow-up:**
• TSH recheck in 6-8 weeks
• PCP or endocrinology referral for dose titration
• Target TSH: 1-3 mIU/L',
 '[5,14,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Start levothyroxine 25-50 mcg daily. PCP/endocrinology follow-up in 6-8 weeks.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 29)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-subclinical-observe', 'thyroid', 'result', 6,
 'Mild Subclinical Hypothyroidism — Observation',
 'TSH 4.5-10 mIU/L with normal free T4 in an asymptomatic patient. **No treatment in the ED.** [14]

**Treatment may be considered if:**
• Symptomatic (fatigue, weight gain, cognitive changes)
• Pregnant or planning pregnancy
• Anti-TPO antibodies positive (higher progression risk — ~4.3%/year)
• Significant cardiovascular risk factors

**Annual TSH monitoring recommended** — progression to overt hypothyroidism occurs in 2-5% per year. [14][17]

**Counsel patient:** This is not an emergency. Follow-up with PCP within 1-2 months.',
 '[14,17]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'PCP follow-up within 1-2 months. Annual TSH monitoring.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 30)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('thyroid-subclinical-hyper', 'thyroid', 'result', 6,
 'Subclinical Hyperthyroidism — Urgent Referral',
 'Suppressed TSH (<0.1 mIU/L) with normal free T4/T3. Risk depends on degree of TSH suppression and age. [14]

**Risks of untreated subclinical hyperthyroidism:**
• AFib (especially if TSH <0.1 and age >65)
• Osteoporosis (accelerated bone turnover)
• Progression to overt hyperthyroidism

**Common causes (check first):**
• Exogenous thyroid hormone (most common cause — is patient on levothyroxine?)
• Amiodarone
• Recent iodinated contrast

**ED action:** No acute treatment needed.

**Disposition:** Urgent endocrinology referral within 1-2 weeks. Repeat TSH + free T4/T3 to confirm (may be transient).',
 '[8,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Urgent endocrinology referral within 1-2 weeks. Confirm with repeat labs.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 31)
;


-- 5. drugs (7 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('levothyroxine', 'Levothyroxine (Synthroid)', 'Levothyroxine sodium', 'Thyroid Hormone (synthetic T4)', 'IV / PO',
 '["Decompensated hypothyroidism (IV load)","Decompensated hypothyroidism (IV maintenance)","Hypothyroidism (PO maintenance)","Subclinical hypothyroidism"]'::jsonb,
 '[{"indication":"Decompensated hypothyroidism (IV load)","regimen":"200-400 mcg IV push loading dose. Use lower end (200 mcg) for elderly, low body weight, CAD, or arrhythmia history. Safe to give empirically — T4 is inactive pro-hormone; normal circulating pool is ~1,000 mcg."},{"indication":"Decompensated hypothyroidism (IV maintenance)","regimen":"50-100 mcg IV daily (or 1.2 mcg/kg/day IV). Continue until GI function restored, then transition to PO. Oral absorption is unreliable in decompensated hypothyroidism."},{"indication":"Hypothyroidism (PO maintenance)","regimen":"1.6 mcg/kg/day PO (usual range 50-200 mcg daily). Take on empty stomach 30-60 min before breakfast. Elderly: start 25-50 mcg. Dose adjustments by 12.5-25 mcg increments every 4-6 weeks. Separate from calcium, iron, antacids by 4 hours."},{"indication":"Subclinical hypothyroidism","regimen":"25-50 mcg PO daily. Elderly or cardiac disease: start 12.5-25 mcg. TSH recheck in 6-8 weeks. Target TSH 1-3 mIU/L."}]'::jsonb,
 '["Untreated adrenal insufficiency (give steroids FIRST — T4 accelerates cortisol metabolism, may precipitate adrenal crisis)","Acute MI (relative — risk-benefit assessment)"]'::jsonb,
 '["Oral bioavailability reduced by: calcium, iron, antacids, PPIs, cholestyramine, sucralfate","Hepatic enzyme inducers (phenytoin, carbamazepine, rifampin) increase metabolism — may need 20-50% dose increase","Amiodarone and high-dose propranolol inhibit T4→T3 conversion"]'::jsonb,
 'TSH + free T4 every 1-2 days in acute phase (trough levels). TSH falls ~50%/week. fT4 should normalize within 4 days. For maintenance: TSH q6-8 weeks until stable, then annually.',
 'IV levothyroxine dose is ~75% of PO dose. T4 half-life: ~6-7 days (euthyroid), ~9-10 days (hypothyroid). Clinical effect takes hours to days — T4 must be converted to active T3 peripherally. In decompensated hypothyroidism, this conversion may be impaired.',
 NULL,
 '["Jonklaas J et al. ATA Task Force Guidelines for Treatment of Hypothyroidism. Thyroid. 2014;24(12):1670-1751.","Farkas J. Decompensated Hypothyroidism. IBCC. 2025."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('liothyronine', 'Liothyronine (Cytomel / Triostat)', 'Liothyronine sodium', 'Thyroid Hormone (synthetic T3)', 'IV',
 '["Decompensated hypothyroidism (adjunct)"]'::jsonb,
 '[{"indication":"Decompensated hypothyroidism (adjunct)","regimen":"5-20 mcg IV loading dose, then 2.5-10 mcg IV q8h. Use lower end for elderly, smaller patients, or those with CAD/arrhythmia. Reserve for critically ill patients (hemodynamic or ventilatory support). Stop when: clinical improvement, T3 levels elevate, or after 48 hours (T4→T3 conversion should resume by then)."}]'::jsonb,
 '["Untreated adrenal insufficiency","Acute MI (relative — T3 increases myocardial O₂ demand)"]'::jsonb,
 '["Higher risk of cardiac arrhythmias than T4 (active hormone with rapid onset)","Doses >75 mcg/day associated with increased mortality in older studies","Not first-line — adjunct to T4 only"]'::jsonb,
 'Continuous cardiac monitoring. Check T3 levels — if elevated, discontinue immediately. Heart rate, rhythm, blood pressure.',
 'T3 is the biologically active thyroid hormone. 95% absorbed orally within 4 hours — higher bioavailability than T4. Half-life ~2.5 days. Onset of action within hours (vs days for T4). 1 mcg T3 ≈ 3 mcg T4 in potency. IBCC: not mandatory — reserve for critically ill patients with no response to T4 at 24-48h.',
 NULL,
 '["Jonklaas J et al. ATA Task Force Guidelines for Treatment of Hypothyroidism. Thyroid. 2014;24(12):1670-1751.","Farkas J. Decompensated Hypothyroidism. IBCC. 2025."]'::jsonb,
 1)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('methimazole', 'Methimazole (Tapazole)', 'Methimazole', 'Thionamide (antithyroid agent)', 'PO',
 '["Thyroid storm","Hyperthyroidism (maintenance)"]'::jsonb,
 '[{"indication":"Thyroid storm","regimen":"40 mg PO loading dose STAT, then 20 mg PO q6h. Can administer via NG tube or rectally (compounded) if unable to take PO. Once stable (usually after 24h), consider reducing to 20 mg q12h. IBCC prefers methimazole over PTU (safer profile, no clinical evidence that PTU''s T4→T3 blocking is meaningful)."},{"indication":"Hyperthyroidism (maintenance)","regimen":"Initial: 20-40 mg/day PO (depending on severity). Maintenance: 5-20 mg/day PO. Dose adjustments every 4-6 weeks based on free T4/T3."}]'::jsonb,
 '["1st trimester pregnancy (teratogenic: aplasia cutis, choanal/esophageal atresia, cardiac malformations)","Prior agranulocytosis from thionamide (cross-reactivity between methimazole and PTU)","Severe hepatic impairment (relative)"]'::jsonb,
 '["Agranulocytosis (~0.2%) — dose-dependent, almost always within 90 days. Presents with high fever + pharyngitis. Check CBC if febrile.","Hepatotoxicity (cholestatic pattern, less severe than PTU)","ANCA-associated vasculitis (rare)","Warfarin interaction (may potentiate anticoagulation)"]'::jsonb,
 'CBC with differential before starting and if febrile. LFTs baseline and periodic. Free T4/T3 every 4-6 weeks during titration.',
 'Methimazole binds irreversibly to thyroperoxidase — longer duration of action than PTU, allows less frequent dosing. Half-life ~9 hours. Risk of agranulocytosis is strongly dose-dependent — use lowest effective dose. No IV formulation exists. Rectal administration possible with compounded suppository.',
 NULL,
 '["Ross DS et al. 2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism. Thyroid. 2016;26(10):1343-1421.","Farkas J. Thyroid Storm. IBCC. 2025."]'::jsonb,
 2)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ptu', 'Propylthiouracil (PTU)', 'Propylthiouracil', 'Thionamide (antithyroid agent)', 'PO',
 '["Thyroid storm","Thyroid storm (pregnancy 1st trimester)"]'::jsonb,
 '[{"indication":"Thyroid storm","regimen":"500-1000 mg PO loading dose, then 250 mg PO q4h. Can administer via NG tube or rectally (compounded). ATA favors PTU in acute setting — additional benefit of blocking peripheral T4→T3 conversion (~45% reduction in 24h vs 10-15% for methimazole). Generally transition to methimazole once improving (safer long-term profile)."},{"indication":"Thyroid storm (pregnancy 1st trimester)","regimen":"200-400 mg PO loading dose, then 100-200 mg PO q8h. PTU is MANDATORY in 1st trimester — methimazole crosses placenta and is teratogenic. Switch to methimazole after 1st trimester to reduce hepatotoxicity risk. Use lowest effective dose — both thionamides can cause fetal hypothyroidism."}]'::jsonb,
 '["Prior agranulocytosis from thionamide","Severe hepatic dysfunction (PTU carries BLACK BOX warning for hepatotoxicity)"]'::jsonb,
 '["HEPATOTOXICITY — FDA Black Box Warning. Risk ~1/1000 for severe hepatic injury including fulminant liver failure. Median onset ~120 days. Dose-dependent.","Agranulocytosis (~0.2%) — higher risk than methimazole at equivalent doses","ANCA-associated vasculitis (higher risk than methimazole)","Medication-induced lupus"]'::jsonb,
 'LFTs baseline and periodic (monthly for first 3 months). CBC if febrile. Discontinue immediately if LFTs > 3x ULN or symptoms of hepatitis (jaundice, dark urine, RUQ pain).',
 'PTU binds reversibly to thyroperoxidase — shorter duration of action than methimazole, requires more frequent dosing. Half-life only 1-2 hours. Bioavailability 50-80% due to first-pass metabolism. 75% protein-bound (lower placental penetration than methimazole). PTU is preferred in 1st trimester pregnancy and is the ATA-recommended agent for acute thyroid storm, but IBCC favors methimazole overall due to better safety profile.',
 NULL,
 '["Ross DS et al. 2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism. Thyroid. 2016;26(10):1343-1421.","Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318."]'::jsonb,
 3)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('propranolol', 'Propranolol (Inderal)', 'Propranolol hydrochloride', 'Non-selective beta-adrenergic blocker', 'PO / IV',
 '["Thyroid storm (rate control)","Thyroid storm (IV — acute)","Thyrotoxicosis (symptomatic)"]'::jsonb,
 '[{"indication":"Thyroid storm (rate control)","regimen":"20-40 mg PO q4-6h. Start low (20 mg), titrate to HR <110. At high doses (>160 mg/day) also inhibits peripheral T4→T3 conversion. Can administer via NG tube. IBCC caution: use ONLY if preserved EF on echo. Start low, stop if hypotension develops."},{"indication":"Thyroid storm (IV — acute)","regimen":"0.5-1 mg IV over 10 min. May repeat q15 min PRN (max 10 mg total). Reserve for acute rate control when oral not feasible. Switch to oral or esmolol infusion as soon as possible. Esmolol is preferred over IV propranolol — titratable and ultra-short acting."},{"indication":"Thyrotoxicosis (symptomatic)","regimen":"10-40 mg PO TID-QID. For palpitations, tremor, anxiety in stable thyrotoxicosis. Titrate to symptoms."}]'::jsonb,
 '["Decompensated heart failure / reduced EF (can precipitate cardiogenic shock)","Severe bradycardia / heart block","Cardiogenic shock","Severe reactive airway disease (non-selective — blocks beta-2 bronchodilation)"]'::jsonb,
 '["IBCC critical view: beta-blockers are NOT mandatory in thyroid storm and may cause cardiac arrest in patients with reduced EF or cardiomyopathy. Echo BEFORE administration.","Reactive airway disease — use cardioselective agent (esmolol, metoprolol) or calcium-channel blocker instead","Hypoglycemia masking in diabetics","Abrupt discontinuation can cause rebound hypertension/tachycardia"]'::jsonb,
 'Heart rate, blood pressure, ECG. Continuous telemetry during IV administration. Blood glucose in diabetics.',
 'Non-selective beta-blocker with additional benefit in thyrotoxicosis: blocks peripheral T4→T3 conversion at high doses. However, retrospective data show no clinical difference between propranolol and beta-1 selective agents, questioning the clinical relevance of this effect. IBCC notes that beta-blockers have been linked to cardiogenic collapse and cardiac arrest in thyroid storm — use for standard accepted indications (hypertension, preserved-EF rate control), not reflexively in all thyroid storm.',
 NULL,
 '["Ross DS et al. 2016 ATA Guidelines. Thyroid. 2016;26(10):1343-1421.","Farkas J. Thyroid Storm. IBCC. 2025.","Matsuo Y et al. Clinical efficacy of beta-1 selective beta-blockers versus propranolol in thyroid storm. Crit Care Med. 2024;52(7):1077-1086."]'::jsonb,
 4)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('sski', 'Potassium Iodide (SSKI / Lugol''s)', 'Potassium iodide', 'Iodine supplement (thyroid suppressant)', 'PO',
 '["Thyroid storm (hormone release blockade)"]'::jsonb,
 '[{"indication":"Thyroid storm (hormone release blockade)","regimen":"SSKI: 5 drops (0.25 mL / 250 mg) PO q6h. OR Lugol''s 5% solution: 8 drops (0.4 mL) PO q6h — take with food/fluid to avoid gastritis. TIMING IS CRITICAL: Must give ≥1 hour AFTER thionamide (methimazole or PTU). Without thionamide, iodine can fuel new hormone synthesis. May continue up to 10 days (suppressive effect eventually wears off via escape from Wolff-Chaikoff effect)."}]'::jsonb,
 '["Dermatitis herpetiformis (iodine sensitivity)","Hypocomplementemic vasculitis (rare)"]'::jsonb,
 '["Must give AFTER thionamide — iodine without antithyroid coverage can worsen thyrotoxicosis, especially in toxic multinodular goiter or toxic adenoma","True iodine allergy does not exist — iodine is an essential element. Allergies are to carrier molecules (shellfish protein, contrast dye), not iodine itself","Prolonged use can cause iodine-induced hypothyroidism or paradoxical thyrotoxicosis (Jod-Basedow phenomenon)"]'::jsonb,
 'Thyroid function tests (free T4, T3) daily during acute phase. Watch for worsening thyrotoxicosis in first 24h.',
 '1 drop of SSKI = 0.05 mL = 50 mg potassium iodide. Iodine acutely suppresses thyroid hormone release via the Wolff-Chaikoff effect — temporary inhibition of thyroid hormone synthesis when exposed to high iodide levels. This effect wears off after 10-14 days as the thyroid adapts (escape phenomenon). Alternative if iodine truly not tolerated: lithium carbonate 300 mg PO q8h (blocks hormone release via different mechanism).',
 NULL,
 '["Ross DS et al. 2016 ATA Guidelines. Thyroid. 2016;26(10):1343-1421.","Farkas J. Thyroid Storm. IBCC. 2025."]'::jsonb,
 5)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('cholestyramine', 'Cholestyramine (Questran)', 'Cholestyramine resin', 'Bile acid sequestrant', 'PO',
 '["Thyroid storm (adjunct — blocks enterohepatic recirculation)"]'::jsonb,
 '[{"indication":"Thyroid storm (adjunct — blocks enterohepatic recirculation)","regimen":"4 g PO q6h. Mix with 60-180 mL water or juice. Continue until thyroid storm resolved. Can reduce T4 levels by 20-30% additionally. Effective even in endogenous thyrotoxicosis (Graves, toxic adenoma) — not just exogenous overdose. Available OTC."}]'::jsonb,
 '["Complete biliary obstruction"]'::jsonb,
 '["DRUG INTERACTIONS: Binds many oral medications, reducing absorption. Separate ALL oral drugs by ≥1 hour before or 2 hours after cholestyramine. This includes thionamides — coordinate timing carefully.","GI side effects: constipation, bloating, nausea (usually mild)","May reduce absorption of fat-soluble vitamins (A, D, E, K) with prolonged use"]'::jsonb,
 'Thyroid function tests. Monitor other medication levels if on narrow therapeutic index drugs (warfarin, digoxin, levothyroxine).',
 'Often overlooked adjunct in thyroid storm. Binds thyroid hormone in the GI tract, preventing enterohepatic recirculation. Extremely safe — available over-the-counter. IBCC considers this an important step in the 8-step thyroid storm protocol. Mechanism works even in patients who have not taken exogenous thyroid hormone.',
 NULL,
 '["Kaykhaei MA et al. Low doses of cholestyramine in the treatment of hyperthyroidism. Endocrine. 2008;34(1-3):52-55.","Farkas J. Thyroid Storm. IBCC. 2025."]'::jsonb,
 6)
;


-- 6. info_pages (7 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('thyroid-summary', 'Thyroid Disorders Steps Summary', 'Stepwise approach to thyroid emergencies',
 '[{"heading":"Initial Assessment","body":"[Presentation & Pathway Selection](#/node/thyroid-start)\n[Confirm Decompensated Hypothyroidism](#/node/thyroid-hypo-confirm)\n[Confirm Thyroid Storm](#/node/thyroid-storm-confirm)"},{"heading":"Decompensated Hypothyroidism","body":"[Airway & Supportive Care](#/node/thyroid-hypo-airway) — passive rewarming only, avoid sedatives\n[Step 1: Steroids FIRST](#/node/thyroid-hypo-steroids) — HC 100 mg IV before T4\n[Step 2: IV Levothyroxine](#/node/thyroid-hypo-t4) — 200-400 mcg IV load\n[Step 3: Consider IV Liothyronine](#/node/thyroid-hypo-t3) — for critically ill only\n[Lab Workup & Monitoring](#/node/thyroid-hypo-labs)\n[Disposition](#/node/thyroid-hypo-dispo) — ICU vs monitored floor"},{"heading":"Thyroid Storm — 8-Step Protocol","body":"[Step 1: Evaluation & Sepsis Workup](#/node/thyroid-storm-eval) — echo BEFORE beta-blockers\n[Step 2: Steroids](#/node/thyroid-storm-steroids) — HC 300 mg IV load → 100 mg q8h\n[Step 3: Thionamide](#/node/thyroid-storm-thionamide) — methimazole 40 mg load or PTU 500-1000 mg\n[Step 4: Iodine](#/node/thyroid-storm-iodine) — SSKI 5 drops q6h (≥1hr after thionamide)\n[Step 5: Cholestyramine](#/node/thyroid-storm-cholestyramine) — 4 g q6h\n[Step 6: Hyperthermia](#/node/thyroid-storm-hyperthermia) — acetaminophen, NO aspirin\n[Step 7: Agitation](#/node/thyroid-storm-agitation) — olanzapine preferred\n[Step 8: Cardiovascular](#/node/thyroid-storm-cardiovascular) — echo first, then decide on beta-blocker"},{"heading":"Special Situations","body":"[AFib in Thyroid Storm](#/node/thyroid-storm-afib)\n[Pregnancy](#/node/thyroid-storm-pregnancy) — PTU mandatory in 1st trimester\n[Refractory Storm](#/node/thyroid-storm-refractory) — plasmapheresis, thyroidectomy"},{"heading":"Subclinical Findings","body":"[Incidental Lab Abnormality](#/node/thyroid-subclinical)\n[TSH ≥10 — Start Treatment](#/node/thyroid-subclinical-treat)\n[TSH 4.5-10 — Observation](#/node/thyroid-subclinical-observe)\n[Suppressed TSH — Urgent Referral](#/node/thyroid-subclinical-hyper)"}]'::jsonb,
 '[]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('thyroid-bb-controversy', 'Beta-Blocker Controversy in Thyroid Storm', 'Traditional vs critical care perspective',
 '[{"heading":"Traditional View (ATA/EMP Guidelines)","body":"Beta-adrenergic blockade is recommended for patients with symptomatic thyrotoxicosis, especially elderly patients and those with resting HR >90 or coexisting cardiovascular disease. [1]\n\n**Propranolol** is preferred — at high doses (>160 mg/day), it also inhibits peripheral T4→T3 conversion. [1]\n\nBeta-blockers are the mainstay of treatment for AFib secondary to hyperthyroidism.\n\nFor critically ill patients, **esmolol** infusion provides titratable, ultra-short-acting rate control."},{"heading":"Critical View (IBCC / Farkas)","body":"**Beta-blockers can be lethal in thyroid storm.** [2]\n\nSome patients develop severe thyrotoxic cardiomyopathy with reduced EF. In this context, beta-blockade may cause cardiac arrest or cardiogenic shock. In one multi-center study, **38% of thyroid storm patients developed cardiogenic shock**. [3]\n\nJapanese guidelines cite increased mortality with propranolol vs esmolol. Retrospective data show **no difference** between beta-1-selective agents and propranolol — arguing against the clinical relevance of propranolol''s T4→T3 blocking. [4]\n\nThe concept that beta-blockers are a \"cornerstone therapy\" needs to be debunked. Beta-blockers are excellent for chronic, compensated hyperthyroidism — but potentially lethal in acute, decompensated hyperthyroidism (just as they are excellent for chronic HF but lethal in acute decompensated HF)."},{"heading":"Balanced Approach","body":"**1. Echo BEFORE beta-blockers** — mandatory. Assess EF and volume status.\n\n**2. If preserved EF + hypertension:** Beta-blockers are reasonable. Esmolol preferred (titratable, ultra-short acting). Start low, titrate carefully.\n\n**3. If reduced EF or decompensated HF:** Do NOT give beta-blockers. Treat the thyroid storm aggressively (steps 2-7). Sinus tachycardia may be compensatory — targeting HR <130 is more realistic than <110.\n\n**4. Do not use beta-blockers to intentionally slow sinus tachycardia** — treat the underlying cause instead.\n\n**5. If patient deteriorates after beta-blocker:** Stop immediately. This is likely iatrogenic cardiogenic shock."},{"heading":"Key Evidence","body":"• One meta-analysis concluded that beta-blocker use in thyroid storm was linked to cardiogenic collapse and cardiac arrest [5]\n• A multi-center French study found 38% of thyroid storm patients developed cardiogenic shock [3]\n• Retrospective Japanese data: mortality was independently associated with non-use of antithyroid drugs, but NOT with non-use of beta-blockers [6]\n• No RCTs exist comparing beta-blocker use vs no beta-blocker in thyroid storm"}]'::jsonb,
 '[{"num":1,"text":"Ross DS et al. 2016 ATA Guidelines for Diagnosis and Management of Hyperthyroidism. Thyroid. 2016;26(10):1343-1421."},{"num":2,"text":"Farkas J. Thyroid Storm. Internet Book of Critical Care (IBCC). 2025."},{"num":3,"text":"Bourcier S et al. Thyroid Storm in the ICU: A Retrospective Multicenter Study. Crit Care Med. 2020;48(1):83-90."},{"num":4,"text":"Matsuo Y et al. Clinical efficacy of beta-1 selective beta-blockers versus propranolol in thyroid storm. Crit Care Med. 2024;52(7):1077-1086."},{"num":5,"text":"Farooqi S et al. High risk and low prevalence diseases: Thyroid storm. Am J Emerg Med. 2023;69:127-135."},{"num":6,"text":"Ono Y et al. Factors associated with mortality of thyroid storm. Medicine. 2016;95(7):e2848."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('thyroid-thionamide-compare', 'Thionamide Comparison', 'Methimazole vs Propylthiouracil (PTU)',
 '[{"heading":"Mechanism","body":"**Both** inhibit thyroid peroxidase, blocking new thyroid hormone synthesis.\n\n**Methimazole:** Binds irreversibly to thyroperoxidase → longer duration of action, less frequent dosing.\n\n**PTU:** Binds reversibly → shorter duration, requires q4-8h dosing. **Additional benefit:** Blocks peripheral T4→T3 conversion (~45% reduction in 24h). However, IBCC notes no clinical evidence this additional effect is clinically meaningful. [1]"},{"heading":"Dosing in Thyroid Storm","body":"","drugTable":[{"drug":"Methimazole","regimen":"Load: 40 mg PO. Maintenance: 20 mg PO q6h. After stabilization: 20 mg q12h."},{"drug":"PTU","regimen":"Load: 500-1000 mg PO. Maintenance: 250 mg PO q4h. Higher doses needed due to shorter duration and reversible binding."}]},{"heading":"Safety Profile","body":"**Hepatotoxicity:**\n• **Methimazole:** Lower risk. Cholestatic pattern (less severe). Mean onset ~30 days.\n• **PTU:** Higher risk (~1/1000 severe injury). **FDA Black Box Warning.** Hepatocellular pattern — can cause fulminant liver failure. Median onset ~120 days. Dose-dependent.\n\n**Agranulocytosis** (~0.2% for both):\n• Risk is dose-dependent for both drugs\n• Higher risk with PTU at equivalent doses\n• Almost always within 90 days of therapy\n• Presents with high fever + pharyngitis\n• Cross-reactivity between agents — do not switch if agranulocytosis occurs\n\n**ANCA-associated vasculitis:** Higher risk with PTU.\n\n**Overall:** Methimazole is safer for long-term use. Transition from PTU to methimazole once stable."},{"heading":"Pregnancy","body":"**1st trimester: PTU is MANDATORY**\n• Methimazole crosses placenta → teratogenic (aplasia cutis, choanal atresia, esophageal atresia, cardiac malformations)\n• PTU: lower risk and less severe anomalies (preauricular cysts, urinary tract defects)\n\n**2nd/3rd trimester: Switch to methimazole**\n• Risk of congenital anomalies decreases after 1st trimester\n• Methimazole preferred to reduce maternal hepatotoxicity risk\n\n**Both drugs:** Use lowest effective dose — both cross placenta and can cause fetal hypothyroidism. [2]"},{"heading":"IBCC vs ATA Recommendation","body":"**ATA:** Favors PTU in acute thyroid storm (earlier onset + T4→T3 blocking).\n**IBCC:** Favors methimazole overall (safer, no robust evidence PTU is clinically superior).\n**Japanese Endocrine Society:** No significant outcome benefit of one over the other.\n\n**Pragmatic choice:** Either is acceptable. Use PTU if pregnant (1st trimester) or if specifically preferred by consulting endocrinologist."}]'::jsonb,
 '[{"num":1,"text":"Farkas J. Thyroid Storm. IBCC. 2025."},{"num":2,"text":"Alexander EK et al. 2017 ATA Guidelines for Thyroid Disease During Pregnancy. Thyroid. 2017;27(3):315-389."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('thyroid-labs', 'Thyroid Lab Interpretation', 'TSH, free T4, and T3 patterns in thyroid disease',
 '[{"heading":"Key Principle","body":"**Both decompensated hypothyroidism and thyroid storm are CLINICAL diagnoses.** Lab values reflect the chronic thyroid state, not acute severity. If clinical suspicion is high, initiate treatment regardless of lab availability. [1][2]"},{"heading":"Lab Patterns by Condition","body":"**Primary Hypothyroidism (most common):**\nTSH: ↑↑ High | Free T4: ↓ Low | T3: ↓ Low\n\n**Central (Secondary) Hypothyroidism:**\nTSH: Low, normal, or slightly ↑ | Free T4: ↓ Low | T3: ↓ Low\n→ Consider panhypopituitarism, pituitary tumor, or secondary AI\n\n**Overt Hyperthyroidism / Thyroid Storm:**\nTSH: ↓↓ Very low (<0.01 mU/L) | Free T4: ↑ High | T3: ↑↑ Often disproportionately elevated\n→ T3 may be more elevated than T4 due to preferential T3 secretion by hyperthyroid gland\n\n**Subclinical Hypothyroidism:**\nTSH: ↑ Mildly elevated (4.5-10+) | Free T4: Normal | T3: Normal\n\n**Subclinical Hyperthyroidism:**\nTSH: ↓ Low (<0.1) | Free T4: Normal | T3: Normal\n\n**Euthyroid Sick Syndrome (Nonthyroidal Illness):**\nTSH: Low or normal | Free T4: Normal or low | T3: ↓ Low\n→ Common in acutely ill patients WITHOUT primary thyroid disease. Do NOT treat. Reassess after illness resolves. [1]"},{"heading":"Additional Lab Findings","body":"**Decompensated Hypothyroidism:**\n• Hyponatremia (~50%) — SIADH + decreased renal blood flow\n• Hypoglycemia — may indicate concurrent adrenal insufficiency\n• Elevated CK — rhabdomyolysis from hypothermia/immobility\n• Hypercapnia on ABG — depressed respiratory drive\n• Low voltage ECG, bradycardia, QT prolongation\n• Elevated cholesterol/LDL\n• Anemia, leukopenia\n• Acquired von Willebrand syndrome (coagulopathy)\n\n**Thyroid Storm:**\n• Hyperglycemia (catecholamine-mediated glycogenolysis)\n• Hypercalcemia (hemoconcentration + bone resorption)\n• Hypokalemia (especially in thyrotoxic periodic paralysis)\n• Abnormal LFTs / jaundice (hepatic congestion or hypoperfusion)\n• DIC (elevated INR, low fibrinogen, thrombocytopenia)\n• Metabolic acidosis on ABG (hypermetabolic state)"},{"heading":"Random Cortisol","body":"Always obtain in suspected decompensated hypothyroidism. Draw BEFORE giving steroids if possible.\n\n• <10 µg/dL during crisis: virtually diagnostic of adrenal insufficiency\n• <18 µg/dL during acute stress: suggestive of AI\n• >18 µg/dL: AI less likely (steroids may be tapered once confirmed)"}]'::jsonb,
 '[{"num":1,"text":"Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318."},{"num":2,"text":"Farkas J. Decompensated Hypothyroidism. IBCC. 2025."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('thyroid-precipitants', 'Precipitants & Differential Diagnosis', 'Thyroid emergency triggers and mimics',
 '[{"heading":"Decompensated Hypothyroidism Triggers","body":"• **Levothyroxine noncompliance** (#1 cause — 28% in one series) [1]\n• **Infection / sepsis** (15%) — viral in children, bacterial in adults\n• **Amiodarone-induced hypothyroidism** (11%) [1]\n• Cold exposure (90% of cases present in winter)\n• Surgery, trauma, burns\n• MI, heart failure, stroke, GI bleed\n• Medications: lithium, immune checkpoint inhibitors (pembrolizumab, nivolumab), IV iohexol contrast\n• Sedatives, opioids (can trigger decompensation)\n• Beta-blockers, diuretics, antipsychotics"},{"heading":"Thyroid Storm Triggers","body":"• **Infection** (#1) [2]\n• Antithyroid medication noncompliance\n• Acute iodine load (contrast dye, amiodarone)\n• Thyroid surgery or radioiodine therapy\n• Trauma, surgery\n• DKA, hypoglycemia\n• Pregnancy, labor, postpartum\n• PE, MI, stroke\n• Aspirin intoxication (increases free thyroid hormone)\n• Checkpoint inhibitors, tyrosine kinase inhibitors\n• **No identifiable trigger in ~30% of cases** [2]"},{"heading":"Drug-Induced Thyroid Dysfunction","body":"**Amiodarone** (most important):\n• Can cause BOTH hypothyroidism AND hyperthyroidism\n• Type 1 amiodarone-induced thyrotoxicosis: excess iodine → increased hormone synthesis (treat with thionamide)\n• Type 2: destructive thyroiditis → hormone release (treat with steroids)\n• ~30% of thyroid storm cases in some series are amiodarone-related [1]\n\n**Lithium:** Inhibits thyroid hormone release → hypothyroidism in 20-40% of users\n\n**Checkpoint inhibitors** (pembrolizumab, nivolumab, ipilimumab): Immune-mediated thyroiditis → can cause both hyper- and hypothyroidism. Myxedema coma has been reported."},{"heading":"Differential Diagnosis","body":"**Decompensated hypothyroidism mimics:**\n• Sepsis / septic shock\n• Stroke\n• Adrenal crisis\n• DKA\n• Drug intoxication (carbon monoxide, beta-blocker, CCB, clonidine, opioid, benzodiazepine)\n• Environmental hypothermia\n• Malnutrition\n• Panhypopituitarism\n\n**Thyroid storm mimics:**\n• Sepsis / septic shock\n• Neuroleptic malignant syndrome (NMS)\n• Serotonin syndrome\n• Sympathomimetic intoxication (cocaine, amphetamines)\n• Drug/alcohol withdrawal\n• Pheochromocytoma\n• Heat stroke\n• Malignant hyperthermia\n• Psychiatric crisis (mania, psychosis)"}]'::jsonb,
 '[{"num":1,"text":"Bourcier S et al. Critically ill severe hypothyroidism: a retrospective multicenter cohort study. Ann Intensive Care. 2023;13(1):15."},{"num":2,"text":"Farkas J. Thyroid Storm. IBCC. 2025."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('thyroid-special-pops', 'Special Populations', 'Pregnancy, pediatric, neonatal, and elderly considerations',
 '[{"heading":"Pregnancy","body":"**Thyroid physiology changes in pregnancy:**\n• TSH reference range decreases in 1st trimester (reduce upper limit by ~0.5 mIU/L)\n• Total T4/T3 increase 50% after 16 weeks (increased TBG) — use free levels\n• Gestational transient hyperthyroidism is common (HCG cross-reacts with TSH receptor) — usually benign\n\n**Hypothyroidism in pregnancy:** Untreated → pre-eclampsia, preterm birth, placental abruption, stillbirth. Adequate T4 replacement minimizes risks.\n\n**Thyroid storm in pregnancy:**\n• Treatment similar to non-pregnant + key modifications\n• **PTU is mandatory in 1st trimester** (methimazole is teratogenic)\n• Switch to methimazole after 1st trimester (lower hepatotoxicity)\n• Iodine: cautious use — crosses placenta, can cause fetal goiter\n• Propranolol: lowest effective dose (prolonged use → IUGR risk)\n• Thyrotoxic heart failure + cardiomyopathy are MORE common in pregnancy\n• Beta-agonist tocolytics are CONTRAINDICATED\n• Coordinate with OB/MFM [1]"},{"heading":"Pediatric Thyroid Storm","body":"Thyroid storm is rare in children. Most pediatric hyperthyroidism is Graves disease (onset usually during puberty, ~80% after age 11). [2]\n\n**Presentation:** Fever, tachycardia, failure to gain weight, chronic diarrhea, altered mental status. Febrile seizures reported.\n\n**Treatment:** Based on adult literature + expert opinion. No standard pediatric recommendations exist.\n• Sepsis workup + resuscitation\n• Consult pediatric endocrinology\n• Thionamide dosing: methimazole 0.25-1 mg/kg/day divided q8-12h\n• PTU if methimazole not tolerated: 5-10 mg/kg/day divided q8h\n• Propranolol: 0.5-2 mg/kg/day divided q6-12h"},{"heading":"Neonatal","body":"**Congenital hypothyroidism:** 1 in 2000-4000 newborns. Part of standard newborn screening. Often asymptomatic at birth (maternal T4 present). If symptomatic: lethargy, feeding difficulty, macroglossia, hypothermia, jaundice. Treatment: oral levothyroxine 10-15 mcg/kg daily. [1]\n\n**Neonatal thyrotoxicosis:** Rare. Seen in babies born to mothers with Graves disease (maternal TRAb crosses placenta). May present at end of first week (after maternal antithyroid drugs clear). Signs: failure to thrive, persistent tachycardia, heart failure. Treatment: PTU 5-10 mg/kg/day divided q8h, or methimazole 0.25-1 mg/kg/day."},{"heading":"Elderly","body":"**Decompensated hypothyroidism:** Most common in women 60-85 years. Higher mortality with age.\n• Start T4 at lower doses (200 mcg load, 50 mcg/day maintenance)\n• Higher risk of arrhythmias during thyroid replacement\n• Lower threshold for T3 — may exacerbate cardiac disease\n\n**Thyroid storm in elderly:**\n• May present atypically — \"apathetic thyrotoxicosis\" (lethargy rather than agitation)\n• Higher prevalence of AFib (35% in older vs younger patients)\n• Greater cardiac sensitivity to beta-blockers — start low, monitor closely\n• Goiters more common in younger patients (94% vs 50%)"},{"heading":"Amiodarone-Induced Thyroid Dysfunction","body":"**Two types (require different treatment):**\n\n**Type 1 (excess iodine → increased synthesis):**\n• Occurs in patients with pre-existing thyroid disease (Graves, toxic adenoma)\n• Treatment: thionamide (methimazole)\n• May need potassium perchlorate to block iodine uptake\n\n**Type 2 (destructive thyroiditis → hormone release):**\n• Occurs in normal thyroid glands\n• Treatment: corticosteroids (prednisone 40-60 mg/day)\n• Thionamides are ineffective (not a synthesis problem)\n\n**Mixed/uncertain:** Treat with both thionamide + steroids.\n\nAmiodarone has extremely long half-life (~40-55 days) — thyroid effects persist for months after discontinuation."}]'::jsonb,
 '[{"num":1,"text":"Alexander EK et al. 2017 ATA Guidelines for Thyroid Disease During Pregnancy. Thyroid. 2017;27(3):315-389."},{"num":2,"text":"Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318."}]'::jsonb,
 false,
 5)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('thyroid-airway', 'Airway Management in Thyroid Disease', 'Anatomic and physiologic challenges',
 '[{"heading":"Anatomic Difficult Airway","body":"**Decompensated hypothyroidism:**\n• Macroglossia (myxedema of tongue)\n• Posterior pharyngeal myxedema / angioedema\n• Vocal cord edema\n• Reduced neck mobility\n\n**Goiter (hypo or hyper):**\n• Tracheal compression and deviation\n• Laryngeal displacement\n• Hypopharynx displacement\n• May make surgical airway technically challenging\n\n**Approach:** Video laryngoscopy as first device. Fiberoptic available as backup. If stable + predicted difficult airway → awake intubation with ENT/anesthesia standby. In cannot-intubate-cannot-oxygenate → surgical airway needed (technically challenging with large goiter — may need urgent tracheostomy in OR). [1]"},{"heading":"Physiologically Difficult Airway","body":"**Decompensated hypothyroidism:**\n• Severe respiratory muscle weakness\n• Depressed central ventilatory drive → CO₂ narcosis\n• Decreased lung elasticity\n• Pleural effusions → hypoxemia\n• Patients may have respiratory alkalosis DESPITE low minute ventilation (due to decreased CO₂ production)\n\n**Thyroid storm:**\n• Significant muscle weakness + high metabolic rate → progressive respiratory failure\n• Hemodynamic instability → peri-intubation arrest risk\n\n**All thyroid emergencies:**\n• Extreme sensitivity to sedatives and opioids\n• Use smallest effective doses for RSI medications\n• Pre-oxygenate aggressively\n• Have vasopressors ready (anticipate peri-intubation hypotension)"},{"heading":"Post-Intubation Considerations","body":"**Decompensated hypothyroidism:**\n• Prolonged ventilator weaning expected — respiratory muscle weakness + impaired central drive improve slowly with thyroid replacement\n• Address respiratory alkalosis by decreasing tidal volume or rate (CO₂ production is low)\n• Consider increased aspiration risk from neurogenic oropharyngeal dysphagia\n\n**Thyroid storm:**\n• Increased CO₂ production from hypermetabolic state — may need higher minute ventilation\n• Temperature management critical — hyperthermia worsens metabolic demand"}]'::jsonb,
 '[{"num":1,"text":"Kruithoff ML, Gigliotti BJ. Thyroid Emergencies: A Narrative Review. Endocr Pract. 2025;31(10):1310-1318."}]'::jsonb,
 false,
 6)
;

COMMIT;
