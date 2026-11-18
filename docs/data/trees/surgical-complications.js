export const SURGICAL_COMPLICATIONS_MODULE_LABELS = [
    "Find operation",
    "Operative anatomy",
    "Workup and treatment"
];
export const SURGICAL_COMPLICATIONS_CRITICAL_ACTIONS = [
    {
        text: "Threatened airway after thyroidectomy: activate the neck hematoma response immediately.",
        nodeId: "sc-thyroid-expanding-neck-hematoma"
    },
    {
        text: "Shock after cardiac surgery: evaluate urgently for a localized clot despite a nondiagnostic TTE.",
        nodeId: "sc-cabg-bleeding-or-localized-tamponade"
    },
    {
        text: "Peritonitis after colectomy: involve colorectal surgery for source control immediately.",
        nodeId: "sc-colectomy-anastomotic-leak-or-pelvic-abscess"
    },
    {
        text: "Gas in an operated eye: avoid nitrous oxide, including Entonox, until the gas has fully resolved.",
        nodeId: "sc-retina-gas-expansion-or-pressure-related-ischemia"
    },
    {
        text: "After Roux-en-Y, a negative CT cannot exclude a threatened internal hernia. Involve bariatric surgery early.",
        nodeId: "sc-rygb-internal-hernia-or-closed-loop-obstruction"
    },
    {
        text: "Progressive neck swelling or stridor after anterior cervical surgery needs an immediate airway and spine response.",
        nodeId: "sc-anterior-cervical-neck-hematoma-or-pharyngolaryngeal-edema"
    }
];
export const SURGICAL_COMPLICATIONS_NODES = [
    {
        id: "sc-start",
        type: "question",
        module: 1,
        title: "Which surgery did the patient have?",
        body: "**Unstable patient** · Call the operating service now for shock, threatened airway, peritonitis, uncontrolled bleeding or an acutely threatened limb. Resuscitate while arranging definitive care. Imaging must not delay life-saving intervention.\n\n**Confirm the operation** · Check the operative report, postoperative day, reconstruction, drains, anticoagulants and discharge baseline. These diagrams show typical variants. Also consider nonsurgical causes, including PE, ACS and pneumonia.",
        summary: "Identify instability first. Use the operative report to select the matching anatomy.",
        safetyLevel: "warning",
        citation: [
            1,
            8,
            13,
            17,
            21,
            24
        ],
        options: [
            {
                label: "General surgery",
                next: "sc-general-surgery"
            },
            {
                label: "Colorectal surgery",
                next: "sc-colorectal-surgery"
            },
            {
                label: "Cardiac surgery",
                next: "sc-cardiac-surgery"
            },
            {
                label: "Vascular surgery",
                next: "sc-vascular-surgery"
            },
            {
                label: "ENT",
                next: "sc-ent"
            },
            {
                label: "OB/GYN",
                next: "sc-ob-gyn"
            },
            {
                label: "Surgical oncology",
                next: "sc-surgical-oncology"
            },
            {
                label: "Urology",
                next: "sc-urology"
            },
            {
                label: "Bariatric surgery",
                next: "sc-bariatric-surgery"
            },
            {
                label: "Neurosurgery and spine",
                next: "sc-neurosurgery-and-spine"
            },
            {
                label: "Ophthalmology",
                next: "sc-ophthalmology"
            }
        ]
    },
    {
        id: "sc-general-surgery",
        type: "question",
        module: 1,
        title: "General surgery",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Laparoscopic cholecystectomy",
                next: "sc-chole"
            },
            {
                label: "Laparoscopic appendectomy",
                next: "sc-appy"
            },
            {
                label: "Inguinal hernia repair",
                next: "sc-inguinal"
            },
            {
                label: "Umbilical hernia repair",
                next: "sc-umbilical"
            },
            {
                label: "Incisional or ventral hernia repair",
                next: "sc-incisional"
            }
        ]
    },
    {
        id: "sc-chole",
        type: "question",
        module: 2,
        title: "Laparoscopic cholecystectomy",
        body: "Total cholecystectomy removes the gallbladder from the liver bed. The cystic duct and artery are divided and secured. Bile still flows from the hepatic ducts through the common bile duct into the duodenum. A subtotal operation leaves different anatomy.\n\n[Open Cholecystectomy atlas](#/image/surgical-complications/chole-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/chole-atlas.jpg",
                alt: "Total cholecystectomy removes the gallbladder from the liver bed. The cystic duct and artery are divided and secured. Bile still flows from the hepatic ducts through the common bile duct into the duodenum. A subtotal operation leaves different anatomy.",
                caption: "The clipped cystic duct ends beside the intact main bile duct. Leakage from this stump can produce a biloma even when bile still reaches the duodenum. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            1,
            2
        ],
        options: [
            {
                label: "Bile leak or biloma",
                next: "sc-chole-bile-leak-or-biloma"
            },
            {
                label: "Retained common duct stone or cholangitis",
                next: "sc-chole-retained-common-duct-stone-or-cholangitis"
            },
            {
                label: "Major duct injury or obstruction · emergency",
                next: "sc-chole-major-duct-injury-or-obstruction"
            },
            {
                label: "Bleeding from the liver bed or cystic artery · emergency",
                next: "sc-chole-bleeding-from-the-liver-bed-or-cystic-artery"
            },
            {
                label: "Port-site infection",
                next: "sc-chole-port-site-infection"
            },
            {
                label: "Diarrhea after cholecystectomy",
                next: "sc-chole-diarrhea-after-cholecystectomy"
            }
        ]
    },
    {
        id: "sc-chole-bile-leak-or-biloma",
        type: "result",
        module: 3,
        title: "Bile leak or biloma",
        body: "**When to suspect it**\nIn the first days, persistent RUQ pain, distension, fever or bilious drain output can reflect a cystic stump or small liver-bed duct leak. Jaundice can be absent.\n\n**Workup and interpretation**\nCheck CBC, liver tests and renal function. Contrast CT identifies collections and guides drainage but cannot establish that fluid is bile. If suspicion persists, hepatobiliary scintigraphy can demonstrate active leakage; contrast-enhanced MRCP better maps the site and duct continuity.",
        recommendation: "Keep NPO, give fluids and analgesia, and involve surgery now. Drain symptomatic or infected collections; give antibiotics for infection. GI can divert bile with ERCP and stenting for a communicating minor leak.",
        citation: [
            1,
            2
        ],
        confidence: "recommended"
    },
    {
        id: "sc-chole-retained-common-duct-stone-or-cholangitis",
        type: "result",
        module: 3,
        title: "Retained common duct stone or cholangitis",
        body: "**When to suspect it**\nRecurrent biliary pain, cholestasis or pancreatitis may follow surgery; fever or shock with obstruction suggests cholangitis.\n\n**Workup and interpretation**\nObtain liver tests, lipase, RUQ ultrasound and blood cultures if febrile. A visible stone supports obstruction; nondilated ducts or negative ultrasound can miss a stone. Stable intermediate-risk patients need MRCP or EUS.",
        recommendation: "Treat suspected cholangitis with IV antibiotics, resuscitation and urgent GI drainage, expedited in shock. For uncomplicated confirmed stones arrange therapeutic ERCP.",
        citation: [
            1,
            3
        ],
        confidence: "recommended"
    },
    {
        id: "sc-chole-major-duct-injury-or-obstruction",
        type: "result",
        module: 3,
        title: "Major duct injury or obstruction · emergency",
        body: "**When to suspect it**\nJaundice, pale stool or bile peritonitis after surgery can indicate clipping or transection of a major duct.\n\n**Workup and interpretation**\nObtain liver tests and contrast CT if stable, then MRCP to map duct continuity. Early bilirubin can be normal. ERCP may fail to show the upstream ducts after complete transection.",
        recommendation: "Call hepatobiliary surgery early; arrange specialist transfer. Control sepsis and drain collections. Definitive repair and timing depend on anatomy and specialist expertise.",
        citation: [
            1,
            2
        ],
        confidence: "recommended"
    },
    {
        id: "sc-chole-bleeding-from-the-liver-bed-or-cystic-artery",
        type: "result",
        module: 3,
        title: "Bleeding from the liver bed or cystic artery · emergency",
        body: "**When to suspect it**\nEarly tachycardia, syncope, increasing abdominal pain or bloody drain output may precede hypotension.\n\n**Workup and interpretation**\nCheck perfusion, serial CBC, coagulation tests and crossmatch. Use contrast CT/CTA if stable and bleeding is suspected. A normal initial hemoglobin or negative bedside ultrasound cannot clear ongoing hemorrhage.",
        recommendation: "Activate surgery, establish large-bore access and give blood products for hemorrhagic shock. Unstable patients need immediate hemorrhage control; surgery or IR can control a localized source.",
        citation: [
            1,
            27
        ],
        confidence: "recommended"
    },
    {
        id: "sc-chole-port-site-infection",
        type: "result",
        module: 3,
        title: "Port-site infection",
        body: "**When to suspect it**\nIncreasing redness, incisional pain, drainage or fever after discharge. Mild bruising alone is common; spreading erythema or purulence changes management.\n\n**Workup and interpretation**\nInspect each port and palpate for fluctuance. Ultrasound can identify a small abscess. Systemic illness, deep abdominal tenderness or worsening pain out of proportion requires surgical assessment for deeper infection, bile leak or fascial involvement.",
        recommendation: "Arrange drainage for a purulent collection and antibiotics for cellulitis or systemic signs. Rapid spread, toxicity or suspected deep infection requires urgent surgery and IV antibiotics.",
        citation: [
            6,
            42
        ],
        confidence: "recommended"
    },
    {
        id: "sc-chole-diarrhea-after-cholecystectomy",
        type: "result",
        module: 3,
        title: "Diarrhea after cholecystectomy",
        body: "**When to suspect it**\nLoose stools may occur as bile reaches the gut continuously. Persistent nonbloody watery diarrhea can reflect bile acid diarrhea.\n\n**Workup and interpretation**\nAssess volume status and medication/antibiotic exposure. Fever, bleeding, severe pain or recent antibiotics warrants evaluation for infection, including C. difficile when indicated. For persistent unexplained symptoms arrange GI evaluation and bile acid testing where available.",
        recommendation: "Replace fluid and electrolytes; smaller lower-fat meals may help during recovery. For ongoing suspected bile acid diarrhea, coordinate testing and a bile acid sequestrant with outpatient care. Admit for significant depletion or serious alternative causes.",
        citation: [
            42,
            43
        ],
        confidence: "recommended"
    },
    {
        id: "sc-appy",
        type: "question",
        module: 2,
        title: "Laparoscopic appendectomy",
        body: "The appendix is divided at its base on the cecum. The stump is sealed. The terminal ileum still empties into the cecum. Perforation at the original operation increases abscess risk.\n\n**Select the suspected complication.**",
        citation: [
            4
        ],
        options: [
            {
                label: "Intra-abdominal abscess",
                next: "sc-appy-intra-abdominal-abscess"
            },
            {
                label: "Port-site infection",
                next: "sc-appy-port-site-infection"
            },
            {
                label: "Ileus or early bowel obstruction",
                next: "sc-appy-ileus-or-early-bowel-obstruction"
            }
        ]
    },
    {
        id: "sc-appy-intra-abdominal-abscess",
        type: "result",
        module: 3,
        title: "Intra-abdominal abscess",
        body: "**When to suspect it**\nRecurrent fever, focal pain, anorexia or ileus after initial improvement, particularly after perforation.\n\n**Workup and interpretation**\nCheck CBC and renal function. In stable adults obtain CT abdomen/pelvis with IV contrast. A rim-enhancing collection supports abscess. If early imaging is unrevealing but illness persists, reassess with surgery and consider repeat imaging.",
        recommendation: "Resuscitate, start enteric gram-negative and anaerobic coverage for suspected infection; involve surgery for antibiotics alone versus image-guided or operative drainage.",
        citation: [
            4,
            5
        ],
        confidence: "recommended"
    },
    {
        id: "sc-appy-port-site-infection",
        type: "result",
        module: 3,
        title: "Port-site infection",
        body: "**When to suspect it**\nIncreasing incisional pain, warmth, spreading erythema or purulence in the days after discharge.\n\n**Workup and interpretation**\nInspect all wounds. Ultrasound can distinguish cellulitis from a superficial collection. Deep pain, systemic toxicity or crepitus warrants immediate surgical assessment for deep infection.",
        recommendation: "Arrange opening/drainage of a purulent wound with surgery; add antibiotics for cellulitis or systemic illness. Admit and treat broadly for deep infection.",
        citation: [
            6
        ],
        confidence: "recommended"
    },
    {
        id: "sc-appy-ileus-or-early-bowel-obstruction",
        type: "result",
        module: 3,
        title: "Ileus or early bowel obstruction",
        body: "**When to suspect it**\nDistension, vomiting and failure to pass flatus, especially after initial return of bowel function.\n\n**Workup and interpretation**\nCheck electrolytes; CT with IV contrast can show a transition point, herniated loop or ischemia. Diffuse dilation without a transition favors ileus. Persistent focal pain requires serial examination even with equivocal CT.",
        recommendation: "NPO, IV fluids, electrolyte correction and NG decompression for significant vomiting. Call surgery early; peritonitis, strangulation or closed-loop obstruction needs urgent operative assessment.",
        citation: [
            7
        ],
        confidence: "recommended"
    },
    {
        id: "sc-colorectal-surgery",
        type: "question",
        module: 1,
        title: "Colorectal surgery",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Sigmoid colectomy with primary anastomosis",
                next: "sc-colectomy"
            },
            {
                label: "Diverting loop ileostomy",
                next: "sc-ileostomy"
            }
        ]
    },
    {
        id: "sc-colectomy",
        type: "question",
        module: 2,
        title: "Sigmoid colectomy with primary anastomosis",
        body: "The sigmoid segment is removed. The descending colon is joined to the upper rectum. A diverting stoma, if present, may blunt symptoms of a pelvic leak.\n\n[Open before-and-after atlas](#/image/surgical-complications/colectomy-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/colectomy-atlas.jpg",
                alt: "The sigmoid segment is removed. The descending colon is joined to the upper rectum. A diverting stoma, if present, may blunt symptoms of a pelvic leak.",
                caption: "After sigmoid resection, the descending colon meets the rectum at the pelvic staple line. A leak here can produce a pelvic collection. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            8
        ],
        options: [
            {
                label: "Anastomotic leak or pelvic abscess · emergency",
                next: "sc-colectomy-anastomotic-leak-or-pelvic-abscess"
            },
            {
                label: "Ileus or mechanical obstruction",
                next: "sc-colectomy-ileus-or-mechanical-obstruction"
            }
        ]
    },
    {
        id: "sc-colectomy-anastomotic-leak-or-pelvic-abscess",
        type: "result",
        module: 3,
        title: "Anastomotic leak or pelvic abscess · emergency",
        body: "**When to suspect it**\nNew tachycardia, fever, pelvic pain, unexplained ileus or deterioration after initial recovery. Feculent drain output is highly concerning.\n\n**Workup and interpretation**\nIf stable obtain contrast CT abdomen/pelvis. With surgery and radiology, consider water-soluble rectal contrast to reach the join. Extraluminal contrast supports a leak; a negative early CT does not exclude it.",
        recommendation: "NPO, IV fluids and broad enteric antibiotics. Call colorectal surgery now for drainage, diversion or reoperation. Peritonitis or shock warrants immediate source control assessment without waiting for imaging.",
        citation: [
            8
        ],
        confidence: "recommended"
    },
    {
        id: "sc-colectomy-ileus-or-mechanical-obstruction",
        type: "result",
        module: 3,
        title: "Ileus or mechanical obstruction",
        body: "**When to suspect it**\nVomiting, distension and decreasing flatus/output. Recurrent symptoms after initial bowel function raise concern for obstruction or leak.\n\n**Workup and interpretation**\nExamine wounds and stoma if present. Check electrolytes and CT with IV contrast for a transition point, compromised bowel or pelvic collection. Reassess if pain worsens despite apparently diffuse ileus.",
        recommendation: "NPO, fluids, correct electrolytes, NG decompression for vomiting. Involve surgery; peritonitis or threatened bowel requires urgent intervention.",
        citation: [
            7,
            8
        ],
        confidence: "recommended"
    },
    {
        id: "sc-ileostomy",
        type: "question",
        module: 2,
        title: "Diverting loop ileostomy",
        body: "A loop of ileum is brought through the abdominal wall and opened. The proximal lumen drains stool into a pouch; the distal lumen leads toward the defunctioned colon. The colon remains in place.\n\n[Open before-and-after atlas](#/image/surgical-complications/ileostomy-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/ileostomy-atlas.jpg",
                alt: "A loop of ileum is brought through the abdominal wall and opened. The proximal lumen drains stool into a pouch; the distal lumen leads toward the defunctioned colon. The colon remains in place.",
                caption: "This sectional teaching model shows two limbs of one ileal loop in the same fascial opening. The proximal spout carries intestinal output; the shorter distal limb continues toward the diverted colon. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            9
        ],
        options: [
            {
                label: "High output and dehydration",
                next: "sc-ileostomy-high-output-and-dehydration"
            },
            {
                label: "Stoma outlet obstruction or ischemia · emergency",
                next: "sc-ileostomy-stoma-outlet-obstruction-or-ischemia"
            }
        ]
    },
    {
        id: "sc-ileostomy-high-output-and-dehydration",
        type: "result",
        module: 3,
        title: "High output and dehydration",
        body: "**When to suspect it**\nWatery losses, thirst, orthostasis or oliguria, often early after discharge. Compare measured output with baseline, intake and urine volume.\n\n**Workup and interpretation**\nCheck creatinine, sodium, potassium and magnesium; assess volume status. Look for infection or partial obstruction when output abruptly changes. A single output measurement cannot exclude cumulative depletion.",
        recommendation: "Replace intravascular volume with isotonic IV fluid when depleted, correct electrolytes and use sodium-containing oral rehydration when tolerated. Coordinate output-reducing therapy after excluding obstruction; admit for AKI or ongoing losses.",
        citation: [
            9,
            10
        ],
        confidence: "recommended"
    },
    {
        id: "sc-ileostomy-stoma-outlet-obstruction-or-ischemia",
        type: "result",
        module: 3,
        title: "Stoma outlet obstruction or ischemia · emergency",
        body: "**When to suspect it**\nCramping, vomiting and little output suggest blockage. A dusky or black stoma raises concern for ischemia.\n\n**Workup and interpretation**\nRemove pouch and inspect viability, examine abdomen; CT with IV contrast if stable. Surgery assesses depth of ischemia relative to fascia. Some liquid output does not exclude partial obstruction.",
        recommendation: "NPO, IV fluids, NG decompression when vomiting and urgent surgical review. Avoid blind stomal instrumentation. Ischemia extending below fascia needs emergency operative assessment.",
        citation: [
            9,
            10
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cardiac-surgery",
        type: "question",
        module: 1,
        title: "Cardiac surgery",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Coronary artery bypass grafting (CABG)",
                next: "sc-cabg"
            },
            {
                label: "Surgical aortic valve replacement",
                next: "sc-savr"
            }
        ]
    },
    {
        id: "sc-cabg",
        type: "question",
        module: 2,
        title: "Coronary artery bypass grafting (CABG)",
        body: "One common graft leaves the left internal thoracic artery attached to its subclavian inflow and sews its distal end to the LAD beyond a stenosis. Other grafts may connect the aorta to other coronary targets.\n\n[Open before-and-after atlas](#/image/surgical-complications/cabg-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/cabg-atlas.jpg",
                alt: "One common graft leaves the left internal thoracic artery attached to its subclavian inflow and sews its distal end to the LAD beyond a stenosis. Other grafts may connect the aorta to other coronary targets.",
                caption: "The internal thoracic artery retains subclavian inflow and delivers blood to the LAD beyond the native stenosis. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            11
        ],
        options: [
            {
                label: "Postoperative atrial fibrillation",
                next: "sc-cabg-postoperative-atrial-fibrillation"
            },
            {
                label: "Bleeding or localized tamponade · emergency",
                next: "sc-cabg-bleeding-or-localized-tamponade"
            },
            {
                label: "Early graft failure or perioperative MI · emergency",
                next: "sc-cabg-early-graft-failure-or-perioperative-mi"
            }
        ]
    },
    {
        id: "sc-cabg-postoperative-atrial-fibrillation",
        type: "result",
        module: 3,
        title: "Postoperative atrial fibrillation",
        body: "**When to suspect it**\nNew palpitations, irregular pulse or dyspnea, often in the first postoperative days.\n\n**Workup and interpretation**\nECG confirms rhythm. Check oxygenation, potassium, magnesium, volume status, anemia and infection. Shock out of proportion to rate demands assessment for bleeding, tamponade or ischemia.",
        recommendation: "If AF causes instability use synchronized cardioversion. If stable, correct triggers and individualize rate or rhythm control with cardiac surgery. Weigh anticoagulation against fresh surgical bleeding and AF duration.",
        citation: [
            12
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cabg-bleeding-or-localized-tamponade",
        type: "result",
        module: 3,
        title: "Bleeding or localized tamponade · emergency",
        body: "**When to suspect it**\nHypotension, oliguria, rising venous pressure or abrupt cessation of drain output can reflect a loculated clot compressing a chamber.\n\n**Workup and interpretation**\nBedside echo, CBC, coagulation studies and crossmatch. Classic tamponade signs and circumferential fluid may be absent. If TTE is nondiagnostic, urgent TEE or operative assessment is appropriate.",
        recommendation: "Activate cardiac surgery immediately, resuscitate with blood when bleeding and expedite surgical decompression/re-exploration. A clotted postoperative collection may be inaccessible to needle drainage.",
        citation: [
            13
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cabg-early-graft-failure-or-perioperative-mi",
        type: "result",
        module: 3,
        title: "Early graft failure or perioperative MI · emergency",
        body: "**When to suspect it**\nPersistent ischemic pain, new ventricular arrhythmia, low output or new ST changes.\n\n**Workup and interpretation**\nCompare serial ECGs and troponin with perioperative baseline. Echo for new regional dysfunction. Troponin rises after bypass and cannot diagnose graft occlusion by itself; ongoing ischemia may require urgent angiography.",
        recommendation: "Contact cardiac surgery and interventional cardiology immediately for revascularization strategy. Balance antithrombotic treatment with recent sternotomy and bleeding.",
        citation: [
            11
        ],
        confidence: "recommended"
    },
    {
        id: "sc-savr",
        type: "question",
        module: 2,
        title: "Surgical aortic valve replacement",
        body: "The surgeon removes diseased native leaflets and seats a tissue or mechanical prosthesis in the aortic annulus between the LV outflow tract and ascending aorta. Nearby conduction tissue is vulnerable.\n\n[Open before-and-after atlas](#/image/surgical-complications/savr-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/savr-atlas.jpg",
                alt: "The surgeon removes diseased native leaflets and seats a tissue or mechanical prosthesis in the aortic annulus between the LV outflow tract and ascending aorta. Nearby conduction tissue is vulnerable.",
                caption: "The sewing ring anchors the tissue prosthesis at the aortic annulus. The coronary openings lie above it. This example shows a bioprosthetic replacement. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            14
        ],
        options: [
            {
                label: "New conduction block",
                next: "sc-savr-new-conduction-block"
            },
            {
                label: "Prosthetic dysfunction or thrombosis · emergency",
                next: "sc-savr-prosthetic-dysfunction-or-thrombosis"
            },
            {
                label: "Postoperative AF or tamponade",
                next: "sc-savr-postoperative-af-or-tamponade"
            }
        ]
    },
    {
        id: "sc-savr-new-conduction-block",
        type: "result",
        module: 3,
        title: "New conduction block",
        body: "**When to suspect it**\nBradycardia, presyncope or low output soon after surgery may signal high-grade AV block.\n\n**Workup and interpretation**\nECG, telemetry, electrolytes and review AV nodal drugs and temporary pacing-wire status. A single sinus-rhythm ECG can miss intermittent block.",
        recommendation: "For unstable bradycardia initiate emergency pacing and resuscitation per protocol; involve cardiac surgery/electrophysiology for temporary and possible permanent pacing.",
        citation: [
            15
        ],
        confidence: "recommended"
    },
    {
        id: "sc-savr-prosthetic-dysfunction-or-thrombosis",
        type: "result",
        module: 3,
        title: "Prosthetic dysfunction or thrombosis · emergency",
        body: "**When to suspect it**\nNew heart failure, syncope, embolic symptoms or a change in mechanical valve sound.\n\n**Workup and interpretation**\nIdentify valve type, anticoagulant history and INR if on warfarin. Compare urgent TTE gradients with baseline; arrange TEE, gated CT or fluoroscopy when imaging is limited. Fever also raises concern for endocarditis.",
        recommendation: "Admit and engage the valve team urgently. Treatment depends on obstruction, valve type and bleeding risk. Avoid empiric thrombolysis after recent surgery without specialist assessment.",
        citation: [
            14
        ],
        confidence: "recommended"
    },
    {
        id: "sc-savr-postoperative-af-or-tamponade",
        type: "result",
        module: 3,
        title: "Postoperative AF or tamponade",
        body: "**When to suspect it**\nPalpitations are common after valve surgery. Hypotension with rising venous pressure or oliguria may instead reflect bleeding into the pericardium.\n\n**Workup and interpretation**\nECG and telemetry for AF; CBC, electrolytes and urgent echo for shock. An unrevealing TTE cannot clear a localized clot; involve cardiac surgery for TEE or exploration.",
        recommendation: "Cardiovert AF causing instability. With suspected tamponade activate cardiac surgery for decompression now. In stable AF correct triggers and discuss rate/rhythm control and valve-specific anticoagulation.",
        citation: [
            12,
            13,
            14
        ],
        confidence: "recommended"
    },
    {
        id: "sc-vascular-surgery",
        type: "question",
        module: 1,
        title: "Vascular surgery",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Endovascular abdominal aortic aneurysm repair (EVAR)",
                next: "sc-evar"
            },
            {
                label: "Femoropopliteal bypass",
                next: "sc-bypass"
            }
        ]
    },
    {
        id: "sc-evar",
        type: "question",
        module: 2,
        title: "Endovascular abdominal aortic aneurysm repair (EVAR)",
        body: "A bifurcated covered graft lines the infrarenal aorta and extends into the iliac arteries. Blood flows inside the graft; the aneurysm sac remains outside it.\n\n[Open before-and-after atlas](#/image/surgical-complications/evar-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/evar-atlas.jpg",
                alt: "A bifurcated covered graft lines the infrarenal aorta and extends into the iliac arteries. Blood flows inside the graft; the aneurysm sac remains outside it.",
                caption: "The renal arteries remain above the proximal seal. The graft carries blood through the aneurysm into both iliac limbs; the surrounding sac remains in place. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            16
        ],
        options: [
            {
                label: "Endoleak, sac expansion or rupture · emergency if symptomatic",
                next: "sc-evar-endoleak-sac-expansion-or-rupture"
            },
            {
                label: "Limb occlusion or access-site injury",
                next: "sc-evar-limb-occlusion-or-access-site-injury"
            }
        ]
    },
    {
        id: "sc-evar-endoleak-sac-expansion-or-rupture",
        type: "result",
        module: 3,
        title: "Endoleak, sac expansion or rupture · emergency if symptomatic",
        body: "**When to suspect it**\nAbrupt abdominal/back pain, syncope or shock can signal pressurization or rupture. Type II branch backflow is often discovered on surveillance.\n\n**Workup and interpretation**\nStable symptomatic patients need urgent CTA with an endograft protocol, including delayed phase when indicated. Compare sac size with prior studies. Bedside ultrasound cannot exclude an endoleak or retroperitoneal rupture.",
        recommendation: "Call vascular surgery immediately for symptoms or shock. Type I seal failure and type III graft defects generally need prompt repair. Isolated type II with stable sac is usually surveilled by vascular surgery.",
        citation: [
            16
        ],
        confidence: "recommended"
    },
    {
        id: "sc-evar-limb-occlusion-or-access-site-injury",
        type: "result",
        module: 3,
        title: "Limb occlusion or access-site injury",
        body: "**When to suspect it**\nNew unilateral leg pain, cool foot or weakness suggests graft limb occlusion. Groin swelling, bruit or falling hemoglobin suggests puncture injury or retroperitoneal bleeding.\n\n**Workup and interpretation**\nExamine motor/sensation and Doppler both feet. Use duplex for groin pseudoaneurysm, CTA for graft anatomy or retroperitoneal bleed if stable. Preserved distal signals do not exclude access hemorrhage.",
        recommendation: "Activate vascular surgery. Withhold heparin if active or concealed hemorrhage is suspected. For a confirmed ischemic presentation without a bleeding contraindication, start IV unfractionated heparin. Control access hemorrhage and expedite repair or revascularization.",
        citation: [
            16,
            17
        ],
        confidence: "recommended"
    },
    {
        id: "sc-bypass",
        type: "question",
        module: 2,
        title: "Femoropopliteal bypass",
        body: "A vein or prosthetic conduit connects femoral inflow to the popliteal artery beyond diseased superficial femoral artery. The native diseased segment remains in place.\n\n[Open before-and-after atlas](#/image/surgical-complications/bypass-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/bypass-atlas.jpg",
                alt: "A vein or prosthetic conduit connects femoral inflow to the popliteal artery beyond diseased superficial femoral artery. The native diseased segment remains in place.",
                caption: "The vein graft takes blood from the common femoral artery to the popliteal artery beyond the diseased native segment. Either anastomosis or the conduit can obstruct. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            17
        ],
        options: [
            {
                label: "Acute graft thrombosis · emergency",
                next: "sc-bypass-acute-graft-thrombosis"
            },
            {
                label: "Reperfusion compartment syndrome · emergency",
                next: "sc-bypass-reperfusion-compartment-syndrome"
            },
            {
                label: "Wound infection or graft involvement",
                next: "sc-bypass-wound-infection-or-graft-involvement"
            }
        ]
    },
    {
        id: "sc-bypass-acute-graft-thrombosis",
        type: "result",
        module: 3,
        title: "Acute graft thrombosis · emergency",
        body: "**When to suspect it**\nSudden pain, pallor, sensory loss or weakness. Compare with baseline signals; motor deficit means an immediately threatened limb.\n\n**Workup and interpretation**\nCheck Doppler arterial and venous signals and document motor/sensory function. Obtain duplex or CTA only if it will not delay treatment of a threatened limb. A palpable proximal pulse cannot clear distal ischemia.",
        recommendation: "Activate vascular surgery immediately and give IV unfractionated heparin unless contraindicated. Expedite revascularization; reassess for reperfusion compartment syndrome.",
        citation: [
            17
        ],
        confidence: "recommended"
    },
    {
        id: "sc-bypass-reperfusion-compartment-syndrome",
        type: "result",
        module: 3,
        title: "Reperfusion compartment syndrome · emergency",
        body: "**When to suspect it**\nEscalating calf pain, tense compartments, pain on passive stretch or new weakness after flow restoration. Pulses may remain present.\n\n**Workup and interpretation**\nSerial limb exams. Measure compartment pressures if the exam is unreliable or equivocal; do not delay treatment for a convincing clinical syndrome.",
        recommendation: "Remove constriction and obtain immediate surgical assessment for fasciotomy. Check potassium, renal function and CK for systemic reperfusion injury.",
        citation: [
            17
        ],
        confidence: "recommended"
    },
    {
        id: "sc-bypass-wound-infection-or-graft-involvement",
        type: "result",
        module: 3,
        title: "Wound infection or graft involvement",
        body: "**When to suspect it**\nErythema or drainage at groin/leg incision; exposed graft, pulsatile mass or sentinel bleeding suggests deep graft complication.\n\n**Workup and interpretation**\nInspect gently, check perfusion and obtain cultures if septic. Duplex or CTA helps evaluate deeper involvement if stable. Superficial appearance can underestimate extension.",
        recommendation: "Involve vascular surgery promptly; treat sepsis with IV antibiotics. Bleeding or exposed graft needs emergency vascular assessment. Avoid bedside incision of a pulsatile collection.",
        citation: [
            18
        ],
        confidence: "recommended"
    },
    {
        id: "sc-ent",
        type: "question",
        module: 1,
        title: "ENT",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Tonsillectomy",
                next: "sc-tonsil"
            },
            {
                label: "Total thyroidectomy",
                next: "sc-thyroid"
            }
        ]
    },
    {
        id: "sc-tonsil",
        type: "question",
        module: 2,
        title: "Tonsillectomy",
        body: "The palatine tonsils are removed from the lateral oropharynx between the anterior and posterior pillars. The exposed fossae heal under a fibrin coating. Swallowed blood can conceal the size of a bleed.\n\n[Open before-and-after atlas](#/image/surgical-complications/tonsil-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/tonsil-atlas.jpg",
                alt: "The palatine tonsils are removed from the lateral oropharynx between the anterior and posterior pillars. The exposed fossae heal under a fibrin coating. Swallowed blood can conceal the size of a bleed.",
                caption: "The tonsils are removed from between the pillars. Pale fibrin can cover a healing fossa. Fresh blood or a clot warrants urgent evaluation. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            19,
            20
        ],
        options: [
            {
                label: "Primary or secondary hemorrhage · emergency",
                next: "sc-tonsil-primary-or-secondary-hemorrhage"
            },
            {
                label: "Pain, poor intake and dehydration",
                next: "sc-tonsil-pain-poor-intake-and-dehydration"
            }
        ]
    },
    {
        id: "sc-tonsil-primary-or-secondary-hemorrhage",
        type: "result",
        module: 3,
        title: "Primary or secondary hemorrhage · emergency",
        body: "**When to suspect it**\nBright red saliva, hematemesis, frequent swallowing or a clot in a fossa. Primary bleeding occurs within 24 h; secondary bleeding often occurs around days 5–10.\n\n**Workup and interpretation**\nSit upright if protecting the airway, suction available. Inspect gently without disturbing a clot. Assess perfusion, CBC and type/screen or crossmatch. A normal exam after witnessed bleeding does not establish safety.",
        recommendation: "NPO, IV access, early ENT; mobilize anesthesia for brisk bleeding or airway concern. Consider topical/nebulized TXA per protocol. Recurrent or active bleeding needs operative control; coordinate observation even if bleeding stops.",
        citation: [
            19
        ],
        confidence: "recommended"
    },
    {
        id: "sc-tonsil-pain-poor-intake-and-dehydration",
        type: "result",
        module: 3,
        title: "Pain, poor intake and dehydration",
        body: "**When to suspect it**\nOdynophagia or referred ear pain reduces intake. White fibrin covering the fossae is expected.\n\n**Workup and interpretation**\nAssess urine output, hydration and oral tolerance; ask about blood or repeated swallowing. Fever with toxicity, trismus or asymmetric swelling warrants evaluation for deep infection.",
        recommendation: "Give analgesia and antiemetic as appropriate, oral fluids if safe or IV if depleted. Reassess oral intake before discharge. For children use guideline-based analgesia and avoid codeine after tonsillectomy.",
        citation: [
            20
        ],
        confidence: "recommended"
    },
    {
        id: "sc-thyroid",
        type: "question",
        module: 2,
        title: "Total thyroidectomy",
        body: "Both thyroid lobes and the isthmus are removed from the anterior trachea. The parathyroids and recurrent laryngeal nerves normally remain; impaired blood supply or traction can affect their function.\n\n[Open before-and-after atlas](#/image/surgical-complications/thyroid-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/thyroid-atlas.jpg",
                alt: "Both thyroid lobes and the isthmus are removed from the anterior trachea. The parathyroids and recurrent laryngeal nerves normally remain; impaired blood supply or traction can affect their function.",
                caption: "After removal of both lobes and the isthmus, the trachea is exposed. The recurrent laryngeal nerve and parathyroid glands lie in the operative bed. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            21,
            22
        ],
        options: [
            {
                label: "Expanding neck hematoma · airway emergency",
                next: "sc-thyroid-expanding-neck-hematoma"
            },
            {
                label: "Hypocalcemia",
                next: "sc-thyroid-hypocalcemia"
            },
            {
                label: "New dysphonia or stridor",
                next: "sc-thyroid-new-dysphonia-or-stridor"
            }
        ]
    },
    {
        id: "sc-thyroid-expanding-neck-hematoma",
        type: "result",
        module: 3,
        title: "Expanding neck hematoma · airway emergency",
        body: "**When to suspect it**\nNeck tightness, dysphagia, swelling, anxiety or tachypnea in the first hours may precede stridor or hypoxemia.\n\n**Workup and interpretation**\nAssess at bedside and expose the neck. A normal oxygen saturation or functioning drain does not exclude compression. Do not take an unstable airway to imaging.",
        recommendation: "Call anesthesia and thyroid surgeon immediately, give oxygen and sit upright if tolerated. With airway compromise, trained clinicians should immediately open the wound and strap-muscle layer to evacuate clot per emergency protocol; prepare difficult airway and definitive operative hemostasis.",
        citation: [
            21
        ],
        confidence: "recommended"
    },
    {
        id: "sc-thyroid-hypocalcemia",
        type: "result",
        module: 3,
        title: "Hypocalcemia",
        body: "**When to suspect it**\nPerioral tingling, paresthesias, tetany or prolonged QT in the first days suggest transient or persistent hypoparathyroidism.\n\n**Workup and interpretation**\nCheck ionized calcium, magnesium, phosphate, renal function, PTH and ECG. Recheck calcium if symptoms evolve despite an initially normal value.",
        recommendation: "Severe symptoms, arrhythmia or marked hypocalcemia require monitored IV calcium gluconate and magnesium correction. For mild disease coordinate oral calcium and active vitamin D, serial calcium and follow-up.",
        citation: [
            22
        ],
        confidence: "recommended"
    },
    {
        id: "sc-thyroid-new-dysphonia-or-stridor",
        type: "result",
        module: 3,
        title: "New dysphonia or stridor",
        body: "**When to suspect it**\nRecurrent laryngeal nerve dysfunction can produce hoarseness or aspiration; bilateral immobility can obstruct the airway.\n\n**Workup and interpretation**\nLook immediately for expanding neck hematoma. If stable, arrange flexible laryngoscopy for vocal fold movement. Voice quality alone cannot establish glottic patency.",
        recommendation: "Involve ENT and anesthesia urgently for stridor or respiratory distress; support oxygenation and secure a threatened airway. For isolated stable dysphonia obtain ENT assessment and swallowing precautions if aspirating.",
        citation: [
            21,
            38
        ],
        confidence: "recommended"
    },
    {
        id: "sc-ob-gyn",
        type: "question",
        module: 1,
        title: "OB/GYN",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Cesarean delivery (low transverse hysterotomy)",
                next: "sc-cesarean"
            },
            {
                label: "Total hysterectomy",
                next: "sc-hyst"
            }
        ]
    },
    {
        id: "sc-cesarean",
        type: "question",
        module: 2,
        title: "Cesarean delivery (low transverse hysterotomy)",
        body: "Through the abdominal wall, the surgeon opens the lower uterine segment, delivers the infant and placenta and closes the uterine incision. The skin scar cannot identify the type of uterine incision.\n\n**Select the suspected complication.**",
        citation: [
            23
        ],
        options: [
            {
                label: "Postpartum hemorrhage · emergency",
                next: "sc-cesarean-postpartum-hemorrhage"
            },
            {
                label: "Endometritis or wound infection",
                next: "sc-cesarean-endometritis-or-wound-infection"
            }
        ]
    },
    {
        id: "sc-cesarean-postpartum-hemorrhage",
        type: "result",
        module: 3,
        title: "Postpartum hemorrhage · emergency",
        body: "**When to suspect it**\nHeavy bleeding, boggy uterus or shock. After cesarean, concealed abdominal or pelvic bleeding may occur with little vaginal loss.\n\n**Workup and interpretation**\nQuantify loss, assess tone, trauma, retained tissue and coagulopathy. Check CBC, fibrinogen, coagulation tests and crossmatch. Do not await a hemoglobin drop or ultrasound before treating shock.",
        recommendation: "Activate obstetric hemorrhage response. Massage an atonic uterus, give oxytocin, IV access/fluids and blood as indicated; give TXA for diagnosed PPH within 3 h of birth per protocol. Obtain operative control for ongoing or concealed bleeding.",
        citation: [
            23,
            24
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cesarean-endometritis-or-wound-infection",
        type: "result",
        module: 3,
        title: "Endometritis or wound infection",
        body: "**When to suspect it**\nFever, uterine tenderness and malodorous lochia suggest endometritis. Examine the incision for erythema, drainage, collection or fascial separation.\n\n**Workup and interpretation**\nEndometritis is a clinical diagnosis. Check perfusion, CBC and cultures if septic; image for retained tissue, abscess or other source if persistent fever or poor response. Normal ultrasound does not exclude infection.",
        recommendation: "Call obstetrics. Start broad IV antibiotics for endometritis (e.g., clindamycin plus gentamicin per local protocol, adjusted for renal function). Drain wound abscesses; fascial disruption or rapidly progressive infection needs emergency surgery.",
        citation: [
            23,
            25,
            6
        ],
        confidence: "recommended"
    },
    {
        id: "sc-hyst",
        type: "question",
        module: 2,
        title: "Total hysterectomy",
        body: "The uterus and cervix are removed and the vaginal apex is closed as a cuff. Ovaries may remain. The ureters pass close to the uterine vessels and cuff; injury may present after discharge.\n\n[Open before-and-after atlas](#/image/surgical-complications/hyst-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/hyst-atlas.jpg",
                alt: "The uterus and cervix are removed and the vaginal apex is closed as a cuff. Ovaries may remain. The ureters pass close to the uterine vessels and cuff; injury may present after discharge.",
                caption: "This variant includes bilateral salpingectomy. Both ovaries remain on the pelvic sidewalls; the closed vaginal cuff lies behind the bladder. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            26,
            28
        ],
        options: [
            {
                label: "Vaginal cuff bleeding or dehiscence",
                next: "sc-hyst-vaginal-cuff-bleeding-or-dehiscence"
            },
            {
                label: "Ureteral obstruction or urine leak",
                next: "sc-hyst-ureteral-obstruction-or-urine-leak"
            },
            {
                label: "Cuff cellulitis or pelvic abscess",
                next: "sc-hyst-cuff-cellulitis-or-pelvic-abscess"
            }
        ]
    },
    {
        id: "sc-hyst-vaginal-cuff-bleeding-or-dehiscence",
        type: "result",
        module: 3,
        title: "Vaginal cuff bleeding or dehiscence",
        body: "**When to suspect it**\nPelvic pressure, bleeding, watery discharge or visible bowel, sometimes weeks after surgery.\n\n**Workup and interpretation**\nCheck hemodynamics, CBC and type/screen; obtain urgent gynecologic examination. Use a gentle exam because manipulation can worsen evisceration. An unremarkable abdominal scan cannot establish cuff integrity.",
        recommendation: "NPO, IV access and urgent gynecology. For evisceration cover exposed bowel with warm sterile saline-moistened material, give broad IV antibiotics and proceed to emergency surgical repair.",
        citation: [
            26
        ],
        confidence: "recommended"
    },
    {
        id: "sc-hyst-ureteral-obstruction-or-urine-leak",
        type: "result",
        module: 3,
        title: "Ureteral obstruction or urine leak",
        body: "**When to suspect it**\nFlank pain, fever, watery vaginal drainage or urinoma; urine output and creatinine may remain normal with unilateral injury.\n\n**Workup and interpretation**\nStable patients need CT urography with delayed excretory images. Hydronephrosis, extravasation or absent downstream opacification prompts urology assessment; retrograde pyelography can clarify equivocal studies.",
        recommendation: "Involve gynecology and urology. Treat sepsis promptly; decompression by stent or nephrostomy and subsequent repair depend on site, timing and viability.",
        citation: [
            28
        ],
        confidence: "recommended"
    },
    {
        id: "sc-hyst-cuff-cellulitis-or-pelvic-abscess",
        type: "result",
        module: 3,
        title: "Cuff cellulitis or pelvic abscess",
        body: "**When to suspect it**\nFever, increasing pelvic pain and purulent discharge in the days after surgery.\n\n**Workup and interpretation**\nAssess the cuff with gynecology, CBC and hemodynamics. Image pelvis with ultrasound or contrast CT if deep collection is suspected. Persistent fever despite antibiotics warrants reassessment for abscess or urinary injury.",
        recommendation: "Start antibiotics covering vaginal and enteric flora per severity. Admit for systemic illness or pelvic abscess; involve gynecology/IR for source control.",
        citation: [
            5,
            6,
            39
        ],
        confidence: "recommended"
    },
    {
        id: "sc-surgical-oncology",
        type: "question",
        module: 1,
        title: "Surgical oncology",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Mastectomy (simple, without reconstruction)",
                next: "sc-breast"
            },
            {
                label: "Pancreaticoduodenectomy (classic Whipple)",
                next: "sc-whipple"
            }
        ]
    },
    {
        id: "sc-breast",
        type: "question",
        module: 2,
        title: "Mastectomy (simple, without reconstruction)",
        body: "Breast gland and nipple–areolar complex are removed anterior to the pectoral fascia. Skin flaps lie over the chest wall, leaving a potential space. Sentinel node biopsy or reconstruction changes the operative field.\n\n[Open before-and-after atlas](#/image/surgical-complications/breast-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/breast-atlas.jpg",
                alt: "Breast gland and nipple–areolar complex are removed anterior to the pectoral fascia. Skin flaps lie over the chest wall, leaving a potential space. Sentinel node biopsy or reconstruction changes the operative field.",
                caption: "The closed skin flap rests over the preserved pectoralis major. Fluid can collect between these layers after mastectomy. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            29
        ],
        options: [
            {
                label: "Seroma",
                next: "sc-breast-seroma"
            },
            {
                label: "Hematoma or threatened skin flap",
                next: "sc-breast-hematoma-or-threatened-skin-flap"
            },
            {
                label: "Cellulitis or infected collection",
                next: "sc-breast-cellulitis-or-infected-collection"
            }
        ]
    },
    {
        id: "sc-breast-seroma",
        type: "result",
        module: 3,
        title: "Seroma",
        body: "**When to suspect it**\nA soft, gradually enlarging pocket under the flap or in the axilla, commonly after drain removal.\n\n**Workup and interpretation**\nExamine skin, drain and collection. Ultrasound can define fluid if exam is unclear. Rapid growth, ecchymosis, warmth or fever warrants evaluation for bleeding or infection.",
        recommendation: "Small comfortable collections can be observed with breast-team follow-up. Coordinate aspiration of tense or symptomatic seroma; involve plastic surgery before aspirating near an implant or expander.",
        citation: [
            29,
            40
        ],
        confidence: "recommended"
    },
    {
        id: "sc-breast-hematoma-or-threatened-skin-flap",
        type: "result",
        module: 3,
        title: "Hematoma or threatened skin flap",
        body: "**When to suspect it**\nEarly rapid swelling, pain, bruising or bloody drain output. Tight skin or dusky edges suggest threatened perfusion.\n\n**Workup and interpretation**\nAssess vitals, flap color, capillary refill and drain patency; check serial CBC and crossmatch if significant. A quiet drain does not exclude blood under the flap.",
        recommendation: "Call breast surgery promptly, obtain IV access and resuscitate if needed. Expanding hematoma or threatened flap may need urgent evacuation. Involve plastics immediately if reconstructed.",
        citation: [
            29,
            40
        ],
        confidence: "recommended"
    },
    {
        id: "sc-breast-cellulitis-or-infected-collection",
        type: "result",
        module: 3,
        title: "Cellulitis or infected collection",
        body: "**When to suspect it**\nSpreading redness, tenderness, fever or purulent drainage, often after discharge.\n\n**Workup and interpretation**\nExamine flaps and drain sites; ultrasound for a drainable collection. Obtain fluid cultures when drained and blood cultures for sepsis.",
        recommendation: "Start antibiotics targeting likely skin organisms, broaden in severe illness and arrange source control. Urgently involve breast/plastic surgery for an implant, systemic illness or tissue necrosis.",
        citation: [
            6,
            29,
            40
        ],
        confidence: "recommended"
    },
    {
        id: "sc-whipple",
        type: "question",
        module: 2,
        title: "Pancreaticoduodenectomy (classic Whipple)",
        body: "The pancreatic head, duodenum, distal bile duct, gallbladder, proximal jejunum and distal stomach are removed. Pancreatic remnant, hepatic duct and stomach each drain into jejunum through separate joins. Pylorus-preserving variants retain the distal stomach.\n\n[Open Whipple reconstruction atlas](#/image/surgical-complications/whipple-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/whipple-atlas.jpg",
                alt: "Pancreatic remnant sewn to jejunum just above its blind staple line. Follow the bowel to the hepatic duct join and then the stomach join.",
                caption: "Pancreatic juice enters at the pancreatic suture line immediately above the blind jejunal staple line. Bile enters at the hepatic duct join; food enters farther downstream at the gastric join. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            30
        ],
        options: [
            {
                label: "Pancreatic fistula or infected collection",
                next: "sc-whipple-pancreatic-fistula-or-infected-collection"
            },
            {
                label: "Delayed gastric emptying",
                next: "sc-whipple-delayed-gastric-emptying"
            },
            {
                label: "Sentinel bleed or delayed hemorrhage · emergency",
                next: "sc-whipple-sentinel-bleed-or-delayed-hemorrhage"
            }
        ]
    },
    {
        id: "sc-whipple-pancreatic-fistula-or-infected-collection",
        type: "result",
        module: 3,
        title: "Pancreatic fistula or infected collection",
        body: "**When to suspect it**\nPersistent drain output, fever, pain or failure to recover may reflect a pancreaticojejunostomy leak.\n\n**Workup and interpretation**\nCheck drain amylase if available: on or after postoperative day 3, fluid amylase above three times the institutional upper normal serum value plus a clinically relevant consequence supports fistula. Contrast CT for collection; absence of a drain does not exclude a leak.",
        recommendation: "Involve pancreatic surgery early, support volume/nutrition and drain significant collections. Give antibiotics for infection. Watch for delayed arterial bleeding near the leak.",
        citation: [
            31,
            5
        ],
        confidence: "recommended"
    },
    {
        id: "sc-whipple-delayed-gastric-emptying",
        type: "result",
        module: 3,
        title: "Delayed gastric emptying",
        body: "**When to suspect it**\nEarly satiety, vomiting or persistent dependence on gastric decompression as diet advances.\n\n**Workup and interpretation**\nCheck hydration and electrolytes. CT and surgeon-directed contrast study or endoscopy can assess mechanical obstruction, leak or abscess before assigning delayed emptying.",
        recommendation: "IV fluids, electrolyte correction and decompression when indicated. Coordinate nutrition and prokinetic therapy with surgery after excluding a mechanical cause.",
        citation: [
            30,
            32
        ],
        confidence: "recommended"
    },
    {
        id: "sc-whipple-sentinel-bleed-or-delayed-hemorrhage",
        type: "result",
        module: 3,
        title: "Sentinel bleed or delayed hemorrhage · emergency",
        body: "**When to suspect it**\nEven transient blood from a drain, NG tube or GI tract may precede major bleeding from a pseudoaneurysm, particularly with a pancreatic leak.\n\n**Workup and interpretation**\nCrossmatch and trend perfusion. If stable obtain arterial-phase CTA and involve IR; intermittent bleeding may yield negative imaging. Persistent suspicion requires angiographic or surgical reassessment.",
        recommendation: "Activate pancreatic surgery and IR immediately, resuscitate with blood when indicated. Unstable patients require immediate control; angiographic embolization/stent or surgery depends on source and resources.",
        citation: [
            33
        ],
        confidence: "recommended"
    },
    {
        id: "sc-urology",
        type: "question",
        module: 1,
        title: "Urology",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Transurethral resection of the prostate (TURP)",
                next: "sc-turp"
            },
            {
                label: "Ureteroscopy with stone treatment and temporary stent",
                next: "sc-urs"
            }
        ]
    },
    {
        id: "sc-turp",
        type: "question",
        module: 2,
        title: "Transurethral resection of the prostate (TURP)",
        body: "Through the urethra, the surgeon removes obstructing periurethral prostate tissue, creating a wider channel from bladder neck to prostatic urethra. The outer prostate and external sphincter remain.\n\n[Open before-and-after atlas](#/image/surgical-complications/turp-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/turp-atlas.jpg",
                alt: "Through the urethra, the surgeon removes obstructing periurethral prostate tissue, creating a wider channel from bladder neck to prostatic urethra. The outer prostate and external sphincter remain.",
                caption: "Resection widens the channel from the bladder neck through the prostate. The outer gland and distal external sphincter remain. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            34
        ],
        options: [
            {
                label: "Hematuria and clot retention",
                next: "sc-turp-hematuria-and-clot-retention"
            },
            {
                label: "UTI or urosepsis",
                next: "sc-turp-uti-or-urosepsis"
            },
            {
                label: "Irrigant absorption · uncommon emergency",
                next: "sc-turp-irrigant-absorption"
            }
        ]
    },
    {
        id: "sc-turp-hematuria-and-clot-retention",
        type: "result",
        module: 3,
        title: "Hematuria and clot retention",
        body: "**When to suspect it**\nA distended painful bladder with reduced catheter drainage or leakage around the catheter suggests clot obstruction.\n\n**Workup and interpretation**\nAssess suprapubic fullness, bladder scan, catheter kinks, urine color, CBC and renal function. Account for irrigation inflow when measuring urine output. Pain with poor outflow warrants immediate reassessment.",
        recommendation: "Stop continuous inflow if outflow is blocked. Involve urology, use gentle manual saline irrigation through an appropriate large-bore catheter to clear clot, then continuous irrigation once draining. Failure to clear requires urgent cystoscopic evacuation/hemostasis.",
        citation: [
            34,
            35
        ],
        confidence: "recommended"
    },
    {
        id: "sc-turp-uti-or-urosepsis",
        type: "result",
        module: 3,
        title: "UTI or urosepsis",
        body: "**When to suspect it**\nDysuria is common after resection; new fever, rigors, flank pain or hypotension raises concern for infection.\n\n**Workup and interpretation**\nUrine culture and urinalysis, CBC/renal function; blood cultures and lactate if septic. Assess catheter patency and residual volume. Recent instrumentation can cause pyuria and hematuria without infection.",
        recommendation: "Treat symptomatic infection according to local resistance and prior cultures. Start prompt IV antibiotics for sepsis and coordinate drainage of an obstructed urinary tract with urology.",
        citation: [
            34,
            36
        ],
        confidence: "recommended"
    },
    {
        id: "sc-turp-irrigant-absorption",
        type: "result",
        module: 3,
        title: "Irrigant absorption · uncommon emergency",
        body: "**When to suspect it**\nEarly confusion, nausea, visual symptoms, arrhythmia or pulmonary edema. Dilutional hyponatremia chiefly follows monopolar resection with hypotonic irrigant; bipolar saline can still cause volume overload.\n\n**Workup and interpretation**\nClarify technique and irrigant, check sodium, osmolality, ECG and volume status urgently. Assess for bleeding, sepsis and medication effects in parallel.",
        recommendation: "Support oxygenation, stop ongoing absorption with the operative team, involve critical care. Treat severe symptomatic acute hyponatremia with monitored hypertonic saline per protocol and frequent sodium checks.",
        citation: [
            34,
            41
        ],
        confidence: "recommended"
    },
    {
        id: "sc-urs",
        type: "question",
        module: 2,
        title: "Ureteroscopy with stone treatment and temporary stent",
        body: "A scope passes from urethra through bladder into ureter. Stone fragments may be removed after laser treatment. A temporary double-J stent spans the ureter with one curl in the renal pelvis and one in the bladder.\n\n[Open before-and-after atlas](#/image/surgical-complications/urs-atlas.jpg)\n\n**Select the suspected complication.**",
        images: [
            {
                src: "images/surgical-complications/urs-atlas.jpg",
                alt: "A scope passes from urethra through bladder into ureter. Stone fragments may be removed after laser treatment. A temporary double-J stent spans the ureter with one curl in the renal pelvis and one in the bladder.",
                caption: "The stent spans the ureter, with one curl in the renal pelvis and the other inside the bladder. Position and patency are separate questions. Original AI-assisted myMedKitt illustration."
            }
        ],
        citation: [
            37
        ],
        options: [
            {
                label: "Stent discomfort or migration",
                next: "sc-urs-stent-discomfort-or-migration"
            },
            {
                label: "Infected obstruction · emergency",
                next: "sc-urs-infected-obstruction"
            }
        ]
    },
    {
        id: "sc-urs-stent-discomfort-or-migration",
        type: "result",
        module: 3,
        title: "Stent discomfort or migration",
        body: "**When to suspect it**\nUrgency, frequency, mild hematuria or flank pain during voiding are common. New severe pain or an unexpectedly displaced string suggests migration or obstruction.\n\n**Workup and interpretation**\nCheck vitals, creatinine, urine culture if infection suspected. Ultrasound assesses hydronephrosis; plain film for radiopaque stent position, CT if unclear. A correctly positioned stent may still be obstructed.",
        recommendation: "If stable with preserved drainage, provide appropriate analgesia and confirm dated removal/exchange plan with urology. Escalate persistent pain, AKI, fever or displaced stent; avoid pulling a string without the operating team's direction.",
        citation: [
            37
        ],
        confidence: "recommended"
    },
    {
        id: "sc-urs-infected-obstruction",
        type: "result",
        module: 3,
        title: "Infected obstruction · emergency",
        body: "**When to suspect it**\nFever, rigors, hypotension, oliguria or escalating flank pain after instrumentation, including with a stent already in place.\n\n**Workup and interpretation**\nObtain urine and blood cultures without delaying antibiotics, CBC, creatinine, lactate and prompt urinary tract imaging. Early obstruction may lack marked hydronephrosis; reassess urgently if septic despite negative ultrasound.",
        recommendation: "Give IV antibiotics and resuscitate; immediate urology consultation for urgent decompression by stent placement/exchange or nephrostomy. Defer definitive stone treatment until infection is controlled.",
        citation: [
            36,
            37
        ],
        confidence: "recommended"
    },
    {
        id: "sc-bariatric-surgery",
        type: "question",
        module: 1,
        title: "Bariatric surgery",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Sleeve gastrectomy",
                next: "sc-sleeve"
            },
            {
                label: "Roux-en-Y gastric bypass",
                next: "sc-rygb"
            },
            {
                label: "Adjustable gastric band (legacy)",
                next: "sc-band"
            }
        ]
    },
    {
        id: "sc-sleeve",
        type: "question",
        module: 2,
        title: "Sleeve gastrectomy",
        body: "The greater curvature and fundus are resected, leaving a narrow gastric tube along the lesser curvature. The pylorus, duodenum and intestinal continuity remain. A long staple line runs up to the angle of His.\n\n[Open before-and-after atlas](#/image/surgical-complications/sleeve-atlas.jpg)\n\n[Operative reference](https://www.niddk.nih.gov/health-information/weight-management/bariatric-surgery/types)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/sleeve-atlas.jpg", "alt": "The dotted outline marks the removed fundus and greater curvature. A long lateral staple line borders the remaining sleeve, with the pylorus and duodenum still in continuity.", "caption": "The dotted outline marks the removed fundus and greater curvature. A long lateral staple line borders the remaining sleeve, with the pylorus and duodenum still in continuity." }
        ],
        citation: [
            44,
            45
        ],
        options: [
            {
                label: "Staple-line leak or subphrenic collection",
                next: "sc-sleeve-staple-line-leak-or-subphrenic-collection"
            },
            {
                label: "Sleeve narrowing, twist or dehydration",
                next: "sc-sleeve-sleeve-narrowing-twist-or-dehydration"
            },
            {
                label: "Postoperative bleeding",
                next: "sc-sleeve-postoperative-bleeding"
            }
        ]
    },
    {
        id: "sc-sleeve-staple-line-leak-or-subphrenic-collection",
        type: "result",
        module: 3,
        title: "Staple-line leak or subphrenic collection",
        body: "**When to suspect it**\nUnexplained tachycardia, new LUQ or left shoulder pain, fever, dyspnea or failure to tolerate liquids, especially early after surgery. Peritonism can be minimal.\n\n**Workup and interpretation**\nAssess perfusion, CBC, renal function and lactate; investigate PE or bleeding in parallel as indicated. If stable, CT abdomen/pelvis with IV and water-soluble oral contrast if safe and feasible. Perigastric gas/fluid can be significant without visible extravasation. Negative CT or swallow study cannot clear a deteriorating patient.",
        recommendation: "NPO, IV fluids, broad IV enteric antibiotics, urgent bariatric surgery. Drainage, endoscopic therapy or washout depends on stability and containment. Shock or diffuse peritonitis warrants immediate operative assessment.",
        citation: [
            44,
            46
        ],
        confidence: "recommended"
    },
    {
        id: "sc-sleeve-sleeve-narrowing-twist-or-dehydration",
        type: "result",
        module: 3,
        title: "Sleeve narrowing, twist or dehydration",
        body: "**When to suspect it**\nProgressive regurgitation, dysphagia or vomiting after diet advancement. Angulation near the incisura can impair emptying despite an intact staple line.\n\n**Workup and interpretation**\nCheck hydration, electrolytes, magnesium and renal function. Contrast upper GI series can demonstrate angulation or delayed transit; bariatric endoscopy defines narrowing. Severe pain, tachycardia or fever requires leak and obstruction evaluation first.",
        recommendation: "IV rehydration and electrolyte correction. For protracted vomiting or neurologic signs give parenteral thiamine promptly, before or with carbohydrate; treat hypoglycemia immediately. Coordinate endoscopic dilation or revision with bariatric surgery.",
        citation: [
            44,
            46,
            47
        ],
        confidence: "recommended"
    },
    {
        id: "sc-sleeve-postoperative-bleeding",
        type: "result",
        module: 3,
        title: "Postoperative bleeding",
        body: "**When to suspect it**\nEarly tachycardia, syncope, distension or falling hemoglobin. Bleeding can be intraperitoneal without hematemesis or melena.\n\n**Workup and interpretation**\nAssess perfusion, serial hemoglobin, coagulation and crossmatch. CTA for ongoing extraluminal bleeding when stable; GI blood loss may need endoscopy. A normal first hemoglobin does not exclude hemorrhage.",
        recommendation: "Activate bariatric surgery; restore circulating volume with blood products as indicated. Ongoing shock needs immediate hemorrhage control. Stable patients may need endoscopy, embolization or re-exploration according to the source.",
        citation: [
            44,
            46
        ],
        confidence: "recommended"
    },
    {
        id: "sc-rygb",
        type: "question",
        module: 2,
        title: "Roux-en-Y gastric bypass",
        body: "Food passes from a small gastric pouch across the gastrojejunostomy into the Roux limb. The excluded stomach drains through the duodenum into the biliopancreatic limb. Those secretions meet food at the jejunojejunostomy. Mesenteric defects create sites for internal hernia.\n\n[Open before-and-after atlas](#/image/surgical-complications/rygb-atlas.jpg)\n\n[Operative reference](https://www.niddk.nih.gov/health-information/weight-management/bariatric-surgery/types)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/rygb-atlas.jpg", "alt": "Food travels from the small pouch down the Roux limb. Secretions from the excluded stomach and duodenum join the food stream at the jejunojejunostomy.", "caption": "Food travels from the small pouch down the Roux limb. Secretions from the excluded stomach and duodenum join the food stream at the jejunojejunostomy." }
        ],
        citation: [
            44,
            45
        ],
        options: [
            {
                label: "Internal hernia or closed-loop obstruction",
                next: "sc-rygb-internal-hernia-or-closed-loop-obstruction"
            },
            {
                label: "Gastrojejunal or jejunojejunal leak",
                next: "sc-rygb-gastrojejunal-or-jejunojejunal-leak"
            },
            {
                label: "Marginal ulcer, bleeding or perforation",
                next: "sc-rygb-marginal-ulcer-bleeding-or-perforation"
            },
            {
                label: "Gastrojejunal stricture",
                next: "sc-rygb-gastrojejunal-stricture"
            }
        ]
    },
    {
        id: "sc-rygb-internal-hernia-or-closed-loop-obstruction",
        type: "result",
        module: 3,
        title: "Internal hernia or closed-loop obstruction",
        body: "**When to suspect it**\nIntermittent postprandial cramping or abrupt severe epigastric pain months to years after bypass. Vomiting may be scant, particularly with an obstructed biliopancreatic limb.\n\n**Workup and interpretation**\nCT abdomen/pelvis with IV and water-soluble oral contrast when feasible. Look for mesenteric swirl, clustered bowel, ischemia and dilation of the excluded stomach or biliopancreatic limb. Normal lactate, stool passage and negative CT cannot exclude intermittent strangulation.",
        recommendation: "NPO, IV fluids and immediate bariatric surgical consultation for persistent or recurrent concerning pain. Suspected ischemia or peritonitis needs emergency exploration; do not discharge solely on a negative scan. A routine NG tube cannot decompress the excluded stomach.",
        citation: [
            44,
            46
        ],
        confidence: "recommended"
    },
    {
        id: "sc-rygb-gastrojejunal-or-jejunojejunal-leak",
        type: "result",
        module: 3,
        title: "Gastrojejunal or jejunojejunal leak",
        body: "**When to suspect it**\nNew tachycardia, dyspnea, fever or abdominal/shoulder pain early after bypass, sometimes without rigidity.\n\n**Workup and interpretation**\nObtain CBC, metabolic panel, lactate and contrast CT if stable. Tell radiology this is Roux-en-Y; an oral contrast study evaluates only opacified segments. A collection or unexplained deterioration warrants surgical reassessment despite absent extravasation.",
        recommendation: "NPO, IV fluids, broad IV antibiotics and immediate bariatric consultation. Shock or generalized peritonitis requires urgent surgical source control. Stable contained leaks may require drainage and specialist endoscopic treatment.",
        citation: [
            44,
            46
        ],
        confidence: "recommended"
    },
    {
        id: "sc-rygb-marginal-ulcer-bleeding-or-perforation",
        type: "result",
        module: 3,
        title: "Marginal ulcer, bleeding or perforation",
        body: "**When to suspect it**\nEpigastric pain, hematemesis, melena or iron deficiency at the gastrojejunal join. Sudden severe pain or rigidity suggests perforation. Ask about NSAIDs, nicotine and acid suppression.\n\n**Workup and interpretation**\nAssess hemodynamics, CBC and crossmatch if bleeding. Stable suspected ulcer needs upper endoscopy. If perforation suspected, CT with IV contrast if stable and early operative review; a negative scan does not override peritonitis.",
        recommendation: "Stop NSAIDs, begin PPI and coordinate bariatric/GI evaluation. Active bleeding needs resuscitation and urgent endoscopic hemostasis. Suspected perforation needs NPO, IV antibiotics and emergency surgical management.",
        citation: [
            44,
            48
        ],
        confidence: "recommended"
    },
    {
        id: "sc-rygb-gastrojejunal-stricture",
        type: "result",
        module: 3,
        title: "Gastrojejunal stricture",
        body: "**When to suspect it**\nProgressive intolerance of solids then liquids, usually weeks after surgery. May present with dehydration and little abdominal pain.\n\n**Workup and interpretation**\nElectrolytes and renal function; endoscopy identifies stricture and excludes ulcer. A patient with significant pain, fever or tachycardia also needs evaluation for leak or internal hernia.",
        recommendation: "Restore volume, give parenteral thiamine for prolonged vomiting, and contact bariatric endoscopy for balloon dilation. Admit if unable to tolerate fluids or if the diagnosis remains uncertain.",
        citation: [
            44,
            46,
            47
        ],
        confidence: "recommended"
    },
    {
        id: "sc-band",
        type: "question",
        module: 2,
        title: "Adjustable gastric band (legacy)",
        body: "An inflatable band encircles the proximal stomach and connects via tubing to a subcutaneous access port. The stomach and duodenum remain continuous. Confirm the device still exists and whether it has been revised.\n\n[Open before-and-after atlas](#/image/surgical-complications/band-atlas.jpg)\n\n[Operative reference](https://www.niddk.nih.gov/health-information/weight-management/bariatric-surgery/types)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/band-atlas.jpg", "alt": "The adjustable band creates a small proximal pouch. Tubing connects the band to an access port implanted in the abdominal wall, shown separately here.", "caption": "The adjustable band creates a small proximal pouch. Tubing connects the band to an access port implanted in the abdominal wall, shown separately here." }
        ],
        citation: [
            45,
            49
        ],
        options: [
            {
                label: "Band slippage or acute outlet obstruction",
                next: "sc-band-band-slippage-or-acute-outlet-obstruction"
            },
            {
                label: "Band erosion or late port infection",
                next: "sc-band-band-erosion-or-late-port-infection"
            }
        ]
    },
    {
        id: "sc-band-band-slippage-or-acute-outlet-obstruction",
        type: "result",
        module: 3,
        title: "Band slippage or acute outlet obstruction",
        body: "**When to suspect it**\nAcute dysphagia, excessive salivation, regurgitation, epigastric pain or inability to swallow liquids after a fill or meal. Severe pain, fever or shock may indicate ischemia or perforation.\n\n**Workup and interpretation**\nAssess aspiration and perfusion. Radiographs can show abnormal band orientation or a dilated pouch; a water-soluble contrast study can show prolapse or obstruction when safe. Severe symptoms warrant surgery regardless of equivocal imaging.",
        recommendation: "NPO, IV fluids, aspiration precautions and urgent bariatric surgery. Prompt complete band deflation through the correct port by a trained clinician can relieve obstruction. Persistent obstruction or suspected ischemia requires urgent operation even after deflation.",
        citation: [
            46,
            49
        ],
        confidence: "recommended"
    },
    {
        id: "sc-band-band-erosion-or-late-port-infection",
        type: "result",
        module: 3,
        title: "Band erosion or late port infection",
        body: "**When to suspect it**\nLoss of restriction, recurrent port-site infection, upper GI bleeding or epigastric pain can reflect erosion into the stomach.\n\n**Workup and interpretation**\nInspect port and tubing course; check CBC and cultures if systemic illness. Endoscopy confirms intragastric erosion. CT evaluates abscess or perforation. Benign port appearance does not exclude erosion.",
        recommendation: "Involve bariatric surgery for device removal and source control. Treat cellulitis or systemic infection with appropriate antibiotics. Avoid accessing an infected port through overlying cellulitis.",
        citation: [
            49
        ],
        confidence: "recommended"
    },
    {
        id: "sc-inguinal",
        type: "question",
        module: 2,
        title: "Inguinal hernia repair",
        body: "The groin defect is reduced. An open anterior repair often places mesh along the posterior wall of the inguinal canal; laparoscopic or robotic repairs typically place mesh in the preperitoneal space. Spermatic cord structures and inguinal nerves lie nearby.\n\n[Open before-and-after atlas](#/image/surgical-complications/inguinal-atlas.jpg)\n\n[Operative reference](https://pmc.ncbi.nlm.nih.gov/articles/PMC10588975/)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/inguinal-atlas.jpg", "alt": "An indirect hernia follows the cord through the deep ring. In this open anterior repair, mesh reinforces the inguinal floor behind the cord.", "caption": "An indirect hernia follows the cord through the deep ring. In this open anterior repair, mesh reinforces the inguinal floor behind the cord." }
        ],
        citation: [
            50,
            51
        ],
        options: [
            {
                label: "Groin seroma, hematoma or ongoing bleeding",
                next: "sc-inguinal-groin-seroma-hematoma-or-ongoing-bleeding"
            },
            {
                label: "Acute testicular pain or impaired perfusion",
                next: "sc-inguinal-acute-testicular-pain-or-impaired-perfusion"
            },
            {
                label: "Urinary retention",
                next: "sc-inguinal-urinary-retention"
            },
            {
                label: "Recurrent incarcerated or strangulated hernia",
                next: "sc-inguinal-recurrent-incarcerated-or-strangulated-hernia"
            },
            {
                label: "Persistent postoperative inguinal pain",
                next: "sc-inguinal-persistent-postoperative-inguinal-pain"
            }
        ]
    },
    {
        id: "sc-inguinal-groin-seroma-hematoma-or-ongoing-bleeding",
        type: "result",
        module: 3,
        title: "Groin seroma, hematoma or ongoing bleeding",
        body: "**When to suspect it**\nEarly swelling and bruising may extend into the scrotum. Rapid enlargement, presyncope, severe pain or a falling hemoglobin suggests bleeding.\n\n**Workup and interpretation**\nExamine incision, groin, abdomen and scrotum. Check CBC and anticoagulants. Ultrasound can distinguish fluid from recurrent hernia; CT/CTA if deep or expanding bleeding is suspected and patient stable.",
        recommendation: "Stable small collections usually need analgesia, support and surgical follow-up. Avoid routine aspiration near mesh. Expanding hematoma, skin compromise or instability needs resuscitation and urgent surgical control.",
        citation: [
            50,
            51
        ],
        confidence: "recommended"
    },
    {
        id: "sc-inguinal-acute-testicular-pain-or-impaired-perfusion",
        type: "result",
        module: 3,
        title: "Acute testicular pain or impaired perfusion",
        body: "**When to suspect it**\nNew unilateral testicular pain, marked tenderness or swelling after cord dissection may reflect ischemic orchitis, infarction or torsion.\n\n**Workup and interpretation**\nExamine the testicle separately from the wound. Obtain urgent color Doppler comparing both sides and call urology and surgery. Preserved flow does not fully exclude partial torsion; never delay exploration for imaging when clinical suspicion is high.",
        recommendation: "NPO, analgesia and urgent specialist assessment to preserve viability. Avoid attributing a painful swollen testicle to expected postoperative bruising.",
        citation: [
            50,
            52
        ],
        confidence: "recommended"
    },
    {
        id: "sc-inguinal-urinary-retention",
        type: "result",
        module: 3,
        title: "Urinary retention",
        body: "**When to suspect it**\nSuprapubic pain, dribbling or inability to void shortly after anesthesia, particularly with baseline outlet obstruction.\n\n**Workup and interpretation**\nPalpate and perform bladder scan or postvoid residual. If bladder is empty despite oliguria, assess perfusion, renal function and alternative causes.",
        recommendation: "Decompress symptomatic retention with an appropriate catheter per protocol. Reassess renal function if prolonged and arrange a dated voiding trial. Seek urology for difficult catheterization; avoid repeated traumatic attempts.",
        citation: [
            50,
            51
        ],
        confidence: "recommended"
    },
    {
        id: "sc-inguinal-recurrent-incarcerated-or-strangulated-hernia",
        type: "result",
        module: 3,
        title: "Recurrent incarcerated or strangulated hernia",
        body: "**When to suspect it**\nPainful irreducible groin bulge, vomiting, distension or obstipation. Discoloration, peritonism or systemic toxicity raises concern for ischemia.\n\n**Workup and interpretation**\nExamine both groins and abdomen. Ultrasound or IV contrast CT if stable and uncertain. Normal lactate or continued flatus does not exclude early strangulation.",
        recommendation: "NPO, IV fluids, analgesia and immediate surgery consultation. Avoid forceful reduction, particularly across a fresh repair. Suspected strangulation or peritonitis requires emergency operative assessment.",
        citation: [
            50
        ],
        confidence: "recommended"
    },
    {
        id: "sc-inguinal-persistent-postoperative-inguinal-pain",
        type: "result",
        module: 3,
        title: "Persistent postoperative inguinal pain",
        body: "**When to suspect it**\nActivity-limiting groin pain beyond three months may be neuropathic, mesh-related or due to recurrence. Burning, allodynia or radiation into scrotal skin differs from pain within the testis.\n\n**Workup and interpretation**\nMap pain and sensory changes; examine for recurrent bulge, infection and testicular pathology. Ultrasound can clarify suspected recurrence or scrotal disease. New acute testicular pain or an irreducible bulge needs its own emergency pathway.",
        recommendation: "Provide appropriate non-opioid analgesia and refer to a specialist hernia service for multimodal evaluation, possible diagnostic nerve block and selected interventions.",
        citation: [
            50
        ],
        confidence: "recommended"
    },
    {
        id: "sc-umbilical",
        type: "question",
        module: 2,
        title: "Umbilical hernia repair",
        body: "The sac is reduced at the umbilical fascial ring, and the defect is closed with sutures, often reinforced by mesh. A postoperative pocket at the former sac site can mimic recurrence.\n\n[Open before-and-after atlas](#/image/surgical-complications/umbilical-atlas.jpg)\n\n[Operative reference](https://www.facs.org/for-patients/the-day-of-your-surgery/adult-umbilical-hernia/)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/umbilical-atlas.jpg", "alt": "Preperitoneal fat protrudes through the umbilical fascial defect. After reduction and fascial closure, a preperitoneal mesh reinforces the repair above the intact peritoneum.", "caption": "Preperitoneal fat protrudes through the umbilical fascial defect. After reduction and fascial closure, a preperitoneal mesh reinforces the repair above the intact peritoneum." }
        ],
        citation: [
            53
        ],
        options: [
            {
                label: "Seroma versus wound infection",
                next: "sc-umbilical-seroma-versus-wound-infection"
            },
            {
                label: "Recurrent entrapment or small bowel obstruction",
                next: "sc-umbilical-recurrent-entrapment-or-small-bowel-obstruction"
            }
        ]
    },
    {
        id: "sc-umbilical-seroma-versus-wound-infection",
        type: "result",
        module: 3,
        title: "Seroma versus wound infection",
        body: "**When to suspect it**\nSoft fullness at the navel is common after repair. Increasing warmth, purulent drainage, fever or progressive tenderness suggests infection.\n\n**Workup and interpretation**\nExamine wound, skin viability and abdomen. Ultrasound can show a superficial fluid collection. Obtain contrast CT if systemic illness, deep pain or concern for mesh infection. Fluid on imaging alone does not diagnose an abscess.",
        recommendation: "Observe an uncomplicated seroma with surgical follow-up. Avoid routine aspiration through fresh mesh. Treat cellulitis; surgical drainage/culture and antibiotics are needed for an infected collection according to depth and severity.",
        citation: [
            6,
            53,
            54
        ],
        confidence: "recommended"
    },
    {
        id: "sc-umbilical-recurrent-entrapment-or-small-bowel-obstruction",
        type: "result",
        module: 3,
        title: "Recurrent entrapment or small bowel obstruction",
        body: "**When to suspect it**\nIncreasing umbilical pain, firm nonreducible bulge, vomiting or loss of bowel function after initial recovery.\n\n**Workup and interpretation**\nExamine for peritonism and skin change; CT with IV contrast in stable patients to locate the transition point and assess bowel enhancement. A small defect can strangulate part of the bowel wall without complete obstruction.",
        recommendation: "NPO, IV fluids, decompression if significant vomiting and urgent general surgery. Persistent focal pain, ischemic signs or instability warrants immediate surgical assessment.",
        citation: [
            7,
            53,
            54
        ],
        confidence: "recommended"
    },
    {
        id: "sc-incisional",
        type: "question",
        module: 2,
        title: "Incisional or ventral hernia repair",
        body: "Scarred fascia from a previous laparotomy is reapproximated when feasible. Mesh may lie retrorectus, preperitoneal, onlay or intraperitoneal; large repairs may include component separation. Check the operative report for plane, drains and adhesiolysis.\n\n[Open before-and-after atlas](#/image/surgical-complications/incisional-atlas.jpg)\n\n[Operative reference](https://pmc.ncbi.nlm.nih.gov/articles/PMC4956629/)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/incisional-atlas.jpg", "alt": "Bowel protrudes through the old midline incision. In this retrorectus repair, mesh lies behind both rectus muscles and superficial to the posterior sheath. The inset shows a possible superficial seroma.", "caption": "Bowel protrudes through the old midline incision. In this retrorectus repair, mesh lies behind both rectus muscles and superficial to the posterior sheath. The inset shows a possible superficial seroma." }
        ],
        citation: [
            54,
            55
        ],
        options: [
            {
                label: "Abdominal-wall collection or mesh infection",
                next: "sc-incisional-abdominal-wall-collection-or-mesh-infection"
            },
            {
                label: "Ileus, obstruction or missed bowel injury",
                next: "sc-incisional-ileus-obstruction-or-missed-bowel-injury"
            },
            {
                label: "Fascial dehiscence or evisceration",
                next: "sc-incisional-fascial-dehiscence-or-evisceration"
            }
        ]
    },
    {
        id: "sc-incisional-abdominal-wall-collection-or-mesh-infection",
        type: "result",
        module: 3,
        title: "Abdominal-wall collection or mesh infection",
        body: "**When to suspect it**\nSeroma can cause painless fullness; escalating pain, fever, erythema, purulent drainage or systemic illness suggests deep infection.\n\n**Workup and interpretation**\nCBC, renal function, cultures if septic and contrast CT for collection depth, rim changes, fistula and relationship to mesh. Early postoperative gas or fluid can be nonspecific; review images with the operating team.",
        recommendation: "Avoid blind drainage. Observe uncomplicated collections. For sepsis, IV antibiotics and urgent surgical source control; drainage and mesh salvage or removal depend on mesh plane, organism and extent.",
        citation: [
            6,
            54,
            55
        ],
        confidence: "recommended"
    },
    {
        id: "sc-incisional-ileus-obstruction-or-missed-bowel-injury",
        type: "result",
        module: 3,
        title: "Ileus, obstruction or missed bowel injury",
        body: "**When to suspect it**\nPersistent vomiting, worsening distension or new focal pain after adhesiolysis. Fever, escalating pain, peritonitis or deterioration after initial improvement should prompt concern for bowel injury.\n\n**Workup and interpretation**\nCheck perfusion, CBC, electrolytes and lactate. Stable patients need CT abdomen/pelvis with IV contrast for transition point, impaired enhancement, free fluid or evolving collection. Negative early imaging cannot clear a worsening exam.",
        recommendation: "NPO, IV fluids, NG decompression for significant vomiting and urgent surgery. Give broad IV enteric antibiotics if perforation or peritonitis suspected. Shock, threatened bowel or peritonitis requires immediate source-control assessment.",
        citation: [
            5,
            7,
            54
        ],
        confidence: "recommended"
    },
    {
        id: "sc-incisional-fascial-dehiscence-or-evisceration",
        type: "result",
        module: 3,
        title: "Fascial dehiscence or evisceration",
        body: "**When to suspect it**\nA sudden pop, new bulge or gush of serosanguineous fluid suggests disrupted fascia. Exposed bowel is an operative emergency.\n\n**Workup and interpretation**\nInspect gently; do not probe an intact skin closure. CT if stable and disruption is uncertain. Visible evisceration or peritonitis needs no imaging before surgical mobilization.",
        recommendation: "Supine, NPO, IV access, protect exposed viscera with warm sterile saline-moistened dressing, avoid bedside reduction, and call surgery for immediate repair. Give IV antibiotics if bowel exposure or contamination.",
        citation: [
            54,
            56
        ],
        confidence: "recommended"
    },
    {
        id: "sc-neurosurgery-and-spine",
        type: "question",
        module: 1,
        title: "Neurosurgery and spine",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Anterior cervical decompression and fusion (ACDF or corpectomy)",
                next: "sc-anterior-cervical"
            },
            {
                label: "Posterior lumbar decompression or laminectomy",
                next: "sc-laminectomy"
            },
            {
                label: "Posterior instrumented lumbar fusion (PLIF or TLIF)",
                next: "sc-post-fusion"
            },
            {
                label: "Anterior lumbar interbody fusion (ALIF)",
                next: "sc-alif"
            }
        ]
    },
    {
        id: "sc-anterior-cervical",
        type: "question",
        module: 2,
        title: "Anterior cervical decompression and fusion (ACDF or corpectomy)",
        body: "From the front of the neck, ACDF removes a disc and decompresses the cord or roots. A graft or cage bridges the disc space, often with anterior fixation. A corpectomy removes vertebral body as well as adjacent discs and needs a longer reconstruction. Laminectomy removes posterior bone. Confirm the actual operation and levels.\n\n[Open before-and-after atlas](#/image/surgical-complications/anterior-cervical-atlas.jpg)\n\n[Operative reference](https://www.orthoinfo.org/bodypart/neck/cervical-radiculopathy-surgical-treatment-options/)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/anterior-cervical-atlas.jpg", "alt": "In this single-level anterior cervical discectomy and fusion, removing the protruding disc relieves ventral cord compression. An interbody spacer occupies the disc space and an anterior plate spans the adjacent vertebral bodies.", "caption": "In this single-level anterior cervical discectomy and fusion, removing the protruding disc relieves ventral cord compression. An interbody spacer occupies the disc space and an anterior plate spans the adjacent vertebral bodies." }
        ],
        citation: [
            57,
            58
        ],
        options: [
            {
                label: "Neck hematoma or pharyngolaryngeal edema · airway emergency",
                next: "sc-anterior-cervical-neck-hematoma-or-pharyngolaryngeal-edema"
            },
            {
                label: "New weakness or cord compression · emergency",
                next: "sc-anterior-cervical-new-weakness-or-cord-compression"
            },
            {
                label: "Persistent dysphagia or esophageal injury",
                next: "sc-anterior-cervical-persistent-dysphagia-or-esophageal-injury"
            }
        ]
    },
    {
        id: "sc-anterior-cervical-neck-hematoma-or-pharyngolaryngeal-edema",
        type: "result",
        module: 3,
        title: "Neck hematoma or pharyngolaryngeal edema · airway emergency",
        body: "**When to suspect it**\nRapid neck tightness, swelling, progressive dysphagia, drooling, voice change, anxiety or stridor. Oxygen saturation can remain normal until late; visible swelling may be modest.\n\n**Workup and interpretation**\nAssess voice, secretion handling and work of breathing at bedside. Call anesthesia, spine surgery and airway backup immediately. Do not send a threatened airway supine to CT. Stable patients may need flexible laryngoscopy or imaging with specialists.",
        recommendation: "Upright if tolerated, oxygen, suction, preserve spontaneous ventilation when feasible and prepare a difficult-airway and surgical airway plan. For a suspected expanding hematoma with critical airway compromise, immediate wound release and evacuation may be needed before definitive hemostasis. Predominant edema requires expert airway control; prepare emergency front-of-neck access if oxygenation fails.",
        citation: [
            59,
            80
        ],
        confidence: "recommended"
    },
    {
        id: "sc-anterior-cervical-new-weakness-or-cord-compression",
        type: "result",
        module: 3,
        title: "New weakness or cord compression · emergency",
        body: "**When to suspect it**\nNew arm or leg weakness, sensory level, gait deterioration or bladder dysfunction after cervical surgery. Neck pain may precede a compressive epidural hematoma.\n\n**Workup and interpretation**\nDocument baseline and current motor/sensory findings in all four limbs. Urgent cervical MRI and simultaneous spine consultation; CT assesses implants or bony alignment but cannot clear the epidural space. Rapid profound decline may prompt immediate return to OR.",
        recommendation: "NPO, avoid hypotension, review anticoagulants and arrange reversal if indicated with specialists. Expedite decompression or implant revision for a compressive lesion. Avoid an observation trial for a new deficit.",
        citation: [
            60,
            61
        ],
        confidence: "recommended"
    },
    {
        id: "sc-anterior-cervical-persistent-dysphagia-or-esophageal-injury",
        type: "result",
        module: 3,
        title: "Persistent dysphagia or esophageal injury",
        body: "**When to suspect it**\nMild early swallowing discomfort is common. Severe or worsening odynophagia, fever, crepitus, neck drainage, chest pain or recurrent aspiration suggests perforation or deep infection.\n\n**Workup and interpretation**\nAssess airway first. CT neck/chest with contrast in stable patients; coordinate water-soluble esophagram and further testing with spine/ENT or thoracic surgery. A negative initial study does not exclude a small perforation if suspicion remains high.",
        recommendation: "NPO; avoid blind NG placement. Give broad IV antibiotics for suspected perforation or deep infection and arrange urgent specialist source control. Stable isolated dysphagia still needs swallowing assessment if aspiration or poor intake.",
        citation: [
            58,
            59,
            62
        ],
        confidence: "recommended"
    },
    {
        id: "sc-laminectomy",
        type: "question",
        module: 2,
        title: "Posterior lumbar decompression or laminectomy",
        body: "Through a posterior approach, the surgeon removes part or all of the lamina and thickened ligamentum flavum to expand the spinal canal. Decompression alone does not place fusion implants. Confirm levels and any incidental durotomy or added fusion.\n\n[Operative reference](https://www.aans.org/patients/conditions-treatments/lumbar-spinal-stenosis/)\n\n**Select the suspected complication.**",
        citation: [
            63
        ],
        options: [
            {
                label: "Compressive epidural hematoma or cauda equina syndrome",
                next: "sc-laminectomy-compressive-epidural-hematoma-or-cauda-equina-syndrome"
            },
            {
                label: "CSF leak or pseudomeningocele",
                next: "sc-laminectomy-csf-leak-or-pseudomeningocele"
            },
            {
                label: "Wound or deep spinal infection",
                next: "sc-laminectomy-wound-or-deep-spinal-infection"
            }
        ]
    },
    {
        id: "sc-laminectomy-compressive-epidural-hematoma-or-cauda-equina-syndrome",
        type: "result",
        module: 3,
        title: "Compressive epidural hematoma or cauda equina syndrome",
        body: "**When to suspect it**\nSevere escalating back/radicular pain, new weakness, saddle sensory loss, urinary retention or new incontinence after surgery.\n\n**Workup and interpretation**\nCompare motor, sensory and sacral function with discharge baseline. Assess bladder residual when appropriate; a low residual cannot exclude incomplete cauda equina syndrome. Call spine surgery and obtain emergency MRI.",
        recommendation: "NPO, maintain perfusion, identify anticoagulants and discuss urgent reversal. Progressive deficit with compression requires emergency decompression. Transfer promptly if MRI or surgical treatment unavailable.",
        citation: [
            60,
            61
        ],
        confidence: "recommended"
    },
    {
        id: "sc-laminectomy-csf-leak-or-pseudomeningocele",
        type: "result",
        module: 3,
        title: "CSF leak or pseudomeningocele",
        body: "**When to suspect it**\nOrthostatic headache, nausea, clear wound drainage or a fluctuant swelling after possible durotomy. Fever, meningismus or neurologic deficit changes urgency.\n\n**Workup and interpretation**\nInspect without probing. MRI can show a collection communicating with the thecal sac; routine CT may miss a leak. Evaluate for infection or compression and discuss localization with spine surgery.",
        recommendation: "Protect the wound with a sterile dressing; avoid bedside aspiration or instrumentation. Consult spine for positioning, observation, diversion or repair. External CSF drainage, infection signs or neurologic change requires urgent inpatient assessment.",
        citation: [
            61,
            64
        ],
        confidence: "recommended"
    },
    {
        id: "sc-laminectomy-wound-or-deep-spinal-infection",
        type: "result",
        module: 3,
        title: "Wound or deep spinal infection",
        body: "**When to suspect it**\nIncreasing focal back pain, drainage, dehiscence, fever or radicular symptoms days to weeks later. Fever may be absent.\n\n**Workup and interpretation**\nCBC, CRP/ESR with postoperative trends and blood cultures when indicated. MRI with and without contrast for deep infection or epidural collection. Early postoperative inflammatory changes require clinical correlation.",
        recommendation: "Consult spine surgery. Obtain cultures before antibiotics when stable and neurologically intact if this can be done promptly. Sepsis or progressive deficit requires urgent empiric IV therapy and assessment for drainage/decompression.",
        citation: [
            65,
            66
        ],
        confidence: "recommended"
    },
    {
        id: "sc-post-fusion",
        type: "question",
        module: 2,
        title: "Posterior instrumented lumbar fusion (PLIF or TLIF)",
        body: "Pedicle screws and rods stabilize motion segments while graft incorporates. PLIF/TLIF also place an interbody cage through a posterior or transforaminal corridor. Check the operative levels, baseline radiculopathy and any concurrent decompression.\n\n[Open before-and-after atlas](#/image/surgical-complications/post-fusion-atlas.jpg)\n\n[Operative reference](https://www.aans.org/patients/conditions-treatments/lumbar-spinal-stenosis/)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/post-fusion-atlas.jpg", "alt": "In this single-level lumbar interbody fusion, a spacer occupies the collapsed disc space. Posterior pedicle screws connected by rods stabilize the adjacent vertebrae while fusion develops.", "caption": "In this single-level lumbar interbody fusion, a spacer occupies the collapsed disc space. Posterior pedicle screws connected by rods stabilize the adjacent vertebrae while fusion develops." }
        ],
        citation: [
            63,
            67
        ],
        options: [
            {
                label: "New radiculopathy, hardware malposition or compressive hematoma",
                next: "sc-post-fusion-new-radiculopathy-hardware-malposition-or-compressive-hematoma"
            },
            {
                label: "Deep implant infection",
                next: "sc-post-fusion-deep-implant-infection"
            },
            {
                label: "CSF leak after combined decompression",
                next: "sc-post-fusion-csf-leak-after-combined-decompression"
            }
        ]
    },
    {
        id: "sc-post-fusion-new-radiculopathy-hardware-malposition-or-compressive-hematoma",
        type: "result",
        module: 3,
        title: "New radiculopathy, hardware malposition or compressive hematoma",
        body: "**When to suspect it**\nNew severe dermatomal pain, foot drop, bilateral weakness or saddle symptoms. Distinguish baseline numbness from a new root or cauda equina deficit.\n\n**Workup and interpretation**\nSerial neurologic exams and immediate spine contact for any new deficit. CT best localizes screws, cage and fractures; emergency MRI with artifact reduction evaluates hematoma, abscess and neural compression. A normal radiograph does not exclude either.",
        recommendation: "NPO, analgesia, preserve perfusion and coordinate urgent decompression or implant revision for symptomatic compression. Transfer if specialist care is unavailable.",
        citation: [
            60,
            61,
            67
        ],
        confidence: "recommended"
    },
    {
        id: "sc-post-fusion-deep-implant-infection",
        type: "result",
        module: 3,
        title: "Deep implant infection",
        body: "**When to suspect it**\nWorsening axial pain, persistent wound drainage, fever, loosening or new neurologic symptoms. Delayed infection may present without fever.\n\n**Workup and interpretation**\nCBC, inflammatory marker trend, blood cultures and contrast MRI with artifact reduction where available. CT can define bone destruction or guide sampling. A superficial swab is inadequate to establish a deep organism.",
        recommendation: "Urgent spine consultation; obtain deep cultures when feasible. Sepsis or neurologic deterioration needs prompt IV antibiotics and surgical assessment. Debridement, retention or removal of hardware depends on stability and timing.",
        citation: [
            65,
            66
        ],
        confidence: "recommended"
    },
    {
        id: "sc-post-fusion-csf-leak-after-combined-decompression",
        type: "result",
        module: 3,
        title: "CSF leak after combined decompression",
        body: "**When to suspect it**\nPositional headache, clear incision drainage, fluctuance or new radicular pain after fusion with decompression.\n\n**Workup and interpretation**\nReview operative report for dural repair. Examine wound and neurologic function; MRI for pseudomeningocele and neural compression, CT myelography only when directed for localization.",
        recommendation: "Sterile dressing, avoid aspiration, involve operating spine service. Escalate external drainage, infection or neurologic change; persistent symptomatic leaks may need repair.",
        citation: [
            61,
            64
        ],
        confidence: "recommended"
    },
    {
        id: "sc-alif",
        type: "question",
        module: 2,
        title: "Anterior lumbar interbody fusion (ALIF)",
        body: "An abdominal, usually retroperitoneal approach mobilizes the great or iliac vessels to reach the disc. A cage and graft restore the disc space. Posterior screws may be placed separately. Early abdominal complications differ from those after a posterior-only fusion.\n\n[Operative reference](https://surgeryreference.aofoundation.org/spine/degenerative/lumbar/approach/retroperitoneal-approach-for-alif)\n\n**Select the suspected complication.**",
        citation: [
            68
        ],
        options: [
            {
                label: "Retroperitoneal bleeding or iliac vascular injury",
                next: "sc-alif-retroperitoneal-bleeding-or-iliac-vascular-injury"
            },
            {
                label: "Ileus versus bowel or ureteral injury",
                next: "sc-alif-ileus-versus-bowel-or-ureteral-injury"
            },
            {
                label: "New weakness, saddle symptoms or bladder dysfunction",
                next: "sc-post-fusion-new-radiculopathy-hardware-malposition-or-compressive-hematoma"
            }
        ]
    },
    {
        id: "sc-alif-retroperitoneal-bleeding-or-iliac-vascular-injury",
        type: "result",
        module: 3,
        title: "Retroperitoneal bleeding or iliac vascular injury",
        body: "**When to suspect it**\nTachycardia, flank or abdominal pain, falling hemoglobin, distension, cool leg or diminished pulses. Large blood loss may be concealed.\n\n**Workup and interpretation**\nCompare femoral and pedal pulses and Doppler signals; document motor/sensory findings. CBC, coags, crossmatch. CTA abdomen/pelvis with runoff as indicated if stable. Bedside ultrasound cannot exclude retroperitoneal bleeding.",
        recommendation: "Call vascular and spine surgery immediately, resuscitate with blood for hemorrhagic shock. Threatened limb or instability requires urgent intervention; avoid empiric heparin when bleeding is suspected.",
        citation: [
            17,
            68
        ],
        confidence: "recommended"
    },
    {
        id: "sc-alif-ileus-versus-bowel-or-ureteral-injury",
        type: "result",
        module: 3,
        title: "Ileus versus bowel or ureteral injury",
        body: "**When to suspect it**\nDistension and vomiting can follow exposure. Worsening focal pain, peritonism, fever, flank pain or clear drain output suggests a deeper injury. Normal creatinine is possible with a unilateral ureteral injury.\n\n**Workup and interpretation**\nCheck volume, electrolytes, CBC, creatinine and urine. Contrast CT assesses collection, obstruction or perforation. Add delayed excretory images if urinary injury suspected; an ordinary portal venous CT can miss a leak.",
        recommendation: "NPO, IV fluids, NG decompression for significant vomiting. Involve spine and general surgery for abdominal signs; involve urology for suspected leak or obstruction. Treat sepsis and arrange drainage/repair as indicated.",
        citation: [
            7,
            28,
            68,
            69
        ],
        confidence: "recommended"
    },
    {
        id: "sc-ophthalmology",
        type: "question",
        module: 1,
        title: "Ophthalmology",
        body: "Select the operation documented in the operative report.",
        options: [
            {
                label: "Cataract extraction with intraocular lens (IOL)",
                next: "sc-cataract"
            },
            {
                label: "Pars plana vitrectomy for retinal detachment with gas tamponade",
                next: "sc-retina"
            },
            {
                label: "Trabeculectomy (glaucoma filtering surgery)",
                next: "sc-trab"
            },
            {
                label: "LASIK refractive surgery",
                next: "sc-lasik"
            }
        ]
    },
    {
        id: "sc-cataract",
        type: "question",
        module: 2,
        title: "Cataract extraction with intraocular lens (IOL)",
        body: "Phacoemulsification removes the cloudy crystalline lens through a small corneal incision. A posterior chamber IOL usually sits inside the capsular bag. Confirm laterality, date, any posterior capsule rupture and what the patient could see immediately after surgery.\n\n[Open before-and-after atlas](#/image/surgical-complications/cataract-atlas.jpg)\n\n[Operative reference](https://www.aao.org/eye-health/treatments/what-is-cataract-surgery)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/cataract-atlas.jpg", "alt": "The cloudy lens is removed. The intraocular lens sits behind the iris in the retained capsular bag.", "caption": "The cloudy lens is removed. The intraocular lens sits behind the iris in the retained capsular bag." }
        ],
        citation: [
            70
        ],
        options: [
            {
                label: "Acute postoperative endophthalmitis · sight-threatening",
                next: "sc-cataract-acute-postoperative-endophthalmitis"
            },
            {
                label: "Early pressure spike or wound leak",
                next: "sc-cataract-early-pressure-spike-or-wound-leak"
            },
            {
                label: "Retinal tear or detachment",
                next: "sc-cataract-retinal-tear-or-detachment"
            },
            {
                label: "Cystoid macular edema or persistent corneal edema",
                next: "sc-cataract-cystoid-macular-edema-or-persistent-corneal-edema"
            },
            {
                label: "Posterior capsular opacification",
                next: "sc-cataract-posterior-capsular-opacification"
            }
        ]
    },
    {
        id: "sc-cataract-acute-postoperative-endophthalmitis",
        type: "result",
        module: 3,
        title: "Acute postoperative endophthalmitis · sight-threatening",
        body: "**When to suspect it**\nWorsening vision after initial improvement, redness, photophobia, pain, hypopyon or poor red reflex, often in the first postoperative week. Pain and hypopyon can both be absent.\n\n**Workup and interpretation**\nRecord monocular acuity including hand motion/light perception, pupils and slit-lamp findings. Immediate ophthalmology for dilated exam, assessment of vitritis and specialist B-scan if the fundus is obscured. Sterile toxic anterior segment syndrome can overlap; timing alone is unsafe.",
        recommendation: "Call ophthalmology/retina now for intraocular sampling and prompt intravitreal antibiotics, with vitrectomy selected by the surgeon. Topical therapy alone is inadequate. Avoid empiric steroid escalation before infection is assessed.",
        citation: [
            70,
            71
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cataract-early-pressure-spike-or-wound-leak",
        type: "result",
        module: 3,
        title: "Early pressure spike or wound leak",
        body: "**When to suspect it**\nPain, halos, nausea, blurred vision or headache may reflect high IOP. A shallow chamber, hypotony or fluid leak can indicate wound failure.\n\n**Workup and interpretation**\nCheck acuity, pupil and anterior chamber. If an open globe or dehisced incision is possible, shield and avoid pressure, tonometry and ocular ultrasound. Otherwise measure IOP; careful clinician-directed fluorescein exam can demonstrate wound leak.",
        recommendation: "Urgent ophthalmology. For high IOP with intact globe, initiate pressure lowering in consultation, accounting for cardiopulmonary/renal contraindications. For wound failure use a rigid shield without pressure, NPO and immediate operative assessment.",
        citation: [
            70
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cataract-retinal-tear-or-detachment",
        type: "result",
        module: 3,
        title: "Retinal tear or detachment",
        body: "**When to suspect it**\nNew flashes, shower of floaters, curtain or field loss, often painless. Central acuity can remain good while the macula is attached.\n\n**Workup and interpretation**\nAssess each eye, fields and pupils. Same-day dilated peripheral retinal examination. If globe integrity is secure, B-scan can help in an obscured view; a negative ED scan cannot exclude a peripheral tear.",
        recommendation: "Contact ophthalmology immediately for acute field loss and arrange same-day retinal assessment for new flashes/floaters. A tear may need retinopexy; detachment requires surgeon-directed repair.",
        citation: [
            70,
            72
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cataract-cystoid-macular-edema-or-persistent-corneal-edema",
        type: "result",
        module: 3,
        title: "Cystoid macular edema or persistent corneal edema",
        body: "**When to suspect it**\nAfter initial improvement, painless central blur or distortion over weeks suggests macular edema. Haze early after surgery can reflect corneal edema.\n\n**Workup and interpretation**\nCheck monocular acuity, pupils and slit lamp; ophthalmology can localize edema with dilated examination and macular OCT. A curtain, sudden deterioration, pain or inflammation requires urgent exclusion of retinal detachment, pressure rise or infection.",
        recommendation: "Arrange prompt ophthalmology review; cause-specific topical anti-inflammatory treatment or other therapy is determined after assessment. Avoid reassuring a patient with progressive unexplained visual loss based on timing alone.",
        citation: [
            70
        ],
        confidence: "recommended"
    },
    {
        id: "sc-cataract-posterior-capsular-opacification",
        type: "result",
        module: 3,
        title: "Posterior capsular opacification",
        body: "**When to suspect it**\nGradual, painless haze, glare or reduced contrast months to years after an initially successful cataract operation can reflect opacification behind the IOL.\n\n**Workup and interpretation**\nCheck monocular acuity and arrange slit-lamp confirmation. Abrupt visual loss, pain, redness, flashes or a curtain requires urgent assessment for another cause.",
        recommendation: "Arrange outpatient ophthalmology for visually significant symptoms and consideration of Nd:YAG posterior capsulotomy.",
        citation: [
            70
        ],
        confidence: "recommended"
    },
    {
        id: "sc-retina",
        type: "question",
        module: 2,
        title: "Pars plana vitrectomy for retinal detachment with gas tamponade",
        body: "Vitreous is removed via small pars plana ports. The surgeon treats retinal breaks with laser or cryotherapy and may leave intraocular gas to support the retina as it heals. Confirm gas versus silicone oil, prescribed position and whether the bubble remains.\n\n[Open before-and-after atlas](#/image/surgical-complications/retina-atlas.jpg)\n\n[Operative reference](https://www.asrs.org/patients/retinal-diseases/25/vitrectomy-surgery)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/retina-atlas.jpg", "alt": "Subretinal fluid lifts the retina at a superior break. After vitrectomy, gas supports the reapposed retina while laser retinopexy forms an adhesion around the break.", "caption": "Subretinal fluid lifts the retina at a superior break. After vitrectomy, gas supports the reapposed retina while laser retinopexy forms an adhesion around the break." }
        ],
        citation: [
            72,
            73
        ],
        options: [
            {
                label: "Gas expansion or pressure-related ischemia · emergency",
                next: "sc-retina-gas-expansion-or-pressure-related-ischemia"
            },
            {
                label: "Recurrent detachment or new retinal break",
                next: "sc-retina-recurrent-detachment-or-new-retinal-break"
            },
            {
                label: "Post-vitrectomy endophthalmitis",
                next: "sc-retina-post-vitrectomy-endophthalmitis"
            }
        ]
    },
    {
        id: "sc-retina-gas-expansion-or-pressure-related-ischemia",
        type: "result",
        module: 3,
        title: "Gas expansion or pressure-related ischemia · emergency",
        body: "**When to suspect it**\nSudden pain, headache, nausea or severe vision loss after nitrous oxide, flying or ascent while gas remains. Elevated IOP also occurs without a recognized exposure.\n\n**Workup and interpretation**\nAsk explicitly about anesthetic, dental or ambulance nitrous oxide. Record acuity, pupil response and IOP when the globe is intact; contact retina immediately. Do not infer complete absorption from elapsed days alone.",
        recommendation: "Stop nitrous oxide, alert anesthesia and ophthalmology immediately; give oxygen as clinically indicated. Urgent pressure lowering and possible gas aspiration/decompression are specialist-directed. Avoid nitrous oxide (including Entonox), flight and altitude gain until the gas has fully resolved and retina clears the patient.",
        citation: [
            72,
            73
        ],
        confidence: "recommended"
    },
    {
        id: "sc-retina-recurrent-detachment-or-new-retinal-break",
        type: "result",
        module: 3,
        title: "Recurrent detachment or new retinal break",
        body: "**When to suspect it**\nNew curtain, missing field, flashes, floaters or sudden deterioration beyond the expected gas–fluid interface.\n\n**Workup and interpretation**\nCheck acuity and fields in each eye; urgent dilated retinal exam. Gas can obscure both direct view and ultrasound. An unrevealing ED scan cannot exclude redetachment.",
        recommendation: "Call retina urgently and maintain the specific postoperative positioning instructions while awaiting review. Repair depends on the break location, macular status and cause of recurrence.",
        citation: [
            72
        ],
        confidence: "recommended"
    },
    {
        id: "sc-retina-post-vitrectomy-endophthalmitis",
        type: "result",
        module: 3,
        title: "Post-vitrectomy endophthalmitis",
        body: "**When to suspect it**\nIncreasing redness, pain or unexpected visual decline after surgery. Gas can make posterior examination difficult.\n\n**Workup and interpretation**\nDocument baseline with gas, acuity and anterior chamber inflammation; immediate ophthalmologic exam and specialist posterior assessment. Expected bubble-related blur does not account for progressive inflammatory signs.",
        recommendation: "Emergency retina consultation for intraocular sampling, intravitreal antibiotics and possible surgical washout. Avoid delaying transfer for routine imaging or a trial of drops.",
        citation: [
            72,
            74
        ],
        confidence: "recommended"
    },
    {
        id: "sc-trab",
        type: "question",
        module: 2,
        title: "Trabeculectomy (glaucoma filtering surgery)",
        body: "A guarded channel beneath a scleral flap diverts aqueous from the anterior chamber into a subconjunctival filtering bleb, usually superiorly under the lid. Either excessive or insufficient filtration can threaten vision.\n\n[Open before-and-after atlas](#/image/surgical-complications/trab-atlas.jpg)\n\n[Operative reference](https://glaucoma.org/treatment/surgery/incisional-surgery)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/trab-atlas.jpg", "alt": "Aqueous passes from the anterior chamber through a surgically created opening and beneath the scleral flap into a subconjunctival filtering bleb. The flap is lifted here to show the route.", "caption": "Aqueous passes from the anterior chamber through a surgically created opening and beneath the scleral flap into a subconjunctival filtering bleb. The flap is lifted here to show the route." }
        ],
        citation: [
            75
        ],
        options: [
            {
                label: "Leaking bleb or overfiltration with hypotony",
                next: "sc-trab-leaking-bleb-or-overfiltration-with-hypotony"
            },
            {
                label: "Bleb infection or bleb-related endophthalmitis · emergency",
                next: "sc-trab-bleb-infection-or-bleb-related-endophthalmitis"
            },
            {
                label: "Failed filtration or high IOP",
                next: "sc-trab-failed-filtration-or-high-iop"
            }
        ]
    },
    {
        id: "sc-trab-leaking-bleb-or-overfiltration-with-hypotony",
        type: "result",
        module: 3,
        title: "Leaking bleb or overfiltration with hypotony",
        body: "**When to suspect it**\nBlurred vision, tearing or discomfort with a shallow anterior chamber or low pressure. A leak can occur early or years later.\n\n**Workup and interpretation**\nCheck acuity, inspect bleb and chamber gently. Fluorescein dilution on Seidel testing supports a leak; negative Seidel does not exclude overfiltration. Avoid pressure/tonometry if frank wound disruption or open globe suspected.",
        recommendation: "Urgent operating ophthalmologist assessment. Protect from rubbing or compression; avoid ocular massage. Bleb protection, leak repair and adjustment of pressure-lowering drops are specialist-directed.",
        citation: [
            75,
            76
        ],
        confidence: "recommended"
    },
    {
        id: "sc-trab-bleb-infection-or-bleb-related-endophthalmitis",
        type: "result",
        module: 3,
        title: "Bleb infection or bleb-related endophthalmitis · emergency",
        body: "**When to suspect it**\nRed painful eye, discharge, white/infiltrated bleb, photophobia or decreased vision, even years after an initially successful operation.\n\n**Workup and interpretation**\nAssess acuity, bleb, anterior chamber and vitreous with ophthalmology. Vitritis or marked visual loss suggests intraocular extension. Lack of hypopyon cannot exclude early endophthalmitis.",
        recommendation: "Contact ophthalmology immediately. Isolated blebitis requires intensive specialist-directed topical antibiotics and close review. Intraocular extension requires urgent intraocular sampling and intravitreal therapy.",
        citation: [
            74,
            75,
            77
        ],
        confidence: "recommended"
    },
    {
        id: "sc-trab-failed-filtration-or-high-iop",
        type: "result",
        module: 3,
        title: "Failed filtration or high IOP",
        body: "**When to suspect it**\nNew blurred vision, brow ache, nausea or a flat/scarred bleb; elevated pressure can be asymptomatic.\n\n**Workup and interpretation**\nRecord acuity and IOP only if globe intact. Inspect bleb and chamber depth; a shallow chamber can also occur with high IOP, including pupillary block. Appearance alone cannot establish the pressure or cause.",
        recommendation: "Urgent ophthalmology for pressure control and cause-specific bleb intervention. Avoid unsupervised bleb massage, suture manipulation or restarting/stopping all glaucoma drops without a plan.",
        citation: [
            75
        ],
        confidence: "recommended"
    },
    {
        id: "sc-lasik",
        type: "question",
        module: 2,
        title: "LASIK refractive surgery",
        body: "The surgeon lifts a partial-thickness corneal flap, uses an excimer laser to reshape the stromal bed, then replaces the flap. The flap–stromal interface persists. PRK removes epithelium and has no LASIK flap.\n\n[Open before-and-after atlas](#/image/surgical-complications/lasik-atlas.jpg)\n\n[Operative reference](https://www.aao.org/Assets/d2a71fff-34e7-4b77-9553-f6ac33860074/638592360994900000/refractive-surgery-ppp-updated-2024-pdf)\n\n**Select the suspected complication.**",
        images: [
            { "src": "images/surgical-complications/lasik-atlas.jpg", "alt": "For myopia, central stromal ablation flattens the cornea. The inset shows the lifted flap. After replacement, its interface lies within the anterior stroma. Layer thicknesses are schematic.", "caption": "For myopia, central stromal ablation flattens the cornea. The inset shows the lifted flap. After replacement, its interface lies within the anterior stroma. Layer thicknesses are schematic." }
        ],
        citation: [
            78
        ],
        options: [
            {
                label: "Flap displacement or striae",
                next: "sc-lasik-flap-displacement-or-striae"
            },
            {
                label: "Interface inflammation versus infectious keratitis",
                next: "sc-lasik-interface-inflammation-versus-infectious-keratitis"
            },
            {
                label: "Dry eye or epithelial surface injury",
                next: "sc-lasik-dry-eye-or-epithelial-surface-injury"
            }
        ]
    },
    {
        id: "sc-lasik-flap-displacement-or-striae",
        type: "result",
        module: 3,
        title: "Flap displacement or striae",
        body: "**When to suspect it**\nAbrupt monocular blur, pain, tearing or foreign-body sensation after rubbing or trauma. Flap injury can occur well after the original operation.\n\n**Workup and interpretation**\nAcuity, pupils and careful slit-lamp exam for a displaced flap edge, folds or epithelial defect. Assess trauma separately for open globe; avoid pressure or tonometry if suspected.",
        recommendation: "Place a rigid shield without pressure, avoid rubbing, do not manipulate the flap, and arrange urgent corneal specialist assessment for possible repositioning.",
        citation: [
            78
        ],
        confidence: "recommended"
    },
    {
        id: "sc-lasik-interface-inflammation-versus-infectious-keratitis",
        type: "result",
        module: 3,
        title: "Interface inflammation versus infectious keratitis",
        body: "**When to suspect it**\nNew photophobia, redness, pain or worsening visual acuity. Diffuse lamellar keratitis tends to cause fine diffuse interface inflammation; focal infiltrate or epithelial breakdown raises concern for infection.\n\n**Workup and interpretation**\nCheck acuity and examine with slit lamp and fluorescein. Overlapping findings require urgent specialist examination; appearance or timing alone cannot safely exclude infection.",
        recommendation: "Same-day urgent cornea consultation. Infection may require cultures and intensive antimicrobials; significant sterile interface inflammation may need steroids or flap lift. Do not start or increase steroids for an undifferentiated infiltrate.",
        citation: [
            78,
            79
        ],
        confidence: "recommended"
    },
    {
        id: "sc-lasik-dry-eye-or-epithelial-surface-injury",
        type: "result",
        module: 3,
        title: "Dry eye or epithelial surface injury",
        body: "**When to suspect it**\nGrittiness, fluctuating vision and irritation are common after LASIK. Severe pain, reduced acuity or unilateral worsening needs a different explanation.\n\n**Workup and interpretation**\nCheck acuity, inspect flap and use slit lamp/fluorescein to assess epithelium, staining or infiltrate. Surface symptoms alone cannot exclude infection or flap displacement.",
        recommendation: "Preservative-free lubricants and surgeon follow-up for uncomplicated dry eye. Arrange urgent corneal review for epithelial defects, infiltrates, flap abnormalities or persistent loss of vision.",
        citation: [
            78,
            79
        ],
        confidence: "recommended"
    }
];
export const SURGICAL_COMPLICATIONS_CITATIONS = [
    {
        num: 1,
        text: "WSES. Detection and management of bile duct injury during cholecystectomy. World J Emerg Surg, 2021. https://pmc.ncbi.nlm.nih.gov/articles/PMC8190978/"
    },
    {
        num: 2,
        text: "SAGES–AHPBA. Surgical management of bile duct injury following cholecystectomy, 2025. https://www.sages.org/publications/guidelines/guideline-for-the-management-of-bdi-following-cholecystectomy/"
    },
    {
        num: 3,
        text: "ASGE. Endoscopy in the evaluation and management of choledocholithiasis, 2019. https://doi.org/10.1016/j.gie.2018.10.001"
    },
    {
        num: 4,
        text: "WSES. Jerusalem guidelines on acute appendicitis, 2025 edition. https://doi.org/10.1001/jamasurg.2025.6218"
    },
    {
        num: 5,
        text: "IDSA. Complicated intra-abdominal infections: diagnostic imaging and microbiology, 2024. https://www.idsociety.org/practice-guideline/intra-abdominal-infections/"
    },
    {
        num: 6,
        text: "IDSA. Skin and soft tissue infections, including surgical site infection, 2014. https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/"
    },
    {
        num: 7,
        text: "WSES. Bologna guidelines for adhesive small bowel obstruction, 2017 update. https://pubmed.ncbi.nlm.nih.gov/29946347/"
    },
    {
        num: 8,
        text: "ASGBI/ACPGBI. Prevention, diagnosis and management of colorectal anastomotic leakage, 2016. https://www.acpgbi.org.uk/_userfiles/import/2017/02/Prevention-diagnosis-and-management-of-colorectal-anastomotic-leakage-ASGBI-ACPGBI-2016.pdf"
    },
    {
        num: 9,
        text: "ASCRS. Clinical practice guidelines for ostomy surgery, 2022. https://doi.org/10.1097/DCR.0000000000002498"
    },
    {
        num: 10,
        text: "British Intestinal Failure Alliance. Managing a high output stoma. https://www.bapen.org.uk/pdfs/bifa/bifa-top-tips-series-1-updated.pdf"
    },
    {
        num: 11,
        text: "ESC Joint Working Groups. Peri-operative myocardial injury and infarction following CABG, 2017. https://academic.oup.com/eurheartj/article/38/31/2392/4035733"
    },
    {
        num: 12,
        text: "EACTS. Guidelines on perioperative medication in adult cardiac surgery, 2024. https://academic.oup.com/ejcts/article/67/1/ezae355/7815986"
    },
    {
        num: 13,
        text: "EACTS/EACTAIC. Patient blood management in adult cardiac surgery, 2024. https://academic.oup.com/icvts/article/40/5/ivae170/7815987"
    },
    {
        num: 14,
        text: "ESC/EACTS. Management of valvular heart disease, 2025. https://www.escardio.org/Guidelines/Clinical-Practice-Guidelines/all-esc-practice-guidelines/valvular-heart-disease/"
    },
    {
        num: 15,
        text: "ESC. Cardiac pacing and cardiac resynchronization therapy, 2021. https://doi.org/10.1093/europace/euab232"
    },
    {
        num: 16,
        text: "ESVS. Management of abdominal aorto-iliac artery aneurysms, 2024. https://www.sciencedirect.com/science/article/pii/S1078588423008894"
    },
    {
        num: 17,
        text: "ACC/AHA et al. Management of lower extremity peripheral artery disease, 2024. https://doi.org/10.1161/CIR.0000000000001251"
    },
    {
        num: 18,
        text: "ESVS. Management of vascular graft and endograft infections, 2026. https://pubmed.ncbi.nlm.nih.gov/42448560/"
    },
    {
        num: 19,
        text: "University of Iowa. Tonsillectomy bleed management protocol. https://iowaprotocols.medicine.uiowa.edu/protocols/tonsillectomy-bleed-management-includes-dosing-txa-tranexamic-acid"
    },
    {
        num: 20,
        text: "AAO-HNSF. Tonsillectomy in children, 2019 update. https://doi.org/10.1177/0194599818801757"
    },
    {
        num: 21,
        text: "DAS/BAETS/ENT-UK. Management of haematoma after thyroid surgery, 2022. https://doi.org/10.1111/anae.15585"
    },
    {
        num: 22,
        text: "American Thyroid Association. Postoperative hypoparathyroidism in adults, 2018. https://pubmed.ncbi.nlm.nih.gov/29848235/"
    },
    {
        num: 23,
        text: "NICE NG192. Caesarean birth. https://www.nice.org.uk/guidance/ng192/chapter/Recommendations"
    },
    {
        num: 24,
        text: "WHO/FIGO/ICM. Consolidated guidelines for postpartum haemorrhage, 2025. https://www.who.int/publications/i/item/9789240115637"
    },
    {
        num: 25,
        text: "WHO. Prevention and treatment of maternal peripartum infections, 2015. https://iris.who.int/bitstream/handle/10665/186171/9789241549363_eng.pdf?sequence=1"
    },
    {
        num: 26,
        text: "SASGOG. Management of dehiscence of the vaginal cuff. https://exxcellence.org/list-of-pearls/management-of-dehiscence-of-the-vaginal-cuff/"
    },
    {
        num: 27,
        text: "Factors leading to post-cholecystectomy bleeding requiring reoperation: a case series, 2025. https://pubmed.ncbi.nlm.nih.gov/40694005/"
    },
    {
        num: 28,
        text: "SASGOG. Management of ureteral injuries. https://exxcellence.org/list-of-pearls/management-of-ureteral-injuries/"
    },
    {
        num: 29,
        text: "Memorial Sloan Kettering Cancer Center. About your mastectomy. https://www.mskcc.org/cancer-care/patient-education/about-your-mastectomy"
    },
    {
        num: 30,
        text: "Memorial Sloan Kettering Cancer Center. About your Whipple procedure. https://www.mskcc.org/cancer-care/patient-education/about-your-whipple-procedure"
    },
    {
        num: 31,
        text: "ISGPS. Updated definition and grading of postoperative pancreatic fistula, 2016. https://pubmed.ncbi.nlm.nih.gov/28040257/"
    },
    {
        num: 32,
        text: "ISGPS. Delayed gastric emptying after pancreatic surgery, 2007. https://pubmed.ncbi.nlm.nih.gov/17981197/"
    },
    {
        num: 33,
        text: "Yekebas et al. Postpancreatectomy hemorrhage: diagnosis and treatment in 1669 consecutive resections, 2007. https://pubmed.ncbi.nlm.nih.gov/17667506/"
    },
    {
        num: 34,
        text: "BAUS. Transurethral resection of the prostate for benign disease. https://www.baus.org.uk/_userfiles/pages/files/Patients/Leaflets/TURP%20for%20benign.pdf"
    },
    {
        num: 35,
        text: "American Urological Association. Urologic emergencies: gross hematuria with clot retention. https://www.auanet.org/Documents/education/Urologic-Emergencies.pdf"
    },
    {
        num: 36,
        text: "EAU. Guidelines on urological infections. https://uroweb.org/guidelines/urological-infections/chapter/the-guideline"
    },
    {
        num: 37,
        text: "EAU. Guidelines on urolithiasis: ureteroscopy, stenting and infected obstruction. https://uroweb.org/guidelines/urolithiasis/chapter/guidelines"
    },
    {
        num: 38,
        text: "AAO-HNSF. Improving voice outcomes after thyroid surgery, 2013. https://www.entnet.org/quality-practice/quality-products/clinical-practice-guidelines/voice-outcomes-after-thyroid-surgery/"
    },
    {
        num: 39,
        text: "Lachiewicz et al. Pelvic surgical site infections in gynecologic surgery, 2015. https://pmc.ncbi.nlm.nih.gov/articles/PMC4348594/"
    },
    {
        num: 40,
        text: "UCLA Health, Breast Imaging. Post-surgical fluid collections: causes, symptoms and management. https://www.uclahealth.org/departments/radiology/education/breast-imaging-teaching-resources/cases/post-surgical-fluid-collections"
    },
    {
        num: 41,
        text: "Society for Endocrinology. Emergency management of severe and moderately severely symptomatic hyponatraemia in adult patients, 2022. https://www.endocrinology.org/media/xhrhxhxm/emergency-management-of-severe-and-moderately-severely-symptomatic-hyponatraemia-in-adult-patients-2022.pdf"
    },
    {
        num: 42,
        text: "American College of Surgeons. Cholecystectomy: risks and recovery. https://www.facs.org/for-patients/the-day-of-your-surgery/cholecystectomy/"
    },
    {
        num: 43,
        text: "Canadian Association of Gastroenterology. Management of bile acid diarrhea, 2020. https://doi.org/10.1093/jcag/gwz038"
    },
    {
        num: 44,
        text: "WSES/IFSO. Operative management of acute abdomen after bariatric surgery in the emergency setting: OBA guidelines, 2022. https://pmc.ncbi.nlm.nih.gov/articles/PMC9516804/"
    },
    {
        num: 45,
        text: "NIDDK. Types of weight-loss surgery: comparative operative anatomy. https://www.niddk.nih.gov/health-information/weight-management/bariatric-surgery/types"
    },
    {
        num: 46,
        text: "ASMBS. Bariatric emergencies for the general surgeon, 2023. https://asmbs.org/resources/asmbs-bariatric-emergencies-for-the-general-surgeon-statement/"
    },
    {
        num: 47,
        text: "ASMBS. Integrated health nutritional guidelines for surgical weight loss: micronutrients, 2016 update. https://asmbs.org/wp-content/uploads/2017/06/ASMBS-Nutritional-Guidelines-2016-Update.pdf"
    },
    {
        num: 48,
        text: "ASMBS. Literature review on treatment of marginal ulcers after metabolic and bariatric surgery. https://asmbs.org/resources/asmbs-literature-review-on-the-treatment-of-marginal-ulcers-after-metabolic-and-bariatric-surgery/"
    },
    {
        num: 49,
        text: "ASMBS. Consensus statement on laparoscopic adjustable gastric band management, 2022. https://asmbs.org/resources/asmbs-consensus-statement-on-laparoscopic-adjustable-gastric-band-management/"
    },
    {
        num: 50,
        text: "HerniaSurge Group. Update of the international guidelines for groin hernia management, 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC10588975/"
    },
    {
        num: 51,
        text: "American College of Surgeons. Adult inguinal and femoral groin hernia repair. https://www.facs.org/for-patients/the-day-of-your-surgery/adult-inguinal-and-femoral-groin-hernia-repair/"
    },
    {
        num: 52,
        text: "ACR Appropriateness Criteria. Acute onset of scrotal pain, 2024. https://acsearch.acr.org/docs/69363/Narrative/"
    },
    {
        num: 53,
        text: "American College of Surgeons. Adult umbilical hernia. https://www.facs.org/for-patients/the-day-of-your-surgery/adult-umbilical-hernia/"
    },
    {
        num: 54,
        text: "Tonolini M, Ippolito S. Multidetector CT of expected findings and early postoperative complications after current techniques for ventral hernia repair, 2016. https://pmc.ncbi.nlm.nih.gov/articles/PMC4956629/"
    },
    {
        num: 55,
        text: "European Hernia Society. Midline incisional hernia guidelines, 2023. https://pmc.ncbi.nlm.nih.gov/articles/PMC10638550/"
    },
    {
        num: 56,
        text: "European Hernia Society. Clinical guidelines on management of the abdominal wall in the open or burst abdomen, 2018. https://pubmed.ncbi.nlm.nih.gov/30178226/"
    },
    {
        num: 57,
        text: "American Academy of Orthopaedic Surgeons. Cervical radiculopathy: surgical treatment options. https://www.orthoinfo.org/bodypart/neck/cervical-radiculopathy-surgical-treatment-options/"
    },
    {
        num: 58,
        text: "AO Surgery Reference. Anterior cervical corpectomy and stabilization. https://surgeryreference.aofoundation.org/spine/tumors/metastatic-tumors/subaxial-cervical-unstable-low-escc/anterior-corpectomy-and-stabilzation"
    },
    {
        num: 59,
        text: "AO Surgery Reference. Complications of subaxial cervical surgery. https://surgeryreference.aofoundation.org/spine/trauma/subaxial-cervical/further-reading/surgical-compliations"
    },
    {
        num: 60,
        text: "Belgian Society of Neurosurgery. Consensus statement on postoperative spinal epidural hematoma, 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC11456791/"
    },
    {
        num: 61,
        text: "ACR Appropriateness Criteria. Low back pain: new or progressive symptoms after lumbar surgery. https://acsearch.acr.org/docs/69483/Narrative/"
    },
    {
        num: 62,
        text: "Hershman SH et al. Esophageal perforation following anterior cervical spine surgery: multicenter series and review, 2017. https://pmc.ncbi.nlm.nih.gov/articles/PMC5400185/"
    },
    {
        num: 63,
        text: "American Association of Neurological Surgeons. Lumbar spinal stenosis: decompression and fusion. https://www.aans.org/patients/conditions-treatments/lumbar-spinal-stenosis/"
    },
    {
        num: 64,
        text: "Radcliff K et al. Distinguishing pseudomeningocele, epidural hematoma, and postoperative infection on postoperative MRI. https://pubmed.ncbi.nlm.nih.gov/27755204/"
    },
    {
        num: 65,
        text: "ACR Appropriateness Criteria. Suspected spine infection, including after recent intervention. https://acsearch.acr.org/docs/3148734/Narrative/"
    },
    {
        num: 66,
        text: "Tai DBG et al. Diagnosis and management of spinal implant infections. Clinical Infectious Diseases, 2024. https://doi.org/10.1093/cid/ciae432"
    },
    {
        num: 67,
        text: "American Association of Neurological Surgeons. Minimally invasive spine surgery: instrumentation and interbody fusion. https://www.aans.org/patients/conditions-treatments/minimally-invasive-spine-surgery/"
    },
    {
        num: 68,
        text: "AO Surgery Reference. Retroperitoneal approach for anterior lumbar interbody fusion. https://surgeryreference.aofoundation.org/spine/degenerative/lumbar/approach/retroperitoneal-approach-for-alif"
    },
    {
        num: 69,
        text: "AO Spine. Ureteral injury after anterior lumbar spine interbody fusion. https://www.aofoundation.org/spine/about-aospine/Blog/2024_02-Blog-Ureteral-injury-after-ALIF"
    },
    {
        num: 70,
        text: "American Academy of Ophthalmology. Cataract in the adult eye Preferred Practice Pattern. https://www.aao.org/Assets/a7c4e054-2b43-4ac9-869a-d858ed48bb21/638876828052630000/cataract-in-the-adult-eye-ppp-7-9-25-pdf"
    },
    {
        num: 71,
        text: "Endophthalmitis Vitrectomy Study Group. Randomized trial of immediate vitrectomy and intravenous antibiotics after cataract or secondary IOL surgery, 1995. https://pubmed.ncbi.nlm.nih.gov/7487614/"
    },
    {
        num: 72,
        text: "American Society of Retina Specialists. Vitrectomy: indications, gas tamponade, risks and recovery. https://www.asrs.org/patients/retinal-diseases/25/vitrectomy-surgery"
    },
    {
        num: 73,
        text: "Royal College of Ophthalmologists. Safety alert: do not use nitrous oxide when there is gas in an operated eye, 2018. https://curriculum.rcophth.ac.uk/2018/12/ophthalmic-safety-alert-use-of-nitrous-oxide-when-there-is-gas-in-an-operated-eye/"
    },
    {
        num: 74,
        text: "European Society of Cataract and Refractive Surgeons. Guidelines for prevention and treatment of postoperative endophthalmitis. https://www.escrs.org/media/uljgvpn1/english_2018_updated.pdf"
    },
    {
        num: 75,
        text: "Glaucoma Research Foundation. Incisional surgery: trabeculectomy and filtering blebs. https://glaucoma.org/treatment/surgery/incisional-surgery"
    },
    {
        num: 76,
        text: "Collaborative Bleb-Related Infection Incidence and Treatment Study. Persistent hypotony after trabeculectomy, 2016. https://pubmed.ncbi.nlm.nih.gov/27174291/"
    },
    {
        num: 77,
        text: "Collaborative Bleb-Related Infection Incidence and Treatment Study. Clinical features of bleb-related infection: five-year survey, 2012. https://pubmed.ncbi.nlm.nih.gov/22883301/"
    },
    {
        num: 78,
        text: "American Academy of Ophthalmology. Refractive surgery Preferred Practice Pattern, 2024. https://www.aao.org/Assets/d2a71fff-34e7-4b77-9553-f6ac33860074/638592360994900000/refractive-surgery-ppp-updated-2024-pdf"
    },
    {
        num: 79,
        text: "American Academy of Ophthalmology. Bacterial keratitis: Preferred Practice Pattern summary benchmarks. https://www.aao.org/Assets/0ee2e42f-34f4-4f64-a249-4def7deec3f6/638090379485430000/ppp-summary-benchmarks-22-full-set-pdf"
    },
    {
        num: 80,
        text: "Colón LF et al. Management and treatment algorithm of airway complications after anterior cervical spine surgery: systematic review, 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC11467286/"
    }
];
export const SURGICAL_COMPLICATIONS_NODE_COUNT = SURGICAL_COMPLICATIONS_NODES.length;
