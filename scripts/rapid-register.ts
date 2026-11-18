// Regenerates src/data/rapid/index.ts from the strip files present in src/data/rapid/ (read -> assert -> write).
//   node scripts/rapid-register.ts            write index.ts and print the list
//   node scripts/rapid-register.ts --check    exit 1 if index.ts is out of date (writes nothing)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib/rapid-load.ts';
import { exportName, renderIndex, stripIdsFromFiles } from './lib/rapid-register-lib.ts';

const DIR = join(ROOT, 'src/data/rapid');
const FILE = join(DIR, 'index.ts');
const ids = stripIdsFromFiles(readdirSync(DIR));

// assert: each strip file exports its derived name
for (const id of ids) {
  const src = readFileSync(join(DIR, `${id}.ts`), 'utf8');
  if (!new RegExp(`export const ${exportName(id)}\\b`).test(src)) {
    console.error(`${id}.ts must export "${exportName(id)}" (RAPID_ + treeId upper-cased, non-alphanumerics as "_")`);
    process.exit(1);
  }
}
const next = renderIndex(ids);
const current = readFileSync(FILE, 'utf8');
if (process.argv.includes('--check')) {
  if (current !== next) { console.error('src/data/rapid/index.ts is out of date: run `node scripts/rapid-register.ts`'); process.exit(1); }
  console.log(`index.ts is up to date (${ids.length} strips)`);
  process.exit(0);
}
if (!current.includes('export const RAPID_STRIPS')) { console.error('index.ts has an unexpected shape; not writing'); process.exit(1); }
writeFileSync(FILE, next);
console.log(`index.ts regenerated: ${ids.length} strips`);
for (const id of ids) console.log(`  ${id} -> ${exportName(id)}`);
