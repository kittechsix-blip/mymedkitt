// myMedKitt — MedKitt Learn shelf high-yield page (psychiatry)
// 4 sections: mnemonics · comparison tables · top 10 drugs · shelf-writers-love.
// Static content — phone-glanceable for the morning of the shelf.

import { getRotation } from '../services/learn-service.js';
import { router } from '../services/router.js';

interface MnemonicRow {
  letters: string;
  expansion: string;
  context: string;
}

interface DrugRow {
  drug: string;
  cls: string;
  indication: string;
  killer: string;
}

const MNEMONICS: MnemonicRow[] = [
  { letters: 'SIGECAPS', expansion: 'Sleep · Interest · Guilt · Energy · Concentration · Appetite · Psychomotor · Suicide', context: 'Major Depressive Disorder — ≥5 of 9 (must include depressed mood or anhedonia) ≥2 weeks.' },
  { letters: 'DIGFAST', expansion: 'Distractibility · Indiscretion · Grandiosity · Flight of ideas · Activity · Sleep ↓ · Talkativeness', context: 'Manic episode — ≥3 (or 4 if mood only irritable) ≥1 week (or hospitalized).' },
  { letters: 'MR. FISC', expansion: 'Mood swings · Reduced reality · Flat affect · Inattention · Speech disturbance · Cognitive deficits', context: 'Schizophrenia clinical features.' },
  { letters: 'The 4 As (Bleuler)', expansion: 'Affect · Associations · Autism · Ambivalence', context: 'Classic schizophrenia negative symptoms.' },
  { letters: 'Appelbaum 4', expansion: 'Communicate · Understand · Appreciate · Reason', context: 'Capacity assessment.' },
  { letters: 'C-SSRS 1–5', expansion: '1 wish dead · 2 nonspecific SI · 3 SI with method · 4 SI with intent · 5 SI with intent + plan', context: 'Suicide severity ladder. ≥4 = high risk.' },
  { letters: 'F-E-V-E-R', expansion: 'Fever · Encephalopathy · Vitals unstable · Elevated CK · Rigidity', context: 'Neuroleptic Malignant Syndrome.' },
  { letters: 'CAGE', expansion: 'Cut down · Annoyed · Guilty · Eye-opener', context: 'Alcohol use disorder screen — ≥2 positive = significant.' },
];

const TABLES: { title: string; headers: string[]; rows: string[][] }[] = [
  {
    title: 'Delirium vs Dementia vs Depression',
    headers: ['Feature', 'Delirium', 'Dementia', 'Depression'],
    rows: [
      ['Onset', 'Acute (hours-days)', 'Insidious (months-years)', 'Subacute (weeks)'],
      ['Course', 'Fluctuating', 'Progressive', 'Diurnal variation'],
      ['Attention', 'Impaired (core)', 'Preserved early', 'Poor concentration'],
      ['Consciousness', 'Altered', 'Clear', 'Clear'],
      ['Reversible?', 'Yes if cause treated', 'No (mostly)', 'Yes with Rx'],
    ],
  },
  {
    title: 'NMS vs Serotonin Syndrome vs Malignant Hyperthermia',
    headers: ['Feature', 'NMS', 'Serotonin Syndrome', 'MH'],
    rows: [
      ['Trigger', 'Dopamine antagonist', 'Serotonergic agent', 'Inhaled anesthetic / sux'],
      ['Onset', 'Days', 'Hours', 'Minutes (intra-op)'],
      ['Reflexes', 'Bradyreflexia', 'Hyperreflexia + clonus', 'Variable'],
      ['Rigidity', 'Lead-pipe', 'Less prominent', 'Masseter / generalized'],
      ['Treatment', 'Dantrolene + bromocriptine', 'Cyproheptadine + benzo', 'Dantrolene'],
    ],
  },
  {
    title: 'Antipsychotic Side-Effect Tiers',
    headers: ['Class', 'EPS / TD', 'Metabolic', 'Sedation', 'Notable'],
    rows: [
      ['Typical (haloperidol)', 'High', 'Low', 'Moderate', 'EPS, NMS, prolactin ↑'],
      ['Risperidone', 'Moderate', 'Moderate', 'Low', 'Prolactin ↑ at high doses'],
      ['Olanzapine', 'Low', 'High', 'High', 'Metabolic syndrome'],
      ['Quetiapine', 'Very low', 'Moderate', 'High', 'Often used as sleep aid'],
      ['Aripiprazole', 'Low', 'Low', 'Low', 'Partial dopamine agonist'],
      ['Clozapine', 'Very low', 'Very high', 'High', 'Agranulocytosis (ANC weekly), seizures, myocarditis'],
    ],
  },
];

