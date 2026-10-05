# Zita's Art Studio: PLP / Collection Implementation Handoff (V2)

## 1. Purpose of this handoff

This document turns the **approved** V2 listing page (PLP) into implementation specs for the Shopify OS 2.0 theme. It does **not** give permission to redesign, simplify or reinterpret the page. Where V2 leaves something open, it is marked **Needs implementation judgment (NIJ)** and listed in §26. Cursor should not resolve those items silently.

The PLP reuses the homepage foundations that are already in production (tokens, header, footer, `artwork-card`, `artwork-plate`, `responsive-image`, `label-link`, `icon`). **Extend them; do not recreate them.**

---

## 2. Authoritative sources

| Source | Used for |
|---|---|
| `Works PLP.dc.html` (V2 prototype, the source of the V2 PLP screenshots) | All composition, values, states and behaviour below |
| `Artwork Card.dc.html` | Card, plate, caption, sold state, room view (desktop hover and mobile swipe) |
| `Room View.dc.html` | The behaviour of the prototype's room-view stand-in |
| `Zita Header.dc.html`, `Phone.dc.html`, `Zita Footer.dc.html` | Shell (already implemented) |
| `Brand Foundations.dc.html` → "What changed in V2" | The rules for aligned artwork grids and the optional editorial band |
| `zita-data.js` | Price formatting ("Price on enquiry"), size formatting |

**Not read:** the repository screenshots folder and `docs/design/design-v2-acceptance.md`. GitHub was not reachable from this environment. **Cursor must cross-check this handoff against `design-v2-acceptance.md`**. Where that document records an explicit decision that differs from this handoff, the acceptance document wins.

**Precedence:** design-v2-acceptance.md (explicit decisions) > V2 prototype/screenshots (composition) > this handoff > the older design-system guide. V1 has no authority.

**Not part of the design:**
- The dark monospace "Editorial band · Show/Omit · Place after" strip. It is a review control that stands in for merchant settings.
- The "Design note · the editorial band" section below the grid.
- The Proto Bar.
- The phone frame.

---

## 3. Page intent

- **Feel:** like walking through a body of work in a gallery. Calm, spacious, with the paintings large and uncropped.
- **Understand:** what this collection is (title + one short paragraph), how many works it holds, which works are available and which have sold (sold works remain part of the archive), and the price where one is listed.
- **Explore:** move between series (tabs), refine on demand (Filter & Sort), and preview a work in a room (hover or swipe).
- **Do:** open an artwork page. The PLP has no add-to-bag; the whole card is a single link.

---

## 4. Page anatomy (top to bottom)

1. **Announcement bar + header** (existing). "Originals" shows its current state: teal text with a 1px teal underline.
2. **Collection introduction:** eyebrow, H1, and a one-paragraph description on the right.
3. **Series navigation (tabs):** a row of collection links with a hairline under the whole row.
4. **Toolbar (sticky):** the Filter & Sort trigger, applied-filter chips with "Clear all" (when filters are active), and a live count with the current sort on the right.
5. **Artwork gallery:** an aligned grid of artwork cards.
   - **Optional editorial band:** full width, between rows (§11).
   - **Empty state** when filters return nothing.
6. **Pagination:** not designed in V2 (§12).
7. **Footer** (existing). It follows the gallery's bottom padding directly. There is no extra section in between.

There is no hero image, no collection banner, no promo tiles, no "recently viewed" and no newsletter block above the footer.

---

## 5. Desktop specification

| Item | Value (from prototype) |
|---|---|
| `main` max-width | **1680px**, centred. This is wider than the homepage's 1560px content container, so the gallery uses the page confidently. |
| Gutters | `clamp(20px, 3.4vw, 56px)` (same token as the homepage) |
| Intro padding | top `clamp(56px,6vw,96px)`, bottom `clamp(28px,3vw,40px)` |
| Intro layout | flex, `justify-content: space-between`, `align-items: flex-end`, gap `24px 48px`, wraps |
| Series nav | flex, gap `8px 30px`, wraps; `border-bottom: 1px solid #CDD1D2` |
| Toolbar | `position: sticky; top: 0; z-index: 10`; gesso background; padding `16px 0`; flex, space-between, gap `12px 24px`, wraps |
| Gallery section padding | top `clamp(20px,2vw,32px)`, bottom `clamp(96px,10vw,160px)` (generous; leave it unreduced) |
| Columns | **max 3** (see §6) |
| Column gap | `clamp(24px, 3vw, 56px)` |
| Row gap | `clamp(56px, 5vw, 88px)` |
| Alignment | `align-items: start`; all plates are the same height within a row |
| Editorial band margin | `clamp(8px,2vw,32px) 0` on top of the row gap |

Vertical rhythm: header → 56–96px → intro → 28–40px → tabs → toolbar (16px padding) → 20–32px → grid → 96–160px → footer.

---

## 6. Artwork gallery system

