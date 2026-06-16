-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-06-16
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: pst-med-reaction (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":2,"title":"Medication Reaction Pathway","body":"**Differentiate these emergencies:**\n\n| Feature | NMS | Serotonin Syndrome | Dystonia |\n|---------|-----|-------------------|----------|\n| **Onset** | Days | Hours | Minutes-hours |\n| **Rigidity** | Lead-pipe | Hyperreflexia, clonus | Focal (torticollis, oculogyric) |\n| **Temp** | >40°C | Variable | Normal |\n| **Mental status** | Altered | Agitated | Clear |\n| **Pupils** | Normal | Dilated | Normal |\n| **Cause** | Antipsychotics | SSRIs, MAOIs | Antipsychotics, antiemetics |\n\n**Treatments:**\n• **NMS:** Stop offending agent, dantrolene, bromocriptine, cooling\n• **Serotonin syndrome:** Stop offending agent, cyproheptadine, benzos\n• **Dystonia:** [Acute Dystonic Reaction consult](#/tree/dystonic-reaction) → [Diphenhydramine](#/drug/diphenhydramine/dystonia) 50 mg IV/IM or benztropine 1-2 mg IV/IM","citation":[8,9],"next":"pst-end","summary":"Med reaction — differentiate NMS vs serotonin syndrome vs dystonia. Treatment differs."}'::jsonb
WHERE id = 'pst-med-reaction' AND tree_id = 'psych-triage';

COMMIT;