const TOP_DRUGS: DrugRow[] = [
  { drug: 'Fluoxetine', cls: 'SSRI', indication: 'MDD, GAD, PTSD, OCD, bulimia', killer: 'Long half-life — slow taper; serotonin syndrome with MAOI' },
  { drug: 'Sertraline', cls: 'SSRI', indication: 'MDD, panic, PTSD, OCD', killer: 'GI side effects; QTc minimal vs others' },
  { drug: 'Bupropion', cls: 'NDRI', indication: 'MDD, smoking cessation', killer: 'Lowers seizure threshold — avoid in eating disorders, seizure history' },
  { drug: 'Mirtazapine', cls: 'Atypical (α2 antagonist)', indication: 'MDD with insomnia / anorexia', killer: 'Sedation + weight gain (use it on purpose)' },
  { drug: 'Lithium', cls: 'Mood stabilizer', indication: 'Bipolar I, suicide-risk reduction', killer: 'Narrow therapeutic index (0.6–1.2); tremor, polyuria, hypothyroid, nephrogenic DI' },
  { drug: 'Valproate', cls: 'Mood stabilizer', indication: 'Bipolar mania, seizures', killer: 'Hepatotoxic; pancreatitis; thrombocytopenia; teratogen (NTD)' },
  { drug: 'Lamotrigine', cls: 'Mood stabilizer', indication: 'Bipolar depression maintenance', killer: 'Stevens-Johnson syndrome — slow titration mandatory' },
  { drug: 'Risperidone', cls: 'Atypical antipsychotic', indication: 'Schizophrenia, BPAD, irritability in autism', killer: 'Hyperprolactinemia; EPS at higher doses' },
  { drug: 'Olanzapine', cls: 'Atypical antipsychotic', indication: 'Schizophrenia, BPAD, agitation IM', killer: 'Metabolic syndrome; sedation; do not combine IM with parenteral benzo' },
  { drug: 'Clozapine', cls: 'Atypical antipsychotic', indication: 'Treatment-resistant schizophrenia', killer: 'Agranulocytosis (ANC weekly), seizures, myocarditis, ileus, hypersalivation' },
];

const SHELF_LOVE: { topic: string; pearls: string[] }[] = [
  {
    topic: 'Medical mimics of psych disease',
    pearls: [
      'Hypothyroid → depression, fatigue, cold intolerance.',
      'Hyperthyroid → anxiety, mania, tremor.',
      'Cushing → mood lability, depression, psychosis.',
      'Vitamin B12 deficiency → psychosis, dementia, peripheral neuropathy.',
      'Wilson disease → young patient with new psych + Kayser-Fleischer rings + LFT abnormalities.',
      'Pheochromocytoma → episodic anxiety + headache + hypertension + sweating.',
    ],
  },
  {
    topic: 'Geriatric delirium tells',
    pearls: [
      'UTI is the most over-diagnosed cause — confirm with UA + culture, look for OTHER causes.',
      'Anticholinergic burden (Beers list) — diphenhydramine, oxybutynin, TCAs.',
      'Opioids (especially meperidine) — most delirogenic.',
      'Polypharmacy alone — start with med review.',
    ],
  },
  {
    topic: 'Pediatric psych boards traps',
    pearls: [
      'Autism: deficits in social communication + restricted/repetitive behaviors, before age 3.',
      'ADHD: ≥6 inattentive or hyperactive symptoms, in ≥2 settings, ≥6 months, before age 12.',
      'ODD: argumentative, defiant, vindictive — ≥6 months, NOT toward peers exclusively.',
      'Conduct disorder: violation of rights of others (theft, aggression to people/animals, deceit).',
      'Tourette: ≥1 vocal + multiple motor tics, >1 year, before age 18.',
    ],
  },
  {
    topic: 'Withdrawal one-liners',
    pearls: [
      'Alcohol: tremor → hallucinations → seizure → DTs (most lethal).',
      'Benzo: same as alcohol — can cause seizure + death.',
      'Opioid: piloerection, rhinorrhea, mydriasis, myalgias — uncomfortable, rarely fatal.',
      'Cocaine/amphetamine: depression, hypersomnia, hyperphagia (the "crash") — not life-threatening.',
      'Caffeine: headache, fatigue — DSM-5 disorder.',
    ],
  },
];

