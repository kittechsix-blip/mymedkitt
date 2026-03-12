# Deploy myMedKitt

Compile TypeScript, sync caches, and push to GitHub Pages.

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

4. **Verify docs/sw.js has content:**
   ```bash
   wc -l docs/sw.js
   ```
   If it's 0 lines, restore from git: `git show HEAD:docs/sw.js > docs/sw.js` and re-run step 3.

5. **Verify ALL compiled files are staged:**
   Run `git status docs/` and check for ANY unstaged changes. Every modified file in `docs/` MUST be committed.

6. **Stage, commit, and push:**
   Stage all changed files in BOTH `src/` and `docs/`, commit with a descriptive message, and push to `main`.

7. **Verify deployment:**
   Run `gh api repos/kittechsix-blip/mymedkitt/pages/builds --jq '.[0] | {status, created_at}'` to confirm GitHub Pages built successfully. Wait for `status: "built"`.

8. **Supabase SQL (if generated):**
   If `supabase-hotfix-update.sql` was generated, open in TextEdit:
   ```bash
   open -a TextEdit supabase-hotfix-update.sql
   ```
   Remind the user: "Supabase SQL is ready in TextEdit. Copy-paste into Supabase SQL Editor and run."

## Important Notes

- NEVER push without checking `git status docs/` first — forgotten compiled files are silent production bugs
- The SW uses network-first for JS/HTML/CSS + auto-reload via `client.navigate()` on upgrade
- If a user reports stale content, send them to: `https://kittechsix-blip.github.io/mymedkitt/clear.html`
- This is the **project-level** deploy skill — it takes priority over the global `/deploy` skill
- myMedKitt and MedKitt share the same Supabase instance — SQL updates affect both apps
