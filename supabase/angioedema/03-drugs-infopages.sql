BEGIN;
-- 5. drugs (9 new drugs)
INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('icatibant', 'Icatibant (Firazyr)', 'Icatibant acetate', 'Bradykinin B2 Receptor Antagonist', 'SQ',
 '["Hereditary angioedema (acute attack)","ACEi-induced angioedema (off-label)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"30 mg SQ injection in the abdominal area. May repeat every 6 hours if needed, maximum 3 doses in 24 hours. FDA approved for acute HAE attacks in adults ≥18 years. FAST-3 trial: statistically significant improvement in time to clinically significant relief vs placebo."},{"indication":"ACEi-induced angioedema (off-label)","regimen":"30 mg SQ injection in the abdominal area. Bas 2015 RCT: median time to complete resolution 8 hours (vs 27.1 hours for steroid/antihistamine). No recurrence in the trial. However, subsequent RCTs (Straka 2017) yielded neutral results. 2019 meta-analysis of 3 RCTs found no statistically significant benefit."}]'::jsonb,
 '["Known hypersensitivity to icatibant"]'::jsonb,
 '["Extremely expensive (~$23,000 per dose)","Not widely available in all EDs","Injection site reactions common (97% in clinical trials — erythema, swelling, burning)","Functions downstream of the kallikrein amplification spiral — cannot break the vicious cycle driving bradykinin production","Mixed evidence for ACEi-induced angioedema"]'::jsonb,
 'Clinical response — time to symptom relief. Injection site reactions. Vital signs.',
 'Synthetic peptide structurally similar to bradykinin that specifically blocks the B2 receptor. Works downstream of the kallikrein-bradykinin spiral (blocks the receptor rather than interrupting bradykinin production). FDA approved 2011 for HAE in adults ≥18. FAST-1 was negative, FAST-2 showed superiority over TXA, FAST-3 was positive vs placebo. For ACEi-induced: Bas 2015 (NEJM) was positive but later studies neutral. May be less effective than agents that interrupt the upstream vicious spiral (C1-INH, TXA).',
 NULL,
 '["Lumry WR, et al. Icatibant for acute HAE (FAST-3). Ann Allergy Asthma Immunol. 2011;107(6):529-537.","Bas M, et al. A randomized trial of icatibant in ACE-inhibitor-induced angioedema. N Engl J Med. 2015;372(5):418-425.","Straka BT, et al. Effect of bradykinin receptor antagonism on ACEi-associated angioedema. J Allergy Clin Immunol. 2017;140(1):242-248."]'::jsonb,
 0)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ecallantide', 'Ecallantide (Kalbitor)', 'Ecallantide', 'Kallikrein Inhibitor', 'SQ',
 '["Hereditary angioedema (acute attack)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"30 mg SQ administered as 3 separate 10 mg injections. Inject at 3 separate sites (abdomen, upper arm, or thigh), each at least 2.5 inches apart. Inject away from site of angioedema. FDA approved for patients ≥12 years. Can repeat if attack persists — limited data on re-dosing."}]'::jsonb,
 '["Known hypersensitivity to ecallantide"]'::jsonb,
 '["~4% risk of anaphylaxis — administer ONLY in healthcare setting with capacity to manage anaphylaxis","Not for self-administration at home due to anaphylaxis risk","Limited data in patients <12 years old","Not recommended for ACEi-induced angioedema (RCTs showed minimal efficacy)"]'::jsonb,
 'Monitor for anaphylaxis for at least 30 minutes after administration. Clinical response.',
 '60-amino-acid polypeptide that specifically and reversibly inhibits plasma kallikrein. Kallikrein cleaves high-molecular-weight kininogen to release bradykinin. FDA approved 2009 (ages ≥16), expanded to ≥12 in 2014. EDEMA trials established efficacy. ~4% anaphylaxis risk limits home use. Not effective for ACEi-induced angioedema per RCTs (Bernstein 2014, Lewis 2015).',
 NULL,
 '["Cicardi M, et al. Ecallantide for the treatment of acute attacks in hereditary angioedema. N Engl J Med. 2010;363(6):523-531.","Bernstein JA, et al. Effectiveness of ecallantide in treating ACE inhibitor-induced angioedema. Ann Allergy Asthma Immunol. 2015;114(3):245-249."]'::jsonb,
 1)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('berinert', 'Berinert', 'C1 esterase inhibitor (human), pasteurized', 'C1-INH Concentrate (plasma-derived)', 'IV',
 '["Hereditary angioedema (acute attack)","Acquired angioedema","ACEi-induced angioedema (off-label)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"20 units/kg IV push at 4 mL/min. Round to nearest 500-unit vial (typical adult dose ~1500 units). Warm to room temperature before administration. FDA approved for acute abdominal, facial, or laryngeal HAE attacks in adults and adolescents. Median time to symptom relief: 0.46 hours. Single dose resolves 99% of HAE attacks (IMPACT-2).","weightCalc":{"dosePerKg":20,"unit":"units"}},{"indication":"Acquired angioedema","regimen":"20 units/kg IV push at 4 mL/min. Same dosing as HAE. Low C1q level distinguishes AAE from HAE.","weightCalc":{"dosePerKg":20,"unit":"units"}},{"indication":"ACEi-induced angioedema (off-label)","regimen":"20 units/kg IV push at 4 mL/min. Mixed results for ACEi-induced angioedema — not FDA-approved for this indication. Consider if targeted therapies (TXA, icatibant) unavailable or ineffective.","weightCalc":{"dosePerKg":20,"unit":"units"}}]'::jsonb,
 '["Known hypersensitivity to C1-INH or any component","Life-threatening hypersensitivity reactions to blood products"]'::jsonb,
 '["Derived from pooled human plasma — theoretical risk of infectious transmission","Thrombotic events reported rarely","Cost: ~$10,000 per 1500 units","May not be available in smaller hospitals"]'::jsonb,
 'Clinical response (symptom relief). Vital signs during infusion. Watch for hypersensitivity reactions.',
 'Plasma-derived C1-INH concentrate. First-line therapy for acute HAE attacks. Restores C1-INH activity, inhibiting kallikrein and preventing further bradykinin production. FDA approved 2009 based on IMPACT-1/2 trials. Preferred over recombinant C1-INH in pregnancy.',
 NULL,
 '["Craig TJ, et al. C1 esterase inhibitor concentrate in 1085 hereditary angioedema attacks — final results of the I.M.P.A.C.T.2 study. Allergy. 2011;66(12):1604-1611.","Bernstein JA, et al. Angioedema in the emergency department: a practical guide. Int J Emerg Med. 2017;10(1):15."]'::jsonb,
 2)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ruconest', 'Ruconest', 'Conestat alfa (recombinant C1 esterase inhibitor)', 'C1-INH Concentrate (recombinant)', 'IV',
 '["Hereditary angioedema (acute attack)"]'::jsonb,
 '[{"indication":"Hereditary angioedema (acute attack)","regimen":"50 units/kg IV for patients weighing <84 kg. 4200 units IV for patients ≥84 kg. Administer as slow IV injection. FDA approved for treatment of acute attacks in adults and adolescents with HAE. Median time to beginning of relief: 66 minutes (vs 495 minutes for placebo).","weightCalc":{"dosePerKg":50,"unit":"units","maxDose":4200}}]'::jsonb,
 '["Known or suspected rabbit allergy (produced from milk of transgenic rabbits)","Known hypersensitivity to conestat alfa"]'::jsonb,
 '["Produced from transgenic rabbit milk — unique allergy concern","Not preferred over Berinert in pregnancy (plasma-derived C1-INH preferred)","Cost approximately $10,000 per dose","Less commonly stocked than Berinert"]'::jsonb,
 'Clinical response. Vital signs during infusion. Watch for hypersensitivity reactions (especially in patients not previously screened for rabbit allergy).',
 'Recombinant human C1-INH produced from the milk of transgenic rabbits. Amino acid sequence identical to human C1-INH. Advantage: eliminates concern for infectious transmission from human plasma donors. Zuraw et al. conducted two independent RCTs showing significant reduction in time to symptom relief. FDA approved 2014.',
 NULL,
 '["Zuraw B, et al. Recombinant human C1-inhibitor for the treatment of acute angioedema attacks in patients with hereditary angioedema. J Allergy Clin Immunol. 2010;126(4):821-827."]'::jsonb,
 3)
