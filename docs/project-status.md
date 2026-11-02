# Zita's Art Studio — Project Status

**Last updated:** 2 November 2026
**Project status:** **PAUSED — Awaiting Ranjeeta's deliverables.**

This is the **only** canonical record of project progress, current work, next steps and environment state. Other documents link here rather than tracking status themselves.

Launch task detail and owner dashboard: [`docs/launch-readiness-checklist.md`](launch-readiness-checklist.md).
Production parity audit: [`docs/architecture/production-parity-audit.md`](architecture/production-parity-audit.md).
Phase 4 evidence: [`docs/qa/final-development-qa.md`](qa/final-development-qa.md).
Policy implementation: [`docs/qa/policy-page-implementation.md`](qa/policy-page-implementation.md).

---

## PRODUCTION DEPLOYMENT HOLD

**Do not** upload, install, preview-publish, or otherwise introduce Zita V2 into the **production** Shopify store (`zitasart.myshopify.com`) until **Praveen explicitly authorizes** resuming production preparation.

Reason: Ranjeeta continues reviewing the approved **development** storefront; an unfinished V2 theme must not appear in production Admin. **Flora `#145890541755` remains live.**

During this hold:

- Do **not** change production products, collections, pages, menus, Files, policies, or metafields for V2 cutover.
- Production **payment, tax, shipping, and checkout** configurations remain authoritative — **never** migrate them from development.
- Production migration and deployment are **explicitly paused**.

---

## Current milestone

| Item | State |
|---|---|
| **Current** | **PAUSED** — waiting on Ranjeeta workbooks, policy approvals, Water II, paired/bundle decision, and final development visual/content approval. |
| **Just finished** | Production Parity and Dependency Audit (authenticated read-only on `zitasart.myshopify.com`); SEO/Originals URL cleanup on development (`9f51fd2` on `origin/main`). |
| **Development** | Approved Claude Design layouts implemented on `#192367558949`. Storefront QA complete subject to documented exceptions. Contact form and Shopify Bundles tested successfully. |
| **Production** | Access established; audit complete; **Flora live**; **no Zita V2 uploaded**; **untouched** by V2 cutover. |
| **Next (after resume)** | Integrate owner deliverables on development → explicit authorization → production prep per audit manifest → preview → launch verify → publish. |
| **Provisional effort** | **~12–25 hours** focused work remaining to launch after owner deliverables — estimate only. |

---

## Environments

| Layer | State |
|---|---|
| **Git `main`** | Checkpoint **`9f51fd2`** on **`origin/main`** (Originals URL + Organization JSON-LD). |
| **Published dev theme** | **Zita V2 — Development** `#192367558949` on `zitas-art-studio-development.myshopify.com` (password-protected). |
| **Production store** | Permanent domain **`zitasart.myshopify.com`** · primary **`www.zitasartstudio.com`**. Live theme **Flora `#145890541755`**. **No V2 theme.** **Not modified** for V2 cutover. |
| **Prior About push target** | Theme `#192659095845` **no longer exists** — historical; see recovery audit. |

Recovery detail: [architecture/v2-recovery-audit-2026-10-23.md](architecture/v2-recovery-audit-2026-10-23.md).
Parity detail: [architecture/production-parity-audit.md](architecture/production-parity-audit.md).

---

## Restart sequence (paused — do not execute)

1. Receive Ranjeeta’s completed deliverables.
2. Review and approve artwork/collection content.
3. Resolve outstanding owner decisions.
4. Update and verify the development storefront.
5. Obtain **explicit authorization** to begin production preparation.
6. Execute the production dependency manifest ([production-parity-audit.md](architecture/production-parity-audit.md)).
7. Complete production preview and launch verification (checkout **verify only** on production config).
8. Obtain final owner approval before publishing V2.

---

## Launch critical path

1. Project documentation refresh — **done**.
2. Fix Shopify Bundles inventory / availability error messaging — **implemented + tested** on development.
3. Stage 2B controlled development trial import — **done**.
4. Validate imported products, images, pricing, inventory on development — **done** (Admin + storefront samples; residual exceptions documented).
5. Extract and migrate relevant production **collections** — **done on development** (Stage 3B).
6. Complete approved **Active** product migration on development (30 / published) — **done**; **production cutover paused**.
7. Essential content, commerce, mobile, accessibility, and SEO QA — **development substantially complete**; MerchantSignals full scan still open; owner content approvals open.
8. Ranjeeta’s deliverables + final approval — **waiting** (**PAUSE gate**).
9. Deploy to production — **HOLD** until explicit authorization.
10. Production smoke testing — **not started**.