**Grid rule (exact):**
```css
grid-template-columns: repeat(auto-fill, minmax(max(280px, calc((100% - 2 * var(--col-gap)) / 3)), 1fr));
```
- There are never more than 3 columns. Each column is at least 280px wide. The grid falls to 2 columns, then 1, as the container narrows.
- At 1680px the cards are about 520px wide.
- **Aligned rows.** No masonry, no `grid-auto-flow: dense`, no vertical offsets and no staggering. This is a V2 rule for every product grid.

**Plate (`artwork-plate`):**
- Every plate is the **same aspect ratio: 4:5**, so every plate in a row has the same height and every caption starts on the same line. This shared field is what lets different proportions sit together without masonry.
- Mat `#F0F2F1`, inner padding **10%**.
- The image is **contained**: `max-width: 100%; max-height: 100%; width/height: auto`, centred both ways, **never cropped**. It has the hang shadow `0 1px 2px rgba(13,20,26,.06), 0 18px 40px -18px rgba(13,20,26,.28)`.

**How each proportion behaves inside the 4:5 field:**
- **Portrait near 4:5:** fills the height and almost all of the width.
- **Tall or narrow** (for example 0.49, *Longing for clouds*): fills the height and appears as a slim vertical work with wide mat either side. Correct as is; never stretch or crop it.
- **Square:** fills the width, with mat above and below.
- **Landscape or very wide** (for example 1.5 or wider): fills the width and sits as a low band in the vertical centre. Correct as is.
- The mat is part of the presentation, so the artwork always reads at its true proportion.

**Card height:** plate (fixed by ratio) + caption (variable). Caption heights vary only when a title wraps. Rows align at the top (`align-items: start`), and the row gap absorbs the difference.

**Cursor must NOT:**
- Use `object-fit: cover` or a fixed-height crop for the artwork.
- Vary the plate ratio per product.
- Use masonry or a JS layout library.
- Add a card border, background, radius or shadow to the card container.
- Add a quick-add button, badges, star ratings, a wishlist heart, colour swatches or a "New" or "Sale" flag.
- Make the gallery 4 or more columns on large screens.
- Shrink the gaps to fit more works per row.

---

## 7. Artwork metadata (desktop)

The caption sits below the plate, `padding-top: 16px`, as a grid with a 5px gap:

1. **Series eyebrow:** Marcellus 11px, +0.22em, UPPERCASE, copper `#96502A`. Shown on the PLP.
2. **Title row** (flex, `justify-content: space-between; align-items: baseline; gap: 16px`):
   - **Title** (an `h3`): Marcellus 19px/1.25, ink `#15202A`; turns teal `#0F5468` on hover or focus (160ms).
   - **Right side:** either the **price** (Mulish 17px, ink, `white-space: nowrap`) or **Sold** (§8). When the price is empty, it reads "Price on enquiry".
3. **Meta line:** Mulish 15px/1.45, `#565C61`: "W × H in", or the orientation word when dimensions are missing, followed by " · {award}" when an award exists.

| Element | Shopify source | Notes |
|---|---|---|
| Series | The product's series collection | **NIJ:** how to pick the "series" collection when a product belongs to several (§26) |
| Title | `product.title` | Keep the en dash exactly as written |
| Price | `product.price` via the store money format, whole dollars ("$1,500") | **NIJ:** "Price on enquiry" needs a source (§26) |
| Dimensions | `custom.artwork_width` × `custom.artwork_height` + " in" | via the existing `artwork-dimensions` snippet |
| Award | Not in the current data model | Omit until a field exists (§26). Do not invent one. |

On the PLP, dimensions show in inches only. Centimetres appear only on the product page.

---

## 8. Available vs sold

- **Image:** shown at **full strength**. No greying, no opacity change, no overlay, no "sold" stamp on the art.
- **Label:** in place of the price, an inline flex with a 7px gap: an **8px dot `#B0602F`** (round), then **"SOLD"** in Marcellus 11px, +0.2em, UPPERCASE, ink. It is never colour alone.
- Title and meta are unchanged.
- **Hover and click:** identical to an available work. The room view still appears, and the card **still links to the PDP**.
- **Source:** `product.available == false` → sold. Do not create a metafield for this. **NIJ:** a product that is unavailable for reasons other than "sold" will also show as SOLD (§26).
- **Accessibility:** the card link's accessible name is "{title}, sold" or "{title}, {price}".
- Sold works keep their place in the collection's normal order. They are not pushed to the end.

---

## 9. Room / context image

**Approved behaviour:** a second view of the work shown in a room setting. In the prototype it is a drawn stand-in (wall, floor and bench, with the painting at its relative scale). In production, use the **second native product image**.

