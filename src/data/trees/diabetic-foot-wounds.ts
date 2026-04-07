// MedKitt - Diabetic Foot Wounds
// Comprehensive 6-module approach to diabetic foot wounds in the ED.
// Initial Assessment -> Infection Severity -> Vascular Assessment -> Osteomyelitis Workup -> Charcot Foot -> Treatment & Disposition
// Sources: IWGDF/IDSA 2023, SVS WIfI, AAFP guidelines
// 52 nodes total

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const DIABETIC_FOOT_WOUNDS_CRITICAL_ACTIONS = [
  { text: 'ABI unreliable in diabetics - use TBI (toe-brachial index) instead', nodeId: 'dfw-vascular-intro' },
  { text: '25% of acute Charcot is misdiagnosed as cellulitis/gout/DVT - red hot swollen foot WITHOUT wound', nodeId: 'dfw-charcot-intro' },
  { text: 'Do NOT treat uninfected ulcers with antibiotics - even if osteomyelitis on imaging', nodeId: 'dfw-infection-intro' },
  { text: 'Probe-to-bone positive + positive X-ray = osteomyelitis very likely (>90%)', nodeId: 'dfw-osteo-combined' },
  { text: 'Wet gangrene + sepsis = EMERGENT surgical amputation', nodeId: 'dfw-wet-gangrene' },
  { text: 'Necrotizing fasciitis - LRINEC ≥6 suspicious, do NOT delay surgery for imaging', nodeId: 'dfw-nec-fasc' },
  { text: 'Offloading (total contact cast) as important as antibiotics - 90% healing rate', nodeId: 'dfw-offloading' },
  { text: 'IDSA Grade 4 (severe) = vancomycin + piperacillin-tazobactam, STAT surgical consult', nodeId: 'dfw-grade4-severe' },
  { text: 'Acute Charcot requires strict non-weight-bearing immediately - permanent deformity risk', nodeId: 'dfw-charcot-management' },
  { text: 'TcPO2 <25 mmHg or toe pressure <30 mmHg = healing unlikely without revascularization', nodeId: 'dfw-vascular-tcpo2' },
] as const;

