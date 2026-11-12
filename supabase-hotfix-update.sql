-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-12
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: lad-peds-kawasaki (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":2,"title":"Kawasaki Disease Suspected — Urgent","body":"⚠️ Full workup in the [Kawasaki Disease consult](#/tree/kawasaki) (incomplete Kawasaki algorithm, steroids, infliximab). **Untreated Kawasaki risks coronary artery aneurysms.**\n\n- **Criteria:** ≥5 days of fever PLUS ≥4 of — bilateral non-exudative conjunctivitis, oral mucosal changes (strawberry tongue, cracked lips), polymorphous rash, extremity changes (edema/erythema, later periungual peeling), cervical lymphadenopathy ≥1.5 cm. Consider **incomplete Kawasaki** in prolonged unexplained fever with fewer features.\n- **Workup:** CBC, CRP/ESR, LFTs, albumin, urinalysis (sterile pyuria); **urgent echocardiogram**.\n- **Treatment (with pediatrics/cardiology):** **IVIG 2 g/kg** + aspirin; treat within 10 days of fever onset to reduce aneurysm risk. **Admit.**","citation":[7],"recommendation":"Apply Kawasaki criteria (incl. incomplete); labs + urgent echo; IVIG 2 g/kg + aspirin within 10 days; admit + peds/cardiology.","confidence":"recommended","safetyLevel":"warning"}'::jsonb
WHERE id = 'lad-peds-kawasaki' AND tree_id = 'lymphadenopathy-hub';

COMMIT;