-- =====================================================================
-- MedKitt — Anaphylaxis Management Consult: Supabase INSERT Statements
-- Generated: 2026-03-23
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'anaphylaxis',
  'Anaphylaxis Management',
  'Recognition → Epinephrine → Resuscitation → Refractory → Disposition',
  '1.0',
  27,
  'anaph-start',
  '["Recognition & Diagnosis","Epinephrine","Resuscitation","Refractory & Special Populations","Adjunctive Therapies","Disposition & Discharge"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('emergency-medicine', 'anaphylaxis', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (12 citations)
DELETE FROM tree_citations WHERE tree_id = 'anaphylaxis';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('anaphylaxis', 1, 'Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025.'),
('anaphylaxis', 2, 'Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients: Early Recognition and Treatment Are Critical for Best Outcomes. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24.'),
('anaphylaxis', 3, 'Singer E, Zodda D. Allergy and Anaphylaxis: Principles of Acute Emergency Management. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24.'),
('anaphylaxis', 4, 'Farkas J. PulmCrit — How to use IV epinephrine for anaphylaxis. EMCrit/PulmCrit. August 26, 2019.'),
('anaphylaxis', 5, 'Golden DBK, Wang J, et al. Anaphylaxis: A 2023 Practice Parameter Update. Ann Allergy Asthma Immunol. 2024;132(2):124-176.'),
('anaphylaxis', 6, 'Dodd A, Hughes A, Sargant N, et al. Evidence update for the treatment of anaphylaxis. Resuscitation. 2021;163:86-96.'),
('anaphylaxis', 7, 'McHugh K, Repanshek Z. Anaphylaxis: Emergency Department Treatment. Emerg Med Clin North Am. 2022;40(1):19-32.'),
('anaphylaxis', 8, 'Gorham NP. Anaphylaxis: After the Emergency Department. Emerg Med Clin North Am. 2022;40(1):33-37.'),
('anaphylaxis', 9, 'Long B, Gottlieb M. Emergency medicine updates: Anaphylaxis. Am J Emerg Med. 2021;49:35-39.'),
('anaphylaxis', 10, 'Brown SGA, Blackman KE, Stenlake V, Heddle R. Insect sting anaphylaxis; prospective evaluation of treatment with intravenous adrenaline and volume resuscitation. Emerg Med J. 2004;21(2):149-154.'),
('anaphylaxis', 11, 'Krishnaswamy G. Critical Care Management of the Patient With Anaphylaxis: A Concise Definitive Review. Crit Care Med. 2021;49(5):838-857.'),
('anaphylaxis', 12, 'Pumphrey RS. Lessons for management of anaphylaxis from a study of fatal reactions. Clin Exp Allergy. 2000;30(8):1144-50.');

DELETE FROM decision_nodes WHERE tree_id = 'anaphylaxis';

-- 4. decision_nodes (27 nodes)

-- MODULE 1: RECOGNITION & DIAGNOSIS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-start', 'anaphylaxis', 'info', 1,
 'Anaphylaxis Management',
 '[Anaphylaxis Steps Summary](#/info/anaph-summary)

**Epinephrine is the ONLY first-line treatment for anaphylaxis.** There are NO absolute contraindications to epinephrine in anaphylaxis — the risk of NOT giving it always exceeds the risk of giving it.

**Causes of anaphylaxis:**
• Medications — 34%
• Food — 31%
• Insect stings — 20%
• Environmental — 7.5%
• Exercise — 1.2%
• Idiopathic — 11% [1][3]',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-diagnosis', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-diagnosis', 'anaphylaxis', 'question', 1,
 'Does This Meet Anaphylaxis Criteria?',
 '**WAO 2020 Diagnostic Criteria — either criterion:**

**Criterion 1:** Skin/mucosal involvement (urticaria, flushing, angioedema) PLUS at least one of:
• Respiratory compromise (dyspnea, wheeze, stridor, hypoxemia)
• Hypotension or end-organ dysfunction (syncope, incontinence, collapse)
• Severe GI symptoms (crampy abdominal pain, repetitive vomiting)

**Criterion 2:** After exposure to a **known or likely allergen**, TWO or more of:
• Skin/mucosal involvement
• Respiratory compromise
• Hypotension/end-organ dysfunction
• Persistent GI symptoms

