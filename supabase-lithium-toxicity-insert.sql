-- =====================================================================
-- MedKitt — Lithium Toxicity Consult: Supabase INSERT Statements
-- Generated: 2026-06-16
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'lithium-toxicity',
  'Lithium Toxicity',
  'Exposure Type → Levels/Workup → Decontamination → Saline/Euvolemia → EXTRIP HD → Disposition',
  '1.0',
  27,
  'lith-start',
  '["Recognition","Levels & Workup","Decontamination & Fluids","Hemodialysis","Differential","Disposition"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('toxicology', 'lithium-toxicity', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (6 citations)
DELETE FROM tree_citations WHERE tree_id = 'lithium-toxicity';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('lithium-toxicity', 1, 'Decker BS, Goldfarb DS, Dargan PI, et al. Extracorporeal Treatment for Lithium Poisoning: Systematic Review and Recommendations from the EXTRIP Workgroup. Clin J Am Soc Nephrol. 2015;10(5):875-887.'),
('lithium-toxicity', 2, 'EXTRIP Workgroup. Lithium recommendations: extracorporeal treatment indications, cessation, and modality guidance.'),
('lithium-toxicity', 3, 'Hedya SA, Avula A, Swoboda HD. Lithium Toxicity. StatPearls. NCBI Bookshelf. Last update June 26, 2023.'),
('lithium-toxicity', 4, 'Emergency Care BC. Lithium Toxicity clinical summary: workup, fluids, decontamination, and hemodialysis indications.'),
('lithium-toxicity', 5, 'Baird-Gunning J, Lea-Henry T, Hoegberg LCG, Gosselin S, Roberts DM. Lithium Poisoning. J Intensive Care Med. 2017;32(4):249-263.'),
('lithium-toxicity', 6, 'Buckley NA, Cheng S, Isoardi K, Chiew AL, Siu A, Graudins A. Haemodialysis for lithium poisoning: translating EXTRIP recommendations into practical guidelines. Br J Clin Pharmacol. 2020;86(5):999-1006.');

DELETE FROM decision_nodes WHERE tree_id = 'lithium-toxicity';

-- 4. decision_nodes (27 nodes)

-- MODULE 1: RECOGNITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-start', 'lithium-toxicity', 'question', 1,
 'Lithium Toxicity',
 '**Core ED problem:** lithium has a narrow therapeutic index, no antidote, renal clearance, delayed CNS distribution, and poor correlation between a single serum number and clinical severity.

**First 60 seconds:**
- Airway/mental status/seizure check
- ECG and monitor
- Hold lithium immediately
- Ask: acute ingestion, acute-on-chronic, or chronic accumulation?
- Check renal function, sodium/volume status, interacting meds, and co-ingestants

**Danger pattern:** chronic or acute-on-chronic toxicity with neurologic findings. These patients can be very sick at levels that look only moderate.',
 '[1,2,3,4]'::jsonb, '[{"label":"Sick now","description":"Coma, seizure, severe confusion, shock, dysrhythmia","next":"lith-sick","urgency":"critical"},{"label":"Known or suspected ingestion","description":"Intentional/accidental acute ingestion or acute-on-chronic","next":"lith-exposure-type","urgency":"urgent"},{"label":"Chronic accumulation","description":"Tremor, ataxia, confusion, AKI/dehydration/interacting meds","next":"lith-chronic","urgency":"urgent"},{"label":"Incidental high level","description":"Minimal symptoms but level elevated","next":"lith-levels"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0,
 'Hold lithium, classify exposure type, check neuro/renal/ECG, and do not rely on one level.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-sick', 'lithium-toxicity', 'info', 1,
 'Sick Lithium Patient: Resus First',
 '**If coma, seizure, severe encephalopathy, unstable vitals, or dysrhythmia:**

1. Airway and aspiration protection as needed.
2. Benzodiazepines for seizures/agitation; avoid antipsychotic reflex dosing when lithium neurotoxicity/NMS/serotonin syndrome is in the differential.
3. ECG/monitor, IV access, glucose, temperature.
4. Stop lithium and interacting meds.
5. Start isotonic crystalloid if hypovolemic, unless fluid overload risk dominates.
6. Call poison center/toxicology + nephrology early.
7. Move directly to dialysis screen: severe neuro/cardiac toxicity may require hemodialysis regardless of the lithium level.

