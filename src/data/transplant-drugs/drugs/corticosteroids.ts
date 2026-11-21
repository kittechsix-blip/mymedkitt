import type { Cited, DrugClass, DrugEffectOverride, OncDrug, OncSource } from '../../onc-drugs/types.js';
import type { TxGroup } from '../types.js';

// Corticosteroids (class section "Maintenance") for the Transplant Drugs Side-effects consult: prednisone and methylprednisolone.
// Every line is paraphrased from the drug's own FDA label (DailyMed SPL XML saved in research/transplant-sources/dailymed/) and cites that label.
// None of the three labels names transplant or rejection, so nothing here states a transplant use. No doses. Nothing from outside the labels.
// Line format: a short head, a colon, one hazard; 200 characters at most. Interaction lines use one of six heads and sit together in alsoOnLabel.
// Report: research/transplant-sources/cards/corticosteroids.report.md
const c = (v: string, ...cite: string[]): Cited => ({ v, cite });

const P = 'pi-prednisone-hikma';
const M = 'pi-medrol';
const SM = 'pi-solumedrol';
const ALL = [P, M, SM];

const dm = (setid: string): string => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;

export const SOURCES: Record<string, OncSource> = {
  [P]: { key: P, kind: 'fda-pi', text: 'PredniSONE tablets, oral solution and Intensol oral solution concentrate (generic; the label carries no brand name), Hikma Pharmaceuticals USA Inc. Prescribing information, DailyMed set ID 3115aef0-fd50-4ec8-a064-3effb695f3f2, SPL effective 2025-04-22.', url: dm('3115aef0-fd50-4ec8-a064-3effb695f3f2'), revised: 'February 2024' },
  [M]: { key: M, kind: 'fda-pi', text: 'MEDROL (methylprednisolone) tablets, Pharmacia & Upjohn Company LLC, a subsidiary of Pfizer Inc. Prescribing information, DailyMed set ID 39d5270b-d957-4821-93d6-501b7b9f02d4, SPL effective 2025-11-14.', url: dm('39d5270b-d957-4821-93d6-501b7b9f02d4'), revised: 'November 2025' },
  [SM]: { key: SM, kind: 'fda-pi', text: 'SOLU-MEDROL (methylprednisolone sodium succinate) sterile powder for intravenous or intramuscular use, Pharmacia & Upjohn Company LLC, a subsidiary of Pfizer Inc. Prescribing information, DailyMed set ID 7271310c-7764-4812-aa30-a5e90987c7a9, SPL effective 2026-06-25.', url: dm('7271310c-7764-4812-aa30-a5e90987c7a9'), revised: 'November 2025' },
};

// Class effects only where all three labels support them as a warning (anaphylaxis is a bare list item in Medrol and prednisone, so it is not a class effect).
export const CLASSES: DrugClass[] = [
  {
    id: 'tx-corticosteroid', name: 'Corticosteroids',
    mechanism: c('Glucocorticoid with profound, varied metabolic effects; it also modifies the body’s immune responses.', ...ALL),
    effects: [
      { tox: 'tx-adrenal-insufficiency', rank: 1, cite: ALL },
      { tox: 'tx-serious-infection', rank: 2, cite: ALL },
      { tox: 'drug-gi-perforation', cite: ALL },
    ],
  },
];

const MECH = (...k: string[]): Cited => c('Glucocorticoid with profound, varied metabolic effects; it also modifies the body’s immune responses.', ...k);

