#!/usr/bin/env node
// =====================================================================
// MedKitt — Deploy Cache Sync
// Automates the three-tier cache problem:
//   1. Detects which tree/node/drug data changed via git diff
//   2. Generates Supabase UPDATE SQL for changed fields
//   3. Bumps DATA_VERSION in cache-db (src + docs) to force IndexedDB wipe
//   4. Bumps SW cache version in docs/sw.js
//
// Usage: node scripts/deploy-cache-sync.mjs [--dry-run] [--skip-data-version] [--skip-sw]
//
// Run AFTER compiling TypeScript and BEFORE committing.
// =====================================================================

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const docsDir = resolve(projectRoot, 'docs');

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipDataVersion = args.includes('--skip-data-version');
const skipSW = args.includes('--skip-sw');

if (dryRun) console.log('🔍 DRY RUN — no files will be modified\n');

// ---------------------------------------------------------------------------
// 1. Detect changed tree files via git diff
// ---------------------------------------------------------------------------
console.log('=== Step 1: Detecting changed tree data ===\n');

let diffOutput = '';
try {
  // Compare staged + unstaged changes against HEAD for tree source files
  diffOutput = execSync(
    'git diff HEAD -- src/data/trees/*.ts src/data/drug-store.ts src/data/info-pages.ts',
    { cwd: projectRoot, encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 }
  );
} catch (e) {
  // git diff returns exit code 1 when there are differences
  if (e.stdout) diffOutput = e.stdout;
}

