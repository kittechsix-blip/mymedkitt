// myMedKitt - Transplant Patient in the ED: lung transplant recipient page (tree id transplant-patient-ed, prefix tpe-)
// DRAFT for the assembler (revision 5: principal-review shape; hub with 7 nodes). Module numbers are 0 on purpose.
// Scope: RECOGNITION AND FIRST ACTIONS. The sources are ISHLT definitional consensus documents, not management guidelines.
// Every clinical sentence is SOURCED ([n]) or begins "Editor note:" (fixed approved text) or "App content:" (names the consult only)
// or "Not in the documents:" (a stated silence, followed by the nearest sourced fact and a "Related consults:" line).
// Labels (defined in the entry node, exact scores in tpe-lung-consensus-scores.info.ts): reached consensus, barely reached consensus,
// did not reach consensus, votes widely spread (editor's marker, SD 1.7 or more). IDSA grades are named as IDSA grades.
// Summaries: 30 words or fewer, no quotation marks. A sentence in a summary or critical action naming augmenting, reducing, holding,
// stopping, withdrawing or substituting an immunosuppressant carries "(call the transplant team first)" (owner-approved editor phrase).
// Citation numbers are GLOBAL and identical in every overlay: 1 ALAD 2026, 2 AMR 2026, 3 CLAD 2019, 4 AMR 2016, 5 Stewart 2007,
// 6 BLAD 2026, 7 IDSA 2016, 8 IDSA 2026 (each file lists only those it cites).
// Overlays (drafts/<id>.info.ts): tpe-lung-definitions, tpe-lung-evaluation, tpe-lung-differential, tpe-lung-first-actions,
// tpe-lung-specialist-care, tpe-lung-consensus-scores, tpe-lung-other-consults.

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';
import type { Citation } from './neurosyphilis.js';

export const CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.', nodeId: 'tpe-lung' },
  { text: 'ALAD: empiric treatment may be started before testing (reached consensus).', nodeId: 'tpe-lung-unstable' },
  { text: 'Rapidly progressive ALAD: augmenting immunosuppression to treat rejection should be initiated without delay for testing (reached consensus) (call the transplant team first).', nodeId: 'tpe-lung-unstable' },
  { text: 'Severe ALAD: empiric broad-spectrum antibiotics should be initiated (reached consensus).', nodeId: 'tpe-lung-severe' },
  { text: 'Severe ALAD: early, aggressive respiratory support should be considered, including ECMO (reached consensus).', nodeId: 'tpe-lung-severe' },
  { text: 'New or increased oxygen need, or respiratory admission, is severe ALAD whatever the spirometry (reached consensus).', nodeId: 'tpe-lung' },
  { text: 'Every ALAD: history and exam, blood count, immunosuppressant level, donor-specific antibody, chest X-ray; CT and bronchoscopy for moderate or severe (all reached consensus).', nodeId: 'tpe-lung-eval' },
  { text: 'Rejection and infection can coexist; ALAD may develop in a patient with CLAD; pulmonary embolism should be considered (not voted).', nodeId: 'tpe-lung-ddx' },
  { text: 'For possible alloimmune ALAD, pulse steroids, IVIg, lymphocyte-depleting agents or plasma exchange may be considered (reached consensus), no doses (call the transplant team first).', nodeId: 'tpe-lung-team' },
];

