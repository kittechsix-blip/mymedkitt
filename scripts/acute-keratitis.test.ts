import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { ACUTE_KERATITIS_NODES as nodes, ACUTE_KERATITIS_CITATIONS as citations, ACUTE_KERATITIS_CRITICAL_ACTIONS as critical } from '../src/data/trees/acute-keratitis.ts';
import { INFO_PAGES } from '../docs/data/info-pages.js';
import { TOOLBAR_CONFIGS } from '../docs/data/toolbar-configs.js';
import { ALL_DRUGS as DRUG_STORE } from '../docs/data/drug-store.js';
import { loadCorpus } from './search-corpus.ts';
const byId = new Map(nodes.map(n => [n.id,n]));
test('keratitis pathways resolve and reach disposition', () => {
 assert.equal(byId.size,nodes.length);
 const next=(n:typeof nodes[number])=>[...(n.next?[n.next]:[]),...(n.options??[]).map(o=>o.next)];
 for(const n of nodes){
  for(const id of next(n))assert.ok(byId.has(id),`${n.id} -> ${id}`);
  assert.ok(n.citation?.length,`${n.id} has no sources`);
  for(const c of n.citation??[])assert.ok(citations.some(s=>s.num===c));
  for(const im of n.images??[])assert.ok(existsSync(new URL('../docs/'+im.src,import.meta.url)));
  const visited=new Set<string>(),queue=[n.id];let terminal=false;
  while(queue.length){const id=queue.pop()!;if(visited.has(id))continue;visited.add(id);const a=byId.get(id)!;if(a.type==='result')terminal=true;queue.push(...next(a));}
  assert.ok(terminal,`${n.id} has no endpoint`);
 }
 for(const a of critical)assert.ok(byId.has(a.nodeId));
});
test('all five toolbar destinations are real reference pages',()=>{
 const tools=TOOLBAR_CONFIGS['acute-keratitis'];assert.equal(tools.length,5);
 for(const t of tools)assert.ok(INFO_PAGES[t.target!],t.target);
});
test('auto-added Stop button has a page and every panel drug link resolves',()=>{
 assert.ok(INFO_PAGES['acute-keratitis-stop'],'acute-keratitis-stop missing');
 const ids=new Set(DRUG_STORE.map((d:{id:string})=>d.id));
 for(const page of Object.values(INFO_PAGES).filter((p:any)=>/keratitis/.test(p.id))as any[]){
  for(const m of JSON.stringify(page).matchAll(/#\/drug\/([a-z0-9-]+)/g))assert.ok(ids.has(m[1]),`${page.id} -> ${m[1]}`);
 }
});
const {index}=await loadCorpus();
for(const q of ['acute keratitis','corneal ulcer','HSV keratitis','UV photokeratitis','Acanthamoeba keratitis','fluorescein uptake patterns']){
 test(`keratitis search finds appropriate content: ${q}`,()=>{
  const found=index.search(q,3).results.some(r=>/keratitis/.test(JSON.stringify(r.doc)));
  assert.ok(found,q);
 });
}
