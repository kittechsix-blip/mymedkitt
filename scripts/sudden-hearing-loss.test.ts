import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { HEARING_LOSS_NODES as nodes, HEARING_LOSS_CITATIONS as citations, HEARING_LOSS_CRITICAL_ACTIONS as critical } from '../src/data/trees/sudden-hearing-loss.ts';
import { INFO_PAGES } from '../docs/data/info-pages.js';
import { TOOLBAR_CONFIGS } from '../docs/data/toolbar-configs.js';
import { ALL_DRUGS } from '../docs/data/drug-store.js';
import { getCalculatorIds } from '../docs/components/calculator.js';
import { loadCorpus } from './search-corpus.ts';
const map = new Map(nodes.map(n=>[n.id,n]));
test('hearing-loss branches are reachable, cited and terminate',()=>{
 assert.equal(map.size,nodes.length);
 const targets=(n:typeof nodes[number])=>[...(n.next?[n.next]:[]),...(n.options??[]).map(o=>o.next)];
 const visited=new Set<string>(),queue=['sudden-hearing-loss-start'];
 while(queue.length){const id=queue.pop()!;if(visited.has(id))continue;visited.add(id);const n=map.get(id);assert.ok(n,id);queue.push(...targets(n));}
 assert.equal(visited.size,nodes.length,'unreachable nodes');
 for(const n of nodes){
  assert.ok(n.citation?.length,n.id+' lacks references');
  for(const c of n.citation??[])assert.ok(citations.some(x=>x.num===c));
  for(const im of n.images??[])assert.ok(existsSync(new URL('../docs/'+im.src,import.meta.url)));
  const seen=new Set<string>(),q=[n.id];let terminal=false;
  while(q.length){const id=q.pop()!;if(seen.has(id))continue;seen.add(id);const x=map.get(id);assert.ok(x,id);if(x.type==='result')terminal=true;q.push(...targets(x));}
  assert.ok(terminal,n.id+' has no terminal');
 }
 for(const c of critical)assert.ok(map.has(c.nodeId));
});
test('five hearing tools and automatic Stop resolve',()=>{
 const tools=TOOLBAR_CONFIGS['sudden-hearing-loss'];assert.equal(tools.length,5);
 for(const t of tools){if(t.action==='calculator')assert.ok(getCalculatorIds().includes(t.target!));else assert.ok(INFO_PAGES[t.target!]);}
 assert.ok(INFO_PAGES['sudden-hearing-loss-stop']);
});
test('SSNHL prednisone card retains a locked daily regimen and 60 mg cap',()=>{
 const p=ALL_DRUGS.find(d=>d.id==='prednisone')!;
 const d=p.dosing.find(d=>/Sudden sensorineural/.test(d.indication))!;assert.ok(d);
 const w=d.weightCalc;assert.ok(w&&!Array.isArray(w));assert.equal(w.dosePerKg,1);assert.equal(w.maxDose,60);assert.equal(w.unit,'mg');
 for(const [weight,dose] of [[45,45],[60,60],[100,60]])assert.equal(Math.min(weight*w.dosePerKg,w.maxDose),dose);
 assert.match(d.regimen,/once daily/);assert.match(d.regimen,/2 weeks/);
});
const {index}=await loadCorpus();
for(const query of ['sudden sensorineural hearing loss first line treatment','SSNHL','sudden deafness','Weber Rinne','Rhrine hearing test']){
 test('hearing search: '+query,()=>{
  const results=index.find(query,3).results;
  assert.ok(results.some(r=>/sudden-hearing-loss|hearing-fork|hearing-loss-/.test(JSON.stringify(r.doc))),JSON.stringify(results.map(r=>r.doc)));
 });
}
