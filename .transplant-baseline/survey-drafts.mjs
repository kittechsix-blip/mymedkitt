const D='/Users/kittechsix/Developer/mymedkitt-transplant/research/transplant-sources/drafts/';
for (const p of ['heart','liver','lung','cmv','bk']) {
  const m = await import(D+`tpe-${p}.nodes.ts`);
  const keys = new Set(); const markers = new Set(); const cites = new Set();
  const walk=(v,path)=>{ if(typeof v==='string'){ for(const x of v.matchAll(/\[(\d+)\]/g)) markers.add(+x[1]); } else if(Array.isArray(v)) v.forEach(x=>walk(x,path)); else if(v&&typeof v==='object') for(const [k,x] of Object.entries(v)){ keys.add(k); if(k==='citation') x.forEach(c=>cites.add(c)); walk(x,path+'.'+k);} };
  walk(m.NODES,'n'); walk(m.CRITICAL_ACTIONS,'ca');
  console.log(p, 'nodes',m.NODES.length,'cites',[...cites].sort((a,b)=>a-b).join(','),'markers',[...markers].sort((a,b)=>a-b).join(','),'CITATIONS',m.CITATIONS.map(c=>c.num).join(','));
  console.log('  keys',[...keys].join(' '));
  console.log('  ids',m.NODES.map(n=>n.id+':'+n.type).join(' '));
  console.log('  mods',[...new Set(m.NODES.map(n=>n.module))].join(','));
}