;

-- famotidine already exists in Supabase (from anaphylaxis consult) — skip INSERT

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('cetirizine', 'Cetirizine (Zyrtec)', 'Cetirizine hydrochloride', '2nd-Generation H1 Antihistamine', 'PO',
 '["Angioedema / anaphylaxis (adjunct)","Urticaria","Allergic rhinitis"]'::jsonb,
 '[{"indication":"Angioedema / anaphylaxis (adjunct)","regimen":"10 mg PO. Second-generation H1 antagonist — less sedating than diphenhydramine. Used as adjunct to epinephrine, not as monotherapy for anaphylaxis. May not be feasible in patients intolerant of oral formulation."},{"indication":"Urticaria","regimen":"10 mg PO daily. Can increase up to 40 mg/day (4× standard dose) for refractory urticaria/idiopathic angioedema. Pediatric ≥6 years: 5-10 mg PO daily."}]'::jsonb,
 '["Known hypersensitivity to cetirizine or hydroxyzine"]'::jsonb,
 '["Mild drowsiness possible (less than first-generation antihistamines)","Reduce dose in renal impairment","Not available in IV formulation — patients unable to take PO will need diphenhydramine IV"]'::jsonb,
 'Symptom improvement. Sedation level.',
 'Second-generation H1 antihistamine with less sedation than diphenhydramine. Preferred for outpatient management and mild presentations. For acute ED management of angioedema, IV diphenhydramine may be more practical. High-dose (up to 4× standard) can be trialed for idiopathic histaminergic angioedema.',
 NULL,
 '["Moellman JJ, et al. A consensus parameter for the evaluation and management of angioedema in the emergency department. Acad Emerg Med. 2014;21(4):469-484."]'::jsonb,
 5)
