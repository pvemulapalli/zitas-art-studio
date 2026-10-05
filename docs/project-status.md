# Zita's Art Studio — Project Status

**Last updated:** 5 October 2026 (original-artwork PDP implemented and live-QA'd on the dev preview theme; not committed, not deployed to the published demo theme)

This is the **only** canonical record of project progress, current work, next steps and environment state. Other documents link here rather than tracking status themselves.

---

## Completed

| Area | Notes |
|---|---|
| Reference research | [Dimitra Milan](research/dimitra-milan-audit.md), [Rinske Douna](research/rinske-douna-audit.md), [content & brand inventory](research/zita-content-brand-inventory.md) |
| Design | **Zita Design V2** approved by Ranjeeta (October 2026): [design brief](design/zita-design-brief.md), [V2 acceptance](design/design-v2-acceptance.md) |
| Architecture | Shopify Online Store 2.0, theme-first, Shopify Basic: [implementation plan](architecture/shopify-implementation-plan.md) |
| Theme foundation | Shopify Skeleton v1.0.0 baseline in `theme/` (`b21dca4`) |
| Partner dev store | `zitas-art-studio-development.myshopify.com` (Basic) |
| Phase A product-data proof | Essence V2 (available) + Colored by Nature-Blue V2 (sold) in `V2 PoC — Original Artworks`: [product schema](architecture/product-schema.md) |
| Metafield provisioning | Reproducible `scripts/metafields/` system; all 12 definitions provisioned and Admin order reconciled on the dev store: [metafield definitions](architecture/metafield-definitions.md) |
| Global V2 shell + Homepage | Header, footer, announcement, hero carousel, Current Series, Selected Works and editorial sections (`3b1bf0f`, `dcee031`) |
| V2 PLP / collection gallery | Collection intro, aligned artwork grid, native Search & Discovery Filter & Sort, collection editorial band, 8:9 desktop/tablet plate refinement from live QA (`d00ba52`) |
| Source control | Homepage + PLP committed and pushed to `origin/main` |

## In progress

- **Original-artwork PDP** (`product.original.json`). The Claude handoff is stored under `references/claude-design/handoff/pdp/`, and the build and its decisions are recorded in [implementation plan §14](architecture/shopify-implementation-plan.md#14-pdp-architecture).

  | Stage | State |
  |---|---|
  | Implemented | **Yes**, in the local `theme/` working tree, including the correction pass (blank shipping row hidden, "In your bag" state label, story-to-footer spacing). |
  | Live QA | **Passed** on the development preview theme (`shopify theme dev` against the Partner dev store) at 1440, 1024, 834 and 390px for Essence V2 (available) and Colored by Nature-Blue V2 (sold). Theme Check is clean. |
  | Product template assignment | **Done**: both PoC products use the `original` template on the Partner dev store. |
  | Committed to Git | **No** |
  | Deployed to the published **Zita V2 — Development** theme (the normal demo storefront) | **No.** Until it is pushed, that theme has no `product.original` template, so the demo storefront renders both PoC products with the default Skeleton product template. |

## Next

1. Review and commit the PDP.
2. Push the PDP to the published **Zita V2 — Development** theme on the Partner dev store, then re-check both products on the demo storefront.
3. PDP content in the dev-store Admin (content tasks, not theme work):
   - add alt text beginning "Room view: …" to Essence V2's four room photographs (images 2–5);
   - Related Works ("More originals") stays hidden until Shopify returns recommendations; related products can be set in Search & Discovery later if wanted;
   - add shipping/packing copy (the accordion row is hidden until then) and a commission URL once Ranjeeta provides them.
4. Implement / finish the approved **header collection-navigation dropdown**. Supporting mega-menu infrastructure exists in the theme (`zita-header.liquid`, `zita-header.js`), but the approved Claude V2 collection-navigation dropdown behaviour and content are not yet complete in the storefront.
5. Cross-page polish and QA ([implementation plan §23](architecture/shopify-implementation-plan.md#23-qa-requirements)).
6. Prepare **Phase B** — merchant-store integration ([implementation plan §24](architecture/shopify-implementation-plan.md#24-cutover--launch-strategy)).

## Environments

| Store | State |
|---|---|
| **Partner dev store** `zitas-art-studio-development.myshopify.com` | All V2 work happens here. Theme **Zita V2 — Development** is **published** so the storefront can be demonstrated. Both V2 PoC products are **Active** and assigned to the `original` product template. Metafield definitions: see [provisioning state](architecture/metafield-definitions.md). |
| **Ranjeeta's production store** | **Not modified** by V2 work. Flora remains published. No Zita V2 theme uploaded. No V2 products or metafield definitions created. Phase B is future work. |

## Open inputs from Ranjeeta

Not blocking current dev-store work unless noted.

- Series descriptions: **Colored by Nature**, **BlackWhiteandGrey**, **Walking the Trail** (pending)
- Artwork facts per product: year, confirmed dimensions, framing / ready-to-hang, certificate, shipping and packing (needed for real PDP content and catalog migration)
- Print strategy and original ↔ print relationships
- Commission process, pricing and timeline
- About-page story answers; exhibition details and imagery
- Newsletter promise; News vs Press naming; Contact response-time promise (if any)
- Higher-resolution artwork files and room / detail photography where available

## Current blockers

- No blockers. The PDP Shipping & packing row stays hidden until Ranjeeta provides approved copy.

---

## Which documents to trust

See the document map in the [README](../README.md#document-map). In short: this file for status; [project brief](project-brief.md) for the charter; `docs/architecture/` for technical decisions; the design brief and V2 acceptance for approved design intent. Claude handoffs, design reference HTML and research audits are historical snapshots.