- **Desktop:** on **hover or keyboard focus** of the card, the artwork layer fades out and the room image fades in **in the same 4:5 field**. Both use `opacity` over **720ms** with `cubic-bezier(.22,.61,.36,1)`. Moving off or blurring reverses it. The room image temporarily *replaces* the artwork view; nothing else moves.
- **Room image fit:** **NIJ.** The prototype's stand-in fills the whole field. For photographs, the recommendation is `object-fit: cover`. This is a context image, not the artwork, so cropping is acceptable. Approve before building.
- **No second image:** no swap. Instead, the artwork lifts **4px** (`translateY(-4px)`) over 720ms. That is the card's built-in fallback.
- **Mobile:** see §15. The two images become a swipeable two-panel plate.
- **Reduced motion:** the swap is instant (1ms) and the lift is removed.
- **Keyboard:** the card is one link; focus triggers the same swap. There are no extra controls.
- **Loading:** the second image loads lazily and should not be requested until it is close to needed (§23).

---

## 10. Filter & Sort

**Trigger (desktop):** at the left of the sticky toolbar.
- An outline button: 44px tall, padding `0 18px 0 14px`, 1px ink border, transparent background, square corners.
- Content: the `sliders-horizontal` icon (18px, 1.25px stroke), then "FILTER & SORT" in Marcellus 13px, +0.16em.
- Hover: ink fill with gesso text.
- With active filters it shows a count badge: a 20px pill, copper `#96502A` background, white Mulish 11px.

**Next to it, when filters are active:**
- One removable chip per active value (the design system `Tag` with a remove ×). The label is the short value, for example "Portrait".
- "Clear all": Mulish 16px, teal, underlined (offset .22em).

**Right side of the toolbar:** "{n} works · {sort label}", Mulish 16px `#565C61`, `aria-live="polite"`.

**Desktop drawer:**
- A **left-side** dialog, `width: min(440px, 92vw)`, full height, gesso, `--shadow-overlay`.
- Scrim: `rgba(13,20,26,.48)` covering the whole page; clicking it closes the drawer.
- Header: padding `22px 28px`, bottom hairline `#CDD1D2`. Title "Filter & Sort" in Marcellus 26px, with a 44px close icon button (×).
- Body: scrolls, padding `8px 28px 28px`. Each group is a `fieldset` with a bottom hairline and padding `22px 0`. The legend is Marcellus 12px, +0.2em, UPPERCASE, ink. Options are design system checkboxes labelled "{value} ({count})".
- Footer: top hairline, padding `18px 28px`. "Clear all" (teal underline link) on the left, then a full-width primary button "Show {n} works".
- Filters apply **immediately** (the count updates live); the button only closes the drawer.
- Opening and closing animation: **NIJ.** The prototype has none. Recommendation: slide the panel in by translateX over 320ms and fade the scrim over 320ms.

**A. Controls V2 requires:**

| Group | Options | Shopify source |
|---|---|---|
| Availability | Available, Sold | Native availability filter |
| Orientation | Square, Portrait, Landscape | **NIJ:** needs a filterable product value; see §19 |
| Price | Under $300 · $300 – $600 · Over $600 | **NIJ:** Shopify's native price filter is a min/max range, not fixed bands (§26) |
| Series | the series collections (shown **only on "All originals"**) | **NIJ:** native filters can't filter by collection; see §19 |
| Sort (radio buttons) | Ranjeeta's order · Price, low to high · Price, high to low | `sort_by`: `manual` · `price-ascending` · `price-descending` |

**B. Possible with Shopify but NOT approved:** vendor, product type, tags, size or dimension ranges, colour, medium, newest, best-selling, alphabetical. **Do not add these.**

**Behaviour:**
- Esc closes the drawer.
- Focus moves into the dialog when it opens, is **trapped** while open, and returns to the trigger on close. The prototype doesn't do this; it is required.
- `aria-modal="true"`, labelled by its title.
- The page behind does not scroll while the drawer is open.
- With JS, the grid updates through the Section Rendering API and the URL updates with `history.replaceState`. Without JS, the form submits normally.
- Filters live in URL parameters, so filtered views can be bookmarked and shared.

**Empty result:** centred, padding 96px: "No works match these filters." (Mulish 20px, `#3B4044`), then a secondary button "Clear filters".

**Mobile:** see §15.

---

## 11. Optional collection editorial band

**Approved visual (desktop):**
- An `aside` spanning every column (`grid-column: 1 / -1`), flex, wraps.
- Background **Vaayu mist `#DCE6EA`**; margin `clamp(8px,2vw,32px) 0` on top of the row gap.
- **Text side** (`flex: 5 1 340px`): padding `clamp(36px,5vw,88px)`, grid with a 22px gap, vertically centred.
  - Eyebrow: Marcellus 12px, +0.22em, UPPERCASE, **teal `#0F5468`**.
  - Statement: Mulish `clamp(20px,1.7vw,24px)`/1.55, ink, max 32em.
  - A label link with an arrow.
- **Image side** (`flex: 6 1 380px`): background **Stone mist `#E3E7E7`**, padding `clamp(32px,4vw,72px)`, the image centred at `width: min(100%, 520px)`.
  - The image has the deep hang shadow `0 1px 2px rgba(13,20,26,.06), 0 30px 60px -28px rgba(13,20,26,.4)`.
  - The whole image area links to the featured work.