**Key point:** neurologic toxicity reflects tissue exposure. A serum level can lag behind clinical risk.',
 '[1,2,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-hd-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1,
 'Airway, benzos for seizures, stop lithium, fluids if hypovolemic, tox/nephrology, dialysis screen.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-exposure-type', 'lithium-toxicity', 'question', 1,
 'Classify the Exposure',
 '**Exposure type changes risk interpretation.**

| Pattern | What it means | Practical risk |
|---|---|---|
| Acute lithium-naive overdose | Big ingestion but little tissue distribution early | GI symptoms early; initial levels may look scary before CNS toxicity appears |
| Acute-on-chronic | Overdose in patient already taking lithium | Higher tissue burden; neurologic risk greater |
| Chronic accumulation | Dose stable or slightly changed, clearance worsened | Most concerning for neurotoxicity/SILENT, often older/AKI/dehydrated |
| Unknown | Timing/formulation unclear | Treat as high risk until serial levels and exam declare trend |

Ask specifically about sustained-release tablets, number of tablets, exact time, co-ingestants, and last therapeutic dose.',
 '[1,3,5]'::jsonb, '[{"label":"Acute lithium-naive overdose","description":"No chronic lithium tissue burden","next":"lith-acute"},{"label":"Acute-on-chronic","description":"Overdose on chronic therapy","next":"lith-chronic","urgency":"urgent"},{"label":"Chronic accumulation","description":"AKI/dehydration/interacting meds/NDI","next":"lith-chronic","urgency":"urgent"},{"label":"Unknown","description":"Unclear timing/formulation; assume high risk","next":"lith-workup","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2,
 'Acute number can overstate early severity; chronic/acute-on-chronic neurologic toxicity is more dangerous.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-acute', 'lithium-toxicity', 'info', 1,
 'Acute Lithium Ingestion',
 '**Typical early phenotype:** nausea, vomiting, diarrhea, abdominal pain, tremor. Neurologic toxicity can be delayed because lithium distributes into CNS/tissues over time.

**Immediate questions:**
- Immediate-release vs sustained/extended-release?
- Number of tablets and mg per tablet?
- Time since ingestion?
- Co-ingestants, especially sedatives, antipsychotics, serotonergics, APAP/ASA?
- Is the patient lithium-naive or on chronic lithium?

**Do not discharge based on one early level.** Sustained-release tablets and large ingestions can have delayed, prolonged, or rising levels.',
 '[1,3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3,
 'Acute ingestion causes early GI symptoms; CNS toxicity and levels may be delayed, especially sustained-release.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-chronic', 'lithium-toxicity', 'info', 1,
 'Chronic / Acute-on-Chronic Toxicity',
 '**This is the high-risk ED pattern.** Chronic toxicity often occurs because lithium clearance falls, not because the patient took a huge dose.

**Common triggers:**
- Vomiting/diarrhea, febrile illness, poor PO intake, heat exposure
- AKI/CKD, heart failure, older age
- Nephrogenic diabetes insipidus from lithium -> dehydration -> more lithium retention
- New or increased NSAID, ACE inhibitor, ARB, thiazide, loop diuretic, spironolactone
- Low sodium diet or sodium loss

**Clinical clues:** coarse tremor, ataxia, dysarthria, nystagmus, hyperreflexia/myoclonus, confusion, delirium, seizures, coma.

**Treat the patient, not the number.** Chronic neurotoxicity can be severe at lower serum levels than acute overdose.',
 '[1,3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4,
 'Chronic toxicity is clearance failure: dehydration/AKI/interacting meds; neuro findings matter more than level.', NULL, 'warning', NULL, NULL, NULL)
;


-- MODULE 2: LEVELS & WORKUP
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-workup', 'lithium-toxicity', 'info', 2,
 'Initial ED Workup',
 '**Order immediately:**
- Serum lithium level now, then serial q4-6 h until clearly falling
- BMP/CMP: Na, K, HCO3, BUN/Cr, glucose, calcium
- Magnesium/phosphate if severe symptoms or renal disease
- ECG and continuous monitor if symptomatic/high level
- Pregnancy test when relevant
- APAP, salicylate, ethanol, VBG/ABG/lactate/osmolality for deliberate self-harm or unclear ingestion
- Urine output tracking; Foley if severe toxicity, AKI, or dialysis consideration
- TSH/free T4 only if clinically relevant or chronic management issue

