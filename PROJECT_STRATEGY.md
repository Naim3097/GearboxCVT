# Project Strategy — One X Transmission (gearboxcvt.com)
**Type:** WordPress → Custom Site Migration  
**Priority:** SEO preservation first, growth second  
**Last Updated:** 2026-03-25

---

## Strategic Summary

**gearboxcvt.com is a content hub — not a business website.** It is an independent-feeling informational resource covering everything about gearboxes in Malaysia: repair, CVT, maintenance, diagnostics, and buying guides. Readers arrive from organic search, consume useful content, and only discover One X Transmission when they choose to make contact.

The branding is intentionally subtle. No "One X Transmission" in the header, no overt business messaging anywhere on the site. It reads like a specialist knowledge resource. The business identity surfaces on the Contact page only — at the point the reader has already decided they trust the source.

Why this approach works:
- Readers trust neutral, informational resources more than obvious company blogs.
- Informational content captures people at every stage of the buying funnel, not just "ready to pay".
- A well-structured content hub builds topical authority faster and more durably than a service site.

Every decision in this build is measured against:
> **"Does this help a Malaysian with a gearbox problem find, read, and trust this resource?"**

Content depth and topical coverage matter more than design. SEO execution cannot be cut.

---

## Recommended Tech Stack

| Layer            | Choice                          | Reason                                                                                        |
|------------------|---------------------------------|-----------------------------------------------------------------------------------------------|
| Framework        | **Next.js 14+ (App Router)**    | SSG by default for static pages, built-in Image optimisation, native metadata API for SEO.   |
| Styling          | **Tailwind CSS**                | Utility-first, no unused CSS in production, easy responsive design.                           |
| CMS (Blog)       | **MDX files / Git**             | No database dependency, fast, version-controlled. Easy upgrade to headless CMS if needed.    |
| Hosting          | **Vercel**                      | First-class Next.js hosting, global CDN, fast TTFB, edge redirects, zero config.             |
| Images           | **WebP/AVIF via `next/image`**  | Automatic format conversion, correct sizing, lazy-load, prevents CLS — built-in.             |
| Analytics        | **Google Analytics 4 + GSC**   | Required for monitoring post-launch organic performance.                                       |
| Schema           | **JSON-LD via `<script>` tag**  | Clean, isolated, not mixed into HTML markup. Co-located per page module.                      |

**Next.js decisions:**
- Use **App Router** (`/app` directory) — native support for layouts, co-located components, and per-page `metadata` exports.
- All service and content pages use `generateStaticParams` + `force-static` (SSG). No server compute on page load.
- Use `next/image` everywhere — handles WebP/AVIF conversion, sizing, and lazy-load automatically.
- Use Next.js `metadata` export per page for unique `<title>`, meta description, and canonical — no third-party SEO plugin needed.
- Redirects defined in `next.config.js` under the `redirects()` function — one place, version-controlled.

---

## Site Architecture (Information Architecture)

The site is organised as a **topic-based content hub** — like a specialist magazine, not a company website. Each top-level route is a topic category. Articles live under their category. The Contact page is the only page that surfaces One X Transmission explicitly.

```
gearboxcvt.com/
├── /                                → Homepage (featured reads, category navigation — no business branding)
├── /gearbox-repair/                 → Category hub — all gearbox repair articles
│   └── /gearbox-repair/[slug]       → Individual article
├── /cvt/                            → Category hub — CVT-specific content
│   └── /cvt/[slug]
├── /automatic-transmission/         → Category hub — automatic transmission content
│   └── /automatic-transmission/[slug]
├── /maintenance/                    → Category hub — service intervals, oil change, upkeep
│   └── /maintenance/[slug]
├── /buying-guide/                   → Category hub — used car gearbox checks, what to look for
│   └── /buying-guide/[slug]
└── /contact/                        → One X Transmission is revealed here (NAP, WhatsApp, form)
```

