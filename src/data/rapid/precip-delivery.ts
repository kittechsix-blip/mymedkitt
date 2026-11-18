import type { RapidStrip } from './types.js';

// Draft for physician review. Expansion text is quoted from the existing consult.
export const RAPID_PRECIP_DELIVERY: RapidStrip = {
  "treeId": "precip-delivery",
  "variants": [
    {
      "id": "delivery",
      "label": "Delivery",
      "tiles": [
        {
          "id": "team",
          "layout": "steps",
          "action": "Call help",
          "figure": "OB + Pediatrics STAT",
          "condition": "Delivery imminent",
          "nodeIds": [
            "precip-callhelp"
          ],
          "lines": [
            {
              "nodeId": "precip-callhelp",
              "text": "Page OB and Pediatrics STAT — even if you've already called, confirm they are en route."
            },
            {
              "nodeId": "precip-callhelp",
              "text": "Minimum 4 people:"
            },
            {
              "nodeId": "precip-callhelp",
              "text": "You — delivering provider (at the perineum)"
            },
            {
              "nodeId": "precip-callhelp",
              "text": "Nurse 1 — assigned to mom (vitals, meds, documentation)"
            },
            {
              "nodeId": "precip-callhelp",
              "text": "Nurse 2 — assigned to baby (warming, stimulation, APGAR)"
            },
            {
              "nodeId": "precip-callhelp",
              "text": "Provider 2 — assigned to baby (Neonatal Resuscitation if needed)"
            },
            {
              "nodeId": "precip-callhelp",
              "text": "Neonatal warmer — turn on now (prewarming)"
            },
            {
              "nodeId": "precip-callhelp",
              "text": "If you are alone, prepare what you can and call for backup."
            }
          ]
        },
        {
          "id": "head-cord",
          "layout": "steps",
          "action": "Support head",
          "figure": "Check nuchal cord",
          "condition": "As head delivers",
          "nodeIds": [
            "precip-head",
            "precip-nuchal"
          ],
          "warning": {
            "nodeId": "precip-head",
            "text": "Let the uterus do the work — do NOT pull on the head"
          },
          "lines": [
            {
              "nodeId": "precip-head",
              "text": "Place one hand on the perineum with a towel — apply gentle upward pressure on the fetal chin through the perineum"
            },
            {
              "nodeId": "precip-head",
              "text": "Other hand on the fetal occiput — apply gentle counter-pressure to control the speed of delivery"
            },
            {
              "nodeId": "precip-head",
              "text": "Routine suctioning of the nose and mouth is NO LONGER recommended (NRP 9th edition). Only suction if the airway is visibly obstructed."
            },
            {
              "nodeId": "precip-nuchal",
              "text": "Immediately after the head delivers, sweep your finger around the baby's neck feeling for the umbilical cord."
            }
          ]
        },
        {
          "id": "shoulders",
          "layout": "steps",
          "action": "Deliver shoulders",
          "figure": "Gentle traction",
          "condition": "Turtle sign: dystocia pathway",
          "nodeIds": [
            "precip-shoulders"
          ],
          "warning": {
            "nodeId": "precip-shoulders",
            "text": "Gentle downward traction for anterior shoulder, then upward — turtle sign = shoulder dystocia emergency"
          },
          "lines": [
            {
              "nodeId": "precip-shoulders",
              "text": "Apply gentle DOWNWARD traction on the head (toward the floor)"
            },
            {
              "nodeId": "precip-shoulders",
              "text": "Guide the anterior shoulder under the pubic symphysis"
            },
            {
              "nodeId": "precip-shoulders",
              "text": "The shoulder should slip out — do NOT force"
            },
            {
              "nodeId": "precip-shoulders",
              "text": "Then apply gentle UPWARD traction (toward the ceiling)"
            },
            {
              "nodeId": "precip-shoulders",
              "text": "Apply traction in the long axis of the fetal neck — pulling at an angle risks brachial plexus injury"
            },
            {
              "nodeId": "precip-shoulders",
              "text": "Use steady, gentle traction — never jerk or twist"
            }
          ]
        },
        {
          "id": "clamp",
          "layout": "steps",
          "action": "Defer clamping",
          "figure": "At least 60 seconds",
          "condition": "No immediate resuscitation needed",
          "nodeIds": [
            "precip-cord"
          ],
          "warning": {
            "nodeId": "precip-cord",
            "text": "DO NOT DROP THE BABY. The baby is wet and slippery."
          },
          "lines": [
            {
              "nodeId": "precip-cord",
              "text": "Place the baby directly on mom's abdomen — skin-to-skin contact"
            },
            {
              "nodeId": "precip-cord",
              "text": "Dry the baby vigorously with a warm towel"
            },
            {
              "nodeId": "precip-cord",
              "text": "Do NOT drop the baby — skin-to-skin, deferred cord clamping at least 60 sec unless resuscitation needed"
            },
            {
              "nodeId": "precip-cord",
              "text": "Clamp the cord in two places, approximately 3 cm apart, with the first clamp ~3 cm from the baby's abdomen"
            },
            {
              "nodeId": "precip-cord",
              "text": "Cut between the two clamps with sterile scissors"
            }
          ]
        },
        {
          "id": "newborn",
          "layout": "steps",
          "action": "Assess newborn",
          "figure": "Not breathing / HR <100",
          "condition": "Initiate neonatal resuscitation",
          "nodeIds": [
            "precip-baby"
          ],
          "lines": [
            {
              "nodeId": "precip-baby",
              "text": "Dry and stimulate the baby with warm towels. Most babies will cry and become pink within the first minute."
            },
            {
              "nodeId": "precip-baby",
              "text": "If the baby is not breathing or heart rate is <100 bpm → initiate NRP (Neonatal Resuscitation Program)."
            },
            {
              "nodeId": "precip-baby",
              "text": "Ensure the baby stays warm — hypothermia is a significant risk in ED deliveries."
            }
          ]
        },
        {
          "id": "placenta",
          "layout": "steps",
          "action": "Deliver placenta",
          "figure": "Never force",
          "condition": "Guard against inversion",
          "nodeIds": [
            "precip-placenta"
          ],
          "warning": {
            "nodeId": "precip-placenta",
            "text": "Gentle cord traction + fundal counter-pressure — NEVER force, aggressive traction risks uterine inversion"
          },
          "lines": [
            {
              "nodeId": "precip-placenta",
              "text": "Cord lengthening — the cord appears to get longer as the placenta detaches"
            },
            {
              "nodeId": "precip-placenta",
              "text": "Gush of blood — normal separation bleeding"
            },
            {
              "nodeId": "precip-placenta",
              "text": "Uterine fundus rises — becomes firm and globular"
            },
            {
              "nodeId": "precip-placenta",
              "text": "Apply gentle, steady traction on the cord with one hand"
            },
            {
              "nodeId": "precip-placenta",
              "text": "Other hand on the uterine fundus — guard against uterine inversion by applying counter-pressure"
            }
          ]
        },
        {
          "id": "oxytocin",
          "layout": "drug",
          "action": "Oxytocin infusion",
          "figure": "20 units / 1 L",
          "condition": "After placental delivery",
          "nodeIds": [
            "precip-oxytocin"
          ],
          "drug": {
            "id": "oxytocin",
            "indication": "Precipitous Delivery — Third Stage"
          },
          "warning": {
            "nodeId": "precip-oxytocin",
            "text": "Do NOT give IV push — can cause profound hypotension."
          },
          "lines": [
            {
              "nodeId": "precip-oxytocin",
              "text": "No IV access: Oxytocin 10 units IM into the anterolateral thigh — this is the WHO-preferred prophylactic route in low-resource or pre-IV settings."
            },
            {
              "nodeId": "precip-oxytocin",
              "text": "Timing: Start after the placenta is delivered. Do not wait to assess bleeding — empiric oxytocin decreases postpartum hemorrhage risk."
            }
          ]
        }
      ]
    }
  ]
};
