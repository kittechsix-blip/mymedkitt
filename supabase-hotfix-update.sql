-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-05-08
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: wellens-start (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":1,"title":"Wellens Syndrome","body":"**Wellens syndrome = a pre-infarction LAD warning pattern.**\n\nPlain English: the ECG can look \"not that bad\" because the pain has improved, but the LAD is often critically narrowed and can close again.\n\n**Classic context:**\n- Recent anginal chest pain, now pain-free or improved\n- Little or no ST elevation\n- Normal or only mildly elevated troponin\n- Characteristic anterior T-wave changes in V2-V3, often extending V1-V6\n\n**Immediate mindset:**\n- Treat as high-risk NSTE-ACS\n- Do NOT send to stress test\n- Cardiology consultation for early invasive evaluation\n- Admit to monitored setting","citation":[1,2,3],"next":"wellens-presentation","images":[{"src":"images/wellens-syndrome/wellens-warning.png","alt":"12-lead ECG showing Wellens warning pattern with anterior biphasic and inverted T-wave abnormalities","caption":"Wellens warning ECG with anterior biphasic and inverted T-wave changes. Jer5150, CC BY-SA 3.0/GFDL, Wikimedia Commons."}],"summary":"Pain may be gone, troponin may be low, but anterior T-wave pattern can signal critical LAD stenosis.","safetyLevel":"critical"}'::jsonb
WHERE id = 'wellens-start' AND tree_id = 'wellens-syndrome';

-- Node: wellens-ecg-patterns (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":2,"title":"ECG Pattern","body":"**Wellens ECG patterns:**\n\n**Type A:**\n- Biphasic T waves in V2-V3\n- Usually begins with positive deflection then terminal negativity\n- Less common, can evolve into Type B\n\n**Type B:**\n- Deep, symmetric T-wave inversion in V2-V3\n- Often extends into V1-V6, I, aVL\n- More common\n\n**Supportive criteria:**\n- Isoelectric or minimally elevated ST segment, usually <1 mm\n- No pathologic precordial Q waves\n- Preserved R-wave progression\n- Pattern often appears when pain has resolved","citation":[1,2,3],"next":"wellens-criteria","images":[{"src":"images/wellens-syndrome/wellensekg.jpg","alt":"ECG with Wellens pattern anterior T-wave changes","caption":"Wellens ECG example. Gabriel Delgado, CC BY-SA 3.0/GFDL, Wikimedia Commons."},{"src":"images/wellens-syndrome/wellens-warning.png","alt":"Wellens warning ECG with anterior biphasic and inverted T waves","caption":"Wellens warning ECG. Jer5150, CC BY-SA 3.0/GFDL, Wikimedia Commons."}],"summary":"Type A = biphasic V2-V3. Type B = deep symmetric anterior T-wave inversion.","skippable":true}'::jsonb
WHERE id = 'wellens-ecg-patterns' AND tree_id = 'wellens-syndrome';

COMMIT;