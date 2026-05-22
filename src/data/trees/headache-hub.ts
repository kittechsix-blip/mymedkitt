// MedKitt — Headache Hub (EM + Neurology dual-list, type: 'hub')
//
// FOURTH and FINAL split of the headache-hub batch (PLAN.md Phase 7).
// Built LAST so all cross-links resolve. First consumer of the `type: 'hub'`
// metadata field added in Phase 1 (R1).
//
// CROSS-LINK DIRECTIONALITY (PLAN.md R8):
//   Hub links INTO splits and into existing standalone consults.
//   Splits NEVER link back to the hub — this is the only file in the batch
//   that holds outbound `#/tree/<split>` references.
//
// HIDDEN GATE (PLAN.md R14 + R16): id added to BOTH FLAGS.hiddenTreeIds AND
//   FLAGS.hiddenHubs while staging. The `hiddenHubs` array is the kill switch
//   for the entire hub pattern — flipping it OFF hides every type:'hub' tree
//   without removing them from individual category lists, useful if the hub
//   rendering itself regresses.
//
// CANARY ORDER (PLAN.md §8.3): headache-hub is removed from hiddenTreeIds
//   LAST, after occipital-nerve-block + trigeminal-neuralgia + cluster-headache
//   have each soaked their gate periods clean.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const HEADACHE_HUB_NODES: DecisionNode[] = [
  // ============================================================
  // Module 1 — Red Flag Screener (SNOOP10 root)
  // ============================================================
  {
    id: 'hh-start',
    type: 'info',
    module: 1,
    title: 'Headache Hub — Start Here',
    body: 'Undifferentiated acute headache in the ED. This hub triages by **red flags first**, then sorts surviving phenotype into the right deep-dive consult.\n\nOpen first:\n- [Hub Steps Summary](#/info/hh-steps)\n- [Hub Stop / Pitfalls](#/info/hh-stop)\n\nThe SNOOP10 framework (Dodick 2003, updated 2018) catches >95% of secondary headaches when applied systematically. Run it on every undifferentiated HA before committing to a primary HA diagnosis.\n\n**What this hub will do:**\n1. Walk you through the SNOOP10 red flags (next 2 nodes)\n2. Triage surviving cases by phenotype into Module 2\n3. Show the shared workup all undifferentiated HAs need (Module 3)\n4. Map you to the right deep-dive consult (Module 5 Cross-Link Map)\n5. Anchor your disposition decision (Module 6)\n\n**What this hub will NOT do:** duplicate clinical content from the deep-dives. When you pick a phenotype, you leave the hub and work the dedicated consult.',
    citation: [1, 7, 13],
    next: 'hh-snoop10',
    summary: 'Undifferentiated acute HA. Run SNOOP10 → phenotype triage → deep-dive consult → dispo.',
    safetyLevel: 'warning',
  },
  {
    id: 'hh-snoop10',
    type: 'info',
    module: 1,
    title: 'SNOOP10 — The Red Flag Checklist',
    body: 'Walk the list. ANY positive → next node (red-flag triage).\n\n**S** — **Systemic** symptoms (fever, weight loss, night sweats), Systemic disease (cancer, immunocompromise, HIV, anticoagulation)\n**N** — **Neurologic** signs / symptoms: focal deficit, AMS, seizure, confusion, cognitive change\n**O** — **Onset** sudden (thunderclap, peak <1 min) or progressive over days\n**O** — **Older** age — first severe HA after age 50 (esp >65)\n**P** — **Pattern change** — new HA in a patient with prior primary HA; different quality/frequency/location\n\nExtended "10" criteria:\n**1.** **Positional** component — worse lying flat (raised ICP) or worse upright (CSF leak)\n**2.** **Precipitated by Valsalva / cough / exertion** — Chiari, RCVS, posterior fossa lesion\n**3.** **Papilledema** on fundoscopy — IIH, CVST, mass\n**4.** **Progressive** HA, atypical features (not pulsating; bilateral when always unilateral; etc.)\n**5.** **Pregnancy / postpartum** — pre-eclampsia, RCVS, CVST, pituitary apoplexy\n**6.** **Painful eye** with autonomic features — AACG, cluster, Tolosa-Hunt\n**7.** **Post-traumatic** — TBI, subdural, CSF leak, post-concussive\n**8.** **Pathology of immune system** — HIV, transplant, biologic immunosuppression\n**9.** **Painkiller overuse** — medication-overuse headache\n**10.** **Posterior** location — vertebral artery dissection, posterior fossa lesion',
    citation: [7, 13, 4],
    next: 'hh-redflag-q',
    summary: 'SNOOP10: Systemic, Neuro, Onset (thunderclap), Older, Pattern + Positional/Valsalva/Papilledema/Progressive/Pregnancy/Painful eye/Post-trauma/Immune/Painkiller/Posterior.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-redflag-q',
    type: 'question',
    module: 1,
    title: 'Any SNOOP10 Red Flag Positive?',
    body: 'Pick the most concerning category. Multiple positives = pick the one with the highest mortality risk first; you can return to address the others.',
    options: [
      {
        label: 'Thunderclap onset (peak <1 min)',
        description: 'SAH workup — Ottawa SAH Rule, non-contrast CT ± LP; also consider RCVS, cervical artery dissection, pituitary apoplexy',
        next: 'hh-thunderclap',
        urgency: 'critical',
      },
      {
        label: 'Focal neuro deficit, AMS, seizure',
        description: 'Stroke / ICH / mass / meningoencephalitis pathway',
        next: 'hh-neuro-deficit',
        urgency: 'critical',
      },
      {
        label: 'Painful eye + visual symptoms',
        description: 'AACG, cluster, Tolosa-Hunt — emergent ophthalmology if AACG suspected',
        next: 'hh-eye',
        urgency: 'urgent',
      },
      {
        label: 'Pregnancy / postpartum',
        description: 'Pre-eclampsia / eclampsia, RCVS, CVST, pituitary apoplexy — ALL more common in pregnancy/postpartum',
        next: 'hh-pregnancy',
        urgency: 'urgent',
      },
      {
        label: 'Trauma / post-traumatic',
        description: 'TBI workup, subdural / epidural screen, post-concussive evaluation',
        next: 'hh-trauma',
        urgency: 'urgent',
      },
      {
        label: 'Fever / immunocompromise',
        description: 'Meningitis / encephalitis pathway — LP early; do not delay empiric antibiotics for imaging',
        next: 'hh-fever',
        urgency: 'critical',
      },
      {
        label: 'Positional / papilledema / Valsalva-triggered',
        description: 'IIH / CVST / Chiari / posterior fossa lesion — MRI / MRV often needed',
        next: 'hh-positional',
        urgency: 'urgent',
      },
      {
        label: 'Toxic-metabolic exposure (winter heater, fuel-burning indoor, suicide attempt)',
        description: 'CO toxicity — check CO-Hgb; methemoglobinemia; uremia',
        next: 'hh-tox',
        urgency: 'critical',
      },
      {
        label: 'No SNOOP10 red flags — proceed to phenotype triage',
        description: 'Move to Module 2 (Differential Triage)',
        next: 'hh-phenotype-triage',
      },
    ],
    citation: [7, 13],
    summary: 'SNOOP10 routing: thunderclap, neuro deficit, painful eye, pregnancy, trauma, fever, positional, tox, OR no red flag → phenotype triage.',
    safetyLevel: 'critical',
  },
  {
    id: 'hh-thunderclap',
    type: 'result',
    module: 1,
    title: 'Thunderclap HA → SAH Workup First',
    body: 'Thunderclap headache (peak intensity in <1 minute) is SAH until proven otherwise. Mortality from missed SAH is ~50% over 30 days.\n\n**Pathway:**\n1. Open [SAH](#/tree/sah) for the Ottawa SAH Rule + non-contrast CT timing + LP indications.\n2. If non-contrast CT and CSF analysis are negative AND symptom onset >6 hours, consider:\n   - [Cervical Artery Dissection](#/tree/cervical-artery-dissection) — neck pain, Horner, recent trauma/manipulation\n   - [CVST](#/tree/cvst) — postpartum, hypercoag, papilledema\n   - RCVS (reversible cerebral vasoconstriction syndrome) — recurrent thunderclap over weeks, vasoactive trigger (cannabis, SSRI, postpartum)\n   - Pituitary apoplexy — sudden HA + visual field deficit + ophthalmoplegia\n3. If all of the above are excluded AND phenotype is otherwise migraine, primary thunderclap migraine variant is a diagnosis of exclusion.\n\n**Do NOT:** discharge any thunderclap HA without imaging. Even atypical migraineurs can present with first-thunderclap SAH.',
    recommendation: 'Open SAH consult; pursue CAD / CVST / RCVS / pituitary apoplexy if SAH workup negative.',
    confidence: 'definitive',
    citation: [5, 6, 13],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-neuro-deficit',
    type: 'result',
    module: 1,
    title: 'Focal Deficit / AMS / Seizure',
    body: 'Acute structural or infectious pathology. Image first; CT non-contrast for hemorrhage / mass effect; add contrast or MRI if infectious or tumor suspected.\n\n**Open the relevant consult:**\n- [SAH](#/tree/sah) if thunderclap onset is also present\n- [ICH](#/tree/ich) for any spontaneous intracranial bleed\n- Acute ischemic stroke pathway — open the Stroke consult for tPA / EVT decision and NIHSS\n- [Meningitis / Encephalitis](#/tree/meningitis) if fever + neuro signs OR isolated AMS in immunocompromised\n- [Status Epilepticus](#/tree/status-epilepticus) if active or recent seizure\n\nIf AMS is the dominant finding and no clear cause, work the broader AMS differential (DKA, hypoglycemia, NCSE, hyponatremia, sepsis, toxidromes) — HA may be incidental.',
    recommendation: 'Image first; open the relevant deep-dive consult.',
    confidence: 'definitive',
    citation: [13],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-eye',
    type: 'result',
    module: 1,
    title: 'Painful Eye + HA',
    body: 'Three high-stakes possibilities to triage before settling on primary HA:\n\n1. **[Acute Angle-Closure Glaucoma (AACG)](#/tree/aacg)** — fixed mid-dilated pupil, hazy cornea, IOP >40 mmHg, halos around lights, nausea/vomiting. Emergency — open the AACG consult NOW.\n2. **Cluster headache** — strictly unilateral periorbital + ipsilateral autonomic features (lacrimation, conjunctival injection, ptosis, miosis) + restlessness. Open [Cluster Headache](#/tree/cluster-headache).\n3. **Tolosa-Hunt syndrome** — painful ophthalmoplegia (CN III/IV/VI) from cavernous sinus granulomatous inflammation. Rare. MRI + neuro/ophtho consult; steroid-responsive.\n\n**Do NOT:** turn lights off or use mydriatic drops in suspected AACG (worsens angle closure).',
    recommendation: 'Check IOP, dilation, pupil response — rule out AACG before treating as cluster or Tolosa-Hunt.',
    confidence: 'definitive',
    citation: [13],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-pregnancy',
    type: 'result',
    module: 1,
    title: 'Pregnancy / Postpartum HA',
    body: 'Pregnancy and the postpartum period vastly broaden the headache differential. Three pregnancy-specific emergencies to consider in parallel:\n\n1. **[HTN in Pregnancy / Pre-eclampsia / Eclampsia](#/tree/htn-pregnancy)** — BP ≥140/90 (or rising from baseline) + proteinuria or end-organ signs. Magnesium prophylaxis; delivery is definitive Rx.\n2. **[CVST](#/tree/cvst)** — postpartum hypercoagulability peaks at ~3 weeks. Papilledema, seizure, focal deficit.\n3. **RCVS** — recurrent thunderclap HA, vasoconstriction on imaging, often postpartum or with vasoactive med exposure (ergots, SSRIs, cannabis). CTA/MRA. Calcium channel blocker (nimodipine) per neuro.\n\nAlso consider:\n- Pituitary apoplexy — Sheehan and pregnancy-related; sudden HA + visual field defect + ophthalmoplegia\n- Migraine — may worsen or remit in pregnancy; **avoid ergots, valproate; triptan + NSAID safety is gestational-age-dependent**\n- Carotid artery dissection — postpartum is a known risk window; [Cervical Artery Dissection](#/tree/cervical-artery-dissection)\n\n**Imaging in pregnancy:** non-contrast CT is acceptable for life-threats. MRI without gadolinium is preferred when available. Avoid gadolinium if possible (associated with rare adverse fetal outcomes; case-by-case with OB / radiology).',
    recommendation: 'Pre-eclampsia / CVST / RCVS first; image without gadolinium when feasible.',
    confidence: 'definitive',
    citation: [8],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-trauma',
    type: 'result',
    module: 1,
    title: 'Post-Traumatic HA',
    body: 'Mechanism + timing + new neuro features drive the workup:\n\n- **Acute post-traumatic HA (<7 days from injury)** with any red flag (LOC, GCS drop, focal deficit, repeated emesis, anticoagulation, age >65, severe mechanism) → non-contrast CT head. Open the trauma TBI / subdural pathway in your shop.\n- **Chronic post-traumatic HA (>3 months)** with no progressive features → conservative management, neuro / sports-medicine follow-up. Persistent post-concussive syndrome is well described; do NOT escalate workup without new red flags.\n- **Post-LP HA** — orthostatic component, history of recent LP. Hydration + caffeine + analgesia; blood patch if >24 h unresponsive.\n- **CSF leak (spontaneous or post-traumatic)** — orthostatic HA + tinnitus + nausea. MRI brain with contrast (diffuse pachymeningeal enhancement) + cisternogram if needed.\n\nFor more nuanced post-traumatic workup (Canadian CT Head Rule application, anticoagulation reversal, pediatric criteria), open your shop\'s TBI pathway or ICH consult as appropriate.',
    recommendation: 'CT for acute trauma with red flags; conservative for chronic without progression.',
    confidence: 'recommended',
    citation: [13],
  },
  {
    id: 'hh-fever',
    type: 'result',
    module: 1,
    title: 'Fever / Immunocompromise + HA',
    body: 'Meningitis / encephalitis until proven otherwise. **Empiric antibiotics within 1 hour of suspicion — do NOT delay for imaging or LP.**\n\nOpen [Meningitis / Encephalitis](#/tree/meningitis) for:\n- Empiric antibiotic + antiviral selection by age + immune status\n- CT-before-LP indications (decreased LOC, focal deficit, papilledema, immunocompromise, recent seizure)\n- CSF interpretation\n- Steroid adjunct (dexamethasone before/with first antibiotic dose for bacterial meningitis)\n\n**Additional considerations:**\n- HIV/AIDS — broaden to cryptococcal, TB, toxoplasmosis, PML; lower CD4 = broader workup\n- Recent neurosurgical procedure or VP shunt — gram-negative + staphylococcal coverage\n- Travel history — relevant for tickborne illness, malaria with CNS involvement\n- Endemic exposure (West Nile, EEE, etc.) seasonally\n\n**Do NOT:** delay empiric antibiotics waiting for CSF results in suspected bacterial meningitis.',
    recommendation: 'Empiric antibiotics within 1 hour. Open Meningitis/Encephalitis consult.',
    confidence: 'definitive',
    citation: [13],
    safetyLevel: 'critical',
  },
  {
    id: 'hh-positional',
    type: 'result',
    module: 1,
    title: 'Positional / Papilledema / Valsalva-Triggered',
    body: 'These features point to intracranial pressure abnormalities or posterior fossa pathology.\n\n- **Worse lying flat + papilledema + visual obscurations** → [IIH (Idiopathic Intracranial Hypertension)](#/tree/iih). Opening pressure on LP; visual field testing; acetazolamide.\n- **Postpartum / hypercoag + papilledema or seizure** → [CVST](#/tree/cvst). MRV.\n- **Worse upright + improved supine + post-LP or spontaneous onset** → CSF leak. Hydration, caffeine; blood patch if persistent; MRI for spontaneous leak.\n- **Worsened by cough / Valsalva / exertion** → posterior fossa lesion (Chiari I, tumor) or RCVS. MRI brain + cervical spine if Chiari suspected.\n\n**Fundoscopy at the bedside** is high-yield and under-performed. Document the absence or presence of papilledema explicitly.',
    recommendation: 'Open IIH or CVST consult based on context; MRI / MRV for most positional + posterior workups.',
    confidence: 'recommended',
    citation: [13],
  },
  {
    id: 'hh-tox',
    type: 'result',
    module: 1,
    title: 'Toxic-Metabolic Exposure',
    body: 'Open [CO Toxicity](#/tree/co-toxicity) for:\n- Winter heating exposure (faulty furnace, gas heater, generator indoor)\n- Fuel-burning indoor cooking\n- Suicide attempt\n- Multiple household members with HA / nausea\n- Cherry-red skin (late/severe) — most patients look normal\n\n**CO-Hgb level guides treatment:**\n- ≥25% → hyperbaric O₂ if available (UHMS 2019)\n- 15-24% with neuro symptoms or pregnancy → hyperbaric O₂ consideration\n- Any level + symptoms → 100% O₂ via NRB while disposition decided\n\n**Standard pulse oximeter is FALSELY NORMAL in CO toxicity** — must use co-oximetry (arterial or venous blood gas with co-oximetry, or specialized SpCO finger probe).\n\nOther toxic-metabolic causes worth considering: methemoglobinemia (cyanosis with normal pulse ox), uremia (BUN, creatinine), severe hypercapnia, hypoglycemia.',
    recommendation: 'Suspect CO → 100% O₂ NRB + CO-Hgb level + open CO Toxicity consult.',
    confidence: 'definitive',
    citation: [9, 13],
    safetyLevel: 'critical',
  },

  // ============================================================
  // Module 2 — Differential Triage (phenotype sort)
  // ============================================================
  {
    id: 'hh-phenotype-triage',
    type: 'question',
    module: 2,
    title: 'No Red Flags — Triage by Phenotype',
    body: 'Match the phenotype to the deep-dive consult. If multiple phenotypes overlap, pick the most acute and revisit the others.',
    options: [
      {
        label: 'Pulsating, photophobia/phonophobia, nausea — migraine phenotype',
        description: 'Open Migraine consult',
        next: 'hh-pheno-migraine',
      },
      {
        label: 'Severe unilateral periorbital + autonomic + restless — cluster phenotype',
        description: 'Open Cluster Headache',
        next: 'hh-pheno-cluster',
      },
      {
        label: 'Electric-shock V2/V3, triggered by touch/chewing — TN phenotype',
        description: 'Open Trigeminal Neuralgia',
        next: 'hh-pheno-tn',
      },
      {
        label: 'Bilateral pressing, non-disabling — tension-type phenotype',
        description: 'Outpatient management; rule out medication-overuse',
        next: 'hh-pheno-tension',
      },
      {
        label: 'Mixed / unclear phenotype',
        description: 'Move to Common Workup for further sort',
        next: 'hh-workup-vitals',
      },
    ],
    citation: [1, 2, 14],
    summary: 'Phenotype routing: migraine, cluster, TN, tension, OR mixed → workup.',
  },
  {
    id: 'hh-pheno-migraine',
    type: 'result',
    module: 2,
    title: 'Migraine Phenotype',
    body: 'Open the [Migraine](#/tree/migraine) consult for ICHD-3 diagnosis, abortive ladder (NSAID → triptan → DHE/IV cocktail), greater occipital nerve block for refractory, and disposition.\n\n**Hub-level reminders before you leave:**\n- Confirm no medication-overuse headache (acute Rx use ≥10 d/mo for triptans/ergots, ≥15 d/mo for simple analgesics) — different treatment trajectory.\n- Pregnancy considerations apply — see [HTN in Pregnancy](#/tree/htn-pregnancy) if BP elevated.\n- If refractory to ED cocktail → consider [Greater Occipital Nerve Block](#/tree/occipital-nerve-block).',
    recommendation: 'Open Migraine consult for abortive ladder + disposition.',
    confidence: 'definitive',
    citation: [14],
  },
  {
    id: 'hh-pheno-cluster',
    type: 'result',
    module: 2,
    title: 'Cluster Phenotype',
    body: 'Open [Cluster Headache](#/tree/cluster-headache). The hub-level rapid action while you transition: place patient on **100% O₂ via NRB at 12-15 L/min** (not nasal cannula) — diagnostic AND therapeutic in ~78%.',
    recommendation: 'Start O₂ NRB; open Cluster Headache for full pathway.',
    confidence: 'definitive',
    citation: [3, 14],
    safetyLevel: 'warning',
  },
  {
    id: 'hh-pheno-tn',
    type: 'result',
    module: 2,
    title: 'Trigeminal Neuralgia Phenotype',
    body: 'Open [Trigeminal Neuralgia](#/tree/trigeminal-neuralgia). Hub-level reminder: **screen HLA-B*1502 ancestry BEFORE starting carbamazepine** in Han Chinese / Thai / Vietnamese / Filipino / Malay / Indonesian patients. Bridge with gabapentin or baclofen while test pending.',
    recommendation: 'Open Trigeminal Neuralgia for full pathway with HLA + ladder.',
    confidence: 'definitive',
    citation: [12],
    safetyLevel: 'warning',
  },
  {
    id: 'hh-pheno-tension',
    type: 'result',
    module: 2,
    title: 'Tension-Type Phenotype',
    body: 'Bilateral pressing/tightening, mild-moderate, non-pulsating, no nausea, no aura. Lifetime prevalence is the highest of any HA.\n\n**ED management:**\n- Acetaminophen 1 g PO or NSAID (ibuprofen 600 mg / naproxen 500 mg) if no contraindication\n- Hydration\n- Brief observation if no red flags\n\n**Screen for medication-overuse headache (MOH):** acute Rx use ≥15 d/mo for simple analgesics OR ≥10 d/mo for combination/opioid/triptan. MOH presents AS tension-type or transformed migraine; differs in trajectory and requires withdrawal of overused agent.\n\n**Discharge counseling:**\n- Lifestyle: regular sleep, hydration, stress management, ergonomics\n- Avoid daily analgesic use (MOH risk)\n- PCP follow-up within 1-2 weeks if recurrent\n- Return for any SNOOP10 feature\n\nIf episodes are frequent or chronic, refer for prophylaxis discussion (amitriptyline at low dose is first-line for tension-type prophylaxis).',
    recommendation: 'Symptomatic Rx, MOH screen, PCP follow-up. Return precautions for SNOOP10.',
    confidence: 'recommended',
    citation: [14],
  },

  // ============================================================
  // Module 3 — Common Workup (shared diagnostic layer)
  // ============================================================
  {
    id: 'hh-workup-vitals',
    type: 'info',
    module: 3,
    title: 'Common Workup — Vitals + Bedside Exam',
    body: 'The shared diagnostic layer for undifferentiated HA after red flags are addressed.\n\n**Vitals trend (not single snapshot):**\n- BP — rising trend → consider hypertensive emergency, pre-eclampsia (if pregnant), RCVS\n- Temp — fever changes the pathway entirely (see [Meningitis](#/tree/meningitis))\n- HR — bradycardia + HA + papilledema = Cushing triad (raised ICP, late finding)\n- SpO₂ — must use co-oximetry if CO toxicity suspected (standard pulse ox is falsely normal)\n\n**Bedside neuro exam — high yield, under-performed:**\n- Mental status (orientation, attention, language)\n- Cranial nerves (esp. CN II visual fields, CN III/IV/VI EOMs, CN V sensation, CN VII symmetry, CN VIII hearing)\n- Motor + sensory screen all four limbs\n- Cerebellar (finger-nose, heel-shin, gait, rapid alternating movements)\n- Reflexes (asymmetry, Babinski)\n\n**Fundoscopy** — **document papilledema explicitly present or absent.** Even if you are uncertain, a "fundi non-visualized — dilated eye exam deferred" note is better than silence. Papilledema changes IIH, CVST, mass differentials immediately.',
    citation: [7, 13],
    next: 'hh-workup-imaging',
    summary: 'Vitals TREND. Full neuro exam. Fundoscopy — document papilledema explicitly.',
  },
  {
    id: 'hh-workup-imaging',
    type: 'info',
    module: 3,
    title: 'Common Workup — Imaging Decision Tree',
    body: '**Indications for non-contrast CT head:**\n- Any SNOOP10 red flag positive\n- New onset HA in age >50\n- Thunderclap onset\n- Focal deficit, AMS, seizure\n- Post-traumatic (per Canadian CT Head Rule)\n- HIV or immunocompromised with new HA\n- Anticoagulated patient with new HA\n\n**CT non-contrast first, then add modality based on suspicion:**\n- CTA/MRA brain + neck: suspected dissection ([Cervical Artery Dissection](#/tree/cervical-artery-dissection)), RCVS, vasculitis, vertebral artery pathology\n- CT venogram or MRV: suspected [CVST](#/tree/cvst)\n- MRI brain with contrast: suspected mass, infection, MS, lower-grade pathology missed on CT\n- LP: suspected [SAH](#/tree/sah) with negative CT >6 h from onset; suspected [Meningitis](#/tree/meningitis); suspected [IIH](#/tree/iih) (opening pressure)\n\n**CT BEFORE LP indicated when:**\n- Decreased LOC\n- Focal neuro deficit\n- Papilledema\n- Immunocompromise (HIV, transplant, biologic immunosuppression)\n- Recent seizure (within 1 week)\n- History of CNS disease (mass, stroke, focal infection)\n- Age >60\n- Otherwise, LP can proceed without CT.\n\n**Sensitivity caveats:**\n- Non-contrast CT for SAH: ~98% within 6 hours; drops sharply after 12-24 h. LP for xanthochromia is the rescue test after 6 h.\n- CT for cerebellar / posterior fossa pathology: lower sensitivity than MRI; have low threshold to MRI if posterior fossa suspected.',
    citation: [5, 6, 13],
    next: 'hh-workup-labs',
    summary: 'CT first for SNOOP10+, then CTA/MRV/MRI/LP by suspicion. CT before LP if AMS, focal, papilledema, immunocomp, recent seizure.',
  },
  {
    id: 'hh-workup-labs',
    type: 'info',
    module: 3,
    title: 'Common Workup — Labs',
    body: '**Targeted, not shotgun.** The selective panel by clinical suspicion:\n\n- **ESR + CRP** → temporal arteritis / GCA — age ≥50 + new HA + jaw claudication / visual symptoms / scalp tenderness / polymyalgia. ESR >50 supports. Empiric prednisone 60 mg PO daily AND temporal artery biopsy.\n- **CO-Hgb (co-oximetry — arterial or venous blood gas, OR specialized SpCO probe)** → winter heater, fuel-burning exposure, suicide attempt, multiple household members ill, cherry-red skin. Standard SpO₂ is FALSELY NORMAL.\n- **β-hCG** in any reproductive-age female with new HA — broadens differential to pregnancy emergencies ([HTN in Pregnancy](#/tree/htn-pregnancy), CVST, pituitary apoplexy, RCVS).\n- **Tox screen** if AMS, intentional ingestion suspected, suicidal context. Always test acetaminophen + salicylate levels in any overdose.\n- **BMP + glucose** for AMS, dehydration, suspected metabolic cause.\n- **CBC** for fever, suspected leukocytosis with infection, anemia / pallor.\n- **LFTs** when starting CBZ, oxcarbazepine, lamotrigine; when chronic alcohol use suspected.\n- **Lactate** if sepsis suspected.\n- **HIV** in any patient with risk factors and new HA — broadens immunocompromised differential.\n\n**Do NOT** order routine "headache panel" labs without a focused indication — low yield, distracts from imaging decisions.',
    citation: [13],
    next: 'hh-tools',
    summary: 'Targeted labs: ESR/CRP (GCA), CO-Hgb (co-ox), β-hCG (pregnancy), tox, BMP, CBC, LFTs, lactate, HIV.',
  },

  // ============================================================
  // Module 4 — Calculator Toolbar Overview
  // ============================================================
  {
    id: 'hh-tools',
    type: 'info',
    module: 4,
    title: 'Hub Toolbar — Quick-Access Tools',
    body: 'The hub toolbar holds quick-access tools that apply across all undifferentiated HA workups. Tap the bottom toolbar to open:\n\n- **Steps** — Hub Steps Summary overlay\n- **Red Flags** — jump to SNOOP10 checklist node\n- **Workup** — jump to Common Workup imaging decision\n- **Cross-Link Map** — jump to Module 5 consult map\n- **Stop** — Hub Stop / Pitfalls overlay\n\n**Calculators relevant to undifferentiated HA** (open from Med-Calc tab):\n- ICHD-3 Migraine vs Cluster vs Tension differentiator\n- Ottawa SAH Rule (in [SAH](#/tree/sah) consult)\n- NIHSS (in Stroke consult)\n- CO-Hgb threshold for hyperbaric O₂ (in [CO Toxicity](#/tree/co-toxicity) consult)\n\n**Drug references commonly needed at hub level** (open Pharmacy tab):\n- Triptans (acute migraine + cluster)\n- DHE (refractory)\n- Magnesium IV (migraine + cluster + eclampsia)\n- Metoclopramide / prochlorperazine + diphenhydramine (IV cocktail)\n- Dexamethasone (steroid bridge + meningitis adjunct)',
    citation: [],
    next: 'hh-crosslink-map',
    summary: 'Toolbar quick-access. Calculators + drugs live in their tabs; deep-dive consults hold full Rx detail.',
  },

  // ============================================================
  // Module 5 — Cross-Link Map (the visible "where to go next")
  // ============================================================
  {
    id: 'hh-crosslink-map',
    type: 'info',
    module: 5,
    title: 'Cross-Link Map — Pick the Right Deep-Dive',
    body: 'Every consult this hub points to, and **when to pick it**:\n\n**Primary HA disorders:**\n- [Migraine](#/tree/migraine) — pulsating + photophono + nausea + ≥5 lifetime attacks; ICHD-3 §1\n- [Cluster Headache](#/tree/cluster-headache) — severe unilateral periorbital + autonomic + restless; ICHD-3 §3.1\n- [Trigeminal Neuralgia](#/tree/trigeminal-neuralgia) — electric-shock V2/V3, triggered by light touch; ICHD-3 §13.1.1\n\n**Life-threats (red-flag positive):**\n- [SAH](#/tree/sah) — thunderclap onset; Ottawa SAH Rule\n- [ICH](#/tree/ich) — spontaneous intracranial bleed; reversal + BP control\n- [Meningitis / Encephalitis](#/tree/meningitis) — fever + meningismus / AMS / immunocompromised\n- [Cervical Artery Dissection](#/tree/cervical-artery-dissection) — neck pain + Horner / recent trauma or manipulation\n- [CVST](#/tree/cvst) — postpartum / hypercoag / papilledema / focal seizure\n- [AACG](#/tree/aacg) — painful red eye + mid-dilated pupil + IOP >40\n- [IIH](#/tree/iih) — papilledema + visual obscurations + obese reproductive-age female\n- [HTN in Pregnancy / Pre-eclampsia](#/tree/htn-pregnancy) — pregnant or postpartum + BP elevation\n- [CO Toxicity](#/tree/co-toxicity) — exposure history + multiple household members ill\n\n**Procedural option for refractory primary HA:**\n- [Greater Occipital Nerve Block](#/tree/occipital-nerve-block) — refractory cluster, status migrainosus, occipital neuralgia, cervicogenic, post-traumatic\n\n**When you leave the hub, you commit to the deep-dive workflow.** The hub is the triage map; the consults are the playbook.',
    citation: [13],
    next: 'hh-dispo',
    summary: 'Phenotype + red-flag map of every consult this hub points to. Hub triages; consults treat.',
  },

  // ============================================================
  // Module 6 — Disposition Anchor
  // ============================================================
  {
    id: 'hh-dispo',
    type: 'question',
    module: 6,
    title: 'Disposition — Admit / Observe / Discharge',
    body: 'Common framework across undifferentiated HA. Always defer to the deep-dive consult\'s specific disposition criteria once you commit to a phenotype.',
    options: [
      {
        label: 'Discharge — primary HA confirmed, treated, no red flags',
        description: 'Standard pathway for migraine, cluster (with bridge), TN (with titration), tension',
        next: 'hh-dispo-discharge',
      },
      {
        label: 'Observe — partial response, need re-evaluation, awaiting labs/imaging',
        description: 'ED observation unit or extended stay; revisit in 4-6 hours',
        next: 'hh-dispo-observe',
      },
      {
        label: 'Admit — red-flag workup positive, refractory, safety, or context demanding inpatient',
        description: 'Admit per the deep-dive consult\'s admit criteria',
        next: 'hh-dispo-admit',
        urgency: 'urgent',
      },
    ],
    citation: [13, 14],
    summary: 'Discharge if primary HA + treated + no flags. Observe if partial / pending. Admit if red flag + workup positive, refractory, or safety.',
  },
  {
    id: 'hh-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge — Universal HA Checklist',
    body: 'Before discharging any HA patient:\n\n1. SNOOP10 documented as negative (or red flag worked up to definitive resolution)\n2. Phenotype-specific deep-dive consult workflow completed (migraine cocktail given, cluster bridge initiated, etc.)\n3. Pain reduced to acceptable level (typically ≤3/10 or back to baseline)\n4. Tolerating PO at discharge\n5. **Suicide screen** if any consult-specific risk (cluster, TN, chronic migraine — all elevated SI)\n6. Follow-up arranged:\n   - PCP within 1-2 weeks for new tension-type, mild migraine\n   - Neurology within 1-2 weeks for new cluster, TN, refractory migraine, atypical features\n   - OB / MFM for pregnancy-related HA with BP component\n   - Ophthalmology for AACG, optic nerve / visual concerns\n7. **Written return precautions** including any SNOOP10 feature, severe pain unresponsive to home Rx, new neurologic symptom, fever, persistent vomiting, vision change\n8. Specific consult discharge bundle delivered (e.g., home O₂ + sumatriptan SQ for cluster; verapamil titration + ECG schedule for cluster maintenance)\n\nOpen the relevant deep-dive consult\'s discharge node for the consult-specific bundle.',
    recommendation: 'Discharge only after SNOOP10 cleared + treated + tolerating PO + follow-up arranged + written return precautions.',
    confidence: 'definitive',
    citation: [13, 14],
  },
  {
    id: 'hh-dispo-observe',
    type: 'result',
    module: 6,
    title: 'Observe — Partial Response or Pending Workup',
    body: 'ED observation unit (or extended stay if no obs unit) is appropriate when:\n\n- Partial response to initial Rx — needs second-line cocktail or re-evaluation\n- Awaiting CSF / labs / advanced imaging (MRI, MRV)\n- Status migrainosus on IV cocktail — assess at 4-6 h for response\n- Pain control insufficient for discharge but no admission criteria\n- Patient transportation / safety / social barriers to discharge\n\n**Reassessment at 4-6 h:**\n- Re-examine for any new neuro signs (red flag reappearance)\n- Pain score trend\n- Tolerating PO\n- If improving → transition to discharge bundle\n- If not improving → escalate to admit',
    recommendation: 'Observation with 4-6 h reassessment. Re-examine for new neuro signs; escalate if no improvement.',
    confidence: 'recommended',
    citation: [13],
  },
  {
    id: 'hh-dispo-admit',
    type: 'result',
    module: 6,
    title: 'Admit — Red-Flag Positive or Refractory',
    body: 'Admit when:\n\n- Any red-flag workup positive (SAH, ICH, meningitis, dissection, CVST, AACG with IOP not controlled, pre-eclampsia, severe CO toxicity)\n- Refractory primary HA after maximal ED therapy (status migrainosus failing IV cocktail + DHE; cluster failing O₂ + sumatriptan + ONB; TN crisis with dehydration)\n- Active suicidal ideation\n- Severe medication adverse event requiring monitored correction (significant hyponatremia, SJS/TEN suspicion, severe drug interaction)\n- Initiation of IV bridging therapy requiring continuous monitoring (IV DHE Raskin protocol, IV phenytoin/fosphenytoin loading)\n- Pregnancy-related HA with pre-eclampsia / eclampsia / RCVS / CVST findings\n- Inability to safely discharge (severe nutritional crisis, no outpatient O₂ access for cluster, no reliable outpatient monitoring for lithium initiation)\n\n**Service selection:**\n- Neurology for refractory primary HA, IV bridge, TN crisis\n- Medicine for general HA with infectious workup, comorbid medical issues\n- OB for pregnancy-related HA with BP component\n- Neurosurgery for SAH / ICH / mass lesion\n- ICU for AMS, hemodynamic instability, severe CO with hyperbaric pending',
    recommendation: 'Admit per deep-dive consult criteria. Match service to the dominant diagnosis.',
    confidence: 'recommended',
    citation: [13],
    safetyLevel: 'warning',
  },
];

