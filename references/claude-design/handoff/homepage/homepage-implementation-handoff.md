# Zita's Art Studio: Homepage Implementation Handoff (V2)

**Source of truth:** `Homepage.dc.html`, `Hero Carousel.dc.html`, `Hero Carousel Spec.dc.html`, `Zita Header.dc.html`, `Phone.dc.html` (mobile header and menu), `Zita Footer.dc.html`, `Artwork Card.dc.html`, `Brand Foundations.dc.html` (V2 rules). Where this document and the prototype disagree, the prototype wins. Values below are taken from the prototype source. **Needs implementation judgment** marks anything the design does not settle.

Two things in the prototype are not part of the design: the dark "Proto Bar" strip at the very top (a review tool) and the device frame in the mobile view.

**Older design-system docs.** The original design-system guide (`_ds/…`) predates V2 and is out of date on several points: it names Tenor Sans + Alegreya, a 1360px max width, a centred wordmark, a 76px sticky header and "no carousel". V2 overrides all of these. Use the token *values* (colours, shadows, easing) from it, but not those rules.

---

## 1. Homepage design intent

- **Feel:** like stepping into a quiet, well-lit gallery. Calm, spacious, cool-toned. The paintings are the only strong colour on screen.
- **Understand:** Ranjeeta Shroff is a self-taught abstract artist who paints in fluid acrylic. She works **in series**, has gallery recognition (Curator's Choice, 2026), and every original is one of a kind.
- **Explore:** the current series first, then her point of view, then a few selected works, then her recognition, then the ways to collect (originals, prints, commissions).
- **Do:** open a series or a painting. Buying happens on the product page. The homepage invites browsing and never pushes a purchase: no prices in the hero, no "Shop now" or "Buy now".
- **Role in the site:** the gallery entrance. It hands visitors to listing pages (series) and product pages (works). It sets the "art first, commerce enabled" tone that the listing and product pages then keep.

---

## 2. Page anatomy, top to bottom

Every band spans the full browser width. Content sits in a centred container, `max-width: 1560px`, with gutters `clamp(20px, 3.4vw, 56px)`. The carousel's inner layout uses `max-width: 1680px`. All corners are square.

### 2.1 Announcement band
- **Purpose:** one line of news, currently the Curator's Choice award.
- **Content:** a short message, then an "Exhibitions" link (underlined, pale teal `#CFE4E9`).
- **Layout:** centred, wraps on narrow screens, padding 10px × 24px.
- **Surface:** Deep teal `#0B4050`; gesso text, Marcellus 12px caps, +0.16em.
- **Desktop:** full message. Below about 1000px it shortens to "Curator's Choice · Le Gateau Gallery, France".
- **Mobile:** not shown in the mobile prototype. **Needs implementation judgment:** hide it, or show the short form.
- **Editable:** yes. Section settings for text, link label, link URL and on/off.

### 2.2 Header: see §3.

### 2.3 Hero carousel: see §4 (full spec).

### 2.4 Current series
- **Purpose:** says "Ranjeeta paints in series; these are the ones featured now."
- **Hierarchy:** copper eyebrow "Current series" → H2 "Ranjeeta paints in series, each one a body of work." (max 18ch) → on the right, bottom-aligned, a label link "All originals". Then a row of series items.
- **Item (the same for every series):** image on a 4:5 mat → series name → optional description → "Explore the series" with an arrow. The whole item is one link to the collection.
- **Grid:** 3 equal columns for 3 series, 2 equal columns for 2 (`repeat(n, minmax(0,1fr))`). Below about 720px of container width: 1 column. Gaps: rows `clamp(48px,5vw,72px)`, columns `clamp(24px,3vw,56px)`. The item is a CSS grid with rows `auto auto 1fr auto`, so every "Explore the series" link sits on one baseline even when descriptions differ in length.
- **Image:** mat `#F0F2F1`, 12% inner padding. The image is contained (`max-width/max-height: 100%`), **never cropped**, with the hang shadow. On hover the mat shifts to `#E3E7E7` over 320ms.
- **Whitespace:** a large gap above, `clamp(96px,11vw,176px)`, so the section clearly breathes after the carousel. `clamp(80px,9vw,144px)` below. Header to grid: `clamp(40px,5vw,72px)`.
- **Surface:** gesso.
- **Mobile:** stacked vertically. A square (1:1) mat instead of 4:5; name 24px; description 16px; link row at least 44px tall. Eyebrow plus a smaller statement (26px) at the top. The "All originals" link is not in the mobile prototype (**needs implementation judgment**).
- **Editable:** yes. One block per series, 2–3 blocks (§8).

### 2.5 Point of view ("In her words")
- **Purpose:** Ranjeeta's own voice.
- **Desktop:** two-part flex row, vertically centred, gap `clamp(40px,6vw,112px)`. Left: a portrait, 4:5, about 360px wide (an image slot in the prototype; no portrait has been supplied). Right, max 780px: gold eyebrow "In her words" → italic Mulish quote `clamp(26px,2.6vw,38px)`/1.38 → short bio, 18px, pale teal `#CFE4E9`, max 34em → label link "Read Ranjeeta's story" (dark tone).
- **Surface:** Deep teal `#0B4050`. Section padding `clamp(80px,10vw,160px)`.
- **Mobile:** the portrait and bio are omitted. Eyebrow, then the quote trimmed to its first sentence (23px), then the link. **Needs implementation judgment:** a separate mobile quote field, or reuse the desktop one.
- **Editable:** yes. Portrait image, eyebrow, quote, optional mobile quote, bio, link label and URL.

### 2.6 Selected works
- **Purpose:** a short, curated look at individual paintings. This is the homepage's only product grid.
- **Hierarchy:** H2 "Selected works" on the left. A short line on the right (max 28em), bottom-aligned with the heading, which currently includes "Hover a work to see it on a wall." Then 4 artwork cards.
- **Grid:** `repeat(auto-fit, minmax(min(100%,180px),1fr))`, gap `clamp(20px,3vw,48px)`, `align-items:start`. **No vertical staggering:** all cards share one top line and caption baseline (a V2 rule for every product grid).
- **Card:** see §9 (Artwork card).
- **Surface:** Stone mist `#E3E7E7`. The cards' mats (`#F0F2F1`) sit one step lighter.
- **Mobile:** a horizontal scroll-snap row. Each card is 78% wide, gap 14px, side padding 24px, scrollbar hidden. A "Swipe" hint sits to the right of the title. Each card can also be swiped internally from the artwork to its room view.
- **Editable:** yes. A product list setting (§8).

### 2.7 Recognition
- **Purpose:** credibility, presented as an editorial moment.
- **Desktop:** two-part flex row (about 5:6). Left: the awarded painting, max 460px wide, centred, **no shadow**, sitting directly on the dark ground. This is allowed because it is an editorial band, not a product page (V2 grounds rule). Right, max 620px: gold eyebrow "Recognition" → H2 "Curator's Choice" `clamp(40px,4.4vw,68px)`/1.05 → 20px body with the work's title in italics → 17px secondary line in `#A4A9AC` → "Exhibitions" label link (dark tone).
- **Surface:** Night `#0D141A`.
- **Mobile:** stacked. Image at 72% width, centred; eyebrow; heading 34px; shortened body. The link is not in the mobile prototype (**needs implementation judgment**; keep it, as it is cheap).
- **Editable:** yes. Image, eyebrow, heading, body (rich text), secondary line, link label and URL.

### 2.8 Living with the work (originals, prints, commissions)
- **Purpose:** the three ways to collect.
- **Hierarchy:** H2 "Living with the work" (max 16ch), then three columns that flex 4 : 5 : 4 and wrap.
  - **Originals:** 1px ink rule on top, 24px padding above the text → copper eyebrow → Marcellus 28px statement → 18px body → "View originals" label link.
  - **Prints (middle):** a **Sand `#ECE6DD` panel** containing a 4:5 image (a print photographed in a room; image slot) beside the text: copper-dark eyebrow `#7A3F21` → 24px statement → 17px body → "View prints" link. The panel's two columns are bottom-aligned.
  - **Commissions:** the same rule-top treatment as Originals; its body is an italic quote (21px), then a 17px line, then "Begin a commission".
- **Asymmetry:** the middle panel is wider and filled with colour; the two outer columns are open and ruled. This contrast is deliberate editorial asymmetry. Keep it.
- **Surface:** gesso, with the sand panel.
- **Mobile:** three large tappable rows, each with an ink top rule, a Marcellus 22px title with "→" on the right, and a 16px description underneath. No image.
- **Editable:** yes. Section with three blocks (§8).

### 2.9 From the studio (Instagram)
- **Desktop:** a flex row. Text column (max 460px): teal eyebrow "From the studio" → H2 `clamp(30px,2.8vw,42px)` → secondary button "Follow Ranjeeta" with the Instagram icon. Image column: 3 posts in equal columns, 4:5. **The middle post is offset down by `clamp(24px,4vw,64px)`.** This is editorial and allowed (these are not product cards).
- **Surface:** Vaayu mist `#DCE6EA`.
- **Mobile:** stacked. Eyebrow → 24px heading → 3 posts in a row (gap 8px, no offset) → full-width button.
- **Editable:** heading, eyebrow, button label and URL, 3 images. **Needs implementation judgment:** a live feed (an app) or 3 manual images. The design only needs 3 images.

### 2.10 Footer: see §3.

---

## 3. Global shell visible on the homepage

### Header (desktop)
- **Bar:** gesso `#F8F8F6`, 1px bottom hairline `#E3E7E7`, minimum height 84px, 1560px container. Items in one row: wordmark, then nav (takes the remaining space, left-aligned after the wordmark), then icons.
- **Wordmark (confirmed, Option B "tracked capitals"):** `ZITA'S` Marcellus 21px, +0.2em, ink · a 1 × 20px rule `#A4A9AC` · `ART STUDIO` Marcellus 11px, +0.32em, `#3B4044`. Gap 14px. **Left-aligned**, live text, links home, `aria-label="Zita's Art Studio, home"`. No image logo.
- **Nav:** Marcellus 13px caps, +0.16em (tightens to +0.1em below about 1000px). Items: **Originals ▾** (opens the series menu), Prints, Exhibitions, About, News, Contact. Gap between items 34px at ≥1280px, 22px at ≥1000px, 16px below. Hover: copper. Current page: teal text plus a 1px teal underline.
- **Icons (44 × 44 icon buttons, 1.25px Lucide stroke):** Search, Instagram (only at ≥1180px), Bag (with a count badge when items are in it). No account icon appears in the design. **Needs implementation judgment** on whether customer accounts are needed.
- **Originals menu (mega menu):** opens on hover or click, closes 120ms after the pointer leaves, closes on Esc. A full-width gesso panel under the bar with `--shadow-overlay`, in three columns (1.1 : 1 : 0.9):
  1. copper eyebrow "Current series" → each series as Marcellus 24px name plus a Mulish 15px line "{status} · {count} originals", with hairline separators. Hovering or focusing a series updates column 3.
  2. plain links at Mulish 19px: All originals · Earlier series & sold work · Commission a painting.
  3. a 1:1 mat preview of the hovered series' image, contained, with the hang shadow.
- **Sticky or static:** the prototype header is **static** (scrolls away). **Needs implementation judgment.** If it becomes sticky, keep it solid gesso (never transparent) and do not let it shrink or animate.
- **Transparent state:** none. The header is always solid and sits *above* the carousel, never over it.

### Header (mobile)
- 58px bar: gesso with a bottom hairline. Wordmark `ZITA'S` 17px / rule 16px / `ART STUDIO` 10px +0.3em, gap 10px. On the right: a Bag icon button, then a **text** button "MENU" (Marcellus 12px caps, +0.2em, at least 44px tall) that reads "CLOSE" when open. No hamburger icon.
- **Menu:** a full-screen gesso overlay under the bar, scrollable:
  1. copper eyebrow "Originals · current series" → each series as a row with a 64px mat thumbnail, a Marcellus 22px name and a 15px status line, hairline separated, rows at least 64px tall.
  2. "All originals, earlier series & sold work →", teal caps, 13px.
  3. Prints, Exhibitions, About, News, Commissions, Contact: Marcellus 19px rows, 52px tall, hairline top borders.
  4. at the bottom: "Follow on Instagram" (with icon) and the email address.
- **Open/close animation:** not specified (**needs implementation judgment**; at most a 320ms fade).
- Search on mobile is not shown in the design (**needs implementation judgment**).

### Footer
- **Surface:** Ink `#15202A`. Padding `clamp(64px,8vw,112px)` top, 72px bottom.
- **Top area:** two columns (auto-fit, minimum 420px).
  - Left: gold eyebrow "Letters from the studio" → H2 Marcellus `clamp(26px,2.4vw,34px)` → an email field (52px tall, transparent with a `#767C80` border, square) joined to a "JOIN" button (gesso fill, ink text, hover `#CFE4E9`). Success message: "Thank you. You're on the list."
  - Right: link columns **Art** (current series, All originals, Prints) · **Studio** (About Ranjeeta, Exhibitions, News, Commissions) · **Contact** (email, phone, Instagram). Column headings: Marcellus 11px caps `#A4A9AC`. Links: Mulish 17px gesso, hover gold `#C7A864`.
- **Bottom bar:** `#3B4044` hairline on top. The wordmark reversed (gesso / `#767C80` rule / `#CDD1D2` "ART STUDIO") on the left. On the right: Shipping, Returns, Privacy, Terms and "© 2026 Ranjeeta Shroff", in Mulish 15px `#A4A9AC`.
- **Mobile:** one column; padding 48px × 24px; heading 24px.

---

## 4. Hero carousel: detailed specification

The prototype is `Hero Carousel.dc.html`. Its documentation and settings table are in `Hero Carousel Spec.dc.html`. A vanilla reference is in `handoff/reference/hero-carousel.html`.

### Visual layout (desktop)
- **Width:** full browser width, directly under the header. No side gutters on the slide itself.
- **Height:** `clamp(520px, calc(100vh - 250px), 820px)`. It fills the first screen below the header but leaves room for the next section's top to show.
- **Two slide fill modes, chosen per slide:**
  1. **Whole painting (`contain`), the default.** The slide ground is a flat colour chosen by hand: Gesso or Vaayu mist (Stone mist or Sand allowed). Inside a 1680px centred wrapper there are two columns: **text 5 parts, artwork 7 parts.** The artwork is inset `clamp(40px,5vw,80px)` vertically and `clamp(20px,4vw,72px)` horizontally, scales to fit, is **never cropped**, and has a deeper hang shadow (`0 1px 2px rgba(13,20,26,.06), 0 30px 60px -28px rgba(13,20,26,.4)`). With text position "right", the columns swap (artwork left).
  2. **Full-bleed photograph (`cover`).** The image covers the slide using its focal point (Shopify image focal point). The text overlays it. An optional flat ink overlay `rgba(13,20,26, 0–0.40)` helps contrast. **No gradients.**
- **Text block:** heading Marcellus `clamp(40px,4.4vw,72px)`/1.06, `text-wrap: balance` (max 12ch in contain mode). Supporting text Mulish `clamp(18px,1.4vw,21px)`/1.55, max 28em, **automatically italic when it starts with a quotation mark**. Then a large button (56px tall): primary (teal) on light slides, inverse (gesso) on light-text slides, with a trailing arrow. Gaps 24px, with 6px more above the button. Vertical placement top, middle or bottom (contain mode: within the text column; cover mode: within the slide). Padding `clamp(48px,6vw,104px)` vertical, the page gutter horizontal. In cover mode the text box is at most `min(560px, 46%)` wide.
- **Label strip under the slide (part of the carousel, not over the artwork):** gesso, 1px bottom hairline `#E3E7E7`, at least 76px tall, inside the 1560px container.
  - Left: the **credit**, for example "Vaayu – Air · Elements · 12 × 12 in", in Mulish 15px `#3B4044`, linking to the work; hover copper.
  - Right, gap 20px: **indicators** (one 44 × 44 button per slide containing a 30px line: 1px `#767C80`, or 2px ink for the current slide) → **counter** "01 / 04" (Mulish 14px, tabular lining numbers, +0.08em, `#565C61`; not Marcellus, whose numerals read as letters) → **Pause/Play**, **Previous**, **Next** as 44px outline icon buttons.
  - **Controls never sit on top of the painting.**
- **Slide ground is set by hand** (a setting per slide). It is never derived from the image.

### Slide content (per block)
Required: **image, heading.** Optional: everything else. These settings were approved on the spec page; do not add more.

| Setting | Notes |
|---|---|
| `image` | Desktop image. For whole-painting slides use the clean artwork file. For full-bleed slides use a landscape image at least 2400px wide. |
| `image_mobile` | Optional. Art direction for screens under 750px. Falls back to `image`. |
| `image_fit` | Whole painting / Full-bleed photograph. |
| `image_fit_mobile` | Same as desktop / Whole painting / Full-bleed. Lets a cropped desktop detail become the whole painting on mobile. |
| `ground` | Gesso / Vaayu mist / Stone mist / Sand. Whole-painting slides only. |
| `heading` | Live text, about 45 characters or fewer. Rendered as an `h2`. |
| `text` | Optional, textarea. |
| `cta_label`, `cta_url` | Button hidden if the label is empty. |
| `artwork` (product) | Optional. Fills the credit with title, series and size, and links to the work. |
| `credit` | Optional manual credit when the slide isn't a single product. |
| `text_position` | Left / Right / Center (center applies to full-bleed only). |
| `text_vertical` | Top / Middle / Bottom. |
| `text_color` | Dark / Light. Light switches the button to inverse. |
| `overlay_opacity` | 0–40%, step 5. Full-bleed only. |

Section settings: `autoplay` (on), `autoplay_speed` (5–12s, default **7s**), `height_desktop` (First screen / Large 760px / Medium 640px), `show_label` (on). Maximum 6 slides.

### Interaction
- **Autoplay:** on, 7s per slide, loops.
- **Pauses** while the pointer hovers (desktop), while any element inside has focus, during a swipe, and while the tab is hidden. The timer restarts after a manual change.
- **Pause/Play button:** always visible while autoplay is enabled (WCAG 2.2.2).
- **Prev/Next:** loop around at the ends.
- **Indicators:** jump directly to a slide; the current one has `aria-current="true"`.
- **Keyboard:** ← / → change slide while focus is inside the carousel. Tab order: the slide's CTA, then the credit, indicators, pause, prev, next.
- **Clicking the artwork image does nothing.** Only the CTA and the credit are links. This is what the prototype does; keep it.
- **Desktop transition:** a **crossfade of 900ms** with `cubic-bezier(.22,.61,.36,1)`. The incoming text fades in and drifts 12px upward, starting 250ms after the slide. In contain mode the artwork drifts 16px over 1200ms. No sliding, no zoom, no Ken Burns.
- **Swipe** works on desktop touch devices too (horizontal threshold 50px).

### Mobile
- **Structure:** **stacked, never overlaid.** Image area, then the text below it on a light ground. The track **slides horizontally** (translateX, 480ms, the same easing) and follows the finger while dragging.
- **Image area:** fixed **4:5** aspect. Whole-painting mode: padding 12% top, 11% sides, 10% bottom; the painting is contained with a lighter hang shadow. Full-bleed mode: `object-fit: cover` with the mobile focal point.
- **Ground on mobile:** gesso when the desktop slide is full-bleed but mobile is whole-painting. Otherwise the slide's own ground. All mobile text is ink (dark), because it never sits on the image.
- **Text below:** padding 22px × 24px, 32px at the bottom, gap 14px. Credit (14px link) → heading (Marcellus 32px/1.1) → text (17px) → **full-width** primary button.
- **Controls:** one row under the slide, between hairlines: indicators on the left (44px buttons, 22px lines), then Pause, Prev, Next on the right (44px, borderless).
- **Swipe:** a direction lock after 8px, so vertical scrolling is never captured (`touch-action: pan-y`). Threshold 50px. At the first and last slides the track resists (35% follow). A tap that turns into a drag must not trigger links.
- **Separate mobile images** are supported per slide and recommended for full-bleed slides. In the prototype, slide 2 (Moonlit Waves) is a cropped detail on desktop and the whole painting on mobile.

### Accessibility
- `<section aria-roledescription="carousel" aria-label="Featured paintings">`. Each slide: `role="group" aria-roledescription="slide" aria-label="2 of 4: Moonlit Waves"`. Inactive slides get `aria-hidden="true"` **and** `inert`.
- A visually hidden live region announces "Slide n of N: heading": `aria-live="polite"` when the user changes the slide, `off` while autoplay is rotating.
- The page `h1` is visually hidden ("Zita's Art Studio: fluid paintings by Ranjeeta Shroff"). Slide headings are `h2`.
- Every control has an accessible name ("Previous slide", "Next slide", "Pause slideshow" / "Play slideshow", "Show slide 2: Moonlit Waves"). Minimum hit area 44px.
- Focus: a 2px cerulean `#2E8FB5` outline, offset 3px, on everything.
- **`prefers-reduced-motion: reduce`:** autoplay starts **paused**, fades and slides become instant (1ms), and drifts are removed. Manual controls and swipe still work.
- Image `alt` comes from Shopify image alt text. Images: the first slide loads eagerly with `fetchpriority="high"`, the rest lazily. Use `<picture>` with a mobile source under 750px.

---

## 5. Typography

Confirmed: **Marcellus** (display, labels; single weight, 400) + **Mulish** (body, UI text; 400/500/600 + italic). Hierarchy comes from **size and tracking, never weight**: Marcellus is never bold, and Mulish 600 is used only for rare inline emphasis. In the prototype the CSS variable `--font-serif` holds Mulish for legacy reasons; name it sensibly in the theme (for example `--font-body`). **Self-host both fonts in theme assets.**

| Role | Font | Size (desktop → mobile) | Line height | Tracking / case | Max width |
|---|---|---|---|---|---|
| Wordmark | Marcellus | 21 / 11px → 17 / 10px | 1 | +0.2em / +0.32em, CAPS | — |
| Hero heading | Marcellus | clamp(40, 4.4vw, 72) → 32px | 1.06 → 1.1 | normal, sentence case | 12ch (contain) |
| Section H2 | Marcellus | clamp(32, 3.2vw, 48) → 24–26px | 1.15 | normal | 16–18ch |
| Large statement (Recognition) | Marcellus | clamp(40, 4.4vw, 68) → 34px | 1.05 | normal | — |
| Series name | Marcellus | clamp(26, 2.2vw, 32) → 24px | 1.15 | normal | — |
| Artwork title (card) | Marcellus | 19px → 18px | 1.25 | normal | — |
| Eyebrow / meta label | Marcellus | 12px (11px small) | — | +0.22em, CAPS | — |
| Nav | Marcellus | 13px | — | +0.16em, CAPS | — |
| Button / label link | Marcellus | 13–14px | 1 | +0.16em, CAPS | — |
| Lead / quote | Mulish *italic* | clamp(26, 2.6vw, 38) → 23px | 1.38–1.4 | normal | ~34em |
| Hero supporting text | Mulish | clamp(18, 1.4vw, 21) → 17px | 1.55 | normal | 28em |
| Body | Mulish | 17–18px → 16–17px | 1.6 | normal | ~34em |
| Caption / meta / price | Mulish | 15px (price 17px) | 1.45 | normal | — |

- Titles of works keep the artist's exact form, including the en dash ("Vaayu – Air"), and are italic in running text.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
- Numerals in counters and dimensions: Mulish with tabular lining figures.

---

## 6. Spacing and layout system

- **Container:** `max-width: 1560px`, centred; carousel inner layout 1680px. **Gutter:** `clamp(20px, 3.4vw, 56px)`; mobile gutter 24px (20px in the header).
- **Section padding (vertical):** generous and fluid, mostly `clamp(80–96px, 9–11vw, 144–176px)`. The **largest gaps** are the top of Current series and the top and bottom of Selected works (up to 176px). These are intentional pauses; **do not reduce them**.
- **Heading to content:** `clamp(40px, 5vw, 72px)`.
- **Image to caption:** 16px on artwork cards; 10px (mat margin) + 14px grid gap on series items.
- **Mats:** 10% padding on artwork cards; 12% on series items and the menu preview.
- **Alignment:** headings are left-aligned. Section header rows put the heading on the left and a supporting line or link on the right, **bottom-aligned** (`align-items: flex-end`), wrapping below each other on narrow screens.
- **Asymmetry is kept in editorial bands only:** the 5/7 hero split, Point of view (portrait + text), Recognition (5:6), Living with the work (4:5:4 with the filled middle panel), and the Instagram middle-post offset.
- **No asymmetry in product or series groups:** Selected works and Current series are strict, equal, aligned grids (V2 rule).
- **Mobile:** sections stack. Vertical padding drops to 48–56px, but each band keeps its own ground colour, so the rhythm of alternating surfaces survives.

---

## 7. Colour and surface treatment

Take exact values from the design system tokens (`_ds/…/tokens/colors.css`). The values used on the homepage:

| Surface / role | Hex | Used for |
|---|---|---|
| Gesso | `#F8F8F6` | page, header, Current series, Living with the work, carousel label strip, whole-painting slides (default) |
| Mat | `#F0F2F1` | artwork and series mats |
| Stone mist | `#E3E7E7` | Selected works band, hairlines on light grounds, mat hover |
| Vaayu mist | `#DCE6EA` | editorial: hero slides (by choice), Instagram band |
| Sand | `#ECE6DD` | Prints panel only |
| Deep teal | `#0B4050` | announcement band, Point of view |
| Night | `#0D141A` | Recognition |
| Ink | `#15202A` | footer; primary text; rules above Originals and Commissions |
| Body text | `#1F2A33` / `#3B4044` | running text / secondary text |
| Meta | `#565C61` | captions, counter |
| Stone 300 / 500 | `#A4A9AC` / `#767C80` | rules and dividers, muted text on dark |
| Accent: Vaayu teal | `#0F5468` | primary button, active nav, link text |
| Copper | `#96502A` (`#7A3F21` on sand) | eyebrows on light grounds, link and label hover |
| Gold | `#C7A864` | eyebrows and link hover on dark grounds |
| Pale teal | `#CFE4E9` | secondary text on deep teal |
| Focus | `#2E8FB5` | 2px outline, 3px offset |
| Sold dot | `#B0602F` | 8px dot next to "Sold" |

- **V2 grounds rule:** an individual artwork is presented on gesso or a mat. The theme never picks a background automatically from an artwork's colours or data. Vaayu mist, Stone mist and Sand are editorial grounds. Deep teal, Ink and Night are for story, recognition and the footer.
- **Buttons:** square, 1px border, Marcellus caps. Primary: teal fill, darker teal on hover. Secondary: ink outline, fills with ink on hover. Inverse: gesso fill.
- **Label link:** Marcellus 13px caps with a hairline underline 6px below and an arrow. On hover the text and line turn copper and the arrow nudges 4px right.
- **Shadows:** only `--shadow-hang` on artwork (`0 1px 2px rgba(13,20,26,.06), 0 18px 40px -18px rgba(13,20,26,.28)`) and `--shadow-overlay` on the mega menu. **Artwork on dark grounds gets no shadow.**
- **No** gradients, textures, glass effects or blur. Corner radius 0 (2px only on form inputs, if any).

---

## 8. Shopify ownership mapping

Keep it simple: content the merchant writes lives in section and block settings; content that already exists in Shopify (products, collections, menus) is **picked, not retyped**. No metafields or metaobjects are needed for the homepage.

| Region | Owner | Ranjeeta edits | Don't hard-code / don't duplicate |
|---|---|---|---|
| Announcement band | Section settings (header group) | text, link, on/off | — |
| Header nav | **Shopify menu** (main menu) | links and order | Don't hard-code nav items. **Needs implementation judgment:** how the Originals menu gets its series (a nested menu, or 2–3 collection pickers in header settings). |
| Hero carousel | Section + **slide blocks** (max 6) | everything in §4 | Text never in images. Credit pulls from the optional `artwork` product. |
| Current series | Section + **2–3 blocks, each with a collection picker** | which collections, order, optional description override, optional image override | Name, image and URL come from the **collection**. The description is optional: use the collection description, or a short override field (**needs implementation judgment**; collection descriptions may be too long). |
| Point of view | Section settings | portrait, quote(s), bio, link | — |
| Selected works | Section with a **product list** setting (4) | which works | Title, price, size, series, sold state and images come from the **product**, never retyped. Heading and intro are section settings. |
| Recognition | Section settings | image, text, link | — |
| Living with the work | Section + 3 blocks (Originals, Prints with image, Commissions) | text, links, print image | Price ranges are text the merchant writes. Don't calculate them. |
| From the studio | Section settings | heading, button, 3 images (or an app) | — |
| Footer | Footer group: newsletter section (Shopify customer form) + **Shopify menus** for the link columns | menus, contact details | Contact details live in one place (footer settings). |

---

## 9. Reusable implementation components

Keep these few snippets. Nothing more is needed for the homepage.

1. **Responsive image** (`<picture>`/`srcset`, focal point, lazy or eager). Used in the carousel, series items, cards, Recognition and Instagram. One place handles widths and alt text.
2. **Artwork card.** Used in Selected works, and reused on listing pages and in related works on product pages.
   - 4:5 mat `#F0F2F1`, 10% padding, the image contained with the hang shadow.
   - Caption: series eyebrow (11px copper caps) → title (Marcellus 19px) with the price on the right (Mulish 17px), or "Sold" with an 8px dot → meta (size) 15px `#565C61`.
   - Desktop hover or focus: the artwork crossfades to its **room view** over 720ms, and the title turns teal.
   - Touch: the plate scroll-snaps between the artwork and the room view, with two 6px dots and a "Swipe · room" label in a small gesso tag at the bottom right.
3. **Artwork plate / mat.** Contain, never crop. Used inside the card, series items and the menu preview.
4. **Section header row** (eyebrow, H2, plus an optional bottom-aligned line or link on the right). Used in Current series and Selected works, and repeats in other templates.
5. **Label link** (caps, hairline, arrow). Used in about 8 places.
6. **Icon button** (44px; outline and plain variants). Used in the header, carousel controls and mobile menu.

---

## 10. Responsive behaviour

| Region | Desktop (≥1180px) | Tablet (750–1179px) | Mobile (<750px) |
|---|---|---|---|
| Header | full nav + Search, Instagram, Bag | nav gaps tighten (22px, then 16px), tracking +0.1em, Instagram icon hidden | 58px bar, wordmark + Bag + "MENU"; full-screen menu |
| Carousel | 5/7 split or full-bleed overlay; label strip | same layout; heading scales with `vw` (**needs implementation judgment** on where to switch to the stacked mobile layout; prototype breakpoint: 750px) | stacked 4:5 image + text below; swipe track; controls row |
| Current series | 3 (or 2) equal columns | 3 or 2 columns while the container is ≥720px | 1 column, square mats |
| Point of view | portrait + text side by side | wraps: portrait above text | quote + link only |
| Selected works | 4 in a row | auto-fit, minimum 180px per card (4, then 3, then 2) | horizontal scroll-snap, 78% cards |
| Recognition | image + text side by side | wraps: image above | stacked, image 72% |
| Living with the work | 4 : 5 : 4 row | wraps (flex-basis 280/340/280px) | 3 list rows |
| From the studio | text + 3 posts (middle one offset) | wraps | stacked; posts in a row with no offset |
| Footer | 2 columns + link grid | link grid auto-fits | 1 column |

- Section order never changes between breakpoints.
- Mobile is **redesigned**, not shrunk: text moves out from over the image, quotes are trimmed, ways to collect become rows, and selected works become a swipe row.
- Every touch target is at least 44px.

---

## 11. Motion and interaction

All motion uses `cubic-bezier(.22,.61,.36,1)` ("pour" easing). Nothing bounces, and there is no parallax and no scroll-triggered reveal.

| Motion | Trigger | Motion and duration | Essential? | Reduced motion |
|---|---|---|---|---|
| Carousel crossfade (desktop) | autoplay every 7s / controls | opacity 900ms; text fade + 12px rise, 250ms delay; artwork 16px rise, 1200ms | yes | instant swap; autoplay paused |
| Carousel slide (mobile) | swipe / controls / autoplay | translateX 480ms; follows the finger while dragging | yes | instant |
| Mega menu | hover or click on Originals | appears immediately; closes 120ms after the pointer leaves | yes | the same |
| Series preview swap | hover or focus on a menu item | image swap, no transition | — | — |
| Artwork card room view | hover or focus (desktop) | crossfade 720ms; title colour 160ms | yes (core V1 feature) | instant |
| Card swipe to room view | touch | native scroll-snap | yes | the same |
| Series mat hover | hover | background colour 320ms | no | instant |
| Link and label hover | hover | colour 160ms; arrow moves 4px over 320ms | no | colour only |
| Button hover | hover | fill or colour 160ms; trailing arrow moves 3px | no | colour only |

---

## 12. Reference implementation code

**REFERENCE ONLY. Cursor must translate this into Shopify Liquid, sections, blocks and snippets.**

- `handoff/reference/hero-carousel.html`: a self-contained vanilla HTML/CSS/JS version of the carousel. It covers both fill modes, the label strip, autoplay with the pause rules, keyboard support, the swipe track on mobile, `inert` hidden slides, the live region and reduced motion. Open it in a browser; resize below 750px to see the mobile behaviour.

Small patterns that don't need a file:

```css
/* REFERENCE ONLY — Cursor must translate this into Shopify Liquid/sections/blocks/snippets. */
/* Artwork plate: contain, never crop */
.plate{aspect-ratio:4/5;background:#F0F2F1;padding:10%;box-sizing:border-box;display:flex;align-items:center;justify-content:center}
.plate img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;box-shadow:var(--shadow-hang)}

/* Current series: equal columns, aligned CTAs */
.series{display:grid;grid-template-columns:repeat(var(--n,3),minmax(0,1fr));gap:clamp(48px,5vw,72px) clamp(24px,3vw,56px)}
.series__item{display:grid;grid-template-rows:auto auto 1fr auto;gap:14px}
@container (max-width:719px){.series{grid-template-columns:1fr}} /* or a media query */
```
Set `--n` from the block count in Liquid (`style="--n: {{ section.blocks.size }}"`).

---

## 13. Things Cursor must preserve

- [ ] The artwork is the most colourful thing on every screen. UI colour stays in small touches (eyebrows, one teal button).
- [ ] Paintings are **never cropped** except in a deliberately chosen full-bleed slide. Everything else is contained on a mat.
- [ ] Product and series groups are aligned grids. **No staggered cards.**
- [ ] Editorial asymmetry stays: the hero's 5/7 split, Recognition, Living with the work's filled middle panel, the Instagram offset.
- [ ] Very generous vertical spacing. The large pauses before Current series and around Selected works stay.
- [ ] Marcellus never bold; Mulish for every paragraph; italics for quotes and work titles.
- [ ] The tracked-capitals wordmark, left-aligned, live text.
- [ ] Square corners, 1px hairlines, no card borders or boxes around artwork cards.
- [ ] Shadows only on artwork on light grounds, plus the mega menu.
- [ ] Hero text is live HTML. Carousel controls sit in the label strip, never on the painting.
- [ ] Bands alternate surfaces: gesso → gesso → deep teal → stone mist → night → gesso (+ sand) → Vaayu mist → ink.
- [ ] Commerce stays restrained: no prices in the hero, no "Shop now", "bag" not "cart".
- [ ] Mobile is its own layout: text below images, swipe rows, 44px targets, nothing cramped.

## 14. Things Cursor must NOT infer or invent

- Final merchant copy. All prototype text is provisional, except Ranjeeta's quotes, which are verbatim and must not be edited.
- Which series, works and slides are featured. Ranjeeta assigns them in the theme editor.
- Missing images: the Walking the Trail images, the portrait, the print-in-room photo, Instagram posts, and the wide mobile and desktop slide images.
- **Room views:** the prototype draws a schematic wall and bench scaled to the work's size. How real room views are supplied (a second product image, or her own room photographs) is **unresolved**. Don't build a room-mockup generator.
- Print relationships between originals and prints.
- Customer account, search on mobile, a sticky header, how the mobile menu animates, and the tablet breakpoint for the carousel. All of these **need implementation judgment**; ask before adding.
- Any hover effect, animation, carousel setting, section or module not listed here.
- A data model for series descriptions or the listing page's editorial band (this phase).
- Prices, sizes and dates in the prototype data (several are marked "to confirm").

## 15. Acceptance checklist

**Desktop (1440px and 1280px)**
- [ ] The header is 84px, gesso, with a hairline; the wordmark is left-aligned in tracked caps with a rule; there are 6 nav items; the Originals menu has 3 columns, closes on Esc and on pointer leave.
- [ ] The carousel is full browser width; height fills the screen below the header within 520–820px; the next section is just visible below.
- [ ] A whole-painting slide shows the entire painting uncropped, text on the left (or right), on a flat ground set in the editor.
- [ ] A full-bleed slide crops around the focal point; the text is readable; there are no gradients.
- [ ] The label strip shows the credit (linked), indicators, the counter "01 / 04" in Mulish, and pause, prev and next. Nothing overlaps the painting.
- [ ] Autoplay is 7s with a 900ms crossfade; it stops on hover, focus and pause; ← / → work; Tab reaches every control with a visible cerulean focus ring.
- [ ] With OS reduced motion on, nothing rotates and slide changes are instant.
- [ ] Current series: 3 equal columns (try 2 as well); mats 4:5; images uncropped; the "Explore the series" links share a baseline.
- [ ] Selected works: 4 cards, top-aligned, captions on one baseline; hovering crossfades to the room view.
- [ ] The surface order and colours match §13; body text is never below 15px; headings are never bold.
- [ ] The footer is ink, with the newsletter form, three link columns and the reversed wordmark.

**Mobile (390px)**
- [ ] The header is 58px: wordmark, Bag and "MENU"; the menu opens full screen with series thumbnails first.
- [ ] Carousel: the image is 4:5 with the text **below** it; the button is full width; swiping changes slides; vertical scrolling is never blocked; a separate mobile image is used when set.
- [ ] The controls row under the slide has 44px targets.
- [ ] Current series is stacked with square mats; Selected works is a horizontal snap row with 78% cards; the card's own swipe shows the room view.
- [ ] Point of view shows a short quote only; Living with the work shows 3 tappable rows.
- [ ] No horizontal page scroll; no text under 14px; every tap target is at least 44px.

**Merchant**
- [ ] Every item in §8 can be changed in the theme editor without code; adding a 4th slide or swapping a series needs no layout change; products and collections are picked, not retyped.
