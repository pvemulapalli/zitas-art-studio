# Zita's Art Studio — Project Status

**Last updated:** 1 November 2026 (L-PDP-17 follow-up: keep selected variant after ATC; shortened ambiguous Bundles copy — commit/deploy pending; Stage 2B **not** done).

This is the **only** canonical record of project progress, current work, next steps and environment state. Other documents link here rather than tracking status themselves.

Launch task detail and priorities: [`docs/launch-readiness-checklist.md`](launch-readiness-checklist.md).

---

## Current milestone

| Item | State |
|---|---|
| **Current** | **L-PDP-17 follow-up** in working tree — preserve selected variant after successful ATC; ambiguous inventory copy shortened. M6 Stage 2A complete. |
| **Just finished** | Bundle QA regression fix (local); awaiting **commit/deploy authorization** then live QA. |
| **Next** | Authorize commit + deploy to `#192367558949`, re-QA Artwork Bundle + Size/Finish fixture, then **M6 Stage 2B** (not authorized). |
| **Next catalog** | **M6 Stage 2B** — controlled Draft trial import on the Partner **development** store (not authorized yet). |
| **Provisional effort** | **~20–35 hours** focused work remaining to launch — estimate only; excludes redesigns, unexpected migration issues, and waits on owner decisions. |

---

## Environments

| Layer | State |
|---|---|
| **Git `main`** | Synced with **`origin/main`** (includes Exhibitions `9697dba`, Contact, Portfolio, PDP/commerce, Bundles ATC + inquiry `c11f7e1`, catalog `.gitignore` `a873932`). |
| **Published dev theme** | **Zita V2 — Development** `#192367558949` on `zitas-art-studio-development.myshopify.com` (password-protected). |
| **Production store** | `zitasartstudio.com` — **untouched** by V2 catalog/theme cutover (Phase B). |
| **Prior About push target** | Theme `#192659095845` **no longer exists** — historical demo confusion; see recovery audit. |

Recovery detail: [architecture/v2-recovery-audit-2026-10-23.md](architecture/v2-recovery-audit-2026-10-23.md).

---

## Launch critical path

1. Project documentation refresh — **done**.
2. Fix Shopify Bundles inventory / availability error messaging — **implemented in theme**; **dev-store verification + deploy still pending**.
3. Prepare and execute **Stage 2B** controlled development trial import (`buddha-the-awakened-one`, `dissolution`, `clouds`, `turquoise-waters` as **Draft**; do not overwrite PoC/QA/`artwork-bundle`).
4. Validate imported products, images, pricing, inventory, and PDP behavior on development.
5. Extract and migrate relevant production **collections** (membership not in product CSVs).
6. Complete approved **Active** product migration (30 products / 84 images in current exports) with preserved availability.
7. Essential content, commerce, mobile, accessibility, and SEO QA (incl. favicon + MerchantSignals).
8. Ranjeeta’s final approval.
9. Deploy to production with verified backup / rollback.
10. Production smoke testing.

Parallel where safe: content approvals (About portrait, Portfolio art/copy, Contact placeholders, policies), Shop Pay decision, series editorial copy — do not block starting Stage 2B after the Bundles messaging fix unless a dependency appears.

---

## Page / surface status

Distinguish **implemented** (code exists) from **tested**, **owner-approved**, and **launch-ready**. Implementation alone is not launch-ready.

| Surface | Implemented | Tested (dev) | Owner-approved | Launch-ready |
|---|---|---|---|---|
| Homepage + shell (header/footer/announcement) | Yes | Partial / regression open | Design generally approved (teal homepage) | **No** — content/SEO/nav QA |
| Originals / series PLP | Yes | Partial on PoC collection | Design accepted direction | **No** — real collections pending |
| Original artwork PDP | Yes | Strong on PoC + QA fixtures | **Not** final PDP approval | **No** |
| Default product template | Yes (V2 artwork layout) | Partial | — | **No** |
| Cart (`/cart`) | Yes | Owner functional preview; broader regression open | Preview passed (not full regression) | **No** |
| About | Yes (published M2) | Local + hosted; portrait still missing | Biography / portrait **not** signed off | **No** |
| Exhibitions | Yes (published M3, `9697dba`) | Hosted visual QA pending Praveen; asset gaps | Design approved; content incomplete | **No** |
| Contact | Yes | Prefill verified; full CAPTCHA POST **Requires verification** | Layout approved; commission placeholders remain | **No** |
| Portfolio | Yes | Hosted visual QA open | Copy / real art **not** approved | **No** |
| 404 | Yes (published M2) | Local verified | — | Near-ready pending full-site QA |
| Policies (V2) | **No** | — | Decisions pending | **No** |
| Favicon | **No** | — | Asset decision pending | **No** |

