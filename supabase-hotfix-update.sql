-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-12
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: thorac-start (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"Resuscitative Thoracotomy: 2-Minute Review","body":"Use this as a rapid procedural reminder for selected traumatic arrest.\n\nOpen first:\n- [2-Minute Steps](#/info/thorac-steps)\n- [Indications](#/info/thorac-indications)\n- [Incision Landmarks](#/info/thorac-incision)\n\nCore sequence:\n1. Left anterolateral thoracotomy\n2. Enter pleura and spread ribs\n3. Open pericardium anterior to phrenic nerve\n4. Relieve tamponade/control cardiac wound\n5. Open cardiac massage\n6. Cross-clamp descending thoracic aorta when indicated\n7. Move to OR for definitive repair","citation":[1,2,3],"next":"thorac-indications-check","images":[{"src":"images/thoracotomy/anterolateral-thoracotomy-incision.jpg","alt":"Left anterolateral thoracotomy incision landmark on the anterior chest","caption":"Left anterolateral thoracotomy landmark: 4th/5th intercostal space toward the axilla."}],"summary":"Rapid review: incision, pericardium, hemorrhage control, massage, aortic clamp, OR.","safetyLevel":"critical"}'::jsonb
WHERE id = 'thorac-start' AND tree_id = 'thoracotomy-procedure';

-- Node: thorac-position (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":2,"title":"Position / Prep","body":"Position:\n- Supine\n- Left arm abducted if feasible; do not delay if not feasible\n- Prep wide: neck to groin, bilateral chest, upper abdomen\n\nLandmark:\n- Left 4th or 5th intercostal space, usually inframammary fold/nipple line region\n- Incision from sternum toward posterior axillary line\n- Enter over the superior rib edge\n\nHave the team ready to extend to clamshell if exposure is inadequate or right-sided injury is suspected.","citation":[3,4],"next":"thorac-incision","images":[{"src":"images/thoracotomy/anterolateral-thoracotomy-incision.jpg","alt":"Left anterolateral thoracotomy incision landmark on the anterior chest","caption":"Left anterolateral thoracotomy landmark: 4th/5th intercostal space toward the axilla."}],"summary":"Supine, wide prep, left 4th/5th interspace, incision sternum to posterior axillary line."}'::jsonb
WHERE id = 'thorac-position' AND tree_id = 'thoracotomy-procedure';

-- Node: thorac-incision (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Incision / Enter Chest","body":"Steps:\n1. Make a large left anterolateral incision in the 4th/5th intercostal space.\n2. Cut skin/subcutaneous tissue/muscle decisively; inadequate incision slows exposure.\n3. Enter pleura over the superior rib edge.\n4. Sweep finger to clear adhesions and confirm intrathoracic entry.\n5. Insert rib spreader if available and open gradually.\n6. Evacuate hemothorax and pack/suction as needed.\n\nIf exposure is poor or right chest/mediastinal access is needed, extend across sternum into clamshell.","citation":[3,4],"next":"thorac-pericardium","images":[{"src":"images/thoracotomy/anterolateral-thoracotomy-incision.jpg","alt":"Left anterolateral thoracotomy incision landmark on the anterior chest","caption":"Make a large left anterolateral incision; extend to clamshell if exposure is inadequate."}],"summary":"Large left anterolateral incision, enter pleura, spread ribs, evacuate hemothorax.","safetyLevel":"critical"}'::jsonb
WHERE id = 'thorac-incision' AND tree_id = 'thoracotomy-procedure';

-- Node: thorac-pericardium (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":3,"title":"Open Pericardium","body":"Open the pericardium when tamponade or cardiac injury is possible.\n\nSteps:\n1. Identify phrenic nerve running along the lateral pericardium.\n2. Grasp/tent pericardium anterior to the phrenic nerve.\n3. Make a small opening with scissors or scalpel.\n4. Extend longitudinally from apex toward aortic root, staying anterior to phrenic nerve.\n5. Evacuate clot and deliver heart only as needed for inspection/control.\n\nAvoid injuring the phrenic nerve or myocardium.","citation":[3,4],"next":"thorac-cardiac-control","images":[{"src":"images/thoracotomy/pericardium-phrenic-nerve-photo.jpg","alt":"Pericardium opened parallel to the left phrenic nerve","caption":"Open the pericardium parallel/anterior to the left phrenic nerve."}],"summary":"Open pericardium anterior to phrenic nerve; evacuate tamponade and inspect heart.","safetyLevel":"critical"}'::jsonb
WHERE id = 'thorac-pericardium' AND tree_id = 'thoracotomy-procedure';

COMMIT;