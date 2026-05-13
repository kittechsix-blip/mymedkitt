-- =====================================================================
-- MedKitt — Explicit Data API grants
-- =====================================================================
-- Supabase is changing public-schema Data API defaults:
--   - 2026-05-30: new projects/tables require explicit GRANTs
--   - 2026-10-30: enforced for existing projects
--
-- MedKitt intentionally exposes these public clinical content tables as
-- read-only through the browser anon key, while deploy/seed scripts write
-- through the service_role key. RLS policies still enforce row-level rules;
-- these GRANTs give PostgREST the table privileges it now requires.
-- =====================================================================

GRANT USAGE ON SCHEMA public TO anon, service_role;

GRANT SELECT ON TABLE
  public.decision_trees,
  public.decision_nodes,
  public.tree_citations,
  public.drugs,
  public.categories,
  public.category_trees,
  public.info_pages
TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.decision_trees,
  public.decision_nodes,
  public.tree_citations,
  public.drugs,
  public.categories,
  public.category_trees,
  public.info_pages
TO service_role;

-- Preserve the existing security posture: public browser clients can read
-- clinical content, but cannot write it. Service-role deploy scripts retain
-- controlled write access.
REVOKE INSERT, UPDATE, DELETE ON TABLE
  public.decision_trees,
  public.decision_nodes,
  public.tree_citations,
  public.drugs,
  public.categories,
  public.category_trees,
  public.info_pages
FROM anon;
