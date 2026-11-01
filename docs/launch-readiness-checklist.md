# Zita V2 — Launch Readiness Checklist

**Created:** 31 October 2026  
**Authority:** Pre-launch work tracking only. Progress and environment state remain canonical in [`docs/project-status.md`](project-status.md) (that file was **not** updated by this document).  
**Evidence basis:** Git `main` through `3ae754a`, architecture docs, owner decisions in project status, and live Partner-dev QA notes from October 2026.  
**Production store:** Untouched (Phase B). Do not treat Partner-dev proof as production cutover.

---

## Project status summary (31 Oct 2026)

V2 core storefront pages are largely **implemented** on Partner development (`zitas-art-studio-development.myshopify.com`, published theme `#192367558949`) and on `origin/main`: Homepage, header/footer, PLP, original PDP, cart, About, 404, Exhibitions, Contact, Portfolio.

**PDP commerce (commit `3ae754a`):** Description under price, native multi-option selectors, price/availability/`?variant=` sync, and selected-variant Add to Cart → cart line identity are **implemented and tested** on the development storefront (temporary multi-variant fixture on Essence, then restored). Two-option / unavailable-combination / published QA products, shared diptych inventory, Shop Pay, and Ranjeeta PDP approval remain **open**.

**Not launch-ready:** Catalog and collection migration to production, metafield mapping on the merchant store, inventory/diptych model decision, favicon, MerchantSignals SEO audit, content approvals (About portrait/biography, Portfolio temporary art and copy, Contact commission placeholders), full commerce/checkout QA, policies, production backup/rollback, and final owner approval.

**Note:** `docs/project-status.md` last stamped **23 Oct 2026** still lists Contact/Portfolio/PDP polish as unfinished; Git and theme evidence supersede those rows for **implementation** status. Prefer this checklist for remaining launch tasks until project-status is deliberately refreshed.

### Status vocabulary

| Status | Meaning |
|---|---|
| **Implemented** | Code or Admin config exists in repo / known environment |
| **Verified** | Exercised on the target environment with recorded acceptance |
| **Approved** | Explicit owner (or designated) sign-off |
| **Blocked** | Waiting on access, decision, content, or dependency |
| **Not started** | No meaningful work yet |
| **Requires verification** | Claimed or partial; must be re-checked before treating as done |

Priorities: **P0** launch-blocking · **P1** should complete before public launch · **P2** important polish / near-term post-cutover.

---

## Critical path

```text
Catalog migration (products + metafields + inventory)
        ↓
Collection migration + nav / URL plan
        ↓
PDP + cart verification on real catalog (incl. multi-variant & diptych rules)
        ↓
Content completion (About, Portfolio art/copy, Contact media, policies, email)
        ↓
SEO (MerchantSignals audit + structured data + redirects)
        ↓
Final QA (a11y, responsive, performance, checkout, CAPTCHA, links)
        ↓
Production backup → deploy → rollback drill → post-launch verification
        ↓
Ranjeeta final approval → Launch
```

Ordinary variant UX no longer blocks starting catalog prep, but **shared-inventory / diptych decision** and **published multi-variant QA** remain launch gates for originals that sell as related units.

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
| L-PDP-07 | P0 | Two-option variant matrix + unavailable combination testing | Praveen | **Not started** (storefront) | Published multi-variant product | Size × Finish (or equivalent): missing combo blocked; price/ATC correct — **do not claim from code inspection** |
| L-PDP-08 | P0 | Published multi-variant product QA on Online Store channel | Praveen / Admin | **Blocked** | Online Store publish scope; QA products currently 404 | `v2-variant-qa-diptych` / `v2-variant-qa-size-finish` ACTIVE in Admin but unpublished to storefront |
| L-PDP-09 | P0 | Shared inventory / diptych commerce model (Bundles vs variants vs workflow) | Praveen + Ranjeeta | **Not started** | Owner listing decision; Bundles eligibility | Documented prototype + decision; no double-sell of physical panels |
| L-PDP-10 | P1 | Accelerated checkout / Shop Pay on original PDP | Praveen | **Not started** | Payments enabled on store; design placement | `payment_button` absent on `zita-product-artwork`; only skeleton `product.liquid` has it — **decision required** |
| L-PDP-11 | P0 | Final PDP visual + commerce approval | Ranjeeta | **Not started** | L-PDP-01–06 verified; ideally L-PDP-07–08 | Written approval of description placement, selectors, sold state, mobile |
| L-PDP-12 | P1 | Variant featured-media gallery sync | Praveen | **Implemented**; **Requires verification** | Variant featured media on real products | Code path exists; PoC fixtures lacked distinct media — retest on catalog |
| L-PDP-13 | P2 | Hide Year / Framing; Medium / Surface / Size / COA trim per owner | Praveen + Ranjeeta | **Requires verification** | Metafield display rules; Surface render gap | Confirm PDP facts match Oct 2026 owner decisions on live products |

