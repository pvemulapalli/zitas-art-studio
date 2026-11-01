# Zita V2 — Launch Readiness Checklist

**Created:** 31 October 2026
**Updated:** 1 November 2026 (project status refresh; M6 Stage 1 + 2A recorded; Bundles messaging remains open; Stage 2B not authorized)
**Authority:** Pre-launch work tracking. Environment and milestone truth: [`docs/project-status.md`](project-status.md).
**Evidence basis:** Git `main` / `origin/main`, architecture docs, owner decisions, Partner-dev QA through 1 November 2026, M6 offline catalog reports.
**Production store:** Untouched (Phase B). Partner-dev proof ≠ production cutover.

---

## Launch critical path

```text
1. Documentation refresh                          [DONE — 1 Nov 2026]
2. Fix Bundles inventory/availability messaging  [P0 — next theme task]
3. M6 Stage 2B Draft trial import (dev only)     [Not authorized]
4. Validate trial products / images / inventory  [After 2B]
5. Extract + migrate production collections      [P0 — data gap]
6. Complete Active catalog migration (30 / 84)   [After trial + decisions]
7. Essential content, commerce, mobile, a11y, SEO QA
8. Ranjeeta final approval
9. Production deploy with backup + rollback
10. Production smoke test
```

**Can run in parallel (non-blocking for starting Step 2–3):** About portrait upload, Portfolio art/copy, Contact placeholders, policy drafts, favicon asset, Shop Pay decision, series editorial copy — still required before launch where marked P0 below.

Ordinary variant UX is implemented on dev fixtures. **Remaining Bundles PDP messaging** and **Active catalog migration** are the near-term gates. Production Bundles **app install** is required only if launch sells Bundles parents; paired works may ship as single SKUs pending owner decision (**clarify** — see L-PDP-09).

---

## Open work by priority (1 Nov 2026)

Counts = rows that are **not** fully closed (excludes pure **Implemented + Verified** / **Approved** completion). Items that are Implemented but still **Requires verification**, **Not started**, **Blocked**, or **Needs clarification** are counted as open.

| Priority | Open (approx.) | Role |
|---|---:|---|
| **P0** | **42** | Launch blockers / must-complete before public launch |
| **P1** | **24** | Launch polish — complete if possible; not every row blocks cutover |
| **P2** | **4** | Post-launch / near-term backlog |

Recount from tables below when statuses change. Do not treat “open” as “unstarted” — many P0 rows are **Requires verification**.

### Top launch blockers (now)

1. **Bundles inventory / availability messaging** still unclear when a component is already in cart or unavailable (L-PDP-17) — next theme fix.
2. **Active catalog + inventory migration** with preserved availability (L-CAT-08–12, L-COM-06) — Stage 2B not started.
3. **Collection extraction + membership** (L-COL-01–02) — not in product CSVs.
4. **Owner identity / inventory decisions** (duplicates, zero-stock Actives, `water-ii`, paired model).
5. **Production cutover safety** — backup, unpublished theme parity, rollback, checkout smoke, Ranjeeta go/no-go (L-DEP-*, L-COM-02, L-CNT-10).

---

## Project status summary (1 Nov 2026)

V2 core storefront pages are **implemented** on Partner development (`zitas-art-studio-development.myshopify.com`, theme `#192367558949`) and on `origin/main`: Homepage, header/footer, PLP, original PDP, default product layout, cart, About, 404, Exhibitions, Contact, Portfolio.

**PDP commerce:** Description under price + variants (`3ae754a`) **Implemented** / fixture-**Verified**. Shopify Bundles **installed on development** (`artwork-bundle`). Parent ATC for available combinations works. Commit `c11f7e1` fixed a **422** path that dropped `?variant=` and falsely announced “already in bag.” **A separate Bundles inventory/availability messaging defect remains open** (unclear PDP messaging when a component is already in the cart or unavailable) — **do not treat L-PDP-14 as closing that gap.**

**Inquiry CTA:** Deep-link to Contact **Implemented** + prefill **Verified**; full form POST/CAPTCHA **Requires verification**.

**Catalog (M6):** Stage 1 audit **complete** (56 products / 67 variants; offline). Stage 2A **complete** — **30 Active** products, **84** images, inventory reconciled offline; **no imports**. Stage 2B trial **not authorized**.

