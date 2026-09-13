// Burn-Kitt TBSA body-map geometry.
//
// The map is deliberately split into clinically meaningful surfaces rather
// than using one silhouette per limb. Each visible region has a matching
// percentage entry below, so painted area and TBSA cannot drift apart.

const VIEWBOX_W = 240;

/** Reflect the right-side path across the body's 120px midline. */
export function mirrorX(d: string): string {
  const segments = d.match(/[A-Za-z][^A-Za-z]*/g) ?? [];
  return segments
    .map((segment) => {
      const cmd = segment[0];
      if (cmd === "Z" || cmd === "z") return cmd;
      const nums = segment
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(Number);
      const mirrored = nums.map((n, i) => (i % 2 === 0 ? VIEWBOX_W - n : n));
      return `${cmd}${mirrored.join(" ")}`;
    })
    .join(" ");
}

// ---------------------------------------------------------------------------
// Adult. Head/neck, trunk, and each limb surface are separate regions. This
// makes the illustration easier to recognize and keeps the Rule of Nines
// totals correct: posterior trunk = upper back 9% + lower back 4% + buttocks
// 2.5% each.
// ---------------------------------------------------------------------------

const ADULT_HEAD =
  "M105 88 C90 78 83 63 85 45 C87 24 100 14 120 14 C140 14 153 24 155 45 C157 63 150 78 135 88 C125 94 115 94 105 88 Z";

const ADULT_NECK =
  "M105 88 C115 94 125 94 135 88 L135 108 L150 114 C134 126 106 126 90 114 L105 108 Z";

const ADULT_UPPER_TRUNK =
  "M90 114 C106 126 134 126 150 114 L164 118 L178 143 L161 210 L79 210 L62 143 L76 118 Z";

const ADULT_LOWER_TRUNK =
  "M79 210 L161 210 C164 235 165 252 160 273 L135 290 L120 300 L105 290 L80 273 C75 252 76 235 79 210 Z";

const ADULT_LOWER_BACK =
  "M79 210 L161 210 C164 235 165 252 160 273 L120 277 L80 273 C75 252 76 235 79 210 Z";

const ADULT_PERINEUM =
  "M105 290 L120 300 L135 290 L120 312 Z";

const ADULT_RIGHT_BUTTOCK =
  "M120 277 L160 273 C167 292 168 310 162 330 C146 339 132 335 120 324 Z";

const ADULT_RIGHT_UPPER_ARM =
  "M164 118 C185 120 192 142 196 163 L207 219 L187 225 L178 181 L178 143 Z";

const ADULT_RIGHT_FOREARM =
  "M187 225 L207 219 C215 245 220 265 221 286 L202 291 C197 268 191 249 187 225 Z";

const ADULT_RIGHT_HAND =
  "M202 291 L221 286 L226 308 C228 322 226 336 222 339 L211 340 C204 335 201 323 197 312 C195 306 198 300 203 307 Z";

const ADULT_RIGHT_THIGH =
  "M135 290 L160 273 C170 300 168 332 164 356 L155 410 L132 410 C127 380 125 344 120 312 Z";

const ADULT_RIGHT_LOWER_LEG =
  "M132 410 L155 410 C165 440 158 470 153 494 L150 531 L134 531 L131 485 C126 455 128 430 132 410 Z";

const ADULT_RIGHT_FOOT =
  "M134 531 L150 531 C152 542 159 547 168 552 C173 556 172 565 165 567 L134 567 C128 559 131 544 134 531 Z";

function buildSide(rightRegions: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [id, d] of Object.entries(rightRegions)) {
    out[id] = d;
    out[id.replace(/^right-/, "left-")] = mirrorX(d);
  }
  return out;
}

export const TBSA_ADULT_FRONT: Record<string, string> = {
  "head-front": ADULT_HEAD,
  "neck-front": ADULT_NECK,
  chest: ADULT_UPPER_TRUNK,
  abdomen: ADULT_LOWER_TRUNK,
  perineum: ADULT_PERINEUM,
  ...buildSide({
    "right-upper-arm-front": ADULT_RIGHT_UPPER_ARM,
    "right-forearm-front": ADULT_RIGHT_FOREARM,
    "right-hand-front": ADULT_RIGHT_HAND,
    "right-thigh-front": ADULT_RIGHT_THIGH,
    "right-lower-leg-front": ADULT_RIGHT_LOWER_LEG,
    "right-foot-front": ADULT_RIGHT_FOOT,
  }),
};

