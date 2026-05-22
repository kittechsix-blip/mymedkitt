#!/usr/bin/env node
// =====================================================================
// MedKitt — Image License Manifest Validator (R23)
//
// Every tree that ships images under `docs/images/<tree-id>/` MUST also ship a
// `MANIFEST.json` documenting source, license, retrieval date, Andy approval,
// and SHA256 of the file as committed. This script enforces both presence and
// hash integrity so a swapped or replaced image fails validation.
//
// Expected manifest shape (per-tree, at docs/images/<tree-id>/MANIFEST.json):
//   {
//     "filename1.png": {
//       "source_url":         "https://commons.wikimedia.org/wiki/File:...",
//       "license_tag":        "PD-old-100",
//       "license_evidence_url": "https://commons.wikimedia.org/wiki/Template:PD-old-100",
//       "retrieval_timestamp": "2026-05-22T15:00:00Z",
//       "andy_approval_commit": "<git-sha-or-PR-comment-ref>",
//       "sha256":              "<hex>"
//     },
//     ...
//   }
//
// Acceptable license tags (myMedKitt commercial-safe per project CLAUDE.md):
//   PD-old-100, PD-USGov, PD-USGov-NIH-NIAID, PD-USGov-HHS-CDC, PD-1923, CC0,
//   PD-self, US-Federal-Work, PD-art, PD-NL-PD.
//
// Usage:
//   node scripts/validate-image-manifests.mjs            # all tree image dirs
//   node scripts/validate-image-manifests.mjs <tree-id>  # one tree
//
// Exit 0 on clean; 1 on any missing/orphan/hash-mismatch.
// =====================================================================

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, basename } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const imagesRoot = resolve(projectRoot, 'docs', 'images');

const ACCEPTABLE_LICENSES = new Set([
  'PD-old-100',
  'PD-USGov',
  'PD-USGov-NIH-NIAID',
  'PD-USGov-HHS-CDC',
  'PD-1923',
  'CC0',
  'PD-self',
  'US-Federal-Work',
  'PD-art',
  'PD-NL-PD',
]);

const IMAGE_EXT_RE = /\.(png|jpe?g|svg|webp|gif)$/i;
const argTreeId = process.argv.slice(2).find(a => !a.startsWith('--'));

const findings = [];
const errFor = (path, msg) => findings.push({ severity: 'error', path, msg });

function sha256File(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function validateTreeDir(treeDir) {
  const manifestPath = resolve(treeDir, 'MANIFEST.json');
  const treeId = basename(treeDir);

  // Collect on-disk image files
  let files;
  try {
    files = readdirSync(treeDir).filter(f => IMAGE_EXT_RE.test(f));
  } catch (err) {
    errFor(treeDir, `Could not read directory: ${err.message}`);
    return;
  }
  if (files.length === 0) return; // no images, nothing to validate

  // Manifest must exist
  if (!existsSync(manifestPath)) {
    errFor(manifestPath, `MANIFEST.json missing — ${files.length} image(s) present without license documentation`);
    return;
  }

  let manifest;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    errFor(manifestPath, `Could not parse MANIFEST.json: ${err.message}`);
    return;
  }

  // Every file on disk must have an entry, with a recognized license, and matching SHA256
  for (const f of files) {
    const entry = manifest[f];
    if (!entry) {
      errFor(`${treeId}/${f}`, 'No MANIFEST.json entry for this image');
      continue;
    }
    if (!entry.source_url) {
      errFor(`${treeId}/${f}`, 'Manifest entry missing `source_url`');
    }
    if (!entry.license_tag) {
      errFor(`${treeId}/${f}`, 'Manifest entry missing `license_tag`');
    } else if (!ACCEPTABLE_LICENSES.has(entry.license_tag)) {
      errFor(`${treeId}/${f}`, `License "${entry.license_tag}" is NOT in the commercial-safe set. Allowed: ${[...ACCEPTABLE_LICENSES].join(', ')}`);
    }
    if (!entry.retrieval_timestamp) {
      errFor(`${treeId}/${f}`, 'Manifest entry missing `retrieval_timestamp`');
    }
    if (!entry.andy_approval_commit) {
      errFor(`${treeId}/${f}`, 'Manifest entry missing `andy_approval_commit` — required per project CLAUDE.md image-approval gate');
    }
    if (entry.sha256) {
      const onDisk = sha256File(resolve(treeDir, f));
      if (onDisk !== entry.sha256) {
        errFor(`${treeId}/${f}`, `SHA256 mismatch — disk=${onDisk.slice(0, 16)}... manifest=${entry.sha256.slice(0, 16)}...`);
      }
    } else {
      errFor(`${treeId}/${f}`, 'Manifest entry missing `sha256`');
    }
  }

  // Orphan entries (manifest mentions a file that no longer exists)
  for (const key of Object.keys(manifest)) {
    if (!files.includes(key)) {
      errFor(`${treeId}/${key}`, 'Manifest entry references file not on disk (orphan)');
    }
  }
}

if (!existsSync(imagesRoot)) {
  console.log('No docs/images directory; nothing to validate.');
  process.exit(0);
}

let treeDirs;
if (argTreeId) {
  treeDirs = [resolve(imagesRoot, argTreeId)];
} else {
  treeDirs = readdirSync(imagesRoot)
    .map(d => resolve(imagesRoot, d))
    .filter(p => {
      try { return statSync(p).isDirectory(); } catch { return false; }
    });
}

console.log(`\n🖼  Validating ${treeDirs.length} tree image dir(s)...\n`);
for (const dir of treeDirs) validateTreeDir(dir);

if (findings.length === 0) {
  console.log('✅ All image manifests clean.\n');
  process.exit(0);
}

for (const f of findings) {
  console.error(`  ❌ [${f.path}] ${f.msg}`);
}
console.error(`\n💥 ${findings.length} image manifest issue(s).\n`);
process.exit(1);
