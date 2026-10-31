# Contact (with Trade & Commission inquiries) — Implementation Handoff (V2, approved)

**Status:** the design was approved by Ranjeeta with these changes, which are all already in the design:
- the phone number is published, with tap-to-call on mobile;
- the trade and commission invitation sits before the form, with a CTA that preselects "Commission inquiry";
- 2–3 optional commission photos;
- no portrait;
- up to two optional, inquiry-specific fields;
- form values are kept on errors.

**This is a handoff of an existing design, not permission to redesign it.** Exact inline values are in `reference/source/Contact.dc.html` and `reference/source/Contact Form.dc.html`. Where this document says **Needs implementation judgment**, choose the smallest faithful option and note it in the PR.

Screenshots (`references/claude-design/screenshots/v2/`):
- `contact-desktop-01…04`: about 1540px wide.
- `contact-tablet-01…06`: the desktop layout at 924px.
- `contact-mobile-01…07`: 390px, inside the phone frame.
- `contact-state-desktop-01…06` and `contact-state-mobile-01…03`.

---

## 1. Purpose and visitor journey
One page for every way of reaching Ranjeeta: general questions, questions about an artwork, commissions, and trade or interior-designer inquiries. It replaces the standalone Commissions page. The tone is personal and plain: an extension of the studio, not a support desk.

Journey:
1. **Direct contact first:** her name in the H1, plus her email and phone, for people who already know what they want.
2. **The trade and commission invitation** stands out on its own surface, with a one-click path into the form with the right type already chosen.
3. **The form:** one native Shopify contact form. The inquiry type is chosen first, and the form adapts with at most two optional fields.
4. **An exit** for visitors who aren't ready to write: "Explore the originals".

## 2. Page anatomy
Same order on every breakpoint.

| # | Section | Surface | Anchor |
|---|---|---|---|
| 0 | Global header (existing) | — | — |
| 1 | Opening | Gesso #F8F8F6 | — |
| 2 | Trade & commission inquiries | Vaayu mist #DCE6EA | `#commissions` |
| 3 | Send a message (form) | Gesso | `#message` |
| 4 | Continue strip | Gesso, 1px #CDD1D2 top rule | — |
| 5 | Global footer (existing) | Ink | — |

## 3. Tokens used
| Role | Value |
|---|---|
| Page ground | Gesso #F8F8F6 |
| Commission band | Vaayu mist #DCE6EA |
| Field background | #FFFFFF |
| Selected tile background | #EEF4F5 |
| Headings, primary text | Ink #15202A |
| Body text | #1F2A33 |
| Secondary text | #3B4044 |
| Captions, labels, hint text | #565C61 |
| Eyebrow (gesso) | Copper #96502A |
| Eyebrow (band), selected tile border, primary button, inline email link | Vaayu teal #0F5468 (`--teal-700`) |
| Primary button hover | #0B4050 (`--teal-800`) |
| Link hover | Copper #96502A |
| Field border (default) | #A4A9AC |
| Hairline rules | #CDD1D2 (within sections), #15202A (section-defining) |
| Error | `--state-error` #9C3A26 (text, borders, summary) |
| Focus ring | 2px solid cerulean #2E8FB5, offset 3px |
| Placeholder photo fill | Mat #F0F2F1 |

Radii: 0 for buttons and sections; 2px for inputs and inquiry tiles. No shadows anywhere on this page.

