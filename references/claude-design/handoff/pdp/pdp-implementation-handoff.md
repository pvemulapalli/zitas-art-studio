# Zita's Art Studio: PDP Implementation Handoff (V2)

**Source of truth:** `Artwork PDP.dc.html` (the approved V2 PDP; the Moonlit Waves screens), with `Room View.dc.html`, `Artwork Card.dc.html` (related works) and the V2 grounds rule in `Brand Foundations.dc.html`. This document **translates that page onto the real data** (Essence V2, Colored by Nature-Blue V2) and the current Shopify fields. It does not redesign it.

**Reference:** `reference/artwork-detail.html` (vanilla HTML/CSS/JS). It uses stand-in images from the project; the real Essence and Colored by Nature-Blue media are not in this design project.

**Labels used here:**
- **REQUIRED** means part of the first implementation.
- **OPTIONAL** means an approved enhancement that can follow.
- **FUTURE** means not designed in detail, and needs data that doesn't exist yet.
- **NIJ** means "needs implementation judgment": the design doesn't settle it, so Cursor must not decide it alone.

**Reused from the implemented theme (do not rebuild):** shell, tokens, `responsive-image`, `artwork-plate`, `artwork-dimensions`, `artwork-card` (for related works), `label-link`, `icon`, button styles, focus ring, `--ease-pour`.

**What the prototype shows that is not part of the design:**
- The dark "Artwork state" strip and the Proto Bar are review tools.
- Prototype data that doesn't exist in Shopify is dropped here, not invented: Year, "From the series" quote, exhibitions, the "Note on size" QA row, and the print relationship.

---

## 1. Page concept

You are standing close to one painting. The work is large, uncropped, on a gesso ground with a soft hang shadow, as if it were on a wall. A quiet column beside it carries the label (series, title, what it is), then the purchase state, then the facts. Below the fold the page turns editorial:
- Ranjeeta's words about the work, on an ink band;
- a sense of physical scale;
- a few more works to continue to.

The page is **asymmetric (7/5)**, not a centred shop layout. Commerce sits in the column, clearly, but it never competes with the painting:
- one teal button;
- price set in Mulish (not shouted);
- no badges, quantity steppers, trust icons or urgency copy.

A **sold** work keeps the same page. Only the purchase block changes, to a calm "Sold" note and a route onward. The painting, story, facts and media remain fully present: the archive is part of the artist's body of work.

## 2. Hierarchy

1. The artwork (primary media, large)
2. Title (`h1`), preceded by the series eyebrow when known
3. Purchase state: price + Available, **or** Sold + note
4. Primary action: Add to bag, **or** See available works
5. Facts: size, ready to hang, certificate (+ medium when known)
6. Secondary action: Ask Ranjeeta about this painting
7. Supporting media (rail on desktop, swipe on mobile)
8. The story (ink band)
9. Scale (room/context)
10. Related works
11. Practical details (accordion: shipping, certificate)

---

## 3. Desktop composition (≥ 1000px)

Container `max-width: 1680px`, gutters `clamp(20px,3.4vw,56px)`, gesso page `#F8F8F6`.

### 3.1 Breadcrumb (REQUIRED)
- Padding `22px gutter 0`. Mulish 15px `#565C61`, a "/" separator with 8px gaps, wraps.
- Links hover copper. The current item is ink, not a link.
- Pattern: `Originals / {collection} / {title}`. The collection crumb shows only when the PDP was reached through a collection URL (`collection` exists in Liquid); otherwise `Originals / {title}`. "Originals" links to a Theme Editor collection setting.

### 3.2 Main section (REQUIRED)
- Padding `20px gutter clamp(80px,9vw,144px)`.
- `display:flex; flex-wrap:wrap; gap:clamp(32px,5vw,96px); align-items:flex-start`.
- **Media column** `flex: 7 1 520px`.
- **Info column** `flex: 5 1 360px; max-width: 560px`.

