# V2 recovery audit — 23 October 2026

**Purpose:** Read-only audit after project pause. No theme, Git, or Shopify mutations were performed during this audit.

**Authoritative owner decisions for planning:** recorded in [project-status.md](../project-status.md) § “Owner decisions (recovery, Oct 2026)”.

---

## 1. Repository and Git state (evidence)

| Item | State |
|---|---|
| Branch | `main`, tracking `origin/main` (no unpushed commits at audit time) |
| Latest commit | `ced70a1` — Import About and Exhibitions Claude Design handoffs |
| Prior commerce commit on `main` | `3ecb3d2` — V2 full cart page (C1) |
| **Uncommitted theme work** | Full About stack (see below) + `theme/locales/en.default.json` |

**Local About implementation (all untracked except locale modification):**

- `theme/templates/page.about.json`
- Seven sections: `zita-about-opening`, `zita-about-chapter-words`, `zita-about-chapter-practice`, `zita-about-chapter-fullbleed`, `zita-about-chapter-atlas`, `zita-about-chapter-reflection`, `zita-about-closing`
- `theme/snippets/about-surface.liquid`
- `theme/assets/zita-about.css`, `theme/assets/zita-about-reveal.js`

**Committed but not necessarily on published storefront theme:** Header (`e8b6d65`), PDP (`7a435c8`), PLP, homepage, C1 cart — status doc previously noted deploy parity gaps; remote theme file diff was **not** completed in this audit (see § About discrepancy).

---

## 2. Partner dev store themes (evidence)

Read-only `shopify theme list --store zitas-art-studio-development.myshopify.com`:

| Theme | Role | ID |
|---|---|---|
| **Zita V2 — Development** | **[live] published** | `#192367558949` |
| Horizon | unpublished | `#192336593189` |

**Theme `#192659095845` does not exist** on this store. Prior session pushed About files only to that ID (unpublished dev copy). Any code on that theme is **unreachable** after theme removal.

**Implication:** Ranjeeta’s demo almost certainly used the **published** theme `#192367558949`, which likely **never received** the About push.

**Not verified in this audit (blocked / not run):** file-level diff of `#192367558949` vs local tree; Admin Page record for About; menu links; Theme Editor image assignments.

---

## 3. About page discrepancy — root cause and safest fix

### Findings

| Check | Result |
|---|---|
| Seven About sections locally | **Yes** — all seven section files + surface snippet + CSS/JS |
| `page.about.json` locally | **Yes** — seeds Vaayu + Moonlit via `shopify://shop_images/…`; Ch 02 photos intentionally empty; most other image slots unassigned in JSON |
| Theme `#192659095845` | **Absent** — prior upload target invalid |
| Published theme `#192367558949` | **Unknown** — pull/compare not completed; **high confidence** About template/sections missing given wrong push target |
| Dev store About **Page** + template suffix | **Unknown** — requires read-only Admin or GraphQL |
| Navigation | Header reads **Shopify menu** (`section.settings.menu`); About visibility depends on menu + page existence — **not verified** |
| Theme Editor images | Only `vaayu-air-c.png` and `moonlit-waves.webp` were confirmed uploaded historically; portrait, atlas plates, Yin, Melting Away likely **unassigned** |

### Primary root cause (confirmed)

**Theme mismatch:** About code was pushed to a **non-published, since-deleted** theme (`#192659095845`), while the storefront demo uses **published** **Zita V2 — Development** (`#192367558949`).

### Contributing factors (likely)

1. About work **never committed** — easy to lose sync between machines and remote themes.
2. **Admin/content** may be incomplete even after code deploy (Page with `about` template, menu link to `/pages/about` or correct handle).
3. **Empty image slots** can make the page look broken even when sections render.
4. **Password-protected** dev store — wrong `preview_theme_id` or missing password can show an unexpected theme.

### Safest fix (requires explicit approval before any write)

1. **Read-only verify:** `theme pull` or Admin — confirm `#192367558949` lacks About files.
2. **Deploy code only** to `#192367558949` (or push entire theme diff from Git once About is committed) — **do not** `--allow-live` on production merchant store.
3. **Admin (no settings overwrite from CLI):** Create or confirm **Page** “About the Artist”, handle e.g. `about`, assign template **about**.
4. **Navigation:** Add About (and Exhibitions, Contact when built) in **Online Store → Navigation**; remove News if still present; keep owner-managed Originals submenu.
5. **Files + Theme Editor:** Upload handoff artwork from `references/claude-design/handoff/about/`; assign in section settings; **do not** invent Ch 02 photography.
6. Visual QA vs `references/claude-design/screenshots/v2/about-*` → then **commit** About to Git.

---

