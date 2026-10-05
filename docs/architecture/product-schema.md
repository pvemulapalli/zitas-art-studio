# Zita V2 — Product Schema Registry

**Status:** Phase A Partner dev-store product-data PoC — **PROVEN** for original artworks
**Scope:** Original artwork products only. Print-specific schema is **FUTURE** — not assumed.
**Companions:** [Shopify implementation plan](shopify-implementation-plan.md) · [Metafield definitions](metafield-definitions.md) (version-controlled definition registry and provisioning)

### Label key

| Label | Meaning |
|---|---|
| **PROVEN** | Created and exercised on the Partner dev store during Phase A |
| **PROVISIONAL** | Likely useful; not fully validated across the catalog |
| **FUTURE** | Intentionally deferred |

### Data ownership priority

1. Shopify **native** resource field
2. Shopify **category / taxonomy** metafield
3. Zita-specific **custom** metafield
4. **Metaobject** only when a reusable structured entity justifies it
5. **Theme Editor** settings for presentation / editorial configuration

Do not duplicate concepts in `custom.*` when native or category data already expresses them adequately.

---

## 1. Purpose and status

This document is the **canonical registry** for the V2 product data model proven during **Phase A product-data PoC** on the Partner development store.

**Current fixtures (PROVEN):**

| Fixture | Role |
|---|---|
| **Essence V2** | Available original artwork |
| **Colored by Nature-Blue V2** | Sold original (commerce-derived sold state) |

Both are assigned to the development collection **`V2 PoC — Original Artworks`** (not production taxonomy). Both were **Draft** during data setup and are now **Active** on the Partner dev store, where they back the PLP (and upcoming PDP) theme work.

**Not in scope yet:** print products, exhibition metaobjects, merchant-store V2 catalog migration. Collection editorial-band metafields are defined in [metafield-definitions.md](metafield-definitions.md) §3.

---

## 2. Native Shopify product fields

| Field | Shopify source | Purpose in V2 | PoC usage | Migration / notes |
|---|---|---|---|---|
| **Title** | Product `title` | Public artwork name | **PROVEN** | Do not copy legacy titles without review |
| **Description** | Product `body_html` / description | Legacy/source reference during migration | **PROVEN** (preserved) | **PROVISIONAL** long-term PDP role — see §7 |
| **Price** | Variant `price` | Commerce | **PROVEN** | Never duplicate in custom metafields |
| **Media** | Product `media` | Artwork + room/context imagery | **PROVEN** | No custom room/detail image metafields |
| **Product category** | Shopify standard product category | Taxonomy + category metafields | **PROVEN** | See §3 |
| **Inventory tracking** | Product / variant inventory | Sold vs available | **PROVEN** | Required for one-of-one originals PoC |
| **Available / on hand** | Inventory levels | Derive purchasability | **PROVEN** | See §6 |
| **Continue selling when out of stock** | Inventory policy | Must be **off** for sold-state PoC | **PROVEN** | Both fixtures: **off** |
| **Product status** | `ACTIVE` / `DRAFT` / etc. | Publication | **PROVEN** | Fixtures were **Draft** during data setup; now **Active** on the dev store |
| **Collections** | Collection membership | Series / grouping | **PROVEN** | Production: real artistic series only; PoC collection is dev-only |
| **Variants** | Product variants | Size/color options for prints; originals usually single SKU | **PROVEN** | No meaningful variants on PoC originals |
| **Vendor** | `vendor` | Operational only if meaningful | PoC populated | Do not blindly copy legacy `ZitasArt` |
| **Product type** | `product_type` | Legacy inconsistency | PoC optional | Do not copy legacy `None` / `Painting` hacks without review |
| **SEO / handle** | SEO fields, `handle` | URLs, discoverability | **PROVISIONAL** | Do not copy misaligned legacy handles (e.g. Essence → `tangled-copy`) |

**Decisions (PROVEN):**

- Native **media** is the primary source for artwork and contextual imagery.
- **No** custom metafields for room image, detail image, or separate media roles at this stage.
- **Description** is temporarily preserved as migration source/reference.
- **`custom.artwork_story`** is the dedicated V2 narrative field for the artwork-story experience.
- **Vendor**, **product type**, **SEO handle**, shipping/package fields must not be copied from legacy merely because values exist.
- Final **collections** represent real artistic bodies of work — not `V2 PoC — Original Artworks`.