[Differential Diagnosis](#/info/anaph-ddx)

**Onset timing:** IV medications <30 min, insect stings ~15 min, food minutes to hours. [1][3]',
 '[1,3]'::jsonb, '[{"label":"Yes — Anaphylaxis criteria met","next":"anaph-source-control","urgency":"critical"},{"label":"Isolated urticaria / mild allergic reaction","next":"anaph-mild"},{"label":"Uncertain — monitor and reassess","next":"anaph-uncertain"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-mild', 'anaphylaxis', 'result', 1,
 'Mild Allergic Reaction — Not Anaphylaxis',
 'Isolated urticaria without respiratory compromise, hypotension, or multi-organ involvement.

**Treatment:**
• [Diphenhydramine](#/drug/diphenhydramine/anaphylaxis) 25-50 mg PO/IV
• [Famotidine](#/drug/famotidine/anaphylaxis) 20 mg PO/IV
• Observe 2-4 hours

**LOW threshold to give epinephrine** — if any concern for progression, treat as anaphylaxis. [1][3]',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Mild allergic reaction. Treat with antihistamines, observe 2-4 hours. Reclassify if symptoms progress.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 2)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-uncertain', 'anaphylaxis', 'info', 1,
 'Uncertain — Active Monitoring',
 'Aggressive monitoring with low threshold to treat:

• Establish IV access immediately
• Have [Epinephrine](#/drug/epinephrine/anaphylaxis im) drawn up at bedside (0.5 mL of 1 mg/mL)
• Reassess every 5-10 minutes
• Monitor for progression to multi-organ involvement
• **Low threshold to treat as anaphylaxis** — early epinephrine improves outcomes [1][3]',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-source-control', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3)
;


-- MODULE 2: EPINEPHRINE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-source-control', 'anaphylaxis', 'info', 2,
 'Source Control & IM Epinephrine',
 '**SIMULTANEOUS actions:**

**Source control:**
• Stop all infusions/transfusions
• Remove insect stinger (scrape, do not squeeze)
• Sugammadex 16 mg/kg for rocuronium-induced

**IM Epinephrine — FIRST LINE:**
• [Epinephrine](#/drug/epinephrine/anaphylaxis im) **0.5 mg IM** (0.5 mL of 1 mg/mL) into **anterolateral thigh**
• Pediatric: **0.01 mg/kg IM** (max 0.5 mg)
• Repeat every 5 minutes, up to 3 doses

**Do NOT delay for:**
• IV access
• Antihistamines
• Steroids

Anterolateral thigh achieves faster peak levels than deltoid or subcutaneous injection (Simons 2001). [1][2][3][4]',
 '[1,2,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-epi-response', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-epi-response', 'anaphylaxis', 'question', 2,
 'Response After IM Epinephrine?',
 'Assess 5 minutes after each dose.

**Good response:** Improved blood pressure, reduced wheeze/stridor, improved skin perfusion.
**Poor response:** Persistent hypotension, worsening respiratory distress, no clinical improvement.

Up to 3 IM doses before escalating to IV epinephrine. [1][4]',
 '[1,4]'::jsonb, '[{"label":"Good response after IM epi","next":"anaph-post-epi-stable"},{"label":"Partial response — still symptomatic","next":"anaph-iv-access","urgency":"urgent"},{"label":"No response / worsening after 2-3 doses","next":"anaph-iv-access","urgency":"critical"},{"label":"Peri-arrest / cardiovascular collapse","next":"anaph-peri-arrest","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-post-epi-stable', 'anaphylaxis', 'info', 2,
 'Good Response to IM Epinephrine',
 'Continue monitoring — patient responding to IM epinephrine.

• Continuous cardiac monitoring + SpO2
• Vitals every 5-15 minutes
• Maintain IV access
• Proceed to adjunctive therapies now that epinephrine has been given [1][3]',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-fluids', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-iv-access', 'anaphylaxis', 'question', 2,
 'IV Access for Epinephrine Infusion',
 'IM epinephrine inadequate after 2-3 doses — escalate to **IV epinephrine infusion**.

[IV Epi PK Rationale](#/info/anaph-iv-epi-pk)

Confirm IV access (large bore or central line, IO if needed).

**CRITICAL SAFETY:** Do NOT give cardiac arrest dose (1 mg IV push) to a patient with a pulse — this represents a **61-fold dosing error** compared to IM dosing. IV bolus epinephrine in non-arrest patients causes hypertensive crisis, arrhythmias, and death. [2][3][4]',
 '[2,3,4]'::jsonb, '[{"label":"IV/IO established — start infusion","next":"anaph-epi-infusion","urgency":"critical"},{"label":"No IV access — continue IM + IO attempt","next":"anaph-source-control","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-epi-infusion', 'anaphylaxis', 'info', 2,
 'IV Epinephrine Infusion',
 '[Epinephrine](#/drug/epinephrine/anaphylaxis iv infusion) infusion protocol (PulmCrit approach): [4]

**Mixing:** 1 mg epinephrine in 100 mL NS = **10 mcg/mL**

**Protocol:**
1. **Loading:** 20 mcg/min x 2 minutes (~40 mcg total)
2. **Maintenance:** 10 mcg/min (= 60 mL/hr)
3. **Titrate** up or down based on clinical response
4. **AGGRESSIVELY WEAN** after resolution

Brown et al 2004: 19 patients treated with 5-15 mcg/min IV epinephrine — all responded within 5 minutes. [10]

**Peri-arrest:** [Epinephrine](#/drug/epinephrine/anaphylaxis push dose) 20-50 mcg IV push (push-dose epi).

Stop infusion ~30 minutes after symptom resolution. [1][3][4]',
 '[1,3,4,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-fluids', NULL, NULL, NULL, '[]'::jsonb, '[{"id":"epi-infusion","label":"Epi Infusion Calculator"}]'::jsonb, 8)
;


-- MODULE 3: RESUSCITATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-peri-arrest', 'anaphylaxis', 'info', 3,
 'Peri-Arrest / Cardiovascular Collapse',
 '[Epinephrine](#/drug/epinephrine/anaphylaxis push dose) **20-50 mcg IV push**, repeat every 1-2 minutes.

If no IV access: IM 0.5 mg every 5 minutes + emergent IO access.

**Position:** Lay flat, elevate legs — up to **35% of plasma volume** extravasates within minutes during anaphylaxis. [1]

**If cardiac arrest:**
• Standard ACLS with epinephrine 1 mg IV every 3-5 minutes
• **Prolonged resuscitation** — this is a reversible pathology
• Consider VA-ECMO if available [1][2]',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-fluids', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-fluids', 'anaphylaxis', 'info', 3,
 'IV Fluid Resuscitation',
 '**Distributive shock** — up to 35% of intravascular volume extravasates within minutes. [1]

**Adults:**
• 500-1000 mL NS/LR bolus, repeat aggressively
• May need several liters in first hour [3]

**Pediatrics:**
• 20-30 mL/kg bolus, repeat to 60 mL/kg+
• IO access if no IV [2]

**POCUS-guided fluid management:**
• IVC collapse = volume responsive → more fluid
• Hyperdynamic + empty chambers = more fluid
• Adequate filling + persistent hypotension = uptitrate epinephrine

LR preferred for large-volume resuscitation. [1]',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-airway', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-airway', 'anaphylaxis', 'question', 3,
 'Airway Assessment',
 'Airway edema can progress rapidly in anaphylaxis.

**Signs of upper airway involvement:**
• Stridor, hoarseness, voice change
• Tongue/lip swelling
• Drooling, difficulty swallowing
• Accessory muscle use

**Angioedema WITHOUT urticaria** → consider:
• ACE-inhibitor angioedema (bradykinin-mediated — epinephrine ineffective)
• Hereditary angioedema (C1-esterase inhibitor deficiency) [3]',
 '[1,3]'::jsonb, '[{"label":"Airway stable — no upper airway signs","next":"anaph-adjunctive-start"},{"label":"Wheezing / bronchospasm only","next":"anaph-bronchospasm","urgency":"urgent"},{"label":"Stridor / upper airway edema","next":"anaph-airway-critical","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-airway-critical', 'anaphylaxis', 'info', 3,
 'Critical Airway — Intubation Preparation',
 '**Prepare for difficult airway** — call anesthesia/ENT early.

**Equipment:**
• Video laryngoscopy (first attempt)
• Smaller ETT than usual (edema narrows the airway)
• Surgical airway kit at bedside

**Temporizing:** Nebulized epinephrine — racemic epinephrine 0.5 mL of 2.25% in 4.5 mL NS OR L-epinephrine 5 mL of 1:1000 (1 mg/mL). [1]

**Do NOT delay intubation** if patient is deteriorating — airway edema worsens rapidly.

**Post-intubation:** Continue epinephrine infusion, IV fluids, and adjunctive therapies. [1]',
 '[1]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-adjunctive-start', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12)
;


-- MODULE 4: REFRACTORY & SPECIAL POPULATIONS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-adjunctive-start', 'anaphylaxis', 'question', 4,
 'Refractory or Special Population?',
 'Before standard adjunctive therapies, identify refractory anaphylaxis or special populations requiring modified management.

**Refractory anaphylaxis:** <0.5% of cases — persistent hemodynamic instability or respiratory compromise despite adequate epinephrine + IV fluids. [1]',
 '[1,3]'::jsonb, '[{"label":"Responding to treatment — standard adjuncts","next":"anaph-antihistamines"},{"label":"Beta-blocker patient — poor epi response","next":"anaph-beta-blocked","urgency":"critical"},{"label":"Refractory despite adequate epi + fluids","next":"anaph-refractory","urgency":"critical"},{"label":"Isolated bronchospasm despite epi","next":"anaph-bronchospasm","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-beta-blocked', 'anaphylaxis', 'info', 4,
 'Beta-Blocked Patient',
 'Blunted epinephrine response due to beta-adrenergic blockade. [1][3]

**Management:**
• Higher epinephrine doses (may need more frequent/larger IM doses)
• Additional beta-2 agonism: [Albuterol](#/drug/albuterol-neb/anaphylaxis) nebulizer + [Terbutaline](#/drug/terbutaline/anaphylaxis) 0.25 mg SQ
• [Methylene Blue](#/drug/methylene-blue/anaphylaxis) 1-2 mg/kg IV over 5-10 min (guanylate cyclase inhibitor — blocks NO-mediated vasodilation) [1]

**Glucagon — DISCOURAGED by Farkas:**
• Weak evidence, only bypasses beta-1 (not beta-2 — does not help bronchospasm)
• Causes emesis (aspiration risk)
• [Glucagon](#/drug/glucagon/anaphylaxis) — last resort only [1][2]',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-antihistamines', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-refractory', 'anaphylaxis', 'info', 4,
 'Refractory Anaphylaxis',
 'Persistent despite adequate epinephrine + IV fluids (<0.5% of cases). [1]

**Escalation ladder:**
1. Maximize epinephrine infusion rate
2. Aggressive POCUS-guided volume resuscitation
3. [Methylene Blue](#/drug/methylene-blue/anaphylaxis) 1-2 mg/kg IV (blocks NO-mediated vasodilation — case reports only) [1]
4. Vasopressin infusion
5. VA-ECMO

**Re-evaluate the diagnosis:**
• Is this truly anaphylaxis? [Differential Diagnosis](#/info/anaph-ddx)
• Missed ongoing exposure?
• Underlying mastocytosis?
• Serum tryptase level (peak ~90 min, draw within 3 hours) [3]',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-antihistamines', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-bronchospasm', 'anaphylaxis', 'info', 4,
 'Bronchospasm Management',
 'Persistent wheezing despite adequate epinephrine — especially in patients with asthma overlap. [1]

• [Albuterol](#/drug/albuterol-neb/anaphylaxis) 2.5-5 mg nebulizer, continuous if severe
• [Terbutaline](#/drug/terbutaline/anaphylaxis) 0.25 mg SQ (systemic beta-2 agonist)
• Nebulized epinephrine for combined upper + lower airway symptoms
• Ensure adequate epinephrine infusion (epinephrine is a bronchodilator via beta-2 receptors) [1][2]',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-antihistamines', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-exercise', 'anaphylaxis', 'info', 4,
 'Exercise-Induced Anaphylaxis',
 '**Food-dependent exercise-induced anaphylaxis (FDEIA):**
• Triggered by exercise within 1-4 hours of eating specific foods (wheat, celery most common)
• Neither food NOR exercise alone causes symptoms
• Often misdiagnosed [3]

**ED management:** Same as standard anaphylaxis protocol.

**Discharge counseling:**
• Avoid exercise 4-6 hours after eating trigger food
• Carry EpiPen at all times during exercise
• Allergist referral mandatory [3]',
 '[3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-disposition-assess', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17)
;


-- MODULE 5: ADJUNCTIVE THERAPIES
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-antihistamines', 'anaphylaxis', 'info', 5,
 'Antihistamines (H1 + H2)',
 '**Second-line only — NEVER delay epinephrine for antihistamines.** [1][3]

**H1 blocker:** [Diphenhydramine](#/drug/diphenhydramine/anaphylaxis) 50 mg IV every 6 hours
**H2 blocker:** [Famotidine](#/drug/famotidine/anaphylaxis) 20 mg IV every 12 hours

H1 + H2 combination is superior to H1 alone for cutaneous symptoms. [2][3]

**What antihistamines DO:**
• Reduce urticaria, flushing, pruritus
• May reduce mucosal edema

**What antihistamines do NOT do:**
• Treat hypotension
• Treat bronchospasm
• Prevent biphasic reactions

Antihistamines are primarily cosmetic. [1]',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-steroids', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-steroids', 'anaphylaxis', 'info', 5,
 'Corticosteroids',
 '**Controversial — no randomized controlled trials.** [1][2][3]

**If giving (pick one):**
• [Dexamethasone](#/drug/dexamethasone/anaphylaxis) 10 mg IV x1
• [Methylprednisolone](#/drug/methylprednisolone/anaphylaxis) 60 mg IV x1

**Consider if:**
• Refractory to 2+ IM epinephrine doses
• Known asthma
• History of biphasic reactions [1]

**Evidence:**
• Do NOT prevent biphasic reactions [2]
• May reduce length of stay in hospitalized patients [2]
• No benefit on acute symptoms (onset 4-6 hours)
• **NOT needed for discharge** [1]',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-tryptase', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-tryptase', 'anaphylaxis', 'info', 5,
 'Tryptase & Diagnostics',
 '**Serum tryptase:**
• Peak ~90 minutes after onset, draw within 3 hours
• Less useful for food-triggered anaphylaxis (may be normal) [3]
• Elevated level supports anaphylaxis diagnosis
• Persistently elevated baseline → suspect mastocytosis

**Other labs:**
• CBC, BMP, lactate (shock assessment)
• Troponin if hemodynamic compromise (Kounis syndrome — allergic coronary spasm)

**Tryptase is NOT required** to diagnose or treat anaphylaxis — it is confirmatory and prognostic. [3]',
 '[3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-disposition-assess', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-monitoring', 'anaphylaxis', 'info', 5,
 'Monitoring & Weaning',
 '**Epinephrine infusion weaning:**
• After symptom resolution, begin weaning over ~30 minutes
• **AGGRESSIVELY WEAN** — reluctance to stop the infusion is the greatest weakness [4]
• If symptoms recur during wean, uptitrate and try again in 1-2 hours

**Monitoring parameters:**
• Continuous cardiac monitoring + SpO2
• Vitals every 15 minutes for first hour, then every 30 minutes

[Biphasic Reaction Risk Factors](#/info/anaph-biphasic) [1][2][3][4]',
 '[1,2,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'anaph-disposition-assess', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21)
;


-- MODULE 6: DISPOSITION & DISCHARGE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-disposition-assess', 'anaphylaxis', 'question', 6,
 'Disposition Assessment',
 '[Biphasic Reaction Risk Factors](#/info/anaph-biphasic)

**Biphasic reactions:** ~5-20% of cases, majority occur within 8-10 hours. No deaths have been reported from biphasic reactions. [1][2][3]

**Risk factors for biphasic reaction:**
• Multiple epinephrine doses required
• IV fluid bolus needed
• Delayed initial epinephrine
• Inhaled beta-agonist required
• Unknown trigger
• Initial hypotension
• Severe initial presentation [2]',
 '[1,2,3]'::jsonb, '[{"label":"Mild, rapid response to 1 IM epi dose","next":"anaph-dispo-4hr"},{"label":"Required multiple epi doses or IV epi","next":"anaph-dispo-admit","urgency":"urgent"},{"label":"Required intubation / ICU-level care","next":"anaph-dispo-icu","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-dispo-4hr', 'anaphylaxis', 'result', 6,
 'Observe 4-6 Hours — Discharge',
 '**Standard observation:** 4-6 hours from peak reaction. [1][2][3]

[Discharge Instructions](#/info/anaph-discharge)

**Requirements before discharge:**
• Symptom-free for minimum 4 hours
• Tolerating oral intake
• Understands EpiPen use and return indications',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Observe 4-6 hours post peak reaction. Discharge with EpiPen prescription, allergen avoidance education, and allergist referral.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 23)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-dispo-admit', 'anaphylaxis', 'result', 6,
 'Admit — Observation/Telemetry',
 'Admit when biphasic risk factors present or delayed/incomplete response. [1]

**Admission criteria:**
• Required >1 dose epinephrine
• Severe initial reaction
• History of asthma
• Late evening presentation
• Unknown trigger

**Monitoring:**
• Telemetry
• Vitals every 1-2 hours
• Anaphylaxis kit at bedside

[Discharge Instructions](#/info/anaph-discharge) at hospital discharge.',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit for extended observation (12-24h). Multiple risk factors for biphasic reaction.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 24)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-dispo-icu', 'anaphylaxis', 'result', 6,
 'ICU Admission',
 '**ICU criteria:**
• IV epinephrine infusion required
• Glucagon or methylene blue administered
• Intubation or surgical airway
• Stridor with ACE-inhibitor angioedema
• Persistent hemodynamic instability
• Refractory anaphylaxis (>4 hours) [1][3]

**ICU management:**
• Continue epinephrine infusion with aggressive weaning
• POCUS-guided fluid resuscitation
• Monitor for biphasic reaction
• Serum tryptase
• Allergist consult',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'ICU admission for ongoing vasopressor support, airway management, or refractory anaphylaxis.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 25)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('anaph-discharge-rx', 'anaphylaxis', 'info', 6,
 'Discharge Prescriptions & Education',
 '[Discharge Instructions](#/info/anaph-discharge)

**Mandatory:**
• **EpiPen x2** (prescribe — ensure patient demonstrates use)
• Allergist referral within 2-4 weeks [2][3]
• Allergen avoidance education
• Medical ID bracelet recommended

**Optional short-course (symptomatic relief):**
• Diphenhydramine 25-50 mg PO every 6 hours PRN x 3-5 days
• Famotidine 20 mg PO BID x 3-5 days

**Steroids NOT needed for discharge** — no evidence supports outpatient steroid taper. [1] EB Medicine adult review notes optional 3-5 day course, no taper needed. [3]

**Return precautions:** Any symptom recurrence → use EpiPen immediately + call 911. [2][3]',
 '[1,2,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26)
;


-- 5. drugs (3 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('famotidine', 'Famotidine', 'Famotidine', 'H2 receptor antagonist', 'IV/PO',
 '["Anaphylaxis (H2 blocker)","Allergic reactions (adjunctive)"]'::jsonb,
 '[{"indication":"Anaphylaxis (H2 blocker)","regimen":"20 mg IV every 12 hours (inpatient). Second-line adjunct — give AFTER epinephrine. Combine with H1 blocker (diphenhydramine) — H1+H2 combination is superior to H1 alone for cutaneous symptoms.\n\nDoes NOT treat hypotension or bronchospasm. Onset ~30-45 minutes even IV."},{"indication":"Allergic reactions (discharge)","regimen":"20 mg PO BID × 3-5 days. Optional short-course for discharge. No evidence this prevents biphasic reactions."}]'::jsonb,
 '["Known hypersensitivity to famotidine or other H2 blockers"]'::jsonb,
 '["Dose adjust in renal impairment (CrCl <50 mL/min: 20 mg once daily)","Headache, dizziness uncommon","Drug interactions with atazanavir (reduced absorption — avoid combination)"]'::jsonb,
 'Clinical symptom improvement.',
 'H2 blockade in anaphylaxis is adjunctive only. Histamine acts on both H1 and H2 receptors to increase vascular permeability and edema. Combined H1+H2 blockade was superior to H1 alone in a prospective randomized trial of 91 adults with acute allergic reactions (Lin et al 2000). However, antihistamines of any type do NOT treat the life-threatening components of anaphylaxis (hypotension, bronchospasm, airway edema).',
 NULL,
 '["Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.","Lin RY, et al. Improved outcomes in patients with acute allergic syndromes who are treated with combined H1 and H2 antagonists. Ann Emerg Med. 2000;36(5):462-468."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('glucagon', 'Glucagon', 'Glucagon hydrochloride', 'Hyperglycemic agent / Beta-blocker reversal', 'IV/IM',
 '["Anaphylaxis in beta-blocked patients (last resort)","Beta-blocker overdose","Hypoglycemia"]'::jsonb,
 '[{"indication":"Anaphylaxis (beta-blocked patient)","regimen":"Adults: 1-5 mg IV over 5 minutes, then infusion 5-15 mcg/min if needed.\nPediatric: 20-30 mcg/kg IV (max 1 mg) over 5 minutes.\n\nDISCOURAGED by critical care experts — weak evidence (scattered case reports only), only bypasses beta-1 receptors (NOT beta-2), and HIGH emesis risk which may compromise unsecured airway.\n\nReserve for LAST RESORT when epinephrine, methylene blue, and volume resuscitation have failed.","weightCalc":{"dosePerKg":0.02,"unit":"mg","maxDose":1,"label":"Pediatric (20 mcg/kg)"}},{"indication":"Beta-blocker overdose","regimen":"3-10 mg IV over 1 minute, then 3-5 mg/hr infusion. Bypasses beta-1 blockade via cAMP pathway independent of beta-adrenergic receptors."},{"indication":"Hypoglycemia","regimen":"1 mg IM/SQ/IV. If no response in 15 min, may repeat × 1."}]'::jsonb,
 '["Pheochromocytoma (may provoke catecholamine surge)","Insulinoma (rebound hypoglycemia)"]'::jsonb,
 '["HIGH emesis risk — have suction ready, aspiration precautions","Only bypasses beta-1 receptors, NOT beta-2 — does not address mast cell stabilization, bronchospasm, or vasodilation","Transient hyperglycemia","Hypokalemia","Very short-acting — may require infusion"]'::jsonb,
 'Heart rate, blood pressure, blood glucose, emesis.',
 'Historically recommended for beta-blocked anaphylaxis but now DISCOURAGED by critical care experts (Farkas/IBCC). The rationale for glucagon is to bypass beta-1 blockade in the heart (improving inotropy and chronotropy via cAMP). However, this does NOT address the core pathophysiology of anaphylaxis — mast cell stabilization and vasodilation are mediated by beta-2 receptors, which glucagon does not affect. The high risk of emesis in a patient with a potentially compromised airway makes glucagon a poor choice. Methylene blue (guanylate cyclase inhibitor) and higher-dose epinephrine are preferred for refractory anaphylaxis in beta-blocked patients.',
 NULL,
 '["Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.","Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24."]'::jsonb,
 1)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('methylene-blue', 'Methylene Blue', 'Methylthioninium chloride', 'Guanylate cyclase inhibitor / Vasopressor adjunct', 'IV',
 '["Refractory anaphylaxis (vasodilatory shock)","Vasoplegia (post-cardiopulmonary bypass)"]'::jsonb,
 '[{"indication":"Refractory anaphylaxis","regimen":"1-2 mg/kg IV over 5-10 minutes. May repeat × 1 in 30-60 minutes if partial response.\n\nInhibits guanylate cyclase → blocks nitric oxide-mediated vasodilation (a key contributor to refractory shock in anaphylaxis).\n\nSupported by case reports and small case series only — no RCTs. Consider when epinephrine infusion, volume resuscitation, and standard adjuncts have failed.","weightCalc":[{"dosePerKg":1,"unit":"mg","label":"Standard dose (1 mg/kg)"},{"dosePerKg":2,"unit":"mg","label":"High dose (2 mg/kg)"}]}]'::jsonb,
 '["G6PD deficiency (risk of severe hemolytic anemia)","Concurrent serotonergic drugs — SSRIs, SNRIs, MAOIs (serotonin syndrome risk)","Severe renal impairment (relative — renally excreted)"]'::jsonb,
 '["Turns urine and skin blue-green — warn patient and staff","Serotonin syndrome risk with any serotonergic medication","May interfere with pulse oximetry readings (falsely low SpO2)","Hypertension possible if vasodilation is overcorrected","Avoid extravasation — causes tissue necrosis"]'::jsonb,
 'Blood pressure (hypertension risk), SpO2 (may read falsely low), methemoglobin level, signs of hemolysis in G6PD-unknown patients.',
 'Methylene blue inhibits guanylate cyclase, blocking the NO → cGMP → vasodilation pathway that contributes to refractory anaphylactic shock. This is the same mechanism exploited in post-cardiopulmonary bypass vasoplegia. Evidence in anaphylaxis is limited to case reports and small series, but the physiologic rationale is strong for refractory vasodilatory shock that is not responding to catecholamines. Preferred over glucagon for refractory anaphylaxis in beta-blocked patients — addresses vasodilation directly rather than attempting to bypass beta-1 blockade.',
 NULL,
 '["Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). 2025.","Krishnaswamy G. Critical Care Management of the Patient With Anaphylaxis. Crit Care Med. 2021;49(5):838-857."]'::jsonb,
 2)
;


-- 5b. drugs — UPDATE existing entries (6 drugs)
-- Updating Epinephrine with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Anaphylaxis / angioedema","Hyperkalemia with hemodynamic instability","Ischemic priapism (alternative to phenylephrine)","Neonatal resuscitation (NRP)"]'::jsonb,
  dosing = '[{"indication":"Anaphylaxis — IM (first-line)","regimen":"0.5 mg IM (0.5 mL of 1 mg/mL) into anterolateral thigh. Repeat every 5 minutes up to 3 doses if no response. NO absolute contraindications in anaphylaxis.\n\nPediatric: 0.01 mg/kg IM (max 0.5 mg).\n\nAnterolateral thigh provides faster peak plasma levels than deltoid or subcutaneous injection (Simons 2001). Do NOT delay epinephrine for IV access, antihistamines, or steroids.","weightCalc":{"dosePerKg":0.01,"unit":"mg","maxDose":0.5,"label":"Pediatric IM"}},{"indication":"Anaphylaxis — IV infusion","regimen":"Mix 1 mg in 100 mL NS (10 mcg/mL). Loading: 20 mcg/min × 2 minutes. Maintenance: 5-15 mcg/min. Titrate to effect. AGGRESSIVELY WEAN after resolution — reluctance to stop is the greatest weakness of epi infusion.\n\nBrown et al 2014: 19 patients treated at 5-15 mcg/min, all responded within 5 minutes.\n\nOnly with pre-existing IV access and experienced resuscitationist. IM remains first-line for the vast majority of anaphylaxis cases."},{"indication":"Anaphylaxis — push dose (peri-arrest)","regimen":"20-50 mcg IV push. For peri-arrest / impending cardiovascular collapse ONLY.\n\nFrom infusion bag: 2-5 mL of 10 mcg/mL solution.\nOr dilute: 0.1 mL of 1 mg/mL in 10 mL NS = 10 mcg/mL, give 2-5 mL.\n\nDo NOT give cardiac arrest dose (1 mg IV) to a patient with a pulse — 61-fold overdose risk with IV bolus vs IM."},{"indication":"Hyperkalemia with hypotension/bradycardia","regimen":"Epinephrine infusion 2-10 mcg/min IV. Treats both hyperkalemia AND hemodynamic instability simultaneously. Beta-2 effect shifts K+ intracellularly."},{"indication":"Ischemic priapism","regimen":"20 mcg (2 mL of 10 mcg/mL solution) intracavernosal every 5 minutes, up to 5 doses total (100 mcg max). Mix: 1 mL epi from cardiac amp (100 mcg/mL) + 9 mL NS = 10 mcg/mL."},{"indication":"Neonatal resuscitation (NRP) — IV/IO","regimen":"0.01-0.03 mg/kg of 1:10,000 (0.1-0.3 mL/kg) IV/IO. Repeat every 3-5 minutes. Flush with 1-3 mL NS. IV/IO preferred over ET route.","weightCalc":[{"dosePerKg":0.01,"unit":"mg","label":"Low dose (0.01 mg/kg)"},{"dosePerKg":0.03,"unit":"mg","label":"High dose (0.03 mg/kg)"}]},{"indication":"Neonatal resuscitation (NRP) — ET","regimen":"0.05-0.1 mg/kg of 1:10,000 (0.5-1 mL/kg) via endotracheal tube. Use only if IV/IO access not available. Higher dose needed — absorption is unpredictable via ET route.","weightCalc":[{"dosePerKg":0.05,"unit":"mg","label":"Low dose ET (0.05 mg/kg)"},{"dosePerKg":0.1,"unit":"mg","label":"High dose ET (0.1 mg/kg)"}]}]'::jsonb,
  contraindications = '["Uncontrolled hypertension","MAO inhibitor use","Do NOT give cardiac arrest doses (1 mg) to patients with a pulse"]'::jsonb,
  cautions = '["Has alpha AND beta1/2 effects — higher cardiovascular risk than phenylephrine","Monitor BP and HR every 5 min between injections","Hold if SBP > 160 or HR > 110"]'::jsonb,
  monitoring = 'BP/HR every 5 min during injections. Observe 60 min post-detumescence.',
  notes = 'Use only if phenylephrine is unavailable. Phenylephrine is preferred due to pure alpha-1 selectivity and lower cardiovascular risk. Onset: 1 min. Duration: 5–10 min.

MIXING INSTRUCTIONS (10 mcg/mL):
1. Take a 10 mL syringe and draw up 9 mL of normal saline
2. Draw up 1 mL of epinephrine from the cardiac amp (cardiac amp contains 100 mcg/mL)
3. Now you have 10 mL of epinephrine at 10 mcg/mL
4. Each dose = 2 mL (20 mcg)

⚠️ Do NOT give cardiac arrest doses (1 mg) to patients with a pulse.',
  citations = '["Bivalacqua TJ, et al. AUA/SMSNA Guideline on Priapism. J Urol. 2022;208(1):43-52.","Graham BA, et al. Emergency Pharmacotherapy for Priapism. Expert Opin Pharmacother. 2022;23(12):1371-80.","Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.","AHA/AAP. 2025 Guidelines for Neonatal Resuscitation. Circulation. 2025;152(Suppl 1):S399-S445."]'::jsonb
WHERE id = 'epinephrine';

-- Updating Diphenhydramine with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Nausea and vomiting of pregnancy (NVP)","Allergic reactions","Insomnia","Anaphylaxis (H1 blocker)","Angioedema"]'::jsonb,
  dosing = '[{"indication":"NVP — oral","regimen":"25-50 mg PO every 6 hours as needed. Second-line oral agent per ACOG stepwise pathway. Alternative to dimenhydrinate."},{"indication":"Anaphylaxis (H1 blocker)","regimen":"50 mg IV every 6 hours. Second-line adjunct only — give AFTER epinephrine. Combine with H2 blocker (famotidine) — H1+H2 is superior to H1 alone for cutaneous symptoms.\n\nDoes NOT treat hypotension or bronchospasm. Primarily reduces urticaria, flushing, and pruritus. Should never delay or replace epinephrine."},{"indication":"Angioedema — IV","regimen":"25-50 mg IV. First-generation H1 antagonist. Used as adjunct to epinephrine for histamine-mediated angioedema/anaphylaxis. Relieves cutaneous symptoms (urticaria, itching). Combine with a second-generation antihistamine (cetirizine) and H2 blocker (famotidine) for dual antihistamine therapy. Pediatric: 1 mg/kg IV (max 50 mg).","weightCalc":{"dosePerKg":1,"unit":"mg","maxDose":50,"label":"Pediatric dose"}}]'::jsonb,
  contraindications = '["Known hypersensitivity","Neonates/premature infants (not applicable in this context)"]'::jsonb,
  cautions = '["Significant sedation — warn about drowsiness","Anticholinergic effects","Avoid combination with other CNS depressants"]'::jsonb,
  monitoring = 'Symptom improvement. Sedation level.',
  notes = 'Alternative second-line antiemetic for NVP. Generally considered safe in pregnancy. The active antihistamine component of dimenhydrinate.',
  citations = '["ACOG Practice Bulletin No. 189: Nausea and Vomiting of Pregnancy. Obstet Gynecol. 2018;131(1):e15-e30."]'::jsonb
WHERE id = 'diphenhydramine';

-- Updating Dexamethasone with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Croup (standard of care)","Cerebral edema","Antiemetic (chemotherapy)","Bacterial meningitis (adjunctive)","Airway edema","Adrenal crisis (alternative)","Adrenal maintenance (alternative)","Anaphylaxis (adjunctive)"]'::jsonb,
  dosing = '[{"indication":"Croup","regimen":"0.6 mg/kg PO as a single dose (max 16 mg). Low-dose alternative: 0.15 mg/kg PO (non-inferior). If unable to tolerate oral: 0.6 mg/kg IM.","weightCalc":[{"dosePerKg":0.6,"unit":"mg","maxDose":16,"label":"Standard dose"},{"dosePerKg":0.15,"unit":"mg","label":"Low-dose alternative"}]},{"indication":"Cerebral edema","regimen":"10 mg IV loading dose, then 4 mg IV/IM q6h."},{"indication":"Airway edema / post-extubation stridor","regimen":"0.5 mg/kg IV q6h x 4 doses, starting 12-24 hours before planned extubation.","weightCalc":{"dosePerKg":0.5,"unit":"mg"}},{"indication":"Bacterial Meningitis (adjunctive)","regimen":"0.15 mg/kg IV q6h × 2-4 days. Give WITH or up to 15-20 min BEFORE first antibiotic dose. Reduces mortality in pneumococcal meningitis (Cochrane 2015). STOP if Listeria or Cryptococcus identified — worsened outcomes.","weightCalc":{"dosePerKg":0.15,"unit":"mg","dailyDivided":4}},{"indication":"Adrenal crisis (alternative)","regimen":"4 mg IV every 24 hours. Use when hydrocortisone is unavailable OR when cosyntropin stimulation test is planned — dexamethasone does NOT cross-react with cortisol assays, allowing meaningful cortisol measurement during treatment. Zero mineralocorticoid activity — add fludrocortisone for primary AI once on maintenance."},{"indication":"Adrenal maintenance (alternative)","regimen":"0.25-0.5 mg PO once daily. Long half-life (~36 hours) allows once-daily dosing. No mineralocorticoid activity — must add fludrocortisone for primary AI. Higher growth suppression risk in children compared to hydrocortisone."},{"indication":"Anaphylaxis (adjunctive)","regimen":"10 mg IV × 1 dose. Second-line only — controversial, no RCTs demonstrating clear benefit. Consider if refractory to 2+ IM epinephrine doses or asthma overlap. Does NOT prevent biphasic reactions. Not needed for discharge."}]'::jsonb,
  contraindications = '["Systemic fungal infections","Known hypersensitivity to dexamethasone"]'::jsonb,
  cautions = '["Single-dose use for croup is safe with minimal adverse effects","Hyperglycemia with repeated dosing — monitor glucose in diabetics","Immunosuppression with prolonged use — not a concern with single dose","May mask signs of infection with prolonged use"]'::jsonb,
  monitoring = 'Clinical response. For croup: reassess severity 2-3 hours after dose. For prolonged use: blood glucose, signs of infection.',
  notes = 'Standard of care for croup in ALL severities. A 2023 Cochrane review (45 RCTs, 5,888 children) showed glucocorticoids significantly reduce croup scores at 2, 6, 12, and 24 hours vs placebo. NNT = 7 to prevent one return visit. Single dose provides sustained benefit due to long half-life (~36 hours). Reduces return visits/readmissions by ~50% (RR 0.52). Low-dose (0.15 mg/kg) is non-inferior to standard dose in a 1,252-patient RCT.',
  citations = '["Aregbesola A, et al. Glucocorticoids for Croup in Children. Cochrane Database Syst Rev. 2023;1:CD001955.","Bjornson CL, et al. A Randomized Trial of a Single Dose of Oral Dexamethasone for Mild Croup. N Engl J Med. 2004;351(13):1306-13.","Parker CM, Cooper MN. Prednisolone Versus Dexamethasone for Croup: A Randomized Controlled Trial. Pediatrics. 2019;144(3):e20183772.","Gates A, Johnson DW, Klassen TP. Glucocorticoids for Croup in Children. JAMA Pediatrics. 2019;173(6):595-596."]'::jsonb
WHERE id = 'dexamethasone';

-- Updating Methylprednisolone (Solu-Medrol) with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Adrenal crisis (alternative to hydrocortisone)","Thyroid crisis (alternative)","Anaphylaxis (adjunctive, alternative)","Anaphylaxis / angioedema (adjunct)"]'::jsonb,
  dosing = '[{"indication":"Adrenal crisis (alternative)","regimen":"40 mg IV every 24 hours. Use ONLY when hydrocortisone is unavailable. Minimal mineralocorticoid activity — consider adding fludrocortisone once transitioned to maintenance doses in patients with primary adrenal insufficiency."},{"indication":"Thyroid crisis (alternative)","regimen":"125 mg IV loading dose, then 60 mg IV daily. Alternative when hydrocortisone unavailable. For decompensated hypothyroidism: 40 mg IV as alternative to hydrocortisone."},{"indication":"Anaphylaxis (adjunctive, alternative)","regimen":"60 mg IV × 1 dose. Alternative to dexamethasone. Controversial — no clear evidence of benefit in anaphylaxis. Consider if refractory to epinephrine or asthma overlap. Not needed for discharge."},{"indication":"Anaphylaxis / angioedema (adjunct)","regimen":"125 mg IV. Adjunct to epinephrine and antihistamines for histamine-mediated angioedema/anaphylaxis. NOT effective for bradykinin-mediated angioedema. Delayed onset of action — should never be used as monotherapy. Limited RCT evidence for angioedema specifically, but commonly administered. Weigh benefits against hyperglycemia, hypertension, and infection risk."}]'::jsonb,
  contraindications = '["Systemic fungal infections (relative — do NOT withhold in adrenal crisis)"]'::jsonb,
  cautions = '["Minimal mineralocorticoid activity — inferior to hydrocortisone for adrenal crisis where both glucocorticoid and mineralocorticoid replacement are needed","Hyperglycemia","Immunosuppression with prolonged use"]'::jsonb,
  monitoring = 'Blood glucose, electrolytes (Na, K), blood pressure, fluid status.',
  notes = 'Second-line alternative for adrenal crisis when hydrocortisone is unavailable. Glucocorticoid potency is ~5× hydrocortisone (4 mg methylprednisolone = 20 mg hydrocortisone), but has minimal mineralocorticoid effect. Preferred over dexamethasone when some mineralocorticoid activity is desired.',
  citations = '["Rushworth RL, et al. Adrenal Crisis. N Engl J Med. 2019;381(9):852-861.","Bornstein SR, et al. Diagnosis and Treatment of Primary Adrenal Insufficiency. JCEM. 2016;101(2):364-389."]'::jsonb
WHERE id = 'methylprednisolone';

-- Updating Albuterol (Nebulized) with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Hyperkalemia (potassium shift)","Acute bronchospasm","Anaphylaxis bronchospasm"]'::jsonb,
  dosing = '[{"indication":"Hyperkalemia","regimen":"10-20 mg nebulized (4-8 standard 2.5 mg nebulizers administered back-to-back). Onset: 30 minutes. Peak: 90-120 minutes. Duration: 2-4 hours."},{"indication":"Bronchospasm","regimen":"2.5 mg nebulized q20 min x 3 doses, then q1-4h PRN."},{"indication":"Anaphylaxis bronchospasm","regimen":"2.5-5 mg nebulized, may give continuous if severe bronchospasm. For persistent wheezing despite adequate epinephrine, especially with asthma overlap. Epinephrine is the primary bronchodilator in anaphylaxis — albuterol is adjunctive only."}]'::jsonb,
  contraindications = '["Known hypersensitivity to albuterol"]'::jsonb,
  cautions = '["Nearly always UNDERDOSED for hyperkalemia in clinical practice","Standard 2.5 mg neb dose is inadequate — need 10-20 mg total","Efficacy ~50% lower in ESRD patients","Tachycardia, tremor, hyperglycemia"]'::jsonb,
  monitoring = 'Heart rate, potassium level, glucose.',
  notes = 'In reality, albuterol is nearly always underdosed for hyperkalemia. The real-world efficacy is consequently minimal. Terbutaline SQ is preferred when available — logistically simpler (single injection vs. prolonged nebulization). Expected K+ reduction: 0.6-1.0 mEq/L (at adequate dose).',
  citations = '["Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104."]'::jsonb
WHERE id = 'albuterol-neb';

-- Updating Terbutaline with full current data (includes new burn dosing entries)
UPDATE drugs SET
  indications = '["Hyperkalemia (potassium shift)","Acute asthma/bronchospasm","Tocolysis (uterine relaxation)","Anaphylaxis bronchospasm"]'::jsonb,
  dosing = '[{"indication":"Hyperkalemia","regimen":"0.5 mg SQ (or 7 mcg/kg SQ). Onset: 5 minutes. Peak effect: 30-60 minutes. Duration: 3-6 hours."},{"indication":"Asthma","regimen":"0.25 mg SQ, may repeat q15-30 min PRN, max 0.5 mg in 4 hours."},{"indication":"Tocolysis (Shoulder Dystocia / Zavanelli)","regimen":"0.25 mg SQ or IM × 1 dose. Provides rapid uterine relaxation to facilitate cephalic replacement (Zavanelli maneuver) prior to emergency cesarean section. Onset: 5 minutes SQ."},{"indication":"Anaphylaxis bronchospasm","regimen":"0.25 mg SQ × 1. Systemic beta-2 agonist for persistent bronchospasm despite adequate epinephrine. Provides systemic mast cell stabilization via beta-2 stimulation. Consider in beta-blocked patients for additional beta-2 effect."}]'::jsonb,
  contraindications = '["Baseline tachycardia (relative)","Risk of tachyarrhythmia (relative)","Active myocardial infarction (relative)","History of seizures (rare, relative)","Brittle diabetes (relative)"]'::jsonb,
  cautions = '["Beta-2 metabolic effects: hyperglycemia, hypokalemia, hyperlactatemia","Some beta-1 activity (~10:1 beta-2:beta-1 ratio)","MAO inhibitors/TCAs increase hypertension risk"]'::jsonb,
  monitoring = 'Heart rate, blood pressure, serum potassium, glucose.',
  notes = 'Terbutaline is logistically superior to nebulized albuterol for hyperkalemia — single SQ injection vs. 4-8 back-to-back nebulizers. Similar potassium-lowering efficacy. Bioavailability: 100% SQ. Peak plasma concentration: ~30 min. ~90% renally eliminated, ~60% unchanged drug. Expected K+ reduction: ~0.5-1 mEq/L.',
  citations = '["Sowinski KM, et al. Subcutaneous terbutaline use in CKD to reduce potassium concentrations. Am J Kidney Dis. 2005;45(6):1040-5.","Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104."]'::jsonb
WHERE id = 'terbutaline';


-- 6. info_pages (6 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('anaph-summary', 'Anaphylaxis Steps Summary', 'Time-critical epinephrine-first treatment pathway',
 '[{"heading":"1. Recognition (0-2 min)","body":"• [Assess presentation — multi-organ involvement?](#/node/anaph-start)\n• [Apply WAO 2020 diagnostic criteria](#/node/anaph-diagnosis)\n• [Differential: vasovagal, scombroid, ACE-I angioedema](#/info/anaph-ddx)"},{"heading":"2. IM Epinephrine — FIRST (0-5 min)","body":"• [Source control + IM Epi 0.5 mg anterolateral thigh](#/node/anaph-source-control)\n• Pediatric: 0.01 mg/kg IM (max 0.5 mg)\n• Repeat every 5 min up to 3 doses"},{"heading":"3. Reassessment (5-15 min)","body":"• [Assess response to IM epinephrine](#/node/anaph-epi-response)\n• [Good response → adjunctive therapies](#/node/anaph-post-epi-stable)\n• [Poor response → IV epinephrine infusion](#/node/anaph-epi-infusion)\n• [Peri-arrest → push-dose epi 20-50 mcg IV](#/node/anaph-peri-arrest)"},{"heading":"4. Resuscitation","body":"• [Aggressive IV fluids — up to 35% plasma extravasates](#/node/anaph-fluids)\n• [Airway assessment — stridor, edema, intubation prep](#/node/anaph-airway)\n• [Critical airway — video laryngoscopy, smaller ETT, neb epi](#/node/anaph-airway-critical)"},{"heading":"5. Refractory / Special Populations","body":"• [Beta-blocked patient — methylene blue, higher epi doses](#/node/anaph-beta-blocked)\n• [Refractory anaphylaxis — methylene blue, vasopressin, ECMO](#/node/anaph-refractory)\n• [Persistent bronchospasm — albuterol, terbutaline](#/node/anaph-bronchospasm)"},{"heading":"6. Adjuncts & Disposition","body":"• [H1 + H2 antihistamines (second-line only)](#/node/anaph-antihistamines)\n• [Steroids — controversial, single dose if giving](#/node/anaph-steroids)\n• [Tryptase — draw within 3 hours](#/node/anaph-tryptase)\n• [Disposition — 4-6h observe vs admit vs ICU](#/node/anaph-disposition-assess)\n• [Discharge Rx — EpiPen x2 + allergist referral](#/node/anaph-discharge-rx)"}]'::jsonb,
 '[]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('anaph-iv-epi-pk', 'IV Epinephrine — PK Rationale', 'PulmCrit approach: Why IV infusion over repeated IM',
 '[{"heading":"IM Epinephrine Pharmacokinetics","body":"IM epinephrine takes ~10 minutes to reach peak blood levels (Simons 2001). Absorption is erratic with biphasic serum levels. [4]\n\nRepeating IM epi at 5-minute intervals risks **dose-stacking** — the second dose is given before the first takes effect, leading to inappropriately large total doses.\n\nPatients in shock may have poor muscle perfusion, further reducing IM absorption."},{"heading":"Pharmacokinetic Calculation","body":"Based on Abboud et al (septic shock PK data): [4]\n• Volume of distribution (Vd) = 8 liters\n• Half-life = ~3.5 minutes\n• Elimination constant (Ke) = 0.2/min\n\n**Loading dose** = Vd × therapeutic concentration = 8000 mL × 0.005 mcg/mL = **~40 mcg**\n**Maintenance** = Vd × concentration × Ke = **~8-10 mcg/min**"},{"heading":"Clinical Evidence","body":"Brown et al 2014: Prospective study of 19 patients with bee sting anaphylaxis treated with IV epinephrine infusion at 5-15 mcg/min. [10]\n\n• All patients responded rapidly (within 5 minutes)\n• No appreciable adverse effects\n• 9 patients required re-initiation after stopping (recurrence)\n• One patient needed 30 mcg/min (dysfunctional IV line)"},{"heading":"Proposed Protocol","body":"**Peri-arrest:** 20-50 mcg IV bolus (push-dose)\n\n**Loading:** 20 mcg/min × 2 minutes (~40 mcg total = 1 Vd loading dose)\n\n**Maintenance:** 10 mcg/min — titrate based on response\n\n**AGGRESSIVELY WEAN** after resolution (~2 hours). The greatest weakness of IV epi infusion is reluctance to wean. [4]\n\nIf symptoms recur during wean → resume immediately, attempt again in 1-2 hours."},{"heading":"Safety","body":"**This approach applies ONLY to:**\n• Patients with pre-existing IV access\n• Managed by experienced resuscitationist\n• IM epinephrine remains first-line for the vast majority\n\n**Dosing errors:** IV bolus overdose risk is 61× greater than IM. [2] Never give cardiac arrest dose (1 mg) to a patient with a pulse. The 1 mg/mL concentration must be further diluted before IV use."}]'::jsonb,
 '[{"num":2,"text":"Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24."},{"num":4,"text":"Farkas J. PulmCrit — How to use IV epinephrine for anaphylaxis. EMCrit/PulmCrit. August 26, 2019."},{"num":10,"text":"Brown SGA, et al. Insect sting anaphylaxis; prospective evaluation of treatment with IV adrenaline and volume resuscitation. Emerg Med J. 2004;21(2):149-154."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('anaph-ddx', 'Differential Diagnosis', 'Distinguishing anaphylaxis from mimics',
 '[{"heading":"Vasovagal Reaction","body":"**Key distinction:** Vasovagal = **bradycardia** with hypotension. Anaphylaxis = **tachycardia** with hypotension (distributive shock). [3]\n\nVasovagal: pallor, diaphoresis, no urticaria/wheezing. Resolves rapidly with supine positioning."},{"heading":"Scombroid (Histamine Fish Poisoning)","body":"Caused by histamine in poorly refrigerated fish. Symptoms within minutes to hours: flushing, headache, peppery taste, GI symptoms. [3]\n\n**Clues:** Multiple people affected after same meal. Patient has eaten same fish before without reaction. Responds to antihistamines alone. Not a true allergy — does NOT require EpiPen or allergist referral."},{"heading":"ACE-Inhibitor Angioedema","body":"Bradykinin-mediated (not IgE). **Epinephrine is ineffective.** [3]\n\nIsolated angioedema (lips, tongue, oropharynx) WITHOUT urticaria. Can occur at any time during treatment course — weeks to years after starting ACE-I.\n\nManagement: Stop ACE-I permanently. Airway management. Consider icatibant or FFP for severe cases."},{"heading":"Hereditary Angioedema","body":"C1-esterase inhibitor deficiency → excess bradykinin. [3]\n\nRecurrent episodes, family history. Lacks pruritus of allergy. High GI involvement (93%). Epinephrine ineffective.\n\nDiagnosis: C4 level (low), C1-INH level and function."},{"heading":"Mastocytosis / Mast Cell Activation","body":"Abnormal mast cell proliferation → endogenous histamine release. [1][3]\n\nRecurrent \"idiopathic\" anaphylaxis, flushing, pruritus, GI symptoms, hypotension. Male predominance. Severe anaphylaxis with hypotension but absence of urticaria.\n\nSuggestive: elevated baseline tryptase (>8 ng/mL). Definitive: bone marrow biopsy."},{"heading":"Other Mimics","body":"• **Asthma** — wheeze + dyspnea in known asthmatic may mask anaphylaxis [1]\n• **Carcinoid** — flushing syndrome with diarrhea, wheezing\n• **MSG reaction** — nausea, diaphoresis, headache after MSG foods [3]\n• **Panic attack** — dyspnea, tachycardia, but no urticaria/angioedema/hypotension\n• **Vocal cord dysfunction** — stridor without other systemic findings\n• **Pulmonary embolism** — dyspnea + hypotension without skin findings\n• **Sepsis / toxic shock** — distributive shock with skin findings (but different rash)"}]'::jsonb,
 '[{"num":1,"text":"Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025."},{"num":3,"text":"Singer E, Zodda D. Allergy and Anaphylaxis. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('anaph-biphasic', 'Biphasic Reaction Risk Factors', 'Who needs prolonged observation?',
 '[{"heading":"Epidemiology","body":"Biphasic reactions occur in ~5% of anaphylaxis cases (range 3-20% depending on definition). [1][8]\n\nMajority occur within 8-10 hours of initial reaction resolution. Median time: 10-11 hours. [3]\n\n**No deaths have been reported from biphasic reactions** in published studies. Although the absolute rate is ~5%, clinically significant biphasic reactions may be <2%. [8]"},{"heading":"Risk Factors","body":"• Multiple epinephrine doses required for initial stabilization [2]\n• IV fluid bolus required (initial hypotension) [2]\n• Delayed initial administration of epinephrine [2]\n• Inhaled beta-agonist treatment needed [2]\n• Unknown anaphylaxis trigger [2]\n• Severe initial presentation [2]\n• Wheezing at presentation [1]\n• History of biphasic reactions [1]"},{"heading":"Subtypes of Anaphylaxis","body":"**Uniphasic** — Most common. Resolves within ~1 hour. Usually does not require ICU. [1]\n\n**Biphasic** — Recurrence >1 hour after resolution without re-exposure. ~5% of cases. Usually mild. [1]\n\n**Persistent** — Ongoing anaphylaxis >4 hours. ~4% of cases. [1]\n\n**Refractory** — Ongoing despite appropriate epinephrine + adjuncts. Rare (<0.5%). Associated with drug etiology. [1]"},{"heading":"Observation Duration","body":"**Standard (most patients):** 4-6 hours from peak reaction. [1][2][3]\n\n**Extended (12-24 hours) for:**\n• Multiple risk factors above\n• Severe initial reaction requiring IV epi\n• Late-evening presentation (biphasic would occur overnight)\n• Asthma history (risk factor for fatal anaphylaxis)\n• Unknown trigger\n\n**UK guidelines:** Minimum 6 hours for adults, minimum 6-12 hours for severe or risk factors. [6]"}]'::jsonb,
 '[{"num":1,"text":"Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025."},{"num":2,"text":"Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24."},{"num":3,"text":"Singer E, Zodda D. Allergy and Anaphylaxis. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24."},{"num":6,"text":"Dodd A, et al. Evidence update for the treatment of anaphylaxis. Resuscitation. 2021;163:86-96."},{"num":8,"text":"Gorham NP. Anaphylaxis: After the Emergency Department. Emerg Med Clin North Am. 2022;40(1):33-37."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('anaph-causes', 'Causes of Anaphylaxis', 'Trigger identification & epidemiology',
 '[{"heading":"Adult Triggers","body":"• **Medications (34%)** — beta-lactam antibiotics, NSAIDs, muscle relaxants, monoclonal antibodies, radiocontrast, paralytics, protamine, local anesthetics [1][3]\n• **Food (31%)** — peanuts, tree nuts, seafood, shellfish, egg, red meat (alpha-gal) [1][3]\n• **Insect stings (20%)** — Hymenoptera (bees, wasps, hornets, ants) [1][3]\n• **Environmental (7.5%)** — latex, cold/heat exposure [1][3]\n• **Exercise (1.2%)** — food-dependent, within 1-4 hours of eating trigger foods [3]\n• **Idiopathic (11%)** — no identifiable trigger [3]"},{"heading":"Pediatric Triggers","body":"Food is the most common cause in children (~8% prevalence of food allergy). [2]\n\n**Most common foods:** Peanuts and tree nuts (responsible for 94% of fatal food anaphylaxis). [2]\n\n**Vaccine anaphylaxis:** Very rare (~1.5 per million vaccinations). [2]\n\nAnaphylaxis may be missed in infants — flushing, vomiting, loose stool are nonspecific and easily attributed to other causes. [2]"},{"heading":"Fatal Anaphylaxis Risk Factors","body":"Death from anaphylaxis is rare (<1% of cases, ~1 death per million people/year). [2]\n\n**Time from exposure to death:** [12]\n• IV medications: ~5 minutes\n• Insect venom: ~15 minutes\n• Food: ~30 minutes\n\n**Risk factors for fatal anaphylaxis:** [2]\n• Asthma (especially uncontrolled)\n• Adolescents/young adults (less likely to carry/use EpiPen)\n• Peanut or tree nut allergen\n• Delayed epinephrine\n• Upright posture during symptoms\n• Known allergen re-exposure\n\nIn fatal cases, <15% had cutaneous symptoms — absence of urticaria should NOT delay treatment. [2]"},{"heading":"Exercise-Induced Anaphylaxis","body":"Food-dependent exercise-induced anaphylaxis (FDEIA) occurs during exercise within 1-4 hours of eating trigger foods. More common in women. [3]\n\n**Most common triggers:** Wheat, corn, garlic, celery, vegetables, shellfish. [3]\n\nNeither food NOR exercise alone causes symptoms. Prevention: avoid trigger foods within 4-6 hours before exercise. Carry EpiPen during exercise."}]'::jsonb,
 '[{"num":1,"text":"Farkas J. Anaphylaxis. Internet Book of Critical Care (IBCC). September 15, 2025."},{"num":2,"text":"Nunez J, Santillanes G. Anaphylaxis in Pediatric Patients. Pediatric Emergency Medicine Practice (EB Medicine). 2019;16(6):1-24."},{"num":3,"text":"Singer E, Zodda D. Allergy and Anaphylaxis. Emergency Medicine Practice (EB Medicine). 2015;17(8):1-24."},{"num":12,"text":"Pumphrey RS. Lessons for management of anaphylaxis from a study of fatal reactions. Clin Exp Allergy. 2000;30(8):1144-50."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('anaph-discharge', 'Anaphylaxis Discharge Instructions', 'Patient information sheet',
 '[{"heading":"What Happened","body":"You had a severe allergic reaction called **anaphylaxis**. This is a serious, potentially life-threatening condition that requires immediate treatment with epinephrine (EpiPen)."},{"heading":"Your EpiPen","body":"You have been prescribed **two EpiPen auto-injectors**. Carry both with you at ALL times.\n\n**How to use:**\n• Remove the blue safety cap\n• Hold the orange tip against your outer thigh (through clothing is OK)\n• Press firmly until you hear a click\n• Hold in place for 3-10 seconds\n• Call 911 immediately after using"},{"heading":"When to Use Your EpiPen and Call 911","body":"Use your EpiPen immediately AND call 911 if you experience ANY of the following:\n\n• Difficulty breathing or wheezing\n• Swelling of lips, tongue, or throat\n• Feeling faint or dizzy\n• Widespread hives or rash\n• Nausea, vomiting, or abdominal pain after exposure to your trigger\n• Any combination of the above\n\n**Do NOT wait to see if symptoms get worse.** Early use of epinephrine saves lives."},{"heading":"Avoid Your Trigger","body":"If your allergic trigger was identified, strictly avoid it:\n\n• Read food labels carefully\n• Inform restaurants about your allergy\n• Tell all healthcare providers\n• Avoid areas where your trigger may be present\n• Consider a medical alert bracelet"},{"heading":"Follow-Up","body":"• **Allergist appointment** within 2-4 weeks — for trigger testing and long-term management plan\n• **Primary care** follow-up within 1 week\n• Replace your EpiPen before the expiration date\n• Teach family members how to use your EpiPen"},{"heading":"Important Reminders","body":"• Allergic reactions can recur within 24-72 hours without new exposure (biphasic reaction)\n• Always carry TWO EpiPens — you may need a second dose\n• Never hesitate to use your EpiPen — the risk of not treating is far greater than the risk of the medication\n• If you used your EpiPen, ALWAYS go to the emergency department even if you feel better"}]'::jsonb,
 '[]'::jsonb,
 true,
 5)
;

COMMIT;
