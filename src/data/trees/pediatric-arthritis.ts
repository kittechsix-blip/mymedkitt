// MedKitt - Pediatric Arthritis
// Comprehensive 6-module approach to joint pain and arthritis in the pediatric ED.
// Initial Assessment -> Septic vs Transient -> JIA & Chronic -> Reactive & Post-Infectious -> Red Flags & Mimics -> Treatment & Disposition
// Sources: PIDS/IDSA 2023, Kocher 1999, Caird 2006, AHA Jones Criteria 2015, PECARN
// 43 nodes total

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const PEDIATRIC_ARTHRITIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'peds-arth-start',
    type: 'info',
    module: 1,
    title: 'Pediatric Arthritis: Initial Assessment',
    body: '**Joint pain is common (5% of pediatric ED visits) but includes life- and limb-threatening diagnoses.**\n\n**The "Big 6" Not to Miss:**\n1. **Septic arthritis** - cartilage destruction within hours\n2. **Osteomyelitis** - often presents as joint pain\n3. **Malignancy** - leukemia presents with bone/joint pain in 25-43%\n4. **SCFE** - orthopedic emergency if unstable\n5. **Non-accidental injury** - always consider in young children\n6. **Inflammatory arthritis** - requires timely diagnosis\n\n**Initial Assessment Framework:**\n1. **Is the child sick or well?**\n2. **Is there TRUE arthritis?** (swelling, warmth, effusion, decreased ROM)\n3. **Monoarticular or polyarticular?**\n4. **What is the age?** (guides differential)\n5. **Is there fever?** (key discriminating factor)\n\n**Pearl:** Pain > swelling suggests infection or malignancy. Swelling > pain suggests inflammatory arthritis. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'peds-arth-pattern-matcher', label: 'Age/Pattern Differential' },
    ],
    next: 'peds-arth-sick-well',
  },

  {
    id: 'peds-arth-sick-well',
    type: 'question',
    module: 1,
    title: 'Is the Child Sick or Well?',
    body: '**Septic arthritis, osteomyelitis, and malignancy present with systemically ill children.**\n\n**Signs of ill appearance:**\n- High fever (>38.5C / 101.3F)\n- Toxic-appearing, listless\n- Refuses to bear weight\n- Severe pain with any movement\n- Tachycardia, poor perfusion\n\n**Signs of well appearance:**\n- Afebrile or low-grade fever\n- Active, playful between exams\n- Will bear weight (even with limp)\n- Pain with extremes of motion only\n- Normal vital signs\n\n**Critical Question:** Can the child bear weight on the affected limb?',
    citation: [1, 2],
    options: [
      { label: 'ILL-appearing', description: 'Fever, toxic, refuses weight-bearing, severe pain', next: 'peds-arth-septic-workup', urgency: 'critical' },
      { label: 'WELL-appearing', description: 'Afebrile or low-grade, active, will bear weight', next: 'peds-arth-joint-count' },
      { label: 'Hip pain specifically', description: 'Hip/groin/thigh pain (any appearance)', next: 'peds-arth-hip-approach' },
    ],
  },

  {
    id: 'peds-arth-joint-count',
    type: 'question',
    module: 1,
    title: 'Joint Involvement Pattern',
    body: '**Monoarticular vs polyarticular guides differential significantly.**\n\n**Monoarticular (single joint):**\n- Septic arthritis (until proven otherwise)\n- Transient synovitis\n- Trauma\n- Osteomyelitis (near joint)\n- Lyme arthritis\n- Early JIA (oligoarticular)\n\n**Oligoarticular (2-4 joints):**\n- JIA (most common)\n- Reactive arthritis\n- HSP\n- Early polyarticular process\n\n**Polyarticular (5+ joints):**\n- JIA (RF+ or RF-)\n- Systemic JIA\n- Viral arthritis\n- Acute rheumatic fever\n- SLE, other CTD\n\nHow many joints are involved?',
    citation: [2, 3],
    options: [
      { label: 'Single joint (monoarticular)', description: 'One joint affected', next: 'peds-arth-mono-duration' },
      { label: '2-4 joints (oligoarticular)', description: 'Few joints affected', next: 'peds-arth-oligo-eval' },
      { label: '5+ joints (polyarticular)', description: 'Many joints affected', next: 'peds-arth-poly-eval' },
    ],
  },

  {
    id: 'peds-arth-mono-duration',
    type: 'question',
    module: 1,
    title: 'Duration of Symptoms',
    body: '**Duration helps differentiate acute infectious from chronic inflammatory causes.**\n\n**Acute (<2 weeks):**\n- Septic arthritis\n- Transient synovitis\n- Trauma\n- Reactive arthritis (post-viral/enteric)\n- Lyme arthritis\n- Osteomyelitis\n\n**Subacute (2-6 weeks):**\n- Evolving JIA\n- Reactive arthritis\n- Post-streptococcal\n- Chronic osteomyelitis\n\n**Chronic (>6 weeks):**\n- JIA (by definition)\n- Lyme arthritis (recurrent)\n- Malignancy\n- Orthopedic causes (Perthes, SCFE)\n\n**Pearl:** JIA requires symptoms >6 weeks for diagnosis. Acute presentations should focus on ruling out infection.',
    citation: [2, 3],
    options: [
      { label: 'Acute (<2 weeks)', description: 'Recent onset symptoms', next: 'peds-arth-acute-mono' },
      { label: 'Subacute/Chronic (>2 weeks)', description: 'Prolonged symptoms', next: 'peds-arth-chronic-eval' },
    ],
  },

  {
    id: 'peds-arth-acute-mono',
    type: 'question',
    module: 1,
    title: 'Acute Monoarticular Arthritis',
    body: '**Acute monoarticular arthritis = SEPTIC ARTHRITIS until proven otherwise.**\n\n**Key differentiating features:**\n\n| Feature | Septic Arthritis | Transient Synovitis |\n|---------|-----------------|---------------------|\n| Appearance | Ill/toxic | Well |\n| Fever | High (>38.5C) | Absent or low-grade |\n| Weight bearing | Refuses | Usually preserved |\n| ESR | >40 mm/hr | <20 mm/hr |\n| CRP | >20 mg/L | <20 mg/L |\n| WBC | >12,000 | <12,000 |\n\n**Most common joints:**\n- **Knee (40%)** - most common overall\n- **Hip (25%)** - highest morbidity if missed\n- **Ankle (15%)**\n- **Elbow, wrist, shoulder** - less common\n\nWhich joint is primarily affected?',
    citation: [1, 4],
    calculatorLinks: [
      { id: 'peds-arth-kocher', label: 'Kocher Criteria' },
      { id: 'peds-arth-caird', label: 'Caird Criteria (Modified Kocher)' },
    ],
    options: [
      { label: 'Hip', description: 'Hip, groin, or referred thigh/knee pain', next: 'peds-arth-hip-approach' },
      { label: 'Knee', description: 'Knee swelling/pain', next: 'peds-arth-knee-approach' },
      { label: 'Other joint', description: 'Ankle, elbow, wrist, shoulder', next: 'peds-arth-other-joint' },
    ],
  },

  // =====================================================================
  // MODULE 2: SEPTIC VS TRANSIENT SYNOVITIS
  // =====================================================================

  {
    id: 'peds-arth-hip-approach',
    type: 'info',
    module: 2,
    title: 'Hip Pain: The Classic Pediatric Dilemma',
    body: '**Transient synovitis vs septic hip is the defining ED challenge.**\n\n**Both present with:**\n- Atraumatic, acutely irritable hip\n- Limp or refusal to bear weight\n- Limited range of motion\n- Possible effusion on ultrasound\n\n**Position of comfort:**\n- Hip held in flexion, abduction, external rotation (FABER)\n- This position maximizes joint capsule volume\n\n**Ultrasound findings:**\n- Effusion present in BOTH conditions\n- Effusion >5mm capsule-to-bone OR >2mm compared to other side\n- **Effusion does NOT differentiate** - present in 46-86% of transient synovitis\n\n**Age distribution:**\n- **Transient synovitis:** 3-8 years (peak 4-5 years)\n- **Septic arthritis:** Any age, peak <3 years\n\n**History clue:** Recent viral URI in transient synovitis (in ~1/3 of cases)\n\n**ALWAYS examine the knee** when evaluating hip pain - referred pain is common. [1][4][5]',
    citation: [1, 4, 5],
    calculatorLinks: [
      { id: 'peds-arth-kocher', label: 'Kocher Criteria' },
      { id: 'peds-arth-caird', label: 'Caird Criteria' },
    ],
    next: 'peds-arth-kocher-eval',
  },

  {
    id: 'peds-arth-kocher-eval',
    type: 'question',
    module: 2,
    title: 'Kocher/Caird Criteria Assessment',
    body: '**Kocher Criteria (4 factors) - Probability of Septic Hip:**\n\n| # Criteria | Probability |\n|------------|-------------|\n| 0 | <0.2% |\n| 1 | 3.0% |\n| 2 | 40.0% |\n| 3 | 93.1% |\n| 4 | 99.6% |\n\n**The 4 Criteria:**\n1. Fever (history of temperature >38.5C)\n2. Non-weight bearing\n3. ESR >40 mm/hr\n4. WBC >12,000/mm3\n\n**Caird Modification adds CRP >20 mg/L as 5th criterion.**\n\n**Critical Limitation:** These criteria were developed before Kingella kingae was recognized as a major pathogen. K. kingae infections present with milder inflammatory markers.\n\n**Best independent predictors:**\n- CRP >20 mg/L (strongest single predictor)\n- Refusal to bear weight (OR 14.5)\n- **If CRP <20 AND weight-bearing: <1% chance of septic arthritis**\n\nHow many criteria are present?',
    citation: [4, 5],
    calculatorLinks: [
      { id: 'peds-arth-kocher', label: 'Kocher Score Calculator' },
      { id: 'peds-arth-caird', label: 'Caird Score Calculator' },
    ],
    options: [
      { label: '0 criteria', description: 'Low risk (<0.2%)', next: 'peds-arth-low-risk-hip' },
      { label: '1-2 criteria', description: 'Intermediate risk (3-40%)', next: 'peds-arth-intermediate-hip' },
      { label: '3-4+ criteria', description: 'High risk (>93%)', next: 'peds-arth-septic-workup', urgency: 'critical' },
    ],
  },

  {
    id: 'peds-arth-low-risk-hip',
    type: 'result',
    module: 2,
    title: 'Low Risk Hip (0 Kocher Criteria)',
    body: '**With 0 criteria present, probability of septic arthritis is <0.2%.**\n\n**This is likely transient synovitis if:**\n- Child appears well\n- Afebrile or low-grade fever only\n- Will bear weight (even with limp)\n- CRP <20 mg/L\n- Recent viral illness\n\n**Management:**\n1. **NSAIDs** - Ibuprofen 10 mg/kg q6-8h or Naproxen 5-7 mg/kg q12h\n2. **Rest** - limit activity until pain-free\n3. **Follow-up** in 24-48 hours if not improving\n\n**Return precautions:**\n- Fever develops (>38.5C)\n- Unable to bear weight\n- Symptoms worsening rather than improving\n- Not significantly better in 3-5 days\n\n**Expected course:** Self-limiting, resolves in 1-2 weeks. Full recovery expected.\n\n**Red flag:** If no improvement in 48-72 hours, reconsider diagnosis and obtain labs/imaging. [5][6]',
    recommendation: 'Likely transient synovitis. Trial of NSAIDs, rest, and close follow-up in 24-48 hours. Return if fever, unable to bear weight, or worsening. Expect resolution in 1-2 weeks.',
    confidence: 'recommended',
    citation: [5, 6],
  },

  {
    id: 'peds-arth-intermediate-hip',
    type: 'info',
    module: 2,
    title: 'Intermediate Risk Hip (1-2 Criteria)',
    body: '**With 1-2 Kocher criteria, probability ranges from 3-40%. This is the diagnostic gray zone.**\n\n**Additional stratification:**\n- **CRP <20 AND weight-bearing:** Very low risk (<1%) - consider observation\n- **CRP >20 OR non-weight-bearing:** Higher risk - strongly consider arthrocentesis\n\n**Decision factors:**\n- Parent/family reliability for follow-up\n- Ability to return if worsening\n- Clinical gestalt (how sick does child look?)\n- Time of day (late night vs morning presentation)\n\n**Options:**\n1. **Observation with serial exams** (if low-risk features)\n   - Recheck in 4-6 hours\n   - Repeat labs if initially elevated\n   - Clear return precautions\n\n2. **Arthrocentesis** (if higher-risk features)\n   - Ultrasound-guided preferred\n   - Definitive diagnosis\n   - Therapeutic if septic (decompresses joint)\n\n**Pearl:** When in doubt, tap the joint. A negative tap provides reassurance; a positive tap guides therapy. [4][5]',
    citation: [4, 5],
    next: 'peds-arth-tap-decision',
  },

  {
    id: 'peds-arth-tap-decision',
    type: 'question',
    module: 2,
    title: 'Arthrocentesis Decision',
    body: '**Arthrocentesis is both diagnostic AND therapeutic.**\n\n**Strong indications for joint aspiration:**\n- CRP >20 mg/L\n- Non-weight bearing\n- Clinical deterioration during observation\n- High parental anxiety / limited follow-up access\n- Provider clinical concern\n\n**Ultrasound guidance:**\n- Confirms effusion presence\n- Identifies optimal needle entry point\n- Reduces failed taps\n- Can be performed by EM or radiology\n\n**Hip aspiration considerations:**\n- Higher technical difficulty than knee\n- Consider orthopedic or IR involvement\n- Anterior approach most common\n- Risk of damage to femoral neurovascular bundle\n\n**If aspiration planned, send fluid for:**\n- Cell count with differential\n- Gram stain\n- Culture (aerobic + consider anaerobic)\n- PCR for Kingella (if available, especially age 6mo-4yr)',
    citation: [1, 4],
    options: [
      { label: 'Proceed with arthrocentesis', description: 'Higher risk features or clinical concern', next: 'peds-arth-synovial-interp' },
      { label: 'Observation trial', description: 'Lower risk features, reliable follow-up', next: 'peds-arth-observation' },
    ],
  },

  {
    id: 'peds-arth-synovial-interp',
    type: 'info',
    module: 2,
    title: 'Synovial Fluid Interpretation',
    body: '**Synovial fluid analysis is the gold standard for distinguishing septic from non-septic arthritis.**\n\n**Interpretation:**\n\n| Parameter | Septic | Inflammatory | Non-inflammatory |\n|-----------|--------|--------------|------------------|\n| WBC count | >50,000/uL | 2,000-50,000/uL | <2,000/uL |\n| PMN % | >90% | 50-80% | <25% |\n| Glucose | Decreased | Normal-low | Normal |\n| Gram stain | May be + | Negative | Negative |\n\n**Key thresholds:**\n- **>50,000 WBC/uL:** Highly suspicious for septic\n- **>100,000 WBC/uL:** Very specific for septic arthritis\n- **<2,000 WBC/uL:** Rules out septic arthritis\n\n**Important caveats:**\n- Partially treated septic arthritis may have lower counts\n- Kingella infections often have lower WBC counts\n- Crystal analysis not typically needed in pediatrics\n- Negative Gram stain does NOT rule out infection (sensitivity ~50%)\n\n**Send cultures even if fluid appears non-purulent.** Culture yield is ~60-80% for septic arthritis. [1][4]',
    citation: [1, 4],
    next: 'peds-arth-septic-workup',
  },

  {
    id: 'peds-arth-observation',
    type: 'result',
    module: 2,
    title: 'Observation Protocol',
    body: '**For intermediate-risk patients choosing observation over immediate arthrocentesis.**\n\n**In-ED observation (4-6 hours):**\n- Serial exams q2h\n- Trial of ibuprofen 10 mg/kg\n- Repeat CRP if initially elevated\n- Reassess weight-bearing\n\n**Favorable signs (supporting transient synovitis):**\n- Improved mobility after NSAID\n- Decreased pain with rest\n- Remains afebrile\n- CRP stable or decreasing\n\n**Concerning signs (prompt arthrocentesis):**\n- Worsening pain despite NSAID\n- Fever develops or increases\n- Unable to bear weight\n- CRP rising\n\n**If discharge from observation:**\n1. NSAIDs around-the-clock x 48h\n2. Strict return precautions\n3. PCP or ED follow-up in 24 hours (mandatory)\n4. Written instructions in family\'s language\n\n**Pearl:** If you are uncomfortable discharging, trust that instinct and tap the joint.',
    recommendation: 'Observation with serial exams, NSAID trial, and mandatory 24-hour follow-up. Return immediately for fever >38.5C, inability to bear weight, or worsening symptoms.',
    confidence: 'consider',
    citation: [4, 5],
  },

  {
    id: 'peds-arth-septic-workup',
    type: 'info',
    module: 2,
    title: 'Septic Arthritis Workup',
    body: '**Septic arthritis is an orthopedic emergency. Time to treatment matters.**\n\n**Cartilage destruction begins within 8 hours of infection.**\n\n**Diagnostic workup:**\n1. **Labs:** CBC, ESR, CRP, blood culture, BMP\n2. **Imaging:** Ultrasound (confirms effusion), X-ray (baseline, rule out fracture/tumor)\n3. **Arthrocentesis:** Cell count, Gram stain, culture, PCR if available\n\n**Consults:**\n- **Orthopedics:** STAT for operative planning\n- **Pediatrics/ID:** For antibiotic guidance if complex case\n\n**Do NOT delay antibiotics** for aspiration if patient is septic. Blood cultures + empiric antibiotics can proceed while arranging OR drainage.\n\n**Hip vs other joints:**\n- **Hip:** Typically requires OR drainage (closed space, difficult aspiration)\n- **Knee:** May be managed with serial aspirations + antibiotics (controversial)\n- Decision often institution/surgeon-dependent\n\n**Age-based pathogen considerations:**\n- <3 months: GBS, S. aureus, gram-negatives, N. gonorrhoeae\n- 3 months-5 years: **Kingella kingae**, S. aureus, Strep species\n- >5 years: S. aureus, Strep pyogenes, N. gonorrhoeae (adolescents) [1][4][7]',
    citation: [1, 4, 7],
    next: 'peds-arth-empiric-abx',
  },

  {
    id: 'peds-arth-empiric-abx',
    type: 'info',
    module: 2,
    title: 'Empiric Antibiotics for Septic Arthritis',
    body: '**Empiric coverage based on age and local MRSA prevalence.**\n\n**Neonates (<3 months):**\n| Regimen | Dose | Notes |\n|---------|------|-------|\n| Cefazolin + Gentamicin | 40 mg/kg q8h + 4 mg/kg q24h | Low MRSA settings |\n| Vancomycin + Cefotaxime | 15 mg/kg q6h + 50 mg/kg q8h | High MRSA or ill-appearing |\n\n**Infants/Children (3 months - 5 years):**\n| Setting | First-Line | Alternative |\n|---------|------------|-------------|\n| Low MRSA (<10-15%) | Cefazolin 40 mg/kg q8h | Clindamycin 10-13 mg/kg q6-8h |\n| High MRSA (>10-15%) | Vancomycin 15 mg/kg q6h | Clindamycin (if local resistance <10%) |\n\n**Older Children/Adolescents (>5 years):**\n| Setting | First-Line | Alternative |\n|---------|------------|-------------|\n| Low MRSA | Cefazolin 40 mg/kg q8h | Clindamycin |\n| High MRSA | Vancomycin 15 mg/kg q6h | Clindamycin |\n| Sexually active | Add Ceftriaxone 50 mg/kg x1 | Cover N. gonorrhoeae |\n\n**Kingella coverage:**\n- Cefazolin and ceftriaxone provide coverage\n- Vancomycin does NOT cover Kingella (add beta-lactam in young children) [1][7]',
    citation: [1, 7],
    treatment: {
      firstLine: {
        drug: 'Cefazolin',
        dose: '40 mg/kg/dose',
        route: 'IV',
        frequency: 'q8h',
        duration: 'Until culture-directed (total 2-4 weeks)',
        notes: 'Max 2000 mg/dose. Use in low MRSA settings. Covers Kingella.',
      },
      alternative: {
        drug: 'Vancomycin',
        dose: '15 mg/kg/dose',
        route: 'IV',
        frequency: 'q6h',
        duration: 'Until culture-directed',
        notes: 'Requires TDM. Use in high MRSA settings. Add cefazolin in young children for Kingella coverage.',
      },
      monitoring: 'Blood cultures daily until negative. CRP trending. Orthopedic follow-up. Consider ID consult for complex cases.',
    },
    next: 'peds-arth-septic-dispo',
  },

  {
    id: 'peds-arth-septic-dispo',
    type: 'result',
    module: 2,
    title: 'Septic Arthritis Disposition',
    body: '**All confirmed or highly suspected septic arthritis requires admission.**\n\n**Disposition:**\n- **Admit** for IV antibiotics and monitoring\n- **OR** for joint washout (hip always, other joints often)\n- **Serial exams** and CRP trending\n\n**Surgical management:**\n- Hip: Open or arthroscopic irrigation and debridement\n- Knee: May attempt serial aspirations vs arthroscopy\n- Other joints: Case-by-case basis\n\n**Expected course:**\n- IV antibiotics until clinically improved and CRP normalizing\n- Transition to oral antibiotics (total course 2-4 weeks)\n- Physical therapy after acute phase\n- Good prognosis if treated promptly (<24-48h)\n\n**Complications of delayed treatment:**\n- Cartilage destruction\n- Growth plate damage\n- Chronic osteomyelitis\n- Joint ankylosis\n- Sepsis, death\n\n**Pearl:** Hip septic arthritis has the worst outcomes if delayed - direct OR involvement is critical. [1][4][7]',
    recommendation: 'Admit for IV antibiotics and operative joint drainage. Orthopedic surgery consultation is mandatory. Prognosis is excellent if treated within 24-48 hours.',
    confidence: 'definitive',
    citation: [1, 4, 7],
  },

  {
    id: 'peds-arth-knee-approach',
    type: 'info',
    module: 2,
    title: 'Knee Pain: Differential Considerations',
    body: '**Knee is the most commonly affected joint in pediatric arthritis.**\n\n**Key differentials for acute knee monoarthritis:**\n1. **Septic arthritis** - ill, febrile, refuses weight-bearing\n2. **Transient synovitis** - less common than hip, but occurs\n3. **Lyme arthritis** - large, swollen knee with minimal pain\n4. **Reactive arthritis** - post-infectious\n5. **Early JIA** - oligoarticular subtype\n6. **Trauma** - fracture, ligament injury\n\n**ALWAYS examine the hip** - hip pathology commonly refers to knee!\n\n**Lyme arthritis clues:**\n- Endemic area (Northeast, upper Midwest US)\n- Large, swollen knee with surprisingly LITTLE pain\n- Child often still active, playing\n- Recurrent episodes over weeks-months\n- May not recall tick bite\n\n**Workup:**\n- Labs: CBC, ESR, CRP, blood culture\n- X-ray: Rule out fracture, osteomyelitis signs\n- Ultrasound: Confirm effusion\n- Lyme serology: In endemic areas\n- Aspiration: If infection suspected [1][8]',
    citation: [1, 8],
    calculatorLinks: [
      { id: 'peds-arth-kocher', label: 'Kocher Criteria' },
    ],
    next: 'peds-arth-lyme-check',
  },

  {
    id: 'peds-arth-lyme-check',
    type: 'question',
    module: 2,
    title: 'Lyme Endemic Area?',
    body: '**Lyme arthritis is the most common manifestation of late Lyme disease in children.**\n\n**Endemic areas (US):**\n- Northeast: CT, DE, MD, MA, NH, NJ, NY, PA, RI, VT\n- Upper Midwest: MN, WI\n- Pacific Coast: Northern CA, OR, WA (less common)\n\n**Lyme arthritis characteristics:**\n- Weeks to months after tick bite (often no recalled bite)\n- Large joint swelling (knee most common)\n- **Significant swelling with minimal pain** (key distinguishing feature)\n- Child often continues normal activities\n- May wax and wane without treatment\n\n**Differentiating Lyme from septic arthritis:**\n\n| Feature | Lyme | Septic |\n|---------|------|--------|\n| Pain | Minimal/mild | Severe |\n| Systemic symptoms | Absent | Present |\n| Kocher criteria | <=1 | Multiple |\n| CRP | Mildly elevated | Very elevated |\n| Weight bearing | Often preserved | Refuses |\n\nIs the patient in a Lyme-endemic area with a large, minimally painful knee effusion?',
    citation: [8],
    options: [
      { label: 'Yes - Lyme endemic, fits pattern', description: 'Large knee, minimal pain, well-appearing', next: 'peds-arth-lyme' },
      { label: 'No - Non-endemic or ill-appearing', description: 'Proceed with standard septic workup', next: 'peds-arth-septic-workup' },
    ],
  },

  {
    id: 'peds-arth-other-joint',
    type: 'info',
    module: 2,
    title: 'Other Joint Involvement',
    body: '**Approach to non-hip, non-knee monoarthritis is similar to knee.**\n\n**Common sites:**\n- **Ankle:** Septic, reactive, JIA\n- **Elbow:** JIA, septic (less common)\n- **Wrist:** JIA, Lyme, reactive\n- **Shoulder:** Septic (uncommon), referred from neck/chest\n\n**Same workup applies:**\n1. Assess systemic illness\n2. Labs: CBC, ESR, CRP\n3. X-ray of affected joint\n4. Ultrasound if effusion suspected\n5. Arthrocentesis if high concern for septic\n\n**Special considerations:**\n- **Toddler refusing to use arm:** Consider nursemaid\'s elbow, septic elbow, osteomyelitis\n- **Ankle with recent URI:** Transient synovitis does occur (less common than hip)\n- **Wrist in adolescent:** Consider gonococcal arthritis if sexually active\n\n**Red flags requiring urgent evaluation:**\n- Fever + joint symptoms\n- Non-weight bearing\n- Rapidly progressive\n- Overlying skin changes (cellulitis vs septic)\n\nProceed with workup based on clinical assessment. [1][2]',
    citation: [1, 2],
    next: 'peds-arth-kocher-eval',
  },

  // =====================================================================
  // MODULE 3: JIA & CHRONIC ARTHRITIS
  // =====================================================================

  {
    id: 'peds-arth-chronic-eval',
    type: 'info',
    module: 3,
    title: 'Chronic Arthritis Evaluation',
    body: '**Arthritis lasting >6 weeks suggests inflammatory arthritis, most commonly JIA.**\n\n**Juvenile Idiopathic Arthritis (JIA):**\n- Most common chronic rheumatic disease in children\n- Arthritis of unknown etiology before age 16\n- Persisting for at least 6 weeks\n- Diagnosis of exclusion (rule out infection, malignancy, other)\n\n**When to suspect JIA in the ED:**\n- **Chronic symptoms** (>6 weeks)\n- **Morning stiffness** that improves with activity\n- **Swelling > pain** (opposite of septic arthritis)\n- **No fever** (except systemic JIA)\n- **Normal or mildly elevated** inflammatory markers\n- **Not acutely toxic-appearing**\n\n**ED role:**\n1. Rule out infection and malignancy\n2. Start symptom management\n3. Arrange rheumatology referral\n4. Screen for uveitis if indicated\n\n**Do NOT start steroids** without rheumatology input (can mask malignancy). [2][3]',
    citation: [2, 3],
    next: 'peds-arth-jia-subtypes',
  },

  {
    id: 'peds-arth-jia-subtypes',
    type: 'info',
    module: 3,
    title: 'JIA Subtypes (ILAR Classification)',
    body: '**7 JIA subtypes with distinct presentations and prognoses.**\n\n**1. Oligoarticular JIA (50-80%)**\n- <=4 joints in first 6 months\n- Peak 2-4 years, girls > boys\n- Knee most common, asymmetric\n- ANA+ in 70% --> **high uveitis risk**\n\n**2. Polyarticular RF-negative (15-25%)**\n- >=5 joints, RF negative\n- Bimodal (2-4 yr, 10-14 yr)\n- Symmetric, large and small joints\n\n**3. Polyarticular RF-positive (5%)**\n- >=5 joints, RF positive\n- Adolescent girls\n- Similar to adult RA, erosive\n\n**4. Systemic JIA (5-15%)**\n- Quotidian fever (>=2 weeks)\n- Salmon-colored rash\n- Hepatosplenomegaly, LAD\n- Risk of MAS (macrophage activation syndrome)\n\n**5. Enthesitis-Related Arthritis (ERA)**\n- Boys >8 years\n- Lower extremity, HLA-B27+\n- May develop axial disease\n\n**6. Psoriatic Arthritis**\n- Arthritis + psoriasis or dactylitis + family history\n\n**7. Undifferentiated** - doesn\'t fit other categories [3]',
    citation: [3],
    calculatorLinks: [
      { id: 'peds-arth-pattern-matcher', label: 'JIA Pattern Matcher' },
    ],
    next: 'peds-arth-jia-ed-mgmt',
  },

  {
    id: 'peds-arth-jia-ed-mgmt',
    type: 'info',
    module: 3,
    title: 'JIA: ED Management',
    body: '**ED goals: symptom relief, rule out mimics, facilitate rheumatology care.**\n\n**Workup to rule out mimics:**\n- CBC with differential (leukemia screen)\n- ESR, CRP\n- BMP\n- Consider LDH, uric acid if malignancy concern\n- ANA (for uveitis risk, not diagnosis)\n- X-ray of affected joints (baseline)\n\n**Symptom management:**\n- **NSAIDs** are first-line:\n  - Ibuprofen 10 mg/kg q6-8h (max 40 mg/kg/day or 2400 mg/day)\n  - Naproxen 5-7 mg/kg q12h (max 20 mg/kg/day or 1000 mg/day)\n- NSAIDs may take 2-4 weeks for full anti-inflammatory effect\n- Provide GI protection counseling\n\n**DO NOT start:**\n- Steroids (can mask malignancy, affects diagnostic evaluation)\n- DMARDs (rheumatology decision)\n\n**Referrals:**\n- **Rheumatology:** Urgent (within 1-2 weeks)\n- **Ophthalmology:** Urgent if uveitis suspected, routine for ANA+ oligoarticular\n\n**Uveitis red flags:**\n- Eye pain, redness, photophobia\n- Vision changes\n- ANA+ with oligoarticular pattern (screen even if asymptomatic) [3]',
    citation: [3],
    treatment: {
      firstLine: {
        drug: 'Naproxen',
        dose: '5-7 mg/kg/dose',
        route: 'PO',
        frequency: 'q12h',
        duration: 'Ongoing until rheumatology evaluation',
        notes: 'Max 500 mg/dose, 1000 mg/day. Take with food. May take 2-4 weeks for full effect.',
      },
      alternative: {
        drug: 'Ibuprofen',
        dose: '10 mg/kg/dose',
        route: 'PO',
        frequency: 'q6-8h',
        duration: 'Ongoing until rheumatology evaluation',
        notes: 'Max 400 mg/dose, 40 mg/kg/day or 2400 mg/day.',
      },
      monitoring: 'Follow-up with rheumatology within 1-2 weeks. Ophthalmology referral for uveitis screening in ANA+ patients.',
    },
    next: 'peds-arth-jia-dispo',
  },

  {
    id: 'peds-arth-jia-dispo',
    type: 'result',
    module: 3,
    title: 'Suspected JIA Disposition',
    body: '**Most suspected JIA can be managed outpatient with timely rheumatology follow-up.**\n\n**Discharge criteria:**\n- Infection ruled out (or very low probability)\n- Malignancy not suspected\n- Stable symptoms\n- Pain controlled with oral NSAIDs\n- Reliable follow-up\n\n**Discharge plan:**\n1. **NSAIDs** - scheduled dosing (not PRN)\n2. **Activity:** Gentle ROM, avoid high-impact until evaluated\n3. **Rheumatology referral** - within 1-2 weeks\n4. **Ophthalmology referral** - if ANA+ or uveitis symptoms\n5. **Return precautions:** Fever, worsening symptoms, eye symptoms\n\n**Admit if:**\n- Systemic JIA with concerning features (high fever, MAS concern)\n- Unable to maintain hydration/nutrition\n- Diagnostic uncertainty with malignancy concern\n- Social concerns\n\n**Parent education:**\n- JIA is a treatable condition\n- Early rheumatology involvement improves outcomes\n- Uveitis screening is important (can be asymptomatic)\n- NOT caused by anything parent did or didn\'t do [3]',
    recommendation: 'Discharge with NSAID therapy and urgent rheumatology referral within 1-2 weeks. Ophthalmology referral for uveitis screening in ANA-positive or symptomatic patients. Written return precautions for fever or worsening.',
    confidence: 'recommended',
    citation: [3],
  },

  {
    id: 'peds-arth-oligo-eval',
    type: 'info',
    module: 3,
    title: 'Oligoarticular Pattern Evaluation',
    body: '**2-4 joint involvement: differential includes JIA, reactive arthritis, HSP.**\n\n**Oligoarticular JIA:**\n- Most common JIA subtype\n- Asymmetric, large joints\n- Knee most common\n- ANA+ in 70% (uveitis risk)\n- Often young girls (peak 2-4 years)\n\n**Reactive arthritis:**\n- Post-viral, post-enteric, post-streptococcal\n- Asymmetric, lower extremity\n- Onset 1-4 weeks after infection\n- Self-limiting in most cases\n\n**HSP (IgA vasculitis):**\n- Palpable purpura (lower extremities/buttocks)\n- Arthritis/arthralgia (50-80%)\n- Abdominal pain, renal involvement\n- Large joints, periarticular swelling\n- Arthritis may precede rash in 25%\n\n**Workup:**\n- CBC, ESR, CRP, UA (for HSP renal screen)\n- ANA (for JIA subtyping)\n- ASO/anti-DNase B (if strep history)\n- Consider Lyme serology in endemic areas\n- Joint aspiration only if infection concern [2][3][9]',
    citation: [2, 3, 9],
    next: 'peds-arth-reactive-eval',
  },

  {
    id: 'peds-arth-poly-eval',
    type: 'info',
    module: 3,
    title: 'Polyarticular Pattern Evaluation',
    body: '**5+ joints involved: JIA subtypes, viral arthritis, ARF, CTD.**\n\n**Polyarticular JIA:**\n- RF-negative: Bimodal age, symmetric, large and small joints\n- RF-positive: Adolescent girls, aggressive erosive disease\n\n**Viral arthritis:**\n- Concurrent with or 2-4 weeks after viral infection\n- Rubella, parvovirus B19, EBV, hepatitis B\n- Self-limiting, resolves in ~6 weeks\n\n**Acute rheumatic fever:**\n- Migratory polyarthritis (classic)\n- 2-3 weeks after strep pharyngitis\n- Dramatic response to NSAIDs\n- Must evaluate for carditis\n\n**Systemic JIA:**\n- Polyarthritis + quotidian fever >= 2 weeks\n- Salmon-colored evanescent rash\n- Hepatosplenomegaly, lymphadenopathy\n- Very high inflammatory markers\n\n**Workup:**\n- CBC, ESR, CRP, ferritin (systemic JIA)\n- RF, ANA (JIA subtyping)\n- ASO, anti-DNase B, throat culture (ARF)\n- Viral serologies if suspected\n- ECG, echo if ARF concern [2][3][10]',
    citation: [2, 3, 10],
    calculatorLinks: [
      { id: 'peds-arth-jones', label: 'Jones Criteria (ARF)' },
    ],
    next: 'peds-arth-reactive-eval',
  },

  // =====================================================================
  // MODULE 4: REACTIVE & POST-INFECTIOUS
  // =====================================================================

  {
    id: 'peds-arth-reactive-eval',
    type: 'info',
    module: 4,
    title: 'Reactive & Post-Infectious Arthritis',
    body: '**Arthritis occurring after infectious trigger - sterile joint inflammation.**\n\n**Post-Viral Reactive Arthritis:**\n- Most common infectious cause in children\n- Concurrent with or 2-4 weeks post-infection\n- Common viruses: parvovirus B19, rubella, EBV, hepatitis B\n- Self-limiting, resolves in ~6 weeks\n- Treatment: NSAIDs, supportive care\n\n**Post-Enteric Reactive Arthritis:**\n- Salmonella, Shigella, Campylobacter, Yersinia\n- Onset 1-4 weeks after GI illness\n- Oligoarthritis, lower extremity predominant\n- HLA-B27 association\n- May become chronic\n\n**Lyme Arthritis:**\n- Late manifestation of Lyme disease\n- Large joint (knee most common)\n- Minimal pain with significant swelling\n- Requires antibiotic treatment\n\n**Post-Streptococcal:**\n- PSRA vs Acute Rheumatic Fever (ARF)\n- Critical distinction for management\n- See next node for differentiation [9][10]',
    citation: [9, 10],
    next: 'peds-arth-psra-vs-arf',
  },

  {
    id: 'peds-arth-psra-vs-arf',
    type: 'info',
    module: 4,
    title: 'PSRA vs Acute Rheumatic Fever',
    body: '**This distinction is critical - management differs significantly.**\n\n| Feature | PSRA | ARF |\n|---------|------|-----|\n| Latent period | <10 days | 2-3 weeks |\n| Arthritis pattern | Non-migratory, prolonged | Migratory, short-lived |\n| Arthritis duration | Weeks to months | Days (rarely >3 weeks) |\n| NSAID response | Slow/incomplete | Dramatic, rapid |\n| Age | Bimodal (8-14, 21-37) | Peak ~12 years |\n| Carditis | Very rare, can occur late | Major criterion, early |\n| HLA-B27 | Normal frequency | Not associated |\n\n**ARF Diagnosis (2015 Revised Jones Criteria):**\nRequires: Evidence of prior GAS infection + 2 major OR 1 major + 2 minor criteria\n\n**Major criteria** (varies by population risk):\n- Carditis (clinical or subclinical echo)\n- Polyarthritis (monoarthritis in high-risk populations)\n- Chorea\n- Erythema marginatum\n- Subcutaneous nodules\n\n**Minor criteria:**\n- Fever (>=38.5C low-risk, >=38.0C high-risk)\n- Elevated ESR/CRP\n- Prolonged PR interval (if no carditis) [10]',
    citation: [10],
    calculatorLinks: [
      { id: 'peds-arth-jones', label: 'Jones Criteria Calculator' },
    ],
    next: 'peds-arth-arf-workup',
  },

  {
    id: 'peds-arth-arf-workup',
    type: 'info',
    module: 4,
    title: 'ARF Workup & Management',
    body: '**If ARF is suspected, full workup is mandatory - carditis can be silent.**\n\n**Required workup:**\n1. **Evidence of strep infection:**\n   - Throat culture (may be negative by time of ARF)\n   - ASO titer (peaks 3-5 weeks post-infection)\n   - Anti-DNase B (peaks 6-8 weeks)\n\n2. **Cardiac evaluation:**\n   - **ECG:** PR prolongation (minor criterion)\n   - **Echocardiogram:** Valvulitis, regurgitation, pericarditis\n\n3. **Labs:**\n   - CBC, ESR, CRP (inflammatory markers)\n   - BMP\n\n**Management of ARF:**\n1. **Eradicate GAS:**\n   - Penicillin V 250-500 mg PO BID x 10 days, OR\n   - Amoxicillin 50 mg/kg/day (max 1g) x 10 days, OR\n   - Benzathine penicillin G 600,000 U (<27kg) or 1.2 MU (>=27kg) IM x1\n\n2. **Anti-inflammatory:**\n   - Aspirin 50-75 mg/kg/day divided q4-6h (high dose)\n   - Naproxen if aspirin-intolerant\n\n3. **Secondary prophylaxis:**\n   - Penicillin G 1.2 MU IM q4 weeks OR Penicillin V 250 mg BID\n   - Duration: 5 years or until age 21 (no carditis) to lifelong (severe carditis) [10]',
    citation: [10],
    calculatorLinks: [
      { id: 'peds-arth-jones', label: 'Jones Criteria Calculator' },
    ],
    treatment: {
      firstLine: {
        drug: 'Penicillin V (strep eradication)',
        dose: '250-500 mg',
        route: 'PO',
        frequency: 'BID',
        duration: '10 days',
        notes: 'For strep eradication. Follow with secondary prophylaxis.',
      },
      alternative: {
        drug: 'Aspirin (anti-inflammatory)',
        dose: '50-75 mg/kg/day',
        route: 'PO divided q4-6h',
        frequency: 'Divided doses',
        duration: 'Until symptoms resolve and inflammatory markers normalize',
        notes: 'High-dose aspirin for ARF. Monitor salicylate levels. Max ~4g/day.',
      },
      monitoring: 'ECG and echo at diagnosis. Repeat echo in 2-4 weeks. Monitor inflammatory markers. Cardiology follow-up for any carditis.',
    },
    next: 'peds-arth-arf-dispo',
  },

  {
    id: 'peds-arth-arf-dispo',
    type: 'result',
    module: 4,
    title: 'ARF Disposition',
    body: '**ARF typically requires admission for cardiac monitoring and initiation of therapy.**\n\n**Admit if:**\n- Any cardiac involvement (clinical or echo)\n- Moderate-severe arthritis requiring IV pain control\n- Diagnostic uncertainty\n- Need for high-dose aspirin initiation with monitoring\n\n**May discharge if:**\n- Mild arthritis only\n- Cardiology has evaluated and cleared\n- Reliable follow-up within 24-48 hours\n- Family understands importance of secondary prophylaxis\n\n**Key follow-up:**\n- **Cardiology:** For all ARF patients (even without initial carditis)\n- **Rheumatology:** If arthritis prolonged or refractory\n- **PCP:** For secondary prophylaxis administration\n\n**Secondary prophylaxis duration:**\n- No carditis: 5 years or until age 21 (whichever longer)\n- Carditis without residual disease: 10 years or until age 21\n- Carditis with residual disease: 10 years or until age 40 (whichever longer)\n- Severe residual RHD: Lifelong\n\n**Pearl:** Carditis is the only manifestation that causes permanent damage - all other features resolve without sequelae. [10]',
    recommendation: 'Admit most ARF cases for cardiac monitoring and treatment initiation. Ensure strep eradication, anti-inflammatory therapy, and plan for secondary prophylaxis. Cardiology follow-up is mandatory.',
    confidence: 'recommended',
    citation: [10],
  },

  {
    id: 'peds-arth-lyme',
    type: 'info',
    module: 4,
    title: 'Lyme Arthritis Management',
    body: '**Lyme arthritis is the most common late Lyme manifestation in children.**\n\n**Diagnosis:**\n- Clinical presentation in endemic area\n- Two-tier serologic testing (ELISA then Western blot)\n- Rapid tests (Sofia IgG) now available with good sensitivity\n\n**Treatment:**\n\n**Children <8 years:**\n| Drug | Dose | Duration |\n|------|------|----------|\n| **Amoxicillin** | 50 mg/kg/day divided TID (max 500 mg TID) | 28 days |\n| Alt: Azithromycin | 10 mg/kg day 1, then 5 mg/kg days 2-10 | 10 days |\n\n**Children >=8 years:**\n| Drug | Dose | Duration |\n|------|------|----------|\n| **Doxycycline** | 4.4 mg/kg/day divided BID (max 100 mg BID) | 28 days |\n| Alt: Amoxicillin | 50 mg/kg/day divided TID | 28 days |\n\n**Note:** Short-course doxycycline (<=21 days) is now considered safe in all pediatric ages.\n\n**If treatment failure:**\n- Minimal response to oral antibiotics: IV ceftriaxone 2-4 weeks\n- Consider NSAID trial for antibiotic-refractory Lyme arthritis\n\n**Pearl:** Symptoms may persist for weeks after starting antibiotics - this does not indicate treatment failure. [8]',
    citation: [8],
    treatment: {
      firstLine: {
        drug: 'Doxycycline (>=8 years) or Amoxicillin (<8 years)',
        dose: 'Doxy: 4.4 mg/kg/day BID (max 100 mg BID) | Amox: 50 mg/kg/day TID',
        route: 'PO',
        frequency: 'BID (doxy) or TID (amox)',
        duration: '28 days',
        notes: 'Doxycycline now safe for short courses in younger children. Amoxicillin preferred if concerns about dental staining.',
      },
      alternative: {
        drug: 'Ceftriaxone (if oral failure)',
        dose: '50-75 mg/kg/day',
        route: 'IV',
        frequency: 'Once daily',
        duration: '2-4 weeks',
        notes: 'Max 2g/day. Reserve for oral antibiotic failure.',
      },
      monitoring: 'Clinical response over 4-6 weeks. Repeat serology NOT useful (remains positive after treatment). Consider ID consult if refractory.',
    },
    next: 'peds-arth-lyme-dispo',
  },

  {
    id: 'peds-arth-lyme-dispo',
    type: 'result',
    module: 4,
    title: 'Lyme Arthritis Disposition',
    body: '**Most Lyme arthritis can be managed outpatient.**\n\n**Discharge with:**\n1. 28-day course of oral antibiotics (doxycycline or amoxicillin)\n2. NSAIDs for symptom relief\n3. Activity as tolerated\n4. Follow-up with PCP or ID in 2-4 weeks\n\n**Return precautions:**\n- Fever develops\n- Symptoms significantly worsening despite antibiotics\n- Neurologic symptoms (facial palsy, meningitis symptoms)\n- Cardiac symptoms (syncope, palpitations, chest pain)\n\n**Expected course:**\n- Improvement begins within 1-2 weeks\n- Full resolution may take 4-6 weeks after completing antibiotics\n- Residual swelling can persist for months in some cases\n\n**Follow-up serology:**\n- NOT recommended - antibodies persist long after successful treatment\n- Clinical response is the measure of success\n\n**If recurrent after adequate treatment:**\n- May represent antibiotic-refractory Lyme arthritis\n- Rheumatology consultation for NSAID/DMARD consideration\n- Consider autoimmune mechanism [8]',
    recommendation: 'Discharge with 28-day oral antibiotic course and NSAIDs. Follow-up in 2-4 weeks. Symptoms may take 4-6 weeks to fully resolve. Serology NOT useful for monitoring.',
    confidence: 'recommended',
    citation: [8],
  },

  // =====================================================================
  // MODULE 5: RED FLAGS & MIMICS
  // =====================================================================

  {
    id: 'peds-arth-malignancy',
    type: 'info',
    module: 5,
    title: 'Malignancy Red Flags',
    body: '**Leukemia presents with bone/joint pain in 25-43% of cases.**\n\n**May be misdiagnosed as JIA, growing pains, or trauma.**\n\n**Pain Characteristics Suggesting Malignancy:**\n- Severe pain out of proportion to exam\n- **Night pain** that wakes child from sleep\n- Pain localized to **bone** (not joint)\n- Progressive, unremitting\n- Limiting normal daily activities\n\n**Systemic Features:**\n- Unexplained fever\n- Fatigue, lethargy\n- Weight loss, anorexia\n- Pallor\n- Easy bruising, petechiae\n- Lymphadenopathy\n- Hepatosplenomegaly\n\n**Key Laboratory Red Flags:**\n- **Thrombocytopenia** (<300 x 10^9/L) - most specific\n- Anemia (unexplained)\n- Neutropenia (<2 x 10^9/L)\n- Elevated LDH\n- Elevated uric acid\n- Low-normal platelets that should be elevated with inflammation\n\n**Leukemia vs JIA distinguishing features:**\n| Feature | Leukemia | JIA |\n|---------|----------|-----|\n| Pain:swelling | Pain >> swelling | Swelling >> pain |\n| Morning stiffness | Absent | Present |\n| HSM/LAD | Present | Absent (except systemic JIA) |\n| Platelet count | Low/normal | Normal/elevated |\n| Night pain | Prominent | Uncommon | [11]',
    citation: [11],
    calculatorLinks: [
      { id: 'peds-arth-malignancy-flags', label: 'Malignancy Red Flag Checker' },
    ],
    next: 'peds-arth-malignancy-workup',
  },

  {
    id: 'peds-arth-malignancy-workup',
    type: 'info',
    module: 5,
    title: 'Malignancy Workup',
    body: '**When to investigate for malignancy in child with MSK complaints.**\n\n**Hard stops requiring immediate evaluation:**\n- Hepatosplenomegaly or lymphadenopathy + MSK complaints\n- Any unexplained cytopenia\n- Pancytopenia\n\n**Consider heme/onc referral if >1 month MSK pain PLUS:**\n- Hepatomegaly, splenomegaly, or LAD, OR\n- Fever + non-articular bone pain + systemic symptoms (fatigue, weight loss) + neutrophils <2 x 10^9/L or platelets <300 x 10^9/L\n\n**Workup:**\n1. **CBC with manual differential** - look for blasts\n2. **Peripheral blood smear** - technician review\n3. **LDH, uric acid** - tumor lysis markers\n4. **CMP** - renal/liver function\n5. **X-ray** of painful areas - lytic lesions, periosteal reaction\n\n**If concerning findings:**\n- Hematology/oncology consultation\n- Bone marrow aspiration/biopsy\n- Do NOT start steroids (masks diagnosis)\n\n**Pearl:** A normal CBC does NOT rule out leukemia. Peripheral smear review and clinical suspicion are key. [11]',
    citation: [11],
    calculatorLinks: [
      { id: 'peds-arth-malignancy-flags', label: 'Malignancy Red Flag Checker' },
    ],
    next: 'peds-arth-mimics',
  },

  {
    id: 'peds-arth-mimics',
    type: 'info',
    module: 5,
    title: 'Orthopedic Mimics of Arthritis',
    body: '**These orthopedic conditions present with joint/limb pain and are commonly missed.**\n\n**SCFE (Slipped Capital Femoral Epiphysis):**\n- **Age:** 8-15 years (girls ~12, boys ~13)\n- **Risk factors:** Obesity, male, African American\n- Presents with hip, groin, thigh, or **KNEE** pain\n- Externally rotated leg, obligate external rotation with flexion\n- **X-ray:** AP and frog-leg lateral (if stable)\n- **EMERGENCY if unstable** - non-weight bearing, NWB immediately\n\n**Legg-Calve-Perthes Disease:**\n- **Age:** 4-8 years\n- Idiopathic AVN of femoral head\n- Insidious onset limp, hip/groin/knee pain\n- Limited internal rotation and abduction\n- **X-ray may be normal early** - MRI more sensitive\n\n**Osteomyelitis:**\n- Can present as joint pain (especially near joints)\n- Point tenderness over bone (not just joint)\n- May have low-grade or no fever\n- **X-ray normal for 1-2 weeks** - MRI is definitive\n\n**Growing Pains:**\n- Age 3-12 years\n- Bilateral lower limbs (NOT joints)\n- Evening/night only (never morning)\n- Child does NOT limp\n- Normal exam\n- Diagnosis of exclusion [12][13]',
    citation: [12, 13],
    next: 'peds-arth-scfe-check',
  },

  {
    id: 'peds-arth-scfe-check',
    type: 'question',
    module: 5,
    title: 'SCFE Screening',
    body: '**SCFE is commonly missed because of referred knee pain.**\n\n**ALWAYS consider SCFE in:**\n- Adolescent (especially obese) with hip, thigh, or knee pain\n- Limp without clear cause\n- Hip stiffness or decreased ROM\n- "Growing pains" in obese adolescent\n\n**Exam findings:**\n- Antalgic gait\n- Leg held in external rotation\n- **Obligate external rotation with hip flexion** (pathognomonic)\n- Decreased internal rotation\n- Positive Drehmann sign\n\n**X-ray interpretation:**\n- AP and frog-leg lateral (if stable SCFE suspected)\n- AP and cross-table lateral (if unstable - do NOT frog-leg!)\n- **Klein\'s line:** Line along superior femoral neck should intersect epiphysis\n- **Trethowan sign positive:** Klein\'s line does not intersect epiphysis\n\n**If SCFE confirmed:**\n- Non-weight bearing immediately\n- Urgent orthopedic consultation\n- Surgical treatment (in-situ screw fixation)\n\nDoes this patient have risk factors or exam findings for SCFE?',
    citation: [12],
    options: [
      { label: 'Yes - SCFE concern', description: 'Obese adolescent, exam findings, abnormal X-ray', next: 'peds-arth-scfe-mgmt', urgency: 'urgent' },
      { label: 'No - Low SCFE risk', description: 'Younger child, normal exam/X-ray', next: 'peds-arth-growing-pains' },
    ],
  },

  {
    id: 'peds-arth-scfe-mgmt',
    type: 'result',
    module: 5,
    title: 'SCFE Management',
    body: '**SCFE requires urgent orthopedic intervention.**\n\n**Immediate actions:**\n1. **Strict non-weight bearing** - use crutches or wheelchair\n2. **Do NOT attempt reduction** - increases AVN risk\n3. **Orthopedic surgery consultation** - STAT\n\n**Classification determines urgency:**\n\n| Type | Definition | Urgency |\n|------|------------|--------|\n| **Stable** | Can bear weight (with or without crutches) | Urgent surgery (within 24-48h) |\n| **Unstable** | Cannot bear weight | Emergency surgery (within hours) |\n\n**Surgical treatment:**\n- In-situ percutaneous screw fixation\n- Single cannulated screw across physis\n- May consider prophylactic pinning of contralateral hip\n\n**Complications:**\n- Avascular necrosis (AVN) - higher with unstable SCFE, manipulation attempts\n- Chondrolysis\n- Slip progression\n- FAI (femoroacetabular impingement)\n\n**Prognosis:**\n- Good if treated promptly and appropriately\n- 30% will slip contralateral hip (70% within 18 months) [12]',
    recommendation: 'Non-weight bearing immediately. Urgent orthopedic consultation. Do NOT attempt reduction. Surgical treatment required.',
    confidence: 'definitive',
    citation: [12],
  },

  {
    id: 'peds-arth-growing-pains',
    type: 'info',
    module: 5,
    title: 'Growing Pains: Diagnosis of Exclusion',
    body: '**Growing pains are common but remain a diagnosis of exclusion.**\n\n**Diagnostic Criteria (ALL must be present):**\n1. Age 3-12 years\n2. Pain in bilateral lower limbs (NOT joints)\n3. Pain occurs in evening/night (never present upon waking)\n4. Child does NOT limp\n5. Normal physical examination\n6. No systemic symptoms\n\n**Typical characteristics:**\n- Location: Calves, anterior thighs, shins, popliteal fossa\n- Timing: Late evening or awakens from sleep\n- Duration: Minutes to hours, gone by morning\n- Response: Massage, heat, reassurance help\n- No functional limitation during day\n\n**Red Flags - NOT Growing Pains:**\n| Red Flag | Suggests |\n|----------|----------|\n| Limp | Any organic pathology |\n| Morning stiffness | JIA |\n| Joint swelling | Arthritis |\n| Unilateral pain | Trauma, infection, tumor |\n| Pain during activity | Structural problem |\n| Systemic symptoms | Infection, malignancy |\n| Night pain waking child | Malignancy, infection |\n| Age >12 or <3 years | Reconsider diagnosis |\n| Point tenderness | Fracture, infection |\n| Refusal to bear weight | Septic joint, fracture |\n\n**If classic history AND normal exam:** No workup needed. [14]',
    citation: [14],
    next: 'peds-arth-growing-pains-dispo',
  },

  {
    id: 'peds-arth-growing-pains-dispo',
    type: 'result',
    module: 5,
    title: 'Growing Pains Disposition',
    body: '**If criteria met and exam normal, reassurance is the treatment.**\n\n**Parent education:**\n- Growing pains are benign and self-limiting\n- Not actually related to growth\n- Common (10-30% of children)\n- Usually resolve by adolescence\n- NOT a sign of underlying disease when criteria met\n\n**Symptomatic management:**\n- Massage, stretching\n- Heat (warm bath, heating pad)\n- Acetaminophen or ibuprofen PRN for severe episodes\n- Regular stretching before bed may help\n\n**Follow-up:**\n- PCP follow-up not urgent if classic presentation\n- Recommend reassessment if pattern changes\n\n**Return to ED if:**\n- Limping develops\n- Pain present in morning or during activities\n- Fever\n- Swelling, redness of joints\n- Weight loss, fatigue\n- Pain localized to one area only\n- Worsening over time\n\n**Pearl:** If parents or provider are not confident in the diagnosis, get labs (CBC, ESR, CRP). The cost of basic labs is low compared to missing pathology. [14]',
    recommendation: 'Reassurance and symptomatic management if classic criteria met and exam normal. No workup needed. Return if limp, morning symptoms, fever, or worsening.',
    confidence: 'recommended',
    citation: [14],
  },

  {
    id: 'peds-arth-hsp',
    type: 'info',
    module: 5,
    title: 'HSP (IgA Vasculitis) Arthritis',
    body: '**HSP is the most common vasculitis in children - arthritis is a major feature.**\n\n**Classic Tetrad:**\n1. **Palpable purpura** (100%) - lower extremities, buttocks\n2. **Arthritis/arthralgia** (50-80%)\n3. **Abdominal pain** (50-75%)\n4. **Renal involvement** (20-50%)\n\n**Arthritis Characteristics:**\n- Large joints: knees, ankles, elbows, wrists\n- Oligoarticular, periarticular swelling\n- Painful but often lacks warmth, erythema, effusion\n- **Non-erosive, no permanent deformity**\n- Resolves in days to weeks\n- **May precede rash in 25%**\n\n**Treatment of HSP Arthritis:**\n| Severity | Treatment |\n|----------|----------|\n| Mild | Supportive, rest |\n| Moderate | NSAIDs (avoid if renal involvement) |\n| Moderate (renal concern) | Acetaminophen |\n| Severe | Prednisone 1-2 mg/kg/day x 1-2 weeks |\n\n**Monitoring:**\n- UA weekly x 4 weeks, then monthly x 6 months\n- Blood pressure\n- Nephrology referral if hematuria, proteinuria, HTN\n\n**Pearl:** Steroids relieve symptoms but do NOT prevent renal disease. [9]',
    citation: [9],
    next: 'peds-arth-tx-dispo',
  },

  // =====================================================================
  // MODULE 6: TREATMENT & DISPOSITION
  // =====================================================================

  {
    id: 'peds-arth-tx-dispo',
    type: 'info',
    module: 6,
    title: 'Treatment Overview & NSAID Dosing',
    body: '**NSAIDs are the cornerstone of treatment for most non-septic pediatric arthritis.**\n\n**NSAID Dosing:**\n\n| Drug | Dose | Frequency | Max Daily |\n|------|------|-----------|----------|\n| **Ibuprofen** | 10 mg/kg/dose | q6-8h | 40 mg/kg or 2400 mg |\n| **Naproxen** | 5-7 mg/kg/dose | q12h | 20 mg/kg or 1000 mg |\n\n**NSAID Pearls:**\n- Schedule doses (not PRN) for anti-inflammatory effect\n- May take 2-4 weeks for full effect in inflammatory arthritis\n- Take with food to reduce GI upset\n- Avoid in renal disease, active bleeding, dehydration\n\n**When NOT to use NSAIDs:**\n- Suspected septic arthritis (treat infection, not symptoms)\n- HSP with renal involvement\n- Active GI bleeding\n- Severe dehydration\n\n**Acetaminophen:**\n- 15 mg/kg/dose q4-6h (max 75 mg/kg/day or 4g/day)\n- Use when NSAIDs contraindicated\n- Analgesic only, no anti-inflammatory effect\n\n**Corticosteroids:**\n- Do NOT start without specialist input\n- Can mask malignancy\n- Reserved for specific indications (ARF with carditis, severe systemic JIA, HSP) [2][3]',
    citation: [2, 3],
    next: 'peds-arth-referral-guide',
  },

  {
    id: 'peds-arth-referral-guide',
    type: 'info',
    module: 6,
    title: 'Specialist Referral Guide',
    body: '**Timely referral improves outcomes in pediatric arthritis.**\n\n**EMERGENT (same day):**\n| Specialist | Indication |\n|------------|------------|\n| **Orthopedics** | Septic arthritis, SCFE, fracture |\n| **Heme/Onc** | Suspected malignancy, cytopenias |\n\n**URGENT (24-72 hours):**\n| Specialist | Indication |\n|------------|------------|\n| **Cardiology** | ARF with any cardiac findings |\n| **Ophthalmology** | Suspected uveitis (pain, redness, vision change) |\n| **ID** | Complex septic arthritis, Lyme with complications |\n\n**ROUTINE (1-2 weeks):**\n| Specialist | Indication |\n|------------|------------|\n| **Rheumatology** | Suspected JIA, chronic arthritis |\n| **Ophthalmology** | ANA+ JIA for uveitis screening |\n| **Orthopedics** | Perthes, non-emergent MSK concerns |\n\n**Resources for referral:**\n- Many pediatric rheumatologists offer phone consultation\n- Telemedicine expanding access in underserved areas\n- PCP can often facilitate urgent rheum appointments\n\n**Pearl:** Document referral recommendations clearly. Families often need guidance navigating specialist appointments.',
    citation: [2, 3],
    next: 'peds-arth-final-dispo',
  },

  {
    id: 'peds-arth-final-dispo',
    type: 'question',
    module: 6,
    title: 'Final Disposition',
    body: '**Disposition based on diagnosis and clinical stability.**\n\n**Admission criteria:**\n- Septic arthritis (confirmed or high suspicion)\n- ARF with cardiac involvement\n- Systemic JIA with concerning features\n- Diagnostic uncertainty with malignancy concern\n- Unable to maintain hydration/pain control\n- Social concerns affecting safe discharge\n\n**Discharge criteria:**\n- Infection ruled out or very low probability\n- Pain controlled with oral medications\n- Able to ambulate safely (or with appropriate assistance)\n- Reliable follow-up arranged\n- Caregiver understands return precautions\n\n**Transfer criteria:**\n- Need for pediatric orthopedics not available locally\n- Need for pediatric rheumatology evaluation\n- Diagnostic complexity requiring tertiary center\n\nWhat is the final disposition?',
    citation: [1, 2],
    options: [
      { label: 'Admit', description: 'Septic arthritis, ARF, systemic JIA, diagnostic concern', next: 'peds-arth-admit-summary' },
      { label: 'Discharge with follow-up', description: 'Stable, diagnosis established, reliable follow-up', next: 'peds-arth-discharge-summary' },
      { label: 'Transfer', description: 'Need for subspecialty care not available locally', next: 'peds-arth-transfer-summary' },
    ],
  },

  {
    id: 'peds-arth-admit-summary',
    type: 'result',
    module: 6,
    title: 'Admission Summary',
    body: '**Admission for pediatric arthritis.**\n\n**Admission orders:**\n1. **IV access** and fluids as needed\n2. **Antibiotics** if septic arthritis (per protocol)\n3. **Pain management** - NSAIDs or acetaminophen scheduled\n4. **Consults:** Orthopedics, Rheumatology, ID as indicated\n5. **Labs:** Daily CBC, CRP until trending down\n6. **Imaging:** As needed for monitoring\n\n**Nursing orders:**\n- Vital signs q4h (q2h if septic)\n- Strict I/O\n- Pain assessment with each VS\n- Elevate affected limb\n- Weight-bearing status per orthopedics\n\n**Family communication:**\n- Explain diagnosis and treatment plan\n- Expected hospital course\n- When to expect improvement\n- Long-term follow-up needs',
    recommendation: 'Admit for IV antibiotics, pain management, and subspecialty care as indicated. Daily labs until improving. Clear weight-bearing orders.',
    confidence: 'definitive',
    citation: [1, 2],
  },

  {
    id: 'peds-arth-discharge-summary',
    type: 'result',
    module: 6,
    title: 'Discharge Summary',
    body: '**Discharge instructions for pediatric arthritis.**\n\n**Medications:**\n- NSAID: [Ibuprofen 10 mg/kg OR Naproxen 5-7 mg/kg] scheduled, NOT PRN\n- Antibiotics if indicated (Lyme, etc.)\n\n**Activity:**\n- Rest as needed\n- Activity as tolerated unless otherwise specified\n- No contact sports until cleared (if JIA suspected)\n\n**Follow-up:**\n- PCP: Within 1-2 days if observation, 1 week otherwise\n- Rheumatology: Within 1-2 weeks if JIA suspected\n- Ophthalmology: If ANA+ or eye symptoms\n- Other specialists as indicated\n\n**Return precautions - return IMMEDIATELY for:**\n- Fever >38.5C (101.3F)\n- Unable to bear weight or significant worsening\n- Severe or worsening pain\n- New joint involvement\n- Rash, especially purpura\n- Eye pain, redness, or vision changes\n- Vomiting, unable to take medications\n- Any new concerning symptoms\n\n**Provide written instructions in family\'s preferred language.**',
    recommendation: 'Discharge with scheduled NSAID therapy, clear follow-up plan, and written return precautions. Ensure family understands when to return.',
    confidence: 'recommended',
    citation: [1, 2],
  },

  {
    id: 'peds-arth-transfer-summary',
    type: 'result',
    module: 6,
    title: 'Transfer Summary',
    body: '**Transfer for subspecialty care not available locally.**\n\n**Pre-transfer:**\n1. Stabilize patient (IV access, pain control, antibiotics if indicated)\n2. Complete basic workup (labs, X-rays) to send with patient\n3. Direct physician-to-physician communication with accepting facility\n4. Document weight-bearing status and any restrictions\n\n**Transfer documentation:**\n- Chief complaint and HPI\n- Physical exam findings\n- Labs and imaging results\n- Treatments given\n- Working diagnosis\n- Reason for transfer\n- Accepting physician name and contact\n\n**Family communication:**\n- Explain why transfer is needed\n- Where patient is going and how to get there\n- What to expect at receiving facility\n- Provide copies of records if possible\n\n**Mode of transport:**\n- Ambulance if unstable or septic\n- Private vehicle acceptable if stable with reliable family\n\n**Pearl:** Send copies of all imaging and lab results. Electronic transfer is ideal but have paper backup.',
    recommendation: 'Stabilize and transfer with complete documentation. Direct MD-to-MD communication with receiving facility. Family receives clear instructions.',
    confidence: 'recommended',
    citation: [1, 2],
  },

];

