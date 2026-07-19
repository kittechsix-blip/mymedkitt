#!/usr/bin/env bun
/**
 * Build the myMedKitt "myMedKitt" COORDINATOR WingMan skill from the app's
 * source of truth. Coordinator shape (STANDARDS.md §2): a router over every
 * consult + cross-consult coordination, vs. vertigo's single Linear flow.
 *
 * Emits dist/skill/myMedKitt/ :
 *   SKILL.md                     — the router (disclaimer gate, universal safety
 *                                  gates, the coordinate loop, scope limits)
 *   references/disclaimer.md     — from src/data/medical-disclaimer.ts
 *   references/patient-refusal.md
 *   references/disambiguation.md — required safety disambiguations (gate + source node)
 *   references/cross-references.md — multi-consult interactions
 *   references/citations.md      — citation model note
 *   references/index.md          — the consult CATALOG (category → consults), the routing table
 *   references/consults/<id>.md  — ONE per consult: title, entry framing, CRITICAL ACTIONS
 *                                  spine, module structure, citations, source anchors
 *   (+ skill-meta.json with provenance, alongside the .skill)
 *
 * Baseline fidelity per consult = entry framing + critical-actions spine + citations.
 * Deeper per-node carry is the consult-by-consult expansion; this is logged honestly
 * (no silent caps). The seeded required-disambiguations ARE carried in full and gated.
 *
 * Run: `bun run build:skill` (from repo root).
 */

import { promises as fs, existsSync } from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { pathToFileURL } from "node:url";

import { TREE_REGISTRY } from "../tree-registry.mjs";
import { DEFAULT_CATEGORIES } from "../../src/data/categories.ts";
import {
  DISCLAIMER_VERSION,
  DISCLAIMER_EFFECTIVE_DATE,
  DISCLAIMER_COPY,
} from "../../src/data/medical-disclaimer.ts";
import {
  SKILL_GATES,
  REQUIRED_DISAMBIGUATIONS,
  CROSS_REFERENCES,
  getGate,
} from "../../src/data/skill-gates.ts";
import { INFO_PAGES } from "../../src/data/info-pages.ts";

type SkillGateT = (typeof SKILL_GATES)[string];

// ---------------------------------------------------------------------------
// Paths + versions
// ---------------------------------------------------------------------------

const SCRIPT_DIR = import.meta.dir;
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const TEMPLATES_DIR = path.join(SCRIPT_DIR, "templates");
const OUTPUT_PARENT = process.env.SKILL_OUTPUT_DIR
  ? path.resolve(process.env.SKILL_OUTPUT_DIR)
  : path.join(REPO_ROOT, "dist", "skill");
const SKILL_NAME = "myMedKitt";
const OUTPUT_DIR = path.join(OUTPUT_PARENT, SKILL_NAME);
const STAGING_PARENT = path.join(OUTPUT_PARENT, ".staging");
let workDir = OUTPUT_DIR;

const SKILL_VERSION = "v0.1"; // coordinator POC — mirror in registry.json on bump
const GENERATOR_VERSION = "1";
const SCHEMA_VERSION = "1";

// ---------------------------------------------------------------------------
// Provenance (STANDARDS rule 21) — every build stamps WHEN it was built and
// from WHICH app state. A build from a working tree with uncommitted changes
// to any skill-source path is stamped dirty:true; the /deploy drift sentinel
// treats dirty builds as unshippable (the SHA would not equal actual content).
// ---------------------------------------------------------------------------

// Paths whose uncommitted changes make skill provenance untrustworthy.
const SKILL_SOURCE_PATHS = [
  "src/data/trees/",
  "src/data/skill-gates.ts",
  "src/data/categories.ts",
  "src/data/medical-disclaimer.ts",
  "src/data/info-pages.ts",
  "scripts/tree-registry.mjs",
  "scripts/build-skill/",
];

function git(...args: string[]): string {
  const p = Bun.spawnSync({ cmd: ["git", ...args], cwd: REPO_ROOT });
  // trimEnd only — porcelain lines are position-sensitive (' M path'), a full
  // trim() would eat the first line's leading status column.
  return p.exitCode === 0 ? new TextDecoder().decode(p.stdout).trimEnd() : "";
}

