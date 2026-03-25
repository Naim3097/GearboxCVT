# Main Instruction — WordPress → Custom Site Migration
**Business:** One X Transmission  
**Domain:** gearboxcvt.com (same domain, single location)  
**Goal:** Replace WordPress with a custom-coded site while preserving current rankings/traffic and expanding organic reach for gearbox/CVT searches in Klang Valley.

---

## 1. Success Criteria

- No major long-term loss in organic clicks/leads from current top pages (short-term volatility is acceptable).
- All high-performing WordPress URLs either:
  - remain identical on the new site, **or**
  - 301 redirect cleanly to the most relevant new URL (no chains).
- Core pages are crawlable, indexable, fast, and technically clean (Core Web Vitals improvement).
- Local relevance improves for **"gearbox + Klang Valley"** search intent.

---

## 2. Non-Negotiables (Must Be True on Launch Day)

### A. URL & Redirect Rules *(highest impact)*
- Keep URLs **identical** for all high-performing pages whenever possible.
- If any URL changes, create a **1:1 redirect map**: `Old URL → New URL`.
- Redirect rules:
  - `301` (permanent) for all moved pages.
  - **No redirect chains** — Old → Final only.
  - **No mass redirects** to the homepage.
  - Final destination must return `200 OK`.

### B. Indexation Controls
- Staging site must **not** be indexable (use password protection or IP allowlist).
- Production must **not** accidentally carry `noindex` tags.
- `robots.txt` must:
  - Allow crawling of all important sections.
  - Not block CSS/JS required for rendering.

### C. SEO Parity for Top Pages
For each top-performing URL, preserve:
- Page intent and topic.
- Content depth (do not thin important pages).
- Title / H1 relevance.
- Key internal links pointing to it.

---

## 3. Build Requirements — Technical SEO Must-Haves

### Performance / Core Web Vitals
- Optimize images: use **WebP/AVIF**, correct sizing, lazy-load below the fold.
- Minimize JS, reduce HTTP requests.
- Implement caching + CDN for fast TTFB.
- **Mobile performance is a priority.**

### Crawlability & Site Hygiene
- Clean URL structure with a consistent trailing-slash policy.
- No broken internal links.
- Correct status codes:
  - `200` for live pages
  - `301` for moved pages
  - `404`/`410` only for intentionally removed pages

### Canonicals & Preferred Domain
- Enforce one preferred version:
  - **HTTPS only**
  - Choose **www** or **non-www** — 301 redirect the other.
- Self-referencing canonical tags on most pages.
- Avoid duplicate URLs from parameters or alternate paths.

### Structured Data (Schema)
Implement only for truthful content:

| Schema Type       | Where to Apply                                      |
|-------------------|-----------------------------------------------------|
| `LocalBusiness`   | Sitewide (single location)                          |
| `Service`         | Gearbox/CVT service pages                           |
| `BreadcrumbList`  | All service and blog pages                          |
| `Article`         | Blog posts                                          |
| `FAQPage`         | Only pages that contain real, visible FAQ content   |

### On-Page SEO Hygiene
- Semantic HTML with a proper heading hierarchy (one clear `H1` per page).
- Unique `<title>` and meta descriptions for all key pages.
- Descriptive `alt` attributes on meaningful images.

### Navigation & Internal Structure
- Clear service hierarchy with strong internal linking.
- Breadcrumbs on all service and blog pages.
- **Hub model:** Service Hub → Service Detail → Supporting Articles.

---

## 4. Local SEO + Klang Valley Targeting (Growth Plan)

- Build strong **"money pages"** around primary services:
  - Gearbox repair, CVT repair, diagnostics, oil change, etc.
- Add **Klang Valley relevance naturally** — service area wording, directions, and context. No keyword stuffing.
- Only create location-specific pages/sections if they are **genuinely helpful** and not thin doorway pages.
- Ensure consistent **NAP** (Name / Address / Phone) across the site and a strong Contact page.

---

## 5. Required Deliverables

| # | Deliverable                  | Details                                                                                  |
|---|------------------------------|------------------------------------------------------------------------------------------|
| 1 | Full URL Inventory           | All indexable URLs from the current WordPress site (via crawl tool).                     |
| 2 | Top URL List                 | Top pages by clicks/leads from Google Search Console and analytics.                      |
| 3 | Redirect Mapping Sheet       | `Old URL | New URL | Type | Priority | Redirect (301/none) | Notes`                      |
| 4 | XML Sitemap (new site)       | Only canonical `200` URLs included.                                                      |
| 5 | Launch Checklist Evidence    | Verified: robots/canonicals, redirects tested, mobile + CWV tested, 404 report reviewed. |

---

## 6. Migration Execution Plan

### Phase 1 — Pre-Build (Planning)
1. Crawl current site; export all URLs + metadata.
2. Pull GSC data to identify high-value URLs.
3. Decide which URLs stay unchanged vs. change.
4. Finalise Information Architecture (service categories, blog categories/tags policy).

### Phase 2 — Build (Staging)
1. Implement templates, schema markup, and performance best practices.
2. Recreate/upgrade top pages first (content parity before new content).
3. Generate new XML sitemap.
4. Implement redirect rules in staging for pre-launch testing.

### Phase 3 — Pre-Launch QA *(mandatory)*
1. Crawl staging environment:
   - Confirm no `noindex` from production config.
   - Verify canonical tags on all key pages.
   - Confirm internal links point to **final URLs** (not redirected ones).
2. Validate redirect map:
   - Every old URL returns `301 → final 200`.
   - No loops or chains.
3. Check mobile usability + PageSpeed Insights scores.

### Phase 4 — Launch
1. Deploy site and redirects **simultaneously**.
2. Submit new XML sitemap in Google Search Console.
3. Manually inspect a handful of top pages via GSC URL Inspection.

### Phase 5 — Post-Launch Monitoring *(first 2–4 weeks)*
- **Daily/weekly monitoring:**
  - GSC: Coverage errors, 404s, soft-404s, indexing status, performance trends.
  - Analytics: Organic sessions + conversions.
- **Fix immediately:**
  - Important 404s (especially those with backlinks or existing traffic).
  - Redirect mistakes.
  - Canonical or robots.txt issues.

---

## 7. Additional Notes

- Do **not** use `rel="prev"/"next"` — Google has deprecated support for this.
- Consolidate duplicate checklist items (SSL/HTTPS, schema, mobile) to keep the spec clean and action-oriented.
- All schema must reflect **truthful, visible content** — do not add structured data for content that doesn't exist on the page.
- Prioritise mobile-first implementation throughout — both for Core Web Vitals and local search behaviour.
