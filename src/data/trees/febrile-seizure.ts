// MedKitt — Febrile Seizure
// Recognition & Classification → Workup Decision → Acute Management → Disposition & Recurrence → Special Scenarios & Mimics
// 5 modules, ~28 nodes total. AAP 2011/2025, ACEP 2014, FEBSTAT, ESETT, ACIP 2024.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const FEBSZ_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & CLASSIFICATION
  // =====================================================================

  {
    id: 'febsz-start',
    type: 'info',
    module: 1,
    title: 'Febrile Seizure — Core Frame',
    body: '[Febrile Seizure Steps Summary](#/info/febsz-steps) · [Disposition, Recurrence & Mimics](#/info/febsz-disposition-complex)\n\n**Most febrile seizures are simple and benign.** [1][2]\n\n**Your job is NOT to "rule out epilepsy" — it is to detect dangerous mimics:** [1][4][11]\n• **Bacterial meningitis** (especially under-vaccinated, ill-appearing, persistent AMS)\n• **HSV encephalitis** (focal features, prolonged AMS, focal seizure)\n• **Febrile status epilepticus** (≥30 min or recurrent without recovery)\n• **Electrolyte / glucose derangement**\n• **Non-accidental trauma (NAT)**\n\n**AAP 2011 (reaffirmed 2025) bottom line for SIMPLE febrile seizures:** [1][2][3]\n• **No** routine LP\n• **No** routine labs\n• **No** routine EEG\n• **No** routine neuroimaging\n• **No** anticonvulsant prophylaxis\n• **Antipyretics do NOT prevent recurrence** [3]\n\nReassurance + return precautions for simple cases. Targeted workup for complex / atypical features.',
    citation: [1, 2, 3, 4, 11],
    calculatorLinks: [
      { id: 'febsz-classifier', label: 'Simple vs Complex Classifier' },
    ],
    next: 'febsz-definition',
    summary: 'Job is NOT to rule out epilepsy — detect dangerous mimics (meningitis, HSV, status, NAT); AAP 2011/2025: no routine workup or prophylaxis for simple FS',
    safetyLevel: 'critical',
  },

  {
    id: 'febsz-definition',
    type: 'info',
    module: 1,
    title: 'Definition & Epidemiology',
    body: '**Febrile seizure (AAP definition):** [1][2]\n• Seizure accompanied by fever (≥38°C / 100.4°F) **without CNS infection or other identified cause**\n• Age **6 months to 5 years**\n• Outside this age window, the working diagnosis must be revisited\n\n**Epidemiology:** [4][6]\n• 2-5% of children in the US/Europe; 6-9% in Japan\n• Peak age 12-18 months\n• Family history positive in 25-40%\n• ~30% of children will have a recurrence\n• Lifetime epilepsy risk after simple FS: ~1-2% (vs 0.5-1% baseline)\n\n**Why "with fever, no CNS infection":** [1][4]\n• A seizure caused by meningitis or encephalitis is NOT a febrile seizure — it is symptomatic of CNS infection\n• Anchoring on "febrile seizure" before excluding mimics is the most common error',
    citation: [1, 2, 4, 6],
    next: 'febsz-simple-vs-complex',
    summary: 'FS = seizure + fever ≥38°C, age 6mo-5yr, NO CNS infection or other cause; 2-5% prevalence, 30% recur, 1-2% develop epilepsy',
  },

  {
    id: 'febsz-simple-vs-complex',
    type: 'question',
    module: 1,
    title: 'Simple vs Complex',
    body: '[Simple vs Complex Classifier](#/calculator/febsz-classifier)\n\n**Simple febrile seizure** (all four required): [1][2][4]\n• **Generalized** (no focal features)\n• **<15 minutes** duration\n• **Single episode in 24 hours**\n• Age 6 months to 5 years with previously normal development\n\n**Complex febrile seizure** (any one of): [1][2][4]\n• **Focal** features (focal motor, gaze deviation, post-ictal Todd\'s paralysis)\n• **≥15 minutes** duration\n• **≥1 episode in 24 hours** (recurrent)\n• Persistent post-ictal deficit >1 hour\n• Abnormal interictal exam or known neurodevelopmental concern\n\n**Febrile status epilepticus:** ≥30 minutes OR recurrent without return to baseline. [7]\n\nClassify the event:',
    citation: [1, 2, 4, 7],
    options: [
      {
        label: 'Simple Febrile Seizure',
        description: 'Generalized, <15 min, single in 24h, normal child age 6mo-5yr',
        next: 'febsz-typical-presentation',
      },
      {
        label: 'Complex Febrile Seizure',
        description: 'Focal, ≥15 min, recurrent in 24h, or post-ictal deficit',
        next: 'febsz-red-flags',
        urgency: 'urgent',
      },
      {
        label: 'Febrile Status Epilepticus (≥30 min or recurrent without recovery)',
        description: 'Treat as status epilepticus — high mimic risk (HSV, bacterial meningitis)',
        next: 'febsz-active-seizure',
        urgency: 'critical',
      },
    ],
    summary: 'Simple = generalized + <15 min + ONE in 24h + age 6mo-5yr; complex = any focal/long/recurrent feature; status = ≥30 min or recurrent without recovery',
  },

  {
    id: 'febsz-typical-presentation',
    type: 'info',
    module: 1,
    title: 'Typical Simple FS Presentation',
    body: '**Classic story (>90% of febrile seizures):** [1][4][6]\n• Toddler 12-24 months, no prior history\n• Rapid temperature rise (often 39-40°C / 102-104°F)\n• Brief generalized tonic-clonic activity (1-3 minutes typical)\n• Brief post-ictal drowsiness, then back to baseline within 30-60 minutes\n• Returns to baseline behavior, feeding, interacting before discharge\n\n**Reassuring exam findings:** [1]\n• Alert and consolable post-ictal\n• Normal neuro exam at the time of evaluation\n• Identifiable benign fever source (viral URI, otitis, viral exanthem)\n• Up-to-date Hib + PCV vaccinations\n• No ill appearance, no meningeal signs, no petechiae\n\n**If ALL of the above are present: home with reassurance + return precautions.** No labs, no LP, no imaging, no EEG. [1][2]',
    citation: [1, 2, 4, 6],
    next: 'febsz-disposition-simple',
    summary: 'Classic simple FS: toddler, rapid temp rise, brief generalized event, back to baseline; reassuring exam + benign source + vaccinated = home, no workup',
  },

  {
    id: 'febsz-red-flags',
    type: 'info',
    module: 1,
    title: 'Red Flags Demanding Workup',
    body: '**Any of the following pushes you toward LP, imaging, or admission:** [1][4][11]\n\n**Clinical red flags:**\n• Ill / toxic appearance after the post-ictal period\n• Persistent altered mentation >1 hour\n• Meningeal signs (neck stiffness, Kernig, Brudzinski) — limited reliability under age 18 mo\n• Bulging fontanelle\n• Petechiae or purpura (purpura non-blanching = meningococcemia until proven otherwise)\n• Focal neurologic deficit (Todd\'s paralysis lasting >1h)\n• Post-ictal seizure recurrence within 24h\n\n**Historical red flags:**\n• Incomplete Hib + PCV vaccination\n• Recent antibiotic exposure (could partially treat meningitis)\n• Pretreatment with antipyretics that masked illness severity\n• Concerns for non-accidental trauma (inconsistent history, injury patterns)\n\n**These children need targeted workup — see Module 2.** [1][4]',
    citation: [1, 4, 11],
    next: 'febsz-workup-overview',
    summary: 'Red flags = ill appearance, persistent AMS, meningeal signs, petechiae, focal deficit, under-vaccinated, recent abx, NAT concern → targeted workup',
  },

  // =====================================================================
  // MODULE 2: WORKUP DECISION
  // =====================================================================

  {
    id: 'febsz-workup-overview',
    type: 'info',
    module: 2,
    title: 'Workup Overview — What the Guidelines Actually Say',
    body: '**AAP 2011 (reaffirmed 2025) for SIMPLE febrile seizure:** [1][2]\n• **No routine LP** — exception: meningeal signs, age <12 mo with concerning features, recent antibiotics\n• **No routine labs** (CBC, BMP, glucose) unless clinically indicated for fever workup\n• **No routine EEG** — does not predict recurrence or epilepsy in simple FS\n• **No routine neuroimaging** (CT or MRI)\n\n**For COMPLEX febrile seizure:** [1][4][11]\n• Workup is **targeted**, not universal\n• Decision driven by what features make the event complex (focal, prolonged, recurrent) and the clinical exam\n• **Status epilepticus** (≥30 min) typically warrants imaging + LP + EEG given mimic concerns (HSV, bacterial meningitis, focal lesion)\n\n**The principle:** workup chases mimics, not diagnoses. If the child looks well, has a benign source, and has reassuring exam — most "complex" features alone do not mandate full workup.',
    citation: [1, 2, 4, 11],
    next: 'febsz-meningitis-risk',
    summary: 'Simple FS = no routine LP/labs/EEG/imaging (AAP 2011/2025); complex = TARGETED workup driven by features + exam; chase mimics not diagnoses',
  },

  {
    id: 'febsz-meningitis-risk',
    type: 'question',
    module: 2,
    title: 'Meningitis Risk Assessment',
    body: '[Meningitis Risk Decision Tool](#/calculator/febsz-meningitis-risk)\n\n**LP indication is the single highest-stakes decision in this consult.** [1][11]\n\n**LP indicated:** [1][11]\n• Meningeal signs at any age\n• Persistent altered mentation >1 hour after seizure\n• Bulging fontanelle\n• Petechiae / purpura\n• Pretreatment with antibiotics within prior 5-7 days (could mask meningitis)\n• Toxic appearance\n\n**LP "consider":** [1][4]\n• Age <12 months with **incomplete** Hib + PCV vaccination\n• Complex febrile seizure with persistent abnormal exam\n• Focal seizure features without other explanation\n\n**LP NOT routinely indicated:** [1][2]\n• Age 12-18 months who is well-appearing, fully vaccinated, no meningeal signs\n• Age >18 months with simple febrile seizure and reassuring exam\n\n**The 2011 AAP shift:** with widespread Hib + PCV, the rate of bacterial meningitis presenting as a "simple febrile seizure" has dropped to <0.2%. Routine LP is no longer recommended in vaccinated, well-appearing children. [1][11]\n\nWhat is the clinical risk?',
    citation: [1, 2, 4, 11],
    options: [
      {
        label: 'High Concern — LP + Empiric Antibiotics',
        description: 'Meningeal signs, ill, persistent AMS, petechiae, recent antibiotics',
        next: 'febsz-lp-cautions',
        urgency: 'critical',
      },
      {
        label: 'Moderate Concern — Consider LP, Observe',
        description: 'Age <12mo with incomplete vaccination, complex features without clear source',
        next: 'febsz-lp-cautions',
        urgency: 'urgent',
      },
      {
        label: 'Low Concern — LP Not Indicated',
        description: 'Well-appearing, fully vaccinated, no meningeal signs — fever workup as appropriate',
        next: 'febsz-when-to-image',
      },
    ],
    summary: 'Post-Hib/PCV era: bacterial meningitis as simple FS is <0.2%; LP only for meningeal signs, ill, AMS, petechiae, recent abx, or under-vaccinated <12mo',
  },

  {
    id: 'febsz-when-to-image',
    type: 'info',
    module: 2,
    title: 'When to Image',
    body: '[Imaging Decision Reference](#/info/febsz-imaging-decision)\n\n**Routine imaging is NOT indicated for simple febrile seizure.** [1][2]\n\n**CT (urgent, before LP):** [1][4][7]\n• Focal seizure with persistent neurologic deficit\n• Signs of increased ICP (papilledema, posturing, Cushing\'s response)\n• Suspected non-accidental trauma\n• Suspected HSV / abscess / intracranial hemorrhage\n• Concerning focal exam not explained by post-ictal state\n\n**MRI (preferred when stable):** [4][7]\n• Complex / recurrent febrile seizures with concern for underlying epilepsy or developmental disorder\n• Prolonged febrile status (FEBSTAT-style) — hippocampal injury risk\n• Persistent abnormal neurologic exam after recovery\n• Outpatient MRI usually sufficient if child is stable — does not need to happen in the ED\n\n**Do NOT delay LP for imaging in stable child without focal exam findings.** [1][11]',
    citation: [1, 2, 4, 7, 11],
    next: 'febsz-when-to-eeg',
    summary: 'No routine imaging; CT urgent if focal deficit, ↑ICP, NAT, or HSV concern; MRI for complex/recurrent or febrile status (FEBSTAT)',
  },

  {
    id: 'febsz-when-to-eeg',
    type: 'info',
    module: 2,
    title: 'When to EEG',
    body: '**EEG is NOT routinely indicated in febrile seizures — even complex ones in many cases.** [1][2]\n\n**Why EEG is low-yield acutely:** [1]\n• Does not predict recurrence of febrile seizures\n• Does not predict subsequent epilepsy\n• Often shows non-specific post-ictal slowing that resolves\n\n**EEG is reasonable for:** [4][7]\n• Suspected non-convulsive status epilepticus (persistent AMS without overt motor activity)\n• Febrile status epilepticus with prolonged altered mental status\n• Recurrent complex febrile seizures with abnormal neuro exam\n• Outpatient evaluation of recurrent unprovoked seizures (i.e., starting to look like epilepsy)\n\n**Pearl:** EEG should never be the answer to "the parents are worried" in an otherwise well child after a simple febrile seizure. [1]',
    citation: [1, 2, 4, 7],
    next: 'febsz-labs-utility',
    summary: 'No routine EEG; consider for non-convulsive status, prolonged AMS in febrile status, or recurrent complex events with abnormal exam',
  },

  {
    id: 'febsz-labs-utility',
    type: 'info',
    module: 2,
    title: 'Labs — When They Help',
    body: '**No routine labs in simple febrile seizure.** [1][2]\n\n**Labs as part of FEVER workup (not seizure workup):** [1][4]\n• Determined by age, vaccination status, and source of fever\n• See [Pediatric Fever consult](#/tree/peds-fever) for the full age-stratified algorithm\n\n**Labs specifically for the SEIZURE itself:** [1][4][11]\n• **Glucose** — quick bedside check; hypoglycemia mimics and exacerbates\n• **Sodium** — hyponatremic seizures (especially under 1 year, dilute formula, GI losses)\n• **Calcium / magnesium** — consider in recurrent seizures, post-cardiac surgery, malabsorption history\n• Toxicology screen — if accidental ingestion possible\n\n**When persistent AMS:** add ammonia, lactate, ABG, NH3, +/- inborn error of metabolism panel (rare).\n\n**Recurrent seizures in 24 hours:** check electrolytes, glucose, and consider broader metabolic workup. [4]',
    citation: [1, 2, 4, 11],
    next: 'febsz-lp-cautions',
    summary: 'No routine labs; check glucose + Na if any concern; broader metabolic if recurrent or persistent AMS; fever labs follow peds-fever algorithm',
  },

  {
    id: 'febsz-lp-cautions',
    type: 'info',
    module: 2,
    title: 'LP — Cautions & Empiric Coverage',
    body: '**Before LP:** [4][11]\n• Stabilize airway / breathing / circulation first\n• Assess for contraindications (focal deficit, signs of ↑ICP, papilledema, coagulopathy, infected skin over puncture site)\n• If any concern for ↑ICP → CT first (do NOT delay if child is otherwise stable)\n• **Do not delay empiric antibiotics for the LP** — give meningitis-dose antibiotics first if seriously ill\n\n**Empiric antibiotic coverage when meningitis is on the table:** [4][11]\n• **Ceftriaxone 100 mg/kg IV** (covers S. pneumoniae, N. meningitidis, H. influenzae)\n• **Vancomycin 15 mg/kg IV** (covers resistant pneumococcus)\n• Add **ampicillin 100 mg/kg IV** if age <1 month (meningitic dosing — Listeria coverage)\n• Add **acyclovir 20 mg/kg IV** if HSV encephalitis is on the differential (focal features, persistent AMS, vesicular rash, neonate)\n• See [Meningitis consult](#/tree/meningitis) for full age-stratified protocol\n\n**Steroids:** Dexamethasone 0.15 mg/kg IV is reasonable when bacterial meningitis is suspected, ideally before or with the first dose of antibiotics. [11]',
    citation: [4, 11],
    next: 'febsz-active-seizure',
    summary: 'Meningitis empiric: ceftriaxone 100 mg/kg + vanc 15 mg/kg; add ampicillin <1mo, acyclovir if HSV concern; do NOT delay abx for LP',
  },

  // =====================================================================
  // MODULE 3: ACUTE MANAGEMENT OF ACTIVE SEIZURE
  // =====================================================================

  {
    id: 'febsz-active-seizure',
    type: 'question',
    module: 3,
    title: 'Active Seizure on Arrival?',
    body: '**Most febrile seizures stop spontaneously within 1-3 minutes.** Children rolling into the ED actively seizing are by definition outliers and are at risk for febrile status epilepticus. [5][7]\n\n**Initial actions — first 60 seconds:** [5][7]\n• Position (left lateral if possible), suction if needed\n• Oxygen by face mask, pulse oximetry\n• IV / IO access\n• **Bedside glucose** (treat hypoglycemia immediately)\n• Continuous cardiac monitor\n• Time the seizure from a known start point\n\n**Reach for benzodiazepines if seizure persists ≥5 minutes** (operational definition of status epilepticus that triggers treatment). [5][7]\n\nIs the child still seizing on arrival?',
    citation: [5, 7],
    options: [
      {
        label: 'Yes — Still Seizing',
        description: 'Treat as status epilepticus pathway — benzo, then second-line agent',
        next: 'febsz-time-to-meds',
        urgency: 'critical',
      },
      {
        label: 'Stopped Spontaneously',
        description: 'Recovery in progress — observe, complete classification, decide on workup',
        next: 'febsz-fever-control',
      },
    ],
    summary: 'Most FS self-terminate in 1-3 min; if active on arrival → status pathway; benzo at 5 min; bedside glucose immediately',
  },

  {
    id: 'febsz-time-to-meds',
    type: 'info',
    module: 3,
    title: 'Time-to-Meds in Pediatric Status',
    body: '**Status epilepticus is a time-critical diagnosis.** Outcome correlates with time-to-first-benzodiazepine and time-to-second-line agent. [5][7]\n\n**Operational status definition (treat now):** [5]\n• Seizure ≥5 minutes OR\n• Recurrent seizure without return to baseline between events\n\n**Treatment timeline (target):** [5]\n• **0-5 minutes:** stabilize, IV/IO, glucose, oxygen\n• **5-20 minutes:** **first-line benzodiazepine** (give a full weight-based dose)\n• **20-40 minutes:** **second-line agent** (levetiracetam, fosphenytoin, or valproate per ESETT)\n• **>40 minutes:** refractory status — anesthetic infusion (midazolam, pentobarbital), intubation, EEG monitoring\n\n**The single most common error in pediatric status:** benzodiazepine **underdosing**. Give the full weight-based dose, then redose at 5 minutes if seizure continues. [5][7]\n\nLink to full status protocol: [Status Epilepticus consult](#/tree/status-epilepticus).',
    citation: [5, 7],
    next: 'febsz-first-line-benzo',
    summary: 'Status = ≥5 min or recurrent without recovery; benzo by 5-20 min, second-line by 20-40 min, anesthetic by 40+ min; #1 error is benzo underdosing',
  },

  {
    id: 'febsz-first-line-benzo',
    type: 'info',
    module: 3,
    title: 'First-Line Benzodiazepine',
    body: '**Choose by access available — full weight-based dose at first attempt.** [5][7]\n\n**IV access available:**\n• **Lorazepam 0.1 mg/kg IV** (max 4 mg/dose) — preferred for IV when available\n• **Midazolam 0.1-0.2 mg/kg IV** (max 5-10 mg/dose)\n• Onset 1-3 minutes\n\n**No IV access — get drug in fast:**\n• **Midazolam 0.2 mg/kg IM** (max 10 mg/dose) — preferred IM agent\n• **Midazolam 0.2 mg/kg intranasal** (split between nares; max 10 mg) — useful in EMS / pre-hospital and small EDs\n• **Diazepam 0.5 mg/kg PR** (max 20 mg) — older option, slower onset, useful when nothing else available (home rescue)\n\n**Redose once at 5 minutes** if seizure continues. [5][7]\n\n**Watch for respiratory depression and hypotension** — have BVM, suction, naloxone, vasopressor ready. Do NOT withhold the drug because of fear of intubation; the seizure itself causes more harm. [5]\n\nFor full pediatric weight-based dosing of every option, see [Status Epilepticus consult](#/tree/status-epilepticus).',
    citation: [5, 7],
    next: 'febsz-second-line',
    summary: 'IV: lorazepam 0.1 mg/kg or midaz 0.1-0.2 mg/kg; no IV: midaz 0.2 mg/kg IM/IN or diazepam 0.5 mg/kg PR; redose once at 5 min',
  },

  {
    id: 'febsz-second-line',
    type: 'info',
    module: 3,
    title: 'Second-Line Agent (ESETT-Era)',
    body: '**ESETT (NEJM 2019): levetiracetam, fosphenytoin, and valproate were equally effective in pediatric and adult benzo-refractory status — pick by availability and contraindications.** [5]\n\n**Levetiracetam:** [5]\n• 60 mg/kg IV over 5-10 min (max 4500 mg)\n• Increasingly the first choice in many EDs (favorable safety profile, no cardiac monitoring requirement, no enzyme induction)\n• Watch for behavioral changes / agitation in children\n\n**Fosphenytoin:** [5]\n• 20 mg PE/kg IV over 10 min (max 1500 mg PE)\n• Cardiac monitoring required (bradycardia, hypotension)\n• Avoid in known hypersensitivity, pregnancy unless necessary\n\n**Valproate:** [5]\n• 40 mg/kg IV over 10 min (max 3000 mg)\n• Avoid in <2 years (hepatotoxicity), suspected metabolic disorder, pregnancy, hepatic disease\n\n**If still seizing after second-line:** consider repeat dose of a different agent OR proceed to anesthetic infusion (midazolam 0.2 mg/kg load + 0.1-0.2 mg/kg/hr infusion, ketamine, pentobarbital) and intubation. [5][7]',
    citation: [5, 7],
    next: 'febsz-fever-control',
    summary: 'ESETT: levetiracetam 60 mg/kg, fosphenytoin 20 PE/kg, valproate 40 mg/kg — equally effective; pick by safety profile (levetiracetam often first)',
  },

  {
    id: 'febsz-fever-control',
    type: 'info',
    module: 3,
    title: 'Fever Control — What Antipyretics Do (and Do Not) Do',
    body: '**Antipyretics make the child more comfortable. They do NOT prevent recurrence of febrile seizure.** [3]\n\n**AAP 2008 (reaffirmed):** [3]\n• Scheduled or symptomatic acetaminophen and ibuprofen do NOT reduce the risk of febrile seizure recurrence\n• Counseling parents that "more aggressive antipyretic use will prevent the next seizure" is incorrect and creates anxiety\n\n**What antipyretics DO offer:** [3]\n• Comfort during febrile illness\n• Improved hydration and feeding\n• Reduced metabolic demand\n\n**Reasonable dosing (comfort, not prevention):** [3]\n• **Acetaminophen 15 mg/kg PO/PR every 4-6 hours** (max 75 mg/kg/day, do not exceed 5 doses in 24h)\n• **Ibuprofen 10 mg/kg PO every 6-8 hours** (only if age ≥6 months, adequately hydrated; max 40 mg/kg/day)\n• Do NOT alternate or combine routinely — does not improve outcomes and increases dosing errors\n\n**Counseling script:** "Treat the fever to help him feel better. We are not treating it to prevent another seizure — antipyretics simply do not do that. Most kids who have one febrile seizure either never have another or have one more that also stops on its own." [3][8]',
    citation: [3, 8],
    next: 'febsz-disposition-simple',
    summary: 'Antipyretics do NOT prevent recurrence (AAP 2008/reaffirmed); acetaminophen 15 mg/kg or ibuprofen 10 mg/kg for COMFORT only; counsel parents accordingly',
  },

  // =====================================================================
  // MODULE 4: DISPOSITION & RECURRENCE
  // =====================================================================

  {
    id: 'febsz-disposition-simple',
    type: 'result',
    module: 4,
    title: 'Disposition — Simple Febrile Seizure',
    body: '**Most simple febrile seizures go home from the ED with reassurance + return precautions.** [1][2]\n\n**Discharge criteria (all):** [1][2]\n• Returned to neurologic and behavioral baseline\n• Tolerating PO\n• Reliable caregiver who understands return precautions\n• Identified benign source of fever (or appropriate fever workup completed)\n• No concerning exam findings\n• Outpatient follow-up arranged with PCP\n\n**Return precautions — go to ED if:** [1][2][8]\n• Another seizure\n• Persistent altered mentation, lethargy, or trouble waking\n• Stiff neck, severe headache, or photophobia\n• Persistent vomiting, dehydration, or worsening rash (especially petechiae)\n• Difficulty breathing or unusual color\n• Fever >5 days without improvement\n\n**No prescription required for:** prophylactic antiepileptics (not indicated), rescue benzodiazepine (not routine), outpatient EEG (not needed for simple FS).',
    recommendation: 'Discharge home with reassurance, return precautions, antipyretic counseling for comfort, and PCP follow-up. No labs, LP, EEG, imaging, or antiepileptic prescription required.',
    confidence: 'definitive',
    citation: [1, 2, 8],
  },

  {
    id: 'febsz-disposition-complex',
    type: 'info',
    module: 4,
    title: 'Disposition — Complex Febrile Seizure',
    body: '**Complex features alone do NOT mandate admission.** [1][4]\n\n**Discharge OK if (all):** [1][4]\n• Back to neurologic baseline\n• Reassuring exam, identified benign fever source\n• Single complex feature only (e.g., short focal seizure, recovered fully) without other red flags\n• Reliable caregivers and follow-up\n• ED clinician judgment that no inpatient workup is needed\n\n**Admit (or extended observation) if any of the following:** [1][4][7]\n• Febrile status epilepticus\n• Persistent altered mentation\n• Concerning exam or labs\n• Recurrent seizures within 24 hours\n• Inability to identify fever source despite appropriate workup\n• Caregiver concern, social barriers to safe discharge\n• Workup pending (e.g., CSF studies, blood cultures, MRI scheduled)\n\n**Outpatient neurology referral** is reasonable for any complex febrile seizure, especially recurrent complex events or persistent abnormal exam. EEG / MRI can usually be arranged outpatient unless the child is unstable. [4]',
    citation: [1, 4, 7],
    next: 'febsz-recurrence-risk',
    summary: 'Complex features alone do NOT mandate admission; admit for status, persistent AMS, recurrent in 24h, no fever source, social barriers, pending workup',
  },

  {
    id: 'febsz-recurrence-risk',
    type: 'info',
    module: 4,
    title: 'Recurrence Risk',
    body: '[Recurrence / Epilepsy Risk Calculator](#/calculator/febsz-recurrence)\n\n**Overall recurrence risk after first febrile seizure: ~30%.** [8]\n\n**Risk factors that increase recurrence:** [8]\n• **Age at first event <12 months** (single largest factor — recurrence ~50%)\n• Family history of febrile seizures\n• Lower peak fever at presentation (paradoxical — kids who seize at lower temps tend to do it again)\n• Short duration of fever before the seizure (<1 hour)\n\n**Recurrence by number of risk factors (Hesdorffer 2012):** [8]\n• 0 factors: ~15-20% recurrence\n• 1 factor: ~25-30%\n• 2 factors: ~50%\n• ≥3 factors: ~75%\n\n**Counseling pearls:** [8]\n• Recurrence does NOT change the long-term prognosis\n• Most recurrences are also brief and benign\n• Most recurrences happen within 12 months of the first event\n• "Most kids who recur do so once more, and then it\'s done — the brain outgrows the susceptibility around age 5"',
    citation: [8],
    next: 'febsz-epilepsy-risk',
    summary: 'Recurrence ~30% overall; <12mo at first = 50%; 0/1/2/3+ factors = 15-20%/25-30%/50%/75%; recurrence does NOT change long-term prognosis',
  },

  {
    id: 'febsz-epilepsy-risk',
    type: 'info',
    module: 4,
    title: 'Lifetime Epilepsy Risk',
    body: '**Lifetime risk of epilepsy after a SIMPLE febrile seizure: ~1-2%** (vs ~0.5-1% baseline). [9][10]\n\n**Risk factors that increase epilepsy risk:** [9][10]\n• Complex features at first event (focal, prolonged, or multiple in 24h)\n• Family history of epilepsy (not just febrile seizures)\n• Pre-existing neurodevelopmental concern or abnormal exam\n• Febrile status epilepticus (FEBSTAT — possible hippocampal sclerosis link) [7]\n\n**Risk by number of factors:** [9][10]\n• Simple FS, no factors: 1-2%\n• 1 factor: ~2.5%\n• 2+ factors: up to 10%\n• Multiple complex features + family history of epilepsy: 10%+\n\n**Important nuances for parents:** [9][10]\n• Epilepsy is NOT something the febrile seizure caused — it reflects a pre-existing susceptibility revealed by fever\n• Antiepileptic prophylaxis does NOT reduce the risk of subsequent epilepsy\n• Most children with febrile seizures, even multiple complex events, do NOT develop epilepsy',
    citation: [7, 8, 9, 10],
    next: 'febsz-prophylaxis',
    summary: 'Epilepsy lifetime risk: simple FS = 1-2%, with factors up to 10%; AED prophylaxis does NOT lower this risk; epilepsy reflects pre-existing susceptibility',
  },

  {
    id: 'febsz-prophylaxis',
    type: 'info',
    module: 4,
    title: 'Prophylaxis — What Not to Prescribe',
    body: '**No anticonvulsant prophylaxis is recommended for simple OR most complex febrile seizures.** [3]\n\n**AAP 2008 (reaffirmed):** [3]\n• Continuous phenobarbital, valproate, or other anticonvulsants are NOT recommended\n• Side effects (cognitive blunting, behavior, hepatotoxicity) outweigh the modest reduction in recurrence\n• Intermittent oral diazepam at fever onset reduces recurrence but causes sedation, ataxia, and respiratory depression — not routinely recommended\n\n**The very rare exceptions, by neurology only:** [3][4]\n• Recurrent prolonged febrile seizures (febrile status) where rescue therapy is appropriate\n• Underlying neurologic disease with high seizure burden\n• Specific genetic epilepsy syndromes (e.g., Dravet) — diagnosis comes from neurology, not the ED\n\n**What you CAN prescribe in select cases:**\n• **Rescue diazepam (rectal or buccal)** for caregivers of a child who has had febrile status — to use if a future seizure lasts >5 minutes\n• Specialty consult before any chronic AED prescription\n\n**Do NOT routinely prescribe rescue benzodiazepines after a simple febrile seizure.** [3]',
    citation: [3, 4],
    next: 'febsz-vaccination',
    summary: 'No routine prophylaxis (AAP 2008); rescue diazepam ONLY after febrile status, neurology-coordinated; AEDs add side effects without changing epilepsy risk',
  },

  {
    id: 'febsz-vaccination',
    type: 'info',
    module: 4,
    title: 'Vaccination — Continue On Schedule',
    body: '[Vaccine-Triggered Seizure Reference](#/info/febsz-vaccine-triggers)\n\n**Do NOT delay routine immunizations after a febrile seizure.** [12]\n\n**Why:** [1][12]\n• Vaccine-triggered febrile seizures are themselves benign (same prognosis as any febrile seizure)\n• The diseases prevented by routine vaccines (measles encephalitis, Hib meningitis, pneumococcal sepsis) are far worse\n• Prior febrile seizure is NOT a contraindication to any routine vaccine\n\n**Counseling for upcoming vaccines:** [12]\n• MMR / MMRV: febrile seizure peak is 8-14 days post-vaccination\n• DTaP: febrile seizure peak is 0-2 days post-vaccination\n• MMRV (combined) carries ~1 extra febrile seizure per 2,300 doses vs MMR + V given separately at the 12-15 month dose; CDC ACIP supports a discussion of separate vs combined administration based on family preference for that first dose [12]\n• After dose 1 of the MMR/V series, MMRV is preferred for subsequent doses\n\n**For families with strong family history or prior febrile seizure:**\n• Reasonable to give MMR + V separately at the first dose (12-15 mo) and switch to MMRV for the booster\n• Reasonable to schedule next visit on a day when caregiver can monitor\n\nSee [info page](#/info/febsz-vaccine-triggers) for the full counseling script.',
    citation: [1, 12],
    next: 'febsz-vaccination-trigger',
    summary: 'Continue vaccines on schedule; vaccine-triggered FS is benign; MMRV gives ~1 extra FS per 2300 doses vs MMR+V — discuss for first dose at 12-15mo',
  },

  // =====================================================================
  // MODULE 5: SPECIAL SCENARIOS & MIMICS
  // =====================================================================

  {
    id: 'febsz-vaccination-trigger',
    type: 'info',
    module: 5,
    title: 'Vaccine-Triggered Seizure in the ED',
    body: '**A child presenting with a febrile seizure 8-14 days after MMR/MMRV (or 0-2 days after DTaP) has a CLASSIC vaccine-triggered febrile seizure.** [12]\n\n**Recognition:** [12]\n• Timing matches vaccine fever window\n• Otherwise classic simple febrile seizure presentation\n• Benign exam, identifiable post-vaccine fever\n\n**Approach:** [12]\n• Treat exactly like any other simple febrile seizure (no extra workup)\n• Reassurance for parents — the timing is reassuring, not concerning\n• **Do NOT delay or skip subsequent vaccines** — the disease prevented is far worse than another febrile seizure\n• Document the event in the immunization record so the next clinician understands the context\n\n**Don\'t miss:** [12]\n• Late post-vaccination meningitis is exceedingly rare but check vaccination record (rule out incomplete Hib/PCV)\n• Other illness can coincide with vaccine timing — examine carefully\n\nFull counseling script in the [info page](#/info/febsz-vaccine-triggers).',
    citation: [12],
    next: 'febsz-mimics',
    summary: 'MMR/MMRV peak 8-14d; DTaP peak 0-2d; classic timing + benign course = simple FS; do NOT skip subsequent vaccines',
  },

  {
    id: 'febsz-mimics',
    type: 'question',
    module: 5,
    title: 'Mimics — What Else Could This Be?',
    body: '**Anchoring on "febrile seizure" before excluding mimics is the most common diagnostic error.** [1][4][11]\n\nWhich mimic is most concerning in this child?',
    citation: [1, 4, 11],
    options: [
      {
        label: 'Bacterial Meningitis',
        description: 'Meningeal signs, ill, persistent AMS, petechiae, recent antibiotics',
        next: 'febsz-meningitis-mimic',
        urgency: 'critical',
      },
      {
        label: 'HSV / Viral Encephalitis',
        description: 'Focal features, persistent AMS, vesicular rash, neonate',
        next: 'febsz-encephalitis-mimic',
        urgency: 'critical',
      },
      {
        label: 'Non-Accidental Trauma (NAT)',
        description: 'Inconsistent history, injury patterns, retinal hemorrhages, bruising',
        next: 'febsz-NAT-mimic',
        urgency: 'urgent',
      },
      {
        label: 'No Mimic Concerns',
        description: 'Reassuring exam and history — proceed to counseling',
        next: 'febsz-counseling',
      },
    ],
    summary: 'Top mimics: bacterial meningitis, HSV encephalitis, NAT — anchoring on "febrile seizure" before excluding these is the #1 diagnostic error',
  },

  {
    id: 'febsz-meningitis-mimic',
    type: 'info',
    module: 5,
    title: 'Bacterial Meningitis Mimic',
    body: '**The mimic that drives all the conservatism in this consult.** [1][11]\n\n**Why under-vaccinated children get LP:** [1][11]\n• Pre-Hib/PCV era, ~20% of children presenting with first febrile seizure had bacterial meningitis\n• Post-Hib/PCV era, the rate is <0.2% in fully vaccinated, well-appearing children\n• The vaccine status drives the workup decision more than any single physical exam finding\n\n**Suspect bacterial meningitis when:** [11]\n• Petechiae or purpura (meningococcemia)\n• Bulging fontanelle\n• Persistent AMS >1 hour\n• Ill / toxic appearance\n• Meningeal signs (less reliable under 18 months)\n• Recent antibiotic exposure (could partially treat)\n\n**Action:**\n• Empiric ceftriaxone 100 mg/kg IV + vancomycin 15 mg/kg IV before LP if delay anticipated\n• Add ampicillin 100 mg/kg IV (meningitic dosing) if <1 month\n• Dexamethasone 0.15 mg/kg IV before/with first abx dose\n• Activate full sepsis bundle\n• See [Meningitis consult](#/tree/meningitis) for the full pathway',
    citation: [1, 11],
    next: 'febsz-counseling',
    summary: 'Bacterial meningitis was 20% of pre-vaccine FS, now <0.2% in vaccinated; suspect with petechiae, AMS, ill appearance, recent abx → empiric abx + LP',
  },

  {
    id: 'febsz-encephalitis-mimic',
    type: 'info',
    module: 5,
    title: 'HSV Encephalitis Mimic',
    body: '**HSV encephalitis is the time-critical viral mimic.** [4][11]\n\n**Why it matters:** [4][11]\n• Mortality 70%+ untreated; ~25% with timely acyclovir\n• Survivors often have neurologic sequelae proportional to delay in treatment\n• Empiric acyclovir is cheap, low-risk, and lifesaving\n\n**Clinical clues:** [4][11]\n• Focal seizure or focal neurologic deficit\n• Persistent altered mentation\n• Vesicular rash (newborn or older child)\n• Neonate (HSV-2 from peripartum exposure) — disseminated, CNS, or skin-eye-mouth disease\n• Temporal lobe localization on imaging or seizure semiology\n\n**Action:** [4][11]\n• **Acyclovir 20 mg/kg IV** (10 mg/kg if >12 years) every 8 hours empirically while workup is pending\n• CSF HSV PCR (gold standard); CSF should also reflect lymphocytic pleocytosis +/- elevated protein\n• MRI (preferred) showing temporal / limbic involvement\n• Continuous EEG if persistent AMS — non-convulsive seizures are common\n• Pediatric ID + neurology consult\n\n**Do not wait for confirmation** — start acyclovir as soon as HSV is reasonable on the differential. [11]',
    citation: [4, 11],
    next: 'febsz-counseling',
    summary: 'HSV encephalitis: focal sz, persistent AMS, vesicular rash, neonate; start acyclovir 20 mg/kg IV q8h empirically — do NOT wait for confirmation',
  },

  {
    id: 'febsz-NAT-mimic',
    type: 'info',
    module: 5,
    title: 'Non-Accidental Trauma Mimic',
    body: '**NAT can present with seizure + fever and be misclassified as febrile seizure.** [4]\n\n**Red flags suggesting NAT:** [4]\n• Inconsistent or changing history of mechanism\n• Injury pattern out of proportion to story (bruising in non-mobile infant, posterior rib fractures, classic metaphyseal lesions)\n• Retinal hemorrhages on dilated exam\n• Bulging fontanelle without meningitis\n• Apnea or unexplained altered mental status\n• Caregiver behavior raises concern (delayed presentation, multiple caregivers giving different stories)\n• Family history red flags (prior CPS involvement, sibling deaths)\n\n**Action:** [4]\n• Skeletal survey, head CT (ideally MRI), ophthalmology consult for retinal exam\n• Coags + CBC to rule out coagulopathy as bruising mimic\n• Activate child protection / social work / hospital NAT protocol\n• Mandatory reporting to CPS\n• Document objectively (no editorializing) and admit\n\nSee [NAT Screening consult](#/tree/nat-screening) for the full workup pathway.',
    citation: [4],
    next: 'febsz-counseling',
    summary: 'NAT mimic: inconsistent history, injury pattern mismatch, retinal hemorrhages, non-mobile infant bruising; skeletal survey + head imaging + ophtho + CPS',
  },

  {
    id: 'febsz-counseling',
    type: 'result',
    module: 5,
    title: 'Counseling — What to Tell Parents',
    body: '**Parents of a child after a first febrile seizure are scared. Anchor your counseling on three messages.** [1][2][8]\n\n**1. "Your child had a febrile seizure. It is the most common type of seizure in childhood, and the prognosis is excellent."** [1][8]\n• 1 in 25 children have a febrile seizure between ages 6 months and 5 years\n• The brain outgrows the susceptibility, usually by age 5\n• Most kids never have another, and most who do still grow out of it\n\n**2. "About 1 in 3 children will have another febrile seizure. That does NOT change the long-term outlook."** [8]\n• The long-term risk of epilepsy is barely above the general population (1-2% vs 0.5-1%)\n• Antipyretics do NOT prevent recurrence — give them for comfort, not prevention\n• If another seizure happens, it will likely be similar (brief, generalized, self-limited)\n\n**3. "Here is when to come back."** [1][2]\n• Another seizure that lasts more than 5 minutes — call 911\n• Stiff neck, vomiting, severe headache, photophobia, persistent altered mentation\n• A rash that does not blanch under pressure (petechiae)\n• Difficulty breathing or unusual color\n• Fever lasting more than 5 days\n\n**Continue routine vaccines on schedule.** [1][12]',
    recommendation: 'Three-message counseling: prognosis is excellent, 1-in-3 recurrence does not change long-term outlook, here are the specific return precautions. Continue vaccines on schedule.',
    confidence: 'definitive',
    citation: [1, 2, 8, 12],
  },

];

