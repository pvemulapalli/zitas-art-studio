# Portfolio — Implementation Handoff (V2, approved)

**Status:** the concept ("Rooms of a retrospective"), the series sequence and the representative works are approved by Ranjeeta. This is a handoff of the existing design. **Don't redesign it.** Exact inline values are in `reference/source/Portfolio.dc.html`. Where the design doesn't settle something, it's marked **Needs implementation judgment**. Choose the smallest faithful option and note it in the PR.

This document separates three things throughout:
- **[Design]:** a requirement of the approved design.
- **[Owner]:** content Ranjeeta edits.
- **[Suggested]:** a recommended Shopify structure; Cursor makes the final decision.

Screenshots (`references/claude-design/screenshots/v2/`):
- `portfolio-desktop-01…08`: about 1540px.
- `portfolio-tablet-01…10`: 924px.
- `portfolio-mobile-01…10`: 390px, inside the phone frame.

---

## 1. Purpose
An artwork-led retrospective. Each series Ranjeeta has painted is one "room", in the order she sets, and each room holds one strong representative painting. The page tells the story of her practice, from the first series to the current one. It is distinct from:
- **About:** her personal story.
- **Exhibitions:** where the work has been shown.
- **Collections:** browsing within a series.
- **Homepage:** the currently featured series.

## 2. Page structure
| # | Section | Surface | Notes |
|---|---|---|---|
| 0 | Global header (existing) | — | Unchanged |
| 1 | Opening | Gesso #F8F8F6 | Typographic. **No room index** (Ranjeeta's decision) |
| 2… | Rooms I → N | Per pattern (§5) | One per series, in owner order |
| last | Closing | Vaayu mist #DCE6EA | Invitation to the originals |
| — | Global footer (existing) | Ink | Unchanged |

### 2.1 Approved room sequence [Design + Owner]
| Room | Series (collection) | Representative work | Pattern | Second image | Reflection in the design |
|---|---|---|---|---|---|
| I | Elements | *Jal – Water* | Hang (left) | — | Existing series text from the current site. **Provisional** |
| II | Sand and Cloud | *Melting away* | Pair | Detail of the same painting | Existing series text from the current site. **Provisional** |
| III | Colored by Nature | *Colored by Nature – Purple* | Hang (right) | — | **None yet** (placeholder) |
| IV | BlackWhiteandGrey | *Yang – The Dark Side* | Dark room | — | **None yet** (placeholder) |
| V | Walking the Trail | *Tangled* | Hang (left) | — | **None yet** (placeholder). Marked "Current series" |

Provisional reflections:
- **Elements:** "Our body is made of the five elements from nature - Prithvi (Earth), Agni (fire), Jal (Water), Vaayu (Air) and Akaash (aether/sky). Realizing that body is made of these elements in nature and will return to the nature is the inspiration for these artworks. It is also a constant reminder for me to disconnect with outward (body) and look inward into being."
- **Sand and Cloud:** "Gold sand and grey clouds makes me smile wherever I am. These paintings were inspired by such landscapes."

Both are reproduced verbatim from the current site, and both carry the copper note "Existing series text from the current site. Not yet approved for Portfolio."

The dashed "[Series reflection to come from Ranjeeta, 2–4 sentences]" boxes and the provisional notes are **review-only and must not ship**. A blank reflection renders nothing (§4).

## 3. Global constants [Design]
- Shell: `max-width: 1560px; margin: 0 auto; padding-inline: clamp(20px, 3.4vw, 56px)`.
- Grid: 12 columns, `minmax(0,1fr)`, column gap `clamp(16px, 2vw, 32px)`.
- Space below each room: `clamp(112px, 12vw, 200px)`. Dark rooms use the same value as `margin-bottom`.

