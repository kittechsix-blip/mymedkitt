// MedKitt — Ear Foreign Body Removal Consult
// Triage → Classification → Technique Selection → Removal → Complications
// Category: Procedures. 4 modules, ~30 nodes.

import type { DecisionNode } from '../../models/types.js';

interface Citation {
  num: number;
  text: string;
}

export const EAR_FB_MODULE_LABELS = [
  'Triage & Emergencies',
  'Assessment & Classification',
  'Technique by Object Type',
  'Removal & Outcomes',
];

export const EAR_FB_CITATIONS: Citation[] = [
  { num: 1, text: 'Heim SW, Maughan KL. Foreign Bodies in the Ear, Nose, and Throat. Am Fam Physician. 2007;76(8):1185-1189.' },
  { num: 2, text: 'DiMuzio J, Deschler DG. Emergency department management of foreign bodies of the external ear canal in children. Otol Neurotol. 2002;23(4):473-475.' },
  { num: 3, text: 'Thompson SK, Wein RO, Dutcher PO. External auditory canal foreign body removal: management practices and outcomes. Laryngoscope. 2003;113(11):1912-1915.' },
  { num: 4, text: 'Schulze SL, Kerschner J, Beste D. Pediatric external auditory canal foreign bodies: a review of 698 cases. Otolaryngol Head Neck Surg. 2002;127(1):73-78.' },
  { num: 5, text: 'Ansley JF, Cunningham MJ. Treatment of aural foreign bodies in children. Pediatrics. 1998;101(4 Pt 1):638-641.' },
  { num: 6, text: 'Balbani APS, Sanchez TG, Butugan O, et al. Ear and nose foreign body removal in children. Int J Pediatr Otorhinolaryngol. 1998;46(1-2):37-42.' },
  { num: 7, text: 'Leffler S, Cheney P, Tandberg D. Chemical immobilization and killing of intra-aural roaches: an in vitro comparative study. Ann Emerg Med. 1993;22(12):1795-1798.' },
  { num: 8, text: 'Olajuyin O, Olatunya OS, Olajide TG. Aural foreign body extraction in children: A double-edged sword. Pan Afr Med J. 2015;20:186.' },
];

export const EAR_FB_CRITICAL_ACTIONS = [
  { text: 'Button battery = EMERGENCY - remove immediately, do NOT irrigate', nodeId: 'earfb-battery' },
  { text: 'Kill live insect with mineral oil before extraction', nodeId: 'earfb-insect-kill' },
  { text: 'Do NOT irrigate soft/organic material (cotton, foam, seeds) - they swell', nodeId: 'earfb-tech-soft' },
  { text: 'Limit to 1-2 attempts - each attempt causes more edema and bleeding', nodeId: 'earfb-failed' },
  { text: 'First attempt has highest success rate (65-78%) - plan technique carefully', nodeId: 'earfb-start' },
  { text: 'Suspected TM perforation - do NOT attempt removal, refer to ENT', nodeId: 'earfb-tm-perf' },
  { text: 'Object pushed deeper or against TM - STOP, refer to ENT', nodeId: 'earfb-comp-deeper' },
] as const;