export const DIABETIC_FOOT_WOUNDS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: INITIAL ASSESSMENT
  // =====================================================================

  {
    id: 'dfw-start',
    type: 'info',
    module: 1,
    title: 'Diabetic Foot Wounds: Initial Assessment',
    body: '**Diabetic foot ulcers (DFUs) affect 15-25% of diabetics** and precede 85% of diabetes-related amputations.\n\n**The "diabetic foot triad":**\n1. **Neuropathy** - loss of protective sensation\n2. **Peripheral arterial disease (PAD)** - ischemia\n3. **Infection** - polymicrobial, often indolent\n\n**ED priorities:**\n1. Rule out limb-threatening emergencies (nec fasc, wet gangrene, severe ischemia)\n2. Classify wound severity using validated systems\n3. Assess vascular status (ABI unreliable in diabetics - use TBI)\n4. Determine infection severity (IDSA Grade 1-4)\n5. Evaluate for osteomyelitis\n6. Recognize acute Charcot neuroarthropathy\n\n**Key pearl:** 25% of acute Charcot is misdiagnosed as cellulitis, gout, or DVT. [1][2]',
    citation: [1, 2],
    calculatorLinks: [
      { id: 'dfw-wagner-pedis', label: 'Wagner/PEDIS Classification' },
      { id: 'dfw-idsa-severity', label: 'IDSA Infection Severity' },
    ],
    next: 'dfw-emergencies',
  },

  {
    id: 'dfw-emergencies',
    type: 'question',
    module: 1,
    title: 'Rule Out Emergencies',
    body: '**Life/limb-threatening conditions requiring IMMEDIATE text:**\n\n**Necrotizing fasciitis:**\n- Pain out of proportion (early) or absent (late - nerve destruction)\n- Rapidly spreading erythema, skin necrosis, bullae, crepitus\n- Systemic toxicity, elevated lactate\n\n**Wet gangrene:**\n- Edematous, purulent necrotic tissue\n- Sepsis/systemic infection\n- Requires urgent amputation\n\n**Severe limb ischemia:**\n- Rest pain, absent pulses\n- Toe pressure <30 mmHg, TcPO2 <25 mmHg\n- Non-viable tissue without revascularization\n\n**Compartment syndrome:**\n- Pain out of proportion with passive stretch\n- Tense compartments, paresthesias\n\nIs any limb-threatening emergency present?',
    citation: [1, 3],
    options: [
      { label: 'Necrotizing fasciitis suspected', description: 'Pain OOP, rapid spread, crepitus, bullae, systemic toxicity', next: 'dfw-nec-fasc', urgency: 'critical' },
      { label: 'Wet gangrene with sepsis', description: 'Purulent necrosis, systemic infection', next: 'dfw-wet-gangrene', urgency: 'critical' },
      { label: 'Critical limb ischemia', description: 'Absent pulses, rest pain, toe pressure <30', next: 'dfw-cli-emergency', urgency: 'critical' },
      { label: 'No immediate emergency', description: 'Proceed with systematic evaluation', next: 'dfw-wound-exam' },
    ],
  },

  {
    id: 'dfw-nec-fasc',
    type: 'info',
    module: 1,
    title: 'Necrotizing Fasciitis Management',
    body: '**Necrotizing fasciitis is a SURGICAL EMERGENCY. >75% require amputation.**\n\n**Immediate actions:**\n1. **Aggressive fluid resuscitation** - often requires >6L in first 6 hours\n2. **Broad-spectrum antibiotics STAT:**\n   - Vancomycin 25-30 mg/kg IV load\n   - PLUS Piperacillin-tazobactam 4.5g IV q6h\n   - PLUS Clindamycin 900mg IV q8h (toxin suppression)\n3. **Emergent surgical consultation** - do NOT delay for imaging\n4. **ICU admission**\n5. **Serial lactate monitoring**\n\n**Surgical principles:**\n- Bedside debridement if OR delayed\n- Wide fasciotomy and debridement\n- "Finger test" - lack of tissue resistance on digital exploration\n- Plan for repeat OR in 24-48h\n- Amputation if non-viable limb\n\n**LRINEC score can support diagnosis but should NOT delay surgery:**\n- CRP >150: 4 pts | WBC >15k: 1 pt, >25k: 2 pts\n- Hgb <13.5: 1 pt, <11: 2 pts | Na <135: 2 pts\n- Cr >1.6: 2 pts | Glucose >180: 1 pt\n- Score >=6: Highly suspicious for nec fasc [3][4]',
    citation: [3, 4],
    treatment: {
      firstLine: {
        drug: 'Vancomycin + Piperacillin-tazobactam + Clindamycin',
        dose: 'Vanc 25-30 mg/kg, Pip-tazo 4.5g, Clinda 900mg',
        route: 'IV',
        frequency: 'Vanc per levels, Pip-tazo q6h, Clinda q8h',
        duration: 'Until source control and clinical improvement',
        notes: 'Clindamycin for toxin suppression. EMERGENT surgery required.',
        confidence: 'critical',
      },
      monitoring: 'ICU admission. Serial lactate, CBC, BMP q6h. Repeat OR in 24-48h.',
    },
    next: 'dfw-dispo-admit-icu',
  },

  {
    id: 'dfw-wet-gangrene',
    type: 'info',
    module: 1,
    title: 'Wet Gangrene Management',
    body: '**Wet gangrene = infection + tissue necrosis = SURGICAL EMERGENCY**\n\n**Differentiate from dry gangrene:**\n| Feature | Dry Gangrene | Wet Gangrene |\n|---------|--------------|---------------|\n| Appearance | Desiccated, mummified | Edematous, purulent |\n| Infection | None | Present |\n| Urgency | Can observe | URGENT surgery |\n| Treatment | May autoamputate | Surgical amputation |\n\n**Immediate management:**\n1. **Sepsis bundle** - fluids, antibiotics, lactate monitoring\n2. **Broad-spectrum antibiotics** (same as nec fasc regimen)\n3. **Emergent surgical consultation for amputation**\n4. **Glucose control** - target 140-180 mg/dL\n5. **DVT prophylaxis**\n\n**Surgical decision:**\n- Guillotine amputation if critically ill (definitive closure later)\n- Level determined by tissue viability and perfusion\n- TcPO2 >25 mmHg at proposed level suggests healing [3][5]',
    citation: [3, 5],
    treatment: {
      firstLine: {
        drug: 'Vancomycin + Piperacillin-tazobactam',
        dose: 'Vanc 15-20 mg/kg, Pip-tazo 4.5g',
        route: 'IV',
        frequency: 'Vanc q8-12h, Pip-tazo q6h',
        duration: 'Until amputation/source control',
        notes: 'Add Clindamycin if concern for Group A Strep or toxin-mediated illness.',
        confidence: 'critical',
      },
      monitoring: 'Serial exams, lactate q4-6h, glucose control target 140-180 mg/dL',
    },
    next: 'dfw-dispo-admit-icu',
  },

  {
    id: 'dfw-cli-emergency',
    type: 'info',
    module: 1,
    title: 'Critical Limb Ischemia Emergency',
    body: '**Critical limb-threatening ischemia (CLTI) requires URGENT vascular surgery.**\n\n**Diagnostic thresholds (any of):**\n- Ankle pressure <50 mmHg\n- ABI <0.4\n- Toe pressure <30 mmHg\n- TcPO2 <25 mmHg\n\n**Clinical features:**\n- Rest pain (burning, often worse at night, improves with dependency)\n- Absent pedal pulses\n- Tissue loss (ulcer, gangrene)\n- Pallor, prolonged capillary refill, dependent rubor\n\n**ED management:**\n1. **Pain control** - dependent positioning, opioids PRN\n2. **IV hydration** - improve rheology\n3. **STAT vascular surgery consultation**\n4. **CTA or duplex US of lower extremities**\n5. **Avoid compression bandages**\n6. **Avoid heat/cold application to limb**\n\n**Revascularization options:**\n- Endovascular: angioplasty, stenting\n- Surgical: bypass (fem-pop, fem-distal)\n- Hybrid approaches\n\n**If non-revascularizable:** Discuss amputation for pain control and preventing sepsis [5][6]',
    citation: [5, 6],
    next: 'dfw-dispo-admit-floor',
  },

  {
    id: 'dfw-wound-exam',
    type: 'info',
    module: 1,
    title: 'Wound Examination',
    body: '**Systematic wound assessment:**\n\n**Location (affects healing):**\n- Forefoot: most common, better prognosis\n- Midfoot: Charcot zone, higher amputation risk\n- Hindfoot/heel: worst prognosis, difficult offloading\n\n**Size:**\n- Measure after debridement\n- Length x width in cm\n- >2 cm² is independent risk factor for osteomyelitis\n\n**Depth (use blunt probe):**\n- Superficial: epidermis/dermis only\n- Deep: tendon, joint capsule, fascia\n- Bone: visible or palpable\n\n**Tissue type:**\n- Granulating (healthy red tissue)\n- Slough (yellow fibrinous tissue)\n- Eschar (black necrotic tissue)\n- Exposed structures (tendon, bone)\n\n**Surrounding skin:**\n- Erythema extent (measure from wound edge)\n- Warmth, induration\n- Maceration\n- Callus (neuropathic pressure point)\n\n**Exudate:**\n- None, serous, serosanguinous, purulent\n- Amount: minimal, moderate, copious\n\n**Neuropathy assessment:**\n- 10g monofilament test (loss = neuropathy)\n- 128 Hz tuning fork (vibration sense)\n- Ankle reflexes [1][7]',
    citation: [1, 7],
    calculatorLinks: [
      { id: 'dfw-wagner-pedis', label: 'Wagner/PEDIS Classification' },
    ],
    next: 'dfw-classification',
  },

  {
    id: 'dfw-classification',
    type: 'info',
    module: 1,
    title: 'Wound Classification Systems',
    body: '**Wagner Classification (0-5):**\n| Grade | Description |\n|-------|-------------|\n| 0 | Pre-ulcerative (intact skin, deformity, cellulitis) |\n| 1 | Superficial ulcer (epidermis/dermis only) |\n| 2 | Deep ulcer (tendon, joint, fascia - no abscess/osteo) |\n| 3 | Deep ulcer WITH abscess, osteomyelitis, or tendonitis |\n| 4 | Partial gangrene (toes or forefoot) |\n| 5 | Extensive gangrene (entire foot) |\n\n**University of Texas (UT) System:**\n- Grade 0-3 (depth) x Stage A-D (complications)\n- Stage A: no infection, no ischemia\n- Stage B: infection present\n- Stage C: ischemia present\n- Stage D: BOTH infection AND ischemia (worst prognosis)\n\n**SINBAD Score (0-6 points):**\n| Factor | 0 points | 1 point |\n|--------|----------|--------|\n| Site | Forefoot | Midfoot/hindfoot |\n| Ischemia | Pulses present | PAD signs |\n| Neuropathy | Sensation intact | Loss of sensation |\n| Bacterial infection | None | Present |\n| Area | <1 cm² | ≥1 cm² |\n| Depth | Superficial | Deep |\n\nScore <3: 60% heal at 12 weeks, 0.7% major amputation\nScore ≥3: 35% heal at 12 weeks, 2.7% major amputation [7][8]',
    citation: [7, 8],
    calculatorLinks: [
      { id: 'dfw-wagner-pedis', label: 'Wagner/PEDIS Classification' },
    ],
    next: 'dfw-infection-intro',
  },

  // =====================================================================
  // MODULE 2: INFECTION SEVERITY
  // =====================================================================

  {
    id: 'dfw-infection-intro',
    type: 'info',
    module: 2,
    title: 'Infection Assessment: IDSA/IWGDF 2023',
    body: '**IDSA/IWGDF 2023 infection classification guides treatment setting and antibiotics.**\n\n| Grade | Severity | Clinical Findings |\n|-------|----------|-------------------|\n| 1 | Uninfected | No purulence or inflammation |\n| 2 | Mild | ≥2 inflammation signs AND erythema 0.5-2cm AND limited to skin/subQ |\n| 3 | Moderate | Systemically well BUT: erythema >2cm, lymphangitis, deep tissue, abscess, gangrene, bone/joint |\n| 4 | Severe | Systemic toxicity OR metabolic instability |\n\n**Signs of inflammation (need ≥2 for Grade 2+):**\n- Purulence\n- Erythema\n- Warmth\n- Tenderness/pain\n- Induration\n\n**Grade 4 (Severe) criteria:**\n- Temperature >38°C or <36°C\n- Heart rate >90 bpm\n- Respiratory rate >20/min\n- WBC >12,000 or <4,000 or >10% bands\n- Severe hyperglycemia, acidosis, azotemia\n\n**CRITICAL:** Do NOT treat uninfected ulcers with antibiotics - even if osteomyelitis is on imaging! [1][9]',
    citation: [1, 9],
    calculatorLinks: [
      { id: 'dfw-idsa-severity', label: 'IDSA Infection Severity' },
    ],
    next: 'dfw-infection-assess',
  },

  {
    id: 'dfw-infection-assess',
    type: 'question',
    module: 2,
    title: 'Infection Severity Determination',
    body: '**Assess the wound for infection signs:**\n\n**Step 1: Look for ≥2 inflammation signs:**\n- Purulence or discharge\n- Erythema around wound\n- Warmth\n- Tenderness or pain\n- Induration or swelling\n\n**Step 2: Measure erythema from wound edge**\n\n**Step 3: Assess depth of infection:**\n- Limited to skin/subcutaneous?\n- Involves deep structures (fascia, muscle, tendon, bone)?\n\n**Step 4: Check for systemic signs:**\n- Fever, tachycardia, tachypnea\n- Altered mental status\n- Severe hyperglycemia, metabolic instability\n\nWhat is the infection severity?',
    citation: [1, 9],
    calculatorLinks: [
      { id: 'dfw-idsa-severity', label: 'IDSA Infection Severity' },
    ],
    options: [
      { label: 'Grade 1 - Uninfected', description: 'No purulence or inflammation signs', next: 'dfw-grade1-uninfected' },
      { label: 'Grade 2 - Mild', description: '≥2 inflammation signs, erythema 0.5-2cm, skin/subQ only', next: 'dfw-grade2-mild' },
      { label: 'Grade 3 - Moderate', description: 'Erythema >2cm OR deep tissue OR abscess OR bone', next: 'dfw-grade3-moderate', urgency: 'urgent' },
      { label: 'Grade 4 - Severe', description: 'Systemic toxicity or metabolic instability', next: 'dfw-grade4-severe', urgency: 'critical' },
    ],
  },

  {
    id: 'dfw-grade1-uninfected',
    type: 'info',
    module: 2,
    title: 'Grade 1 - Uninfected Wound',
    body: '**No antibiotics indicated for uninfected diabetic foot ulcers.**\n\n**Management focus:**\n1. **Wound care:**\n   - Sharp debridement of callus and necrotic tissue\n   - Moisture-balanced dressing\n   - Protect from trauma\n\n2. **Offloading:**\n   - Total contact cast (gold standard) - 90% healing at 12 weeks\n   - Irremovable cast walker (iRCW) - equivalent efficacy\n   - Removable cast walker if frequent inspection needed\n\n3. **Vascular assessment:**\n   - Check pulses, obtain TBI if diabetic\n   - Refer to vascular if TBI <0.6\n\n4. **Glucose optimization:**\n   - Target HbA1c per guidelines\n   - Poor control impairs healing\n\n5. **Follow-up:**\n   - Wound clinic or podiatry within 1-2 weeks\n   - Patient education on foot inspection, footwear\n\n**If not healing at 4 weeks despite optimal care:** Re-evaluate for occult infection, ischemia, or need for advanced therapies [1][10]',
    citation: [1, 10],
    next: 'dfw-vascular-intro',
  },

  {
    id: 'dfw-grade2-mild',
    type: 'info',
    module: 2,
    title: 'Grade 2 - Mild Infection (Outpatient)',
    body: '**Mild DFI can be managed as outpatient with oral antibiotics.**\n\n**Target pathogens:** Gram-positive cocci (Staph aureus, Streptococcus)\n\n**First-line oral regimens (7-14 days):**\n\n| Antibiotic | Dose |\n|------------|------|\n| Cephalexin | 500 mg QID |\n| Dicloxacillin | 500 mg QID |\n| Amoxicillin-clavulanate | 875/125 mg BID |\n| Clindamycin | 300-450 mg TID |\n\n**If MRSA suspected (add or substitute):**\n| Antibiotic | Dose |\n|------------|------|\n| TMP-SMX | 1-2 DS tabs BID |\n| Doxycycline | 100 mg BID |\n| Clindamycin | 300-450 mg TID |\n\n**MRSA risk factors:**\n- Prior MRSA infection/colonization\n- Recent hospitalization/antibiotics\n- Nursing home, hemodialysis\n- Failed outpatient therapy\n\n**Outpatient criteria (ALL must be met):**\n- No systemic toxicity\n- No deep abscess requiring I&D\n- Adequate home support\n- Access to follow-up in 48-72 hours\n- Can obtain antibiotics [9][11]',
    citation: [9, 11],
    treatment: {
      firstLine: {
        drug: 'Cephalexin',
        dose: '500 mg',
        route: 'PO',
        frequency: 'QID',
        duration: '7-14 days',
        notes: 'Or amoxicillin-clavulanate 875/125 BID. Add TMP-SMX if MRSA risk.',
      },
      alternative: {
        drug: 'TMP-SMX (if MRSA concern)',
        dose: '1-2 DS tablets',
        route: 'PO',
        frequency: 'BID',
        duration: '7-14 days',
        notes: 'Can combine with cephalexin for broader coverage.',
      },
      monitoring: 'Follow-up in 48-72 hours. Return precautions for spreading erythema, fever, worsening pain.',
    },
    calculatorLinks: [
      { id: 'dfw-abx-selector', label: 'Antibiotic Selector' },
    ],
    next: 'dfw-vascular-intro',
  },

  {
    id: 'dfw-grade3-moderate',
    type: 'info',
    module: 2,
    title: 'Grade 3 - Moderate Infection',
    body: '**Moderate DFI often requires hospitalization for IV antibiotics and close monitoring.**\n\n**Target pathogens:** Staph aureus, Streptococcus, Enterobacteriaceae, anaerobes\n\n**Oral options (if can discharge):**\n| Regimen | Notes |\n|---------|-------|\n| Amox-clav 875/125 BID | Good broad coverage |\n| Levofloxacin 750 daily + Clindamycin 450 TID | FQ + anaerobic |\n| Moxifloxacin 400 daily | Monotherapy option |\n\n**IV regimens (if admitted):**\n| Regimen | Notes |\n|---------|-------|\n| Ampicillin-sulbactam 3g q6h | First-line |\n| Piperacillin-tazobactam 4.5g q8h | Broader gram-negative |\n| Ceftriaxone 1-2g daily + Metronidazole 500mg q8h | Alternative |\n| Ertapenem 1g daily | Once-daily option |\n\n**Add vancomycin 15-20 mg/kg q8-12h if MRSA risk.**\n\n**Admission criteria (ANY warrants hospitalization):**\n- Deep abscess requiring I&D\n- Gangrene\n- Osteomyelitis requiring surgery\n- Critical limb ischemia\n- Need for IV antibiotics\n- Inadequate home support\n\n**Duration:** 1-2 weeks (up to 4 weeks if severe PAD or slow healing) [9][11]',
    citation: [9, 11],
    treatment: {
      firstLine: {
        drug: 'Ampicillin-sulbactam',
        dose: '3 g',
        route: 'IV',
        frequency: 'q6h',
        duration: '1-2 weeks',
        notes: 'Add vancomycin if MRSA risk. Consider ID consult.',
      },
      alternative: {
        drug: 'Piperacillin-tazobactam',
        dose: '4.5 g',
        route: 'IV',
        frequency: 'q8h',
        duration: '1-2 weeks',
        notes: 'Broader gram-negative coverage. Preferred if prior antibiotics.',
      },
      monitoring: 'Daily wound checks. CBC, BMP, inflammatory markers. Surgical consult if abscess.',
    },
    calculatorLinks: [
      { id: 'dfw-abx-selector', label: 'Antibiotic Selector' },
    ],
    next: 'dfw-vascular-intro',
  },

  {
    id: 'dfw-grade4-severe',
    type: 'info',
    module: 2,
    title: 'Grade 4 - Severe Infection',
    body: '**Severe DFI requires hospitalization, broad-spectrum IV antibiotics, and often surgery.**\n\n**Target pathogens:** MRSA, Pseudomonas (if risk factors), Enterobacteriaceae, anaerobes\n\n**Empiric regimen:**\n| Drug | Dose |\n|------|------|\n| **Vancomycin** | 15-20 mg/kg q8-12h (target trough 15-20) |\n| **PLUS one of:** | |\n| Piperacillin-tazobactam | 4.5 g q6h |\n| Meropenem | 1 g q8h |\n| Cefepime + Metronidazole | 2g q8h + 500mg q8h |\n\n**Pseudomonas risk factors:**\n- Prior Pseudomonas infection\n- Water exposure\n- Chronic wounds with maceration\n- Failed prior antibiotics\n\n**Cultures:**\n- Obtain tissue culture (preferred) or deep swab BEFORE antibiotics if possible\n- Blood cultures x2\n- Bone culture if osteomyelitis (gold standard)\n\n**Surgical consultation STAT if:**\n- Deep abscess\n- Necrotizing infection suspected\n- Wet gangrene\n- Compartment syndrome\n- Extensive necrotic tissue\n\n**Duration:** 10 days with debridement. 6 weeks if osteomyelitis without resection. [9][11]',
    citation: [9, 11],
    treatment: {
      firstLine: {
        drug: 'Vancomycin + Piperacillin-tazobactam',
        dose: 'Vanc 15-20 mg/kg, Pip-tazo 4.5g',
        route: 'IV',
        frequency: 'Vanc q8-12h, Pip-tazo q6h',
        duration: '10 days (6 weeks if osteomyelitis)',
        notes: 'Surgical consult STAT. Tissue cultures before antibiotics if possible.',
        confidence: 'critical',
      },
      alternative: {
        drug: 'Vancomycin + Meropenem',
        dose: 'Vanc 15-20 mg/kg, Meropenem 1g',
        route: 'IV',
        frequency: 'Vanc q8-12h, Meropenem q8h',
        duration: '10 days (6 weeks if osteomyelitis)',
        notes: 'For penicillin allergy or ESBL concern.',
      },
      monitoring: 'ICU if septic. Surgical reassessment daily. Vanc troughs. Lactate, CBC, BMP q6h initially.',
    },
    calculatorLinks: [
      { id: 'dfw-abx-selector', label: 'Antibiotic Selector' },
    ],
    next: 'dfw-vascular-intro',
  },

  // =====================================================================
  // MODULE 3: VASCULAR ASSESSMENT
  // =====================================================================

  {
    id: 'dfw-vascular-intro',
    type: 'info',
    module: 3,
    title: 'Vascular Assessment: Why TBI Over ABI',
    body: '**Ankle-Brachial Index (ABI) is UNRELIABLE in diabetics.**\n\n**The problem:** Medial arterial calcification makes vessels non-compressible, falsely elevating ABI.\n\n**ABI sensitivity for PAD in diabetics: ~35%**\n\n**Solution: Use Toe-Brachial Index (TBI)**\n- Digital arteries are typically spared from calcification\n- More accurate in diabetics and ESRD patients\n\n**TBI Interpretation:**\n| TBI | Interpretation |\n|-----|----------------|\n| ≥0.75 | PAD unlikely |\n| 0.60-0.74 | Borderline |\n| <0.60 | PAD present |\n| <0.30 | Healing unlikely |\n\n**ABI Interpretation (if TBI unavailable):**\n| ABI | Interpretation |\n|-----|----------------|\n| >1.40 | Non-compressible - UNRELIABLE |\n| 1.00-1.40 | Normal |\n| 0.91-0.99 | Borderline |\n| 0.71-0.90 | Mild PAD |\n| 0.41-0.70 | Moderate PAD |\n| <0.40 | Severe PAD |\n| <0.25 | Critical ischemia |\n\n**If ABI >1.40:** Must obtain TBI or TcPO2 for accurate assessment. [5][6]',
    citation: [5, 6],
    calculatorLinks: [
      { id: 'dfw-vascular-interpreter', label: 'Vascular Assessment Interpreter' },
    ],
    next: 'dfw-vascular-tcpo2',
  },

  {
    id: 'dfw-vascular-tcpo2',
    type: 'info',
    module: 3,
    title: 'TcPO2 and Wound Healing',
    body: '**Transcutaneous Oxygen Pressure (TcPO2)** measures skin oxygenation and predicts healing.\n\n**TcPO2 Interpretation:**\n| TcPO2 | Interpretation |\n|-------|----------------|\n| ≥40 mmHg | Normal, adequate for healing |\n| 25-40 mmHg | Compromised, consider revascularization |\n| <25 mmHg | Healing UNLIKELY without revascularization |\n\n**Indications for URGENT vascular imaging:**\n- Ankle pressure <50 mmHg\n- ABI <0.5\n- Toe pressure <30 mmHg\n- TcPO2 <25 mmHg\n- Non-healing wound despite optimal care\n- Rest pain\n\n**Imaging options:**\n- **Duplex ultrasound:** Non-invasive, no contrast, operator-dependent\n- **CTA:** Rapid, detailed, requires contrast (renal considerations)\n- **MRA:** No radiation, gadolinium contrast\n- **Angiography:** Gold standard, allows intervention\n\n**WIfI Classification** (SVS) predicts amputation risk:\n- Wound (0-3) + Ischemia (0-3) + foot Infection (0-3)\n- Stage 4: 38% one-year amputation risk\n- Guides timing and aggressiveness of revascularization [5][6]',
    citation: [5, 6],
    calculatorLinks: [
      { id: 'dfw-vascular-interpreter', label: 'Vascular Assessment Interpreter' },
    ],
    next: 'dfw-vascular-decision',
  },

  {
    id: 'dfw-vascular-decision',
    type: 'question',
    module: 3,
    title: 'Vascular Status Assessment',
    body: '**Assess perfusion using clinical exam and objective measurements.**\n\n**Clinical signs of PAD:**\n- Absent or diminished pedal pulses\n- Cool extremity\n- Dependent rubor, elevation pallor\n- Prolonged capillary refill (>3 seconds)\n- Hair loss, shiny skin, nail changes\n- Rest pain (burning, worse at night)\n\n**Objective measurements:**\n- ABI (if non-compressible, use TBI)\n- TBI (preferred in diabetics)\n- Toe pressure\n- TcPO2 (if available)\n\nWhat is the vascular status?',
    citation: [5, 6],
    calculatorLinks: [
      { id: 'dfw-vascular-interpreter', label: 'Vascular Assessment Interpreter' },
    ],
    options: [
      { label: 'Adequate perfusion', description: 'Pulses present, TBI ≥0.6, TcPO2 ≥40', next: 'dfw-osteo-intro' },
      { label: 'Mild-moderate PAD', description: 'TBI 0.30-0.59, TcPO2 25-40', next: 'dfw-pad-moderate' },
      { label: 'Severe PAD / CLTI', description: 'TBI <0.30, toe pressure <30, TcPO2 <25', next: 'dfw-pad-severe', urgency: 'urgent' },
      { label: 'Non-compressible (ABI >1.4)', description: 'Need TBI or TcPO2 for accurate assessment', next: 'dfw-non-compressible' },
    ],
  },

  {
    id: 'dfw-pad-moderate',
    type: 'info',
    module: 3,
    title: 'Mild-Moderate PAD Management',
    body: '**Wound healing may be delayed but is possible with optimal care.**\n\n**Management:**\n1. **Optimize wound care and offloading**\n2. **Control infection aggressively**\n3. **Vascular surgery referral** (semi-urgent, within 1-2 weeks)\n4. **Medical optimization:**\n   - Statin therapy (regardless of LDL)\n   - Antiplatelet (aspirin or clopidogrel)\n   - Smoking cessation\n   - Glucose control\n   - Blood pressure control\n\n**Consider vascular imaging if:**\n- Wound not improving at 4 weeks\n- Large or deep wound\n- Multiple ulcers\n- Prior amputation\n\n**Revascularization indications:**\n- Wound not healing despite optimal care\n- Pain limiting function\n- TcPO2 <25 at wound site\n\n**Close follow-up:** Wound clinic within 1-2 weeks to reassess healing trajectory [5][6]',
    citation: [5, 6],
    next: 'dfw-osteo-intro',
  },

  {
    id: 'dfw-pad-severe',
    type: 'info',
    module: 3,
    title: 'Severe PAD / CLTI',
    body: '**Severe PAD = limb-threatening. Urgent vascular intervention needed.**\n\n**Immediate actions:**\n1. **STAT vascular surgery consultation**\n2. **Vascular imaging** (CTA or duplex)\n3. **Pain management** - dependency positioning, opioids\n4. **Avoid:**\n   - Compression bandages\n   - Heat/cold application\n   - Elevation (worsens ischemia)\n\n**Revascularization urgency:**\n| Finding | Timeline |\n|---------|---------|\n| Rest pain only | Days to 1 week |\n| Tissue loss without infection | 1-2 weeks |\n| Tissue loss WITH infection | 24-48 hours |\n| Wet gangrene/sepsis | EMERGENT |\n\n**If non-revascularizable:**\n- Discuss realistic prognosis with patient/family\n- Primary amputation may be best option\n- Level determined by TcPO2 and tissue viability\n- Palliative care involvement for non-operative candidates\n\n**Pearl:** Infection control may require amputation BEFORE revascularization in some cases [5][6]',
    citation: [5, 6],
    next: 'dfw-osteo-intro',
  },

  {
    id: 'dfw-non-compressible',
    type: 'info',
    module: 3,
    title: 'Non-Compressible Vessels (ABI >1.4)',
    body: '**ABI >1.4 indicates calcified, non-compressible vessels - ABI is UNRELIABLE.**\n\n**Common in:**\n- Diabetes mellitus\n- End-stage renal disease\n- Advanced age\n\n**Alternative assessments needed:**\n\n**1. Toe-Brachial Index (TBI)** - preferred\n- Digital arteries typically spared from calcification\n- TBI <0.6 indicates PAD\n- TBI <0.3 indicates critical ischemia\n\n**2. TcPO2**\n- Direct measurement of tissue oxygenation\n- <25 mmHg = healing unlikely\n\n**3. Toe pressure (absolute)**\n- <30 mmHg = critical ischemia\n- 30-50 mmHg = compromised\n- >50 mmHg = likely adequate\n\n**4. Waveform analysis**\n- Monophasic waveform suggests significant PAD\n- Even with "normal" ABI\n\n**If TBI/TcPO2 unavailable:**\n- Clinical assessment of pulses\n- Capillary refill\n- Doppler waveform quality\n- Refer for formal vascular lab evaluation [5][6]',
    citation: [5, 6],
    next: 'dfw-osteo-intro',
  },

  // =====================================================================
  // MODULE 4: OSTEOMYELITIS WORKUP
  // =====================================================================

  {
    id: 'dfw-osteo-intro',
    type: 'info',
    module: 4,
    title: 'Osteomyelitis Workup: When to Suspect',
    body: '**Osteomyelitis complicates 20-60% of diabetic foot infections.**\n\n**High-risk features:**\n- Ulcer present >2 weeks\n- Ulcer size >2 cm²\n- **Positive probe-to-bone test**\n- Visible bone or "sausage-shaped" toe\n- ESR >70 mm/hr (highly suggestive)\n- Prior history of foot osteomyelitis\n- Wagner Grade 3+ wound\n\n**Probe-to-Bone (PTB) Test:**\n- Technique: Insert sterile blunt probe into ulcer base\n- Positive: Hard, gritty sensation of bone\n- Sensitivity: 87% | Specificity: 83%\n- Positive LR: 4.3-9.4\n\n**Important nuances:**\n- In HIGH pretest probability: Positive PTB = highly suggestive of osteo\n- Negative PTB does NOT exclude osteomyelitis\n- Best used in combination with imaging\n\n**Laboratory markers:**\n- ESR: >70 mm/hr strongly associated with osteo\n- CRP: Elevated but less specific\n- WBC: May be normal in chronic osteo\n- Procalcitonin: Not validated for DFO [12][13]',
    citation: [12, 13],
    calculatorLinks: [
      { id: 'dfw-osteo-probability', label: 'Osteomyelitis Probability' },
    ],
    next: 'dfw-osteo-imaging',
  },

  {
    id: 'dfw-osteo-imaging',
    type: 'info',
    module: 4,
    title: 'Osteomyelitis Imaging Algorithm',
    body: '**Step 1: Plain Radiographs (X-Ray)**\n- Order for ALL suspected DFI\n- Sensitivity: 54% | Specificity: 68%\n- May take 2-3 weeks for changes to appear\n- Look for: cortical erosion, periosteal reaction, sequestrum, involucrum, soft tissue gas\n\n**Step 2: MRI (Gold Standard for diagnosis)**\n- Sensitivity: 90-96% | Specificity: 79-84%\n- **Indications:**\n  - Negative or equivocal X-ray with clinical concern\n  - Positive probe-to-bone test\n  - Planning surgical debridement/amputation level\n  - Non-healing wound despite treatment\n\n**MRI findings:**\n- T1: Low signal in bone marrow (replaces normal fat)\n- T2/STIR: High signal in bone marrow\n- Post-contrast: Enhancement of bone and soft tissue\n\n**Step 3: Bone Biopsy (Definitive)**\n- Sensitivity: 95% | Specificity: 99%\n- Indications:\n  - Definitive diagnosis required\n  - Culture/susceptibility needed\n  - Non-response to empiric antibiotics\n\n**CAVEAT:** MRI cannot always distinguish osteomyelitis from acute Charcot neuroarthropathy [12][13]',
    citation: [12, 13],
    next: 'dfw-osteo-combined',
  },

  {
    id: 'dfw-osteo-combined',
    type: 'info',
    module: 4,
    title: 'Combined Diagnostic Approach',
    body: '**Use clinical findings + imaging together for accurate diagnosis.**\n\n| Finding Combination | Likelihood |\n|--------------------|------------|\n| PTB positive + Positive X-ray | Osteomyelitis VERY LIKELY (>90%) |\n| PTB positive + Negative X-ray | Order MRI |\n| PTB negative + Negative X-ray | Low probability (but MRI if clinical concern) |\n| ESR >70 + Ulcer >2 cm | High probability, consider MRI |\n\n**Decision pathway:**\n1. Clinical suspicion + PTB test\n2. Plain radiograph\n3. If X-ray negative but clinical concern: MRI\n4. If diagnosis unclear or culture needed: Bone biopsy\n\n**When to obtain bone biopsy:**\n- Empiric antibiotics failing\n- Prior osteo with different location\n- Need for culture-directed therapy\n- Surgical planning\n\n**Biopsy technique:**\n- Through uninfected skin if possible\n- Avoid going through open wound\n- Send for culture AND histopathology\n- Hold antibiotics 48-72h before if clinically safe [12][13]',
    citation: [12, 13],
    calculatorLinks: [
      { id: 'dfw-osteo-probability', label: 'Osteomyelitis Probability' },
    ],
    next: 'dfw-osteo-treatment',
  },

  {
    id: 'dfw-osteo-treatment',
    type: 'info',
    module: 4,
    title: 'Osteomyelitis Treatment',
    body: '**Treatment depends on surgical intervention.**\n\n**Duration of antibiotic therapy:**\n| Scenario | Duration |\n|----------|----------|\n| Surgical resection + negative margins | 3 weeks |\n| Surgical resection + positive margins | 6 weeks |\n| No surgery (medical management only) | 6+ weeks |\n| Soft tissue infection post-debridement | 10 days |\n\n**Empiric antibiotics (pending cultures):**\nSame as moderate-severe DFI regimens, but:\n- Choose agents with good bone penetration\n- Oral options: fluoroquinolones, linezolid, TMP-SMX, rifampin (adjunct)\n\n**Oral agents with good bone penetration:**\n| Agent | Notes |\n|-------|-------|\n| Fluoroquinolones | Good bone penetration, cover gram-neg |\n| Linezolid | MRSA, good bone penetration |\n| TMP-SMX | MRSA, moderate bone penetration |\n| Rifampin | Adjunct only, excellent bone penetration |\n| Metronidazole | Anaerobes, good bone penetration |\n\n**2023 Update:** Post-treatment follow-up for osteomyelitis remission reduced from 12 to 6 months.\n\n**Failure criteria:** Persistent drainage, non-healing wound, new bone destruction on imaging, persistent elevated inflammatory markers [9][13]',
    citation: [9, 13],
    next: 'dfw-charcot-intro',
  },

  // =====================================================================
  // MODULE 5: CHARCOT FOOT
  // =====================================================================

  {
    id: 'dfw-charcot-intro',
    type: 'info',
    module: 5,
    title: 'Charcot Foot: A Commonly Missed Diagnosis',
    body: '**Charcot neuroarthropathy (CN) is a MEDICAL EMERGENCY that can lead to irreversible deformity.**\n\n**Prevalence:** Up to 13% of diabetics with neuropathy\n\n**CRITICAL FACT: 25% of acute Charcot is MISDIAGNOSED** (as cellulitis, gout, DVT, sprain)\n\n**Average delay to diagnosis: 7 months**\n\n**Risk factors:**\n- Diabetes with peripheral neuropathy (most common)\n- Long-standing diabetes (>10 years)\n- Tight glycemic control (relative)\n- Prior foot surgery or trauma\n- Obesity\n- Renal transplant patients\n\n**Pathophysiology:**\n- Autonomic neuropathy → increased blood flow → bone resorption\n- Sensory neuropathy → continued weight-bearing despite injury\n- Motor neuropathy → abnormal biomechanics\n- Result: Progressive bone destruction, fragmentation, deformity\n\n**Most common location:** Midfoot (tarsometatarsal joints - Lisfranc area) [14][15]',
    citation: [14, 15],
    next: 'dfw-charcot-presentation',
  },

  {
    id: 'dfw-charcot-presentation',
    type: 'info',
    module: 5,
    title: 'Acute Charcot: Clinical Presentation',
    body: '**Classic triad of acute Charcot:**\n1. **Unilateral swollen foot/ankle**\n2. **Warmth** (2-8°C difference vs. contralateral)\n3. **Erythema**\n\n**Key distinguishing features from infection:**\n| Feature | Acute Charcot | Osteomyelitis/Cellulitis |\n|---------|---------------|-------------------------|\n| Open wound | Usually ABSENT | Usually PRESENT |\n| Fever | Absent | May be present |\n| WBC | Normal | Often elevated |\n| ESR/CRP | Mildly elevated | Significantly elevated |\n| Pain | Minimal (neuropathy) | Variable |\n| Pulses | Often bounding | Variable |\n\n**Red flags for Charcot:**\n- Diabetic >40 years with neuropathy\n- Red, hot, swollen foot WITHOUT open wound\n- Minimal or no pain despite appearance\n- History of minor or unrecalled trauma\n- Normal systemic vitals and labs\n- Patient walking on affected foot without complaint\n\n**Diagnostic approach:**\n1. Compare temperature to contralateral foot\n2. Weight-bearing X-rays (may be normal early)\n3. MRI if X-ray normal but high clinical suspicion\n4. Labs: CBC, BMP, ESR, CRP (to help r/o infection) [14][15]',
    citation: [14, 15],
    next: 'dfw-charcot-staging',
  },

  {
    id: 'dfw-charcot-staging',
    type: 'info',
    module: 5,
    title: 'Eichenholtz Staging',
    body: '**Eichenholtz Classification (Stages 0-3):**\n\n| Stage | Name | Clinical | Radiographic |\n|-------|------|----------|---------------|\n| 0 | Pre-clinical | Warm, swollen, painful | Normal X-ray, marrow edema on MRI |\n| 1 | Development/Fragmentation | Red, hot, swollen | Osteopenia, fragmentation, subluxation |\n| 2 | Coalescence | Decreased warmth/swelling | Absorption of debris, sclerosis |\n| 3 | Reconstruction | No inflammation | Remodeling, fusion, stable deformity |\n\n**Stage 0 is critical to recognize:**\n- X-ray is NORMAL\n- MRI shows bone marrow edema\n- Clinical suspicion drives diagnosis\n- Early treatment prevents deformity\n\n**Progression:**\n- Without treatment: Stage 1 → rocker-bottom deformity → ulceration → amputation\n- With early treatment: Can arrest progression and preserve function\n\n**Treatment varies by stage:**\n- Acute (0-1): Strict offloading, immobilization\n- Coalescence (2): Gradual weight-bearing\n- Reconstruction (3): Custom orthotics, possibly surgery for deformity [14][15]',
    citation: [14, 15],
    next: 'dfw-charcot-management',
  },

  {
    id: 'dfw-charcot-management',
    type: 'info',
    module: 5,
    title: 'Acute Charcot ED Management',
    body: '**Acute Charcot is a LIMB-THREATENING condition requiring immediate intervention.**\n\n**ED Management:**\n\n**1. Immediate offloading:**\n- CAM boot or wheelchair\n- **Strict non-weight-bearing**\n- Do NOT use splint that patient might not follow up to remove\n\n**2. Patient education:**\n- Emphasize this is a MEDICAL EMERGENCY\n- Continued walking will cause permanent deformity\n- May require months of immobilization\n\n**3. Glycemic control:**\n- Optimize glucose management\n- Poor control worsens bone resorption\n\n**4. Urgent referral:**\n- Podiatry or foot/ankle orthopedics within 24-48 hours\n- Do NOT discharge without clear follow-up plan\n\n**5. Consider admission if:**\n- Unable to comply with non-weight-bearing\n- Inadequate social support\n- Concurrent infection\n- Severe deformity with skin compromise\n\n**Total Contact Cast (TCC):**\n- Gold standard for offloading\n- Applied by trained specialist\n- Not typically done in ED\n- Referral should be for TCC application [14][15]',
    citation: [14, 15],
    next: 'dfw-charcot-vs-infection',
  },

  {
    id: 'dfw-charcot-vs-infection',
    type: 'info',
    module: 5,
    title: 'Differentiating Charcot from Infection',
    body: '**This is one of the most challenging diagnostic dilemmas in DFU management.**\n\n**Clinical clues favoring Charcot:**\n- No open wound or ulcer\n- Bilateral warmth (sometimes)\n- Pain minimal or absent\n- Normal WBC\n- ESR/CRP mildly elevated (<40)\n- Patient afebrile\n- Bounding pulses\n\n**Clinical clues favoring infection:**\n- Open wound or ulcer present\n- Unilateral warmth with wound\n- Pain present (unless severe neuropathy)\n- Elevated WBC\n- ESR/CRP significantly elevated (>70)\n- Fever or systemic symptoms\n- Purulent drainage\n\n**When both coexist:**\n- Treat the infection AND offload for Charcot\n- More common than isolated Charcot\n- Worse prognosis\n\n**MRI findings:**\n- Charcot: Diffuse marrow edema, often bilateral, no focal bone destruction\n- Osteomyelitis: Focal bone destruction adjacent to ulcer, cortical disruption\n\n**When uncertain:** Treat for BOTH until proven otherwise. Better to offload unnecessarily than miss Charcot. [14][15]',
    citation: [14, 15],
    next: 'dfw-treatment-overview',
  },

  // =====================================================================
  // MODULE 6: TREATMENT & DISPOSITION
  // =====================================================================

  {
    id: 'dfw-treatment-overview',
    type: 'info',
    module: 6,
    title: 'Treatment Overview: Multidisciplinary Approach',
    body: '**Diabetic foot wounds require a multidisciplinary team.**\n\n**Core team members:**\n- Emergency medicine (initial stabilization, workup)\n- Podiatry/foot surgery (wound care, offloading, debridement)\n- Vascular surgery (revascularization)\n- Infectious disease (complex infections, osteomyelitis)\n- Endocrinology (glucose optimization)\n- Wound care specialists\n\n**Treatment pillars:**\n1. **Infection control** - antibiotics, debridement, source control\n2. **Vascular optimization** - revascularization if needed\n3. **Offloading** - the most underutilized intervention\n4. **Wound care** - debridement, appropriate dressings\n5. **Glucose control** - target HbA1c, avoid hypoglycemia\n6. **Risk factor modification** - smoking cessation, BP, lipids\n\n**Why offloading is critical:**\n- Neuropathy → no pain signal → continued pressure\n- Continued pressure → tissue ischemia → wound expansion\n- Total contact cast: 90% healing at 12 weeks\n- Removable walker: 65% healing (compliance issue) [1][10]',
    citation: [1, 10],
    next: 'dfw-surgical-indications',
  },

  {
    id: 'dfw-surgical-indications',
    type: 'info',
    module: 6,
    title: 'Surgical Indications',
    body: '**Emergency Surgery (Within Hours):**\n| Indication | Action |\n|------------|--------|\n| Necrotizing fasciitis | IMMEDIATE fasciotomy, debridement |\n| Gas gangrene | IMMEDIATE debridement/amputation |\n| Compartment syndrome | IMMEDIATE fasciotomy |\n| Wet gangrene with sepsis | EMERGENT amputation |\n\n**Urgent Surgery (24-48 Hours):**\n| Indication | Action |\n|------------|--------|\n| Deep abscess | I&D |\n| Moderate-severe DFI with complications | Debridement |\n| Extensive necrotic tissue | Debridement |\n| Osteomyelitis requiring resection | Bone resection |\n\n**Semi-Urgent/Elective:**\n| Indication | Action |\n|------------|--------|\n| Chronic osteomyelitis | Elective bone resection |\n| Charcot deformity | Corrective surgery |\n| Recurrent ulceration | Pressure-relieving surgery |\n\n**Amputation level determination:**\n- TcPO2 >25 mmHg at proposed level\n- Toe pressure >30 mmHg\n- Palpable pulse at level above\n- Adequate soft tissue coverage [3][5]',
    citation: [3, 5],
    next: 'dfw-wound-care',
  },

  {
    id: 'dfw-wound-care',
    type: 'info',
    module: 6,
    title: 'Wound Care Principles',
    body: '**Debridement:**\n- Sharp/surgical debridement is most effective\n- Remove callus, necrotic tissue, biofilm\n- Enables accurate wound assessment\n- Stimulates healing by converting chronic to acute wound\n- Frequency: weekly in outpatient setting\n\n**Dressing selection:**\n| Wound Type | Dressing Choice |\n|------------|----------------|\n| Dry wound | Hydrogel, hydrocolloid |\n| Moist wound | Foam, alginate |\n| Heavy exudate | Alginate, foam, hydrofiber |\n| Infected | Silver-containing, iodine-containing |\n| Deep cavity | Alginate rope, hydrofiber |\n\n**IWGDF 2023:** No strong evidence for superiority of any specific advanced dressing. Focus on:\n- Moisture balance\n- Infection control\n- Regular assessment\n\n**Negative Pressure Wound Therapy (NPWT):**\n- Post-surgical wounds\n- Deep cavity wounds\n- High exudate\n- Bridge to surgery\n- NOT recommended for infection treatment\n\n**Adjunctive therapies NOT recommended:**\n- G-CSF, topical antiseptics, silver (for infection), honey, hyperbaric O2 (for infection) [10][16]',
    citation: [10, 16],
    next: 'dfw-offloading',
  },

  {
    id: 'dfw-offloading',
    type: 'info',
    module: 6,
    title: 'Offloading Devices',
    body: '**Offloading is the MOST important intervention for neuropathic DFU healing.**\n\n**Hierarchy (Most to Least Effective):**\n\n**1. Total Contact Cast (TCC)** - GOLD STANDARD\n- Non-removable\n- Redistributes pressure across entire foot\n- Healing rate: ~90% at 12 weeks\n- Requires trained application\n- Contraindicated: active infection, severe PAD, heavy drainage\n\n**2. Irremovable Cast Walker (iRCW)**\n- Removable walker made irremovable with wrap\n- Equal efficacy to TCC\n- Lower cost, easier application\n- Patient cannot remove\n\n**3. Removable Cast Walker (RCW)**\n- Allows wound inspection\n- Healing rate: ~65% at 12 weeks (lower due to non-compliance)\n- Use when frequent inspection needed\n\n**4. Half-shoe/Healing sandal**\n- Healing rate: ~58%\n- Less effective but better than nothing\n- Use when above options not possible\n\n**IWGDF Recommendation:**\n- Non-removable knee-high device (TCC or iRCW) for neuropathic plantar forefoot/midfoot ulcers\n- Removable device if contraindication to non-removable [10]',
    citation: [10],
    next: 'dfw-disposition-decision',
  },

  {
    id: 'dfw-disposition-decision',
    type: 'question',
    module: 6,
    title: 'Disposition Decision',
    body: '**Determine appropriate disposition based on clinical picture.**\n\n**Outpatient criteria (ALL must be met):**\n- Mild infection (IDSA Grade 2) or uninfected\n- No systemic toxicity\n- No deep abscess requiring I&D\n- Adequate perfusion (or PAD being addressed)\n- Adequate home support and compliance\n- Access to follow-up within 48-72 hours\n- Can obtain antibiotics\n- No prior failed outpatient treatment\n\n**Admission criteria (ANY warrants hospitalization):**\n- Severe infection (IDSA Grade 4)\n- Moderate infection with complications\n- Need for IV antibiotics\n- Need for urgent surgery\n- Critical limb ischemia\n- Acute Charcot with inability to offload\n- Metabolic instability (DKA, HHS)\n- Inadequate home support\n- Failed outpatient management\n\nWhat is the appropriate disposition?',
    citation: [1, 9],
    options: [
      { label: 'Discharge with outpatient follow-up', description: 'Mild or uninfected, stable, reliable follow-up', next: 'dfw-dispo-discharge' },
      { label: 'Admit to floor', description: 'Moderate infection, IV antibiotics, surgery consult', next: 'dfw-dispo-admit-floor' },
      { label: 'Admit to ICU', description: 'Severe infection, sepsis, emergent surgery', next: 'dfw-dispo-admit-icu', urgency: 'critical' },
    ],
  },

  {
    id: 'dfw-dispo-discharge',
    type: 'result',
    module: 6,
    title: 'Discharge with Follow-up',
    body: '**Pre-discharge checklist:**\n\n- [ ] Wound cleaned and dressed appropriately\n- [ ] Offloading device fitted (CAM boot, half-shoe, or referral for TCC)\n- [ ] Antibiotics prescribed (if infected) with clear duration\n- [ ] Patient demonstrates understanding of warning signs\n- [ ] Follow-up arranged within 48-72 hours:\n  - Wound clinic, podiatry, or PCP\n  - Vascular surgery if PAD concerns\n- [ ] Glucose control plan addressed\n- [ ] Prescription for antibiotics confirmed obtainable\n\n**Return precautions (give written instructions):**\n- Spreading redness beyond current margins\n- Increasing pain, swelling, or drainage\n- Fever >38°C (100.4°F)\n- New areas of discoloration or necrosis\n- Foul odor from wound\n- Feeling generally unwell\n\n**Patient education:**\n- Daily foot inspection\n- No walking barefoot\n- Proper footwear\n- Glucose monitoring and control\n- Smoking cessation if applicable',
    recommendation: 'Discharge with oral antibiotics (if indicated), offloading device, wound care supplies, and follow-up in 48-72 hours. Clear return precautions provided.',
    confidence: 'recommended',
    citation: [1, 9],
  },

  {
    id: 'dfw-dispo-admit-floor',
    type: 'result',
    module: 6,
    title: 'Admit to Medical/Surgical Floor',
    body: '**Admission orders:**\n\n**Consultations:**\n- [ ] Surgical/podiatry consult (if abscess, necrosis, osteo)\n- [ ] Vascular surgery (if PAD concerns)\n- [ ] Infectious disease (if osteomyelitis or complex infection)\n- [ ] Wound care team\n- [ ] Diabetes management team\n\n**Orders:**\n- [ ] IV antibiotics per IDSA grade\n- [ ] Glucose monitoring with sliding scale or insulin drip\n- [ ] Strict non-weight-bearing or offloading\n- [ ] Daily wound checks and dressing changes\n- [ ] Labs: CBC, BMP, ESR, CRP daily initially\n- [ ] X-ray if not done, MRI if osteomyelitis suspected\n- [ ] DVT prophylaxis\n- [ ] Pain management\n- [ ] Dietary consult for diabetes\n\n**Monitoring:**\n- Wound appearance daily\n- Vital signs q4-8h\n- Glucose per protocol\n- Inflammatory markers trending\n\n**Discharge criteria:**\n- Improving clinically\n- Able to take oral antibiotics\n- Reliable follow-up arranged\n- Offloading plan in place\n- Glucose controlled',
    recommendation: 'Admit for IV antibiotics, serial wound assessments, and multidisciplinary consultation. Surgical evaluation if abscess, necrosis, or osteomyelitis.',
    confidence: 'recommended',
    citation: [1, 9],
  },

  {
    id: 'dfw-dispo-admit-icu',
    type: 'result',
    module: 6,
    title: 'Admit to ICU',
    body: '**ICU admission criteria:**\n- Sepsis or septic shock\n- Necrotizing fasciitis\n- Need for emergent surgery\n- Hemodynamic instability\n- DKA or HHS\n- Respiratory failure\n\n**Immediate actions:**\n- [ ] Sepsis bundle if applicable (3-hour and 6-hour)\n- [ ] Broad-spectrum antibiotics STAT\n- [ ] Surgical consultation STAT\n- [ ] Central line and arterial line PRN\n- [ ] Aggressive fluid resuscitation\n- [ ] Vasopressors if needed\n- [ ] Glucose management (target 140-180)\n\n**Consultations:**\n- [ ] Surgery (emergent)\n- [ ] Vascular surgery (if ischemic)\n- [ ] Infectious disease\n- [ ] Endocrinology (if DKA/HHS)\n\n**Monitoring:**\n- Continuous telemetry\n- Arterial line for BP monitoring\n- Serial lactate (q2-4h)\n- Hourly urine output\n- Q4-6h CBC, BMP, coags\n- Repeat imaging as needed\n\n**Prepare for OR:**\n- NPO status\n- Blood bank: type and screen, consider crossmatch\n- Consent for amputation if indicated',
    recommendation: 'ICU admission for severe sepsis, necrotizing infection, or hemodynamic instability. Emergent surgical consultation. Broad-spectrum IV antibiotics. Sepsis bundle.',
    confidence: 'definitive',
    citation: [1, 9],
  },

  // =====================================================================
  // INFO OVERLAYS / SUMMARIES
  // =====================================================================

  {
    id: 'dfw-summary',
    type: 'info',
    module: 6,
    title: 'Diabetic Foot Wounds: Key Pearls',
    body: '**10 Key Clinical Pearls:**\n\n1. **25% of acute Charcot is misdiagnosed.** Think of it in any diabetic with a red, hot, swollen foot and normal labs.\n\n2. **ABI is unreliable in diabetics.** Use TBI instead due to medial arterial calcification.\n\n3. **Positive PTB + positive X-ray = osteomyelitis very likely.** Don\'t delay treatment for MRI.\n\n4. **Don\'t treat uninfected ulcers with antibiotics** - even if osteomyelitis is present on imaging. Wait for cultures.\n\n5. **Offloading is as important as antibiotics.** A TCC heals 90% of neuropathic ulcers in 12 weeks.\n\n6. **Wet gangrene is an emergency.** Dry gangrene can wait for demarcation.\n\n7. **Necrotizing fasciitis: early pain is out of proportion, late pain is absent** (due to nerve destruction).\n\n8. **MRSA nasal PCR has >95% negative predictive value.** Use it to de-escalate.\n\n9. **MRI cannot always distinguish osteomyelitis from acute Charcot.** Clinical context matters.\n\n10. **Multidisciplinary care improves outcomes.** ID, vascular, podiatry, wound care, and endocrine.',
    citation: [1, 2, 9],
    next: 'dfw-start',
  },

  {
    id: 'dfw-abx-summary',
    type: 'info',
    module: 6,
    title: 'Antibiotic Summary by IDSA Grade',
    body: '**Quick Reference: Empiric Antibiotics by Severity**\n\n**Grade 2 (Mild) - Oral, 7-14 days:**\n- Cephalexin 500mg QID OR Amox-clav 875/125 BID\n- Add TMP-SMX 1-2 DS BID if MRSA risk\n\n**Grade 3 (Moderate) - Oral or IV, 1-2 weeks:**\n- Oral: Amox-clav 875/125 BID OR Levofloxacin 750 daily + Clinda 450 TID\n- IV: Amp-sulbactam 3g q6h OR Pip-tazo 4.5g q8h\n- Add Vanc 15-20 mg/kg q8-12h if MRSA risk\n\n**Grade 4 (Severe) - IV, 10 days (6 weeks if osteo):**\n- Vancomycin 15-20 mg/kg q8-12h (trough 15-20)\n- PLUS Pip-tazo 4.5g q6h OR Meropenem 1g q8h\n\n**Osteomyelitis duration:**\n- With surgical resection + negative margins: 3 weeks\n- With surgical resection + positive margins: 6 weeks\n- Without surgery: 6+ weeks\n\n**MRSA de-escalation:** If MRSA nasal PCR negative, can stop MRSA coverage (>95% NPV)',
    citation: [9, 11],
    calculatorLinks: [
      { id: 'dfw-abx-selector', label: 'Antibiotic Selector' },
    ],
    next: 'dfw-start',
  },

];

