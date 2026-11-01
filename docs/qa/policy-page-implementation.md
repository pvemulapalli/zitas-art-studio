# Policy Pages & Footer Legal — Implementation Report

**Date:** 1 November 2026  
**Store:** `zitas-art-studio-development.myshopify.com` only  
**Theme:** Zita V2 — Development `#192367558949`  
**Production:** untouched  
**Design source:** `references/claude-design/handoff/policies/` + `screenshots/v2/policy-*.jpg`

---

## Summary

Claude Design policy-page layout and approved footer legal bar are implemented on the development theme. Native `/policies/*` URLs and Admin policy bodies are unchanged. The temporary LEGAL footer column was removed.

---

## Files modified / added

| Path | Change |
|---|---|
| `theme/layout/theme.liquid` | `template-policy` body class; policy shell/grid; CSS/JS load; localized eyebrow via `<style>` |
| `theme/assets/zita-policy.css` | Editorial grid, TOC, body typography, Other policies, responsive rules |
| `theme/assets/zita-policy.js` | Heading-based On this page TOC; table wrappers; scroll-spy; reduced-motion aware |
| `theme/snippets/policy-other-links.liquid` | Other policies from `shop.policies`, excludes current |
| `theme/sections/zita-footer.liquid` | Removed LEGAL column; restored bottom-bar legal + copyright |
| `theme/sections/footer-group.json` | `legal_menu` → `footer-legal` |
| `theme/locales/en.default.json` | `policies.*` + `footer.legal_navigation` |

---

## Shopify architecture decisions

1. **No custom policy template** — Online Store 2.0 has no policy template type. Detection uses `request.page_type == 'policy'`.
2. **Native markup targeted** — live wrappers are `.shopify-policy__container`, `__title`, `__body` with `.rte`.
3. **Grid via Liquid wrapper** — `.policy-shell` / `.policy-grid` around `content_for_layout` + Other policies (avoids layout shift vs JS-only placement).
4. **`display: contents`** on `.shopify-policy__container` so title/body join the 12-column grid.
5. **Eyebrow** — localized CSS `::before` content injected from Liquid (no FOUC; no duplicate H1).
6. **TOC** — built client-side from real `h2` (fallback `h3`); shown only when ≥ 3 entries; desktop sticky nav + mobile `<details>` mutually exclusive by breakpoint CSS.
7. **Bold-paragraph TOC fallback** — not implemented (conservative resolution of handoff ambiguity).
8. **Footer links** — dedicated Navigation menu `footer-legal` (SHOP_POLICY items) assigned to footer `legal_menu`; short labels owner-editable.
9. **Policy content** — not copied into theme files; Admin remains source of truth.

---

## Menu changes (development Admin)

Created menu:

- **Handle:** `footer-legal`
- **Title:** Footer Legal
- **GID:** `gid://shopify/Menu/324863394085`
- **Items (order):** Shipping → Returns → Privacy → Terms → Contact information  
  All `SHOP_POLICY` type → native `/policies/*` URLs.

Assigned in `footer-group.json` as `legal_menu: "footer-legal"`.

---

## Design fidelity

| Criterion | Result |
|---|---|
| Asymmetric columns 4–10 for title/body | **Pass** (desktop ~col 4 start) |
| POLICIES eyebrow + large Marcellus H1 | **Pass** |
| Ink rule under title | **Pass** |
| Body ≤ 38em, Mulish ~18/1.7 | **Pass** |
| One desktop TOC + sticky | **Pass** |
| Mobile disclosure only (desktop hidden) | **Pass** |
| No specimen notice | **Pass** |
| Other policies excludes current | **Pass** |
| Footer: no LEGAL column; bottom-bar short links | **Pass** |
| Tablet 750–989 uses mobile structure | **Pass** (CSS `@media max-width: 989px`) |

---

## Browser verification (authenticated storefront)

