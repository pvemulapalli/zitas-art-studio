# Zita V2 — Metafield Definitions

**Status:**
- All 12 definitions are provisioned on the Partner dev store; the final `verify` showed 12 exists-compatible, 0 missing, 0 conflict.
- Admin display-order reconciliation is implemented but **not yet run** against any store.
- Nothing has been provisioned on Ranjeeta's store.

**Machine source:** [`scripts/metafields/definitions.json`](../../scripts/metafields/definitions.json)
**Tooling:** [`scripts/metafields/provision.mjs`](../../scripts/metafields/provision.mjs) (Node 22, no dependencies)
**Companions:** [Product schema registry](product-schema.md) · [Shopify implementation plan](shopify-implementation-plan.md)

This document is the human-readable registry for every Zita-specific metafield **definition** the V2 theme relies on. `definitions.json` is the machine-readable copy that the script checks and provisions. Change both together.

Definitions and values are separate concerns. This tooling creates **definitions** and arranges their **Admin display order**. It never writes values. Values (artwork dimensions, editorial copy, images) are entered in the Shopify admin or migrated in a separate step.

---

## 1. Conventions

- **Namespace:** `custom`. This namespace is merchant-owned: Ranjeeta can edit both definitions and values in the admin, and the definitions are not tied to an app.
- **Owner types:** `PRODUCT` and `COLLECTION`.
- **Storefront API access:** `PUBLIC_READ`. This matches the Phase A product definitions. Liquid does not need it; Liquid can read every `custom` metafield regardless.
- **Pinned, in a fixed order.** Pinned definitions show on the product or collection edit page without opening "View all". Their order is version controlled (§7).
- **Category scoping:** none. Definitions apply to every product or collection, as in Phase A.
- **"Required"** in the tables below describes theme behaviour. Shopify metafield definitions do not have a required flag, so an empty value is always allowed.

---

## 2. Product definitions

Rows are in Admin display order, top to bottom.