**Specimen pitfall:** lithium heparin tubes can falsely elevate lithium levels. Confirm the lab tube type if a result does not fit the patient.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-levels', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5,
 'Lithium level, renal/electrolytes, ECG, co-ingestants when intentional, serial q4-6h, monitor urine output.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-levels', 'lithium-toxicity', 'question', 2,
 'Lithium Level Interpretation',
 '**Use levels as risk anchors, not stand-alone disposition.**

Approximate serum categories:

| Level | Common label | Caveat |
|---|---|---|
| <=1.0-1.2 mEq/L | Therapeutic range | Toxicity still possible in sensitive/chronic patients |
| 1.5-2.5 mEq/L | Mild toxicity | Nausea, vomiting, tremor, fatigue; chronic patients may be worse |
| 2.5-3.5 mEq/L | Moderate toxicity | Confusion, ataxia, hyperreflexia, dysarthria, ECG changes |
| >3.5 mEq/L | Severe toxicity | Seizure, coma, hypotension, hyperthermia, dysrhythmia |

**Serial trend matters:** rising or plateauing levels, renal dysfunction, sustained-release ingestion, or neuro symptoms escalate risk.',
 '[1,2,3,4]'::jsonb, '[{"label":"Neuro/cardiac severe regardless of level","description":"Seizure/coma/decreased LOC/life-threatening dysrhythmia","next":"lith-hd-recommended","urgency":"critical"},{"label":"Level high or renal dysfunction","description":">4 with renal impairment, >5, or delayed clearance","next":"lith-hd-screen","urgency":"critical"},{"label":"Mild symptoms / falling level","description":"Review triggers, then continue fluids/monitoring","next":"lith-med-interactions"},{"label":"Unclear mismatch","description":"Level does not fit clinical picture","next":"lith-differential"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6,
 'Levels guide risk but exposure pattern, renal function, neuro exam, and serial trend drive decisions.', NULL, 'warning', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-med-interactions', 'lithium-toxicity', 'info', 2,
 'Precipitants & Interacting Meds',
 '**Stop or hold contributors when safe:**

| Trigger | Why it matters |
|---|---|
| NSAIDs | Lower renal lithium clearance; ibuprofen/naproxen/indomethacin common |
| ACE inhibitors / ARBs | Reduce GFR and lithium clearance; toxicity often after initiation/dose change |
| Thiazides | Sodium loss -> proximal lithium reabsorption; classic high-risk interaction |
| Loop diuretics / spironolactone | Volume/sodium changes can raise lithium, especially older/CKD patients |
| Dehydration / GI loss / febrile illness | Sodium and volume depletion increase reabsorption |
| Low-sodium diet | Kidney handles lithium like sodium; sodium depletion raises retention |
| Nephrogenic DI | Polyuria/dehydration cycle from chronic lithium use |
| Serotonergics/antipsychotics | Can confuse diagnosis with serotonin syndrome/NMS or worsen neurotoxicity |

**Medication reconciliation is treatment.** Find the new drug or illness that made a stable lithium dose toxic.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-clinical-presentations', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7,
 'NSAIDs, ACEi/ARB, thiazides/diuretics, dehydration, low sodium, AKI/NDI are the usual setup.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-clinical-presentations', 'lithium-toxicity', 'info', 2,
 'Clinical Presentations',
 '**GI:** nausea, vomiting, diarrhea, abdominal pain; prominent early in acute overdose.

**Neurologic:** coarse tremor, ataxia, dysarthria, nystagmus, hyperreflexia, myoclonus, fasciculations, confusion, delirium, seizures, coma.

**Renal/fluid:** AKI, polyuria/polydipsia, nephrogenic DI, hypernatremia if free-water loss exceeds intake.

**Cardiac:** T-wave flattening/inversion, QT prolongation, bradycardia, AV block, sinus node dysfunction, rarely malignant dysrhythmia.

**Endocrine/chronic:** hypothyroidism, hyperparathyroidism/hypercalcemia.

**The miss:** chronic lithium toxicity masquerading as stroke, sepsis, dementia, alcohol withdrawal, medication sedation, or cerebellar disease.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-decon', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8,
 'GI early acute; neuro/renal/cardiac findings drive severity, especially chronic toxicity.', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 3: DECONTAMINATION & FLUIDS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-decon', 'lithium-toxicity', 'question', 3,
 'GI Decontamination Decision',
 '**There is no lithium antidote and charcoal does not bind lithium.** Decontamination is only useful for selected acute ingestions before absorption is complete.

