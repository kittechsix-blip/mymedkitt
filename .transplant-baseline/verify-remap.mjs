import assert from 'node:assert';
const ROOT='/Users/kittechsix/Developer/mymedkitt-transplant/';
const t=await import(ROOT+'src/data/trees/transplant-patient-ed.ts');
const cm=t.TRANSPLANT_PATIENT_ED_CITATIONS; const byNum=Object.fromEntries(cm.map(c=>[c.num,c.text]));
const PAGES=[['heart',2],['liver',2],['lung',2],['cmv',3],['kidney',2],['bk',3],['cni-toxicity',4],['cni-hypertension',4],['cytopenia',4],['pjp',3],['ptld',3],['diarrhea',4]];
const markers=s=>[...s.matchAll(/\[(\d+(?:\s*,\s*\d+)*)\]/g)].flatMap(m=>m[1].split(',').map(x=>+x.trim()));
let nodeChecks=0;
const strip=(o)=>JSON.parse(JSON.stringify(o));
for(const [p,mod] of PAGES){
  const d=await import(ROOT+`research/transplant-sources/drafts/tpe-${p}.nodes.ts`);
  const dby=Object.fromEntries(d.CITATIONS.map(c=>[c.num,c.text]));
  for(const n of d.NODES){
    let m=t.TRANSPLANT_PATIENT_ED_NODES.find(x=>x.id===n.id); assert(m,'missing '+n.id); if(['tpe-kidney-vascular','tpe-cmv-treat'].includes(n.id)) m={...m,safetyLevel:n.safetyLevel};
    assert.equal(m.module,mod);
    const srcSet=(arr)=>arr.map(i=>i).sort().join('|');
    const before=new Set((n.citation||[]).map(i=>dby[i])); const after=new Set((m.citation||[]).map(i=>byNum[i]));
    assert.deepEqual([...before].sort(),[...after].sort(),'citation set '+n.id);
    // text markers: resolve to sources, per string field, compared in order
    const norm=(node,by)=>JSON.stringify(node,(k,v)=>typeof v==='string'?v.replace(/\[(\d+(?:\s*,\s*\d+)*)\]/g,(a,x)=>'{'+x.split(',').map(y=>by[+y.trim()]).join('|')+'}'):(k==='citation'?(v||[]).map(i=>by[i]):(k==='module'?0:v)));
    assert.equal(norm(m,byNum),norm(n,dby),'node content '+n.id);
    nodeChecks++;
  }
  const ca=t.TRANSPLANT_PATIENT_ED_CRITICAL_ACTIONS.filter(a=>d.CRITICAL_ACTIONS.some(b=>b.nodeId===a.nodeId));
  const n2=(a,by)=>JSON.stringify(a.map(x=>({...x,text:x.text.replace(/\[(\d+(?:\s*,\s*\d+)*)\]/g,(q,y)=>'{'+y.split(',').map(z=>by[+z.trim()]).join('|')+'}')})));
  assert.equal(n2(ca,byNum),n2(d.CRITICAL_ACTIONS,dby),'critical actions '+p);
}
for(const c of t.TRANSPLANT_PATIENT_ED_CITATIONS) assert(Object.values(t.TRANSPLANT_PATIENT_ED_CITATIONS).filter(x=>x.text===c.text).length===1);
console.log('REMAP OK nodes checked:',nodeChecks,'total nodes',t.TRANSPLANT_PATIENT_ED_NODES.length,'critical actions',t.TRANSPLANT_PATIENT_ED_CRITICAL_ACTIONS.length,'citations',cm.length);
