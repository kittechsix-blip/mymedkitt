-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-07-15
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: hh-start (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"Headache Hub — Sick Check First","body":"**⚠️ 5 DO NOT MISS:**\n1. **Subarachnoid hemorrhage** — thunderclap, worst-ever, exertional onset.\n2. **Bacterial meningitis / encephalitis** — fever + meningismus + altered; do not delay antibiotics.\n3. **CNS venous sinus thrombosis** — progressive headache, hypercoag risk, papilledema, seizure.\n4. **Carbon monoxide poisoning** — co-exposure, multiple sick contacts, headache + nausea.\n5. **Acute angle-closure glaucoma / GCA** — red painful eye + halos, or jaw claudication + scalp tenderness in older adults.\n\n**First 60 seconds — scan sick vs not-sick:**\n- General appearance — diaphoretic, ill, holding head, rocking?\n- Mental status — full sentences, oriented?\n- Vitals TREND (not one snapshot) — BP rising, fever, brady + HTN (Cushing), tachycardia, hypoxia (true SpO₂ on co-oximetry if CO suspected)\n- Quick neuro — pupils, EOMs, gross motor, speech, gait if able\n- Quick eye — red? mid-dilated? halos? proptosis?\n- Skin — petechial rash, cherry-red (CO, late), trauma signs\n\n**If ANY of:** altered, hypotensive, hypoxic, febrile + meningeal, focal deficit, active seizure, status migrainosus with vomiting + dehydration — start resus PARALLEL to workup. Bay 1, IV access, monitor, O₂, fluid bolus, glucose, call for help.\n\n**If stable + protecting airway:** continue to Rule In / Rule Out (next node).","citation":[1,7],"next":"hh-triage","summary":"Gestalt sick check + vitals trend + quick neuro + eye + skin. If unstable: resus first, hub later.","safetyLevel":"critical"}'::jsonb
WHERE id = 'hh-start' AND tree_id = 'headache-hub';