**Media column.** A grid of `72px minmax(0,1fr)`, gap 18px.
- **Thumbnail rail** (left), a vertical stack with a 10px gap. Each thumb is a button:
  - 72 × 88px, padding 6px, mat `#F0F2F1`;
  - the image is contained;
  - a 1px border, **ink `#15202A` when current**, otherwise transparent.
  - The rail is hidden when there's only one media item; the stage then takes the full column (§8).
- **Stage** (right):
  - `aspect-ratio: 1/1`, background **gesso** (V2 rule: no mist or dark field behind product art).
  - The artwork sits in an inner box with **padding 6% 14%**, `max-width/max-height: 100%`, never cropped.
  - Deep hang shadow: `0 1px 2px rgba(13,20,26,.08), 0 30px 60px -28px rgba(13,20,26,.45)`.
- **Caption row** (14px below the stage): Mulish 15px `#565C61`, space-between. On the left, the current media's label (its alt text, or the product title for the first image); on the right, `n / N`. It is hidden when N = 1.

How each proportion sits on the 1:1 stage with 6%/14% padding:
- **Vertical works** (Essence, 1:2) are bounded by height. They occupy about 88% of the stage height at about 44% of its width, centred. Correct: the white space either side is intended gallery air.
- **Square works** are bounded by width (72%).
- **Landscape works** are bounded by width, centred vertically.
- **Very wide works (≥ 2:1)** become small on a square stage. **NIJ:** keep 1:1 for consistency (approved), or let the stage become 4:3 for works wider than 1.6:1. Recommendation: keep 1:1 for the first implementation, then review against a real wide work.

**Info column.** `display:grid; gap:28px`. It is `position: sticky; top: 24px` (approved). Sticky only takes effect when the info column is shorter than the media column. **Do not** force it with `max-height` + internal scroll. On a long info column it simply scrolls with the page.

1. **Label block** (gap 12px):
   - **Eyebrow:** the series/collection name, Marcellus 12px, +0.22em, caps, copper `#96502A`, links to the collection. It shows only when a collection context exists (§9, Q2).
   - **Title** `h1`: Marcellus 400, `clamp(40px,4vw,60px)`/1.05, ink, `text-wrap: balance`.
   - **Subtitle:** Mulish 19px/1.5 `#3B4044`. "Original painting · {medium}" when the medium is known; otherwise "Original painting". **NIJ:** how "original" is known (Q3). If it cannot be determined, omit the subtitle rather than guess.
2. **Purchase block:** padding-top 24px, `border-top: 1px solid #CDD1D2`, gap 18px. See §5 (available) and §6 (sold).
3. **Facts** `<dl>`: grid `auto minmax(0,1fr)`, gap 12px 28px.
   - `dt`: Marcellus 11px, +0.2em, caps, `#565C61`, padding-top 4px.
   - `dd`: Mulish 17px/1.45, ink.
   - **Rows only when data exists** (§9). There are no "To confirm" rows in production; that was a prototype device.
4. **Accordion** (the design-system Accordion):
   - hairline `#CDD1D2` top and bottom rules;
   - rows with 18px vertical padding;
   - titles Marcellus 13px, +0.16em, caps;
   - a 16px plus/minus icon;
   - body Mulish 17px/1.6 `#3B4044`, padding-bottom 20px;
   - opening animates `grid-template-rows` over 320ms with the pour easing;
   - all rows closed by default; several can be open at once.

### 3.3 The story band (REQUIRED when `custom.artwork_story` has content)
- Full-bleed **Ink `#15202A`** (an editorial ground, allowed). Inner `max-width:1560px`, padding `clamp(88px,10vw,168px) gutter`.
- Flex, wrapping, gap `clamp(32px,6vw,112px)`:
  - **Left** `flex:3 1 220px`: eyebrow "The story" (Marcellus 12px, +0.22em, gold `#C7A864`), then the sub-label "In Ranjeeta's words" (Mulish 16px `#A4A9AC`). The sub-label is a Theme Editor text with that default; it can be cleared.
  - **Right** `flex:9 1 520px; max-width:900px`: the story as a `<blockquote>`, Mulish *italic* `clamp(26px,2.5vw,36px)`/1.45, gesso, `text-wrap: pretty`.
