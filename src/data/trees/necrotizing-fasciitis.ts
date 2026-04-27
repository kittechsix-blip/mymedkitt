// MedKitt — Necrotizing Fasciitis (NSTI) Management
// Recognition → Resuscitation → Surgical Consultation → Antimicrobial Therapy → Adjunctive Therapy → Monitoring → Disposition
// 6 modules: Recognition & Risk Factors → Resuscitation & Surgical Urgency → Antimicrobial Therapy → Adjunctive Therapies → Monitoring & Complications → Disposition
// 28 nodes total.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const NECROTIZING_FASCIITIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION & RISK FACTORS
  // =====================================================================

  {
    id: 'nf-start',
    type: 'question',
    module: 1,
    title: 'Necrotizing Fasciitis — Initial Assessment',
    body: '[NSTI Steps Summary](#/info/nf-summary)\n\n**Necrotizing Soft Tissue Infection (NSTI)** is a rapidly progressive, life-threatening infection of the fascia and subcutaneous tissue with mortality of **25-35%** even with treatment. [1][2]\n\n**Key Principle:** This is a CLINICAL and SURGICAL diagnosis. Labs and imaging may support suspicion but CANNOT rule out NSTI. When in doubt, get surgery to the bedside. [2][3]\n\n**Hard Signs (high specificity):** [2]\n• Hemorrhagic bullae (~96% specific)\n• Crepitus / gas on imaging\n• Skin necrosis or violaceous discoloration\n• "Dishwater" gray wound drainage\n\n**Soft Signs (variable sensitivity):**\n• Pain out of proportion to exam (~90% sensitive) [2]\n• Rapidly spreading erythema/edema\n• Systemic toxicity with focal pain\n• Edema extending beyond erythema borders\n\n[NSTI Classification](#/info/nf-classification)\n\nAssess hemodynamic status:',
    citation: [1, 2, 3],
    options: [
      {
        label: 'Hard Signs Present',
        description: 'Hemorrhagic bullae, crepitus, skin necrosis, gas on imaging',
        next: 'nf-hard-signs',
        urgency: 'critical',
      },
      {
        label: 'High Suspicion — Soft Signs',
        description: 'Pain out of proportion, rapid progression, systemic toxicity',
        next: 'nf-soft-signs',
        urgency: 'urgent',
      },
      {
        label: 'Low Suspicion — Cellulitis',
        description: 'Localized erythema, no systemic toxicity, slow progression',
        next: 'nf-cellulitis-ddx',
      },
    ],
    summary: 'NSTI is clinical/surgical diagnosis — labs/imaging cannot rule out; hard signs: hemorrhagic bullae (96% specific), crepitus, necrosis; mortality 25-35%',
  },

  {
    id: 'nf-hard-signs',
    type: 'info',
    module: 1,
    title: 'Hard Signs Present — SURGICAL EMERGENCY',
    body: '**IMMEDIATE ACTIONS:** [2][3]\n\n1. **Call surgery NOW** — do not wait for imaging or labs\n2. **Resuscitate aggressively** — these patients are septic\n3. **Start broad-spectrum antibiotics immediately**\n4. **Mark wound borders with time** — assess progression\n\n**Hard signs have HIGH specificity:** [2]\n• **Hemorrhagic bullae** — ~96% specific for NSTI\n• **Crepitus** — gas in tissues (only ~25% sensitive but very specific)\n• **Violaceous/dusky skin** — indicates tissue necrosis\n• **Dishwater gray drainage** — pathognomonic\n• **Skin anesthesia** — nerve destruction from necrosis\n\n**Do NOT delay surgery for:**\n• CT scan (if diagnosis is clinically obvious)\n• Additional labs\n• LRINEC score calculation\n• Waiting for attending arrival',
    citation: [2, 3],
    next: 'nf-resus',
    safetyLevel: 'critical',
    summary: 'Hard signs = surgical emergency — call surgery NOW, do not delay for imaging/labs; hemorrhagic bullae 96% specific',
  },

  {
    id: 'nf-soft-signs',
    type: 'info',
    module: 1,
    title: 'Soft Signs — Maintain High Suspicion',
    body: '**Pain out of proportion** is the most sensitive finding (~90%) but can be difficult to assess. [2]\n\n**Findings that should increase suspicion:** [2][3]\n• Rapid progression of erythema (mark borders with time)\n• Edema extending beyond visible erythema\n• Fever with focal pain and systemic toxicity\n• Skin changes not responding to antibiotics\n• Blistering or bullae (even if not hemorrhagic)\n• Wooden/indurated feel to tissues\n\n**Risk factors for NSTI:** [1][4]\n• Diabetes mellitus (most common)\n• Immunocompromise (HIV, malignancy, steroids)\n• IV drug use\n• Recent surgery or trauma\n• Obesity\n• Peripheral vascular disease\n• Cirrhosis / chronic liver disease\n\n**Critical principle:** A normal LRINEC score does NOT rule out NSTI. [2][5]',
    citation: [1, 2, 3, 4, 5],
    next: 'nf-imaging',
    summary: 'Pain out of proportion most sensitive (~90%); risk factors: DM, immunocompromise, IVDU, recent surgery; normal LRINEC does NOT rule out',
  },

  {
    id: 'nf-cellulitis-ddx',
    type: 'question',
    module: 1,
    title: 'Cellulitis vs NSTI — Red Flags',
    body: '**Cellulitis is far more common than NSTI**, but missing NSTI is catastrophic.\n\n**Features suggesting simple cellulitis:** [2]\n• Slow progression (days, not hours)\n• Well-demarcated borders\n• Pain proportional to appearance\n• No systemic toxicity\n• Improvement with oral antibiotics\n\n**Red flags that should prompt re-evaluation:** [2][3]\n• Failure to improve after 24-48h of appropriate antibiotics\n• Worsening despite antibiotics\n• New systemic symptoms (fever, tachycardia, confusion)\n• Rapid progression of erythema\n• Development of bullae or skin changes\n• Pain increasing out of proportion\n\n**If ANY red flags present:**',
    citation: [2, 3],
    options: [
      {
        label: 'Red Flags Present',
        description: 'Progression, no improvement, new systemic symptoms',
        next: 'nf-soft-signs',
        urgency: 'urgent',
      },
      {
        label: 'No Red Flags — Cellulitis Likely',
        description: 'Stable, responding to therapy, no systemic toxicity',
        next: 'nf-cellulitis-tx',
      },
    ],
    summary: 'NSTI red flags: failure to improve at 24-48h, rapid progression, new systemic symptoms, bullae, pain out of proportion',
  },

  {
    id: 'nf-cellulitis-tx',
    type: 'info',
    module: 1,
    title: 'Simple Cellulitis — Close Follow-up',
    body: '**If low suspicion for NSTI:**\n\n**Mark wound borders** — instruct patient to return immediately if erythema extends beyond marks.\n\n**Standard cellulitis treatment:**\n• [Cephalexin](#/drug/cephalexin) 500 mg PO q6h OR\n• **TMP-SMX** DS 1-2 tabs PO BID (if MRSA risk)\n\n**Discharge instructions:** [2]\n• Return IMMEDIATELY if:\n  - Erythema spreads beyond marked borders\n  - Increasing pain\n  - Fever develops\n  - Bullae or skin color changes appear\n  - Any systemic symptoms\n\n**Follow-up within 24-48 hours mandatory.**\n\n**If patient has ANY risk factors (DM, immunocompromise, IVDU)** — lower threshold for imaging and surgical consultation.',
    citation: [2],
    next: 'nf-dispo-cellulitis',
    summary: 'Mark borders, treat cellulitis, mandatory return precautions for spread/pain/fever/bullae; 24-48h follow-up required',
  },

  {
    id: 'nf-imaging',
    type: 'info',
    module: 1,
    title: 'Imaging — CT Is Preferred',
    body: '**CT with IV contrast** is the imaging modality of choice: [2][6]\n• Sensitivity ~94%, Specificity ~77%\n• Faster and more practical than MRI\n• Can assess extent of involvement\n\n**CT findings suggestive of NSTI:** [2][6]\n• Gas tracking along fascial planes (most specific)\n• Fascial thickening with enhancement\n• Non-enhancing fascia (indicates necrosis)\n• Fluid collections along fascial planes\n• Vessel thrombosis\n• Abscess formation\n\n**CRITICAL:** [2]\n• **Normal CT does NOT rule out early NSTI**\n• Do NOT delay surgery for imaging if clinical diagnosis is clear\n• Early NSTI may have minimal CT findings\n\n**Ultrasound:** [2]\n• Fascial thickening >4 mm suggests NSTI (40-80% sensitivity, 93% specificity)\n• Can identify gas as echogenic foci with acoustic shadowing\n• Useful bedside adjunct but less definitive than CT\n\n**MRI:** [6]\n• Most sensitive but rarely practical in acute setting\n• Reserve for stable patients with diagnostic uncertainty',
    citation: [2, 6],
    next: 'nf-lrinec',
    summary: 'CT with contrast: 94% sensitive, 77% specific — look for gas, fascial thickening, non-enhancing fascia; normal CT does NOT rule out early NSTI',
  },

  {
    id: 'nf-lrinec',
    type: 'info',
    module: 1,
    title: 'LRINEC Score — Adjunct Only',
    body: '**Laboratory Risk Indicator for Necrotizing Fasciitis (LRINEC)** [5]\n\n[Calculate LRINEC Score](#/calculator/lrinec)\n\n| Parameter | Cutoff | Points |\n|-----------|--------|--------|\n| CRP | <150 mg/L | 0 |\n| | >=150 mg/L | 4 |\n| WBC | <15 | 0 |\n| | 15-25 | 1 |\n| | >25 | 2 |\n| Hemoglobin | >13.5 g/dL | 0 |\n| | 11-13.5 | 1 |\n| | <11 | 2 |\n| Sodium | >=135 | 0 |\n| | <135 | 2 |\n| Creatinine | <=1.6 mg/dL | 0 |\n| | >1.6 | 2 |\n| Glucose | <=180 mg/dL | 0 |\n| | >180 | 1 |\n\n**Interpretation:**\n• **LRINEC >=6** — Higher risk, ~92% PPV in original study [5]\n• **LRINEC >=8** — Strong indicator for NSTI\n\n**CRITICAL LIMITATION:** [2][5]\n• **Poor sensitivity** — scores <6 do NOT rule out NSTI\n• Canadian guidelines recommend AGAINST using LRINEC for decision-making [2]\n• Use as ADJUNCT only, not as screening tool\n• **Clinical suspicion always trumps LRINEC score**',
    citation: [2, 5],
    next: 'nf-resus',
    summary: 'LRINEC >=6 increases suspicion BUT scores <6 do NOT rule out; Canadian guidelines recommend against using for decision-making; clinical suspicion trumps score',
  },

  // =====================================================================
  // MODULE 2: RESUSCITATION & SURGICAL URGENCY
  // =====================================================================

  {
    id: 'nf-resus',
    type: 'info',
    module: 2,
    title: 'Resuscitation — Sepsis Protocol',
    body: '**NSTI patients are SEPTIC** — apply sepsis bundle: [2][7]\n\n**Immediate actions:**\n1. **IV access** — 2 large-bore IVs or central line\n2. **Fluid resuscitation** — 30 mL/kg LR bolus within 3 hours\n3. **Broad-spectrum antibiotics** — within 1 hour (see next step)\n4. **Labs** — CBC, BMP, lactate, CRP, coags, blood cultures x2, wound cultures\n5. **Mark wound margins** with time\n\n**Vasopressors if needed:**\n• [Norepinephrine](#/drug/norepinephrine) 0.05-0.5 mcg/kg/min — first-line\n• Add [Vasopressin](#/drug/vasopressin) 0.03-0.04 units/min early\n• Target MAP >=65 mmHg\n\n**Do NOT delay surgery for:**\n• Complete resuscitation\n• Hemodynamic stability\n• Culture results\n• Additional imaging\n\n**The single most important intervention is SURGICAL DEBRIDEMENT.** [2][3]',
    citation: [2, 3, 7],
    next: 'nf-surgery',
    safetyLevel: 'critical',
    summary: 'Sepsis protocol: 30 mL/kg LR, broad-spectrum abx within 1hr, norepinephrine if needed; do NOT delay surgery for resuscitation',
  },

  {
    id: 'nf-surgery',
    type: 'info',
    module: 2,
    title: 'Surgical Consultation — STAT',
    body: '**Call surgery IMMEDIATELY** — this is a surgical emergency. [2][3]\n\n**Surgical consultation should be obtained for:**\n• Any patient with suspected or confirmed NSTI\n• Cellulitis not improving on appropriate antibiotics\n• Any concerning skin findings (bullae, necrosis, crepitus)\n\n**Bedside finger test:** [2]\n• Under local anesthesia, make 2 cm incision to fascia\n• Insert finger and probe along fascial plane\n• Positive: lack of tissue resistance, "dishwater" drainage\n• Can be performed by ED physician if surgery delayed\n• False-negative rate ~20% — absence does not rule out\n\n**Surgical principles:** [2][3]\n• **Wide debridement** of all necrotic tissue\n• Extend incisions until healthy, bleeding tissue encountered\n• Typically requires **multiple return trips to OR** (every 24-48h)\n• Amputation may be required for extremity involvement\n• Vacuum-assisted closure (VAC) for wound management\n\n**Each hour of surgical delay increases mortality.** [3]',
    citation: [2, 3],
    next: 'nf-location',
    safetyLevel: 'critical',
    summary: 'Call surgery STAT; bedside finger test if surgery delayed; each hour of surgical delay increases mortality; multiple OR trips typical',
  },

  {
    id: 'nf-location',
    type: 'question',
    module: 2,
    title: 'Anatomic Location',
    body: '**Location affects microbiology and additional considerations:**\n\n**Select primary location of infection:**',
    citation: [1, 4],
    options: [
      {
        label: 'Extremity',
        description: 'Arm, leg, hand, foot',
        next: 'nf-abx-empiric',
      },
      {
        label: 'Perineum / Fournier Gangrene',
        description: 'Genital, scrotal, perianal',
        next: 'nf-fournier',
      },
      {
        label: 'Trunk / Torso',
        description: 'Abdominal wall, back, chest wall',
        next: 'nf-abx-empiric',
      },
      {
        label: 'Head / Neck',
        description: 'Cervical fasciitis, post-dental infection',
        next: 'nf-head-neck',
      },
    ],
    summary: 'Location guides microbiology: extremity (Type 1/2), Fournier (polymicrobial + anaerobes), head/neck (odontogenic), trunk (post-surgical)',
  },

  {
    id: 'nf-fournier',
    type: 'info',
    module: 2,
    title: 'Fournier Gangrene — Perineal NSTI',
    body: '**Fournier gangrene** is NSTI of the perineum, scrotum, and genital region. Mortality **40%**. [4][8]\n\n**Risk factors:** [4]\n• Diabetes mellitus (most common)\n• Alcoholism / immunocompromise\n• Urinary tract infection / instrumentation\n• Perianal abscess / anal fissure\n• Recent surgery / trauma\n\n**Key considerations:** [8]\n• **Polymicrobial** — always include broad gram-negative AND anaerobic coverage\n• May require fecal diversion (colostomy)\n• Orchidectomy rarely needed (testes have separate blood supply)\n• Urinary catheter placement (often suprapubic)\n\n**Antibiotic regimen — ensure anaerobic coverage:** [8]\n• [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam) 4.5g IV q6h PLUS\n• [Vancomycin](#/drug/vancomycin) 25-30 mg/kg IV load PLUS\n• [Clindamycin](#/drug/clindamycin) 900 mg IV q8h (toxin suppression)\n\n**Surgical debridement is MANDATORY** — often extensive.',
    citation: [4, 8],
    next: 'nf-abx-empiric',
    safetyLevel: 'critical',
    summary: 'Fournier gangrene: perineal NSTI, 40% mortality, polymicrobial; always include broad gram-negative + anaerobic + MRSA coverage; surgical debridement mandatory',
  },

  {
    id: 'nf-head-neck',
    type: 'info',
    module: 2,
    title: 'Cervical / Head-Neck NSTI',
    body: '**Cervical necrotizing fasciitis** often originates from: [9]\n• Dental infection (most common)\n• Peritonsillar abscess\n• Ludwig angina\n• Penetrating trauma\n\n**Key considerations:**\n• **Airway compromise** is the primary threat\n• Can rapidly spread to mediastinum (descending necrotizing mediastinitis)\n• CT neck AND chest with contrast\n• Early intubation if airway concern\n• May require awake fiberoptic intubation\n\n**Microbiology:** [9]\n• Typically polymicrobial (oral flora)\n• Streptococci, anaerobes, gram-negatives\n• Mixed oral flora including Fusobacterium, Prevotella\n\n**Antibiotic regimen:** [9]\n• [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam) 4.5g IV q6h PLUS\n• [Vancomycin](#/drug/vancomycin) 25-30 mg/kg IV load PLUS\n• [Clindamycin](#/drug/clindamycin) 900 mg IV q8h\n\n**Consult ENT and CT surgery immediately.**',
    citation: [9],
    next: 'nf-abx-empiric',
    safetyLevel: 'critical',
    summary: 'Head/neck NSTI: airway threat is primary concern; can spread to mediastinum; early intubation; consult ENT and CT surgery; often odontogenic origin',
  },

  // =====================================================================
  // MODULE 3: ANTIMICROBIAL THERAPY
  // =====================================================================

  {
    id: 'nf-abx-empiric',
    type: 'info',
    module: 3,
    title: 'Empiric Antibiotic Therapy',
    body: '**Triple-drug therapy** covering gram-positives (including MRSA), gram-negatives, and anaerobes: [2][3][10]\n\n[NSTI Treatment Guide](#/info/nf-treatment-guide)\n\n**Recommended Empiric Regimen:**\n\n1. **Broad-spectrum beta-lactam backbone:**\n   • [Piperacillin-tazobactam](#/drug/piperacillin-tazobactam) 4.5g IV q6h (preferred) OR\n   • [Meropenem](#/drug/meropenem) 1g IV q8h (if resistant organisms suspected)\n\n2. **MRSA Coverage:**\n   • [Linezolid](#/drug/linezolid) 600 mg IV q12h (PREFERRED) — superior toxin suppression, avoids nephrotoxicity OR\n   • [Vancomycin](#/drug/vancomycin) 25-30 mg/kg IV load, then 15-20 mg/kg IV q8-12h\n\n3. **Toxin Suppression (add to regimen):**\n   • [Clindamycin](#/drug/clindamycin) 900 mg IV q8h — inhibits toxin synthesis at ribosomal level [2][3]\n\n**Duration:** 7-14 days total; continue 48-72 hours after final debridement with clinical improvement. [10]',
    citation: [2, 3, 10],
    next: 'nf-special-organisms',
    safetyLevel: 'critical',
    summary: 'Triple therapy: pip-tazo + linezolid (or vanco) + clindamycin; clindamycin for toxin suppression is critical; 7-14 days total duration',
  },

  {
    id: 'nf-special-organisms',
    type: 'question',
    module: 3,
    title: 'Special Organism Considerations',
    body: '**Epidemiologic exposures may suggest specific pathogens:**\n\n**Select if any apply:**',
    citation: [1, 2, 4],
    options: [
      {
        label: 'Saltwater Exposure — Vibrio',
        description: 'Ocean water, raw oysters, fishing injury',
        next: 'nf-vibrio',
      },
      {
        label: 'Freshwater Exposure — Aeromonas',
        description: 'Lake, river, pond injury',
        next: 'nf-aeromonas',
      },
      {
        label: 'No Special Exposure',
        description: 'Standard community-acquired or healthcare-associated',
        next: 'nf-type-classification',
      },
    ],
    summary: 'Special exposures: saltwater = Vibrio vulnificus (high mortality), freshwater = Aeromonas; both require specific antibiotic coverage',
  },

  {
    id: 'nf-vibrio',
    type: 'info',
    module: 3,
    title: 'Vibrio vulnificus — Saltwater NSTI',
    body: '**Vibrio vulnificus** causes rapidly fatal NSTI with **>50% mortality**. [4][11]\n\n**Risk factors:**\n• Liver cirrhosis (100x increased risk)\n• Hemochromatosis\n• Immunocompromise\n• Raw oyster ingestion\n• Saltwater wound exposure (Gulf Coast, warm coastal waters)\n\n**Clinical features:**\n• Extremely rapid progression (hours)\n• Hemorrhagic bullae characteristic\n• Septic shock common at presentation\n• Often requires amputation\n\n**Antibiotic regimen (ADD to empiric therapy):** [4][11]\n• [Doxycycline](#/drug/doxycycline) 100 mg IV q12h PLUS\n• [Ceftriaxone](#/drug/ceftriaxone) 2g IV q24h OR **Ceftazidime** 2g IV q8h\n\n**If already on pip-tazo or carbapenem:**\n• Add doxycycline 100 mg IV q12h (the key agent for Vibrio)\n\n**Surgical debridement URGENT** — mortality increases rapidly with delay.',
    citation: [4, 11],
    next: 'nf-type-classification',
    safetyLevel: 'critical',
    summary: 'Vibrio vulnificus: saltwater/oysters, cirrhosis major risk, >50% mortality; add doxycycline + 3rd-gen cephalosporin to standard regimen',
  },

  {
    id: 'nf-aeromonas',
    type: 'info',
    module: 3,
    title: 'Aeromonas — Freshwater NSTI',
    body: '**Aeromonas hydrophila** associated with freshwater exposure. [4]\n\n**Risk factors:**\n• Freshwater injury (lake, river, pond)\n• Immunocompromise\n• Liver disease\n• Leech therapy (medicinal leeches)\n\n**Antibiotic regimen (ADD to empiric therapy):** [4]\n• [Doxycycline](#/drug/doxycycline) 100 mg IV q12h PLUS\n• [Ciprofloxacin](#/drug/ciprofloxacin) 400 mg IV q12h OR **Levofloxacin** 750 mg IV q24h\n\n**If already on pip-tazo or carbapenem:**\n• Add doxycycline 100 mg IV q12h + fluoroquinolone\n\n**Note:** Aeromonas is often resistant to ampicillin and first-generation cephalosporins.',
    citation: [4],
    next: 'nf-type-classification',
    summary: 'Aeromonas: freshwater exposure, leech therapy; add doxycycline + fluoroquinolone to standard regimen; resistant to ampicillin',
  },

  {
    id: 'nf-type-classification',
    type: 'info',
    module: 3,
    title: 'NSTI Classification by Microbiology',
    body: '[NSTI Classification](#/info/nf-classification)\n\n**Type I — Polymicrobial (70-90%):** [1][4]\n• Mixed aerobic and anaerobic bacteria\n• At least 2 organisms (often 4-5+)\n• Includes: Bacteroides, Clostridium, Peptostreptococcus, Enterobacteriaceae\n• More common in: diabetics, post-surgical, Fournier gangrene\n\n**Type II — Monomicrobial (10-30%):** [1][4]\n• Single organism, often more virulent\n• **Group A Streptococcus (GAS)** — most common, associated with TSS\n• **MRSA** — increasingly common, up to 1/3 of Type II\n• More common in: extremities, younger/healthier patients\n\n**Type III — Vibrio species:** [4]\n• Proposed separate category\n• Saltwater exposure\n• Extremely rapid and lethal\n\n**Clostridial myonecrosis (gas gangrene):** [1]\n• Clostridium perfringens, C. septicum\n• Associated with trauma, contaminated wounds\n• Extremely rapid progression with gas production\n\n**Cultures guide de-escalation** but should NOT delay empiric broad-spectrum therapy.',
    citation: [1, 4],
    next: 'nf-toxin',
    summary: 'Type I: polymicrobial 70-90% (DM, post-surgical); Type II: monomicrobial 10-30% (GAS, MRSA — extremities); Type III: Vibrio (saltwater)',
  },

  // =====================================================================
  // MODULE 4: ADJUNCTIVE THERAPIES
  // =====================================================================

  {
    id: 'nf-toxin',
    type: 'info',
    module: 4,
    title: 'Toxin Suppression — Clindamycin',
    body: '**Clindamycin is CRITICAL for toxin-mediated disease:** [2][3]\n\n**Mechanism:** [3]\n• Inhibits bacterial protein synthesis at 50S ribosome\n• Suppresses exotoxin production (superantigens, streptolysins)\n• Effect persists even as bacteria die\n• Beta-lactams may paradoxically INCREASE toxin release (Eagle effect)\n\n**Dosing:** [2]\n• [Clindamycin](#/drug/clindamycin) 900 mg IV q8h\n• Some experts recommend **1200 mg IV q6h** for severe TSS [2]\n\n**When to use:**\n• ALL suspected or confirmed NSTI\n• Especially important for:\n  - Group A Streptococcus (GAS)\n  - Toxic shock syndrome\n  - Clostridial infection\n\n**Continue clindamycin** throughout antibiotic course in toxin-producing infections.\n\n**Dual toxin suppression:** [2]\n• For critically ill patients with streptococcal TSS, consider:\n  - [Clindamycin](#/drug/clindamycin) 900 mg IV q8h PLUS\n  - [Linezolid](#/drug/linezolid) 600 mg IV q12h\n• They act at different ribosomal sites and may be synergistic',
    citation: [2, 3],
    next: 'nf-ivig',
    summary: 'Clindamycin 900 mg IV q8h CRITICAL for toxin suppression; beta-lactams may increase toxin release (Eagle effect); consider dual suppression with linezolid in severe TSS',
  },

  {
    id: 'nf-ivig',
    type: 'info',
    module: 4,
    title: 'IVIG — Streptococcal TSS',
    body: '**Intravenous Immunoglobulin (IVIG)** may be considered for streptococcal NSTI with toxic shock syndrome. [2][12]\n\n**Mechanism:**\n• Neutralizes circulating superantigens\n• Contains antibodies against streptococcal exotoxins\n\n**Evidence:** [12]\n• Small RCTs suggest survival benefit\n• Canadian observational study: OR 8.1 for survival with IVIG\n• Larger US study showed no mortality benefit\n• Evidence remains limited and conflicting\n\n**Dosing:** [2][12]\n• **1 g/kg IV on Day 1**\n• **0.5 g/kg IV on Days 2-3** (if needed)\n• OR: 2 g/kg total dose divided over 1-5 days\n\n**Consider IVIG for:** [2]\n• Confirmed or suspected Group A Streptococcal NSTI\n• Toxic shock syndrome with multi-organ failure\n• Refractory shock despite aggressive resuscitation\n\n**WSES guidelines recommend IVIG** for streptococcal/staphylococcal NSTI. [2]\n\n**Note:** IVIG is expensive and supply may be limited. Discuss with pharmacy and ID early.',
    citation: [2, 12],
    next: 'nf-hbo',
    summary: 'IVIG 1 g/kg day 1, then 0.5 g/kg days 2-3 for streptococcal TSS; evidence mixed but WSES recommends; neutralizes superantigens',
  },

  {
    id: 'nf-hbo',
    type: 'info',
    module: 4,
    title: 'Hyperbaric Oxygen (HBO)',
    body: '**Hyperbaric oxygen therapy** is controversial for NSTI. [13]\n\n**Theoretical benefits:**\n• Increases tissue oxygen tension\n• May enhance neutrophil killing\n• Inhibits anaerobic bacterial growth\n• Reduces clostridial alpha-toxin production\n\n**Evidence:** [13]\n• Observational studies suggest possible benefit\n• No randomized controlled trials\n• Difficult to separate from selection bias (only stable patients can be transferred)\n\n**Practical considerations:**\n• **NEVER delay surgical debridement for HBO**\n• HBO facilities often not available\n• Patient must be stable enough for transport/chamber\n• May be considered as adjunct AFTER initial debridement\n\n**If considering HBO:**\n• Contact hyperbaric center early\n• Coordinate with surgical team\n• Do NOT delay repeat debridements\n\n**Bottom line:** HBO may be beneficial but is NOT a substitute for surgery. Consider only in stable patients after source control.',
    citation: [13],
    next: 'nf-monitoring',
    summary: 'HBO controversial, no RCTs; may be adjunctive after surgical debridement in stable patients; NEVER delay surgery for HBO',
  },

  // =====================================================================
  // MODULE 5: MONITORING & COMPLICATIONS
  // =====================================================================

  {
    id: 'nf-monitoring',
    type: 'info',
    module: 5,
    title: 'Monitoring & Serial Evaluation',
    body: '**Frequent reassessment is critical:** [2][3]\n\n**Clinical monitoring:**\n• Serial wound exams (every 4-6 hours initially)\n• Mark wound borders with time at each exam\n• Monitor for progression despite therapy\n• Reassess for new areas of involvement\n\n**Laboratory monitoring:**\n• Lactate trending (should improve with debridement)\n• WBC and CRP (expect improvement by 48-72h)\n• Renal function (watch for AKI from sepsis, myoglobin, contrast)\n• Coagulation studies (DIC common)\n\n**Return to OR:**\n• Typically every 24-48 hours for re-look [3]\n• Continue until no further necrotic tissue identified\n• May require 3-5+ debridements\n\n**Signs of inadequate source control:**\n• Persistent/worsening shock despite pressors\n• Rising lactate\n• Expanding wound margins\n• Continued fever/leukocytosis\n\n**If not improving, re-evaluate:**\n• Adequate surgical debridement?\n• Correct antibiotic coverage?\n• Missed compartment or deep space?',
    citation: [2, 3],
    next: 'nf-complications',
    summary: 'Serial wound exams q4-6h, mark borders, trend lactate/WBC/CRP; OR every 24-48h until clean; persistent shock = inadequate source control',
  },

  {
    id: 'nf-complications',
    type: 'info',
    module: 5,
    title: 'Complications',
    body: '**Common complications of NSTI:** [2][3]\n\n**Acute:**\n• Septic shock (most common cause of death)\n• Multi-organ dysfunction (MODS)\n• DIC and coagulopathy\n• Acute kidney injury\n• ARDS\n• Toxic shock syndrome\n\n**Surgical:**\n• Amputation (common for extremity NSTI)\n• Massive tissue loss requiring reconstruction\n• Skin grafting\n• Fecal diversion for Fournier gangrene\n• Permanent disfigurement\n\n**Long-term:**\n• Chronic pain\n• Functional limitations\n• PTSD and psychological trauma\n• Prolonged rehabilitation\n• Recurrence (rare)\n\n**Mortality:** [1][2]\n• Overall: 25-35%\n• Fournier gangrene: ~40%\n• Vibrio vulnificus: >50%\n• Delays in surgery or antibiotics significantly increase mortality\n\n**Each hour of surgical delay increases mortality by 2-3%.** [3]',
    citation: [1, 2, 3],
    next: 'nf-abx-deescalation',
    summary: 'Mortality 25-35% (Fournier 40%, Vibrio >50%); complications: septic shock, MODS, DIC, AKI, amputation; each hour surgical delay increases mortality 2-3%',
  },

  {
    id: 'nf-abx-deescalation',
    type: 'info',
    module: 5,
    title: 'Antibiotic De-escalation',
    body: '**De-escalate antibiotics based on culture results:** [10]\n\n**When cultures are final (typically 48-72 hours):**\n\n**If Group A Streptococcus (GAS):**\n• [Penicillin G](#/drug/penicillin-g-iv) 4 million units IV q4h PLUS\n• [Clindamycin](#/drug/clindamycin) 900 mg IV q8h (continue for toxin suppression)\n\n**If MRSA:**\n• [Vancomycin](#/drug/vancomycin) OR [Linezolid](#/drug/linezolid) PLUS\n• [Clindamycin](#/drug/clindamycin) if toxin-producing\n\n**If Clostridial:**\n• [Penicillin G](#/drug/penicillin-g-iv) 4 million units IV q4h PLUS\n• [Clindamycin](#/drug/clindamycin) 900 mg IV q8h\n\n**Total duration:** [10]\n• 7-14 days total\n• Continue IV therapy 48-72 hours after final debridement\n• Transition to PO when stable and tolerating oral intake\n\n**ID consultation** recommended for complex cases or resistant organisms.',
    citation: [10],
    next: 'nf-dispo',
    summary: 'De-escalate at 48-72h based on cultures; GAS: penicillin + clindamycin; MRSA: vanco/linezolid + clindamycin; 7-14 days total',
  },

  // =====================================================================
  // MODULE 6: DISPOSITION
  // =====================================================================

  {
    id: 'nf-dispo',
    type: 'info',
    module: 6,
    title: 'Disposition — ICU Admission',
    body: '**ALL patients with confirmed or suspected NSTI require ICU admission.** [2][3]\n\n**ICU is mandatory for:**\n• Hemodynamic instability / vasopressor requirement\n• Septic shock\n• Multi-organ dysfunction\n• Post-operative monitoring after debridement\n• Serial wound assessments\n• Potential return to OR\n\n**Multidisciplinary team:**\n• Surgery (general surgery, plastics, or subspecialty based on location)\n• Infectious disease\n• Critical care\n• Wound care / VAC therapy\n• Physical/occupational therapy\n• Social work / case management\n• Psychology (trauma counseling)\n\n**Discharge planning (eventual):**\n• Prolonged hospitalization expected\n• May require skilled nursing facility\n• Outpatient wound care\n• PT/OT rehabilitation\n• Mental health follow-up\n\n**Notify family early** — this is a life-threatening condition with high mortality and likely disfigurement.',
    citation: [2, 3],
    summary: 'ALL NSTI patients require ICU; multidisciplinary care: surgery, ID, critical care, wound care, PT/OT, psych; notify family early of severity',
  },

  {
    id: 'nf-dispo-cellulitis',
    type: 'info',
    module: 6,
    title: 'Disposition — Low-Risk Cellulitis',
    body: '**If NSTI has been confidently ruled out** and simple cellulitis is the diagnosis:\n\n**Outpatient management appropriate if:**\n• No systemic toxicity\n• Hemodynamically stable\n• Able to take oral antibiotics\n• Reliable follow-up within 24-48 hours\n• Understanding of return precautions\n\n**Mandatory discharge instructions:**\n• **Mark wound borders** before discharge\n• Return IMMEDIATELY if:\n  - Erythema extends beyond marks\n  - Increasing pain\n  - Fever develops\n  - Bullae appear\n  - Any systemic symptoms\n• Follow-up in 24-48 hours\n\n**Antibiotics for simple cellulitis:**\n• [Cephalexin](#/drug/cephalexin) 500 mg PO q6h x 5-7 days OR\n• **TMP-SMX** DS BID x 5-7 days (if MRSA risk)\n\n**Higher threshold for admission if:**\n• Diabetes or immunocompromise\n• IV drug use\n• Failed outpatient therapy\n• Unreliable patient or poor follow-up access',
    citation: [2],
    summary: 'Cellulitis outpatient if: no systemic toxicity, reliable follow-up, understands return precautions; mark borders, 24-48h follow-up mandatory',
  },
];

