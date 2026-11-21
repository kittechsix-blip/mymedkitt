const t=await import('/Users/kittechsix/Developer/mymedkitt-transplant/src/data/trees/transplant-patient-ed.ts');
const plain=s=>s.replace(/\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/\[\d+\]/g,'').replace(/\*\*/g,'').replace(/[•|]/g,' ');
const w=s=>plain(s).split(/\s+/).filter(Boolean).length;
const pg=id=>id.startsWith('tpe-cni-htn')||id==='tpe-cni-hypertension'?'cni-hyp':id.startsWith('tpe-cni-')?'cni-tox':(['heart','liver','lung','cmv','bk'].find(k=>id===`tpe-${k}`||id.startsWith(`tpe-${k}-`))||'-');
const m={}; for(const n of t.TRANSPLANT_PATIENT_ED_NODES){ if(n.title.startsWith('[NOT')||n.id==='tpe-start')continue; const k=pg(n.id); if(!m[k]||m[k][1]<w(n.body)) m[k]=[n.id,w(n.body)]; }
console.log(JSON.stringify(m)); console.log('max CA words',Math.max(...t.TRANSPLANT_PATIENT_ED_CRITICAL_ACTIONS.map(c=>w(c.text))));
const c=t.TRANSPLANT_PATIENT_ED_CITATIONS; console.log(c.map(x=>x.num+': '+x.text.slice(0,40)+' ... '+x.text.slice(-45)).join('\n'));
