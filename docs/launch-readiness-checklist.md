# Launch Readiness — Zita's Art Studio

**Last updated:** 2 November 2026
**Overall status:** Development storefront substantially complete. Remaining work is primarily **content approval**, **business decisions**, and **production launch validation**.
**Git baseline:** `dd13cc5` on `main` / `origin/main` (local SEO/URL cleanup uncommitted)
**Development theme:** `#192367558949` · `zitas-art-studio-development.myshopify.com`
**Production:** Untouched until Phase B authorization.

The Partner development storefront (theme, shell UX, policies layout, development catalog/collections) is in place. This document is the **single source of truth** for remaining launch work. Environment and milestone truth also lives in [`docs/project-status.md`](project-status.md). Do **not** mark owner approvals complete without explicit confirmation.

### Responsibility legend

| Owner | Meaning |
|---|---|
| **Ranjeeta** | Content, business decisions, policy/copy approval, final go/no-go |
| **Praveen** | Technical verification, MerchantSignals, content integration after approval, production changes after authorization |
| **Shared** | Needs both parties (decision + implementation) |

---

## Owner dashboard

### Snapshot

| Task | Owner | Status | Next action | Dependency |
|---|---|---|---|---|
| Artwork content workbook (30) | Ranjeeta | Waiting | Complete workbook | Spec + Stage 2A scope |
| Collection content workbook (8) | Ranjeeta | Waiting | Complete workbook | Development collections live |
| Example artwork bundles (1–2) + pricing | Ranjeeta | Waiting | Send selection + intended pricing | Paired-commerce model |
| Water II availability / inventory | Ranjeeta | Waiting | Confirm Admin truth | Sellable while untracked today |
| Store policies (returns, shipping, …) | Ranjeeta | Waiting | Review + approve content | Layout already on native `/policies/*` |
| Development storefront visual/content feedback | Ranjeeta | Waiting | Review authenticated preview | Password session |
| MerchantSignals scan | Praveen | **Ready for scan** | Run on authenticated storefront (not password gate) | Dev password session |
| MerchantSignals remediations | Praveen | **Partial** | Targeted: Originals URL + Org JSON-LD done; finish after full scan | Scan results |
| PDP “In your cart” accuracy (if still reproducible) | Praveen | Open | Reproduce + fix if needed | Bundles / cart state |
| Production checkout / payment verification | Praveen | Deferred to launch | Smoke after production payments live | Phase B + payments |
| Shop Pay on PDP / checkout (eligible) | Praveen | Not started | Verify where supported | Payments eligibility |
| Integrate approved workbook content | Praveen | Blocked | Apply after workbooks done | Ranjeeta workbooks |
| Final production changes | Praveen | Blocked | Execute after authorization | Go/no-go + backup |

### Waiting on Ranjeeta

1. Review and complete the **artwork content workbook** — 30 artworks.
2. Review and complete the **collection content workbook** — 8 collections.
3. Provide **one or two example artwork bundles**, including artwork selection and intended pricing.
4. Confirm **Water II** availability and inventory.
5. Review and approve **store policies**, including returns and shipping commitments.
6. Review the **development storefront** and provide final visual/content feedback.

### Waiting on Praveen

1. Run **MerchantSignals** on the development storefront (**Ready for scan** — authenticated pages, not the password gate).
2. Review remaining MerchantSignals findings after the 2 Nov targeted remediations (Originals `/collections/originals`, Organization JSON-LD).
3. Address the previously reported PDP **“In your cart”** accuracy issue if still reproducible.
4. Perform **production checkout/payment** verification during launch.
5. Verify **Shop Pay** on PDP and checkout where supported and eligible.
6. **Integrate approved content** after Ranjeeta completes the workbooks.
7. Make the **final production changes** after authorization.

### Completed (development)

- Shopify Bundles functionality tested by Praveen.
- Contact form tested and working.
- Sticky header approved.
- PLP Quick Add approved.
- PDP floating Add to Cart approved.
- Policy-page design implemented.
- Footer approved after simplification.
- Favicon verified.
- 404 page verified.
- Development password protection verified.
- Git consolidation completed at `dd13cc5`.
- Development Active catalog (30) + collections/nav migration complete (production cutover still deferred).
- Originals collection handle renamed to `originals` with Admin redirect from `v2-poc-original-artworks`.
- Editorial CTAs + PDP breadcrumbs point at `/collections/originals` (not `/collections/all`).
- Homepage Organization JSON-LD (`Zita's Art Studio`) verified on development.
- Search exposure audited: header/mobile link present; basic `/search` functional; no redesign.

### Deferred (not blocked theme development)

- Production catalog migration until content approval.
- Production payment testing until production launch.
- Final go/no-go until both parties agree.
- Dedicated rollback-planning workstream is not currently prioritized (basic backup before publish remains required at cutover).

---

# Technical checklist (detail)

**Created:** 31 October 2026
**Updated:** 2 November 2026 (Originals handle + Org JSON-LD remediations; search audit; MerchantSignals still ready-for-scan)
**Authority:** Pre-launch work tracking. Environment truth: [`docs/project-status.md`](project-status.md).
**Evidence basis:** Git `main` / `origin/main` @ `dd13cc5`, architecture docs, owner decisions, Partner-dev QA through 1 November 2026, M6 reports.
**Production store:** Untouched (Phase B). Partner-dev proof ≠ production cutover.

