import { keysFor } from '../../src/services/question-search.ts';
import { loadCorpus } from '../../scripts/search-corpus.ts';
import { GOLD } from '../../scripts/search-gold.ts';
import { HELDOUT } from '../../scripts/search-heldout.ts';
const { index } = await loadCorpus();
for (const [name, set] of [['gold', GOLD], ['heldout', HELDOUT]] as const) for (const g of set) {
  const { results } = index.search(g.q, 12);
  const rank = results.findIndex((r) => keysFor(r.doc).some((k) => g.expect.includes(k))) + 1;
  console.log(`${name}\t${rank}\t${g.q}\t${results[0]?.doc.title}`);
}
