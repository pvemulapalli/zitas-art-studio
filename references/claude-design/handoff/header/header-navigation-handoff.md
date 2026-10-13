# Zita's Art Studio: Header Navigation & Originals Menu, Audit and Handoff (V2)

**Scope:** desktop header, the Originals dropdown, mobile header and menu. Not the announcement band content, footer, or any page body.

**Source of truth:**
- `Zita Header.dc.html` (desktop bar and Originals menu);
- `Phone.dc.html` (mobile bar and menu);
- `Global Shell.dc.html` (the approved shell board and its IA notes).

**Reference:** `reference/header-navigation.html` (vanilla HTML/CSS/JS, a working desktop dropdown and mobile menu, built from a mock Shopify menu object). Resize below 1000px for mobile.

**Labels:**
- **APPROVED** means it is in the V2 design as reviewed.
- **NEW** means my recommendation to fill a gap, which needs your sign-off before Cursor builds it.
- **NIJ** means needs implementation judgment: Cursor should ask, not decide.

**Not part of the design:** the Proto Bar, the phone frame and status bar, and the "drop a series image" placeholders.

---

## 1. Audit of the existing V2 navigation

### Clearly designed (APPROVED)
| Area | What exists |
|---|---|
| Desktop bar | Gesso, 84px minimum height, 1px `#E3E7E7` bottom hairline, 1560px container, left wordmark → nav → icons |
| Wordmark | Tracked capitals `ZITA'S` / rule / `ART STUDIO`, live text, links home |
| Top-level items | Originals ▾ · Prints · Exhibitions · About · News · Contact |
| Icons | Search, Instagram (≥1180px only), Bag with count |
| Only one dropdown | Originals. All other items are plain links |
| Dropdown composition | A full-width panel under the bar in 3 columns: current series list · utility links · square series preview |
| Dropdown behaviour | Opens on hover and on click; closes 120ms after the pointer leaves the header; closes on Esc; hovering or focusing a series swaps the preview |
| Narrow desktop | Nav gaps tighten (34 → 22 → 16px), tracking tightens (.16em → .1em), the Instagram icon hides |
| Mobile bar | 58px, wordmark + Bag + a text "MENU"/"CLOSE" button, no hamburger |
| Mobile menu | A full-screen gesso overlay below the bar: series first (64px thumbnails), an "All originals…" link, then site pages, then Instagram and email |
| Mobile announcement | Not shown on mobile (the Global Shell note) |
| IA principles | Only 2–3 current series named; earlier and sold work one step behind; order set in Shopify, not by title prefixes; Prints stands alone; Commissions sits inside Originals |

### Gaps or unresolved (this handoff resolves them as NEW or NIJ)
1. **How the Shopify menu maps onto the three dropdown columns.** Not specified. → §4.1 (NEW)
2. **Series status line** ("Current series · 4 originals"). "Status" has no Shopify source. → §4.2 (NEW)
3. **Preview image source and initial state.** → §4.2
4. **ARIA pattern.** The prototype uses `role="menu"`/`menuitem`, which is the wrong pattern for site navigation. → §2.6 (NEW: disclosure)
5. **Hover intent** (open delay, the gap between button and panel), touch-capable desktops. → §2.4
6. **Tab-out, focus return, click-outside.** Only Esc is specified. → §2.4
7. **Open/close motion** for the panel and the mobile menu. Not specified. → §2.7, §3.4
8. **Active states for series and for PDPs.** Only top-level "current" exists. → §2.5
9. **Breakpoint between the desktop and mobile headers.** The prototype only shows the two ends. → §5 (NEW: 1000px)
10. **Mobile search.** Not designed. → §3.6 (NEW, needs approval)
11. **Mobile submenus, back navigation, scroll locking, focus handling.** Not designed. → §3
12. **Sticky behaviour.** Left as NIJ in the homepage handoff. **Keep whatever the implemented header already does.** This handoff doesn't change it, but the dropdown must work in both cases (§2.3).
13. **Other items gaining children** (if Ranjeeta nests links under About, for example). Not designed. → §4.3

---

## 2. Desktop behaviour (≥ 1000px)

