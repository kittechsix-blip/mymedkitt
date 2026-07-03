// MedKitt - Pediatric Skin and Soft Tissue Infections (SSTI)
// IDSA 2014 SSTI + AAP Red Book + EB Medicine Peds SSTI + Talan NEJM 2016 + Daum NEJM 2017
// 6 modules: Recognition & Severity -> Purulent (I&D) -> Non-Purulent (Cellulitis) -> Severe/Admit -> Necrotizing Fasciitis -> Special Sites & Mimics
// 20 nodes total.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const PEDS_SSTI_CRITICAL_ACTIONS = [
  { text: 'Classify EARLY: purulent (abscess) vs non-purulent (cellulitis) vs severe/necrotizing — drives therapy', nodeId: 'pssti-start' },
  { text: 'I&D is the mainstay for abscesses; antibiotics after I&D reduce treatment failure (Talan NEJM 2016)', nodeId: 'pssti-purulent' },
  { text: 'Bedside ultrasound improves abscess detection over exam alone (sensitivity ~96-98%)', nodeId: 'pssti-start' },
  { text: 'Mark the borders of cellulitis with marker — 48-72h recheck visit', nodeId: 'pssti-nonpurulent' },
  { text: 'Pain out of proportion + rapid spread + systemic toxicity = necrotizing fasciitis until proven otherwise', nodeId: 'pssti-necfasc' },
  { text: 'LRINEC has POOR sensitivity in peds — a low score does NOT rule out NSTI', nodeId: 'pssti-necfasc' },
  { text: 'Periorbital cellulitis with proptosis, EOM restriction, or vision change = orbital — CT + IV abx + ENT/ophtho', nodeId: 'pssti-periorbital' },
  { text: 'Neonates and ill-appearing infants with cellulitis get IV abx + admission (low threshold for sepsis workup)', nodeId: 'pssti-severe' },
  { text: 'Adolescent with sore throat → neck pain → sepsis → think Lemierre (Fusobacterium); CT neck w/ contrast', nodeId: 'pssti-lemierre' },
  { text: 'Always weight-base peds antibiotic dosing; verify max daily dose not exceeded', nodeId: 'pssti-purulent-abx' },
];

