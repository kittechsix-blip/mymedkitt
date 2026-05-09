-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-09
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: agit-icu (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":6,"title":"ICU Admission","body":"**ICU criteria:**\n• Ongoing sedation requirements\n• Airway concern / intubated\n• Rhabdomyolysis with renal injury\n• Cardiac arrhythmias\n• Hyperactive delirium with hyperthermia\n• Refractory agitation (phenobarbital/propofol infusion)","citation":[1],"recommendation":"Admit to ICU for ongoing monitoring and management.","confidence":"definitive","summary":"ICU for ongoing sedation, airway, rhabdo, arrhythmia, or refractory agitation."}'::jsonb
WHERE id = 'agit-icu' AND tree_id = 'acute-agitation';

-- Node: agit-psych-admit (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":6,"title":"Psychiatric Admission","body":"**Psychiatric admission if:**\n• Primary psychiatric etiology confirmed\n• Ongoing safety risk (suicidal, homicidal)\n• Unable to care for self\n\n**Requires medical stability assessment first:**\n→ [Psych Medical Stability](#/tree/medical-clearance-psych)","citation":[1],"recommendation":"Admit to inpatient psychiatry after medical clearance.","confidence":"definitive","summary":"Psychiatric admission for primary psych with ongoing safety risk."}'::jsonb
WHERE id = 'agit-psych-admit' AND tree_id = 'acute-agitation';

-- Node: agit-med-admit (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":6,"title":"Medical Admission","body":"**Medical admission if:**\n• Underlying medical condition requiring treatment\n  - Sepsis, DKA, stroke, etc.\n• Delirium requiring ongoing workup\n• Withdrawal requiring monitored taper","citation":[1],"recommendation":"Admit to medicine or appropriate specialty service.","confidence":"definitive","summary":"Medical admission for underlying condition (sepsis, metabolic, withdrawal)."}'::jsonb
WHERE id = 'agit-med-admit' AND tree_id = 'acute-agitation';

-- Node: agit-observe (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":6,"title":"ED Observation","body":"**Observation if:**\n• Mild intoxication expected to resolve\n• Awaiting sobriety for complete assessment\n• Unclear etiology, low acuity\n\n**Reassess when sober:**\n• Complete psychiatric assessment\n• Safety evaluation\n• Disposition planning","citation":[1],"recommendation":"Observe in ED until sober, then reassess.","confidence":"recommended","summary":"Observe until sober, then complete assessment and disposition."}'::jsonb
WHERE id = 'agit-observe' AND tree_id = 'acute-agitation';

-- Node: agit-discharge (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":6,"title":"Discharge","body":"**Discharge if:**\n• Clear benign etiology (mild intoxication, resolved)\n• No safety concerns\n• Safe environment\n• Reliable follow-up available\n\n**Provide:**\n• Follow-up appointment\n• Crisis resources (988 Suicide & Crisis Lifeline)\n• Return precautions","citation":[1],"recommendation":"Discharge with follow-up and crisis resources.","confidence":"recommended","summary":"Discharge if benign etiology, safe, with follow-up arranged."}'::jsonb
WHERE id = 'agit-discharge' AND tree_id = 'acute-agitation';

-- Node: agit-end (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":6,"title":"Management Complete","body":"Patient managed per protocol.\n\n**Key reminders:**\n• Document all interventions\n• Debrief with team\n• Review for quality improvement","citation":[1],"recommendation":"Document interventions and debrief with team.","confidence":"recommended","summary":"Document interventions, debrief, review for QI."}'::jsonb
WHERE id = 'agit-end' AND tree_id = 'acute-agitation';

COMMIT;