Historical IDs below are preserved. The owner dashboard above is the operator-facing summary; use the tables for verification notes and dependencies.

---

## Launch critical path

```text
1. Documentation refresh                          [DONE — 1 Nov 2026]
2. Bundles inventory/availability messaging       [Implemented on #192367558949; “In your cart” accuracy still open]
3. M6 Stage 2B Draft trial import (dev only)      [DONE — development]
4. Validate trial products / images / inventory   [DONE Admin + Phase 4 browser samples; water-ii still open]
5. Extract + migrate collections (development)    [DONE Stage 3B on development]
6. Active catalog on development (30)             [DONE — production cutover deferred]
7. Essential content, commerce, mobile, a11y, SEO [IN PROGRESS — MerchantSignals ready; content approvals open]
8. Ranjeeta final approval                        [Waiting]
9. Production deploy with backup                  [Not started — Phase B]
10. Production smoke test                         [Not started — Phase B]
```

**Can run in parallel:** Artwork/collection workbooks, Water II confirmation, policy content approval, MerchantSignals scan, Shop Pay decision, series editorial copy, About/Portfolio/Contact content.

Ordinary variant UX and Bundles parent ATC are proven on development. Near-term gates are **owner content/decisions**, **MerchantSignals**, residual **“In your cart”** accuracy if reproducible, then **production cutover**. Production Bundles **app install** is required only if launch sells Bundles parents; paired works may ship as single SKU pending owner decision (**clarify** — see L-PDP-09).

---

## Open work by priority (1 Nov 2026)

Counts = rows that are **not** fully closed (excludes pure **Implemented + Verified** / **Approved** completion). Items that are Implemented but still **Requires verification**, **Not started**, **Blocked**, **Ready for scan**, or **Needs clarification** are counted as open. Recount from tables when statuses change.

| Priority | Open (approx.) | Role |
|---|---:|---|
| **P0** | **~35** | Launch blockers / must-complete before public launch (many are content, decisions, or production cutover — not unfinished theme shell) |
| **P1** | **~20** | Launch polish — complete if possible; not every row blocks cutover |
| **P2** | **4** | Post-launch / near-term backlog |

### Top launch blockers (now)

1. **Owner content workbooks** — 30 artworks + 8 collections (L-CAT-01, collection editorial).
2. **Owner decisions** — Water II inventory, policy content approval, paired/bundle examples, final visual feedback (L-CAT-12, L-CNT-06, L-CNT-10).
3. **MerchantSignals** — **Ready for scan — Praveen** (L-SEO-01); targeted Originals URL + Organization schema remediations done on development — close remaining findings after full scan.
4. **PDP “In your cart” accuracy** if still reproducible (related to L-PDP-17 / cart state messaging).
5. **Production cutover safety** — backup, unpublished theme parity, checkout/payment smoke, Ranjeeta go/no-go (L-DEP-*, L-COM-02, L-CNT-10). Dedicated rollback drill is deferred in priority, not waived at publish.

---

## Project status summary (1 Nov 2026)

V2 core storefront pages are **implemented** on Partner development (`zitas-art-studio-development.myshopify.com`, theme `#192367558949`) and on `origin/main` @ `dd13cc5`: Homepage, sticky header, footer, PLP (+ Quick Add), original PDP (+ floating ATC), cart, About, 404, Exhibitions, Contact, Portfolio, policy layout, favicon.

**PDP commerce:** Description/variants **Verified** on fixtures. Shopify Bundles **installed on development**; parent ATC tested. `c11f7e1` fixed a false “already in bag” 422 path. **L-PDP-17** messaging is implemented; residual **“In your cart”** accuracy remains a Praveen follow-up if still reproducible.

**Inquiry / Contact:** Prefill **Verified**; contact form **tested and working** (operator). Production CAPTCHA re-check still belongs in post-launch smoke.

**Catalog (M6):** Stage 1 + 2A offline **complete**. Stage 2B–3B **complete on development** (30 Active published; collections/nav live). **Production catalog/collections untouched.**

**Not launch-ready:** Production catalog/metafields cutover, owner workbook/content approvals, Water II decision, MerchantSignals + remediations, production checkout/payments, final go/no-go.

### Status vocabulary

| Status | Meaning |
|---|---|
| **Implemented** | Code or Admin config exists in repo / known environment |
| **Verified** | Exercised on the target environment with recorded acceptance |
| **Approved** | Explicit owner (or designated) sign-off |
| **Blocked** | Waiting on access, decision, content, or dependency |
| **Not started** | No meaningful work yet |
| **Requires verification** | Claimed or partial; must be re-checked before treating as done |
| **Ready for scan** | Prerequisites met; scan not yet run (MerchantSignals) |
| **Needs clarification** | Severity or launch-blocking status uncertain — do not silently downgrade |

Priorities: **P0** launch-blocking · **P1** launch polish · **P2** post-launch backlog.

---

