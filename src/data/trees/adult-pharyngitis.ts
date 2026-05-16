// MedKitt — Adult Pharyngitis (Strep Throat) Pathway
// EB Medicine 2024 + IDSA 2012 (Shulman) + AHA 2009 ARF prevention + ACEP clinical policy
// 5 modules: Triage/Red Flags → Score & Test → Treat GAS → Complications/Mimics → Disposition

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const ADULT_PHARYNGITIS_CRITICAL_ACTIONS = [
  { text: 'Screen every sore throat for airway threat (drool, tripod, stridor, voice change, trismus)', nodeId: 'ap-redflags' },
  { text: 'Calculate Centor/McIsaac on every adult; do NOT test or treat at score ≤1', nodeId: 'ap-centor-calc' },
  { text: 'Rapid GAS antigen if Centor/McIsaac ≥2; back-up culture not routine in adults (IDSA)', nodeId: 'ap-rapid-gas' },
  { text: 'Penicillin V 500 mg PO BID-TID × 10 days is first-line for confirmed GAS', nodeId: 'ap-abx-first-line' },
  { text: 'AVOID amoxicillin/ampicillin if mono is in the differential (EBV rash)', nodeId: 'ap-mono' },
  { text: 'Trismus + uvular deviation + hot-potato voice = peritonsillar abscess — needs I&D', nodeId: 'ap-pta' },
  { text: 'Persistent fever + unilateral neck pain after sore throat = rule out Lemierre (CT neck w/ contrast)', nodeId: 'ap-lemierre' },
  { text: 'Drooling, tripoding, stridor, voice change = airway-first management before exam', nodeId: 'ap-airway' },
];

