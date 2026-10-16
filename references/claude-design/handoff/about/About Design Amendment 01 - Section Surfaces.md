# About the Artist — Design Amendment 01: Editable section backgrounds

Status: Ranjeeta approved the About design (desktop and mobile). This amendment adds one capability: she can change the background of individual sections when she changes the artwork or photography in them. **Layouts, type, spacing, imagery and motion stay exactly as approved.**

The About implementation handoff has not been written yet. When it is, this amendment is part of it.

## 1. The rule
- Every About section has one **Surface** setting in the Theme Editor.
- Surfaces are chosen from the approved V2 editorial grounds only. No colour picker, no custom hex values.
- Each surface comes with a fixed **foreground scheme** (text, secondary text, eyebrow, links, rules, button variant). Ranjeeta picks the surface; the theme sets everything on top of it. She can't produce unreadable combinations.
- The theme never picks a surface automatically from an image or artwork colours (V2 Foundations rule 02, "Never automatic").

## 2. Surfaces and their foreground schemes
Values come from the approved V2 Foundations "Grounds" table. Don't invent new ones.

| Surface | Hex | Scheme | Heading / body | Secondary | Eyebrow | Links & label CTAs | Rules | Button |
|---|---|---|---|---|---|---|---|---|
| Gesso | #F8F8F6 | Light | Ink #15202A | #3B4044 | Copper #96502A | Ink → copper hover | #CDD1D2 | Primary (teal) |
| Vaayu mist | #DCE6EA | Light | Ink | #3B4044 | Teal #0F5468 | Teal → copper hover | #A4A9AC | Primary |
| Stone mist | #E3E7E7 | Light | Ink | #3B4044 | Copper | Ink → copper hover | #A4A9AC | Primary |
| Sand | #ECE6DD | Light | Ink | #3B4044 | Copper 700 #7A3F21 | Ink → copper hover | #A4A9AC | Primary |
| Deep teal | #0B4050 | Dark | Gesso #F8F8F6 | #CFE4E9 | Gold #C7A864 | Gesso → gold hover | rgba of gesso, ~24% | Inverse |
| Ink | #15202A | Dark | Gesso | #CDD1D2 | Gold | Gesso → gold hover | #3B4044 | Inverse |
| Night | #0D141A | Dark | Gesso | #A4A9AC on large text only, else #CDD1D2 | Gold | Gesso → gold hover | #3B4044 | Inverse |

- Focus ring stays cerulean #2E8FB5, 2px, offset 3px, on every surface.
- Implementation: the section sets a `data-surface` attribute, and CSS custom properties per surface drive every foreground colour. Inline colours in the prototype become those variables. One variable set per surface, shared by all About sections.

## 3. Which sections get the setting

| Section (prototype label) | Approved surface (default) | Editable? | Allowed surfaces |
|---|---|---|---|
| Opening (portrait + name) | Gesso | Yes | Gesso, Vaayu mist, Stone mist, Sand |
| 01 A creative journey | Gesso | Yes | All seven |
| 02 An evolving practice | Stone mist | Yes | All seven |
| 03 The beauty of unpredictability | Night | Yes | All seven (see §4) |
| 04 Inspired by nature | Vaayu mist | Yes | All seven |
| 05 What art means to me | Deep teal | Yes | All seven |
| Closing invitation | Gesso | Yes | Gesso, Vaayu mist, Stone mist, Sand |

- The Opening and the Closing are limited to light surfaces: they sit directly under the header and directly above the Ink footer, and a dark surface there would merge with the footer or make the header float on darkness.
- The defaults reproduce the approved page exactly. Changing nothing = the approved design.

## 4. Artwork, photographs and mats
- **Section surface and artwork presentation are independent.** A painting shown as an artwork (plate, with or without hang shadow) keeps its own presentation surface. The section surface never becomes the painting's mat.
- Light-ground paintings shown as plates on a dark surface get a **gesso plate** behind them, so their white canvas isn't read as part of the dark ground. Dark-ground works (Moonlit Waves, Un Colored by Nature, Yin) may sit directly on Ink or Night with no shadow, as approved.
- Full-bleed photographs and crops (Chapter 3's Moonlit Waves detail, the portrait, the placeholder photo slots) fill their frame, so the surface only affects the text area around them.
- Hang shadow: on for light surfaces, off on Deep teal, Ink and Night (a shadow on dark reads as a smudge).
- Image placeholders take a neutral fill: Mat #F0F2F1 on light surfaces, #1F2A33 on dark.

## 5. Guardrails
- **Rhythm warning (help text, not a hard block):** the Theme Editor help text for each Surface setting says: "Avoid two dark sections next to each other. The approved page alternates light and dark." The theme doesn't enforce this, because Ranjeeta may need it when a photograph requires it.
- **Sand:** once per page, as in V2 Foundations. Help text only.
- **No per-element colour settings.** Text, link and button colours aren't exposed. If one combination ever looks wrong, the fix is in the surface scheme, which a developer changes once for every section.
- Contrast: every scheme above meets 4.5:1 for body text on its surface (V2 Foundations contrast column). The Night secondary grey #A4A9AC is limited to large text.

## 6. Mobile
- Same setting, same surface. There is no separate mobile surface.
- The mobile composition is unchanged. Surfaces are full-width bands, as on desktop.

## 7. Theme Editor summary (for Ranjeeta)
- Each About section: **Surface** (select, about 7 options with plain names: "Gesso (light)", "Vaayu mist (light blue)", "Stone mist (light grey)", "Sand (warm light)", "Deep teal (dark)", "Ink (dark)", "Night (darkest)").
- Nothing else is added.

## 8. Acceptance checks
- With all defaults, the page matches the approved desktop and mobile designs exactly.
- Setting Chapter 1 to Night: heading, body, eyebrow, links and rules all switch to the dark scheme. Nothing stays ink-on-dark.
- Setting Chapter 3 to Gesso: the full-bleed detail is unchanged, the text area becomes light with ink type.
- A light-ground painting plate inside a dark section keeps a gesso plate.
- Focus ring visible on every surface.
- Opening and Closing don't offer dark surfaces.