if (!diffOutput.trim()) {
  console.log('No tree/drug/info-page data changes detected in git diff.');
  console.log('Skipping Supabase UPDATE SQL generation.\n');
} else {
  // Parse which files changed
  const changedFiles = new Set();
  for (const line of diffOutput.split('\n')) {
    const match = line.match(/^diff --git a\/(src\/data\/.*\.ts)/);
    if (match) changedFiles.add(match[1]);
  }
  console.log('Changed data files:');
  for (const f of changedFiles) console.log(`  • ${f}`);
  console.log('');

  // ---------------------------------------------------------------------------
  // 2. Generate UPDATE SQL for changed tree/node data
  // ---------------------------------------------------------------------------
  const treeFiles = [...changedFiles].filter(f => f.startsWith('src/data/trees/'));

  if (treeFiles.length > 0) {
    console.log('=== Step 2: Generating Supabase UPDATE SQL ===\n');

    // Tree registry (mirrors generate-supabase-sql.mjs)
    const TREE_REGISTRY = {
      'pneumothorax':     { prefix: 'PNEUMOTHORAX' },
      'pe-treatment':     { prefix: 'PE_TREATMENT' },
      'priapism':         { prefix: 'PRIAPISM' },
      'afib-rvr':         { prefix: 'AFIB_RVR' },
      'chest-tube':       { prefix: 'CHEST_TUBE' },
      'pep':              { prefix: 'PEP' },
      'stroke':           { prefix: 'STROKE' },
      'nstemi':           { prefix: 'NSTEMI' },
      'potassium':        { prefix: 'POTASSIUM' },
      'sodium':           { prefix: 'SODIUM' },
      'croup':            { prefix: 'CROUP' },
      'uti-peds':         { prefix: 'UTI_PEDS' },
      'peds-fever':       { prefix: 'PEDS_FEVER' },
      'bronchiolitis':    { prefix: 'BRONCHIOLITIS' },
      'echo-epss':        { prefix: 'ECHO_EPSS' },
      'shoulder-dystocia':{ prefix: 'SHOULDER_DYSTOCIA' },
      'precip-delivery':  { prefix: 'PRECIP_DELIVERY' },
      'neonatal-resus':   { prefix: 'NEONATAL_RESUS' },
      'distal-radius':    { prefix: 'DISTAL_RADIUS' },
      'splinting':        { prefix: 'SPLINTING' },
      'neurosyphilis':    { prefix: 'NEUROSYPHILIS' },
      'rabies':           { prefix: 'RABIES' },
      'burns':            { prefix: 'BURNS' },
      'echo-views':       { prefix: 'ECHO_VIEWS' },
      'pneumonia':        { prefix: 'PNEUMONIA' },
      'svt':              { prefix: 'SVT' },
      'gallbladder':      { prefix: 'GALLBLADDER' },
      'post-tonsillectomy-bleed': { prefix: 'PTH' },
    };

    const sqlLines = [];
    sqlLines.push('-- =====================================================================');
    sqlLines.push(`-- MedKitt — Auto-generated UPDATE SQL for changed nodes`);
    sqlLines.push(`-- Generated: ${new Date().toISOString().slice(0, 10)}`);
    sqlLines.push('-- Review carefully, then paste into Supabase SQL Editor.');
    sqlLines.push('-- =====================================================================');
    sqlLines.push('');
    sqlLines.push('BEGIN;');
    sqlLines.push('');

    let totalUpdates = 0;

    for (const treeFile of treeFiles) {
      const treeId = treeFile.replace('src/data/trees/', '').replace('.ts', '');
      const reg = TREE_REGISTRY[treeId];
      if (!reg) {
        console.log(`  ⚠ Unknown tree "${treeId}" — skipping`);
        continue;
      }

      console.log(`  Processing: ${treeId}`);

      // Load the CURRENT compiled version (what we're deploying)
      const compiledPath = resolve(docsDir, 'data', 'trees', `${treeId}.js`);
      if (!existsSync(compiledPath)) {
        console.log(`    ⚠ Compiled file not found: ${compiledPath}`);
        continue;
      }

      let treeModule;
      try {
        treeModule = await import(pathToFileURL(compiledPath).href);
      } catch (e) {
        console.log(`    ⚠ Failed to import ${compiledPath}: ${e.message}`);
        continue;
      }

      const currentNodes = treeModule[`${reg.prefix}_NODES`];
      if (!currentNodes) {
        console.log(`    ⚠ No ${reg.prefix}_NODES export found`);
        continue;
      }

      // Load the OLD version from git HEAD
      let oldNodesData;
      try {
        oldNodesData = execSync(
          `git show HEAD:docs/data/trees/${treeId}.js`,
          { cwd: projectRoot, encoding: 'utf-8', maxBuffer: 5 * 1024 * 1024 }
        );
      } catch (e) {
        // File doesn't exist in HEAD — it's a brand new tree, use full INSERT instead
        console.log(`    → New tree (not in HEAD). Use generate-supabase-sql.mjs for full INSERT.`);
        continue;
      }

      // Parse old nodes by writing to temp file and importing
      const tmpPath = resolve(projectRoot, `.tmp-old-${treeId}.js`);
      writeFileSync(tmpPath, oldNodesData, 'utf-8');
      let oldModule;
      try {
        oldModule = await import(pathToFileURL(tmpPath).href + `?t=${Date.now()}`);
      } catch (e) {
        console.log(`    ⚠ Failed to parse old version: ${e.message}`);
        try { execSync(`rm -f ${tmpPath}`); } catch (_) {}
        continue;
      }
      try { execSync(`rm -f ${tmpPath}`, { cwd: projectRoot }); } catch (_) {}

      const oldNodes = oldModule[`${reg.prefix}_NODES`] || [];
      const oldNodeMap = new Map(oldNodes.map(n => [n.id, n]));

      // Compare each current node against old
      let treeUpdates = 0;
      const nodeFields = ['type', 'module', 'title', 'body', 'citation', 'options', 'inputs', 'next', 'recommendation', 'treatment', 'confidence', 'images', 'calculatorLinks'];

      for (const node of currentNodes) {
        const oldNode = oldNodeMap.get(node.id);
        if (!oldNode) {
          // New node — needs INSERT, not UPDATE. The full INSERT script handles this.
          sqlLines.push(`-- NEW NODE: ${node.id} — use generate-supabase-sql.mjs for full INSERT`);
          continue;
        }

        // Find changed fields
        const changes = [];
        for (const field of nodeFields) {
          const oldVal = JSON.stringify(oldNode[field] ?? null);
          const newVal = JSON.stringify(node[field] ?? null);
          if (oldVal !== newVal) {
            changes.push({ field, oldVal, newVal, newRaw: node[field] });
          }
        }

        if (changes.length === 0) continue;

        treeUpdates++;
        totalUpdates++;

        sqlLines.push(`-- Node: ${node.id} (${changes.length} field(s) changed)`);

        // Build the full data JSONB replacement (safest approach — replaces entire data column)
        const nodeData = {};
        for (const field of nodeFields) {
          if (node[field] !== undefined && node[field] !== null) {
            nodeData[field] = node[field];
          }
        }

        const escapedJson = JSON.stringify(nodeData).replace(/'/g, "''");
        sqlLines.push(`UPDATE decision_nodes SET data = '${escapedJson}'::jsonb`);
        sqlLines.push(`WHERE id = '${node.id}' AND tree_id = '${treeId}';`);
        sqlLines.push('');
      }

      // Check for deleted nodes
      for (const oldNode of oldNodes) {
        const stillExists = currentNodes.find(n => n.id === oldNode.id);
        if (!stillExists) {
          sqlLines.push(`-- DELETED NODE: ${oldNode.id}`);
          sqlLines.push(`DELETE FROM decision_nodes WHERE id = '${oldNode.id}' AND tree_id = '${treeId}';`);
          sqlLines.push('');
          totalUpdates++;
        }
      }

      // Check module labels and citations
      const oldModuleLabels = oldModule[`${reg.prefix}_MODULE_LABELS`] || [];
      const currentModuleLabels = treeModule[`${reg.prefix}_MODULE_LABELS`] || [];
      if (JSON.stringify(oldModuleLabels) !== JSON.stringify(currentModuleLabels)) {
        const escapedLabels = JSON.stringify(currentModuleLabels).replace(/'/g, "''");
        sqlLines.push(`-- Module labels changed`);
        sqlLines.push(`UPDATE decision_trees SET module_labels = '${escapedLabels}'::jsonb`);
        sqlLines.push(`WHERE id = '${treeId}';`);
        sqlLines.push('');
        totalUpdates++;
      }

      const oldCitations = oldModule[`${reg.prefix}_CITATIONS`] || [];
      const currentCitations = treeModule[`${reg.prefix}_CITATIONS`] || [];
      if (JSON.stringify(oldCitations) !== JSON.stringify(currentCitations)) {
        sqlLines.push(`-- Citations changed — DELETE and re-INSERT`);
        sqlLines.push(`DELETE FROM tree_citations WHERE tree_id = '${treeId}';`);
        for (const c of currentCitations) {
          const escapedText = String(c.text).replace(/'/g, "''");
          sqlLines.push(`INSERT INTO tree_citations (tree_id, num, text) VALUES ('${treeId}', ${c.num}, '${escapedText}');`);
        }
        sqlLines.push('');
        totalUpdates++;
      }

      console.log(`    → ${treeUpdates} update(s) generated`);
    }

    sqlLines.push('COMMIT;');

    // Write SQL file
    if (totalUpdates > 0) {
      const sqlFile = resolve(projectRoot, 'supabase-hotfix-update.sql');
      if (!dryRun) {
        writeFileSync(sqlFile, sqlLines.join('\n'), 'utf-8');
        console.log(`\n✅ UPDATE SQL written to: supabase-hotfix-update.sql (${totalUpdates} changes)`);
      } else {
        console.log(`\n📝 Would write ${totalUpdates} changes to supabase-hotfix-update.sql`);
        console.log('\nPreview:');
        console.log(sqlLines.join('\n'));
      }
    } else {
      console.log('\n✅ No node-level changes detected — no UPDATE SQL needed.');
    }
  }

  // Check for drug changes
  if (changedFiles.has('src/data/drug-store.ts')) {
    console.log('\n⚠ Drug store changed — review manually or use:');
    console.log('  node scripts/generate-supabase-sql.mjs <tree-id> --update-drugs <drug-ids>');
  }

  if (changedFiles.has('src/data/info-pages.ts')) {
    console.log('\n⚠ Info pages changed — review manually or use:');
    console.log('  node scripts/generate-supabase-sql.mjs <tree-id> --info-pages <page-ids>');
  }
}

// ---------------------------------------------------------------------------
// 3. Bump DATA_VERSION in cache-db (forces IndexedDB wipe on all users)
// ---------------------------------------------------------------------------
if (!skipDataVersion) {
  console.log('\n=== Step 3: Bumping DATA_VERSION ===\n');

  const srcFile = resolve(projectRoot, 'src/services/cache-db.ts');
  const docsFile = resolve(projectRoot, 'docs/services/cache-db.js');

  const srcContent = readFileSync(srcFile, 'utf-8');
  const match = srcContent.match(/const DATA_VERSION = (\d+);/);
  if (!match) {
    console.log('⚠ Could not find DATA_VERSION in cache-db.ts');
  } else {
    const oldVersion = parseInt(match[1]);
    const newVersion = oldVersion + 1;

    if (!dryRun) {
      // Update src
      const newSrcContent = srcContent.replace(
        `const DATA_VERSION = ${oldVersion};`,
        `const DATA_VERSION = ${newVersion};`
      );
      writeFileSync(srcFile, newSrcContent, 'utf-8');

      // Update compiled docs
      const docsContent = readFileSync(docsFile, 'utf-8');
      const newDocsContent = docsContent.replace(
        `const DATA_VERSION = ${oldVersion};`,
        `const DATA_VERSION = ${newVersion};`
      );
      writeFileSync(docsFile, newDocsContent, 'utf-8');

      console.log(`✅ DATA_VERSION: ${oldVersion} → ${newVersion} (both src + docs)`);
      console.log('   Users\' IndexedDB will wipe on next app load.');
    } else {
      console.log(`📝 Would bump DATA_VERSION: ${oldVersion} → ${newVersion}`);
    }
  }
} else {
  console.log('\n⏭ Skipping DATA_VERSION bump (--skip-data-version)');
}

// ---------------------------------------------------------------------------
// 4. Bump SW cache version (triggers service worker update)
// ---------------------------------------------------------------------------
if (!skipSW) {
  console.log('\n=== Step 4: Bumping SW cache version ===\n');

  const swFile = resolve(projectRoot, 'docs/sw.js');
  const swContent = readFileSync(swFile, 'utf-8');
  const swMatch = swContent.match(/const CACHE_NAME = 'medkitt-v(\d+)';/);

  if (!swMatch) {
    console.log('⚠ Could not find CACHE_NAME in sw.js');
  } else {
    const oldSW = parseInt(swMatch[1]);
    const newSW = oldSW + 1;

    if (!dryRun) {
      const newSwContent = swContent.replace(
        `const CACHE_NAME = 'medkitt-v${oldSW}';`,
        `const CACHE_NAME = 'medkitt-v${newSW}';`
      );
      writeFileSync(swFile, newSwContent, 'utf-8');
      console.log(`✅ SW cache: medkitt-v${oldSW} → medkitt-v${newSW}`);
    } else {
      console.log(`📝 Would bump SW cache: medkitt-v${oldSW} → medkitt-v${newSW}`);
    }
  }
} else {
  console.log('\n⏭ Skipping SW cache bump (--skip-sw)');
}

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log('\n=== Done ===\n');
if (diffOutput.trim()) {
  console.log('Next steps:');
  console.log('  1. Review supabase-hotfix-update.sql (if generated)');
  console.log('  2. Run: bunx tsc (recompile after DATA_VERSION bump)');
  console.log('  3. Verify exports: (use deploy checklist step 2)');
  console.log('  4. Stage all changes in src/ and docs/');
  console.log('  5. Commit, push, and sync dev fork');
  console.log('  6. Paste SQL into Supabase (if generated)');
  console.log('  7. Remind users to visit clear.html if needed');
} else {
  console.log('No data changes — just deploy normally.');
}
