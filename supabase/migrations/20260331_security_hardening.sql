-- MedKitt: Security Hardening Migration
-- Ensures RLS is enabled on ALL tables with anon read-only policies.
-- Run via: psql or Supabase SQL Editor
-- Date: 2026-03-31

-- =====================================================================
-- 1. ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- =====================================================================
-- Even if a table already has RLS, these are idempotent (safe to re-run).

-- Core clinical tables
ALTER TABLE IF EXISTS decision_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS decision_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS tree_citations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS drugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS category_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS info_pages ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- 2. READ-ONLY POLICIES FOR ANON ROLE
-- =====================================================================
-- Pattern: anon can SELECT only. No INSERT/UPDATE/DELETE.
-- DROP IF EXISTS prevents errors on re-run.

-- decision_trees
DROP POLICY IF EXISTS "anon_read_decision_trees" ON decision_trees;
CREATE POLICY "anon_read_decision_trees"
  ON decision_trees
  FOR SELECT
  TO anon
  USING (true);

-- decision_nodes
DROP POLICY IF EXISTS "anon_read_decision_nodes" ON decision_nodes;
CREATE POLICY "anon_read_decision_nodes"
  ON decision_nodes
  FOR SELECT
  TO anon
  USING (true);

-- tree_citations
DROP POLICY IF EXISTS "anon_read_tree_citations" ON tree_citations;
CREATE POLICY "anon_read_tree_citations"
  ON tree_citations
  FOR SELECT
  TO anon
  USING (true);

-- drugs
DROP POLICY IF EXISTS "anon_read_drugs" ON drugs;
CREATE POLICY "anon_read_drugs"
  ON drugs
  FOR SELECT
  TO anon
  USING (true);

-- categories
DROP POLICY IF EXISTS "anon_read_categories" ON categories;
CREATE POLICY "anon_read_categories"
  ON categories
  FOR SELECT
  TO anon
  USING (true);

-- category_trees
DROP POLICY IF EXISTS "anon_read_category_trees" ON category_trees;
CREATE POLICY "anon_read_category_trees"
  ON category_trees
  FOR SELECT
  TO anon
  USING (true);

-- info_pages (may already exist — safe to recreate)
DROP POLICY IF EXISTS "Allow anonymous read access" ON info_pages;
DROP POLICY IF EXISTS "anon_read_info_pages" ON info_pages;
CREATE POLICY "anon_read_info_pages"
  ON info_pages
  FOR SELECT
  TO anon
  USING (true);

-- =====================================================================
-- 3. EXPLICITLY DENY WRITE ACCESS FOR ANON
-- =====================================================================
-- RLS default-deny already blocks writes when no INSERT/UPDATE/DELETE
-- policies exist, but we add explicit denials for defense-in-depth.

-- Block anon inserts on all tables
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'decision_trees', 'decision_nodes', 'tree_citations',
    'drugs', 'categories', 'category_trees', 'info_pages'
  ])
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS "deny_anon_insert_%s" ON %I', tbl, tbl);
    EXECUTE format(
      'CREATE POLICY "deny_anon_insert_%s" ON %I FOR INSERT TO anon WITH CHECK (false)',
      tbl, tbl
    );
    EXECUTE format('DROP POLICY IF EXISTS "deny_anon_update_%s" ON %I', tbl, tbl);
    EXECUTE format(
      'CREATE POLICY "deny_anon_update_%s" ON %I FOR UPDATE TO anon USING (false) WITH CHECK (false)',
      tbl, tbl
    );
    EXECUTE format('DROP POLICY IF EXISTS "deny_anon_delete_%s" ON %I', tbl, tbl);
    EXECUTE format(
      'CREATE POLICY "deny_anon_delete_%s" ON %I FOR DELETE TO anon USING (false)',
      tbl, tbl
    );
  END LOOP;
END $$;

-- =====================================================================
-- 4. REVOKE DIRECT TABLE PERMISSIONS FROM ANON
-- =====================================================================
-- Belt-and-suspenders: even with RLS, limit what anon can attempt.

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'decision_trees', 'decision_nodes', 'tree_citations',
    'drugs', 'categories', 'category_trees', 'info_pages'
  ])
  LOOP
    EXECUTE format('REVOKE INSERT, UPDATE, DELETE ON %I FROM anon', tbl);
  END LOOP;
END $$;

-- =====================================================================
-- 5. AUDIT: Verify RLS is enabled on all tables
-- =====================================================================
-- Run this query manually to confirm. Should return 7 rows, all true.
-- SELECT schemaname, tablename, rowsecurity
-- FROM pg_tables
-- WHERE schemaname = 'public'
-- AND tablename IN (
--   'decision_trees', 'decision_nodes', 'tree_citations',
--   'drugs', 'categories', 'category_trees', 'info_pages'
-- );
