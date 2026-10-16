# Exhibitions — Addendum 01: Links to exhibited works and series

Status: Ranjeeta approved the Exhibitions page ("The catalogue"). This addendum adds optional navigation from an exhibition record to (a) the artworks actually exhibited and (b) related series. The approved composition, wall-label language, Plates I–III, Selected exhibitions and Archive are unchanged.

The full Exhibitions implementation handoff has not been written yet. When it is, this addendum is part of it.

Visual reference: `Exhibitions.dc.html`, desktop and mobile. Tweak "Show sample links" turns the sample assignments on and off, so both states can be compared.

## 1. Two separate relationships
| Relationship | Meaning | Visual form |
|---|---|---|
| **Exhibited work** → product | This painting was in this exhibition and has a page in the shop | The work's title in the "Shown:" line becomes a link |
| **Related series** → collection | The exhibition is associated with a body of work | One label link: "EXPLORE THE SERIES · {Series name} →" |

They're independent. An exhibition may have several linked works, one or more series, both, or neither.

## 2. Treatment
**Exhibited work links (inline titles)**
- The title stays where it is, in italics, in the "Shown:" line or archive works line.
- Linked titles get a 1px underline in #A4A9AC, offset 4px, and turn copper (#96502A) on hover/focus, with copper underline.
- On dark (Plate I): gesso text, underline #7A8085, gold #C7A864 on hover.
- Unlinked titles (historical works with no product) stay plain italic with no underline, no icon and no "unavailable" note. The record stays complete.
- No thumbnails, prices, availability badges or "Add to bag" are added. This isn't a product grid.
- **Sold works** link to their product page like any other. The PDP already shows the approved sold/archive state. Nothing on Exhibitions says "sold" except existing record facts ("found its home during the exhibition", the archive tag "Work sold").

**Series link (label link)**
- Marcellus label style, 11px (12px on Plate I desktop), tracking .18em, uppercase, teal #0F5468, copper on hover. Arrow `→`, decorative (aria-hidden).
- Placed directly below the works line, left-aligned with the label text.
- On Plate I (dark): gesso, with a 1px #565C61 bottom rule; gold on hover.
- If more than one series: one link per series, stacked with a 4px gap (desktop archive), or wrapped in a row with 16px gap (selected/plates). Order follows the order Ranjeeta sets.
- Wording uses the collection's own title. Don't hard-code series names.

## 3. Placement by area
| Area | Exhibited works | Series |
|---|---|---|
| Plate I (and any future Plate) | Title in the "Work" row of the label | Label link below the label list |
| Plates II–III (typographic recognition) | Only if works are assigned: add a "Shown:" line in the same style as Selected | Label link below |
| Selected exhibitions | Titles in the "Shown:" line | Label link below "Shown:" |
| Archive (desktop) | Titles in the middle column's works line | Label link under the works line, same column. Row height grows by one line only when present |
| Archive (mobile) | Same, inline | Label link, full 44px touch height |

## 4. Empty and partial states
- No works assigned and no series → the record looks exactly like the approved design. No empty space is left behind.
- Works text exists but no product links → plain italic (approved).
- Series only (e.g. "Two paintings from the Sand and Cloud series") → works text plain, series link shown.
- A linked product later deleted or unpublished → render the title plain (the theme checks the reference resolves). Never output a link to a missing page.
- A linked collection that is empty or unpublished → hide the series link.

## 5. Mobile
- Inline title links: the text is 15–16px and the link is the whole title. Where a works line has several linked titles, keep the comma separators so they aren't merged into one link target; the line spacing (1.5) gives ~24px rows. This is acceptable for inline text links (WCAG 2.5.8 inline exception).
- Series links: min-height 44px.
- No hover-only information.

## 6. Accessibility
- Links are real `<a>` elements with the work or series title as the accessible name. Series link name: "Explore the series: Colored by Nature".
- Don't use "click here" or icon-only links.
- Focus: 2px cerulean ring, offset 3px, on both light and dark grounds.
- Underline is the non-colour cue that a title is a link (copper hover alone isn't enough).

## 7. Owner-editable data (recommendation, not final architecture)
Each exhibition record is already intended to be a repeatable, owner-editable entry (to be decided in the main handoff, likely a metaobject "Exhibition"). This addendum adds two **optional** fields to that record:

| Field | Type (Shopify native) | Required | Notes |
|---|---|---|---|
| Exhibited works (linked) | List of product references | No | Only works that exist as products. Order = display order |
| Exhibited works (text) | Single- or multi-line text | No | Already in the approved design. Holds every title, including historical works with no product |
| Related series | List of collection references | No | Usually one |

- **Display rule:** the "Shown:" line is built from the text field, so historical titles are never lost. A title is turned into a link when a referenced product's title matches it. A simpler alternative for Cursor to weigh: show the text, then any referenced products not already named. Cursor should choose one rule and document it. **Needs implementation judgment.**
- No invented product links. If a work isn't in Shopify, it stays text.
- The reverse direction (showing "Exhibited at…" on a PDP) is **not** part of this addendum. It's a possible future use of the same references.

## 8. Sample assignments in the prototype
These are placement demonstrations only, not confirmed data:
- Plate I / Black & White archive row: *Un Colored by Nature* → product; series → Colored by Nature.
- Selected No. 04 / Indulgence archive row: *Indulgence* → product (a sold work, to show a link to a sold PDP).
- Earth Day archive row: series → Sand and Cloud. The works text is a description, so it stays plain.
- Everything else: no links.

Ranjeeta to confirm which exhibited works exist as products and which series each exhibition relates to.

## 9. Scope cleanup to flag (not changed here)
- The Exhibitions closing has an "Exhibition news" link. News is now out of scope. Remove or retarget it in the navigation/content cleanup.

## 10. Acceptance checks
- With no links assigned, the page matches the approved design exactly.
- Linked titles have an underline; unlinked titles don't.
- A sold linked work opens its PDP in the sold/archive state.
- No thumbnails, prices or buttons are added to records.
- A deleted product or unpublished collection never produces a broken link.
- Mobile series links are 44px tall. No horizontal overflow at 320px.