- **Long stories:** the large italic only works for about 60 words. If the story is longer than about 420 characters or has more than one paragraph, set it in **Mulish roman 22px/1.6 `#E3E7E7`**, max 34em, paragraphs 1em apart. (**NIJ**, this is a recommendation; the approved screen only shows a short story.)
- The prototype's "From the series" row is **FUTURE** (it needs series content).

### 3.4 Scale (OPTIONAL; only renders when width and height exist)
- Section `max-width:1560px`, padding `clamp(88px,10vw,160px) gutter`, flex wrapping, gap `clamp(40px,6vw,96px)`, items centred.
- **Left** `flex:7 1 460px`, `aspect-ratio:5/4`: the **room/context image** (the first media item flagged as room, §8), `object-fit: cover`, no shadow (it is a photograph of a room; the PLP rule for room photos).
- **Right** `flex:5 1 320px; max-width:520px; gap:22px`:
  1. eyebrow "Scale" (copper);
  2. H2 Marcellus `clamp(30px,2.8vw,42px)`/1.15: "{W} × {H} in" (for example "20 × 40 in"; **NIJ**: the approved line "A large work, 4 feet tall." needs a size-word rule; recommend the plain dimensions for first implementation);
  3. one line, Mulish 18px/1.6 `#3B4044`: Theme Editor text, default "Shown with a 5 ft 6 in figure for scale.";
  4. the **scale diagram**: a 190px-tall box with an ink baseline, holding a filled rectangle at the work's proportion (fill `#505359`), then 24px further on an outlined figure box (`#767C80`, 1px, no bottom border), 18 in × 66 in, all at the same scale. Legend below in Mulish 15px `#565C61`: "■ {title} · {W} × {H} in" and "□ Person, 5 ft 6 in". The diagram is `aria-hidden`; the dimensions are already in the facts.
- **No room image:** the diagram + text alone, the left column dropped, and the right column at `max-width:520px`.
- **No dimensions:** omit the whole section.

**NIJ (Q5):** whether Scale is worth building now, since the room image already appears in the media rail. Recommendation: build it in the first pass only if Essence-style room photos are common; otherwise defer.

### 3.5 Related works (REQUIRED)
- Full-bleed **Stone mist `#E3E7E7`** band. Inner `max-width:1680px`, padding `clamp(80px,9vw,144px) gutter`.
- **Header row** (space-between, `align-items:flex-end`, wraps, margin-bottom `clamp(36px,4vw,56px)`):
  - H2 Marcellus `clamp(28px,2.6vw,40px)`; Theme Editor text, default "More originals". The prototype's "More in light and dark" was series-specific.
  - A label link to all originals (Theme Editor URL).
- **Grid:** 3 columns (`repeat(auto-fill, minmax(max(260px, calc((100% - 2*gap)/3)), 1fr))`), gap `clamp(24px,3vw,56px)`, `align-items:start`, reusing the **existing artwork card** unchanged (8:9 plates on desktop, as live on the PLP).
- **Source:** Shopify product recommendations (`intent=related`), loaded through the section rendering API, max 3. The current product is never included. Sold works may appear (they are part of the body of work).
- **No recommendations:** hide the section.

### 3.6 Footer
The existing footer, directly after related works.

---

## 4. Mobile composition (< 750px)

Mobile is its own design: **art first, label second, story third, details last**, with the **purchase action always reachable in a bottom bar**.

