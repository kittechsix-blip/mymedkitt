# Dead Drug Links — Drafted `DrugEntry` Records for Review

**Author:** Dr. Kitlowski, CMO
**Date:** 2026-08-01
**Repo:** `/Users/kittechsix/Developer/myMedKitt` (LIVE v1)
**Status:** DRAFT. Nothing in this file has been applied. `src/data/drug-store.ts` is untouched.

## Why this file exists

35 drug ids are linked from consult trees and info pages but do not exist in `src/data/drug-store.ts`.
`showDrugModal` returns `false` on a miss and every caller ignores the return value, so the clinician taps
a drug name mid-consult and nothing happens. No modal, no error, no feedback.

I found **49 occurrences**, not 47. The two extra are duplicate links on a single source line
(`diarrhea.ts:237` links fidaxomicin twice, `oncological-emergencies.ts:631` links tocilizumab twice).
A per-line dedupe would report 47.

## Ground rules I worked under

- **Every dose here is a number a clinician will act on.** That sits in the patient-safety tier, above
  my auto-fix authority and above the Dr. Kitlowski autopilot rule. Nothing ships without Andy's signature.
- **I drafted to the indication hint the link carries**, not to a generic monograph. Where the consult body
  already states a dose, the drug entry matches it — except where the consult's number is wrong, which I
  call out in §Findings.
- Every mg/kg dose carries a `weightCalc`. Rate-titrated mcg/kg/min infusions do not, per the repo rule.
- Written in my own words. No proprietary text copied.

---

## Summary table

Rank 1 = antidote/reversal, fails at the worst possible moment. Rank 2 = time-critical. Rank 3 = routine.

| # | id | Referencing consult(s) | Rank | Recommendation |
|---|----|------------------------|------|----------------|
| 1 | `andexanet-alfa` | anticoag-reversal | 1 | **Author entry** |
| 2 | `digoxin-immune-fab` | unknown-ingestion (Stop page) | 1 | **Repoint link → `digifab`** (entry already exists) |
| 3 | `pralidoxime` | unknown-ingestion-hub, unknown-ingestion Stop page | 1 | **Author entry** |
| 4 | `cyproheptadine` | unknown-ingestion-hub, unknown-ingestion Stop page | 1 | **Author entry** |
| 5 | `leucovorin` | toxic-alcohols | 1 | **Author entry** + FLAG consult dose |
| 6 | `folic-acid` | toxic-alcohols (×2) | 1 | **Author entry** |
| 7 | `tocilizumab` | oncological-emergencies (×3), info-pages CRS ladder (×2) | 2 | **Author entry** + FLAG missing peds dose |
| 8 | `papaverine` | mesenteric-ischemia | 2 | **Author entry** |
| 9 | `nitroprusside` | peds-hypertensive-emergency | 2 | **Author entry** |
| 10 | `albuterol` | info-pages TLS electrolyte page | 2 | **Repoint link → `albuterol-neb`** (entry already exists, correct hyperK dose) |
| 11 | `patiromer` | info-pages TLS electrolyte page | 2 | **Author entry** |
| 12 | `sodium-polystyrene-sulfonate` | info-pages TLS electrolyte page | 2 | **Author entry** + FLAG: consult should not be recommending this |
| 13 | `fidaxomicin` | diarrhea | 2 | **Author entry** |
| 14 | `cefoxitin` | pid | 2 | **Author entry** |
| 15 | `cefotetan` | pid | 2 | **Author entry** + availability note |
| 16 | `let-gel` | laceration-repair (×2) | 2 | **Author entry** (it is a real formulary item; see §Judgment calls) |
| 17 | `proparacaine` | corneal-fb-removal | 2 | **Author entry** |
| 18 | `tetracaine` | corneal-fb-removal | 2 | **Author entry** |
| 19 | `cyclopentolate` | corneal-fb-removal (×2) | 3 | **Author entry** |
| 20 | `erythromycin-ointment` | corneal-fb-removal | 3 | **Author entry** (cannot alias — `erythromycin` id is the prokinetic) |
| 21 | `polymyxin-trimethoprim` | corneal-fb-removal | 3 | **Author entry** |
| 22 | `ciprofloxacin-ophthalmic` | corneal-fb-removal | 3 | **Author entry** (systemic `ciprofloxacin` has no ophthalmic dosing) |
| 23 | `moxifloxacin-ophthalmic` | corneal-fb-removal | 3 | **Author entry** (systemic `moxifloxacin` is the TB entry) |
| 24 | `sulfamethoxazole-trimethoprim` | oncological-emergencies, info-pages irAE page | 3 | **Author entry** |
| 25 | `amlodipine` | peds-hypertensive-emergency | 3 | **Author entry** |
| 26 | `aripiprazole` | acute-psychosis | 3 | **Author entry** |
| 27 | `sertraline` | ptsd-screening | 3 | **Author entry** |
| 28 | `paroxetine` | ptsd-screening | 3 | **Author entry** |
| 29 | `venlafaxine-xr` | ptsd-screening | 3 | **Author entry** |
| 30 | `prazosin` | ptsd-screening | 3 | **Author entry** |
| 31 | `hydroxyzine` | ptsd-screening (×2) | 3 | **Author entry** |
| 32 | `trazodone` | ptsd-screening (×2) | 3 | **Author entry** |
| 33 | `mirtazapine` | ptsd-screening | 3 | **Author entry** |
| 34 | `diclofenac` | cervical-spine-nontraumatic (×2) | 3 | **Author entry** |
| 35 | `oxygen` | acute-jaundice-hub | 3 | **Do NOT author. Remove the link.** |

**Totals:** 32 entries drafted · 2 links repointed to existing entries · 1 link removed.

---

## PART 1 — Rank 1: Antidotes and reversal agents

### 1. `andexanet-alfa` — Andexxa

**Reference:** `src/data/trees/anticoag-reversal.ts:169`, node "Factor Xa Inhibitor Reversal" (`type: 'result'`, module 2).
Hint: `doac reversal`. The node already carries the full low/high dose split and the ANNEXA-I harm data.
This is the single worst tap to fail: a patient with a Xa-inhibitor ICH, and the antidote link is dead.

```typescript
const ANDEXANET_ALFA: DrugEntry = {
  id: 'andexanet-alfa',
  name: 'Andexanet alfa (Andexxa)',
  genericName: 'Coagulation factor Xa (recombinant), inactivated-zhzo',
  drugClass: 'Antidote — recombinant modified factor Xa decoy',
  route: 'IV',
  indications: ['Factor Xa inhibitor reversal — life-threatening or uncontrolled bleeding', 'Apixaban- or rivaroxaban-associated intracranial hemorrhage'],
  dosing: [
    {
      indication: 'DOAC reversal — LOW DOSE',
      regimen: '**400 mg IV bolus at 30 mg/min, then 4 mg/min infusion for up to 120 minutes.**\n\n**USE LOW DOSE WHEN:**\n• Last rivaroxaban dose ≤10 mg, OR\n• Last apixaban dose ≤5 mg, OR\n• Last dose of any Xa inhibitor was ≥8 hours ago (any dose size)\n\n**TIMING:** Start within 2 hours of the bolus decision. Anti-Xa activity rebounds after the infusion ends — do not delay definitive hemostasis waiting on the drug.',
    },
    {
      indication: 'DOAC reversal — HIGH DOSE',
      regimen: '**800 mg IV bolus at 30 mg/min, then 8 mg/min infusion for up to 120 minutes.**\n\n**USE HIGH DOSE WHEN:**\n• Last rivaroxaban dose >10 mg, OR\n• Last apixaban dose >5 mg, OR\n• Dose unknown AND last dose within 8 hours\n\n**TOTAL EXPOSURE:** 800 mg bolus + up to 960 mg infusion.',
    },
    {
      indication: 'Xa-associated intracranial hemorrhage',
      regimen: '**Dose per the low/high algorithm above.** AHA/ASA Class I recommendation for Xa-inhibitor-associated ICH where andexanet is on formulary.\n\n**ANNEXA-I (NEJM 2024, n=530):**\n• Superior hemostatic efficacy vs usual care (mostly 4F-PCC); trial stopped early for efficacy.\n• **NO mortality benefit** — 30-day death 27.8% vs 25.5%.\n• **Thrombotic events 10.3% vs 5.6%**; ischemic stroke 6.5% vs 1.5%.\n\n**PRACTICAL:** Most US centers default to 4F-PCC on cost (~$25,000 vs ~$5,000). Reserve andexanet for ICH with the drug on formulary and no acute thrombotic contraindication.',
    },
    {
      indication: 'Not indicated',
      regimen: '**Do NOT use for:**\n• Reversal of dabigatran — use [idarucizumab](#/drug/idarucizumab/dabigatran reversal).\n• Reversal of unfractionated or low-molecular-weight heparin — andexanet binds and inactivates heparin-antithrombin, so it is NOT a heparin reversal agent and it WILL interfere with heparin anticoagulation afterward.\n• Routine bleeding that is controllable by local measures.',
    },
  ],
  contraindications: [
    'No absolute contraindication in life-threatening Xa-inhibitor bleeding',
  ],
  cautions: [
    'Boxed warning: arterial and venous thromboembolic events, ischemic stroke, cardiac arrest, sudden death',
    'Resume therapeutic anticoagulation as soon as clinically indicated — thrombotic risk is highest in the untreated post-reversal window',
    'Interferes with heparin anticoagulation — heparin will NOT work reliably for hours after andexanet, which matters if the patient needs cardiopulmonary bypass or urgent endovascular therapy',
    'Anti-Xa assays are unreliable for monitoring reversal — do not titrate to anti-Xa',
    'Anti-Xa activity rebounds toward baseline within ~2 hours of ending the infusion',
    'Cost and formulary availability are real constraints; know your institution\'s stocking before the patient arrives',
  ],
  monitoring: 'Serial neuro exams and repeat head CT for ICH. Continuous telemetry. Watch for thrombotic events (stroke, MI, DVT/PE) for at least 30 days. Do NOT use anti-Xa levels to judge adequacy of reversal.',
  notes: 'A catalytically inactive recombinant factor Xa decoy — it binds and sequesters the Xa inhibitor rather than replacing clotting factors. Because it does not add factor, it will not change a PCC-style factor assay, and it will not correct anticoagulation from any non-Xa mechanism. Reversal is measured clinically and radiographically, not by lab number.',
  citations: [
    'Andexxa (coagulation factor Xa [recombinant], inactivated-zhzo) prescribing information. AstraZeneca/Alexion; 2024.',
    'Connolly SJ, Sharma M, Cohen AT, et al. Andexanet for Factor Xa Inhibitor-Associated Acute Intracerebral Hemorrhage (ANNEXA-I). N Engl J Med. 2024;390(19):1745-1755.',
    'Greenberg SM, Ziai WC, Cordonnier C, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage. Stroke. 2022;53(7):e282-e361.',
  ],
};
```

**Dose sources:** low/high dose regimens and infusion rates are verbatim-equivalent to the Andexxa FDA
prescribing information dosing table. Outcome figures are from ANNEXA-I. Class I ICH recommendation is
AHA/ASA 2022 ICH guideline.

---

### 2. `digoxin-immune-fab` — DO NOT AUTHOR. Repoint the link.

**Reference:** `src/data/info-pages.ts:24604`, the unknown-ingestion "Stop / resus-first" page.

An entry for this drug **already exists** under the id `digifab` (`DIGIFAB`), with all three dosing
strategies (known-ingestion formula, empiric chronic, level-based formula), the right cautions, and
Goldfrank's as a source. Authoring a second entry would fork the content and guarantee drift.

**Fix:** change the link, not the drug store.

```
- [digoxin immune fab](#/drug/digoxin-immune-fab/dosing)
+ [digoxin immune fab](#/drug/digifab/dosing)
```

The existing `digifab` entry has no dosing subcategory literally named "dosing", so the indication hint
will not match anything. Two options, Andy's call:
- Use `#/drug/digifab/chronic` — matches "Chronic digoxin toxicity", the right default for an
  unknown-ingestion page where you rarely know the swallowed milligrams.
- Or add `'digoxin toxicity'` keywords and leave the hint generic.

I recommend the first. **No new dose is being written here, so this one needs no clinical sign-off** —
it is a link repair.

---

### 3. `pralidoxime` — 2-PAM

**Reference:** `src/data/trees/unknown-ingestion-hub.ts:113` (Cholinergic/Organophosphate result node) and
`src/data/info-pages.ts:24604` (Stop page). Hint: `dosing`. The consult states "1-2 g IV over 30 min for
organophosphate, then infusion" — correct, but it never says what the infusion is. The drug entry has to.

```typescript
const PRALIDOXIME: DrugEntry = {
  id: 'pralidoxime',
  name: 'Pralidoxime (2-PAM, Protopam)',
  genericName: 'Pralidoxime chloride',
  drugClass: 'Antidote — cholinesterase reactivator (oxime)',
  route: 'IV / IM (autoinjector)',
  indications: ['Organophosphate poisoning', 'Nerve agent exposure (sarin, VX, soman)', 'Anticholinesterase overdose (e.g. neostigmine, pyridostigmine)'],
  dosing: [
    {
      indication: 'Organophosphate poisoning — adult (WHO regimen)',
      regimen: '**LOAD:** 30 mg/kg IV over 20-30 minutes (usual adult load **1-2 g**).\n\n**THEN INFUSION:** 8 mg/kg/hr continuous IV (usual adult rate **500 mg/hr**).\n\n**CONTINUE:** at least 24 hours, and until the patient has needed no atropine for 12-24 hours and is off ventilator support.\n\n**GIVE ATROPINE FIRST.** [Atropine](#/drug/atropine/cholinergic) is the life-saving drug; pralidoxime is the adjunct. Never delay atropine to mix pralidoxime.\n\n**BOLUS TOO FAST = harm** — rapid push causes tachycardia, laryngospasm, muscle rigidity, and hypertension.',
      weightCalc: { dosePerKg: 30, unit: 'mg', maxDose: 2000, label: 'Loading dose (30 mg/kg, cap 2 g)' },
    },
    {
      indication: 'Organophosphate poisoning — pediatric',
      regimen: '**LOAD:** 20-50 mg/kg IV over 20-30 minutes, **max 2 g per dose**.\n\n**THEN INFUSION:** 10-20 mg/kg/hr continuous IV.\n\nSame endpoint as adults: continue until atropine-free for 12-24 hours and weaned from ventilation.',
      weightCalc: { dosePerKg: 25, unit: 'mg', maxDose: 2000, label: 'Pediatric load (mid-range 25 mg/kg, cap 2 g)' },
    },
    {
      indication: 'Nerve agent — field / autoinjector',
      regimen: '**DuoDote / ATNAA autoinjector:** atropine 2.1 mg + pralidoxime 600 mg IM, into the outer thigh. Repeat q15 min × up to 3 total for severe symptoms.\n\n**Mark I kit:** atropine 2 mg + pralidoxime 600 mg as two separate autoinjectors.\n\nFor mass-casualty or prehospital use where IV access is impractical.',
    },
    {
      indication: 'When NOT to prioritize it',
      regimen: '**Carbamate poisoning:** generally NOT required. Carbamate-inhibited cholinesterase spontaneously reactivates within hours. Pralidoxime is not harmful but is usually unnecessary; atropine alone suffices.\n\n**Aged enzyme:** once the organophosphate-enzyme bond has "aged" (hours for most agents, ~2 minutes for soman), pralidoxime cannot reactivate it. Give it early or the window closes.\n\n**Evidence caveat:** the only placebo-controlled RCT of the WHO regimen showed no clinical benefit and a trend toward harm. Practice remains to give it, but do not let it displace atropine, decontamination, or airway management.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to pralidoxime',
  ],
  cautions: [
    'ATROPINE FIRST — pralidoxime does not treat the muscarinic crisis that is killing the patient',
    'Rapid IV administration causes tachycardia, laryngospasm, muscle rigidity, hypertension — give the load over 20-30 minutes',
    'Renal elimination — reduce the infusion rate in renal impairment',
    'Can transiently worsen weakness in myasthenia gravis',
    'Decontaminate the patient AND protect staff — secondary exposure through skin and clothing is real',
    'Intermediate syndrome (proximal weakness, respiratory failure) appears 24-96 hours post-exposure regardless of oxime therapy — plan for prolonged ventilation',
  ],
  monitoring: 'Tracheobronchial secretions (the atropine endpoint), respiratory effort and vital capacity, serial red-cell and plasma cholinesterase if available, renal function, continuous ECG.',
  notes: 'Pralidoxime cleaves the organophosphate off acetylcholinesterase, restoring the enzyme — it addresses the nicotinic (weakness, fasciculation, respiratory muscle failure) component that atropine cannot touch. Its value depends entirely on being given before the enzyme ages. Doses are expressed as pralidoxime chloride; other salts are not interchangeable milligram-for-milligram.',
  citations: [
    'Protopam Chloride (pralidoxime chloride) for injection prescribing information. Baxter Healthcare; 2010.',
    'World Health Organization. Clinical management of acute pesticide intoxication: prevention of suicidal behaviours. Geneva: WHO; 2008.',
    'Eddleston M, Buckley NA, Eyer P, Dawson AH. Management of acute organophosphorus pesticide poisoning. Lancet. 2008;371(9612):597-607.',
    'Buckley NA, Eddleston M, Li Y, Bevan M, Robertson J. Oximes for acute organophosphate pesticide poisoning. Cochrane Database Syst Rev. 2011;(2):CD005085.',
  ],
};
```

