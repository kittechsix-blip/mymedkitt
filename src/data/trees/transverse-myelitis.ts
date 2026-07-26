// MedKitt - Acute Transverse Myelitis (ATM)
// Recognition -> EXCLUDE COMPRESSION (root gate) -> Inflammatory Workup -> Diagnostic Criteria -> Etiology -> Treatment -> Differential/Mimics -> Disposition & Prognosis
// 8 modules. The single most important ED action: emergent MRI to exclude COMPRESSIVE myelopathy before calling it "inflammatory."

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const TRANSVERSE_MYELITIS_CRITICAL_ACTIONS = [
  { text: 'EMERGENT MRI (whole spine, with + without gad) to exclude COMPRESSIVE myelopathy FIRST', nodeId: 'tm-mri-gate' },
  { text: 'Establish a sensory level — the clinical hallmark of a cord lesion', nodeId: 'tm-presentation' },
  { text: 'Assess for urinary retention (post-void residual) — early autonomic sign', nodeId: 'tm-presentation' },
  { text: 'LP (cells, protein, oligoclonal bands, IgG index) + serum AQP4-IgG and MOG-IgG', nodeId: 'tm-workup' },
  { text: 'IV methylprednisolone 1 g/day x 3-5 days once compression excluded and infection considered', nodeId: 'tm-treatment' },
  { text: 'Plasma exchange (PLEX) for steroid-refractory or severe NMOSD-related ATM', nodeId: 'tm-treatment' },
  { text: 'Neurology + (if cord lesion) neurosurgery consult; admit all acute myelopathy', nodeId: 'tm-disposition' },
];

