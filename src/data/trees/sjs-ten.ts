// MedKitt — Stevens-Johnson Syndrome / Toxic Epidermal Necrolysis Consult
// Recognition → Differentiate spectrum → Culprit ID → SCORTEN → Supportive care → Disease-modifying tx → Disposition
// 7 modules. Erythema multiforme differentiation included (distinct entity, NOT on the SJS/TEN spectrum).

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const SJS_TEN_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'sjs-ten-start',
    type: 'info',
    module: 1,
    title: 'SJS / TEN: Recognition',
    body: '[SJS/TEN Steps Summary](#/info/sjs-ten-summary) — stepwise approach.\n\n**SJS/TEN is a drug-induced dermatologic emergency** — keratinocyte apoptosis with epidermal detachment, on a spectrum with toxic epidermal necrolysis. The earliest, highest-value intervention is **stopping the culprit drug**; delay correlates with mortality.\n\n**5 DO-NOT-MISS:**\n• **The rash that hurts.** Skin pain out of proportion — often *preceding* the rash — is the best early discriminator from a benign viral/drug eruption.\n• **Early SJS/TEN is routinely mistaken for a viral exanthem or erythema multiforme.** The window to change outcome is exactly when it looks benign.\n• **≥2 mucosal sites** (eyes, mouth/lips, genital) + painful eyes point away from a viral exanthem. Get ophthalmology early.\n• **Stop the drug NOW** and review all drugs started in the prior 4–8 weeks.\n• **Don’t over-resuscitate** — SJS/TEN needs ~⅔ of burn fluid.\n\nView [what these look like](#/info/sjs-ten-images): erythema multiforme target lesion, SJS mucosal involvement, TEN epidermal sloughing.',
    citation: [1, 3, 10],
    next: 'sjs-ten-exam',
    summary: 'Drug-induced emergency — the rash that hurts; stop the culprit drug now',
    safetyLevel: 'critical',
  },

  {
    id: 'sjs-ten-exam',
    type: 'info',
    module: 1,
    title: 'Bedside Findings',
    body: '**Prodrome (1–3 days before rash):** fever (often >39°C), malaise, sore throat, cough, conjunctivitis, myalgias — looks like a URI/flu.\n\n**Skin:** dusky/purpuric macules and **flat atypical targets** beginning truncally, coalescing → dusky skin → detachment. Maximum extent usually by ~4 days. Skin is **painful and tender**.\n\n**Provocative signs:**\n• **Nikolsky sign** — lateral shear on erythematous skin peels the epidermis.\n• **Asboe-Hansen (bulla-spread) sign** — pressure on an intact blister extends it laterally.\n\n**Mucosa:** ≥2 sites involved in most SJS/TEN — eyes (conjunctivitis → synechiae), oral/lips (hemorrhagic crusting), genital, pharynx/airway, GI.\n\n[EM vs SJS/TEN comparison](#/info/sjs-ten-em-compare) — distinguish the targetoid acral eruption of erythema multiforme from the truncal dusky macules of SJS/TEN.',
    citation: [3, 9],
    next: 'sjs-ten-classify',
    summary: 'URI-like prodrome → painful truncal dusky macules; Nikolsky/Asboe-Hansen positive',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: DIFFERENTIATE THE SPECTRUM
  // =====================================================================

  {
    id: 'sjs-ten-classify',
    type: 'question',
    module: 2,
    title: 'Classify the Eruption',
    body: 'Classification rests on **maximal % BSA epidermal detachment** plus lesion morphology. **Erythema multiforme is a distinct entity, NOT mild SJS** — it is infection-driven (HSV, Mycoplasma), with *typical* acral target lesions and is Nikolsky-negative.\n\nWhich picture fits?',
    options: [
      { label: 'Acral typical targets, HSV/infection trigger, Nikolsky-neg', next: 'sjs-ten-em' },
      { label: 'Truncal dusky macules, <10% BSA detachment', next: 'sjs-ten-culprit' },
      { label: 'Detachment 10–30% BSA (SJS/TEN overlap)', next: 'sjs-ten-culprit', urgency: 'critical' },
      { label: 'Detachment >30% BSA (TEN)', next: 'sjs-ten-culprit', urgency: 'critical' },
      { label: 'Child/young adult, prominent mucositis, minimal skin', next: 'sjs-ten-mirm' },
    ],
    citation: [1, 7],
    summary: '<10% = SJS · 10–30% = overlap · >30% = TEN · EM is a separate disease',
  },

  {
    id: 'sjs-ten-em',
    type: 'result',
    module: 2,
    title: 'Erythema Multiforme (distinct entity)',
    body: '**EM is not on the SJS/TEN spectrum.** It is driven by infection — **HSV is the dominant trigger** (also Mycoplasma) — not drugs.\n\n**Recognize it:** *typical* target lesions = 3 concentric zones (central dusky/bullous → pale edematous ring → outer erythema), <3 cm, well-defined, **acral** (dorsal hands/feet) spreading proximally. **Nikolsky-negative.** Self-limiting over 1–2 weeks.\n\n**EM minor** = no/minimal mucosa, no systemic symptoms. **EM major** = significant mucosal involvement + fever/arthralgia — still EM, not SJS.\n\n[See an EM target lesion](#/info/sjs-ten-images).',
    recommendation: 'Erythema multiforme: infection-driven (HSV most common), acral typical targets, Nikolsky-negative, self-limiting. Treat trigger (e.g., aciclovir for HSV-associated/recurrent EM), supportive care. This is NOT SJS/TEN — different pathophysiology, distribution, and prognosis.',
    confidence: 'recommended',
    citation: [1, 7, 16],
    summary: 'EM = HSV-driven acral typical targets, Nikolsky-neg, self-limiting — not SJS',
  },

  {
    id: 'sjs-ten-mirm',
    type: 'result',
    module: 2,
    title: 'MIRM / RIME',
    body: '**Mycoplasma-induced rash and mucositis (MIRM)** — and the broader **reactive infectious mucocutaneous eruption (RIME)** — is a syndrome **distinct from both SJS/TEN and EM** (Canavan 2015).\n\n**Picture:** prominent mucositis (≥2 sites) with **minimal/absent skin** (<10% BSA, scattered atypical targets or vesiculobullous), in **children/young adults**, after Mycoplasma or another respiratory pathogen (C. pneumoniae, influenza, rhinovirus, enterovirus, SARS-CoV-2), with **no culprit drug**.\n\n**Prognosis is good.** Management is supportive ± treating the infection — not the drug-withdrawal/burn pathway.',
    recommendation: 'MIRM/RIME: infection-triggered (classically Mycoplasma), prominent mucositis with minimal skin, no culprit drug, good prognosis. Treat the infection + supportive mucosal care. Distinguish from SJS/TEN (drug-driven, skin-dominant).',
    confidence: 'recommended',
    citation: [8],
    summary: 'Infection-triggered mucositis + minimal skin, no drug, good prognosis',
  },

  // =====================================================================
  // MODULE 3: CULPRIT IDENTIFICATION
  // =====================================================================

  {
    id: 'sjs-ten-culprit',
    type: 'info',
    module: 3,
    title: 'Identify & Stop the Culprit',
    body: '**STOP the culprit drug immediately** — earlier withdrawal of short-half-life culprits lowers mortality. Review **all** drugs started in the prior **4–8 weeks** (typical latency **4–28 days**; anticonvulsants up to ~8 weeks).\n\n[High-risk culprit drugs](#/info/sjs-ten-culprits) — full list with notoriety.\n\n**Highest-risk (RegiSCAR/EuroSCAR):** allopurinol, carbamazepine, lamotrigine, phenytoin, phenobarbital, **sulfonamide antibiotics (TMP-SMX)**, sulfasalazine, nevirapine, oxicam NSAIDs, abacavir.\n\nUse the **ALDEN algorithm** for formal causality when multiple drugs are in play. Then risk-stratify.',
    citation: [4, 5, 6, 10],
    next: 'sjs-ten-scorten-node',
    summary: 'Stop the drug now; review last 4–8 weeks; allopurinol/anticonvulsants/sulfa/NSAIDs',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 4: SEVERITY — SCORTEN
  // =====================================================================

  {
    id: 'sjs-ten-scorten-node',
    type: 'info',
    module: 4,
    title: 'Severity: SCORTEN',
    body: 'Calculate **SCORTEN** — 7 variables, 1 point each: age >40, malignancy, HR >120, BSA detachment >10%, BUN >28 mg/dL, glucose >252 mg/dL, bicarbonate <20 mEq/L.\n\nMortality bands: **0–1 ≈3% · 2 ≈12% · 3 ≈35% · 4 ≈58% · ≥5 ≈90%.**\n\n**Score on day 1 AND day 3** — a single early score underestimates risk for scores ≥3 (BSA and HR are unstable early and it does not capture evolving sepsis). A low early score never justifies under-treating.',
    calculatorLinks: [{ id: 'scorten', label: 'SCORTEN Calculator' }],
    citation: [2, 11],
    next: 'sjs-ten-supportive',
    summary: '7 variables, day 1 + day 3; ≥3 → high mortality; low score ≠ under-treat',
  },

  // =====================================================================
  // MODULE 5: ED SUPPORTIVE CARE
  // =====================================================================

  {
    id: 'sjs-ten-supportive',
    type: 'info',
    module: 5,
    title: 'ED Supportive Care',
    body: '**This is acute skin failure — manage like a burn, but with less fluid.**\n\n• **Fluids:** estimate first-24h crystalloid at **2 mL/kg × %BSA** (≈⅔ Parkland), then **titrate to urine output 0.5–1 mL/kg/hr.** Over-resuscitation → pulmonary/intestinal edema. Cannulate through non-lesional skin where possible.\n• **Temperature:** warm ambient (30–32°C) — thermoregulation is lost.\n• **Eyes:** **urgent ophthalmology** — ocular disease is the leading cause of long-term morbidity. Lubricant drops, daily review.\n• **Mucosa:** oral/GU/airway care; mouthwashes, topical anesthetics; watch the airway.\n• **Wounds:** leave detached epidermis as a biologic dressing; non-adherent dressings; **avoid silver sulfadiazine (it is a sulfonamide).**\n• **Infection:** surveillance cultures — **NO prophylactic antibiotics** (sepsis is the leading killer, but prophylaxis breeds resistance).\n• **Analgesia + early high-protein nutrition.**',
    calculatorLinks: [{ id: 'ten-fluid', label: 'TEN Fluid Estimate' }],
    citation: [10],
    next: 'sjs-ten-dmt',
    summary: 'Stop drug · ⅔ Parkland to UOP 0.5–1 · urgent ophtho · no prophylactic abx',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 6: DISEASE-MODIFYING THERAPY
  // =====================================================================

  {
    id: 'sjs-ten-dmt',
    type: 'info',
    module: 6,
    title: 'Disease-Modifying Therapy',
    body: '**Adjuvant therapy is dermatology-guided and the evidence base is weak** (rare disease, mostly observational). None is mandated standard-of-care; supportive care + drug withdrawal remain the backbone.\n\n• **Cyclosporine 3–5 mg/kg/day** — most-favored adjunct; meta-analyses show a mortality signal but data are observational with publication bias.\n• **Etanercept / TNF-α inhibitors** — emerging; one open-label RCT (Wang 2018) showed faster healing and less GI bleeding vs corticosteroids.\n• **IVIG 2–3 g/kg** — mixed/largely neutral evidence.\n• **Corticosteroids** — controversial; short-course early *may* help but infection/healing risk; most meta-analyses neutral.\n\nDo not start adjuvant immunomodulators in the ED without dermatology input.',
    citation: [12, 13, 14, 15],
    next: 'sjs-ten-dispo',
    summary: 'Derm-guided, weak evidence; cyclosporine favored; etanercept emerging',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'sjs-ten-dispo',
    type: 'result',
    module: 7,
    title: 'Disposition',
    body: '**Any >10% BSA epidermal loss = ICU / specialist unit** (acute skin failure: thermoregulatory dysfunction, insensible loss, hemodynamic instability, sepsis risk).\n\n**Burn-center transfer** for TEN (>30% BSA) and/or deterioration — extension of detachment, wound conversion, local sepsis, delayed healing.\n\n**Multidisciplinary team:** dermatology (lead + adjuvant decision), **ophthalmology (urgent)**, urology/gynecology (GU mucosa), burn surgery, ICU/critical care, ± pulmonology for airway.',
    recommendation: 'Stop the culprit drug. >10% BSA → ICU/specialist unit; TEN → burn-center transfer. Engage dermatology, urgent ophthalmology, and burn surgery. Supportive care (⅔-Parkland fluids to UOP, no prophylactic antibiotics) is the backbone; adjuvant immunomodulators are derm-guided.',
    confidence: 'recommended',
    citation: [10],
    summary: '>10% BSA → ICU; TEN → burn center; multidisciplinary, urgent ophthalmology',
  },
];

export const SJS_TEN_MODULE_LABELS = [
  'Recognition',
  'Differentiate Spectrum',
  'Culprit Drug',
  'Severity (SCORTEN)',
  'Supportive Care',
  'Disease-Modifying Tx',
  'Disposition',
];

export const SJS_TEN_CITATIONS: Citation[] = [
  { num: 1, text: 'Bastuji-Garin S, Rzany B, Stern RS, Shear NH, Naldi L, Roujeau JC. Clinical classification of cases of toxic epidermal necrolysis, Stevens-Johnson syndrome, and erythema multiforme. Arch Dermatol. 1993;129(1):92-96.' },
  { num: 2, text: 'Bastuji-Garin S, Fouchard N, Bertocchi M, Roujeau JC, Revuz J, Wolkenstein P. SCORTEN: a severity-of-illness score for toxic epidermal necrolysis. J Invest Dermatol. 2000;115(2):149-153.' },
  { num: 3, text: 'Schwartz RA, McDonough PH, Lee BW. Toxic epidermal necrolysis: Part I. Clinical features, systemic manifestations, etiology, and immunopathogenesis. J Am Acad Dermatol. 2013;69(2):173.e1-13.' },
  { num: 4, text: 'Mockenhaupt M, Viboud C, Dunant A, et al. Stevens-Johnson syndrome and toxic epidermal necrolysis: assessment of medication risks (EuroSCAR study). J Invest Dermatol. 2008;128(1):35-44.' },
  { num: 5, text: 'Lonjou C, Borot N, Sekula P, et al. (RegiSCAR). A European study of HLA-B in Stevens-Johnson syndrome and toxic epidermal necrolysis related to five high-risk drugs. Pharmacogenet Genomics. 2008;18(2):99-107.' },
  { num: 6, text: 'Sassolas B, Haddad C, Mockenhaupt M, et al. ALDEN, an algorithm for assessment of drug causality in Stevens-Johnson syndrome and toxic epidermal necrolysis. Clin Pharmacol Ther. 2010;88(1):60-68.' },
  { num: 7, text: 'Roujeau JC. Erythema multiforme: a distinct entity. (Bastuji-Garin 1993 classification; DermNet NZ erythema multiforme overview.)' },
  { num: 8, text: 'Canavan TN, Mathes EF, Frieden I, Shinkai K. Mycoplasma pneumoniae-induced rash and mucositis as a syndrome distinct from Stevens-Johnson syndrome and erythema multiforme: a systematic review. J Am Acad Dermatol. 2015;72(2):239-245.' },
  { num: 9, text: 'Harr T, French LE. Toxic epidermal necrolysis and Stevens-Johnson syndrome. Orphanet J Rare Dis. 2010;5:39.' },
  { num: 10, text: 'Creamer D, Walsh SA, Dziewulski P, et al. U.K. guidelines for the management of Stevens-Johnson syndrome / toxic epidermal necrolysis in adults 2016. Br J Dermatol. 2016;174(6):1194-1227.' },
  { num: 11, text: 'Guégan S, Bastuji-Garin S, Poszepczynska-Guigné E, Roujeau JC, Revuz J. Performance of the SCORTEN during the first five days of hospitalization. J Invest Dermatol. 2006;126(2):272-276.' },
  { num: 12, text: 'González-Herrada C, Rodríguez-Martín S, Cachafeiro L, et al. Cyclosporine use in epidermal necrolysis is associated with an important mortality reduction. J Invest Dermatol. 2017;137(10):2092-2100.' },
  { num: 13, text: 'Wang CW, Yang LY, Chen CB, et al. Randomized, controlled trial of a TNF-α antagonist (etanercept) in severe cutaneous adverse reactions. J Clin Invest. 2018;128(3):985-996.' },
  { num: 14, text: 'Zimmermann S, Sekula P, Venhoff M, et al. Systemic immunomodulating therapies for Stevens-Johnson syndrome and toxic epidermal necrolysis: a systematic review and meta-analysis. JAMA Dermatol. 2017;153(6):514-522.' },
  { num: 15, text: 'Sekula P, Dunant A, Mockenhaupt M, et al. (RegiSCAR). Comprehensive survival analysis of a cohort of patients with Stevens-Johnson syndrome and toxic epidermal necrolysis. J Invest Dermatol. 2013;133(5):1197-1204.' },
  { num: 16, text: 'Sokumbi O, Wetter DA. Clinical features, diagnosis, and treatment of erythema multiforme: a review for the practicing dermatologist. Int J Dermatol. 2012;51(8):889-902.' },
];

export const SJS_TEN_NODE_COUNT = SJS_TEN_NODES.length;
