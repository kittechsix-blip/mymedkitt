// Offline proof: with the service worker installed and the network cut, Home search still answers questions.
// usage: node scripts/verify/search-offline.mjs [--base http://localhost:8731]
import { chromium } from 'playwright';
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const base = arg('--base', 'http://localhost:8731');
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
// The app reloads itself once when a new service worker takes control, which would eat a half-finished gate click:
// accept the legal gate in a retry loop instead.
async function acceptGate() {
  for (let i = 0; i < 12; i++) {
    const primary = page.locator('.legal-splash-btn-primary');
    if (!(await primary.isVisible({ timeout: 1500 }).catch(() => false))) return;
    await page.locator('.legal-splash-btn-check-all').click({ timeout: 2000 }).catch(() => {});
    if (await primary.isEnabled().catch(() => false)) await primary.click({ timeout: 2000 }).catch(() => {});
    await page.waitForTimeout(700);
  }
}
await page.goto(base + '/app.html');
await page.evaluate(() => navigator.serviceWorker.ready);
await acceptGate();
// give install time to precache everything (the SW precache list is ~900 files)
for (let i = 0; i < 60; i++) {
  const cached = await page.evaluate(async () => { const names = await caches.keys(); let n = 0; for (const k of names) n += (await (await caches.open(k)).keys()).length; return n; });
  if (cached > 800) break;
  await page.waitForTimeout(1000);
}
const inCache = await page.evaluate(async () => { const r = await caches.match('data/search-answer-index.json'); return !!r; });
console.log('answer index in SW cache:', inCache);
await ctx.setOffline(true);
await page.reload();
await acceptGate();
const input = page.locator('.dashboard-hero-search__input');
await input.waitFor({ timeout: 20000 });
await page.waitForTimeout(3000);
let ok = true;
for (const [q, want] of [['what are risks for ectopic pregnancy', 'Major Risk Factors'], ['croup dexamethasone dose', 'Dexamethasone'], ['sbp goal in sah', 'Blood Pressure Management']]) {
  await input.fill(q);
  await page.waitForSelector('.dashboard-hero-search__result', { timeout: 5000 });
  const top = await page.$$eval('.dashboard-hero-search__result', (els) => els.slice(0, 3).map((e) => e.querySelector('.dashboard-hero-search__label')?.textContent));
  const hit = top.includes(want);
  ok = ok && hit;
  console.log(`offline "${q}" -> ${top.join(' | ')}  ${hit ? 'OK' : 'MISSING ' + want}`);
}
await page.locator('.dashboard-hero-search__result').first().click();
await page.waitForTimeout(1200);
console.log('offline tap landed on', await page.evaluate(() => location.hash || '(modal)'), '| highlight:', await page.evaluate(() => !!document.querySelector('.cite-highlight, .search-landing-flash')));
console.log('page errors:', errors.length, errors.slice(0, 3).join(' / '));
console.log(ok && errors.length === 0 ? 'OFFLINE OK' : 'OFFLINE FAILED');
await browser.close();
