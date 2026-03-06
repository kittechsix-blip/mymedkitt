# Deploy MedKitt

Compile TypeScript, validate exports, verify all compiled files are staged, bump the service worker cache, and push to GitHub Pages.

## Steps

1. **Compile TypeScript:**
   Run `bunx tsc` from the project root. Verify zero errors.

2. **Validate compiled exports match app imports (CRITICAL):**
   Run the following check BEFORE staging anything. This catches broken compilations that silently rewrite export formats.

   ```bash
   # Extract every export name that tree-wizard.js imports from docs/data/trees/
   # Then verify each export actually exists in its compiled JS file
   ERRORS=0
   while IFS= read -r line; do
     # Parse: import { EXPORT1, EXPORT2 } from '../data/trees/filename.js'
     FILE=$(echo "$line" | grep -o "trees/[^'\"]*" | sed 's|trees/||')
     EXPORTS=$(echo "$line" | grep -o '{[^}]*}' | tr -d '{},' | tr ' ' '\n' | grep -v '^$')
     for exp in $EXPORTS; do
       if ! grep -q "export.*$exp" "docs/data/trees/$FILE" 2>/dev/null; then
         echo "BROKEN: docs/data/trees/$FILE missing export '$exp'"
         ERRORS=$((ERRORS + 1))
       fi
     done
   done < <(grep "from.*trees/" docs/components/tree-wizard.js)
   if [ $ERRORS -gt 0 ]; then
     echo "DEPLOY BLOCKED: $ERRORS missing exports. Compilation broke tree files."
     echo "Restore from git: git checkout HEAD -- docs/data/trees/"
   else
     echo "All exports verified."
   fi
   ```

   If ANY exports are missing: **DO NOT DEPLOY.** Restore the compiled files from git with `git checkout HEAD -- docs/data/trees/` and investigate why the TS source doesn't match the expected export format.

3. **Generate Supabase SQL (for FINAL consult deploys only):**
   **Wait until all testing and iteration is complete.** The app runs from compiled JS, not Supabase — syncing mid-iteration means re-syncing after every change. Only generate SQL on the final deploy of a new or updated consult.

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

4. **Verify ALL compiled files are staged:**
   Run `git status docs/` and check for ANY unstaged changes. Every modified file in `docs/` MUST be committed.
   This is critical — the `src/` TypeScript source and the `docs/` compiled output can get out of sync if compiled JS files are forgotten. This has caused production bugs before (e.g., 8 drugs existed in source but were never deployed).

5. **Bump SW cache version:**
   Open `docs/sw.js` and increment the number in `const CACHE_NAME = 'medkitt-vNN';`
   (e.g., v50 → v51). This triggers the service worker update on users' devices.

6. **Stage, commit, and push:**
   Stage all changed files in BOTH `src/` and `docs/`, commit with a descriptive message, and push to `main`.

7. **Sync dev fork:**
   After pushing to main, sync the dev fork:
   ```bash
   cd ~/Desktop/medkitt-dev && git fetch upstream && git merge upstream/main --no-edit && git push origin main
   ```
   Then return to `~/Desktop/medkitt`.

8. **Verify deployment:**
   Run `gh api repos/kittechsix-blip/medkitt/pages/builds --jq '.[0] | {status, created_at}'` to confirm GitHub Pages built successfully.

9. **Update MEMORY.md:**
   Update the SW cache version in `~/.claude/projects/-Users-kittechsix/memory/MEMORY.md`.

10. **Sync Supabase (FINAL deploy only — skip during iteration):**
    Only after all testing is complete and the consult is finalized. The app doesn't use Supabase — this is only for future native app migration. Sync one file at a time.
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

    - **Skip this step** if no new SQL was generated in step 3

## Important Notes

- NEVER push without checking `git status docs/` first — forgotten compiled files are silent production bugs
- NEVER commit compiled tree files without validating exports first — broken compilations silently rewrite export formats (this has caused 4 consults to break in production before)
- ALWAYS bump the SW cache version on every deploy — this triggers auto-updates on users' phones
- ALWAYS sync dev fork after deploying to main — prevents drift between the two repos
- The SW uses network-first for JS/HTML/CSS + auto-reload via `client.navigate()` on upgrade
- If a user reports stale content, send them to: `https://kittechsix-blip.github.io/medkitt/clear.html`
