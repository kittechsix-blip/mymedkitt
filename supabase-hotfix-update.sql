-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-04-30
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: scd-voc-triage (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":2,"title":"Triage — Intranasal Fentanyl","body":"**GOAL: Analgesia within 30 minutes of triage, 60 minutes of ED arrival.** [4]\n\n**Intranasal Fentanyl at Triage (before IV access):**\n[Fentanyl](#/drug/fentanyl/scd pain triage) 1–1.5 mcg/kg IN via MAD atomizer (max 100 mcg)\n• Onset 5–10 min\n• Shortens ED length of stay [7]\n• Administer BEFORE establishing IV access\n\n**Triage Actions:**\n• Place PIV / access port\n• Obtain labs — [SCD Lab Panel & Rationale](#/info/scd-labs)\n• Urine HCG (females >10 years)\n• If ill-appearing: T&S, Hgb electrophoresis (STAT)\n• If febrile: use SCD Fever pathway concurrently\n• If chest pain with hypoxia or fever: concurrent ACS evaluation\n\n**Supportive Measures:**\n• Heat packs to painful sites\n• Continuous pulse oximetry\n• Offer opioid premeds if ordered (e.g., PO diphenhydramine)\n\n**Triage Questions:**\n• History of acute chest syndrome?\n• Last pain crisis?\n• Current fever, cough, chest pain?\n• Does patient have an individualized pain plan?","citation":[4,5,7],"next":"scd-voc-iv","summary":"IN fentanyl 1-1.5 mcg/kg at triage BEFORE IV access — goal analgesia within 30min; heat packs, continuous SpO2"}'::jsonb
WHERE id = 'scd-voc-triage' AND tree_id = 'sickle-cell';

COMMIT;