## 1. PDP description and variant functionality

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-PDP-01 | P0 | Display `product.description` directly under price in buy box (rich text, no metafield) | Praveen | **Implemented** + **Verified** (dev) | Theme `#192367558949`; `3ae754a` | Essence + Colored by Nature-Blue: description under price (desktop); mobile info column after status; story band remains `artwork_story` only |
| L-PDP-02 | P0 | Functional option selectors when product has real variants | Praveen | **Implemented** + **Verified** (dev, 1 option) | `3ae754a` | Temporary Essence Presentation select rendered; hidden for `has_only_default_variant` after restore |
| L-PDP-03 | P0 | Price updates on variant change | Praveen | **Implemented** + **Verified** (dev) | L-PDP-02 | Diptych → `$2,800`; Single → `$1,500` observed live |
| L-PDP-04 | P0 | Availability / sold messaging + disabled ATC on unavailable variant | Praveen | **Implemented** + **Verified** (dev) | L-PDP-02 | Sold status, unavailable note, ATC disabled on sold Diptych |
| L-PDP-05 | P0 | Selected variant ID submitted; cart line shows correct variant | Praveen | **Implemented** + **Verified** (dev) | L-PDP-02; cart page | ATC of Single panel → cart line `Essence V2 - Single panel` |
| L-PDP-06 | P0 | URL `?variant=` updates on change | Praveen | **Implemented** + **Verified** (dev) | L-PDP-02 | Observed on Essence temporary variants |
| L-PDP-07 | P0 | Two-option variant matrix + unavailable combination testing | Praveen | **Verified** (dev, Size/Finish QA product + manual QA) | Published QA fixtures | Size × Finish selectors and ATC confirmed; missing-combo edge cases still **Requires verification** if any matrix holes remain |
| L-PDP-08 | P0 | Published multi-variant product QA on Online Store channel | Praveen | **Verified** (dev fixtures live) | — | Handles `v2-variant-qa-size-finish`, `v2-variant-qa-diptych` storefront-reachable; keep as **dev-only** fixtures (see § QA fixtures) |
| L-PDP-09 | P0 | Shared inventory / diptych commerce model (Bundles vs variants vs workflow) | Praveen + Ranjeeta | **Needs clarification** + partial | Owner listing decision; Ranjeeta example bundles (1–2) + pricing; may defer production Bundles install if pairs stay single-SKU at launch | Dev Bundles app + `artwork-bundle` ATC **Verified** (operator); owner model for Active paired listings **Pending**; production Bundles install **Not started** |
| L-PDP-14 | P0 | Bundle PDP Add to Cart reliability (422 / wrong “in bag” path) | Praveen | **Implemented** + **Verified** (dev) | Shopify Bundles parent variants; `c11f7e1` | 422 sold-out/conflict keeps `?variant=`, marks unavailable, announces Shopify description — residual “In your cart” accuracy tracked under L-PDP-17 |
| L-PDP-17 | P0 | Bundles inventory / availability messaging + PDP **“In your cart”** accuracy when a component is already in cart or unavailable | Praveen | **Implemented**; Bundles parent ATC **tested**; **Open** if “In your cart” still reproducible | L-PDP-14; `artwork-bundle` | Friendly messages for component-in-cart vs ambiguous inventory 422; no Sold badge from recoverable 422. Option-select restore after ATC section refresh fixed. **Follow-up:** re-check “In your cart” accuracy on authenticated `#192367558949` |
| L-PDP-15 | P1 | Artwork inquiry CTA → Contact deep-link with title/URL/variant | Praveen | **Implemented** + **Verified** (prefills on Contact) | Contact page | Label “Ask Ranjeeta About This Artwork”; query `type`, `title`, `url`, `variant`; no customer PII in query |
| L-PDP-16 | P1 | Contact form submit + CAPTCHA + success with artwork prefill | Praveen | **Verified** (dev — operator: form tested and working) | L-PDP-15; CAPTCHA | Prefill + submit working on development; re-verify CAPTCHA on **production** at cutover (L-POST-03) |
| L-PDP-10 | P1 | Accelerated checkout / Shop Pay on original PDP | Praveen | **Not started** | Payments enabled on store; design placement | `payment_button` absent on `zita-product-artwork`; only skeleton `product.liquid` has it — verify where supported/eligible at launch |
| L-PDP-11 | P0 | Final PDP visual + commerce approval | Ranjeeta | **Not started** | L-PDP-01–06 verified; ideally L-PDP-07–08; L-PDP-17 if Bundles used at launch | Written approval of description placement, selectors, sold state, mobile |
| L-PDP-12 | P1 | Variant featured-media gallery sync | Praveen | **Implemented**; **Requires verification** | Variant featured media on real products | Code path exists; PoC fixtures lacked distinct media — retest on catalog |
| L-PDP-13 | P1 | Hide Year / Framing; Medium / Surface / Size / COA trim per owner | Praveen + Ranjeeta | **Requires verification** | Metafield display rules; Surface render gap | Confirm PDP facts match Oct 2026 owner decisions on live products — was P2; raised to P1 (owner PDP decisions) |

Related P1 UX (not blockers): sticky header **L-UX-01**, floating PDP purchase bar **L-UX-02**, PLP Quick Add **L-UX-03** — see §10b (**Approved** on development).

---

