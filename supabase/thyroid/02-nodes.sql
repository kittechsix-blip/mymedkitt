BEGIN;
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
COMMIT;
