# UX Refinements — Sticky Header, Sticky PDP Bar, Collection Quick Add

**Date:** 1 November 2026  
**Store:** `zitas-art-studio-development.myshopify.com`  
**Theme:** `#192367558949`  
**Production:** untouched  

Checklist refs: L-UX-01, L-UX-02; Quick Add was previously deferred and is now implemented as approved polish.

---

## Implemented behavior

### 1. Scroll-aware sticky header

#### Root cause (regression, 1 Nov 2026)

`position: sticky` was applied to `.site-header`, but that element lives inside `.shopify-section.section-header` (~header height only). Sticky is constrained by that short parent, so the header scrolled away with the section and never stayed attached to the viewport. Scroll-direction JS still toggled classes, which made automation look “successful” while the real UX failed.

#### Exact fix

- Move `position: sticky; inset-block-start: 0` to `.shopify-section.section-header` (schema `class: section-header`).
- Toggle `is-scroll-hidden` / `is-nav-locked` on that section shell (not the inner header).
- Keep announcement as a separate header-group sibling so it scrolls off; only the header section sticks.
- `.site-header` returns to `position: relative` (appearance unchanged).
- Preserve mega-menu / mobile nav lock + `:focus-within` reveal; `prefers-reduced-motion` disables transform transition.
- Theme Editor: `shopify:section:load` clears `data-sticky-bound` and re-inits.
- PLP coordination: `html.is-header-hidden` syncs with header hide state; `.collection-toolbar` sticks at `top: var(--header-height)` while the header is shown, and `top: 0` only while the header is scroll-hidden (mobile bottom bar unchanged).

### 2. Sticky PDP Add to Cart

- Existing mobile `.pdp-bar` retained (always-visible full-width under 750px; thumbnail hidden).
- Desktop/tablet (≥750px): compact centered floating purchase card (not full-bleed):
  - featured-image thumbnail (`object-fit: contain`, decorative alt)
  - artwork title + current price / in-cart / sold state
  - Add to cart / View cart / available-works action
  - max-width 960px; min-height ~92–98px; bottom offset 24px (+ Shopify preview chrome when `#PBarNextFrameWrapper` is present)
- `IntersectionObserver` watches `[data-purchase-actions]` (fallback: buy region). Bar gets `.is-visible` only when that target leaves the viewport; synchronous first-paint sync included.
- Submits the existing product form (`form=` / shared `product-artwork` `/cart/add.js` path). No second cart system.
- Disabled / sold / in-bag states stay in sync via existing `syncVariantState` / section re-render.

#### Clipping root cause (refined 1 Nov 2026)

1. Full-bleed `inset-block-end: 0` pinned the bar flush to the layout viewport.
2. Shopify theme preview `#PBarNextFrameWrapper` (~68px) overlays the bottom of the content viewport and covered the bar.
3. Fix: floating card with 24px gallery offset + measured `--pdp-preview-chrome` so the card sits fully above preview chrome when present (0 when absent / customer storefront).

### 3. Collection Quick Add

- Extends `artwork-card` (not a new card design).
- Compact white circular control, bottom-right of the plate; expands to pill with bag-plus icon + “Add” on hover/focus.
- Desktop: visible on card hover/focus; expands on control hover/focus.
- Touch (`hover: none`): control always visible (no hover dependency).
- Available + `has_only_default_variant`: direct `/cart/add.js` (qty 1), updates header bag via section HTML, live-region feedback.
- Available + options required: same control navigates to the product URL (no guessed variant).
- Sold: no Quick Add control (existing Sold caption remains).
- Click uses capture + `stopPropagation` so the stretched card link does not fire.
- Event delegation survives collection filter re-renders.

---

## Files modified

| File | Change |
|---|---|
| `theme/sections/zita-header.liquid` | Sticky positioning + hide/lock CSS |
| `theme/assets/zita-header.js` | Scroll-direction sticky behavior |
| `theme/sections/zita-product-artwork.liquid` | Bar markup: title + sticky hook |
| `theme/assets/zita-product.css` | Desktop floating bar + mobile preserve |
| `theme/assets/zita-product.js` | IntersectionObserver sticky bar |
| `theme/snippets/artwork-card.liquid` | Quick Add control + styles |
| `theme/snippets/icon.liquid` | `shopping-bag-plus` |
| `theme/assets/zita-artwork-card.js` | Quick Add cart logic (delegation) |
| `theme/locales/en.default.json` | Quick Add strings |
| `theme/sections/zita-selected-works.liquid` | Load artwork-card script |
| `theme/sections/zita-related-works.liquid` | Load artwork-card script |
| `docs/project-status.md` | Status rows |
| `docs/qa/ux-refinements.md` | This report |

