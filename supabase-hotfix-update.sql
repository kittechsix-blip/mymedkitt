-- =====================================================================
-- MedKitt — Auto-generated UPDATE SQL for changed nodes
-- Generated: 2026-11-15
-- Review carefully, then paste into Supabase SQL Editor.
-- =====================================================================

BEGIN;

-- Node: lp-approach-choice (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"question","module":3,"title":"LP Approach Selection","body":"**Choose your approach:** [1][2][12]\n\n**MIDLINE Approach:**\n• Standard technique\n• Needle through interspinous ligaments\n• Requires good spine flexion\n\n**PARAMEDIAN Approach:**\n• **30-40% higher first-attempt success** than midline\n• Avoids supraspinous/interspinous ligaments\n• Does NOT require full spine flexion\n• Better for: elderly (calcified ligaments), kyphosis/scoliosis, failed midline\n• Lower PDPH incidence\n\n**Consider PARAMEDIAN if:**\n• Failed midline attempts\n• Calcified ligaments (age >50)\n• Severe degenerative changes\n• Cannot flex spine adequately\n• Kyphosis or scoliosis\n\nPredicted difficult anatomy (obesity, nonpalpable landmarks) or prior failed attempts: [Ultrasound-guided technique](#/info/lp-ultrasound) to mark midline, level, and depth.\n\nWhich approach will you use?","options":[{"label":"Midline approach","description":"Standard technique — through interspinous space","next":"lp-midline-start"},{"label":"Paramedian approach","description":"30-40% higher success — avoids ligaments. Opens 3-step visual guide.","next":"lp-paramedian-steps"}],"summary":"Midline approach is standard; paramedian for elderly or difficult anatomy (calcified ligaments)"}'::jsonb
WHERE id = 'lp-approach-choice' AND tree_id = 'lumbar-puncture';

-- Node: lp-failed (1 field(s) changed)
UPDATE decision_nodes SET data = '{"type":"info","module":8,"title":"Failed LP — Next Steps","body":"**Failed LP — Options:**\n\n**1. Reassess technique:**\n• Confirm landmarks (consider US; see [Ultrasound-guided technique](#/info/lp-ultrasound))\n• Try different interspace (L3-L4 vs L4-L5)\n• Optimize positioning (more flexion)\n• Try sitting position if in lateral\n\n**2. Try PARAMEDIAN approach:**\n• 30-40% higher success than midline\n• Especially useful if calcified ligaments\n\n**3. Ultrasound guidance** ([technique](#/info/lp-ultrasound)):\n• Mark midline, level, and depth\n• First-attempt success: 87% (US) vs 50% (landmark)\n• Especially useful in obese patients\n\n**4. Fluoroscopy-guided LP:**\n• Performed by interventional radiology\n• Gold standard for difficult anatomy\n• Indicated after failed bedside attempts\n\n**5. Alternative diagnosis:**\n• If meningitis suspected: Treat empirically, try LP later\n• Blood cultures may yield organism\n• Consider empiric treatment based on clinical syndrome\n\n**Maximum attempts:**\n• No strict rule, but multiple attempts increase PDPH risk\n• Consider stopping after 3-4 failed attempts\n• Consult IR or anesthesia for assistance [1]","citation":[1],"next":"lp-disposition","summary":"Failed LP: reposition, try one level up/down, use ultrasound guidance, or paramedian approach"}'::jsonb
WHERE id = 'lp-failed' AND tree_id = 'lumbar-puncture';

COMMIT;