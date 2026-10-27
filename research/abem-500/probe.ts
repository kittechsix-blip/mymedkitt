import { loadInput, loadCorpus } from '../../scripts/search-corpus.ts';
const inp = await loadInput(); const { index } = await loadCorpus();
const terms = process.argv.slice(2);
for (const t of terms) {
  const rx = new RegExp(t, 'i');
  const c = inp.consults.filter((x: any) => rx.test(x.title + ' ' + x.id));
  const calc = inp.calcs.filter((x: any) => rx.test(x.title + ' ' + x.id));
  const drug = inp.drugs.filter((x: any) => rx.test(x.name + ' ' + (x.genericName ?? '')));
  const info = inp.info.filter((x: any) => rx.test(x.h ?? x.title ?? '')).length;
  const nodes = inp.nodes.filter((x: any) => rx.test(x.title ?? '')).length;
  console.log(`## ${t}: consults=[${c.map((x: any) => x.id + ':' + x.title).join('; ')}] calcs=[${calc.map((x: any) => x.id).join(',')}] drugs=${drug.length} infoHeads=${info} nodeTitles=${nodes}`);
}