export const NECROTIZING_FASCIITIS_MODULE_LABELS = [
  'Recognition & Risk Factors',
  'Resuscitation & Surgical Urgency',
  'Antimicrobial Therapy',
  'Adjunctive Therapies',
  'Monitoring & Complications',
  'Disposition',
];

export const NECROTIZING_FASCIITIS_CRITICAL_ACTIONS = [
  { text: 'SURGICAL CONSULT STAT — each hour of delay increases mortality 2-3%', nodeId: 'nf-surgery' },
  { text: 'Hemorrhagic bullae are 96% specific for NSTI — do NOT wait for other confirmation', nodeId: 'nf-hard-signs' },
  { text: 'Start broad-spectrum antibiotics WITHIN 1 HOUR (pip-tazo + linezolid + clindamycin)', nodeId: 'nf-abx-empiric' },
  { text: 'CLINDAMYCIN 900 mg IV q8h is CRITICAL for toxin suppression — add to all regimens', nodeId: 'nf-toxin' },
  { text: 'Normal LRINEC score does NOT rule out NSTI — clinical suspicion trumps labs', nodeId: 'nf-lrinec' },
  { text: 'Normal CT does NOT rule out early NSTI — do NOT delay surgery for imaging', nodeId: 'nf-imaging' },
  { text: 'Mark wound borders with time — reassess for progression every 4-6 hours', nodeId: 'nf-monitoring' },
  { text: 'Saltwater exposure + hemorrhagic bullae = Vibrio vulnificus — add doxycycline + cephalosporin', nodeId: 'nf-vibrio' },
  { text: 'Fournier gangrene (perineal NSTI): 40% mortality — always include anaerobic coverage', nodeId: 'nf-fournier' },
  { text: 'Consider IVIG 1 g/kg for streptococcal TSS with shock refractory to resuscitation', nodeId: 'nf-ivig' },
];