**Placement rules (approved):**
- The band is **optional and per collection**. When a collection has none, it shows the plain grid.
- The position is a deliberate choice: **after row 1**, **after row 2**, or **at the end of the grid**. Product order never decides it.
- A "row" means the columns actually on screen. With 3 columns, "after row 1" means after 3 works; with 2, after 2; with 1, after 1.
- With CSS grid and no `dense` packing, place the band in the DOM after (row × columns) cards. Because the column count changes with width, either render one band and move it with a small script on resize, or render it after a position computed per breakpoint. **NIJ** on the technique; the visual rule is fixed.
- If the collection has fewer works than the chosen position, the band moves to the end.
- The band is **hidden whenever any filter is applied or the sort differs from "Ranjeeta's order"**.
- It is shown on page 1 only (**NIJ**; recommended).

**Architecture recommendation (this is a recommendation, not existing data):** collection metafields, without a metaobject.
- `custom.editorial_eyebrow`: single line text
- `custom.editorial_text`: multi-line text
- `custom.editorial_link_label`: single line text
- `custom.editorial_link`: URL
- `custom.editorial_image`: file (image)
- `custom.editorial_product`: product reference (optional; the image links to it)
- `custom.editorial_position`: single line text with a choice list: `after_row_1`, `after_row_2`, `end`

The band renders only when `editorial_text` is present. A metaobject would be justified only if one band needs to be reused across several collections, and V2 doesn't show that.

---

## 12. Pagination / collection scale

**V2 does not design pagination.** The prototype shows the full collection on one page (at most 11 works).

**Recommendation (NIJ; needs approval):** Shopify `paginate` with **24 per page**. 24 divides evenly into 3, 2 and 1 columns, so rows always end full.
- Small and medium collections (up to 24) show **no pagination UI at all**.
- For larger collections, add a quiet row centred under the grid:
  - "← Previous" and "Next →" as `label-link`s.
  - Between them, "Page 2 of 3" in Mulish 16px `#565C61`.
- These are real links (`?page=n`), so they work with SEO, history and no JS.
- **No infinite scroll.** A "Show more works" button is acceptable later only if it also updates the URL.

---

## 13. Hover and pointer interactions (desktop)

| Target | Hover / focus behaviour |
|---|---|
| Artwork card (with a 2nd image) | artwork → room crossfade, 720ms pour easing; title → teal, 160ms; `cursor: pointer` |
| Artwork card (no 2nd image) | artwork lifts 4px over 720ms; title → teal |
| Series tab | inactive `#3B4044`. **NIJ:** the prototype has no hover state. Recommendation: copper, 160ms, matching the nav. |
| Filter & Sort button | ink fill, gesso text, 160ms |
| Chip × | design system Tag behaviour |
| Clear all | (already underlined) → copper |
| Editorial label link | copper text and line; arrow moves 4px over 320ms |
| Drawer options | design system checkbox and radio states |

Focus everywhere: a 2px cerulean `#2E8FB5` outline, offset 3px.

---

## 14. Tablet behaviour

**V2 demonstrates** desktop (3 columns) and mobile (1 column). The grid formula itself produces **2 columns** whenever the container is narrower than about 3 × 280px plus the gaps (roughly under 950px) and wider than about 2 × 280px plus a gap (roughly 600px or more). The two columns keep the same 4:5 plates and desktop captions.

- **Explicit in the design:** the grid formula, the 280px minimum and a maximum of 3 columns.
- **NIJ:**
  - where tabs and the toolbar switch to the mobile pattern (chips plus the bottom bar). The prototype switches at the mobile view only. Recommendation: switch at `< 750px`, which matches the homepage breakpoint.
  - whether a touch tablet gets the swipe plate or the hover plate. Recommendation: use `(hover: hover)` to choose, not width.

---

## 15. Mobile specification (< 750px)