;

-- glucagon already exists in Supabase (from anaphylaxis consult) — skip INSERT

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('ffp', 'Fresh Frozen Plasma (FFP)', 'Fresh frozen plasma', 'Blood Product', 'IV',
 '["Bradykinin-mediated angioedema (second-line)","Coagulopathy reversal"]'::jsonb,
 '[{"indication":"Angioedema (second-line)","regimen":"2 units IV initially. May give additional 2 units if no response. Each unit is 200-250 mL. Contains C1-INH, ACE, and other bradykinin-metabolizing enzymes. Use only if targeted therapies (C1-INH concentrate, icatibant, TXA) are unavailable. Retrospective cohort: FFP reduced intubation risk in non-HAE angioedema patients."}]'::jsonb,
 '["IgA deficiency with anti-IgA antibodies (risk of anaphylaxis)","Volume overload (relative — consider volume of 2-4 units)"]'::jsonb,
 '["TRALI (transfusion-related acute lung injury) — rare but serious","Volume overload — 2-4 units = 400-1000 mL; use caution in heart failure","Infectious transmission risk (low with modern screening)","Contains kallikrein substrates (high-molecular-weight kininogen) — theoretical risk of paradoxical worsening, though little evidence supports this","Some case reports describe worsening of ACEi-induced angioedema with FFP","Type and screen required before administration"]'::jsonb,
 'Clinical response. Vital signs during transfusion. Watch for TRALI (dyspnea, hypoxia within 6 hours).',
 'Second-line therapy for bradykinin-mediated angioedema when targeted therapies are unavailable. Contains the enzymes that metabolize bradykinin (including ACE and C1-INH), addressing the underlying deficit. Multiple case reports and one retrospective cohort study support efficacy, but no RCTs exist. FFP is universally available and relatively inexpensive. The theoretical concern for paradoxical worsening (from kallikrein substrates) has little clinical evidence.',
 NULL,
 '["Saeb A, et al. Using fresh frozen plasma for acute airway angioedema to prevent intubation. Emerg Med Int. 2016;2016:6091510.","Bernstein JA, et al. Angioedema in the emergency department: a practical guide. Int J Emerg Med. 2017;10(1):15."]'::jsonb,
 7)
