// One line per RAPID strip: draft / approved+live / approved-but-dropped (why).
//   node scripts/rapid-status.ts
// "live" = the runtime rule holds against repo data (hash, hard checks incl. every excerpt, flags, regimen pins).
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { ROOT, loadStrips, loadApprovals, makeCtx } from './lib/rapid-load.ts';

const V = await import(pathToFileURL(join(ROOT, 'src/services/rapid-verify.ts')).href);
const strips = await loadStrips();
const approvals = await loadApprovals();

for (const [id, strip] of Object.entries(strips)) {
  const { ctx } = await makeCtx(id);
  const { status, reasons, result } = V.approvalStatus(strip, ctx, (approvals as Record<string, unknown>)[id]);
  const detail = `${result.failures.length} hard failure(s), ${V.flagIds(result).length} flag(s)`;
  if (status === 'draft') console.log(`${id}: draft (${detail})`);
  else if (status === 'live') console.log(`${id}: approved+live (${detail})`);
  else console.log(`${id}: approved-but-dropped (${reasons.join('; ')})`);
}
