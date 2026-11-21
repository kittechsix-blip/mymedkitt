// Info page draft for the Transplant Patient in the ED consult (heart). Opens from #/info/tpe-heart-interactions.
import type { InfoPage } from '../info-pages.js';

export const TPE_TPE_HEART_INTERACTIONS: InfoPage = {
  "id": "tpe-heart-interactions",
  "title": "Drug interactions and cautions in a heart recipient",
  "subtitle": "Complete Table 5 lists, seizure drugs, antibiotics, anticoagulants, IV route and etomidate",
  "sections": [
    {
      "heading": "The rule",
      "body": "\u2022 When a drug that interacts with immunosuppressants (Table 5) is added or withdrawn, the guideline calls for close monitoring of immunosuppressant levels and dose adjustment. [1]"
    },
    {
      "heading": "Drugs that raise immunosuppressant levels (Table 5)",
      "body": "\u2022 Amiodarone, diltiazem, verapamil, theophylline; also glipizide, glyburide, rilonacept. [1]\n\u2022 Clarithromycin, erythromycin, metronidazole and tinidazole; the azole antifungals (clotrimazole, fluconazole, isavuconazole, itraconazole, ketoconazole, posaconazole, voriconazole). [1]\n\u2022 Protease inhibitors (general), cobicistat, darunavir, fosamprenavir, indinavir, nelfinavir, ritonavir, saquinavir, tipranavir, letermovir; hepatitis C direct-acting antivirals (daclatasvir, glecaprevir-pibrentasvir, grazoprevir-elbasvir, ledipasvir-sofosbuvir, velpatasvir-sofosbuvir, voxilaprevir-velpatasvir-sofosbuvir); cimetidine, fluvoxamine, imatinib, nefazodone, turmeric; bitter orange and grapefruit. [1]"
    },
    {
      "heading": "Drugs that lower immunosuppressant levels (Table 5)",
      "body": "\u2022 Carbamazepine, phenytoin, fosphenytoin, phenobarbital; caspofungin, nafcillin, rifabutin, rifampin, rifapentine; efavirenz, etravirine, nevirapine; tocilizumab; bosentan; aprepitant, deferasirox, modafinil, St. John's wort, thalidomide, ticlopidine. [1]"
    },
    {
      "heading": "Other cautions",
      "body": "\u2022 Theophylline is on that list; the guideline does not link this to its use as a chronotrope. [1]\n\u2022 In the context of prophylactic antibiotics for surgical procedures (intercurrent-surgery section, Class I, C): aminoglycosides, and potent CYP inhibitors such as erythromycin and clarithromycin, are best avoided because of the risk of worsening renal dysfunction with cyclosporine or tacrolimus. [1]\n\u2022 Direct oral anticoagulants should be prescribed cautiously with a cyclosporine-based regimen and in advanced kidney disease (Class IIb, B). [1]\n\u2022 Intercurrent-surgery section (Class I, C): \"Immunosuppression should not be discontinued or modified without discussion with the HT team\", with \"it may be prudent to omit the dose of CNI on the morning of surgery\" and thereafter immunosuppression continued as normal. [1]\n\u2022 Sources differ: the heart guideline (intercurrent-surgery section, Class I, C) says \"it may be prudent to omit the dose of CNI on the morning of surgery\" [1]; the liver guideline (AASLD/AST 2025, elective surgery in liver transplant recipients) says \"It is not recommended to hold CNI for the surgery or after the surgery.\" [2]\n\u2022 Editor note: call the transplant team before changing, holding or stopping any immunosuppressant.\n\u2022 Keeping the same brand of immunosuppressant is preferable, and repeated brand substitution should be avoided (Class IIa, C). [1]\n\u2022 Intercurrent-surgery section, heart transplant recipients requiring surgery (Class I, C): if medications cannot be given orally, intravenous administration of MMF and azathioprine \"should be used, with the appropriate dose adjustments for CYA or TAC; or consider sublingual TAC\" (call the transplant team first). IV cyclosporine has been associated with an anaphylactic-type reaction and should be used carefully. The guideline's IV conversion figures differ between its table and its text, so none are given here. [1]\n\u2022 Etomidate: the surgery recommendation says its use in patients at risk for adrenal suppression and crisis should be carefully considered, with the steroid \"stress dose\" individualized to the patient's steroid history combined with type and duration of surgery (Class I, C); Table 14 says a single induction dose lowers cortisol for at least 24 hours but \"this has not been shown to be clinically relevant\". The guideline prints both. See [Adrenal Insufficiency](#/tree/adrenal-insufficiency). [1]\n\u2022 Everolimus and sirolimus (mTOR inhibitors) have been associated with more pericardial effusion, particularly when started early after transplant. [1]"
    },
    {
      "heading": "Seizure, PRES and anticonvulsants",
      "body": "\u2022 Neurologic table (Class I, C): for new seizures not due to stroke or structural brain disease the guideline says management should include reduction of CNI doses (taking into consideration the risk of inadequate immunosuppression) and correction of hypomagnesemia, if present. Encephalopathy late after transplant should prompt neurology consultation and imaging (2010 text, Class I, C; continued without change in 2023). The guideline does not reconcile this with the surgery-section line on not modifying immunosuppression without the HT team. [1]\n\u2022 PRES (Class I, C): management is gradual blood pressure reduction and withdrawal or reduction of the CNI (call the transplant team first), with substitution for an alternate immunosuppressive agent or an alternate CNI. [1]\n\u2022 Seizure drugs (narrative): \"In general, phenytoin, phenobarbital, carbamazepine, and valproic acid should be avoided and fosphenytoin should be used with caution\", because of substantial drug-drug interactions with standard post-transplant immunosuppression. [1]"
    }
  ],
  "citations": [
    {
      "num": 1,
      "text": "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015"
    },
    {
      "num": 2,
      "text": "Sharma P, et al. AASLD/AST practice guideline on adult liver transplantation: diagnosis and post-transplant management of non-graft-related complications. Liver Transpl. 2026;32(8):1157-1193 (online 2025-12-17). doi:10.1097/LVT.0000000000000785"
    }
  ]
};
