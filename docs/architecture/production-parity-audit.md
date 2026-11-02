# Production Parity and Dependency Audit

**Status:** Complete (read-only) — 2 November 2026
**Git checkpoint:** `9f51fd2`
**Progress tracking:** [`docs/project-status.md`](../project-status.md)
**Owner dashboard:** [`docs/launch-readiness-checklist.md`](../launch-readiness-checklist.md)

Authenticated, read-only inspection of production after development-side parity work. **No production resources were modified.** Cursor canvas working copy (not in Git): local IDE canvases only.

---

## Verified production identity

| Item | Value |
|---|---|
| Permanent domain | `zitasart.myshopify.com` |
| Primary custom domain | `www.zitasartstudio.com` |
| Admin shop name | ZitasArtStudio |
| Plan / currency | Basic · USD |
| Auth used for audit | Collaborator CLI (`praveen@onbyte.com`) — store auth + theme list |
| Published theme | **Flora** · live · `#145890541755` |
| Unpublished themes | **None** |
| Zita V2 on production | **Not present** (not uploaded) |
| Production modified by V2 work | **No** |

Partner development store (never transferred): `zitas-art-studio-development.myshopify.com`, theme **Zita V2 — Development** `#192367558949`.

---

## Git vs development theme (summary)

| Finding | Detail |
|---|---|
| Identical files | **124** theme files byte-identical (Git `9f51fd2` vs live `#192367558949`) |
| Raw diffs | **10** (mostly Shopify comment headers / path vs `shopify://` URL form; cart `continue_url` blank on remote with Liquid default still `/collections/originals`) |
| `settings_data.json` | Empty `{}` in both Git and remote |

Theme **code** is portable via Git. Store **data** (catalog, menus, Files, metafields, pages, policies) is not.

---

## Production catalog and collections

| Item | Production finding |
|---|---|
| Products | **56** total · **30** Active · **18** Draft · **4** Archived |
| Collections | **13** |
| Series-like handles present | `walking-the-trail`, `good-things-come-in-a-pair`, `sand-and-cloud`, `reverence`, `elements`, `new-works`, `blackwhiteandgrey`, `petals` (title Colored by Nature), `skyscapes`, `miniature`, `frontpage`, plus example/demo collections |
| **Missing V2 handles** | **`originals`**, **`colored-by-nature`** (production uses `petals`) |
| Template suffixes | No `series` collection template suffix in use on production |

Active product count (**30**) aligns with the approved Active migration scope on development. Resource IDs do **not** match the Partner store.

---

## Metafields and metaobjects

| Item | Production finding |
|---|---|
| `custom.*` product definitions | **None** — all **5** V2 product defs missing |
| `custom.*` collection definitions | **None** — all **7** editorial defs missing |
| Existing definitions | Shopify taxonomy only (`shopify.*`) — leave in place |
| Metaobjects | Shopify taxonomy types only; no Zita exhibition metaobjects (V2 Exhibitions uses OS 2.0 blocks — OK) |

**Required before V2 content parity:** provision the **12** definitions documented in [`metafield-definitions.md`](metafield-definitions.md) (L-DEP-05). Do not invent values.

---

## Pages and navigation

| Production | V2 expectation | Gap |
|---|---|---|
| `/pages/about-me` | `/pages/about` (+ `page.about`) | Handle + template suffix |
| `/pages/contact-me` | `/pages/contact` (+ `page.contact`) | Handle + template suffix |
| `/pages/exhibitions` | `/pages/exhibitions` (+ `page.exhibitions`) | Template suffix / layout |
| *(missing)* | `/pages/portfolio` | Page + template |
| `/pages/commissions` | Not a V2 primary nav page | Legacy; redirect/nav plan |
| `main-menu` | Mega-menu: Originals + series + About/Exhibitions/Portfolio/Contact | Rebuild |
| `footer` (Search only) | `footer-art`, `footer-studio`, `footer-legal` | Create menus |
| `gallery` → `/collections` | Originals → `/collections/originals` | Rebuild |

