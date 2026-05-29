#!/usr/bin/env bun
/**
 * build:skill:check — WingMan release gate for the myMedKitt coordinator.
 *
 * Runs the build (which fails on coverage + content-safety), then layers
 * deterministic structural assertions a build can't make in-process — chiefly
 * gate reachability (the universal safety gates must precede the coordinate
 * loop), catalog completeness (every emitted consult is in the routing index),
 * and presence of the cross-reference + disambiguation files. Emits a
 * machine-readable report; non-zero exit gates CI / deploy.
 *
 * The behavioral LLM eval (build:skill:eval) is separate (paid + on-demand).
 *
 * Run: `bun run build:skill:check` (from repo root).
 */

import { promises as fs } from "node:fs";
import * as path from "node:path";

const SCRIPT_DIR = import.meta.dir;
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const OUTPUT_PARENT = process.env.SKILL_OUTPUT_DIR
  ? path.resolve(process.env.SKILL_OUTPUT_DIR)
  : path.join(REPO_ROOT, "dist", "skill");
const SKILL_NAME = "myMedKitt";
const OUTPUT_DIR = path.join(OUTPUT_PARENT, SKILL_NAME);

const failures: string[] = [];
const checks: Record<string, "pass" | "fail"> = {};
function check(name: string, ok: boolean, detail?: string) {
  checks[name] = ok ? "pass" : "fail";
  if (!ok) failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
}
async function read(rel: string): Promise<string> {
  return fs.readFile(path.join(OUTPUT_DIR, rel), "utf8").catch(() => "");
}

async function main() {
  console.log("🔎 build:skill:check — myMedKitt coordinator release gate\n");

  const build = Bun.spawnSync({ cmd: ["bun", "run", "build:skill"], cwd: REPO_ROOT, stdout: "inherit", stderr: "inherit" });
  check("build (coverage + content-safety gates)", build.exitCode === 0);
  if (build.exitCode !== 0) return finish();

  const meta = JSON.parse(await read("../skill-meta.json").catch(() => "{}") || "{}");
  const consultCount: number = meta.consultCount ?? 0;

  // Gate reachability: universal safety gates must appear in SKILL.md AND before
  // the coordinate loop (a gate after the routing instructions doesn't bind).
  const skill = await read("SKILL.md");
  const gateIdx = skill.indexOf("Universal safety gates");
  const loopIdx = skill.indexOf("## How to coordinate");
  check("SKILL.md has universal safety gates", gateIdx >= 0);
  check("safety gates precede the coordinate loop", gateIdx >= 0 && (loopIdx < 0 || gateIdx < loopIdx), `gateIdx=${gateIdx} loopIdx=${loopIdx}`);
  check("SKILL.md embeds SAH gate", /pretest probability/i.test(skill));
  check("SKILL.md embeds posterior-stroke gate", /posterior-circulation stroke/i.test(skill));

  // Catalog completeness: every emitted consult must be routable from the index.
  const index = await read("references/index.md");
  const indexEntries = (index.match(/consults\/[a-z0-9-]+\.md/g) ?? []).length;
  check("catalog index present", index.length > 200);
  check("catalog covers all emitted consults", consultCount > 0 && indexEntries >= consultCount, `index=${indexEntries} consults=${consultCount}`);

  // Coordinator-specific references present + non-trivial.
  check("disambiguation.md carried", (await read("references/disambiguation.md")).includes("GATE — resolve before disposition"));
  check("cross-references.md present", (await read("references/cross-references.md")).includes("↔"));
  check("disclaimer.md present", (await read("references/disclaimer.md")).includes("I acknowledge"));
  check("patient-refusal.md present", (await read("references/patient-refusal.md")).includes("red flags"));

  // Regression set shipped.
  const reg = await fs.readFile(path.join(SCRIPT_DIR, "tests", "regression.md"), "utf8").catch(() => "");
  check("regression test set present", reg.includes("seizure") && reg.includes("SAH"));

  await finish(meta);
}

async function finish(meta?: unknown) {
  const report = {
    skill: SKILL_NAME,
    shape: "coordinator",
    status: failures.length === 0 ? "pass" : "fail",
    checks,
    behavioralEval: "pending-cost-approval",
    failures,
    meta: meta ?? null,
  };
  await fs.writeFile(path.join(OUTPUT_PARENT, "skill-check-report.json"), JSON.stringify(report, null, 2) + "\n", "utf8").catch(() => {});
  console.log("");
  for (const [name, status] of Object.entries(checks)) console.log(`  ${status === "pass" ? "✓" : "✗"} ${name}`);
  console.log(`\n${report.status === "pass" ? "✅ release gate PASS" : "❌ release gate FAIL"} · behavioral LLM eval: pending-cost-approval`);
  if (failures.length) { console.error("\nFailures:\n  - " + failures.join("\n  - ")); process.exit(1); }
}

main().catch((err) => { console.error("❌ check crashed:", err); process.exit(1); });