export const DIABETIC_FOOT_WOUNDS_NODE_COUNT = DIABETIC_FOOT_WOUNDS_NODES.length;

export const DIABETIC_FOOT_WOUNDS_MODULE_LABELS = [
  'Initial Assessment',
  'Infection Severity',
  'Vascular Assessment',
  'Osteomyelitis Workup',
  'Charcot Foot',
  'Treatment & Disposition',
];

export const DIABETIC_FOOT_WOUNDS_CITATIONS: Citation[] = [
  { num: 1, text: 'Lipsky BA, et al. IWGDF/IDSA 2023 Guidelines on the Diagnosis and Treatment of Diabetes-Related Foot Infections. Clin Infect Dis. 2023. PMID: 37713519' },
  { num: 2, text: 'IWGDF 2023 Practical Guidelines on Prevention and Management of Diabetes-Related Foot Disease. iwgdfguidelines.org' },
  { num: 3, text: 'Ramirez-Acuna JM, et al. Necrotizing Fasciitis in Diabetic Foot: Clinical Characteristics and Outcomes. PMC. 2023. PMID: 37214578' },
  { num: 4, text: 'Wong CH, et al. The LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis) score: a tool for distinguishing necrotizing fasciitis from other soft tissue infections. Crit Care Med. 2004;32(7):1535-1541. PMID: 15241098' },
  { num: 5, text: 'Mills JL, et al. Society for Vascular Surgery Lower Extremity Guidelines Committee. The Society for Vascular Surgery Lower Extremity Threatened Limb Classification System: Risk stratification based on Wound, Ischemia, and foot Infection (WIfI). J Vasc Surg. 2014;59(1):220-234. PMID: 24126108' },
  { num: 6, text: 'IWGDF 2019 Guideline on the Diagnosis, Prognosis and Management of Peripheral Artery Disease in Patients with Foot Ulcers in Diabetes. iwgdfguidelines.org' },
  { num: 7, text: 'Monteiro-Soares M, et al. Diabetic foot ulcer classifications: A critical review. Diabetes Metab Res Rev. 2020;36 Suppl 1:e3272. PMID: 31830360' },
  { num: 8, text: 'Ince P, et al. Use of the SINBAD Classification System and Score in Comparing Outcome of Foot Ulcer Management on Three Continents. Diabetes Care. 2008;31(5):964-967. PMID: 18299441' },
  { num: 9, text: 'Lipsky BA, et al. IDSA Clinical Practice Guideline for the Diagnosis and Treatment of Diabetic Foot Infections. Clin Infect Dis. 2012;54(12):e132-e173. PMID: 22619242' },
  { num: 10, text: 'Bus SA, et al. IWGDF Guideline on Offloading Foot Ulcers in Persons with Diabetes. Diabetes Metab Res Rev. 2020;36 Suppl 1:e3274. PMID: 31845420' },
  { num: 11, text: 'Lipsky BA, et al. Treating Diabetic Foot Infections: What Works? AAFP. 2021. aafp.org' },
  { num: 12, text: 'Lam K, et al. Diagnostic Accuracy of Probe to Bone to Detect Osteomyelitis in the Diabetic Foot: A Systematic Review. Clin Infect Dis. 2016;63(7):944-948. PMID: 27369321' },
  { num: 13, text: 'Berendt AR, et al. Diabetic foot osteomyelitis: a progress report on diagnosis and a systematic review of treatment. Diabetes Metab Res Rev. 2008;24 Suppl 1:S145-S161. PMID: 18442163' },
  { num: 14, text: 'Rogers LC, et al. The Charcot Foot in Diabetes. Diabetes Care. 2011;34(9):2123-2129. PMID: 21868778' },
  { num: 15, text: 'Milne TE, et al. Developing an evidence-based clinical pathway for the assessment, diagnosis and management of acute Charcot neuro-arthropathy. J Foot Ankle Res. 2013;6:30. PMID: 23898912' },
  { num: 16, text: 'IWGDF 2019 Guideline on Interventions to Enhance Healing of Foot Ulcers in Persons with Diabetes. iwgdfguidelines.org' },
];
