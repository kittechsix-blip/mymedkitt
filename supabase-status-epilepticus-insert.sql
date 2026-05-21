-- =====================================================================
-- MedKitt — Status Epilepticus Consult: Supabase INSERT Statements
-- Generated: 2026-05-21
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

BEGIN;

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'status-epilepticus',
  'Status Epilepticus',
  'BZD → 2nd-Line ASM → RSE Infusions → cEEG',
  '1.0',
  26,
  'se-start',
  '["Recognition & Stabilization","Phase 1: Benzodiazepines","Phase 2: Urgent Control","Refractory SE","Special Populations","Differential & NCSE"]'::jsonb
)
;

-- 2. category_trees
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('neurology', 'status-epilepticus', NULL, NULL, NULL, 0)
ON CONFLICT (category_id, tree_id) DO UPDATE SET sort_order = EXCLUDED.sort_order;

-- 3. tree_citations (18 citations)
DELETE FROM tree_citations WHERE tree_id = 'status-epilepticus';
INSERT INTO tree_citations (tree_id, num, text) VALUES
('status-epilepticus', 1, 'Betjemann JP, Bhatt J, Engel A. Status Epilepticus. Emergency Medicine Practice (EB Medicine). 2025;27(9):1-28.'),
('status-epilepticus', 2, 'Brophy GM, Bell R, Claassen J, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23.'),
('status-epilepticus', 3, 'Glauser T, Shinnar S, Gloss D, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults. Epilepsy Curr. 2016;16(1):48-61.'),
('status-epilepticus', 4, 'Kapur J, Elm J, Chamberlain JM, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus (ESETT). N Engl J Med. 2019;381(22):2103-2113.'),
('status-epilepticus', 5, 'Silbergleit R, Durkalski V, Lowenstein D, et al. Intramuscular versus Intravenous Therapy for Prehospital Status Epilepticus (RAMPART). N Engl J Med. 2012;366(7):591-600.'),
('status-epilepticus', 6, 'Dalziel SR, et al. Levetiracetam versus Phenytoin for Second-Line Treatment of Convulsive Status Epilepticus in Children (EcLiPSE/ConSEPT). Lancet. 2019;393(10186):2125-2134.'),
('status-epilepticus', 7, 'Yasiry Z, Shorvon SD. The Relative Effectiveness of Five Antiepileptic Drugs in Treatment of Benzodiazepine-Resistant Convulsive Status Epilepticus: A Meta-Analysis. Epilepsia. 2014;55(9):1349-1361.'),
('status-epilepticus', 8, 'Claassen J, Hirsch LJ, Emerson RG, Mayer SA. Treatment of Refractory Status Epilepticus with Pentobarbital, Propofol, or Midazolam: A Systematic Review. Epilepsia. 2002;43(2):146-153.'),
('status-epilepticus', 9, 'Swor DE, et al. Management of Status Epilepticus in Pregnancy: A Survey of Neurologists and Neurointensivists. Neurocrit Care. 2024.'),
('status-epilepticus', 10, 'ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.'),
('status-epilepticus', 11, 'Trinka E, Cock H, Hesdorffer D, et al. A Definition and Classification of Status Epilepticus — Report of the ILAE Task Force on Classification of Status Epilepticus. Epilepsia. 2015;56(10):1515-1523.'),
('status-epilepticus', 12, 'Liu W, et al. Acute Basilar Artery Occlusion Presenting With Convulsive Movements: A Systematic Review. Front Neurol. 2022;12:803618. DOI: 10.3389/fneur.2021.803618. PMID: 35185758. (Median ED-to-diagnosis 8h 24min; only 19% caught in tPA window.)'),
('status-epilepticus', 13, 'Bhatt SK, Singh TD, Rabinstein AA. Refractory Left Focal Motor Status Epilepticus as Initial Clinical Presentation of Acute Basilar Artery Thrombosis. Mayo Clin Proc Innov Qual Outcomes. 2021;5(2):511-515. PMID: 33997647. PMC8105497.'),
('status-epilepticus', 14, 'Bourmaf M, Katyal R, Al-Awwad A. Top of Basilar Syndrome Presenting with Hyperekplexia Initially Diagnosed as Convulsive Status Epilepticus. J Emerg Med. 2020;59(5):e53-e56. DOI: 10.1016/j.jemermed.2020.06.044.'),
('status-epilepticus', 15, 'Kattah JC, Talkad AV, Wang DZ, Hsieh YH, Newman-Toker DE. HINTS to Diagnose Stroke in the Acute Vestibular Syndrome: Three-Step Bedside Oculomotor Examination More Sensitive than Early MRI Diffusion-Weighted Imaging. Stroke. 2009;40(11):3504-3510. PMID: 19762709. (Skew + direction-changing nystagmus + normal head impulse = 100% sensitive / 96% specific for stroke.)'),
('status-epilepticus', 16, 'Caplan LR. "Top of the Basilar" Syndrome. Neurology. 1980;30(1):72-79. PMID: 7188637. (Vertical gaze palsy in >75% of top-of-basilar cases.)'),
('status-epilepticus', 17, 'Tao C, Nogueira RG, Zhu Y, et al. Trial of Endovascular Treatment of Acute Basilar-Artery Occlusion (ATTENTION). N Engl J Med. 2022;387(15):1361-1372. PMID: 36239644. (0-12h window: mRS 0-3 at 90d 46% thrombectomy vs 23% medical, stopped early for efficacy.)'),
('status-epilepticus', 18, 'Jovin TG, Li C, Wu L, et al. Trial of Thrombectomy 6 to 24 Hours After Stroke Due to Basilar-Artery Occlusion (BAOCHE). N Engl J Med. 2022;387(15):1373-1384. PMID: 36239645. (6-24h window: mRS 0-3 at 90d 46% thrombectomy vs 24% medical, stopped early for efficacy.)');

DELETE FROM decision_nodes WHERE tree_id = 'status-epilepticus';

-- 4. decision_nodes (28 nodes)

-- MODULE 1: RECOGNITION & STABILIZATION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-start', 'status-epilepticus', 'info', 1,
 'Status Epilepticus',
 '> 🚨 **BEFORE YOU START THE BZD ALGORITHM: LOOK AT THE EYES.**