Choose the best fit:',
 '[3,4,5]'::jsonb, '[{"label":"Large acute sustained-release ingestion","description":"Alert/protected airway; early enough to clear pills","next":"lith-wbi","urgency":"urgent"},{"label":"Immediate-release, very early massive ingestion","description":"Discuss lavage/WBI with tox; benefit limited","next":"lith-wbi"},{"label":"Co-ingestants need charcoal","description":"Use charcoal for co-ingestants, not lithium","next":"lith-charcoal"},{"label":"Chronic toxicity / late presentation","description":"Decon not useful; focus elimination","next":"lith-fluids"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9,
 'No charcoal for lithium; WBI only selected large acute/ER ingestions with safe airway.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-wbi', 'lithium-toxicity', 'info', 3,
 'Whole-Bowel Irrigation',
 '**Consider WBI when:**
- Large acute ingestion, especially sustained/extended-release lithium
- Presentation early enough that tablets may still be in GI tract
- Patient is alert/cooperative OR airway is protected
- No ileus, obstruction, perforation, uncontrolled vomiting, shock, or hemodynamic instability

**Typical approach:** polyethylene glycol electrolyte solution PO/NG at high-volume adult rates until rectal effluent clear. Coordinate with toxicology; monitor nausea, aspiration risk, sodium/potassium, and fluid balance.

**Do not force WBI in a confused, vomiting, or airway-risk patient.** Dialysis/supportive care is safer when severe toxicity is already present.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-fluids', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 10,
 'WBI for selected large acute/ER ingestions only; avoid in airway risk, ileus, obstruction, shock.', NULL, 'warning', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-charcoal', 'lithium-toxicity', 'info', 3,
 'Activated Charcoal Pitfall',
 '**Activated charcoal does not meaningfully bind lithium.**

Use charcoal only if:
- A clinically important co-ingestant is suspected
- Timing is appropriate for that co-ingestant
- Airway/mental status is safe or protected

**Do not let charcoal delay:** serial lithium levels, IV fluids when volume depleted, poison center call, nephrology call, or dialysis evaluation.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-fluids', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11,
 'Charcoal is for co-ingestants only; it is not lithium therapy.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-fluids', 'lithium-toxicity', 'info', 3,
 'IV Fluids: Sodium + Euvolemia',
 '**Primary non-dialysis treatment:** stop lithium and restore intravascular volume/sodium.

**Default:** isotonic crystalloid for dehydration, vomiting/diarrhea, AKI from volume depletion, or chronic toxicity with sodium depletion.

**Goals:**
- Euvolemia and eunatremia
- Adequate urine output without forced diuresis
- Improve renal lithium clearance
- Avoid iatrogenic volume overload

**Avoid:** forced diuresis, routine diuretics, kayexalate as a lithium removal strategy. Diuretics can worsen sodium/water balance and lithium retention.

**Caution:** CKD, CHF, pulmonary edema, hypernatremia, and nephrogenic DI require toxicology/nephrology-guided fluids.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-electrolytes', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12,
 'Hold lithium, give isotonic fluids for volume/sodium depletion, avoid forced diuresis and diuretics.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-electrolytes', 'lithium-toxicity', 'info', 3,
 'Electrolytes, NDI, and Urine Output',
 '**Lithium renal toxicity matters during the ED stay.**

Monitor:
- Sodium: hypernatremia suggests water loss/NDI or inadequate free water access
- Creatinine/eGFR and urine output
- Potassium/magnesium/calcium if vomiting, WBI, arrhythmia, or renal disease
- Volume status frequently

**Nephrogenic DI pattern:** polyuria, polydipsia, hypernatremia, dehydration. If present, fluid choice and rate require close nephrology/toxicology input.

**Foley:** reasonable in severe toxicity, AKI, dialysis consideration, or unreliable urine output measurement.',
 '[3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-hd-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13,
 'Track sodium, renal function, and urine output; NDI/hypernatremia changes fluid strategy.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-seizures-agitation', 'lithium-toxicity', 'info', 3,
 'Seizures, Agitation, Hyperthermia',
 '**Treat complications aggressively:**