1. **Header** (existing, 58px).
2. **Media** (REQUIRED), full-bleed, immediately under the header. No breadcrumb on mobile (**NIJ**; the prototype omits it):
   - A horizontal **scroll-snap** strip, `aspect-ratio:4/5`, gesso, scrollbar hidden, `scroll-snap-type:x mandatory`.
   - Each media item is one 100%-wide panel. Artwork panels have padding `9% 14%`, the image contained with the shadow `0 24px 40px -20px rgba(13,20,26,.45)`. Room panels are `object-fit: cover`, with no padding and no shadow.
   - **Tag** bottom-right (12px in): `rgba(248,248,246,.92)`, padding `5px 9px`, Marcellus 10px, +0.18em, caps, `#3B4044`. It reads "Swipe · N views" initially and then "n / N" after the first swipe (**NIJ**; the approved screen shows only the initial text, and the counter is recommended for orientation). Hidden when N = 1.
   - Native touch scrolling only, no JS carousel library. Keyboard: the strip is a focusable region with arrow-key scrolling.
3. **Label block** (padding `26px 20px 8px`, gap 10px):
   - eyebrow (11px copper, when a collection context exists);
   - `h1` Marcellus 34px/1.1;
   - subtitle Mulish 16px/1.5 `#3B4044`: "{medium · }{W × H in}".
   - **Sold:** plus the note "This painting has been collected." (Mulish 16px/1.55), 8px above.
4. **Facts** (REQUIRED; inferred: the approved phone screens are abbreviated and skip the facts, but the information must not be lost). The same `<dl>` as desktop at 16px, padding `16px 20px 0`, and "Ask Ranjeeta about this painting" as a label link below it (available state; 44px target).
5. **Story band**, ink, padding `40px 20px`, margin-top 24px. Eyebrow 11px gold; the story Mulish italic 21px/1.45 (the long-story rule: roman 18px/1.6).
6. **Accordion**, padding `24px 20px 40px`.
7. **Scale** (if built): stacked. The room image at 4:5 cover, then the eyebrow, the H2 26px, and the diagram at 150px tall.
8. **Related works**: a horizontal snap row matching the homepage Selected works mobile pattern (78% cards, 14px gap, 24px side padding). **NIJ**; not in the approved PDP phones. The alternative is the PLP single column, which is very long here.
9. **Footer.**

**Sticky purchase bar** (REQUIRED, approved):
- `position: sticky; bottom: 0`, gesso at 97% (`rgba(248,248,246,.97)`), top hairline `#CDD1D2`, padding `12px 16px 22px` (+ `env(safe-area-inset-bottom)`), flex, gap 12px, items centred.
- **Available:** the price (Mulish 22px ink, min-width 64px), then a primary "Add to bag" button, 48px, flexible width.
- **Sold:** the dot (8px `#B0602F`) + "SOLD" (Marcellus 12px, +0.2em), then a secondary "See available works" button, 48px.
- It is always visible on the PDP (approved), so the page needs bottom padding equal to the bar height so the footer isn't covered.
- **The desktop purchase block is not shown on mobile.** The bar's button submits **the same form** (`<button form="product-form-{id}">`), so there is exactly one product form.

---

## 5. Available original (Essence V2)

**Purchase block contents:**
1. A row (space-between, baseline, wraps):
   - **Price**, Mulish 30px ink: "$1,500" (whole units when there are no cents, using the store money format; the PLP rule).
   - **Status**: Marcellus 12px, +0.18em, caps, green `#2F6B5A`, a 16px Lucide `check` icon, "Available". It adds "· one of one" only when the product is known to be an original (Q3).
2. **Add to bag**: primary, large (56px), full width; teal `#0F5468`, hover `#0B4050`, 160ms.
3. **Ask Ranjeeta about this painting**: secondary, large, full width, a `mail` icon at the start; ink outline, fills ink on hover. A `mailto:` built from a Theme Editor email setting with `?subject={title}`. (OPTIONAL as a contact-page link, Q6.)

