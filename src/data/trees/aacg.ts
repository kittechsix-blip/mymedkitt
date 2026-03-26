// MedKitt — Acute Angle-Closure Glaucoma (AACG)
// Sources: OpenEvidence, EB Medicine, UpToDate, StatPearls, REBEL EM
// 5 modules: Recognition → IOP Assessment → Treatment Cascade → Precipitating Meds → Disposition
// Ophthalmology first consult

import type { DecisionNode } from '../../models/types.js';

export interface Citation {
  num: number;
  text: string;
}

export const AACG_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'aacg-start',
    type: 'info',
    module: 1,
    title: 'Acute Angle-Closure Glaucoma',
    body: '**Ophthalmologic emergency** — rapid IOP elevation causes optic nerve damage within hours.\n\n**Mechanism:** Pupillary block → aqueous outflow obstruction → IOP 50-80 mmHg\n\n**Classic Triad:**\n1. Severe unilateral eye pain\n2. Fixed mid-dilated pupil\n3. Rock-hard globe\n\n**Risk Factors:**\n- Age >50 (peak 55-65)\n- Female (2-4x higher)\n- Asian > Caucasian\n- Hyperopia (farsightedness)\n- Shallow anterior chamber\n- Precipitating medications\n\n**Pearl:** 1/3 of AACG patients initially see non-ophthalmologists. Don\'t miss it. [1][2]',
    citation: [1, 2],
    next: 'aacg-presentation',
  },

  {
    id: 'aacg-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Does the patient have features suggestive of AACG?**\n\n**Symptoms:**\n- Sudden severe unilateral eye pain\n- Headache (may mimic migraine)\n- Blurred vision / decreased acuity\n- **Halos around lights** (pathognomonic)\n- Nausea and vomiting (prominent — may mimic GI illness)\n\n**Exam Findings:**\n- **Fixed mid-dilated pupil** (4-6mm, non-reactive)\n- Red eye with ciliary flush\n- **Corneal edema** (hazy/cloudy)\n- "Rock hard" globe on palpation\n- Shallow anterior chamber\n- Diminished red reflex\n\n**Key Differentiator:** Mid-dilated FIXED pupil + hard globe = AACG until proven otherwise.',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Classic AACG Presentation',
        description: 'Fixed pupil, hard globe, pain, halos',
        next: 'aacg-iop-assess',
      },
      {
        label: 'Atypical / Uncertain',
        description: 'Some features but not classic',
        next: 'aacg-differential',
      },
      {
        label: 'Bilateral Symptoms',
        description: 'Consider drug-induced (topiramate)',
        next: 'aacg-bilateral',
        urgency: 'critical',
      },
    ],
  },

  {
    id: 'aacg-differential',
    type: 'info',
    module: 1,
    title: 'Differential Diagnosis',
    body: '**AACG Mimics — Rule Out:**\n\n| Condition | Key Distinguishing Features |\n|-----------|----------------------------|\n| **Migraine** | Mobile pain, normal pupils, normal IOP |\n| **Cluster headache** | Lacrimation, rhinorrhea, Horner syndrome |\n| **Intracranial pathology** | Other neuro findings, papilledema |\n| **Iritis/Uveitis** | Photophobia, cells/flare, CONSTRICTED pupil |\n| **Conjunctivitis** | Discharge, bilateral, normal pupil |\n| **Keratitis/Corneal ulcer** | Fluorescein uptake, history of contacts |\n| **Scleritis** | Deep boring pain, scleral injection |\n| **Endophthalmitis** | Recent eye surgery, hypopyon |\n| **Retrobulbar hemorrhage** | Trauma, proptosis, APD |\n\n**AACG Distinguishers:**\n- Unilateral\n- **Fixed MID-dilated pupil** (not constricted like uveitis)\n- Rock hard globe\n- Elevated IOP\n\n**Pearl:** If uncertain, palpate both globes — affected side feels significantly harder. [1][3]',
    citation: [1, 3],
    next: 'aacg-iop-assess',
  },

  // =====================================================================
  // MODULE 2: IOP ASSESSMENT
  // =====================================================================

  {
    id: 'aacg-iop-assess',
    type: 'info',
    module: 2,
    title: 'IOP Assessment',
    body: '**Intraocular Pressure Measurement:**\n\n| Status | IOP (mmHg) |\n|--------|------------|\n| Normal | 10-21 |\n| Elevated | 22-30 |\n| AACG typical | **50-80** |\n| Treatment target | <35 |\n\n**Measurement Methods:**\n\n**1. Tonometry (Gold Standard):**\n- Goldmann applanation\n- Tono-Pen\n- iCare rebound tonometer\n\n**2. Transpalpebral Palpation (No Equipment):**\n- Patient looks down\n- Palpate through upper lid\n- Compare both eyes\n- AACG feels "rock hard" vs normal soft\n\n**Can\'t Measure IOP?**\n- Rock hard globe + classic presentation = **treat empirically**\n- Don\'t delay treatment for equipment\n\n[IOP Assessment Tool](#/calculator/aacg-iop) [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'aacg-iop', label: 'IOP Assessment' },
    ],
    next: 'aacg-iop-decision',
  },

  {
    id: 'aacg-iop-decision',
    type: 'question',
    module: 2,
    title: 'IOP Result',
    body: '**What is the IOP (or clinical assessment)?**\n\nIf tonometry available, use measured value.\nIf not, use clinical palpation assessment.',
    citation: [1, 2],
    options: [
      {
        label: 'IOP ≥40 mmHg or Rock Hard',
        description: 'Begin treatment cascade immediately',
        next: 'aacg-treatment-start',
        urgency: 'critical',
      },
      {
        label: 'IOP 22-39 mmHg',
        description: 'Elevated but not crisis — close monitoring',
        next: 'aacg-subacute',
      },
      {
        label: 'IOP <22 mmHg',
        description: 'Normal — consider alternative diagnosis',
        next: 'aacg-differential',
      },
    ],
  },

  {
    id: 'aacg-subacute',
    type: 'info',
    module: 2,
    title: 'Subacute Angle Closure',
    body: '**IOP 22-39 mmHg — May be subacute or intermittent angle closure:**\n\n**Characteristics:**\n- Less severe symptoms\n- May have history of intermittent episodes\n- Symptoms resolve spontaneously then recur\n- Cornea may be clearer\n\n**Management:**\n- Start topical therapy (timolol, brimonidine)\n- Acetazolamide 250mg PO\n- **Urgent (not emergent) ophthalmology consult**\n- Monitor for progression\n\n**If IOP rises or symptoms worsen → Full treatment cascade**\n\n**Disposition:**\n- May not require admission\n- Must have ophthalmology follow-up within 24 hours\n- Laser iridotomy still indicated [1][2]',
    citation: [1, 2],
    next: 'aacg-dispo',
  },

  // =====================================================================
  // MODULE 3: TREATMENT CASCADE
  // =====================================================================

  {
    id: 'aacg-treatment-start',
    type: 'info',
    module: 3,
    title: 'Immediate Actions',
    body: '**Phase 1 — First 5 Minutes:**\n\n**1. Position Patient SUPINE:**\n- Moves lens posteriorly\n- Relieves pupil block\n- Increases anterior chamber depth\n\n**2. Bright Lights:**\n- Constricts pupil\n- May help open angle\n\n**3. Call Ophthalmology STAT:**\n- Do NOT delay treatment while awaiting consult\n- Definitive treatment is laser iridotomy\n\n**4. IV Access + Labs:**\n- BMP (for acetazolamide, mannitol)\n- Consider glucose if giving glycerol\n\n**5. Antiemetics:**\n- Ondansetron 4-8mg IV\n- Nausea is prominent — need to control for PO meds\n\n**Proceed immediately to medication cascade →** [1][2][4]',
    citation: [1, 2, 4],
    next: 'aacg-reduce-production',
  },

  {
    id: 'aacg-reduce-production',
    type: 'info',
    module: 3,
    title: 'Phase 2: Reduce Aqueous Production',
    body: '**Give ALL of these simultaneously:**\n\n| Drug | Class | Dose | Route |\n|------|-------|------|-------|\n| **Acetazolamide** | CAI | **500mg** | IV preferred (PO if no IV/not vomiting) |\n| **Timolol 0.5%** | Beta-blocker | 1 drop | Topical q15-30min × 2-3 |\n| **Brimonidine 0.15%** | Alpha-2 agonist | 1 drop | Topical q15min × 2-3 |\n\n**OR substitute Apraclonidine 0.5-1%** for brimonidine\n\n**Acetazolamide Contraindications:**\n- Sulfa allergy (use with caution — cross-reactivity rare)\n- Severe renal/hepatic disease\n- Hypokalemia\n\n**Beta-blocker Contraindications:**\n- Asthma/severe COPD\n- Bradycardia, heart block\n- Decompensated CHF\n\n**Recheck IOP in 30-60 minutes.** [1][2][4]',
    citation: [1, 2, 4],
    next: 'aacg-response-check1',
  },

  {
    id: 'aacg-response-check1',
    type: 'question',
    module: 3,
    title: 'Response Assessment',
    body: '**Recheck IOP 30-60 minutes after initial therapy.**\n\n**Target:** IOP <40 mmHg (to enable pilocarpine)\n\nWhat is the IOP response?',
    citation: [1, 2],
    options: [
      {
        label: 'IOP <40 mmHg',
        description: 'Responding — proceed to pilocarpine',
        next: 'aacg-pilocarpine',
      },
      {
        label: 'IOP Still ≥40 mmHg',
        description: 'Add osmotic agents',
        next: 'aacg-osmotic',
      },
    ],
  },

  {
    id: 'aacg-osmotic',
    type: 'info',
    module: 3,
    title: 'Phase 3: Osmotic Agents',
    body: '**IOP still elevated — add osmotic therapy:**\n\n| Drug | Dose | Route | Onset | Cautions |\n|------|------|-------|-------|----------|\n| **Mannitol 20%** | 1-2 g/kg | IV over 20-30 min | 30-60 min | CHF, renal failure |\n| **Glycerol** | 1 mL/kg | PO (mix with cold juice) | 30-60 min | Diabetes (caloric) |\n| **Isosorbide** | 1.5 g/kg | PO | 30-60 min | Less common |\n\n**Mannitol Preferred** if IV access and no contraindications.\n\n**Example:** 70kg patient → Mannitol 70-140g (350-700mL of 20%)\n\n**Mechanism:** Creates osmotic gradient pulling fluid from eye.\n\n**Cautions:**\n- Monitor urine output (Foley if large volume)\n- Check electrolytes\n- Avoid in CHF, severe dehydration\n\n**Recheck IOP in 30-60 minutes.** [1][2][4]',
    citation: [1, 2, 4],
    next: 'aacg-response-check2',
  },

  {
    id: 'aacg-response-check2',
    type: 'question',
    module: 3,
    title: 'Response to Osmotics',
    body: '**Recheck IOP after osmotic therapy.**\n\nGoal: IOP <40 mmHg for pilocarpine.',
    citation: [1, 2],
    options: [
      {
        label: 'IOP <40 mmHg',
        description: 'Proceed to pilocarpine',
        next: 'aacg-pilocarpine',
      },
      {
        label: 'IOP Still Elevated',
        description: 'Refractory — consult for paracentesis',
        next: 'aacg-refractory',
      },
    ],
  },

  {
    id: 'aacg-pilocarpine',
    type: 'info',
    module: 3,
    title: 'Phase 4: Pilocarpine',
    body: '**⚠️ TIMING CRITICAL — Wait until IOP <40 mmHg**\n\n**Why wait?**\n- Ischemic iris sphincter muscle won\'t respond at high IOP\n- Giving early is ineffective and wastes time\n\n**Pilocarpine 2% (or 4%):**\n- 1 drop to affected eye\n- Repeat in 15 minutes × 2 doses total\n\n**Mechanism:**\n- Constricts pupil (miosis)\n- Pulls iris away from trabecular meshwork\n- Opens drainage angle\n\n**Also treat FELLOW EYE:**\n- Pilocarpine 2% 1 drop × 1\n- Prophylaxis (40-80% will develop AACG)\n\n**Pilocarpine Caution:**\n- Some experts avoid if mechanism unclear\n- NOT effective for drug-induced (sulfa) angle closure\n- Can confound subsequent exam [1][2][4]',
    citation: [1, 2, 4],
    calculatorLinks: [
      { id: 'aacg-treatment', label: 'Treatment Cascade' },
    ],
    next: 'aacg-supportive',
  },

  {
    id: 'aacg-supportive',
    type: 'info',
    module: 3,
    title: 'Supportive Care',
    body: '**Ongoing Management:**\n\n**Pain Control:**\n- IV opioids as needed\n- Topical NSAID (ketorolac 0.5%) after cornea assessed\n\n**Anti-inflammatory:**\n- Prednisolone acetate 1% q1-4h\n- Reduces inflammation from IOP spike\n\n**Antiemetics:**\n- Ondansetron 4-8mg IV PRN\n\n**Monitoring:**\n- Recheck IOP every 30-60 minutes\n- Document pupil reactivity\n- Assess corneal clarity\n\n**Maintenance Therapy (After IOP Controlled):**\n- Continue timolol 0.5% BID\n- Brimonidine TID\n- Acetazolamide 250mg PO q6h\n- Until definitive laser iridotomy [1][2]',
    citation: [1, 2],
    next: 'aacg-definitive',
  },

  {
    id: 'aacg-refractory',
    type: 'info',
    module: 3,
    title: 'Refractory AACG',
    body: '**IOP remains elevated despite maximal medical therapy:**\n\n**Options (Ophthalmology Decision):**\n\n**1. Anterior Chamber Paracentesis:**\n- Immediate IOP reduction\n- Specialist procedure\n- Temporizing until laser available\n\n**2. Emergent Laser Peripheral Iridotomy:**\n- If cornea clear enough\n- May need to wait for corneal edema to resolve\n\n**3. Surgical Iridectomy:**\n- If laser not possible\n- OR availability required\n\n**4. Lens Extraction:**\n- If cataract present\n- Especially if IOP >55 mmHg\n\n**ED Role:**\n- Continue medical therapy\n- Urgent ophthalmology at bedside\n- Prepare for admission/transfer\n\n**Do NOT discharge** refractory AACG. [1][2][4]',
    citation: [1, 2, 4],
    next: 'aacg-dispo',
  },

  // =====================================================================
  // MODULE 4: PRECIPITATING MEDICATIONS
  // =====================================================================

  {
    id: 'aacg-bilateral',
    type: 'info',
    module: 4,
    title: 'Bilateral AACG — Think Drugs',
    body: '**⚠️ Bilateral angle closure is RARE naturally — suspect medication-induced:**\n\n**Topiramate (Most Common):**\n- Causes ciliary body effusion (NOT pupillary block)\n- Bilateral presentation\n- Myopic shift (up to -17 diopters)\n- Occurs 1-2 weeks after starting\n\n**Management of Topiramate-Induced:**\n1. **STOP TOPIRAMATE** (coordinate with prescriber)\n2. Cycloplegics (atropine) — OPPOSITE of standard AACG!\n3. **Iridotomy NOT effective** (different mechanism)\n4. IOP-lowering agents as usual\n\n**Other Sulfa Drugs:**\n- Acetazolamide (ironic)\n- Hydrochlorothiazide\n- TMP-SMX\n- Sulfasalazine\n\n**Key Question:** Has patient started any new medication in past 2 weeks?\n\n[Precipitating Meds Tool](#/calculator/aacg-meds) [1][5]',
    citation: [1, 5],
    calculatorLinks: [
      { id: 'aacg-meds', label: 'Precipitating Meds' },
    ],
    next: 'aacg-treatment-start',
  },

  {
    id: 'aacg-meds-list',
    type: 'info',
    module: 4,
    title: 'Medications That Precipitate AACG',
    body: '**Pupillary Block Mechanism (Cause Mydriasis):**\n\n| Class | Examples |\n|-------|----------|\n| **Anticholinergics** | Atropine, scopolamine, ipratropium, glycopyrrolate |\n| **Sympathomimetics** | Phenylephrine, ephedrine, pseudoephedrine |\n| **Antihistamines** | Diphenhydramine, promethazine, hydroxyzine |\n| **TCAs** | Amitriptyline, nortriptyline, imipramine |\n| **SSRIs/SNRIs** | Fluoxetine, paroxetine, venlafaxine |\n| **Antipsychotics** | Trifluoperazine, olanzapine |\n| **Mydriatics** | Tropicamide, cyclopentolate |\n\n**Non-Pupillary Block (Ciliary Effusion):**\n\n| Drug | Key Feature |\n|------|-------------|\n| **Topiramate** | Bilateral, myopic shift, 1-2 weeks after start |\n| **Acetazolamide** | Paradoxical (rare) |\n| **Sulfonamides** | HCTZ, TMP-SMX |\n\n**Ask about OTC medications** — antihistamines, decongestants commonly implicated. [1][5]',
    citation: [1, 5],
    next: 'aacg-dispo',
  },

  // =====================================================================
  // MODULE 5: DISPOSITION
  // =====================================================================

  {
    id: 'aacg-definitive',
    type: 'info',
    module: 5,
    title: 'Definitive Treatment',
    body: '**Laser Peripheral Iridotomy (LPI):**\n\n**Mechanism:**\n- Creates hole in peripheral iris\n- Bypasses pupillary block\n- Equalizes pressure between anterior/posterior chambers\n\n**Timing:**\n- Once cornea clears (hours to 1-2 days after IOP controlled)\n- Outpatient procedure\n- Takes minutes\n\n**Both Eyes:**\n- Treat affected eye\n- **Prophylactic LPI to fellow eye** (40-80% will develop AACG)\n\n**Alternatives:**\n- Surgical iridectomy (if laser fails)\n- Cataract extraction (if lens contributing)\n\n**Post-LPI:**\n- Continue topical steroids\n- IOP monitoring\n- Most patients cured [1][2][4]',
    citation: [1, 2, 4],
    next: 'aacg-dispo',
  },

  {
    id: 'aacg-dispo',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: '**Determine appropriate disposition:**',
    citation: [1, 2],
    options: [
      {
        label: 'IOP Controlled + Ophthalmology Available',
        description: 'Admit or arrange urgent follow-up',
        next: 'aacg-dispo-controlled',
      },
      {
        label: 'IOP Refractory or No Ophthalmology',
        description: 'Transfer to higher level of care',
        next: 'aacg-dispo-transfer',
      },
      {
        label: 'Subacute / Resolved',
        description: 'Discharge with close follow-up',
        next: 'aacg-dispo-discharge',
      },
    ],
  },

  {
    id: 'aacg-dispo-controlled',
    type: 'info',
    module: 5,
    title: 'Controlled — Admit/Urgent Follow-Up',
    body: '**IOP controlled with medical therapy:**\n\n**Admission Indications:**\n- IOP required osmotics to control\n- Significant comorbidities\n- Unreliable follow-up\n- Awaiting laser iridotomy\n\n**Observation Unit / Discharge with 24h Follow-Up:**\n- IOP well controlled on drops alone\n- Reliable patient\n- Ophthalmology available next day\n\n**Discharge Medications:**\n- Timolol 0.5% BID\n- Brimonidine TID\n- Prednisolone acetate 1% QID\n- Acetazolamide 250mg PO q6h (if tolerated)\n\n**Instructions:**\n- Avoid dim lighting (dilates pupil)\n- Avoid anticholinergics, decongestants\n- Return for: increased pain, vision loss, N/V\n- **Follow-up within 24 hours mandatory** [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'aacg-start',
      },
    ],
  },

  {
    id: 'aacg-dispo-transfer',
    type: 'info',
    module: 5,
    title: 'Transfer Required',
    body: '**No ophthalmology or refractory IOP — arrange transfer:**\n\n**Before Transfer:**\n- Continue all IOP-lowering therapy\n- Adequate IV access\n- Pain and nausea controlled\n- Clear documentation of treatments given and IOP trend\n\n**Transfer Communication:**\n- IOP at presentation and current\n- All medications given with times\n- Response to therapy\n- Suspected etiology (medication-induced?)\n\n**Mode of Transport:**\n- Ground ambulance usually sufficient\n- Keep patient supine during transport\n- Continue monitoring\n\n**Accepting Facility:**\n- Must have ophthalmology capable of laser iridotomy\n- OR availability if surgical needed [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'aacg-start',
      },
    ],
  },

  {
    id: 'aacg-dispo-discharge',
    type: 'info',
    module: 5,
    title: 'Discharge Criteria',
    body: '**May discharge if ALL criteria met:**\n\n**Clinical:**\n- IOP normalized (<21 mmHg)\n- Symptoms resolved\n- Subacute/intermittent presentation\n- Cornea clearing\n\n**Logistics:**\n- Ophthalmology follow-up confirmed within 24 hours\n- Reliable patient\n- Access to return if worsening\n- Can obtain/afford medications\n\n**Discharge Medications:**\n- Timolol 0.5% BID\n- Brimonidine 0.15% TID\n- Prednisolone 1% QID\n- ± Acetazolamide 250mg PO q6h\n\n**Strict Return Precautions:**\n- Increasing eye pain\n- Worsening vision\n- Halos returning\n- Nausea/vomiting\n- Headache\n\n**Document:** "Patient instructed on AACG recurrence risk and need for laser iridotomy." [1][2]',
    citation: [1, 2],
    options: [
      {
        label: 'Complete — Return to Start',
        next: 'aacg-start',
      },
    ],
  },

];

export const AACG_MODULE_LABELS = [
  'Recognition',
  'IOP Assessment',
  'Treatment Cascade',
  'Precipitating Meds',
  'Disposition',
];

export const AACG_CITATIONS: Citation[] = [
  { num: 1, text: 'EB Medicine. Ophthalmic Emergencies: Acute Visual Complaints. 2024.' },
  { num: 2, text: 'UpToDate. Acute angle-closure glaucoma. 2024.' },
  { num: 3, text: 'OpenEvidence. Acute Angle-Closure Glaucoma ED Management. 2024.' },
  { num: 4, text: 'REBEL EM. Acute Angle-Closure Glaucoma Core Cast. 2023.' },
  { num: 5, text: 'Drug-Induced Acute Angle Closure Glaucoma Review. J Curr Glaucoma Pract. 2015.' },
];