**Type**
| Role | Family | Size | LH | Tracking / case | Colour |
|---|---|---|---|---|---|
| Opening eyebrow (H1 "Portfolio") | Marcellus | 12px (mobile 11) | — | .22em upper | Copper #96502A |
| Opening display line | Marcellus | clamp(46px, 5.8vw, 96px); mobile 38px | 1.02 (1.04) | — | Ink #15202A, max 15ch, `text-wrap: balance` |
| Opening supporting line | Mulish | 18px; mobile 17px | 1.6 (1.55) | — | #3B4044 |
| Room eyebrow ("Room I", "Room V · Current series") | Marcellus | 12px; mobile 10px | — | .22em upper | Copper (gold #C7A864 on dark) |
| Room name (H2) | Marcellus 400 | Hang/Pair clamp(40px, 4.2vw, 68px); Dark clamp(34px, 3.4vw, 54px); mobile 30px | 1.02 / 1.05 / 1.08 | — | Ink (gesso #F8F8F6 on dark) |
| Work title | Mulish italic | 17px; mobile 16px | 1.5 | — | #565C61 (#CDD1D2 on dark) |
| Reflection | Mulish italic | Hang/Dark clamp(19px, 1.5vw, 22px); Pair 20px; mobile 18px | 1.55–1.6 | — | Ink (gesso on dark) |
| "Explore the series" | Marcellus (TextLink label variant) | 12px | — | .16–.18em upper | Teal #0F5468 → copper hover (gesso → gold on dark) |
| "View {work}" | Mulish | 16px | — | — | #3B4044, 1px #A4A9AC underline offset 4px → copper (#CDD1D2 / #565C61 underline → gold on dark) |
| Pair second-image label | Marcellus | 11px | — | .2em upper | #565C61 |
| Closing heading | Marcellus | clamp(34px, 3.4vw, 54px); mobile 30px | 1.1 | — | Ink, max 16ch |

**Colour:** gesso #F8F8F6 · night #0D141A · vaayu mist #DCE6EA · ink #15202A · #1F2A33 · #3B4044 · #565C61 · rules #CDD1D2 · copper #96502A · gold #C7A864 · teal #0F5468 · focus #2E8FB5.

**Effects:**
- `--shadow-hang` (`0 1px 2px rgba(13,20,26,.06), 0 18px 40px -18px rgba(13,20,26,.28)`) on light-ground artwork only. **No shadow on Dark rooms.**
- Radius 0. No borders around artwork, no mats, no cards.

## 4. Room content model
| Field | [Owner] editable | Required | Rendering |
|---|---|---|---|
| Series | Collection picker | Yes | The room name = `collection.title`, and "Explore the series" → `collection.url` |
| Series title override | Text | No | Only if the label should differ from the collection title. **Needs implementation judgment**; not in the design, but harmless |
| Representative work | Product picker | Recommended | Supplies the image (`featured_media`), title and URL |
| Representative image override | Image picker | No | Used if there's no product, or to show a different photo of the same work |
| Work title | Text | Only if no product | Shown in italics under the name |
| Alt text | Text | Yes if using an image override | Otherwise the product media alt is used. Required; never empty |
| Pattern | Select: **Hang · Dark room · Pair** | Yes (default Hang) | Layout (§5). No other layouts exist |
| Second image | Image picker | Pair only | Detail crop or room photograph |
| Second image label | Select: **Detail · In a room** | Pair only | Caption under the second image |
| Second image focal point | Image focal point (native) | No | Positions the detail crop |
| Second image alt | Text | Yes when there's a second image | — |
| Reflection | Rich text (short; 2–4 sentences) | No | Italic quote. Blank = not rendered, and the hairline rule above it is also omitted |
| Show "View {work}" link | Checkbox (default on) | — | Only rendered when a product is set |
| Current series | Checkbox | — | Appends " · Current series" to the eyebrow. **[Suggested]** checkbox rather than "last block" so it doesn't depend on order. The prototype marks room V |

**Generated, not editable [Design]:**
- The room numeral (I, II, III…) from the block's position.
- The Hang side: the 1st, 3rd and 5th Hang rooms place the image **left**, and the 2nd and 4th place it **right**. Only Hang rooms count; Pair and Dark don't change the count.

**Background treatment [Design]:** the background follows the pattern. Hang and Pair are gesso; Dark room is a Night band. Choosing the background *is* choosing the pattern, and there's no separate background setting in the approved design. If Ranjeeta wants dark backgrounds for Hang or Pair, that's a design extension that needs approval (see §13).

**Reordering:** drag-and-drop blocks in the Theme Editor. Numerals update automatically.

## 5. The three room patterns: desktop (≥ 990px)

### 5.1 Hang [Design]
- `<section>` with no background (gesso page). 12-column grid, row gap 40px.
- **Image left (Hang L):** `align-items: center`.
  - `figure` in columns 1–7: flex-centred, vertical padding `clamp(24px, 4vw, 64px)`.
  - Image: `max-width: 100%; max-height: min(78vh, 820px); width: auto; height: auto`, with the hang shadow.
  - Text in columns 9–12, gap 20px, in this order: eyebrow, H2, work title, reflection (margin-top 8px, padding-top 20px, 1px #CDD1D2 top rule), links row (flex wrap, gap 12px 32px, margin-top 8px).
- **Image right (Hang R):** `align-items: end`.
  - Text in columns 2–5, with padding-bottom `clamp(24px, 4vw, 64px)`, so the text bottom aligns near the image bottom.
  - `figure` in columns 7–12, same image rules.
- The image is **never cropped**: its natural ratio is capped by max-height.

### 5.2 Dark room [Design]
- A full-width `<section>` with background Night #0D141A, `margin-bottom` = room spacing.
- Inner padding `clamp(96px, 10vw, 168px)` vertical. 12-column grid, row gap 48px.
- **Row 1:** `figure` in columns 3–10, flex-centred. Image `max-width: 100%; max-height: min(80vh, 860px)`, **no shadow**, sitting directly on Night.
- **Row 2:** columns 3–10 (gap 14px): eyebrow (gold), H2 (gesso, Dark size), work title (#CDD1D2).
- **Row 3:** columns 3–8 (gap 22px): reflection (gesso), then the links row (gap 12px 32px).
  - "Explore the series": a gesso label with a 1px #565C61 bottom border, gold on hover, and an arrow kept on the last word.
  - "View {work}": #CDD1D2.
- Intended for dark-ground works (Yang). If it's used for a light-ground work, the image still sits directly on Night; help text recommends dark-ground works.

### 5.3 Pair [Design]
- Gesso. 12-column grid, row gap 40px.
- **Row 1, header** (columns 1–12): flex baseline, gap 12px 32px, padding-top 24px, **1px ink top rule**. Contents: eyebrow (`white-space: nowrap`), then H2.
- **Row 2:**
  - **Main work** in columns 1–5: figure grid, gap 14px, centred, padding-top `clamp(16px, 3vw, 48px)`. Image `max-height: min(76vh, 800px)`, hang shadow. Caption = work title (Mulish italic 15px #565C61).
  - **Second image** in columns 7–9: margin-top `clamp(96px, 12vw, 220px)` (dropped lower).
    - A 4:5 box with `overflow: hidden`, background #E3E7E7.
    - Image `object-fit: cover`, positioned by the focal point.
    - Label beneath (gap 12px).
    - In the design, the Sand and Cloud detail is a 2.4× zoom of *Melting away*, centred at 50% 45%.
    - **[Suggested]** Ranjeeta uploads a real detail photograph or a pre-cropped image; don't reproduce the CSS zoom.
  - **Text** in columns 10–12: `align-content: end`, padding-bottom 8px, gap 20px. Reflection first, then the links stacked (gap 12px).
- Cropping is allowed **only** on the second image, because it's labelled "Detail" or "In a room" and the full work is beside it.
- **Fallback:** Pair with no second image renders as **Hang**, and then counts towards the Hang alternation. **Needs implementation judgment**: alternatively, keep the Pair layout with an empty column; Hang is recommended.

## 6. Opening and closing [Design]
**Opening**
- Padding `clamp(72px, 8vw, 136px)` top, `clamp(80px, 9vw, 152px)` bottom. Grid row gap 24px, `align-items: end`.
- Columns 1–9 (gap 24px): H1 eyebrow "Portfolio", then the display line "From the first series to the current one, one painting from each."
- Columns 10–12: supporting line "Ranjeeta paints in series. Each room below holds one work from one body of work."

**Closing**
- A full-width Vaayu mist band, padding `clamp(96px, 10vw, 160px)`, `align-items: end`.
- Columns 1–7 (gap 28px): heading "Every series is still part of the collection.", then the primary button "Explore the originals" with an arrow (→ originals collection).
- Columns 9–12 (gap 14px): label links "About Ranjeeta" (→ About) and "Write to Ranjeeta" (→ `/pages/contact#message`).

## 7. Tablet (750–989px)
The screenshots at 924px show the **desktop compositions held**, with `clamp()` doing the scaling:
- Hang text columns (4 of 12) narrow; reflections wrap to more lines. That's accepted.
- Dark room H2: single line at 924px (verified for "BlackWhiteandGrey").
- Pair: the second image (3 columns) gets small at 750px. **Needs implementation judgment:** under about 820px, place the second image under the main work at 50% width, offset right, and set the text full-width below.
- No horizontal overflow at any width.

## 8. Mobile (≤ 749px), recomposed into one reading column
Shell padding 20px. Each room is a `<section>`:
- **Light rooms** (Hang and Pair): no background, padding 8px 20px 64px, gap 14px.
- **Dark rooms:** a full-width Night background, padding 48px 20px 56px.

Order inside every room, whatever the pattern:
1. **Image:** centred, `max-width: 100%; max-height: 520px`, natural ratio. Hang shadow on light rooms, none on dark. Wrapper padding 8px 0 18px.
2. Eyebrow (10px).
3. H2 (30px / 1.08).
4. Work title (16px italic).
5. Reflection (18px italic), only if set.
6. Links, each a **full-width 44px row**: "Explore the series →" (Marcellus 12px .16em, teal or gesso), then "View *{work}*" (Mulish 16px).

Pattern differences on mobile:
- **Hang:** the side alternation disappears; the image always comes first.
- **Pair:** **the second image isn't shown on mobile** in the approved design. **Needs implementation judgment** if Ranjeeta wants it; the approved design omits it.
- **Dark room:** stays a full-width Night band, which preserves the rhythm change.

Opening: padding 36px 20px 56px; H1 11px; display 38px; supporting 17px.
Closing: Vaayu mist, padding 56px 24px, heading 30px, full-width primary button, "Write to Ranjeeta →" as a 44px row. The "About Ranjeeta" link isn't on mobile in the design.

## 9. Motion and interaction [Design]
- **No entrance animation** in the approved design. **Don't add scroll effects or parallax.**
- Hover:
  - text links → copper (gold on dark);
  - the primary button darkens to teal-800 #0B4050;
  - the "Explore the series" arrow nudges 3px right, from the existing TextLink behaviour (160ms colour, 320ms transform, `cubic-bezier(.22,.61,.36,1)`).
- Artwork images aren't links in the design. **Needs implementation judgment** whether the image should also link to the product. If it does, use the same URL as "View {work}", with no hover lift.
- `prefers-reduced-motion: reduce`: remove the arrow nudge.

## 10. Artwork assets
See `assets/README.md` for the full manifest. Summary:

| Room | Work | File | px | Ratio | Status | Product link expected |
|---|---|---|---|---|---|---|
| I | Jal – Water | `jal-water-c.png` | 1444 × 1446 | ≈ 1:1 | Final for the design. A clean product photo is preferred | Yes |
| II | Melting away | `melting-away.webp` | 1420 × 2207 | ≈ 0.64 (≈ 9:14) | Final for the design | Yes |
| II (detail) | Melting away, detail | same file, CSS 2.4× zoom | — | 4:5 crop | **Temporary.** A real detail photo is needed | No |
| III | Colored by Nature – Purple | `colored-by-nature-purple.jpg` | 1946 × 2806 | ≈ 0.69 | Final for the design | Yes |
| IV | Yang – The Dark Side | `yang-dark-side.png` | 1066 × 1350 | ≈ 0.79 | **Temporary.** Cropped from a framed mock-up; a clean product photo is needed | Yes |
| V | Tangled | `tangled.webp` | **320 × 650** | ≈ 0.49 | **Temporary. Too low-resolution.** It renders soft at desktop scale (displayed up to about 400 × 820 CSS px, ≈ 800 × 1640 needed at 2×). A high-resolution photo of at least 1600px on the long edge is required | Yes |

No artwork was substituted. All five are Ranjeeta's approved choices.

## 11. Accessibility and performance [Design]
**Structure**
- One H1 ("Portfolio"). Each room is a `<section aria-labelledby>` pointing to its H2 (the series name). The closing H2 is its own section.
- The eyebrow numeral isn't a heading (a `<span>`).
- Reflections are `<blockquote>` (they're Ranjeeta's words).

**Images**
- Alt text is required on every image, describing the painting ("Jal – Water: blue and gold poured paint flowing across a white ground").
- The second image needs its own alt ("Detail of Melting away").
- Never use an empty alt on artwork.

**Keyboard and touch**
- All links are native `<a>`. Focus ring: 2px cerulean #2E8FB5, offset 3px, visible on gesso, mist and Night.
- Mobile targets ≥ 44px.

**Loading**
- Room I's image is the LCP candidate on desktop if it's within the first viewport. Usually it's below the opening, so `loading="lazy"` throughout is acceptable. **Needs implementation judgment**: eager-load Room I if it's above the fold at common heights.
- Everything else is `loading="lazy"`, `decoding="async"`.

**Responsive images**
- Use `image_url` with a `srcset` of 400, 600, 800, 1000, 1200, 1600 and 2000 widths.
- `sizes`:
  - Hang L: `(min-width: 990px) 58vw, 100vw`
  - Hang R: `(min-width: 990px) 50vw, 100vw`
  - Dark: `(min-width: 990px) 66vw, 100vw`
  - Pair main: `(min-width: 990px) 42vw, 100vw`
  - Pair second: `(min-width: 990px) 25vw, 0px`. It's hidden on mobile: render it with `display: none` at ≤ 749px, and don't let it load (use `<picture>` with a media source or lazy loading).

**Layout stability**
- Always output `width` and `height` attributes from the media dimensions. With `height: auto` and `max-height`, the aspect ratio is reserved and there's no layout shift.
- No JavaScript is needed for this page.

## 12. Shopify implementation guidance [Suggested]
- An **alternate page template** `page.portfolio.json`, assigned to the Portfolio page.
- Focused sections (not one giant section):
  1. `portfolio-opening`: eyebrow, display line, supporting line.
  2. `portfolio-rooms`: blocks of type `room` (fields from §4), reorderable, `max_blocks` about 20. The section computes numerals and the Hang alternation in Liquid (`forloop.index`, plus a Hang counter).
  3. `portfolio-closing`: heading, button label and link, two links.
- Snippets: `portfolio-room-hang`, `portfolio-room-dark`, `portfolio-room-pair` (one per pattern), all sharing `portfolio-room-text` (eyebrow, name, work, reflection, links). Reuse the existing `responsive-image`, `label-link` and `icon` snippets.
- **No metafields or metaobjects are required.** The block settings hold everything, and the collection and product are native references.
- **Optional, future:** if Ranjeeta wants reflections reusable elsewhere, a collection metafield `custom.portfolio_reflection` could provide a fallback. Not required.
- Skipped blocks: a block with no collection, or with no product and no image, doesn't render on the storefront (and shows a warning in the editor).
- Remove the prototype-only elements: the proto bar, the phone frame, the review notes, the provisional notes and the placeholder boxes.

## 13. Open items (don't invent replacements)
| Item | Needed from |
|---|---|
| Approved reflections for all five rooms | Ranjeeta |
| Approval of the opening and closing copy (design-written) | Ranjeeta |
| High-resolution photo of *Tangled* | Ranjeeta |
| Clean, unframed photo of *Yang – The Dark Side* | Ranjeeta |
| Real detail photo for *Melting away* (or approval of a crop) | Ranjeeta |
| Whether Pair's second image should appear on mobile | Design decision (currently: no) |
| Whether artwork images link to the product | Design decision (currently: no) |
| Background choice independent of pattern | Not in the approved design. Would need approval |

## 14. Acceptance checklist
**Visual fidelity**
- [ ] The opening, five rooms and closing appear in that order, with no room index.
- [ ] Room I Hang left, II Pair, III Hang right, IV Dark room, V Hang left, "Room V · Current series".
- [ ] Type sizes, colours and spacing match §3, §5 and §6, compared against the screenshots.
- [ ] No mats, cards, borders or radius around artwork. Hang shadow on light rooms only.

**Artwork presentation**
- [ ] No representative work is cropped at any width (natural ratio, capped by max-height).
- [ ] Only the Pair second image is cropped (4:5, cover, focal point respected).
- [ ] Dark rooms are full-bleed Night, with the work directly on Night and no shadow.

**Room layouts and editability**
- [ ] Reordering blocks in the Theme Editor reorders rooms and renumbers them.
- [ ] Changing a room's pattern switches its layout, and the Hang alternation recomputes.
- [ ] Adding a sixth room needs no code. Removing a room leaves no gap.
- [ ] A blank reflection renders nothing (no rule, no placeholder).
- [ ] A Pair with no second image renders as Hang.
- [ ] Ranjeeta can set the collection, product or image, alt text, reflection, pattern, second image and label, and the current-series flag.

**Links**
- [ ] "Explore the series" goes to the correct collection in every room.
- [ ] "View {work}" appears only when a product is set; sold products link normally.
- [ ] The closing links go to the originals, About, and Contact (`#message`).

**Responsive**
- [ ] Tablet (750–989px) keeps the desktop compositions, with no overflow.
- [ ] Mobile: the image comes first in every room, single column, Pair second image hidden (not downloaded), Dark bands full-width, links in 44px rows.
- [ ] No horizontal scrolling at 320px.

**Accessibility and performance**
- [ ] One H1; each room is a labelled section with an H2.
- [ ] Every image has meaningful alt text. Focus ring visible on every surface.
- [ ] Responsive `srcset`/`sizes`, width and height attributes, lazy loading, and CLS ≈ 0.
- [ ] No JavaScript required. No animations added.

**Content and assets**
- [ ] Review-only placeholders and notes are removed.
- [ ] Temporary assets (Tangled, Yang, the Melting away detail) are flagged for replacement in the launch checklist.