## 2. Product catalog migration and data cleanup

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-CAT-08 | P0 | M6 Stage 1 catalog audit (production + development exports) | Praveen | **Verified** (offline complete) | Source CSVs; reports under `data/catalog-migration/reports/` | 56 products / 67 variants audited; no Shopify writes |
| L-CAT-09 | P0 | M6 Stage 2A Active-only migration preparation | Praveen | **Verified** (offline complete) | Ranjeeta Active-only decision; Stage 1 | 30 Active / 26 excluded / 84 images; stage-2a reports; no Shopify writes |
| L-CAT-10 | P0 | M6 Stage 2B controlled Draft trial import on **development** | Praveen | **Verified** (development complete) | Trial plan; owner OK | Trial four + remaining Active imported; PoC/QA/`artwork-bundle` preserved; see `project-status.md` Stage 2B |
| L-CAT-11 | P0 | Validate trial import (media, price, Available/On hand, PDP sold/available) | Praveen | **Verified** (Admin + Phase 4 browser samples) | L-CAT-10 | Counts match Stage 2A on development; Available preserved; `water-ii` inventory exception still open (L-CAT-12) |
| L-CAT-01 | P0 | Complete artwork catalog workbook from production Active export | Ranjeeta (+ Praveen integrate) | **Waiting on Ranjeeta** (30 artworks) | [`product-cleanup-import-spec.md`](architecture/product-cleanup-import-spec.md); Stage 2A CSVs | One row per sellable Active SKU; handles preserved; Praveen integrates after approval |
| L-CAT-02 | P0 | Product metafield mapping (width/height, story, certificate, ready_to_hang, etc.) | Praveen | **Implemented** (defs on **dev** only) | Phase B metafield provisioning on production | Definitions match [`metafield-definitions.md`](architecture/metafield-definitions.md); values filled per product — **do not invent dimensions from titles** |
| L-CAT-12 | P0 | Resolve Active identity / inventory owner decisions (incl. Water II) | Ranjeeta + Praveen | **Blocked** / waiting on Ranjeeta | Stage 2A `ranjeeta-decisions.md` | `copy` handles, Essence/CBN-Blue, zero-Available Actives, **`water-ii`**, paired model / example bundles |
| L-CAT-03 | P0 | Migrate / create V2 Active products (Draft first) on agreed store | Praveen + Ranjeeta | **Verified** (development 30 Active); production **Not started** | L-CAT-10–11; L-CAT-12 for residual identity; workbook L-CAT-01 for content polish | Development uses `original` template; media migrated; PoC/QA untouched; **production cutover deferred** until content approval |
| L-CAT-04 | P0 | Inventory and variant validation (preserve production Available; track; deny policy; prices) | Praveen + Ranjeeta | **Verified** (dev Admin/samples); residual flags open | L-CAT-03; L-PDP-09 for pairs | Available preserved on development; `water-ii` + identity flags still owner-gated; **Never** auto-set originals to qty 1 |
| L-CAT-05 | P0 | Map legacy description → short buy-box description + `artwork_story` | Ranjeeta | **Waiting on Ranjeeta** (workbook) | L-PDP-01; L-CAT-01 | No empty buy-box where story exists; **do not auto-copy** Body into story |
| L-CAT-06 | P1 | SEO title / meta description / image alt per product | Ranjeeta + agency | **Not started** | L-CAT-03 | Unique titles/descriptions; descriptive alt (Active export SEO currently blank) |
| L-CAT-07 | P1 | Activate V2 products only at controlled cutover | Praveen | **Not started** | Final QA; redirects | No premature Active+indexed duplicates vs legacy |
| L-CAT-13 | P2 | Migrate inactive (draft/archived/unlisted) products | Praveen + Ranjeeta | **Not started** | Post Active cutover | Explicitly **out of** initial Active scope |

---

## 3. Collection migration

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-COL-05 | P0 | Read-only extract production collection metadata + membership | Praveen | **Verified** (development Stage 3A/3B) | Stage 2A `collection-data-extraction-plan.md` | Development collections/membership built from extraction; production re-apply at Phase B — **no tag inference** |
| L-COL-01 | P0 | Define production series / Originals collections and handles + **collection content workbook (8)** | Ranjeeta + Praveen | **Partial** — structure **Verified** on development; workbook **Waiting on Ranjeeta** | L-COL-05 | Matches nav mega-menu; editorial/content workbook for 8 collections still open |
| L-COL-02 | P0 | Migrate collection membership + editorial metafields | Praveen | **Verified** (membership on development); editorial polish open | L-CAT-03; PLP templates | Filters/sort work on development; featured images / series blurbs still polish |
| L-COL-03 | P1 | Replace Portfolio temporary series destinations with real collections | Praveen | **Not started** | L-COL-01 | Portfolio room links resolve to live series (today: fallbacks noted in `page.portfolio.json`) |
| L-COL-04 | P1 | Collection SEO titles/descriptions | Ranjeeta + agency | **Waiting on Ranjeeta** (workbook) | L-COL-02; collection workbook | No thin duplicate series pages |

---

## 4. Portfolio content and owner-editability QA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-PF-01 | P0 | Portfolio page theme implementation | Praveen | **Implemented** + **Verified** (theme on main/dev) | `6153066`, `326258d` | `page.portfolio.json` + room sections on `main` — content replacement remains L-PF-02 |
| L-PF-02 | P0 | Replace temporary theme artwork assets with real products/media | Ranjeeta + Praveen | **Not started** | Catalog products or approved Files | No `fallback_asset` / placeholder figures in published Portfolio |
| L-PF-03 | P0 | Portfolio copy approval (room identities, series text, closing) | Ranjeeta | **Not started** | L-PF-01 | Written approval; Theme Editor editable without code |
| L-PF-04 | P1 | Owner-editability QA (add/reorder rooms, 1–2 images, Explore links) | Praveen + Ranjeeta | **Requires verification** | Theme Editor access | Merchant can edit without developer; document limits |
| L-PF-05 | P1 | Portfolio hosted visual QA (desktop + mobile) | Praveen | **Requires verification** | Deployed theme parity | Match approved handoff; dividers/Room labels per `326258d` |

