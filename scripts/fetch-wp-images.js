/**
 * One-time script: fetches featured image URLs from gearboxcvt.com WP REST API
 * and writes ogImage into each matching MDX file's frontmatter.
 *
 * Run: node scripts/fetch-wp-images.js
 */

const https = require('https')
const fs    = require('fs')
const path  = require('path')

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 Node.js image-fetch' } }, res => {
      let body = ''
      res.on('data', chunk => body += chunk)
      res.on('end', () => {
        try { resolve({ data: JSON.parse(body), headers: res.headers }) }
        catch (e) { reject(new Error(`JSON parse error for ${url}: ${e.message}`)) }
      })
    }).on('error', reject)
  })
}

async function fetchAllPosts() {
  const imageMap = {} // slug → image URL
  let page = 1

  while (true) {
    const url = `https://gearboxcvt.com/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=wp:featuredmedia`
    process.stdout.write(`  Fetching page ${page}...`)
    const { data } = await fetchJson(url)

    if (!Array.isArray(data) || data.length === 0) { console.log(' done.'); break }
    console.log(` ${data.length} posts`)

    for (const post of data) {
      const slug  = post.slug
      const media = post._embedded?.['wp:featuredmedia']?.[0]
      if (!media) continue
      // Prefer 'large' (1024px), fall back to full source_url
      const url =
        media.media_details?.sizes?.large?.source_url ||
        media.source_url
      if (url) imageMap[slug] = url
    }

    if (data.length < 100) break
    page++
  }

  return imageMap
}

function walk(dir) {
  const files = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...walk(p))
    else if (e.name.endsWith('.mdx')) files.push(p)
  }
  return files
}

function setFrontmatterField(content, key, value) {
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/)
  if (!fmMatch) return content

  let fm = fmMatch[1]

  // Remove existing key if present
  fm = fm.replace(new RegExp(`^${key}:.*$`, 'm'), '').replace(/\n{2,}/g, '\n').trim()

  // Insert after last line
  fm = fm + `\n${key}: "${value}"`

  return content.replace(/^---\n[\s\S]*?\n---\n/, `---\n${fm}\n---\n`)
}

async function main() {
  console.log('Fetching featured images from gearboxcvt.com WP API...')
  const imageMap = await fetchAllPosts()
  console.log(`\nFound ${Object.keys(imageMap).length} posts with images\n`)

  const contentDir = path.join(process.cwd(), 'content', 'articles')
  const files = walk(contentDir)

  let updated = 0, skipped = 0

  for (const file of files) {
    const slug = path.basename(file, '.mdx')
    const imgUrl = imageMap[slug]

    if (imgUrl) {
      const original = fs.readFileSync(file, 'utf8')
      const updated_ = setFrontmatterField(original, 'ogImage', imgUrl)
      fs.writeFileSync(file, updated_)
      console.log(`  ✓  ${slug}`)
      updated++
    } else {
      console.log(`  –  (no WP image) ${slug}`)
      skipped++
    }
  }

  console.log(`\nDone: ${updated} updated, ${skipped} skipped`)
}

main().catch(err => { console.error(err); process.exit(1) })
