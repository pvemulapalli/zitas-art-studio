# Zita's Art Studio — Design V2 Acceptance

**Status:** Approved for Shopify implementation  
**Date:** October 2026

## 1. Purpose

This document closes the **visual-design discovery phase** and records what implementation should treat as the authoritative design reference.

Use it alongside:

- `docs/design/zita-design-brief.md` — prescriptive experience direction
- `docs/design/ranjeeta-preferences.md` — stakeholder preferences and October 2026 explicit decisions (**§20**)

## 2. Approval Status

- **Claude Design V2** is the approved visual direction.
- **V1** is retained as design history only.
- Where V1 and V2 conflict, **V2 wins**.
- October 2026 client decisions in `ranjeeta-preferences.md` are authoritative for Ranjeeta's explicit choices.

Ranjeeta does **not** want another broad static design exploration before Shopify work. Refinements happen in an **unpublished/development Shopify theme**.

## 3. Approved Visual System

| Element | Direction |
|---|---|
| Primary emotion | **Inspired** |
| Palette | Nature-derived / artwork-derived; teal family; editorial tones (Vaayu Mist, Stone Mist, Sand, Deep Teal / Ink / Night) |
| Artwork ground | **Gesso / light neutral** default for product artwork |
| Background logic | **No** automatic per-product/artwork background selection |
| Typography | **Marcellus** (display) + **Mulish** (body/UI) |
| Wordmark | **`ZITA'S \| ART STUDIO`** — tracked capitals, top-left |
| Presentation | Artwork-first; restrained use of dark tones on **editorial** passages, not product mats |

## 4. Approved Global Experience

- Top-left approved wordmark; calm header; artwork-focused navigation
- Approved V2 **Originals collection dropdown / mega-menu** (desktop): spacious, artwork-first; direct access to ~**2–3 active series** plus All originals, earlier series & sold work, commission entry, and optional collection/artwork preview
- **Mobile menu:** same core hierarchy, touch-friendly
- Approximately **2–3 active series** foregrounded; Walking the Trail active; no numeric prefixes in public collection titles; do not hard-code collection names in theme code
- Footer/newsletter direction from V2 global shell
- Mobile is first-class: simplified stacks, touch equivalents for hover, no staggered artwork grids

## 5. Homepage

- **Full-width rotating artwork carousel** opens the page (concept reference: full-width rotation only — e.g. plandingfineart.com — do not copy branding)
- Merchant-editable slides; **live HTML** overlay text (not baked into images)
- Optional mobile-specific slide imagery; prev/next, indicators, swipe, pausable autoplay, reduced-motion
- **Current Series:** simple aligned grid for 2–3 collections (same structure per series)
- **Selected Works:** aligned artwork/product rows
- Additional editorial/story sections remain allowed per V2

## 6. PLP

- Artwork-first; ~**3 columns** desktop; full width
- **Filter & Sort** on demand — no permanent desktop filter sidebar
- Sold work **visible**; room/context imagery where available
- **Aligned** artwork rows — no vertical stagger
- **Optional** per-collection editorial interruption band (collection-owned content; absent = normal grid)
- Collection-managed editorial intent; **Shopify data model deferred to architecture**

## 7. PDP

- **Gesso / light neutral** artwork presentation
- Gallery/detail experience: large artwork, story, clear price/sold state, commerce obvious
- Sold works keep story and imagery; clearly marked **Sold**
- Related work; room/scale imagery where available
- Original ↔ print links where appropriate in production data
- **Prototype placeholder** prices, years, framing, certificates, print links, shipping, and scale imagery are **not** authoritative — use Shopify product data

## 8. Merchant Editability Requirements

Ranjeeta should eventually control without editing theme code:

- homepage hero carousel (slides, text, CTAs, images)
- which **2–3 collections** appear as Current Series
- **navigation menus** — links, labels, nesting, and order via **Shopify native menus**; custom theme controls visual presentation (mega-menu / mobile)
- optional **collection editorial** band on PLPs
- standard products, collections, blogs/articles

**Deferred to architecture:** collection/artwork preview imagery inside the mega-menu; avoid duplicating collection ordering across unrelated theme settings unless architecture review justifies it.

The **exact Shopify section schema, metafields, and metaobjects** are deliberately **deferred to the architecture phase**. This document does not define them.

## 9. Implementation Reference Assets

Screenshot folders in the repository:

- `references/claude-design/screenshots/v1/` — historical context
- `references/claude-design/screenshots/v2/` — **primary implementation reference**

V2 includes foundations, global shell, homepage (desktop/mobile), hero carousel, PLP, and PDP (in-stock/out-of-stock) captures.

Claude export ZIPs, if present locally, are ignored artifacts — **not** production source.

## 10. Known Prototype Placeholders / Deferred Items

- Real **Walking the Trail** (and other) imagery where V2 still uses placeholders
- All **exact product data** from live Shopify (not prototype copy)
- Final **collection metafield/metaobject** architecture for editorial bands
- Exact **carousel** section schema and Theme Editor settings
- **Print** relationships and production/fulfillment details
- **Shipping**, certificate, framing/finish data
- Production **scale/room** imagery gaps
- **Newsletter** promise/copy where still unresolved
- Pending **series descriptions** (Colored by Nature, BlackWhiteandGrey, Walking the Trail)
- Contact **response-time** promise (if any)

## 11. Design Phase Closure

The design phase is **sufficiently approved** to begin **Shopify architecture** and **development-theme** implementation.

Future visual changes should be reviewed in the **unpublished development theme**, not by restarting broad static design exploration or using the live production theme as the primary design lab.

## 12. North Star

**Art-first, commerce-enabled.**

**Does this feel like Zita's Art Studio?**

**Would a visitor ever guess this was based on a standard Shopify theme?** Ideally, no.
