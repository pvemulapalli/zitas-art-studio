# Zita's Art Studio — Project Status

**Last updated:** 23 October 2026 (M2 — About + 404 promoted to published dev theme `#192367558949`; Git checkpoints on `main`, **not pushed**. See § M2.)

This is the **only** canonical record of project progress, current work, next steps and environment state. Other documents link here rather than tracking status themselves.

---

## Recovery audit summary (23 Oct 2026)

| Layer | State |
|---|---|
| **Git `main`** | **Local commits** for About, docs, 404 (M2); **not pushed** to `origin`. |
| **Published dev theme** | **Zita V2 — Development** `#192367558949` — **About + 404 deployed** (M2). |
| **Prior About push target** | Theme `#192659095845` **no longer exists** — explains Ranjeeta not seeing About on demo. |
| **Production store** | Untouched (Phase B). |

Full evidence and fix path: [architecture/v2-recovery-audit-2026-10-23.md](architecture/v2-recovery-audit-2026-10-23.md).

---

## Owner decisions (recovery, Oct 2026)

Authoritative for V2 completion planning (supersedes earlier “on hold” where noted).

| Topic | Decision |
|---|---|
| Homepage | Keep **existing teal**; design generally approved |
| Header / nav | Preserve approved design; owner-managed **current-series** submenu; **About, Exhibitions, Contact**; **no News**; **favicon before launch** |
| PDP | Short **description near buy box**; hide **Year** and **Framing**; keep **Medium, Surface, Size**; reduce **COA repetition**; **“Add to Cart”** (not bag) + a11y strings |
| Variants | **Required for launch** — Shopify-native, any option count (Original vs Print, print sizes); correct price/media/URL/availability/cart in a **later milestone** |
| Diptych inventory | Shared stock for solo A, solo B, and pair — **evaluate Shopify Bundles app** (dev prototype + Ranjeeta decision on listings vs variant model); **launch gate**; does not block ordinary variant work |
| Cart / checkout | **Full `/cart`** (no drawer); preserve **Shop Pay / accelerated checkout** where eligible; USD OK initially |
| About | Seven-chapter design; **finish + visual QA before Git commit**; seven surfaces; no invented Ch 02 photos |
| Exhibitions | Approved design; **V2 launch = OS 2.0 sections/blocks only** (no metaobjects, no custom product/collection linking this phase); historical rows without commerce links OK |
| Contact | Approved layout + inquiry types; **`info@zitasartstudio.com`** everywhere customer-facing |
| Portfolio | Approved room/series editorial; **1 or 2 images per room**; owner surfaces — **handoff not yet in repo** |
| Policies | Original **editable drafts** later; owner decisions on refunds, shipping, commissions, privacy — **Ranjeeta review before publish** |
| Product data | [Cleanup/import spreadsheet spec](architecture/product-cleanup-import-spec.md); **no catalog changes during audit** |
| Deferred | Cart drawer, currency selector, predictive search overlay, optional PLP quick-add |

---

## Completed

| Area | Notes |
|---|---|
| Reference research | [Dimitra Milan](research/dimitra-milan-audit.md), [Rinske Douna](research/rinske-douna-audit.md), [content & brand inventory](research/zita-content-brand-inventory.md) |
| Design | **Zita Design V2** approved by Ranjeeta (October 2026): [design brief](design/zita-design-brief.md), [V2 acceptance](design/design-v2-acceptance.md) |
| Architecture | Shopify Online Store 2.0, theme-first, Shopify Basic: [implementation plan](architecture/shopify-implementation-plan.md) |
| Theme foundation | Shopify Skeleton baseline in `theme/` |
| Partner dev store | `zitas-art-studio-development.myshopify.com` (Basic) |
| Phase A product-data proof | Essence V2 + Colored by Nature-Blue V2: [product schema](architecture/product-schema.md) |
| Metafield provisioning | 12 definitions on dev store: [metafield definitions](architecture/metafield-definitions.md) |
| Global V2 shell + Homepage | Header, footer, announcement, hero, Current Series, Selected Works |
| V2 PLP / collection gallery | Editorial band, filters, 8:9 plate refinement |
| Original-artwork PDP | Story, viewer, related works — commits `7a435c8` et al. |
| Header navigation | Originals mega-menu + mobile menu — `e8b6d65` |
| Commerce UX Gap Audit | READ-ONLY session (cart, Shop Pay, search, localization) |
| Phase D plan | [phase-d-implementation-plan.md](architecture/phase-d-implementation-plan.md) |
| C1 full cart page | Committed on `main` (`3ecb3d2`); owner functional preview passed; **regression QA before launch** |
| About / Exhibitions Claude Design sync | Committed `ced70a1`; manifest at `references/claude-design/about-exhibitions-MANIFEST.md` |
| Recovery audit (planning) | [v2-recovery-audit-2026-10-23.md](architecture/v2-recovery-audit-2026-10-23.md), [product-cleanup-import-spec.md](architecture/product-cleanup-import-spec.md) |