export const PEDS_SSTI_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Recognition & Severity
  // ===================================================================
  {
    id: 'pssti-start',
    type: 'question',
    module: 1,
    title: 'Pediatric SSTI — Initial Classification',
    body: '**Skin and soft tissue infections are among the most common pediatric ED visits.** Community-associated MRSA (CA-MRSA) is now the dominant organism in many US regions. [1,2,3]\n\n**Step 1 — Assess for red flags requiring immediate resuscitation:**\n- Hemodynamic instability, septic appearance\n- Pain out of proportion to exam\n- Crepitus, skin discoloration (dusky, purple, bullae)\n- Rapid spread (advancing borders over hours)\n- Hard, woody induration extending beyond visible erythema\n\n**Step 2 — Classify the lesion** — this drives the entire pathway: [1,2]\n\n| Type | Findings | Pathway |\n|------|----------|---------|\n| **Purulent** | Fluctuance, pus, abscess on US | I&D pathway |\n| **Non-purulent** | Erythema, warmth, swelling without fluctuance | Cellulitis pathway |\n| **Severe / systemic** | Fever, toxic appearance, large area, immunocompromised | Admit + IV abx |\n| **Necrotizing** | Pain out of proportion, crepitus, rapid spread, dishwater drainage | OR emergently |\n\n**Bedside US** improves abscess detection over exam alone (sensitivity ~96-98% for fluid collection). [4,5] Use any time the exam is equivocal.\n\n**Special site? See Module 6** for periorbital, perianal, neck (Lemierre), and mimics.',
    citation: [1, 2, 3, 4, 5],
    options: [
      {
        label: 'Pain out of proportion, crepitus, rapid spread, septic',
        description: 'Necrotizing fasciitis pathway — TIME-CRITICAL',
        next: 'pssti-necfasc',
        urgency: 'critical',
      },
      {
        label: 'Toxic-appearing, febrile, large area, or immunocompromised',
        description: 'Severe SSTI — admit + IV antibiotics',
        next: 'pssti-severe',
        urgency: 'critical',
      },
      {
        label: 'Fluctuant abscess (or fluid collection on US)',
        description: 'Purulent pathway — I&D mainstay',
        next: 'pssti-purulent',
      },
      {
        label: 'Erythema, warmth, swelling — no fluctuance',
        description: 'Non-purulent cellulitis pathway',
        next: 'pssti-nonpurulent',
      },
      {
        label: 'Special site (periorbital, perianal, neck) or atypical',
        description: 'Module 6 — special considerations',
        next: 'pssti-special',
      },
      {
        label: 'Equivocal exam — abscess vs cellulitis',
        description: 'Bedside ultrasound to clarify',
        next: 'pssti-pocus',
      },
    ],
    summary: 'Classify: purulent (I&D) vs non-purulent (cellulitis) vs severe (admit) vs necrotizing (OR); bedside US ~98% sensitive for abscess.',
  },
  {
    id: 'pssti-pocus',
    type: 'info',
    module: 1,
    title: 'Bedside Ultrasound for SSTI',
    body: '**Point-of-care US (POCUS) outperforms physical exam for abscess detection** — sensitivity 96-98%, specificity 79-89% (Subramaniam 2016, Adams 2016). [4,5]\n\n**Technique pearls:** [4,5]\n- High-frequency **linear probe** (5-12 MHz)\n- Generous gel; scan in 2 orthogonal planes\n- Compare to contralateral side for baseline\n- Use a **standoff pad or copious gel** for small/superficial collections\n\n**Findings:**\n\n| Finding | Implication |\n|---------|-------------|\n| Anechoic fluid collection | Mature abscess — drainable |\n| Hypoechoic with internal debris ("swirling") | Abscess; consider I&D |\n| "Cobblestoning" (anechoic tracts in subQ fat) | Cellulitis (interstitial edema) — NO abscess |\n| Hyperechoic gas (dirty shadowing, "snow globe") | **NSTI suspicion — get surgery NOW** |\n| Fascial thickening / fluid along fascia | Concerning for nec fasc |\n\n**Color Doppler:**\n- Surrounding hyperemia supports inflammation\n- Internal flow argues AGAINST abscess (think pseudoaneurysm, lymph node — get a different study)\n\n**Pitfalls:** [4,5]\n- Lymph nodes look like abscesses on B-mode — check for hilar flow on Doppler\n- Pseudoaneurysm — turbulent flow on Doppler\n- Necrotic tumor — clinical context\n\n**Action:** if POCUS shows abscess → [Purulent pathway](#/info/pssti-purulent). If only cobblestoning → [Cellulitis pathway](#/info/pssti-nonpurulent). If gas in soft tissue → [Necrotizing pathway](#/info/pssti-necfasc) immediately.',
    citation: [4, 5],
    next: 'pssti-purulent',
    summary: 'POCUS sens ~98% for abscess; linear probe; cobblestoning = cellulitis; gas in soft tissue = NSTI suspicion (get surgery NOW).',
    skippable: true,
  },

  // ===================================================================
  // MODULE 2: Purulent (Abscess) Pathway
  // ===================================================================
  {
    id: 'pssti-purulent',
    type: 'info',
    module: 2,
    title: 'Purulent SSTI — I&D Mainstay',
    body: '**Incision and drainage is the cornerstone of abscess management.** Adjunctive antibiotics improve cure rates and reduce recurrence (Talan NEJM 2016, Daum NEJM 2017). [6,7]\n\n**Indications for I&D:** any fluctuant lesion ≥5 mm (smaller lesions may respond to warm soaks alone).\n\n**Technique pearls:** [1,2]\n- Adequate analgesia (topical LMX → field block with buffered lidocaine + bicarb; consider intranasal fentanyl/midazolam)\n- Linear incision along skin tension lines (NOT cruciate — scarring)\n- Break up loculations with hemostat\n- Irrigate with saline\n- **Loop drainage** is an effective alternative for large/recurrent abscesses (vessel loop through 2 small incisions; less painful packing/changes) [8]\n- Wound culture from purulent material in all cases — guides therapy if treatment fails [1]\n\n**Antibiotics after I&D — who gets them?** [6,7]\nThe Talan 2016 and Daum 2017 trials shifted practice: **routinely add an antibiotic after I&D** for abscesses, especially in children. Benefits = lower clinical failure, fewer new lesions, less household transmission.\n\nUse antibiotics for ALL of: [1,6,7]\n- Abscess ≥2 cm, multiple lesions, or extensive surrounding cellulitis\n- Systemic signs (fever, tachycardia)\n- Immunocompromised host, age <1 year\n- Failed prior I&D, prior MRSA, or high-prevalence area\n\n**Skip antibiotics:** small (<2 cm), well-circumscribed abscess in a healthy older child with no surrounding cellulitis and reliable follow-up — but this is increasingly uncommon practice. [1]\n\nUse the [LRINEC Score](#/calculator/lrinec) ONLY as adjunct if any necrotizing concern; clinical exam trumps the score.',
    citation: [1, 2, 6, 7, 8],
    calculatorLinks: [
      { id: 'lrinec', label: 'LRINEC Score (adjunct only)' },
    ],
    next: 'pssti-purulent-abx',
    summary: 'I&D for fluctuant lesions; routinely add abx after I&D in kids (Talan/Daum trials); culture purulent material; loop drainage for large/recurrent.',
  },
  {
    id: 'pssti-purulent-abx',
    type: 'info',
    module: 2,
    title: 'Purulent SSTI — Empiric Antibiotic Selection',
    body: '**Coverage goal: CA-MRSA + MSSA.** [1,3,6]\n\n**First-line (oral):** [1,6,7]\n\n[Trimethoprim-sulfamethoxazole](#/drug/tmp-smx/pediatric-ssti) **4–6 mg/kg/dose TMP component PO BID (8–12 mg/kg/day total)** (max 160 mg TMP/dose)\n- Best CA-MRSA coverage in most US regions\n- Talan NEJM 2016: TMP-SMX after I&D ↓ failure rate vs placebo (NNT ~14) [6]\n- Avoid in infants <2 months (kernicterus risk), G6PD deficiency, sulfa allergy\n\n**Alternative (oral):** [1,7]\n\n[Clindamycin](#/drug/clindamycin/pediatric-ssti) **10 mg/kg/dose PO TID** (max 600 mg/dose)\n- Daum NEJM 2017: clindamycin = TMP-SMX cure rate, fewer recurrences with clinda at 1 month [7]\n- Check local D-test for inducible resistance\n- C. difficile risk; diarrhea common\n\n**For older adolescents (≥45 kg) or alternative:** Doxycycline 4 mg/kg/day divided BID (avoid <8 years).\n\n**Duration:** 5–7 days post-I&D for most uncomplicated abscesses. Extend to 7–10 days for extensive cellulitis or slow response. [1]\n\n**Wound care:** [1,2]\n- Cover with dry dressing; change daily\n- If packed: remove packing in 24–48h, then warm soaks 3–4×/day\n- Loop drains stay for 7–10 days; remove in clinic\n- **Recheck visit at 48–72h** — verify improvement, drainage, no extension\n\nUse the [Peds Drug Doses](#/drug/tmp-smx/pediatric-ssti) for weight-based calculation.',
    citation: [1, 3, 6, 7],
    treatment: {
      firstLine: {
        drug: 'TMP-SMX',
        dose: '4–6 mg/kg/dose (TMP); 8–12 mg/kg/day total',
        route: 'PO',
        frequency: 'BID',
        duration: '5–7 days post-I&D',
        notes: 'Max 160 mg TMP/dose; avoid <2mo, G6PD, sulfa allergy; IDSA 2014 / Talan NEJM 2016',
      },
      alternative: {
        drug: 'Clindamycin',
        dose: '10 mg/kg/dose',
        route: 'PO',
        frequency: 'TID',
        duration: '5–7 days post-I&D',
        notes: 'Max 600 mg/dose; check local D-test; C. diff risk; Daum NEJM 2017',
      },
      monitoring: '48–72h recheck; watch for spreading erythema, fever, systemic signs',
    },
    next: 'pssti-purulent-dispo',
    summary: 'TMP-SMX 4-6 mg/kg/dose BID (8-12 mg/kg/day) OR clindamycin 10 mg/kg/dose TID; 5-7 days; 48-72h recheck mandatory.',
  },
  {
    id: 'pssti-purulent-dispo',
    type: 'result',
    module: 2,
    title: 'Purulent SSTI — Discharge Plan',
    body: '**Discharge criteria after I&D:** [1,2]\n- Adequate drainage achieved\n- Reasonable pain control\n- No systemic signs (afebrile, normal vitals)\n- Reliable caregivers, ability to do wound care\n- Follow-up arranged\n\n**Discharge instructions:**\n- Antibiotic course as above\n- Wound care (packing removal at 24-48h OR loop drain instructions)\n- Warm compresses 3-4×/day after first 48h\n- **Return for:** spreading redness, fever, severe pain, red streaks, vomiting, drainage of pus from new sites\n- **48-72h recheck mandatory** — primary care, urgent care, or ED\n\n**Decolonization (recurrent MRSA):** [1,9]\n- Mupirocin nasal ointment BID × 5–10 days\n- Chlorhexidine body wash daily × 5 days\n- Treat household contacts with recurrent infections\n- Bleach baths (1/4 cup household bleach in full tub, 5–10 min) 2×/week\n\n**When to consider admission instead:**\n- Age <6 months, toxic appearance, large/deep abscess, perirectal/perineal location, immunocompromised, failed outpatient management.',
    recommendation: 'Discharge post-I&D on TMP-SMX or clindamycin × 5–7 days. Wound care + 48–72h recheck. Decolonization if recurrent.',
    confidence: 'recommended',
    citation: [1, 2, 9],
  },
  {
    id: 'pssti-decolonization',
    type: 'info',
    module: 2,
    title: 'MRSA Decolonization Protocol',
    body: '**For recurrent SSTI** (≥2 episodes within 6 months) — household decolonization reduces recurrence rates. [9]\n\n**Index patient + all household members:** [9]\n\n1. **Nasal mupirocin 2% ointment** — pea-sized amount in each nare BID × 5 days\n2. **Chlorhexidine 4% body wash** — daily × 5 days, neck-down, leave on 1 minute before rinsing\n3. **Bleach baths** — 1/4 cup household bleach (6%) in full bathtub of water (~40 gallons), 5-10 minutes, 2×/week × 3 months\n4. **Hygiene measures:**\n   - Hot wash all linens, towels, washcloths\n   - No sharing of towels, razors, athletic gear\n   - Cover wounds until healed\n   - Hand hygiene with alcohol-based rub\n\n**Active follow-up:**\n- Nasal MRSA cultures at 1 and 3 months to assess success\n- Re-treat household if recurrence\n- Pediatric ID consult if 3+ failures\n\n**Avoid systemic antibiotic prophylaxis** — drives resistance without proven benefit. [9]\n\n**Hidradenitis suppurativa pearl:** recurrent abscesses in axilla/groin/perineum from adolescence — refer to derm. Antibiotics + topical clinda + retinoids/biologics, not just I&D.',
    citation: [1, 9],
    next: 'pssti-nonpurulent',
    summary: 'Recurrent SSTI: mupirocin BID + chlorhex daily × 5d + bleach baths 2×/wk × 3mo; treat household; avoid systemic abx prophylaxis.',
    skippable: true,
  },

  // ===================================================================
  // MODULE 3: Non-Purulent (Cellulitis) Pathway
  // ===================================================================
  {
    id: 'pssti-nonpurulent',
    type: 'info',
    module: 3,
    title: 'Non-Purulent Cellulitis — Pathogen & Coverage',
    body: '**Non-purulent cellulitis** = erythema, warmth, swelling, tenderness without fluctuance or drainage. **Beta-hemolytic streptococci** (especially GAS) are the most common cause; *S. aureus* is far less common in pure cellulitis. [1,10]\n\n**IDSA 2014 recommendation:** for typical non-purulent cellulitis in immunocompetent patients, **empiric anti-streptococcal therapy is appropriate** — MRSA coverage is NOT routine. [1]\n\n**Add MRSA coverage if:** [1,10]\n- Penetrating trauma\n- IV drug use (in adolescents)\n- Prior MRSA infection or colonization\n- Concurrent purulent component\n- Failure of beta-lactam therapy\n- Severe illness / systemic toxicity\n\n**Boundary marking** — outline the border with skin marker and date it; helps the 48-72h recheck visit assess progress.\n\n**Elevation + warm compresses** — adjunctive measures that help drainage and resolution.',
    citation: [1, 10],
    next: 'pssti-nonpurulent-abx',
    summary: 'Cellulitis = strep predominant; IDSA: empiric anti-strep coverage WITHOUT routine MRSA add; mark borders + elevate + warm compresses.',
  },
  {
    id: 'pssti-nonpurulent-abx',
    type: 'info',
    module: 3,
    title: 'Non-Purulent Cellulitis — Antibiotic Selection',
    body: '**Outpatient PO regimen (mild-moderate, well-appearing):** [1,3]\n\n[Cephalexin](#/drug/cephalexin/pediatric-ssti) **25–50 mg/kg/day PO divided q6h (QID)** (max 4 g/day)\n- First-line for streptococcal cellulitis\n- Excellent bioavailability\n\n**Alternative (penicillin-allergic, non-anaphylaxis):** Cefadroxil 30 mg/kg/day PO BID.\n\n**Severe penicillin allergy:** Clindamycin 10 mg/kg/dose PO TID (also covers MRSA).\n\n**Inpatient / unable to tolerate PO:** [1]\n\n[Cefazolin](#/drug/cefazolin/pediatric-ssti) **50 mg/kg/dose IV q8h** (max 6 g/day)\n- Anti-streptococcal + MSSA\n- Excellent tissue penetration\n\n**If MRSA suspected (add or substitute):**\n- TMP-SMX 4–6 mg/kg/dose (TMP) PO BID (8–12 mg/kg/day), OR\n- Clindamycin 10–13 mg/kg/dose IV/PO q6–8h, OR\n- Vancomycin 15 mg/kg/dose IV q6h (severe only)\n\n**Duration:** 5 days for uncomplicated cases responding well; extend to 7–10 days for slow response or extensive disease. [1]\n\n**48–72h recheck:** mandatory. Cellulitis often appears WORSE in the first 24–48h before improving (initial bacterial killing → inflammatory response). Document border and compare. [1,10]',
    citation: [1, 3, 10],
    treatment: {
      firstLine: {
        drug: 'Cephalexin',
        dose: '25–50 mg/kg/day',
        route: 'PO',
        frequency: 'divided QID',
        duration: '5 days; 7–10 if extensive',
        notes: 'Max 4 g/day; anti-strep coverage; first-line per IDSA 2014',
      },
      alternative: {
        drug: 'Clindamycin',
        dose: '10 mg/kg/dose',
        route: 'PO',
        frequency: 'TID',
        duration: '5–7 days',
        notes: 'Use if penicillin-allergic or MRSA suspected; max 600 mg/dose',
      },
      monitoring: '48–72h recheck; mark borders; expect transient worsening before improvement',
    },
    next: 'pssti-nonpurulent-dispo',
    summary: 'Cephalexin 25-50 mg/kg/day QID for mild; cefazolin 50 mg/kg q8h IV for inpatient; add MRSA cover only if risk factors; 5-day course typical.',
  },
  {
    id: 'pssti-nonpurulent-dispo',
    type: 'result',
    module: 3,
    title: 'Non-Purulent Cellulitis — Discharge Plan',
    body: '**Discharge criteria:** [1,2]\n- Well-appearing, afebrile, tolerating PO\n- Reliable caregivers and follow-up\n- Pain controlled\n- Border marked; baseline image (or marker outline) for comparison\n\n**Return precautions:**\n- Spreading erythema beyond marked border\n- New fever or worsening systemic symptoms\n- Severe pain out of proportion\n- Vomiting / unable to tolerate medication\n- Drainage of pus or new fluctuance\n- Streak of redness toward heart (lymphangitis)\n\n**48–72h recheck:** non-negotiable for kids with cellulitis. Many will appear worse at 24 h before improvement — having a pre-arranged visit catches treatment failures early.',
    recommendation: 'Discharge on cephalexin × 5 days. Mark borders, elevate, warm compresses. 48–72h recheck mandatory.',
    confidence: 'recommended',
    citation: [1, 2],
  },
  {
    id: 'pssti-erysipelas',
    type: 'info',
    module: 3,
    title: 'Erysipelas — A Specific Variant',
    body: '**Erysipelas** is a superficial dermal cellulitis with characteristic features that distinguish it from typical cellulitis. [1,10]\n\n**Classic findings:**\n- **Sharply demarcated, raised border** (vs cellulitis: poorly demarcated, flat)\n- Bright red ("flame-red") color\n- Often face (cheek, butterfly distribution) or lower extremity\n- Rapid onset over hours\n- Systemic symptoms common (fever, chills, malaise)\n- Lymphangitic streaking and regional lymphadenopathy\n\n**Pathogen:** almost always **beta-hemolytic streptococci** (GAS most common). *S. aureus* extremely rare in true erysipelas. [10]\n\n**Treatment:** [1]\n- **Penicillin V** 50–75 mg/kg/day PO divided q6–8h (max 2 g/day) — first-line\n- **OR amoxicillin** 50–90 mg/kg/day PO divided q8–12h\n- Penicillin allergy → cephalexin or clindamycin\n- IV: penicillin G 100,000–250,000 units/kg/day IV divided q4–6h for severe\n\n**Duration:** 5 days for uncomplicated; 7–10 days for severe.\n\n**Same disposition rules** as non-purulent cellulitis apply — mark borders, 48-72h recheck, return precautions.\n\n**DO NOT add MRSA coverage** for classic erysipelas unless there are risk factors or failure of beta-lactam therapy. [1,10]',
    citation: [1, 10],
    next: 'pssti-nonpurulent-dispo',
    summary: 'Erysipelas = sharply demarcated raised border, GAS predominant; penicillin V or amoxicillin first-line; NO MRSA add unless risk factors.',
    skippable: true,
  },

  // ===================================================================
  // MODULE 4: Severe / Systemic — Admit
  // ===================================================================
  {
    id: 'pssti-severe',
    type: 'info',
    module: 4,
    title: 'Severe SSTI — Admit + IV Antibiotics',
    body: '**Criteria for admission:** [1,2]\n- Toxic-appearing, hemodynamic instability\n- Failure of outpatient therapy\n- Inability to tolerate PO\n- Extensive area / rapid progression\n- Immunocompromised, neonate, or age <6 months\n- Concern for deep space involvement (orbit, neck, perineum)\n- Concurrent bacteremia or abscess requiring drainage\n\n**Initial workup (severely ill):** [1,2]\n- Blood cultures × 2 before antibiotics (yield ~5% in cellulitis but higher if bacteremic)\n- CBC, CMP, CRP, lactate, procalcitonin\n- Wound culture from any drainable site\n- Imaging if deep involvement suspected (US bedside, CT for orbit/neck)\n\n**Empiric IV antibiotics:** [1,3,11]\n\n[Ceftriaxone](#/drug/ceftriaxone/pediatric-ssti) **50–75 mg/kg IV q24h** (max 2 g/dose)\n- Strep + MSSA + most gram-negatives\n\n**PLUS** [Clindamycin](#/drug/clindamycin/pediatric-ssti) **10–13 mg/kg/dose IV q6–8h** (max 600 mg/dose)\n- Anti-toxin effect (suppresses streptococcal/staph toxin production)\n- MRSA coverage if susceptible\n\n**Add Vancomycin** **15 mg/kg/dose IV q6h** (max 60 mg/kg/day) if: [1,11]\n- Severe MRSA risk or hemodynamic instability\n- Clindamycin resistance in your region\n- Trough goal 15–20 mcg/mL for severe infection\n\n**Linezolid** 10 mg/kg/dose PO/IV q8h (max 600 mg/dose) — for vancomycin-intolerant or refractory MRSA. [1,11]\n\n**Source control:** any drainable collection must be addressed urgently — surgical or IR consult.',
    citation: [1, 2, 3, 11],
    treatment: {
      firstLine: {
        drug: 'Ceftriaxone + Clindamycin',
        dose: 'CTX 50–75 mg/kg q24h + clinda 10–13 mg/kg q6–8h',
        route: 'IV',
        frequency: 'see above',
        duration: 'Until clinical improvement, then PO step-down',
        notes: 'Anti-toxin clinda; MRSA coverage built in',
      },
      alternative: {
        drug: 'Vancomycin (add for severe MRSA risk)',
        dose: '15 mg/kg/dose',
        route: 'IV',
        frequency: 'q6h',
        duration: 'Until clinical improvement and culture-directed step-down',
        notes: 'Max 60 mg/kg/day; trough 15–20 for severe; linezolid if vanc-intolerant',
      },
      monitoring: 'Daily vitals, CRP trend, vanc troughs, blood cultures, renal function',
    },
    next: 'pssti-severe-dispo',
    summary: 'IV ceftriaxone + clindamycin baseline; add vanc for severe MRSA risk; linezolid for vanc-intolerant; source control urgent.',
    safetyLevel: 'critical',
  },
  {
    id: 'pssti-severe-dispo',
    type: 'result',
    module: 4,
    title: 'Severe SSTI — Admit / ICU Disposition',
    body: '**Admit:** general pediatric ward for stable patients on IV antibiotics, source-controlled.\n\n**ICU criteria:**\n- Septic shock requiring pressors\n- Concern for necrotizing infection (see Module 5)\n- Multi-organ involvement\n- Need for emergent surgical intervention\n- Respiratory compromise (deep neck infection, orbital cellulitis with airway concerns)\n\n**Consults:**\n- Pediatric ID (severe, MRSA, immunocompromised)\n- Surgery (any drainable collection, suspected nec fasc)\n- Ophthalmology/ENT (orbital/periorbital, deep neck)\n- Plastics (extensive disease, complex wound)',
    recommendation: 'Admit on IV ceftriaxone + clindamycin (add vancomycin if MRSA-severe). ICU if hemodynamic instability or nec fasc concern.',
    confidence: 'recommended',
    citation: [1, 2, 11],
  },

  // ===================================================================
  // MODULE 5: Necrotizing Fasciitis — CRITICAL
  // ===================================================================
  {
    id: 'pssti-necfasc',
    type: 'info',
    module: 5,
    title: 'Necrotizing Fasciitis — Time-Critical',
    body: '**Necrotizing fasciitis is a surgical emergency. Mortality 20–40% even with treatment; doubles with each hour of delay to OR.** [12,13]\n\n**Suspect when:** [12,13,14]\n- **Pain out of proportion** to visible skin findings (HALLMARK)\n- Rapid progression (advance of erythema over hours)\n- Skin findings disproportionately mild EARLY (vs systemic toxicity)\n- Crepitus, bullae (especially hemorrhagic), skin discoloration (dusky → purple → black)\n- "Wooden" or hard induration extending beyond visible erythema\n- Systemic toxicity (fever, tachycardia, hypotension, AMS)\n- "Dishwater" gray exudate at incision (NOT pus)\n- Anesthesia of the overlying skin (late finding — nerve infarction)\n\n**Population at risk in peds:** [12,15]\n- Varicella (classic — GAS superinfection)\n- Recent surgery, trauma, IM injections\n- Immunocompromised, malignancy\n- Neonates (omphalitis can progress to nec fasc)\n\n**The LRINEC trap** — Use the [LRINEC Score](#/calculator/lrinec) as ADJUNCT only: [12,13,16]\n- Original Wong 2004: LRINEC ≥6 PPV 92% in adults\n- **Validation studies show LRINEC sensitivity 43–60% in peds** — many missed cases with score <6 [16]\n- Canadian Association of General Surgeons (2021) recommends AGAINST using LRINEC for decision-making\n- **Clinical suspicion always overrides a low LRINEC**\n\n**Workup (do NOT delay surgery):**\n- CBC, CMP, lactate, CRP, ABG, coags, type & cross\n- Blood cultures × 2\n- Plain films may show subcutaneous air (specific but insensitive)\n- CT/MRI may help but **NEVER delay surgery for imaging** if clinical suspicion is high [12]\n\n**Management — all simultaneous, no order:** [12,13,14]\n1. **Emergent surgical consultation** (general surgery, ortho if extremity, plastics)\n2. **Aggressive fluid resuscitation** (often massive)\n3. **Empiric broad-spectrum antibiotics — give within 1 hour:**\n   - [Vancomycin](#/drug/vancomycin/pediatric-ssti) 15 mg/kg IV q6h (or linezolid 10 mg/kg q8h)\n   - **PLUS** [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam/pediatric-ssti) 100 mg/kg IV q6–8h (or meropenem 20 mg/kg q8h)\n   - **PLUS** [Clindamycin](#/drug/clindamycin/pediatric-ssti) 10–13 mg/kg/dose IV q6–8h (anti-toxin — suppresses streptococcal/staph toxin production)\n4. **ICU admission**\n5. **IVIG** — consider 1 g/kg day 1, then 0.5 g/kg days 2–3 for streptococcal toxic shock syndrome (controversial, but recommended by IDSA when STSS suspected) [1,17]\n\n**Repeat washouts at 24h are the rule, not the exception.** Mortality decreases dramatically when 2nd-look operation occurs within 24h. [13]',
    citation: [1, 12, 13, 14, 15, 16, 17],
    calculatorLinks: [
      { id: 'lrinec', label: 'LRINEC Score (adjunct only — low score does NOT rule out)' },
    ],
    treatment: {
      firstLine: {
        drug: 'Vanc + Pip-tazo + Clindamycin',
        dose: 'Vanc 15 mg/kg q6h + pip-tazo 100 mg/kg q6–8h + clinda 10–13 mg/kg q6–8h',
        route: 'IV',
        frequency: 'within 1 hour',
        duration: 'Until source controlled and clinically improved',
        notes: 'Clinda = anti-toxin effect (critical); add IVIG 1 g/kg if STSS',
      },
      monitoring: 'Hour-by-hour reassessment; repeat OR at 24h; lactate, CRP, organ function',
    },
    next: 'pssti-necfasc-dispo',
    summary: 'PAIN out of proportion + rapid spread + systemic toxicity = NSTI; LRINEC POOR sensitivity in peds; vanc+pip-tazo+clinda within 1h; emergent OR.',
    safetyLevel: 'critical',
  },
  {
    id: 'pssti-necfasc-dispo',
    type: 'result',
    module: 5,
    title: 'Necrotizing Fasciitis — Disposition',
    body: '**Disposition: OR → PICU.**\n\n**Pre-op checklist (parallel, not sequential):**\n- Surgery at bedside\n- Type & cross 2 units PRBC\n- Aggressive fluid resuscitation underway\n- Antibiotics given (vanc + pip-tazo + clinda)\n- IVIG dose prepared if STSS suspected\n- Family briefed on guarded prognosis\n- ICU bed arranged\n\n**Post-op care:**\n- Plan for 2nd-look at 24h\n- Hyperbaric oxygen therapy — controversial; consider if available, do NOT delay surgery for it\n- Wound VAC after source control\n- Long course of antibiotics (≥2 weeks IV, then PO)\n- Pediatric ID consultation mandatory\n\n**Mortality counseling:** 20–40% even with optimal care; higher in delayed cases. Honest, early conversation with family is essential.',
    recommendation: 'OR EMERGENTLY. Vanc + pip-tazo + clinda within 1 hour. ICU admission. Plan repeat OR at 24h. Consider IVIG for STSS.',
    confidence: 'recommended',
    citation: [12, 13, 14, 17],
  },

  // ===================================================================
  // MODULE 6: Special Sites & Mimics
  // ===================================================================
  {
    id: 'pssti-special',
    type: 'question',
    module: 6,
    title: 'Special Sites & Mimics',
    body: 'Anatomic location often dictates a different pathway: [1,18]',
    citation: [1, 18],
    options: [
      {
        label: 'Periorbital or orbital region',
        description: 'Concern for preseptal vs orbital cellulitis',
        next: 'pssti-periorbital',
        urgency: 'urgent',
      },
      {
        label: 'Perianal / perineal',
        description: 'Perianal abscess or perineal infection',
        next: 'pssti-perianal',
      },
      {
        label: 'Neck / oropharyngeal',
        description: 'Concern for Lemierre, retropharyngeal, deep neck',
        next: 'pssti-lemierre',
        urgency: 'critical',
      },
      {
        label: 'Not infection — consider mimics',
        description: 'Contact dermatitis, DVT, hematoma, gout',
        next: 'pssti-mimics',
      },
    ],
  },
  {
    id: 'pssti-periorbital',
    type: 'info',
    module: 6,
    title: 'Periorbital vs Orbital Cellulitis',
    body: '**Critical distinction** — orbital cellulitis is a sight- and life-threatening emergency. [18,19]\n\n**Periorbital (preseptal) cellulitis:** anterior to orbital septum.\n- Lid swelling, erythema, tenderness\n- **NO proptosis, NO EOM restriction, NO pain with eye movement, NO vision change**\n- Often from local trauma, insect bite, sinusitis, conjunctivitis\n- Most common organisms: *S. aureus*, GAS, *S. pneumoniae* (declining post-PCV13)\n\n**Orbital cellulitis:** posterior to orbital septum.\n- Lid swelling PLUS:\n  - **Proptosis** (eye pushed forward)\n  - **EOM restriction or pain with eye movement** (ophthalmoplegia)\n  - **Vision change** (decreased acuity, color vision, RAPD)\n  - Chemosis\n  - Fever, toxic appearance\n- Almost always from **ethmoid sinusitis** spreading posteriorly\n- Complications: subperiosteal abscess, orbital abscess, cavernous sinus thrombosis, intracranial extension, vision loss\n\n**CT orbits/sinuses with contrast** is mandatory whenever orbital signs are present or cannot be excluded (e.g., severe lid swelling that prevents adequate eye exam). [18,19]\n\n**Management:** [18,19]\n\n**Preseptal — mild, well-appearing, age ≥1 year:**\n- Outpatient PO: amoxicillin-clavulanate 45 mg/kg/day BID, OR cephalexin + clindamycin\n- 24–48 h recheck mandatory\n\n**Preseptal — moderate, young infant, or unable to assess:**\n- Admit, IV ceftriaxone 50 mg/kg q24h ± clindamycin or vancomycin\n\n**Orbital cellulitis:**\n- **Admit + ENT/ophtho/ID consults**\n- IV ceftriaxone 50 mg/kg q24h + vancomycin 15 mg/kg q6h + metronidazole 10 mg/kg q8h (anaerobic coverage for sinus origin)\n- Subperiosteal abscess >10 mm or no improvement at 24-48h → surgical drainage (ENT)',
    citation: [18, 19],
    next: 'pssti-mimics',
    summary: 'Preseptal = no proptosis/EOM/vision change; orbital = proptosis/EOM restriction/vision change → CT + IV abx + ENT/ophtho. Most orbital from ethmoid sinusitis.',
    safetyLevel: 'critical',
  },
  {
    id: 'pssti-perianal',
    type: 'info',
    module: 6,
    title: 'Perianal / Perineal Infections',
    body: '**Perianal abscess** is most common in infants (<2 years), boys >> girls. [20]\n\n**Workup:** [20]\n- Examine in lateral or knee-chest position\n- Most are superficial (intersphincteric) and amenable to bedside I&D\n- Deep abscesses (ischiorectal, supralevator) require OR drainage — get surgery involved\n\n**Antibiotics:** [1,20]\n- Routine post-I&D abx in infants <2 years (high MRSA prevalence + immature immunity)\n- Coverage = anti-staph + anti-anaerobe: clindamycin OR amox-clav OR TMP-SMX + metronidazole\n\n**Red flag — consider IBD workup if:** [20]\n- Older child (>5 years) with recurrent perianal abscess or fistula\n- Skin tags, perianal fissures, multiple sinuses → **Crohn disease**\n- Send fecal calprotectin, CRP, consider GI consult\n\n**Fournier gangrene** in pediatrics is rare but devastating — necrotizing infection of perineum/scrotum/labia. Treat as nec fasc (Module 5) if suspected.',
    citation: [1, 20],
    next: 'pssti-mimics',
    summary: 'Perianal abscess common in infants <2yr; I&D + abx in this group; recurrent abscess/fistula in older child → think Crohn disease.',
  },
  {
    id: 'pssti-lemierre',
    type: 'info',
    module: 6,
    title: 'Lemierre Syndrome & Deep Neck Infections',
    body: '**Lemierre syndrome** = septic thrombophlebitis of the internal jugular vein, classically from *Fusobacterium necrophorum* oropharyngeal infection. **Adolescents and young adults** disproportionately affected. [21,22]\n\n**Classic story:** [21]\n- Adolescent with sore throat 4–7 days ago that "got better"\n- Now: neck pain (especially along SCM), fever, rigors, dyspnea, pleuritic chest pain (septic pulmonary emboli)\n- May have trismus, dysphagia, unilateral neck swelling\n- Septic-appearing\n\n**Workup:** [21,22]\n- **CT neck WITH contrast** — looks for IJ thrombus and parapharyngeal extension\n- CT chest if respiratory symptoms (septic pulmonary emboli in >80%)\n- Blood cultures × 2 (Fusobacterium grows in anaerobic bottle, may take days)\n- CBC, CMP, lactate, coags\n\n**Antibiotics — empirically broad, narrow when cultures return:** [21,22]\n- **Beta-lactam + beta-lactamase inhibitor** (pip-tazo 100 mg/kg q6–8h) PLUS metronidazole 10 mg/kg q8h\n- OR meropenem 20 mg/kg q8h\n- Ceftriaxone + metronidazole acceptable alternative\n- **Duration: 4–6 weeks IV/PO total**\n\n**Anticoagulation:** controversial — not routinely recommended; consider if thrombus extends to cavernous sinus or systemic complications.\n\n**Other deep neck infections to consider:** [22]\n- **Retropharyngeal abscess** — drooling, neck extension, fever, lateral neck radiograph shows widened retropharyngeal space; CT confirms; OR drainage\n- **Peritonsillar abscess** — older kids/teens; trismus, "hot potato" voice, deviated uvula; needle aspiration or I&D\n- **Ludwig angina** — bilateral submandibular swelling, "woody" floor of mouth, airway threat — secure airway FIRST',
    citation: [21, 22],
    next: 'pssti-mimics',
    summary: 'Lemierre = adolescent + sore throat → IJ thrombosis + septic pulmonary emboli (Fusobacterium); CT neck contrast; pip-tazo+metronidazole 4-6 wks.',
    safetyLevel: 'critical',
  },
  {
    id: 'pssti-mimics',
    type: 'result',
    module: 6,
    title: 'SSTI Mimics — Don\'t Miss',
    body: '**Cellulitis is over-diagnosed.** Common mimics: [10,23]\n\n**Contact dermatitis** — bilateral, pruritic > painful, well-demarcated to allergen exposure (poison ivy, jewelry, soap). NO fever, NO systemic signs.\n\n**Stasis dermatitis** — adolescents on prolonged sitting; bilateral lower legs; chronic; venous insufficiency in obesity.\n\n**Deep vein thrombosis (DVT)** — unilateral leg swelling, warmth, tenderness; risk factors (immobility, OCP in teens, malignancy). Doppler if any suspicion.\n\n**Hematoma** — recent trauma; ecchymosis evolves through colors; fluctuant collection may mimic abscess (US helps).\n\n**Ruptured Baker cyst** — sudden popliteal/calf pain after activity; can closely mimic DVT and cellulitis; US is diagnostic.\n\n**Gout / pseudogout** — uncommon in young children but seen in adolescents; first MTP, ankle, knee; high uric acid; tap if uncertain.\n\n**Cellulitis-like rashes:**\n- **Erysipelas** — superficial dermal infection, sharply demarcated, raised border (vs cellulitis which is poorly demarcated); GAS predominant; penicillin V or amoxicillin first-line\n- **Erythema migrans (Lyme)** — single or multiple targetoid lesions; tick exposure; doxycycline (or amox <8 yo) for 10 days\n- **Erythema nodosum** — tender nodules on shins; sarcoid/IBD/strep workup\n\n**Necrotizing pyoderma gangrenosum** — undermined ulcer; associated with IBD; biopsy, immunosuppression (NOT debridement — surgery worsens it).\n\n**When in doubt:** [23]\n- Bilateral cellulitis is almost never bacterial — think dermatitis or venous stasis\n- Failure to respond to 48–72h of appropriate antibiotics → reconsider diagnosis\n- US, doppler, and biopsy are your friends',
    recommendation: 'Reconsider diagnosis if bilateral, lacks fever/systemic signs, fails antibiotic therapy at 48–72h, or has features suggesting alternative dermatologic/vascular pathology.',
    confidence: 'consider',
    citation: [10, 23],
  },
];