export const NODE_COUNT = PEDIATRIC_ARTHRITIS_NODES.length;

export const MODULE_LABELS = [
  'Initial Assessment',
  'Septic vs Transient',
  'JIA & Chronic Arthritis',
  'Reactive & Post-Infectious',
  'Red Flags & Mimics',
  'Treatment & Disposition',
];

export const CITATIONS: Citation[] = [
  { num: 1, text: 'Pääkkönen M, Peltola H. Management of Septic Arthritis in Children. Pediatr Health Med Ther. 2017;8:65-68. PMID: 29388612' },
  { num: 2, text: 'Mathison DJ, Teach SJ. Approach to Pediatric Joint Pain. Pediatr Clin North Am. 2012;59(2):359-378. PMID: 22560575' },
  { num: 3, text: 'Petty RE, et al. International League of Associations for Rheumatology Classification of Juvenile Idiopathic Arthritis: Second Revision, Edmonton 2001. J Rheumatol. 2004;31(2):390-392. PMID: 14760812' },
  { num: 4, text: 'Kocher MS, Zurakowski D, Kasser JR. Differentiating Between Septic Arthritis and Transient Synovitis of the Hip in Children: An Evidence-Based Clinical Prediction Algorithm. J Bone Joint Surg Am. 1999;81(12):1662-1670. PMID: 10608376' },
  { num: 5, text: 'Caird MS, Flynn JM, Leung YL, et al. Factors Distinguishing Septic Arthritis from Transient Synovitis of the Hip in Children. A Prospective Study. J Bone Joint Surg Am. 2006;88(6):1251-1257. PMID: 16757758' },
  { num: 6, text: 'Sultan J, Hughes PJ. Septic Arthritis or Transient Synovitis of the Hip in Children: The Value of Clinical Prediction Algorithms. J Bone Joint Surg Br. 2010;92(9):1289-1293. PMID: 20798450' },
  { num: 7, text: 'PIDS/IDSA. Clinical Practice Guidelines for the Evaluation and Treatment of Acute Bacterial Arthritis in Pediatrics. 2023. https://www.idsociety.org/practice-guideline/acute-bacterial-arthritis-in-pediatrics2/' },
  { num: 8, text: 'Nigrovic LE, Thompson KM. The Lyme Vaccine: A Cautionary Tale. Epidemiol Infect. 2007;135(1):1-8. PMID: 16893489. AAP Lyme Management Guidelines 2022.' },
  { num: 9, text: 'Ozen S, et al. EULAR/PRINTO/PRES Criteria for Henoch-Schönlein Purpura. Ann Rheum Dis. 2010;69(5):798-806. PMID: 20413568' },
  { num: 10, text: 'Gewitz MH, et al. Revision of the Jones Criteria for the Diagnosis of Acute Rheumatic Fever. Circulation. 2015;131(20):1806-1818. PMID: 25908771' },
  { num: 11, text: 'Cabral DA, Tucker LB. Malignancies in Children Who Initially Present with Rheumatic Complaints. J Pediatr. 1999;134(1):53-57. PMID: 9880449' },
  { num: 12, text: 'Novais EN, Millis MB. Slipped Capital Femoral Epiphysis: Prevalence, Pathogenesis, and Natural History. Clin Orthop Relat Res. 2012;470(12):3432-3438. PMID: 23054509' },
  { num: 13, text: 'Kim HKW, Herring JA. Pathophysiology, Classifications, and Natural History of Perthes Disease. Orthop Clin North Am. 2011;42(3):285-295. PMID: 21742140' },
  { num: 14, text: 'Evans AM, Scutter SD. Prevalence of "Growing Pains" in Young Children. J Pediatr. 2004;145(2):255-258. PMID: 15289779' },
];
