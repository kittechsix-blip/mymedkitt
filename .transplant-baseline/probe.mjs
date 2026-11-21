import { chromium } from 'playwright'; import { spawn } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const ROOT='/Users/kittechsix/Developer/mymedkitt-transplant'; const port=8792;
const server=spawn(process.execPath,[path.join(ROOT,'scripts/rapid-serve.ts')],{env:{...process.env,RAPID_PORT:String(port)},stdio:'ignore'});
const base=`http://127.0.0.1:${port}/app.html`; for(let i=0;i<50;i++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,100));}
const cacheDir=path.join(process.env.HOME,'Library/Caches/ms-playwright'); const cached=fs.readdirSync(cacheDir).filter(d=>d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe=fs.existsSync(chromium.executablePath())?undefined:path.join(cacheDir,cached[0],'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const b=await chromium.launch(exe?{executablePath:exe}:{}); const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:844}}); const p=await ctx.newPage();
await p.addInitScript(()=>{try{localStorage.clear()}catch{}});
await p.goto(`${base}#/tree/transplant-patient-ed/node/tpe-heart`); await p.waitForFunction(()=>(document.querySelector('main')?.textContent||'').length>300,{timeout:30000}); await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const m=document.querySelector('main');const walk=(e,d)=>d>4?'':`${' '.repeat(d)}${e.tagName.toLowerCase()}.${(e.className||'').toString().slice(0,60)} ${e.children.length?'':(e.textContent||'').slice(0,40)}\n`+[...e.children].slice(0,6).map(c=>walk(c,d+1)).join('');return walk(m,0).slice(0,3500);}));
await b.close(); server.kill();