;

INSERT INTO drugs (id, name, generic_name, drug_class, route, indications, dosing, contraindications, cautions, monitoring, notes, image, citations, sort_order) VALUES
('aminocaproic-acid', 'Aminocaproic Acid (Amicar)', 'Aminocaproic acid', 'Antifibrinolytic (lysine analog)', 'IV / PO',
 '["Bradykinin-mediated angioedema (adjunct)"]'::jsonb,
 '[{"indication":"Bradykinin-mediated angioedema","regimen":"4-5 g IV over 1 hour loading dose, then 1 g/hour continuous infusion. Alternative to tranexamic acid for bradykinin-mediated angioedema. Inhibits plasminogen activation, interrupting the kallikrein amplification spiral. May require ongoing treatment — bradykinin-mediated angioedema evolves over days."}]'::jsonb,
 '["Active intravascular clotting (DIC)","Upper urinary tract bleeding (risk of ureteral clot obstruction)"]'::jsonb,
 '["Thrombotic risk — avoid in patients with active DVT/PE or recent thromboembolic events","Renal impairment — dose reduce","Myopathy with prolonged use","Concurrent use with factor IX concentrates or anti-inhibitor coagulant complexes increases thrombotic risk"]'::jsonb,
 'Thrombotic complications, renal function, CPK with prolonged use.',
 'Alternative antifibrinolytic to TXA for bradykinin-mediated angioedema. Blocks conversion of plasminogen to plasmin, a critical step in the kallikrein amplification spiral that drives bradykinin-mediated angioedema. Available in most hospitals. Less widely studied than TXA for angioedema but shares the same mechanism of action.',
 NULL,
 '["Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702."]'::jsonb,
 8)
;


