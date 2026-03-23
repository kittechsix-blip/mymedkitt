#!/usr/bin/env bun
/**
 * Apply Winners Script
 * Applies winning configurations to the actual myMedKitt codebase
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { ExperimentResult } from '../types';

const winnersDir = join(import.meta.dir, '..', 'winners');
const srcDir = join(import.meta.dir, '..', '..', 'src');

function applyUXWinner(winner: ExperimentResult): boolean {
  // UX winners modify CSS variables in the main stylesheet
  const cssPath = join(srcDir, 'styles', 'variables.css');

  if (!existsSync(cssPath)) {
    console.log(`  CSS file not found: ${cssPath}`);
    console.log(`  Manual action: Add ${JSON.stringify(winner.variant)} to your CSS variables`);
    return false;
  }

  let css = readFileSync(cssPath, 'utf-8');

  for (const [property, value] of Object.entries(winner.variant)) {
    const regex = new RegExp(`(${property}:\\s*)([^;]+)(;)`, 'g');
    if (regex.test(css)) {
      css = css.replace(regex, `$1${value}$3`);
      console.log(`  Updated ${property}: ${value}`);
    } else {
      console.log(`  Property ${property} not found in CSS, skipping`);
    }
  }

  writeFileSync(cssPath, css);
  return true;
}

function applyContentWinner(winner: ExperimentResult): boolean {
  // Content winners require Supabase update
  console.log(`  Content update for node: ${winner.variant.nodeId}`);
  console.log(`  This requires a Supabase update.`);
  console.log('');
  console.log('  Original content:');
  console.log(`    ${winner.variant.original.slice(0, 100)}...`);
  console.log('');
  console.log('  Revised content:');
  console.log(`    ${winner.variant.revised.slice(0, 100)}...`);
  console.log('');
  console.log('  To apply, update the node content in Supabase Table Editor.');
  return false;
}

function applySearchWinner(winner: ExperimentResult): boolean {
  // Search winners modify the search configuration
  const searchConfigPath = join(srcDir, 'utils', 'search.ts');

  if (!existsSync(searchConfigPath)) {
    console.log(`  Search config not found: ${searchConfigPath}`);
    console.log(`  Manual action: Update search weights to ${JSON.stringify(winner.variant)}`);
    return false;
  }

  console.log(`  Search configuration update:`);
  console.log(`    ${JSON.stringify(winner.variant)}`);
  console.log('');
  console.log(`  Manual update required in: ${searchConfigPath}`);

  // Could auto-update if the search config has a predictable structure
  return false;
}

function main() {
  const args = process.argv.slice(2);
  const applyAll = args.includes('--all');
  const targetId = args.find(a => !a.startsWith('--'));

  if (!applyAll && !targetId) {
    console.log('Usage:');
    console.log('  bun run winners:apply <experiment-id>');
    console.log('  bun run winners:apply --all');
    return;
  }

  if (!existsSync(winnersDir)) {
    console.log('No winners directory found.');
    return;
  }

  // Load all winners
  const files = readdirSync(winnersDir).filter(f => f.endsWith('.json'));
  const allWinners: ExperimentResult[] = [];

  for (const file of files) {
    const winners = JSON.parse(readFileSync(join(winnersDir, file), 'utf-8'));
    allWinners.push(...winners);
  }

  // Filter to targets
  const targets = applyAll
    ? allWinners
    : allWinners.filter(w => w.experimentId === targetId);

  if (targets.length === 0) {
    console.log('No matching winners found.');
    return;
  }

  console.log(`\nApplying ${targets.length} winner(s)...\n`);

  let applied = 0;
  let skipped = 0;

  for (const winner of targets) {
    console.log(`[${winner.experimentId}] (+${winner.improvement.toFixed(1)}%)`);

    let success = false;
    switch (winner.type) {
      case 'ux':
        success = applyUXWinner(winner);
        break;
      case 'content':
        success = applyContentWinner(winner);
        break;
      case 'search':
        success = applySearchWinner(winner);
        break;
    }

    if (success) {
      applied++;
    } else {
      skipped++;
    }
    console.log('');
  }

  console.log('='.repeat(50));
  console.log(`Applied: ${applied}`);
  console.log(`Manual action required: ${skipped}`);

  if (applied > 0) {
    console.log('\nDon\'t forget to:');
    console.log('  1. Review changes');
    console.log('  2. Run tests');
    console.log('  3. Commit and deploy');
  }
}

main();
