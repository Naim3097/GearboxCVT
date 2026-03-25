// scripts/migrate-wp.js
// Fetches all 85 WordPress posts from gearboxcvt.com via REST API and writes
// them as MDX files into content/articles/[category]/[slug].mdx
//
// Run once: node scripts/migrate-wp.js

const https    = require('https')
const fs       = require('fs')
const path     = require('path')
const TurndownService = require('turndown')

// ── Category mapping: WP category ID → our slug ───────────────────────────
const CAT_MAP = {
  65:  'cvt',                   // Asas CVT & Cara Ia Berfungsi
  66:  'cvt',                   // Kelebihan & Kekurangan CVT
  67:  'maintenance',           // Penjagaan, Masalah & Baik Pulih CVT
  68:  'cvt',                   // Tip Pemanduan & Pengalaman Sebenar CVT
  69:  'buying-guide',          // Berita Industri & Teknologi Terkini
  70:  'gearbox-repair',        // Diagnosis & Kod Masalah (Fault Code) CVT
  82:  'automatic-transmission',// Info dan Fakta Kereta
  90:  'automatic-transmission',// Honda
  364: 'cvt',                   // Model Honda/CVT
}
const DEFAULT_CAT = 'gearbox-repair'

// ── Turndown config ────────────────────────────────────────────────────────
const td = new TurndownService({
  headingStyle:  'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
})
// Strip WordPress garbage: empty paragraphs, [caption] shortcodes
td.addRule('stripCaption', {
  filter: node => node.nodeName === 'FIGURE' || (node.nodeName === 'P' && !node.textContent.trim()),
  replacement: () => '',
})

// ── HTTPS helper ───────────────────────────────────────────────────────────
function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 GearboxCVT-migrate/1.0' } }, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    }).on('error', reject)
  })
}

// ── Decode HTML entities ───────────────────────────────────────────────────
function decodeEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201C')
    .replace(/&#8221;/g, '\u201D')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#160;/g, ' ')
    .replace(/&nbsp;/g, ' ')
}

// ── Strip HTML for plain-text excerpt ─────────────────────────────────────
function stripHtml(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

// ── Convert HTML content to Markdown ──────────────────────────────────────
function toMarkdown(html) {
  // remove WP block comments
  const cleaned = html
    .replace(/<!-- wp:[^]*?-->/g, '')
    .replace(/<!-- \/wp:[^>]*?-->/g, '')
    .replace(/<\!--[^>]*?-->/g, '')
  return td.turndown(cleaned).trim()
}

// ── Slugify (keep original WP slug, it's already clean) ───────────────────
function sanitizeSlug(slug) {
  return slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

// ── Build YAML frontmatter (no quotes needed for most, but add them safely) 
function fm(post, category) {
  const title       = decodeEntities(post.title.rendered).replace(/"/g, '\\"')
  const rawExcerpt  = stripHtml(post.excerpt?.rendered || '')
  const description = (rawExcerpt.slice(0, 160) || title).replace(/"/g, '\\"')
  const date        = post.date.slice(0, 10)
  const modified    = post.modified.slice(0, 10)

  return `---
title: "${title}"
description: "${description}"
publishedAt: "${date}"
modifiedAt: "${modified}"
category: ${category}
tags: []
featured: false
---`
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  // Fetch all posts (max 100 per page, 85 total so one request is enough)
  console.log('Fetching posts from WordPress REST API...')
  const res = await get('https://gearboxcvt.com/wp-json/wp/v2/posts?per_page=100&page=1&_fields=id,slug,date,modified,title,excerpt,content,categories')
  if (res.status !== 200) {
    console.error('API error:', res.status, res.body.slice(0,200))
    process.exit(1)
  }

  const posts = JSON.parse(res.body)
  console.log(`Got ${posts.length} posts`)

  let written  = 0
  let skipped  = 0

  for (const post of posts) {
    // Resolve category
    const catId   = post.categories?.[0]
    const category = CAT_MAP[catId] ?? DEFAULT_CAT
    const slug    = sanitizeSlug(post.slug)

    const dir     = path.join(__dirname, '..', 'content', 'articles', category)
    const file    = path.join(dir, `${slug}.mdx`)

    // Skip if this file was manually written (already exists with rich content)
    if (fs.existsSync(file)) {
      const existing = fs.readFileSync(file, 'utf8')
      // Only skip if it has more than just frontmatter (manual articles are longer)
      if (existing.split('\n').length > 25) {
        console.log(`  SKIP (manual): ${category}/${slug}`)
        skipped++
        continue
      }
    }

    fs.mkdirSync(dir, { recursive: true })

    const markdown = toMarkdown(post.content.rendered)
    const content  = `${fm(post, category)}\n\n${markdown}\n`

    fs.writeFileSync(file, content, 'utf8')
    console.log(`  ✓ ${category}/${slug}`)
    written++
  }

  console.log(`\nDone. Written: ${written}, Skipped: ${skipped}`)

  // ── Print redirect map for vercel.json ──────────────────────────────────
  console.log('\n=== VERCEL REDIRECTS (add to vercel.json) ===')
  for (const post of posts) {
    const catId    = post.categories?.[0]
    const category = CAT_MAP[catId] ?? DEFAULT_CAT
    const slug     = sanitizeSlug(post.slug)
    const oldPath  = `/${slug}/`
    const newPath  = `/${category}/${slug}/`
    if (oldPath !== newPath) {
      console.log(`{ "source": "${oldPath}", "destination": "${newPath}", "permanent": true },`)
    }
  }
}

main().catch(e => { console.error(e); process.exit(1) })
