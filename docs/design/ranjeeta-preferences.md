# Ranjeeta — Design & Storefront Preferences

**Project:** Zita's Art Studio Shopify Redesign  
**Status:** Living document  
**Purpose:** Record Ranjeeta's explicit preferences, dislikes, requirements, and open questions so they remain separate from reference-site research and implementation decisions.

> This document records stakeholder preferences, not final design decisions.
> Some items may later be Adopted, Adapted, or reconsidered after prototyping and technical review.

---

## 1. Overall Direction

Ranjeeta feels the current Zita's Art Studio website looks too basic compared with reference sites such as Dimitra Milan and Rinske Douna.

She wants the redesigned storefront to feel:

- more high-end
- more artistic
- more intentional
- less like a standard Shopify store
- less dominated by plain white backgrounds
- more spacious and visually balanced
- more focused on the artwork

The site should still remain easy to shop and easy for Ranjeeta to manage.

### Primary emotional objective

**Confirmed preference (September 2026):** If Ranjeeta must choose one primary feeling for the site, it is **Inspired**.

Other qualities discussed — calm, curious, reflective, energized, transported, intimate, sophisticated, welcoming, bold and peaceful — can all be relevant, but **Inspired** is the primary emotional objective.

### Atmospheric reference

**Confirmed preference (September 2026):** Ranjeeta prefers the overall **feeling of Dimitra Milan** over Rinske Douna: *"I really like the feeling of Dimitra, it is way more appealing."*

This is an atmospheric/emotional reference preference, not a request to copy Dimitra's palette or layouts wholesale.

### Platform constraint

Ranjeeta currently uses Shopify's Basic plan.

The redesigned storefront should be fully usable on Shopify Basic.

Do not make the design dependent on upgrading to a more expensive Shopify plan.

Prefer:

1. native Shopify capabilities
2. custom theme development
3. free first-party Shopify functionality
4. third-party apps only when they provide meaningful functionality we cannot reasonably achieve otherwise

---

## 2. Color & Visual Atmosphere

### Confirmed preference

Ranjeeta dislikes the large amount of plain white background currently used on Zita's website.

She likes the way both reference sites use multiple background tones to create depth and separation between areas of the page.

### Dimitra Milan reference

She specifically likes the visual layering created by:

- strong red announcement bar
- white/light navigation area
- light red/blush page background below

She likes the feeling this creates but does **not** want Zita to simply use Dimitra's red palette.

### Rinske Douna reference

She also likes Rinske's use of green, beige, and related neutral shades rather than continuous white backgrounds.

### Brand-reference artwork

**Confirmed preference (September 2026):** Ranjeeta selected **Vaayu - Air** as the best representation of how she wants the website to feel:

https://www.zitasartstudio.com/products/perfect-storm?variant=37178945798331

### Direction for Zita

**Confirmed preference (September 2026):** Ranjeeta does **not** want Dimitra's color palette. She specifically suggested a nature-inspired **teal** direction: *"we can use a different palette, like Teal as that will go with my nature inspired art."*

**Design interpretation / hypothesis:** The palette should be derived from Ranjeeta's artwork and nature-inspired identity. Teal is a strong candidate. Blue, teal, blue-grey, and warm sand/copper/gold neutrals may still be explored because they arise from her work — but the direction is no longer "blue-only."

**Still pending:** Exact final colors are not selected and should be confirmed after artwork sampling during the design brief/prototype phase.

The palette should feel sophisticated and artistic while maintaining strong accessibility contrast.

### Dark tonal sections

**Confirmed preference (September 2026):** *"It will be harder to work with a dark palette, but I'm open to it if it looks good."*

Therefore:

- dark/navy/indigo/teal sections are allowed for design exploration
- a predominantly dark website is **not** a confirmed requirement
- final use should depend on whether it works visually with the artwork

**Still pending:** Exact amount and location of dark tonal sections.

---

## 3. Typography

Ranjeeta strongly likes the typography used on Dimitra Milan's storefront.

Observed fonts:

- **Tenor Sans** for many headings/titles
- **Alegreya** for much of the body copy

Ranjeeta is comfortable potentially using the same fonts for Zita's Art Studio if they work with the final identity and licensing/loading is appropriate.

