# Zita's Art Studio V2 — Policy pages & footer legal links package

Prepared for Cursor implementation. This package covers the **policy page layout** and the **footer legal navigation bar** only.

## Install
These files are already at their final repository locations (the export’s nested `references/` wrapper has been flattened). Paths below are repo-root-relative.

| Destination | Contents |
|---|---|
| `references/claude-design/handoff/policies/` | Implementation handoff and reference source |
| `references/claude-design/screenshots/v2/` | 8 Policy / footer screenshots (`policy-*.jpg`) |

## Reading order for Cursor
1. `handoff/policies/Policy Pages Implementation Handoff.md`: the corrected Shopify approach, exact values, mobile, the footer bar and the checklist.
2. Screenshots: `references/claude-design/screenshots/v2/policy-*.jpg`
3. `handoff/policies/reference/source/`, only to check exact values.

Precedence: the handoff Markdown comes first, then the reference source, then the screenshots.

This handoff **supersedes** the earlier `handoff/policies/Policy Pages Handoff.md` (template assumption corrected) and answers `docs/design/policy-footer-design-audit.md` §6, items 1–4 (audit doc may live outside this package).

## Changes made in this package
- `Policy Page.dc.html`:
  - the specimen notice is marked `data-prototype-only` and can be hidden with the prop `showSpecimenNote`;
  - "Other policies" now includes Contact information.
  - The layout is otherwise unchanged.
- `Zita Footer.dc.html`: added the fifth legal link, "Contact information". The bottom bar's composition is unchanged.

## Files
### `references/claude-design/handoff/policies/`
| Path | Purpose |
|---|---|
| `README.md` | This file |
| `Policy Pages Implementation Handoff.md` | Implementation specification |
| `reference/source/Policy Page.dc.html` | Approved policy page source (desktop and mobile) |
| `reference/source/Zita Footer.dc.html` | Footer source, with the five legal links |
| `reference/source/Zita Header.dc.html`, `Phone.dc.html`, `Proto Bar.dc.html`, `support.js`, `zita-data.js` | Shell and prototype runtime, so the reference renders |
| `reference/source/zita-v2.css` | V2 type tokens (Marcellus + Mulish) |
| `reference/source/_ds/zita-s-art-studio-design-system-2425aac4-be73-49f2-8113-38d2f5adf854/` (8 files) | Colour, type, spacing and effect tokens, plus the component bundle |

To run: serve `reference/source/` with any static server and open `Policy Page.dc.html`. Use the Desktop / Mobile toggle in the prototype bar. To hide the specimen notice, set `showSpecimenNote` to `false` in the `data-props` JSON at the bottom of the file.

### `references/claude-design/screenshots/v2/`
| File | Content |
|---|---|
| `policy-desktop-01.jpg` | Header, title, "On this page" rail, body start (about 1540px) |
| `policy-desktop-02.jpg` | Body end, Other policies, footer start |
| `policy-footer-desktop.jpg` | Full footer with the five-link legal bar |
| `policy-mobile-01.jpg` | Mobile title and closed disclosure (390px, phone frame) |
| `policy-mobile-02-on-this-page-open.jpg` | Disclosure open |
| `policy-mobile-03.jpg`, `policy-mobile-04.jpg` | Body and Other policies |
| `policy-footer-mobile.jpg` | Mobile footer, legal links wrapping left-aligned |

## Screenshot notes
- The desktop shots are captured at 60% zoom, so the sticky "On this page" appears only where it sits in each frame. The duplicate seen in full-page stitched captures is an artefact (handoff §1).
- In the mobile shots, some short links appear broken onto two lines ("Privacy / policy", TOC items). That's a capture artefact of the zoomed frame; live, they're single-line 44px rows.
- The footer still shows News and Commissions in the Studio column. That's a separate cleanup (`Scope Cleanup - Obsolete Links.md`), deliberately not changed here.

## Remaining constraints
- Shopify controls the policy markup. Confirm the wrapper class names on the live store before writing selectors.
- "On this page" depends on the real policies containing headings. Policies written as plain paragraphs get no navigation, by design.
- Tablet layout is not drawn. The handoff recommends the mobile structure for 750–989px.
- The policy wording isn't reviewed or approved by design.
- **Not implemented in the theme yet.** Visual approval and Cursor Shopify adaptation are still pending.
