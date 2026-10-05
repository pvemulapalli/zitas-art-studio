# Zita's Art Studio — Shopify Implementation Plan

**Status:** Authoritative architecture reference for `theme/` — refine as each page is built

It maps approved **Design V2** to Shopify Online Store 2.0 structures on **Shopify Basic**. Progress and next steps are tracked only in [project-status.md](../project-status.md); this document records architecture decisions and how they were proven.

**Related documents:**

- [Project status](../project-status.md) — **canonical** progress, next steps and environment state
- [Project brief](../project-brief.md)
- [Zita design brief](../design/zita-design-brief.md)
- [Ranjeeta preferences](../design/ranjeeta-preferences.md)
- [Design V2 acceptance](../design/design-v2-acceptance.md)
- [Content & brand inventory](../research/zita-content-brand-inventory.md)
- [Design V2 screenshots index](../../references/claude-design/screenshots/v2/README.md)
- [Product schema registry](product-schema.md) — **canonical** V2 product data model (Phase A proven)

**Core principle:** **Art-first, commerce-enabled.**

**North Star:** Does this feel like Zita's Art Studio? Would a visitor guess this was a standard Shopify theme? Ideally, no.

---

## 1. Executive architecture decisions

| Area | Decision |
|---|---|
| **Production target** | Ranjeeta's **existing** Shopify store — legacy catalog/media, unpublished Zita V2 review theme, eventual V2 **Draft** catalog, and launch. Do **not** create a second client/production store. **Collaborator access.** |
| **Partner dev store** | **Shopify Partner dev store** ( **Basic** plan to match Ranjeeta) — isolated data-model laboratory and page-build environment; **never** transferred or launched. Not populated with unrelated demo data unless later useful. Zita V2 may be **published** here for demos. |
| **Hybrid model** | **Dev store** = Active PoC catalog, metafields, PLP/PDP proof, destructive experiments. **Merchant store** = Flora published; theme preview on **real** legacy data; V2 products stay **Draft** until controlled cutover. **One** `theme/` Git codebase for both. |
| **Live theme (merchant)** | **Flora** remains **published** and **untouched** as V2 code target until launch. |
| **V2 theme** | Custom **Zita V2** in `theme/` (standard directories: `assets`, `blocks`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`). |
| **CLI safety** | Before any `theme dev` / push / data operation, **confirm target store** (`--store`). Do not rely on remembered default CLI store for sensitive work. |
| **Starting point** | **Shopify Skeleton** theme — minimal, modular, Shopify-native, low visual inheritance vs Flora/Dawn. Native patterns = commerce/accessibility infrastructure, not the visual design system. **Do not** buy Impulse. **Do not** clone Flora. |
| **Source control** | **Git** = source of truth for theme code and architecture docs. **Shopify Admin** = merchant-managed content/data. Admin theme edits are not the sole source of production code. |
| **Hydrogen** | Not default. Revisit only if a requirement cannot be met reasonably in native themes. |
| **Apps** | Avoid unnecessary apps; prefer native → custom theme → free first-party → paid when justified. |
| **Canvas** | **Not** a project dependency. May be evaluated later; architecture must work without it. |
| **Constraints** | Shopify Basic, theme-first, OS 2.0, owner-level content control, accessibility, mobile, performance, SEO, maintainability. |

---

## 2. Environment model

Hybrid **Partner dev store** + **Ranjeeta merchant store**. Theme code is **one** Git repo (`theme/`); store **data** is not shared.

```
PARTNER DEV STORE (Basic)
─────────────────────────
Zita V2 theme (CLI; "Zita V2 — Development" published for demos)
PoC catalog (Essence V2 + sold-state fixture, test collection)
Provisioned metafield definitions & schema experiments
Active test products OK — isolated from zitasartstudio.com

            ↓ proven theme + schema (Git, explicit CLI --store)

RANJEETA LIVE STORE
─────────────────────────
Flora published · legacy catalog live · customers unaffected

RANJEETA DEVELOPMENT / REVIEW (same merchant store)
─────────────────────────
Local `theme/` + CLI development theme / unpublished Zita V2
Visual testing against real legacy products & media
New V2 catalog records → Draft (not Active for routine PLP work)
Final navigation, merchant content, cutover QA

            ↓ launch preparation (§24)

LAUNCH
─────────────────────────
Activate/publish V2 catalog as required
Publish Zita V2 theme
Archive legacy after confidence period
```

| Environment | Purpose |
|---|---|
| **Partner dev store** `zitas-art-studio-development.myshopify.com` | **Essence** + **Colored by Nature-Blue** V2 fixtures; one clean test collection; category/custom metafield experiments; sold/available states; Homepage, **PLP + PDP** builds; Search & Discovery; GraphQL/Admin API learning; resettable/destructive tests **before** touching merchant catalog. Theme **Zita V2 — Development** is **published** here so the storefront can be demonstrated. |
| **Ranjeeta — live** | Production traffic on **Flora**; legacy products remain source of truth for copy/media until V2 cutover |
| **Ranjeeta — dev/review** (Phase B, future) | Unpublished **Zita V2** theme; validate shell/components against **real** legacy data; create V2 products as **Draft**; do **not** activate V2 products merely to test PLP on the live store (§3) |
| **Launch** | Controlled V2 activation/publication; publish Zita V2; redirects; archive legacy (do not mass-delete immediately) |

### Theme workflow (one codebase, two stores)

1. **Partner dev store** — preferred target for architecture and catalog-behavior experiments (including **Active** PoC products when PLP testing requires it).
2. **Ranjeeta's store** — preferred target for real-content preview, merchant workflows, and pre-launch QA on unpublished Zita V2.

Use explicit Shopify CLI **`--store`** (or equivalent) and **verify the target store** before every push, dev session, or Admin script. **Do not** maintain separate divergent theme codebases per store.

### Theme baseline

| Item | Decision |
|---|---|
| **Starting theme** | **Shopify Skeleton v1.0.0**, upstream commit `8b8a1f4d2ef437d4d60df7a9cc4770f85a2f1b76` |
| **Architecture** | **Online Store 2.0:** JSON templates + **sections** + **blocks** + **Liquid** + snippets — matches this plan’s theme-first assumptions |
| **Not adopted (now)** | Newer CLI **Liquid-first** Skeleton (`{% block %}`, `{% partial %}`, Liquid templates) — requires developer-preview capabilities; **deferred** for production stability on this redesign |
| **Review gate** | Before **merchant-store integration** or substantial custom template work, reconsider Liquid-first only if Shopify has moved it to **GA** (or equivalent production maturity) **and** it clearly benefits Zita without compromising owner editability, maintainability, or stability |
| **Verified toolchain** | **Node.js 22** (repository `.nvmrc`); **Shopify CLI 4.x**; **Basic** Partner dev store `zitas-art-studio-development.myshopify.com` |
| **Verified baseline** | Untouched Skeleton v1.0.0 serves via Shopify CLI against that dev store with **no Liquid compilation/upload errors** |

This is a **production-stability** choice, not a permanent rejection of Shopify’s Liquid-first direction.

---

## 3. Parallel V2 catalog strategy

**Do not** treat in-place cleanup of the current catalog as the primary strategy.

| Approach | Detail |
|---|---|
| **During development** | Retain merchant **legacy** products/collections as source material. Build **clean V2 catalog behavior** on the **Partner dev store** first. On Ranjeeta's store, create parallel V2 records as **Draft**; use **legacy Active products** for generic theme rendering on unpublished Zita V2 until cutover prep. |
| **After launch** | Archive legacy counterparts after successful cutover. Delete legacy records only much later, if there is a clear reason. |
| **Why** | Little/no meaningful historical order dependency; catalog has naming hacks, demo/example records, inconsistent vendors/tags/categories/statuses (per content inventory). Parallel creation reduces risk to Flora and enables a cleaner model. |

### V2 product visibility — hybrid rules

**Theme isolation ≠ catalog isolation.** An unpublished or development **theme** does not hide **store-level** products from other themes on the same store. Flora exposes customer-accessible collection/catalog surfaces, so **Active V2 test products must not be the default PoC strategy on Ranjeeta's live merchant store.**

#### Partner dev store

- Use for **PLP + PDP** proofs that require **Active** products in collections, sold/available states, filters, and clean V2 data.
- Test products may be **Active** when needed — the dev store is isolated from **zitasartstudio.com**.

#### Ranjeeta's merchant store (normal development)

- **New V2 products stay Draft** — do **not** make them **Active** merely to test PLP layouts.
- Use **existing Active legacy products** to test generic theme rendering (PDP/PLP templates, typography, Gesso ground, cards) on **unpublished Zita V2**.
- After dev-store PoC proves the model, create the matching V2 product on the merchant store as **Draft** for content prep; activation is **launch preparation**, not everyday development.

#### Draft (both stores)

Use **Draft** while creating/copying products, assigning media/metafields, and Admin setup. **Draft** is not storefront-visible for PLP/PDP testing.

#### Unlisted (merchant store — limited)

**Unlisted** products:

- remain reachable by direct URL
- are hidden from search engines, sitemap, Shopify Catalog, storefront search, collection listings, and recommendations

Use **Unlisted** only for **isolated PDP** checks on the merchant store if needed. **Unlisted is not suitable for PLP** tests (products do not appear in collections).

#### `seo.hidden = 1` — not primary live-store isolation

System metafield **`seo.hidden = 1`**:

- hides from search engines, sitemap, Shopify Catalog, and **storefront search**
- **does not** reliably hide from **storefront collections** — Active products can still appear in collection PLPs

Therefore **`Active` + `seo.hidden` is not the default parallel-catalog PoC strategy on Ranjeeta's store.** It may still help legitimate **post-launch** visibility/SEO management when reviewed case-by-case.

Scale merchant-store V2 catalog creation only after Partner dev store PoC and Draft records are ready for **controlled cutover** (§24).

**Legacy products remain authoritative source material** for copying (after validation):

- title, descriptions, pricing, media, room imagery where present
- known dimensions, business details, useful SEO handles, historical context

**Do not** assume Claude Design V2 prototype placeholders or screenshot copy are authoritative.

**Do not** modify **legacy merchant-store source products** during PoC — create **new V2 records** on the Partner dev store (and later **Draft** mirrors on the merchant store) only.

---

## 4. Proof-of-concept first

**Do not** create the full V2 catalog immediately.

**Phase A product-data PoC (Partner dev store):** **Essence V2** and **Colored by Nature-Blue V2** are created with proven custom metafield definitions, category usage, and collection **`V2 PoC — Original Artworks`**. Sold-state behavior is proven via **Colored by Nature-Blue V2** (tracked inventory **0**, continue selling when out of stock **off**). Canonical detail: **[product-schema.md](product-schema.md)**.

**Theme proof against this schema on the dev store:** PLP — **Done** (both fixtures **Active** on the dev store; they were **Draft** during data setup). PDP — **in progress**. See §28.

**PoC location:** **Partner dev store first** — prove data model, then templates. **Merchant-store source products are read-only** during this phase.

**PoC scope (dev store) — intentionally small:**

- **Two** V2 test products (may be **Active** on dev store for PLP/PDP)
- **One** clean V2 test collection (no legacy ordering-prefix names)
- **Minimal** provisional custom metafields only where native + category data are insufficient

**After dev-store proof:** create corresponding V2 products on **Ranjeeta's store** as **Draft** only — do **not** activate them for routine development.

### Primary fixture — **Essence** (available original)

**Merchant source (read-only):** Active; **$1,500**; inventory tracked; available **1**; sell when out of stock **off**. Rich media including artwork and **room/context** imagery. Description mixes story and structured facts (e.g. acrylic, **20 × 40 in** gallery-wrapped canvas, original, certificate, ready to hang). **Shopify category assigned** with several **category metafields** populated (color, material, canvas, authenticity, frame, orientation, medium, rarity, signature, theme) — preferred over duplicating as custom fields.

**Proves:** clean V2 data model; category/taxonomy usage; media + room behavior; **available** PDP/PLP; commerce (add to cart); owner editability patterns.

**Do not copy blindly:** legacy collection name `B - Walking the trail`; Type **None**; vendor `ZitasArt`; misaligned handle (e.g. `tangled-copy`).

### Sold-state fixture — **Colored by Nature-Blue**

**Merchant source (read-only):** Active; **$475**; inventory tracked; available **0** / on hand **0**; sell when out of stock **off** — theme should derive **Sold** / unavailable purchase from this commerce state **without** a manual `custom.sold` metafield. Description includes series/story, acrylic, **12 × 16 in** canvas, fluid-art notes. Category assigned; at earlier merchant review, **most category metafields were empty** on the legacy record (contrast with Essence merchant source).

**V2 fixture (Partner dev store):** **Colored by Nature-Blue V2** includes **legacy-derived** category metadata copied from that merchant source — migration input, not assumed truth; subject to **merchant review** (provenance: merchant-confirmed / legacy-derived / Shopify-suggested). **Shopify suggestions were not automatically accepted** during V2 fixture setup. See **[product-schema.md](product-schema.md)** §3.

**Proves:** sold work **visible and artistically equal**; purchase action removed/replaced from real availability; PLP + PDP sold presentation.

**Do not copy blindly:** collections `A - Colored by Nature`, `Featured Products`; legacy tags; inconsistent Type/vendor patterns.

### Secondary reference — **Horizon**

Useful for ad-hoc comparison only — **not** a required PoC record at this stage.

**General validation before V2 copy:**

- Validate titles, dimensions, handles, collections, and SEO with Ranjeeta where legacy data is inconsistent
- Do **not** treat Claude Design V2 prototype values as authoritative

**PoC workflow:**

1. **Partner dev store:** copy validated content from legacy Admin → **Essence V2**, **Colored by Nature-Blue V2**, and one test collection; exercise **Active** catalog, PLP, PDP, and sold/available rendering.
2. **Merchant store:** push proven `theme/` to **unpublished** Zita V2; test layout against **legacy Active** catalog; add V2 **Draft** mirrors when ready — no activation for PLP proof on live store.

**PoC must validate (primarily on dev store):**

- Product data model (native + category + minimal custom metafields)
- `product.original.json` PDP template
- PLP artwork card + collection behavior
- Sold vs available presentation rules
- Room/secondary media behavior
- Owner editability paths
- Navigation hook-up (menus, not hard-coded series)
- Responsive behavior

Scale catalog creation only after PoC review and architecture revision if needed.

---

## 5. Data ownership principles

**Do not duplicate data across Shopify merely because the theme needs to display it.**

Priority order:

1. **Shopify native resource field** (product price, title, media, collection membership, etc.)
2. **Shopify category / taxonomy metafield** where semantics fit
3. **Small Zita-specific metafield** when native/category is insufficient
4. **Metaobject reference** when the entity is genuinely reusable across resources
5. **Theme Editor setting** only for presentation/editorial configuration (homepage carousel slide copy, layout toggles)

| Need | Owner | Avoid |
|---|---|---|
| Product price | Native `product` price | Custom metafield; Theme Editor text |
| Artwork medium | Category metafield where correct | Duplicate `custom.medium` without reason |
| Carousel headline | Theme Editor block setting | Product metafield |
| Exhibition record | Metaobject (if adopted) | Copy/paste same exhibition text on many products |
| Series PLP editorial band | Collection-level data | Hard-coded Liquid per series |
| Gesso artwork mat | Theme CSS/presentation | Per-product background metafield |

> **Why this belongs in Shopify:** Commerce facts live on **Product** because checkout, inventory, and pricing are platform-owned. Presentation copy for a homepage slide lives in **section blocks** because it is page editorial content, not product data.

---

## 6. Product data model — original artwork

Three layers: native, category/taxonomy, Zita-specific (provisional).

### A. Shopify native fields

Use for:

- title, handle, description (where appropriate)
- price, inventory, status, variants/options **only if truly needed**
- product media gallery
- product category (Shopify taxonomy)
- vendor **only** if operationally meaningful
- collections assignment
- shipping / weight / package fields
- SEO title and meta description

**Do not** mirror these in custom metafields.

### B. Shopify category metafields / taxonomy

Reuse structured category data where it fits, e.g. material, painting medium, orientation, artwork authenticity, frame style, color, art movement, art style, theme — **validated per product**, not bulk-accepted from suggestions.

> **Why this belongs here:** Category metafields attach semantics Shopify already models for merchandising and discovery; duplicating them creates sync drift.

### C. Zita-specific custom metafields

**PROVEN** (Partner dev store): `custom.artwork_width`, `custom.artwork_height`, `custom.certificate_notes`, `custom.ready_to_hang`, `custom.artwork_story` — registry in **[product-schema.md](product-schema.md)**.

**PROVISIONAL / FUTURE** (not proven): year, shipping/packing notes, scale notes, print link, related artworks, exhibitions references, short label, combined dimensions display string, etc. — see product-schema §10.

**Do not** create custom fields for: price, availability, title, primary image, collection membership, medium, orientation, authenticity, frame style, signature presence when category metafields suffice.

---

## 7. Sold / available state

**Design:** Sold works remain visible and artistically equal; clear **Sold** label; no purchase ambiguity; no fading or “disabled” styling.

**Architecture:**

- **Do not** split sold vs available into separate product types for appearance alone.
- Prefer deriving state from real Shopify commerce data: inventory/sellability, publication, intentional archival workflow where needed.
- **PROVEN (Partner dev store):** **Colored by Nature-Blue V2** — inventory tracked, available **0**, continue selling when out of stock **off** — theme derives **Sold** without `custom.sold`. **Essence V2** proves available path (qty **> 0**). See **[product-schema.md](product-schema.md)** §6. Merchant legacy sources informed fixtures; edge cases remain **FUTURE**.

Requirements:

- Sold work discoverable in PLP/archive paths
- Purchase action removed or disabled appropriately
- Imagery and story preserved
- Optional paths to available work or prints

> **Why this belongs here:** Availability is commerce state; the theme **renders** Sold from truth in Product/inventory, not from a parallel manual flag unless Admin data forces a compensating pattern.

---

## 8. Print data model

| Template | Role |
|---|---|
| `product.original.json` | One-of-one originals; avoid artificial variants |
| `product.print.json` | Legitimate variants: size, finish, frame, etc. |

**Original ↔ print:** Prefer **product reference metafield** (or equivalent native relationship). Fulfillment/app architecture **not** finalized in this plan.

Print strategy and production details remain open in design docs (newsletter, fulfillment, which originals have prints).

---

## 9. Collection / series model

V2 collections = real artistic bodies of work.

**Public names:** clean — e.g. Elements, Walking the Trail, Colored by Nature — **not** ordering hacks like `1- Elements`, `A- Colored by Nature`, `B- Walking the trail` (confirmed unwanted in preferences).

**Navigation prominence:** ~**2–3 current series** at a time; older/sold work discoverable without every historical series in primary nav.

**Native Collection owns:**

- title, handle, image, product membership, description (evaluate as series statement before duplicating), SEO

**Collection metafields:**

- PLP editorial band: **defined**. `custom.editorial_text` (presence trigger, no separate enabled flag), `editorial_eyebrow`, `editorial_image`, `editorial_link_label`, `editorial_link`, `editorial_product`, `editorial_position`. Keys, types and validations are in [metafield-definitions.md](metafield-definitions.md) §3.
- Optional short series statement (if the description is insufficient): **PROVISIONAL**, not defined. Consider the standard collection **description** as the series statement first.

---

## 10. PLP editorial band

Approved behavior (Design V2):

- Optional; scoped to **current collection**
- No content → uninterrupted grid
- Merchant-managed; deliberate placement; text/image/CTA
- May hide during filter/sort if cleaner UX

**Architecture preference:** Collection fields + collection metafields (and/or one referenced structured object if justified later).

**Implemented:** `snippets/collection-editorial.liquid`, placed by `sections/zita-collection-gallery.liquid`. Its metafield definitions are in [metafield-definitions.md](metafield-definitions.md) §3.

**Editorial image: theme-constrained for owner safety.** There are no merchant width or height settings.

- The image is always shown whole and uncropped, capped at `max-width: min(100%, 520px)` and `max-height: min(64vh, 520px)`.
- Unusually tall images become narrower within the cap rather than making the band taller. The band is never taller than with a square image.
- Image requests are sized to the rendered slot. Portrait images advertise `520 × aspect ratio` px, so they download smaller Shopify CDN variants. The original upload is never requested.
- Phones (the image column is hidden below 750px) don't download it.
- Details: [metafield-definitions.md](metafield-definitions.md) §3, Editorial image presentation.

**Do not** hard-code series copy in Liquid. **Do not** require a separate collection template per series for text alone — one shared curated template (`collection.series.json`) with conditional editorial block.

> **Why this belongs here:** Editorial band content varies **by series**; it belongs on **Collection**, not global theme settings.

---

## 11. Navigation / mega-menu

| Layer | Source of truth |
|---|---|
| Labels, links, nesting, order | **Shopify native Menus** |
| Desktop mega-menu layout, mobile drawer, a11y behavior | **Custom theme** (`sections`/`snippets`) |

**Do not hard-code** Walking the Trail, Elements, Colored by Nature, or any current series in Liquid.

Ranjeeta replaces/reorders active series via **Menus**.

**Preview imagery:** Prefer linked **collection image** before duplicate Theme Editor settings. Exact mega-menu preview mechanism **deferred** to implementation (see design-v2-acceptance).

**Partly implemented:** supporting mega-menu infrastructure exists in `sections/zita-header.liquid` and `assets/zita-header.js` (desktop `zita-mega-menu`, mobile `zita-mobile-menu`, both driven by the section's Shopify menu). The approved V2 collection-navigation dropdown behaviour and content are **not yet complete**; it is scheduled after the PDP ([project-status.md](../project-status.md)).

Avoid duplicating collection ordering in unrelated theme settings unless architecture review shows clear benefit.

> **Why this belongs here:** Merchants reorder navigation in **Menus**; the theme only presents structure accessibly.

---

## 12. Homepage architecture

**Implemented** on the dev store (`templates/index.json`): `zita-hero-carousel`, `zita-current-series`, `zita-point-of-view`, `zita-selected-works`, `zita-recognition`, `zita-living-with-work` and `zita-from-the-studio`. The global shell is `zita-announcement` + `zita-header` (header group) and `zita-footer` (footer group). Build spec: [homepage handoff](../../references/claude-design/handoff/homepage/homepage-implementation-handoff.md) (historical).

Map V2 sections to Shopify ownership:

### Hero carousel

- Custom OS 2.0 section: `sections/zita-hero-carousel.liquid`
- **Blocks** = slides: desktop image, optional mobile image, heading, supporting text, CTA label/link, alignment; live HTML text
- **Section settings:** autoplay, interval, controls, layout constraints
- Requirements: full width; manual controls; swipe; keyboard; pausable autoplay; `prefers-reduced-motion`; no carousel app; minimal JS

> **Why this belongs here:** Slide copy changes frequently; **Theme Editor blocks** are the merchant surface.

### Current Series

- Custom section; **2–3 collection pickers** (settings/blocks)
- Pull collection image, title, description/statement, URL
- Optional override copy only if needed
- Swapping series = change selected collections, **not** layout redesign

### Selected Works

- Section selecting products or collection-backed featured set
- Aligned artwork cards; no stagger; preserve aspect ratios (contain-style field)

### Other editorial modules

Artist quote, recognition, originals/prints/commissions, Instagram/newsletter — focused reusable sections rather than one monolithic homepage section.

Visual reference: [V2 screenshots README](../../references/claude-design/screenshots/v2/README.md).

---

## 13. PLP / collection template architecture

**Shared series template:** `templates/collection.series.json`

One template for artistic series unless behavior genuinely diverges.

**Implemented** on the dev store: `templates/collection.json` (default) and `templates/collection.series.json` both use `sections/zita-collection-intro.liquid` + `sections/zita-collection-gallery.liquid`, with `snippets/collection-filters.liquid` (native storefront filtering via Shopify Search & Discovery, plus native sorting), `snippets/collection-editorial.liquid`, `snippets/pagination.liquid` and the shared `artwork-card` / `artwork-plate` snippets. Build spec: [PLP handoff](../../references/claude-design/handoff/plp/plp-implementation-handoff.md) (historical).

Sections/snippets support:

- Collection heading/statement
- Series context/navigation where appropriate
- Product grid (~3 columns desktop baseline; mobile single-column artwork-first)
- Filter & Sort (native / Search & Discovery–compatible APIs)
- Optional editorial interruption (collection-driven)
- Sold state; room-image secondary media on cards
- Aligned rows

Reusable **artwork-card** snippet/block; no third-party filter app unless native filtering proves insufficient.

### Collection grid sizing — intentional refinement of the handoff

The approved Claude V2 PLP handoff specifies **4:5** artwork plates for every grid. Live Shopify QA on the dev store (`/collections/v2-poc-original-artworks`) showed that 4:5 plates produced too much vertical scrolling on desktop collection pages. A row took roughly three-quarters of the viewport height, about 1.2 rows per screen at 1440 × 900.

**Implemented** in `assets/zita-collection.css`:

- **Collection-grid plates at `min-width: 750px` use 8:9**, via `.collection-grid .artwork-plate { aspect-ratio: 8 / 9; }`. The base `artwork-plate` component is unchanged.
- **Mobile (below 750px) keeps 4:5**, with its 44px row gap.
- **Homepage plates are unchanged.** Current Series, Selected Works and the header preview do not render inside `.collection-grid`.
- **Primary artwork stays fully contained and uncropped:** the same 10% mat and contain sizing, and no `object-fit: cover`.
- **Collection row gap** reduced from `clamp(56px, 5vw, 88px)` to `clamp(48px, 4vw, 72px)`.

**Result in testing:**

| Viewport | Plate before (4:5) | Plate after (8:9) | Row before | Row after |
|---|---|---|---|---|
| 1440 × 900 | 419 × 523px | 419 × 471px | 662px | 595px |
| 1920 × 1080 | 523 × 653px | 523 × 588px | 808px | 727px |

Rows here are plate + caption + row gap. The desktop row footprint fell by about 10%.

- Essence V2 (1:2) and Colored by Nature-Blue V2 remain fully visible at their true proportions.
- Very tall works lose about 12% of their displayed size; square and landscape works keep theirs.
- Aligned rows, the 3 / 2 / 1 column behaviour, captions, sold state, Filter & Sort and the editorial band are unchanged.
- The approved gallery character is preserved: one shared portrait field per row, a generous mat, and no cropping.

This is a deliberate refinement based on live usability testing, **not an accidental deviation** from the design handoff. The handoff files under `references/` are left as the historical record.

**Collection intro and toolbar spacing: reviewed and intentionally unchanged for now.**

- The space between the header and the first artwork row is about 329px at 1440: intro 224px, toolbar 76px and grid top padding 29px.
- It is a one-time page-entry cost (about half a row) and does not affect row-to-row scrolling.
- It still matches the approved composition.
- Revisit it only if the first screen needs more artwork above the fold. At 1440 × 900 the first row's captions currently sit just below the fold.

---

## 14. PDP architecture

Source: the Claude PDP handoff (`references/claude-design/handoff/pdp/`), interpreted against real Shopify data. The handoff stays as the historical record; deliberate deviations are listed below.

### Templates and the originals boundary

- **`templates/product.original.json` is the semantic boundary for one-of-one originals.** Copy such as "Original painting" and "one of one", and the rule "unavailable means sold", are valid only inside this template. Products opt in through their theme template assignment (`templateSuffix: original`), not through Product Type, tags or titles. Both PoC products are assigned on the dev store.
- `templates/product.json` stays the Skeleton default for anything not yet classified. `product.print.json` is future work (§8) and must not inherit the originals rules.

### As-built files

| File | Role |
|---|---|
| `sections/zita-product-artwork.liquid` | Main section: breadcrumb, media, label, purchase, facts, details accordion, mobile purchase bar. Computes state once and passes it to snippets. |
| `snippets/product-media-gallery.liquid` | Native product images. Desktop: vertical thumbnail rail + 1:1 gesso stage + caption/counter. Mobile: native scroll-snap strip with a "Swipe · N views" tag. |
| `snippets/product-purchase.liquid` | Available branch (the single product form, price, status, Add to bag / In your bag, Ask Ranjeeta) and sold branch (SOLD, note, See available works, optional commission link). |
| `sections/zita-artwork-story.liquid` | Ink story band from `custom.artwork_story`; omitted when blank. |
| `sections/zita-related-works.liquid` | "More originals" from Shopify product recommendations (`intent=related`), reusing `artwork-card`; hidden when empty. |
| `assets/zita-product.css`, `assets/zita-product.js` | PDP styles; three small custom elements (`product-gallery`, `product-artwork`, `product-recommendations`). No libraries. |

Shared additions: `check` and `mail` icons in `snippets/icon.liquid`, the `--color-available` token in `zita-base.css`, and a `product` locale namespace.

### Data rules

| Item | Rule |
|---|---|
| Sold / available | `product.available` only, inside `product.original` (§7). No `custom.sold`. Sold shows full-strength art with no grey-out, no overlay, no disabled button and no historical price. |
| Series | No `custom.series`. The series eyebrow, collection breadcrumb and series sentence in the sold note appear only with real collection context (`collection` set and not the originals collection). Never inferred from tags, product type, titles or arbitrary collection membership. Artwork cards and direct links use `/products/…`, so this context is usually absent. That is an **accepted, deferred data/navigation decision**, not a defect: revisit only with a deliberate series data model or collection-scoped product URLs. |
| Room photography | A media item is a room view when its **alt text starts with "Room"** (case-insensitive). Position in the gallery means nothing. Room views get no hang shadow or padding and may crop to fill on mobile; artwork views are always contained. |
| Image alt text | Shopify falls back to the product title when alt is blank; the gallery treats alt equal to the title as blank and labels images "Title, image N". |
| Medium | Shopify taxonomy `shopify.painting-medium` labels. The row is omitted when unset. |
| Ready to hang | `custom.ready_to_hang`: true prints "Ready to hang", false prints "Not ready to hang", unset omits the row. |
| Dimensions, certificate | Existing `artwork-dimensions` snippet; `custom.certificate_notes`. Rows render only with data. |
| Variants | None shown for a default-variant product; quantity is fixed at 1. A product with real variants gets a plain native select. |
| Ask Ranjeeta | `mailto:` the global `settings.contact_email` with the product title as subject; the section toggle can hide it, and it is hidden when the email is blank. |

### Commerce behaviour

- Exactly one `{% form 'product' %}`. The mobile bar's button submits it through `form="…"`. Without JavaScript the form posts natively to `/cart/add`.
- With JavaScript, the add is a **JSON `items` request** to `/cart/add.js` with bundled section rendering for the PDP and header. Live testing showed Shopify enforces the inventory ceiling for JSON `items` adds but lets form-encoded adds exceed it, so a form-encoded AJAX add could put a one-of-one in the bag twice.
- Success: live announcement, purchase regions re-rendered from the server, header bag count updated, focus moved to View bag. The Add button gives way to a non-interactive **"In your bag"** state label (display caps with a round green check, the counterpart of the Sold label) and a primary **View bag** button; the mobile title line and sticky bar show the same label with View bag. A 422 (already in a bag, or sold meanwhile) re-renders from the server and announces the real state. No cart drawer.
- A product already in the cart renders "In your bag" server-side.

### Theme Editor settings

Main section: Originals collection (breadcrumb + default "available works" destination), Ask toggle and label, sold note, sold series sentence (`[series]` placeholder), available-works label and collection, commission label and URL (link hidden when the URL is blank), and **detail** blocks (title + rich text) for the accordion. A detail row renders only when both title and content are set. The template ships a "Shipping & packing" block with **no content**, so the row stays hidden until Ranjeeta's approved copy is entered; no policy wording is invented or hard-coded. Story: eyebrow and sub-label. Related: heading, link label, link collection.

### Deliberate deviations from the handoff

- **Deferred:** the Scale section, print relationship, year, exhibitions, signature, framing, series quote, zoom/lightbox, video/3D and notify-me. Each needs real data or a later decision; nothing is rendered from prototype content.
- The certificate appears in the facts list only (no separate accordion item).
- On mobile the details accordion sits before the story band, following the reference HTML rather than the handoff prose.
- A mobile "Available · one of one" status line is shown under the title so the state is in text before the sticky bar.
- Stories longer than about 60 words use smaller roman type instead of the display italic, so long narratives stay readable. Both PoC stories are long.
- From 750px up to roughly 1000px, the media and info columns stack; the brief has no tablet layout.
- Related-work plates use the PLP's 8:9 desktop refinement (§13).
- Related Works stays hidden when Shopify returns no recommendations (nothing is hard-coded to fill it). In that case the ink story band is followed by a band of gesso space (`clamp(48px, 6vw, 96px)`) so it does not merge into the ink footer.

**Gesso/light neutral ground:** theme **CSS/presentation only**, **not** per-product data; **no** automatic background selection by product, tags or artwork colours (approved V2 rule).

Use **native product media**; do not duplicate images into metafields unless a documented exception appears.

---

## 15. Metaobject policy

**Do not** create metaobjects merely because Shopify supports them.

Use when a structured entity is **reusable** and **independent** of a single product/page.

**Best current candidate:** `Exhibition`

Illustrative fields (PROVISIONAL, not finalized):

- title, venue, city/country, start/end dates, description, featured image, external URL, recognition/award, status (upcoming/current/past)

Products (and Exhibitions page) **reference** exhibition entries.

Before build: verify **Shopify Basic** compatibility and current metaobject storefront capabilities.

> **Why this belongs here:** An exhibition appears on Exhibitions page, News, and artwork context — a **metaobject** avoids duplicating the same facts across many products.

---

## 16. About / News / Contact / Commissions

| Surface | Architecture |
|---|---|
| **About** | Shopify **Page** + alternate JSON template; custom editorial sections; owner-editable media/copy |
| **News / Press** | Native **blog/articles** first; custom article/list templates for editorial presentation; naming (News vs Press) still open in preferences |
| **Contact** | Native contact form; approved public email `ranjeeta.shroff@gmail.com` and phone `469-850-0196`; **no** physical address; response-time promise not invented |
| **Commissions** | Page + custom template/sections unless future commerce needs dictate otherwise |
| **Policies** | Native Shopify pages/policies; simple readable styling |

---

## 17. Theme file / component strategy

Prefer **focused** sections and snippets over monolithic “universal content” sections.

Illustrative layout:

```text
theme/
  assets/
  blocks/
  config/
  layout/
  locales/
  sections/
    zita-header.liquid
    zita-footer.liquid
    zita-hero-carousel.liquid
    zita-current-series.liquid
    zita-selected-works.liquid
    zita-editorial-story.liquid
    zita-recognition.liquid
    zita-collection-hero.liquid
    zita-product-gallery.liquid
    zita-artwork-story.liquid
    zita-related-works.liquid
  snippets/
    artwork-card.liquid
    artwork-media.liquid
    price.liquid
    sold-state.liquid
    responsive-image.liquid
    icon.liquid
    metadata-row.liquid
  templates/
    index.json
    collection.series.json
    product.original.json
    product.print.json
    page.about.json
    ...
```

Names are **illustrative** for pages not yet built. As-built Homepage, shell, PLP and PDP filenames are listed in §12, §13 and §14 (for example, `zita-collection-intro` rather than `zita-collection-hero`, `collection.series.json` rather than `collection.art-series.json`, and `zita-product-artwork` + `product-media-gallery` rather than `zita-product-gallery`). Avoid JS frameworks and unnecessary third-party libraries.

---

## 18. CSS / JavaScript approach

**CSS:** Native CSS; design tokens (`:root` custom properties); Grid/Flexbox; container queries if appropriate; `aspect-ratio` / `object-fit` for artwork contain behavior; focus states; `@media (prefers-reduced-motion: reduce)`.

**JavaScript:** Minimal progressive enhancement for carousel, mobile nav, media interactions, filter drawer — no React/Vue.

---

## 19. Design tokens

Centralize approved V2 foundations in theme CSS (validate contrast during implementation):

**Surfaces / editorial:** Gesso (default artwork ground), Vaayu Mist, Stone Mist, Sand, Deep Teal, Ink, Night, restrained copper/accent tones as documented in Design V2.

**Typography:** Marcellus (headings), Mulish (body/UI).

**Wordmark treatment:** `ZITA'S | ART STUDIO` (presentation in header snippet/section).

Do not embed prototype-only hex values without accessibility review.

---

## 20. Owner editability matrix

| Content / behavior | Shopify owner (Admin / Theme Editor) | Theme responsibility |
|---|---|---|
| Product title, price, media, inventory | Product Admin | Render; sold/available UI |
| Medium, orientation, category facts | Product + category metafields | Render metadata rows |
| Artwork story | `custom.artwork_story` (Product **Description** = migration/source reference for now; long-term role **PROVISIONAL**) | Narrative / story presentation |
| Series title, image, membership | Collection | PLP/header/context |
| Series statement | Collection description and/or metafield | PLP hero/intro |
| PLP editorial band | Collection metafields | Conditional section |
| Navigation labels/order/nesting | **Menus** | Mega-menu / mobile presentation |
| Carousel slides | Theme Editor section **blocks** | Carousel behavior/a11y |
| Current Series picks | Theme Editor collection selectors | Grid layout |
| About / Commissions copy & images | Pages + section settings | Editorial layout |
| News articles | Blog Admin | Article templates |
| Exhibition records | Metaobject (if adopted) | Exhibitions + references |
| Contact details | Page/section settings (approved values) | Contact template |

**Goal:** Ranjeeta does not need Cursor for routine content updates.

---

## 21. SEO / URL / redirect strategy

No significant historical ranking dependency (per project brief/inventory), but handle URLs deliberately.

During development:

- **PLP + clean V2 catalog PoC** → **Partner dev store** (Active test catalog allowed)
- **Merchant store:** V2 products remain **Draft**; use legacy Active products for template QA on unpublished Zita V2
- **Unlisted** on merchant store → isolated PDP/direct URL only (not PLP)
- **`seo.hidden = 1`** is not relied on to hide Active products from Flora collection surfaces (§3)
- Avoid duplicate **indexable** legacy + V2 pairs on the published Flora storefront until cutover
- Near launch: V2 activation/publication is a **controlled cutover** step (§24 G), not daily development

At cutover (per product):

- Evaluate legacy handle; **preserve** good handles on V2 where practical
- Otherwise plan **redirect** from legacy URL
- Do not mass-delete legacy products at launch — **archive first**

Ongoing:

- Meaningful image alt text
- Product structured data
- Canonical behavior
- Collection/product discoverability

---

## 22. App policy

Current direction: **minimal app dependency**.

No app proposed for: carousel, mega-menu, filtering, About layout, exhibitions, core product metadata.

**Shopify Search & Discovery** may be used where useful on Basic.

Order: native Shopify → custom theme → free first-party → paid app only with clear justification.

---

## 23. QA requirements

Before publish, validate:

| Area | Checks |
|---|---|
| **Commerce** | Add to cart, sold products, print variants, cart, checkout handoff |
| **Responsive** | Desktop, tablet, mobile (aligned grids, carousel, mega-menu) |
| **Accessibility** | Keyboard, semantics, focus, contrast, touch targets, reduced motion, menu/carousel/filter |
| **Content** | No prototype placeholders; real prices, inventory, status, metadata |
| **Performance** | Responsive images, lazy load below fold, restrained JS, font loading, Lighthouse/theme review |
| **SEO** | Handles, redirects, canonicals, metadata, structured data, alt text |
| **Browsers** | Safari, Chrome, iOS Safari, Android Chrome |
| **Merchant** | Ranjeeta can edit carousel, menus, featured series, products, collection editorial content |

Review against [Design V2 acceptance](../design/design-v2-acceptance.md) and V2 screenshots.

---

## 24. Cutover / launch strategy

| Phase | Where | Scope |
|---|---|---|
| **A — Isolated proof** | **Partner dev store** | Skeleton in `theme/`; **Essence V2** + **Colored by Nature-Blue V2** + **`V2 PoC — Original Artworks`**; **proven custom metafields** + **[product-schema.md](product-schema.md)**; sold/available data rules proven — **Done**. Reproducible metafield-definition provisioning, including Admin order — **Done** on the dev store ([metafield-definitions.md](metafield-definitions.md)). **Later:** merchant catalog workbook, dev-store-tested migration/import |
| **B — Merchant theme foundation** | **Ranjeeta's store** | Same theme repo (`--store` verified); development/unpublished Zita V2; global shell & components against **legacy real data**; **Flora untouched** |
| **C — Commerce templates** | Dev → merchant | Originals + prints PLP/PDP (catalog behavior proven on dev store first) |
| **D — Editorial pages** | Dev → merchant | About, Exhibitions, News, Contact, Commissions, policies |
| **E — Catalog creation** | **Merchant store** | Remaining V2 products/collections as **Draft** until launch prep; media, metadata, relationships, redirect plan |
| **F — Review** | **Merchant store** | Unpublished Zita V2; Ranjeeta + a11y/content QA |
| **G — Cutover** | **Merchant store** | Activate/publish V2 catalog as required; menus; **publish Zita V2 theme**; production verification |
| **H — Post-launch** | **Merchant store** | Archive legacy after confidence period; monitor redirects/indexing; delete only intentionally later |

### Actual build sequence

The phases above define scope, not strict order. In practice the commerce-page work of Phase C has been built on the **Partner dev store first**, and merchant-store integration (Phase B) follows once the core pages are proven:

1. Global shell + Homepage (dev store) — **Done**
2. PLP / collection gallery (dev store) — **Done**
3. Original-artwork PDP (dev store) — **in progress**
4. Header collection-navigation dropdown (dev store)
5. Cross-page polish and QA (dev store)
6. **Phase B** — merchant-store integration on an unpublished Zita V2 theme

Current position in this sequence: [project-status.md](../project-status.md).

---

## 25. Development safety rules

Until explicit cutover:

- **Never** edit **Flora** theme code for V2 work
- **Never** publish Zita V2 on **Ranjeeta's production store** before cutover. Publishing Zita V2 on the **Partner dev store** for demos is allowed.
- **Never** bulk-delete legacy content
- **Never** change legacy product prices/inventory/status casually
- **Never** treat Claude prototype/screenshot data as authoritative
- **Always verify CLI target store** before theme push/dev or data operations; prefer **Partner dev store** for experiments requiring **Active** test catalog data
- **Do not** assume an unpublished theme isolates store-level product visibility — theme code vs catalog data are separate (§26)
- **Merchant-store V2 products remain Draft** until controlled cutover unless an explicitly reviewed exception is documented
- **Never** add V2 PoC products to Flora menus or published discovery paths on the merchant store
- **Never** use **Active + `seo.hidden`** as the default live-store PLP PoC (§3)
- Use **Git** before significant theme changes; inspect `git status` and diffs before commit
- Keep secrets out of Git
- **Do not** commit high-resolution or private artwork to public GitHub

This document **does not** include destructive Shopify Admin commands.

---

## 26. Shopify learning notes

This implementation plan supports the [Shopify learning log](../learning/shopify-learning-log.md). For each area, the “why Shopify” mapping is:

| Area | Learning note |
|---|---|
| Product price/inventory | Commerce core — checkout and inventory APIs expect Product fields |
| Menus | Merchants reorder nav without deploys |
| Collection | Series membership and PLP editorial context are collection-scoped |
| Category metafields | Shopify taxonomy powers filters/discovery without custom duplication |
| Section blocks | Homepage carousel slides are presentation content |
| Metaobjects | Exhibitions are reusable entities across pages and products |
| Development theme | Isolates **theme code** preview on a store — it does **not** isolate **catalog data** from other themes on that store |
| Partner dev store | Provides **store-data** isolation for Active PoC catalog, metafields, and PLP/PDP experiments |
| Git + `theme/` | One reproducible codebase; products, collections, menus, metafields, and metaobjects belong to whichever **store** CLI targets |

**Core learning distinction:** A Shopify **development theme** isolates **theme code**, not **store-level catalog data**. Products, collections, inventory, publication state, menus, metafields, and metaobjects belong to the **store** and can surface on **every** theme—including published Flora. A **Partner dev store** provides true **store-data** isolation for Active PoC catalog work. This hybrid model is intentional for this project.

Keep experiments documented in the learning log as PoC proceeds.

---

## 27. Deferred decisions

Not finalized in this plan:

- Additional custom metafields beyond [product-schema.md](product-schema.md) §4 PROVEN set
- Metafield-definition provisioning on Ranjeeta's store (Phase B). Dev-store state and open questions: [metafield-definitions.md](metafield-definitions.md).
- Merchant catalog workbook + import pipeline (FUTURE)
- Exhibition metaobject schema and Basic storefront exposure
- Final V2 active series list (~2–3 foregrounded)
- Collection description vs custom field for series statement
- Sold-state rules for all legacy inventory edge cases
- Print fulfillment/process and original↔print linking field (no relationship field exists yet; the PDP renders none)
- `custom.series` metafield: not created; the PDP uses real collection context only (§14)
- PDP Scale section (person-to-painting comparison): deferred; the PDP is modular so it can be added as its own section
- Mega-menu preview-image behavior beyond collection image
- Newsletter value proposition / copy
- Font loading/licensing details
- Exact redirect map at cutover
- Final theme section filenames for pages not yet built (About, News, Contact, Commissions)
- Shopify Canvas usage, if any
- Pending series descriptions (Colored by Nature, BlackWhiteandGrey, Walking the Trail)
- Merchant-store publication/channel checklist at cutover (not routine dev Active products)

---

## 28. First implementation checkpoint

### A — Partner dev store (isolated proof)

1. Create/use **Basic** Partner dev store; confirm CLI **`--store`** targeting. — **Done**
2. Initialize `theme/` from **Skeleton** against **dev store**. — **Done**
3. Create **Essence V2** + **Colored by Nature-Blue V2** + **`V2 PoC — Original Artworks`** from validated legacy Admin (read-only). — **Done**
4. Define and populate **proven custom metafields**; prove sold/available data model. — **Done** → **[product-schema.md](product-schema.md)**
5. PLP/PDP **theme** proof on dev store (no Zita-specific theme code until schema frozen in docs). Then commit `theme/` baseline as appropriate. — **PLP Done** (global shell and Homepage also built and committed); **PDP in progress**.
6. Reproducible metafield-definition provisioning — **Done** on the dev store, including Admin order ([metafield-definitions.md](metafield-definitions.md)). **Later deliverables:** **`Zita V2 Artwork Catalog.xlsx`** (or equivalent); dev-store-tested migration/import workflow.

### B — Ranjeeta's merchant store (integration) — future; begins after dev-store PDP, header navigation and cross-page QA (§24, Actual build sequence)

7. Connect same repo to **Ranjeeta's store** (verify **`--store`**); upload **unpublished** Zita V2; **Flora** stays published.
8. Validate shell/PLP/PDP components against **legacy Active** products on unpublished theme.
9. Create matching V2 products as **Draft** only after dev-store theme + schema proof; validate handles, collections, and dimensions with Ranjeeta where legacy data is inconsistent.
10. Revise architecture/schema docs if merchant integration differs from dev-store PoC.

### C — Scale

11. Continue §24 phases C–H; merchant V2 catalog stays **Draft** until launch preparation.

---

## 29. Document status

| Item | Value |
|---|---|
| **Status** | **Authoritative architecture reference** — refine as each page is built |
| **Design baseline** | Design V2 (October 2026) |
| **Visual reference** | `references/claude-design/screenshots/v2/` |
| **Authoritative product facts** | Live Shopify Admin + content inventory — not Claude prototypes |
| **Product schema** | [product-schema.md](product-schema.md) — Phase A data PoC |
| **Metafield definitions** | [metafield-definitions.md](metafield-definitions.md): registry plus `scripts/metafields/` provisioning |
| **Progress / next action** | [project-status.md](../project-status.md) |

Treat this file as the working architecture reference for `theme/`, updating it when page builds or stakeholder decisions change deferred items.