**Commerce behaviour:**
- **No quantity control.** The form posts the first available variant id with `quantity=1` hidden. One of one: never show a stepper.
- **No variant UI** when `product.has_only_default_variant`. If an original ever has real variants (unexpected), render the standard option selects in this block above the button: Mulish 17px, 2px radius, hairline border. **NIJ** (Q4).
- **Add to bag, progressively enhanced:**
  - Without JS: a normal POST to `/cart/add`, so Shopify goes to the bag.
  - With JS: `fetch('/cart/add.js')`.
  - On success the button reads "Added to bag" and is disabled (the only unit is now in the bag). A label link "View bag" appears directly below it, and the header bag count updates.
  - Announce through an `aria-live="polite"` region: "Essence V2 added to your bag."
  - If the theme has a bag drawer, open it instead (**NIJ**: no drawer is designed).
- **Already in the bag on load** (`cart.items` contains the variant): show "In your bag" + "View bag" from the start.
- **Add fails** (sold meanwhile, 422): replace the purchase block with the sold state's note ("This painting has just been collected.") and keep the page. No error-red styling.

## 6. Sold / archive original (Colored by Nature-Blue V2)

- **Source:** `product.available == false` (the same rule as the PLP). No sold metafield.
- **Media, title, facts, story, scale, related:** unchanged, at full strength. No greying, no overlay, no "sold" stamp on the art.
- **Purchase block** becomes (gap 18px):
  1. **"SOLD"**: Marcellus 15px, +0.2em, caps, ink, preceded by a 10px `#B0602F` dot, 10px gap. Never colour alone.
  2. The note: Mulish 18px/1.6 `#3B4044`, "This painting has been collected." When a collection context exists, it adds " It stays here as part of the {collection} series." The copy is a Theme Editor text with the default; it is placeholder voice to confirm with Ranjeeta.
  3. **See available works**: secondary, large, full width; links to a Theme Editor collection (default: Originals, filtered to available if the URL supports `?filter.v.availability=1`).
  4. **Commission a painting in this spirit**: an inline text link (teal, underlined, hover copper) to a Theme Editor URL. Hidden if blank.
- **Price is not shown** on sold works (approved). The historical price stays in Shopify.
- **No disabled "Sold out" button**, and no notify-me form (FUTURE, if Ranjeeta wants it).
- "Ask Ranjeeta" is not shown in the sold state (approved). The commission link takes its place.
- **Print relationship** ("View the print of this work" + the sand print card): **FUTURE**, needs an originals-to-prints link (Q7).

---

## 7. Media behaviour

### Order and roles (current convention)
- Media position 1 = **the primary artwork** (clean, edge-to-edge photograph).
- Media 2…n = **supporting**: room/context, detail, edge, back. **Room detection** is needed for two things: room panels are not padded and use cover on mobile, and Scale picks its image (§3.4). Recommendation without new fields:
  - use **alt text starting with "Room"** (for example "Room view: Essence above a bench") as the signal;
  - **fallback: media position 2 = room** (the PLP convention);
  - **NIJ** (Q1).
- **Images only.** Video and 3D media are skipped in the first implementation (FUTURE). Never autoplay video.

### Desktop interaction
- Clicking a thumb swaps the stage image. A 320ms opacity crossfade (pour easing); reduced motion: instant.
- ← / → move through the media while focus is on a thumb. Thumbs are `<button aria-label="View image 2 of 4: {alt}" aria-current="true|false">` inside a `<div role="group" aria-label="Artwork images">`. (The prototype's `role="tablist"` isn't needed; plain buttons are simpler and correct.)
- The rail stays visible beside the stage. **Many images (> 6):** the rail becomes `max-height: <stage height>; overflow-y: auto`, with thin native scrollbars. Do not add rail arrows.
- **Room/context images on the stage:** contain, no padding, no shadow, on gesso, so the whole photograph is visible.
- **No zoom or lightbox** in V2. FUTURE: a full-screen view on click.
- The stage itself is not a link.

