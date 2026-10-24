# V2 SEO foundation

**Status:** Planning and audit (23 October 2026)  
**Progress tracking:** [project-status.md](../project-status.md)

SEO work is integrated into each remaining page implementation, not deferred to a final QA pass. The marketing agency may review the password-protected dev storefront before launch.

---

## A. Production baseline (read-only, verified where noted)

**Store:** `https://www.zitasartstudio.com` (Flora / legacy published theme — **not modified**)

| Item | Finding | Confidence |
|---|---|---|
| **Robots** | `robots.txt` returns 200; Shopify default crawl rules + agent/UCP comments | Verified |
| **Sitemap** | `/sitemap.xml` returned **500** during audit | Unverified — retry in Admin or browser |
| **Homepage meta** | Title/description tags present in HTML (theme-dependent) | Partial curl sample |
| **Product URLs** | `/products/{handle}` — e.g. `vibrant-life` | Verified via Storefront JSON |
| **Product titles** | Often include dimensions in title (e.g. “Vibrant Life I - 16 x 20”) | Verified |
| **Product descriptions** | HTML in `body_html`; used on live PDP | Verified (JSON API) |
| **Canonical** | Not observed in one curl sample on product HTML | Unverified — may be theme-specific |
| **Meta description** | Not observed in one curl sample on product HTML | Unverified |
| **Structured data** | Not audited on production HTML in this pass | Unverified |
| **Redirects** | Admin redirect list not accessed | Unverified |
| **Image filenames** | CDN filenames on production (e.g. product media) | Partial |

**Risks for migration:** Legacy handles (PoC notes misaligned handles), title-as-dimension pattern, inconsistent meta fields, sitemap availability.

---

## B. V2 technical SEO audit (Partner dev theme / local codebase)

### Implemented today

| Area | V2 state |
|---|---|
| **Title** | `snippets/meta-tags.liquid` — `page_title`, shop name suffix, pagination/tags |
| **Meta description** | Rendered when `page_description` set on resource |
| **Canonical** | `link rel="canonical" href="{{ canonical_url }}"` |
| **Open Graph / Twitter** | Basic OG + Twitter cards; product OG price when product page |
| **Product JSON-LD** | `product \| structured_data` on product pages only |
| **Homepage h1** | Visually hidden h1 on index in `theme.liquid` |
| **Skip link** | Present |
| **404** | Custom `zita-not-found` section (local); correct 404 template type |
| **Lazy loading** | Via `responsive-image` / product media patterns (PDP) |
| **Dev store indexing** | Password protection — **must remain** until launch |

### Gaps / defects (technical)

| Gap | Severity | Notes |
|---|---|---|
| **Skeleton `/search`** | Medium | Unstyled; weak internal discovery |
| **Collection SEO** | Medium | Editorial content in metafields; verify titles/descriptions in Admin |
| **About / Exhibitions / Portfolio / Contact** | High | Pages not fully built; metadata strategy per checklist below |
| **Variant URLs** | Medium | PDP JS does not yet sync `?variant=` (planned milestone) |
| **Global `contact_email` default** | Low (brand) | Schema default updated locally; **saved settings** on remote themes unchanged |
| **“Bag” copy** | Low SEO / brand | Cart strings; planned “Add to Cart” pass |
| **Shop Pay / accelerated checkout** | Commerce | Not on V2 original PDP yet |
| **hreflang / Markets** | Deferred | USD-only launch |
| **Breadcrumbs** | Good | PDP + semantic nav where implemented |

### Content dependencies

- Ranjeeta + agency: product/collection meta descriptions, artwork alt text, series copy, policy text.
- [Product cleanup import spec](product-cleanup-import-spec.md) for catalog fields.

---

## C. Page-level SEO checklist (reuse per page)

For each template, confirm before launch:

1. **One clear h1** per page (visible or intentionally hidden only where already approved, e.g. homepage).
2. **Unique `<title>`** — resource SEO title or sensible Liquid fallback; avoid duplicate shop-name stuffing.
3. **Meta description** — written for humans; 150–160 chars where possible; no keyword stuffing.
4. **Canonical** — correct for paginated collections and filtered PLP (Shopify defaults; verify filtered states).
5. **Heading hierarchy** — no skipped levels in main content.
6. **Internal links** — nav, footer, editorial CTAs, related works, cross-series links.
7. **Images** — descriptive **alt**; filenames sensible on upload; dimensions via `responsive-image` where used.
8. **Product PDP** — short customer-facing description near buy box (planned); `artwork_story` for editorial band; JSON-LD intact.
9. **Collections** — series title + optional editorial band; filter URLs indexation (Shopify Search & Discovery).
10. **Performance** — minimal JS on editorial pages; critical CSS pattern on shell.
11. **Accessibility** — landmarks, focus, contrast (surfaces amendment rules on About).
12. **404** — helpful links home / originals; no soft-200 errors (Shopify 404 template).

**Pages:** Homepage · Original PDP · Collection/series · About · Exhibitions · Portfolio · Contact · Policies · 404.

---

## D. Agency preview readiness

### Sharing the dev storefront safely

1. Share **store URL** + **storefront password** through a secure channel (not in Git).
2. Always use **QA theme preview** for About until promoted:  
   `https://zitas-art-studio-development.myshopify.com/pages/about?preview_theme_id=193116733733`
3. For sitewide V2 on published dev theme (when ready): password + published theme URL.
4. **Do not** disable password protection for crawlers pre-launch.
5. Optional: Theme Editor preview links for specific pages (Admin → Themes → About QA → Preview).

### Agency handoff checklist

| Topic | Status |
|---|---|
| **Approved design** | Claude V2 handoffs + design brief — **frozen** unless Ranjeeta requests change |
| **Homepage / PLP / PDP / header** | Implemented on dev; parity with Git may lag published theme |
| **About** | On QA theme `#193116733733`; provisional copy; portrait crop file may need upload |
| **Exhibitions / Portfolio / Contact** | Not built; designs approved |
| **Commerce** | Cart page, variants, Shop Pay — partial / planned |
| **SEO** | Foundation doc (this file); production baseline partial |
| **Content feedback wanted** | Series copy, product descriptions, meta descriptions, alt text, About biography, exhibition list |
| **Open business decisions** | Policies, refunds/shipping, diptych/bundle model, print strategy |
| **Do not review as final** | Password page, skeleton search, placeholder Contact template on dev |

---

## E. Redirect and launch URL strategy (planning only)

- Inventory production handles before Phase B.
- Plan 301 redirects in Shopify Admin for renamed handles (no changes in this milestone).
- Preserve high-traffic product URLs (e.g. `vibrant-life`).

---

*Update this document when production sitemap/meta audits complete or when V2 templates ship.*
