-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-06-18
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: scape-dose (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"High-Dose Nitroglycerin","body":"Common ED approach for severe hypertensive SCAPE:\n- While preparing infusion: SL nitroglycerin 0.4 mg q5 min if able\n- **Loading-dose strategy (current EMCrit/IBCC):** a front-loaded IV bolus of ~600-2000 mcg over ~2 min (titrated to initial SBP), OR a brief high-rate infusion of 400-800 mcg/min for ~2.5 min, to rapidly break the crisis. Higher end for SBP >200.\n- IV push strategy by protocol: nitroglycerin 400-800 mcg IV every 2-5 min for severe distress and SBP usually >180\n- Infusion strategy: start 100-200 mcg/min and rapidly titrate every 3-5 min; severe SCAPE may require 300-800 mcg/min initially\n- Reduce once work of breathing improves and SBP approaches safer range, often 140-160\n\nHypotension after a bolus is usually transient (short nitro half-life) and responds to observation or a small crystalloid bolus. Use close BP monitoring. Arterial line is helpful but should not delay initial treatment in crashing SCAPE.","citation":[1,2,5,6],"next":"scape-monitor","summary":"SCAPE often needs rapid high-dose nitroglycerin titration rather than slow standard CHF dosing.","safetyLevel":"critical"}'::jsonb
WHERE id = 'scape-dose' AND tree_id = 'scape-nitroglycerin';

-- Citations changed — DELETE and re-INSERT
DELETE FROM tree_citations WHERE tree_id = 'scape-nitroglycerin';
INSERT INTO tree_citations (tree_id, num, text) VALUES ('scape-nitroglycerin', 1, 'EMCrit/IBCC. Sympathetic Crashing Acute Pulmonary Edema (SCAPE). Accessed 2026.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('scape-nitroglycerin', 2, 'Levy P, et al. Treatment of Severe Decompensated Heart Failure With High-Dose Intravenous Nitroglycerin. Ann Emerg Med. 2007;50(2):144-152.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('scape-nitroglycerin', 3, 'Heidenreich PA, et al. 2022 AHA/ACC/HFSA Guideline for Management of Heart Failure. Circulation. 2022;145:e895-e1032.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('scape-nitroglycerin', 4, 'Peacock WF, et al. Hypertensive Heart Failure and Acute Pulmonary Edema Reviews. Emerg Med Clin North Am. 2005;23(4):1105-1125.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('scape-nitroglycerin', 5, 'Wilson SS, et al. High-dose nitroglycerin infusion for SCAPE: case series. Am J Emerg Med. 2018;36(8):1526.e5-1526.e7.');
INSERT INTO tree_citations (tree_id, num, text) VALUES ('scape-nitroglycerin', 6, 'Randomized trial of high-dose vs low-dose nitroglycerin in SCAPE: high-dose (600-1000 mcg bolus + 100 mcg/min infusion) achieved 65% symptom resolution at 6h vs 11.5% low-dose (p<0.001). 2024.');

COMMIT;