---

## 5. Favicon and branding

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-BR-01 | P0 | Deliver `favicon.ico` + supporting icons (incl. apple-touch as needed) | Ranjeeta / designer | **Implemented** + **Verified** (dev Z monogram PNG/SVG) | Asset decision | Development favicon verified; optional production brand reconfirm at cutover |
| L-BR-02 | P0 | Wire favicon in theme / Theme settings | Praveen | **Implemented** + **Verified** (dev HTML: `favicon-32.png`, `favicon-180.png`, `favicon.png` via `meta-tags`) | L-BR-01 | Theme setting + asset fallback on `#192367558949` |
| L-BR-03 | P1 | Confirm logo / wordmark assets on header across breakpoints | Praveen | **Requires verification** | — | Visual QA on published theme |

---

## 6. SEO and MerchantSignals audit

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-SEO-01 | P0 | MerchantSignals SEO audit (full storefront pass) | Praveen | **Ready for scan — Praveen** | Authenticated development storefront session (scan real pages, **not** the password gate) | Written findings + remediations closed or accepted; do not claim scan completed until run |
| L-SEO-02 | P0 | Product structured data verification (`product \| structured_data`) | Praveen | **Implemented**; spot-checked on development PDP (Product only; no Org duplicate) | Live PDP HTML | Rich Results / MerchantSignals confirm Product JSON-LD; variants OK |
| L-SEO-02b | P0 | Organization JSON-LD (homepage) | Praveen | **Implemented + Verified** (development) | [`v2-seo-foundation.md`](architecture/v2-seo-foundation.md) | Name `Zita's Art Studio`; env `request.origin`; logo asset; no invented address/phone/social |
| L-SEO-02c | P0 | Originals collection URL cleanup | Praveen | **Implemented + Verified** (development) | Admin handle + theme CTAs | `/collections/originals`; redirect from `v2-poc-original-artworks`; menus/resource links updated |
| L-SEO-03 | P0 | Titles, meta descriptions, canonicals per key template | Praveen + agency | **Requires verification** | [`v2-seo-foundation.md`](architecture/v2-seo-foundation.md) | Homepage, PDP, collections, About, Exhibitions, Portfolio, Contact, policies, 404 |
| L-SEO-04 | P0 | Production handle inventory + redirect plan (legacy → V2) | Praveen | **Not started** | Production export; Active handle list | No soft-404s; critical URLs 301 as planned |
| L-SEO-05 | P1 | Sitemap / Search Console / robots at cutover | Praveen | **Not started** | Password removed only at launch | Production sitemap healthy (legacy audit saw `/sitemap.xml` **500** — **reverify**) |
| L-SEO-06 | P1 | Image alt + filename hygiene on migrated media | Ranjeeta + Praveen | **Not started** | L-CAT-03 | Artwork alts descriptive; blank alt ≠ missing image; purchasing-critical a11y remains P0 via L-A11Y-01 |
| L-SEO-07 | P2 | Dev store remains password-protected until launch | Praveen | **Verified** (1 Nov 2026) | — | Preview bar still labels store password-protected; public HTML remains gated |

---

## 7. Commerce and checkout QA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-COM-01 | P0 | C1 full cart regression (multi-line, inventory reject, no-JS, a11y) | Praveen | **Implemented**; **Requires verification** | `3ecb3d2`; owner preview was functional only | Broader regression checklist in phase-d §7 still open |
| L-COM-02 | P0 | End-to-end checkout (shipping, taxes, payments) on production-like config | Praveen + Ranjeeta | **Deferred to production launch** (Partner-dev cannot accept payments) | Payments/shipping/tax Admin; test orders | Successful test order on production; tax/shipping correct for target markets (USD OK initially) |
| L-COM-03 | P0 | Shipping rates, tax settings, payment providers review | Ranjeeta | **Requires verification** | Shopify Admin | Documented settings match owner policy decisions |
| L-COM-04 | P1 | Shop Pay / accelerated checkout decision + implementation if yes | Praveen + Ranjeeta | **Not started** | L-PDP-10; eligibility | Either present where eligible **or** explicit deferral recorded |
| L-COM-05 | P1 | Cart / PDP copy consistency (“Add to cart” / “View cart”) | Praveen | **Implemented**; **Requires verification** | `3d31d13` locale pass | Spot-check header, sticky bar, cart page, empty states |
| L-COM-06 | P0 | Sold / available inventory edge cases on migrated catalog | Praveen | **Partial** — Phase 4 sold/available PDP samples **Verified**; residual identity cases open | L-CAT-04; L-CAT-11; `water-ii` | Cannot oversell originals; sold PDP messaging correct on samples; preserve Available=0 Actives; Water II still owner-gated |

---

