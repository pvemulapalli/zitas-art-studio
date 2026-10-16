# About the Artist — Implementation Handoff (V2, approved)

**Status:** desktop and mobile design approved by Ranjeeta. This handoff is final for implementation.
**Includes:** Amendment 01, editable section surfaces (`About Design Amendment 01 - Section Surfaces.md`). That amendment is part of this specification.
**Not permission to redesign.** Reproduce the compositions below. Where this document says **Needs implementation judgment**, choose the smallest faithful solution and note it in the PR.

Reference source: `reference/source/About.dc.html`. Screenshots: `screenshots/v2/about-desktop-01…18.jpg` and `about-mobile-01…16.jpg` (captured at a 924px preview width; see §12 for known capture artefacts).

---

## 1. Concept
"The pour": the page reads top to bottom like paint travelling across a canvas. There are five chapters plus an opening and a closing, **each with its own composition**. Surfaces alternate light and dark. Motion is limited to one gentle fade per passage. There is no chapter index, and no scroll hijacking.

## 2. Content status (verified vs provisional)
| Content | Status |
|---|---|
| All body text, pull lines and the closing letter | **Provisional.** The working editorial draft built from Ranjeeta's own biography. Pull lines are lifted word for word from it. Ranjeeta is still to sign off the final wording and chapter titles |
| Name "Ranjeeta Shroff", subtitle "Artist behind Zita's Art Studio" | Verified |
| Artwork images and titles (Vaayu – Air, Melting away, Moonlit Waves, Longing for clouds, Jal – Water, Prithvi – Earth, Colored by Nature – Purple, Yin – The Dark Side) | Verified works |
| Chapter 4 phrase-to-painting pairings (sky → Longing for clouds; ocean → Jal – Water; mountains → Prithvi – Earth; spring → Colored by Nature – Purple) | **Provisional,** a design pairing for Ranjeeta to confirm |
| Portrait | Verified photo. **Provisional crop.** A new portrait on a plain background is recommended |
| Fused-glass photograph (Ch. 2) | **MISSING.** Labelled slot |
| Returning-to-painting photograph (Ch. 2) | **MISSING.** Labelled slot |

No quotations, events or facts beyond the draft may be added.

## 3. Global layout constants (all sections)
- Shell: `max-width: 1560px; margin: 0 auto; padding-inline: clamp(20px, 3.4vw, 56px)`.
- Grid: 12 columns, `minmax(0,1fr)`, column gap `clamp(16px, 2vw, 32px)`.
- Section vertical padding: `clamp(96px, 11vw, 176px)` unless stated otherwise.
- Type:
  - Display: Marcellus 400.
  - Body: Mulish (the theme token is `--font-serif`, which holds Mulish in V2).
  - Eyebrows and chapter numerals: Marcellus 12–13px, letter-spacing .22em.
- Colours used:
  - gesso #F8F8F6, stone mist #E3E7E7, vaayu mist #DCE6EA, deep teal #0B4050, night #0D141A, mat #F0F2F1;
  - ink #15202A, text #1F2A33, secondary #3B4044, caption #565C61, rule #CDD1D2;
  - copper #96502A, gold #C7A864, dark secondary #CDD1D2 / #CFE4E9.
