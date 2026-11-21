import { TREE_REGISTRY } from '../scripts/tree-registry.mjs';
const R='/Users/kittechsix/Developer/mymedkitt-transplant/';
const od=await import(R+'src/data/onc-drugs/index.ts');
const ids=['drug-qt-prolongation','drug-adrenal-insufficiency','drug-gi-perforation','drug-hepatotoxicity','drug-pancreatitis','drug-severe-skin','rhabdomyolysis','drug-lung-toxicity','drug-fluid-retention','drug-thromboembolism','drug-nephrotoxicity','drug-hypertension','chemo-hypersensitivity','chemo-myelosuppression'];
const cache={};
const load=async(id)=>{ if(cache[id]) return cache[id]; const reg=TREE_REGISTRY[id]; const m=await import(R+`src/data/trees/${id}.ts`); return cache[id]=m[reg.prefix+'_NODES']; };
const walk=(v,o)=>{ if(typeof v==='string')o.push(v); else if(Array.isArray(v))v.forEach(x=>walk(x,o)); else if(v&&typeof v==='object')Object.values(v).forEach(x=>walk(x,o)); };
for(const id of ids){ const t=od.ONC_DATA.toxicities.find(x=>x.id===id); const nodes=await load(t.page.tree); const n=nodes.find(x=>x.id===t.page.node);
 const txt=[]; walk(n,txt); const s=txt.join('\n'); const hits=[...new Set((s.match(/oncolog\w*|chemotherap\w*|cytotoxic|checkpoint|CAR[- ]?T|immunotherap\w*|neutropeni\w*|cancer|tumou?r|malignan\w*/gi)||[]).map(x=>x.toLowerCase()))];
 const onTree=t.page.tree==='onc-drug-side-effects'||t.page.tree==='oncological-emergencies';
 const closing=/treating oncologist/i.test(s);
 // follow next/options one level for closing
 console.log(id,'|',t.page.tree+'/'+t.page.node,'| onc tree',onTree,'| has summary+cit',!!(n.summary&&n.citation?.length),'| oncologist',/oncologist/i.test(s),'closing "treating oncologist"',closing,'| terms',hits.join(',')||'-','| leth',t.lethality); }