## 8. Content approvals

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-CNT-01 | P0 | About biography + portrait crop approval | Ranjeeta | **Blocked** / partial | Upload `ranjeeta-portrait-crop-4x5.png`; Ch 02 photos optional | Written sign-off; portrait in Files + Theme Editor |
| L-CNT-02 | P0 | Contact commission placeholders replaced with real photography | Ranjeeta + Praveen | **Not started** | Real commission images | No `contact-commission-placeholder-*.svg` in published Contact |
| L-CNT-03 | P0 | Portfolio temporary artwork replacement | Ranjeeta + Praveen | **Not started** | L-PF-02 | Same gate as Portfolio section |
| L-CNT-04 | P0 | Portfolio copy approval | Ranjeeta | **Not started** | L-PF-03 | — |
| L-CNT-05 | P1 | Exhibitions missing imagery / optional links | Ranjeeta | **Requires verification** | Theme Editor | Devi / Indulgence / Adiyogi slots (status doc); hosted visual QA |
| L-CNT-06 | P0 | Policies: refunds, shipping, commissions, privacy, terms | Ranjeeta | **Partial** — layout **Implemented** + browser **Verified**; **Waiting on Ranjeeta** for content approval (returns/shipping commitments) | Owner decisions + visual approval | Native `/policies/*` styled per handoff; footer Contact Me → `/pages/contact`; Contact Information policy kept in Admin; publish content only after approval |
| L-CNT-06a | P1 | Footer contact disclosure / Contact page path | Praveen | **Verified** (1 Nov 2026) | L-CNT-06; Contact page | Main nav + The Studio + Contact Me → `/pages/contact`; page shows email, phone, form; oversized footer CONTACT column removed |
| L-CNT-07 | P1 | Series descriptions (Colored by Nature, BlackWhiteandGrey, Walking the Trail, …) | Ranjeeta | **Waiting on Ranjeeta** (collection workbook) | Collections; collection workbook (8) | Shown on PLP editorial where designed |
| L-CNT-08 | P1 | Public email `info@zitasartstudio.com` saved in Theme settings | Praveen | **Implemented** (schema default); **Requires verification** (saved remote) | Theme Editor; avoid pushing `settings_data.json` blindly | Footer + Contact + mailto Ask use production email |
| L-CNT-09 | P1 | Footer email / newsletter field verification | Praveen | **Requires verification** | Customer accounts / Shopify Email / form destination | Submit test; confirm merchant receipt or list behavior |
| L-CNT-10 | P0 | Ranjeeta final storefront approval | Ranjeeta | **Waiting on Ranjeeta** (visual/content feedback) | All P0 content + commerce | Explicit go / no-go after development review |

---

## 9. Accessibility and responsive QA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-A11Y-01 | P0 | Keyboard / focus / landmarks on primary templates (incl. purchase controls) | Praveen | **Requires verification** | — | Skip link, menus, PDP gallery/viewer, cart, forms — **purchasing a11y is P0** (unlike decorative alt polish) |
| L-A11Y-02 | P0 | Responsive QA: mobile, tablet, desktop for all V2 pages | Praveen | **Requires verification** | Published theme | About mobile grids fixed (`6cf8bee` / `3d31d13`); full-site pass still needed |
| L-A11Y-03 | P1 | Contrast on night / dark Exhibition and About surfaces | Praveen | **Requires verification** | `8b1b127` Night fix | Spot-check remaining dark sections |
| L-A11Y-04 | P1 | Contact form labels, errors, success (incl. CAPTCHA path) | Praveen | **Verified** (dev form working); production CAPTCHA at L-POST-03 | L-FRM-01 | Thank-you via Shopify flash (`57a71d4`); operator confirmed contact form working on development |

---

## 10. Performance

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-PERF-01 | P1 | Lighthouse / Core Web Vitals sample on Homepage, PLP, PDP | Praveen | **Not started** | Production-like images | No severe LCP/CLS regressions vs agreed baseline |
| L-PERF-02 | P1 | Image weight / responsive-image usage audit | Praveen | **Requires verification** | Migrated media | Oversized uploads flagged and replaced |
| L-PERF-03 | P2 | Minimize unnecessary apps / third-party scripts pre-launch | Ranjeeta + Praveen | **Not started** | App inventory | Document keep/remove |

---

## 10b. UX launch polish (shell / long-page navigation)

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-UX-01 | P1 | Sticky desktop/tablet header for persistent nav + cart while scrolling | Praveen | **Implemented** + **Verified** + **Approved** (dev, 1 Nov 2026) | Approved V2 header/nav; mobile menu behavior | Sticky shell on `.shopify-section.section-header`; scroll hide/lock; PLP toolbar coordination — **not a launch blocker** |
| L-UX-02 | P1 | Desktop/tablet floating PDP purchase bar after primary buy controls leave the viewport | Praveen | **Implemented** + **Verified** + **Approved** (dev, 1 Nov 2026) | Existing PDP purchase logic; mobile sticky bar preserved | Compact floating card with thumbnail, title, price, ATC; syncs variant/inventory — **not a launch blocker** |
| L-UX-03 | P1 | PLP / artwork-card Quick Add | Praveen | **Implemented** + **Verified** + **Approved** (dev, 1 Nov 2026) | Artwork cards; Ajax Cart API | Direct add for single-variant available works; options navigate to PDP; sold cards omit control — **not a launch blocker** |

---