- Seizures: benzodiazepines first-line; treat persistent seizures per status epilepticus pathway.
- Severe agitation: benzodiazepine-forward approach while evaluating tox differential.
- Hyperthermia: active cooling and search for serotonin syndrome/NMS/sepsis; lithium toxicity alone can coexist with these.
- Rhabdomyolysis: CK/renal protection if prolonged seizure, severe agitation, rigidity, or downtime.

**Avoid diagnostic anchoring:** lithium patients are often on serotonergic drugs, antipsychotics, antiepileptics, sedatives, or substances that create overlapping toxidromes.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-hd-screen', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14,
 'Benzodiazepines for seizures/agitation; cool hyperthermia and reassess for overlapping toxidromes.', NULL, 'critical', NULL, NULL, NULL)
;


-- MODULE 4: HEMODIALYSIS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-hd-screen', 'lithium-toxicity', 'question', 4,
 'Hemodialysis Screen',
 '**Call toxicology/poison center + nephrology early if any dialysis trigger is possible.**

EXTRIP separates dialysis into recommended vs suggested indications. Clinical toxicity and kidney function matter as much as the number.',
 '[1,2,4,5]'::jsonb, '[{"label":"Recommended indication present","description":"Severe neuro/cardiac OR renal impairment + Li >4","next":"lith-hd-recommended","urgency":"critical"},{"label":"Suggested indication present","description":"Li >5, confusion, or predicted time >36h to <1","next":"lith-hd-suggested","urgency":"urgent"},{"label":"No dialysis trigger now","description":"Clinically mild, renal function ok, falling levels","next":"lith-no-hd-monitor"},{"label":"Unclear / conflict","description":"Chronic neuro symptoms with modest level or poor renal reserve","next":"lith-hd-suggested","urgency":"urgent"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15,
 'Dialysis screen: severe neuro/cardiac, renal impairment + >4, >5, confusion, or delayed clearance.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-hd-recommended', 'lithium-toxicity', 'info', 4,
 'EXTRIP: Hemodialysis Recommended',
 '**Extracorporeal treatment is recommended when:**

1. **Kidney function is impaired AND lithium >4.0 mEq/L**, OR
2. **Decreased level of consciousness, seizure, or life-threatening dysrhythmia** is present, regardless of lithium level.

**Actions:**
- Nephrology + toxicology now
- Prepare for intermittent hemodialysis if available
- Continue airway/ECG/electrolyte management
- Continue serial levels; do not delay dialysis waiting for a repeat level if the patient is clinically severe

**Rationale:** lithium is small, water-soluble, minimally protein-bound, renally eliminated, and efficiently removed by hemodialysis.',
 '[1,2,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-hd-procedure-rebound', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16,
 'HD recommended: impaired kidney + Li >4, or decreased LOC/seizure/life-threatening dysrhythmia regardless of level.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-hd-suggested', 'lithium-toxicity', 'info', 4,
 'EXTRIP: Hemodialysis Suggested',
 '**Extracorporeal treatment is suggested when:**

- Lithium **>5.0 mEq/L**, OR
- **Confusion** is present, OR
- Expected time to lithium **<1.0 mEq/L is >36 hours** despite optimal management.

**Practical ED approach:**
- Discuss with toxicology/nephrology early rather than waiting for deterioration.
- Chronic/acute-on-chronic patients with neurologic findings deserve lower threshold for dialysis discussion.
- Very high acute levels in lithium-naive patients may fall with distribution/fluids; serial trend and symptoms decide.

**If dialysis deferred:** document consultant reasoning, serial level plan, and escalation trigger.',
 '[1,2,4,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-hd-procedure-rebound', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17,
 'HD suggested: Li >5, confusion, or predicted time to <1 >36h; chronic neuro symptoms lower threshold.', NULL, 'warning', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-hd-procedure-rebound', 'lithium-toxicity', 'info', 4,
 'Dialysis Modality + Rebound',
 '**Preferred modality:** intermittent hemodialysis for rapid lithium removal. CRRT is acceptable if intermittent HD is unavailable or not tolerated.

**Stopping target:** continue until lithium <1.0 mEq/L OR clinical improvement is apparent. If lithium level cannot be rapidly measured, EXTRIP recommends at least 6 hours of ECTR.

**Rebound is expected:** lithium redistributes from tissues back into serum after dialysis.

**After dialysis:**
- Check serial lithium levels for at least 12 hours
- Watch for recurrent neuro symptoms
- Repeat dialysis if level rebounds meaningfully, symptoms recur, or level remains high with poor clearance
- Continue nephrology/toxicology guidance until trend is safe

