// MedKitt — Ring Removal Consult
// Triage → Manual reduction → String-wrap → Cutter picker → Diamond rotary → Post-exam
// Category: Procedures. 6 modules.
// Sources: ALiEM, LITFL, StatPearls NBK459370, Inoue 2009 string-wrap, Mizrahi 2007 ring cutter
export const RING_REMOVAL_MODULE_LABELS = [
    'Triage & Risk',
    'Manual Reduction',
    'String-Wrap Technique',
    'Cutter Selection',
    'Diamond / Rotary',
    'Post-Removal Exam',
];
export const RING_REMOVAL_CITATIONS = [
    { num: 1, text: 'Kingston D, Bopf D. Removal of a Ring From a Swollen Finger. Aust J Gen Pract. 2018;47(4):209-211. PMID: 29621853.' },
    { num: 2, text: 'Inoue S, Akazawa S, Fukuda H, et al. Another simple method of ring removal. Anesthesiology. 1995;83(5):1133-1134. PMID: 7486172.' },
    { num: 3, text: 'Mizrahi S, Lunski I. A simplified method for ring removal from an edematous finger. Am J Surg. 1986;151(3):412-413. PMID: 3953963.' },
    { num: 4, text: 'StatPearls. Ring Removal. NBK459370. Updated 2024.' },
    { num: 5, text: 'Belliappa PP, Mcmurtry RY. Tungsten Carbide Ring Removal. Plast Reconstr Surg. 2006;117(4):1357. PMID: 16582822.' },
    { num: 6, text: 'Kalkan A, et al. Comparison of four different ring removal techniques: a randomized controlled trial. Eur J Emerg Med. 2013;20(5):363-365. PMID: 22914105.' },
    { num: 7, text: 'ALiEM. Tricks of the Trade: Ring Removal Techniques. 2019. Available at aliem.com.' },
    { num: 8, text: 'LITFL. Ring Removal. Life in the Fast Lane. 2020. Available at litfl.com.' },
];
export const RING_REMOVAL_CRITICAL_ACTIONS = [
    { text: 'Assess neurovascular status before AND after removal — document 2-point discrimination + cap refill', nodeId: 'ring-triage' },
    { text: 'Vascular compromise (white, cool, no cap refill) = cut NOW, do not attempt elevation/lube', nodeId: 'ring-vascular' },
    { text: 'Tungsten/ceramic rings need diamond bur, vise-grip crack, or specialty cutter — standard cutter fails', nodeId: 'ring-tungsten' },
    { text: 'String-wrap fails over PIP fracture/laceration — choose cutter', nodeId: 'ring-string-wrap' },
    { text: 'Always assess for occult finger injury (fracture, dislocation) before assuming swelling is benign', nodeId: 'ring-post-exam' },
];
export const RING_REMOVAL_NODES = [
    // =====================================================================
    // MODULE 1: TRIAGE & RISK
    // =====================================================================
    {
        id: 'ring-start',
        type: 'info',
        module: 1,
        title: 'Ring Removal',
        body: '> **First decision: is the finger viable?** Vascular compromise = immediate cut, skip the gentle methods.\n\n**Workflow:**\n1. Triage neurovascular status\n2. Identify ring material (metal grade matters)\n3. Choose technique:\n   • Manual reduction with lube\n   • String / Penrose wrap\n   • Ring cutter (standard or heavy-duty)\n   • Diamond bur / rotary (tungsten, ceramic)\n4. Post-removal NV recheck + injury workup\n\n[Steps Summary](#/info/ring-steps) · [Material Selector](#/info/ring-materials) · [Technique Ladder](#/info/ring-ladder)',
        citation: [1, 4, 8],
        next: 'ring-triage',
        skippable: false,
    },
    {
        id: 'ring-triage',
        type: 'question',
        module: 1,
        title: 'Neurovascular Status?',
        body: 'Examine the digit distal to the ring.',
        options: [
            {
                label: 'WHITE / COOL / no cap refill — ischemic',
                description: 'Vascular compromise — cut NOW',
                next: 'ring-vascular',
                urgency: 'critical',
            },
            {
                label: 'BLUE / dusky — venous congestion',
                description: 'Reversible if acted on soon — gentle methods OK if quick, then escalate',
                next: 'ring-venous',
                urgency: 'urgent',
            },
            {
                label: 'Numb but pink, slow cap refill',
                description: 'Sensory compromise — early ischemia possible',
                next: 'ring-material-check',
                urgency: 'urgent',
            },
            {
                label: 'Pink, warm, normal cap refill — comfortable',
                description: 'Time on your side — try gentle methods first',
                next: 'ring-material-check',
            },
        ],
        summary: 'White/cool = cut now; blue = quick attempt then cut; pink/warm = gentle methods',
    },
    {
        id: 'ring-vascular',
        type: 'result',
        module: 1,
        title: 'Vascular Compromise — CUT NOW',
        body: '> Ischemic finger = ring becomes a tourniquet. Every minute matters. Skip lube and string — proceed directly to cutting.',
        recommendation: '**Immediate actions:**\n1. Elevate hand above heart\n2. Ice pack on dorsum (NOT under ring)\n3. [Digital block](#/info/ring-digital-block) with [lidocaine plain](#/drug/lidocaine/laceration-repair) (epi OK per Prabhakar 2015 but unnecessary)\n4. Choose cutter by [material](#/node/ring-material-check)\n5. Standard ring cutter for gold/silver/aluminum/most steel\n6. **Tungsten / ceramic / titanium-thick** → diamond bur or vise-grip crack method ([details](#/node/ring-tungsten))\n7. Recheck NV every 1-2 min during procedure\n\n**Avoid:**\n• Repeated failed gentle attempts (wastes ischemic minutes)\n• String-wrap (causes more swelling first)\n• Lube alone if already ischemic\n\nAfter removal, jump to [post-exam](#/node/ring-post-exam).',
        citation: [1, 4, 7, 8],
        safetyLevel: 'critical',
    },
    {
        id: 'ring-venous',
        type: 'info',
        module: 1,
        title: 'Venous Congestion — Limited Time',
        body: '**Quick attempt allowed, but bias toward cutting if any doubt.**\n\n**Try (max ~3-5 min):**\n• Elevate × 5 min\n• Ice pack on dorsum + circumferential compression with Coban or Penrose\n• Lube ([surgilube, soap, oil](#/info/ring-lube-options))\n• ONE attempt at manual reduction\n\n**Escalate to cut if:**\n• No progress after 5 min\n• Skin abrasion forming\n• Color worsening to white\n• Pain escalating\n\nProceed to [material check](#/node/ring-material-check) for cutter selection.',
        citation: [1, 4, 7],
        next: 'ring-material-check',
        safetyLevel: 'critical',
        summary: 'Quick attempt OK; escalate to cut if no progress 5 min',
    },
    {
        id: 'ring-material-check',
        type: 'question',
        module: 1,
        title: 'Ring Material?',
        body: 'Material dictates cutter — wrong tool wastes time.',
        options: [
            {
                label: 'Gold, silver, aluminum, soft alloy',
                description: 'Standard ring cutter works easily',
                next: 'ring-manual',
            },
            {
                label: 'Steel, titanium (thin), tungsten-plated',
                description: 'Standard cutter usually works — may need heavy-duty',
                next: 'ring-manual',
            },
            {
                label: 'Tungsten carbide, ceramic, zirconia',
                description: 'Standard cutter FAILS — needs diamond bur or vise crack',
                next: 'ring-tungsten',
                urgency: 'urgent',
            },
            {
                label: 'Unknown / cannot identify',
                description: 'Ask patient; check inside of band; assume hard if cutter binds',
                next: 'ring-unknown-material',
            },
        ],
        summary: 'Soft metal = standard cutter; tungsten/ceramic = diamond bur or vise',
    },
    {
        id: 'ring-unknown-material',
        type: 'info',
        module: 1,
        title: 'Unknown Material',
        body: '**Ask:** "Do you remember what your ring is made of?" — patients often know if it is tungsten or ceramic (popular wedding band materials, marketed as "scratch-proof").\n\n**Visual clues:**\n• Tungsten: heavy, very shiny, scratch-resistant, brushed or polished\n• Ceramic: very light, often black or white, perfectly smooth\n• Titanium: very light, dull grey-silver\n• Stainless: silver, magnetic (use magnet)\n\n**If still unknown:** start with standard cutter. If blade binds and cannot advance after 30-60 s of effort, abort and switch to diamond bur or vise method. Continued forcing dulls/breaks the standard wheel.\n\n[Material reference](#/info/ring-materials).',
        citation: [4, 7],
        next: 'ring-manual',
        summary: 'Ask patient; assume hard if cutter binds in 30-60 s',
    },
    // =====================================================================
    // MODULE 2: MANUAL REDUCTION
    // =====================================================================
    {
        id: 'ring-manual',
        type: 'info',
        module: 2,
        title: 'Manual Reduction Attempt',
        body: '> First-line for comfortable finger with intact NV exam. Quick, painless, ring preserved.\n\n**Setup:**\n1. Elevate hand × 5 min, ice pack dorsum\n2. Wrap circumferentially with elastic bandage (Coban) distal-to-proximal × 5 min to squeeze edema out\n3. Generous [lubricant](#/info/ring-lube-options): surgilube, soap + water, lidocaine jelly, hand sanitizer, mineral oil\n4. Patient elevates arm during attempt\n\n**Technique:**\n• Grip ring firmly between thumb and index\n• Push proximally with slight rocking, not yanking\n• Patient holds finger straight, NOT flexed at PIP\n• Single steady pull while rotating the ring\n\n**Stop if:**\n• Ring binds at PIP and will not advance\n• Pain escalates\n• Skin abrasion forming\n• 2-3 attempts fail',
        citation: [1, 4, 7, 8],
        next: 'ring-manual-result',
        summary: 'Elevate, wrap, lube; pull + rotate; stop after 2-3 failed attempts',
    },
    {
        id: 'ring-manual-result',
        type: 'question',
        module: 2,
        title: 'Manual Reduction Result?',
        body: 'Choose next step.',
        options: [
            {
                label: 'Ring removed',
                description: 'Move to post-removal exam',
                next: 'ring-post-exam',
            },
            {
                label: 'Failed — escalate to string-wrap',
                description: 'Try string/Penrose for swelling reduction',
                next: 'ring-string-wrap',
            },
            {
                label: 'Failed — go straight to cutter',
                description: 'PIP fracture/laceration, time-sensitive, or string contraindicated',
                next: 'ring-cutter-selection',
            },
        ],
    },
    // =====================================================================
    // MODULE 3: STRING-WRAP TECHNIQUE
    // =====================================================================
    {
        id: 'ring-string-wrap',
        type: 'info',
        module: 3,
        title: 'String-Wrap Technique',
        body: '> Inoue method (1995). Compresses edema distal to ring, then unwinds to ratchet ring distally.\n\n**Contraindications:**\n• Underlying PIP/DIP fracture or laceration\n• Skin tear under or distal to ring\n• Already ischemic — cut instead\n• Failed manual + significant swelling — cut faster\n\n**Materials:**\n• Umbilical tape, dental floss, 2-0 silk, or thin Penrose drain\n• Lubricant\n• Mosquito hemostat\n\n**Technique:**\n1. Pass tape distal-to-proximal under the ring (use hemostat tip)\n2. Holding proximal end, wrap tape **distally** in tight even spirals, overlapping, covering finger to past PIP\n3. Wrap as tight as patient tolerates without skin blanching\n4. Hold the distal end firm\n5. Pull proximal end (the one under the ring) toward fingertip\n6. Tape unwinds from proximal-to-distal, walking ring distally with it\n7. May take 2-3 attempts — re-wrap if needed\n\n**Lube generously between attempts.**\n\n[Diagram](#/info/ring-string-wrap-diagram).',
        citation: [1, 2, 4, 7, 8],
        next: 'ring-string-result',
        safetyLevel: 'critical',
        summary: 'Tape under ring → wrap distally tight → pull proximal end → ring walks off',
    },
    {
        id: 'ring-string-result',
        type: 'question',
        module: 3,
        title: 'String-Wrap Result?',
        body: 'Did the ring come off?',
        options: [
            {
                label: 'Ring removed',
                description: 'Move to post-exam',
                next: 'ring-post-exam',
            },
            {
                label: 'Partial progress — try again',
                description: 'Re-wrap, more lube, repeat',
                next: 'ring-string-wrap',
            },
            {
                label: 'Failed — proceed to cutter',
                description: 'Escalate to cutting',
                next: 'ring-cutter-selection',
            },
        ],
    },
    // =====================================================================
    // MODULE 4: CUTTER SELECTION
    // =====================================================================
    {
        id: 'ring-cutter-selection',
        type: 'question',
        module: 4,
        title: 'Cutter Selection',
        body: 'Match cutter to material — confirm material before starting.',
        options: [
            {
                label: 'Standard manual ring cutter',
                description: 'Gold, silver, aluminum, soft alloys, thin steel',
                next: 'ring-standard-cutter',
            },
            {
                label: 'Heavy-duty / electric ring cutter',
                description: 'Steel, thick titanium, hardened bands',
                next: 'ring-heavy-cutter',
            },
            {
                label: 'Tungsten / ceramic — special method',
                description: 'Diamond bur, vise grips, or specialty cutter',
                next: 'ring-tungsten',
            },
        ],
        summary: 'Confirm material before picking cutter',
    },
    {
        id: 'ring-standard-cutter',
        type: 'info',
        module: 4,
        title: 'Standard Ring Cutter',
        body: '**Setup:**\n1. [Digital block](#/info/ring-digital-block) with [lidocaine plain](#/drug/lidocaine/laceration-repair) 1% — 1 mL each side of digit, dorsal approach\n2. Slide cutter guard between ring and finger (the small curved hook)\n3. Position blade over thinnest part of ring (NOT over a stone setting)\n\n**Technique:**\n• Engage blade slowly while squeezing handles\n• Rotate the wheel a few turns each pass\n• Keep guard between blade and skin throughout\n• Cool with saline drops if friction heat develops\n• Once cut through, spread ring with two hemostats or pliers\n\n**Two cuts (180° apart) make removal easier on swollen finger.**\n\n[Diagram](#/info/ring-standard-cutter-diagram).',
        citation: [1, 4, 7],
        next: 'ring-post-exam',
        summary: 'Guard under ring; cut thinnest section; saline coolant; spread with hemostats',
    },
    {
        id: 'ring-heavy-cutter',
        type: 'info',
        module: 4,
        title: 'Heavy-Duty / Electric Cutter',
        body: '**Indications:** thick steel, thick titanium, hardened wedding bands too thick for the standard wheel.\n\n**Tips:**\n• Same digital block + guard setup\n• Use **saline drip** or wet gauze to cool — these blades generate heat\n• Slow steady pressure; let the tool work\n• Pause every 15-30 s to check ring and skin temperature\n• If blade glazes the surface without biting after 60 s → STOP, switch to diamond bur (material is tungsten/ceramic, not steel/titanium)\n\nProceed to [post-exam](#/node/ring-post-exam) after removal.',
        citation: [4, 5, 7],
        next: 'ring-post-exam',
        safetyLevel: 'critical',
        summary: 'Cool with saline; pause for heat; abort if no bite in 60 s (means tungsten/ceramic)',
    },
    // =====================================================================
    // MODULE 5: DIAMOND / ROTARY (TUNGSTEN / CERAMIC)
    // =====================================================================
    {
        id: 'ring-tungsten',
        type: 'info',
        module: 5,
        title: 'Tungsten / Ceramic Ring',
        body: '> **Standard cutters fail on these materials.** Tungsten is harder than steel; ceramic shatters but is dense.\n\n**Three working methods:**\n\n**1. Vise-grip crack (tungsten only — best, fastest):**\n• Wrap finger with thick gauze for protection\n• Clamp ring with locking pliers / vise-grips at 12 o\'clock\n• Squeeze firmly — tungsten is brittle, will fracture into 2-3 pieces with a CRACK\n• Repeat at 6 o\'clock if needed\n• Caution: shards — wear eye protection, cover patient face\n\n**2. Diamond rotary bur (Dremel, dental drill):**\n• Digital block\n• Tongue depressor or metal spoon between ring and skin as guard\n• Saline drip continuous to cool\n• Slow steady cuts, two slots 180° apart\n• 1-3 min per cut depending on band thickness\n\n**3. Specialty tungsten/ceramic ring cutter** (some EDs stock these — check first; if available, fastest option).\n\n**Ceramic:** more brittle than tungsten — vise-grip almost always works first try.\n\n[Demo references](#/info/ring-tungsten-demo).',
        citation: [4, 5, 7, 8],
        next: 'ring-tungsten-result',
        safetyLevel: 'critical',
        summary: 'Tungsten: vise crack first (brittle); else diamond bur; ceramic: vise almost always works',
    },
    {
        id: 'ring-tungsten-result',
        type: 'question',
        module: 5,
        title: 'Tungsten/Ceramic Result?',
        body: 'Did the ring come off?',
        options: [
            {
                label: 'Ring removed',
                description: 'Post-exam',
                next: 'ring-post-exam',
            },
            {
                label: 'Partial — try alternate method',
                description: 'Vise failed → bur, or vice versa',
                next: 'ring-tungsten',
            },
            {
                label: 'Cannot remove + ischemia worsening',
                description: 'OR consult — hand/plastic surgery',
                next: 'ring-or-consult',
                urgency: 'critical',
            },
        ],
    },
    {
        id: 'ring-or-consult',
        type: 'result',
        module: 5,
        title: 'Surgical Consult',
        body: '> Rare scenario — usually only if tungsten ring with severe ischemia and no diamond bur or vise available, or significant underlying soft tissue trauma needs OR exploration.',
        recommendation: '**Actions:**\n• Maintain elevation, monitor NV every 5 min\n• Call hand surgery / plastic surgery for OR removal\n• Transfer to ED with equipment if local ED lacks tools\n• Avoid further manual attempts — wastes ischemic time\n• Document NV exam, time on field, materials tried\n\n**Time matters:** prolonged ischemia (>2-3 hr) risks tissue necrosis even after removal.',
        citation: [4, 5],
        safetyLevel: 'critical',
    },
    // =====================================================================
    // MODULE 6: POST-REMOVAL EXAM
    // =====================================================================
    {
        id: 'ring-post-exam',
        type: 'info',
        module: 6,
        title: 'Post-Removal Exam',
        body: '> Do not stop at "ring is off." Document NV recovery and screen for underlying injury that caused the swelling.\n\n**Recheck:**\n• Color, warmth, cap refill (compare contralateral finger)\n• 2-point discrimination (radial + ulnar digital nerve territories)\n• Active flexion (FDS, FDP) and extension (EDC, EPL)\n• Range of motion each joint\n\n**Imaging:**\n• X-ray if any deformity, point tenderness, joint instability, or trauma mechanism (jewelry caught, crush)\n• Index of suspicion: occult PIP/DIP fracture or dislocation explains why ring stuck\n\n**Skin:**\n• Note any abrasion, blister, pressure necrosis under ring\n• Wash with soap and water, apply petrolatum or bacitracin\n• Elevate × 24 hr to reduce residual swelling\n\n**Disposition:**\n• Pink, warm, normal NV, no injury: discharge with elevation and ice instructions\n• Persistent numbness >30 min: discuss with hand surgery\n• Suspected fracture: splint, follow-up imaging\n• Skin necrosis: wound care + close follow-up',
        citation: [1, 4, 7, 8],
        next: 'ring-discharge',
        safetyLevel: 'critical',
        summary: 'Recheck NV, screen for occult fx, x-ray if any concern, elevate ×24 h',
    },
    {
        id: 'ring-discharge',
        type: 'result',
        module: 6,
        title: 'Discharge',
        body: '> Document method, NV before and after, and follow-up plan.',
        recommendation: '**Discharge instructions:**\n• Elevate hand above heart × 24 hr\n• Ice 15 min/hr while awake × 24 hr\n• Resume normal activity as tolerated\n• Bacitracin or petrolatum on any abrasion\n• Avoid rings on the affected finger until swelling resolves fully\n\n**Return precautions:**\n• Numbness or tingling lasting >24 hr\n• Color change (white, blue, dusky)\n• Increasing pain or swelling\n• Skin breakdown or signs of infection\n• Inability to bend or straighten finger\n\n**Follow-up:**\n• PCP in 3-5 d if any persistent symptoms\n• Hand surgery referral if neuropraxia, suspected fracture, or significant skin injury\n\n**Documentation:**\n• Technique(s) used, in order\n• NV exam before and after\n• Ring material if known\n• Whether ring preserved or cut (patient may want)',
        citation: [1, 4],
    },
];
export const RING_REMOVAL_NODE_COUNT = RING_REMOVAL_NODES.length;
