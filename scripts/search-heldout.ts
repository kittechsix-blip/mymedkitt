/**
 * SEALED held-out question set for the Home question search.
 *
 * Written (2026-10-25) BEFORE any ranking code existed. Never tune synonyms,
 * intents or boosts against these questions: they exist to measure how the
 * ranker does on phrasing it was not fitted to. If a question here fails, fix
 * the general rule that failed (or leave it failing and report it), never add
 * a per-question boost.
 *
 * Pin keys (any one listed key at rank N counts as a hit):
 *   tree:<id>   the consult page, or any node inside that consult
 *   node:<tree>/<node>   one specific node
 *   info:<id>   an info page (any section)
 *   sec:<page>#<anchor>   one section of an info page
 *   drug:<id>   a drug entry
 *   calc:<id>   a calculator
 */
export interface GoldQuestion {
  q: string;
  expect: string[];
}

export const HELDOUT: GoldQuestion[] = [
  { q: 'ecg changes in hyperkalemia', expect: ['info:k-hyper-ecg-info'] },
  { q: 'how do I reverse dabigatran', expect: ['drug:idarucizumab', 'tree:anticoag-reversal', 'calc:coag-doac-reversal'] },
  { q: 'ketamine dose for delayed sequence intubation', expect: ['info:dsi-ketamine', 'info:dsi-summary', 'tree:delayed-sequence-intubation'] },
  { q: 'can I give amiodarone for torsades', expect: ['info:torsades-de-pointes-stop', 'tree:torsades-de-pointes'] },
  { q: 'contraindications to tpa', expect: ['info:stroke-contraindications', 'node:thrombolytic-protocols/lytics-contra'] },
  { q: 'wells score for dvt', expect: ['calc:wells-dvt'] },
  { q: 'diagnostic criteria for serotonin syndrome', expect: ['tree:serotonin-syndrome'] },
  { q: 'how do I treat a calcium channel blocker overdose', expect: ['tree:ccb-od'] },
  { q: 'fomepizole dosing for methanol', expect: ['node:toxic-alcohols/tox-alc-fomepizole', 'tree:toxic-alcohols', 'drug:fomepizole'] },
  { q: 'antidote for digoxin toxicity', expect: ['tree:digoxin-toxicity', 'drug:digifab'] },
  { q: 'red flags for cauda equina', expect: ['calc:cauda-equina-checklist', 'info:lbp-red-flags', 'tree:cauda-equina'] },
  { q: 'when to dialyze lithium toxicity', expect: ['tree:lithium-toxicity'] },
  { q: 'alcohol withdrawal scoring scale', expect: ['calc:ciwa-ar', 'tree:alcohol-withdrawal'] },
  { q: 'ceftriaxone in febrile infants under 28 days', expect: ['info:pf-ceftriaxone-ci', 'info:pf-abx-dosing'] },
  { q: 'refractory seizures in tca overdose', expect: ['info:tca-seizure-guide', 'tree:tca-toxidrome'] },
  { q: 'do not wait for imaging in tension pneumothorax', expect: ['info:cp-stop', 'info:ta-hott'] },
  { q: 'tranexamic acid dose', expect: ['drug:tranexamic-acid', 'calc:txa-hemoptysis'] },
  { q: 'heparin drip bolus and rate', expect: ['tree:heparin-infusion', 'drug:ufh'] },
  { q: 'when is vasopressin added in septic shock', expect: ['info:sepsis-vp-comparison', 'tree:sepsis'] },
  { q: 'insulin drip in dka', expect: ['tree:dka'] },
  { q: 'second line anti seizure medication in status epilepticus', expect: ['info:se-summary', 'tree:status-epilepticus'] },
  { q: 'treatment of hypertensive emergency in a child', expect: ['node:peds-hypertensive-emergency/phe-tx-emergency', 'tree:peds-hypertensive-emergency'] },
  { q: 'unstable patient with ruptured ectopic', expect: ['node:first-trimester/ft-unstable-ectopic', 'info:first-trimester-stop'] },
  { q: 'how to calculate the anion gap', expect: ['calc:anion-gap'] },
  { q: 'should I use ethanol if fomepizole is available', expect: ['info:toxic-alcohols-stop', 'node:toxic-alcohols/tox-alc-fomepizole', 'tree:toxic-alcohols'] },
];
