# Product cleanup / import spreadsheet specification (planning)

**Status:** Specification only — **do not import or modify** production or dev catalog during audit/recovery.

**Audience:** Ranjeeta (data entry) and future migration tooling.

**Purpose:** One row per sellable SKU (variant), with columns for V2 theme and launch readiness.

---

## Spreadsheet structure

### Identity and Shopify core

| Column | Source | Required for launch | Notes |
|---|---|---|---|
| `product_handle` | Shopify handle | Yes | Preserve production URLs where possible |
| `product_title` | Title | Yes | |
| `variant_sku` | Variant SKU | If used | |
| `variant_id` (production) | Admin | Reference only | Do not change in Phase D |
| `status` | ACTIVE / DRAFT | Yes | Keep drafts until reviewed |
| `template_suffix` | Theme template | Yes | Originals → `original` |

### Variants (launch-critical)

| Column | Source | Required | Notes |
|---|---|---|---|
| `option1_name` … `option3_name` | Product options | If multi-SKU | e.g. Diptych |
| `option1_value` … | Variant option values | If multi-SKU | |
| `variant_price` | Variant price | Yes | USD |
| `variant_compare_at_price` | Optional | No | |
| `inventory_tracked` | Variant inventory | Yes for originals | Should be **true** for one-of-one |
| `inventory_quantity` | On hand | Yes | Typically **1** per original |
| `inventory_policy` | deny / continue | Yes | **deny** when out of stock for originals |
| `variant_featured_media` | Media alt / filename | If per-variant images | PDP gallery sync |

### Artwork facts (V2 display)

| Column | Maps to | PDP row | Notes |
|---|---|---|---|
| `medium` | Category `painting-medium` (or agreed taxonomy) | Medium | Comma-join if multiple |
| `surface` | Category e.g. canvas / material fields | Surface | **Not yet rendered in theme** — plan column for migration |
| `width` + `width_unit` | `custom.artwork_width` | Size | Both required for display |
| `height` + `height_unit` | `custom.artwork_height` | Size | |
| `year` | *Not in proven schema* | **Hidden per owner** | Column optional for internal archive; do not show on V2 PDP |
| `framing_notes` | Category frame / legacy description | **Hidden per owner** | Do not duplicate in certificate |
| `ready_to_hang` | `custom.ready_to_hang` boolean | Was “Hanging” | Owner asked to hide framing-like attrs — confirm whether this row stays off PDP |
| `certificate_notes` | `custom.certificate_notes` | Certificate | Keep concise; avoid repeating body copy |
| `artwork_story` | `custom.artwork_story` rich text | Story band | Primary narrative |
| `product_description` | Native description | Near buy box (planned) | Short customer-facing blurb; long text can stay in story |

### Merchandising

| Column | Source | Notes |
|---|---|---|
| `collections` | Collection handles (comma-separated) | Real series only on production |
| `tags` | Tags | Search/filter on dev |
| `product_category` | Standard category | Drives category metafields |

### SEO

| Column | Source | Notes |
|---|---|---|
| `seo_title` | SEO title | |
| `seo_description` | Meta description | |
| `image_alt_primary` | First media alt | Accessibility |

### Relationships and safeguards

| Column | Purpose |
|---|---|
| `paired_variant_handles` | e.g. diptych single vs pair — document which SKUs must not double-sell the same physical panels |
| `print_of_handle` | Future prints — defer |
| `migration_notes` | Free text for Ranjeeta |

---

## Export starting point (read-only, when approved)

1. Export products from **production** Admin (CSV) for inventory of truth.
2. Cross-reference **dev PoC** products separately — do not merge stores in one import file.
3. Fill custom metafields in Admin or via approved import tool in **Phase B** only.

---

## Owner decisions needed (product data)

- Confirm **Surface** taxonomy source (which Shopify category field).
- Confirm **ready_to_hang** and **certificate** visibility after COA de-duplication pass.
- Diptych / multi-panel inventory rules (manual vs automated).
- Which products need **two variant options** at launch vs single SKU.

---

*Companion: [product-schema.md](product-schema.md), [metafield-definitions.md](metafield-definitions.md)*