| Namespace.key | Shopify type | Validation | Required? | Purpose | Theme consumer | Notes |
|---|---|---|---|---|---|---|
| `custom.artwork_width` | `dimension` | none | Optional; needs height | Width of the artwork itself | `snippets/artwork-dimensions.liquid`, rendered by `artwork-card` and `zita-hero-carousel` | Prints "12 × 16 in". Renders nothing unless width and height are both set. The snippet abbreviates inches, centimeters, millimeters and feet; other units print as Shopify names them. |
| `custom.artwork_height` | `dimension` | none | Optional; needs width | Height of the artwork itself | Same as width | Same as width |
| `custom.ready_to_hang` | `boolean` | none | Optional | Ready-to-hang fact | None yet (PDP) | |
| `custom.certificate_notes` | `single_line_text_field` | none | Optional | Certificate of authenticity note | None yet (PDP) | Phase A open question: may evolve beyond single-line text |
| `custom.artwork_story` | `rich_text_field` | none | Optional | Artist narrative for the PDP story module | None yet (PDP) | The product description stays a migration reference. See [product-schema §7](product-schema.md#7-artwork-story-vs-product-description-rule). |

All five were **proven** on the Partner dev store in Phase A ([product-schema §4](product-schema.md#4-zita-custom-product-metafields--proven)). They were created by hand in the admin, so `verify` reports them as EXISTS-COMPATIBLE with notes about description wording.

---

## 3. Collection definitions (PLP editorial band)

Rows are in Admin display order, top to bottom.

All seven are read by `snippets/collection-editorial.liquid`. `sections/zita-collection-gallery.liquid` decides whether the band shows and where it goes.

The band shows only when **all** of these are true:
- `editorial_text` has text;
- the visitor is on page 1;
- no filters are active;
- the collection is in its default sort;
- the page has products.

| Namespace.key | Shopify type | Validation | Required? | Purpose | Theme behaviour |
|---|---|---|---|---|---|
| `custom.editorial_eyebrow` | `single_line_text_field` | none | Optional | Small label above the statement | Omitted when empty |
| `custom.editorial_text` | `multi_line_text_field` | none | **Required for the band** | The band statement | Presence trigger. When empty, nothing renders. Line breaks are kept. |
| `custom.editorial_image` | `file_reference` | `file_type_options: ["Image"]` | Optional | Image beside the statement | Without it the band is text only. There is no fallback to a product image. The snippet renders the file's preview image, which also covers a non-image file from a store without the validation. |
| `custom.editorial_link_label` | `single_line_text_field` | none | Optional | Link text | The link renders only when both label and link are set |
| `custom.editorial_link` | `single_line_text_field` | none | Optional | Link destination | Rendered as the `href` as stored. Use a storefront path (`/pages/about`, `/collections/originals`, `/products/example`) for internal links, or a full URL for external ones. Never store an absolute dev-store or production domain for an internal link. |
| `custom.editorial_product` | `product_reference` | none | Optional | Artwork the image links to | Used only when `editorial_image` is set. It never supplies the image. |
| `custom.editorial_position` | `single_line_text_field` | `choices: ["after_row_1", "after_row_2", "end"]` | Optional | Where the band sits in the curated sequence | See below |

### `editorial_position` values

| Value | Placement (the same at every column count) | Small-collection fallback |
|---|---|---|
| `after_row_1` | After the 3rd product | Fewer than 3 products on the page: end |
| `after_row_2` | After the 6th product | Fewer than 6: end |
| `end` | After the last product | — |
| *(empty)* | Same as `after_row_1` | Same as `after_row_1` |

### Editorial image presentation (owner safety)

The theme, not the merchant, constrains how the editorial image is shown. Ranjeeta can choose any normal high-resolution studio, process or context image without breaking the page, and there are no width or height settings to manage.

- **Size comes from the theme, not the upload.** The image is shown whole and never cropped (no `object-fit: cover`), at its own proportion.
  - It is capped at `max-width: min(100%, 520px)` and `max-height: min(64vh, 520px)` (`.collection-editorial__image` in `assets/zita-collection.css`).
  - A square image fills the 520px slot; landscape images are limited by width.
  - The upload's pixel size never affects the layout; Shopify itself limits uploads to 25 megapixels and 20 MB.
- **Unusually tall images are capped, not cropped.** A very tall image becomes a narrower, centred image within the same 520px height cap. The band is therefore never taller than it is with a square image: about 635–665px on desktop, depending on padding.
- **Image requests are sized to the slot.**
  - `responsive-image` offers Shopify CDN variants at 360, 520, 720 and 1040px, and the CDN serves WebP or AVIF where supported. The original upload is never requested.
  - For portrait images, `collection-editorial.liquid` advertises a slot of `520 × aspect ratio` px instead of 520px, because the height cap keeps them narrower. A tall image therefore requests a proportionally smaller variant. Square and landscape images keep `(min-width: 1100px) 520px, 50vw`.
  - Below 750px the image column is hidden, and the lazy-loaded image is not downloaded.

### Admin descriptions on existing stores

The merchant-facing descriptions in `definitions.json` were rewritten in October 2026. Descriptions only affect admin help text, never storefront behaviour.

- `apply` sends them only when it **creates** a definition, so they take effect on any store where the definitions do not exist yet.
- The Partner dev store's seven collection definitions were created with the earlier wording. `verify` reports them as EXISTS-COMPATIBLE with the note "admin description differs from the schema".
- The script has no update mutation, so it will not rewrite descriptions on existing definitions. To align them, edit each description by hand in **Settings → Custom data → Collections**.
- Adding an update path would need a separately approved, non-destructive `metafieldDefinitionUpdate` mode.

---

## 4. Deliberately not defined

The `excluded` list in `definitions.json` makes `check` fail if any of these are ever added:

| Key | Reason |
|---|---|
| `custom.sold` (product) | Sold state comes from inventory and availability ([product-schema §6](product-schema.md#6-sold-state-commerce-rule--proven)) |
| `custom.editorial_enabled` (collection) | `editorial_text` already acts as the on/off switch |
| `custom.editorial_variant` (collection) | Only one approved band treatment exists. The snippet's `variant` parameter is ready for one later. |

Category/taxonomy concepts (medium, orientation, authenticity, frame style, signature, colour, theme) stay in Shopify **category metafields** and must not be duplicated in `custom` ([product-schema §3](product-schema.md#3-shopify-category-metafields)).

---

## 5. Native validation decisions

**`editorial_position`: native choices are supported, so they are used.**
- Shopify's `choices` validation applies to `single_line_text_field` (up to 128 options). The Admin GraphQL form is `{ name: "choices", value: "[\"after_row_1\",\"after_row_2\",\"end\"]" }`.
- The admin then shows a dropdown with exactly those values.
- The Liquid stays defensive: an empty or unknown value behaves as `after_row_1`. This covers stores where the definition was created without choices.

**`editorial_image`: native image-only validation is supported, so it is used.**
- Shopify's `file_type_options` validation applies to `file_reference`, with valid values `Image` and `Video`.
- `["Image"]` limits the admin picker to images.
- The snippet still resolves `preview_image`, so a store whose definition allows other file types degrades gracefully.

**`editorial_link`: single-line text, not Shopify's `url` type.**
- The `url` type only accepts `https`, `http`, `mailto`, `sms` and `tel` addresses, so it rejects storefront paths like `/pages/about`.
- Internal links must stay relative so editorial content never embeds a dev-store or production domain.
- No validation is set; `snippets/label-link.liquid` outputs the stored string as the `href`.

Sources:
- [List of validation options](https://shopify.dev/docs/apps/build/metafields/list-of-validation-options)
- [List of data types](https://shopify.dev/docs/apps/build/metafields/list-of-data-types)

---

## 6. Provisioning tooling

### Files

| File | Role |
|---|---|
| `scripts/metafields/definitions.json` | Expected definitions, grouped by owner type in Admin display order, plus the `excluded` list |
| `scripts/metafields/provision.mjs` | `check` / `verify` / `apply` script. Node built-ins only. |

### Modes

| Mode | Store access | What it does |
|---|---|---|
| `check` | None | Validates `definitions.json` offline: types, validation names per type, key format, duplicates, excluded keys and the pinned limit. Lists every definition as **EXPECTED**, in Admin order. |
| `verify` | Read-only | One query reads every expected definition plus every pinned definition for each owner type. It reports each definition as **MISSING**, **EXISTS-COMPATIBLE** or **CONFLICT**, then reports each owner type's **Admin display order** as matching or differing (§7). Exits 1 only on a conflict. Never mutates. |
| `apply` | Creates and re-pins | Runs `verify` first and stops before any mutation if there is a conflict or an ambiguous order. It then creates MISSING definitions, re-reads the store, re-pins Zita definitions until each owner type's order matches, and re-verifies. Every mutation is a separate request, and apply stops at the first error. Requires `--confirm-store` to repeat `--store` exactly. |

The script contains exactly three mutations: `metafieldDefinitionCreate`, `metafieldDefinitionUnpin` and `metafieldDefinitionPin`. There is no code path that updates, deletes or recreates a definition, or that writes a metafield value.

### API

- **Admin GraphQL API version `2026-10`**, pinned in `definitions.json`. It was the latest stable version when this was written; update it deliberately.
- **Read:** the `metafieldDefinitions` query, in two forms within one request:
  - `metafieldDefinitions(ownerType:, namespace:, key:)`, one alias per definition. It reads type, validations, storefront access, pinned position, constraints, standard template and the value count.
  - `metafieldDefinitions(ownerType:, pinnedStatus: PINNED, first: 250)`, one alias per owner type. It reads `namespace`, `key` and `pinnedPosition` of every pinned definition, ours and others'.
- **Create:** `metafieldDefinitionCreate(definition: MetafieldDefinitionInput!)`. It sends `name`, `namespace`, `key`, `description`, `type`, `ownerType`, `pin`, `access.storefront` and `validations`. `access.admin` is not sent because merchant-owned namespaces do not use it.
- **Order:** `metafieldDefinitionUnpin(identifier:)` and `metafieldDefinitionPin(identifier:)`, using `MetafieldDefinitionIdentifierInput { ownerType, namespace, key }`. Shopify's docs prefer `identifier` over `definitionId`.

### Authentication

The script runs operations through **Shopify CLI** `shopify store execute`. It holds no credentials of its own.

- `shopify store auth --store <shop> --scopes <scopes>` opens a browser login. The resulting online access token is stored in the Shopify CLI's local config, outside this repository.
- No custom app, Admin API token or `.env` file is needed. Nothing secret can end up in Git.
- Scopes:
  - `read_products` is enough for `verify`. It covers product and collection definitions.
  - `write_products` is needed for `apply`: create, pin and unpin all require it.
- For a production dry run, authenticate with **`read_products` only**. A read-only token cannot create or re-pin definitions even if `apply` were run by mistake.
- Online tokens expire. If a read fails, the script prints the `shopify store auth` command to run.

### Safety layers

1. `--store` is required, with no default. It must be a `<shop>.myshopify.com` domain.
2. `apply` also requires `--confirm-store` with the same domain.
3. Every call passes `--store` explicitly. Inherited `SHOPIFY_FLAG_*` environment variables are removed before the CLI runs, so a stray `SHOPIFY_FLAG_STORE` or `SHOPIFY_FLAG_ALLOW_MUTATIONS` cannot redirect or unlock a call.
4. Only the create, pin and unpin mutations pass `--allow-mutations`. Without it, the CLI refuses mutations.
5. Shopify CLI auth is per store and needs a login on that store.

### Idempotency and conflict rules

The script compares each definition by owner type + namespace + key, which is unique in Shopify. It creates the definition only when none exists, so re-running `apply` after success changes nothing.

| Difference found in the store | Result |
|---|---|
| Different `type` | **CONFLICT**. Shopify cannot change a definition's type. |
| A list validation (`choices`, `file_type_options`, `allowed_domains`) that rejects a value the schema allows | **CONFLICT** |
| A validation that the schema does not expect, e.g. a max length | **CONFLICT**. It could reject content the theme expects. |
| Same validation name, different scalar value | **CONFLICT** |
| A validation the schema expects is absent, or a list allows extra values | Compatible, with a note (the store is looser) |
| Name or description wording | Compatible, with a note |
| Storefront access | Compatible, with a note |
| Pinned or unpinned, or in the wrong position | Not a definition difference. Reported under Admin display order (§7). |
| Category constraints, or a Shopify standard template | Compatible, with a note to review |

To accept a variance a conflict reports, either change the store definition by hand in the admin, or record the store's rule in `definitions.json` (and in this document) so it becomes the expected schema. The script never resolves it automatically.

---

## 7. Admin display order

### Why it is version controlled

Ranjeeta edits these fields on every artwork and every series. The order should follow how she thinks about the work, not the order the definitions happened to be created or pinned in. Keeping the order in the schema makes it:
- reviewable in Git;
- identical on the dev store and her store;
- restorable after someone rearranges it by hand.

### Desired order

| Position | PRODUCT | COLLECTION |
|---|---|---|
| 1 | `custom.artwork_width` | `custom.editorial_eyebrow` |
| 2 | `custom.artwork_height` | `custom.editorial_text` |
| 3 | `custom.ready_to_hang` | `custom.editorial_image` |
| 4 | `custom.certificate_notes` | `custom.editorial_link_label` |
| 5 | `custom.artwork_story` | `custom.editorial_link` |
| 6 | | `custom.editorial_product` |
| 7 | | `custom.editorial_position` |

- **Product intent:** core artwork facts, then installation and presentation, then documentation, then narrative.
- **Collection intent:** content, then media, then the optional link, then placement.

### How the schema represents it

The **order of each owner type's array** in `definitions.json` is its Admin display order, top to bottom. There is no separate position field, so there is only one source of truth. To reorder the admin, move entries in the array and run `apply`.

Only definitions with `pin: true` take part. A definition with `pin: false` would be left out of the managed order and never unpinned.

### How Shopify orders pinned definitions (2026-10)

- Only pinned definitions appear on the edit page by default; the rest are under "View all".
- `pinnedPosition` is **read-only**. No mutation accepts a position, and there is no reorder mutation. The only order controls are `metafieldDefinitionPin` and `metafieldDefinitionUnpin`.
- **Pinning puts a definition at the top of the list.** The Help Center says a pinned definition "displays at the start of the list". It gets the highest `pinnedPosition` for its owner type, and the admin shows the highest position first.
- **Unpinning** sets `pinnedPosition` to `null`. The definitions that were above it shift down by one, and their relative order is unchanged.
- **Limit:** up to 50 pinned definitions per owner type (Help Center). Pinning beyond that fails with `PINNED_LIMIT_REACHED`.
- **Error codes:**
  - Pin: `ALREADY_PINNED`, `NOT_FOUND`, `PINNED_LIMIT_REACHED`, `UNSUPPORTED_PINNING`, `DISALLOWED_OWNER_TYPE`, `INTERNAL_ERROR`.
  - Unpin: `NOT_PINNED`, `APP_CONFIG_MANAGED`, `NOT_FOUND`, `DISALLOWED_OWNER_TYPE`, `INTERNAL_ERROR`.

Shopify's reference pages do not state outright that the admin shows the highest `pinnedPosition` first. That conclusion comes from the Help Center statement above and a published Shopify API emulator that models pin and unpin the same way. The script keeps this rule in one place (`adminDisplay` in `provision.mjs`).

**Before the first `apply` on any store,** compare the CURRENT list that `verify` prints with the product and collection edit pages in the admin. If they disagree, the direction is wrong: stop and fix `adminDisplay` before applying.

### How `verify` detects drift

For each owner type, `verify`:
1. reads every pinned definition, including those outside the schema;
2. sorts them by `pinnedPosition`, highest first, to get the admin list;
3. filters that list to the Zita definitions.

The order **matches** when every expected definition is pinned and the Zita definitions appear in schema order. Unrelated pinned definitions may sit between them. When it differs, `verify` prints:
- the full CURRENT admin list, with definitions outside the schema marked and unpinned or missing Zita definitions listed underneath;
- the EXPECTED order;
- the exact re-pin plan `apply` would run.

An order difference is **not** a conflict: `verify` still exits 0, and the summary counts it separately, for example:

```text
12 expected · 0 missing · 12 exists-compatible · 0 conflict · 2 owner type(s) with Admin order differences
```

If two Zita definitions share a `pinnedPosition`, the order is reported as **ambiguous**. Shopify normally keeps positions unique, so `apply` refuses to run until someone reviews it.

### How `apply` reconciles drift

Every pin lands at the top, so the plan works backwards:
1. Find the longest run at the **end** of the expected order whose definitions are already pinned and already in the right relative order. Leave those alone.
2. Take the rest, from last to first. For each one, unpin it if it is pinned, then pin it. Each pin puts that definition above the previous one.

This is the fewest re-pins possible with a "move to top" operation. For example, if only the last definition is already in place, the other four product definitions are re-pinned and `artwork_story` is not touched.

Each unpin and each pin is its own request. Before continuing, the script checks that Shopify returned the same namespace and key with the expected pinned state. A user error, an unconfirmed result or a CLI failure stops the run immediately.

Reordering never sends anything except the owner type, namespace and key. Definition IDs, type, validations, access, name, description and every metafield value are unchanged. Unpinning a definition only hides it under "View all" until it is pinned again; its values stay intact.

### Definitions outside the schema

- **Never touched.** `apply` only pins and unpins definitions listed in `definitions.json`. Other pinned definitions — merchant fields, Shopify category fields, app fields — are never sent to a mutation, and their relative order is preserved.
- **What they experience:** when Zita definitions are re-pinned, they go above the others. An unrelated definition can therefore move down the list, without being modified itself.
- **Exact positions are not guaranteed.** The API cannot insert at a position, so "Zita definitions at exactly positions 1 to n" would need either re-pinning every Zita definition after each new merchant pin, or re-pinning other definitions. The first would make `apply` keep pushing Ranjeeta's newly pinned fields back down; the second touches definitions we do not own. The script therefore manages only the **relative order of Zita definitions**. Unrelated pinned definitions may sit between them, and `verify` reports that as a match with a note.
- **Pinned limit.** `verify` warns when pinning would push an owner type past 50 pinned definitions. Re-pinning an already pinned definition does not change the count.

### Partial failure and resume

This is what happened during the first dev-store provisioning:
1. Shopify CLI intermittently aborted individual `store execute` requests.
2. The script stopped at each aborted request instead of continuing.
3. The next `verify` / `apply` read the store, found the definitions that had already been created, and created only the remaining ones.
4. The final `verify` reported 12 expected, 0 missing, 12 exists-compatible, 0 conflict.

Ordering follows the same rule: **the store is the only record of progress**.
- `apply` never trusts a previous run. It re-reads the current state and plans from that.
- A failed mutation request is reported as "outcome unknown". Shopify may or may not have applied it.
- If a run stops after an unpin, that definition shows as "not pinned" in the next `verify`. The next `apply` pins it back into place.
- If a run stops after a pin, that definition is already at the top. The next plan accounts for it and is usually shorter.
- Re-running `apply` until `verify` reports no order difference is always safe, and once it matches, `apply` makes no ordering mutations.

### Production migration

- `verify` on Ranjeeta's store lists her full pinned order, including fields she, Shopify or apps pinned. Review it with her before any `apply`.
- On her store, `apply` puts the Zita definitions in schema order above her other pinned fields. Those fields are not modified, but they move down the edit page. Agree this with her first.
- If she prefers some of her own fields above the Zita block, she can re-pin them in the admin afterwards. `verify` will still report a match as long as the Zita definitions keep their relative order.
- Run the production `verify` with a `read_products`-only token. Grant `write_products` only for the reviewed `apply`.

---

## 8. Dev → production workflow

Run from the repo root after `source ~/.nvm/nvm.sh && nvm use`.

1. **Verify the Partner dev store.**
   ```sh
   shopify store auth --store zitas-art-studio-development.myshopify.com --scopes read_products,write_products
   node scripts/metafields/provision.mjs verify --store zitas-art-studio-development.myshopify.com
   ```
   Compare the printed CURRENT orders with the product and collection edit pages in the admin (§7).
2. **Provision missing definitions and reconcile Admin order on the dev store.**
   ```sh
   node scripts/metafields/provision.mjs apply \
     --store zitas-art-studio-development.myshopify.com \
     --confirm-store zitas-art-studio-development.myshopify.com
   ```
   If a request aborts, run `verify`, then `apply` again.
3. **Test theme and content behaviour** on the dev store: editorial band positions, image-only picker, dropdown choices, dimensions output, and the field order on edit pages.
4. **Before merchant migration, dry-run Ranjeeta's store** with a read-only token:
   ```sh
   shopify store auth --store <ranjeeta-store>.myshopify.com --scopes read_products
   node scripts/metafields/provision.mjs verify --store <ranjeeta-store>.myshopify.com
   ```
5. **Review every CONFLICT, note and order difference by hand** with Ranjeeta, including where her own pinned fields will end up (§7, Production migration).
6. **Provision only the safe missing definitions and the agreed order.** Re-authenticate with `write_products`, then run `apply` with `--store` and `--confirm-store`. `apply` refuses to run while any conflict or ambiguous order remains.
7. **Populate content separately.** This covers editorial copy, images, artwork dimensions and stories, via the admin or a later migration workflow ([product-schema §8](product-schema.md#8-migration-and-workbook-strategy)).

Creating a definition makes Shopify validate any existing **unstructured** metafields with the same owner type, namespace and key, and adopt the valid ones. `verify` cannot see unstructured values. If Ranjeeta's store might already hold such values, review them before step 6.

---

## 9. Open questions

- **Admin wording for `editorial_position`.** The admin dropdown shows the raw values (`after_row_1`, `after_row_2`, `end`). The definition description is a short merchant-facing prompt, and the placement rules are in §3. Friendlier stored values would require a matching Liquid change.
- **Collection descriptions on the dev store.** Decide whether to align the seven collection descriptions by hand, or to approve a non-destructive update mode later (§3, Admin descriptions on existing stores).
- **Phase A product definitions.** Description notes are expected. Decide whether to align the wording in the admin by hand; the script will not touch them.
- **Storefront access.** `PUBLIC_READ` matches Phase A. Switch the default to `NONE` if Storefront API exposure is not wanted. Existing definitions are not changed by the script.
- **Category scoping** of product definitions stays an open Phase A question ([product-schema §10](product-schema.md#10-future-schema-questions)). The schema creates unscoped definitions.
- **Admin order direction.** Confirm once on the dev store, using the comparison in §7, that the admin shows the highest `pinnedPosition` first.