## 11. Production deployment and rollback

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-DEP-01 | P0 | Production theme backup (download / duplicate) before any V2 publish | Praveen | **Not started** | Phase B access | Named backup theme + timestamp recorded |
| L-DEP-02 | P0 | Unpublished V2 theme on merchant store; parity with Git | Praveen | **Not started** | Collaborator access | File diff Git ↔ remote; no accidental `settings_data` overwrite |
| L-DEP-03 | P0 | Documented rollback: republish Flora (or backup) within agreed RTO | Praveen | **Deferred priority** (not waived at publish) | L-DEP-01 | Dedicated rollback drill workstream not currently prioritized; keep named backup + republish path at cutover |
| L-DEP-04 | P0 | Cutover runbook (DNS/password, menus, redirects, password off, monitoring) | Praveen | **Not started** | L-SEO-04; Admin checklist | Single document owners can follow |
| L-DEP-05 | P0 | Metafield definitions provisioned on production | Praveen | **Not started** | [`metafield-definitions.md`](architecture/metafield-definitions.md) | Match proven Admin order from Partner store |
| L-DEP-06 | P0 | Navigation: About, Exhibitions, Contact, Portfolio; remove News; series submenu | Ranjeeta + Praveen | **Verified** (development menus/footer); production **Not started** | Menus often manual | Development mega-menu + footer legal/Contact Me verified in Phase 4; reconfirm on production cutover |

---

## 12. Post-launch verification

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-POST-01 | P0 | Smoke test Homepage → PDP → cart → checkout after publish | Praveen | **Not started** | Launch | One real or test order path |
| L-POST-02 | P0 | Spot-check redirects and top legacy URLs | Praveen | **Not started** | L-SEO-04 | 200/301 as planned; no soft-404 |
| L-POST-03 | P0 | Contact form + CAPTCHA on production | Praveen | **Not started** | L-FRM-01 | Message delivered; success UX |
| L-POST-04 | P1 | Search Console / analytics / Merchant Center wiring | Agency + Praveen | **Not started** | Indexable site | Property verified; sitemap submitted |
| L-POST-05 | P1 | Archive legacy products only after confidence window | Ranjeeta + Praveen | **Not started** | Stable V2 | Per implementation plan §24 H — archive first, delete later |
| L-POST-06 | P1 | Monitor sold/inventory incidents first week | Ranjeeta + Praveen | **Not started** | L-PDP-09 | No double-sold panels |
| L-POST-07 | P2 | Expand Bundles / paired merchandising beyond launch single-SKU pairs | Ranjeeta + Praveen | **Not started** | Owner model; production Bundles if needed | Post-launch enhancement — do not block Active single-SKU launch without justification |

---

## Cross-cutting outstanding items

| Review item | Primary IDs | Status snapshot |
|---|---|---|
| Favicon.ico + supporting icons | L-BR-01, L-BR-02 | **Verified** on `#192367558949` |
| MerchantSignals SEO audit | L-SEO-01 | **Ready for scan — Praveen** (authenticated storefront, not password gate); targeted remediations L-SEO-02b/02c done |
| Organization JSON-LD | L-SEO-02b | **Verified** on development homepage |
| Originals `/collections/originals` | L-SEO-02c | **Verified** on development (handle + redirect + theme CTAs) |
| Bundles + “In your cart” accuracy | L-PDP-17 | Bundles ATC tested; residual “In your cart” accuracy **Open** if reproducible |
| Bundles ATC 422 path | L-PDP-14 | **Verified** (dev) |
| Sticky header / Quick Add / floating ATC | L-UX-01, L-UX-02, L-UX-03 | **Approved** on development |
| Active catalog prep | L-CAT-08, L-CAT-09 | **Complete** (offline) |
| Development Active migration | L-CAT-10–11, L-CAT-03 | **Verified** on development; production deferred |
| Artwork / collection workbooks | L-CAT-01, L-COL-01, L-CNT-07 | **Waiting on Ranjeeta** |
| Water II / identity decisions | L-CAT-12 | **Waiting on Ranjeeta** |
| Collection membership (dev) | L-COL-05, L-COL-02 | **Verified** on development; production cutover open |
| Product metafield mapping | L-CAT-02, L-DEP-05 | Dev defs **Implemented**; production **Not started** |
| Inventory validation | L-CAT-04, L-COM-06 | Dev samples verified; Water II open |
| Portfolio temporary artwork | L-PF-02, L-CNT-03 | **Not started** |
| Portfolio copy approval | L-PF-03, L-CNT-04 | **Not started** |
| Contact placeholder replacement | L-CNT-02 | **Not started** |
| Contact form (dev) / CAPTCHA (prod) | L-FRM-01, L-A11Y-04, L-POST-03 | Dev form **Verified**; production CAPTCHA at cutover |
| Footer email verification | L-CNT-08, L-CNT-09 | Schema default done; saved settings + submit **Requires verification** |
| Navigation and broken links | L-DEP-06, L-COL-03 | Dev nav **Verified**; Portfolio series destinations open |
| Product structured data | L-SEO-02 | Liquid present; MerchantSignals / live audit pending |
| Shipping, taxes, payments, checkout | L-COM-02, L-COM-03 | Production payment smoke **deferred to launch** |
| Production backups and rollback | L-DEP-01, L-DEP-03 | Backup required at cutover; dedicated rollback drill deferred priority |
| Ranjeeta’s final approval | L-CNT-10, L-PDP-11 | **Waiting on Ranjeeta** |