---

## M2 promotion (23 Oct 2026)

| Item | Status |
|---|---|
| **Theme backup** | `/tmp/zita-theme-backup-192367558949-1aowCn` (75 files, read-only snapshot before push) |
| **About on published** | Targeted `--only` push of full About stack + merged locale (`about.*`, `not_found.title` only; **remote cart strings preserved**) + `en.default.schema.json` template label |
| **404 on published** | `zita-not-found` section, CSS, `404.json` pushed |
| **About QA** | Local `http://127.0.0.1:9292/pages/about` — all **7 sections**; Ch 02 empty; **portrait crop still missing** in Files |
| **404 QA** | Local invalid URL — title **404 Not Found**, h1 **This room is empty**, CTAs **Return home** / **Browse original artworks**; no JS |
| **Template label** | `templates.page.about.name` → **About** deployed in schema locale; confirm in Theme Editor on live theme |
| **Public email** | **`settings_schema.json` default** updated locally; **saved theme setting on remote** may still need Theme Editor → Public email → `info@zitasartstudio.com` (settings_data not pushed) |
| **Navigation** | **Menus API access denied** — manual Admin: add **About** → `/pages/about`; defer **Exhibitions** (no page); remove **News** if present |
| **Theme Check** | 74 files, 0 offenses |

**Hosted About URL:** `https://zitas-art-studio-development.myshopify.com/pages/about` (store password).

---

## M1 About QA (23 Oct 2026)

| Item | Value |
|---|---|
| **QA theme** | **Zita V2 — About QA** `#193116733733` (unpublished) — duplicated from published `#192367558949`; `settings_data.json` + `index.json` verified identical to source |
| **Published theme** | Superseded by **M2** — About now on `#192367558949` |
| **About page** | **About the Artist** — handle **`about`**, published, **`templateSuffix: about`** (Page ID `178246123813`) |
| **Navigation** | **Not changed** (per M1 scope) |
| **Theme Check** | 73 files, 0 offenses (local, pre-push) |
| **Portrait crop** | **`ranjeeta-portrait-crop-4x5.png` not in Files** (Oct 2026) — manual upload required; QA/local JSON already reference it |

**Preview URL:** `https://zitas-art-studio-development.myshopify.com/pages/about?preview_theme_id=193116733733` (store password required)

**Theme Editor:** `https://zitas-art-studio-development.myshopify.com/admin/themes/193116733733/editor?previewPath=/pages/about`

---

## M1.5 closure (local, 23 Oct 2026)

| Item | Status |
|---|---|
| **About ↔ QA sync** | Local `page.about.json` synced to QA theme (incl. Theme Editor header); seven sections + assets match QA except locale/cart differences documented below |
| **Praveen About QA** | Technical design **approved**; promotion pending portrait upload + optional owner pass |
| **404** | **`zita-not-found`** section + `zita-not-found.css`; `404.json` updated — **local only**, not deployed |
| **Template label** | `locales/en.default.schema.json` → `templates.page.about.name`: **"About"** (Shopify schema locale convention) |
| **Public email default** | `settings_schema.json` default → **info@zitasartstudio.com**; **saved** remote theme settings still hold prior value until Theme Editor / settings_data update |
| **Locale reconciliation** | Local adds **`about.*`**, **`not_found.title`**, full **V2 cart** strings; published remote locale still **Skeleton cart** (`Cart` / `Update`) — deploy must **merge About (+404) keys only**, not replace entire locale |
| **SEO** | [v2-seo-foundation.md](architecture/v2-seo-foundation.md) — production baseline, V2 audit, page checklist, agency handoff |
| **Marketing agency** | Preview via password + QA `preview_theme_id`; do not index dev store |

---

## Owner content still pending (About)

| Item | Notes |
|---|---|
| **Portrait crop** | Upload `ranjeeta-portrait-crop-4x5.png` to Shopify Files |
| **Ch 02 photography** | Intentionally empty until Ranjeeta supplies |
| **Biography sign-off** | Provisional copy on page |

---

## Approved but not implemented (theme)

| Page / feature | Gate |
|---|---|
| **Exhibitions** | Handoff-faithful sections/blocks (editorial); investigate block limits at implementation time |
| **Contact** | Import/sync Claude handoff to repo (if not in ZIP), then build |
| **Portfolio** | Import handoff to repo, then build |
| **Policies (V2 editorial)** | After owner policy decisions + draft copy |
| **PDP commerce polish** | Description placement, attribute filter, Cart wording, variant UX, Shop Pay on `product.original` |
| **Favicon** | Asset + theme setting |
| **Public email (saved settings)** | After deploy: Theme settings → **info@zitasartstudio.com** (schema default updated locally only) |

---

