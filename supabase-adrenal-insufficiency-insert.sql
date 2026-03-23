-- =====================================================================
-- MedKitt — Adrenal Insufficiency Consult: Supabase INSERT Statements
-- Generated: 2026-03-16
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'adrenal-insufficiency',
  'Adrenal Insufficiency',
  'Crisis Recognition → Treatment → Classification → Maintenance → Disposition',
  '1.0',
  27,
  'ai-start',
  '["Initial Assessment","Crisis Treatment","Type Classification","Diagnostic Workup","Maintenance & Stress Dosing","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('nephro-rheum-endo', 'adrenal-insufficiency', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (18 citations)
DELETE FROM tree_citations WHERE tree_id = 'adrenal-insufficiency';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('adrenal-insufficiency', 1, 'Bornstein SR, Allolio B, Arlt W, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab. 2016;101(2):364-389.'),
('adrenal-insufficiency', 2, 'Rushworth RL, Torpy DJ, Falhammar H. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.'),
('adrenal-insufficiency', 3, 'Hahner S, Spinnler C, Fassnacht M, et al. High Incidence of Adrenal Crisis in Educated Patients With Chronic Adrenal Insufficiency: A Prospective Study. J Clin Endocrinol Metab. 2015;100(2):407-416.'),
('adrenal-insufficiency', 4, 'Puar TH, Stikkelbroeck NM, Smans LC, et al. Adrenal Crisis: Still a Deadly Event in the 21st Century. Am J Med. 2016;129(3):339.e1-339.e9.'),
('adrenal-insufficiency', 5, 'Husebye ES, Pearce SH, Krone NP, Kämpe O. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629.'),
('adrenal-insufficiency', 6, 'Vaidya A, Findling J, Bancos I. Adrenal Insufficiency in Adults. JAMA. 2025;334(8):714-725.'),
('adrenal-insufficiency', 7, 'Lentz S, Collier KC, Willis G, et al. Diagnosis and Management of Adrenal Insufficiency and Adrenal Crisis in the Emergency Department. J Emerg Med. 2022;63(2):212-220.'),
('adrenal-insufficiency', 8, 'Dong J, Hahner S, Bancos I, Tomlinson JW. Clinical Features, Investigation, and Management of Addison''s Disease. Lancet Diabetes Endocrinol. 2026;S2213-8587(25)00393-6.'),
('adrenal-insufficiency', 9, 'Hahner S, Ross RJ, Arlt W, et al. Adrenal Insufficiency. Nat Rev Dis Primers. 2021;7(1):19.'),
('adrenal-insufficiency', 10, 'Simpson H, Tomlinson J, Wass J, et al. Guidance for the Prevention and Emergency Management of Adult Patients With Adrenal Insufficiency. Clin Med (Lond). 2020;20(4):371-378.'),
('adrenal-insufficiency', 11, 'Broersen LH, Pereira AM, Jorgensen JO, Dekkers OM. Adrenal Insufficiency in Corticosteroid Use: Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2015;100(6):2171-2180.'),
('adrenal-insufficiency', 12, 'de Vries F, Bruin M, Lobatto DJ, et al. Opioids and Their Endocrine Effects: A Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2020;105(3):1020-1029.'),
('adrenal-insufficiency', 13, 'Beuschlein F, Else T, Bancos I, et al. European Society of Endocrinology and Endocrine Society Joint Clinical Guideline: Diagnosis and Therapy of Glucocorticoid-Induced Adrenal Insufficiency. J Clin Endocrinol Metab. 2024;109(7):1657-1683.'),
('adrenal-insufficiency', 14, 'Ospina NS, Al Nofal A, Bancos I, et al. ACTH Stimulation Tests for the Diagnosis of Adrenal Insufficiency: Systematic Review and Meta-Analysis. J Clin Endocrinol Metab. 2016;101(2):427-434.'),
('adrenal-insufficiency', 15, 'Burger-Stritt S, Kardonski P, Pulzer A, et al. Management of Adrenal Emergencies in Educated Patients With Adrenal Insufficiency — A Prospective Study. Clin Endocrinol (Oxf). 2018;89(1):22-29.'),
('adrenal-insufficiency', 16, 'Burger-Stritt S, Eff A, Quinkler M, et al. Standardised Patient Education in Adrenal Insufficiency: A Prospective Multi-Centre Evaluation. Eur J Endocrinol. 2020;183(2):119-127.'),
('adrenal-insufficiency', 17, 'Bosch NA, Teja B, Law AC, et al. Comparative Effectiveness of Fludrocortisone and Hydrocortisone vs Hydrocortisone Alone Among Patients With Septic Shock. JAMA Intern Med. 2023;183(5):451-459.'),
('adrenal-insufficiency', 18, 'Mosteller RD. Simplified Calculation of Body-Surface Area. N Engl J Med. 1987;317(17):1098.');

DELETE FROM decision_nodes WHERE tree_id = 'adrenal-insufficiency';

