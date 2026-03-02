-- MedKitt: Info Pages table
-- Stores clinical info modal content (reference pages, patient handouts, step summaries).
-- JSONB used for sections and citations to match existing pattern (drugs.dosing, decision_nodes.options).

CREATE TABLE IF NOT EXISTS info_pages (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  subtitle   TEXT NOT NULL,
  sections   JSONB NOT NULL DEFAULT '[]'::jsonb,
  citations  JSONB NOT NULL DEFAULT '[]'::jsonb,
  shareable  BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: anon read-only (matches existing table policies)
ALTER TABLE info_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access"
  ON info_pages
  FOR SELECT
  TO anon
  USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_info_pages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER info_pages_updated_at
  BEFORE UPDATE ON info_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_info_pages_updated_at();
