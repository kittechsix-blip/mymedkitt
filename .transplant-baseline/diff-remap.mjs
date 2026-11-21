const ROOT='/Users/kittechsix/Developer/mymedkitt-transplant/';
const t=await import(ROOT+'src/data/trees/transplant-patient-ed.ts');
const byNum=Object.fromEntries(t.TRANSPLANT_PATIENT_ED_CITATIONS.map(c=>[c.num,c.text]));
for(const p of ['heart','liver','lung','cmv','bk']){
  const d=await import(ROOT+`research/transplant-sources/drafts/tpe-${p}.nodes.ts`);
  const dby=Object.fromEntries(d.CITATIONS.map(c=>[c.num,c.text]));
  const norm=(node,by)=>JSON.stringify(node,(k,v)=>typeof v==='string'?v.replace(/\[(\d+)\]/g,(a,x)=>'{'+by[+x]+'}'):(k==='citation'?(v||[]).map(i=>by[i]):(k==='module'?0:v)));
  for(const n of d.NODES){ const m=t.TRANSPLANT_PATIENT_ED_NODES.find(x=>x.id===n.id); const a=norm(m,byNum), b=norm(n,dby);
    if(a!==b){ const ja=JSON.parse(a), jb=JSON.parse(b); const diffs=Object.keys({...ja,...jb}).filter(k=>JSON.stringify(ja[k])!==JSON.stringify(jb[k])); console.log(p,n.id,'DIFF fields:',diffs.join(',')); } }
  console.log(p,'checked',d.NODES.length);
}
