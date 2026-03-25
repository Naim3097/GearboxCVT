/**
 * fix-links.js
 * Rewrites all https://gearboxcvt.com/slug/ links inside MDX content
 * to internal /category/slug/ paths using the redirect map from vercel.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'articles');
const VERCEL_JSON = path.join(ROOT, 'vercel.json');

// Build redirect map: { 'slug': '/category/slug/' }
const vercelData = JSON.parse(fs.readFileSync(VERCEL_JSON, 'utf8'));
const redirectMap = {};
for (const r of vercelData.redirects) {
  // source is like "/old-slug/"
  const slug = r.source.replace(/^\/|\/$/g, '');
  redirectMap[slug] = r.destination; // e.g. "/cvt/some-article/"
}

// Extra manual overrides for slugs not in vercel.json
const MANUAL_MAP = {
  'blog': '/',
  'diagnosis': '/contact/',
  // Emoji slug article - points to buying-guide TVET article
  '%f0%9f%8e%93-kolej-atau-universiti-tvet-pertama-di-malaysia': '/buying-guide/tvet-automotif-jalan-pantas-ke-dunia-gearbox/',
  // WP-only pages we can't map - strip domain to relative so vercel handles it
};

function resolveSlug(slug) {
  if (redirectMap[slug]) return redirectMap[slug];
  const decoded = decodeURIComponent(slug);
  if (redirectMap[decoded]) return redirectMap[decoded];
  if (MANUAL_MAP[slug]) return MANUAL_MAP[slug];
  if (MANUAL_MAP[slug.toLowerCase()]) return MANUAL_MAP[slug.toLowerCase()];
  // Fallback: keep as relative path (vercel may still redirect it)
  return null;
}

// Regex: matches https://gearboxcvt.com/path or https://www.gearboxcvt.com/path
// Groups: (1) = path after domain (may have trailing slash or not)
const WP_URL_RE = /https?:\/\/(?:www\.)?gearboxcvt\.com(\/[^\s"')]*)/g;

function fixContent(content) {
  let changed = false;
  const result = content.replace(WP_URL_RE, (match, urlPath) => {
    // urlPath starts with /
    // Strip leading/trailing slashes to get slug
    const slug = urlPath.replace(/^\/|\/$/g, '');
    const resolved = resolveSlug(slug);
    if (resolved) {
      changed = true;
      return resolved;
    }
    // Not in map — strip domain, keep relative path
    const relative = '/' + slug + (urlPath.endsWith('/') ? '/' : '');
    changed = true;
    return relative;
  });
  return { result, changed };
}

// Walk all MDX files
function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, files);
    else if (entry.name.endsWith('.mdx')) files.push(full);
  }
  return files;
}

const mdxFiles = walkDir(CONTENT_DIR);
let totalFixed = 0;
let filesChanged = 0;
const unmapped = new Set();

for (const file of mdxFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const { result, changed } = fixContent(content);
  if (changed) {
    // Count replacements
    const before = (content.match(WP_URL_RE) || []).length;
    totalFixed += before;
    filesChanged++;
    fs.writeFileSync(file, result, 'utf8');
    console.log(`  Fixed ${before} link(s) in ${path.relative(CONTENT_DIR, file)}`);
  }

  // Track unmapped slugs for info
  const remaining = result.match(/https?:\/\/(?:www\.)?gearboxcvt\.com/g);
  if (remaining) remaining.forEach(u => unmapped.add(u));
}

console.log(`\nDone: ${filesChanged} files changed, ~${totalFixed} links rewritten.`);
if (unmapped.size > 0) {
  console.log('\nResidual gearboxcvt.com references (check manually):');
  unmapped.forEach(u => console.log(' ', u));
}
