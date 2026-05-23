-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-22
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: bp-radiculopathy (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":2,"title":"Radiculopathy / Mechanical Pattern","body":"Open [Low Back Pain Decision Support](#/tree/low-back-pain).\n\nOpen [L4/L5/S1 Radiculopathy Localization](#/info/bp-radic-localization) for the bedside dermatome/myotome/reflex map.\n\n**Next 5 minutes:** confirm no red flags, document motor/reflex/sensation, treat pain to enable mobility, avoid routine advanced imaging for uncomplicated acute low back pain/radiculopathy, encourage activity as tolerated.\n\n**Pitfall:** radicular pain does not equal cauda equina. Cauda requires bowel/bladder/saddle/progressive bilateral weakness screening every time.","citation":[1,2,10],"recommendation":"Mechanical/radicular pain can be outpatient only after red flags and function are reassessed.","confidence":"recommended","safetyLevel":"warning"}'::jsonb
WHERE id = 'bp-radiculopathy' AND tree_id = 'back-pain-hub';

COMMIT;