export const HEADACHE_HUB_CRITICAL_ACTIONS = [
  { text: 'Run SNOOP10 on every undifferentiated HA before committing to a primary HA diagnosis.', nodeId: 'hh-snoop10' },
  { text: 'Thunderclap HA = SAH until proven otherwise. CT (98% sensitive ≤6 h) → LP for xanthochromia if >6 h or negative.', nodeId: 'hh-thunderclap' },
  { text: 'Fever + meningeal signs or immunocompromise = empiric antibiotics within 1 hour. Do NOT delay for imaging.', nodeId: 'hh-fever' },
  { text: 'Painful eye + mid-dilated pupil + IOP >40 = AACG emergency. Do NOT use mydriatic drops or turn lights off.', nodeId: 'hh-eye' },
  { text: 'Pregnancy / postpartum HA: pre-eclampsia / CVST / RCVS / pituitary apoplexy are all in the differential.', nodeId: 'hh-pregnancy' },
  { text: 'CO-Hgb requires co-oximetry — standard pulse ox is FALSELY NORMAL in CO toxicity.', nodeId: 'hh-tox' },
  { text: 'Fundoscopy at the bedside — document papilledema explicitly present or absent.', nodeId: 'hh-workup-vitals' },
  { text: 'CT before LP if AMS, focal deficit, papilledema, immunocompromise, recent seizure, or age >60.', nodeId: 'hh-workup-imaging' },
  { text: 'Targeted labs only — no routine "headache panel." Match the workup to the SNOOP10 hit.', nodeId: 'hh-workup-labs' },
  { text: 'Discharge requires: SNOOP10 cleared + treated + tolerating PO + follow-up arranged + written return precautions.', nodeId: 'hh-dispo-discharge' },
];