| Item | Value |
|---|---|
| Gutters | 20px |
| Intro | padding `28px 20px 8px`, gap 8px. Eyebrow Marcellus 11px, +0.2em, copper. H1 Marcellus **36px**/1.1. **No description paragraph on mobile** (the prototype omits it; NIJ, §26). |
| Series nav | horizontal scroll row of **chips**, gap 8px, padding `14px 20px 18px`, scrollbar hidden. Each chip: 40px tall, padding `0 14px`, **2px radius**, Mulish 15px, no wrapping. Active: ink fill, gesso text. Inactive: 1px `#CDD1D2` border, ink text. Short label "All" for All originals. |
| Gallery | **one column**, full width (inside the gutters), gap **44px**, padding `4px 20px 32px` |
| Plate | the same 4:5 mat, 10% padding, contain |
| Room view | the plate is a **two-panel horizontal scroll-snap** (artwork, then room), scrollbar hidden. Bottom right, 10px in from the edges: a small tag (`rgba(248,248,246,.92)`, padding `6px 8px`) with two 6px dots (active ink, inactive `#A4A9AC`) and a Marcellus 10px, +0.18em, caps label that reads "Swipe · room" on panel 1 and "Room view" on panel 2. With no second image: one panel, no tag. |
| Caption | its own link under the plate, padding-top 12px, at least 44px tall. Title Marcellus **18px** with the price (Mulish 17px) or Sold (7px dot) on the right. Meta: Mulish 15px/1.4 `#565C61`, **"{Series} · W × H in"**. On mobile the series moves into the meta line, and there is **no separate eyebrow**. |
| Editorial band | **full-bleed** (`margin: 0 -20px`), Vaayu mist, padding `36px 24px`, gap 16px. Eyebrow 11px teal, statement Mulish **18px**/1.55, label link. **No image.** Position after row N with 1 column, meaning after work N. |
| Filter & Sort | a **sticky bottom bar**: padding `12px 16px 22px`, background `rgba(248,248,246,.96)`, top hairline `#E3E7E7`. A full-width **ink-filled** button, 50px tall: the icon plus "FILTER & SORT · {n} works". |
| Sheet | a **bottom sheet** about 560px tall: gesso, top hairline `#CDD1D2`, shadow `0 -24px 48px -24px rgba(13,20,26,.35)`. Header: "Filter & Sort" in Marcellus 22px with a 44px close button. Groups separated by top hairlines, padding 16px 0, each with an 11px caps title and **selectable Tag chips** (wrapping, gap 8px) instead of checkboxes. Footer: a full-width primary "Show {n} works". |
| Pagination | as §12, stacked and centred |
| Touch targets | 44px or more everywhere (chips 40px tall with 8px gaps; **NIJ:** raise them to 44px if the acceptance document requires a strict 44px) |

**The mobile sheet in the prototype has no Sort group and no "Clear all".** **NIJ** (§26). Recommendation: add "Sort" as a single-select chip group, plus "Clear all" next to the Show button, matching desktop.

---

## 16. Typography (Marcellus 400 + Mulish; no bold Marcellus)

| Role | Family | Size / LH | Tracking / case | Colour |
|---|---|---|---|---|
| Collection eyebrow | Marcellus | 12px (mobile 11px) | +0.22em (mobile +0.2em), UPPERCASE | `#96502A` |
| H1 collection title | Marcellus | `clamp(40px,4.4vw,64px)`/1.05 (mobile 36/1.1) | normal | `#15202A` |
| Description | Mulish 400 | 18px/1.55, max 30em | normal | `#3B4044` |
| Series tab | Marcellus | 13px | +0.16em, UPPERCASE | active `#0F5468` / inactive `#3B4044` |
| Series chip (mobile) | Mulish | 15px | normal | ink / gesso |
| Filter & Sort trigger | Marcellus | 13px | +0.16em, UPPERCASE | ink |
| Count · sort | Mulish | 16px | normal | `#565C61` |
| Clear all | Mulish | 16px, underline offset .22em | normal | `#0F5468` |
| Drawer title | Marcellus | 26px (mobile sheet 22px) | normal | ink |
| Group legend | Marcellus | 12px (mobile 11px) | +0.2em, UPPERCASE | ink |
| Option label | Mulish | design system checkbox/radio (16–17px) | normal | ink |
| Card series eyebrow | Marcellus | 11px | +0.22em, UPPERCASE | `#96502A` |
| Artwork title | Marcellus | 19px/1.25 (mobile 18px) | normal | ink → teal on hover |
| Price | Mulish | 17px | normal, `nowrap` | ink |
| SOLD | Marcellus | 11px | +0.2em, UPPERCASE | ink + `#B0602F` dot |
| Dimensions / meta | Mulish | 15px/1.45 | normal | `#565C61` |
| Editorial eyebrow | Marcellus | 12px (mobile 11px) | +0.22em, UPPERCASE | `#0F5468` |
| Editorial statement | Mulish | `clamp(20px,1.7vw,24px)`/1.55 (mobile 18px) | normal | ink |
| Label link | Marcellus | 13px | +0.16em, UPPERCASE | ink → copper |
| Empty state | Mulish | 20px | normal | `#3B4044` |
| Pagination (NIJ) | label-link + Mulish 16px | — | — | ink / `#565C61` |

---

## 17. Colour, surface, border, effect

Reuse the homepage tokens; **no new colours**.
- Page: gesso `#F8F8F6`.
- Mat: `#F0F2F1`.
- Hairlines: `#CDD1D2` (tabs, drawer, sheet) and `#E3E7E7` (mobile bar).
- Editorial band: Vaayu mist `#DCE6EA`, with a Stone mist `#E3E7E7` image panel.
- Text colours:
  - ink `#15202A`, body `#3B4044`, meta `#565C61`
  - teal `#0F5468` for active states and links
  - copper `#96502A` for eyebrows and the filter count badge
  - sold dot `#B0602F`