**Dose sources:** 30 mg/kg load over 20-30 min then 8 mg/kg/hr is the WHO regimen, restated in Eddleston
Lancet 2008. Adult 1-2 g / 500 mg/hr equivalents from the same. Autoinjector contents from the DuoDote
label. The negative-RCT caveat is Cochrane 2011.

**Note on `weightCalc` for the pediatric load:** the source range is 20-50 mg/kg. The schema takes a single
number, so I put the mid-range 25 mg/kg in the calculator and left the full range in the regimen text.
Andy should confirm he is comfortable with the calculator returning a mid-range number rather than the
low end.

---

### 4. `cyproheptadine`

**Reference:** `src/data/trees/unknown-ingestion-hub.ts:135` (Serotonin Syndrome result node) and
`src/data/info-pages.ts:24604` (Stop page). Hint: `dosing`. The consult says "12 mg PO/NGT then 2 mg q2h
for moderate-severe cases" — that matches the Boyer NEJM regimen and is what I drafted to.

```typescript
const CYPROHEPTADINE: DrugEntry = {
  id: 'cyproheptadine',
  name: 'Cyproheptadine (Periactin)',
  genericName: 'Cyproheptadine hydrochloride',
  drugClass: 'First-generation antihistamine with 5-HT2A antagonist activity',
  route: 'PO / NG only (no parenteral form)',
  indications: ['Serotonin syndrome (moderate-severe) — off-label antidote'],
  dosing: [
    {
      indication: 'Serotonin syndrome — adult',
      regimen: '**INITIAL:** 12 mg PO or via NG tube.\n\n**THEN:** 2 mg PO/NG every 2 hours while symptoms continue.\n\n**MAINTENANCE once controlled:** 8 mg PO/NG every 6 hours.\n\n**CEILING:** ~32 mg in 24 hours (approximately 85-95% of 5-HT2A receptors occupied at that exposure).\n\n**ORDER OF OPERATIONS — do not invert:**\n• Stop every serotonergic agent.\n• Benzodiazepines for agitation, rigidity, and clonus. These do more than cyproheptadine does.\n• Aggressive external cooling. **Antipyretics do not work** — the hyperthermia is muscular, not hypothalamic.\n• Cyproheptadine as adjunct.\n• Hyperthermia >41.5°C not controlled by sedation: intubate, paralyze with a NON-depolarizing agent, and cool. Do not reach for cyproheptadine here — it is oral-only and far too slow.',
    },
    {
      indication: 'Serotonin syndrome — pediatric',
      regimen: '**0.25 mg/kg/day PO/NG divided every 6 hours**, maximum **12 mg/day**.\n\nSame sequencing rule as adults: benzodiazepines and cooling first.',
      weightCalc: { dosePerKg: 0.25, unit: 'mg', maxDose: 12, dailyDivided: 4 },
    },
  ],
  contraindications: [
    'Concurrent MAO inhibitor therapy (per product labeling)',
    'Angle-closure glaucoma',
    'Bladder neck or gastric outlet obstruction, stenosing peptic ulcer',
    'Neonates and premature infants',
    'Unprotected airway with no NG access — there is no IV formulation',
  ],
  cautions: [
    'ORAL/NG ONLY. In an intubated or obtunded patient it must go down a tube. If you cannot deliver it, move on — benzodiazepines and cooling are the treatment that matters.',
    'Sedating and anticholinergic — will confound serial mental status exams, which are your severity marker',
    'Anticholinergic load can worsen hyperthermia by blocking sweating; do not use it as a substitute for active cooling',
    'Evidence base is case reports and small series only. No RCT. Benefit is plausible but unproven.',
    'Elderly: additive anticholinergic burden, delirium risk',
  ],
  monitoring: 'Temperature continuously (core, not oral), clonus and rigidity on serial exam, mental status, CK for rhabdomyolysis, creatinine, LFTs, coagulation studies if hyperthermic.',
  notes: 'Competes with serotonin at 5-HT2A, the receptor most implicated in the hyperthermic/neuromuscular phenotype. Its role is genuinely adjunctive: the interventions that change outcome are stopping the offending drug, benzodiazepines, cooling, and — in the severe case — paralysis and ventilation. Do not let a cyproheptadine order become the reason cooling was late.',
  citations: [
    'Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med. 2005;352(11):1112-1120.',
    'Graudins A, Stearman A, Chan B. Treatment of the serotonin syndrome with cyproheptadine. J Emerg Med. 1998;16(4):615-619.',
    'Periactin (cyproheptadine hydrochloride) tablets and syrup prescribing information.',
  ],
};
```

**Dose sources:** 12 mg then 2 mg q2h, 8 mg q6h maintenance, and the ~32 mg/24h ceiling are the Boyer NEJM
2005 regimen, which is the near-universal reference for this indication. Pediatric 0.25 mg/kg/day divided
q6h (max 12 mg/day) is the standard toxicology pediatric conversion.

**Honesty flag:** this drug has **no FDA-approved indication for serotonin syndrome**. Every dose above is
off-label and derives from a review article and case series (Tier 3/4 on my source hierarchy). There is no
Tier 1 guideline dose to cite, because no society has issued one. I have said so in `cautions` and `notes`
rather than dressing it up.

---

### 5. `leucovorin` — folinic acid

**Reference:** `src/data/trees/toxic-alcohols.ts:303`, "Cofactor Therapy" node. Hint: `methanol`.

**⚠️ The consult and the literature disagree, and I did not silently resolve it.** The consult says
"**50-100 mg IV Q4H**". Every source I could reach gives **1 mg/kg up to a 50 mg maximum per dose**,
q4-6h. Some references stretch to 50-70 mg. I could not source a 100 mg/dose figure. I drafted the entry
to the sourced number and flagged the consult text in §Findings — I am not going to write 100 mg into the
drug store just because the tree says so, and I am not going to change the tree, because that is Andy's call.

```typescript
const LEUCOVORIN: DrugEntry = {
  id: 'leucovorin',
  name: 'Leucovorin (folinic acid)',
  genericName: 'Leucovorin calcium',
  drugClass: 'Reduced folate cofactor',
  route: 'IV',
  indications: ['Methanol poisoning — formate clearance cofactor', 'Methotrexate rescue', 'Trimethoprim / pyrimethamine-induced marrow suppression'],
  dosing: [
    {
      indication: 'Methanol poisoning',
      regimen: '**1 mg/kg IV, maximum 50 mg per dose, every 4-6 hours.**\n\n**PREFERRED OVER FOLIC ACID** when available — leucovorin is already reduced and does not require dihydrofolate reductase to become active. In a sick, acidotic, possibly folate-depleted alcoholic patient, that matters.\n\n**CONTINUE:** until methanol level <20 mg/dL and the acidosis has cleared.\n\n**WHAT IT DOES AND DOES NOT DO:**\n• Accelerates formate → CO2 + H2O via the tetrahydrofolate pathway.\n• It is a **cofactor, not a treatment.** [Fomepizole](#/drug/fomepizole/methanol) blocks production, hemodialysis removes what is already there. Leucovorin is the third-string player. Never let it delay either.',
      weightCalc: { dosePerKg: 1, unit: 'mg', maxDose: 50 },
    },
    {
      indication: 'Methotrexate rescue',
      regimen: 'Dose and interval are entirely protocol- and level-driven. **Consult toxicology or oncology** — do not dose this from a reference card. For high-dose methotrexate with delayed clearance, doses escalate substantially above the methanol dosing above.\n\nGlucarpidase is the option when methotrexate levels remain toxic despite leucovorin and renal failure prevents clearance.',
    },
  ],
  contraindications: [
    'Pernicious anemia / B12-deficiency megaloblastic anemia (corrects the hematologic picture while neurologic damage progresses)',
  ],
  cautions: [
    'Do not substitute for fomepizole or hemodialysis in methanol poisoning — it is adjunctive',
    'Frequently unavailable from the ED Pyxis; know where your pharmacy stocks it before you need it',
    'In methotrexate toxicity the dosing is a different problem entirely — do not extrapolate the methanol dose',
  ],
  monitoring: 'Serum methanol level, anion gap, arterial or venous pH and bicarbonate, visual acuity and fundoscopic exam (formate optic neuropathy), renal function.',
  notes: 'Folinic acid bypasses the dihydrofolate reductase step that folic acid requires, so it works immediately in a folate-depleted patient. Preference for leucovorin over folic acid in methanol poisoning is consistent across toxicology sources, though no head-to-head human trial exists — the preference is mechanistic.',
  citations: [
    'Barceloux DG, Bond GR, Krenzelok EP, Cooper H, Vale JA. American Academy of Clinical Toxicology practice guidelines on the treatment of methanol poisoning. J Toxicol Clin Toxicol. 2002;40(4):415-446.',
    'Roberts DM, Yates C, Megarbane B, et al. Recommendations for the role of extracorporeal treatments in the management of acute methanol poisoning (EXTRIP). Crit Care Med. 2015;43(2):461-472.',
    'Leucovorin calcium for injection prescribing information.',
  ],
};
```

---

### 6. `folic-acid`

**Reference:** `src/data/trees/toxic-alcohols.ts:79` (Severe Methanol Toxicity — Emergent Treatment) and
`:303` (Cofactor Therapy). Hint: `methanol`. Both say 50 mg IV q4-6h, which is sourced and correct.

```typescript
const FOLIC_ACID: DrugEntry = {
  id: 'folic-acid',
  name: 'Folic acid (vitamin B9)',
  genericName: 'Folic acid',
  drugClass: 'Water-soluble B vitamin / folate precursor',
  route: 'IV / PO',
  indications: ['Methanol poisoning — formate clearance cofactor', 'Folate deficiency / macrocytic anemia', 'Chronic alcohol use — nutritional repletion'],
  dosing: [
    {
      indication: 'Methanol poisoning',
      regimen: '**50 mg IV every 4-6 hours** (equivalently, 1 mg/kg IV up to 50 mg per dose).\n\n**USE WHEN LEUCOVORIN IS UNAVAILABLE.** [Leucovorin (folinic acid)](#/drug/leucovorin/methanol) is preferred because it is already in the reduced, active form. Give folic acid if leucovorin cannot be obtained promptly — do not wait for pharmacy to find leucovorin.\n\n**CONTINUE:** until methanol <20 mg/dL and acidosis resolved.\n\n**Adjunct only.** [Fomepizole](#/drug/fomepizole/methanol) plus hemodialysis are the treatment.',
      weightCalc: { dosePerKg: 1, unit: 'mg', maxDose: 50 },
    },
    {
      indication: 'Folate deficiency / alcohol-related repletion',
      regimen: '1 mg PO or IV daily. Commonly bundled with [thiamine](#/drug/thiamine/wernicke) in the alcohol-use-disorder patient. **Give thiamine before any glucose load** — folate does not carry that risk, thiamine does.',
    },
  ],
  contraindications: [
    'Undiagnosed megaloblastic anemia where B12 deficiency has not been excluded — folate corrects the anemia and masks progressive subacute combined degeneration',
  ],
  cautions: [
    'Requires dihydrofolate reductase to become active — slower and less reliable than leucovorin in the acutely ill or folate-depleted patient',
    'Never a substitute for fomepizole or dialysis',
    'Check a B12 level before committing a patient to chronic folate repletion',
  ],
  monitoring: 'Methanol level, anion gap, pH, visual acuity and fundoscopic exam.',
  notes: 'Supplies the tetrahydrofolate needed by formyl-tetrahydrofolate dehydrogenase to convert formate to CO2 and water. Formate, not methanol, is what blinds the patient — the entire treatment strategy is to stop making it (fomepizole), remove it (dialysis), and burn off what remains (folate/folinate).',
  citations: [
    'Barceloux DG, Bond GR, Krenzelok EP, Cooper H, Vale JA. American Academy of Clinical Toxicology practice guidelines on the treatment of methanol poisoning. J Toxicol Clin Toxicol. 2002;40(4):415-446.',
    'Roberts DM, Yates C, Megarbane B, et al. Recommendations for the role of extracorporeal treatments in the management of acute methanol poisoning (EXTRIP). Crit Care Med. 2015;43(2):461-472.',
  ],
};
```

---

## PART 2 — Rank 2: Time-critical

### 7. `tocilizumab` — Actemra

**References (5, the most of any dead id):** `oncological-emergencies.ts:631` (CRS Treatment Ladder, ×2),
`:696` (ICANS Treatment Ladder), `info-pages.ts:22349` (CAR-T quick reference), `:22402` (CRS Treatment
Ladder). Hint: `crs` in all five. Every one of those is a grade-2-or-worse CRS patient.

```typescript
const TOCILIZUMAB: DrugEntry = {
  id: 'tocilizumab',
  name: 'Tocilizumab (Actemra)',
  genericName: 'Tocilizumab',
  drugClass: 'IL-6 receptor antagonist (monoclonal antibody)',
  route: 'IV',
  indications: ['CAR-T / bispecific antibody cytokine release syndrome (CRS)', 'Severe or life-threatening CRS in adults and children >=2 years'],
  dosing: [
    {
      indication: 'Cytokine release syndrome — patient >=30 kg',
      regimen: '**8 mg/kg IV over 60 minutes. MAXIMUM 800 mg per dose.**\n\n**REPEAT:** may repeat if no clinical improvement, **minimum 8 hours between doses**.\n\n**CEILING:** maximum **4 doses total**. No more than 3 doses in any 24-hour period.\n\n**BY CRS GRADE (ASTCT):**\n• **Grade 1:** supportive. Consider tocilizumab only for persistent fever >3 days.\n• **Grade 2:** tocilizumab 8 mg/kg. Add [dexamethasone](#/drug/dexamethasone/crs) 10 mg IV if no response at 24 h.\n• **Grade 3:** ICU. Tocilizumab + dexamethasone 10 mg IV q6h.\n• **Grade 4:** ICU. Tocilizumab + methylprednisolone 1000 mg IV daily x 3 days, then taper. Anakinra 100 mg SC daily if refractory (off-label).\n\n**CULTURE AND COVER FIRST.** CRS and neutropenic sepsis are clinically indistinguishable. Pan-culture and start empiric broad-spectrum antibiotics ([cefepime](#/drug/cefepime/febrile-neutropenia) 2 g IV q8h) before or alongside tocilizumab — never instead of.',
      weightCalc: { dosePerKg: 8, unit: 'mg', maxDose: 800, label: 'CRS, weight >=30 kg' },
    },
    {
      indication: 'Cytokine release syndrome — patient <30 kg',
      regimen: '**12 mg/kg IV over 60 minutes.**\n\nSame repeat rule: minimum 8 hours between doses, maximum 4 doses total.\n\nApproved down to age 2 years.',
      weightCalc: { dosePerKg: 12, unit: 'mg', maxDose: 800, label: 'CRS, weight <30 kg' },
    },
    {
      indication: 'ICANS — what tocilizumab does NOT do',
      regimen: '**Tocilizumab does NOT treat ICANS.** It does not meaningfully cross the blood-brain barrier, and by raising serum IL-6 it may theoretically worsen neurotoxicity.\n\n**ICANS treatment is corticosteroid:** [dexamethasone](#/drug/dexamethasone/icans) 10 mg IV q6h for grade 2-3; methylprednisolone 1000 mg IV daily for grade 4.\n\n**Give tocilizumab in the ICANS patient ONLY to treat concurrent CRS**, not the neurotoxicity itself.',
    },
  ],
  contraindications: [
    'Active untreated serious infection (relative — in CRS you often cannot exclude sepsis, so treat both)',
    'Known hypersensitivity to tocilizumab',
  ],
  cautions: [
    'Boxed warning: serious infection, including TB reactivation, invasive fungal disease, and bacterial sepsis',
    'GI perforation risk, particularly with diverticulitis history',
    'Transaminitis and hepatotoxicity',
    'Blunts CRP and fever for days afterward — you lose your two easiest sepsis markers, so keep culturing',
    'Neutropenia and thrombocytopenia',
    'Does not treat ICANS; steroids do',
  ],
  monitoring: 'Continuous vitals and telemetry, LFTs, CBC with differential, blood cultures, ferritin and fibrinogen (HLH/MAS overlap), echocardiogram plus troponin and BNP for any hypotension or dyspnea (CAR-T myocarditis is recognized), D-dimer for cytokine-driven DIC.',
  notes: 'Blocks both membrane-bound and soluble IL-6 receptors, interrupting the IL-6 amplification loop that drives CRS. Response is often dramatic and fast — fever and hypotension improve within hours. The mental trap is anchoring: CRS looks exactly like neutropenic sepsis, and the two coexist. Culture and cover every time.',
  citations: [
    'Actemra (tocilizumab) injection prescribing information. Genentech; 2024.',
    'Lee DW, Santomasso BD, Locke FL, et al. ASTCT Consensus Grading for Cytokine Release Syndrome and Neurologic Toxicity Associated with Immune Effector Cells. Biol Blood Marrow Transplant. 2019;25(4):625-638.',
    'Santomasso BD, Nastoupil LJ, Adkins S, et al. Management of Immune-Related Adverse Events in Patients Treated With Chimeric Antigen Receptor T-Cell Therapy: ASCO Guideline. J Clin Oncol. 2021;39(35):3978-3992.',
  ],
};
```

