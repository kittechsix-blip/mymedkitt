// Browser walk: types real questions into Home search, taps the top result, checks it lands on (and flashes) the answer.
// usage: node scripts/verify/search-walk.mjs [--base http://localhost:8731] [--shots /tmp/dir]
import { chromium } from 'playwright';
import fs from 'fs';
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('--base', 'http://localhost:8731');
const shots = arg('--shots', '/tmp/mymedkitt-search-shots');
fs.mkdirSync(shots, { recursive: true });
const QUESTIONS = [
  ['what are risks for ectopic pregnancy', 'info'],
  ['ottawa sah rule', 'node'],
  ['croup dexamethasone dose', 'drug'],
  ['heart score', 'calc'],
  ['pph uterotonic ladder', 'info'],
  ['myasthenic crisis versus cholinergic crisis', 'node'],
  ['sbp goal in sah', 'any'],
  ['how do I treat wide complex tachycardia', 'any'],
  ['naloxone dose', 'drug'],
  ['dka fluids', 'any'],
  ['antibiotics for community acquired pneumonia', 'any'],
  ['magnesium dose for eclampsia', 'any'],
];
const browser = await chromium.launch();
let failures = 0;
for (const vp of [{ name: 'mobile', width: 390, height: 844 }, { name: 'desktop', width: 1280, height: 800 }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, serviceWorkers: 'block' });
  const errors = [];
  for (const [qi, [q, expectKind]] of QUESTIONS.entries()) {
    if (vp.name === 'desktop' && qi > 5) break;
    const page = await ctx.newPage();
    // service workers are blocked in this walk (offline is proven in search-offline.mjs), so that one registration error is expected
    page.on('console', (m) => { if (m.type() === 'error' && !/Service worker registration failed/.test(m.text())) errors.push(`${q}: ${m.text()}`); });
    page.on('pageerror', (e) => errors.push(`${q}: PAGEERROR ${e.message}`));
    await page.goto(base + '/app.html');
    // the app's own legal acknowledgement gate (a fresh browser context has not accepted it)
    const checkAll = page.locator('.legal-splash-btn-check-all');
    if (await checkAll.isVisible({ timeout: 8000 }).catch(() => false)) {
      await checkAll.click();
      await page.locator('.legal-splash-btn-primary').click();
    }
    const understand = page.locator('.legal-modal-btn');
    if (await understand.isVisible({ timeout: 3000 }).catch(() => false)) await understand.click();
    const input = page.locator('.dashboard-hero-search__input');
    await input.waitFor({ timeout: 30000 });
    await page.waitForTimeout(2500); // lazy indexes
    await input.fill(q);
    await page.waitForSelector('.dashboard-hero-search__result', { timeout: 5000 });
    const rows = await page.$$eval('.dashboard-hero-search__result', (els) => els.slice(0, 3).map((e) => ({ badge: e.querySelector('.dashboard-hero-search__badge')?.textContent, label: e.querySelector('.dashboard-hero-search__label')?.textContent, sub: e.querySelector('.dashboard-hero-search__sublabel')?.textContent, preview: e.querySelector('.dashboard-hero-search__preview')?.textContent })));
    const overflowSearch = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const slug = q.replace(/[^a-z0-9]+/gi, '-').slice(0, 40);
    await page.screenshot({ path: `${shots}/${vp.name}-${slug}-1-results.png` });
    await page.locator('.dashboard-hero-search__result').first().click();
    await page.waitForTimeout(700);
    const hash = await page.evaluate(() => location.hash);
    // landing evidence
    const landing = await page.evaluate(() => {
      const flash = document.querySelector('.search-landing-flash');
      const hi = document.querySelector('.info-modal-overlay .cite-highlight');
      const overlay = document.querySelector('.info-modal-overlay, .modal-overlay.active');
      const card = document.querySelector('.decision-card--active');
      const rect = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), inView: r.top < window.innerHeight && r.bottom > 0 }; };
      return {
        flash: !!flash, flashTitle: flash?.textContent?.trim().slice(0, 60), flashRect: rect(flash),
        highlight: !!hi, highlightTitle: hi?.querySelector('h2')?.textContent?.trim(), highlightRect: rect(hi),
        overlay: !!overlay, overlayTitle: overlay?.querySelector('h1,h2,.info-modal-title')?.textContent?.trim().slice(0, 60),
        outline: [...document.querySelectorAll('.info-modal-overlay [data-indication]')].filter((e) => e.style.outline).map((e) => e.getAttribute('data-indication'))[0],
        card: card?.textContent?.trim().slice(0, 60),
      };
    });
    await page.waitForTimeout(500); // smooth scroll settles (highlight still on)
    await page.screenshot({ path: `${shots}/${vp.name}-${slug}-2-landed.png` });
    const overflowLanded = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const routed = /^#\/(calculator|tree)\//.test(hash);
    const ok = routed || landing.flash || landing.highlight || landing.overlay || landing.outline;
    if (!ok || overflowSearch || overflowLanded) failures++;
    console.log(`[${vp.name}] "${q}"\n   top3: ${rows.map((r) => `${r.badge}:${r.label}`).join(' | ')}\n   preview#1: ${rows[0]?.preview ?? '-'}\n   -> ${hash}  flash=${landing.flash}${landing.flashTitle ? `(${landing.flashTitle})` : ''} highlight=${landing.highlight}${landing.highlightTitle ? `(${landing.highlightTitle})` : ''} drugOutline=${landing.outline ?? '-'} overflow=${overflowSearch || overflowLanded}`);
    await page.close();
  }
  console.log(`[${vp.name}] console errors: ${errors.length}`); for (const e of errors.slice(0, 8)) console.log('   ' + e);
  if (errors.length) failures++;
  await ctx.close();
}
await browser.close();
console.log(failures ? `WALK FAILURES: ${failures}` : 'WALK OK');