---

## Commerce functionality

| Capability | Status |
|---|---|
| Single-variant products | Implemented; verified on PoC |
| Multi-option variants | Implemented; Size/Finish + diptych QA fixtures verified on **dev** |
| Price / availability sync on variant change | Implemented; verified on fixtures |
| Add to Cart | Implemented; verified on fixtures / available bundles |
| Cart line display | Implemented; bundle `item_components` on cart **Verified** (dev) |
| Shopify Bundles (dev) | **Installed**; available parent ATC verified; **L-PDP-17 messaging Implemented** in theme (confirmed vs ambiguous conflict copy; no false Sold from 422) — **Requires verification** on live `artwork-bundle` |
| Shopify Bundles (production) | **Not installed** |
| Artwork inquiry → Contact | Implemented + prefill verified (`c11f7e1`) |
| Contact form submit / CAPTCHA | **Requires verification** |
| Mobile sticky ATC | Implemented; full mobile QA open |
| Checkout | **Not** end-to-end verified for launch |

---

## Catalog migration (M6)

### Stage 1 — Catalog audit — **complete**

- Production: **56** products · **67** variants · **13** collections identified (membership not in CSVs).
- Development export: **4** products; `artwork-bundle` created afterward (not in CSV).
- Eight reports under `data/catalog-migration/reports/` (gitignored).
- **No Shopify writes.**

### Stage 2A — Active migration preparation — **complete**

Ranjeeta: migrate only production products marked **Active**.

| Result | Value |
|---|---|
| Active in scope | **30** |
| Inactive excluded | **26** (draft / archived / unlisted) — left unchanged in production |
| Images on Active products | **84** |
| Available = 1 | **24** |
| Available = 0 | **5** |
| Missing inventory row | **1** (`water-ii`) |
| Reports | Nine files under `data/catalog-migration/reports/stage-2a/` |
| Shopify writes | **None** |

### Confirmed business rules

- Initial scope = **Active only**.
- Originals generally one-of-one; prints may differ later.
- **Preserve production availability** — never auto-set quantity to 1.
- Preserve production **handles** unless an identity decision says otherwise.
- Do not overwrite dev PoC (`essence-v2`, `colored-by-nature-blue-v2`), QA fixtures, or `artwork-bundle`.
- Product images migrate via source URLs (validate after import).
- Collection metadata / membership need separate extraction.
- **No production catalog changes authorized.**

### Stage 2B — Controlled trial import (dev) — **not authorized**

Proposed Draft imports: `buddha-the-awakened-one`, `dissolution`, `clouds`, `turquoise-waters` (all confirmed Active). Plan only: `active-trial-import-plan.md`.

---

## Completed (theme & foundation)

| Area | Notes |
|---|---|
| Research + Design V2 | Approved by Ranjeeta (Oct 2026) |
| Architecture + Skeleton theme | OS 2.0 Liquid theme in `theme/` |
| Partner dev store + metafield defs (12) | Dev only; production defs not provisioned |
| Homepage, PLP, original PDP, header nav | On published theme `#192367558949` |
| Full cart (C1) | `3ecb3d2`; regression QA still open |
| About + 404 | M2 on published theme |
| Exhibitions | M3 `9697dba` on published theme |
| Contact + Portfolio | Implemented on `main` / theme |
| PDP description + variants | `3ae754a` |
| Bundles ATC 422 handling + inquiry deep-link | `c11f7e1` — **does not** close remaining Bundles messaging defect |
| Launch readiness checklist | `28c9cf9` (+ later updates) |
| M6 Stage 1 + Stage 2A | Offline reports only |

---

## Owner decisions (recovery, Oct 2026)

Still authoritative for V2 completion (supersedes earlier “on hold” where noted).

| Topic | Decision |
|---|---|
| Homepage | Keep **existing teal**; design generally approved |
| Header / nav | Preserve approved design; owner-managed **current-series** submenu; **About, Exhibitions, Contact**; **no News**; **favicon before launch** |
| PDP | Short **description near buy box**; hide **Year** and **Framing**; keep **Medium, Surface, Size**; reduce **COA repetition**; **“Add to Cart”** + a11y strings |
| Variants | **Required for launch** — Shopify-native option model |
| Diptych inventory | Evaluate Shopify Bundles (dev prototype + Ranjeeta listing model); launch-relevant for paired stock |
| Cart / checkout | **Full `/cart`** (no drawer); Shop Pay where eligible; USD OK initially |
| About / Exhibitions / Contact / Portfolio | Approved designs; Exhibitions = OS 2.0 blocks only (no metaobjects this phase) |
| Contact email | **`info@zitasartstudio.com`** customer-facing |
| Policies | Owner decisions before publish |
| Product data | Active-only first migration; no catalog writes until authorized |
| Deferred | Cart drawer, currency selector, predictive search overlay, optional PLP quick-add |