**Do not discharge from the dialysis chair.** The rebound window is part of treatment.',
 '[1,2,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18,
 'Intermittent HD preferred; monitor at least 12h after stopping for rebound and repeat HD if needed.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-no-hd-monitor', 'lithium-toxicity', 'info', 4,
 'No Dialysis Trigger: Monitoring Plan',
 '**If dialysis is not indicated now:**

- Hold lithium and interacting meds
- Continue isotonic fluids if volume depleted
- Repeat lithium q4-6 h until clearly falling
- Repeat renal function/electrolytes with levels
- Continue ECG/monitor if symptomatic, high level, renal disease, or ECG abnormality
- Reassess neuro exam frequently: gait/ataxia, tremor, dysarthria, confusion, myoclonus, hyperreflexia

**Escalate to dialysis discussion if:** level rises/plateaus, renal function worsens, confusion appears, sustained-release ingestion produces delayed absorption, or predicted clearance is slow.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-differential', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19,
 'Hold lithium, hydrate if needed, q4-6h levels/renal checks, frequent neuro exams, escalate if trend worsens.', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 5: DIFFERENTIAL
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-differential', 'lithium-toxicity', 'info', 5,
 'Differential Diagnosis',
 '**Lithium toxicity mimics and overlaps with common ED diagnoses.**

| Finding | Do not miss |
|---|---|
| Tremor/ataxia/dysarthria | Cerebellar stroke, alcohol/benzo intoxication or withdrawal, anticonvulsant toxicity |
| Confusion/delirium | Sepsis, hypoglycemia, hyponatremia/hypernatremia, uremia, anticholinergic/sedative tox |
| Hyperreflexia/myoclonus/hyperthermia | Serotonin syndrome, NMS, malignant hyperthermia, stimulant tox |
| Rigidity/fever/AMS | NMS, serotonin syndrome, CNS infection |
| Seizure | Co-ingestants, hypoglycemia, hyponatremia, CNS lesion, withdrawal |
| Low anion gap | Lithium carbonate ingestion can lower calculated anion gap; do not overinterpret |

**If the lithium level is only mildly elevated but the patient is very abnormal, keep looking.**',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-special-populations', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20,
 'Mimics: stroke, sepsis, glucose/sodium, serotonin syndrome, NMS, sedatives, anticholinergic, withdrawal.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-special-populations', 'lithium-toxicity', 'info', 5,
 'Special Populations',
 '**Older adults / CKD / CHF:** lower renal reserve, higher risk from both toxicity and aggressive fluids. Involve nephrology early; avoid reflex large-volume fluids if overloaded.

**Pregnancy:** maternal stabilization first. Lithium crosses placenta; coordinate OB, psychiatry, toxicology, and nephrology. Do not delay indicated dialysis for pregnancy alone.

**Breastfeeding:** lithium is excreted in breast milk; infant monitoring/temporary interruption decisions need pediatrics/OB/psychiatry input.

**Nephrogenic DI/hypernatremia:** free-water deficit and sodium correction require careful planning; avoid worsening hypernatremia while trying to improve lithium clearance.

**Intentional overdose:** co-ingestant screen and suicide-safety pathway are part of disposition.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-disposition', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21,
 'CKD/CHF/older adults, pregnancy, breastfeeding, NDI/hypernatremia, and intentional overdose need tailored disposition.', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 6: DISPOSITION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-disposition', 'lithium-toxicity', 'question', 6,
 'Disposition',
 '**Most symptomatic lithium toxicity is not an ED discharge.** Disposition depends on symptoms, exposure pattern, renal function, serial level trend, dialysis need, and psychiatric safety.',
 '[3,4,5]'::jsonb, '[{"label":"Discharge possible","description":"Asymptomatic, falling levels, safe renal function and psych plan","next":"lith-discharge"},{"label":"Admit / monitored bed","description":"Symptoms, chronic toxicity, AKI, rising level, WBI, co-ingestants","next":"lith-admit","urgency":"urgent"},{"label":"ICU / dialysis-capable","description":"Severe neuro/cardiac, HD criteria, unstable, airway risk","next":"lith-icu","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22,
 'Disposition by symptoms, renal function, serial trend, HD criteria, and suicide risk.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-discharge', 'lithium-toxicity', 'result', 6,
 'Discharge Criteria',
 '**Consider discharge only when ALL are true:**

