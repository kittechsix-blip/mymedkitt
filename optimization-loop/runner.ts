#!/usr/bin/env bun
/**
 * myMedKitt Optimization Loop Runner
 *
 * Inspired by Karpathy's AutoResearch
 * Runs experiments overnight, keeps winners, logs everything
 *
 * Usage:
 *   bun run runner.ts --type ux        # Run UX experiments only
 *   bun run runner.ts --type content   # Run content experiments only
 *   bun run runner.ts --type search    # Run search experiments only
 *   bun run runner.ts --all            # Run all experiments
 *   bun run runner.ts --all --duration 8h  # Run for 8 hours
 *   bun run runner.ts --dry-run        # Preview without running
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { Config, ExperimentResult, RunOptions } from './types';
import { runUXExperiment, generateUXReport } from './experiments/ux';
import { runContentExperiment, generateContentReport } from './experiments/content';
import { runSearchExperiment, generateSearchReport } from './experiments/search';
import { log, logSection } from './utils/logger';

// Parse CLI arguments
function parseArgs(): RunOptions {
  const args = process.argv.slice(2);
  const options: RunOptions = {};

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--type':
        options.type = args[++i] as 'ux' | 'content' | 'search';
        break;
      case '--all':
        options.type = 'all';
        break;
      case '--duration':
        options.duration = args[++i];
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
    }
  }

  return options;
}

// Parse duration string to milliseconds
function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)(h|m|s)$/);
  if (!match) return 5 * 60 * 1000; // Default 5 minutes

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 'h': return value * 60 * 60 * 1000;
    case 'm': return value * 60 * 1000;
    case 's': return value * 1000;
    default: return 5 * 60 * 1000;
  }
}

// Save results to file
function saveResults(results: ExperimentResult[], config: Config): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${timestamp}.json`;
  const filepath = join(config.output.resultsDir, filename);

  if (!existsSync(config.output.resultsDir)) {
    mkdirSync(config.output.resultsDir, { recursive: true });
  }

  const output = {
    timestamp: new Date().toISOString(),
    totalExperiments: results.length,
    winners: results.filter(r => r.winner).length,
    results
  };

  writeFileSync(filepath, JSON.stringify(output, null, 2));
  return filepath;
}

// Save winners for later application
function saveWinners(results: ExperimentResult[], config: Config): void {
  const winners = results.filter(r => r.winner);
  if (winners.length === 0) return;

  if (!existsSync(config.output.winnersDir)) {
    mkdirSync(config.output.winnersDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().slice(0, 10);
  const filepath = join(config.output.winnersDir, `${timestamp}-winners.json`);

  // Append to existing or create new
  let existing: ExperimentResult[] = [];
  if (existsSync(filepath)) {
    existing = JSON.parse(readFileSync(filepath, 'utf-8'));
  }

  writeFileSync(filepath, JSON.stringify([...existing, ...winners], null, 2));
}

// Mock functions for content fetching (replace with real implementation)
async function getNodeContent(nodeId: string): Promise<string> {
  // TODO: Connect to actual myMedKitt data source (Supabase)
  // For now, return mock content
  const mockContent: Record<string, string> = {
    'afib-rvr': 'AFib with RVR requires rate control. Start metoprolol 5mg IV Q5min x3. Target HR <110. Consider diltiazem if beta-blocker contraindicated.',
    'sepsis': 'Sepsis bundle: Lactate within 1h. Blood cultures before abx. Broad spectrum abx within 1h. 30ml/kg crystalloid for hypotension or lactate >4.',
    'chest-pain': 'Chest pain workup: ECG within 10 min. Troponin at 0h and 3h. Aspirin 325mg if ACS suspected. Risk stratify with HEART score.',
    'syncope': 'Syncope evaluation: ECG mandatory. Orthostatics if no obvious cause. San Francisco Syncope Rule for disposition. Consider cardiac monitor if high risk.'
  };

  return mockContent[nodeId] || 'Sample medical content for testing.';
}

async function getSearchableContent(): Promise<Array<{ id: string; title: string; tags: string[]; body: string }>> {
  // TODO: Connect to actual myMedKitt data source
  return [
    { id: 'afib-rvr', title: 'AFib with RVR', tags: ['cardiac', 'arrhythmia', 'rate control'], body: 'Atrial fibrillation with rapid ventricular response management' },
    { id: 'chest-pain-acs', title: 'Chest Pain / ACS', tags: ['cardiac', 'chest pain', 'acs', 'mi'], body: 'Acute coronary syndrome workup and management' },
    { id: 'sepsis', title: 'Sepsis', tags: ['infection', 'sepsis', 'antibiotics'], body: 'Sepsis recognition and bundle compliance' },
    { id: 'fracture-management', title: 'Fracture Management', tags: ['ortho', 'fracture', 'splint'], body: 'Orthopedic fracture initial management' },
    { id: 'stroke-tpa', title: 'Stroke / tPA', tags: ['neuro', 'stroke', 'tpa', 'thrombolysis'], body: 'Acute ischemic stroke and tPA eligibility' },
    { id: 'dka', title: 'DKA', tags: ['endo', 'diabetes', 'dka', 'acidosis'], body: 'Diabetic ketoacidosis management' },
    { id: 'airway-rsi', title: 'RSI / Airway', tags: ['airway', 'intubation', 'rsi'], body: 'Rapid sequence intubation protocol' },
    { id: 'pe-treatment', title: 'PE Treatment', tags: ['pulmonary', 'pe', 'anticoagulation'], body: 'Pulmonary embolism treatment algorithm' },
    { id: 'htn-emergency', title: 'Hypertensive Emergency', tags: ['cardiac', 'hypertension', 'emergency'], body: 'Hypertensive emergency management' },
    { id: 'status-epilepticus', title: 'Status Epilepticus', tags: ['neuro', 'seizure', 'status'], body: 'Status epilepticus treatment protocol' }
  ];
}

async function main() {
  const startTime = Date.now();
  const options = parseArgs();

  logSection('myMedKitt Optimization Loop');
  log('info', `Mode: ${options.type || 'all'}`);
  log('info', `Dry run: ${options.dryRun ? 'yes' : 'no'}`);
  if (options.duration) {
    log('info', `Duration: ${options.duration}`);
  }

  // Load config
  const configPath = join(import.meta.dir, 'config.json');
  const config: Config = JSON.parse(readFileSync(configPath, 'utf-8'));

  const allResults: ExperimentResult[] = [];
  const endTime = options.duration ? startTime + parseDuration(options.duration) : startTime + 5 * 60 * 1000;

  // Main experiment loop
  let iteration = 0;
  while (Date.now() < endTime && allResults.length < config.maxExperimentsPerNight) {
    iteration++;
    log('info', `Iteration ${iteration}`);

    // UX Experiments
    if ((options.type === 'ux' || options.type === 'all') && config.ux.enabled) {
      logSection('UX Experiments');
      const uxResults = await runUXExperiment(
        config.ux,
        config.metricsEndpoint,
        options.dryRun
      );
      allResults.push(...uxResults);
    }

    // Content Experiments
    if ((options.type === 'content' || options.type === 'all') && config.content.enabled) {
      logSection('Content Experiments');
      const contentResults = await runContentExperiment(
        config.content,
        getNodeContent,
        options.dryRun
      );
      allResults.push(...contentResults);
    }

    // Search Experiments
    if ((options.type === 'search' || options.type === 'all') && config.search.enabled) {
      logSection('Search Experiments');
      const searchResults = await runSearchExperiment(
        config.search,
        getSearchableContent,
        options.dryRun
      );
      allResults.push(...searchResults);
    }

    // Break after single pass unless duration specified
    if (!options.duration) break;
  }

  // Generate reports
  logSection('Results Summary');

  const winners = allResults.filter(r => r.winner);
  log('info', `Total experiments: ${allResults.length}`);
  log('success', `Winners: ${winners.length}`);

  if (!options.dryRun && allResults.length > 0) {
    const resultsPath = saveResults(allResults, config);
    log('info', `Results saved: ${resultsPath}`);

    if (winners.length > 0) {
      saveWinners(allResults, config);
      log('success', `Winners staged for review in ${config.output.winnersDir}`);
    }

    // Generate markdown reports
    const uxResults = allResults.filter(r => r.type === 'ux');
    const contentResults = allResults.filter(r => r.type === 'content');
    const searchResults = allResults.filter(r => r.type === 'search');

    if (uxResults.length > 0) {
      const report = generateUXReport(uxResults);
      writeFileSync(join(config.output.resultsDir, 'ux-report.md'), report);
    }
    if (contentResults.length > 0) {
      const report = generateContentReport(contentResults);
      writeFileSync(join(config.output.resultsDir, 'content-report.md'), report);
    }
    if (searchResults.length > 0) {
      const report = generateSearchReport(searchResults);
      writeFileSync(join(config.output.resultsDir, 'search-report.md'), report);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
  log('info', `Completed in ${elapsed} minutes`);

  // Summary of top winners
  if (winners.length > 0) {
    logSection('Top Winners');
    const sorted = [...winners].sort((a, b) => b.improvement - a.improvement);
    for (const winner of sorted.slice(0, 5)) {
      log('success', `${winner.experimentId}: +${winner.improvement.toFixed(1)}%`);
    }

    console.log('\nRun `bun run winners:review` to review and apply changes.');
  }
}

main().catch(console.error);
