#!/usr/bin/env node
// =====================================================================
// MedKitt — Medical Source Fetcher
// Logs into EBMedicine and UpToDate, extracts full article content.
// Credentials stored in .env (gitignored). Uses Playwright for auth.
//
// Usage:
//   node scripts/fetch-medical-source.mjs <url>
//   node scripts/fetch-medical-source.mjs "https://www.ebmedicine.net/topics/endocrine/diabetes"
//   node scripts/fetch-medical-source.mjs "https://www.uptodate.com/contents/diabetic-ketoacidosis-in-adults-treatment"
//   node scripts/fetch-medical-source.mjs --list-sources "DKA"
//
// Requires: npm install playwright (one-time: npx playwright install chromium)
// Credentials in .env:
//   EBMEDICINE_EMAIL=...
//   EBMEDICINE_PASSWORD=...
//   UPTODATE_USERNAME=...
//   UPTODATE_PASSWORD=...
// =====================================================================

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const envPath = resolve(projectRoot, '.env');
const PROFILE_DIR = resolve(projectRoot, '.browser-profile');

// ---------------------------------------------------------------------------
// Load credentials from .env
// ---------------------------------------------------------------------------
function loadEnv() {
  if (!existsSync(envPath)) {
    console.error('No .env file found. Create one with credentials.');
    process.exit(1);
  }
  const env = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.+)$/);
    if (match) env[match[1]] = match[2].trim();
  }
  return env;
}

// ---------------------------------------------------------------------------
// Detect source from URL
// ---------------------------------------------------------------------------
function detectSource(url) {
  if (url.includes('ebmedicine.net')) return 'ebmedicine';
  if (url.includes('uptodate.com')) return 'uptodate';
  if (url.includes('emcrit.org')) return 'emcrit';
  if (url.includes('openevidence.com')) return 'openevidence';
  return 'unknown';
}

// ---------------------------------------------------------------------------
// EBMedicine: Login + Extract
// ---------------------------------------------------------------------------
async function dismissCookieBanner(page) {
  try {
    const acceptBtn = await page.$('.t-acceptAllButton');
    if (acceptBtn) {
      await acceptBtn.click();
      console.error('  Dismissed cookie banner.');
      await page.waitForTimeout(1000);
    }
  } catch { /* no banner, fine */ }
}

async function fetchEBMedicine(page, url, env) {
  const email = env.EBMEDICINE_EMAIL;
  const password = env.EBMEDICINE_PASSWORD;

  if (!email || !password) {
    console.error('Missing EBMEDICINE_EMAIL or EBMEDICINE_PASSWORD in .env');
    process.exit(1);
  }

  // Step 1: Always login first (EBMedicine is always paywalled)
  // Check if already logged in via persistent profile
  await page.goto('https://www.ebmedicine.net/login', { waitUntil: 'networkidle', timeout: 30000 });
  await dismissCookieBanner(page);

  // Check if the login page has a login form (means not logged in)
  const hasLoginForm = await page.$('#username');

  if (hasLoginForm) {
    console.error('  Logging into EBMedicine...');
    await page.fill('#username', email);
    await page.fill('#password', password);
    await page.check('#rememberMe').catch(() => {});
    await page.click('#login');

    // Wait for redirect after login
    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    console.error('  Logged in. Current URL:', page.url());
  } else {
    console.error('  Already logged in (persistent session).');
  }

  // Step 2: Navigate to the target article
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await dismissCookieBanner(page);

  // Verify we have full access (not just free preview)
  const stillPaywalled = await page.evaluate(() => {
    return document.body.innerText.includes('Below is a free preview');
  });
  if (stillPaywalled) {
    console.error('  WARNING: Still seeing paywall after login. Check credentials.');
  }

  // Extract content
  console.error('  Extracting EBMedicine content...');
  const content = await page.evaluate(() => {
    // Try the main content container
    const container = document.querySelector('#_ebm_showTopicContainer')
      || document.querySelector('.topic-content')
      || document.querySelector('article')
      || document.querySelector('.content-area');

    if (container) {
      // Get all text-bearing elements
      const els = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, pre');
      const parts = [];
      for (const el of els) {
        const tag = el.tagName.toLowerCase();
        const text = el.innerText.trim();
        if (!text) continue;
        if (tag.startsWith('h')) {
          const level = '#'.repeat(parseInt(tag[1]));
          parts.push(`\n${level} ${text}\n`);
        } else if (tag === 'li') {
          parts.push(`- ${text}`);
        } else if (tag === 'td' || tag === 'th') {
          parts.push(`| ${text} `);
        } else {
          parts.push(text);
        }
      }
      return parts.join('\n');
    }

    // Fallback: get all text
    return document.body.innerText;
  });

  return content;
}

