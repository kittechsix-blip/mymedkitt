export const TRAVELER_INFECTIONS_MODULE_LABELS = [
    'Initial Assessment & Triage',
    'Fever Workup',
    'GI Symptoms',
    'Rash & Dermatologic',
    'Respiratory & Neurologic',
    'Treatment & Disposition',
];
export const TRAVELER_INFECTIONS_CITATIONS = [
    {
        num: 1,
        text: 'CDC Yellow Book 2026. Post-Travel Evaluation of the Ill Traveler. https://www.cdc.gov/yellow-book/hcp/post-travel-evaluation/post-travel-evaluation-of-the-ill-traveler.html',
    },
    {
        num: 2,
        text: 'CDC. Fever in the Returned Traveler. Yellow Book 2024. https://wwwnc.cdc.gov/travel/yellowbook/2024/posttravel-evaluation/fever-in-the-returned-traveler',
    },
    {
        num: 3,
        text: 'CDC. Malaria Diagnostic Tests & Treatment. https://www.cdc.gov/malaria/hcp/diagnosis-testing/malaria-diagnostic-tests.html',
    },
    {
        num: 4,
        text: 'CDC. Typhoid and Paratyphoid Fever. https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/typhoid-and-paratyphoid-fever.html',
    },
    {
        num: 5,
        text: 'CDC. Rickettsial Diseases 2026. https://www.ncbi.nlm.nih.gov/books/NBK620978/',
    },
    {
        num: 6,
        text: 'CDC. Travelers\' Diarrhea. https://www.cdc.gov/yellow-book/hcp/preparing-international-travelers/travelers-diarrhea.html',
    },
    {
        num: 7,
        text: 'AAFP. The Ill Returning Traveler. Am Fam Physician. 2023;108(4):369-377. https://www.aafp.org/pubs/afp/issues/2023/1000/ill-returning-traveler.html',
    },
    {
        num: 8,
        text: 'Emergency Medicine Cases. Fever in the Returning Traveler. https://emergencymedicinecases.com/fever-returning-traveler/',
    },
    {
        num: 9,
        text: 'CDC. Dengue, Chikungunya, Zika - Yellow Book 2026. https://www.cdc.gov/yellow-book/hcp/travel-associated-infections-diseases/chikungunya.html',
    },
    {
        num: 10,
        text: 'CDC. Measles Cases and Outbreaks 2026. https://www.cdc.gov/measles/data-research/index.html',
    },
];
export const TRAVELER_INFECTIONS_CRITICAL_ACTIONS = [
    { text: 'STAT malaria testing for all fevers from endemic areas (thick/thin smears + RDT)', nodeId: 'ti-malaria-screen' },
    { text: 'Isolate immediately if respiratory symptoms, hemorrhage, or rash + fever', nodeId: 'ti-start' },
    { text: 'Start doxycycline 100mg BID immediately if eschar present (rickettsial infection)', nodeId: 'ti-fever-eschar' },
    { text: 'Calculate incubation period (days since return + symptom onset) to narrow DDx', nodeId: 'ti-fever-incubation' },
    { text: 'Check for thrombocytopenia - suggests dengue, malaria, or hemorrhagic fever', nodeId: 'ti-fever-labs' },
    { text: 'Blood cultures before antibiotics for suspected typhoid or enteric fever', nodeId: 'ti-fever-enteric' },
    { text: 'Admit any P. falciparum malaria to ICU - call CDC Malaria Hotline', nodeId: 'ti-disposition-admit' },
    { text: 'Stool studies for all persistent diarrhea (culture, O&P, C. diff if recent travel)', nodeId: 'ti-gi-persistent' },
];
export const TRAVELER_INFECTIONS_NODES = [
    {
        id: 'ti-start',
        type: 'question',
        module: 0,
        title: 'Returned International Traveler',
        body: `# Initial Assessment & Triage

**Critical First Steps:**
1. **Isolate if indicated** (respiratory symptoms, hemorrhage, rash)
2. **Travel history** - countries, dates, return date (calculate incubation period)
3. **Presenting syndrome** - fever, diarrhea, rash, respiratory, neurologic

**When to Suspect Travel-Related Illness:**
- Fever within 1 year of travel from malaria-endemic area
- Systemic symptoms within 2-6 weeks of return
- GI symptoms after international travel
- Rash + fever + recent travel

**Immediate Concerns (Don't Miss):**
- Malaria (medical emergency)
- Typhoid/enteric fever
- Rickettsial infections
- Meningococcal disease
- Dengue (severe)
- Viral hemorrhagic fever (rare)`,
        options: [
            {
                label: 'Fever / Systemic Symptoms',
                next: 'ti-fever-initial',
            },
            {
                label: 'Diarrhea / GI Symptoms',
                next: 'ti-gi-initial',
            },
            {
                label: 'Rash',
                next: 'ti-rash-initial',
            },
            {
                label: 'Respiratory Symptoms',
                next: 'ti-resp-initial',
            },
            {
                label: 'Neurologic Symptoms',
                next: 'ti-neuro-initial',
            },
        ],
        citation: [1, 2],
        summary: 'Isolate if respiratory/hemorrhage/rash; calculate incubation period; determine presenting syndrome',
    },
    // ==================== FEVER MODULE ====================
    {
        id: 'ti-fever-initial',
        type: 'question',
        module: 1,
        title: 'Fever in Returned Traveler',
        body: `# Fever Workup - Initial Triage

**Isolation Precautions:**
- Hemorrhagic symptoms → contact + droplet precautions
- Respiratory symptoms → droplet precautions
- Suspected measles → airborne (AIIR, N95)

**Critical History:**
- Travel regions (see toolbar: Geographic Risk)
- **Incubation period** (symptom onset vs return date)
  - <10 days: dengue, chikungunya, plague, COVID
  - 10-14 days: malaria, typhoid, leptospirosis
  - >2 weeks: hepatitis, parasites, TB
- Malaria prophylaxis (drug, compliance, post-travel continuation)
- Exposures: mosquitoes, ticks, animals, freshwater, flood water, unpasteurized dairy
- Vaccines received

**Physical Exam Red Flags:**
- Eschar → rickettsial infection (start doxycycline immediately)
- Hepatosplenomegaly → malaria, typhoid, hepatitis
- Jaundice → malaria, hepatitis, leptospirosis
- Petechiae/purpura → hemorrhagic fever, meningococcal`,
        options: [
            {
                label: 'From Malaria-Endemic Area',
                next: 'ti-malaria-screen',
            },
            {
                label: 'Not from Malaria-Endemic Area',
                next: 'ti-fever-syndrome',
            },
        ],
        citation: [1, 2],
        summary: 'Incubation period narrows DDx; eschar = start doxycycline immediately; hepatosplenomegaly = malaria/typhoid',
    },
    {
        id: 'ti-malaria-screen',
        type: 'question',
        module: 1,
        title: 'Malaria Screening',
        body: `# Malaria Testing - STAT Priority

**All travelers from malaria-endemic areas with fever:**

**Testing:**
1. **Thick & thin blood smears** (gold standard)
   - Thick: detects parasites
   - Thin: species ID, quantification
   - **Repeat q12-24h x3** if negative before ruling out
2. **Rapid Diagnostic Test (RDT)** - BinaxNOW Malaria
   - Sensitivity 97% vs 85% for smear
   - 100% sensitive for *P. falciparum*
   - **Must be concurrent with blood smear** (not replacement)

**CDC Malaria Hotline (24/7):**
- Business hours: **770-488-7788** or **855-856-4713**
- After hours: **770-488-7100** (CDC EOC, ask for Malaria Branch)

**Urgency:**
- *P. falciparum* malaria = medical emergency
- Clinical deterioration within 24-36 hours possible
- Low threshold for admission

**Link to Full Malaria Consult:**
See separate comprehensive malaria consult for detailed diagnosis & treatment.`,
        options: [
            {
                label: 'Malaria Testing Ordered → Continue Workup',
                next: 'ti-fever-syndrome',
            },
        ],
        citation: [3],
        summary: 'STAT thick/thin smears + RDT, repeat q12-24h x3 if negative — P. falciparum = medical emergency',
        safetyLevel: 'critical',
    },
    {
        id: 'ti-fever-syndrome',
        type: 'question',
        module: 1,
        title: 'Fever Syndrome Classification',
        body: `# Classify Fever Syndrome

**Use toolbar calculators:**
- **Geographic Risk** - destination → endemic diseases
- **Incubation Calculator** - symptom onset vs return
- **Syndrome DDx** - fever + region → likely diagnoses

**Key Syndrome Patterns:**
1. **Fever + Thrombocytopenia** → dengue, malaria, rickettsial
2. **Fever + Hepatosplenomegaly** → malaria, typhoid, hepatitis
3. **Fever + Jaundice** → malaria, hepatitis, leptospirosis
4. **Fever + Eschar** → rickettsial (start doxycycline immediately)
5. **Fever + Relative Bradycardia** → typhoid
6. **Fever + Arthralgia** → chikungunya, dengue

**Common Non-Exotic Causes:**
- Respiratory infections (COVID, influenza, pneumonia)
- UTI/pyelonephritis
- Skin/soft tissue infections`,
        options: [
            {
                label: 'Dengue / Arboviral Syndrome',
                next: 'ti-dengue',
            },
            {
                label: 'Typhoid / Enteric Fever',
                next: 'ti-typhoid',
            },
            {
                label: 'Rickettsial Infection',
                next: 'ti-rickettsial',
            },
            {
                label: 'Leptospirosis',
                next: 'ti-leptospirosis',
            },
            {
                label: 'Undifferentiated Fever → Full Workup',
                next: 'ti-fever-workup',
            },
        ],
        citation: [2, 7, 8],
        summary: 'Classify by syndrome pattern — thrombocytopenia, hepatosplenomegaly, jaundice, eschar, relative bradycardia',
    },
    {
        id: 'ti-dengue',
        type: 'result',
        module: 1,
        title: 'Dengue / Arboviral Syndrome',
        body: `# Dengue, Chikungunya, Zika

**Clinical Presentation:**
- **Dengue**: High fever, severe headache/retro-orbital pain, myalgia ("breakbone fever"), morbilliform rash, thrombocytopenia (pronounced)
- **Chikungunya**: Similar to dengue + severe arthritis/arthralgia (can persist months)
- **Zika**: Mild, maculopapular rash, conjunctivitis, low-grade fever

**Key Point:** No clinical features reliably distinguish these - requires lab testing

**Testing:**
- **<7 days from onset**: RT-PCR (optimal)
- **Concurrent serology**: IgM antibody
- **Dengue rapid antigen test**: also reliable
- **Send for chikungunya & Zika PCR/serology** if endemic region

**ED Management:**
- **NO ASPIRIN, NO NSAIDs** (hemorrhage risk)
- **Acetaminophen/paracetamol only** for fever/pain
- **Fluid management** - monitor for plasma leakage (dengue shock syndrome)
- **Monitor for warning signs**: persistent vomiting, abdominal pain/tenderness, bleeding, restlessness

**Admission Criteria:**
- Severe thrombocytopenia
- Hemorrhagic manifestations
- Shock/hypotension
- Organ dysfunction
- Persistent vomiting, abdominal pain/tenderness

**Outpatient if:**
- Stable vitals
- Platelet count adequate
- Tolerating PO fluids
- Reliable for 24-48hr follow-up
- **Return precautions**: bleeding, persistent vomiting, abdominal pain, confusion

**2026 Outbreaks:**
- Latin America: Colombia, Cuba, Nicaragua, Puerto Rico, American Samoa
- Asia: Samoa, Philippines, Vietnam
- Chikungunya: Cuba, Suriname, Bolivia`,
        citation: [9],
    },
    {
        id: 'ti-typhoid',
        type: 'result',
        module: 1,
        title: 'Typhoid / Enteric Fever',
        body: `# Typhoid & Paratyphoid Fever

**Clinical Presentation:**
- Incubation: **7-21 days** (most often 1 week)
- Fever (may be step-wise)
- Headache, myalgia
- **Relative bradycardia** (pulse-temperature dissociation)
- Diarrhea OR constipation
- Rose spots (faint salmon-colored rash on trunk) - rare
- Hepatosplenomegaly

**Workup:**
- **Blood culture x2** (before antibiotics)
  - Sensitivity: 40-80%
- Bone marrow culture (80% sensitive, remains positive despite antibiotics) - if high suspicion
- Stool/urine culture (less sensitive)
- CBC: leukopenia common
- Elevated transaminases

**Empiric Treatment (After Blood Cultures):**

**Most Regions:**
- **Ceftriaxone 2g IV daily** (first-line)
- **Azithromycin 1g PO day 1, then 500mg daily x 6 days** (alternative for uncomplicated)

**Iraq/Pakistan Travelers:**
- **Ceftriaxone resistance common** in these regions
- Uncomplicated: **Azithromycin**
- Complicated: **Carbapenem** (meropenem, ertapenem)

**DO NOT use fluoroquinolones empirically** - widespread resistance

**Importance:**
- Untreated case fatality: 10-30%
- Early antibiotics reduce to <1%

**Disposition:**
- Admit if severe symptoms, complications, or diagnostic uncertainty
- Outpatient azithromycin if mild, reliable for follow-up, blood cultures drawn`,
        citation: [4],
    },
    {
        id: 'ti-rickettsial',
        type: 'result',
        module: 1,
        title: 'Rickettsial Infections',
        body: `# Rickettsial Infections

**Clinical Presentation:**
- Incubation: 5-10 days
- Fever, headache, myalgia
- **Eschar** (pathognomonic - painless black necrotic lesion at bite site)
- Maculopapular rash (may be absent early)
- Lymphadenopathy
- Travel: Sub-Saharan Africa (tick bite fever), Asia (scrub typhus)

**Eschar Locations:**
- African tick bite fever: trunk, legs, groin
- Scrub typhus: axilla, groin, genitals

**DO NOT WAIT FOR SEROLOGY:**
- Clinical diagnosis (eschar + fever + travel)
- **Start doxycycline immediately**
- Case fatality 20-40% if treatment delayed
- Excellent outcomes if started within first week

**Treatment:**
- **Doxycycline 100mg PO/IV BID x 7-10 days**
- Start in ED before admission

**Testing (Don't Delay Treatment):**
- Serology (IFA) - paired acute/convalescent
- PCR (eschar swab, blood) if available

**Disposition:**
- Admit if severe symptoms
- Outpatient doxycycline if mild, reliable follow-up
- Most cases respond rapidly to treatment`,
        citation: [5],
    },
    {
        id: 'ti-leptospirosis',
        type: 'result',
        module: 1,
        title: 'Leptospirosis',
        body: `# Leptospirosis

**Exposure History:**
- **Freshwater exposure** (swimming, wading, kayaking)
- **Flood water contact** (post-flooding outbreaks)
- Rodent urine contamination
- Occupational (farmers, sewer workers)
- Regions: **Hawaii, Puerto Rico, USVI, Florida** (US), Asia, Latin America

**Clinical Presentation:**
- Incubation: 2-30 days (usually 5-14 days)
- **Biphasic illness:**
  - Phase 1 (leptospiremic): fever, headache, myalgia (esp. calves), conjunctival injection
  - Phase 2 (immune): aseptic meningitis, uveitis, rash
- **Weil's disease** (severe): jaundice, renal failure, pulmonary hemorrhage, high mortality

**Physical Exam:**
- Conjunctival injection (suffusion) - nonpurulent
- Jaundice
- Hepatosplenomegaly
- Muscle tenderness (calves)

**Workup:**
- CBC: thrombocytopenia, leukocytosis
- CMP: elevated creatinine, bilirubin, transaminases
- CPK: elevated (rhabdomyolysis)
- Urinalysis: hematuria, proteinuria
- PCR (acute phase <7 days)
- Serology (MAT - microscopic agglutination test)
- Culture (blood, CSF, urine)

**Treatment:**

**Mild Disease:**
- **Doxycycline 100mg PO BID x 7 days**
- Alternatives: amoxicillin, azithromycin

**Severe Disease (Weil's):**
- **Penicillin G 1.5 million units IV q6h**
- Alternatives: ceftriaxone, cefotaxime
- Supportive: dialysis, mechanical ventilation as needed

**Disposition:**
- Admit if severe disease, renal/liver dysfunction, pulmonary symptoms
- Outpatient doxycycline if mild

**2026 Alert:**
- Hawaii: health alert after March flooding
- Philippines: 3,037 cases January-July 2025 (monsoon)`,
        citation: [1, 2],
    },
    {
        id: 'ti-fever-workup',
        type: 'result',
        module: 1,
        title: 'Undifferentiated Fever Workup',
        body: `# Comprehensive Fever Workup

**Initial Labs (All Patients):**
- **CBC with differential**
  - Thrombocytopenia: dengue, malaria, rickettsial
  - Leukopenia: dengue, typhoid, viral
  - Leukocytosis: bacterial infections
  - Eosinophilia: helminths (not acute phase)
- **CMP**
  - Elevated transaminases: hepatitis, dengue, malaria, typhoid
  - Elevated creatinine: malaria, leptospirosis
  - Elevated bilirubin: malaria, hepatitis, leptospirosis
- **Blood cultures x2** (before antibiotics)
- **Urinalysis**
- **Malaria testing** (thick/thin smears + RDT) if from endemic area

**Syndrome-Specific:**
- **Dengue/arboviral PCR & serology** (if <7 days onset + Asia/Latin America)
- **Lumbar puncture** (if meningismus, altered mental status)
- **Hepatitis panel** (if jaundice, elevated transaminases)
- **Rickettsial serology** (if eschar, appropriate exposure)
- **Leptospirosis PCR/serology** (if freshwater/flood exposure)
- **Chest X-ray** (if respiratory symptoms)
- **Blood film for parasites** (eosinophilia)

**Empiric Treatment Considerations:**
- **Don't start antibiotics blindly** unless septic/unstable
- **Get blood cultures first**
- If empiric treatment needed → broad-spectrum (ceftriaxone + doxycycline covers typhoid + rickettsial)

**Admission Criteria:**
- Hemodynamic instability
- Altered mental status
- Acute respiratory distress
- Suspected/confirmed malaria
- Severe lab abnormalities
- **Undiagnosed undifferentiated fever** (low threshold for admission)

**Consult Infectious Disease:**
- All admitted patients
- Complex diagnostic uncertainty
- Need for specialized testing

**Outpatient Management:**
- Stable vitals
- Malaria ruled out
- No severe lab abnormalities
- **ID follow-up within 24-48 hours** (arrange before discharge)
- Clear return precautions

**Common Non-Exotic Diagnoses:**
- Don't overlook: pneumonia, UTI, influenza, COVID-19
- >25% of cases: no specific cause found (reasonable to suspend workup if symptoms resolve)`,
        citation: [1, 2, 7, 8],
    },
    // ==================== GI MODULE ====================
    {
        id: 'ti-gi-initial',
        type: 'question',
        module: 2,
        title: 'GI Symptoms',
        body: `# Diarrhea in Returned Traveler

**Duration Assessment:**
- **Acute (<2 weeks)**: bacterial/viral most common
- **Persistent (>2 weeks)**: parasites more likely

**Severity Red Flags:**
- Fever + bloody stools (dysentery)
- Severe dehydration (cholera)
- Fever + diarrhea/constipation (typhoid)
- Persistent vomiting
- Hemodynamic instability

**Most Common Causes:**
- **Traveler's diarrhea** (usually self-limited)
- Bacterial: ETEC, *Campylobacter*, *Salmonella*, *Shigella*
- Viral: norovirus, rotavirus
- Parasitic: *Giardia*, *Cryptosporidium*, *E. histolytica*`,
        options: [
            {
                label: 'Acute Diarrhea (<2 weeks)',
                next: 'ti-acute-diarrhea',
            },
            {
                label: 'Persistent Diarrhea (>2 weeks)',
                next: 'ti-persistent-diarrhea',
            },
            {
                label: 'Dysentery (Bloody Stools + Fever)',
                next: 'ti-dysentery',
            },
            {
                label: 'Severe Dehydration / Cholera',
                next: 'ti-cholera',
            },
        ],
        citation: [6],
        summary: 'Acute <2wk = bacterial/viral, persistent >2wk = parasites; red flags: fever + bloody stools, severe dehydration',
    },
    {
        id: 'ti-acute-diarrhea',
        type: 'result',
        module: 2,
        title: 'Acute Traveler\'s Diarrhea',
        body: `# Acute Diarrhea (<2 weeks)

**Testing:**
- **Stool culture** (bacterial pathogens)
- ***Giardia* & *Cryptosporidium* antigen testing**
- Consider stool PCR panel if available
- **If fever or bloody stools → more extensive workup**

**Treatment:**

**Mild (No Fever, No Blood):**
- **Hydration** (oral rehydration solution)
- **Loperamide** (if no fever, no bloody stools)
  - 4mg initial, then 2mg after each loose stool (max 16mg/day)
- **Consider antibiotics** if moderate-severe symptoms

**Moderate-Severe:**
- **Azithromycin** (first-line)
  - 1000mg single dose OR
  - 500mg daily x 3 days
- Alternatives: fluoroquinolone (if from area without resistance)

**Specific Pathogens:**

***Giardia*:**
- Metronidazole 250mg PO TID x 5-7 days
- Alternatives: tinidazole (single dose), nitazoxanide

***Cryptosporidium*:**
- Usually self-limited in immunocompetent
- Nitazoxanide if severe or immunocompromised

**Disposition:**
- **Admit if:** severe dehydration, hemodynamic instability, unable to tolerate PO
- **Outpatient if:** mild-moderate, tolerating PO fluids, reliable follow-up
- Return precautions: worsening symptoms, unable to hydrate, bloody stools, high fever`,
        citation: [6],
    },
    {
        id: 'ti-persistent-diarrhea',
        type: 'result',
        module: 2,
        title: 'Persistent Diarrhea',
        body: `# Persistent Diarrhea (>2 weeks)

**Parasites Most Likely:**
- ***Giardia duodenalis*** (most common)
- ***Cryptosporidium***
- ***Entamoeba histolytica***
- Rare: *Cystoisospora*, *Dientamoeba fragilis*, *Microsporidia*, *Cyclospora*

**Testing:**
- **Serial stool specimens** (3+ over different days) for ova & parasites
- **Acid-fast staining** for *Cryptosporidium*, *Cyclospora*, *Cystoisospora*
- ***Giardia* antigen test** (more sensitive than O&P)
- **Stool PCR panel** if available
- Consider **sigmoidoscopy** for *E. histolytica* if dysentery

**Treatment:**

***Giardia*:**
- **Metronidazole 250mg PO TID x 5-7 days**
- Alternatives: tinidazole 2g single dose, nitazoxanide

***Cryptosporidium*:**
- **Nitazoxanide** if severe
- Usually self-limited in immunocompetent

***E. histolytica* (Amebiasis):**
- **Metronidazole 750mg PO TID x 7-10 days**
- **PLUS luminal agent** (paromomycin or iodoquinol) to eradicate cysts

**Post-Infectious IBS:**
- Consider if testing negative but symptoms persist
- Supportive management

**Disposition:**
- Most can be managed outpatient with stool testing & empiric treatment
- **Admit if:** severe symptoms, dehydration, bloody stools, concern for invasive disease
- Arrange **GI or ID follow-up** for persistent symptoms`,
        citation: [6],
    },
    {
        id: 'ti-dysentery',
        type: 'result',
        module: 2,
        title: 'Dysentery',
        body: `# Dysentery (Bloody Diarrhea + Fever)

**Causes:**
- ***Shigella*** (most common bacterial)
- ***Campylobacter***
- ***Salmonella***
- ***E. histolytica*** (amebiasis)
- ***E. coli*** O157:H7 (STEC)

**Workup:**
- **Stool culture**
- **Stool O&P** (x3 for *E. histolytica*)
- **Stool PCR panel**
- **Consider sigmoidoscopy** if high suspicion for amebiasis (flask-shaped ulcers)
- CBC, CMP (assess severity)

**Treatment:**

**Empiric (Before Culture Results):**
- **Azithromycin 500mg PO daily x 3 days**
- **IV fluids** as needed
- **Avoid antimotility agents** (loperamide)

**If *Shigella* confirmed:**
- Azithromycin (fluoroquinolone resistance common)

**If *E. histolytica* confirmed:**
- **Metronidazole 750mg PO TID x 7-10 days**
- **PLUS luminal agent** (paromomycin or iodoquinol)

**If STEC/E. coli O157:H7:**
- **Supportive care only** (antibiotics may increase HUS risk)
- Monitor for HUS (hemolytic uremic syndrome)

**Disposition:**
- **Admit** for severe dysentery, dehydration, hemodynamic instability
- **Outpatient** if mild, tolerating PO, reliable follow-up`,
        citation: [6],
    },
    {
        id: 'ti-cholera',
        type: 'result',
        module: 2,
        title: 'Cholera / Severe Dehydration',
        body: `# Cholera & Severe Volume Depletion

**Clinical Presentation:**
- **Profuse watery diarrhea** ("rice-water stools")
- **Massive fluid losses** (up to 1L/hour)
- Rapid progression to severe dehydration, shock
- Vomiting
- Muscle cramps
- Incubation: hours to 5 days

**High-Risk Travel:**
- Haiti, sub-Saharan Africa, South Asia
- Areas with poor sanitation, recent natural disasters

**Assessment:**
- **Vital signs** (tachycardia, hypotension)
- **Signs of severe dehydration:**
  - Sunken eyes
  - Decreased skin turgor
  - Dry mucous membranes
  - Altered mental status
  - Decreased urine output

**Treatment:**

**Cornerstone: Aggressive IV Fluid Resuscitation**
- **Ringer's lactate** or normal saline
- **Initial bolus**: 30mL/kg over 30 minutes (adults)
- Continue aggressive fluids to match ongoing losses
- **Monitor:** vitals, urine output, weight

**Antibiotics (Shorten Illness):**
- **Doxycycline 300mg single dose** OR
- **Azithromycin 1g single dose**
- Reduces duration from 5-7 days to 2-3 days

**Disposition:**
- **Admit** for IV fluid resuscitation
- **ICU** if hemodynamically unstable
- **Public health notification**

**Key Point:**
- Antibiotics are adjunctive - **aggressive fluids are cornerstone of treatment**
- With proper rehydration, mortality <1%`,
        citation: [6],
    },
    // ==================== RASH MODULE ====================
    {
        id: 'ti-rash-initial',
        type: 'question',
        module: 3,
        title: 'Rash & Dermatologic',
        body: `# Rash in Returned Traveler

**Rash + Fever Syndromes:**
- **Dengue**: morbilliform, thrombocytopenia
- **Chikungunya**: similar rash, severe arthritis
- **Zika**: maculopapular, conjunctivitis, mild
- **Measles**: morbilliform, Koplik spots, airborne
- **Rickettsial**: eschar + rash
- **Meningococcal**: petechiae/purpura (medical emergency)

**Key Point:**
- No clinical features reliably distinguish dengue, chikungunya, Zika - requires lab testing

**Rash Characterization:**
- **Maculopapular**: dengue, chikungunya, Zika, measles, rickettsial
- **Petechiae/purpura**: meningococcal, hemorrhagic fever, thrombocytopenia
- **Vesicular**: varicella, monkeypox
- **Eschar**: rickettsial (pathognomonic)`,
        options: [
            {
                label: 'Maculopapular Rash + Fever',
                next: 'ti-maculopapular',
            },
            {
                label: 'Petechiae / Purpura',
                next: 'ti-petechiae',
            },
            {
                label: 'Eschar (Black Necrotic Lesion)',
                next: 'ti-rickettsial',
            },
            {
                label: 'Suspected Measles',
                next: 'ti-measles',
            },
        ],
        citation: [1, 2],
        summary: 'Classify rash: maculopapular, petechiae/purpura, eschar, vesicular — measles needs airborne precautions',
    },
    {
        id: 'ti-maculopapular',
        type: 'result',
        module: 3,
        title: 'Maculopapular Rash',
        body: `# Maculopapular Rash + Fever

**Differential:**
- **Dengue**: breakbone fever, severe myalgia, thrombocytopenia
- **Chikungunya**: severe arthritis/arthralgia (persists months)
- **Zika**: mild fever, conjunctivitis, arthralgia
- **Measles**: Koplik spots, cough, coryza, conjunctivitis
- **Rickettsial**: check for eschar

**Cannot Distinguish Clinically → Lab Testing Required**

**Testing:**
- **CBC**: thrombocytopenia (dengue)
- **Dengue PCR & serology** (if <7 days onset)
- **Chikungunya PCR & serology**
- **Zika PCR & serology**
- **Measles PCR** (if suspected)

**Associated Features:**

**Dengue:**
- Pronounced thrombocytopenia
- Retro-orbital pain
- No prominent arthritis

**Chikungunya:**
- Severe arthritis (multiple joints, symmetric)
- Arthralgia can persist months to years
- Less severe thrombocytopenia than dengue

**Zika:**
- Generally mild/subclinical
- Conjunctivitis (nonpurulent)
- Pregnancy concern (microcephaly)

**Management:**
- **NO ASPIRIN, NO NSAIDs** until dengue ruled out
- **Acetaminophen only** for fever/pain
- Monitor for dengue warning signs (see Dengue section)

**Disposition:**
- Admit if severe dengue, hemorrhagic manifestations, shock
- Outpatient if stable, tolerating PO, reliable follow-up`,
        citation: [9],
    },
    {
        id: 'ti-petechiae',
        type: 'result',
        module: 3,
        title: 'Petechiae / Purpura',
        body: `# Petechiae / Purpura

**Life-Threatening Causes (Don't Miss):**
- **Meningococcal disease** (medical emergency)
- **Viral hemorrhagic fevers** (rare, high mortality)
- **Severe dengue** (dengue hemorrhagic fever)
- **Severe malaria** (*P. falciparum*)

**Workup:**
- **CBC**: thrombocytopenia
- **Coagulation studies**: PT, PTT, fibrinogen, D-dimer (DIC)
- **Blood cultures x2** (before antibiotics)
- **Malaria testing** if from endemic area
- **Lumbar puncture** (if meningismus, after blood cultures)

**Meningococcal Disease:**

**Clinical Features:**
- Petechial/purpuric rash (rapidly progressive)
- Fever, headache
- Meningismus (may be absent early)
- Hemodynamic instability
- Travel: Africa meningitis belt, Hajj pilgrims

**Emergency Protocol:**
1. **Blood cultures immediately**
2. **LP for CSF** (if no contraindications)
3. **Don't delay antibiotics** if LP delayed
4. **Empiric treatment:**
   - **Ceftriaxone 2g IV** OR
   - **Cefotaxime 2g IV**

**Isolation:**
- **Droplet precautions**
- **Notify public health** (contacts need prophylaxis)

**Viral Hemorrhagic Fever (Rare):**
- **Immediate isolation** (contact + droplet precautions)
- **Notify infection control, public health, CDC**
- Supportive care (no specific treatment)
- High mortality

**Disposition:**
- **Immediate admission** for all petechiae/purpura + fever
- **ICU** if hemodynamically unstable`,
        citation: [1, 2],
    },
    {
        id: 'ti-measles',
        type: 'result',
        module: 3,
        title: 'Measles',
        body: `# Measles

**2026 Alert:**
- **1,671 confirmed US cases** (highest since elimination in 2000)
- Most cases: unvaccinated US residents infected during international travel
- Highly contagious (airborne transmission)

**Clinical Presentation:**
- **3 C's**: Cough, Coryza, Conjunctivitis
- High fever
- **Koplik spots** (white spots on buccal mucosa) - pathognomonic, appear 2-3 days before rash
- **Morbilliform rash** (starts face/hairline, spreads cephalocaudal)
- Incubation: 10-14 days

**Isolation - CRITICAL:**
- **Airborne precautions** immediately
- **AIIR room (negative pressure)**
- **N95 respirator** for all staff
- **Duration: 4 days after rash onset** (Day 0 = rash onset)

**Testing:**
- **Measles PCR** (nasopharyngeal swab, urine)
- **Measles IgM serology**
- **Notify public health immediately** (contact tracing)

**Treatment:**
- **Supportive care**
- **Vitamin A supplementation** (especially children)
  - Age 6-11 months: 100,000 IU x 2 doses
  - Age ≥12 months: 200,000 IU x 2 doses
  - Give on days 1 and 2

**Complications:**
- Pneumonia (most common cause of death)
- Encephalitis
- Subacute sclerosing panencephalitis (SSPE) - rare, late complication

**Post-Exposure Prophylaxis (PEP):**
- **Unvaccinated contacts:**
  - MMR vaccine within 72 hours of exposure OR
  - Immune globulin within 6 days (if vaccine contraindicated)

**Disposition:**
- **Admit** if complications, severe disease, unable to isolate at home
- **Outpatient** if mild, reliable isolation at home
- **Public health coordination** for contact tracing`,
        citation: [10],
    },
    // ==================== RESPIRATORY/NEURO MODULE ====================
    {
        id: 'ti-resp-initial',
        type: 'question',
        module: 4,
        title: 'Respiratory Symptoms',
        body: `# Respiratory Symptoms

**Isolation Precautions:**
- **Respiratory distress + travel → airborne precautions immediately**
- **AIIR room, N95 respirator**
- Rule out: MERS, avian flu, TB, measles

**Region-Specific Concerns:**
- **Middle East**: MERS-CoV (camel/healthcare contact)
- **Asia**: Avian influenza (H5N1, H7N9), TB
- **Any region**: COVID-19 variants, influenza, pneumonia

**Common Diagnoses:**
- COVID-19, influenza
- Community-acquired pneumonia
- Bronchitis
- Exacerbation of underlying lung disease`,
        options: [
            {
                label: 'Suspected MERS / Avian Flu',
                next: 'ti-mers-avian',
            },
            {
                label: 'Suspected TB',
                next: 'ti-tb',
            },
            {
                label: 'Community-Acquired Pneumonia',
                next: 'ti-cap',
            },
        ],
        citation: [1, 2],
        summary: 'Respiratory distress + travel = airborne precautions immediately; rule out MERS, avian flu, TB, measles',
    },
    {
        id: 'ti-mers-avian',
        type: 'result',
        module: 4,
        title: 'MERS / Avian Influenza',
        body: `# MERS-CoV & Avian Influenza

**MERS-CoV (Middle East Respiratory Syndrome):**

**Epidemiology:**
- Travel to Arabian Peninsula
- **Camel contact** (exposure to camels or camel products)
- **Healthcare exposure** (hospitals in Middle East)

**Clinical:**
- Fever, cough, dyspnea
- Rapidly progressive pneumonia
- High mortality (30-40%)

**Testing:**
- **Lower respiratory specimen** (sputum, BAL) - preferred
- **MERS-CoV PCR**
- Chest imaging (bilateral infiltrates)

**Avian Influenza (H5N1, H7N9):**

**Epidemiology:**
- Travel to Asia (China, Vietnam, Indonesia)
- **Poultry exposure** (live bird markets, farms)
- **Direct contact with infected birds**

**Clinical:**
- High fever, cough, dyspnea
- Rapidly progressive ARDS
- High mortality (H5N1: ~60%, H7N9: ~40%)

**Testing:**
- **Influenza PCR** (nasopharyngeal swab)
- **Subtyping** if influenza A positive

**COVID-19 Variants (2026):**
- **BA.3.2 "Cicada"** (highly mutated, 23+ countries)
- Test all travelers with respiratory symptoms

**Management (MERS/Avian Flu):**

**Isolation:**
- **Airborne + contact precautions**
- **AIIR room, N95 respirator**

**Treatment:**
- **Supportive care** (oxygen, mechanical ventilation)
- **Oseltamivir** (for avian flu if started early)
- No specific antiviral for MERS

**Notification:**
- **Immediate notification: infection control, public health, CDC**
- Contact tracing

**Disposition:**
- **Immediate admission** (ICU likely)
- High index of suspicion with appropriate travel history`,
        citation: [1],
    },
    {
        id: 'ti-tb',
        type: 'result',
        module: 4,
        title: 'Tuberculosis',
        body: `# Tuberculosis (TB)

**High-Risk Travel:**
- Sub-Saharan Africa
- South Asia (India, Bangladesh, Pakistan)
- Southeast Asia
- Eastern Europe
- Latin America

**Clinical Presentation:**
- Chronic cough (>2-3 weeks)
- Fever, night sweats, weight loss
- Hemoptysis
- **Incubation: weeks to months** (can be years)

**Isolation:**
- **Airborne precautions** immediately
- **AIIR room, N95 respirator**
- **Duration: until 3 negative AFB sputum smears OR diagnosis ruled out**

**Workup:**
- **Chest X-ray**: upper lobe cavitary lesions, hilar adenopathy
- **Sputum AFB smear x3** (early morning specimens)
- **Sputum culture & sensitivity**
- **Nucleic acid amplification test (NAAT)** - rapid
- **IGRA (QuantiFERON, T-SPOT)** - preferred over TST if BCG vaccinated

**Treatment (If High Suspicion):**
- **Consult ID before starting treatment**
- Standard 4-drug regimen: **RIPE**
  - **R**ifampin
  - **I**soniazid
  - **P**yrazinamide
  - **E**thambutol

**Do NOT start empiric TB treatment in ED** unless:
- Critically ill
- High clinical suspicion
- ID consultation obtained

**Disposition:**
- **Admit** for airborne isolation if high suspicion
- **Outpatient** if low suspicion, arrange TB clinic follow-up
- **Public health notification** if confirmed/suspected`,
        citation: [1],
    },
    {
        id: 'ti-cap',
        type: 'result',
        module: 4,
        title: 'Community-Acquired Pneumonia',
        body: `# Community-Acquired Pneumonia

**Remember:**
- Most common cause of respiratory symptoms in travelers
- Don't assume exotic diagnosis without evidence

**Testing:**
- **Chest X-ray**
- **COVID-19 PCR**
- **Influenza PCR**
- **Sputum culture** (if able to produce)
- **Blood cultures** if severe

**Treatment:**
- **Standard CAP treatment:**
  - Outpatient: amoxicillin-clavulanate + azithromycin OR respiratory fluoroquinolone
  - Inpatient: ceftriaxone + azithromycin OR respiratory fluoroquinolone
- **COVID-19 antivirals** if positive (nirmatrelvir-ritonavir, remdesivir)
- **Oseltamivir** if influenza positive

**Disposition:**
- **PSI/CURB-65 score** for admission decision
- Same criteria as non-travelers
- Admit if severe, hypoxia, hemodynamic instability`,
        citation: [1],
    },
    {
        id: 'ti-neuro-initial',
        type: 'question',
        module: 4,
        title: 'Neurologic Symptoms',
        body: `# Neurologic Symptoms

**Life-Threatening Causes:**
- **Cerebral malaria** (*P. falciparum*)
- **Meningococcal meningitis**
- **Rabies** (exposure history critical)
- **Japanese encephalitis**
- **Leptospirosis** (aseptic meningitis)

**Clinical Syndromes:**
- **Meningitis/encephalitis**: fever, headache, meningismus, altered mental status
- **Altered mental status**: cerebral malaria, severe dengue
- **Seizures**: cerebral malaria, meningitis
- **Focal deficits**: stroke, abscess, neurocysticercosis`,
        options: [
            {
                label: 'Meningitis / Encephalitis',
                next: 'ti-meningitis',
            },
            {
                label: 'Cerebral Malaria',
                next: 'ti-cerebral-malaria',
            },
            {
                label: 'Rabies Exposure',
                next: 'ti-rabies',
            },
        ],
        citation: [1, 2],
        summary: 'Cerebral malaria, meningococcal meningitis, rabies, Japanese encephalitis — life-threatening causes first',
        safetyLevel: 'warning',
    },
    {
        id: 'ti-meningitis',
        type: 'result',
        module: 5,
        title: 'Meningitis / Encephalitis',
        body: `# Meningitis & Encephalitis

**High-Risk Travel:**
- **Africa meningitis belt** (Sahel region) - meningococcal
- **Rural Asia** - Japanese encephalitis
- **Any region** - bacterial meningitis

**Emergency Protocol:**

1. **Blood cultures x2** immediately
2. **LP for CSF** (if no contraindications)
   - Cell count, glucose, protein
   - Gram stain, culture
   - PCR (meningococcal, enterovirus, HSV, VZV)
3. **If LP delayed (need imaging) → start antibiotics after blood cultures**
4. **Don't delay antibiotics waiting for LP**

**Empiric Treatment:**
- **Third-generation cephalosporin:**
  - **Ceftriaxone 2g IV** OR
  - **Cefotaxime 2g IV**
- **Add vancomycin** if concern for resistant pneumococcus
- **Add acyclovir** if encephalitis features (altered mental status, seizures, focal deficits)

**Meningococcal Disease:**
- **Droplet precautions**
- **Notify public health** (contacts need prophylaxis)
- Post-MenAfriVac: serogroups C, W, X predominate in Africa

**Japanese Encephalitis:**
- Rural Asia (rice paddies, pig farms)
- Mosquito-borne
- No specific treatment (supportive)
- Prevent with vaccine

**Leptospirosis:**
- Aseptic meningitis pattern
- Freshwater/flood exposure
- Doxycycline or penicillin

**Disposition:**
- **Immediate admission** (ICU likely if altered mental status)
- Neurology/ID consultation`,
        citation: [1, 2],
    },
    {
        id: 'ti-cerebral-malaria',
        type: 'result',
        module: 5,
        title: 'Cerebral Malaria',
        body: `# Cerebral Malaria

***P. falciparum* malaria with CNS involvement - medical emergency**

**Clinical Features:**
- Altered mental status (confusion, obtundation, coma)
- Seizures
- Focal neurologic deficits
- High parasitemia (>5%)
- Fever

**Diagnosis:**
- **Thick & thin blood smears** (STAT)
- **Malaria RDT**
- **Exclude other causes:** LP (after malaria confirmed), head CT

**Treatment:**

**Severe Malaria Protocol:**
1. **IV Artesunate** (first-line, available through CDC)
   - Loading dose: 2.4mg/kg IV at 0, 12, 24 hours
   - Then 2.4mg/kg IV daily until able to take PO
2. **Alternative: IV Quinidine** (if artesunate unavailable)
   - Loading dose: 10mg/kg IV over 1-2 hours
   - Then 0.02mg/kg/min continuous infusion
   - **Cardiac monitoring required**
   - Plus doxycycline or clindamycin

**CDC Malaria Hotline (24/7):**
- Business hours: **770-488-7788** or **855-856-4713**
- After hours: **770-488-7100** (CDC EOC, ask for Malaria Branch)

**Supportive Care:**
- Airway management (intubate if GCS <8)
- Seizure control (benzodiazepines)
- Fluid management (avoid overhydration)
- Monitor glucose (hypoglycemia common)

**Complications:**
- Seizures
- Hypoglycemia
- Acute renal failure
- Pulmonary edema
- Death

**Disposition:**
- **Immediate ICU admission**
- **ID consultation**
- High mortality even with treatment`,
        citation: [3],
    },
    {
        id: 'ti-rabies',
        type: 'result',
        module: 5,
        title: 'Rabies Exposure',
        body: `# Rabies Exposure

**Critical Point: Rabies is 100% fatal once symptomatic**

**Exposure Assessment:**
- **Animal bite or scratch** (dog, bat, monkey, cat)
- **Bat exposure** (even without visible bite - prophylaxis recommended)
- **Mucous membrane contact** with saliva
- Travel to endemic areas (Asia, Africa, Latin America)

**High-Risk Animals:**
- Dogs (most common worldwide)
- Bats (US)
- Monkeys
- Cats
- Foxes, raccoons, skunks

**Post-Exposure Prophylaxis (PEP) - DO NOT DELAY:**

**Previously Unvaccinated:**
1. **Wound care** (thorough washing with soap & water x15 minutes)
2. **Human rabies immune globulin (HRIG)**
   - 20 IU/kg
   - **Infiltrate wound site** (as much as possible)
   - Give remainder IM at distant site from vaccine
3. **Rabies vaccine**
   - 4-dose series: days 0, 3, 7, 14
   - IM (deltoid, NOT gluteal)

**Previously Vaccinated:**
- **No HRIG** needed
- **Rabies vaccine only**: 2 doses (days 0, 3)

**DO NOT WAIT for animal observation or testing**
- Start PEP immediately if high-risk exposure
- Can discontinue if animal tests negative or healthy after 10-day observation

**When to Give PEP:**
- **Definitely:** bat exposure (even without visible bite), unprovoked bite from wild animal, bite from high-risk domestic animal in endemic area
- **Probably:** provoked bite from wild carnivore/bat, bite from high-risk domestic animal
- **Probably not:** bite from low-risk domestic animal that can be observed

**Disposition:**
- **Start PEP in ED** (HRIG + first vaccine dose)
- Arrange follow-up for remaining vaccine doses
- **Public health notification**
- Animal control involvement for observation/testing

**If Symptomatic Rabies (Almost Never Happens):**
- **Always fatal** once symptoms develop
- Supportive care only
- **Strict isolation**`,
        citation: [1],
    },
    // ==================== TREATMENT & DISPOSITION ====================
    {
        id: 'ti-disposition',
        type: 'question',
        module: 5,
        title: 'Treatment & Disposition',
        body: `# Disposition Criteria

**Mandatory Admission:**
- Suspected/confirmed *P. falciparum* malaria
- Meningococcal disease
- Severe dengue (hemorrhage, shock, organ dysfunction)
- Viral hemorrhagic fever (isolation unit)
- Acute respiratory distress
- Hemodynamic instability
- Altered mental status
- Severe leptospirosis (renal/hepatic failure)
- Enteric fever with complications
- Severe dehydration requiring IV fluids

**Low Threshold for Admission:**
- **Undiagnosed undifferentiated systemic febrile illness**
- High fevers with abnormal labs
- Hemorrhagic symptoms
- Thrombocytopenia
- Any patient requiring observation during expedited workup

**Safe Discharge Criteria:**
- Hemodynamically stable
- No evidence of severe disease
- Malaria ruled out (or non-falciparum species, well-appearing)
- Able to tolerate PO fluids/medications
- Reliable for follow-up
- **Infectious disease referral arranged**

**Discharge Instructions:**
- **Return precautions**: fever, bleeding, confusion, persistent vomiting, shortness of breath, inability to tolerate PO
- **Outpatient ID follow-up within 24-48 hours** (arrange before discharge)
- Completion of diagnostic workup as outpatient (stool studies, serology)
- Medication instructions
- Work/school restrictions if needed

**Consultation Requirements:**
- **Infectious disease** for all admitted patients
- **CDC Malaria Hotline** if confirmed/suspected malaria
- **Public health notification**: measles, meningococcal, viral hemorrhagic fever, cholera

**Resources:**
- CDC Yellow Book: https://www.cdc.gov/yellow-book/
- CDC Malaria Hotline: 770-488-7788 (business) or 770-488-7100 (after hours)
- CDC Travel Notices: https://wwwnc.cdc.gov/travel/notices`,
        options: [],
        citation: [1, 2],
        summary: 'Admit all P. falciparum malaria, meningococcal, severe dengue; low threshold for undifferentiated fever',
    },
];
