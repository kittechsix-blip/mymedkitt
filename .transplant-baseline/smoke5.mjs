import { chromium } from 'playwright'; import fs from 'node:fs'; import path from 'node:path';
const base='http://127.0.0.1:8795/app.html';
const cacheDir=path.join(process.env.HOME,'Library/Caches/ms-playwright'); const cached=fs.readdirSync(cacheDir).filter(d=>d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe=fs.existsSync(chromium.executablePath())?undefined:path.join(cacheDir,cached[0],'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const b=await chromium.launch(exe?{executablePath:exe}:{});
const NOISE=/^Service worker registration failed/;
for(const [id,tree] of [['rituximab','transplant'],['immune-globulin-iv','transplant'],['tocilizumab','transplant'],['alemtuzumab','transplant'],['bortezomib','transplant'],['eculizumab','transplant'],['tacrolimus','transplant'],['prednisone','transplant'],['pembrolizumab','onc']]){
 const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}); const p=await ctx.newPage(); const errs=[]; p.on('console',m=>{if(m.type()==='error'&&!NOISE.test(m.text()))errs.push(m.text())}); p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{try{localStorage.clear()}catch{}});
 const route=tree==='transplant'?`/tree/transplant-drug-side-effects/node/tdse-drug-${id}`:`/tree/onc-drug-side-effects/node/odse-drug-${id}`;
 await p.goto(`${base}#${route}`); await p.waitForSelector('main .onc-body > .wizard-disclaimer',{timeout:30000}); await p.waitForTimeout(500);
 const r=await p.evaluate(()=>({notes:[...document.querySelectorAll('.onc-card-note')].map(n=>n.textContent.slice(0,70)),badges:[...document.querySelectorAll('.onc-effect__timing,.onc-effect__badge,[class*=timing]')].slice(0,3).map(e=>e.textContent.trim().slice(0,50)),inter:document.querySelector('.onc-interactions .onc-group-toggle__label')?.textContent,rows:document.querySelectorAll('.onc-effect').length}));
 console.log(id,JSON.stringify(r),errs.length?errs:''); await ctx.close();}
await b.close();
