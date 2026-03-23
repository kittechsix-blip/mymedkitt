# myMedKitt Optimization Loop

Autonomous experimentation system inspired by Karpathy's AutoResearch.
Runs overnight to optimize UX, content, and search — keeps winners, discards losers.

## Architecture

```
optimization-loop/
├── README.md           # This file
├── config.json         # Experiment settings
├── runner.ts           # Main loop orchestrator
├── experiments/
│   ├── ux.ts           # UI/UX variant testing
│   ├── content.ts      # Clinical content optimization
│   └── search.ts       # Search ranking optimization
├── metrics/
│   ├── lighthouse.ts   # Performance metrics
│   ├── readability.ts  # Content clarity scoring
│   └── search-quality.ts # Search result relevance
├── results/            # Experiment logs (git-ignored)
└── winners/            # Winning configurations to apply
```

## How It Works

1. **Define experiments** in config.json (what to test)
2. **Run overnight** with `bun run optimize`
3. **Review winners** in the morning
4. **Apply changes** you approve

## Experiment Types

### 1. UX Optimization
- Button placement, colors, spacing
- Font sizes, contrast ratios
- Navigation flow order
- Metric: Lighthouse accessibility + performance score

### 2. Content Optimization
- Clinical phrasing variations via LLM
- Abbreviation vs full term usage
- Step ordering in protocols
- Metric: Flesch-Kincaid readability + medical accuracy check

### 3. Search Optimization
- Title weight vs body weight vs tag weight
- Fuzzy matching thresholds
- Result ordering algorithms
- Metric: Simulated user queries → did top result match intent?

## Running Experiments

```bash
# Install dependencies
cd optimization-loop && bun install

# Run single experiment type
bun run optimize --type ux
bun run optimize --type content
bun run optimize --type search

# Run all overnight (recommended)
bun run optimize --all --duration 8h

# Dry run (no changes, just log what would happen)
bun run optimize --dry-run
```

## Safety Rails

- **No production deploys** — experiments run in isolated test environment
- **Human approval required** — winners are staged, not auto-applied
- **Git tracking** — all experiments logged with before/after diffs
- **Rollback ready** — original configs preserved

## Metrics Storage

Results logged to `results/YYYY-MM-DD-HH-MM.json`:

```json
{
  "experiment_id": "ux-button-color-001",
  "type": "ux",
  "variant": { "primaryColor": "#2563eb" },
  "baseline_score": 85,
  "variant_score": 91,
  "improvement": 7.1,
  "winner": true,
  "timestamp": "2026-03-21T09:00:00Z"
}
```

## Applying Winners

```bash
# Review staged winners
bun run winners:review

# Apply specific winner
bun run winners:apply ux-button-color-001

# Apply all winners (with confirmation)
bun run winners:apply --all
```

---

## How to Run Overnight (Step-by-Step)

### Prerequisites
1. **Dev server running** - The optimization loop hits `localhost:5173`
2. **Anthropic API key** - For content optimization (set `ANTHROPIC_API_KEY` env var)
3. **Chrome/Chromium installed** - For Lighthouse tests

### First Time Setup

```bash
cd ~/Desktop/myMedKitt/optimization-loop

# Install dependencies
bun install

# Verify it works (dry run)
bun run dry-run
```

### Running Overnight

**Option 1: Terminal (simplest)**
```bash
# Start dev server in one terminal
cd ~/Desktop/myMedKitt && bun run dev

# In another terminal, run optimization loop
cd ~/Desktop/myMedKitt/optimization-loop
bun run optimize:overnight
```

**Option 2: Background with logging**
```bash
# Start dev server
cd ~/Desktop/myMedKitt && bun run dev &

# Run optimization loop, log to file
cd ~/Desktop/myMedKitt/optimization-loop
nohup bun run optimize --all --duration 8h > overnight-$(date +%Y%m%d).log 2>&1 &

# Check progress
tail -f overnight-*.log
```

**Option 3: tmux (recommended)**
```bash
# Create tmux session
tmux new -s medkitt-optimize

# Split panes: dev server left, optimizer right
# Ctrl+b % to split, Ctrl+b arrow to switch

# Left pane: dev server
cd ~/Desktop/myMedKitt && bun run dev

# Right pane: optimizer
cd ~/Desktop/myMedKitt/optimization-loop
bun run optimize --all --duration 8h

# Detach and sleep: Ctrl+b d
# Reattach in morning: tmux attach -t medkitt-optimize
```

### Morning Review

```bash
# See what happened
cd ~/Desktop/myMedKitt/optimization-loop

# View summary
cat results/ux-report.md
cat results/content-report.md
cat results/search-report.md

# Review winners
bun run winners:review

# Apply ones you like
bun run winners:apply <experiment-id>
```

---

## Connecting to Real Data (TODO)

Currently uses mock data. To connect to actual myMedKitt:

### For Content Experiments
Update `runner.ts` `getNodeContent()` to fetch from Supabase:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

async function getNodeContent(nodeId: string): Promise<string> {
  const { data } = await supabase
    .from('nodes')
    .select('content')
    .eq('id', nodeId)
    .single();
  return data?.content || '';
}
```

### For Search Experiments
Update `getSearchableContent()` similarly to pull all consults from Supabase.

---

## Estimated Runtime

| Experiment Type | Per Experiment | Total (default config) |
|-----------------|----------------|------------------------|
| UX (Lighthouse) | ~30 seconds | ~12 minutes |
| Content (LLM) | ~5 seconds | ~1 minute |
| Search (local) | ~100ms | ~10 seconds |

**Full overnight run (8h):** Can run 50-100+ UX experiments, unlimited content/search iterations.
