import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const ROOT='/Users/kittechsix/Developer/mymedkitt-transplant'; const port=8791;
const server=spawn(process.execPath,[path.join(ROOT,'scripts/rapid-serve.ts')],{env:{...process.env,RAPID_PORT:String(port)},stdio:'ignore'});
const base=`http://127.0.0.1:${port}/app.html`; for(let i=0;i<50;i++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,100));}
const cacheDir=path.join(process.env.HOME,'Library/Caches/ms-playwright'); const cached=fs.readdirSync(cacheDir).filter(d=>d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe=fs.existsSync(chromium.executablePath())?undefined:path.join(cacheDir,cached[0],'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const b=await chromium.launch(exe?{executablePath:exe}:{}); const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}); const p=await ctx.newPage();
await p.addInitScript(()=>{try{localStorage.clear()}catch{}});
for(const c of ['emergency-medicine','cardiology','nephro-rheum-endo']){ await p.goto(`${base}#/category/${c}`); await p.waitForTimeout(2500);
 console.log(c, await p.evaluate(()=>{const t=document.body.innerText;return {chest:(t.match(/Chest Pain Hub/g)||[]).length,tpe:(t.match(/Transplant Patient in the ED/g)||[]).length,tdse:(t.match(/Transplant Drugs Side-effects/g)||[]).length,len:t.length,hash:location.hash}})); }
await p.goto(`${base}#/`); await p.waitForTimeout(2500);
console.log('home', await p.evaluate(()=>{const t=document.body.innerText;return {tpe:(t.match(/Transplant Patient in the ED/g)||[]).length,hubsHeading:/Hubs/i.test(t)}}));
await b.close(); server.kill();