export const NODES: DecisionNode[] = [
  // HUB. Claims C1-C16 (+ shared Editor note, HIGH STAKES). Detail: tpe-lung-definitions, tpe-lung-consensus-scores.
  {
    id: 'tpe-lung',
    type: 'question',
    module: 0,
    title: 'Lung transplant recipient: acute respiratory decline',
    safetyLevel: 'critical',
    summary: 'Lung recipients (ISHLT consensus): new or increased oxygen need, or respiratory admission, is severe ALAD; without spirometry, symptoms, exam findings or ground-glass opacities in context can also define ALAD.',
    body: [
      '**Acute lung allograft dysfunction (ALAD), reached consensus:** a fall in FEV1 of 10% or more from the highest value in the preceding 3 to 6 months (6-month window: votes widely spread); if spirometry is not available or feasible, a new or increased oxygen requirement. **Barely reached consensus, without spirometry:** concerning respiratory symptoms and exam findings (votes widely spread); ground-glass opacities in context. [1]',
      '',
      '**Severe ALAD, reached consensus:** a new or increased oxygen requirement or a need for respiratory hospitalization, whatever the spirometry. **Rapidly progressive, reached consensus:** a further 10% FEV1 fall or hospitalization within 30 days; high risk of death. [1]',
      '',
      'Reached consensus: ALAD may develop in a patient with CLAD with stable FEV1; not assessed in the first 72 hours after transplant. [1]',
      '',
      '**Labels:** the pass mark is each document\'s own; "barely" and "votes widely spread" (SD 1.7 or more) are the editor\'s; "did not reach consensus" means the panel did not agree to the statement, not that it agreed the opposite. [Scores](#/info/tpe-lung-consensus-scores); [definitions](#/info/tpe-lung-definitions).',
      '',
      'Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.',
    ].join('\n'),
    options: [
      { label: 'Declining too fast for a full work-up, or rapidly progressive', description: 'Empiric treatment before testing', next: 'tpe-lung-unstable', urgency: 'critical' },
      { label: 'Severe decline: new or increased oxygen need, or respiratory admission', description: 'Antibiotics, respiratory support, ECMO', next: 'tpe-lung-severe', urgency: 'critical' },
      { label: 'Evaluation: what to send and image', description: 'History, blood tests, chest imaging, bronchoscopy', next: 'tpe-lung-eval' },
      { label: 'Differential: what else could it be, including known CLAD', description: 'Causes coexist', next: 'tpe-lung-ddx' },
      { label: 'What happens next: specialist care', description: 'Rejection options, antifungal prophylaxis', next: 'tpe-lung-team' },
    ],
    citation: [1],
  },

  // C52-C58, C62-C63, C65-C67. Detail: tpe-lung-first-actions, tpe-lung-other-consults.
  {
    id: 'tpe-lung-unstable',
    type: 'info',
    module: 0,
    title: 'Declining too fast for a full work-up',
    safetyLevel: 'critical',
    summary: 'Lung recipients, ALAD (ISHLT): empiric treatment may start before testing (reached consensus). Severe ALAD: empiric broad-spectrum antibiotics should be initiated (reached consensus).',
    body: [
      '**Empiric treatment may be started before diagnostic testing** (reached consensus; votes widely spread). In rapidly progressive ALAD several causes may be at work, and delay may mean the graft does not recover or the patient dies. [1]',
      '',
      '**Rapidly progressive ALAD:** augmentation of immunosuppression to treat rejection should be initiated without delay for testing (barely reached consensus) (call the transplant team first). [1]',
      '',
      'Bronchoscopy may be too risky on a ventilator or ECMO; empiric treatment is considered instead. [1]',
      '',
      '**Empiric cover:** choice is guided by local surveillance and infection history, with particular consideration for resistant organisms such as Staphylococcus aureus and Pseudomonas aeruginosa. Empiric therapy can be challenging or even contraindicated because of fungal colonization and multidrug-resistant organisms. [1]',
      '',
      'Not in the documents: a drug or a dose. Nearest fact: the choice depends on local surveillance and the patient\'s infection history. [1]',
      '',
      'App content: the Pneumonia and Sepsis consults are general consults with no transplant branch.',
      '',
      'Related consults: [Sepsis](#/tree/sepsis) (infection bundle), [Pneumonia](#/tree/pneumonia) (infection bundle); [detail](#/info/tpe-lung-first-actions), [other consults](#/info/tpe-lung-other-consults).',
    ].join('\n'),
    next: 'tpe-lung-dispo',
    calculatorLinks: [
      { id: 'sepsis', label: 'Sepsis consult (general; no transplant branch)', kind: 'tree', node: 'sepsis-start' },
      { id: 'pneumonia', label: 'Pneumonia consult (general; no transplant branch)', kind: 'tree', node: 'pna-start' },
    ],
    citation: [1],
  },

  // C56-C61, C64, C66, C59. Detail: tpe-lung-first-actions, tpe-lung-other-consults.
  {
    id: 'tpe-lung-severe',
    type: 'info',
    module: 0,
    title: 'Severe decline: antibiotics, respiratory support, ECMO',
    safetyLevel: 'critical',
    summary: 'Lung recipients, severe ALAD (ISHLT consensus): empiric antibiotics should be initiated; early respiratory support should be considered; augmenting immunosuppression should be considered in parallel (call the transplant team first).',
    body: [
      '**Severe ALAD, reached consensus:** early, aggressive respiratory support should be considered, including ECMO, which the text limits to carefully selected individuals. Empiric broad-spectrum antibiotics should be initiated (votes widely spread). [1]',
      '',
      'Augmentation of immunosuppression should be considered in parallel with antimicrobials (reached consensus) (call the transplant team first). [1]',
      '',
      '**Moderate ALAD:** empiric antibiotics barely reached consensus (votes widely spread). **Mild ALAD:** did not reach consensus. [1]',
      '',
      'Not in the documents: ventilator settings or oxygen targets. Nearest fact: lung-protective ventilation is extrapolated from critical care and primary graft dysfunction literature. [1]',
      '',
      'App content: the ECMO consult lists "not a transplant candidate" as an absolute and "severe immunosuppression" as a relative VV contraindication and has no branch for existing recipients.',
      '',
      'Related consults: [High-Flow Nasal Cannula](#/tree/hfnc) (oxygen), [ARDS](#/tree/ards) (ventilation), [ECMO](#/tree/ecmo) (candidacy); [detail](#/info/tpe-lung-first-actions).',
    ].join('\n'),
    next: 'tpe-lung-dispo',
    calculatorLinks: [
      { id: 'hfnc', label: 'High-Flow Nasal Cannula consult', kind: 'tree', node: 'hfnc-start' },
      { id: 'ards', label: 'ARDS consult (lung-protective ventilation)', kind: 'tree', node: 'ards-start' },
      { id: 'ecmo', label: 'ECMO consult (general; no transplant-recipient branch)', kind: 'tree', node: 'ecmo-start' },
    ],
    citation: [1],
  },

  // C17-C32. Detail: tpe-lung-evaluation.
  {
    id: 'tpe-lung-eval',
    type: 'info',
    module: 0,
    title: 'ALAD evaluation: what the consensus says to do',
    summary: 'Lung recipients (ISHLT consensus): every ALAD gets history, exam, blood count, immunosuppressant level, antibody and chest X-ray; moderate or severe adds CT and bronchoscopy (all reached consensus).',
    body: [
      '**Every ALAD, reached consensus:** history and exam; blood count with differential and immunosuppressive drug level; HLA donor-specific antibody; chest X-ray. [1]',
      '',
      '**Moderate or severe ALAD, reached consensus:** CT chest and bronchoscopy; transbronchial biopsy with adequate sampling (votes widely spread). Biopsy risks bleeding and pneumothorax; a negative biopsy does not exclude rejection. Whether mild ALAD needs CT or bronchoscopy did not reach consensus. [1]',
      '',
      '**Blood work, to consider:** quantitative CMV PCR. **Also to consider:** respiratory virus testing in most cases. [1]',
      '',
      '**Suspected invasive aspergillosis (IDSA 2016):** CT chest whenever there is clinical suspicion, whatever the chest X-ray shows (IDSA grade: strong recommendation, high-quality evidence); bronchoscopy with BAL (IDSA grade: strong recommendation, moderate-quality evidence). [7]',
      '',
      'Not in the documents: a timing rule beyond naming trough levels, or who performs bronchoscopy and biopsy. Nearest fact: the drug level is part of the consensus blood work; the text names current trough levels. [1]',
      '',
      'Related consults: [Pneumothorax](#/tree/pneumothorax) (biopsy complication); [detail](#/info/tpe-lung-evaluation).',
      '',
      'Editor note: write down the time of the last immunosuppressant dose next to the level.',
      'Editor note: arrange bronchoscopy and biopsy with the transplant team.',
    ].join('\n'),
    next: 'tpe-lung-dispo',
    citation: [1, 7],
  },

  // C33-C46, C45. Detail: tpe-lung-differential, tpe-lung-definitions (CLAD).
  {
    id: 'tpe-lung-ddx',
    type: 'info',
    module: 0,
    title: 'What else could it be: causes coexist',
    summary: 'Lung recipients (ISHLT consensus): rejection and infection can coexist, ALAD may develop in CLAD (reached consensus); consider pulmonary embolism (not voted); treat a cause when found.',
    body: [
      '**Causes coexist, reached consensus:** alloimmune and non-alloimmune ALAD can occur at the same time; AMR can coexist with acute cellular rejection and infection; ALAD may develop in a patient with CLAD with stable FEV1. [1][2]',
      '',
      '**Causes the consensus lists, reached consensus:** acute cellular and antibody-mediated rejection, infection, aspiration, airway complications, and (votes widely spread) fluid overload, pleural effusion and pneumothorax. [1]',
      '',
      '**Treat a cause when found:** diuresis for volume overload, thoracentesis for effusion. [1]',
      '',
      '**Pulmonary embolism** should be considered (not voted). Lung recipients have the highest risk of invasive aspergillosis among solid-organ recipients (IDSA 2016). Perivascular mononuclear infiltrates on biopsy are not specific for acute rejection; CMV, Pneumocystis and PTLD can mimic it. [1][5][7]',
      '',
      'Not in the documents: an ACR-specific presentation, a pulmonary embolism work-up for recipients, or management of airway complications. Nearest facts: the first features of ALAD are often non-specific; airway complications can cause allograft dysfunction, inflammation, rejection and predisposition to infections. [1]',
      '',
      'Related consults: [Shortness of Breath hub](#/tree/dyspnea-hub) (PE rule-out), [PE Treatment](#/tree/pe-treatment) (PE therapy), [Pneumothorax](#/tree/pneumothorax) (air); [differential](#/info/tpe-lung-differential), [definitions](#/info/tpe-lung-definitions).',
    ].join('\n'),
    next: 'tpe-lung-dispo',
    calculatorLinks: [
      { id: 'dyspnea-hub', label: 'Pulmonary embolism rule-in and rule-out (general Shortness of Breath hub)', kind: 'tree', node: 'dysp-pe-entry' },
      { id: 'pe-treatment', label: 'PE Treatment (general consult)', kind: 'tree', node: 'pe-start' },
      { id: 'pneumothorax', label: 'Pneumothorax consult', kind: 'tree', node: 'pneumothorax-start' },
    ],
    citation: [1, 2, 5, 7],
  },

  // C70-C75. Detail: tpe-lung-specialist-care.
  {
    id: 'tpe-lung-team',
    type: 'info',
    module: 0,
    title: 'What happens next: specialist care the consensus names',
    summary: 'Lung recipients, possible alloimmune ALAD (ISHLT): pulse steroids, IVIg, lymphocyte-depleting agents or plasma exchange may be considered (reached consensus), no doses (call the transplant team first).',
    body: [
      'For possible alloimmune ALAD, pulse steroids, IVIg, lymphocyte-depleting agents or plasma exchange may be considered (reached consensus), chosen by local availability, severity and patient factors (call the transplant team first). Bronchoscopy with BAL and biopsy seeks at least five evaluable fragments. [1]',
      '',
      '**AMR with allograft dysfunction** should always be treated with multiple drugs or interventions (reached consensus). [2]',
      '',
      'Patients on augmented immunosuppression should be monitored closely for secondary opportunistic infections (reached consensus). [1]',
      '',
      '**Antifungal prophylaxis:** IDSA 2016 recommends restarting it in lung recipients given augmented immunosuppression with thymoglobulin, alemtuzumab or high-dose corticosteroids (IDSA grade: strong recommendation, moderate-quality evidence). IDSA 2026 makes no recommendation for or against universal or targeted prophylaxis (IDSA: knowledge gap) and does not say the 2016 statement is withdrawn. [7][8]',
      '',
      'Retransplantation could be considered for selected patients with severe ALAD (reached consensus; votes widely spread), with considerable caution. [1]',
      '',
      'Not in the documents: doses for any rejection treatment, or a specific AMR regimen. Nearest fact: there have been no randomized-controlled trials, systematic reviews, or head-to-head comparisons of different AMR treatments. [2]',
      '',
      'Related consults: [ECMO](#/tree/ecmo) (candidacy), [Sepsis](#/tree/sepsis) (infection bundle); [detail](#/info/tpe-lung-specialist-care).',
    ].join('\n'),
    next: 'tpe-lung-dispo',
    citation: [1, 2, 7, 8],
  },

  // C76-C77. Disposition (final node).
  {
    id: 'tpe-lung-dispo',
    type: 'result',
    module: 0,
    title: 'Disposition',
    safetyLevel: 'warning',
    confidence: 'recommended',
    summary: 'Lung recipients (ISHLT consensus): not in the documents, an ED disposition rule. Severe ALAD includes a need for respiratory hospitalization (reached consensus); rapidly progressive ALAD carries high risk of death.',
    body: [
      '**Not in the documents:** an ED disposition rule (who to admit, observe or discharge). Nearest facts: severe ALAD includes a need for respiratory hospitalization; a need for hospitalization within 30 days of onset marks rapidly progressive ALAD, which carries a high risk of death (all reached consensus). [1]',
      '',
      'Related consults: [ECMO](#/tree/ecmo) (candidacy), [ARDS](#/tree/ards) (ventilation), [Sepsis](#/tree/sepsis) (infection bundle).',
      '',
      'Editor note: disposition is decided with the treating transplant team.',
    ].join('\n'),
    recommendation: '**Severe ALAD (new or increased oxygen need or respiratory admission): empiric broad-spectrum antibiotics should be initiated (votes widely spread) and early respiratory support should be considered (both reached consensus). For moderate ALAD the panel barely reached consensus on empiric antibiotics (votes widely spread) and for mild ALAD it did not reach consensus. The sources give no dose for any rejection treatment and no ED disposition rule.** Editor note: disposition is decided with the treating transplant team.',
    calculatorLinks: [
      { id: 'ecmo', label: 'ECMO consult (general; no transplant-recipient branch)', kind: 'tree', node: 'ecmo-start' },
      { id: 'ards', label: 'ARDS consult (lung-protective ventilation)', kind: 'tree', node: 'ards-start' },
      { id: 'sepsis', label: 'Sepsis consult (general; no transplant branch)', kind: 'tree', node: 'sepsis-start' },
    ],
    citation: [1],
  },
];

