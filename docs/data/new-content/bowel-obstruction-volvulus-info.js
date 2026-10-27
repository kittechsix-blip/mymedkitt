// MedKitt - Bowel Obstruction & Volvulus info pages
// Register INFO_PAGES_SBOV into INFO_PAGES (already wired; see toolbar file).
// Stop page: "Do NOT" items, each linking to the node that explains it.
// Steps page: sequence summary, each bullet linking to its node.
const SBOV_STEPS_PAGE = {
    id: 'bowel-obstruction-volvulus-steps',
    title: 'Bowel Obstruction Steps',
    subtitle: 'Exclude strangulation, image, then decide: trial, surgery, or volvulus pathway',
    sections: [
        {
            heading: '1. Recognise and exclude strangulation',
            body: '- [Triage by pattern](#/node/bowel-obstruction-volvulus-triage)\n- [Strangulation red flags: operate now](#/node/bowel-obstruction-volvulus-strangulation)',
        },
        {
            heading: '2. Stabilise and image',
            body: '- [NPO, NG for vomiting, labs, anion gap](#/node/bowel-obstruction-volvulus-stabilise)\n- [CT with IV contrast: read for ischemia](#/node/bowel-obstruction-volvulus-ct)',
        },
        {
            heading: '3. Partial adhesive SBO: non-operative trial',
            body: '- [Tube decompression and water-soluble contrast](#/node/bowel-obstruction-volvulus-nom-entry)\n- [Checkpoints: fever, peritonitis markers, 72 hours, day-3 drainage](#/node/bowel-obstruction-volvulus-nom-check)\n- [Contrast in colon within 24 hours](#/node/bowel-obstruction-volvulus-nom-resolving)',
        },
        {
            heading: '4. Surgery triggers',
            body: '- [Surgical consult criteria](#/node/bowel-obstruction-volvulus-surgery)',
        },
        {
            heading: '5. Sigmoid volvulus',
            body: '- [Ischemia, perforation, or shock: resect](#/node/bowel-obstruction-volvulus-sigmoid-entry)\n- [Stable: flexible endoscopic detorsion](#/node/bowel-obstruction-volvulus-sigmoid-endoscopy)\n- [After detorsion: colectomy plan](#/node/bowel-obstruction-volvulus-sigmoid-after)',
        },
        {
            heading: '6. Closed loop, cecal, large bowel, hernia',
            body: '- [Closed loop: surgical consult now](#/node/bowel-obstruction-volvulus-closed-loop)\n- [Cecal volvulus: surgical pathway](#/node/bowel-obstruction-volvulus-cecal)\n- [Malignant large bowel obstruction: stent](#/node/bowel-obstruction-volvulus-lbo)\n- [Incarcerated hernia with obstruction](#/node/bowel-obstruction-volvulus-hernia)',
        },
        {
            heading: '7. Disposition',
            body: '- [Resus / ICU versus admission](#/node/bowel-obstruction-volvulus-dispo)',
        },
    ],
    citations: [
        { num: 1, text: 'ten Broek RPG, Krielen P, Di Saverio S, et al. Bologna guidelines for diagnosis and management of adhesive small bowel obstruction (ASBO): 2017 update of the evidence-based guidelines from the World Society of Emergency Surgery ASBO working group. World J Emerg Surg. 2018;13:24. doi:10.1186/s13017-018-0185-2' },
        { num: 9, text: 'Tian BWC, et al. WSES consensus guidelines on sigmoid volvulus management. World J Emerg Surg. 2023;18:34.' },
        { num: 11, text: 'van Hooft JE, et al. Self-expandable metal stents for obstructing colonic and extracolonic cancer: ESGE Guideline, Update 2020. Endoscopy. 2020;52(5):389-407.' },
    ],
};
const SBOV_STOP_PAGE = {
    id: 'bowel-obstruction-volvulus-stop',
    title: 'Bowel Obstruction & Volvulus - Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT trial non-operative care with strangulation signs',
            body: 'Fever, tachycardia, leukocytosis, metabolic acidosis, or continuous pain excludes a non-operative trial. Strangulation needs surgery now. [Strangulation node](#/node/bowel-obstruction-volvulus-strangulation)',
        },
        {
            heading: '🛑 Do NOT read a normal exam or a single normal lab as clearance',
            body: 'Strangulation can be present with a benign exam. Lactate, D-dimer and immature granulocyte counts are observational and conflicting. Use them as context, never to rule out. [Strangulation node](#/node/bowel-obstruction-volvulus-strangulation)',
        },
        {
            heading: '🛑 Do NOT skip CT with IV contrast for ischemia',
            body: 'Wall enhancement, ascites, mesenteric haziness and closed-loop pattern decide the route more than the transition point. [CT read](#/node/bowel-obstruction-volvulus-ct)',
        },
        {
            heading: '🛑 Do NOT continue a non-operative trial past its checkpoints',
            body: 'Strangulation signs go to surgery. At 72 hours without resolution, or with drainage above 500 mL on day 3, consider surgery. WBC above 10,000/mm3 is a peritonitis marker with low sensitivity and specificity. [Checkpoints](#/node/bowel-obstruction-volvulus-nom-check)',
        },
        {
            heading: '🛑 Do NOT read contrast in the colon as cure',
            body: 'Contrast reaching the colon within 24 hours predicts resolution. It does not establish recurrence risk. [Resolving SBO](#/node/bowel-obstruction-volvulus-nom-resolving)',
        },
        {
            heading: '🛑 Do NOT attempt sigmoid endoscopy with ischemia or peritonitis',
            body: 'Advanced mucosal ischemia, perforation, impending perforation, peritonitis or septic shock means emergency colectomy. [Sigmoid entry](#/node/bowel-obstruction-volvulus-sigmoid-entry)',
        },
        {
            heading: '🛑 Do NOT stop at sigmoid detorsion, or use detorsion alone, sigmoidopexy or mesosigmoidoplasty for a fit patient',
            body: 'Detorsion alone recurs. Offer sigmoid colectomy, ideally during the index admission. Endoscopic fixation is for prohibitive operative risk only. [Colectomy plan](#/node/bowel-obstruction-volvulus-sigmoid-after) | [Prohibitive risk](#/node/bowel-obstruction-volvulus-sigmoid-pec)',
        },
        {
            heading: '🛑 Do NOT stent malignant large bowel obstruction prophylactically or with perforation',
            body: 'Reserve stent for symptomatic, radiologically confirmed malignant obstruction without perforation. [Large bowel node](#/node/bowel-obstruction-volvulus-lbo)',
        },
        {
            heading: '🛑 Do NOT give water-soluble contrast without safety checks',
            body: 'Confirm NG position and aspiration precautions, check allergy, and watch for anaphylactoid reaction. Lethal aspiration is reported. The NG route is off-label (label: oral or rectal only). Do NOT give if strangulation, peritonitis or perforation is suspected. [Trial node](#/node/bowel-obstruction-volvulus-nom-entry)',
        },
        {
            heading: '🛑 Do NOT discharge from the ED on the basis of this pathway',
            body: 'No discharge pathway for obstruction is sourced here. Admit and reassess. [Disposition](#/node/bowel-obstruction-volvulus-dispo)',
        },
    ],
    citations: [
        { num: 1, text: 'ten Broek RPG, Krielen P, Di Saverio S, et al. Bologna guidelines for diagnosis and management of adhesive small bowel obstruction (ASBO): 2017 update of the evidence-based guidelines from the World Society of Emergency Surgery ASBO working group. World J Emerg Surg. 2018;13:24. doi:10.1186/s13017-018-0185-2' },
        { num: 6, text: 'Zins M, Millet I, Taourel P. Adhesive small bowel obstruction: predictive radiology to improve patient management. Radiology. 2020;296(3):480-492.' },
        { num: 9, text: 'Tian BWC, et al. WSES consensus guidelines on sigmoid volvulus management. World J Emerg Surg. 2023;18:34.' },
        { num: 11, text: 'van Hooft JE, et al. Self-expandable metal stents for obstructing colonic and extracolonic cancer: ESGE Guideline, Update 2020. Endoscopy. 2020;52(5):389-407.' },
        { num: 16, text: 'Von-Diemen V, Volkweis BS, Martins EF. The water-soluble contrast for adhesive small bowel obstruction: are there advantages? Arq Bras Cir Dig. 2023;36:e1777.' },
        { num: 14, text: 'Su Q, Wang Q, Cao Y. Immature granulocyte: an early predictor of strangulated adhesive small bowel obstruction. BMC Gastroenterol. 2025;25(1):770.' },
        { num: 15, text: 'Zhang J, Hsieh Y, Dong L. Impact of surgical delay on bowel viability in internal hernia-related small bowel obstruction. BMC Gastroenterol. 2026;26(1):321.' },
    ],
};
export const INFO_PAGES_SBOV = {
    'bowel-obstruction-volvulus-steps': SBOV_STEPS_PAGE,
    'bowel-obstruction-volvulus-stop': SBOV_STOP_PAGE,
};
