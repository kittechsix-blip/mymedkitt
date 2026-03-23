BEGIN;
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
COMMIT;