**Not launch-ready:** Production catalog/collections, production metafields, inventory identity decisions, Bundles messaging fix, favicon, MerchantSignals, content approvals, checkout QA, policies, backup/rollback, final owner approval.

### Status vocabulary

| Status | Meaning |
|---|---|
| **Implemented** | Code or Admin config exists in repo / known environment |
| **Verified** | Exercised on the target environment with recorded acceptance |
| **Approved** | Explicit owner (or designated) sign-off |
| **Blocked** | Waiting on access, decision, content, or dependency |
| **Not started** | No meaningful work yet |
| **Requires verification** | Claimed or partial; must be re-checked before treating as done |
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
| L-PDP-09 | P0 | Shared inventory / diptych commerce model (Bundles vs variants vs workflow) | Praveen + Ranjeeta | **Needs clarification** + partial | Owner listing decision; may defer production Bundles install if pairs stay single-SKU at launch | Dev Bundles app + `artwork-bundle` available ATC **Verified**; owner model for Active paired listings **Pending**; production Bundles install **Not started** (P1/P2 if launch without Bundles parents — **clarify**) |
| L-PDP-14 | P0 | Bundle PDP Add to Cart reliability (422 / wrong “in bag” path) | Praveen | **Implemented** + **Verified** (dev) | Shopify Bundles parent variants; `c11f7e1` | 422 sold-out/conflict keeps `?variant=`, marks unavailable, announces Shopify description — **does not close L-PDP-17** |
| L-PDP-17 | P0 | Bundles inventory / availability **error messaging** when a component is already in cart or unavailable | Praveen | **Not started** | L-PDP-14; `artwork-bundle` | PDP must show clear unavailable/conflict messaging — **next theme task after docs** |
| L-PDP-15 | P1 | Artwork inquiry CTA → Contact deep-link with title/URL/variant | Praveen | **Implemented** + **Verified** (prefills on Contact) | Contact page | Label “Ask Ranjeeta About This Artwork”; query `type`, `title`, `url`, `variant`; no customer PII in query |
| L-PDP-16 | P1 | Contact form submit + CAPTCHA + success with artwork prefill | Praveen | **Requires verification** | L-PDP-15; CAPTCHA | Prefill + type selection verified; full native POST/success not re-run in this pass |
| L-PDP-10 | P1 | Accelerated checkout / Shop Pay on original PDP | Praveen | **Not started** | Payments enabled on store; design placement | `payment_button` absent on `zita-product-artwork`; only skeleton `product.liquid` has it — **decision required** |
| L-PDP-11 | P0 | Final PDP visual + commerce approval | Ranjeeta | **Not started** | L-PDP-01–06 verified; ideally L-PDP-07–08; L-PDP-17 if Bundles used at launch | Written approval of description placement, selectors, sold state, mobile |
| L-PDP-12 | P1 | Variant featured-media gallery sync | Praveen | **Implemented**; **Requires verification** | Variant featured media on real products | Code path exists; PoC fixtures lacked distinct media — retest on catalog |
| L-PDP-13 | P1 | Hide Year / Framing; Medium / Surface / Size / COA trim per owner | Praveen + Ranjeeta | **Requires verification** | Metafield display rules; Surface render gap | Confirm PDP facts match Oct 2026 owner decisions on live products — was P2; raised to P1 (owner PDP decisions) |

---

