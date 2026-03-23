#!/usr/bin/env bun
/**
 * Review Winners Script
 * Interactive review of optimization experiment winners
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import type { ExperimentResult } from '../types';

const winnersDir = join(import.meta.dir, '..', 'winners');

function main() {
  if (!existsSync(winnersDir)) {
    console.log('No winners directory found. Run experiments first.');
    return;
  }

  const files = readdirSync(winnersDir).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('No winners found. Run experiments first.');
    return;
  }

  console.log('\n=== myMedKitt Optimization Winners ===\n');

  for (const file of files) {
    const filepath = join(winnersDir, file);
    const winners: ExperimentResult[] = JSON.parse(readFileSync(filepath, 'utf-8'));

    console.log(`\nFile: ${file}`);
    console.log(`Total winners: ${winners.length}\n`);

    // Group by type
    const byType = {
      ux: winners.filter(w => w.type === 'ux'),
      content: winners.filter(w => w.type === 'content'),
      search: winners.filter(w => w.type === 'search')
    };

    // UX Winners
    if (byType.ux.length > 0) {
      console.log('UX Winners:');
      console.log('-'.repeat(50));
      for (const w of byType.ux.sort((a, b) => b.improvement - a.improvement)) {
        console.log(`  [${w.experimentId}]`);
        console.log(`    Improvement: +${w.improvement.toFixed(1)}%`);
        console.log(`    Change: ${JSON.stringify(w.variant)}`);
        console.log('');
      }
    }

    // Content Winners
    if (byType.content.length > 0) {
      console.log('Content Winners:');
      console.log('-'.repeat(50));
      for (const w of byType.content.sort((a, b) => b.improvement - a.improvement)) {
        console.log(`  [${w.experimentId}]`);
        console.log(`    Readability: ${w.baselineScore.toFixed(1)} -> ${w.variantScore.toFixed(1)} grade level`);
        console.log(`    Node: ${w.variant.nodeId}`);
        console.log('');
      }
    }

    // Search Winners
    if (byType.search.length > 0) {
      console.log('Search Winners:');
      console.log('-'.repeat(50));
      for (const w of byType.search.sort((a, b) => b.improvement - a.improvement)) {
        console.log(`  [${w.experimentId}]`);
        console.log(`    Accuracy: ${w.baselineScore.toFixed(1)}% -> ${w.variantScore.toFixed(1)}%`);
        console.log(`    Config: ${JSON.stringify(w.variant)}`);
        console.log('');
      }
    }
  }

  console.log('\nTo apply a winner:');
  console.log('  bun run winners:apply <experiment-id>');
  console.log('\nTo apply all winners:');
  console.log('  bun run winners:apply --all');
}

main();
