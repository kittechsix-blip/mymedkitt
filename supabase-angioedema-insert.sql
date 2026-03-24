-- =====================================================================
-- MedKitt — Angioedema Consult: Supabase INSERT Statements
-- Generated: 2026-03-23
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'angioedema',
  'Angioedema',
  'Airway → Classification → Histamine vs Bradykinin → Treatment → Disposition',
  '1.0',
  25,
  'angio-start',
  '["Initial Assessment","Classification","Histamine Treatment","Bradykinin Treatment","Abdominal Angioedema","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('emergency-medicine', 'angioedema', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (25 citations)
DELETE FROM tree_citations WHERE tree_id = 'angioedema';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('angioedema', 1, 'Kelly M, et al. National estimates of emergency department visits for angioedema and allergic reactions in the United States. Allergy Asthma Proc. 2013;34(2):150-154.'),
('angioedema', 2, 'Zanichelli A, et al. Misdiagnosis trends in patients with hereditary angioedema from the real-world clinical setting. Ann Allergy Asthma Immunol. 2016;117(4):394-398.'),
('angioedema', 3, 'Long BJ, Koyfman A, Gottlieb M. Evaluation and management of angioedema in the emergency department. West J Emerg Med. 2019;20(4):587-600.'),
('angioedema', 4, 'Moellman JJ, et al. A consensus parameter for the evaluation and management of angioedema in the emergency department. Acad Emerg Med. 2014;21(4):469-484.'),
('angioedema', 5, 'Bernstein JA, et al. Angioedema in the emergency department: a practical guide to differential diagnosis and management. Int J Emerg Med. 2017;10(1):15.'),
('angioedema', 6, 'Depetri F, et al. Angioedema and emergency medicine: from pathophysiology to diagnosis and treatment. Eur J Intern Med. 2019;59:8-13.'),
('angioedema', 7, 'Ishoo E, et al. Predicting airway risk in angioedema: staging system based on presentation. Otolaryngol Head Neck Surg. 1999;121(3):263-268.'),
('angioedema', 8, 'Das C, et al. Evaluation of staging criteria for disposition and airway intervention in emergency department angioedema patients. Acute Med Surg. 2021;8(1):e704.'),
('angioedema', 9, 'Sandefur BJ, et al. Emergency department intubations in patients with angioedema: a report from the National Emergency Airway Registry. J Emerg Med. 2021;61(5):481-488.'),
('angioedema', 10, 'Banerji A, et al. Epidemiology of ACE inhibitor angioedema utilizing a large electronic health record. J Allergy Clin Immunol Pract. 2017;5(3):744-749.'),
('angioedema', 11, 'Craig TJ, et al. C1 esterase inhibitor concentrate in 1085 hereditary angioedema attacks — final results of the I.M.P.A.C.T.2 study. Allergy. 2011;66(12):1604-1611.'),
('angioedema', 12, 'Zuraw BL, et al. Nanofiltered C1 inhibitor concentrate for treatment of hereditary angioedema. N Engl J Med. 2010;363(6):513-522.'),
('angioedema', 13, 'Zuraw B, et al. Recombinant human C1-inhibitor for the treatment of acute angioedema attacks in patients with hereditary angioedema. J Allergy Clin Immunol. 2010;126(4):821-827.'),
('angioedema', 14, 'Lumry WR, et al. Randomized placebo-controlled trial of the bradykinin B2 receptor antagonist icatibant for the treatment of acute attacks of hereditary angioedema: the FAST-3 trial. Ann Allergy Asthma Immunol. 2011;107(6):529-537.'),
('angioedema', 15, 'Cicardi M, et al. Icatibant, a new bradykinin-receptor antagonist, in hereditary angioedema. N Engl J Med. 2010;363(6):532-541.'),
('angioedema', 16, 'Bas M, et al. A randomized trial of icatibant in ACE-inhibitor-induced angioedema. N Engl J Med. 2015;372(5):418-425.'),
('angioedema', 17, 'Straka BT, et al. Effect of bradykinin receptor antagonism on ACE inhibitor-associated angioedema. J Allergy Clin Immunol. 2017;140(1):242-248.'),
('angioedema', 18, 'Cicardi M, et al. Ecallantide for the treatment of acute attacks in hereditary angioedema. N Engl J Med. 2010;363(6):523-531.'),
('angioedema', 19, 'Saeb A, et al. Using fresh frozen plasma for acute airway angioedema to prevent intubation in the emergency department: a retrospective cohort study. Emerg Med Int. 2016;2016:6091510.'),
('angioedema', 20, 'Wilkerson RG, Winters ME. Angiotensin-converting enzyme inhibitor-induced angioedema. Immunol Allergy Clin North Am. 2023;43(3):513-532.'),
('angioedema', 21, 'Beauchêne C, et al. Tranexamic acid as first-line emergency treatment for episodes of bradykinin-mediated angioedema induced by ACE inhibitors. Rev Med Interne. 2018;39(10):772-776.'),
('angioedema', 22, 'Wang K, et al. Tranexamic acid for ACE inhibitor induced angioedema. Am J Emerg Med. 2021;43:292.e5-e7.'),
('angioedema', 23, 'Rosenbaum S, et al. Clinical practice statement: what is the emergency department management of patients with angioedema secondary to an ACE-inhibitor? J Emerg Med. 2021;61(1):105-112.'),
('angioedema', 24, 'Lacuesta G, et al. Angioedema. Allergy Asthma Clin Immunol. 2024;20(Suppl 3):65.'),
('angioedema', 25, 'Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702.');

