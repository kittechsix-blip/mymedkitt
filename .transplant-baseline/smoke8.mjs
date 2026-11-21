import { chromium } from 'playwright'; import fs from 'node:fs'; import path from 'node:path';
const base='http://127.0.0.1:8795/app.html';
const cacheDir=path.join(process.env.HOME,'Library/Caches/ms-playwright'); const cached=fs.readdirSync(cacheDir).filter(d=>d.startsWith('chromium_headless_shell-')).sort().reverse();
const exe=fs.existsSync(chromium.executablePath())?undefined:path.join(cacheDir,cached[0],'chrome-headless-shell-mac-arm64/chrome-headless-shell');
const b=await chromium.launch(exe?{executablePath:exe}:{});
const open=async(route,sel)=>{const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:390,height:844}});const p=await ctx.newPage();const errs=[];p.on('console',m=>{if(m.type()==='error'&&!/^Service worker/.test(m.text()))errs.push(m.text())});p.on('pageerror',e=>errs.push(e.message));await p.addInitScript(()=>{try{localStorage.clear()}catch{}});await p.goto(base+'#'+route);await p.waitForSelector(sel,{timeout:30000});await p.waitForTimeout(600);return {ctx,p,errs};};
const stopBtn=(p)=>p.evaluate(()=>{const b=[...document.querySelectorAll('button, a')].find(x=>/\u{1F6D1}|^\s*Stop\s*$/u.test(x.textContent||'')&&x.closest('[class*="toolbar"]')); return b?(b.textContent||'').trim():null;});
const clickStop=(p)=>p.evaluate(()=>{const b=[...document.querySelectorAll('button, a')].find(x=>/\u{1F6D1}|^\s*Stop\s*$/u.test(x.textContent||'')&&x.closest('[class*="toolbar"]')); if(!b) return false; b.click(); return true;});
// drug consult
{ const {ctx,p,errs}=await open('/tree/transplant-drug-side-effects','main .onc-body > .wizard-disclaimer'); console.log('drug consult toolbar stop button:',await stopBtn(p)); const ok=await clickStop(p); await p.waitForTimeout(700);
  const info=await p.evaluate(()=>{const o=document.querySelector('.info-modal-overlay'); return o?{title:o.querySelector('.modal-header')?.textContent?.trim().slice(0,70),sections:o.querySelectorAll('.info-page-section').length,x:/\u2715/.test(o.querySelector('.modal-header .btn-text')?.textContent||''),links:[...o.querySelectorAll('[data-link-type]')].length}:null;}); console.log('drug stop page',ok,JSON.stringify(info),errs.length?errs:'');
  for(let i=0;i<3;i++){ const c2=await open('/tree/transplant-drug-side-effects','main .onc-body > .wizard-disclaimer'); await clickStop(c2.p); await c2.p.waitForTimeout(600);
    const r=await c2.p.evaluate((k)=>{const o=document.querySelector('.info-modal-overlay'); const l=[...o.querySelectorAll('[data-link-type]')][k*3]; if(!l) return null; const id=l.getAttribute('data-link-id'); l.click(); return id;},i); await c2.p.waitForTimeout(1500);
    const res=await c2.p.evaluate(()=>({hash:location.hash,h1:document.querySelector('.onc-identity__name, .onc-identity__names')?.textContent?.trim().slice(0,40),overlay:!!document.querySelector('.info-modal-overlay')})); console.log('  card link',i,r,'->',JSON.stringify(res),c2.errs.length?c2.errs:''); await c2.ctx.close(); }
  await ctx.close(); }
// approach consult
{ const {ctx,p,errs}=await open('/tree/transplant-patient-ed','main .decision-card'); console.log('approach toolbar stop button:',await stopBtn(p)); const ok=await clickStop(p); await p.waitForTimeout(700);
  const info=await p.evaluate(()=>{const o=document.querySelector('.info-modal-overlay'); return o?{title:o.querySelector('.modal-header')?.textContent?.trim().slice(0,70),sections:o.querySelectorAll('.info-page-section').length,x:/\u2715/.test(o.querySelector('.modal-header .btn-text')?.textContent||''),links:[...o.querySelectorAll('[data-link-type]')].length}:null;}); console.log('approach stop page',ok,JSON.stringify(info),errs.length?errs:'');
  for(let i=0;i<3;i++){ const c2=await open('/tree/transplant-patient-ed','main .decision-card'); await clickStop(c2.p); await c2.p.waitForTimeout(600);
    const r=await c2.p.evaluate((k)=>{const o=document.querySelector('.info-modal-overlay'); const l=[...o.querySelectorAll('[data-link-type="node"]')][k*3]; if(!l) return null; const id=l.getAttribute('data-link-id'); l.click(); return id;},i); await c2.p.waitForTimeout(1500);
    const res=await c2.p.evaluate(()=>({hash:location.hash,title:document.querySelector('.decision-card--active .decision-card__title')?.textContent?.trim().slice(0,50),overlay:!!document.querySelector('.info-modal-overlay')})); console.log('  node link',i,r,'->',JSON.stringify(res),c2.errs.length?c2.errs:''); await c2.ctx.close(); }
  await ctx.close(); }
await b.close();
