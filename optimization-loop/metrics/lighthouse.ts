/**
 * Lighthouse Performance Metrics
 * Runs Lighthouse audits with optional CSS overrides
 */

import puppeteer from 'puppeteer';
// @ts-ignore - lighthouse types
import lighthouse from 'lighthouse';
import type { UXVariant } from '../types';
import { log } from '../utils/logger';

interface LighthouseResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  cls: number;
  lcp: number;
  fcp: number;
}

export async function runLighthouse(
  url: string,
  variant?: UXVariant
): Promise<LighthouseResult> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // If variant provided, inject CSS override before navigation
    if (variant) {
      await page.evaluateOnNewDocument((cssVar, value) => {
        const style = document.createElement('style');
        style.textContent = `:root { ${cssVar}: ${value} !important; }`;
        document.head.appendChild(style);
      }, variant.property, variant.value);
    }

    await page.goto(url, { waitUntil: 'networkidle0' });

    // Get the port from the browser
    const port = new URL(browser.wsEndpoint()).port;

    const { lhr } = await lighthouse(url, {
      port: parseInt(port),
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
    });

    return {
      performance: Math.round((lhr.categories.performance?.score || 0) * 100),
      accessibility: Math.round((lhr.categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((lhr.categories['best-practices']?.score || 0) * 100),
      seo: Math.round((lhr.categories.seo?.score || 0) * 100),
      cls: lhr.audits['cumulative-layout-shift']?.numericValue || 0,
      lcp: lhr.audits['largest-contentful-paint']?.numericValue || 0,
      fcp: lhr.audits['first-contentful-paint']?.numericValue || 0
    };
  } catch (error) {
    log('error', `Lighthouse error: ${error}`);
    return {
      performance: 0,
      accessibility: 0,
      bestPractices: 0,
      seo: 0,
      cls: 0,
      lcp: 0,
      fcp: 0
    };
  } finally {
    await browser.close();
  }
}

/**
 * Quick performance check without full Lighthouse
 * Useful for rapid iteration
 */
export async function quickPerfCheck(url: string): Promise<{ loadTime: number; domNodes: number }> {
  const browser = await puppeteer.launch({ headless: true });

  try {
    const page = await browser.newPage();
    const start = Date.now();
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const loadTime = Date.now() - start;

    const domNodes = await page.evaluate(() => document.querySelectorAll('*').length);

    return { loadTime, domNodes };
  } finally {
    await browser.close();
  }
}
