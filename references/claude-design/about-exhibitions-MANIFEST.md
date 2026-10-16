# Zita's Art Studio V2 — About & Exhibitions export package

This package is prepared for Cursor implementation in the Shopify theme. It contains **only** the About and Exhibitions pages. Portfolio, Contact, Policies and the global design system are neither included nor modified.

## Install
Copy the `references/` folder from this package into the repository root. Every path below is the same in the package and in the repo.

| Destination | Contents |
|---|---|
| `references/claude-design/handoff/about/` | About handoff, Amendment 01, assets, reference source |
| `references/claude-design/handoff/exhibitions/` | Exhibitions handoff, Addendum 01, reference source |
| `references/claude-design/screenshots/v2/` | 61 reference screenshots |

## Reading order for Cursor
1. `handoff/about/About Implementation Handoff.md`, then `About Design Amendment 01 - Section Surfaces.md`
2. `handoff/exhibitions/Exhibitions Implementation Handoff.md`, then `Exhibitions Addendum 01 - Work and Series Links.md`
3. Screenshots, in numbered order. Each sequence scrolls from top to bottom at a 924px preview width.
4. Reference source, only to check an exact value. See each `reference/README.md`.

Precedence: the handoff Markdown (including the amendment and addendum) comes first, then the reference source, then the screenshots. The screenshots have known capture artefacts, listed in §12 of each handoff.

## Content status at a glance
- **Verified:**
  - exhibition titles, venues, places, works, the 3–17 April 2026 dates, IAVA figures, recognition, sold facts;
  - artwork images;
  - name and subtitle.
- **Provisional:**
  - the About editorial draft and chapter titles (awaiting Ranjeeta's sign-off);
  - the About Chapter 4 phrase-to-painting pairings;
  - the portrait crop;
  - the design-written lines on Exhibitions;
  - all **sample** product and collection links;
  - "The Blue" and "DAC Art Gallery" shown as one record;
  - the "Un Colored" / "Uncolored" spelling.
- **Missing:**
  - About: the fused-glass photo and the return-to-painting photo;
  - Exhibitions: images of Devi – The Divine Feminine, Indulgence and Adiyogi – The first Yogi;
  - years for the "Additional exhibitions" group;
  - Le Gateau solo exhibition dates;
  - installation photographs.
- **Scope changes to apply during implementation:**
  - remove News links;
  - point "Commission a painting" to `/pages/contact?type=commission#message`;
  - remove "Exhibition news" from the Exhibitions closing.

## File manifest (114 files)

### Root
| Path | Purpose |
|---|---|
| `MANIFEST.md` | This file |

### About: `references/claude-design/handoff/about/`
| Path | Purpose |
|---|---|
| `About Implementation Handoff.md` | Final implementation handoff |
| `About Design Amendment 01 - Section Surfaces.md` | Approved amendment: per-section background surfaces |
| `assets/README.md` | Asset notes |
| `assets/ranjeeta-portrait-crop-4x5.png` | Approved portrait crop, pre-rendered (800×1000). The portrait itself is provisional |
| `reference/README.md` | How to run the reference source |
| `reference/source/About.dc.html` | Approved page source (reference only) |
| `reference/source/Zita Header.dc.html`, `Zita Footer.dc.html`, `Phone.dc.html`, `Proto Bar.dc.html` | Shared shell components the source mounts (header and footer are already implemented; not part of this scope) |
| `reference/source/support.js`, `zita-data.js`, `zita-v2.css`, `image-slot.js` | Prototype runtime, data, V2 type tokens, placeholder component |
| `reference/source/_ds/…/styles.css`, `_ds_bundle.js`, `tokens/{base,colors,effects,fonts,spacing,typography}.css` (8 files) | Design-system tokens and bundle needed to render the reference |
| `reference/source/art/` (9 files): `vaayu-air-c.png`, `ranjeeta-portrait.webp`, `melting-away.webp`, `moonlit-waves.webp`, `longing-for-clouds.jpg`, `jal-water-c.png`, `prithvi-earth.webp`, `colored-by-nature-purple.jpg`, `yin-dark-side-c.png` | Verified artwork and portrait images used on the page |

### Exhibitions: `references/claude-design/handoff/exhibitions/`
| Path | Purpose |
|---|---|
| `Exhibitions Implementation Handoff.md` | Final implementation handoff, including the full verified archive data |
| `Exhibitions Addendum 01 - Work and Series Links.md` | Approved addendum: optional links to exhibited works and series |
| `reference/README.md` | How to run the reference and toggle the review states |
| `reference/source/Exhibitions.dc.html` | Approved page source including Addendum 01 (reference only) |
| `reference/source/` shell, runtime and `_ds` files | Same set as About (see above) |
| `reference/source/art/` (3 files): `uncolored-by-nature.jpg`, `colored-by-nature-purple.jpg`, `jal-water-c.png` | Plate I artwork, plus the images used by the header dropdown preview |

### Screenshots: `references/claude-design/screenshots/v2/`
| Files | Content |
|---|---|
| `about-desktop-01.jpg` … `about-desktop-18.jpg` | About desktop, top to bottom (header, then sections in order, then footer) |
| `about-mobile-01.jpg` … `about-mobile-16.jpg` | About mobile inside the phone frame, top to bottom, with review notes beside it |
| `exhibitions-desktop-01.jpg` … `exhibitions-desktop-15.jpg` | Exhibitions desktop, top to bottom, with sample links on |
| `exhibitions-mobile-01.jpg` … `exhibitions-mobile-12.jpg` | Exhibitions mobile inside the phone frame, top to bottom |

Known capture artefacts:
- The About portrait appears uncropped, because the capture tool ignores CSS transforms. See `assets/ranjeeta-portrait-crop-4x5.png` for the approved crop.
- At 924px the global header nav overlaps its icons. That's outside this scope.
- The obsolete News and Commissions footer links are visible.
