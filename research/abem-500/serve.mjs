// Static server for docs/ + same-origin collector (the app's CSP only allows connect-src 'self').
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path';
const ROOT = path.resolve('../../docs'); const out = process.argv[2] || 'browser-results.jsonl'; if (!fs.existsSync(out)) fs.writeFileSync(out, '');
const T = { '.html':'text/html','.js':'text/javascript','.json':'application/json','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.ico':'image/x-icon' };
http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/__abem/q') { res.setHeader('Content-Type','application/json'); return res.end(fs.readFileSync('q500.json','utf8')); }
  if (u === '/__abem/r' && req.method === 'POST') { let b=''; req.on('data',c=>b+=c); return req.on('end',()=>{ fs.appendFileSync(out,b.trim()+'\n'); res.end('ok'); }); }
  let f = path.join(ROOT, u === '/' ? 'index.html' : u); if (!f.startsWith(ROOT)) { res.statusCode=403; return res.end(); }
  fs.readFile(f, (e, d) => { if (e) { res.statusCode=404; return res.end('nf'); } res.setHeader('Content-Type', T[path.extname(f)] || 'application/octet-stream'); res.end(d); });
}).listen(8765, () => console.log('serving'));