-- 6. info_pages (7 pages)
INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-steps-summary', 'Angioedema Steps Summary', 'Quick-reference pathway through the Angioedema consult',
 '[{"heading":"Module 1 — Initial Assessment & Airway","body":"• [Assess airway: signs of compromise (stridor, voice change, dyspnea)?](#/node/angio-start)\n• [Secure airway: dual setup, awake fiberoptic, avoid RSI](#/node/angio-airway-secure)\n• [Monitor: supplemental O2, avoid positive pressure, frequent reassessment](#/node/angio-airway-monitor)"},{"heading":"Module 2 — Classification","body":"• [Classify: histamine-mediated (urticaria) vs bradykinin-mediated (no urticaria)](#/node/angio-classify)\n• [Bradykinin screen: ACEi? HAE? Post-tPA? Acquired? Idiopathic?](#/node/angio-bradykinin-screen)\n• [Undifferentiated: empiric histamine treatment, reassess in 30-60 min](#/node/angio-empiric)"},{"heading":"Module 3 — Histamine-Mediated Treatment","body":"• [Severity assessment: anaphylaxis features vs isolated angioedema](#/node/angio-histamine-treat)\n• [Anaphylaxis: epinephrine IM + H1/H2 blockers + methylprednisolone + IVF](#/node/angio-anaphy-treat)\n• [Isolated: antihistamines, observe 4-6 hours](#/node/angio-histamine-mild)"},{"heading":"Module 4 — Bradykinin-Mediated Treatment","body":"• [ACEi-induced: STOP ACEi, TXA or icatibant or FFP, observe](#/node/angio-acei-treat)\n• [HAE acute: C1-INH concentrate (Berinert) first-line, icatibant/ecallantide alternatives](#/node/angio-hae-treat)\n• [First presentation: send C4 level, treat empirically](#/node/angio-hae-new)\n• [Acquired angioedema: low C1q distinguishes from HAE, screen for malignancy](#/node/angio-aae)\n• [Post-tPA: icatibant or C1-INH, AVOID TXA](#/node/angio-tpa)\n• [Pediatric: smaller airway, C1-INH preferred, US over CT for abdominal](#/node/angio-peds)\n• [Pregnancy: Berinert preferred, variable disease course](#/node/angio-pregnancy)"},{"heading":"Module 5 — Abdominal Angioedema","body":"• [GI involvement in up to 73% of HAE — mimics acute abdomen](#/node/angio-abdominal)\n• [Treat underlying cause — improvement confirms diagnosis, avoid unnecessary surgery](#/node/angio-abdominal-treat)"},{"heading":"Module 6 — Disposition","body":"• [Ishoo staging: Stage 1-4 by anatomic location](#/node/angio-dispo)\n• [Stage 1-2 (face/lip/palate): observe 4-6h, discharge with precautions](#/node/angio-dispo-mild)\n• [Stage 3 (tongue/floor of mouth): admit for monitoring](#/node/angio-dispo-admit)\n• [Stage 4 (laryngeal): ICU — 67% require airway intervention](#/node/angio-dispo-icu)"}]'::jsonb,
 '[]'::jsonb,
 false,
 0)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-differentiation', 'Histamine vs Bradykinin Angioedema', 'Key differentiating features to guide treatment',
 '[{"heading":"Onset & Duration","body":"**Histamine-mediated:** Rapid onset (minutes to hours). Episodes typically resolve within 24-37 hours. [1]\n\n**Bradykinin-mediated:** Slow onset (evolves over hours to days). Episodes typically last 48-72 hours, occasionally up to 5 days. [1]"},{"heading":"Distribution","body":"**Histamine-mediated:** Diffuse, symmetric. Lips 30%, tongue 33%, eyelids 4%, larynx 3%, extremities 11%. [2]\n\n**Bradykinin-mediated:** Often focal and asymmetric. Tongue 42%, lips 24%, eyelids 2%, larynx 17%, extremities 4%. [2]"},{"heading":"Associated Skin Findings","body":"**Histamine-mediated:** Urticaria and/or pruritus often present. Flushing may occur.\n\n**Bradykinin-mediated:** NO urticaria or pruritus. HAE may cause erythema marginatum (non-pruritic erythematous rings on torso)."},{"heading":"Triggers","body":"**Histamine-mediated:** Allergic triggers — foods, insect stings, medications, environmental allergens. IgE type I hypersensitivity, direct mast cell degranulation (contrast, opioids), or COX inhibition (NSAIDs). [1]\n\n**Bradykinin-mediated:** Trauma, infections, stress, estrogens (pregnancy). ACEi use (any time from hours to 10+ years after starting). Often no obvious trigger."},{"heading":"Systemic Involvement","body":"**Histamine-mediated:** Other organs commonly involved — hypotension, wheezing (strong indicator of histamine involvement), GI symptoms (nausea/vomiting, diarrhea). [1]\n\n**Bradykinin-mediated:** Usually does NOT involve other organs. GI involvement (bowel edema) may occur in HAE but often not synchronous with upper airway symptoms."},{"heading":"Response to Treatment","body":"**Histamine-mediated:** Responds rapidly to epinephrine, antihistamines, and corticosteroids.\n\n**Bradykinin-mediated:** Does NOT respond to epinephrine, antihistamines, or corticosteroids. Requires targeted therapy: C1-INH concentrate, icatibant, TXA, or FFP."}]'::jsonb,
 '[{"num":1,"text":"Bernstein JA, et al. Angioedema in the emergency department: a practical guide to differential diagnosis and management. Int J Emerg Med. 2017;10(1):15."},{"num":2,"text":"Lenschow M, et al. A score for the differential diagnosis of bradykinin- and histamine-induced head and neck swellings. Eur Arch Otorhinolaryngol. 2018;275(7):1767-1773."}]'::jsonb,
 false,
 1)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-labs', 'Angioedema Lab Interpretation', 'Laboratory findings by angioedema type',
 '[{"heading":"C4 Level (Screening Test)","body":"**C4 is the best screening test for C1-INH-mediated angioedema.** [1]\n\n• **96% sensitive during an acute attack** (81% between attacks)\n• Low C4 found in: HAE Type 1, HAE Type 2, Acquired angioedema\n• Normal C4 in: HAE Type 3 (normal C1-INH), ACEi-induced, Idiopathic\n\n**Obtain C4 in the ED during acute attack** if personal/family history suggests HAE — testing is most sensitive during attacks."},{"heading":"C1-INH Concentration (Antigen Level)","body":"• **HAE Type 1:** Low (<30%) — most common type (85% of HAE)\n• **HAE Type 2:** Normal — the protein is present but dysfunctional\n• **HAE Type 3:** Normal\n• **Acquired angioedema:** Low or normal\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal"},{"heading":"C1-INH Function","body":"• **HAE Type 1:** Low (<30%)\n• **HAE Type 2:** Low (<30%) — THIS is the key finding (normal antigen but low function)\n• **HAE Type 3:** Normal\n• **Acquired angioedema:** Low\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal"},{"heading":"C1q Level","body":"**C1q distinguishes HAE from Acquired Angioedema (AAE):** [2]\n\n• **HAE (all types):** Normal C1q\n• **Acquired angioedema:** Low C1q (in ~75% of patients) — the KEY differentiator\n• **ACEi-induced:** Normal\n• **Idiopathic:** Normal"},{"heading":"Other Labs","body":"**Tryptase:** Elevated in anaphylaxis/histamine-mediated angioedema (but NOT always — may be normal even in severe cases). Not elevated in bradykinin-mediated angioedema. Draw within 1-4 hours of symptom onset. [1]\n\n**Paraprotein:** Present in most acquired angioedema cases (associated with lymphoproliferative disorders).\n\n**CRP:** Some studies suggest elevation in ACEi-induced angioedema, but not widely adopted for diagnosis.\n\n**NOTE:** There is no rapid point-of-care test to definitively diagnose the type of angioedema in the ED. Definitive testing requires days to weeks."}]'::jsonb,
 '[{"num":1,"text":"Wilkerson RG, Winters ME. Angiotensin-converting enzyme inhibitor-induced angioedema. Immunol Allergy Clin North Am. 2023;43(3):513-532."},{"num":2,"text":"Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702."}]'::jsonb,
 false,
 2)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-ishoo-staging', 'Ishoo Staging & Disposition', 'Predicting airway risk and disposition based on anatomic location',
 '[{"heading":"Modified Ishoo Staging System","body":"**Stage 1:** Facial rash, facial edema, lip edema\n**Stage 2:** Soft palate edema\n**Stage 3:** Tongue edema, floor of mouth edema\n**Stage 4:** Laryngeal edema (voice change, hoarseness, stridor, dyspnea)"},{"heading":"Disposition Probabilities (Das 2021, n=320)","body":"**Stage 1:**\n• ED discharge: 85%\n• Admission without airway intervention: 2.5%\n• Airway intervention: 0.1%\n\n**Stage 2:**\n• ED discharge: 65%\n• Admission without airway intervention: 8%\n• Airway intervention: 1%\n\n**Stage 3:**\n• ED discharge: 30%\n• Admission without airway intervention: 12%\n• Airway intervention: 8%\n\n**Stage 4:**\n• ED discharge: 0%\n• ICU without airway intervention: 17%\n• Airway intervention: 67% [1][2]"},{"heading":"Key Clinical Correlations","body":"• Voice change, hoarseness, dyspnea, and stridor are significantly correlated with need for ICU admission [1]\n• Voice change, hoarseness, dyspnea, and stridor predict need for airway intervention [1]\n• **Edema localized to lips alone = low intubation risk** [1][2]\n• Approximately 40-60% of all angioedema patients are admitted for observation"},{"heading":"General Disposition Recommendations","body":"• **All patients:** Strict return precautions if symptoms worsen or airway compromise develops\n• **All patients:** PCP follow-up recommended (ideally next day)\n• **Allergic/immunologic component:** Short course of antihistamines + epinephrine autoinjector\n• **ACEi-induced:** Discontinue ACEi permanently, PCP for alternative antihypertensive\n• **Known HAE:** Discharge with targeted therapy for recurrence prevention, refer to allergist/immunologist\n• **Unknown cause:** Send C4 level (from ED or via PCP), refer for further evaluation"}]'::jsonb,
 '[{"num":1,"text":"Ishoo E, et al. Predicting airway risk in angioedema: staging system based on presentation. Otolaryngol Head Neck Surg. 1999;121(3):263-268."},{"num":2,"text":"Das C, et al. Evaluation of staging criteria for disposition and airway intervention in emergency department angioedema patients. Acute Med Surg. 2021;8(1):e704."}]'::jsonb,
 false,
 3)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-hae-types', 'HAE Classification & Triggers', 'Hereditary angioedema subtypes and precipitating factors',
 '[{"heading":"HAE Type 1 (85% of HAE)","body":"**Deficient C1-INH level** (<30% of normal).\n\nMost common form. Autosomal dominant inheritance — but 25% arise from de novo mutations (no family history). Prevalence: 1:100,000 to 1:150,000.\n\nLab findings: Low C4, Low C1-INH antigen, Low C1-INH function, Normal C1q."},{"heading":"HAE Type 2 (15% of HAE)","body":"**Normal C1-INH level but decreased C1-INH function** (<30% of normal).\n\nThe protein is present but dysfunctional. Key diagnostic clue: normal C1-INH antigen but low C1-INH function.\n\nLab findings: Low C4, Normal C1-INH antigen, Low C1-INH function, Normal C1q."},{"heading":"HAE Type 3 (Rare — Normal C1-INH)","body":"Previously known as \"HAE with normal C1-INH.\" Linked to genetic mutations in:\n• Factor XII (increases prekallikrein → kallikrein conversion)\n• Angiopoietin-1\n• Plasminogen gene\n\nClinically associated with predominantly tongue edema. All complement levels are normal — diagnosis requires genetic testing. C1-INH concentrate efficacy is variable. [1]"},{"heading":"Acquired Angioedema (AAE)","body":"Very rare (~1.5 per million). Typically presents after age 40. Acquired C1-INH deficiency.\n\n**Type I:** Associated with lymphoproliferative disorders (CLL, NHL, Waldenstrom, MGUS). Due to increased consumption of C1-INH.\n\n**Type II:** Associated with autoimmune disease (lupus). Due to autoantibodies against C1-INH.\n\n**Key differentiator from HAE:** Low C1q (normal in HAE, low in ~75% of AAE). [1]"},{"heading":"Common Triggers for HAE Attacks","body":"• **Infection** (most common trigger in adults — bacterial; in children — viral)\n• **Trauma** (dental procedures, surgery)\n• **Emotional stress**\n• **Estrogens** (oral contraceptives, pregnancy — enhance bradykinin signaling)\n• **Physical stimuli** (cold, pressure, vibration)\n• **Medications** (ACE inhibitors can unmask/worsen subclinical HAE)"},{"heading":"Key Facts","body":"• 50-75% of HAE patients have first attack by age 12 (mean onset 5-11 years)\n• 25% of cases arise from de novo mutations — no family history\n• Up to 44% of HAE patients are initially misdiagnosed\n• GI involvement in up to 73% — can mimic acute abdomen\n• Mean delay to diagnosis: 8-10 years"}]'::jsonb,
 '[{"num":1,"text":"Kesh S, Bernstein JA. Isolated angioedema: a review of classification and update on management. Ann Allergy Asthma Immunol. 2022;129(6):692-702."}]'::jsonb,
 false,
 4)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-discharge', 'Angioedema Discharge Instructions', 'Patient information and return precautions',
 '[{"heading":"What is Angioedema?","body":"You had swelling beneath the skin, called angioedema. This can be caused by an allergic reaction, a medication side effect, or a genetic condition. Your emergency team treated your swelling and monitored you to make sure it improved."},{"heading":"Return to the Emergency Department Immediately If","body":"• Your swelling returns or gets worse\n• You develop a change in your voice or hoarseness\n• You have difficulty breathing or swallowing\n• You develop swelling of your tongue or throat\n• You feel lightheaded, dizzy, or faint\n• You develop a widespread rash or hives with difficulty breathing"},{"heading":"If You Were Taking an ACE Inhibitor","body":"Your blood pressure medication (such as lisinopril, enalapril, ramipril, or benazepril) may have caused your swelling. This is a side effect, not an allergy.\n\n**You must STOP this medication permanently.** Do NOT restart it or take any other ACE inhibitor.\n\nContact your primary care doctor within 1-2 days to discuss a different blood pressure medication. There are many safe alternatives available."},{"heading":"If You Were Given an Epinephrine Auto-Injector","body":"You have been prescribed an epinephrine auto-injector (such as an EpiPen). Carry it with you at all times. If you develop sudden swelling, hives, or difficulty breathing, use it immediately and call 911."},{"heading":"Follow-Up","body":"• See your primary care doctor within 1-2 days\n• If a hereditary or genetic cause is suspected, you may be referred to an allergist or immunologist for further testing\n• Keep a record of your episodes — note what you were eating, doing, or taking before the swelling started"}]'::jsonb,
 '[]'::jsonb,
 true,
 5)
