# Phase 4 — Final Development Storefront QA

**Date:** 1 November 2026 (browser pass completed same day)
**Store:** `zitas-art-studio-development.myshopify.com`
**Theme:** Zita V2 — Development `#192367558949`
**Git HEAD:** `335d890` (`Finalize curated collection navigation and footer`)
**Scope:** Prior Admin/static audit retained; password-gated **browser** storefront QA completed in Cursor browser (authenticated session). No order/payment completed. No Shopify catalog/theme writes.

**Authority:** Evidence for this pass. Environment / milestone truth remains [`docs/project-status.md`](../project-status.md).

**Result vocabulary**

| Label | Meaning |
|---|---|
| **Browser-verified PASS** | Observed in authenticated storefront browser this pass |
| **Browser-verified FAIL** | Observed broken/incorrect storefront behavior this pass |
| **BLOCKED** | Could not execute (tooling / payments / CAPTCHA / Draft preview, etc.) |
| **Admin-verified PASS** | Confirmed earlier via Admin GraphQL / CLI (not re-asserted as browser) |

---

## Overall verdict

**PARTIAL PASS — interactive storefront smoke largely clear on Partner development; payments cannot complete on this store; known content/asset gaps remain.**

- Catalog/nav Admin gates from the earlier pass remain **Admin-verified PASS**.
- Homepage, Originals, series PLPs, available/sold/paired PDPs, cart add/remove, checkout **handoff**, desktop mega-menu, mobile Originals nav, and footer links are **Browser-verified PASS**.
- Partner checkout shows **“This store can’t accept payments right now”** — expected; not a theme FAIL. Production payment smoke still required.
- No **verified** new launch-blocking theme code defect. **No theme deploy** and **no product/inventory/menu changes** this pass.

---

## 1. Tests performed

| Area | Method | Result |
|---|---|---|
| Storefront password authentication | Cursor browser session | **Browser-verified PASS** — homepage loaded; preview bar still labels store password-protected (password not recorded) |
| Homepage render | Browser + DOM image checks | **Browser-verified PASS** — hero CDN images load (`naturalWidth` > 0); announcement, nav, footer present |
| Originals PLP | Browser | **Browser-verified PASS** — title, description, filters (Available 25 / Sold 5), “30 works”, cards, editorial band |
| Series PLPs (Trail, Colored by Nature, Elements, Sand and Cloud) | Authenticated `fetch` + prior Originals browser | **Browser-verified PASS** — HTTP 200, correct H1, artwork cards/images |
| Available PDP (`ganesha`) | Browser | **Browser-verified PASS** — image, $350, Available · one of one, Add to cart |
| Sold PDP (`dissolution`) | Browser | **Browser-verified PASS** — Sold, collected note, no ATC, multi-image gallery, See available works |
| Paired PDP (`turquoise-waters`) | Browser | **Browser-verified PASS** — 7-image gallery, $1,500, Available, Add to cart |
| ATC → cart → qty guard → remove | Browser (+ programmatic click where Shopify preview bar intercepted pointer) | **Browser-verified PASS** — Ganesha line $350; qty 2 blocked (“Only 1 available”); remove → empty cart |
| Checkout handoff | Navigate `/checkout` with cart line | **Browser-verified PASS** — Checkout UI with Ganesha $350; **Pay now disabled**; store cannot accept payments; **no payment submitted** |
| Desktop Originals mega-menu | Browser DOM | **Browser-verified PASS** — Featured series (3) / Explore more (4) / All originals |
| Mobile Originals nav | Device metrics 390×844 | **Browser-verified PASS** — Menu opens; Current Series list + All originals + About/Exhibitions/Portfolio/Contact |
| Footer Explore Art / The Studio | Browser | **Browser-verified PASS** |
| About / Exhibitions / Portfolio / Contact | Authenticated fetch + titles/H1 | **Browser-verified PASS** (load); Exhibitions still has known placeholder/missing-image content |
| Contact CAPTCHA POST | — | **BLOCKED** / Requires verification (not submitted) |
| Bundles L-PDP-17 live conflict copy | Draft `artwork-bundle` | **BLOCKED** this pass (Draft preview not run) |
| Product status / collections / menus | Admin GraphQL (prior) | **Admin-verified PASS** (see §2–3) |
| Theme Check / live theme vs Git | Prior CLI | **Admin-verified PASS** |
| Inventory / product mutation | — | **Not run** (forbidden) |
| Real order / payment | — | **Not placed** |

