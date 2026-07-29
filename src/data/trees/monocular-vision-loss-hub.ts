// MedKitt - Monocular Vision Loss Hub
//
// EVIDENTIARY BASIS DISCLOSURE (FDA 21st Century Cures Act CDS exemption, Prong 4):
// Every recommendation node in this hub carries a citation array indexing
// MONOCULAR_VISION_LOSS_HUB_CITATIONS below. Each reference is listed with authors,
// journal, year, volume/pages, and a machine-readable identifier (DOI, PMID, or a
// resolvable URL) so a clinician can independently retrieve and review the basis for
// every recommendation. This hub is a triage/navigation aid; definitive diagnosis and
// treatment remain the responsibility of the treating clinician and consulting
// ophthalmology/neurology services.
//
// Citation audit: Louis Litt (General Counsel), 2026-07-28. Refs 6, 7, and 9 were
// corrected/replaced after source verification; refs 11-13 added to source directives
// that previously rested on tertiary summaries.
//
// Medical evidence audit: Dr. Kitlowski (CMO), 2026-07-29. All 13 prior citations
// verified against PubMed (PMIDs/volume/pages confirmed). Ref 2 updated to final
// pagination, PMIDs added to refs 7 and 8, ref 9 supersession note clarified.
// Refs 14-17 added: THEIA (Lancet Neurol 2025) and TenCRAOS (NEJM 2026) - both
// randomized trials of IV thrombolysis for CRAO were NEGATIVE vs oral aspirin, and
// TenCRAOS raised safety concerns; the 2026 GRADE meta-analysis; and the
// Endophthalmitis Vitrectomy Study (systemic antibiotics conferred no benefit).
// Added AHA-2021 "conservative therapy is unproven and possibly harmful" language,
// ACR/VF-2021 GCA glucocorticoid dosing, ONTT dosing, POCUS test characteristics,
// and monocular-vs-homonymous discrimination.

import type { DecisionNode } from '../../models/types.js';
import type { Citation } from './neurosyphilis.js';

export const MONOCULAR_VISION_LOSS_HUB_CRITICAL_ACTIONS = [
  { text: 'Sudden painless monocular vision loss is retinal ischemia or retinal detachment until proven otherwise', nodeId: 'mvl-start' },
  { text: 'Cover the GOOD eye: if the deficit persists, it is a hemifield defect from brain ischemia, not monocular vision loss', nodeId: 'mvl-exclusions' },
  { text: 'CRAO is an acute ischemic stroke: activate the stroke pathway. Ocular massage and anterior chamber paracentesis are unproven and possibly harmful', nodeId: 'mvl-retinal-stroke' },
  { text: 'Age >=50 with acute vision symptoms needs GCA screen and empiric steroids when suspicion is high', nodeId: 'mvl-gca' },
  { text: 'Painful red eye with halos, vomiting, mid-dilated pupil, or high IOP is an eye-pressure emergency: treat and call ophthalmology now', nodeId: 'mvl-glaucoma' },
  { text: 'Suspected open globe or orbital compartment syndrome: protect the globe first and do not perform pressure-based testing if rupture is possible', nodeId: 'mvl-trauma' },
];

