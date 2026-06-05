// myMedKitt — Tricks of the Trade registry
//
// Single source of truth for the "Tricks of the Trade" section. Each entry is a
// medical specialty whose tricks live in a single InfoPage (id = `infoPageId`).
// The tricks-home grid renders one card per specialty; tapping a card opens that
// specialty's InfoPage modal (#/info/<infoPageId>).
//
// To add a trick: append an InfoSection to the matching InfoPage in info-pages.ts.
// To add a specialty: add an entry here AND create its InfoPage in info-pages.ts.
//
// `trickCount` is informational (shown on the card). Keep it roughly in sync with
// the number of trick sections in the page; it is not load-bearing.

export interface TrickSpecialty {
  /** Stable id, kebab-case. */
  id: string;
  /** Display label on the card. */
  label: string;
  /** Emoji icon for the card. */
  icon: string;
  /** Accent color (hex) for the card gradient. */
  color: string;
  /** Short one-line description shown on the card. */
  subtitle: string;
  /** The InfoPage id that holds this specialty's tricks. */
  infoPageId: string;
  /** Approx number of tricks currently in the page (display only). */
  trickCount: number;
}

export const TRICK_SPECIALTIES: TrickSpecialty[] = [
  {
    id: 'airway',
    label: 'Airway',
    icon: '\uD83D\uDEAC', // 🫁-ish; use lungs
    color: '#1565C0',
    subtitle: 'Suction, NG placement, supraglottic exchange, and more.',
    infoPageId: 'tricks-airway',
    trickCount: 4,
  },
  {
    id: 'procedures',
    label: 'Procedures & Access',
    icon: '\uD83E\uDE7A', // 🩺
    color: '#00838F',
    subtitle: 'IV access, tamponade, lavage, and bedside procedure hacks.',
    infoPageId: 'tricks-procedures',
    trickCount: 14,
  },
  {
    id: 'ent',
    label: 'ENT',
    icon: '\uD83D\uDC42', // 👂
    color: '#6A1B9A',
    subtitle: 'Epistaxis packing tricks and nasal suction.',
    infoPageId: 'tricks-ent',
    trickCount: 6,
  },
  {
    id: 'dental',
    label: 'Dental',
    icon: '\uD83E\uDDB7', // 🦷
    color: '#6D4C41',
    subtitle: 'Extraction bleeding, dry socket, and oral hemostasis pearls.',
    infoPageId: 'tricks-dental',
    trickCount: 6,
  },
  {
    id: 'ophtho',
    label: 'Ophthalmology',
    icon: '\uD83D\uDC41\uFE0F', // 👁️
    color: '#2E7D32',
    subtitle: 'Bedside IOP screen, glue-in-eye, and ocular tricks.',
    infoPageId: 'tricks-ophtho',
    trickCount: 4,
  },
  {
    id: 'urology',
    label: 'Urology',
    icon: '\uD83D\uDEBD', // 🚽
    color: '#EF6C00',
    subtitle: 'Voiding trials, priapism, and entrapment releases.',
    infoPageId: 'tricks-urology',
    trickCount: 3,
  },
  {
    id: 'wound',
    label: 'Wound Care',
    icon: '\uD83E\uDE79', // 🩹
    color: '#AD1457',
    subtitle: 'Glue repairs, gel for scalp lacs, bloodless fields.',
    infoPageId: 'tricks-wound',
    trickCount: 3,
  },
  {
    id: 'cardiology',
    label: 'Cardiology',
    icon: '\u2764\uFE0F', // ❤️
    color: '#C62828',
    subtitle: 'Rapid adenosine delivery and rhythm tricks.',
    infoPageId: 'tricks-cardiology',
    trickCount: 2,
  },
  {
    id: 'neuro',
    label: 'Neurology',
    icon: '\uD83E\uDDE0', // 🧠
    color: '#4527A0',
    subtitle: 'Bedside CN testing and BPPV maneuvers.',
    infoPageId: 'tricks-neuro',
    trickCount: 3,
  },
  {
    id: 'tox',
    label: 'Toxicology',
    icon: '\u2620\uFE0F', // ☠️
    color: '#37474F',
    subtitle: 'Antiemetic and toxidrome management pearls.',
    infoPageId: 'tricks-tox',
    trickCount: 1,
  },
  {
    id: 'general',
    label: 'General & Diagnostics',
    icon: '\uD83D\uDD2C', // 🔬
    color: '#455A64',
    subtitle: 'Fast bedside screens, dosing pearls, communication.',
    infoPageId: 'tricks-general',
    trickCount: 6,
  },
  {
    id: 'ortho',
    label: 'Orthopedics',
    icon: '\uD83E\uDDB4', // 🦴
    color: '#5D4037',
    subtitle: 'Reduction and splinting tricks (growing daily).',
    infoPageId: 'tricks-ortho',
    trickCount: 9,
  },
];

/** Lookup a specialty by its id. */
export function getTrickSpecialty(id: string): TrickSpecialty | undefined {
  return TRICK_SPECIALTIES.find((s) => s.id === id);
}

/** A single trick distilled from an InfoPage section, for the scannable directory. */
export interface TrickListItem {
  /** Trick title (= section heading). */
  title: string;
  /** One-line "what it solves" blurb (from the Accomplishes: line). */
  blurb: string;
  /** Anchor id of the full section inside the modal (= trick-<slug>). */
  anchorId: string;
}

/** Minimal shape we read off an InfoPage section (avoids importing the full type). */
interface TrickSection {
  heading?: string;
  body?: string;
}

function slugAnchor(heading: string): string {
  return 'trick-' + heading
    .toLowerCase()
    .replace(/[\u2018\u2019']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract the one-line description from a trick body. The authoring pattern is
 * `**Accomplishes:** <blurb>. [N] ...`. We take the text after "Accomplishes:"
 * up to the first citation marker or line break. Falls back to the first line
 * of the body. Returns '' for placeholder sections.
 */
function extractBlurb(body: string): string {
  if (!body) return '';
  const clean = body.replace(/\\n/g, '\n');
  const m = clean.match(/\*\*Accomplishes:\*\*\s*([\s\S]*?)(?:\s*\[\d+\]|\n|$)/);
  let blurb = m ? m[1] : clean.split('\n')[0];
  blurb = blurb
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[\d+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (blurb.length > 140) blurb = blurb.slice(0, 137).trimEnd() + '\u2026';
  return blurb;
}

const PLACEHOLDER_RE = /being added daily|coming soon/i;

/**
 * Distill an InfoPage's sections into a sorted, scannable trick list.
 * `page` is the InfoPage returned by getInfoPage() (three-tier source), passed
 * in so this data module stays free of service imports. Sorted A->Z by title.
 */
export function getTrickList(page: { sections?: TrickSection[] } | undefined): TrickListItem[] {
  if (!page || !page.sections) return [];
  const items: TrickListItem[] = [];
  for (const s of page.sections) {
    if (!s.heading) continue;
    if (PLACEHOLDER_RE.test(s.heading) || PLACEHOLDER_RE.test(s.body || '')) continue;
    items.push({
      title: s.heading,
      blurb: extractBlurb(s.body || ''),
      anchorId: slugAnchor(s.heading),
    });
  }
  items.sort((a, b) => a.title.localeCompare(b.title));
  return items;
}
