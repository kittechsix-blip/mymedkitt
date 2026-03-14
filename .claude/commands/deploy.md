# Deploy myMedKitt

Compile TypeScript, sync caches, push to GitHub Pages, and sync Supabase.

## Steps

1. **Compile TypeScript:**
   ```bash
   bunx tsc --skipLibCheck --noUnusedLocals false
   ```
   Verify zero errors (ignore bun-types lib conflicts).

2. **Copy CSS to docs:**
   ```bash
   cp src/views/style.css docs/style.css
   ```

3. **Run cache sync automation:**
   ```bash
   node scripts/deploy-cache-sync.mjs
   ```

   What it does automatically:
   - **Detects** which tree/drug/info-page data files changed (via git diff against HEAD)
   - **Generates** `supabase-hotfix-update.sql` with UPDATE statements for changed nodes
   - **Bumps** `DATA_VERSION` in both `src/services/cache-db.ts` and `docs/services/cache-db.js` → forces IndexedDB wipe
   - **Bumps** `CACHE_NAME` version in `docs/sw.js` → triggers service worker update

   Optional flags:
   - `--dry-run` — preview changes without writing anything
   - `--skip-data-version` — don't bump DATA_VERSION (e.g., CSS-only deploys)
   - `--skip-sw` — don't bump SW cache (unusual, almost never skip this)

   **After running**, recompile to pick up the DATA_VERSION change:
   ```bash
   bunx tsc --skipLibCheck --noUnusedLocals false
   ```

4. **Generate Supabase SQL (for NEW consult deploys only):**
   **Only for NEW consults.** The cache-sync script in step 3 handles UPDATE SQL for existing consults automatically.
   **Wait until all testing and iteration is complete.** The app runs from compiled JS, not Supabase — syncing mid-iteration means re-syncing after every change.

   ```bash
   # Usage: node scripts/generate-supabase-sql.mjs <tree-id> [--drugs id1,id2,...] [--info-pages id1,id2,...]
   node scripts/generate-supabase-sql.mjs <tree-id> \
     --drugs <comma-separated new drug IDs> \
     --info-pages <comma-separated new info page IDs>
   ```

   - The script reads compiled JS from `docs/` and outputs `supabase-<tree-id>-insert.sql`
   - Include `--drugs` for any NEW drugs added in this consult (not existing drugs that were updated)
   - Include `--info-pages` for any NEW info pages added
   - The generated SQL uses `ON CONFLICT DO UPDATE` (safe to re-run)
   - **Skip this step** if the deploy is only a bug fix or update to existing consults (no new tree)

   **Then split for Supabase paste:**
   ```bash
   # Split into 3 paste-sized files in supabase/<tree-id>/
   mkdir -p supabase/<tree-id>
   # File 1: tree metadata + category mapping + citations (small)
   sed -n '1,/^-- 4\./{ /^-- 4\./!p }' supabase-<tree-id>-insert.sql > supabase/<tree-id>/01-tree-metadata.sql && echo "COMMIT;" >> supabase/<tree-id>/01-tree-metadata.sql
   # File 2: decision nodes (largest — one INSERT per node)
   echo "BEGIN;" > supabase/<tree-id>/02-nodes.sql && sed -n '/^-- 4\./,/^-- 5\./{ /^-- 5\./!p }' supabase-<tree-id>-insert.sql >> supabase/<tree-id>/02-nodes.sql && echo "COMMIT;" >> supabase/<tree-id>/02-nodes.sql
   # File 3: drugs + info pages
   echo "BEGIN;" > supabase/<tree-id>/03-drugs-infopages.sql && sed -n '/^-- 5\./,$ p' supabase-<tree-id>-insert.sql >> supabase/<tree-id>/03-drugs-infopages.sql
   ```

5. **Verify docs/sw.js has content:**
   ```bash
   wc -l docs/sw.js
   ```
   If it's 0 lines, restore from git: `git show HEAD:docs/sw.js > docs/sw.js` and re-run step 3.

6. **Verify ALL compiled files are staged:**
   Run `git status docs/` and check for ANY unstaged changes. Every modified file in `docs/` MUST be committed.

7. **Stage, commit, and push:**
   Stage all changed files in BOTH `src/` and `docs/`, commit with a descriptive message, and push to `main`.

