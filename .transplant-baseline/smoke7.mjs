import { chromium } from 'playwright'; import fs from 'node:fs'; import path from 'node:path';
const base='http://127.0.0.1:8795/app.html';
const cacheDir=path.join(process.env.HOME,'Library/Caches/ms-playwright'); const cached=fs.readdirSync(cacheDir).filter(d=>d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe=fs.existsSync(chromium.executablePath())?undefined:path.join(cacheDir,cached[0],'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const b=await chromium.launch(exe?{executablePath:exe}:{});
for(const id of ['sirolimus','everolimus-zortress']){const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('console',m=>{if(m.type()==='error'&&!/^Service worker/.test(m.text()))errs.push(m.text())});
 await p.addInitScript(()=>{try{localStorage.clear()}catch{}});await p.goto(`${base}#/tree/transplant-drug-side-effects/node/tdse-drug-${id}`);await p.waitForSelector('main .onc-body > .wizard-disclaimer',{timeout:30000});await p.waitForTimeout(500);
 const hit=await p.evaluate(()=>{const row=[...document.querySelectorAll('.onc-effect')].find(x=>x.querySelector('.onc-effect__label')?.textContent==='Hepatic artery thrombosis'); if(!row) return null; const boxed=!!row.querySelector('.onc-boxed-mark'); row.querySelector('.onc-effect__toggle').click(); return {boxed};});
 await p.waitForTimeout(1200);
 const line=await p.evaluate(()=>{const row=[...document.querySelectorAll('.onc-effect')].find(x=>x.querySelector('.onc-effect__label')?.textContent==='Hepatic artery thrombosis');return row?.querySelector('.onc-effect__line')?.textContent?.slice(0,110)||null;});
 console.log(id,JSON.stringify(hit),'summary:',line,errs.length?errs:''); await ctx.close();}
await b.close();