**Dose sources:** 8 mg/kg (>=30 kg) / 12 mg/kg (<30 kg), 800 mg cap, 60-minute infusion, >=8 h interval and
4-dose maximum are all from the Actemra prescribing information CRS section. Grade-based escalation is
ASTCT 2019 / ASCO 2021.

**Two findings against the consults** (see §Findings): the **pediatric 12 mg/kg dose for patients under
30 kg is absent from every one of the five referencing nodes**, and the consults cap at "3 doses in 24h"
where the label caps at 4 doses total.

---

### 8. `papaverine`

**Reference:** `src/data/trees/mesenteric-ischemia.ts:265`, "NOMI — Non-Occlusive" node. Hint: `nomi`.
Consult states 30-60 mg/hr into the SMA catheter, ≥24 h, incompatible with heparin. All confirmed.

```typescript
const PAPAVERINE: DrugEntry = {
  id: 'papaverine',
  name: 'Papaverine',
  genericName: 'Papaverine hydrochloride',
  drugClass: 'Direct smooth-muscle vasodilator (non-specific phosphodiesterase inhibitor)',
  route: 'Intra-arterial (selective SMA catheter)',
  indications: ['Non-occlusive mesenteric ischemia (NOMI) — selective SMA vasodilation'],
  dosing: [
    {
      indication: 'NOMI — selective SMA infusion',
      regimen: '**BOLUS (optional, at angiography):** 60 mg into the SMA.\n\n**INFUSION:** **30-60 mg/hour** continuous into the SMA catheter, diluted to **1 mg/mL in normal saline**, via a controlled infusion pump.\n\n**DURATION:** continue at least 24 hours, then repeat angiography. Restart for further 24-hour blocks until the vasoconstriction and the clinical picture resolve.\n\n**THIS IS AN IR PROCEDURE, NOT AN ED INFUSION.** It requires selective SMA catheterization. Interventional radiology places and manages the line.\n\n**FIRST, FIX THE CAUSE:** optimize cardiac output, resuscitate volume, and **stop or minimize vasopressors** — NOMI is usually driven by splanchnic vasoconstriction from pressors, cardiogenic shock, sepsis, or post-cardiac-surgery low-output state. Papaverine treats the artery; it does not treat the reason the artery clamped down.',
    },
    {
      indication: 'Line safety — read before starting',
      regimen: '**INCOMPATIBLE WITH HEPARIN in the same line.** Papaverine and heparin precipitate. Systemic heparin is usually running concurrently in NOMI — it needs a separate line.\n\n**CATHETER DISLODGEMENT INTO THE AORTA CAUSES PROFOUND HYPOTENSION.** Confirm catheter position radiographically before and during the infusion. Any unexplained hypotension on this infusion means check the catheter first.',
    },
  ],
  contraindications: [
    'Complete atrioventricular block',
    'Known hypersensitivity to papaverine',
    'Peritonitis or radiographic bowel infarction — that patient needs a laparotomy, not a vasodilator',
  ],
  cautions: [
    'Intra-arterial administration should be performed only by clinicians trained in the technique',
    'Hypotension if the catheter refluxes into the aorta',
    'Hepatotoxicity with prolonged use — follow LFTs',
    'Arrhythmia and AV conduction effects',
    'Mortality in NOMI remains 70-90% even with optimal treatment. Set expectations with the family early.',
  ],
  monitoring: 'Continuous arterial blood pressure, catheter position on serial imaging, lactate trend, serial abdominal examinations, LFTs, ECG.',
  notes: 'Non-specific phosphodiesterase inhibition relaxes mesenteric arterial smooth muscle, interrupting the vasoconstriction that defines NOMI. Off-label for this indication; the evidence is observational — retrospective series report improved survival and fewer laparotomies with local intra-arterial vasodilator infusion. No randomized trial exists and none is likely. Serial angiography, not the infusion itself, is what tells you whether you are winning.',
  citations: [
    'Bjorck M, Koelemay M, Acosta S, et al. Editor\'s Choice - Management of the Diseases of Mesenteric Arteries and Veins: ESVS Clinical Practice Guidelines. Eur J Vasc Endovasc Surg. 2017;53(4):460-510.',
    'Stahl K, Rittgerodt N, Busch M, et al. Local Intra-arterial Vasodilator Infusion in Non-Occlusive Mesenteric Ischemia Significantly Increases Survival Rate. Cardiovasc Intervent Radiol. 2020;43(11):1621-1629.',
    'Papaverine hydrochloride injection prescribing information.',
  ],
};
```

---

### 9. `nitroprusside`

**Reference:** `src/data/trees/peds-hypertensive-emergency.ts:159`, "Treatment: Hypertensive Emergency (IV)"
node. **No indication hint on the link** — bare `#/drug/nitroprusside`. The consult lists it as last-line
at 0.5-8 mcg/kg/min.

```typescript
const NITROPRUSSIDE: DrugEntry = {
  id: 'nitroprusside',
  name: 'Sodium nitroprusside (Nitropress)',
  genericName: 'Sodium nitroprusside',
  drugClass: 'Direct arterial and venous vasodilator (nitric oxide donor)',
  route: 'IV infusion (central line preferred)',
  indications: ['Hypertensive emergency — refractory, last-line', 'Acute afterload reduction (severe mitral or aortic regurgitation, acute decompensated heart failure)'],
  dosing: [
    {
      indication: 'Pediatric hypertensive emergency',
      regimen: '**START 0.3-0.5 mcg/kg/min IV.** Titrate upward every few minutes to effect.\n\n**USUAL RANGE:** 0.5-8 mcg/kg/min.\n\n**ABSOLUTE MAXIMUM 10 mcg/kg/min — and infusion at the maximum rate must NEVER exceed 10 minutes.** If BP is not controlled after 10 minutes at max rate, stop the drug. That is a label instruction, not a suggestion.\n\n**BP TARGET:** reduce by <=25% in the first 8 hours, then normalize gradually over 24-48 hours. Faster correction causes watershed infarction, and children autoregulate at a different set point than adults.\n\n**LAST LINE.** [Nicardipine](#/drug/nicardipine/peds-htn-emergency) 0.5-3 mcg/kg/min is the preferred first-line titratable agent, then [labetalol](#/drug/labetalol/peds-htn-emergency), then [clevidipine](#/drug/clevidipine/peds-htn-emergency). Reach for nitroprusside when those have failed.',
    },
    {
      indication: 'Adult hypertensive emergency',
      regimen: 'Start 0.3-0.5 mcg/kg/min, titrate q3-5 min. Same 10 mcg/kg/min ceiling and same 10-minute rule at maximum rate.\n\nIn adults, nicardipine, clevidipine, and labetalol have displaced nitroprusside for nearly every indication. Its remaining niche is refractory hypertension where rapid on/off titration is essential.',
    },
    {
      indication: 'Cyanide toxicity — recognize it',
      regimen: '**Each nitroprusside molecule liberates 5 cyanide ions.** Risk rises with dose, duration >24-48 hours, renal impairment (thiocyanate accumulation), and hepatic impairment (reduced detoxification).\n\n**SUSPECT CYANIDE TOXICITY IF:** worsening metabolic acidosis, rising lactate, unexplained tachyphylaxis to the infusion, altered mental status, or a narrowing arteriovenous oxygen difference.\n\n**ACT:** stop the infusion. Give [hydroxocobalamin](#/drug/hydroxocobalamin/cyanide) or sodium thiosulfate. Do not wait for a level.\n\n**PREVENT:** co-infuse sodium thiosulfate for prolonged or high-dose therapy; keep total duration short.',
    },
  ],
  contraindications: [
    'Compensatory hypertension (arteriovenous shunt, aortic coarctation) where the pressure is maintaining perfusion',
    'Congenital optic atrophy or tobacco amblyopia (Leber hereditary optic atrophy)',
    'Known inadequate cerebral perfusion, or moribund patients presenting for emergency surgery',
    'Acute heart failure with reduced peripheral vascular resistance (e.g. high-output sepsis)',
  ],
  cautions: [
    'RAISES INTRACRANIAL PRESSURE — avoid in elevated ICP, head injury, or hypertensive encephalopathy with cerebral edema',
    'Cyanide and thiocyanate accumulation, worse in renal or hepatic impairment',
    'Coronary steal in ischemic heart disease',
    'Light-sensitive — the bag and tubing must be shielded',
    'Requires arterial line and continuous monitoring; precipitous hypotension is easy to cause',
    'Rebound hypertension on abrupt discontinuation',
  ],
  monitoring: 'Continuous invasive arterial blood pressure. Acid-base status and lactate at least q6h on prolonged infusion. Thiocyanate level if infusion >48 hours or renal impairment (toxic >10 mg/dL). Mental status. Methemoglobin if cumulative dose is large.',
  notes: 'Nitric-oxide-mediated arterial and venous dilation with near-instantaneous on and off kinetics — the reason it survives at all in a formulary that otherwise has better options. In children the drug is titrated to the same targets as adults but the therapeutic window is narrower and the ICP effect matters more. Modern pediatric practice reserves it for refractory cases; nicardipine is the workhorse.',
  citations: [
    'Nitropress (sodium nitroprusside) injection prescribing information. Hospira/Valeant; 2014.',
    'Flynn JT, Kaelber DC, Baker-Smith CM, et al. Clinical Practice Guideline for Screening and Management of High Blood Pressure in Children and Adolescents. Pediatrics. 2017;140(3):e20171904.',
    'Chandar J, Zilleruelo G. Hypertensive crisis in children. Pediatr Nephrol. 2012;27(5):741-751.',
  ],
};
```

**Dose sources:** 0.3 mcg/kg/min initial and 10 mcg/kg/min maximum, and the 10-minute limit at maximum
rate, are FDA label. The 25%-in-8-hours BP target is the pediatric hypertensive-crisis literature the
consult already cites.

**Also:** the link is `#/drug/nitroprusside` with **no indication hint**, which violates the mandatory
indication-aware-link rule in `CLAUDE.md`. It should be `#/drug/nitroprusside/peds-htn-emergency` to match
the sibling links in that same table.

---

### 10. `albuterol` — DO NOT AUTHOR. Repoint the link.

**Reference:** `src/data/info-pages.ts:22555`, the tumor-lysis-syndrome electrolyte page. Hint: `hyperkalemia`.
The page text reads "Albuterol 10-20 mg nebulized (additive)".

An entry **already exists** under the id `albuterol-neb` (`ALBUTEROL_NEB`) whose first dosing block is
`indication: 'Hyperkalemia'`, `regimen: '10-20 mg nebulized...'` — the exact dose the info page states,
plus the underdosing caution and the ESRD efficacy note. Authoring `albuterol` would duplicate it.

**Fix:**

```
- [Albuterol](#/drug/albuterol/hyperkalemia)
+ [Albuterol](#/drug/albuterol-neb/hyperkalemia)
```

**No new dose. Link repair only, no clinical sign-off needed.**

---

### 11. `patiromer` — Veltassa

**Reference:** `src/data/info-pages.ts:22555`, TLS electrolyte page. Hint: `hyperkalemia`.

```typescript
const PATIROMER: DrugEntry = {
  id: 'patiromer',
  name: 'Patiromer (Veltassa)',
  genericName: 'Patiromer sorbitex calcium',
  drugClass: 'Potassium binder (non-absorbed cation exchange polymer)',
  route: 'PO',
  indications: ['Hyperkalemia — subacute and chronic management (adjunct)'],
  dosing: [
    {
      indication: 'Hyperkalemia',
      regimen: '**8.4 g PO once daily.** Titrate at intervals of at least one week in 8.4 g increments to a maximum of **25.2 g once daily**.\n\n**Mix the powder in water; take with food.**\n\n**NOT AN EMERGENCY DRUG.** Onset is roughly 7 hours to a measurable effect, and the effect is small — about 0.2 mEq/L at 7 hours. In acute severe hyperkalemia it contributes essentially nothing in the timeframe that matters.\n\n**WHAT ACTUALLY TREATS ACUTE HYPERKALEMIA:**\n• [Calcium gluconate](#/drug/calcium-gluconate/hyperkalemia) — membrane stabilization, first, if any ECG change.\n• [Insulin regular](#/drug/insulin-regular/hyperkalemia) + dextrose — intracellular shift.\n• [Albuterol](#/drug/albuterol-neb/hyperkalemia) 10-20 mg nebulized — additive shift.\n• **Dialysis** — the only reliable elimination route in the anuric patient.\n\nPatiromer is for the elimination phase and for chronic outpatient control, particularly to let a patient stay on a RAAS inhibitor.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to patiromer',
    'Severe constipation, bowel obstruction, or impaction',
  ],
  cautions: [
    'Do NOT rely on it for acute severe hyperkalemia and do NOT let it delay dialysis',
    'BINDS OTHER ORAL DRUGS — separate other oral medications by at least 3 hours',
    'Binds magnesium: hypomagnesemia is common, check a level',
    'Contains calcium (not sodium) — an advantage over sodium-based binders in volume-overloaded patients, but a consideration in hypercalcemia',
    'Constipation, diarrhea, abdominal discomfort',
    'Do not heat the powder or add it to hot liquid',
  ],
  monitoring: 'Serum potassium and magnesium. Review the full medication list for oral drugs requiring 3-hour separation.',
  notes: 'Exchanges calcium for potassium in the colonic lumen. Compared with sodium zirconium cyclosilicate it is slower and somewhat weaker acutely (~0.2 mEq/L at 7 h vs SZC ~0.2 mEq/L at 4 h and ~0.4 mEq/L at 24 h), but it avoids the sodium load. Both are far safer than sodium polystyrene sulfonate. See [Lokelma](#/drug/sodium-zirconium-cyclosilicate/acute hyperkalemia).',
  citations: [
    'Veltassa (patiromer) for oral suspension prescribing information. Vifor Pharma/CSL; 2023.',
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
  ],
};
```

**Dose sources:** 8.4 g starting dose, 8.4 g weekly titration increments, 25.2 g maximum, the 3-hour
drug-separation rule, and the -0.2 mEq/L at 7 hours figure are all from the Veltassa prescribing
information.

---

### 12. `sodium-polystyrene-sulfonate` — Kayexalate

**Reference:** `src/data/info-pages.ts:22555`, TLS electrolyte page. Hint: `hyperkalemia`.

**⚠️ FLAGGED, and I want this read before the entry.** The consult recommends SPS. This repo's own
`sodium-zirconium-cyclosilicate` entry already describes Kayexalate as "antiquated and dangerous." The FDA
has a warning against concomitant sorbitol after cases of fatal colonic necrosis; a systematic review found
the colon involved in 76% of GI-injury cases, transmural necrosis in 62%, and death in 33% of those cases.
Modern hyperkalemia guidance recommends against it where a newer binder is available.

I drafted the entry so the tap stops failing, and I wrote it to say plainly that this is not the drug to
reach for. **But the real fix is editing the consult to lead with SZC/patiromer, and that is a change to a
clinical recommendation — Andy's call, not mine.**

```typescript
const SODIUM_POLYSTYRENE_SULFONATE: DrugEntry = {
  id: 'sodium-polystyrene-sulfonate',
  name: 'Sodium polystyrene sulfonate (Kayexalate, SPS)',
  genericName: 'Sodium polystyrene sulfonate',
  drugClass: 'Potassium binder (sodium cation-exchange resin) — legacy agent',
  route: 'PO / PR',
  indications: ['Hyperkalemia — legacy agent, NOT first-line'],
  dosing: [
    {
      indication: 'Hyperkalemia — oral',
      regimen: '**15 g PO one to four times daily**, as the powder suspended in water.\n\n**PREFER A NEWER BINDER.** [Sodium zirconium cyclosilicate (Lokelma)](#/drug/sodium-zirconium-cyclosilicate/acute hyperkalemia) 10 g PO q8h or [patiromer (Veltassa)](#/drug/patiromer/hyperkalemia) 8.4 g PO daily are both more effective and dramatically safer. Use SPS only when neither is available.\n\n**DO NOT CO-ADMINISTER WITH SORBITOL** — the combination is associated with fatal colonic necrosis. If your pharmacy stocks the premixed 33% sorbitol suspension, that is the formulation the FDA warning is about.\n\n**NOT AN EMERGENCY DRUG.** Onset is hours. It does nothing for the patient with a widened QRS.',
    },
    {
      indication: 'Hyperkalemia — retention enema',
      regimen: '30-50 g PR every 6 hours, retained 30-60 minutes, followed by a cleansing enema.\n\n**Higher GI-injury risk than the oral route.** I would not use this in the ED. Dialysis is the answer for the patient sick enough to be considered for it.',
    },
  ],
  contraindications: [
    'Obstructive bowel disease, ileus, or reduced gut motility',
    'Neonates, and any infant with reduced gut motility',
    'Postoperative patients before bowel function has returned',
    'Hypokalemia',
    'Known hypersensitivity to polystyrene sulfonate resins',
  ],
  cautions: [
    'FATAL INTESTINAL NECROSIS — colonic necrosis, ischemic colitis, GI bleeding, and perforation are reported, with and without sorbitol. Colon involved in ~76% of reported GI injury cases; mortality ~33% among them.',
    'SODIUM LOAD — each gram delivers roughly 4.1 mEq sodium. In heart failure, cirrhosis, or CKD that is a meaningful volume insult.',
    'Binds other oral drugs — separate by at least 3 hours (6 hours in gastroparesis)',
    'Hypokalemia, hypomagnesemia, hypocalcemia with repeated dosing',
    'Efficacy data are weak. The historical evidence for potassium lowering never met a modern standard.',
    'Risk is highest in post-op patients, transplant recipients, uremic patients, and anyone with impaired motility',
  ],
  monitoring: 'Serum potassium, sodium, magnesium, calcium. Abdominal examination and bowel function every shift while dosed. Stop immediately for abdominal pain, distension, or bleeding.',
  notes: 'A 1950s-era resin that exchanges sodium for potassium in the gut. It is on this list because consults still reference it, not because it should be prescribed. In 2026 the correct sequence for acute hyperkalemia is calcium for membrane stabilization, insulin/dextrose and beta-agonist for shift, and dialysis for elimination in the anuric patient — with SZC or patiromer as the oral binder when a binder is indicated at all.',
  citations: [
    'Kayexalate (sodium polystyrene sulfonate) powder prescribing information. Sanofi-Aventis; 2011.',
    'Harel Z, Harel S, Shah PS, Wald R, Perl J, Bell CM. Gastrointestinal adverse events with sodium polystyrene sulfonate (Kayexalate) use: a systematic review. Am J Med. 2013;126(3):264.e9-264.e24.',
    'Palmer BF, Clegg DJ. Hyperkalemia treatment standard. Nephrol Dial Transplant. 2024;39(7):1097-1104.',
  ],
};
```