Parallel where safe: content approvals (About portrait, Portfolio art/copy, Contact placeholders, policies), Shop Pay decision, series editorial copy, collection featured images, `water-ii` inventory decision.

---

## Page / surface status

Distinguish **implemented** (code exists) from **tested**, **owner-approved**, and **launch-ready**. Implementation alone is not launch-ready.

| Surface | Implemented | Tested (dev) | Owner-approved | Launch-ready |
|---|---|---|---|---|
| Homepage + shell (header/footer/announcement) | Yes | Admin menus PASS; HTML **BLOCKED** (password) | Design generally approved (teal homepage) | **No** — content/SEO/visual QA |
| Originals / series PLP | Yes | Admin membership **Verified** (30 + series counts); HTML smoke **BLOCKED** | Design accepted direction | **No** — owner visual QA + editorial polish |
| Original artwork PDP | Yes | Strong on PoC + QA fixtures; migrated Admin data PASS; live HTML **BLOCKED** | **Not** final PDP approval | **No** |
| Default product template | Yes (V2 artwork layout) | Partial | — | **No** |
| Cart (`/cart`) | Yes | Owner functional preview; broader regression open | Preview passed (not full regression) | **No** |
| About | Yes (published M2) | Local + hosted; portrait still missing | Biography / portrait **not** signed off | **No** |
| Exhibitions | Yes (published M3, `9697dba`) | Hosted visual QA pending Praveen; asset gaps | Design approved; content incomplete | **No** |
| Contact | Yes | Prefill verified; full CAPTCHA POST **Requires verification** | Layout approved; commission placeholders remain | **No** |
| Portfolio | Yes | Hosted visual QA open | Copy / real art **not** approved | **No** |
| 404 | Yes (published M2) | Local verified | — | Near-ready pending full-site QA |
| Policies (V2) | Admin bodies **Yes**; Claude Design layout **implemented** on `#192367558949` (native URLs; TOC; Other policies; footer legal bar) | Browser **Verified** (authenticated); Contact Information has no TOC (&lt;3 headings) | Owner content + final visual sign-off **open** | **No** |
| Favicon | Yes (Z monogram assets + Theme setting + meta-tags on `#192367558949`) | Asset deploy **Verified**; browser tab **BLOCKED** (password) | Monogram acceptable pending owner visual OK | **No** — password QA + optional Theme Editor pin |

---

## Commerce functionality

| Capability | Status |
|---|---|
| Single-variant products | Implemented; verified on PoC |
| Multi-option variants | Implemented; Size/Finish + diptych QA fixtures verified on **dev** |
| Price / availability sync on variant change | Implemented; verified on fixtures |
| Add to Cart | Implemented; verified on fixtures / available bundles |
| Cart line display | Implemented; bundle `item_components` on cart **Verified** (dev) |
| Shopify Bundles (dev) | **Installed**; available parent ATC verified earlier; **L-PDP-17 on live theme** (parity with `335d890`) — **Requires verification** on Draft `artwork-bundle` behind password |
| Shopify Bundles (production) | **Not installed** |
| Artwork inquiry → Contact | Implemented + prefill verified (`c11f7e1`) |
| Contact form submit / CAPTCHA | **Requires verification** |
| Mobile sticky ATC | Implemented; desktop/tablet floating bar added (IO); full responsive QA open |
| Collection Quick Add | Implemented on artwork cards (single-variant direct add) |
| Checkout | **Not** end-to-end verified; Phase 4 storefront cart/checkout **BLOCKED** |

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

### Stage 2B — Development catalog import — **complete**

- Trial four + remaining 26 imported as Draft, then standardized (dimensions + `original` template).
- Development catalog: **35** products (30 migrated + 5 golden/QA/bundle).
- Reports under `data/catalog-migration/output/stage-2b-*` (gitignored).