### Why These Categories

| Category slug | What it targets |
|---|---|
| `/gearbox-repair/` | "gearbox rosak", repair costs, symptoms, diagnosis articles |
| `/cvt/` | "CVT problem Malaysia", service intervals, CVT vs torque converter |
| `/automatic-transmission/` | Auto gearbox slip, transmission flush, common failures |
| `/maintenance/` | Transmission oil change interval, gearbox service tips |
| `/buying-guide/` | Checking gearbox on used cars, what to test drive, red flags |

### Content Hub Rules
- **Category page** ranks for the broad topic (e.g. "gearbox repair Malaysia").
- **Article** ranks for specific long-tail queries (e.g. "gearbox slip panas kenapa").
- **Contact page** is the only conversion point — linked from every article via a soft, non-pushy CTA.
- **No `/blog/` prefix** — `/gearbox-repair/signs-of-failing-gearbox` reads as a credible resource, not a company blog post.

---

## Modular Folder Structure (Next.js App Router)

The project is organised **by module**. Each section of the site owns its components, data, and schema. Edits to one module cannot break another.

```
gearboxcvt/
├── app/                                  ← Next.js App Router root
│   ├── layout.tsx                        ← Root layout (header, footer, global schema)
│   ├── page.tsx                          ← Homepage entry
│   │
│   ├── [category]/                       ← Dynamic route — covers all topic categories
│   │   ├── page.tsx                      ← Category hub page (SSG via generateStaticParams)
│   │   └── [slug]/
│   │       └── page.tsx                  ← Individual article (SSG)
│   │
│   ├── contact/
│   │   └── page.tsx                      ← One X Transmission is revealed here
│   │
│   ├── not-found.tsx                    ← Custom 404 page
│   └── sitemap.ts                        ← Auto-generated XML sitemap
│
├── modules/                              ← Page modules (one folder per section)
│   ├── home/
│   │   ├── HeroSection.tsx              ← Resource-style intro — no brand mention
│   │   ├── CategoryGrid.tsx             ← Links to all topic categories
│   │   ├── FeaturedArticles.tsx
│   │   └── HomeSchema.tsx               ← WebSite JSON-LD (NOT LocalBusiness)
│   │
│   ├── category/
│   │   ├── CategoryHero.tsx
│   │   ├── ArticleCard.tsx
│   │   └── CategorySchema.tsx           ← CollectionPage + BreadcrumbList JSON-LD
│   │
│   ├── article/
│   │   ├── ArticleLayout.tsx
│   │   ├── ArticleBody.tsx
│   │   ├── RelatedArticles.tsx
│   │   ├── ContactCTA.tsx               ← Soft CTA: "Need a specialist? → Contact"
│   │   └── ArticleSchema.tsx            ← Article + BreadcrumbList JSON-LD
│   │
│   └── contact/
│       ├── ContactForm.tsx              ← WhatsApp link + contact form
│       ├── ContactInfo.tsx              ← One X Transmission, address, phone
│       └── ContactSchema.tsx            ← LocalBusiness JSON-LD (ONLY on this page)
│
├── components/                          ← Truly shared UI only
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   └── ui/
│       ├── Button.tsx
│       └── SectionWrapper.tsx
│
├── content/
│   └── articles/                        ← All content, organised by category
│       ├── gearbox-repair/
│       │   └── [slug].mdx
│       ├── cvt/
│       │   └── [slug].mdx
│       ├── automatic-transmission/
│       │   └── [slug].mdx
│       ├── maintenance/
│       │   └── [slug].mdx
│       └── buying-guide/
│           └── [slug].mdx
│
├── lib/
│   ├── seo.ts                           ← Metadata helpers (title, description, canonical)
│   ├── schema.ts                        ← Schema builder utilities
│   └── redirects.ts                     ← 301 redirect map (imported by next.config.js)
│
├── public/
│   ├── images/
│   ├── robots.txt
│   └── favicon.ico
│
└── next.config.js                       ← Redirects, image domains, headers
```