- Scrim: `rgba(13,20,26,.48)`.
- Shadows:
  - hang (cards)
  - deep hang (editorial image)
  - overlay (drawer)
  - the mobile sheet shadow above
- Square corners everywhere, except the mobile chips and Tags (2px) and the count badge (pill).

---

## 18. Motion

| Motion | Duration / easing | Reduced motion |
|---|---|---|
| Room-view crossfade | 720ms `cubic-bezier(.22,.61,.36,1)` | instant |
| No-room lift (4px) | 720ms, same easing | none |
| Title colour | 160ms | instant |
| Button fill | 160ms | instant |
| Drawer / sheet open | **NIJ** (none in the prototype); recommendation 320ms translate + scrim fade | instant |
| Mobile room swipe | native scroll-snap | native |

There is **no** gallery entrance animation, no scroll reveals and no staggered fade-ins. V2 has none.

---

## 19. Shopify data mapping

| Design element | Shopify source | Fallback | Owner editable? | Notes |
|---|---|---|---|---|
| Eyebrow | **NIJ.** The prototype varies it ("Zita's Art Studio", "Series", "Current series", "Archive"). Recommendation: a collection metafield `custom.eyebrow` (single line). | Omit the eyebrow | yes | Or a fixed "Series" for every collection. Needs approval. |
| H1 | `collection.title` | — | yes (native) | |
| Description | `collection.description` | Omit the paragraph | yes (native) | Keep it to 1–2 sentences. Rich text is shown as plain paragraphs. |
| Series tabs | A Shopify **menu** (for example "series-nav") linking to collections | Hide the row | yes (menu) | Active = the current collection. Tabs are **links to collection pages**, not in-page switches. |
| Artwork image | 1st product media | Mat with no image (a placeholder SVG must not ship) | yes | Alt text = the media alt, or the title |
| Room image | 2nd product media (image) | No swap; lift instead | yes | Current convention. No media-role metafield needed. |
| Series eyebrow on card | the series collection | Omit | yes | **NIJ** how to determine it; recommendation: a product metafield `custom.series` (collection reference), or the first collection in a "Series" menu |
| Title | `product.title` | — | yes | |
| Price | `product.price` | "Price on enquiry" | yes | Trigger for "Price on enquiry": **NIJ** (a $0 price? a tag?) |
| Sold | `product.available == false` | — | via inventory | |
| Dimensions | `custom.artwork_width/height` | the orientation word | yes | existing snippet |
| Orientation (filter) | **NIJ.** Derived from width/height in Liquid for display, but native filtering needs a filterable value. Recommendation: a product metafield `custom.orientation` (choice list), enabled in Search & Discovery. | — | yes | The only new product field this page needs |
| Series (filter, All originals) | **NIJ.** Native filters can't filter by collection. If `custom.series` exists as a product-reference or choice metafield, it can be a filter. | Omit the group | — | |
| Price bands | Native price range filter | — | — | **NIJ:** bands vs range |
| Availability filter | Native | — | — | |
| Sort | `collection.sort_options` limited to 3 | `manual` | default sort set on the collection | "Ranjeeta's order" = manual |
| Editorial band | Collection metafields (§11) | Not rendered | yes | Recommendation |

---

## 20. Component architecture

- `templates/collection.json`: the sections are `collection-intro`, then `collection-gallery`.
- **`sections/collection-intro.liquid`:** eyebrow, H1, description and the series tabs (menu setting). Mobile chips are the same links styled differently.
- **`sections/collection-gallery.liquid`:** the toolbar, the grid, the editorial band insertion, the empty state, pagination, and the filter drawer markup.
- **Snippets:**
  - `artwork-card.liquid` (**extend**): add the `series` eyebrow option, the sold label, the room layer from the 2nd media, and the mobile two-panel mode. Reuse `artwork-plate`, `responsive-image` and `artwork-dimensions` unchanged.
  - `collection-editorial.liquid` (new, small): the band, which reads the collection metafields.
  - `collection-filters.liquid` (new): the drawer and sheet form, built from `collection.filters` (native); renders only the approved groups.
  - `pagination.liquid` (new, small, if not already present).
- **JS (custom elements, vanilla, deferred):**
  - `<filter-drawer>`: open/close, focus trap, Esc, scroll lock, Section Rendering API refresh, URL sync.
  - `<editorial-slot>` (optional): moves the band to row × columns on resize.
  - The room swap on desktop is **CSS only** (`:hover`, `:focus-visible`). The mobile room panel uses native scroll-snap, with a small script that updates the dots.

Do not build one all-purpose "collection" mega-section, and do not rewrite the homepage primitives.

---

## 21. Theme Editor / merchant control

