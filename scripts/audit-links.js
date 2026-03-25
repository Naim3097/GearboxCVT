// scripts/audit-links.js
const fs   = require('fs')
const path = require('path')
const matter = require('gray-matter')
const dir  = path.join(__dirname, '..', 'content', 'articles')

// Build the WP slug → new path map from vercel.json
const vercel = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'vercel.json'), 'utf8'))
const redirectMap = {}
for (const r of vercel.redirects) {
  // source: /slug/  destination: /category/slug/
  const oldSlug = r.source.replace(/^\/|\/$/g, '')
  redirectMap[oldSlug] = r.destination
}

// ── 1. Duplicates ──────────────────────────────────────────────────────────
const slugMap = {}
const cats = fs.readdirSync(dir)
for (const cat of cats) {
  const catDir = path.join(dir, cat)
  for (const file of fs.readdirSync(catDir).filter(f => f.endsWith('.mdx'))) {
    const slug = file.replace('.mdx', '')
    if (!slugMap[slug]) slugMap[slug] = []
    slugMap[slug].push(cat)
  }
}
console.log('=== DUPLICATES ===')
let dupeCount = 0
for (const [slug, catList] of Object.entries(slugMap)) {
  if (catList.length > 1) { console.log(slug, '->', catList.join(', ')); dupeCount++ }
}
if (!dupeCount) console.log('None')

// ── 2. Internal WP links ───────────────────────────────────────────────────
console.log('\n=== FILES WITH gearboxcvt.com LINKS ===')
let totalLinks = 0
for (const cat of cats) {
  const catDir = path.join(dir, cat)
  for (const file of fs.readdirSync(catDir).filter(f => f.endsWith('.mdx'))) {
    const { content } = matter(fs.readFileSync(path.join(catDir, file), 'utf8'))
    const matches = content.match(/https?:\/\/(?:www\.)?gearboxcvt\.com\/[^\s)"'>\]]+/g) || []
    if (matches.length) {
      console.log(cat + '/' + file + ' (' + matches.length + ' links):')
      matches.forEach(m => console.log('  ' + m))
      totalLinks += matches.length
    }
  }
}
console.log('\nTotal WP links:', totalLinks)
console.log('Redirect entries available:', Object.keys(redirectMap).length)
