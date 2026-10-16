# Zita's Art Studio — Project Status

**Last updated:** 15 October 2026 (C1 full cart page functionally approved and committed. Broader regression QA pending before launch. C2 drawer deferred by design. About/Exhibitions still gated on Claude Design sync. Header `e8b6d65`, PDP `7a435c8` committed; published demo theme deploy still outstanding.)

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
| Original-artwork PDP | Build + correction (`f713471`); refinement (`7a435c8`): story pull-quote, full-screen viewer with zoom, captions. Live QA passed on preview theme. Template `original` assigned on both PoC products. **Not** pushed to the published demo theme yet. |
| Header navigation | Originals dropdown + mobile menu (`e8b6d65`), QA’d on preview theme. **Not** pushed to the published demo theme yet. |
| Commerce UX Gap Audit | READ-ONLY audit of localization, predictive search, cart drawer/`/cart`, Shop Pay, ATC feedback (session, October 2026). |
| Phase D plan | Approved with amendments; cart-primary commerce decision recorded: [phase-d-implementation-plan.md](architecture/phase-d-implementation-plan.md) |
| C1 full cart page | V2 `/cart` with inventory validation + messaging; owner functional preview passed. **Functionally approved; broader regression QA pending before launch.** Committed locally (not pushed). |
| Source control | Homepage, PLP, PDP, header committed and pushed to `origin/main`; C1 committed locally, not pushed |

## In progress

- **Phase D readiness** — editorial + commerce repair sequencing. Theme code for About and Exhibitions is **blocked** until Claude Design packages are in the repository. See [Phase D plan](architecture/phase-d-implementation-plan.md).

  | Gate | State |
  |---|---|
  | About / Exhibitions Claude Design handoffs, screenshots, amendments in Git | **Not present** under `references/claude-design/` (only homepage, PLP, PDP, header handoffs exist) |
  | Exhibition metaobject Basic feasibility proof | **Not started** |
  | Cart page (C1) — primary cart UX | **Functionally approved** (owner preview). Broader regression QA pending before launch (see Next). Committed locally; **not pushed / not deployed.** |
  | Cart drawer (C2) | **Deferred by design** — not planned for current V2; full `/cart` is primary. Not a missing feature. Revisit only if user testing shows need. **Do not implement.** |
  | Accelerated checkout (C3) | Separate planned enhancement (not tied to a drawer) |
  | Predictive search (C4) | Separate planned enhancement; needs V2 search design |
  | Currency selector (C5) | Needs V2 placement design + Markets Admin audit |
  | PLP quick add / image browsing | Optional; pending design review |
  | Portfolio / Contact / Policies | **On hold** — awaiting Ranjeeta’s approval |
  | News / standalone Commissions page | **Out of scope** |

## Next

1. **Pre-launch C1 regression QA** (broader cases not required for this functional approval): multi-unit tracked stock; backorder / overselling-enabled; multi-line cart; JavaScript disabled; keyboard + screen-reader error announcement; end-to-end checkout after a rejected quantity update.
2. **Import Claude Design packages** for About and Exhibitions into the repository (see readiness checklist in [Phase D plan §2](architecture/phase-d-implementation-plan.md#2-claude-design-sync-gate-about--exhibitions)). Do **not** start About or Exhibitions theme work until this gate passes.
3. After handoff sync: Exhibition **metaobject Basic proof**, then About / Exhibitions builds (handoff-faithful), then **C3 / C4 / C5** as designs confirm — **not** C2.
4. Push C1 + PDP + header to GitHub / published **Zita V2 — Development** theme when ready for demo parity (only when explicitly asked).
5. Outstanding a11y spot-checks: real keyboard + VoiceOver on PDP viewer and header (script-tested earlier).
6. PDP / header Admin content tasks (alt text, Instagram URL, shipping copy, etc.) remain as listed previously — content, not theme code.
7. **Phase B** — merchant-store integration remains future work after Phase D demo readiness.

## Environments

| Store | State |
|---|---|
| **Partner dev store** `zitas-art-studio-development.myshopify.com` | All V2 work happens here. Theme **Zita V2 — Development** is **published** so the storefront can be demonstrated. The storefront is **password-protected**, so `shopify theme dev` needs `--store-password` for its local proxy; the hosted preview works after entering the password in the browser. Both V2 PoC products are **Active** and assigned to the `original` product template. Metafield definitions: see [provisioning state](architecture/metafield-definitions.md). |
| **Ranjeeta's production store** | **Not modified** by V2 work. Flora remains published. No Zita V2 theme uploaded. No V2 products or metafield definitions created. Phase B is future work. |

## Open inputs from Ranjeeta

Not blocking next Phase D gates unless noted.

- **Approval pending:** Portfolio; Contact / Trade / Commissions; Policies
- **Design confirmation pending:** predictive search overlay; country/currency selector; optional PLP quick add / image browsing
- **Cart drawer:** not awaiting design — **deferred by architecture decision** (full `/cart` primary)
- Series descriptions: **Colored by Nature**, **BlackWhiteandGrey**, **Walking the Trail** (pending)
- Artwork facts per product: year, confirmed dimensions, framing / ready-to-hang, certificate, shipping and packing
- Print strategy and original ↔ print relationships
- Commission process, pricing and timeline (page on hold)
- About-page story answers; exhibition details and imagery (needed for rich editorial content after handoff sync)
- Newsletter promise; Contact response-time promise (if any)
- Higher-resolution artwork files and room / detail photography where available

## Current blockers

- **About / Exhibitions implementation:** Claude Design packages not yet synchronized into the repository.
- **Predictive search / currency selector:** V2 designs not confirmed (separate from cart).
- **Portfolio / Contact / Policies:** awaiting Ranjeeta’s approval.
- **Cart drawer:** not a blocker — deferred by design.
- No blocker for **pre-launch C1 regression QA** or the About/Exhibitions sync gate. The PDP Shipping & packing row stays hidden until Ranjeeta provides approved copy.

---

## Which documents to trust

See the document map in the [README](../README.md#document-map). In short: this file for status; [project brief](project-brief.md) for the charter; `docs/architecture/` for technical decisions including [Phase D plan](architecture/phase-d-implementation-plan.md); the design brief and V2 acceptance for approved design intent. Claude handoffs, design reference HTML and research audits are historical snapshots once imported.
