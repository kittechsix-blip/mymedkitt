const R='/Users/kittechsix/Developer/mymedkitt-transplant/';
const t=await import(R+'src/data/trees/transplant-patient-ed.ts');
const info=(await import(R+'src/data/info-pages.ts')).INFO_PAGES;
const store=(await import(R+'src/data/drug-store.ts')).ALL_DRUGS; const drugIds=new Set(store.map(d=>d.id));
const cats=(await import(R+'src/data/categories.ts')).getAllCategories?.() ?? [];
const treeIds=new Set(); for(const c of cats) for(const x of c.decisionTrees) treeIds.add(x.id);
const calc=await import(R+'src/components/calculator.ts').catch(()=>null);
const calcIds=new Set((calc?.getAllCalculators?.()||[]).map(c=>c.id));
const tpeInfo=Object.entries(info).filter(([k])=>k.startsWith('tpe-'));
const texts=[]; const w=(v,where)=>{ if(typeof v==='string') texts.push([where,v]); else if(Array.isArray(v)) v.forEach(x=>w(x,where)); else if(v&&typeof v==='object') for(const [k,x] of Object.entries(v)) w(x,where); };
for(const n of t.TRANSPLANT_PATIENT_ED_NODES){ w([n.body,n.summary,n.recommendation,n.options],n.id); }
for(const c of t.TRANSPLANT_PATIENT_ED_CRITICAL_ACTIONS) w(c.text,'CA '+c.nodeId);
for(const [id,p] of tpeInfo) w(p.sections,'info '+id);
const nodeIds=new Set(t.TRANSPLANT_PATIENT_ED_NODES.map(n=>n.id));
const bad=[]; const counts={info:0,tree:0,drug:0,node:0,calc:0};
for(const [where,s] of texts) for(const m of s.matchAll(/\(#\/([a-z]+)\/([^)\s]+)\)/g)){ const [_,kind,rest]=m; const parts=rest.split('/');
  if(kind==='info'){counts.info++; if(!info[parts[0]]) bad.push([where,m[0]]);}
  else if(kind==='tree'){counts.tree++; if(!treeIds.has(parts[0])) bad.push([where,m[0]]);}
  else if(kind==='drug'){counts.drug++; if(!drugIds.has(parts[0])) bad.push([where,m[0]]);}
  else if(kind==='node'){counts.node++; if(!nodeIds.has(parts[0])) bad.push([where,m[0]]+' (jump target not in tpe tree)');}
  else if(kind==='calculator'){counts.calc++; if(calcIds.size&&!calcIds.has(parts[0])) bad.push([where,m[0]]);}
  else bad.push([where,'unknown kind '+m[0]]); }
// options.next and next
for(const n of t.TRANSPLANT_PATIENT_ED_NODES){ for(const o of n.options||[]) if(!nodeIds.has(o.next)) bad.push([n.id,'option next '+o.next]); if(n.next&&!nodeIds.has(n.next)) bad.push([n.id,'next '+n.next]);
  for(const cl of n.calculatorLinks||[]){ const k=cl.kind||'calculator'; if(k==='tree'&&!treeIds.has(cl.id)) bad.push([n.id,'calculatorLink tree '+cl.id]); if(k==='tree'&&cl.node){ /* node deep link: check in tree file */ } if(k==='info'&&!info[cl.id]) bad.push([n.id,'calculatorLink info '+cl.id]); if(k==='calculator'&&calcIds.size&&!calcIds.has(cl.id)) bad.push([n.id,'calculatorLink calc '+cl.id]); } }
console.log('overlays',tpeInfo.length,'link counts',JSON.stringify(counts),'calcIds',calcIds.size,'bad',bad.length); for(const b of bad) console.log(' ',b.join(' | '));
