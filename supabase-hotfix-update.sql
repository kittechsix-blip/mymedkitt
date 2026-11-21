-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-21
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: hearing-loss-forks (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":2,"title":"Weber and Rinne: Support the Classification","body":"Use a gently activated 512-Hz tuning fork in a quiet environment. Weber: place the base on the forehead midline and ask whether sound is central or louder in either ear. Rinne: compare mastoid bone conduction with air conduction beside the canal, then repeat on the other ear. [3,4]\n\nAir greater than bone (positive Rinne) occurs with normal hearing OR sensorineural loss. Midline Weber does not establish normal hearing. Audiometry confirms the type and degree. [3]\n\n[Open the visual Fork Lab](#/calculator/hearing-fork)","citation":[3,4],"next":"hearing-loss-classification","images":[{"src":"images/sudden-hearing-loss/weber-realistic.png","alt":"Weber technique and lateralization toward a conductive-loss ear or away from a sensorineural-loss ear","caption":"Original AI-generated myMedKitt clinical illustration. Interpret with Rinne, otoscopy and audiometry."},{"src":"images/sudden-hearing-loss/rinne-realistic.png","alt":"Rinne sequence comparing mastoid bone conduction with air conduction beside the ear canal","caption":"Original AI-generated myMedKitt clinical illustration. Positive Rinne does not mean hearing is normal."}],"calculatorLinks":[{"id":"hearing-fork","label":"Fork Lab"}],"summary":"Fork findings support classification but cannot exclude sudden sensorineural hearing loss."}'::jsonb
WHERE id = 'hearing-loss-forks' AND tree_id = 'sudden-hearing-loss';

COMMIT;