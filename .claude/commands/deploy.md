# Deploy myMedKitt

Compile TypeScript, sync caches, push to GitHub Pages, and sync Supabase.

**RULE: Users must NEVER need to manually clear cache.** The deploy process must handle all three data layers (Supabase, IndexedDB, SW cache) so content updates are automatic.

## Steps

00. **EDEADLK Preflight (informational — DO NOT abort the deploy):**
    ```bash
    # Diagnostic only. EDEADLK is not a build blocker anymore.
    ls ~/Desktop/myMedKitt >/dev/null 2>&1 && echo "project dir OK"        || echo "project dir blocked (will use /tmp at commit)"
    cd ~/Desktop/myMedKitt && git status >/dev/null 2>&1 && echo "git OK"  || echo "git blocked (will use /tmp at commit)"
    ```

    Build steps 1-7 (TypeScript compile, CSS copy, cache sync, Supabase push, file verification) run on Desktop as usual — none of them go through git's mmap path, so they work even when git is locked. The commit/push step (step 8) routes through `~/Desktop/claude-brain/bin/git-via-tmp.sh`, which transparently falls back to a `/tmp` shadow when Desktop git can't open its pack files. Andy does NOT need to reboot, and does NOT need to be at the Mac.

    Reboot is the last resort, not the first response. Verified 2-for-2 on real deploys (2026-05-20 culture-positive-results-ed, 2026-05-21 status-epilepticus BAO mimicker). Full reference: `~/Desktop/claude-brain/operations/edeadlk-playbook.md`.

0. **MANDATORY — Lint CRITICAL_ACTIONS linkage:**
   ```bash
   node scripts/lint-critical-actions.mjs --strict
   ```
   This asserts every `nodeId` referenced in `*_CRITICAL_ACTIONS` arrays resolves to an actual node in the same tree's `*_NODES` array. Broken linkage = dead clinical guidance link = FDA Prong-4 risk (clinician cannot review the basis for the recommendation).

   **If this step fails, the deploy ABORTS.** Fix the broken nodeIds before continuing. Either:
   - Rename the CRITICAL_ACTIONS `nodeId` to match an existing node id (most common — usually a node was renamed without updating the reference), OR
   - Add the missing node to the NODES array if the critical action references content that should exist, OR
   - Remove the dead reference from CRITICAL_ACTIONS if it's no longer clinically relevant

   Carried recommendation across 6 Louis Litt audits. Closed 2026-05-12 — initial enforcement caught 266 broken nodeIds across 54 files.

0b. **MANDATORY — Lint dangling CALCULATOR references (ratchet):**
   ```bash
   node scripts/lint-calculator-refs.mjs --gate
   ```
   This asserts every calculator ID a consult points at (via `calculatorLinks`, toolbar `action:'calculator' target`, or an in-body `#/calculator/<id>` link) actually exists as a key in the `CALCULATORS` registry in `src/components/calculator.ts`. A dangling ID = a button that silently hits the "calculator not found" screen. This is the exact bug class that let the pericarditis high-risk calculator ship broken (2026-07-19) — Flow Rider's click-through audit missed it because it never clicked that specific button.

   **Ratchet behaviour:** the gate fails ONLY on NEW dangling IDs (not in `scripts/lint-calculator-refs.baseline.json`). The 54 pre-existing dead buttons (frozen in the baseline 2026-07-19) are printed as a warning but do NOT block deploys while they are triaged. The check goes live immediately without blocking every deploy, while guaranteeing no NEW dead calculator button can ship.

   **If this step fails**, you introduced a new dead calculator button. Fix before shipping:
   - Add the missing calculator to the `CALCULATORS` registry, OR
   - Correct the referenced ID in the consult.

   **When you FIX one of the baseline dead buttons**, tighten the ratchet so it can never regress:
   ```bash
   node scripts/lint-calculator-refs.mjs --update-baseline
   git add scripts/lint-calculator-refs.baseline.json
   ```
   (The gate prints a reminder listing which baseline IDs now resolve.)

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

   **4b. Push directly via REST API (preferred — no copy-paste):**
   ```bash
   node scripts/supabase-push.mjs <tree-id> --update
   ```
   This reads compiled JS from `docs/` and pushes nodes + citations + metadata directly to Supabase via REST API. No SQL editor needed.

   For new consults, omit `--update`:
   ```bash
   node scripts/supabase-push.mjs <tree-id>
   ```

   **4c. Fallback — manual SQL paste (only if REST push fails):**
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

   **Then push directly via REST API (preferred):**
   ```bash
   node scripts/supabase-push.mjs <tree-id>
   ```
   Add `--drugs id1,id2` and `--info-pages id1,id2` flags for any new drugs/info pages.

   **Skip this step** if no new consult was added.

