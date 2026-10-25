/** Debug: top results with scores for one query. usage: node scripts/search-explain.ts "what are risks for ectopic pregnancy" */
import { routeFor } from '../src/services/question-search.ts';
import { loadCorpus } from './search-corpus.ts';
const { index } = await loadCorpus();
for (const q of process.argv.slice(2)) {
  const t = performance.now();
  const { parsed, results, mode } = index.search(q, Number(process.env.N ?? 8), true);
  console.log(`\n"${q}"  mode=${mode} topic="${parsed.topic}" intents=[${parsed.intents}] ${(performance.now() - t).toFixed(1)}ms`);
  for (const r of results) console.log(`  ${r.score.toFixed(3)}  ${r.doc.kind.padEnd(7)} ${r.doc.title.slice(0, 60)}  <${routeFor(r.doc)}>${r.indication ? ' ind=' + r.indication : ''}\n         ${r.why ?? ''}`);
}