| URL | Title | Body | TOC | Other policies |
|---|---|---|---|---|
| `/policies/refund-policy` | Pass | Pass | Pass (6× H2) | Pass (excludes Refund) |
| `/policies/privacy-policy` | Pass | Pass | Pass (14× H2) | Present |
| `/policies/terms-of-service` | Pass | Pass | Pass (10× H2) | Present |
| `/policies/shipping-policy` | Pass | Pass | Pass (8× H2) | Present |
| `/policies/contact-information` | Pass | Pass | **None** (1× H2 &lt; 3) | Present |

Also verified:

- Desktop visual match vs `policy-desktop-01/02`
- Mobile closed/open TOC vs `policy-mobile-01` / `-02`
- Footer short labels Shipping / Returns / Privacy / Terms / Contact information
- No horizontal overflow at 390px
- Inline body links teal + underline
- Explore Art / The Studio / Contact columns intact

---

## Known limitations

1. **Contact Information** has fewer than three headings → no On this page nav (by design).
2. **Other policies order** follows Shopify’s `shop.policies` enumeration, not a fixed design order.
3. **Scroll-spy** is optional enhancement; first TOC item is current on load.
4. **Sticky TOC `top`** uses `--site-header-offset` when the sticky header script sets it; otherwise `32px`.
5. Shopify preview/password bar can obscure the extreme bottom of the footer during themed previews.

---

## Owner decisions still outstanding

- Final policy copy (returns window, shipping timing, privacy contact email).
- Visual sign-off of live theme vs Claude screenshots.
- Separate content cleanup: obsolete Studio links (News, Commissions) noted in handoff — **not** changed in this task. Studio menu currently has About / Portfolio / Contact only (no News/Commissions).

---

## Follow-up — Footer refinements (1 Nov 2026, later same day)

### Footer CONTACT column

Removed the main-footer CONTACT column (email / phone / Instagram). Preserved Newsletter, Explore Art, The Studio, bottom legal bar, wordmark, copyright. Columns rebalanced to a two-column nav grid beside the newsletter.

### Contact Information policy navigation

| Surface | Change |
|---|---|
| `footer-legal` menu | **Contact information** (`SHOP_POLICY`) → **Contact Me** (`PAGE` `/pages/contact`) |
| Other Policies (`policy-other-links.liquid`) | Omits policies whose URL contains `contact-information` |
| Fallback legal loop | Also omits `contact-information` when no menu is assigned |
| Native Admin policy | **Preserved** — not deleted |

### Contact Information policy — keep in Admin?

| Question | Finding |
|---|---|
| Automated? | **No** — custom studio body (1 Nov 2026) |
| Referenced by Terms? | **Yes** — Terms “Related policies” mentions Contact Information page |
| Referenced by Privacy? | **Yes** — Privacy Contact section points to contact information policy |
| Checkout / native URL? | **Yes** — checkout policy URL exists; `/policies/contact-information` still serves 200 |
| Safe to delete now? | **No** — keep Admin record; remove from custom storefront nav only |

Public contact remains on `/pages/contact` (email, phone, form) plus main nav + The Studio + Contact Me.

### Browser QA (this follow-up)

- Desktop footer: Newsletter + Explore Art + The Studio only; legal Shipping · Returns · Privacy · Terms · Contact Me
- Mobile: two-column nav, no overflow; legal wraps left-aligned
- Contact Me → `/pages/contact` **Pass**
- Other Policies on Refund: Privacy, Shipping, Terms only (no Contact Information) **Pass**
- Contact Information URL still reachable (Admin retention) **Pass**

---

## Deployment

Scoped `shopify theme push` to `#192367558949` with `--nodelete --allow-live` for the files listed above only. Production untouched. No Git commit/push.

Follow-up push (footer refinements): `sections/zita-footer.liquid`, `snippets/policy-other-links.liquid` + Admin `menuUpdate` on `footer-legal`.
