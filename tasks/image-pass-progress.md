# Medical Images Pass — Progress Tracker
Last updated: 2026-04-08

## Goal
Systematic pass through all myMedKitt consults adding high-quality open-source medical images where they add educational value.

## Image Sources (priority order)
1. WikEM (CC-licensed)
2. Radiopaedia (CC-licensed)
3. OpenStax Anatomy (CC)
4. Wikimedia Commons (CC/PD)
5. Open-i / PMC (open-access)

**Do NOT use:** UpToDate, EMCrit, EBMedicine, or paywalled sources.

## Image Conventions
- Files go in `docs/images/<tree-id>/filename`
- Node field: `images: [{ src: 'images/<tree-id>/filename', alt: '...', caption: '...' }]`
- Place BEFORE `citation:`, `next:`, `options:`, `recommendation:`, or `calculatorLinks:`
- Resize large images: `sips -Z 800 filename --out filename` if >~1MB
- Wikimedia downloads: use `curl -sL -A "Mozilla/5.0"` (some files require User-Agent)
- After all edits: run `/deploy` skill

## COMPLETED — ~88 consults with images

### Tier 1 + Tier 2 (prior sessions — all deployed)
aacg, afib-rvr, anaphylaxis, angioedema, aub, awake-intubation, brugada (brugada-syndrome), burns, cardiac-arrest, crao, dental-trauma, diabetic-foot-wounds, difficult-airway (difficult-airway-bougie uses cardiac-arrest dir?), dka, echo-epss, echo-views, epistaxis, extensor-tendon, gout, ich, neonatal-resus, orbital-cellulitis, pep, pneumothorax, priapism, psych-assessment, pta-drainage, sah, shoulder-dislocation, shoulder-dystocia, splinting, stemi, stroke, syncope, torsades (torsades-de-pointes), trach-emergency, tracheo-innominate-fistula, ventricular-tachycardia

### Batch A (deployed in same session — 20 consults)
nstemi, potassium, croup, meningitis, aacg (re-done?), chf-exacerbation, pe-treatment, copd-exacerbation, button-battery, hypothermia, measles, tuberculosis, malaria, snake-envenomation, co-toxicity, heat-stroke, echo-views, digoxin-toxicity, thyroid, cardiogenic-shock

### Batch C+D (deployed 2026-04-08 — 19 consults)
sepsis, status-epilepticus, sickle-cell, upper-gi-bleed, asthma-exacerbation, aortic-aneurysm, rhabdomyolysis, bronchiolitis, pelvic-fracture, eclampsia, tia-workup, cvst, peds-stec-hus, peds-fever, sodium, alcohol-withdrawal, pe-pregnancy, serotonin-syndrome, acid-base

### Batch E (deployed 2026-04-08 — 13 consults)
beta-blocker-od, tca-toxidrome, methemoglobinemia, myasthenia-gravis, acute-pancreatitis, guillain-barre, opioid-withdrawal, adult-uti, vp-shunt, adrenal-insufficiency, anticoag-reversal, ttp, acetaminophen

---

## REMAINING — 69 consults without images

To resume: run `comm -23 <(ls src/data/trees/ | sed 's/\.ts$//' | grep -v '^index$' | sort) <(ls docs/images/ | sort)` to get current list.

### Skip (no good CC image available)
- cervical-artery-dissection — no good crescent sign CTA/MRA on Wikimedia

