# Deploy myMedKitt

Compile TypeScript, sync caches, push to GitHub Pages, and sync Supabase.

**RULE: Users must NEVER need to manually clear cache.** The deploy process must handle all three data layers (Supabase, IndexedDB, SW cache) so content updates are automatic.

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

4. **MANDATORY — Supabase sync for changed tree/node data:**
   **The app loads from Supabase FIRST. If Supabase has stale data, users see stale content regardless of hardcoded fixes or cache bumps.** This step is NOT optional when any tree node content changes.

   **4a. Check if deploy-cache-sync generated UPDATE SQL:**
   - If `supabase-hotfix-update.sql` was generated → use it (step 9)
   - If it shows `⚠ Unknown tree` warnings or "No node-level changes detected" but you changed tree nodes → the script failed. Proceed to 4b.

   **4b. If cache-sync failed to generate SQL, manually generate it:**
   Identify ALL tree IDs and node IDs that were modified in this deploy. Then generate UPDATE SQL:
   ```bash
   node -e "
   // List ALL changed trees and their modified node IDs
   const changes = {
     '<tree-id>': ['<node-id-1>', '<node-id-2>'],
     // Add more trees as needed
   };
   async function run() {
     const lines = ['BEGIN;', ''];
     for (const [treeId, nodeIds] of Object.entries(changes)) {
       const m = await import('./docs/data/trees/' + treeId + '.js');
       const prefix = Object.keys(m).find(k => k.endsWith('_NODES'));
       const nodes = m[prefix];
       for (const nid of nodeIds) {
         const node = nodes.find(n => n.id === nid);
         if (!node) { console.error('NOT FOUND:', nid); continue; }
         const body = JSON.stringify(node.body).slice(1,-1).replace(/'/g, \"''\");
         const rec = node.recommendation ? JSON.stringify(node.recommendation).slice(1,-1).replace(/'/g, \"''\") : null;
         lines.push('-- ' + treeId + ': ' + nid);
         lines.push('UPDATE decision_nodes SET body = \'' + body + '\'' + (rec ? \", recommendation = '\" + rec + \"'\" : '') + \" WHERE id = '\" + nid + \"' AND tree_id = '\" + treeId + \"';\");
         lines.push('');
       }
     }
     lines.push('COMMIT;');
     require('fs').writeFileSync('supabase-hotfix-update.sql', lines.join('\\n'));
     console.log('Written: supabase-hotfix-update.sql');
   }
   run();
   "
   ```

   **4c. Open and walk user through paste:**
   ```bash
   open -a TextEdit supabase-hotfix-update.sql
   ```
   User: Cmd+A, Cmd+C, Supabase → New Query, Cmd+V, Run.
   If "destructive operation" warning appears: click "Run this query" — it's safe.

   **Skip step 4 ONLY if the deploy touches zero tree/node data** (e.g., CSS-only, calculator-only, new skill file).

5. **Generate Supabase INSERT SQL (for NEW consults only):**
   **Only for NEW consults.** Step 4 handles updates to existing consults.
   **Wait until all testing and iteration is complete.**

   ```bash
   node scripts/generate-supabase-sql.mjs <tree-id> \
     --drugs <comma-separated new drug IDs> \
     --info-pages <comma-separated new info page IDs>
   ```

   - The script reads compiled JS from `docs/` and outputs `supabase-<tree-id>-insert.sql`
   - Include `--drugs` for any NEW drugs added in this consult
   - Include `--info-pages` for any NEW info pages added

   **Then split for Supabase paste:**
   ```bash
   mkdir -p supabase/<tree-id>
   python3 -c "
   import re
   with open('supabase-<tree-id>-insert.sql') as f:
       content = f.read()
   parts = re.split(r'(^-- [4-9]\..*$)', content, flags=re.MULTILINE)
   file1, file2, file3 = [], [], []
   current = 1
   for part in parts:
       if re.match(r'^-- 4\.', part): current = 2
       elif re.match(r'^-- [56]\.', part) and current == 2: current = 3
       [file1, file2, file3][current-1].append(part)
   with open('supabase/<tree-id>/01-tree-metadata.sql', 'w') as f:
       f.write(''.join(file1).rstrip() + '\nCOMMIT;\n')
   with open('supabase/<tree-id>/02-nodes.sql', 'w') as f:
       f.write('BEGIN;\n' + ''.join(file2).rstrip() + '\nCOMMIT;\n')
   with open('supabase/<tree-id>/03-drugs-infopages.sql', 'w') as f:
       f.write('BEGIN;\n' + ''.join(file3).rstrip() + '\n')
   print('Done')
   "
   ```

   Walk user through 3 pastes (open each in TextEdit → Cmd+A → Cmd+C → Supabase New Query → Cmd+V → Run).

   **Skip this step** if no new consult was added.

6. **Verify docs/sw.js has content:**
   ```bash
   wc -l docs/sw.js
   ```
   If it's 0 lines, restore from git: `git show HEAD:docs/sw.js > docs/sw.js` and re-run step 3.

7. **Verify ALL compiled files are staged:**
   Run `git status docs/` and check for ANY unstaged changes. Every modified file in `docs/` MUST be committed.

8. **Stage, commit, and push:**
   Stage all changed files in BOTH `src/` and `docs/`, commit with a descriptive message, and push to `main`.

9. **Verify deployment:**
   Run `gh api repos/kittechsix-blip/mymedkitt/pages/builds --jq '.[0] | {status, created_at}'` to confirm GitHub Pages built successfully. Wait for `status: "built"`.

## Important Notes

- **Users must NEVER need to manually clear cache.** If they do, the deploy process failed.
- The three-tier fallback is Supabase → IndexedDB → hardcoded. Supabase WINS. If Supabase is stale, users see stale content.
- NEVER push without checking `git status docs/` first — forgotten compiled files are silent production bugs
- ALWAYS sync Supabase when tree/node data changes — this is the #1 cause of "my changes aren't showing" bugs
- The SW uses network-first for JS/HTML/CSS + auto-reload via `client.navigate()` on upgrade
- If a user reports stale content despite proper deploy, send them to: `https://kittechsix-blip.github.io/mymedkitt/clear.html`
- This is the **project-level** deploy skill — it takes priority over the global `/deploy` skill
- myMedKitt and MedKitt share the same Supabase instance — SQL updates affect both apps