## 4. Owner requirements vs current V2 (gap summary)

| Area | Owner decision (Oct 2026) | Current repo state |
|---|---|---|
| Homepage teal | Keep unchanged | Implemented (no change requested) |
| Header / nav | Approved; owner series submenu; About, Exhibitions, Contact; no News; favicon before launch | `zita-header.liquid` menu-driven; News removal is **Admin menu** task; **no favicon** in theme audit |
| PDP description | Concise description near title / buy box | Description lives in **`zita-artwork-story`** band, not adjacent to buy box |
| PDP attributes | Hide Year, Framing; keep Medium, Surface, Size; fix COA repetition | Shows **Size, Medium, Hanging (ready_to_hang), Certificate** — no Year; **Surface** not rendered; **Hanging** may map to “Framing” owner wants hidden |
| ATC copy | **“Add to Cart”** (and related strings) | Locale uses **“bag”** throughout (`add_to_bag`, `view_bag`, cart title “Your bag”) |
| Variants | Required for launch; Shopify-native; reference Vibrant Life diptych | **`product-purchase.liquid`** renders `<select name="id">` when `has_only_default_variant` is false; **JS updates price only** — no URL, media, or availability refresh on change; JSON cart add uses selected variant id |
| Cart / checkout | Full `/cart`; Shop Pay where supported; USD OK | **C1** cart implemented; **no** `payment_button` on `zita-product-artwork` (only legacy `product.liquid` skeleton) |
| About | Complete + visual QA before commit | **Local only**, not on published theme |
| Exhibitions | Approved design; metaobject proof first | Handoffs in repo; **no theme**; proof **not started** |
| Contact | Approved; **info@zitasartstudio.com** | Theme default email still **Gmail** in `settings_schema.json`; no Contact template in theme |
| Portfolio | Approved editorial rooms; 1–2 images; surfaces | **No handoff folder in repo** (only about, exhibitions, homepage, plp, pdp, header) — import gap |
| Policies | Draft editable policies later; owner decisions | Skeleton pages only; no V2 editorial policy template |
| Product data | Cleanup spreadsheet spec; no import in audit | See [product-cleanup-import-spec.md](product-cleanup-import-spec.md) |

### Variants — production reference (read-only)

`https://www.zitasartstudio.com/products/vibrant-life.js`:

- Option **Diptych**: values **Vibrant Life I** ($550) and **Vibrant Life I and II** ($1,000).
- V2 should support **arbitrary option count** via native `product.options` + variants (avoid hardcoding two options).
- **Recommendation:** Keep native variant picker (upgrade UX from bare `<select>` if design requires); on change refresh **price**, **availability**, **primary media** (if variant featured media exists), **URL** (`?variant=`), and **cart line identity**; sold-out options **disabled** (already partial). For diptych pairs, use **per-variant inventory = 1** and staff workflow; document in merchant import spec — no automatic “shared inventory” without Shopify Flow/app.

---

## 5. Feature and risk audit (condensed)

| Topic | Status | Notes |
|---|---|---|
| Search | Skeleton `search.liquid` | No V2 styling; header search goes to `/search`; tags/filters not audited on dev store |
| Collection editorial band | Implemented | Metafield-gated; owner content on collections |
| Related works | `zita-related-works` on `product.original.json` | Lazy-loaded recommendations |
| Shop Pay / accelerated checkout | **Gap on V2 PDP** | Not wired on original template |
| Cart inventory | C1 + PDP JSON add | One-of-one duplicate-bag guard in `zita-product.js` |
| Shipping / tax | Merchant Admin | Not audited |
| Mobile / a11y | Partial QA history | PDP viewer + header VO spot-checks still open |
| SEO / URLs | PoC handles on dev | Production URL preservation is Phase B concern |
| Theme Editor editability | Strong on homepage, PLP, PDP, About sections | — |
| Ranjeeta dev-store access | Assumed | Not verified in audit |

**Classifications:** About deploy = **technical + content**; email/favicon/menus = **merchant settings**; Portfolio/Contact handoffs missing = **content/repo gap**; predictive search / drawer / currency = **deferred**.

---

## 6. Recommended implementation order

See [project-status.md](../project-status.md) § “Recovery completion plan” for milestones and single next action.

---

---

## M1 follow-up (23 October 2026)

- QA theme **`#193116733733`** holds About; published **`#192367558949`** unchanged.
- Local repo reconciled to QA `page.about.json`; About approved for promotion after portrait Files upload.
- See [project-status.md](../project-status.md) § M1.5 closure and [v2-seo-foundation.md](v2-seo-foundation.md).

*Audit performed 23 October 2026. Update [project-status.md](../project-status.md) when milestones complete.*
