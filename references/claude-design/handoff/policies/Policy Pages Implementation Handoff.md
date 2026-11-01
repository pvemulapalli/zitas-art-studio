# Policy Pages & Footer Legal Links — Implementation Handoff (V2)

**Design source:** `reference/source/Policy Page.dc.html` and `reference/source/Zita Footer.dc.html`. This is the operator-confirmed implementation reference (the screenshot supplied on 1 Nov 2026). **Don't redesign it.** This document **replaces** the earlier `Policy Pages Handoff.md`, which wrongly assumed a custom policy template.

Screenshots (`references/claude-design/screenshots/v2/`):
- `policy-desktop-01/02`: about 1540px.
- `policy-footer-desktop`
- `policy-mobile-01…04`, including `-02-on-this-page-open`.
- `policy-footer-mobile`

**Prototype-only elements (never render in Shopify):**
- The dark prototype bar at the top.
- The phone frame.
- **The orange dashed "Specimen layout…" notice** under the title. In the source it's marked `data-prototype-only` and controlled by the prop `showSpecimenNote`; it's hidden in the package screenshots.
- All specimen body text. Real text always comes from Shopify.

---

## 1. Duplicate "ON THIS PAGE": a capture artefact
The source contains **one** desktop navigation, a `<nav aria-label="On this page">` with `position: sticky; top: 32px`. In a full-page stitched screenshot, a sticky element is captured again in each scrolled segment, so it appears twice. That's what the supplied screenshot shows.

**Implement exactly one `<nav>` on desktop and one `<details>` on mobile, and show only one per breakpoint** (`display: none` on the other). Never render both.

## 2. Shopify constraint (correction)
Online Store 2.0 has **no policy template type**. You can't use `templates/policy.json` or a custom section. Shopify renders each policy itself, inside `layout/theme.liquid`, as roughly:

```html
<div class="shopify-policy__container">
  <div class="shopify-policy__title"><h1>Refund policy</h1></div>
  <div class="shopify-policy__body"><div class="rte">…policy HTML from Admin…</div></div>
</div>
```

The exact wrapper may vary; inspect the live markup and target what's there. Shopify's default container CSS limits the width (about 720px, centred). **That default must be overridden**; it's the cause of the reported "left alignment" and formatting issues.

The available levers, all used below:
1. **Detection:** `request.page_type == 'policy'` in `theme.liquid`. Add `class="template-policy"` to `<body>`.
2. **CSS** scoped to `.template-policy .shopify-policy__*`.
3. **Liquid in `theme.liquid`** around `{{ content_for_layout }}` (policy pages only): the "Other policies" block from `shop.policies`.
4. **Small deferred JS** (about 1.5 KB): the eyebrow, the grid placement wrapper, and "On this page" built from the real headings.

Native URLs (`/policies/refund-policy`, `privacy-policy`, `terms-of-service`, `shipping-policy`, `contact-information`) are unchanged. Don't create duplicate Pages.

## 3. Desktop layout (≥ 990px)
Values are taken directly from the source.

- **Shell:** `max-width: 1560px; margin: 0 auto; padding: clamp(64px,7vw,112px) clamp(20px,3.4vw,56px) clamp(96px,10vw,160px)`.
- **Grid:** `grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: clamp(16px,2vw,32px)`. No row gap.

| Area | Grid | Spec |
|---|---|---|
| Header | col 4 / span 7, row 1 | `display:grid; gap:16px; padding-bottom:40px; border-bottom:1px solid #15202A; margin-bottom:48px` |
| Eyebrow "Policies" | in header | Marcellus 12px, letter-spacing .22em, uppercase, #96502A |
| H1 (policy title) | in header | Marcellus 400, clamp(40px,4vw,60px), line-height 1.08, #15202A |
| On this page | col 1 / span 2, row 2 | `align-self:start; position:sticky; top:32px; display:grid; gap:4px` |
| ↳ label | | Marcellus 11px, .2em, uppercase, #565C61, margin-bottom 8px |
| ↳ link | | `padding:6px 0 6px 12px; border-left:1px solid #CDD1D2`, Mulish 15px / 1.4, #3B4044, no underline. **Current:** border and text #0F5468. Hover: #96502A |
| Body | col 4 / span 7, row 2 | `max-width:38em`, Mulish 18px / 1.7, #1F2A33 |
| ↳ H2 | | Marcellus 400, 28px / 1.2, #15202A, margin 0 |
| ↳ section rhythm | | 16px between blocks inside a section; **48px before each H2** (except the first) |
| ↳ paragraph | | margin 0 (16px rhythm), `text-wrap: pretty` |
| ↳ list | | native bullets, `padding-left:1.2em`, 6px between items |
| ↳ link | | #0F5468, underline, `text-underline-offset:3px`; hover #96502A |
| Other policies | col 4 / span 7, row 3 | `padding-top:32px; border-top:1px solid #CDD1D2; display:grid; gap:14px` |
| ↳ label | | as "On this page" label |
| ↳ links | | flex wrap, `gap:8px 32px`, Mulish 17px #15202A, underline #A4A9AC offset 4px, hover #96502A |

