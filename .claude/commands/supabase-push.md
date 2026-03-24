# Push to Supabase

Push a consult's data directly to Supabase via REST API. No SQL editor, no copy-paste.

## Prerequisites
- TypeScript must be compiled first (`bunx tsc --skipLibCheck --noUnusedLocals false`)
- `SUPABASE_SERVICE_ROLE_KEY` must be in `.env`

## Usage

### New consult (full insert):
```bash
node scripts/supabase-push.mjs <consult-id>
```

### Update existing consult (nodes + citations + metadata):
```bash
node scripts/supabase-push.mjs <consult-id> --update
```

### With drugs and info pages:
```bash
node scripts/supabase-push.mjs <consult-id> --drugs insulin-regular,kcl --info-pages dka-summary
```

### Dry run (preview without pushing):
```bash
node scripts/supabase-push.mjs <consult-id> --dry-run
```

## What it does
1. Reads compiled JS from `docs/data/trees/<id>.js`
2. Reads category listing from `docs/data/categories.js`
3. Pushes to Supabase tables via REST API:
   - `decision_trees` — metadata (title, subtitle, version, module_labels)
   - `category_trees` — category mappings + cross-listings
   - `tree_citations` — citation list
   - `decision_nodes` — all nodes (batched in groups of 50)
   - `drugs` — if `--drugs` flag used
   - `info_pages` — if `--info-pages` flag used

## When to use this
- **After building a new consult** — run this instead of the old SQL paste workflow
- **After editing node content** — use `--update` to refresh Supabase
- **During `/deploy`** — this replaces step 4c (the TextEdit → Cmd+A → Cmd+C → Supabase paste)
- **From ClaudeClaw** — autonomous builds use this instead of the browser

## Important
- The consult must be registered in `TREE_REGISTRY` inside `supabase-push.mjs` (mirrors `generate-supabase-sql.mjs`)
- When adding a new consult, add it to BOTH `generate-supabase-sql.mjs` AND `supabase-push.mjs` registries
- Always compile TypeScript before pushing — the script reads from `docs/` (compiled output)
