/**
 * Writes the app's search input (a BuildInput) as JSON, for the bedside-search skill's framework-neutral scorer:
 *   node scripts/export-search-input.ts /tmp/mymedkitt-search-input.json
 * Requires `bunx tsc` and the index scripts to have run (same as the search gate).
 */
import fs from 'node:fs';
import { loadInput } from './search-corpus.ts';

const out = process.argv[2];
if (!out) throw new Error('usage: export-search-input.ts <out.json>');
const input = await loadInput();
fs.writeFileSync(out, JSON.stringify(input));
console.log(`wrote ${out}: ${input.consults.length} consults, ${input.nodes.length} nodes, ${input.info.length} info sections, ${input.drugs.length} drugs, ${input.calcs.length} calculators`);