export const HEADACHE_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Headache Classification Committee of the International Headache Society (IHS). The International Classification of Headache Disorders, 3rd edition. Cephalalgia. 2018;38(1):1-211. (ICHD-3)' },
  { num: 2, text: 'Ailani J, Burch RC, Robbins MS. The American Headache Society Consensus Statement: Update on integrating new migraine treatments into clinical practice. Headache. 2021;61(7):1021-1039. (AHS 2021)' },
  { num: 3, text: 'Robbins MS, Starling AJ, Pringsheim TM, Becker WJ, Schwedt TJ. Treatment of Cluster Headache: The American Headache Society Evidence-Based Guidelines. Headache. 2016;56(7):1093-1106.' },
  { num: 4, text: 'Dodick DW. Pearls: headache. Semin Neurol. 2010;30(1):74-81. (SNOOP framework origin; updated to SNOOP10 in Do TP et al. Headache. 2018)' },
  { num: 5, text: 'Perry JJ, Stiell IG, Sivilotti ML, et al. Clinical decision rules to rule out subarachnoid hemorrhage for acute headache. JAMA. 2013;310(12):1248-1255. (Ottawa SAH Rule)' },
  { num: 6, text: 'Perry JJ, Sivilotti MLA, Sutherland J, et al. Validation of the Ottawa Subarachnoid Hemorrhage Rule in patients with acute headache. CMAJ. 2017;189(45):E1379-E1385.' },
  { num: 7, text: 'Edlow JA, Caplan LR. Avoiding pitfalls in the diagnosis of subarachnoid hemorrhage. N Engl J Med. 2000;342(1):29-36. / Edlow JA. Diagnosing headache in the emergency department. Lancet Neurol. 2008;7(8):743-754.' },
  { num: 8, text: 'American College of Obstetricians and Gynecologists. ACOG Committee Opinion No. 723: Guidelines for diagnostic imaging during pregnancy and lactation. Obstet Gynecol. 2017;130(4):e210-e216. / ACOG Practice Bulletin: Gestational hypertension and preeclampsia. Obstet Gynecol. 2020;135(6):e237-e260.' },
  { num: 9, text: 'Weaver LK; Undersea and Hyperbaric Medical Society. Hyperbaric oxygen therapy indications. 14th ed. UHMS, 2019. (HBO indications for CO poisoning)' },
  { num: 10, text: 'Wiffen PJ, et al. Carbamazepine for chronic neuropathic pain and fibromyalgia in adults. Cochrane Database Syst Rev. 2014;(4):CD005451.' },
  { num: 11, text: 'Cohen AS, Burns B, Goadsby PJ. High-flow oxygen for treatment of cluster headache: a randomized trial. JAMA. 2009;302(22):2451-2457.' },
  { num: 12, text: 'Cruccu G, Gronseth G, Alksne J, et al. AAN-EFNS guidelines on trigeminal neuralgia management. Neurology. 2008;71(15):1183-1190.' },
  { num: 13, text: 'Godwin SA, Cherkas DS, Panagos PD, Shih RD, Byyny R, Wolf SJ. Clinical Policy: Critical Issues in the Evaluation and Management of Adult Patients Presenting to the Emergency Department With Acute Headache. Ann Emerg Med. 2019;74(4):e41-e74. (ACEP 2019)' },
  { num: 14, text: 'Bendtsen L, Birk S, Kasch H, et al. Reference programme: diagnosis and treatment of headache disorders and facial pain. Danish Headache Society, 3rd edition, 2020.' },
];

export const HEADACHE_HUB_NODE_COUNT = HEADACHE_HUB_NODES.length;
export const HEADACHE_HUB_MODULE_LABELS = [
  'Red Flag Screener',
  'Differential Triage',
  'Common Workup',
  'Tools',
  'Cross-Link Map',
  'Disposition',
];
