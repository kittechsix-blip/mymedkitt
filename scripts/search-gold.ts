/**
 * Gold question set for the Home question search (the TUNING set).
 *
 * Real questions an EM attending would type on shift, pinned to the page the
 * app should open. Same pin keys as search-heldout.ts:
 *   tree:<id>  node:<tree>/<node>  info:<id>  drug:<id>  calc:<id>
 *   sec:<page>#<anchor>  one section of an info page (the exact place the answer is)
 * Any one listed key at rank N counts as a hit. The ranker may be tuned against
 * this file; it may NOT be tuned against search-heldout.ts.
 */
import type { GoldQuestion } from './search-heldout.ts';

export const GOLD: GoldQuestion[] = [
  // Toxicology
  { q: 'what is the antidote for acetaminophen overdose', expect: ['tree:acetaminophen', 'drug:n-acetylcysteine'] },
  { q: 'NAC dose for tylenol overdose', expect: ['drug:n-acetylcysteine', 'tree:acetaminophen'] },
  { q: 'tca overdose bicarb', expect: ['tree:tca-toxidrome'] },
  { q: 'INH overdose seizures pyridoxine', expect: ['tree:isoniazid-toxicity'] },
  { q: 'beta blocker overdose treatment', expect: ['tree:beta-blocker-od', 'calc:bb-agent-guide'] },
  { q: 'salicylate toxicity alkalinization', expect: ['tree:salicylate', 'calc:sal-tox-guide'] },
  { q: 'naloxone dose', expect: ['drug:naloxone'] },
  { q: 'which toxic alcohol is it', expect: ['calc:tox-alc-which', 'tree:toxic-alcohols'] },
  { q: 'sulfonylurea hypoglycemia octreotide', expect: ['tree:hypoglycemia', 'drug:octreotide'] },
  // Cardiology
  { q: 'stemi criteria', expect: ['tree:stemi', 'info:stemi-reperfusion-pathway'] },
  { q: 'rate control for afib with rvr', expect: ['tree:afib-rvr'] },
  { q: 'adenosine dose for svt', expect: ['tree:svt', 'drug:adenosine'] },
  { q: 'heart score', expect: ['calc:heart-score'] },
  { q: 'nstemi management', expect: ['tree:nstemi'] },
  { q: 'how do I treat wide complex tachycardia', expect: ['tree:wide-complex-tachycardia'] },
  { q: 'post rosc care targets', expect: ['tree:post-rosc'] },
  // Neurology
  { q: 'what is the nihss', expect: ['calc:nihss'] },
  { q: 'tpa window for ischemic stroke', expect: ['tree:stroke', 'tree:thrombolytic-protocols', 'info:stroke-contraindications'] },
  { q: 'migraine abortive treatment', expect: ['tree:migraine', 'calc:migraine-tx-algo'] },
  { q: 'canadian ct head rule', expect: ['calc:canadian-ct-head'] },
  { q: 'ottawa sah rule', expect: ['calc:ottawa-sah', 'node:sah/sah-ottawa'] },
  { q: 'myasthenic crisis versus cholinergic crisis', expect: ['info:mg-crisis', 'node:myasthenia-gravis/mg-crisis-vs-cholinergic'] },
  // Infectious disease
  { q: 'antibiotics for community acquired pneumonia', expect: ['tree:pneumonia'] },
  { q: 'curb 65', expect: ['calc:curb-65'] },
  { q: 'empiric antibiotics for meningitis', expect: ['calc:mening-abx', 'tree:meningitis'] },
  { q: 'hiv post exposure prophylaxis regimen', expect: ['tree:pep'] },
  { q: 'syphilis treatment', expect: ['tree:syphilis'] },
  { q: 'neurosyphilis workup csf', expect: ['tree:neurosyphilis'] },
  // Obstetrics
  { q: 'what are risks for ectopic pregnancy', expect: ['sec:ft-ectopic-risk#trick-major-risk-factors'] },
  { q: 'magnesium dose for eclampsia', expect: ['tree:eclampsia'] },
  { q: 'pph uterotonic ladder', expect: ['info:pph-uterotonic-ladder', 'tree:pph'] },
  { q: 'shoulder dystocia maneuvers', expect: ['tree:shoulder-dystocia', 'info:sd-summary'] },
  { q: 'when to give rhogam', expect: ['tree:rhogam-early-pregnancy', 'calc:rhogam-decision', 'drug:rh-immune-globulin'] },
  { q: 'severe hypertension in pregnancy treatment', expect: ['tree:htn-pregnancy', 'tree:eclampsia'] },
  // Trauma
  { q: 'parkland formula burn fluids', expect: ['tree:burns'] },
  { q: 'massive transfusion protocol ratios', expect: ['tree:massive-transfusion', 'calc:mtp-component'] },
  { q: 'c spine clearance rules', expect: ['calc:cspine-nexus', 'calc:cspine-ccr', 'info:ct-steps-summary'] },
  { q: 'pelvic fracture hemorrhage control', expect: ['tree:pelvic-fracture', 'info:pelvic-summary'] },
  { q: 'nexus criteria', expect: ['calc:cspine-nexus'] },
  // Pediatrics
  { q: 'croup dexamethasone dose', expect: ['tree:croup', 'drug:dexamethasone'] },
  { q: 'bronchiolitis management', expect: ['tree:bronchiolitis'] },
  { q: 'pediatric dka fluid', expect: ['calc:peds-dka-fluid-calc', 'tree:peds-dka'] },
  { q: 'pediatric skin and soft tissue infection antibiotics', expect: ['tree:peds-ssti'] },
  // Drugs
  { q: 'etomidate dose', expect: ['drug:etomidate'] },
  { q: 'norepinephrine dose for septic shock', expect: ['drug:norepinephrine', 'tree:sepsis'] },
  { q: 'labetalol dosing', expect: ['drug:labetalol'] },
  { q: 'ceftriaxone dose for meningitis', expect: ['drug:ceftriaxone', 'calc:mening-abx'] },
  { q: 'how much naloxone for opioid overdose', expect: ['drug:naloxone'] },
  { q: 'push dose pressors', expect: ['tree:push-dose-pressors'] },
  // Calculators
  { q: 'calculate qtc', expect: ['calc:qtc-calculator'] },
  { q: 'corrected calcium for low albumin', expect: ['calc:corrected-calcium'] },
  { q: 'corrected sodium in hyperglycemia', expect: ['calc:corrected-na'] },
  { q: 'cluster vs migraine', expect: ['calc:cluster-migraine-tension-differentiator'] },
  // Typos and abbreviations
  { q: 'ectopc pregnancy risk factrs', expect: ['sec:ft-ectopic-risk#trick-major-risk-factors'] },
  { q: 'dka fluids', expect: ['tree:dka'] },
  { q: 'pe wells score', expect: ['calc:wells-pe'] },
  { q: 'hyponatremia correction rate', expect: ['node:sodium/na-hypo-correction-limits', 'tree:sodium', 'tree:hypertonic-saline-protocol', 'calc:corrected-na'] },
  { q: 'acs chest pain risk stratification', expect: ['calc:heart-score', 'tree:nstemi'] },
  { q: 'afib rvr diltiazem dose', expect: ['tree:afib-rvr', 'drug:diltiazem'] },
  { q: 'sbp goal in sah', expect: ['tree:sah'] },
];