export const EAR_FB_NODES: DecisionNode[] = [

  // =====================================================================
  // MODULE 1: TRIAGE & EMERGENCIES
  // =====================================================================

  {
    id: 'earfb-start',
    type: 'info',
    module: 1,
    title: 'Ear Foreign Body Removal',
    body: 'External auditory canal (EAC) foreign bodies are common ED presentations, especially in children. Success rates are highest on the first attempt — plan your technique carefully before starting.\n\nKEY PRINCIPLES\n• First attempt is most successful (65-78%)\n• Match technique to object type\n• Know when to stop and refer\n• Button battery = EMERGENCY\n\nCOMMON OBJECTS\n• Children: beads, toys, food, insects, paper\n• Adults: cotton swabs, hearing aid parts, insects\n\nSUCCESS FACTORS\n• Adequate visualization\n• Cooperative patient (or appropriate restraint/sedation)\n• Correct technique for object type\n• Limit to 1-2 attempts before ENT referral',
    citation: [1, 3, 4],
    next: 'earfb-triage',
  },

  {
    id: 'earfb-triage',
    type: 'question',
    module: 1,
    title: 'Emergent Findings?',
    body: 'Screen for emergencies before attempting removal.',
    options: [
      {
        label: 'Button battery suspected',
        description: 'Metallic disc, hearing aid component — EMERGENT',
        next: 'earfb-battery',
        urgency: 'critical',
      },
      {
        label: 'Live insect with distress',
        description: 'Patient in pain, insect buzzing/moving',
        next: 'earfb-insect-kill',
        urgency: 'urgent',
      },
      {
        label: 'Suspected TM perforation',
        description: 'Vertigo, hearing loss, bleeding, pain with object insertion',
        next: 'earfb-tm-perf',
        urgency: 'urgent',
      },
      {
        label: 'None of the above',
        description: 'Stable patient, no emergent findings',
        next: 'earfb-assess',
      },
    ],
  },

  {
    id: 'earfb-battery',
    type: 'result',
    module: 1,
    title: 'Button Battery — EMERGENCY',
    body: 'Button batteries cause liquefaction necrosis within 1-2 hours. This is a time-critical emergency.',
    recommendation: 'IMMEDIATE ACTIONS:\n• Do NOT irrigate (water accelerates damage)\n• Keep ear dry\n• Emergent ENT consultation\n• If ENT unavailable, attempt gentle removal with alligator forceps or magnetic tool\n• Do NOT delay for imaging if diagnosis is clear\n\nDAMAGE MECHANISM:\n• Electrical current generation between poles\n• Hydroxide production → tissue necrosis\n• Can erode through EAC within hours\n\nCOMPLICATIONS:\n• Canal stenosis\n• TM perforation\n• Ossicular damage\n• Facial nerve injury\n\nDISPOSITION: ENT follow-up within 24 hours even after successful removal.',
    confidence: 'definitive',
    citation: [1, 8],
  },

  {
    id: 'earfb-insect-kill',
    type: 'info',
    module: 1,
    title: 'Live Insect — Kill First',
    body: 'Kill the insect before attempting extraction. This reduces patient distress and prevents further injury from insect movement.\n\nPREFERRED AGENT: Mineral Oil\n• Fill canal with mineral oil drops\n• Insect dies quietly (no thrashing)\n• Wait 1-2 minutes before extraction\n\nALTERNATIVE AGENTS:\n• 2% lidocaine (may cause initial thrashing)\n• Alcohol (effective but can cause discomfort)\n• Warm vegetable oil\n\nAVOID:\n• Water alone (insects may survive longer)\n• Hot liquids (risk of burns)\n\nAfter the insect is dead, proceed to extraction using irrigation, forceps, or suction.',
    citation: [7],
    next: 'earfb-classify',
  },

  {
    id: 'earfb-tm-perf',
    type: 'result',
    module: 1,
    title: 'Suspected TM Perforation',
    body: 'If tympanic membrane perforation is suspected, do NOT attempt removal in the ED.',
    recommendation: 'REFER TO ENT — do not attempt removal.\n\nSIGNS OF TM PERFORATION:\n• Vertigo or nystagmus\n• Sudden hearing loss\n• Bleeding from canal\n• Severe pain at time of FB insertion\n• Object appears to be touching/impacting TM\n• Poor visualization of depth\n\nWHY REFER:\n• Risk of ossicular chain damage\n• Risk of middle ear contamination\n• Operative microscope provides better visualization\n• May need formal tympanoplasty\n\nIF OTOTOXIC DROPS NEEDED:\n• Avoid aminoglycosides (neomycin, tobramycin)\n• Avoid polymyxin B\n• Safe: ofloxacin, ciprofloxacin/dexamethasone',
    confidence: 'definitive',
    citation: [1, 3],
  },

  // =====================================================================
  // MODULE 2: ASSESSMENT & CLASSIFICATION
  // =====================================================================

  {
    id: 'earfb-assess',
    type: 'info',
    module: 2,
    title: 'Assessment Before Removal',
    body: 'Proper assessment is critical for first-attempt success.\n\nVISUALIZATION:\n• Use otoscope with largest speculum that fits\n• Ensure adequate lighting\n• Pull pinna up and back (adults) or down and back (children)\n• Document object type, size, location, TM status\n\nCONTRAINDICATION CHECK:\n• TM perforation or suspected damage\n• Object touching/impacting TM\n• Sharp object adjacent to TM\n• Multiple prior failed attempts\n• Uncooperative patient without sedation option\n\nPATIENT PREPARATION:\n• Position: supine or sitting with head turned\n• Consider papoose board for young children\n• Procedural sedation if needed (ketamine preferred)\n• Ensure suction and backup equipment ready',
    citation: [2, 4, 5],
    next: 'earfb-classify',
  },

  {
    id: 'earfb-classify',
    type: 'question',
    module: 2,
    title: 'Foreign Body Type',
    body: 'Classification determines optimal removal technique. What type of object is present?',
    options: [
      {
        label: 'Insect (dead or alive)',
        description: 'Cockroach, fly, tick, moth, ant',
        next: 'earfb-tech-insect',
      },
      {
        label: 'Hard sphere / bead',
        description: 'Plastic bead, BB pellet, ball bearing',
        next: 'earfb-tech-sphere',
      },
      {
        label: 'Soft/compressible object',
        description: 'Cotton, foam, paper, sponge, eraser',
        next: 'earfb-tech-soft',
      },
      {
        label: 'Organic material',
        description: 'Seeds, beans, popcorn, food, plant material',
        next: 'earfb-tech-organic',
      },
      {
        label: 'Small particles',
        description: 'Sand, dirt, small debris',
        next: 'earfb-tech-particles',
      },
      {
        label: 'Other / complex',
        description: 'Hearing aid parts, earbuds, irregular objects',
        next: 'earfb-tech-other',
      },
    ],
  },

  // =====================================================================
  // MODULE 3: TECHNIQUE BY OBJECT TYPE
  // =====================================================================

  {
    id: 'earfb-tech-insect',
    type: 'info',
    module: 3,
    title: 'Insect Removal Technique',
    body: 'STEP 1: KILL THE INSECT (if alive)\n• Mineral oil drops — fill canal, wait 1-2 minutes\n• Insect dies quietly, reducing trauma\n\nSTEP 2: EXTRACTION OPTIONS\n\nIrrigation (after killing):\n• Insect may float out with gentle irrigation\n• Use body-temp water, low pressure\n\nAlligator Forceps:\n• Grasp leg, wing, or body segment\n• Slow, gentle withdrawal\n• May need to remove in pieces\n\nSuction:\n• Soft-tipped catheter\n• Good for fragmented insects\n• Avoid traumatizing canal\n\nRight-Angle Hook:\n• If body intact, scoop gently behind\n• Rotate to position behind FB\n• Withdraw slowly\n\nTIPS:\n• Have suction ready for fragments\n• Expect partial removal — may need multiple passes\n• Document species if possible (rarely clinically relevant)',
    citation: [6, 7],
    next: 'earfb-attempt',
  },

  {
    id: 'earfb-tech-sphere',
    type: 'info',
    module: 3,
    title: 'Hard Sphere / Bead Removal',
    body: 'Hard, round objects are challenging because forceps slip. Use curette or hook techniques.\n\nPRIMARY TECHNIQUE: Right-Angle Hook or Curette\n• Advance hook/curette BEHIND the object\n• Rotate to position tip posterior to FB\n• Apply gentle posterior-to-anterior traction\n• Scoop slowly and withdraw\n\nALTERNATIVE: Suction\n• If object is small, smooth, and loose\n• Soft-tipped catheter may adhere\n• Works best for <3 mm objects\n\nCYANOACRYLATE (GLUE) METHOD:\n• Apply small amount to blunt end of cotton swab\n• Insert into canal, contact FB\n• Hold steady 60 seconds (patient cooperation critical)\n• Withdraw swab + FB together\n• Avoid contact with canal skin\n• Success rate lower (~19%) but useful for stuck objects\n\nAVOID: Alligator forceps (slippage risk pushes object deeper)',
    citation: [3, 5],
    next: 'earfb-attempt',
  },

  {
    id: 'earfb-tech-soft',
    type: 'info',
    module: 3,
    title: 'Soft Object Removal',
    body: 'Soft, compressible objects (cotton, foam, paper) are best removed with grasping instruments.\n\nPRIMARY TECHNIQUE: Alligator Forceps\n• Grasp edge or protruding surface\n• Gentle traction — avoid crushing\n• May need multiple passes if object fragments\n\nALTERNATIVE: Suction\n• Soft-tipped catheter\n• Good for loose, fluffy material\n• May need to use with forceps for adherent material\n\nRIGHT-ANGLE HOOK:\n• Can work if you can get behind the object\n• Risk of pushing deeper if object compresses\n\nCONTRAINDICATED: Irrigation\n• Spongy materials absorb water and SWELL\n• Can convert easy removal to impaction\n• Never irrigate cotton, foam, sponge, or paper\n\nTIPS:\n• Work slowly — these objects fragment easily\n• Have multiple instruments ready\n• Suction standing by for loose pieces',
    citation: [1, 4],
    next: 'earfb-attempt',
  },

  {
    id: 'earfb-tech-organic',
    type: 'info',
    module: 3,
    title: 'Organic Material Removal',
    body: 'Seeds, beans, food particles, and plant material require DRY extraction — they swell with moisture.\n\nCONTRAINDICATED: Irrigation\n• Organic material absorbs water\n• Swelling impairs removal\n• Can convert simple FB to impaction\n\nPRIMARY TECHNIQUE: Alligator Forceps\n• Grasp firmly but avoid crushing\n• Seeds may be slippery — may need multiple attempts\n• If object crushes, remove pieces\n\nALTERNATIVE: Right-Angle Hook\n• Get behind the object\n• Scoop anteriorly\n• Works well for smooth seeds\n\nSUCTION:\n• Useful for small particles or fragments\n• May need in combination with forceps\n\nSPECIAL CONSIDERATIONS:\n• Beans can swell 2-3x original size if wet\n• Popcorn kernels may fragment\n• Seeds may have sharp edges\n• If organic FB has been in place >24 hours, may have significant swelling already',
    citation: [1, 6],
    next: 'earfb-attempt',
  },

  {
    id: 'earfb-tech-particles',
    type: 'info',
    module: 3,
    title: 'Small Particle Removal',
    body: 'Sand, dirt, small debris — irrigation is usually the best approach.\n\nPRIMARY TECHNIQUE: Irrigation\n• 20-50 mL syringe with 14-16 gauge plastic catheter\n• Body-temperature water or saline\n• Patient head tilted, affected ear up\n• Direct stream along superior canal wall\n• Catch effluent in basin\n\nTECHNIQUE TIPS:\n• Lukewarm water only (cold causes vertigo)\n• Low pressure — avoid Waterpik (too forceful)\n• Multiple passes may be needed\n• 65% first-pass success rate\n\nCONTRAINDICATIONS TO IRRIGATION:\n• TM perforation (known or suspected)\n• Soft/organic material (will swell)\n• Button battery (water accelerates damage)\n• Prior ear surgery with tympanostomy tubes\n\nALTERNATIVE:\n• Suction catheter for visible particles\n• Curette for adherent debris',
    citation: [1, 3],
    next: 'earfb-attempt',
  },

  {
    id: 'earfb-tech-other',
    type: 'info',
    module: 3,
    title: 'Complex / Irregular Objects',
    body: 'Hearing aid components, earbud tips, and irregular objects require individualized approach.\n\nASSESSMENT:\n• Does it contain a battery? → Treat as button battery emergency\n• Is it soft or hard?\n• Can you grasp an edge?\n• How deep is it?\n\nHEARING AID COMPONENTS:\n• May have battery inside — check carefully\n• Usually plastic — alligator forceps appropriate\n• May be custom-molded to canal shape\n\nEARBUD TIPS:\n• Soft silicone — alligator forceps\n• May tear — be prepared for fragments\n• Suction as backup\n\nIRREGULAR HARD OBJECTS:\n• Assess for graspable edge\n• Forceps if edge present\n• Hook/curette if need to get behind\n• Cyanoacrylate for flat, smooth surfaces\n\nIF UNABLE TO REMOVE:\n• Low threshold for ENT referral\n• Complex objects often need operative microscope',
    citation: [1, 4],
    next: 'earfb-attempt',
  },

  // =====================================================================
  // MODULE 4: REMOVAL ATTEMPT & OUTCOMES
  // =====================================================================

  {
    id: 'earfb-attempt',
    type: 'question',
    module: 4,
    title: 'Removal Attempt',
    body: 'Attempt removal using the appropriate technique. Limit to 1-2 attempts — each subsequent attempt has lower success rate due to edema, bleeding, and patient distress.\n\nBEFORE EACH ATTEMPT:\n• Confirm visualization\n• Confirm patient cooperation/sedation\n• Have backup instruments ready\n• Know your bail-out plan',
    options: [
      {
        label: 'Successful removal',
        description: 'Object removed completely',
        next: 'earfb-post-removal',
      },
      {
        label: 'Partial removal / fragments remain',
        description: 'Some material removed, residual FB present',
        next: 'earfb-partial',
      },
      {
        label: 'Failed — object still in place',
        description: 'Unable to remove after 1-2 attempts',
        next: 'earfb-failed',
      },
      {
        label: 'Complication during attempt',
        description: 'Bleeding, patient distress, suspected TM injury',
        next: 'earfb-complication',
      },
    ],
  },

  {
    id: 'earfb-post-removal',
    type: 'info',
    module: 4,
    title: 'Post-Removal Care',
    body: 'Successful removal — document and provide aftercare instructions.\n\nPOST-PROCEDURE EXAM:\n• Inspect canal for laceration or abrasion\n• Visualize TM — document integrity\n• Test hearing (finger rub or whisper test)\n\nAFTERCARE:\n• Keep ear dry for 24-48 hours\n• Otic antibiotic drops if canal trauma present (ofloxacin or ciprodex)\n• Pain control: acetaminophen or ibuprofen PRN\n\nRETURN PRECAUTIONS:\n• Increasing pain\n• Drainage from ear\n• Hearing loss\n• Dizziness or vertigo\n\nFOLLOW-UP:\n• Not routinely needed if uncomplicated\n• ENT referral if: canal laceration, TM concern, hearing change\n\nPREVENTION COUNSELING:\n• Do not insert objects in ear\n• Cotton swabs should not enter canal\n• Ear candles are ineffective and dangerous',
    citation: [1, 2],
    next: 'earfb-dispo',
  },

  {
    id: 'earfb-partial',
    type: 'question',
    module: 4,
    title: 'Partial Removal',
    body: 'Some material removed but fragments remain. Assess the situation.',
    options: [
      {
        label: 'Small fragments, not concerning',
        description: 'Minimal residual, likely to work out naturally',
        next: 'earfb-partial-observe',
      },
      {
        label: 'Significant residual material',
        description: 'Substantial FB remains, needs further removal',
        next: 'earfb-ent-referral',
      },
      {
        label: 'Attempt another pass',
        description: 'Good visualization, patient tolerating, likely success',
        next: 'earfb-attempt',
      },
    ],
  },

  {
    id: 'earfb-partial-observe',
    type: 'result',
    module: 4,
    title: 'Observation for Residual Fragments',
    body: 'Minimal residual material that may clear spontaneously.',
    recommendation: 'MANAGEMENT:\n• Document residual material\n• Otic antibiotic drops x 5-7 days\n• Keep ear dry\n• Return if symptoms develop\n\nFOLLOW-UP:\n• ENT follow-up in 1-2 weeks\n• May need cerumen removal to assess\n\nRETURN PRECAUTIONS:\n• Pain, drainage, or hearing change\n\nMost small organic fragments will exfoliate with cerumen over 1-2 weeks.',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'earfb-failed',
    type: 'info',
    module: 4,
    title: 'Failed Removal',
    body: 'Unable to remove after 1-2 attempts. Do NOT continue — ENT referral is indicated.\n\nWHY STOP:\n• Each attempt causes more edema and bleeding\n• Patient cooperation deteriorates\n• Risk of pushing object deeper\n• Risk of TM or canal injury increases\n• First attempt success: 65-78%\n• After 2+ failed attempts: <20%\n\nDOCUMENT:\n• Object type and location\n• Techniques attempted\n• Reason for failure\n• Canal and TM status post-attempt\n\n75% of EAC foreign bodies are removable in ED.\n23% require operative removal under microscopy.',
    citation: [3, 4],
    next: 'earfb-ent-referral',
  },

  {
    id: 'earfb-complication',
    type: 'question',
    module: 4,
    title: 'Complication Assessment',
    body: 'What complication occurred?',
    options: [
      {
        label: 'Canal laceration / bleeding',
        description: 'Visible trauma to canal skin',
        next: 'earfb-comp-bleeding',
      },
      {
        label: 'Suspected TM perforation',
        description: 'Pain, hearing change, vertigo during procedure',
        next: 'earfb-comp-tm',
      },
      {
        label: 'Object pushed deeper',
        description: 'FB now against or beyond TM',
        next: 'earfb-comp-deeper',
      },
      {
        label: 'Patient unable to tolerate',
        description: 'Severe anxiety, pain, uncooperative',
        next: 'earfb-comp-intolerance',
      },
    ],
  },

  {
    id: 'earfb-comp-bleeding',
    type: 'result',
    module: 4,
    title: 'Canal Laceration Management',
    body: 'Canal skin trauma with bleeding.',
    recommendation: 'IMMEDIATE MANAGEMENT:\n• Apply gentle pressure with cotton ball\n• Assess depth and extent of laceration\n• Visualize TM if possible\n\nIF MINOR LACERATION:\n• Otic antibiotic drops (ofloxacin or ciprodex) x 7 days\n• Keep ear dry x 1 week\n• Pain control PRN\n• ENT follow-up if not healing at 1 week\n\nIF SIGNIFICANT LACERATION:\n• Stop removal attempt\n• ENT referral — may need operative removal\n• Antibiotic drops until seen by ENT\n\nFOREIGN BODY STILL PRESENT?\n• If FB still in place, refer to ENT\n• Do not continue attempts through active bleeding',
    confidence: 'recommended',
    citation: [3, 8],
  },

  {
    id: 'earfb-comp-tm',
    type: 'result',
    module: 4,
    title: 'Suspected TM Perforation',
    body: 'Signs of tympanic membrane injury during procedure.',
    recommendation: 'STOP REMOVAL IMMEDIATELY.\n\nASSESSMENT:\n• Document symptoms: vertigo, tinnitus, hearing loss\n• Attempt visualization of TM (may be obscured)\n• Note time of suspected injury\n\nMANAGEMENT:\n• Keep ear DRY — no drops unless ENT-directed\n• No ototoxic drops (aminoglycosides, polymyxin)\n• If drops needed: ofloxacin or ciprofloxacin/dex only\n• Pain control as needed\n\nDISPOSITION:\n• Urgent ENT referral (within 24-48 hours)\n• Audiometry will be needed\n• Small perforations often heal spontaneously\n• Large perforations may need tympanoplasty\n\nFOREIGN BODY:\n• ENT will remove under controlled conditions\n• Do NOT continue attempts',
    confidence: 'definitive',
    citation: [1, 3],
  },

  {
    id: 'earfb-comp-deeper',
    type: 'result',
    module: 4,
    title: 'Object Pushed Deeper',
    body: 'Foreign body now in medial canal or against TM.',
    recommendation: 'STOP — DO NOT ATTEMPT FURTHER REMOVAL.\n\nRISKS OF CONTINUED ATTEMPTS:\n• TM perforation\n• Ossicular chain injury\n• Hearing loss\n• Object entry into middle ear\n\nMANAGEMENT:\n• Document new position\n• Keep ear dry\n• Urgent ENT referral\n\nENT WILL:\n• Use operative microscope for visualization\n• Have controlled environment for extraction\n• May use tympanomeatal flap approach\n• Can manage complications immediately\n\nThe deeper the object, the higher the complication risk. Do not attempt removal of objects at or near the TM.',
    confidence: 'definitive',
    citation: [3, 4],
  },

  {
    id: 'earfb-comp-intolerance',
    type: 'info',
    module: 4,
    title: 'Patient Intolerance',
    body: 'Patient unable to cooperate for safe removal.\n\nOPTIONS:\n\n1. PROCEDURAL SEDATION (if appropriate setting)\n• Ketamine preferred — maintains airway reflexes\n• Allows controlled removal attempt\n• Consider if object is easily accessible\n\n2. GENERAL ANESTHESIA (ENT referral)\n• For pediatric patients\n• For anxious/uncooperative adults\n• For complex or deep objects\n• For failed sedation attempt\n\n3. DELAY AND RETRY (select cases)\n• If object is stable and non-urgent\n• Can attempt again with better preparation\n• Not appropriate for batteries or sharp objects\n\nPEDIATRIC CONSIDERATIONS:\n• Papoose board alone often insufficient\n• Parental assistance limited value\n• Sedation preferred if >1 attempt needed\n• Low threshold for ENT referral',
    citation: [2, 5],
    next: 'earfb-ent-referral',
  },

  {
    id: 'earfb-ent-referral',
    type: 'result',
    module: 4,
    title: 'ENT Referral',
    body: 'Referral to Otolaryngology indicated.',
    recommendation: 'TIMING:\n• EMERGENT: Button battery\n• URGENT (same day): TM perforation, deep impaction, failed removal with complications\n• ROUTINE (1-3 days): Failed removal without complications, patient intolerance\n\nWHAT TO COMMUNICATE:\n• Object type and location\n• Techniques attempted\n• Complications encountered\n• Current canal and TM status\n• Patient cooperation level\n\nWHILE AWAITING ENT:\n• Keep ear dry\n• Antibiotic drops if canal trauma\n• Pain control PRN\n• Return precautions for worsening symptoms\n\nDOCUMENTATION:\n• Object description and visualized location\n• Techniques attempted (including anesthesia used)\n• Complications or concerns\n• Post-procedure canal/TM exam\n• Reason for referral',
    confidence: 'definitive',
    citation: [1, 3, 4],
  },

  {
    id: 'earfb-dispo',
    type: 'question',
    module: 4,
    title: 'Disposition',
    body: 'Final disposition after successful removal.',
    options: [
      {
        label: 'Discharge home',
        description: 'Uncomplicated removal, no canal injury, TM intact',
        next: 'earfb-discharge',
      },
      {
        label: 'Discharge with ENT follow-up',
        description: 'Minor complication, canal trauma, or concern for residual',
        next: 'earfb-discharge-followup',
      },
    ],
  },

  {
    id: 'earfb-discharge',
    type: 'result',
    module: 4,
    title: 'Discharge — Uncomplicated',
    body: 'Uncomplicated foreign body removal.',
    recommendation: 'DISCHARGE INSTRUCTIONS:\n\nEAR CARE:\n• Keep ear dry for 24-48 hours\n• No swimming or submerging ear\n• Avoid inserting anything in ear (including Q-tips)\n\nMEDICATIONS:\n• Acetaminophen or ibuprofen for discomfort PRN\n• No routine antibiotic drops needed if canal intact\n\nRETURN IF:\n• Increasing pain\n• Drainage from ear (pus, blood)\n• Hearing change\n• Dizziness or ringing\n• Fever\n\nFOLLOW-UP:\n• None routinely needed\n• See PCP if concerns at 1 week\n\nPREVENTION:\n• Do not insert objects in ear\n• Q-tips for outer ear only\n• Hearing protection when appropriate',
    confidence: 'recommended',
    citation: [1],
  },

  {
    id: 'earfb-discharge-followup',
    type: 'result',
    module: 4,
    title: 'Discharge with ENT Follow-up',
    body: 'Successful removal with minor complication or concern.',
    recommendation: 'DISCHARGE WITH ENT APPOINTMENT:\n\nINDICATIONS:\n• Canal laceration or significant trauma\n• Concern for residual material\n• Hearing complaint post-procedure\n• TM appearance abnormal\n\nMEDICATIONS:\n• Otic antibiotic drops (ofloxacin 0.3% or ciprofloxacin/dex) BID x 7 days\n• Pain control PRN\n\nPRECAUTIONS:\n• Keep ear dry\n• No swimming until cleared by ENT\n• Return for worsening symptoms\n\nTIMING:\n• ENT appointment within 1-2 weeks\n• Sooner if symptoms worsen\n\nDOCUMENT:\n• Reason for specialty follow-up\n• Current status of canal and TM\n• What ENT should re-evaluate',
    confidence: 'recommended',
    citation: [1, 3],
  },

];
