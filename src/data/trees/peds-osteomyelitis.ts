// MedKitt - Pediatric Osteomyelitis
// ED evaluation, empiric antibiotics, imaging strategy, surgical consultation, and transition to oral therapy
// 5 modules: Recognition & Assessment -> Diagnostic Workup -> Empiric Treatment -> Surgical Consultation -> Disposition & Transition
// 27 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const PEDS_OSTEOMYELITIS_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Recognition & Assessment
  // ===================================================================
  {
    id: 'osteo-start',
    type: 'info',
    module: 1,
    title: 'Pediatric Osteomyelitis - Clinical Recognition',
    body: '**Osteomyelitis Quick Reference** - key clinical pearls.\n\nAcute hematogenous osteomyelitis (AHO) is the most common form of bone infection in children. Peak incidence occurs at **ages 12-24 months**. [1,2]\n\n**Definitions:** [1]\n- **Acute:** Symptoms <4 weeks in previously uninfected bone\n- **Subacute:** Symptoms 1-3 months, often insidious\n- **Chronic:** >3 months or relapse after treatment; often has sequestrum\n\n**Key principle:** Empiric antibiotics should be started within **1 hour** of suspicion in ill-appearing children. Cultures (blood and/or bone) should be obtained but should NOT delay treatment. [1,3]',
    images: [
      { src: 'images/peds-osteomyelitis/brodie-abscess-xray.jpg', alt: 'AP radiograph of the distal tibia showing a lytic lesion from subacute staphylococcal osteomyelitis (Brodie abscess)', caption: 'Brodie abscess — lytic lesion in the distal tibia from subacute osteomyelitis. Subacute AHO is more radiographically subtle than acute forms. CC BY-SA 3.0, Jto410. Wikimedia Commons.' },
    ],
    citation: [1, 2, 3],
    next: 'osteo-clinical',

    summary: 'AHO peak at 12-24mo; empiric abx within 1h if ill-appearing; cultures before abx but do not delay treatment',
  },
  {
    id: 'osteo-clinical',
    type: 'info',
    module: 1,
    title: 'Clinical Presentation',
    body: '**Typical presentation varies by age:**\n\n**Infants (<12 months):**\n- Pseudoparalysis (refusal to move limb)\n- Irritability when handled\n- May lack fever\n- Higher risk of joint involvement (transphyseal vessels) [2]\n\n**Toddlers/Preschool (1-5 years):**\n- Limp or refusal to bear weight\n- Localized pain, swelling, warmth\n- Fever (present in ~78% of AHO) [4]\n- *Kingella kingae* predominates in this age group [5]\n\n**School-age/Adolescents:**\n- Localized bone pain and tenderness\n- Fever, malaise\n- Point tenderness over metaphysis\n- May have overlying soft tissue swelling [4]\n\n**Most common sites:** Femur, tibia, humerus (metaphyses of long bones). [1]',
    citation: [1, 2, 4, 5],
    next: 'osteo-septic-arthritis',

    summary: 'Infants: pseudoparalysis, irritability; toddlers: limp, Kingella predominates; school-age: localized bone pain, metaphyseal tenderness',
    skippable: true,
  },
  {
    id: 'osteo-septic-arthritis',
    type: 'question',
    module: 1,
    title: 'Septic Arthritis vs Osteomyelitis',
    body: '**Kocher Criteria** help distinguish septic arthritis from transient synovitis (originally validated for the hip): [6,7]\n\n1. Fever (history of temp >38.5C)\n2. Non-weight bearing\n3. ESR >40 mm/hr\n4. WBC >12,000/mcL\n\n**Caird modification** adds: CRP >20 mg/L [7]\n\n**Probability of septic arthritis:**\n- 0 criteria: <0.2%\n- 1 criterion: 3%\n- 2 criteria: 40%\n- 3 criteria: 93%\n- 4 criteria: 99.6% [6]\n\n**Key clinical point:** Osteomyelitis and septic arthritis can coexist, especially in infants where transphyseal vessels allow spread. Joint effusion with adjacent bone infection requires arthrocentesis. [2,8]',
    citation: [2, 6, 7, 8],
    calculatorLinks: [
      { id: 'kocher-criteria', label: 'Kocher Criteria Calculator' },
    ],
    options: [
      {
        label: 'Concern for septic arthritis',
        description: 'Joint effusion, multiple Kocher criteria met',
        next: 'osteo-joint-aspiration',
        urgency: 'critical',
      },
      {
        label: 'Primary bone involvement suspected',
        description: 'Point tenderness over bone, no joint effusion',
        next: 'osteo-special-populations',
      },
    ],

    summary: 'Kocher criteria: fever, NWB, ESR >40, WBC >12k; osteomyelitis and septic arthritis can coexist especially in infants',
  },
  {
    id: 'osteo-joint-aspiration',
    type: 'info',
    module: 1,
    title: 'Concurrent Septic Arthritis',
    body: '**Septic arthritis is an orthopedic emergency** requiring urgent drainage to prevent cartilage destruction and growth disturbance. [6,8]\n\n**Joint aspiration findings suggesting septic arthritis:**\n- WBC >50,000/mcL (often >100,000)\n- >90% PMNs\n- Low glucose\n- Positive Gram stain (40-70% sensitive) [8]\n\n**Management:**\n- Emergent orthopedic consultation\n- Joint washout/arthrotomy (especially hip)\n- Empiric antibiotics covering *S. aureus*\n\n**Note:** In children <5 years, send synovial fluid for *Kingella kingae* PCR - culture is insensitive for this fastidious organism. [5,9]',
    citation: [5, 6, 8, 9],
    next: 'osteo-special-populations',

    summary: 'Septic arthritis is ortho emergency; WBC >50k in synovial fluid; send Kingella PCR for age <5yr; emergent joint washout',
    safetyLevel: 'critical',
  },
  {
    id: 'osteo-special-populations',
    type: 'question',
    module: 1,
    title: 'Special Populations',
    body: 'Certain populations have unique pathogen considerations that affect empiric antibiotic selection. [1,10,11]',
    citation: [1, 10, 11],
    options: [
      {
        label: 'Sickle cell disease',
        description: 'Risk of Salmonella osteomyelitis in addition to S. aureus',
        next: 'osteo-sickle-cell',
        urgency: 'urgent',
      },
      {
        label: 'Immunocompromised',
        description: 'Malignancy, transplant, chronic steroids',
        next: 'osteo-immunocompromised',
        urgency: 'urgent',
      },
      {
        label: 'Puncture wound through shoe',
        description: 'Risk of Pseudomonas osteomyelitis',
        next: 'osteo-puncture',
      },
      {
        label: 'No special risk factors',
        description: 'Otherwise healthy child',
        next: 'osteo-workup',
      },
    ],
  },

  // ===================================================================
  // MODULE 2: Diagnostic Workup
  // ===================================================================
  {
    id: 'osteo-sickle-cell',
    type: 'info',
    module: 2,
    title: 'Sickle Cell - Osteomyelitis Considerations',
    body: '**Salmonella is disproportionately common** in sickle cell patients due to functional asplenia and bowel ischemia. [10,11]\n\n**Pathogen distribution in SCD osteomyelitis:**\n- *Salmonella* spp: 50-80%\n- *S. aureus*: 25-35%\n- Other gram-negatives: 10% [10]\n\n**Diagnostic challenge:** Bone infarction (vaso-occlusive crisis) mimics osteomyelitis. Key distinguishing features:\n- Fever >72 hours favors osteomyelitis\n- Multiple symmetric sites favor infarction\n- Single asymmetric site favors infection [10]\n\n**MRI** is the imaging modality of choice to differentiate. [1,10]\n\n**Empiric coverage:** Must include **both** *S. aureus* AND *Salmonella* coverage. [10,11]\n\nSee [Sickle Cell Consult](#/tree/sickle-cell) for comprehensive management.',
    citation: [1, 10, 11],
    next: 'osteo-workup',

    summary: 'Sickle cell: Salmonella + S. aureus; immunocompromised: broad spectrum + fungi; puncture wound: Pseudomonas',
  },
  {
    id: 'osteo-immunocompromised',
    type: 'info',
    module: 2,
    title: 'Immunocompromised Host',
    body: '**Broader pathogen spectrum** in immunocompromised children: [1,12]\n\n- *S. aureus* (including MRSA)\n- Gram-negative bacilli (including *Pseudomonas*)\n- Fungi (*Aspergillus*, *Candida*)\n- Mycobacteria (especially in areas of high TB prevalence)\n\n**Empiric regimen:**\n- Broad-spectrum coverage including anti-pseudomonal agent\n- Consider antifungal coverage if neutropenic\n- ID consultation recommended\n\n**Imaging:**\n- MRI preferred\n- Consider atypical sites (vertebrae, pelvis)\n\n**Lower threshold for bone biopsy** to identify pathogen and guide therapy.',
    citation: [1, 12],
    next: 'osteo-workup',
  },
  {
    id: 'osteo-puncture',
    type: 'info',
    module: 2,
    title: 'Puncture Wound Osteomyelitis',
    body: '**Puncture wounds through footwear** (especially rubber-soled shoes) carry specific risk for *Pseudomonas aeruginosa* osteomyelitis. [12]\n\n**Typical presentation:**\n- Puncture wound through shoe 1-3 weeks prior\n- Progressive pain, swelling of foot\n- Often involves small bones (metatarsals, calcaneus)\n\n**Empiric coverage:**\n- Must include anti-pseudomonal agent\n- [Cefepime](#/drug/cefepime/adult meningitis) or [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/sepsis)\n- PLUS coverage for *S. aureus*\n\n**Surgical debridement** is frequently required due to retained foreign body and poor tissue penetration.',
    citation: [12],
    next: 'osteo-workup',
  },
  {
    id: 'osteo-workup',
    type: 'info',
    module: 2,
    title: 'Laboratory Workup',
    body: '**Recommended labs:** [1,3,4]\n\n**Inflammatory markers:**\n- **CRP:** Most useful for monitoring response. May be normal early or in walled-off *S. aureus* infections. Peaks at 2-4 days, normalizes in 9-12 days with appropriate treatment. [3,4]\n- **ESR:** Less dynamic; remains elevated longer. Useful baseline.\n- **Procalcitonin:** >2.0 ng/mL highly specific for invasive bacterial infection. [3]\n\n**WBC count:** Often normal (mean ~10,000). Poor sensitivity for osteomyelitis. [3,4]\n\n**Blood cultures:** Obtain in ALL patients before antibiotics.\n- Positive in ~40-66% of AHO cases [4]\n- May be the only positive culture if bone biopsy not performed\n\n**Serum glucose:** For comparison with bone/joint fluid if aspirated.',
    citation: [1, 3, 4],
    next: 'osteo-imaging',

    summary: 'CRP most useful for monitoring; blood cultures in ALL patients; WBC often normal; procalcitonin >2.0 specific for invasive infection',
  },
  {
    id: 'osteo-imaging',
    type: 'question',
    module: 2,
    title: 'Imaging Strategy',
    body: '**Imaging modalities:** [1,8,13]\n\n**Plain radiographs:**\n- First-line, but insensitive early\n- Changes (periosteal reaction, lytic lesions) take 10-14 days\n- Rule out fracture, tumor\n\n**MRI (gold standard):**\n- 97% sensitive, 92% specific [13]\n- Detects bone marrow edema, abscess, subperiosteal collections\n- Best for defining extent and surgical planning\n\n**Bone scan (Tc-99m):**\n- Useful when MRI unavailable or for multifocal disease\n- 84-100% sensitive [1]\n\n**Ultrasound:**\n- Can detect subperiosteal abscess, joint effusion\n- Operator dependent\n\nSelect imaging approach based on clinical urgency and availability:',
    citation: [1, 8, 13],
    options: [
      {
        label: 'MRI available and child stable',
        description: 'Preferred imaging for diagnosis and surgical planning',
        next: 'osteo-mri-findings',
      },
      {
        label: 'MRI not available or unstable child',
        description: 'Alternative imaging strategy',
        next: 'osteo-alt-imaging',
      },
      {
        label: 'Concern for multifocal disease',
        description: 'Consider bone scan for whole-body evaluation',
        next: 'osteo-multifocal',
      },
    ],

    summary: 'MRI gold standard (97% sensitive); X-ray changes take 10-14 days; bone scan for multifocal screening; US detects subperiosteal abscess',
  },
  {
    id: 'osteo-mri-findings',
    type: 'info',
    module: 2,
    title: 'MRI Findings in Osteomyelitis',
    body: '**Characteristic MRI findings:** [1,8,13]\n\n**T1-weighted:**\n- Decreased signal in affected bone marrow\n- Loss of normal fatty marrow signal\n\n**T2-weighted / STIR:**\n- Increased signal (edema)\n- Best for detecting extent of involvement\n\n**Contrast-enhanced:**\n- Rim-enhancing abscess\n- Non-enhancing areas suggest necrosis\n- Subperiosteal collections\n\n**Features requiring surgical intervention:**\n- Subperiosteal abscess\n- Intraosseous abscess >1 cm\n- Soft tissue abscess\n- Sequestrum formation [1,14]\n\n**Pitfall:** MRI may overestimate extent due to reactive edema. Clinical correlation essential.',
    citation: [1, 8, 13, 14],
    next: 'osteo-pathogens',
  },
  {
    id: 'osteo-alt-imaging',
    type: 'info',
    module: 2,
    title: 'Alternative Imaging Strategy',
    body: '**When MRI is unavailable or child is unstable:**\n\n**Plain radiographs:**\n- Obtain AP and lateral views\n- Look for soft tissue swelling (earliest sign)\n- Periosteal elevation, lytic changes appear >10-14 days [1]\n\n**Ultrasound:**\n- Detects subperiosteal fluid collections\n- Can guide aspiration\n- Limited for intraosseous pathology [8]\n\n**Bone scan (Tc-99m MDP):**\n- Sensitive within 24-48 hours of symptom onset\n- Useful for multifocal disease screening\n- Less specific than MRI [1]\n\n**CT scan:**\n- Better cortical detail than MRI\n- Detects sequestrum well\n- Higher radiation; reserve for specific indications\n\n**Clinical decision:** Start empiric antibiotics. Obtain MRI when patient stabilizes for surgical planning if needed.',
    citation: [1, 8],
    next: 'osteo-pathogens',
  },
  {
    id: 'osteo-multifocal',
    type: 'info',
    module: 2,
    title: 'Multifocal Osteomyelitis',
    body: '**Multifocal AHO occurs in ~7% of cases.** [1]\n\n**Associated with:**\n- Virulent pathogens (MRSA, PVL+ strains)\n- Disseminated infection\n- Immune compromise\n\n**Imaging approach:**\n- **Bone scan** (Tc-99m MDP): Best for whole-body screening\n- Follow with **MRI** of affected regions for detail\n- Consider **PET/CT** if occult malignancy a concern\n\n**Higher morbidity:**\n- Longer antibiotic courses\n- More surgical interventions\n- Greater risk of chronic osteomyelitis [1,14]\n\n**Pathogen identification** is critical - consider bone biopsy at multiple sites if feasible.',
    citation: [1, 14],
    next: 'osteo-pathogens',
  },

  // ===================================================================
  // MODULE 3: Empiric Treatment
  // ===================================================================
  {
    id: 'osteo-pathogens',
    type: 'info',
    module: 3,
    title: 'Pathogens by Age',
    body: '**Most common pathogens by age group:** [1,2,5,9]\n\n**<3 months (Neonates):**\n- *Staphylococcus aureus*\n- Group B *Streptococcus*\n- Gram-negative bacilli (*E. coli*, *Klebsiella*)\n\n**3 months - 4 years:**\n- **Kingella kingae** (predominant in many regions) [5,9]\n- *Staphylococcus aureus*\n- *Streptococcus pyogenes* (GAS)\n\n**>4 years:**\n- *Staphylococcus aureus* (most common overall)\n- MRSA in areas with high prevalence\n- *Streptococcus pyogenes*\n\n**Special situations:**\n- Sickle cell: *Salmonella*, *S. aureus* [10]\n- Puncture wound: *Pseudomonas* [12]\n- Immunocompromised: Broader spectrum including fungi [12]',
    citation: [1, 2, 5, 9, 10, 12],
    next: 'osteo-mrsa-risk',

    summary: '<3mo: S. aureus, GBS, gram-neg; 3mo-4yr: Kingella kingae predominant; >4yr: S. aureus most common overall',
    skippable: true,
  },
  {
    id: 'osteo-mrsa-risk',
    type: 'question',
    module: 3,
    title: 'MRSA Risk Assessment',
    body: 'Empiric antibiotic selection depends on local MRSA prevalence and individual risk factors. [1,3]\n\n**MRSA risk factors:**\n- Prior MRSA infection or colonization\n- Local community MRSA prevalence >10-15%\n- Recent hospitalization\n- Recurrent skin/soft tissue infections\n- Household contact with MRSA [1]\n\n**MRSA osteomyelitis features:**\n- More severe illness\n- Higher rates of DVT, pulmonary emboli\n- More surgical interventions\n- Longer hospital stays [1,3]',
    citation: [1, 3],
    options: [
      {
        label: 'High MRSA risk or ill-appearing',
        description: 'MRSA coverage indicated',
        next: 'osteo-abx-mrsa',
        urgency: 'urgent',
      },
      {
        label: 'Low MRSA risk, stable child',
        description: 'MSSA coverage may be adequate',
        next: 'osteo-abx-mssa',
      },
      {
        label: 'Age <4 years',
        description: 'Consider Kingella coverage',
        next: 'osteo-abx-young',
      },
    ],
  },
  {
    id: 'osteo-abx-mrsa',
    type: 'info',
    module: 3,
    title: 'Empiric Antibiotics - MRSA Coverage',
    body: '**First-line MRSA regimen:** [1,3]\n\n[Vancomycin](#/drug/vancomycin/peds osteomyelitis) 15 mg/kg IV q6h (max 60 mg/kg/day)\n- Trough goal: 15-20 mcg/mL for serious MRSA infections\n- Excellent bone penetration\n- Monitor renal function\n\n**Alternative:**\n[Clindamycin](#/drug/clindamycin/peds osteomyelitis) 10-13 mg/kg IV q8h (max 40 mg/kg/day)\n- Good oral bioavailability for step-down\n- Check local D-test resistance rates\n- Avoid if D-test positive (inducible resistance)\n\n**Add gram-negative coverage if:**\n- Neonates\n- Sickle cell disease (Salmonella coverage)\n- Puncture wound (Pseudomonas coverage)\n- Immunocompromised [1,10,12]',
    citation: [1, 3, 10, 12],
    treatment: {
      firstLine: {
        drug: 'Vancomycin',
        dose: '15 mg/kg',
        route: 'IV',
        frequency: 'q6h',
        duration: 'Until culture results and clinical improvement',
        notes: 'Trough goal 15-20 mcg/mL; max 60 mg/kg/day',
      },
      alternative: {
        drug: 'Clindamycin',
        dose: '10-13 mg/kg',
        route: 'IV',
        frequency: 'q8h',
        duration: 'Until culture results and clinical improvement',
        notes: 'Good oral bioavailability; check D-test; max 40 mg/kg/day',
      },
      monitoring: 'Vancomycin troughs; renal function; CRP trend',
    },
    next: 'osteo-surgical-consult',
  },
  {
    id: 'osteo-abx-mssa',
    type: 'info',
    module: 3,
    title: 'Empiric Antibiotics - MSSA Coverage',
    body: '**First-line MSSA regimen:** [1,3]\n\n[Cefazolin](#/drug/cefazolin/osteomyelitis) 33 mg/kg IV q8h (max 6g/day)\n- Excellent MSSA coverage\n- Good bone penetration\n- Low risk of resistance induction\n\n**Alternative:**\n**Nafcillin** 50 mg/kg IV q6h\n- More narrow spectrum\n- Higher rates of phlebitis\n\n**Transition to oral:**\n[Cephalexin](#/drug/cephalexin/osteomyelitis) 25-30 mg/kg PO q8h\n- Excellent bioavailability\n- First-line for oral step-down\n\n**If cultures return MRSA:** Escalate to vancomycin or clindamycin based on sensitivities. [1]',
    citation: [1, 3],
    treatment: {
      firstLine: {
        drug: 'Cefazolin',
        dose: '33 mg/kg',
        route: 'IV',
        frequency: 'q8h',
        duration: 'Until clinical improvement, then transition to oral',
        notes: 'Max 6g/day; good bone penetration',
      },
      alternative: {
        drug: 'Nafcillin',
        dose: '50 mg/kg',
        route: 'IV',
        frequency: 'q6h',
        duration: 'Until clinical improvement',
        notes: 'Monitor for phlebitis',
      },
      monitoring: 'CRP trend; clinical response; watch for culture results',
    },
    next: 'osteo-surgical-consult',
  },
  {
    id: 'osteo-abx-young',
    type: 'info',
    module: 3,
    title: 'Empiric Antibiotics - Age <4 Years',
    body: '***Kingella kingae* considerations:** [5,9]\n\n*K. kingae* is the **most common pathogen** in children 6 months - 4 years in many regions. [5]\n\n**Characteristics:**\n- Fastidious organism - standard cultures often negative\n- Requires PCR or enriched culture techniques\n- Mild clinical presentation (low-grade fever, modest CRP)\n- Excellent prognosis with appropriate treatment [5,9]\n\n**K. kingae antibiotic sensitivities:**\n- Susceptible to: Beta-lactams, aminoglycosides, fluoroquinolones\n- **Resistant to:** Vancomycin, clindamycin [5,9]\n\n**First-line regimen:**\n[Cefazolin](#/drug/cefazolin/osteomyelitis) 33 mg/kg IV q8h\n- Covers both *K. kingae* AND *S. aureus*\n- Do NOT use clindamycin alone in this age group\n\n**Oral step-down:**\n[Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/osteomyelitis) or cephalexin',
    citation: [5, 9],
    treatment: {
      firstLine: {
        drug: 'Cefazolin',
        dose: '33 mg/kg',
        route: 'IV',
        frequency: 'q8h',
        duration: 'Until improvement, then oral transition',
        notes: 'Covers Kingella AND S. aureus; do NOT use clindamycin alone <4 years',
      },
      alternative: {
        drug: 'Amoxicillin-clavulanate',
        dose: '90 mg/kg/day (amoxicillin component)',
        route: 'PO',
        frequency: 'divided q12h',
        duration: 'Oral step-down option',
        notes: 'Good Kingella coverage; alternative for oral transition',
      },
      monitoring: 'Clinical response; CRP trend; consider K. kingae PCR if available',
    },
    next: 'osteo-surgical-consult',
  },

  // ===================================================================
  // MODULE 4: Surgical Consultation
  // ===================================================================
  {
    id: 'osteo-surgical-consult',
    type: 'question',
    module: 4,
    title: 'Surgical Consultation Criteria',
    body: '**Orthopedic consultation is recommended for all cases of AHO.** [1,14]\n\n**Indications for urgent surgical intervention:** [1,14]\n- Subperiosteal or intraosseous abscess\n- Sequestrum (dead bone)\n- Concurrent septic arthritis\n- Failure to improve after 48-72 hours of appropriate antibiotics\n- Need for pathogen identification (bone biopsy)\n\n**Role of surgery:**\n- Drainage of abscess/pus\n- Debridement of necrotic tissue\n- Culture and pathogen identification\n- Decompression of intraosseous pressure [14]',
    citation: [1, 14],
    options: [
      {
        label: 'Surgical criteria met',
        description: 'Abscess, septic arthritis, or need for biopsy',
        next: 'osteo-surgical-mgmt',
        urgency: 'urgent',
      },
      {
        label: 'No immediate surgical indication',
        description: 'Uncomplicated AHO, plan for medical management',
        next: 'osteo-response-monitoring',
      },
    ],
  },
  {
    id: 'osteo-surgical-mgmt',
    type: 'info',
    module: 4,
    title: 'Surgical Management',
    body: '**Surgical procedures:** [1,14]\n\n**Bone aspiration/biopsy:**\n- Fluoroscopic or ultrasound-guided\n- Obtain tissue for culture and histology\n- Consider if blood cultures negative\n\n**Debridement:**\n- Removal of necrotic bone and tissue\n- Curettage of abscess cavity\n- May require multiple procedures\n\n**Drainage:**\n- Subperiosteal abscess drainage\n- Joint washout if concurrent septic arthritis\n\n**Considerations:**\n- Minimize damage to growth plate (physis)\n- Preserve blood supply to bone\n- Consider wound VAC for complex cases [14]\n\n**Post-operative:**\n- Continue IV antibiotics\n- Monitor drain output if placed\n- Repeat imaging if poor response',
    citation: [1, 14],
    next: 'osteo-response-monitoring',
  },
  {
    id: 'osteo-response-monitoring',
    type: 'info',
    module: 4,
    title: 'Monitoring Treatment Response',
    body: '**Markers of clinical improvement:** [1,3,4]\n\n**Clinical:**\n- Resolution of fever (typically 24-72 hours)\n- Decreased pain and swelling\n- Return of limb function\n- Improved appetite and activity\n\n**Laboratory:**\n- **CRP:** Most useful marker. Should decrease by 50% within 2-4 days of effective treatment. Return to normal in 9-12 days. [3,4]\n- **ESR:** Slower to respond; may remain elevated for weeks. Less useful for acute monitoring.\n\n**Poor response indicators:**\n- Persistent fever >72 hours\n- Rising or plateau of CRP\n- Clinical deterioration\n- New abscess formation\n\n**If poor response:** Consider:\n- Repeat imaging (MRI)\n- Surgical drainage/debridement\n- Alternative pathogens (MRSA, resistant organisms)\n- Drug-resistant organism',
    citation: [1, 3, 4],
    calculatorLinks: [
      { id: 'crp-trend', label: 'CRP Trend Tracker' },
    ],
    next: 'osteo-oral-transition',
  },

  // ===================================================================
  // MODULE 5: Disposition & Transition to Oral Therapy
  // ===================================================================
  {
    id: 'osteo-oral-transition',
    type: 'info',
    module: 5,
    title: 'Transition to Oral Therapy',
    body: '**PIDS/IDSA guidelines recommend early transition to oral therapy.** [1]\n\n**Criteria for oral transition:** [1,3]\n- Significant clinical improvement\n- Afebrile for 24-48 hours\n- Tolerating oral intake\n- CRP decreasing (by 50% or to <20-30 mg/L)\n- Reliable oral option based on pathogen/sensitivities\n- Compliant family, reliable follow-up\n\n**Typical IV duration:** 2-7 days (median 3-4 days in recent studies) [1]\n\n**Oral antibiotics must achieve adequate bone levels:**\n- High doses required\n- Bioavailability critical\n- Avoid agents with poor bone penetration\n\n**Benefits of early oral transition:**\n- Reduced IV complications (CLABSI, thrombosis)\n- Shorter hospitalization\n- Lower costs\n- Similar outcomes to prolonged IV therapy [1]',
    citation: [1, 3],
    calculatorLinks: [
      { id: 'iv-oral-transition', label: 'IV-to-Oral Criteria' },
    ],
    next: 'osteo-oral-regimens',

    summary: 'PIDS/IDSA: early oral transition safe; criteria: afebrile 24-48h, tolerating PO, CRP decreasing; typical IV 2-7 days',
  },
  {
    id: 'osteo-oral-regimens',
    type: 'info',
    module: 5,
    title: 'Oral Antibiotic Options',
    body: '**Oral step-down regimens:** [1,3]\n\n**For MSSA:**\n- [Cephalexin](#/drug/cephalexin/osteomyelitis) 25-30 mg/kg PO q8h\n- High bioavailability, well-tolerated\n\n**For MRSA (if susceptible):**\n- [Clindamycin](#/drug/clindamycin/peds osteomyelitis) 10-13 mg/kg PO q8h\n- 90% oral bioavailability\n- Check D-test sensitivity\n\n**For MRSA (clindamycin-resistant):**\n- [Trimethoprim-sulfamethoxazole](#/drug/tmp-smx/osteomyelitis) 5 mg/kg TMP PO q12h\n- PLUS [Rifampin](#/drug/rifampin/osteomyelitis) 10 mg/kg PO q12h\n- Rifampin should NOT be used as monotherapy\n\n**For Kingella kingae (age <4):**\n- [Amoxicillin-clavulanate](#/drug/amoxicillin-clavulanate/osteomyelitis) 90 mg/kg/day PO divided q12h\n- OR cephalexin\n\n**Total duration:** Typically 3-4 weeks total. Shorter courses (2-3 weeks) may be adequate for uncomplicated cases with rapid response. [1]',
    citation: [1, 3],
    treatment: {
      firstLine: {
        drug: 'Cephalexin (MSSA)',
        dose: '25-30 mg/kg',
        route: 'PO',
        frequency: 'q8h',
        duration: 'Total course 3-4 weeks',
        notes: 'High bioavailability; first-line for MSSA',
      },
      alternative: {
        drug: 'Clindamycin (MRSA)',
        dose: '10-13 mg/kg',
        route: 'PO',
        frequency: 'q8h',
        duration: 'Total course 3-4 weeks',
        notes: '90% bioavailability; check D-test',
      },
      monitoring: 'Weekly CRP until normalized; clinical reassessment',
    },
    next: 'osteo-disposition',
  },
  {
    id: 'osteo-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Determine appropriate level of care based on clinical status and treatment needs. [1]',
    citation: [1],
    options: [
      {
        label: 'Discharge on oral antibiotics',
        description: 'Meets oral transition criteria, reliable follow-up',
        next: 'osteo-discharge',
      },
      {
        label: 'Continue inpatient IV therapy',
        description: 'Does not yet meet oral criteria, or complicated course',
        next: 'osteo-inpatient',
        urgency: 'urgent',
      },
      {
        label: 'Outpatient parenteral therapy (OPAT)',
        description: 'Stable but requires continued IV, home infusion possible',
        next: 'osteo-opat',
      },
    ],
  },
  {
    id: 'osteo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge on Oral Antibiotics',
    body: '**Discharge criteria met:**\n- Afebrile >24-48 hours\n- Clinical improvement (decreased pain, improved mobility)\n- CRP decreasing or normalized\n- Tolerating oral intake\n- Oral antibiotic with appropriate spectrum available\n- Family demonstrates medication administration understanding\n- Follow-up arranged\n\n**Discharge instructions:**\n- Complete full antibiotic course (typically 3-4 weeks total)\n- Take antibiotics with food if GI upset\n- Activity restrictions per orthopedics\n- Return precautions: fever, increased pain, redness, swelling\n\n**Follow-up:**\n- Orthopedics: 1-2 weeks\n- Primary care or ID: 1 week for clinical assessment\n- Labs: CRP at 1-2 weeks to confirm continued improvement [1,3]',
    recommendation: 'Discharge with oral antibiotics. Ensure follow-up with orthopedics and primary care. Total antibiotic duration 3-4 weeks.',
    confidence: 'recommended',
    citation: [1, 3],
  },
  {
    id: 'osteo-inpatient',
    type: 'result',
    module: 5,
    title: 'Continue Inpatient Therapy',
    body: '**Continue hospital admission for:**\n- Ongoing IV antibiotic therapy\n- Clinical monitoring\n- Pending culture results\n- Pain management\n- Surgical intervention if needed\n\n**Daily assessment:**\n- Fever curve\n- Pain score and analgesic requirements\n- Limb examination (swelling, erythema, range of motion)\n- CRP trending (every 2-3 days)\n\n**Criteria for reassessment of surgical need:**\n- No improvement after 48-72 hours\n- Rising CRP\n- New symptoms suggesting abscess\n\n**Consults:**\n- Orthopedics (all cases)\n- Infectious disease (complex cases, MRSA, multifocal)',
    recommendation: 'Continue inpatient IV antibiotics. Daily clinical and laboratory monitoring. Orthopedics consultation.',
    confidence: 'recommended',
    citation: [1],
  },
  {
    id: 'osteo-opat',
    type: 'result',
    module: 5,
    title: 'Outpatient Parenteral Therapy (OPAT)',
    body: '**OPAT may be appropriate when:** [1]\n- Clinically improved but oral option not available/suitable\n- Stable for discharge\n- Reliable family and home infusion support\n- PICC line can be placed\n\n**Common OPAT regimens:**\n- Ceftriaxone 50-100 mg/kg IV q24h (once daily dosing)\n- Vancomycin via home infusion (requires monitoring)\n\n**OPAT considerations:**\n- PICC line care and monitoring\n- Weekly labs (CBC, CMP, drug levels)\n- Regular clinic follow-up\n- Risk of line complications (infection, clot, dislodgement)\n\n**Duration:** Typically until criteria for oral transition are met, then switch to oral. [1]\n\n**Recent evidence suggests early oral transition has similar outcomes to prolonged IV therapy, with fewer complications.** Consider oral transition over prolonged OPAT when feasible. [1]',
    recommendation: 'OPAT with home IV therapy and close monitoring. Consider early transition to oral antibiotics when criteria met.',
    confidence: 'consider',
    citation: [1],
  },
];