Redirect plan (L-SEO-04) must cover legacy page and collection handles.

---

## Shopify Files

V2 templates reference development Files via `shopify://shop_images/...` (e.g. hero/About imagery). Production search did **not** find those V2 filenames (`vaayu-air-c.png`, `ranjeeta-portrait-crop-4x5.png`, `melting-away.webp`, favicon assets, portfolio fallbacks, etc.).

Related artwork may exist under **different** filenames (e.g. Moonlit Waves / Yin-Yang studio files). Theme Editor **rebind** or **re-upload** is required; do not assume automatic matching.

Bundled theme assets in Git (e.g. favicon PNGs under `theme/assets/`) transfer with the theme; Admin Files references do not.

---

## Native policies

| Policy | Production |
|---|---|
| Refund | **Present** |
| Shipping | **Missing** |
| Privacy | **Missing** (or not returned as a managed shop policy in the audit query set) |
| Terms of service | **Missing** |
| Contact information | **Missing** |

V2 footer legal bar expects native `/policies/*` links. Policy **wording** remains owner-approved — do not copy development bodies blindly.

---

## Production migration requirements (theme / Admin — not commerce)

| Component | Classification | Action when authorized |
|---|---|---|
| Zita V2 theme | Missing on production | Upload **unpublished** from Git; keep Flora live |
| Custom metafields (12) | Missing | Provision definitions; then fill values |
| Collection `originals` | Missing | Create + membership + redirects |
| `colored-by-nature` vs `petals` | Reconcile | Map handle / redirect; series template |
| Menus | Missing V2 structure | Rebuild main + footer menus |
| Pages | Reconcile / missing Portfolio | Create/assign templates; redirects |
| Files / Theme Editor images | Missing V2 filenames | Upload or rebind |
| Policies | Incomplete | Create missing natives; owner approve copy |
| Catalog content polish | Owner workbooks | Deferred until Ranjeeta deliverables |

---

## Owner-dependent requirements

Tracked on the owner dashboard in [`launch-readiness-checklist.md`](../launch-readiness-checklist.md):

- Artwork content workbook (30)
- Collection content workbook (8)
- Water II inventory decision
- Policy wording and approvals
- Paired-artwork / bundle decision (example bundles + pricing)
- Final visual and content approval of the **development** storefront

---

## Production commerce configuration — excluded

**PRODUCTION AUTHORITATIVE — DO NOT MIGRATE FROM DEVELOPMENT**

- Payment providers
- Shop Pay
- Tax rules
- Shipping rates, fees, zones, and profiles
- Checkout configuration

These are **launch-verification** activities only, never migration tasks.

---

## PRODUCTION DEPLOYMENT HOLD

**Do not** upload, install, preview-publish, or otherwise introduce Zita V2 into the production Shopify store until **Praveen explicitly authorizes** resuming production preparation.

Reason: Ranjeeta should continue reviewing the approved **development** storefront without an unfinished V2 theme appearing in production Admin. Flora `#145890541755` remains live.

During the hold, do **not** change production products, collections, pages, menus, Files, policies, or metafields for V2 cutover work.

---

## Restart sequence (do not execute while paused)

1. Receive Ranjeeta’s completed deliverables.
2. Review and approve artwork/collection content.
3. Resolve outstanding owner decisions.
4. Update and verify the development storefront.
5. Obtain **explicit authorization** to begin production preparation.
6. Execute the production dependency manifest (theme unpublished upload + Admin resources above).
7. Complete production preview and launch verification (including production checkout — verify only).
8. Obtain final owner approval before publishing V2.

---

## Definition of done (this audit)

We know how to reproduce the approved development experience on production: **Git theme upload** plus **separate Admin configuration** for catalog, collections, metafields, menus, pages, Files, and policies — while **leaving payment, tax, shipping, and checkout untouched**.