export const ADULT_PHARYNGITIS_NODES: DecisionNode[] = [
  // ===================================================================
  // MODULE 1: Triage & Red Flags
  // ===================================================================
  {
    id: 'ap-start',
    type: 'info',
    module: 1,
    title: 'Adult Pharyngitis Overview',
    body: 'See [Steps Summary](#/info/ap-steps-summary) for the rapid-action checklist.\n\n**Why it matters:** [1,2]\n- Pharyngitis is one of the top 20 reasons for adult ED visits\n- Most cases are **viral** (~75-80%) and self-limited\n- **Group A Strep (GAS)** causes ~5-15% of adult sore throats — antibiotics shorten symptoms by ~16h and prevent acute rheumatic fever (ARF) and suppurative complications\n- The high-stakes work is identifying **airway-threatening or life-threatening mimics**: peritonsillar/retropharyngeal abscess, Lemierre syndrome, epiglottitis, Ludwig angina, acute HIV\n\n**Diagnostic framework (IDSA + EB Med):** [1,3]\n1. Triage every sore throat for airway threat and red flags FIRST\n2. Apply Centor/McIsaac to risk-stratify for GAS\n3. Test (rapid antigen) only those with Centor/McIsaac ≥2\n4. Treat confirmed GAS or empirically at high scores per local protocol\n5. Actively scan for dangerous mimics on every visit\n\n**Adult vs peds note:** IDSA does NOT recommend routine back-up culture in adults with negative rapid antigen (high specificity, low post-test probability). Back-up culture IS recommended in children.',
    citation: [1, 2, 3],
    calculatorLinks: [
      { id: 'centor-mcisaac-score', label: 'Centor/McIsaac Calculator' },
    ],
    next: 'ap-redflags',
    summary: 'Most pharyngitis is viral; GAS 5-15% in adults. Triage first for airway/red flags, then Centor/McIsaac, test if ≥2, treat confirmed GAS. Hunt mimics every visit.',
  },
  {
    id: 'ap-steps-summary',
    type: 'info',
    module: 1,
    title: 'Steps Summary',
    body: '**Rapid-action checklist for the adult sore throat:** [1,3]\n\n1. **Airway scan** — drooling, tripoding, stridor, voice change, trismus, severe neck swelling → STOP, manage airway first\n2. **Sepsis screen** — vitals, mental status, perfusion\n3. **Calculate Centor/McIsaac** → use [Centor/McIsaac Calculator](#/calculator/centor-mcisaac-score)\n4. **Decision:**\n   - Score **≤1** → no test, no abx, symptomatic care\n   - Score **2-3** → rapid GAS antigen; treat if positive\n   - Score **≥4** → rapid GAS antigen; many guidelines accept empiric treatment per local protocol\n5. **Antibiotic choice (confirmed GAS):**\n   - First-line: **Penicillin V 500 mg PO BID-TID × 10 days** or **amoxicillin 1 g PO daily × 10 days**\n   - Compliance issue: **benzathine PCN G 1.2 million units IM × 1**\n   - Non-anaphylactic PCN allergy: **cephalexin 500 mg PO BID × 10 days**\n   - Severe PCN allergy: **clindamycin 300 mg PO TID × 10 days** or azithromycin (note macrolide resistance)\n6. **Hunt mimics** — peritonsillar abscess, retropharyngeal abscess, Lemierre, Ludwig, epiglottitis, mono, acute HIV, GC\n7. **Disposition** — home with PO abx + analgesia for uncomplicated; ENT/admit for airway/abscess/Lemierre/Ludwig/epiglottitis',
    citation: [1, 3, 4],
    next: 'ap-redflags',
    skippable: true,
  },
  {
    id: 'ap-redflags',
    type: 'question',
    module: 1,
    title: 'Red Flags / Airway Threat?',
    body: '**Look for any of these before doing a detailed exam:** [1,5]\n\n- **Airway:** drooling, tripoding, stridor, severe trismus (can\'t open mouth >2 fingers), muffled/"hot-potato" voice\n- **Neck:** unilateral or bilateral swelling, asymmetry, tenderness over the IJ\n- **Toxicity:** sepsis vitals, AMS, severe odynophagia with inability to swallow secretions\n- **Trismus + uvular deviation + hot-potato voice:** peritonsillar abscess\n- **Bilateral submandibular swelling + tongue elevation:** Ludwig angina\n- **Persistent fever + unilateral neck pain after sore throat:** Lemierre\n- **Immunocompromise** (HIV, neutropenia, transplant, chemo): broader differential, lower threshold to image/admit',
    citation: [1, 5],
    options: [
      {
        label: 'YES — airway threat or critical red flag',
        description: 'Drooling, tripod, stridor, severe trismus, neck swelling, toxicity, immunocompromise',
        next: 'ap-airway',
        urgency: 'critical',
      },
      {
        label: 'NO — patient stable, focused sore throat workup',
        description: 'Proceed to Centor/McIsaac scoring',
        next: 'ap-centor-calc',
      },
    ],
  },
  {
    id: 'ap-airway',
    type: 'info',
    module: 1,
    title: 'Airway-First Management',
    body: '**Stop. Stabilize. Then evaluate.** [5,11]\n\n**Position:** let the patient choose position of comfort — usually sitting upright, tripoding. Do NOT force supine for exam.\n\n**Immediate actions:**\n- Call for airway help early (anesthesia/ENT)\n- Have difficult airway cart at bedside\n- IV access, monitors, end-tidal CO₂\n- Avoid sedation/paralytics until plan is set — these patients can lose their airway fast\n- Have a surgical airway tray open and ready (crich kit)\n\n**Imaging only when stable enough:**\n- CT neck with IV contrast for abscess/Lemierre/retropharyngeal — only with airway team available\n- Lateral neck X-ray (thumbprint sign) historically for epiglottitis, but limited sensitivity; bedside fiberoptic by ENT is preferred\n\n**Empiric antibiotics (broad-spectrum, anaerobic coverage):**\n- **Ampicillin-sulbactam 3 g IV q6h** (covers oral anaerobes, strep, most GN)\n- OR **piperacillin-tazobactam 4.5 g IV q6-8h** (broader, septic/Lemierre/Ludwig)\n- PCN-allergic: **clindamycin 600-900 mg IV q8h** ± levofloxacin\n- Add **vancomycin 15-20 mg/kg IV** if MRSA risk or hospital-acquired\n\n**Disposition:** OR/ICU/floor depending on diagnosis; never discharge a sore throat with airway compromise.\n\nProceed to the [Complications/Mimics screen](#/node/ap-mimics-screen) once airway is stabilized.',
    citation: [5, 11],
    next: 'ap-mimics-screen',
    summary: 'Position of comfort, call ENT/anesthesia, surgical airway ready, broad-spectrum abx (amp-sulbactam or pip-tazo), imaging only when stable, never discharge airway-threatened pharyngitis.',
    safetyLevel: 'critical',
  },

  // ===================================================================
  // MODULE 2: Score & Test
  // ===================================================================
  {
    id: 'ap-centor-calc',
    type: 'info',
    module: 2,
    title: 'Centor / McIsaac Score',
    body: '**Centor (4-point) and McIsaac (modified, 5-point with age) stratify adult sore throat for GAS likelihood and guide testing.** [1,3,6]\n\n| Criterion | Points |\n|-----------|:------:|\n| Fever >38°C (100.4°F) by history or measured | **+1** |\n| Absence of cough | **+1** |\n| Tender anterior cervical lymphadenopathy | **+1** |\n| Tonsillar exudate or swelling | **+1** |\n| Age 3-14 | **+1** |\n| Age 15-44 | 0 |\n| Age ≥45 | **−1** |\n\n**Interpretation (McIsaac 0-5):** [3,6]\n- **0-1:** ~1-10% GAS — **no test, no antibiotics**, symptomatic care\n- **2-3:** ~10-35% GAS — **rapid GAS antigen test; treat only if positive**\n- **4-5:** ~50-65% GAS — **rapid GAS antigen test; many protocols accept empiric treatment** depending on local resistance and follow-up\n\n**IDSA 2012 specifically recommends:** [1]\n- Testing only patients with clinical features suggestive of GAS (Centor/McIsaac ≥2)\n- AGAINST routine empiric treatment without confirmation in adults\n- AGAINST routine back-up culture after negative rapid antigen in adults (the rapid antigen specificity is high)\n\n**Pitfalls:**\n- A high score does NOT confirm GAS — viral pharyngitis (especially adenovirus, EBV) can mimic all four Centor criteria\n- A low score does NOT rule out the rare dangerous mimic — always screen separately for red flags\n- The score is **not a substitute** for examining the airway, neck, and skin (scarlatiniform rash, sandpaper rash)\n\nUse the [Centor/McIsaac Calculator](#/calculator/centor-mcisaac-score) to compute and document.',
    citation: [1, 3, 6],
    calculatorLinks: [
      { id: 'centor-mcisaac-score', label: 'Centor/McIsaac Calculator' },
    ],
    next: 'ap-centor-stratify',
    summary: 'McIsaac 5-point: fever, no cough, tender anterior cervical LAD, tonsillar exudate (each +1), age 3-14 +1, 15-44 0, ≥45 −1. 0-1 no test, 2-3 rapid antigen treat if +, ≥4 test, empiric per local protocol.',
  },
  {
    id: 'ap-centor-stratify',
    type: 'question',
    module: 2,
    title: 'Centor/McIsaac Stratification',
    body: 'Select the patient\'s score band: [1,3,6]',
    citation: [1, 3, 6],
    options: [
      {
        label: 'Score ≥4 — high GAS likelihood',
        description: '~50-65% GAS; rapid antigen test; many protocols accept empiric treatment',
        next: 'ap-rapid-gas',
        urgency: 'urgent',
      },
      {
        label: 'Score 2-3 — intermediate',
        description: '~10-35% GAS; rapid antigen test; treat only if positive',
        next: 'ap-rapid-gas',
      },
      {
        label: 'Score ≤1 — low likelihood',
        description: '~1-10% GAS; no test, no antibiotics, symptomatic care',
        next: 'ap-symptomatic',
      },
    ],
  },
  {
    id: 'ap-rapid-gas',
    type: 'info',
    module: 2,
    title: 'Rapid GAS Testing',
    body: '**Rapid antigen detection test (RADT):** [1,2]\n- Throat swab from tonsils + posterior pharynx (avoid cheeks, tongue)\n- Sensitivity 70-90%, **specificity 95-99%**\n- Result in 5-10 minutes\n- A **positive** RADT in a patient with compatible clinical findings is diagnostic for GAS — treat\n- A **negative** RADT in an adult with Centor/McIsaac ≥2:\n  - IDSA 2012: **does NOT require back-up culture** (high specificity, low pretest probability in adults)\n  - Symptomatic management; reconsider if symptoms worsen\n  - In pediatric patients, IDSA DOES recommend back-up throat culture for negative RADT\n\n**Molecular (NAAT/PCR) GAS tests:**\n- Where available, sensitivity 95-99% with similar specificity\n- IDSA accepts NAAT alone without back-up culture in adults AND children\n- Faster and more accurate than traditional RADT\n\n**Pitfalls:** [1,2]\n- Do NOT test asymptomatic contacts (chronic carriage 5-20% of population is biologically unimportant)\n- A positive RADT during a viral illness may reflect carriage, not active infection (clinical correlation always)\n- Throat culture turnaround 24-48h; rarely changes ED decisions\n\nIf RADT positive → proceed to [GAS Treatment](#/node/ap-abx-first-line)\nIf RADT negative and Centor/McIsaac ≥4 → consider local protocol on empiric treatment; document shared decision\nIf RADT negative and Centor/McIsaac 2-3 → [Symptomatic care](#/node/ap-symptomatic)',
    citation: [1, 2],
    options: [
      {
        label: 'RADT/NAAT positive — confirmed GAS',
        description: 'Treat per first-line regimen',
        next: 'ap-abx-first-line',
        urgency: 'urgent',
      },
      {
        label: 'RADT negative, score 2-3',
        description: 'No antibiotics; symptomatic care; return precautions',
        next: 'ap-symptomatic',
      },
      {
        label: 'RADT negative, score ≥4 — empiric decision',
        description: 'Per local protocol; shared decision-making; document',
        next: 'ap-abx-first-line',
      },
    ],
  },

  // ===================================================================
  // MODULE 3: Treat GAS
  // ===================================================================
  {
    id: 'ap-abx-first-line',
    type: 'info',
    module: 3,
    title: 'First-Line Antibiotics for Confirmed GAS',
    body: '**IDSA 2012 + AHA: Penicillin remains first-line for ARF prevention.** [1,4,7]\n\n**Goals:** [1,4]\n- Shorten symptom duration by ~16 hours\n- Reduce transmission to contacts (~24 h after first dose, patient no longer contagious)\n- Prevent acute rheumatic fever (ARF) — must be treated within **9 days** of symptom onset\n- Prevent suppurative complications (peritonsillar abscess, otitis media, sinusitis)\n- Note: antibiotics do **NOT** reliably prevent post-streptococcal glomerulonephritis\n\n**First-line regimens:** [1,4]\n\n| Drug | Adult Dose | Duration | Notes |\n|------|------------|----------|-------|\n| **Penicillin V** | 500 mg PO BID or TID | 10 days | First-line per IDSA; narrowest spectrum |\n| **Amoxicillin** | 1000 mg PO daily, OR 500 mg PO BID | 10 days | Better palatability; preferred when adherence/PO tolerance is a concern |\n| **Benzathine PCN G** | 1.2 million units IM × 1 | Single dose | Adherence problems, homeless, follow-up unreliable |\n\n**Key points:** [1,4]\n- **10-day duration is required** to prevent ARF — shorter courses fail this endpoint\n- Symptoms typically resolve in 3-5 days; reinforce completing the full 10 days\n- If patient has known mono → DO NOT use amoxicillin (rash in >80% of EBV cases) — use penicillin V instead\n- Same-household contacts: do NOT routinely test or treat unless symptomatic\n\n**PCN allergy?** → see [PCN-Allergy Alternatives](#/node/ap-abx-pcn-allergy)\n**Suspect mono?** → see [Infectious Mononucleosis](#/node/ap-mono)',
    citation: [1, 4, 7],
    next: 'ap-disposition',
    summary: 'Pen V 500 mg PO BID-TID × 10 d (first-line); amoxicillin 1 g PO daily × 10 d; benzathine PCN G 1.2 MU IM × 1 if adherence issue. 10-day course required for ARF prevention. Avoid amoxicillin if mono.',
    safetyLevel: 'critical',
  },
  {
    id: 'ap-abx-pcn-allergy',
    type: 'info',
    module: 3,
    title: 'Penicillin Allergy Alternatives',
    body: '**Clarify the allergy first.** Most "PCN allergy" patients are not truly IgE-mediated. [1,8]\n\n**Non-anaphylactic, non-severe PCN reaction (rash, GI upset, family history without confirmation):**\n\n| Drug | Adult Dose | Duration |\n|------|------------|----------|\n| **Cephalexin** | 500 mg PO BID | 10 days |\n| **Cefadroxil** | 1000 mg PO daily | 10 days |\n\nCross-reactivity between modern cephalosporins and penicillins is very low (<2%). Avoid first-gen cephalosporins only in confirmed anaphylaxis. [8]\n\n**Severe / IgE-mediated PCN allergy (anaphylaxis, SJS/TEN):**\n\n| Drug | Adult Dose | Duration | Caution |\n|------|------------|----------|---------|\n| **Clindamycin** | 300 mg PO TID | 10 days | Watch C. diff risk |\n| **Azithromycin** | 500 mg PO day 1, then 250 mg PO daily | Total 5 days | Significant macrolide resistance in some regions (5-20% GAS); confirm local susceptibility |\n| **Clarithromycin** | 250 mg PO BID | 10 days | Same resistance concern as azithromycin; many drug interactions |\n\n**Avoid in GAS:**\n- TMP-SMX, fluoroquinolones, tetracyclines, sulfonamides — high resistance; **not recommended** for GAS pharyngitis [1]\n\n**Pitfalls:** [1,8]\n- Many patients labeled "PCN allergic" can safely receive cephalosporins after a careful history\n- Macrolide resistance is rising — culture if local resistance >10% and treatment fails',
    citation: [1, 8],
    next: 'ap-disposition',
    summary: 'Non-anaphylactic PCN allergy: cephalexin 500 mg PO BID × 10 d. Severe: clindamycin 300 mg PO TID × 10 d or azithromycin (check resistance). Avoid TMP-SMX, FQ, tetracyclines.',
    safetyLevel: 'warning',
  },
  {
    id: 'ap-symptomatic',
    type: 'info',
    module: 3,
    title: 'Symptomatic / Supportive Care',
    body: '**For viral pharyngitis or low Centor/McIsaac score.** [1,9]\n\n**Analgesia (combination beats either alone):**\n- **Ibuprofen 400-600 mg PO q6h** (max 3.2 g/day) with food\n- **Acetaminophen 1000 mg PO q6h** (max 3-4 g/day)\n- Alternate ibuprofen + acetaminophen for sustained pain control\n\n**Topical/local:**\n- Salt-water gargle (1 tsp salt in 8 oz warm water q2-4h while awake)\n- Throat lozenges with benzocaine or menthol\n- Lidocaine 2% viscous PO swish/spit before meals (severe odynophagia, short term)\n\n**Steroids (single dose):** [9,10]\n- **Dexamethasone 10 mg PO/IM × 1** can shorten pain duration by ~12-24h\n- ACEP/EB Med support single-dose steroids in adults with significant pain; modest benefit\n- Avoid in: uncontrolled diabetes, GI bleed, suspected diabetes insipidus, immunocompromise without clear diagnosis\n- Do NOT routinely give steroids for sore throat without clinical indication\n\n**Hydration + rest:**\n- Encourage 2-3 L/day PO fluids; cold liquids and popsicles often tolerated\n- Rest; return to work/school when afebrile 24h without antipyretics (or 24h on antibiotics if GAS+)\n\n**Avoid:**\n- Empiric antibiotics for viral pharyngitis (drives resistance, no benefit)\n- Codeine/opioids unless severe and short-term — most pain controlled with NSAID + acetaminophen + steroid\n\n**Return precautions:**\n- Inability to swallow secretions, drooling\n- Worsening unilateral pain or neck swelling\n- Persistent fever >72h\n- Difficulty breathing, stridor, voice change\n- Severe one-sided pain or trismus',
    citation: [1, 9, 10],
    next: 'ap-disposition',
    summary: 'NSAID + APAP combination is the workhorse. Single dose dex 10 mg PO/IM helps. Salt water gargle, lozenges. No empiric abx for low-score sore throat. Strong return precautions.',
  },

  // ===================================================================
  // MODULE 4: Complications & Mimics
  // ===================================================================
  {
    id: 'ap-mimics-screen',
    type: 'question',
    module: 4,
    title: 'Complications / Mimics Screen',
    body: '**Actively scan for these on every visit — not just airway-threatened patients.** [2,5,11]',
    citation: [2, 5, 11],
    options: [
      {
        label: 'Peritonsillar abscess (PTA)',
        description: 'Trismus, uvular deviation, hot-potato voice, unilateral peritonsillar bulge',
        next: 'ap-pta',
        urgency: 'urgent',
      },
      {
        label: 'Retropharyngeal abscess',
        description: 'Neck stiffness/extension preference, posterior pharyngeal swelling, drooling',
        next: 'ap-retropharyngeal',
        urgency: 'critical',
      },
      {
        label: 'Lemierre syndrome',
        description: 'Persistent fever + unilateral neck pain after sore throat; septic IJ thrombophlebitis',
        next: 'ap-lemierre',
        urgency: 'critical',
      },
      {
        label: 'Epiglottitis or Ludwig angina',
        description: 'Drool/tripod (epiglottitis) or bilateral submandibular swelling + tongue elevation (Ludwig)',
        next: 'ap-epiglottitis-ludwig',
        urgency: 'critical',
      },
      {
        label: 'Mononucleosis (EBV) or scarlet fever',
        description: 'Posterior LAD + splenomegaly (mono); sandpaper rash + strawberry tongue (scarlet)',
        next: 'ap-mono',
      },
      {
        label: 'Acute HIV or gonococcal pharyngitis',
        description: 'Non-exudative + fever + LAD + rash (HIV) or high-risk sexual hx (GC)',
        next: 'ap-hiv-gc',
      },
      {
        label: 'No mimics suspected — proceed to disposition',
        description: 'Uncomplicated viral or GAS pharyngitis',
        next: 'ap-disposition',
      },
    ],
  },
  {
    id: 'ap-pta',
    type: 'info',
    module: 4,
    title: 'Peritonsillar Abscess (Quinsy)',
    body: '**The most common deep neck space infection in adults.** [11,12]\n\n**Classic presentation:**\n- Unilateral severe sore throat, often after several days of pharyngitis\n- **Trismus** (can\'t open mouth fully)\n- **Uvular deviation** away from the abscess\n- **"Hot-potato" / muffled voice**\n- Drooling, dysphagia\n- Tender unilateral cervical LAD\n- Bulging peritonsillar tissue with displacement of tonsil medially\n\n**Workup:**\n- Bedside intraoral exam (depressor + light)\n- Bedside intraoral or transcervical **ultrasound** — useful to confirm abscess vs cellulitis\n- **CT neck with IV contrast** if exam is non-diagnostic, can\'t open mouth, or concern for deeper/multispace involvement\n\n**Treatment:** [11,12]\n- **Drainage** (needle aspiration or I&D) — by ED physician with appropriate training, or ENT consult\n- **Antibiotics** (cover GAS + oral anaerobes including beta-lactamase producers):\n  - **Ampicillin-sulbactam 3 g IV q6h**\n  - OR **clindamycin 600-900 mg IV q8h** (PCN-allergic)\n  - OR oral: **amoxicillin-clavulanate 875/125 mg PO BID** if discharging\n- **Analgesia + hydration**\n- **Single dose dexamethasone 10 mg IV/IM/PO** reduces pain and trismus\n\n**Disposition:**\n- Successful drainage + tolerating PO + reliable follow-up → discharge home with PO antibiotics × 10-14 days, ENT follow-up 24-48h\n- Failed drainage, peritonsillar cellulitis without abscess, severe trismus, immunocompromise → admit IV abx + ENT',
    citation: [11, 12],
    next: 'ap-disposition',
    summary: 'Trismus + uvular deviation + hot-potato voice = PTA. Drain (needle or I&D), amp-sulbactam or clinda IV, single-dose dex, ENT follow-up. Bedside US helpful; CT if non-diagnostic.',
    safetyLevel: 'warning',
  },
  {
    id: 'ap-retropharyngeal',
    type: 'info',
    module: 4,
    title: 'Retropharyngeal Abscess / Lemierre Syndrome',
    body: '**Retropharyngeal abscess (RPA):** [5,11]\n- More common in children but occurs in adults (often after trauma, FB ingestion, dental infection)\n- **Neck stiffness or extension preference** ("won\'t flex"), torticollis\n- Posterior pharyngeal wall swelling/bulge\n- Drooling, dysphagia, dyspnea\n- Adult red flags: IVDU (posterior pharyngeal spread), recent dental work, immunocompromise\n\n**Workup:**\n- **CT neck with IV contrast** is the test of choice\n- Lateral neck X-ray (widened prevertebral soft tissue >7 mm at C2 or >22 mm at C6) — supportive but not sufficient\n- Blood cultures + CBC + lactate if septic\n\n**Treatment:**\n- **Airway control first** if compromise (ENT/anesthesia at bedside)\n- **Antibiotics:** ampicillin-sulbactam 3 g IV q6h OR piperacillin-tazobactam 4.5 g IV q6-8h; add vancomycin if MRSA risk\n- **Surgical drainage** by ENT/oral maxillofacial surgery — most RPAs require operative drainage\n- Admit (usually ICU monitoring with airway-trained team)',
    citation: [5, 11],
    next: 'ap-lemierre',
    summary: 'RPA: neck stiffness, posterior pharyngeal swelling. CT neck w/ contrast. Airway first, IV amp-sulbactam or pip-tazo, ENT drainage, admit ICU.',
    safetyLevel: 'critical',
  },
  {
    id: 'ap-lemierre',
    type: 'info',
    module: 4,
    title: 'Lemierre Syndrome',
    body: '**"The forgotten disease" — septic thrombophlebitis of the internal jugular vein, classically caused by Fusobacterium necrophorum.** [13]\n\n**Clinical pattern:**\n- Recent sore throat (often 4-12 days prior, sometimes improved transiently)\n- **Persistent or recurrent fever**\n- **Unilateral neck pain/swelling/tenderness** along the SCM (over the IJ)\n- Toxic appearance, rigors, sepsis physiology\n- Septic pulmonary emboli — pleuritic chest pain, hemoptysis, cough, abnormal CXR\n- Most common in adolescents and young adults\n\n**Workup:**\n- **CT neck with IV contrast** — IJ thrombus, surrounding inflammation; THE test of choice\n- **Blood cultures** — Fusobacterium necrophorum (anaerobic), often slow-growing\n- **CT chest with contrast** — septic emboli, infarcts, cavitations\n- CBC, lactate, sepsis panel\n\n**Treatment:** [13]\n- **Empiric broad-spectrum anaerobic coverage:**\n  - **Ampicillin-sulbactam 3 g IV q6h**\n  - OR **piperacillin-tazobactam 4.5 g IV q6-8h**\n  - OR **meropenem 1 g IV q8h** (severe sepsis or beta-lactamase concerns)\n  - Add **metronidazole 500 mg IV q8h** if not using a beta-lactam/beta-lactamase combination\n  - PCN-allergic: clindamycin + ciprofloxacin (less data)\n- **Anticoagulation:** controversial; consider for clot extension to cavernous sinus, propagating thrombus, or persistent bacteremia. Shared decision with IR/hematology/ID\n- **Duration:** typically 4-6 weeks of antibiotics\n- **ID consult + ICU admission**\n\n**Pitfalls:**\n- Easy to miss in early ED visits — the sore throat is "improving" but fever and neck pain are new\n- Maintain suspicion in any young adult with sore throat → unilateral neck pain → pulmonary symptoms',
    citation: [13],
    next: 'ap-disposition',
    summary: 'Lemierre = septic IJ thrombophlebitis, Fusobacterium, post-pharyngitis. CT neck/chest w/ contrast, blood cx, amp-sulbactam/pip-tazo/meropenem ± metronidazole, anticoag controversial, ICU + ID, 4-6 weeks abx.',
    safetyLevel: 'critical',
  },
  {
    id: 'ap-epiglottitis-ludwig',
    type: 'info',
    module: 4,
    title: 'Epiglottitis & Ludwig Angina',
    body: '**Both are airway emergencies — manage airway BEFORE detailed exam.** [5,11]\n\n**Adult epiglottitis:**\n- Rare in Hib-vaccinated era but rising in adults (H. influenzae non-vaccine strains, S. pneumoniae, GAS, viruses)\n- Severe sore throat **out of proportion to oropharyngeal exam**\n- Drooling, tripoding, muffled voice ("hot-potato"), stridor (late)\n- Lateral neck X-ray: **thumbprint sign** at epiglottis (limited sensitivity)\n- Definitive diagnosis: **fiberoptic laryngoscopy by ENT/anesthesia** in OR or controlled setting\n- **Treatment:** airway plan (OR intubation by ENT/anesthesia; have surgical airway ready); **ceftriaxone 2 g IV q24h** + **vancomycin 15-20 mg/kg IV** (cover S. pneumo, GAS, MRSA, H. flu); ICU admission\n\n**Ludwig angina:**\n- Bilateral, rapidly progressive cellulitis of the submandibular spaces (often odontogenic — molar source)\n- **Bilateral submandibular swelling + tongue elevation** ("woody" floor of mouth) + trismus + drool\n- Risk of airway loss is high — early **awake fiberoptic intubation** or surgical airway preferred\n- **Antibiotics:**\n  - **Ampicillin-sulbactam 3 g IV q6h** OR **piperacillin-tazobactam 4.5 g IV q6-8h**\n  - PCN-allergic: **clindamycin 600-900 mg IV q8h** ± levofloxacin\n  - Add **vancomycin** if MRSA risk (IVDU, hospital-acquired)\n- **Surgical drainage** if abscess on imaging; ENT/oral maxillofacial surgery\n- Steroids: dexamethasone 10 mg IV may help mucosal swelling — not a substitute for definitive airway\n- ICU admission with airway-capable team',
    citation: [5, 11],
    next: 'ap-disposition',
    summary: 'Adult epiglottitis: severe sore throat out of proportion to exam, drool/tripod. ENT fiberoptic, ceftriaxone + vanc. Ludwig: bilateral submandibular swelling + tongue elevation; awake intubation, amp-sulbactam/clinda, surgical drainage, ICU.',
    safetyLevel: 'critical',
  },
  {
    id: 'ap-mono',
    type: 'info',
    module: 4,
    title: 'Infectious Mononucleosis & Scarlet Fever',
    body: '**Infectious mononucleosis (EBV — Epstein-Barr virus):** [2,14]\n- Teens and young adults\n- Exudative pharyngitis often clinically indistinguishable from GAS\n- **Posterior cervical LAD** (vs anterior in GAS), generalized LAD, fatigue\n- **Splenomegaly** in up to 50% — palpate the LUQ\n- **Hepatomegaly**, transient transaminitis, periorbital edema\n- Atypical lymphocytosis on CBC; **monospot** (heterophile antibodies) — false negatives common in first week; EBV VCA IgM more sensitive early\n\n**Critical pitfall:** **DO NOT give amoxicillin or ampicillin** if mono is suspected — diffuse maculopapular rash develops in >80% of EBV cases on aminopenicillins (it is not a true PCN allergy but should be documented).\n\n**Management:**\n- Supportive: hydration, NSAIDs/acetaminophen, rest\n- Single-dose dexamethasone 10 mg PO/IM may help severe odynophagia or impending airway compromise\n- **Splenic precautions:** avoid contact sports + heavy lifting for 4-6 weeks (or until cleared) — risk of splenic rupture is real\n- Return precautions for abdominal pain (especially LUQ/left shoulder pain = Kehr sign of splenic rupture)\n- Most patients recover in 2-4 weeks; fatigue can persist months\n\n**Scarlet fever:** [2,14]\n- GAS + erythrogenic exotoxin\n- **Sandpaper-textured rash** (sparing palms/soles, blanches), **strawberry tongue**, circumoral pallor, Pastia lines\n- Treat as GAS pharyngitis ([first-line antibiotics](#/node/ap-abx-first-line))\n- Notify public health if outbreak suspected (school cluster)',
    citation: [2, 14],
    next: 'ap-disposition',
    summary: 'Mono: posterior LAD + splenomegaly + atypical lymphs. AVOID amoxicillin (EBV rash). Supportive, dex for severe odynophagia, splenic precautions × 4-6 weeks. Scarlet fever: sandpaper rash + strawberry tongue, treat as GAS.',
    safetyLevel: 'warning',
  },
  {
    id: 'ap-hiv-gc',
    type: 'info',
    module: 4,
    title: 'Acute HIV & Gonococcal Pharyngitis',
    body: '**Acute HIV (primary HIV infection):** [15]\n- Non-exudative pharyngitis + fever + generalized LAD + maculopapular rash + myalgias + mucocutaneous ulcers\n- Mononucleosis-like illness 2-4 weeks after exposure\n- **Standard HIV antibody tests can be NEGATIVE** in acute phase (3-4 week window)\n- **HIV-1 RNA (viral load) is the test of choice** for suspected acute HIV — turn-around 24-48h, sensitivity >99%\n- Always ask risk factors: unprotected sex, new partners, IVDU, occupational exposure\n- Counsel on transmission risk during acute phase (very high viral load)\n- Linkage to care: ID, ART consultation; HIV viral load + CD4 + ART initiation usually within 1 week\n\n**Gonococcal pharyngitis (N. gonorrhoeae):** [16]\n- Often asymptomatic; sometimes mild exudative pharyngitis with cervical LAD\n- Risk factors: orogenital contact, MSM, multiple partners\n- **Test:** GC NAAT on throat swab (do NOT rely on rapid GAS antigen)\n- **Treatment:** **Ceftriaxone 500 mg IM × 1** (1 g if ≥150 kg), per CDC 2021 STI guidelines\n- **Empirically treat for chlamydia** (doxycycline 100 mg PO BID × 7 days) unless ruled out\n- Sexual partner notification + STI panel (syphilis, HIV, hepatitis B/C)\n- Test of cure 7-14 days after treatment for pharyngeal GC',
    citation: [15, 16],
    next: 'ap-disposition',
    summary: 'Acute HIV: non-exudative pharyngitis + fever + rash + LAD; HIV RNA is the test (Ab can be negative). GC pharyngitis: NAAT; ceftriaxone 500 mg IM × 1 + empiric doxy for chlamydia; partner notification.',
    safetyLevel: 'warning',
  },

  // ===================================================================
  // MODULE 5: Disposition
  // ===================================================================
  {
    id: 'ap-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Choose disposition based on diagnosis, severity, and airway status: [1,4,11]',
    citation: [1, 4, 11],
    options: [
      {
        label: 'Discharge home — uncomplicated viral or GAS',
        description: 'Tolerating PO, stable airway, reliable follow-up, return precautions reviewed',
        next: 'ap-dispo-home',
      },
      {
        label: 'Admit — abscess, Lemierre, Ludwig, epiglottitis, immunocompromise',
        description: 'IV antibiotics, airway monitoring, ENT/ID/ICU as indicated',
        next: 'ap-dispo-admit',
        urgency: 'critical',
      },
    ],
  },
  {
    id: 'ap-dispo-home',
    type: 'result',
    module: 5,
    title: 'Home — Uncomplicated Pharyngitis',
    body: '**Discharge criteria:** [1,4]\n- Stable airway, no drool/stridor/tripod\n- Tolerating PO fluids and analgesia\n- Adequate pain control on PO regimen\n- Reliable follow-up + transportation + phone\n- No red flags on exam (no trismus, no unilateral neck pain/swelling, no progressive symptoms)\n- Splenic precautions in place if mono\n\n**Discharge plan:** [1,4,9]\n- **Antibiotics** (if confirmed GAS or empiric per protocol):\n  - Pen V 500 mg PO BID-TID × 10 days, OR amoxicillin 1 g PO daily × 10 days\n  - PCN-allergic: cephalexin 500 mg PO BID × 10 days; severe allergy: clindamycin or azithromycin\n- **Analgesia:** ibuprofen 400-600 mg PO q6h + acetaminophen 1000 mg PO q6h (alternating)\n- **Supportive:** salt-water gargle, hydration, lozenges, rest\n- **Single-dose dexamethasone 10 mg PO/IM** in ED can help severe odynophagia (modest benefit)\n- **Avoid:** amoxicillin if mono in differential; opioids unless short-term and severe\n\n**Return precautions (verbalized back to patient):**\n- Drooling, difficulty swallowing secretions\n- Trismus or jaw locking\n- Unilateral neck swelling or severe neck pain\n- Stridor, voice change, difficulty breathing\n- Persistent fever >72 h on antibiotics → reassess; consider abscess, Lemierre, resistance\n- Severe abdominal pain or LUQ/left shoulder pain (if mono — splenic rupture)\n\n**Follow-up:** [1]\n- PCP in 24-72 h, sooner if not improving\n- If GAS+: confirm symptom resolution; encourage completing 10-day course (ARF prevention)\n- If mono: ID/PCP in 1-2 weeks for symptom check; ongoing splenic precautions',
    recommendation: 'Discharge home if airway is stable, PO tolerated, follow-up reliable, and return precautions reviewed. Prescribe 10-day GAS antibiotic course if indicated, NSAID + APAP, and consider single-dose dexamethasone for severe odynophagia.',
    confidence: 'recommended',
    citation: [1, 4, 9],
  },
  {
    id: 'ap-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit — Complicated Pharyngitis',
    body: '**Admission criteria:** [11,13]\n- Peritonsillar abscess requiring observation post-drainage or failed drainage\n- Retropharyngeal abscess (essentially always)\n- Lemierre syndrome (ICU + ID + 4-6 weeks IV antibiotics)\n- Adult epiglottitis (ICU + ENT/anesthesia at bedside)\n- Ludwig angina (ICU + airway team + ENT/oral maxillofacial surgery)\n- Septic shock or toxic shock syndrome from GAS\n- Inability to tolerate PO + dehydration + ongoing severe odynophagia\n- Immunocompromised host (HIV, neutropenia, transplant, chemo)\n- Failed outpatient management/return visit\n- Suspected airway compromise (any drool/tripod/stridor)\n\n**Admission management:**\n- **Antibiotics** per diagnosis:\n  - PTA / RPA / Ludwig: ampicillin-sulbactam 3 g IV q6h OR pip-tazo 4.5 g IV q6-8h\n  - Lemierre: amp-sulbactam OR pip-tazo OR meropenem; add metronidazole if not using BL/BLI; 4-6 weeks duration\n  - Epiglottitis: ceftriaxone 2 g IV q24h + vancomycin 15-20 mg/kg IV\n  - PCN-allergic: clindamycin 600-900 mg IV q8h ± levofloxacin\n  - Add vancomycin for MRSA risk (IVDU, hospital-acquired, septic shock)\n- **Airway**: continuous monitoring; ICU if airway-threatened; ENT/anesthesia consult, surgical airway tray\n- **Source control**: ENT drainage for abscesses; surgical drainage for Ludwig\n- **Fluids + analgesia + antiemetics**\n- **Steroids** (case-by-case): dexamethasone 10 mg IV may help in PTA, severe pharyngitis; not a substitute for airway management or drainage\n- **ID consult** for Lemierre, septic shock, or complex resistance/allergy\n- Consider anticoagulation in Lemierre (shared decision)',
    recommendation: 'Admit with IV broad-spectrum antibiotics, airway monitoring, ENT/ID/ICU as indicated. Source control (drainage) for abscess. ICU for airway-threatened or septic patients.',
    confidence: 'definitive',
    citation: [11, 13],
  },
];

