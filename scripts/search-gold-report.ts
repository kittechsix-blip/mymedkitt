/** Prints the gold / held-out table. usage: node scripts/search-gold-report.ts [--md] */
import { keysFor, routeFor } from '../src/services/question-search.ts';
import { loadCorpus } from './search-corpus.ts';
import { GOLD } from './search-gold.ts';
import { HELDOUT, type GoldQuestion } from './search-heldout.ts';

const md = process.argv.includes('--md');
/** The held-out misses stay hidden while tuning: only --reveal (final report) prints them. */
const reveal = process.argv.includes('--reveal');
const { index } = await loadCorpus();

function run(set: GoldQuestion[]) {
  return set.map((g) => {
    const { results } = index.search(g.q, 12);
    const rank = results.findIndex((r) => keysFor(r.doc).some((k) => g.expect.includes(k))) + 1;
    return { g, rank, top: results[0] ? `${results[0].doc.kind}:${routeFor(results[0].doc)}` : '-', ms: 0 };
  });
}
for (const [name, set] of [['GOLD', GOLD], ['HELD-OUT', HELDOUT]] as const) {
  const rows = run(set);
  const r1 = rows.filter((r) => r.rank === 1).length;
  const t3 = rows.filter((r) => r.rank >= 1 && r.rank <= 3).length;
  console.log(`${name}: rank1 ${r1}/${rows.length} (${Math.round((100 * r1) / rows.length)}%)  top3 ${t3}/${rows.length} (${Math.round((100 * t3) / rows.length)}%)`);
  if (name === 'HELD-OUT' && !reveal) continue;
  for (const r of rows) if (r.rank !== 1 || md) console.log(`  ${md ? (r.rank === 1 ? '| 1 ' : `| ${r.rank || '>12'} `) : `rank=${r.rank || '>12'}`}  "${r.g.q}"  top: ${r.top}`);
}
