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
    }
];
export const SURGICAL_COMPLICATIONS_NODE_COUNT = SURGICAL_COMPLICATIONS_NODES.length;
