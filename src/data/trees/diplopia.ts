// MedKitt — Diplopia (Double Vision) Consult
// Sources: ACEP Now, EB Medicine, UpToDate, StatPearls, EyeWiki, emDocs
// 6 modules: Classification → CN III → CN IV → CN VI → INO & Brainstem → Red Flags & Disposition
// Ophthalmology consult

import type { DecisionNode } from '../../models/types.js';
import type { CriticalAction } from '../../services/tree-service.js';

export interface Citation {
  num: number;
  text: string;
}

export const DIPLOPIA_CRITICAL_ACTIONS: CriticalAction[] = [
  { text: 'Monocular vs binocular is the FIRST question - monocular diplopia is ocular, not neurologic', nodeId: 'diplopia-start' },
  { text: 'ALL CN III palsies need emergent CTA regardless of pupil status', nodeId: 'diplopia-cn3-pupil' },
  { text: 'Pupil-involving CN III + headache = PCommA aneurysm until proven otherwise', nodeId: 'diplopia-cn3-pupil' },
  { text: 'ESR/CRP in ALL patients >50 years with new diplopia (GCA screen)', nodeId: 'diplopia-gca' },
  { text: 'Isolated CN VI can be false localizing sign of elevated ICP - check for papilledema', nodeId: 'diplopia-cn6' },
  { text: 'Multiple CN palsies = cavernous sinus or orbital apex pathology', nodeId: 'diplopia-red-flags' },
];

