# MedKitt Tree Builder

You are building a new clinical consult decision tree for myMedKitt. Follow these instructions exactly.

## Project Location

`~/Desktop/myMedKitt/` (repo: `kittechsix-blip/mymedkitt`)

## Content Quality Rules (CRITICAL — enforce on every consult)

### No Repetition

**This is the single most important content rule.** Every piece of information must appear EXACTLY ONCE in the consult. Repetition is unprofessional and violates the minimalist design philosophy.

**Before writing any node, check:**
1. Has this fact/sentence already been stated in a previous node?
2. Is this information already in an info page that's linked from this tree?
3. Does the option description repeat what the node body already says?
4. Does a later node in the pathway repeat what an earlier node covered?

**Common repetition patterns to AVOID:**
- **Stating the same fact in a node AND an info page** — put details in the info page, reference it with a link. The node should have only the decision-critical summary.
- **Listing criteria in a node body AND repeating them as option descriptions** — option descriptions should ADD context, not echo the body.
- **Repeating drug dosing/warnings across multiple nodes** — put it in the drug entry or meds-table info page. Nodes should link to `[Drug](#/drug/id/hint)`, not duplicate dosing text.
- **Restating the same clinical principle** (e.g., "delirium is a symptom not a diagnosis") across multiple nodes — state it once in the start node, never again.
- **Copying Beers criteria, medication lists, or diagnostic workup items** into multiple nodes — put the canonical list in ONE location (info page or single node), link from elsewhere.
- **ExDS criteria appearing in both the recognition node AND the management node AND the info page** — recognition criteria go in the info page only. The node links to it.

**The rule of thumb:** If information exists in an info page, the node body should contain ONLY a link to that page plus the minimum context needed for the current decision. If information exists in a drug entry, the node should link to the drug, not restate dosing.

### Minimalist Content Philosophy

- **Nodes are for decisions, not education.** Keep body text to what's needed to make the current decision.
- **Info pages are for reference depth.** Move detailed lists, comparison tables, and background to info pages.
- **Drug entries hold dosing details.** Nodes link to drugs; they don't duplicate regimens.
- **Each node should be scannable in <10 seconds** by an experienced physician.
- **Bold only the most critical points** — if everything is bold, nothing is.

### Self-Audit Checklist (run BEFORE finalizing the tree)

After writing all nodes, perform this deduplication audit:
1. Read every node body sequentially — flag any sentence that appears in >1 node
2. Compare each node body against every info page it links to — remove duplicated content from the node
3. Check that drug dosing details live in drug entries, not node bodies
4. Verify option descriptions add value beyond what the body already says
5. Confirm no clinical principle is stated more than once across the entire tree

## File Structure

### Tree File: `src/data/trees/{tree-id}.ts`

```typescript
import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const {PREFIX}_NODES: DecisionNode[] = [
  // nodes here
];

export const {PREFIX}_MODULE_LABELS = [
  'Module 1 Name',
  'Module 2 Name',
  // ...
];

export const {PREFIX}_CITATIONS: Citation[] = [
  { num: 1, text: 'Full bibliographic citation...' },
  // ...
];

export const {PREFIX}_NODE_COUNT = {PREFIX}_NODES.length;
```

### DecisionNode Interface

```typescript
interface DecisionNode {
  id: string;                  // kebab-case: '{tree-id}-{purpose}'
  type: 'question' | 'info' | 'result';
  module: number;              // 1-based module number
  title: string;
  body: string;                // supports \n, **bold**, links (see below)
  citation?: number[];         // references to tree citations array
  options?: NodeOption[];      // for question nodes
  next?: string;               // default next node (info nodes)
  recommendation?: string;     // for result nodes
  confidence?: 'definitive' | 'recommended' | 'consider';
  images?: { src: string; alt: string; caption?: string }[];
  calculatorLinks?: { id: string; label: string }[];
}
```

### Body Text Syntax

- `[Text](#/info/page-id)` — open info page overlay
- `[Text](#/node/node-id)` — jump to node (used in Steps Summary)
- `[Text](#/tree/tree-id)` — cross-consult navigation
- `[Drug](#/drug/drug-id/indication-hint)` — open drug modal at matching dosing card
- `[Text](https://url)` — external link
- `**bold text**` — bold
- `\n\n` — paragraph break, `\n` — line break
- `[N]` — clickable citation reference (in info pages)

## Mandatory Requirements

### 1. Steps Summary (emergent/resuscitation consults)
Every consult involving emergent procedures, resuscitation, or time-critical protocols MUST have a Steps Summary info page linked as the first line of the start node body.

### 2. Indication-Aware Drug Links
Every `[Drug](#/drug/id)` link MUST include `/indication-hint`. Every referenced drug MUST have a matching dosing entry in `drug-store.ts` with `weightCalc` for mg/kg doses.

### 3. Citations
Every clinical claim must be backed by `citation: [N]` pointing to real bibliographic references. Never invent citations.

### 4. Info Pages for Reference Depth
Move detailed lists, comparison tables, diagnostic criteria, and background material to info pages. Nodes should link to them, not duplicate their content.

## Registration Steps (after creating the tree file)

1. **`src/data/trees/index.ts`** — add export line
2. **`src/data/categories.ts`** — add to category's `decisionTrees` array (+ cross-listing if needed)
3. **`src/services/tree-service.ts`** — add to `TREE_IMPORTS` map
4. **`scripts/generate-supabase-sql.mjs`** — add to `TREE_REGISTRY` and `CROSS_LISTINGS`
5. **`src/data/drug-store.ts`** — add new drugs, update existing drugs with new dosing
6. **`src/data/info-pages.ts`** — add info pages, register in `INFO_PAGES` map
7. **`src/components/calculator.ts`** — add new calculators to `CALCULATORS` map

## Deploy After Building

Always run `/deploy` after completing the tree build. Never ask user to test without deploying first.

## User Prompt

$ARGUMENTS