export const FEBSZ_MODULE_LABELS = [
  'Recognition & Classification',
  'Workup Decision',
  'Acute Management of Active Seizure',
  'Disposition & Recurrence',
  'Special Scenarios & Mimics',
];

export const FEBSZ_CITATIONS: Citation[] = [
  { num: 1, text: 'AAP Subcommittee on Febrile Seizures. Clinical Practice Guideline: Febrile Seizures. Pediatrics. 2011;127(2):389-394 (reaffirmed 2025).' },
  { num: 2, text: 'AAP Subcommittee on Febrile Seizures. Febrile Seizures: Guideline for the Neurodiagnostic Evaluation of the Child With a Simple Febrile Seizure. Pediatrics. 2011;127(2):389-394.' },
  { num: 3, text: 'AAP Steering Committee on Quality Improvement. Treatment of the Child With a Simple Febrile Seizure. Pediatrics. 2008;121(6):1281-1286.' },
  { num: 4, text: 'Patel AD, Vidaurre J, Geller TJ, et al. Febrile Seizures. BMJ. 2015;351:h4240.' },
  { num: 5, text: 'Kapur J, Elm J, Chamberlain JM, et al. (ESETT Investigators). Randomized Trial of Three Anticonvulsant Medications for Status Epilepticus. N Engl J Med. 2019;381:2103-2113.' },
  { num: 6, text: 'Sadleir LG, Scheffer IE. Febrile Seizures. BMJ. 2007;334:307-311.' },
  { num: 7, text: 'Shinnar S, Hesdorffer DC, Nordli DR Jr, et al. (FEBSTAT Study Team). Phenomenology of Prolonged Febrile Seizures: Results of the FEBSTAT Study. Epilepsia. 2008;49(6):1025-1037.' },
  { num: 8, text: 'Hesdorffer DC, Shinnar S, Lewis DV, et al. Risk Factors for Subsequent Febrile Seizures in the FEBSTAT Study. Pediatrics. 2012;130(3):488-493.' },
  { num: 9, text: 'Vestergaard M, Pedersen CB, Sidenius P, et al. The Long-term Risk of Epilepsy after Febrile Seizures in Susceptible Subgroups. JAMA. 2002;287:2933-2938.' },
  { num: 10, text: 'Annegers JF, Hauser WA, Shirts SB, Kurland LT. Factors Prognostic of Unprovoked Seizures After Febrile Convulsions. N Engl J Med. 1987;316:493-498.' },
  { num: 11, text: 'ACEP Clinical Policies Subcommittee. Clinical Policy: Critical Issues in the Evaluation and Management of Pediatric Patients Presenting With Seizures. Ann Emerg Med. 2014;63(4):437-447.' },
  { num: 12, text: 'Klein NP, Fireman B, Yih WK, et al. Measles-Mumps-Rubella-Varicella Combination Vaccine and the Risk of Febrile Seizures. Pediatrics. 2010;126(1):e1-e8 (with CDC ACIP 2024 update).' },
];

