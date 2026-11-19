export const ACUTE_KERATITIS_INFO_PAGES = {
    "keratitis-steps": {
        "id": "keratitis-steps",
        "title": "Acute Keratitis: Steps",
        "subtitle": "Rapid route to the right branch",
        "sections": [
            {
                "heading": "1. Safety first",
                "body": "[Screen for ocular emergencies](#/node/acute-keratitis-emergency-screen)."
            },
            {
                "heading": "2. Define the lesion",
                "body": "[Exposure history](#/node/acute-keratitis-history), then [visual acuity and corneal examination](#/node/acute-keratitis-exam)."
            },
            {
                "heading": "3. Select a working diagnosis",
                "body": "[Pattern selector](#/node/acute-keratitis-pattern) with the [Stain Atlas](#/info/keratitis-stain-atlas) and [Differential](#/info/keratitis-differential)."
            },
            {
                "heading": "4. Choose targeted treatment",
                "body": "[Microbial ulcer](#/node/acute-keratitis-microbial), [HSV](#/node/acute-keratitis-hsv), [HZO](#/node/acute-keratitis-zoster), [atypical infection](#/node/acute-keratitis-atypical), [UV injury](#/node/acute-keratitis-uv) or [noninfectious disease](#/node/acute-keratitis-noninfectious)."
            },
            {
                "heading": "5. Make the disposition safe",
                "body": "[Escalate](#/info/keratitis-escalate) and [disposition decision](#/node/acute-keratitis-disposition)."
            }
        ],
        "citations": [
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
        ]
    },
    "keratitis-stain-atlas": {
        "id": "keratitis-stain-atlas",
        "title": "Keratitis: Stain Atlas",
        "subtitle": "Six schematic patterns and two licensed clinical photographs",
        "sections": [
            {
                "heading": "Read the light correctly",
                "body": "Original teaching schematics. Green = fluorescein uptake; gray = plaque or infiltrate. Examine with white light AND fluorescein/cobalt blue. Patterns support, but do not replace, history and a complete examination. [1,13]"
            },
            {
                "heading": "HSV epithelial dendrite",
                "body": "Branching epithelial ulcer with terminal bulbs. Early disease may not show a classic dendrite. [4]",
                "image": {
                    "src": "images/acute-keratitis/pattern-1.svg",
                    "alt": "HSV epithelial dendrite original teaching schematic",
                    "caption": "Original myMedKitt vector illustration. Schematic, not a clinical photograph."
                }
            },
            {
                "heading": "VZV pseudodendrite",
                "body": "Raised plaque, usually without terminal bulbs and with less central fluorescein uptake. Gray represents the plaque, not fluorescein. [6]",
                "image": {
                    "src": "images/acute-keratitis/pattern-2.svg",
                    "alt": "VZV pseudodendrite original teaching schematic",
                    "caption": "Original myMedKitt vector illustration. Schematic, not a clinical photograph."
                }
            },
            {
                "heading": "Superficial punctate injury",
                "body": "Multiple small epithelial defects: UV, dry eye and toxic drops can overlap. Exposure history is essential. [10,11]",
                "image": {
                    "src": "images/acute-keratitis/pattern-3.svg",
                    "alt": "Superficial punctate injury original teaching schematic",
                    "caption": "Original myMedKitt vector illustration. Schematic, not a clinical photograph."
                }
            },
            {
                "heading": "Abrasion / recurrent erosion",
                "body": "A confluent epithelial defect does not identify the cause. Look for an underlying infiltrate before calling it a simple abrasion. [1,13]",
                "image": {
                    "src": "images/acute-keratitis/pattern-4.svg",
                    "alt": "Abrasion / recurrent erosion original teaching schematic",
                    "caption": "Original myMedKitt vector illustration. Schematic, not a clinical photograph."
                }
            },
            {
                "heading": "Subtarsal foreign-body tracks",
                "body": "Vertical linear defects suggest repeated contact from a retained upper-lid foreign body. Evert the lid after excluding open globe. [13]",
                "image": {
                    "src": "images/acute-keratitis/pattern-5.svg",
                    "alt": "Subtarsal foreign-body tracks original teaching schematic",
                    "caption": "Original myMedKitt vector illustration. Schematic, not a clinical photograph."
                }
            },
            {
                "heading": "Microbial corneal ulcer",
                "body": "Composite teaching view: green epithelial defect over gray stromal infiltrate. This is not a literal cobalt-blue photograph and cannot identify the organism. [1,13]",
                "image": {
                    "src": "images/acute-keratitis/pattern-6.svg",
                    "alt": "Microbial corneal ulcer original teaching schematic",
                    "caption": "Original myMedKitt vector illustration. Schematic, not a clinical photograph."
                }
            },
            {
                "heading": "HSV clinical example",
                "body": "The bright curved superior line is tear-film dye, not the ulcer. [4]\n\nImage: Imrankabirhossain, [Dendritic corneal ulcer](https://commons.wikimedia.org/wiki/File:Dendritic_corneal_ulcer.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Original unmodified; display size adjusted.",
                "image": {
                    "src": "images/acute-keratitis/hsv-dendrite.jpg",
                    "alt": "Branching fluorescein-positive epithelial lesion in an HSV dendritic corneal ulcer",
                    "caption": "HSV dendritic ulcer. Imrankabirhossain, CC BY-SA 4.0."
                }
            },
            {
                "heading": "UV clinical example",
                "body": "Diffuse punctate injury in documented UV exposure. The appearance is not specific to UV. [10]\n\nImage: Kwon DH, Moon JD, Park WJ, Kang WY, Kim SH, Lim HM, Ahn JS, Chae HJ. [Figure 2, case report (2016)](https://link.springer.com/article/10.1186/s40557-015-0087-7/figures/2), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Original unmodified.",
                "image": {
                    "src": "images/acute-keratitis/photokeratitis.png",
                    "alt": "Diffuse punctate fluorescein staining in documented UV-associated photokeratitis",
                    "caption": "UV-associated punctate epithelial injury. Kwon et al., CC BY 4.0."
                }
            },
            {
                "heading": "Image credits",
                "body": "• HSV dendritic ulcer: Imrankabirhossain, [Dendritic corneal ulcer](https://commons.wikimedia.org/wiki/File:Dendritic_corneal_ulcer.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Unmodified.\n• UV photokeratitis: Kwon DH, Moon JD, Park WJ, Kang WY, Kim SH, Lim HM, Ahn JS, Chae HJ. [Figure 2](https://link.springer.com/article/10.1186/s40557-015-0087-7/figures/2), Ann Occup Environ Med 2016, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Unmodified.\n• Six staining schematics: original myMedKitt vector artwork."
            }
        ],
        "citations": [
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
        ]
    },
    "keratitis-differential": {
        "id": "keratitis-differential",
        "title": "Keratitis: Differential",
        "subtitle": "Use exposure, vision, slit-lamp findings and clinical course together",
        "sections": [
            {
                "heading": "Bacterial ulcer",
                "body": "Infiltrate with an epithelial defect, pain and reduced vision; contacts raise Pseudomonas concern. Treat as microbial keratitis, not conjunctivitis. [1,13]"
            },
            {
                "heading": "HSV vs VZV",
                "body": "HSV: dendritic ulcer, terminal bulbs and reduced sensation. VZV: V1 eruption and raised pseudodendrite; nasal-tip findings are neither required nor sufficient. See [Stain Atlas](#/info/keratitis-stain-atlas). [4,6]"
            },
            {
                "heading": "Fungal vs Acanthamoeba",
                "body": "Fungal clues: vegetation/soil, steroids, feathery margins or satellites. Acanthamoeba clues: contacts/water, disproportionate pain or perineural disease. A ring is nonspecific and may be absent. Obtain specialist microbiologic assessment; morphology alone cannot establish the organism. [8,9,13]"
            },
            {
                "heading": "UV, toxic and dry-eye injury",
                "body": "Diffuse punctate defects overlap. UV is often bilateral after exposure; medication toxicity and tear-film disease can look similar. [10,11]"
            },
            {
                "heading": "Abrasion, erosion, retained foreign body",
                "body": "Focal defect after trauma; recurrent waking pain suggests erosion. Vertical linear defects suggest a subtarsal foreign body. Exclude an infiltrate before routing to routine injury care. [1,13]"
            },
            {
                "heading": "Exposure and neurotrophic disease",
                "body": "Incomplete closure produces inferior/interpalpebral injury; reduced sensation or unexpectedly little pain suggests neurotrophic disease. A persistent defect can become infected or thin. [11]"
            },
            {
                "heading": "Sterile infiltrates and immune disease",
                "body": "Marginal/contact-lens infiltrates may be sterile, but do not establish sterility by appearance. Peripheral ulcerative disease with thinning or scleritis needs urgent ophthalmology and evaluation for systemic inflammatory disease. [1,13]"
            },
            {
                "heading": "Mimics with little staining",
                "body": "Conjunctivitis, anterior uveitis, scleritis, acute angle closure and endophthalmitis. Significant pain, photophobia or reduced acuity requires a more complete evaluation than a conjunctivitis diagnosis. [13]"
            }
        ],
        "citations": [
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
        ]
    },
    "keratitis-rx-guide": {
        "id": "keratitis-rx-guide",
        "title": "Keratitis: Rx Guide",
        "subtitle": "Regimen-specific drug cards; adult oral schedules require renal review",
        "sections": [
            {
                "heading": "Before selecting a regimen",
                "body": "Diagnosis and severity determine treatment. Pediatric, pregnant, immunocompromised and renally impaired patients require individualized selection. The links below open the specific dosing card, including concentration, route, schedule and cautions. [1,4,7]"
            },
            {
                "heading": "Bacterial ulcer: selected fluoroquinolone case",
                "body": "[Ciprofloxacin 0.3% ophthalmic: intensive corneal-ulcer schedule](#/drug/ciprofloxacin-ophthalmic/Corneal ulcer). Confirm selection with ophthalmology; this is distinct from abrasion prophylaxis. [1,3]"
            },
            {
                "heading": "Severe / central / vision-threatening bacterial disease",
                "body": "[Fortified vancomycin ophthalmic](#/drug/vancomycin-ophthalmic/Severe bacterial keratitis) plus [fortified tobramycin ophthalmic](#/drug/tobramycin-ophthalmic/Severe bacterial keratitis). Use compounded ophthalmic preparations only. Specialist may choose a cefazolin-based alternative, initial loading, different coverage or taper according to smear, resistance and response. [1,2]"
            },
            {
                "heading": "HSV dendritic epithelial disease",
                "body": "[Ganciclovir 0.15% ophthalmic gel](#/drug/ganciclovir-ophthalmic/HSV dendritic). Adult oral alternatives: [acyclovir](#/drug/acyclovir/HSV epithelial) or [valacyclovir](#/drug/valacyclovir/HSV epithelial). Select a regimen with ophthalmology rather than routinely combining all options. Oral therapy for HSV keratitis is off-label and requires renal review. [4,5]"
            },
            {
                "heading": "Geographic ulcer / stromal / endothelial HSV",
                "body": "[Acyclovir: geographic ulcer regimen](#/drug/acyclovir/HSV geographic) or [valacyclovir: geographic ulcer regimen](#/drug/valacyclovir/HSV geographic). These are specialist-guided oral alternatives, not a universal stromal regimen. Steroid decisions require assessment of epithelial integrity, antiviral coverage and close corneal follow-up. [4]"
            },
            {
                "heading": "HZO",
                "body": "[Valacyclovir: zoster schedule and renal adjustment](#/drug/valacyclovir/Herpes zoster). Severe/disseminated disease or immunocompromise may require IV therapy and admission. [6,7]"
            },
            {
                "heading": "Fungal suspicion",
                "body": "[Natamycin 5% ophthalmic suspension](#/drug/natamycin-ophthalmic/Fungal keratitis) is a key option for susceptible filamentous fungi, not a universal antifungal regimen. Specialist scraping, species and depth determine therapy and duration. No preset ED taper. [8,13]"
            },
            {
                "heading": "Acanthamoeba suspicion",
                "body": "[PHMB ophthalmic](#/drug/phmb-ophthalmic/Acanthamoeba) or [chlorhexidine ophthalmic](#/drug/chlorhexidine-ophthalmic/Acanthamoeba), sometimes with a diamidine, requires specialist-directed prolonged treatment. These are ophthalmic preparations, never skin antiseptic and never a home-compounding recipe. [9]"
            },
            {
                "heading": "UV photokeratitis",
                "body": "Preservative-free tears, oral analgesia and cool compresses. [Erythromycin ophthalmic ointment](#/drug/erythromycin-ointment/Photokeratitis) may be used for comfort/prophylaxis. Usually improves in 24–72 hours; persistent or worsening symptoms need re-examination. [10]"
            },
            {
                "heading": "Exposure keratopathy",
                "body": "Preservative-free tears as often as hourly, lubricating ointment at night and appropriate lid closure protection/moisture chamber. Correct the cause. Thinning, infiltrate or a persistent epithelial defect needs specialist care. [11]"
            },
            {
                "heading": "Avoid treatment shortcuts",
                "body": "No empiric steroid or steroid-antibiotic combination for an undifferentiated ulcer. No take-home topical anesthetic in this keratitis pathway; selected simple-abrasion guidance does not generalize to infection or UV photokeratitis. Do not patch microbial keratitis or UV injury. Stop contact lenses; retain lenses/case if ophthalmology requests microbiology. [1,4,10,12]"
            }
        ],
        "citations": [
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
        ]
    },
    "keratitis-escalate": {
        "id": "keratitis-escalate",
        "title": "Keratitis: Escalate",
        "subtitle": "Referral, sampling, access and follow-up",
        "sections": [
            {
                "heading": "Immediate ophthalmology / transfer",
                "body": "Suspected perforation or melt, marked visual loss, central/deep/progressive ulcer, hypopyon, severe inflammation, endophthalmitis concern or inability to obtain/administer intensive treatment. [1,2,13]"
            },
            {
                "heading": "Same-day ophthalmology",
                "body": "Suspected microbial keratitis, HSV epithelial disease, HZO with ocular findings, atypical contact-lens pain or an uncertain keratitis diagnosis. [1,4,6,9]"
            },
            {
                "heading": "Culture / scraping indications",
                "body": "Central/large, deep, melting, multiple or adjacent infiltrates; substantial anterior chamber inflammation; prior corneal surgery; atypical organisms, chronicity or failure of empiric treatment. Specialist scraping enables appropriate stains/cultures and targeted PCR or confocal evaluation when indicated. [1,2,9]"
            },
            {
                "heading": "Admission or coordinated transfer",
                "body": "Sight-threatening or rapidly progressive disease, a vulnerable host or inability to deliver frequent drops or attend close reassessment. Confirm an accepting service and medication availability. An unfilled prescription with unspecified follow-up is not a safe plan. [1,2]"
            },
            {
                "heading": "Discharge checklist",
                "body": "Document visual acuity and lesion baseline; confirm medications obtained, correct instillation technique, ability to follow the schedule and cessation of contact lenses. Agree on reassessment with ophthalmology, generally next-day/daily initially for microbial ulcers. [1,2]"
            },
            {
                "heading": "Return now",
                "body": "Worsening vision, increasing pain, enlarging opacity or inability to use prescribed drops requires immediate reassessment. UV symptoms that persist or worsen beyond the expected improving course need re-examination. [1,10,13]"
            }
        ],
        "citations": [
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
        ]
    }
};
