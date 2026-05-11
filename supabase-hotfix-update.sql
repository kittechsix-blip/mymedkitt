-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-11
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: ap-disposition (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Psychosis Disposition","body":"**Disposition depends on etiology, safety, function, and follow-up reliability:**\n\n**Psychiatric admission if:**\n* Danger to self or others\n* Unable to care for self / grave disability\n* Severe disorganization, agitation, or command hallucinations\n* Needs medication initiation/titration with monitoring\n* Involuntary hold criteria met\n* First-break psychosis without reliable support or rapid follow-up\n\n**Medical admission if:**\n* Organic cause identified\n* Delirium\n* Anti-NMDA encephalitis or other autoimmune concern\n* Abnormal vital signs\n* Neurologic findings, seizure, intoxication/withdrawal, or unstable medical issue\n\n**Discharge can be appropriate if ALL are true:**\n* Mild symptoms, good insight, no acute safety concern\n* Strong support system and safe environment\n* Reliable early follow-up arranged (ideally first-episode psychosis program)\n* Clear return precautions and medication plan if started\n\n**Follow-up:** First-episode psychosis clinic / coordinated specialty care program when available.","citation":[1,4,9],"recommendation":"Psychiatric consultation and early intervention are recommended for first-break psychosis. Admit for safety, grave disability, severe symptoms, medical instability, or unreliable support/follow-up.","confidence":"recommended","summary":"Disposition: admit for safety/medical instability/grave disability; discharge only with low risk, support, and rapid follow-up."}'::jsonb
WHERE id = 'ap-disposition' AND tree_id = 'acute-psychosis';

-- Node: cat-disposition (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":5,"title":"Catatonia Disposition","body":"**Admission required for:**\n* All catatonia patients (cannot safely discharge)\n* Benzodiazepine titration and monitoring\n* Etiology workup\n* Nutrition/hydration support\n* DVT prophylaxis\n\n**ICU admission if:**\n* Malignant catatonia (fever >38 degC, autonomic instability)\n* Excited catatonia with exhaustion\n* Respiratory compromise\n* Severe dehydration/rhabdomyolysis\n\n**Psychiatry admission if:**\n* Stable on lorazepam\n* No medical complications\n* Awaiting ECT\n\n**Key orders:**\n* Lorazepam scheduled\n* DVT prophylaxis\n* NPO or supervised feeding if swallowing impaired\n* PT/OT consult\n* Foley if unable to void","citation":[3,4,5],"recommendation":"Admit all catatonia patients. ICU if malignant features. Continue scheduled lorazepam, DVT prophylaxis, consider ECT if benzo-resistant.","confidence":"recommended","summary":"Admit for lorazepam titration, etiology workup. ICU if malignant/excited."}'::jsonb
WHERE id = 'cat-disposition' AND tree_id = 'catatonia';

-- Node: peds-fb-discharge (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":7,"title":"Pathway Complete","body":"Pediatric foreign body pathway complete.\n\n**Documentation reminders:**\n- Witnessed event details (object, time, witness)\n- Imaging findings\n- Procedures performed\n- Mitigation given (honey/sucralfate timing for BB)\n- Family education provided and return precautions documented","citation":[1,2,16],"recommendation":"Discharge or admit per disposition criteria with appropriate follow-up.","confidence":"definitive","summary":"Document everything — witness, object, time, mitigation, education"}'::jsonb
WHERE id = 'peds-fb-discharge' AND tree_id = 'peds-foreign-body';

COMMIT;