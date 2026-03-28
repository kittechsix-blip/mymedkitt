#!/usr/bin/env node

/**
 * MedKitt Post-Write Hook: Propose Tools for New Consults
 *
 * Triggers after a new consult tree file is written.
 * Outputs a prompt suggesting 3-5 tools (calculators, quick cards, dosing guides).
 */

import { readFileSync } from 'fs';
import { basename, dirname } from 'path';

// Parse the tool input from environment or argument
const toolInput = process.argv[2] || process.env.TOOL_INPUT || '';

let parsed;
try {
  parsed = JSON.parse(toolInput);
} catch {
  // Not JSON, exit silently
  process.exit(0);
}

const filePath = parsed?.file_path || '';

// Only trigger for new tree files in src/data/trees/
if (!filePath.includes('src/data/trees/') || !filePath.endsWith('.ts')) {
  process.exit(0);
}

// Skip if this is calculator.ts or other non-consult files
const fileName = basename(filePath);
if (fileName === 'index.ts' || fileName.startsWith('_')) {
  process.exit(0);
}

// Extract consult name from file
const consultName = fileName.replace('.ts', '').replace(/-/g, ' ');
const consultTitle = consultName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

// Read the file to understand its content
let fileContent = '';
try {
  fileContent = readFileSync(filePath, 'utf-8');
} catch {
  process.exit(0);
}

// Check if this looks like a new consult (has NODES array but few/no calculatorLinks)
const hasNodes = fileContent.includes('_NODES:') || fileContent.includes('DecisionNode[]');
const hasCalculatorLinks = (fileContent.match(/calculatorLinks/g) || []).length;

// Only propose if this looks like a consult with few existing tools
if (!hasNodes || hasCalculatorLinks > 3) {
  process.exit(0);
}

// Output the proposal as additionalContext
const output = {
  additionalContext: `
## Tool Proposal for "${consultTitle}" Consult

This consult was just created/modified. Consider adding 3-5 tools to enhance clinical utility:

**Tool Types to Consider:**
1. **Quick Dosing Card** - Weight-based or fixed dosing reference (e.g., \`${fileName.replace('.ts', '')}-dosing\`)
2. **Clinical Criteria Calculator** - Diagnostic or severity scoring (e.g., \`${fileName.replace('.ts', '')}-criteria\`)
3. **Decision Guide** - Interactive decision support (e.g., \`${fileName.replace('.ts', '')}-decision\`)
4. **Safety Checklist** - Contraindications or precautions (e.g., \`${fileName.replace('.ts', '')}-safety\`)
5. **Disposition Guide** - Admit/discharge criteria (e.g., \`${fileName.replace('.ts', '')}-dispo\`)

**To add tools:**
1. Create calculator definitions in \`src/components/calculator.ts\`
2. Add to CALCULATORS registry
3. Link via \`calculatorLinks\` array in relevant tree nodes
4. Deploy and sync to Supabase

**Ask Andy:** "Should I propose 3-5 specific tools for this ${consultTitle} consult?"
`
};

console.log(JSON.stringify(output));
