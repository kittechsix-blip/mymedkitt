import type { Cited, OncDrug } from '../types.js';

// Immune checkpoint inhibitors approved in the US, from the DailyMed labels read 2026-11-18.
// Cancers come from each drug's own label. No label carries a boxed warning. Class effects, timing and screening questions live in classes.ts / toxicities.ts.
const q = (v: string, label: string): Cited => ({ v, cite: [label] });



export const CHECKPOINT_INHIBITORS: OncDrug[] = [
  {
    id: 'pembrolizumab', generic: 'pembrolizumab', editorAliases: ['pembro'], brands: ['Keytruda', 'Keytruda Qlex'], brandSource: 'fda-drugsfda', classIds: ['pd1'], label: 'pi-keytruda', tier: 'full',
    cancers: ['melanoma', 'nsclc', 'mesothelioma', 'hnscc', 'chl', 'pmbcl', 'urothelial', 'msih-solid', 'colorectal', 'gastric', 'esophageal', 'cervical', 'hcc', 'biliary', 'merkel', 'rcc', 'endometrial', 'tmbh', 'cscc', 'tnbc', 'ovarian'],
    effects: [
      { tox: 'neurologic', quirk: q('Label: neurological toxicity grade 2 withhold, grade 3 or 4 permanently discontinue.', 'pi-keytruda') },
      { tox: 'myocarditis', quirk: q('Label: myocarditis grade 2-4 permanently discontinue.', 'pi-keytruda') },
      { tox: 'severe-skin', quirk: q('Label: suspected SJS, TEN or DRESS withhold; confirmed permanently discontinue. Exfoliative dermatitis, including SJS, DRESS and TEN, has occurred with PD-1/PD-L1 blocking antibodies.', 'pi-keytruda') },
      { tox: 'infusion-reaction', quirk: q('Label: 0.2% of 2799 patients, including hypersensitivity and anaphylaxis. Interrupt or slow the infusion for grade 1 or 2; for grade 3 or 4 stop the infusion and permanently discontinue.', 'pi-keytruda') },
      { tox: 'pneumonitis', quirk: q('Label: 3.4% of 2799 patients on single-agent therapy, 8% in classical Hodgkin lymphoma (n=389); incidence is higher after thoracic radiation.', 'pi-keytruda') },
      { tox: 'type1-diabetes', quirk: q('Label: 0.2% on single-agent therapy; all affected patients needed long-term insulin.', 'pi-keytruda') },
    ],
  },
  {
    id: 'nivolumab', generic: 'nivolumab', editorAliases: ['nivo'], brands: ['Opdivo', 'Opdivo Qvantig'], brandSource: 'fda-drugsfda', classIds: ['pd1'], label: 'pi-opdivo', tier: 'full',
    cancers: ['melanoma', 'nsclc', 'mesothelioma', 'rcc', 'chl', 'hnscc', 'urothelial', 'colorectal', 'hcc', 'esophageal', 'gastric'],
    effects: [
      { tox: 'neurologic', quirk: q('Label: neurological toxicity grade 2 withhold, grade 3 or 4 permanently discontinue.', 'pi-opdivo') },
      { tox: 'severe-skin', quirk: q('Label: suspected SJS, TEN or DRESS withhold; confirmed permanently discontinue.', 'pi-opdivo') },
      { tox: 'infusion-reaction', quirk: q('Label: 6.4% (127 of 1994) with a 60-minute infusion, severe in under 1%; discontinue for severe or life-threatening reactions.', 'pi-opdivo') },
      { tox: 'colitis', quirk: q('Label: 2.9% as a single agent (n=1994); 25% with ipilimumab in the melanoma and hepatocellular regimen (n=456), 9% in the renal cell and colorectal regimen (n=666).', 'pi-opdivo') },
      { tox: 'hepatitis', quirk: q('Label: 1.8% as a single agent; 15% with ipilimumab in the melanoma and hepatocellular regimen, 7% in the renal cell and colorectal regimen.', 'pi-opdivo') },
      { tox: 'pneumonitis', quirk: q('Label: 3.1% as a single agent; 9% with ipilimumab in non-small cell lung cancer (n=576).', 'pi-opdivo') },
    ],
  },
  {
    id: 'cemiplimab', generic: 'cemiplimab-rwlc', brands: ['Libtayo'], brandSource: 'fda-drugsfda', aliases: ['cemiplimab'], classIds: ['pd1'], label: 'pi-libtayo', tier: 'full',
    cancers: ['cscc', 'bcc', 'nsclc'],
  },
  {
    id: 'dostarlimab', generic: 'dostarlimab-gxly', aliases: ['dostarlimab'], brands: ['Jemperli'], brandSource: 'fda-drugsfda', classIds: ['pd1'], label: 'pi-jemperli', tier: 'full',
    cancers: ['endometrial', 'rectal', 'dmmr-solid'],
  },
  {
    id: 'toripalimab', generic: 'toripalimab-tpzi', brands: ['Loqtorzi'], brandSource: 'fda-drugsfda', aliases: ['toripalimab'], classIds: ['pd1'], label: 'pi-loqtorzi', tier: 'full',
    cancers: ['nasopharyngeal'],
  },
  {
    id: 'tislelizumab', generic: 'tislelizumab-jsgr', brands: ['Tevimbra'], brandSource: 'fda-drugsfda', aliases: ['tislelizumab'], classIds: ['pd1'], label: 'pi-tevimbra', tier: 'full',
    cancers: ['esophageal', 'gastric'],
  },
  {
    id: 'retifanlimab', generic: 'retifanlimab-dlwr', brands: ['Zynyz'], brandSource: 'fda-drugsfda', aliases: ['retifanlimab'], classIds: ['pd1'], label: 'pi-zynyz', tier: 'full',
    cancers: ['anal-scc', 'merkel'],
  },
  {
    id: 'penpulimab', generic: 'penpulimab-kcqx', brands: [], brandSource: 'fda-drugsfda', aliases: ['penpulimab'], classIds: ['pd1'], label: 'pi-penpulimab', tier: 'full',
    cancers: ['npc-nonkeratinizing'],
  },
  {
    id: 'atezolizumab', generic: 'atezolizumab', brands: ['Tecentriq', 'Tecentriq Hybreza'], brandSource: 'fda-drugsfda', classIds: ['pdl1'], label: 'pi-tecentriq', tier: 'full',
    cancers: ['nsclc', 'sclc', 'hcc', 'melanoma', 'alveolar-sarcoma', 'mibc', 'colon-dmmr'],
  },
  {
    id: 'durvalumab', generic: 'durvalumab', brands: ['Imfinzi'], brandSource: 'fda-drugsfda', classIds: ['pdl1'], label: 'pi-imfinzi', tier: 'full',
    cancers: ['nsclc', 'sclc', 'biliary', 'hcc', 'endometrial', 'bladder', 'gastric'],
    effects: [
      { tox: 'colitis', quirk: q('Label: colitis 2% as a single agent (n=1889); colitis or diarrhea 6% with tremelimumab (n=388).', 'pi-imfinzi') },
      { tox: 'hepatitis', quirk: q('Label: 2.8% as a single agent (fatal 0.2%); 7.5% with tremelimumab (fatal 0.8%).', 'pi-imfinzi') },
      { tox: 'pancreatitis', quirk: q('Label: 2.3% with tremelimumab (n=388).', 'pi-imfinzi') },
    ],
  },
  {
    id: 'avelumab', generic: 'avelumab', brands: ['Bavencio'], brandSource: 'fda-drugsfda', classIds: ['pdl1'], label: 'pi-bavencio', tier: 'full',
    cancers: ['merkel', 'urothelial', 'rcc'],
    effects: [
      { tox: 'infusion-reaction', quirk: q('Label: 26% (grade 4 in 3 patients, 0.2%; grade 3 in 10 patients, 0.5%), 15% occurring after the infusion was completed. Premedicate with an antihistamine and acetaminophen before the first 4 infusions; for grade 3 or 4 stop the infusion and permanently discontinue.', 'pi-bavencio') },
      { tox: 'neurologic', quirk: q('Label: neurological toxicity grade 2 withhold, grade 3 or 4 permanently discontinue.', 'pi-bavencio') },
      { tox: 'severe-skin', quirk: q('Label: suspected SJS, TEN or DRESS withhold; confirmed permanently discontinue.', 'pi-bavencio') },
    ],
  },
  {
    id: 'cosibelimab', generic: 'cosibelimab-ipdl', aliases: ['cosibelimab'], brands: ['Unloxcyt'], brandSource: 'fda-drugsfda', classIds: ['pdl1'], label: 'pi-unloxcyt', tier: 'full',
    cancers: ['cscc'],
  },
  {
    id: 'ipilimumab', generic: 'ipilimumab', editorAliases: ['ipi'], brands: ['Yervoy'], brandSource: 'fda-drugsfda', classIds: ['ctla4'], label: 'pi-yervoy', tier: 'full',
    cancers: ['melanoma', 'rcc', 'colorectal', 'hcc', 'nsclc', 'mesothelioma', 'esophageal'],
    effects: [
      { tox: 'infusion-reaction', quirk: q('Label: 0.6% as a single agent; 5% with nivolumab in the renal cell and colorectal regimen, 8% in hepatocellular carcinoma, 12% in mesothelioma. Discontinue for severe or life-threatening reactions.', 'pi-yervoy') },
      { tox: 'neurologic', quirk: q('Label: neurological toxicity grade 2 withhold, grade 3 or 4 permanently discontinue.', 'pi-yervoy') },
      { tox: 'colitis', rank: 5, quirk: q('Label: 12% as a single agent (n=511), grade 3-5 in 7%, systemic steroids in 74%; 25% in the nivolumab combination described in the label.', 'pi-yervoy') },
      { tox: 'hepatitis', quirk: q('Label: 4.1% as a single agent; in a dose-finding trial, grade 3 transaminase rises occurred in 6 of 10 patients given vemurafenib concurrently.', 'pi-yervoy') },
      { tox: 'severe-skin', quirk: q('Label: rash 15% as a single agent; suspected SJS, TEN or DRESS withhold, confirmed permanently discontinue.', 'pi-yervoy') },
    ],
  },
  {
    id: 'tremelimumab', generic: 'tremelimumab-actl', brands: ['Imjudo'], brandSource: 'fda-drugsfda', aliases: ['tremelimumab'], classIds: ['ctla4'], label: 'pi-imjudo', tier: 'full',
    cancers: ['hcc', 'nsclc'],
    effects: [
      { tox: 'infusion-reaction', quirk: q('Label: 2.6% with durvalumab; interrupt, slow, or permanently discontinue based on severity.', 'pi-imjudo') },
      { tox: 'colitis', rank: 5, quirk: q('Label: colitis or diarrhea 6% with durvalumab (n=388).', 'pi-imjudo') },
      { tox: 'hepatitis', quirk: q('Label: 7.5% with durvalumab (fatal 0.8%).', 'pi-imjudo') },
      { tox: 'pancreatitis', quirk: q('Label: 2.3% with durvalumab.', 'pi-imjudo') },
    ],
  },
  {
    id: 'nivolumab-relatlimab', generic: 'nivolumab and relatlimab-rmbw', brands: ['Opdualag'], brandSource: 'fda-drugsfda', aliases: ['relatlimab'], classIds: ['lag3-pd1'], label: 'pi-opdualag', tier: 'full',
    cancers: ['melanoma'],
    effects: [
      { tox: 'infusion-reaction', quirk: q('Label: 7% with a 60-minute infusion; discontinue for severe or life-threatening reactions.', 'pi-opdualag') },
      { tox: 'myocarditis', quirk: q('Label: 1.7% (6 of 355 patients).', 'pi-opdualag') },
      { tox: 'hepatitis', quirk: q('Label: 6% (grade 4 in 0.6%).', 'pi-opdualag') },
      { tox: 'adrenal-insufficiency', quirk: q('Label: 4.2%.', 'pi-opdualag') },
    ],
  },
];