### 2.1 Bar (APPROVED, as implemented)
- Row: wordmark (flex none) · gap `56px` at ≥1180, `28px` below · nav (`flex:1`, left-aligned) · icons (gap 2px, 44px buttons).
- Nav items: Marcellus 13px caps, `+0.16em` (the prototype's `+0.1em` below 1000px is superseded by the mobile breakpoint, §5), padding `10px 0`, a 1px bottom border (transparent by default), `white-space:nowrap`.
- Gaps: 34px (≥1280) · 22px (1000–1279).
- The Originals trigger is a `<button>` with the label + 14px Lucide `chevron-down` (1.25 stroke), gap 6px.

### 2.2 Dropdown panel (APPROVED layout, values from the prototype)
- `position:absolute; left:0; right:0; top:100%` of the header element: full browser width, flush under the bar's hairline.
- Background gesso `#F8F8F6`, `border-top:1px solid #E3E7E7`, shadow `0 24px 64px -24px rgba(13,20,26,.35)` (the design's overlay shadow). **No scrim** over the page.
- Inner: `max-width:1560px`, padding `40px gutter 48px`, grid `minmax(0,1.1fr) minmax(0,1fr) minmax(0,.9fr)`, gap `clamp(24px,4vw,64px)`.

**Column 1: Current series**
- Eyebrow: Marcellus 11px, `+0.22em`, caps, copper `#96502A`, margin-bottom 12px. The text is the parent menu item's title (§4.1); the default is "Current series".
- Series rows, gap 4px. Each row is a link with `padding:12px 0`, `border-bottom:1px solid #E3E7E7`, grid gap 2px:
  - Name: Marcellus 24px/1.2, ink. **Teal `#0F5468` when it is the previewed series** (hover or focus).
  - Line: Mulish 15px `#565C61`: "{n} originals" (§4.2).
- 2–3 rows expected. Four still fits; at 5 or more, see the edge cases.

**Column 2: Utility links**
- `padding-top:30px` (aligns with the first series name), grid gap 14px.
- Mulish 19px ink, no underline, hover copper (160ms).
- Approved set: All originals · Earlier series & sold work · Commission a painting. All come from the menu (§4.1).

**Column 3: Preview**
- `aspect-ratio:1/1`, mat `#F0F2F1`, padding 12%. The image is contained (`max-width/max-height:100%`), with the hang shadow `0 1px 2px rgba(13,20,26,.06), 0 18px 40px -18px rgba(13,20,26,.28)`. `alt=""`: it is decorative, and the series name is the link.
- Shows the **first series by default**, swaps on hover or focus of a series row, and **keeps the last previewed one** when the pointer moves to column 2 or 3 (APPROVED).
- **NEW:** a 160ms crossfade between previews (instant with reduced motion). The prototype swaps instantly; either is acceptable.
- **No image for a series:** the mat stays empty. **NEW:** show the series name centred on the mat in Marcellus 20px `#767C80` instead of an empty box.
- The preview is **not a link** (APPROVED; it is a hover response, not a destination).

### 2.3 Relationship to the header and the page
- The panel is part of the header element, so `onmouseleave` on the header covers bar + panel as one hover zone (APPROVED). There is no gap between bar and panel, so no hover bridge is needed.
- The panel overlays the page below. The page doesn't shift or dim.
- **If the header is sticky,** the panel is still `top:100%` of the sticky header. Add `max-height: calc(100vh - header bottom); overflow-y:auto` so it never runs off-screen on short laptop screens.
- `z-index` above the page, below any drawers or dialogs (the bag drawer, if one exists).

### 2.4 Opening and closing
| Input | Behaviour |
|---|---|
| Pointer enters Originals (fine pointer) | Opens after a **NEW 80ms intent delay** (the prototype opens instantly; the delay prevents fly-by opening when the pointer crosses the bar) |
| Pointer enters another nav item | Closes (APPROVED) |
| Pointer leaves the header (bar + panel) | Closes after **120ms** (APPROVED); re-entering cancels |
| Click or tap on Originals | Toggles (APPROVED). On touch or coarse pointers, **hover does nothing; tap only** (NEW: `@media (hover:hover) and (pointer:fine)` decides whether hover listeners attach) |
| Enter or Space on the trigger | Toggles; focus stays on the trigger |
| Esc (anywhere while open) | Closes; **focus returns to the trigger** if focus was inside the panel (NEW) |
| Tab past the last panel link, or Shift+Tab before the trigger | Closes (NEW) |
| Click outside the header | Closes (NEW) |
| Choosing a link | Normal navigation; the panel closes with the page |

Tab order when open: trigger → series 1…n → utility links → the next top-level nav item. Keep panel markup **directly after the trigger in the DOM** (or use `aria-controls` plus a focus hand-off) so this happens natively.

### 2.5 Active and selected states
| State | Treatment |
|---|---|
| Top-level current page | Teal `#0F5468` text + a 1px teal bottom border (APPROVED) |
| Originals current | The same, when on **any collection listed under Originals, the Originals root collection, or the PDP of a product** (NEW: the PDP rule; Shopify `link.active` / `link.child_active` cover collections; for PDPs use `template.name == 'product'` and the product being an original, see the PDP handoff Q3) |
| Originals open | Teal text without the underline (APPROVED: `origColor` teal when open) |
| Series row, previewed | Name teal (APPROVED) |
| Series row, current collection | Name teal + `aria-current="page"` (NEW). It is also the default preview when the panel opens on that collection |
| Hover on top-level links | Copper `#96502A`, 160ms (APPROVED) |
| Focus | 2px cerulean `#2E8FB5` outline, 3px offset, everywhere (APPROVED system rule) |

### 2.6 Semantics (NEW, replaces the prototype's `role="menu"`)
- Use the **disclosure navigation** pattern:

```html
<nav aria-label="Main">
  <ul>
    <li>
      <button aria-expanded="false" aria-controls="nav-originals">Originals</button>
      <div id="nav-originals" hidden>…plain lists of links…</div>
    </li>
    <li><a href="/pages/prints">Prints</a></li>
  </ul>
</nav>
```

- Column 1 is a `<ul aria-labelledby>` pointing at the eyebrow; column 2 is a plain `<ul>`.
- No `role="menu"`, no `menuitem`, no arrow-key roving. Tab and Shift+Tab are enough.
- The current item gets `aria-current="page"`.
- Bag: `aria-label="Bag, 2 items"`. Search: `aria-label="Search"`.

### 2.7 Motion (NEW; the prototype has none)
- Panel open: opacity 0 → 1 over 160ms with `cubic-bezier(.22,.61,.36,1)`. **No slide, no height animation.** Close: instant.
- `prefers-reduced-motion`: instant.

---

## 3. Mobile behaviour (< 1000px)

### 3.1 Bar (APPROVED)
- 58px tall, gesso, a 1px `#E3E7E7` bottom hairline, padding `0 8px 0 20px`.
- Wordmark: `ZITA'S` Marcellus 17px +.2em · 1×16px rule `#A4A9AC` · `ART STUDIO` 10px +.3em `#3B4044`, gap 10px, 44px tall link.
- Right: Bag icon button (44px) then the **MENU** text button: Marcellus 12px caps +.2em, min 64×44px. Its label reads "CLOSE" when open, with `aria-expanded` and `aria-controls`.
- No announcement band on mobile (APPROVED).

### 3.2 Menu panel (APPROVED composition)
- Covers the viewport **below the bar** (the bar stays visible so Close and Bag remain reachable): `position:fixed; top:<bar bottom>; left:0; right:0; bottom:0`, gesso, `overflow-y:auto`, `overscroll-behavior:contain`.
- Padding `24px 20px 36px` (+ `env(safe-area-inset-bottom)`), flex column, gap 28px.
- **Group 1: Originals.**
  - Eyebrow Marcellus 11px +.22em caps copper: "Originals · current series" (APPROVED copy; composed as `{Originals title} · {series group title}`).
  - Series rows: flex, gap 16px, padding `10px 0`, min-height 64px, `border-bottom:1px solid #E3E7E7`:
    - a 64×64 mat `#F0F2F1` with padding 8px and the collection image contained;
    - the name in Marcellus 22px/1.2;
    - the line "{n} originals" in Mulish 15px `#565C61`.
  - Then a combined link row: min-height 52px, Marcellus 13px +.16em caps teal, an arrow icon at the right: "All originals, earlier series & sold work" (APPROVED).
  - **NEW:** to stay data-driven, this row is generated from **the first utility link** (All originals) using the approved combined label as a Theme Editor text. The remaining utility links (Earlier series & sold work, Commission a painting) appear in group 2 instead of being lost. Alternative: render each utility link as its own teal row (**needs approval**; the approved screen shows one row plus "Commissions" in group 2).
- **Group 2: Site pages.** Every other top-level item: Marcellus 19px ink rows, min-height 52px, `border-top:1px solid #E3E7E7`. The approved list is Prints, Exhibitions, About, News, Commissions, Contact.
- **Group 3: Contact** (`margin-top:auto`, gap 10px, Mulish 16px): "Follow on Instagram" (18px icon, 44px row) and the email (`#565C61`). Both come from the existing theme or footer settings; never hard-coded.

### 3.3 Hierarchy, submenus, back navigation
- **APPROVED: flat, no drill-down.** Series are already expanded in group 1, so there is no submenu to enter and **no back button**. This is the intentional mobile design: one scroll, series first.
- Tapping a series navigates straight to its collection.
- If another top-level item gains children (§4.3): **NEW**, render it as an accordion row (a `+`/`−` icon at the right, children indented 16px in Mulish 17px). No drill-down panels.

### 3.4 Opening and closing (NEW)
- Open: menu opacity 0 → 1 over 160ms (pour easing); reduced motion: instant. No slide-in drawer (the approved design is a full overlay).
- Close: tap CLOSE, press Esc (hardware keyboards), or tap any link. Closes instantly.
- While open:
  - **lock page scroll** (`overflow:hidden` on `html`, preserving scroll position);
  - set `inert` on `<main>` and the footer.
- Focus: on open, move focus to the first series link; trap Tab within bar + menu; on close, return focus to the MENU button.
- Rotating to landscape or resizing past 1000px closes the menu.

### 3.5 Imagery on mobile
- APPROVED: a 64px matted thumbnail per series, using the same image source as the desktop preview (`collection.featured_image`, 128w for 2× density). No large preview on mobile.
- No image: the 64px mat stays empty (keeps rows aligned). **Do not** substitute an icon.

### 3.6 Search and bag on mobile
- **Bag:** always in the bar (APPROVED).
- **Search:** not designed. **NEW, needs approval:** a "Search" row at the very top of the menu: Marcellus 19px with a 18px Lucide `search` icon, 52px, bottom hairline, linking to `/search` (the native search page). This keeps the bar to two controls, as approved. The alternative is a search icon in the bar (three controls in 390px, tighter).

### 3.7 Touch targets
All rows ≥ 52px (series 64px), bar buttons ≥ 44px, contact rows ≥ 44px. No hover-dependent content on mobile.

---

## 4. Shopify content model

### 4.1 Menu structure (NEW: the key decision)
Use the **native `main-menu`** (theme setting `menu`, default `main-menu`). Up to three levels, all editable in Admin → Navigation:

```
Originals                      → /collections/originals   (level 1, collection link)
├─ Current series              → #  or /collections/originals   (level 2 WITH children = series group)
│  ├─ Walking the Trail        → collection: walking-the-trail   (level 3)
│  ├─ Elements                 → collection: elements
│  └─ Colored by Nature        → collection: colored-by-nature
├─ All originals               → collection: originals          (level 2, no children = utility link)
├─ Earlier series & sold work  → collection or page
└─ Commission a painting       → page: commissions
Prints                         → collection: prints
Exhibitions                    → page / blog
About                          → page
News                           → blog
Contact                        → page
```

**Rendering rule (no hard-coded names):**
- A level-1 item **with children** becomes a dropdown trigger. In V2 only Originals has children.
- Inside it, a level-2 item **with children** is the series group:
  - its title is the column-1 eyebrow;
  - its children are the series rows;
  - only the first such group is used.
- Level-2 items **without children** are the column-2 utility links, in menu order.
- Series order = menu order (APPROVED: no title prefixes).
- Clicking the trigger's own label never navigates; it is a button. The level-1 URL is used for the "Originals current" state and as a fallback "All originals" link if none is listed.

Ranjeeta changes the featured series by editing three menu links. No code or theme settings are involved.

### 4.2 Per-series data (all native)
| Element | Source | Fallback |
|---|---|---|
| Series name | `link.title` (menu label, so she can shorten it) | — |
| URL | `link.url` | — |
| Preview / thumbnail image | `link.object.featured_image`: the collection image, else Shopify's first-product image | empty mat (+ the name on desktop, §2.2) |
| Count line "{n} originals" | `link.object.products_count` | omit the line if the link isn't a collection |
| Status ("Current series") | **no source → dropped** (NEW). The eyebrow already says "Current series" | — |

- **Note:** `products_count` includes sold works. The approved line says "originals" (not "available"), so this is correct.
- **NIJ:** if Ranjeeta wants "2 available" instead, use `link.object.products` filtered by `available` (costs a loop; cap at 50).

### 4.3 Edge cases
| Case | Behaviour |
|---|---|
| Originals has no level-2 group | Column 1 is hidden; columns 2–3 remain (the preview uses the first utility collection's image, else is hidden) |
| 1 series | Works as designed; the preview shows it |
| 4 series | Fits (each row is about 75px) |
| 5+ series | It still renders, but contradicts the IA principle ("only the current 2–3"). Document this for Ranjeeta; no scroll or truncation logic |
| A series link points to a page, not a collection | The row renders with name only: no count, empty preview |
| Another item has children (for example About) | Desktop: **NIJ**; the recommendation is a simple single-column dropdown in the same panel style (padding 32px, Mulish 19px links), no images. Mobile: an accordion row (§3.3) |
| Long series name | Wraps in column 1 (desktop) and beside the thumbnail (mobile); never truncated |
| Menu empty or missing | The bar shows the wordmark + icons only |

### 4.4 Theme Editor settings (header section) — keep it to these
- `menu` (link_list, default `main-menu`)
- `mobile_originals_label` (text, default "All originals, earlier series & sold work")
- The Instagram URL and email already live in theme or footer settings. Reuse them; don't duplicate.

**No metafields or metaobjects are needed.**

---

## 5. Responsive breakpoints

| Width | Header |
|---|---|
| ≥ 1280 | Nav gap 34px, row gap 56px, Instagram icon shown |
| 1180–1279 | Nav gap 22px, row gap 56px, Instagram shown |
| 1000–1179 | Nav gap 22px, row gap 28px, Instagram hidden |
| **< 1000** | **Mobile bar + MENU (NEW breakpoint)** |

Why 1000px: wordmark (about 230px) + six items at 13px/.16em (about 540px including 16px gaps) + two icons (88px) + gutters only fit at about 980px and above. The prototype's 16px gap and `.1em` tracking below 1000px are therefore **not used**: tablets get the mobile menu. **Needs approval**, since this means iPad portrait (768–834px) uses the mobile header.

- Dropdown at 1000–1179px: the same 3 columns (the grid gap shrinks through the `clamp`).
- Use **one header markup** for both layouts, toggled by CSS. Do not render the menu twice for screen readers; hide the inactive one with `display:none`.

---

## 6. Accessibility checklist
- Disclosure pattern (§2.6). `aria-expanded` is kept in sync on both triggers.
- Esc closes both menus; focus returns to their trigger.
- Mobile: focus trap, `inert` background, scroll lock.
- Keyboard-only users can reach every series and link without hover.
- Focus ring is visible on gesso (cerulean on gesso passes 3:1).
- Text contrast: ink on gesso; `#565C61` on gesso is 6.5:1; copper eyebrow at 11px is 5.9:1.
- Preview images use `alt=""`; mobile thumbnails `alt=""` (the name is in the link).
- Bag count is announced in the button label.
- Reduced motion removes the fades.

## 7. Performance
- Preview images: render `<img>` tags for every series in the panel at 600w (`sizes="20vw"`), `loading="lazy"`, inside the `hidden` panel, so they load only after the first open. Swap visibility; don't change `src`.
- Mobile thumbnails at 128w, lazy.
- JS: one small custom element (`<site-header>`; give it `display:block`, since custom elements default to inline and the panel positions against it) handling the hover intent, disclosure, outside click, mobile toggle and focus trap. Deferred, no dependencies.

## 8. Decisions Cursor must preserve
1. Originals is the **only** dropdown, and its panel is the approved 3-column, full-width gesso panel. It is not a generic multi-column link dump.
2. Series appear **by name, large, in Marcellus**, with a quiet count line, plus **one** matted, uncropped preview. No grid of product thumbnails, no prices, no "Shop" language.
3. No scrim, no slide-down animation, square corners, hairlines, one overlay shadow.
4. The mobile menu is a full overlay with **series first** and thumbnails. It has a **text "MENU"** button, no hamburger, and no drill-down.
5. The bag is always visible on mobile.
6. Everything comes from the Shopify menu + collection data. No collection names in code.

## 9. Open items for your review
| # | Item | Recommendation | Approval needed |
|---|---|---|---|
| H1 | 3-level menu rule (§4.1) | As written | Yes |
| H2 | Drop the per-series "status" | Yes; the eyebrow carries it | Yes (Ranjeeta) |
| H3 | Mobile/desktop breakpoint at 1000px (tablets get the mobile header) | Yes | Yes |
| H4 | Mobile search as the top menu row | Yes | Yes |
| H5 | Mobile utility links: the first becomes the combined teal row; every other utility link (Earlier series & sold work, Commission a painting) is listed in group 2, so nothing from the menu disappears | Yes | Yes |
| H6 | 80ms hover intent, 160ms fades | Yes | No (behavioural polish) |
| H7 | The empty preview shows the series name | Yes | No |
| H8 | Dropdowns for other items | Simple single-column panel if ever needed | Later |
| H9 | Sticky header | Keep current implementation | — |
