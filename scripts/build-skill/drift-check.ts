#!/usr/bin/env bun
/**
 * drift-check — WingMan freshness sentinel (Bedside Proof phase, 2026-07-18).
 *
 * Compares what the CURRENT source would generate against the SERVED artifact
 * in docs/skill/. Run unconditionally by /deploy so a stale skill can never
 * ship silently, even when the rebuild-and-promote step mis-fires.
 *
 * Exit codes:
 *   0 — served artifact matches a clean-HEAD build of current source
 *   1 — DRIFT: served contentHash differs from fresh build (stale skill live)
 *   2 — DIRTY: fresh build came from uncommitted skill-source changes
 *       (provenance untrustworthy — commit or revert first)
 *   3 — infrastructure failure (build failed, missing files)
 *
 * Break-glass: DEPLOY_SKIP_SKILL_REBUILD=1 skips the check but MUST write a
 * loud red flag into the deploy log (handled by deploy.md) — a skipped gate
 * is allowed to be loud, never silent.
 *
 * Run: `bun run build:skill:drift` (from repo root).
 */

import { promises as fs } from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

const SCRIPT_DIR = import.meta.dir;
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const SERVED_META = path.join(REPO_ROOT, "docs", "skill", "skill-meta.json");

async function main() {
  console.log("🛰  drift-check — served docs/skill/ vs fresh build of current source\n");

  const servedRaw = await fs.readFile(SERVED_META, "utf8").catch(() => "");
  if (!servedRaw) {
    console.error(`❌ No served skill-meta.json at ${SERVED_META}`);
    process.exit(3);
  }
  const served = JSON.parse(servedRaw);

  // Fresh build into a temp dir so dist/skill/ and docs/skill/ are untouched.
  const tmp = await fs.mkdtemp(path.join(os.tmpdir(), "skill-drift-"));
  try {
    const build = Bun.spawnSync({
      cmd: ["bun", path.join(SCRIPT_DIR, "build.ts")],
      cwd: REPO_ROOT,
      env: { ...process.env, SKILL_OUTPUT_DIR: tmp },
    });
    if (build.exitCode !== 0) {
      console.error("❌ Fresh build FAILED — cannot assess drift:");
      console.error(new TextDecoder().decode(build.stderr).slice(-2000));
      process.exit(3);
    }
    const fresh = JSON.parse(await fs.readFile(path.join(tmp, "skill-meta.json"), "utf8"));

    console.log(`   served: ${String(served.contentHash).slice(0, 12)}… · ${served.consultCount} consults · built ${served.buildDate ?? "(pre-provenance build)"}`);
    console.log(`   fresh:  ${String(fresh.contentHash).slice(0, 12)}… · ${fresh.consultCount} consults · ${fresh.buildVersion}\n`);

    if (fresh.dirty) {
      console.error("🚨 DIRTY TREE — fresh build includes uncommitted skill-source changes:");
      for (const f of (fresh.dirtyFiles ?? []).slice(0, 10)) console.error(`     - ${f}`);
      console.error("   Commit or revert (clinical content = Andy's call), then re-run.");
      process.exit(2);
    }

    if (fresh.contentHash !== served.contentHash) {
      console.error("🚨 DRIFT — the served skill does NOT match current clinical content.");
      console.error(`   consults: served ${served.consultCount} vs fresh ${fresh.consultCount}`);
      console.error("   Fix: bun run build:skill:check, promote dist/skill/{myMedKitt.skill,skill-meta.json} + dist/skill/myMedKitt/SKILL.md → docs/skill/, then deploy.");
      process.exit(1);
    }

    console.log("✅ No drift — served artifact matches current source.");
  } finally {
    await fs.rm(tmp, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error("❌ drift-check failed:", err);
  process.exit(3);
});
