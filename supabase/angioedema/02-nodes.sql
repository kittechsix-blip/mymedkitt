BEGIN;
-- 4. decision_nodes (25 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-start', 'angioedema', 'question', 1,
 'Angioedema — Initial Assessment',
 '[Angioedema Steps Summary](#/info/angio-steps-summary)

~110,000 ED visits/year in the US. Up to 44% of patients with hereditary angioedema (HAE) are initially misdiagnosed. The critical first step is assessment of airway patency. [1][5][7]

Assess for signs of airway compromise: voice change, hoarseness, stridor, dyspnea, inability to handle secretions.',
 '[1,5,7]'::jsonb, '[{"label":"Signs of Airway Compromise","description":"Stridor, voice change, dyspnea, drooling","next":"angio-airway-secure","urgency":"critical"},{"label":"Concerning but Stable","description":"Facial/tongue swelling without airway symptoms","next":"angio-airway-monitor"},{"label":"No Airway Concern","description":"Peripheral or mild facial edema only","next":"angio-classify"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-airway-secure', 'angioedema', 'info', 1,
 'Secure the Airway',
 '**DUAL SETUP: Intubation + cricothyrotomy ready simultaneously.** Awake fiberoptic intubation preferred — do NOT paralyze until clear view of airway anatomy obtained. Nasotracheal route may bypass lingual swelling (95% first-attempt success vs 70% orotracheal). Avoid positive-pressure ventilation — barotrauma worsens edema. [9]

Flexible endoscope used in 49% of angioedema intubations. Cricothyrotomy performed in 2% of cases. Topical lidocaine for awake approaches. [9]

**[Awake Intubation](#/tree/awake-intubation)** (see Airway category)

**Extubation:** Wait for visible improvement of edema. Extubate over airway exchange catheter. Video laryngoscopy to confirm laryngeal edema resolution. Cuff leak may provide adjunctive info.',
 '[9]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-classify', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-airway-monitor', 'angioedema', 'info', 1,
 'Airway Monitoring',
 '**Supplemental O2 and continuous monitoring.** Do NOT use NIPPV (CPAP/BiPAP) — positive pressure/barotrauma can worsen angioedema. [5]

Frequent reassessment is critical — clinical conditions can change rapidly. Low threshold for definitive airway if any signs of compromise.

Flexible laryngoscopy on case-by-case basis for patients with facial edema but no laryngeal symptoms. The true airway threat is the larynx and posterior tongue — not the lips and anterior tongue. [7][8]

**KEY:** Edema localized to the lips alone does NOT have increased intubation risk. [7][8]',
 '[5,7,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-classify', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2)
;


-- MODULE 2: CLASSIFICATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-classify', 'angioedema', 'question', 2,
 'Classify the Angioedema',
 'The most important distinction is **histamine-mediated vs bradykinin-mediated** angioedema. Treatment is entirely different for each. [3][5]

[Histamine vs Bradykinin Differentiation](#/info/angio-differentiation)

**Histamine-mediated:** Rapid onset (minutes-hours), urticaria/pruritus, responds to epinephrine/antihistamines. Accounts for 40-70% of ED presentations. [5]

**Bradykinin-mediated:** Slow onset (hours-days), NO urticaria, does NOT respond to epinephrine/antihistamines/steroids. Includes ACEi-induced, HAE, and acquired angioedema. [5]',
 '[3,5]'::jsonb, '[{"label":"Urticaria, Pruritus, or Flushing Present","description":"Suggests histamine-mediated (allergic) cause","next":"angio-histamine-treat"},{"label":"No Urticaria — Isolated Swelling","description":"Suggests bradykinin-mediated cause","next":"angio-bradykinin-screen"},{"label":"Unclear / Undifferentiated","description":"No clear trigger, uncertain mechanism","next":"angio-empiric"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-bradykinin-screen', 'angioedema', 'question', 2,
 'Bradykinin-Mediated — Identify Cause',
 'Bradykinin-mediated angioedema is NOT an allergic reaction. Epinephrine, antihistamines, and corticosteroids are generally INEFFECTIVE. [3][5][20]

[Lab Interpretation Guide](#/info/angio-labs)

**Key history:** ACEi/ARB use, family history of angioedema, prior similar episodes, recent tPA administration, age of first episode, associated lymphoproliferative disorder.',
 '[3,5,20]'::jsonb, '[{"label":"ACEi or ARB Use","description":"30% of all ED angioedema visits in the US","next":"angio-acei"},{"label":"Known or Suspected HAE","description":"Family history, recurrent episodes, onset < age 20","next":"angio-hae"},{"label":"Post-tPA Administration","description":"0.9-7.9% incidence after alteplase","next":"angio-tpa"},{"label":"Age >40, No Family History","description":"Acquired C1-INH deficiency, lymphoproliferative disorder","next":"angio-aae"},{"label":"Recurrent Without Trigger","description":"No clear cause identified","next":"angio-idiopathic"},{"label":"Abdominal Pain as Primary Symptom","description":"GI involvement — mimics acute abdomen","next":"angio-abdominal"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-empiric', 'angioedema', 'question', 2,
 'Undifferentiated Angioedema',
 'When the etiology is unclear, assume histamine-mediated (the most common cause, 40-70%) and start empiric treatment. [3][5]

**Start:** [Epinephrine](#/drug/epinephrine/anaphylaxis) 0.3-0.5 mg IM + [Diphenhydramine](#/drug/diphenhydramine/angioedema) 25-50 mg IV. Reassess in 30-60 minutes.

A diagnostic/therapeutic challenge of epinephrine is reasonable — histamine-mediated angioedema will almost always respond rapidly. Failure to respond suggests bradykinin-mediated process. [5]',
 '[3,5]'::jsonb, '[{"label":"Response to Treatment","description":"Improvement with epinephrine/antihistamines","next":"angio-histamine-mild"},{"label":"No Response — Consider Bradykinin","description":"Refractory to epinephrine and antihistamines","next":"angio-bradykinin-screen"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;


-- MODULE 3: HISTAMINE TREATMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-histamine-treat', 'angioedema', 'question', 3,
 'Histamine-Mediated — Severity Assessment',
 'Histamine-mediated angioedema exists along the spectrum of allergic reaction and anaphylaxis. Treatment is the same as for anaphylaxis. [3][5]

Assess for multisystem involvement — this differentiates anaphylaxis from isolated angioedema.',
 '[3,5]'::jsonb, '[{"label":"Anaphylaxis Features","description":"Hypotension, wheeze, multisystem involvement (skin + respiratory/GI/cardiovascular)","next":"angio-anaphy-treat","urgency":"critical"},{"label":"Isolated Angioedema","description":"Localized swelling without systemic features","next":"angio-histamine-mild"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-anaphy-treat', 'angioedema', 'result', 3,
 'Anaphylaxis Protocol',
 '**TREAT AS ANAPHYLAXIS — Epinephrine is first-line.** [3][4]

**Epinephrine:**
• [Epinephrine](#/drug/epinephrine/anaphylaxis) 0.3-0.5 mg IM (1 mg/mL) into anterolateral thigh
• Repeat every 5-20 minutes, up to 3 doses
• Pediatric: 0.01 mg/kg IM (max 0.3 mg)
• **Refractory:** IV epinephrine drip 1-4 mcg/min (0.01-0.02 mcg/kg/min)
• **"Dirty" drip:** 1 mg epinephrine in 1 L NS = 1 mcg/mL, run wide open

**Adjuncts:**
• **H1 blocker:** [Diphenhydramine](#/drug/diphenhydramine/angioedema) 25-50 mg IV + [Cetirizine](#/drug/cetirizine/angioedema) 10 mg PO
• **H2 blocker:** [Famotidine](#/drug/famotidine/angioedema) 20 mg IV
• **Corticosteroid:** [Methylprednisolone](#/drug/methylprednisolone/angioedema) 125 mg IV (adjunct — limited evidence for angioedema, but commonly given) [4]
• **IV crystalloid** if hypotensive

**On beta-blocker + refractory hypotension:**
• [Glucagon](#/drug/glucagon/anaphylaxis) 1-5 mg IV every 5 minutes
• Increases cAMP independent of adrenergic receptors [3]',
 '[3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Full anaphylaxis protocol. Observe minimum 4-6 hours. Biphasic reaction risk.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-histamine-mild', 'angioedema', 'result', 3,
 'Isolated Histamine-Mediated Angioedema',
 '**No anaphylaxis features — localized, self-limited.**

• **H1 blocker:** [Diphenhydramine](#/drug/diphenhydramine/angioedema) 25-50 mg IV/PO or [Cetirizine](#/drug/cetirizine/angioedema) 10 mg PO
• **Consider H2 blocker:** [Famotidine](#/drug/famotidine/angioedema) 20 mg IV — limited evidence but favorable safety profile [4]
• **Consider corticosteroid:** [Methylprednisolone](#/drug/methylprednisolone/angioedema) 125 mg IV — not proven effective in RCTs for angioedema specifically, but commonly given [4]
• Remove trigger if identified (food, insect sting, NSAID, new medication)

**Observe 4-6 hours** in ED to assess for progression. ~40-60% of angioedema patients are admitted for observation. [5]',
 '[4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Observe 4-6 hours. Discharge with antihistamines and return precautions if stable.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8)
;


-- MODULE 4: BRADYKININ TREATMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-acei', 'angioedema', 'info', 4,
 'ACEi-Induced Angioedema',
 '**STOP the ACEi immediately.** This is NOT an allergic reaction — it is a side effect (class effect). [5][10][20]

**Key facts:**
• Up to 30% of all ED angioedema visits in the US [5]
• ~0.7% of patients develop angioedema within 5 years of ACEi use [10]
• NOT dose-dependent — can occur hours to 10+ years after starting [5]
• 5-fold higher risk in Black patients (5% vs 0.5%) [20]
• Can also occur with ARBs (less common)

**Epinephrine, antihistamines, and corticosteroids are generally INEFFECTIVE** — this is a bradykinin-mediated process, not histamine-mediated. [3][5][20]

**Distinguish from allergic:** Slow onset, no urticaria, often asymmetric, primarily tongue/lip involvement.',
 '[3,5,10,20]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-acei-treat', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-acei-treat', 'angioedema', 'result', 4,
 'ACEi-Induced — Treatment',
 '**Discontinue ACEi permanently. Observation is the cornerstone.** [5][20][23]

**Targeted therapies (present both evidence perspectives):**

**Antifibrinolytic approach (emerging evidence):**
• [Tranexamic Acid](#/drug/tranexamic-acid/angioedema) 1 g IV load, then 1 g over 8 hours — blocks plasminogen→plasmin conversion, interrupting the kallikrein amplification spiral. Case series: all 31 non-intubated patients avoided intubation. A single dose may be inadequate — ongoing treatment often required. [21][22]
• [Aminocaproic Acid](#/drug/aminocaproic-acid/angioedema) 4-5 g IV over 1 hour, then 1 g/hour — alternative antifibrinolytic

**Bradykinin receptor antagonist:**
• [Icatibant](#/drug/icatibant/acei angioedema) 30 mg SQ — Bas 2015 RCT: faster resolution vs steroids/antihistamines (8h vs 27.1h). However, subsequent RCTs yielded neutral results. Very expensive (~$23,000). [16][17]

**Fresh frozen plasma:**
• [Fresh Frozen Plasma](#/drug/ffp/angioedema) 2 units — contains ACE enzyme + C1-INH. Retrospective cohort: reduced intubation risk. However, mixed evidence — some reports of worsening. Risk of TRALI, volume overload. [19]

**C1-INH concentrate:**
• [Berinert](#/drug/berinert/angioedema) 20 units/kg IV — mixed results for ACEi-induced (not FDA-approved for this indication) [20]

[ACEi Alternative Medications](#/info/angio-acei-alternatives)

**Observe minimum 4-6 hours.** Advise patient to stop ACEi permanently and follow up with PCP for alternative antihypertensive.',
 '[5,16,17,19,20,21,22,23]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Stop ACEi permanently. Consider TXA or icatibant. Observe minimum 4-6 hours. PCP follow-up for medication change.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-hae', 'angioedema', 'question', 4,
 'Hereditary Angioedema',
 'HAE subtypes are caused by C1 esterase inhibitor (C1-INH) deficiency or dysfunction. Prevalence: 1:100,000 to 1:150,000. ~25% arise from de novo mutations (no family history). [2][5]

[HAE Classification & Triggers](#/info/angio-hae-types)
[Lab Interpretation Guide](#/info/angio-labs)

**Type 1 (85%):** Deficient C1-INH level
**Type 2 (15%):** Normal level but decreased C1-INH function
**Type 3 (rare):** Normal C1-INH — linked to factor XII mutations',
 '[2,5]'::jsonb, '[{"label":"Known HAE Type 1 or 2","description":"Confirmed C1-INH deficiency/dysfunction","next":"angio-hae-treat"},{"label":"Unknown / First Presentation","description":"Suspected HAE — not yet confirmed","next":"angio-hae-new"},{"label":"Pediatric Patient","description":"50-75% have first attack by age 12","next":"angio-peds"},{"label":"Pregnant or Lactating","description":"Variable disease course in pregnancy","next":"angio-pregnancy"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-hae-treat', 'angioedema', 'result', 4,
 'HAE — Acute Treatment',
 '**First-line: C1-INH replacement therapy.** [11][12][13]

**C1-INH concentrates:**
• [Berinert](#/drug/berinert/hereditary angioedema) 20 units/kg IV push at 4 mL/min — preferred. FDA approved for acute HAE. Median symptom relief: 0.46 hours. 99% attack resolution with single dose. [11]
• [Ruconest](#/drug/ruconest/hereditary angioedema) 50 units/kg IV (<84 kg) or 4200 units (≥84 kg) — recombinant C1-INH from transgenic rabbits. Contraindicated if rabbit allergy. Median relief: 66 min. [13]

**Alternative targeted therapies:**
• [Icatibant](#/drug/icatibant/hereditary angioedema) 30 mg SQ in abdomen — bradykinin B2 receptor antagonist. Repeat q6h, max 3 doses/24h. [14][15]
• [Ecallantide](#/drug/ecallantide/hereditary angioedema) 30 mg SQ (3 × 10 mg at separate sites, ≥2.5" apart) — kallikrein inhibitor. ~4% anaphylaxis risk — administer in healthcare setting only. Ages ≥12. [18]

**Adjunctive / if targeted therapy unavailable:**
• [Tranexamic Acid](#/drug/tranexamic-acid/angioedema) 1 g IV — antifibrinolytic, interrupts kallikrein amplification spiral. Effective for all HAE types. [25]
• [Aminocaproic Acid](#/drug/aminocaproic-acid/angioedema) 4-5 g IV — alternative antifibrinolytic
• [Fresh Frozen Plasma](#/drug/ffp/angioedema) 2-4 units — last resort (contains C1-INH but also kallikrein substrates — theoretical worsening risk) [19]

**HAE with normal C1-INH (Type 3):** C1-INH concentrate efficacy is variable. Icatibant and TXA may be more effective. [25]',
 '[11,12,13,14,15,18,19,25]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'C1-INH concentrate is first-line for HAE Types 1 and 2. Icatibant or ecallantide as alternatives. TXA if targeted therapy unavailable.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-hae-new', 'angioedema', 'info', 4,
 'First Presentation — Suspected HAE',
 '**Send C4 level — best screening test in the ED.** [5]

• C4 is **96% sensitive during an acute attack** and 81% sensitive between attacks [20]
• Low C4 + clinical suspicion warrants empiric treatment while awaiting confirmatory testing
• Outpatient confirmatory workup: C1-INH level, C1-INH function, C1q

**If HAE is strongly suspected, do NOT delay treatment for lab confirmation.** Start C1-INH concentrate if available.

**Family history is suggestive but not definitive** — 25% of HAE cases are from de novo mutations. [5]

[Lab Interpretation Guide](#/info/angio-labs)',
 '[5,20]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-hae-treat', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-aae', 'angioedema', 'result', 4,
 'Acquired Angioedema (AAE)',
 '**Very rare (~1.5 per million).** Acquired C1-INH deficiency, typically presents after age 40. [5]

**Associated with:**
• Lymphoproliferative disorders (CLL, non-Hodgkin lymphoma, Waldenstrom, MGUS)
• Autoimmune disease (lupus — anti-C1-INH autoantibodies)

**Lab findings:**
• Low C4 (same as HAE)
• Low C1-INH level or function (same as HAE)
• **LOW C1q** — THIS distinguishes AAE from HAE (C1q is normal in HAE) [5][25]
• Paraprotein often present

**Treatment:** Same as HAE — [Berinert](#/drug/berinert/hereditary angioedema) 20 units/kg IV, [Icatibant](#/drug/icatibant/hereditary angioedema) 30 mg SQ, or [Tranexamic Acid](#/drug/tranexamic-acid/angioedema). [25]

**Must screen for underlying malignancy** — refer to hematology/oncology.',
 '[5,25]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Treat as HAE. Low C1q distinguishes AAE from HAE. Screen for lymphoproliferative disorder.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-tpa', 'angioedema', 'result', 4,
 'Post-tPA Angioedema',
 '**Incidence: 0.9-7.9% after alteplase administration.** tPA increases kinins in plasma. [5]

**Management:**
• Consider stopping tPA infusion if airway is threatened — weigh stroke severity vs airway risk
• [Icatibant](#/drug/icatibant/acei angioedema) 30 mg SQ (case reports of benefit)
• [Berinert](#/drug/berinert/hereditary angioedema) 20 units/kg IV (case reports)
• [Fresh Frozen Plasma](#/drug/ffp/angioedema) 2 units if targeted therapy unavailable

**AVOID Tranexamic Acid — contraindicated in acute ischemic stroke** (thrombotic risk in setting of ongoing cerebral ischemia).

Continue standard stroke management. Secure airway if needed.',
 '[5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Consider stopping tPA. Icatibant or C1-INH if available. AVOID TXA in acute stroke.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-idiopathic', 'angioedema', 'info', 4,
 'Idiopathic Angioedema',
 'Idiopathic angioedema is defined as recurrent angioedema without urticaria, with no identified cause despite thorough evaluation. [4][25]

**Two subtypes (differentiated by treatment response):**

**Idiopathic histaminergic:** Responds to high-dose antihistamines (up to 4× standard dose), leukotriene antagonists, and/or steroids.

**Idiopathic non-histaminergic:** Refractory to antihistamines → consider:
• [Tranexamic Acid](#/drug/tranexamic-acid/angioedema) — often effective, especially as suppressive therapy [25]
• [Icatibant](#/drug/icatibant/hereditary angioedema) or C1-INH may sometimes be effective

**Trial of high-dose [Cetirizine](#/drug/cetirizine/angioedema) or [Diphenhydramine](#/drug/diphenhydramine/angioedema) first** — response confirms histaminergic subtype.',
 '[4,25]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-peds', 'angioedema', 'result', 4,
 'Pediatric HAE',
 '**50-75% of HAE patients have first attack by age 12.** Mean age of onset: 5-11 years. [5][24]

**Special considerations:**
• Smaller airway diameter → laryngeal edema leads to asphyxia faster than adults
• Fiberoptic laryngoscopy more technically difficult (lower compliance)
• 43.7% of pediatric HAE ED visits present with respiratory distress [24]

**Abdominal presentations common:**
• Colicky abdominal pain mimicking acute abdomen (appendicitis, intussusception)
• **Abdominal ultrasound preferred** — radiation-sparing, can identify bowel wall edema and intussusception (which is associated with HAE) [24]

**Treatment:**
• C1-INH replacement preferred — [Berinert](#/drug/berinert/hereditary angioedema) 20 units/kg IV (FDA approved for pediatric HAE) [24]
• Limited ecallantide data in patients <12 years old
• [Icatibant](#/drug/icatibant/hereditary angioedema) — FDA approved for ≥18 years only',
 '[5,24]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Smaller airway = faster compromise. C1-INH concentrate preferred. US over CT for abdominal symptoms.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-pregnancy', 'angioedema', 'result', 4,
 'Pregnancy & Lactation',
 'Physiologic changes in pregnancy can **mitigate, aggravate, or have no effect** on underlying HAE — variable and unpredictable. [5]

**Preferred acute treatment:**
• [Berinert](#/drug/berinert/hereditary angioedema) 20 units/kg IV — plasma-derived C1-INH, considered safest option [5]

**If Berinert unavailable:**
• [Ruconest](#/drug/ruconest/hereditary angioedema) (recombinant C1-INH) — recommended if plasma-derived C1-INH not available and no rabbit allergy [5]
• [Icatibant](#/drug/icatibant/hereditary angioedema) — for life-threatening attacks only when C1-INH unavailable. Recent small studies suggest safety in pregnancy. [5]

**Estrogens can exacerbate bradykinin signaling** — estrogen-containing products may worsen HAE.',
 '[5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Berinert 20 units/kg IV is preferred in pregnancy. Ruconest or icatibant only if C1-INH unavailable.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;


-- MODULE 5: ABDOMINAL ANGIOEDEMA
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-abdominal', 'angioedema', 'info', 5,
 'Abdominal Angioedema',
 '**GI involvement occurs in up to 73% of HAE patients.** Abdominal pain is present in 95% of GI cases. [5]

**Presentation:**
• Severe abdominal pain, diarrhea, nausea, vomiting, ascites
• Can appear severe enough to mimic acute abdomen → unnecessary imaging and surgical exploration
• Often recurrent — detailed history is critical

**Imaging findings:**
• CT: Ascites (most common), segmental bowel wall edema with or without skip segments, straightening of bowel segments [5]
• Pediatrics: Abdominal ultrasound preferred (radiation-sparing) — can identify bowel wall edema and intussusception

**KEY:** In patients with recurrent abdominal pain + family history of HAE, consider angioedema before proceeding to surgery.',
 '[5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-abdominal-treat', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-abdominal-treat', 'angioedema', 'result', 5,
 'Abdominal — Treatment',
 '**Treat the underlying angioedema — symptom improvement confirms the diagnosis.** [5]

**For known/suspected HAE:**
• [Berinert](#/drug/berinert/hereditary angioedema) 20 units/kg IV — improvement in symptoms supports the diagnosis
• Alternative: [Icatibant](#/drug/icatibant/hereditary angioedema) 30 mg SQ or [Tranexamic Acid](#/drug/tranexamic-acid/angioedema) 1 g IV

**In patients with known HAE and typical recurrent abdominal episodes:**
• Reasonable to defer imaging if clinical picture is consistent with prior episodes AND patient improves with targeted therapy [4]

**Avoid unnecessary surgical exploration** — angioedema-related bowel edema resolves with treatment.

**If diagnosis uncertain:** Standard acute abdomen workup remains appropriate. Send C4 level if HAE suspected.',
 '[4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'angio-dispo', 'Treat underlying angioedema. Symptom improvement confirms diagnosis. Avoid unnecessary surgery.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-dispo', 'angioedema', 'question', 6,
 'Disposition — Ishoo Staging',
 'Angioedema staging based on anatomic location helps predict need for admission and airway intervention. [7][8]

[Ishoo Staging & Disposition Guide](#/info/angio-ishoo-staging)

**Modified Ishoo Staging:**
• **Stage 1:** Facial rash, facial edema, lip edema
• **Stage 2:** Soft palate edema
• **Stage 3:** Tongue edema, floor of mouth edema
• **Stage 4:** Laryngeal edema (voice change, stridor)

All patients need strict return precautions and PCP follow-up. [4]',
 '[4,7,8]'::jsonb, '[{"label":"Stage 1-2: Face / Lip / Soft Palate","description":"Peripheral edema without tongue or laryngeal involvement","next":"angio-dispo-mild"},{"label":"Stage 3: Tongue / Floor of Mouth","description":"Higher risk for airway progression","next":"angio-dispo-admit","urgency":"urgent"},{"label":"Stage 4: Laryngeal Involvement","description":"Voice change, stridor, or confirmed laryngeal edema","next":"angio-dispo-icu","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-dispo-mild', 'angioedema', 'result', 6,
 'Stage 1-2 — Observation / Discharge',
 '**ED observation 4-6 hours minimum.** [5][7][8]

Edema localized to the lips alone does NOT have increased intubation risk. [7][8] Stage 1: 85% treated and discharged from ED; 0.1% require airway intervention. [8]

**Discharge criteria:**
• No progression of symptoms during observation
• No signs of airway compromise
• Able to tolerate oral intake
• Reliable patient with understanding of return precautions

**Discharge with:**
• [Angioedema Discharge Instructions](#/info/angio-discharge)
• Return precautions: worsening swelling, voice change, difficulty breathing/swallowing
• PCP follow-up (ideally next day)
• **If allergic component:** Prescribe epinephrine autoinjector + short course antihistamines
• **If ACEi-induced:** Stop ACEi permanently, PCP for alternative antihypertensive
• **If HAE suspected:** Send C4 level, refer to allergist/immunologist

[ACEi Alternative Medications](#/info/angio-acei-alternatives)',
 '[4,5,7,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Observe 4-6 hours. Discharge with return precautions, PCP follow-up, and appropriate medication changes.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-dispo-admit', 'angioedema', 'result', 6,
 'Stage 3 — Admit for Monitoring',
 '**Tongue and floor of mouth edema — admit for close airway monitoring.** [7][8]

• Continued medical therapy based on angioedema type
• Serial airway assessments (including flexible laryngoscopy if available)
• Dual setup at bedside (intubation equipment + cric tray)
• **Escalate to ICU if any progression** of laryngeal symptoms

Stage 3 has significantly higher risk of ICU admission and airway intervention compared to Stage 1-2. [8]',
 '[7,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for close airway monitoring. Serial airway assessments. Low threshold for ICU escalation.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('angio-dispo-icu', 'angioedema', 'result', 6,
 'Stage 4 — ICU Admission',
 '**Laryngeal involvement — ICU admission required.** [7][8]

Stage 4 patients: **67% probability of airway intervention**, 17% require ICU without airway intervention, 0% discharged from ED. [8]

• Airway secured or continuous monitoring with dual setup at bedside
• Ongoing targeted medical therapy
• Serial laryngoscopy to assess for resolution
• **Extubation planning:** Wait for visible improvement. Extubate over airway exchange catheter. Video laryngoscopy to confirm resolution. [9]

For HAE patients: Discharge with targeted therapy (home C1-INH or icatibant) to reduce recurrence risk. Refer to allergist/immunologist for long-term prophylaxis.',
 '[7,8,9]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU admission. 67% require airway intervention. Refer HAE patients for long-term prophylaxis.', NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24)
;
COMMIT;
