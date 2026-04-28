-- =====================================================================
-- MedKitt — Add safety/progressive-disclosure columns to decision_nodes
-- =====================================================================
-- DecisionNode in src/models/types.ts has six fields that previously had no
-- column and were silently dropped on every Supabase round-trip:
--   summary, skippable, safety_level, when_to_use, pearls, evidence
-- Result: trees served from Supabase lost safety banners, "Need-to-Know"
-- skipping, and progressive-disclosure sections — visible only in the
-- hardcoded fallback path. This migration restores parity.
-- =====================================================================

ALTER TABLE decision_nodes
  ADD COLUMN IF NOT EXISTS summary       text,
  ADD COLUMN IF NOT EXISTS skippable     boolean,
  ADD COLUMN IF NOT EXISTS safety_level  text,
  ADD COLUMN IF NOT EXISTS when_to_use   text,
  ADD COLUMN IF NOT EXISTS pearls        text,
  ADD COLUMN IF NOT EXISTS evidence      text;

-- safety_level matches the TS union; reject other strings.
ALTER TABLE decision_nodes
  DROP CONSTRAINT IF EXISTS decision_nodes_safety_level_check;
ALTER TABLE decision_nodes
  ADD CONSTRAINT decision_nodes_safety_level_check
  CHECK (safety_level IS NULL OR safety_level IN ('critical', 'warning'));

-- After this migration runs, re-push every tree with:
--   for f in src/data/trees/*.ts; do id=$(basename "$f" .ts); \
--     node scripts/supabase-push.mjs "$id" --update; done
-- so existing rows carry the six new fields.