- Artwork plates (light grounds): gesso box (#F8F8F6) with internal padding, image `max-width:100%; max-height:100%`, hang shadow `0 1px 2px rgba(13,20,26,.06), 0 18px 40px -18px rgba(13,20,26,.28)`. Never crop a plate image.

## 4. Desktop: section by section

### 4.0 Opening (gesso)
- **Text block** (max-width 1100px, gap 18px), top padding `clamp(64px, 7vw, 112px)`:
  - Eyebrow "About the artist": copper, 12px uppercase.
  - H1 "Ranjeeta Shroff": Marcellus `clamp(64px, 8.6vw, 148px)` / .95, letter-spacing -.005em.
  - Subtitle: Mulish italic `clamp(20px, 1.7vw, 26px)`, #3B4044.
- **Image composition** (`margin-top: clamp(48px, 6vw, 96px)`, `padding-bottom: clamp(120px, 12vw, 200px)`, `position: relative`):
  - Vaayu – Air detail: width 78%, aspect 16:7, `object-fit: cover`, `object-position: 50% 46%`. Caption "*Vaayu – Air*, detail", Mulish 15px #565C61. This is a *detail crop*, so cover is intentional here.
  - Portrait: absolutely positioned, `right: 0; top: clamp(56px, 7vw, 120px)`, width 30%, aspect 4:5, overlapping the Vaayu image. Shadow `0 1px 2px rgba(13,20,26,.06), 0 30px 60px -28px rgba(13,20,26,.4)`. Caption "Ranjeeta Shroff". Crop: head and shoulders. Use `assets/ranjeeta-portrait-crop-4x5.png` or an equivalent upload; don't rely on CSS scale.

### 4.1 Chapter 01, A creative journey (gesso, words only)
- Row 1: label in columns 2–4 (numeral "01" copper 13px; H2 Marcellus `clamp(28px, 2.4vw, 36px)`). Text in columns 6–11 (max 36em):
  - lead paragraph: Mulish `clamp(22px, 1.8vw, 26px)` / 1.5, ink;
  - body paragraph: 19px / 1.7, #3B4044.
- Row 2 (`margin-top: clamp(80px, 9vw, 144px)`, 1px #CDD1D2 top rule, padding-top `clamp(40px, 4vw, 56px)`):
  - pull line "My artistic journey has never followed a single path." in Marcellus `clamp(44px, 5.8vw, 96px)` / 1.04, max 15ch;
  - answer line, right-aligned (`justify-self: end`), Mulish italic `clamp(22px, 1.9vw, 28px)`, max 22em.

### 4.2 Chapter 02, An evolving practice (stone mist #E3E7E7, editorial 3-row grid)
| Row | Left | Right |
|---|---|---|
| 1 | Columns 1–5: numeral and H2 (Marcellus `clamp(36px, 3.4vw, 54px)`), paragraph about glass (19px / 1.7), padding-top `clamp(24px, 4vw, 72px)` | Columns 7–12: **fused-glass photo slot**, 4:3, caption "Fused glass · photograph to come" |
| 2 | Columns 2–4: **return-to-painting photo slot**, 4:5, `margin-top: clamp(40px, 4vw, 64px)`, `align-self: start` | Columns 7–11: paragraph "After my son was born…", `margin-top: clamp(56px, 6vw, 96px)` |
| 3 | Columns 1–7: pull line "It was during this exploration…" in Marcellus `clamp(30px, 2.9vw, 46px)` / 1.2, max 20ch, `margin-top: clamp(96px, 10vw, 160px)`, vertically centred | Columns 9–12: *Melting away* plate, 4:5 gesso box, padding 11%, `margin-top: clamp(72px, 8vw, 128px)` |

**Fallback (required):** if either photo is missing at launch, omit that figure entirely. The paragraphs stay in their grid cells and the layout must not show an empty box. The prototype's labelled slots are for review only.

### 4.3 Chapter 03, The beauty of unpredictability (night #0D141A)
- **Full-bleed band:** *Moonlit Waves* detail, height `clamp(460px, 68vh, 760px)`, cover, `object-position: 50% 38%`. Caption chip bottom-left: "*Moonlit Waves*, detail", background rgba(13,20,26,.72), 14px #CDD1D2.
- **Text grid** (padding `clamp(80px, 9vw, 144px)` top, `clamp(96px, 11vw, 176px)` bottom):
  - label in columns 1–3 (numeral in gold; H2 gesso);
  - text in columns 5–11: lead 22–26px gesso, body 19px #CDD1D2.
- **Blockquote** "Each painting becomes a balance between intention and spontaneity." in columns 2–11:
  - Marcellus `clamp(36px, 4.2vw, 68px)` / 1.1;
  - 1px #3B4044 rules above and below, padding `clamp(36px, 4vw, 56px)` 0;
  - margin `clamp(64px, 7vw, 112px)` 0.
- **Final paragraph:** columns 5–10.

### 4.4 Chapter 04, Inspired by nature (vaayu mist #DCE6EA, "nature atlas")
1. **Header** (max 980px): numeral "04" with H2 "Inspired by nature" set as a 13px uppercase eyebrow (deliberately small). Statement "Nature is at the heart…" in Marcellus `clamp(40px, 4.6vw, 76px)` / 1.05.
2. **Paragraph** pushed right (`margin-left: auto`, max 30em), 20px / 1.65.
3. **Three-plate staggered row** (margin-top `clamp(64px, 7vw, 112px)`). This is editorial asymmetry, intentionally not a product grid:

   | Columns | Plate | Aspect / padding | Offset | Phrase (italic) | Label (uppercase) |
   |---|---|---|---|---|---|
   | 1–4 | *Longing for clouds* | 3:5 / 9% | none | "the vastness of the sky" (22px) | Longing for clouds |
   | 6–9 | *Jal – Water* | 1:1 / 9% | margin-top `clamp(120px, 14vw, 240px)` | "the depth of the ocean" (22px) | Jal – Water |
   | 11–12 | *Prithvi – Earth* | 4:5 / 10% | margin-top `clamp(40px, 5vw, 80px)` | "the stillness of mountains" (19px) | Prithvi – Earth |

4. **Text and plate row** (margin-top `clamp(72px, 8vw, 128px)`, centred): two paragraphs in columns 1–5. *Colored by Nature – Purple* plate in columns 7–12 (5:4, padding 8% 14%), phrase "the freshness of spring".
5. **Closing lines:** "My paintings carry different emotions, just as we do." in Marcellus `clamp(30px, 2.9vw, 46px)`, max 24ch. Then the final sentence in Mulish 20px #3B4044.

### 4.5 Chapter 05, What art means to me (deep teal #0B4050)
- Columns 1–3: numeral (gold), H2, then *Yin – The Dark Side* (max 260px, **no plate, no shadow**; it's a dark-ground work), caption #CFE4E9.
- Columns 5–11: lead (22–26px gesso), body (19px #CFE4E9), italic pull line "Color and movement…" (Mulish italic `clamp(30px, 3vw, 46px)` / 1.3, margin `clamp(24px, 3vw, 48px)` 0), final paragraph.

### 4.6 Closing invitation (gesso, a letter)
- Padding `clamp(112px, 12vw, 192px)` top.
- **The letter** (centred, max 680px, gap 26px): eyebrow "An invitation", three italic paragraphs (Mulish `clamp(22px, 1.9vw, 27px)` / 1.55), sign-off "— Ranjeeta" (Marcellus 30px).
- **Actions row** (max 1100px, centred, top rule, `margin-top: clamp(80px, 9vw, 128px)`, flex wrap):
  - left: primary button "Explore the originals" (→ originals collection), then "Current series" label with up to 3 series links (Marcellus 20px);
  - right: text links "Commission a painting" and "Write to Ranjeeta".
- **Scope change:** standalone Commissions has been removed. "Commission a painting" must link to `/pages/contact?type=commission#message` (see the Contact handoff and the scope-cleanup note). This is a link-target change, not a design change.

## 5. Mobile (≤ 749px), recomposed rather than stacked
Gutter 20px. Every section is full width and keeps the desktop surface colour. The reading order is linear and nothing scrolls sideways.

| Section | Mobile composition |
|---|---|
| Opening | Portrait first (full content width, 4:5). Then eyebrow, H1 Marcellus 50px / .98, subtitle 19px. Then the Vaayu detail **full-bleed** (16:9), caption inset 20px |
| Ch 01 | Numeral and H2 inline (26px). Lead 20px, body 17px. Pull line 34px above a top rule, then the answer line 19px italic |
| Ch 02 | Glass paragraph. Glass slot **full-bleed** (−20px margins, 4:3). Return paragraph. Return slot **inset right** (64% width). Pull line 24px. *Melting away* plate full width |
| Ch 03 | Moonlit detail full-bleed **4:5**. Text 20/17px. Blockquote 30px between rules. Final paragraph |
| Ch 04 | Eyebrow H2. Statement 32px. Then: Longing **full-bleed** plate (4:5, padding 8% 22%); Jal **inset right** 72%; Prithvi **inset left** 58%; paragraph; Purple **full-bleed** (5:4); paragraph; closing lines 24px / 17px |
| Ch 05 | H2 24px. Lead, body. *Yin* centred at 62%. Italic pull line 26px. Final paragraph |
| Closing | Letter 21px italic, sign-off 26px. Full-width primary button. "Current series" as full-width rows (52px, with arrow). Text links at 44px |

The alternating full-bleed / inset-right / inset-left image widths are the mobile expression of "the pour" and must be kept.

## 6. Tablet (750–989px) **Needs implementation judgment**
Keep the desktop 12-column compositions down to 750px. The `clamp()` values scale them. Check two places:
- Ch 4: the three-plate row. If the Prithvi column (2 of 12) becomes narrower than 120px, switch to the mobile stack.
- Opening: the portrait overlap. Keep it, but make sure the caption doesn't collide.

## 7. Motion
- One reveal per marked passage: opacity 0 → 1 and translateY 24px → 0, 720ms `cubic-bezier(.22,.61,.36,1)`, triggered once by IntersectionObserver (rootMargin `0px 0px -8% 0px`).
- Elements already in view on load aren't animated.
- `prefers-reduced-motion: reduce` → no reveal, everything is visible.
- No parallax, no sticky scenes, no scroll-jacking.
- Must work without JS (content visible by default; JS adds the hidden state).

## 8. Section surfaces (Amendment 01, required)
Every section has a **Surface** select, using the 7 approved surfaces with fixed foreground schemes. The approved defaults reproduce this design exactly:

| Section | Default | Allowed |
|---|---|---|
| Opening | Gesso | Light surfaces only |
| 01 | Gesso | All 7 |
| 02 | Stone mist | All 7 |
| 03 | Night | All 7 |
| 04 | Vaayu mist | All 7 |
| 05 | Deep teal | All 7 |
| Closing | Gesso | Light surfaces only |

Plates stay gesso on dark surfaces. Dark-ground works sit directly on dark surfaces. The full scheme table, guardrails and checks are in the amendment.

## 9. Shopify architecture
**Required behaviour**
- Ranjeeta can edit all text, images and surfaces in the Theme Editor without code.
- Each chapter keeps its own composition. **Don't** collapse the chapters into one generic "image + text" section.
- Missing photos collapse gracefully. Surfaces only come from the 7 approved options.

**Suggested implementation**
- Template `page.about.json`, assigned to the About page.
- One custom section per composition: `about-opening`, `about-chapter-words` (Ch 1), `about-chapter-practice` (Ch 2), `about-chapter-fullbleed` (Ch 3), `about-chapter-atlas` (Ch 4), `about-chapter-reflection` (Ch 5), `about-closing`.
  - Settings: `surface` (select), numeral, title, and rich text or text fields matching each paragraph slot.
  - Images: `image_picker` plus an alt override.
  - Ch 4: 4 "plate" blocks (image, phrase, label), max 4.
  - Closing: button label and URL, a series collection list (max 3), two links.
- Shared snippets: `surface-vars` (sets CSS custom properties from `data-surface`), `artwork-plate` (reuse the existing snippet; contain, no crop), and `reveal` (attribute plus one small JS module).
- Images: use `image_url` with responsive `srcset`, and set `width`/`height` to prevent layout shift.
  - Full-bleed: `sizes="100vw"`.
  - Plates: sized to their column.
  - The portrait and the Vaayu detail are above the fold: `loading="eager"` and `fetchpriority="high"` on the Vaayu image only.
- No metaobjects are needed.

## 10. Accessibility
- Exactly one H1 (the name). Each chapter is an H2, with the numeral `aria-hidden` or part of the heading text.
- Pull quotes from her own text are `<p>` (not `<blockquote>`), except the Ch 3 blockquote, which is acceptable as is.
- Alt text is written per image (see the source). Decorative detail crops still get descriptive alt.
- Contrast is held by the surface schemes (Amendment §2). Focus: 2px cerulean #2E8FB5 ring, offset 3px.
- Touch targets ≥ 44px on mobile links and buttons.

## 11. Edge cases
- Very long chapter text: column max-widths hold. There are no fixed heights on text boxes.
- Fewer than 4 atlas plates: the row reflows (3 → as designed; 2 → columns 1–5 and 7–11, no offsets; 1 → columns 3–10). **Needs implementation judgment.**
- No series collections selected: hide the "Current series" row.

## 12. Screenshot notes
- Captured at a **924px** preview width. Clamp values are at their smaller ends.
- The capture tool doesn't render CSS transforms, so the **portrait appears uncropped** in the screenshots. The live reference and `assets/ranjeeta-portrait-crop-4x5.png` show the approved crop.
- At 924px the global header's desktop nav overlaps its icons. That's the existing header at this width, outside this page's scope; the header handoff governs it.
- The mobile screenshots show the phone frame plus the review notes, which aren't part of the page.
- The "News" and "Commissions" footer links in the screenshots are obsolete (see `Scope Cleanup - Obsolete Links.md`).

## 13. Acceptance checklist
- [ ] Seven sections in order, with the default surfaces exactly as in §8.
- [ ] Each chapter matches its own composition (compare against the screenshots).
- [ ] Opening: the portrait overlaps the Vaayu detail on desktop. On mobile, the portrait comes first and the Vaayu detail is full-bleed.
- [ ] Ch 2: the 3-row offset grid. With no photos, no empty boxes.
- [ ] Ch 4: the staggered three-plate atlas, then the text and Purple plate row. Plates are never cropped.
- [ ] Mobile image widths alternate full-bleed, inset right and inset left as listed.
- [ ] Reveal motion runs once, and is off with reduced motion.
- [ ] Changing any surface switches all foreground colours. Plates stay gesso.
- [ ] "Commission a painting" goes to the Contact commission inquiry.
- [ ] Lighthouse: no layout shift from images, and every image has alt text.
