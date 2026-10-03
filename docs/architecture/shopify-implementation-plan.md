# Zita's Art Studio — Shopify Implementation Plan

**Status:** Approved implementation architecture — validate details during PoC

This document becomes authoritative only after review and commit. It maps approved **Design V2** to Shopify Online Store 2.0 structures on **Shopify Basic**, without prescribing final production schemas or Admin mutations.

**Related documents:**

- [Project brief](../project-brief.md)
- [Zita design brief](../design/zita-design-brief.md)
- [Ranjeeta preferences](../design/ranjeeta-preferences.md)
- [Design V2 acceptance](../design/design-v2-acceptance.md)
- [Content & brand inventory](../research/zita-content-brand-inventory.md)
- [Design V2 screenshots index](../../references/claude-design/screenshots/v2/README.md)

**Core principle:** **Art-first, commerce-enabled.**

**North Star:** Does this feel like Zita's Art Studio? Would a visitor guess this was a standard Shopify theme? Ideally, no.

---

## 1. Executive architecture decisions

| Area | Decision |
|---|---|
| **Production target** | Ranjeeta's **existing** Shopify store — legacy catalog/media, unpublished Zita V2 review theme, eventual V2 **Draft** catalog, and launch. Do **not** create a second client/production store. **Collaborator access.** |
| **Partner dev store** | **Shopify Partner dev store** ( **Basic** plan to match Ranjeeta) — isolated data-model laboratory; **never** transferred or launched. Not populated with unrelated demo data unless later useful. |
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
Zita V2 theme (dev / CLI)
PoC catalog (Moonlit Waves V2, test collection)
Provisional metafields & schema experiments
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
| **Partner dev store** | Moonlit Waves V2 proof; clean test collection; category/custom metafield experiments; sold/available states; **PLP + PDP** data-model proof; Search & Discovery; GraphQL/Admin API learning; resettable/destructive tests **before** touching merchant catalog |
| **Ranjeeta — live** | Production traffic on **Flora**; legacy products remain source of truth for copy/media until V2 cutover |
| **Ranjeeta — dev/review** | Unpublished **Zita V2** theme; validate shell/components against **real** legacy data; create V2 products as **Draft**; do **not** activate V2 products merely to test PLP on the live store (§3) |
| **Launch** | Controlled V2 activation/publication; publish Zita V2; redirects; archive legacy (do not mass-delete immediately) |

### Theme workflow (one codebase, two stores)

1. **Partner dev store** — preferred target for architecture and catalog-behavior experiments (including **Active** PoC products when PLP testing requires it).
2. **Ranjeeta's store** — preferred target for real-content preview, merchant workflows, and pre-launch QA on unpublished Zita V2.

Use explicit Shopify CLI **`--store`** (or equivalent) and **verify the target store** before every push, dev session, or Admin script. **Do not** maintain separate divergent theme codebases per store.

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

**Do not** modify the **legacy** Moonlit Waves product during proof-of-concept work on a **new** V2 product record.

---

## 4. Proof-of-concept first

**Do not** create the full V2 catalog immediately.

**PoC location:** **Partner dev store first** — prove data model, PLP, PDP, and metafields in isolation. **Legacy merchant-store Moonlit Waves remains untouched.**

**PoC scope (dev store):**

- **One** Moonlit Waves **V2** test product (may be **Active** on dev store for PLP/PDP)
- **One** clean V2 test collection

**After dev-store proof:** create the corresponding V2 product on **Ranjeeta's store** as **Draft** only — do **not** activate it for routine development.

**Source product:** **Moonlit Waves** (legacy handle `/products/moonlit-waves` on merchant store — read-only source).

**Confirmed from legacy Shopify Admin inspection (source for copying — not final V2 values until validated):**

- Multiple product media assets, including **context/room imagery**
- Description currently states dimensions **`30 × 48 in`**
- Current price in Admin: **`$1,500`**
- Current legacy product status: **Draft**
- Current collection assignment includes **`BlackWhiteandGrey`**

**Human validation before copying to V2:**

- Older project inventory noted a possible **30×48 vs 36×48** conflict; Admin currently says **30×48** — **confirm with Ranjeeta** before copying dimensions to the V2 product
- Do **not** treat Claude Design V2 prototype price, status, or metadata as authoritative

