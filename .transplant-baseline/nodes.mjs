import { TREE_REGISTRY } from '../scripts/tree-registry.mjs';
const R='/Users/kittechsix/Developer/mymedkitt-transplant/';
const want=process.argv.slice(2);
for(const id of want){ const reg=TREE_REGISTRY[id]; if(!reg){console.log('==',id,'NOT IN REGISTRY');continue;}
 const m=await import(R+`src/data/trees/${id}.ts`); const nodes=m[reg.prefix+'_NODES']; console.log('==',id,nodes.length,'nodes; entry',reg.entryNodeId);
 for(const n of nodes){ const ok=n.summary&&n.summary.trim()&&n.citation&&n.citation.length; if(ok) console.log('  OK ',n.id,'|',n.title.slice(0,50),'|',n.summary.slice(0,90)); else if(process.env.ALL) console.log('  -- ',n.id,'|',n.title.slice(0,50),'|sum',!!n.summary,'cit',!!(n.citation&&n.citation.length)); } }