- No symptoms and normal/reliable mental status/gait
- No intentional self-harm or psychiatric hold need
- Lithium level is falling on serial checks and generally <1.5 mEq/L
- Renal function stable and patient can maintain hydration
- No sustained-release delayed absorption concern
- No interacting medication problem that cannot be fixed
- Clear plan to hold/restart lithium with prescribing clinician
- Reliable follow-up lithium/renal/electrolyte check

**Counsel:** stop lithium until clinician-directed restart; avoid NSAIDs/dehydration; return for vomiting, diarrhea, tremor, ataxia, confusion, weakness, syncope, seizure, or poor oral intake.',
 '[3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-restart-prevention', 'Discharge only after asymptomatic status, falling level, stable renal function, and safe psych/medication follow-up.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 23,
 'Discharge only if asymptomatic, falling level, renal stable, no delayed absorption or suicide concern, follow-up arranged.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-admit', 'lithium-toxicity', 'result', 6,
 'Admit / Monitored Bed',
 '**Admit for:**
- Any neurologic symptoms, even with modest level
- Chronic or acute-on-chronic toxicity
- AKI/CKD, dehydration needing IV therapy, sodium abnormality/NDI
- Rising/plateauing lithium levels or sustained-release ingestion
- Need for WBI or prolonged serial levels
- ECG abnormality, bradycardia, QT prolongation, AV block
- Co-ingestants or intentional overdose
- Unsafe outpatient medication/follow-up plan

**Orders:** serial lithium q4-6 h, BMP/electrolytes, neuro checks, urine output, ECG monitoring as indicated, hold interacting meds, tox/nephrology/psych as appropriate.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-restart-prevention', 'Admit symptomatic, chronic/acute-on-chronic, renal/electrolyte, rising-level, WBI, ECG, co-ingestant, or unsafe follow-up cases.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 24,
 'Admit if symptomatic, chronic, renal/electrolyte abnormality, rising levels, WBI, ECG issue, or intentional overdose.', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-icu', 'lithium-toxicity', 'result', 6,
 'ICU / Dialysis-Capable Setting',
 '**ICU or dialysis-capable transfer for:**
- Seizure, coma, severe confusion, severe myoclonus/hyperreflexia
- Life-threatening dysrhythmia, unstable bradycardia/AV block, shock
- EXTRIP recommended or suggested dialysis criteria
- Worsening renal failure or inability to clear lithium
- Severe hypernatremia/NDI, pulmonary edema, or fluid strategy conflict
- Need for airway protection, CRRT/HD, or repeated dialysis monitoring

**Transfer note should include:** exposure type, formulation, time, serial lithium levels with times, renal function, sodium, urine output, ECG findings, fluids given, WBI status, consultants contacted.',
 '[1,2,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'lith-hd-procedure-rebound', 'ICU/dialysis setting for severe neuro/cardiac toxicity, dialysis criteria, unstable physiology, or poor clearance.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 25,
 'ICU for severe neuro/cardiac toxicity, HD criteria, unstable physiology, poor clearance, or airway risk.', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('lith-restart-prevention', 'lithium-toxicity', 'info', 6,
 'Restart & Prevention Plan',
 '**Do not reflexively restart lithium from the ED.** Coordinate with psychiatry/primary prescriber and nephrology when renal injury occurred.

**Before restart:**
- Toxicity resolved and lithium level safe/falling
- Renal function and sodium stable
- Trigger corrected: dehydration/illness, NSAID, ACEi/ARB, thiazide/diuretic, low sodium, dosing error
- Follow-up level plan documented

**Patient instructions:**
- Hold lithium during significant vomiting/diarrhea/poor intake until clinician advice
- Maintain consistent salt and fluid intake
- Avoid OTC NSAIDs unless prescriber approves
- New BP/diuretic meds require lithium level follow-up
- Return for tremor, gait trouble, confusion, severe nausea/vomiting, diarrhea, syncope, seizure, or poor intake

**Document exactly:** lithium formulation/dose, level trend, suspected trigger, medication holds, restart owner, and follow-up date.',
 '[3,4,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26,
 'Restart only after trigger fixed, renal/sodium stable, prescriber plan, and follow-up lithium level arranged.', NULL, NULL, NULL, NULL, NULL)
;

COMMIT;
