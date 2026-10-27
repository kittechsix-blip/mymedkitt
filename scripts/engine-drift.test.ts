/**
 * Gate: the vendored search engine is the canonical engine, unedited.
 *
 *   1. unedited   the body still hashes to the sha stamped in its header (needs nothing outside this repo, so it runs in CI)
 *   2. canonical  when ~/.claude/skills/bedside-search is installed, the stamp matches the skill's current engine
 *                 (skipped where the skill is absent, e.g. on Vercel)
 *
 * Fix a failure by changing the CANONICAL engine, never the vendored copy:
 *   node ~/.claude/skills/bedside-search/bin/sync-engine.mjs <this app's engine path> --app <name>
 *
 * Adjust ENGINE_PATH to where this app keeps the file.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ENGINE_PATH = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/services/question-search.ts');
const HEADER_LINES = 3;
const sha = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

const lines = fs.readFileSync(ENGINE_PATH, 'utf8').split('\n');
const version = (lines[0].match(/@bedside-search-engine (\S+)/) ?? [])[1];
const stamped = (lines[1].match(/@engine-sha256 (\w+)/) ?? [])[1];
const body = lines.slice(HEADER_LINES).join('\n');

test('the search engine carries a stamp (it is a vendored copy, not a fork)', () => {
  assert.ok(version && stamped, 'no @bedside-search-engine stamp: run bin/sync-engine.mjs');
});

test('the vendored search engine is unedited', () => {
  assert.equal(sha(body), stamped, 'the vendored engine was edited locally: change the canonical copy and re-sync');
});

test('the vendored search engine is the skill\'s current engine', (t) => {
  const canon = path.join(os.homedir(), '.claude/skills/bedside-search/engine/question-search.ts');
  if (!fs.existsSync(canon)) return t.skip('skill not installed here');
  assert.equal(stamped, sha(fs.readFileSync(canon, 'utf8')), 'the canonical engine has moved on: run bin/sync-engine.mjs and re-run the search gate');
});