### Editing Guide — Where to Go for What

| I want to change...                    | Edit this                                          |
|----------------------------------------|----------------------------------------------------|
| Homepage layout or sections            | `modules/home/`                                    |
| A category page layout                 | `modules/category/`                                |
| An article layout or reading experience| `modules/article/`                                 |
| Write or edit an article               | `content/articles/[category]/[slug].mdx`           |
| Contact page (business details)        | `modules/contact/`                                 |
| Header or Footer                       | `components/layout/`                               |
| Page `<title>`, description, canonical | `lib/seo.ts` + the page's `metadata` export        |
| JSON-LD schema for a page              | `modules/[section]/[Section]Schema.tsx`            |
| 301 redirects                          | `lib/redirects.ts` → imported by `next.config.js`  |
| `robots.txt`                           | `public/robots.txt`                                |
| XML sitemap                            | `app/sitemap.ts`                                   |

### Key Conventions
- `LocalBusiness` schema is placed **only in `modules/contact/ContactSchema.tsx`** — intentionally not sitewide. This keeps the content hub neutral.
- Each `modules/[section]/` folder is **self-contained**. It only imports from `components/` for genuinely shared UI.
- All articles are MDX files under `content/articles/[category]/` — adding content never requires touching any component code.
- Redirects live in `lib/redirects.ts` as a typed array, imported by `next.config.js` — single source of truth for all 301 rules.

---

## Pre-Build Decisions

### Current Site Audit
> ⏳ **Pending** — GSC data and site crawl not yet provided. The redirect map cannot be finalised until this is done. This section will be updated once crawl data is received. Do not begin Phase 2 (build) until complete.

### Confirmed Decisions

| Decision | Confirmed Choice |
|---|---|
| Preferred domain | `gearboxcvt.com` (non-www) |
| Protocol | HTTPS only — HTTP redirects to HTTPS |
| Site display name | `GearboxCVT` (neutral, topical — not "One X Transmission") |

The non-www version is canonical. `www.gearboxcvt.com` → 301 → `gearboxcvt.com` at the DNS/server level.

### Suggested Decisions *(approve before build starts)*

#### Article URL Structure
**Recommended:** `/[category]/[article-slug]` — no `/blog/` prefix

| Option | Example URL | Verdict |
|---|---|---|
| ✅ `/[category]/[slug]` | `/gearbox-repair/cara-tahu-gearbox-rosak` | Keyword in path, reads like a resource |
| ❌ `/blog/[slug]` | `/blog/cara-tahu-gearbox-rosak` | Reads like a company blog, no topic signal |

#### Category Pages
**Recommended:** Indexed and included in sitemap.  
Category pages (`/gearbox-repair/`, `/cvt/`, etc.) act as topical hub pages and can rank for broad head terms on their own. They are not thin pages — they display article lists with excerpts.

#### Tag Pages
**Recommended:** No tags at all.  
Tags create near-duplicate thin pages and dilute crawl budget. If the current WordPress site has tags, redirect `/tag/[name]/` → the most relevant category page.

#### Trailing Slash Policy
**Recommended:** No trailing slash (Next.js default).  
`/gearbox-repair/cara-tahu-gearbox-rosak` — not with a trailing `/`.  
Enforced site-wide via `trailingSlash: false` in `next.config.js`. Consistency is mandatory — never mix.

#### Title Tag Display Name
**Recommended:** `Article Title | GearboxCVT`  
Not `| One X Transmission` — that reveals the business on every Google result, breaking the neutral content hub feel. `GearboxCVT` is the public-facing brand for this hub.

---

## URL Strategy (Protect Rankings First)

### Rule: Preserve existing WordPress URLs wherever possible.

