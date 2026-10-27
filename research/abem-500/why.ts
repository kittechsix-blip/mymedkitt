import { loadCorpus } from '../../scripts/search-corpus.ts';
const { index } = await loadCorpus();
for (const q of process.argv.slice(2)) {
  const r: any = (index as any).search(q, 5, true);
  console.log(`\n## ${q}  mode=${r.mode} intents=${JSON.stringify(r.parsed?.intents ?? r.parsed?.intent ?? '')} words=${JSON.stringify(r.parsed?.words ?? r.parsed?.terms ?? '')}`);
  for (const x of r.results) console.log(`  ${x.doc.kind} | ${x.doc.title} [${x.doc.parent ?? ''}] | ${x.why ?? ''}`.slice(0, 260));
}