5b. **MANDATORY — WingMan skill freshness gate (Bedside Proof phase, 2026-07-18):**
   The served Claude skill at `docs/skill/` is generated from the same clinical
   source as the app. A deploy that updates the app but not the skill ships
   stale medicine to skill users (this happened Jun 23 → Jul 18: half-dose
   torsades Mg, missing toxic-alcohols consult).

   **Run the drift sentinel UNCONDITIONALLY on every deploy** (it is cheap and
   also catches drift from pushes that bypassed /deploy):
   ```bash
   bun run build:skill:drift
   ```

   - **Exit 0** — served skill matches current source. Continue to step 6.
   - **Exit 1 (DRIFT)** — rebuild and promote before continuing:
     ```bash
     bun run build:skill:check   # full build + release gate; ABORT deploy on failure
     cp dist/skill/myMedKitt.skill dist/skill/skill-meta.json docs/skill/
     cp dist/skill/myMedKitt/SKILL.md docs/skill/SKILL.md
     bun run build:skill:drift   # must now exit 0
     git add docs/skill/
     ```
   - **Exit 2 (DIRTY)** — uncommitted changes in skill-source paths. STOP and
     ping Andy: clinical content commits are his call. Do NOT promote a dirty
     build; its provenance SHA doesn't match its content.
   - **Exit 3** — build/infrastructure failure. ABORT the deploy, report the
     error with the fix path. Do NOT bypass by pushing without /deploy.

   **Break-glass (emergencies only):** `DEPLOY_SKIP_SKILL_REBUILD=1` may skip
   this gate, but you MUST then write a red flag line into
   `~/Desktop/claude-brain/memory/inbox.md` ("WingMan skill gate SKIPPED on
   deploy <date> — served skill may be stale, rebuild required") so the next
   briefing surfaces it. A skipped gate must be loud, never silent.

   **Audit-agent autopilots (Dr. K / Louis Litt / Flow Rider):** this gate is
   part of your deploy pipeline. On exit 1, do the rebuild+promote yourself
   (it is mechanical). On exit 2/3, STOP and ping Andy — never push without
   /deploy to get around it.

6. **Verify docs/sw.js has content:**
   ```bash
   wc -l docs/sw.js
   ```
   If it's 0 lines, restore from git: `git show HEAD:docs/sw.js > docs/sw.js` and re-run step 3.

7. **Verify ALL compiled files are staged:**
   Run `git status docs/` and check for ANY unstaged changes. Every modified file in `docs/` MUST be committed.

8. **Stage, commit, and push — via the EDEADLK-safe helper:**
   Stage the specific files this deploy touches in BOTH `src/` and `docs/`,
   then hand off to the helper. It tries Desktop git first and transparently
   falls back to the `/tmp` workaround on EDEADLK.

   ```bash
   cd ~/Desktop/myMedKitt
   # Stage the changed files explicitly — NEVER use `git add -A` here, parallel
   # sessions and the auto-bumped DATA_VERSION/SW cache files can collide.
   git add <files-you-touched-in-src> <files-you-touched-in-docs>
   git add docs/sw.js src/services/cache-db.ts docs/services/cache-db.js 2>/dev/null || true

   # Commit + push (with auto-fallback to /tmp on EDEADLK):
   ~/Desktop/claude-brain/bin/git-via-tmp.sh myMedKitt "<commit message>"
   ```

   Helper exits 0 on success. On exit 2 (true deadlock — `cp -R` of `.git`
   itself failed), surface the error to Andy and offer the reboot option. This
   is the last resort, not the first.

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
