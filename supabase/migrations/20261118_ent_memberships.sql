-- Move existing ENT consults; retain unrelated and clinician-created memberships.
BEGIN;
INSERT INTO category_trees (category_id, tree_id, sort_order)
SELECT 'ent', id, 0 FROM decision_trees
WHERE id IN ('adult-pharyngitis', 'deep-neck-infection', 'ear-fb', 'ear-infection', 'epistaxis', 'laryngeal-trauma', 'post-tonsillectomy-bleed', 'pta-drainage', 'trach-emergency', 'tracheo-innominate-fistula')
ON CONFLICT (category_id, tree_id) DO NOTHING;

INSERT INTO category_trees (category_id, tree_id, entry_node_id, sort_order)
SELECT 'ent', id, 'st-start', 1 FROM decision_trees WHERE id = 'sore-throat-hub'
ON CONFLICT (category_id, tree_id) DO UPDATE SET entry_node_id = EXCLUDED.entry_node_id;

DELETE FROM category_trees WHERE (tree_id, category_id) IN (VALUES
  ('adult-pharyngitis', 'infectious-disease'),
  ('deep-neck-infection', 'infectious-disease'),
  ('ear-fb', 'procedures'),
  ('ear-infection', 'emergency-medicine'),
  ('epistaxis', 'emergency-medicine'),
  ('epistaxis', 'procedures'),
  ('laryngeal-trauma', 'trauma-surg'),
  ('post-tonsillectomy-bleed', 'pediatrics'),
  ('pta-drainage', 'procedures'),
  ('trach-emergency', 'anesthesia-airway'),
  ('trach-emergency', 'emergency-medicine'),
  ('tracheo-innominate-fistula', 'emergency-medicine'));
UPDATE decision_trees AS t
SET node_count = counts.total
FROM (
  SELECT tree_id, COUNT(*) AS total FROM decision_nodes
  WHERE tree_id IN ('adult-pharyngitis', 'deep-neck-infection', 'ear-fb', 'ear-infection', 'epistaxis', 'laryngeal-trauma', 'post-tonsillectomy-bleed', 'pta-drainage', 'trach-emergency', 'tracheo-innominate-fistula')
  GROUP BY tree_id
) AS counts
WHERE t.id = counts.tree_id AND t.node_count <> counts.total;

COMMIT;