export const ADULT_PHARYNGITIS_NODE_COUNT = ADULT_PHARYNGITIS_NODES.length;

export const ADULT_PHARYNGITIS_MODULE_LABELS = [
  'Triage & Red Flags',
  'Score & Test',
  'Treat GAS',
  'Complications & Mimics',
  'Disposition',
];

export const ADULT_PHARYNGITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Shulman ST, Bisno AL, Clegg HW, et al. Clinical practice guideline for the diagnosis and management of group A streptococcal pharyngitis: 2012 update by the Infectious Diseases Society of America. Clin Infect Dis. 2012;55(10):e86-e102. doi:10.1093/cid/cis629' },
  { num: 2, text: 'Wessels MR. Clinical practice. Streptococcal pharyngitis. N Engl J Med. 2011;364(7):648-655. doi:10.1056/NEJMcp1009126' },
  { num: 3, text: 'McIsaac WJ, Kellner JD, Aufricht P, Vanjaka A, Low DE. Empirical validation of guidelines for the management of pharyngitis in children and adults. JAMA. 2004;291(13):1587-1595.' },
  { num: 4, text: 'Gerber MA, Baltimore RS, Eaton CB, et al. Prevention of rheumatic fever and diagnosis and treatment of acute streptococcal pharyngitis: a scientific statement from the American Heart Association. Circulation. 2009;119(11):1541-1551. doi:10.1161/CIRCULATIONAHA.109.191959' },
  { num: 5, text: 'EB Medicine. Pharyngitis and Strep Throat: Diagnosis and Management in the Emergency Department. Emerg Med Pract. Updated 2024. https://www.ebmedicine.net/topics/heent/pharyngitis-strep-throat' },
  { num: 6, text: 'Centor RM, Witherspoon JM, Dalton HP, Brody CE, Link K. The diagnosis of strep throat in adults in the emergency room. Med Decis Making. 1981;1(3):239-246.' },
  { num: 7, text: 'Spinks A, Glasziou PP, Del Mar CB. Antibiotics for sore throat. Cochrane Database Syst Rev. 2013;(11):CD000023. doi:10.1002/14651858.CD000023.pub4' },
  { num: 8, text: 'Pichichero ME. A review of evidence supporting the American Academy of Pediatrics recommendation for prescribing cephalosporin antibiotics for penicillin-allergic patients. Pediatrics. 2005;115(4):1048-1057.' },
  { num: 9, text: 'Sadeghirad B, Siemieniuk RAC, Brignardello-Petersen R, et al. Corticosteroids for treatment of sore throat: systematic review and meta-analysis of randomised trials. BMJ. 2017;358:j3887. doi:10.1136/bmj.j3887' },
  { num: 10, text: 'Hayward G, Thompson MJ, Perera R, Glasziou PP, Del Mar CB, Heneghan CJ. Corticosteroids as standalone or add-on treatment for sore throat. Cochrane Database Syst Rev. 2012;10:CD008268.' },
  { num: 11, text: 'Galioto NJ. Peritonsillar Abscess. Am Fam Physician. 2017;95(8):501-506.' },
  { num: 12, text: 'Powell J, Wilson JA. An evidence-based review of peritonsillar abscess. Clin Otolaryngol. 2012;37(2):136-145. doi:10.1111/j.1749-4486.2012.02452.x' },
  { num: 13, text: 'Riordan T. Human infection with Fusobacterium necrophorum (Necrobacillosis), with a focus on Lemierre\'s syndrome. Clin Microbiol Rev. 2007;20(4):622-659. doi:10.1128/CMR.00011-07' },
  { num: 14, text: 'Ebell MH. Epstein-Barr virus infectious mononucleosis. Am Fam Physician. 2004;70(7):1279-1287.' },
  { num: 15, text: 'Cohen MS, Shaw GM, McMichael AJ, Haynes BF. Acute HIV-1 infection. N Engl J Med. 2011;364(20):1943-1954. doi:10.1056/NEJMra1011874' },
  { num: 16, text: 'Workowski KA, Bachmann LH, Chan PA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep. 2021;70(4):1-187. doi:10.15585/mmwr.rr7004a1' },
];
