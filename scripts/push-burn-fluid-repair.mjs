// Focused, non-destructive publication of only the two corrected Dell Seton cards.
// The general supabase-push --update helper deletes/reinserts the whole consult;
// this repair deliberately PATCHes body/summary/treatment on two existing rows instead.
import { readFileSync } from 'node:fs';
import { BURNS_NODES } from '../docs/data/trees/burns.js';
const ids = ['burn-dsmc-moderate', 'burn-dsmc-severe'];
const nodes = ids.map(id => BURNS_NODES.find(n => n.id === id));
if (nodes.some(n => !n?.body.includes('125 mL/hr'))) throw new Error('Compile the corrected cards before publishing.');
if (!process.argv.includes('--apply')) {
 console.log('Dry run: PATCH body, summary, and obsolete duplicate treatment for burn-dsmc-moderate and burn-dsmc-severe. No deletes, inserts, or other tools.');
 process.exit(0);
}
const envText = readFileSync(new URL('../.env', import.meta.url), 'utf8');
const match = envText.match(/^SUPABASE_SERVICE_ROLE_KEY=(.+)$/m);
if (!match) throw new Error('Required service credential unavailable.');
const key = match[1].trim().replace(/^['"]|['"]$/g, '');
const base = 'https://kzzqloklnxlqbccxbxgr.supabase.co/rest/v1/decision_nodes';
const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
for (const node of nodes) {
 const url = `${base}?tree_id=eq.burns&id=eq.${node.id}`;
 const existing = await fetch(`${url}&select=id`, { headers });
 if (!existing.ok || (await existing.json()).length !== 1) throw new Error(`Expected exactly one existing ${node.id} row.`);
 const patch = { body: node.body, summary: node.summary, treatment: null };
 const response = await fetch(url, { method: 'PATCH', headers: { ...headers, Prefer: 'return=representation' }, body: JSON.stringify(patch) });
 if (!response.ok) throw new Error(`PATCH ${node.id} failed (HTTP ${response.status}).`);
 const rows = await response.json();
 if (rows.length !== 1 || rows[0].body !== node.body || rows[0].summary !== node.summary || rows[0].treatment !== null) throw new Error(`Verification failed for ${node.id}.`);
 console.log(`Verified ${node.id}: body/summary corrected, obsolete duplicate treatment cleared; other fields untouched.`);
}
