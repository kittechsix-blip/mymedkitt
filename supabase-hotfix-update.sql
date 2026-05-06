-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-06
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: mtp-txa (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":2,"title":"Tranexamic Acid (TXA)","body":"**Critical timing: Give within 3 hours of injury/onset!** [11]\n\n**CRASH-2 Trial:** TXA given within 3h reduced death from bleeding (4.9% vs 5.7%). Given after 3h, TXA INCREASED mortality (4.4% vs 3.1%). [11]\n\n**Dosing:**\n• [Tranexamic Acid](#/drug/tranexamic-acid/mtp) 1 g IV over 10 min, then 1 g IV over 8 hours (CRASH-2 protocol)\n• **2025 alternative:** 2 g IV single bolus — increasingly favored at trauma centers and in JTS military protocols for simplicity (no infusion required); equipoise with 1+1 g regimen\n• For PPH: 1 g IV over 10 min (repeat if bleeding continues after 30 min) [8]\n\n**Mechanism:** Inhibits plasmin → prevents clot breakdown (antifibrinolytic)\n\n**Contraindications:**\n• Known hypersensitivity\n• Active thromboembolic disease (relative)\n• DIC with predominant thrombosis (relative)\n\n**Do NOT delay MTP activation to give TXA — give concurrently.**","citation":[8,11],"next":"mtp-abo-q","summary":"1g IV 10min then 1g 8hrs — MUST within 3hrs, harmful after","safetyLevel":"critical"}'::jsonb
WHERE id = 'mtp-txa' AND tree_id = 'massive-transfusion';

COMMIT;