-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-06-06
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: pep-disposition (3 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":6,"title":"Disposition","body":"**Disposition depends on PE severity and patient stability:**\n\n| Severity | Disposition |\n|----------|-------------|\n| Low-risk | May discharge with LMWH, close follow-up |\n| Submassive | ICU admission |\n| Massive | ICU, consider thrombolysis/embolectomy |\n\n**Before discharge (if appropriate):**\n• LMWH teaching and supplies\n• OB follow-up within 1 week\n• Hematology referral\n• Return precautions\n\n**Peripartum anticoagulation plan:**\n• Continue therapeutic LMWH until delivery\n• Switch LMWH → UFH around 36 weeks (or earlier if delivery anticipated): UFH has a shorter half-life and is reversible, allowing neuraxial anesthesia\n• Hold anticoagulation per OB/anesthesia for planned delivery\n\n**Postpartum anticoagulation:**\n• Continue for a minimum of 6 weeks postpartum (total ≥3 months from diagnosis)\n• Warfarin is acceptable postpartum (does not enter breast milk in clinically significant amounts) — bridge from LMWH/UFH to therapeutic INR\n• Coordinate duration with hematology/OB [2][6]","citation":[2,6],"options":[{"label":"ICU admission — submassive/massive PE","next":"pep-icu","urgency":"urgent"},{"label":"Admit to OB/telemetry — low-risk PE","next":"pep-admit"},{"label":"Discharge with outpatient management","next":"pep-discharge"}],"summary":"Disposition by severity: low-risk may discharge with LMWH; submassive/massive require ICU. Peripartum: LMWH→UFH ~36wk for neuraxial. Postpartum: ≥6wk, warfarin OK"}'::jsonb
WHERE id = 'pep-disposition' AND tree_id = 'pe-pregnancy';

COMMIT;