export const PEDS_OSTEOMYELITIS_NODE_COUNT = PEDS_OSTEOMYELITIS_NODES.length;

export const PEDS_OSTEOMYELITIS_MODULE_LABELS = [
  'Recognition & Assessment',
  'Diagnostic Workup',
  'Empiric Treatment',
  'Surgical Consultation',
  'Disposition & Transition',
];

export const PEDS_OSTEOMYELITIS_CRITICAL_ACTIONS = [
  { text: 'MRI gold standard for diagnosis (sensitivity 90-100%), get within 24-48h', nodeId: 'osteo-imaging' },
  { text: 'Blood cultures before antibiotics (positive in 30-60%)', nodeId: 'osteo-labs' },
  { text: 'Empiric antibiotics: Vancomycin + ceftriaxone (covers MRSA + typical organisms)', nodeId: 'osteo-empiric-abx' },
  { text: 'CRP and ESR for baseline (CRP >2 mg/dL or ESR >20 mm/hr suggestive)', nodeId: 'osteo-labs' },
  { text: 'Orthopedic surgery consult for abscess, septic arthritis, or vertebral osteomyelitis', nodeId: 'osteo-ortho-consult' },
  { text: 'IV to PO transition when afebrile 24-48h, CRP improving, clinically better', nodeId: 'osteo-iv-to-po' },
  { text: 'Total antibiotic duration 3-4 weeks minimum (longer for complications)', nodeId: 'osteo-duration' },
  { text: 'Avoid NSAIDs until infection controlled (may mask fever and delay diagnosis)', nodeId: 'osteo-pain' },
  { text: 'S. aureus most common (50-70%), increasing MRSA prevalence', nodeId: 'osteo-organisms' },
  { text: 'Weight-bearing as tolerated - immobilization NOT required', nodeId: 'osteo-activity' },
];