WordPress commonly uses these URL patterns:
- `/service-name/` (Pages)
- `/blog/post-slug/` or `/post-slug/` (Posts)
- `/category/category-name/` (Category archives)

**Action required before build starts:**
1. Crawl the live site with Screaming Frog (or similar).
2. Pull top URLs from GSC (last 12 months, sorted by clicks).
3. Map every existing URL to its new equivalent.

**Decision logic for each URL:**

```
Is this URL in the top 20 by GSC clicks?
  YES → Keep URL identical. Non-negotiable.
  NO  → Can it fit the new IA cleanly?
          YES → Keep it.
          NO  → 301 to the most relevant new URL. Document in redirect map.
```

**Never do:**
- Redirect multiple old URLs to the homepage.
- Create redirect chains (A → B → C). Always A → C.
- Leave an old URL returning 404 if it had any backlinks or GSC impressions.

---

## Content Strategy

### Articles *(core of the site)*
Every article targets one specific search query. It answers that question thoroughly and links to related articles and — at the bottom — a soft contact CTA.

Each article must:
- Target **one clear search intent** (informational: why, how, what, berapa, boleh ke, etc.).
- Open with a useful answer — don't bury the lead.
- Be written in a neutral, informative voice. Never "at One X Transmission we..."
- Contain at least 600–900 words of genuinely useful content. No padding.
- End with a **soft CTA**: e.g. *"If your gearbox needs a check, you can reach a specialist here."* — linking to `/contact/`.
- Link to 2–3 related articles within the same or adjacent category.

### Category Pages *(topic hubs)*
Each category page (`/gearbox-repair/`, `/cvt/`, etc.) acts as a topic index:
- H1: the broad topic (e.g. "Gearbox Repair — Everything You Need to Know").
- Brief 2–3 sentence intro explaining what the section covers.
- List of all articles in the category with titles and short excerpts.
- No business promotion — reads like a curated resource section.

### Homepage
- Reads like a **magazine front page**, not a business homepage.
- Featured articles (latest or curated picks) and category navigation grid.
- No "About Us", no business address, no phone number.
- Site name: **GearboxCVT** — neutral, topical, no affiliation visible.

### Contact Page *(the only business-facing page)*
- This is where One X Transmission is revealed.
- **WhatsApp button** is the primary CTA — how most Malaysian users prefer to contact.
- Simple contact form: name, phone, message.
- Full business info: name, address, phone, business hours.
- Embedded Google Map.
- Schema: `LocalBusiness` with full NAP.
- Tone shift is appropriate here — this is the conversion page.

---

## Technical Implementation Checklist

### Performance
- [ ] All images served as WebP/AVIF.
- [ ] Images have explicit `width` and `height` attributes (prevents CLS).
- [ ] Above-the-fold images are NOT lazy-loaded (prevents LCP delay).
- [ ] Below-the-fold images use `loading="lazy"`.
- [ ] No render-blocking JS in `<head>` (defer/async all scripts).
- [ ] CSS is minimal and inlined or bundled (no unused CSS in production).
- [ ] Vercel CDN active (built-in with Vercel deployment — no extra config needed).
- [ ] TTFB target: < 200ms.
- [ ] Mobile PageSpeed score target: > 85.

### Canonicals & Domain
- [ ] Preferred domain confirmed: `https://gearboxcvt.com` (non-www). `www` version 301 redirects to `gearboxcvt.com`.
- [ ] The non-preferred version 301 redirects to the preferred version (set at DNS/server level).
- [ ] HTTPS enforced. HTTP → HTTPS 301 redirect active.
- [ ] Self-referencing `<link rel="canonical">` on every page.
- [ ] No duplicate content from URL parameters.

### robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /staging/

