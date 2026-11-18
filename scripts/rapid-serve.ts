// Local LAN server: docs/ at /, rapid-proof/ at /rapid-proof/. Nothing else (never the repo root: .env).
// Usage: node scripts/rapid-serve.ts   (Ctrl-C to stop)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, normalize, extname, sep } from 'node:path';
import { networkInterfaces } from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(import.meta.url), '..', '..');
const TYPES: Record<string, string> = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon', '.webp': 'image/webp' };
const PORT = Number(process.env.RAPID_PORT ?? 8787);

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', 'http://x');
    let rel = decodeURIComponent(url.pathname);
    if (rel.split('/').some((seg) => seg === '..' || (seg.startsWith('.') && seg.length > 0))) { res.writeHead(403).end('forbidden'); return; }
    let base = join(ROOT, 'docs');
    if (rel === '/rapid-proof' || rel.startsWith('/rapid-proof/')) { base = join(ROOT, 'rapid-proof'); rel = rel.slice('/rapid-proof'.length) || '/'; }
    if (rel.endsWith('/')) rel += 'index.html';
    const file = normalize(join(base, rel));
    if (!file.startsWith(base + sep)) { res.writeHead(403).end('forbidden'); return; }
    if (!(await stat(file)).isFile()) throw new Error('nf');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' }).end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(PORT, '0.0.0.0', () => {
  const lan = Object.values(networkInterfaces()).flat().find((n) => n && n.family === 'IPv4' && !n.internal)?.address ?? 'localhost';
  console.log(`docs:  http://${lan}:${PORT}/app.html   (also http://localhost:${PORT}/app.html)`);
  console.log(`proof: http://${lan}:${PORT}/rapid-proof/`);
  console.log('preview: add ?rapid-preview=1 to app.html (local hosts over http only)');
});
