-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-20
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: cpr-asb-preg (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":3,"title":"Pregnant ASB — Must Treat","body":"**Treat ALL asymptomatic bacteriuria in pregnancy** (untreated → 25% pyelo, low birth weight, preterm). [16]\n\n**Regimen (any of):** [16]\n• Nitrofurantoin 100 mg PO BID x 5-7d (acceptable 1st/2nd trimester; avoid at term ≥38wk — neonatal hemolysis)\n• Cephalexin 500 mg PO QID x 7d (safe all trimesters)\n• Fosfomycin 3g PO x 1 (safe all trimesters)\n• Amoxicillin/Augmentin if susceptible\n\n**Avoid:** TMP-SMX 1st/3rd trimester, fluoroquinolones, tetracyclines.\n\n**Test of cure 1-2 weeks post-treatment is recommended.**","citation":[16],"recommendation":"Treat per local susceptibilities (cephalexin or fosfomycin safest all trimesters). Test of cure at 1-2 weeks.","confidence":"definitive"}'::jsonb
WHERE id = 'cpr-asb-preg' AND tree_id = 'culture-positive-results-ed';

COMMIT;