export const CITATIONS: Citation[] = [
  { num: 1, text: 'Juvet S, et al. ISHLT Consensus Statement on Acute Lung Allograft Dysfunction (ALAD): definition, etiology, diagnostic and therapeutic approaches, and research priorities. J Heart Lung Transplant 2026. doi:10.1016/j.healun.2026.02.1677. In press: the copy reviewed is the "Article in press" proof, which prints no volume or page numbers. Delphi consensus; items are cited by Box item number (Boxes 1-4) with printed mean \u00B1 SD (see the consensus scores page).' },
  { num: 2, text: 'Calabrese F, Levine DJ, Adam BA, et al. ISHLT scientific statement on pulmonary antibody-mediated rejection and the proposed GAP (Graft, Antibody, Pathology) definition. J Heart Lung Transplant 2026. doi:10.1016/j.healun.2026.04.019. In press: the copy reviewed is the "Article in press" proof; supplementary tables not reviewed.' },
  { num: 5, text: 'Stewart S, et al. Revision of the 1996 working formulation for the standardization of nomenclature in the diagnosis of lung rejection. J Heart Lung Transplant 2007;26:1229-1242. doi:10.1016/j.healun.2007.10.017.' },
  { num: 7, text: 'Patterson TF, et al. Practice guidelines for the diagnosis and management of aspergillosis: 2016 update by the Infectious Diseases Society of America. Clin Infect Dis 2016. doi:10.1093/cid/ciw326. Volume and pages not confirmed from the saved web page.' },
  { num: 8, text: 'Schuster MG, Morrissey CO, et al. 2026 IDSA clinical practice guideline update on the prevention of invasive aspergillosis in adult solid organ transplant recipients. Infectious Diseases Society of America; published 2026-06-26, updated 2026-07-06. https://www.idsociety.org/practice-guideline/2026-idsa-clinical-practice-guidelines-on-prevention-of-invasive-aspergillosis-in-adult-solid-organ-transplant-recipients/ (no DOI captured).' },
];