## 2. Product catalog migration and data cleanup

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-CAT-08 | P0 | M6 Stage 1 catalog audit (production + development exports) | Praveen | **Verified** (offline complete) | Source CSVs; reports under `data/catalog-migration/reports/` | 56 products / 67 variants audited; no Shopify writes |
| L-CAT-09 | P0 | M6 Stage 2A Active-only migration preparation | Praveen | **Verified** (offline complete) | Ranjeeta Active-only decision; Stage 1 | 30 Active / 26 excluded / 84 images; stage-2a reports; no Shopify writes |
| L-CAT-10 | P0 | M6 Stage 2B controlled Draft trial import on **development** | Praveen | **Not started** | L-PDP-17 preferred first; trial plan; owner OK | Import `buddha-the-awakened-one`, `dissolution`, `clouds`, `turquoise-waters` as Draft; no overwrite of PoC/QA/`artwork-bundle` |
| L-CAT-11 | P0 | Validate trial import (media, price, Available/On hand, PDP sold/available) | Praveen | **Not started** | L-CAT-10 | Counts match Stage 2A; Available never auto-reset to 1 |
| L-CAT-01 | P0 | Complete artwork catalog workbook from production Active export | Ranjeeta + Praveen | **Not started** (spec + Stage 2A scope exist) | [`product-cleanup-import-spec.md`](architecture/product-cleanup-import-spec.md); Stage 2A CSVs | One row per sellable Active SKU; handles preserved |
| L-CAT-02 | P0 | Product metafield mapping (width/height, story, certificate, ready_to_hang, etc.) | Praveen | **Implemented** (defs on **dev** only) | Phase B metafield provisioning on production | Definitions match [`metafield-definitions.md`](architecture/metafield-definitions.md); values filled per product — **do not invent dimensions from titles** |
| L-CAT-12 | P0 | Resolve Active identity / inventory owner decisions before full import | Ranjeeta + Praveen | **Blocked** / pending | Stage 2A `ranjeeta-decisions.md` | `copy` handles, Essence/CBN-Blue, zero-Available Actives, `water-ii`, paired model |
| L-CAT-03 | P0 | Migrate / create V2 Active products (Draft first) on agreed store | Praveen + Ranjeeta | **Not started** | L-CAT-01; L-CAT-10–11; L-CAT-12 | Draft products use `original` (or agreed) template; media via source URLs; PoC/QA untouched |
| L-CAT-04 | P0 | Inventory and variant validation (preserve production Available; track; deny policy; prices) | Praveen + Ranjeeta | **Requires verification** | L-CAT-03; L-PDP-09 for pairs | **Never** auto-set originals to qty 1; match export Available/On hand; flag `orangedelight` On hand≠Available |
| L-CAT-05 | P0 | Map legacy description → short buy-box description + `artwork_story` | Ranjeeta | **Not started** | L-PDP-01 | No empty buy-box where story exists; **do not auto-copy** Body into story |
| L-CAT-06 | P1 | SEO title / meta description / image alt per product | Ranjeeta + agency | **Not started** | L-CAT-03 | Unique titles/descriptions; descriptive alt (Active export SEO currently blank) |
| L-CAT-07 | P1 | Activate V2 products only at controlled cutover | Praveen | **Not started** | Final QA; redirects | No premature Active+indexed duplicates vs legacy |
| L-CAT-13 | P2 | Migrate inactive (draft/archived/unlisted) products | Praveen + Ranjeeta | **Not started** | Post Active cutover | Explicitly **out of** initial Active scope |

---

## 3. Collection migration

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-COL-05 | P0 | Read-only extract production collection metadata + membership | Praveen | **Not started** | Stage 2A `collection-data-extraction-plan.md` | Handles, type, rules, membership, sort, images, SEO — **no tag inference** |
| L-COL-01 | P0 | Define production series / Originals collections and handles | Ranjeeta + Praveen | **Not started** | L-COL-05 | Matches nav mega-menu and Portfolio “Explore the series” URLs |
| L-COL-02 | P0 | Migrate collection membership + editorial metafields | Praveen | **Not started** | L-CAT-03; PLP templates; defs on target store | Filters/sort work; editorial band populated where designed |
| L-COL-03 | P1 | Replace Portfolio temporary series destinations with real collections | Praveen | **Not started** | L-COL-01 | Portfolio room links resolve to live series (today: fallbacks noted in `page.portfolio.json`) |
| L-COL-04 | P1 | Collection SEO titles/descriptions | Ranjeeta + agency | **Not started** | L-COL-02 | No thin duplicate series pages |

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
| L-BR-01 | P0 | Deliver `favicon.ico` + supporting icons (incl. apple-touch as needed) | Ranjeeta / designer | **Not started** | Asset decision | Files approved for production brand |
| L-BR-02 | P0 | Wire favicon in theme / Theme settings | Praveen | **Not started** | L-BR-01 | No favicon assets or layout references found in theme audit (31 Oct) |
| L-BR-03 | P1 | Confirm logo / wordmark assets on header across breakpoints | Praveen | **Requires verification** | — | Visual QA on published theme |

---