export const TBSA_ADULT_BACK: Record<string, string> = {
  "head-back": ADULT_HEAD,
  "neck-back": ADULT_NECK,
  "upper-back": ADULT_UPPER_TRUNK,
  "lower-back": ADULT_LOWER_BACK,
  ...buildSide({
    "right-buttock": ADULT_RIGHT_BUTTOCK,
    "right-upper-arm-back": ADULT_RIGHT_UPPER_ARM,
    "right-forearm-back": ADULT_RIGHT_FOREARM,
    "right-hand-back": ADULT_RIGHT_HAND,
    "right-thigh-back": ADULT_RIGHT_THIGH,
    "right-lower-leg-back": ADULT_RIGHT_LOWER_LEG,
    "right-foot-back": ADULT_RIGHT_FOOT,
  }),
};

// Adult Rule of Nines. Head + neck = 9%; posterior trunk remains 18% after
// separating the buttocks from the lower back for a more anatomical map.
export const TBSA_ADULT_PCT: Record<string, number> = {
  "head-front": 3.5,
  "head-back": 3.5,
  "neck-front": 1,
  "neck-back": 1,
  chest: 9,
  abdomen: 9,
  "upper-back": 9,
  "lower-back": 4,
  "right-upper-arm-front": 2,
  "right-upper-arm-back": 2,
  "right-forearm-front": 1.5,
  "right-forearm-back": 1.5,
  "right-hand-front": 1,
  "right-hand-back": 1,
  "left-upper-arm-front": 2,
  "left-upper-arm-back": 2,
  "left-forearm-front": 1.5,
  "left-forearm-back": 1.5,
  "left-hand-front": 1,
  "left-hand-back": 1,
  "right-thigh-front": 4.5,
  "right-thigh-back": 4.5,
  "right-lower-leg-front": 3.5,
  "right-lower-leg-back": 3.5,
  "right-foot-front": 1,
  "right-foot-back": 1,
  "left-thigh-front": 4.5,
  "left-thigh-back": 4.5,
  "left-lower-leg-front": 3.5,
  "left-lower-leg-back": 3.5,
  "left-foot-front": 1,
  "left-foot-back": 1,
  "right-buttock": 2.5,
  "left-buttock": 2.5,
  perineum: 1,
};

// ---------------------------------------------------------------------------
// Pediatric Lund-Browder silhouette. It intentionally gives the child a
// larger head, shorter trunk, and shorter legs. Percentages shift by age,
// while hands and feet remain separate on front and back views.
// ---------------------------------------------------------------------------

const PEDS_HEAD =
  "M100 105 C78 97 68 78 68 57 C68 28 91 10 120 10 C149 10 172 28 172 57 C172 78 162 97 140 105 C128 114 112 114 100 105 Z";

const PEDS_NECK =
  "M100 105 C112 114 128 114 140 105 L140 128 L152 134 C136 146 104 146 88 134 L100 128 Z";

const PEDS_UPPER_TRUNK =
  "M88 134 C104 146 136 146 152 134 L164 140 L178 162 L161 236 L79 236 L62 162 L76 140 Z";

const PEDS_LOWER_TRUNK =
  "M79 236 L161 236 C167 258 167 279 160 300 L135 317 L120 327 L105 317 L80 300 C73 279 73 258 79 236 Z";

const PEDS_LOWER_BACK =
  "M79 236 L161 236 C167 258 167 279 160 300 L120 304 L80 300 C73 279 73 258 79 236 Z";

const PEDS_PERINEUM =
  "M105 317 L120 327 L135 317 L120 339 Z";

const PEDS_RIGHT_BUTTOCK =
  "M120 304 L160 300 C167 317 169 336 162 351 C146 362 132 358 120 351 Z";

const PEDS_RIGHT_UPPER_ARM =
  "M164 140 C184 142 193 161 198 183 L208 238 L188 244 L179 201 L178 162 Z";

const PEDS_RIGHT_FOREARM =
  "M188 244 L208 238 C214 258 219 278 220 299 L201 304 C196 284 190 265 188 244 Z";

const PEDS_RIGHT_HAND =
  "M201 304 L220 299 L225 319 C227 332 225 345 220 349 L209 350 C203 345 199 333 196 324 C193 319 197 313 202 319 Z";

const PEDS_RIGHT_THIGH =
  "M135 317 L160 300 C171 326 167 356 163 379 L156 431 L132 431 C127 402 125 368 120 339 Z";

