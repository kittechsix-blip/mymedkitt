export const ASYSTOLE_CRITICAL_ACTIONS = [
    {
        "text": "Start CPR and give epinephrine promptly for nonshockable arrest.",
        "nodeId": "asystole-start"
    },
    {
        "text": "Check connections, another vector and display gain without extending CPR pauses.",
        "nodeId": "asystole-confirm"
    },
    {
        "text": "Confirmed VF is shockable; true asystole is not.",
        "nodeId": "asystole-rhythm"
    }
];
export const ASYSTOLE_NODES = [
    {
        "id": "asystole-start",
        "title": "Asystole: act while confirming the rhythm",
        "body": "**Adult pulseless arrest:** activate the team, start CPR and attach defibrillation pads. If pulse assessment is uncertain, limit it to 10 seconds and start CPR.\n\n**True asystole is nonshockable; promptly check whether apparent asystole is fine VF.** Do not delay CPR, ventilation or early **[epinephrine](#/drug/epinephrine)** to troubleshoot the monitor.\n\n[Steps](#/info/asystole-steps) · [Fine VF checklist](#/info/asystole-fine-vf) · [LIFEPAK 15 controls](#/info/asystole-lifepak)\n\nUse the bottom tools for immediate access. This adult pathway does not replace special-circumstance protocols.",
        "module": 1,
        "type": "info",
        "citation": [
            1
        ],
        "safetyLevel": "critical",
        "summary": "CPR now; epinephrine promptly for nonshockable arrest; confirm the monitor signal.",
        "calculatorLinks": [
            {
                "id": "asystole-steps",
                "label": "Steps",
                "kind": "info"
            }
        ],
        "next": "asystole-confirm"
    },
    {
        "id": "asystole-confirm",
        "title": "Confirm asystole, not fine VF",
        "body": "**Check the patient and the signal while CPR continues.** Confirm cable connections, pads/electrode adhesion, and absence of a lead-off message. A disconnected lead is not asystole.\n\n**At the scheduled brief rhythm check:** inspect a second available ECG vector and increase display gain/size if the trace is very small. Keep interruption under 10 seconds; resume compressions promptly. Prepare settings during CPR. [1,3]\n\n**Fine VF:** irregular, chaotic electrical activity without organized QRS complexes. Confirmed VF is shockable even when low amplitude. **True asystole:** no ventricular electrical activity after checking signal quality and another vector. P waves without QRS indicate ventricular standstill, not complete electrical silence. Organized complexes without a pulse indicate PEA. [1,2]\n\nGain enlarges both signal AND artifact. Do not diagnose VF from compression/movement artifact or a filtered CPR waveform alone. A flat second lead does not guarantee VF is excluded. [2,3]\n\n**Still genuinely uncertain?** ERC 2025 specifically advises a shock when an ALS provider remains unsure between fine VF and asystole. AHA 2025 classifies VF/pVT as shockable and asystole/PEA as nonshockable but does not give that same explicit uncertainty rule. Use trained team assessment and the applicable resuscitation protocol; never prolong hands-off time to debate the tracing. Do not apply an uncertainty exception to confirmed asystole. [1,2]",
        "module": 2,
        "type": "info",
        "citation": [
            1,
            2,
            3
        ],
        "calculatorLinks": [
            {
                "id": "asystole-lifepak",
                "label": "LIFEPAK Lead / Gain",
                "kind": "info"
            }
        ],
        "next": "asystole-rhythm"
    },
    {
        "id": "asystole-rhythm",
        "title": "What rhythm is present?",
        "body": "Assess during a brief scheduled rhythm check. Resume compressions promptly; do not wait for a long diagnostic pause.",
        "module": 2,
        "type": "question",
        "citation": [
            1,
            2
        ],
        "options": [
            {
                "label": "True asystole",
                "next": "asystole-cpr"
            },
            {
                "label": "VF / pulseless VT",
                "next": "asystole-shockable"
            },
            {
                "label": "Organized QRS, no pulse",
                "next": "asystole-pea"
            },
            {
                "label": "P waves without QRS",
                "next": "asystole-standstill"
            },
            {
                "label": "Still uncertain: fine VF vs asystole",
                "next": "asystole-uncertain"
            },
            {
                "label": "Pulse / ROSC",
                "next": "asystole-rosc"
            }
        ]
    },
    {
        "id": "asystole-cpr",
        "title": "Nonshockable arrest: CPR + epinephrine",
        "body": "**CPR:** 100–120 compressions/min, depth 5–6 cm, full recoil, rotate compressor every 2 minutes. Minimize pauses. Bag-mask with oxygen; 30:2 without an advanced airway. With an advanced airway, continuous compressions and 1 breath every 6 seconds; avoid hyperventilation.\n\n**[Epinephrine](#/drug/epinephrine): 1 mg IV/IO as soon as feasible, then every 3–5 minutes.** Prefer IV; use IO if IV is not feasible or delayed. Do not wait for a completed CPR cycle to give the first dose.\n\nUse waveform capnography after advanced airway placement. Do not interrupt compressions for airway placement when ventilation is effective.\n\n**No routine shock, atropine, or pacing for true asystole.** Calcium, bicarbonate and magnesium are not routine arrest drugs; use only for a specific indication.",
        "module": 3,
        "type": "info",
        "citation": [
            1
        ],
        "safetyLevel": "critical",
        "next": "asystole-causes"
    },
    {
        "id": "asystole-shockable",
        "title": "VF / pulseless VT: defibrillate",
        "body": "Deliver an unsynchronized shock using the manufacturer/local biphasic energy protocol. Resume CPR immediately for 2 minutes. Do not delay confirmed fine-VF defibrillation to make VF coarser.\n\n[Open cardiac arrest pathway](#/tree/cardiac-arrest) for ongoing shockable-arrest management.",
        "module": 3,
        "type": "result",
        "citation": [
            1,
            2
        ],
        "recommendation": "Defibrillate VF/pVT; immediately resume CPR.",
        "confidence": "recommended",
        "next": "asystole-reassess"
    },
    {
        "id": "asystole-pea",
        "title": "Organized rhythm without pulse: PEA",
        "body": "Continue CPR, give early **[epinephrine](#/drug/epinephrine)** and treat reversible causes. **Do not shock an organized pulseless rhythm.**\n\n[Open PEA consult](#/tree/pea-arrest).",
        "module": 3,
        "type": "result",
        "citation": [
            1
        ],
        "recommendation": "Treat PEA; continue CPR and search for reversible causes.",
        "confidence": "recommended",
        "next": "asystole-causes"
    },
    {
        "id": "asystole-standstill",
        "title": "P waves without QRS: ventricular standstill",
        "body": "This is not complete electrical silence. Continue the pulseless-arrest bundle and seek expert rhythm review. ERC 2025 selected pacing consideration for P-wave ventricular standstill is distinct from routine pacing of true asystole and must not delay CPR or epinephrine. If pacing is attempted, confirm immediate electrical AND mechanical capture; if absent, immediately resume CPR. [1,2]",
        "module": 3,
        "type": "info",
        "citation": [
            1,
            2
        ],
        "next": "asystole-causes"
    },
    {
        "id": "asystole-uncertain",
        "title": "Uncertain fine VF vs asystole",
        "body": "**Check the patient and the signal while CPR continues.** Confirm cable connections, pads/electrode adhesion, and absence of a lead-off message. A disconnected lead is not asystole.\n\n**At the scheduled brief rhythm check:** inspect a second available ECG vector and increase display gain/size if the trace is very small. Keep interruption under 10 seconds; resume compressions promptly. Prepare settings during CPR. [1,3]\n\n**Fine VF:** irregular, chaotic electrical activity without organized QRS complexes. Confirmed VF is shockable even when low amplitude. **True asystole:** no ventricular electrical activity after checking signal quality and another vector. P waves without QRS indicate ventricular standstill, not complete electrical silence. Organized complexes without a pulse indicate PEA. [1,2]\n\nGain enlarges both signal AND artifact. Do not diagnose VF from compression/movement artifact or a filtered CPR waveform alone. A flat second lead does not guarantee VF is excluded. [2,3]\n\n**Still genuinely uncertain?** ERC 2025 specifically advises a shock when an ALS provider remains unsure between fine VF and asystole. AHA 2025 classifies VF/pVT as shockable and asystole/PEA as nonshockable but does not give that same explicit uncertainty rule. Use trained team assessment and the applicable resuscitation protocol; never prolong hands-off time to debate the tracing. Do not apply an uncertainty exception to confirmed asystole. [1,2]",
        "module": 3,
        "type": "info",
        "citation": [
            1,
            2,
            3
        ],
        "next": "asystole-rhythm"
    },
    {
        "id": "asystole-causes",
        "title": "Find and treat a reversible cause",
        "body": "**Hypoxia:** verify ventilation, airway position and oxygen supply.\n**Hypovolemia:** control hemorrhage; blood/fluids as indicated.\n**Hydrogen ion / metabolic disturbance:** treat the underlying cause; avoid routine bicarbonate.\n**Hypo-/hyperkalemia:** review context, point-of-care electrolytes and ECG; use cause-specific treatment.\n**Hypothermia:** temperature and rewarming pathway.\n\n**Tension pneumothorax:** decompress when clinically suspected.\n**Tamponade:** selected expert ultrasound and drainage pathway.\n**Toxins:** exposure-directed resuscitation / toxicology support.\n**Thrombosis:** consider PE and coronary causes.\n\nPOCUS may help a skilled operator identify causes but must not extend CPR pauses. Do not use absent cardiac motion or an ETCO2 value alone to stop resuscitation.",
        "module": 4,
        "type": "info",
        "citation": [
            1
        ],
        "next": "asystole-reassess"
    },
    {
        "id": "asystole-reassess",
        "title": "Reassess every 2 minutes",
        "body": "Brief rhythm assessment every 2 minutes; check pulse only with an organized rhythm or signs of ROSC. Continue epinephrine every 3–5 minutes while pulseless. Reassess CPR quality and reversible causes each cycle.",
        "module": 5,
        "type": "question",
        "citation": [
            1
        ],
        "options": [
            {
                "label": "Still asystole",
                "next": "asystole-cpr"
            },
            {
                "label": "Rhythm changed / uncertain",
                "next": "asystole-rhythm"
            },
            {
                "label": "ROSC",
                "next": "asystole-rosc"
            },
            {
                "label": "Consider ending resuscitation",
                "next": "asystole-termination"
            }
        ]
    },
    {
        "id": "asystole-rosc",
        "title": "ROSC: stabilize and hand over",
        "body": "Confirm a sustained pulse, support oxygenation and ventilation, avoid hypotension, obtain 12-lead ECG and treat the cause.\n\n[Open post-ROSC care](#/tree/post-rosc).",
        "module": 5,
        "type": "result",
        "citation": [
            1
        ],
        "recommendation": "Begin post-cardiac-arrest care.",
        "confidence": "recommended"
    },
    {
        "id": "asystole-termination",
        "title": "Termination requires the whole clinical picture",
        "body": "Senior team decision using circumstances, resuscitation quality/duration, reversible causes, patient wishes and local policy. Consider special circumstances such as hypothermia or poisoning before stopping. Do not apply prehospital termination rules automatically to ED patients. **ETCO2 or ultrasound standstill alone is insufficient.** Document the decision and support family.",
        "module": 5,
        "type": "result",
        "citation": [
            1
        ],
        "recommendation": "Individualized team decision; no single-test stopping rule.",
        "confidence": "recommended"
    }
];
export const ASYSTOLE_NODE_COUNT = ASYSTOLE_NODES.length;
export const ASYSTOLE_MODULE_LABELS = ['Act', 'Verify Rhythm', 'Treat', 'Causes', 'Reassess'];
export const ASYSTOLE_CITATIONS = [
    {
        "num": 1,
        "text": "American Heart Association. 2025 Adult Advanced Life Support. https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support"
    },
    {
        "num": 2,
        "text": "European Resuscitation Council. 2025 Adult Advanced Life Support, manual defibrillation strategy, p18. https://www.erc.edu/media/vedoa2ga/gl2025-05-als-e.pdf"
    },
    {
        "num": 3,
        "text": "Physio-Control / Stryker. LIFEPAK 15 Operating Instructions (2019), pp24–25, 50–51. https://www.stryker.com/content/dam/stryker/ems/resources/operating-instructions/lifepak_15_operating_instructions_en.pdf"
    }
];