### Strong visual candidates (prioritize these)
| Tree ID | Best image idea |
|---------|----------------|
| approach-to-arthritis | joint fluid crystal comparison (gout vs pseudogout) |
| botulism | ptosis + descending paralysis photo |
| bradycardic-arrest | complete heart block ECG |
| brugada-syndrome | Brugada type 1 pattern ECG (coved ST) |
| caustic-ingestion | endoscopic esophageal burn grading |
| ccb-od | ECG junctional rhythm / bradycardia |
| chemical-burn | acid/alkali skin burn photo |
| chs (cannabinoid hyperemesis) | no strong image |
| ciguatera | ciguatera fish photo or toxin source |
| deep-neck-infection | CT neck with peritonsillar/retropharyngeal abscess |
| delirium | CAM criteria diagram |
| dental-avulsion | avulsed tooth photo or replantation diagram |
| diabetes-management | DKA vs HHS comparison table/diagram |
| diarrhea | stool osmotic vs secretory diagram |
| difficult-airway-bougie | bougie-assisted intubation technique |
| ear-fb | ear foreign body otoscopic image |
| ecmo | ECMO circuit diagram (VA vs VV) |
| globe-rupture | slit lamp or CT orbit showing ruptured globe |
| hd-emergencies | HD circuit diagram or emergencies diagram |
| hemophilia | joint hemarthrosis or factor replacement diagram |
| hfnc | HFNC cannula diagram or clinical photo |
| iron-od | abdominal X-ray with radiopaque iron tablets |
| laryngeal-trauma | CT neck showing laryngeal fracture |
| le-fort-fracture | Le Fort classification diagram |
| marine-envenomation | jellyfish sting injury or box jellyfish photo |
| massive-hemoptysis | chest CT with pulmonary hemorrhage |
| massive-transfusion | 1:1:1 ratio diagram or viscoelastic testing |
| migraine | trigeminal nerve distribution diagram |
| nail-bed-injuries | nail bed repair technique diagram |
| neurosyphilis | VDRL/CSF findings or syphilitic gumma on MRI |
| ohss | ovarian hyperstimulation US or ascites |
| oxygen-delivery | oxygen delivery device comparison diagram |
| pea-arrest | organized rhythm ECG or H's and T's diagram |
| pediatric-arthritis | septic arthritis joint aspiration or US |
| peds-osteomyelitis | osteomyelitis X-ray or bone scan |
| peds-submersion | drowning resuscitation diagram |
| peds-trauma | pediatric trauma algorithm diagram |
| peripartum-cardiomyopathy | echo showing dilated cardiomyopathy |
| post-rosc | targeted temperature management cooling device |
| psychiatry-assessment | similar to psych-assessment (may have image?) |
| push-dose-pressors | push-dose epinephrine preparation |
| rabies | Negri bodies on pathology or rabies virus |
| refractory-vfvt | VF ECG or defibrillation waveform |
| rhogam-early-pregnancy | Rh sensitization diagram |
| salicylate | Done nomogram or salicylate toxidrome diagram |
| septic-arthritis | synovial fluid crystal comparison or joint aspiration |
| sti-comprehensive | STI lesion comparison (chancre vs chancroid vs HSV) |
| suicide-risk-assessment | no strong clinical image |
| syphilis | primary chancre or secondary syphilis rash |
| traveler-infections | geographic disease distribution map |
| urinary-retention | bladder US with post-void residual |
| urinary-sphincter | urethral anatomy diagram |
| uti-peds | pediatric urine collection technique |
| vad (ventricular assist device) | LVAD/RVAD device diagram |
| viral-myositis | muscle biopsy or serum CK elevation diagram |
| xylazine-toxicity | xylazine skin wounds/necrosis photo |
| code-status | no strong clinical image |
| combative-patient | no strong clinical image |
| ct-decision-support | no strong image |
| dfsa-workup | no strong image |
| eating-disorders | refeeding syndrome or BMI chart |
| ed-methadone | QT prolongation on ECG (methadone) |
| hfnc | HFNC setup photo |
| hop-killers | no strong image |
| human-trafficking | no strong clinical image |
| intralipid | lipid rescue syringe or emulsion vial |
| nat-screening | bruising patterns in NAT |
| pep | already has image from Tier 1? Check |

---

## How to Resume

1. Open new Claude Code session in `~/Desktop/myMedKitt/`
2. Say: "Resume the medical images pass for myMedKitt — see tasks/image-pass-progress.md"
3. Pick the next batch from the REMAINING section above
4. For each: find CC image on Wikimedia Commons → download to docs/images/<id>/ → edit tree → deploy

## Workflow per batch
```bash
# Find current remaining
comm -23 <(ls src/data/trees/ | sed 's/\.ts$//' | grep -v '^index$' | sort) <(ls docs/images/ | sort)

# Download image (with User-Agent)
curl -sL -A "Mozilla/5.0" "https://upload.wikimedia.org/..." -o docs/images/<id>/filename.jpg

# Resize if >1MB
sips -Z 800 docs/images/<id>/filename.jpg --out docs/images/<id>/filename.jpg

# Find target node
grep -n "id:" src/data/trees/<id>.ts | head -8

# Read node + edit tree
# Then compile + deploy via /deploy skill
```