## 6. SEO and MerchantSignals audit

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-SEO-01 | P0 | MerchantSignals SEO audit (full storefront pass) | Agency / Praveen | **Not started** | Indexable storefront or staging plan; password rules | Written findings + remediations closed or accepted |
| L-SEO-02 | P0 | Product structured data verification (`product \| structured_data`) | Praveen | **Implemented**; **Requires verification** | Live PDP HTML | Rich Results / MerchantSignals confirm Product JSON-LD; variants OK |
| L-SEO-03 | P0 | Titles, meta descriptions, canonicals per key template | Praveen + agency | **Requires verification** | [`v2-seo-foundation.md`](architecture/v2-seo-foundation.md) | Homepage, PDP, collections, About, Exhibitions, Portfolio, Contact, policies, 404 |
| L-SEO-04 | P0 | Production handle inventory + redirect plan (legacy → V2) | Praveen | **Not started** | Production export; Active handle list | No soft-404s; critical URLs 301 as planned |
| L-SEO-05 | P1 | Sitemap / Search Console / robots at cutover | Praveen | **Not started** | Password removed only at launch | Production sitemap healthy (legacy audit saw `/sitemap.xml` **500** — **reverify**) |
| L-SEO-06 | P1 | Image alt + filename hygiene on migrated media | Ranjeeta + Praveen | **Not started** | L-CAT-03 | Artwork alts descriptive; blank alt ≠ missing image; purchasing-critical a11y remains P0 via L-A11Y-01 |
| L-SEO-07 | P2 | Dev store remains password-protected until launch | Praveen | **Requires verification** | — | Must stay non-indexable pre-launch |

---

## 7. Commerce and checkout QA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-COM-01 | P0 | C1 full cart regression (multi-line, inventory reject, no-JS, a11y) | Praveen | **Implemented**; **Requires verification** | `3ecb3d2`; owner preview was functional only | Broader regression checklist in phase-d §7 still open |
| L-COM-02 | P0 | End-to-end checkout (shipping, taxes, payments) on production-like config | Praveen + Ranjeeta | **Not started** | Payments/shipping/tax Admin; test orders | Successful test order; tax/shipping correct for target markets (USD OK initially) |
| L-COM-03 | P0 | Shipping rates, tax settings, payment providers review | Ranjeeta | **Requires verification** | Shopify Admin | Documented settings match owner policy decisions |
| L-COM-04 | P1 | Shop Pay / accelerated checkout decision + implementation if yes | Praveen + Ranjeeta | **Not started** | L-PDP-10; eligibility | Either present where eligible **or** explicit deferral recorded |
| L-COM-05 | P1 | Cart / PDP copy consistency (“Add to cart” / “View cart”) | Praveen | **Implemented**; **Requires verification** | `3d31d13` locale pass | Spot-check header, sticky bar, cart page, empty states |
| L-COM-06 | P0 | Sold / available inventory edge cases on migrated catalog | Praveen | **Not started** | L-CAT-04; L-CAT-11 | Cannot oversell originals; sold PDP messaging correct; preserve Available=0 Actives |

---

## 8. Content approvals

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-CNT-01 | P0 | About biography + portrait crop approval | Ranjeeta | **Blocked** / partial | Upload `ranjeeta-portrait-crop-4x5.png`; Ch 02 photos optional | Written sign-off; portrait in Files + Theme Editor |
| L-CNT-02 | P0 | Contact commission placeholders replaced with real photography | Ranjeeta + Praveen | **Not started** | Real commission images | No `contact-commission-placeholder-*.svg` in published Contact |
| L-CNT-03 | P0 | Portfolio temporary artwork replacement | Ranjeeta + Praveen | **Not started** | L-PF-02 | Same gate as Portfolio section |
| L-CNT-04 | P0 | Portfolio copy approval | Ranjeeta | **Not started** | L-PF-03 | — |
| L-CNT-05 | P1 | Exhibitions missing imagery / optional links | Ranjeeta | **Requires verification** | Theme Editor | Devi / Indulgence / Adiyogi slots (status doc); hosted visual QA |
| L-CNT-06 | P0 | Policies: refunds, shipping, commissions, privacy, terms | Ranjeeta | **Not started** | Owner decisions | Drafts reviewed; V2 policy templates published only after approval |
| L-CNT-07 | P1 | Series descriptions (Colored by Nature, BlackWhiteandGrey, Walking the Trail, …) | Ranjeeta | **Not started** | Collections | Shown on PLP editorial where designed |
| L-CNT-08 | P1 | Public email `info@zitasartstudio.com` saved in Theme settings | Praveen | **Implemented** (schema default); **Requires verification** (saved remote) | Theme Editor; avoid pushing `settings_data.json` blindly | Footer + Contact + mailto Ask use production email |
| L-CNT-09 | P1 | Footer email / newsletter field verification | Praveen | **Requires verification** | Customer accounts / Shopify Email / form destination | Submit test; confirm merchant receipt or list behavior |
| L-CNT-10 | P0 | Ranjeeta final storefront approval | Ranjeeta | **Not started** | All P0 content + commerce | Explicit go / no-go |

