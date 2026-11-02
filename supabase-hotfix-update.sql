-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-02
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: sjs-ten-classify (2 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":2,"title":"Classify the Eruption","body":"Classification rests on **maximal % BSA epidermal detachment** plus lesion morphology. **Erythema multiforme is a distinct entity, NOT mild SJS** — it is infection-driven (HSV, Mycoplasma), with *typical* acral target lesions and is Nikolsky-negative.\n\n**TEN** = detachment >30% BSA with spots, or >10% BSA as large red sheets with no spots. Count detached + Nikolsky-positive skin, not redness. [TEN criteria](#/info/sjs-ten-em-compare).\n\nWhich picture fits?","citation":[1,7],"options":[{"label":"Acral typical targets, HSV/infection trigger, Nikolsky-neg","next":"sjs-ten-em"},{"label":"Truncal dusky macules, <10% BSA detachment","next":"sjs-ten-culprit"},{"label":"Detachment 10–30% BSA (SJS/TEN overlap)","next":"sjs-ten-culprit","urgency":"critical"},{"label":"Detachment >30% BSA (TEN)","next":"sjs-ten-culprit","urgency":"critical"},{"label":"Child/young adult, prominent mucositis, minimal skin","next":"sjs-ten-mirm"}],"calculatorLinks":[{"id":"sjs-ten-classifier","label":"SJS / TEN Classifier"}],"summary":"<10% = SJS · 10–30% = overlap · >30% = TEN · EM is a separate disease"}'::jsonb
WHERE id = 'sjs-ten-classify' AND tree_id = 'sjs-ten';

COMMIT;