// MedKitt — Cervical Spine Pain (Non-Traumatic)
// Comprehensive non-traumatic cervical spine pain workup for EM + Ortho
// Sources: ACR Appropriateness Criteria 2022, NASS 2024, AAN/AANS/CNS cervical myelopathy 2017, Tintinalli 9e, Rosen's 10e
// 7 modules: Triage → Red Flags → Radiculopathy → Myelopathy → Imaging → Mechanical → Disposition
// ~30 nodes
export const CERVICAL_SPINE_NONTRAUMATIC_CRITICAL_ACTIONS = [
    { text: 'Fever + neck pain + IVDU or immunosuppression = MRI now — spinal epidural abscess is the classic miss', nodeId: 'csnt-redflag-infection' },
    { text: 'Hoffman + Lhermitte + gait change = emergent MRI — degenerative cervical myelopathy is a surgical emergency', nodeId: 'csnt-myelopathy-screen' },
    { text: 'Posterior headache + neck pain in patient under 50 = consider vertebral artery dissection — CTA or MRA', nodeId: 'csnt-redflag-vad' },
    { text: 'Rheumatoid arthritis + occipital headache or new neuro signs = flex/ext XR BEFORE any neck manipulation or intubation', nodeId: 'csnt-redflag-ra' },
    { text: 'Bilateral arm weakness with hand intrinsic wasting = cord, not nerve root — image the spinal cord, not just the disc', nodeId: 'csnt-distinguisher' },
    { text: 'New severe neck pain in a patient with known cancer = MSCC (metastatic cord compression) until proven otherwise', nodeId: 'csnt-redflag-malignancy' },
];
export const CERVICAL_SPINE_NONTRAUMATIC_NODES = [
    // =====================================================================
    // MODULE 1: TRIAGE & PATTERN RECOGNITION
    // =====================================================================
    {
        id: 'csnt-start',
        type: 'question',
        module: 1,
        title: 'Cervical Spine Pain — Non-Traumatic',
        body: '**This consult covers neck pain WITHOUT acute trauma.** For trauma, use the [Cervical Spine](#/tree/cervical-spine) consult.\n\n[Steps Summary](#/info/csnt-steps)\n\n**First-pass triage — which pattern fits?**\n\n• **Mechanical / Myofascial** — axial neck pain, no radicular or cord features. ~85% of non-traumatic neck pain. [1]\n• **Radicular** — pain or paresthesia in a dermatomal arm distribution, often with myotome weakness or absent reflex.\n• **Myelopathic** — gait disturbance, hand clumsiness, bilateral findings, UMN signs (Hoffman, Babinski, clonus, hyperreflexia).\n• **Red-flag suspicious** — fever, IVDU, cancer history, RA, sudden onset, posterior HA, immunosuppression.\n\n**Always screen for red flags FIRST.** Mechanical neck pain is the most common diagnosis but it is also the most common missed-something diagnosis. [2]',
        options: [
            { label: 'Red flags present — screen now', description: 'Fever, IVDU, cancer hx, RA, sudden onset, immunocompromise, age >50 with new pain', next: 'csnt-redflag-triage', urgency: 'critical' },
            { label: 'Radicular pattern', description: 'Dermatomal arm pain or paresthesia, weakness or reflex change', next: 'csnt-radic-start' },
            { label: 'Myelopathy suspected', description: 'Gait change, hand clumsiness, bilateral signs, UMN findings', next: 'csnt-myelopathy-screen', urgency: 'critical' },
            { label: 'Mechanical / myofascial pain only', description: 'Axial neck pain, no radicular or cord features, no red flags', next: 'csnt-mech-start' },
            { label: 'Unsure — distinguish radiculopathy vs myelopathy', description: 'Show the side-by-side comparator', next: 'csnt-distinguisher' },
        ],
        citation: [1, 2],
        calculatorLinks: [
            { id: 'cervical-redflag-triage', label: 'Red Flag Triage' },
            { id: 'cervical-myelopathy-screen', label: 'Myelopathy Screen' },
        ],
        images: [{
                src: 'images/cervical-spine-nontraumatic/cervical-anatomy.png',
                alt: 'Cervical vertebrae anatomy showing C1-C7, spinal cord, and exiting nerve roots with relationship to disc spaces.',
                caption: 'Cervical vertebrae and exiting nerve roots. (Public Domain, Henry Vandyke Carter / Gray\'s Anatomy 1918, via Wikimedia Commons.)'
            }],
        summary: '5-bucket triage — red flags first, then radic vs myelo vs mechanical',
    },
    // =====================================================================
    // MODULE 2: RED FLAG WORKUP
    // =====================================================================
    {
        id: 'csnt-redflag-triage',
        type: 'question',
        module: 2,
        title: '🚨 Red Flag — Which Concern?',
        body: '**The "miss this and lose your license" differential for non-traumatic neck pain:**\n\n| Red Flag Pattern | Diagnosis to Exclude |\n|---|---|\n| Fever + IVDU / immunosuppression / recent procedure | **Spinal epidural abscess / discitis** |\n| Known cancer + new severe neck pain ± night pain | **Metastatic cord compression (MSCC)** |\n| Sudden onset, posterior HA, neck pain, age <50, post-manipulation | **Vertebral artery dissection** |\n| RA + occipital HA or progressive neuro signs | **Atlantoaxial subluxation** |\n| Fever + neck stiffness + photophobia + headache | **Meningitis** (use [Meningitis](#/tree/meningitis) consult) |\n| Morning stiffness >1 hr, age <40, improves with activity | **Inflammatory spondyloarthropathy** |\n\nWhich pattern fits?',
        options: [
            { label: 'Infection (abscess / discitis)', description: 'Fever, IVDU, immunosuppression, recent spine procedure, indwelling lines', next: 'csnt-redflag-infection', urgency: 'critical' },
            { label: 'Malignancy / MSCC', description: 'Known cancer, night pain, weight loss, new-onset severe pain', next: 'csnt-redflag-malignancy', urgency: 'critical' },
            { label: 'Vertebral artery dissection', description: 'Sudden onset, posterior HA, post-manipulation, posterior circ symptoms', next: 'csnt-redflag-vad', urgency: 'critical' },
            { label: 'RA atlantoaxial subluxation', description: 'Long-standing RA + occipital HA or new myelopathic signs', next: 'csnt-redflag-ra', urgency: 'critical' },
            { label: 'Inflammatory (ank spond, PMR)', description: 'Morning stiffness, age, systemic features', next: 'csnt-redflag-inflam' },
        ],
        citation: [1, 3],
        summary: 'Top misses: abscess, MSCC, dissection, RA AAS, meningitis',
        safetyLevel: 'critical',
    },
    {
        id: 'csnt-redflag-infection',
        type: 'info',
        module: 2,
        title: 'Spinal Epidural Abscess / Discitis',
        body: '**Classic triad (only ~15% have all three):** fever + back/neck pain + neurologic deficit. **Do NOT wait for the triad** — most patients are missed because they look "well enough" on the first visit. [3][4]\n\n**Risk factors that should trigger MRI:**\n• IV drug use (single biggest risk factor)\n• Immunosuppression — DM, HIV, steroids, transplant, chemo\n• Indwelling vascular access, recent spine procedure or epidural\n• Bacteremia or distant infection (endocarditis, UTI, skin abscess)\n• Hemodialysis\n\n**Workup:**\n• **ESR + CRP** — sensitivity for SEA ~94-100% when both elevated. Normal ESR <20 + normal CRP makes SEA very unlikely (but still possible if very early). [4]\n• **Blood cultures × 2** before antibiotics\n• **MRI cervical spine with and without contrast** — gold standard. Do NOT settle for CT or XR. If MRI not available locally, transfer.\n• WBC is unreliable (normal in ~30%)\n\n**Empiric antibiotics (do NOT delay for biopsy if neuro deficits present):**\n• [Vancomycin](#/drug/vancomycin/abscess) IV (MRSA coverage)\n• PLUS [Ceftriaxone](#/drug/ceftriaxone/abscess) 2 g IV q12h or [Cefepime](#/drug/cefepime/abscess) 2 g IV q8h (gram-negative + Pseudomonas if IVDU)\n\n**Disposition:** Admit with neurosurgery / spine consult. Surgical drainage indicated for neuro deficit, sepsis, or failure to improve.',
        citation: [3, 4],
        next: 'csnt-disposition',
        summary: 'IVDU/immunocomp + neck pain = MRI w/ contrast — ESR/CRP, blood cx, vanc+cef',
        safetyLevel: 'critical',
    },
    {
        id: 'csnt-redflag-malignancy',
        type: 'info',
        module: 2,
        title: 'Metastatic Cord Compression (MSCC)',
        body: '**MSCC is an oncologic emergency.** ~5% of cancer patients develop cord compression; the cervical spine is involved in ~10% of MSCC cases (thoracic dominates). [5]\n\n**Red flags in a cancer patient with new neck pain:**\n• Night pain or pain worse when supine\n• Progressive over days-weeks\n• Bilateral arm or leg weakness\n• Sensory level\n• Bowel or bladder dysfunction\n\n**Common primaries:** breast, lung, prostate, kidney, multiple myeloma, lymphoma.\n\n**Workup:**\n• **MRI whole spine** — not just the painful level. Skip lesions are common. [5]\n• If MRI contraindicated: CT myelogram\n\n**Treatment — start IMMEDIATELY when MSCC suspected:**\n• **[Dexamethasone](#/drug/dexamethasone/MSCC) 10 mg IV** then 4 mg PO/IV q6h while awaiting imaging\n• Do NOT wait for MRI confirmation to start steroids if clinical suspicion is high\n• **Neurosurgery / radiation oncology consult immediately**\n• Surgical decompression + radiation > radiation alone for ambulatory patients with good prognosis [5]\n\n**Prognosis predictor:** ambulatory status at time of treatment is the single strongest predictor of preserved function.',
        citation: [5],
        next: 'csnt-disposition',
        summary: 'Cancer + new neck pain = MRI whole spine + dex 10mg IV NOW',
        safetyLevel: 'critical',
    },
    {
        id: 'csnt-redflag-vad',
        type: 'info',
        module: 2,
        title: 'Vertebral Artery Dissection',
        body: 'VAD is a leading cause of stroke in patients under 45. ~20% of strokes in young adults are from cervicocephalic artery dissection. [6]\n\n**Clinical clues — pain is the herald symptom:**\n• Sudden severe **posterior** neck pain or occipital headache\n• Often after minor trauma, manipulation (chiropractic), neck rotation, sustained extension (hair-washing, ceiling painting)\n• "Worst headache of life" in the back of the head\n• Posterior circulation symptoms: vertigo, diplopia, dysarthria, ataxia, hemianopsia, dysphagia\n• Horner syndrome (carotid dissection more typical but VAD can cause it)\n\n**Use the [Cervical Artery Dissection](#/tree/cervical-artery-dissection) consult for the full pathway.**\n\n**Quick ED actions:**\n• **CTA neck** (faster, more available) or MRA neck — both 95-100% sensitive [6]\n• Neurology consult\n• Antithrombotic therapy: **antiplatelet (aspirin) vs anticoagulation** — recent CADISS, TREAT-CAD trials show similar outcomes; aspirin is the typical first-line in most ED settings\n• Avoid neck manipulation, vigorous physical therapy\n• Admit for stroke workup, telemetry, repeat imaging\n\n**Do NOT:** intubate or move the neck aggressively without considering ongoing dissection / clot propagation.',
        citation: [6],
        next: 'csnt-disposition',
        summary: 'Posterior HA + neck pain + young = CTA neck — see CAD consult',
        safetyLevel: 'critical',
    },
    {
        id: 'csnt-redflag-ra',
        type: 'info',
        module: 2,
        title: 'RA Atlantoaxial Subluxation',
        body: 'Up to 80% of RA patients develop cervical spine involvement; ~25% develop atlantoaxial subluxation (AAS), and a smaller subset develops cranial settling or subaxial subluxation. [7]\n\n**Why it matters in the ED:**\n• Pannus erodes the transverse ligament of C1 → C1 slides forward on C2 → **cord at risk during neck flexion (intubation, manipulation, exam)**\n• Patients can have minimal symptoms until catastrophic cord compression\n• Mortality from missed AAS during intubation is well documented\n\n**Red-flag symptoms in RA patients:**\n• Occipital headache (C2 distribution)\n• Sensation of "head falling off"\n• Lhermitte sign\n• Progressive myelopathic signs\n• New paresthesias, gait change\n\n**Workup:**\n• **Cervical XR including open-mouth odontoid + lateral flexion AND extension views** — the dynamic instability shows up on flex/ext\n• ADI (atlanto-dens interval) >3 mm in adults = abnormal; >9 mm = cord at risk\n• Posterior atlanto-dens interval (PADI) <14 mm = cord at risk\n• **MRI** if any neuro signs or planning intubation\n\n**ED management:**\n• **No manipulation, no aggressive intubation positioning** — use awake fiberoptic if airway needed\n• Cervical collar for stability\n• Neurosurgery consult\n• Consider preserving in-line stabilization\n\n**Critical:** if RA patient needs intubation in your ED → assume AAS until proven otherwise.',
        citation: [7],
        next: 'csnt-disposition',
        summary: 'RA + neck pain = flex/ext XR — assume AAS, no neck manipulation, awake intub',
        safetyLevel: 'critical',
    },
    {
        id: 'csnt-redflag-inflam',
        type: 'info',
        module: 2,
        title: 'Inflammatory Spondyloarthropathy',
        body: '**When to think inflammatory (vs mechanical):**\n• Age <40 at onset\n• Morning stiffness >1 hour\n• Improves with activity, worsens with rest\n• Insidious onset >3 months\n• Family history of HLA-B27 disease (ankylosing spondylitis, psoriatic arthritis, IBD-associated)\n• Alternating buttock pain, peripheral enthesitis, uveitis\n\n**Workup (usually outpatient):**\n• ESR, CRP (often elevated)\n• HLA-B27 (if not already known)\n• XR cervical AND SI joints — late changes only; MRI shows early sacroiliitis\n\n**ED role:**\n• Recognize the pattern, refer to rheumatology\n• NSAIDs are first-line — consider [Naproxen](#/drug/naproxen/MSK) 500 mg BID or [Ibuprofen](#/drug/ibuprofen/MSK) 600-800 mg TID\n• PT referral\n• Educate: this is not "regular neck pain" — it needs rheum follow-up\n\n**Caveat:** ank spond patients with **new neck pain after minor trauma** need imaging — fused spine fractures easily, low threshold for CT.',
        citation: [8],
        next: 'csnt-disposition',
        summary: 'Age <40, AM stiff >1hr, improves with activity = rheum referral + NSAIDs',
    },
    // =====================================================================
    // MODULE 3: RADICULOPATHY
    // =====================================================================
    {
        id: 'csnt-radic-start',
        type: 'info',
        module: 3,
        title: 'Cervical Radiculopathy — Overview',
        body: 'Cervical radiculopathy is compression or irritation of an exiting nerve root, most commonly from a **lateral disc herniation** (younger patients) or **foraminal stenosis from spondylosis** (older patients). [9]\n\n**Incidence:** ~85 per 100,000 person-years. Most common roots: **C7 (~60%), C6 (~25%), C8 (~10%), C5 (~5%)**. C5 and below are uncommon in non-traumatic settings. [9]\n\n**Key clinical question:** *Which nerve root?* — drives where to image and which provocative test to use.\n\nNext steps:\n• Review the [Dermatome / Nerve Root Atlas](#/info/csnt-dermatome-atlas)\n• Do [Provocative Tests](#/info/csnt-provocative-tests) — Spurling has the highest specificity\n• Apply the imaging rules in the next module',
        citation: [9],
        next: 'csnt-radic-root-table',
        summary: 'C7 > C6 > C8 > C5 — atlas + Spurling + image if red flags or >6 wk',
        images: [{
                src: 'images/cervical-spine-nontraumatic/dermatomes.png',
                alt: 'Full body dermatome map showing cervical, thoracic, lumbar, and sacral dermatomes including C2-T1 in the head, neck, and upper extremity.',
                caption: 'Dermatome map (Grant 1962, public domain via Wikimedia Commons). Cervical dermatomes C2-T1 cover the back of head, neck, shoulder, and upper extremity.'
            }],
    },
    {
        id: 'csnt-radic-root-table',
        type: 'info',
        module: 3,
        title: 'Cervical Nerve Root Territories',
        body: '**The high-yield table — memorize this:**\n\n| Root | Dermatome | Myotome (Motor) | Reflex | Provocative Tip |\n|------|-----------|-----------------|--------|-----------------|\n| **C5** | Lateral upper arm, deltoid patch | Shoulder abduction (deltoid), elbow flexion | Biceps | Pain to lateral arm with Spurling |\n| **C6** | Lateral forearm, **thumb + index** | Wrist extension, elbow flexion | Brachioradialis | "Thumb tingling" |\n| **C7** | **Middle finger**, posterior forearm | Wrist flexion, **triceps (elbow extension)**, finger extension | Triceps | Most common — triceps weak |\n| **C8** | Medial forearm, **ring + little finger** | Finger flexion, hand intrinsics | Finger flexor | "Numb pinky + ring" |\n| **T1** | Medial upper arm, axilla | Hand intrinsics (interossei) | None | Hand wasting, Horner if T1 |\n\n**Mnemonic for the fingers:**\n• Thumb = **C6**\n• Middle = **C7**\n• Pinky = **C8**\n\n**Reflex mnemonic (count to 8):**\n• Biceps = C**5**-6\n• Brachioradialis = C**6**\n• Triceps = C**7**\n• Finger flexor = C**8**\n\n**Special signs:**\n• **T1 radiculopathy with Horner** → think Pancoast tumor (apical lung), brachial plexus pathology\n• **C5 weakness + atrophy** → consider neuralgic amyotrophy (Parsonage-Turner) or anterior horn pathology if also fasciculations\n• **Bilateral C8/T1 hand wasting** → think syringomyelia, ALS, central cord — image the cord\n\n[9][10]',
        citation: [9, 10],
        next: 'csnt-radic-exam',
        summary: 'Thumb=C6, middle=C7, pinky=C8 — count reflexes 5/6/7/8',
        safetyLevel: 'warning',
    },
    {
        id: 'csnt-radic-exam',
        type: 'info',
        module: 3,
        title: 'Provocative Tests',
        body: '**[Provocative Tests Quick Reference](#/info/csnt-provocative-tests)**\n\n**1. Spurling Test** (cervical compression / foraminal narrowing)\n• Extend neck, side-bend to symptomatic side, apply axial pressure\n• **Reproduction of radicular pain in the affected arm = positive**\n• Sensitivity 30-60% | **Specificity 92-100%** — high specificity, so a positive is meaningful [11]\n• Do NOT do this if cord compression or instability suspected\n\n**2. Shoulder Abduction Relief Sign (Bakody)**\n• Patient places palm of affected arm on top of head\n• Decreases tension on the nerve root → reduces pain\n• Sensitivity ~50% | Specificity ~80%\n\n**3. Neck Distraction Test**\n• Examiner applies gentle axial traction to head\n• Relieves radicular pain → positive\n• Specificity ~90%\n\n**4. Lhermitte Sign**\n• Patient flexes neck → electric shock sensation down spine or into limbs\n• **Suggests cord pathology** — myelopathy, MS, B12 deficiency, cervical disc with cord involvement\n• If positive → escalate to myelopathy workup\n\n**5. Upper Limb Tension Test (ULTT, "neural Spurling")**\n• Like SLR for upper extremity\n• Sensitivity ~75-95% | Specificity ~22-50% — good for ruling OUT\n\n**Cluster:** Spurling + distraction + ULTT + ipsilateral rotation <60° → 3+ of 4 positive = LR ~6.1 for cervical radiculopathy. [11]',
        citation: [11],
        next: 'csnt-radic-mgmt',
        summary: 'Spurling spec 92-100% — Lhermitte = myelopathy, escalate',
        calculatorLinks: [
            { id: 'cervical-myelopathy-screen', label: 'Myelopathy Screen' },
        ],
    },
    {
        id: 'csnt-radic-mgmt',
        type: 'info',
        module: 3,
        title: 'Radiculopathy — Conservative Management',
        body: '**~80-90% of cervical radiculopathy resolves with conservative care within 4-6 weeks.** [9][12]\n\n**Imaging — when in the ED:**\n• **No imaging** if: <6 weeks, no red flags, no progressive deficit, no myelopathy\n• **MRI cervical spine** if: progressive motor deficit, suspected myelopathy, >6 weeks of refractory symptoms, red flags\n• **CT** if MRI contraindicated (pacemaker, claustrophobia uncooperative)\n• **XR** has limited utility for radiculopathy alone — only if instability or RA concern\n\n**ED treatment:**\n• **First-line analgesia:**\n  - [Naproxen](#/drug/naproxen/MSK) 500 mg PO BID (or [Ibuprofen](#/drug/ibuprofen/MSK) 600 mg TID)\n  - [Acetaminophen](#/drug/acetaminophen/MSK) 1 g PO q6h scheduled\n  - Topical [Diclofenac](#/drug/diclofenac/MSK) 1% gel\n• **For severe acute radicular pain** (consider short course):\n  - [Prednisone](#/drug/prednisone/radiculopathy) 60 mg PO daily × 5 days then taper over 7-10 days — RCT data show modest benefit for acute lumbar radiculopathy; extrapolated to cervical [12]\n  - [Gabapentin](#/drug/gabapentin/neuropathic) 300 mg TID titrated up — for neuropathic component\n  - Short opioid course only if severe and refractory (3-day supply max)\n• **Muscle relaxants** for spasm: [Tizanidine](#/drug/tizanidine/MSK) 2-4 mg TID or [Cyclobenzaprine](#/drug/cyclobenzaprine/MSK) 5-10 mg TID × 5-7 days\n• Soft collar **briefly** (1-2 weeks max — longer worsens outcomes)\n• Physical therapy referral within 1-2 weeks\n\n**When to escalate to spine clinic urgently:**\n• Progressive motor weakness\n• Refractory pain despite 4-6 weeks of conservative care\n• Diagnostic uncertainty\n\n**When to escalate to neurosurgery emergently:**\n• Acute myelopathy\n• Cauda equina (lumbar) — different consult\n• Progressive C5 deltoid weakness or severe motor deficit',
        citation: [9, 12],
        next: 'csnt-disposition',
        summary: '80-90% resolve in 4-6 wk — NSAIDs, gaba, PT, no imaging if <6 wk no red flags',
    },
    // =====================================================================
    // MODULE 4: MYELOPATHY
    // =====================================================================
    {
        id: 'csnt-myelopathy-screen',
        type: 'info',
        module: 4,
        title: 'Myelopathy Screen — UMN Findings',
        body: '**Degenerative cervical myelopathy (DCM)** is the most common cause of spinal cord dysfunction in adults >55. It is **commonly missed** because patients present with vague hand clumsiness or gait change attributed to aging. [13][14]\n\n**Screen every patient with neck pain + any of:**\n• Hand clumsiness ("dropping things, buttons hard")\n• Gait disturbance, falls\n• Bilateral arm or leg symptoms\n• Sphincter changes\n\n**UMN signs to check (and document):**\n\n| Sign | How to elicit | What it means |\n|------|--------------|---------------|\n| **Hoffman sign** | Flick the nail of the middle finger downward → thumb and index flex | UMN; ~25% can be positive at baseline so look for asymmetry [14] |\n| **Lhermitte sign** | Neck flexion → electric shock down spine | Posterior column irritation — cord pathology |\n| **Hyperreflexia** | Brisk biceps/triceps/patellar/Achilles | UMN |\n| **Clonus** | Sudden ankle dorsiflexion → rhythmic beats | UMN; >3 beats = pathologic |\n| **Babinski / Plantar extensor** | Stroke lateral foot from heel toward toes | UMN |\n| **Inverted brachioradialis** | Tap brachioradialis → finger flexion instead of forearm supination | C5-6 myelopathy |\n| **Tandem gait** | Heel-to-toe walking | Subtle myelopathy / cerebellar |\n| **Hand intrinsic atrophy + weakness** | Look at thenar/hypothenar/interossei | Late finding — bad prognostic |\n\n**Run the [Myelopathy Screen calculator](#/calculator/cervical-myelopathy-screen) for a structured count.**\n\n**Modified JOA score (mJOA) or Nurick scale** — used in spine clinic for grading severity. Beyond ED scope but worth knowing the patient will be staged.',
        citation: [13, 14],
        calculatorLinks: [
            { id: 'cervical-myelopathy-screen', label: 'Myelopathy Screen' },
        ],
        next: 'csnt-myelopathy-mgmt',
        summary: 'Hoffman + Lhermitte + hyperreflexia + gait = MRI emergent',
        safetyLevel: 'critical',
        images: [{
                src: 'images/cervical-spine-nontraumatic/cord-syndromes.png',
                alt: 'Cross-section of spinal cord showing dorsal columns, corticospinal tract, and spinothalamic tract — anatomic basis for cord syndromes.',
                caption: 'Spinal cord tracts. Damage to specific tracts produces predictable cord syndromes. (Public Domain, Gray\'s Anatomy 1918, via Wikimedia Commons.)'
            }],
    },
    {
        id: 'csnt-myelopathy-mgmt',
        type: 'info',
        module: 4,
        title: 'Degenerative Cervical Myelopathy — Management',
        body: '**The decision: surgical vs conservative.** Modern AANS/CNS guidelines: **surgical decompression is recommended for moderate-severe DCM** (mJOA <15). For mild DCM, supervised rehab OR surgery are both reasonable. [13]\n\n**ED actions:**\n• **MRI cervical spine** — within 24h for moderate-severe symptoms or any progressive deficit\n• **Spine surgery consult** (neurosurg or ortho spine)\n• Avoid further trauma — no high-impact activity, no neck manipulation, no extreme positioning\n• Pain control as for radiculopathy (NSAIDs, gaba)\n• Document baseline neuro exam thoroughly — medicolegally important\n\n**When to admit:**\n• Rapidly progressive symptoms\n• Severe gait dysfunction or falls risk\n• New sphincter dysfunction\n• Severe myelopathy (mJOA ≤11)\n• Acute-on-chronic with new neuro deficit\n\n**When outpatient is acceptable:**\n• Mild stable symptoms, reliable patient, spine clinic follow-up within 1-2 weeks, clear precautions\n\n**Counsel the patient:**\n• "Cord irritation that won\'t heal on its own — the goal is to stop progression"\n• Falls precautions\n• Return immediately for: new weakness, urinary changes, worsening gait, new bilateral symptoms',
        citation: [13],
        next: 'csnt-cord-syndromes',
        summary: 'Mod-severe mJOA <15 = surgery — admit if rapid progression',
    },
    {
        id: 'csnt-cord-syndromes',
        type: 'info',
        module: 4,
        title: 'Cord Syndromes (Non-Traumatic Context)',
        body: 'These patterns are most associated with trauma but DO occur from non-traumatic causes (degenerative stenosis decompensation, tumor, abscess, AVM, infarct, MS).\n\n**1. Central Cord Syndrome**\n• **Most common** non-traumatic incomplete cord syndrome\n• Older patient + degenerative cervical stenosis + minor extension event (or progressive degenerative compression)\n• **Arms > legs weakness**, bladder dysfunction, variable sensory loss\n• Hands often more affected than proximal arm muscles\n• MRI shows central cord T2 signal change\n• Surgical decompression typically delayed but indicated\n\n**2. Brown-Séquard Syndrome**\n• Hemisection of cord (penetrating trauma classic, but also tumor, MS, hemorrhage)\n• **Ipsilateral** motor (corticospinal) and proprioception/vibration (dorsal column) loss\n• **Contralateral** pain/temperature loss (spinothalamic — crosses near entry)\n• Better prognosis than complete or central cord\n\n**3. Anterior Cord Syndrome**\n• Anterior spinal artery infarct, large central disc herniation\n• Loss of motor + pain/temperature BELOW lesion, **preserved** proprioception/vibration\n• Worst prognosis of incomplete syndromes\n\n**4. Posterior Cord Syndrome (rare)**\n• Loss of vibration/proprioception with preserved motor\n• B12 deficiency, syphilis (tabes), MS, posterior spinal artery stroke\n\n**ED principles for ALL cord syndromes:**\n• MRI cord (with contrast if infection/tumor/MS in differential)\n• Neurosurgery / neurology consult\n• Maintain spinal precautions until cleared\n• Mean arterial pressure (MAP) goal **>85 mmHg** for first 7 days in acute cord injury (extrapolated from traumatic SCI; controversial in non-traumatic but reasonable)\n• Avoid hypotension, hypoxia, hyperthermia (secondary injury)\n• Steroids: NOT routinely recommended in non-traumatic cord syndromes outside specific indications (MSCC → yes; demyelinating → high-dose methylpred per neurology)',
        citation: [13, 15],
        next: 'csnt-distinguisher',
        summary: 'Central=arms>legs, BS=ipsi motor/contra pain, anterior=motor+pain spared dorsal',
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 5: RADICULOPATHY vs MYELOPATHY DISTINGUISHER
    // =====================================================================
    {
        id: 'csnt-distinguisher',
        type: 'info',
        module: 5,
        title: 'Radiculopathy vs Myelopathy — Side by Side',
        body: '**The single most important distinction in the ED workup of neck pain with neuro symptoms.**\n\n| Feature | Radiculopathy | Myelopathy |\n|---------|--------------|-----------|\n| **Distribution** | Single arm, dermatomal | Bilateral arms ± legs, non-dermatomal |\n| **Pain** | Severe, sharp, radiating | Often mild or absent neck pain |\n| **Motor signs** | LMN — weakness, atrophy in myotome | UMN — spasticity, hyperreflexia |\n| **Reflexes** | Diminished or absent (in affected root) | Brisk, clonus |\n| **Hoffman** | Negative | Positive (esp asymmetric) |\n| **Lhermitte** | Negative | Positive |\n| **Gait** | Normal | Spastic, broad-based, falls |\n| **Hand function** | Weakness in myotome | Clumsiness, dropping things bilaterally |\n| **Sphincters** | Spared | May be affected (late) |\n| **Sensory level** | Dermatomal patch | Sensory level on trunk |\n| **Babinski** | Negative | Positive |\n| **Imaging** | Foraminal stenosis, lateral disc | Central stenosis, cord signal change |\n| **ED urgency** | Routine — 80% resolve in 6 weeks | Emergent — surgery if mod-severe |\n\n**Mixed presentations exist** (myeloradiculopathy) and are common in older patients with multilevel spondylosis — treat as myelopathy for imaging and urgency. [9][13]\n\n**Bottom line:**\n• **One arm, dermatomal, LMN, dec reflexes** = radic — usually outpatient\n• **Bilateral, UMN signs, gait change, hand clumsiness** = myelo — image now',
        citation: [9, 13],
        next: 'csnt-disposition',
        summary: 'One arm LMN = radic outpt; bilateral UMN gait = myelo image now',
    },
    // =====================================================================
    // MODULE 6: IMAGING DECISION AID
    // =====================================================================
    {
        id: 'csnt-imaging-decision',
        type: 'info',
        module: 6,
        title: 'Imaging Decision Aid (ACR Appropriateness)',
        body: 'Based on **ACR Appropriateness Criteria 2022** for cervical neck pain and cervical radiculopathy. [16]\n\n**MRI cervical spine — EMERGENT (same visit):**\n• Myelopathy (any UMN signs)\n• Progressive motor deficit\n• Suspected infection (use contrast)\n• Suspected malignancy / MSCC (use contrast, image whole spine)\n• Cauda equina-like presentation if lumbar (different consult)\n• Acute severe radiculopathy with significant motor weakness\n\n**MRI cervical spine — URGENT (within 1-2 weeks, can arrange from ED):**\n• Radicular symptoms >6 weeks despite conservative care\n• Progressive sensory symptoms\n• Pre-operative planning by spine surgery\n\n**CTA / MRA neck — URGENT:**\n• Suspected vertebral artery dissection (sudden posterior HA, post-manipulation, posterior circ signs)\n• Use CTA in ED (more available, faster)\n\n**CT cervical spine — limited role in non-traumatic:**\n• If MRI contraindicated (pacemaker, cochlear implant) and bony detail needed\n• RA with concern for AAS (paired with flex/ext XR)\n\n**XR cervical spine — limited role:**\n• Flex/ext views for RA atlantoaxial subluxation\n• Suspected ank spond / fused spine fracture screening (low threshold for CT)\n• Generally NOT needed for routine mechanical neck pain\n\n**No imaging needed:**\n• Mechanical/myofascial neck pain <6 weeks\n• No red flags\n• No neuro deficit\n• Normal exam\n\n**Cost / radiation considerations:**\n• XR series: minimal radiation but low yield without specific indication\n• CT: ~6 mSv (similar to 2 years background)\n• MRI: no radiation, best soft tissue / cord detail\n\n**Avoid:** routine XR for uncomplicated mechanical neck pain — does not change management and rarely shows actionable pathology [16]',
        citation: [16],
        next: 'csnt-disposition',
        summary: 'MRI emergent: myelopathy/infection/cancer — none for mech <6wk no red flags',
        skippable: true,
    },
    // =====================================================================
    // MODULE 7: MECHANICAL / MYOFASCIAL
    // =====================================================================
    {
        id: 'csnt-mech-start',
        type: 'info',
        module: 7,
        title: 'Mechanical / Myofascial Neck Pain',
        body: '**The most common diagnosis (~85%) and the most common dump diagnosis.** Make it AFTER excluding red flags and radicular/myelopathic features — not before. [1][2]\n\n**Typical pattern:**\n• Axial neck pain ± referred trapezius / interscapular pain\n• Worse with prolonged posture (driving, screen work), better with rest and gentle activity\n• No dermatomal radiation, no UMN signs\n• Normal neuro exam\n• Often associated with stress, sleep posture, sustained flexion\n\n**Differential includes:**\n• Cervical strain (muscular)\n• Facet joint pain (extension and rotation worsens)\n• Myofascial pain syndrome (trigger points)\n• Cervicogenic headache (occipital, with C2-3 involvement)\n• Tension-type headache with neck component\n\n**Workup in the ED:**\n• Focused neuro exam to confirm normal\n• No imaging required\n• Counsel patient that imaging would NOT change management for the first 6 weeks and most asymptomatic adults have degenerative changes on cervical MRI [1]\n\n**Treatment:**\n• **First-line:**\n  - [Naproxen](#/drug/naproxen/MSK) 500 mg BID OR [Ibuprofen](#/drug/ibuprofen/MSK) 600 mg TID with food\n  - [Acetaminophen](#/drug/acetaminophen/MSK) 1 g q6h scheduled\n  - Topical [Diclofenac](#/drug/diclofenac/MSK) 1% gel q6h locally\n• **If significant spasm:** short course (5-7 days max):\n  - [Tizanidine](#/drug/tizanidine/MSK) 2-4 mg PO TID OR\n  - [Cyclobenzaprine](#/drug/cyclobenzaprine/MSK) 5-10 mg PO TID (sedating)\n• **Heat / ice** as preferred, gentle ROM as tolerated\n• **No bed rest** — early gentle activity improves outcomes\n• **Soft collar** is NOT recommended for routine mechanical pain (worsens outcomes)\n• **Trigger point injection** with [Lidocaine](#/drug/lidocaine/MSK) 1% can be considered if isolated tender point\n\n**Avoid:**\n• Opioids — minimal benefit, harm risk, dependence\n• Long courses of muscle relaxants\n• Routine imaging\n• Aggressive manipulation (esp in older patients — VAD risk)\n\n**Follow-up:**\n• PCP or PT within 1-2 weeks if not improving\n• Return precautions: new arm weakness, bowel/bladder change, gait change, bilateral symptoms, fever',
        citation: [1, 2],
        next: 'csnt-disposition',
        summary: 'Diagnosis of exclusion — NSAIDs + APAP + gentle ROM, no collar, no opioids',
    },
    // =====================================================================
    // MODULE 8: DISPOSITION
    // =====================================================================
    {
        id: 'csnt-disposition',
        type: 'question',
        module: 8,
        title: 'Disposition',
        body: '**Where does this patient go?**',
        options: [
            { label: 'OR / Emergent surgery', description: 'MSCC, large abscess with deficit, severe progressive myelopathy', next: 'csnt-disp-surgery', urgency: 'critical' },
            { label: 'Admit — Neurosurgery / Medicine', description: 'Infection, severe myelopathy, VAD, RA AAS with new signs', next: 'csnt-disp-admit' },
            { label: 'Discharge with urgent spine clinic', description: 'Radiculopathy with stable deficit, suspected DCM, mod symptoms', next: 'csnt-disp-urgent-fu' },
            { label: 'Discharge with PCP / PT follow-up', description: 'Mechanical pain, mild stable radiculopathy, no red flags', next: 'csnt-disp-routine' },
        ],
        citation: [1],
        summary: 'Surgery / admit / urgent FU / routine FU — match severity',
    },
    {
        id: 'csnt-disp-surgery',
        type: 'result',
        module: 8,
        title: 'Emergent Surgical Disposition',
        body: '**Indications:**\n• MSCC with neuro deficit (after starting dexamethasone)\n• Spinal epidural abscess with neuro deficit\n• Severe rapidly progressive myelopathy\n• RA AAS with new cord signs needing airway protection\n\n**Pre-op:**\n• MRI complete (or in progress)\n• Empiric antibiotics if infection\n• Dexamethasone if MSCC\n• Foley if needed\n• NPO\n• Reverse anticoagulation per [Anticoagulation Reversal](#/tree/anticoag-reversal) consult if on DOAC/warfarin\n• MAP goal >85 if cord injury\n• Type and cross 2 units\n• Direct MD-MD handoff to accepting surgeon',
        recommendation: 'Emergent OR. Start dex if MSCC. Empiric abx if infection. Direct MD-MD handoff.',
        citation: [3, 5],
        summary: 'OR + dex/abx + MAP>85 + MD-MD handoff',
    },
    {
        id: 'csnt-disp-admit',
        type: 'result',
        module: 8,
        title: 'Admit — Neurosurgery or Medicine',
        body: '**Indications:**\n• Spinal infection (any deficit or signs of sepsis)\n• Moderate-severe DCM with stable but progressive symptoms\n• Vertebral artery dissection (telemetry + stroke workup)\n• Severe radiculopathy with deficit needing further workup\n• MSCC without immediate surgical indication (radiation pathway)\n\n**Admission orders:**\n• Telemetry if VAD or stroke risk\n• Serial neuro exams q4h (or more frequent if progressing)\n• MRI complete\n• Specialty consult: neurosurg, ortho spine, neurology, oncology as indicated\n• Pain control multimodal\n• DVT prophylaxis (mechanical if bleeding concern, pharmacologic per attending)\n• Foley if cord dysfunction\n• PT/OT consult once cleared',
        recommendation: 'Admit to monitored bed. Serial neuro exams q4h. Specialty consult. MRI complete.',
        citation: [3, 13],
        summary: 'Admit + tele + q4h neuro + specialty + MRI',
    },
    {
        id: 'csnt-disp-urgent-fu',
        type: 'result',
        module: 8,
        title: 'Discharge with Urgent Spine Clinic Follow-up',
        body: '**Indications:**\n• Cervical radiculopathy with stable but bothersome deficit\n• Suspected mild DCM (positive Hoffman alone, no functional impairment)\n• Refractory pain after 4-6 weeks\n• Patient prefers conservative trial first\n\n**Discharge package:**\n• MRI scheduled if not done in ED (within 1-2 weeks)\n• Spine clinic appointment within 1-2 weeks (book before discharge if possible)\n• Multimodal pain plan (NSAIDs + APAP + gabapentin if neuropathic)\n• 3-day opioid bridge only if severe; explicit limit\n• PT referral\n• Activity modification — no heavy lifting, no manipulation\n\n**Strict return precautions (give in writing):**\n• 🚨 New weakness in either arm or leg\n• 🚨 Loss of bladder or bowel control\n• 🚨 New numbness in groin or perineum\n• 🚨 Worsening gait, balance, or falls\n• 🚨 Bilateral arm or leg symptoms\n• 🚨 Fever or new severe pain\n• 🚨 Hand clumsiness or dropping things\n\nDocument verbal AND written instructions given.',
        recommendation: 'Discharge with MRI scheduled, spine clinic <2 weeks, written red flag instructions. Multimodal pain.',
        citation: [9, 13],
        summary: 'D/C + MRI + spine clinic <2 wk + written red flags',
    },
    {
        id: 'csnt-disp-routine',
        type: 'result',
        module: 8,
        title: 'Discharge — Routine Follow-up',
        body: '**Criteria (ALL must be present):**\n• ✅ No red flags after thorough screen\n• ✅ Normal neuro exam (no UMN signs, no focal deficit)\n• ✅ Mechanical / myofascial pattern\n• ✅ Symptoms <6 weeks\n• ✅ Patient understands return precautions\n\n**Discharge package:**\n• [Naproxen](#/drug/naproxen/MSK) or [Ibuprofen](#/drug/ibuprofen/MSK) scheduled with food\n• [Acetaminophen](#/drug/acetaminophen/MSK) scheduled\n• Topical NSAID if helpful\n• 5-7 day muscle relaxant if significant spasm (warn re sedation, no driving)\n• Heat / ice as preferred\n• Gentle activity, avoid prolonged static posture\n• NO soft collar (worsens outcomes)\n• NO opioids unless very severe and brief\n• PCP follow-up in 1-2 weeks if not improving\n• PT referral if persistent\n\n**Counsel:**\n• Expected course: most cases improve in 2-4 weeks\n• Imaging is NOT recommended now — would not change treatment\n• If imaging is obtained, abnormal findings (degenerative changes) are common in asymptomatic people and can lead to unnecessary worry\n\n**Return precautions (verbal + written):**\n• New arm weakness or numbness\n• Bowel/bladder changes\n• Gait change or hand clumsiness\n• Fever\n• Severe headache (especially posterior)\n• Pain worse despite treatment',
        recommendation: 'Discharge home. Multimodal pain. PCP follow-up 1-2 weeks. Written return precautions.',
        citation: [1, 2],
        summary: 'Mech + normal exam + <6 wk = home with NSAIDs + APAP + PCP fu',
    },
    {
        id: 'csnt-pitfalls',
        type: 'info',
        module: 8,
        title: 'Common ED Pitfalls',
        body: '**The misses that hurt:**\n\n| Pitfall | Fix |\n|---|---|\n| "Just mechanical" without screening red flags | Always ask: fever, IVDU, cancer hx, RA, sudden onset, posterior HA |\n| Sending RA patient to floor for intubation | Flex/ext XR first, awake fiberoptic if any AAS concern |\n| Missing posterior HA + neck pain as VAD | Age <50 + posterior HA = CTA neck; ask about manipulation |\n| Calling bilateral hand clumsiness "carpal tunnel" | Check Hoffman, gait, reflexes — myelopathy often missed for years |\n| Normal ESR/CRP excludes abscess | Sensitivity 94-100% only when BOTH elevated; very early or partial-treated cases can have normal values [4] |\n| WBC normal means no infection | WBC is normal in ~30% of SEA |\n| Routine XR for mechanical pain | Low yield, exposes radiation, can mislead |\n| Long-term soft collar | Worsens outcomes; max 1-2 weeks |\n| Cancer patient labeled "musculoskeletal" | Any new severe pain in cancer = MRI whole spine + start dex |\n| Discharging myelopathy patient | Even "mild" Hoffman+gait change needs MRI + spine consult |',
        citation: [1, 3, 13],
        next: 'csnt-start',
        summary: 'Top misses: RA AAS, VAD, abscess (normal labs), myelopathy as carpal',
        skippable: true,
    },
];
export const CERVICAL_SPINE_NONTRAUMATIC_MODULE_LABELS = [
    'Triage & Pattern Recognition',
    'Red Flag Workup',
    'Radiculopathy',
    'Myelopathy & Cord Syndromes',
    'Radiculopathy vs Myelopathy',
    'Imaging Decision Aid',
    'Mechanical / Myofascial',
    'Disposition & Pitfalls',
];
export const CERVICAL_SPINE_NONTRAUMATIC_CITATIONS = [
    { num: 1, text: 'Cohen SP, Hooten WM. Advances in the diagnosis and management of neck pain. BMJ. 2017;358:j3221.' },
    { num: 2, text: 'Hogg-Johnson S, et al. The burden and determinants of neck pain in the general population. Spine. 2008;33(4 Suppl):S39-S51.' },
    { num: 3, text: 'Darouiche RO. Spinal epidural abscess. N Engl J Med. 2006;355(19):2012-2020 (updated reviews 2022-2024).' },
    { num: 4, text: 'Davis DP, et al. The clinical presentation and impact of diagnostic delays on emergency department patients with spinal epidural abscess. J Emerg Med. 2004;26(3):285-291 + Bhise et al. Diagnostic accuracy of ESR/CRP for SEA. 2018.' },
    { num: 5, text: 'Cole JS, Patchell RA. Metastatic epidural spinal cord compression. Lancet Neurol. 2008;7(5):459-466. NICE CG75 + ASCO 2024.' },
    { num: 6, text: 'Engelter ST, et al. Aspirin versus anticoagulation in cervical artery dissection (CADISS / TREAT-CAD). Lancet Neurol. 2015 + 2021.' },
    { num: 7, text: 'Joaquim AF, et al. Cervical spine involvement in rheumatoid arthritis - a systematic review. Autoimmun Rev. 2014;13(12):1195-1202.' },
    { num: 8, text: 'Rudwaleit M, et al. The development of Assessment of SpondyloArthritis international Society classification criteria for axial spondyloarthritis. Ann Rheum Dis. 2009;68(6):777-783.' },
    { num: 9, text: 'Iyer S, Kim HJ. Cervical radiculopathy. Curr Rev Musculoskelet Med. 2016;9(3):272-280.' },
    { num: 10, text: 'Magee DJ. Orthopedic Physical Assessment. 7th ed. Elsevier, 2021 (dermatome/myotome tables).' },
    { num: 11, text: 'Tong HC, Haig AJ, Yamakawa K. The Spurling test and cervical radiculopathy. Spine. 2002;27(2):156-159 + Wainner et al. Reliability and diagnostic accuracy of the clinical examination and patient self-report measures for cervical radiculopathy. Spine. 2003.' },
    { num: 12, text: 'Goldberg H, et al. Oral steroids for acute radiculopathy due to a herniated lumbar disk: a randomized clinical trial. JAMA. 2015;313(19):1915-1923 (extrapolated to cervical).' },
    { num: 13, text: 'Fehlings MG, et al. A clinical practice guideline for the management of patients with degenerative cervical myelopathy. Global Spine J. 2017;7(3 Suppl):70S-83S.' },
    { num: 14, text: 'Cook C, Roman M, Stewart ML, et al. Reliability and diagnostic accuracy of clinical special tests for myelopathy in patients seen for cervical dysfunction. J Orthop Sports Phys Ther. 2009;39(3):172-178 (Hoffman sign).' },
    { num: 15, text: 'McKinley W, Santos K, Meade M, Brooke K. Incidence and outcomes of spinal cord injury clinical syndromes. J Spinal Cord Med. 2007;30(3):215-224.' },
    { num: 16, text: 'ACR Appropriateness Criteria. Cervical Neck Pain or Cervical Radiculopathy. American College of Radiology. 2022 update.' },
];