---

### 13. `fidaxomicin` — Dificid

**Reference:** `src/data/trees/diarrhea.ts:237`, "C. difficile Treatment" result node (linked twice on the
same line — non-severe and severe blocks). Hint: `c difficile`. Consult states 200 mg PO BID × 10 days.

```typescript
const FIDAXOMICIN: DrugEntry = {
  id: 'fidaxomicin',
  name: 'Fidaxomicin (Dificid)',
  genericName: 'Fidaxomicin',
  drugClass: 'Macrocyclic antibiotic (narrow-spectrum, minimally absorbed)',
  route: 'PO',
  indications: ['Clostridioides difficile infection — first episode, non-severe or severe', 'Recurrent C. difficile infection'],
  dosing: [
    {
      indication: 'C. difficile — initial episode (non-severe or severe)',
      regimen: '**200 mg PO twice daily x 10 days.**\n\n**PREFERRED FIRST-LINE (IDSA/SHEA 2021).** Preferred over oral vancomycin on the strength of lower recurrence, not higher initial cure — sustained response is the endpoint that matters.\n\n**Alternative:** [vancomycin](#/drug/vancomycin/c difficile) 125 mg PO four times daily x 10 days, if fidaxomicin is unavailable or unaffordable.\n\n**Metronidazole is NOT first-line** for any severity in current guidance. Use it only when neither of the above can be obtained.\n\n**STOP THE INCITING ANTIBIOTIC** if at all possible. That single act does more for recurrence risk than the choice between these two drugs.',
    },
    {
      indication: 'C. difficile — recurrence',
      regimen: '**First recurrence:** 200 mg PO BID x 10 days, **or** the extended-pulse regimen — 200 mg PO BID on days 1-5, then 200 mg PO once every other day on days 7-25.\n\n**Multiple recurrences:** add [bezlotoxumab](#/drug/bezlotoxumab/c difficile recurrence) or refer for fecal microbiota transplantation.',
    },
    {
      indication: 'NOT for fulminant disease',
      regimen: '**Fulminant CDI (hypotension, shock, ileus, or megacolon) is not a fidaxomicin problem.**\n\n• [Vancomycin](#/drug/vancomycin/c difficile) **500 mg PO/NG four times daily**\n• **PLUS** [metronidazole](#/drug/metronidazole/c difficile) 500 mg IV q8h\n• Vancomycin retention enema if ileus\n• **Surgical consultation** — colectomy can be lifesaving\n\nThere is no established fidaxomicin regimen for fulminant disease.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to fidaxomicin',
  ],
  cautions: [
    'COST. This is the practical barrier — a 10-day course runs into the thousands and prior authorization is common. Verify coverage before discharging a patient on a prescription they cannot fill; a filled vancomycin course beats an unfilled fidaxomicin one.',
    'Not for systemic infection — minimal absorption is the point, and the limitation',
    'No role in fulminant disease',
    'Nausea, vomiting, abdominal pain',
  ],
  monitoring: 'Stool frequency and consistency, WBC, creatinine, volume status. Do NOT send a test of cure — C. difficile PCR stays positive in colonized patients long after clinical resolution and will only generate unnecessary re-treatment.',
  notes: 'Inhibits bacterial RNA polymerase. Its advantage is narrowness: it spares the anaerobic colonic flora that vancomycin flattens, which is the mechanistic reason recurrence rates are lower. Head-to-head trials show comparable initial clinical cure and superior sustained response.',
  citations: [
    'Johnson S, Lavergne V, Skinner AM, et al. Clinical Practice Guideline by IDSA and SHEA: 2021 Focused Update Guidelines on Management of Clostridioides difficile Infection in Adults. Clin Infect Dis. 2021;73(5):e1029-e1044.',
    'Dificid (fidaxomicin) tablets prescribing information. Merck; 2020.',
  ],
};
```

---

### 14. `cefoxitin`

**Reference:** `src/data/trees/pid.ts:224`, "Inpatient Treatment — CDC 2021" node. Hint: `pid`.
Consult states 2 g IV q6h plus doxycycline. Correct per CDC.

```typescript
const CEFOXITIN: DrugEntry = {
  id: 'cefoxitin',
  name: 'Cefoxitin (Mefoxin)',
  genericName: 'Cefoxitin sodium',
  drugClass: 'Second-generation cephamycin (cephalosporin class) with anaerobic coverage',
  route: 'IV / IM',
  indications: ['Pelvic inflammatory disease — inpatient parenteral therapy', 'Intra-abdominal infection', 'Surgical prophylaxis (colorectal, appendectomy, hysterectomy)'],
  dosing: [
    {
      indication: 'Pelvic inflammatory disease — inpatient',
      regimen: '**2 g IV every 6 hours**\n**PLUS** [doxycycline](#/drug/doxycycline/pid) 100 mg PO or IV every 12 hours.\n\n**PREFER ORAL DOXYCYCLINE** when the patient tolerates it — IV doxycycline is painful and offers no bioavailability advantage.\n\n**TRANSITION TO ORAL:** after 24-48 hours of clinical improvement (afebrile, decreasing pain, decreasing tenderness). Complete a **14-day total** course with doxycycline 100 mg PO BID **plus metronidazole 500 mg PO BID**.\n\n**TUBO-OVARIAN ABSCESS:** metronidazole must be continued with doxycycline for the full oral course.',
    },
    {
      indication: 'Intra-abdominal infection',
      regimen: '1-2 g IV q6-8h, depending on severity. Increasingly limited by Bacteroides fragilis resistance — check your local antibiogram before choosing it over piperacillin-tazobactam or a carbapenem for a sick patient.',
    },
    {
      indication: 'Surgical prophylaxis',
      regimen: '2 g IV within 60 minutes of incision. Redose intraoperatively every 2 hours or after significant blood loss.',
    },
    {
      indication: 'Renal adjustment',
      regimen: 'CrCl 30-50: 1-2 g q8-12h. CrCl 10-29: 1-2 g q12-24h. CrCl <10: 0.5-1 g q12-24h. Hemodialysis: dose after the session.',
    },
  ],
  contraindications: [
    'Known IgE-mediated hypersensitivity to cephalosporins',
    'History of anaphylaxis, angioedema, or SJS/TEN with any beta-lactam',
  ],
  cautions: [
    'Cross-reactivity with penicillin allergy is low (<2%) but not zero. A reported penicillin allergy without an anaphylaxis history is generally not a barrier.',
    'A strong inducer of AmpC beta-lactamase — can drive resistance in Enterobacter, Citrobacter, Serratia',
    'Increasing B. fragilis resistance limits reliability in serious intra-abdominal infection',
    'Q6h dosing is a real adherence problem on a busy floor; confirm the order interval is right',
    'C. difficile risk',
  ],
  monitoring: 'Clinical response (fever curve, pain, cervical motion tenderness), renal function, CBC. Reassess PID patients at 72 hours — failure to improve should prompt imaging for tubo-ovarian abscess.',
  notes: 'A cephamycin, not a true second-generation cephalosporin — the 7-alpha-methoxy group buys anaerobic activity and beta-lactamase stability, which is exactly why it works for polymicrobial PID. Paired with doxycycline it covers gonorrhea, chlamydia, anaerobes, and enteric gram-negatives.',
  citations: [
    'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.',
    'Cefoxitin for injection prescribing information.',
  ],
};
```

---

### 15. `cefotetan`

**Reference:** `src/data/trees/pid.ts:224`, same node. Hint: `pid`. Consult states 2 g IV q12h.

```typescript
const CEFOTETAN: DrugEntry = {
  id: 'cefotetan',
  name: 'Cefotetan (Cefotan)',
  genericName: 'Cefotetan disodium',
  drugClass: 'Second-generation cephamycin (cephalosporin class) with anaerobic coverage',
  route: 'IV / IM',
  indications: ['Pelvic inflammatory disease — inpatient parenteral therapy', 'Intra-abdominal infection', 'Surgical prophylaxis (gynecologic, colorectal)'],
  dosing: [
    {
      indication: 'Pelvic inflammatory disease — inpatient',
      regimen: '**2 g IV every 12 hours**\n**PLUS** [doxycycline](#/drug/doxycycline/pid) 100 mg PO or IV every 12 hours.\n\n**CDC-preferred parenteral regimen alongside cefoxitin.** The q12h interval is the practical advantage over [cefoxitin](#/drug/cefoxitin/pid) q6h — same coverage, half the doses, better real-world adherence.\n\n**TRANSITION TO ORAL:** after 24-48 hours of clinical improvement. Complete **14 days total** with doxycycline 100 mg PO BID **plus metronidazole 500 mg PO BID**.',
    },
    {
      indication: 'Intra-abdominal infection',
      regimen: '1-3 g IV q12h by severity. Maximum 6 g/day.',
    },
    {
      indication: 'Renal adjustment',
      regimen: 'CrCl 10-30: usual dose q24h. CrCl <10: usual dose q48h. Hemodialysis: 1/4 the usual dose on non-dialysis days, 1/2 the usual dose on dialysis days.',
    },
  ],
  contraindications: [
    'Known IgE-mediated hypersensitivity to cephalosporins',
    'History of anaphylaxis, angioedema, or SJS/TEN with any beta-lactam',
  ],
  cautions: [
    'AVAILABILITY — cefotetan has been intermittently unavailable in the US and is not stocked at many hospitals. Confirm your pharmacy carries it before writing the order; cefoxitin is the fallback.',
    'N-methylthiotetrazole (NMTT) side chain: hypoprothrombinemia and bleeding risk, especially with malnutrition, renal impairment, or prolonged therapy. Vitamin K if PT rises.',
    'NMTT side chain also causes a DISULFIRAM-LIKE REACTION with alcohol — counsel the patient explicitly at discharge.',
    'Immune hemolytic anemia is reported, more often with cefotetan than most cephalosporins',
    'Penicillin cross-reactivity low (<2%) but not zero',
  ],
  monitoring: 'Clinical response, PT/INR on prolonged therapy (NMTT effect), CBC with attention to hemoglobin (immune hemolysis), renal function. Reassess PID at 72 hours.',
  notes: 'Pharmacologically near-identical to cefoxitin for PID, with a longer half-life permitting q12h dosing. The NMTT side chain is the differentiator and the reason for the coagulopathy and alcohol warnings. Where both are stocked, either is CDC-preferred; where only one is stocked, that is your answer.',
  citations: [
    'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187.',
    'Cefotan (cefotetan disodium) for injection prescribing information.',
  ],
};
```

---

### 16. `let-gel` — LET (lidocaine/epinephrine/tetracaine)

**Reference:** `src/data/trees/laceration-repair.ts:208` (Anesthesia Selection) and `:246` (Pediatric
Anesthesia). Hint: `topical-anesthesia`.

**Judgment call — Andy asked me to think about this one specifically.** My verdict: **author it.**

LET is not a route or a technique, it is a compounded formulary product with a fixed composition, a
defined applied dose, a contact time, and a real contraindication list (end-arteries, mucous membranes).
A clinician tapping "LET gel" wants exactly the things a `DrugEntry` holds. Aliasing it to `lidocaine`
would be wrong — the lidocaine entry's laceration dosing is infiltration in mg/kg, which is a different
drug administered a different way with a different toxicity ceiling. That mismatch is more dangerous than
the current dead link, because it would return plausible-looking but inapplicable numbers.

```typescript
const LET_GEL: DrugEntry = {
  id: 'let-gel',
  name: 'LET gel (lidocaine-epinephrine-tetracaine)',
  genericName: 'Lidocaine 4% / epinephrine 0.1% / tetracaine 0.5% topical gel',
  drugClass: 'Topical local anesthetic combination (compounded)',
  route: 'Topical (open wound only)',
  indications: ['Topical anesthesia for simple laceration repair, particularly face and scalp in children'],
  dosing: [
    {
      indication: 'Topical anesthesia — laceration repair',
      regimen: '**Apply 1-3 mL of gel directly into and over the open wound.** Cover with an occlusive dressing or hold with a gauze pledget.\n\n**CONTACT TIME: 20-30 minutes.** A single 30-minute application is as effective as repeated applications.\n\n**BLANCHING OF THE WOUND EDGES IS THE ENDPOINT** — it confirms epinephrine effect and predicts adequate anesthesia. No blanching means not ready. Test with a needle before you start suturing.\n\n**BEST FOR:** face and scalp lacerations under about 5 cm, low tension, in children. It frequently avoids infiltration entirely.\n\n**IF INCOMPLETE:** supplement with small-volume buffered [lidocaine](#/drug/lidocaine/laceration-repair) infiltrated through the already-anesthetized wound edge with a 30-gauge needle. The LET makes that injection far less painful.',
    },
    {
      indication: 'Where NOT to put it',
      regimen: '**DO NOT APPLY TO:**\n• **End-arterial territory** — digits, nose tip, ears, penis. The epinephrine is the concern here, and unlike infiltrated lidocaine-with-epi in digits, topical LET on an end-artery has no supporting safety data.\n• **Mucous membranes** — rapid systemic absorption of tetracaine, with reported toxicity including seizures.\n• **Contaminated or grossly dirty wounds** before irrigation.\n• **Intact skin** — it does not penetrate; it works through the open wound bed only.\n• **Eyes** — irrigate immediately if it gets in.\n\n**Do not exceed 3 mL** or apply to large wounds where cumulative absorption becomes unpredictable.',
    },
  ],
  contraindications: [
    'Application to digits, nose tip, ears, or penis (end-arterial territory)',
    'Application to mucous membranes',
    'Known hypersensitivity to amide or ester local anesthetics',
    'Application to intact skin (ineffective, not dangerous)',
  ],
  cautions: [
    'Compounded product — formulation, expiry, and storage vary between pharmacies. Know what your ED stocks.',
    'Tetracaine is an ESTER anesthetic; lidocaine is an AMIDE. A patient with a documented ester allergy should not receive this.',
    'Absorption is far higher across mucosa than across a wound bed — the mucous-membrane restriction is a real toxicity issue, not a formality',
    'Not reliable for high-tension wounds, extremities, or lacerations over about 5 cm',
    'Keep away from the eye',
  ],
  monitoring: 'Wound-edge blanching before instrumenting. Test anesthesia with a needle before the first suture. Observe for systemic anesthetic toxicity if a large volume was used or the wound was extensive.',
  notes: 'Replaced TAC (tetracaine-adrenaline-cocaine) with equivalent efficacy and none of the cocaine control, cost, or toxicity problems. In pediatric laceration repair it is often the difference between a calm procedure and a papoose. Gel and solution formulations perform comparably; the gel stays where you put it, which is why it is the usual stock item.',
  citations: [
    'Resch K, Schilling C, Borchert BD, Klatzko M, Uden D. Topical anesthesia for pediatric lacerations: a randomized trial of lidocaine-epinephrine-tetracaine solution versus gel. Ann Emerg Med. 1998;32(6):693-697.',
    'Schilling CG, Bank DE, Borchert BA, Klatzko MD, Uden DL. Tetracaine, epinephrine (adrenalin), and cocaine (TAC) versus lidocaine, epinephrine, and tetracaine (LET) for anesthesia of lacerations in children. Ann Emerg Med. 1995;25(2):203-208.',
  ],
};
```

---

### 17. `proparacaine`

**Reference:** `src/data/trees/corneal-fb-removal.ts:131`, "Topical Anesthesia + Visual Acuity" node.
Hint: `corneal-fb`.