---

## 3. Shopify category metafields

### PoC product category

**Paintings in Posters, Prints, & Visual Artwork** (Shopify standard product category)

Category metafields should be **preferred** over duplicate `custom.*` fields when taxonomy expresses the concept.

**Not every category field is required** on every product. **Essence V2** exercises a fuller category-metafield set. **Colored by Nature-Blue V2** carries **legacy-derived** category metadata **copied from the merchant source** during fixture setup — useful migration input, **subject to merchant review** (some merchant values may themselves have originated from past **Shopify-suggested** fills). **Shopify suggestions were not automatically accepted** when building the V2 fixture.

### Concepts exercised in PoC

| Concept | Example use |
|---|---|
| Color | e.g. Green (Essence) |
| Material | Acrylic, Canvas |
| Painting canvas material | e.g. Cotton |
| Artwork authenticity | Original |
| Frame style | Unframed, Gallery wrapped |
| Orientation | Vertical / etc. |
| Painting medium | Acrylic |
| Rarity | e.g. Rare |
| Signature presence | Signed |
| Theme | e.g. Nature |
| Art movement | (when populated) |
| Art style | (when populated) |
| Artwork frame material | (when populated) |
| Printing method | (when populated) |

### Migration provenance (PROVEN lesson)

Existing merchant-store structured data is a **migration source**, not unquestioned truth. Some values may have originated from **Shopify-suggested** taxonomy fills and may be wrong.

| Class | Rule |
|---|---|
| **Merchant-confirmed** | May be treated as authoritative |
| **Legacy-derived** | Review during V2 migration |
| **Shopify-suggested** | Never silently accept; merchant review required |

Orientation and similar attributes illustrate why review matters — values may differ between fixtures and legacy records.

---

## 4. Zita custom product metafields — PROVEN

Definitions were created **without category scoping** during PoC. **Storefront API access** was enabled on these definitions during PoC setup. That does **not** mean Storefront API access is **required** for the V2 **Liquid** theme (Online Store 2.0). Architecture remains **theme-first**; no headless dependency is introduced.

**Do not** create duplicate custom fields for medium, orientation, authenticity/original, frame style, or signature presence — represented via **category metafields** where used.

These five definitions are also recorded in `scripts/metafields/definitions.json` for reproducible provisioning. Theme consumers and provisioning rules: [metafield-definitions.md](metafield-definitions.md) §2.

| Display name | Namespace.key | Shopify type | Cardinality | Required? | Purpose | Example | Proven on | Storefront / notes |
|---|---|---|---|---|---|---|---|---|
| Artwork width | `custom.artwork_width` | Measurement (dimension) | One | No | Structured width for display/metadata | Essence: **20 in**; Colored by Nature-Blue: **12 in** | Both fixtures | Prefer over parsing description |
| Artwork height | `custom.artwork_height` | Measurement (dimension) | One | No | Structured height | Essence: **40 in**; Colored by Nature-Blue: **16 in** | Both fixtures | Pair with width for dimensions display |
| Certificate notes | `custom.certificate_notes` | Single line text | One | No | Certificate / authenticity copy | `Certificate of authenticity included` | Both fixtures | |
| Ready to hang | `custom.ready_to_hang` | True or false | One | No | Display / purchase context | `true` | Both fixtures | |
| Artwork story | `custom.artwork_story` | Rich text | One | No | Artist narrative for V2 PDP story module | Populated on both fixtures | Both fixtures | Not technical spec sheet |

### PROVISIONAL / FUTURE custom fields (not proven)

