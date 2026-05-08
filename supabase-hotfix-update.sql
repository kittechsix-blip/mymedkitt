-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-08
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: cvst-start (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"Cerebral Venous Sinus Thrombosis","body":"[CVST Steps Summary](#/info/cvst-summary) — diagnostic and treatment pathway.\n\n**CVST accounts for 0.5-3% of all strokes**, primarily affecting young adults and women of reproductive age (3:1 female predominance).\n\n**Classic presentation:**\n• **Headache** — >90% of cases, often severe, progressive\n• **Seizures** — 20-40%\n• **Focal neurologic deficits** — 20-50%\n• **Altered consciousness** — variable\n• **Papilledema** — suggests elevated ICP\n\n**High-risk populations:**\n• Pregnancy/puerperium (9 per 100,000 deliveries)\n• Oral contraceptive users (OR 7.59)\n• Prothrombotic conditions\n• Malignancy (~6% of cases)","citation":[1,2],"next":"cvst-clinical-syndrome","calculatorLinks":[{"id":"cvt-gs","label":"CVT-GS Score"},{"id":"iscvt-rs","label":"ISCVT Risk Score"}],"summary":"CVST: 0.5-3% of all strokes — primarily young women, headache in >90%, seizures in 20-40%"}'::jsonb
WHERE id = 'cvst-start' AND tree_id = 'cvst';

COMMIT;