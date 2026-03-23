/**
 * Type definitions for the optimization loop
 */

export interface ExperimentResult {
  experimentId: string;
  type: 'ux' | 'content' | 'search';
  variant: Record<string, any>;
  baselineScore: number;
  variantScore: number;
  improvement: number;
  winner: boolean;
  timestamp: string;
  details?: Record<string, any>;
}

export interface UXVariant {
  property: string;
  value: string;
}

export interface ContentVariant {
  nodeId: string;
  optimization: string;
  original: string;
  revised: string;
}

export interface SearchWeights {
  title: number;
  tags: number;
  body: number;
}

export interface Config {
  version: string;
  experimentDuration: string;
  maxExperimentsPerNight: number;
  metricsEndpoint: string;

  ux: {
    enabled: boolean;
    variants: Array<{
      id: string;
      property: string;
      values: string[];
    }>;
    metrics: string[];
  };

  content: {
    enabled: boolean;
    targetNodes: string[];
    optimizations: Array<{
      id: string;
      description: string;
      metric: string;
    }>;
    llmProvider: string;
    llmModel: string;
  };

  search: {
    enabled: boolean;
    testQueries: Array<{
      query: string;
      expectedTop: string;
    }>;
    weights: {
      baseline: SearchWeights;
      variants: SearchWeights[];
    };
    fuzzyThresholds: number[];
  };

  output: {
    resultsDir: string;
    winnersDir: string;
    logLevel: string;
  };
}

export interface RunOptions {
  type?: 'ux' | 'content' | 'search' | 'all';
  duration?: string;
  dryRun?: boolean;
}
