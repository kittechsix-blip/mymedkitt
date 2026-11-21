// DRAFT info page for the CMV page of the transplant consult. Assembler registers it in INFO_PAGES.
import type { InfoPage } from '../../data/info-pages.js';

const PAGE: InfoPage = {
  id: "tpe-cmv-resistance",
  title: "CMV resistance, second-line drugs and source conflicts",
  subtitle: "Detail behind the team node",
  sections: [
    { heading: "Suspecting resistance", body: "\u2022 Suspect resistance with prior cumulative antiviral exposure exceeding 4 weeks and clinical failure despite at least 2 weeks of appropriately dosed treatment (strong, moderate); a genotypic assay is recommended after extended exposure (minimum 4 weeks) with a suboptimal response after at least 2 weeks of optimally dosed treatment (strong, high). Persistent viral load or a rise in the first 2 weeks is not predictive of resistance. [1]\n\u2022 **Time to resistance (a different question, same guideline, not graded):** without adverse host factors or high viral loads, ganciclovir resistance usually takes more than 6 weeks of cumulative exposure to develop (median 5 months in one series). [1]" },
    { heading: "Genotyping", body: "\u2022 On specimens above 1000 IU/mL (strong, high), UL97 and UL54; mutations may sit at the end-organ site (eye, CSF, graft) and need a tissue-specific specimen. Optimization of immunosuppression and drug dosing is recommended as feasible in resistant or refractory CMV (strong, low) (call the transplant team first). [1]" },
    { heading: "Second-line drugs (the guideline gives no doses)", body: "\u2022 Maribavir or foscarnet are recommended second-line treatments when valganciclovir or ganciclovir is not tolerated (strong, low); maribavir is recommended as the principal alternative in resistance to either ganciclovir or foscarnet (strong, high); foscarnet is suggested as initial therapy in clinically unwell patients with high viral loads and suspected or proven ganciclovir resistance (weak, low), with nephrotoxicity and tolerance to be considered. (Flowchart footnote, not graded:) avoid maribavir in CNS disease or retinitis; the maribavir-ganciclovir combination is antagonistic. [1]" },
    { heading: "Foscarnet and viral load: the two sources differ", body: "\u2022 International guideline: no specific high viral-load threshold can be defined, but many experts suggested 50,000 IU/mL (4.7 log10) or more in plasma may be useful for choosing foscarnet, especially in clinically unwell patients (expert opinion). [1]\n\u2022 Liver guideline: maribavir for refractory or resistant CMV with low viral load (\u226420,000 IU, unit as printed in the source), IV foscarnet for refractory disease with high viral load (above 20,000 to 50,000 IU/mL), severe disease, or concern for poor gut absorption (Strong, Level 1). [2]" },
    { heading: "Liver guideline narrative (not graded)", body: "\u2022 \"those with resistant or refractory CMV infection with high viral loads (>20,000\u201350,000 IU/mL) require hospitalization, or failure of maribavir will require intravenous therapy, typically with foscarnet\"; management of refractory or resistant CMV should be directed by a transplant infectious diseases specialist. [2]" },
  ],
  citations: [
    { num: 1, text: "Kotton CN, Kumar D, Manuel O, Chou S, Hayden RT, Danziger-Isakov L, Asberg A, Tedesco-Silva H, Humar A; The Transplantation Society International CMV Consensus Group. The Fourth International Consensus Guidelines on the Management of Cytomegalovirus in Solid Organ Transplantation. Transplantation. 2025;109(7):1066-1110. doi:10.1097/TP.0000000000005374. https://pmc.ncbi.nlm.nih.gov/articles/PMC12180710/" },
    { num: 2, text: "Sharma P, et al. (AASLD/AST) Practice Guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications (Question 10, cytomegalovirus). Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785" },
  ],
};

export default PAGE;