// ------------------------------------------------------------------ prednisone
// Cap relaxed for this card (owner exception, same basis as methylprednisolone): every warned event has its own line; bare list items last.
const prednisone: OncDrug = {
  id: 'prednisone', generic: 'Prednisone', brands: [], aliases: ['prednisone'], editorAliases: ['pred'],
  classIds: ['tx-corticosteroid'], cancers: [], label: P, tier: 'full',
  pin: false, pharmacyDrugId: 'prednisone',
  mechanism: MECH(P),
  alsoOnLabel: [
    c('Stress dosing: in a patient on corticosteroids under unusual stress, the label says increased dosage of rapidly acting corticosteroids is indicated before, during and after the stress', P),
    c('Stopping: after long-term therapy the label recommends withdrawing gradually, not abruptly; it adds salt and/or a mineralocorticoid because mineralocorticoid secretion may be impaired', P),
    c('Varicella and measles: serious or fatal in non-immune patients; after exposure the label says varicella zoster immune globulin (varicella) or immunoglobulin (measles) may be indicated', P),
    c('Tuberculosis: reactivation can occur with latent infection or tuberculin reactivity; the label says to monitor closely, with chemoprophylaxis during prolonged therapy', P),
    c('Hepatitis B: reactivation can occur in carriers on immunosuppressive dosages and infrequently after resolved infection; the label says to screen before prolonged therapy', P),
    c('Strongyloides: use with great care in known or suspected infestation; may lead to hyperinfection and dissemination, often with severe enterocolitis and potentially fatal gram-negative septicemia', P),
    c('Amebiasis: corticosteroids may activate latent amebiasis; the label says to rule it out before starting in patients who have spent time in the tropics or have unexplained diarrhea', P),
    c('Cerebral malaria: the label says to avoid corticosteroids, including prednisone, in patients with cerebral malaria', P),
    c('Carbohydrate tolerance: decreased tolerance, manifestations of latent diabetes and increased insulin or oral hypoglycemic needs in diabetics are listed', P),
    c('Psychiatric effects: euphoria, insomnia, mood swings, personality changes, severe depression or frank psychosis; existing emotional instability or psychotic tendencies may be aggravated', P),
    c('Contraindications: systemic fungal infections and known hypersensitivity to components', P),
    c('Systemic fungal infection: the label says to avoid prednisone unless needed to control drug reactions, and recommends withdrawal or dosage reduction on chronic therapy', P),
    c('Pressure and potassium: hydrocortisone and cortisone can raise blood pressure, retain salt and water and increase potassium excretion; less likely with synthetics except large doses', P),
    c('Calcium: the label says all corticosteroids increase calcium excretion', P),
    c('Enhanced effect: the label says corticosteroids have an enhanced effect in patients with hypothyroidism and in those with cirrhosis', P),
    c('Cautions: the label says steroids should be used with caution in renal insufficiency, hypertension, osteoporosis and myasthenia gravis', P),
    c('Cataracts and glaucoma: prolonged use may produce posterior subcapsular cataracts and glaucoma with possible optic nerve damage, and may enhance secondary fungal or viral eye infections', P),
    c('Ocular herpes simplex: the label says corticosteroids should be used cautiously because of possible corneal perforation', P),
    c('Kaposi’s sarcoma: reported mostly with chronic therapy; discontinuing corticosteroids may result in clinical improvement', P),
    c('Musculoskeletal: muscle weakness, steroid myopathy, tendon rupture (Achilles), osteoporosis, vertebral compression and pathologic fractures, aseptic necrosis of femoral and humeral heads', P),
    c('Skin: impaired wound healing, thin fragile skin, petechiae and ecchymoses, facial erythema, increased sweating, and suppressed reactions to skin tests', P),
    c('Other listed: pseudotumor cerebri (usually after treatment), convulsions, vertigo, headache, congestive heart failure in susceptible patients, hypokalemic alkalosis, pancreatitis', P),
    c('Other listed: urticaria and other allergic, anaphylactic or hypersensitivity reactions, Cushingoid state, menstrual irregularities, exophthalmos, negative nitrogen balance', P),
    c('Other listed: increased intraocular pressure, abdominal distention, ulcerative esophagitis', P),
  ],
  interactions: [
    c('Avoid together: smallpox vaccine; the label says other immunization should not be undertaken on corticosteroids, especially high dose (neurological complications, no antibody response)', P),
    // plain lines (no head fits)
    c('Cyclosporin: the prednisone label’s only interaction text names methylprednisolone, with mutual inhibition of metabolism and convulsions reported on concurrent use; it names no prednisone interaction', P),
    c('Aspirin: the label says to use it cautiously with corticosteroids in hypoprothrombinemia', P),
  ],
  effects: [
    {
      tox: 'tx-adrenal-insufficiency', rank: 1, cite: [P],
      quirk: c('Adrenal insufficiency: drug-induced secondary insufficiency may persist for months after stopping; the label says hormone therapy should be reinstituted in any stress during that period.', P),
    },
    {
      tox: 'tx-serious-infection', cite: [P],
      quirk: c('Serious infection: any pathogen, mild to fatal, and some signs may be masked; the label says monitor and consider prednisone withdrawal or dosage reduction as needed; risk rises with dose.', P),
    },
    {
      tox: 'drug-gi-perforation', cite: [P], ask: [],
      quirk: c('GI perforation: peptic ulcer with possible perforation and hemorrhage is listed; the label urges caution with impending perforation, diverticulitis, fresh anastomoses and active or latent ulcer.', P),
    },
  ],
};

