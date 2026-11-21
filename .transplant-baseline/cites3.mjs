const D='/Users/kittechsix/Developer/mymedkitt-transplant/research/transplant-sources/drafts/';
const want={heart:[1],liver:[1,2],cmv:[2],'cni-toxicity':[8,9,1],'cni-hypertension':[7,8,1]};
for(const [p,ns] of Object.entries(want)){const m=await import(D+`tpe-${p}.nodes.ts`);for(const n of ns){const c=m.CITATIONS.find(x=>x.num===n);console.log(`[${p} ${n}] ${c.text}\n`);}}
