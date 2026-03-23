/**
 * Search Optimization Experiments
 * Tests different ranking weights and fuzzy thresholds
 */

import Fuse from 'fuse.js';
import type { ExperimentResult, SearchWeights } from '../types';
import { log } from '../utils/logger';

interface SearchConfig {
  testQueries: Array<{
    query: string;
    expectedTop: string;
  }>;
  weights: {
    baseline: SearchWeights;
    variants: SearchWeights[];
  };
  fuzzyThresholds: number[];
}

interface SearchableItem {
  id: string;
  title: string;
  tags: string[];
  body: string;
}

export async function runSearchExperiment(
  config: SearchConfig,
  getSearchableContent: () => Promise<SearchableItem[]>,
  dryRun = false
): Promise<ExperimentResult[]> {
  const results: ExperimentResult[] = [];
  const content = await getSearchableContent();

  log('info', `Starting search experiments with ${content.length} searchable items`);
  log('info', `Testing ${config.testQueries.length} queries across ${config.weights.variants.length} weight configs`);

  // Get baseline accuracy
  const baselineAccuracy = measureAccuracy(content, config.testQueries, config.weights.baseline, 0.4);
  log('info', `Baseline accuracy: ${(baselineAccuracy * 100).toFixed(1)}%`);

  // Test weight variants
  for (let i = 0; i < config.weights.variants.length; i++) {
    const weights = config.weights.variants[i];
    const experimentId = `search-weights-${i + 1}`;

    if (dryRun) {
      log('info', `[DRY RUN] Would test weights: title=${weights.title}, tags=${weights.tags}, body=${weights.body}`);
      continue;
    }

    const accuracy = measureAccuracy(content, config.testQueries, weights, 0.4);
    const improvement = ((accuracy - baselineAccuracy) / baselineAccuracy) * 100;
    const isWinner = accuracy > baselineAccuracy;

    const result: ExperimentResult = {
      experimentId,
      type: 'search',
      variant: { weights },
      baselineScore: baselineAccuracy * 100,
      variantScore: accuracy * 100,
      improvement,
      winner: isWinner,
      timestamp: new Date().toISOString(),
      details: {
        weights,
        queriesCorrect: Math.round(accuracy * config.testQueries.length),
        queriesTotal: config.testQueries.length
      }
    };

    results.push(result);

    log(
      isWinner ? 'success' : 'info',
      `${experimentId}: ${(accuracy * 100).toFixed(1)}% (${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%)`
    );
  }

  // Test fuzzy thresholds
  for (const threshold of config.fuzzyThresholds) {
    const experimentId = `search-fuzzy-${threshold.toString().replace('.', '')}`;

    if (dryRun) {
      log('info', `[DRY RUN] Would test fuzzy threshold: ${threshold}`);
      continue;
    }

    const accuracy = measureAccuracy(content, config.testQueries, config.weights.baseline, threshold);
    const improvement = ((accuracy - baselineAccuracy) / baselineAccuracy) * 100;
    const isWinner = accuracy > baselineAccuracy;

    const result: ExperimentResult = {
      experimentId,
      type: 'search',
      variant: { fuzzyThreshold: threshold },
      baselineScore: baselineAccuracy * 100,
      variantScore: accuracy * 100,
      improvement,
      winner: isWinner,
      timestamp: new Date().toISOString(),
      details: {
        threshold,
        queriesCorrect: Math.round(accuracy * config.testQueries.length),
        queriesTotal: config.testQueries.length
      }
    };

    results.push(result);

    log(
      isWinner ? 'success' : 'info',
      `${experimentId}: ${(accuracy * 100).toFixed(1)}% (${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%)`
    );
  }

  return results;
}

function measureAccuracy(
  content: SearchableItem[],
  testQueries: Array<{ query: string; expectedTop: string }>,
  weights: SearchWeights,
  threshold: number
): number {
  const fuse = new Fuse(content, {
    keys: [
      { name: 'title', weight: weights.title / 10 },
      { name: 'tags', weight: weights.tags / 10 },
      { name: 'body', weight: weights.body / 10 }
    ],
    threshold,
    includeScore: true,
    ignoreLocation: true
  });

  let correct = 0;

  for (const { query, expectedTop } of testQueries) {
    const results = fuse.search(query);

    if (results.length > 0 && results[0].item.id === expectedTop) {
      correct++;
    }
  }

  return correct / testQueries.length;
}

export function generateSearchReport(results: ExperimentResult[]): string {
  const winners = results.filter(r => r.winner);
  const sorted = [...winners].sort((a, b) => b.improvement - a.improvement);

  let report = '# Search Optimization Results\n\n';
  report += `Total experiments: ${results.length}\n`;
  report += `Winners: ${winners.length}\n\n`;

  if (sorted.length > 0) {
    report += '## Best Configurations\n\n';
    report += '| Config | Accuracy | Improvement |\n';
    report += '|--------|----------|-------------|\n';

    for (const winner of sorted) {
      report += `| ${winner.experimentId} | ${winner.variantScore.toFixed(1)}% | +${winner.improvement.toFixed(1)}% |\n`;
    }

    report += '\n### Recommended Changes\n\n';
    const best = sorted[0];

    if (best.variant.weights) {
      report += `Update search weights to: title=${best.variant.weights.title}, tags=${best.variant.weights.tags}, body=${best.variant.weights.body}\n`;
    }
    if (best.variant.fuzzyThreshold) {
      report += `Update fuzzy threshold to: ${best.variant.fuzzyThreshold}\n`;
    }
  }

  return report;
}
