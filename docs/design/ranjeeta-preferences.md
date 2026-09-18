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

### Direction for Zita

Ranjeeta uses a significant amount of blue in her artwork.

The likely direction is therefore a palette derived from Zita's artwork, potentially using:

- deep blue/navy
- softer blue tones
- pale blue-gray or blue-tinted neutrals
- complementary warm neutrals where appropriate

Final colors have not yet been selected.

The palette should feel sophisticated and artistic while maintaining strong accessibility contrast.

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

1. the artwork is shown cleanly at a consistent/fixed presentation size
2. a secondary image shows the artwork displayed on a wall or in a room
3. desktop hover reveals the room/context image

She specifically noticed and liked this behavior on Dimitra Milan's site.

Ranjeeta is already using room/context photography for some of her existing products.

### Likely Zita requirement

Where appropriate, product media should follow a consistent convention such as:

- primary image: clean artwork presentation
- secondary image: artwork displayed in a room/interior
- additional images: detail, texture, side/profile, framing, scale, etc.

Desktop product cards may use primary-image → room-view hover behavior.

Mobile must have an equivalent solution because hover is unavailable.

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

Rinske Douna's use of named series/collections is potentially relevant.

Need to confirm how Ranjeeta currently organizes her work and whether her artistic practice naturally uses series.

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

### Faceted filtering

Ranjeeta particularly likes Dimitra Milan's easily visible filtering experience.

Shopify's native Search & Discovery functionality should be investigated first before considering a third-party filtering app.

Potential useful filters may include:

- availability
- price
- medium
- size
- orientation
- collection / series
- potentially other artwork-specific attributes

The final filter set must be based on Zita's actual product taxonomy rather than copied from either reference site.

### Open question

Ranjeeta is deciding whether she prefers:

- Rinske's product listing presentation
- Dimitra's product listing presentation

Questions still pending:

- Does she prefer visible filters or a collapsed/hidden filter interface?
- Does she prefer a 2-column or 3-column desktop artwork layout?

We should also explore a third, Zita-specific collection layout rather than limiting the decision to the two reference sites.

---

## 9. Product Detail Pages

Ranjeeta wants Zita's product-detail experience to move closer to the polished artwork presentation found on Dimitra Milan and Rinske Douna.

However, we should improve on both reference sites where possible.

Potentially separate Shopify templates should be explored for:

- Original Artwork
- Prints

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

### Desired direction

The page should feel more personal and inviting than the current Zita contact page.

Possible elements to explore:

- a warm personal invitation to contact her
- email
- phone
- simple form
- potentially a photograph of Ranjeeta or studio
- clear response expectation
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

### Dimitra Milan — strongest likes

- overall high-end/gallery feeling
- layered background colors rather than all-white pages
- red announcement / white navigation / light blush page layering concept
- Tenor Sans + Alegreya typography
- artistic About page
- visible collection filtering
- collection/product presentation
- artwork → room-view hover imagery
- simple Contact page
- simple policy-page layout
- prominent newsletter signup

### Rinske Douna — strongest likes

- simple readable logo/wordmark
- artwork/room presentation
- multiple non-white background tones
- newsletter visibility
- News/Blog functionality
- clean visual restraint

Still awaiting Ranjeeta's final preference regarding Rinske versus Dimitra collection/product listing treatment.

---

## 17. Design Principles Emerging From Feedback

These are hypotheses derived from Ranjeeta's feedback and should be validated during design exploration.

### Likely direction

- artwork should dominate
- the interface should be visually quiet
- white should not be the only background
- blue should probably become the primary family for Zita's identity
- typography should carry a substantial part of the luxury/high-end feeling
- layout should use generous spacing
- product photography should consistently include room/context imagery
- navigation should be direct
- collection discovery should be easy
- storytelling pages should be visually composed
- utility pages can remain simple
- newsletter capture should be visible but tasteful
- commerce should remain obvious without dominating the art

---

## 18. Open Questions for Ranjeeta

### Collection pages

- Dimitra or Rinske collection layout — which feels better?
- Visible filters or hidden/collapsible filters?
- Two or three artwork columns on desktop?
- Would she like a third, more editorial/asymmetric Zita-specific option?

### Artistic practice

- Does she work in clearly named series?
- What artwork aspect ratios are most common?
- How much written story is she willing to provide for individual originals?
- Which physical details are consistently available for each artwork?

### Products

- What print production/fulfillment process is currently used?
- Which framing or finish options exist?
- Which originals also have print editions?
- Should sold originals remain visible?

### Brand

- Does she prefer the emotional feel of:
  - Dimitra's warm gallery
  - Rinske's calm studio
  - or a combination interpreted through Zita's blue palette?

### Newsletter

- What does she want subscribers to receive?
- How frequently does she realistically expect to communicate?

### News / Press

- Is the primary purpose press coverage, studio/news updates, or both?

### Exhibitions

- How many upcoming/past exhibitions need to be represented?
- What information and imagery does she normally have for each exhibition?