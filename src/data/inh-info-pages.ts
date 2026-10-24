// Focused acute INH toxicity tools. Type-only import avoids a registry cycle.
import type { InfoPage } from './info-pages.js';

const citations = [
  { num: 1, text: 'Queensland Poisons Information Centre. Pyridoxine antidote guidance (July 2023). https://www.poisonsinfo.health.qld.gov.au/for-health-professionals/antidote-stocking-recommendations/pyridoxine' },
  { num: 2, text: 'Chen HY, Albertson TE, Olson KR. Treatment of drug-induced seizures. Br J Clin Pharmacol. 2016;81:412–419. doi:10.1111/bcp.12720. https://pmc.ncbi.nlm.nih.gov/articles/PMC4767205/' },
  { num: 3, text: 'EXTRIP Workgroup. Isoniazid recommendations (weak recommendations; very low-quality evidence). https://www.extrip-workgroup.org/isoniazid' },
  { num: 4, text: 'IPCS/INchem. Isoniazid, Poisons Information Monograph 288. Historical mechanism and clinical presentation reference, not the current dosing authority. https://www.inchem.org/documents/pims/pharm/pim288.htm' },
];

export const INH_INFO_PAGES: InfoPage[] = [
  {
    id: 'inh-summary',
    title: 'INH: Five Immediate Steps',
    subtitle: 'Acute isoniazid overdose',
    sections: [
      { heading: '1 · Recognize', body: 'Recurrent seizures + anion-gap acidosis + altered consciousness suggest INH toxicity. The complete triad is not required. [4]' },
      { heading: '2 · Stabilize', body: 'Support oxygenation and ventilation; obtain bedside glucose, IV/IO access and cardiac monitoring. Correct hypoglycemia. [2]' },
      { heading: '3 · Treat seizures', body: 'Give a benzodiazepine and obtain IV pyridoxine immediately. Open **Seizures** for doses; do not wait for an INH level. [1][2][4]' },
      { heading: '4 · Mobilize antidote', body: 'Call pharmacy and Poison Control now: **1-800-222-1222**. Confirm grams available, concentration and delivery time. [1]' },
      { heading: '5 · Reassess', body: 'Trend pH, lactate, electrolytes, renal function and CK. Persistent coma requires consideration of ongoing nonconvulsive seizures. Severe toxicity needs critical care. [2][4]' },
    ],
    citations,
  },
  {
    id: 'inh-seizures',
    title: 'INH Seizure Rescue',
    subtitle: 'Benzodiazepine + pyridoxine, concurrently',
    sections: [
      { heading: 'Benzodiazepine now', body: '**Lorazepam 0.1 mg/kg IV, maximum 4 mg**, at no more than 2 mg/min. May repeat once after 5 minutes if still seizing; prepare airway support. [2]' },
      { heading: 'Pyridoxine initial dose', body: '**Known ingestion:** adult initial dose matches INH mass, mg for mg, maximum 5 g. Child initial dose is the **lowest of ingested INH mass, 70 mg/kg, or 5 g**. These are initial limits, not a total-course ceiling; further dosing requires toxicology guidance.\n\n**Unknown ingestion:** adult **5 g IV**; child **70 mg/kg IV, maximum 5 g**.\n\nGive at **500 mg/min** in D5W (5 g takes 10 minutes). If seizures stop early, infuse the remainder over 1–2 hours. [1]' },
      { heading: 'Persistent seizures', body: 'Escalate promptly to ICU/toxicology for anesthetic seizure suppression with airway control and EEG. Additional pyridoxine is toxicologist-directed; Queensland advises reassessing repeat dosing at 30 minutes. Avoid automatic repeat-dose orders. [1][2]' },
      { heading: 'Antidote unavailable', body: 'Urgently arrange IV supply/transfer. Enteral pyridoxine is a toxicologist-directed contingency with aspiration precautions, not a reason to delay resuscitation. [1]' },
      { heading: 'Dialysis is not routine', body: 'EXTRIP suggests against adding dialysis to standard care. Consider it only in the unusual setting of unavailable standard-dose pyridoxine AND seizures refractory to GABA-A modulators. Evidence is very low quality. [3]' },
    ],
    citations,
  },
  {
    id: 'inh-moa',
    title: 'Why INH Causes Seizures',
    subtitle: 'PLP depletion → impaired GABA synthesis',
    image: { src: 'images/isoniazid-toxicity/inh-gaba-pathway.svg', alt: 'INH disrupts vitamin B6 availability and activation, reducing PLP-dependent conversion of glutamate to GABA. Pyridoxine supports synthesis; benzodiazepines enhance GABA-A activity.', caption: 'Original MedKitt schematic. Mechanistic synthesis from IPCS and Chen et al.; not a quantitative model.' },
    sections: [
      { heading: 'The interrupted pathway', body: '**Vitamin B6 → pyridoxal-5-phosphate (PLP)**\n\n**Glutamate → GABA** requires glutamate decarboxylase and its PLP cofactor. INH/metabolites disrupt B6 availability and activation, reducing inhibitory GABA synthesis. [4]' },
      { heading: 'Why two treatments?', body: '**Pyridoxine restores substrate for GABA synthesis. Benzodiazepines enhance GABA-A receptor activity.** Their actions are complementary; experimental synergy was demonstrated in animals, not a human randomized trial. [2]' },
      { heading: 'Why acidosis and coma?', body: 'Sustained convulsions increase lactate production and oxygen demand. Acidosis and depressed consciousness may be profound; persistent abnormalities require reassessment for continued seizures, hypoperfusion and coingestants. [2][4]' },
      { heading: 'Why not phenytoin?', body: 'Sodium-channel blockade does not correct the GABA deficit. Phenytoin/fosphenytoin should not replace pyridoxine and benzodiazepines for INH seizures. [2]' },
    ],
    citations,
  },
  {
    id: 'isoniazid-toxicity-stop',
    title: 'INH: Do NOT',
    subtitle: 'Avoidable treatment delays and dosing errors',
    sections: [
      { heading: 'Do not await the full triad', body: 'Treat the suspected syndrome; seizures may precede the complete presentation. [4]' },
      { heading: 'Do not wait for an INH level', body: 'Treatment is clinical; confirmation must not delay antidote. [4]' },
      { heading: 'Do not confuse mg with g', body: '1 g = 1,000 mg. Verify formulation and total administered dose. [1]' },
      { heading: 'Do not substitute prophylactic B6 dosing', body: 'Routine supplementation is not an overdose antidote regimen. [1]' },
      { heading: 'Do not rely on phenytoin', body: 'Use the INH-specific seizure rescue pathway. [2]' },
      { heading: 'Do not equate paralysis with seizure control', body: 'Neuromuscular blockade hides motor activity; use EEG when indicated. [2]' },
      { heading: 'Do not give enteral antidote into an unprotected airway', body: 'Discuss route and aspiration risk with toxicology. [1][2]' },
      { heading: 'Do not order dialysis reflexively', body: 'Follow the narrow EXTRIP exception, not acidosis alone. [3]' },
    ],
    citations,
  },
];
