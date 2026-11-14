-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-14
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: dm-start (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"Diabetes Management - Initial Assessment","body":"[ED hyperglycemia and affordable bridge care](#/tree/hyperglycemia-ed)\n\n[Diabetes Management Steps Summary](#/info/dm-summary) - quick reference.\n\n**Approach to the diabetic patient:**\n\n**Immediate triage based on glucose level:**\n- Glucose <70 mg/dL: [Hypoglycemia pathway](#/node/dm-hypo-severity)\n- Glucose 70-180 mg/dL: Assess for DKA/HHS risk factors\n- Glucose 180-300 mg/dL: Mild hyperglycemia, assess context\n- Glucose >300 mg/dL: Evaluate for DKA/HHS\n- Glucose >600 mg/dL: High suspicion for HHS\n\n**Critical questions:**\n1. Type 1 vs Type 2 diabetes?\n2. On insulin? What type (pump, basal-bolus, premixed)?\n3. Recent illness, missed doses, new medications?\n4. Last oral intake? NPO status?\n\n**Red flags requiring immediate text:**\n- Altered mental status\n- Kussmaul respirations (deep, rapid breathing)\n- Fruity breath odor (ketones)\n- Signs of dehydration/shock","citation":[1,2],"next":"dm-glucose-triage","summary":"Identify the acute diabetic emergency — DKA, HHS, or hypoglycemia require different management"}'::jsonb
WHERE id = 'dm-start' AND tree_id = 'diabetes-management';

COMMIT;