**PoC workflow:**

1. **Partner dev store:** copy validated content from legacy Admin → V2 test product + collection; exercise **Active** states, PLP, PDP, metafields, sold/available as needed.
2. **Merchant store:** push proven `theme/` to **unpublished** Zita V2; test layout against **legacy Active** catalog; add V2 Moonlit record as **Draft** when ready to mirror content — no activation for PLP proof on live store.

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

### C. Proposed Zita-specific metafields (PROVISIONAL — finalize at Moonlit Waves PoC)

Namespace/key names are **illustrative** until implementation review.

| Intent | Proposed field (provisional) | Notes |
|---|---|---|
| Year | `custom.artwork_year` | If not carried in description |
| Dimensions display | `custom.dimensions_display` or structured width/height | Only if category/native insufficient; Moonlit legacy Admin says 30×48 — confirm with Ranjeeta before V2 copy |
| Extended story | `custom.artwork_story` | Only if product description should stay short for SEO/admin |
| Ready to hang / framing | `custom.framing_notes` | |
| Certificate | `custom.certificate_notes` | |
| Shipping/packing | `custom.shipping_packing_notes` | |
| Scale context | `custom.scale_notes` | |
| Print link | `custom.print_product` (product reference) | When print exists |
| Related artworks | `custom.related_artworks` | Only if collections/recommendations insufficient |
| Exhibitions | `custom.exhibitions` (metaobject list) | If Exhibition metaobject adopted |
| Short label | `custom.short_label` | Only if truly needed |

**Do not** create custom fields for: price, availability, title, primary image, collection membership, medium/material when category metafields suffice.

---

## 7. Sold / available state

**Design:** Sold works remain visible and artistically equal; clear **Sold** label; no purchase ambiguity; no fading or “disabled” styling.

**Architecture:**

- **Do not** split sold vs available into separate product types for appearance alone.
- Prefer deriving state from real Shopify commerce data: inventory/sellability, publication, intentional archival workflow where needed.
- Legacy inventory inconsistencies mean the **exact sold-state rule** is finalized during **Moonlit Waves PoC on the Partner dev store** (include sold-style scenarios there).

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

**Proposed collection metafields (PROVISIONAL):**

- optional short series statement (if description insufficient)
- PLP editorial band: enabled flag, title, copy, image, CTA, placement hint

Exact keys/types **not** finalized. Consider standard collection **description** as the series statement first.

---

## 10. PLP editorial band

Approved behavior (Design V2):

- Optional; scoped to **current collection**
- No content → uninterrupted grid
- Merchant-managed; deliberate placement; text/image/CTA
- May hide during filter/sort if cleaner UX

**Architecture preference:** Collection fields + collection metafields (and/or one referenced structured object if justified later).

**Do not** hard-code series copy in Liquid. **Do not** require a separate collection template per series for text alone — one shared curated template (e.g. `collection.art-series.json`) with conditional editorial block.

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

Avoid duplicating collection ordering in unrelated theme settings unless architecture review shows clear benefit.

> **Why this belongs here:** Merchants reorder navigation in **Menus**; the theme only presents structure accessibly.

---

## 12. Homepage architecture

Map V2 sections to Shopify ownership:

### Hero carousel

- Custom OS 2.0 section (illustrative: `sections/zita-hero-carousel.liquid`)
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

**Shared template (illustrative):** `templates/collection.art-series.json`

One template for artistic series unless behavior genuinely diverges.

Sections/snippets support:

- Collection heading/statement
- Series context/navigation where appropriate
- Product grid (~3 columns desktop baseline; mobile single-column artwork-first)
- Filter & Sort (native / Search & Discovery–compatible APIs)
- Optional editorial interruption (collection-driven)
- Sold state; room-image secondary media on cards
- Aligned rows

Reusable **artwork-card** snippet/block; no third-party filter app unless native filtering proves insufficient.

---

## 14. PDP architecture

Templates:

- `product.original.json`
- `product.print.json`

Original PDP components (sections/snippets):

- Media gallery (native product media)
- Title, series (collection link)
- Price / sold state / purchase / enquiry
- Metadata rows (category + custom metafields)
- Story
- Room/scale imagery from media gallery
- Shipping, certificate, exhibition references
- Related works; print relationship