export const MONOCULAR_VISION_LOSS_HUB_NODES: DecisionNode[] = [
  {
    id: 'mvl-start',
    type: 'info',
    module: 1,
    title: 'Monocular Vision Loss Hub - Sick Check First',
    body: '**\u26A0\uFE0F 5 DO NOT MISS:**\n1. **Central retinal artery occlusion** \u2014 sudden painless loss. Per the 2021 AHA/ASA scientific statement CRAO **is** an acute ischemic stroke of the eye, not merely a stroke \"equivalent\": it gets the stroke pathway, not an ophthalmology callback.\n2. **Giant cell arteritis** \u2014 age >50, jaw claudication, scalp tenderness, high ESR/CRP \u2192 steroids now.\n3. **Retinal detachment** \u2014 flashes, floaters, curtain; needs urgent ophthalmology.\n4. **Acute angle-closure glaucoma** \u2014 painful red eye, mid-dilated pupil, high IOP.\n5. **Optic neuritis / pituitary apoplexy** \u2014 pain on eye movement + RAPD, or sudden loss + headache + ophthalmoplegia.\n\nOpen first:\n- [Hub Steps Summary](#/info/mvl-steps)\n- [Hub Stop / Pitfalls](#/info/mvl-stop)\n\n**First 60 seconds:**\n- Confirm monocular vs binocular: cover one eye at a time, not both together. A homonymous field cut from an occipital/retrochiasmal stroke is routinely reported by the patient as \"my left eye went out.\" **If the deficit persists when the unaffected eye is covered, it is a hemifield defect (brain), not monocular loss (eye)** \u2014 that patient belongs on the [Acute Ischemic Stroke](#/tree/stroke) pathway.\n- Document last-known-normal and onset: sudden seconds/minutes vs progressive hours/days.\n- Check visual acuity in each eye, pupils/RAPD, visual fields by confrontation, EOM, external eye, fluorescein/slit lamp if available, IOP when open globe is not suspected.\n- Look for pain, red eye, trauma, headache, jaw claudication, scalp tenderness, neuro deficits, anticoagulants, diabetes, immunosuppression.\n- If stroke-like retinal ischemia is possible, do not wait for a perfect fundus exam.\n\nMonocular vision loss is a high-stakes chief complaint. Separate vascular, GCA, globe/pressure, retinal, optic nerve, infection, and trauma lanes early.',
    citation: [1, 2, 3, 5, 8, 9],
    next: 'mvl-exclusions',
    summary: 'Confirm one eye, document onset, check VA/pupils/RAPD/fields/IOP when safe, then split vascular/GCA/eye emergency lanes.',
    safetyLevel: 'critical',
  },
  {
    id: 'mvl-exclusions',
    type: 'question',
    module: 2,
    title: 'Time-Critical Exclusions - Pick the Best Fit',
    body: 'Choose the first dangerous lane. You can return after the immediate action.\n\n**Check this before you pick a lane:** if the visual deficit is still there when the *unaffected* eye is covered, it is a homonymous hemifield defect from retrochiasmal or occipital ischemia, not monocular vision loss. That patient goes to [Acute Ischemic Stroke](#/tree/stroke) and is not served by anything below.',
    options: [
      { label: 'Sudden painless persistent loss, RAPD, field cut, retinal whitening, embolic risk', description: 'CRAO/BRAO or retinal ischemic stroke', next: 'mvl-retinal-stroke', urgency: 'critical' },
      { label: 'Transient curtain/shade vision loss with full recovery', description: 'Amaurosis fugax / retinal TIA', next: 'mvl-tmvl', urgency: 'urgent' },
      { label: 'Age >=50 with headache, jaw claudication, scalp tenderness, PMR, diplopia, or visual symptoms', description: 'Giant cell arteritis', next: 'mvl-gca', urgency: 'critical' },
      { label: 'Painful red eye, halos, vomiting, mid-dilated pupil, high IOP', description: 'Acute angle-closure glaucoma', next: 'mvl-glaucoma', urgency: 'critical' },
      { label: 'Trauma, irregular pupil, extrusion, hyphema, proptosis, severe pain, decreased vision', description: 'Open globe or ocular trauma / compartment syndrome', next: 'mvl-trauma', urgency: 'critical' },
      { label: 'Flashes, floaters, curtain, vitreous hemorrhage risk, diabetic eye disease', description: 'Retinal detachment / vitreous hemorrhage', next: 'mvl-retina', urgency: 'urgent' },
      { label: 'Pain with eye movement, dyschromatopsia, subacute loss, young adult, MS/NMO/MOG risk', description: 'Optic neuritis / optic neuropathy', next: 'mvl-optic-neuritis', urgency: 'urgent' },
      { label: 'Orbital pain/swelling, ophthalmoplegia, fever, proptosis, immunocompromised', description: 'Orbital cellulitis, endophthalmitis, invasive infection', next: 'mvl-infection', urgency: 'critical' },
      { label: 'No immediate exclusion hit', description: 'Initial eye bundle and reassess', next: 'mvl-rescue' },
    ],
    citation: [1, 2, 3, 4, 5, 8, 9],
    summary: 'CRAO/TMVL, GCA, glaucoma, trauma, retinal detachment, optic neuritis, and infection are first-pass exclusions.',
    safetyLevel: 'critical',
  },
  {
    id: 'mvl-retinal-stroke',
    type: 'result',
    module: 2,
    title: 'CRAO / BRAO / Retinal Ischemic Stroke',
    body: 'Open [Central Retinal Artery Occlusion](#/tree/crao) and [Acute Ischemic Stroke](#/tree/stroke).\n\n**Next 5 minutes:** stroke-time history, visual acuity/RAPD, bedside fundus/photo if available, neuro exam, ECG, glucose, ophthalmology and stroke team. Per the 2021 AHA/ASA scientific statement, CRAO is an acute ischemic stroke and warrants the same emergent evaluation \u2014 stroke-center referral, not an outpatient eye clinic slot. If within a local thrombolysis pathway/window, involve stroke/ophthalmology immediately.\n\n**Age >=50: send ESR, CRP, and platelets on every CRAO before assuming it is embolic.** Arteritic (GCA) CRAO is treated with steroids, not an embolic pathway, and the fellow eye is at immediate risk. See [GCA lane](#/tree/monocular-vision-loss-hub/node/mvl-gca).\n\n**Same-admission vascular workup:** carotid/cervical and intracranial vessel imaging (CTA or MRA head/neck, or carotid duplex), ECG plus telemetry for atrial fibrillation, and echocardiography. Roughly a quarter of CRAO patients have acute DWI-positive cerebral infarcts, and the risk of a subsequent cerebral stroke is highest in the first days after the event, so this workup is inpatient/observation-grade, not a clinic referral.\n\n**\u26D4 Conservative "eye" maneuvers are not therapy.** The AHA statement reviewed ocular massage, anterior chamber paracentesis, topical IOP-lowering agents, carbogen/paper-bag rebreathing, and hemodilution: none is known to be better than placebo, pooled visual recovery with these strategies (7.4%) was worse than untreated natural history (17.7%), and they may be harmful. Do not let them delay stroke-pathway activation.\n\n**\u23F1\uFE0F Time and thrombolysis \u2014 current state (2026):** experimental retinal infarction becomes irreversible at roughly 90-100 minutes, and observational data plus a 2024 individual-participant meta-analysis suggested benefit from IV thrombolysis inside 4.5 hours. **Two randomized trials have since read out negative.** THEIA (Lancet Neurol 2025, n=70) found no significant visual-acuity advantage for IV alteplase over 300 mg oral aspirin within 4.5 h. TenCRAOS (NEJM 2026, n=78) found no vision-recovery advantage for tenecteplase 0.25 mg/kg over 300 mg oral aspirin (20% vs 24%) and reported more adverse events including a fatal intracranial hemorrhage. Thrombolysis for CRAO is therefore an equipoise/shared-decision decision made with the stroke team under a local protocol, **not** a default. Do not present it to the patient as established therapy.\n\n**Do not be falsely reassured by poor fundoscopy.** Early CRAO may be subtle and ED fundoscopy can miss findings.',
    recommendation: 'Treat sudden painless persistent monocular loss as retinal stroke until ophthalmology/stroke evaluation proves otherwise. Activate the stroke pathway, screen for GCA if age >=50, and do not substitute ocular massage or paracentesis for it.',
    citation: [1, 2, 6, 8, 14, 15, 17],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'mvl-tmvl',
    type: 'result',
    module: 2,
    title: 'Transient Monocular Vision Loss / Amaurosis Fugax',
    body: 'Open [Amaurosis Fugax](#/tree/amaurosis-fugax).\n\n**Next steps:** treat as retinal TIA. Confirm monocular history, screen GCA if age >=50, ECG/telemetry, vascular imaging of head/neck or carotids per local stroke pathway, brain MRI-DWI when available, secondary prevention after hemorrhage/contraindications considered.\n\n**Pitfall:** complete recovery does not make this benign. Retinal TIA can precede brain stroke, especially early after the event.',
    recommendation: 'TMVL gets urgent TIA/stroke workup, not routine outpatient eye follow-up only.',
    citation: [1, 2, 7],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'mvl-gca',
    type: 'result',
    module: 2,
    title: 'Giant Cell Arteritis Threat',
    body: '**Age >=50 plus compatible symptoms is vision-threatening disease.**\n\nOrder ESR, CRP, CBC/platelets, and ask specifically about jaw claudication, scalp tenderness, new temporal headache, PMR symptoms, diplopia, and fellow-eye symptoms. If clinical suspicion is high or vision symptoms are present, start high-dose corticosteroids immediately and involve ophthalmology/rheumatology. Do not wait for biopsy or ultrasound.\n\n**Glucocorticoid dosing (2021 ACR/Vasculitis Foundation guideline, both conditional recommendations):**\n- **Threatened or established vision loss:** pulse IV glucocorticoid is favored over high-dose oral \u2014 methylprednisolone **500-1000 mg IV daily for 3-5 days**, then transition to oral.\n- **No visual involvement:** high-dose oral is favored over moderate-dose \u2014 **prednisone 1 mg/kg/day, up to 80 mg daily**.\n\n**Timing beats confirmation.** ACR conditionally recommends obtaining temporal artery biopsy **within 2 weeks of starting** glucocorticoids rather than waiting longer; histopathologic changes persist well past that window. Steroids are started first; the biopsy is scheduled around them. An initial unilateral biopsy is preferred over bilateral unless symptoms are not clearly lateralized or the first biopsy is negative with ongoing suspicion.\n\n**The fellow eye is the reason for the urgency.** Untreated GCA threatens the contralateral eye within days to weeks, and once vision is lost it rarely returns \u2014 the treatment goal is preventing the second eye, not recovering the first.\n\n**Normal inflammatory markers do not exclude GCA.** A minority of biopsy-proven cases have normal ESR and CRP. If jaw claudication, temporal artery abnormality, or PMR features are present, treat on clinical grounds.\n\nOpen [Amaurosis Fugax](#/tree/amaurosis-fugax) or [CRAO](#/tree/crao) if the presentation is retinal ischemic.',
    recommendation: 'When GCA is plausible with visual symptoms, treat first and confirm after: pulse IV methylprednisolone 500-1000 mg/day x 3-5 days for vision loss, prednisone 1 mg/kg (max 80 mg) daily without it, biopsy within 2 weeks.',
    citation: [2, 5, 8],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'mvl-glaucoma',
    type: 'result',
    module: 2,
    title: 'Acute Angle-Closure Glaucoma',
    body: 'Open [Acute Angle-Closure Glaucoma](#/tree/aacg).\n\n**Next 5 minutes:** confirm IOP if open globe is not suspected, analgesia/antiemetic, start local protocol IOP-lowering therapy, ophthalmology emergently. Classic findings include painful red eye, halos, headache, nausea/vomiting, cloudy cornea, mid-dilated poorly reactive pupil.\n\n**Numbers that matter:** normal IOP is 10-21 mmHg; acute angle closure typically runs **50-80 mmHg**. An IOP >=40 mmHg with a rock-hard globe and the classic syndrome is enough to start therapy \u2014 do not wait on tonometry you cannot get. **Definitive treatment is laser peripheral iridotomy**, so medical therapy is a bridge, not the destination; ophthalmology gets called at the same time the drops go in. See [AACG](#/tree/aacg) for the full medication cascade and doses.\n\n**Pitfall:** do not dilate a suspicious angle-closure eye before ophthalmology guidance.',
    recommendation: 'AACG is an eye-pressure emergency. Treat and call ophthalmology now.',
    citation: [3, 9],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'mvl-trauma',
    type: 'result',
    module: 2,
    title: 'Open Globe / Ocular Trauma / Compartment',
    body: 'Open [Ocular Trauma](#/tree/ocular-trauma) or [Globe Rupture](#/tree/globe-rupture).\n\n**Next 5 minutes:** rigid shield, NPO, antiemetic/analgesia, tetanus/antibiotics per open globe pathway, avoid pressure on the eye, avoid ultrasound/tonometry if open globe possible, CT orbit when stable. If proptosis, tight lids, RAPD, high IOP, and acute vision loss after trauma/surgery, consider orbital compartment syndrome and lateral canthotomy pathway.\n\n**Orbital compartment syndrome is a clinical diagnosis made at the bedside, not on CT.** The triad is acute vision loss + proptosis with a tense, resistant orbit + RAPD, usually with IOP >40 mmHg. Retinal ischemia begins within roughly 60-120 minutes of sustained orbital pressure, so **lateral canthotomy and inferior cantholysis should not wait for imaging or for the consultant to arrive.** The one hard exception: if the globe itself may be ruptured, canthotomy and tonometry are off the table \u2014 shield and get ophthalmology.\n\n**Pitfall:** no patch and no eye pressure for suspected open globe.',
    recommendation: 'Protect the globe first. Do not perform pressure-based testing if rupture is possible.',
    citation: [3, 4, 13],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'mvl-retina',
    type: 'result',
    module: 2,
    title: 'Retinal Detachment / Vitreous Hemorrhage',
    body: 'Open [Ocular POCUS](#/tree/ocular-pocus) when ultrasound is safe.\n\n**Clues:** flashes, floaters, curtain/shadow, peripheral field loss, high myopia, prior eye surgery, trauma, diabetic retinopathy or anticoagulation. Bedside ocular ultrasound can help when the view is limited, but do not ultrasound suspected open globe. Ophthalmology timing depends on macula status, detachment suspicion, and vision threat.\n\n**What ED POCUS actually delivers** (meta-analysis of 9 studies, 1189 eyes, emergency-practitioner-performed): retinal detachment sensitivity **0.94** (95% CI 0.88-0.97) and specificity **0.94** (0.85-0.98); vitreous hemorrhage 0.90/0.92; posterior vitreous detachment only 0.67/0.89 \u2014 which is why PVD and RD get confused at the bedside. Good enough to raise your suspicion sharply, not good enough to send a symptomatic patient home on a negative scan.\n\n**Macula-on vs macula-off is the clock.** A **macula-on** (central vision still intact) detachment is the time-critical one \u2014 repair before the macula detaches preserves central acuity, so this is a same-day surgical conversation. Once the macula is off, central acuity is already compromised and the urgency drops from hours to a few days. Central acuity that is still normal in a patient with a curtain defect is therefore a reason to escalate, not to relax.\n\n**Pitfall:** a normal ED ultrasound does not clear small retinal tears or subtle macula-threatening disease.',
    recommendation: 'Use POCUS as an adjunct, not a rule-out test, and arrange urgent ophthalmology when the history fits. Preserved central acuity with a peripheral curtain suggests macula-on detachment and raises, not lowers, the urgency.',
    citation: [3, 4, 12],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'mvl-optic-neuritis',
    type: 'result',
    module: 2,
    title: 'Optic Neuritis / Optic Neuropathy',
    body: 'Open [Optic Neuritis](#/tree/optic-neuritis) for the full acute pathway, [Optic Neuropathy Hub](#/tree/optic-neuropathy-hub) to sort the non-inflammatory optic neuropathies, or [Multiple Sclerosis](#/tree/multiple-sclerosis) for the demyelinating context.\n\n**Clues:** subacute unilateral loss, pain with eye movement, reduced color saturation, RAPD, young adult, prior demyelinating symptoms. Consider atypical features: severe bilateral loss, older age, no pain, optic disc hemorrhage, systemic symptoms, infection risk, NMO/MOG concern.\n\n**A normal optic disc does not exclude optic neuritis.** Roughly two-thirds of ONTT cases were retrobulbar with a normal-appearing disc \u2014 "the patient sees nothing and the doctor sees nothing." Pain on eye movement plus an RAPD plus red desaturation is the diagnosis; the fundus is not the arbiter.\n\n**\u26D4 The ONTT pitfall, stated precisely:** in the Optic Neuritis Treatment Trial, standard-dose **oral prednisone 1 mg/kg/day alone** did not improve outcome and **increased the rate of new optic neuritis attacks** compared with placebo. The regimen that accelerated recovery was **IV methylprednisolone 1 g daily x 3 days**, optionally followed by an oral prednisone 1 mg/kg taper. Steroids speed recovery; they do not change final visual acuity at 6-12 months. So the error is not "steroids" \u2014 it is reaching for the oral prednisone burst by itself.\n\n**Before pulse steroid:** rule out infectious mimics (syphilis, TB, HSV/VZV) \u2014 RPR/treponemal and HIV at minimum.\n\n**Pitfall:** do not give oral prednisone alone for typical optic neuritis. Follow neuro-ophthalmology/neurology pathway.',
    recommendation: 'Optic neuritis needs ophthalmology/neurology strategy and MRI planning, not empiric oral prednisone alone.',
    citation: [3, 10, 11],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'mvl-infection',
    type: 'result',
    module: 2,
    title: 'Orbital / Intraocular / Invasive Infection',
    body: 'Open [Orbital vs Preseptal Cellulitis](#/tree/orbital-cellulitis).\n\n**Danger signs:** ophthalmoplegia, pain with EOM, proptosis, decreased vision, RAPD, fever, immunocompromise, recent eye procedure/injection, contact lens ulcer, black eschar, diabetic ketoacidosis risk. Treat orbital/intraocular infection as sight-threatening and sometimes life-threatening.\n\n**Next steps:** ophthalmology, CT orbit/face with contrast when stable, IV antibiotics when orbital cellulitis/endophthalmitis/deep infection is plausible.\n\n**\u26A0\uFE0F Endophthalmitis is not treated by the IV antibiotics you order.** Suspect it with pain plus vision loss plus hypopyon after cataract surgery, intravitreal injection, glaucoma surgery, or penetrating trauma. The sight-saving intervention is an **emergent vitreous tap with intravitreal antibiotics (typically vancomycin plus ceftazidime) by ophthalmology** \u2014 that call goes out now, not after imaging. In the Endophthalmitis Vitrectomy Study, adding **systemic** ceftazidime/amikacin produced no difference in final visual acuity or media clarity, and immediate vitrectomy helped only the subgroup presenting with light-perception-only vision. Systemic antibiotics are still appropriate for concurrent orbital cellulitis, bleb-related or endogenous/septic sources, and trauma \u2014 they are simply not the treatment for the eye itself.\n\n**Two other bad actors in this lane:** rhino-orbital-cerebral mucormycosis (diabetic ketoacidosis or profound immunosuppression, black nasal/palatal eschar, cranial neuropathies \u2014 needs emergent ENT/ophthalmology plus systemic amphotericin and surgical debridement) and cavernous sinus thrombosis (bilateral or crossing signs, cranial nerve III/IV/V1/VI palsies).',
    recommendation: 'Vision change plus orbital signs is not simple conjunctivitis. Suspected endophthalmitis needs emergent ophthalmology for intravitreal antibiotics, not IV antibiotics alone.',
    citation: [3, 4, 16],
    safetyLevel: 'critical',
    confidence: 'recommended',
  },
  {
    id: 'mvl-rescue',
    type: 'info',
    module: 3,
    title: 'Rescue / Initial Eye Bundle + Reassess',
    body: '**Default bundle when no killer has declared itself:**\n- Visual acuity each eye.\n- Pupils/RAPD, EOM, confrontational fields.\n- External exam: red eye, cornea, hyphema, proptosis, lid swelling, vesicles.\n- Fluorescein/slit lamp when available.\n- IOP if open globe is not suspected.\n- Fundus/photo when available, but do not require it to activate vascular or ophthalmology pathways.\n- Glucose, ECG, neuro exam, ESR/CRP/CBC if age >=50 or GCA concern.\n- POCUS only when open globe is not suspected.\n\nReassess vision, pain, pupil findings, and the need for urgent ophthalmology/stroke pathway after the first targeted tests.',
    citation: [3, 4, 5, 8],
    next: 'mvl-reassess',
    summary: 'VA, pupils/RAPD, fields, EOM, slit lamp/fluorescein, IOP when safe, fundus/photo, targeted vascular/GCA workup.',
    safetyLevel: 'critical',
  },
  {
    id: 'mvl-reassess',
    type: 'question',
    module: 3,
    title: 'Reassess After Initial Bundle',
    body: 'Do not let the patient leave until vision-threatening diagnoses have a timeline and destination.',
    options: [
      { label: 'Persistent vision loss, RAPD, retinal ischemia, GCA, glaucoma, trauma, infection, or retinal detachment concern', description: 'Return to time-critical exclusions', next: 'mvl-exclusions', urgency: 'critical' },
      { label: 'Improving but diagnosis uncertain or exam incomplete', description: 'Use imaging/consult strategy', next: 'mvl-imaging' },
      { label: 'Benign anterior finding, normal vision, no red flags, follow-up secured', description: 'Disposition checklist', next: 'mvl-disposition' },
    ],
    citation: [3, 4, 5],
    summary: 'Persistent or unexplained monocular vision loss needs a specialist/stroke/eye emergency pathway.',
  },
  {
    id: 'mvl-imaging',
    type: 'info',
    module: 4,
    title: 'Imaging / Testing Strategy',
    body: '**Image/test by the threatened structure:**\n- **Stroke/retinal ischemia:** brain MRI-DWI, CTA/MRA head/neck or carotid imaging, ECG/telemetry, echo per stroke pathway.\n- **GCA:** ESR/CRP/CBC now, temporal artery biopsy/ultrasound after treatment plan.\n- **Retinal detachment/vitreous hemorrhage:** ocular POCUS when globe intact; ophthalmology definitive exam.\n- **Open globe/IOFB/orbital trauma:** CT orbit/face, no ultrasound/tonometry if rupture possible.\n- **Orbital cellulitis/deep infection:** CT orbit/face with contrast when stable.\n- **Optic neuritis/neurologic optic neuropathy:** MRI brain/orbits with contrast per neurology/ophthalmology.\n\nTesting should not delay time-critical treatment for CRAO pathway, GCA, AACG, open globe, or orbital infection.',
    citation: [1, 2, 3, 4, 8, 12],
    next: 'mvl-disposition',
    summary: 'Stroke imaging for retinal ischemia, CT orbit for trauma/infection, POCUS for retina when safe, MRI orbits for optic neuritis.',
    safetyLevel: 'critical',
  },
  {
    id: 'mvl-disposition',
    type: 'question',
    module: 5,
    title: 'Disposition',
    body: 'Disposition is driven by diagnosis, visual acuity, progression, and follow-up reliability.',
    options: [
      { label: 'CRAO/TMVL high risk, GCA, AACG, open globe, orbital infection, OCS, severe persistent loss', description: 'Admit/transfer/emergent specialty pathway', next: 'mvl-dispo-admit', urgency: 'critical' },
      { label: 'Retina/optic nerve concern but stable and specialist follow-up arranged', description: 'Urgent specialty follow-up / observation', next: 'mvl-dispo-urgent' },
      { label: 'Benign anterior diagnosis, normal or baseline vision, reliable follow-up', description: 'Discharge checklist', next: 'mvl-dispo-discharge' },
    ],
    citation: [1, 2, 3, 4],
    summary: 'High-risk vascular, pressure, globe, infection, and severe persistent loss require emergent pathway.',
  },
  {
    id: 'mvl-dispo-admit',
    type: 'result',
    module: 5,
    title: 'Admit / Transfer / Emergent Specialty',
    body: 'Admit/transfer/emergent consult for CRAO or retinal ischemia requiring stroke pathway, suspected GCA with vision symptoms, acute angle closure, open globe, orbital compartment syndrome, orbital cellulitis/endophthalmitis/invasive infection, severe persistent loss, or unreliable urgent follow-up.',
    recommendation: 'When the eye, retina, optic nerve, or brain is actively threatened, disposition is emergent specialty pathway.',
    citation: [1, 2, 3, 4, 9, 13],
    safetyLevel: 'critical',
    confidence: 'definitive',
  },
  {
    id: 'mvl-dispo-urgent',
    type: 'result',
    module: 5,
    title: 'Urgent Ophthalmology / Neuro Follow-Up',
    body: 'Urgent same-day or next-day ophthalmology is typical for retinal detachment/tear concern, vitreous hemorrhage with decreased view, optic neuritis, unexplained persistent visual symptoms, hyphema, significant corneal ulcer, or diagnostic uncertainty. Neurology/stroke follow-up is added for vascular or optic neuritis pathways.',
    recommendation: 'Give a specific specialist destination and timeframe, not vague "eye follow-up."',
    citation: [3, 4, 12],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
  {
    id: 'mvl-dispo-discharge',
    type: 'result',
    module: 5,
    title: 'Discharge Checklist',
    body: 'Discharge only when visual acuity is normal or baseline, pain controlled, diagnosis is low-risk and clear, IOP is safe when relevant, no RAPD/focal neuro/GCA/retinal detachment/open globe/orbital infection concern, and follow-up is reliable.\n\n**Return now for:** worse vision, recurrent curtain/shade, eye pain/redness, headache/jaw pain/scalp tenderness, diplopia, neuro symptoms, vomiting/halos, fever/swelling, new floaters/flashes, or inability to obtain follow-up.',
    recommendation: 'Document acuity each eye, pupil/RAPD, IOP when measured, and the specific follow-up plan.',
    citation: [3, 4],
    safetyLevel: 'warning',
    confidence: 'recommended',
  },
];

export const MONOCULAR_VISION_LOSS_HUB_NODE_COUNT = MONOCULAR_VISION_LOSS_HUB_NODES.length;

export const MONOCULAR_VISION_LOSS_HUB_MODULE_LABELS = [
  'Sick Check',
  'Time-Critical Exclusions',
  'Rescue / Reassess',
  'Imaging',
  'Disposition',
];

export const MONOCULAR_VISION_LOSS_HUB_CITATIONS: Citation[] = [
  { num: 1, text: 'Mac Grory B, Schrag M, Biousse V, Furie KL, Gerhard-Herman M, Lavin PJ, Sobrin L, Tjoumakaris SI, Weyand CM, Yaghi S; American Heart Association Stroke Council; Council on Arteriosclerosis, Thrombosis and Vascular Biology; Council on Hypertension; Council on Peripheral Vascular Disease. Management of Central Retinal Artery Occlusion: A Scientific Statement From the American Heart Association. Stroke. 2021;52(6):e282-e294. doi:10.1161/STR.0000000000000366. PMID: 33677974. https://www.ahajournals.org/doi/10.1161/STR.0000000000000366' },
  { num: 2, text: 'Kovach JL, Bailey ST, Kim SJ, Lim JI, Vemulakonda GA, Ying GS, Flaxel CJ; American Academy of Ophthalmology Preferred Practice Pattern Retina/Vitreous Committee. Retinal and Ophthalmic Artery Occlusions Preferred Practice Pattern. Ophthalmology. 2025;132(4):P270-P302. doi:10.1016/j.ophtha.2024.12.024. PMID: 39918522. https://www.aao.org/education/preferred-practice-pattern/retinal-ophthalmic-artery-occlusions-ppp' },
  { num: 3, text: 'Brady CJ. Acute Vision Loss. Merck Manual Professional Edition. Reviewed/revised October 2025. https://www.merckmanuals.com/professional/eye-disorders/symptoms-of-ophthalmic-disorders/acute-vision-loss' },
  { num: 4, text: 'Lindsay H. Acute Vision Loss. Emergency Care BC clinical summary. Last updated August 23, 2018. https://emergencycarebc.ca/clinical_resource/clinical-summary/acute-vision-loss/' },
  { num: 5, text: 'Abbatemarco JR, Patell R, Buccola J, Willis MA. Acute monocular vision loss: Don\'t lose sight of the differential. Cleve Clin J Med. 2017;84(10):779-787. doi:10.3949/ccjm.84a.16096. PMID: 28985173. https://www.ccjm.org/content/84/10/779' },
  { num: 6, text: 'Shahjouei S, Bavarsad Shahripour R, Dumitrascu OM. Thrombolysis for central retinal artery occlusion: an individual participant-level meta-analysis. Int J Stroke. 2024;19(1):29-39. doi:10.1177/17474930231189352. PMID: 37424312. (Pre-RCT observational synthesis; superseded for treatment-effect estimation by refs 14, 15, and 17.)' },
  { num: 7, text: 'Douglas VP, Rachapudi SS, Davila-Siliezar P, Laylani NAR, Lee AG. Transient Monocular Visual Loss (Amaurosis Fugax): How Does Age Impact Diagnosis? Ophthalmol Ther. 2024;13(6):1417-1425. doi:10.1007/s40123-024-00932-z. PMID: 38587773. https://link.springer.com/article/10.1007/s40123-024-00932-z' },
  { num: 8, text: 'Maz M, Chung SA, Abril A, Langford CA, Gorelik M, Guyatt G, et al. 2021 American College of Rheumatology/Vasculitis Foundation Guideline for the Management of Giant Cell Arteritis and Takayasu Arteritis. Arthritis Rheumatol. 2021;73(8):1349-1365. doi:10.1002/art.41774. PMID: 34235884. Free full text: https://pmc.ncbi.nlm.nih.gov/articles/PMC12344528/ (Basis for GCA glucocorticoid dosing in this hub: Rec 9 - pulse IV methylprednisolone 500-1000 mg daily x 3-5 days for threatened vision loss, conditional; Rec 11 - prednisone 1 mg/kg up to 80 mg daily for newly diagnosed GCA, conditional; Rec 3 - temporal artery biopsy within 2 weeks of starting glucocorticoids, conditional.)' },
  { num: 9, text: 'Gedde SJ, Chopra V, Vinod K, Bowden EC, Kolomeyer NN, Challa P, Budenz DL; American Academy of Ophthalmology Preferred Practice Pattern Glaucoma Committee. Primary Angle-Closure Disease Preferred Practice Pattern. Ophthalmology. 2026;133(4):P153-P201. doi:10.1016/j.ophtha.2025.12.030. PMID: 41665581. https://www.aao.org/education/preferred-practice-pattern/primary-angle-closure-disease-ppp (This 2026 edition is current and supersedes the prior edition: Gedde SJ, Chen PP, Muir KW, et al. Ophthalmology. 2021;128(1):P30-P70. doi:10.1016/j.ophtha.2020.10.021)' },
  { num: 10, text: 'Optic Neuritis Study Group. Visual function 15 years after optic neuritis: a final follow-up report from the Optic Neuritis Treatment Trial. Ophthalmology. 2008;115(6):1079-1082.e5. doi:10.1016/j.ophtha.2007.08.004. PMID: 17976727.' },
  { num: 11, text: 'Beck RW, Cleary PA, Anderson MM Jr, Keltner JL, Shults WT, Kaufman DI, et al.; Optic Neuritis Study Group. A randomized, controlled trial of corticosteroids in the treatment of acute optic neuritis. N Engl J Med. 1992;326(9):581-588. doi:10.1056/NEJM199202273260901. PMID: 1734247. (Basis for "no oral prednisone alone": standard-dose oral prednisone alone was ineffective and increased the rate of new optic neuritis attacks.)' },
  { num: 12, text: 'Propst SL, Kirschner JM, Strachan CC, Roumpf SK, Menard LM, Sarmiento EJ, Hunter BR. Ocular Point-of-Care Ultrasonography to Diagnose Posterior Chamber Abnormalities: A Systematic Review and Meta-analysis. JAMA Netw Open. 2020;3(2):e1921460. doi:10.1001/jamanetworkopen.2019.21460. PMID: 32074291. https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2761259' },
  { num: 13, text: 'Rowh AD, Ufberg JW, Chan TC, Vilke GM, Harrigan RA. Lateral canthotomy and cantholysis: emergency management of orbital compartment syndrome. J Emerg Med. 2015;48(3):325-330. doi:10.1016/j.jemermed.2014.11.002. PMID: 25524455.' },
  { num: 14, text: 'Preterre C, Gaultier A, Obadia M, Vignal C, Mourand I, Plat J, et al.; THEIA collaborators. Intravenous alteplase versus oral aspirin for acute central retinal artery occlusion within 4.5 h of severe vision loss (THEIA): a multicentre, double-dummy, patient-blinded and assessor-blinded, randomised, controlled, phase 3 trial. Lancet Neurol. 2025;24(11):909-919. doi:10.1016/S1474-4422(25)00308-4. PMID: 41109232. (n=70; primary endpoint >=0.3 logMAR improvement at 1 month: 19/29 [66%] alteplase vs 13/27 [48%] aspirin 300 mg PO; adjusted OR 1.1, 95% CI 0.07-18.39; p=0.95. Likely underpowered. One asymptomatic ICH in the alteplase arm.)' },
  { num: 15, text: 'Ryan SJ, Jorstad OK, Skjelland M, Pesonen M, Simonsen CZ, Bek T, et al.; TenCRAOS Investigators. A Randomized Trial of Tenecteplase in Acute Central Retinal Artery Occlusion. N Engl J Med. 2026;394(5):442-450. doi:10.1056/NEJMoa2508515. PMID: 41604638. (n=78; tenecteplase 0.25 mg/kg vs aspirin 300 mg PO within 4.5 h. Vision recovery [BCVA <=0.7 logMAR] at 30 days: 8/40 [20%] vs 9/38 [24%]; risk difference -3.7 percentage points, 95% CI -22.0 to 14.7; p=0.69. More adverse events with tenecteplase including one fatal intracranial hemorrhage.)' },
  { num: 16, text: 'Endophthalmitis Vitrectomy Study Group. Results of the Endophthalmitis Vitrectomy Study. A randomized trial of immediate vitrectomy and of intravenous antibiotics for the treatment of postoperative bacterial endophthalmitis. Arch Ophthalmol. 1995;113(12):1479-1496. PMID: 7487614. (n=420. No difference in final visual acuity or media clarity with vs without systemic ceftazidime/amikacin. Immediate vitrectomy benefited only the light-perception-only subgroup.)' },
  { num: 17, text: 'Abbas A, Sabet H, Abo-Elnour DE, Al-Mufti J, Aldehri M, Alnaami I, Nguyen TN. Effectiveness and safety of intravenous thrombolysis for non-arteritic central retinal artery occlusion: A GRADE-assessed meta-analysis. Graefes Arch Clin Exp Ophthalmol. 2026;264(6):1541-1558. doi:10.1007/s00417-026-07145-z. PMID: 41758379.' },
];
