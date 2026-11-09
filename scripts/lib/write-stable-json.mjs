// Write a generated JSON file only when its content (ignoring the volatile `generated`
// timestamp) changed. When equal, the file on disk is left untouched, so deploys do not
// invalidate the service-worker / HTTP cache for users when nothing really changed.
import fs from 'node:fs';

export function writeStableJson(path, obj, volatileKeys = ['generated']) {
  let out = obj;
  if (fs.existsSync(path)) {
    try {
      const prevText = fs.readFileSync(path, 'utf8');
      const prev = JSON.parse(prevText);
      const strip = (o) => {
        const c = { ...o };
        for (const k of volatileKeys) delete c[k];
        return JSON.stringify(c);
      };
      if (strip(prev) === strip(obj)) {
        // Content identical: keep the old timestamps (and thus the old bytes).
        out = { ...obj };
        for (const k of volatileKeys) if (k in prev) out[k] = prev[k];
        if (prevText === JSON.stringify(out)) return false; // byte-identical, skip write
      }
    } catch { /* unreadable previous file: just write */ }
  }
  fs.writeFileSync(path, JSON.stringify(out));
  return true;
}
