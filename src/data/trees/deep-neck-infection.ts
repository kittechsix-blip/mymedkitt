// MedKitt - Deep Neck Space Infections
// ED recognition, anatomic classification, airway management, antibiotics, and disposition
// 6 modules: Recognition -> Anatomic Spaces -> Airway -> Antibiotics -> Complications -> Disposition
// 26 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const DEEP_NECK_INFECTION_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Recognition & Assessment
  // ===================================================================
  {
    id: 'dni-start',
    type: 'info',
    module: 1,
    title: 'Deep Neck Space Infections',
    body: 'Deep neck infections (DNIs) are potentially life-threatening infections affecting the cervical fascial spaces. They can progress rapidly to **airway obstruction, sepsis, mediastinitis**, and death. [1,2]\n\nMortality without treatment approaches **40-60%** when complicated by descending necrotizing mediastinitis. With aggressive management, mortality has decreased to **8-16%**. [2,3]\n\n**Most common etiologies:**\n- **Odontogenic** (dental infections): 40-60% of cases [1,4]\n- **Tonsillar/pharyngeal**: 20-30% [1]\n- **Salivary gland infections**\n- **Iatrogenic** (post-instrumentation)\n- **Trauma/foreign body**\n\n**Key principle:** Airway management takes absolute priority. Secure the airway BEFORE detailed workup if any signs of compromise.',
    citation: [1, 2, 3, 4],
    next: 'dni-presentation',
  },
  {
    id: 'dni-presentation',
    type: 'info',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Common presenting symptoms:** [1,5]\n- Neck pain and swelling (unilateral or bilateral)\n- Odynophagia and dysphagia\n- Fever and malaise\n- Trismus (inability to open mouth)\n- Voice changes (hot potato voice)\n- Drooling\n\n**RED FLAGS indicating severe disease:** [2,5]\n- **Stridor** or respiratory distress\n- **Tripod positioning**\n- **Crepitus** (subcutaneous emphysema)\n- Bilateral neck swelling ("bull neck")\n- Floor of mouth elevation\n- Rapidly progressing symptoms\n\n**Physical exam findings:**\n- Neck erythema, induration, tenderness\n- Fluctuance (suggests abscess)\n- Dental caries or periapical abscess\n- Tonsillar asymmetry or bulging\n- Limited neck mobility (torticollis)',
    citation: [1, 2, 5],
    next: 'dni-airway-assess',
  },
  {
    id: 'dni-airway-assess',
    type: 'question',
    module: 1,
    title: 'Airway Assessment',
    body: '**Assess for signs of airway compromise IMMEDIATELY.** [5,6]\n\nStridor and cyanosis are **late, ominous signs** of impending respiratory failure.\n\nEarlier signs include:\n- Drooling or inability to handle secretions\n- Muffled "hot potato" voice\n- Tripod positioning\n- Difficulty lying flat\n- Floor of mouth elevation\n- Tongue protrusion',
    citation: [5, 6],
    options: [
      {
        label: 'Airway compromise present',
        description: 'Stridor, respiratory distress, inability to lie flat, drooling',
        next: 'dni-emergent-airway',
        urgency: 'critical',
      },
      {
        label: 'Stable airway',
        description: 'No respiratory distress, can handle secretions',
        next: 'dni-anatomic-spaces',
      },
    ],
  },

  // ===================================================================
  // MODULE 2: Anatomic Spaces & Specific Syndromes
  // ===================================================================
  {
    id: 'dni-anatomic-spaces',
    type: 'info',
    module: 2,
    title: 'Neck Fascial Spaces',
    body: '**The neck contains interconnected fascial compartments that facilitate infection spread.** [1,7]\n\n**Superficial space:**\n- Between skin and investing fascia\n- Limited clinical significance\n\n**Deep cervical spaces:**\n- **Submandibular** (includes sublingual & submental)\n- **Parapharyngeal** (lateral to pharynx)\n- **Retropharyngeal** (posterior to pharynx, anterior to prevertebral fascia)\n- **Danger space** (between alar and prevertebral fascia)\n- **Prevertebral** (covers vertebral column)\n\n**"Danger space"** extends from skull base to diaphragm - permits rapid spread of infection into mediastinum. [1,7]\n\n**Clinical significance:** The anatomic space involved determines clinical presentation, complications, and management approach.',
    citation: [1, 7],
    next: 'dni-syndrome-branch',
  },
  {
    id: 'dni-syndrome-branch',
    type: 'question',
    module: 2,
    title: 'Clinical Syndrome',
    body: 'Based on presentation and suspected anatomic involvement, select the most likely clinical syndrome. [1,5,8]',
    citation: [1, 5, 8],
    options: [
      {
        label: 'Ludwig angina',
        description: 'Bilateral submandibular swelling, floor of mouth elevation, "bull neck"',
        next: 'dni-ludwig',
        urgency: 'critical',
      },
      {
        label: 'Retropharyngeal abscess',
        description: 'Neck stiffness, torticollis, dysphagia; pediatric or adult with trauma/foreign body',
        next: 'dni-retropharyngeal',
        urgency: 'urgent',
      },
      {
        label: 'Parapharyngeal infection',
        description: 'Unilateral neck swelling, trismus, medial displacement of tonsil',
        next: 'dni-parapharyngeal',
        urgency: 'urgent',
      },
      {
        label: 'Lemierre syndrome suspected',
        description: 'Recent pharyngitis, persistent fever, pulmonary symptoms, lateral neck tenderness',
        next: 'dni-lemierre',
        urgency: 'critical',
      },
      {
        label: 'Peritonsillar abscess',
        description: 'Unilateral peritonsillar swelling, uvular deviation, trismus',
        next: 'dni-pta',
      },
    ],
  },
  {
    id: 'dni-ludwig',
    type: 'info',
    module: 2,
    title: 'Ludwig Angina',
    body: '**Ludwig angina is a rapidly progressive, life-threatening cellulitis of the floor of the mouth.** [5,9]\n\n**Classic triad:**\n1. Bilateral submandibular space involvement\n2. Gangrenous cellulitis (not abscess formation)\n3. No lymphatic involvement\n\n**Clinical features:**\n- "Bull neck" appearance with bilateral swelling\n- Firm, board-like induration of floor of mouth\n- Tongue elevation and posterior displacement\n- Drooling, dysphagia, dysphonia\n- Trismus\n\n**Etiology:** Typically odontogenic (2nd/3rd mandibular molars). Molar roots extend below the mylohyoid line, allowing direct spread into submandibular space. [9]\n\n**Key point:** This is primarily cellulitis, NOT an abscess. Surgery is for drainage only when fluctuance or abscess develops.\n\n**Mortality:** ~8% with modern aggressive management (historically up to 50%). [5]',
    citation: [5, 9],
    treatment: {
      firstLine: {
        drug: 'Ampicillin-sulbactam',
        dose: '3g',
        route: 'IV',
        frequency: 'q6h',
        duration: '2-3 weeks',
        notes: 'Covers oral flora including anaerobes',
      },
      alternative: {
        drug: 'Clindamycin',
        dose: '900 mg',
        route: 'IV',
        frequency: 'q8h',
        duration: '2-3 weeks',
        notes: 'If penicillin allergy; add ceftriaxone 2g daily for GNR coverage',
      },
      monitoring: 'Serial airway exams; WBC/CRP trending; repeat imaging if no improvement at 48-72 hours',
    },
    next: 'dni-ludwig-airway',
  },
  {
    id: 'dni-ludwig-airway',
    type: 'info',
    module: 2,
    title: 'Ludwig Angina: Airway Priority',
    body: '**Airway management is the #1 priority in Ludwig angina.** [5,6,9]\n\n**Direct laryngoscopy will often fail** due to:\n- Tongue elevation and posterior displacement\n- Board-like induration of floor of mouth\n- Trismus limiting mouth opening\n- Distorted anatomy\n\n**Preferred approach: Awake fiberoptic intubation** [6]\n- Maintain spontaneous respiration\n- Patient upright or semi-recumbent\n- Topical anesthesia (avoid nerve blocks due to distorted anatomy)\n- Nasal approach often preferred\n\n**Backup preparations BEFORE any airway attempt:**\n- Surgical airway tray at bedside (cricothyrotomy/tracheostomy)\n- ENT/Anesthesia on standby\n- Mark neck landmarks before attempt\n- Awake tracheostomy may be primary approach in severe cases\n\n**Warning:** Sedation/paralysis can cause complete airway collapse and make both intubation AND surgical airway extremely difficult.',
    citation: [5, 6, 9],
    next: 'dni-antibiotics',
  },
  {
    id: 'dni-retropharyngeal',
    type: 'info',
    module: 2,
    title: 'Retropharyngeal Abscess',
    body: '**Retropharyngeal abscess is a potentially life-threatening infection between the pharynx and prevertebral fascia.** [8,10]\n\n**Pediatric (6 months - 6 years):**\n- 50% of cases occur in children 6-12 months\n- Typically follows URI with suppurative lymphadenitis\n- Retropharyngeal lymph nodes drain nasopharynx, sinuses, middle ear\n- These nodes atrophy by age 5-6\n\n**Adult:**\n- Usually from foreign body ingestion or instrumentation\n- Penetrating trauma\n- Extension from vertebral osteomyelitis\n\n**Clinical presentation:** [8,10]\n- Fever, neck pain/stiffness, torticollis\n- Dysphagia, odynophagia, drooling\n- Muffled voice\n- Refusal to extend neck\n- Posterior pharyngeal wall bulging (may be subtle)\n\n**CT findings:**\n- Hypodense collection with rim enhancement\n- **Scalloping** of abscess wall strongly predicts drainable purulence\n- Size >2 cm typically requires surgical drainage',
    citation: [8, 10],
    treatment: {
      firstLine: {
        drug: 'Ampicillin-sulbactam',
        dose: 'Adults: 3g IV q6h; Peds: 200 mg/kg/day div q6h',
        route: 'IV',
        frequency: 'q6h',
        duration: '10-14 days',
        notes: 'Broad-spectrum; covers streptococci, staphylococci, anaerobes',
      },
      alternative: {
        drug: 'Clindamycin + Ceftriaxone',
        dose: 'Clindamycin 40 mg/kg/day; Ceftriaxone 50-75 mg/kg/day',
        route: 'IV',
        frequency: 'Clindamycin TID; Ceftriaxone daily',
        duration: '10-14 days',
        notes: 'Alternative regimen; adjust for adult dosing',
      },
      monitoring: 'Airway assessment; fever curve; WBC/CRP; repeat CT if no improvement 48-72h',
    },
    next: 'dni-retro-management',
  },
  {
    id: 'dni-retro-management',
    type: 'info',
    module: 2,
    title: 'Retropharyngeal Abscess Management',
    body: '**Imaging:** [8,10,11]\n- **CT neck with IV contrast** is gold standard\n- Sensitivity ~100%, specificity ~45% (often overcalls abscess)\n- Ultrasound in peds: 89% sensitivity, 100% specificity\n\n**Medical vs Surgical:** [8]\n- **Medical management** successful in many children with small collections (<2 cm)\n- **Surgical drainage** required if:\n  - Large abscess (>2 cm hypodense focus)\n  - Failure to improve on IV antibiotics (48-72 hours)\n  - Airway compromise\n  - Extensive involvement\n\n**Drainage approach:**\n- Transcervical (external) approach for most adults and large abscesses\n- Transoral approach in select cases\n\n**Complications:** [10]\n- Airway obstruction\n- Aspiration (if rupture occurs)\n- Mediastinal extension\n- Atlantoaxial subluxation (Grisel syndrome)\n- Jugular vein thrombosis',
    citation: [8, 10, 11],
    next: 'dni-antibiotics',
  },
  {
    id: 'dni-parapharyngeal',
    type: 'info',
    module: 2,
    title: 'Parapharyngeal Space Infection',
    body: '**The parapharyngeal space is a critical lateral neck compartment.** [1,7]\n\nAlso called the "pharyngomaxillary" or "lateral pharyngeal" space.\n\n**Anatomy:**\n- Inverted pyramid from skull base to hyoid bone\n- Medial: pharyngeal constrictors\n- Lateral: mandible, parotid, pterygoid muscles\n- Contains carotid artery, IJV, CN IX-XII, sympathetic chain\n\n**Clinical presentation:**\n- High fever with toxic appearance\n- Unilateral neck swelling below angle of mandible\n- Trismus (pterygoid muscle involvement)\n- Medial bulging of lateral pharyngeal wall\n- Torticollis toward affected side\n\n**Etiologies:**\n- Extension from peritonsillar abscess\n- Odontogenic infection\n- Parotitis\n- Mastoiditis (Bezold abscess)\n\n**CT with contrast** is essential for diagnosis and surgical planning. [7]',
    citation: [1, 7],
    treatment: {
      firstLine: {
        drug: 'Ampicillin-sulbactam',
        dose: '3g',
        route: 'IV',
        frequency: 'q6h',
        duration: '2-3 weeks',
        notes: 'Surgical drainage typically required for abscesses',
      },
      monitoring: 'Serial neck exams; drain output; WBC/CRP trending; vascular imaging if concern for vessel involvement',
    },
    next: 'dni-antibiotics',
  },
  {
    id: 'dni-lemierre',
    type: 'info',
    module: 2,
    title: 'Lemierre Syndrome',
    body: '**Lemierre syndrome: septic thrombophlebitis of the internal jugular vein.** [12,13]\n\nAlso called "postanginal sepsis" or "the forgotten disease."\n\n**Classic tetrad:**\n1. Recent oropharyngeal infection (pharyngitis/tonsillitis)\n2. Bacteremia (typically *Fusobacterium necrophorum*)\n3. Internal jugular vein thrombophlebitis\n4. Septic emboli (lung most common)\n\n**Clinical course:** [12]\n- Pharyngitis 4-7 days before systemic illness\n- Persistent/recurrent high fever\n- Lateral neck pain/swelling (IJV region)\n- "Cord sign": palpable tender cord at mandibular angle (25-45%)\n- Pulmonary symptoms (cough, pleuritic pain, hemoptysis)\n\n**Organism:** *Fusobacterium necrophorum* in >90% of cases. [13]\n\n**Imaging:** [12]\n- CT neck with contrast: IJV thrombosis, perivenous enhancement\n- MRI/MRV: highest sensitivity (97%)\n- Chest CT: septic pulmonary emboli, cavitary lesions',
    citation: [12, 13],
    next: 'dni-lemierre-tx',
  },
  {
    id: 'dni-lemierre-tx',
    type: 'info',
    module: 2,
    title: 'Lemierre Syndrome Treatment',
    body: '**Antibiotic therapy is the cornerstone of treatment.** [12,13]\n\n**First-line:** Beta-lactam/beta-lactamase inhibitor\n- [Ampicillin-sulbactam](#/drug/ampicillin-sulbactam/lemierre) 3g IV q6h, OR\n- [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/dni) 4.5g IV q6h\n\n**Alternative (penicillin allergy):**\n- [Metronidazole](#/drug/metronidazole/lemierre) 500 mg IV q8h (*F. necrophorum* almost always sensitive)\n- Plus coverage for other pharyngeal flora\n\n**Duration:** 4-6 weeks to penetrate fibrin clot. [12]\n\n**Anticoagulation (controversial):** [12,13]\n- NO consensus guidelines\n- Consider if:\n  - Thrombus extends to cavernous sinus\n  - Large or bilateral clot burden\n  - No improvement at 72 hours with antibiotics\n  - Progressive thrombosis\n- NOT routinely recommended for uncomplicated cases\n\n**Prognosis:** Mortality 2-4% with modern treatment (90% pre-antibiotics). [13]',
    citation: [12, 13],
    treatment: {
      firstLine: {
        drug: 'Piperacillin-tazobactam OR Ampicillin-sulbactam',
        dose: 'Pip-tazo 4.5g; Amp-sulbactam 3g',
        route: 'IV',
        frequency: 'Pip-tazo q6h; Amp-sulbactam q6h',
        duration: '4-6 weeks',
        notes: 'Prolonged course for fibrin penetration',
      },
      alternative: {
        drug: 'Metronidazole + Ceftriaxone',
        dose: 'Metro 500 mg; Ceftriaxone 2g',
        route: 'IV',
        frequency: 'Metro q8h; Ceftriaxone q24h',
        duration: '4-6 weeks',
        notes: 'For penicillin allergy',
      },
      monitoring: 'Serial CT neck/chest for clot progression; blood cultures; pulmonary imaging for emboli; consider anticoagulation if progression',
    },
    next: 'dni-complications',
  },
  {
    id: 'dni-pta',
    type: 'info',
    module: 2,
    title: 'Peritonsillar Abscess',
    body: '**Peritonsillar abscess (PTA) is the most common deep space infection of the head and neck.** [14]\n\n**Clinical presentation:**\n- Severe sore throat (usually unilateral)\n- "Hot potato" muffled voice\n- Trismus\n- Uvular deviation away from affected side\n- Soft palate bulging\n- Cervical lymphadenopathy\n\n**Diagnosis:** Clinical. CT only if atypical presentation or concern for extension.\n\n**Management:** [14]\n- Needle aspiration (85-90% success) OR incision & drainage\n- Antibiotics: [Ampicillin-sulbactam](#/drug/ampicillin-sulbactam/pta) 3g IV q6h or [Clindamycin](#/drug/clindamycin/pta) 900 mg IV q8h\n- Oral step-down: Amoxicillin-clavulanate 875/125 mg BID x 10 days\n- IV dexamethasone may reduce pain and recovery time\n\n**Watch for extension to parapharyngeal/retropharyngeal space!**\n\n**Recurrence rate:** 10-15%; consider tonsillectomy if recurrent.',
    citation: [14],
    treatment: {
      firstLine: {
        drug: 'Ampicillin-sulbactam',
        dose: '3g',
        route: 'IV',
        frequency: 'q6h',
        duration: 'Until PO tolerated, then oral step-down x 10 days total',
        notes: 'Needle aspiration or I&D also required',
      },
      alternative: {
        drug: 'Clindamycin',
        dose: '900 mg',
        route: 'IV',
        frequency: 'q8h',
        duration: 'Until PO tolerated, then 300 mg PO QID x 10 days',
        notes: 'For penicillin allergy',
      },
      monitoring: 'Symptom resolution; ability to tolerate PO; watch for extension to deeper spaces',
    },
    next: 'dni-imaging',
  },

  // ===================================================================
  // MODULE 3: Airway Management
  // ===================================================================
  {
    id: 'dni-emergent-airway',
    type: 'info',
    module: 3,
    title: 'Emergent Airway Management',
    body: '**AIRWAY IS THE ABSOLUTE PRIORITY.** [5,6]\n\nDeep neck infections create a "cannot intubate, cannot oxygenate" scenario risk.\n\n**General principles:**\n1. Maintain spontaneous ventilation as long as possible\n2. Avoid sedation/paralysis (can cause complete collapse)\n3. Have surgical airway immediately available\n4. Expert help (ENT, Anesthesia) if time permits\n5. Mark cricothyroid membrane BEFORE any attempt\n\n**Preferred: Awake fiberoptic intubation** [6]\n- Patient sitting upright if tolerated\n- Topical anesthesia (atomized lidocaine)\n- Nasal approach often preferred\n- Maintain eye contact and communication\n\n**Alternative: Awake tracheostomy**\n- May be primary approach in severe Ludwig angina\n- Performed under local anesthesia\n- ENT/Trauma surgery team\n\n**Last resort: Surgical airway (cricothyrotomy)**\n- Landmarks may be obscured by swelling\n- Prepare and mark before other attempts',
    citation: [5, 6],
    next: 'dni-airway-algorithm',
  },
  {
    id: 'dni-airway-algorithm',
    type: 'info',
    module: 3,
    title: 'Airway Decision Algorithm',
    body: '**STEP 1: Assess stability**\n- Can patient maintain airway currently?\n- Rapidly progressive or stable?\n\n**STEP 2: Prepare (regardless of stability)**\n- Call ENT/Anesthesia early\n- Surgical airway tray at bedside\n- Mark cricothyroid membrane\n- Suction ready\n\n**STEP 3: Choose approach** [6]\n\n**If time permits (stable but at risk):**\n- Awake fiberoptic intubation in OR with ENT/Anesthesia\n- Double setup: FOI with tracheostomy ready\n\n**If imminent collapse:**\n- Awake tracheostomy under local, OR\n- Cricothyrotomy if cannot delay\n\n**AVOID unless absolutely necessary:**\n- RSI (risk of complete collapse)\n- Direct laryngoscopy (poor visualization)\n- Blind nasal intubation (risk of abscess rupture)\n\n**Post-intubation:** Do NOT remove until swelling resolves (may be several days).',
    citation: [6],
    next: 'dni-imaging',
  },
  {
    id: 'dni-imaging',
    type: 'info',
    module: 3,
    title: 'Imaging in Deep Neck Infections',
    body: '**CT neck with IV contrast is the gold standard.** [1,7,11]\n\n**Indications for emergent CT:**\n- Clinical suspicion of deep neck infection\n- Delineate extent of disease\n- Identify drainable collections\n- Evaluate for complications (vascular, mediastinal)\n\n**CT findings:** [11]\n- Rim-enhancing hypodense collection (abscess)\n- **Scalloping** of abscess wall = purulence at surgery\n- Soft tissue swelling and fat stranding\n- Obliteration of fat planes\n- Gas within soft tissues (necrotizing infection)\n- Airway narrowing or deviation\n\n**CT limitations:**\n- Sensitivity 100%, specificity 45% for abscess vs phlegmon [10]\n- May overestimate abscess; clinical correlation essential\n\n**Lateral neck X-ray (screening):**\n- Prevertebral soft tissue width >7 mm at C2 or >22 mm at C6\n- Limited utility; CT preferred\n\n**MRI:** Superior soft tissue detail but impractical in acute setting.',
    citation: [1, 7, 10, 11],
    next: 'dni-antibiotics',
  },

  // ===================================================================
  // MODULE 4: Antibiotic Therapy
  // ===================================================================
  {
    id: 'dni-antibiotics',
    type: 'info',
    module: 4,
    title: 'Empiric Antibiotic Therapy',
    body: '**Deep neck infections are polymicrobial.** [1,4]\n\n**Common organisms:**\n- **Streptococci** (Group A, viridans group)\n- **Staphylococci** (including MRSA in some populations)\n- **Anaerobes** (Bacteroides, Fusobacterium, Peptostreptococcus)\n- **Eikenella corrodens** (oral flora)\n\n**Empiric coverage must include:**\n- Gram-positive organisms\n- Gram-negative organisms\n- Anaerobic coverage\n\n**First-line regimens:** [1,4,5]\n- [Ampicillin-sulbactam](#/drug/ampicillin-sulbactam/dni) 3g IV q6h, OR\n- [Clindamycin](#/drug/clindamycin/dni) 900 mg IV q8h (if PCN allergy)\n\n**Add MRSA coverage if:** [1]\n- Healthcare-associated infection\n- MRSA colonization/history\n- Immunocompromised\n- Injection drug use\n- Failure to improve on initial therapy\n\n**MRSA coverage:** [Vancomycin](#/drug/vancomycin/dni) 15-20 mg/kg IV q8-12h',
    citation: [1, 4, 5],
    next: 'dni-abx-severe',
  },
  {
    id: 'dni-abx-severe',
    type: 'info',
    module: 4,
    title: 'Severe/Necrotizing Infections',
    body: '**Broadened coverage for severe infections or necrotizing fasciitis:** [2,3]\n\n**Regimen:**\n- [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/dni) 4.5g IV q6h, OR\n- [Meropenem](#/drug/meropenem/dni) 1g IV q8h\n- PLUS [Vancomycin](#/drug/vancomycin/dni) 15-20 mg/kg IV q8-12h\n- PLUS [Clindamycin](#/drug/clindamycin/dni) 900 mg IV q8h (toxin suppression)\n\n**Clindamycin rationale:** Suppresses bacterial toxin production in necrotizing infections.\n\n**Duration:** [1]\n- Uncomplicated: 2-3 weeks\n- Mediastinal involvement: 4-6 weeks\n- Lemierre syndrome: 4-6 weeks\n- Tailor based on source control, clinical response, cultures\n\n**Cultures:**\n- Blood cultures before antibiotics (positive in 10-20%)\n- Surgical specimens (aerobic AND anaerobic)',
    citation: [1, 2, 3],
    treatment: {
      firstLine: {
        drug: 'Piperacillin-tazobactam + Vancomycin + Clindamycin',
        dose: 'Pip-tazo 4.5g; Vanc 15-20 mg/kg; Clinda 900 mg',
        route: 'IV',
        frequency: 'Pip-tazo q6h; Vanc q8-12h; Clinda q8h',
        duration: '2-6 weeks based on extent',
        notes: 'For severe/necrotizing infections; clindamycin for toxin suppression',
      },
      alternative: {
        drug: 'Meropenem + Vancomycin + Clindamycin',
        dose: 'Meropenem 1g; Vanc 15-20 mg/kg; Clinda 900 mg',
        route: 'IV',
        frequency: 'Meropenem q8h; Vanc q8-12h; Clinda q8h',
        duration: '2-6 weeks based on extent',
        notes: 'Alternative carbapenem-based regimen',
      },
      monitoring: 'Vancomycin troughs 15-20; lactate; procalcitonin; daily surgical assessment; CT for progression',
    },
    next: 'dni-surgical',
  },
  {
    id: 'dni-surgical',
    type: 'info',
    module: 4,
    title: 'Surgical Management',
    body: '**Surgery is required for most deep neck abscesses.** [1,2,3]\n\n**Indications for surgical drainage:**\n- Frank abscess on imaging (rim-enhancing collection)\n- Clinical fluctuance\n- Failure to improve after 48-72 hours of IV antibiotics\n- Airway compromise\n- Necrotizing infection\n- Mediastinal extension\n\n**Surgical approach:** [1]\n- External transcervical incision and drainage most common\n- Wide debridement for necrotizing infections\n- Multiple drain placement\n- May require repeat operations\n\n**Cases potentially managed medically:** [10]\n- Small phlegmon without abscess\n- Small pediatric retropharyngeal abscess (<2 cm)\n- Early presentation with rapid response to antibiotics\n\n**Key principle:** Low threshold for surgery. Antibiotics alone are often inadequate for established abscesses.',
    citation: [1, 2, 3, 10],
    next: 'dni-complications',
  },

  // ===================================================================
  // MODULE 5: Complications
  // ===================================================================
  {
    id: 'dni-complications',
    type: 'info',
    module: 5,
    title: 'Life-Threatening Complications',
    body: '**Deep neck infections can rapidly progress to fatal complications.** [2,3]\n\n**Descending necrotizing mediastinitis:**\n- Extension via danger space or carotid sheath\n- Mortality 40-60% even with aggressive treatment\n- Requires thoracic surgery consultation\n- CT chest to evaluate extent\n\n**Airway obstruction:**\n- Most common cause of death in Ludwig angina\n- Can occur rapidly with minimal warning\n\n**Sepsis/Septic shock:**\n- Multi-organ failure\n- DIC\n\n**Vascular complications:** [12]\n- Internal jugular vein thrombosis (Lemierre)\n- Carotid artery erosion/pseudoaneurysm\n- Septic emboli (pulmonary, systemic)\n\n**Other:** [2]\n- Aspiration (from abscess rupture)\n- Pericarditis, empyema\n- Osteomyelitis (vertebral, mandibular)',
    citation: [2, 3, 12],
    next: 'dni-mediastinitis',
  },
  {
    id: 'dni-mediastinitis',
    type: 'info',
    module: 5,
    title: 'Descending Necrotizing Mediastinitis',
    body: '**The most feared complication of deep neck infection.** [2,3]\n\nInfection spreads from cervical spaces into the mediastinum via:\n- Danger space (alar to prevertebral fascia)\n- Carotid sheath\n- Pretracheal space\n\n**Clinical predictors of DNM:** [3]\n- Age >=55 years\n- Neutrophil-to-lymphocyte ratio >=13\n- CRP >=30 mg/dL\n- Diabetes mellitus\n\n**Clinical findings:**\n- Chest pain and dyspnea\n- Subcutaneous emphysema extending to chest\n- Rapidly deteriorating sepsis\n- Pericardial/pleural effusions\n\n**Diagnosis:** CT chest with contrast\n\n**Management:** [2,3]\n- Aggressive surgical debridement (often thoracotomy/sternotomy)\n- Broad-spectrum antibiotics\n- ICU admission\n- Cardiothoracic surgery involvement\n- May require multiple operations\n\n**Mortality:** 16-41% with aggressive modern management. [3]',
    citation: [2, 3],
    next: 'dni-consultants',
  },
  {
    id: 'dni-consultants',
    type: 'info',
    module: 5,
    title: 'Multidisciplinary Consultation',
    body: '**Deep neck infections require a multidisciplinary team.** [1,2]\n\n**Essential consultations:**\n\n**ENT (Otolaryngology):**\n- All deep neck infections\n- Surgical drainage planning\n- Airway management assistance\n\n**Anesthesia:**\n- Difficult airway planning\n- Awake fiberoptic intubation\n\n**Infectious Disease:**\n- Complex antibiotic regimens\n- Prolonged therapy planning\n- Culture guidance\n\n**Additional consultations as needed:**\n- **Oral/Maxillofacial Surgery:** Odontogenic source, Ludwig angina\n- **Cardiothoracic Surgery:** Mediastinal extension\n- **Interventional Radiology:** CT-guided drainage, vascular complications\n- **Critical Care:** Severe sepsis, post-operative management\n\n**Early consultation improves outcomes.**',
    citation: [1, 2],
    next: 'dni-dispo-branch',
  },

  // ===================================================================
  // MODULE 6: Disposition
  // ===================================================================
  {
    id: 'dni-dispo-branch',
    type: 'question',
    module: 6,
    title: 'Disposition',
    body: 'Determine appropriate disposition based on clinical severity and airway status. [1,2]',
    citation: [1, 2],
    options: [
      {
        label: 'ICU admission',
        description: 'Airway compromise, severe sepsis, necrotizing infection, post-operative',
        next: 'dni-dispo-icu',
        urgency: 'critical',
      },
      {
        label: 'Surgical ward/floor admission',
        description: 'Stable airway, awaiting or post-drainage, IV antibiotics',
        next: 'dni-dispo-floor',
        urgency: 'urgent',
      },
      {
        label: 'Simple peritonsillar abscess',
        description: 'PTA successfully drained, tolerating PO, reliable follow-up',
        next: 'dni-dispo-discharge',
      },
    ],
  },
  {
    id: 'dni-dispo-icu',
    type: 'result',
    module: 6,
    title: 'ICU Admission',
    body: '**ICU admission is required for:** [2]\n\n- Any airway compromise or recent advanced airway\n- Post-operative monitoring after surgical drainage\n- Severe sepsis or septic shock\n- Necrotizing infection\n- Mediastinal involvement\n- Multi-organ dysfunction\n- Need for vasopressors\n\n**ICU management:**\n- Airway monitoring (may need days before extubation safe)\n- Broad-spectrum IV antibiotics\n- Repeat imaging to assess for progression\n- Serial surgical debridement as needed\n- Nutritional support (may need feeding tube)\n\n**DO NOT extubate until swelling resolves and cuff leak test positive.**',
    recommendation: 'ICU admission for airway monitoring, IV antibiotics, and close observation. ENT/surgical team involvement for source control.',
    confidence: 'definitive',
    citation: [2],
  },
  {
    id: 'dni-dispo-floor',
    type: 'result',
    module: 6,
    title: 'Surgical Ward Admission',
    body: '**Floor admission criteria:**\n- Stable airway without imminent compromise\n- Post-drainage with drains in place\n- IV antibiotic therapy\n- No signs of necrotizing infection or mediastinitis\n\n**Ward management:**\n- IV antibiotics per culture/sensitivity\n- Drain management and output monitoring\n- Serial clinical assessment for progression\n- Pain control\n- NPO or soft diet as tolerated\n- Dental extraction once acute infection controlled (if odontogenic)\n\n**Step-down criteria:**\n- Afebrile 48-72 hours\n- Improving swelling and clinical exam\n- Tolerating oral intake\n- Drains removed\n- Transition to oral antibiotics\n\n**Follow-up:** ENT, ID, and dental as indicated.',
    recommendation: 'Admit to surgical ward for IV antibiotics, drain management, and serial monitoring. Involve ENT/oral surgery for source control.',
    confidence: 'recommended',
    citation: [1],
  },
  {
    id: 'dni-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge Criteria (PTA only)',
    body: '**Discharge may be considered for SIMPLE peritonsillar abscess ONLY if:** [14]\n\n- Abscess successfully drained (aspiration or I&D)\n- Pain controlled with oral medications\n- Tolerating oral intake (fluids/soft diet)\n- No signs of extension to deeper spaces\n- Reliable patient with follow-up access\n- No immunocompromise\n- Able to return immediately if worsening\n\n**Discharge medications:**\n- Amoxicillin-clavulanate 875/125 mg PO BID x 10 days, OR\n- Clindamycin 300 mg PO QID x 10 days (if PCN allergy)\n- Analgesics (acetaminophen/NSAIDs, consider short opioid course)\n- Magic mouthwash or viscous lidocaine PRN\n\n**Follow-up:**\n- ENT follow-up within 1-2 weeks\n- Consider elective tonsillectomy for recurrent PTA\n\n**Return precautions:** Fever, worsening pain, difficulty breathing/swallowing, neck swelling.',
    recommendation: 'Discharge with oral antibiotics and close ENT follow-up. Return precautions for any signs of progression or airway concerns.',
    confidence: 'consider',
    citation: [14],
  },
];

