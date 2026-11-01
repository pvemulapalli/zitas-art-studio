# Favicon, Store Policies & Legal Footer — Completion Report

**Date:** 1 November 2026  
**Store:** `zitas-art-studio-development.myshopify.com` only  
**Theme:** Zita V2 — Development `#192367558949`  
**Production:** untouched  

Related status: [`docs/project-status.md`](../project-status.md). Launch checklist: L-BR-01/02, L-CNT-06.

---

## 1. Favicon source and configuration

### Brand audit

| Source checked | Finding |
|---|---|
| Theme assets | No prior favicon / logo image |
| Theme settings | No favicon `image_picker` before this work |
| Layout / meta | No favicon `<link>` tags |
| Design system | Approved wordmark is typography-led `ZITA'S \| ART STUDIO` (no separate emblem) |
| Claude Design / references | No approved monogram or favicon asset |
| Production `zitasartstudio.com` | `/favicon.ico` 404; no recoverable brand mark for reuse |

**Choice:** Create a simplified **Z monogram** using approved V2 tokens — deep teal `#0B4050` ground and gesso `#F8F8F6` letter — sized for 16–32px tabs. This is derived from the approved wordmark initial, not a new identity system.

### Assets added

| File | Role |
|---|---|
| `theme/assets/favicon.png` | 512×512 source / shortcut icon |
| `theme/assets/favicon-32.png` | 32×32 tab icon |
| `theme/assets/favicon-180.png` | Apple touch |
| `theme/assets/favicon.svg` | Vector source for regeneration |

### Theme wiring

- `config/settings_schema.json` — Theme settings group **Favicon** with `image_picker` id `favicon` (Theme Editor override).
- `snippets/meta-tags.liquid` — single favicon family:
  - Prefer `settings.favicon` when set.
  - Else fall back to bundled assets.
  - No second brand/favicon injection path added.

### Deployment

Pushed with `--only` to `#192367558949` (`--allow-live` on Partner development):

- `config/settings_schema.json`
- `snippets/meta-tags.liquid`
- `assets/favicon.png`, `favicon-32.png`, `favicon-180.png`, `favicon.svg`

Remote pull verification confirmed meta-tags + favicon assets on the live development theme.

Optional later: upload the PNG in Theme Editor → Favicon to pin it as `settings.favicon` (not required for the fallback to work).

---

## 2. Policy status (development Admin)

| Policy | Before | After (1 Nov 2026) | Notes |
|---|---|---|---|
| Privacy Policy | Present (Shopify automated, 31 Oct 2026) | **Unchanged** (automation locked) | API: *“Automatic management for Privacy Policy must be turned off…”* |
| Terms of Service | Missing | **Published** | Studio-adapted Shopify-style baseline |
| Refund Policy | Missing | **Published** | Conservative case-by-case; no invented return window |
| Shipping Policy | Missing | **Published** | US destinations from store shipping config |
| Contact Information | Missing | **Published** | `info@zitasartstudio.com` + `/pages/contact` |

Native storefront paths (password-gated on development):

- `/policies/privacy-policy`
- `/policies/terms-of-service`
- `/policies/refund-policy`
- `/policies/shipping-policy`
- `/policies/contact-information`

Checkout-rendered policy URLs (HTTP **200** verified):

- Privacy: `…/policies/55827104037.html`
- Contact: `…/policies/56622154021.html`
- Shipping: `…/policies/56622186789.html`
- Refund: `…/policies/56622219557.html`
- Terms: `…/policies/56622252325.html`

Commerce context used for drafting:

- Catalog focus: original paintings (+ paired/bundle fixtures); prints not a confirmed launch merchandising model on development.
- Shipping zones: **United States only** (`shipsToCountries: ["US"]`; `includeRestOfWorld: false`).
- PDP “Shipping & packing” accordion title exists; body content still empty pending owner copy.
- Production refund page (legacy) used Shopify’s 30-day template and `zitasartgallery@gmail.com` — preserved as **owner decision input**, not republished as-is.

Draft HTML for published custom policies: [`policy-bodies.json`](policy-bodies.json).

---

## 3. Policy drafts (summary)

### Privacy Policy — retained Shopify automation

Keep Shopify’s generated Privacy Policy. Do not manually overwrite while automation is on.

**Follow-up:** Store contact used inside the generated text still points at the development admin email (`vipshopper@tuta.io`). Update **Settings → General** contact / regenerate privacy so customer-facing privacy contact becomes `info@zitasartstudio.com`.

### Terms of Service — published

