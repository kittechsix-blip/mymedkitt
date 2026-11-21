const D='/Users/kittechsix/Developer/mymedkitt-transplant/research/transplant-sources/drafts/';
for (const p of ['heart','liver','lung','cmv','bk']) { const m = await import(D+`tpe-${p}.nodes.ts`); for(const c of m.CITATIONS) console.log(p,c.num,c.text.slice(0,170)+' ... '+c.text.slice(-60)); }
