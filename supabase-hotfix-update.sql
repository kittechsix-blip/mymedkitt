-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-06-07
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: exdel-start (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":1,"title":"State of Extreme Agitation with Aggression: First Screen","body":"This consult is for severe hyperactive delirium with dangerous agitation, especially when paired with hyperthermia, acidosis, stimulant toxidrome, prolonged struggle, restraint, or physiologic collapse.\n\nUse the term \"excited delirium\" for searchability, not as a final diagnosis. Treat the physiology first, then find the cause.","citation":[1,2,3],"options":[{"label":"Immediate threat, prolonged struggle, or physiologic danger","description":"Cannot safely assess, violent threat, exhaustion, hyperthermia, acidosis, hypoxia, shock, or restraint struggle","next":"exdel-danger","urgency":"critical"},{"label":"Agitated but not currently dangerous","description":"Can talk, separate from triggers, and obtain targeted vitals without unsafe restraint","next":"exdel-not-danger","urgency":"urgent"}],"summary":"First decide whether this is a dangerous resuscitation syndrome or agitation that allows assessment first.","safetyLevel":"critical"}'::jsonb
WHERE id = 'exdel-start' AND tree_id = 'excited-delirium';

COMMIT;