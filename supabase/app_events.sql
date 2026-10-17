-- =====================================================================
-- Data Dog — shared anonymous usage-event sink (2026-10-16)
-- =====================================================================
-- One insert-only table for Dell Seton Ops, myVertigoApp and myMedKitt.
-- Browsers write with the public anon key; they can NOT read, update or
-- delete. The Kittech Daily News press (Andy's Mac) reads with the
-- service_role key and deletes rows older than 180 days.
--
-- Privacy floor (enforced here as well as in each app's client):
--   no free text, no search text, no names, no PHI, no IPs. Only short
--   lowercase ids and small enums. Spaces and capital letters are rejected
--   by the CHECKs below, so a sentence cannot be stored even by mistake.
--
-- Apply: paste this whole file into the Supabase SQL editor for project
-- kzzqloklnxlqbccxbxgr and run it once. Safe to re-run.
-- Decision: claude-brain/decisions/2026-10-16-data-dog-telemetry.md
-- =====================================================================

-- props: a flat object of at most 6 keys; every value a short id-like
-- string, a small number or a boolean.
CREATE OR REPLACE FUNCTION public.app_events_props_ok(p jsonb)
RETURNS boolean
LANGUAGE sql IMMUTABLE STRICT
SET search_path = ''
AS $$
  SELECT jsonb_typeof(p) = 'object'
     AND octet_length(p::text) <= 400
     AND (SELECT count(*) FROM jsonb_object_keys(p)) <= 6
     AND coalesce((
       SELECT bool_and(
         k ~ '^[a-z][a-z0-9_]{0,23}$' AND (
           (jsonb_typeof(v) = 'string' AND (v #>> '{}') ~ '^[a-z0-9][a-z0-9_.:/-]{0,47}$')
           OR (jsonb_typeof(v) = 'number' AND (v #>> '{}')::numeric BETWEEN -1 AND 100000000)
           OR jsonb_typeof(v) = 'boolean'
         ))
       FROM jsonb_each(p) AS e(k, v)
     ), true)
$$;

CREATE TABLE IF NOT EXISTS public.app_events (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now(),
  ts          timestamptz NOT NULL,
  app         text        NOT NULL CHECK (app IN ('dell-seton', 'vertigo', 'mymedkitt')),
  event       text        NOT NULL CHECK (event IN (
                'session_start', 'screen_view', 'feature_open', 'feature_complete',
                'search', 'search_select', 'outcome', 'error', 'not_found',
                'slow_render', 'offline')),
  screen_id   text        CHECK (screen_id  ~ '^[a-z0-9][a-z0-9_.:/-]{0,79}$'),
  feature_id  text        CHECK (feature_id ~ '^[a-z0-9][a-z0-9_.:/-]{0,79}$'),
  install_id  text        NOT NULL CHECK (install_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'),
  session_id  text        NOT NULL CHECK (session_id ~ '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'),
  app_version text        CHECK (app_version ~ '^[a-z0-9][a-z0-9_.+-]{0,23}$'),
  platform    text        NOT NULL CHECK (platform IN ('web', 'ios')),
  props       jsonb       NOT NULL DEFAULT '{}'::jsonb CHECK (public.app_events_props_ok(props))
);

CREATE INDEX IF NOT EXISTS app_events_app_ts_idx ON public.app_events (app, ts);
CREATE INDEX IF NOT EXISTS app_events_created_idx ON public.app_events (created_at);

ALTER TABLE public.app_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_events FORCE ROW LEVEL SECURITY;

-- anon: INSERT only, and only rows stamped within the last 2 days.
DROP POLICY IF EXISTS app_events_anon_insert ON public.app_events;
CREATE POLICY app_events_anon_insert ON public.app_events
  FOR INSERT TO anon
  WITH CHECK (ts > now() - interval '2 days' AND ts < now() + interval '10 minutes');

-- No SELECT / UPDATE / DELETE policy for anon or authenticated: RLS denies them.
REVOKE ALL ON TABLE public.app_events FROM anon, authenticated;
GRANT INSERT (ts, app, event, screen_id, feature_id, install_id, session_id, app_version, platform, props)
  ON TABLE public.app_events TO anon;

-- service_role (the Mac-side reader) bypasses RLS: read + retention delete.
GRANT SELECT, DELETE ON TABLE public.app_events TO service_role;

REVOKE ALL ON FUNCTION public.app_events_props_ok(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.app_events_props_ok(jsonb) TO anon, service_role;
