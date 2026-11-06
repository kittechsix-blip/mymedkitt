// Manufacturer-based landmark guidance shared by IO Sites and the Anatomy tool.
export const IO_SOURCES = [
    "Teleflex. EZ-IO Proximal Humerus Insertion Site Identification. https://www.teleflex.com/usa/en/product-areas/emergency-medicine/intraosseous-access/arrow-ez-io-system/literature/EM_EZ-IO_Proximal-Humerus-Data-Sheet_MC-000620rev2b.pdf",
    'Teleflex. Arrow EZ-IO US Instructions for Use, 8049. https://www.teleflexvascular.com/files/ifu/8049.pdf',
    'Teleflex. Arrow EZ-IO Pocket Guide (2023), anatomical landmarks and insertion. https://www.teleflex.com/emea/en/product-areas/emergency-medicine/intraosseous-access/arrow-ez-io-system/literature/MCI-101184-EMS-BR-EZ-IO-PocketGuide-EMEA-2023-LR.pdf',
];
export const IO_SAFETY = 'EZ-IO-specific guide. Confirm device labeling and local training. Do not use a fractured target bone, infected insertion site, a site with significant prior orthopedic surgery/prosthesis, a bone accessed or attempted within 48 hours, or a site where excessive tissue or unidentifiable landmarks prevent safe placement. Avoid burned skin when an alternative site is available. Distal femur is a pediatric EZ-IO site, not an adult site. Age alone does not establish landmark suitability.';
export const IO_CONFIRM = 'Select needle length by tissue depth and site, not age or color alone. With the tip touching bone, at least one black depth mark (5 mm) must remain visible above skin before drilling. If not, choose a longer needle or another site. Prep skin, stabilize the limb, and keep fingers out of the needle path. Use gentle steady pressure with the driver. In infants and children, release the trigger when the sudden decrease in resistance (give/pop) indicates marrow entry. The adult US IFU instead directs approximately 1 cm further advancement after marrow entry; most adult proximal-humerus insertions advance until the hub is flush with skin. Follow the exact age/site/device instructions and do not apply the adult advancement rule to children. Never advance to a fixed depth from a drawing. Remove the stylet, secure the catheter and connect primed extension tubing. Check a stable catheter, aspirate if possible, then assess a flush for flow and absence of swelling/leakage. No aspirate alone does not prove failure. Treat IO infusion pain per protocol before flushing in responsive patients. Reassess the limb during every infusion; stop immediately for swelling, leakage, severe unexpected pain or compartment concern. Obtain durable vascular access as soon as practical.';
export const IO_SITES = [
    {
        id: 'proximal-tibia', title: 'Proximal tibia', image: 'io-proximal-tibia-anatomy.svg',
        position: 'Extend the leg. Support and stabilize the knee and lower leg.',
        adult: 'Palpate the tibial tuberosity and flat anteromedial tibial surface. In adults and larger children, target approximately 2 cm medial to the tuberosity. If the tuberosity is not palpable, identify the flat surface approximately 3 cm below the inferior patellar border. Confirm by palpation; these are approximate, size-dependent landmarks.',
        pediatric: 'In neonates and small children, target approximately 1 cm medial to the tibial tuberosity. If it is not palpable, use approximately 1–2 cm below the patella and approximately 1 cm medial, on the flat tibial surface. Identify the proximal tibial growth plate region and remain distal to it; do not use adult distances on a small child.',
        trajectory: 'Insert at 90° to the bone surface, through the flat anteromedial cortex. Do not aim toward the knee joint or growth plate.',
        pitfalls: 'The tuberosity is a landmark, not the insertion target. Avoid the sharp anterior tibial crest and lateral fibula. If the flat surface cannot be confidently palpated, choose another site.',
    },
    {
        id: 'distal-tibia', title: 'Distal tibia', image: 'io-distal-tibia-anatomy.svg',
        position: 'Support the ankle and expose the medial lower leg. Palpate the medial malleolus and both borders of the tibia.',
        adult: 'Target the flat medial tibial surface approximately 3 cm proximal to the most prominent part of the medial malleolus, centered between the anterior and posterior tibial borders.',
        pediatric: 'In a neonate or small child, the target is approximately 1–2 cm proximal to the most prominent medial malleolus, centered on the flat medial tibia. Distances depend on child size; identify the bone rather than scaling a diagram.',
        trajectory: 'Insert at 90° to the bone surface. The approach is from the medial side, not from the front of the ankle.',
        pitfalls: 'Do not puncture the malleolus or ankle joint. Stay on palpable flat bone, not posterior to it where neurovascular structures pass. Confirm landmarks and avoid the physis.',
    },
    {
        id: 'proximal-humerus', title: 'Proximal humerus', image: 'io-proximal-humerus-anatomy.svg',
        position: 'Adduct the arm and internally rotate it. Place the hand over the abdomen, with the elbow close to the body. Keep this position while landmarking and inserting.',
        adult: 'Palpate the proximal humerus and identify the greater tubercle at the most prominent anterior-lateral aspect. Locate the surgical neck and target the greater tubercle above it. Do not use the acromion as the puncture site.',
        pediatric: 'Use only when the greater tubercle and surgical neck can be confidently identified and tissue depth permits appropriate needle selection. The proximal humerus is not reliably landmarked in every small child; select another approved site when uncertain.',
        trajectory: 'Aim approximately 45° to the anterior plane, posteromedially toward the opposite hip. This is a three-dimensional direction; do not copy a screen angle or use the tibial 90° approach.',
        pitfalls: 'Maintain internal rotation. Secure the arm; avoid raising it more than 45° after insertion because this can dislodge the catheter. Soft tissue depth often requires a longer needle, but verify the visible depth mark at bone.',
    },
    {
        id: 'distal-femur', title: 'Distal femur · pediatric', image: 'io-distal-femur-anatomy.svg',
        position: 'Extend the knee. Stabilize the distal thigh and secure the leg so the knee does not bend during or after placement.',
        adult: 'Not an adult EZ-IO site. Use an approved tibial or humeral site in adults.',
        pediatric: 'In neonates and young children, palpate the superior patellar border. Target approximately 1–2 cm proximal to it and approximately 1 cm medial to the femoral midline, on the anterior distal femur. These distances are size-dependent young-child landmarks, not a universal rule for every pediatric age. The US IFU lists distal femur for pediatric patients (21 years or younger); age eligibility does not replace suitable anatomy and device-specific training.',
        trajectory: 'Insert at 90° to the bone surface. The intended site is proximal to the distal femoral physis and knee joint; do not aim toward either.',
        pitfalls: 'Do not use a flexed knee or puncture the patella. Avoid the growth plate. If the appropriate anterior femoral target cannot be confidently identified, use another approved site.',
    },
];
