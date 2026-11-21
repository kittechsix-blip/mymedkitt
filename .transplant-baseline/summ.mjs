import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const ROOT='/Users/kittechsix/Developer/mymedkitt-transplant'; const port=8793;
const t=await import(ROOT+'/src/data/trees/transplant-patient-ed.ts'); const sm=Object.fromEntries(t.TRANSPLANT_PATIENT_ED_NODES.map(n=>[n.id,n.summary]));
const server=spawn(process.execPath,[path.join(ROOT,'scripts/rapid-serve.ts')],{env:{...process.env,RAPID_PORT:String(port)},stdio:'ignore'});
const base=`http://127.0.0.1:${port}/app.html`; for(let i=0;i<50;i++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,100));}
const cacheDir=path.join(process.env.HOME,'Library/Caches/ms-playwright'); const cached=fs.readdirSync(cacheDir).filter(d=>d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe=fs.existsSync(chromium.executablePath())?undefined:path.join(cacheDir,cached[0],'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const b=await chromium.launch(exe?{executablePath:exe}:{});
for(const card of ['tacrolimus','tacrolimus-xr-astagraf','tacrolimus-xr-envarsus','cyclosporine-modified','cyclosporine-non-modified']) for(const [lab,node] of [['Kidney injury from the drug','tpe-cni-toxicity'],['Hypertension','tpe-cni-hypertension']]){
 const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}); const p=await ctx.newPage(); await p.addInitScript(()=>{try{localStorage.clear()}catch{}});
 await p.goto(`${base}#/tree/transplant-drug-side-effects/node/tdse-drug-${card}`); await p.waitForSelector('main .onc-body > .wizard-disclaimer',{timeout:30000}); await p.waitForTimeout(300);
 const r=await p.evaluate((l)=>{const row=[...document.querySelectorAll('.onc-effect')].find(x=>x.querySelector('.onc-effect__label')?.textContent===l); if(!row) return null; row.querySelector('.onc-effect__toggle').click(); return true;},lab);
 await p.waitForTimeout(1200);
 const line=await p.evaluate((l)=>{const row=[...document.querySelectorAll('.onc-effect')].find(x=>x.querySelector('.onc-effect__label')?.textContent===l); return row?.querySelector('.onc-effect__line')?.textContent||null;},lab);
 const want=(sm[node]||'').replace(/\[\d+\]/g,'').replace(/\*\*/g,'');
 console.log(card,lab,'row',r,'summaryShown',!!line&&line.replace(/\s+/g,' ').includes(want.slice(0,60).replace(/\s+/g,' ')),'|',(line||'').slice(0,80));
 await ctx.close();}
await b.close(); server.kill();
