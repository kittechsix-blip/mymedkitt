import type { Cancer, Cited, OncDrug, OncSource } from '../types.js';

// Erlotinib, from a generic DailyMed label (the Tarceva originator label is not on DailyMed) read 2026-11-18.
// Every statement is taken from the label named in its citation. Dosing lives on management pages, not here.
// Ofatumumab (Arzerra, CLL) and necitumumab (Portrazza): no label on DailyMed, so no cards (see report).
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });
const dm = (setid: string) => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;

const ERL = 'pi-erlotinib';

export const SOURCES: Record<string, OncSource> = {
  'pi-erlotinib': { key: 'pi-erlotinib', kind: 'fda-pi', text: 'Erlotinib tablets, GENERIC label (Camber Pharmaceuticals, Inc.; manufactured by Hetero Labs Limited, Unit V; label revised 05/2024). Prescribing information, DailyMed set ID a3b2d622-b4d5-4819-862b-f8fd3adcec6f, SPL effective 2024-06-26. The brand (Tarceva) label is not on DailyMed; this generic label was used.', url: dm('a3b2d622-b4d5-4819-862b-f8fd3adcec6f'), revised: '2024-06-26' },
};

export const CANCERS: Cancer[] = [
  { id: 'pancreatic-gemcitabine-first-line', type: 'pancreatic', name: 'Locally advanced, unresectable or metastatic pancreatic cancer, first-line (with gemcitabine)' },
];

export const DRUGS: OncDrug[] = [
  {
    id: 'erlotinib', generic: 'erlotinib', brands: [], formerBrands: ['Tarceva'], brandSource: 'fda-drugsfda', classIds: ['tgt-egfr-tki'], label: ERL, tier: 'full',
    mechanism: c('Reversibly inhibits the kinase activity of the epidermal growth factor receptor (EGFR), blocking downstream signaling; its binding affinity for the EGFR exon 19 deletion and exon 21 L858R mutations is higher than for the wild type receptor.', ERL),
    cancers: ['egfr-nsclc', 'pancreatic-gemcitabine-first-line'],
    effects: [
      {
        tox: 'drug-lung-toxicity', cite: [ERL],
        timing: c('Median ILD onset is 39 days after starting, range 5 days to more than 9 months', ERL),
        quirk: c('Label: withhold for new or progressive unexplained dyspnea, cough or fever pending evaluation; permanently discontinue if ILD is confirmed. Serious, including fatal; about 1.1% of roughly 32,000 treated patients.', ERL),
      },
      {
        tox: 'drug-hepatotoxicity', cite: [ERL],
        quirk: c('Hepatic failure, including fatal cases, also with normal liver function; 10 of 15 patients with Child-Pugh B impairment died within 30 days. Label: withhold for bilirubin above 3 times ULN or transaminases above 5 times ULN; with prior impairment, for doubled bilirubin or tripled transaminases; discontinue if not improved in three weeks.', ERL),
      },
      {
        tox: 'drug-nephrotoxicity', cite: [ERL],
        quirk: c('Label: withhold for severe renal impairment until resolved; monitor renal function and electrolytes. Hepatorenal syndrome and severe acute renal failure, including fatal cases; severe impairment 0.5% in monotherapy lung studies, 1.4% with gemcitabine.', ERL),
      },
      {
        tox: 'drug-gi-perforation', cite: [ERL],
        quirk: c('Label: permanently discontinue if perforation develops. Including fatal cases; 0.2% in monotherapy lung studies, 0.4% with gemcitabine. Higher risk with anti-angiogenic agents, corticosteroids, NSAIDs, taxanes, or prior peptic ulcer or diverticular disease.', ERL),
      },
      {
        tox: 'drug-severe-skin', cite: [ERL],
        quirk: c('Label: discontinue for severe bullous, blistering or exfoliating conditions. Includes cases suggestive of Stevens-Johnson syndrome/toxic epidermal necrolysis, some fatal; 1.2% in monotherapy lung studies, 0.4% with gemcitabine.', ERL),
      },
      {
        tox: 'drug-thromboembolism', cite: [ERL],
        quirk: c('Cerebrovascular accident in 2.5% with gemcitabine (one hemorrhagic and fatal) versus none with placebo; 0.6% in monotherapy lung studies. Deep venous thrombosis 4% with gemcitabine versus 1% with placebo.', ERL),
      },
      {
        tox: 'drug-tma', cite: [ERL],
        quirk: c('Microangiopathic hemolytic anemia with thrombocytopenia: 1.4% with gemcitabine in pancreatic cancer (0% control); 0% in erlotinib monotherapy lung studies.', ERL),
      },
      {
        tox: 'drug-ocular-toxicity', cite: [ERL],
        quirk: c('Label: interrupt or discontinue for acute or worsening eye disorders such as eye pain. Keratitis and dry eye can lead to corneal perforation or ulceration; 17.8% in monotherapy lung studies, 12.8% with gemcitabine.', ERL),
      },
      {
        tox: 'drug-hemorrhage', cite: [ERL],
        quirk: c('Label: with warfarin or other coumarin anticoagulants, monitor prothrombin time and INR regularly; severe and fatal hemorrhage with INR elevation. Fatal GI bleeding also reported, some with warfarin or NSAIDs.', ERL),
      },
      {
        tox: 'rhabdomyolysis', cite: [ERL], basis: 'postmarketing',
        quirk: c('Postmarketing: myopathy, including rhabdomyolysis, in combination with statin therapy.', ERL),
      },
    ],
    alsoOnLabel: [
      c('Severe diarrhea: 42% any grade across studies, grade 3 to 4 in 2% to 6%; label says withhold for persistent severe diarrhea not responding to medical management such as loperamide', ERL),
      c('Rash: 70% across studies, grade 3 to 4 in 5% to 14%; label says withhold for severe rash not responding to medical management', ERL),
      c('Pancreatic study, severe events: with gemcitabine under 5% had syncope, arrhythmias, ileus, pancreatitis, myocardial infarction/ischemia and cerebral hemorrhage', ERL),
      c('Postmarketing: ocular inflammation including uveitis', ERL),
      c('Overdose: label says withhold erlotinib and give symptomatic treatment; no antidote is named', ERL),
      c('Strong CYP3A4 inhibitors: clarithromycin, azole antifungals (itraconazole, ketoconazole, voriconazole), ritonavir, grapefruit; avoid, or reduce the dosage if unavoidable', ERL),
      c('Ciprofloxacin: inhibits CYP3A4 and CYP1A2, raising exposure; avoid, or reduce the dosage if unavoidable', ERL),
      c('CYP3A4 inducers: carbamazepine, phenytoin, rifampin, phenobarbital, St. John\'s wort lower exposure; label says increase the dosage if unavoidable', ERL),
      c('Moderate CYP1A2 inducers and smoking: teriflunomide, rifampin, phenytoin and cigarette smoking lower exposure; avoid, or increase the dosage if unavoidable', ERL),
      c('Acid reducers: avoid proton pump inhibitors if possible; for H-2 receptor antagonists and antacids, separate dosing', ERL),
    ],
  },
];