Covers website use, product/availability language for originals, pricing/checkout, IP (physical ownership vs copyright), order acceptance, related policies, and contact — without inventing a governing jurisdiction.

### Contact Information — published

- Email: `info@zitasartstudio.com`
- Link: `/pages/contact`
- No invented physical address or telephone number

### Shipping Policy — published

- US shipping destinations (from Admin)
- Careful artwork packaging
- Processing/dispatch vary; contact studio for timing
- Rates/options at checkout; estimates not guarantees
- Tracking when carrier provides it
- Damage-in-transit: contact with photos; keep packaging
- No invented carrier SLAs or international promises

### Refund / Return Policy — published (conservative)

Live development policy:

- Contact studio before any return shipment
- Damaged / incorrect items: prompt notice + photos
- Undamaged originals: case-by-case after contact
- Prints/other products: confirm with studio unless product page states otherwise
- Approved refunds to original payment method after inspection
- Email `info@zitasartstudio.com` / Contact page

Full HTML in `policy-bodies.json` → `REFUND_POLICY`.

---

## 4. Unresolved owner decisions

| Decision | Why it matters | Suggested options |
|---|---|---|
| Original artwork return window / final-sale rule | Live policy is intentionally case-by-case | Keep case-by-case; or adopt a fixed window; or “final sale except damage/error” |
| Who pays return shipping (when a return is approved) | Production template said customer pays; not confirmed for V2 | Customer / studio / case-by-case |
| Whether production’s 30-day template still applies | Legacy policy exists on production with outdated Gmail | Confirm, rewrite, or retire at cutover |
| Print / non-original return rules | Prints may return later | Separate print clause when prints launch |
| Shipping processing / transit targets | Customers ask; we avoided invented days | Approve numeric ranges only when operationally true |
| International shipping | Dev ships US only | Keep US-only or expand zones + rewrite shipping policy |
| Privacy automation + public contact email | Generated privacy still shows admin email | Fix store contact / regenerate privacy |
| Theme Editor favicon pick | Fallback assets work; Editor pin is optional | Upload `favicon.png` into Theme settings → Favicon |
| Legal review | Policies are operational drafts, not counsel-approved | Owner/counsel review before production cutover |

**Proposed refund clause (NOT published — owner confirm):**  
Legacy production text offered a 30-day return if item condition matches receipt, return authorization required, customer-paid return shipping, no returns on sale items/gift cards, contact formerly `zitasartgallery@gmail.com`. If adopted for V2, replace contact with `info@zitasartstudio.com` and explicitly state whether originals are included or excluded.

---

## 5. Footer legal links

`zita-footer` already prefers a Policy menu when set; otherwise lists `shop.policies` automatically.

Current footer-group: `legal_menu` is blank → **native `shop.policies`**.

After this work, the automatic legal row should include Privacy, Terms, Refund, Shipping, and Contact (policy title). Studio column already links the Contact **page**.

No footer redesign. Explore Art / The Studio menus unchanged.

---

## 6. Verification results

| Check | Result |
|---|---|
| Favicon theme files on `#192367558949` | **Pass** (push + pull) |
| Duplicate conflicting favicon systems | **Pass** — one family in `meta-tags.liquid` |
| All five shop policies exist in Admin | **Pass** |
| Checkout policy HTML URLs | **Pass** (HTTP 200) |
| Storefront `/policies/*` HTML | **Blocked** — 302 → `/password` |
| Footer legal links in browser | **Blocked** by storefront password |
| Mobile footer | **Not visually verified** (password) |
| Main / footer-art / footer-studio nav | **Unchanged** (no menu writes) |
| Production store | **No writes** (development auth + `--store` only) |

---

## 7. Remaining launch dependencies

- Password-session visual QA of favicon + footer legal links
- Owner decisions in §4 (especially returns + privacy contact)
- Optional Theme Editor favicon assignment
- Production cutover of policies + favicon (Phase B) after approval
- Counsel/owner legal review before public launch

---

## 8. Files touched

### Theme (deployed to development)

- `theme/config/settings_schema.json`
- `theme/snippets/meta-tags.liquid`
- `theme/assets/favicon.png`
- `theme/assets/favicon-32.png`
- `theme/assets/favicon-180.png`
- `theme/assets/favicon.svg`

### Docs

- `docs/launch/favicon-policy-completion.md` (this file)
- `docs/launch/policy-bodies.json`
- `docs/project-status.md` (status rows)

### Admin (development only)

- Shop policies: Contact, Shipping, Refund, Terms created/updated via `shopPolicyUpdate`
- Privacy left on Shopify automatic management