## 4. Typography
| Role | Family | Size | Line height | Tracking | Case |
|---|---|---|---|---|---|
| Eyebrows ("Contact", "Trade & commission inquiries") | Marcellus | 12px (desktop), 11px (mobile) | — | .22em | Upper |
| H1 "Write to Ranjeeta." | Marcellus 400 | clamp(48px, 6vw, 100px); 44px mobile | 1 | 0 | Sentence |
| Opening intro | Mulish | clamp(19px, 1.5vw, 22px); 17px mobile | 1.55 | 0 | Sentence |
| Contact labels (Email, Phone) | Marcellus | 11px; 10px mobile | — | .2em | Upper |
| Contact values | Marcellus | clamp(20px, 1.7vw, 26px); 19px mobile | 1.25 | 0 | As written |
| Band statement | Marcellus | clamp(28px, 2.8vw, 44px); 25px mobile | 1.18 (1.22 mobile) | 0 | Sentence |
| Band quote | Mulish italic | 19px; 17px mobile | 1.6 | 0 | Sentence |
| H2 "Send a message" | Marcellus | clamp(32px, 3.2vw, 48px); 28px mobile | 1.12 | 0 | Sentence |
| Form intro | Mulish | 17px | 1.6 | 0 | Sentence |
| Legend | Marcellus | 12px | — | .2em | Upper |
| Tile labels, field labels | Mulish | 16px / 15px | 1.3 | 0 | Sentence |
| Input text | Mulish | 17px (prevents iOS zoom) | 1.6 (textarea) | 0 | — |
| Inline errors, hint | Mulish | 14px | — | 0 | Sentence |
| Primary buttons | Marcellus | 13px | — | .18em | Upper |
| Secondary text buttons / label links | Marcellus | 12px | — | .16em | Upper |
| Success heading | Marcellus | 30px; 24px mobile | 1.2 | 0 | Sentence |
| Continue line | Marcellus | clamp(22px, 2vw, 28px) | — | 0 | Sentence |

