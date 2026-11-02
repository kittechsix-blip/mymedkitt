// MedKitt: Staphylococcal Toxic Shock Syndrome Consult
// Recognition → Rule out strep/NSTI and mimics → Source control → Resuscitation → Antibiotics → Refractory shock (IVIG) → Disposition
// 7 modules. Doses live in drug entries; criteria, tables and checklists live in info pages.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const STAPH_TSS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'staph-tss-start',
    type: 'info',
    module: 1,
    title: 'Staph TSS: Recognition',
    body: '[Staph TSS Steps Summary](#/info/staph-tss-summary): stepwise approach.\n\n**Toxic shock syndrome is shock caused by a toxin, not by the bacteria themselves.** *S. aureus* strains that make TSST-1 or enterotoxins act as **superantigens**: they switch on a huge share of T cells at once, and the resulting cytokine storm causes fever, rash, capillary leak and organ failure.\n\n**Suspect it when fever + a diffuse "sunburn" rash + hypotension appear together**, especially with:\n• **Menstrual source:** tampon, menstrual cup, contraceptive sponge or diaphragm.\n• **Non-menstrual source:** post-op wound, nasal packing, burn, postpartum or post-abortion infection, abscess or IV drug use, staph superinfection after influenza.\n\n**DO-NOT-MISS:**\n• **Early TSS looks like a viral illness** (fever, vomiting, diarrhea, myalgia). The rash can be faint and the wound can look clean.\n• **Find and remove the source now.** It is the highest-yield step.',
    citation: [1, 2, 3, 4, 17],
    next: 'staph-tss-criteria',
    summary: 'Fever + diffuse erythroderma + hypotension; look for a tampon, packing or wound',
    safetyLevel: 'critical',
  },

  {
    id: 'staph-tss-criteria',
    type: 'info',
    module: 1,
    title: 'CDC Case Definition',
    body: 'The [CDC 2011 case definition](#/info/staph-tss-cdc-criteria) uses 5 clinical criteria (fever, rash, desquamation, hypotension, 3 or more organ systems) plus negative cultures and serologies.\n\n**It is a surveillance tool, not a treatment gate.** Desquamation is a late sign, so most ED patients can only reach "probable." Not meeting the definition never means withholding treatment.\n\n**Send:** blood cultures, cultures from the device or site (vaginal, wound, nasal), CBC, CMP with LFTs, CK, lactate, coags, urinalysis, and a pregnancy test.',
    calculatorLinks: [{ id: 'staph-tss-cdc', label: 'CDC Case-Definition Checker' }],
    citation: [1, 2],
    next: 'staph-tss-differential',
    summary: 'CDC definition is for surveillance; treat on suspicion; culture the source',
  },

  // =====================================================================
  // MODULE 2: STREP, NSTI AND MIMICS
  // =====================================================================

  {
    id: 'staph-tss-differential',
    type: 'question',
    module: 2,
    title: 'Does Anything Point Elsewhere?',
    body: 'Two questions change management now: **is this streptococcal TSS from a necrotizing soft-tissue infection**, and **is this a mimic that needs a different empiric drug?**\n\n[Staph vs strep TSS](#/info/staph-tss-vs-strep) · [Mimics and differential](#/info/staph-tss-mimics)',
    options: [
      { label: 'Pain out of proportion, swelling, bullae, crepitus or rapidly spreading skin', description: 'Suggests strep TSS with necrotizing infection', next: 'staph-tss-nsti', urgency: 'critical' },
      { label: 'Petechiae or purpura, tick exposure, meningism, or no clear source', description: 'Keep RMSF, meningococcemia and other mimics on the list', next: 'staph-tss-mimic-cover', urgency: 'urgent' },
      { label: 'Fits staph TSS (device, packing, wound, postpartum)', next: 'staph-tss-source' },
    ],
    citation: [3, 4, 5],
    summary: 'Pain out of proportion = strep/NSTI; petechiae or ticks = cover mimics',
  },

  {
    id: 'staph-tss-nsti',
    type: 'info',
    module: 2,
    title: 'Possible Necrotizing Infection',
    body: '**Pain out of proportion to the exam is the classic clue to streptococcal TSS with necrotizing fasciitis**, which is far more lethal than staph TSS and needs the operating room, not imaging.\n\n• **Emergent surgical consult** for exploration and debridement.\n• The empiric antibiotic regimen in this consult already covers group A strep.\n• Run the [Necrotizing Fasciitis consult](#/tree/necrotizing-fasciitis) in parallel.',
    citation: [3, 5],
    next: 'staph-tss-source',
    summary: 'Emergent surgery; run the NSTI consult in parallel',
    safetyLevel: 'critical',
  },

  {
    id: 'staph-tss-mimic-cover',
    type: 'info',
    module: 2,
    title: 'Cover the Dangerous Mimics',
    body: 'When the picture is not clean, treat the mimics you cannot yet exclude while you keep the TSS pathway going:\n\n• **RMSF possible** (tick exposure, petechial rash on wrists or ankles, endemic area): add empiric doxycycline; do not wait for serology.\n• **Meningococcemia possible** (purpura, meningism): the empiric regimen must include meningitic coverage; see [Meningitis](#/tree/meningitis).\n\nFull list with distinguishing features: [Mimics and differential](#/info/staph-tss-mimics).',
    citation: [4, 15],
    next: 'staph-tss-source',
    summary: 'Add doxycycline if RMSF possible; meningitic coverage if purpura or meningism',
  },

  // =====================================================================
  // MODULE 3: SOURCE CONTROL
  // =====================================================================

  {
    id: 'staph-tss-source',
    type: 'info',
    module: 3,
    title: 'Source Control First',
    body: '**Remove the toxin factory.** Antibiotics do not clear toxin that is still being made in a retained tampon, cup, packing or undrained wound.\n\n• **Menstrual:** speculum exam in every case, even if the patient says the tampon is out. Remove tampons, fragments, cups, sponges and diaphragms; culture the vaginal vault.\n• **Nasal packing:** remove and culture.\n• **Surgical or traumatic wound:** open and explore it, even if it looks clean; drain any collection.\n• **Abscess, burn or postpartum source:** drain or debride; involve surgery or OB early.\n\n[Source control checklist](#/info/staph-tss-source-control)',
    citation: [2, 3, 4],
    next: 'staph-tss-resus',
    summary: 'Speculum exam always; remove device or packing; open the wound even if bland',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: RESUSCITATION
  // =====================================================================

  {
    id: 'staph-tss-resus',
    type: 'info',
    module: 4,
    title: 'Resuscitation',
    body: 'Manage the shock as septic shock per the Surviving Sepsis Campaign: see [Sepsis](#/tree/sepsis).\n\n• **Crystalloid:** at least 30 mL/kg IV in the first 3 hours (balanced crystalloid preferred), then give more only if the patient is still fluid responsive. Capillary leak is severe, so reassess often for pulmonary edema.\n• **Vasopressor:** [Norepinephrine](#/drug/norepinephrine/septic-shock) first line, target MAP 65 mmHg or higher. Peripheral start is acceptable while access is obtained.\n• **Rising norepinephrine dose:** add [Vasopressin](#/drug/vasopressin/septic-shock) rather than escalating norepinephrine further.\n• **Ongoing vasopressor need:** [Hydrocortisone](#/drug/hydrocortisone/septic-shock) (stress dose).\n• Guide with lactate, capillary refill and urine output.',
    citation: [7],
    next: 'staph-tss-peds',
    summary: '30 mL/kg crystalloid, norepinephrine to MAP 65, vasopressin, then hydrocortisone',
    safetyLevel: 'critical',
  },

  {
    id: 'staph-tss-peds',
    type: 'info',
    module: 4,
    title: 'Children',
    body: '• **Hypotension** in the case definition means SBP below the 5th percentile for age in children under 16 (rough guide, ages 1 to 10: SBP under 70 + 2 × age in years).\n• **Common sources:** burns (even small ones), wounds, skin infections, nasal packing; menstrual TSS in adolescents.\n• **Fluids:** 10 to 20 mL/kg boluses, reassessing after each (up to 40 to 60 mL/kg in the first hour where ICU care is available). Epinephrine or norepinephrine for fluid-refractory shock.\n• **Antibiotics:** use the pediatric weight-based cards in each drug entry; tap any drug in [Antibiotic regimens](#/info/staph-tss-antibiotics).',
    citation: [1, 8, 14, 16],
    next: 'staph-tss-abx-empiric',
    summary: 'SBP <5th percentile; 10-20 mL/kg boluses; weight-based drug cards',
    skippable: true,
  },

  // =====================================================================
  // MODULE 5: ANTIBIOTICS
  // =====================================================================

  {
    id: 'staph-tss-abx-empiric',
    type: 'info',
    module: 5,
    title: 'Empiric Antibiotics',
    body: 'Start within 1 hour, after cultures if they do not delay the first dose. **Two jobs: kill the bacteria and switch off toxin production.**\n\n• **MRSA coverage:** [Vancomycin](#/drug/vancomycin/sepsis)\n• **PLUS toxin suppression:** [Clindamycin](#/drug/clindamycin/toxic-shock). It blocks toxin production at the ribosome, which cell-wall drugs alone do not do.\n• **Alternative:** [Linezolid](#/drug/linezolid/toxic-shock) covers MRSA and also suppresses toxin. Use one anti-MRSA drug, not both.\n• **Source unclear or abdominal/pelvic/necrotizing possible:** add broad gram-negative cover, [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/sepsis) or [Meropenem](#/drug/meropenem/sepsis) per the sepsis pathway.\n\n[Antibiotic regimens](#/info/staph-tss-antibiotics)',
    citation: [3, 5, 6, 7, 9],
    next: 'staph-tss-abx-narrow',
    summary: 'Vancomycin + clindamycin (or linezolid) ± pip-tazo within 1 hour',
    safetyLevel: 'critical',
  },

  {
    id: 'staph-tss-abx-narrow',
    type: 'question',
    module: 5,
    title: 'Cultures Back: Narrow',
    body: 'Blood cultures are **usually negative** in staph TSS; the organism usually grows from the site or device ([staph vs strep](#/info/staph-tss-vs-strep)). Keep clindamycin (or linezolid) on board whichever path you take.\n\nWhat grew?',
    options: [
      { label: 'MSSA', next: 'staph-tss-mssa' },
      { label: 'MRSA', next: 'staph-tss-mrsa' },
      { label: 'No organism (cultures negative)', next: 'staph-tss-culture-neg' },
    ],
    citation: [3, 4],
    summary: 'Blood cultures usually negative; narrow on the site culture',
  },

  {
    id: 'staph-tss-mssa',
    type: 'info',
    module: 5,
    title: 'MSSA',
    body: '**Switch to a beta-lactam:** [Nafcillin](#/drug/nafcillin/toxic-shock) (or oxacillin) or [Cefazolin](#/drug/cefazolin/toxic-shock), **plus** [Clindamycin](#/drug/clindamycin/toxic-shock). Beta-lactams kill MSSA better than vancomycin.\n\nStop vancomycin. Stop gram-negative cover if no second source is found.',
    citation: [5, 6],
    next: 'staph-tss-duration',
    summary: 'Nafcillin/oxacillin or cefazolin + clindamycin; stop vancomycin',
  },

  {
    id: 'staph-tss-mrsa',
    type: 'info',
    module: 5,
    title: 'MRSA',
    body: '**Continue** [Vancomycin](#/drug/vancomycin/sepsis) **plus** [Clindamycin](#/drug/clindamycin/toxic-shock), or use [Linezolid](#/drug/linezolid/toxic-shock).\n\nAsk the lab for a **D-test**: inducible clindamycin resistance is common in MRSA. If clindamycin-resistant, linezolid is the toxin-suppressing option.',
    citation: [5, 6, 9],
    next: 'staph-tss-duration',
    summary: 'Vancomycin + clindamycin or linezolid; check D-test',
  },

  {
    id: 'staph-tss-culture-neg',
    type: 'info',
    module: 5,
    title: 'Cultures Negative',
    body: 'Common in menstrual TSS, which is driven by toxin from colonizing staph rather than invasive infection. Cultures may also be negative if antibiotics came first.\n\nKeep anti-staphylococcal therapy plus clindamycin if the picture still fits. Stop gram-negative cover once another source is excluded. Involve **infectious diseases** for the regimen and duration.',
    citation: [3, 4, 10],
    next: 'staph-tss-duration',
    summary: 'Usual in menstrual TSS; continue anti-staph + clindamycin; ID consult',
  },

  {
    id: 'staph-tss-duration',
    type: 'info',
    module: 5,
    title: 'How Long',
    body: '• **Clindamycin (or linezolid as the anti-toxin):** until hemodynamically stable and no further debridement is planned, often about 48 to 72 hours.\n• **Total course:** typically 10 to 14 days (expert opinion; no trials).\n• **S. aureus in the blood:** manage as S. aureus bacteremia: ID consult, repeat blood cultures until negative, echocardiography, and at least 14 days of IV therapy (4 to 6 weeks if complicated). See [Infective Endocarditis](#/tree/infectious-endocarditis).',
    citation: [3, 4, 6],
    next: 'staph-tss-refractory',
    summary: 'Clindamycin until stable (~48-72 h); total 10-14 days; longer if bacteremic',
  },

  // =====================================================================
  // MODULE 6: REFRACTORY SHOCK
  // =====================================================================

  {
    id: 'staph-tss-refractory',
    type: 'question',
    module: 6,
    title: 'Still in Shock?',
    body: 'Is the patient still in shock **despite** source control, adequate fluids, vasopressors and antitoxin antibiotics?\n\nBefore escalating, re-check for a missed source: retained tampon fragment, undrained collection, or a necrotizing infection that needs the OR.',
    options: [
      { label: 'Yes: refractory shock', next: 'staph-tss-ivig', urgency: 'critical' },
      { label: 'No: improving', next: 'staph-tss-dispo' },
    ],
    citation: [3, 4],
    summary: 'Refractory despite everything? Re-look for the source, then consider IVIG',
  },

  {
    id: 'staph-tss-ivig',
    type: 'result',
    module: 6,
    title: 'Consider IVIG',
    body: '[IVIG](#/drug/ivig/toxic-shock) contains antibodies that can neutralize superantigen toxins. **Consider it only in refractory shock, with infectious diseases input.**\n\n**The evidence for staph TSS is weak.** Almost all IVIG data come from **streptococcal** TSS (one small RCT stopped early and observational studies). For staph TSS there are only case series in which IVIG was given alongside clindamycin, so its own effect cannot be separated. It is costly, can be in short supply, and carries risks (thrombosis, kidney injury, hemolysis, volume load).\n\nThen: [Disposition](#/node/staph-tss-dispo).',
    recommendation: 'In staphylococcal TSS with shock that persists despite source control, fluids, vasopressors and antitoxin antibiotics, IVIG may be considered as an adjunct after discussion with infectious diseases. Staph-specific evidence is low certainty and largely extrapolated from streptococcal TSS; it is not routine first-line therapy.',
    confidence: 'consider',
    citation: [3, 4, 11, 12, 13, 14],
    summary: 'Refractory shock only, with ID; staph evidence is weak and mostly from strep data',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'staph-tss-dispo',
    type: 'result',
    module: 7,
    title: 'Disposition',
    body: '• **Admit to the ICU** for shock or organ dysfunction; most patients with TSS need it.\n• **Report** to public health: TSS (other than streptococcal) is nationally notifiable.\n• **Recurrence:** menstrual TSS can recur because many patients do not form protective antibody to TSST-1. Advise against tampons and menstrual cups at least until reviewed by ID or gynecology.\n• **Follow-up:** warn that the palms and soles will peel in 1 to 2 weeks; nail and hair loss can follow weeks later.',
    recommendation: 'ICU admission for shock. Notify public health. Counsel menstrual TSS patients on recurrence risk and to avoid tampons and menstrual cups until reviewed. Arrange follow-up for desquamation and to confirm completion of the antibiotic course.',
    confidence: 'recommended',
    citation: [1, 3, 10],
    summary: 'ICU; report to public health; counsel on recurrence; expect peeling at 1-2 weeks',
  },
];

