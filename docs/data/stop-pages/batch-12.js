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
export const STOP_PAGES_12 = {
    'vertigo-stop': VERTIGO_STOP,
};
