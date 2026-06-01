-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-31
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: ich-cerebellar-surg (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":4,"title":"Cerebellar Hematoma — Surgical Emergency","body":"**The cerebellum is unique — patients may deteriorate rapidly (12–24h).**\n\nRisks of cerebellar hemorrhage:\n• Direct brainstem compression → catastrophic damage\n• 4th ventricle compression → obstructive hydrocephalus\n• Upward transtentorial herniation\n\n**Paradox:** Cerebellar ICH patients tend to have better prognosis than other ICH types IF timely surgical intervention is performed.\n\n**AHA/ASA 2022 — Immediate surgical evacuation if:**\n• Hematoma volume **>15 mL**\n• Neurological deterioration\n• Brainstem compression\n• Hydrocephalus\n\n**Important:** Ventriculostomy (EVD) alone without posterior fossa decompression is **NOT recommended** — increases risk of upward transtentorial herniation.\n\nEVD pressure may not accurately reflect posterior fossa pressure.\n\nConsult neurosurgery **immediately** — this is a time-critical surgical emergency.","citation":[1,2],"next":"ich-seizures","summary":"Cerebellar ICH >3 cm (≈ >15 mL) or hydrocephalus/brainstem compression = emergent surgical evacuation — rapid herniation risk","safetyLevel":"critical"}'::jsonb
WHERE id = 'ich-cerebellar-surg' AND tree_id = 'ich';

COMMIT;