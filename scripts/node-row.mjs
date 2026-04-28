// scripts/node-row.mjs
// Single source of truth for the decision_nodes row shape.
//
// Background: every Supabase write path (supabase-push.mjs, seed-trees.ts,
// generate-supabase-sql.mjs) used to maintain its own inline mapper from
// DecisionNode → DB row. On 2026-04-28 we shipped six new columns
// (summary, skippable, safety_level, when_to_use, pearls, evidence) and
// the seed script was missed, which would have re-introduced the bug on
// the next reset. This helper exists so adding a column lands in one place.
//
// To add a column:
//   1. Write a migration under supabase/migrations/
//   2. Add the field below in nodeRowFromDecisionNode + NODE_COLUMNS
//   3. Mirror it in src/services/tree-service.ts (NodeRow + mapNodeRow)
//   4. Mirror it in scripts/generate-supabase-sql.mjs's INSERT VALUES
//      (raw-SQL emission, not refactored — see NODE_COLUMNS comment there)

/**
 * Map a compiled DecisionNode to a Supabase decision_nodes row (snake_case).
 *
 * @param {object} node - DecisionNode from compiled JS
 * @param {string} treeId - Owning tree id
 * @param {number} sortOrder - Position in the source array (0-based)
 * @returns {object} Row ready for PostgREST POST/PATCH
 */
export function nodeRowFromDecisionNode(node, treeId, sortOrder) {
  return {
    id: node.id,
    tree_id: treeId,
    type: node.type,
    module: node.module !== undefined ? node.module : null,
    title: node.title || null,
    body: node.body || null,
    citation: node.citation || null,
    options: node.options || null,
    inputs: node.inputs || null,
    next: node.next || null,
    recommendation: node.recommendation || null,
    treatment: node.treatment || null,
    confidence: node.confidence || null,
    images: node.images || null,
    calculator_links: node.calculatorLinks || null,
    sort_order: sortOrder,
    summary: node.summary || null,
    skippable: node.skippable !== undefined ? node.skippable : null,
    safety_level: node.safetyLevel || null,
    when_to_use: node.whenToUse || null,
    pearls: node.pearls || null,
    evidence: node.evidence || null,
  };
}

/**
 * Column list in the same order generate-supabase-sql.mjs emits its INSERT
 * statement. The SQL generator imports this so its column-name list can't
 * drift; the VALUES clause stays hand-built because each column has its own
 * SQL literal type (jsonb / text / int / bool).
 */
export const NODE_COLUMNS = [
  'id', 'tree_id', 'type', 'module', 'title', 'body',
  'citation', 'options', 'inputs', 'next', 'recommendation',
  'treatment', 'confidence', 'images', 'calculator_links', 'sort_order',
  'summary', 'skippable', 'safety_level', 'when_to_use', 'pearls', 'evidence',
];
