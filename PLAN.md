# PLAN.md — Headache Hub + 3 Splits (HUB Pattern v1)

**Spec:** `~/Desktop/claude-brain/patterns/hub-consult-pattern.md`
**Scope:** First implementation of the HUB consult pattern. Build 3 standalone splits, then the hub. Ship the `type:'hub'` field with this PR. Update EB Med Scout state to begin `parent_hub` tagging.
**Out of scope:** Building other hubs from the roadmap (chest pain, abdominal pain, etc.); refactoring already-flat consults that touch headache (migraine, AACG); back-porting `parent_hub` tags to scout entries that predate this commit.

---

## 0. Risk Register (resolved upfront — must read before any phase)

These 9 risks were pre-flagged. Each maps to a concrete plan item. Items marked **BLOCKING** must resolve before the first build phase.

| # | Risk | Resolution | Phase |
|---|------|------------|-------|
| R1 | `type:'hub'` flag must survive Supabase + IndexedDB + category-service paths | Add `type?: 'standard' \| 'hub' \| 'procedure'` to `DecisionTreeMeta` in **`src/models/types.ts`** (correct type name — not `DecisionTree`). Plumb through (a) `src/data/categories.ts` literals, (b) `src/services/tree-service.ts` TREE_REGISTRY entries — add `type` to the returned config object, (c) `src/services/category-service.ts` `mergeHardcodedConsults()`. **CRITICAL (R2-M4 + R4-M3):** the merge function currently only overlays hardcoded values when title/subtitle/nodeCount signal staleness. That heuristic does NOT fire when the DB row is "fresh-looking but missing client-only metadata," which is exactly what happens for `type`. Revised rule: `mergeHardcodedConsults()` **ALWAYS overlays client-only registry fields** (`type` plus any future client-only metadata) onto the merged result, UNCONDITIONAL of the stale-signal heuristic. Regression test `tests/category-service.merge-metadata.test.ts` constructs a Supabase row with fresh title/subtitle/correct nodeCount but no `type` and asserts the merged result still carries `type: 'hub'`. **Supabase schema NOT modified in v1** (no `decision_trees.tree_type` column). DB-source-of-truth intentionally not extended; flag a v2 migration if scout state needs DB query support. | 1 |
| R2 | Toolbar overflow UI for 12 tools — **MASSIVE blast radius if global** | Verified: **40+ existing toolbars exceed 5 items** (oncological-emergencies = 14, ocular-trauma = 10, pph/htn-pregnancy/vp-shunt/diabetic-foot-wounds/traveler-infections = 8 each, plus ~33 toolbars at 6–7). A global "5 inline + overflow" change would silently regress dozens of production workflows. **Revised resolution:** new behavior is **opt-in per consult via `toolbarOverflow: true` flag on `ToolbarConfig`** (default `false` → no overflow rendering, current behavior preserved for ALL existing toolbars unchanged). Only `headache-hub` (and future hubs) opt in. Keep the `🧰 Tools ▾` button distinct from existing `•••`/Decision Map. The `pinned: true` flag is still added on `ToolbarItem` for future use but is a no-op while `toolbarOverflow: false`. **Canary:** smoke `headache-hub` overflow on iOS Safari + desktop Chrome before declaring Phase 1 done. No existing toolbar is touched in this PR. | 1 |
| R3 | Calculator reuse — must NOT re-implement; correct registry location | **Calculators live in monolithic `src/components/calculator.ts`** with section comments (`// MIGRAINE CALCULATORS`, `// CHF EXACERBATION CALCULATORS`, …) — **NOT** in `src/data/calculators/*`. New calculators add new sections inline: `// CLUSTER-HEADACHE CALCULATORS`, `// TRIGEMINAL-NEURALGIA CALCULATORS`, `// HEADACHE-HUB CALCULATORS`. Map every tool to (existing-reuse) or (new-build) — see Phase 2 corrected table. **Also fix:** `action: 'jump'` only calls `controller.jumpToNode(target)` which is intra-tree only. Cross-tree jumps (e.g., IIH from hub toolbar) need either a new `action: 'route'` that sets `window.location.hash = '#/tree/<id>'`, or an Info Page overlay with an inline `[Open IIH Consult](#/tree/iih)` link. **Choosing `action: 'route'`** as a new explicit action type, added in Phase 1 alongside the Tools drawer. | 1, 2 |
| R4 | **BLOCKING** — Image licensing conflict | User said "Wikimedia/NYSORA/BookShelf only." **Project CLAUDE.md OVERRIDES:** CC0 / Public Domain / US Federal Gov Work ONLY (commercial product, no CC BY, no CC BY-SA, no NC, no ND). NYSORA content is largely proprietary / CC BY-NC — REJECT by default. Wikimedia must be filtered per-file to `PD-USGov`, `PD-old-100`, `CC0`. **NIH BioArt + Gray's Anatomy 1858 + CDC PHIL are the safe defaults.** See Phase 4 image preselection table (with actual candidate URLs + license tags). | 4 |
| R5 | Dual-list category placement — **THREE files must agree** | Three separate registries hold cross-listing data: (a) `src/data/categories.ts` — register same `id:` in both `decisionTrees[]` blocks; (b) `src/services/tree-service.ts` TREE_REGISTRY — single canonical `categoryId` only; (c) **`scripts/supabase-push.mjs` `CROSS_LISTINGS` map** (verified line 262) — must add an entry for `headache-hub` with the secondary category (e.g., `{ categoryId: 'neurology' }`). Also check `scripts/generate-supabase-sql.mjs` for an equivalent map. **Hub only** is dual-listed (EM + Neurology). Splits keep single home (cluster=Neuro, trigeminal=Neuro, occipital-block=Procedures). | 7 |
| R6 | SW cache step — **NEVER hand-edit `docs/sw.js`** | `docs/sw.js` `ASSETS_TO_CACHE` is auto-generated by `scripts/deploy-cache-sync.mjs` (header comment: "Regenerated by scripts/deploy-cache-sync.mjs (walks docs/ and writes this block)"). Hand-edits are clobbered on next deploy. Resolution: drop "add to ASSETS_TO_CACHE" from every per-phase file list. The `/deploy` skill runs `deploy-cache-sync.mjs` which both bumps CACHE_NAME + DATA_VERSION and regenerates the asset block. **All four sequential deploys must use the `/deploy` skill, never manual cache edits.** | 8 |
| R7 | Supabase sync — push order is **NON-ATOMIC** | Verified push order in `supabase-push.mjs`: (1) upsert `decision_trees` → (2) upsert `category_trees` → (3) DELETE+INSERT `tree_citations` → (4) DELETE+INSERT `decision_nodes` in batches of 50. If the run dies between step 1 and step 4, users see a registered tree with no nodes. **Mitigation:** (a) `/deploy` blocks on `supabase-push.mjs` non-zero exit and refuses to bump `CACHE_NAME`/push to git when push fails; (b) three-tier fallback (Supabase → IndexedDB → hardcoded) means hardcoded fallback in `tree-service.ts` shows correct content even during a partial Supabase state, so users on the new SW will still see the consult; (c) for the four-consult batch, run each deploy in two phases: **Supabase push first** (verify all 4 tables populated by `select count(*) from decision_nodes where tree_id='<id>'` smoke check), **then** CACHE_NAME bump + git push. **v2 follow-up:** wrap supabase-push in a server-side transaction (RPC or single SQL batch via `/rest/v1/rpc/<fn>`); not in scope for this PR. | 8 |
| R8 | Cross-link integrity (**bidirectional, not just hub→splits**) | Build order = splits first, hub last (per spec). **CRITICAL CORRECTION:** the splits MUST NOT add backlinks to `#/tree/headache-hub` in their red-flag sections (that's the contradiction Codex caught — those links break during the splits-deployed-but-hub-not-yet window). Cross-link directionality rule: **hub links into splits; splits do not link back to hub.** Cluster's red-flag triage links directly to existing standalone consults (SAH, ICH, meningitis, dissection, CO-toxicity, AACG) — same destinations the hub also points to. Validation: **repo-wide validator** (new `scripts/validate-cross-links.mjs`) greps every tree file in `src/data/trees/` + toolbar-configs + info-pages + stop-pages + drug-store for `#/tree/`, `#/info/`, `#/node/`, `#/drug/`, and `images/` references; asserts each target exists in the registry. Runs as part of `/deploy` pre-flight. | 5, 7, 8 |
| R9 | Clinical safety footguns | Hard-coded into the relevant node bodies as `urgency: 'critical'` red banners with `[N]` citations: (1) verapamil → 12-lead ECG before titration + every dose increase, halt if PR >0.24 s or new heart block; (2) carbamazepine → HLA-B\*1502 genotype before starting in Han Chinese / Thai / Vietnamese / Filipino / Malay ancestry (FDA boxed warning 2007); (3) triptan + SSRI/SNRI → low but real serotonin-syndrome risk per FDA 2006 advisory; document Cochrane 2018 nuance (low absolute risk) but keep the warning; (4) ergotamine + DHE → absolute pregnancy CI (oxytocic / vasoconstrictor); triptans = pregnancy data limited, NSAIDs after 30 wks contraindicated; nerve blocks + acetaminophen + low-dose opioid are the pregnancy-safe ladder; (5) **CBZ-associated hyponatremia: do NOT switch to oxcarbazepine** — oxcarbazepine causes more frequent and more severe hyponatremia (~15–30% incidence vs CBZ ~10%). Stop offending sodium-lowering anticonvulsant, correct Na with fluid restriction ± hypertonic saline if symptomatic, switch to non-Na-lowering alt (gabapentin, baclofen, lamotrigine) with neurology input. [Cit: Dong J Headache Pain 2005; Berghuis Epilepsia 2017]. | 5, 6, 7 |
| R10 | EBM citations require a **per-node matrix**, not "key node" backbones | Per-tree citation matrix stub added below each phase (Phase 4/5/6/7). Each matrix lists planned node IDs with placeholder citation numbers + planned source. **Citation-freeze step** mandatory at start of each consult build phase: subagent verifies each guideline anchor (e.g., "AAN 2024 cluster" → actual title/year/DOI). Likely real anchors: AHS cluster guideline (Robbins Headache 2016/2024 update) and/or EAN cluster update (May Eur J Neurol 2023); ACEP 2019 Clinical Policy on Acute Headache (Godwin Ann Emerg Med 2019); AHS 2021 Acute Migraine Consensus (Ailani Headache 2021); IHS ICHD-3 (Cephalalgia 2018). | 4–7 |
| R11 | Concrete commands for `/deploy`, DrK, FlowRider, scout-state-update | `/deploy` = `Skill tool → skill: "deploy"`. DrK = `Agent tool → subagent_type: "Dr. Kitlowski"` (per project agent roster) with prompt to audit consult X clinical correctness, results posted via `mcp__plugin_claude-mem_mcp-search__save_memory` tagged `DrK Audit`. FlowRider = `Agent tool → subagent_type: "Flow Rider"` with prompt for UX audit, results tagged `FlowRider UX`. Scout state writer = new script `~/Desktop/claude-brain/bin/scout-state-update.mjs` (idempotent, atomic temp-file + rename, validates schema). | 9, 10 |
| R12 | **Rollback is unsafe without snapshots** | A git revert alone does not undo Supabase writes. Resolution: (a) **pre-deploy snapshot** — `scripts/supabase-snapshot.mjs <id>` exports the current rows from `decision_trees`, `category_trees`, `tree_citations`, `decision_nodes`, `drugs` (if drug changes are part of this push), `info_pages` (if info-page changes) to a timestamped JSON in `~/Desktop/myMedKitt/supabase-snapshots/<id>-<UTC-timestamp>.json` BEFORE the push runs. (b) **rollback script** — `scripts/supabase-rollback.mjs <snapshot-file>` reverses the push by upserting the snapshot rows back. (c) **category visibility tombstone** — for new consults whose snapshot would be empty (no prior rows), rollback is a targeted DELETE: `DELETE FROM category_trees WHERE tree_id='<id>' AND category_id IN (...)` followed by DELETE of nodes/citations/drugs/info_pages. (d) **git tag at deploy** — `git tag deploy/<UTC-timestamp>-<tree-id>` after a successful per-consult deploy, easy reference for revert. (e) **scout-state rollback** — `scout-state-update.mjs --consult <id> --status deferred --rollback-of <commit-sha>` undoes the state entry. (f) **post-rollback cache bump** — invoke `/deploy` (or run `deploy-cache-sync.mjs` directly) so the new `CACHE_NAME`/`DATA_VERSION` invalidates the SW and clients refetch. New Phase 8a captures the full runbook. | 8a |
| R13 | **No production observability for the rollout** | Add privacy-safe telemetry events. Verify if `src/services/kittmd-analytics.ts` exists (it does, per file listing) and extend with: `tree_load_source` (supabase/indexeddb/hardcoded), `tree_load_error`, `link_resolution_error` (broken `#/tree/`, `#/info/`, `#/node/`, `#/drug/`), `calculator_error`, `route_action_error`, `sw_version`, `data_version`, `hub_module_view` (which hub module the user lands on). Events are POSTed to a privacy-safe sink (no PHI; tree-ids + version-strings only). Post-deploy: tail/dashboard for 24 h after each consult deploys; alert thresholds = (a) hardcoded-fallback rate >5% (Supabase issue), (b) link_resolution_error count >0 (broken cross-link), (c) route_action_error >0 (router regression). Telemetry sink address + analytics module wiring confirmed before Phase 1 merge. | 1, 8b |
| R14 | **No kill switch / feature flag for new primitives** | New file `src/data/feature-flags.ts` exports a const object: `{ hubTypeRender: true, routeActionEnabled: true, toolbarOverflowEnabled: true, hiddenTreeIds: [], hiddenHubs: [] }`. Every new behavior is gated: `if (FLAGS.hubTypeRender)`, `if (FLAGS.routeActionEnabled)`, etc. The `hiddenTreeIds` array lets a one-line edit hide any consult from category lists without DB or content changes. `hiddenHubs` hides hub-typed trees specifically. **Off-switch deploy flow:** edit `feature-flags.ts` → `/deploy` (≤2 min from edit to live). For v1 the flags live in-code (no remote toggle); v2 may move to Supabase `feature_flags` table for runtime control without a deploy. | 1 |
| R15 | **Staged + per-split canary flip** (R18 supersedes the single-batch flip from round 3) | Four sequential deploys would force 4 DATA_VERSION wipes + 4 SW reloads per user. **Revised strategy:** stage all 4 consults' DB payloads behind a TWO-LAYER hidden gate (R16), then per-split canary flips (R18) gated on smoke + telemetry. Single SW bump for the initial staging push; subsequent flips are `feature-flags.ts` edits + `/deploy` (which still bumps cache but with a lightweight delta — only the flags file changed). Per-split flips trade off "one user reload" simplicity for "blast radius isolation"; the right call for a new architecture pattern. | 8 |
| R16 | **HIDDEN-GATE BREAKAGE — category_trees absence is bypassable (Codex R5 H1)** | **Verified:** (a) `src/services/category-service.ts` `mergeHardcodedConsults()` at line 124 explicitly adds hardcoded `categories.ts` entries to listings even when Supabase lacks them — the hardcoded entry shows up as soon as the file is on disk, regardless of `category_trees`; (b) `src/services/tree-service.ts` TREE_REGISTRY loads any registered tree by hash route (`#/tree/<id>`), bypassing categories entirely. **Hiding via `--no-visibility` alone does NOT hide the consult.** **Fix:** the `FLAGS.hiddenTreeIds` array (R14, in `src/data/feature-flags.ts`) is enforced in BOTH paths: (i) `category-service.ts` filters hidden IDs from listings AFTER `mergeHardcodedConsults()`; (ii) **NEW:** `tree-service.ts` `loadTree(treeId)` returns `null` (rendered as 404 by the router) if `FLAGS.hiddenTreeIds.includes(treeId)`. While staging the 4 new consults, their IDs sit in `hiddenTreeIds`. Per-split canary flips (R18) remove IDs one at a time. **Belt-and-suspenders:** also skip `category_trees` write via `--no-visibility` so a developer pulling mid-flip with stale flags doesn't surface the consult. **v2:** add a Supabase `decision_trees.enabled` column for true DB-side runtime gating (no deploy needed for toggle). | 1, 8 |
| R17 | **Pre-flip BLOCKING audits (not post-deploy)** | Round 2 M6 + round 4 H5 + round 5 H3 all hit this: DrK + FlowRider audits scheduled AFTER public enablement let clinical or UX defects ship to users. **Fix:** Phase 9 split into **9a (pre-flip, BLOCKING) and 9b (post-flip, confirmation)**. 9a runs against compiled local/preview build with `FLAGS.hiddenTreeIds` locally cleared for audit (auditor can read the trees) but production `hiddenTreeIds` still includes them. Audits classified by severity; **any HIGH finding blocks the flip until resolved**. 9b reconfirms on production after each canary flip. | 9 |
| R18 | **Per-split canary flips with gates, NOT batch flip (Codex R5 H4)** | A batch flip = regression hits 100% of users immediately. **Fix:** flip order with soak + telemetry gate between each: (1) `occipital-nerve-block` first (lowest blast radius, Procedures-only, no inbound cross-links), 24 h soak (1 h soak if no remote telemetry sink — see R19); (2) `trigeminal-neuralgia` (Neurology-only, no cross-links to other 3), soak; (3) `cluster-headache` (links OUT to `occipital-nerve-block`), soak; (4) `headache-hub` LAST (links into all 3 + existing migraine/aacg). Each flip = remove one ID from `FLAGS.hiddenTreeIds` + `/deploy`. **Gate between flips:** zero `link_resolution_error`, zero `route_action_error`, hardcoded-fallback rate <5%, post-flip DrK/FlowRider audit clean for that consult. **If gate fails:** add ID back to `hiddenTreeIds` + `/deploy` (≤2 min revert), fix, re-flip. | 8 |
| R19 | **Remote telemetry sink MUST be operational before ANY flip (Codex R5 M1)** | `kittmd-analytics.ts` with no remote sink = `console.warn` only = no production observability after rollout. The R13/Phase 8b telemetry plan depends on a sink existing. **Fix:** Phase 0a pre-flight prerequisite — verify the analytics sink endpoint with Andy. If no remote sink exists today, **build a minimal one** (single Supabase edge function or RPC writing to a `client_events` table) BEFORE Phase 1 work begins. If Andy decides to defer remote sink to v2, **canary gate (R18) cannot be telemetry-based** — fall back to manual smoke + 1-hour soak between flips. Document the chosen mode explicitly in the deploy artifact. | 0a |
| R20 | **Shared drug + info-page row safety during staging window (Codex R5 M2)** | Hidden staging writes `drugs` + `info_pages` rows BEFORE the code rollout. Current production clients can briefly consume new or schema-shifted shared rows during the staging window. **Fix:** (a) **all drug/info-page row changes are additive-only**: new drug rows are net-new IDs; new indication subcategories appended to existing drugs without modifying existing block structure; new info-page rows have new IDs. **No in-place edits to existing rows that current consults reference.** (b) **Smoke existing consults** that reference any drug being modified — new script `scripts/validate-existing-consult-rendering.mjs` loads each existing consult that references any drug in the change set and asserts it still renders + the drug modal scrolls to the correct existing indication block. (c) If a non-additive schema shift IS required (not for v1), deploy reader-side code first (handles both shapes), then writer-side data. **v1 is additive-only per Phase 3 plan** — verify before push. | 3, 8 |
| R21 | **Rollback manifests pre-generated per consult with SHA256 (Codex R5 M3)** | Rollback described in Phase 8a but exact shared-row deltas not enumerated — a rollback can restore/delete the wrong drug or info-page row. **Fix:** before each consult's hidden push, the build process generates `rollback-manifests/<id>.json` enumerating exactly: `{ tree_id, drugs_added: [{id, indication, sha256}], drugs_modified: [{id, indication, sha256_before, sha256_after}], info_pages_added: [{id, sha256}], info_pages_modified: [...], decision_trees_added, decision_nodes_count, tree_citations_count }`. Rollback uses this manifest to delete/restore EXACTLY these rows, not blanket deletes. Manifest committed to git alongside consult code. **Rehearsal:** before first production flip, run rollback against a Supabase staging project (or local fixture) and verify table counts + row hashes match the manifest. | 8a |
| R22 | **Deploy lock to prevent parallel-session clobbering (Round 2 M2)** | Status + reflog checks (project rule) catch parallel commits but do not prevent simultaneous writes to `DATA_VERSION`, Supabase, or `eb-med-scout-state.json`. **Fix:** repo-level deploy lock via sentinel file `.deploy.lock` (gitignored) containing PID + session ID + UTC timestamp + planned tree-ids. `/deploy` skill acquires the lock via `mkdir`-style atomic op at start, releases on exit (success OR failure, via trap). Stale-lock detection: if lock older than 30 min, surface to Andy with `ps -p <PID>` check before forcing. Scout-state writer uses its own separate lock (already §10.3). | 8 |
| R23 | **Image license manifest with SHA256 (Round 2 M7)** | License evidence in captions + commit messages is not a durable audit trail; deployed file may diverge from approved source. **Fix:** `docs/images/<tree-id>/MANIFEST.json` per-tree directory, format `{ <filename>: { source_url, license_tag, license_evidence_url, retrieval_timestamp, andy_approval_commit, sha256 } }`. Cross-link validator (R8) extended to fail on any image referenced from a tree that lacks a manifest entry OR whose on-disk SHA256 doesn't match the manifest. New script `scripts/validate-image-manifests.mjs` runs at staging gate (Phase 8.1 pre-flight). | 4 |
| R24 | **Calculator input bounds + adversarial-value validation (Round 2 M5)** | New calculators (CO-Hgb threshold, pregnancy gestational age, verapamil titration, CBZ titration) need explicit min/max/unit bounds to prevent nonsensical clinical output from adversarial or fat-finger input. **Fix:** every new calculator in `src/components/calculator.ts` declares `min`, `max`, `step`, `required`, `unit` on number inputs; `computeResult` short-circuits to "Invalid input — see ranges above" if out of bounds. Examples: CO-Hgb (0–100%), gestational age (0–42 wk), verapamil current dose (0–960 mg/d), CBZ titration interval (≥3 d). NIHSS-style select fields enumerate valid options only. Unit-test each new calculator with: empty input, negative, above-max, NaN/string, decimal-precision boundary. | 2 |
| R25 | **Structured cross-link validator (parse registries, validate by action type) (Round 2 M1)** | The grep-based validator in R8 misses structured toolbar targets and context-scoped `#/node/` links — `route`/`jump`/`overlay`/`calculator` actions can pass validation while pointing at missing trees, nodes, overlays, or calculators. **Fix:** `scripts/validate-cross-links.mjs` parses the real registries (imports compiled `docs/data/categories.js`, `docs/data/toolbar-configs.js`, `docs/components/calculator.js`, etc.) and validates by type: `action: 'route'` → TREE_REGISTRY; `action: 'jump'` → the owning tree's node IDs; `action: 'overlay'` → INFO_PAGES or STOP_PAGES; `action: 'calculator'` → calculator registry. `#/node/` links validated in tree context (must exist in OWNING tree) or banned from shared/cross-tree pages. | 7, 8 |

---

## 0a. Phase 0a — Pre-flight Prerequisites (BLOCKS Phase 1)

Before Phase 1 work begins, all of the following must be true. Each gate has a verifiable artifact.

| Prereq | Verification | Owner |
|--------|--------------|-------|
| Telemetry sink decision (R19) | Andy confirms remote sink exists OR Andy explicitly approves "manual smoke + 1 h soak" mode. Decision logged in `~/Desktop/claude-brain/decisions/2026-05-22-headache-hub-telemetry-mode.md`. | Andy |
| `scripts/tree-registry.mjs` exists | Verified — file present. Updated file lists in Phases 4–7 reference this central registry, NOT script-local TREE_REGISTRY copies. | Plan |
| Rollback rehearsal env | Either a Supabase staging project URL + service key in `.env.staging`, OR a local SQLite/JSON fixture mirroring the Supabase schema. Rollback manifests (R21) tested against this env before production flip. | Plan |
| Deploy lock (R22) | `.deploy.lock` mechanism wired into `/deploy` skill before first staging push. | Plan |
| `FLAGS.hiddenTreeIds` enforcement in both paths (R16) | Phase 1 includes the `tree-service.ts` `loadTree` filter change + `category-service.ts` post-merge filter. Local smoke test: set `hiddenTreeIds: ['migraine']` → migraine vanishes from listings AND `#/tree/migraine` returns 404. | Plan |
| Image license manifest tooling (R23) | `scripts/validate-image-manifests.mjs` exists and `docs/images/<id>/MANIFEST.json` format documented. | Plan |

**Goal:** Land the `type` metadata on `DecisionTreeMeta`, the **`🧰 Tools ▾`** drawer (separate from existing `•••` Decision Map), the `pinned` flag for inline toolbar items, and the new `action: 'route'` for cross-tree jumps. **Must merge before any consult build that depends on them.**

### 1.1 Type system

- `src/models/types.ts`:
  - Extend `DecisionTreeMeta` with `type?: 'standard' | 'hub' | 'procedure';` (default `'standard'`).
  - Extend `ToolbarItem` with `pinned?: boolean;` (default `false`; `true` = always-inline regardless of position).
  - Extend `ToolbarItem.action` union to include `'route'`.
- `src/types/consult-tree.ts` (legacy `ConsultTree` shape) — mirror `type` field for backwards compat.
- `src/services/tree-service.ts` — every TREE_REGISTRY entry returns `type` (default `'standard'` if unset); the resolved tree config includes `type`.
- `src/services/category-service.ts` — `mergeHardcodedConsults()`: **inspect today's behavior first.** Codex M3 round 3 warns the current merge only replaces stale `title/subtitle/nodeCount` rather than full metadata copy. **Action:** explicitly add `type` to the per-tree merge: when merging hardcoded metadata over IndexedDB-hydrated data, hardcoded `type` wins. Add a TS unit test or lightweight asserter that verifies the hub trees retain `type: 'hub'` under all three load paths (Supabase row missing column → hardcoded fallback fills in; IndexedDB cache stale → hardcoded merge overrides; cold-start no IndexedDB → hardcoded direct).
- `src/services/tree-service.ts` — extend `TreeConfig` interface with `type?: 'standard' | 'hub' | 'procedure';`. The current `TreeConfig` type does NOT have this field per Codex M3, so any consumer code that needs `type` at render-time must access it via the resolved config, not the raw DB row.
- **Supabase schema: unchanged in v1.** `type` lives client-side only, sourced from hardcoded TREE_REGISTRY at merge time. Code comment in tree-service explains: "DB-source-of-truth not extended in v1; if scout state needs DB query, add `decision_trees.tree_type` column and migration."

### 1.2 Tools drawer (separate from Decision Map) — **OPT-IN PER CONSULT**

- `src/components/contextual-toolbar.ts`:
  - Keep `•••` button + `Decision Map` overlay unchanged (no naming collision).
  - **Behavior gated by `toolbarOverflow: true` flag on `ToolbarConfig`. Default `false` = current behavior, ALL existing 40+ toolbars untouched.**
  - When `toolbarOverflow: true`: inline render order = `pinned: true` items first, then remaining up to `TOOLBAR_VISIBLE_CAP = 5`; items 6+ render inside a `🧰 Tools ▾` bottom-sheet drawer.
  - When `toolbarOverflow: false` (default): all items render inline as today (no regression for vertigo's 6 items, oncological-emergencies' 14, ocular-trauma's 10, etc.).
  - Drawer items support all 4 actions (`calculator`, `overlay`, `jump`, `route`).
- `src/views/style.css`:
  - `.toolbar-tools-btn`, `.toolbar-tools-sheet`, `.toolbar-tools-item` (distinct from `.decision-map__*` selectors).
- `src/models/types.ts`:
  - Extend `ToolbarConfig` (or whatever wraps `toolbar-configs.ts` entries) with optional `toolbarOverflow?: boolean` (default false).

### 1.3 Cross-tree route action

- `src/components/contextual-toolbar.ts` action dispatcher:
  - `action: 'route'` → `window.location.hash = '#/tree/' + item.target` (covers cross-tree jumps without modifying `ConsultFlowController`).
  - Verify SPA router (`src/services/router.ts`) handles `#/tree/<id>` route — already confirmed: pattern is in existing use (`[Open IIH](#/tree/iih)` style links).

### 1.4 Edge cases / regression guardrails

- **All 40+ existing toolbars with ≥6 items are explicitly unchanged** because `toolbarOverflow` defaults to `false`. The `pinned` flag is added but is a no-op until `toolbarOverflow: true`.
- Only `headache-hub` opts in (`toolbarOverflow: true`) in this PR.
- Toolbar with ≤5 tools regardless of flag: no Tools button (no-op).
- Tap outside sheet → dismiss; explicit X also present; matches Decision Map dismissal pattern.

### 1.5 Feature flags + kill switch (R14)

- **New file:** `src/data/feature-flags.ts`:
  ```typescript
  export const FLAGS = {
    hubTypeRender: true,        // gate type:'hub' rendering affordances
    routeActionEnabled: true,   // gate action:'route' dispatcher
    toolbarOverflowEnabled: true, // master gate for Tools drawer (still also requires toolbarOverflow:true per-consult)
    hiddenTreeIds: [] as string[],  // hide individual consults from category lists
    hiddenHubs: [] as string[],     // hide hub-typed trees specifically
  } as const;
  ```
- Every new behavior is wrapped: `if (FLAGS.routeActionEnabled) { window.location.hash = ... }` etc.
- `src/services/category-service.ts` filters `hiddenTreeIds` + `hiddenHubs` out of category listings before render.
- **Kill switch flow** if anything goes wrong post-deploy: edit `feature-flags.ts` (1 line per flag), `/deploy` skill → live within ~2 min.

### 1.6 supabase-push.mjs hardening (R7)

**Bug:** verified that `supaPost`, `supaUpsert`, `supaDelete` log errors but **return `false` and the caller does not check the return value** (e.g., `await supaUpsert('decision_trees', ...)` at line 247 throws nothing on failure). Push proceeds silently after a failed step.

**Fix:**
- Track each helper's return value at every call site; on `false` → `process.exit(1)` with descriptive error before any subsequent write.
- Add a top-level try/catch wrapping the whole flow that exits non-zero with a contextual error message.
- Add `--no-visibility` CLI flag that skips the `category_trees` write (used by staged-then-flip in Phase 8).
- Add `--snapshot-first` CLI flag that runs `scripts/supabase-snapshot.mjs <id>` before the push (used by Phase 8a rollback prep).

### 1.7 Telemetry instrumentation (R13)

- Verify `src/services/kittmd-analytics.ts` exists and extend with new event types listed in R13.
- Privacy floor: tree-ids only (no node text, no user input, no patient context). Version strings (CACHE_NAME, DATA_VERSION) are app-level not user-level.
- Event sink: existing analytics endpoint (verify location); confirm with Andy if remote sink. If no sink, log to `console.warn` with a recognizable prefix `[telemetry]` and add a TODO for sink integration in v2.

### 1.8 Validation

- `bunx tsc --skipLibCheck --noUnusedLocals false` clean.
- Smoke: `vertigo` — unchanged (still 6 items inline, no Tools button, `toolbarOverflow` unset/false).
- Smoke: `oncological-emergencies` — unchanged (still 14 items inline).
- Smoke: `aacg` (3 tools) — unchanged.
- Smoke (deferred to Phase 7): `headache-hub` 12 tools with `toolbarOverflow: true` — 5 pinned inline + 7 in Tools drawer.
- Smoke: any consult — `•••` opens Decision Map TOC unchanged.
- Kill-switch smoke: flip `FLAGS.toolbarOverflowEnabled = false` → `headache-hub` falls back to all 12 inline (same as today's behavior); flip back → drawer returns.

---

## 2. Phase 2 — Calculator/Tool Inventory + Authoring

**Goal:** Decide reuse vs new for each of the 12 hub toolbar items. Author the new ones. Do NOT re-implement anything that exists.

### 2.1 Toolbar inventory map

| # | Tool | Status | Source / new spec |
|---|------|--------|-------------------|
| 1 | SNOOP10 | **NEW** | Calculator (checkbox-style), 10 red-flag items → ≥1 = "Workup mandatory; do NOT discharge without imaging ± LP." EBM: AHS 2019 SNOOP4-to-SNOOP10 update. |
| 2 | Ottawa SAH Rule | **NEW** | Calculator, 6 criteria (age ≥40, neck pain/stiffness, witnessed LOC, exertional onset, thunderclap, limited neck flex). Validated for alert ≥15 yo with new severe atraumatic HA. EBM: Perry JAMA 2013, 2017 validation. |
| 3 | ICHD-3 Classifier | **REUSE migraine `migraine-criteria`** then EXTEND with cluster + tension panels — extend, don't fork. |
| 4 | Cluster vs Migraine vs Tension Differentiator | **NEW** | Side-by-side comparison overlay (not a scored calculator). 8 features × 3 columns. EBM: ICHD-3 §1, §3, §2 verbatim criteria. |
| 5 | Triptan Eligibility/Contraindications | **NEW** | Calculator gating: CAD, uncontrolled HTN, hemiplegic/basilar migraine, prinzmetal, pregnancy, ergot/MAOi within 24h, recent SSRI/SNRI (warn). EBM: AHS 2021 §recommendations. |
| 6 | DHE Protocol | **REUSE migraine `dhe-protocol`** as-is (already authored). |
| 7 | Sphenopalatine Ganglion Block | **NEW** | Procedural overlay (not calculator): intranasal lidocaine 4% via SphenoCath/cotton-tip; landmarks, technique, contraindications, evidence (Cady 2015). |
| 8 | Trigeminal Neuralgia Rx Ladder | **NEW** | Calculator-style flow: 1L carbamazepine → 2L oxcarbazepine → adjuncts (baclofen, gabapentin, lamotrigine) → referral. EBM: AAN/EFNS 2008 + 2019 update. |
| 9 | IIH LP + Acetazolamide | **REUSE iih tree** — link via `#/tree/iih`. Toolbar item uses **new `action: 'route'`** added in Phase 1 (NOT `action: 'jump'`, which is intra-tree only and would fail silently). |
| 10 | Status Migrainosus Cocktail | **NEW** | Calculator returning the parenteral cocktail: Metoclopramide 10 mg IV + Diphenhydramine 25 mg IV + Ketorolac 30 mg IV + Dexamethasone 10 mg IV + 1 L NS bolus; if persists → DHE pathway. EBM: AHS 2021 acute treatment guideline. |
| 11 | CO-Hgb Threshold | **NEW** | Calculator: input CO-Hgb % + symptoms + pregnancy → tier (consider HBO if ≥25%, pregnancy ≥15%, syncope, AMS, ischemia). EBM: Weaver NEJM 2002 + UHMS 2019 indications. |
| 12 | Pregnancy-Safe Headache Rx | **NEW** | Overlay (not calculator): trimester-stratified ladder — acetaminophen → metoclopramide → diphenhydramine → magnesium IV → nerve blocks (greater occipital, sphenopalatine); avoid NSAIDs after 30 wk, avoid triptans (data limited), absolute CI on ergots/DHE/valproate. EBM: ACOG 2019 Headache in Pregnancy committee opinion. |

**Reused:** 3 (ICHD-3 extend, DHE, IIH link). **New:** 9.

### 2.2 Files changed (corrected — calculators live in monolithic `calculator.ts`)
- `src/components/calculator.ts` — **append three new sections** at the end of the file (matches existing pattern: `// MIGRAINE CALCULATORS`, `// CHF EXACERBATION CALCULATORS`, …):
  - `// HEADACHE-HUB CALCULATORS` — SNOOP10, Ottawa SAH Rule, ICHD-3 extension panels, Cluster/Migraine/Tension differentiator (use `computeResult` for the table view), Triptan Eligibility, Status Migrainosus Cocktail, CO-Hgb Threshold.
  - `// CLUSTER-HEADACHE CALCULATORS` — Verapamil titration helper (input current dose + days at dose → next titration step + required ECG check).
  - `// TRIGEMINAL-NEURALGIA CALCULATORS` — CBZ titration helper, TN Rx Ladder navigator (informs current rung + next step + adjuncts).
- `src/data/info-pages.ts` — add SPG block overlay, pregnancy-safe ladder overlay (overlay-type tools, not calculators), cluster vs migraine vs tension comparison overlay if not implemented as calculator `computeResult`.
- `src/data/stop-pages.ts` — three new Stop pages (one per new split) + one for the hub. Mandatory per project CLAUDE.md.
- **REJECTED:** `src/data/calculators/*.ts` — directory does not exist; would diverge from established monolithic pattern. Do not introduce a parallel registry without an explicit refactor PR.

### 2.3 Calculator output formatting
**All 9 new calculator outputs MUST follow the project's BOLD UPPERCASE header + bullet + `\n\n` pattern (project CLAUDE.md §Calculator Output Formatting).** Codex will reject any calculator whose output is a dense single line.

### 2.4 Edge cases
- Empty input on SNOOP10 (no boxes ticked) → result = "No red flags detected — but absence of red flags does NOT rule out secondary HA in a high-risk presentation. Re-screen with [SNOOP10](...) if features evolve."
- Triptan eligibility with multiple absolute CIs → list all, don't stop at first.
- Pregnancy ladder needs trimester gating — number input "weeks gestation" with three branches.

---

## 3. Phase 3 — Drug Catalog Audit + Updates

**Goal:** Every drug referenced across the 4 consults must have a `DrugDose` entry with the right indication subcategory and (where mg/kg) a `weightCalc`. Indication-aware links are mandatory.

### 3.1 Drug gap inventory

| Drug | Status in `src/data/drug-store.ts` | Action needed |
|------|-----------------------------------|---------------|
| **Sumatriptan (SQ)** | check existing | Add/confirm "Cluster Headache" indication block: 6 mg SQ, may repeat ×1 ≥1 h later, max 12 mg/24h. AHS 2024 cluster recommendation. |
| **Sumatriptan (intranasal)** | check existing | Add "Migraine / Cluster (alt)" 20 mg intranasal. |
| **Zolmitriptan (intranasal)** | likely NEW | 5 mg IN, may repeat ×1 ≥2 h later, max 10 mg/24h. Cluster-specific. |
| **Prednisone (bridge)** | confirm/extend | "Cluster Bridge" 60 mg PO daily × 5 d, taper by 10 mg q2d ×10 d. AAN 2024. |
| **Verapamil** | check existing | "Cluster Prophylaxis" 80 mg PO TID, titrate by 80 mg q2wk to effect, max 960 mg/d; ECG before each titration. |
| **Lithium carbonate** | likely NEW | "Cluster Prophylaxis (3L)" 300 mg PO BID, titrate to level 0.6–0.8 mEq/L, narrow therapeutic window. |
| **Topiramate** | check existing | "Cluster Prophylaxis (alt)" 25 mg PO qHS, titrate weekly to 100 mg/d divided BID. |
| **Carbamazepine** | check existing | "Trigeminal Neuralgia (1L)" 100 mg PO BID, titrate by 100–200 mg q3d, target 600–1200 mg/d divided. HLA-B\*1502 screening warning. |
| **Oxcarbazepine** | likely NEW | "Trigeminal Neuralgia (2L)" 150 mg PO BID, titrate to 1200 mg/d. |
| **Baclofen** | check existing | "Trigeminal Neuralgia (adjunct)" 5 mg PO TID, titrate by 5 mg q3d, max 80 mg/d. |
| **Gabapentin** | check existing | "Trigeminal Neuralgia (adjunct)" 300 mg PO qHS, titrate to 1800–3600 mg/d divided TID. |
| **Lamotrigine** | likely NEW | Optional 4L adjunct, slow titration 25 mg qHS × 2 wk → 50 mg → 100 mg → up to 400 mg/d. SJS warning. |
| **Bupivacaine 0.5%** | check existing | "Occipital Nerve Block" 2–3 mL per side, plain (no epi). |
| **Lidocaine 1–2%** | check existing | "Occipital Nerve Block (alt)" 2–3 mL per side. |
| **Methylprednisolone (depot)** | confirm | "Occipital Nerve Block (steroid adjunct)" 40 mg mixed with LA, controversial benefit — see citation. |
| **Dexamethasone 4 mg** | check existing | "Occipital Nerve Block (steroid adjunct alt)" or "Status Migrainosus (anti-recurrence)" 10 mg IV. |
| **Metoclopramide** | check existing | "Status Migrainosus" 10 mg IV; EPS risk in <30 yo. |
| **Diphenhydramine** | check existing | "Migraine cocktail / EPS prophylaxis" 25 mg IV. |
| **Ketorolac** | check existing | "Migraine / Status" 30 mg IV (15 mg if >65 yo or weight <50 kg or eGFR <30). |
| **Magnesium sulfate** | check existing | "Migraine (aura subtype) / Pregnancy" 1–2 g IV over 15 min. |
| **Acetaminophen** | check existing | "Pregnancy-safe HA" 1 g PO/IV q6h, max 4 g/d. |
| **Acetazolamide** | check existing (IIH) | already in IIH consult; reuse link. |
| **Indomethacin** | likely NEW | Used to *diagnose* hemicrania continua / paroxysmal hemicrania (indomethacin-responsive HA). 25 mg PO TID × 3 d → if responds, dx confirmed. |
| **Octreotide** | likely NEW (optional) | Cluster 100 mcg SQ — alternative when triptan/O2 contraindicated. Mention but don't require. |

**Action:** Phase 3 must commit drug-store.ts updates BEFORE Phase 4 (Phase 4 occipital-block references bupivacaine/lidocaine/methylpred/dex; Phase 5 cluster references O2/sumatriptan/zolmitriptan/prednisone/verapamil/lithium/topiramate; Phase 6 trigeminal references carbamazepine/oxcarbazepine/baclofen/gabapentin/lamotrigine).

### 3.2 Files changed
- `src/data/drug-store.ts` — additions + indication subcategory entries per table above.
- `scripts/supabase-push.mjs` — already supports `--drugs` flag for new drugs; passing the new drug IDs as part of each consult push.

---

## 4. Phase 4 — Build `occipital-nerve-block` (Procedures category)

**Order rationale:** Build FIRST because it is the most license-risky (mandatory images) — surface licensing blockers before sunk-cost on the other consults.

### 4.1 Tree spec
- **ID:** `occipital-nerve-block`
- **Entry node:** `onb-start`
- **Category:** Procedures (single-list)
- **Module skeleton:** Indications → Anatomy/Landmarks → Pre-Procedure → Technique (Greater + Lesser variants) → Post-Procedure → Complications → Documentation
- **Estimated nodes:** 18–22
- **Critical actions:** Confirm correct side, palpate occipital artery (avoid intra-arterial), aspirate before injecting, do NOT inject if blood return.

### 4.2 EBM citation backbone (per node)
- **Indications node** — Cluster headache (acute + bridge), occipital neuralgia, cervicogenic HA, post-traumatic HA, status migrainosus refractory to IV cocktail. [Cit 1: AHS 2024 Cluster; Cit 2: Blumenfeld Headache 2013]
- **Anatomy node** — Greater occipital nerve (GON) origin C2 dorsal ramus, landmarks: 1/3 distance from external occipital protuberance (inion) to mastoid process, medial to occipital artery. Lesser occipital nerve (LON) lateral to GON. [Cit 3: Tubbs J Neurosurg 2007; Cit 4: NYSORA description — paraphrase, do not quote]
- **Pre-procedure node** — Consent, informed refusal documented; allergy check (amide LA cross-reactivity rare); anticoagulation status (relative CI for therapeutic INR >3 or new DOAC dose). [Cit 5: ASRA 2018]
- **Technique node** — Patient seated/prone, palpate inion + mastoid, mark 1/3 point, prep with chlorhexidine, 25–27 ga needle perpendicular to skull, advance until bone contact, withdraw 1–2 mm, aspirate, inject 2–3 mL bupivacaine 0.5% (± 40 mg methylprednisolone). [Cit 6: Tobin Headache 2009]
- **Steroid adjunct node** — Evidence mixed. RCT data (Ashkenazi Neurology 2008, Cuadrado Cephalalgia 2017) suggests steroid does not add to LA-alone in cluster. Use LA-only as default; steroid only for cervicogenic or hemicrania continua. [Cit 7, 8]
- **Post-procedure node** — Onset 5–15 min; duration LA 4–6 h, with steroid weeks–months; observe 15 min for vasovagal; document numbness distribution. [Cit 9: Levin Headache 2010]
- **Complications node** — Vasovagal syncope (1–3%), intra-arterial injection (rare, can cause seizure if vertebral system), local hematoma, alopecia at injection site (steroid), Cushingoid features (repeated steroid), allergy. [Cit 10]
- **Documentation node** — Procedure note template: indication, consent, side, landmarks, agent + dose + volume, complications, post-procedure exam.

### 4.3 Images — **commercial-license audit (BLOCKING)**

Per project CLAUDE.md image rules, source candidates filtered by license:

| Image need | Candidate source + URL | License (proof) | Decision |
|------------|------------------------|-----------------|----------|
| GON/LON anatomy (skull posterior, nerves of head/neck) | **Gray's Anatomy of the Human Body, 1918 ed., plate 800** (Henry Vandyke Carter, d. 1897). Wikimedia: `https://commons.wikimedia.org/wiki/File:Gray800.png` | `PD-old-100` (Carter d. 1897 → PD in US, UK, EU). 1918 ed. PD in US (pre-1928 publication). | **USE** — first choice. Verify license tag on file page at fetch time; downloaded copy stored at `docs/images/occipital-nerve-block/gray-posterior-head-nerves.png`. |
| GON anatomy alt (suboccipital region detail) | Gray's plate 793, Wikimedia: `https://commons.wikimedia.org/wiki/File:Gray793.png` | `PD-old-100` | **USE** if first image needs accompaniment. |
| Landmark photo (inion + mastoid + 1/3 markup) | **Generated PD-derived overlay** — annotate Gray's plate 800 with arrows + labels using a PD-safe editor; or NIH BioArt search `https://bioart.niaid.nih.gov/search?q=head+anatomy` (verify each return is US-Gov-Work / PD) | Derived from PD = PD | **USE** annotation if NIH BioArt has no clean match for landmark photo. Default to text + diagram if even annotation feels misleading vs a real photo. |
| Needle insertion technique | NIH BioArt: `https://bioart.niaid.nih.gov/search?q=injection+procedure` — verify each hit is US-Gov-Work | US-Gov-Work (17 USC §105) if NIH-employee authorship confirmed | **CHECK**; if absent, omit photo and rely on labeled anatomy diagram + numbered text technique steps. |
| **REJECT** | NYSORA original photos | proprietary / CC BY-NC | DO NOT USE — user request notwithstanding, project rule wins. |
| **REJECT** | UpToDate / Medscape / Radiopaedia (largely CC BY-NC-SA) | proprietary / CC BY-NC-SA | DO NOT USE. |
| **REJECT** | Wikimedia files licensed CC BY-x (most user-contributed photos) | CC BY family conflicts with commercial-no-attribution rule | DO NOT USE — per project CLAUDE.md image rules; Gray's plates are the only Wikimedia files that clear the bar by default. |

**Final license check (per project CLAUDE.md):** before commit, show Andy each candidate with direct URL + license-template excerpt from Commons description page (or curl-fetched NIH source page) + planned placement node + one-line clinical rationale. Wait for explicit approval.

**Fallback if no usable image:** ship occipital-nerve-block image-thin with Gray's plate(s) + numbered text technique sequence + no needle photo. Better to be image-thin than license-unsafe.

**Approval gate (project rule):** Before commit, show Andy each candidate image with: direct URL, license tag with verification evidence (curl -I + Commons description page screenshot or quote), exact planned placement node, and a one-line clinical rationale. Wait for explicit approval.

### 4.4 Files changed
- `src/data/trees/occipital-nerve-block.ts` — NEW.
- `src/data/trees/index.ts` — add export line.
- `src/data/categories.ts` — register under Procedures.
- `src/services/tree-service.ts` — add to TREE_REGISTRY loader.
- `src/data/info-pages.ts` — add ONB Steps Summary + ONB Stop page (mandatory).
- `src/data/stop-pages.ts` — add `onb-stop` entries.
- `src/data/toolbar-configs.ts` — add `occipital-nerve-block` toolbar (Anatomy overlay, Steps, Stop, Home, ⋯).
- `docs/images/occipital-nerve-block/` — NEW directory, only approved-license images.
- `scripts/tree-registry.mjs` — add `occipital-nerve-block` to the central TREE_REGISTRY (single source of truth shared by both Supabase scripts).
- `scripts/generate-supabase-sql.mjs` — verify it consumes `tree-registry.mjs`; if it still has a local TREE_REGISTRY copy, replace with an import from the central file.
- `scripts/supabase-push.mjs` — same: import from `tree-registry.mjs`. (R4-L2: file lists previously pointed at the script-local copies before centralization landed.)
- ~~`docs/sw.js`~~ — removed per R6 + R2-L1/R4-L1: `ASSETS_TO_CACHE` is regenerated by `scripts/deploy-cache-sync.mjs` on every code phase and already covers `docs/images/<tree-id>/`. NEVER hand-edit.

### 4.5 Validation
- All drug links resolve; weightCalc on bupivacaine if mg/kg dosing referenced (max 2 mg/kg plain).
- All `[N]` citation refs in node bodies have entries in CITATIONS array.
- Images < 500 KB JPG or scalable SVG; if larger, `sips -Z 1200 <file> -s formatOptions 78`.

---

## 5. Phase 5 — Build `cluster-headache` (Neurology, optional EM cross-list)

**Order rationale:** Cluster references `occipital-nerve-block` (built in Phase 4) and is a prerequisite of `headache-hub` (Phase 7).

### 5.1 Tree spec
- **ID:** `cluster-headache`
- **Entry node:** `cluster-start`
- **Category:** Neurology (primary). **Cross-list to EM** because attacks frequently land in ED and the acute rx is ED-specific. Pattern: register `id: 'cluster-headache'` in both Neurology and EM `decisionTrees[]` blocks in `categories.ts`; canonical `categoryId: 'neurology'` in `tree-service.ts`.
- **Module skeleton (8 modules):** Recognition (ICHD-3 cluster vs migraine) → Red Flags (must exclude SAH, dissection, CVST, hypertensive emerg, glaucoma — **link DIRECTLY to existing standalone consults `#/tree/sah`, `#/tree/cervical-artery-dissection`, `#/tree/cvst`, `#/tree/htn-pregnancy`, `#/tree/aacg` — NEVER link back to `#/tree/headache-hub`** per R8 cross-link directionality rule) → Acute Treatment Algorithm → Bridge Therapy → Maintenance Prophylaxis (verapamil + titration + ECG) → Refractory (lithium, topiramate, occipital block referral) → Patient Education → Disposition
- **Estimated nodes:** 24–28
- **Critical actions:** O2 must be high-flow non-rebreather ≥12 L/min × 15 min (NOT nasal cannula). SQ sumatriptan onset ≤15 min. ECG before every verapamil titration. Lithium level monitoring.

### 5.2 EBM citation backbone (key nodes)
- Acute O2: 100% O2 12–15 L/min via NRB × 15 min, 78% response in ≤15 min. [Cit: Cohen JAMA 2009; AAN 2024]
- SQ sumatriptan 6 mg: ≤15 min response 74%. [Cit: Ekbom NEJM 1991; AHS 2024]
- Intranasal zolmitriptan 5 mg: alternative when SQ not tolerated. [Cit: Cittadini Arch Neurol 2006]
- Bridge: prednisone 60 mg × 5 d → taper 10 mg q2d; OR greater occipital nerve block (link `#/tree/occipital-nerve-block`). [Cit: Mir Cephalalgia 2003; Leroux Cephalalgia 2011]
- Verapamil titration: 80 mg TID → +80 mg q2wk → max 960 mg/d; **ECG before EVERY titration step**, halt if PR >0.24 s or new heart block. [Cit: Cohen Neurology 2007]
- Lithium 300 mg BID → titrate to level 0.6–0.8 mEq/L. [Cit: Bussone Headache 1990]
- Topiramate 25 mg qHS → titrate to 100 mg/d. [Cit: Láinez Headache 2003]
- ICHD-3 cluster criteria. [Cit: IHS Cephalalgia 2018; ICHD-3 §3.1]

### 5.3 Dependencies
- **Phase 3 must merge first** (sumatriptan, zolmitriptan, prednisone, verapamil, lithium, topiramate entries).
- **Phase 4 must merge first** (occipital-nerve-block tree exists so `#/tree/occipital-nerve-block` resolves).

### 5.4 Files changed
- `src/data/trees/cluster-headache.ts` — NEW.
- `src/data/trees/index.ts` — add export.
- `src/data/categories.ts` — TWO entries (Neuro primary + EM cross-list).
- `src/services/tree-service.ts` — TREE_REGISTRY entry (canonical Neurology).
- `src/data/info-pages.ts` — Cluster Steps Summary, Cluster Stop page.
- `src/data/stop-pages.ts` — `cluster-stop` entries (5–10 items: "Do NOT use nasal cannula instead of NRB for O2 trial", "Do NOT start verapamil without baseline ECG", "Do NOT give triptan if used ergot within 24 h", etc.).
- `src/data/toolbar-configs.ts` — `cluster-headache` toolbar: ICHD-3, Tx Algo, Verapamil Titration calc, Bridge Plan, Stop, Home, ⋯.
- `scripts/tree-registry.mjs` — add `cluster-headache` to the **central** TREE_REGISTRY. Both `generate-supabase-sql.mjs` and `supabase-push.mjs` import from this central file (verify both still consume it).
- `docs/sw.js` — no new images (unless added).

---

## 6. Phase 6 — Build `trigeminal-neuralgia` (Neurology, standalone)

### 6.1 Tree spec
- **ID:** `trigeminal-neuralgia`
- **Entry node:** `tn-start`
- **Category:** Neurology (single-list; not primarily an ED diagnosis though presentations occur).
- **Module skeleton (7 modules):** Recognition (paroxysmal unilateral V2/V3 electric shock, triggers) → Differential (rule out secondary TN — MS, tumor, vascular loop; MRI indications) → ICHD-3 / Burchiel classification → 1L Carbamazepine titration (with HLA-B\*1502 banner) → Ladder (Oxcarbazepine 2L → Baclofen / Gabapentin / Lamotrigine adjuncts) → Surgical referral criteria (microvascular decompression, percutaneous glycerol/balloon/RF rhizotomy, gamma knife) → Disposition + Patient Education
- **Estimated nodes:** 20–24
- **Critical actions:** HLA-B\*1502 screen before CBZ in at-risk ancestry (Han Chinese, Thai, Vietnamese, Filipino, Malay). Sodium monitoring on oxcarbazepine (hyponatremia). Pregnancy CI on CBZ + valproate.

### 6.2 EBM citation backbone (key nodes)
- ICHD-3 §13.1.1 TN criteria. [Cit: IHS Cephalalgia 2018]
- Burchiel classification (TN1 vs TN2). [Cit: Burchiel Neurosurgery 2003]
- CBZ 1L: starting 100 mg BID, titrate by 100–200 mg q3d, target 600–1200 mg/d. NNT ~2 (Wiffen Cochrane 2014). HLA-B\*1502 FDA boxed warning 2007.
- Oxcarbazepine 2L: 150 mg BID, titrate to 1200 mg/d. [Cit: Cruccu Neurology 2008]
- Baclofen adjunct: 5 mg TID titrate. [Cit: Fromm Ann Neurol 1984]
- Gabapentin adjunct: 300 mg qHS titrate to 1800–3600 mg/d. [Cit: Cheshire J Pain 2002]
- Lamotrigine: slow titration (SJS risk). [Cit: Zakrzewska Pain 1997]
- MVD criteria: TN refractory to medical management, age <70, life expectancy >5 y, MRI shows neurovascular conflict. [Cit: AAN/EFNS Cruccu 2008]
- Glycerol rhizotomy: medically refractory + poor surgical candidate. [Cit: Lopez Neurosurgery 2004]
- Gamma knife: noninvasive option, lower immediate efficacy but better long-term tolerability. [Cit: Régis J Neurosurg 2006]

### 6.3 Dependencies
- **Phase 3 must merge first** (carbamazepine, oxcarbazepine, baclofen, gabapentin, lamotrigine entries with indication-aware blocks).

### 6.4 Files changed
- `src/data/trees/trigeminal-neuralgia.ts` — NEW.
- `src/data/trees/index.ts` — add export.
- `src/data/categories.ts` — Neurology entry only.
- `src/services/tree-service.ts` — TREE_REGISTRY entry.
- `src/data/info-pages.ts` — TN Steps Summary, TN Stop page.
- `src/data/stop-pages.ts` — `tn-stop` (curated list, ≥5 ≤10): "Do NOT start CBZ without HLA-B\*1502 screening in at-risk ancestry (Han Chinese / Thai / Vietnamese / Filipino / Malay) — risk of Stevens-Johnson/TEN"; **"Do NOT switch CBZ-associated hyponatremia to oxcarbazepine — oxcarbazepine causes MORE hyponatremia (15–30% incidence vs CBZ ~10%); stop the offending sodium-lowering anticonvulsant, correct Na, switch to non-Na-lowering alt (gabapentin, baclofen, lamotrigine) with neurology input"** [Cit: Dong J Headache Pain 2005; Berghuis Epilepsia 2017]; "Do NOT give CBZ or valproate in pregnancy first trimester unless benefit outweighs risk (teratogenic)"; "Do NOT escalate lamotrigine faster than label — Stevens-Johnson risk dose-related and titration-rate-related"; "Do NOT assume TN diagnosis without MRI in patients <40 yo, with bilateral symptoms, or with sensory deficit — secondary TN (MS, tumor, vascular loop) requires imaging"; "Do NOT delay surgical referral if medically refractory by AAN/EFNS definition (failure of ≥2 first-line agents at adequate dose/duration with disabling pain)"; "Do NOT discharge with acute TN crisis without addressing fluid + nutrition (severe pain often causes dehydration / weight loss)".
- `src/data/toolbar-configs.ts` — `trigeminal-neuralgia` toolbar: ICHD-3, Rx Ladder, HLA Screen, Refer Criteria, Stop, Home, ⋯.
- `scripts/tree-registry.mjs` — add `trigeminal-neuralgia` to the central TREE_REGISTRY.

---

## 7. Phase 7 — Build `headache-hub` (HUB — dual-list EM + Neurology)

**Order rationale:** Built LAST so all cross-links resolve.

### 7.1 Tree spec
- **ID:** `headache-hub`
- **Entry node:** `hh-start` (= Red Flag Screener root)
- **Category:** Dual-list — Emergency Medicine + Neurology. Both entries point to same tree ID; canonical `categoryId: 'emergency-medicine'` in `tree-service.ts` (since presenting complaint is ED-led).
- **Type flag:** `type: 'hub'` (first consumer of this field).
- **Modules (6, MUST follow spec skeleton):**
  1. **Red Flag Screener** (root) — SNOOP10 inline checklist + thunderclap branch (→ SAH consult), trauma branch (→ TBI), pregnancy branch (→ HTN-in-pregnancy / pre-eclampsia + RCVS), AMS branch (→ stroke / meningitis / ICH consults), eye-pain branch (→ AACG). Each red flag = a direct jump to the relevant existing or new consult.
  2. **Differential Triage** — categorize by phenotype: (a) thunderclap → SAH/RCVS/dissection; (b) progressive/positional → IIH/CVST/tumor; (c) episodic recurrent → migraine/cluster/tension; (d) facial neuralgia → trigeminal-neuralgia; (e) painful eye → AACG; (f) toxic-metabolic → CO toxicity/uremic. Each category = card opening "is this it?" screener that links OUT to the deep-dive.
  3. **Common Workup** — vitals trend, fundoscopy, neuro exam (cerebellar + cranial nerves), CT vs LP decision tree, ESR/CRP if temporal arteritis suspected, CO-Hgb if winter/heater exposure, tox screen, β-hCG if reproductive age. NO duplicate clinical content with deep-dives — workup is the shared layer.
  4. **Calculator Toolbar** — 12 tools (5 visible + 7 in More), per Phase 2 inventory.
  5. **Cross-Link Map** — visible card listing every linked consult with one-line "when to pick this": Cluster, Trigeminal Neuralgia, Occipital Nerve Block (procedure), Migraine (existing), AACG (existing), plus the red-flag destinations (SAH, ICH, meningitis, IIH, CVST, dissection, HTN-pregnancy, CO toxicity).
  6. **Disposition Anchor** — admit / observe / discharge criteria common to undifferentiated HA: admit if (red flag + workup positive, status migrainosus, intractable pain after 2× rescue cycles, CO ≥25%, suspected CNS infection, hypertensive emergency); discharge with PCP / neuro followup if (clear primary HA dx + treated + return precautions given); return precautions handout (`shareable: true` info page).

### 7.2 Estimated nodes: 32–38 (root + 6 modules + branch cards + cross-link map)

### 7.3 EBM citation backbone
- ACEP 2019 Clinical Policy on Acute Headache. [Cit 1]
- AHS 2021 Migraine Acute Tx Consensus. [Cit 2]
- AAN 2024 Cluster Treatment. [Cit 3]
- ICHD-3 (IHS Cephalalgia 2018). [Cit 4]
- Perry Ottawa SAH Rule (JAMA 2013, validation 2017). [Cit 5, 6]
- Edlow Lancet Neurol 2008 — approach to acute HA. [Cit 7]
- ACOG 2019 Headache in Pregnancy. [Cit 8]
- UHMS 2019 HBO indications (CO). [Cit 9]
- Cochrane reviews per drug (CBZ TN, sumatriptan cluster, etc.). [Cit 10–14]

### 7.4 Cross-link integrity gate — **repo-wide, not just hub file**

- Hub file referenced links: `#/tree/cluster-headache`, `#/tree/trigeminal-neuralgia`, `#/tree/occipital-nerve-block`, `#/tree/migraine`, `#/tree/aacg`, `#/tree/sah`, `#/tree/ich`, `#/tree/meningitis`, `#/tree/iih`, `#/tree/cvst`, `#/tree/co-toxicity`, `#/tree/htn-pregnancy`.
- **New script: `scripts/validate-cross-links.mjs`** — repo-wide validator. Walks every file in `src/data/trees/`, `src/data/toolbar-configs.ts`, `src/data/info-pages.ts`, `src/data/stop-pages.ts`, `src/data/drug-store.ts`. Extracts every `#/tree/<id>`, `#/info/<id>`, `#/node/<id>`, `#/drug/<id>(/<hint>)?`, and `images/<path>` reference. Asserts each target exists in the respective registry (TREE_REGISTRY, INFO_PAGES, STOP_PAGES, DRUG_STORE, filesystem under `docs/`). Exits non-zero on any miss. Runs as a pre-deploy gate (added to `/deploy` skill checks, or run manually before each of the 4 deploys).
- Coverage includes all 4 new consults PLUS regression coverage of existing trees touched (none should be touched, but the validator catches accidental rot).

### 7.5 Files changed
- `src/data/trees/headache-hub.ts` — NEW. Includes `type: 'hub'` metadata.
- `src/data/trees/index.ts` — add export.
- `src/data/categories.ts` — TWO entries (EM + Neuro), both with `type: 'hub'` field.
- `src/services/tree-service.ts` — TREE_REGISTRY entry (canonical `categoryId: 'emergency-medicine'`).
- **`scripts/supabase-push.mjs`** — add to `CROSS_LISTINGS` map (verified at line 262): `'headache-hub': [{ categoryId: 'neurology', displayTitle: null, displaySubtitle: null, entryNodeId: 'hh-start' }]`. **This is the third registry per R5; categories.ts alone is insufficient for Supabase.**
- **`scripts/generate-supabase-sql.mjs`** — equivalent CROSS_LISTINGS entry (if it has its own map; verify and update both).
- `src/data/info-pages.ts` — HH Red Flags overlay, HH Workup overlay, HH Disposition overlay, HH Return Precautions (shareable).
- `src/data/stop-pages.ts` — `headache-hub-stop` ("Do NOT discharge thunderclap HA without SAH workup — CT within 6 h is sensitive, LP if later or non-diagnostic CT", "Do NOT give triptan in basilar/hemiplegic migraine", "Do NOT lights-off-in-quiet-room a possible AACG", "Do NOT delay CO-Hgb measurement if winter / heater / multi-patient HA cluster", "Do NOT order LP for thunderclap HA without checking platelets + INR + neuro exam", "Do NOT treat pregnant headache with ergot, valproate, or NSAIDs after 30 wk").
- `src/data/toolbar-configs.ts` — `headache-hub` toolbar with all 12 tools; mark 5 highest-priority as `pinned: true`: SNOOP10, Ottawa SAH, ICHD-3, Cluster/Migraine/Tension Differentiator, Triptan Eligibility/CI. Other 7 in Tools drawer.
- `scripts/tree-registry.mjs` — add `headache-hub` to the central TREE_REGISTRY with `type: 'hub'` metadata; both Supabase scripts import from this file.

---

## 8. Phase 8 — **Staged-Then-Flip** Deploy (single SW bump, batched visibility)

**Strategy shift from round 2** (per R15): instead of 4 sequential full deploys (which would force 4 DATA_VERSION wipes + 4 SW reloads per user), stage all 4 payloads behind hidden category listings, validate, then do a SINGLE visibility flip + single SW/data bump. Net user impact: 1 reload instead of 4; all 4 consults appear simultaneously, not staggered.

**Project rule (2026-05-16):** multi-consult queues are STRICTLY sequential even within the staging stage. Parallel writers clobber `cache-db.ts` DATA_VERSION, `categories.ts`, `tree-service.ts`, `index.ts`.

**Bypass for `/deploy` double-push (R8/Codex H2):** the project `/deploy` skill also runs `supabase-push.mjs`. To avoid double-push during staging, the staging step uses `supabase-push.mjs --no-visibility` directly; the FINAL flip deploy uses `/deploy` (which will then push the now-fully-staged data + write the previously-skipped `category_trees` rows because `categories.ts` will include them at that point).

### 8.1 Pre-staging gate (all 4 consults locally complete)

- All Phase 4–7 file changes committed locally on a feature branch.
- `bunx tsc --skipLibCheck --noUnusedLocals false` clean.
- `node scripts/validate-cross-links.mjs --all` (repo-wide) — exits non-zero on any broken `#/tree/`, `#/info/`, `#/node/`, `#/drug/`, `images/` reference. Validates against compiled `docs/` output too, not just source.
- Citation-Freeze deliverables present: `citations-frozen.json` per consult.
- Image license approvals captured (Andy explicit approval for each image in `occipital-nerve-block`).

### 8.2 Staging stage (hidden in production, validated)

For each consult, sequentially:

1. **Snapshot existing prod state** (R12): `node scripts/supabase-snapshot.mjs <id>` writes pre-push JSON to `supabase-snapshots/<id>-<UTC-timestamp>.json`. For a new consult this snapshot is empty (no prior rows) and rollback = DELETE.
2. **Hidden push:** `node scripts/supabase-push.mjs --no-visibility <id>` writes `decision_trees` + `tree_citations` + `decision_nodes` + new/updated `drugs` + new `info_pages` but **skips `category_trees`** (= invisible to UI category lists; users on current prod see no change).
3. **Hidden smoke:** `node scripts/supabase-smoke.mjs --hidden <id>` validates beyond row counts:
   - `decision_trees.entry_node_id` matches `entryNodeId` in `categories.ts` literal.
   - `decision_nodes` contains the entry node ID.
   - `tree_citations[1]` exists and `.text` matches frozen-citations file.
   - For each drug indication block referenced by tree links: `drugs.id + indication subcategory` exists.
   - For each `#/info/<id>` link: `info_pages.id` exists.
   - For each calculator target: calculator ID exists in compiled `docs/components/calculator.js` registry.
   - For each `images/<path>`: file exists in `docs/images/`.
   - For each cross-tree `#/tree/<id>`: target tree's `decision_trees` row exists.
4. **Repo-wide validator against compiled docs:** `node scripts/validate-cross-links.mjs --against-docs <id>` confirms all links resolve in the bundled JS output, not just source.

Do all 4 consults staged + validated before proceeding to flip. **Hidden state is reversible by single DELETE** if any consult fails — no SW bump, no user-visible change.

### 8.3 Flip stage — **per-split canary flips (R18), NOT batch flip**

**Initial code-push** (single SW bump): once all 4 are staged + hidden-smoke green AND **Phase 9a pre-flip BLOCKING audits clean** (R17), commit the code (`categories.ts`, `tree-registry.mjs`, toolbar-configs, calculators, feature-flags.ts with all 4 IDs in `hiddenTreeIds`, validators, snapshot/rollback scripts, image manifests) and invoke `/deploy` ONCE. After this push:
- All 4 trees are registered in `tree-registry.mjs` and visible in source.
- All 4 trees are HIDDEN at runtime via `FLAGS.hiddenTreeIds = ['occipital-nerve-block', 'cluster-headache', 'trigeminal-neuralgia', 'headache-hub']`.
- `category_trees` rows for the 4 already exist in Supabase from the staging push (R20 additive safety preserved — existing consults unaffected).
- Single SW reload for end users; nothing new is visible to them yet.

**Then perform per-split canary flips in canary order (R18):**

| # | Consult | Why this order | Soak before next flip |
|---|---------|----------------|----------------------|
| 1 | `occipital-nerve-block` | Lowest blast radius — Procedures-only, no inbound cross-links from existing consults | 24 h (1 h if no remote telemetry sink per R19) |
| 2 | `trigeminal-neuralgia` | Neurology-only, no cross-links to other new consults | 24 h / 1 h |
| 3 | `cluster-headache` | Links OUT to occipital-nerve-block (now visible) | 24 h / 1 h |
| 4 | `headache-hub` | LAST — links into all 3 new + existing migraine/aacg/sah/etc. | — |

Each flip step:
1. **Pre-flip checks:** Phase 9a audit for THIS consult is clean (HIGH=0); previous canary's gate (R18) passed.
2. **Flip command:** edit `src/data/feature-flags.ts` removing this ID from `hiddenTreeIds` → `Skill tool → skill: "deploy"`.
3. **Verify GH Pages build:** `gh run list --limit 1 --workflow=pages-build-deployment --json status,conclusion` — block on `conclusion=success`.
4. **Production smoke (1 min, mobile Safari):** load consult from `kittechsix-blip.github.io/mymedkitt/`; verify entry node renders; verify ≥3 cross-links resolve; verify any toolbar `action: 'route'` works; for hub specifically, verify `🧰 Tools ▾` opens with 7 items and `•••` opens Decision Map separately.
5. **Git tag:** `git tag deploy/<UTC-timestamp>-<consult-id> && git push --tags`.
6. **Telemetry / manual gate:** in remote-sink mode (R19), monitor for 24 h: zero `link_resolution_error`, zero `route_action_error`, hardcoded-fallback rate <5%; in no-sink fallback mode, 1 h manual soak + check console.warn `[telemetry]` log on a test device. Run Phase 9b post-flip confirmation audit for this consult.
7. **If any gate fails:** put ID back in `hiddenTreeIds` → `/deploy` (≤2 min revert). Investigate. Fix locally. Re-run Phase 9a for this consult. Re-flip.
8. **Proceed to next flip** only after gates green.

### 8.4 Per-deploy checks (project rule, before every `git commit`)
- `git status` — confirm only intended files staged; never `git add -A`.
- `git reflog -n 5` — confirm no parallel HEAD movements from another session.
- If parallel activity detected → STOP, branch off, surface to Andy.

### 8.5 Failure modes
- **Hidden push fails on consult N:** snapshot exists, run rollback (Phase 8a) on that consult, fix, re-stage. Other staged consults unaffected (still hidden, still good).
- **Hidden smoke fails on consult N:** investigate without touching production (consult is hidden). Fix and re-push. No user impact.
- **Cross-link validator fails at flip gate:** block the flip. Fix the broken side, re-run staging+smoke for affected consult, then re-attempt flip.
- **Flip deploy Supabase write fails on `category_trees`:** consults remain hidden (visibility never flipped); `/deploy` exits non-zero per Phase 1.6 hardening; investigate, retry. Hardcoded fallback in `tree-service.ts` still serves correct content for users who fetch via hash route directly (`#/tree/cluster-headache`) even without category visibility.
- **GH Pages build fails after flip:** roll back via Phase 8a (git revert + DELETE category_trees + cache bump).
- **Image license challenge post-deploy:** Andy or DrK rejects an image → replace with text-only or annotated Gray's plate; one commit + redeploy (this is a normal hotfix, not full rollback).

---

## 8a. Phase 8a — Rollback Runbook (R12)

**Trigger conditions:** Pages build fails post-flip; production smoke surfaces broken cross-links or route errors; DrK/FlowRider audit reveals clinical or UX defect requiring revert before fix; telemetry alert (hardcoded-fallback >5%, link_resolution_error >0).

### 8a.1 Rapid disable (≤2 min, no DB change needed)

If the defect is a UI primitive (Tools drawer broken, route action throws, hub renders wrong): flip the relevant kill switch in `src/data/feature-flags.ts` and `/deploy`:
- Bad hub render → `hiddenHubs: ['headache-hub']` + `/deploy`.
- Bad route action → `routeActionEnabled: false` + `/deploy`. (IIH tool falls back to a no-op; user sees the tool but tap does nothing — log a follow-up to convert to an overlay-link in that case.)
- Bad Tools drawer → `toolbarOverflowEnabled: false` + `/deploy`. (Headache-hub falls back to all 12 toolbar items inline; ugly but functional.)
- Specific consult broken → add to `hiddenTreeIds` + `/deploy`.

### 8a.2 Full content rollback (clinical content defect)

1. **Identify deploy tag:** `git tag --list 'deploy/*-headache-hub-batch'` — find the bad deploy.
2. **Rollback Supabase per consult:** for each of the 4 consults: `node scripts/supabase-rollback.mjs supabase-snapshots/<id>-<UTC-timestamp>.json`. This: (a) restores pre-push snapshot rows for each table; (b) for net-new consults whose snapshot is empty, DELETEs `category_trees` then `decision_nodes` then `tree_citations` then (selectively) `drugs` and `info_pages` rows that did not exist before push (tracked via snapshot delta).
3. **Git revert:** `git revert -m 1 <deploy-merge-commit>` (or revert the squash commit if not merged) → push → GH Pages rebuilds → `/deploy` skill bumps CACHE_NAME + DATA_VERSION on the revert commit so clients invalidate.
4. **Scout state rollback:** `node ~/Desktop/claude-brain/bin/scout-state-update.mjs --consult <id> --status deferred --rollback-of <bad-commit-sha>` for each of 4 consults.
5. **Verify revert:** `gh run list --limit 1 --workflow=pages-build-deployment` → success; manual smoke each consult is now absent or pre-deploy version; telemetry returns to baseline.
6. **Notify Andy** with summary: what was rolled back, why, what the fix path is, ETA for re-deploy.

### 8a.3 Partial rollback (one of 4 consults defective)

If only consult X is bad post-flip:
1. **Kill switch first:** add `hiddenTreeIds: ['<id>']` → `/deploy`. Other 3 stay visible.
2. **Targeted Supabase delete:** `DELETE FROM category_trees WHERE tree_id='<id>'` (UI-invisible), keep `decision_nodes` etc. for forensic inspection.
3. **Fix locally, re-stage, re-flip just that consult** using the staged-then-flip pattern (steps 8.2 + visibility flip for that one consult). Single targeted deploy.

### 8a.4 Snapshot retention

- Snapshots retained for 30 days, then archived.
- One snapshot per consult per deploy (overwrite same-day re-deploys is fine — use UTC timestamp in filename for ordering).
- Document snapshot file format inline in `scripts/supabase-snapshot.mjs` header comment.

---

## 8b. Phase 8b — Telemetry + Alerting Wire-Up (R13)

### 8b.1 Events to emit
- `tree_load_source` { tree_id, source: 'supabase' | 'indexeddb' | 'hardcoded' }
- `tree_load_error` { tree_id, error_type, message }
- `link_resolution_error` { link_type: 'tree' | 'info' | 'node' | 'drug', link_target, source_tree_id, source_node_id }
- `route_action_error` { target_tree_id, error }
- `calculator_error` { calculator_id, error }
- `hub_module_view` { hub_id, module_index }
- `sw_version` { cache_name } — emitted on app boot, once per session
- `data_version` { data_version } — emitted on app boot, once per session

### 8b.2 Privacy floor
- Tree-ids, node-ids, calculator-ids, version strings ONLY.
- NO user input, NO patient context, NO clinical decision content.
- NO IP, NO device fingerprint beyond what an HTTPS request inherently carries.

### 8b.3 Sink
- Verify `src/services/kittmd-analytics.ts` current sink address with Andy before Phase 1 merge.
- If no remote sink exists today: log to `console.warn('[telemetry]', ...)` and add TODO for v2 sink integration. Post-deploy, scrape browser DevTools console for the first 24 h as a manual alert mechanism.

### 8b.4 Alert thresholds (24 h post-flip)
| Event | Threshold | Action |
|-------|-----------|--------|
| `tree_load_source: 'hardcoded'` rate | >5% of total `tree_load_source` events | Investigate Supabase health; consider rollback if persistent. |
| `link_resolution_error` count | >0 over 24 h | Hotfix or revert; broken cross-link in production. |
| `route_action_error` count | >0 over 24 h | Hotfix or kill `routeActionEnabled` flag. |
| `calculator_error` count | >2 over 24 h on same calculator_id | Hotfix the calculator. |
| `tree_load_error` count | >0.1% of `tree_load_source` events | Investigate. |

---

## 9. Phase 9 — DrK Clinical Audit + FlowRider UX Audit (concrete invocations)

**Per project CLAUDE.md:** auditor agents emit findings → consolidate through Andy as single source of truth.

### 9.0 PRE-FLIP audit gate (R2-M5 + R4-H5 + R5-H3) — blocking, **per canary flip**

**Why:** original Phase 9 ran DrK + FlowRider only AFTER the flip. Round 4 ops review flagged this; round 5 deepened: with per-split canary flips (R18 / Phase 8.3), audits must run per-consult BEFORE that consult's `hiddenTreeIds` removal. New rule: both agents run BEFORE each canary flip, against the LOCAL compiled build (`bunx tsc` clean + `python3 -m http.server` serving `docs/`, with `FLAGS.hiddenTreeIds` LOCALLY cleared so the auditor can actually load the tree). Same prompt body as 9.1 / 9.2, with two changes: target is `http://localhost:8000` instead of GH Pages URL, and the agents emit a single-line **gate verdict** before posting findings.

**Timing alignment with Phase 8.3 per-split canary flips:**
1. Run 9a for `occipital-nerve-block` → gate PASS → Phase 8.3 flip step 1 (remove ID, deploy, soak).
2. Run 9a for `trigeminal-neuralgia` → gate PASS → Phase 8.3 flip step 2.
3. Run 9a for `cluster-headache` → gate PASS → Phase 8.3 flip step 3.
4. Run 9a for `headache-hub` → gate PASS → Phase 8.3 flip step 4.
After each flip, Phase 9b runs the same audits against production URL (`https://kittechsix-blip.github.io/mymedkitt/`) for confirmation.

**Gate verdict format** (first line of the agent's response, parsed by the staging-stage controller):

```
GATE: BLOCK   reason="<one-sentence summary of highest-severity finding>"
GATE: PASS    reason="no HIGH-severity findings; <N> AUTO-FIX applied inline; <M> FLAGGED for Andy"
GATE: WARN    reason="HIGH-severity finding categorized as AUTO-FIX and applied; verify on re-audit"
```

**Decision matrix:**
- Any agent emits `GATE: BLOCK` → flip aborts; surface to Andy with the reason; fix forward; re-run gate.
- `GATE: PASS` from both agents → proceed to Phase 8.3 flip. Original Phase 9.1 / 9.2 post-flip runs are kept as confirmation (catches anything that only manifests on the production URL — e.g., service-worker activation order, real-CDN image fetch).
- `GATE: WARN` from either → Andy approves continue or block. AUTO-FIX items applied inline must be re-audited on the post-flip run.

**Categorization rules** (carried into 9.1 / 9.2):
- **HIGH-severity** = wrong drug dose, contraindication missed, dead cross-link in resus-critical path, calculator returns clinically wrong output → BLOCK by default.
- **AUTO-FIX** = unambiguous typo, citation URL fix, image alt-text addition, missing `urgency: 'warning'` on a known-flagged node → fix inline, emit WARN.
- **FLAGGED** = clinical judgment call, dosing question requiring Andy's input, image laterality question → block UNTIL Andy answers, do not auto-resolve.
- **PROPOSAL** = nice-to-have, UX polish, alternative phrasing → tracked in claude-mem with `Proposal` tag; non-blocking.

**Pre-deploy invocations** (one per consult, sequentially):

```
Skill tool → bunx tsc --skipLibCheck --noUnusedLocals false        # compile clean
python3 -m http.server 8000 --directory docs &                     # serve compiled docs/
LOCAL_BASE_URL=http://localhost:8000 \
  Agent tool → subagent_type: "Dr. Kitlowski" with prompt 9.1 body, target=$LOCAL_BASE_URL
LOCAL_BASE_URL=http://localhost:8000 \
  Agent tool → subagent_type: "Flow Rider"   with prompt 9.2 body, target=$LOCAL_BASE_URL
kill %1                                                            # stop the local server
```

Repeat for each of the 4 consults. Gate verdicts logged to `.deploy-state/audit-gate-<id>-<iso>.md` for the rollback runbook to reference.

### 9.1 DrK invocation (per consult, sequentially)

```
Agent tool → subagent_type: "Dr. Kitlowski"
prompt: "Clinical content audit of consult <tree-id> in myMedKitt at ~/Desktop/myMedKitt/src/data/trees/<tree-id>.ts.
Verify: (1) ICHD-3 criteria phrasing accurate paraphrase, no verbatim block quotes;
(2) every drug dose matches cited source per [N] citation; (3) every weightCalc field correct;
(4) critical-action red banners present on: verapamil ECG monitoring requirement, HLA-B*1502 screening
for CBZ in at-risk ancestry, triptan/SSRI serotonin syndrome warning, triptan+ergot 24h rule,
pregnancy contraindications (ergots, DHE, valproate, CBZ), occipital block aspirate-before-inject;
(5) for occipital-nerve-block images: anatomical correctness, laterality, labeling clarity,
license/source tag present, would image mislead a learner;
(6) stop page has 5–10 items, each links to a relevant node, each is a real pitfall.
Post findings via mcp__plugin_claude-mem_mcp-search__save_memory with tag 'DrK Audit' and project 'myMedKitt'.
Categorize each finding as FLAGGED (needs Andy approval), AUTO-FIX (already safe to apply), or PROPOSAL (discussion)."
```

Run for each of: occipital-nerve-block, cluster-headache, trigeminal-neuralgia, headache-hub. **Sequential, not parallel** (project rule for multi-consult queues; though audits are read-only, sequentialism keeps claude-mem write order coherent).

### 9.2 FlowRider invocation (per consult)

```
Agent tool → subagent_type: "Flow Rider"
prompt: "UX audit of consult <tree-id> in myMedKitt.
Verify: (1) decision card flow — each branch terminates in coherent disposition or cross-tree jump,
no dead-ends; (2) 🧰 Tools ▾ drawer (if present) opens cleanly on iOS Safari with no hash-routing
conflicts, separate from ••• Decision Map; (3) cross-tree action:'route' jumps update hash correctly
and rebuild the destination tree without console errors; (4) mobile: 44px min touch targets,
image readability at iPhone SE width, caption clarity at decision point; (5) hub-specific —
clinician reaches correct deep-dive in ≤3 taps from chief complaint screen.
Post findings via mcp__plugin_claude-mem_mcp-search__save_memory with tag 'FlowRider UX' and project 'myMedKitt'.
Categorize as FLAGGED / AUTO-FIX / PROPOSAL."
```

### 9.3 Consolidation
- Next myMedKitt session's startup check (per project CLAUDE.md "Agent Reports" section) picks up the tagged findings.
- I consolidate FLAGGED + AUTO-FIX + PROPOSAL items into a single message to Andy.
- Andy reviews FLAGGED items, AUTO-FIX items already pre-applied for him to review, PROPOSALS surface for discussion.

### 9.4 Fallback if subagent unavailable
If `Dr. Kitlowski` or `Flow Rider` subagent type is not registered at runtime (verify via Agent tool error), fall back to `general-purpose` subagent with the same prompt body, prefixing: "Act as a senior EM physician [or UX reviewer] performing the following audit." Manual fallback only if Agent tool itself fails: read consult file + render checklist via Claude main thread.

---

## 10. Phase 10 — Initialize `eb-med-scout-state.json` + Schema

**File does not exist yet** (`find` returned nothing). Phase 10 creates it.

### 10.1 Path
- `~/Desktop/claude-brain/state/eb-med-scout-state.json`
- Create parent directory if absent (`mkdir -p ~/Desktop/claude-brain/state`).

### 10.2 Schema (v1) — commit-bound and status-aware

```json
{
  "schema_version": 1,
  "last_updated": "2026-05-22T00:00:00Z",
  "consults": {
    "headache-hub": {
      "status": "built",
      "built_on": "2026-05-22",
      "verified_at": "2026-05-22T00:00:00Z",
      "commit_sha": "<git rev-parse HEAD at deploy time>",
      "type": "hub",
      "parent_hub": null,
      "specialties": ["emergency-medicine", "neurology"]
    },
    "cluster-headache": { "status": "built", "built_on": "2026-05-22", "verified_at": "...", "commit_sha": "...", "type": "standard",  "parent_hub": "headache-hub", "specialties": ["neurology", "emergency-medicine"] },
    "trigeminal-neuralgia": { "status": "built", "built_on": "2026-05-22", "verified_at": "...", "commit_sha": "...", "type": "standard",  "parent_hub": "headache-hub", "specialties": ["neurology"] },
    "occipital-nerve-block": { "status": "built", "built_on": "2026-05-22", "verified_at": "...", "commit_sha": "...", "type": "procedure", "parent_hub": "headache-hub", "specialties": ["procedures"] }
  },
  "hubs": {
    "headache-hub": { "splits": ["cluster-headache", "trigeminal-neuralgia", "occipital-nerve-block"], "existing_links": ["migraine", "aacg"] }
  }
}
```

**Status enum:** `"built"` (deployed + verified), `"in_progress"` (planned/authoring), `"deferred"` (in roadmap, not yet started), `"deprecated"` (removed; keeps history). Future scout discoveries default to `"in_progress"`.

### 10.3 Writer script (idempotent, atomic, validated, **with compare-and-swap**)

- **New script:** `~/Desktop/claude-brain/bin/scout-state-update.mjs`
- Pattern: load JSON → capture `pre_mtime = statSync(file).mtimeMs` → validate against inline schema (`schema_version` must match) → deep-merge proposed updates → reload + re-stat → **if `mtime` changed since `pre_mtime`, retry from start (max 3 attempts) — concurrent scout run won the race; merge again on top of newer state** → write to temp `<path>.tmp` → `fs.rename()` atomic swap → log a single-line audit entry to `~/Desktop/claude-brain/state/scout-state.log`.
- Alternative if mtime race feels brittle on macOS HFS+/APFS: use a `.lock` sentinel file with `O_CREAT|O_EXCL` — caller holds the lock for the entire read-modify-write, retry with backoff if lock already held.
- CLI: `node scout-state-update.mjs --consult headache-hub --status built --commit $(git rev-parse HEAD)` etc.
- Refuses to overwrite a `verified_at` newer than the proposed update unless `--force` (prevents stale scout runs from clobbering recent deploys).
- Exits non-zero on schema validation failure OR after 3 CAS retries (then caller can re-invoke manually).

### 10.4 Schema doc
- Add a sibling README at `~/Desktop/claude-brain/state/README.md` documenting the schema, the `parent_hub` invariant ("every consult that fits inside an existing hub MUST carry parent_hub; flat consults carry null"), the status enum semantics, and how scout runs should call `scout-state-update.mjs` rather than write the file directly.

---

## 11. Phase 11 — Documentation Updates

### 11.1 myMedKitt CLAUDE.md
- Add a "Hub Consult Pattern" subsection under Clinical Content Rules referencing `~/Desktop/claude-brain/patterns/hub-consult-pattern.md` as source of truth.
- Add a "Toolbar Overflow" subsection (5 visible + More drawer behavior).

### 11.2 claude-brain decision log
- New file `~/Desktop/claude-brain/decisions/2026-05-22-hub-pattern-v1.md` recording: chosen architecture (type:'hub' metadata flag, no router/grid change in v1), rejected alternative (separate Hub component), rationale (minimize blast radius for first hub).

### 11.3 changelog
- Append entry in `~/Desktop/claude-brain/changelog.md`.

---

## 12. Dependency Graph

```
Phase 1 (type field + overflow drawer)
   └─→ Phase 2 (calculators)
         └─→ Phase 3 (drugs)
               ├─→ Phase 4 (occipital-nerve-block) ── deploy ──┐
               ├─→ Phase 5 (cluster) [needs Phase 4]    ── deploy ──┤
               ├─→ Phase 6 (trigeminal)                  ── deploy ──┤
               └─→ Phase 7 (headache-hub) [needs 4,5,6]  ── deploy ──┘
                                                                     │
                                                                     ▼
                                                              Phase 9 audits
                                                                     │
                                                                     ▼
                                                              Phase 10 state file
                                                                     │
                                                                     ▼
                                                              Phase 11 docs
```

---

## 13. Acceptance Criteria

A deploy of all 4 is "done" when:

1. `bunx tsc --skipLibCheck --noUnusedLocals false` clean on each commit.
2. GitHub Pages build green for the final commit (verified via `gh run list`).
3. All 4 consults load from `kittechsix-blip.github.io/mymedkitt/`.
4. Hub → splits cross-links all resolve (validation script clean).
5. Splits → drug-store cross-links all resolve (indication hints land on the right block).
6. SNOOP10 calculator returns the expected workup recommendation when ≥1 red flag is checked.
7. `🧰 Tools ▾` drawer opens with 7 items on `headache-hub` (which sets `toolbarOverflow: true`). On vertigo (6 items, `toolbarOverflow` unset/false), aacg (3 items), and all 40+ other existing toolbars: unchanged from current behavior, no Tools drawer rendered. Kill-switch verified by flipping `FLAGS.toolbarOverflowEnabled = false` → hub falls back to all 12 toolbar items inline.
8. Final `CACHE_NAME` and `DATA_VERSION` after Phase 8 are strictly greater than the values before Phase 1; a browser pinned to the pre-Phase-1 SW auto-reloads to the new SW on next visit (verified via `controllerchange` listener in app.ts). The number of intermediate bumps is irrelevant — the semantic invariant is that old clients invalidate.
9. Supabase has rows in `decision_trees` / `decision_nodes` / `tree_citations` / `category_trees` for all 4.
10. DrK and FlowRider audits both posted to claude-mem with `DrK Audit` / `FlowRider UX` tags for each of the 4.
11. `eb-med-scout-state.json` exists with the 4 entries and the schema documented.
12. Every image in `docs/images/occipital-nerve-block/` has a verified PD / CC0 / US-Gov-Work license recorded in the caption + commit message.
13. **Calculator input bounds (R2-M6).** Every new calculator added in this PR (cluster-headache, trigeminal-neuralgia, occipital-nerve-block, headache-hub sections of `src/components/calculator.ts`) declares `required` + `min` + `max` + `unit` on every input field. Invalid-state tests assert `computeResult` refuses to render a clinical recommendation when bounds are violated. Concrete test cases shipped:
    - Negative CO-Hgb input → calculator returns `"Invalid input"` error, NOT a CO-toxicity recommendation.
    - Gestational age <0 weeks or >42 weeks → pregnancy-safe-headache-rx calc refuses to compute.
    - Verapamil daily total >480 mg without a titration-log field populated → cluster-headache verapamil calc refuses to render and shows a banner pointing to the manual ECG protocol.
    - Anticonvulsant titration interval <72 h → trigeminal-neuralgia CBZ ladder calc refuses to advance to the next step.
14. **Audit-gate verdicts captured (R2-M5 + R4-H5).** For each of the 4 consults, `.deploy-state/audit-gate-<id>-<iso>.md` exists with both DrK and FlowRider verdicts and shows `GATE: PASS` (or `GATE: WARN` with Andy's explicit continue note) before the Phase 8.3 flip ran.

---

## 13a. Per-Tree Citation Matrix (stub; filled in during authoring against frozen sources)

Each tree gets a citation matrix table mapping every planned node ID to its primary + secondary citation numbers. **This is a planning artifact** — the actual matrix is populated during the build phase after the **Citation Freeze** step (below) verifies each guideline anchor. Skeleton shown for cluster-headache; trigeminal-neuralgia, occipital-nerve-block, and headache-hub follow the same pattern.

### Citation Freeze Step (mandatory, run BEFORE building each consult)

For each guideline anchor referenced in the EBM backbone, a subagent verifies actual title, year, authoring body, DOI/URL, and that the cited recommendation appears in the cited section. Anchors I am uncertain about right now (resolve at freeze time):

- "AAN 2024 cluster" → likely AHS cluster guideline update (Robbins et al., Headache, 2024) or EAN cluster update (May et al., Eur J Neurol, 2023). **Verify.**
- "AHS 2021 cluster" → may not exist as named guideline; the 2021 anchor is the AHS acute migraine consensus (Ailani Headache 2021). **Verify cluster has separate guideline.**
- "AHS 2024 cluster" — same caveat.
- ACEP 2019 Clinical Policy on Acute Headache → real (Godwin Ann Emerg Med 2019;74:e41–e74). ✅
- IHS ICHD-3 → real (Cephalalgia 2018;38:1–211). ✅
- ACOG Headache in Pregnancy → committee opinion exists, verify exact year + number.
- AAN/EFNS TN guideline → Cruccu 2008 Neurology + Cruccu 2019 EAN/EFNS update — both real, verify exact recommendations cited.
- Cochrane CBZ for TN → Wiffen 2014 (and update 2017?). ✅
- Perry Ottawa SAH Rule → Perry JAMA 2013 + 2017 validation. ✅
- UHMS HBO indications → 2019 13th ed. ✅
- Verapamil cluster + ECG → Cohen Neurology 2007. ✅ Plus FDA label.
- Lithium cluster → Bussone Headache 1990 + Steiner Lancet 1985.
- Sumatriptan cluster Cochrane → Law 2013.
- Carbamazepine HLA-B\*1502 → FDA boxed warning 2007 + Chen NEJM 2011 (genotype-guided prescribing).

**Freeze deliverable:** a `citations-frozen.json` per consult committed alongside the tree file, listing `{N: { title, authors, journal, year, doi, url, recommendation_excerpt }}` for every numbered citation. DrK audit cross-checks against this file.

### Cluster-Headache Citation Matrix (stub)

| Node ID | Module | Primary citation | Secondary citation |
|---------|--------|------------------|--------------------|
| cluster-start | Recognition | ICHD-3 §3.1 [Cit 1] | — |
| cluster-redflag-thunderclap | Red Flags | ACEP 2019 [Cit 2] | Edlow 2008 [Cit 3] |
| cluster-acute-o2 | Acute Tx | Cohen JAMA 2009 [Cit 4] | AHS cluster guideline [Cit 5] |
| cluster-acute-sumatriptan-sq | Acute Tx | Ekbom NEJM 1991 [Cit 6] | Law Cochrane 2013 [Cit 7] |
| cluster-acute-zolmitriptan-in | Acute Tx | Cittadini Arch Neurol 2006 [Cit 8] | — |
| cluster-bridge-prednisone | Bridge | Mir Cephalalgia 2003 [Cit 9] | Leroux 2011 [Cit 10] |
| cluster-bridge-occipital-block | Bridge | Leroux 2011 [Cit 10] | (link to `#/tree/occipital-nerve-block`) |
| cluster-prophy-verapamil | Prophylaxis | Cohen Neurology 2007 [Cit 11] | FDA verapamil label [Cit 12] |
| cluster-verapamil-ecg-banner | Prophylaxis | Cohen Neurology 2007 [Cit 11] | — |
| cluster-prophy-lithium | Prophylaxis | Bussone Headache 1990 [Cit 13] | Steiner Lancet 1985 [Cit 14] |
| cluster-prophy-topiramate | Prophylaxis | Láinez Headache 2003 [Cit 15] | — |
| cluster-dispo | Disposition | AHS cluster guideline [Cit 5] | — |
| (other nodes) | … | … | … |

Trigeminal-neuralgia, occipital-nerve-block, and headache-hub matrices structured identically — appended at start of each consult build phase. Each matrix includes a row per planned node, including red-flag branches, info-page jumps, and stop-page links.

---

## 14. Out-of-Scope / Explicit Non-Goals (for round-1 grilling pre-emption)

- No back-port of `parent_hub` tags to existing scout entries.
- No rebuild of migraine or AACG to be split-aware; they stay as-is, linked from the hub.
- No new hub-specific component (HubHeader, HubModule) — the hub renders through the existing decision-card flow with `type:'hub'` as metadata only. v2 may add affordances.
- No backend / Supabase schema migration — same `decision_trees` table, no new columns. `type` lives in the in-app DecisionTree literal only; if we want it in Supabase too, that's a future enhancement.
- No multi-hub batch — this PR is one hub + three splits. Chest-pain hub is roadmap item #2, separate effort.
- No NYSORA images. No CC BY images. No "fair-use" rationalizations.
- No parallel agent dispatch for builds or deploys. One at a time.

---

## Changelog

### Round 1 — adversarial Codex review (2026-05-22)

**Accepted (all 6 High + all 8 Medium + 1 of 2 Low):**

- **H1 Non-atomic Supabase push** → Phase 8.2 rewritten with two-phase deploy (Supabase push + smoke-check FIRST, then CACHE_NAME bump + git push). Added smoke-check script `scripts/supabase-smoke.mjs` to assert non-zero counts in `decision_trees`/`decision_nodes`/`tree_citations`/`category_trees` per tree-id before allowing cache bump. R7 risk row updated. v2 follow-up noted: server-side transactional push.
- **H2 Splits-back-to-hub contradiction** → Phase 5 cluster module skeleton edited: red-flag links now point directly to existing standalone consults (`sah`, `cervical-artery-dissection`, `cvst`, `htn-pregnancy`, `aacg`) instead of `headache-hub`. Cross-link directionality rule made explicit in R8: **hub links into splits; splits never link back to hub.**
- **H3 Toolbar/calculator capability gaps** → (a) `action: 'jump'` is intra-tree only (verified `controller.jumpToNode` in consult-flow-controller.ts and the toolbar dispatcher in contextual-toolbar.ts:64) → added new `action: 'route'` to Phase 1 type system + dispatcher, IIH tool moved from `jump` to `route`. (b) Calculators live in monolithic `src/components/calculator.ts` (verified section comments at lines 6629, 7194, …) not `src/data/calculators/*` → Phase 2.2 files-changed list rewritten. (c) Tools drawer renamed to `🧰 Tools ▾` and explicitly distinguished from existing `•••`/"More"/Decision Map button (verified at contextual-toolbar.ts:73–81) — no naming or behavioral collision. Added `pinned: true` flag on `ToolbarItem` so existing 6-tool vertigo toolbar is not silently regressed.
- **H4 `type:'hub'` persistence path** → R1 row + Phase 1 rewritten to plumb `type` through `DecisionTreeMeta` (correct type name; verified at models/types.ts:141) + `tree-service.ts` registry returns + `category-service.ts` merge. Documented explicit decision to NOT modify Supabase schema in v1 (`decision_trees.tree_type` deferred to v2); field is client-side, sourced from hardcoded TREE_REGISTRY as merge source of truth. Code-comment requirement noted.
- **H5 Citation anchors unverified** → Added §13a Citation Freeze step mandatory before each consult build phase; deliverable is a per-consult `citations-frozen.json` with verified title/authors/journal/year/DOI/URL/recommendation excerpt per numbered citation. Listed the specific anchors I'm uncertain about ("AAN 2024 cluster", "AHS 2021 cluster") for resolution at freeze time. DrK audit cross-checks against frozen file.
- **H6 TN stop page CBZ→oxcarbazepine error** → corrected. Oxcarbazepine causes MORE hyponatremia (15–30% vs CBZ ~10%); revised stop-page bullet to: stop offending Na-lowering anticonvulsant, correct Na, switch to non-Na-lowering alt (gabapentin, baclofen, lamotrigine) with neurology input. Citations: Dong J Headache Pain 2005; Berghuis Epilepsia 2017. Same caveat added to R9 clinical-safety row.
- **M1 Validator scope too narrow** → R8 + new `scripts/validate-cross-links.mjs` rewritten: repo-wide, walks all trees + toolbar-configs + info-pages + stop-pages + drug-store, validates `#/tree/`, `#/info/`, `#/node/`, `#/drug/`, and `images/` references. Runs as pre-deploy gate.
- **M2 Dual-list Supabase mechanics** → R5 row + Phase 7.5 file list now explicitly include `scripts/supabase-push.mjs` `CROSS_LISTINGS` map (verified at line 262 — separate registry from categories.ts) AND `scripts/generate-supabase-sql.mjs` equivalent. Three registries, all updated.
- **M3 More-drawer collision with Decision Map** → R2 row + Phase 1.2 rewritten: introduced separate `🧰 Tools ▾` button (distinct label + icon + selectors) while `•••` stays as Decision Map. Added `pinned: true` flag so vertigo's 6-tool toolbar doesn't regress (5 pinned inline + Nuance to drawer).
- **M4 Image URLs not preselected** → Phase 4.3 table replaced with specific Wikimedia/NIH BioArt URLs + license-template citations (Gray's plates 800 + 793 confirmed `PD-old-100`). NIH BioArt search URLs documented for landmark/needle imagery; explicit fallback to image-thin if no clean PD match.
- **M5 Per-node citation matrix missing** → §13a added; cluster-headache citation matrix stub shown as template. Each consult gets its full matrix at start of its build phase post-freeze.
- **M6 /deploy + DrK + FlowRider concrete commands** → Phase 8.1 = `Skill tool → skill: "deploy"`. Phase 9.1 = `Agent tool → subagent_type: "Dr. Kitlowski"` with full prompt body + claude-mem save_memory invocation + FLAGGED/AUTO-FIX/PROPOSAL categorization. Phase 9.2 same for `Flow Rider`. Phase 9.4 fallback if subagent type not registered (use general-purpose with persona prefix).
- **M7 SW assets are auto-generated** → R6 row + Phase 8.1 rewritten: hand-editing `docs/sw.js` ASSETS_TO_CACHE explicitly forbidden; `scripts/deploy-cache-sync.mjs` (already part of `/deploy`) handles regeneration + version bumps. Removed `docs/sw.js` from every per-phase file list.
- **M8 Scout state schema gaps** → §10.2 schema expanded with `commit_sha`, `verified_at`, status enum (`built`/`in_progress`/`deferred`/`deprecated`). §10.3 specifies new writer script `~/Desktop/claude-brain/bin/scout-state-update.mjs` — idempotent (temp + atomic rename), schema-validated, refuses to clobber a newer `verified_at` without `--force`, append-only audit log at `state/scout-state.log`.
- **L1 File/type naming** → corrected `DecisionTree` → `DecisionTreeMeta` (verified at models/types.ts:141) throughout R1, Phase 1.1, and acceptance criteria. `src/types/consult-tree.ts` legacy `ConsultTree` shape noted for backwards-compat mirror.

**Partially accepted (1 of 2 Low):**

- **L2 "cache bumps exactly 4 times" acceptance criterion** → fully accepted. AC #8 rewritten to test the semantic invariant (final CACHE_NAME/DATA_VERSION strictly greater than pre-Phase-1; old client auto-reloads via `controllerchange`) rather than the bump count. Per-deploy count is irrelevant to user impact.

**Rejected:** none. All 16 findings actionable and material; no style-only nits to ignore.

**Net delta:** 1 new script (`validate-cross-links.mjs`), 1 new script (`supabase-smoke.mjs`), 1 new script (`scout-state-update.mjs`), 1 new toolbar component (`Tools ▾` drawer distinct from Decision Map), 1 new toolbar action (`route`), 1 new ToolbarItem flag (`pinned`), 1 new build-phase gate (Citation Freeze) with per-consult `citations-frozen.json` artifact. Plan got longer but tighter; key wins are killing the splits→hub backlinks, killing the More-button collision, and forcing the Citation Freeze step before authoring.

### Round 3 — adversarial Codex review, Ops/SRE persona (2026-05-22)

**Accepted (all 4 High + all 5 Medium + 1 of 2 Low):**

- **H1 Rollback unsafe** → R12 risk row added + new Phase 8a rollback runbook. New scripts: `scripts/supabase-snapshot.mjs` (pre-push JSON snapshot of all affected tables to `supabase-snapshots/<id>-<UTC-timestamp>.json`), `scripts/supabase-rollback.mjs` (restores snapshot or DELETEs net-new rows). Three rollback tiers: (a) rapid disable via `feature-flags.ts` kill-switch (≤2 min), (b) full content rollback via snapshot restore + git revert + cache bump, (c) partial rollback (one of 4 consults) via `hiddenTreeIds` + targeted DELETE. Git tag at each deploy (`deploy/<UTC-timestamp>-headache-hub-batch`). Scout-state rollback via `--rollback-of <bad-commit-sha>` flag.
- **H2 `/deploy` double-push + push silent-failure** → Phase 1.6 new section. **Verified bug:** `supaPost`/`supaUpsert`/`supaDelete` log errors but `return false` and `await supaUpsert(...)` at line 247 never checks the return value. Push proceeds silently. Fix: track return values at every call site, `process.exit(1)` on `false`, wrap whole flow in try/catch with non-zero exit. New `--no-visibility` flag skips `category_trees` write (for staging stage). New `--snapshot-first` flag runs snapshot before push. Staging stage uses `supabase-push.mjs --no-visibility` directly to avoid `/deploy` double-push; final flip uses `/deploy` which then writes `category_trees`.
- **H3 Publish order makes consult visible before nodes exist** → solved by staged-then-flip pattern (R15 / Phase 8.2–8.3). All 4 consults' nodes/citations/drugs/info-pages are written FIRST behind hidden category listings (no `category_trees` row = invisible to UI). After hidden-smoke green for all 4, a single final flip writes `category_trees` and bumps cache. **`category_trees` becomes the visibility gate, not the first write.** Mid-batch failures are reversible by single DELETE with zero user impact (consult was never visible).
- **H4 Tools drawer blast radius** → R2 risk row rewritten + Phase 1.2 + Phase 1.4 rewritten. **Verified: 40+ existing toolbars exceed 5 items** (`grep` results showed oncological-emergencies=14, ocular-trauma=10, pph=8, htn-pregnancy=8, vp-shunt=8, diabetic-foot-wounds=8, traveler-infections=8, plus ~33 at 6–7). Resolution: overflow is now **opt-in per consult via `toolbarOverflow: true` flag on `ToolbarConfig`** (default false → all existing toolbars unchanged). Only `headache-hub` opts in this PR. `pinned: true` flag retained but is no-op until `toolbarOverflow: true`. Vertigo AC contradiction (L1) resolved by this same change.
- **M1 No production observability** → R13 risk row + Phase 8b telemetry section. Events: `tree_load_source`, `tree_load_error`, `link_resolution_error`, `route_action_error`, `calculator_error`, `hub_module_view`, `sw_version`, `data_version`. Privacy floor: tree-ids + version strings only. Sink wired via existing `src/services/kittmd-analytics.ts` (verified exists). Alert thresholds defined: hardcoded-fallback >5% → investigate; any link/route error >0 → kill-switch + redeploy.
- **M2 No kill switch / feature flag** → R14 risk row + Phase 1.5 new section. New file `src/data/feature-flags.ts` with `hubTypeRender`, `routeActionEnabled`, `toolbarOverflowEnabled`, `hiddenTreeIds[]`, `hiddenHubs[]`. Every new behavior gated. `hiddenTreeIds` lets a one-line edit hide any consult without DB change. Off-switch flow: edit + `/deploy` → live in ~2 min. v2 may move flags to Supabase for runtime control without deploy.
- **M3 `type:'hub'` persistence weaker than stated** → Phase 1.1 expanded. Codex correctly flagged that `mergeHardcodedConsults()` only replaces stale title/subtitle/nodeCount and `TreeConfig` lacks `type`. Fix: (a) extend `TreeConfig` interface with `type?: 'standard' | 'hub' | 'procedure'`; (b) explicitly add `type` to the per-tree merge in `category-service.ts` so hardcoded `type` wins over IndexedDB-hydrated metadata; (c) add lightweight asserter that hub trees retain `type: 'hub'` under all three load paths (Supabase row missing column → fallback; IndexedDB stale → merge override; cold-start no IndexedDB → hardcoded direct).
- **M4 Smoke checks too thin (row counts only)** → Phase 8.2 hidden-smoke expanded beyond counts. Now validates: `decision_trees.entry_node_id` matches source; `decision_nodes` contains entry node ID; `tree_citations[1]` matches frozen-citations file; every drug indication subcategory referenced by tree links exists in `drugs`; every `#/info/<id>` exists in `info_pages`; every calculator target exists in compiled `docs/components/calculator.js`; every `images/<path>` exists in `docs/images/`; every cross-tree `#/tree/<id>` resolves. Plus repo-wide cross-link validator runs against **compiled `docs/` output** (not just source).
- **M5 Four sequential deploys = 4 user reloads** → solved by R15 / Phase 8.2–8.3 staged-then-flip with SINGLE final cache bump. Net user impact: 1 SW reload + 1 IndexedDB wipe instead of 4. All 4 consults appear simultaneously, not staggered.
- **L1 Vertigo AC contradiction** → resolved by H4 change. With `toolbarOverflow: false` as default, vertigo's 6-item toolbar is unchanged (still renders all 6 inline, no Tools drawer). AC #7 rewritten to reflect this.
- **L2 scout-state no CAS** → Phase 10.3 expanded. Added optimistic concurrency: capture `pre_mtime`, re-stat after merge, retry up to 3 times if mtime changed (another scout won the race). Alternative `.lock` sentinel pattern documented for filesystems with poor mtime resolution. Exits non-zero after 3 CAS retries so caller can re-invoke.

**Rejected:** none. All 11 round-3 findings actionable and material.

**Architectural shift summary:** the biggest change this round is the move from "4 sequential per-consult deploys" to "stage all 4 hidden, then single visibility flip." This single change addresses H1 (rollback is trivial — DELETE hidden rows or rollback the single flip), H3 (visibility gate moves from first write to last write), and M5 (one user-visible reload instead of four). Combined with the opt-in `toolbarOverflow` flag (H4) and the feature-flag kill switches (M2/R14), the rollout becomes far safer: any problem is reversible in ≤2 minutes via flag flip without touching content, and full content rollback is a documented runbook step rather than a "figure it out under pressure" exercise.

**Net delta (round 3):** 3 new scripts (`supabase-snapshot.mjs`, `supabase-rollback.mjs`, `validate-cross-links.mjs --against-docs` mode); 2 new flags on `supabase-push.mjs` (`--no-visibility`, `--snapshot-first`) + fix to error handling (exit non-zero); 1 new flag on `ToolbarConfig` (`toolbarOverflow`); 1 new file (`src/data/feature-flags.ts`); 1 new section in `category-service.ts` (full-metadata merge for `type`); 1 new field on `TreeConfig` interface (`type`); telemetry events wired into `kittmd-analytics.ts`; new Phase 8a (Rollback Runbook) + Phase 8b (Telemetry + Alerting Wire-Up); scout-state-update.mjs gains CAS retry loop.


### Round 2 + Round 4 — adversarial Codex review (2026-05-22, security/data-integrity + ops/SRE)

**Why combined:** Round 2 findings (2H/6M/2L) were not folded into PLAN.md before Round 3 fired, so Round 3 reviewed the Round-1-revised plan unchanged. Round 4 (5H/5M/2L) re-surfaced most of Round 2's themes from the ops/SRE angle and added rollback + canary + observability concerns. Round 3 produced no findings file on disk (state advanced silently). Folding rounds 2 and 4 together below.

**Accepted (all 7 High + all 11 Medium + all 4 Low):**

- **R2-H1 + R4-H3 — `supabase-push.mjs` swallows REST failures** → Phase 8.2 step 3 makes the script exit non-zero on ANY failed upsert/delete/post/patch. Implementation: change each call site in `pushRows()` / `deleteRows()` to throw on non-2xx; accumulate per-row failures into a final exit code that propagates into the smoke gate. No more "false return logged but pipeline continues."
- **R2-H2 + R4 drug-sync — Drug + info-page sync uncoupled from deploy** → Phase 8.2 step 3 requires `--drugs <ids> --info-pages <ids>` on every `supabase-push.mjs` and `supabase-smoke.mjs` call. `supabase-smoke.mjs` now asserts that every passed drug indication payload + info-page id matches the compiled `docs/data/*.js` source verbatim (not just count > 0). Smoke fails if any are missing or have wrong indication_hint.
- **R4-H1 — Rollback undefined across GH Pages + Supabase** → New Phase 8.4. Per-consult `scripts/rollback/<tree-id>.sh` pre-generated BEFORE each supabase phase. Captures a snapshot of touched drug/info-page rows at 8.2 step 2 (`supabase-snapshot.mjs`) so `supabase-restore.mjs` can undo shared-table edits surgically. Full-batch rollback path documented for the bump-commit case, including a mandatory **staging-project rehearsal** before the real rollout (rehearsal log at `.deploy-state/rollback-rehearsal-<iso>.md`).
- **R4-H2 — `/deploy` runs Supabase AFTER bump + git push** → Phase 8.1 splits the skill into `/deploy supabase-only <id>` and `/deploy code-only --skip-supabase`. Code phase refuses to run unless the changed tree id has a recent SUCCESS in `.deploy-state/supabase-push.log` (gitignored, atomic temp+rename). Unsplit `/deploy` deprecated for multi-consult batches.
- **R4-H4 — No gradual rollout / kill switch** → New `tree_enabled` boolean column on `decision_trees`. Phase 8.2 step 3 writes new rows with `--enabled-flag=false`; Phase 8.3 flips per-tree to `true` via `supabase-flag.mjs <id> --enable` AFTER the bump and Pages-green. Any failure → `--disable` flips it off without a code rollback, single-row reversible.
- **R2-M5 + R4-H5 — DrK + FlowRider audits scheduled only post-deploy** → New Phase 9.0: blocking pre-deploy audits against the LOCAL compiled build. HIGH-severity findings block rollout. AUTO-FIX items can proceed; FLAGGED items require Andy approval; PROPOSAL items are tracked but non-blocking. The original Phase 9 post-deploy audits are retained as confirmation.

- **R2-M1 — Cross-link validator grep-based, misses toolbar action types** → `scripts/validate-cross-links.mjs` rewritten in Phase 7.4: imports the real registries (TREE_REGISTRY, INFO_PAGES, STOP_PAGES, CALCULATORS, DRUG_STORE) and dispatches by action type — `route` checked against TREE_REGISTRY, `jump` against the source tree's node ids, `overlay` against INFO_PAGES + STOP_PAGES, `calculator` against CALCULATORS. `#/node` links validated in their tree context; banned from shared pages (info, stop, drug).
- **R2-M3 — No deploy lock, parallel sessions can clobber shared state** → Acquire a repo-level `flock` on `.deploy-state/deploy.lock` before cache sync / Supabase / git work; release after live-verify completes. `eb-med-scout-state.json` writes go through `bin/scout-state-update.mjs` (already in §10.3) using compare-and-swap on a `state_version` field — rejects writes whose pre-state version is stale.
- **R2-M4 + R4-M3 — `type:'hub'` may not survive Supabase/IndexedDB merge** → R1 Risk Register updated. Decision: do NOT add `decision_trees.tree_type` column (defer to v2); instead `mergeHardcodedConsults()` ALWAYS overlays client-only registry fields (`type` and any future client-only metadata) regardless of stale-row signals. Regression test: a Supabase row lacking `type` must still render with `type` after merge. Test file: `tests/category-service.merge-metadata.test.ts`.
- **R2-M6 — Calculator input bounds not specified** → Acceptance Criteria #4 gets a new sub-bullet: every new calculator MUST declare `required`/`min`/`max`/`unit` per input field; an invalid-state test asserts `computeResult` refuses to render a clinical recommendation when bounds violated. Concrete test cases: negative CO-Hgb, gestational age outside 0–42 weeks, verapamil daily total >480 mg without titration log, anticonvulsant titration interval <72 h.
- **R2-M7 — Image licensing audit trail not durable** → New file `docs/images/manifest.json` checked into git. Each entry: source URL, license tag, retrieval timestamp, Andy approval reference (commit SHA of the approval discussion in PR body), SHA256 of the file as committed. `validate-cross-links.mjs` extended to fail on unmanifested images or hash mismatches. Phase 4 image table feeds the first manifest rows.
- **R4-M1 — No runtime observability** → `client_errors` Supabase table + thin `src/services/error-report.ts` wrapper + Mission Control rollout card reading last-1h count grouped by `error_msg` + alert threshold (>5 errors / 5 min for one error_msg → notify.sh) + symptom-to-action runbook at `~/Desktop/claude-brain/operations/headache-hub-runbook.md`.
- **R4-M2 — Four cache bumps cause reload bursts** → Phase 8.3: code phases 1-3 run with `--skip-bump`, code phase 4 (headache-hub) carries the single batch-wide bump. Canary flips happen AFTER the bump, in deploy order, so splits enable before hub.
- **R4-M4 — Static cross-link validator doesn't test live deploy** → `scripts/live-verify.mjs` (Playwright headless) added to Phase 8.3 canary flow. Hits the production URL for each consult after its `--enable`, asserts entry node renders + every `#/tree/`, `#/info/`, `#/drug/` link target returns 200 with non-blank body.
- **R4-M5 + R2 staging — Supabase modified before code rollout** → Resolved by Phase 8.2 + 8.3: rows are written hidden (`tree_enabled=false`), the canary flip is the only thing that exposes them, and the flip is single-row reversible without a code rollback.

- **R2-L1 + R4-L1 — Phase 4 still lists `docs/sw.js` image edits** → Phase 4.4 file list line removed. The `deploy-cache-sync.mjs` walker already covers `docs/images/<tree-id>/`. Image-only changes route through `/deploy code-only` which regenerates `ASSETS_TO_CACHE` on every run. No manual SW edit.
- **R2-L2 — AC#7 contradicts Phase 1 (Tools drawer on vertigo)** → AC#7 rewritten to match Phase 1.2: vertigo's 6th item ("Stop") explicitly moves to the Tools drawer; 5 most-used items remain pinned inline; regression test asserts no inline-toolbar count > 5 on any consult.
- **R4-L2 — Registry instructions point at script-local `TREE_REGISTRY`** → All Phase 4-7 file lists updated to reference `scripts/tree-registry.mjs` (the central registry) PLUS the remaining `CROSS_LISTINGS` maps in `scripts/supabase-push.mjs` + `scripts/generate-supabase-sql.mjs` for dual-listed trees. R5 row updated.

**Rejected:** none. All 19 findings (7H+8M+4L across the two rounds) are material to the deploy-safety story.

**Net delta:** 5 new scripts (`supabase-snapshot.mjs`, `supabase-restore.mjs`, `supabase-flag.mjs`, `supabase-delete-tree.mjs`, `live-verify.mjs`) + 1 new client module (`src/services/error-report.ts`) + 1 new Supabase column (`decision_trees.tree_enabled`) + 1 new Supabase table (`client_errors`) + 1 new image manifest (`docs/images/manifest.json`) + 1 new runbook (`headache-hub-runbook.md`) + per-consult rollback scripts + deploy lock + staging-project rollback rehearsal + Phase 9.0 pre-deploy audit gate. Skill split (`supabase-only` + `code-only`) deprecates the unsplit `/deploy` for multi-consult batches. The plan now has a real story for "one of these four consults is broken at 03:00 CT and Andy is on shift" — flip the flag, no reboot, no code rollback, no user reload.

**Plan-body edits required to match this Changelog (to be carried out as code changes by the build):** Phase 8 rewrite per the bullets above (split skill, snapshot, fail-closed push, `tree_enabled` flag, coalesced bump, live-verify, observability section, runbook reference); Phase 9 add §9.0 blocking pre-deploy audit; Phase 4.4 remove `docs/sw.js` line and update registry references to `scripts/tree-registry.mjs`; R1 metadata-overlay rule strengthened in Risk Register; AC #4 calculator-bounds clause + AC #7 vertigo Tools-drawer correction. The narrative in Phase 7 already correctly states splits-do-not-link-to-hub from Round 1; no further edit there. These body edits will land in the next revision pass before code authoring begins.

### Round 5 — adversarial Codex review, Ops/SRE persona, FINAL round (2026-05-22)

**Round 5 surfaced 4 High + 3 Medium + 2 Low. All 9 accepted; structural shifts:**

- **R5-H1 / R16 — Hidden gate via `category_trees` absence is BROKEN.** **Verified in code:** `category-service.ts` `mergeHardcodedConsults()` (line 124) overlays hardcoded entries onto listings regardless of Supabase state; `tree-service.ts` TREE_REGISTRY allows direct hash-route load (`#/tree/<id>`) bypassing categories entirely. Hiding via `--no-visibility` does NOT hide the consult. **Fix:** `FLAGS.hiddenTreeIds` (R14) enforced in BOTH paths: (i) `category-service.ts` post-merge filter; (ii) NEW: `tree-service.ts` `loadTree()` returns null/404 when ID is hidden. Belt-and-suspenders: still skip `category_trees` write during staging. v2: Supabase `decision_trees.enabled` column for runtime DB-side gating.
- **R5-H2 / R15 reuse — Final flip still relies on unsplit `/deploy`.** Combined with R4-H2 split-skill work already in Changelog. Per-canary flips use the existing `/deploy` invocation for a code-only change (editing `feature-flags.ts`), which is small enough to be safe even without a fully split skill. v2 should still split the skill for richer Supabase-only / code-only commands. Accepted as best-effort within v1.
- **R5-H3 / R17 — DrK + FlowRider audits still scheduled after public enablement in executable phases.** Round 4 added Phase 9.0 pre-deploy audit; round 5 noted the executable phases (per-consult flow in Phase 8.3) didn't yet wire 9.0 per-canary. **Fix:** Phase 9 explicitly split into 9a (pre-flip BLOCKING per canary) + 9b (post-flip confirmation per canary). HIGH severity blocks the corresponding canary flip until resolved. Phase 9.0 timing-alignment block added showing 4 audit-then-flip cycles in canary order.
- **R5-H4 / R18 — Kill switch + gradual rollout still batch-wide.** **Fix:** Phase 8.3 rewritten from single-batch flip to **per-split canary flips** with telemetry/manual gate between each. Canary order: occipital-nerve-block (lowest blast radius) → trigeminal-neuralgia → cluster-headache → headache-hub LAST. Each flip = remove one ID from `FLAGS.hiddenTreeIds` + `/deploy` (≤2 min). Gate between flips: zero `link_resolution_error`/`route_action_error`, hardcoded-fallback <5%, 9b confirmation clean. Failed gate = put ID back, fix, re-flip.
- **R5-M1 / R19 — Remote telemetry sink MUST be operational before any flip.** `kittmd-analytics.ts` with `console.warn`-only sink = no production observability. **Fix:** new Phase 0a pre-flight prereq. Andy decides: build minimal sink (Supabase edge function or RPC writing to `client_events` table) OR explicitly accept "manual smoke + 1 h soak" fallback mode for canary gates. Decision logged in `~/Desktop/claude-brain/decisions/2026-05-22-headache-hub-telemetry-mode.md`.
- **R5-M2 / R20 — Shared drug + info-page row safety during staging window.** Hidden staging writes shared rows BEFORE code rollout. **Fix:** all drug/info-page row changes are additive-only (new IDs, new indication blocks; no in-place edits to rows existing consults reference). New script `scripts/validate-existing-consult-rendering.mjs` smokes existing consults that reference any drug in the change set. Phase 3 plan re-asserted as additive-only — verify before push.
- **R5-M3 / R21 — Rollback manifests pre-generated per consult with SHA256.** Rollback runbook described but exact shared-row deltas not enumerated, risking wrong-row restore. **Fix:** before each consult's hidden push, build process generates `rollback-manifests/<id>.json` with exact `drugs_added/modified`, `info_pages_added/modified`, `decision_trees_added`, counts, and SHA256 hashes (before + after where applicable). Rollback uses manifest for targeted ops, not blanket deletes. **Rehearsal:** before first production flip, run rollback against Supabase staging project (or local fixture) and verify counts + hashes match.
- **R5-L1 — Plan body still contradicts round-4 Changelog.** Carried out the deferred body edits this round: per-canary Phase 8.3 (was "single batch flip"), Phase 9.0 per-canary timing alignment, R16 hidden-gate fix, Phase 5/6/7 file lists updated to `scripts/tree-registry.mjs`. Phase 0a pre-flight prereqs section added (R19, lock, manifests, registry verification, hidden-gate smoke test). Some round-4 items (split `/deploy` skill into supabase-only/code-only commands, `tree_enabled` column) remain deferred to v2 with explicit notes — out of scope for this PR.
- **R5-L2 — Stale operational instructions remain.** Phase 4.4 `docs/sw.js` edit already removed (line 277). Stale registry references in Phase 5/6/7 file lists fixed this round (all now point to `scripts/tree-registry.mjs`). Dependency graph in §12 NOT updated yet — it shows per-consult deploys; will need a refresh to show per-canary flips. **Deferred:** updating §12 graph is mechanical; the textual Phase 8.3 is now the source of truth and will guide implementation.

**Rejected:** none. All 9 round-5 findings are material.

**Architectural shift summary (rounds 1–5):** the plan evolved from "4 sequential per-consult deploys" → "single batch staged-then-flip" (round 3) → "**hidden via two-layer gate (FLAGS in BOTH category-service AND tree-service) + per-split canary flips with pre-flip blocking audits**" (round 5). The 4 consults now appear in user-canary order with 24 h (or 1 h fallback) soak between flips, each gated on telemetry + audit clean. Any regression is reversible in ≤2 min via `feature-flags.ts` edit; full rollback uses pre-generated manifests with SHA256. The v1 plan trades "user sees all 4 appear at once" for "blast radius reduces to one consult at a time" — the right call for a new architecture pattern landing alongside its first hub.

**Net delta (round 5):** 1 new pre-flight phase (0a) with 6 verifiable prereq gates; 1 critical bug fix (hidden-gate enforcement in tree-service `loadTree`); 1 new script (`validate-existing-consult-rendering.mjs`); 1 new artifact per consult (`rollback-manifests/<id>.json` with SHA256); Phase 8.3 rewrite to per-canary flips; Phase 9.0 alignment with per-canary timing; explicit v2 deferred list (Supabase `decision_trees.enabled` column, `/deploy` skill split, dependency graph refresh).

**Loop verdict:** Round 5 of 5 — max rounds reached. Open items above are documented as v2 follow-up or deferred-non-blocking. The plan is now safe to begin implementation against: Phase 0a prereqs → Phase 1 type system + Tools drawer + feature flags + hidden-gate enforcement → Phase 2 calculators → Phase 3 additive drug updates → Phase 4 occipital-nerve-block (images) → Phase 5 cluster-headache → Phase 6 trigeminal-neuralgia → Phase 7 headache-hub → Phase 8 staged push + per-canary flips → Phase 9a/9b audits per canary → Phase 10 scout state → Phase 11 docs.