-- 4. decision_nodes (27 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-start', 'adrenal-insufficiency', 'question', 1,
 'Adrenal Insufficiency — Presentation',
 '[Adrenal Insufficiency Steps Summary](#/info/ai-summary)

**Adrenal crisis is a medical emergency.** Defined as acute hemodynamic deterioration (SBP ≤100 mmHg or ≥20 mmHg below baseline) that resolves within 1-2 hours of parenteral hydrocortisone. Mortality rate: 0.5 per 100 patient-years in known AI patients. [2][4]

Adrenal crisis can be the first presentation of previously undiagnosed AI in up to 50% of cases. Maintain high clinical suspicion in unexplained shock refractory to fluids and vasopressors.',
 '[2,4,7]'::jsonb, '[{"label":"Suspected Adrenal Crisis","description":"Hemodynamic instability, shock refractory to fluids/pressors","next":"ai-crisis-confirm","urgency":"critical"},{"label":"Known AI — Acute Illness","description":"Established diagnosis requiring stress dosing","next":"ai-stress-dose"},{"label":"Suspected Chronic AI — New Diagnosis","description":"Fatigue, weight loss, hyperpigmentation, electrolyte abnormalities","next":"ai-type-classify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[{"id":"bsa","label":"BSA Calculator"}]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-crisis-confirm', 'adrenal-insufficiency', 'question', 1,
 'Confirm Crisis Features',
 '**Classic adrenal crisis presentation:**
• Hemodynamic collapse — SBP ≤100 mmHg or ≥20 mmHg below baseline
• Hyponatremia (84% of cases)
• Hypoglycemia
• Hyperkalemia (PAI only — mineralocorticoid deficiency)
• Unexplained fever, abdominal pain, nausea/vomiting
• Altered mental status, confusion, lethargy
• Hypercalcemia (rare but described)

**Common precipitants:**
• Infection (#1 cause — viral in children, bacterial in adults)
• Trauma or surgery without stress dosing
• Abrupt steroid withdrawal
• CYP3A4 inducers (rifampin, phenytoin, carbamazepine)
• GI illness with vomiting preventing oral steroid intake

[Precipitating Factors & Differential Diagnosis](#/info/ai-precipitants)',
 '[2,3,7]'::jsonb, '[{"label":"Crisis Confirmed — Treat Immediately","next":"ai-crisis-fluids","urgency":"critical"},{"label":"Not in Crisis — Evaluate for Chronic AI","next":"ai-type-classify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-crisis-fluids', 'adrenal-insufficiency', 'info', 1,
 'Immediate Resuscitation',
 '**Simultaneous actions — do NOT delay treatment for diagnostics.**

**IV Access + Fluids:**
• **Adults:** 1L NS bolus, repeat PRN. Add D5 (or D50 bolus) if hypoglycemic.
• **Pediatrics:** 20 mL/kg NS bolus, repeat PRN up to 60 mL/kg in first hour. D10 2-5 mL/kg for hypoglycemia.

**Draw crisis labs BEFORE steroids if possible — but do NOT delay treatment:**
• Random cortisol (most important single test)
• ACTH level (distinguishes primary vs secondary)
• BMP (Na, K, glucose, Cr)
• CBC with differential
• Lactate
• Renin and aldosterone

[Lab Findings by AI Type](#/info/ai-lab-findings)

**KEY:** A random cortisol drawn during acute physiologic stress that is <18 μg/dL is highly suggestive of AI. A level <10 μg/dL during crisis is virtually diagnostic. [1][2]',
 '[1,2,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-crisis-steroid', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-crisis-steroid', 'adrenal-insufficiency', 'info', 1,
 'Emergency Steroid Replacement',
 '**Hydrocortisone — first-line for adrenal crisis:**

**Adults:**
• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 100 mg IV/IM bolus immediately
• Then 200 mg/24h as continuous infusion (preferred) or 50 mg IV q6h
• Taper to oral over 1-3 days as hemodynamics stabilize

**Pediatrics:**
• [Hydrocortisone](#/drug/hydrocortisone/pediatric adrenal crisis) 50 mg/m² IV bolus (max 100 mg)
• Then 50-100 mg/m²/day divided q6-8h
• BSA required → use toolbar BSA calculator

**If hydrocortisone unavailable:**
• [Dexamethasone](#/drug/dexamethasone/adrenal crisis) 4 mg IV — does NOT interfere with cortisol assay (advantage if diagnosis uncertain)
• [Methylprednisolone](#/drug/methylprednisolone/adrenal crisis) 40 mg IV

**KEY:** At hydrocortisone doses ≥50 mg/day, mineralocorticoid activity is sufficient — fludrocortisone is NOT needed during acute crisis management. [1][2]',
 '[1,2,5,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-crisis-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-crisis-response', 'adrenal-insufficiency', 'question', 1,
 'Response Assessment (1-2 Hours)',
 '**Adrenal crisis should show hemodynamic improvement within 1-2 hours of parenteral hydrocortisone.** [2]

**Expected response:**
• Blood pressure improves
• Mental status clears
• Vasopressor requirements decrease
• Glucose stabilizes

**If no improvement:**
• Reassess diagnosis — is this truly adrenal crisis?
• Ensure adequate volume resuscitation
• Consider other shock etiologies (septic, cardiogenic, hypovolemic)
• Random cortisol >18 μg/dL during acute stress makes AI very unlikely',
 '[2,7]'::jsonb, '[{"label":"Improving — Continue Crisis Management","next":"ai-crisis-ongoing"},{"label":"No Improvement — Reassess Diagnosis","next":"ai-crisis-refractory"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;


-- MODULE 2: CRISIS TREATMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-crisis-ongoing', 'adrenal-insufficiency', 'info', 2,
 'Ongoing Crisis Management',
 '**Continue first 24-48 hours:**
• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 200 mg/24h (continuous infusion preferred, or 50 mg IV q6h) [5]
• Aggressive IV fluids — NS ± dextrose
• Monitor glucose q1-2h (hypoglycemia common)
• Treat precipitating cause aggressively

**Tapering (day 2-3):**
• Once hemodynamically stable, halve hydrocortisone dose daily
• Transition to oral when tolerating PO
• Resume maintenance dose + fludrocortisone (if PAI) once at baseline

**Electrolytes:**
• Na and K normalize with hydrocortisone at stress doses (mineralocorticoid effect adequate at ≥50 mg/day)
• Avoid aggressive potassium correction in PAI — K will drop with steroid replacement [2][6]',
 '[2,5,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-precipitant-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-crisis-refractory', 'adrenal-insufficiency', 'result', 2,
 'Refractory Shock — Broaden Differential',
 '**If hemodynamics do not improve within 1-2 hours of hydrocortisone 100 mg IV + aggressive fluids:**

**Reassess for alternative diagnoses:**
• Septic shock (most common crisis precipitant — may need independent treatment)
• Hypovolemic shock (hemorrhage, GI losses)
• Cardiogenic shock
• Other endocrine emergency (thyroid storm, myxedema coma)

**Management:**
• Vasopressors — norepinephrine first-line
• Broad-spectrum antibiotics if infection cannot be excluded
• Check TSH for concomitant hypothyroidism (polyglandular autoimmune syndrome)

**Diagnostic clue:** Random cortisol >18 μg/dL drawn during acute physiologic stress makes adrenal insufficiency very unlikely as the primary cause of shock. [2][7]',
 '[2,4,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU admission mandatory. Continue stress-dose steroids while investigating alternative diagnoses. Endocrine consultation.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-precipitant-workup', 'adrenal-insufficiency', 'question', 2,
 'Identify & Treat Precipitant',
 '**Infection is the #1 trigger** — viral in children, bacterial in adults. [Precipitating Factors & Differential Diagnosis](#/info/ai-precipitants)

**Common triggers:**
• Infection/sepsis (most common)
• GI illness with vomiting (cannot take oral steroids)
• Trauma or surgery without stress dosing
• Abrupt steroid discontinuation
• CYP3A4 inducers (rifampin, phenytoin, carbamazepine)
• Adrenal hemorrhage (anticoagulation, meningococcemia)

~10% of crises have no identifiable precipitant. [3][7]',
 '[2,3,7]'::jsonb, '[{"label":"Infection / Sepsis","next":"ai-crisis-infection"},{"label":"Medication-Related","description":"Steroid withdrawal, CYP3A4 inducers, checkpoint inhibitors","next":"ai-med-related"},{"label":"Other / Unknown — Stabilized","next":"ai-type-classify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-crisis-infection', 'adrenal-insufficiency', 'info', 2,
 'Infection-Precipitated Crisis',
 '**Treat BOTH the infection AND the crisis simultaneously.**

• Continue stress-dose [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) throughout active infection
• Broad-spectrum antibiotics per sepsis protocol
• Blood and urine cultures, CXR, procalcitonin
• Do NOT taper steroids until infection is controlled
• Stress-dose steroids may mask fever — monitor WBC and procalcitonin trends instead

**Waterhouse-Friderichsen syndrome:**
• Bilateral adrenal hemorrhage in meningococcal sepsis
• Also seen with DIC, heparin-induced thrombocytopenia, antiphospholipid syndrome
• CT abdomen shows enlarged hemorrhagic adrenals
• Irreversible PAI — lifelong glucocorticoid + mineralocorticoid replacement required [2][7]',
 '[2,4,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;


-- MODULE 3: TYPE CLASSIFICATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-type-classify', 'adrenal-insufficiency', 'question', 3,
 'AI Type Classification',
 '**Classification guides workup and long-term management.** [Lab Findings by AI Type](#/info/ai-lab-findings)

**Primary AI (PAI):** Direct adrenal gland destruction — autoimmune (Addison disease, 80% in developed countries), infectious (TB #1 worldwide), hemorrhagic, infiltrative, bilateral adrenalectomy.

**Secondary AI (SAI):** Pituitary ACTH deficiency — tumors, surgery, radiation, Sheehan syndrome, immune checkpoint inhibitors.

**Tertiary AI (TAI):** HPA axis suppression from exogenous steroids — **most common cause of AI overall.** Any patient on ≥prednisone 5 mg/day (or equivalent) for ≥3 weeks. [1][5]',
 '[1,2,5]'::jsonb, '[{"label":"Primary AI (Addison''s)","description":"Hyperpigmentation, hyperkalemia, high ACTH","next":"ai-pai-workup"},{"label":"Secondary AI (Pituitary)","description":"No hyperpigmentation, no hyperK, pituitary deficits","next":"ai-sai-workup"},{"label":"Tertiary AI (Steroid-Induced)","description":"History of chronic exogenous steroid use","next":"ai-tai-workup"},{"label":"Unknown — Need Diagnostic Workup","next":"ai-diagnostic-labs"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-pai-workup', 'adrenal-insufficiency', 'info', 3,
 'Primary AI (Addison''s Disease)',
 '**Hallmarks distinguishing PAI from other types:**
• **Hyperpigmentation** — ACTH-driven melanocyte stimulation. Look for palmar creases, buccal mucosa, scars, areolae, sun-exposed areas.
• **Hyperkalemia** — aldosterone deficiency (unique to PAI)
• Salt craving, postural hypotension, weight loss
• Low cortisol + elevated ACTH (>2× upper limit of normal)

**Etiologic workup:**
• 21-hydroxylase antibodies (positive in ~85% of autoimmune PAI)
• CT adrenals — TB: calcified/enlarged; hemorrhage: enlarged with high density; metastases
• If antibodies negative: TB testing (PPD/IGRA), fungal (histoplasmosis, coccidioidomycosis), HIV, metastatic disease (lung, breast, melanoma)

**Polyglandular autoimmune syndromes:**
• **Type 1 (APS-1):** AI + hypoparathyroidism + chronic mucocutaneous candidiasis (AIRE gene mutation)
• **Type 2 (Schmidt syndrome):** AI + autoimmune thyroid disease ± type 1 diabetes
• → Check TSH in all PAI patients

**CRITICAL:** Treat cortisol BEFORE thyroxine — levothyroxine accelerates cortisol clearance and can precipitate adrenal crisis in untreated AI. [1][5][8]',
 '[1,5,8,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-maintenance', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-sai-workup', 'adrenal-insufficiency', 'info', 3,
 'Secondary AI (Pituitary)',
 '**Key differences from PAI:**
• **No hyperpigmentation** (ACTH is LOW, not high)
• **No hyperkalemia** (aldosterone preserved — RAAS axis intact)
• May have other pituitary hormone deficiencies (TSH, LH/FSH, GH, prolactin)

**Common causes:**
• Pituitary adenoma (most common structural cause)
• Post-pituitary surgery or radiation
• Sheehan syndrome (postpartum pituitary necrosis — history of severe postpartum hemorrhage)
• Lymphocytic hypophysitis
• Immune checkpoint inhibitors: ipilimumab (anti-CTLA-4) > pembrolizumab/nivolumab (anti-PD-1) [5][9]

**Workup:**
• MRI pituitary with contrast
• Full anterior pituitary panel: LH/FSH, TSH/fT4, GH/IGF-1, prolactin
• Low or inappropriately normal ACTH + low cortisol confirms SAI

**Fludrocortisone is NOT needed** in SAI — mineralocorticoid pathway (RAAS) is intact. [1][5]',
 '[1,5,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-maintenance', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-tai-workup', 'adrenal-insufficiency', 'info', 3,
 'Tertiary AI (Steroid-Induced)',
 '**Most common form of adrenal insufficiency overall.** [Corticosteroid Equivalency & Alternatives](#/info/ai-steroid-equivalency)

**Risk factors for HPA suppression:**
• ≥Prednisone 5 mg/day (or equivalent) for ≥3 weeks
• Any dose for ≥3 weeks with Cushingoid features
• Repeated high-potency inhaled, topical, or intra-articular steroids
  — Meta-analysis: 4.2% intranasal, 6.8% inhaled, 52.2% intra-articular [11]
• Chronic opioid use — prevalence of AI ~15% among chronic opioid users [12]

**Recovery timeline:**
• HPA axis recovery takes 6-12 months after steroid discontinuation
• During recovery period: stress dosing still needed for illness/surgery

**Taper guidance:**
• Reduce to physiologic replacement (hydrocortisone 15-20 mg/day) first
• Then slow taper: reduce by 1-2.5 mg prednisone equivalent every 1-2 weeks
• Check AM cortisol after holding replacement for 24 hours — if >18 μg/dL, HPA axis has recovered

[Special Populations](#/info/ai-special-populations) [1][11][12][13]',
 '[1,11,12,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-maintenance', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;


-- MODULE 4: DIAGNOSTIC WORKUP
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-diagnostic-labs', 'adrenal-insufficiency', 'info', 4,
 'Diagnostic Laboratory Evaluation',
 '[Lab Findings by AI Type](#/info/ai-lab-findings)

**Step 1 — Morning Cortisol + ACTH (draw at 8-9 AM):**
• AM cortisol <3 μg/dL → AI virtually confirmed
• AM cortisol >15 μg/dL → AI unlikely (some guidelines use 18 μg/dL)
• AM cortisol 3-15 μg/dL → indeterminate, needs cosyntropin stimulation test

**Step 2 — ACTH level distinguishes type:**
• ACTH >2× upper limit of normal → Primary AI
• ACTH low or inappropriately normal → Secondary or Tertiary AI

**Additional labs:**
• BMP: hyponatremia (84%), hyperkalemia (PAI only), hypoglycemia
• Renin + aldosterone: elevated renin + low aldosterone = PAI
• TSH, anti-TPO antibodies: screen for polyglandular autoimmune syndrome
• 21-hydroxylase antibodies if PAI suspected
• DHEA-S: low in both PAI and SAI (not useful for distinguishing type) [1][5][8]',
 '[1,5,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-cosyntropin', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-cosyntropin', 'adrenal-insufficiency', 'info', 4,
 'Cosyntropin (ACTH) Stimulation Test',
 '**Gold standard for diagnosing PRIMARY AI.**

**Protocol:**
1. Draw baseline cortisol
2. Administer cosyntropin 250 μg IV or IM
3. Draw cortisol at 30 and 60 minutes

**Interpretation:**
• Peak cortisol ≥18 μg/dL → normal response, rules out PAI
• Peak cortisol <18 μg/dL → confirms adrenal insufficiency

**Limitations:**
• Does NOT reliably detect SAI or recent-onset PAI (adrenals may still respond to supraphysiologic exogenous ACTH early in secondary disease)
• If SAI suspected with normal stimulation test → endocrine referral for insulin tolerance test (ITT) or metyrapone test

**ED tip:** If adrenal crisis is suspected, draw cortisol + ACTH, then give hydrocortisone immediately. Pre-treatment cortisol + ACTH are usually sufficient for diagnosis. Formal stimulation test can be done after stabilization.

**Dexamethasone advantage:** Does NOT cross-react with cortisol immunoassays — allows meaningful cortisol measurement during active treatment. [1][14]',
 '[1,5,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-cosyntropin-result', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-cosyntropin-result', 'adrenal-insufficiency', 'question', 4,
 'Stimulation Test Result',
 'What was the peak cortisol after cosyntropin administration?',
 '[1,14]'::jsonb, '[{"label":"Peak ≥18 μg/dL — Normal Response","description":"PAI excluded. If SAI still suspected → endocrine referral","next":"ai-stim-normal"},{"label":"Peak <18 μg/dL — Abnormal","description":"Adrenal insufficiency confirmed — classify type","next":"ai-type-classify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-stim-normal', 'adrenal-insufficiency', 'result', 4,
 'Normal Stimulation Test',
 'A normal cosyntropin stimulation test **excludes primary AI** but does NOT exclude secondary AI (especially early or partial).

**If clinical suspicion for SAI remains high:**
• Endocrine referral for insulin tolerance test (ITT) or metyrapone test
• ITT is the gold standard for SAI diagnosis but contraindicated in patients with seizure history, cardiovascular disease, or elderly

**If low clinical suspicion:**
• No further AI workup needed
• Consider alternative diagnoses: hypothyroidism, depression, chronic fatigue syndrome, anemia, fibromyalgia [1][14]',
 '[1,14]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Normal cosyntropin stimulation test excludes primary AI. If secondary AI still suspected, refer to endocrinology for insulin tolerance test.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;


-- MODULE 5: MAINTENANCE & STRESS DOSING
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-maintenance', 'adrenal-insufficiency', 'info', 5,
 'Maintenance Replacement Therapy',
 '[Corticosteroid Equivalency & Alternatives](#/info/ai-steroid-equivalency)

**Glucocorticoid replacement (ALL types):**
• [Hydrocortisone](#/drug/hydrocortisone/maintenance) 15-25 mg PO daily, divided BID or TID
• Give 2/3 of dose AM upon waking, 1/3 early afternoon
• Last dose >6 hours before bedtime to avoid insomnia
• Typical regimen: 15 mg AM + 5 mg at 2 PM [1]
• Alternatives: [Prednisolone](#/drug/prednisolone/adrenal maintenance) 3-5 mg PO daily, [Dexamethasone](#/drug/dexamethasone/adrenal maintenance) 0.25-0.5 mg PO daily

**Pediatrics:**
• [Hydrocortisone](#/drug/hydrocortisone/pediatric maintenance) 6-10 mg/m²/day divided TID (preferred — shortest half-life, least growth suppression)

**Mineralocorticoid (PAI ONLY):**
• [Fludrocortisone](#/drug/fludrocortisone/adrenal maintenance) 50-200 μg PO daily
• NOT needed in SAI or TAI (RAAS axis intact)
• Monitor BP, K+, and plasma renin activity to guide dosing

**Dose adjustment clues:**
• Underdosing: fatigue, hypotension, nausea, salt craving, hyponatremia
• Overdosing: weight gain, hyperglycemia, osteoporosis, Cushingoid features [1][5][6]',
 '[1,5,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-stress-dose', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-stress-dose', 'adrenal-insufficiency', 'info', 5,
 'Sick-Day Rules & Stress Dosing',
 '**The #1 cause of adrenal crisis is failure to increase steroids during physiologic stress.** [3]

[Sick-Day Rules & Stress Dosing Guide](#/info/ai-sick-day-rules)

**Minor illness (cold, mild gastroenteritis):**
• **Double** oral hydrocortisone dose if fever >38°C (100.4°F)
• **Triple** oral hydrocortisone dose if fever >39°C (102.2°F)
• Continue increased dose until recovery, then resume baseline

**Moderate illness/injury:**
• [Hydrocortisone](#/drug/hydrocortisone/stress dose) 50 mg PO BID (or equivalent)
• Taper over 2-3 days as illness resolves

**Major surgery / critical illness:**
• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 100 mg IV preop → 200 mg/24h → taper to maintenance over 2-3 days

**Vomiting / unable to take PO:**
• Emergency IM injection — [Hydrocortisone](#/drug/hydrocortisone/emergency IM) 100 mg IM → come to ED immediately
• All AI patients must carry an emergency injection kit

**Pediatric stress dosing:**
• Illness: 30-50 mg/m²/day divided q6-8h
• Major surgery: 50-100 mg/m² IV bolus → 50-100 mg/m²/day [1][15]',
 '[1,2,3,15]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-prevention', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-med-related', 'adrenal-insufficiency', 'info', 5,
 'Medication-Related Crisis',
 '**Abrupt steroid withdrawal:**
• Most common cause of TAI crisis
• Risk with ≥prednisone 5 mg/day for ≥3 weeks
• Management: resume steroids at previous dose, then taper slowly

**CYP3A4 inducers** (accelerate cortisol metabolism):
• Rifampin, phenytoin, carbamazepine, phenobarbital, St. John''s wort
• May need to double hydrocortisone maintenance dose while on CYP3A4 inducer [11]

**CYP3A4 inhibitors** (can mask AI, then crisis when stopped):
• Ketoconazole, itraconazole, fluconazole, ritonavir

**Immune checkpoint inhibitors:**
• Ipilimumab (anti-CTLA-4) → hypophysitis → SAI (highest risk)
• Pembrolizumab/nivolumab (anti-PD-1) → primary adrenalitis → PAI
• Usually irreversible — lifelong replacement needed
• Do NOT hold cancer therapy for AI — treat AI and continue immunotherapy [9]

**Chronic opioids:**
• Suppress hypothalamic CRH → TAI
• Prevalence ~15% of chronic opioid users
• Higher risk with higher doses and longer duration
• No patient on <20 MME/day developed opioid-induced AI in meta-analysis [12]
• Screen with AM cortisol if unexplained fatigue or hypotension',
 '[9,11,12,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-maintenance', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-prevention', 'adrenal-insufficiency', 'info', 5,
 'Crisis Prevention & Patient Education',
 '**Every AI patient must have ALL of the following:** [16]

**1. Medical Alert Identification**
• MedicAlert bracelet or necklace stating: "Adrenal Insufficiency — Requires Stress-Dose Steroids"

**2. Emergency Injection Kit**
• Hydrocortisone 100 mg for IM self-injection (lateral thigh)
• Patient AND family/caregivers trained in injection technique
• Replace before expiration date
• In a study, only 44% of patients in adrenal emergency received their emergency injection before arriving at a medical facility [15]

**3. Steroid Emergency Card**
• Wallet card with diagnosis, medications, dosing, emergency contact, and instructions for first responders

**4. Written Sick-Day Action Plan**
• [Sick-Day Rules & Stress Dosing Guide](#/info/ai-sick-day-rules)

**5. Education Topics:**
• Never stop steroids abruptly
• Increase dose when ill (sick-day rules)
• Use IM injection if unable to keep oral steroids down
• Go to ED immediately after IM injection
• Inform ALL healthcare providers of diagnosis
• Wear medical alert identification at all times

Group education sessions improved patient confidence in emergency injection from 68% to 91%. [16]',
 '[1,15,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-disposition', 'adrenal-insufficiency', 'question', 6,
 'Disposition',
 'Disposition depends on clinical severity, treatment response, and ability to tolerate oral medications.',
 '[2,7]'::jsonb, '[{"label":"Adrenal Crisis / Hemodynamic Instability","next":"ai-dispo-icu","urgency":"critical"},{"label":"Acute Illness with Known AI","description":"Cannot tolerate PO, needs IV steroids, or new diagnosis","next":"ai-dispo-admit"},{"label":"Mild Presentation / Stable","description":"Tolerating PO, hemodynamically stable, controlled symptoms","next":"ai-dispo-discharge"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-dispo-icu', 'adrenal-insufficiency', 'result', 6,
 'ICU Admission',
 '**ICU admission criteria:**
• Active adrenal crisis requiring IV hydrocortisone and vasopressors
• Persistent hemodynamic instability despite fluid resuscitation
• Altered mental status
• Precipitating illness requiring ICU-level care (sepsis, major surgery)

**ICU orders:**
• [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 200 mg/24h — continuous infusion preferred or 50 mg IV q6h
• Aggressive IV fluids — NS ± D5
• Glucose monitoring q1-2h (hypoglycemia common)
• Electrolyte monitoring q4-6h (Na, K)
• Treat precipitating cause
• Endocrine consultation

In-hospital adrenal crisis mortality is <1% with prompt treatment, but rises significantly with delayed recognition. [2][4]',
 '[2,4,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit to ICU. Hydrocortisone 200 mg/24h continuous or 50 mg IV q6h. Treat precipitant. Endocrine consultation. Taper steroids as hemodynamics stabilize.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-dispo-admit', 'adrenal-insufficiency', 'result', 6,
 'Admit to Floor',
 '**Floor admission criteria:**
• Known AI with acute illness preventing oral intake
• New AI diagnosis requiring inpatient workup
• Stress-dose steroids needed but hemodynamically stable

**Floor orders:**
• [Hydrocortisone](#/drug/hydrocortisone/stress dose) 50 mg IV/PO q8h, taper to maintenance over 2-3 days
• IV fluids until tolerating PO
• Treat precipitating illness
• Endocrine consultation for all new diagnoses
• Education before discharge: sick-day rules, emergency injection kit, MedicAlert identification [1][2]',
 '[1,2,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit to floor. Stress-dose hydrocortisone with taper to maintenance. Endocrine consultation if new diagnosis. Ensure patient education and crisis prevention kit before discharge.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-dispo-discharge', 'adrenal-insufficiency', 'result', 6,
 'Discharge with Follow-Up',
 '**ALL criteria must be met for discharge:**
• Hemodynamically stable
• Tolerating oral medications and fluids
• Precipitating illness resolved or stable
• Adequate steroid supply at home
• Emergency injection kit available (or prescribed)
• Patient understands sick-day rules

**Discharge plan:**
• Resume [Hydrocortisone](#/drug/hydrocortisone/maintenance) at maintenance dose (or increase to stress dose if illness ongoing)
• [Fludrocortisone](#/drug/fludrocortisone/adrenal maintenance) if PAI (continue home dose)
• Written sick-day action plan — [Sick-Day Rules & Stress Dosing Guide](#/info/ai-sick-day-rules)
• Endocrine follow-up within 1-2 weeks
• MedicAlert bracelet ordered if not already worn
• Emergency hydrocortisone injection kit prescribed

**Return precautions:**
• Fever not responding to sick-day dosing
• Persistent vomiting (>2 episodes — cannot take oral steroids)
• Dizziness or lightheadedness despite increased steroid dose
• Confusion or altered mental status
• Inability to take oral steroids for any reason [1][15]',
 '[1,15,16]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Discharge on maintenance steroids with sick-day rules handout. Ensure emergency injection kit. Endocrine follow-up in 1-2 weeks.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-adrenal-hemorrhage', 'adrenal-insufficiency', 'info', 6,
 'Adrenal Hemorrhage',
 '**Waterhouse-Friderichsen syndrome:**
• Bilateral adrenal hemorrhage, classically with meningococcal sepsis
• Also seen with DIC, antiphospholipid syndrome, heparin-induced thrombocytopenia
• CT abdomen: enlarged adrenals with hemorrhage (high-density on non-contrast CT)
• Irreversible PAI — lifelong glucocorticoid + mineralocorticoid replacement

**Anticoagulation-associated adrenal hemorrhage:**
• Risk factors: heparin (including LMWH), HIT, warfarin, DOACs + critical illness
• Presents as unexplained hemodynamic instability, flank/abdominal/back pain
• CT abdomen is diagnostic
• Management: hold or reverse anticoagulation if possible
• Immediate [Hydrocortisone](#/drug/hydrocortisone/adrenal crisis) 100 mg IV
• Often bilateral → permanent PAI requiring lifelong replacement [2][4]',
 '[2,4,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('ai-polyglandular', 'adrenal-insufficiency', 'info', 6,
 'Polyglandular Autoimmune Syndromes',
 '**Screen all autoimmune PAI patients for associated conditions:**

**Type 1 (APS-1 / APECED):**
• AI + hypoparathyroidism + chronic mucocutaneous candidiasis
• AIRE gene mutation, childhood onset
• Check: calcium, PTH, oral exam for candidiasis

**Type 2 (Schmidt syndrome — most common polyglandular syndrome):**
• AI + autoimmune thyroid disease (Hashimoto or Graves — most common association)
• ± Type 1 diabetes, vitiligo, pernicious anemia, celiac disease, premature ovarian failure
• Check: TSH, anti-TPO, HbA1c, vitamin B12

**CRITICAL:** Treat cortisol BEFORE thyroid hormone — starting levothyroxine in untreated AI precipitates adrenal crisis because thyroxine accelerates cortisol clearance. Always establish glucocorticoid replacement first, then add levothyroxine. [1][5][8]',
 '[1,5,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'ai-maintenance', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;


-- 5. drugs (2 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('hydrocortisone', 'Hydrocortisone (Solu-Cortef)', 'Hydrocortisone sodium succinate', 'Corticosteroid (glucocorticoid + mineralocorticoid)', 'IV / IM / PO',
 '["Adrenal crisis (adult)","Adrenal crisis (pediatric)","Stress dose (moderate illness/surgery)","Maintenance (adult)","Maintenance (pediatric)","Emergency IM self-injection"]'::jsonb,
 '[{"indication":"Adrenal crisis (adult)","regimen":"100 mg IV or IM bolus immediately. Then 200 mg/24h as continuous infusion (preferred) or 50 mg IV every 6 hours. Taper to oral maintenance over 1-3 days as hemodynamics stabilize. At doses ≥50 mg/day, fludrocortisone is NOT needed."},{"indication":"Stress dose (moderate illness/surgery)","regimen":"50 mg IV or PO every 8 hours for the duration of physiologic stress. Taper to maintenance dose over 2-3 days after resolution. For major surgery: 100 mg IV preop, then 200 mg/24h, taper as above."},{"indication":"Maintenance (adult)","regimen":"15-25 mg PO daily, divided BID or TID. Give 2/3 dose upon waking, 1/3 in early afternoon (last dose >6 hours before bedtime). Typical regimen: 15 mg AM + 5 mg at 2 PM. Use lowest effective dose to avoid Cushingoid features."},{"indication":"Pediatric adrenal crisis","regimen":"50 mg/m² IV bolus (max 100 mg). Then 50-100 mg/m²/day as continuous infusion or divided every 6-8 hours. Requires BSA calculation — use BSA Calculator. Weight-based approximation: ~2 mg/kg IV bolus.","weightCalc":{"dosePerKg":2,"unit":"mg","maxDose":100,"label":"Approximation (~50 mg/m²)"}},{"indication":"Pediatric maintenance","regimen":"6-10 mg/m²/day PO divided TID. Monitor growth velocity — overtreatment suppresses linear growth. Use BSA Calculator for precise dosing."},{"indication":"Emergency IM self-injection","regimen":"100 mg IM into lateral thigh. For patients unable to take oral steroids due to vomiting or altered mental status. Must present to ED immediately after injection for evaluation and IV steroids."}]'::jsonb,
 '["Systemic fungal infections (relative — do NOT withhold in adrenal crisis)"]'::jsonb,
 '["Hyperglycemia with stress dosing — monitor glucose frequently","Sodium retention and fluid overload at high doses","At doses ≥50 mg/day, provides sufficient mineralocorticoid effect — fludrocortisone not needed","Immunosuppression with prolonged supraphysiologic dosing","Adrenal suppression if used chronically at supraphysiologic doses — taper slowly"]'::jsonb,
 'Blood glucose (especially during stress dosing). Electrolytes (Na, K). Blood pressure. Growth velocity in children. Plasma renin activity for fludrocortisone titration.',
 'First-line corticosteroid for adrenal crisis and maintenance replacement. Preferred because it is structurally identical to endogenous cortisol, provides both glucocorticoid AND mineralocorticoid activity, and has a short half-life (~90 minutes) allowing physiologic diurnal dosing. Cortisol half-life of 90 minutes means systemic effects of deficiency may develop within hours. Continuous infusion may provide more stable cortisol levels than intermittent boluses.',
 NULL,
 '["Bornstein SR, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389.","Rushworth RL, et al. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.","Husebye ES, et al. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('methylprednisolone', 'Methylprednisolone (Solu-Medrol)', 'Methylprednisolone sodium succinate', 'Corticosteroid (glucocorticoid)', 'IV / PO',
 '["Adrenal crisis (alternative to hydrocortisone)"]'::jsonb,
 '[{"indication":"Adrenal crisis (alternative)","regimen":"40 mg IV every 24 hours. Use ONLY when hydrocortisone is unavailable. Minimal mineralocorticoid activity — consider adding fludrocortisone once transitioned to maintenance doses in patients with primary adrenal insufficiency."}]'::jsonb,
 '["Systemic fungal infections (relative — do NOT withhold in adrenal crisis)"]'::jsonb,
 '["Minimal mineralocorticoid activity — inferior to hydrocortisone for adrenal crisis where both glucocorticoid and mineralocorticoid replacement are needed","Hyperglycemia","Immunosuppression with prolonged use"]'::jsonb,
 'Blood glucose, electrolytes (Na, K), blood pressure, fluid status.',
 'Second-line alternative for adrenal crisis when hydrocortisone is unavailable. Glucocorticoid potency is ~5× hydrocortisone (4 mg methylprednisolone = 20 mg hydrocortisone), but has minimal mineralocorticoid effect. Preferred over dexamethasone when some mineralocorticoid activity is desired.',
 NULL,
 '["Rushworth RL, et al. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.","Bornstein SR, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency. JCEM. 2016;101(2):364-389."]'::jsonb,
 1)
;


-- 5b. drugs — UPDATE existing entries (3 drugs)
-- Updating Dexamethasone with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Croup (standard of care)","Cerebral edema","Antiemetic (chemotherapy)","Bacterial meningitis (adjunctive)","Airway edema","Adrenal crisis (alternative)","Adrenal maintenance (alternative)"]'::jsonb,
  dosing = '[{"indication":"Croup","regimen":"0.6 mg/kg PO as a single dose (max 16 mg). Low-dose alternative: 0.15 mg/kg PO (non-inferior). If unable to tolerate oral: 0.6 mg/kg IM.","weightCalc":[{"dosePerKg":0.6,"unit":"mg","maxDose":16,"label":"Standard dose"},{"dosePerKg":0.15,"unit":"mg","label":"Low-dose alternative"}]},{"indication":"Cerebral edema","regimen":"10 mg IV loading dose, then 4 mg IV/IM q6h."},{"indication":"Airway edema / post-extubation stridor","regimen":"0.5 mg/kg IV q6h x 4 doses, starting 12-24 hours before planned extubation.","weightCalc":{"dosePerKg":0.5,"unit":"mg"}},{"indication":"Bacterial Meningitis (adjunctive)","regimen":"0.15 mg/kg IV q6h × 2-4 days. Give WITH or up to 15-20 min BEFORE first antibiotic dose. Reduces mortality in pneumococcal meningitis (Cochrane 2015). STOP if Listeria or Cryptococcus identified — worsened outcomes.","weightCalc":{"dosePerKg":0.15,"unit":"mg","dailyDivided":4}},{"indication":"Adrenal crisis (alternative)","regimen":"4 mg IV every 24 hours. Use when hydrocortisone is unavailable OR when cosyntropin stimulation test is planned — dexamethasone does NOT cross-react with cortisol assays, allowing meaningful cortisol measurement during treatment. Zero mineralocorticoid activity — add fludrocortisone for primary AI once on maintenance."},{"indication":"Adrenal maintenance (alternative)","regimen":"0.25-0.5 mg PO once daily. Long half-life (~36 hours) allows once-daily dosing. No mineralocorticoid activity — must add fludrocortisone for primary AI. Higher growth suppression risk in children compared to hydrocortisone."}]'::jsonb,
  contraindications = '["Systemic fungal infections","Known hypersensitivity to dexamethasone"]'::jsonb,
  cautions = '["Single-dose use for croup is safe with minimal adverse effects","Hyperglycemia with repeated dosing — monitor glucose in diabetics","Immunosuppression with prolonged use — not a concern with single dose","May mask signs of infection with prolonged use"]'::jsonb,
  monitoring = 'Clinical response. For croup: reassess severity 2-3 hours after dose. For prolonged use: blood glucose, signs of infection.',
  notes = 'Standard of care for croup in ALL severities. A 2023 Cochrane review (45 RCTs, 5,888 children) showed glucocorticoids significantly reduce croup scores at 2, 6, 12, and 24 hours vs placebo. NNT = 7 to prevent one return visit. Single dose provides sustained benefit due to long half-life (~36 hours). Reduces return visits/readmissions by ~50% (RR 0.52). Low-dose (0.15 mg/kg) is non-inferior to standard dose in a 1,252-patient RCT.',
  citations = '["Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.","Bjornson CL, et al. A Randomized Trial of a Single Dose of Oral Dexamethasone for Mild Croup. N Engl J Med. 2004;351(13):1306-13.","Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.","Gates A, Johnson DW, Klassen TP. Glucocorticoids for Croup in Children. JAMA Pediatrics. 2019;173(6):595-596."]'::jsonb
WHERE id = 'dexamethasone';

-- Updating Fludrocortisone with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Hyperkalemia (adjunct — stimulates renal K+ excretion)","Adrenal insufficiency","Orthostatic hypotension","Adrenal insufficiency maintenance (PAI only)","Pediatric AI maintenance"]'::jsonb,
  dosing = '[{"indication":"Hyperkalemia adjunct","regimen":"0.2 mg PO once. Especially useful in patients on ACEi/ARB, tacrolimus, or with suspected type IV RTA."},{"indication":"Adrenal insufficiency maintenance (PAI only)","regimen":"50-200 μg (0.05-0.2 mg) PO once daily. For PRIMARY adrenal insufficiency only — NOT needed in secondary or tertiary AI (renin-angiotensin-aldosterone axis intact). Starting dose: 50-100 μg. Titrate based on plasma renin activity (target normal range), blood pressure, and serum potassium."},{"indication":"Pediatric AI maintenance","regimen":"50-200 μg PO daily. Higher doses may be needed in infants with salt-wasting congenital adrenal hyperplasia. Salt supplementation 1-2 g/day may be needed in infants. Monitor blood pressure, serum potassium, and plasma renin activity.","weightCalc":{"dosePerKg":0.05,"unit":"mg","maxDose":0.2,"label":"Starting dose — titrate to renin"}}]'::jsonb,
  contraindications = '["Systemic fungal infections","Active heart failure (sodium retention)"]'::jsonb,
  cautions = '["Sodium retention → fluid overload, edema, hypertension","Hypokalemia with prolonged use","Consider if patient making urine but K+ not falling (inadequate urine K+ content)"]'::jsonb,
  monitoring = 'Blood pressure, serum potassium, fluid status.',
  notes = 'Underutilized adjunct for hyperkalemia. Replaces the mineralocorticoid effect suppressed by ACEi/ARBs, tacrolimus, and other causes of type IV RTA. Stimulates ENaC sodium reabsorption and ROMK potassium secretion in the collecting duct. Most effective when combined with adequate sodium delivery to the collecting duct (i.e., after volume resuscitation).',
  citations = '["Palmer BF, Clegg DJ. Diagnosis and Treatment of Hyperkalemia. Cleve Clin J Med. 2017;84(12):934-942."]'::jsonb
WHERE id = 'fludrocortisone';

-- Updating Prednisolone with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Croup (alternative to dexamethasone)","Asthma exacerbation","Inflammatory conditions","Adrenal maintenance (alternative)"]'::jsonb,
  dosing = '[{"indication":"Croup","regimen":"1 mg/kg PO as a single dose (max 60 mg). Non-inferior to dexamethasone 0.6 mg/kg in a 1,252-patient RCT.","weightCalc":{"dosePerKg":1,"unit":"mg","maxDose":60}},{"indication":"Asthma exacerbation","regimen":"1-2 mg/kg/day PO (max 60 mg) for 3-5 days.","weightCalc":{"dosePerKg":2,"unit":"mg","maxDose":60}},{"indication":"Adrenal maintenance (alternative)","regimen":"3-5 mg PO once daily. Alternative to hydrocortisone for adrenal insufficiency maintenance. Advantage: once-daily dosing improves adherence. Available as liquid formulation for children. No mineralocorticoid activity — must add fludrocortisone for primary AI."}]'::jsonb,
  contraindications = '["Systemic fungal infections","Known hypersensitivity"]'::jsonb,
  cautions = '["Shorter half-life than dexamethasone (~12-36 hours vs ~36 hours) — may need additional doses for prolonged symptoms","Available as liquid formulation — easier for young children who cannot swallow tablets","Bitter taste — may cause vomiting in some children"]'::jsonb,
  monitoring = 'Clinical response. For croup: reassess severity 2-3 hours after dose.',
  notes = 'Non-inferior alternative to dexamethasone for croup based on Parker et al. (2019) — 1,252 children randomized to prednisolone 1 mg/kg vs dexamethasone 0.6 mg/kg showed equivalent outcomes for symptom relief and 7-day return visits. Advantage: widely available as liquid formulation. Disadvantage: shorter half-life means symptoms may recur, and bitter taste may cause vomiting.',
  citations = '["Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.","Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955."]'::jsonb
WHERE id = 'prednisolone';


-- 6. info_pages (6 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ai-summary', 'Adrenal Insufficiency Steps Summary', 'Stepwise management of adrenal crisis and chronic AI',
 '[{"heading":"1. Crisis Recognition & Resuscitation","body":"• [Assess clinical presentation](#/node/ai-start)\n• [Confirm crisis features — SBP ≤100 or ≥20 below baseline](#/node/ai-crisis-confirm)\n• [Immediate IV fluids — 1L NS (peds: 20 mL/kg)](#/node/ai-crisis-fluids)\n• [Emergency steroids — Hydrocortisone 100 mg IV](#/node/ai-crisis-steroid)"},{"heading":"2. Crisis Treatment","body":"• [Ongoing management — HC 200 mg/24h](#/node/ai-crisis-ongoing)\n• [Response assessment at 1-2 hours](#/node/ai-crisis-response)\n• [Identify and treat precipitant](#/node/ai-precipitant-workup)\n• [Refractory shock — broaden differential](#/node/ai-crisis-refractory)"},{"heading":"3. Type Classification","body":"• [PAI vs SAI vs TAI](#/node/ai-type-classify)\n• [Primary AI — Addison''s disease](#/node/ai-pai-workup)\n• [Secondary AI — pituitary](#/node/ai-sai-workup)\n• [Tertiary AI — steroid-induced](#/node/ai-tai-workup)"},{"heading":"4. Diagnostic Workup","body":"• [Morning cortisol + ACTH](#/node/ai-diagnostic-labs)\n• [Cosyntropin stimulation test](#/node/ai-cosyntropin)"},{"heading":"5. Maintenance & Stress Dosing","body":"• [Maintenance therapy — HC 15-25 mg PO daily](#/node/ai-maintenance)\n• [Sick-day rules — double/triple dose](#/node/ai-stress-dose)\n• [Medication-related triggers](#/node/ai-med-related)\n• [Crisis prevention & patient education](#/node/ai-prevention)"},{"heading":"6. Disposition","body":"• [ICU — active crisis / hemodynamic instability](#/node/ai-dispo-icu)\n• [Floor — acute illness / new diagnosis](#/node/ai-dispo-admit)\n• [Discharge — stable with follow-up](#/node/ai-dispo-discharge)"}]'::jsonb,
 '[]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ai-precipitants', 'Precipitating Factors & Differential Diagnosis', 'Common triggers for adrenal crisis and diagnostic mimics',
 '[{"heading":"Crisis Precipitants","body":"**Infection** — #1 trigger overall (viral in children, bacterial in adults) [1]\n**GI illness** — vomiting prevents oral steroid absorption\n**Surgery / trauma** — inadequate stress dosing perioperatively\n**Steroid withdrawal** — abrupt cessation of chronic glucocorticoids\n**CYP3A4 inducers** — rifampin, phenytoin, carbamazepine, phenobarbital accelerate cortisol metabolism\n**Adrenal hemorrhage** — anticoagulation, meningococcemia (Waterhouse-Friderichsen), antiphospholipid syndrome\n**Emotional stress** — significant psychological stressors\n**Temperature extremes** — heat or cold exposure\n**No identifiable trigger** — ~10% of cases [2]"},{"heading":"Differential Diagnosis","body":"**Shock** — septic, hypovolemic, cardiogenic, obstructive\n**Endocrine emergencies** — thyroid storm, myxedema coma, DKA, HHS\n**GI** — acute abdomen, gastroenteritis, dehydration\n**Cardiac** — acute MI, Takotsubo cardiomyopathy\n**Other** — anorexia nervosa, TCA overdose (can mimic adrenal crisis)"},{"heading":"Clinical Clues Favoring Adrenal Crisis","body":"• Shock refractory to fluids AND vasopressors\n• Hyperpigmentation (palmar creases, buccal mucosa)\n• Hyponatremia + hyperkalemia (PAI)\n• Hypoglycemia without diabetes or insulin use\n• Known chronic steroid use with missed doses\n• History of autoimmune disease\n• Rapid improvement after parenteral hydrocortisone (1-2 hours)"}]'::jsonb,
 '[{"num":1,"text":"Rushworth RL, Torpy DJ, Falhammar H. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861."},{"num":2,"text":"Hahner S, et al. High Incidence of Adrenal Crisis in Educated Patients. JCEM. 2015;100(2):407-416."},{"num":3,"text":"Lentz S, et al. Diagnosis and Management of Adrenal Insufficiency in the ED. J Emerg Med. 2022;63(2):212-220."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ai-lab-findings', 'Lab Findings by AI Type', 'Distinguishing primary, secondary, and tertiary adrenal insufficiency',
 '[{"heading":"Laboratory Comparison","body":"","drugTable":[{"drug":"Cortisol","regimen":"LOW in all types. AM cortisol <3 μg/dL virtually confirms AI. >15 μg/dL makes AI unlikely. 3-15 μg/dL requires stimulation test."},{"drug":"ACTH","regimen":"PAI: HIGH (>2× upper limit — compensatory). SAI/TAI: LOW or normal (pituitary/hypothalamic failure)."},{"drug":"Sodium","regimen":"LOW in all types (84% of crisis patients). PAI: aldosterone deficiency + cortisol-related ADH excess. SAI/TAI: cortisol-related ADH excess only."},{"drug":"Potassium","regimen":"PAI: HIGH (aldosterone deficiency — unique to PAI). SAI/TAI: NORMAL (aldosterone preserved)."},{"drug":"Aldosterone","regimen":"PAI: LOW (adrenal destruction). SAI/TAI: NORMAL (RAAS intact)."},{"drug":"Renin","regimen":"PAI: HIGH (compensatory for low aldosterone). SAI/TAI: NORMAL."},{"drug":"Glucose","regimen":"LOW in all types. Worse in SAI (combined GH + cortisol deficiency). Especially common in children."},{"drug":"Calcium","regimen":"May be ELEVATED in PAI (decreased cortisol-mediated suppression of intestinal absorption, hypovolemia)."},{"drug":"CBC","regimen":"Normocytic anemia, lymphocytosis, eosinophilia (loss of cortisol-mediated eosinophil suppression)."},{"drug":"TSH","regimen":"May be elevated — either from loss of cortisol suppression of TSH, or concomitant autoimmune hypothyroidism (polyglandular syndrome)."}]},{"heading":"Key Distinguishing Features","body":"**Only in PAI:** Hyperkalemia, hyperpigmentation, elevated ACTH, elevated renin, low aldosterone\n**Only in SAI:** Other pituitary deficits (TSH, LH/FSH, GH, prolactin abnormalities), visual field defects\n**Suggests TAI:** History of chronic exogenous steroid use (oral, inhaled, topical, intra-articular, opioids)"}]'::jsonb,
 '[{"num":1,"text":"Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389."},{"num":2,"text":"Husebye ES, et al. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ai-sick-day-rules', 'Sick-Day Rules for Adrenal Insufficiency', 'When and how to increase your steroid dose',
 '[{"heading":"When to Increase Your Steroid Dose","body":"Your body needs MORE cortisol when you are sick, injured, or under stress. You must increase your steroid dose to prevent a dangerous drop in cortisol called an adrenal crisis."},{"heading":"Minor Illness (Cold, Mild Stomach Bug)","body":"• Fever over 100.4°F (38°C): DOUBLE your daily dose\n• Fever over 102.2°F (39°C): TRIPLE your daily dose\n• Continue the increased dose for 2-3 days until you feel better\n• Then return to your normal dose"},{"heading":"Moderate Illness or Injury","body":"• TRIPLE your daily dose or take hydrocortisone 50 mg by mouth twice a day\n• Seek medical attention\n• Continue increased dose until illness resolves, then taper back to normal over 2-3 days"},{"heading":"Unable to Keep Medicine Down (Vomiting)","body":"• If you vomit within 30 minutes of taking your steroid pill, you need your EMERGENCY INJECTION\n• Give yourself hydrocortisone 100 mg into your outer thigh muscle (IM injection)\n• GO TO THE EMERGENCY ROOM IMMEDIATELY after the injection\n• You will need IV steroids and fluids"},{"heading":"Surgery or Major Procedure","body":"• Tell your surgeon and anesthesiologist that you have adrenal insufficiency\n• You will need extra steroids before, during, and after the procedure\n• Your endocrinologist or surgeon should provide specific dosing instructions"},{"heading":"What to Always Carry","body":"• Medical alert bracelet or necklace\n• Steroid emergency card with your diagnosis and medications\n• Emergency hydrocortisone injection kit\n• Written copy of these sick-day rules\n• Extra supply of your oral steroid medication"},{"heading":"When to Go to the Emergency Room","body":"• Vomiting and unable to keep your steroid pills down\n• Fever not improving despite increased steroid dose\n• Dizziness, lightheadedness, or fainting\n• Confusion or difficulty staying awake\n• Severe abdominal pain\n• After using your emergency injection"}]'::jsonb,
 '[{"num":1,"text":"Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389."},{"num":2,"text":"Burger-Stritt S, et al. Standardised Patient Education in Adrenal Insufficiency. Eur J Endocrinol. 2020;183(2):119-127."}]'::jsonb,
 true,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ai-special-populations', 'Special Populations in Adrenal Insufficiency', 'Pregnancy, pediatric CAH, chronic opioid users, checkpoint inhibitors',
 '[{"heading":"Pregnancy","body":"**Hydrocortisone is the glucocorticoid of choice** — inactivated by placental 11β-HSD2 (minimal fetal exposure). [1]\n\n• Increase HC by 20-40% in third trimester (physiologic cortisol rises in late pregnancy)\n• Morning sickness/hyperemesis may prevent oral absorption — use IM HC if vomiting\n• **Labor/delivery:** Stress-dose HC 100 mg IV at onset of labor, then 50 mg IV q8h until 24-48h postpartum\n• Cesarean section: treat as major surgery\n• Fludrocortisone may need increase (progesterone competes for mineralocorticoid receptor)\n• Interpret cortisol levels with caution — total cortisol rises in pregnancy due to increased cortisol-binding globulin"},{"heading":"Pediatric Congenital Adrenal Hyperplasia (CAH)","body":"**Most common cause of PAI in children** — 21-hydroxylase deficiency (>90% of cases). [2]\n\n• Maintenance: HC 6-10 mg/m²/day divided TID (lowest effective dose)\n• Fludrocortisone 50-200 μg/day for salt-wasting forms\n• Salt supplementation 1-2 g/day in infants\n• Monitor growth velocity — overtreatment suppresses linear growth\n• Newborn screening available in all US states (but can be missed)\n• Stress dosing: 30-50 mg/m²/day for illness, 50-100 mg/m² IV bolus for surgery\n• Parents must be trained in emergency IM injection technique\n• Sick-day rules education at every visit"},{"heading":"Chronic Opioid-Induced AI","body":"**Mechanism:** Opioids suppress hypothalamic CRH release → tertiary AI. [3]\n\n• Prevalence: ~15% of chronic opioid users\n• Higher risk with higher doses (>20 MME/day) and longer duration\n• No patient on <20 morphine milligram equivalents/day developed opioid-induced AI\n• Symptoms overlap with opioid side effects (fatigue, nausea) — easy to miss\n• Screen with AM cortisol in chronic opioid patients with fatigue or hypotension\n• May recover weeks to months after opioid cessation\n• Stress dosing needed until HPA recovery confirmed (AM cortisol >18 μg/dL off replacement)"},{"heading":"Immune Checkpoint Inhibitor-Induced","body":"**Ipilimumab (anti-CTLA-4):** Hypophysitis → secondary AI (highest risk, ~10% incidence). [4]\n**Pembrolizumab/nivolumab (anti-PD-1):** Primary adrenalitis → primary AI (less common).\n**Combined checkpoint therapy:** Highest overall endocrine toxicity risk.\n\n• Usually irreversible — lifelong hormone replacement needed\n• Do NOT hold cancer therapy — manage with hormone replacement and oncology co-management\n• Screen with AM cortisol + ACTH if new fatigue, hypotension, hyponatremia\n• MRI pituitary for suspected hypophysitis\n• Full anterior pituitary panel if SAI confirmed"}]'::jsonb,
 '[{"num":1,"text":"Lebbe M, Arlt W. What Is the Best Management Strategy for an Addison Patient During Pregnancy? Clin Endocrinol (Oxf). 2013;78(4):497-502."},{"num":2,"text":"Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389."},{"num":3,"text":"de Vries F, et al. Opioids and Their Endocrine Effects: Systematic Review and Meta-Analysis. JCEM. 2020;105(3):1020-1029."},{"num":4,"text":"Hahner S, et al. Adrenal Insufficiency. Nat Rev Dis Primers. 2021;7(1):19."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('ai-steroid-equivalency', 'Corticosteroid Equivalency & Alternatives', 'Glucocorticoid and mineralocorticoid potency comparison',
 '[{"heading":"Glucocorticoid Equivalency Table","body":"","drugTable":[{"drug":"Hydrocortisone","regimen":"20 mg = 1× glucocorticoid potency. Duration: 8-12h. Mineralocorticoid: 1×. Preferred for replacement."},{"drug":"Cortisone","regimen":"25 mg equivalent. Duration: 8-12h. Mineralocorticoid: 0.8×. Requires hepatic conversion to cortisol (less reliable)."},{"drug":"Prednis(ol)one","regimen":"5 mg equivalent. Duration: 12-36h. Mineralocorticoid: 0.8×. Once-daily option; liquid available for children."},{"drug":"Methylprednisolone","regimen":"4 mg equivalent. Duration: 12-36h. Mineralocorticoid: 0.5×. IV alternative when HC unavailable."},{"drug":"Dexamethasone","regimen":"0.75 mg equivalent. Duration: 36-54h. Mineralocorticoid: 0×. Once-daily; does not interfere with cortisol assay."},{"drug":"Fludrocortisone","regimen":"— (not used for glucocorticoid replacement). Mineralocorticoid: 125×. Used for mineralocorticoid replacement in PAI only."}]},{"heading":"Why Hydrocortisone Is Preferred","body":"• **Physiologic** — structurally identical to endogenous cortisol\n• **Dual activity** — provides both glucocorticoid AND mineralocorticoid effect\n• **Short half-life** (~8-12h) — allows physiologic diurnal dosing (high AM, low PM)\n• **Lower growth suppression** in children vs longer-acting steroids\n• **Crisis doses (≥50 mg/day)** provide sufficient mineralocorticoid effect — no fludrocortisone needed"},{"heading":"When Alternatives Are Appropriate","body":"**Dexamethasone:** When cosyntropin stimulation test is planned (no cortisol assay interference). Once-daily dosing for adherence. Avoid in children long-term (growth suppression).\n\n**Prednisolone:** Once-daily dosing improves adherence. Liquid formulation for young children. Widely available.\n\n**Methylprednisolone:** IV alternative when hydrocortisone is unavailable in crisis setting.\n\n**NOTE:** All non-hydrocortisone alternatives lack adequate mineralocorticoid activity — patients with PAI on these agents MUST also take fludrocortisone."}]'::jsonb,
 '[{"num":1,"text":"Bornstein SR, et al. Endocrine Society Clinical Practice Guideline. JCEM. 2016;101(2):364-389."},{"num":2,"text":"Husebye ES, et al. Adrenal Insufficiency. Lancet. 2021;397(10274):613-629."}]'::jsonb,
 false,
 5)
;

COMMIT;
