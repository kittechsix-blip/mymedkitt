// Info page draft for the Transplant Patient in the ED consult (heart). Opens from #/info/tpe-heart-rhythm-detail.
import type { InfoPage } from '../info-pages.js';

export const TPE_TPE_HEART_RHYTHM_DETAIL: InfoPage = {
  "id": "tpe-heart-rhythm-detail",
  "title": "Arrhythmia and pacing in a heart recipient: detail",
  "subtitle": "Work-up, atrial and ventricular arrhythmias, cardioversion, anticoagulation, late bradyarrhythmia and pacing indications",
  "sections": [
    {
      "heading": "Late bradyarrhythmia and pacing",
      "body": "\u2022 Syncope is one of the events the guideline says the transplant centre should be told about (Class I, C). [1]\n\u2022 Late sinus node dysfunction and AV block are often not related to acute rejection, although acute rejection may cause bradyarrhythmia. [1]\n\u2022 One report found that AV block may be more common than sinus node disease in recipients with late bradyarrhythmia. [1]\n\u2022 Late bradyarrhythmia (arrhythmia section, 2023): permanent pacing is recommended regardless of symptoms for second-degree Mobitz type II, high-grade or third-degree AV block (Class I, B), and is reasonable for marked first-degree or Mobitz type I block with symptoms attributable to it (Class IIa, C). Otherwise conventional pacemaker indications apply. [1]"
    },
    {
      "heading": "Atrial and ventricular arrhythmias",
      "body": "\u2022 Arrhythmia section narrative: atrial arrhythmias are common, \"as high as 30%\". Most are right atrial macro-reentrant arrhythmias such as atrial flutter; atrial fibrillation appears less common. The ECG appearance of the flutter cannot reliably tell its nature. [1]\n\u2022 Arrhythmia section narrative: atrial arrhythmias may be related to allograft vasculopathy (CAV), acute rejection and acute illness such as sepsis. [1]\n\u2022 Early postoperative care table (Class I, B): persistent tachyarrhythmias, atrial or ventricular, should prompt investigation of possible rejection. [1]\n\u2022 Arrhythmia section (2023, Class I, B for each): consider endomyocardial biopsy and coronary angiography in atrial or ventricular arrhythmias to exclude rejection and assess for CAV, and echocardiography to assess cardiac function. [1]\n\u2022 Early postoperative care table (Class I, B): sustained ventricular tachycardia should be evaluated with both an angiogram and an endomyocardial biopsy (the guideline abbreviates it \"SVT\" here, the same abbreviation it uses for supraventricular tachycardia elsewhere). [1]\n\u2022 Ventricular arrhythmias and aborted sudden death should prompt urgent investigation including endomyocardial biopsy and coronary angiography. Acute rejection and CAV are major risk factors for sudden death. [1]\n\u2022 Early postoperative care table (Class I, B): treatment of tachyarrhythmias should be aimed at rate control. [1]"
    },
    {
      "heading": "Cardioversion and anticoagulation",
      "body": "\u2022 Arrhythmia section (Class IIa, A): DC cardioversion should be considered for sustained atrial arrhythmias or supraventricular tachycardia. [1]\n\u2022 Arrhythmia section (Class I, C): anticoagulation should be considered in atrial fibrillation or flutter, guided by the CHA2DS2-VASc score (printed \"CHADS-VASc\"). [1]"
    }
  ],
  "citations": [
    {
      "num": 1,
      "text": "Velleca A, Shullo MA, Dhital K, Azeka E, Colvin M, DePasquale E, Farrero M, Garcia-Guereta L, Jamero G, Khush K, Lavee J, Pouch S, Patel J, Michaud CJ, Schubert S, Angelini A, Carlos L, Mirabet S, Pham M, Urschel S, Kim KH, Miyamoto S, Chih S, Daly K, Grossi P, Jennings DL, Kim IC, Lim HS. The International Society for Heart and Lung Transplantation (ISHLT) guidelines for the care of heart transplant recipients. J Heart Lung Transplant. 2023;42(5):e1-e141. doi:10.1016/j.healun.2022.10.015"
    }
  ]
};