## 5. Layout constants
- Shell: `max-width: 1560px; margin: 0 auto; padding-inline: clamp(20px, 3.4vw, 56px)`.
- Grid: 12 columns, `minmax(0,1fr)`, column gap `clamp(16px, 2vw, 32px)`.
- Mobile gutters: 20px (the band's CTA area also uses 20px; the closing area on other pages uses 24px).

## 6. Desktop (≥ 990px), section by section

### 6.1 Opening
- Padding: `clamp(72px, 8vw, 128px)` top, `clamp(72px, 8vw, 120px)` bottom.
- Grid row gap 48px, `align-items: end`.
- **Columns 1–7** (gap 24px): eyebrow; H1; intro (max-width 30em).
- **Columns 9–12:** the direct-contact block.
  - 1px ink top rule.
  - Two rows (Email, Phone), each padded 20px 0 with a 1px #CDD1D2 bottom rule.
  - Each row: label above value, gap 6px.
  - Email: `mailto:ranjeeta.shroff@gmail.com`. Phone: `tel:+14698500196` (link on all breakpoints).
  - Hover: copper.

### 6.2 Trade & commission inquiries (`#commissions`)
- Padding `clamp(80px, 9vw, 144px)`. Row gap 48px.
- **Columns 1–6** (gap 24px):
  1. H2, set as the teal eyebrow "Trade & commission inquiries".
  2. Statement: "For trade and commission inquiries, contact me at **ranjeeta.shroff@gmail.com** or fill out the contact form."
     - The email is an inline teal link: 1px underline, offset 6px, copper on hover, `overflow-wrap: anywhere`.
     - `text-wrap: balance`.
  3. Quote, a blockquote: "I have been blessed to do a lot of commission paintings since I started doing abstract paintings in fluid form."
     - Max 32em, margin-top 8px, padding-top 20px, 1px #A4A9AC top rule.
  4. Actions row (margin-top 8px, flex wrap, gap 16px 32px):
     - **Primary:** "Start a commission inquiry" (52px high, padding 0 28px).
     - **Secondary:** "Trade or designer inquiry", a text button (44px high, 1px ink bottom border, copper on hover).
- **Columns 8–12:** the optional commission photos. A 2-column grid with a 16px gap:
  - photo 1 spans both columns at 3:2;
  - photos 2 and 3 are 4:5 each.

### 6.3 Send a message (`#message`)
- Padding: `clamp(88px, 10vw, 160px)` top, `clamp(96px, 11vw, 176px)` bottom. Gap 40px.
- **Columns 1–4** (gap 16px): H2 "Send a message"; intro "Choose what your message is about, and it will reach Ranjeeta with your words." (max 22em).
- **Columns 6–12:** the form, `max-width: 720px` (see §9).

### 6.4 Continue strip
- 1px #CDD1D2 top rule. Padding `clamp(48px, 5vw, 72px)`.
- Flex, space-between, wrap, gap 20px.
- Left: "Not ready to write yet?". Right: "Explore the originals" label link with an arrow (the existing label-link snippet).

## 7. Commission photos (optional)
- These are photographs of finished commissions in clients' spaces, so `object-fit: cover` is acceptable here. The artwork-presentation contain rule doesn't apply.
- **No approved photos exist yet.** The grey boxes in the screenshots are placeholders.

| Photos | Desktop layout | Mobile layout |
|---|---|---|
| 0 | Remove the photo column. The text stays in columns 1–6; nothing goes in its place | Not shown |
| 1 | A single 3:2 image in columns 8–12 | One 4:5, full width |
| 2 | Two 4:5 images side by side in columns 8–12 | Two 4:5 side by side (gap 10px) |
| 3 | 3:2 over two 4:5 (as designed) | Photos 1 and 2 as two 4:5 side by side. **Needs implementation judgment:** whether photo 3 is shown on mobile; the design shows two |

Each photo needs descriptive alt text, for example "Commissioned painting above a sofa in a client's living room".

## 8. Tablet (750–989px) and mobile (≤ 749px)
**Tablet** (see `contact-tablet-*`, 924px): the desktop composition is kept, and the clamp values do the scaling. Checks:
- The opening intro and contact block stay side by side.
- The inquiry tiles stay 2×2.
- Longer labels ("Trade / interior designer inquiry") wrap onto two lines inside their tile. That's accepted.

At **under about 860px** (**Needs implementation judgment**):
- stack the opening contact block under the H1 (full width);
- the band photos move below the text, full width;
- keep the form in a single column, columns 1–12, max 720px.

**Mobile** (`contact-mobile-*`): recomposed into one column with 20px gutters.

1. **Opening** (padding 36px 20px 40px, gap 16px):
   - eyebrow; H1 44px; intro 17px;
   - then the contact rows, under a 1px ink top rule. Each row is a **full-width link**, min-height 64px, with the label above the value:
     - "Email" → `mailto:`;
     - "Phone · tap to call" → `tel:`.
2. **Band** (padding 44px 20px 48px, gap 18px): eyebrow; statement 25px; quote 17px; the photos (2 × 4:5); a **full-width** primary button (52px); the trade text button (44px, underlined).
3. **Form** (padding 44px 20px 56px):
   - H2 28px;
   - the form in compact mode: tiles stacked one per row, fields full width, optional fields stacked;
   - a full-width submit button.
4. Footer (compact). The Continue strip is not on mobile, as in the design.

Touch targets:
- contact rows 64px;
- tiles 52px;
- inputs 48px;
- buttons 52px (primary) / 44px (text).

No horizontal overflow at 320px. Long email addresses wrap (`overflow-wrap: anywhere`).

## 9. Form specification
### 9.1 One form, native Shopify
- Use `{% form 'contact' %}`. No app is needed.
- Shopify emails every `contact[...]` field to the store's notification address, so **the selected inquiry type and any optional fields arrive in Ranjeeta's email automatically**.
- The form uses `novalidate` and custom messages (§9.4).

### 9.2 Field order and markup
1. **Error summary** (only after a failed submit).
2. **Inquiry type:**
   - a `<fieldset>` with the `<legend>` "What is your message about?";
   - four native radios named `contact[Inquiry type]`, values = the visible labels;
   - tiles in a 2×2 grid on desktop and tablet, stacked on mobile;
   - tile spec: min-height 52px, padding 12px 16px, 1px border, 2px radius, gap 12px;
   - native radio 18px with `accent-color: #0F5468`;
   - selected tile: border #0F5468, background #EEF4F5. Unselected: border #A4A9AC, background #FFF. Hover: border ink;
   - the whole tile is the label, so the whole tile is clickable.
3. **Name and Email:**
   - two columns on desktop (gap 20px), stacked on mobile;
   - label above each field (gap 8px);
   - input 48px high, padding 0 14px, 1px #A4A9AC, radius 2px.
4. **Optional, type-specific fields:**
   - in a row under a 1px #CDD1D2 top rule (padding-top 20px);
   - two columns on desktop, stacked on mobile;
   - the label ends in "(optional)" in #565C61.
5. **Message:** a textarea, 6 rows, min-height 160px, padding 12px 14px, resizable vertically only.
6. **Send-failure notice** (only in that state).
7. **Submit row:**
   - button "Send message", min-height 52px, padding 0 32px, teal, hover #0B4050; full width on mobile;
   - hint text "Name, email and message are needed." (14px #565C61);
   - flex wrap, gap 16px 24px.

### 9.3 Inquiry types: fields

| Inquiry type (radio value) | Visible fields | Required | Optional, conditional | Submitted names |
|---|---|---|---|---|
| **General inquiry** (default) | Type, Name, Email, Message | Name, Email, Message | None | `contact[Inquiry type]`, `contact[name]`, `contact[email]`, `contact[body]` |
| **Artwork inquiry** | Type, Name, Email, Artwork name, Message | Name, Email, Message | **Artwork name** (one field, single column) | plus `contact[Artwork]` |
| **Commission inquiry** | Type, Name, Email, 2 optional fields, Message | Name, Email, Message | **Approximate size or wall space**; **Colours or mood you have in mind** | plus `contact[Size or space]`, `contact[Colours or mood]` |
| **Trade / interior designer inquiry** | Type, Name, Email, 2 optional fields, Message | Name, Email, Message | **Company or studio**; **Project or location** | plus `contact[Company]`, `contact[Project]` |

Notes:
- Labels in the design are "Trade / interior designer inquiry" (your brief calls it "Trade inquiry"). The approved tile order is: General, Artwork, Commission, Trade.
- Optional fields appear only for their type. **Hidden optional fields must be `disabled`** so they don't submit empty values from another type.
- Values typed into an optional field are kept if the visitor switches type and comes back (the prototype keeps them in state).
- **Without JS:** show every optional field, grouped under small headings, so the form still works. **Needs implementation judgment** on exactly how.

### 9.4 Validation
- Validation runs **on submit**, not on blur.
- After the first failed submit, errors **re-validate as the visitor types** and clear as each field becomes valid.

| Field | Rule | Message |
|---|---|---|
| Name | Not empty (trimmed) | "Please enter your name." |
| Email | Not empty | "Please enter your email address." |
| Email | Matches `^[^\s@]+@[^\s@]+\.[^\s@]+$` | "Please enter an email address like name@example.com." |
| Message | Not empty (trimmed) | "Please write a short message." |
| Inquiry type | Always has a value (default General) | — |
| Optional fields | None | — |

The messages above are proposed copy and need approval (§13).

### 9.5 States
| State | Visual | Behaviour | Screenshot |
|---|---|---|---|
| **Default** | General selected; white fields with #A4A9AC borders | — | `contact-desktop-03`, `contact-mobile-05` |
| **Type preselected** (from the band buttons or URL) | Chosen tile selected; its optional fields shown | Smooth-scroll to the form (24px offset; instant under reduced motion); **focus the checked radio** after scrolling | `contact-state-desktop-02/03`, `contact-state-mobile-01/03` |
| **Client validation errors** | Summary box above the type: 1px `--state-error` border, padding 16px 18px. Title "Please check N fields" (Marcellus 15px). A list of links, one per error, each focusing its field. Error fields get a 1px `--state-error` border, with the inline message beneath (14px) | The summary has `role="alert"` and `tabindex="-1"` and **receives focus**. Fields get `aria-invalid="true"` and `aria-describedby` pointing to the message. **All typed values are kept** | `contact-state-desktop-01/05`, `contact-state-mobile-02` |
| **Server error** (`form.errors`) | Same summary and inline pattern | Map Shopify's error keys to the same messages where possible. **Every value is re-rendered**, including the inquiry type and optional fields | (same as above) |
| **Send failure** (network or unknown) | Notice above the submit button: 1px `--state-error` border, padding 14px 16px, `role="alert"`. Text: "Your message couldn't be sent. Everything you wrote is still here. Please try again, or email ranjeeta.shroff@gmail.com." (email linked) | Values kept | Not captured: set `formState: "sendError"` in the reference |
| **Success** (`form.posted_successfully?`) | The form is replaced by a panel with a 1px ink top rule: eyebrow "Message sent" (teal); "Thank you. Your message has been sent to Ranjeeta." (Marcellus 30px; 24px mobile); "A copy of what you wrote is below."; then a `dl` with Inquiry (the type) and From (name · email); then a "Send another message" text button | The panel has `role="status"` and `tabindex="-1"` and **receives focus**. Scroll so it's in view (with Shopify's post-redirect, anchor to `#message`). No response-time promise | `contact-state-desktop-06` |

**Implementation note (required):** Shopify's contact form posts and reloads the page. To preserve values and return the visitor to the form:
- set the form's `action` or a `return_to` so the page reloads at `#message`;
- render field values from `form.*` / the submitted params.

### 9.6 Preselecting the type
- **On the page:** "Start a commission inquiry" selects **Commission inquiry**, and "Trade or designer inquiry" selects **Trade / interior designer inquiry**. Both then scroll and focus as above.
- If the success panel is showing, a preselect returns the visitor to the form.
- **From other pages:** support `/pages/contact?type=commission#message`. Accepted values: `general`, `artwork`, `commission`, `trade`. Apply the value on load before the first paint, so the tile doesn't flash.
- **Optional:** `&artwork={title}` prefills "Artwork name" for a future PDP "Ask about this painting" link. Not required for launch.
- Links to update elsewhere: About ("Commission a painting"), the header dropdown, and the footer. See `Scope Cleanup - Obsolete Links.md` from the earlier package.

## 10. Interactions and motion
| Element | Hover | Focus | Press |
|---|---|---|---|
| Contact values and inline links | Copper | Cerulean ring | — |
| Primary buttons | #0B4050 | Cerulean ring | No shrink |
| Text buttons | Copper text and border | Cerulean ring | — |
| Tiles | Ink border | Ring on the radio | — |
| Inputs | — | Cerulean ring, offset 3px | — |

- Motion: only the smooth scroll to the form, honouring `prefers-reduced-motion` (instant).
- No entrance animation, no transitions on the form.

## 11. Accessibility
- One H1 ("Write to Ranjeeta."). H2s: the band eyebrow, "Send a message".
- The form is labelled by its H2 (`aria-labelledby`).
- The inquiry type is a fieldset with a legend and native radios: arrow keys move between options, as standard.
- Every field has a visible `<label for>`. "(optional)" is part of the label text.
- Errors never rely on colour alone: each has text, appears in the summary, and sets `aria-invalid`.
- Focus moves to the summary on error, and to the success panel on success.
- `autocomplete="name"` and `"email"`; `type="email"`.
- Body text contrast ≥ 4.5:1 on both gesso and vaayu mist, using the tokens above.
- Spam: rely on Shopify's built-in contact-form bot protection. Don't add a CAPTCHA unless spam becomes a problem.

## 12. Shopify: what Ranjeeta can edit
**Required behaviour:** she can change all copy, contact details, button labels, inquiry-type labels and photos without code. The field `name` attributes and validation are developer constants.

**Suggested implementation:** template `page.contact.json` with three focused sections. There's no metafield or metaobject; nothing here justifies one.

| Section | Theme Editor settings | Notes |
|---|---|---|
| `contact-opening` | Eyebrow (text), Heading (text), Intro (richtext; optionally fall back to `page.content`), Email (text), Phone (text), Phone label on mobile (text, default "Phone · tap to call") | Links are generated: `mailto:` from Email, and `tel:` from Phone with non-digits stripped and +1 prefixed. **Needs implementation judgment** for non-US numbers |
| `contact-commissions` | Heading label, Statement (richtext, so the email can be linked), Quote (textarea), Primary button label, Secondary button label, blocks `photo` (image_picker + alt, max 3) | The layout adapts to 0–3 photo blocks (§7). Section anchor `commissions` |
| `contact-form` | Heading, Intro, 4 inquiry-type labels (text), optional-field labels (text), Submit label, Hint text, Success heading and line, Error summary title | Field names fixed in code. Section anchor `message`. Small JS module (≈ 2–3 KB): show/hide and disable optional fields, the URL preselect, scroll and focus, client validation |
| Continue strip | Line (text), Link label and URL | Can be a setting on `contact-form` or a tiny section |

Shared snippets to reuse: label-link (Continue, the trade button style), icon (arrow), and the existing button styles.

## 13. Content status
| Content | Status |
|---|---|
| Email ranjeeta.shroff@gmail.com, phone 469-850-0196 | **Verified** (current site; phone publication approved) |
| Opening intro "Please provide your contact information and share your questions or details for commission order below." | **Verified,** from the current site |
| Commission quote "I have been blessed…" | **Verified,** from the current site |
| Trade statement | **Ranjeeta's own feedback,** lightly punctuated. Confirm |
| "Write to Ranjeeta.", the form intro, "Not ready to write yet?", the error messages, the success and send-failure text, the optional-field labels | **Proposed design copy.** Needs approval |
| Commission photos | **Unavailable,** optional |
| Response times, pricing, availability, process, trade discounts | **Intentionally not stated.** Don't add |

## 14. Acceptance checklist
**Layout**
- [ ] Section order is Opening → Commission band → Form → Continue (desktop) → Footer, on all breakpoints.
- [ ] Desktop: H1 in columns 1–7, contact block in 9–12; band text in 1–6, photos in 8–12; form heading in 1–4, form in 6–12 (max 720px).
- [ ] With no photos, the band shows no empty boxes and no photo column.
- [ ] Mobile: email and phone are full-width 64px links; the band button is full width; tiles are stacked; no horizontal overflow at 320px.
- [ ] No portrait, no artwork, no shadows, no rounded buttons.

**Form**
- [ ] One native `{% form 'contact' %}`.
- [ ] Each inquiry type shows exactly the fields in §9.3. Hidden optional fields are disabled.
- [ ] A test submission for each type delivers an email that includes `Inquiry type` and any optional values.
- [ ] Empty submit: focused summary, 3 linked errors, inline messages, red borders, values kept.
- [ ] Invalid email: the single specific message. Other values kept.
- [ ] After a server round trip (Shopify errors), every value and the selected type are still there.
- [ ] Success replaces the form, receives focus, and shows the type and sender.
- [ ] "Start a commission inquiry" selects Commission, scrolls, and focuses the radio. The trade button does the same for Trade.
- [ ] `/pages/contact?type=commission#message` arrives with Commission selected.

**Accessibility**
- [ ] The whole form can be completed by keyboard alone. Arrow keys move between inquiry types.
- [ ] Focus ring visible on every interactive element.
- [ ] Screen reader: the legend is announced with the radios; errors are announced; success is announced.
- [ ] Reduced motion: the scroll is instant.

**Theme Editor**
- [ ] Ranjeeta can edit every visible string, the email and phone, and add or remove up to 3 photos, without code.

## 15. Screenshot notes
- Desktop screenshots were captured at about 1540px by rendering the 924px preview at 60% zoom. The tablet set is the same page at 924px.
- At 924px the existing global header overlaps its icons. That's the header's own breakpoint, outside this scope.
- The mobile screenshots include the phone frame and the review notes, which aren't part of the page.
- In the mobile screenshots, the inquiry-tile labels appear to wrap ("General / inquiry"). That's a capture artefact. Live, they're single-line (measured).
- The grey photo boxes are placeholders.
- The footer's "News" and "Commissions" links are obsolete (scope cleanup).