export const STAPH_TSS_MODULE_LABELS = [
  'Recognition',
  'Strep, NSTI & Mimics',
  'Source Control',
  'Resuscitation',
  'Antibiotics',
  'Refractory Shock',
  'Disposition',
];

export const STAPH_TSS_CITATIONS: Citation[] = [
  { num: 1, text: 'Centers for Disease Control and Prevention. Toxic Shock Syndrome (Other Than Streptococcal) (TSS) 2011 Case Definition. National Notifiable Diseases Surveillance System (NNDSS). https://ndc.services.cdc.gov/case-definitions/toxic-shock-syndrome-2011/' },
  { num: 2, text: 'Gottlieb M, Long B, Koyfman A. The evaluation and management of toxic shock syndrome in the emergency department: a review of the literature. J Emerg Med. 2018;54(6):807-814.' },
  { num: 3, text: 'Lappin E, Ferguson AJ. Gram-positive toxic shock syndromes. Lancet Infect Dis. 2009;9(5):281-290.' },
  { num: 4, text: 'Atchade E, et al. Toxic shock syndrome: a literature review. Antibiotics (Basel). 2024;13(1):96.' },
  { num: 5, text: 'Stevens DL, Bisno AL, Chambers HF, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis. 2014;59(2):e10-e52.' },
  { num: 6, text: 'Liu C, Bayer A, Cosgrove SE, et al. Clinical practice guidelines by the Infectious Diseases Society of America for the treatment of methicillin-resistant Staphylococcus aureus infections in adults and children. Clin Infect Dis. 2011;52(3):e18-e55.' },
  { num: 7, text: 'Evans L, Rhodes A, Alhazzani W, et al. Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.' },
  { num: 8, text: 'Weiss SL, Peters MJ, Alhazzani W, et al. Surviving Sepsis Campaign international guidelines for the management of septic shock and sepsis-associated organ dysfunction in children. Pediatr Crit Care Med. 2020;21(2):e52-e106.' },
  { num: 9, text: 'Stevens DL, Ma Y, Salmi DB, McIndoo E, Wallace RJ, Bryant AE. Impact of antibiotics on expression of virulence-associated exotoxin genes in methicillin-sensitive and methicillin-resistant Staphylococcus aureus. J Infect Dis. 2007;195(2):202-211.' },
  { num: 10, text: 'Schlievert PM, Davis CC. Device-associated menstrual toxic shock syndrome. Clin Microbiol Rev. 2020;33(3):e00032-19.' },
  { num: 11, text: 'Kaul R, McGeer A, Norrby-Teglund A, et al. Intravenous immunoglobulin therapy for streptococcal toxic shock syndrome: a comparative observational study. Clin Infect Dis. 1999;28(4):800-807.' },
  { num: 12, text: 'Darenberg J, Ihendyane N, Sjölin J, et al. Intravenous immunoglobulin G therapy in streptococcal toxic shock syndrome: a European randomized, double-blind, placebo-controlled trial. Clin Infect Dis. 2003;37(3):333-340.' },
  { num: 13, text: 'Parks T, Wilson C, Curtis N, Norrby-Teglund A, Sriskandan S. Polyspecific intravenous immunoglobulin in clindamycin-treated patients with streptococcal toxic shock syndrome: a systematic review and meta-analysis. Clin Infect Dis. 2018;67(9):1434-1436.' },
  { num: 14, text: 'Chen KYH, Cheung M, Burgner DP, Curtis N. Toxic shock syndrome in Australian children. Arch Dis Child. 2016;101(8):736-740.' },
  { num: 15, text: 'Biggs HM, Behravesh CB, Bradley KK, et al. Diagnosis and management of tickborne rickettsial diseases: Rocky Mountain spotted fever and other spotted fever group rickettsioses, ehrlichioses, and anaplasmosis, United States. MMWR Recomm Rep. 2016;65(2):1-44.' },
  { num: 16, text: 'Topjian AA, Raymond TT, Atkins D, et al. Part 4: Pediatric basic and advanced life support: 2020 American Heart Association guidelines for cardiopulmonary resuscitation and emergency cardiovascular care. Circulation. 2020;142(16 Suppl 2):S469-S523.' },
  { num: 17, text: 'Mitchell MA, Bisch S, Arntfield S, Hosseini-Moghaddam SM. A confirmed case of toxic shock syndrome associated with the use of a menstrual cup. Can J Infect Dis Med Microbiol. 2015;26(4):218-220.' },
];

export const STAPH_TSS_CRITICAL_ACTIONS = [
  { text: 'Treat on suspicion: desquamation is late and the CDC definition is for surveillance, not a treatment gate', nodeId: 'staph-tss-criteria' },
  { text: 'Pain out of proportion suggests strep TSS with necrotizing infection: emergent surgical consult', nodeId: 'staph-tss-nsti' },
  { text: 'Source control first: speculum exam, remove tampon/cup/packing, open the wound even if it looks clean', nodeId: 'staph-tss-source' },
  { text: 'Fluids and norepinephrine to MAP 65 or higher per Surviving Sepsis Campaign', nodeId: 'staph-tss-resus' },
  { text: 'Empiric vancomycin PLUS clindamycin (or linezolid) for toxin suppression within 1 hour', nodeId: 'staph-tss-abx-empiric' },
  { text: 'MSSA: switch to nafcillin/oxacillin or cefazolin, keep clindamycin', nodeId: 'staph-tss-mssa' },
  { text: 'IVIG only for refractory shock with ID input: staph evidence is weak', nodeId: 'staph-tss-ivig' },
];

export const STAPH_TSS_NODE_COUNT = STAPH_TSS_NODES.length;
