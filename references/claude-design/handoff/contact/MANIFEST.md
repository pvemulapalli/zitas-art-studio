# Zita's Art Studio V2 — Contact export package

Prepared for Cursor implementation. This package contains **only** the Contact page.

## Install
These files are already at their final repository locations (the export’s nested `references/` wrapper has been flattened). Paths below are repo-root-relative.

| Destination | Contents |
|---|---|
| `references/claude-design/handoff/contact/` | Implementation handoff, asset notes, reference source |
| `references/claude-design/screenshots/v2/` | 26 Contact screenshots (`contact-*.jpg`) |

## Reading order for Cursor
1. `handoff/contact/Contact Implementation Handoff.md`: the full specification, including form behaviour (§9), Shopify editing (§12) and the acceptance checklist (§14).
2. `handoff/contact/assets/README.md`: the asset map, which states that there are no approved images.
3. The screenshots.
4. `handoff/contact/reference/`: the source, only to check exact values.

Precedence: the handoff Markdown comes first, then the reference source, then the screenshots.

## Unavailable (not invented)
- Commission photos: three optional slots, no approved images yet.
- Approval of the design-written copy (listed in §13).
- The send-failure state screenshot. It can only be seen with `formState: "sendError"` in the reference.

## Change made while packaging
In `Contact Form.dc.html`, the native radio `checked` state now syncs when a band button preselects a type. Previously the tile highlighted but the radio attribute could lag. There's no visual or behaviour change to the approved design.

## File manifest (55 files)

### `references/claude-design/handoff/contact/`
| Path | Purpose |
|---|---|
| `Contact Implementation Handoff.md` | Final implementation specification |
| `assets/README.md` | Asset manifest and placement map (no approved images) |
| `reference/README.md` | How to run the source and preview the states |
| `reference/source/Contact.dc.html` | Approved page source |
| `reference/source/Contact Form.dc.html` | Approved form source: fields, conditional fields, validation, states |
| `reference/source/Zita Header.dc.html`, `Zita Footer.dc.html` | Shared shell components (already implemented in the theme) |
| `reference/source/Phone.dc.html`, `Proto Bar.dc.html` | Prototype-only frame and navigation bar |
| `reference/source/support.js` | Prototype runtime |
| `reference/source/zita-data.js` | Prototype data used by the header and footer |
| `reference/source/zita-v2.css` | V2 type tokens (Marcellus + Mulish) |
| `reference/source/image-slot.js` | Placeholder image-slot component (prototype only) |
| `reference/source/_ds/zita-s-art-studio-design-system-2425aac4-be73-49f2-8113-38d2f5adf854/` (8 files): `styles.css`, `_ds_bundle.js`, `tokens/{base,colors,effects,fonts,spacing,typography}.css` | Design-system tokens and bundle needed to render the reference |
| `reference/source/art/` (9 files) | Images used only by the shared header's dropdown preview. **None appear on the Contact page** |

### `references/claude-design/screenshots/v2/`
| Files | Content |
|---|---|
| `contact-desktop-01…04.jpg` | Desktop at about 1540px, top to bottom |
| `contact-tablet-01…06.jpg` | The desktop layout at 924px, top to bottom |
| `contact-mobile-01…07.jpg` | Mobile at 390px, top to bottom (phone frame and review notes) |
| `contact-state-desktop-01-validation-errors.jpg` | Empty submit: summary plus inline errors |
| `contact-state-desktop-02-commission-preselected.jpg` | After "Start a commission inquiry": Commission selected, its 2 optional fields shown |
| `contact-state-desktop-03-trade-preselected.jpg` | After "Trade or designer inquiry": Trade selected, Company and Project fields shown |
| `contact-state-desktop-04-artwork-selected.jpg` | Artwork inquiry: the single optional Artwork name field |
| `contact-state-desktop-05-invalid-email-values-kept.jpg` | Invalid email: one error, other values kept |
| `contact-state-desktop-06-success.jpg` | Success panel |
| `contact-state-mobile-01-commission-preselected.jpg` | Mobile: the band CTA before scrolling to the form |
| `contact-state-mobile-02-validation-errors.jpg` | Mobile: error summary with Commission selected |
| `contact-state-mobile-03-commission-fields.jpg` | Mobile: commission optional fields and message |
