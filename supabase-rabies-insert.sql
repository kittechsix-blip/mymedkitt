-- =====================================================================
-- MedKitt — Rabies Consult: Supabase INSERT Statements
-- Paste this into Supabase SQL Editor and run.
-- =====================================================================

-- 1. decision_trees (metadata)
INSERT INTO decision_trees (id, title, subtitle, version, node_count, entry_node_id, module_labels)
VALUES (
  'rabies',
  'Rabies',
  'Infection Workup → Exposure Assessment → PEP Protocol → Vaccination',
  '1.0',
  30,
  'rabies-start',
  '["Initial Assessment", "Clinical Rabies", "Diagnostic Workup", "Exposure Assessment", "Animal Risk & Wound Care", "PEP Decision", "Schedule & Follow-Up"]'::jsonb
);

-- 2. category_trees (link to Infectious Disease)
INSERT INTO category_trees (category_id, tree_id, display_title, display_subtitle, entry_node_id, sort_order)
VALUES ('infectious-disease', 'rabies', NULL, NULL, NULL, 2);

-- 3. tree_citations (20 citations)
INSERT INTO tree_citations (tree_id, num, text) VALUES
('rabies', 1, 'Manning SE, et al. Human Rabies Prevention — United States, 2008: Recommendations of the Advisory Committee on Immunization Practices (ACIP). MMWR Recomm Rep. 2008;57(RR-3):1-28.'),
('rabies', 2, 'Fooks AR, Banyard AC, Horton DL, et al. Current Status of Rabies and Prospects for Elimination. Lancet. 2014;384(9951):1389-99.'),
('rabies', 3, 'Hemachudha T, Ugolini G, Wacharapluesadee S, et al. Human Rabies: Neuropathogenesis, Diagnosis, and Management. Lancet Neurol. 2013;12(5):498-513.'),
('rabies', 4, 'Jackson AC. Rabies: A Medical Perspective. Rev Sci Tech. 2018;37(2):569-580.'),
('rabies', 5, 'Tyler KL. Acute Viral Encephalitis. N Engl J Med. 2018;379(6):557-566.'),
('rabies', 6, 'Yuki N, Hartung HP. Guillain-Barré Syndrome. N Engl J Med. 2012;366(24):2294-304.'),
('rabies', 7, 'Gadre G, et al. Rabies Viral Encephalitis: Clinical Determinants in Diagnosis With Special Reference to Paralytic Form. J Neurol Neurosurg Psychiatry. 2010;81(7):812-20.'),
('rabies', 8, 'Miller JM, Binnicker MJ, Campbell S, et al. Guide to Utilization of the Microbiology Laboratory for Diagnosis of Infectious Diseases: 2024 Update (IDSA/ASM). Clin Infect Dis. 2024;ciae104.'),
('rabies', 9, 'Swedberg C, et al. Maximizing Human Rabies Case Detection: Understanding the Diagnostic Sensitivity of Antemortem Testing From 35 Years of U.S. Data. Clin Infect Dis. 2025;ciaf666.'),
('rabies', 10, 'Damodar T, Mani RS, Prathyusha PV. Utility of Rabies Neutralizing Antibody Detection in CSF and Serum for Ante-Mortem Diagnosis. PLoS Negl Trop Dis. 2019;13(1):e0007128.'),
('rabies', 11, 'Venkatesan A, et al. Acute Encephalitis in Immunocompetent Adults. Lancet. 2019;393(10172):702-716.'),
('rabies', 12, 'Jackson AC. Current and Future Approaches to the Therapy of Human Rabies. Antiviral Res. 2013;99(1):61-7.'),
('rabies', 13, 'Barger A, et al. Imported Human Rabies — Kentucky and Ohio, 2024. MMWR. 2026;75(2):23-27.'),
('rabies', 14, 'Appolinario CM, Jackson AC. Antiviral Therapy for Human Rabies. Antiviral Ther. 2015;20(1):1-10.'),
('rabies', 15, 'WHO. Rabies Vaccines: WHO Position Paper — April 2018. Wkly Epidemiol Rec. 2018;93(16):201-220.'),
('rabies', 16, 'Pieracci EG, et al. Vital Signs: Trends in Human Rabies Deaths and Exposures — United States, 1938-2018. MMWR. 2019;68(23):524-528.'),
('rabies', 17, 'National Association of State Public Health Veterinarians. Compendium of Animal Rabies Prevention and Control, 2016. JAVMA. 2016;248(5):505-517.'),
('rabies', 18, 'Rupprecht CE, et al. Use of a Reduced (4-Dose) Vaccine Schedule for Postexposure Prophylaxis to Prevent Human Rabies — ACIP, 2010. MMWR Recomm Rep. 2010;59(RR-2):1-9.'),
('rabies', 19, 'Rabies Vaccine (Imovax Rabies, RabAvert) Package Inserts. FDA/DailyMed.'),
('rabies', 20, 'Hwang GS, et al. Adherence to Guideline Recommendations for HRIG in Rabies PEP. Hum Vaccin Immunother. 2020;16(1):51-60.');