// ---------------------------------------------------------------------------
// UpToDate: Login + Extract
// ---------------------------------------------------------------------------
async function fetchUpToDate(page, url, env) {
  const username = env.UPTODATE_USERNAME;
  const password = env.UPTODATE_PASSWORD;

  if (!username || !password) {
    console.error('Missing UPTODATE_USERNAME or UPTODATE_PASSWORD in .env');
    process.exit(1);
  }

  // Try the article directly first (persistent session may work)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  // Dismiss cookie banner (OneTrust)
  const cookieBtn = await page.$('#onetrust-accept-btn-handler');
  if (cookieBtn) {
    await cookieBtn.click();
    console.error('  Dismissed cookie banner.');
    await page.waitForTimeout(1000);
  }

  // Check if we landed on login page or got redirected away from content
  const currentUrl = page.url();
  const onLoginPage = currentUrl.includes('/login');
  const hasContent = await page.$('#topicContent') || await page.$('.topicContent') || await page.$('[data-topic-id]');

  if (onLoginPage || !hasContent) {
    console.error('  Need to login — navigating to login page...');
    if (!onLoginPage) {
      await page.goto('https://www.uptodate.com/login', { waitUntil: 'networkidle', timeout: 30000 });
    }

    // Wait for login form
    const userNameField = await page.$('#userName');
    if (!userNameField) {
      // Might already be logged in but on a different page
      console.error('  No login form found. Trying article directly...');
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    } else {
      console.error('  Logging into UpToDate (two-step flow)...');

      // Step 1: Enter username and click Continue
      await page.fill('#userName', username);
      await page.click('#btnContinueLogin');
      console.error('  Entered username, clicking Continue...');

      // Wait for password field to appear
      await page.waitForSelector('input[type="password"]', { timeout: 10000 });
      await page.waitForTimeout(500);

      // Step 2: Enter password and submit
      const passField = await page.$('input[type="password"]');
      if (!passField) {
        console.error('  ERROR: Password field did not appear after Continue.');
        process.exit(1);
      }
      await passField.fill(password);
      console.error('  Entered password, submitting...');

      // Click the login/submit button
      const submitBtn = await page.$('#btnLogin')
        || await page.$('.login-button')
        || await page.$('button[type="submit"]');
      if (submitBtn) {
        await submitBtn.click();
      } else {
        await passField.press('Enter');
      }

      // Wait for login to complete
      await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
      console.error('  Logged in. Current URL:', page.url());

      // Navigate to the target article
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    }
  } else {
    console.error('  Already logged in (persistent session).');
  }

  // Extract content
  console.error('  Extracting UpToDate content...');
  const content = await page.evaluate(() => {
    const container = document.querySelector('#topicContent')
      || document.querySelector('.topicContent')
      || document.querySelector('[data-topic-id]')
      || document.querySelector('article')
      || document.querySelector('#topic-content')
      || document.querySelector('.mainContent');

    if (container) {
      const els = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote');
      const parts = [];
      for (const el of els) {
        const tag = el.tagName.toLowerCase();
        const text = el.innerText.trim();
        if (!text) continue;
        if (tag.startsWith('h')) {
          const level = '#'.repeat(parseInt(tag[1]));
          parts.push(`\n${level} ${text}\n`);
        } else if (tag === 'li') {
          parts.push(`- ${text}`);
        } else if (tag === 'td' || tag === 'th') {
          parts.push(`| ${text} `);
        } else {
          parts.push(text);
        }
      }
      return parts.join('\n');
    }

    return document.body.innerText;
  });

  return content;
}