**The column 4 offset is intentional** (an asymmetric reading column). Don't centre it, and don't start the body at column 1.

**Elements not shown in the specimen, styled for real policies:**
- H3: Marcellus 22px / 1.25, 32px before.
- `strong`: 600.
- Tables: full width of the column, 15px, 1px #CDD1D2 rules, cell padding 10px 12px, wrapped in an `overflow-x:auto` container added by JS.
- `blockquote`: 1px #CDD1D2 left rule, 16px padding.
- `hr`: 1px #CDD1D2, 48px margin.

## 4. Mobile (≤ 749px)
- **Main:** padding 36px 20px 56px. Single column, no grid offset.
- **Eyebrow:** 11px. **H1:** margin 10px 0 20px, 36px / 1.1.
- **On this page:** a native `<details>` with `border-top:1px solid #15202A; border-bottom:1px solid #CDD1D2; margin-bottom:32px`.
  - Summary: min-height 48px, flex space-between, Marcellus 12px .18em uppercase #15202A, "+" on the right, `list-style:none`.
  - Links: min-height 44px rows, Mulish 16px #15202A, padding-bottom 12px on the list.
- **Body:** 17px / 1.7. H2 24px / 1.2. 14px rhythm, **36px** between sections.
- **Other policies:** `padding-top:24px; border-top:1px solid #CDD1D2`. Label margin-bottom 6px. Links as **stacked 44px rows**, Mulish 17px #15202A.
- No horizontal overflow at 320px; tables scroll inside their container.

**Tablet (750–989px):** **Needs implementation judgment.** The design shows desktop and mobile only. Recommendation: use the mobile structure (disclosure, single column), with the body max-width 38em and left-aligned at the gutter, so the sticky rail never gets squeezed into two narrow columns.

## 5. "On this page": generation rules
- **Source:** headings inside `.shopify-policy__body`. Use H2. If there are none, fall back to H3. If neither exists, fall back to paragraphs that consist only of `<strong>`. **Needs implementation judgment** on that last fallback: check the actual policy HTML; Shopify's generated templates often use bold paragraphs.
- **Show only when there are ≥ 3 entries.** Otherwise render nothing (no empty rail).
- **ids:** slugify the heading text; de-duplicate with -2, -3. Set `scroll-margin-top: 32px` (add the sticky header height if the header is sticky on policy pages).
- **Current state:** the first item is current on load. Scroll-spy (IntersectionObserver) is **optional**; the design shows a static first-item state.
- **Mobile:** jump links close the `<details>` after click.
- **No JS:** nothing renders. The page stays fully readable.
- `<nav aria-label="On this page">`. Use the same label text for `<details>`, and give its link list `aria-label` too.

## 6. Other policies
Rendered in Liquid (no JS), after the policy body, on policy pages only:

```
{% for p in shop.policies %}{% unless p.url == request.path %}…{% endunless %}{% endfor %}
```

