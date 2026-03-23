/**
 * UX Paradigm Experiments
 * Tests fundamentally different information architectures
 *
 * Unlike ux.ts (CSS tweaks), this tests FLOW and INTERACTION patterns:
 * - Time to answer (how fast can user get actionable info?)
 * - Tap count (how many interactions to reach goal?)
 * - Cognitive load (how much reading before action?)
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import type { ExperimentResult } from '../types';
import { log } from '../utils/logger';

interface UXParadigmConfig {
  scenarios: UXScenario[];
  baseUrl: string;
}

interface UXScenario {
  id: string;
  name: string;
  description: string;
  // The clinical question the user is trying to answer
  userGoal: string;
  // Steps to reach the answer in current paradigm
  currentFlow: FlowStep[];
  // Expected answer (to verify correctness)
  expectedAnswer: string;
}

interface FlowStep {
  action: 'navigate' | 'click' | 'type' | 'scroll' | 'wait';
  target?: string; // CSS selector or URL
  value?: string;  // For type actions
  description: string;
}

interface FlowMetrics {
  totalTime: number;      // ms from start to answer visible
  tapCount: number;       // number of click/tap actions
  scrollCount: number;    // number of scroll actions
  textLength: number;     // characters read before answer
  answerFound: boolean;   // did we reach the expected answer?
}

// Define clinical scenarios that represent real usage patterns
export const clinicalScenarios: UXScenario[] = [
  {
    id: 'afib-stable-dose',
    name: 'AFib Stable - Get Diltiazem Dose',
    description: 'Attending knows patient has stable AFib RVR, just needs the dose',
    userGoal: 'Find Diltiazem IV bolus dose for rate control',
    expectedAnswer: '0.25 mg/kg',
    currentFlow: [
      { action: 'navigate', target: '/', description: 'Open app' },
      { action: 'click', target: '[data-consult="afib-rvr"]', description: 'Click AFib RVR' },
      { action: 'click', target: '.continue-btn', description: 'Tap Continue on intro' },
      { action: 'click', target: '[data-option="stable"]', description: 'Select Stable' },
      { action: 'click', target: '[data-option="rate-control"]', description: 'Select Rate Control' },
      { action: 'click', target: '[data-option="no-contraindication"]', description: 'No CCB contraindication' },
      { action: 'scroll', target: '.treatment-section', description: 'Scroll to treatment' },
      { action: 'click', target: '.first-line-expand', description: 'Expand first-line' },
    ]
  },
  {
    id: 'sepsis-antibiotics',
    name: 'Sepsis - First Antibiotics',
    description: 'Resident needs to know what antibiotics to order for sepsis',
    userGoal: 'Find empiric antibiotic regimen for sepsis',
    expectedAnswer: 'Vancomycin + Piperacillin-tazobactam',
    currentFlow: [
      { action: 'navigate', target: '/', description: 'Open app' },
      { action: 'click', target: '[data-consult="sepsis"]', description: 'Click Sepsis' },
      { action: 'click', target: '.continue-btn', description: 'Tap Continue' },
      { action: 'click', target: '[data-option="no-source"]', description: 'Unknown source' },
      { action: 'scroll', target: '.treatment-section', description: 'Scroll to antibiotics' },
    ]
  },
  {
    id: 'pe-tpa-dose',
    name: 'PE - tPA Dose for Massive',
    description: 'Critical patient, need tPA dose NOW',
    userGoal: 'Find tPA dose for massive PE',
    expectedAnswer: '100 mg over 2 hours',
    currentFlow: [
      { action: 'navigate', target: '/', description: 'Open app' },
      { action: 'click', target: '[data-consult="pe-treatment"]', description: 'Click PE' },
      { action: 'click', target: '.continue-btn', description: 'Tap Continue' },
      { action: 'click', target: '[data-option="massive"]', description: 'Select Massive PE' },
      { action: 'click', target: '[data-option="thrombolysis"]', description: 'Select Thrombolysis' },
      { action: 'scroll', target: '.treatment-section', description: 'Scroll to dosing' },
    ]
  },
  {
    id: 'dka-insulin',
    name: 'DKA - Insulin Drip Rate',
    description: 'Need insulin drip starting dose',
    userGoal: 'Find insulin drip rate for DKA',
    expectedAnswer: '0.1 units/kg/hr',
    currentFlow: [
      { action: 'navigate', target: '/', description: 'Open app' },
      { action: 'click', target: '[data-consult="dka"]', description: 'Click DKA' },
      { action: 'click', target: '.continue-btn', description: 'Tap Continue' },
      { action: 'click', target: '[data-option="confirmed-dka"]', description: 'Confirmed DKA' },
      { action: 'scroll', target: '.insulin-section', description: 'Scroll to insulin' },
    ]
  },
  {
    id: 'rsi-drugs',
    name: 'RSI - Induction Agents',
    description: 'About to intubate, need drug doses',
    userGoal: 'Find ketamine + rocuronium doses',
    expectedAnswer: 'Ketamine 1-2 mg/kg, Rocuronium 1.2 mg/kg',
    currentFlow: [
      { action: 'navigate', target: '/', description: 'Open app' },
      { action: 'click', target: '[data-consult="airway-rsi"]', description: 'Click RSI' },
      { action: 'click', target: '.continue-btn', description: 'Tap Continue' },
      { action: 'scroll', target: '.drug-dosing', description: 'Scroll to drugs' },
    ]
  }
];

export async function runUXParadigmExperiment(
  config: UXParadigmConfig,
  dryRun = false
): Promise<ExperimentResult[]> {
  const results: ExperimentResult[] = [];

  log('info', `Testing ${config.scenarios.length} clinical scenarios`);

  const browser = await puppeteer.launch({ headless: true });

  try {
    for (const scenario of config.scenarios) {
      log('info', `Scenario: ${scenario.name}`);

      if (dryRun) {
        log('info', `[DRY RUN] Would test: ${scenario.description}`);
        continue;
      }

      const metrics = await measureFlow(browser, config.baseUrl, scenario);

      const result: ExperimentResult = {
        experimentId: `ux-paradigm-${scenario.id}`,
        type: 'ux',
        variant: {
          scenario: scenario.id,
          paradigm: 'current-decision-tree'
        },
        baselineScore: 0, // No baseline for paradigm tests
        variantScore: calculateUXScore(metrics),
        improvement: 0,
        winner: false, // Paradigm tests don't have "winners" - they're benchmarks
        timestamp: new Date().toISOString(),
        details: {
          scenario: scenario.name,
          userGoal: scenario.userGoal,
          metrics,
          expectedAnswer: scenario.expectedAnswer
        }
      };

      results.push(result);

      log('info', `  Time: ${metrics.totalTime}ms, Taps: ${metrics.tapCount}, Found: ${metrics.answerFound}`);
    }
  } finally {
    await browser.close();
  }

  return results;
}

async function measureFlow(
  browser: Browser,
  baseUrl: string,
  scenario: UXScenario
): Promise<FlowMetrics> {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 }); // iPhone 14 Pro

  const startTime = Date.now();
  let tapCount = 0;
  let scrollCount = 0;
  let textLength = 0;

  try {
    for (const step of scenario.currentFlow) {
      switch (step.action) {
        case 'navigate':
          await page.goto(`${baseUrl}${step.target}`, { waitUntil: 'networkidle0' });
          break;

        case 'click':
          await page.waitForSelector(step.target!, { timeout: 5000 });
          await page.click(step.target!);
          tapCount++;
          await page.waitForTimeout(300); // Animation settle
          break;

        case 'type':
          await page.type(step.target!, step.value!);
          break;

        case 'scroll':
          await page.evaluate((selector) => {
            const el = document.querySelector(selector);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, step.target);
          scrollCount++;
          await page.waitForTimeout(500);
          break;

        case 'wait':
          await page.waitForTimeout(parseInt(step.value || '1000'));
          break;
      }

      // Measure text on screen after each step
      const visibleText = await page.evaluate(() => {
        return document.body.innerText.length;
      });
      textLength = Math.max(textLength, visibleText);
    }

    // Check if expected answer is visible
    const pageContent = await page.content();
    const answerFound = pageContent.includes(scenario.expectedAnswer);

    const totalTime = Date.now() - startTime;

    return {
      totalTime,
      tapCount,
      scrollCount,
      textLength,
      answerFound
    };
  } catch (error) {
    log('error', `Flow failed: ${error}`);
    return {
      totalTime: Date.now() - startTime,
      tapCount,
      scrollCount,
      textLength,
      answerFound: false
    };
  } finally {
    await page.close();
  }
}

function calculateUXScore(metrics: FlowMetrics): number {
  // Lower is better for all metrics
  // Score = 100 - penalties

  let score = 100;

  // Time penalty: -1 point per 500ms over 2 seconds
  if (metrics.totalTime > 2000) {
    score -= Math.floor((metrics.totalTime - 2000) / 500);
  }

  // Tap penalty: -5 points per tap over 3
  if (metrics.tapCount > 3) {
    score -= (metrics.tapCount - 3) * 5;
  }

  // Scroll penalty: -3 points per scroll
  score -= metrics.scrollCount * 3;

  // Answer not found: -50 points
  if (!metrics.answerFound) {
    score -= 50;
  }

  return Math.max(0, score);
}

export function generateParadigmReport(results: ExperimentResult[]): string {
  let report = '# UX Paradigm Benchmark Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  report += '## Current Decision Tree Performance\n\n';
  report += '| Scenario | Time (ms) | Taps | Scrolls | Score | Found Answer? |\n';
  report += '|----------|-----------|------|---------|-------|---------------|\n';

  for (const result of results) {
    const m = result.details?.metrics as FlowMetrics;
    report += `| ${result.details?.scenario} | ${m.totalTime} | ${m.tapCount} | ${m.scrollCount} | ${result.variantScore} | ${m.answerFound ? 'Yes' : 'NO'} |\n`;
  }

  report += '\n## Analysis\n\n';

  const avgTime = results.reduce((sum, r) => sum + (r.details?.metrics as FlowMetrics).totalTime, 0) / results.length;
  const avgTaps = results.reduce((sum, r) => sum + (r.details?.metrics as FlowMetrics).tapCount, 0) / results.length;
  const avgScore = results.reduce((sum, r) => sum + r.variantScore, 0) / results.length;

  report += `- **Average time to answer:** ${avgTime.toFixed(0)}ms\n`;
  report += `- **Average taps:** ${avgTaps.toFixed(1)}\n`;
  report += `- **Average UX score:** ${avgScore.toFixed(1)}/100\n\n`;

  report += '## Improvement Targets\n\n';
  report += '| Paradigm | Target Time | Target Taps | Expected Score |\n';
  report += '|----------|-------------|-------------|----------------|\n';
  report += '| Current (Decision Tree) | ~5000ms | ~6 | ~60 |\n';
  report += '| Smart Filter Dashboard | ~2000ms | ~3 | ~85 |\n';
  report += '| Search-First | ~1500ms | ~2 | ~92 |\n';
  report += '| Hybrid (Goal) | ~1000ms | ~2 | ~95 |\n';

  return report;
}
