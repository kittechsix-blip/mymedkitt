/**
 * Content Optimization Experiments
 * Uses LLM to generate phrasing variants, measures readability
 */

import Anthropic from '@anthropic-ai/sdk';
import type { ExperimentResult, ContentVariant } from '../types';
import { calculateReadability } from '../metrics/readability';
import { log } from '../utils/logger';

interface ContentConfig {
  targetNodes: string[];
  optimizations: Array<{
    id: string;
    description: string;
    metric: string;
  }>;
  llmProvider: string;
  llmModel: string;
}

const anthropic = new Anthropic();

export async function runContentExperiment(
  config: ContentConfig,
  getNodeContent: (nodeId: string) => Promise<string>,
  dryRun = false
): Promise<ExperimentResult[]> {
  const results: ExperimentResult[] = [];

  log('info', `Starting content experiments on ${config.targetNodes.length} nodes`);

  for (const nodeId of config.targetNodes) {
    const originalContent = await getNodeContent(nodeId);
    const baselineReadability = calculateReadability(originalContent);

    log('info', `Node ${nodeId}: baseline readability = ${baselineReadability.fleschKincaid.toFixed(1)}`);

    for (const optimization of config.optimizations) {
      const experimentId = `content-${nodeId}-${optimization.id}`;

      if (dryRun) {
        log('info', `[DRY RUN] Would optimize ${nodeId} with ${optimization.id}`);
        continue;
      }

      // Generate variant using LLM
      const variantContent = await generateVariant(
        originalContent,
        optimization.id,
        optimization.description
      );

      if (!variantContent) {
        log('warn', `Failed to generate variant for ${experimentId}`);
        continue;
      }

      const variantReadability = calculateReadability(variantContent);

      // Check medical accuracy (simple heuristic - ensure key terms preserved)
      const accuracyCheck = checkMedicalAccuracy(originalContent, variantContent);

      if (!accuracyCheck.passed) {
        log('warn', `${experimentId}: Failed accuracy check - ${accuracyCheck.reason}`);
        continue;
      }

      const improvement = baselineReadability.fleschKincaid - variantReadability.fleschKincaid;
      // Lower Flesch-Kincaid = easier to read, so negative improvement is good
      const isWinner = improvement < -0.5; // At least 0.5 grade level easier

      const result: ExperimentResult = {
        experimentId,
        type: 'content',
        variant: {
          nodeId,
          optimization: optimization.id,
          original: originalContent,
          revised: variantContent
        },
        baselineScore: baselineReadability.fleschKincaid,
        variantScore: variantReadability.fleschKincaid,
        improvement: -improvement, // Flip sign so positive = better
        winner: isWinner,
        timestamp: new Date().toISOString(),
        details: {
          baselineReadability,
          variantReadability,
          accuracyCheck
        }
      };

      results.push(result);

      log(
        isWinner ? 'success' : 'info',
        `${experimentId}: ${baselineReadability.fleschKincaid.toFixed(1)} -> ${variantReadability.fleschKincaid.toFixed(1)} grade level`
      );
    }
  }

  return results;
}

async function generateVariant(
  content: string,
  optimizationType: string,
  description: string
): Promise<string | null> {
  const prompts: Record<string, string> = {
    'abbreviation-expansion': `Rewrite this medical content, expanding common abbreviations to full terms for clarity. Keep the same meaning and all medical facts. Only expand where it improves readability.

Content:
${content}

Return ONLY the revised content, nothing else.`,

    'step-reordering': `Rewrite this medical content, reordering the steps to flow more logically. The most critical/time-sensitive actions should come first. Keep all the same information.

Content:
${content}

Return ONLY the revised content, nothing else.`,

    'phrasing-clarity': `Rewrite this medical content to be clearer and more scannable. Use shorter sentences, active voice, and clear structure. Preserve all medical facts and terminology accuracy.

Content:
${content}

Return ONLY the revised content, nothing else.`
  };

  const prompt = prompts[optimizationType];
  if (!prompt) {
    log('warn', `Unknown optimization type: ${optimizationType}`);
    return null;
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }]
    });

    const textBlock = response.content.find(block => block.type === 'text');
    return textBlock ? textBlock.text : null;
  } catch (error) {
    log('error', `LLM error: ${error}`);
    return null;
  }
}

function checkMedicalAccuracy(
  original: string,
  revised: string
): { passed: boolean; reason?: string } {
  // Extract key medical terms from original
  const medicalTermPattern = /\b(mg|mcg|mL|IV|PO|IM|SQ|PRN|BID|TID|QID|Q\d+H|mmHg|bpm|SpO2|GCS|MAP|CVP|lactate|creatinine|troponin|BNP|d-dimer)\b/gi;

  const originalTerms = new Set(
    (original.match(medicalTermPattern) || []).map(t => t.toLowerCase())
  );

  const revisedTerms = new Set(
    (revised.match(medicalTermPattern) || []).map(t => t.toLowerCase())
  );

  // Check that all original terms are preserved
  const missingTerms: string[] = [];
  for (const term of originalTerms) {
    if (!revisedTerms.has(term)) {
      missingTerms.push(term);
    }
  }

  if (missingTerms.length > 0) {
    return {
      passed: false,
      reason: `Missing medical terms: ${missingTerms.join(', ')}`
    };
  }

  // Check for numbers - dosages should be preserved
  const originalNumbers = original.match(/\d+(\.\d+)?/g) || [];
  const revisedNumbers = revised.match(/\d+(\.\d+)?/g) || [];

  const criticalNumbers = originalNumbers.filter(n =>
    parseFloat(n) > 0 && parseFloat(n) < 10000 // Likely dosages
  );

  for (const num of criticalNumbers) {
    if (!revisedNumbers.includes(num)) {
      return {
        passed: false,
        reason: `Missing number (possible dosage): ${num}`
      };
    }
  }

  return { passed: true };
}

export function generateContentReport(results: ExperimentResult[]): string {
  const winners = results.filter(r => r.winner);

  let report = '# Content Optimization Results\n\n';
  report += `Total experiments: ${results.length}\n`;
  report += `Winners: ${winners.length}\n\n`;

  if (winners.length > 0) {
    report += '## Improved Content\n\n';

    for (const winner of winners) {
      report += `### ${winner.experimentId}\n`;
      report += `Readability: ${winner.baselineScore.toFixed(1)} -> ${winner.variantScore.toFixed(1)} grade level\n\n`;
      report += '**Original:**\n```\n' + winner.variant.original.slice(0, 200) + '...\n```\n\n';
      report += '**Revised:**\n```\n' + winner.variant.revised.slice(0, 200) + '...\n```\n\n';
    }
  }

  return report;
}
