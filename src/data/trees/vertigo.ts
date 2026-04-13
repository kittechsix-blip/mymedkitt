// MedKitt — Vertigo: Evidence-Based ED Approach
// TITRATE triage → Central screen → BPPV (Dix-Hallpike/Epley) → HINTS/AVS → Vestibular Migraine → Disposition
// 6 modules: Initial Assessment → Central Screen → BPPV → HINTS → VM/s-EVS → Disposition
// 40 nodes total. Covers the "Big Three": BPPV, Vestibular Neuritis, Posterior Circulation Stroke.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const VERTIGO_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT & TRIAGE
  // =====================================================================

  {
    id: 'vert-start',
    type: 'info',
    module: 1,
    title: 'Vertigo: Initial Assessment',
    body: '[Vertigo Steps Summary](#/info/vertigo-summary) — timing-and-triggers approach (TITRATE), not quality of dizziness.\n\n**Core principle:** The word "dizzy" means different things. Focus on **timing** (constant vs episodic), **triggers** (spontaneous vs positional), and **exam findings** — NOT "is it vertigo or lightheadedness." Patients are unreliable on quality descriptors.\n\n**First actions:**\n• Full vitals **including orthostatic BP** — POTS and orthostatic hypotension masquerade as vertigo\n• Fingerstick glucose\n• Full neuro exam (cranial nerves, cerebellar, gait)\n• If altered, focal deficit, or severe headache → immediate central workup\n\n**The "Big Three" diagnoses to distinguish:**\n1. **BPPV** — brief, positional, Dix-Hallpike positive\n2. **Vestibular Neuritis** — acute, constant, HINTS peripheral\n3. **Posterior Circulation Stroke** — acute, constant, HINTS central or any red flag',
    citation: [1, 11],
    images: [{ src: 'images/vertigo/semicircular-canals.svg', alt: 'Human ear anatomy with semicircular canals', caption: 'Human ear anatomy: three semicircular canals (posterior, horizontal, superior), cochlea, utricle, and saccule. Posterior canal BPPV is most common (~85%). (Chittka & Brockmann, Wikimedia Commons, CC BY 2.5)' }],
    next: 'vert-true-vertigo',

    summary: 'TITRATE approach: classify dizziness by timing and triggers, not symptom quality — distinguish BPPV, vestibular neuritis, posterior stroke',
    skippable: true,
  },

  {
    id: 'vert-true-vertigo',
    type: 'question',
    module: 1,
    title: 'Characterize the Dizziness',
    body: 'Ask: "Can you describe what you feel without using the word dizzy?"\n\n**True vertigo** = illusory sense of motion (spinning, tilting, rocking). Often with nausea, nystagmus, gait disturbance.\n\n**Non-vertigo dizziness** = lightheaded, presyncope, "about to pass out," faint, weak. Points to orthostatic, cardiac, metabolic, or anemia etiology.\n\n**Disequilibrium** = unsteadiness without illusory motion. Often multifactorial (neuropathy, cerebellar, medication).\n\n**Remember:** patients often use "dizzy" for any of these. The history of **timing and triggers** is more reliable than how they describe the sensation.',
    citation: [1, 25, 26],
    options: [
      {
        label: 'True vertigo (illusory motion)',
        description: 'Spinning / tilting / rocking sensation',
        next: 'vert-vitals-check',
      },
      {
        label: 'Non-vertigo / lightheaded',
        description: 'Presyncope, near-faint, "about to pass out"',
        next: 'vert-non-vertigo-exit',
      },
    ],

    summary: 'Differentiate true vertigo (illusory motion) from presyncope/disequilibrium — patient descriptors are unreliable',
  },

  {
    id: 'vert-vitals-check',
    type: 'question',
    module: 1,
    title: 'Orthostatic Vital Signs',
    body: '**Get orthostatic vitals BEFORE assuming peripheral vestibular cause.** POTS and orthostatic hypotension frequently masquerade as vertigo — especially in young women and elderly.\n\n**Orthostatic criteria:**\n• **Orthostatic hypotension:** SBP drop ≥20 mmHg OR DBP drop ≥10 mmHg within 3 minutes of standing\n• **POTS:** HR increase ≥30 bpm (≥40 in adolescents) within 10 minutes of standing, without orthostatic hypotension\n\n**Pearl:** A patient who describes their "vertigo" as worse on standing, relieved by sitting, and lasts seconds-minutes likely has orthostatic intolerance, NOT peripheral vestibular disease. Treatment (hydration, salt, compression) is entirely different.',
    citation: [1, 24],
    options: [
      {
        label: 'Normal vitals / no orthostatic change',
        description: 'Proceed with vertigo workup',
        next: 'vert-time-course',
      },
      {
        label: 'Orthostatic hypotension or POTS pattern',
        description: 'Route to non-vestibular pathway',
        next: 'vert-non-vertigo-exit',
      },
    ],

    summary: 'Check orthostatic vitals before assuming vestibular cause — POTS and orthostatic hypotension masquerade as vertigo',
  },

  {
    id: 'vert-non-vertigo-exit',
    type: 'result',
    module: 1,
    title: 'Non-Vestibular Dizziness',
    body: 'This is likely **not peripheral or central vestibular disease.** Consider alternate etiologies:\n\n**Cardiovascular:**\n• Orthostatic hypotension (volume, meds, autonomic)\n• POTS / dysautonomia\n• Arrhythmia — consider [Syncope Evaluation](#/tree/syncope)\n• Aortic stenosis, HOCM\n\n**Metabolic / Hematologic:**\n• Hypoglycemia\n• Severe anemia / GI bleed\n• Electrolyte derangement\n• Thyroid disease\n\n**Medication side effects** — review med list (antihypertensives, diuretics, alpha-blockers, SSRIs, anticholinergics).\n\n**Disposition:** Address underlying cause. If syncope-spectrum → syncope workup + risk stratification. If medication-related → adjust. Patient education on fall prevention.',
    citation: [1, 25, 26],
    confidence: 'definitive',
  },

  {
    id: 'vert-time-course',
    type: 'question',
    module: 1,
    title: 'Time Course & Triggers (TITRATE)',
    body: 'Classify the vertigo syndrome by **timing and triggers** — this drives the rest of the workup:\n\n**Acute Vestibular Syndrome (AVS):**\n• Constant vertigo lasting hours to days\n• Persistent nausea/vomiting, gait instability\n• Spontaneous nystagmus present\n• → HINTS exam pathway\n\n**Triggered Episodic Vestibular Syndrome (t-EVS):**\n• Brief episodes <1 minute\n• **Triggered** by head position change (rolling over, looking up)\n• Asymptomatic between episodes\n• → BPPV pathway\n\n**Spontaneous Episodic Vestibular Syndrome (s-EVS):**\n• Episodes lasting minutes to hours\n• **No positional trigger** — occur at rest\n• Asymptomatic between episodes\n• → Vestibular migraine / TIA / Ménière pathway',
    citation: [1, 11, 24],
    options: [
      {
        label: 'AVS — Constant hours to days',
        description: 'Acute vestibular syndrome — HINTS pathway',
        next: 'vert-avs-path',
      },
      {
        label: 't-EVS — Brief, positional, <1 min',
        description: 'Triggered episodic — BPPV pathway',
        next: 'vert-tevs-path',
      },
      {
        label: 's-EVS — Spontaneous, min-hours',
        description: 'Spontaneous episodic — VM / TIA pathway',
        next: 'vert-sevs-path',
      },
    ],

    summary: 'Classify vertigo by timing/triggers: AVS (constant hours-days), t-EVS (brief positional), s-EVS (spontaneous episodic)',
  },

  {
    id: 'vert-avs-path',
    type: 'info',
    module: 1,
    title: 'Acute Vestibular Syndrome (AVS)',
    body: '**Definition:** Acute onset of continuous vertigo lasting >24 hours, with nausea/vomiting, head motion intolerance, unsteady gait, and **spontaneous nystagmus** on exam.\n\n**Key differential:**\n• **Vestibular neuritis** (peripheral) — viral inflammation of vestibular nerve\n• **Labyrinthitis** (peripheral) — vestibular neuritis + hearing loss\n• **Posterior circulation stroke** (central) — cerebellar or brainstem infarct\n• **Less common:** MS demyelination, vestibular schwannoma (subacute)\n\n**The critical challenge:** Vestibular neuritis and cerebellar stroke look nearly identical on history. **HINTS exam is more sensitive than early MRI** for distinguishing them (Kattah 2009).\n\n**Before HINTS:** Screen for red flags and central features first. HINTS is only valid in patients with spontaneous nystagmus and NO central findings.',
    citation: [2, 11, 12],
    next: 'vert-central-screen',

    summary: 'AVS = constant vertigo >24h with spontaneous nystagmus — key DDx: vestibular neuritis vs cerebellar stroke, HINTS exam is next',
    skippable: true,
  },

  {
    id: 'vert-tevs-path',
    type: 'info',
    module: 1,
    title: 'Triggered Episodic Vertigo (t-EVS)',
    body: '**Definition:** Brief episodes of vertigo (seconds to <1 minute) triggered by **head position change** — rolling over in bed, looking up ("top-shelf vertigo"), bending down.\n\n**Classic features:**\n• Episodes <1 minute, often seconds\n• No vertigo between episodes\n• Triggered reliably by specific head positions\n• No hearing loss, no tinnitus\n• No focal neurologic signs\n\n**Most common cause: BPPV** (Benign Paroxysmal Positional Vertigo) — ~85% posterior canal, ~15% horizontal canal, <1% anterior canal.\n\n**Critical pitfall:** Do NOT assume positional = benign. Central positional vertigo (cerebellar lesions) can mimic BPPV. Red flag features: vertical nystagmus on Dix-Hallpike without torsional component, direction-changing nystagmus, or associated neurologic signs → image instead.',
    citation: [7, 17, 19],
    next: 'vert-bppv-history',

    summary: 't-EVS = brief (<1min) positional episodes — most commonly BPPV, but central positional vertigo can mimic it',
    skippable: true,
  },

  {
    id: 'vert-sevs-path',
    type: 'info',
    module: 1,
    title: 'Spontaneous Episodic Vertigo (s-EVS)',
    body: '**Definition:** Episodes of vertigo lasting minutes to hours, occurring **without a positional trigger**. Patient is normal between episodes.\n\n**Differential:**\n• **Vestibular migraine** — most common cause; 50% have NO headache with vertigo\n• **Ménière disease** — vertigo + fluctuating hearing loss + tinnitus + aural fullness\n• **TIA (posterior circulation)** — especially in vascular risk patients\n• **Panic attack / anxiety** — diagnosis of exclusion\n• **Cardiac arrhythmia** — rule out with ECG\n\n**The critical question:** Is this vestibular migraine (benign) or TIA (stroke risk)? Vascular risk factors shift the workup toward imaging and secondary prevention.',
    citation: [8, 18, 22],
    next: 'vert-vm-criteria',

    summary: 's-EVS = spontaneous episodes min-hours — vestibular migraine most common, distinguish from TIA in vascular risk patients',
    skippable: true,
  },

  // =====================================================================
  // MODULE 2: CENTRAL FEATURE SCREEN
  // =====================================================================

  {
    id: 'vert-central-screen',
    type: 'question',
    module: 2,
    title: 'Central Feature Screen (Deadly D\'s)',
    body: '**Before performing HINTS**, screen for central red flags. ANY positive finding routes directly to stroke workup — HINTS is not needed and should not be used.\n\n**The Deadly D\'s:**\n• **D**ysarthria\n• **D**ysphagia\n• **D**iplopia\n• **D**ysmetria (finger-to-nose, heel-to-shin)\n• **D**ysphonia / hoarseness\n• **D**ownbeat or direction-changing nystagmus\n\n**Additional red flags:**\n• New severe headache or neck pain (dissection risk)\n• Focal weakness, sensory loss, or facial droop\n• Horner syndrome (ptosis, miosis, anhidrosis)\n• **Truncal ataxia — cannot sit or stand unassisted**\n• Altered mental status\n• Hiccups or loss of pain/temperature sensation (Wallenberg)\n• Unilateral hearing loss (AICA stroke)\n\n**Gait test:** Ask the patient to walk. Vestibular neuritis patients CAN walk (unsteady but ambulatory). Cerebellar stroke patients often CANNOT walk unaided.',
    citation: [1, 11, 12, 24],
    options: [
      {
        label: 'Any central feature present',
        description: 'Immediate stroke workup',
        next: 'vert-central-present',
        urgency: 'critical',
      },
      {
        label: 'No central features',
        description: 'Proceed to HINTS exam',
        next: 'vert-hints-check',
      },
    ],

    summary: 'Screen for Deadly Ds (dysarthria/dysphagia/diplopia/dysmetria) and red flags — ANY positive finding skips HINTS, goes to stroke workup',
    safetyLevel: 'critical',
  },

  {
    id: 'vert-central-present',
    type: 'info',
    module: 2,
    title: 'Central Features Present — Stroke Pathway',
    body: '**STOP. Do not perform HINTS exam.** Central features indicate posterior circulation stroke until proven otherwise.\n\n**Immediate actions:**\n• Activate stroke team / neurology consult\n• **Last known well time** — determines thrombolytic window\n• Continuous cardiac monitoring\n• IV access × 2\n• NPO\n• BP management if >220/120 (permissive hypertension in acute stroke)\n• [NIHSS](#/calculator/nihss) — note: NIHSS underscores posterior circulation strokes\n\n**Cross-link:** If meets stroke criteria, consider [Stroke Consult](#/tree/stroke) for time-based reperfusion decisions.\n\n**Key pearl:** Posterior circulation strokes have a **~35% miss rate in ED**. Any AVS patient with central features or inability to walk should be imaged and admitted, regardless of age.',
    citation: [6, 12, 24],
    next: 'vert-stroke-imaging',
    calculatorLinks: [{ id: 'nihss', label: 'NIHSS Calculator' }],

    summary: 'Central features present — activate stroke team, establish last known well, posterior circulation strokes have 35% ED miss rate',
    safetyLevel: 'critical',
  },

  {
    id: 'vert-stroke-imaging',
    type: 'info',
    module: 2,
    title: 'Posterior Circulation Stroke Workup',
    body: '[Imaging Decision Guide](#/info/vertigo-imaging-guide)\n\n**CT head non-contrast is NOT adequate to rule out posterior circulation stroke.**\n• CT sensitivity for acute posterior fossa ischemia: **7-16%**\n• CT is useful only to exclude hemorrhage or mass effect before treatment\n\n**MRI with DWI is the test of choice — but beware:**\n• DWI misses ~**20% of acute posterior circulation strokes in the first 24-48 hours** (Oppenheim 2000, Simonsen 2015)\n• False-negative rate as high as 35% within 6 hours of symptom onset for small strokes\n• **Repeat MRI at 48-72 hours** if first negative and clinical suspicion remains\n\n**Vascular imaging:** CTA head/neck or MRA to evaluate for:\n• Vertebral or basilar artery occlusion / stenosis\n• Vertebral artery dissection (especially with neck pain)\n• PICA / AICA / SCA distribution infarct\n\n**Labs:** CBC, BMP, coags, troponin, lipids, HbA1c. Do NOT delay imaging for labs.',
    citation: [4, 5, 6, 12],
    next: 'vert-stroke-disposition',

    summary: 'CT only 7-16% sensitive for posterior fossa — MRI-DWI misses 20-35% in first 24-48h, repeat at 48-72h if negative with high suspicion',
    safetyLevel: 'warning',
  },

  {
    id: 'vert-stroke-disposition',
    type: 'result',
    module: 2,
    title: 'Posterior Circulation Stroke — Admit',
    body: '**Disposition: Stroke unit admission.** Neurology consult. Continuous telemetry.\n\n**If within thrombolytic window (<4.5h from last known well):**\n• Follow [Stroke Consult](#/tree/stroke) for IVT/EVT decisions\n• Posterior circulation strokes are eligible for tPA — do NOT withhold based on isolated vertigo presentation\n• EVT for large vessel occlusion (basilar, vertebral) — time-sensitive\n\n**Ongoing workup:**\n• Repeat MRI at 48-72h if initial study negative but clinical suspicion persists\n• Echocardiogram (cardioembolic source)\n• Telemetry for paroxysmal AF\n• Consider hypercoagulable workup in young patients\n\n**Secondary prevention:**\n• [Aspirin](#/drug/aspirin/stroke) 325 mg loading, then 81 mg daily\n• Consider [Clopidogrel](#/drug/clopidogrel/stroke) for minor stroke (CHANCE/POINT criteria)\n• Statin: [Atorvastatin](#/drug/atorvastatin/acs) 80 mg daily\n• BP control after acute phase\n\n**Counseling:** Early rehab improves outcomes. Posterior circulation strokes have higher mortality than anterior — 20-30% 1-year mortality in brainstem strokes.',
    citation: [6, 12, 24],
    confidence: 'definitive',
    treatment: {
      firstLine: {
        drug: 'Aspirin',
        dose: '325 mg',
        route: 'PO (load) then 81 mg daily',
        frequency: 'Daily',
        duration: 'Indefinite',
        notes: 'If not receiving thrombolytics',
      },
      monitoring: 'Continuous telemetry, serial neuro exams, repeat imaging as indicated.',
    },
  },

  // =====================================================================
  // MODULE 3: BPPV PATHWAY
  // =====================================================================

  {
    id: 'vert-bppv-history',
    type: 'info',
    module: 3,
    title: 'BPPV History Confirmation',
    body: '**Classic BPPV features (all should be present):**\n• Brief episodes <1 minute (often 5-30 seconds)\n• Triggered by head position change — rolling over, looking up, lying down\n• No vertigo at rest\n• No spontaneous nystagmus\n• No hearing loss, tinnitus, or neurologic signs\n• Onset often on waking or rolling in bed\n\n**Epidemiology:**\n• Most common peripheral vestibular disorder\n• Peak incidence 50-70 years old\n• More common in women\n• Risk factors: head trauma, prolonged recumbency, osteoporosis, vitamin D deficiency\n\n**Mechanism:** Calcium carbonate crystals (otoconia) from the utricle displace into a semicircular canal. Posterior canal involvement is most common (85-90%) because gravity pools particles there in the upright position.\n\nProceed to **Dix-Hallpike test** to confirm and identify which canal.',
    citation: [7, 17, 19],

    summary: 'Classic BPPV: <1min episodes triggered by head position, no hearing loss — posterior canal 85%, confirm with Dix-Hallpike test',
    skippable: true,
    images: [{ src: 'images/vertigo/canalolithiasis.jpg', alt: 'Canalolithiasis in semicircular canal', caption: 'Canalolithiasis: free-floating otoconia (calcium carbonate crystals) in a semicircular canal — the mechanism of BPPV. Head movement shifts the particles, deflecting the cupula and triggering vertigo. (TnoXX, Wikimedia Commons, CC BY 4.0)' }],
    next: 'vert-dix-hallpike',
  },

  {
    id: 'vert-dix-hallpike',
    type: 'question',
    module: 3,
    title: 'Dix-Hallpike Test',
    body: '[Dix-Hallpike & Epley Technique](#/info/vertigo-dix-hallpike)\n\n**Technique (right side):**\n1. Patient sits upright on exam table, legs extended\n2. Turn head 45° to the right\n3. Rapidly lay patient supine with head extending 20° off the end of the table\n4. **Observe for nystagmus for 30-45 seconds**\n5. Return to sitting, observe for reversal nystagmus\n6. Repeat on left side\n\n**Classic posterior canal BPPV response:**\n• **Upbeat-torsional nystagmus** (top poles of eyes beat toward downward ear)\n• Latency 5-20 seconds before onset\n• Duration <1 minute (crescendo-decrescendo)\n• Reverses on return to upright\n• Vertigo accompanies nystagmus\n\n**Horizontal canal BPPV:**\n• Purely horizontal nystagmus\n• No latency or very brief\n• May be geotropic (toward ground) or apogeotropic (toward ceiling)\n• Requires **supine roll test** to confirm\n\n**Red flags — NOT benign BPPV:**\n• Pure vertical (downbeat) nystagmus\n• Direction-changing nystagmus\n• No latency, no fatigue\n• Duration >1 minute\n• Associated neurologic signs\n→ image for central cause',
    citation: [7, 16, 17],
    options: [
      {
        label: 'Positive — upbeat-torsional (posterior canal)',
        description: 'Classic posterior canal BPPV',
        next: 'vert-posterior-bppv',
      },
      {
        label: 'Horizontal nystagmus',
        description: 'Horizontal canal BPPV — do supine roll test',
        next: 'vert-horizontal-test',
      },
      {
        label: 'Negative or atypical',
        description: 'Not BPPV — reconsider differential',
        next: 'vert-hints-check',
      },
    ],

    summary: 'Dix-Hallpike technique and interpretation — upbeat-torsional = posterior BPPV, pure horizontal = horizontal canal, red flags: pure vertical nystagmus',
    safetyLevel: 'warning',
  },

  {
    id: 'vert-posterior-bppv',
    type: 'info',
    module: 3,
    title: 'Posterior Canal BPPV — Epley Maneuver',
    body: '**Canalith Repositioning Procedure (Epley Maneuver):** first-line treatment. Cochrane 2014: NNT = 2 for resolution at 24 hours.\n\n**Technique (for right-sided BPPV):**\n1. **Position 1:** Start in Dix-Hallpike right (head 45° right, supine with head hanging). Hold 30-60 seconds or until nystagmus stops.\n2. **Position 2:** Without lifting head, rotate head 90° to the LEFT (now facing left with head still extended). Hold 30-60 seconds.\n3. **Position 3:** Roll entire body to the LEFT side while rotating head another 90° so patient is looking down at the floor. Hold 30-60 seconds.\n4. **Position 4:** Slowly return to sitting position with head tilted down and turned 45° toward the affected side. Hold 30 seconds.\n\n**Post-maneuver:**\n• 80-95% success rate with single maneuver for posterior canal\n• May repeat 2-3 times if first unsuccessful\n• No need for post-maneuver positional restrictions (old advice — not evidence-based)\n\n**Medications:** [Meclizine](#/drug/meclizine/vertigo) 25 mg PO PRN only — short-term, does NOT treat BPPV mechanism. Epley is definitive.',
    citation: [7, 17, 20],
    images: [
      { src: 'images/vertigo/epley-maneuver-steps.jpg', alt: 'Sequential steps of the Epley canalith repositioning maneuver', caption: 'Epley Maneuver for posterior canal BPPV: sequential positions moving otoconia out of the posterior semicircular canal back into the utricle. Hold each position 30-60 seconds. (Ruhrgur, Wikimedia Commons, CC BY-SA 4.0)' },
      { src: 'images/vertigo/semont-maneuver.svg', alt: 'Semont liberatory maneuver', caption: 'Semont liberatory maneuver: alternative to Epley for posterior canal BPPV. Patient is rapidly moved from sitting to side-lying on the affected side, then swung 180° to the opposite side. (Hariadhi, Wikimedia Commons, CC BY-SA 4.0)' },
    ],
    next: 'vert-verify-cure',

    summary: 'Epley maneuver for posterior canal BPPV — NNT=2 for resolution at 24h, 80-95% success rate, no post-maneuver restrictions needed',
  },

  {
    id: 'vert-horizontal-test',
    type: 'question',
    module: 3,
    title: 'Supine Roll Test — Horizontal Canal',
    body: '**Supine roll test (Pagnini-McClure):** used to confirm and sub-type horizontal canal BPPV.\n\n**Technique:**\n1. Patient supine with head flexed 30° (pillow under head)\n2. Rapidly rotate head 90° to one side\n3. Observe for nystagmus 30-60 seconds\n4. Return head to midline\n5. Rotate 90° to opposite side, observe\n\n**Interpretation:**\n\n**Geotropic nystagmus** (beats toward the ground on both sides):\n• **Canalithiasis** (particles floating in the canal)\n• Affected ear = side with MORE intense nystagmus\n• More common, better prognosis\n\n**Apogeotropic nystagmus** (beats toward the ceiling on both sides):\n• **Cupulolithiasis** (particles adherent to cupula)\n• Affected ear = side with LESS intense nystagmus\n• Less common, harder to treat\n\n**Critical:** Do NOT use Epley maneuver for horizontal canal BPPV — different maneuvers (Gufoni, Barbecue Roll) are required.',
    citation: [17, 19],
    images: [{ src: 'images/vertigo/lampert-maneuver.svg', alt: 'Lempert (Barbecue Roll) maneuver for horizontal canal BPPV', caption: 'Lempert / "Barbecue Roll" maneuver for horizontal canal BPPV: patient rolls 90° at a time, from supine toward the unaffected side, through prone, and back to supine. Used INSTEAD of Epley for horizontal canal. (Hariadhi, Wikimedia Commons, CC BY-SA 4.0)' }],
    options: [
      {
        label: 'Geotropic nystagmus',
        description: 'Canalithiasis — use Gufoni or Barbecue',
        next: 'vert-horizontal-bppv',
      },
      {
        label: 'Apogeotropic nystagmus',
        description: 'Cupulolithiasis — use modified Gufoni',
        next: 'vert-horizontal-bppv',
      },
    ],

    summary: 'Supine roll test for horizontal canal BPPV — geotropic = canalithiasis (more intense side affected), apogeotropic = cupulolithiasis',
  },

  {
    id: 'vert-horizontal-bppv',
    type: 'info',
    module: 3,
    title: 'Horizontal Canal BPPV — Treatment',
    body: '**Do NOT use Epley maneuver** — Epley is specific to the posterior canal.\n\n**Gufoni Maneuver (easier for ED):**\n1. Patient sits upright on exam table\n2. Quickly lay patient on the UNAFFECTED side (for geotropic canalithiasis)\n3. Hold for 1-2 minutes until nystagmus stops\n4. Quickly rotate head 45° toward the floor (nose toward bed)\n5. Hold 1-2 minutes\n6. Return to sitting\n\n**Barbecue Roll (Lempert) Maneuver — alternative:**\n1. Patient supine\n2. Roll patient 90° toward unaffected side (onto side)\n3. Continue rolling 90° to face down (prone)\n4. Continue 90° more to the affected side\n5. Return to supine\n• Hold each position 30-60 seconds\n\n**Success rates:** ~70-80% for canalithiasis, lower for cupulolithiasis. May require repeat sessions over days.\n\n**For cupulolithiasis (apogeotropic):** Modified maneuvers are used to convert to canalithiasis first, then treat with Gufoni/Barbecue.\n\n**If unsuccessful after 2-3 attempts:** vestibular physical therapy referral.',
    citation: [17, 19],
    next: 'vert-verify-cure',

    summary: 'Do NOT use Epley for horizontal canal — use Gufoni or Barbecue Roll maneuver, 70-80% success for canalithiasis',
  },

  {
    id: 'vert-verify-cure',
    type: 'question',
    module: 3,
    title: 'Verify Cure — Repeat Dix-Hallpike',
    body: '**Wait 15 minutes after the maneuver**, then repeat Dix-Hallpike (or supine roll for horizontal canal) to verify.\n\n**Resolved:**\n• No nystagmus\n• No vertigo with positional testing\n• Patient can lie down and sit up without symptoms\n\n**Still positive:**\n• Persistent nystagmus on repeat test\n• May repeat maneuver 1-2 more times\n• Consider switching canals (posterior → horizontal conversion can occur)\n• Refer for vestibular PT if ED attempts fail\n\n**Important:** Even with successful in-ED treatment, recurrence rate is **15-30% within 1 year**. Educate patient to return for repeat treatment rather than enduring symptoms.',
    citation: [7, 17],
    options: [
      {
        label: 'Resolved — no nystagmus',
        description: 'Success — discharge with instructions',
        next: 'vert-bppv-disposition',
      },
      {
        label: 'Still positive',
        description: 'Failed in-ED treatment',
        next: 'vert-bppv-failed',
      },
    ],

    summary: 'Wait 15min post-maneuver then repeat Dix-Hallpike — may repeat maneuver 1-2 more times if still positive, 15-30% annual recurrence',
  },

  {
    id: 'vert-bppv-failed',
    type: 'info',
    module: 3,
    title: 'Failed Maneuver — Home Exercises',
    body: '**Brandt-Daroff Exercises** — home repositioning technique for refractory BPPV.\n\n**Technique:**\n1. Sit on edge of bed with head turned 45° to LEFT\n2. Quickly lie down on RIGHT side (head now facing up)\n3. Hold 30 seconds or until vertigo stops\n4. Return to sitting, hold 30 seconds\n5. Turn head 45° to RIGHT, lie down on LEFT side\n6. Hold 30 seconds, return to sitting\n\n**Regimen:** 5 repetitions per session, 3 sessions per day (morning, afternoon, evening). Continue for **2 weeks or until 2 consecutive days symptom-free**.\n\n**Expected course:**\n• Initial increase in symptoms (due to provocation) — warn patient\n• Gradual reduction over 7-14 days\n• Success rate ~95% with diligent performance\n\n**Vestibular rehabilitation:** Formal PT referral for patients who fail home exercises, elderly patients at fall risk, or those with multiple recurrences. Vestibular-trained PTs can perform advanced maneuvers under Frenzel goggle guidance.',
    citation: [7, 15, 20],
    next: 'vert-bppv-disposition',

    summary: 'Brandt-Daroff home exercises: 5 reps x 3 sessions/day for 2 weeks — 95% success rate, refer vestibular PT if exercises fail',
    skippable: true,
  },

  {
    id: 'vert-bppv-disposition',
    type: 'result',
    module: 3,
    title: 'BPPV — Discharge',
    body: '**Disposition: Discharge home** with clear instructions.\n\n**Medications:**\n• [Meclizine](#/drug/meclizine/vertigo) 25 mg PO q8h PRN — **maximum 3-5 days**. Not curative. Can delay vestibular compensation if overused.\n• Antiemetics PRN: [Ondansetron](#/drug/ondansetron/acute vertigo) 4-8 mg ODT q8h PRN\n• Avoid [Diazepam](#/drug/diazepam/acute vestibular syndrome) for BPPV — benzodiazepines delay recovery\n\n**Patient education:**\n• Movement does NOT cause harm — gradually return to activity\n• Expect mild symptoms for a few days after successful maneuver\n• **Fall precautions** — especially in elderly\n• Recurrence rate ~15-30% within 1 year — return for repeat treatment\n• Home Brandt-Daroff exercises if symptoms recur\n\n**Follow-up:**\n• Primary care in 1-2 weeks\n• Vestibular PT referral if recurrent or refractory\n• ENT referral if atypical or associated hearing symptoms\n\n[Discharge Instructions](#/info/vertigo-rehab-discharge) — shareable patient handout',
    citation: [1, 7, 17],
    confidence: 'definitive',
  },

  // =====================================================================
  // MODULE 4: HINTS / AVS PATHWAY
  // =====================================================================

  {
    id: 'vert-hints-check',
    type: 'question',
    module: 4,
    title: 'HINTS Exam — Patient Appropriate?',
    body: '[HINTS Exam Technique](#/info/vertigo-hints-guide)\n\n**HINTS is ONLY valid when ALL of the following are true:**\n• Patient has **continuous (AVS)** vertigo, not episodic\n• **Spontaneous nystagmus** is present at rest\n• **No central red flags** (already screened)\n• Symptoms currently active (not between episodes)\n\n**HINTS is INVALID and DANGEROUS when:**\n• No spontaneous nystagmus → HIT will appear "normal" in healthy people, falsely suggesting central lesion\n• Episodic/positional vertigo (BPPV) → the maneuvers reproduce symptoms without diagnostic value\n• Patient asymptomatic at time of exam\n\n**Kattah 2009:** In appropriate patients, HINTS outperformed early MRI (sensitivity 100% vs 88%) for identifying central cause.\n\n**If HINTS is not appropriate** (no spontaneous nystagmus) → there is no acute vestibular syndrome. Reconsider the time-course. If constant vertigo persists without nystagmus, consider central cause anyway — image the posterior fossa.',
    citation: [2, 11, 24, 27],
    options: [
      {
        label: 'Appropriate — spontaneous nystagmus present',
        description: 'Proceed with HINTS',
        next: 'vert-hints-nystagmus',
      },
      {
        label: 'Not appropriate — no spontaneous nystagmus',
        description: 'HINTS invalid — image posterior fossa',
        next: 'vert-central-present',
      },
    ],

    summary: 'HINTS only valid with continuous vertigo + spontaneous nystagmus — outperforms early MRI (100% vs 88% sens, Kattah 2009)',
    safetyLevel: 'warning',
  },

  {
    id: 'vert-hints-nystagmus',
    type: 'question',
    module: 4,
    title: 'Step 1: Nystagmus Assessment',
    body: '[Nystagmus Interpretation Guide](#/info/vertigo-nystagmus-guide)\n\n**Critical technique: remove visual fixation.**\n\nPeripheral nystagmus **suppresses with fixation** — you may miss it entirely unless you eliminate fixation. Three methods:\n• **Frenzel goggles** (ideal but rarely available in ED)\n• **Ophthalmoscope trick** — look at one fundus while asking patient to cover other eye. Nystagmus direction reverses what you see through the scope.\n• **"Paper trick"** — hold blank white paper ~10 cm from patient\'s face so nothing to fixate on\n\n**Interpretation:**\n\n**Peripheral (reassuring):**\n• **Unidirectional** — fast phase beats in the same direction regardless of gaze\n• Horizontal + torsional (mixed)\n• Suppresses with fixation\n• Follows Alexander\'s law: stronger with gaze toward fast phase\n\n**Central (worrisome):**\n• **Direction-changing** — beats one way on right gaze, opposite way on left gaze\n• **Pure vertical** (downbeat especially) or **pure torsional**\n• Does NOT suppress with fixation\n• May be gaze-evoked',
    citation: [2, 11, 27],
    images: [{ src: 'images/vertigo/nystagmus-patterns.png', alt: 'Central vs peripheral nystagmus comparison', caption: 'Comparison of nystagmus in central vs peripheral vestibular disease. Peripheral: unidirectional, suppresses with fixation. Central: direction-changing or pure vertical, does not suppress. (Drjaseemali, Wikimedia Commons, CC0)' }],
    options: [
      {
        label: 'Unidirectional horizontal/torsional',
        description: 'Peripheral pattern — continue HINTS',
        next: 'vert-hints-hit',
      },
      {
        label: 'Direction-changing, vertical, or pure torsional',
        description: 'Central — stroke pathway',
        next: 'vert-hints-central',
        urgency: 'critical',
      },
    ],

    summary: 'Assess nystagmus: remove fixation first — unidirectional horizontal = peripheral, direction-changing/vertical/pure torsional = central',
  },

  {
    id: 'vert-hints-hit',
    type: 'question',
    module: 4,
    title: 'Step 2: Head Impulse Test (HIT)',
    body: '**Technique:**\n1. Patient fixates on your nose\n2. Hold head gently with both hands\n3. Rapidly turn head ~20° to one side (high-velocity, small-amplitude thrust)\n4. **Watch the eyes** — do they stay fixated on your nose, or do they drift and make a corrective saccade?\n5. Repeat to the other side\n\n**⚠️ COUNTERINTUITIVE RULE ⚠️**\n\n**Abnormal HIT (corrective saccade present) = REASSURING for peripheral cause.**\n• Peripheral lesion disables the VOR on the affected side\n• Eyes cannot track → drift off target → catch-up saccade brings eyes back\n• This indicates **peripheral vestibular dysfunction**\n\n**Normal HIT (NO corrective saccade, eyes stay fixed) = WORRISOME for stroke.**\n• Intact VOR in a patient with AVS is alarming — means the vestibular apparatus is working, so why are they dizzy?\n• → **central cause until proven otherwise**\n• Sensitivity ~85%, specificity ~95% when combined with rest of HINTS\n\n**Memorable phrase:** "Normal HIT in AVS = NOT nice" (not peripheral).',
    citation: [2, 11, 12, 27],
    options: [
      {
        label: 'Abnormal — catch-up saccade present',
        description: 'Reassuring — peripheral pattern',
        next: 'vert-hints-skew',
      },
      {
        label: 'Normal — no saccade (worrisome)',
        description: 'Central pattern — stroke pathway',
        next: 'vert-hints-central',
        urgency: 'critical',
      },
    ],

    summary: 'COUNTERINTUITIVE: abnormal HIT (catch-up saccade) = peripheral/reassuring, normal HIT = central/worrisome for stroke',
    safetyLevel: 'critical',
  },

  {
    id: 'vert-hints-skew',
    type: 'question',
    module: 4,
    title: 'Step 3: Test of Skew (Alternate Cover Test)',
    body: '**Technique:**\n1. Patient fixates on your nose with both eyes open\n2. Cover one eye with your hand or occluder\n3. Rapidly uncover and immediately cover the other eye\n4. Watch the newly uncovered eye for vertical refixation movement\n5. Repeat several times\n\n**Interpretation:**\n\n**No skew deviation = peripheral (reassuring)**\n• Eyes remain vertically aligned with cover-uncover\n\n**Vertical skew deviation = CENTRAL (worrisome)**\n• One eye drifts upward, the other downward under cover\n• When uncovered, there is a vertical refixation movement (eye drops down or shifts up)\n• Indicates brainstem or cerebellar lesion affecting vertical vestibulo-ocular pathways\n• Often subtle — must look carefully\n\n**This is the most specific finding in HINTS** (specificity ~98%). A positive skew essentially rules in central lesion.',
    citation: [2, 11, 27],
    options: [
      {
        label: 'No skew',
        description: 'Reassuring — continue HINTS+',
        next: 'vert-hints-hearing',
      },
      {
        label: 'Vertical skew present',
        description: 'Central — stroke pathway',
        next: 'vert-hints-central',
        urgency: 'critical',
      },
    ],

    summary: 'Alternate cover test: vertical skew deviation = central lesion (98% specificity), most specific finding in HINTS exam',
  },

  {
    id: 'vert-hints-hearing',
    type: 'question',
    module: 4,
    title: 'Step 4: Bedside Hearing (HINTS+)',
    body: '**HINTS+ (HINTS plus hearing)** extends sensitivity by detecting AICA (anterior inferior cerebellar artery) strokes, which can present with **unilateral hearing loss** due to labyrinthine artery involvement.\n\n**Technique:**\n1. Rub fingers together 6 inches from each ear\n2. Ask patient if they hear it equally on both sides\n3. Whisper a word at each ear\n4. Compare both sides\n\n**If abnormal available: Weber and Rinne with 512 Hz tuning fork** to characterize unilateral loss as sensorineural (central, AICA stroke) vs conductive (unrelated).\n\n**Interpretation:**\n\n**Normal hearing = peripheral (reassuring)**\n• Pure vestibular neuritis does NOT cause hearing loss\n\n**New unilateral hearing loss = CENTRAL (AICA stroke until proven otherwise)**\n• AICA supplies the labyrinth via the labyrinthine artery\n• Infarction causes combined auditory + vestibular symptoms\n• Can mimic "labyrinthitis" — but is actually a stroke\n• Even in young patients, new unilateral SNHL with vertigo warrants MRI + MRA\n\n**Pearl:** "Labyrinthitis" in the ED is often mis-labeled AICA stroke. Any acute unilateral hearing loss + vertigo deserves neurovascular imaging.',
    citation: [2, 11, 13, 27],
    options: [
      {
        label: 'Normal hearing bilaterally',
        description: 'HINTS+ peripheral — vestibular neuritis',
        next: 'vert-hints-peripheral',
      },
      {
        label: 'New unilateral hearing loss',
        description: 'AICA stroke — central pathway',
        next: 'vert-hints-central',
        urgency: 'critical',
      },
    ],

    summary: 'HINTS+: new unilateral hearing loss = AICA stroke until proven otherwise — labyrinthine artery involvement, NOT labyrinthitis',
    safetyLevel: 'critical',
  },

  {
    id: 'vert-hints-peripheral',
    type: 'info',
    module: 4,
    title: 'Peripheral HINTS → Vestibular Neuritis',
    body: '**HINTS INFARCT mnemonic — peripheral pattern (all 3 reassuring):**\n• **I**mpulse **N**ormal\n• **F**ast-phase **A**lternating (direction-changing nystagmus)\n• **R**efixation on **C**over **T**est (skew)\n\nFOR peripheral = **unidirectional nystagmus + abnormal HIT + no skew + normal hearing**.\n\n**Diagnostic accuracy (Kattah 2009):**\n• Sensitivity for stroke: **100%**\n• Specificity: **96%**\n• NPV: 100% (within operator expertise)\n• Outperformed early MRI-DWI in first 48 hours\n\n**⚠️ Critical caveats:**\n• Requires training and practice — non-neurologist sensitivity is lower (Nelson 2011 showed residents had poor accuracy)\n• Only valid in true AVS with spontaneous nystagmus\n• Cannot detect strokes that occur in patients without clear AVS presentation\n• Missing HINTS technique subtleties (e.g., not removing fixation) leads to errors\n\n**Diagnosis: Vestibular Neuritis** (if no hearing loss) or **Labyrinthitis** (if hearing loss without central findings — rare, still warrants MRI).\n\n**Presumed etiology:** Reactivation of HSV-1 in the vestibular ganglion. Self-limited over days to weeks.',
    citation: [2, 11, 14, 27],
    next: 'vert-vn-treatment',

    summary: 'All HINTS peripheral: unidirectional nystagmus + abnormal HIT + no skew + normal hearing = vestibular neuritis (100% sensitivity)',
    skippable: true,
  },

  {
    id: 'vert-hints-central',
    type: 'info',
    module: 4,
    title: 'Central HINTS → Stroke Pathway',
    body: '**ANY central finding in HINTS** → posterior circulation stroke until proven otherwise.\n\n**Central HINTS findings (any one of):**\n• Direction-changing, vertical, or pure torsional nystagmus\n• Normal HIT (no catch-up saccade) in a patient with AVS\n• Vertical skew deviation\n• New unilateral hearing loss (HINTS+)\n\n**Do NOT be reassured by young age.**\n• Vertebral artery dissection can cause cerebellar stroke in patients in their 30s-40s\n• Neck pain or recent trauma (chiropractic, whiplash) raises dissection suspicion\n• Up to 20% of posterior circulation strokes occur in patients <55\n\n**Immediate actions (same as central screen):**\n• Activate stroke team\n• Last known well time\n• MRI-DWI + MRA/CTA head and neck\n• Continuous monitoring, IV × 2, NPO\n• NIHSS (remember: underscores posterior strokes)\n\nRoute to stroke imaging pathway.',
    citation: [2, 6, 12],
    next: 'vert-stroke-imaging',

    summary: 'ANY central HINTS finding = posterior circulation stroke — vertebral dissection possible even in young patients, do not be reassured by age',
    safetyLevel: 'critical',
  },

  {
    id: 'vert-vn-treatment',
    type: 'info',
    module: 4,
    title: 'Vestibular Neuritis — Treatment',
    body: '**Supportive care is the mainstay.** Vestibular neuritis resolves spontaneously over 1-2 weeks as central compensation develops.\n\n**Symptom control (short-term only):**\n• [Ondansetron](#/drug/ondansetron/acute vertigo) 4 mg IV/ODT q6-8h PRN nausea — preferred antiemetic (does not suppress vestibular compensation)\n• [Meclizine](#/drug/meclizine/vertigo) 25 mg PO q8h PRN — **maximum 72 hours** (suppressants delay compensation)\n• [Diazepam](#/drug/diazepam/acute vestibular syndrome) 2-5 mg PO/IV q8-12h PRN for severe refractory symptoms — **maximum 48-72 hours**\n• IV fluids for dehydration from vomiting\n\n**⚠️ Key principle: LIMIT vestibular suppressants to 72 hours.** Longer use prolongs symptom duration and delays recovery.\n\n**Corticosteroids — controversial:**\n• Strupp 2004 methylprednisolone showed improved caloric test recovery but no clear functional benefit\n• GRACE-3 2023 does NOT recommend routine steroids\n• Consider case-by-case in severe presentations within 3 days of onset (methylprednisolone 100 mg PO taper over 21 days) — shared decision making\n\n**Antivirals:** Not indicated (Strupp 2004 valacyclovir showed no benefit).\n\n**Early mobilization and vestibular rehabilitation** are the most effective interventions for recovery.',
    citation: [1, 14, 15],
    next: 'vert-vn-disposition',

    summary: 'Ondansetron preferred antiemetic, meclizine/diazepam max 72h — suppressants delay compensation, steroids controversial, antivirals not indicated',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 5: VESTIBULAR MIGRAINE / s-EVS
  // =====================================================================

  {
    id: 'vert-vm-criteria',
    type: 'info',
    module: 5,
    title: 'Vestibular Migraine Criteria',
    body: '[Vestibular Migraine Criteria](#/info/vertigo-migraine-criteria)\n\n**Bárány Society / International Headache Society Criteria (Lempert 2012):**\n\n**Definite Vestibular Migraine requires ALL:**\n1. **≥5 episodes** of vestibular symptoms of moderate or severe intensity lasting 5 minutes to 72 hours\n2. **Current or past history of migraine** with or without aura (ICHD-3 criteria)\n3. **≥50% of vestibular episodes** have at least ONE of the following migrainous features:\n   - Headache with migraine characteristics (unilateral, pulsating, moderate/severe, aggravated by routine activity)\n   - Photophobia AND phonophobia\n   - Visual aura\n4. Not better accounted for by another vestibular or ICHD-3 diagnosis\n\n**Probable Vestibular Migraine:**\n• ≥5 episodes of vestibular symptoms 5 min-72 h\n• Either migraine history OR migrainous features in episodes (not both)\n\n**⚠️ Critical teaching point:**\n**~50% of vestibular migraine attacks occur WITHOUT headache.** The diagnosis is often missed because clinicians expect concurrent headache. Ask about migraine history, photophobia/phonophobia during the episode, and family history of migraine.\n\n**Epidemiology:** Vestibular migraine is the **most common cause of recurrent spontaneous vertigo**, affecting ~1-3% of adults (Neuhauser 2001). More common than Ménière disease.',
    citation: [8, 18, 22],
    next: 'vert-vm-diagnosis',

    summary: 'Vestibular migraine: >=5 episodes + migraine history + migrainous features in >=50% — 50% occur WITHOUT headache, most common recurrent vertigo cause',
    skippable: true,
  },

  {
    id: 'vert-vm-diagnosis',
    type: 'question',
    module: 5,
    title: 'Meets Vestibular Migraine Criteria?',
    body: 'Apply the Bárány criteria to this patient:\n\n**Criteria checklist:**\n• ≥5 prior episodes of vertigo lasting 5 min-72 h? ☐\n• Current or past migraine headache history (or family history)? ☐\n• ≥50% of episodes have migraine features (headache, photophobia/phonophobia, aura)? ☐\n• No alternative vestibular or neurologic diagnosis? ☐\n\n**Additional supportive features:**\n• Female preponderance\n• Menstrual relationship\n• Triggered by typical migraine triggers (stress, sleep deprivation, foods, barometric change)\n• Family history of migraine or vestibular symptoms\n• History of motion sickness\n\n**If criteria not met** but the patient has spontaneous episodic vertigo, consider:\n• **Ménière disease** — requires fluctuating SNHL, tinnitus, aural fullness (Sajjadi 2008)\n• **TIA** — especially with vascular risk factors\n• **Panic disorder** — diagnosis of exclusion after cardiac/neurologic workup\n• **Cardiac arrhythmia** — ECG mandatory',
    citation: [8, 18, 21],
    options: [
      {
        label: 'Meets criteria — Vestibular Migraine',
        description: 'Treat as acute migraine',
        next: 'vert-vm-treatment',
      },
      {
        label: 'Does not meet criteria',
        description: 'Assess TIA risk',
        next: 'vert-sevs-risk',
      },
    ],

    summary: 'Apply Barany criteria checklist — if not met, consider Meniere (requires hearing loss), posterior circulation TIA, panic, or arrhythmia',
  },

  {
    id: 'vert-vm-treatment',
    type: 'info',
    module: 5,
    title: 'Vestibular Migraine — Acute Treatment',
    body: '**Acute treatment parallels standard migraine care**, with dopamine antagonists particularly useful due to the dual antiemetic and antimigraine effect.\n\n**First-line (combine):**\n• [Metoclopramide](#/drug/metoclopramide/vestibular migraine) 10 mg IV over 15 min\n• [Diphenhydramine](#/drug/diphenhydramine/vestibular suppressant) 25 mg IV (prevents akathisia from metoclopramide; short-term vestibular symptom relief)\n• IV fluids 1 L NS bolus\n• [Ketorolac](#/drug/ketorolac/headache) 30 mg IV or 15 mg IV if elderly/renal concern\n• Consider [Magnesium sulfate](#/drug/magnesium-sulfate/migraine) 1-2 g IV over 15 min (especially if history of aura)\n\n**Second-line:**\n• [Prochlorperazine](#/drug/prochlorperazine/migraine) 10 mg IV (alternative to metoclopramide)\n• Dexamethasone 10 mg IV/PO to reduce recurrence within 72h\n\n**Triptans — controversial in vestibular migraine:**\n• No strong evidence of efficacy for vestibular symptoms\n• May be tried if patient has known triptan-responsive migraine\n• **Contraindicated** in basilar migraine, hemiplegic migraine, uncontrolled HTN, recent stroke/MI\n\n**Cross-reference:** See [Migraine Consult](#/tree/migraine) for full treatment protocols.\n\n**For suppression of severe vertigo nausea only:** Ondansetron 4 mg IV is adjunctive.',
    citation: [1, 8, 18],
    next: 'vert-vm-disposition',

    summary: 'Acute VM: metoclopramide 10mg IV + diphenhydramine 25mg IV + ketorolac + IV fluids — triptans controversial, magnesium if aura history',
  },

  {
    id: 'vert-sevs-risk',
    type: 'question',
    module: 5,
    title: 's-EVS Risk — TIA Workup Needed?',
    body: 'Spontaneous episodic vertigo without migraine features raises concern for **posterior circulation TIA**, especially in vascular risk populations.\n\n**High-risk features (any one triggers TIA workup):**\n• **Age ≥60** — vascular risk increases markedly after 60\n• **Vascular risk factors:** HTN, DM, hyperlipidemia, smoking, prior stroke/TIA, atrial fibrillation\n• **Focal neurologic symptoms** during episodes (diplopia, dysarthria, limb weakness, numbness, visual field cut)\n• **Sudden unilateral hearing loss** with vertigo\n• **Neck pain** before or during episodes (dissection)\n• **Recent trauma** (including chiropractic manipulation)\n• **Hypercoagulable state** or active malignancy\n• **New-onset** spontaneous vertigo in a previously well patient\n\n**Low-risk features:**\n• Young (<50), no vascular risk factors\n• Chronic, recurrent pattern without progression\n• No focal features during episodes\n• Clear non-vascular trigger (stress, sleep, hormonal)\n\n**Pearl:** Recurrent posterior circulation TIAs are a harbinger of impending large vessel stroke. Do not dismiss vertigo in a high-risk patient as "benign" without imaging.',
    citation: [3, 13, 24],
    options: [
      {
        label: 'High-risk — TIA workup needed',
        description: 'CTA/MRA + admission consideration',
        next: 'vert-tia-workup',
        urgency: 'urgent',
      },
      {
        label: 'Low-risk — no vascular features',
        description: 'Outpatient follow-up',
        next: 'vert-transient-low-risk',
      },
    ],

    summary: 'Assess TIA risk: age >=60, vascular risk factors, focal neuro symptoms, hearing loss, neck pain — recurrent TIAs herald large vessel stroke',
    safetyLevel: 'warning',
  },

  {
    id: 'vert-tia-workup',
    type: 'result',
    module: 5,
    title: 'Posterior Circulation TIA Workup',
    body: '[Posterior Circulation Stroke Evidence](#/info/vertigo-post-circ-evidence)\n\n**Workup:**\n• **MRI brain with DWI** — gold standard (beware false negatives; repeat at 48-72h if first negative)\n• **MRA or CTA head and neck** — evaluate for vertebrobasilar stenosis, dissection, occlusion\n• ECG — assess for atrial fibrillation\n• Echocardiogram — cardioembolic source\n• Labs: CBC, BMP, lipids, HbA1c, coags, troponin\n• Consider 30-day event monitor for paroxysmal AF if first workup negative\n\n**Disposition:**\n• **Admit** for expedited workup and monitoring if:\n  - ABCD2 ≥4 or otherwise high-risk\n  - Crescendo pattern (increasing frequency)\n  - Unable to obtain rapid outpatient MRI/MRA\n  - Suspected dissection\n  - First episode with abnormal imaging\n• **Discharge** acceptable if low-risk after complete negative workup AND rapid (24-48h) outpatient neurology follow-up guaranteed\n\n**Secondary prevention:**\n• [Aspirin](#/drug/aspirin/stroke) 81 mg daily (or clopidogrel if aspirin intolerant)\n• Consider DAPT (aspirin + clopidogrel × 21 days) for high-risk TIA per CHANCE/POINT\n• [Atorvastatin](#/drug/atorvastatin/acs) 80 mg daily\n• BP management\n• Anticoagulation if AF found',
    citation: [3, 6, 12, 13],
    confidence: 'definitive',
  },

  {
    id: 'vert-transient-low-risk',
    type: 'result',
    module: 5,
    title: 'Transient Vertigo — Low Risk',
    body: '**Disposition: Discharge** with outpatient follow-up.\n\n**Most likely etiologies in young, low-risk patients:**\n• Vestibular migraine (often undiagnosed)\n• Post-concussive vestibular dysfunction\n• Persistent postural-perceptual dizziness (PPPD)\n• Anxiety-related vertigo\n• Mild medication side effect\n• Early Ménière (should have hearing symptoms)\n\n**Outpatient plan:**\n• **Neurology referral** — vestibular specialist if available\n• **Vestibular physical therapy** — especially if positional component\n• Headache diary for 4-6 weeks to evaluate for vestibular migraine\n• Hearing assessment (audiogram) if any auditory symptoms\n\n**Return precautions:**\n• New constant vertigo\n• Focal neurologic symptoms (weakness, diplopia, dysarthria)\n• New severe headache or neck pain\n• Hearing loss\n• Worsening pattern or inability to walk\n\n**Symptomatic medications** (limited role):\n• [Ondansetron](#/drug/ondansetron/acute vertigo) PRN nausea\n• Avoid chronic vestibular suppressants — delay compensation',
    citation: [1, 15, 18],
    confidence: 'recommended',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION & MANAGEMENT
  // =====================================================================

  {
    id: 'vert-vn-disposition',
    type: 'question',
    module: 6,
    title: 'Vestibular Neuritis — Admission Criteria?',
    body: '**Admit for:**\n• **Inability to tolerate oral intake** despite antiemetics — risk of dehydration\n• **Intractable vomiting**\n• **Severe gait instability** — cannot ambulate safely, fall risk\n• **Elderly with comorbidities** or social factors preventing safe home care\n• **Diagnostic uncertainty** — features concerning but HINTS reassuring\n• **Need for IV hydration** beyond ED stay\n• **Hemodynamic instability** from volume depletion\n\n**Discharge criteria:**\n• Tolerating oral fluids and meds\n• Can ambulate (with or without assistance)\n• Has reliable home support\n• Good understanding of return precautions\n• Rapid follow-up arranged (primary care within 1 week, vestibular PT referral)\n• No red flags for progression',
    citation: [1],
    options: [
      {
        label: 'Meets admit criteria',
        description: 'Observation / admission',
        next: 'vert-vn-admit',
      },
      {
        label: 'Safe for discharge',
        description: 'Home with vestibular rehab referral',
        next: 'vert-vn-discharge',
      },
    ],

    summary: 'Admit if: unable to tolerate PO, intractable vomiting, severe gait instability, elderly with comorbidities, or diagnostic uncertainty',
  },

  {
    id: 'vert-vn-admit',
    type: 'result',
    module: 6,
    title: 'Vestibular Neuritis — Admit',
    body: '**Disposition: Admission for symptomatic management.**\n\n**Admission orders:**\n• IV fluids — maintenance + correction for dehydration\n• [Ondansetron](#/drug/ondansetron/acute vertigo) 4 mg IV q6h PRN nausea\n• [Meclizine](#/drug/meclizine/vertigo) 25 mg PO q8h PRN — short-term only\n• [Diazepam](#/drug/diazepam/acute vestibular syndrome) 2-5 mg IV q8h PRN severe symptoms — **maximum 48-72 hours**\n• **Fall precautions** — bed rest initially, assist with ambulation\n• **Early mobilization as tolerated** — do not prolong bed rest, which delays compensation\n• **Physical therapy consult** for vestibular rehabilitation initiation\n• Repeat neuro exam q4-6h for 24 hours — monitor for evolving central signs\n• Consider repeat MRI at 48-72h if original imaging was within first 6 hours of symptom onset (false-negative period)\n\n**Goals of admission:**\n• Hydration\n• Nausea control\n• Early vestibular compensation\n• Rule out evolving central lesion\n• Safe discharge planning',
    citation: [1, 14, 15],
    confidence: 'definitive',
  },

  {
    id: 'vert-vn-discharge',
    type: 'result',
    module: 6,
    title: 'Vestibular Neuritis — Discharge',
    body: '[Discharge Instructions](#/info/vertigo-rehab-discharge) — shareable patient handout\n\n**Medications (limited duration):**\n• [Meclizine](#/drug/meclizine/vertigo) 25 mg PO q8h PRN — **maximum 3-5 days**. Stop when tolerable.\n• [Ondansetron](#/drug/ondansetron/acute vertigo) 4 mg ODT q8h PRN nausea\n• Avoid benzodiazepines for home use\n\n**Critical discharge counseling:**\n• **Early movement is HELPFUL, not harmful** — bed rest prolongs symptoms\n• Symptoms will gradually improve over 1-2 weeks as the brain compensates\n• Continued improvement over 4-6 weeks expected\n• Vestibular suppressants delay recovery — use sparingly\n\n**Vestibular rehabilitation:**\n• **Refer to vestibular physical therapy** (critical for recovery)\n• Directory: vestibular.org for certified therapists\n• Early initiation (within 1-2 weeks) improves outcomes\n• See [Vestibular Medication Principles](#/node/vert-med-principles) for pharmacologic philosophy\n\n**Return precautions:**\n• Worsening symptoms after 72 hours\n• New focal deficits (weakness, numbness, diplopia, dysarthria)\n• New severe headache or neck pain\n• Inability to walk\n• Hearing loss\n• Persistent vomiting preventing hydration',
    citation: [1, 15],
    confidence: 'definitive',
  },

  {
    id: 'vert-vm-disposition',
    type: 'result',
    module: 6,
    title: 'Vestibular Migraine — Discharge',
    body: '**Disposition: Discharge home** after symptomatic improvement.\n\n**Discharge medications:**\n• Rescue migraine regimen for next attack (NSAID + antiemetic ± triptan if appropriate)\n• Short course of antiemetic: [Ondansetron](#/drug/ondansetron/acute vertigo) 4 mg ODT PRN\n• Avoid chronic vestibular suppressants\n\n**Preventive considerations** (arrange with neurology, not initiated in ED):\n• Lifestyle: regular sleep, hydration, trigger avoidance\n• Magnesium 400 mg daily supplementation (low cost, low risk)\n• Riboflavin 400 mg daily\n• Consider propranolol, topiramate, amitriptyline, or venlafaxine for prophylaxis per specialist\n• CGRP antagonists may be considered (limited vestibular-specific data)\n\n**Trigger education:**\n• Sleep deprivation, stress, skipping meals\n• Caffeine excess or withdrawal\n• Hormonal changes (menstrual)\n• Specific food triggers (variable)\n• Barometric pressure changes, bright/flickering light\n\n**Follow-up:**\n• **Neurology referral** (ideally vestibular migraine specialist)\n• Headache diary to characterize triggers and pattern\n• Vestibular PT if chronic imbalance persists between episodes\n\n**Return precautions:**\n• Red flags: new focal deficit, severe progressive headache, fever, neck stiffness, altered mental status',
    citation: [1, 8, 18],
    confidence: 'definitive',
  },

  {
    id: 'vert-med-principles',
    type: 'info',
    module: 6,
    title: 'Vestibular Medication Principles',
    body: '**Core principle: vestibular suppressants impair central compensation.**\n\nThe brain recovers from peripheral vestibular injury by remapping its reference frame — a process called **central compensation**. This requires sensory input and active movement. Medications that suppress vestibular activity (antihistamines, benzodiazepines, anticholinergics) reduce the afferent signal and **delay recovery**.\n\n**The 72-hour rule:**\n• Use vestibular suppressants only for the acute severe phase\n• Discontinue within 48-72 hours\n• Early mobilization + vestibular rehab is more effective than continued medication\n\n**Drug classes:**\n\n**Antihistamines (H1 antagonists):**\n• [Meclizine](#/drug/meclizine/vertigo) 25 mg PO q8h — first-line symptom relief, max 3-5 days\n• [Diphenhydramine](#/drug/diphenhydramine/vestibular suppressant) 25-50 mg PO/IV — more sedating alternative\n\n**Antiemetics (vestibular-neutral):**\n• [Ondansetron](#/drug/ondansetron/acute vertigo) 4-8 mg IV/ODT — preferred, does not suppress compensation\n• [Metoclopramide](#/drug/metoclopramide/vestibular migraine) 10 mg IV — especially for vestibular migraine\n\n**Benzodiazepines:**\n• [Diazepam](#/drug/diazepam/acute vestibular syndrome) 2-5 mg — rescue only, strict 48-72h limit\n• Falls risk, dependency risk, prolonged vestibular compensation\n\n**Anticholinergics:**\n• [Scopolamine](#/drug/scopolamine/vestibular) 1.5 mg transdermal patch — best for motion-provoked symptoms. Caution in elderly (delirium, falls).\n\n**Chronic vestibular conditions (Meniere, chronic vestibular migraine):**\n• [Betahistine](#/drug/betahistine/vestibular) 16 mg TID (not FDA-approved in US) — histamine agonist, does NOT delay compensation\n• Referral to vestibular specialist for long-term management',
    citation: [1, 10, 15],
    next: 'vert-rehab-referral',

    summary: '72-hour rule: limit suppressants to acute phase only — ondansetron is vestibular-neutral, benzos/antihistamines delay compensation',
    safetyLevel: 'warning',
  },

  {
    id: 'vert-rehab-referral',
    type: 'info',
    module: 6,
    title: 'Vestibular Rehabilitation Guidance',
    body: '**Vestibular rehabilitation therapy (VRT) is the single most effective intervention for persistent peripheral vestibular symptoms.**\n\n**Evidence:**\n• Whitney 2005 and multiple subsequent trials show VRT significantly improves symptoms, balance, and quality of life in vestibular neuritis, BPPV recurrences, PPPD, and post-concussive vestibular dysfunction\n• Earlier initiation = better outcomes\n• Superior to medication for long-term recovery\n\n**Who benefits:**\n• Vestibular neuritis / labyrinthitis (as early as tolerated)\n• Refractory or recurrent BPPV\n• Persistent postural-perceptual dizziness (PPPD)\n• Post-concussive vestibular symptoms\n• Elderly with imbalance / fall risk\n• Bilateral vestibulopathy (rehab vs pharmacotherapy)\n\n**What VRT involves:**\n• Gaze stabilization exercises\n• Habituation exercises\n• Balance retraining\n• Canalith repositioning (for BPPV by specialist)\n• Graduated functional activities\n\n**Referral resources:**\n• **vestibular.org** — directory of certified vestibular therapists\n• Ask local PT clinic about vestibular-trained therapists\n• Academic medical centers often have dedicated vestibular clinics\n\n**ED role:**\n• Identify candidates for VRT\n• Educate patient that PT — not medication — is the key to recovery\n• Provide written referral or request from primary care\n• Emphasize early initiation',
    citation: [1, 14, 15],

    summary: 'Vestibular PT is the single most effective intervention — early initiation improves outcomes, superior to medication long-term',
    skippable: true,
  },
];

export const VERTIGO_MODULE_LABELS = [
  'Initial Assessment',
  'Central Feature Screen',
  'BPPV Pathway',
  'HINTS / AVS Pathway',
  'Vestibular Migraine / s-EVS',
  'Disposition & Management',
];

export const VERTIGO_CITATIONS: Citation[] = [
  { num: 1, text: 'Edlow JA, Carpenter C, Akhter M, et al. Guidelines for reasonable and appropriate care in the emergency department 3 (GRACE-3): Acute dizziness and vertigo in the emergency department. Acad Emerg Med. 2023;30(5):442-486. https://onlinelibrary.wiley.com/doi/10.1111/acem.14728' },
  { num: 2, text: 'Kattah JC, Talkad AV, Wang DZ, Hsieh YH, Newman-Toker DE. HINTS to diagnose stroke in the acute vestibular syndrome: three-step bedside oculomotor examination more sensitive than early MRI diffusion-weighted imaging. Stroke. 2009;40(11):3504-3510. https://www.ahajournals.org/doi/10.1161/STROKEAHA.109.551234' },
  { num: 3, text: 'Navi BB, Kamel H, Shah MP, et al. Application of the ABCD2 score to identify cerebrovascular causes of dizziness in the emergency department. Stroke. 2012;43(6):1484-1489.' },
  { num: 4, text: 'Oppenheim C, Stanescu R, Dormont D, et al. False-negative diffusion-weighted MR findings in acute ischemic stroke. AJNR Am J Neuroradiol. 2000;21(8):1434-1440.' },
  { num: 5, text: 'Simonsen CZ, Madsen MH, Schmitz ML, et al. Sensitivity of diffusion-weighted imaging in posterior circulation. Neurology. 2015;85(20):1785-1788.' },
  { num: 6, text: 'Arch AE, Weisman DC, Coca S, Nystrom KV, Wira CR 3rd, Schindler JL. Missed ischemic stroke diagnosis in the emergency department by emergency medicine and neurology services. Stroke. 2016;47(3):668-673.' },
  { num: 7, text: 'Hilton MP, Pinder DK. The Epley (canalith repositioning) manoeuvre for benign paroxysmal positional vertigo. Cochrane Database Syst Rev. 2014;(12):CD003162.' },
  { num: 8, text: 'Lempert T, Olesen J, Furman J, et al. Vestibular migraine: diagnostic criteria. J Vestib Res. 2012;22(4):167-172. (Bárány Society / IHS consensus)' },
  { num: 9, text: 'Tarnutzer AA, Berkowitz AL, Robinson KA, Hsieh YH, Newman-Toker DE. Does my dizzy patient have a stroke? A systematic review of bedside diagnosis in acute vestibular syndrome. CMAJ. 2011;183(9):E571-E592.' },
  { num: 10, text: 'Furman JM, Barton JJS. Treatment of vertigo. UpToDate. 2024. https://www.uptodate.com/contents/treatment-of-vertigo' },
  { num: 11, text: 'Johns P. The "Big Three" of dizziness: BPPV, vestibular neuritis, and posterior circulation stroke. EMRAP / ACEP educational resources. 2019.' },
  { num: 12, text: 'Saber Tehrani AS, Kattah JC, Mantokoudis G, et al. Small strokes causing severe vertigo: frequency of false-negative MRIs and nonlacunar mechanisms. Neurology. 2014;83(2):169-173.' },
  { num: 13, text: 'Kerber KA, Brown DL, Lisabeth LD, Smith MA, Morgenstern LB. Stroke among patients with dizziness, vertigo, and imbalance in the emergency department: a population-based study. Stroke. 2006;37(10):2484-2487.' },
  { num: 14, text: 'Strupp M, Zingler VC, Arbusow V, et al. Methylprednisolone, valacyclovir, or the combination for vestibular neuritis. N Engl J Med. 2004;351(4):354-361.' },
  { num: 15, text: 'Whitney SL, Alghwiri AA, Alghadir A. An overview of vestibular rehabilitation. Handb Clin Neurol. 2016;137:187-205.' },
  { num: 16, text: 'Saccomanno S, Paoloni V, Manenti RJ, et al. Dix-Hallpike test and Epley maneuver: an update on diagnosis and treatment of posterior canal BPPV. Eur Arch Otorhinolaryngol. 2019;276(11):3009-3015.' },
  { num: 17, text: 'Bhattacharyya N, Gubbels SP, Schwartz SR, et al. Clinical practice guideline: benign paroxysmal positional vertigo (update). Otolaryngol Head Neck Surg. 2017;156(3_suppl):S1-S47. (AAO-HNS)' },
  { num: 18, text: 'Neuhauser HK, Leopold M, von Brevern M, Arnold G, Lempert T. The interrelations of migraine, vertigo, and migrainous vertigo. Neurology. 2001;56(4):436-441.' },
  { num: 19, text: 'Fife TD, Iverson DJ, Lempert T, et al. Practice parameter: therapies for benign paroxysmal positional vertigo (an evidence-based review). Neurology. 2008;70(22):2067-2074. (AAN)' },
  { num: 20, text: 'Gianoli G, Goebel J, Mowry S, Poomipannit P. Anatomic differences in the lateral semicircular canal. Otolaryngol Head Neck Surg. 2001;124(3):270-275.' },
  { num: 21, text: 'Sajjadi H, Paparella MM. Meniere\'s disease. Lancet. 2008;372(9636):406-414.' },
  { num: 22, text: 'von Brevern M, Zeise D, Neuhauser H, Clarke AH, Lempert T. Acute migrainous vertigo: clinical and oculographic findings. Brain. 2005;128(Pt 2):365-374.' },
  { num: 23, text: 'Cohn B. Can bedside oculomotor (HINTS) testing differentiate central from peripheral causes of vertigo? Ann Emerg Med. 2014;64(3):265-268.' },
  { num: 24, text: 'Edlow JA, Newman-Toker DE. Using the physical examination to diagnose patients with acute dizziness and vertigo. J Emerg Med. 2016;50(4):617-628.' },
  { num: 25, text: 'Newman-Toker DE, Cannon LM, Stofferahn ME, Rothman RE, Hsieh YH, Zee DS. Imprecision in patient reports of dizziness symptom quality: a cross-sectional study conducted in an acute care setting. Mayo Clin Proc. 2007;82(11):1329-1340.' },
  { num: 26, text: 'Kerber KA, Meurer WJ, West BT, Fendrick AM. Dizziness presentations in U.S. emergency departments, 1995-2004. Acad Emerg Med. 2008;15(8):744-750.' },
  { num: 27, text: 'Nelson JA, Viirre E. The clinical differentiation of cerebellar infarction from common vertigo syndromes. West J Emerg Med. 2009;10(4):273-277.' },
  { num: 28, text: 'Newman-Toker DE, Kerber KA, Hsieh YH, et al. HINTS outperforms ABCD2 to screen for stroke in acute continuous vertigo and dizziness. Acad Emerg Med. 2013;20(10):986-996.' },
];

export const VERTIGO_CRITICAL_ACTIONS = [
  { text: 'Screen for central features (Deadly D\'s + red flags) BEFORE performing HINTS', nodeId: 'vert-central-screen' },
  { text: 'HINTS is only valid in patients with continuous vertigo AND spontaneous nystagmus — do NOT use on BPPV or episodic vertigo', nodeId: 'vert-hints-check' },
  { text: 'Normal HIT (head impulse test) in an AVS patient is WORRISOME for stroke — counterintuitive rule', nodeId: 'vert-hints-hit' },
  { text: 'CT head is inadequate for posterior circulation stroke — sensitivity only 7-16%', nodeId: 'vert-stroke-imaging' },
  { text: 'MRI-DWI misses up to 20-35% of posterior circulation strokes in the first 24-48 hours — repeat at 48-72h if clinical suspicion remains', nodeId: 'vert-stroke-disposition' },
  { text: 'Vestibular suppressants must be limited to 48-72 hours — longer use delays central compensation', nodeId: 'vert-med-principles' },
  { text: 'Remove visual fixation when assessing nystagmus (Frenzel goggles, ophthalmoscope trick, or paper trick)', nodeId: 'vert-hints-nystagmus' },
  { text: 'New unilateral hearing loss with vertigo = AICA stroke until proven otherwise (HINTS+)', nodeId: 'vert-hints-hearing' },
];
