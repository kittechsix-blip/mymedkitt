// MedKitt - Hypertensive Emergency (Adult) info pages
// DRAFT for physician sign-off. Pages: Steps summary and Stop (Do NOT) page.
// Register INFO_PAGES_HTNE into the info-page registry (stop pages normally live in src/data/stop-pages/).

import type { InfoPage } from '../info-pages.js';

const N = '#/node/hypertensive-emergency-adult-';

export const INFO_PAGES_HTNE: Record<string, InfoPage> = {
  'hypertensive-emergency-adult-steps': {
    id: 'hypertensive-emergency-adult-steps',
    title: 'Adult Hypertensive Emergency - Steps',
    subtitle: 'Rehearse under time pressure',
    sections: [
      {
        heading: 'Recognize',
        body: '- [Severe BP with acute organ injury?](' + N + 'start)\n- [Which organ is injured?](' + N + 'organ-injury)\n- [Exception present?](' + N + 'exceptions)\n- [Urgency: no organ injury](' + N + 'urgency)',
      },
      {
        heading: 'Set the target',
        body: '- [First-hour target: SBP no more than 25%, then gradual further reduction within 24 to 48 hours](' + N + 'first-hour) [10]\n- General case only. Compelling conditions (dissection, pregnancy, pheochromocytoma) use their own goals. Do not dose to a MAP percentage.',
      },
      {
        heading: 'Treat',
        body: '- [Pick the agent by organ at risk](' + N + 'agent-by-organ)\n- [Pregnancy severe-range pathway](' + N + 'pregnancy)\n- [Pitfalls and agents to avoid](' + N + 'pitfalls)',
      },
      {
        heading: 'Disposition',
        body: '- [ICU, admit, or discharge decision](' + N + 'dispo)\n- [Discharge only for urgency](' + N + 'dispo-discharge)',
      },
      {
        heading: 'Children',
        body: '- Use [Pediatric hypertensive emergency](#/tree/peds-hypertensive-emergency). Adult numbers do not apply to children.',
      },
    ],
    citations: [
      { num: 1, text: 'Whelton PK, et al. 2017 ACC/AHA High Blood Pressure Guideline. Hypertension. 2018;71(6):e13-e115.' },
      { num: 2, text: 'Marik PE, Varon J. Hypertensive crises: challenges and management. Chest. 2007;131(6):1949-1962.' },
      { num: 3, text: 'Rhoney DH, Peacock WF. Intravenous therapy for hypertensive emergencies, part 1. Am J Health Syst Pharm. 2009;66(12).' },
      { num: 4, text: 'ACOG Committee Opinion No. 767. Obstet Gynecol. 2019;133(2):e174-e180.' },
      { num: 10, text: '2025 AHA/ACC/AANP/AAPA/ABC/ACCP/ACPM/AGS/AMA/ASPC/NMA/PCNA/SGIM Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults. Circulation. 2025. Section 6.2, Tables 26 and 27. doi:10.1161/CIR.0000000000001356.' },
    ],
  },

  'hypertensive-emergency-adult-stop': {
    id: 'hypertensive-emergency-adult-stop',
    title: 'Hypertensive Emergency (Adult) - Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
      {
        heading: '🛑 Do NOT drop BP faster than the first-hour limit',
        body: 'Overly rapid drops can worsen renal, cerebral, or coronary perfusion. In the general case the guideline limit is SBP no more than 25% in the first hour [10]. [See first-hour target](' + N + 'first-hour).',
      },
      {
        heading: '🛑 Do NOT give sublingual nifedipine',
        body: 'Absorption is unpredictable and hypotension can be abrupt. In pregnancy, use the immediate-release oral protocol only. [See pitfalls](' + N + 'pitfalls).',
      },
      {
        heading: '🛑 Do NOT start IV drugs for severe BP without organ injury',
        body: 'Severe BP without acute organ injury is urgency. It is managed with an oral regimen and reassessment. [See urgency node](' + N + 'urgency).',
      },
      {
        heading: '🛑 Do NOT give hydralazine alone for rate control, or labetalol in reactive airway disease or heart block',
        body: 'Hydralazine causes reflex tachycardia. Labetalol is contraindicated in reactive airway disease and should not be given with second- or third-degree heart block or bradycardia [10]. [See beta-blocker branch](' + N + 'agent-beta-blocker).',
      },
      {
        heading: '🛑 Do NOT skip the dissection screen',
        body: 'Tearing pain, a pulse or BP deficit, or a widened mediastinum changes the agent. Beta-blocker is first-line for dissection. [See dissection branch](' + N + 'exc-dissection).',
      },
      {
        heading: '🛑 Do NOT use the general MAP rule for intracerebral hemorrhage',
        body: 'The ICH target and timing are set in the ICH consult. [See ICH branch](' + N + 'exc-ich).',
      },
      {
        heading: '🛑 Do NOT give a beta-blocker before alpha-blockade in pheochromocytoma',
        body: 'Unopposed alpha stimulation can worsen the crisis. Give phentolamine first. [See pheochromocytoma branch](' + N + 'exc-pheo).',
      },
      {
        heading: '🛑 Do NOT treat cocaine toxicity without toxicology input',
        body: 'Phentolamine is the listed agent for catecholamine excess, including cocaine toxicity [10]. Toxicology and the chest pain hub govern. [See cocaine branch](' + N + 'exc-cocaine).',
      },
      {
        heading: '🛑 Do NOT give nitroprusside in acute cerebrovascular disease',
        body: 'Avoid it in acute cerebrovascular disease unless other agents are not available [10]. [See nitroprusside](' + N + 'agent-nitroprusside).',
      },
      {
        heading: '🛑 Do NOT discharge severe BP with any organ injury',
        body: 'Discharge is for urgency only, with no organ injury, reliable oral therapy, follow-up, and clear return precautions. [See discharge node](' + N + 'dispo-discharge).',
      },
    ],
    citations: [
      { num: 1, text: 'Whelton PK, et al. 2017 ACC/AHA High Blood Pressure Guideline. Hypertension. 2018;71(6):e13-e115.' },
      { num: 2, text: 'Marik PE, Varon J. Hypertensive crises: challenges and management. Chest. 2007;131(6):1949-1962.' },
      { num: 4, text: 'ACOG Committee Opinion No. 767. Obstet Gynecol. 2019;133(2):e174-e180.' },
      { num: 5, text: 'Greenberg SM, et al. 2022 AHA/ASA Guideline for Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53:e282-e361.' },
      { num: 6, text: 'Isselbacher EM, et al. 2022 ACC/AHA Guideline for Aortic Disease. J Am Coll Cardiol. 2022;80(24):e223-e393.' },
      { num: 7, text: 'Lenders JWM, et al. Endocrine Society pheochromocytoma guideline. J Clin Endocrinol Metab. 2014;99(6):1915-1942.' },
      { num: 10, text: '2025 AHA/ACC/AANP/AAPA/ABC/ACCP/ACPM/AGS/AMA/ASPC/NMA/PCNA/SGIM Guideline for the Prevention, Detection, Evaluation and Management of High Blood Pressure in Adults. Circulation. 2025. Section 6.2, Tables 26 and 27. doi:10.1161/CIR.0000000000001356.' },
    ],
  },
};
