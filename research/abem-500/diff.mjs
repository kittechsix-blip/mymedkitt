import fs from 'node:fs';
const [a,b]=process.argv.slice(2).map(f=>JSON.parse(fs.readFileSync(f,'utf8')));
const bm=new Map(b.map(r=>[r.id,r])); let imp=[],reg=[];
for(const r of a){ if(!r.kw) continue; const n=bm.get(r.id); const ra=r.rank||99, rb=n.rank||99; if(rb<ra) imp.push(`${r.rank||'-'}→${n.rank||'-'} ${r.q}`); if(rb>ra) reg.push(`${r.rank||'-'}→${n.rank||'-'} ${r.q}  now: ${n.top[0]}`); }
console.log('IMPROVED',imp.length); imp.forEach(x=>console.log('  +',x)); console.log('REGRESSED',reg.length); reg.forEach(x=>console.log('  -',x));
