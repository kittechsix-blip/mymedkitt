-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-08-23
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: pep-start (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"PE in Pregnancy","body":"**PE is a leading cause of maternal mortality** — responsible for ~10% of maternal deaths in developed countries.\n\n**Pregnancy is a hypercoagulable state:**\n• 5-10x increased VTE risk vs. non-pregnant\n• Risk persists 6 weeks postpartum\n• Highest risk in 3rd trimester and postpartum\n\n**Challenges:**\n• Symptoms overlap with normal pregnancy (dyspnea, edema, tachycardia)\n• D-dimer normally elevated in pregnancy\n• Concern about radiation exposure (often overstated)\n\n**Key Concept:** Missing PE is more dangerous than diagnostic radiation. [1][2]","citation":[1,2],"next":"pep-presentation","calculatorLinks":[{"id":"wells-pe","label":"Wells PE Score (not validated in pregnancy)"},{"id":"perc-rule","label":"PERC Rule"},{"id":"years-algorithm","label":"Pregnancy-Adapted YEARS"},{"id":"lmwh-dosing","label":"LMWH Pregnancy Dosing"}],"summary":"PE causes 10% maternal deaths; 5-10x VTE risk in pregnancy; symptoms overlap normal pregnancy; missing PE worse than radiation","skippable":true}'::jsonb
WHERE id = 'pep-start' AND tree_id = 'pe-pregnancy';

COMMIT;