## Launch blockers

1. **About content** — portrait Files upload; Ranjeeta sign-off; **main menu About link** (manual Admin).
2. **Variant-capable PDP on dev catalog** — PoC products are single-variant; need representative multi-variant product on **dev store only** for QA (pattern: Vibrant Life diptych).
3. **“Add to Cart” + cart copy alignment** — locale and header/cart strings still say “bag”.
4. **Shop Pay / accelerated checkout** — confirm Payments on dev store; add to V2 original PDP if eligible.
5. **C1 regression QA** — multi-line cart, stock edge cases, a11y (see Next).
6. **Exhibitions** — sections/blocks build (no metaobjects for V2 launch).
7. **Diptych / bundles** — Shopify Bundles eligibility + dev prototype + Ranjeeta listing model decision.
8. **Contact + Portfolio** — handoffs missing from `references/claude-design/handoff/`; import before build.
9. **Policies** — Ranjeeta decisions + draft review before publish.
10. **Favicon** — owner decision on asset; theme wiring before launch.

---

## Content / merchant decisions needed (Ranjeeta)

- Policy topics: refunds, returns, damage, shipping, international, cancellations, commissions, privacy, terms ([spreadsheet spec](architecture/product-cleanup-import-spec.md) for product rows).
- **Surface** field source and PDP display vs **Medium** / **Size**.
- **Certificate** vs description duplication — approve trimmed COA pattern.
- **Hanging / ready_to_hang** — confirm hidden with “Framing” or retained under another label.
- Diptych / paired inventory rules for originals.
- About story sign-off; Ch 02 photography when available; exhibition imagery.
- Series descriptions (Colored by Nature, BlackWhiteandGrey, Walking the Trail).
- Commission process copy (Contact surface, not standalone page).
- Newsletter / response-time promises (if any).
- Dev-store collaborator access confirmed for Theme Editor work.

---

## Deferred enhancements

- Cart drawer (C2) — **by design**
- Predictive search overlay (C4)
- Country / currency selector (C5)
- PLP quick-add / image browsing
- Extra layout variants beyond approved Claude designs

---

## Recovery completion plan

### Recommended order (small milestones)

| # | Milestone | Test |
|---|---|---|
| M0 | Read-only confirm published theme file list + Admin About page/menu | Checklist in [recovery audit §3](architecture/v2-recovery-audit-2026-10-23.md) |
| M1 | Done — QA theme `#193116733733` | — |
| M2 | **Done** — About + 404 on published `#192367558949`; Git commits local | § M2 |
| M2b | Portrait upload + nav About link + saved public email in Theme Editor | Admin |
| M3 | **Git commit** About after QA | Clean `main` |
| M4 | PDP: description near buy box; hide hanging/framing as agreed; Medium/Surface/Size; **Add to Cart** strings | Dev PDP PoC + multi-variant test product |
| M5 | Variant picker: price, availability, URL, media on change | Diptych-style product |
| M6 | Shop Pay on original PDP + C1 regression QA | Checkout smoke test on dev |
| M7 | Exhibitions page (sections/blocks, no metaobjects) | Theme Editor content |
| M8 | Import Portfolio + Contact handoffs → build → nav | Theme Editor content |
| M9 | Policy drafts in Admin + V2 policy templates when copy approved | Legal review |
| M10 | Favicon, `info@…` email, final deploy parity Git ↔ published theme | Pre-launch demo |

### Single next action

**Contact or Exhibitions theme build** (after handoff import where needed) — or **M2b Admin**: portrait upload, About menu link, confirm Theme Editor template label **About**, set saved public email to `info@zitasartstudio.com`. **Push Git commits to origin** when Praveen reviews.

---

## Environments

| Store | State |
|---|---|
| **Partner dev store** `zitas-art-studio-development.myshopify.com` | V2 on published theme **#192367558949**. Password-protected storefront. PoC products on `original` template. |
| **Ranjeeta's production store** | **Not modified** by V2 work. Phase B future. |

---

## Open inputs from Ranjeeta (non-blocking unless noted)

- Series descriptions; artwork facts per product; print strategy; commission pricing/timeline
- About/exhibition imagery; higher-res files
- Portfolio/Contact/Policies content after template builds

---

## Known limitations (About / Exhibitions design package)

- Screenshots at **924px** width; portrait crop — use `handoff/about/assets/ranjeeta-portrait-crop-4x5.png`.
- Provisional copy and missing images per MANIFEST — do not treat as verified.
- Prototype nav may still show **News** — owner decision: remove in Shopify menu only.

---

## Which documents to trust

See [README](../README.md#document-map). Status: **this file**. Recovery detail: [v2-recovery-audit-2026-10-23.md](architecture/v2-recovery-audit-2026-10-23.md). Phase sequencing: [phase-d-implementation-plan.md](architecture/phase-d-implementation-plan.md).