---

## Pending decisions (block or shape migration)

| Decision | Why it matters |
|---|---|
| Active `copy` / duplicate identities (`tangled-copy`, CBN-Blue cluster, pebbled-beach copy, etc.) | Avoid duplicate or wrong canonical artworks |
| Essence vs `essence-v2`; Colored by Nature–Blue vs `colored-by-nature-blue-v2` | Dev PoC must not be overwritten; merchandising identity |
| Zero-available Active products (5) | Keep sold/unavailable vs other treatment — **preserve qty 0** |
| `water-ii` inventory | Missing export row; untracked in product export — Admin truth needed |
| Collection membership + editorial content | PLP / nav / Portfolio series links |
| Paired-artwork commerce model | Single SKU vs Bundles vs variants — do not auto-convert |
| Final artwork content (sizes, stories, alts, SEO) | V2 PDP facts; do not invent dimensions from titles |
| Shop Pay on original PDP | Implement vs explicit deferral |
| Policies + About/Portfolio/Contact content sign-off | Launch content gates |
| Final storefront go / no-go | Ranjeeta |

Plain-language migration checklist: `data/catalog-migration/reports/stage-2a/ranjeeta-decisions.md` (gitignored local reports).

---

## Remaining before launch (summary)

**P0 themes:** Bundles messaging fix · Stage 2B trial · Active catalog + inventory preserve · collections · commerce/checkout QA · critical content (About portrait, Portfolio art/copy, Contact placeholders, policies) · favicon · MerchantSignals / critical SEO · a11y/responsive on purchase paths · production backup/rollback · owner approvals.

**P1 polish:** Sticky desktop/tablet header (**L-UX-01**) · floating desktop/tablet PDP purchase bar (**L-UX-02**) · Shop Pay decision/impl · noncritical SEO/alts · series blurbs · performance samples · owner-editability QA.

**P2 post-launch:** Future bundle merchandising expansions · extra editorial/animation · expanded SEO monitoring · archive legacy products after confidence window.

Full prioritized list: [`launch-readiness-checklist.md`](launch-readiness-checklist.md).

---

## Explicitly deferred until after launch

- Cart drawer (C2), predictive search overlay (C4), country/currency selector (C5)
- PLP quick-add / image browsing
- Extra layout variants beyond approved Claude designs
- Automatic conversion of paired listings into Shopify Bundles
- Inactive (draft/archived/unlisted) product migration
- Deleting or renaming production products without approval

---

## Milestone history (keep for evidence)

### M3 Exhibitions (23 Oct 2026)

| Item | Status |
|---|---|
| **Implementation** | `page.exhibitions.json` + seven `zita-exhibitions-*` sections; OS 2.0 blocks (no metaobjects) |
| **Published theme push** | Targeted `--only` to `#192367558949`; backup under `/tmp/` |
| **Admin page** | **Exhibitions** — handle `exhibitions` (Page ID `178251464997`) |
| **Hosted URL** | `https://zitas-art-studio-development.myshopify.com/pages/exhibitions` |
| **Missing assets** | Devi, Indulgence, Adiyogi slots; optional product/series links unset |
| **Git** | `9697dba` on `origin/main` |

### M2 promotion (23 Oct 2026)

About + 404 on published `#192367558949`. Portrait crop still missing in Files. Public email schema default updated; **saved** Theme Editor value may still need confirm. Menus often manual (API historically denied).

### M1 / M1.5 About QA (23 Oct 2026)

QA theme `#193116733733`; About page handle `about`. Portrait `ranjeeta-portrait-crop-4x5.png` not in Files. SEO foundation doc: [v2-seo-foundation.md](architecture/v2-seo-foundation.md).

### Owner content still pending (About)

| Item | Notes |
|---|---|
| **Portrait crop** | Upload to Shopify Files |
| **Ch 02 photography** | Empty until Ranjeeta supplies |
| **Biography sign-off** | Provisional copy on page |

---

## Which documents to trust

See [README](../README.md#document-map). Status: **this file**. Launch tasks: [`launch-readiness-checklist.md`](launch-readiness-checklist.md). Cutover architecture: [shopify-implementation-plan.md](architecture/shopify-implementation-plan.md). Catalog prep (local, gitignored): `data/catalog-migration/reports/`.