Sitemap: https://gearboxcvt.com/sitemap.xml
```
- [ ] Does NOT block CSS, JS, or image directories.
- [ ] Staging server has a SEPARATE restrictive robots.txt (or password protected — preferred).

### XML Sitemap
- [ ] Only includes canonical, indexable `200` URLs.
- [ ] Excludes: pagination, tag pages (unless they have unique value), admin URLs.
- [ ] Submitted to GSC immediately after launch.

### Structured Data (Schema — JSON-LD)

Schema is placed **per page module** — not globally. `LocalBusiness` is intentionally **not** in the root layout. It only appears on the Contact page to preserve the neutral content hub feel.

| Page | Schema Type | Notes |
|---|---|---|
| Homepage | `WebSite` | Site name signal only — no business info |
| Category pages | `CollectionPage` + `BreadcrumbList` | Topic-level hub |
| Article pages | `Article` + `BreadcrumbList` | Add `FAQPage` only if real FAQs exist on the page |
| Contact page | `LocalBusiness` (`AutoRepair`) | Full NAP, phone, address, hours, `sameAs` |

### On-Page SEO
- [ ] One `H1` per page, matching the page's primary keyword intent.
- [ ] Heading hierarchy: H1 → H2 → H3 (no skipped levels).
- [ ] Unique `<title>` for every page. Format: `Page or Article Title | GearboxCVT`.
- [ ] Unique meta description for every key page (< 160 characters).
- [ ] All meaningful images have descriptive `alt` text.
- [ ] Internal links use descriptive anchor text (not "click here").

---

## Redirect Map Template

Create a spreadsheet / CSV with this structure before build starts:

| Old URL | New URL | Status | Type | Priority | Notes |
|---------|---------|--------|------|----------|-------|
| `/old-page/` | `/services/gearbox-repair/` | 301 | Permanent | High | Top 10 GSC page |
| `/old-blog-post/` | `/blog/new-slug/` | 301 | Permanent | Medium | Has backlinks |
| `/category/services/` | `/services/` | 301 | Permanent | Low | Archive page |

**Priority definitions:**
- **High** — Page is in top 20 GSC clicks or has external backlinks.
- **Medium** — Page has GSC impressions or is linked internally.
- **Low** — Page exists but has no significant traffic or links.

Implement all High and Medium priority redirects. Low priority redirects are good to have but not blocking.

---

## Organic Content Targeting Strategy

### Primary Keywords by Category

| Category | Category page target | Example article targets |
|---|---|---|
| `/gearbox-repair/` | "gearbox repair Malaysia" | "gearbox slip masa panas", "kos tukar gearbox", "gearbox bunyi pelik" |
| `/cvt/` | "CVT gearbox Malaysia" | "CVT service interval", "CVT vs torque converter", "CVT jerky problem" |
| `/automatic-transmission/` | "auto gearbox problem Malaysia" | "auto gearbox jerk", "transmission flush perlu ke", "gearbox tak boleh masuk gear" |
| `/maintenance/` | "transmission oil change Malaysia" | "minyak gear bila nak tukar", "gearbox service berapa lama sekali" |
| `/buying-guide/` | "cara check gearbox kereta terpakai" | "tanda gearbox rosak second hand", "test drive apa nak tengok" |

### Klang Valley Local Signals
- Mention Klang Valley, Selangor, KL, Subang Jaya, Shah Alam, PJ **naturally in article context** where relevant.
- Do **not** force location mentions into every article — only where it adds actual meaning (local pricing, local context, area comparisons).
- Only the Contact page carries **full local business signals** (address, map, phone number).
- Do **not** repeat NAP sitewide — that breaks the neutral content hub feel.

### NAP *(Contact page and Google Business Profile only)*
The following must be **identical** across the Contact page, Google Business Profile, and any directory listings:

```
Business Name: One X Transmission
Address:       [FULL ADDRESS — confirm exact format]
Phone:         [PHONE — confirm format: +60X-XXXX XXXX]
```

`LocalBusiness` schema on the Contact page must match this exactly.

---

## Development Workflow

```
[Local Dev]  →  [Git Push]  →  [Staging (password-protected)]  →  [QA Sign-off]  →  [Production]
```

1. **Local:** Build and test locally. Never commit broken code.
2. **Staging:** Password-protected subdomain (e.g., `staging.gearboxcvt.com`) or separate URL. `robots.txt` set to `Disallow: /`.
3. **QA Sign-off:** Complete pre-launch checklist. No exceptions.
4. **Production:** Deploy site + redirects simultaneously. Submit sitemap. Begin post-launch monitoring.

---

## Pre-Launch QA Gate (Must Pass Before Go-Live)

Run through this checklist. Every item must be confirmed before deployment.

### Redirects
- [ ] Every old URL (from redirect map) tested and returns `301`.
- [ ] Every `301` destination returns `200 OK`.
- [ ] No redirect chains detected.
- [ ] No redirect loops detected.

### Indexation
- [ ] Staging has `noindex` or is password-protected.
- [ ] Production `robots.txt` allows crawling of all key pages.
- [ ] No `noindex` tags on production pages.
- [ ] Canonical tags correct on all pages.

### Performance
- [ ] Mobile PageSpeed Insights: core pages score > 85.
- [ ] No render-blocking resources.
- [ ] LCP image is not lazy-loaded.
- [ ] No layout shift on load (CLS < 0.1).

### Content & SEO
- [ ] Every page has a unique `<title>` and meta description.
- [ ] Every page has exactly one `H1`.
- [ ] All images have `alt` attributes.
- [ ] Internal links are not broken.
- [ ] Schema validates without errors (use Google Rich Results Test).

### Final Checks
- [ ] HTTPS works on all pages. HTTP redirects to HTTPS.
- [ ] Preferred domain (www vs non-www) is enforced.
- [ ] Google Analytics 4 fires correctly on all pages.
- [ ] XML sitemap accessible at `/sitemap.xml` and contains only `200` URLs.
- [ ] Contact form sends and receives correctly.

---

## Post-Launch Monitoring Plan

### Week 1–2: Daily
- Check GSC Coverage for new errors (404s, soft-404s, blocked by robots).
- Check GSC Performance: any sudden drop in impressions on key pages.
- Check analytics: organic sessions vs. pre-migration baseline.
- Fix any 404s that appear for high-priority URLs.

### Week 3–4: Weekly
- Review GSC indexing progress (are new pages indexed?).
- Check top-10 page rankings vs. pre-launch baseline.
- Review crawl errors in GSC.
- Review Core Web Vitals report in GSC.

### Ongoing
- Add blog content regularly (minimum 1–2 posts/month) targeting informational queries.
- Monitor and respond to Google Business Profile reviews.
- Build citations on local Malaysian directories (Recommend.my, DirectoryMY, etc.).

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Top URL returns 404 after launch | Medium | High | Full redirect map QA before go-live |
| `noindex` accidentally on production | Medium | High | Add canonical/robots check to QA gate |
| Redirect chains cause crawl budget waste | Low | Medium | Test every redirect end-to-end |
| CWV regression on mobile | Medium | Medium | PageSpeed test on mobile before launch |
| NAP mismatch between site and GBP | Low | Medium | Audit and align before launch |
| Staging gets crawled/indexed | Low | High | Password-protect staging, restrictive robots.txt |
| Content thinning on migrated pages | Medium | High | Content parity review for every top-10 URL |

---

## Definition of Done

The migration is complete and successful when:

1. All top-20 GSC pages are live, indexed, and returning `200`.
2. All redirect map entries confirmed working (301 → 200, no chains).
3. Mobile PageSpeed scores > 85 on core pages.
4. GSC organic performance is within ±20% of pre-launch baseline after 4 weeks.
5. Schema validated on Homepage, all service pages, and Contact page.
6. New XML sitemap submitted and accepted in GSC.
7. No critical crawl errors in GSC Coverage report.
