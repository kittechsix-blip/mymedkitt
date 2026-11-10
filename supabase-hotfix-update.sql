-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-10
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: hyper-anticholinergic (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"result","module":2,"title":"Anticholinergic Toxidrome","body":"**\"Hot as a hare, dry as a bone, red as a beet, mad as a hatter, blind as a bat.\"**\n\n**Defining features:** hyperthermia with DRY/flushed skin, mydriasis, urinary retention, absent bowel sounds, delirium, tachycardia. Distinguishes from sympathomimetic (which sweats) and serotonin syndrome (clonus/hyperreflexia).\n\n**First minutes:**\n- Active cooling (evaporative); the skin cannot sweat, so passive cooling fails.\n- Benzodiazepines for agitation.\n- IV fluids; monitor for rhabdo.\n- Get an ECG to screen for sodium-channel blockade (wide QRS) before considering physostigmine.\n- **Physostigmine** may be considered for pure anticholinergic delirium with a clear agent - avoid if mixed/TCA ingestion or any conduction delay on ECG (seizure/asystole risk). Discuss with toxicology/poison center.\n- **Dose:** [Physostigmine](#/drug/physostigmine/anticholinergic delirium) **0.5-1 mg IV, slow push over at least 5 minutes**; may repeat every 10-15 minutes to effect (usual total 1-2 mg). **Children:** 0.02 mg/kg IV slowly (max 0.5 mg per dose). Lasts 30-60 minutes, so delirium can return: redose or use benzodiazepines. Keep atropine at the bedside for cholinergic excess (bradycardia, bronchorrhea, seizures).","citation":[3,8],"recommendation":"Anticholinergic toxidrome: evaporative cooling (dry skin defeats passive cooling), benzodiazepines, fluids. Physostigmine only for pure cases with normal ECG - consult toxicology.","confidence":"recommended","safetyLevel":"critical"}'::jsonb
WHERE id = 'hyper-anticholinergic' AND tree_id = 'hyperthermia-hub';

COMMIT;