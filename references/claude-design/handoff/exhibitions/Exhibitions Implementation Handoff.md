# Exhibitions — Implementation Handoff (V2 "The catalogue", approved)

**Status:** desktop and mobile design approved by Ranjeeta.
**Includes:** Addendum 01, links to exhibited works and series (`Exhibitions Addendum 01 - Work and Series Links.md`). That addendum is part of this specification.
**Not permission to redesign.** The catalogue composition, the wall-label language, Plates I–III, Selected exhibitions and the Archive must be reproduced. Exact inline values are in `reference/source/Exhibitions.dc.html`. Where this document says **Needs implementation judgment**, choose the smallest faithful option and note it in the PR.

Screenshots: `screenshots/v2/exhibitions-desktop-01…15.jpg` and `exhibitions-mobile-01…12.jpg` (captured at a 924px preview width).

---

## 1. Concept
The page reads like an exhibition catalogue. Every exhibition is a **wall label** (title, venue, place, dates, works shown), set at three scales:
- **Plate:** a recognition spread.
- **Selected:** an editorial entry.
- **Archive:** an index row.

Mostly gesso, fine hairline rules, and one Night spread. Artwork is the hero; recognition provides context.

## 2. Content status
**Verified** (from Ranjeeta's current Exhibitions page and the content inventory): every title, venue, place, work title, the April 3–17 2026 dates, the IAVA figures, Curator's Choice, the solo exhibition, the Indulgence sale, and Touching the Sun (sold).

**Provisional or needs confirmation:**
- "The Blue" and "DAC Art Gallery" are shown as **one** record (both list *Mighty Rivers*). Confirm.
- *Yin and Yang – The Dark Side* (Abstract 2024) is shown by **title only**. Don't assume it is the same work as *Yin – The Dark Side*.
- The spelling "Un Colored by Nature" versus "Uncolored by Nature": pick one site-wide (the product title is authoritative).
- Design copy to approve: the cover line "Exhibiting since 2019, in Texas and internationally.", the supporting line, "More of the record is being added.", and the closing lines.
- All product and collection links in the reference are **SAMPLE assignments** (see §8).

**Missing:**
- Images of *Devi – The Divine Feminine*, *Indulgence* and *Adiyogi – The first Yogi* (labelled slots).
- Years for the "Additional exhibitions" group.
- Dates for the Le Gateau solo exhibition.
- Installation photographs.

**Never invent** dates, years, images, artwork associations, descriptions or quotes.

## 3. Global constants
- Shell `max-width: 1560px`, padding-inline `clamp(20px, 3.4vw, 56px)`. Grid of 12 columns, gap `clamp(16px, 2vw, 32px)`.
- Labels: Marcellus 11–12px uppercase, .22em, copper #96502A (gold #C7A864 on Night).
- Titles: Marcellus. Venue and place: Mulish 17–18px #3B4044. Works: Mulish italic, ink.
- Rules: 1px #15202A (section-defining) and 1px #CDD1D2 (within sections).
- Surfaces: gesso #F8F8F6; Night #0D141A (Plate I only); Stone mist #E3E7E7 (Archive); Vaayu mist #DCE6EA (On view band, when present).

## 4. Desktop: section by section

### 4.1 Cover (gesso, typographic)
- Padding `clamp(72px, 8vw, 128px)` top, `clamp(64px, 7vw, 104px)` bottom.
- Columns 1–9:
  - H1 "Exhibitions" as a 12px copper eyebrow;
  - display line in Marcellus `clamp(48px, 6.2vw, 104px)` / 1, max 13ch.
- Columns 10–12: supporting line, Mulish 17px / 1.6, aligned to the bottom.
- **"Shown in" strip:** `margin-top: clamp(56px, 6vw, 96px)`, 1px ink top rule.
  - Label in columns 1–2.
  - Columns 3–12: an inline list of places in Marcellus `clamp(22px, 2vw, 30px)`, separated by "·" in #A4A9AC.
  - Places: *Le Gateau Gallery, France · Allen · Frisco · Dallas · McKinney · Plano, Texas · Virtual exhibitions*.
  - **Suggested:** a static Theme Editor text list. Don't derive it automatically.

### 4.2 On view (hidden when empty, required)
- Renders **only** when at least one exhibition is current or upcoming.
- With none (the current state), **nothing renders**: no heading, no empty-state message.
- Layout when present: a Vaayu mist band, label in columns 1–2, title in columns 3–6 (Marcellus `clamp(26px, 2.4vw, 36px)`), venue in columns 7–9, dates in columns 10–11, "Details" link in column 12. One row per exhibition.
- The reference sample uses bracketed placeholder text (prop `showOnViewSample`).

### 4.3 Plate I, Curator's Choice (Night full-width spread)
- Padding `clamp(88px, 10vw, 160px)`.
- Columns 1–6: *Un Colored by Nature*, `width: min(100%, 560px)`, no shadow (dark-ground work directly on Night), centred, with its caption.
- Columns 8–12:
  - label "Plate I · Recognition" (gold);
  - H2 "Curator's Choice" in Marcellus `clamp(48px, 5vw, 84px)`;
  - exhibition line "Black & White, International Juried Exhibition", 20–24px #E3E7E7;
  - a wall-label `<dl>` (top rule #3B4044) with rows Venue, Format, Dates and Work (`dt` 11px uppercase #A4A9AC, `dd` 18px gesso).
- Values: Le Gateau Gallery, France / Virtual group exhibition / 3–17 April 2026 / *Un Colored by Nature*.
- Addendum links: the Work title links to the product, and "Explore the series · Colored by Nature →" sits below the label. Both are optional.

### 4.4 Recognition, Plates II–III (gesso, typographic, no images)
- Columns 1–7, **Plate II · International selection:**
  - 1px ink top rule;
  - large line in Marcellus `clamp(34px, 3.6vw, 58px)`: "One of 64 artists selected from 872 proposals across 25 countries.";
  - source line "IAVA 2020, A HELP · International virtual selection".
- Columns 9–12, **Plate III · Solo exhibition:** offset down by `clamp(48px, 6vw, 112px)`. "Le Gateau Gallery, France" in Marcellus `clamp(28px, 2.6vw, 40px)`, then "Virtual solo exhibition".
- Recognition appears **once**. Selected exhibitions must not repeat Plates I–III.

### 4.5 Selected exhibitions (gesso, varied rhythm, 8 entries)
- Header: H2 (Marcellus `clamp(32px, 3.2vw, 48px)`) on the left. On the right: a "The full archive ↓" anchor link, and (in review only) the sample-links tag.

| No. | Entry | Composition |
|---|---|---|
| 01 · 2026 | **Devi**, Blue House Too Gallery, Allen, Texas · Group exhibition · Shown: *Devi – The Divine Feminine*, *Emergence* | **Large image entry:** image columns 1–5 (4:5, contain, **slot: image to supply**), label columns 7–11, title `clamp(40px, 4vw, 64px)`, aligned to the bottom |
| 02, 03 · 2026 | **Art in Arena** (Frisco, Texas · Group exhibition); **Pink Revisited** (theGallery8680, Frisco, Texas · Group exhibition) | **Typographic pair:** columns 1–5 and 7–11, top rule, titles `clamp(30px, 2.8vw, 44px)` |
| 04 · 2026 | **Indulgence**, Lincoln Center, Dallas, Texas · Group exhibition · Shown: *Indulgence*, which found its home during the exhibition | **Medium image entry, mirrored:** label columns 2–5, image columns 8–11 (1:1, **slot: image to supply**), centred |
| 05 · 2024 | **Abstract 2024**, VAGF, Sweetwaters, Frisco, Texas · Shown: *Yin and Yang – The Dark Side* | **Typographic trio,** 3 equal columns, titles `clamp(26px, 2.2vw, 34px)` |
| 06 · 2024 | **Rebirth**, VALA 2024 · Cotton Mills, McKinney, Texas · Shown: *Blooming in Blues*, *The Spring Delight* | (trio) |
| 07 | **Global Cultures**, Plano Art Center · Shown: *Buddha – The awakened one* | (trio). No year is shown because none is documented |
| 08 | **Sacred Stories of Light**, Blue House Too Gallery, Allen, Texas · Shown: *Adiyogi – The first Yogi* | **Small image entry:** label columns 1–6, image columns 9–11 (4:5, **slot: image to supply**), top rule |

- **Required patterns:**
  - Image entries alternate side and scale (large left, medium right, small right).
  - Typographic entries group as a pair and then a trio.
  - Entries without an image use the typographic treatment; never an empty frame.
  - "No." and the year label are 11px copper. The year is omitted when unknown.
- **Image behaviour:** artwork images are `contain` on gesso, never cropped. If an image entry has no image at launch, render it as a typographic entry. **Needs implementation judgment:** whether that shifts the pair and trio grouping. Recommended: keep the slot positions and use the typographic layout in place.
- **Selection is curated:** Ranjeeta chooses which exhibitions are "Selected" and their order. Don't auto-select.

### 4.6 Archive (stone mist band, `id="archive"`)
- Header: H2 "Archive" plus the note "Exhibitions and selections since 2019. More of the record is being added."
- **Year groups:** each group has a 1px ink top rule.
  - The year sits in columns 1–2 (Marcellus `clamp(28px, 2.6vw, 40px)`, **sticky** at top 24px within its group).
  - Rows sit in columns 3–12.
- **Row:** a 3-column grid (4fr / 4fr / 3fr), padding 18px 0, 1px #CDD1D2 bottom rule.
  - Title: Marcellus 21px.
  - Middle: place (Mulish 16px #3B4044), with works (italic ink) on the next line and the optional series link below.
  - Right: tags (10px uppercase, .16em, 1px border).
- Tags:
  - "Curator's Choice" and "International selection": copper text and border.
  - "Solo": teal.
  - "Virtual" and "Work sold": #3B4044 text, #A4A9AC border.
- **Group order:** newest year first, then **"Additional exhibitions"** last, for records with no documented year. Its label is smaller (22px). Never show "Year to confirm".

**Archive data (verified):**
| Group | Title | Place | Works | Tags |
|---|---|---|---|---|
| 2026 | Black & White, International Juried Exhibition | Le Gateau Gallery, France · 3–17 April | Un Colored by Nature | Curator's Choice, Virtual |
| 2026 | Solo exhibition | Le Gateau Gallery, France | — | Solo, Virtual |
| 2026 | Devi | Blue House Too Gallery, Allen, Texas | Devi – The Divine Feminine; Emergence | |
| 2026 | Indulgence | Lincoln Center, Dallas, Texas | Indulgence | Work sold |
| 2026 | Art in Arena | Frisco, Texas | — | |
| 2026 | Pink Revisited | theGallery8680, Frisco, Texas | — | |
| 2024 | Rebirth · VALA 2024 | Cotton Mills, McKinney, Texas | Blooming in Blues; The Spring Delight | |
| 2024 | Fun-in-Sun · VALA 2024 | Rec Center, Allen, Texas | Fiery Waves; Sky is Pink | |
| 2024 | Spring Collective 2024 | Blue House Too, Allen, Texas | Petal of Joy; Spring in Bloom; Forces of Nature | |
| 2024 | Abstract 2024 | VAGF, Sweetwaters, Frisco, Texas | Yin and Yang – The Dark Side | |
| 2021 | VALA Spring 2021 | Blue House Too Gallery, Allen, Texas | — | |
| 2020 | IAVA 2020, A HELP | International virtual selection · 64 artists from 872 proposals, 25 countries | — | International selection, Virtual |
| Additional | Earth Day | theGallery8680, Frisco, Texas | Two paintings from the Sand and Cloud series | |
| Additional | Festival of Trees | theGallery8680, Frisco, Texas | The Transformation series | |
| Additional | The Blue | DAC Art Gallery | Mighty Rivers | Virtual |
| Additional | Touching the Sun | Blue House Too Gallery, Allen, Texas | Touching the Sun | Work sold |
| Additional | Cotton Mills | McKinney, Texas | Two works in black, white and grey, 3 × 4 ft | |
| Additional | Small Works | Plano Arts Association, Texas | Monarch series, two works | |
| Additional | Sacred Stories of Light | Blue House Too Gallery, Allen, Texas | Adiyogi – The first Yogi | |
| Additional | Global Cultures | Plano Art Center | Buddha – The awakened one | |

The list isn't exhaustive. The legacy site has about 30 entries, and more will be added over time.

### 4.7 Closing (gesso)
- Columns 1–7: "See the paintings for yourself." in Marcellus `clamp(34px, 3.4vw, 54px)`, then the primary button "Explore the originals".
- Columns 9–12: "Galleries and curators are welcome to get in touch about exhibiting Ranjeeta's work.", then a "Write to Ranjeeta" link (→ Contact).
- **Scope change:** the "Exhibition news" link must be **removed** (News is out of scope). Don't replace it with anything.

## 5. Mobile (≤ 749px)
| Section | Composition |
|---|---|
| Cover | Eyebrow; display 40px / 1.02; "Shown in" as a single wrapped Marcellus 20px paragraph under a rule |
| On view | Hidden when empty. When present: a compact band with title 24px and venue · dates |
| Plate I | Night band. Image first (84% width, centred), then the label, H2 40px, exhibition line, and the `dl` (10px `dt` / 16px `dd`). Series link 44px tall |
| Plates II–III | Stacked, each under an ink rule. Plate II line at 28px |
| Selected | A single column of entries, each under a hairline: optional image (72% width, 4:5, contain), No. label, title (32px for image entries, 26px otherwise), place, "Shown:" works, optional series link (44px) |
| Archive | Stone mist band. **Year jump links:** wrapping 44px bordered chips (no horizontal scrolling), one per group ("Additional" for the undated group). Each group heading is sticky at the top of the viewport (opaque stone-mist background). Rows stack: title 19px, place 15px, works italic 15px, series link 44px, tags |
| Closing | Heading 30px, full-width primary button, note, "Write to Ranjeeta →" (44px) |

## 6. Tablet (750–989px) **Needs implementation judgment**
Keep the desktop grid. At under about 860px:
- the Selected typographic trio becomes 2 + 1;
- the Archive row grid becomes title over (place/works | tags).

No horizontal overflow at any width.

## 7. Interactions and motion
- Anchor links ("The full archive ↓", the mobile year chips) jump with `scroll-margin-top` for the sticky header. Smooth scrolling only when reduced motion is off.
- Link hover: copper (gold on Night). Focus: 2px cerulean ring, offset 3px.
- No entrance animation is required. **Optional:** the About-style single fade, only if it's already a shared theme utility.

## 8. Links to works and series (Addendum 01)
- An exhibited work title becomes a link **only** when a product is referenced. It gets a 1px #A4A9AC underline, offset 4px, and turns copper on hover.
- Unlinked historical titles stay **plain italic** and visible.
- The series link reads "EXPLORE THE SERIES · {collection title} →" (Marcellus 11–12px, teal, copper on hover). Keep the arrow attached to the last word (`&nbsp;→`, white-space nowrap) so it never wraps alone.
- Sold works link to their PDP, which shows the sold/archive state.
- A deleted or unpublished product renders as plain text. An empty or unpublished collection hides the series link.
- **Sample assignments in the reference (not confirmed data):**
  - Un Colored by Nature → product
  - Indulgence → product
  - Black & White → Colored by Nature series
  - Earth Day → Sand and Cloud series

  Ranjeeta must confirm the real ones.

## 9. Shopify architecture
**Required behaviour**
- Exhibitions are repeatable records Ranjeeta can add and edit without code.
- Current, upcoming and past are derived from dates when dates exist.
- "On view" is hidden when nothing is current or upcoming.
- Undated records go in "Additional exhibitions".
- Selected and Plates are curated choices.
- Product and collection links are optional.

**Suggested implementation**
- **Metaobject `exhibition`**, fields:
  - `title` (single line, required);
  - `venue`, `place` (single line);
  - `format` (single line, e.g. "Group exhibition", "Virtual solo exhibition");
  - `start_date`, `end_date` (date, optional);
  - `year` (integer, optional; used when there are no dates);
  - `works_text` (multi-line, one title per line; preserves historical titles);
  - `works` (list of product references, optional);
  - `series` (list of collection references, optional);
  - `tags` (list of single-line choices from: Curator's Choice, International selection, Solo, Virtual, Work sold);
  - `image` (file reference, optional);
  - `note` (single line, optional, e.g. "found its home during the exhibition").
- **Grouping:** year = `start_date.year` or `year`. If neither, the record goes in "Additional exhibitions". Sort within a year by `start_date` descending, then by title.
- **Page template** `page.exhibitions.json` with sections:
  - `exhibitions-cover` (text, places list);
  - `exhibitions-on-view` (auto-filled: exhibitions whose end date is today or later);
  - `exhibitions-plate` (blocks: Plate, metaobject reference plus heading and label overrides; max 3; first block = Night spread, others = typographic);
  - `exhibitions-selected` (blocks: entry, metaobject reference, plus a layout select: large image / medium image / small image / typographic; max about 10);
  - `exhibitions-archive` (all `exhibition` metaobjects, grouped);
  - `exhibitions-closing`.
- **Today's date in Liquid** is cached with the page. On view and past classification may lag until the cache refreshes. **Needs implementation judgment:** a small JS check or a daily-acceptable lag.
- **Linking rule** (Addendum §7): render `works_text`, and turn a line into a link when a referenced product's title matches it. Cursor should document the matching rule it chooses.

## 10. Accessibility
- One H1 ("Exhibitions"). Plates and sections are H2. Selected entries and archive years are H3.
- Wall labels use `<dl>` where they're label and value pairs. The archive uses lists.
- Mobile year chips sit in a `<nav aria-label="Archive years">`.
- Tags are text, not colour alone.
- Links have descriptive names ("Explore the series: Colored by Nature").
- Sticky year headings must not cover focused content (`scroll-margin-top`).

## 11. Edge cases
- Zero records → the page shows the Cover, the Plates (if configured) and the Closing. The Archive is hidden.
- A very long title → wraps; no fixed heights.
- A record with only a title → a valid archive row with no blank place line.
- A new year → a new group appears automatically, newest first.
- More than 12 records in a year → stays one list (no pagination).

## 12. Screenshot notes
- Captured at a 924px preview width.
- At that width the global header nav overlaps its icons. That's the header's own breakpoint, outside this page's scope.
- Mobile shots include the phone frame and review notes.
- The footer's "News" and "Commissions" links are obsolete.
- The sample links are visible (sample tag shown).

## 13. Acceptance checklist
- [ ] Section order: Cover, (On view only if there are events), Plate I (Night), Plates II–III, Selected (8, with the varied rhythm), Archive, Closing.
- [ ] No "On view" heading or message when there are no events.
- [ ] Recognition appears once; Selected doesn't repeat it.
- [ ] Selected rhythm: large image, typographic pair, medium mirrored image, typographic trio, small image.
- [ ] Artwork is never cropped. Missing images produce typographic entries, never empty frames.
- [ ] Archive: newest year first, "Additional exhibitions" last, sticky year column, every verified row from §4.6 present.
- [ ] Historical titles stay visible without links. Links appear only for referenced products and collections. The arrow never wraps alone.
- [ ] Mobile: wrapping year chips (44px), sticky group headings, no horizontal overflow at 320px.
- [ ] "Exhibition news" removed. "Write to Ranjeeta" goes to Contact.
- [ ] Ranjeeta can add an exhibition in Admin and see it in the right year group without code.
