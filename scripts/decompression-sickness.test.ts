import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DECOMPRESSION_SICKNESS_NODES as nodes, DECOMPRESSION_SICKNESS_CITATIONS as citations, DECOMPRESSION_SICKNESS_CRITICAL_ACTIONS as critical } from '../src/data/trees/decompression-sickness.ts';
import { TOOLBAR_CONFIGS } from '../docs/data/toolbar-configs.js';
import { TRANSVERSE_MYELITIS_NODES as cord } from '../src/data/trees/transverse-myelitis.ts';
import { loadCorpus } from './search-corpus.ts';
const byId = new Map(nodes.map(n => [n.id,n]));
test('every pathway and toolbar action resolves; all cards reach disposition', () => {
 assert.equal(byId.size, nodes.length);
 const targets=(n:typeof nodes[number]) => [...(n.next ? [n.next] : []), ...(n.options ?? []).map(o=>o.next)];
 for(const n of nodes){
  for(const id of targets(n)) assert.ok(byId.has(id), `${n.id} -> ${id}`);
  for(const c of n.citation ?? []) assert.ok(citations.some(x=>x.num===c));
  const visited=new Set<string>(); const queue=[n.id]; let terminal=false;
  while(queue.length){const id=queue.pop()!;if(visited.has(id))continue;visited.add(id);const node=byId.get(id)!;if(node.type==='result')terminal=true;queue.push(...targets(node));}
  assert.ok(terminal, `${n.id} cannot reach a result`);
 }
 for(const a of critical)assert.ok(byId.has(a.nodeId));
 for(const tool of TOOLBAR_CONFIGS['decompression-sickness'])assert.ok(byId.has(tool.target!));
});
test('spinal DCI avoids the MRI-first trap and keeps emergency oxygen/recompression visible',()=>{
 for(const id of ['dcs-start','dcs-spinal','dcs-recompression']){
  const body=byId.get(id)!.body;assert.match(body,/recompression/i);assert.match(body,/MRI|imaging/i);
 }
 for(const id of ['tm-start','tm-presentation','tm-mri-gate']){
  const body=cord.find(n=>n.id===id)!.body;assert.match(body,/decompression-sickness/);assert.match(body,/Do not delay indicated recompression/);
 }
 assert.match(byId.get('dcs-pneumothorax')!.body,/drainage/i);
});
const {index}=await loadCorpus();
for(const q of ['decompression sickness definitive treatment','scuba diving bends','rapid ascent spinal decompression sickness','weakness urinary retention after scuba rapid ascent','arterial gas embolism diving']){
 test(`dive search first result: ${q}`,()=>{
  const result=index.search(q,3).results[0];
  assert.ok(JSON.stringify(result?.doc).includes('decompression-sickness'),JSON.stringify(result?.doc));
 });
}
