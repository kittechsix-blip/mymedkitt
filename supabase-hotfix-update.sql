-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-05
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: dsi-use-rsi (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":1,"title":"Standard RSI Appropriate","body":"Patient is tolerating standard preoxygenation — proceed with RSI. [1][5]","citation":[1,5],"recommendation":"**Standard RSI Indicated**\n\nPatient can tolerate preoxygenation — DSI not required. [1][5]\n\n**Proceed with RSI:**\n- Preoxygenate with NC 15 L/min + NRB or BVM with PEEP\n- Target SpO2 >95% for 3 minutes\n- Then induction + paralysis + intubation\n\n**Consider the **Physiologically Difficult Airway** consult** if:\n- Hypotensive\n- Hypoxemic\n- Severely acidotic\n- RV failure\n- Elevated ICP","summary":"Patient tolerates preoxygenation — use standard RSI, not DSI"}'::jsonb
WHERE id = 'dsi-use-rsi' AND tree_id = 'delayed-sequence-intubation';

-- Node: dsi-contraindicated (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":2,"title":"DSI Contraindicated","body":"DSI is not appropriate for this patient due to absolute contraindication. [1][4]","citation":[1,4],"recommendation":"**DSI Contraindicated** [1][4]\n\n**Proceed with RSI** despite known desaturation risk:\n\n- Maximize preoxygenation as tolerated\n- Have difficult airway equipment ready\n- Consider apneic oxygenation (NC 15 L/min) during laryngoscopy\n- Be prepared for rapid desaturation\n\n**If patient is apneic/not breathing:**\n- Immediate BVM ventilation\n- Proceed directly to intubation\n\n**If aspiration risk is primary concern:**\n- RSI provides the shortest time from induction to secured airway\n- Cricoid pressure if trained\n- Suction at ready","summary":"DSI contraindicated — proceed with RSI despite desaturation risk"}'::jsonb
WHERE id = 'dsi-contraindicated' AND tree_id = 'delayed-sequence-intubation';

-- Node: dsi-avoid-intubation (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Intubation May Be Avoidable","body":"Patient has improved dramatically with DSI — intubation may not be needed. [1][2]","citation":[1,2,6],"recommendation":"**Consider Avoiding Intubation** [1][2]\n\n**Patient Status:**\n- SpO2 now adequate\n- Work of breathing improved\n- Underlying condition (asthma/COPD) responding to treatment\n\n**Management:**\n\n1. **Continue supportive oxygenation:**\n   - CPAP/BiPAP if tolerated\n   - High-flow nasal cannula\n   - Monitor closely\n\n2. **Allow ketamine to wear off:**\n   - Duration: 20-30 minutes\n   - Monitor for agitation returning\n\n3. **Treat underlying condition:**\n   - Bronchodilators for asthma/COPD\n   - Anxiolytics if anxiety-driven\n   - Antibiotics if infection\n\n4. **Disposition:**\n   - ICU admission for close monitoring\n   - May need intubation later if deteriorates\n\n**Document:** \"DSI performed for preoxygenation. Patient improved; intubation deferred. Close ICU monitoring.\" [1][6]","summary":"Intubation avoided — continue supportive oxygenation, let ketamine wear off, treat underlying condition, ICU admission"}'::jsonb
WHERE id = 'dsi-avoid-intubation' AND tree_id = 'delayed-sequence-intubation';

-- Node: dsi-post-intubation (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Post-Intubation Care","body":"Intubation complete — proceed to post-intubation management. [1][6]","citation":[1,5,6,7],"recommendation":"**Post-DSI Intubation Checklist:** [1][6]\n\n**Confirm Placement:**\n- Waveform capnography (ETCO2 35-45 mmHg)\n- Bilateral breath sounds\n- Chest X-ray ordered\n\n**Secure ETT:**\n- Note depth at teeth (typically 21-23 cm adults)\n- Secure with tape or commercial holder\n\n**Post-Intubation Sedation:** [5][7]\n- Ketamine is wearing off — start continuous sedation\n- Propofol infusion 25-50 mcg/kg/min, OR\n- Fentanyl 1-2 mcg/kg/hr + midazolam 0.02-0.1 mg/kg/hr\n- Consider ketamine infusion 0.1-0.5 mg/kg/hr\n\n**Ventilator Settings:**\n- Lung-protective ventilation (6-8 mL/kg IBW)\n- PEEP 5-10 cm H2O\n- FiO2 to maintain SpO2 92-96%\n\n**Disposition:**\n- ICU admission\n- Arterial line for hemodynamic monitoring\n- Serial ABGs\n\n**Documentation:**\n- DSI technique used\n- Ketamine dose\n- Pre/post SpO2 values\n- Intubation details (view, device, tube size, depth)","summary":"Post-intubation: confirm with capnography, start continuous sedation (ketamine wearing off), ventilator settings, ICU"}'::jsonb
WHERE id = 'dsi-post-intubation' AND tree_id = 'delayed-sequence-intubation';

-- Node: nms-icu-admit (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":4,"title":"ICU Admission","body":"**ICU mandatory for:** [1][2][6]\n* Temp >40 degC\n* Severe rigidity\n* Rhabdomyolysis (CK >10,000)\n* Respiratory compromise\n* Renal failure\n* Autonomic instability\n\n**Mortality:** 10-20% even with treatment. Higher if delayed diagnosis. [3][7]","citation":[1,2,3,6,7],"recommendation":"ICU admission for severe NMS.","confidence":"definitive","summary":"ICU for severe NMS. Mortality 10-20% with treatment."}'::jsonb
WHERE id = 'nms-icu-admit' AND tree_id = 'nms';

-- Node: nms-floor-admit (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":4,"title":"Step-down Admission","body":"**Step-down/telemetry for:** [1][2][8]\n* Mild-moderate symptoms\n* Stable vitals\n* CK <10,000\n* No respiratory compromise\n\n**Continue:**\n* Bromocriptine\n* Benzos PRN\n* Aggressive hydration\n* Serial CK and renal function\n\n**Duration:** Average hospitalization 7-14 days. [4][8]","citation":[1,2,4,8],"recommendation":"Step-down admission for moderate NMS.","confidence":"definitive","summary":"Step-down for moderate. Average stay 7-14 days."}'::jsonb
WHERE id = 'nms-floor-admit' AND tree_id = 'nms';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'nms';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 1, 'Berman BD. Neuroleptic Malignant Syndrome: A Review for Neurohospitalists. Neurohospitalist 2011;1:41-7.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 2, 'Strawn JR, et al. Neuroleptic Malignant Syndrome. Am J Psychiatry 2007;164:870-6.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 3, 'Levenson JL. Neuroleptic Malignant Syndrome. Am J Psychiatry 1985;142:1137-45.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 4, 'Rosenberg MR, Green M. Neuroleptic Malignant Syndrome: Review of Response to Therapy. Arch Intern Med 1989;149:1927-31.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 5, 'Boyer EW, Shannon M. The Serotonin Syndrome. N Engl J Med 2005;352:1112-20.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 6, 'Caroff SN, Mann SC. Neuroleptic Malignant Syndrome. Med Clin North Am 1993;77:185-202.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 7, 'Modi S, Dharaiya D, Schultz L, Varelas P. Neuroleptic Malignant Syndrome: Complications, Outcomes, and Mortality. Neurocrit Care 2016;24:97-103.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('nms', 8, 'Velamoor VR, Norman RM, Caroff SN, Mann SC, Sullivan KA, Antelo RE. Progression of symptoms in neuroleptic malignant syndrome. J Nerv Ment Dis 1994;182:168-73.');

-- Node: ss-alternative-dx (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":3,"title":"Alternative Diagnosis","body":"**Serotonin syndrome unlikely** — consider: [1][5][7]\n\n• **Anticholinergic toxicity:** Dry, hot, flushed, urinary retention, absent bowel sounds\n• **Sympathomimetic:** Cocaine, amphetamines — similar but no clonus\n• **Sepsis:** Fever, altered mental status — check source\n• **Meningitis/Encephalitis:** Meningismus, CSF analysis\n• **Thyroid storm:** History of hyperthyroidism, check TSH\n• **Heat stroke:** Environmental exposure, dry skin\n• **Malignant hyperthermia:** Anesthesia exposure, extreme rigidity\n\n**Workup:**\n• CBC, BMP, LFTs, CK, lactate\n• TSH, cortisol\n• Urinalysis, blood cultures\n• CT head if altered mental status\n• LP if meningitis concern","citation":[1,5,7],"recommendation":"Continue workup for alternative etiology."}'::jsonb
WHERE id = 'ss-alternative-dx' AND tree_id = 'serotonin-syndrome';

-- Node: ss-complete (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Serotonin Syndrome — Complete","body":"**Summary:** [1][2][4][7][8]\n\n**Diagnosis:**\n• Hunter Criteria = serotonergic drug + clinical findings\n• Clonus is the hallmark finding\n• Distinguish from NMS (rigidity, slow onset, antipsychotics)\n\n**Treatment:**\n• STOP serotonergic agents\n• Benzodiazepines for agitation\n• Cyproheptadine 12 mg load → 2 mg q2h (max 32 mg/day)\n• Aggressive cooling for hyperthermia\n• Supportive care\n\n**Prognosis:**\n• Most cases resolve in 24-72 hours\n• Excellent outcomes with early recognition\n• Severe cases can be fatal if untreated\n\n**Key Resources:**\n• [Hunter Criteria](#/calculator/hunter-criteria)\n• [SS vs NMS Differentiator](#/calculator/ss-vs-nms)\n• [Serotonergic Drug List](#/calculator/ss-drug-list)\n• [Cyproheptadine Dosing](#/calculator/cyproheptadine-dose)","citation":[1,2,4,7,8],"recommendation":"Management pathway complete. Ensure psychiatry follow-up for medication reconciliation."}'::jsonb
WHERE id = 'ss-complete' AND tree_id = 'serotonin-syndrome';

COMMIT;