8. **Verify deployment:**
   Run `gh api repos/kittechsix-blip/mymedkitt/pages/builds --jq '.[0] | {status, created_at}'` to confirm GitHub Pages built successfully. Wait for `status: "built"`.

9. **Sync Supabase — hotfix UPDATEs (EVERY deploy that modifies tree data):**
   **CRITICAL:** The app loads trees from Supabase → IndexedDB → hardcoded (in that order). If you change ANY field on an existing node, the hardcoded fix is INVISIBLE to users until Supabase is also updated.

   The cache-sync script (step 3) auto-generated `supabase-hotfix-update.sql` with all the UPDATE statements. Walk the user through pasting it:

   **IMPORTANT:** Use `open -a TextEdit supabase-hotfix-update.sql` to open, then Cmd+A → Cmd+C to copy. Never paste SQL from the terminal — long lines wrap and break JSON.

   1. Open the SQL file in TextEdit
   2. User: Cmd+A, Cmd+C, Supabase → New Query, Cmd+V, Run
   3. If "destructive operation" warning appears (DELETE on citations): click "Run this query" — it's safe
   4. Verify with a SELECT query for the affected tree

   **Remind the user to clear local cache** — visit `clear.html` to wipe IndexedDB so the app re-fetches fresh data from Supabase.

   - **Skip this step** ONLY if the deploy touches no tree/node data (e.g., CSS-only, calculator-only changes)
   - **Skip this step** if no `supabase-hotfix-update.sql` was generated (script will tell you)

10. **Sync Supabase — full INSERT (FINAL deploy of NEW consult only):**
    Only after all testing is complete and the consult is finalized. The app doesn't need Supabase to function — this is for data completeness and future native app migration. Sync one file at a time.
    **IMPORTANT:** Use `open -a TextEdit <file>` to open each SQL file, then Cmd+A → Cmd+C to copy. Never paste SQL from the terminal — long lines wrap and break JSON.

    Walk the user through these exact steps, one at a time:

    **Paste 1:** Open `supabase/<tree-id>/01-tree-metadata.sql` in TextEdit.
    User: Cmd+A, Cmd+C, Supabase → New Query, Cmd+V, Run.
    Creates: tree record, category mapping, citations.
    If "destructive operation" warning appears (DELETE on citations): click "Run this query" — it's safe.

    **Paste 2:** Open `supabase/<tree-id>/02-nodes.sql` in TextEdit.
    User: Cmd+A, Cmd+C, Supabase → New Query, Cmd+V, Run.
    Creates: all decision nodes. Will warn about DELETE — click "Run this query".

    **Paste 3:** Open `supabase/<tree-id>/03-drugs-infopages.sql` in TextEdit.
    User: Cmd+A, Cmd+C, Supabase → New Query, Cmd+V, Run.
    Creates: new drugs and info pages.

    **Verify:** Copy this to clipboard via pbcopy and have user paste in New Query:
    ```sql
    SELECT 'decision_nodes' as tbl, COUNT(*) as cnt FROM decision_nodes WHERE tree_id = '<tree-id>'
    UNION ALL SELECT 'tree_citations', COUNT(*) FROM tree_citations WHERE tree_id = '<tree-id>'
    UNION ALL SELECT 'drugs', COUNT(*) FROM drugs WHERE id IN (<drug-ids>)
    UNION ALL SELECT 'info_pages', COUNT(*) FROM info_pages WHERE id LIKE '<tree-id>%';
    ```

    - **Skip this step** if no new SQL was generated in step 4

## Important Notes

- NEVER push without checking `git status docs/` first — forgotten compiled files are silent production bugs
- ALWAYS run `deploy-cache-sync.mjs` — it automates SW bump, DATA_VERSION bump, and Supabase UPDATE SQL
- ALWAYS check if Supabase needs updating when tree/node data changes — stale Supabase data overrides hardcoded fixes (three-tier fallback: Supabase → IndexedDB → hardcoded)
- The SW uses network-first for JS/HTML/CSS + auto-reload via `client.navigate()` on upgrade
- If a user reports stale content, send them to: `https://kittechsix-blip.github.io/mymedkitt/clear.html`
- This is the **project-level** deploy skill — it takes priority over the global `/deploy` skill
- myMedKitt and MedKitt share the same Supabase instance — SQL updates affect both apps