---

## 2. Catalog and collections

### Products (unchanged Admin evidence)

| Check | Result | Notes |
|---|---|---|
| 30 migrated artworks Active | **Admin-verified PASS** | All 30 `status: ACTIVE` |
| Published to Online Store | **Admin-verified PASS** | |
| Template `original` | **Admin-verified PASS** | |
| ≥1 image each | **Admin-verified PASS**; storefront samples **Browser-verified PASS** | Ganesha / Dissolution / Turquoise media rendered |
| Five QA/PoC/bundle products Draft | **Admin-verified PASS** | Excluded from customer collections |
| `water-ii` untracked / sellable | **Admin-verified** exception | Still **P0** data; not modified |

### Collections (Admin + browser)

| Collection | Admin count | Browser |
|---|---:|---|
| Originals | 30 | **Browser-verified PASS** |
| Walking the Trail | 5 | **Browser-verified PASS** |
| Colored by Nature | 5 | **Browser-verified PASS** |
| Elements | 6 | **Browser-verified PASS** |
| Sand and Cloud | 6 | **Browser-verified PASS** (additional series) |
| Reverence / Good Things Come in Pair / New Works | 4 / 6 / 2 | **Admin-verified PASS** membership; storefront not re-opened individually this pass |

Collection **featured images** still null in Admin → **P1** (mega-menu may fall back to product imagery).

---

## 3. Navigation

| Check | Result | Notes |
|---|---|---|
| `main-menu` structure | **Admin-verified PASS** | |
| Desktop Featured / Explore More / All Originals | **Browser-verified PASS** | Labels + seven series + All originals in mega-menu |
| Mobile Originals / series / All originals | **Browser-verified PASS** | Mobile uses “Originals · Current Series” flat list (no Featured/Explore eyebrows — expected pattern) |
| Footer Explore Art / The Studio | **Browser-verified PASS** | Present on sampled pages |
| Keyboard Esc / deep a11y pass | **BLOCKED** / not fully exercised | Static `aria-*` still present from prior review |

---

## 4. Purchasing journey

| Scenario | Result | Notes |
|---|---|---|
| Available original (`ganesha` $350) | **Browser-verified PASS** | ATC succeeded; cart badge → 1 item after navigation |
| Cart line correctness | **Browser-verified PASS** | Title Ganesha; unit/line $350; subtotal $350 |
| Quantity controls | **Browser-verified PASS** | Increasing to 2 shows inventory error; cart stayed at 1 / one-of-one messaging |
| Remove | **Browser-verified PASS** | Empty cart copy + View originals |
| Checkout handoff | **Browser-verified PASS** | `/checkout` → Shopify checkout with Ganesha $350 |
| Payment | **BLOCKED** on Partner store | UI: “This store can’t accept payments right now.” Pay now disabled. Not a production proof. |
| Sold-out (`dissolution`) | **Browser-verified PASS** | Sold UI; no Add to cart |
| Paired multi-image (`turquoise-waters`) | **Browser-verified PASS** | 7 images; available ATC path present (not re-added after Ganesha test) |
| Shopify Bundles L-PDP-17 | **BLOCKED** live | Draft parent; code previously Admin/theme-parity verified |
| Mobile purchase sticky bar | Partial | Sticky/purchase chrome present; full mobile ATC not re-run after desktop commerce |

**Do not treat Partner-dev checkout as production payment readiness.**

---

## 5. Major pages

| Page | Admin / template | Browser this pass |
|---|---|---|
| Homepage | Published | **Browser-verified PASS** |
| Originals PLP | Collection + template | **Browser-verified PASS** |
| Series PLPs | `collection.series` | **Browser-verified PASS** (4 series opened/fetched) |
| Artwork PDP | `product.original` | **Browser-verified PASS** (available / sold / paired samples) |
| About | Page `about` | **Browser-verified PASS** (loads; portrait/content gaps remain known) |
| Exhibitions | Page `exhibitions` | **Browser-verified PASS** (loads; placeholder/missing-image content still present) |
| Portfolio | Page `portfolio` | **Browser-verified PASS** (loads; series picker polish still open) |
| Contact | Page `contact` | **Browser-verified PASS** (loads); CAPTCHA POST **BLOCKED**/unverified |
| Cart | `cart` | **Browser-verified PASS** |
| 404 | `404.json` | **BLOCKED** this pass (not reopened) |