```typescript
const PROPARACAINE: DrugEntry = {
  id: 'proparacaine',
  name: 'Proparacaine 0.5% (Alcaine, Ophthaine)',
  genericName: 'Proparacaine hydrochloride 0.5% ophthalmic solution',
  drugClass: 'Topical ophthalmic ester anesthetic',
  route: 'Topical ophthalmic',
  indications: ['Corneal foreign body removal', 'Corneal abrasion examination', 'Tonometry', 'Slit-lamp examination of the painful eye'],
  dosing: [
    {
      indication: 'Corneal foreign body removal / examination',
      regimen: '**1-2 drops to the affected eye.** Repeat once if needed during a prolonged procedure.\n\n**ONSET ~20 seconds. DURATION 10-15 minutes.**\n\n**PREFERRED OVER TETRACAINE FOR THE INITIAL DROP** — it stings substantially less, which matters when the patient is already in pain and you need cooperation for the exam.\n\n**Refrigerate** — proparacaine degrades at room temperature and the bottle discolors.',
    },
    {
      indication: 'NEVER for home use',
      regimen: '**DO NOT PRESCRIBE OR DISPENSE TOPICAL ANESTHETIC FOR HOME USE.**\n\nRepeated instillation causes epithelial toxicity, arrested healing, stromal infiltrates, corneal melting, and secondary infection. It is a recognized sentinel patient-safety event and it can cost the patient the eye.\n\nAlso: it abolishes the protective blink and pain response, so the patient can sustain further injury without knowing.\n\n**Counsel the patient explicitly** and document that you did. Send them home with a cycloplegic and oral analgesia instead.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to ester-type local anesthetics',
    'Dispensing for outpatient/home use',
  ],
  cautions: [
    'A dilated pupil after a "numbing drop" means the wrong bottle was picked up — check the label',
    'Transient stinging and conjunctival hyperemia',
    'Interferes with corneal cultures if obtained afterward — culture first if keratitis is suspected',
    'Ester anesthetic: caution with documented ester (e.g. benzocaine, tetracaine) allergy',
    'Rare hypersensitivity keratitis with repeated use',
  ],
  monitoring: 'Visual acuity documented BEFORE and AFTER any procedure, both eyes, with correction and with pinhole if reduced. That is the single most important documentation point in this encounter and it protects you medicolegally.',
  notes: 'Blocks sodium channels in corneal sensory nerve endings. Diagnostic and procedural use only. The temptation to send the drop home with a patient in genuine agony is the recurring error, and it is why the warning appears twice in this entry.',
  citations: [
    'Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions. Am Fam Physician. 2013;87(2):114-120.',
    'Alcaine (proparacaine hydrochloride ophthalmic solution 0.5%) prescribing information. Alcon.',
  ],
};
```

---

### 18. `tetracaine`

**Reference:** `src/data/trees/corneal-fb-removal.ts:131`, same node. Hint: `corneal-fb`.

```typescript
const TETRACAINE: DrugEntry = {
  id: 'tetracaine',
  name: 'Tetracaine 0.5% ophthalmic',
  genericName: 'Tetracaine hydrochloride 0.5% ophthalmic solution',
  drugClass: 'Topical ophthalmic ester anesthetic',
  route: 'Topical ophthalmic',
  indications: ['Corneal foreign body removal', 'Corneal abrasion examination', 'Tonometry', 'Short ophthalmic procedures'],
  dosing: [
    {
      indication: 'Corneal foreign body removal / examination',
      regimen: '**1-2 drops to the affected eye.** May repeat during a prolonged procedure.\n\n**ONSET ~1 minute. DURATION 15-20 minutes** — modestly longer than proparacaine.\n\n**IT STINGS CONSIDERABLY** on instillation. [Proparacaine](#/drug/proparacaine/corneal-fb) is the gentler first drop; tetracaine is reasonable when you need the extra few minutes of working time or when proparacaine is unavailable.\n\nStable at room temperature, unlike proparacaine.',
    },
    {
      indication: 'NEVER for home use',
      regimen: '**DO NOT PRESCRIBE OR DISPENSE FOR HOME USE.** Same absolute rule as proparacaine.\n\nRepeated instillation causes epithelial toxicity, non-healing epithelial defects, ring infiltrates, corneal melting, and perforation. Loss of the blink reflex and the pain warning permits further unrecognized injury.\n\nDischarge analgesia is a cycloplegic plus oral NSAID/acetaminophen, not a bottle of anesthetic.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to ester-type local anesthetics (cross-reacts with benzocaine, procaine, proparacaine)',
    'Dispensing for outpatient/home use',
  ],
  cautions: [
    'More irritating on instillation than proparacaine — warn the patient or you lose their cooperation for the exam',
    'Ester class: highest cross-reactivity potential of the ophthalmic anesthetics',
    'Interferes with corneal culture yield — culture before anesthetizing if you suspect infectious keratitis',
    'Transient epithelial punctate keratopathy even after single use',
  ],
  monitoring: 'Visual acuity documented before and after the procedure, both eyes. Fluorescein examination after foreign-body removal to size the residual epithelial defect and exclude a Seidel-positive perforation.',
  notes: 'Longer-acting than proparacaine at the cost of instillation discomfort. Both drugs are diagnostic and procedural agents only. The clinical decision between them is comfort versus duration; the clinical decision that actually matters is never letting either leave the department with the patient.',
  citations: [
    'Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions. Am Fam Physician. 2013;87(2):114-120.',
    'Tetracaine hydrochloride ophthalmic solution USP 0.5% prescribing information.',
  ],
};
```

---

## PART 3 — Rank 3: Routine

All five ophthalmic entries below are referenced from `corneal-fb-removal.ts`. Note that three of them
exist as ids only because the systemic id is already taken by a different drug in this repo:
`erythromycin` is the prokinetic entry, `ciprofloxacin` is the systemic FQ, `moxifloxacin` is the TB
entry. The `-ophthalmic` / `-ointment` suffixes are therefore correct and should stay.

### 19. `cyclopentolate`

**Reference:** `corneal-fb-removal.ts:131` and `:249`. Hint: `corneal-abrasion`.

```typescript
const CYCLOPENTOLATE: DrugEntry = {
  id: 'cyclopentolate',
  name: 'Cyclopentolate 1% (Cyclogyl)',
  genericName: 'Cyclopentolate hydrochloride 1% ophthalmic solution',
  drugClass: 'Topical anticholinergic cycloplegic / mydriatic',
  route: 'Topical ophthalmic',
  indications: ['Corneal abrasion — ciliary spasm pain', 'Traumatic iritis', 'Cycloplegic refraction'],
  dosing: [
    {
      indication: 'Corneal abrasion / traumatic iritis — ciliary spasm',
      regimen: '**1 drop to the affected eye in the department**, then optionally **BID x 1-2 days** at home for symptom relief.\n\n**ONSET:** mydriasis 30-60 min, cycloplegia 25-75 min. **DURATION up to 24 hours.**\n\n**OPTIONAL, NOT MANDATORY.** Reserve for significant photophobia or a deep/large abrasion. Skip it for a small superficial abrasion — the pupillary dilation and blurred near vision are a real cost.\n\n**WHY IT HELPS:** relaxes the ciliary body and iris sphincter. Ciliary spasm is a large share of the pain in a corneal abrasion, and oral analgesia does not touch it.\n\n**THIS IS THE DISCHARGE ANALGESIC** — never a topical anesthetic. Pair with oral [acetaminophen](#/drug/acetaminophen/general) and/or [ibuprofen](#/drug/ibuprofen/general).',
    },
  ],
  contraindications: [
    'Untreated narrow-angle glaucoma, or anatomically narrow anterior chamber angles',
    'Known hypersensitivity to cyclopentolate',
  ],
  cautions: [
    'CAN PRECIPITATE ACUTE ANGLE-CLOSURE GLAUCOMA in a susceptible eye. Assess the anterior chamber depth before dilating.',
    'Blurred near vision for up to 24 hours — the patient must not drive and should be told so',
    'Photophobia INCREASES from the dilation itself; sunglasses help',
    'CNS effects in children and the elderly at 1-2% concentrations: ataxia, restlessness, hallucinations, disorientation. Use 0.5% in young children, and apply punctal occlusion for 1-2 minutes after instillation to limit systemic absorption.',
    'Document that the pupil was pharmacologically dilated — otherwise the next examiner reads it as a neurologic emergency',
  ],
  monitoring: 'Visual acuity before instillation (dilation will change it). Intraocular pressure if any suspicion of narrow angles. Document pharmacologic dilation prominently in the chart and tell the patient to mention it if they are seen again.',
  notes: 'The anticholinergic of choice for corneal abrasion pain, with a duration that lines up neatly with next-day ophthalmology follow-up. Homatropine is the longer-acting alternative for iritis. Whatever you use, warn the patient the eye will look and feel strange for a day.',
  citations: [
    'Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions. Am Fam Physician. 2013;87(2):114-120.',
    'Cyclogyl (cyclopentolate hydrochloride ophthalmic solution) prescribing information. Alcon.',
  ],
};
```

---

### 20. `erythromycin-ointment`

**Reference:** `corneal-fb-removal.ts:249`, "Post-Removal Care". Hint: `corneal-abrasion`.

```typescript
const ERYTHROMYCIN_OINTMENT: DrugEntry = {
  id: 'erythromycin-ointment',
  name: 'Erythromycin 0.5% ophthalmic ointment',
  genericName: 'Erythromycin 0.5% ophthalmic ointment',
  drugClass: 'Macrolide antibiotic — topical ophthalmic',
  route: 'Topical ophthalmic',
  indications: ['Corneal abrasion prophylaxis', 'Bacterial conjunctivitis', 'Neonatal gonococcal ophthalmia prophylaxis'],
  dosing: [
    {
      indication: 'Corneal abrasion prophylaxis',
      regimen: '**Apply a 0.5-inch (1 cm) ribbon inside the lower lid four times daily x 3-5 days**, or until the epithelial defect has healed.\n\n**FIRST-LINE for the NON-contact-lens wearer.** Cheap, gentle, and the ointment vehicle lubricates, which by itself reduces pain with blinking.\n\n**NOT ADEQUATE FOR CONTACT LENS WEARERS** — they need Pseudomonas coverage. Use [ciprofloxacin 0.3%](#/drug/ciprofloxacin-ophthalmic/contact-lens-keratitis) or [moxifloxacin 0.5%](#/drug/moxifloxacin-ophthalmic/contact-lens-keratitis) instead.\n\n**BLURS VISION** for several minutes after each application — dose it at bedtime plus three daytime applications, and tell the patient not to drive right after.',
    },
    {
      indication: 'Neonatal ophthalmia prophylaxis',
      regimen: '0.5-inch ribbon to each lower conjunctival sac once, within 1 hour of birth. The only agent currently available in the US for this indication.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to erythromycin',
  ],
  cautions: [
    'No Pseudomonas coverage — inadequate for contact lens wearers or for any wound with vegetative material',
    'Transient blurred vision after application',
    'Does not treat established bacterial keratitis; an infiltrate needs ophthalmology and fortified antibiotics',
    'Rising macrolide resistance among staphylococci limits it to prophylaxis rather than treatment',
  ],
  monitoring: 'Recheck visual acuity at follow-up. Return precautions: worsening pain, decreasing vision, purulent discharge, increasing photophobia — any of which suggests infectious keratitis.',
  notes: 'The default corneal-abrasion prophylaxis in most EDs on cost and tolerability. Its job is preventing secondary infection of an epithelial defect, nothing more. Also: **no patching.** Cochrane found no benefit and possible harm.',
  citations: [
    'Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions. Am Fam Physician. 2013;87(2):114-120.',
    'Lin A, Rhee MK, Akpek EK, et al. Bacterial Keratitis Preferred Practice Pattern. Ophthalmology. 2019;126(1):P1-P55.',
    'Erythromycin ophthalmic ointment USP 0.5% prescribing information.',
  ],
};
```

---

### 21. `polymyxin-trimethoprim`

**Reference:** `corneal-fb-removal.ts:249`. Hint: `corneal-abrasion`.

```typescript
const POLYMYXIN_TRIMETHOPRIM: DrugEntry = {
  id: 'polymyxin-trimethoprim',
  name: 'Polymyxin B / trimethoprim (Polytrim)',
  genericName: 'Polymyxin B sulfate 10,000 units/mL and trimethoprim 1 mg/mL ophthalmic solution',
  drugClass: 'Combination topical ophthalmic antibiotic',
  route: 'Topical ophthalmic',
  indications: ['Corneal abrasion prophylaxis', 'Bacterial conjunctivitis'],
  dosing: [
    {
      indication: 'Corneal abrasion prophylaxis',
      regimen: '**1 drop to the affected eye four times daily x 3-5 days**, or until healed.\n\n**FIRST-LINE ALTERNATIVE to erythromycin ointment** for the non-contact-lens wearer. Solution rather than ointment, so it does not blur vision — the better choice for a patient who has to drive or work.\n\n**NOT ADEQUATE FOR CONTACT LENS WEARERS.** Polymyxin B has some gram-negative activity but coverage is not reliable enough for Pseudomonas risk — use a fluoroquinolone.',
    },
    {
      indication: 'Bacterial conjunctivitis',
      regimen: '1 drop every 3 hours (maximum 6 doses per day) x 7-10 days, per labeling. The QID schedule above is the pragmatic abrasion-prophylaxis regimen, not the labeled conjunctivitis interval.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to polymyxin B or trimethoprim',
  ],
  cautions: [
    'Not reliable for Pseudomonas despite the polymyxin component — do not use it as contact-lens-wearer coverage',
    'Local burning and stinging on instillation',
    'Does not treat established keratitis',
    'Aminoglycoside-free, which is an advantage — gentamicin and tobramycin drops are epithelial-toxic and slow healing',
  ],
  monitoring: 'Visual acuity at follow-up. Same return precautions as any abrasion: worsening pain, vision loss, purulent discharge, photophobia.',
  notes: 'The trimethoprim covers gram-positives, the polymyxin B covers most gram-negatives, and neither is epithelial-toxic the way aminoglycosides are. A good drop-form alternative when the patient cannot tolerate ointment blur.',
  citations: [
    'Wipperman JL, Dorsch JN. Evaluation and management of corneal abrasions. Am Fam Physician. 2013;87(2):114-120.',
    'Polytrim (trimethoprim and polymyxin B sulfate ophthalmic solution) prescribing information. Allergan.',
  ],
};
```

---

### 22. `ciprofloxacin-ophthalmic`

**Reference:** `corneal-fb-removal.ts:249`. Hint: `contact-lens-keratitis`.

```typescript
const CIPROFLOXACIN_OPHTHALMIC: DrugEntry = {
  id: 'ciprofloxacin-ophthalmic',
  name: 'Ciprofloxacin 0.3% ophthalmic (Ciloxan)',
  genericName: 'Ciprofloxacin hydrochloride 0.3% ophthalmic solution/ointment',
  drugClass: 'Fluoroquinolone antibiotic — topical ophthalmic',
  route: 'Topical ophthalmic',
  indications: ['Corneal abrasion in a contact lens wearer — Pseudomonas coverage', 'Bacterial keratitis', 'Bacterial conjunctivitis'],
  dosing: [
    {
      indication: 'Contact lens-associated abrasion — prophylaxis',
      regimen: '**1 drop to the affected eye four times daily x 5-7 days.**\n\n**MANDATORY FOR CONTACT LENS WEARERS.** A contact-lens-associated abrasion carries genuine Pseudomonas risk and can progress to a sight-threatening ulcer within 24 hours. Erythromycin and polymyxin/trimethoprim do NOT cover this adequately.\n\n**NO CONTACT LENSES** until cleared by ophthalmology. Say it, write it, and document it.\n\n**MANDATORY 24-HOUR OPHTHALMOLOGY FOLLOW-UP** for any contact lens wearer with an epithelial defect.',
    },
    {
      indication: 'Bacterial keratitis (established infiltrate)',
      regimen: 'Loading: 1-2 drops every 15 minutes for the first 6 hours, then every 30 minutes for the remainder of day 1. Day 2: 2 drops hourly. Days 3-14: 2 drops every 4 hours.\n\n**A corneal infiltrate is an ophthalmology emergency, not an ED discharge.** Do not start this regimen and send the patient home — call ophthalmology.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to ciprofloxacin or other fluoroquinolones',
  ],
  cautions: [
    'WHITE CRYSTALLINE PRECIPITATE on the corneal surface is common with frequent dosing — it is the drug, it is benign, and it resolves. Do not mistake it for a worsening infiltrate.',
    'Culture BEFORE starting therapy if there is any infiltrate',
    'Systemic fluoroquinolone black-box warnings do not apply to topical ophthalmic use at these doses',
    'Emerging fluoroquinolone resistance among ocular staphylococci; moxifloxacin has broader gram-positive activity',
  ],
  monitoring: 'Daily ophthalmology review while an epithelial defect persists in a contact lens wearer. Visual acuity, size of the defect on fluorescein, and presence or absence of an infiltrate or hypopyon.',
  notes: 'Strong Pseudomonas activity is the reason this is the contact-lens drug. The distinction that matters clinically: an ABRASION gets QID prophylaxis, an INFILTRATE gets loading-dose therapy and an ophthalmologist tonight.',
  citations: [
    'Lin A, Rhee MK, Akpek EK, et al. Bacterial Keratitis Preferred Practice Pattern. Ophthalmology. 2019;126(1):P1-P55.',
    'Ciloxan (ciprofloxacin hydrochloride ophthalmic solution 0.3%) prescribing information. Alcon.',
  ],
};
```

---

### 23. `moxifloxacin-ophthalmic`

**Reference:** `corneal-fb-removal.ts:249`. Hint: `contact-lens-keratitis`.

