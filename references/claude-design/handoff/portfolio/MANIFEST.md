# Zita's Art Studio V2 — Portfolio export package

Prepared for Cursor implementation. This package contains **only** the Portfolio page. All paths are relative to the repository root. Copy the `references/` folder from the ZIP into the repo root.

## Reading order
1. `references/claude-design/handoff/portfolio/Portfolio Implementation Handoff.md`
2. `references/claude-design/handoff/portfolio/assets/README.md`
3. Screenshots in `references/claude-design/screenshots/v2/portfolio-*.jpg`
4. `references/claude-design/handoff/portfolio/reference/`, only to check exact values

Precedence: the handoff Markdown comes first, then the reference source, then the screenshots.

## Unavailable or temporary (documented, not invented)
- Approved reflections for all five rooms. Two are provisional; three are blank.
- A high-resolution *Tangled* photo (the current file is 320 × 650).
- A clean *Yang – The Dark Side* photo (the current file is cropped from a framed mock-up).
- A real *Melting away* detail photo (currently a CSS zoom).
- The sixth-room variant is shown in the source only (prop `futureRoom`); there's no screenshot.

## Files

### `references/claude-design/handoff/portfolio/`
| Path | Purpose |
|---|---|
| `MANIFEST.md` | This file |
| `Portfolio Implementation Handoff.md` | Full specification: structure, patterns, responsive, content model, Shopify guidance, acceptance checklist |
| `assets/README.md` | Artwork asset manifest and placement map |
| `assets/jal-water-c.png` | Room I artwork (final) |
| `assets/melting-away.webp` | Room II artwork (final). Also the source of the temporary detail |
| `assets/colored-by-nature-purple.jpg` | Room III artwork (final) |
| `assets/yang-dark-side.png` | Room IV artwork (temporary crop) |
| `assets/tangled.webp` | Room V artwork (temporary, low resolution) |
| `assets/originals/Yang_Dark_Side_IMG_5133-framed-original.webp` | The supplied framed original the Yang crop came from |
| `reference/README.md` | How to run the source and preview the variant |
| `reference/source/Portfolio.dc.html` | Approved page source: template, inline styles, room data and pattern logic |
| `reference/source/Zita Header.dc.html`, `Zita Footer.dc.html` | Shared shell (already implemented in the theme) |
| `reference/source/Phone.dc.html`, `Proto Bar.dc.html` | Prototype-only frame and navigation |
| `reference/source/support.js` | Prototype runtime |
| `reference/source/zita-data.js` | Prototype data (header, footer and series quotes) |
| `reference/source/zita-v2.css` | V2 type tokens |
| `reference/source/image-slot.js` | Placeholder image-slot component (prototype only) |
| `reference/source/_ds/zita-s-art-studio-design-system-2425aac4-be73-49f2-8113-38d2f5adf854/` (8 files): `styles.css`, `_ds_bundle.js`, `tokens/{base,colors,effects,fonts,spacing,typography}.css` | Design-system tokens and component bundle |
| `reference/source/art/` (12 files): the five Portfolio works, plus `vaayu-air-c.png`, `uncolored-by-nature.jpg`, `prithvi-earth.webp`, `moonlit-waves.webp`, `longing-for-clouds.jpg`, `yin-dark-side-c.png` and the `jal-water-c.png` / `colored-by-nature-purple.jpg` header previews | Images the reference loads |

### `references/claude-design/screenshots/v2/`
| Files | Content |
|---|---|
| `portfolio-desktop-01…08.jpg` | About 1540px (924px preview at 60% zoom), top to bottom |
| `portfolio-tablet-01…10.jpg` | 924px, top to bottom |
| `portfolio-mobile-01…10.jpg` | 390px inside the phone frame, top to bottom, with review notes |

Screenshot notes:
- The capture tool ignores CSS transforms, so the Pair detail image appears less zoomed than it is live.
- At 924px the global header nav overlaps its icons. That's the header's own breakpoint, outside this scope.
- In mobile shots, "View *Melting away*" may appear to wrap. That's a capture artefact.
- The footer's "News" and "Commissions" links are obsolete (scope cleanup).
- The provisional notes and dashed reflection placeholders are review-only.
