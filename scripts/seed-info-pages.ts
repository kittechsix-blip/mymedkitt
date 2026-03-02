// MedKitt — Seed info_pages table from hardcoded data
// Run: SUPABASE_URL=... SUPABASE_SERVICE_KEY=... bun scripts/seed-info-pages.ts

import { INFO_PAGES } from '../src/data/info-pages.js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY env vars');
  process.exit(1);
}

async function seed() {
  const pages = Object.values(INFO_PAGES);
  console.log(`Seeding ${pages.length} info pages...`);

  const rows = pages.map((page, index) => ({
    id: page.id,
    title: page.title,
    subtitle: page.subtitle,
    sections: page.sections,
    citations: page.citations,
    shareable: page.shareable ?? false,
    sort_order: index,
  }));

  const res = await fetch(`${SUPABASE_URL}/rest/v1/info_pages`, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_SERVICE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify(rows),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed: ${res.status} ${text}`);
    process.exit(1);
  }

  console.log(`Successfully seeded ${pages.length} info pages.`);
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