const PEDS_RIGHT_LOWER_LEG =
  "M132 431 L156 431 C163 456 159 481 154 504 L151 545 L133 545 L131 503 C126 478 128 452 132 431 Z";

const PEDS_RIGHT_FOOT =
  "M133 545 L151 545 C153 555 160 560 169 566 C173 571 171 579 164 581 L134 581 C128 573 130 558 133 545 Z";

export const TBSA_PEDS_FRONT: Record<string, string> = {
  "head-front": PEDS_HEAD,
  "neck-front": PEDS_NECK,
  chest: PEDS_UPPER_TRUNK,
  abdomen: PEDS_LOWER_TRUNK,
  perineum: PEDS_PERINEUM,
  ...buildSide({
    "right-upper-arm-front": PEDS_RIGHT_UPPER_ARM,
    "right-forearm-front": PEDS_RIGHT_FOREARM,
    "right-hand-front": PEDS_RIGHT_HAND,
    "right-thigh-front": PEDS_RIGHT_THIGH,
    "right-lower-leg-front": PEDS_RIGHT_LOWER_LEG,
    "right-foot-front": PEDS_RIGHT_FOOT,
  }),
};

export const TBSA_PEDS_BACK: Record<string, string> = {
  "head-back": PEDS_HEAD,
  "neck-back": PEDS_NECK,
  "upper-back": PEDS_UPPER_TRUNK,
  "lower-back": PEDS_LOWER_BACK,
  ...buildSide({
    "right-buttock": PEDS_RIGHT_BUTTOCK,
    "right-upper-arm-back": PEDS_RIGHT_UPPER_ARM,
    "right-forearm-back": PEDS_RIGHT_FOREARM,
    "right-hand-back": PEDS_RIGHT_HAND,
    "right-thigh-back": PEDS_RIGHT_THIGH,
    "right-lower-leg-back": PEDS_RIGHT_LOWER_LEG,
    "right-foot-back": PEDS_RIGHT_FOOT,
  }),
};

export interface LundBrowderAge {
  label: string;
  headTotal: number;
  eachThighTotal: number;
  eachLowerLegTotal: number;
}

export const LUND_BROWDER_AGES: LundBrowderAge[] = [
  { label: "0–1 year", headTotal: 19, eachThighTotal: 5.5, eachLowerLegTotal: 5 },
  { label: "1–4 years", headTotal: 17, eachThighTotal: 6.5, eachLowerLegTotal: 5 },
  { label: "5–9 years", headTotal: 13, eachThighTotal: 8, eachLowerLegTotal: 5.5 },
  { label: "10–14 years", headTotal: 11, eachThighTotal: 8.5, eachLowerLegTotal: 6 },
];

export function buildPedsPct(ageIdx: number): Record<string, number> {
  const a = LUND_BROWDER_AGES[ageIdx] ?? LUND_BROWDER_AGES[0];
  return {
    "head-front": a.headTotal / 2,
    "head-back": a.headTotal / 2,
    "neck-front": 1,
    "neck-back": 1,
    chest: 6.5,
    abdomen: 6.5,
    "upper-back": 6.5,
    "lower-back": 6.5,
    "right-upper-arm-front": 2,
    "right-upper-arm-back": 2,
    "right-forearm-front": 1.5,
    "right-forearm-back": 1.5,
    "right-hand-front": 1.25,
    "right-hand-back": 1.25,
    "left-upper-arm-front": 2,
    "left-upper-arm-back": 2,
    "left-forearm-front": 1.5,
    "left-forearm-back": 1.5,
    "left-hand-front": 1.25,
    "left-hand-back": 1.25,
    "right-thigh-front": a.eachThighTotal / 2,
    "right-thigh-back": a.eachThighTotal / 2,
    "right-lower-leg-front": a.eachLowerLegTotal / 2,
    "right-lower-leg-back": a.eachLowerLegTotal / 2,
    "right-foot-front": 1.75,
    "right-foot-back": 1.75,
    "left-thigh-front": a.eachThighTotal / 2,
    "left-thigh-back": a.eachThighTotal / 2,
    "left-lower-leg-front": a.eachLowerLegTotal / 2,
    "left-lower-leg-back": a.eachLowerLegTotal / 2,
    "left-foot-front": 1.75,
    "left-foot-back": 1.75,
    "right-buttock": 2.5,
    "left-buttock": 2.5,
    perineum: 1,
  };
}