const BUILD_DATE = new Date().toISOString().slice(0, 10);
const APP_COMMIT = git("rev-parse", "HEAD");
const APP_COMMIT_SHORT = APP_COMMIT.slice(0, 7);
const DIRTY_FILES = git("status", "--porcelain", "--", ...SKILL_SOURCE_PATHS)
  .split("\n")
  .filter(Boolean)
  .map((l) => l.slice(3));
const DIRTY = DIRTY_FILES.length > 0;
// Monotonic, self-describing build version: base + date + commit (+dirty flag).
const BUILD_VERSION = `${SKILL_VERSION}+${BUILD_DATE.replace(/-/g, "")}.${APP_COMMIT_SHORT || "nogit"}${DIRTY ? ".dirty" : ""}`;

// ---------------------------------------------------------------------------
// Tree-export access (mirror of supabase-push.mjs prefix→export mapping)
// ---------------------------------------------------------------------------

type Node = { id: string; title?: string; body?: string; module?: number };
const REGISTRY = TREE_REGISTRY as Record<string, { prefix: string; entryNodeId: string; categoryId: string }>;
const TREE_SRC_DIR = path.join(REPO_ROOT, "src", "data", "trees");

// Each consult is loaded by dynamically importing its OWN source file
// (src/data/trees/<id>.ts) and reading the {PREFIX}_* exports — the same per-file
// pattern supabase-push.mjs uses, which covers every registered consult
// (trees/index.ts only re-exports a subset).
const treeModules = new Map<string, Record<string, unknown>>();

async function loadTree(treeId: string): Promise<Record<string, unknown> | null> {
  if (treeModules.has(treeId)) return treeModules.get(treeId)!;
  const file = path.join(TREE_SRC_DIR, `${treeId}.ts`);
  if (!existsSync(file)) return null;
  const mod = (await import(pathToFileURL(file).href)) as Record<string, unknown>;
  treeModules.set(treeId, mod);
  return mod;
}

function treeExport<X = unknown>(treeId: string, suffix: string): X | undefined {
  const mod = treeModules.get(treeId);
  const reg = REGISTRY[treeId];
  if (!mod || !reg) return undefined;
  return mod[`${reg.prefix}_${suffix}`] as X | undefined;
}
function treeNodes(treeId: string): Node[] {
  return (treeExport<Node[]>(treeId, "NODES") ?? []) as Node[];
}
function findNodeInTree(treeId: string, nodeId: string): Node {
  const node = treeNodes(treeId).find((n) => n.id === nodeId);
  if (!node) throw new Error(`Node '${nodeId}' not found in tree '${treeId}'. Did the ID change in src/data/trees/${treeId}.ts?`);
  return node;
}