export const PEDS_SSTI_NODE_COUNT = PEDS_SSTI_NODES.length;

export const PEDS_SSTI_MODULE_LABELS = [
  'Recognition & Severity',
  'Purulent (Abscess) Pathway',
  'Non-Purulent (Cellulitis) Pathway',
  'Severe / Systemic — Admit',
  'Necrotizing Fasciitis (CRITICAL)',
  'Special Sites & Mimics',
];

export const PEDS_SSTI_CITATIONS: Citation[] = [
  { num: 1, text: 'Stevens DL, Bisno AL, Chambers HF, et al. Practice guidelines for the diagnosis and management of skin and soft tissue infections: 2014 update by the Infectious Diseases Society of America. Clin Infect Dis. 2014;59(2):e10-52.' },
  { num: 2, text: 'American Academy of Pediatrics. Red Book: 2024 Report of the Committee on Infectious Diseases. 33rd ed. AAP; 2024. (Skin and Soft Tissue Infections; Staphylococcus aureus; Group A Streptococcus chapters)' },
  { num: 3, text: 'Liu C, Bayer A, Cosgrove SE, et al. Clinical practice guidelines by the Infectious Diseases Society of America for the treatment of methicillin-resistant Staphylococcus aureus infections in adults and children. Clin Infect Dis. 2011;52(3):e18-55.' },
  { num: 4, text: 'Adams CM, Neuman MI, Levy JA. Point-of-care ultrasonography for the diagnosis of pediatric soft tissue infection. J Pediatr. 2016;169:122-127.e1.' },
  { num: 5, text: 'Subramaniam S, Bober J, Chao J, Zehtabchi S. Point-of-care Ultrasound for Diagnosis of Abscess in Skin and Soft Tissue Infections. Acad Emerg Med. 2016;23(11):1298-1306.' },
  { num: 6, text: 'Talan DA, Mower WR, Krishnadasan A, et al. Trimethoprim-Sulfamethoxazole versus Placebo for Uncomplicated Skin Abscess. N Engl J Med. 2016;374(9):823-832.' },
  { num: 7, text: 'Daum RS, Miller LG, Immergluck L, et al. A Placebo-Controlled Trial of Antibiotics for Smaller Skin Abscesses. N Engl J Med. 2017;376(26):2545-2555.' },
  { num: 8, text: 'Gaszynski R, Punch G, Verschuer K. Loop drainage technique in the treatment of cutaneous abscesses: a meta-analysis. ANZ J Surg. 2018;88(11):1115-1119.' },
  { num: 9, text: 'Creech CB, Al-Zubeidi DN, Fritz SA. Prevention of Recurrent Staphylococcal Skin Infections. Infect Dis Clin North Am. 2015;29(3):429-464.' },
  { num: 10, text: 'Raff AB, Kroshinsky D. Cellulitis: A Review. JAMA. 2016;316(3):325-337.' },
  { num: 11, text: 'Bradley JS, Nelson JD, Barnett ED, et al. Nelson\'s Pediatric Antimicrobial Therapy. 30th ed. American Academy of Pediatrics; 2024.' },
  { num: 12, text: 'Stevens DL, Bryant AE. Necrotizing Soft-Tissue Infections. N Engl J Med. 2017;377(23):2253-2265.' },
  { num: 13, text: 'Anaya DA, Dellinger EP. Necrotizing soft-tissue infection: diagnosis and management. Clin Infect Dis. 2007;44(5):705-710.' },
  { num: 14, text: 'Sartelli M, Coccolini F, Kluger Y, et al. WSES/GAIS/SIS-E/WSIS/AAST global clinical pathways for patients with skin and soft tissue infections. World J Emerg Surg. 2022;17(1):3.' },
  { num: 15, text: 'Endorf FW, Garrison MM, Klein MB, Richardson A, Rivara FP. Characteristics, therapies, and outcome of children with necrotizing soft tissue infections. Pediatr Infect Dis J. 2012;31(3):221-223.' },
  { num: 16, text: 'Fernando SM, Tran A, Cheng W, et al. Necrotizing Soft Tissue Infection: Diagnostic Accuracy of Physical Examination, Imaging, and LRINEC Score: A Systematic Review and Meta-Analysis. Ann Surg. 2019;269(1):58-65.' },
  { num: 17, text: 'Linnér A, Darenberg J, Sjölin J, Henriques-Normark B, Norrby-Teglund A. Clinical efficacy of polyspecific intravenous immunoglobulin therapy in patients with streptococcal toxic shock syndrome. Clin Infect Dis. 2014;59(6):851-857.' },
  { num: 18, text: 'Gappy C, Archer SM, Barza M. Orbital cellulitis. UpToDate. 2024.' },
  { num: 19, text: 'Wong SJ, Levi J. Management of pediatric orbital cellulitis: A systematic review. Int J Pediatr Otorhinolaryngol. 2018;110:123-129.' },
  { num: 20, text: 'Sahnan K, Adegbola SO, Tozer PJ, et al. Perianal abscess. BMJ. 2017;356:j475. (with pediatric considerations)' },
  { num: 21, text: 'Riordan T. Human infection with Fusobacterium necrophorum (Necrobacillosis), with a focus on Lemierre\'s syndrome. Clin Microbiol Rev. 2007;20(4):622-659.' },
  { num: 22, text: 'Johannesen KM, Bodtger U. Lemierre\'s syndrome: current perspectives on diagnosis and management. Infect Drug Resist. 2016;9:221-227.' },
  { num: 23, text: 'EB Medicine. Pediatric Skin and Soft Tissue Infections in the Emergency Department: Identification and Management. Pediatric Emergency Medicine Practice. 2024.' },
];