export const DEEP_NECK_INFECTION_NODE_COUNT = DEEP_NECK_INFECTION_NODES.length;

export const DEEP_NECK_INFECTION_MODULE_LABELS = [
  'Recognition',
  'Anatomic Spaces',
  'Airway',
  'Antibiotics',
  'Complications',
  'Disposition',
];

export const DEEP_NECK_INFECTION_CITATIONS: Citation[] = [
  { num: 1, text: 'Vieira F, Allen SM, Stocks RM, Thompson JW. Deep neck infections. Otolaryngol Clin North Am. 2008;41(3):459-483.' },
  { num: 2, text: 'Velhonoja J, Lahtinen O, Irjala H, et al. Deep neck space infections: an upward trend and changing characteristics. Eur Arch Otorhinolaryngol. 2020;277(3):863-872.' },
  { num: 3, text: 'Boscolo-Rizzo P, Stellin M, Muzzi E, et al. Deep neck infections: a study of 365 cases highlighting recommendations for management and treatment. Eur Arch Otorhinolaryngol. 2012;269(4):1241-1249.' },
  { num: 4, text: 'Reynolds SC, Chow AW. Life-threatening infections of the peripharyngeal and deep fascial spaces of the head and neck. Infect Dis Clin North Am. 2007;21(2):557-576.' },
  { num: 5, text: 'Candamourty R, Venkatachalam S, Babu MR, Kumar GS. Ludwig\'s angina - an emergency: A case report with literature review. J Nat Sci Biol Med. 2012;3(2):206-208.' },
  { num: 6, text: 'Kulkarni AH, Pai SD, Bhattarai B, Rao ST, Ambareesha M. Ludwig\'s angina and airway considerations: a case report. Cases J. 2008;1(1):19.' },
  { num: 7, text: 'Smoker WR. The oral cavity and related spaces: normal and pathologic anatomy. Semin Ultrasound CT MR. 2002;23(5):377-402.' },
  { num: 8, text: 'Page NC, Bauer EM, Lieu JE. Clinical features and treatment of retropharyngeal abscess in children. Otolaryngol Head Neck Surg. 2008;138(3):300-306.' },
  { num: 9, text: 'Bansal A, Miskoff J, Lis RJ. Otolaryngologic critical care. Crit Care Clin. 2003;19(1):55-72.' },
  { num: 10, text: 'Craig FW, Schunk JE. Retropharyngeal abscess in children: clinical presentation, utility of imaging, and current management. Pediatrics. 2003;111(6):1394-1398.' },
  { num: 11, text: 'Miller WD, Furst IM, Sandor GK, Keller MA. A prospective, blinded comparison of clinical examination and computed tomography in deep neck infections. Laryngoscope. 1999;109(11):1873-1879.' },
  { num: 12, text: 'Karkos PD, Asrani S, Karkos CD, et al. Lemierre\'s syndrome: A systematic review. Laryngoscope. 2009;119(8):1552-1559.' },
  { num: 13, text: 'Riordan T. Human infection with Fusobacterium necrophorum (Necrobacillosis), with a focus on Lemierre\'s syndrome. Clin Microbiol Rev. 2007;20(4):622-659.' },
  { num: 14, text: 'Galioto NJ. Peritonsillar abscess. Am Fam Physician. 2017;95(8):501-506.' },
];