DELETE FROM decision_nodes WHERE tree_id = 'angioedema';

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


-- 5. drugs (9 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('icatibant', 'Icatibant (Firazyr)', 'Icatibant acetate', 'Bradykinin B2 Receptor Antagonist', 'SQ',
 '["Hereditary angioedema (acute attack)","ACEi-induced angioedema (off-label)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"30 mg SQ injection in the abdominal area. May repeat every 6 hours if needed, maximum 3 doses in 24 hours. FDA approved for acute HAE attacks in adults ≥18 years. FAST-3 trial: statistically significant improvement in time to clinically significant relief vs placebo."},{"indication":"ACEi-induced angioedema (off-label)","regimen":"30 mg SQ injection in the abdominal area. Bas 2015 RCT: median time to complete resolution 8 hours (vs 27.1 hours for steroid/antihistamine). No recurrence in the trial. However, subsequent RCTs (Straka 2017) yielded neutral results. 2019 meta-analysis of 3 RCTs found no statistically significant benefit."}]'::jsonb,
 '["Known hypersensitivity to icatibant"]'::jsonb,
 '["Extremely expensive (~$23,000 per dose)","Not widely available in all EDs","Injection site reactions common (97% in clinical trials — erythema, swelling, burning)","Functions downstream of the kallikrein amplification spiral — cannot break the vicious cycle driving bradykinin production","Mixed evidence for ACEi-induced angioedema"]'::jsonb,
 'Clinical response — time to symptom relief. Injection site reactions. Vital signs.',
 'Synthetic peptide structurally similar to bradykinin that specifically blocks the B2 receptor. Works downstream of the kallikrein-bradykinin spiral (blocks the receptor rather than interrupting bradykinin production). FDA approved 2011 for HAE in adults ≥18. FAST-1 was negative, FAST-2 showed superiority over TXA, FAST-3 was positive vs placebo. For ACEi-induced: Bas 2015 (NEJM) was positive but later studies neutral. May be less effective than agents that interrupt the upstream vicious spiral (C1-INH, TXA).',
 NULL,
 '["Lumry WR, et al. Icatibant for acute HAE (FAST-3). Ann Allergy Asthma Immunol. 2011;107(6):529-537.","Bas M, et al. A randomized trial of icatibant in ACE-inhibitor-induced angioedema. N Engl J Med. 2015;372(5):418-425.","Straka BT, et al. Effect of bradykinin receptor antagonism on ACEi-associated angioedema. J Allergy Clin Immunol. 2017;140(1):242-248."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ecallantide', 'Ecallantide (Kalbitor)', 'Ecallantide', 'Kallikrein Inhibitor', 'SQ',
 '["Hereditary angioedema (acute attack)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"30 mg SQ administered as 3 separate 10 mg injections. Inject at 3 separate sites (abdomen, upper arm, or thigh), each at least 2.5 inches apart. Inject away from site of angioedema. FDA approved for patients ≥12 years. Can repeat if attack persists — limited data on re-dosing."}]'::jsonb,
 '["Known hypersensitivity to ecallantide"]'::jsonb,
 '["~4% risk of anaphylaxis — administer ONLY in healthcare setting with capacity to manage anaphylaxis","Not for self-administration at home due to anaphylaxis risk","Limited data in patients <12 years old","Not recommended for ACEi-induced angioedema (RCTs showed minimal efficacy)"]'::jsonb,
 'Monitor for anaphylaxis for at least 30 minutes after administration. Clinical response.',
 '60-amino-acid polypeptide that specifically and reversibly inhibits plasma kallikrein. Kallikrein cleaves high-molecular-weight kininogen to release bradykinin. FDA approved 2009 (ages ≥16), expanded to ≥12 in 2014. EDEMA trials established efficacy. ~4% anaphylaxis risk limits home use. Not effective for ACEi-induced angioedema per RCTs (Bernstein 2014, Lewis 2015).',
 NULL,
 '["Cicardi M, et al. Ecallantide for the treatment of acute attacks in hereditary angioedema. N Engl J Med. 2010;363(6):523-531.","Bernstein JA, et al. Effectiveness of ecallantide in treating ACE inhibitor-induced angioedema. Ann Allergy Asthma Immunol. 2015;114(3):245-249."]'::jsonb,
 1)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('berinert', 'Berinert', 'C1 esterase inhibitor (human), pasteurized', 'C1-INH Concentrate (plasma-derived)', 'IV',
 '["Hereditary angioedema (acute attack)","Acquired angioedema","ACEi-induced angioedema (off-label)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"20 units/kg IV push at 4 mL/min. Round to nearest 500-unit vial (typical adult dose ~1500 units). Warm to room temperature before administration. FDA approved for acute abdominal, facial, or laryngeal HAE attacks in adults and adolescents. Median time to symptom relief: 0.46 hours. Single dose resolves 99% of HAE attacks (IMPACT-2).","weightCalc":{"dosePerKg":20,"unit":"units"}},{"indication":"Acquired angioedema","regimen":"20 units/kg IV push at 4 mL/min. Same dosing as HAE. Low C1q level distinguishes AAE from HAE.","weightCalc":{"dosePerKg":20,"unit":"units"}},{"indication":"ACEi-induced angioedema (off-label)","regimen":"20 units/kg IV push at 4 mL/min. Mixed results for ACEi-induced angioedema — not FDA-approved for this indication. Consider if targeted therapies (TXA, icatibant) unavailable or ineffective.","weightCalc":{"dosePerKg":20,"unit":"units"}}]'::jsonb,
 '["Known hypersensitivity to C1-INH or any component","Life-threatening hypersensitivity reactions to blood products"]'::jsonb,
 '["Derived from pooled human plasma — theoretical risk of infectious transmission","Thrombotic events reported rarely","Cost: ~$10,000 per 1500 units","May not be available in smaller hospitals"]'::jsonb,
 'Clinical response (symptom relief). Vital signs during infusion. Watch for hypersensitivity reactions.',
 'Plasma-derived C1-INH concentrate. First-line therapy for acute HAE attacks. Restores C1-INH activity, inhibiting kallikrein and preventing further bradykinin production. FDA approved 2009 based on IMPACT-1/2 trials. Preferred over recombinant C1-INH in pregnancy.',
 NULL,
 '["Craig TJ, et al. C1 esterase inhibitor concentrate in 1085 hereditary angioedema attacks — final results of the I.M.P.A.C.T.2 study. Allergy. 2011;66(12):1604-1611.","Bernstein JA, et al. Angioedema in the emergency department: a practical guide. Int J Emerg Med. 2017;10(1):15."]'::jsonb,
 2)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ruconest', 'Ruconest', 'Conestat alfa (recombinant C1 esterase inhibitor)', 'C1-INH Concentrate (recombinant)', 'IV',
 '["Hereditary angioedema (acute attack)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"50 units/kg IV for patients weighing <84 kg. 4200 units IV for patients ≥84 kg. Administer as slow IV injection. FDA approved for treatment of acute attacks in adults and adolescents with HAE. Median time to beginning of relief: 66 minutes (vs 495 minutes for placebo).","weightCalc":{"dosePerKg":50,"unit":"units","maxDose":4200}}]'::jsonb,
 '["Known or suspected rabbit allergy (produced from milk of transgenic rabbits)","Known hypersensitivity to conestat alfa"]'::jsonb,
 '["Produced from transgenic rabbit milk — unique allergy concern","Not preferred over Berinert in pregnancy (plasma-derived C1-INH preferred)","Cost approximately $10,000 per dose","Less commonly stocked than Berinert"]'::jsonb,
 'Clinical response. Vital signs during infusion. Watch for hypersensitivity reactions (especially in patients not previously screened for rabbit allergy).',
 'Recombinant human C1-INH produced from the milk of transgenic rabbits. Amino acid sequence identical to human C1-INH. Advantage: eliminates concern for infectious transmission from human plasma donors. Zuraw et al. conducted two independent RCTs showing significant reduction in time to symptom relief. FDA approved 2014.',
 NULL,
 '["Zuraw B, et al. Recombinant human C1-inhibitor for the treatment of acute angioedema attacks in patients with hereditary angioedema. J Allergy Clin Immunol. 2010;126(4):821-827."]'::jsonb,
 3)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('famotidine', 'Famotidine', 'Famotidine', 'H2 receptor antagonist', 'IV/PO',
 '["Anaphylaxis (H2 blocker)","Allergic reactions (adjunctive)","Angioedema / anaphylaxis (adjunct)","GERD / peptic ulcer disease"]'::jsonb,
 '[{"indication":"Anaphylaxis (H2 blocker)","regimen":"20 mg IV every 12 hours (inpatient). Second-line adjunct — give AFTER epinephrine. Combine with H1 blocker (diphenhydramine) — H1+H2 combination is superior to H1 alone for cutaneous symptoms.\n\nDoes NOT treat hypotension or bronchospasm. Onset ~30-45 minutes even IV."},{"indication":"Allergic reactions (discharge)","regimen":"20 mg PO BID × 3-5 days. Optional short-course for discharge. No evidence this prevents biphasic reactions."},{"indication":"Angioedema / anaphylaxis (adjunct)","regimen":"20 mg IV push. H2 blocker adjunct to H1 antihistamines. May help prevent hypotension and urticaria from histamine release. No large validated studies support H2 blockers for allergic emergencies, but favorable safety profile supports empiric use."}]'::jsonb,
 '["Known hypersensitivity to famotidine or other H2 blockers"]'::jsonb,
 '["Dose adjust in renal impairment (CrCl <50 mL/min: 20 mg once daily)","Headache, dizziness uncommon","Drug interactions with atazanavir (reduced absorption — avoid combination)"]'::jsonb,
 'Clinical symptom improvement.',
 'H2 blockade in anaphylaxis is adjunctive only. Histamine acts on both H1 and H2 receptors to increase vascular permeability and edema. Combined H1+H2 blockade was superior to H1 alone in a prospective randomized trial of 91 adults with acute allergic reactions (Lin et al 2000). However, antihistamines of any type do NOT treat the life-threatening components of anaphylaxis (hypotension, bronchospasm, airway edema).',
 NULL,
 '["Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.","Lin RY, et al. Improved outcomes in patients with acute allergic syndromes who are treated with combined H1 and H2 antagonists. Ann Emerg Med. 2000;36(5):462-468."]'::jsonb,
 4)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('cetirizine', 'Cetirizine (Zyrtec)', 'Cetirizine hydrochloride', '2nd-Generation H1 Antihistamine', 'PO',
 '["Angioedema / anaphylaxis (adjunct)","Urticaria","Allergic rhinitis"]'::jsonb,
 '[{"indication":"Angioedema / anaphylaxis (adjunct)","regimen":"10 mg PO. Second-generation H1 antagonist — less sedating than diphenhydramine. Used as adjunct to epinephrine, not as monotherapy for anaphylaxis. May not be feasible in patients intolerant of oral formulation."},{"indication":"Urticaria","regimen":"10 mg PO daily. Can increase up to 40 mg/day (4× standard dose) for refractory urticaria/idiopathic angioedema. Pediatric ≥6 years: 5-10 mg PO daily."}]'::jsonb,
 '["Known hypersensitivity to cetirizine or hydroxyzine"]'::jsonb,
 '["Mild drowsiness possible (less than first-generation antihistamines)","Reduce dose in renal impairment","Not available in IV formulation — patients unable to take PO will need diphenhydramine IV"]'::jsonb,
 'Symptom improvement. Sedation level.',
 'Second-generation H1 antihistamine with less sedation than diphenhydramine. Preferred for outpatient management and mild presentations. For acute ED management of angioedema, IV diphenhydramine may be more practical. High-dose (up to 4× standard) can be trialed for idiopathic histaminergic angioedema.',
 NULL,
 '["Moellman JJ, et al. A consensus parameter for the evaluation and management of angioedema in the emergency department. Acad Emerg Med. 2014;21(4):469-484."]'::jsonb,
 5)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('glucagon', 'Glucagon', 'Glucagon hydrochloride', 'Hyperglycemic agent / Beta-blocker reversal', 'IV/IM',
 '["Anaphylaxis refractory to epinephrine (beta-blocker patients)","Beta-blocker overdose","Hypoglycemia"]'::jsonb,
 '[{"indication":"Anaphylaxis (beta-blocked patient)","regimen":"Adults: 1-5 mg IV over 5 minutes, then infusion 5-15 mcg/min if needed.\nPediatric: 20-30 mcg/kg IV (max 1 mg) over 5 minutes.\n\nDISCOURAGED by critical care experts — weak evidence (scattered case reports only), only bypasses beta-1 receptors (NOT beta-2), and HIGH emesis risk which may compromise unsecured airway.\n\nReserve for LAST RESORT when epinephrine, methylene blue, and volume resuscitation have failed.","weightCalc":{"dosePerKg":0.02,"unit":"mg","maxDose":1,"label":"Pediatric (20 mcg/kg)"}},{"indication":"Beta-blocker overdose","regimen":"3-10 mg IV over 1 minute, then 3-5 mg/hr infusion. Bypasses beta-1 blockade via cAMP pathway independent of beta-adrenergic receptors."},{"indication":"Hypoglycemia","regimen":"1 mg IM/SQ/IV. If no response in 15 min, may repeat × 1."}]'::jsonb,
 '["Pheochromocytoma (may provoke catecholamine surge)","Insulinoma (rebound hypoglycemia)"]'::jsonb,
 '["HIGH emesis risk — have suction ready, aspiration precautions","Only bypasses beta-1 receptors, NOT beta-2 — does not address mast cell stabilization, bronchospasm, or vasodilation","Transient hyperglycemia","Hypokalemia","Very short-acting — may require infusion"]'::jsonb,
 'Heart rate, blood pressure, blood glucose, emesis.',
 'Historically recommended for beta-blocked anaphylaxis but now DISCOURAGED by critical care experts (Farkas/IBCC). The rationale for glucagon is to bypass beta-1 blockade in the heart (improving inotropy and chronotropy via cAMP). However, this does NOT address the core pathophysiology of anaphylaxis — mast cell stabilization and vasodilation are mediated by beta-2 receptors, which glucagon does not affect. The high risk of emesis in a patient with a potentially compromised airway makes glucagon a poor choice. Methylene blue (guanylate cyclase inhibitor) and higher-dose epinephrine are preferred for refractory anaphylaxis in beta-blocked patients.',
 NULL,
 '["Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.","Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24."]'::jsonb,
 6)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ffp', 'Fresh Frozen Plasma (FFP)', 'Fresh frozen plasma', 'Blood Product', 'IV',
 '["Bradykinin-mediated angioedema (second-line)","Coagulopathy reversal"]'::jsonb,
 '[{"indication":"Angioedema (second-line)","regimen":"2 units IV initially. May give additional 2 units if no response. Each unit is 200-250 mL. Contains C1-INH, ACE, and other bradykinin-metabolizing enzymes. Use only if targeted therapies (C1-INH concentrate, icatibant, TXA) are unavailable. Retrospective cohort: FFP reduced intubation risk in non-HAE angioedema patients."}]'::jsonb,
 '["IgA deficiency with anti-IgA antibodies (risk of anaphylaxis)","Volume overload (relative — consider volume of 2-4 units)"]'::jsonb,
 '["TRALI (transfusion-related acute lung injury) — rare but serious","Volume overload — 2-4 units = 400-1000 mL; use caution in heart failure","Infectious transmission risk (low with modern screening)","Contains kallikrein substrates (high-molecular-weight kininogen) — theoretical risk of paradoxical worsening, though little evidence supports this","Some case reports describe worsening of ACEi-induced angioedema with FFP","Type and screen required before administration"]'::jsonb,
 'Clinical response. Vital signs during transfusion. Watch for TRALI (dyspnea, hypoxia within 6 hours).',
 'Second-line therapy for bradykinin-mediated angioedema when targeted therapies are unavailable. Contains the enzymes that metabolize bradykinin (including ACE and C1-INH), addressing the underlying deficit. Multiple case reports and one retrospective cohort study support efficacy, but no RCTs exist. FFP is universally available and relatively inexpensive. The theoretical concern for paradoxical worsening (from kallikrein substrates) has little clinical evidence.',
 NULL,
 '["Saeb A, et al. Using fresh frozen plasma for acute airway angioedema to prevent intubation. Emerg Med Int. 2016;2016:6091510.","Bernstein JA, et al. Angioedema in the emergency department: a practical guide. Int J Emerg Med. 2017;10(1):15."]'::jsonb,
 7)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('aminocaproic-acid', 'Aminocaproic Acid (Amicar)', 'Aminocaproic acid', 'Antifibrinolytic (lysine analog)', 'IV / PO',
 '["Bradykinin-mediated angioedema (adjunct)"]'::jsonb,
 '[{"indication":"Bradykinin-mediated angioedema","regimen":"4-5 g IV over 1 hour loading dose, then 1 g/hour continuous infusion. Alternative to tranexamic acid for bradykinin-mediated angioedema. Inhibits plasminogen activation, interrupting the kallikrein amplification spiral. May require ongoing treatment — bradykinin-mediated angioedema evolves over days."}]'::jsonb,
 '["Active intravascular clotting (DIC)","Upper urinary tract bleeding (risk of ureteral clot obstruction)"]'::jsonb,
 '["Thrombotic risk — avoid in patients with active DVT/PE or recent thromboembolic events","Renal impairment — dose reduce","Myopathy with prolonged use","Concurrent use with factor IX concentrates or anti-inhibitor coagulant complexes increases thrombotic risk"]'::jsonb,
 'Thrombotic complications, renal function, CPK with prolonged use.',
 'Alternative antifibrinolytic to TXA for bradykinin-mediated angioedema. Blocks conversion of plasminogen to plasmin, a critical step in the kallikrein amplification spiral that drives bradykinin-mediated angioedema. Available in most hospitals. Less widely studied than TXA for angioedema but shares the same mechanism of action.',
 NULL,
 '["Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702."]'::jsonb,
 8)