export const FEBSZ_NODE_COUNT = FEBSZ_NODES.length;

export const FEBSZ_CRITICAL_ACTIONS = [
  { text: 'Job is NOT to rule out epilepsy — it is to detect dangerous mimics: bacterial meningitis, HSV encephalitis, febrile status, NAT', nodeId: 'febsz-start' },
  { text: 'Simple FS = generalized + <15 min + ONE in 24h + age 6mo-5yr; AAP 2011/2025: no routine LP, labs, EEG, or imaging', nodeId: 'febsz-simple-vs-complex' },
  { text: 'LP only for meningeal signs, persistent AMS, petechiae, ill appearance, recent antibiotics, or under-vaccinated <12mo', nodeId: 'febsz-meningitis-risk' },
  { text: 'Active seizure ≥5 min: full weight-based benzodiazepine (lorazepam 0.1 mg/kg IV or midazolam 0.2 mg/kg IM/IN); redose once at 5 min', nodeId: 'febsz-first-line-benzo' },
  { text: 'ESETT-era second-line: levetiracetam 60 mg/kg, fosphenytoin 20 PE/kg, or valproate 40 mg/kg — equally effective, pick by safety profile', nodeId: 'febsz-second-line' },
  { text: 'Antipyretics do NOT prevent recurrence (AAP 2008/reaffirmed); give for comfort only', nodeId: 'febsz-fever-control' },
  { text: 'No anticonvulsant prophylaxis after simple or most complex FS; rescue diazepam only after febrile status, neurology-coordinated', nodeId: 'febsz-prophylaxis' },
  { text: 'Continue routine vaccinations on schedule; vaccine-triggered FS is benign and timing (MMR/MMRV 8-14d, DTaP 0-2d) is reassuring', nodeId: 'febsz-vaccination' },
  { text: 'Empiric meningitis coverage when LP indicated: ceftriaxone 100 mg/kg + vancomycin 15 mg/kg (+ ampicillin if <1mo, + acyclovir if HSV concern)', nodeId: 'febsz-lp-cautions' },
  { text: 'Recurrence ~30% overall (50% if first event <12mo); lifetime epilepsy risk after simple FS is 1-2% — counsel "most kids grow out of these"', nodeId: 'febsz-recurrence-risk' },
];