export function renderLearnShelfSummary(container: HTMLElement, rotationId: string): void {
  container.innerHTML = '';

  const rotation = getRotation(rotationId);
  const page = document.createElement('div');
  page.className = 'learn-shelf';

  // Header
  const header = document.createElement('div');
  header.className = 'learn-card__header';

  const back = document.createElement('button');
  back.className = 'learn-back-btn';
  back.type = 'button';
  back.textContent = `← ${rotation?.name ?? 'Back'}`;
  back.addEventListener('click', () => router.navigate(`/learn/${rotationId}`));
  header.appendChild(back);

  const title = document.createElement('h1');
  title.className = 'learn-card__title';
  title.textContent = 'Psychiatry Shelf High-Yield';
  header.appendChild(title);

  const sub = document.createElement('p');
  sub.className = 'learn-shelf__subtitle';
  sub.textContent = 'Mnemonics · comparison tables · top 10 drugs · what shelf writers love.';
  header.appendChild(sub);

  page.appendChild(header);

  // Section 1: Mnemonics
  page.appendChild(renderMnemonics());

  // Section 2: Tables
  for (const t of TABLES) {
    page.appendChild(renderTable(t.title, t.headers, t.rows));
  }

  // Section 3: Top drugs
  page.appendChild(renderDrugTable());

  // Section 4: Shelf writers love
  page.appendChild(renderShelfLove());

  container.appendChild(page);
}

function renderMnemonics(): HTMLElement {
  const sec = document.createElement('section');
  sec.className = 'learn-shelf__section';

  const h = document.createElement('h2');
  h.className = 'learn-shelf__section-title';
  h.textContent = 'Mnemonics';
  sec.appendChild(h);

  for (const m of MNEMONICS) {
    const row = document.createElement('details');
    row.className = 'learn-shelf__mnemonic';

    const summary = document.createElement('summary');
    const letters = document.createElement('span');
    letters.className = 'learn-shelf__mnemonic-letters';
    letters.textContent = m.letters;
    summary.appendChild(letters);
    const expansion = document.createElement('span');
    expansion.className = 'learn-shelf__mnemonic-expansion';
    expansion.textContent = m.expansion;
    summary.appendChild(expansion);
    row.appendChild(summary);

    const ctx = document.createElement('div');
    ctx.className = 'learn-shelf__mnemonic-context';
    ctx.textContent = m.context;
    row.appendChild(ctx);

    sec.appendChild(row);
  }

  return sec;
}

function renderTable(title: string, headers: string[], rows: string[][]): HTMLElement {
  const sec = document.createElement('section');
  sec.className = 'learn-shelf__section';

  const h = document.createElement('h2');
  h.className = 'learn-shelf__section-title';
  h.textContent = title;
  sec.appendChild(h);

  const wrap = document.createElement('div');
  wrap.className = 'learn-shelf__table-wrap';

  const table = document.createElement('table');
  table.className = 'learn-shelf__table';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  for (const header of headers) {
    const th = document.createElement('th');
    th.textContent = header;
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (const row of rows) {
    const tr = document.createElement('tr');
    for (const cell of row) {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  wrap.appendChild(table);
  sec.appendChild(wrap);

  return sec;
}

function renderDrugTable(): HTMLElement {
  const sec = document.createElement('section');
  sec.className = 'learn-shelf__section';

  const h = document.createElement('h2');
  h.className = 'learn-shelf__section-title';
  h.textContent = 'Top 10 Psych Drugs';
  sec.appendChild(h);

  for (const d of TOP_DRUGS) {
    const card = document.createElement('div');
    card.className = 'learn-shelf__drug';

    const head = document.createElement('div');
    head.className = 'learn-shelf__drug-head';
    const name = document.createElement('span');
    name.className = 'learn-shelf__drug-name';
    name.textContent = d.drug;
    head.appendChild(name);
    const cls = document.createElement('span');
    cls.className = 'learn-shelf__drug-class';
    cls.textContent = d.cls;
    head.appendChild(cls);
    card.appendChild(head);

    const ind = document.createElement('div');
    ind.className = 'learn-shelf__drug-indication';
    ind.textContent = `Indication: ${d.indication}`;
    card.appendChild(ind);

    const killer = document.createElement('div');
    killer.className = 'learn-shelf__drug-killer';
    killer.textContent = `⚠️ ${d.killer}`;
    card.appendChild(killer);

    sec.appendChild(card);
  }

  return sec;
}

function renderShelfLove(): HTMLElement {
  const sec = document.createElement('section');
  sec.className = 'learn-shelf__section';

  const h = document.createElement('h2');
  h.className = 'learn-shelf__section-title';
  h.textContent = 'Things Shelf Writers Love';
  sec.appendChild(h);

  for (const block of SHELF_LOVE) {
    const sub = document.createElement('div');
    sub.className = 'learn-shelf__love-block';

    const t = document.createElement('h3');
    t.className = 'learn-shelf__love-title';
    t.textContent = block.topic;
    sub.appendChild(t);

    const ul = document.createElement('ul');
    ul.className = 'learn-shelf__love-list';
    for (const p of block.pearls) {
      const li = document.createElement('li');
      li.textContent = p;
      ul.appendChild(li);
    }
    sub.appendChild(ul);
    sec.appendChild(sub);
  }

  return sec;
}