- **Native collection content:** title, description, image (unused on the PLP in V2), products, manual order, default sort.
- **Product data:** title, price, media order (1st = artwork, 2nd = room), inventory (sold), width and height, orientation (if added).
- **Section settings (Theme Editor), kept small:**
  - series menu
  - products per page (default 24)
  - show the series eyebrow on cards (default on)
  - which filter groups to show (only the approved four)
- **Collection-specific editorial:** collection metafields (§11), edited in the collection admin.
- **Developer constants (not exposed):** column rules, gaps, plate ratio, mat colour, typography, motion and breakpoints.

---

## 22. Accessibility

- The page `h1` is the collection title. Cards use `h3` for the title. The toolbar and gallery sit under a visually hidden `h2` "Artworks" (**NIJ**; recommended so the heading levels don't skip).
- The gallery is a `<ul>` of `<li>` cards. The editorial band is an `<aside aria-label="About the {series} series">` (for example "About the Elements series") inside its own `<li>` spanning every column, or outside the list if the list is split.
- Each card is **one** link with an accessible name of "{title}, {price}" or "{title}, sold". The room-view image has empty `alt=""` (it is decorative in the listing).
- On mobile, the caption is the link. The swipe plate is a scrollable region with `aria-label="{title}: artwork and room view"` that the keyboard can scroll to.
- The tabs are a `<nav aria-label="Series">` of links, with `aria-current="page"` on the active one.
- The drawer: `role="dialog" aria-modal="true" aria-labelledby`, a focus trap, Esc, focus returns to the trigger, and the background is `inert`.
- Sold is announced as text ("Sold"), never by colour alone.
- The live region on the count reads "11 works · Ranjeeta's order".
- Touch targets are 44px or more.
- `prefers-reduced-motion` removes the crossfade and lift.
- Focus ring: 2px cerulean, offset 3px.

---

## 23. Performance

- **Artwork images:** `responsive-image` with `sizes="(min-width: 1100px) 33vw, (min-width: 750px) 50vw, 100vw"` and widths 360–1200 (the plates are at most about 520px wide).
  - The first row loads eagerly. The **first image** gets `fetchpriority="high"`; everything else is `loading="lazy"`.
- **Room images:** `loading="lazy"` with the same `sizes`.
  - **NIJ:** whether to delay even the `src` until the first hover (with `data-src`). Recommended when a page holds more than 12 works.
- Fixed `aspect-ratio: 4/5` on plates, so there is **no layout shift**.
- JS: small deferred custom elements. Filters use the Section Rendering API (no full reload). No libraries.
- Large collections: pagination at 24 caps the DOM size and image count.

---

## 24. Edge cases

| Case | Behaviour |
|---|---|
| No collection image | Nothing changes (the image is not used on the PLP) |
| No description | Omit the paragraph; the intro is just the eyebrow and H1 |
| 1 product | One card in the first column (left-aligned), not stretched |
| 2 products | Two cards in the first two columns; the third stays empty |
| Large collection | Pagination (§12) |
| All sold | Normal grid. No "sold out" banner. Count: "n works". |
| Mixed sold and available | Manual order is kept |
| Missing dimensions | The meta shows the orientation word; if that is also unknown, the meta line is hidden |
| Missing 2nd image | No room swap; 4px lift; mobile shows a single panel with no tag |
| Extremely tall (< 0.4) | Contained; a thin vertical work with wide mat. Never cropped. |
| Extremely wide (> 2.0) | Contained; a low horizontal band. Never cropped. |
| Long title | Wraps over 2 or more lines; the price stays top-right at the baseline of the first line (`align-items: baseline`) and never wraps |
| Long description | Wraps up to max 30em; **NIJ:** truncate? Recommendation: no truncation; ask Ranjeeta to keep it to 1–2 sentences. |
| No editorial content | Plain grid |
| No active filters | No chips and no "Clear all"; the badge is hidden |
| Zero results | The empty state (§10); the band is hidden; the count reads "0 works" |

---

## 25. Responsive matrix

| | Large desktop (≥1440) | Desktop (1100–1439) | Tablet (750–1099) | Mobile (<750) |
|---|---|---|---|---|
| Container | 1680 max | fluid | fluid | 20px gutters |
| Columns | 3 | 3 | 2 (from the formula; 3 at the top of the range) | 1 |
| Gaps (col / row) | 56 / 88 | ~33–43 / ~55–72 | ~24 / ~56 | — / 44 |
| H1 | 64 | 48–63 | 40–48 | 36 |
| Series nav | tabs | tabs | tabs (wrap) | chip scroller |
| Filter & Sort | toolbar + left drawer | same | same | sticky bottom bar + bottom sheet |
| Card meta | eyebrow + title/price + size | same | same | title/price + "Series · size" |
| Room image | hover/focus crossfade | same | `(hover:hover)` → crossfade; otherwise swipe (NIJ) | swipe panel |
| Editorial band | text + image, full width | same | wraps to stacked (image below) | full-bleed text only |

---

## 26. Implementation judgment register

| # | Ambiguity | V2 establishes | Safest recommendation | Approval? |
|---|---|---|---|---|
| 1 | Acceptance doc and screenshots not cross-read | The prototype values here | Cursor diffs this handoff against `design-v2-acceptance.md` | Design |
| 2 | Collection eyebrow source | It varies per collection | `custom.eyebrow` collection metafield; omit when empty | Merchant |
| 3 | Series tabs as links vs in-page | In-page switch in the prototype | Menu of collection links, `aria-current` | No |
| 4 | Card series eyebrow source | The work's series name | A `custom.series` product metafield (collection reference) | Merchant |
| 5 | "Price on enquiry" trigger | The label exists | A product with no price shown, via a tag or $0 + metafield; confirm | Merchant |
| 6 | Unavailable ≠ sold | Sold = unavailable | Accept for originals; revisit if prints share the template | Merchant |
| 7 | Award in meta | Shown when present | Omit until a field is approved | Design |
| 8 | Room image fit | Fills the field | `object-fit: cover` for room photos | Design |
| 9 | Orientation filter data | Square/Portrait/Landscape | A `custom.orientation` choice metafield + Search & Discovery | Merchant |
| 10 | Price filter shape | 3 fixed bands | The native range slider/inputs styled to the system, OR a custom-band link list; choose one | Design |
| 11 | Series filter (All originals) | A group with counts | Only if #4 exists as a filterable metafield; otherwise drop the group | Design |
| 12 | Drawer/sheet animation | None | 320ms slide + scrim fade | Design |
| 13 | Mobile sheet lacks Sort and Clear all | Groups only | Add a Sort chip group + "Clear all" | Design |
| 14 | Mobile description omitted | Not shown | Follow the prototype (omit); revisit after content | Design |
| 15 | Pagination | Not designed | 24/page, Prev · Page x of y · Next | Design |
| 16 | Editorial band on later pages | — | Page 1 only | No |
| 17 | Editorial positioning technique | after row N of the visible columns | DOM insertion by breakpoint, or a small mover script | No |
| 18 | Tablet nav/toolbar switch point | Desktop vs mobile only | 750px | No |
| 19 | Touch tablets: hover vs swipe | — | `(hover: hover)` media query | No |
| 20 | Chip height 40px vs a 44px minimum | 40px | Keep 40, or raise to 44 if the acceptance doc requires it | Design |
| 21 | Series tab hover | None | Copper, 160ms | No |
| 22 | Visually hidden H2 "Artworks" | — | Add it | No |
| 23 | Long description | — | No truncation | Merchant |
| 24 | Room image deferral | — | `data-src` on first hover for pages with more than 12 works | No |

---

## 27. Acceptance checklist

**Desktop (1440 and 1280)**
- [ ] Container 1680px max; gutters match the homepage.
- [ ] Intro: copper eyebrow, H1 (64px at 1440), description on the right bottom-aligned with the H1.
- [ ] Series tabs: caps, hairline under the row, the active tab teal with a teal underline.
- [ ] The toolbar sticks to the top on scroll; outline Filter & Sort on the left; "n works · Ranjeeta's order" on the right.
- [ ] **3 columns**, equal width; every plate 4:5; captions start on one line per row; no staggering.
- [ ] Tall, square and wide works are all whole and uncropped, centred on the mat with the hang shadow.
- [ ] Caption: series eyebrow, title + price, size in inches.
- [ ] Sold: full-strength image; dot + "SOLD" in place of the price; still links to the PDP; the room view still works.
- [ ] Hover or focus: the room image crossfades in over about 720ms; the title turns teal; a work with no 2nd image lifts 4px.
- [ ] Filter & Sort: left drawer 440px, scrim, focus trapped, Esc and scrim close it, focus returns; only the approved groups and sorts appear; the count updates; chips and "Clear all" appear in the toolbar.
- [ ] Zero results shows the empty state.
- [ ] Editorial band (when configured): full width, Vaayu mist, after the configured row, hidden while filtering or sorting; with no metafield, a plain grid.

**Mobile (390)**
- [ ] H1 36px; series chips scroll horizontally; no description.
- [ ] One column, gap 44px; plates 4:5.
- [ ] Swipe the plate → room view; dots and the "Swipe · room" tag; no tag without a 2nd image.
- [ ] Caption: title + price or sold; "Series · size".
- [ ] The sticky bottom bar button shows the count; the bottom sheet has chips and "Show n works".
- [ ] The editorial band is full-bleed, text only.
- [ ] No horizontal page scroll; tap targets per #20.

**Other**
- [ ] Turning on reduced motion removes the crossfade and lift.
- [ ] Lighthouse: no layout shift from the grid; only the first artwork has high fetch priority; room images are lazy.
- [ ] Filtered URLs can be shared; pagination works without JS.
- [ ] Theme Editor: the series menu, per-page count, eyebrow toggle and filter groups are editable; the editorial band is edited from collection metafields; there are no stray visual settings.