export const NECROTIZING_FASCIITIS_CITATIONS: Citation[] = [
  {
    num: 1,
    text: 'Bonne SL, Kadri SS. Evaluation and Management of Necrotizing Soft Tissue Infections. Infect Dis Clin North Am. 2017;31(3):497-511.',
  },
  {
    num: 2,
    text: 'Farkas J. Skin and soft tissue infections (including necrotizing fasciitis). EMCrit IBCC. Updated Oct 2025.',
  },
  {
    num: 3,
    text: 'Stevens DL, et al. Practice Guidelines for the Diagnosis and Management of Skin and Soft Tissue Infections: 2014 Update by IDSA. Clin Infect Dis. 2014;59(2):e10-52.',
  },
  {
    num: 4,
    text: 'Hakkarainen TW, et al. Necrotizing soft tissue infections: review and current concepts in treatment, systems of care, and outcomes. Curr Probl Surg. 2014;51(8):344-362.',
  },
  {
    num: 5,
    text: 'Wong CH, et al. The LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis) score: a tool for distinguishing necrotizing fasciitis from other soft tissue infections. Crit Care Med. 2004;32(7):1535-41.',
  },
  {
    num: 6,
    text: 'Zacharias N, et al. Diagnosis of necrotizing soft tissue infections by computed tomography. Arch Surg. 2010;145(5):452-455.',
  },
  {
    num: 7,
    text: 'Evans L, et al. Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021. Crit Care Med. 2021;49(11):e1063-e1143.',
  },
  {
    num: 8,
    text: 'Chennamsetty A, et al. Contemporary diagnosis and management of Fournier gangrene. Ther Adv Urol. 2015;7(4):203-215.',
  },
  {
    num: 9,
    text: 'Gunaratne DA, et al. Cervical necrotizing fasciitis: systematic review and analysis of 1235 reported cases from the literature. Head Neck. 2018;40(9):2094-2102.',
  },
  {
    num: 10,
    text: 'Sartelli M, et al. 2018 WSES/SIS-E consensus conference: recommendations for the management of skin and soft-tissue infections. World J Emerg Surg. 2018;13:58.',
  },
  {
    num: 11,
    text: 'Horseman MA, Surani S. A comprehensive review of Vibrio vulnificus: an important cause of severe sepsis and skin and soft-tissue infection. Int J Infect Dis. 2011;15(3):e157-166.',
  },
  {
    num: 12,
    text: 'Parks T, et al. Systematic review: intravenous immunoglobulin for streptococcal toxic shock syndrome. Clin Infect Dis. 2018;67(9):1434-1436.',
  },
  {
    num: 13,
    text: 'Levett D, et al. Systematic review of adjunctive hyperbaric oxygen therapy for necrotising fasciitis. Diving Hyperb Med. 2015;45(3):139-145.',
  },
];
