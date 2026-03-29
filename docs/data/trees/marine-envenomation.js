// MedKitt — Marine Envenomation
// Jellyfish → Fish → Other Marine → Systemic → Disposition
export const MARINE_ENVENOMATION_MODULE_LABELS = [
    'Initial Assessment',
    'Cnidarian (Jellyfish)',
    'Fish Envenomation',
    'Other Marine',
    'Systemic Reactions',
    'Disposition',
];
export const MARINE_ENVENOMATION_CITATIONS = [
    { num: 1, text: 'ANZCOR Guideline 9.4.5 — First Aid Management of Marine Envenomation. Australian & New Zealand Resuscitation Council, 2021.' },
    { num: 2, text: 'Cegolon L, et al. Jellyfish stings and their management: a review. Mar Drugs. 2013;11(2):523-550.' },
    { num: 3, text: 'Lakkis NA, et al. Response of stonefish and other fish envenomation to hot water immersion. Toxicon. 2015;97:32-35.' },
    { num: 4, text: 'Fenner PJ, et al. Fatal and non-fatal jellyfish stings in Australian waters. Med J Aust. 1996;165(11-12):658-661.' },
    { num: 5, text: 'Yanagihara AA, et al. Cubozoan sting-site seawater rinse, scraping, and ice can increase venom load. Toxins. 2017;9(3):105.' },
    { num: 6, text: 'CSL Behring. Box Jellyfish Antivenom Product Information. 2023.' },
    { num: 7, text: 'Nickson CP, et al. Irukandji syndrome. Med J Aust. 2009;191(11-12):625-630.' },
    { num: 8, text: 'Diaz JH. Marine scorpaenidae envenomation in travelers. J Travel Med. 2015;22(4):251-258.' },
    { num: 9, text: 'Clark RF, et al. Stingray envenomation: a retrospective review. J Toxicol Clin Toxicol. 2007;45(2):139-145.' },
    { num: 10, text: 'Isbister GK. Venomous fish stings in tropical northern Australia. Am J Emerg Med. 2001;19(7):561-565.' },
    { num: 11, text: 'Tay TKY, et al. Blue-ringed octopus envenomation: a systematic review. Clin Toxicol. 2021;59(5):375-385.' },
    { num: 12, text: 'Williamson JA. Clinical toxicology of venomous Australasian marine animals. Clin Toxicol. 2015;53(5):463-469.' },
];
export const MARINE_ENVENOMATION_NODES = [
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 0 — Initial Assessment
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'marine-start',
        type: 'question',
        module: 0,
        title: 'Marine Envenomation — Initial Assessment',
        body: `**Immediate Priorities:**
- ABCs — look for anaphylaxis or cardiovascular collapse
- Remove patient from water if still in danger
- Identify creature if possible (geographic clues, wound pattern, symptoms)

**Red Flags Requiring Immediate Intervention:**
- Cardiac arrest or arrhythmias (box jellyfish)
- Respiratory failure or paralysis (blue-ringed octopus, cone snail, sea snake)
- Severe hypertension with impending doom (Irukandji syndrome)
- Penetrating trauma to chest/abdomen/neck (stingray)`,
        citation: [1, 4],
        options: [
            { label: 'Jellyfish / Cnidarian sting', next: 'marine-cnidarian' },
            { label: 'Fish envenomation (stingray, stonefish, lionfish)', next: 'marine-fish' },
            { label: 'Other marine (sea urchin, octopus, cone snail, sea snake)', next: 'marine-other' },
            { label: 'Unknown creature — use symptoms', next: 'marine-toxidrome' },
        ],
        calculatorLinks: [
            { id: 'marine-creature-id', label: 'Creature Identification Tool' },
        ],
    },
    {
        id: 'marine-toxidrome',
        type: 'info',
        module: 0,
        title: 'Toxidrome-Based Identification',
        body: `**Match symptoms to likely creature:**

| Toxidrome | Features | Likely Creature |
|-----------|----------|-----------------|
| **Cardiotoxic** | Arrhythmias, arrest, whip-like marks | Box jellyfish |
| **Catecholamine surge** | HTN, pain, impending doom, delayed onset | Irukandji |
| **Heat-labile pain** | Intense local pain, relieved by hot water | Fish (stingray, stonefish, lionfish) |
| **Paralytic** | Ascending paralysis, respiratory failure | Blue-ringed octopus, cone snail |
| **Myotoxic + Neurotoxic** | Ptosis, rhabdomyolysis, delayed onset | Sea snake |

**Geographic Clues:**
- Tropical Australia (north of Bundaberg): Box jellyfish, Irukandji
- Indo-Pacific: Stonefish, blue-ringed octopus, cone snails
- Caribbean/Florida: Lionfish, Portuguese man-of-war
- Global coastal: Stingrays, sea urchins`,
        citation: [1, 12],
        next: 'marine-start',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 1 — Cnidarian (Jellyfish) Envenomation
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'marine-cnidarian',
        type: 'question',
        module: 1,
        title: 'Cnidarian Envenomation — Species',
        body: `**Jellyfish Classification:**

**Box Jellyfish (Chironex fleckeri):**
- Long visible tentacles (up to 3m), whip-like marks
- Immediate severe pain
- Can cause cardiac arrest within minutes

**Irukandji (Carukia barnesi):**
- Tiny jellyfish, minimal initial sting
- Delayed systemic symptoms 30-120 min later
- Sense of impending doom + hypertension

**Bluebottle / Portuguese Man-of-War (Physalia):**
- Blue tentacles, common worldwide
- Painful but rarely life-threatening
- **Do NOT use vinegar** (causes nematocyst discharge)

**Other Jellyfish:**
- Most cause local pain and dermatitis only
- Rarely life-threatening`,
        citation: [1, 2, 4],
        options: [
            { label: 'Box Jellyfish (tropical Australia)', next: 'marine-box-jelly' },
            { label: 'Irukandji Syndrome (delayed symptoms)', next: 'marine-irukandji' },
            { label: 'Bluebottle / Man-of-War', next: 'marine-bluebottle' },
            { label: 'Other jellyfish (local symptoms only)', next: 'marine-jelly-minor' },
        ],
    },
    {
        id: 'marine-box-jelly',
        type: 'info',
        module: 1,
        title: 'Box Jellyfish — Emergency Management',
        body: `**Prehospital First Aid (ANZCOR):**
1. Remove from water, call for help
2. **Douse with vinegar for 30 seconds** (neutralizes undischarged nematocysts)
3. Pick off remaining tentacles (safe for rescuer after vinegar)
4. Apply ice packs for analgesia
5. **Begin CPR if arrest** — may need prolonged resuscitation

**ED Management:**
- IV access, cardiac monitoring, resuscitation equipment ready
- Analgesia: IV opioids titrated to effect (may need large doses)

**Box Jellyfish Antivenom (CSL):**
| Indication | Dose |
|------------|------|
| Severe pain unrelieved by IV opiates | 1 ampoule in 100mL NS over 20 min |
| Hemodynamic compromise | 3 ampoules in 100mL NS, may repeat |
| **Cardiac arrest** | **Up to 6 ampoules rapid IV push** |

*Pediatric = Adult dosing (venom-based, not weight-based)*

**If antivenom fails in arrest:** Give IV magnesium 10 mmol

**Medications:**
- [Box Jellyfish Antivenom](#/drug/box-jellyfish-antivenom/envenomation): 1-6 ampoules IV
- [Magnesium sulfate](#/drug/magnesium/cardiac-arrest): 10 mmol IV if antivenom fails`,
        citation: [1, 4, 5, 6],
        next: 'marine-systemic',
    },
    {
        id: 'marine-irukandji',
        type: 'info',
        module: 1,
        title: 'Irukandji Syndrome — Management',
        body: `**Clinical Presentation:**
- Initial sting often unnoticed or mild
- **Delayed systemic symptoms 30-120 min:**
  - Sense of impending doom (pathognomonic)
  - Severe pain: back, limbs, cramping abdomen
  - Agitation, dysphoria, diaphoresis
  - **Hypertension and tachycardia**

**Severe Complications (within 4 hours):**
- Toxic cardiomyopathy
- Cardiogenic shock or pulmonary edema
- Intracerebral hemorrhage (uncontrolled HTN)

**Treatment Protocol:**
1. Vinegar to sting site (no pressure bandage)
2. **Analgesia:** IV fentanyl 0.5-1.0 mcg/kg q10min — may need large doses
3. **Antiemetic:** IV ondansetron 4-8mg or promethazine 25mg
4. **Hypertension control:** IV GTN infusion, titrate to SBP <160 mmHg
5. **Refractory pain:** IV magnesium 0.2 mmol/kg (max 10 mmol)

**No antivenom available — supportive care only**

*Symptoms typically resolve within 12 hours*

**Medications:**
- [Fentanyl](#/drug/fentanyl/analgesia): 0.5-1.0 mcg/kg IV q10min
- [GTN infusion](#/drug/nitroglycerin/hypertension): Titrate to SBP <160
- [Magnesium sulfate](#/drug/magnesium/pain): 0.2 mmol/kg (max 10 mmol)`,
        citation: [1, 7],
        calculatorLinks: [
            { id: 'marine-irukandji-severity', label: 'Irukandji Severity Score' },
        ],
        next: 'marine-systemic',
    },
    {
        id: 'marine-bluebottle',
        type: 'info',
        module: 1,
        title: 'Bluebottle / Portuguese Man-of-War',
        body: `**Important: Do NOT use vinegar (causes nematocyst discharge)**

**First Aid:**
1. Remove tentacles, rinse with seawater
2. **Hot water immersion 43-45°C for up to 30 minutes**
3. Ice if hot water unavailable

**ED Management:**
- Usually supportive care only
- Oral/IV analgesia for pain
- Antihistamines for itching
- Rarely causes systemic symptoms

**Disposition:**
- Most patients can be discharged after pain control
- Return precautions for infection or worsening symptoms`,
        citation: [1, 3],
        next: 'marine-disposition',
    },
    {
        id: 'marine-jelly-minor',
        type: 'info',
        module: 1,
        title: 'Minor Jellyfish Stings',
        body: `**Local Reaction Only:**
- Painful dermatitis, linear wheals
- Usually self-limited

**Treatment:**
1. Rinse with seawater (not freshwater)
2. Remove any visible tentacles
3. **Hot water immersion 40-45°C for 20-30 min** OR vinegar (regional preference)
4. Topical hydrocortisone for itching
5. Oral antihistamines

**Do NOT:**
- Apply pressure bandage
- Rub with sand or towel
- Apply freshwater (causes nematocyst discharge)

**Discharge with:**
- Wound care instructions
- Return precautions for infection or systemic symptoms`,
        citation: [1, 2],
        next: 'marine-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 2 — Fish Envenomation
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'marine-fish',
        type: 'question',
        module: 2,
        title: 'Fish Envenomation — Overview',
        body: `**Key Principle: All fish venoms are heat-labile**

**Hot Water Immersion Protocol:**
- Temperature: 40-45°C (as hot as tolerated, non-scalding)
- Duration: 30-90 minutes or until significant pain relief
- Test water on unaffected limb first to prevent burns

**Common Venomous Fish:**
| Species | Potency | Distribution |
|---------|---------|--------------|
| Stonefish | Most potent | Indo-Pacific |
| Stingray | Moderate | Global |
| Lionfish/Scorpionfish | Moderate | Indo-Pacific, Caribbean |

**All require:**
- Hot water immersion
- Wound exploration
- Tetanus prophylaxis
- Consider antibiotics (Vibrio coverage)`,
        citation: [3, 8, 10],
        options: [
            { label: 'Stingray injury', next: 'marine-stingray' },
            { label: 'Stonefish envenomation', next: 'marine-stonefish' },
            { label: 'Lionfish / Scorpionfish', next: 'marine-lionfish' },
        ],
        calculatorLinks: [
            { id: 'marine-hot-water', label: 'Hot Water Immersion Timer' },
        ],
    },
    {
        id: 'marine-stingray',
        type: 'info',
        module: 2,
        title: 'Stingray Injury',
        body: `**Presentation:**
- Painful puncture wound (usually foot/ankle)
- Retroserrated barb may be retained
- Local edema, erythema, necrosis possible

**Management:**
1. **Hot water immersion** — most effective for pain
2. **Imaging:** X-ray (barbs are radioopaque)
   - MRI/US for radiolucent cartilage fragments
3. **Wound exploration:** Remove visible barb fragments
4. Irrigate thoroughly
5. Tetanus prophylaxis

**Antibiotics (Recommended for all stingray injuries):**
- [Ciprofloxacin](#/drug/ciprofloxacin/marine-wound) 500mg PO BID x 5 days, OR
- [Doxycycline](#/drug/doxycycline/marine-wound) 100mg PO BID x 5 days

**Red Flags — Immediate Surgery:**
- Penetrating trauma to chest, abdomen, or neck
- Suspected cardiac/vascular injury
- Retained barb near joints or neurovascular structures`,
        citation: [9, 10],
        next: 'marine-disposition',
    },
    {
        id: 'marine-stonefish',
        type: 'info',
        module: 2,
        title: 'Stonefish — Most Potent Fish Venom',
        body: `**Presentation:**
- Excruciating pain ("worst pain ever experienced")
- Stepped on camouflaged fish on ocean floor
- Rapid local edema
- Systemic effects: hypotension, cardiac dysfunction (rare)

**Treatment:**
1. **Hot water immersion 40-42°C for 20+ minutes**
2. **Regional nerve block** — may be more effective than HWI alone
3. IV opioids for uncontrolled pain

**Stonefish Antivenom (CSL):**
| Indication | Dose |
|------------|------|
| Severe local pain unrelieved by opiates | 1 ampoule per 2 spine punctures |
| Systemic envenomation | Up to 3 ampoules initially |
| Cardiac arrest | Rapid IV push |

*Route: IM undiluted OR IV diluted in 100mL NS over 20 min*
*Doses >3 ampoules: Contact toxicology*

**Medications:**
- [Stonefish Antivenom](#/drug/stonefish-antivenom/envenomation): 1 amp per 2 punctures (max 3)`,
        citation: [3, 8, 10],
        next: 'marine-systemic',
    },
    {
        id: 'marine-lionfish',
        type: 'info',
        module: 2,
        title: 'Lionfish / Scorpionfish',
        body: `**Less potent than stonefish but still very painful**

**Presentation:**
- Throbbing local pain, peaks 60-90 min, lasts up to 12 hours
- Grade I: Local erythema/ecchymosis
- Grade II: Vesicle/blister formation
- Grade III: Local necrosis (days to weeks)

**Treatment:**
1. **Hot water immersion** — 94% get complete or moderate relief
2. Remove visible spines
3. Local wound care
4. Tetanus prophylaxis
5. Antibiotics only if signs of infection

**No antivenom available for lionfish/scorpionfish**

**Disposition:**
- Most can be discharged after pain control
- Follow up in 48-72 hours for wound check`,
        citation: [8],
        next: 'marine-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 3 — Other Marine Envenomation
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'marine-other',
        type: 'question',
        module: 3,
        title: 'Other Marine Envenomation',
        body: `**Select the creature type:**

| Creature | Toxin | Key Feature |
|----------|-------|-------------|
| Sea Urchin | Local toxins | Multiple spine punctures |
| Blue-ringed Octopus | Tetrodotoxin | Paralysis, respiratory failure |
| Cone Snail | Conotoxins | Paralysis, painless sting |
| Sea Snake | Myotoxic + neurotoxic | Rhabdomyolysis, paralysis |`,
        citation: [1, 12],
        options: [
            { label: 'Sea Urchin', next: 'marine-urchin' },
            { label: 'Blue-ringed Octopus', next: 'marine-octopus' },
            { label: 'Cone Snail', next: 'marine-cone' },
            { label: 'Sea Snake', next: 'marine-seasnake' },
        ],
    },
    {
        id: 'marine-urchin',
        type: 'info',
        module: 3,
        title: 'Sea Urchin Injuries',
        body: `**Presentation:**
- Multiple spine punctures (usually feet/hands)
- Intense local pain
- Dark discoloration (may be dye — resolves in 48h)

**Treatment:**
1. **Hot water immersion 40-46°C for 30-90 minutes**
2. Remove all visible spines carefully (avoid fragmentation)
3. Irrigate and debride wounds
4. Shaving cream + razor to remove pedicellariae
5. **Imaging if retained spines suspected**

**Complications (weeks to months later):**
- Granuloma formation → excision, intralesional steroids
- Joint involvement → may require synovectomy
- Hand wounds → often need surgical debridement

**Disposition:**
- Spines near joints or neurovascular structures: Splint, surgical consult
- Otherwise discharge with wound care instructions`,
        citation: [1],
        next: 'marine-disposition',
    },
    {
        id: 'marine-octopus',
        type: 'info',
        module: 3,
        title: 'Blue-Ringed Octopus — Tetrodotoxin',
        body: `**Life-threatening — prepare for respiratory support**

**Presentation:**
- Tiny, often painless bite
- Symptom onset: 1-2 hours
- **Progressive ascending paralysis**
- Respiratory failure
- **Patient remains conscious despite paralysis**

**First Aid:**
1. Clean wound with freshwater
2. **Pressure immobilization bandage** (slows lymphatic spread)
3. Prepare for respiratory support

**ED Management:**
- **No antivenom available**
- **Intubation and mechanical ventilation** for respiratory paralysis
- Typical ventilation duration: 2-5 days
- Supportive care only

**Prognosis:**
- Patients surviving first 24 hours usually recover without deficits
- Full recovery expected with adequate respiratory support`,
        citation: [1, 11, 12],
        next: 'marine-systemic',
    },
    {
        id: 'marine-cone',
        type: 'info',
        module: 3,
        title: 'Cone Snail — Conotoxin',
        body: `**Similar presentation to blue-ringed octopus**

**Presentation:**
- Sting may be painful or painless
- Rapid onset paralysis
- Paresthesias, hypotension
- Respiratory failure

**First Aid:**
- **Pressure immobilization bandage**
- Prepare for cardiovascular and respiratory support

**ED Management:**
- **No antivenom available**
- Supportive care only
- May require intubation for respiratory failure
- Monitor for cardiovascular instability`,
        citation: [1, 12],
        next: 'marine-systemic',
    },
    {
        id: 'marine-seasnake',
        type: 'info',
        module: 3,
        title: 'Sea Snake Envenomation',
        body: `**Rare but serious**

**Presentation:**
- Small puncture wounds (often painless initially)
- Symptoms appear 30 min to 2 hours:
  - Ptosis, dysphagia
  - Non-rigid paralysis
  - **Myotoxicity (rhabdomyolysis)**
- Respiratory failure in severe cases

**First Aid:**
- **Pressure immobilization bandage** (same as terrestrial snake)
- Complete immobilization of limb and patient

**ED Management:**
- Contact Poison Control early (rare envenomation)
- Labs: CK, renal function, coags, urinalysis for myoglobinuria

**Sea Snake Antivenom (CSL):**
- 1 vial IV over 15 minutes (1:10 dilution with NS)
- Administer in critical care setting (anaphylaxis risk)
- **Polyvalent snake antivenom does NOT cover sea snakes**

**Post-antivenom:** Monitor for serum sickness 4-14 days

**Medications:**
- [Sea Snake Antivenom](#/drug/sea-snake-antivenom/envenomation): 1 vial IV (1:10 dilution)`,
        citation: [1, 12],
        next: 'marine-systemic',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 4 — Systemic Reactions
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'marine-systemic',
        type: 'question',
        module: 4,
        title: 'Systemic Reactions & Antivenom Summary',
        body: `**Antivenom Availability:**

| Creature | Antivenom | Available |
|----------|-----------|-----------|
| Box Jellyfish | CSL Box Jellyfish | Australia/Asia |
| Stonefish | CSL Stonefish | Australia/Asia |
| Sea Snake | CSL Sea Snake | Australia |
| Blue-ringed Octopus | **None** | — |
| Cone Snail | **None** | — |
| Irukandji | **None** | — |
| Lionfish | **None** | — |
| Stingray | **None** | — |

**Anaphylaxis Risk:**
- All antivenoms: Administer in monitored setting
- Stop infusion if reaction occurs
- Standard anaphylaxis protocol: O2, IV fluids, IM epinephrine

**Serum Sickness (4-14 days post-antivenom):**
- Fever, rash, joint/muscle pain, headache, N/V
- Treatment: Oral corticosteroids`,
        citation: [6, 12],
        options: [
            { label: 'Anaphylaxis management', next: 'marine-anaphylaxis' },
            { label: 'Continue to disposition', next: 'marine-disposition' },
        ],
    },
    {
        id: 'marine-anaphylaxis',
        type: 'info',
        module: 4,
        title: 'Anaphylaxis Management',
        body: `**If antivenom reaction occurs:**
1. Stop infusion immediately
2. Maintain airway
3. **Epinephrine 0.3-0.5mg IM** (anterolateral thigh)
4. IV fluids NS bolus
5. H1 blocker: Diphenhydramine 50mg IV
6. H2 blocker: Famotidine 20mg IV
7. Methylprednisolone 125mg IV

**For envenomation-related anaphylaxis (rare):**
- Same protocol as above
- Consider repeat epinephrine q5-15min if needed

**Note:** True anaphylaxis from marine envenomation (not antivenom) is uncommon but can occur with repeated exposures

**Medications:**
- [Epinephrine](#/drug/epinephrine/anaphylaxis): 0.3-0.5mg IM
- [Diphenhydramine](#/drug/diphenhydramine/anaphylaxis): 50mg IV
- [Methylprednisolone](#/drug/methylprednisolone/anaphylaxis): 125mg IV`,
        citation: [1],
        next: 'marine-disposition',
    },
    // ─────────────────────────────────────────────────────────────────────────────
    // MODULE 5 — Disposition
    // ─────────────────────────────────────────────────────────────────────────────
    {
        id: 'marine-disposition',
        type: 'question',
        module: 5,
        title: 'Disposition Criteria',
        body: `**Discharge Criteria:**
- Pain controlled with oral analgesics
- No systemic symptoms after 3-4 hour observation
- Wound care instructions provided
- Tetanus prophylaxis complete
- Antibiotics prescribed if indicated

**Admit If:**
- Severe muscle cramping
- Respiratory distress or paralysis
- Hypotension or arrhythmias
- Antivenom administration
- Irukandji syndrome with ongoing symptoms
- Blue-ringed octopus or cone snail (respiratory monitoring)
- Penetrating trauma requiring OR exploration`,
        citation: [1, 12],
        options: [
            { label: 'Discharge instructions', next: 'marine-discharge' },
            { label: 'Admission criteria', next: 'marine-admit' },
        ],
    },
    {
        id: 'marine-discharge',
        type: 'info',
        module: 5,
        title: 'Discharge Instructions',
        body: `**Wound Care:**
- Keep wound clean and dry
- Watch for signs of infection (increasing redness, warmth, purulent drainage, fever)
- Complete antibiotic course if prescribed
- Follow up in 48-72 hours for deep punctures

**Return Precautions:**
Return immediately for:
- Signs of infection
- Worsening pain after initial improvement
- New systemic symptoms (difficulty breathing, swallowing)
- Fever

**Antibiotic Coverage (if indicated):**
Deep punctures, contaminated wounds, stingray injuries, immunocompromised

**Outpatient Regimens (5 days):**
- [Ciprofloxacin](#/drug/ciprofloxacin/marine-wound) 500mg PO BID, OR
- [Doxycycline](#/drug/doxycycline/marine-wound) 100mg PO BID, OR
- [Levofloxacin](#/drug/levofloxacin/marine-wound) 750mg PO daily

*Covers: Staph, Strep, Vibrio species*`,
        citation: [1, 9],
        recommendation: 'Provide written wound care instructions and ensure patient understands return precautions.',
    },
    {
        id: 'marine-admit',
        type: 'info',
        module: 5,
        title: 'Admission Indications',
        body: `**ICU Admission:**
- Antivenom administration (anaphylaxis risk)
- Respiratory failure or need for intubation
- Cardiac arrhythmias or arrest
- Blue-ringed octopus envenomation (even if currently stable)
- Severe Irukandji syndrome

**Floor Admission:**
- Ongoing IV analgesia requirement
- Observation for delayed systemic symptoms
- IV antibiotics for severe wound infection
- Penetrating trauma post-surgery

**Surgical Consultation:**
- Penetrating chest/abdomen/neck (stingray)
- Retained foreign body near joints/vessels
- Hand wounds with retained sea urchin spines
- Compartment syndrome concerns

**Poison Control:**
- Australia: 13 11 26
- US: 1-800-222-1222
- Contact for rare envenomations (sea snake, cone snail)`,
        citation: [1, 12],
        calculatorLinks: [
            { id: 'marine-admission-criteria', label: 'Admission Decision Tool' },
        ],
    },
];