### Stage 3A — Collections / navigation audit — **complete**

- Production: **13** collections; development baseline: **4**.
- Matrix + nav plan: `data/catalog-migration/output/stage-3-collections/`.

### Stage 3B — Publish + collections + nav — **complete** (development only)

| Result | Value |
|---|---|
| Migrated artworks Active | **30 / 30** |
| Online Store published | **30 / 30** |
| Development collections | **9** (incl. frontpage) |
| Originals membership | **30** migrated artworks (QA/bundle excluded; owner-confirmed) |
| Originals handle | **`originals`** (renamed 2 Nov 2026 from `v2-poc-original-artworks`; Admin `redirectNewHandle` → `/collections/v2-poc-original-artworks` → `/collections/originals`) |
| Series collections | Walking the Trail 5 · Colored by Nature 5 · Sand and Cloud 6 · Reverence 4 · Elements 6 · Good Things Come in Pair 6 · New Works 2 |
| Navigation | `main-menu`: Featured Series (first 3) + Explore More (rest); All Originals → `/collections/originals` (resource menus auto-updated with handle) |
| Footer | `footer-art` (Explore Art) + `footer-studio` (The Studio) only in main columns (no CONTACT details column); `footer-legal` bottom bar: Shipping · Returns · Privacy · Terms · **Contact Me** → `/pages/contact` |
| Results | `stage-3b-implementation-results.md` |
| Production | **Untouched** |

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
| Deferred | Cart drawer, currency selector, predictive search overlay |

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

**Pause gate (owner):** Artwork workbook · collection workbook · Water II · policies · paired/bundle decision · development visual/content approval.

**After resume (technical):** MerchantSignals full scan · integrate approved content · production prep per [production-parity-audit.md](architecture/production-parity-audit.md) · unpublished V2 upload (only when authorized) · production checkout **verification** (do not migrate commerce config) · publish.

**P1 polish:** Sticky header + floating PDP bar + Quick Add **implemented** — manual QA/sign-off open (`docs/qa/ux-refinements.md`) · Shop Pay decision/impl · noncritical SEO/alts · series blurbs · performance samples · owner-editability QA.

**P2 post-launch:** Future bundle merchandising expansions · extra editorial/animation · expanded SEO monitoring · archive legacy products after confidence window.

Full prioritized list: [`launch-readiness-checklist.md`](launch-readiness-checklist.md).

---

## Explicitly deferred until after launch

- Cart drawer (C2), predictive search overlay (C4), country/currency selector (C5)
- PLP image browsing (Quick Add shipped as V2 polish)
- Extra layout variants beyond approved Claude designs
- Automatic conversion of paired listings into Shopify Bundles
- Inactive (draft/archived/unlisted) product migration
- Deleting or renaming production products without approval

---

## Milestone history (keep for evidence)

### Policy Page + Footer Legal Navigation — Claude Design Handoff Received (1 Nov 2026)

| Item | Status |
|---|---|
| **Handoff directory** | `references/claude-design/handoff/policies/` |
| **Primary spec** | `Policy Pages Implementation Handoff.md` (+ package `README.md`) |
| **Design references** | `reference/source/Policy Page.dc.html`, `Zita Footer.dc.html` (+ shell/runtime/`zita-v2.css`/`_ds`) |
| **Screenshots** | `references/claude-design/screenshots/v2/policy-*.jpg` (**8** files: desktop ×2, mobile ×4, footer desktop/mobile) |
| **Shopify constraints** | Native policy URLs only; Shopify-managed policy HTML; no duplicate Pages / no `templates/policy.json`; detect `request.page_type == 'policy'`; CSS adapt `.shopify-policy__*`; minimal JS for “On this page”; footer legal bar (no Legal column): Shipping · Returns · Privacy · Terms · Contact information |
| **Prototype exclusions** | Orange specimen notice must not ship; duplicate “On this page” in stitched shots is a capture artefact — render one nav per breakpoint |
| **Visual approval** | Operator confirmed design screenshot; live theme browser QA **Pass** (owner final sign-off still open) |
| **Cursor implementation** | **Done** on `#192367558949` — see [`docs/qa/policy-page-implementation.md`](qa/policy-page-implementation.md) |

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
