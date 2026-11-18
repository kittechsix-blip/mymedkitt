// Loads repo sources (strips, trees, drugs) into Node for the RAPID gate / proof / approve scripts.
// src/ files use `.js` relative specifiers; a resolve hook falls back to `.ts` so fresh src/ loads.
import { registerHooks } from 'node:module';
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import type { RapidStrip, RapidApproval, RapidFinding } from '../../src/data/rapid/types.ts';
import type { RapidVerifyCtx, RapidNodeLike, RapidDrugLike } from '../../src/services/rapid-verify.ts';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

let hooked = false;
function ensureHooks(): void {
  if (hooked) return;
  hooked = true;
  registerHooks({
    resolve(specifier, context, nextResolve) {
      try {
        return nextResolve(specifier, context);
      } catch (e) {
        if (specifier.startsWith('.') && specifier.endsWith('.js')) {
          return nextResolve(specifier.slice(0, -3) + '.ts', context);
        }
        throw e;
      }
    },
  });
}
ensureHooks();

const imp = (rel: string) => import(pathToFileURL(join(ROOT, rel)).href);

export interface LoadedTree {
  nodes: RapidNodeLike[];
  criticalActions: { text: string; nodeId: string }[];
  citations: { num: number; text: string }[];
}

export async function loadRegistry(): Promise<Record<string, { prefix: string; entryNodeId: string; categoryId: string }>> {
  return (await imp('scripts/tree-registry.mjs')).TREE_REGISTRY;
}

export async function loadStrips(): Promise<Readonly<Record<string, RapidStrip>>> {
  return (await imp('src/data/rapid/index.ts')).RAPID_STRIPS;
}
export async function loadApprovals(): Promise<Readonly<Record<string, RapidApproval>>> {
  return (await imp('src/data/rapid/approvals.ts')).RAPID_APPROVALS;
}
export async function loadDrugs(): Promise<(id: string) => RapidDrugLike | undefined> {
  const m = await imp('src/data/drug-store.ts');
  const all = m.ALL_DRUGS as RapidDrugLike[];
  const map = new Map(all.map((d) => [d.id, d]));
  return (id) => map.get(id);
}
export async function loadAllDrugs(): Promise<RapidDrugLike[]> {
  return (await imp('src/data/drug-store.ts')).ALL_DRUGS as RapidDrugLike[];
}
export async function loadTree(treeId: string, prefix: string): Promise<LoadedTree> {
  const m = await imp(`src/data/trees/${treeId}.ts`);
  return {
    nodes: (m[`${prefix}_NODES`] ?? []) as RapidNodeLike[],
    criticalActions: (m[`${prefix}_CRITICAL_ACTIONS`] ?? []) as { text: string; nodeId: string }[],
    citations: (m[`${prefix}_CITATIONS`] ?? []) as { num: number; text: string }[],
  };
}

/** The strip's findings file, or null when it is missing / not a valid findings array. */
export function loadFindings(treeId: string): RapidFinding[] | null {
  const fp = join(ROOT, `research/rapid/${treeId}.findings.json`);
  if (!existsSync(fp)) return null;
  try {
    const raw = JSON.parse(readFileSync(fp, 'utf8'));
    return Array.isArray(raw) ? (raw as RapidFinding[]) : null;
  } catch {
    return null;
  }
}

/** Gate-time context: live repo trees and drugs, the whole drug store (drug-as-steps rule) and the findings file. */
export async function makeCtx(treeId: string): Promise<{ ctx: RapidVerifyCtx; tree: LoadedTree }> {
  const reg = await loadRegistry();
  const entry = reg[treeId];
  if (!entry) throw new Error(`tree "${treeId}" is not in TREE_REGISTRY`);
  const tree = await loadTree(treeId, entry.prefix);
  return {
    ctx: { nodes: tree.nodes, criticalActions: tree.criticalActions, getDrug: await loadDrugs(), entryNodeId: entry.entryNodeId, allDrugs: await loadAllDrugs(), findings: loadFindings(treeId) ?? [] },
    tree,
  };
}