### Forms / CAPTCHA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-FRM-01 | P0 | Shopify CAPTCHA reliability on Contact (and any customer forms) | Praveen | **Verified** (dev contact form working); production re-check **Not started** | Store Preferences CAPTCHA; `zita-contact.js` must not break re-submit | Operator confirmed development form; re-run CAPTCHA path on production (L-POST-03) |

---

## Page implementation snapshot (evidence, not approval)

| Surface | Git / theme evidence | Launch posture |
|---|---|---|
| Homepage / shell | `3b1bf0f`, `dcee031` | Implemented — full visual/SEO QA still open |
| PLP | `d00ba52` | Implemented — collection migration pending |
| Original PDP | `f713471` … `3ae754a` + `c11f7e1` + L-PDP-17 + floating ATC | Description/variants/inquiry **Verified**; Bundles ATC tested; “In your cart” accuracy follow-up open; Shop Pay / owner final PDP approval open |
| Default product | `832d509` | V2 artwork layout — QA on non-original types open |
| Cart | `3ecb3d2`, copy `3d31d13`, `item_components` | Implemented; bundle components display **Verified** on dev; broader regression **Requires verification** |
| About | `6837063`, mobile fixes | Implemented; content **Blocked** / approval open |
| 404 | `bed8e62` | Implemented; HTTP **404** + “This room is empty” **Verified** (1 Nov 2026) |
| Exhibitions | `9697dba` | Implemented; content/assets gaps |
| Contact | `cc109f4` … `57a71d4` | Implemented; email/phone/form **Verified** (operator); commission placeholders open; production CAPTCHA at cutover |
| Portfolio | `6153066`, `326258d` | Implemented; temporary art + copy approval open |
| Policies | Claude Design on `#192367558949` | Layout **Implemented** + browser **Verified**; owner content approval open |
| Favicon | Monogram assets + `meta-tags` | **Implemented** + **Verified** on development |
| Sticky header / Quick Add / floating ATC | L-UX-01–03 | **Approved** on development |

---

## Development-only QA fixtures (do not migrate)

| Handle | Title | Purpose | Cleanup |
|---|---|---|---|
| `v2-variant-qa-size-finish` | V2 Variant QA — Size Finish | Two-option Size/Finish + price matrix | After commerce QA sign-off |
| `v2-variant-qa-diptych` | V2 Variant QA — Diptych Sample | One-option multi-variant / sold-out sibling | After commerce QA sign-off |
| `artwork-bundle` | Artwork Bundle | Shopify Bundles parent (includes Size Finish + Essence components) | After Bundles messaging + checkout QA; unpublish or delete **after** dependent cart tests |
| `essence-v2` / `colored-by-nature-blue-v2` | V2 PoC artworks | Schema / sold-state proof | Do not overwrite during Active import |

**Proposed cleanup order (after commerce QA complete):**

1. Empty carts / abandon checkouts that reference these fixtures.
2. Unpublish `artwork-bundle` from Online Store (or delete) so component inventory is no longer reserved by the parent.
3. Unpublish or delete `v2-variant-qa-diptych`.
4. Unpublish or delete `v2-variant-qa-size-finish`.
5. Confirm Essence V2 and Colored by Nature-Blue V2 inventory/options restored to launch-intent state.
6. **Do not** include these handles in catalog migration workbooks or production imports.

Do **not** delete these fixtures during active Bundles/variant QA.

---

## How to use this document

1. Start with the **Owner dashboard** at the top of this file for Ranjeeta / Praveen action items.
2. Do not mark a row **Verified** without an environment test note (date + store + what was exercised).
3. Do not mark **Approved** without Ranjeeta (or named delegate) confirmation.
4. Update statuses here as launch work proceeds; keep [`project-status.md`](project-status.md) aligned when environment truth changes.
5. Keep production untouched until Phase B runbook tasks are complete.
6. Do not silently delete open rows; reclassify with justification.
7. MerchantSignals (L-SEO-01) is **Ready for scan** — run against the authenticated development storefront, not the password gate.

---

## Related documents

- [`docs/project-status.md`](project-status.md) — canonical environment / milestone status
- [`docs/architecture/shopify-implementation-plan.md`](architecture/shopify-implementation-plan.md) — Phase A–H cutover
- [`docs/architecture/phase-d-implementation-plan.md`](architecture/phase-d-implementation-plan.md) — commerce packages C1–C5
- [`docs/architecture/product-cleanup-import-spec.md`](architecture/product-cleanup-import-spec.md) — catalog workbook
- [`docs/architecture/v2-seo-foundation.md`](architecture/v2-seo-foundation.md) — SEO baseline
- [`docs/architecture/v2-recovery-audit-2026-10-23.md`](architecture/v2-recovery-audit-2026-10-23.md) — recovery findings
- Local M6 reports (gitignored): `data/catalog-migration/reports/`, `…/stage-2a/`
- [`docs/qa/final-development-qa.md`](qa/final-development-qa.md) — Phase 4 browser QA
- [`docs/qa/ux-refinements.md`](qa/ux-refinements.md) — sticky header / Quick Add / floating ATC
- [`docs/qa/policy-page-implementation.md`](qa/policy-page-implementation.md) — policy layout QA
- PDP commerce: `3ae754a` · Bundles ATC / inquiry: `c11f7e1` · Git baseline `dd13cc5`