;


-- 6. info_pages (7 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-steps-summary', 'Angioedema Steps Summary', 'Quick-reference pathway through the Angioedema consult',
 '[{"heading":"Module 1 — Initial Assessment & Airway","body":"• [Assess airway: signs of compromise (stridor, voice change, dyspnea)?](#/node/angio-start)\n• [Secure airway: dual setup, awake fiberoptic, avoid RSI](#/node/angio-airway-secure)\n• [Monitor: supplemental O2, avoid positive pressure, frequent reassessment](#/node/angio-airway-monitor)"},{"heading":"Module 2 — Classification","body":"• [Classify: histamine-mediated (urticaria) vs bradykinin-mediated (no urticaria)](#/node/angio-classify)\n• [Bradykinin screen: ACEi? HAE? Post-tPA? Acquired? Idiopathic?](#/node/angio-bradykinin-screen)\n• [Undifferentiated: empiric histamine treatment, reassess in 30-60 min](#/node/angio-empiric)"},{"heading":"Module 3 — Histamine-Mediated Treatment","body":"• [Severity assessment: anaphylaxis features vs isolated angioedema](#/node/angio-histamine-treat)\n• [Anaphylaxis: epinephrine IM + H1/H2 blockers + methylprednisolone + IVF](#/node/angio-anaphy-treat)\n• [Isolated: antihistamines, observe 4-6 hours](#/node/angio-histamine-mild)"},{"heading":"Module 4 — Bradykinin-Mediated Treatment","body":"• [ACEi-induced: STOP ACEi, TXA or icatibant or FFP, observe](#/node/angio-acei-treat)\n• [HAE acute: C1-INH concentrate (Berinert) first-line, icatibant/ecallantide alternatives](#/node/angio-hae-treat)\n• [First presentation: send C4 level, treat empirically](#/node/angio-hae-new)\n• [Acquired angioedema: low C1q distinguishes from HAE, screen for malignancy](#/node/angio-aae)\n• [Post-tPA: icatibant or C1-INH, AVOID TXA](#/node/angio-tpa)\n• [Pediatric: smaller airway, C1-INH preferred, US over CT for abdominal](#/node/angio-peds)\n• [Pregnancy: Berinert preferred, variable disease course](#/node/angio-pregnancy)"},{"heading":"Module 5 — Abdominal Angioedema","body":"• [GI involvement in up to 73% of HAE — mimics acute abdomen](#/node/angio-abdominal)\n• [Treat underlying cause — improvement confirms diagnosis, avoid unnecessary surgery](#/node/angio-abdominal-treat)"},{"heading":"Module 6 — Disposition","body":"• [Ishoo staging: Stage 1-4 by anatomic location](#/node/angio-dispo)\n• [Stage 1-2 (face/lip/palate): observe 4-6h, discharge with precautions](#/node/angio-dispo-mild)\n• [Stage 3 (tongue/floor of mouth): admit for monitoring](#/node/angio-dispo-admit)\n• [Stage 4 (laryngeal): ICU — 67% require airway intervention](#/node/angio-dispo-icu)"}]'::jsonb,
 '[]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-differentiation', 'Histamine vs Bradykinin Angioedema', 'Key differentiating features to guide treatment',
 '[{"heading":"Onset & Duration","body":"**Histamine-mediated:** Rapid onset (minutes to hours). Episodes typically resolve within 24-37 hours. [1]\n\n**Bradykinin-mediated:** Slow onset (evolves over hours to days). Episodes typically last 48-72 hours, occasionally up to 5 days. [1]"},{"heading":"Distribution","body":"**Histamine-mediated:** Diffuse, symmetric. Lips 30%, tongue 33%, eyelids 4%, larynx 3%, extremities 11%. [2]\n\n**Bradykinin-mediated:** Often focal and asymmetric. Tongue 42%, lips 24%, eyelids 2%, larynx 17%, extremities 4%. [2]"},{"heading":"Associated Skin Findings","body":"**Histamine-mediated:** Urticaria and/or pruritus often present. Flushing may occur.\n\n**Bradykinin-mediated:** NO urticaria or pruritus. HAE may cause erythema marginatum (non-pruritic erythematous rings on torso)."},{"heading":"Triggers","body":"**Histamine-mediated:** Allergic triggers — foods, insect stings, medications, environmental allergens. IgE type I hypersensitivity, direct mast cell degranulation (contrast, opioids), or COX inhibition (NSAIDs). [1]\n\n**Bradykinin-mediated:** Trauma, infections, stress, estrogens (pregnancy). ACEi use (any time from hours to 10+ years after starting). Often no obvious trigger."},{"heading":"Systemic Involvement","body":"**Histamine-mediated:** Other organs commonly involved — hypotension, wheezing (strong indicator of histamine involvement), GI symptoms (nausea/vomiting, diarrhea). [1]\n\n**Bradykinin-mediated:** Usually does NOT involve other organs. GI involvement (bowel edema) may occur in HAE but often not synchronous with upper airway symptoms."},{"heading":"Response to Treatment","body":"**Histamine-mediated:** Responds rapidly to epinephrine, antihistamines, and corticosteroids.\n\n**Bradykinin-mediated:** Does NOT respond to epinephrine, antihistamines, or corticosteroids. Requires targeted therapy: C1-INH concentrate, icatibant, TXA, or FFP."}]'::jsonb,
 '[{"num":1,"text":"Bernstein JA, et al. Angioedema in the emergency department: a practical guide to differential diagnosis and management. Int J Emerg Med. 2017;10(1):15."},{"num":2,"text":"Lenschow M, et al. A score for the differential diagnosis of bradykinin- and histamine-induced head and neck swellings. Eur Arch Otorhinolaryngol. 2018;275(7):1767-1773."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-labs', 'Angioedema Lab Interpretation', 'Laboratory findings by angioedema type',
 '[{"heading":"C4 Level (Screening Test)","body":"**C4 is the best screening test for C1-INH-mediated angioedema.** [1]\n\n• **96% sensitive during an acute attack** (81% between attacks)\n• Low C4 found in: HAE Type 1, HAE Type 2, Acquired angioedema\n• Normal C4 in: HAE Type 3 (normal C1-INH), ACEi-induced, Idiopathic\n\n**Obtain C4 in the ED during acute attack** if personal/family history suggests HAE — testing is most sensitive during attacks."},{"heading":"C1-INH Concentration (Antigen Level)","body":"• **HAE Type 1:** Low (<30%) — most common type (85% of HAE)\n• **HAE Type 2:** Normal — the protein is present but dysfunctional\n• **HAE Type 3:** Normal\n• **Acquired angioedema:** Low or normal\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal"},{"heading":"C1-INH Function","body":"• **HAE Type 1:** Low (<30%)\n• **HAE Type 2:** Low (<30%) — THIS is the key finding (normal antigen but low function)\n• **HAE Type 3:** Normal\n• **Acquired angioedema:** Low\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal"},{"heading":"C1q Level","body":"**C1q distinguishes HAE from Acquired Angioedema (AAE):** [2]\n\n• **HAE (all types):** Normal C1q\n• **Acquired angioedema:** Low C1q (in ~75% of patients) — the KEY differentiator\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal"},{"heading":"Other Labs","body":"**Tryptase:** Elevated in anaphylaxis/histamine-mediated angioedema (but NOT always — may be normal even in severe cases). Not elevated in bradykinin-mediated angioedema. Draw within 1-4 hours of symptom onset. [1]\n\n**Paraprotein:** Present in most acquired angioedema cases (associated with lymphoproliferative disorders).\n\n**CRP:** Some studies suggest elevation in ACEi-induced angioedema, but not widely adopted for diagnosis.\n\n**NOTE:** There is no rapid point-of-care test to definitively diagnose the type of angioedema in the ED. Definitive testing requires days to weeks."}]'::jsonb,
 '[{"num":1,"text":"Wilkerson RG, Winters ME. Angiotensin-converting enzyme inhibitor-induced angioedema. Immunol Allergy Clin North Am. 2023;43(3):513-532."},{"num":2,"text":"Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-ishoo-staging', 'Ishoo Staging & Disposition', 'Predicting airway risk and disposition based on anatomic location',
 '[{"heading":"Modified Ishoo Staging System","body":"**Stage 1:** Facial rash, facial edema, lip edema\n**Stage 2:** Soft palate edema\n**Stage 3:** Tongue edema, floor of mouth edema\n**Stage 4:** Laryngeal edema (voice change, hoarseness, stridor, dyspnea)"},{"heading":"Disposition Probabilities (Das 2021, n=320)","body":"**Stage 1:**\n• ED discharge: 85%\n• Admission without airway intervention: 2.5%\n• Airway intervention: 0.1%\n\n**Stage 2:**\n• ED discharge: 65%\n• Admission without airway intervention: 8%\n• Airway intervention: 1%\n\n**Stage 3:**\n• ED discharge: 30%\n• Admission without airway intervention: 12%\n• Airway intervention: 8%\n\n**Stage 4:**\n• ED discharge: 0%\n• ICU without airway intervention: 17%\n• Airway intervention: 67% [1][2]"},{"heading":"Key Clinical Correlations","body":"• Voice change, hoarseness, dyspnea, and stridor are significantly correlated with need for ICU admission [1]\n• Voice change, hoarseness, dyspnea, and stridor predict need for airway intervention [1]\n• **Edema localized to lips alone = low intubation risk** [1][2]\n• Approximately 40-60% of all angioedema patients are admitted for observation"},{"heading":"General Disposition Recommendations","body":"• **All patients:** Strict return precautions if symptoms worsen or airway compromise develops\n• **All patients:** PCP follow-up recommended (ideally next day)\n• **Allergic/immunologic component:** Short course of antihistamines + epinephrine autoinjector\n• **ACEi-induced:** Discontinue ACEi permanently, PCP for alternative antihypertensive\n• **Known HAE:** Discharge with targeted therapy for recurrence prevention, refer to allergist/immunologist\n• **Unknown cause:** Send C4 level (from ED or via PCP), refer for further evaluation"}]'::jsonb,
 '[{"num":1,"text":"Ishoo E, et al. Predicting airway risk in angioedema: staging system based on presentation. Otolaryngol Head Neck Surg. 1999;121(3):263-268."},{"num":2,"text":"Das C, et al. Evaluation of staging criteria for disposition and airway intervention in emergency department angioedema patients. Acute Med Surg. 2021;8(1):e704."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-hae-types', 'HAE Classification & Triggers', 'Hereditary angioedema subtypes and precipitating factors',
 '[{"heading":"HAE Type 1 (85% of HAE)","body":"**Deficient C1-INH level** (<30% of normal).\n\nMost common form. Autosomal dominant inheritance — but 25% arise from de novo mutations (no family history). Prevalence: 1:100,000 to 1:150,000.\n\nLab findings: Low C4, Low C1-INH antigen, Low C1-INH function, Normal C1q."},{"heading":"HAE Type 2 (15% of HAE)","body":"**Normal C1-INH level but decreased C1-INH function** (<30% of normal).\n\nThe protein is present but dysfunctional. Key diagnostic clue: normal C1-INH antigen but low C1-INH function.\n\nLab findings: Low C4, Normal C1-INH antigen, Low C1-INH function, Normal C1q."},{"heading":"HAE Type 3 (Rare — Normal C1-INH)","body":"Previously known as \"HAE with normal C1-INH.\" Linked to genetic mutations in:\n• Factor XII (increases prekallikrein → kallikrein conversion)\n• Angiopoietin-1\n• Plasminogen gene\n\nClinically associated with predominantly tongue edema. All complement levels are normal — diagnosis requires genetic testing. C1-INH concentrate efficacy is variable. [1]"},{"heading":"Acquired Angioedema (AAE)","body":"Very rare (~1.5 per million). Typically presents after age 40. Acquired C1-INH deficiency.\n\n**Type I:** Associated with lymphoproliferative disorders (CLL, NHL, Waldenstrom, MGUS). Due to increased consumption of C1-INH.\n\n**Type II:** Associated with autoimmune disease (lupus). Due to autoantibodies against C1-INH.\n\n**Key differentiator from HAE:** Low C1q (normal in HAE, low in ~75% of AAE). [1]"},{"heading":"Common Triggers for HAE Attacks","body":"• **Infection** (most common trigger in adults — bacterial; in children — viral)\n• **Trauma** (dental procedures, surgery)\n• **Emotional stress**\n• **Estrogens** (oral contraceptives, pregnancy — enhance bradykinin signaling)\n• **Physical stimuli** (cold, pressure, vibration)\n• **Medications** (ACE inhibitors can unmask/worsen subclinical HAE)"},{"heading":"Key Facts","body":"• 50-75% of HAE patients have first attack by age 12 (mean onset 5-11 years)\n• 25% of cases arise from de novo mutations — no family history\n• Up to 44% of HAE patients are initially misdiagnosed\n• GI involvement in up to 73% — can mimic acute abdomen\n• Mean delay to diagnosis: 8-10 years"}]'::jsonb,
 '[{"num":1,"text":"Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-discharge', 'Angioedema Discharge Instructions', 'Patient information and return precautions',
 '[{"heading":"What is Angioedema?","body":"You had swelling beneath the skin, called angioedema. This can be caused by an allergic reaction, a medication side effect, or a genetic condition. Your emergency team treated your swelling and monitored you to make sure it improved."},{"heading":"Return to the Emergency Department Immediately If","body":"• Your swelling returns or gets worse\n• You develop a change in your voice or hoarseness\n• You have difficulty breathing or swallowing\n• You develop swelling of your tongue or throat\n• You feel lightheaded, dizzy, or faint\n• You develop a widespread rash or hives with difficulty breathing"},{"heading":"If You Were Taking an ACE Inhibitor","body":"Your blood pressure medication (such as lisinopril, enalapril, ramipril, or benazepril) may have caused your swelling. This is a side effect, not an allergy.\n\n**You must STOP this medication permanently.** Do NOT restart it or take any other ACE inhibitor.\n\nContact your primary care doctor within 1-2 days to discuss a different blood pressure medication. There are many safe alternatives available."},{"heading":"If You Were Given an Epinephrine Auto-Injector","body":"You have been prescribed an epinephrine auto-injector (such as an EpiPen). Carry it with you at all times. If you develop sudden swelling, hives, or difficulty breathing, use it immediately and call 911."},{"heading":"Follow-Up","body":"• See your primary care doctor within 1-2 days\n• If a hereditary or genetic cause is suspected, you may be referred to an allergist or immunologist for further testing\n• Keep a record of your episodes — note what you were eating, doing, or taking before the swelling started"}]'::jsonb,
 '[]'::jsonb,
 true,
 5)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-acei-alternatives', 'ACEi Alternative Medications', 'Blood pressure management after ACEi-induced angioedema',
 '[{"heading":"ACEi-Induced Angioedema — Key Points","body":"• ACEi-induced angioedema is a **class effect** — ALL ACE inhibitors carry this risk\n• It is **NOT dose-dependent** — symptoms can occur at any dose, hours to years after starting\n• The patient must **discontinue ALL ACE inhibitors permanently** [1]"},{"heading":"Angiotensin Receptor Blockers (ARBs)","body":"ARBs (losartan, valsartan, irbesartan, candesartan, etc.) have historically been quoted as having ~10% cross-reactivity with ACEi for angioedema. However, more recent data suggest the risk is much lower.\n\nARBs do NOT inhibit ACE directly (they block the angiotensin II receptor), so bradykinin accumulation is less of a concern. ARBs may be considered as an alternative antihypertensive, but this decision should be made by the patient''s primary care provider with close monitoring, not in the ED. [1]"},{"heading":"Alternative Antihypertensive Classes","body":"• **Calcium channel blockers** (amlodipine, nifedipine) — no cross-reactivity concern\n• **Thiazide diuretics** (hydrochlorothiazide, chlorthalidone) — first-line per JNC guidelines\n• **Beta-blockers** (metoprolol, carvedilol) — no cross-reactivity concern\n• **Direct renin inhibitors** (aliskiren) — CAUTION: may also affect bradykinin metabolism\n\n**The choice of alternative should be made by the patient''s PCP** based on comorbidities, not in the ED."},{"heading":"ED Discharge Counseling","body":"• Stop the ACEi today — do not take any more doses\n• Follow up with PCP within 1-2 days for medication adjustment\n• Inform the patient this is a side effect (not an allergy) — document as \"ACEi intolerance\" not \"ACEi allergy\" in the medical record\n• Educate that angioedema can recur even after stopping the ACEi (rare, usually within first few weeks)"}]'::jsonb,
 '[{"num":1,"text":"Rosenbaum S, et al. Clinical practice statement: what is the emergency department management of patients with angioedema secondary to an ACE-inhibitor? J Emerg Med. 2021;61(1):105-112."}]'::jsonb,
 false,
 6)
;

COMMIT;