- Label text: `policy.title` (Shopify's own titles: "Privacy policy", "Terms of service", "Shipping policy", "Contact information", "Refund policy").
- It must be placed in the grid's row 3 at columns 4–10. Insert a wrapper so it shares the grid with the policy content: either wrap `content_for_layout` plus this block in a `.policy-grid` element in `theme.liquid`, or move it with JS. **The Liquid wrapper is preferred**, because it avoids layout shift.

## 7. Recommended structure (summary)
```
theme.liquid
  <body class="… {% if request.page_type == 'policy' %}template-policy{% endif %}">
  {% if request.page_type == 'policy' %}
    <main class="policy-shell"><div class="policy-grid">
      {{ content_for_layout }}            ← Shopify's policy markup
      {% render 'policy-other-links' %}
    </div></main>
    <script src="{{ 'policy-page.js' | asset_url }}" defer></script>
  {% else %} …existing… {% endif %}
```

**CSS:**
- `.shopify-policy__container` gets `display: contents` (or `max-width: none; margin: 0; padding: 0`), so its children join `.policy-grid`.
- `.shopify-policy__title` goes to column 4 / span 7, row 1, with the header rules.
- The eyebrow comes from `.shopify-policy__title::before { content: "Policies" }`. Better: a localised string injected by Liquid if the title can be wrapped. **Needs implementation judgment.** CSS `content` isn't translatable, but it has no layout shift.
- `.shopify-policy__body` goes to column 4 / span 7, row 2, `max-width: 38em`.

`policy-page.js` inserts the `<nav>` at column 1 / span 2, row 2, and the mobile `<details>` before the body.

Everything sits in **one** stylesheet block scoped to `.template-policy`, with no effect on other pages.

## 8. Footer legal links (bottom bar)
**Composition unchanged:** no Legal column. The primary columns (Art, Studio, Contact) and the newsletter stay as they are.

- **Bar:**
  - outer: `border-top: 1px solid #3B4044`;
  - inner: `max-width:1560px; margin:0 auto; padding:22px clamp(20px,3.4vw,56px); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px 32px`.
- **Left:** the reversed wordmark (existing).
- **Right:** `display:flex; flex-wrap:wrap; gap:10px 24px`, Mulish 15px.
  - Links, #A4A9AC, no underline, hover #F8F8F6, focus 2px #2E8FB5 ring offset 3px: **Shipping · Returns · Privacy · Terms · Contact information**.
  - Then **"© 2026 Ranjeeta Shroff"** as plain text, #A4A9AC.
- **Updated in this package:** the fifth link, "Contact information", was added (`Zita Footer.dc.html`). Nothing else changed.
- **Source of the links:** a dedicated Shopify menu, for example `footer-legal`, selected by a `link_list` setting on the footer section. Ranjeeta controls the labels and order in Navigation. Menu titles should be the short labels above.
- **Fallback** when no menu is set: loop `shop.policies` and use `policy.title`. The labels will be longer, which is acceptable as a fallback.
- **Copyright:** a text setting, or `© {{ 'now' | date: '%Y' }} Ranjeeta Shroff`. **Needs implementation judgment.**
- **Mobile** (see `policy-footer-mobile`): the same flex wrap. The wordmark sits on its own line; the links and copyright wrap below, left-aligned at the gutter. Don't centre or stack them vertically.
- **Touch targets:** the links are 15px text with no padding. To meet WCAG 2.5.8 (24px target), add `padding-block: 4px` on mobile. That's invisible in the composition and isn't a design change. Don't enlarge the type.

## 9. Accessibility
- One H1 per page (Shopify's title). Body headings as authored.
- The nav and details are labelled. Native `<details>` provides keyboard support.
- Focus: 2px solid #2E8FB5, offset 3px, on every link, including in the dark footer.
- Contrast: body #1F2A33 on gesso #F8F8F6 ≈ 13:1; footer links #A4A9AC on ink #15202A ≈ 7:1.
- 200% zoom with no horizontal scrolling (tables excepted, inside their container).
- `prefers-reduced-motion`: anchor jumps are instant (no `scroll-behavior: smooth`).

## 10. Content and editability
| Content | Source | Edited by |
|---|---|---|
| Policy title and body | Admin › Settings › Policies | Ranjeeta |
| Which policies exist (Other policies) | `shop.policies` | Same |
| Footer legal links | Navigation menu (`footer-legal`) | Ranjeeta |
| "Policies", "On this page", "Other policies" labels | Theme locale strings | Developer |
| Layout and type | Theme CSS | Developer |

The policy text has **not** been reviewed for substance. That is Ranjeeta's decision, ideally with her adviser. Earlier content flags (shipping regions, returns of originals, damage in transit, customs) still apply.

## 11. Acceptance checklist
- [ ] All five policies render with the same styling at their native URLs.
- [ ] Desktop: the title and body start at **column 4**; the H1 is 60px at 1540px; there's an ink rule under the header; the body measure is ≤ 38em.
- [ ] Exactly **one** "On this page" per breakpoint; sticky on desktop; hidden when there are fewer than 3 headings.
- [ ] No specimen notice and no specimen text anywhere.
- [ ] "Other policies" lists every other configured policy and excludes the current one.
- [ ] Policy body links are teal and underlined. Lists keep their bullets. Tables don't break the layout.
- [ ] Mobile: 20px gutters, 36px H1, the disclosure works by keyboard, 44px rows, no overflow at 320px.
- [ ] Footer bar: the wordmark on the left; Shipping, Returns, Privacy, Terms, Contact information and © on the right; it wraps left-aligned on mobile; no Legal column.
- [ ] No effect on non-policy pages.