export const DIPLOPIA_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: CLASSIFICATION & INITIAL APPROACH
  // =====================================================================

  {
    id: 'diplopia-start',
    type: 'info',
    module: 1,
    title: 'Diplopia: Initial Approach',
    body: '**Diplopia represents ~50,000 US ED visits annually.**\n\n**THE FIRST QUESTION:**\n"Does the double vision go away when you cover EITHER eye?"\n\n| Type | Test Result | Significance |\n|------|-------------|-------------|\n| **Monocular** | Persists with one eye covered | Ocular pathology - generally non-emergent |\n| **Binocular** | Resolves when either eye covered | Ocular misalignment - needs neuro workup |\n\n**Monocular Diplopia Causes:**\n• Refractive error (improves with pinhole)\n• Cataract\n• Corneal irregularity (dry eye, keratoconus)\n• Lens dislocation\n• Macular pathology\n\n**Binocular Diplopia = This Consult**\n• Requires evaluation for neuromuscular causes\n• Can be life-threatening (aneurysm, stroke, GCA)\n\n**Key Statistics:**\n• 64% have primary (microvascular) cause\n• 36% have secondary cause (stroke 45%, MS 18%, tumor 12%, aneurysm 7.5%) [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'diplopia-mono-vs-bino', label: 'Mono vs Bino' },
    ],
    next: 'diplopia-classify',
  },

  {
    id: 'diplopia-classify',
    type: 'question',
    module: 1,
    title: 'Diplopia Type',
    body: '**Does the double vision resolve when EITHER eye is covered?**',
    citation: [1, 2],
    options: [
      {
        label: 'YES - Binocular Diplopia',
        description: 'Resolves when either eye covered - needs neuro workup',
        next: 'diplopia-direction',
        urgency: 'urgent',
      },
      {
        label: 'NO - Monocular Diplopia',
        description: 'Persists with one eye covered - ocular cause',
        next: 'diplopia-monocular',
      },
    ],
  },

  {
    id: 'diplopia-monocular',
    type: 'info',
    module: 1,
    title: 'Monocular Diplopia',
    body: '**Monocular diplopia = ocular pathology, NOT neurologic emergency.**\n\n**Common Causes:**\n• **Refractive error** - improves with pinhole testing\n• **Dry eye** - improves with lubricating drops\n• **Cataract** - ghosting, halos\n• **Corneal irregularity** - keratoconus, scarring\n• **Lens subluxation** - trauma, Marfan syndrome\n• **Macular pathology** - distortion, metamorphopsia\n\n**Bedside Test:**\n• **Pinhole test** - if diplopia resolves = refractive cause\n\n**Disposition:**\n• Generally non-emergent\n• Outpatient ophthalmology referral\n• Return if binocular symptoms develop\n\n**Exception - Lens Dislocation:**\n• Recent trauma + monocular diplopia\n• May need urgent ophtho evaluation [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-direction',
    type: 'question',
    module: 1,
    title: 'Diplopia Direction',
    body: '**What direction is the diplopia?**\n\nAsk: "Are the two images side-by-side (horizontal) or stacked (vertical)?"',
    citation: [1, 3],
    options: [
      {
        label: 'Horizontal (side-by-side)',
        description: 'Suggests CN III or CN VI palsy',
        next: 'diplopia-horizontal',
      },
      {
        label: 'Vertical (stacked)',
        description: 'Suggests CN III or CN IV palsy',
        next: 'diplopia-vertical',
      },
      {
        label: 'Oblique/Diagonal',
        description: 'May be CN III, IV, or multiple nerves',
        next: 'diplopia-exam',
      },
      {
        label: 'Variable/Fluctuating',
        description: 'Consider myasthenia gravis',
        next: 'diplopia-mg',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'diplopia-horizontal',
    type: 'info',
    module: 1,
    title: 'Horizontal Diplopia',
    body: '**Horizontal diplopia suggests CN III or CN VI involvement.**\n\n**Quick Localization:**\n\n| Finding | Likely Nerve |\n|---------|-------------|\n| Cannot look OUTWARD (abduct) | **CN VI** |\n| Cannot look INWARD (adduct) + ptosis | **CN III** |\n| Cannot look INWARD only | INO (MLF lesion) |\n\n**CN VI (Abducens):**\n• Esotropia (eye turned in)\n• Face turn toward affected side\n• Diplopia worse at distance\n\n**CN III (Oculomotor):**\n• Eye "down and out"\n• Ptosis\n• +/- pupil dilation\n\n**Proceed to detailed examination.** [3][4]',
    citation: [3, 4],
    next: 'diplopia-exam',
  },

  {
    id: 'diplopia-vertical',
    type: 'info',
    module: 1,
    title: 'Vertical Diplopia',
    body: '**Vertical diplopia suggests CN III or CN IV involvement.**\n\n**Quick Localization:**\n\n| Finding | Likely Nerve |\n|---------|-------------|\n| Eye down and out + ptosis | **CN III** |\n| Head tilt, hypertropia worse with adduction | **CN IV** |\n| Thyroid history, proptosis | Thyroid eye disease |\n\n**CN IV (Trochlear):**\n• Superior oblique palsy\n• Compensatory head tilt to opposite shoulder\n• Hypertropia worse with:\n  - Adduction (looking toward nose)\n  - Ipsilateral head tilt\n\n**CN III (Oculomotor):**\n• "Down and out" position\n• Usually has ptosis\n• Check pupil!\n\n**Proceed to detailed examination.** [3][5]',
    citation: [3, 5],
    next: 'diplopia-exam',
  },

  {
    id: 'diplopia-exam',
    type: 'info',
    module: 1,
    title: 'Diplopia Examination',
    body: '**Systematic Diplopia Exam:**\n\n**1. Pupil Assessment:**\n• Size, reactivity, APD\n• Dilated pupil + CN III findings = EMERGENT\n\n**2. Extraocular Movements (H-pattern):**\n• Test each direction of gaze\n• Note which direction worsens diplopia\n• Look for nystagmus\n\n**3. Eyelid Examination:**\n• Ptosis (CN III, MG, Horner)\n• Lid lag (thyroid)\n• Fatigable ptosis (MG)\n\n**4. Cover-Uncover Test:**\n• Patient fixates on target\n• Cover one eye, observe movement when uncovered\n• Movement to take up fixation = tropia\n\n**5. Associated Findings:**\n• Proptosis (orbital pathology)\n• Facial sensation (V1/V2 - cavernous sinus)\n• Horner syndrome (cavernous sinus)\n\n**6. Fundoscopy:**\n• Papilledema = elevated ICP [1][2][3]',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'diplopia-exam-checklist', label: 'Exam Checklist' },
    ],
    next: 'diplopia-identify-nerve',
  },

  {
    id: 'diplopia-identify-nerve',
    type: 'question',
    module: 1,
    title: 'Identify Affected Nerve',
    body: '**Based on examination, which pattern fits best?**',
    citation: [1, 3],
    options: [
      {
        label: 'CN III - Eye "down and out", ptosis',
        description: 'Oculomotor nerve palsy',
        next: 'diplopia-cn3-start',
        urgency: 'critical',
      },
      {
        label: 'CN IV - Head tilt, vertical diplopia',
        description: 'Trochlear nerve palsy',
        next: 'diplopia-cn4-start',
      },
      {
        label: 'CN VI - Cannot abduct eye',
        description: 'Abducens nerve palsy',
        next: 'diplopia-cn6-start',
        urgency: 'urgent',
      },
      {
        label: 'Multiple CN Palsies',
        description: 'More than one nerve involved',
        next: 'diplopia-multiple',
        urgency: 'critical',
      },
      {
        label: 'INO - Adduction deficit + contralateral nystagmus',
        description: 'Internuclear ophthalmoplegia',
        next: 'diplopia-ino',
        urgency: 'critical',
      },
      {
        label: 'Fluctuating/Fatigable',
        description: 'Consider myasthenia gravis',
        next: 'diplopia-mg',
        urgency: 'urgent',
      },
    ],
  },

  // =====================================================================
  // MODULE 2: CN III PALSY
  // =====================================================================

  {
    id: 'diplopia-cn3-start',
    type: 'info',
    module: 2,
    title: 'CN III Palsy Overview',
    body: '**CN III (Oculomotor) controls most eye movement + pupil.**\n\n**CN III Functions:**\n• Superior rectus (upgaze)\n• Inferior rectus (downgaze)\n• Medial rectus (adduction)\n• Inferior oblique (upgaze in adduction)\n• Levator palpebrae (lid elevation)\n• **Pupillary constriction**\n\n**Complete CN III Palsy:**\n• **"Down and out"** eye position\n• **Ptosis** (complete)\n• **Dilated pupil** (if pupil-involving)\n• Loss of accommodation\n\n**⚠️ CRITICAL DISTINCTION:**\n\n| | Pupil-INVOLVING | Pupil-SPARING |\n|---|-----------------|---------------|\n| Pupil | Fixed, dilated | Normal, reactive |\n| Classic cause | **Compressive (aneurysm)** | Microvascular |\n| Urgency | **EMERGENT** | Urgent |\n\n**BUT: This "rule" is NOT absolute!** [3][4][6]',
    citation: [3, 4, 6],
    images: [
      {
        src: 'images/diplopia/cn3-palsy.png',
        alt: 'CN III palsy showing ptosis and "down and out" eye position with dilated pupil',
        caption: 'Complete CN III palsy: Ptosis, "down and out" position, dilated unreactive pupil.',
      },
    ],
    next: 'diplopia-cn3-pupil',
  },

  {
    id: 'diplopia-cn3-pupil',
    type: 'info',
    module: 2,
    title: 'The Pupil in CN III Palsy',
    body: '**Why the Pupil Matters:**\n\n**Anatomy:**\n• Pupillomotor fibers run on the **dorsomedial surface** of CN III\n• External compression (aneurysm) affects these fibers FIRST\n• Ischemia (diabetes) affects internal fibers, sparing peripheral pupillomotor fibers\n\n**The "Rule of the Pupil" - And Its Limitations:**\n\n✅ **Classical Teaching:**\n• Pupil-involving = compressive (aneurysm)\n• Pupil-sparing = microvascular (safe)\n\n⚠️ **CRITICAL CAVEATS:**\n• Up to **20% of ischemic CN III** involves the pupil\n• Up to **36% of compressive lesions** are initially pupil-sparing\n• Pupil involvement may be **delayed 5-7 days** in evolving aneurysm\n\n**BOTTOM LINE:**\n\n⚠️ **ALL acute CN III palsies require emergent CTA regardless of pupil status.**\n\n**PCommA aneurysm rupture carries 50% mortality.** [3][4][6]',
    citation: [3, 4, 6],
    calculatorLinks: [
      { id: 'diplopia-cn3-risk', label: 'CN III Risk' },
    ],
    next: 'diplopia-cn3-workup',
  },

  {
    id: 'diplopia-cn3-workup',
    type: 'info',
    module: 2,
    title: 'CN III Palsy Workup',
    body: '**Emergent Workup for ALL CN III Palsies:**\n\n**Imaging:**\n\n| Test | When | Sensitivity |\n|------|------|-------------|\n| **CTA Head** | ALL CN III palsies | >95% for aneurysm >3mm |\n| MRI/MRA | CTA negative, high suspicion | Better for small lesions |\n| DSA (catheter angio) | CTA/MRA negative, very high suspicion | Gold standard (~1% stroke risk) |\n\n**CTA Sensitivity for PCommA Aneurysm:**\n• Aneurysms <5mm: **99.4-99.8%**\n• Specificity: **99.1-99.6%**\n\n**Labs:**\n• Glucose, HbA1c (if microvascular suspected after negative imaging)\n• **ESR/CRP if age >50** (GCA screen)\n\n**If CTA NEGATIVE:**\n• Age >50 with vascular risk factors → can observe closely\n• Age <50 OR no vascular risk factors → MRI/MRA\n• Pupil involvement → MRI/MRA, consider DSA\n• Any progression → repeat imaging [3][4][6]',
    citation: [3, 4, 6],
    next: 'diplopia-cn3-disposition',
  },

  {
    id: 'diplopia-cn3-disposition',
    type: 'question',
    module: 2,
    title: 'CN III Palsy Disposition',
    body: '**What did imaging show?**',
    citation: [3, 4],
    options: [
      {
        label: 'Aneurysm Found',
        description: 'Emergent neurosurgery consult',
        next: 'diplopia-cn3-aneurysm',
        urgency: 'critical',
      },
      {
        label: 'CTA Negative, Pupil-Sparing, Age >50, Vascular RF',
        description: 'Likely microvascular - can observe',
        next: 'diplopia-cn3-microvascular',
      },
      {
        label: 'CTA Negative but High Concern',
        description: 'Pupil-involving, young patient, or no vascular RF',
        next: 'diplopia-cn3-further',
        urgency: 'urgent',
      },
      {
        label: 'Other Pathology Found',
        description: 'Mass, stroke, inflammation',
        next: 'diplopia-cn3-other',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'diplopia-cn3-aneurysm',
    type: 'info',
    module: 2,
    title: 'PCommA Aneurysm Found',
    body: '**⚠️ NEUROSURGICAL EMERGENCY ⚠️**\n\n**Immediate Actions:**\n1. **Emergent neurosurgery consultation**\n2. Admit to ICU/neuro unit\n3. BP control (avoid hypertension)\n4. Aneurysm precautions:\n   - Bed rest\n   - Quiet environment\n   - Stool softeners\n   - Pain control\n   - Avoid Valsalva\n5. NPO for likely intervention\n\n**Treatment Options:**\n• **Endovascular coiling** (preferred for most PCommA aneurysms)\n• **Surgical clipping**\n\n**Timing:**\n• Unruptured symptomatic aneurysm: Urgent treatment within 24-72 hours\n• SAH: Emergent treatment\n\n**Prognosis:**\n• Untreated PCommA aneurysm rupture: **50% mortality**\n• CN III recovery after treatment: Variable (better if treated early) [4][6]',
    citation: [4, 6],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-cn3-microvascular',
    type: 'info',
    module: 2,
    title: 'Microvascular CN III Palsy',
    body: '**Likely Microvascular ("Diabetic") CN III Palsy:**\n\n**Criteria for Microvascular Diagnosis:**\n✅ Age >50\n✅ Vascular risk factors (DM, HTN, hyperlipidemia)\n✅ Pupil-sparing\n✅ No other neurological findings\n✅ Negative CTA\n\n**Natural History:**\n• Spontaneous improvement: 2-3 months\n• Full recovery: 3-6 months\n• If no improvement by 3 months: Re-image\n\n**Discharge with:**\n• Close ophthalmology follow-up (1-2 weeks)\n• Strict return precautions\n• Diabetes/HTN optimization\n\n**Return Precautions:**\n⚠️ Pupil becomes involved\n⚠️ Symptoms progress\n⚠️ New headache\n⚠️ New neurological symptoms\n⚠️ No improvement by 2-3 months\n\n**Document:** "Diagnosis of exclusion after negative imaging." [3][4]',
    citation: [3, 4],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-cn3-further',
    type: 'info',
    module: 2,
    title: 'CN III - Further Workup',
    body: '**CTA Negative but Concerning Features:**\n\n**Consider Further Imaging:**\n• **MRI/MRA with contrast** + thin cuts through cavernous sinus\n• Steady-state sequences (FIESTA/CISS) for small nerve lesions\n• If still negative and high suspicion: **DSA (catheter angiography)**\n\n**Indications for Additional Imaging:**\n• Pupil involvement\n• Age <50\n• No vascular risk factors\n• Progressive symptoms\n• Pain (especially severe)\n• Any other neurological findings\n\n**If All Imaging Negative:**\n• Consider admission for observation\n• Serial exams for progression\n• MG workup if features suggest\n• Repeat imaging in 1-2 weeks if symptoms progress\n\n**Disposition:**\n• Admit if high concern or unable to ensure close follow-up\n• Neurology consultation recommended [4][6]',
    citation: [4, 6],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-cn3-other',
    type: 'info',
    module: 2,
    title: 'CN III - Other Pathology',
    body: '**Other Causes of CN III Palsy Found on Imaging:**\n\n**Mass/Tumor:**\n• Meningioma, pituitary adenoma, metastasis\n• Neurosurgery/neuro-oncology consult\n• Admission for workup\n\n**Stroke/Infarct:**\n• Midbrain infarct (Weber syndrome, Benedikt syndrome)\n• Stroke workup protocol\n• Neurology admission\n\n**Cavernous Sinus Pathology:**\n• Thrombosis, fistula, mass\n• Often multiple CN involvement\n• See cavernous sinus section\n\n**Inflammation:**\n• Tolosa-Hunt syndrome\n• Sarcoidosis\n• May need LP, inflammatory workup\n• Responds to steroids\n\n**Infection:**\n• Mucormycosis (diabetic, immunocompromised)\n• Herpes zoster ophthalmicus\n• Urgent infectious disease/ophthalmology consult [3][4]',
    citation: [3, 4],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: CN IV PALSY
  // =====================================================================

  {
    id: 'diplopia-cn4-start',
    type: 'info',
    module: 3,
    title: 'CN IV Palsy Overview',
    body: '**CN IV (Trochlear) - Superior Oblique Muscle**\n\n**Unique Features:**\n• Longest intracranial course of any CN\n• Only CN that exits dorsally from brainstem\n• Only CN that crosses to supply contralateral muscle\n• **Most vulnerable to trauma**\n\n**Function:**\n• Depression in adduction (looking down and in)\n• Intorsion (rotates top of eye toward nose)\n\n**Clinical Presentation:**\n• **Vertical diplopia** (images stacked)\n• **Compensatory head tilt** to opposite shoulder\n• Trouble reading, going downstairs\n• Hypertropia (affected eye higher)\n\n**Common Causes:**\n1. **Trauma** - most common acquired cause\n2. **Microvascular** - diabetes, HTN\n3. **Congenital** - decompensated childhood palsy\n4. Mass lesion (rare) [5][7]',
    citation: [5, 7],
    images: [
      {
        src: 'images/diplopia/cn4-head-tilt.png',
        alt: 'Patient with CN IV palsy showing compensatory head tilt to opposite shoulder',
        caption: 'CN IV palsy: Compensatory head tilt to opposite shoulder to minimize vertical diplopia.',
      },
    ],
    next: 'diplopia-cn4-exam',
  },

  {
    id: 'diplopia-cn4-exam',
    type: 'info',
    module: 3,
    title: 'Parks-Bielschowsky 3-Step Test',
    body: '**Parks-Bielschowsky 3-Step Test for CN IV Palsy:**\n\n**Purpose:** Isolate the weak muscle in vertical diplopia\n\n**Step 1: Which eye is higher (hypertropic)?**\n• Right hypertropia = problem with RIGHT SO or LEFT IR\n• Left hypertropia = problem with LEFT SO or RIGHT IR\n\n**Step 2: Does hypertropia worsen in R or L gaze?**\n• Worse in LEFT gaze = SO of higher eye OR IR of lower eye\n• Worse in RIGHT gaze = SO of lower eye OR IR of higher eye\n\n**Step 3: Bielschowsky Head Tilt Test**\n• Tilt head to RIGHT then LEFT shoulder\n• Hypertropia worse with tilt to ONE side\n• Worse with tilt TOWARD higher eye = SO palsy of that eye\n\n**Example: Right CN IV Palsy**\n✓ Right hypertropia\n✓ Worse in LEFT gaze\n✓ Worse with RIGHT head tilt\n\n**Sensitivity:** ~75% for unilateral superior oblique palsy [5][7]',
    citation: [5, 7],
    calculatorLinks: [
      { id: 'diplopia-3step', label: '3-Step Test' },
    ],
    images: [
      {
        src: 'images/diplopia/bielschowsky-test.png',
        alt: 'Bielschowsky head tilt test demonstrating worsening hypertropia with ipsilateral head tilt',
        caption: 'Bielschowsky test: Hypertropia worsens when head tilts toward affected side.',
      },
    ],
    next: 'diplopia-cn4-workup',
  },

  {
    id: 'diplopia-cn4-workup',
    type: 'info',
    module: 3,
    title: 'CN IV Palsy Workup',
    body: '**CN IV Palsy Workup:**\n\n**History:**\n• Recent head trauma? (even minor)\n• Old photos showing head tilt? (suggests congenital)\n• Vascular risk factors?\n\n**When to Image:**\n\n| Scenario | Imaging |\n|----------|--------|\n| Trauma history | CT head |\n| Age >50 + vascular RF + isolated | Can observe, image if no improvement 2-3 months |\n| Age <50 OR no vascular RF | MRI with contrast |\n| Progressive or bilateral | MRI with contrast |\n| Other neurological findings | MRI with contrast |\n\n**Labs:**\n• ESR/CRP if age >50 (GCA screen)\n• Glucose, HbA1c if suspected microvascular\n\n**Bilateral CN IV Palsy Features:**\n• Alternating hypertropia (switches with gaze)\n• Positive Bielschowsky to BOTH shoulders\n• Large V-pattern esotropia\n• Common after trauma (contrecoup injury) [5][7]',
    citation: [5, 7],
    next: 'diplopia-cn4-disposition',
  },

  {
    id: 'diplopia-cn4-disposition',
    type: 'info',
    module: 3,
    title: 'CN IV Palsy Disposition',
    body: '**CN IV Palsy Disposition:**\n\n**Can Discharge with Outpatient Follow-up:**\n• Isolated CN IV palsy\n• Clear trauma history OR age >50 with vascular RF\n• No other neurological findings\n• Reliable follow-up\n\n**Follow-up:**\n• Ophthalmology/neuro-ophthalmology 1-2 weeks\n• If no improvement by 3 months: MRI\n\n**Admit/Emergent Workup if:**\n• Progressive symptoms\n• Bilateral involvement (unless clearly traumatic)\n• Other CN involvement\n• Papilledema\n• Associated neurological findings\n\n**Symptomatic Treatment:**\n• Prism glasses (ophthalmology prescribes)\n• Patching one eye for temporary relief\n• Botulinum toxin (specialist)\n• Surgery if persistent (>6-12 months)\n\n**Prognosis:**\n• Traumatic: Often improves over 6-12 months\n• Microvascular: Usually resolves 2-3 months [5][7]',
    citation: [5, 7],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  // =====================================================================
  // MODULE 4: CN VI PALSY
  // =====================================================================

  {
    id: 'diplopia-cn6-start',
    type: 'info',
    module: 4,
    title: 'CN VI Palsy Overview',
    body: '**CN VI (Abducens) - Lateral Rectus Muscle**\n\n**Function:**\n• Abduction ONLY (looking outward)\n\n**Clinical Presentation:**\n• **Horizontal diplopia** (worse at distance)\n• **Esotropia** - affected eye turned IN\n• Cannot abduct affected eye past midline\n• **Face turn toward affected side** (to minimize diplopia)\n\n**Unique Feature - False Localizing Sign:**\n• CN VI has the **longest intracranial course**\n• Tethered at Dorello\'s canal (petrous apex)\n• **Stretched by downward brainstem displacement**\n• Can be "false localizing sign" of elevated ICP\n\n**⚠️ Always check for papilledema in isolated CN VI palsy!**\n\n**Common Causes:**\n1. Microvascular (most common in adults)\n2. **Elevated ICP** (check fundoscopy!)\n3. Trauma\n4. Tumor\n5. Infection/inflammation [3][8]',
    citation: [3, 8],
    images: [
      {
        src: 'images/diplopia/cn6-palsy.png',
        alt: 'CN VI palsy showing esotropia and inability to abduct the affected eye',
        caption: 'CN VI palsy: Esotropia with inability to abduct affected eye past midline.',
      },
    ],
    next: 'diplopia-cn6-workup',
  },

  {
    id: 'diplopia-cn6-workup',
    type: 'info',
    module: 4,
    title: 'CN VI Palsy Workup',
    body: '**CN VI Palsy Workup:**\n\n**Critical Step - Fundoscopy:**\n• **Papilledema?** → Emergent imaging for elevated ICP\n• CN VI as false localizing sign in ~33% of IIH patients\n\n**Imaging Based on Risk:**\n\n| Patient | Recommendation |\n|---------|---------------|\n| Age >50, vascular RF, isolated, no papilledema | Can observe; image if no improvement 2-3 months |\n| Age <50 | MRI with contrast |\n| No vascular risk factors | MRI with contrast |\n| **ALL children** | **Emergent MRI** (higher malignancy risk) |\n| Papilledema present | **Emergent CT/MRI** |\n| Other CN involvement | MRI with contrast |\n| Progressive or bilateral | MRI with contrast |\n\n**Labs:**\n• **ESR/CRP if age >50** (GCA screen)\n• Glucose, HbA1c\n• LP (if papilledema to measure opening pressure) [3][8]',
    citation: [3, 8],
    next: 'diplopia-cn6-disposition',
  },

  {
    id: 'diplopia-cn6-disposition',
    type: 'question',
    module: 4,
    title: 'CN VI Palsy Findings',
    body: '**What did evaluation reveal?**',
    citation: [3, 8],
    options: [
      {
        label: 'Papilledema Present',
        description: 'Elevated ICP - emergent workup',
        next: 'diplopia-cn6-icp',
        urgency: 'critical',
      },
      {
        label: 'Child with CN VI Palsy',
        description: 'Emergent imaging needed',
        next: 'diplopia-cn6-peds',
        urgency: 'critical',
      },
      {
        label: 'Adult, No Papilledema, Vascular RF',
        description: 'Likely microvascular',
        next: 'diplopia-cn6-microvascular',
      },
      {
        label: 'Pathology Found on Imaging',
        description: 'Mass, stroke, or other lesion',
        next: 'diplopia-cn6-pathology',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'diplopia-cn6-icp',
    type: 'info',
    module: 4,
    title: 'CN VI + Elevated ICP',
    body: '**⚠️ CN VI Palsy with Elevated ICP ⚠️**\n\n**CN VI is a FALSE LOCALIZING SIGN:**\n• Does NOT indicate where the lesion is\n• Indicates elevated ICP from any cause\n\n**Emergent Workup:**\n1. **CT Head** - mass, hydrocephalus, hemorrhage\n2. **MRV** if CT negative - venous sinus thrombosis\n3. **LP with opening pressure** (after imaging) - IIH\n\n**Common Causes:**\n• Brain tumor\n• Hydrocephalus\n• Idiopathic intracranial hypertension (IIH)\n• Cerebral venous thrombosis\n• Post-LP (low pressure can also cause!)\n\n**IIH (Pseudotumor Cerebri):**\n• Typically young, obese females\n• Headache, pulsatile tinnitus, transient visual obscurations\n• Opening pressure >25 cm H2O\n• Treatment: Acetazolamide, weight loss, +/- shunt\n\n**Disposition:** Admit for workup and management [3][8]',
    citation: [3, 8],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-cn6-peds',
    type: 'info',
    module: 4,
    title: 'Pediatric CN VI Palsy',
    body: '**⚠️ ALL Children with CN VI Palsy Need Emergent Imaging ⚠️**\n\n**Why Children Are Different:**\n• Higher prevalence of intracranial pathology\n• Posterior fossa tumors more common\n• Cannot rely on "microvascular" diagnosis\n\n**Common Pediatric Causes:**\n• **Brain tumor** (especially posterior fossa)\n• Elevated ICP\n• Infection (meningitis, mastoiditis - Gradenigo syndrome)\n• Trauma\n• Post-viral inflammation\n\n**Gradenigo Syndrome:**\n• Otitis media → petrous apicitis\n• Triad: CN VI palsy + V1 pain + ear infection\n• Emergent ENT consultation\n\n**Workup:**\n• MRI with contrast (preferred)\n• CT if MRI not available\n• Consider LP if infectious concern\n\n**Disposition:**\n• Admit for workup\n• Pediatric neurology/neurosurgery consult\n• Ophthalmology consultation [3][8]',
    citation: [3, 8],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-cn6-microvascular',
    type: 'info',
    module: 4,
    title: 'Microvascular CN VI Palsy',
    body: '**Likely Microvascular CN VI Palsy:**\n\n**Criteria:**\n✅ Age >50\n✅ Vascular risk factors (DM, HTN)\n✅ Isolated CN VI (no other CN involvement)\n✅ No papilledema\n✅ No other neurological findings\n\n**Natural History:**\n• Spontaneous improvement: 2-3 months\n• Full recovery expected in most cases\n• If no improvement by 3 months: MRI\n\n**Discharge with:**\n• Ophthalmology follow-up 2-4 weeks\n• Strict return precautions\n• DM/HTN optimization\n\n**Return Precautions:**\n⚠️ New headache\n⚠️ Vision changes\n⚠️ Other CN involvement\n⚠️ No improvement by 2-3 months\n⚠️ Symptoms progress\n\n**Symptomatic Treatment:**\n• Prism glasses\n• Patching affected eye for relief\n• Head turn toward affected side [3][8]',
    citation: [3, 8],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-cn6-pathology',
    type: 'info',
    module: 4,
    title: 'CN VI - Pathology Found',
    body: '**CN VI Palsy - Pathology Identified:**\n\n**Mass/Tumor:**\n• Nasopharyngeal carcinoma (invades skull base)\n• Chordoma, meningioma\n• Metastasis\n• Neurosurgery/neuro-oncology consult\n\n**Stroke:**\n• Pontine infarct\n• Usually has other findings (facial weakness, ataxia)\n• Stroke workup protocol\n\n**Cerebral Venous Thrombosis:**\n• Headache, papilledema, CN VI\n• MRV confirms diagnosis\n• Anticoagulation\n\n**Inflammatory:**\n• Sarcoidosis\n• Tolosa-Hunt\n• May respond to steroids\n\n**Infectious:**\n• Mastoiditis → Gradenigo syndrome\n• Skull base osteomyelitis\n• Meningitis\n• Lyme disease (endemic areas)\n\n**Disposition:** Based on pathology - most require admission [3][8]',
    citation: [3, 8],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  // =====================================================================
  // MODULE 5: INO & BRAINSTEM / SPECIAL SCENARIOS
  // =====================================================================

  {
    id: 'diplopia-ino',
    type: 'info',
    module: 5,
    title: 'Internuclear Ophthalmoplegia (INO)',
    body: '**INO - Medial Longitudinal Fasciculus Lesion**\n\n**Anatomy:**\n• MLF connects CN VI nucleus to contralateral CN III nucleus\n• Coordinates conjugate horizontal gaze\n\n**Clinical Findings:**\n• **Impaired ADDUCTION** of ipsilateral eye\n• **Nystagmus of ABDUCTING** (contralateral) eye\n• Convergence usually preserved (different pathway)\n• Name INO by side with impaired adduction\n\n**Example - Left INO:**\n• Looking RIGHT: Left eye cannot adduct, right eye has nystagmus\n• Convergence: Both eyes can adduct\n\n**Etiology by Age:**\n\n| Age | Most Likely Cause | Laterality |\n|-----|-------------------|------------|\n| Young | **Multiple Sclerosis** | Often bilateral |\n| Older | **Stroke** | Usually unilateral |\n\n**Stats:**\n• ~33% MS, ~33% stroke\n• INO present in ~23% of MS patients\n• Most common ocular movement abnormality in MS [9][10]',
    citation: [9, 10],
    images: [
      {
        src: 'images/diplopia/ino.png',
        alt: 'Internuclear ophthalmoplegia showing adduction deficit with contralateral abducting nystagmus',
        caption: 'INO: Adduction deficit of ipsilateral eye with nystagmus of abducting contralateral eye.',
      },
    ],
    next: 'diplopia-ino-workup',
  },

  {
    id: 'diplopia-ino-workup',
    type: 'info',
    module: 5,
    title: 'INO Workup & Disposition',
    body: '**INO Workup:**\n\n**Imaging:**\n• **MRI with DWI** is gold standard\n• Proton density sequences best for MLF lesions\n• Fine overlapping cuts (lesions can be small)\n• CT often misses posterior fossa lesions\n\n**CT/CTA Sensitivity for Posterior Stroke:** Only **10-41%**\n\n**Differentiating MS vs Stroke:**\n\n| Feature | MS | Stroke |\n|---------|-----|--------|\n| Age | Young | Older |\n| Bilateral | Common | Rare |\n| Onset | Variable | Acute |\n| Other demyelination | Present | Absent |\n\n**If Stroke Suspected:**\n• Full stroke workup\n• May benefit from thrombolysis if within window\n• Neurology admission\n\n**If MS Suspected:**\n• Full MRI brain and spine\n• Neurology referral\n• Consider LP for oligoclonal bands\n\n**Prognosis:**\n• ~50% resolve within 1 year\n• MS/inflammatory: Better recovery\n• Stroke: Less favorable [9][10]',
    citation: [9, 10],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-multiple',
    type: 'info',
    module: 5,
    title: 'Multiple Cranial Nerve Palsies',
    body: '**⚠️ Multiple CN Palsies = Localize the Lesion ⚠️**\n\n**Cavernous Sinus Syndrome:**\n• CN III, IV, V1, V2, VI pass through\n• +/- Horner syndrome (sympathetics)\n• Causes:\n  - **Thrombosis** (septic or aseptic)\n  - Carotid-cavernous fistula\n  - Tumor (meningioma, pituitary)\n  - Tolosa-Hunt (inflammatory)\n\n**Orbital Apex Syndrome:**\n• Cavernous sinus nerves PLUS **CN II (optic nerve)**\n• Vision loss differentiates from cavernous sinus\n• Causes: Infection, tumor, inflammation\n\n**Superior Orbital Fissure Syndrome:**\n• CN III, IV, V1, VI\n• NO vision loss (CN II spared)\n• Similar to cavernous sinus but more anterior\n\n**Workup:**\n• MRI/MRA with attention to cavernous sinus\n• CTV/MRV if thrombosis suspected\n• ESR/CRP\n• Consider LP\n\n**Disposition:** Admit for workup [3][11]',
    citation: [3, 11],
    calculatorLinks: [
      { id: 'diplopia-localize', label: 'Localize Lesion' },
    ],
    next: 'diplopia-cavernous',
  },

  {
    id: 'diplopia-cavernous',
    type: 'info',
    module: 5,
    title: 'Cavernous Sinus Thrombosis',
    body: '**Cavernous Sinus Thrombosis - Can\'t Miss!**\n\n**Clinical Presentation:**\n• **Fever** (50-90%)\n• **Headache** (50-90%)\n• Periorbital swelling, chemosis\n• Proptosis\n• Multiple CN palsies (III, IV, V1, V2, VI)\n• May have Horner syndrome\n• Can become bilateral (intercavernous sinuses)\n\n**Causes:**\n• **Septic:** Sinusitis, orbital cellulitis, dental infection\n• **Aseptic:** Hypercoagulable state, OCP, pregnancy, malignancy\n\n**Workup:**\n• CT venography (specific but insensitive)\n• MR venography if CTV negative\n• Blood cultures\n• Source identification (sinus CT, dental evaluation)\n\n**Treatment:**\n• Broad-spectrum antibiotics if septic\n• Anticoagulation (controversial but often used)\n• Source control (drain abscess, treat sinusitis)\n\n**Mortality:** 20-30% even with treatment [11]',
    citation: [11],
    treatment: {
      firstLine: {
        drug: 'Vancomycin + Ceftriaxone + Metronidazole',
        dose: 'Vanc 25-30 mg/kg load, Ceftriaxone 2g, Metronidazole 500mg',
        route: 'IV',
        frequency: 'Vanc per levels, Ceftriaxone q12h, Metro q8h',
        duration: '4-6 weeks',
        notes: 'Cover Staph (including MRSA), Strep, anaerobes from dental/sinus sources.',
      },
      monitoring: 'Serial imaging, inflammatory markers, clinical improvement. ID and ophthalmology consults.',
    },
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-mg',
    type: 'info',
    module: 5,
    title: 'Myasthenia Gravis',
    body: '**Myasthenia Gravis - Fluctuating Diplopia:**\n\n**Key Features:**\n• **Fluctuating** ptosis and diplopia\n• **Fatigable** weakness (worse with sustained use)\n• **Worse in evening** or with fatigue\n• >50% present with isolated ocular symptoms initially\n\n**Bedside Tests:**\n\n**Ice Pack Test:**\n1. Apply ice pack to closed eyelid for 2-5 minutes\n2. Positive: Ptosis improves ≥2mm\n3. **Sensitivity: 80%, Specificity: 100%**\n4. Cold inhibits acetylcholinesterase\n\n**Sustained Upgaze Test:**\n• Have patient look up for 60 seconds\n• Positive: Ptosis worsens or develops\n\n**Confirmatory Testing:**\n• AChR antibodies: 50-70% sensitive in ocular MG\n• Single fiber EMG: ~95% sensitive\n• Anti-MuSK antibodies if AChR negative\n\n**⚠️ Red Flag - Myasthenic Crisis:**\n• Respiratory weakness (FVC <1L or <15 mL/kg)\n• Bulbar symptoms (dysphagia, dysarthria)\n• Requires ICU admission [12][13]',
    citation: [12, 13],
    images: [
      {
        src: 'images/diplopia/ice-pack-test.png',
        alt: 'Ice pack test for myasthenia gravis showing improvement of ptosis after 2-5 minutes of ice application',
        caption: 'Ice pack test: Apply ice to ptotic lid for 2-5 min. Improvement ≥2mm = positive for MG.',
      },
    ],
    next: 'diplopia-mg-disposition',
  },

  {
    id: 'diplopia-mg-disposition',
    type: 'info',
    module: 5,
    title: 'MG Disposition',
    body: '**Myasthenia Gravis Disposition:**\n\n**Admit if ANY of:**\n• Respiratory symptoms (SOB, weak cough)\n• FVC <1L or declining\n• Bulbar symptoms (dysphagia, voice changes)\n• New diagnosis with moderate-severe symptoms\n• Unable to maintain nutrition/hydration\n\n**Discharge if:**\n• Isolated mild ocular symptoms\n• No respiratory/bulbar involvement\n• Reliable neurology follow-up within days\n\n**Avoid These Medications in MG:**\n• Aminoglycosides\n• Fluoroquinolones\n• Beta-blockers\n• Magnesium\n• Botulinum toxin\n• Many others - check before prescribing!\n\n**Outpatient Follow-up:**\n• Neurology referral (urgent)\n• AChR antibody testing\n• CT chest (thymoma screen)\n• Ophthalmology for symptom management\n\n**Treatment:** Pyridostigmine, steroids (specialist decision) [12][13]',
    citation: [12, 13],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  // =====================================================================
  // MODULE 6: RED FLAGS, GCA, & DISPOSITION
  // =====================================================================

  {
    id: 'diplopia-red-flags',
    type: 'info',
    module: 6,
    title: 'Diplopia Red Flags',
    body: '**⚠️ EMERGENT Red Flags in Diplopia ⚠️**\n\n| Finding | Concern |\n|---------|--------|\n| **Pupil involvement + CN III** | PCommA aneurysm |\n| **Pain + CN III palsy** | Aneurysm, cavernous sinus |\n| **Thunderclap headache** | SAH |\n| **Progressive symptoms** | Compressive lesion |\n| **Multiple CN palsies** | Cavernous sinus, orbital apex |\n| **Proptosis** | Mass, CST, CCF |\n| **Papilledema** | Elevated ICP |\n| **Associated neuro deficits** | Brainstem stroke |\n| **V1/V2 sensory loss** | Cavernous sinus |\n| **Fever + eye findings** | Septic CST |\n| **Child with CN VI palsy** | Tumor until proven otherwise |\n\n**"Dangerous Ds" of Posterior Stroke:**\n• **D**iplopia\n• **D**ysarthria\n• **D**ysphagia\n• **D**ysmetria\n• **D**ystaxia\n\n**Posterior strokes missed 2-3x more often than anterior!** [1][2][14]',
    citation: [1, 2, 14],
    next: 'diplopia-gca',
  },

  {
    id: 'diplopia-gca',
    type: 'info',
    module: 6,
    title: 'Giant Cell Arteritis Screen',
    body: '**GCA Screen - ALL Patients >50 with New Diplopia**\n\n**Why It Matters:**\n• Can cause permanent vision loss (AAION)\n• Diplopia is a presenting feature (LR+ 3.4)\n• Treatable if caught early\n\n**Clinical Features:**\n• Age >50 (mean age 70)\n• New headache (often temporal)\n• Scalp tenderness\n• Jaw claudication (highly specific)\n• Polymyalgia rheumatica symptoms\n• Constitutional symptoms (fever, weight loss)\n\n**Labs:**\n• **ESR:** Typically >50 (often >100)\n• **CRP:** Sensitivity 98.6%, Specificity 75.7%\n• **Both normal:** Only 4% of GCA patients\n\n**⚠️ Normal ESR/CRP does NOT exclude GCA**\n\n**If GCA Suspected with Vision Threatened:**\n• **Start steroids BEFORE biopsy**\n• IV Methylprednisolone 500-1000mg daily x 3 days\n• OR Prednisone 1mg/kg/day if IV unavailable\n• Urgent temporal artery biopsy (within 2 weeks)\n• Ophthalmology consult [15]',
    citation: [15],
    treatment: {
      firstLine: {
        drug: 'Methylprednisolone',
        dose: '500-1000 mg',
        route: 'IV',
        frequency: 'Daily',
        duration: '3 days, then oral prednisone',
        notes: 'For GCA with threatened vision. Do NOT delay for biopsy.',
      },
      alternative: {
        drug: 'Prednisone',
        dose: '1 mg/kg/day',
        route: 'PO',
        frequency: 'Daily',
        duration: 'Taper over months (rheumatology guides)',
        notes: 'If IV unavailable. Start immediately if vision threatened.',
      },
      monitoring: 'ESR/CRP weekly initially. Symptom response. Vision checks. Arrange temporal artery biopsy within 2 weeks.',
    },
    next: 'diplopia-disposition',
  },

  {
    id: 'diplopia-disposition',
    type: 'question',
    module: 6,
    title: 'Final Disposition',
    body: '**Based on evaluation, what is the disposition?**',
    citation: [1, 2],
    options: [
      {
        label: 'Admit - Emergent Pathology',
        description: 'Aneurysm, stroke, CST, mass, MG crisis',
        next: 'diplopia-dispo-admit',
        urgency: 'critical',
      },
      {
        label: 'Discharge - Monocular Diplopia',
        description: 'Ocular cause, outpatient ophthalmology',
        next: 'diplopia-dispo-mono',
      },
      {
        label: 'Discharge - Likely Microvascular',
        description: 'Age >50, vascular RF, isolated palsy, negative imaging',
        next: 'diplopia-dispo-micro',
      },
      {
        label: 'Discharge - Needs Close Follow-up',
        description: 'Stable but requires urgent outpatient workup',
        next: 'diplopia-dispo-followup',
        urgency: 'urgent',
      },
    ],
  },

  {
    id: 'diplopia-dispo-admit',
    type: 'info',
    module: 6,
    title: 'Admit for Diplopia',
    body: '**Admission Indications:**\n\n**Definite Admit:**\n• Aneurysm identified\n• Acute stroke\n• Cavernous sinus thrombosis\n• Intracranial mass\n• MG with respiratory/bulbar symptoms\n• GCA with threatened vision\n• Multiple CN palsies with unknown etiology\n• Elevated ICP\n\n**Consider Admit:**\n• Unable to ensure close follow-up\n• Progressing symptoms\n• Uncertain diagnosis with high concern\n• New MG diagnosis\n• Suspected Wernicke encephalopathy\n\n**Consultations:**\n• Neurology (most cases)\n• Neurosurgery (aneurysm, mass)\n• Ophthalmology\n• Infectious disease (if infection suspected)\n\n**Documentation:**\n• Detailed neuro exam\n• Pupil assessment\n• Fundoscopy findings\n• Imaging results\n• Consultations obtained [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-dispo-mono',
    type: 'info',
    module: 6,
    title: 'Discharge - Monocular',
    body: '**Discharge for Monocular Diplopia:**\n\n**This is NOT a neurologic emergency.**\n\n**Outpatient Referral:**\n• Ophthalmology (routine, within 1-2 weeks)\n• Optometry for refraction if suspected\n\n**Common Causes:**\n• Refractive error (most common)\n• Dry eye\n• Cataract\n• Corneal irregularity\n\n**Patient Instructions:**\n• Artificial tears for dry eye\n• Follow up with ophthalmologist\n• Return if: develops into binocular diplopia, new neurological symptoms\n\n**Documentation:**\n• Confirmed monocular (persists with one eye covered)\n• Improved with pinhole (if refractive)\n• Normal neurological exam\n• Appropriate follow-up arranged [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-dispo-micro',
    type: 'info',
    module: 6,
    title: 'Discharge - Microvascular',
    body: '**Discharge for Likely Microvascular Palsy:**\n\n**Criteria Met:**\n✅ Age >50\n✅ Vascular risk factors (DM, HTN)\n✅ Isolated single CN palsy\n✅ Pupil-sparing (if CN III)\n✅ No papilledema\n✅ Negative imaging (CTA for CN III)\n✅ No other neurological findings\n\n**Follow-up:**\n• Ophthalmology/neuro-ophthalmology: 1-2 weeks\n• PCP for diabetes/HTN optimization\n\n**Return Precautions:**\n⚠️ Pupil becomes involved\n⚠️ Symptoms progress or spread\n⚠️ New headache\n⚠️ No improvement by 2-3 months\n⚠️ Any new neurological symptoms\n\n**Expected Course:**\n• Improvement: 2-3 months\n• If no improvement by 3 months: MRI\n\n**Documentation:**\n• "Diagnosis of exclusion after appropriate workup"\n• Return precautions given\n• Follow-up arranged [3][4]',
    citation: [3, 4],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

  {
    id: 'diplopia-dispo-followup',
    type: 'info',
    module: 6,
    title: 'Discharge - Close Follow-up',
    body: '**Discharge with Urgent Outpatient Follow-up:**\n\n**Appropriate for:**\n• Stable isolated CN palsy needing further workup\n• Negative emergent imaging but not classic microvascular\n• Suspected MG without crisis features\n• Mild symptoms, reliable patient\n\n**Arrange:**\n• Neurology appointment within 1 week\n• Ophthalmology/neuro-ophthalmology\n• MRI if not done emergently\n\n**Labs to Order:**\n• ESR/CRP (if age >50)\n• Glucose, HbA1c\n• AChR antibodies (if MG suspected)\n• TSH\n\n**Clear Return Precautions:**\n⚠️ Worsening diplopia\n⚠️ New headache\n⚠️ Vision changes\n⚠️ Weakness or numbness\n⚠️ Difficulty breathing or swallowing\n⚠️ Pupil changes\n\n**Document:**\n• Stable exam\n• Shared decision-making\n• Specific follow-up plan\n• Return precautions reviewed [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  },

];

export const DIPLOPIA_MODULE_LABELS = [
  'Classification',
  'CN III Palsy',
  'CN IV Palsy',
  'CN VI Palsy',
  'INO & Special',
  'Red Flags & Dispo',
];

export const DIPLOPIA_CITATIONS: Citation[] = [
  { num: 1, text: 'ACEP Now. Evaluate Diplopia and Spot Life-Threatening Etiologies. 2024.' },
  { num: 2, text: 'emDocs. Diplopia Evaluation and Management. 2024.' },
  { num: 3, text: 'EB Medicine. Abnormal Vision in the ED. 2024.' },
  { num: 4, text: 'StatPearls. Cranial Nerve III Palsy. 2024.' },
  { num: 5, text: 'StatPearls. Trochlear Nerve Palsy. 2024.' },
  { num: 6, text: 'AAO. Acquired Isolated Third Nerve Palsy. 2024.' },
  { num: 7, text: 'EyeWiki. Three Step Test for Cyclovertical Muscle Palsy. 2024.' },
  { num: 8, text: 'StatPearls. Abducens Nerve Palsy. 2024.' },
  { num: 9, text: 'StatPearls. Internuclear Ophthalmoplegia. 2024.' },
  { num: 10, text: 'EyeWiki. Internuclear Ophthalmoplegia. 2024.' },
  { num: 11, text: 'StatPearls. Cavernous Sinus Thrombosis. 2024.' },
  { num: 12, text: 'EMRA. The Ice Pack Test for Myasthenia Gravis. 2025.' },
  { num: 13, text: 'EyeWiki. Myasthenia Gravis. 2024.' },
  { num: 14, text: 'EMOttawa. Posterior Circulation Strokes. 2024.' },
  { num: 15, text: 'StatPearls. Giant Cell Arteritis. 2024.' },
];