// consult meta (title/subtitle/category) + canonical category-id→name map from
// DEFAULT_CATEGORIES. The id→name map prevents duplicate catalog headers (e.g.
// 'orthopedics' slug vs 'Orthopedics' name) for consults whose registry categoryId
// isn't represented in a category's decisionTrees list.
const CONSULT_META: Record<string, { title: string; subtitle: string; category: string }> = {};
const CATEGORY_NAMES: string[] = [];
const CATEGORY_ID_TO_NAME: Record<string, string> = {};
for (const cat of DEFAULT_CATEGORIES as Array<{ id?: string; name: string; decisionTrees?: Array<{ id: string; title: string; subtitle?: string }> }>) {
  if (cat.id && cat.name) CATEGORY_ID_TO_NAME[cat.id] = cat.name;
  if (cat.name && !CATEGORY_NAMES.includes(cat.name)) CATEGORY_NAMES.push(cat.name);
  for (const dt of cat.decisionTrees ?? []) {
    CONSULT_META[dt.id] = { title: dt.title, subtitle: dt.subtitle ?? "", category: cat.name };
  }
}
function humanize(id: string): string {
  return id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
// The registry uses a couple of slug variants for the same specialty.
const CATEGORY_ALIASES: Record<string, string> = { em: "emergency-medicine" };
function categoryName(categoryId: string): string {
  const id = CATEGORY_ALIASES[categoryId] ?? categoryId;
  return CATEGORY_ID_TO_NAME[id] ?? humanize(id);
}
function metaFor(treeId: string, categoryId: string) {
  return CONSULT_META[treeId] ?? { title: humanize(treeId), subtitle: "", category: categoryName(categoryId) };
}

// Gate → governing consults (point-of-use injection, so a gate travels with the
// consult that triggers it, not only with SKILL.md / disambiguation.md).
const GATES_BY_CONSULT: Record<string, SkillGateT[]> = {};
for (const g of Object.values(SKILL_GATES)) {
  for (const cid of g.appliesToConsults ?? []) (GATES_BY_CONSULT[cid] ??= []).push(g);
}

// Stop / Do-NOT pitfall page per consult (highest-value safety carry). Stop-page
// ids follow EITHER `<treeId>-stop` OR `<entryPrefix>-stop` (entry node id minus
// '-start', e.g. entry 'arth-start' → 'arth-stop'). Try both. Optional per consult.
function stopPageFor(treeId: string, entryId?: string): { title: string; sections: Array<{ heading?: string; body: string }> } | undefined {
  const pages = INFO_PAGES as Record<string, { id: string; title: string; sections: Array<{ heading?: string; body: string }> }>;
  if (!pages) return undefined;
  const entryPrefix = entryId ? entryId.replace(/-start$/, "") : "";
  const candidates = [`${treeId}-stop`, entryPrefix && `${entryPrefix}-stop`].filter(Boolean) as string[];
  for (const c of candidates) if (pages[c]) return pages[c];
  return undefined;
}

// ---------------------------------------------------------------------------
// Body normalization (allowlisted renderer — strip in-app link syntax)
// ---------------------------------------------------------------------------

/** Convert app-internal links `[text](#/...)` to plain `text`; keep external https links. */
function normalizeBody(body: string): string {
  if (!body) return "";
  return body
    .replace(/\[([^\]]+)\]\(#\/[^)]*\)/g, "$1") // internal nav links → text
    .replace(/ /g, " ")
    .trim();
}

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

function renderAcknowledgments(): string {
  return DISCLAIMER_COPY.acknowledgments
    .map((a, i) => `${i + 1}. **${a.title}.** ${a.text}`)
    .join("\n\n");
}

function renderDisambiguationsBlock(): string {
  return REQUIRED_DISAMBIGUATIONS.map((req) => {
    const node = findNodeInTree(req.treeId, req.nodeId);
    const gate = getGate(req.gate);
    return [
      `## ${node.title ?? humanize(req.nodeId)}`,
      `*Source: myMedKitt \`${req.treeId}\` node \`${req.nodeId}\` · gate \`${gate.id}\` · rule \`${gate.ruleId}\`*`,
      ``,
      normalizeBody(node.body ?? ""),
      ``,
      `**GATE — resolve before disposition:** ${gate.prompt}`,
    ].join("\n");
  }).join("\n\n---\n\n");
}

function renderCrossReferencesBlock(): string {
  return CROSS_REFERENCES.map((x) => {
    const consults = x.consults.map((c) => `\`${c}\``).join(" ↔ ");
    const pending = x.signedOff ? "" : "  _(pending physician sign-off)_";
    return [`## ${x.interaction}`, `Consults: ${consults}${pending}`, ``, x.note].join("\n");
  }).join("\n\n---\n\n");
}

/** One consult reference: gates + framing + critical-actions spine + Stop page + modules + citations. */
function renderConsult(
  treeId: string,
  reg: { prefix: string; entryNodeId: string; categoryId: string },
): { md: string; entryMismatch: boolean; thin: boolean; hasStop: boolean } {
  const meta = metaFor(treeId, reg.categoryId);
  const nodes = treeNodes(treeId);
  // H1/H2 fix: the registry entryNodeId can be stale (e.g. 'ana-start' vs the real
  // 'anaph-start'). Fall back to the first node (the entry by construction) so the
  // entry framing is NEVER silently dropped — and flag the mismatch for reconciliation.
  const byId = nodes.find((n) => n.id === reg.entryNodeId);
  const entry = byId ?? nodes[0];
  const entryMismatch = !byId && nodes.length > 0;

  const criticalActions = treeExport<Array<{ text: string; nodeId: string }>>(treeId, "CRITICAL_ACTIONS") ?? [];
  const moduleLabels = treeExport<string[]>(treeId, "MODULE_LABELS") ?? [];
  const citations = treeExport<Array<{ num: number; text: string }>>(treeId, "CITATIONS") ?? [];
  const gates = GATES_BY_CONSULT[treeId] ?? [];
  const stop = stopPageFor(treeId, entry?.id);
  const thin = criticalActions.length === 0 && !stop;

  const lines: string[] = [];
  lines.push(`# ${meta.title}`);
  lines.push(`*${meta.subtitle || meta.category}* · Specialty: ${meta.category} · Consult ID: \`${treeId}\``);
  lines.push(`*Source: myMedKitt \`src/data/trees/${treeId}.ts\` · ${nodes.length} nodes*`);
  if (thin) lines.push(`\n> ⚠️ **Thin reference** — this consult has no critical-actions spine in source yet. Hand to the app early for the full pathway.`);
  lines.push("");

  // Point-of-use safety gates FIRST (so a session that loads only this ref still sees them).
  for (const g of gates) {
    lines.push(`## ⚠️ Safety gate — resolve before disposition`);
    lines.push(g.prompt);
    lines.push("");
  }

  if (criticalActions.length > 0) {
    lines.push(`## Critical actions — lead with these`);
    for (const a of criticalActions) lines.push(`- ${normalizeBody(a.text)}`);
    lines.push("");
  }

  if (entry?.body) {
    lines.push(`## Entry framing`);
    lines.push(normalizeBody(entry.body));
    lines.push("");
  }

  // Stop / Do-NOT pitfalls — pure must-not-miss content, authored in info-pages.ts.
  if (stop) {
    lines.push(`## 🛑 Do NOT — critical pitfalls`);
    for (const s of stop.sections) {
      if (s.heading) lines.push(`**${s.heading}**`);
      if (s.body) lines.push(normalizeBody(s.body));
    }
    lines.push("");
  }

  if (moduleLabels.length > 0) {
    lines.push(`## Pathway structure`);
    moduleLabels.forEach((m, i) => lines.push(`${i + 1}. ${m}`));
    lines.push("");
  }

  if (citations.length > 0) {
    lines.push(`## Citations`);
    for (const c of citations) lines.push(`**[${c.num}]** ${normalizeBody(c.text)}`);
    lines.push("");
  }

  lines.push("---");
  // Truthful footer: advertise only the components this consult actually carries
  // (no false "Stop pitfalls" / "spine" claim on a thin or Stop-less ref).
  const carried: string[] = [];
  if (gates.length > 0) carried.push("safety gates");
  if (criticalActions.length > 0) carried.push("critical-actions spine");
  if (entry?.body) carried.push("entry framing");
  if (stop) carried.push("Stop pitfalls");
  if (citations.length > 0) carried.push("citations");
  const carriedStr = carried.length > 0 ? carried.join(" + ") : "entry framing only";
  lines.push(
    `*Baseline coordinator reference (${carriedStr}). Full per-node decision detail, calculators, weight-based drug dosing, and images live in the myMedKitt app — hand off there for execution.*`,
  );
  return { md: lines.join("\n"), entryMismatch, thin, hasStop: !!stop };
}

function renderConsultIndex(emittedConsults: Array<{ treeId: string; meta: { title: string; subtitle: string; category: string } }>): string {
  const byCat: Record<string, Array<{ treeId: string; title: string; subtitle: string }>> = {};
  for (const c of emittedConsults) {
    (byCat[c.meta.category] ??= []).push({ treeId: c.treeId, title: c.meta.title, subtitle: c.meta.subtitle });
  }
  const out: string[] = [
    `# Consult catalog — ${emittedConsults.length} consults`,
    ``,
    `Match the clinician's presentation to a consult below, then open \`consults/<id>.md\`. Load only what's in play. Categories are alphabetical; consults alphabetical within.`,
    ``,
  ];
  for (const cat of Object.keys(byCat).sort()) {
    out.push(`## ${cat}`);
    for (const c of byCat[cat].sort((a, b) => a.title.localeCompare(b.title))) {
      const sub = c.subtitle ? ` — ${c.subtitle}` : "";
      out.push(`- **${c.title}**${sub} → \`consults/${c.treeId}.md\` _(id: ${c.treeId})_`);
    }
    out.push("");
  }
  return out.join("\n");
}

// ---------------------------------------------------------------------------
// Template engine (supports {{var}} and {{gate:<id>}})
// ---------------------------------------------------------------------------

async function renderTemplate(filename: string, vars: Record<string, string>): Promise<string> {
  const tmpl = await fs.readFile(path.join(TEMPLATES_DIR, filename), "utf8");
  const missing: string[] = [];
  const out = tmpl.replace(/\{\{([\w:.-]+)\}\}/g, (_, key: string) => {
    if (key.startsWith("gate:")) {
      const g = SKILL_GATES[key.slice(5)];
      if (!g) { missing.push(key); return `<<MISSING_GATE:${key}>>`; }
      return g.prompt;
    }
    if (!(key in vars)) { missing.push(key); return `<<MISSING:${key}>>`; }
    return vars[key];
  });
  if (missing.length) throw new Error(`${filename}: missing ${missing.join(", ")}`);
  return out;
}

const emitted: Record<string, string> = {};
async function writeFile(rel: string, content: string): Promise<void> {
  const full = path.join(workDir, rel);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, content, "utf8");
  emitted[rel] = content;
}

// ---------------------------------------------------------------------------
// Gates
// ---------------------------------------------------------------------------

function assertCoverage(): void {
  // Scope to the file that is SUPPOSED to carry each artifact (not the global
  // 314-file haystack) so one section can't satisfy another's check (M6), and so
  // the check is meaningful, not tautological-against-itself (H3).
  const norm = (s: string) => s.replace(/\s+/g, " ").trim();
  const disambig = norm(emitted["references/disambiguation.md"] ?? "");
  const problems: string[] = [];

  for (const req of REQUIRED_DISAMBIGUATIONS) {
    let node;
    try {
      node = findNodeInTree(req.treeId, req.nodeId); // structured failure (M5), not raw throw
    } catch {
      problems.push(`required disambiguation source '${req.treeId}/${req.nodeId}' not found (deleted/renamed?)`);
      continue;
    }
    const body = normalizeBody(node.body ?? "");
    // H4: reject empty/near-empty body — never a vacuous pass.
    if (body.replace(/\s+/g, "").length < 40) {
      problems.push(`disambiguation body '${req.treeId}/${req.nodeId}' is empty/too short (<40 chars) — would ship a heading with no teaching`);
      continue;
    }
    // H3/drift: the clinically load-bearing phrase must survive into the emitted file.
    if (!disambig.includes(norm(req.mustContainPhrase))) {
      problems.push(`disambiguation '${req.treeId}/${req.nodeId}' lost its load-bearing phrase ("${req.mustContainPhrase}") — safety content drifted or was dropped`);
    }
    const gate = getGate(req.gate);
    if (!disambig.includes(norm(gate.prompt).slice(0, 80))) {
      problems.push(`gate '${gate.id}' prompt not present in disambiguation.md`);
    }
  }
  if (problems.length) throw new Error(`Coverage check FAILED:\n  - ${problems.join("\n  - ")}`);
  console.log(`  ✓ coverage: ${REQUIRED_DISAMBIGUATIONS.length} required disambiguation(s) carried with load-bearing phrase + gate (drift-resistant)`);
}

function assertContentSafe(): void {
  const patterns: Array<{ re: RegExp; label: string }> = [
    { re: /\b(sk-[A-Za-z0-9]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|ghp_[A-Za-z0-9]{20,})\b/, label: "API token" },
    { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/, label: "private key" },
    { re: /\b(\/Users\/[A-Za-z0-9._-]+|\/home\/[A-Za-z0-9._-]+)\b/, label: "absolute local path" },
    { re: /\bMRN[:#]?\s*\d{5,}\b/i, label: "MRN-like identifier" },
    { re: /\b\d{3}-\d{2}-\d{4}\b/, label: "SSN-like number" },
  ];
  const problems: string[] = [];
  for (const [file, content] of Object.entries(emitted)) {
    for (const { re, label } of patterns) {
      const m = content.match(re);
      if (m) problems.push(`${file}: possible ${label} → "${m[0].slice(0, 40)}"`);
    }
  }
  if (problems.length) throw new Error(`Content-safety scan FAILED:\n  - ${problems.join("\n  - ")}`);
  console.log(`  ✓ content-safety: no secrets / local paths / PHI-shapes in ${Object.keys(emitted).length} files`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function build() {
  console.log(`📦 Building coordinator skill: ${SKILL_NAME}`);
  console.log(`   Source: myMedKitt src/data (disclaimer ${DISCLAIMER_VERSION})`);

  await fs.rm(STAGING_PARENT, { recursive: true, force: true });
  workDir = path.join(STAGING_PARENT, SKILL_NAME);
  await fs.mkdir(workDir, { recursive: true });

  const registry = TREE_REGISTRY as Record<string, { prefix: string; entryNodeId: string; categoryId: string }>;
  const allIds = Object.keys(registry);

  // Per-consult references (the bulk — full baseline for all registered consults).
  const emittedConsults: Array<{ treeId: string; meta: { title: string; subtitle: string; category: string } }> = [];
  const skipped: Array<{ treeId: string; reason: string }> = [];
  const entryMismatches: string[] = []; // registry entryNodeId stale → fell back to first node
  const thinConsults: string[] = []; // no critical-actions spine + no Stop page
  let stopPagesCarried = 0;
  for (const treeId of allIds) {
    const reg = registry[treeId];
    try {
      const mod = await loadTree(treeId);
      if (!mod) {
        skipped.push({ treeId, reason: `source file src/data/trees/${treeId}.ts not found` });
        continue;
      }
      const nodes = treeNodes(treeId);
      if (nodes.length === 0) {
        skipped.push({ treeId, reason: `no ${reg.prefix}_NODES export in ${treeId}.ts` });
        continue;
      }
      const r = renderConsult(treeId, reg);
      await writeFile(`references/consults/${treeId}.md`, r.md);
      emittedConsults.push({ treeId, meta: metaFor(treeId, reg.categoryId) });
      if (r.entryMismatch) entryMismatches.push(treeId);
      if (r.thin) thinConsults.push(treeId);
      if (r.hasStop) stopPagesCarried++;
    } catch (err) {
      skipped.push({ treeId, reason: err instanceof Error ? err.message : String(err) });
    }
  }
  console.log(`  ✓ ${emittedConsults.length} consult references (${skipped.length} skipped · ${stopPagesCarried} with Stop pages · ${entryMismatches.length} entryNodeId fallbacks · ${thinConsults.length} thin)`);

  // Catalog / routing table
  await writeFile("references/index.md", renderConsultIndex(emittedConsults));

  // Narrative reference files
  await writeFile(
    "references/disclaimer.md",
    await renderTemplate("disclaimer.md.tmpl", {
      disclaimer_version: DISCLAIMER_VERSION,
      disclaimer_effective_date: DISCLAIMER_EFFECTIVE_DATE,
      intro_paragraph: DISCLAIMER_COPY.intro,
      acknowledgments_block: renderAcknowledgments(),
      banner_text: DISCLAIMER_COPY.banner.text,
    }),
  );
  await writeFile("references/patient-refusal.md", await renderTemplate("patient-refusal.md.tmpl", {}));
  await writeFile("references/disambiguation.md", await renderTemplate("disambiguation.md.tmpl", { disambiguations_block: renderDisambiguationsBlock() }));
  await writeFile("references/cross-references.md", await renderTemplate("cross-references.md.tmpl", { cross_references_block: renderCrossReferencesBlock() }));
  await writeFile("references/citations.md", await renderTemplate("citations.md.tmpl", { consult_count: String(emittedConsults.length) }));

  // SKILL.md router
  await writeFile(
    "SKILL.md",
    await renderTemplate("SKILL.md.tmpl", {
      disclaimer_version: DISCLAIMER_VERSION,
      disclaimer_effective_date: DISCLAIMER_EFFECTIVE_DATE,
      consult_count: String(emittedConsults.length),
      category_count: String(CATEGORY_NAMES.length),
      category_list: CATEGORY_NAMES.sort().join(", "),
    }),
  );

  // Gates (on staged output, before promotion)
  assertCoverage();
  assertContentSafe();

  // Zip staged folder
  const stagedArchive = path.join(STAGING_PARENT, `${SKILL_NAME}.skill`);
  const zip = Bun.spawnSync({ cmd: ["bash", "-c", `cd "${STAGING_PARENT}" && zip -r -q - "${SKILL_NAME}" > "${SKILL_NAME}.skill"`] });
  if (zip.exitCode !== 0) throw new Error(`zip failed: ${new TextDecoder().decode(zip.stderr)}`);

  const contentHash = crypto
    .createHash("sha256")
    .update(Object.keys(emitted).sort().map((k) => `${k}\n${emitted[k]}`).join("\n"))
    .digest("hex");
  const meta = {
    skillVersion: SKILL_VERSION,
    buildVersion: BUILD_VERSION,
    buildDate: BUILD_DATE,
    appCommit: APP_COMMIT,
    dirty: DIRTY,
    dirtyFiles: DIRTY_FILES,
    shape: "coordinator",
    disclaimerVersion: DISCLAIMER_VERSION,
    disclaimerEffectiveDate: DISCLAIMER_EFFECTIVE_DATE,
    generatorVersion: GENERATOR_VERSION,
    schemaVersion: SCHEMA_VERSION,
    contentHash,
    consultCount: emittedConsults.length,
    registeredConsults: allIds.length,
    skippedConsults: skipped,
    stopPagesCarried,
    entryNodeIdFallbacks: entryMismatches, // registry entryNodeId stale → used first node; reconcile registry
    thinConsults, // no critical-actions spine + no Stop page — flagged in-file
    requiredDisambiguations: REQUIRED_DISAMBIGUATIONS.map((r) => `${r.treeId}/${r.nodeId}`),
    gates: Object.keys(SKILL_GATES),
    crossReferences: CROSS_REFERENCES.map((x) => x.id),
    fidelity: "baseline per consult (safety gates + critical-actions spine + entry framing + Stop pitfalls + citations WHERE PRESENT — each consult's footer lists what it actually carries; thin consults flagged); deep per-node branch/disposition carry pending consult-by-consult expansion",
    conformance: {
      rule16_fidelity: "baseline/partial — spine + framing + Stop pages carried; branch-decision & disposition-gate reasoning not yet",
      rule17_disambiguations: `${REQUIRED_DISAMBIGUATIONS.length}-registered — ~18 more candidate traps identified, pending physician sign-off`,
      rule14_crossReferences: `${CROSS_REFERENCES.length}-of-N, unsigned — pending physician sign-off`,
      rule19_releaseGate: "build:skill:check (coverage drift-resistant + content-safety + reachability)",
      rule21_atomicBuild: "staging→promote; provenance hash present",
      rule23_coordinatorScale: "roadmap — reachability budget, per-consult rollback, host/model matrix not yet built",
    },
    coverage: "pass",
    contentSafety: "pass",
  };

  // Atomic promotion
  const archivePath = path.join(OUTPUT_PARENT, `${SKILL_NAME}.skill`);
  const metaPath = path.join(OUTPUT_PARENT, "skill-meta.json");
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  await fs.rename(workDir, OUTPUT_DIR);
  await fs.rename(stagedArchive, archivePath);
  await fs.writeFile(metaPath, JSON.stringify(meta, null, 2) + "\n", "utf8");
  await fs.rm(STAGING_PARENT, { recursive: true, force: true });

  console.log("");
  console.log(`✅ Built: ${archivePath}`);
  console.log(`   ${emittedConsults.length}/${allIds.length} consults · contentHash ${contentHash.slice(0, 12)}… · ${BUILD_VERSION}`);
  if (DIRTY) {
    console.log(`   🚨 DIRTY BUILD — uncommitted changes in skill-source paths (provenance SHA does not match content):`);
    for (const f of DIRTY_FILES.slice(0, 10)) console.log(`        - ${f}`);
    console.log(`   Commit or revert these before promoting to docs/skill/ — the /deploy sentinel will refuse a dirty build.`);
  }
  if (skipped.length) {
    console.log(`   ⚠️  ${skipped.length} consult(s) skipped (recorded in skill-meta.json):`);
    for (const s of skipped.slice(0, 12)) console.log(`        - ${s.treeId}: ${s.reason.slice(0, 80)}`);
    if (skipped.length > 12) console.log(`        … and ${skipped.length - 12} more`);
  }
}

build().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
