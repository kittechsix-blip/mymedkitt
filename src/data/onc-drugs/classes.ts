import type { Cited, ClassEffect, DrugClass } from './types.js';

// Timing policy (provisional, pending the physician owner's ruling), revised 2026-11-18:
//  1. an organ-specific onset statement from a guideline where the research file has one (ASCO first, otherwise the guideline the file documents most completely);
//     the differing figure from another guideline goes in the effect's note, attributed by name;
//  2. ASCO's pooled organ-system median only as a fallback, worded as "events as a group";
//  3. ESMO class-specific figures sit on that class's effect (colitis, hypophysitis).
// The text before the first comma is the short badge the card shows. Fatal-event medians are not used. Display order comes from each toxicity's lethality (1 = most lethal).
const ASCO = 'asco-2021';
const ESMO = 'esmo-2022';
const SITC = 'sitc-2021';
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

const LATE = 'ASCO defines late events as onset more than 6 months after stopping treatment; consensus on that definition is still developing.';
const ENDO_ASCO = 'ASCO (endocrine events as a group): median 14.5 weeks, range 1.5-130 weeks.';

type Kind = 'pd1' | 'pdl1' | 'ctla4' | 'lag3';

function effects(kind: Kind): ClassEffect[] {
  const colitis: Record<Kind, { timing: Cited; note: Cited }> = {
    pd1: {
      timing: c('ESMO anti-PD-1 colitis: median 2-4 months', ESMO),
      note: c('ASCO: onset most often 5-10 weeks after initiation, and can occur or recur months after discontinuation. SITC: median 5-10 weeks. ESMO: the longest reported delay between stopping an anti-PD-1 drug and enterocolitis is 1 year.', ASCO, SITC, ESMO),
    },
    ctla4: {
      timing: c('ESMO anti-CTLA-4 colitis: median about 1 month', ESMO),
      note: c('ASCO: onset most often 5-10 weeks after initiation, and can occur or recur months after discontinuation. SITC: median 5-10 weeks. ESMO: the longest reported delay between stopping an anti-CTLA-4 drug and enterocolitis is 2 months.', ASCO, SITC, ESMO),
    },
    pdl1: {
      timing: c('ASCO colitis: most often 5-10 weeks', ASCO),
      note: c('ASCO: symptoms can occur or recur months after discontinuation. SITC: median 5-10 weeks. ESMO gives about 1 month for anti-CTLA-4 and 2-4 months for anti-PD-1 drugs, and no PD-L1 figure.', ASCO, SITC, ESMO),
    },
    lag3: {
      timing: c('ASCO colitis: most often 5-10 weeks', ASCO),
      note: c('ASCO: symptoms can occur or recur months after discontinuation. SITC: median 5-10 weeks. ESMO gives about 1 month for anti-CTLA-4 and 2-4 months for anti-PD-1 drugs, and no LAG-3 figure.', ASCO, SITC, ESMO),
    },
  };
  const hypophysitis: Record<Kind, Cited> = {
    pd1: c('ESMO anti-PD-1 monotherapy: median 6 months', ESMO),
    ctla4: c('ESMO CTLA-4 regimens: within 3-4 months', ESMO),
    pdl1: c('SITC: median 76 days from start to diagnosis', SITC),
    lag3: c('SITC: median 76 days from start to diagnosis', SITC),
  };
  const hypoNote: Record<Kind, string> = {
    pd1: 'SITC: median 76 days from start to diagnosis. ESMO: within the first 3-4 months with CTLA-4-containing regimens.',
    ctla4: 'SITC: median 76 days from start to diagnosis. ESMO: median 6 months with anti-PD-1 monotherapy.',
    pdl1: 'ESMO: median 6 months with anti-PD-1 monotherapy and within the first 3-4 months with CTLA-4-containing regimens; no PD-L1 figure.',
    lag3: 'ESMO: median 6 months with anti-PD-1 monotherapy and within the first 3-4 months with CTLA-4-containing regimens; no LAG-3 figure.',
  };
  const list: ClassEffect[] = [
    { tox: 'myocarditis', timing: c('SITC myocarditis: median 34 days, after treatment start', SITC),
      note: c('ASCO (cardiovascular events as a group): median 6 weeks, range 2-54 weeks. ESMO: usually within the first four cycles, about a quarter later. ASCO cites a grade 2 myocarditis case 8 months after discontinuation as late onset.', ASCO, ESMO) },
    { tox: 'neurologic', timing: c('ASCO pooled neuro: median 4 weeks (range 1-68), all neurologic events as a group', ASCO),
      note: c(`ESMO: time to onset 6-13 weeks. SITC: usually within the first 3 months. ${LATE}`, ESMO, SITC, ASCO) },
    { tox: 'pneumonitis', timing: c('ASCO pneumonitis: median 34 wk (range 1.5-127)', ASCO),
      note: c('SITC: median 3 months. ASCO: about 2% of NSCLC or melanoma patients with immune-related toxicity develop chronic pneumonitis that persists after the inhibitor is stopped.', SITC, ASCO) },
    { tox: 'hepatitis', timing: c('ASCO hepatitis: mostly in first 6-12 weeks', ASCO),
      note: c('SITC: typically 1-15 weeks, and may occur after delays of months or years. ASCO (gastrointestinal events as a group): median 6 weeks, range 1-107.5 weeks.', SITC, ASCO) },
    { tox: 'colitis', ...colitis[kind] },
    { tox: 'myositis', timing: c('ESMO myositis: median 4 weeks of exposure, before onset', ESMO),
      note: c(`ASCO (musculoskeletal events as a group, pooling arthritis and polymyalgia rheumatica): median 38 weeks, range 1-127 weeks. ${LATE}`, ASCO) },
    { tox: 'hematologic', timing: c('ASCO pooled: median 5.7 weeks (range 1-84), all hematologic events as a group', ASCO),
      note: c('ASCO: a pharmacovigilance interrogation found hemolytic anemia followed by ITP the most common hematologic toxicities, with a median onset of 40 days (ASCO does not state whether this applies to all hematologic events). ESMO: median about 12 weeks with PD-(L)1 plus CTLA-4 and about 25 weeks with monotherapy. SITC: hemolytic anemia median 50 days, neutropenia 10.5 weeks, HLH median 26 days (more common with anti-CTLA-4).', ASCO, ESMO, SITC) },
    { tox: 'nephritis', timing: c('ASCO renal: median 14 weeks (range 6.5-21)', ASCO),
      note: c(`ESMO: median 3-4 months. ${LATE}`, ESMO, ASCO) },
    { tox: 'adrenal-insufficiency', timing: c('ESMO adrenal: median 4 months, range a few days to over 12 months', ESMO),
      note: c(`SITC: median 10 weeks from the first dose. ${ENDO_ASCO}`, SITC, ASCO) },
    { tox: 'hypophysitis', timing: hypophysitis[kind], note: c(`${hypoNote[kind]} ${ENDO_ASCO}`, SITC, ESMO, ASCO) },
    { tox: 'type1-diabetes', timing: c('ESMO diabetes: median 4.5 treatment cycles, after start', ESMO),
      note: c('ESMO: earlier with PD-(L)1 plus CTLA-4 (median 2.7 cycles). SITC: soon after the start of treatment and up to 1 year later.', ESMO, SITC) },
    { tox: 'severe-skin', timing: c('ASCO pooled skin: median 4 weeks (range 2-150), all skin events; no SJS/TEN-specific onset is given', ASCO),
      note: c('No guideline gives an onset window for SJS, TEN or DRESS. ESMO: maculopapular rashes usually in the first 6 weeks. ASCO: onset can be delayed, even after completion of therapy.', ESMO, ASCO) },
    { tox: 'thyroid', timing: c('SITC: thyrotoxicosis 5 wk; hypothyroidism 10 wk, medians, thyroid-specific', SITC),
      note: c(`ESMO: most hypothyroidism within 3 months, with onset any time during treatment. ${ENDO_ASCO}`, ESMO, ASCO) },
    { tox: 'ocular', timing: c('ASCO ocular: median 5 weeks (range 1-72)', ASCO),
      note: c(`ESMO: onset variable, can be soon after starting. ${LATE}`, ESMO, ASCO) },
    { tox: 'infusion-reaction', timing: c('SITC: during infusion to up to 1 hour after', SITC) },
  ];
  // Pancreatitis: ASCO gives none; SITC time from start to peak lipase, by class (the 110-day combination figure does not map to the LAG-3 class)
  if (kind === 'pd1' || kind === 'pdl1') list.push({ tox: 'pancreatitis', timing: c('Peak lipase median 146 days (SITC), from start of treatment', SITC), note: c(LATE, ASCO) });
  if (kind === 'ctla4') list.push({ tox: 'pancreatitis', timing: c('Peak lipase median 69 days (SITC), from start of treatment', SITC), note: c(LATE, ASCO) });
  return list;
}

