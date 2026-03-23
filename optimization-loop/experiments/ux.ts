/**
 * UX Optimization Experiments
 * Tests CSS variable changes and measures Lighthouse scores
 */

import type { ExperimentResult, UXVariant } from '../types';
import { runLighthouse } from '../metrics/lighthouse';
import { log } from '../utils/logger';

interface UXConfig {
  variants: Array<{
    id: string;
    property: string;
    values: string[];
  }>;
  metrics: string[];
}

export async function runUXExperiment(
  config: UXConfig,
  baseUrl: string,
  dryRun = false
): Promise<ExperimentResult[]> {
  const results: ExperimentResult[] = [];

  log('info', `Starting UX experiments with ${config.variants.length} variant groups`);

  // Get baseline score first
  log('info', 'Measuring baseline...');
  const baseline = await runLighthouse(baseUrl);
  log('info', `Baseline scores: perf=${baseline.performance}, a11y=${baseline.accessibility}`);

  for (const variantGroup of config.variants) {
    log('info', `Testing ${variantGroup.id}: ${variantGroup.values.length} variants`);

    for (const value of variantGroup.values) {
      const experimentId = `ux-${variantGroup.id}-${value.replace(/[^a-z0-9]/gi, '')}`;

      if (dryRun) {
        log('info', `[DRY RUN] Would test ${variantGroup.property}: ${value}`);
        continue;
      }

      // Inject CSS variable override
      const variant: UXVariant = {
        property: variantGroup.property,
        value: value
      };

      // Run Lighthouse with variant applied
      const variantScore = await runLighthouse(baseUrl, variant);

      const improvement = calculateImprovement(baseline, variantScore);
      const isWinner = improvement > 0;

      const result: ExperimentResult = {
        experimentId,
        type: 'ux',
        variant: { [variantGroup.property]: value },
        baselineScore: baseline.performance,
        variantScore: variantScore.performance,
        improvement,
        winner: isWinner,
        timestamp: new Date().toISOString(),
        details: {
          baseline,
          variant: variantScore
        }
      };

      results.push(result);

      log(
        isWinner ? 'success' : 'info',
        `${experimentId}: ${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%`
      );
    }
  }

  return results;
}

function calculateImprovement(
  baseline: { performance: number; accessibility: number },
  variant: { performance: number; accessibility: number }
): number {
  // Weighted average: 60% performance, 40% accessibility
  const baselineComposite = baseline.performance * 0.6 + baseline.accessibility * 0.4;
  const variantComposite = variant.performance * 0.6 + variant.accessibility * 0.4;

  return ((variantComposite - baselineComposite) / baselineComposite) * 100;
}

export function generateUXReport(results: ExperimentResult[]): string {
  const winners = results.filter(r => r.winner);
  const sorted = [...winners].sort((a, b) => b.improvement - a.improvement);

  let report = '# UX Optimization Results\n\n';
  report += `Total experiments: ${results.length}\n`;
  report += `Winners: ${winners.length}\n\n`;

  if (sorted.length > 0) {
    report += '## Top Winners\n\n';
    report += '| Variant | Improvement | Apply? |\n';
    report += '|---------|-------------|--------|\n';

    for (const winner of sorted.slice(0, 10)) {
      report += `| ${winner.experimentId} | +${winner.improvement.toFixed(1)}% | [ ] |\n`;
    }
  }

  return report;
}
