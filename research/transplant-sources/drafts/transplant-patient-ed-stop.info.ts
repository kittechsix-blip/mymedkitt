// DRAFT Stop page for the Transplant Patient in the ED consult. Assembler registers it in INFO_PAGES.
// Every item restates a sentence already on the consult's pages; wording strength is copied, not raised.
import type { InfoPage } from '../../data/info-pages.js';

const PAGE: InfoPage = {
  id: 'transplant-patient-ed-stop',
  title: 'Transplant Patient in the ED — Do NOT',
  subtitle: 'Critical pitfalls to avoid',
  sections: [
    {
      heading: '🛑 Do NOT change, hold or stop an immunosuppressant before calling the transplant team',
      body: `Editor note: call the transplant team before changing, holding or stopping any immunosuppressant. Heart recipients, intercurrent-surgery section (ISHLT 2023, I C): "Immunosuppression should not be discontinued or modified without discussion with the HT team." [1] [Drug interactions: before you give a drug](#/node/tpe-heart-drugs). For fever with low neutrophils the page's own note is: "Editor note: give the Sepsis consult's empiric antibiotics without delay; the febrile neutropenia pathway's risk score is written for cancer patients; call the transplant team." [Fever with low neutrophils](#/node/tpe-cytopenia-fever).`,
    },
    {
      heading: '🛑 Do NOT use potassium-sparing diuretics in a recipient on cyclosporine',
      body: `Neoral, Gengraf and Sandimmune labels: "potassium-sparing diuretics should not be used". The Prograf label words it differently (it asks for "careful consideration" before potassium-sparing diuretics, ACE inhibitors and ARBs), so this item is for cyclosporine only. [6] [7] [8] [9] [Calcium-channel blockers and potassium-raising agents](#/node/tpe-cni-htn-agents).`,
    },
    {
      heading: '🛑 Do NOT use tacrolimus and cyclosporine together',
      body: `Prograf label: not used simultaneously with cyclosporine; one "should be discontinued at least 24 hours before initiating the other" (call the transplant team first). [6] [Before you give a drug: what raises or lowers the level](#/node/tpe-cni-drugs).`,
    },
    {
      heading: '🛑 Do NOT use nifedipine with cyclosporine in a patient who develops gingival hyperplasia',
      body: `Cyclosporine labels (Neoral, Gengraf, Sandimmune): nifedipine "should be avoided in patients in whom gingival hyperplasia develops". None of the six tacrolimus and cyclosporine labels read says to avoid nicardipine, verapamil or diltiazem; they list them as raising levels. [6] [7] [8] [9] [Calcium-channel blockers and potassium-raising agents](#/node/tpe-cni-htn-agents).`,
    },
    {
      heading: '🛑 Do NOT treat CMV disease with oral ganciclovir, acyclovir or valacyclovir',
      body: `CMV consensus 2025: oral ganciclovir, acyclovir and valacyclovir are not recommended for treatment (strong, moderate). [4] [Drug safety and kidney dosing](#/node/tpe-cmv-safety). First-line drugs and route: [Treatment](#/node/tpe-cmv-treat).`,
    },
    {
      heading: '🛑 Do NOT change antivirals in the first 2 weeks of CMV treatment if the patient is clinically improving',
      body: `CMV consensus 2025, treatment of CMV disease: changing antivirals is not recommended in the first 2 weeks if the patient is clinically improving, even with unchanged or rising DNA (strong, moderate); DNA commonly rises in week 1. [4] [Drug safety and kidney dosing](#/node/tpe-cmv-safety).`,
    },
    {
      heading: '🛑 Do NOT send culture of blood, urine, stool or oral secretions, or serology, to diagnose active CMV',
      body: `CMV consensus 2025: viral culture of blood, urine, stool or oral secretions is not recommended (strong, high); QNAT on urine, stool or oral secretions is not recommended (strong, low); serology has no role in diagnosing active CMV. The recommended test is CMV QNAT (PCR) on plasma or whole blood (strong, high). Blood CMV DNA can be low or undetectable in gastrointestinal disease and, rarely, in lung recipients with CMV pneumonia. [4] [Work-up](#/node/tpe-cmv-workup).`,
    },
    {
      heading: '🛑 Do NOT use cidofovir or leflunomide to treat BK, or fluoroquinolones or statins to prevent or treat BK, in kidney recipients',
      body: `BK consensus 2024, kidney recipients: cidofovir and leflunomide are not recommended as treatment for BK (strong, B); fluoroquinolones and statins are not recommended to prevent or treat BK (strong, A). The guideline does not address their use for other indications. [5] [BK: treatment, and what is not recommended](#/node/tpe-bk-team).`,
    },
    {
      heading: '🛑 Do NOT use peripheral blood biomarkers developed as a noninvasive alternative to biopsy, alone, to diagnose or exclude rejection in an adult liver recipient',
      body: `AASLD/AST 2025, liver recipients (Question 16): peripheral blood biomarkers alone should not be used to diagnose or exclude T-cell-mediated rejection and other forms of allograft injury (Strong, Level 4). [2] [Liver transplant recipient](#/node/tpe-liver).`,
    },
  ],
  citations: [
    { num: 1, text: 'Velleca A, Shullo MA, Dhital K, et al. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015' },
    { num: 2, text: 'Te H, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and management of graft-related complications. Liver Transpl. 2026;32(3):444-490 (online 2025-08-22). doi:10.1097/LVT.0000000000000715' },
    { num: 3, text: 'KDIGO Transplant Work Group. KDIGO clinical practice guideline for the care of kidney transplant recipients. Am J Transplant. 2009;9(Suppl 3):S1-S155. doi:10.1111/j.1600-6143.2009.02834.x.' },
    { num: 4, text: 'Kotton CN, Kumar D, Manuel O, et al.; The Transplantation Society International CMV Consensus Group. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374' },
    { num: 5, text: 'Kotton CN, Kamar N, Wojciechowski D, et al. The Second International Consensus Guidelines on the Management of BK Polyomavirus in Kidney Transplantation. Transplantation. 2024;108(9):1834-1866. doi:10.1097/TP.0000000000004976' },
    { num: 6, text: 'PROGRAF (tacrolimus) capsules, injection and granules for oral suspension. FDA prescribing information, SPL effective 2023-08-25. DailyMed set ID 7f667de1-9dfa-4bd6-8ba0-15ee2d78873b.' },
    { num: 7, text: 'NEORAL (cyclosporine capsules and oral solution, USP, MODIFIED). FDA prescribing information, SPL effective 2026-08-10. DailyMed set ID 94461af3-11f1-4670-95d4-2965b9538ae3.' },
    { num: 8, text: 'GENGRAF (cyclosporine capsules, USP [MODIFIED]). FDA prescribing information, SPL effective 2024-08-21. DailyMed set ID e896cbfe-4745-4088-82a3-8dc10b75c41f.' },
    { num: 9, text: 'SANDIMMUNE (cyclosporine capsules and injection). FDA prescribing information, SPL effective 2026-07-10. DailyMed set ID 5e5926a7-1de0-4b54-a5c0-286b6200ff82.' },
  ],
};

export default PAGE;