```typescript
const MOXIFLOXACIN_OPHTHALMIC: DrugEntry = {
  id: 'moxifloxacin-ophthalmic',
  name: 'Moxifloxacin 0.5% ophthalmic (Vigamox)',
  genericName: 'Moxifloxacin hydrochloride 0.5% ophthalmic solution',
  drugClass: 'Fourth-generation fluoroquinolone — topical ophthalmic',
  route: 'Topical ophthalmic',
  indications: ['Corneal abrasion in a contact lens wearer — Pseudomonas coverage', 'Bacterial keratitis', 'Bacterial conjunctivitis'],
  dosing: [
    {
      indication: 'Contact lens-associated abrasion — prophylaxis',
      regimen: '**1 drop to the affected eye four times daily x 5-7 days.**\n\nInterchangeable with [ciprofloxacin 0.3%](#/drug/ciprofloxacin-ophthalmic/contact-lens-keratitis) for this indication. Advantages: **self-preserved (no benzalkonium chloride)**, so it stings less and is gentler on a damaged epithelium, and it has broader gram-positive coverage. Disadvantage: cost.\n\nSame two non-negotiables as any contact-lens abrasion: **no lenses until cleared**, and **ophthalmology within 24 hours**.',
    },
    {
      indication: 'Bacterial conjunctivitis',
      regimen: '1 drop three times daily x 7 days (labeled regimen).',
    },
  ],
  contraindications: [
    'Known hypersensitivity to moxifloxacin or other fluoroquinolones',
  ],
  cautions: [
    'Higher cost than ciprofloxacin — check coverage before discharging a prescription the patient cannot fill',
    'Culture before starting if an infiltrate is present',
    'Does not precipitate on the cornea the way ciprofloxacin can, which makes serial examination cleaner',
    'A corneal infiltrate or hypopyon is an emergency referral, not a prescription',
  ],
  monitoring: 'Same as ciprofloxacin ophthalmic: daily review while the defect persists in a lens wearer, acuity, fluorescein defect size, infiltrate.',
  notes: 'Fourth-generation quinolone with better gram-positive coverage than ciprofloxacin while retaining Pseudomonas activity, and preservative-free. For a painful, freshly de-epithelialized cornea the absence of benzalkonium chloride is a genuine comfort advantage.',
  citations: [
    'Lin A, Rhee MK, Akpek EK, et al. Bacterial Keratitis Preferred Practice Pattern. Ophthalmology. 2019;126(1):P1-P55.',
    'Vigamox (moxifloxacin hydrochloride ophthalmic solution 0.5%) prescribing information. Alcon/Novartis.',
  ],
};
```

---

### 24. `sulfamethoxazole-trimethoprim` — TMP-SMX / Bactrim

**References:** `oncological-emergencies.ts:727` (ICI toxicity recognition node) and `info-pages.ts:22446`
(universal CTCAE grading page). Hint: `pjp-prophylaxis` in both. Both say to add PJP prophylaxis when
steroids are ≥20 mg prednisone-equivalent for >4 weeks.

```typescript
const SULFAMETHOXAZOLE_TRIMETHOPRIM: DrugEntry = {
  id: 'sulfamethoxazole-trimethoprim',
  name: 'Sulfamethoxazole-trimethoprim (Bactrim, TMP-SMX)',
  genericName: 'Sulfamethoxazole / trimethoprim',
  drugClass: 'Folate synthesis inhibitor combination antibiotic',
  route: 'PO / IV',
  indications: ['Pneumocystis jirovecii pneumonia (PJP) prophylaxis during prolonged corticosteroid therapy', 'PJP treatment', 'Skin and soft tissue infection (MRSA)', 'Urinary tract infection'],
  dosing: [
    {
      indication: 'PJP prophylaxis — prolonged steroids / irAE management',
      regimen: '**One double-strength (DS) tablet PO once daily** (160 mg TMP / 800 mg SMX).\n\n**Equally acceptable alternatives:** one DS tablet three times weekly, or one single-strength tablet daily. All three are standard; the three-times-weekly schedule has the lowest adverse-event rate.\n\n**WHEN TO START:** prednisone-equivalent **>=20 mg daily for >4 weeks**. That threshold recurs across irAE and transplant guidance and is the trigger the consult uses.\n\n**WHEN TO STOP:** when the steroid taper drops below 20 mg prednisone-equivalent per day.\n\n**SULFA ALLERGY ALTERNATIVES:** atovaquone 1500 mg PO daily, dapsone 100 mg PO daily (check G6PD first), or inhaled pentamidine 300 mg monthly.',
    },
    {
      indication: 'PJP treatment',
      regimen: '**15-20 mg/kg/day of the TRIMETHOPRIM component**, IV or PO, divided every 6-8 hours, for 21 days.\n\n**ADD CORTICOSTEROIDS** if PaO2 <70 mmHg on room air or A-a gradient >35 mmHg: prednisone 40 mg BID x 5 days, then 40 mg daily x 5 days, then 20 mg daily to complete 21 days. Start steroids WITH or BEFORE the antibiotic.',
      weightCalc: { dosePerKg: 15, unit: 'mg', dailyDivided: 4, label: 'PJP treatment (trimethoprim component, low end of 15-20 mg/kg/day)' },
    },
    {
      indication: 'MRSA skin and soft tissue infection',
      regimen: '1-2 DS tablets PO twice daily x 5-10 days. Does not reliably cover group A streptococcus — add cephalexin if cellulitis without abscess.',
    },
  ],
  contraindications: [
    'Documented sulfonamide hypersensitivity, including prior SJS/TEN or DRESS',
    'Megaloblastic anemia due to folate deficiency',
    'Third trimester of pregnancy and infants <2 months',
    'Severe hepatic or renal impairment (CrCl <15 without adjustment)',
  ],
  cautions: [
    'HYPERKALEMIA — trimethoprim blocks the distal tubular sodium channel. Real and underappreciated, especially with ACE inhibitors, ARBs, spironolactone, or CKD.',
    'Creatinine rises without a true GFR change (tubular secretion inhibition) — do not chase it as AKI, but do not assume either',
    'WARFARIN INTERACTION — potent CYP2C9 inhibition, INR can climb sharply. Reduce the warfarin dose and check an INR within days.',
    'Methotrexate: additive antifolate toxicity, potentially severe. Avoid the combination.',
    'SJS/TEN, DRESS, and drug-induced aseptic meningitis',
    'Myelosuppression, worse in the already-cytopenic oncology patient',
    'Photosensitivity',
  ],
  monitoring: 'Potassium and creatinine at baseline and periodically. CBC on prolonged therapy. INR closely if on warfarin. Any new rash gets evaluated immediately, not dismissed.',
  notes: 'Sequential blockade of bacterial folate synthesis. For the immune-checkpoint-inhibitor patient on a long steroid taper, PJP prophylaxis is the step most often forgotten during a 4-6 week wind-down — and PJP in that population carries real mortality. The drug interactions, not the drug, are what get patients hurt.',
  citations: [
    'Schneider BJ, Naidoo J, Santomasso BD, et al. Management of Immune-Related Adverse Events in Patients Treated With Immune Checkpoint Inhibitor Therapy: ASCO Guideline Update. J Clin Oncol. 2021;39(36):4073-4126.',
    'Bactrim (sulfamethoxazole and trimethoprim) tablets prescribing information.',
    'Stern A, Green H, Paul M, Vidal L, Leibovici L. Prophylaxis for Pneumocystis pneumonia in non-HIV immunocompromised patients. Cochrane Database Syst Rev. 2014;(10):CD005590.',
  ],
};
```

**Pediatric gap:** pediatric PJP prophylaxis is dosed by **body surface area** (150 mg TMP/m²/day), which
the `WeightCalc` schema cannot express. I left peds dosing out rather than approximate it into a weight
formula. If Andy wants peds PJP in the entry, it needs a text-only regimen with no calculator.

---

### 25. `amlodipine`

**Reference:** `peds-hypertensive-emergency.ts:170`, "Treatment: Hypertensive Urgency (Oral)".
**Bare link, no indication hint** — same defect as nitroprusside. Consult states 0.1-0.3 mg/kg/day PO,
max 10 mg/day.

```typescript
const AMLODIPINE: DrugEntry = {
  id: 'amlodipine',
  name: 'Amlodipine (Norvasc)',
  genericName: 'Amlodipine besylate',
  drugClass: 'Dihydropyridine calcium channel blocker (long-acting)',
  route: 'PO',
  indications: ['Pediatric hypertensive urgency — oral therapy', 'Chronic hypertension', 'Chronic stable angina'],
  dosing: [
    {
      indication: 'Pediatric hypertensive urgency / chronic pediatric hypertension',
      regimen: '**Children 6-17 years: 2.5-5 mg PO once daily** (the FDA-studied pediatric range).\n\n**Weight-based, used in younger children:** 0.1-0.3 mg/kg/day PO once daily, **maximum 10 mg/day**. Younger children require higher per-kilogram doses than adolescents.\n\n**SLOW ONSET IS THE POINT AND THE PROBLEM.** Peak effect takes days. It is a poor choice when you need to see the pressure move during the ED stay — but a good choice for the asymptomatic patient going home on scheduled therapy.\n\n**BP TARGET IN URGENCY:** reduce by no more than 25% in the first 8 hours, then normalize gradually over 24-48 hours. The 25% rule applies even when there is no end-organ damage.\n\n**FASTER ORAL ALTERNATIVES** when you need to see an effect before disposition: isradipine 0.05-0.1 mg/kg/dose q6-8h (onset 1-2 h), [labetalol](#/drug/labetalol/peds-htn-urgency-oral) 1-3 mg/kg/day divided BID-TID, clonidine.\n\n**Consult pediatric nephrology or cardiology before discharge**, and arrange follow-up within one week.',
      weightCalc: [
        { dosePerKg: 0.1, unit: 'mg', maxDose: 10, label: 'Starting dose (0.1 mg/kg/day)' },
        { dosePerKg: 0.3, unit: 'mg', maxDose: 10, label: 'Upper range (0.3 mg/kg/day)' },
      ],
    },
    {
      indication: 'Adult hypertension',
      regimen: '5 mg PO once daily, titrate to 10 mg daily. Start at 2.5 mg in the elderly, in hepatic impairment, or when adding to an existing regimen.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to amlodipine or other dihydropyridines',
    'Severe aortic stenosis (relative — afterload reduction can drop coronary perfusion)',
    'Cardiogenic shock',
  ],
  cautions: [
    'Onset is too slow for anything that needs to be fixed during the ED encounter',
    'Peripheral edema is dose-dependent and the commonest reason children and adults stop it',
    'Reflex tachycardia, flushing, headache',
    'Hepatic metabolism — start at the low end in hepatic impairment; no renal adjustment needed',
    'CYP3A4 substrate: simvastatin dose must be capped at 20 mg; interactions with clarithromycin and azole antifungals',
    'Gingival hyperplasia with chronic use',
  ],
  monitoring: 'Blood pressure at 1, 2, 4, and 8 hours in the ED. Peripheral edema and heart rate at follow-up. Confirm correct cuff size — a cuff that is too small is still the leading cause of a falsely elevated pediatric blood pressure.',
  notes: 'Long half-life gives smooth once-daily control with little reflex tachycardia, which is what makes it a good chronic pediatric agent and a mediocre acute one. The AAP guideline does not publish a mg/kg table; the weight-based range above comes from the pediatric pharmacology literature (mean effective dose 0.16 +/- 0.12 mg/kg/day), and the 2.5-5 mg once-daily figure is the FDA-studied range in children 6-17.',
  citations: [
    'Flynn JT, Kaelber DC, Baker-Smith CM, et al. Clinical Practice Guideline for Screening and Management of High Blood Pressure in Children and Adolescents. Pediatrics. 2017;140(3):e20171904.',
    'Flynn JT, Smoyer WE, Bunchman TE. Treatment of hypertensive children with amlodipine. Am J Hypertens. 2000;13(10):1061-1066.',
    'Norvasc (amlodipine besylate) tablets prescribing information. Pfizer.',
  ],
};
```

**Source honesty:** the **0.1-0.3 mg/kg/day figure is not from a Tier 1 guideline.** The AAP 2017 CPG does
not publish a mg/kg amlodipine dose. It is derived from Flynn's pediatric pharmacology data (mean
0.16 ± 0.12 mg/kg/day) — Tier 3. The FDA-labeled 2.5-5 mg once daily for ages 6-17 is the Tier 1 number,
and I put it first in the regimen for that reason. **Andy should decide which one leads.**

---

### 26. `aripiprazole`

**Reference:** `acute-psychosis.ts:203`, "Antipsychotic Dosing" table. Hint: `psychosis`.
Consult states start 5-10 mg daily, target 10-15 mg/day, in a **first-episode** table.

```typescript
const ARIPIPRAZOLE: DrugEntry = {
  id: 'aripiprazole',
  name: 'Aripiprazole (Abilify)',
  genericName: 'Aripiprazole',
  drugClass: 'Second-generation antipsychotic — dopamine D2 partial agonist',
  route: 'PO / IM',
  indications: ['First-episode psychosis / schizophrenia', 'Bipolar mania', 'Adjunct in major depressive disorder'],
  dosing: [
    {
      indication: 'First-episode psychosis',
      regimen: '**START 5-10 mg PO once daily. TARGET 10-15 mg/day.**\n\n**FIRST-EPISODE PATIENTS NEED LOWER DOSES than chronically treated patients** — they are more responsive and far more sensitive to extrapyramidal effects. Do not start a drug-naive patient where you would start someone who has been on antipsychotics for a decade.\n\n**MAXIMUM 30 mg/day**, though there is no efficacy advantage above 15 mg/day in most trials.\n\n**WHY IT IS OFTEN CHOSEN FIRST:** the most favorable metabolic profile of the commonly used second-generation agents, minimal prolactin elevation, and weight-neutral relative to olanzapine.\n\n**AKATHISIA IS THE CHARACTERISTIC PROBLEM** — it is more common with aripiprazole than most SGAs, and patients describe it as unbearable inner restlessness. It is frequently misread as worsening agitation and treated with more antipsychotic, which makes it worse. Treat with dose reduction, propranolol, or a benzodiazepine.\n\n**BASELINE BEFORE STARTING:** weight, BMI, waist circumference, fasting glucose, lipid panel, ECG for QTc.',
    },
    {
      indication: 'Acute agitation — IM',
      regimen: '9.75 mg IM, may repeat after 2 hours. Maximum 30 mg/day.\n\n**NOT the ED first choice for undifferentiated agitation.** Onset is slower than the standard options. For acute agitation use [droperidol](#/drug/droperidol/acute agitation), [haloperidol](#/drug/haloperidol/acute agitation) + [lorazepam](#/drug/lorazepam/agitation), [midazolam](#/drug/midazolam/acute agitation), or [ketamine](#/drug/ketamine/agitation).\n\n**Do NOT combine IM aripiprazole with IM benzodiazepines** — excess sedation and hypotension.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to aripiprazole',
  ],
  cautions: [
    'AKATHISIA — the signature adverse effect. Ask about it directly; patients rarely volunteer it in usable words.',
    'Boxed warning: increased mortality in elderly patients with dementia-related psychosis',
    'Boxed warning: suicidal thoughts in young adults when used as an antidepressant adjunct',
    'Impulse-control disorders — pathological gambling, hypersexuality, compulsive eating. Uncommon but well documented and easily missed.',
    'Neuroleptic malignant syndrome',
    'Tardive dyskinesia with prolonged use',
    'Orthostatic hypotension on initiation',
    'CYP2D6 and CYP3A4 substrate: halve the dose with strong inhibitors, double it with strong inducers',
  ],
  monitoring: 'Baseline and periodic weight, BMI, waist circumference, fasting glucose, lipids. ECG for QTc. AIMS examination for tardive dyskinesia on maintenance. Ask about akathisia at every visit.',
  notes: 'A D2 partial agonist rather than a pure antagonist — it stabilizes dopaminergic tone rather than shutting it down, which explains both the low prolactin effect and the akathisia. In the ED the realistic role is initiating maintenance therapy for a first-episode patient with confirmed psychiatric follow-up, not managing the agitated patient in front of you.',
  citations: [
    'Keepers GA, Fochtmann LJ, Anzia JM, et al. The American Psychiatric Association Practice Guideline for the Treatment of Patients With Schizophrenia. Am J Psychiatry. 2020;177(9):868-872.',
    'Abilify (aripiprazole) tablets prescribing information. Otsuka America.',
  ],
};
```

---

### 27-29. PTSD first-line pharmacotherapy: `sertraline`, `paroxetine`, `venlafaxine-xr`

**Reference for all three:** `ptsd-screening.ts:340`, "First-Line PTSD Pharmacotherapy" result node.
Hint: `ptsd`. The node cites 2023 VA/DoD CPG Recommendation 15 and states the start and target doses
I drafted to. All three match.