The implementation plan may still list **PROVISIONAL** candidates (year, shipping notes, print link, exhibitions, etc.). They are **not** part of the Phase A proven set until explicitly added and tested. See [§10 Future schema questions](#10-future-schema-questions).

---

## 5. Product fixture matrix

| Attribute | Essence V2 | Colored by Nature-Blue V2 |
|---|---|---|
| Role | Available original | Sold original |
| Status during data setup | **Draft** | **Draft** |
| Current status (dev store) | **Active** | **Active** |
| Price | **$1,500** | **$475** |
| Inventory tracked | Yes | Yes |
| Available / on hand | **1** / **1** | **0** / **0** |
| Continue selling when out of stock | **Off** | **Off** |
| Meaningful variants | No | No |
| Dimensions (custom) | **20 × 40 in** | **12 × 16 in** |
| Certificate notes | Populated | `Certificate of authenticity included` |
| Ready to hang | **true** | **true** |
| Artwork story | Populated | Populated |
| Category metadata | Multiple category metafields populated (Essence V2) | **Legacy-derived** category metafields copied from merchant source — migration input; **merchant review** required; no auto-accepted Shopify suggestions at V2 setup |
| Native media | Artwork + room/context imagery | Native product media copied |
| Collection | **V2 PoC — Original Artworks** | **V2 PoC — Original Artworks** |

---

## 6. Sold-state commerce rule — PROVEN

Derive **sold** state from Shopify commerce truth where possible. **No `custom.sold` metafield.**

### One-of-one original (PoC rules)

**Available original** (Essence V2):

- Inventory tracked
- Quantity **> 0**
- Continue selling when out of stock = **false**
- Purchase action **available**

**Sold original** (Colored by Nature-Blue V2):

- Inventory tracked
- Quantity **= 0**
- Continue selling when out of stock = **false**
- Purchase action **unavailable**
- Artwork remains **visible** and **artistically equal** in presentation (no fade/disable styling)

**FUTURE:** Other catalog edge cases (legacy inconsistencies, archival workflows) may need additional rules — not defined here.

---

## 7. Artwork-story vs product-description rule

| Source | Role (Phase A) |
|---|---|
| **Product description** | Preserved as legacy / migration **source and reference** |
| **`custom.artwork_story`** | Dedicated narrative for the V2 **artwork-story** experience |
| **Native + category + proven custom fields** | Technical and structured facts — **do not** parse prose at render time |

**FUTURE:** Final long-term split between SEO/admin description and storefront story after PDP theme proof.

---

## 8. Migration and workbook strategy

Operational model. **A** is implemented; **B** is FUTURE.

### A. Version-controlled schema provisioning

**Implemented.** Current provisioning state per store is recorded only in [metafield-definitions.md](metafield-definitions.md) (Status).
- `scripts/metafields/provision.mjs` reads `scripts/metafields/definitions.json` and verifies each definition against a store via Admin GraphQL (through Shopify CLI).
- It creates only missing definitions, and pins or unpins them so the Admin field order matches the schema's array order.
- It never updates, deletes or recreates a definition, never writes values, and stops on conflicts.
- Workflow and rules: [metafield-definitions.md](metafield-definitions.md) §6–§8.

### B. Merchant-friendly catalog workbook

Tentative artifact: **`Zita V2 Artwork Catalog.xlsx`** — human-readable column names for Ranjeeta (not raw namespaces unless needed).

**PROVISIONAL** column concepts (not frozen): artwork title, artwork story, price, width, height, unit, collection/series, taxonomy attributes, certificate notes, ready to hang, image references, SEO fields, legacy URL, review status/notes.

### Intended workflow

```text
merchant workbook → review/validation → transform → Shopify import/API
  → test in Partner dev store → merchant-store migration
```

---

## 9. Migration quality rules

- Do not blindly copy legacy catalog structure.
- Do not copy collection **prefix hacks** (`1-`, `A -`, etc.).
- Do not treat Shopify-suggested taxonomy as automatically authoritative.
- Do not invent missing artwork facts.
- Normalize **authoritative** facts into structured fields.
- Theme must **gracefully omit** missing optional metadata.
- Artwork **media** lives in Shopify, not Git.
- Never commit credentials or storefront passwords.
- Run destructive or resettable migration experiments on the **Partner dev store** first.

---

## 10. Future schema questions

**FUTURE** — do not resolve prematurely:

- Final role of **Product description** vs `custom.artwork_story`
- Whether **media roles** need metafields after real PDP implementation
- **Print-specific** schema and templates
- **Shipping / packing** structured data
- **Scale / presentation** notes
- Whether **certificate notes** stay single-line text or evolve
- **Category scoping** of custom metafield definitions
- Final **required/optional** rules for Ranjeeta's workbook
- Remaining **PROVISIONAL** custom fields from the implementation plan (year, framing notes, print link, exhibitions, etc.)