// ------------------------------------------------------------------ methylprednisolone (anchor: Medrol tablets; Solu-Medrol cited where it says the same, named where only one label does)
// Owner exception: the 12-line cap on non-interaction lines is relaxed for this card; one hazard per line.
const mk = [M, SM];

const methylprednisolone: OncDrug = {
  id: 'methylprednisolone', generic: 'Methylprednisolone', brands: ['Medrol', 'Solu-Medrol'], aliases: ['methylprednisolone', 'methylprednisolone sodium succinate'], editorAliases: ['methylpred'],
  classIds: ['tx-corticosteroid'], cancers: [], label: M, tier: 'full',
  pin: false, pharmacyDrugId: 'methylprednisolone',
  mechanism: MECH(...mk),
  alsoOnLabel: [
    c('Stress dosing: in a patient on corticosteroids under unusual stress, the label says increased dosage of rapidly acting corticosteroids is indicated before, during and after the stress', ...mk),
    c('Stopping: the label recommends withdrawing gradually, not abruptly, after long-term therapy; Medrol adds salt and/or a mineralocorticoid because mineralocorticoid secretion may be impaired', ...mk),
    c('Varicella and measles: serious or fatal in non-immune patients; after exposure the label says varicella zoster immune globulin (varicella) or immunoglobulin (measles) may be indicated', ...mk),
    c('Tuberculosis: reactivation can occur with latent infection or tuberculin reactivity; the label says to monitor closely, with chemoprophylaxis during prolonged therapy', ...mk),
    c('Hepatitis B: reactivation can occur in carriers on immunosuppressive dosages and infrequently after resolved infection; the label says to screen before prolonged therapy', ...mk),
    c('Strongyloides: use with great care in known or suspected infestation; may lead to hyperinfection and dissemination, often with severe enterocolitis and potentially fatal gram-negative septicemia', ...mk),
    c('Amebiasis: corticosteroids may activate latent amebiasis; the label says to rule it out first in patients who have spent time in the tropics or have unexplained diarrhea', ...mk),
    c('Cerebral malaria: the label says to avoid corticosteroids in patients with cerebral malaria', ...mk),
    c('Carbohydrate tolerance: both labels list decreased tolerance, latent diabetes and raised insulin needs; Solu-Medrol also warns of hyperglycemia and says to monitor on chronic use', ...mk),
    c('Solu-Medrol and sepsis: a study failed to establish efficacy in sepsis and septic shock and suggests it may raise mortality in certain patients (elevated creatinine, or secondary infections after it)', SM),
    c('Psychiatric effects: euphoria, insomnia, mood swings, personality changes, severe depression or frank psychosis; existing emotional instability or psychotic tendencies may be aggravated', ...mk),
    c('Solu-Medrol rapid injection: cardiac arrhythmias and cardiac arrest reported after rapid administration of large intravenous doses; bradycardia reported with large doses and may be unrelated to speed', SM),
    c('Solu-Medrol and head injury: the label says high-dose systemic corticosteroids should not be used for traumatic brain injury; a trial in cranial trauma showed higher early and late mortality', SM),
    c('Solu-Medrol and cow’s milk: one presentation has lactose from cow’s milk; if allergic symptoms worsen on it, the label says to consider milk hypersensitivity and a formulation without milk ingredients', SM),
    c('Solu-Medrol and recent infarction: corticosteroids are apparently associated with left ventricular free wall rupture after a recent myocardial infarction; the label says to use great caution', SM),
    c('Solu-Medrol acute myopathy: with high doses, most often in myasthenia gravis or with neuromuscular blockers; may involve respiratory muscles and cause quadriparesis; recovery can take weeks to years', SM),
    c('Tumor lysis syndrome: reported after approval in patients with malignancies; the label says to monitor high-risk patients closely', ...mk),
    c('Systemic sclerosis: increased incidence of scleroderma renal crisis with corticosteroids; the label calls for caution', ...mk),
    c('Solu-Medrol overdose: the label gives supportive and symptomatic therapy for acute overdosage', SM),
    c('Solu-Medrol epidural use: serious neurologic events, some fatal, including spinal cord infarction, paraplegia, cortical blindness and stroke; the label says it is not approved for this use', SM),
    c('Contraindications: systemic fungal infections and known hypersensitivity to components', ...mk),
    c('Systemic fungal infection: the label says to avoid the drug unless needed to control drug reactions, and recommends withdrawal or dosage reduction on chronic therapy', ...mk),
    c('Solu-Medrol contraindications: intrathecal administration, because severe medical events have been reported', SM),
    c('Solu-Medrol contraindications: intramuscular corticosteroid preparations in idiopathic thrombocytopenic purpura', SM),
    c('Solu-Medrol contraindications: known or suspected cow’s milk hypersensitivity (one presentation)', SM),
    c('Blood pressure and fluid: average and large doses can raise blood pressure and retain salt and water, less so with synthetics except large doses (Medrol names hydrocortisone or cortisone)', ...mk),
    c('Potassium loss: average and large doses increase potassium excretion, less so with synthetics except large doses; potassium supplementation may be necessary; hypokalemic alkalosis is listed', ...mk),
    c('Calcium: the label says all corticosteroids increase calcium excretion', ...mk),
    c('Enhanced effect: Medrol says corticosteroids act more in hypothyroidism and cirrhosis; Solu-Medrol says metabolism falls in cirrhosis, and thyroid status changes may need dosage adjustment', ...mk),
    c('Cautions: Medrol says steroids should be used with caution in renal insufficiency, hypertension, osteoporosis and myasthenia gravis; Solu-Medrol adds congestive heart failure', ...mk),
    c('Solu-Medrol and optic neuritis: the label says oral corticosteroids are not recommended in optic neuritis and may increase the risk of new episodes', SM),
    c('Eyes: posterior subcapsular cataracts, glaucoma with possible optic nerve damage, raised intraocular pressure and secondary fungal or viral eye infection', ...mk),
    c('Ocular herpes simplex: the label says to use corticosteroids cautiously because of possible corneal perforation; Solu-Medrol adds they should not be used in active ocular herpes simplex', ...mk),
    c('Kaposi’s sarcoma: reported mostly with chronic therapy; discontinuing corticosteroids may result in improvement', ...mk),
    c('Musculoskeletal: steroid myopathy, muscle weakness and loss, tendon rupture (Achilles), osteoporosis, vertebral compression and pathologic fractures, aseptic necrosis of femoral and humeral heads', ...mk),
    c('Skin: impaired wound healing, thin fragile skin, petechiae and ecchymoses, increased sweating and suppressed reactions to skin tests; Medrol also lists facial erythema', ...mk),
    c('Other listed: pseudotumor cerebri (usually after treatment), convulsions, vertigo, headache, congestive heart failure in susceptible patients, pancreatitis', ...mk),
    c('Other listed: liver enzyme rises, usually reversible on stopping; Medrol names ALT, AST and alkaline phosphatase, small and without a clinical syndrome', ...mk),
  ],
  interactions: [
    c('Raises level: ketoconazole may inhibit methylprednisolone metabolism and lower clearance; the label says to titrate to avoid toxicity; Solu-Medrol: some corticosteroid metabolism cut up to 60%', ...mk),
    c('Raises level: troleandomycin may inhibit methylprednisolone metabolism and lower its clearance (Medrol); Solu-Medrol lists it with CYP3A4 inhibitors that may raise corticosteroid plasma concentrations', ...mk),
    c('Raises level: Solu-Medrol: macrolide antibiotics such as erythromycin were reported to significantly decrease corticosteroid clearance', SM),
    c('Raises level: Solu-Medrol: estrogens, including oral contraceptives, may decrease hepatic metabolism of certain corticosteroids, increasing their effect', SM),
    c('Lowers level: phenobarbital, phenytoin and rifampin may increase methylprednisolone clearance; the label says they may require increases in the methylprednisolone dose to get the desired response', M),
    c('Lowers level: Solu-Medrol: CYP3A4 inducers (barbiturates, phenytoin, carbamazepine, rifampin) may enhance corticosteroid metabolism and require that the corticosteroid dosage be increased', SM),
    c('Lowers level: Solu-Medrol: cholestyramine may increase the clearance of corticosteroids', SM),
    c('Adds potassium risk: Solu-Medrol: low potassium with potassium-depleting agents (amphotericin B, diuretics); the label says patients should be observed closely for hypokalemia', SM),
    c('Adds potassium risk: Solu-Medrol: patients on digitalis glycosides may be at increased risk of arrhythmias due to hypokalemia', SM),
    c('Raises the other drug: cyclosporin: mutual inhibition of metabolism (Medrol) and increased activity of both (Solu-Medrol), so adverse events of either may be more apt; convulsions reported', ...mk),
    c('Lowers the other drug: Solu-Medrol: corticosteroids may decrease serum concentrations of isoniazid', SM),
    c('Lowers the other drug: Medrol: methylprednisolone may increase clearance of chronic high-dose aspirin, lowering salicylate levels or raising toxicity risk when methylprednisolone is withdrawn', M),
    c('Avoid together: live or live attenuated vaccines, contraindicated on immunosuppressive doses; inactivated vaccines may be given, response diminished (Medrol) or unpredictable (Solu-Medrol)', ...mk),
    // plain lines (no head fits), last
    c('Vaccines, routine: Solu-Medrol says routine vaccines or toxoids should be deferred until corticosteroid therapy is discontinued if possible; the antibody response may be diminished', SM),
    c('Oral anticoagulants: Medrol says the effect is variable, enhanced or diminished; Solu-Medrol says response to warfarin is usually inhibited; both say to monitor coagulation indices', ...mk),
    c('Aspirin and NSAIDs: both labels say to use aspirin cautiously with corticosteroids in hypoprothrombinemia; Solu-Medrol adds that aspirin or other NSAIDs raise the risk of gastrointestinal side effects', ...mk),
    c('Antidiabetics: Solu-Medrol says corticosteroids may raise blood glucose, so dosage adjustments of antidiabetic agents may be required', SM),
    c('Anticholinesterases: Solu-Medrol says concurrent use may cause severe weakness in myasthenia gravis; if possible, withdraw them at least 24 hours before starting corticosteroid therapy', SM),
    c('Aminoglutethimide: Solu-Medrol says it may lead to a loss of corticosteroid-induced adrenal suppression', SM),
    c('Amphotericin B and hydrocortisone: Solu-Medrol reports cardiac enlargement and congestive heart failure when they were used together (hydrocortisone, not methylprednisolone)', SM),
  ],
  effects: [
    {
      tox: 'tx-adrenal-insufficiency', rank: 1, cite: mk,
      quirk: c('Adrenal insufficiency: insufficiency after withdrawal may persist for months; the label says hormone therapy should be reinstituted in any stress then; Solu-Medrol: HPA suppression is reversible.', ...mk),
    },
    {
      tox: 'tx-serious-infection', cite: mk,
      quirk: c('Serious infection: any pathogen, mild to fatal, and some signs may be masked; the label says monitor and consider withdrawal or dosage reduction as needed; risk rises with dose.', ...mk),
    },
    {
      tox: 'tx-infusion-anaphylaxis', cite: mk,
      quirk: c('Anaphylaxis: Solu-Medrol warns of rare anaphylactoid reactions and lists anaphylaxis and angioedema; Medrol lists allergic, anaphylactic or hypersensitivity reactions.', ...mk),
    },
    {
      tox: 'drug-gi-perforation', cite: mk, ask: [],
      quirk: c('GI perforation: ulcer perforation and hemorrhage listed; caution with diverticulitis, fresh anastomoses, ulcer, colitis; Solu-Medrol: peritoneal signs may be minimal or absent.', ...mk),
    },
    {
      tox: 'drug-hepatotoxicity', cite: [SM], ask: [],
      quirk: c('Liver injury: Solu-Medrol alone warns that high-dose pulsed IV use can cause toxic hepatitis, sometimes acute liver failure and death; the label says to discontinue it if toxic hepatitis occurs.', SM),
    },
  ],
};

export const DRUGS: OncDrug[] = [prednisone, methylprednisolone];

const _shape: TxGroup = { DRUGS, CLASSES, SOURCES };
void _shape;
void (null as unknown as DrugEffectOverride);
