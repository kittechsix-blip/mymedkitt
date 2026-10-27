// DRAFT — RibScore calculator (not wired). Integrator registers id 'ribscore' in the CALCULATORS map in calculator.ts.
// CalculatorDefinition is not exported from calculator.ts, so this object is untyped (same as us-iv.ts).
// Scoring is a pure function so a test can import it. No action threshold is coded (see thresholdNote).

export const RIBSCORE_ITEMS = [
  { name: 'six-or-more', label: 'Six or more rib fractures' },
  { name: 'bilateral', label: 'Bilateral rib fractures' },
  { name: 'flail', label: 'Flail chest' },
  { name: 'three-or-more-displaced', label: 'Three or more severely displaced fractures' },
  { name: 'first-rib', label: 'First rib fracture' },
  { name: 'all-three-areas', label: 'At least one fracture in each of anterior, lateral and posterior areas' },
];

// Returns 0-6. Each toggle that is ON (value 1) adds one point; no weighting.
export function scoreRibScore(values: Record<string, number>): number {
  return RIBSCORE_ITEMS.reduce((sum, item) => sum + (values[item.name] === 1 ? 1 : 0), 0);
}

export const RIBSCORE_CALCULATOR = {
  id: 'ribscore',
  title: 'RibScore',
  subtitle: 'Blunt chest trauma: rib fracture pattern score for pulmonary complications',
  description: 'Score the six CT fracture-pattern features, one point each. Derived to predict pneumonia, acute respiratory failure and tracheostomy in blunt trauma with rib fractures on chest CT.',
  fields: RIBSCORE_ITEMS.map(item => ({
    name: item.name,
    label: item.label,
    type: 'toggle' as const,
    points: 1,
  })),
  results: [],
  thresholdNote:
    '**NOT A RULE-OUT.** A low score does not exclude pneumonia, respiratory failure or tracheostomy.\n\n' +
    '**NOT A MORTALITY TOOL.** Not validated for mortality.\n\n' +
    '**NO ACTION CUTOFF CODED.** Published expert-framed bands come from secondary sources and need physician sign-off before use. Decide on admission and ICU level from the whole picture: breathing, flail, contusion, anticoagulation, age and pulmonary reserve.',
  citations: [
    'Chapman BC, Herbert B, Rodil M, Salotto J, Stovall RT, Biffl W, et al. RibScore: a novel radiographic score based on fracture pattern that predicts pneumonia, respiratory failure, and tracheostomy. J Trauma Acute Care Surg. 2016;80(1):95-101. doi:10.1097/TA.0000000000000867',
  ],
  computeResult(values: Record<string, number>) {
    const score = scoreRibScore(values);
    const met = RIBSCORE_ITEMS.filter(item => values[item.name] === 1);
    const featureLines = met.length
      ? met.map(item => `• ${item.label}`).join('\n')
      : '• None entered';
    return {
      value: `${score} / 6`,
      label: `Score ${score}`,
      description:
        `**FEATURES PRESENT:** ${met.length} of 6\n\n${featureLines}\n\n` +
        '**HOW TO READ IT:**\n\n' +
        '• Predicts pulmonary complications in the derivation cohort\n' +
        '• A higher score is a stronger signal, not a diagnosis\n' +
        '• A low score does not rule out complications\n' +
        '• No admission or ICU cutoff is coded here',
      colorVar: score === 0 ? '--color-text-muted' : '--color-warning',
    };
  },
};