---

## Shopify architecture decisions

- Native Online Store sticky header via CSS `position: sticky` + theme JS (no app).
- PDP bar continues to post through the Liquid product form / `product-artwork` Ajax add (section re-render + header bag swap).
- Quick Add uses Ajax Cart API `POST /cart/add.js` with optional `sections` for the header section id discovered from the live DOM.
- Variant-required products never invent a variant id — they deep-link to the PDP.
- No new UI framework; V2 tokens only.

---

## Browser QA results

Authenticated development storefront session (preview bar present).

| Check | Result | Notes |
|---|---|---|
| Quick Add buttons present on available cards | **PASS** | e.g. “Add Vaayu - Air to cart” |
| Sold cards omit Quick Add | **PASS** | e.g. Sky - Aakash / Prithvi |
| Quick Add → cart | **PASS** | Badge → “Cart, 1 item”; live text “Vaayu - Air added to your cart.”; button “Added” |
| Sticky header shell `position: sticky` | **PASS (geometry)** | `.shopify-section.section-header` sticky; at scrollY≈1400 with visible state, `top === 0` on `/collections/all` |
| Sticky header hide/reveal transform | **PASS (geometry)** | `is-scroll-hidden` → shell at −85px; class removed → shell at 0 with header fully in view |
| Sticky header show on real scroll up | **Requires manual verification** | Automation cannot reliably exercise wheel/trackpad direction; do not treat as UX PASS until operator confirms |
| Mega-menu open lock | **Requires verification** | Code path present; not fully exercised in automation |
| Mobile menu open lock | **Requires verification** | Code path present |
| PDP floating bar title | **PASS** | “Touching the Sun” / “Horizon” / “Dissolution” / paired title |
| PDP floating card geometry | **PASS** | Desktop ~960×98, bottom 24px above preview; tablet ~788×92; no X overflow |
| PDP bar thumbnail | **PASS** | Featured image via `responsive-image`, contain, decorative |
| PDP bar visible when buy actions leave viewport | **PASS** | `.is-visible` when actions not intersecting |
| PDP bar hidden while buy actions in view | **PASS** | Cleared after scrolling buy actions back into view |
| Sold PDP sticky bar | **PASS** | Dissolution: Sold + “See available works”; fully above preview |
| Paired artwork sticky bar | **PASS** | Pebbled beach I and II: title + $650 + ATC |
| Sticky ATC → cart | **PASS** | Agni - Fire from floating bar; `/cart.js` shows item + $250 |
| Mobile sticky bar regression | **PASS** | 390×844: full-width bar, no thumb/title, above preview chrome, safe-area padding retained |
| Variant PDP sticky sync | **Requires verification** | No multi-option Active catalog PDP exercised this pass |
| Touch Quick Add always visible | **Requires verification** | CSS media query present |
| Keyboard Quick Add / header | **Requires verification** | Focus styles present; not fully tabbed |

---

## Known limitations

- Shopify theme preview iframe can intercept pointer clicks on lower page chrome during automation.
- Programmatic `window.scrollTo` in the automation browser does not reliably emit `scroll` events; real user scrolling is the authority for L-UX-01 reveal.
- Homepage Selected Works and Related Works load `zita-artwork-card.js` for Quick Add; horizontally scrolling rows still use the shared card.
- Quick Add expanded label is always “Add” even when the control is a PDP link for optioned products (accessible name clarifies “View options…”).

---

## Remaining polish

1. Manual trackpad/mouse pass for header hide/reveal + mega-menu/mobile locks.
2. Manual tablet/desktop PDP: scroll buy box in/out of view; confirm bar toggles cleanly.
3. Mobile viewport pass for sticky bar + Quick Add targets.
4. Optional: expand Quick Add label to “Options” for multi-variant products.
5. Owner visual approval of Quick Add on artwork photography.
6. Update launch checklist L-UX-01 / L-UX-02 / quick-add deferred note after manual sign-off.