export const PEDS_OSTEOMYELITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Woods CR, Bradley JS, Chatterjee A, et al. Clinical Practice Guideline by the Pediatric Infectious Diseases Society and the Infectious Diseases Society of America: 2021 Guideline on Diagnosis and Management of Acute Hematogenous Osteomyelitis in Pediatrics. J Pediatric Infect Dis Soc. 2021;10(8):801-844.' },
  { num: 2, text: 'Dartnell J, Ramachandran M, Katchburian M. Haematogenous acute and subacute paediatric osteomyelitis: a systematic review of the literature. J Bone Joint Surg Br. 2012;94(5):584-595.' },
  { num: 3, text: 'ACEP Now. Case Report: Five Days of Fever. Accessed 2026.' },
  { num: 4, text: 'Peltola H, Paakkonen M. Acute osteomyelitis in children. N Engl J Med. 2014;370(4):352-360.' },
  { num: 5, text: 'Yagupsky P, Porsch E, St Geme JW 3rd. Kingella kingae: an emerging pathogen in young children. Pediatrics. 2011;127(3):557-565.' },
  { num: 6, text: 'Kocher MS, Zurakowski D, Kasser JR. Differentiating between septic arthritis and transient synovitis of the hip in children: an evidence-based clinical prediction algorithm. J Bone Joint Surg Am. 1999;81(12):1662-1670.' },
  { num: 7, text: 'Caird MS, Flynn JM, Leung YL, et al. Factors distinguishing septic arthritis from transient synovitis of the hip in children. A prospective study. J Bone Joint Surg Am. 2006;88(6):1251-1257.' },
  { num: 8, text: 'Monsalve J, Navarro V, Daly MC, et al. Pediatric Musculoskeletal Infection: Trends and Antibiotic Recommendations. J Am Acad Orthop Surg. 2017;25(12):e259-e268.' },
  { num: 9, text: 'Ceroni D, Cherkaoui A, Ferey S, et al. Kingella kingae osteoarticular infections in young children: clinical features and contribution of a new specific real-time PCR assay to the diagnosis. J Pediatr Orthop. 2010;30(3):301-304.' },
  { num: 10, text: 'Chambers JB, Forsythe DA, Bertrand SL, et al. Retrospective review of osteoarticular infections in a pediatric sickle cell age group. J Pediatr Orthop. 2000;20(5):682-685.' },
  { num: 11, text: 'Nwafor CA, Agwu JC, Okafor PU, et al. Mini review Salmonella: A problem in patients with sickle cell anemia. Microb Pathog. 2021;159:105143.' },
  { num: 12, text: 'Lew DP, Waldvogel FA. Osteomyelitis. Lancet. 2004;364(9431):369-379.' },
  { num: 13, text: 'Jaramillo D. Infection: musculoskeletal. Pediatr Radiol. 2011;41 Suppl 1:S127-S134.' },
  { num: 14, text: 'Calhoun JH, Manring MM. Adult osteomyelitis. Infect Dis Clin North Am. 2005;19(4):765-786.' },
];