export const TRANSVERSE_MYELITIS_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: RECOGNITION
  // =====================================================================

  {
    id: 'tm-start',
    type: 'info',
    module: 1,
    title: 'Acute Transverse Myelitis',
    body: '**Transverse myelitis (TM)** is an acute inflammatory disorder of the spinal cord producing a band of motor, sensory, and autonomic dysfunction below the lesion. "Transverse" = across the cord at one or more segments.\n\n**The triad that says "this is the cord":**\n- **Bilateral** motor weakness (para- or quadriparesis)\n- A **sensory level** — a horizontal line below which sensation changes\n- **Sphincter/autonomic** dysfunction (urinary retention is early and common)\n\n**Tempo:** progresses over hours to 21 days, nadir typically 4 hours to a few days. Faster than GBS climbs, but unlike stroke it is not maximal at onset.\n\n**The ED job is NOT to confirm inflammation — it is to EXCLUDE COMPRESSION.** A compressive myelopathy (epidural abscess, hematoma, tumor, disc) looks identical and is a neurosurgical emergency. Get the MRI first.',
    images: [{
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" font-family="sans-serif">'
        + '<rect width="420" height="260" fill="#0f172a"/>'
        + '<text x="210" y="26" fill="#e2e8f0" font-size="16" font-weight="bold" text-anchor="middle">Sensory Level — the cord hallmark</text>'
        + '<ellipse cx="120" cy="60" rx="26" ry="30" fill="#1e293b" stroke="#64748b"/>'
        + '<rect x="104" y="86" width="32" height="120" rx="10" fill="#1e293b" stroke="#64748b"/>'
        + '<line x1="70" y1="140" x2="170" y2="140" stroke="#f87171" stroke-width="3" stroke-dasharray="6 4"/>'
        + '<text x="178" y="135" fill="#f87171" font-size="12">sensory level (e.g. T6)</text>'
        + '<text x="178" y="150" fill="#94a3b8" font-size="11">normal ABOVE</text>'
        + '<text x="178" y="178" fill="#94a3b8" font-size="11">numb / weak BELOW</text>'
        + '<rect x="300" y="40" width="100" height="180" rx="8" fill="#1e293b" stroke="#64748b"/>'
        + '<text x="350" y="62" fill="#e2e8f0" font-size="12" font-weight="bold" text-anchor="middle">Cord cross-section</text>'
        + '<path d="M350 90 q-30 20 0 40 q30 -20 0 -40" fill="#334155" stroke="#94a3b8"/>'
        + '<circle cx="350" cy="110" r="22" fill="none" stroke="#fbbf24" stroke-width="2"/>'
        + '<text x="350" y="160" fill="#fbbf24" font-size="10" text-anchor="middle">inflammation</text>'
        + '<text x="350" y="174" fill="#fbbf24" font-size="10" text-anchor="middle">across cord</text>'
        + '</svg>'),
      alt: 'Schematic of a sensory level: normal sensation above a horizontal line on the trunk, impaired below, with an inflamed spinal cord cross-section.',
      caption: 'A sensory level localizes the lesion to the cord. Map it on the trunk and check for urinary retention. (Original schematic, no license restriction.)'
    }],
    citation: [1, 2],
    next: 'tm-presentation',
    summary: 'Acute cord inflammation: bilateral weakness + sensory level + sphincter dysfunction. ED job = exclude compression first.',
  },

  {
    id: 'tm-presentation',
    type: 'question',
    module: 1,
    title: 'Clinical Presentation & Localization',
    body: '**Map the deficit:**\n- **Sensory level** — test pinprick/temperature ascending up the trunk until it normalizes; that dermatome localizes the lesion (thoracic most common).\n- **Weakness** — bilateral, often initially flaccid (spinal shock) then spastic with hyperreflexia + Babinski over days.\n- **Bladder/bowel** — urinary retention or incontinence; **always check a post-void residual.**\n- **Back pain** at the level in ~one third.\n\n**What pushes you toward URGENT structural cause (get MRI now):**\n- Severe focal back pain, fever, immunosuppression, IVDU → epidural **abscess**\n- Anticoagulation, recent procedure → epidural **hematoma**\n- Known cancer, weight loss → **metastatic compression**\n- Saddle anesthesia + retention + areflexia → **cauda equina**\n\nEvery one of these is a neurosurgical clock. The next step is the same for all: image the cord.',
    citation: [1, 2, 13],
    options: [
      {
        label: 'Bilateral weakness + sensory level ± retention',
        description: 'Classic acute myelopathy picture',
        next: 'tm-mri-gate',
        urgency: 'critical',
      },
      {
        label: 'Red flags for compression (fever/IVDU, anticoag, known cancer, saddle)',
        description: 'Possible abscess / hematoma / mets / cauda equina',
        next: 'tm-mri-gate',
        urgency: 'critical',
      },
    ],
    summary: 'Establish sensory level + post-void residual. Any compression red flag → MRI now.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 2: THE ROOT GATE — EXCLUDE COMPRESSION
  // =====================================================================

  {
    id: 'tm-mri-gate',
    type: 'question',
    module: 2,
    title: 'ROOT GATE: Emergent MRI to Exclude Compression',
    body: '**This is the decision the whole consult hinges on.** Transverse myelitis is a diagnosis of exclusion — you cannot call cord dysfunction "inflammatory" until you have ruled out a surgically correctable compressive lesion.\n\n**Order: MRI of the spinal cord, WITH and WITHOUT gadolinium.**\n- Image the clinically suspected level **plus the whole cord** — multifocal disease and skip lesions are common, and a cervical lesion can present with a thoracic-feeling level.\n- If MRI is unavailable, CT myelography is the fallback to exclude compression.\n- Do NOT delay imaging for the LP. Compression first.\n\n**What you are hunting:** epidural abscess, hematoma, tumor/metastasis, herniated disc, or severe stenosis pressing on the cord.',
    images: [{
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 240" font-family="sans-serif">'
        + '<rect width="440" height="240" fill="#0f172a"/>'
        + '<text x="220" y="24" fill="#e2e8f0" font-size="15" font-weight="bold" text-anchor="middle">MRI cord: compressive vs. intrinsic</text>'
        + '<text x="110" y="52" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">COMPRESSIVE (surgical)</text>'
        + '<rect x="70" y="60" width="80" height="150" rx="10" fill="#1e293b" stroke="#64748b"/>'
        + '<ellipse cx="110" cy="135" rx="16" ry="40" fill="#334155" stroke="#94a3b8"/>'
        + '<path d="M70 120 q20 15 38 0" fill="#ef4444" opacity="0.8"/>'
        + '<text x="110" y="118" fill="#fca5a5" font-size="9" text-anchor="middle">mass/abscess</text>'
        + '<text x="110" y="225" fill="#94a3b8" font-size="9" text-anchor="middle">cord pushed/displaced</text>'
        + '<text x="330" y="52" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">INTRINSIC (inflammatory)</text>'
        + '<rect x="290" y="60" width="80" height="150" rx="10" fill="#1e293b" stroke="#64748b"/>'
        + '<ellipse cx="330" cy="135" rx="16" ry="40" fill="#334155" stroke="#94a3b8"/>'
        + '<ellipse cx="330" cy="135" rx="8" ry="26" fill="#fbbf24" opacity="0.85"/>'
        + '<text x="330" y="225" fill="#94a3b8" font-size="9" text-anchor="middle">T2 signal WITHIN cord</text>'
        + '</svg>'),
      alt: 'Side-by-side schematic: compressive lesion displacing the cord versus intrinsic T2 signal within the cord.',
      caption: 'Compression displaces the cord (surgical); intrinsic inflammation shows signal within the cord (medical). MRI distinguishes them. (Original schematic.)'
    }],
    citation: [1, 2, 3, 13],
    options: [
      {
        label: 'COMPRESSION found (abscess / hematoma / tumor / disc)',
        description: 'Neurosurgical emergency — NOT transverse myelitis',
        next: 'tm-compression',
        urgency: 'critical',
      },
      {
        label: 'No compression — intrinsic cord T2 signal (or normal early)',
        description: 'Proceed with inflammatory myelopathy workup',
        next: 'tm-workup',
      },
    ],
    summary: 'MRI whole cord with + without gad BEFORE LP. Compression = surgery; intrinsic signal = inflammatory workup.',
    safetyLevel: 'critical',
  },

  {
    id: 'tm-compression',
    type: 'result',
    module: 2,
    title: 'Compressive Myelopathy — Off-Ramp',
    body: '**This is not transverse myelitis. This is a surgical spinal emergency.**\n\n**Immediate actions by lesion:**\n- **Epidural abscess** — blood cultures, broad-spectrum abx covering MRSA (vancomycin) + gram-negatives; emergent neurosurgery for decompression. Do NOT wait for cultures.\n- **Epidural hematoma** — reverse anticoagulation, emergent neurosurgery.\n- **Metastatic cord compression** — dexamethasone 10 mg IV then 4 mg q6h, emergent radiation-oncology + neurosurgery, MRI whole spine for other deposits.\n- **Cauda equina** — emergent surgical decompression (best outcomes <48 h).\n\n**Time is cord.** Neurologic recovery tracks tightly with time to decompression.',
    recommendation: 'Compressive myelopathy is a neurosurgical emergency, not inflammatory myelitis. Consult neurosurgery immediately. For abscess: empiric vancomycin + gram-negative coverage and source control. For mets: high-dose dexamethasone + rad-onc. Do not give high-dose steroids for presumed inflammation until compression and infection are addressed.',
    confidence: 'definitive',
    citation: [1, 12, 13],
    summary: 'Compression = surgical emergency. Abscess → abx + decompress; hematoma → reverse + decompress; mets → dex + rad-onc.',
    safetyLevel: 'critical',
  },

  // =====================================================================
  // MODULE 3: INFLAMMATORY WORKUP
  // =====================================================================

  {
    id: 'tm-workup',
    type: 'info',
    module: 3,
    title: 'Inflammatory Workup (after compression excluded)',
    body: '**CSF (LP):**\n- Cell count + differential (pleocytosis supports inflammation; >50 lymphocytes seen in MS/idiopathic, neutrophils suggest infection)\n- Protein (often elevated)\n- Oligoclonal bands + IgG index (positive favors MS)\n- Infectious studies as indicated: HSV/VZV PCR, enterovirus, VDRL\n\n**Serum (the antibody triad reframes the disease):**\n- **AQP4-IgG** (aquaporin-4) — neuromyelitis optica spectrum disorder (NMOSD); think longitudinally extensive lesion (≥3 vertebral segments)\n- **MOG-IgG** — MOG antibody-associated disease (MOGAD)\n- B12, folate, copper, HIV, RPR, ANA/dsDNA, SS-A/SS-B, ESR/CRP\n\n**MRI brain** — screen for demyelinating lesions (MS conversion risk).\n\n**Why bother in the ED:** AQP4/MOG status changes acute therapy (lower threshold for PLEX) and the long-term immunosuppression plan.',
    citation: [1, 2, 4, 5],
    next: 'tm-criteria-node',
    summary: 'LP (cells, protein, OCB) + serum AQP4-IgG, MOG-IgG, B12/HIV/RPR, plus MRI brain. Antibody status changes therapy.',
  },

  {
    id: 'tm-criteria-node',
    type: 'info',
    module: 3,
    title: 'Transverse Myelitis Consortium Criteria (2002)',
    body: '**Transverse Myelitis Consortium Working Group (2002)** — the operational standard for idiopathic ATM.\n\n**INCLUSION (all required):**\n1. Bilateral (not necessarily symmetric) sensory, motor, or autonomic dysfunction attributable to the cord\n2. A clearly defined **sensory level**\n3. Inflammation: CSF pleocytosis or elevated IgG index, **or** gadolinium enhancement on MRI (if absent initially, repeat 2-7 days later)\n4. Progression to nadir between **4 hours and 21 days**\n\n**EXCLUSION:**\n- Prior radiation to the spine within 10 years\n- Clear arterial distribution deficit (anterior spinal artery infarct)\n- Abnormal flow voids on MRI (AV malformation)\n- Compression on imaging\n\n**Note on nomenclature:** the 2002 criteria remain the operational ED/neurology standard, but many cases now reclassify as NMOSD (AQP4), MOGAD, or MS once antibodies/imaging return — "idiopathic TM" is a shrinking bucket.',
    citation: [4, 5],
    next: 'tm-etiology',
    summary: '2002 criteria: bilateral cord signs + sensory level + inflammation + nadir 4h-21d; exclude compression/infarct/AVM/radiation.',
  },

  // =====================================================================
  // MODULE 4: ETIOLOGY
  // =====================================================================

  {
    id: 'tm-etiology',
    type: 'info',
    module: 4,
    title: 'Etiology Buckets',
    body: '**Classify the cause — it drives long-term treatment:**\n\n**Demyelinating / autoimmune**\n- Multiple sclerosis (usually short-segment, <2 segments, partial)\n- NMOSD (AQP4-IgG; longitudinally extensive, ≥3 segments)\n- MOGAD (MOG-IgG; often LETM, conus involvement, better recovery)\n\n**Parainfectious / post-infectious** (commonest in kids)\n- After viral illness or vaccination — immune-mediated\n\n**Direct infection**\n- HSV, VZV, enterovirus (incl. AFM in children), HIV, syphilis, West Nile, TB\n\n**Systemic autoimmune**\n- SLE, Sjögren, sarcoidosis, Behçet, antiphospholipid syndrome\n\n**Paraneoplastic** (rare) — anti-CRMP5, amphiphysin\n\n**Idiopathic** — after the above are excluded.\n\n**Lesion length is a fast clue:** short central lesion → think MS; longitudinally extensive (≥3 segments) → think NMOSD/MOGAD/sarcoid/infection.',
    citation: [2, 4, 5, 6, 7],
    next: 'tm-treatment',
    summary: 'Buckets: demyelinating (MS/NMOSD/MOGAD), para/post-infectious, direct infection, systemic autoimmune, paraneoplastic, idiopathic. Lesion length triages MS vs NMOSD.',
  },

  // =====================================================================
  // MODULE 5: TREATMENT
  // =====================================================================

  {
    id: 'tm-treatment',
    type: 'info',
    module: 5,
    title: 'Acute Treatment',
    body: '**First line — high-dose IV corticosteroids:**\n- **Methylprednisolone 1 g IV daily x 3-5 days** (pediatric 30 mg/kg/day, max 1 g).\n- Start once compression is excluded and active untreated infection is reasonably considered/covered.\n\n**Steroids-before-infection caveat (FLAGGED — confirm locally):** if epidural abscess or active CNS infection (e.g., HSV myelitis) is plausible, treat/cover the infection and discuss timing with neurology/ID before immunosuppressing. For HSV-suspected myelitis, empiric acyclovir is reasonable while awaiting PCR.\n\n**Second line — plasma exchange (PLEX):**\n- 5-7 exchanges over 10-14 days for **steroid-refractory** disease or severe attacks.\n- Lower threshold to start PLEX early in **AQP4+ NMOSD** (responds well to apheresis; earlier PLEX = better outcomes).\n\n**Third line / disease-specific:** IVIG (selected cases, esp. MOGAD/parainfectious), cyclophosphamide or rituximab for severe NMOSD as directed by neurology.\n\n**Supportive:** bladder management (catheter for retention), DVT prophylaxis, pressure-injury prevention, pain control (neuropathic agents), early PT/OT.',
    citation: [1, 2, 5, 8, 14, 15],
    next: 'tm-differential',
    summary: 'IV methylpred 1 g/day x3-5d first line; PLEX for refractory/severe NMOSD (start early if AQP4+). Cover infection before steroids if plausible.',
    safetyLevel: 'warning',
  },

  // =====================================================================
  // MODULE 6: DIFFERENTIAL / MIMICS
  // =====================================================================

  {
    id: 'tm-differential',
    type: 'info',
    module: 6,
    title: 'Differential & Must-Not-Miss Mimics',
    body: '**1. Compressive myelopathy (MUST NOT MISS — already gated above):** abscess, hematoma, tumor, disc. MRI distinguishes. Surgical.\n\n**2. Spinal cord infarct (anterior spinal artery):**\n- **Hyperacute** — maximal at onset / nadir <12 h (vs TM\'s 4h-21d climb)\n- Anterior cord syndrome: motor + spinothalamic loss, dorsal columns spared\n- Often painful at onset; risk factors = aortic disease/surgery, hypotension\n- MRI: "owl-eye"/anterior horn DWI restriction, **absent enhancement** early\n- *Separator:* speed-to-nadir and lack of enhancement; do NOT high-dose steroid an infarct\n\n**3. GBS / AIDP:** ascending, areflexic, **no sensory level**, normal cord MRI, CSF albuminocytologic dissociation. (See Weakness Hub.)\n\n**4. Cauda equina / conus:** saddle anesthesia, retention, lower-motor-neuron legs — surgical if compressive.\n\n**5. Dural AV fistula:** older men, progressive/stepwise, flow voids on MRI — angiography, not steroids.\n\n**6. Subacute combined degeneration (B12):** dorsal column + corticospinal, slower, sensory ataxia — check B12. (See B12 Deficiency consult.)',
    images: [{
      src: 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 200" font-family="sans-serif">'
        + '<rect width="460" height="200" fill="#0f172a"/>'
        + '<text x="230" y="22" fill="#e2e8f0" font-size="14" font-weight="bold" text-anchor="middle">Time-to-nadir separates the mimics</text>'
        + '<line x1="40" y1="120" x2="430" y2="120" stroke="#64748b" stroke-width="2"/>'
        + '<text x="60" y="150" fill="#f87171" font-size="11" text-anchor="middle">seconds-min</text>'
        + '<text x="60" y="138" fill="#f87171" font-size="10" text-anchor="middle">Stroke/infarct</text>'
        + '<circle cx="60" cy="120" r="5" fill="#f87171"/>'
        + '<text x="200" y="100" fill="#fbbf24" font-size="11" text-anchor="middle">hours-21 days</text>'
        + '<text x="200" y="88" fill="#fbbf24" font-size="10" text-anchor="middle">Transverse myelitis</text>'
        + '<circle cx="200" cy="120" r="5" fill="#fbbf24"/>'
        + '<text x="370" y="150" fill="#34d399" font-size="11" text-anchor="middle">weeks-months</text>'
        + '<text x="370" y="138" fill="#34d399" font-size="10" text-anchor="middle">B12 / DAVF / tumor</text>'
        + '<circle cx="370" cy="120" r="5" fill="#34d399"/>'
        + '<text x="230" y="180" fill="#94a3b8" font-size="10" text-anchor="middle">+ sensory level? cord MRI signal? enhancement? CSF?</text>'
        + '</svg>'),
      alt: 'Timeline showing stroke (seconds-minutes), transverse myelitis (hours to 21 days), and B12/DAVF/tumor (weeks to months).',
      caption: 'Tempo is the first triage: hyperacute = infarct, days = TM, weeks = degenerative/compressive. (Original schematic.)'
    }],
    citation: [2, 9, 10, 13],
    next: 'tm-disposition',
    summary: 'Mimics: compression (surgical), cord infarct (nadir <12h, no enhancement), GBS (no level), cauda equina, DAVF, B12. Tempo + MRI + CSF separate them.',
  },

  // =====================================================================
  // MODULE 7: DISPOSITION
  // =====================================================================

  {
    id: 'tm-disposition',
    type: 'info',
    module: 7,
    title: 'Disposition',
    body: '**Admit every acute myelopathy.**\n- Neurology consult for all suspected TM; neurosurgery if any compressive component.\n- **ICU/step-down** if: cervical lesion with respiratory compromise, rapid ascending progression, or autonomic instability.\n- High cervical lesions can impair the diaphragm (C3-5) — monitor respiratory function.\n\n**In-hospital:**\n- Continue IV steroids; arrange PLEX if refractory.\n- Bladder scan + catheter for retention; bowel regimen.\n- DVT prophylaxis, pressure-injury bundle, early rehab consult.\n\n**Discharge planning:** rehab placement, outpatient neurology for disease-modifying therapy (esp. NMOSD/MOGAD/MS), repeat MRI/antibody follow-up.',
    citation: [1, 2, 11],
    next: 'tm-prognosis',
    summary: 'Admit all acute myelopathy. ICU for cervical/respiratory/autonomic risk. Neuro ± neurosurgery; bladder care, DVT ppx, rehab.',
  },

  // =====================================================================
  // MODULE 8: PROGNOSIS
  // =====================================================================

  {
    id: 'tm-prognosis',
    type: 'result',
    module: 8,
    title: 'Prognosis',
    body: '**Rule of thirds (idiopathic ATM):**\n- ~1/3 good/full recovery\n- ~1/3 moderate residual deficit\n- ~1/3 poor recovery / severe disability\n\n**Recovery usually begins within 1-3 months; most gains by 3-6 months,** continuing up to 2 years.\n\n**Worse prognosis:**\n- Rapid progression to nadir / hyperacute onset\n- Complete (vs partial) cord syndrome; spinal shock with flaccidity\n- Longitudinally extensive lesion (LETM), AQP4+ NMOSD\n- Need for ventilation\n\n**Better prognosis:**\n- Partial syndromes, MOGAD, earlier treatment\n\n**Recurrence risk:** idiopathic monophasic TM rarely recurs; recurrence should trigger a hunt for NMOSD/MOGAD/MS and long-term immunosuppression.',
    recommendation: 'Exclude compression with emergent MRI, establish a sensory level and post-void residual, send LP + serum AQP4-IgG/MOG-IgG, and start IV methylprednisolone 1 g/day x 3-5 days once compression is excluded and infection considered/covered. PLEX for refractory or severe NMOSD-related disease (start early if AQP4+). Admit all; ICU for cervical/respiratory/autonomic risk. Recurrence mandates an antibody-driven diagnosis and long-term therapy.',
    confidence: 'recommended',
    citation: [1, 2, 5, 6, 8, 15],
    summary: 'Rule of thirds for recovery; most gains by 3-6 months. LETM/AQP4+/complete syndromes do worse. Recurrence → hunt NMOSD/MOGAD/MS.',
  },

];