-- NEW NODE: hh-triage — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-sah-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-sah-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-sah-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-neuro-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-neuro-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-neuro-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-mening-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-mening-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-mening-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-aacg-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-aacg-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-aacg-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-co-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-co-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-co-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-gca-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-gca-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-gca-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-dissection-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-dissection-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-dissection-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-cvst-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-cvst-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-cvst-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-preg-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-preg-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-trauma-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-trauma-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-trauma-excluded — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-cluster-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-cluster-verdict — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-tn-entry — use generate-supabase-sql.mjs for full INSERT
-- NEW NODE: hh-tn-verdict — use generate-supabase-sql.mjs for full INSERT
-- Node: hh-rescue (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Rescue Cocktail — Benign-Pattern HA","body":"Every dangerous thread cleared, pattern matches prior benign HA (migraine, tension, undifferentiated). Standard parenteral cocktail (2025 AHS acute-migraine guidance):\n\n**THE COCKTAIL:**\n- [Prochlorperazine 10 mg IV](#/drug/prochlorperazine/migraine cocktail) over ~15 min — workhorse antidopaminergic, the highest-evidence parenteral agent (AHS Level A)\n- [Diphenhydramine 25 mg IV](#/drug/diphenhydramine/migraine cocktail) — akathisia prophylaxis (DO NOT SKIP — prochlorperazine is the worst offender)\n- [Ketorolac 15-30 mg IV](#/drug/ketorolac/migraine) — NSAID component (cap 15 mg if age >65, renal disease, or low body weight)\n- [Magnesium 1-2 g IV](#/drug/magnesium-sulfate/migraine) over 15 min — adjunct, best for migraine with aura and menstrual migraine\n- **1 L NS bolus** — often the most therapeutic single element\n\n**Metoclopramide alternative** if prochlorperazine is unavailable or QT is a concern: [Metoclopramide 10 mg IV](#/drug/metoclopramide/status migrainosus) — similar efficacy, slightly less akathisia.\n\n**Add-on with strong 2025 evidence:** a **greater occipital nerve block** is now a first-tier ED option for refractory or contraindicated-pharmacotherapy patients — fast, safe, opioid-sparing (see refractory node).\n\n**Avoid:** opioids (worsen recurrence, feed medication-overuse HA), butalbital combinations (Fioricet), and repeat triptans within 24 h of any ergot.\n\n**Pregnancy:** acetaminophen IV + metoclopramide IV + diphenhydramine IV + magnesium is the safest cocktail. Avoid ergots and valproate; NSAIDs only if <30 weeks.","citation":[2,14],"next":"hh-rescue-reassess","summary":"Prochlorperazine 10 IV + diphenhydramine 25 IV + ketorolac 15-30 IV + Mg 1-2 g + 1 L NS. Metoclopramide if unavailable. ONB is first-tier. Avoid opioids/butalbital.","safetyLevel":"warning"}'::jsonb
WHERE id = 'hh-rescue' AND tree_id = 'headache-hub';

-- Node: hh-rescue-reassess (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":3,"title":"Reassess at 60-90 Minutes","body":"Re-examine: pain-score trend, ability to tolerate PO, any NEW neurologic feature (red-flag emergence), orthostatic check before discharge.","citation":[2,14],"options":[{"label":"Pain reduced ≥50% + tolerating PO + no new neuro → discharge plan","description":"Standard pathway for benign-pattern HA","next":"hh-dispo-discharge"},{"label":"Partial response — second round or observation","description":"Repeat antidopaminergic/NSAID, add dexamethasone, obs reassess at 4-6 h","next":"hh-rescue-second","urgency":"urgent"},{"label":"Refractory after second round → ONB or DHE protocol","description":"Greater occipital nerve block at bedside; DHE after antiemetic pretreatment","next":"hh-rescue-refractory","urgency":"urgent"},{"label":"NEW neurologic finding OR escalating pain unlike presentation","description":"Stop the rescue pathway. Image now. Return to Rule In / Rule Out.","next":"hh-triage","urgency":"critical"}],"summary":"Reassess at 60-90 min. Discharge if ≥50% better + PO + no new neuro. Escalate or re-image if not."}'::jsonb
WHERE id = 'hh-rescue-reassess' AND tree_id = 'headache-hub';

-- Node: hh-rescue-second (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":3,"title":"Second Round / Observation","body":"**Options for partial response:**\n- Repeat [Prochlorperazine 10 mg IV](#/drug/prochlorperazine/migraine cocktail) (or switch to [Metoclopramide 10 mg IV](#/drug/metoclopramide/status migrainosus) if akathisia despite diphenhydramine)\n- Add **dexamethasone 10 mg IV** — reduces 24-72 h recurrence (NNT ~9 pooled)\n- Add **valproate 500-1000 mg IV** over 10-15 min if not contraindicated (avoid pregnancy, liver disease)\n- Repeat NS 1 L bolus if dehydrated\n- ED obs unit for 4-6 h with planned reassessment\n\n**At second reassessment (4-6 h):** improved → discharge bundle; still refractory → ONB or DHE; new neuro feature → image now.","citation":[2,14],"recommendation":"Repeat antidopaminergic, add dexamethasone, consider obs-unit reassessment at 4-6 h.","confidence":"recommended"}'::jsonb
WHERE id = 'hh-rescue-second' AND tree_id = 'headache-hub';

-- Node: hh-rescue-refractory (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":3,"title":"Refractory — ONB or DHE","body":"**Greater occipital nerve block (ONB)** — bedside, 5-15 min onset, works for status migrainosus + cluster + occipital neuralgia + cervicogenic + post-traumatic. Now a first-tier ED option in the 2025 guidance. Open [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) for landmarks, aspiration check, agent selection, and post-procedure care.\n\n**DHE (dihydroergotamine) IV** — Raskin-style protocol: metoclopramide 10 mg IV first (anti-nausea pretreatment), then DHE 0.5-1 mg IV slow push. Repeat q8h × 3 days as an inpatient if status migrainosus is refractory.\n\n**DHE absolute contraindications:** pregnancy, CAD, uncontrolled HTN, triptan within 24 h, peripheral vascular disease, breastfeeding.\n\n**Disposition for true refractory status migrainosus:** admit for inpatient DHE protocol, neurology consult, IV magnesium, sleep + hydration, taper of any overused acute analgesics.","citation":[2,14],"recommendation":"ONB at bedside (first-tier); DHE if not contraindicated; admit if true status migrainosus.","confidence":"recommended","safetyLevel":"warning"}'::jsonb
WHERE id = 'hh-rescue-refractory' AND tree_id = 'headache-hub';

-- Node: hh-imaging (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":4,"title":"Imaging Decision Cheat-Sheet","body":"You should NOT image every headache. Image when ANY of the following:\n\n**Indications for non-contrast CT head:**\n- First-or-worst / thunderclap onset\n- New HA in age >50\n- Focal deficit, AMS, seizure\n- Post-traumatic with red flags (Canadian CT Head Rule)\n- HIV / immunocompromised with new HA\n- Anticoagulated with new HA\n- Papilledema\n- Pattern change in a known primary HA disorder (new quality, location, or frequency)\n- Pregnancy + HA with any red flag (shield abdomen)\n\n**Add modality by suspicion:**\n- **CTA / MRA brain + neck:** suspected dissection ([Cervical Artery Dissection](#/tree/cervical-artery-dissection)), RCVS, vasculitis, vertebral pathology\n- **CT venogram or MRV:** suspected [CVST](#/tree/cvst), papilledema with negative CT\n- **MRI brain with contrast:** suspected mass, infection, MS, lower-grade pathology missed on CT (esp. posterior fossa)\n- **LP:** suspected [SAH](#/tree/sah) with negative CT >6 h from onset; suspected [Meningitis](#/tree/meningitis); idiopathic intracranial hypertension (opening pressure)\n\n**CT BEFORE LP indicated when:** decreased LOC · focal neurologic deficit · papilledema · immunocompromise · recent seizure (within 1 week) · history of CNS disease · age >60. Otherwise LP can proceed without CT.\n\n**Sensitivity caveats:**\n- Non-contrast CT for SAH: ~98% within 6 h; drops sharply after 12-24 h. LP for xanthochromia is the rescue test after 6 h.\n- CT misses cerebellar / posterior fossa pathology more often than MRI — low threshold to MRI if posterior fossa suspected.\n\n**No imaging needed:** recurrent benign-pattern HA in a known migraineur with no red flags; tension-type pattern with no SNNOOP10 features (this is where the checklist earns its keep — as a recall list when you are NOT imaging).","citation":[5,6,7],"next":"hh-dispo","summary":"Image when ANY red flag. CT first; CTA/MRV/MRI/LP by suspicion. CT-before-LP if AMS/focal/papilledema/immunocomp/recent seizure/age >60."}'::jsonb
WHERE id = 'hh-imaging' AND tree_id = 'headache-hub';

-- Node: hh-dispo (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":5,"title":"Disposition","body":"Common framework across undifferentiated HA. The deep-dive consults carry phenotype-specific admit criteria — defer to those once you commit.","citation":[7,14],"options":[{"label":"Discharge — pain controlled + tolerating PO + no red flags","description":"Standard pathway for benign-pattern HA after the cocktail","next":"hh-dispo-discharge"},{"label":"Observe — partial response, awaiting labs/imaging, or social barrier","description":"ED observation unit; reassess at 4-6 h","next":"hh-dispo-observe"},{"label":"Admit — red-flag workup positive, refractory, SI, pregnancy emergency","description":"Admit per the deep-dive consult’s admit criteria","next":"hh-dispo-admit","urgency":"urgent"}],"summary":"Discharge if controlled + PO + no flags. Observe if partial/pending. Admit per deep-dive consult criteria."}'::jsonb
WHERE id = 'hh-dispo' AND tree_id = 'headache-hub';

-- Node: hh-dispo-discharge (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Discharge — Universal Checklist","body":"Before discharge:\n\n1. Pain reduced to an acceptable level (typically ≤3/10 or back to baseline)\n2. Tolerating PO\n3. Orthostatic vitals normal (prochlorperazine + diphenhydramine + ketorolac can drop BP)\n4. No new neurologic findings on recheck\n5. **Suicide screen** if cluster (highest SI of any primary HA), TN, chronic migraine, or mood-disorder features + chronic pain\n6. **Written return precautions covering:** first-or-worst severity · new neurologic symptom (weakness, numbness, vision/speech change) · fever or stiff neck · persistent vomiting · severe pain unresponsive to home Rx · any vision change · seizure\n7. **Follow-up arranged:** PCP 1-2 wks (new tension-type, mild migraine); Neurology 1-2 wks (new cluster, TN, refractory migraine, atypical features); OB/MFM (pregnancy-related); Ophthalmology (AACG, optic/visual concerns)\n8. **Consult-specific discharge bundle delivered** — see the relevant deep-dive (e.g., home O₂ + SQ sumatriptan for cluster; verapamil + ECG schedule for cluster maintenance; carbamazepine titration + lab plan for TN)\n\n**Counseling for the typical migraineur:** avoid daily analgesic use (medication-overuse HA: triptans/ergots ≥10 d/mo, simple analgesics ≥15 d/mo); sleep regularity, hydration, regular meals, stress management; trigger diary for 4-6 weeks if recurrent; prophylaxis referral if ≥4 HA days/mo.","citation":[7,14],"recommendation":"Discharge only after pain controlled, PO tolerated, no new neuro, written return precautions, follow-up arranged.","confidence":"definitive"}'::jsonb
WHERE id = 'hh-dispo-discharge' AND tree_id = 'headache-hub';

-- Node: hh-dispo-observe (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Observe — Partial Response or Pending Workup","body":"ED observation unit appropriate when:\n\n- Partial response after the first cocktail round — second round + reassess at 4-6 h\n- Awaiting CSF or advanced imaging (MRI, MRV)\n- Status migrainosus on IV cocktail — assess at 4-6 h before escalating\n- Pain control insufficient for discharge but no admission criteria\n- Transportation / safety / social barriers to discharge\n\n**Reassessment at 4-6 h:** re-examine for any new neurologic sign (red-flag emergence → return to Module 2); pain-score trend; tolerating PO; orthostatic vitals. Improving → discharge bundle. Not improving → escalate (DHE, ONB, admit).","citation":[7],"recommendation":"Obs unit + 4-6 h reassessment. Re-examine for new neuro signs; escalate if no improvement.","confidence":"recommended"}'::jsonb
WHERE id = 'hh-dispo-observe' AND tree_id = 'headache-hub';

-- Node: hh-dispo-admit (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Admit","body":"Admit when:\n\n- **Red-flag workup positive** — SAH, ICH, meningitis, dissection, CVST, AACG with IOP not medically controlled, pre-eclampsia/eclampsia, severe CO for hyperbaric\n- **Refractory primary HA** — status migrainosus failing IV cocktail + DHE; cluster failing O₂ + 2 SQ triptans + ONB; TN crisis with dehydration and weight loss\n- **Active suicidal ideation**\n- **Severe medication adverse event** requiring monitored correction (significant hyponatremia, SJS/TEN suspicion, severe drug interaction)\n- **IV bridging therapy needing continuous monitoring** (IV DHE Raskin protocol, IV fosphenytoin loading for TN crisis)\n- **Pregnancy-related HA** with pre-eclampsia / eclampsia / RCVS / CVST findings\n- **Cannot safely discharge** — no outpatient O₂ access for cluster, no reliable outpatient lab monitoring\n\n**Service selection:** Neurology (refractory primary HA, IV bridge, TN crisis); Medicine (infectious workup, comorbidities); OB (pregnancy-related with BP component); Neurosurgery (SAH / ICH / mass); ICU (AMS, hemodynamic instability, severe CO with hyperbaric pending).","citation":[7],"recommendation":"Admit per deep-dive consult criteria. Match the service to the dominant diagnosis.","confidence":"recommended","safetyLevel":"warning"}'::jsonb
WHERE id = 'hh-dispo-admit' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exclusions
DELETE FROM decision_nodes WHERE id = 'hh-exclusions' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-sah
DELETE FROM decision_nodes WHERE id = 'hh-exc-sah' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-neuro
DELETE FROM decision_nodes WHERE id = 'hh-exc-neuro' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-fever
DELETE FROM decision_nodes WHERE id = 'hh-exc-fever' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-eye
DELETE FROM decision_nodes WHERE id = 'hh-exc-eye' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-pregnancy
DELETE FROM decision_nodes WHERE id = 'hh-exc-pregnancy' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-dissection
DELETE FROM decision_nodes WHERE id = 'hh-exc-dissection' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-cvst
DELETE FROM decision_nodes WHERE id = 'hh-exc-cvst' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-co
DELETE FROM decision_nodes WHERE id = 'hh-exc-co' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-cluster
DELETE FROM decision_nodes WHERE id = 'hh-exc-cluster' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-tn
DELETE FROM decision_nodes WHERE id = 'hh-exc-tn' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-gca
DELETE FROM decision_nodes WHERE id = 'hh-exc-gca' AND tree_id = 'headache-hub';

-- DELETED NODE: hh-exc-trauma
DELETE FROM decision_nodes WHERE id = 'hh-exc-trauma' AND tree_id = 'headache-hub';

-- Module labels changed
UPDATE decision_trees SET module_labels = '["Sick Check","Rule In / Rule Out","Rescue / Reassess","Imaging","Disposition"]'::jsonb
WHERE id = 'headache-hub';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'headache-hub';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 1, 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. (ICHD-3)');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 2, 'Orr SL, Friedman BW, Christie S, et al. Management of Adults With Acute Migraine in the Emergency Department: The American Headache Society Evidence Assessment of Parenteral Pharmacotherapies. Headache. 2016;56(6):911-940. (updated by AHS 2025 acute-treatment guidance)');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 3, 'Robbins MS, Starling AJ, Pringsheim TM, Becker WJ, Schwedt TJ. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 4, 'Do TP, Remmers A, Schytz HW, et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology. 2019;92(3):134-144.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 5, 'Perry JJ, Stiell IG, Sivilotti ML, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255. (Ottawa SAH Rule)');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 6, 'Perry JJ, Sivilotti MLA, Sutherland J, et al. Validation of the Ottawa Subarachnoid Hemorrhage Rule in patients with acute headache. CMAJ. 2017;189(45):E1379-E1385.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 7, 'Godwin SA, Cherkas DS, Panagos PD, Shih RD, Byyny R, Wolf SJ. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Headache. Ann Emerg Med. 2019;74(4):e41-e74. (ACEP 2019)');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 8, 'American College of Obstetricians and Gynecologists. ACOG Committee Opinion No. 723: Guidelines for diagnostic imaging during pregnancy and lactation. Obstet Gynecol. 2017;130(4):e210-e216. / ACOG Practice Bulletin: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 9, 'Weaver LK; Undersea and Hyperbaric Medical Society. Hyperbaric oxygen therapy indications. 14th ed. UHMS, 2019. (HBO indications for CO poisoning)');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 12, 'Cruccu G, Gronseth G, Alksne J, et al. AAN-EFNS guidelines on trigeminal neuralgia management. Neurology. 2008;71(15):1183-1190.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 14, 'Friedman BW, Mulvey L, Esses D, et al. Metoclopramide for acute migraine: a dose-finding randomized clinical trial. Ann Emerg Med. 2011;57(5):475-482.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('headache-hub', 15, 'Stiell IG, Wells GA, Vandemheen K, et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001;357(9266):1391-1396.');

COMMIT;