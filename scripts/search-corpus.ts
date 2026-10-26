/**
 * Builds the question-search documents from the compiled app (docs/) and the two
 * generated indexes, exactly as the app does at runtime. Shared by the gold-set
 * test and the report script. Requires `bunx tsc` and the index scripts to have run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { buildQuestionDocs, createQuestionIndex, drugInput, type BuildInput, type QDoc, type QuestionIndex } from '../src/services/question-search.ts';
import { CLINICAL_SYNONYMS, DRUG_SYNONYMS } from '../src/services/search-synonyms.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const imp = (rel: string) => import(pathToFileURL(path.join(DOCS, rel)).href);
const json = (rel: string) => JSON.parse(fs.readFileSync(path.join(DOCS, rel), 'utf8'));

export interface Corpus {
  docs: QDoc[];
  index: QuestionIndex;
  /** every key a pin may name, to prove pins point at real pages */
  keys: Set<string>;
}

let cached: Promise<Corpus> | undefined;

/** The app's search input exactly as the app builds it at runtime (the adapter every bedside-search port has; see the skill's references/contract.md). */
export async function loadInput(): Promise<BuildInput> {
  {
    const cats = await imp('data/categories.js');
    const calcMod = await imp('components/calculator.js');
    const drugMod = await imp('data/drug-store.js');
    const nodeIdx = json('data/search-node-index.json');
    const ansIdx = json('data/search-answer-index.json');
    const seen = new Set<string>();
    const consults: BuildInput['consults'] = [];
    for (const c of cats.getAllCategories()) {
      for (const t of c.decisionTrees) {
        if (seen.has(t.id)) continue;
        seen.add(t.id);
        consults.push({ id: t.id, title: t.title, subtitle: t.subtitle, synonyms: CLINICAL_SYNONYMS[t.id] ?? [] });
      }
    }
    const input: BuildInput = {
      consults,
      nodes: [...nodeIdx.nodes, ...(ansIdx.extraNodes ?? [])],
      tricks: nodeIdx.tricks ?? [],
      info: ansIdx.info,
      pages: ansIdx.pages,
      drugs: drugMod.ALL_DRUGS.map((d: Parameters<typeof drugInput>[0]) => drugInput(d, DRUG_SYNONYMS[d.name.toLowerCase()] ?? [])),
      calcs: calcMod.getAllCalculators().map((c: { id: string; title: string; subtitle: string }) => ({ id: c.id, title: c.title, subtitle: c.subtitle })),
    };
    return input;
  }
}

export function loadCorpus(): Promise<Corpus> {
  cached ??= (async () => {
    const input = await loadInput();
    const consults = input.consults;
    const docs = buildQuestionDocs(input);
    const keys = new Set<string>();
    for (const c of consults) keys.add(`tree:${c.id}`);
    for (const n of input.nodes) keys.add(`node:${n.treeId}/${n.id}`);
    for (const s of input.info) {
      keys.add(`info:${s.p}`);
      keys.add(`sec:${s.p}#${s.a}`);
    }
    for (const g of input.pages ?? []) keys.add(`info:${g.p}`);
    for (const d of input.drugs) keys.add(`drug:${d.id}`);
    for (const c of input.calcs) keys.add(`calc:${c.id}`);
    return { docs, index: createQuestionIndex(docs), keys };
  })();
  return cached;
}