export const TRANSVERSE_MYELITIS_NODE_COUNT = TRANSVERSE_MYELITIS_NODES.length;

// -------------------------------------------------------------------
// Module Labels (for progress indicator)
// -------------------------------------------------------------------

export const TRANSVERSE_MYELITIS_MODULE_LABELS = [
  'Recognition',
  'Exclude Compression',
  'Inflammatory Workup',
  'Etiology',
  'Treatment',
  'Differential',
  'Disposition',
  'Prognosis',
];

// -------------------------------------------------------------------
// Evidence Citations
// -------------------------------------------------------------------

export const TRANSVERSE_MYELITIS_CITATIONS: Citation[] = [
  { num: 1, text: 'Beh SC, Greenberg BM, Frohman T, Frohman EM. Transverse Myelitis. Neurol Clin. 2013;31(1):79-138.' },
  { num: 2, text: 'Simone CG, Emmady PD. Transverse Myelitis. StatPearls. Updated 2023.' },
  { num: 3, text: 'Farkas J. Acute Demyelinating Disorders. Internet Book of Critical Care (EMCrit/IBCC). https://emcrit.org/ibcc/myelin/ (see also Spinal Cord: https://emcrit.org/ibcc/cord/)' },
  { num: 4, text: 'Transverse Myelitis Consortium Working Group. Proposed diagnostic criteria and nosology of acute transverse myelitis. Neurology. 2002;59(4):499-505.' },
  { num: 5, text: 'Wingerchuk DM, et al. International consensus diagnostic criteria for neuromyelitis optica spectrum disorders. Neurology. 2015;85(2):177-189.' },
  { num: 6, text: 'Mariano R, Messina S, Kumar K, et al. Comparison of Clinical Outcomes of Transverse Myelitis Among Adults With Myelin Oligodendrocyte Glycoprotein Antibody vs Aquaporin-4 Antibody Disease. JAMA Netw Open. 2019;2(10):e1912732. doi:10.1001/jamanetworkopen.2019.12732' },
  { num: 7, text: 'Goh C, Desmond PM, Phal PM. MRI in transverse myelitis. J Magn Reson Imaging. 2014;40(6):1267-1279. doi:10.1002/jmri.24563' },
  { num: 8, text: 'Greenberg BM, Thomas KP, Krishnan C, Kaplin AI, Calabresi PA, Kerr DA. Idiopathic transverse myelitis: corticosteroids, plasma exchange, or cyclophosphamide. Neurology. 2007;68(19):1614-1617. doi:10.1212/01.wnl.0000260970.63493.c8' },
  { num: 9, text: 'Zalewski NL, Rabinstein AA, Krecke KN, et al. Characteristics of Spontaneous Spinal Cord Infarction and Proposed Diagnostic Criteria. JAMA Neurol. 2019;76(1):56-63.' },
  { num: 10, text: 'Vargas MI, Gariani J, Sztajzel R, et al. Spinal Cord Ischemia: Practical Imaging Tips, Pearls, and Pitfalls. AJNR Am J Neuroradiol. 2015;36(5):825-830. doi:10.3174/ajnr.A4118' },
  { num: 11, text: 'O\'Phelan KH, Bunney EB, Kuluz JW. Emergency Neurologic Life Support: Spinal Cord Compression. Neurocrit Care. 2015;23(Suppl 2):129-135. doi:10.1007/s12028-015-0166-1' },
  { num: 12, text: 'Darouiche RO. Spinal Epidural Abscess. N Engl J Med. 2006;355(19):2012-2020.' },
  { num: 13, text: 'Ropper AE, Ropper AH. Acute Spinal Cord Compression. N Engl J Med. 2017;376(14):1358-1369. doi:10.1056/NEJMra1516539' },
  { num: 14, text: 'Weinshenker BG, O\'Brien PC, Petterson TM, et al. A randomized trial of plasma exchange in acute central nervous system inflammatory demyelinating disease. Ann Neurol. 1999;46(6):878-886. PMID: 10589540' },
  { num: 15, text: 'Bonnan M, Valentino R, Debeugny S, et al. Short delay to initiate plasma exchange is the strongest predictor of outcome in severe attacks of NMO spectrum disorders. J Neurol Neurosurg Psychiatry. 2018;89(4):346-351. doi:10.1136/jnnp-2017-316286' },
];