```typescript
const SERTRALINE: DrugEntry = {
  id: 'sertraline',
  name: 'Sertraline (Zoloft)',
  genericName: 'Sertraline hydrochloride',
  drugClass: 'Selective serotonin reuptake inhibitor (SSRI)',
  route: 'PO',
  indications: ['PTSD (FDA-approved)', 'Major depressive disorder', 'Panic disorder', 'OCD', 'Social anxiety disorder'],
  dosing: [
    {
      indication: 'PTSD',
      regimen: '**START 25 mg PO daily x 1 week**, then increase to 50 mg daily.\n\n**TARGET 50-200 mg/day.** Titrate in 25-50 mg steps at intervals of at least 1 week based on response and tolerability.\n\n**FDA-APPROVED for PTSD** and one of three agents carrying a strong recommendation in the 2023 VA/DoD CPG (with paroxetine and venlafaxine XR).\n\n**COUNSEL BEFORE THEY LEAVE:**\n• Full effect takes **4-6 weeks**. A patient who quits at day 10 because "it is not working" is the commonest failure mode.\n• Transient activation, anxiety, and insomnia in the first 1-2 weeks — expected, and it passes.\n• Sexual dysfunction is common. Say so up front; patients who are surprised by it stop the drug and do not come back.\n\n**NOT FOR THE ACUTE STRESS DISORDER WINDOW (<1 month post-trauma).** The evidence for SSRIs is in chronic PTSD. Acute-window pharmacoprevention has failed in trials.\n\n**ED CLINICIANS TYPICALLY DEFER INITIATION** unless robust outpatient follow-up is already arranged. Starting an SSRI without a follow-up plan is worse than not starting one.',
    },
  ],
  contraindications: [
    'Concurrent MAO inhibitor, or within 14 days of stopping one',
    'Concurrent pimozide',
    'Concurrent disulfiram with the oral solution (contains alcohol)',
  ],
  cautions: [
    'Boxed warning: increased suicidal ideation in children, adolescents, and young adults — pair initiation with a safety plan and a C-SSRS screen',
    'Serotonin syndrome, particularly with triptans, tramadol, linezolid, or other serotonergic agents',
    'Hyponatremia/SIADH, especially in the elderly',
    'Bleeding risk, additive with NSAIDs and anticoagulants',
    'Discontinuation syndrome if stopped abruptly — taper',
    'Mild QTc prolongation at higher doses',
  ],
  monitoring: 'C-SSRS at initiation and at follow-up. Sodium in elderly patients at 2-4 weeks. Response assessment at 4-6 weeks, not sooner.',
  notes: 'The best-tolerated of the three first-line PTSD agents and the usual default, with the fewest drug interactions of the SSRIs. Fluoxetine was REMOVED from the recommended list in the 2023 VA/DoD CPG update after a negative clinician-rated trial — do not substitute it for sertraline out of habit.',
  citations: [
    'US Department of Veterans Affairs / Department of Defense. VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0; 2023. Recommendation 15.',
    'Zoloft (sertraline hydrochloride) tablets prescribing information. Pfizer/Viatris.',
  ],
};

const PAROXETINE: DrugEntry = {
  id: 'paroxetine',
  name: 'Paroxetine (Paxil)',
  genericName: 'Paroxetine hydrochloride',
  drugClass: 'Selective serotonin reuptake inhibitor (SSRI)',
  route: 'PO',
  indications: ['PTSD (FDA-approved)', 'Major depressive disorder', 'Panic disorder', 'Generalized anxiety disorder', 'OCD'],
  dosing: [
    {
      indication: 'PTSD',
      regimen: '**START 10 mg PO daily.**\n\n**TARGET 20-50 mg/day.** Titrate in 10 mg steps at intervals of at least 1 week.\n\n**FDA-APPROVED for PTSD**; one of the three agents recommended in the 2023 VA/DoD CPG.\n\n**THE TRADE-OFFS THAT MATTER WHEN CHOOSING IT OVER SERTRALINE:**\n• **Shortest half-life of the SSRIs** — the worst discontinuation syndrome of the class. A patient who misses two doses can feel genuinely ill (dizziness, electric-shock sensations, irritability). Counsel about adherence and never stop it abruptly.\n• **Most anticholinergic SSRI** — sedation, constipation, dry mouth. Poor choice in the elderly.\n• **Most weight gain** of the class.\n• **Potent CYP2D6 inhibitor** — a real interaction burden (tamoxifen, metoprolol, tricyclics, codeine, tramadol).\n\nSame counseling as sertraline: 4-6 week onset, early activation, sexual dysfunction, safety plan.',
    },
  ],
  contraindications: [
    'Concurrent MAO inhibitor, or within 14 days of stopping one',
    'Concurrent thioridazine or pimozide',
    'Pregnancy — associated with cardiac malformations; avoid and choose sertraline instead',
  ],
  cautions: [
    'Boxed warning: suicidality in children, adolescents, and young adults',
    'Most severe discontinuation syndrome of the SSRIs — taper slowly',
    'Potent CYP2D6 inhibition: reduces tamoxifen efficacy, raises metoprolol and TCA levels, blocks codeine and tramadol activation',
    'Anticholinergic burden — avoid in the elderly and in narrow-angle glaucoma',
    'Weight gain',
    'Serotonin syndrome, hyponatremia, bleeding risk as a class effect',
  ],
  monitoring: 'C-SSRS at initiation and follow-up. Sodium in the elderly. Weight. Full interaction review before prescribing, particularly in oncology and cardiology patients.',
  notes: 'Effective and FDA-approved for PTSD, but the pharmacokinetics make it the harder drug to live with. Reserve it for the patient who has failed or not tolerated sertraline, or who is already established on it.',
  citations: [
    'US Department of Veterans Affairs / Department of Defense. VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0; 2023. Recommendation 15.',
    'Paxil (paroxetine hydrochloride) tablets prescribing information. Apotex/GSK.',
  ],
};

const VENLAFAXINE_XR: DrugEntry = {
  id: 'venlafaxine-xr',
  name: 'Venlafaxine XR (Effexor XR)',
  genericName: 'Venlafaxine hydrochloride extended-release',
  drugClass: 'Serotonin-norepinephrine reuptake inhibitor (SNRI)',
  route: 'PO',
  indications: ['PTSD (off-label, guideline-recommended)', 'Major depressive disorder', 'Generalized anxiety disorder', 'Social anxiety disorder'],
  dosing: [
    {
      indication: 'PTSD',
      regimen: '**START 37.5 mg PO daily.**\n\n**TARGET 75-300 mg/day.** Titrate in 37.5-75 mg steps at intervals of at least 1 week.\n\n**OFF-LABEL for PTSD but carries the same strong recommendation as sertraline and paroxetine in the 2023 VA/DoD CPG.**\n\n**THE BLOOD PRESSURE CAVEAT:** noradrenergic effect is dose-dependent and becomes clinically relevant above roughly 150 mg/day. **Check a baseline BP and recheck at each titration step.** Do not choose this agent for a patient with poorly controlled hypertension.\n\n**DISCONTINUATION SYNDROME is severe** — comparable to or worse than paroxetine. Taper over weeks, never stop abruptly, and make sure the patient can actually refill it.\n\n**Take with food.** Same 4-6 week onset counseling as the SSRIs.',
    },
  ],
  contraindications: [
    'Concurrent MAO inhibitor, or within 14 days of stopping one',
    'Uncontrolled narrow-angle glaucoma',
  ],
  cautions: [
    'Boxed warning: suicidality in children, adolescents, and young adults',
    'DOSE-DEPENDENT HYPERTENSION above ~150 mg/day — monitor BP at every titration',
    'Severe discontinuation syndrome; a missed prescription refill is a clinical event',
    'More dangerous in overdose than the SSRIs — seizures, cardiotoxicity, serotonin syndrome. Weigh this against overdose risk in a PTSD population with elevated suicide risk.',
    'Nausea on initiation is common; take with food',
    'Renal and hepatic impairment require dose reduction',
    'Serotonin syndrome, hyponatremia, bleeding risk',
  ],
  monitoring: 'Blood pressure at baseline and at every dose increase. C-SSRS at initiation and follow-up. Sodium in the elderly. Response at 4-6 weeks.',
  notes: 'Dual serotonergic and noradrenergic action, useful when comorbid depression or chronic pain is prominent. The two facts that should drive the choice: it raises blood pressure at higher doses, and it is meaningfully more toxic in overdose than an SSRI.',
  citations: [
    'US Department of Veterans Affairs / Department of Defense. VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0; 2023. Recommendation 15.',
    'Effexor XR (venlafaxine hydrochloride extended-release) capsules prescribing information. Pfizer/Upjohn.',
  ],
};
```

---

### 30. `prazosin`

**Reference:** `ptsd-screening.ts:353`, "Prazosin for PTSD Nightmares". Hint: `ptsd-nightmares`.
The consult carries an unusually complete evidence picture and the full Raskind titration; I drafted the
entry to match it exactly rather than introduce a competing schedule.

```typescript
const PRAZOSIN: DrugEntry = {
  id: 'prazosin',
  name: 'Prazosin (Minipress)',
  genericName: 'Prazosin hydrochloride',
  drugClass: 'Alpha-1 adrenergic antagonist',
  route: 'PO',
  indications: ['PTSD-related nightmares and sleep disruption (off-label)', 'Hypertension', 'BPH (off-label)'],
  dosing: [
    {
      indication: 'PTSD nightmares — Raskind titration protocol',
      regimen: '**START 1 mg PO at bedtime x 2 nights.**\n**THEN 2 mg PO at bedtime x 5 nights.**\n**THEN titrate weekly** until nightmares are absent or the ceiling is reached.\n\n**MAXIMUM TOTAL DAILY DOSE (Raskind PACT 2018):** 20 mg/day in men, 12 mg/day in women, in divided doses.\n\n**PRACTICAL BEDTIME CAPS (Harvard South Shore 2024-25):** ~15 mg qhs in men, ~10 mg qhs in women. If daytime hyperarousal persists, add a mid-morning dose of roughly one third the bedtime dose.\n\n**OLDER ADULTS:** mean effective dose is around 5 mg qhs, generally well tolerated without meaningful BP impact.\n\n**COUNSEL BEFORE THE FIRST DOSE:**\n• **First-dose orthostasis and syncope** — take it at bedtime, sit up slowly.\n• Hold the next dose if dizzy, and call.\n• **Check a blood pressure before initiating.** Do not start it in a symptomatically hypotensive patient.\n• Additive hypotension with PDE5 inhibitors (sildenafil, tadalafil) and any antihypertensive.',
    },
    {
      indication: 'What the evidence actually supports',
      regimen: '**IT TREATS THE NIGHTMARES, NOT THE PTSD.**\n\n• **PACT trial (Raskind, NEJM 2018):** negative across 26 weeks at 12 VA sites in clinically stable veterans — likely underpowered and over-selected, but negative.\n• **2025 meta-analysis (10 RCTs, n=648):** improves insomnia (SMD -0.654) and nightmares (SMD -0.641); **does NOT improve overall PTSD symptoms.**\n• **2023 VA/DoD CPG:** weak recommendation FOR prazosin for PTSD nightmares (Rec 32); **suggests AGAINST** prazosin for overall PTSD symptoms (Rec 18).\n\nSet the patient\'s expectation accordingly: this is a targeted sleep and nightmare intervention, not a treatment for the disorder.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to prazosin or other quinazolines',
    'Symptomatic hypotension',
  ],
  cautions: [
    'FIRST-DOSE PHENOMENON — syncope within 30-90 minutes of the first dose or after a dose increase. Always start at bedtime and always at 1 mg.',
    'Additive hypotension with PDE5 inhibitors and antihypertensives',
    'Intraoperative floppy iris syndrome — tell the patient to disclose it before any cataract surgery',
    'Priapism (rare)',
    'Tolerance and rebound nightmares if stopped abruptly',
    'Nasal congestion, headache, dizziness',
  ],
  monitoring: 'Blood pressure before initiation and after each titration step, sitting and standing. Nightmare frequency, which is the actual therapeutic endpoint. Daytime dizziness and falls, particularly in older adults.',
  notes: 'Blocks central alpha-1 receptors, dampening the noradrenergic surge implicated in trauma nightmares. Lipophilic enough to cross the blood-brain barrier, which is why it works where peripherally selective alpha blockers do not. Despite the negative PACT trial it remains first-line for PTSD-related sleep impairment in most algorithms — the discipline is being honest with the patient about what it will and will not fix.',
  citations: [
    'Raskind MA, Peskind ER, Chow B, et al. Trial of Prazosin for Post-Traumatic Stress Disorder in Military Veterans (PACT). N Engl J Med. 2018;378(6):507-517.',
    'US Department of Veterans Affairs / Department of Defense. VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0; 2023. Recommendations 18 and 32.',
    'Minipress (prazosin hydrochloride) capsules prescribing information. Pfizer.',
  ],
};
```

---

### 31-33. Non-benzodiazepine sleep bridges: `hydroxyzine`, `trazodone`, `mirtazapine`

**References:** `ptsd-screening.ts:261` (Acute Stress Disorder Management — hydroxyzine, trazodone) and
`:366` (Non-Benzo Sleep Bridges — all three). Hints: `anxiety`, `insomnia`, `depression`.

**Source honesty for all three:** these are **off-label sleep uses**. None of the three has an FDA-approved
insomnia indication, and no Tier 1 guideline publishes a dose for PTSD-related sleep. The ranges below are
the ranges the consult already states, which trace to the Harvard South Shore algorithm and VA practice
literature — Tier 3/4. I have said so in each entry rather than implying a label basis that does not exist.

```typescript
const HYDROXYZINE: DrugEntry = {
  id: 'hydroxyzine',
  name: 'Hydroxyzine (Vistaril, Atarax)',
  genericName: 'Hydroxyzine pamoate / hydroxyzine hydrochloride',
  drugClass: 'First-generation antihistamine (H1 antagonist) with anxiolytic effect',
  route: 'PO / IM',
  indications: ['Anxiety — short-term symptomatic relief', 'Sleep-onset insomnia in PTSD / acute stress disorder (off-label)', 'Pruritus'],
  dosing: [
    {
      indication: 'Anxiety / sleep bridge in PTSD or acute stress disorder',
      regimen: '**25-100 mg PO at bedtime.**\n\n**FIRST-LINE SLEEP-ONSET AGENT in the Harvard South Shore PTSD algorithm.** The reason it leads is not potency, it is that it is **non-habit-forming** in a population where benzodiazepines cause real harm.\n\n**START LOW — 25 mg** — and titrate. 100 mg produces a sedation hangover in many patients.\n\n**FOR DAYTIME ANXIETY (labeled use):** 50-100 mg PO four times daily as needed, though the sedation makes this impractical for most working patients.\n\n**AVOID BENZODIAZEPINES IN PTSD.** They worsen outcomes, interfere with trauma-focused therapy, and carry dependence risk in a high-risk population. That is the whole point of this drug being on the list.',
    },
  ],
  contraindications: [
    'Known hypersensitivity to hydroxyzine or cetirizine',
    'Early pregnancy',
    'Prolonged QT interval or congenital long QT syndrome',
  ],
  cautions: [
    'ANTICHOLINERGIC — caution in the elderly (delirium, falls, urinary retention, constipation), narrow-angle glaucoma, and BPH',
    'QT prolongation, particularly with other QT-prolonging agents',
    'Additive sedation with alcohol, opioids, and other CNS depressants',
    'Next-day sedation at higher doses',
    'IM injection is painful and should be deep intramuscular only',
  ],
  monitoring: 'Sedation and next-day function. ECG if other QT-prolonging drugs are on board. In older patients, reassess cognition and fall risk at follow-up.',
  notes: 'Central H1 blockade produces sedation and mild anxiolysis without GABAergic dependence. Its role in PTSD is a bridge while trauma-focused therapy and, where indicated, an SSRI take effect — not a long-term plan.',
  citations: [
    'US Department of Veterans Affairs / Department of Defense. VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0; 2023.',
    'Vistaril (hydroxyzine pamoate) capsules prescribing information. Pfizer.',
  ],
};

const TRAZODONE: DrugEntry = {
  id: 'trazodone',
  name: 'Trazodone (Desyrel)',
  genericName: 'Trazodone hydrochloride',
  drugClass: 'Serotonin antagonist and reuptake inhibitor (SARI)',
  route: 'PO',
  indications: ['Insomnia (off-label)', 'PTSD-related sleep disruption and nightmares (off-label)', 'Major depressive disorder (labeled, at much higher doses)'],
  dosing: [
    {
      indication: 'Insomnia / PTSD sleep disruption',
      regimen: '**25-200 mg PO at bedtime. Most patients land at 50-150 mg.**\n\n**START 25-50 mg** and titrate to effect.\n\n**PTSD-SPECIFIC DATA (Palo Alto VA survey):** 72% reduction in nightmares, 92% improvement in sleep onset. Observational, not randomized, but it is the best PTSD-specific signal among the sleep bridges.\n\n**⚠️ WARN EVERY MALE PATIENT ABOUT PRIAPISM.** The referenced VA survey reported a **12% rate** of prolonged or painful erection. Say the words at the time of prescribing, and **ask directly at follow-up** — patients will not raise it. Instruct: any erection lasting more than 4 hours is a surgical emergency, go to an ED immediately.\n\n**AVOID FOR SLEEP IN PTSD:** Z-drugs (zolpidem, eszopiclone) — network meta-analysis found them ineffective here and they carry dependence and parasomnia risk. Benzodiazepines: no.\n\n**NOTE THE DOSE SEPARATION:** antidepressant dosing is 150-400 mg/day. The hypnotic dose is a fraction of that and is not an antidepressant dose.',
    },
  ],
  contraindications: [
    'Concurrent MAO inhibitor, or within 14 days of stopping one',
    'Known hypersensitivity to trazodone',
  ],
  cautions: [
    'PRIAPISM — reported in ~1 in 6,000 in labeling, but 12% for prolonged/painful erection in the PTSD survey data. Counsel explicitly and document that you did.',
    'Boxed warning: suicidality in children, adolescents, and young adults',
    'Orthostatic hypotension and falls, particularly in the elderly',
    'QT prolongation',
    'Next-day sedation and psychomotor impairment — counsel about driving',
    'Serotonin syndrome with other serotonergic agents',
    'Additive sedation with alcohol and opioids',
  ],
  monitoring: 'Ask directly about priapism at follow-up. Orthostatic vitals in older patients. Sedation and next-day function. ECG if QT risk factors.',
  notes: 'At low doses the effect is predominantly H1 and 5-HT2A antagonism, which is why it sedates without the dependence profile of a hypnotic. Widely used off-label for insomnia. The priapism counseling is the non-negotiable part of prescribing it.',
  citations: [
    'US Department of Veterans Affairs / Department of Defense. VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0; 2023.',
    'Desyrel (trazodone hydrochloride) tablets prescribing information.',
  ],
};

const MIRTAZAPINE: DrugEntry = {
  id: 'mirtazapine',
  name: 'Mirtazapine (Remeron)',
  genericName: 'Mirtazapine',
  drugClass: 'Noradrenergic and specific serotonergic antidepressant (NaSSA)',
  route: 'PO',
  indications: ['Major depressive disorder (labeled)', 'Insomnia with comorbid depression (off-label)', 'Depression with weight loss or anorexia'],
  dosing: [
    {
      indication: 'Depression with prominent insomnia / appetite loss',
      regimen: '**7.5-30 mg PO at bedtime** when used primarily for sleep.\n\n**Antidepressant dosing: 15-45 mg PO at bedtime.**\n\n**THE COUNTERINTUITIVE DOSE-RESPONSE:** **lower doses are MORE sedating.** At 7.5-15 mg the antihistamine effect dominates. As the dose rises, noradrenergic activity increases and the sedation lessens. A patient complaining of daytime grogginess on 15 mg may do better on 30 mg, not less.\n\n**BEST WHEN:** comorbid depression, weight loss, or anorexia — the appetite stimulation and weight gain are a therapeutic advantage in that patient and a liability in everyone else.\n\n**FOR PTSD SPECIFICALLY:** a 2024 network meta-analysis found **no PTSD-specific benefit.** It is an effective hypnotic in non-PTSD insomnia. Choose it for the comorbidity, not for the PTSD.',
    },
  ],
  contraindications: [
    'Concurrent MAO inhibitor, or within 14 days of stopping one',
    'Known hypersensitivity to mirtazapine',
  ],
  cautions: [
    'Boxed warning: suicidality in children, adolescents, and young adults',
    'WEIGHT GAIN and increased appetite — often substantial. A benefit in the cachectic patient, a dealbreaker in most others. Discuss before prescribing.',
    'Agranulocytosis and severe neutropenia (rare) — any fever or sore throat gets a CBC',
    'Sedation, most pronounced at low doses',
    'QT prolongation',
    'Orthostatic hypotension',
    'Serotonin syndrome with other serotonergic agents',
  ],
  monitoring: 'Weight at every visit. CBC if fever, sore throat, or other infection signs. Mood and suicidality. Sedation and next-day function.',
  notes: 'Blocks presynaptic alpha-2 autoreceptors (raising noradrenergic and serotonergic tone) plus 5-HT2, 5-HT3, and H1. The H1 blockade is what sedates, and it is the effect that is proportionally strongest at low dose. The dissolving tablet is useful in a patient who cannot swallow.',
  citations: [
    'US Department of Veterans Affairs / Department of Defense. VA/DoD Clinical Practice Guideline for the Management of Posttraumatic Stress Disorder and Acute Stress Disorder. Version 4.0; 2023.',
    'Remeron (mirtazapine) tablets prescribing information. Organon.',
  ],
};
```