-- 4. decision_nodes (30 nodes)

-- MODULE 1: INITIAL ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('rabies-start', 'rabies', 'info', 1,
 'Rabies — Clinical Concern or Exposure?',
 '[Rabies Steps Summary](#/info/rabies-summary) — quick-reference for both clinical rabies workup and post-exposure prophylaxis.

Rabies is nearly **100% fatal once symptomatic**. Post-exposure prophylaxis is highly effective if given promptly — no confirmed PEP failures when administered correctly.

Select your clinical scenario below.',
 '[1, 2]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-fork', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 0),

('rabies-fork', 'rabies', 'question', 1,
 'Clinical Scenario',
 'Is this a patient with **suspected rabies infection** (neuropsychiatric symptoms + possible exposure history) or a patient with a recent **animal exposure** requiring PEP evaluation?',
 '[]'::jsonb,
 '[{"label": "Suspected Rabies Infection", "description": "Acute neuropsychiatric illness with possible animal exposure weeks to months ago", "next": "rabies-clinical"}, {"label": "Animal Exposure / PEP Evaluation", "description": "Recent bite, scratch, or animal contact — needs PEP assessment", "next": "rabies-contact"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 1);

-- MODULE 2: CLINICAL RABIES
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('rabies-clinical', 'rabies', 'info', 2,
 'Suspected Clinical Rabies',
 '**Rabies is frequently missed at initial presentation.** The diagnosis requires high clinical suspicion.

**Key clues:**
• Acute neuropsychiatric illness + travel to rabies-endemic area
• **Pain, paresthesia, or pruritus at a prior bite site** — relatively specific for rabies
• History of animal exposure **weeks to months** prior (incubation typically several weeks to months)
• Patients may not recall or report animal exposures

[Rabies Differential Diagnosis](#/info/rabies-ddx) — distinguishing rabies from HSV encephalitis, tetanus, GBS, and autoimmune encephalitis.

**Infection control:** Standard + contact precautions. Careful handling of saliva, respiratory secretions, CSF. Rabies is **nationally notifiable**.',
 '[1, 3, 4]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-form', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 2),

('rabies-form', 'rabies', 'question', 2,
 'Clinical Form',
 'Approximately **80% develop furious (encephalitic) rabies** and **20% develop paralytic rabies**. These forms are clinically distinct.

Bat rabies variants can present atypically.',
 '[3, 4]'::jsonb,
 '[{"label": "Furious Rabies (80%)", "description": "Hydrophobia, aerophobia, agitation, fluctuating consciousness", "next": "rabies-furious"}, {"label": "Paralytic Rabies (20%)", "description": "Ascending flaccid paralysis mimicking GBS, preserved consciousness", "next": "rabies-paralytic"}, {"label": "Atypical Presentation", "description": "Focal brainstem signs, myoclonus, hemichorea, Horner''s syndrome", "next": "rabies-atypical"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 3),

('rabies-furious', 'rabies', 'info', 2,
 'Furious (Encephalitic) Rabies',
 '**Characteristic features:**
• **Hydrophobia** — pharyngeal/laryngeal spasms triggered by attempts to swallow water or even the sight/sound of water
• **Aerophobia** — similar spasms triggered by air blown on the face
• **Fluctuating consciousness** with periods of agitation alternating with lucidity
• **Inspiratory spasms** involving contraction of inspiratory muscles
• **Hypersalivation** with difficulty swallowing
• **Autonomic dysfunction** — tachycardia, hypertension, hyperthermia
• Anxiety, hyperexcitability, and delirium

**Average survival: 5-6 days** from symptom onset without intensive care.

**Key differentiators from mimics:**
• HSV encephalitis — lacks hydrophobia/aerophobia, temporal lobe MRI findings
• Tetanus — continuous rigidity between spasms (absent in rabies), normal consciousness
• Autoimmune encephalitis (anti-NMDAR) — prominent seizures (85%), responds to immunotherapy',
 '[3, 4, 5]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-dx-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 4),

('rabies-paralytic', 'rabies', 'info', 2,
 'Paralytic (Dumb) Rabies',
 '**Characteristic features:**
• **Ascending flaccid paralysis** beginning in the bitten extremity — closely mimics Guillain-Barré syndrome
• **Preserved consciousness** until preterminal phase (key distinguishing feature from GBS)
• Lower motor neuron weakness without hyperexcitability of furious rabies
• Progression to coma, myoedema, bladder incontinence

**Average survival: ~11 days** (longer than furious form).

**Distinguishing from GBS:**
• Pain/paresthesias at bite site (rabies) vs distal paresthesias (GBS)
• CSF: minimal pleocytosis (rabies) vs albuminocytologic dissociation (GBS)
• Fever and rapid autonomic dysfunction (rabies) vs progression over 12h-28d (GBS)
• Exposure history weeks to months prior

**Note:** Paralytic rabies has **lower diagnostic sensitivity** across all specimen types compared to furious rabies.',
 '[3, 4, 6, 7]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-dx-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 5),

('rabies-atypical', 'rabies', 'info', 2,
 'Atypical Rabies Presentations',
 '**Bat rabies variants** can present with atypical features:
• Focal brainstem signs
• Myoclonus
• Hemichorea
• Horner''s syndrome

**Rare presentations mimicking:**
• Transverse myelitis
• Neuromyelitis optica
• Tetanus with locked jaw

**Diagnostic challenge:** These presentations may not trigger clinical suspicion for rabies. Always consider rabies in the differential of acute, unexplained neuropsychiatric illness — especially with any possible animal exposure history or travel to endemic areas.',
 '[3]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-dx-workup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 6);

-- MODULE 3: DIAGNOSTIC WORKUP
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('rabies-dx-workup', 'rabies', 'info', 3,
 'Diagnostic Workup',
 '**Immediately consult local public health laboratory or CDC** — rabies diagnostic testing is not available at most hospital or reference laboratories.

[Diagnostic Specimens & Interpretation](#/info/rabies-dx-guide) — complete 4-specimen protocol with sensitivities and timing.

**No single test is sufficient for antemortem diagnosis.** Four specimen types should be collected:

**1. Saliva** — RT-PCR for viral RNA (≥3 serial samples for >98% sensitivity)
**2. Nuchal skin biopsy** — DFA for rabies antigen in cutaneous nerves (~100% sensitivity when adequate tissue)
**3. CSF** — antibody testing (diagnostic in unvaccinated patients; ~100% sensitivity after day 12)
**4. Serum** — antibody testing

**Combined sensitivity is 100%** when all 4 specimen types are tested.

**Timing:** Early illness (week 1) → prioritize saliva RT-PCR + nuchal biopsy. Later illness (>7-12 days) → antibody testing has higher yield.

**Caveat:** Prior IVIG administration can cause false-positive serology.',
 '[8, 9, 10, 11]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-mgmt', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 7),

('rabies-mgmt', 'rabies', 'question', 3,
 'Management of Clinical Rabies',
 'Once clinical symptoms develop, **no effective therapy exists** and rabies is nearly uniformly fatal.

Of ~10 documented rabies survivors, **most had received partial PEP before symptom onset**, and nearly all had permanent neurological deficits.',
 '[2, 3, 12]'::jsonb,
 '[{"label": "Palliative Care", "description": "Appropriate for most cases given the extremely poor prognosis", "next": "rabies-palliative"}, {"label": "Aggressive / ICU Approach", "description": "Consider in young, immunocompetent patients with early detection", "next": "rabies-aggressive"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 8),

('rabies-palliative', 'rabies', 'result', 3,
 'Palliative Care Approach',
 '**Recommended for most patients with clinical rabies.**

• Liberal use of **sedatives and analgesics** for comfort
• Symptom management: antispasmodics for pharyngeal spasms, anxiolytics for agitation
• Family counseling regarding prognosis
• Avoid unnecessary invasive procedures

**Infection control:**
• Standard + contact precautions throughout
• Careful handling of all secretions (saliva, respiratory, CSF)
• Rapid risk assessment of all exposed personnel in coordination with public health
• Report to local/state health department — **rabies is nationally notifiable**

**2024 Kentucky/Ohio case:** Inconsistent adherence to standard precautions resulted in **52 of 60 healthcare workers requiring PEP** due to saliva exposure.',
 '[2, 13]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL,
 'Palliative care with liberal sedation/analgesia. Standard + contact precautions. Report to public health. Counsel family on prognosis.',
 NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 9),

('rabies-aggressive', 'rabies', 'result', 3,
 'Aggressive / ICU Approach',
 '**The Milwaukee Protocol has failed in at least 26 subsequent cases** and is now considered ineffective. The original protocol included therapeutic coma with burst suppression, but this is **no longer recommended**.

**Modified approach (current):**
• Ketamine and midazolam for sedation and dysautonomia
• Nimodipine (with caution — hypotension risk)
• ICU supportive care
• Standard + contact infection control precautions

**Factors that may favor aggressive therapy** (outcomes still poor):
• Prior partial PEP before symptom onset
• Young age, previously healthy, immunocompetent
• Mild neurological disease at therapy initiation
• New World bat rabies variant (vs canine variant)
• Early detection of neutralizing antibodies in serum/CSF

**ID and neurology consultation recommended.**',
 '[2, 3, 12, 14]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL,
 'Modified Milwaukee Protocol: ketamine + midazolam + nimodipine + ICU support. Outcomes remain extremely poor. ID and neuro consults. Standard + contact precautions. Report to public health.',
 NULL, 'consider', '[]'::jsonb, '[]'::jsonb, 10);

-- MODULE 4: EXPOSURE ASSESSMENT
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('rabies-contact', 'rabies', 'question', 4,
 'Type of Animal Contact',
 'Classify the exposure using WHO categories.

**Category I — No exposure:** Touching, feeding, licks on intact skin
**Category II — Minor:** Nibbling uncovered skin, minor scratches/abrasions without bleeding
**Category III — Severe:** Transdermal bites/scratches, mucous membrane contamination, broken skin + saliva, **any direct bat contact**',
 '[1, 15]'::jsonb,
 '[{"label": "Category I — Touching/feeding, licks on intact skin", "description": "No broken skin, no mucous membrane contact", "next": "rabies-cat1"}, {"label": "Category II — Minor scratches, nibbling, no bleeding", "description": "Uncovered skin contact, minor abrasion without bleeding", "next": "rabies-animal-type"}, {"label": "Category III — Bite, scratch through skin, mucous membrane", "description": "Transdermal wound, saliva on broken skin, or bat contact", "next": "rabies-animal-type-severe"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 11),

('rabies-cat1', 'rabies', 'result', 4,
 'No PEP Indicated — Category I',
 'Skin was not broken and no mucous membrane contamination occurred. This is **not a rabies exposure**.

**Wound care:** Wash affected area with soap and water as a general hygiene measure.

Update tetanus prophylaxis if not current.',
 '[1, 15]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL,
 'PEP is not recommended. Provide reassurance and wound care. If patient reports a bite or broken skin on re-evaluation, reassess as Category II or III.',
 NULL, 'definitive', '[]'::jsonb, '[]'::jsonb, 12);

-- MODULE 5: ANIMAL RISK & WOUND CARE
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('rabies-animal-type', 'rabies', 'question', 5,
 'Animal Species — Category II',
 'What animal was involved? Species determines risk level and whether observation is an option.

[Rabies Risk by Animal Type](#/info/rabies-animal-risk) — detailed reference table.',
 '[1, 16]'::jsonb,
 '[{"label": "Dog, cat, or ferret", "description": "Domestic animals — 10-day observation may be possible", "next": "rabies-observe"}, {"label": "Bat", "description": "Any direct bat contact — treat as Category III", "next": "rabies-bat"}, {"label": "Raccoon, skunk, fox, coyote", "description": "High-risk terrestrial wildlife", "next": "rabies-wildlife-cat2"}, {"label": "Rodent, rabbit, or small mammal", "description": "Low-risk species", "next": "rabies-rodent"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 13),

('rabies-animal-type-severe', 'rabies', 'question', 5,
 'Animal Species — Category III',
 'What animal caused the severe exposure?

Category III exposures require **RIG + vaccine** unless the animal can be confirmed rabies-negative.

[Rabies Risk by Animal Type](#/info/rabies-animal-risk) — detailed reference.',
 '[1, 16]'::jsonb,
 '[{"label": "Dog, cat, or ferret", "description": "Domestic animals — 10-day observation if healthy and available", "next": "rabies-observe-severe"}, {"label": "Bat", "description": "Any bat contact — PEP indicated", "next": "rabies-bat"}, {"label": "Raccoon, skunk, fox, coyote", "description": "High-risk wildlife — immediate PEP", "next": "rabies-wildlife-cat3"}, {"label": "Rodent, rabbit, or small mammal", "description": "Very low risk — consult public health", "next": "rabies-rodent"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 14),

('rabies-observe', 'rabies', 'info', 5,
 '10-Day Observation — Category II (Vaccine Only)',
 '**Healthy dogs, cats, and ferrets can be observed for 10 days.**

If animal is:
• **Available and healthy** — begin wound care, **hold PEP** pending observation. If animal develops signs of rabies or dies → begin PEP immediately.
• **Unavailable, stray, or wild-acting** — begin PEP now (vaccine only for Category II)
• **Dead or euthanized** — send head for testing. Begin PEP pending results; discontinue if negative.

**Observation applies ONLY to dogs, cats, and ferrets.** No reliable observation period exists for wildlife.',
 '[1, 16, 17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-wound', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 15),

('rabies-observe-severe', 'rabies', 'info', 5,
 '10-Day Observation — Category III (RIG + Vaccine)',
 '**Healthy dogs, cats, and ferrets can be observed for 10 days.**

For Category III exposures:
• **Animal available and healthy** — **Start RIG + vaccine immediately.** If animal remains healthy at day 10, may discontinue vaccine series.
• **Animal unavailable, stray, or wild-acting** — complete full RIG + vaccine series
• **Dead or euthanized** — send head for testing. Start PEP pending results; discontinue if negative.

**Do NOT delay RIG for Category III exposures.** RIG must be given with the first vaccine dose and **cannot be given after day 7** of the vaccine series.',
 '[1, 16, 17]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-wound', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 16),

('rabies-bat', 'rabies', 'info', 5,
 'Bat Exposure — Special Rules',
 '**Bats require a lower threshold for PEP due to small, unnoticed bites.**

PEP IS indicated if bat was found in room with:
• Sleeping person
• Unattended child
• Intoxicated or cognitively impaired person
• Person who cannot reliably exclude bite/scratch

PEP is NOT indicated ONLY if patient can **definitively confirm** no bite, scratch, or mucous membrane exposure occurred.

**Bat bites can be virtually invisible** — fang marks may not be visible to the naked eye.

**All bat exposures should be treated as Category III** (RIG + vaccine) unless definitively excluded.',
 '[1, 16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-wound', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 17),

('rabies-wildlife-cat2', 'rabies', 'info', 5,
 'High-Risk Wildlife — Category II',
 'Raccoons, skunks, foxes, and coyotes are **high-risk rabies reservoir species** in the US.

• If animal captured/killed → send for testing. Start vaccine pending results.
• If animal escaped → assume rabid, begin **vaccine series** (no RIG for Category II).

**Wild animal behavior note:** A "friendly" or diurnal raccoon/skunk should raise suspicion for rabies.',
 '[1, 16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-wound', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 18),

('rabies-wildlife-cat3', 'rabies', 'info', 5,
 'High-Risk Wildlife — Category III',
 'Raccoons, skunks, foxes, and coyotes are **high-risk rabies reservoir species** in the US.

**Immediate PEP (RIG + vaccine) is indicated for all Category III wildlife exposures.**

• If captured/killed → send for testing. Start full PEP pending results; discontinue only if testing confirms negative.
• If escaped → complete full PEP course.

Consult local public health for animal disposition and testing.',
 '[1, 16]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-wound', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 19),

('rabies-rodent', 'rabies', 'result', 5,
 'PEP Generally Not Indicated — Small Rodent/Rabbit',
 'Small rodents (mice, rats, squirrels, hamsters, gerbils, guinea pigs, chipmunks) and rabbits are **almost never found to be infected with rabies** and have not been known to transmit rabies to humans.

**Exceptions requiring public health consultation:**
• **Woodchucks (groundhogs)** — higher risk among rodents
• Unusual behavior in the animal
• Local public health advisory

**Wound care:** Wash with soap and water ≥15 minutes. Update tetanus if needed.',
 '[1, 16]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL,
 'PEP is not routinely recommended. Provide wound care. Contact local public health if any concern. For woodchuck/groundhog bites, consult public health — PEP may be indicated.',
 NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 20),

('rabies-wound', 'rabies', 'info', 5,
 'Wound Management',
 '**Wound care is the single most effective rabies prevention measure** — reduces risk by up to 90% in animal studies.

**Immediate wound care:**
1. **Wash wound with soap and water for at least 15 minutes** — vigorous flushing
2. Irrigate with **povidone-iodine** (Betadine) or virucidal agent if available
3. Do NOT apply caustic agents (bleach, acid)

**Suturing guidance:**
• **Delay primary closure if possible** — leaving wounds open reduces infection risk
• If suturing required for cosmetic/hemostatic reasons: **infiltrate RIG into wound bed first**, then suture loosely
• Approximate wound edges rather than tight closure

**Tetanus:** Update tetanus prophylaxis per standard wound guidelines if not current.',
 '[1, 15, 18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-pep-decision', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 21);

-- MODULE 6: PEP DECISION
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('rabies-pep-decision', 'rabies', 'question', 6,
 'Previous Rabies Vaccination?',
 'Has the patient **previously completed** a full rabies vaccine series (pre-exposure or post-exposure)?

Previously vaccinated patients need a **shorter protocol** (2 doses, no RIG) unless immunocompromised.',
 '[1, 18]'::jsonb,
 '[{"label": "No — Not previously vaccinated", "description": "First time receiving rabies PEP", "next": "rabies-immune-check"}, {"label": "Yes — Previously vaccinated", "description": "Completed prior pre- or post-exposure series", "next": "rabies-prevax-immune"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 22),

('rabies-immune-check', 'rabies', 'question', 6,
 'Immunocompromised?',
 'Is the patient immunocompromised?

**Immunocompromising conditions include:**
• HIV/AIDS
• Active chemotherapy or radiation
• Chronic corticosteroid use (>2 mg/kg or >20 mg/day prednisone for >14 days)
• Solid organ or stem cell transplant
• Primary immunodeficiency
• Anti-CD20 therapy (rituximab) within 6 months',
 '[1, 19]'::jsonb,
 '[{"label": "No — Immunocompetent", "description": "Standard PEP protocol", "next": "rabies-full-pep"}, {"label": "Yes — Immunocompromised", "description": "Modified protocol — 5-dose series + serology", "next": "rabies-immunocomp-pep"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 23),

('rabies-prevax-immune', 'rabies', 'question', 6,
 'Previously Vaccinated — Immune Status',
 'Previously vaccinated patients have an **anamnestic immune response** — they need only 2 vaccine doses and **no RIG**.

However, immunocompromised patients may not mount an adequate anamnestic response.',
 '[1, 18]'::jsonb,
 '[{"label": "Immunocompetent", "description": "2-dose series, no RIG", "next": "rabies-prevax-regimen"}, {"label": "Immunocompromised", "description": "Full protocol — RIG + 5-dose series + serology", "next": "rabies-immunocomp-pep"}]'::jsonb,
 '[]'::jsonb, NULL, NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 24),

('rabies-full-pep', 'rabies', 'info', 6,
 'Full PEP — RIG + 4-Dose Vaccine',
 '**RABIES IMMUNE GLOBULIN (RIG)**
• [Rabies Immune Globulin (HRIG)](#/drug/rabies-rig/rabies pep) **20 IU/kg**
• **Infiltrate as much as anatomically feasible into and around the wound(s)**
• Inject remainder IM at a site **distant from the vaccine injection site**
• Give with the first vaccine dose ONLY — **do NOT give RIG after day 7** of the vaccine series
• Do NOT exceed 20 IU/kg (may interfere with active antibody production)

**RABIES VACCINE**
• [Rabies Vaccine (HDCV or PCECV)](#/drug/rabies-vaccine/rabies pep unvaccinated) **1.0 mL IM** deltoid (adults) or anterolateral thigh (children)
• **4-dose series: Days 0, 3, 7, 14**
• Day 0 = today (give vaccine at a different site than RIG)

**PREGNANCY** is NOT a contraindication to rabies PEP.',
 '[1, 18, 19, 20]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-schedule', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 25),

('rabies-immunocomp-pep', 'rabies', 'info', 6,
 'Immunocompromised PEP — RIG + 5-Dose Vaccine',
 '**Immunocompromised patients require a modified protocol:**

**RIG** — Give **even if previously vaccinated:**
• [Rabies Immune Globulin (HRIG)](#/drug/rabies-rig/rabies pep) **20 IU/kg** — infiltrate wound, remainder IM distant from vaccine

**VACCINE — 5-dose series:**
• [Rabies Vaccine (HDCV or PCECV)](#/drug/rabies-vaccine/rabies pep immunocompromised) **1.0 mL IM**
• **Days 0, 3, 7, 14, and 28** (additional day 28 dose)

**POST-VACCINATION SEROLOGY:**
• Check rabies virus neutralizing antibody (RVNA) titer **7-14 days after last dose**
• Adequate response: ≥0.5 IU/mL
• If inadequate: administer additional vaccine dose and recheck

**ID/infectious disease consultation recommended** for all immunocompromised patients.',
 '[1, 19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-schedule', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 26),

('rabies-prevax-regimen', 'rabies', 'info', 6,
 'Previously Vaccinated — 2-Dose Booster',
 '**No RIG needed** — previously vaccinated, immunocompetent patients already have memory B cells.

**VACCINE — 2-dose series:**
• [Rabies Vaccine (HDCV or PCECV)](#/drug/rabies-vaccine/rabies pep previously vaccinated) **1.0 mL IM** deltoid (adults) or anterolateral thigh (children)
• **Days 0 and 3** only

**Applies to patients who have received:**
• Prior complete PEP series
• Pre-exposure prophylaxis (2- or 3-dose series)
• Prior series with documented adequate antibody titer',
 '[1, 18]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-schedule', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 27);

-- MODULE 7: SCHEDULE & FOLLOW-UP
INSERT INTO decision_nodes (id, tree_id, type, module, title, body, citation, options, inputs, next, recommendation, treatment, confidence, images, calculator_links, sort_order) VALUES
('rabies-schedule', 'rabies', 'info', 7,
 'Vaccination Schedule',
 '**UNVACCINATED, IMMUNOCOMPETENT — 4 doses:**
Day 0 (today) | Day 3 | Day 7 | Day 14
+ RIG on Day 0 only

**UNVACCINATED, IMMUNOCOMPROMISED — 5 doses:**
Day 0 (today) | Day 3 | Day 7 | Day 14 | Day 28
+ RIG on Day 0 (even if previously vaccinated)
+ Post-series serology

**PREVIOUSLY VACCINATED, IMMUNOCOMPETENT — 2 doses:**
Day 0 (today) | Day 3
No RIG needed

**Administration site:**
• Adults: **deltoid muscle** (NEVER gluteal — poor immunogenicity)
• Children: anterolateral thigh acceptable
• Vaccine and RIG must be given at **different anatomic sites**

[Rabies PEP — Patient Information](#/info/rabies-patient-info) — shareable vaccination schedule and return instructions.',
 '[1, 18, 19]'::jsonb, '[]'::jsonb, '[]'::jsonb, 'rabies-followup', NULL, NULL, NULL, '[]'::jsonb, '[]'::jsonb, 28),

('rabies-followup', 'rabies', 'result', 7,
 'Follow-Up and Disposition',
 '**FOLLOW-UP VACCINATION VISITS:**
• Schedule vaccine doses per protocol above
• Doses can be given at PCP, urgent care, public health department, or ED
• **Do not restart the series if a dose is delayed** — resume where left off

**ANIMAL OBSERVATION (dogs/cats/ferrets only):**
• If 10-day observation in progress → contact animal control/public health for updates
• Animal develops rabies signs or dies → ensure PEP is completed
• Animal healthy at day 10 → may discontinue vaccine series

**MONITORING:**
• Watch wound for signs of infection
• Vaccine side effects: injection site pain (up to 74%), headache, nausea — generally mild
• Rare: immune complex-like reaction (urticaria, arthralgias) with booster doses of HDCV

**PUBLIC HEALTH:**
• Report animal bite to local animal control/health department
• Ensure animal disposition plan is in place',
 '[1, 18, 17]'::jsonb, '[]'::jsonb, '[]'::jsonb, NULL,
 'Administer Day 0 vaccine (+ RIG if indicated) before discharge. Schedule remaining vaccine doses. Report bite to animal control. Provide wound care instructions. Return for signs of wound infection or if observation animal becomes ill.',
 NULL, 'recommended', '[]'::jsonb, '[]'::jsonb, 29);