---

## 9. Accessibility and responsive QA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-A11Y-01 | P0 | Keyboard / focus / landmarks on primary templates (incl. purchase controls) | Praveen | **Requires verification** | — | Skip link, menus, PDP gallery/viewer, cart, forms — **purchasing a11y is P0** (unlike decorative alt polish) |
| L-A11Y-02 | P0 | Responsive QA: mobile, tablet, desktop for all V2 pages | Praveen | **Requires verification** | Published theme | About mobile grids fixed (`6cf8bee` / `3d31d13`); full-site pass still needed |
| L-A11Y-03 | P1 | Contrast on night / dark Exhibition and About surfaces | Praveen | **Requires verification** | `8b1b127` Night fix | Spot-check remaining dark sections |
| L-A11Y-04 | P1 | Contact form labels, errors, success (incl. CAPTCHA path) | Praveen | **Implemented**; **Requires verification** | L-FRM-01 | Thank-you via Shopify flash (`57a71d4`) — retest with CAPTCHA |

---

## 10. Performance

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-PERF-01 | P1 | Lighthouse / Core Web Vitals sample on Homepage, PLP, PDP | Praveen | **Not started** | Production-like images | No severe LCP/CLS regressions vs agreed baseline |
| L-PERF-02 | P1 | Image weight / responsive-image usage audit | Praveen | **Requires verification** | Migrated media | Oversized uploads flagged and replaced |
| L-PERF-03 | P2 | Minimize unnecessary apps / third-party scripts pre-launch | Ranjeeta + Praveen | **Not started** | App inventory | Document keep/remove |

---

## 11. Production deployment and rollback

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-DEP-01 | P0 | Production theme backup (download / duplicate) before any V2 publish | Praveen | **Not started** | Phase B access | Named backup theme + timestamp recorded |
| L-DEP-02 | P0 | Unpublished V2 theme on merchant store; parity with Git | Praveen | **Not started** | Collaborator access | File diff Git ↔ remote; no accidental `settings_data` overwrite |
| L-DEP-03 | P0 | Documented rollback: republish Flora (or backup) within agreed RTO | Praveen | **Not started** | L-DEP-01 | Drill once on non-peak window |
| L-DEP-04 | P0 | Cutover runbook (DNS/password, menus, redirects, password off, monitoring) | Praveen | **Not started** | L-SEO-04; Admin checklist | Single document owners can follow |
| L-DEP-05 | P0 | Metafield definitions provisioned on production | Praveen | **Not started** | [`metafield-definitions.md`](architecture/metafield-definitions.md) | Match proven Admin order from Partner store |
| L-DEP-06 | P0 | Navigation: About, Exhibitions, Contact, Portfolio; remove News; series submenu | Ranjeeta + Praveen | **Requires verification** | Menus API historically denied — often manual | No broken primary links; owner series submenu correct |

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
| Favicon.ico + supporting icons | L-BR-01, L-BR-02 | **Not started** (P0) |
| MerchantSignals SEO audit | L-SEO-01 | **Not started** (P0) |
| Bundles inventory messaging | L-PDP-17 | **Not started** (P0) — next theme task |
| Bundles ATC 422 path | L-PDP-14 | **Verified** (dev) — distinct from L-PDP-17 |
| Active catalog prep | L-CAT-08, L-CAT-09 | **Complete** (offline) |
| Trial + full Active migration | L-CAT-10–12, L-CAT-01–05 | **Not started** / pending decisions |
| Collection extraction | L-COL-05, L-COL-01–02 | **Not started** |
| Product metafield mapping | L-CAT-02, L-DEP-05 | Dev defs **Implemented**; production **Not started** |
| Inventory validation | L-CAT-04, L-COM-06 | Preserve production Available; Stage 2A flags ready |
| Portfolio temporary artwork | L-PF-02, L-CNT-03 | **Not started** |
| Portfolio copy approval | L-PF-03, L-CNT-04 | **Not started** |
| Contact placeholder replacement | L-CNT-02 | **Not started** |
| Shopify CAPTCHA reliability | L-FRM-01, L-A11Y-04, L-POST-03 | **Requires verification** |
| Footer email verification | L-CNT-08, L-CNT-09 | Schema default done; saved settings + submit **Requires verification** |
| Navigation and broken links | L-DEP-06, L-COL-03 | **Requires verification** |
| Product structured data | L-SEO-02 | Liquid present; live audit **Requires verification** |
| Shipping, taxes, payments, checkout | L-COM-02, L-COM-03 | **Not started** / **Requires verification** |
| Production backups and rollback | L-DEP-01, L-DEP-03 | **Not started** |
| Ranjeeta’s final approval | L-CNT-10, L-PDP-11 | **Not started** |