---

### 34. `diclofenac` — topical 1% gel

**References:** `cervical-spine-nontraumatic.ts:187` (Radiculopathy — Conservative Management) and `:280`
(Mechanical / Myofascial Neck Pain). Hint: `MSK`. Both say "Topical Diclofenac 1% gel", and `:280` adds
"q6h locally". The consult uses only the topical form, so that is what leads the entry.

```typescript
const DICLOFENAC: DrugEntry = {
  id: 'diclofenac',
  name: 'Diclofenac 1% topical gel (Voltaren)',
  genericName: 'Diclofenac sodium 1% topical gel',
  drugClass: 'NSAID (non-selective COX inhibitor) — topical',
  route: 'Topical (oral formulations also exist)',
  indications: ['Mechanical / myofascial neck and back pain', 'Cervical radiculopathy — adjunctive analgesia', 'Osteoarthritis of joints amenable to topical therapy'],
  dosing: [
    {
      indication: 'Musculoskeletal / myofascial pain — topical',
      regimen: '**Apply to the affected area four times daily** (approximately every 6 hours).\n\n**HOW MUCH:** 2 g per application to an upper-extremity or neck site; 4 g per application to a lower-extremity site.\n\n**CEILINGS:** maximum 8 g per joint per day for upper-body sites, 16 g per joint per day for lower-body sites, and **not more than 32 g per day total across all sites.**\n\n**RUB IN THOROUGHLY. WASH YOUR HANDS AFTERWARD** (unless the hands are the treated site). Do not shower for at least 1 hour, and do not apply an occlusive dressing or heating pad over it.\n\n**WHY TOPICAL IS THE RIGHT CHOICE HERE:** systemic exposure is roughly 6% of an equivalent oral dose, so the GI, renal, and cardiovascular risks that make oral NSAIDs a problem in older patients are substantially reduced. Cochrane data support topical NSAIDs for acute musculoskeletal pain.\n\n**COMBINE WITH:** [naproxen](#/drug/naproxen/MSK) 500 mg BID or [ibuprofen](#/drug/ibuprofen/MSK) 600 mg TID plus scheduled [acetaminophen](#/drug/acetaminophen/MSK) 1 g q6h. **Do not stack topical and oral diclofenac** — that is a single systemic dose ceiling, not two.',
    },
    {
      indication: 'Oral formulation',
      regimen: 'Immediate-release 50 mg PO BID-TID (maximum 150 mg/day). Carries the full oral NSAID risk profile with no analgesic advantage over naproxen or ibuprofen for musculoskeletal pain. **The topical form is the reason this drug is in these consults** — if you want an oral NSAID, use naproxen or ibuprofen.',
    },
  ],
  contraindications: [
    'Known NSAID hypersensitivity, including aspirin-exacerbated respiratory disease',
    'Application to open wounds, broken skin, infected skin, or dermatitis',
    'Coronary artery bypass graft surgery, peri-operative period',
    'Third trimester of pregnancy',
  ],
  cautions: [
    'Boxed warnings (class): cardiovascular thrombotic events and serious GI bleeding — attenuated but not eliminated with topical use',
    'DO NOT STACK topical with oral NSAIDs; the daily ceiling is cumulative',
    'Application-site dermatitis is the commonest adverse effect',
    'Photosensitivity at the application site — counsel about sun exposure',
    'Avoid in CKD stage 4-5, decompensated heart failure, active peptic ulcer disease, and on anticoagulants where an oral NSAID would be avoided',
    'Not for the eyes or mucous membranes',
  ],
  monitoring: 'Application-site skin integrity. Renal function and blood pressure if used extensively, chronically, or in a patient with risk factors. GI symptoms.',
  notes: 'The clinical argument for topical diclofenac in neck pain is favorable risk, not superior efficacy — it lets you add an NSAID to a regimen in an older patient in whom a systemic NSAID would be a poor idea. Pair it with the non-pharmacologic advice that actually drives outcome in mechanical neck pain: no bed rest, early gentle range of motion, no prolonged soft collar, and physical therapy within 1-2 weeks.',
  citations: [
    'Voltaren Gel (diclofenac sodium topical gel) 1% prescribing information. GSK Consumer Healthcare.',
    'Derry S, Moore RA, Gaskell H, McIntyre M, Wiffen PJ. Topical NSAIDs for acute musculoskeletal pain in adults. Cochrane Database Syst Rev. 2015;(6):CD007402.',
  ],
};
```

---

### 35. `oxygen` — DO NOT AUTHOR. Remove the link.

**Reference:** `src/data/trees/acute-jaundice-hub.ts:161`, "Massive Hemolysis" result node. Hint: `hypoxia`.
The source text reads:

```
- If sickle cell: pain control, [oxygen if SpO2 <95%](#/drug/oxygen/hypoxia), exchange transfusion for severe crisis
```

**My verdict: this should not become a drug entry.** Reasons:

1. **The link text already contains the entire clinical content.** "Oxygen if SpO2 <95%" is the whole
   instruction. A pharmacy modal would open to tell the clinician something the sentence just told them.
2. **There is no dose, route, or regimen to put in `dosing[]`** that is not device-dependent and situational
   (nasal cannula, non-rebreather, HFNC, titrate to target saturation). Writing a fake regimen to satisfy
   the schema would be worse than the dead link.
3. **It sets a precedent that does not scale.** If oxygen is a drug-store entry, so are IV fluids, blood
   products, and ice packs. The drug store is for agents with a dose a clinician must look up.
4. **The one genuinely useful piece of guidance — the saturation target — is a clinical threshold that
   belongs in the tree, where it already is.**

**Proposed fix:**

```
- [oxygen if SpO2 <95%](#/drug/oxygen/hypoxia)
+ oxygen if SpO2 <95%
```

This is a link deletion, not a content change: the sentence a clinician reads is byte-identical afterward.
**No clinical sign-off needed** in my judgment, but I am not making the edit — Andy said draft only.

**If Andy disagrees** and wants the tap to do something, the better alternative is not a `DrugEntry` but a
link to an info page on oxygen targets in sickle cell disease (avoid hyperoxia, target SpO2 >=95%,
recognize acute chest syndrome), which would be genuinely useful at that decision point.

---

## Findings against the consults (NOT auto-fixed — every one needs Andy)

These came out of drafting. Each changes a number or a recommendation a clinician acts on, which puts all
of them above my autopilot authority. I applied nothing.

### F1 — Leucovorin dose exceeds every source I could reach. `toxic-alcohols.ts:303`

> "**[Folinic acid (leucovorin)](#/drug/leucovorin/methanol)** 50-100 mg IV Q4H"

Every source gives **1 mg/kg up to a 50 mg maximum per dose**, q4-6h. Some references stretch to 50-70 mg.
**I could not source 100 mg/dose.** Recommend changing to "1 mg/kg IV (max 50 mg/dose) q4-6h."
Severity: moderate. Leucovorin is not acutely toxic at 100 mg, so this is a correctness problem rather than
a safety emergency — but it is a number a clinician will dose to.

### F2 — Consults recommend sodium polystyrene sulfonate. `info-pages.ts:22555`

> "[Sodium polystyrene sulfonate](...) or [patiromer](...) for elimination"

SPS carries an FDA warning for fatal colonic necrosis; a systematic review found the colon involved in
76% of GI-injury cases with 33% mortality among them. This repo's own `sodium-zirconium-cyclosilicate`
entry calls it "antiquated and dangerous." Recommend the page lead with **SZC 10 g PO q8h or patiromer
8.4 g PO daily**, and mention SPS only as a fallback when neither is stocked.
Severity: moderate-high. This is a recommendation change, squarely Andy's call.

### F3 — Tocilizumab pediatric dose absent from all five referencing nodes

Every CRS node states "8 mg/kg IV (max 800 mg)" with no weight qualifier. The label specifies
**12 mg/kg for patients under 30 kg**, approved down to age 2. CAR-T is used in pediatric B-ALL, so this is
a reachable patient. Recommend adding the <30 kg dose to `oncological-emergencies.ts:631` and
`info-pages.ts:22402`.
Severity: moderate. Adding a dose is a clinical addition, not a citation fix.

### F4 — Tocilizumab dose ceiling stated as 3 doses/24h; label says 4 total

Consults say "may repeat q8h up to 3 doses in 24h." The label caps at **4 doses total**, minimum 8 hours
apart. The two are reconcilable (3 in any 24h, 4 overall) but the consult never states the total ceiling.
Severity: low. Recommend adding "maximum 4 doses total."

### F5 — Nitroprusside starting dose and the 10-minute rule. `peds-hypertensive-emergency.ts:159`

Consult lists 0.5-8 mcg/kg/min. Label initial is **0.3 mcg/kg/min**, maximum 10 mcg/kg/min, and
**infusion at the maximum rate must never exceed 10 minutes**. The consult's range is not wrong, but it
starts higher than label and omits the 10-minute rule, which is the specific instruction that prevents
cyanide toxicity.
Severity: moderate. Recommend adding both.

### F6 — Two drug links carry no indication hint (violates a MANDATORY rule in CLAUDE.md)

- `peds-hypertensive-emergency.ts:159` — `#/drug/nitroprusside` → should be `.../peds-htn-emergency`
- `peds-hypertensive-emergency.ts:170` — `#/drug/amlodipine` → should be `.../peds-htn-urgency-oral`

Every sibling link in both tables has a hint. These two were missed.
Severity: low, but it is a stated mandatory rule. **This one is a genuine AUTO-FIX** under my normal
authority — no dose changes, only the hint suffix. I did not apply it because this task was scoped to
draft-only. Say the word.

### F7 — Polymyxin B/trimethoprim interval. `corneal-fb-removal.ts:249`

Consult says "1 drop qid." The label interval for bacterial conjunctivitis is q3h, max 6 doses/day.
QID is standard practice for abrasion prophylaxis and I drafted the entry to QID accordingly.
Severity: negligible. Noted for completeness, no change recommended.

---

## Could not source / off-label — read before signing

Nothing in this file is a number I invented. Every dose traces to a named source. But the sources are not
all Tier 1, and Andy should know exactly which ones are not:

| Drug | Dose in question | Best source available | Tier |
|---|---|---|---|
| `cyproheptadine` | 12 mg then 2 mg q2h; 8 mg q6h maintenance | Boyer NEJM 2005 review + case series. **No FDA indication for serotonin syndrome. No society guideline publishes a dose.** | 3 |
| `papaverine` | 30-60 mg/h intra-arterial | ESVS 2017 guideline + retrospective series. Off-label; no RCT exists or is likely. | 1 guideline / 3 evidence |
| `amlodipine` | 0.1-0.3 mg/kg/day | Flynn Am J Hypertens 2000 (mean 0.16 ± 0.12 mg/kg/day). **AAP 2017 publishes no mg/kg dose.** FDA-labeled 2.5-5 mg once daily for ages 6-17 is the Tier 1 figure and leads the regimen. | 3 |
| `trazodone` | 25-200 mg qhs | Off-label. No labeled insomnia dose; the labeled antidepressant range is 150-400 mg/day. PTSD figures are from a VA survey (observational). | 3-4 |
| `hydroxyzine` | 25-100 mg qhs | Off-label for sleep. Labeled anxiolytic dosing is 50-100 mg QID. Harvard South Shore algorithm. | 4 |
| `mirtazapine` | 7.5-30 mg qhs | Off-label for sleep; labeled antidepressant range is 15-45 mg. 2024 NMA found no PTSD-specific benefit. | 3-4 |
| `pralidoxime` | Pediatric load, calculator value | Source range is 20-50 mg/kg; the schema takes one number, so the `weightCalc` uses mid-range 25 mg/kg. **Andy should confirm he wants the calculator returning mid-range rather than the low end.** | 1 (range) / judgment (point value) |
| `sulfamethoxazole-trimethoprim` | Pediatric PJP prophylaxis | **Omitted.** It is BSA-dosed (150 mg TMP/m²/day) and `WeightCalc` cannot express BSA. Needs a text-only regimen if wanted. | n/a |

**Marked UNSOURCED: none.** Where I could not find a source for a number the consult states (leucovorin
100 mg/dose), I drafted to the sourced number and raised it as finding F1 instead of writing it in.

---

## What I recommend NOT authoring

| id | Why | Fix |
|---|---|---|
| `oxygen` | Not a drug-store item. No dose, route, or regimen exists that is not device- and situation-dependent. The link text already carries the full instruction. Authoring it invites IV fluids and blood products next. | Delete the link markup, keep the sentence. Optionally point at an info page on oxygen targets in sickle cell disease. |
| `digoxin-immune-fab` | A complete, well-sourced entry already exists as `digifab`. A second entry forks the content and guarantees drift. | Repoint the link to `#/drug/digifab/chronic`. |
| `albuterol` | A complete entry already exists as `albuterol-neb`, whose first dosing block is the exact hyperkalemia regimen the info page states. | Repoint the link to `#/drug/albuterol-neb/hyperkalemia`. |

**And one I considered rejecting but did not:** `let-gel`. It is a compounded product, not a technique,
with a fixed composition, an applied volume, a contact time, and a genuine contraindication list. Aliasing
it to `lidocaine` would be actively harmful — that entry's laceration dosing is mg/kg infiltration, a
different drug given a different way with a different toxicity ceiling. Returning plausible but
inapplicable numbers is worse than returning nothing. **Author it.**

---

## What happens next

1. **Andy reviews and signs off drug by drug.** Every dose above is a number a clinician will act on.
   None of it ships on my authority.
2. On sign-off, the 32 approved entries go into `src/data/drug-store.ts` in **alphabetical position** with
   the existing `const NAME: DrugEntry = {...}` pattern, and each must be added to the exported drug map.
3. The 3 link changes (2 repoints + 1 removal) are separate one-line edits to `info-pages.ts`,
   `acute-jaundice-hub.ts`, and `peds-hypertensive-emergency.ts`.
4. Findings F1-F7 are decided independently — they are consult edits, not drug-store edits.
5. New drugs need a Supabase push (`node scripts/supabase-push.mjs <tree-id> --drugs <ids>`), then the full
   `/deploy` skill. Never manual deploy steps.

**Nothing has been applied. `src/data/drug-store.ts` is unmodified. No commit, no push, no deploy.**