---

## 2. Product catalog migration and data cleanup

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-CAT-01 | P0 | Complete artwork catalog workbook from production export | Ranjeeta + Praveen | **Not started** | [`product-cleanup-import-spec.md`](architecture/product-cleanup-import-spec.md) | One row per sellable SKU; handles preserved where required |
| L-CAT-02 | P0 | Product metafield mapping (width/height, story, certificate, ready_to_hang, etc.) | Praveen | **Implemented** (defs on **dev** only) | Phase B metafield provisioning on production | Definitions match [`metafield-definitions.md`](architecture/metafield-definitions.md); values filled per product |
| L-CAT-03 | P0 | Migrate / create V2 products as Draft on production | Praveen + Ranjeeta | **Not started** | L-CAT-01; unpublished V2 theme on merchant store | Draft products use `original` (or agreed) template; media attached |
| L-CAT-04 | P0 | Inventory and variant validation (qty, track, deny policy, prices) | Praveen + Ranjeeta | **Requires verification** | L-CAT-03; L-PDP-09 for pairs | One-of-ones typically qty 1 + deny; multi-SKU matrices complete |
| L-CAT-05 | P0 | Map legacy description → short buy-box description + `artwork_story` | Ranjeeta | **Not started** | L-PDP-01 | No empty buy-box where story exists; no harmful duplication without approval |
| L-CAT-06 | P1 | SEO title / meta description / image alt per product | Ranjeeta + agency | **Not started** | L-CAT-03 | Unique titles/descriptions; descriptive alt |
| L-CAT-07 | P1 | Activate V2 products only at controlled cutover | Praveen | **Not started** | Final QA; redirects | No premature Active+indexed duplicates vs legacy |

---

## 3. Collection migration

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-COL-01 | P0 | Define production series / Originals collections and handles | Ranjeeta + Praveen | **Not started** | Catalog plan | Matches nav mega-menu and Portfolio “Explore the series” URLs |
| L-COL-02 | P0 | Migrate collection membership + editorial metafields | Praveen | **Not started** | L-CAT-03; PLP templates | Filters/sort work; editorial band populated where designed |
| L-COL-03 | P1 | Replace Portfolio temporary series destinations with real collections | Praveen | **Not started** | L-COL-01 | Portfolio room links resolve to live series (today: fallbacks noted in `page.portfolio.json`) |
| L-COL-04 | P1 | Collection SEO titles/descriptions | Ranjeeta + agency | **Not started** | L-COL-02 | No thin duplicate series pages |

---

## 4. Portfolio content and owner-editability QA