### Forms / CAPTCHA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-FRM-01 | P0 | Shopify CAPTCHA reliability on Contact (and any customer forms) | Praveen | **Requires verification** | Store Preferences CAPTCHA; `zita-contact.js` must not break re-submit | Multiple successful submissions with CAPTCHA challenge / invisible path; no silent drop |

---

## Page implementation snapshot (evidence, not approval)

| Surface | Git / theme evidence | Launch posture |
|---|---|---|
| Homepage / shell | `3b1bf0f`, `dcee031` | Implemented — full visual/SEO QA still open |
| PLP | `d00ba52` | Implemented — collection migration pending |
| Original PDP | `f713471` … `3ae754a` + `c11f7e1` | Description/variants/inquiry **Verified** on dev; **L-PDP-17 Bundles messaging open**; Shop Pay / owner approval open |
| Default product | `832d509` | V2 artwork layout — QA on non-original types open |
| Cart | `3ecb3d2`, copy `3d31d13`, `item_components` | Implemented; bundle components display **Verified** on dev; broader regression **Requires verification** |
| About | `6837063`, mobile fixes | Implemented; content **Blocked** / approval open |
| 404 | `bed8e62` | Implemented |
| Exhibitions | `9697dba` | Implemented; content/assets gaps |
| Contact | `cc109f4` … `57a71d4` | Implemented; placeholders + CAPTCHA open |
| Portfolio | `6153066`, `326258d` | Implemented; temporary art + copy approval open |
| Policies | — | **Not started** |
| Favicon | — | **Not started** |

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

1. Do not mark a row **Verified** without an environment test note (date + store + what was exercised).
2. Do not mark **Approved** without Ranjeeta (or named delegate) confirmation.
3. Update statuses here as launch work proceeds; keep [`project-status.md`](project-status.md) aligned when environment truth changes.
4. Keep production untouched until Phase B runbook tasks are complete.
5. Do not silently delete open rows; reclassify with justification.

---

## Related documents

- [`docs/project-status.md`](project-status.md) — canonical environment / milestone status
- [`docs/architecture/shopify-implementation-plan.md`](architecture/shopify-implementation-plan.md) — Phase A–H cutover
- [`docs/architecture/phase-d-implementation-plan.md`](architecture/phase-d-implementation-plan.md) — commerce packages C1–C5
- [`docs/architecture/product-cleanup-import-spec.md`](architecture/product-cleanup-import-spec.md) — catalog workbook
- [`docs/architecture/v2-seo-foundation.md`](architecture/v2-seo-foundation.md) — SEO baseline
- [`docs/architecture/v2-recovery-audit-2026-10-23.md`](architecture/v2-recovery-audit-2026-10-23.md) — recovery findings
- Local M6 reports (gitignored): `data/catalog-migration/reports/`, `…/stage-2a/`
- PDP commerce: `3ae754a` · Bundles ATC / inquiry: `c11f7e1`
