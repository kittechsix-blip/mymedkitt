export const ACUTE_KERATITIS_NODES = [
    {
        "id": "acute-keratitis-start",
        "type": "info",
        "module": 1,
        "title": "Acute Keratitis: Protect Vision",
        "body": "[Steps: bedside sequence](#/info/keratitis-steps)\n\nPain, photophobia, reduced vision or a corneal opacity require assessment for keratitis and other ocular emergencies. A white-gray infiltrate with an epithelial defect is a corneal ulcer until assessed otherwise. [1,13]\n\n[Escalation and disposition](#/info/keratitis-escalate)",
        "citation": [
            1,
            13
        ],
        "safetyLevel": "critical",
        "summary": "Identify ocular emergencies, document vision and distinguish epithelial injury from a stromal infiltrate.",
        "next": "acute-keratitis-emergency-screen"
    },
    {
        "id": "acute-keratitis-emergency-screen",
        "type": "question",
        "module": 1,
        "title": "Another Immediate Ocular Emergency?",
        "body": "Chemical exposure, penetrating trauma, suspected perforation, severe vision loss or findings suggesting angle closure/endophthalmitis take priority. [13]\n\nAn absent or small fluorescein defect does not make a painful red eye benign.",
        "citation": [
            1,
            13
        ],
        "options": [
            {
                "label": "Chemical exposure",
                "next": "acute-keratitis-chemical",
                "urgency": "critical"
            },
            {
                "label": "Open globe, perforation or corneal melt",
                "next": "acute-keratitis-globe",
                "urgency": "critical"
            },
            {
                "label": "Other vision-threatening emergency or uncertain examination",
                "next": "acute-keratitis-emergency",
                "urgency": "critical"
            },
            {
                "label": "None identified; proceed with corneal assessment",
                "next": "acute-keratitis-history"
            }
        ]
    },
    {
        "id": "acute-keratitis-chemical",
        "type": "result",
        "module": 1,
        "title": "Chemical Injury: Irrigate Immediately",
        "body": "Begin copious irrigation immediately; do not postpone it for the full keratitis examination. Follow the dedicated [Chemical Eye Burn pathway](#/tree/chemical-burn).",
        "citation": [
            1,
            13
        ],
        "recommendation": "Immediate irrigation and chemical-injury management with urgent ophthalmology.",
        "confidence": "recommended",
        "safetyLevel": "critical"
    },
    {
        "id": "acute-keratitis-globe",
        "type": "result",
        "module": 1,
        "title": "Open Globe / Perforation / Melt",
        "body": "Apply a rigid shield and avoid pressure, patching, tonometry and manipulation. Obtain emergency ophthalmology and arrange transfer when definitive care is unavailable. [13]\n\n[Open Globe pathway](#/tree/globe-rupture).",
        "citation": [
            1,
            13
        ],
        "recommendation": "Emergency ophthalmology. Protect the globe; no pressure or tonometry.",
        "confidence": "recommended",
        "safetyLevel": "critical"
    },
    {
        "id": "acute-keratitis-emergency",
        "type": "result",
        "module": 1,
        "title": "Urgent Ocular Assessment",
        "body": "Severe vision loss, marked anterior chamber inflammation, recent intraocular surgery/injection with pain, or an examination inconsistent with isolated surface disease needs emergency ophthalmology. [13]\n\n[Angle-Closure Glaucoma](#/tree/aacg) | [Monocular Vision Loss](#/tree/monocular-vision-loss-hub).",
        "citation": [
            1,
            13
        ],
        "recommendation": "Treat the suspected ocular emergency and coordinate definitive specialist care.",
        "confidence": "recommended",
        "safetyLevel": "critical"
    },
    {
        "id": "acute-keratitis-history",
        "type": "info",
        "module": 2,
        "title": "Focused Exposure and Risk History",
        "body": "Ask about contact lenses, overnight wear, water exposure, vegetation/soil injury, UV/welding exposure, HSV or zoster, topical steroids, surgery, immunosuppression, autoimmune disease and incomplete lid closure. [1,4,6,9-11]\n\nClarify onset, laterality, pain, photophobia, vision change, prior episodes and all drops already used.",
        "citation": [
            1,
            4,
            6,
            9,
            10,
            11
        ],
        "summary": "Exposure and medication history separate bacterial, herpetic, fungal, amoebic and noninfectious possibilities.",
        "next": "acute-keratitis-exam"
    },
    {
        "id": "acute-keratitis-exam",
        "type": "info",
        "module": 2,
        "title": "Examine White Light AND Fluorescein",
        "body": "Record visual acuity in each eye and pupil findings. Use white light to identify opacity/infiltrate and cobalt blue after fluorescein for epithelial injury. Document location and dimensions of the defect and infiltrate separately, corneal thinning and anterior chamber inflammation/hypopyon. [1,13]\n\nAssess corneal sensation before topical anesthetic when herpetic/neurotrophic disease is suspected. Evert the upper lid after open-globe injury is excluded. [4,11]\n\n[Stain Atlas](#/info/keratitis-stain-atlas)",
        "citation": [
            1,
            4,
            11,
            13
        ],
        "summary": "Measure infiltrate and epithelial defect separately; staining alone does not establish the diagnosis.",
        "next": "acute-keratitis-pattern"
    },
    {
        "id": "acute-keratitis-pattern",
        "type": "question",
        "module": 3,
        "title": "Which Pattern and Clinical Context?",
        "body": "[Compare patterns](#/info/keratitis-stain-atlas) | [Differential diagnosis](#/info/keratitis-differential)\n\nPatterns overlap. Do not identify an organism or declare a lesion sterile from its appearance alone. [1,9,13]",
        "citation": [
            1,
            4,
            6,
            9,
            10,
            11,
            13
        ],
        "options": [
            {
                "label": "Infiltrate, ulcer, hypopyon or uncertain infectious lesion",
                "next": "acute-keratitis-microbial",
                "urgency": "critical"
            },
            {
                "label": "Dendrite, geographic ulcer or suspected HSV",
                "next": "acute-keratitis-hsv"
            },
            {
                "label": "V1 zoster / pseudodendrite",
                "next": "acute-keratitis-zoster"
            },
            {
                "label": "Vegetation, water exposure or atypical course",
                "next": "acute-keratitis-atypical"
            },
            {
                "label": "Punctate injury after UV exposure",
                "next": "acute-keratitis-uv"
            },
            {
                "label": "Abrasion, erosion or linear tracks",
                "next": "acute-keratitis-abrasion"
            },
            {
                "label": "Exposure, reduced sensation or peripheral lesion",
                "next": "acute-keratitis-noninfectious"
            },
            {
                "label": "No convincing corneal explanation",
                "next": "acute-keratitis-uncertain"
            }
        ]
    },
    {
        "id": "acute-keratitis-microbial",
        "type": "info",
        "module": 4,
        "title": "Suspected Microbial Corneal Ulcer",
        "body": "Contact ophthalmology now. Determine whether urgent corneal sampling is indicated and immediately available using [Escalate](#/info/keratitis-escalate). Obtain indicated samples before antibiotics when feasible, but do not delay sight-saving treatment during prolonged transfer. [1,2]\n\nContact-lens-associated disease requires antipseudomonal coverage. An abrasion prophylaxis or conjunctivitis-frequency regimen is inadequate for an established ulcer. [1,3]",
        "citation": [
            1,
            2,
            3
        ],
        "safetyLevel": "critical",
        "summary": "Ophthalmology, appropriate sampling and intensive topical therapy proceed without avoidable delay.",
        "next": "acute-keratitis-severity"
    },
    {
        "id": "acute-keratitis-severity",
        "type": "question",
        "module": 4,
        "title": "Severe, Central or Atypical Disease?",
        "body": "[Culture, transfer and admission criteria](#/info/keratitis-escalate)\n\nChoose the regimen with ophthalmology using lesion location/depth, progression, host factors, smear and local resistance. [1,2]",
        "citation": [
            1,
            2
        ],
        "options": [
            {
                "label": "Vision-threatening, central/deep/progressive or atypical",
                "next": "acute-keratitis-intensive",
                "urgency": "critical"
            },
            {
                "label": "Selected uncomplicated bacterial ulcer; specialist agrees",
                "next": "acute-keratitis-fluoroquinolone"
            }
        ]
    },
    {
        "id": "acute-keratitis-intensive",
        "type": "info",
        "module": 4,
        "title": "Specialist-Directed Intensive Therapy",
        "body": "Compounded fortified antibiotics may be needed. [Rx Guide: severe bacterial disease](#/info/keratitis-rx-guide) links to the ophthalmic vancomycin and tobramycin regimens. Initial loading, alternative agents and taper belong to the corneal service. [1,2]\n\nIf fungal or Acanthamoeba infection is suspected, follow the [atypical branch](#/node/acute-keratitis-atypical); antibacterial drops alone do not provide definitive coverage. [8,9]",
        "citation": [
            1,
            2,
            8,
            9
        ],
        "safetyLevel": "critical",
        "summary": "Use specialist-selected intensive ophthalmic therapy and ensure the prescribed drops can actually be administered.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-fluoroquinolone",
        "type": "info",
        "module": 4,
        "title": "Selected Bacterial Ulcer Regimen",
        "body": "[Ciprofloxacin ophthalmic: labeled corneal-ulcer schedule](#/drug/ciprofloxacin-ophthalmic/Corneal ulcer)\n\nConfirm suitability with ophthalmology. Follow response rather than automatically stepping down if the lesion is worsening. [1,3]",
        "citation": [
            1,
            3
        ],
        "summary": "Use the ulcer-specific intensive regimen, with reassessment before reducing treatment frequency.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-hsv",
        "type": "question",
        "module": 5,
        "title": "HSV: Epithelial or Deeper Disease?",
        "body": "Classic dendritic epithelial disease is not the same treatment problem as a geographic ulcer, stromal/endothelial disease or associated uveitis. [4]\n\n[HSV schematic and clinical photograph](#/info/keratitis-stain-atlas)",
        "citation": [
            4
        ],
        "options": [
            {
                "label": "Simple dendritic epithelial disease",
                "next": "acute-keratitis-hsv-epithelial"
            },
            {
                "label": "Geographic, stromal/endothelial, uveitis or uncertain depth",
                "next": "acute-keratitis-hsv-complex",
                "urgency": "critical"
            }
        ]
    },
    {
        "id": "acute-keratitis-hsv-epithelial",
        "type": "info",
        "module": 5,
        "title": "HSV Epithelial Keratitis",
        "body": "Arrange same-day ophthalmology and select an antiviral using [Rx Guide: HSV epithelial options](#/info/keratitis-rx-guide). Early HSV may lack the classic dendrite. [4,5]\n\n**Do not use topical steroids for active epithelial HSV.** [4]",
        "citation": [
            4,
            5
        ],
        "summary": "Same-day review and appropriate antiviral; topical steroids are contraindicated in active epithelial HSV.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-hsv-complex",
        "type": "info",
        "module": 5,
        "title": "Geographic or Deeper Herpetic Disease",
        "body": "Urgent corneal assessment is required. Geographic ulcer regimens differ from simple dendritic disease. Stromal/endothelial disease and uveitis require assessment of epithelial integrity and antiviral coverage; any steroid and taper are ophthalmologist-directed. [4]\n\n[Rx Guide: complex HSV](#/info/keratitis-rx-guide)",
        "citation": [
            4
        ],
        "summary": "Do not extrapolate simple epithelial treatment to geographic ulcers, stromal disease or uveitis.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-zoster",
        "type": "info",
        "module": 5,
        "title": "Herpes Zoster Ophthalmicus",
        "body": "Start systemic antiviral promptly and arrange ophthalmology for ocular findings. Absence of a nasal-tip lesion does not exclude eye involvement. [6]\n\n[Valacyclovir: herpes zoster, including renal adjustment](#/drug/valacyclovir/Herpes zoster)\n\nDo not withhold assessment/treatment solely because onset was over 72 hours ago when ocular disease or new lesions are present. Severe/disseminated disease or immunocompromise may require admission and IV therapy. [6,7]",
        "citation": [
            6,
            7
        ],
        "summary": "Systemic antiviral plus ophthalmology; renal function and disease severity determine the treatment setting.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-atypical",
        "type": "info",
        "module": 6,
        "title": "Fungal or Acanthamoeba Infection?",
        "body": "Vegetation/soil trauma, steroid exposure or atypical/nonhealing ulcer raises fungal concern. Contacts plus water exposure, disproportionate pain or perineural disease raises Acanthamoeba concern. [8,9,13]\n\nA ring is a late, nonspecific clue; do not wait for it. Little pain does not exclude Acanthamoeba. Arrange urgent corneal sampling and specialist-directed treatment.\n\n[Rx Guide: antifungal and antiamoebic therapy](#/info/keratitis-rx-guide)",
        "citation": [
            8,
            9,
            13
        ],
        "summary": "Exposure and clinical course drive urgent specialist testing; appearance alone cannot select definitive antimicrobial therapy.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-uv",
        "type": "info",
        "module": 6,
        "title": "UV Photokeratitis",
        "body": "Confirm a compatible UV/welding history, usually bilateral symptoms and punctate staining, without infiltrate or another emergency. [10]\n\n[Clinical photograph and punctate pattern](#/info/keratitis-stain-atlas) | [Rx Guide: UV injury](#/info/keratitis-rx-guide)",
        "citation": [
            10
        ],
        "summary": "Punctate staining supports epithelial injury but is not specific to UV exposure.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-abrasion",
        "type": "info",
        "module": 6,
        "title": "Abrasion, Erosion or Retained Foreign Body",
        "body": "A confluent defect without infiltrate may be an abrasion; waking pain suggests recurrent erosion. Vertical linear tracks prompt upper-lid eversion after globe injury is excluded. [13]\n\nUse [Corneal Foreign Body Removal](#/tree/corneal-fb-removal) or [Ocular Trauma](#/tree/ocular-trauma) only after microbial keratitis is excluded. Contact lens use or an uncertain infiltrate should lower the threshold for ophthalmology.",
        "citation": [
            1,
            13
        ],
        "summary": "Confirm a noninfectious epithelial injury before using routine abrasion or foreign-body pathways.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-noninfectious",
        "type": "info",
        "module": 6,
        "title": "Exposure, Neurotrophic or Peripheral Disease",
        "body": "Incomplete closure and inferior/interpalpebral injury suggest exposure. Reduced sensation or unexpectedly little pain can accompany neurotrophic disease. [11]\n\nPeripheral infiltrates can be sterile, infectious or immune-mediated. Thinning, adjacent scleritis or autoimmune disease requires urgent ophthalmology and systemic evaluation; do not begin empiric steroid treatment from appearance alone. [1,13]\n\n[Differential](#/info/keratitis-differential) | [Exposure treatment](#/info/keratitis-rx-guide)",
        "citation": [
            1,
            11,
            13
        ],
        "summary": "A painless or peripheral lesion is not automatically benign; thinning and persistent defects require specialist care.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-uncertain",
        "type": "info",
        "module": 6,
        "title": "No Surface Diagnosis Explains the Symptoms",
        "body": "Reassess for uveitis, scleritis, angle closure, endophthalmitis or deeper corneal disease. Limited or normal fluorescein staining does not exclude these diagnoses. [13]\n\nPersistent pain, photophobia, reduced acuity or diagnostic uncertainty warrants ophthalmology rather than a conjunctivitis label. [Differential](#/info/keratitis-differential)",
        "citation": [
            13
        ],
        "summary": "A normal stain does not rule out a vision-threatening cause of a painful red eye.",
        "next": "acute-keratitis-disposition"
    },
    {
        "id": "acute-keratitis-disposition",
        "type": "question",
        "module": 7,
        "title": "Can Treatment and Follow-Up Be Delivered?",
        "body": "[Escalate: referral, culture and discharge criteria](#/info/keratitis-escalate)\n\nDocument the ophthalmologist, agreed regimen and reassessment time. Medication availability and ability to administer frequent drops are disposition criteria, not optional details. [1,2]",
        "citation": [
            1,
            2
        ],
        "options": [
            {
                "label": "Sight-threatening, worsening, unsafe treatment access or follow-up",
                "next": "acute-keratitis-admit",
                "urgency": "critical"
            },
            {
                "label": "Specialist-approved outpatient plan is feasible",
                "next": "acute-keratitis-outpatient"
            }
        ]
    },
    {
        "id": "acute-keratitis-admit",
        "type": "result",
        "module": 7,
        "title": "Admission or Coordinated Transfer",
        "body": "Arrange an accepting service able to deliver the required corneal treatment and repeated examinations. Begin agreed therapy while arranging transport; communicate visual acuity, lesion measurements, samples and exact treatments/times. [1,2]\n\n[Escalate checklist](#/info/keratitis-escalate)",
        "citation": [
            1,
            2
        ],
        "recommendation": "Admit or transfer for reliable intensive treatment and specialist reassessment.",
        "confidence": "recommended",
        "safetyLevel": "critical"
    },
    {
        "id": "acute-keratitis-outpatient",
        "type": "result",
        "module": 7,
        "title": "Documented Outpatient Plan",
        "body": "Use the [discharge checklist and return precautions](#/info/keratitis-escalate) before discharge. Record acuity, working diagnosis, medicines obtained, administration technique and the specific follow-up arrangement. [1,2]\n\nImprovement in pain alone does not demonstrate corneal healing.",
        "citation": [
            1,
            2
        ],
        "recommendation": "Discharge only when treatment, reassessment and return precautions are explicit and feasible.",
        "confidence": "recommended"
    }
];
export const ACUTE_KERATITIS_NODE_COUNT = ACUTE_KERATITIS_NODES.length;
export const ACUTE_KERATITIS_MODULE_LABELS = ["First Look & Safety", "History & Examination", "Pattern & Differential", "Microbial Ulcer", "HSV & Zoster", "Atypical & Noninfectious", "Disposition & Reassessment"];
export const ACUTE_KERATITIS_CRITICAL_ACTIONS = [
    {
        "text": "Chemical exposure: irrigate immediately; suspected perforation/open globe: shield, no pressure.",
        "nodeId": "acute-keratitis-emergency-screen"
    },
    {
        "text": "A corneal infiltrate/ulcer needs urgent ophthalmology and ulcer-specific intensive treatment.",
        "nodeId": "acute-keratitis-microbial"
    },
    {
        "text": "No topical steroid for active epithelial HSV; complex herpetic disease needs specialist-directed therapy.",
        "nodeId": "acute-keratitis-hsv-epithelial"
    },
    {
        "text": "Confirm medication access, frequent-drop feasibility and a specific reassessment plan.",
        "nodeId": "acute-keratitis-disposition"
    }
];
export const ACUTE_KERATITIS_CITATIONS = [
    {
        "num": 1,
        "text": "American Academy of Ophthalmology. Bacterial Keratitis Preferred Practice Pattern. Ophthalmology. 2024. https://www.aaojournal.org/article/S0161-6420(24)00007-1/fulltext"
    },
    {
        "num": 2,
        "text": "American Academy of Ophthalmology EyeWiki. Bacterial Keratitis. https://eyewiki.aao.org/Bacterial_Keratitis"
    },
    {
        "num": 3,
        "text": "Ciprofloxacin ophthalmic solution 0.3%. US prescribing information. Corneal ulcer regimen. https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=1ebdcd1f-1e64-aea0-e063-6294a90aa4e1"
    },
    {
        "num": 4,
        "text": "White ML, Chodosh J. Herpes Simplex Virus Keratitis: A Treatment Guideline. Massachusetts Eye and Ear; accepted by AAO, 2014. https://www.aao.org/Assets/6564936e-9929-48b6-93cd-15872a1b388e/635424082284100000/hsv-keratitis-treatment-guideline-harvard-pdf"
    },
    {
        "num": 5,
        "text": "ZIRGAN (ganciclovir ophthalmic gel 0.15%). FDA prescribing information. 2026. https://www.accessdata.fda.gov/drugsatfda_docs/label/2026/022211s007lbl.pdf"
    },
    {
        "num": 6,
        "text": "American Academy of Ophthalmology EyeNet. Herpes Zoster Ophthalmicus: Pearls. https://www.aao.org/eyenet/article/herpes-zoster-ophthalmicus-pearls"
    },
    {
        "num": 7,
        "text": "VALTREX (valacyclovir). US prescribing information. Herpes zoster and renal adjustment. https://www.dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=56a62c21-bead-4f3b-a24e-c3fd0b4a732f"
    },
    {
        "num": 8,
        "text": "NATACYN (natamycin ophthalmic suspension 5%). FDA prescribing information. 2025. https://www.accessdata.fda.gov/drugsatfda_docs/label/2025/050514s022lbl.pdf"
    },
    {
        "num": 9,
        "text": "Centers for Disease Control and Prevention. Clinical Overview of Acanthamoeba Keratitis. https://www.cdc.gov/acanthamoeba/hcp/clinical-overview-acanthamoeba-keratitis/"
    },
    {
        "num": 10,
        "text": "American Academy of Ophthalmology EyeWiki. Photokeratitis. https://eyewiki.aao.org/Photokeratitis"
    },
    {
        "num": 11,
        "text": "American Academy of Ophthalmology EyeWiki. Exposure Keratopathy. https://eyewiki.aao.org/Exposure_Keratopathy"
    },
    {
        "num": 12,
        "text": "Green SM, et al. Use of Topical Anesthetics in the Management of Patients With Simple Corneal Abrasions: Consensus Guidelines From ACEP. Ann Emerg Med. 2024. https://www.annemergmed.com/article/S0196064424000040/pdf"
    },
    {
        "num": 13,
        "text": "Merck Manual Professional Edition. Corneal Ulcer. Reviewed/revised 2026. https://www.merckmanuals.com/professional/eye-disorders/corneal-disorders/corneal-ulcer"
    }
];
