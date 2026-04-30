// myMedKitt — Stop Pages Batch 12
// Vertigo consult critical pitfalls.
const VERTIGO_STOP = {
    id: 'vertigo-stop',
    title: 'Vertigo — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT use HINTS on BPPV or episodic vertigo',
            body: 'HINTS is only valid in patients with **continuous vertigo AND spontaneous nystagmus** (true AVS). In a BPPV patient who has no spontaneous nystagmus at rest, the Head Impulse Test will appear "normal" — which HINTS interprets as worrisome for stroke. This leads to unnecessary imaging and false alarm. [See this node](#/node/vert-hints-check).',
        },
        {
            heading: '🛑 Do NOT rely on CT to rule out posterior circulation stroke',
            body: 'CT sensitivity for acute posterior fossa ischemia is only **7-16%**. A negative CT does not rule out stroke — it only rules out hemorrhage. Posterior circulation strokes are missed in ~35% of ED cases, and over-reliance on CT is a leading cause. Use CT to exclude hemorrhage before thrombolytics; use MRI-DWI to evaluate for ischemia. [See this node](#/node/vert-stroke-imaging).',
        },
        {
            heading: '🛑 Do NOT trust a negative early MRI-DWI',
            body: 'DWI misses up to **20-35% of posterior circulation strokes in the first 24-48 hours**, especially small brainstem and lacunar strokes. If clinical suspicion is high but the first MRI is negative, **admit and repeat MRI at 48-72 hours**. Do not discharge based on a single negative early study in a patient with persistent symptoms or central features. [See this node](#/node/vert-stroke-disposition).',
        },
        {
            heading: '🛑 Do NOT assess nystagmus with visual fixation intact',
            body: 'Peripheral nystagmus **suppresses with fixation**. If you don\'t remove fixation (Frenzel goggles, ophthalmoscope trick, or blank paper), you will miss it and misclassify the patient. Always remove fixation before concluding "no nystagmus." [See this node](#/node/vert-hints-nystagmus).',
        },
        {
            heading: '🛑 Do NOT use the Epley maneuver for horizontal canal BPPV',
            body: 'Epley is specific to the **posterior canal**. For horizontal canal BPPV (diagnosed by supine roll test with geotropic or apogeotropic nystagmus), use the **Gufoni maneuver** or **Barbecue Roll**. Doing Epley on a horizontal canal BPPV patient will be ineffective and may worsen symptoms. [See this node](#/node/vert-horizontal-bppv).',
        },
        {
            heading: '🛑 Do NOT continue vestibular suppressants beyond 72 hours',
            body: 'Meclizine, benzodiazepines, and anticholinergics all **delay central vestibular compensation**. Prolonged use paradoxically extends the recovery period. Strict limit: **48-72 hours**. Prescribe for the acute severe phase only and emphasize early mobilization and vestibular rehabilitation. [See this node](#/node/vert-med-principles).',
        },
        {
            heading: '🛑 Do NOT discharge a patient who cannot walk unaided',
            body: '**Truncal ataxia — inability to sit or stand without support — is a red flag for cerebellar stroke.** Peripheral vestibular patients are unsteady but can walk with assistance. A patient who cannot walk unaided needs imaging and likely admission, regardless of HINTS findings. [See this node](#/node/vert-vn-disposition).',
        },
        {
            heading: '🛑 Do NOT dismiss vertigo in a high-risk patient',
            body: '**Age ≥60 + vascular risk factors + new spontaneous vertigo = TIA workup.** Recurrent posterior circulation TIAs are a harbinger of large vessel stroke. Do not label as "vestibular migraine" or "anxiety" without first imaging and obtaining neurology input. [See this node](#/node/vert-sevs-risk).',
        },
        {
            heading: '🛑 Do NOT attribute acute unilateral hearing loss + vertigo to "labyrinthitis"',
            body: 'New unilateral sensorineural hearing loss with vertigo = **AICA stroke** until proven otherwise. The labyrinthine artery is a branch of AICA — infarction causes combined auditory and vestibular symptoms that mimic labyrinthitis. Any acute SNHL + vertigo warrants MRI + MRA head/neck. [See this node](#/node/vert-hints-hearing).',
        },
        {
            heading: '🛑 Do NOT assume "positional" means "benign"',
            body: 'Central positional vertigo (cerebellar lesions) can mimic BPPV. Red flags: **pure vertical (downbeat) nystagmus without torsional component**, direction-changing nystagmus, no latency, no fatigue, duration >1 minute, or associated neurologic signs. Atypical Dix-Hallpike findings → image the posterior fossa. [See this node](#/node/vert-dix-hallpike).',
        },
    ],
    citations: [],
};
const TOXIC_ALCOHOLS_STOP = {
    id: 'toxic-alcohols-stop',
    title: 'Toxic Alcohols — Do NOT',
    subtitle: 'Critical pitfalls to avoid',
    sections: [
        {
            heading: '🛑 Do NOT discharge methanol or ethylene glycol from the ED',
            body: 'Both methanol and EG have **biphasic toxicity** — patients may appear clinically improved as intoxication wanes, only to deteriorate hours later as toxic metabolites accumulate. Formate (methanol) and glycolate/oxalate (EG) cause the organ damage, not the parent compounds. **All suspected methanol/EG ingestions require admission** for serial monitoring, even if initially asymptomatic.',
        },
        {
            heading: '🛑 Do NOT rely on osmolar gap alone to rule out toxic alcohol',
            body: 'Osmolar gap **normalizes as parent compound is metabolized**. A patient presenting late (>12-24h) with severe acidosis may have a normal osmolar gap because all the toxic alcohol has been converted to its toxic metabolite. **Late presentation = anion gap matters more than osmolar gap.** Early presentation = osmolar gap elevated. Late = anion gap elevated, osmolar gap may be normal.',
        },
        {
            heading: '🛑 Do NOT delay fomepizole for level confirmation',
            body: 'Toxic alcohol levels take **hours to days** to return from most labs. If clinical suspicion is high (elevated osmolar gap, AGMA, compatible history), **give fomepizole immediately**. The risk of withholding antidote far exceeds the cost of treating a false positive. Fomepizole is safe; formate blindness and oxalate renal failure are not.',
        },
        {
            heading: '🛑 Do NOT forget to redose fomepizole during hemodialysis',
            body: 'Fomepizole is dialyzable. Standard dosing is Q12H, but **during HD you must dose Q4H**. Missing doses during dialysis allows ADH to resume metabolizing the toxic alcohol to its dangerous metabolites. After HD ends, return to Q12H dosing.',
        },
        {
            heading: '🛑 Do NOT assume "antifreeze" means ethylene glycol',
            body: 'Modern RV/boat antifreeze and some de-icing products use **propylene glycol**, which is far less toxic. Traditional automotive antifreeze is EG. However, propylene glycol can still cause hyperosmolarity and lactic acidosis in massive ingestion. Always try to identify the actual product and its MSDS.',
        },
        {
            heading: '🛑 Do NOT give folic acid for ethylene glycol',
            body: '**Folic acid is for METHANOL** (enhances formate metabolism). For ethylene glycol, give **thiamine and pyridoxine** (shunt glyoxylic acid away from oxalate). Mixing up cofactors does not help the patient. Methanol → folate. EG → thiamine + pyridoxine.',
        },
        {
            heading: '🛑 Do NOT use ethanol therapy if fomepizole is available',
            body: 'Ethanol requires ICU-level monitoring, has a narrow therapeutic window (100-150 mg/dL), causes hypoglycemia, and is difficult to titrate. **Fomepizole is the preferred antidote** — predictable dosing, no CNS depression, does not require serum level monitoring. Use ethanol only if fomepizole is unavailable.',
        },
        {
            heading: '🛑 Do NOT miss isopropanol masquerading as EtOH intoxication',
            body: 'Isopropanol causes intoxication **2x more potent than ethanol** but does NOT cause metabolic acidosis (acetone is not an acid). Classic triad: **inebriation + ketosis WITHOUT acidosis + fruity breath**. Check serum acetone or beta-hydroxybutyrate. Isopropanol is generally supportive care only — no fomepizole needed.',
        },
        {
            heading: '🛑 Do NOT forget to call Poison Control',
            body: 'Toxic alcohol cases benefit from **real-time toxicology consultation**. Poison Control (1-800-222-1222) can help with: level interpretation, dialysis timing, antidote logistics, and disposition planning. They can also help coordinate care if the patient needs transfer for HD.',
        },
        {
            heading: '🛑 Do NOT underestimate lethal doses',
            body: '**Lethal doses are shockingly small.** Methanol: ~15-30 mL (1-2 tablespoons). Ethylene glycol: ~100 mL (~3 oz). Even small intentional ingestions warrant full workup and admission. Do not be falsely reassured by "just a sip" history — patients often underreport.',
        },
    ],
    citations: [],
};
export const STOP_PAGES_12 = {
    'vertigo-stop': VERTIGO_STOP,
    'toxic-alcohols-stop': TOXIC_ALCOHOLS_STOP,
};
