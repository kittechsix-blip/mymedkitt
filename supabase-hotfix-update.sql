-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-17
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: ich-seizures (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":5,"title":"Seizure Management","body":"**Incidence:** ~10% convulsive seizures; subclinical seizure rate is substantially higher.\n\n**Risk factors:**\n• Cortical involvement (lobar hemorrhages)\n• Coexisting subarachnoid or subdural hemorrhage\n• Rebleeding\n\n**Continuous EEG monitoring indications:**\n• Impaired consciousness disproportionate to CT findings\n• Unexplained fluctuations in mental status\n• Any witnessed seizure or clinical signs of seizure\n\n**Treatment:**\n• **Seizure prophylaxis is NOT recommended** — prior evidence showed no benefit with phenytoin, and phenytoin has numerous side effects\n• **Treat witnessed seizure, EEG seizure, or nonconvulsive status epilepticus:**\n  – [Levetiracetam](#/drug/levetiracetam/ich seizure) 20 mg/kg IV (max 3000 mg) — preferred first-line\n  – Avoid phenytoin (may worsen outcomes in ICH)\n\n**Basis:** The recommendation against routine prophylaxis and in favour of treating only clinical or electrographic seizures is AHA/ASA 2022 [1] and ESO/EANS 2025 [2]. Reference [15] is the superseded AHA/ASA 2015 ICH guideline, retained here only to show where the earlier phenytoin-prophylaxis position came from — it has been replaced by [1]. Pathophysiology and seizure-risk background: [14].","citation":[1,2,14,15],"next":"ich-icp-fever","treatment":{"firstLine":{"drug":"Levetiracetam","dose":"20 mg/kg IV (max 3000 mg)","route":"IV","frequency":"Loading dose, then q12h maintenance","duration":"Acute phase, taper per neurology","notes":"Preferred first-line. Treat witnessed seizure, EEG seizure, or NCSE only. Prophylaxis NOT recommended."},"monitoring":"Continuous EEG if impaired consciousness disproportionate to CT, unexplained mental status changes, or witnessed seizure."},"summary":"Treat clinical or EEG seizures with levetiracetam — seizure prophylaxis NOT recommended (AHA/ASA 2022)"}'::jsonb
WHERE id = 'ich-seizures' AND tree_id = 'ich';

COMMIT;