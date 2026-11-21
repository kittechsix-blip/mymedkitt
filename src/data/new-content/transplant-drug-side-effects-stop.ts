// (assembled verbatim from research/transplant-sources/drafts/transplant-drug-side-effects-stop.info.ts) Stop page for the Transplant Drugs Side-effects consult. Assembler registers it in INFO_PAGES.
// Every item restates a line on a drug card, which paraphrases that drug's FDA label; wording strength is copied, not raised. No doses.
import type { InfoPage } from '../info-pages.js';

const R = '#/tree/transplant-drug-side-effects/node/tdse-drug-';
const NOTE = 'Editor note: before adding or stopping any drug, ask the transplant team or a transplant pharmacist whether it changes the immunosuppressant level.';

const PAGE: InfoPage = {
  id: 'transplant-drug-side-effects-stop',
  title: 'Transplant Drugs Side-effects — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: '🛑 Do NOT give sirolimus with voriconazole',
      body: `The Vfend label says sirolimus is contraindicated with voriconazole: in healthy men sirolimus Cmax rose about 7-fold and AUC about 11-fold. The sirolimus label says to avoid strong CYP3A4/P-gp inhibitors such as voriconazole. [1] [2] Cards: [Voriconazole](${R}voriconazole), [Sirolimus](${R}sirolimus).`,
    },
    {
      heading: '🛑 Do NOT give sirolimus with posaconazole',
      body: `The Noxafil (posaconazole) label says it is contraindicated with sirolimus (sirolimus rises about 9-fold); the sirolimus label does not name posaconazole. [3] [2] Cards: [Posaconazole](${R}posaconazole), [Sirolimus](${R}sirolimus).`,
    },
    {
      heading: '🛑 Do NOT take grapefruit or grapefruit juice with tacrolimus, cyclosporine or sirolimus, or with everolimus (Zortress) given with cyclosporine or tacrolimus',
      body: `Each label's own verb: Prograf, Astagraf XL and Envarsus XR (tacrolimus): avoid grapefruit [4] [5] [6]. Neoral, Gengraf and Sandimmune (cyclosporine): grapefruit juice should be avoided [7] [8] [9]. Sirolimus: grapefruit juice must not be taken with sirolimus [2]. Zortress: grapefruit and grapefruit juice are to be avoided with concomitant use of Zortress and cyclosporine or tacrolimus [10]. Cards: [Tacrolimus](${R}tacrolimus), [Cyclosporine, modified](${R}cyclosporine-modified), [Sirolimus](${R}sirolimus), [Everolimus](${R}everolimus-zortress).`,
    },
    {
      heading: '🛑 Do NOT use potassium-sparing diuretics in a patient on cyclosporine',
      body: `Cyclosporine labels (Neoral, Gengraf, Sandimmune): "potassium-sparing diuretics should not be used". The Prograf card words its own potassium-sparing diuretic line differently: the label says to consider carefully before use. [7] [8] [9] [4] Cards: [Cyclosporine, modified](${R}cyclosporine-modified), [Cyclosporine, non-modified](${R}cyclosporine-non-modified). Management: [Calcium-channel blockers and potassium-raising agents](#/tree/transplant-patient-ed/node/tpe-cni-htn-agents).`,
    },
    {
      heading: '🛑 Do NOT give live vaccines to a patient on these immunosuppressants',
      body: `Each label's own word, as the cards give it: tacrolimus (Prograf, Astagraf XL, Envarsus XR) [4] [5] [6], cyclosporine [7] [8] [9] and belatacept [13]: avoid live vaccines; sirolimus [2] and Zortress [10]: live vaccines should be avoided; mycophenolate mofetil [11] and mycophenolic acid [12]: avoid during treatment; antithymocyte globulin, rabbit (Thymoglobulin) [14]: immunization with attenuated live vaccines is not recommended for patients who have recently received it; Atgam [15]: do not give live vaccines to patients about to receive, receiving or after treatment; methylprednisolone [16]: live or live attenuated vaccines are contraindicated on immunosuppressive doses. Cards: [Tacrolimus](${R}tacrolimus), [Sirolimus](${R}sirolimus), [Methylprednisolone](${R}methylprednisolone), [Mycophenolate mofetil](${R}mycophenolate-mofetil), [Belatacept](${R}belatacept), [Antithymocyte globulin, rabbit](${R}antithymocyte-globulin-rabbit), [Antithymocyte globulin, equine](${R}antithymocyte-globulin-equine).`,
    },
    {
      heading: '🛑 Do NOT give methylene blue for dapsone-induced methemoglobinemia in fully expressed G6PD deficiency',
      body: `Dapsone label, as the card words it: in dapsone overdose, methylene blue given slowly IV is the treatment of choice for methemoglobin-induced depression, convulsions or severe cyanosis in normal and methemoglobin reductase deficient patients; its reduction depends on G6PD, and the label says it should not be given to fully expressed G6PD deficient patients. [17] Card: [Dapsone](${R}dapsone).`,
    },
    {
      heading: '🛑 Do NOT give Solu-Medrol intrathecally',
      body: `Solu-Medrol label: intrathecal administration is a contraindication, because severe medical events have been reported. [16] Card: [Methylprednisolone](${R}methylprednisolone).`,
    },
    {
      heading: '🛑 Do NOT give voriconazole with rifampin, rifabutin, carbamazepine, long-acting barbiturates or St John’s wort',
      body: `The Vfend label contraindicates the combination with each. Rifampin and St John’s wort significantly lower voriconazole levels; rifabutin is contraindicated both ways (it significantly lowers voriconazole and voriconazole significantly raises rifabutin); carbamazepine and the long-acting barbiturates (phenobarbital, mephobarbital) were not studied but are likely to cause a significant reduction in voriconazole. This is not a reason to stop the other drug without advice. ${NOTE} [1] Card: [Voriconazole](${R}voriconazole).`,
    },
    {
      heading: '🛑 Do NOT give posaconazole with atorvastatin, lovastatin or simvastatin',
      body: `The Noxafil label contraindicates the combination, because raised statin levels can cause rhabdomyolysis. This is not a reason to stop the statin without advice. ${NOTE} [3] Card: [Posaconazole](${R}posaconazole).`,
    },
    {
      heading: '🛑 Do NOT give trimethoprim-sulfamethoxazole with dofetilide',
      body: `The Bactrim label contraindicates concurrent use with dofetilide; trimethoprim raises dofetilide levels, with serious ventricular arrhythmias including torsades de pointes. This is not a reason to stop the other drug without advice. ${NOTE} [18] Card: [Sulfamethoxazole-trimethoprim](${R}sulfamethoxazole-trimethoprim).`,
    },
  ],
  citations: [
    { num: 1, text: 'VFEND (voriconazole) for injection, tablets and for oral suspension, Pfizer Laboratories Div Pfizer Inc. Prescribing information, DailyMed set ID ce3ef5cf-3087-4d92-9d94-9eb8287228db, SPL effective 2026-02-26. Label revised: 1/2026. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=ce3ef5cf-3087-4d92-9d94-9eb8287228db' },
    { num: 2, text: 'SIROLIMUS tablets (sugar-coated), Mylan Pharmaceuticals Inc. Prescribing information, DailyMed set ID 5908cd1a-fc5a-462f-99ed-1d8983e253c9, SPL effective 2026-03-26; SPL marketing category "NDA AUTHORIZED GENERIC". This is the authorised-generic sirolimus tablets label, not the Rapamune label: its tablets are imprinted "RAPAMUNE", its packages read "GREENSTONE BRAND sirolimus", and it names Wyeth Pharmaceutical Division of Wyeth Holdings LLC as a manufacturer. No Rapamune-branded label is on DailyMed. Label revised: Nov 2024. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5908cd1a-fc5a-462f-99ed-1d8983e253c9' },
    { num: 3, text: 'NOXAFIL (posaconazole) injection, delayed-release tablets, oral suspension and PowderMix for delayed-release oral suspension, Merck Sharp & Dohme LLC. Prescribing information, DailyMed set ID b073b082-7b57-4423-8c06-4fd4263d6f84, SPL effective 2026-02-13. Label revised: 1/2026. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b073b082-7b57-4423-8c06-4fd4263d6f84' },
    { num: 4, text: 'PROGRAF (tacrolimus) capsules, injection and granules for oral suspension, Astellas Pharma US, Inc. Prescribing information, DailyMed set ID 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b, SPL effective 2023-08-25. Label revised: 8/2023. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7f667de1-9dfa-4bd6-8ba0-15ee2d78873b' },
    { num: 5, text: 'ASTAGRAF XL (tacrolimus extended-release capsules), Astellas Pharma US, Inc. Prescribing information, DailyMed set ID 550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e, SPL effective 2026-01-14. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=550a5cd4-fbf2-4c09-b577-6bde8fcbdf6e' },
    { num: 6, text: 'ENVARSUS XR (tacrolimus extended-release tablets), Veloxis Pharmaceuticals, Inc. Prescribing information, DailyMed set ID de2315b0-6344-43ac-9aea-3e3b68d828e7, SPL effective 2025-02-26. Label revised: 4/2024. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=de2315b0-6344-43ac-9aea-3e3b68d828e7' },
    { num: 7, text: 'NEORAL (cyclosporine) soft gelatin capsules and oral solution, MODIFIED, Novartis Pharmaceuticals Corporation. Prescribing information, DailyMed set ID 94461af3-11f1-4670-95d4-2965b9538ae3, SPL effective 2026-08-10. Label revised: September 2023. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=94461af3-11f1-4670-95d4-2965b9538ae3' },
    { num: 8, text: 'GENGRAF (cyclosporine capsules, USP [MODIFIED]), AbbVie Inc. Prescribing information, DailyMed set ID e896cbfe-4745-4088-82a3-8dc10b75c41f, SPL effective 2024-08-21. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e896cbfe-4745-4088-82a3-8dc10b75c41f' },
    { num: 9, text: 'SANDIMMUNE (cyclosporine) capsules and injection, Novartis Pharmaceuticals Corporation. Prescribing information, DailyMed set ID 5e5926a7-1de0-4b54-a5c0-286b6200ff82, SPL effective 2026-07-10. Label revised: March 2026. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=5e5926a7-1de0-4b54-a5c0-286b6200ff82' },
    { num: 10, text: 'ZORTRESS (everolimus) tablets, Novartis Pharmaceuticals Corporation. Prescribing information (transplant indications), DailyMed set ID e082a024-7850-400b-a5c2-2a140612562a, SPL effective 2026-09-16. Label revised: February 2024. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=e082a024-7850-400b-a5c2-2a140612562a' },
    { num: 11, text: 'CELLCEPT (mycophenolate mofetil) capsules, tablets, oral suspension and intravenous, Genentech, Inc. Prescribing information, DailyMed set ID 37241e87-4af4-4dc3-a1aa-ea6f20d8dc40, SPL effective 2026-08-05. Label revised: 7/2026. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=37241e87-4af4-4dc3-a1aa-ea6f20d8dc40' },
    { num: 12, text: 'MYFORTIC (mycophenolic acid) delayed-release tablets, Novartis Pharmaceuticals Corporation. Prescribing information, DailyMed set ID eed26501-890d-4ff6-88e7-6dbea4726e53, SPL effective 2026-07-29. Label revised: 07/2026. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=eed26501-890d-4ff6-88e7-6dbea4726e53' },
    { num: 13, text: 'NULOJIX (belatacept) for injection, Bristol-Myers Squibb Company. Prescribing information, DailyMed set ID c16ac648-d5d2-9f7d-8637-e2328572754e, SPL effective 2021-07-28. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=c16ac648-d5d2-9f7d-8637-e2328572754e' },
    { num: 14, text: 'THYMOGLOBULIN (anti-thymocyte globulin [rabbit]) for injection, Genzyme Corporation (a Sanofi company). Prescribing information, DailyMed set ID bbd8ab99-552e-4b81-aca4-6b0c7af8b9ae, SPL effective 2026-06-24. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=bbd8ab99-552e-4b81-aca4-6b0c7af8b9ae' },
    { num: 15, text: 'ATGAM (lymphocyte immune globulin, anti-thymocyte globulin [equine]) sterile solution, Pharmacia & Upjohn Company LLC (Pfizer). Prescribing information, DailyMed set ID bd545ba1-2366-4df1-bd67-10dfd7632b54, SPL effective 2024-06-18. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=bd545ba1-2366-4df1-bd67-10dfd7632b54' },
    { num: 16, text: 'SOLU-MEDROL (methylprednisolone sodium succinate) sterile powder for intravenous or intramuscular use, Pharmacia & Upjohn Company LLC, a subsidiary of Pfizer Inc. Prescribing information, DailyMed set ID 7271310c-7764-4812-aa30-a5e90987c7a9, SPL effective 2026-06-25. Label revised: November 2025. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=7271310c-7764-4812-aa30-a5e90987c7a9' },
    { num: 17, text: 'Dapsone tablets USP (made by Taro Pharmaceutical Industries, distributed by Taro Pharmaceuticals U.S.A., Inc.; DailyMed labeler Sun Pharmaceutical Industries, Inc.). Prescribing information, DailyMed set ID cb312185-b9f1-4fa4-9481-bcf5d9bb3edf, SPL effective 2026-03-17. Label revised: December 2018. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=cb312185-b9f1-4fa4-9481-bcf5d9bb3edf' },
    { num: 18, text: 'BACTRIM (sulfamethoxazole and trimethoprim) tablets, Sun Pharmaceutical Industries, Inc. Prescribing information, DailyMed set ID f59d0c04-9c66-4d53-a0e1-cb55570deb62, SPL effective 2024-12-30. Label revised: Rev. 08, December 2024. https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=f59d0c04-9c66-4d53-a0e1-cb55570deb62' },
  ],
};

export const TDSE_STOP_PAGE: InfoPage = PAGE;