;

INSERT INTO info_pages (id, title, subtitle, sections, citations, shareable, sort_order) VALUES
('angio-acei-alternatives', 'ACEi Alternative Medications', 'Blood pressure management after ACEi-induced angioedema',
 '[{"heading":"ACEi-Induced Angioedema — Key Points","body":"• ACEi-induced angioedema is a **class effect** — ALL ACE inhibitors carry this risk\n• It is **NOT dose-dependent** — symptoms can occur at any dose, hours to years after starting\n• The patient must **discontinue ALL ACE inhibitors permanently** [1]"},{"heading":"Angiotensin Receptor Blockers (ARBs)","body":"ARBs (losartan, valsartan, irbesartan, candesartan, etc.) have historically been quoted as having ~10% cross-reactivity with ACEi for angioedema. However, more recent data suggest the risk is much lower.\n\nARBs do NOT inhibit ACE directly (they block the angiotensin II receptor), so bradykinin accumulation is less of a concern. ARBs may be considered as an alternative antihypertensive, but this decision should be made by the patient''s primary care provider with close monitoring, not in the ED. [1]"},{"heading":"Alternative Antihypertensive Classes","body":"• **Calcium channel blockers** (amlodipine, nifedipine) — no cross-reactivity concern\n• **Thiazide diuretics** (hydrochlorothiazide, chlorthalidone) — first-line per JNC guidelines\n• **Beta-blockers** (metoprolol, carvedilol) — no cross-reactivity concern\n• **Direct renin inhibitors** (aliskiren) — CAUTION: may also affect bradykinin metabolism\n\n**The choice of alternative should be made by the patient''s PCP** based on comorbidities, not in the ED."},{"heading":"ED Discharge Counseling","body":"• Stop the ACEi today — do not take any more doses\n• Follow up with PCP within 1-2 days for medication adjustment\n• Inform the patient this is a side effect (not an allergy) — document as \"ACEi intolerance\" not \"ACEi allergy\" in the medical record\n• Educate that angioedema can recur even after stopping the ACEi (rare, usually within first few weeks)"}]'::jsonb,
 '[{"num":1,"text":"Rosenbaum S, et al. Clinical practice statement: what is the emergency department management of patients with angioedema secondary to an ACE-inhibitor? J Emerg Med. 2021;61(1):105-112."}]'::jsonb,
 false,
 6)
;

COMMIT;
