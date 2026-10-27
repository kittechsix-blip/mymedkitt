import http from 'node:http'; import fs from 'node:fs';
const out = process.argv[2] || 'browser-results.jsonl'; fs.writeFileSync(out, '');
http.createServer((req, res) => { res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method !== 'POST') { res.setHeader('Content-Type','application/json'); res.end(req.url==='/q'?fs.readFileSync('q500.json','utf8'):'ok'); return; }
  let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => { fs.appendFileSync(out, b.trim() + '\n'); res.end('ok'); });
}).listen(8766, () => console.log('collector on 8766'));