// ---------------------------------------------------------------------------
// EMCrit/IBCC: No login needed
// ---------------------------------------------------------------------------
async function fetchEMCrit(page, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  console.error('  Extracting EMCrit content...');
  const content = await page.evaluate(() => {
    const container = document.querySelector('.entry-content')
      || document.querySelector('article')
      || document.querySelector('.post-content');

    if (container) {
      const els = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote');
      const parts = [];
      for (const el of els) {
        const tag = el.tagName.toLowerCase();
        const text = el.innerText.trim();
        if (!text) continue;
        if (tag.startsWith('h')) {
          const level = '#'.repeat(parseInt(tag[1]));
          parts.push(`\n${level} ${text}\n`);
        } else if (tag === 'li') {
          parts.push(`- ${text}`);
        } else {
          parts.push(text);
        }
      }
      return parts.join('\n');
    }

    return document.body.innerText;
  });

  return content;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node scripts/fetch-medical-source.mjs <url>');
    console.error('       node scripts/fetch-medical-source.mjs --search ebmedicine "DKA"');
    console.error('       node scripts/fetch-medical-source.mjs --search uptodate "diabetic ketoacidosis"');
    process.exit(1);
  }

  const env = loadEnv();
  const url = args[args.length - 1];
  const source = args[0] === '--search' ? args[1] : detectSource(url);

  // Launch browser with persistent profile (keeps login sessions)
  const browser = await chromium.launchPersistentContext(PROFILE_DIR, {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    let content;

    if (args[0] === '--search') {
      // Search mode: find article URL first
      const query = args[2];
      if (source === 'ebmedicine') {
        // Login to EBMedicine first, then use their internal search form via JS
        await page.goto('https://www.ebmedicine.net/login', { waitUntil: 'networkidle', timeout: 30000 });
        await dismissCookieBanner(page);
        const hasLoginForm = await page.$('#username');
        if (hasLoginForm) {
          console.error('  Logging into EBMedicine for search...');
          await page.fill('#username', env.EBMEDICINE_EMAIL);
          await page.fill('#password', env.EBMEDICINE_PASSWORD);
          await page.check('#rememberMe').catch(() => {});
          await page.click('#login');
          await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
        }

        // Navigate to homepage and submit search via JavaScript (form is hidden in CSS)
        await page.goto('https://www.ebmedicine.net', { waitUntil: 'networkidle', timeout: 30000 });
        await dismissCookieBanner(page);
        console.error('  Submitting search for: ' + query);
        await page.evaluate((q) => {
          // Find the search form and submit it directly
          const forms = document.querySelectorAll('form');
          for (const form of forms) {
            const input = form.querySelector('input[name="search_string"]');
            if (input) {
              input.value = q;
              form.submit();
              return;
            }
          }
        }, query);
        await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
        console.error('  Search results URL:', page.url());

        // Find first topic link in results
        const firstResult = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll('a'));
          for (const link of links) {
            const href = link.href;
            if (href && href.includes('/topics/') && !href.includes('login')) {
              return href;
            }
          }
          return null;
        });
        if (!firstResult) {
          const pageText = await page.evaluate(() => document.body.innerText.slice(0, 500));
          console.error('  Page content preview:', pageText);
          console.error('No EBMedicine results found for: ' + query);
          process.exit(1);
        }
        console.error(`  Found: ${firstResult}`);
        content = await fetchEBMedicine(page, firstResult, env);
      } else if (source === 'uptodate') {
        // Login first via fetchUpToDate, passing the search URL
        // fetchUpToDate handles login then navigates to the URL
        const searchUrl = `https://www.uptodate.com/contents/search?search=${encodeURIComponent(query)}`;
        content = await fetchUpToDate(page, searchUrl, env);
        // If we got search results page, find the first article link and fetch that instead
        const hasSearchResults = content.includes('Search UpToDate') || content.length < 200;
        if (hasSearchResults) {
          // We're on search results — extract first article link
          const firstResult = await page.evaluate(() => {
            const link = document.querySelector('a[href*="/contents/"]');
            if (!link) return null;
            const href = link.getAttribute('href');
            return href.startsWith('http') ? href : 'https://www.uptodate.com' + href;
          });
          if (!firstResult) {
            console.error('No UpToDate results found for: ' + query);
            // Return the search results content anyway
          } else {
            console.error(`  Found: ${firstResult}`);
            await page.goto(firstResult, { waitUntil: 'networkidle', timeout: 30000 });
            content = await page.evaluate(() => {
              const container = document.querySelector('#topicContent')
                || document.querySelector('.topicContent')
                || document.querySelector('[data-topic-id]')
                || document.querySelector('article')
                || document.querySelector('.mainContent');
              if (container) {
                const els = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote');
                const parts = [];
                for (const el of els) {
                  const tag = el.tagName.toLowerCase();
                  const text = el.innerText.trim();
                  if (!text) continue;
                  if (tag.startsWith('h')) parts.push(`\n${'#'.repeat(parseInt(tag[1]))} ${text}\n`);
                  else if (tag === 'li') parts.push(`- ${text}`);
                  else if (tag === 'td' || tag === 'th') parts.push(`| ${text} `);
                  else parts.push(text);
                }
                return parts.join('\n');
              }
              return document.body.innerText;
            });
          }
        }
      } else if (source === 'emcrit') {
        await page.goto(`https://emcrit.org/?s=${encodeURIComponent(query)}`, { waitUntil: 'networkidle', timeout: 30000 });
        const firstResult = await page.evaluate(() => {
          const link = document.querySelector('.entry-title a, article a, .post-title a');
          return link ? link.href : null;
        });
        if (!firstResult) {
          console.error('No EMCrit results found for: ' + query);
          process.exit(1);
        }
        console.error(`  Found: ${firstResult}`);
        content = await fetchEMCrit(page, firstResult);
      } else {
        console.error(`Unknown source for search: ${source}. Use ebmedicine, uptodate, or emcrit.`);
        process.exit(1);
      }
    } else {
      // Direct URL mode
      switch (source) {
        case 'ebmedicine':
          content = await fetchEBMedicine(page, url, env);
          break;
        case 'uptodate':
          content = await fetchUpToDate(page, url, env);
          break;
        case 'emcrit':
          content = await fetchEMCrit(page, url);
          break;
        default:
          // Generic: just get page text
          await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
          content = await page.evaluate(() => document.body.innerText);
      }
    }

    // Output to stdout
    process.stdout.write(content);

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main();