### Mobile interaction
- Native swipe (§4). The tag updates through an `IntersectionObserver` or `scrollend` and is announced politely as "Image 2 of 4".
- No thumbnails on mobile.

### Loading
- Primary image: `loading="eager" fetchpriority="high"`, `sizes="(min-width:1000px) 52vw, 100vw"`, widths 600–2000.
- Stage swaps load at the same widths on demand. Thumbs at 160w.
- Mobile panels 2…n are `loading="lazy"`.
- Set `width`/`height` attributes from the media's aspect ratio to avoid layout shift. The stage's fixed aspect ratio already reserves the space.
- The page JS (media swap + add to bag) is one small deferred custom element, about 3 KB. No libraries.

---

## 8. Edge cases

| Case | Behaviour |
|---|---|
| **One image** | No rail; the stage spans the media column; no caption counter. Mobile: a single panel, no tag. Scale shows the diagram only. |
| **Many images (> 6)** | The rail scrolls (§7); mobile panels just continue. The counter shows the total. |
| **No meaningful variants** | No selector, no quantity. Default variant id hidden. |
| `artwork_width`/`height` blank | No Size row, no dimensions in the mobile subtitle, no Scale section. |
| Only one of width/height | Treat as blank. |
| `ready_to_hang` blank | No row. **NIJ** on the type (Q8): if boolean, true → "Ready to hang", false → "Needs framing" (copy to confirm), blank → no row. |
| `certificate_notes` blank | No Certificate row and no Certificate accordion item. With content: the row shows "Included" and the accordion item shows the full notes (**NIJ**: or show the notes in the row if they're short; recommend the row when under 60 characters, otherwise the accordion). |
| `artwork_story` blank | No story band at all. Nothing replaces it. |
| Medium unknown | The subtitle and Medium row are omitted. |
| No collection context | No eyebrow, no collection crumb, the sold note without the series sentence. |
| Price $0 / price on enquiry | Hide the price and Add to bag; show "Price on enquiry" (Mulish 18px) and promote "Ask Ranjeeta" to primary. **NIJ**: the same open trigger as the PLP. |
| Long title | `text-wrap: balance`; never truncate. |
| In bag already | "In your bag" + "View bag" (§5). |
| Inventory not tracked | It shows as available forever. Originals **must** track inventory (Q9). |
| No recommendations | Related works is hidden. |
| No room image | No room panel; Scale is diagram-only (if built). |

---

## 9. Shopify mapping

| Element | Source | Type | Fallback |
|---|---|---|---|
| Breadcrumb "Originals" | Theme Editor collection setting | Theme Editor | the "/collections/all" label "Works" |
| Collection crumb, eyebrow, sold-note series name | `collection` (only when the URL is in a collection) | Native | omit (Q2) |
| Title | `product.title` | Native product | — |
| Subtitle "Original painting" | **unresolved** (product type, collection or tag) | Q3 | omit |
| Medium | Shopify taxonomy attribute, if one is filled for the category | Taxonomy | omit |
| Price | `product.selected_or_first_available_variant.price` | Variant | — |
| Available / Sold | `product.available` | Inventory | — |
| "one of one" | depends on Q3 | — | omit |
| Add to bag | the product form (`/cart/add`), variant id, qty 1 | Native | — |
| Ask Ranjeeta | Theme Editor email setting + `product.title` | Theme Editor | hide if blank |
| See available works, Commission link | Theme Editor URL settings | Theme Editor | hide the commission link if blank |
| Sold note copy, story sub-label, scale line, related heading | Theme Editor text settings | Theme Editor | defaults in §5–§3.5 |
| Primary artwork | `product.media[0]` | Media | the theme's placeholder plate |
| Supporting and room media | `product.media` 2…n, images only; room = alt starts with "Room" or position 2 | Media | — |
| Media labels | `media.alt` | Media | "{title}, image n" |
| Size | `custom.artwork_width` × `custom.artwork_height` via `artwork-dimensions` | Metafield | omit |
| Ready to hang | `custom.ready_to_hang` | Metafield | omit |
| Certificate | `custom.certificate_notes` | Metafield | omit |
| Story | `custom.artwork_story` | Metafield | omit the band |
| Shipping & packing (accordion) | a Theme Editor rich-text setting (shop-wide), or a linked page | Theme Editor | hide the item |
| Related works | Product recommendations API (`related`) | Native | hide |
| Year, exhibitions, series quote, print link, signature, framing details | **not available** | FUTURE | not rendered |

**No new metafields are required for the first implementation.**

---

## 10. Implementation priority

**REQUIRED (first implementation)**
- The main section: breadcrumb, media rail + 1:1 gesso stage, the sticky info column, available and sold purchase blocks, facts from the existing metafields, the accordion (certificate, shipping).
- One product form, no quantity, no variant UI; AJAX add with a no-JS fallback.
- The story band (conditional).
- Related works via recommendations.
- Mobile: swipe media, label, facts, story, accordion, related, sticky purchase bar.
- All empty-field rules in §8. Accessibility (§13). Image loading (§7).

**OPTIONAL enhancement**
- The Scale section with diagram + room image.
- "Ask Ranjeeta" routed to a contact page with the work prefilled instead of `mailto:`.
- The "n / N" mobile counter after the first swipe.
- The long-story typographic switch.

**FUTURE**
- The print relationship (sold → "View the print"; the sand "Also available as a print" card).
- Year, exhibitions ("Where this work has been shown"), the "From the series" quote.
- Video and 3D media, full-screen zoom.
- Notify-me for sold works, a bag drawer.

---

## 11. Typography (Marcellus / Mulish; no bold)

| Role | Font | Desktop → mobile | Tracking / case | Colour |
|---|---|---|---|---|
| Breadcrumb | Mulish | 15px | — | `#565C61`, current ink |
| Eyebrow | Marcellus | 12px → 11px | +0.22em caps | copper `#96502A` (gold `#C7A864` on ink) |
| Title h1 | Marcellus | clamp(40,4vw,60)/1.05 → 34/1.1 | normal | ink |
| Subtitle | Mulish | 19/1.5 → 16/1.5 | — | `#3B4044` |
| Price | Mulish | 30px → 22px (bar) | lining numerals | ink |
| Status / SOLD | Marcellus | 12px (sold block 15px) | +0.18–0.2em caps | `#2F6B5A` / ink + dot |
| Buttons | Marcellus | 14px (lg 56px) → 13px (48px) | +0.16em caps | — |
| Facts dt / dd | Marcellus 11 / Mulish 17 | → 11 / 16 | +0.2em caps / — | `#565C61` / ink |
| Accordion title / body | Marcellus 13 / Mulish 17/1.6 | same | +0.16em caps | ink / `#3B4044` |
| Story | Mulish italic | clamp(26,2.5vw,36)/1.45 → 21/1.45 | — | gesso |
| Section H2 | Marcellus | clamp(28–30, 2.6–2.8vw, 40–42) → 24–26 | normal | ink |
| Media caption, tag | Mulish 15 / Marcellus 10 | — | tag +0.18em caps | `#565C61` / `#3B4044` |

## 12. Hover, focus, touch, motion

- **Focus:** a 2px cerulean `#2E8FB5` outline, 3px offset, on every control, thumb, link and the mobile media region.
- **Hover:**
  - links and breadcrumb turn copper (160ms);
  - primary button fill `#0B4050`;
  - secondary fills with ink and the text turns gesso;
  - label-link arrow moves 4px;
  - thumbs: the border turns `#A4A9AC` on hover (not current) (**NIJ**; not shown in the prototype, and recommended for affordance).
- **Nothing is hover-only.** Every media item is reachable by thumb buttons, keys and swipe.
- **Touch:** every target is at least 44px (thumbs are 72 × 88; the bar buttons are 48px).
- **Motion:**
  - stage crossfade 320ms;
  - accordion 320ms;
  - button colour 160ms;
  - all with `cubic-bezier(.22,.61,.36,1)`.
  - No entrance animations, no parallax, no image zoom on hover.
  - `prefers-reduced-motion` makes all of them instant.

## 13. Accessibility

- One `h1` (the title). The story band, Scale and Related use `h2`, or `aria-labelledby` (the story band has `aria-label="The story"`).
- Breadcrumb: `<nav aria-label="Breadcrumb">` with an ordered list and `aria-current="page"`.
- The purchase state is written as text ("Available", "Sold"), never colour only. The bar mirrors it.
- Facts are a real `<dl>`.
- Thumbs and the mobile strip work as described in §7. The live region announces the image changes and the add-to-bag result.
- Alt text comes from `media.alt`. The primary image is required to have one (a merchant guideline: "{title}: {short description of the painting}").
- The accordion uses `<button aria-expanded>` and controls a region. Native `<details>` is acceptable if styled identically.
- The sticky bar must not cover focused elements: add `scroll-padding-bottom` equal to its height.

---

## 14. Design decisions Cursor must preserve

1. **Artwork never cropped**: contain on a gesso stage (desktop 1:1, mobile 4:5) with the hang shadow. Only room photographs may cover.
2. **Gesso behind product art.** No mist, dark or coloured field around the painting on the PDP.
3. **Asymmetric 7/5**, with the media column wider and the info column capped at 560px. Not a 50/50 shop layout.
4. **Sold stays strong**: the same images, story and facts; only the purchase block changes; no greyed or disabled UI.
5. **Commerce is clear but quiet**: one teal button, Mulish price, no quantity, no badges, no urgency, no trust-icon rows.
6. **Supporting media is a restrained rail of matted thumbs**, not a carousel with arrows or a dot strip on desktop.
7. **The story is an ink editorial band**, italic, in Ranjeeta's voice. It is omitted when empty, never filled with placeholder text.
8. **Mobile is composed, not stacked**: art first, swipe media, the story band, a single sticky purchase bar.
9. **Only real data is rendered.** Blank metafields remove their rows; nothing says "To confirm".
10. Square corners, hairlines, Marcellus never bold.

## 15. Questions / risks (decide before building)

| # | Question | Why it matters | Recommendation |
|---|---|---|---|
| Q1 | How is a room/context image identified? | Padding, fit, and the Scale image | Alt text prefix "Room", fallback position 2; no new field |
| Q2 | How is the series known when the PDP is opened directly (not via a collection)? | Eyebrow, crumb, sold note | Accept no eyebrow outside collection context for now; FUTURE `custom.series` (the same open item as the PLP) |
| Q3 | How do we know a product is an *original* (vs a future print)? | Subtitle, "one of one", the sold rule | Product type "Original painting" (native field) |
| Q4 | Will any original ever have variants? | Variant UI | Assume no; render the standard selects only if they exist |
| Q5 | Build Scale now? | Effort vs value; needs dimensions on every product | Defer unless room photos are common |
| Q6 | "Ask Ranjeeta": `mailto:` or the contact page? | Spam and tracking | `mailto:` first; a contact page with prefilled subject later |
| Q7 | Print relationship | The sold-state primary action | FUTURE; needs a product reference metafield when prints exist |
| Q8 | `custom.ready_to_hang` type (boolean or text)? | Row copy | Confirm in Admin before building |
| Q9 | Do all originals track inventory, with "continue selling" off? | Sold detection depends on it | Required merchant setting |
| Q10 | Is unavailable always the same as sold? | Draft or hidden reasons | Accept for originals (as on the PLP) |
| Q11 | Sold note and copy defaults | Voice | Confirm with Ranjeeta; keep as Theme Editor texts |
