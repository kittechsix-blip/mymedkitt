// Belatacept and the induction / rejection biologics for the Transplant Drugs Side-effects consult. Every line is paraphrased from the drug's own FDA label
// (DailyMed SPL XML saved in research/transplant-sources/dailymed/) and cites that label. Nothing from outside the labels. No doses.
// Line format: a short head, a colon, one hazard; 200 characters at most. A timing is used only where the label's time statement describes the row's whole hazard.
// alsoOnLabel (12 or fewer): lines that change care today; warned events with no row; overdose; contraindication; the rest. Interactions live in `interactions` (fixed heads, then plain drug-named lines last).
const c = (v, ...cite) => ({ v, cite });
const N = 'pi-nulojix';
const S = 'pi-simulect';
const T = 'pi-thymoglobulin';
const G = 'pi-atgam';
const dm = (setid) => `https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=${setid}`;
export const SOURCES = {
    [N]: { key: N, kind: 'fda-pi', text: 'NULOJIX (belatacept) for injection, Bristol-Myers Squibb Company. Prescribing information, DailyMed set ID c16ac648-d5d2-9f7d-8637-e2328572754e, SPL effective 2021-07-28.', url: dm('c16ac648-d5d2-9f7d-8637-e2328572754e') },
    [S]: { key: S, kind: 'fda-pi', text: 'SIMULECT (basiliximab) for injection, Novartis Pharmaceuticals Corporation. Prescribing information, DailyMed set ID 1af01887-b69d-444b-91ed-ebfe12784440, SPL effective 2026-10-26.', url: dm('1af01887-b69d-444b-91ed-ebfe12784440'), revised: 'August 2020' },
    [T]: { key: T, kind: 'fda-pi', text: 'THYMOGLOBULIN (anti-thymocyte globulin [rabbit]) for injection, Genzyme Corporation (a Sanofi company). Prescribing information, DailyMed set ID bbd8ab99-552e-4b81-aca4-6b0c7af8b9ae, SPL effective 2026-06-24.', url: dm('bbd8ab99-552e-4b81-aca4-6b0c7af8b9ae') },
    [G]: { key: G, kind: 'fda-pi', text: 'ATGAM (lymphocyte immune globulin, anti-thymocyte globulin [equine]) sterile solution, Pharmacia & Upjohn Company LLC (Pfizer). Prescribing information, DailyMed set ID bd545ba1-2366-4df1-bd67-10dfd7632b54, SPL effective 2024-06-18.', url: dm('bd545ba1-2366-4df1-bd67-10dfd7632b54') },
};
// Classes: belatacept and basiliximab each stand alone; the two antithymocyte globulins share only the lines both labels support.
export const CLASSES = [
    {
        id: 'tx-costimulation-blocker', name: 'Costimulation blocker',
        mechanism: c('Selective T-cell costimulation blocker, given to prevent rejection in adult kidney transplant recipients.', N),
        effects: [
            { tox: 'tx-malignancy', rank: 1, boxed: true, cite: [N] },
            { tox: 'tx-serious-infection', rank: 2, boxed: true, cite: [N] },
        ],
    },
    {
        id: 'tx-il2-receptor-antagonist', name: 'IL-2 receptor antagonist',
        mechanism: c('Interleukin-2 receptor antagonist, used to prevent acute rejection in kidney transplant recipients.', S),
        effects: [
            { tox: 'tx-infusion-anaphylaxis', cite: [S] },
            { tox: 'tx-serious-infection', cite: [S] },
            { tox: 'tx-malignancy', cite: [S] },
        ],
    },
    {
        id: 'tx-lymphocyte-depleting-antibody', name: 'Lymphocyte-depleting antibodies',
        mechanism: c('Polyclonal antibody from animals immunized with human thymus cells, given with other immunosuppressants.', T, G),
        effects: [
            { tox: 'tx-infusion-anaphylaxis', cite: [T, G] },
            { tox: 'tx-serious-infection', cite: [T, G] },
            { tox: 'tx-cytopenia', cite: [T, G] },
        ],
    },
];
// ------------------------------------------------------------------ belatacept
const belatacept = {
    id: 'belatacept', generic: 'Belatacept', brands: ['Nulojix'], aliases: ['belatacept'], editorAliases: ['bela'],
    classIds: ['tx-costimulation-blocker'], cancers: ['kidney'], label: N, tier: 'full',
    mechanism: c('Blocks CD80 and CD86 on antigen-presenting cells, so T cells lose the CD28 signal that activates them.', N),
    boxedWarning: [
        c('PTLD: increased risk of post-transplant lymphoproliferative disorder, predominantly involving the central nervous system', N),
        c('EBV serostatus: recipients without EBV immunity are at particular risk; use only in EBV-seropositive patients, never if EBV seronegative or serostatus unknown', N),
        c('Serious infection: increased susceptibility to infection may result from immunosuppression', N),
        c('Malignancy: possible development of malignancies may result from immunosuppression', N),
        c('Liver transplant: use in liver transplant patients is not recommended because of an increased risk of graft loss and death', N),
        c('Prescribing: only physicians experienced in immunosuppression and kidney transplant care; manage in facilities with adequate laboratory and supportive resources', N),
    ],
    interactions: [
        c('Avoid together: live vaccines should be avoided (intranasal influenza, measles, mumps, rubella, oral polio, BCG, yellow fever, varicella, TY21a typhoid)', N),
        c('Anti-thymocyte globulin: postmarketing, in de novo kidney recipients, some with other risk factors, renal allograft venous thrombosis followed ATG given with the first belatacept dose', N),
        c('Cell-depleting induction: if ATG or any other is given with belatacept, the label suggests a twelve-hour interval between the two administrations', N),
        c('Mycophenolate: cyclosporine lowers mycophenolic acid exposure and belatacept does not; monitor for a dose change when switching: higher after belatacept to cyclosporine, lower the other way', N),
    ],
    alsoOnLabel: [
        c('New neurologic signs: consider PTLD and PML with new or worsening neurological, cognitive or behavioral signs; PML is diagnosed by brain imaging, CSF JC virus PCR or biopsy', N),
        c('Rejection: postmarketing, early corticosteroid minimization (Day 3 to Week 6) raised rejection, mostly Grade III with 4 to 6 HLA mismatches; graft loss followed Grade III in some', N),
        c('PML: if diagnosed, the label says consideration should be given to reduction or withdrawal of immunosuppression, taking into account the risk to the allograft', N),
        c('BK nephropathy: PVAN is associated with serious outcomes, including deteriorating renal function and graft loss; the label says to consider reductions in immunosuppression, weighing graft risk', N),
        c('Infusion reactions: no anaphylaxis in Studies 1 and 2; milder ones within one hour in 5%, mostly hypotension and hypertension; one postmarketing anaphylaxis followed a two-month interruption', N),
        c('Rejection after conversion: stable recipients at least six months post-transplant switched from a calcineurin inhibitor had more rejection, mostly in year one; not recommended unless CNI intolerant', N),
        c('PTLD risk factors: CMV infection and T cell-depleting therapy; EBV-positive, CMV-negative patients may be at increased risk; the clinical significance of CMV serology remains to be determined', N),
        c('Prophylaxis: the label recommends CMV prophylaxis for at least 3 months after transplant, Pneumocystis prophylaxis after transplant, and latent TB testing and treatment before starting', N),
        c('Liver transplant: in a liver trial with more frequent dosing, graft loss and death were higher than on tacrolimus; two PTLD (one fatal) and one fatal PML occurred among 147 randomized to belatacept', N),
        c('Overdose: higher cumulative or more frequent dosing in kidney patients gave more CNS adverse reactions; the label advises monitoring for adverse reactions and symptomatic treatment', N),
        c('Contraindication: EBV-seronegative recipients or those with unknown EBV serostatus, because of PTLD risk', N),
        c('Pregnancy: risk data insufficient; not teratogenic in rats and rabbits at 16 and 19 times human exposure; infections in rat dams were associated with increased pup mortality, at 3 times human exposure', N),
        c("Breastfeeding: no human milk data; excreted in rat milk, so possibly in human milk; infant gut absorption not studied; weigh breastfeeding benefits against the mother's need and risks to the child", N),
    ],
    effects: [
        {
            tox: 'tx-malignancy', cite: [N],
            quirk: c('PTLD and cancer: PTLD is mostly CNS; pooled across regimens it was 9-fold higher in EBV-seronegative or unknown-status recipients; consider it with new neurologic signs; skin cancer also rises.', N),
        },
        {
            tox: 'tx-serious-infection', cite: [N],
            quirk: c('Serious infection: bacterial, viral, fungal and protozoal, including opportunistic and fatal; PML, BK nephropathy with graft loss, TB and CNS infections are named; consider PML with new neuro signs.', N),
        },
    ],
};
// ------------------------------------------------------------------ basiliximab
const basiliximab = {
    id: 'basiliximab', generic: 'Basiliximab', brands: ['Simulect'], aliases: ['basiliximab'],
    classIds: ['tx-il2-receptor-antagonist'], cancers: ['kidney'], label: S, tier: 'full',
    mechanism: c('Blocks the IL-2 receptor alpha chain on activated T cells, so IL-2 cannot activate them.', S),
    boxedWarning: [
        c('Prescribing: only physicians experienced in immunosuppression and organ transplant care; manage in facilities with adequate laboratory and supportive resources', S),
    ],
    interactions: [
        c('Azathioprine or mycophenolate: with cyclosporine and steroids, lowered its clearance by an average 22% and 51%, respectively; no dose adjustment is needed when Simulect is added to triple therapy', S),
    ],
    alsoOnLabel: [
        c('Re-exposure: use extreme caution with a later course; patients whose other immunosuppression was stopped early after the first course (abandoned transplant, early graft loss) may be at particular risk', S),
        c('Reported after approval: capillary leak syndrome and cytokine release syndrome, with severe hypersensitivity reactions', S),
        c('Blockade: the duration of clinically relevant IL-2 receptor blockade is not known; saturation lasted 36 days (mean) with cyclosporine and steroids, longer with azathioprine or mycophenolate added', S),
        c('Overdose: no maximum tolerated dose found; single doses up to 60 mg and divided doses up to 120 mg over 3-5 days in adult kidney recipients caused no serious adverse events', S),
        c('Contraindication: known hypersensitivity to basiliximab or any component of the formulation', S),
        c('Pregnancy and nursing: use in pregnancy only if benefit justifies risk; contraception before, during and 4 months after; decide whether to stop nursing or the drug', S),
        c('Long-term survival: Study 1 five-year patient survival was 87% with Simulect vs 95% with placebo, cause unknown, with no rise in malignancy or infection deaths; equal at 90% in Study 2', S),
    ],
    effects: [
        {
            tox: 'tx-infusion-anaphylaxis',
            timing: c('Onset within 24 hours (first or repeat course), for severe acute hypersensitivity reactions including anaphylaxis, seen on initial exposure or on re-exposure after several months.', S),
            quirk: c('Hypersensitivity: severe reactions including anaphylaxis (hypotension, bronchospasm, pulmonary edema, respiratory failure, urticaria); stop it permanently; keep anaphylaxis treatment ready.', S),
        },
        {
            tox: 'tx-serious-infection', cite: [S],
            quirk: c('Infection: immunosuppressed patients are at increased risk; overall serious infection matched placebo, but serious CMV infection was higher with triple therapy (11% vs 5% on placebo).', S),
        },
        {
            tox: 'tx-malignancy', cite: [S],
            quirk: c('Lymphoproliferative disorder: not higher than placebo and under 1% with Simulect; immunosuppressed patients are at increased risk and should be monitored.', S),
        },
    ],
};
// ------------------------------------------------------------------ antithymocyte globulin, rabbit
const atgRabbit = {
    id: 'antithymocyte-globulin-rabbit', generic: 'Antithymocyte globulin, rabbit', brands: ['Thymoglobulin'],
    aliases: ['antithymocyte globulin', 'anti-thymocyte globulin', 'anti-thymocyte globulin (rabbit)'], editorAliases: ['rATG', 'ATG', 'thymo'],
    unpinnedNames: ['ATG'],
    classIds: ['tx-lymphocyte-depleting-antibody'], cancers: ['kidney'], label: T, tier: 'full',
    mechanism: c('Rabbit antibodies against T-cell markers deplete T cells, usually within a day; exact mechanism not fully understood.', T),
    interactions: [
        c('Avoid together: live vaccines; immunization with attenuated live vaccines is not recommended after recent treatment, because its safety has not been studied', T),
    ],
    alsoOnLabel: [
        c('Thrombotic microangiopathy: occurred in kidney transplant patients, particularly when concomitantly administered with calcineurin inhibitors', T),
        c('Serum sickness: 6 of 405 kidney prophylaxis patients in completed studies; 2% in the rejection-treatment trial, none on the comparator', T),
        c('Anaphylactic shock: reported in 2 of 405 kidney prophylaxis patients across completed studies', T),
        c('Not for antibody-mediated rejection: the label says it has not been shown effective for antibody-mediated (humoral) rejection', T),
        c('Overdose: may cause leukopenia (including lymphopenia and neutropenia) or thrombocytopenia, which the label says can be managed with dose reduction', T),
        c('Contraindication: history of allergy or anaphylaxis to rabbit proteins or any excipient, or active acute or chronic infection that contraindicates more immunosuppression', T),
        c('Immunosuppression: to prevent over-immunosuppression, the label says physicians may wish to decrease the dose of the maintenance regimen during Thymoglobulin use', T),
        c('Antiviral prophylaxis: recommended for CMV-seropositive recipients and for CMV-seronegative recipients of a kidney from a CMV-seropositive donor', T),
        c('Reported after approval: hepatic dysfunction and failure, hyperbilirubinemia, febrile neutropenia, coagulopathy, disseminated intravascular coagulation and hemolytic anemia', T),
        c('Re-treatment: anti-rabbit antibodies developed in 68% in the rejection trial; the label recommends monitoring lymphocyte counts to confirm T-cell depletion on re-treatment', T),
        c('Pregnancy and nursing: give in pregnancy only if benefit outweighs risk; stop breastfeeding during therapy; effective contraception during and for at least 3 months after', T),
        c('Tests: may interfere with rabbit antibody-based immunoassays and with cross-match or panel-reactive antibody cytotoxicity assays', T),
    ],
    effects: [
        {
            tox: 'tx-infusion-anaphylaxis',
            timing: c('During or within 24 hours of an infusion, reactions considered possibly infusion-related were listed in the kidney prophylaxis trial (141 on Thymoglobulin).', T),
            quirk: c('Infusion reactions: fatal anaphylaxis and severe CRS reported; possible signs fever, chills, rash, hypotension, tachycardia, dyspnea, chest pain; stop the infusion at once, give supportive care.', T),
        },
        {
            tox: 'tx-serious-infection', cite: [T],
            quirk: c('Infection: bacterial, fungal, viral and protozoal infections, reactivation (especially CMV) and sepsis reported with other immunosuppressants; these infections can be fatal; treat when indicated.', T),
        },
        {
            tox: 'tx-cytopenia', cite: [T],
            quirk: c('Cytopenias: anemia, neutropenia, thrombocytopenia; label says reduce the dose by one-half at WBC 2,000-3,000 cells/mm3 or platelets 50,000-75,000 cells/mm3; consider stopping below 2,000 or 50,000.', T),
        },
        {
            tox: 'tx-hyperkalemia', cite: [T],
            quirk: c('Hyperkalemia: among the most common laboratory abnormalities in the kidney prophylaxis trial (57% vs 51% on basiliximab).', T),
        },
        {
            tox: 'tx-malignancy', cite: [T],
            quirk: c('Malignancy: fatal malignancies reported; immunosuppressants including this one may raise the risk of lymphoma or lymphoproliferative disorders.', T),
        },
    ],
};
// ------------------------------------------------------------------ antithymocyte globulin, equine
const atgEquine = {
    id: 'antithymocyte-globulin-equine', generic: 'Antithymocyte globulin, equine', brands: ['Atgam'],
    aliases: ['lymphocyte immune globulin', 'anti-thymocyte globulin (equine)'], editorAliases: ['eATG', 'ATG'],
    unpinnedNames: ['antithymocyte globulin', 'anti-thymocyte globulin', 'ATG'],
    classIds: ['tx-lymphocyte-depleting-antibody'], cancers: ['kidney'], label: G, tier: 'full',
    mechanism: c('Mechanism not determined; published data indicate it mainly depletes circulating lymphocytes, mostly T cells.', G),
    boxedWarning: [
        c('Anaphylaxis: ATGAM can cause potentially life-threatening anaphylaxis when injected intravenously; monitor during infusion and for at least 24 hours after', G),
    ],
    interactions: [
        c('Avoid together: live vaccines; do not give to patients about to receive, receiving or after treatment, because of the risk of uncontrolled viral replication', G),
        c('Corticosteroids and other immunosuppressants: infections such as septicemia may be masked and atypical; when their doses are reduced, monitor, as previously masked reactions to ATGAM may appear', G),
    ],
    alsoOnLabel: [
        c('Cytokine release syndrome: can be fatal; signs include fever, chills, headache, chest pain, hypotension, dyspnea, tachypnea and edema', G),
        c('Infusion-associated reactions: serious ones reported, with generalized rash, tachycardia, dyspnea and hypotension', G),
        c('Serum sickness: delayed reaction, 0.6% of 476 pooled trial patients; in one aplastic anemia study all had it within 6 to 18 days of starting; skin testing does not predict it', G),
        c('Anaphylaxis care: signs are generalized rash, tachycardia, dyspnea, hypotension; keep epinephrine and emergency equipment ready; a negative skin test does not rule out anaphylaxis', G),
        c('Liver and kidney tests: abnormal liver and renal function results in aplastic anemia and other hematologic patients; monitor as clinically indicated', G),
        c('Other significant reactions: the label names arthralgia, edema and bradycardia among the most clinically significant adverse reactions', G),
        c('Overdose: one kidney recipient given a single daily dose seven times the recommended total had no signs of acute intoxication; the label still recommends close monitoring', G),
        c('Contraindication: anaphylaxis during prior ATGAM or any other equine gamma globulin', G),
        c('Pregnancy and nursing: use in pregnancy only if benefit justifies risk; decide whether to stop breastfeeding or the drug; contraception during and for at least 10 weeks after, for men too', G),
        c('Reported after approval: acute renal failure, kidney rupture, gastrointestinal perforation and hemorrhage, deep vein thrombosis, vasculitis, congestive heart failure, hemolysis and pancytopenia', G),
        c('Infectious agents: made from equine and human blood components, it may carry a risk of transmitting infectious agents, including the Creutzfeldt-Jakob agent', G),
    ],
    effects: [
        {
            tox: 'tx-infusion-anaphylaxis', boxed: true, rank: 1, cite: [G],
            quirk: c('Anaphylaxis: potentially life-threatening when injected intravenously; monitor during infusion and for at least 24 hours after; discontinue it if anaphylaxis occurs.', G),
        },
        {
            tox: 'tx-serious-infection', cite: [G],
            quirk: c('Infection: opportunistic viral, bacterial and fungal infections and sepsis reported; viral reactivation (CMV, EBV, HSV) is more likely; monitor carefully for concurrent infection.', G),
        },
        {
            tox: 'tx-cytopenia', cite: [G],
            quirk: c('Low counts: thrombocytopenia, neutropenia and leukopenia; consider platelet transfusion, and consider stopping if thrombocytopenia or neutropenia is severe and unremitting.', G),
        },
    ],
};
export const DRUGS = [belatacept, basiliximab, atgRabbit, atgEquine];