These should currently be treated as strong design candidates rather than locked final decisions.

Typography should contribute substantially to the high-end/gallery feeling of the storefront.

---

## 4. Logo / Wordmark

Ranjeeta likes the simple, highly readable logo/wordmark treatment used in the top-left area of both Dimitra Milan and Rinske Douna.

Zita's Art Studio should explore a similarly simple and elegant logo or wordmark.

Desired qualities:

- easy to read
- minimal
- sophisticated
- works well in the site header
- does not compete with artwork
- suitable for desktop and mobile
- potentially typography-led rather than symbol-heavy

The logo should eventually be explored during the brand-design phase, potentially with Claude Design or another design tool.

No final logo direction has been approved yet.

---

## 5. Artwork & Product Image Presentation

This is an important preference.

Ranjeeta likes product imagery where:

1. the artwork is shown cleanly within a consistent presentation frame/canvas (without cropping away meaningful artwork)
2. a secondary image shows the artwork displayed on a wall or in a room
3. desktop hover reveals the room/context image

She specifically noticed and liked this behavior on Dimitra Milan's site.

**Confirmed preference (September 2026):** Room/context photography **already exists for many products**, particularly in [Walking the Trail](https://www.zitasartstudio.com/collections/walking-the-trail). Do not treat room photography as missing across the catalogue.

**Confirmed problem (September 2026):** Ranjeeta specifically identified **inconsistent source-image aspect ratios** as a current problem the redesign must address.

### Likely Zita requirement

Where appropriate, product media should follow a consistent convention such as:

- primary image: clean artwork presentation
- secondary image: artwork displayed in a room/interior
- additional images: detail, texture, side/profile, framing, scale, etc.

Desktop product cards may use primary-image → room-view hover behavior.

Mobile must have an equivalent solution because hover is unavailable.

**Design interpretation / hypothesis:** Consistency should not require cropping away meaningful artwork. Explore a consistent presentation frame/canvas while preserving the complete artwork using techniques such as contain-style presentation.

---

## 6. Homepage

Ranjeeta wants the homepage to feel more curated and artistic than the current site.

### Shop by Collection

She likes the concept of a visually prominent **Shop by Collection** area on the homepage.

Visitors should be able to enter collections directly rather than being forced through an unnecessary collection landing page.

The exact design of this area is still open.

It should not automatically be assumed that Zita should copy Dimitra's conventional collection-tile layout.

A more bespoke/artistic treatment should be explored.

---

## 7. Navigation & Collections

Ranjeeta agrees that the current standalone collection landing page is unnecessary.

Preferred direction:

- expose collection names through navigation/dropdowns
- allow visitors to go directly to actual collection/product listing pages
- feature key collections prominently on the homepage

Reference behavior from Dimitra and Rinske should inform this, but Zita's final information architecture should be based on her actual collection structure.

### Series / collections

**Confirmed preference (September 2026):** Ranjeeta genuinely works in series. **Walking the Trail** remains an active series she is still creating work for. She also has newer series that are not yet substantial enough to feature prominently.

**Confirmed preference:** Only approximately **2–3 active series** should be foregrounded on the website at a time. Older/current series such as BlackWhiteandGrey or Elements may later be swapped out for newer bodies of work as her practice evolves.

**Confirmed preference:** The numeric prefixes in existing collection names (`1.`, `2.`, `3.`, `4.`) are **not** part of her desired collection names. They exist only because she did not know another way to control Shopify collection ordering and did not want them alphabetized.

**Design interpretation / hypothesis:** Future Shopify architecture/navigation should control ordering without polluting public collection titles. Final collection/series ordering should be owner-manageable where practical.

---

## 8. Collection / Product Listing Pages

Ranjeeta likes the collection browsing experiences on the reference sites and wants Zita's current listing pages substantially improved.

Important areas:

- artwork scale
- spacing
- visual polish
- room-view hover imagery
- filtering
- sorting
- number of columns
- product-card information

### PLP preference — resolved (September 2026)

**Confirmed preference:** Ranjeeta prefers **Rinske Douna's artwork-first PLP approach** over Dimitra Milan's persistent-filter-sidebar layout.

She wants:

- artwork to get most of the browser width
- approximately **3 artwork columns on desktop** (preferred baseline, not a rigid rule across every viewport or composition)
- filters accessed through a **Filter & Sort** control instead of permanently occupying a left sidebar
- a presentation that feels closer to a gallery than a dense ecommerce catalogue

This is Ranjeeta's explicit preference. The final Zita implementation does **not** need to literally copy Rinske's layout.

**Design interpretation / hypothesis:** Because Zita is expected to feature a relatively small catalogue and only 2–3 active series at a time, an artwork-first PLP with on-demand filters is likely more appropriate than permanently visible desktop facets. This should still be validated during prototype testing. A Zita-specific variation and responsive/editorial deviations remain open to exploration.

### Faceted filtering

Shopify's native Search & Discovery functionality should be investigated first before considering a third-party filtering app.

**Confirmed preference (September 2026):** On-demand/collapsed filters are preferred over a permanently visible sidebar. (This supersedes earlier notes of interest in Dimitra's easily visible filtering experience for the PLP context.)

Potential useful filters may include:

- availability
- price
- medium
- size
- orientation
- collection / series
- potentially other artwork-specific attributes

The final filter set must be based on Zita's actual product taxonomy rather than copied from either reference site.

---

## 9. Product Detail Pages

Ranjeeta wants Zita's product-detail experience to move closer to the polished artwork presentation found on Dimitra Milan and Rinske Douna.

However, we should improve on both reference sites where possible.

Potentially separate Shopify templates should be explored for:

- Original Artwork
- Prints

### Sold artwork

**Confirmed preference (September 2026):** Sold artworks should **remain visible** on the website.

Likely goals:

- preserve sold works as part of her artistic body of work / archive
- clearly distinguish them from currently purchasable work
- do not simply remove sold originals from the storefront experience

### Original artwork

Likely priorities:

- large artwork imagery
- room/context imagery
- details and texture
- dimensions
- medium
- year
- collection/series
- story behind the artwork
- framing / display information
- shipping information
- certificate/provenance where relevant
- clear purchase action
- enquiry/contact option where appropriate

### Prints

Likely priorities:

- multiple product images
- room/context imagery
- size options
- material
- frame/finish options
- variant availability
- production information
- shipping
- easy purchasing

### Original ↔ Print

If an original artwork also exists as a print, the two should ideally be linked to one another.

Neither reference site handles this especially well.

---

## 10. About Page

This is a major redesign priority.

Ranjeeta strongly dislikes the conventional About-page layout currently used on Zita's site:

> photograph on the left + biography text on the right

She wants the About page to feel artistic and immersive.

### Dimitra Milan

Ranjeeta particularly likes Dimitra's visually rich About experience.

Useful elements may include:

- large imagery
- varied section composition
- typography
- whitespace
- storytelling
- chapter-like structure
- different image scales
- more visual movement through the page

### Rinske Douna

Rinske's page is visually simple, but her story is structured effectively as chapters and specific moments.

Potential direction:

**Rinske's narrative structure + Dimitra's visual treatment + Ranjeeta's own story and artwork**

The final About page should feel like an artist-story experience rather than a corporate biography.

---

## 11. Contact Page

Ranjeeta likes the simplicity of Dimitra Milan's contact experience.

Zita should clearly provide:

- email address
- phone number

Ranjeeta does **not** want to provide a physical address.

She also wants to retain a contact form.

### Approved public business contact details

**Confirmed preference (September 2026):** Ranjeeta explicitly provided and approved these business contact details for use on the Contact page:

- **Email:** ranjeeta.shroff@gmail.com
- **Google Voice business phone:** 469-850-0196
- **Physical address:** do **not** publish one

These are approved **public business contact details**.

**Still pending:** Whether Ranjeeta wants a response-time promise on the Contact page. Do not invent one.

### Desired direction

The page should feel more personal and inviting than the current Zita contact page.

Possible elements to explore:

- a warm personal invitation to contact her
- email and phone (see approved details above)
- simple form
- potentially a photograph of Ranjeeta or studio
- optional reason-for-contact selector

The form should remain simple.

---

## 12. Newsletter

Ranjeeta likes that newsletter signup is consistently visible on both Dimitra Milan and Rinske Douna.

Newsletter signup should therefore be treated as a recurring storefront component rather than an afterthought.

Potential placements:

- homepage
- footer
- News / Press
- selected editorial/story pages

The presentation does not need to be identical in every location.

The copy should sound like Ranjeeta rather than generic ecommerce language such as "Subscribe to our newsletter."

---

## 13. News / Press

Ranjeeta wants a blog-style publishing feature similar to Rinske Douna's.

She would prefer to call this:

**News**
or
**Press**

rather than "Blog."

The first implementation approach to investigate is Shopify's native blog/article system rather than a third-party blogging app.

Potential content:

- press coverage
- interviews
- artist news
- studio updates
- announcements
- media features
- notable events
- behind-the-scenes stories where appropriate

The visual design should feel editorial rather than like a generic blog grid.

Ranjeeta should be able to manage normal articles through Shopify.

---

## 14. Exhibitions

Ranjeeta currently has an Exhibitions page but feels it is boring and visually flat.

**Confirmed preference (September 2026):** Exhibition history and recognition **can** be highlighted: *"we can highlight them in some way."*

This gives permission to surface:

- Curator's Choice recognition
- juried/international selections
- exhibitions
- other meaningful career milestones

**Design interpretation / hypothesis:** Credentials should not dominate the visual identity. Recognition should be integrated selectively and tastefully into Homepage / About / Exhibitions / relevant artwork contexts rather than turning the site into a résumé.

She wants a more compelling way to present:

- upcoming exhibitions
- current exhibitions
- past exhibitions

This should probably not simply duplicate the News / Press blog system.

Potential structured exhibition data:

- exhibition title
- venue
- city / country
- start date
- end date
- featured image
- description
- external/event link
- gallery imagery
- related artworks
- status: upcoming/current/past

A structured Shopify content model such as a metaobject should be investigated, provided it is fully compatible with Shopify Basic and appropriate for owner management.

Visual direction should feel closer to an artist CV + exhibition catalogue than a generic card grid.

Past exhibitions should remain visible as part of Ranjeeta's artistic history.

---

## 15. Policy / Utility Pages

Ranjeeta likes the simple presentation of policy pages on Dimitra Milan.

Zita needs normal utility/legal pages including:

- Shipping Policy
- Returns / Refund Policy
- Privacy Policy
- Terms of Service
- potentially FAQ and other relevant pages

These pages do not need elaborate artistic layouts.

Simple, highly readable presentation is acceptable and may help the more important artistic pages feel more distinctive.

### Important

Reference-site policy **layout/presentation** may inform Zita's design.

Reference-site policy **wording must not simply be copied**.

Zita's policy content must reflect Ranjeeta's actual business, fulfillment, shipping, returns, and legal situation.

---

## 16. Reference-Site Preference Summary

**Confirmed preference (September 2026):**

- **Dimitra Milan** — preferred overall **atmosphere / emotional reference**
- **Rinske Douna** — preferred **PLP / artwork-listing approach**

These are complementary reference roles, not a single-site template.

### Dimitra Milan — strongest likes

- overall high-end/gallery feeling *(preferred atmospheric reference)*
- layered background colors rather than all-white pages
- red announcement / white navigation / light blush page layering concept *(layering idea only — not Dimitra's palette)*
- Tenor Sans + Alegreya typography
- artistic About page
- artwork → room-view hover imagery
- simple Contact page
- simple policy-page layout
- prominent newsletter signup

### Rinske Douna — strongest likes

- artwork-first PLP / collection listing *(preferred PLP reference)*
- on-demand Filter & Sort rather than persistent sidebar
- approximately 3-column desktop artwork presentation
- simple readable logo/wordmark
- artwork/room presentation
- multiple non-white background tones
- newsletter visibility
- News/Blog functionality
- clean visual restraint

---

## 17. Design Principles Emerging From Feedback

These are hypotheses derived from Ranjeeta's feedback and should be validated during design exploration.

### Likely direction

- primary emotional outcome: **Inspired**
- nature-derived **teal** is a strong palette candidate (artwork-derived palette overall)
- Dimitra-like richness/layering without copying Dimitra's palette
- artwork should dominate
- the interface should be visually quiet
- white should not be the only background
- dark/navy/indigo/teal sections may be explored where they work with the artwork
- typography should carry a substantial part of the luxury/high-end feeling
- layout should use generous spacing
- artwork-first wide PLPs with on-demand filters
- roughly 3-column desktop baseline for collection pages
- product photography should include room/context imagery where available (many already exist)
- inconsistent source-image aspect ratios must be solved without destructive cropping
- navigation should be direct
- only 2–3 active series foregrounded at a time; series may rotate
- collection discovery should be easy
- sold works remain visible as artistic archive, clearly distinguished from purchasable work
- prints provide an accessible purchase path when originals are too expensive
- Instagram is an important ongoing relationship channel
- recognition/exhibitions can be surfaced selectively, not as a dominant CV
- storytelling pages should be visually composed
- utility pages can remain simple
- newsletter capture should be visible but tasteful
- commerce should remain easy and obvious without overwhelming the artistic experience

### Emerging visitor journey (design hypothesis)

Ranjeeta wants visitors to be able to:

- buy an original
- discover her work
- understand her story
- join her email list
- contact her about commissions
- follow exhibitions
- follow her on Instagram, where she posts frequently
- buy prints when an original is outside their budget

This should **not** be collapsed into a conventional single ecommerce conversion objective.

Proposed journey:

discover artwork → feel inspired → understand Ranjeeta / her practice → purchase an original OR consider a print → enquire about commissions where relevant → follow on Instagram / join the audience → return for future work and exhibitions

---

## 18. Open Questions for Ranjeeta

### Brand & visual direction

- Exact final palette after artwork sampling
- Exact amount and location of dark tonal sections
- Would she like a third, more editorial/asymmetric Zita-specific PLP option beyond the Rinske-inspired baseline?

### Artistic practice & metadata

- What artwork aspect ratios are most common?
- How much written story is she willing to provide for individual originals?
- Which physical details are consistently available for each artwork (year, dimensions, certificates, shipping information, etc.)?

### Products

- What print production/fulfillment process is currently used?
- Which framing or finish options exist?
- Which originals also have print editions?

### Newsletter

- What does she want subscribers to receive?
- How frequently does she realistically expect to communicate?

### News / Press

- Is the primary purpose press coverage, studio/news updates, or both?
- Exact naming/emphasis: **News** versus **Press**

### Exhibitions

- How many upcoming/past exhibitions need to be represented?
- What information and imagery does she normally have for each exhibition?

### Contact

- Does she want a response-time promise on the Contact page?

### Pending content (not open design preferences)

Ranjeeta said she will send these series write-ups in a day or two:

- Colored by Nature — series description
- BlackWhiteandGrey — series description
- Walking the Trail — series description

These are **pending content**, not unresolved design preferences.

---

## 19. Design Discovery Responses — September 2026

Compact dated record of the September 2026 feedback round.

| Topic | Response |
|---|---|
| Brand-reference artwork | Vaayu - Air (`/products/perfect-storm`) |
| Primary emotion | **Inspired** |
| Atmospheric reference | Dimitra Milan (overall feeling) |
| Palette direction | Nature-derived teal / artwork-derived (not Dimitra's palette) |
| Dark sections | Open to them if visually successful; not mandated |
| PLP preference | Rinske-style artwork-first |
| Desktop PLP | Approx. 3-column baseline |
| Filters | On-demand/collapsed preferred |
| Room images | Already exist for many products |
| Image-ratio inconsistency | Confirmed issue to solve |
| Sold artworks | Remain visible as artistic archive |
| Series | Yes; Walking the Trail active |
| Active series count | Approximately 2–3 at a time |
| Collection numeric prefixes | Unwanted Shopify-ordering workaround |
| Exhibitions/recognition | Okay to highlight selectively |
| Primary visitor outcomes | Discovery, originals, prints, commissions, newsletter, exhibitions, Instagram |
| Series write-ups | Pending |
| Contact email | ranjeeta.shroff@gmail.com |
| Contact phone | 469-850-0196 |
| Physical address | Do not publish |

### Still Pending From This Feedback Round

- Colored by Nature series description
- BlackWhiteandGrey series description
- Walking the Trail series description
- Any higher-resolution artwork files Ranjeeta chooses to provide

Existing Shopify imagery is sufficient for initial concept/prototype work; higher-resolution files are not blocking design work.