**Gesso/light neutral ground:** Theme **CSS/presentation only** — **not** per-product data; **no** automatic background selection by product/tags/artwork colors (approved V2 rule).

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
    collection.art-series.json
    product.original.json
    product.print.json
    page.about.json
    ...
```

Names are **illustrative**. Avoid JS frameworks and unnecessary third-party libraries.

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
| Artwork story | Description and/or custom metafield | Layout typography |
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
| **A — Isolated proof** | **Partner dev store** | Create Basic dev store; Skeleton in `theme/`; Moonlit Waves V2 test product; clean V2 collection; provisional metafields; PDP + PLP + sold state; validate architecture |
| **B — Merchant theme foundation** | **Ranjeeta's store** | Same theme repo (`--store` verified); development/unpublished Zita V2; global shell & components against **legacy real data**; **Flora untouched** |
| **C — Commerce templates** | Dev → merchant | Originals + prints PLP/PDP (catalog behavior proven on dev store first) |
| **D — Editorial pages** | Dev → merchant | About, Exhibitions, News, Contact, Commissions, policies |
| **E — Catalog creation** | **Merchant store** | Remaining V2 products/collections as **Draft** until launch prep; media, metadata, relationships, redirect plan |
| **F — Review** | **Merchant store** | Unpublished Zita V2; Ranjeeta + a11y/content QA |
| **G — Cutover** | **Merchant store** | Activate/publish V2 catalog as required; menus; **publish Zita V2 theme**; production verification |
| **H — Post-launch** | **Merchant store** | Archive legacy after confidence period; monitor redirects/indexing; delete only intentionally later |

---

## 25. Development safety rules

Until explicit cutover:

- **Never** edit **Flora** theme code for V2 work
- **Never** publish V2 theme accidentally
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

- Exact Zita metafield namespace/key names and types
- Exhibition metaobject schema and Basic storefront exposure
- Final V2 active series list (~2–3 foregrounded)
- Collection description vs custom field for series statement
- Sold-state rules for all legacy inventory edge cases
- Print fulfillment/process and original↔print linking field
- Mega-menu preview-image behavior beyond collection image
- Newsletter value proposition / copy
- Font loading/licensing details
- Exact redirect map at cutover
- Final theme section filenames
- Shopify Canvas usage, if any
- Pending series descriptions (Colored by Nature, BlackWhiteandGrey, Walking the Trail)
- Merchant-store publication/channel checklist at cutover (not routine dev Active products)

---

## 28. First implementation checkpoint

### A — Partner dev store (isolated proof)

1. Create/use **Basic** Partner dev store; confirm CLI **`--store`** targeting.
2. Initialize `theme/` from **Skeleton** against **dev store**.
3. Create **Moonlit Waves V2** test product + **one clean test collection** from validated **legacy Admin** source (do **not** edit merchant-store legacy product).
4. Define **minimal provisional** metafields; prove PDP, PLP, sold/available on **Active** dev-store catalog if needed.
5. Document proven schema; commit `theme/` to Git.

### B — Ranjeeta's merchant store (integration)

6. Connect same repo to **Ranjeeta's store** (verify **`--store`**); upload **unpublished** Zita V2; **Flora** stays published.
7. Validate shell/PLP/PDP components against **legacy Active** products on unpublished theme.
8. Create matching V2 Moonlit product as **Draft** only after dev-store proof; confirm dimensions with Ranjeeta (Admin currently **30×48**).
9. Revise this document if merchant integration differs from dev-store PoC.

### C — Scale

10. Continue §24 phases C–H; merchant V2 catalog stays **Draft** until launch preparation.

---

## 29. Document status

| Item | Value |
|---|---|
| **Status** | **Approved implementation architecture** — validate details during PoC |
| **Design baseline** | Design V2 (October 2026) |
| **Visual reference** | `references/claude-design/screenshots/v2/` |
| **Authoritative product facts** | Live Shopify Admin + content inventory — not Claude prototypes |
| **Next action** | Commit after human review; begin §28 Phase A on Partner dev store |

After commit, treat this file as the working architecture reference for `theme/`, updating when PoC or stakeholder decisions change deferred items.