export const ONC_CLASSES: DrugClass[] = [
  {
    id: 'pd1', name: 'PD-1 inhibitor',
    mechanism: c('The antibody binds PD-1 and blocks PD-L1 and PD-L2 from engaging it, which releases the inhibition of T-cell activity.', 'pi-keytruda'),
    effects: effects('pd1'),
  },
  {
    id: 'pdl1', name: 'PD-L1 inhibitor',
    mechanism: c('The antibody binds PD-L1 and blocks its interaction with PD-1 and B7.1, which releases the inhibition of the immune response.', 'pi-tecentriq'),
    effects: effects('pdl1'),
  },
  {
    id: 'ctla4', name: 'CTLA-4 inhibitor',
    mechanism: c('The antibody binds CTLA-4 and blocks its interaction with CD80 and CD86, which augments T-cell activation and proliferation. ASCO: combinations increase the incidence, severity and onset of immune-related events. SITC: grade 3 or higher events occur in 14% with PD-(L)1 drugs, 34% with CTLA-4 drugs and 55% with the combination. ESMO: type 1 diabetes starts earlier with PD-(L)1 plus CTLA-4 (median 2.7 vs 4.5 cycles).', 'pi-yervoy', 'pi-imjudo', 'asco-2021', 'sitc-2021', 'esmo-2022'),
    effects: effects('ctla4'),
  },
  {
    id: 'lag3-pd1', name: 'LAG-3 and PD-1 inhibitor combination',
    mechanism: c('Relatlimab binds LAG-3 and blocks its interaction with MHC class II while nivolumab blocks PD-1; together they release T-cell inhibition.', 'pi-opdualag'),
    effects: effects('lag3'),
  },
];
