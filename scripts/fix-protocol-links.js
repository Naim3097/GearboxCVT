const fs = require('fs');
const path = require('path');

function walk(d) {
  let r = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) r = r.concat(walk(f));
    else if (e.name.endsWith('.mdx')) r.push(f);
  }
  return r;
}

const files = walk('content/articles');
let changed = 0;

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  // Fix protocol-relative //gearboxcvt.com or //www.gearboxcvt.com
  const n = c.replace(/\/\/(?:www\.)?gearboxcvt\.com(\/[^\s"')]*)?/g, (m, p) =>
    p ? '/' + p.replace(/^\//, '') : '/'
  );
  if (n !== c) {
    fs.writeFileSync(f, n, 'utf8');
    changed++;
    console.log('Fixed:', path.basename(f));
  }
}
console.log('Files changed:', changed);