> Basilar artery occlusion (BAO) can mimic refractory SE — convulsive movements, posturing, hyperekplexia, and coma with no cortical EEG correlate. Median time from ED arrival to BAO diagnosis when it presents this way is **8h 24min**, and only 19% are caught inside the tPA window. BAO mortality without recanalization is ~75%.
> 👉 **[Quick BAO mimicker check](#/node/se-bao-check)** — 60-second eye exam before committing to refractory SE.

---

[SE Steps Summary](#/info/se-summary) — time-critical escalating treatment pathway.

**Status epilepticus (SE)** is defined as a seizure lasting >5 minutes or recurrent seizures without recovery between episodes.

SE that persists despite first-line and second-line treatments often necessitates intubation and anesthetic infusions. Underrecognition and delays in treatment increase morbidity and mortality.

**Key principle:** Benzodiazepines become less effective the longer SE persists — GABAA receptors are internalized from the cell surface during prolonged seizure activity. Early, adequate-dose treatment is critical.

**Up to 30% morbidity and mortality** in adults. Etiology drives ~80% of SE-related mortality.',
 '[1,2,3,12,13]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-bao-check', NULL, NULL, NULL, '[{"src":"images/status-epilepticus/spike-wave-eeg.png","alt":"EEG tracing showing 3 Hz generalized spike-and-wave discharges — hallmark pattern of seizure activity","caption":"EEG: generalized spike-wave discharges. Continuous/recurrent discharges without recovery = status epilepticus. cEEG required to detect non-convulsive SE. (CC BY-SA 2.0)"}]'::jsonb, '[]'::jsonb, 0,
 'SE defined as seizure >5 min or recurrent without recovery — check eyes for BAO mimic BEFORE BZD algorithm', false, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-bao-check', 'status-epilepticus', 'question', 1,
 '60-Second BAO Mimicker Check — Look at the Eyes',
 '**Dell Med pearl:** A "seizure" that won''t respond to Ativan until you chemically coma them is **BASILAR until proven otherwise**.

The brainstem is the eyes'' window. In SE the brainstem is intact, so eyes still move conjugately, doll''s eyes work, pupils are reactive. In BAO the brainstem is structurally wrecked — eyes give it away in 60 seconds.

**Quick exam — answer YES if ANY of these are present:**

• **Dysconjugate gaze** (one eye drifts away from the other) — SE never makes this; conjugacy is maintained by an intact MLF.
• **Skew deviation** (vertical misalignment) — 100% sensitive / 96% specific for stroke in HINTS (Kattah 2009).
• **Vertical gaze palsy** (up-gaze, down-gaze, or both lost) — classic for top-of-the-basilar (Caplan 1980, >75%).
• **Ocular bobbing** (fast DOWN, slow return up) — pontine destruction → BAO.
• **Pinpoint reactive pupils** (pons), **mid-position fixed pupils** (midbrain), or **one of each** — essentially pathognomonic for BAO. SE pupils are large and reactive from catecholamine surge.
• **Absent or asymmetric doll''s eyes** — brainstem destruction. SE should have intact oculocephalic reflex.
• **INO, one-and-a-half syndrome** — structural pontine/midbrain lesion. SE never does this.

**Also check:**
• Crossed signs (ipsilateral CN deficit + contralateral hemiparesis) → BAO.
• Sudden onset in a vasculopath, no prior seizure history, posterior circulation prodrome (vertigo, diplopia, dysarthria, ataxia) → BAO.',
 '[12,13,14,15,16,17,18]'::jsonb, '[{"label":"Eye exam is normal — eyes conjugate, doll''s eyes intact, pupils symmetric","description":"Brainstem intact — proceed with SE algorithm","next":"se-is-this-se"},{"label":"⚠️ Any BAO red flag — pivot now","description":"Dysconjugate / skew / vertical palsy / bobbing / fixed or asymmetric pupils / absent doll''s eyes / crossed signs","next":"se-bao-mimicker","urgency":"critical"},{"label":"Patient is actively convulsing — can''t fully exam yet","description":"Treat as SE; re-examine eyes between seizures or after first BZD","next":"se-is-this-se","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1,
 'Eyes are the brainstem window — dysconjugate, skew, vertical palsy, bobbing, fixed pupils, absent doll''s eyes = BAO', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-bao-mimicker', 'status-epilepticus', 'result', 1,
 'Pivot: Basilar Artery Occlusion Suspected',
 '**Stop chasing SE. Get the CTA. Call neuro-IR.**

BAO presenting as convulsive movements / refractory "SE" is a known and lethal trap. Median time to diagnosis when it presents this way is 8h 24min — only 19% caught inside the tPA window (Liu 2022 systematic review). Mortality without recanalization ~75% (StatPearls; ATTENTION/BAOCHE control arms).

---

**📋 Immediate actions:**

1. **CTA head and neck STAT** — 90 seconds. NCCT alone misses 30-40% of BAOs (Goldmakher 2009). Hyperdense basilar artery sign is specific but only ~60% sensitive.
2. **Activate neuro-IR / stroke team** — thrombectomy window extends to **24h** from last known well (BAOCHE/ATTENTION; mRS 0-3 at 90d ~46% vs ~24% medical, NNT ~4-5).
3. **Hold further antiseizure escalation** — don''t intubate-and-paralyze the brainstem exam away if BAO is on the table. If already intubated, use short-acting paralytic.
4. **Permissive hypertension** — do NOT lower BP unless >220/120 (or >185/110 if going for tPA). Penumbra depends on collateral perfusion. Intraprocedural MAP target 80-110 mmHg.
5. **Test for locked-in** — ask the patient to look up. A "comatose" patient who follows commands with vertical gaze is awake, aware, and locked-in — not in SE.
6. **Document the eye findings in real time** — time-stamped evidence of the diagnostic pivot.

---

**🔬 Workup checklist:**
• CTA head and neck (priority over EEG)
• Fingerstick glucose (rule out hypo-mimic)
• ECG (afib is the most common embolic source)
• CBC, BMP, coags, troponin, type and screen
• MRI/MRA if CTA negative but suspicion remains high

---

**🩺 Supportive care:**
• HOB flat (0°) unless ICP concern — maximize cerebral perfusion
• SpO2 ≥94% (avoid hyperoxia)
• Glucose 140-180
• Treat fever aggressively
• Mechanical DVT prophylaxis only (no heparin pre-thrombectomy)

---

**🚩 Red flag money-quote checklist** (2+ present → BAO until proven otherwise):

1. Eyes don''t match the cortex story (any dysconjugate, skew, vertical palsy, bobbing, INO, pinpoint pontine pupils)
2. Doll''s eyes gone or asymmetric
3. Crossed signs (ipsilateral CN + contralateral motor)
4. Refractory to BZD + 2nd-line ASM with no clear cortical EEG correlate
5. Posterior circulation prodrome before the "seizure" (vertigo, diplopia, dysarthria, dysphagia, ataxia, drop attack)

**Bonus:** Sudden onset in a vasculopath — SE builds up, BAO drops like a guillotine.

---

**If CTA is negative or BAO is ruled out, return to the SE algorithm:**',
 '[12,13,14,15,16,17,18]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Stop SE escalation. CTA head/neck STAT, activate neuro-IR, permissive HTN, test for locked-in with vertical gaze. Thrombectomy window up to 24h from LKW (BAOCHE/ATTENTION).', '{"firstLine":{"drug":"CTA head + neck (not a drug — diagnostic priority)","dose":"STAT","route":"Imaging","frequency":"Once","duration":"90 seconds acquisition","notes":"NCCT misses 30-40% of BAO. Hyperdense basilar artery sign 57-71% sensitive. Get CTA."},"alternative":{"drug":"IV tPA (if within 4.5h AND no contraindications)","dose":"0.9 mg/kg IV (max 90 mg), 10% bolus then infusion over 60 min","route":"IV","frequency":"Single","duration":"60 min infusion","notes":"Concurrent with thrombectomy activation if eligible. Permissive HTN otherwise — do NOT lower BP <140 SBP."},"monitoring":"Continuous neuro checks. Avoid hypoxia and hypotension. MAP 80-110 intraprocedurally. HOB flat unless ICP concern."}'::jsonb, 'definitive', '[]'::jsonb, '[]'::jsonb, 2,
 'Stop SE workup, CTA STAT, activate neuro-IR, thrombectomy up to 24h (BAOCHE/ATTENTION), permissive HTN', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-is-this-se', 'status-epilepticus', 'question', 1,
 'Is This Status Epilepticus?',
 '**Convulsive SE:** Generalized tonic-clonic activity >5 min, or recurrent seizures without recovery of consciousness between episodes.

**Subtle / late SE:** After prolonged generalized seizure, motor activity may diminish — look for subtle signs: facial twitching, nystagmus, eye deviation.

**Key history:** Duration of seizure activity, witnessed motor features, prior seizure history, current medications, recent drug/alcohol use, trauma, pregnancy status.

Physical exam: lateral tongue lacerations suggest seizure over syncope. Check for meningeal signs, focal neurologic deficits, signs of trauma.',
 '[1,2]'::jsonb, '[{"label":"Yes — Active seizure >5 min or recurrent","description":"Convulsive SE confirmed or highly suspected","next":"se-abcs","urgency":"critical"},{"label":"Altered consciousness, not convulsing","description":"Possible NCSE — subtle signs, postictal, or unexplained AMS","next":"se-ncse","urgency":"urgent"},{"label":"Likely not SE — consider differential","description":"Syncope, PNES, movement disorder, or other mimic","next":"se-differential"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3,
 'Differentiate convulsive SE, subtle SE, NCSE, and mimics — duration, motor features, and consciousness guide triage', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-abcs', 'status-epilepticus', 'info', 1,
 'ABCs & Initial Stabilization',
 '**Airway:** Position in left lateral decubitus if actively seizing. Suction available. Nasopharyngeal airway if needed — do NOT use bite block or oral airway (risk of obstruction and provider injury). Do NOT attempt intubation during active tonic-clonic seizure unless airway compromise.

**Breathing:** High-flow O2 via non-rebreather. Monitor SpO2 continuously. Respiratory failure can occur from seizure itself or from benzodiazepines.

**Circulation:** Cardiac monitor, IV access × 2. Vital signs including temperature.

**Protect from injury** — pad side rails, remove hazards. Do NOT restrain.

**Start the clock** — time from seizure onset drives treatment decisions.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-glucose-labs', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4,
 'Left lateral position, high-flow O2, dual IV access, start the clock — no bite block, no restraints', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-glucose-labs', 'status-epilepticus', 'info', 1,
 'Glucose & Diagnostic Workup',
 '**Fingerstick glucose STAT** — hypoglycemia is a common, easily reversible seizure trigger.
• If glucose <60 mg/dL: D50W 25 g IV (adults) or D10W 2-5 mL/kg (peds)

[SE Diagnostic Workup](#/info/se-labs) — complete lab panel and imaging guide.

**Priority labs:** BMP (Na, Ca, Mg, Phos), CBC, lactate, VBG, urine drug screen, serum tox, ASM levels (if on therapy), troponin, CK, pregnancy test.

**Imaging:** CT head non-contrast after stabilization — evaluate for structural cause. MRI when stable.

**EEG:** Order early if available — 48% of patients with altered consciousness post-SE have ongoing NCSE on EEG.

**Lumbar puncture:** If signs of meningitis, fever with no clear source, or immunocompromised.',
 '[1,3,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-iv-access', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5,
 'Fingerstick glucose STAT — D50W if <60; labs, CT, EEG; 48% of altered post-SE have ongoing NCSE', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-iv-access', 'status-epilepticus', 'question', 1,
 'IV Access Available?',
 'Route of administration determines first-line benzodiazepine choice.

**IV access preferred** but should NOT delay treatment. If IV is not immediately available, give IM midazolam — the RAMPART trial showed IM midazolam is non-inferior to IV lorazepam and faster to administer.

Underdosing of benzodiazepines leads to poor response and increased likelihood of refractory SE.',
 '[1,5]'::jsonb, '[{"label":"Yes — IV established","description":"IV lorazepam is preferred first-line","next":"se-iv-bzd","urgency":"critical"},{"label":"No — IM/IN/PR route","description":"IM midazolam is first-line when no IV access","next":"se-no-iv-bzd","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6,
 'Route determines BZD choice — IV lorazepam preferred, IM midazolam if no IV (RAMPART: non-inferior)', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 2: PHASE 1: BENZODIAZEPINES
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-iv-bzd', 'status-epilepticus', 'info', 2,
 'IV Lorazepam (First-Line)',
 '[Lorazepam](#/drug/lorazepam/status epilepticus) 0.1 mg/kg IV (max 4 mg/dose), push over 2 min.

**May repeat once** in 5-10 minutes if seizure persists. Total max: 8 mg.

**Alternative if lorazepam unavailable:**
• [Diazepam](#/drug/diazepam/status epilepticus iv) 0.15-0.2 mg/kg IV (max 10 mg), repeat once

Lorazepam is preferred over diazepam — higher seizure termination rate (65% vs 56%) and longer duration of action.

**Monitor for respiratory depression** — have bag-valve mask and suction at bedside. Patients who received multiple BZD doses from EMS are at higher risk.',
 '[1,2,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-bzd-response', NULL, '{"firstLine":{"drug":"Lorazepam","dose":"0.1 mg/kg IV (max 4 mg/dose)","route":"IV push","frequency":"May repeat once in 5-10 min","duration":"Total max 8 mg","notes":"Push over 2 min. Monitor for respiratory depression."},"alternative":{"drug":"Diazepam","dose":"0.15-0.2 mg/kg IV (max 10 mg)","route":"IV","frequency":"Repeat once if needed","duration":"Single dose or repeat x1","notes":"Use if lorazepam unavailable. Lower seizure termination rate (56% vs 65%)."},"monitoring":"Continuous pulse oximetry, respiratory monitoring. Have BVM and suction at bedside."}'::jsonb, NULL, '[]'::jsonb, '[{"id":"peds-dose","label":"Peds Dose Calculator"}]'::jsonb, 7,
 'Lorazepam 0.1 mg/kg IV max 4 mg, repeat once in 5-10 min — monitor respiratory depression', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-no-iv-bzd', 'status-epilepticus', 'info', 2,
 'IM Midazolam (No IV Access)',
 '[Midazolam](#/drug/midazolam/status epilepticus im) 0.2 mg/kg IM (max 10 mg) into deltoid or vastus lateralis.

**RAMPART trial:** IM midazolam terminated seizures in 73% vs 63% for IV lorazepam (p<.001). Faster time to treatment offset the slightly slower IM onset.

**Weight-based dosing:**
• ≥40 kg: 10 mg IM
• 13-40 kg: 5 mg IM

**Alternative routes:**
• Intranasal midazolam: 0.2 mg/kg via mucosal atomizer (less effective than IM per Guterman et al)
• [Diazepam](#/drug/diazepam/status epilepticus rectal) 0.2-0.5 mg/kg PR (max 20 mg) — no longer recommended as first-line

**Continue attempting IV access** — will be needed for 2nd-line agents if BZD fails.',
 '[1,5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-bzd-response', NULL, '{"firstLine":{"drug":"Midazolam","dose":"0.2 mg/kg IM (max 10 mg)","route":"IM (deltoid or vastus lateralis)","frequency":"Single dose","duration":"Once","notes":"Weight-based: >=40 kg give 10 mg, 13-40 kg give 5 mg. RAMPART showed 73% seizure termination."},"alternative":{"drug":"Diazepam","dose":"0.2-0.5 mg/kg PR (max 20 mg)","route":"PR","frequency":"Single dose","duration":"Once","notes":"No longer recommended as first-line. Use if midazolam unavailable."},"monitoring":"Continue attempting IV access. Monitor respiratory status."}'::jsonb, NULL, '[]'::jsonb, '[{"id":"peds-dose","label":"Peds Dose Calculator"}]'::jsonb, 8,
 'Midazolam 0.2 mg/kg IM max 10 mg — RAMPART showed 73% termination; continue seeking IV access', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-bzd-response', 'status-epilepticus', 'question', 2,
 'Seizure Response to Benzodiazepine?',
 'Assess **5 minutes** after BZD administration. Up to 2 doses of first-line BZD may be given.

If second dose given, reassess after 5 additional minutes.

**Seizure terminated** = cessation of all motor activity AND progressive improvement in consciousness. Subtle motor signs (facial twitching, nystagmus) may indicate ongoing SE.',
 '[1,2]'::jsonb, '[{"label":"Seizure terminated","description":"Motor activity stopped, consciousness improving","next":"se-bzd-success"},{"label":"Still seizing after adequate BZD","description":"Benzodiazepine-refractory — proceed to 2nd line","next":"se-special-pop","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 9,
 'Assess 5 min after BZD — cessation of motor activity AND improving consciousness means success', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-bzd-success', 'status-epilepticus', 'result', 2,
 'Seizure Terminated After Benzodiazepine',
 'Seizure terminated with first-line benzodiazepine therapy.

**Post-seizure management:**
• Monitor for recurrence — recurrence risk is significant
• Complete diagnostic workup (labs, imaging, EEG if available)
• Determine etiology — drives 80% of outcome
• Consider ASM loading for seizure prophylaxis if first unprovoked seizure with high recurrence risk, known epilepsy with subtherapeutic levels, or structural lesion identified
• [Levetiracetam](#/drug/levetiracetam/status epilepticus) 20-60 mg/kg IV (max 4500 mg) is preferred for ASM loading

**If patient does not return to baseline within 30-60 min**, consider ongoing NCSE — obtain urgent EEG.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Seizure terminated with BZD. Monitor for recurrence, complete etiology workup. Load maintenance ASM if indicated. If no return to baseline within 30-60 min, obtain EEG to rule out NCSE.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 10,
 NULL, NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 3: PHASE 2: URGENT CONTROL
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-special-pop', 'status-epilepticus', 'question', 3,
 'Special Population?',
 'Before selecting 2nd-line antiseizure medication, identify if the patient belongs to a special population that changes management.

If none apply, proceed directly to standard 2nd-line ASM selection.',
 '[1]'::jsonb, '[{"label":"Pregnant / suspected eclampsia","description":"Magnesium sulfate first; avoid teratogenic agents","next":"se-pregnancy","urgency":"critical"},{"label":"Known/suspected toxic ingestion","description":"INH → pyridoxine; phenytoin often ineffective","next":"se-substance","urgency":"critical"},{"label":"Pediatric considerations","description":"Same agents, weight-based dosing, consider pyridoxine-dependent epilepsy","next":"se-peds","urgency":"urgent"},{"label":"Standard adult — no special population","description":"Proceed to 2nd-line ASM selection","next":"se-2nd-line-choice","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11,
 'Screen for pregnancy, toxic ingestion, or pediatric age before selecting 2nd-line ASM', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-2nd-line-choice', 'status-epilepticus', 'question', 3,
 'Second-Line ASM Selection',
 'BZD-refractory convulsive SE. Administer within **5-10 minutes** of BZD failure.

**ESETT trial (2019):** Levetiracetam, fosphenytoin, and valproate had **equivalent efficacy** (~47% seizure cessation at 60 min). No significant difference in adverse events between the three agents.

Choice should be tailored to patient''s comorbidities and contraindications.

[2nd-Line ASM Comparison](#/info/se-asm-comparison) — side-by-side efficacy, contraindications, and side effects.',
 '[1,2,6]'::jsonb, '[{"label":"Levetiracetam (Keppra)","description":"Fewest drug interactions. Safe in hepatic/renal disease. Safe in pregnancy.","next":"se-levetiracetam"},{"label":"Valproate (Depacon)","description":"Avoid in pregnancy, liver disease, mitochondrial disorders, thrombocytopenia","next":"se-valproate"},{"label":"Fosphenytoin (Cerebyx)","description":"Avoid if drug/alcohol-induced SE. Cardiac monitoring required.","next":"se-fosphenytoin"},{"label":"Phenobarbital","description":"If above unavailable. Higher sedation and respiratory depression risk.","next":"se-phenobarbital"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 12,
 'ESETT: levetiracetam, fosphenytoin, valproate equally effective (~47%) — choose by comorbidities', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-levetiracetam', 'status-epilepticus', 'info', 3,
 'Levetiracetam (Keppra)',
 '[Levetiracetam](#/drug/levetiracetam/status epilepticus) 60 mg/kg IV (max 4500 mg) over 10-15 min.

**ESETT:** 47% seizure termination at 60 min (equivalent to fosphenytoin and valproate).

**Advantages:**
• No cardiac effects — no telemetry requirement during infusion
• No hepatic metabolism — no drug interactions
• Safe in renal impairment (dose adjust if CrCl <50)
• Safe in pregnancy (Category C, low teratogenicity — preferred 2nd line in pregnant patients)
• Minimal drug-drug interactions

**Side effects:** Psychiatric symptoms (irritability, agitation), drowsiness. Use with caution in patients with mood disorders.',
 '[1,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, '{"firstLine":{"drug":"Levetiracetam (Keppra)","dose":"60 mg/kg IV (max 4500 mg)","route":"IV infusion","frequency":"Single loading dose","duration":"Infuse over 10-15 min","notes":"No cardiac monitoring required. Safe in pregnancy. Dose adjust if CrCl <50."},"monitoring":"No telemetry required during infusion. Monitor for psychiatric symptoms. Renal function for maintenance dosing."}'::jsonb, NULL, '[]'::jsonb, '[{"id":"peds-dose","label":"Peds Dose Calculator"}]'::jsonb, 13,
 'Levetiracetam 60 mg/kg IV max 4500 mg — no cardiac effects, no drug interactions, safe in pregnancy', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-valproate', 'status-epilepticus', 'info', 3,
 'Valproate Sodium (Depacon)',
 '[Valproate](#/drug/valproate/status epilepticus) 40 mg/kg IV (max 3000 mg) over 10 min.

**ESETT:** 46% seizure termination at 60 min.

**Contraindicated in:**
• Pregnancy (teratogenic — neural tube defects, Category X)
• Hepatic disease / liver failure
• Mitochondrial disorders (Alpers syndrome — fatal hepatotoxicity)
• Known or suspected urea cycle disorders
• Pancreatitis

**Cautions:**
• Thrombocytopenia / coagulopathy — check platelets
• May cause hyperammonemia — check ammonia if altered mental status persists after seizure cessation
• Well-tolerated even with larger doses and faster rates of infusion',
 '[1,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, '{"firstLine":{"drug":"Valproate Sodium (Depacon)","dose":"40 mg/kg IV (max 3000 mg)","route":"IV infusion","frequency":"Single loading dose","duration":"Infuse over 10 min","notes":"Contraindicated in pregnancy (Category X), hepatic disease, mitochondrial disorders, urea cycle disorders."},"monitoring":"Check platelets before administration. Monitor ammonia if AMS persists post-seizure. LFTs."}'::jsonb, NULL, '[]'::jsonb, '[{"id":"peds-dose","label":"Peds Dose Calculator"}]'::jsonb, 14,
 'Valproate 40 mg/kg IV max 3000 mg — contraindicated in pregnancy, liver disease, mitochondrial disorders', NULL, 'warning', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-fosphenytoin', 'status-epilepticus', 'info', 3,
 'Fosphenytoin (Cerebyx)',
 '[Fosphenytoin](#/drug/fosphenytoin/status epilepticus) 20 mg PE/kg IV (max 1500 mg PE) at max rate 150 mg PE/min.

**ESETT:** 45% seizure termination at 60 min.

**Requires cardiac monitoring** during and for 20 min after infusion — risk of:
• Hypotension
• Cardiac arrhythmia (bradycardia, QT prolongation)
• AV block

**INEFFECTIVE** for drug/alcohol-induced seizures — phenytoin''s selective action on voltage-gated sodium channels is insufficient for diffuse CNS toxicity.

**Contraindicated in:**
• Sinus bradycardia, SA/AV block, Adams-Stokes syndrome
• Decompensated heart failure

**Note:** Fosphenytoin (water-soluble prodrug) is preferred over phenytoin — no risk of purple glove syndrome, can be given IM. Dosed in **PE (phenytoin equivalents)**.',
 '[1,6,7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, '{"firstLine":{"drug":"Fosphenytoin (Cerebyx)","dose":"20 mg PE/kg IV (max 1500 mg PE)","route":"IV infusion","frequency":"Single loading dose","duration":"Max rate 150 mg PE/min","notes":"Dosed in PE (phenytoin equivalents). Ineffective for drug/alcohol-induced seizures. Contraindicated in bradycardia, heart block, decompensated HF."},"monitoring":"Continuous cardiac monitoring during infusion and for 20 min after. Monitor for hypotension, bradycardia, QT prolongation."}'::jsonb, NULL, '[]'::jsonb, '[{"id":"peds-dose","label":"Peds Dose Calculator"}]'::jsonb, 15,
 'Fosphenytoin 20 mg PE/kg IV — requires cardiac monitoring, INEFFECTIVE for drug/alcohol-induced seizures', NULL, 'warning', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-2nd-line-response', 'status-epilepticus', 'question', 3,
 '2nd-Line ASM Response?',
 'Assess **20 minutes** after start of infusion.

If seizure persists or recurs, this is now **refractory status epilepticus (RSE)**.

~30-40% of patients fail 2nd-line therapy. As SE duration increases, GABAA receptor internalization progresses and benzodiazepine/ASM resistance increases.

If the first 2nd-line agent fails, guidelines recommend either:
• Adding another 2nd-line ASM, OR
• Proceeding directly to anesthetic infusions',
 '[1,2]'::jsonb, '[{"label":"Seizure terminated","description":"Clinical and EEG seizure cessation","next":"se-2nd-success"},{"label":"Still seizing — refractory SE","description":"Failed BZD + 2nd-line ASM — escalate to anesthetic agents","next":"se-rse-prep","urgency":"critical"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16,
 'Assess 20 min after infusion — persistent seizure = refractory SE, 30-40% fail 2nd-line therapy', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 4: REFRACTORY SE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-phenobarbital', 'status-epilepticus', 'info', 4,
 'Phenobarbital',
 '[Phenobarbital](#/drug/phenobarbital/status epilepticus) 15-20 mg/kg IV at max rate 50-100 mg/min. Max single dose: 2000 mg.

**Use when ESETT agents (levetiracetam, valproate, fosphenytoin) are unavailable** or contraindicated.

**Significant risks:**
• Respiratory depression — may precipitate need for intubation
• Hypotension
• Excessive sedation

**Have intubation supplies ready** before administration.

**Also first-line for:**
• Neonatal seizures
• Benzodiazepine-resistant alcohol withdrawal seizures

When benzodiazepines are completely unavailable, [phenobarbital](#/drug/phenobarbital/status epilepticus) IV 15-20 mg/kg may be used as first-line emergent therapy.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-response', NULL, '{"firstLine":{"drug":"Phenobarbital","dose":"15-20 mg/kg IV (max 2000 mg)","route":"IV infusion","frequency":"Single loading dose","duration":"Max rate 50-100 mg/min","notes":"Use when ESETT agents unavailable. Also first-line for neonatal seizures and BZD-resistant alcohol withdrawal."},"monitoring":"Have intubation supplies ready. Monitor respiratory status, BP. High risk of respiratory depression and hypotension."}'::jsonb, NULL, '[]'::jsonb, '[{"id":"peds-dose","label":"Peds Dose Calculator"}]'::jsonb, 17,
 'Phenobarbital 15-20 mg/kg IV — high respiratory depression risk, have intubation ready', NULL, 'warning', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-2nd-success', 'status-epilepticus', 'result', 4,
 'Seizure Terminated After 2nd-Line ASM',
 'Seizure terminated with 2nd-line antiseizure medication.

**Critical: Monitor for NCSE** — ESETT data showed 48% of patients with altered consciousness post-SE had ongoing nonconvulsive seizures on EEG.

**Post-seizure management:**
• Continuous EEG monitoring recommended — minimum 24h
• Continue maintenance dosing of the ASM that terminated seizure
• Complete etiology workup (labs, imaging, LP if indicated)
• Consider adding a second ASM for prophylaxis if high recurrence risk
• ICU admission for close monitoring',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Seizure terminated with 2nd-line ASM. Admit to ICU. Continuous EEG monitoring × 24-48h recommended. Continue maintenance ASM. Complete etiology workup.', NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 18,
 NULL, NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-rse-prep', 'status-epilepticus', 'info', 4,
 'Refractory SE — Intubation & Preparation',
 '**Refractory SE (RSE)** = failure of first-line BZD AND adequate second-line ASM.

Occurs in ~30-40% of SE presentations.

**Immediate actions:**
• Secure airway with rapid sequence intubation
• Avoid prolonged paralysis — use short-acting agent (succinylcholine preferred over rocuronium) to allow clinical seizure assessment
• Arterial line for continuous BP monitoring
• Central venous access for vasopressors if needed
• **Continuous EEG monitoring — MANDATORY** (cannot assess seizure activity in paralyzed/sedated patient)

[RSE Management Principles](#/info/se-rse-principles) — intubation considerations, EEG targets, weaning protocol.

**Consider adding another 2nd-line ASM** (e.g., [Lacosamide](#/drug/lacosamide/status epilepticus) 200-400 mg IV) as adjunct before or concurrent with anesthetic infusion.',
 '[1,2,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-rse-infusion', NULL, '{"firstLine":{"drug":"Lacosamide (adjunct)","dose":"200-400 mg IV","route":"IV","frequency":"Single dose","duration":"As adjunct to anesthetic infusion","notes":"Consider adding as adjunct before or concurrent with anesthetic infusion."},"monitoring":"Continuous EEG monitoring mandatory. Arterial line for BP. Central venous access for vasopressors."}'::jsonb, NULL, '[]'::jsonb, '[{"id":"weight-dose","label":"Weight-Based Dose"}]'::jsonb, 19,
 'RSE requires intubation, arterial line, continuous EEG — short-acting paralytic for seizure assessment', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-rse-infusion', 'status-epilepticus', 'question', 4,
 'RSE — Continuous Infusion Selection',
 '**Goal:** EEG seizure suppression or burst suppression for 24-48 hours before weaning attempt.

No large RCTs demonstrate clear superiority between agents. Choice based on clinical factors.

All agents require mechanical ventilation and ICU-level care.

[Continuous Infusion Comparison](#/info/se-infusion-comparison) — dosing, hemodynamic effects, and unique risks for each agent.',
 '[1,8]'::jsonb, '[{"label":"Midazolam infusion","description":"Load 0.2 mg/kg, infuse 0.05-2 mg/kg/hr. Lowest hemodynamic impact, easier to wean.","next":"se-rse-monitoring"},{"label":"Propofol infusion","description":"Load 1-2 mg/kg, infuse 30-200 mcg/kg/min. Watch for propofol infusion syndrome (PRIS).","next":"se-rse-monitoring"},{"label":"Pentobarbital infusion","description":"Load 5-15 mg/kg, infuse 0.5-5 mg/kg/hr. Deepest suppression, most hemodynamic compromise.","next":"se-rse-monitoring"},{"label":"Ketamine infusion","description":"Load 0.5-3 mg/kg, infuse 0.1-5 mg/kg/hr. NMDA antagonist — different mechanism, may avoid intubation.","next":"se-rse-monitoring"}]'::jsonb, '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 20,
 'Select continuous infusion for EEG burst suppression — midazolam, propofol, pentobarbital, or ketamine', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-rse-monitoring', 'status-epilepticus', 'info', 4,
 'RSE/SRSE Monitoring & Weaning',
 '**Continuous EEG targets:**
• Burst suppression (3-10 sec bursts, <50% suppression ratio)
• OR complete seizure suppression (depending on clinical scenario)

**Maintenance:** 24-48 hours of seizure suppression before first wean attempt.

**Weaning protocol:**
• Reduce infusion by 25% every 4-6 hours with continuous EEG
• If seizures recur on wean → restart at effective dose, extend 24h, retry

**Super-refractory SE (SRSE):** SE persists or recurs despite 24 hours of anesthetic therapy.

**SRSE options:**
• Switch to different anesthetic agent
• [Lacosamide](#/drug/lacosamide/status epilepticus) as adjunct
• Immunotherapy if autoimmune etiology suspected (IVIG, steroids, plasmapheresis)
• Therapeutic hypothermia (32-35°C)
• Ketogenic diet
• Neurology and neurointensive care consultation essential

**NORSE (new-onset refractory SE):** No prior seizure history, no identifiable cause. ~50% remain cryptogenic. Consider autoimmune/paraneoplastic encephalitis panel.',
 '[1,2,8]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-disposition', NULL, '{"firstLine":{"drug":"Midazolam infusion","dose":"Load 0.2 mg/kg, then 0.05-2 mg/kg/hr","route":"IV continuous infusion","frequency":"Continuous","duration":"24-48 hr of burst suppression before wean","notes":"Lowest hemodynamic impact, easier to wean. Wean by 25% every 4-6 hours."},"alternative":{"drug":"Propofol infusion","dose":"Load 1-2 mg/kg, then 30-200 mcg/kg/min","route":"IV continuous infusion","frequency":"Continuous","duration":"24-48 hr then wean","notes":"Watch for propofol infusion syndrome (PRIS). Max 5 mg/kg/hr, max 48 hours at high dose."},"monitoring":"Continuous EEG mandatory. Target burst suppression or seizure suppression. Wean 25% every 4-6 hr. If seizures recur, restart effective dose and extend 24h."}'::jsonb, NULL, '[]'::jsonb, '[]'::jsonb, 21,
 'Maintain burst suppression 24-48h, wean 25% q4-6h — SRSE if seizures persist despite 24h anesthesia', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-disposition', 'status-epilepticus', 'result', 4,
 'Disposition & Ongoing Management',
 '**All SE patients require ICU admission.**

**Monitoring:**
• Continuous EEG monitoring × minimum 24-48h
• Detect NCSE, guide treatment, monitor for recurrence

**Workup to complete:**
• MRI brain (when stable) — superior to CT for structural causes
• LP if infectious or autoimmune etiology suspected
• Autoimmune encephalitis panel if no clear etiology (NMDA-receptor Ab, LGI1, CASPR2)
• ASM levels (therapeutic drug monitoring)

**Maintenance ASM:**
• Continue the agent(s) that terminated SE
• [Levetiracetam](#/drug/levetiracetam/status epilepticus) is most commonly used for maintenance

**Goals of care:** Discuss with family early if RSE/SRSE — prognosis depends primarily on underlying etiology.

**Neurology consultation** for all SE patients.',
 '[1,2]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Admit to ICU. Continuous EEG × 24-48h. Complete etiology workup (MRI, LP if indicated, autoimmune panel if cryptogenic). Continue maintenance ASM. Neurology consultation.', NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 22,
 NULL, NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 5: SPECIAL POPULATIONS
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-pregnancy', 'status-epilepticus', 'info', 5,
 'Pregnancy / Eclampsia',
 '**First question: Is this eclampsia or epilepsy?**

**Eclampsia** if: hypertension, proteinuria, edema, >20 weeks gestation, or new-onset seizure in pregnancy without prior seizure history.

**Eclampsia treatment:**
• [Magnesium Sulfate](#/drug/magnesium-sulfate/eclampsia) 4-6 g IV over 15-20 min, then 1-2 g/hr infusion
• If seizures persist despite magnesium → benzodiazepines (lorazepam)
• **OB consultation STAT** — consider emergent delivery
• Fetal monitoring

**Epilepsy in pregnancy (breakthrough SE):**
• Standard BZD first-line
• For 2nd-line: **prefer [Levetiracetam](#/drug/levetiracetam/status epilepticus)** — 89% of neurologists chose it as first-line after BZD in pregnancy
• **AVOID [Valproate](#/drug/valproate/status epilepticus)** — teratogenic (neural tube defects), Category X
• Fosphenytoin acceptable if needed (teratogenic risk mainly with chronic exposure, less concern for acute SE)
• Refractory SE: midazolam or propofol infusion + consider early delivery

**All pregnant patients with new seizure** should receive empiric magnesium while further workup obtained.',
 '[1,9,10]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-choice', NULL, '{"firstLine":{"drug":"Magnesium Sulfate","dose":"4-6 g IV load, then 1-2 g/hr infusion","route":"IV","frequency":"Load then continuous infusion","duration":"Until seizures controlled and delivery","notes":"First-line for eclampsia. Give empirically to all pregnant patients with new seizure."},"alternative":{"drug":"Levetiracetam","dose":"60 mg/kg IV (max 4500 mg)","route":"IV","frequency":"Single loading dose","duration":"Over 10-15 min","notes":"Preferred 2nd-line ASM in pregnancy. AVOID valproate (Category X)."},"monitoring":"Fetal monitoring. OB consultation STAT. Consider emergent delivery. Monitor Mg levels (therapeutic 4-7 mEq/L), reflexes, respiratory status."}'::jsonb, NULL, '[]'::jsonb, '[]'::jsonb, 23,
 'Eclampsia: MgSO4 first; epilepsy in pregnancy: prefer levetiracetam, AVOID valproate (Category X)', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-substance', 'status-epilepticus', 'info', 5,
 'Substance-Induced SE',
 '**9% of SE cases are substance-induced.**

**Isoniazid (INH) toxicity:**
• [Pyridoxine (Vitamin B6)](#/drug/pyridoxine/inh toxicity) is the specific antidote
• Dose: gram-for-gram to amount ingested, OR 5 g IV empiric if amount unknown
• INH depletes pyridoxine → GABA synthesis fails → refractory seizures
• Standard ASMs are ineffective without pyridoxine

**Alcohol withdrawal:**
• Benzodiazepines are first-line (high-dose may be needed)
• [Phenobarbital](#/drug/phenobarbital/status epilepticus) is effective adjunct
• Fosphenytoin/phenytoin INEFFECTIVE for alcohol withdrawal seizures

**Sympathomimetic toxicity** (cocaine, methamphetamine, MDMA):
• BZDs first-line
• Avoid phenytoin

**General principle:** Phenytoin/fosphenytoin is often **ineffective** for drug-induced seizures — phenytoin''s selective action on voltage-gated sodium channels cannot overcome diffuse CNS toxicity from other drug mechanisms.

**Treat the underlying toxidrome** alongside seizure management.',
 '[1,11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-choice', NULL, '{"firstLine":{"drug":"Pyridoxine (Vitamin B6)","dose":"Gram-for-gram to INH ingested, or 5 g IV empiric","route":"IV","frequency":"Single dose","duration":"Immediate","notes":"Specific antidote for INH toxicity. Standard ASMs ineffective without pyridoxine."},"alternative":{"drug":"Phenobarbital","dose":"15-20 mg/kg IV","route":"IV","frequency":"Single loading dose","duration":"Max rate 50-100 mg/min","notes":"Effective adjunct for alcohol withdrawal seizures. Phenytoin/fosphenytoin ineffective for drug-induced SE."},"monitoring":"Treat underlying toxidrome. Avoid phenytoin in drug/alcohol-induced SE. High-dose BZD may be needed."}'::jsonb, NULL, '[]'::jsonb, '[]'::jsonb, 24,
 'INH toxicity: pyridoxine 5g IV empiric; alcohol withdrawal: BZDs + phenobarbital; phenytoin INEFFECTIVE for drug-induced SE', NULL, 'critical', NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-peds', 'status-epilepticus', 'info', 5,
 'Pediatric Considerations',
 '**Same treatment algorithm as adults** — BZD first-line, then 2nd-line ASM, then anesthetic infusions.

**BZD dosing (weight-based):**
• IV [Lorazepam](#/drug/lorazepam/status epilepticus): 0.1 mg/kg (max 4 mg), repeat × 1
• IM [Midazolam](#/drug/midazolam/status epilepticus): 13-40 kg → 5 mg; ≥40 kg → 10 mg (0.2 mg/kg, max 10 mg)
• Rectal [Diazepam](#/drug/diazepam/status epilepticus): 0.2-0.5 mg/kg (max 20 mg)

**2nd-line ASM:** Same agents and weight-based dosing as adults (per ESETT, which included pediatric patients).
• EcLiPSE and ConSEPT trials confirmed levetiracetam and phenytoin are equivalent in pediatric convulsive SE

**Pediatric-specific considerations:**
• **Pyridoxine-dependent epilepsy** (age <2 yr): Give [Pyridoxine](#/drug/pyridoxine/pyridoxine dependent epilepsy) 100 mg IV if SE is refractory and no clear etiology — especially neonates with refractory seizures
• **Febrile SE:** Most common etiology in children — workup directed at fever source
• **Inborn errors of metabolism:** Consider in neonates/infants with unexplained SE
• [Phenobarbital](#/drug/phenobarbital/status epilepticus) remains first-line for neonatal seizures

**Weight estimation:** <1 yr: (months × 0.5) + 3.5 kg | 1-10 yr: (years × 2) + 10 kg | >10 yr: (years × 2) + 20 kg',
 '[1,2,6]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-2nd-line-choice', NULL, '{"firstLine":{"drug":"Lorazepam (pediatric)","dose":"0.1 mg/kg IV (max 4 mg)","route":"IV","frequency":"May repeat once","duration":"Push over 2 min","notes":"Same algorithm as adults. Weight-based dosing."},"alternative":{"drug":"Midazolam (pediatric)","dose":"0.2 mg/kg IM (max 10 mg); 13-40 kg: 5 mg, >=40 kg: 10 mg","route":"IM","frequency":"Single dose","duration":"Immediate","notes":"Use when no IV access. Rectal diazepam 0.2-0.5 mg/kg (max 20 mg) also acceptable."},"pcnAllergy":{"drug":"Pyridoxine (neonates/infants)","dose":"100 mg IV","route":"IV","frequency":"Single dose","duration":"Immediate","notes":"Consider in refractory SE age <2 yr with no clear etiology. Rule out pyridoxine-dependent epilepsy."},"monitoring":"Weight estimation formulas provided. Febrile SE most common in children. Phenobarbital first-line for neonatal seizures."}'::jsonb, NULL, '[]'::jsonb, '[]'::jsonb, 25,
 'Same algorithm as adults with weight-based dosing — consider pyridoxine-dependent epilepsy in neonates/infants', NULL, NULL, NULL, NULL, NULL)
;


-- MODULE 6: DIFFERENTIAL & NCSE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-ncse', 'status-epilepticus', 'info', 6,
 'Nonconvulsive Status Epilepticus (NCSE)',
 'NCSE accounts for up to **48% of patients with altered consciousness post-SE** (ESETT data).

**Suspect NCSE if:**
• Unexplained altered mental status after convulsive SE
• Subtle motor signs: eye deviation, nystagmus, lip smacking, eyelid fluttering, myoclonus
• Failure to return to baseline after initial seizure treatment
• Acutely ill ICU patients (especially on neurotoxic medications: cephalosporins, methotrexate, baclofen, lithium, opioids)

**Diagnosis:** Requires **EEG** — cannot diagnose clinically.

[NCSE Diagnostic Criteria](#/info/se-ncse-criteria) — Salzburg criteria and BZD trial protocol.

**BZD trial (diagnostic + therapeutic):**
• Administer [lorazepam](#/drug/lorazepam/status epilepticus) 1-2 mg IV while monitoring EEG
• Clinical AND EEG improvement → confirms NCSE diagnosis

**Treatment:** Same escalating algorithm as convulsive SE (BZD → 2nd-line → anesthetic infusions), but **urgency of aggressive treatment is debated** — weigh risks of anesthetic agents and intubation against ongoing nonconvulsive seizure activity.

NCSE generally has lower mortality than convulsive SE, but delay in diagnosis worsens outcomes.',
 '[1,2,4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'se-iv-access', NULL, '{"firstLine":{"drug":"Lorazepam (BZD trial)","dose":"1-2 mg IV","route":"IV","frequency":"Single dose during EEG","duration":"Diagnostic trial","notes":"BZD trial is both diagnostic and therapeutic. Clinical AND EEG improvement confirms NCSE."},"monitoring":"EEG required for diagnosis. Clinical + EEG improvement confirms NCSE. Weigh risks of aggressive treatment against ongoing nonconvulsive activity."}'::jsonb, NULL, '[]'::jsonb, '[]'::jsonb, 26,
 'NCSE in 48% of altered post-SE patients — requires EEG for diagnosis, BZD trial is diagnostic + therapeutic', NULL, NULL, NULL, NULL, NULL)
;

INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order, summary, skippable, safety_level, when_to_use, pearls, evidence) VALUES
('se-differential', 'status-epilepticus', 'result', 6,
 'Not SE — Differential Diagnosis',
 '**Common SE mimics:**

• **Psychogenic nonepileptic seizures (PNES):** Most common mimic. Features suggesting PNES: side-to-side head movements, pelvic thrusting, forced eye closure (seizures: eyes open), emotional outbursts, asynchronous limb movements, waxing/waning pattern, absence of postictal confusion. Video EEG is definitive.

• **Syncope with myoclonus:** Brief jerking movements after loss of consciousness — self-limited, resolves when horizontal. Lasts seconds (not minutes).

• **Movement disorders:** Dystonic reactions (from dopamine-blocking medications), oculogyric crisis (20-30 min, no loss of consciousness), tremor, myoclonus.

• **Metabolic encephalopathy:** Uremia, hyperammonemia, hepatic encephalopathy, myxedema coma.

• **Drug toxicity / intoxication:** Alcohol, delirium tremens, serotonin syndrome.

• **Basilar artery occlusion (BAO):** ⚠️ **The #1 lethal SE mimic.** Convulsive movements, hyperekplexia, posturing, and coma without cortical EEG correlate. Eyes give it away: dysconjugate gaze, skew, vertical palsy, ocular bobbing, fixed/asymmetric pupils, absent doll''s eyes, INO, crossed signs. 24h thrombectomy window (BAOCHE/ATTENTION). **[Open BAO mimicker check](#/node/se-bao-check)**.

• **Locked-in syndrome:** Ventral pontine infarction (basilar artery thrombosis) — quadriplegia + anarthria but **conscious**. Test with vertical eye movements ("look up if you can hear me") — a "comatose" patient who follows commands with vertical gaze is locked-in, not in SE. ~75% acute mortality.

• **Decerebrate/decorticate posturing:** From structural brain injury — not rhythmic. Sustained extensor posture with absent doll''s eyes → brainstem (BAO). Repetitive tonic-clonic with preserved doll''s eyes and reactive pupils → SE.

**Key differentiators:**
• Lateral tongue laceration suggests seizure over syncope
• Lactate >2.45 mmol/L: 88% sensitivity, 87% specificity for GTC seizure vs syncope/PNES
• Prolactin elevated 10-20 min post-seizure: 53% sensitivity, 93% specificity for convulsive SE

**If uncertain, treat as SE** until effectively ruled out — delayed treatment worsens outcomes.',
 '[1,3]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL, 'Consider alternative diagnosis. If uncertain, treat as SE until proven otherwise. PNES is the most common mimic — video EEG is definitive. Do not administer antiseizure medications for confirmed PNES.', NULL, 'consider', '[]'::jsonb, '[]'::jsonb, 27,
 NULL, NULL, NULL, NULL, NULL, NULL)
;


-- 6. info_pages (1 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('se-rx-flow', 'Seizure Rx Flow', 'First-line, second-line, refractory, and cause-specific rescue',
 '[{"heading":"0-5 Min: Stabilize + Find Reversible Triggers","body":"**Treat convulsive seizure activity lasting >=5 minutes as status epilepticus.** Start airway positioning, suction, oxygen, monitor, IV/IO access, and a visible seizure clock.\n\n**Do immediately, in parallel:**\n• Fingerstick glucose; give dextrose if low or if glucose cannot be checked quickly.\n• Check sodium/electrolytes as soon as blood is available.\n• Ask about pregnancy/postpartum, TB meds/isoniazid, withdrawal, bupropion/TCA/sympathomimetics, head trauma, and missed antiseizure meds.\n• Do not wait for labs before giving a first-line benzodiazepine."},{"heading":"1st Line: Benzodiazepine, Full Dose","body":"**IV access:** [Lorazepam](#/drug/lorazepam/status epilepticus) **0.1 mg/kg IV**, max **4 mg/dose**, repeat once in 5 minutes if still seizing.\n\n**No IV/IO yet:** [Midazolam](#/drug/midazolam/status epilepticus im) **10 mg IM** adult, or **0.2 mg/kg IM/IN** max 10 mg.\n\n**Diazepam fallback:** 10 mg IV, repeat q5-10 min to max 30 mg, or rectal 0.2-0.5 mg/kg max 20 mg.\n\n**Do not underdose.** Adequate benzodiazepine treatment is less dangerous than ongoing status; persistent seizure drives acidosis, aspiration, hyperthermia, rhabdo, and neuronal injury."},{"heading":"2nd Line: Load an Antiseizure Medication","body":"**Give within 5-10 minutes of benzodiazepine failure.** Do not wait to see if the seizure \"settles out.\"\n\nCommon ED choices:\n• [Levetiracetam](#/drug/levetiracetam/status epilepticus) **60 mg/kg IV**, max **4.5 g**. Good default; few interactions.\n• [Valproate](#/drug/valproate/status epilepticus) **40 mg/kg IV**, max **3 g**. Avoid pregnancy, liver failure, thrombocytopenia, known mitochondrial/urea-cycle disorder.\n• [Fosphenytoin](#/drug/fosphenytoin/status epilepticus) **20 mg PE/kg IV**, max **1500 mg PE**. Requires cardiac/BP monitoring; avoid significant conduction disease and many toxin/withdrawal seizures.\n• [Phenobarbital](#/drug/phenobarbital/status epilepticus) **15-20 mg/kg IV**, max **2 g**. Useful for alcohol/sedative withdrawal or when other agents unavailable; prepare airway/pressors.\n\nESETT supports levetiracetam, valproate, and fosphenytoin as similarly effective for benzodiazepine-refractory convulsive SE; choose by contraindications."},{"heading":"EMCrit 2025 Add-On: Early Ketamine Bridge","body":"**EMCrit/IBCC emphasizes early ketamine as a seizure-lysis bridge while maintenance ASM is loading.** This is an expert-resuscitation approach, not a universal guideline mandate.\n\nReasonable adult ED approach when generalized convulsive SE continues after benzodiazepine and pharmacy delay/airway concern exists:\n• [Ketamine](#/drug/ketamine/status epilepticus) **100 mg IV slow push** as a practical adult dose, or **1-2 mg/kg IV** by local protocol.\n• If no IV and seizure remains uncontrolled, some experts consider **ketamine ~3 mg/kg IM** while access is obtained.\n\nKetamine does not replace the second-line antiseizure medication. It buys time and may reduce the need for a rushed intubation, but ongoing seizure, hypoxia, aspiration risk, or refractory course still requires airway/ICU escalation."},{"heading":"3rd Line: Refractory SE / Neurolytic Intubation","body":"**Refractory SE = benzodiazepine + adequate second-line ASM failed.** Activate neurology/ICU, prepare intubation, vasopressors, and continuous EEG.\n\nCommon infusion options after airway control:\n• [Propofol](#/drug/propofol/refractory status epilepticus) load **1-2 mg/kg**, then **30-200 mcg/kg/min**; monitor BP, triglycerides, CK, lactate, PRIS risk.\n• [Midazolam](#/drug/midazolam/refractory status epilepticus) load **0.2 mg/kg**, then **0.05-2 mg/kg/hr**; less hypotension, more accumulation.\n• [Ketamine](#/drug/ketamine/refractory status epilepticus) load **0.5-3 mg/kg**, then **0.1-5 mg/kg/hr**; NMDA pathway, often hemodynamically favorable.\n• Pentobarbital coma is neuro-ICU level rescue.\n\nIf paralyzing, use the shortest effective paralysis and get EEG. Paralysis hides motor seizures; it does not stop cortical seizure activity."},{"heading":"Cause-Specific Rescue: Do Not Miss These","body":"**Hypoglycemia:** D50W **25 g IV** adult, or D10W **2-5 mL/kg** pediatric. Give [Thiamine](#/drug/thiamine/status epilepticus) **100-500 mg IV** if alcohol use, malnutrition, bariatric surgery, hyperemesis, or poor history; do not delay dextrose.\n\n**Hyponatremic seizure:** [3% hypertonic saline](#/drug/hypertonic-saline/severe symptomatic) **100-150 mL IV bolus over 10-20 min**, repeat up to 2 times for ongoing severe symptoms. Target initial Na rise **4-6 mEq/L**, then slow down and monitor q2h.\n\n**Eclampsia / pregnancy >20 wk / postpartum seizure:** [Magnesium sulfate](#/drug/magnesium-sulfate/eclampsia) **4-6 g IV load over 15-20 min**, then **1-2 g/hr**. Treat severe BP and call OB. If unclear, give magnesium while evaluating.\n\n**INH overdose or TB meds + refractory seizure/acidosis:** [Pyridoxine](#/drug/pyridoxine/inh toxicity) gram-for-gram to INH ingestion, or **5 g IV empiric** if unknown. Call poison center. Standard ASMs often fail until B6 is given."},{"heading":"Kitchen Sink for the Undifferentiated Bad Seizure","body":"Use when the patient is still seizing or deeply altered and the cause is unclear:\n\n• Benzodiazepine full dose, then second-line ASM immediately.\n• Glucose now if low, borderline, or cannot check rapidly.\n• Thiamine 100-500 mg IV if any malnutrition/alcohol risk or unknown history.\n• 3% saline bolus if Na is severely low or hyponatremic seizure is plausible.\n• Magnesium sulfate if pregnant/postpartum or eclampsia cannot be excluded.\n• Pyridoxine 5 g IV if INH/TB meds, refractory seizure + severe acidosis, or unknown ingestion with classic tox pattern.\n• Correct severe hypocalcemia/hypomagnesemia.\n• Treat hyperthermia, acidosis, rhabdomyolysis, hypoxia, and shock.\n• Avoid phenytoin/fosphenytoin for many toxin/withdrawal seizures; favor benzodiazepines, phenobarbital, propofol, or ketamine based on toxidrome and airway."},{"heading":"Stop Points","body":"• Do not give repeated tiny benzodiazepine doses; give full doses and escalate.\n• Do not wait 20-30 minutes for pharmacy if convulsive SE continues; prepare airway and consider ketamine/propofol pathway.\n• Do not intubate and paralyze without a plan for EEG or seizure-suppressing sedation.\n• Do not miss BAO mimic; check pupils/gaze/skew/doll eyes before anchoring on refractory SE.\n• Do not forget maintenance ASM after benzodiazepine seizure termination; recurrence risk remains high."}]'::jsonb,
 '[{"num":1,"text":"Farkas J. Status Epilepticus. Internet Book of Critical Care / EMCrit Project. Updated Apr 15, 2025."},{"num":2,"text":"EMCrit 403. What’s the Status of Status — Status Epilepticus 2025 with PulmCrit. EMCrit Project. 2025."},{"num":3,"text":"Glauser T, Shinnar S, Gloss D, et al. Evidence-Based Guideline: Treatment of Convulsive Status Epilepticus in Children and Adults. Epilepsy Curr. 2016;16(1):48-61."},{"num":4,"text":"Brophy GM, Bell R, Claassen J, et al. Guidelines for the Evaluation and Management of Status Epilepticus. Neurocrit Care. 2012;17(1):3-23."},{"num":5,"text":"Kapur J, Elm J, Chamberlain JM, et al. Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381:2103-2113."},{"num":6,"text":"Verbalis JG, Goldsmith SR, Greenberg A, et al. Diagnosis, Evaluation, and Treatment of Hyponatremia: Expert Panel Recommendations. Am J Med. 2013;126:S1-S42."},{"num":7,"text":"ACOG Practice Bulletin No. 222: Gestational Hypertension and Preeclampsia. Obstet Gynecol. 2020;135:e237-e260."},{"num":8,"text":"Wason S, Lacouture PG, Lovejoy FH Jr. Single High-Dose Pyridoxine Treatment for Isoniazid Overdose. JAMA. 1981;246(10):1102-1104."}]'::jsonb,
 false,
 0)
;

COMMIT;