| Task ID | Priority | Task | Owner | Status | Dependencies | Verification / acceptance |
|---|---|---|---|---|---|---|
| L-PF-01 | P0 | Portfolio page theme implementation | Praveen | **Implemented** | `6153066`, `326258d` | `page.portfolio.json` + room sections on `main` |
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
| L-SEO-04 | P0 | Production handle inventory + redirect plan (legacy → V2) | Praveen | **Not started** | Production export | No soft-404s; critical URLs 301 as planned |
| L-SEO-05 | P1 | Sitemap / Search Console / robots at cutover | Praveen | **Not started** | Password removed only at launch | Production sitemap healthy (legacy audit saw `/sitemap.xml` **500** — **reverify**) |
| L-SEO-06 | P1 | Image alt + filename hygiene on migrated media | Ranjeeta + Praveen | **Not started** | L-CAT-03 | Artwork alts descriptive; no generic “image1” |
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
| L-COM-06 | P0 | Sold / available inventory edge cases on migrated catalog | Praveen | **Not started** | L-CAT-04 | Cannot oversell originals; sold PDP messaging correct |

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
| L-A11Y-01 | P0 | Keyboard / focus / landmarks on primary templates | Praveen | **Requires verification** | — | Skip link, menus, PDP gallery/viewer, cart, forms |
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
| L-DEP-05 | P1 | Metafield definitions provisioned on production | Praveen | **Not started** | [`metafield-definitions.md`](architecture/metafield-definitions.md) | Match proven Admin order from Partner store |
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

---

## Cross-cutting outstanding items (Oct 31 review)

These were called out explicitly in the 31 October 2026 project review and are mapped above:

| Review item | Primary IDs | Status snapshot |
|---|---|---|
| Favicon.ico + supporting icons | L-BR-01, L-BR-02 | **Not started** |
| MerchantSignals SEO audit | L-SEO-01 | **Not started** |
| Product + collection migration | L-CAT-*, L-COL-* | **Not started** (workbook/spec only) |
| Product metafield mapping | L-CAT-02, L-DEP-05 | Dev defs **Implemented**; production **Not started** |
| Inventory and variant validation | L-CAT-04, L-COM-06, L-PDP-07–09 | Partial PoC only |
| Portfolio temporary artwork replacement | L-PF-02, L-CNT-03 | **Not started** |
| Portfolio copy approval | L-PF-03, L-CNT-04 | **Not started** |
| Contact placeholder replacement | L-CNT-02 | **Not started** (SVG placeholders in theme) |
| Shopify CAPTCHA reliability | L-FRM-01 (below), L-A11Y-04, L-POST-03 | **Requires verification** |
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
| Original PDP | `f713471` … `3ae754a` | Description + basic variants **Verified** on dev; deeper commerce open |
| Cart | `3ecb3d2`, copy `3d31d13` | Implemented; regression **Requires verification** |
| About | `6837063`, mobile fixes | Implemented; content **Blocked** / approval open |
| 404 | `bed8e62` | Implemented |
| Exhibitions | `9697dba` | Implemented; content/assets gaps |
| Contact | `cc109f4` … `57a71d4` | Implemented; placeholders + CAPTCHA open |
| Portfolio | `6153066`, `326258d` | Implemented; temporary art + copy approval open |
| Policies | — | **Not started** |
| Favicon | — | **Not started** |

---

## How to use this document

1. Do not mark a row **Verified** without an environment test note (date + store + what was exercised).  
2. Do not mark **Approved** without Ranjeeta (or named delegate) confirmation.  
3. Update statuses here as launch work proceeds; refresh [`project-status.md`](project-status.md) in a separate, deliberate edit when environment truth changes.  
4. Keep production untouched until Phase B runbook tasks are complete.

---

## Related documents

- [`docs/project-status.md`](project-status.md) — canonical environment / milestone status  
- [`docs/architecture/shopify-implementation-plan.md`](architecture/shopify-implementation-plan.md) — Phase A–H cutover  
- [`docs/architecture/phase-d-implementation-plan.md`](architecture/phase-d-implementation-plan.md) — commerce packages C1–C5  
- [`docs/architecture/product-cleanup-import-spec.md`](architecture/product-cleanup-import-spec.md) — catalog workbook  
- [`docs/architecture/v2-seo-foundation.md`](architecture/v2-seo-foundation.md) — SEO baseline  
- [`docs/architecture/v2-recovery-audit-2026-10-23.md`](architecture/v2-recovery-audit-2026-10-23.md) — recovery findings  
- PDP commerce commit: `3ae754a`
