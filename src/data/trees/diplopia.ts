// MedKitt — Diplopia (Double Vision) Consult
// Sources: primary literature + society guidelines (ACR/VF, ACR-EULAR, AHA/ASA, MG
// International Consensus, ECMM/MSG-ERC, EFNS) - see DIPLOPIA_CITATIONS. Every reference
// carries a PMID. Reference list rebuilt 2026-07-30 during FDA CDS Prong-4 audit; the
// prior tertiary-only list (StatPearls/EyeWiki/blog) was replaced.
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
  // Re-anchored 2026-07-30: the pupil + PAIN/headache -> aneurysm pairing is stated in
  // diplopia-red-flags, not in diplopia-cn3-pupil (which covers pupil status alone).
  { text: 'Pupil-involving CN III + headache = PCommA aneurysm until proven otherwise', nodeId: 'diplopia-red-flags' },
  { text: 'ESR/CRP in ALL patients >50 years with new diplopia (GCA screen)', nodeId: 'diplopia-gca' },
  { text: 'If GCA is suspected with threatened vision, start steroids BEFORE biopsy', nodeId: 'diplopia-gca' },
  { text: 'Isolated CN VI can be false localizing sign of elevated ICP - check for papilledema', nodeId: 'diplopia-cn6-start' },
  { text: 'ALL children with CN VI palsy need emergent imaging', nodeId: 'diplopia-cn6-peds' },
  { text: 'Multiple CN palsies = cavernous sinus or orbital apex pathology', nodeId: 'diplopia-red-flags' },
  { text: 'Myasthenic crisis - respiratory weakness (FVC <1L or <15 mL/kg) or bulbar symptoms - requires ICU admission', nodeId: 'diplopia-mg' },
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
    body: '**Diplopia represents ~50,000 US ED visits annually.**\n\n**THE FIRST QUESTION:**\n"Does the double vision go away when you cover EITHER eye?"\n\n| Type | Test Result | Significance |\n|------|-------------|-------------|\n| **Monocular** | Persists with one eye covered | Ocular pathology - generally non-emergent |\n| **Binocular** | Resolves when either eye covered | Ocular misalignment - needs neuro workup |\n\n**Monocular Diplopia Causes:**\n• Refractive error (improves with pinhole)\n• Cataract\n• Corneal irregularity (dry eye, keratoconus)\n• Lens dislocation\n• Macular pathology\n\n**Binocular Diplopia = This Consult**\n• Requires evaluation for neuromuscular causes\n• Can be life-threatening (aneurysm, stroke, GCA)\n\n**Key Statistics:**\n• 64% have primary (microvascular) cause\n• 36% have secondary cause (stroke 45%, MS 18%, tumor 12%, aneurysm 7.5%)\n\n*Basis: the ~50,000 annual US ED visit figure comes from De Lott 2017, a nationally representative NAMCS/NHAMCS analysis reporting 49,790 diplopia-related ED visits per year (PMID 29075739). The 64%/36% etiologic split is NOT reproduced in the cited population-based series; Comer 2007 (PMID 16732215) and Rush and Younge 1981 (1,000 consecutive ocular motor palsies, PMID 7458744) give the published case mixes and denominators. Review those before relying on the percentages.* [1][2][3][4]',
    citation: [1, 2, 3, 4],
    calculatorLinks: [
      { id: 'diplopia-mono-vs-bino', label: 'Mono vs Bino' },
    ],
    next: 'diplopia-classify',
  
    summary: 'First determine monocular vs binocular — cover each eye; monocular = ocular cause, binocular = neurological',
  },

  {
    id: 'diplopia-classify',
    type: 'question',
    module: 1,
    title: 'Diplopia Type',
    body: '**Does the double vision resolve when EITHER eye is covered?**\n\n*Basis: the cover-one-eye discriminator between monocular and binocular diplopia is the standard first step in the cited reviews (PMID 16732215, 28722934).* [1][2][4]',
    citation: [1, 2, 4],
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
  
    summary: 'Diplopia Type — assess clinical status to guide next management decision',
  },

  {
    id: 'diplopia-monocular',
    type: 'info',
    module: 1,
    title: 'Monocular Diplopia',
    body: '**Monocular diplopia = ocular pathology, NOT neurologic emergency.**\n\n**Common Causes:**\n• **Refractive error** - improves with pinhole testing\n• **Dry eye** - improves with lubricating drops\n• **Cataract** - ghosting, halos\n• **Corneal irregularity** - keratoconus, scarring\n• **Lens subluxation** - trauma, Marfan syndrome\n• **Macular pathology** - distortion, metamorphopsia\n\n**Bedside Test:**\n• **Pinhole test** - if diplopia resolves = refractive cause\n\n**Disposition:**\n• Generally non-emergent\n• Outpatient ophthalmology referral\n• Return if binocular symptoms develop\n\n**Exception - Lens Dislocation:**\n• Recent trauma + monocular diplopia\n• May need urgent ophtho evaluation\n\n*Basis: the monocular etiologies and the pinhole discriminator are from the eye casualty outcome series of Comer 2007 (PMID 16732215) and the diplopia review (PMID 28722934); symptomatic measures are reviewed in Kedar 2025 (PMID 40179409).* [2][4][5]',
    citation: [2, 4, 5],
    options: [
      {
        label: 'Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Monocular diplopia persists with one eye covered — refractive error, cataract, corneal issue; rarely emergent',
  },

  {
    id: 'diplopia-direction',
    type: 'question',
    module: 1,
    title: 'Diplopia Direction',
    body: '**What direction is the diplopia?**\n\nAsk: "Are the two images side-by-side (horizontal) or stacked (vertical)?"\n\n*Basis: horizontal versus vertical localization follows the ocular motor palsy distribution in Rush and Younge 1981 (PMID 7458744) and the diplopia review (PMID 28722934).* [3][4]',
    citation: [3, 4],
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
  
    summary: 'Diplopia Direction — assess clinical status to guide next management decision',
  },

  {
    id: 'diplopia-horizontal',
    type: 'info',
    module: 1,
    title: 'Horizontal Diplopia',
    body: '**Horizontal diplopia suggests CN III or CN VI involvement.**\n\n**Quick Localization:**\n\n| Finding | Likely Nerve |\n|---------|-------------|\n| Cannot look OUTWARD (abduct) | **CN VI** |\n| Cannot look INWARD (adduct) + ptosis | **CN III** |\n| Cannot look INWARD only | INO (MLF lesion) |\n\n**CN VI (Abducens):**\n• Esotropia (eye turned in)\n• Face turn toward affected side\n• Diplopia worse at distance\n\n**CN III (Oculomotor):**\n• Eye "down and out"\n• Ptosis\n• +/- pupil dilation\n\n**Proceed to detailed examination.**\n\n*Basis: the CN III and CN VI localization patterns and their relative frequency are from Rush and Younge 1981 (PMID 7458744), Fang 2017 (population-based third nerve palsy, PMID 27893002) and Patel 2004 (population-based sixth nerve palsy, PMID 15019392).* [3][4][6][17]',
    citation: [3, 4, 6, 17],
    next: 'diplopia-exam',
  
    summary: 'Horizontal Diplopia — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-vertical',
    type: 'info',
    module: 1,
    title: 'Vertical Diplopia',
    body: '**Vertical diplopia suggests CN III or CN IV involvement.**\n\n**Quick Localization:**\n\n| Finding | Likely Nerve |\n|---------|-------------|\n| Eye down and out + ptosis | **CN III** |\n| Head tilt, hypertropia worse with adduction | **CN IV** |\n| Thyroid history, proptosis | Thyroid eye disease |\n\n**CN IV (Trochlear):**\n• Superior oblique palsy\n• Compensatory head tilt to opposite shoulder\n• Hypertropia worse with:\n  - Adduction (looking toward nose)\n  - Ipsilateral head tilt\n\n**CN III (Oculomotor):**\n• "Down and out" position\n• Usually has ptosis\n• Check pupil!\n\n**Proceed to detailed examination.**\n\n*Basis: the CN IV presentation and compensatory head tilt are from Dosunmu 2018 (population-based fourth nerve palsy, PMID 29102606) and the trochlear nerve palsy review (PMID 33351409); relative frequency from Rush and Younge 1981 (PMID 7458744).* [3][4][14][16]',
    citation: [3, 4, 14, 16],
    next: 'diplopia-exam',
  
    summary: 'Vertical Diplopia — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-exam',
    type: 'info',
    module: 1,
    title: 'Diplopia Examination',
    body: '**Systematic Diplopia Exam:**\n\n**1. Pupil Assessment:**\n• Size, reactivity, APD\n• Dilated pupil + CN III findings = EMERGENT\n\n**2. Extraocular Movements (H-pattern):**\n• Test each direction of gaze\n• Note which direction worsens diplopia\n• Look for nystagmus\n\n**3. Eyelid Examination:**\n• Ptosis (CN III, MG, Horner)\n• Lid lag (thyroid)\n• Fatigable ptosis (MG)\n\n**4. Cover-Uncover Test:**\n• Patient fixates on target\n• Cover one eye, observe movement when uncovered\n• Movement to take up fixation = tropia\n\n**5. Associated Findings:**\n• Proptosis (orbital pathology)\n• Facial sensation (V1/V2 - cavernous sinus)\n• Horner syndrome (cavernous sinus)\n\n**6. Fundoscopy:**\n• Papilledema = elevated ICP\n\n*Basis: the six-step examination sequence is the conventional ocular motor exam described in Rush and Younge 1981 (PMID 7458744) and the diplopia review (PMID 28722934); the cover-uncover component and the documented failure modes of vertical-deviation testing are detailed in Kushner 1989 (PMID 2919044).* [3][4][15][16]',
    citation: [3, 4, 15, 16],
    calculatorLinks: [
      { id: 'diplopia-exam-checklist', label: 'Exam Checklist' },
    ],
    next: 'diplopia-identify-nerve',
  
    summary: 'Diplopia Examination — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-identify-nerve',
    type: 'question',
    module: 1,
    title: 'Identify Affected Nerve',
    body: '**Based on examination, which pattern fits best?**\n\n*Basis: pattern-to-nerve assignment follows the localization scheme in Rush and Younge 1981 (PMID 7458744) and the diplopia review (PMID 28722934).* [3][4]',
    citation: [3, 4],
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
  
    summary: 'Identify Affected Nerve — assess clinical status to guide next management decision',
  },

  // =====================================================================
  // MODULE 2: CN III PALSY
  // =====================================================================

  {
    id: 'diplopia-cn3-start',
    type: 'info',
    module: 2,
    title: 'CN III Palsy Overview',
    body: '**CN III (Oculomotor) controls most eye movement + pupil.**\n\n**CN III Functions:**\n• Superior rectus (upgaze)\n• Inferior rectus (downgaze)\n• Medial rectus (adduction)\n• Inferior oblique (upgaze in adduction)\n• Levator palpebrae (lid elevation)\n• **Pupillary constriction**\n\n**Complete CN III Palsy:**\n• **"Down and out"** eye position\n• **Ptosis** (complete)\n• **Dilated pupil** (if pupil-involving)\n• Loss of accommodation\n\n**⚠️ CRITICAL DISTINCTION:**\n\n| | Pupil-INVOLVING | Pupil-SPARING |\n|---|-----------------|---------------|\n| Pupil | Fixed, dilated | Normal, reactive |\n| Classic cause | **Compressive (aneurysm)** | Microvascular |\n| Urgency | **EMERGENT** | Urgent |\n\n**BUT: This "rule" is NOT absolute!**\n\n*Basis: the pupil-involving versus pupil-sparing distinction, and the explicit statement that the rule is not absolute, rest on Jacobson 1998 (PMID 9639439) and Jacobson 2001 (PMID 11274322); etiologic frequencies are from Fang 2017 (PMID 27893002).* [6][7][8][13]',
    citation: [6, 7, 8, 13],
    next: 'diplopia-cn3-pupil',
  
    summary: 'CN III Palsy Overview — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn3-pupil',
    type: 'info',
    module: 2,
    title: 'The Pupil in CN III Palsy',
    body: '**Why the Pupil Matters:**\n\n**Anatomy:**\n• Pupillomotor fibers run on the **dorsomedial surface** of CN III\n• External compression (aneurysm) affects these fibers FIRST\n• Ischemia (diabetes) affects internal fibers, sparing peripheral pupillomotor fibers\n\n**The "Rule of the Pupil" - And Its Limitations:**\n\n✅ **Classical Teaching:**\n• Pupil-involving = compressive (aneurysm)\n• Pupil-sparing = microvascular (safe)\n\n⚠️ **CRITICAL CAVEATS:**\n• Up to **38% of ischemic (microvascular) CN III** involves the pupil — usually mild (<1 mm anisocoria) with some residual reactivity\n• Up to **36% of compressive lesions** are initially pupil-sparing\n• Pupil involvement may be **delayed 5-7 days** in an evolving aneurysm (recheck pupil at 24-48h)\n\n**BOTTOM LINE:**\n\n⚠️ **ALL acute CN III palsies require emergent CTA regardless of pupil status.**\n\n**PCommA aneurysm rupture carries 50% mortality.**\n\n*Basis: the 38% pupil-involvement rate in ischemic CN III palsy and the under-1-mm anisocoria descriptor are from Jacobson 1998 (PMID 9639439). The 36% of compressive lesions that are initially pupil-sparing is the complement of the 64% pupil-involving rate reported in Fang 2017 (PMID 27893002); relative pupil sparing with mass lesions is characterized in Jacobson 2001 (PMID 11274322). Aneurysms missed on non-invasive vascular imaging are documented in Elmalem 2011 (PMID 21150642). The 50% mortality figure refers to case fatality after aneurysmal subarachnoid hemorrhage, not to CN III palsy itself; see the ISAT 18-year follow-up (PMID 25465111).* [6][7][8][10][12]',
    citation: [6, 7, 8, 10, 12],
    calculatorLinks: [
      { id: 'diplopia-cn3-risk', label: 'CN III Risk' },
    ],
    next: 'diplopia-cn3-workup',
  
    summary: 'The Pupil in CN III Palsy — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn3-workup',
    type: 'info',
    module: 2,
    title: 'CN III Palsy Workup',
    body: '**Emergent Workup for ALL CN III Palsies:**\n\n**Imaging:**\n\n| Test | When | Sensitivity |\n|------|------|-------------|\n| **CTA Head** | ALL CN III palsies | >95% for aneurysm >3mm |\n| MRI/MRA | CTA negative, high suspicion | Better for small lesions |\n| DSA (catheter angio) | CTA/MRA negative, very high suspicion | Gold standard (~1% stroke risk) |\n\n**CTA Sensitivity for PCommA Aneurysm:**\n• Aneurysms <5mm: **99.4-99.8%**\n• Specificity: **99.1-99.6%**\n\n**Labs:**\n• Glucose, HbA1c (if microvascular suspected after negative imaging)\n• **ESR/CRP if age >50** (GCA screen)\n\n**If CTA NEGATIVE:**\n• Age >50 with vascular risk factors → can observe closely\n• Age <50 OR no vascular risk factors → MRI/MRA\n• Pupil involvement → MRI/MRA, consider DSA\n• Any progression → repeat imaging\n\n*Basis: CTA operating characteristics are from Menke 2011, a meta-analysis of CT angiography for cerebral aneurysm reporting pooled per-patient sensitivity 97.2% and specificity 97.9%, and per-aneurysm sensitivity 95.0% and specificity 96.2%, with reduced accuracy for aneurysms of 4 mm or less (PMID 21391230). Real-world misses on non-invasive studies are documented in Elmalem 2011 (PMID 21150642). Imaging and treatment thresholds follow the AHA/ASA unruptured intracranial aneurysm guideline (PMID 26089327). The ESR and CRP screen over age 50 is supported by Kermani 2012 (PMID 22119103). NOTE: the 99.4-99.8% sensitivity and 99.1-99.6% specificity quoted above exceed every value in reference 9; confirm against that meta-analysis before relying on them.* [6][9][10][11][43]',
    citation: [6, 9, 10, 11, 43],
    next: 'diplopia-cn3-disposition',
  
    summary: 'CN III Palsy Workup — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn3-disposition',
    type: 'question',
    module: 2,
    title: 'CN III Palsy Disposition',
    body: '**What did imaging show?**\n\n*Basis: the post-imaging branch points follow the AHA/ASA unruptured intracranial aneurysm guideline (PMID 26089327) and the CTA performance data in Menke 2011 (PMID 21391230); etiologic frequencies from Fang 2017 (PMID 27893002).* [6][9][11]',
    citation: [6, 9, 11],
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
  
    summary: 'CN III Palsy Disposition — assess clinical status to guide next management decision',
  },

  {
    id: 'diplopia-cn3-aneurysm',
    type: 'info',
    module: 2,
    title: 'PCommA Aneurysm Found',
    body: '**⚠️ NEUROSURGICAL EMERGENCY ⚠️**\n\n**Immediate Actions:**\n1. **Emergent neurosurgery consultation**\n2. Admit to ICU/neuro unit\n3. BP control (avoid hypertension)\n4. Aneurysm precautions:\n   - Bed rest\n   - Quiet environment\n   - Stool softeners\n   - Pain control\n   - Avoid Valsalva\n5. NPO for likely intervention\n\n**Treatment Options:**\n• **Endovascular coiling** (preferred for most PCommA aneurysms)\n• **Surgical clipping**\n\n**Timing:**\n• Unruptured symptomatic aneurysm: Urgent treatment within 24-72 hours\n• SAH: Emergent treatment\n\n**Prognosis:**\n• Untreated PCommA aneurysm rupture: **50% mortality**\n• CN III recovery after treatment: Variable (better if treated early)\n\n*Basis: coiling versus clipping selection, treatment timing and aneurysm precautions follow the AHA/ASA guideline for the management of patients with unruptured intracranial aneurysms (PMID 26089327); comparative durability is from the 18-year ISAT follow-up (PMID 25465111), which also frames the quoted rupture mortality.* [11][12]',
    citation: [11, 12],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'PCommA Aneurysm Found — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn3-microvascular',
    type: 'info',
    module: 2,
    title: 'Microvascular CN III Palsy',
    body: '**Likely Microvascular ("Diabetic") CN III Palsy:**\n\n**Criteria for Microvascular Diagnosis:**\n✅ Age >50\n✅ Vascular risk factors (DM, HTN, hyperlipidemia)\n✅ Pupil-sparing\n✅ No other neurological findings\n✅ Negative CTA\n\n**Natural History:**\n• Spontaneous improvement: 2-3 months\n• Full recovery: 3-6 months\n• If no improvement by 3 months: Re-image\n\n**Discharge with:**\n• Close ophthalmology follow-up (1-2 weeks)\n• Strict return precautions\n• Diabetes/HTN optimization\n\n**Return Precautions:**\n⚠️ Pupil becomes involved\n⚠️ Symptoms progress\n⚠️ New headache\n⚠️ New neurological symptoms\n⚠️ No improvement by 2-3 months\n\n**Document:** "Diagnosis of exclusion after negative imaging."\n\n*Basis: the microvascular criteria and the 2-3 month improvement and 3-6 month recovery timelines are from the natural history data in Rush and Younge 1981 (PMID 7458744) and Fang 2017 (PMID 27893002); the pupil return precaution rests on Jacobson 1998 (PMID 9639439).* [3][6][7]',
    citation: [3, 6, 7],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Microvascular CN III Palsy — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn3-further',
    type: 'info',
    module: 2,
    title: 'CN III - Further Workup',
    body: '**CTA Negative but Concerning Features:**\n\n**Consider Further Imaging:**\n• **MRI/MRA with contrast** + thin cuts through cavernous sinus\n• Steady-state sequences (FIESTA/CISS) for small nerve lesions\n• If still negative and high suspicion: **DSA (catheter angiography)**\n\n**Indications for Additional Imaging:**\n• Pupil involvement\n• Age <50\n• No vascular risk factors\n• Progressive symptoms\n• Pain (especially severe)\n• Any other neurological findings\n\n**If All Imaging Negative:**\n• Consider admission for observation\n• Serial exams for progression\n• MG workup if features suggest\n• Repeat imaging in 1-2 weeks if symptoms progress\n\n**Disposition:**\n• Admit if high concern or unable to ensure close follow-up\n• Neurology consultation recommended\n\n*Basis: the case for MRI/MRA and catheter angiography after a negative CTA is made in Elmalem 2011, which reported posterior communicating artery aneurysms missed by non-invasive brain vascular studies (PMID 21150642); management thresholds follow the AHA/ASA unruptured aneurysm guideline (PMID 26089327).* [10][11][13]',
    citation: [10, 11, 13],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'CN III - Further Workup — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn3-other',
    type: 'info',
    module: 2,
    title: 'CN III - Other Pathology',
    body: '**Other Causes of CN III Palsy Found on Imaging:**\n\n**Mass/Tumor:**\n• Meningioma, pituitary adenoma, metastasis\n• Neurosurgery/neuro-oncology consult\n• Admission for workup\n\n**Stroke/Infarct:**\n• Midbrain infarct (Weber syndrome, Benedikt syndrome)\n• Stroke workup protocol\n• Neurology admission\n\n**Cavernous Sinus Pathology:**\n• Thrombosis, fistula, mass\n• Often multiple CN involvement\n• See cavernous sinus section\n\n**Inflammation:**\n• Tolosa-Hunt syndrome\n• Sarcoidosis\n• May need LP, inflammatory workup\n• Responds to steroids\n\n**Infection:**\n• Mucormycosis (diabetic, immunocompromised)\n• Herpes zoster ophthalmicus\n• Urgent infectious disease/ophthalmology consult\n\n*Basis: the non-aneurysmal causes listed are the established differential for painful ophthalmoplegia and orbital or cavernous syndromes in Bhatti 2007 (PMID 17577868) and Ertilav 2024 (PMID 39145318); the mucormycosis pathway follows the ECMM and MSG-ERC global guideline (PMID 31699664); etiologic frequencies from Fang 2017 (PMID 27893002).* [6][30][34][35]',
    citation: [6, 30, 34, 35],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'CN III - Other Pathology — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 3: CN IV PALSY
  // =====================================================================

  {
    id: 'diplopia-cn4-start',
    type: 'info',
    module: 3,
    title: 'CN IV Palsy Overview',
    body: '**CN IV (Trochlear) - Superior Oblique Muscle**\n\n**Unique Features:**\n• Longest intracranial course of any CN\n• Only CN that exits dorsally from brainstem\n• Only CN that crosses to supply contralateral muscle\n• **Most vulnerable to trauma**\n\n**Function:**\n• Depression in adduction (looking down and in)\n• Intorsion (rotates top of eye toward nose)\n\n**Clinical Presentation:**\n• **Vertical diplopia** (images stacked)\n• **Compensatory head tilt** to opposite shoulder\n• Trouble reading, going downstairs\n• Hypertropia (affected eye higher)\n\n**Common Causes:**\n1. **Trauma** - most common acquired cause\n2. **Microvascular** - diabetes, HTN\n3. **Congenital** - decompensated childhood palsy\n4. Mass lesion (rare)\n\n*Basis: trauma as the leading acquired cause, and the microvascular and congenital categories, are from Dosunmu 2018, a population-based study of presumed fourth cranial nerve palsy (PMID 29102606), with the trochlear palsy review (PMID 33351409) and Rush and Younge 1981 (PMID 7458744).* [3][14][16]',
    citation: [3, 14, 16],
    next: 'diplopia-cn4-exam',
  
    summary: 'CN IV Palsy Overview — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn4-exam',
    type: 'info',
    module: 3,
    title: 'Parks-Bielschowsky 3-Step Test',
    body: '**Parks-Bielschowsky 3-Step Test for CN IV Palsy:**\n\n**Purpose:** Isolate the weak muscle in vertical diplopia\n\n**Step 1: Which eye is higher (hypertropic)?**\n• Right hypertropia = problem with RIGHT SO or LEFT IR\n• Left hypertropia = problem with LEFT SO or RIGHT IR\n\n**Step 2: Does hypertropia worsen in R or L gaze?**\n• Worse in LEFT gaze = SO of higher eye OR IR of lower eye\n• Worse in RIGHT gaze = SO of lower eye OR IR of higher eye\n\n**Step 3: Bielschowsky Head Tilt Test**\n• Tilt head to RIGHT then LEFT shoulder\n• Hypertropia worse with tilt to ONE side\n• Worse with tilt TOWARD higher eye = SO palsy of that eye\n\n**Example: Right CN IV Palsy**\n✓ Right hypertropia\n✓ Worse in LEFT gaze\n✓ Worse with RIGHT head tilt\n\n**Sensitivity:** ~75% for unilateral superior oblique palsy\n\n*Basis: the Parks-Bielschowsky three-step test and its documented failure modes, including skew deviation, prior strabismus surgery, restrictive myopathy and bilateral palsy, are catalogued in Kushner 1989 (PMID 2919044). NOTE: no published sensitivity figure for the three-step test was located in the primary literature; the ~75% value above is not traceable to reference 15 and should be treated as unsourced.* [15][16]',
    citation: [15, 16],
    calculatorLinks: [
      { id: 'diplopia-3step', label: '3-Step Test' },
    ],
    next: 'diplopia-cn4-workup',
  
    summary: 'Parks-Bielschowsky 3-Step Test — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn4-workup',
    type: 'info',
    module: 3,
    title: 'CN IV Palsy Workup',
    body: '**CN IV Palsy Workup:**\n\n**History:**\n• Recent head trauma? (even minor)\n• Old photos showing head tilt? (suggests congenital)\n• Vascular risk factors?\n\n**When to Image:**\n\n| Scenario | Imaging |\n|----------|--------|\n| Trauma history | CT head |\n| Age >50 + vascular RF + isolated | Can observe, image if no improvement 2-3 months |\n| Age <50 OR no vascular RF | MRI with contrast |\n| Progressive or bilateral | MRI with contrast |\n| Other neurological findings | MRI with contrast |\n\n**Labs:**\n• ESR/CRP if age >50 (GCA screen)\n• Glucose, HbA1c if suspected microvascular\n\n**Bilateral CN IV Palsy Features:**\n• Alternating hypertropia (switches with gaze)\n• Positive Bielschowsky to BOTH shoulders\n• Large V-pattern esotropia\n• Common after trauma (contrecoup injury)\n\n*Basis: imaging thresholds by age and vascular risk follow the population-based etiology data in Dosunmu 2018 (PMID 29102606) and the trochlear nerve palsy review (PMID 33351409); the ESR and CRP screen over age 50 is supported by Kermani 2012 (PMID 22119103).* [14][16][43]',
    citation: [14, 16, 43],
    next: 'diplopia-cn4-disposition',
  
    summary: 'CN IV Palsy Workup — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn4-disposition',
    type: 'info',
    module: 3,
    title: 'CN IV Palsy Disposition',
    body: '**CN IV Palsy Disposition:**\n\n**Can Discharge with Outpatient Follow-up:**\n• Isolated CN IV palsy\n• Clear trauma history OR age >50 with vascular RF\n• No other neurological findings\n• Reliable follow-up\n\n**Follow-up:**\n• Ophthalmology/neuro-ophthalmology 1-2 weeks\n• If no improvement by 3 months: MRI\n\n**Admit/Emergent Workup if:**\n• Progressive symptoms\n• Bilateral involvement (unless clearly traumatic)\n• Other CN involvement\n• Papilledema\n• Associated neurological findings\n\n**Symptomatic Treatment:**\n• Prism glasses (ophthalmology prescribes)\n• Patching one eye for temporary relief\n• Botulinum toxin (specialist)\n• Surgery if persistent (>6-12 months)\n\n**Prognosis:**\n• Traumatic: Often improves over 6-12 months\n• Microvascular: Usually resolves 2-3 months\n\n*Basis: the recovery timelines are from the natural history follow-up in Rush and Younge 1981 (PMID 7458744) and Dosunmu 2018 (PMID 29102606); prism, occlusion and botulinum toxin options for symptomatic relief are reviewed in Kedar 2025 (PMID 40179409).* [3][5][14]',
    citation: [3, 5, 14],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'CN IV Palsy Disposition — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 4: CN VI PALSY
  // =====================================================================

  {
    id: 'diplopia-cn6-start',
    type: 'info',
    module: 4,
    title: 'CN VI Palsy Overview',
    body: '**CN VI (Abducens) - Lateral Rectus Muscle**\n\n**Function:**\n• Abduction ONLY (looking outward)\n\n**Clinical Presentation:**\n• **Horizontal diplopia** (worse at distance)\n• **Esotropia** - affected eye turned IN\n• Cannot abduct affected eye past midline\n• **Face turn toward affected side** (to minimize diplopia)\n\n**Unique Feature - False Localizing Sign:**\n• CN VI has the **longest intracranial course**\n• Tethered at Dorello\'s canal (petrous apex)\n• **Stretched by downward brainstem displacement**\n• Can be "false localizing sign" of elevated ICP\n\n**⚠️ Always check for papilledema in isolated CN VI palsy!**\n\n**Common Causes:**\n1. Microvascular (most common in adults)\n2. **Elevated ICP** (check fundoscopy!)\n3. Trauma\n4. Tumor\n5. Infection/inflammation\n\n*Basis: the long intracranial course, the tethering at the petrous apex and the false localizing sign mechanism are described in the abducens nerve palsy review (PMID 29489275); the association between sixth nerve palsy and raised intracranial pressure is documented in Wall and George 1991, a prospective study of 50 patients with idiopathic intracranial hypertension (PMID 1998880); etiologic frequencies from Patel 2004 (PMID 15019392).* [17][19][21]',
    citation: [17, 19, 21],
    next: 'diplopia-cn6-workup',
  
    summary: 'CN VI Palsy Overview — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn6-workup',
    type: 'info',
    module: 4,
    title: 'CN VI Palsy Workup',
    body: '**CN VI Palsy Workup:**\n\n**Critical Step - Fundoscopy:**\n• **Papilledema?** → Emergent imaging for elevated ICP\n• CN VI as false localizing sign in ~33% of IIH patients\n\n**Imaging Based on Risk:**\n\n| Patient | Recommendation |\n|---------|---------------|\n| Age >50, vascular RF, isolated, no papilledema | Can observe; image if no improvement 2-3 months |\n| Age <50 | MRI with contrast |\n| No vascular risk factors | MRI with contrast |\n| **ALL children** | **Emergent MRI** (higher malignancy risk) |\n| Papilledema present | **Emergent CT/MRI** |\n| Other CN involvement | MRI with contrast |\n| Progressive or bilateral | MRI with contrast |\n\n**Labs:**\n• **ESR/CRP if age >50** (GCA screen)\n• Glucose, HbA1c\n• LP (if papilledema to measure opening pressure)\n\n*Basis: imaging thresholds by age and risk follow Patel 2004, a population-based study of sixth nerve palsy (PMID 15019392), and Chi and Bhatti 2009 (PMID 19696672); the intracranial hypertension association and the opening pressure criteria are from Wall and George 1991 (PMID 1998880) and the revised pseudotumor cerebri diagnostic criteria (PMID 23966248); ESR and CRP screening from Kermani 2012 (PMID 22119103). NOTE: the ~33% false localizing sign rate quoted above exceeds the roughly 10-20% reported in reference 21; verify before relying on it.* [17][18][20][21][43]',
    citation: [17, 18, 20, 21, 43],
    next: 'diplopia-cn6-disposition',
  
    summary: 'CN VI Palsy Workup — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn6-disposition',
    type: 'question',
    module: 4,
    title: 'CN VI Palsy Findings',
    body: '**What did evaluation reveal?**\n\n*Basis: the branch points follow the imaging and workup thresholds in Patel 2004 (PMID 15019392), Chi and Bhatti 2009 (PMID 19696672) and the revised pseudotumor cerebri diagnostic criteria (PMID 23966248).* [17][18][20]',
    citation: [17, 18, 20],
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
  
    summary: 'CN VI Palsy Findings — assess clinical status to guide next management decision',
  },

  {
    id: 'diplopia-cn6-icp',
    type: 'info',
    module: 4,
    title: 'CN VI + Elevated ICP',
    body: '**⚠️ CN VI Palsy with Elevated ICP ⚠️**\n\n**CN VI is a FALSE LOCALIZING SIGN:**\n• Does NOT indicate where the lesion is\n• Indicates elevated ICP from any cause\n\n**Emergent Workup:**\n1. **CT Head** - mass, hydrocephalus, hemorrhage\n2. **MRV** if CT negative - venous sinus thrombosis\n3. **LP with opening pressure** (after imaging) - IIH\n\n**Common Causes:**\n• Brain tumor\n• Hydrocephalus\n• Idiopathic intracranial hypertension (IIH)\n• Cerebral venous thrombosis\n• Post-LP (low pressure can also cause!)\n\n**IIH (Pseudotumor Cerebri):**\n• Typically young, obese females\n• Headache, pulsatile tinnitus, transient visual obscurations\n• Opening pressure >25 cm H2O\n• Treatment: Acetazolamide, weight loss, +/- shunt\n\n**Disposition:** Admit for workup and management\n\n*Basis: the opening pressure threshold above 25 cm H2O and the diagnostic framework for pseudotumor cerebri are from the revised diagnostic criteria of Friedman, Liu and Digre 2013 (PMID 23966248); the clinical profile and the acetazolamide plus weight loss approach are from Wall and George 1991 (PMID 1998880) and the Idiopathic Intracranial Hypertension Treatment Trial baseline profile (PMID 24756302); the cerebral venous thrombosis pathway follows the American Heart Association scientific statement (PMID 38284265).* [20][21][22][33]',
    citation: [20, 21, 22, 33],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'CN VI + Elevated ICP — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn6-peds',
    type: 'info',
    module: 4,
    title: 'Pediatric CN VI Palsy',
    body: '**⚠️ ALL Children with CN VI Palsy Need Emergent Imaging ⚠️**\n\n**Why Children Are Different:**\n• Higher prevalence of intracranial pathology\n• Posterior fossa tumors more common\n• Cannot rely on "microvascular" diagnosis\n\n**Common Pediatric Causes:**\n• **Brain tumor** (especially posterior fossa)\n• Elevated ICP\n• Infection (meningitis, mastoiditis - Gradenigo syndrome)\n• Trauma\n• Post-viral inflammation\n\n**Gradenigo Syndrome:**\n• Otitis media → petrous apicitis\n• Triad: CN VI palsy + V1 pain + ear infection\n• Emergent ENT consultation\n\n**Workup:**\n• MRI with contrast (preferred)\n• CT if MRI not available\n• Consider LP if infectious concern\n\n**Disposition:**\n• Admit for workup\n• Pediatric neurology/neurosurgery consult\n• Ophthalmology consultation\n\n*Basis: the higher prevalence of intracranial pathology in children with sixth nerve palsy is from the population-based data in Patel 2004 (PMID 15019392) and the abducens nerve palsy review (PMID 29489275); the Gradenigo triad, its otologic source and the emergent ENT pathway are from the 2025 pediatric scoping review (PMID 40941679).* [17][19][23]',
    citation: [17, 19, 23],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Pediatric CN VI Palsy — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn6-microvascular',
    type: 'info',
    module: 4,
    title: 'Microvascular CN VI Palsy',
    body: '**Likely Microvascular CN VI Palsy:**\n\n**Criteria:**\n✅ Age >50\n✅ Vascular risk factors (DM, HTN)\n✅ Isolated CN VI (no other CN involvement)\n✅ No papilledema\n✅ No other neurological findings\n\n**Natural History:**\n• Spontaneous improvement: 2-3 months\n• Full recovery expected in most cases\n• If no improvement by 3 months: MRI\n\n**Discharge with:**\n• Ophthalmology follow-up 2-4 weeks\n• Strict return precautions\n• DM/HTN optimization\n\n**Return Precautions:**\n⚠️ New headache\n⚠️ Vision changes\n⚠️ Other CN involvement\n⚠️ No improvement by 2-3 months\n⚠️ Symptoms progress\n\n**Symptomatic Treatment:**\n• Prism glasses\n• Patching affected eye for relief\n• Head turn toward affected side\n\n*Basis: the microvascular criteria and the 2-3 month recovery expectation are from Patel 2004 (PMID 15019392), Chi and Bhatti 2009 (PMID 19696672) and Rush and Younge 1981 (PMID 7458744); prism and occlusion options are reviewed in Kedar 2025 (PMID 40179409).* [3][5][17][18]',
    citation: [3, 5, 17, 18],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Microvascular CN VI Palsy — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cn6-pathology',
    type: 'info',
    module: 4,
    title: 'CN VI - Pathology Found',
    body: '**CN VI Palsy - Pathology Identified:**\n\n**Mass/Tumor:**\n• Nasopharyngeal carcinoma (invades skull base)\n• Chordoma, meningioma\n• Metastasis\n• Neurosurgery/neuro-oncology consult\n\n**Stroke:**\n• Pontine infarct\n• Usually has other findings (facial weakness, ataxia)\n• Stroke workup protocol\n\n**Cerebral Venous Thrombosis:**\n• Headache, papilledema, CN VI\n• MRV confirms diagnosis\n• Anticoagulation\n\n**Inflammatory:**\n• Sarcoidosis\n• Tolosa-Hunt\n• May respond to steroids\n\n**Infectious:**\n• Mastoiditis → Gradenigo syndrome\n• Skull base osteomyelitis\n• Meningitis\n• Lyme disease (endemic areas)\n\n**Disposition:** Based on pathology - most require admission\n\n*Basis: the skull base, pontine, infectious and inflammatory causes listed are the differential established in Patel 2004 (PMID 15019392) and the abducens nerve palsy review (PMID 29489275); Gradenigo syndrome from the 2025 pediatric scoping review (PMID 40941679); the cerebral venous thrombosis anticoagulation recommendation follows the American Heart Association scientific statement (PMID 38284265).* [17][19][23][33]',
    citation: [17, 19, 23, 33],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'CN VI - Pathology Found — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 5: INO & BRAINSTEM / SPECIAL SCENARIOS
  // =====================================================================

  {
    id: 'diplopia-ino',
    type: 'info',
    module: 5,
    title: 'Internuclear Ophthalmoplegia (INO)',
    body: '**INO - Medial Longitudinal Fasciculus Lesion**\n\n**Anatomy:**\n• MLF connects CN VI nucleus to contralateral CN III nucleus\n• Coordinates conjugate horizontal gaze\n\n**Clinical Findings:**\n• **Impaired ADDUCTION** of ipsilateral eye\n• **Nystagmus of ABDUCTING** (contralateral) eye\n• Convergence usually preserved (different pathway)\n• Name INO by side with impaired adduction\n\n**Example - Left INO:**\n• Looking RIGHT: Left eye cannot adduct, right eye has nystagmus\n• Convergence: Both eyes can adduct\n\n**Etiology by Age:**\n\n| Age | Most Likely Cause | Laterality |\n|-----|-------------------|------------|\n| Young | **Multiple Sclerosis** | Often bilateral |\n| Older | **Stroke** | Usually unilateral |\n\n**Stats:**\n• ~33% MS, ~33% stroke\n• INO present in ~23% of MS patients\n• Most common ocular movement abnormality in MS\n\n*Basis: the roughly one-third multiple sclerosis and one-third stroke split is from Keane 2005, a series of 410 patients with internuclear ophthalmoplegia in which infarction accounted for 38% and multiple sclerosis 34% (PMID 15883257). NOTE: the ~23% prevalence in multiple sclerosis lies between the published values of 16% (Kraker 2024, population-based, PMID 38457238) and 34% (Muri and Meienberg 1985, PMID 4026628) and is not traceable to a single source.* [24][25][26][27]',
    citation: [24, 25, 26, 27],
    next: 'diplopia-ino-workup',
  
    summary: 'Internuclear Ophthalmoplegia (INO) — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-ino-workup',
    type: 'info',
    module: 5,
    title: 'INO Workup & Disposition',
    body: '**INO Workup:**\n\n**Imaging:**\n• **MRI with DWI** is gold standard\n• Proton density sequences best for MLF lesions\n• Fine overlapping cuts (lesions can be small)\n• CT often misses posterior fossa lesions\n\n**CT/CTA Sensitivity for Posterior Stroke:** Only **10-41%**\n\n**Differentiating MS vs Stroke:**\n\n| Feature | MS | Stroke |\n|---------|-----|--------|\n| Age | Young | Older |\n| Bilateral | Common | Rare |\n| Onset | Variable | Acute |\n| Other demyelination | Present | Absent |\n\n**If Stroke Suspected:**\n• Full stroke workup\n• May benefit from thrombolysis if within window\n• Neurology admission\n\n**If MS Suspected:**\n• Full MRI brain and spine\n• Neurology referral\n• Consider LP for oligoclonal bands\n\n**Prognosis:**\n• ~50% resolve within 1 year\n• MS/inflammatory: Better recovery\n• Stroke: Less favorable\n\n*Basis: the superiority of MRI over CT is from Chalela 2007, a prospective head-to-head comparison in suspected acute stroke reporting CT sensitivity 26% versus MRI 83% (PMID 17258669); posterior circulation misdiagnosis rates are from the meta-analysis of Tarnutzer 2017 (PMID 28356464); recovery data from Keane 2005 (PMID 15883257) and Kraker 2024 (PMID 38457238).* [24][26][28][29]',
    citation: [24, 26, 28, 29],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'INO Workup & Disposition — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-multiple',
    type: 'info',
    module: 5,
    title: 'Multiple Cranial Nerve Palsies',
    body: '**⚠️ Multiple CN Palsies = Localize the Lesion ⚠️**\n\n**Cavernous Sinus Syndrome:**\n• CN III, IV, V1, V2, VI pass through\n• +/- Horner syndrome (sympathetics)\n• Causes:\n  - **Thrombosis** (septic or aseptic)\n  - Carotid-cavernous fistula\n  - Tumor (meningioma, pituitary)\n  - Tolosa-Hunt (inflammatory)\n\n**Orbital Apex Syndrome:**\n• Cavernous sinus nerves PLUS **CN II (optic nerve)**\n• Vision loss differentiates from cavernous sinus\n• Causes: Infection, tumor, inflammation\n\n**Superior Orbital Fissure Syndrome:**\n• CN III, IV, V1, VI\n• NO vision loss (CN II spared)\n• Similar to cavernous sinus but more anterior\n\n**Workup:**\n• MRI/MRA with attention to cavernous sinus\n• CTV/MRV if thrombosis suspected\n• ESR/CRP\n• Consider LP\n\n**Disposition:** Admit for workup\n\n*Basis: the cavernous sinus, orbital apex and superior orbital fissure syndromes and the features that separate them are defined in Bhatti 2007 (PMID 17577868) and Ertilav 2024 (PMID 39145318); septic cavernous sinus thrombosis from Ebright 2001 (PMID 11732931); venous thrombosis imaging and management from the American Heart Association scientific statement (PMID 38284265).* [30][31][33][35]',
    citation: [30, 31, 33, 35],
    calculatorLinks: [
      { id: 'diplopia-localize', label: 'Localize Lesion' },
    ],
    next: 'diplopia-cavernous',
  
    summary: 'Multiple Cranial Nerve Palsies — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-cavernous',
    type: 'info',
    module: 5,
    title: 'Cavernous Sinus Thrombosis',
    body: '**Cavernous Sinus Thrombosis - Can\'t Miss!**\n\n**Clinical Presentation:**\n• **Fever** (50-90%)\n• **Headache** (50-90%)\n• Periorbital swelling, chemosis\n• Proptosis\n• Multiple CN palsies (III, IV, V1, V2, VI)\n• May have Horner syndrome\n• Can become bilateral (intercavernous sinuses)\n\n**Causes:**\n• **Septic:** Sinusitis, orbital cellulitis, dental infection\n• **Aseptic:** Hypercoagulable state, OCP, pregnancy, malignancy\n\n**Workup:**\n• CT venography (specific but insensitive)\n• MR venography if CTV negative\n• Blood cultures\n• Source identification (sinus CT, dental evaluation)\n\n**Treatment:**\n• Broad-spectrum antibiotics if septic\n• Anticoagulation (controversial but often used)\n• Source control (drain abscess, treat sinusitis)\n\n**Mortality:** 20-30% even with treatment\n\n*Basis: the clinical features, the 20-30% mortality figure, the empiric antibiotic selection and the 4-6 week duration are from Ebright 2001, a review of septic thrombosis of the cavernous sinuses in the antibiotic era (PMID 11732931), supplemented by the cavernous sinus thrombosis review (PMID 28846357); the anticoagulation recommendation and the acknowledged uncertainty around it follow the American Heart Association cerebral venous thrombosis scientific statement (PMID 38284265).* [31][32][33]',
    citation: [31, 32, 33],
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
  
    summary: 'Cavernous Sinus Thrombosis — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-mg',
    type: 'info',
    module: 5,
    title: 'Myasthenia Gravis',
    body: '**Myasthenia Gravis - Fluctuating Diplopia:**\n\n**Key Features:**\n• **Fluctuating** ptosis and diplopia\n• **Fatigable** weakness (worse with sustained use)\n• **Worse in evening** or with fatigue\n• >50% present with isolated ocular symptoms initially\n\n**Bedside Tests:**\n\n**Ice Pack Test:**\n1. Apply ice pack to closed eyelid for 2-5 minutes\n2. Positive: Ptosis improves ≥2mm\n3. **Sensitivity ~77%, Specificity ~98%** (no false-positives in myasthenic-diplopia study); sensitivity drops in complete or very mild ptosis — a negative test does NOT exclude MG\n4. Cold inhibits acetylcholinesterase\n\n**Sustained Upgaze Test:**\n• Have patient look up for 60 seconds\n• Positive: Ptosis worsens or develops\n\n**Confirmatory Testing:**\n• AChR antibodies: 50-70% sensitive in ocular MG\n• Single fiber EMG: ~95% sensitive\n• Anti-MuSK antibodies if AChR negative\n\n**⚠️ Red Flag - Myasthenic Crisis:**\n• Respiratory weakness (FVC <1L or <15 mL/kg)\n• Bulbar symptoms (dysphagia, dysarthria)\n• Requires ICU admission\n\n*Basis: the ice pack test protocol and the 2 mm improvement threshold are from Golnik 1999 (PMID 10406606); the quoted sensitivity of about 77% and specificity of about 98%, and the reduced yield in complete or very mild ptosis, are from Chatzistefanou 2009 (PMID 19744729). NOTE: that study reported a specificity of 98.3%, which corresponds to approximately one false positive rather than none. Single-fiber EMG performance is from Giannoccaro 2020 (PMID 32788239). The myasthenic crisis definition and the intensive care admission threshold follow the International Consensus Guidance for Management of Myasthenia Gravis, 2020 update (PMID 33144515).* [36][37][38][39]',
    citation: [36, 37, 38, 39],
    next: 'diplopia-mg-disposition',
  
    summary: 'Myasthenia Gravis — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-mg-disposition',
    type: 'info',
    module: 5,
    title: 'MG Disposition',
    body: '**Myasthenia Gravis Disposition:**\n\n**Admit if ANY of:**\n• Respiratory symptoms (SOB, weak cough)\n• FVC <1L or declining\n• Bulbar symptoms (dysphagia, voice changes)\n• New diagnosis with moderate-severe symptoms\n• Unable to maintain nutrition/hydration\n\n**Discharge if:**\n• Isolated mild ocular symptoms\n• No respiratory/bulbar involvement\n• Reliable neurology follow-up within days\n\n**Avoid These Medications in MG:**\n• Aminoglycosides\n• Fluoroquinolones\n• Beta-blockers\n• Magnesium\n• Botulinum toxin\n• Many others - check before prescribing!\n\n**Outpatient Follow-up:**\n• Neurology referral (urgent)\n• AChR antibody testing\n• CT chest (thymoma screen)\n• Ophthalmology for symptom management\n\n**Treatment:** Pyridostigmine, steroids (specialist decision)\n\n*Basis: the admission and discharge criteria, the list of drugs to avoid, and the pyridostigmine and corticosteroid approach all follow the International Consensus Guidance for Management of Myasthenia Gravis, 2020 update (PMID 33144515), supplemented by the myasthenia gravis review (PMID 32644757).* [39][40]',
    citation: [39, 40],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'MG Disposition — review key clinical information before proceeding',
  },

  // =====================================================================
  // MODULE 6: RED FLAGS, GCA, & DISPOSITION
  // =====================================================================

  {
    id: 'diplopia-red-flags',
    type: 'info',
    module: 6,
    title: 'Diplopia Red Flags',
    body: '**⚠️ EMERGENT Red Flags in Diplopia ⚠️**\n\n| Finding | Concern |\n|---------|--------|\n| **Pupil involvement + CN III** | PCommA aneurysm |\n| **Pain + CN III palsy** | Aneurysm, cavernous sinus |\n| **Thunderclap headache** | SAH |\n| **Progressive symptoms** | Compressive lesion |\n| **Multiple CN palsies** | Cavernous sinus, orbital apex |\n| **Proptosis** | Mass, CST, CCF |\n| **Papilledema** | Elevated ICP |\n| **Associated neuro deficits** | Brainstem stroke |\n| **V1/V2 sensory loss** | Cavernous sinus |\n| **Fever + eye findings** | Septic CST |\n| **Child with CN VI palsy** | Tumor until proven otherwise |\n\n**"Dangerous Ds" of Posterior Stroke:**\n• **D**iplopia\n• **D**ysarthria\n• **D**ysphagia\n• **D**ysmetria\n• **D**ystaxia\n\n**Posterior strokes missed 2-3x more often than anterior!**\n\n*Basis: the posterior circulation miss rate is from Tarnutzer 2017, a meta-analysis of emergency department misdiagnosis of cerebrovascular events (PMID 28356464); the multiple cranial nerve, proptosis and fever red flags are from Bhatti 2007 (PMID 17577868) and Ebright 2001 (PMID 11732931); the ocular motor palsy case mix is from Rush and Younge 1981 (PMID 7458744) and De Lott 2017 (PMID 29075739).* [1][3][29][30][31]',
    citation: [1, 3, 29, 30, 31],
    next: 'diplopia-gca',
  
    summary: 'Diplopia Red Flags — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-gca',
    type: 'info',
    module: 6,
    title: 'Giant Cell Arteritis Screen',
    body: '**GCA Screen - ALL Patients >50 with New Diplopia**\n\n**Why It Matters:**\n• Can cause permanent vision loss (AAION)\n• Diplopia is a presenting feature (LR+ 3.4)\n• Treatable if caught early\n\n**Clinical Features:**\n• Age >50 (mean age 70)\n• New headache (often temporal)\n• Scalp tenderness\n• Jaw claudication (highly specific)\n• Polymyalgia rheumatica symptoms\n• Constitutional symptoms (fever, weight loss)\n\n**Labs:**\n• **ESR:** Typically >50 (often >100)\n• **CRP:** Sensitivity 98.6%, Specificity 75.7%\n• **Both normal:** Only 4% of GCA patients\n\n**⚠️ Normal ESR/CRP does NOT exclude GCA**\n\n**If GCA Suspected with Vision Threatened:**\n• **Start steroids BEFORE biopsy**\n• IV Methylprednisolone 500-1000mg daily x 3 days\n• OR Prednisone 1mg/kg/day if IV unavailable\n• Urgent temporal artery biopsy (within 2 weeks)\n• Ophthalmology consult\n\n*Basis: the diplopia likelihood ratio of 3.4 and the other bedside features are from the Rational Clinical Examination review of Smetana and Shmerling (PMID 11754714). Inflammatory marker performance is from Hayreh 1997 (CRP sensitivity 100%, ESR sensitivity 92%, combined specificity 97%, PMID 9063237), Kermani 2012 (PMID 22119103) and Walvick 2011 (PMID 21232803); the statement that both markers are normal in only 4% corresponds to 7 of 177 biopsy-proven cases in Kermani 2012. The steroid dose, the instruction to treat before biopsy and the two-week biopsy window follow the 2021 American College of Rheumatology and Vasculitis Foundation guideline (PMID 34235884), with classification criteria from the 2022 ACR and EULAR criteria (PMID 36351706) and the risk of visual deterioration despite high-dose corticosteroids documented in Hayreh 2003 (PMID 12799248). NOTE: the CRP sensitivity of 98.6% and specificity of 75.7% quoted above are not reproduced in any of these sources; verify before relying on them.* [41][42][43][44][45][46][47]',
    citation: [41, 42, 43, 44, 45, 46, 47],
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
  
    summary: 'Giant Cell Arteritis Screen — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-disposition',
    type: 'question',
    module: 6,
    title: 'Final Disposition',
    body: '**Based on evaluation, what is the disposition?**\n\n*Basis: the disposition branch points reflect the risk categories in the cited references; the rationale for a low threshold to admit or image is the posterior circulation miss rate reported in Tarnutzer 2017 (PMID 28356464).* [1][3][29]',
    citation: [1, 3, 29],
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
  
    summary: 'CN III with pupil involvement: emergent CTA; isolated CN IV or VI: outpatient MRI and neuro follow-up',
  },

  {
    id: 'diplopia-dispo-admit',
    type: 'info',
    module: 6,
    title: 'Admit for Diplopia',
    body: '**Admission Indications:**\n\n**Definite Admit:**\n• Aneurysm identified\n• Acute stroke\n• Cavernous sinus thrombosis\n• Intracranial mass\n• MG with respiratory/bulbar symptoms\n• GCA with threatened vision\n• Multiple CN palsies with unknown etiology\n• Elevated ICP\n\n**Consider Admit:**\n• Unable to ensure close follow-up\n• Progressing symptoms\n• Uncertain diagnosis with high concern\n• New MG diagnosis\n• Suspected Wernicke encephalopathy\n\n**Consultations:**\n• Neurology (most cases)\n• Neurosurgery (aneurysm, mass)\n• Ophthalmology\n• Infectious disease (if infection suspected)\n\n**Documentation:**\n• Detailed neuro exam\n• Pupil assessment\n• Fundoscopy findings\n• Imaging results\n• Consultations obtained\n\n*Basis: the myasthenia gravis admission triggers follow the International Consensus Guidance for Management of Myasthenia Gravis, 2020 update (PMID 33144515); the giant cell arteritis with threatened vision trigger follows the 2021 American College of Rheumatology and Vasculitis Foundation guideline (PMID 34235884); the Wernicke encephalopathy consideration follows the EFNS guideline (PMID 20642790); the low admission threshold for uncertain diagnoses is supported by the missed-stroke meta-analysis of Tarnutzer 2017 (PMID 28356464).* [1][29][39][45][48]',
    citation: [1, 29, 39, 45, 48],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Admit for Diplopia — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-dispo-mono',
    type: 'info',
    module: 6,
    title: 'Discharge - Monocular',
    body: '**Discharge for Monocular Diplopia:**\n\n**This is NOT a neurologic emergency.**\n\n**Outpatient Referral:**\n• Ophthalmology (routine, within 1-2 weeks)\n• Optometry for refraction if suspected\n\n**Common Causes:**\n• Refractive error (most common)\n• Dry eye\n• Cataract\n• Corneal irregularity\n\n**Patient Instructions:**\n• Artificial tears for dry eye\n• Follow up with ophthalmologist\n• Return if: develops into binocular diplopia, new neurological symptoms\n\n**Documentation:**\n• Confirmed monocular (persists with one eye covered)\n• Improved with pinhole (if refractive)\n• Normal neurological exam\n• Appropriate follow-up arranged\n\n*Basis: the non-emergent classification of monocular diplopia and the referral timeframe are supported by the eye casualty outcome series of Comer 2007 (PMID 16732215) and the diplopia review (PMID 28722934); symptomatic measures from Kedar 2025 (PMID 40179409).* [2][4][5]',
    citation: [2, 4, 5],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Discharge - Monocular — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-dispo-micro',
    type: 'info',
    module: 6,
    title: 'Discharge - Microvascular',
    body: '**Discharge for Likely Microvascular Palsy:**\n\n**Criteria Met:**\n✅ Age >50\n✅ Vascular risk factors (DM, HTN)\n✅ Isolated single CN palsy\n✅ Pupil-sparing (if CN III)\n✅ No papilledema\n✅ Negative imaging (CTA for CN III)\n✅ No other neurological findings\n\n**Follow-up:**\n• Ophthalmology/neuro-ophthalmology: 1-2 weeks\n• PCP for diabetes/HTN optimization\n\n**Return Precautions:**\n⚠️ Pupil becomes involved\n⚠️ Symptoms progress or spread\n⚠️ New headache\n⚠️ No improvement by 2-3 months\n⚠️ Any new neurological symptoms\n\n**Expected Course:**\n• Improvement: 2-3 months\n• If no improvement by 3 months: MRI\n\n**Documentation:**\n• "Diagnosis of exclusion after appropriate workup"\n• Return precautions given\n• Follow-up arranged\n\n*Basis: the microvascular discharge criteria and the 2-3 month improvement expectation are from the natural history data in Rush and Younge 1981 (PMID 7458744), Fang 2017 (PMID 27893002) and Patel 2004 (PMID 15019392); the pupil return precaution rests on Jacobson 1998 (PMID 9639439).* [3][6][7][17]',
    citation: [3, 6, 7, 17],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Discharge - Microvascular — review key clinical information before proceeding',
  },

  {
    id: 'diplopia-dispo-followup',
    type: 'info',
    module: 6,
    title: 'Discharge - Close Follow-up',
    body: '**Discharge with Urgent Outpatient Follow-up:**\n\n**Appropriate for:**\n• Stable isolated CN palsy needing further workup\n• Negative emergent imaging but not classic microvascular\n• Suspected MG without crisis features\n• Mild symptoms, reliable patient\n\n**Arrange:**\n• Neurology appointment within 1 week\n• Ophthalmology/neuro-ophthalmology\n• MRI if not done emergently\n\n**Labs to Order:**\n• ESR/CRP (if age >50)\n• Glucose, HbA1c\n• AChR antibodies (if MG suspected)\n• TSH\n\n**Clear Return Precautions:**\n⚠️ Worsening diplopia\n⚠️ New headache\n⚠️ Vision changes\n⚠️ Weakness or numbness\n⚠️ Difficulty breathing or swallowing\n⚠️ Pupil changes\n\n**Document:**\n• Stable exam\n• Shared decision-making\n• Specific follow-up plan\n• Return precautions reviewed\n\n*Basis: the outpatient laboratory panel and follow-up intervals reflect the giant cell arteritis screening data of Kermani 2012 (PMID 22119103) and the myasthenia gravis workup in the International Consensus Guidance 2020 update (PMID 33144515); symptomatic management options from Kedar 2025 (PMID 40179409).* [1][5][39][43]',
    citation: [1, 5, 39, 43],
    options: [
      {
        label: 'Complete - Return to Start',
        next: 'diplopia-start',
      },
    ],
  
    summary: 'Discharge - Close Follow-up — review key clinical information before proceeding',
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

// Reference list rebuilt 2026-07-30 (FDA CDS Prong-4 audit).
// Prior list was 15 entries, 100% tertiary (StatPearls / EyeWiki / blog / CME summary)
// and carried ZERO machine identifiers. Replaced with primary literature and the
// actual guidelines the tree recites. Every entry now carries a PMID. All 48 PMIDs
// were verified against NCBI E-utilities esummary on 2026-07-30.
export const DIPLOPIA_CITATIONS: Citation[] = [
  { num: 1, text: 'De Lott LB, Kerber KA, Lee PP, et al. Diplopia-related ambulatory and emergency department visits in the United States, 2003-2012. JAMA Ophthalmol. 2017;135(12):1339-1344. PMID 29075739.' },
  { num: 2, text: 'Comer RM, Dawson E, Plant G, et al. Causes and outcomes for patients presenting with diplopia to an eye casualty department. Eye (Lond). 2007;21(3):413-418. PMID 16732215.' },
  { num: 3, text: 'Rush JA, Younge BR. Paralysis of cranial nerves III, IV, and VI: cause and prognosis in 1,000 cases. Arch Ophthalmol. 1981;99(1):76-79. PMID 7458744.' },
  { num: 4, text: 'Najem K, Asuncion RMD, Margolin E. Diplopia. StatPearls [Internet]. Treasure Island, FL: StatPearls Publishing; 2026. PMID 28722934. [Tertiary reference work - background/orientation only, not the basis for any dose or threshold.]' },
  { num: 5, text: 'Kedar S. Symptomatic treatment of neuro-ophthalmic visual disturbances. Continuum (Minneap Minn). 2025;31(2):566-582. PMID 40179409.' },
  { num: 6, text: 'Fang C, Leavitt JA, Hodge DO, et al. Incidence and etiologies of acquired third nerve palsy using a population-based method. JAMA Ophthalmol. 2017;135(1):23-28. PMID 27893002.' },
  { num: 7, text: 'Jacobson DM. Pupil involvement in patients with diabetes-associated oculomotor nerve palsy. Arch Ophthalmol. 1998;116(6):723-727. PMID 9639439.' },
  { num: 8, text: 'Jacobson DM. Relative pupil-sparing third nerve palsy: etiology and clinical variables predictive of a mass. Neurology. 2001;56(6):797-798. PMID 11274322.' },
  { num: 9, text: 'Menke J, Larsen J, Kallenberg K. Diagnosing cerebral aneurysms by computed tomographic angiography: meta-analysis. Ann Neurol. 2011;69(4):646-654. PMID 21391230.' },
  { num: 10, text: 'Elmalem VI, Hudgins PA, Bruce BB, et al. Underdiagnosis of posterior communicating artery aneurysm in noninvasive brain vascular studies. J Neuroophthalmol. 2011;31(2):103-109. PMID 21150642.' },
  { num: 11, text: 'Thompson BG, Brown RD Jr, Amin-Hanjani S, et al. Guidelines for the management of patients with unruptured intracranial aneurysms: a guideline from the American Heart Association/American Stroke Association. Stroke. 2015;46(8):2368-2400. PMID 26089327.' },
  { num: 12, text: 'Molyneux AJ, Birks J, Clarke A, et al. Durability of endovascular coiling versus neurosurgical clipping of ruptured cerebral aneurysms: 18-year follow-up of the UK cohort of ISAT. Lancet. 2015;385(9969):691-697. PMID 25465111.' },
  { num: 13, text: 'Modi P, Singh J. Cranial nerve III palsy (oculomotor palsy). StatPearls [Internet]. Treasure Island, FL: StatPearls Publishing; 2026. PMID 30252368. [Tertiary reference work - background/orientation only.]' },
  { num: 14, text: 'Dosunmu EO, Hatt SR, Leske DA, et al. Incidence and etiology of presumed fourth cranial nerve palsy: a population-based study. Am J Ophthalmol. 2018;185:110-114. PMID 29102606.' },
  { num: 15, text: 'Kushner BJ. Errors in the three-step test in the diagnosis of vertical strabismus. Ophthalmology. 1989;96(1):127-132. PMID 2919044.' },
  { num: 16, text: 'Khanam S, Sood G. Trochlear nerve palsy. StatPearls [Internet]. Treasure Island, FL: StatPearls Publishing; 2026. PMID 33351409. [Tertiary reference work - background/orientation only.]' },
  { num: 17, text: 'Patel SV, Mutyala S, Leske DA, et al. Incidence, associations, and evaluation of sixth nerve palsy using a population-based method. Ophthalmology. 2004;111(2):369-375. PMID 15019392.' },
  { num: 18, text: 'Chi SL, Bhatti MT. The diagnostic dilemma of neuro-imaging in acute isolated sixth nerve palsy. Curr Opin Ophthalmol. 2009;20(6):423-429. PMID 19696672.' },
  { num: 19, text: 'Graham C, Gurnani B, Mohseni M. Abducens nerve palsy. StatPearls [Internet]. Treasure Island, FL: StatPearls Publishing; 2026. PMID 29489275. [Tertiary reference work - background/orientation only.]' },
  { num: 20, text: 'Friedman DI, Liu GT, Digre KB. Revised diagnostic criteria for the pseudotumor cerebri syndrome in adults and children. Neurology. 2013;81(13):1159-1165. PMID 23966248.' },
  { num: 21, text: 'Wall M, George D. Idiopathic intracranial hypertension: a prospective study of 50 patients. Brain. 1991;114(Pt 1A):155-180. PMID 1998880.' },
  { num: 22, text: 'Wall M, Kupersmith MJ, Kieburtz KD, et al. The Idiopathic Intracranial Hypertension Treatment Trial: clinical profile at baseline. JAMA Neurol. 2014;71(6):693-701. PMID 24756302.' },
  { num: 23, text: 'Schmit C, Keller F, Gottfried T, et al. The diagnosis, management, and outcomes of Gradenigo syndrome in children: a scoping review of the literature. Diagnostics (Basel). 2025;15(17):2193. PMID 40941679.' },
  { num: 24, text: 'Keane JR. Internuclear ophthalmoplegia: unusual causes in 114 of 410 patients. Arch Neurol. 2005;62(5):714-717. PMID 15883257.' },
  { num: 25, text: 'Muri RM, Meienberg O. The clinical spectrum of internuclear ophthalmoplegia in multiple sclerosis. Arch Neurol. 1985;42(9):851-855. PMID 4026628.' },
  { num: 26, text: 'Kraker JA, Xu SC, Flanagan EP, et al. Ocular manifestations of multiple sclerosis: a population-based study. J Neuroophthalmol. 2024;44(2):157-161. PMID 38457238.' },
  { num: 27, text: 'Feroze KB, Wang J. Internuclear ophthalmoplegia. StatPearls [Internet]. Treasure Island, FL: StatPearls Publishing; 2026. PMID 28722999. [Tertiary reference work - background/orientation only.]' },
  { num: 28, text: 'Chalela JA, Kidwell CS, Nentwich LM, et al. Magnetic resonance imaging and computed tomography in emergency assessment of patients with suspected acute stroke: a prospective comparison. Lancet. 2007;369(9558):293-298. PMID 17258669.' },
  { num: 29, text: 'Tarnutzer AA, Lee SH, Robinson KA, et al. ED misdiagnosis of cerebrovascular events in the era of modern neuroimaging: a meta-analysis. Neurology. 2017;88(15):1468-1477. PMID 28356464.' },
  { num: 30, text: 'Bhatti MT. Orbital syndromes. Semin Neurol. 2007;27(3):269-287. PMID 17577868.' },
  { num: 31, text: 'Ebright JR, Pace MT, Niazi AF. Septic thrombosis of the cavernous sinuses. Arch Intern Med. 2001;161(22):2671-2676. PMID 11732931.' },
  { num: 32, text: 'Plewa MC, Hall WA. Cavernous sinus thrombosis. StatPearls [Internet]. Treasure Island, FL: StatPearls Publishing; 2026. PMID 28846357. [Tertiary reference work - background/orientation only.]' },
  { num: 33, text: 'Saposnik G, Bushnell C, Coutinho JM, et al. Diagnosis and management of cerebral venous thrombosis: a scientific statement from the American Heart Association. Stroke. 2024;55(3):e77-e90. PMID 38284265.' },
  { num: 34, text: 'Cornely OA, Alastruey-Izquierdo A, Arenz D, et al. Global guideline for the diagnosis and management of mucormycosis: an initiative of the European Confederation of Medical Mycology in cooperation with the Mycoses Study Group Education and Research Consortium. Lancet Infect Dis. 2019;19(12):e405-e421. PMID 31699664.' },
  { num: 35, text: 'Ertilav E, Akyol A. Evaluation of patients with painful ophthalmoplegia for benign and secondary etiologies. Neuroophthalmology. 2024;48(5):338-347. PMID 39145318.' },
  { num: 36, text: 'Golnik KC, Pena R, Lee AG, et al. An ice test for the diagnosis of myasthenia gravis. Ophthalmology. 1999;106(7):1282-1286. PMID 10406606.' },
  { num: 37, text: 'Chatzistefanou KI, Kouris T, Iliakis E, et al. The ice pack test in the differential diagnosis of myasthenic diplopia. Ophthalmology. 2009;116(11):2236-2243. PMID 19744729.' },
  { num: 38, text: 'Giannoccaro MP, Paolucci M, Zenesini C, et al. Comparison of ice pack test and single-fiber EMG diagnostic accuracy in patients referred for myasthenic ptosis. Neurology. 2020;95(13):e1800-e1806. PMID 32788239.' },
  { num: 39, text: 'Narayanaswami P, Sanders DB, Wolfe G, et al. International consensus guidance for management of myasthenia gravis: 2020 update. Neurology. 2021;96(3):114-122. PMID 33144515.' },
  { num: 40, text: 'Beloor Suresh A, Asuncion RMD. Myasthenia gravis. StatPearls [Internet]. Treasure Island, FL: StatPearls Publishing; 2026. PMID 32644757. [Tertiary reference work - background/orientation only.]' },
  { num: 41, text: 'Smetana GW, Shmerling RH. Does this patient have temporal arteritis? JAMA. 2002;287(1):92-101. PMID 11754714.' },
  { num: 42, text: 'Hayreh SS, Podhajsky PA, Raman R, et al. Giant cell arteritis: validity and reliability of various diagnostic criteria. Am J Ophthalmol. 1997;123(3):285-296. PMID 9063237.' },
  { num: 43, text: 'Kermani TA, Schmidt J, Crowson CS, et al. Utility of erythrocyte sedimentation rate and C-reactive protein for the diagnosis of giant cell arteritis. Semin Arthritis Rheum. 2012;41(6):866-871. PMID 22119103.' },
  { num: 44, text: 'Walvick MD, Walvick MP. Giant cell arteritis: laboratory predictors of a positive temporal artery biopsy. Ophthalmology. 2011;118(6):1201-1204. PMID 21232803.' },
  { num: 45, text: 'Maz M, Chung SA, Abril A, et al. 2021 American College of Rheumatology/Vasculitis Foundation guideline for the management of giant cell arteritis and Takayasu arteritis. Arthritis Rheumatol. 2021;73(8):1349-1365. PMID 34235884.' },
  { num: 46, text: 'Ponte C, Grayson PC, Robson JC, et al. 2022 American College of Rheumatology/EULAR classification criteria for giant cell arteritis. Ann Rheum Dis. 2022;81(12):1647-1653. PMID 36351706.' },
  { num: 47, text: 'Hayreh SS, Zimmerman B. Visual deterioration in giant cell arteritis patients while on high doses of corticosteroid therapy. Ophthalmology. 2003;110(6):1204-1215. PMID 12799248.' },
  { num: 48, text: 'Galvin R, Brathen G, Ivashynka A, et al. EFNS guidelines for diagnosis, therapy and prevention of Wernicke encephalopathy. Eur J Neurol. 2010;17(12):1408-1418. PMID 20642790.' },
];
