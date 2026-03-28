#!/usr/bin/env node

/**
 * MedKitt Post-Bash Hook: Auto-Deploy After Supabase Push
 *
 * Triggers after a `supabase-push.mjs` command completes.
 * Reminds Claude to run deploy-cache-sync if not already done.
 */

// Parse the tool input
const toolInput = process.argv[2] || process.env.TOOL_INPUT || '';

let parsed;
try {
  parsed = JSON.parse(toolInput);
} catch {
  process.exit(0);
}

const command = parsed?.command || '';

// Only trigger for supabase-push commands
if (!command.includes('supabase-push')) {
  process.exit(0);
}

// Extract the tree name from the command
const treeMatch = command.match(/supabase-push\.mjs\s+(\S+)/);
const treeName = treeMatch ? treeMatch[1] : 'unknown';

// Output deploy reminder as additionalContext
const output = {
  additionalContext: `
## Deploy Reminder: "${treeName}" pushed to Supabase

The consult was pushed to Supabase. Now complete the deploy workflow:

**If NOT already done this session:**
1. \`npx tsc\` - Recompile TypeScript
2. \`node scripts/deploy-cache-sync.mjs\` - Bump DATA_VERSION and SW cache
3. \`npx tsc\` - Recompile after version bump
4. \`git add -A && git commit && git push\` - Push to GitHub

**DATA_VERSION bump** forces client IndexedDB wipe on next load.
**SW cache bump** triggers service worker update.

This ensures users get the latest consult data.
`
};

console.log(JSON.stringify(output));