---

## 6. Known exceptions (reviewed, not silently changed)

| Item | Severity | Status this pass |
|---|---|---|
| `water-ii` untracked inventory (qty 0 but sellable) | **P0** data | Still open — **inventory not modified** |
| Dissolution missing width/height metafields | **P1** content | Still empty in Admin; PDP otherwise renders |
| Prithvi 12×16 vs research “12×12” | **P1** content | Unchanged |
| Paired works as single SKU | **P0 clarify** | Browser confirms single-SKU ATC model on Turquoise |
| Missing collection featured images | **P1** | Unchanged |
| Partner store cannot accept payments | Expected / **P0** for production | Confirmed on checkout UI |
| L-PDP-17 Bundles messaging live | **P0** verify | Still needs Draft preview |
| Contact CAPTCHA POST | **P0**/P1 | Not exercised |
| SEO / production cutover | **P0** | Untouched |
| Shopify preview bar intercepts some automated clicks | Tooling | Worked around; not a customer defect |

---

## 7. Defects found

### New / reconfirmed

1. **`water-ii` sellable while untracked** — **P0** data (Admin); unchanged.
2. **Partner checkout cannot accept payments** — expected for this store; production payment smoke still required.
3. **Exhibitions / About / Portfolio content gaps** — pages load; known missing assets/portrait/art remain **P1**.
4. **Collection featured images unset** — **P1**.
5. **ATC header badge** briefly lagged (“Cart, 0 items”) until full navigation/section refresh — minor; cart.js and cart page were correct.

### Theme code

No new verified Liquid/JS launch blocker from this browser pass.

### Fixes completed this pass

**None** (report-only; no theme/Shopify writes).

---

## 8. Remaining P0 blockers

**Before owner demo (development):**

1. ~~Share storefront password / complete HTML smoke~~ — **done** this pass (password not stored).
2. Decide / fix **`water-ii`** if shown as buyable.
3. Optional: Draft `artwork-bundle` preview for L-PDP-17.

**Before production migration:**

1. Production commerce QA (ATC, cart, **real** checkout/payment smoke with charge policy).
2. Catalog/collections/metafields cutover + URL/SEO plan.
3. Owner decisions (duplicates, sold Actives, paired model, content).
4. Bundles install only if launch sells parents.
5. Favicon, policies, MerchantSignals / critical SEO, backup + rollback, go/no-go.

---

## 9. Remaining P1 polish

- Collection featured images
- Dissolution dimensions; Prithvi size confirmation
- About portrait / Exhibitions assets / Portfolio art + series pickers
- Contact CAPTCHA full POST
- L-UX-01 / L-UX-02
- Shop Pay on original PDP decision
- Series editorial copy (workbook path started separately)

---

## 10. Manual testing checklist (status after browser pass)

1. Homepage + desktop mega-menu Featured / Explore More — **PASS**
2. Mobile menu + Originals + series — **PASS**
3. Footer Explore Art / The Studio — **PASS**
4. Originals PLP (30; no QA titles in grid) — **PASS**
5. Series PLPs — **PASS** (Trail, CBN, Elements, Sand and Cloud)
6. Available PDP ATC / cart / remove / checkout handoff stop — **PASS** (no payment)
7. Sold PDP — **PASS** (`dissolution`)
8. Paired multi-image — **PASS** (`turquoise-waters`)
9. About / Exhibitions / Portfolio / Contact — **PASS** load; content gaps remain
10. 404 / keyboard Esc — **not completed**
11. Optional Draft `artwork-bundle` — **not completed**

---

## 11. Production launch dependencies

- Do **not** treat Partner-dev browser PASS as production cutover
- Preserve production until Phase B authorization
- URL/handle preservation + redirects
- Metafield definitions on production
- Inventory identity decisions applied intentionally
- Theme publish with backup/rollback
- Checkout + payments smoke on merchant store

---

## 12. Git / theme state after QA

| Item | State |
|---|---|
| `HEAD` | `335d890` |
| This report | `docs/qa/final-development-qa.md` updated (local; commit only if requested) |
| Theme deploy this pass | **None** |
| Product / inventory / menu writes | **None** |
| Production | **Untouched** |
| Storefront password | Used for auth only — **not** stored in Git, docs, logs, or env files |
