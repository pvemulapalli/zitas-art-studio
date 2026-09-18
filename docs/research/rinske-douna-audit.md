# Rinske Douna: Site Audit

| | |
|---|---|
| **Audit date** | 18 September 2026 |
| **Site URL** | https://www.rinskedouna.com/ (canonical: `https://rinskedouna.com/`) |
| **Platform** | Shopify (CONFIRMED). Shop ID `60947300516` |
| **Theme** | **Not reliably identifiable by name.** CONFIRMED: the storefront is built on Shopify's **Dawn** architecture (Dawn's exact design tokens, class vocabulary, breakpoints and section IDs). Whether it is stock Dawn or a Dawn-derived theme could not be established from public evidence |
| **Theme type** | Online Store 2.0, Dawn lineage, configured through the Theme Editor. No evidence of significant custom section development was found |
| **Confidence** | **High** on platform, Dawn lineage, IA, product data, collection and product page behaviour, and the specific defects listed. **Medium** on which sections are stock versus derivative. **Low** on fonts (not extractable), exact colour scheme values, app identities, and mobile rendering (inferred from Dawn's stylesheet, not visually verified) |
| **Method** | Live fetches of rendered pages; the theme stylesheet at `/cdn/shop/t/1/assets/base.css` and its source map; a second theme stylesheet at `/cdn/shop/t/14/assets/base.css`; `products.json` and `collections.json` endpoints; `sitemap.xml` and its children; and the Section Rendering API (`?section_id=`) used as a probe, with a bogus-ID control test to prove the probe is valid. No admin access, no JavaScript execution, no visual rendering |

> **Boundary.** Per the brief, general design, UX and technical patterns are fair game to adopt or adapt. Rinske Douna's artwork, photography, written content, branding and distinctive whole-page compositions are not. Section 15 separates those explicitly.

> **A note on tone.** The brief asked for evidence rather than a flattering review. The honest headline is that this is a **well-run, restrained, conventional Dawn storefront whose quality comes almost entirely from photography, product data and writing, not from custom layout or unusual technique.** There are real lessons here, and several of them are cautionary.

---

## 1. Platform and theme investigation

### 1.1 Shopify: CONFIRMED

Direct evidence:

- `meta-shopify-digital-wallet: /60947300516/digital_wallets/dialog`, which also exposes the shop ID
- `meta-shopify-s` and `meta-shopify-y` session meta tags
- Assets under `/cdn/shop/files/…` and `/cdn/shop/collections/…`
- Working `products.json`, `collections.json`, `/collections/<handle>/products.json` endpoints
- Shopify sitemap structure: `sitemap_products_1.xml`, `sitemap_pages_1.xml`, `sitemap_collections_1.xml`, `sitemap_blogs_1.xml`, plus `sitemap_agentic_discovery.xml` (a recent Shopify addition)
- "Powered by Shopify" in the footer
- Shopify Markets country and currency selector
- Native `/policies/…` routes linked from the footer

### 1.2 Theme: Dawn architecture CONFIRMED, exact name NOT identifiable

**What I could not do.** The shell in this environment is firewalled (a `curl` to the site returns `CONNECT tunnel failed, response 403`), web proxies are blocked, and the fetch tool converts HTML to Markdown, which strips `<script>`, `<link>` and `<style>`. The `Shopify.theme` object, which names the theme directly, lives in an inline script and was therefore unreachable. **I am not guessing a theme name.**

**What I could do.** I located the theme's stylesheet by probing asset slots, and I used the Section Rendering API as a structural probe.

**Evidence 1: the stylesheet at `/cdn/shop/t/1/assets/base.css` is Dawn.**

The filename alone (`base.css`) is the Dawn family convention. The contents are conclusive. Every one of these custom properties is verbatim Dawn:

```
--color-base-text            --page-width                  --duration-short: .1s
--color-base-background-1    --page-width-margin           --duration-default: .2s
--color-base-background-2    --spacing-sections-mobile     --duration-long: .5s
--color-base-accent-1        --spacing-sections-desktop    --font-body-scale
--color-base-accent-2        --grid-mobile-horizontal-spacing    --font-heading-scale
--color-base-solid-button-labels    --grid-desktop-vertical-spacing
--color-base-outline-button-labels  --media-radius        --buttons-radius-outset
--color-badge-background     --card-corner-radius          --badge-corner-radius
--color-card-hover           --inputs-radius               --popup-corner-radius
```

So is the class vocabulary: `.header-wrapper`, `.header__inline-menu`, `.menu-drawer`, `.product__media-gallery`, `.cart-count-bubble`, `.cart__dynamic-checkout-buttons`, `.predictive-search`, `details-disclosure`, `.disclosure-has-popup`, `.shopify-section-header-*`.

So are the breakpoints: **750px** and **990px**, with the `max-width: 749px` and `min-width: 750px and max-width: 989px` bands. Those are Dawn's exact values.

The file is minified with `/*# sourceMappingURL=/cdn/shop/t/1/assets/base.css.map */`. I fetched the map: its `sources` array contains only `["/cdn/shop/t/1/assets/base.css"]`, so **the minification is Shopify's own CDN pipeline, not a vendor build step.** That matters: minification here is not evidence of a commercial theme.

**Evidence 2: the live storefront renders Dawn's section IDs.**

The Section Rendering API renders from the **published** theme, so this tests the live site rather than a stored one. I validated the probe first: `?section_id=zzz-not-a-real-section-xyz` returns 404, so a successful render is meaningful.

| Probe | Result |
|---|---|
| `/products/wild-at-heart?section_id=main-product` | **Renders** the full product section |
| `/collections/prints?section_id=main-collection-product-grid` | **Renders** the full grid with facets and pagination |
| `/collections/prints?section_id=main-collection-banner` | **Renders** the collection banner |
| `?section_id=zzz-not-a-real-section-xyz` (control) | 404 |

`main-product`, `main-collection-product-grid` and `main-collection-banner` are Dawn's section type names and Dawn's JSON template keys.

**Evidence 3: the live UI strings match Dawn.** The collection page exposes "Filter and sort", "Clear all", "View (21)", the product page uses a quantity stepper with plus and minus controls and an "Add to cart" button, and the sort menu carries Dawn's exact option set (Featured, Best Selling, Alphabetically A-Z, Alphabetically Z-A, Price low to high, Price high to low, Date old to new, Date new to old).

**Evidence 4: a second, different theme exists in the store.** `/cdn/shop/t/14/assets/base.css` also resolves, but it is **not** Dawn. It is built on normalize.css v7.0.0 and uses a completely different token and class system: `--font--body`, `--font--title`, `--font--label`, `--color--brand`, `--color--label-discount`, `.c-btn`, `.o-layout`, `.o-ratio`, `.o-list-*`, with em-based breakpoints (`47.9375em`, `61.25em`, `67.49em`). That naming convention is ITCSS/BEMIT, used by several premium vendors. **I am not naming it.** It is almost certainly an unpublished or retired theme sitting in the store's theme library, since the live section IDs and UI strings are Dawn's.

### 1.3 Conclusion on the theme

**LIKELY:** the published theme is Dawn or a theme built directly on Dawn (which includes Shopify's own free family: Refresh, Craft, Sense, Studio, Ride, Publisher, Colorblock, Taste, Crave, Origin, Spotlight, all of which ship the same `base.css` tokens).

**Features observed that stock Dawn does not ship by default**, which is where a derivative or an app would explain the gap:

| Observed | Note |
|---|---|
| Breadcrumbs on the product page ("Home > Wild at heart") | Not in stock Dawn. Derivative theme, custom snippet, or app |
| Top utility bar with social icons and an email address above the announcement bars | Newer Dawn announcement-bar groups support some of this; a derivative is also plausible |
| Star ratings on product cards | Dawn renders the standard `reviews.rating` metafields only via an added block or app |
| "Spend $300 to get free shipping" progress message | Not stock Dawn |
| "Only 1 in stock" | Dawn's low-stock string is editable in the language editor, so this may simply be a merchant translation edit rather than a different theme |

### 1.4 Degree of customization: low

This is the most important finding in section 1. **I found no evidence of bespoke section development.** Specifically:

- No custom assets in the theme asset directory. On the Dimitra Milan audit, custom Liquid work announced itself through bespoke images served from `/cdn/shop/t/9/assets/`. Across the homepage, the prints collection, the originals collection, two product pages, the story page and the contact page, **not a single URL containing `/cdn/shop/t/` appeared.** Every image is merchant-uploaded content from `/cdn/shop/files/` or `/cdn/shop/collections/`.
- `/cdn/shop/t/1/assets/custom.css` returns 404.
- The homepage is a plain vertical stack of recognisable section types.
- The story page, contact page and commissions page all use the standard page template with no special composition.

**The site's quality is a configuration and content achievement, not an engineering one.** That is genuinely encouraging for our project, and it also sets the bar we should expect to clear easily.

### 1.5 Third-party apps and services

| Service | Status | Evidence |
|---|---|---|
| **A form builder app** | **CONFIRMED present, and broken** | `/pages/commissions` renders the literal string `{formbuilder:OTQ4MzI=}` as visible body text. The `{formbuilder:<base64 id>}` shortcode pattern is used by **Globo Form Builder** (LIKELY, by shortcode convention). The decoded ID is `94832` |
| **A review app** | **LIKELY** | Star ratings and review counts render on product cards on the homepage and collection pages. Nothing renders on the product detail pages. The standard mechanism is an app writing Shopify's `reviews.rating` and `reviews.rating_count` metafields, which the card template reads. **App identity: SPECULATIVE.** No vendor domain was observable |
| **Shopify Markets** | **CONFIRMED** | 200-plus country and currency selector, default United States (USD $) |
| **Meta and Google verification** | **CONFIRMED** | `facebook-domain-verification`, `google-site-verification` meta tags |
| **smartartcourses.com** | **CONFIRMED** | All course links leave the Shopify store for an external platform |
| **Free shipping progress** | **LIKELY app or derivative theme feature** | "Spend $300 to get free shipping" on product pages |
| **Payment providers** | **CONFIRMED** | American Express, Apple Pay, Bancontact, BLIK, Google Pay, iDEAL, Wero, Klarna, Maestro, Mastercard, MobilePay, PayPal, Shop Pay, Union Pay, Visa. A distinctly European and Dutch mix |
| Klaviyo, Judge.me, Yotpo, Loox, Okendo, page builders | **Not detected.** Absence of evidence only, given that scripts were unreachable | |

**Reading:** this is a light app stack. Newsletter capture appears to be Shopify-native. That is a good model for Zita.

---

## 2. Global design language

### 2.1 Overall impression

Calm, clean, Northern European, and deliberately quiet. White or near-white ground, generous air, large uncropped artwork, small restrained type, and almost no ornament. The emotional register is *studio* rather than *gallery*: approachable, personal, instructional. It reads more like a working artist's professional shopfront than like a luxury art dealer.

That is a meaningful distinction from Dimitra Milan, which reads as a warm curated gallery. Neither is better. They are aiming at different feelings, and Zita needs to pick one deliberately rather than inheriting whichever reference was looked at last.

### 2.2 Colour

**CONFIRMED value:** `meta-theme-color: #94b397`, a soft sage green. This is the single brand colour I can prove.

**NOT extractable:** the live colour scheme values. In Dawn these are written into an inline `<style>` block on `:root` from theme settings, which the fetch tool strips. So the page background, text colour and button colours are inferred, not observed. Visually the site reads as a white or very light ground with dark text, which would mean Dawn's defaults or close to them.

**Indicative contrast, computed:**

| Pair | Ratio | Verdict |
|---|---|---|
| Sage `#94b397` on white | **2.29:1** | Fails WCAG AA for text (4.5:1) and fails the 3:1 floor for large text and UI components |
| White on sage `#94b397` | **2.29:1** | Same failure |
| Sage `#94b397` on near-black `#121212` | 8.17:1 | Passes comfortably |
| Dawn default text `#121212` on white | 18.73:1 | Passes AAA |

**What this means.** If the sage is used only as browser chrome and as large decorative fills, there is no problem. If it is used for button backgrounds with white labels, for link text, or for small type on white, it is an accessibility failure. **This needs visual verification before we borrow the strategy.** It is a useful warning generally: soft, desaturated brand colours in the mid-luminance band are the easiest way to fail contrast without noticing, because they look tasteful.

For comparison, Dimitra Milan's warm palette hits 12.52:1 on body text. A quiet palette does not have to be a low-contrast one.

### 2.3 Typography

**Honest answer: the font families could not be identified.** Dawn declares `font-family: var(--font-body-family)` and `var(--font-heading-family)`, and the actual values are injected inline from theme settings. Nothing in the fetched stylesheet names a face, and no `fonts.shopifycdn.com` or Google Fonts URL was reachable.

**What is confirmed about the type system:**

- Two roles only: one heading family, one body family. Dawn's standard pairing model.
- Scale is controlled by `--font-heading-scale` and `--font-body-scale`, multipliers applied to a base size rather than a hand-built type ramp.
- Observed rendering is a light, low-contrast, sentence-case style with no wide-tracked uppercase micro-labels anywhere. This is a real difference from Dimitra Milan, which leans heavily on a `0.3em`-tracked uppercase label as its connective typographic device.

**To resolve the fonts** somebody needs to open the site with developer tools and read the computed `font-family` on a heading and a paragraph, or view source and find the `@font-face` block. That is a two-minute job outside this environment and it is on the open questions list.

### 2.4 Whitespace, page width and rhythm

Dawn's tokens govern all of it: `--page-width`, `--page-width-margin`, `--spacing-sections-mobile`, `--spacing-sections-desktop`, `--grid-mobile-horizontal-spacing`, `--grid-mobile-vertical-spacing`, `--grid-desktop-horizontal-spacing`, `--grid-desktop-vertical-spacing`. The exact configured values are inline and were not extractable.

**Observed rhythm:** consistent and uniform. Section, section, section, each at the same container width, each with the same vertical padding. There is no alternation between full-bleed and narrow measure of the kind that gives Dimitra Milan its editorial cadence. The page reads as an even stack.

This is the clearest place where the site does feel like a Shopify section stack, and it is worth being direct about it: **the homepage rhythm is the weakest part of the design.**

### 2.5 Image treatment

- Responsive images confirmed. Every image URL carries Shopify's transform parameters, for example `?v=1761417075&width=1080` and `&width=300`.
- Artwork is shown whole. Paintings are photographed square or near-square and presented uncropped, which suits abstract work where an arbitrary crop would destroy the composition.
- Product cards carry generous, consistent imagery with descriptive alt text present.
- Original paintings carry 6 to 9 images each; prints carry 3 to 6.

**Why the uncropped approach works here.** Rinske's paintings are mostly square canvases (70x70cm, for example), and her prints are offered in square sizes (16x16in, 24x24in, 32x32in). A square-native catalogue means a square grid crops nothing. That is a product decision producing a design benefit, and it is worth noting that it only works because the underlying work is consistent in shape.

### 2.6 Navigation, header, footer

**Header, top to bottom:**
1. Utility row: Facebook, Instagram, YouTube, and `info@rinskedouna.com`
2. Announcement bar one: "Shipping worldwide!"
3. Announcement bar two: "New 'Rainbow Siblings' collection has arrived!"
4. Main navigation, account link, cart

**Footer:** an "Other Links" column (Contact Us, Commissions, Shipping and Returns (for prints only), Shipping Policy, Refund & Return Policy, Terms of Service, Privacy Policy), an "About" column describing Prints, Original Art and Art Courses with links, social links plus `hello@rinskedouna.com`, the country and currency selector, payment icons, and "Powered by Shopify" with "© 2026, Rinske Douna".

**Two observations.** First, three stacked bars before the logo is a lot of chrome above the artwork on a site whose product is visual. Second, the header shows `info@rinskedouna.com` while the footer and contact page show `hello@rinskedouna.com`. That inconsistency is small but it is exactly the kind of detail that erodes trust on a page where somebody is deciding whether to spend $1,195.

### 2.7 Motion

Dawn's motion tokens are present and unchanged: `--duration-short: .1s`, `--duration-default: .2s`, `--duration-long: .5s`. These drive hover and disclosure transitions.

Dawn ships no scroll-reveal system by default. Nothing in the observed markup suggests one has been added. **LIKELY conclusion: the site has essentially no scroll motion**, only micro-transitions on hover and menu states.

That is a defensible choice for artwork, and it is worth noting against the instinct to animate everything. It also means motion is an open field for Zita rather than something to borrow.

---

## 3. Homepage, section by section

Sections in confirmed document order.

### 3.1 Utility bar and two announcement bars

- **Purpose:** contact, social proof of channel presence, shipping reassurance, and a campaign message.
- **Content:** social icons and email; "Shipping worldwide!"; "New 'Rainbow Siblings' collection has arrived!".
- **Implementation:** LIKELY Dawn's announcement bar group with two blocks, plus a utility row.
- **Assessment:** conventional. Two stacked announcement bars is one too many. The shipping message is genuinely useful for an artist selling from the Netherlands to a worldwide audience, and it earns its place.

### 3.2 Hero

- **Content:** a **video still** of Rinske in her studio, overlaid with "NEW! JUST RELEASED", "Botanical Brushstroke Mastery Course", and a button reading "I want to know more!" that links to **smartartcourses.com**.
- **Artwork treatment:** none. There is no painting in the hero.
- **CTA strategy:** the single highest-value screen on the site promotes a course and sends the visitor **off the domain entirely**.
- **Implementation:** LIKELY a stock image banner section.
- **Assessment:** this is the most consequential choice on the homepage and I think it is a mistake for an art storefront, though it may well be the right commercial choice for *her* business if courses are the profit centre. Two separate problems. First, a visitor who arrived to look at paintings sees a person and a course before they see any art. Second, the primary CTA is an exit link, so the store's best real estate spends its attention on another platform.

**For Zita this is a clear decision point rather than a pattern to copy.** If Ranjeeta has a non-art revenue line, it needs a home that does not consume the first screen.

### 3.3 Original paintings grid

- **Content:** a static grid of eight to nine originals with title, price, star rating, and Sold Out badges where applicable. Prices $1,095 to $1,445. Button: "View all paintings".
- **Layout:** static grid, not a carousel. Confirmed.
- **Assessment:** this is where the site starts working. Big, square, uncropped paintings at a generous size, minimal card furniture, real prices shown plainly. Showing sold work alongside available work signals a functioning practice. Placing originals **above** prints is the right hierarchy for an artist and the opposite of Dimitra Milan's homepage, which leads with prints and the print club.

### 3.4 Meet Rinske

- **Content:** a photograph and a short first-person paragraph: an acrylic abstract artist exploring how colour, composition and emotion flow together, drawing from nature, capturing a feeling rather than a perfect image. Button: "Read my Story".
- **Assessment:** short, warm, specific about method, and free of artist-statement jargon. It does its job in about forty words. The phrase "capturing a feeling, not a perfect image" tells a prospective buyer what they are being offered better than a paragraph of biography would.

### 3.5 Giclée art prints grid

- **Content:** ten prints, all showing "On Sale" with compare-at pricing, from $89.25 (was $105.00) and $144.50 (was $170.00). Star ratings shown. Button: "View all Prints".
- **Assessment:** the merchandising works, the framing does not. Every print being permanently on sale is a weak signal: a discount that never ends is not a discount, it is just the price with a strikethrough next to it. For a fine-art print programme it slightly cheapens the proposition. See section 14.

### 3.6 Art courses

- **Content:** "My courses are packed with step-by-step guidance, real painting demos, and plenty of creative freedom." Button: "Learn more", again to smartartcourses.com.
- **Assessment:** a second off-site exit on one page.

### 3.7 Testimonials

Three quotes, each attributed and each tied to a different product line: a course (SZ.), an original painting (Bryan C.), and a print (Barbara J.).

- **Assessment:** this is a genuinely good piece of design thinking and the best structural idea on the homepage. One testimonial per revenue line means every visitor, whatever they came for, sees somebody like them who bought successfully. The painting testimonial is specific (bought "First Sunlight" plus another piece for a mother's eightieth birthday) and the print testimonial is specific about materials ("a special German paper that brings a subtle texture"). Specificity is what makes social proof work.

### 3.8 Newsletter

"Join my art gang! ;-)" with an email field and Subscribe button. Informal, personal, and a clear contrast with the generic "Sign up for our newsletter". The winking emoticon will not suit every brand but the principle, that the ask should sound like the person, is sound.

### 3.9 Footer

As described in 2.6.

### Conventional versus custom

| Conventional | Configured with care | Genuinely custom |
|---|---|---|
| Announcement bars, image banner hero, product grids, rich text, testimonials, newsletter, footer | Photography quality, square-native artwork, one testimonial per revenue line, originals placed above prints, first-person copy | **Nothing identified** |

**What creates the sense of quality**, in order of contribution: photography and consistent square artwork; generous whitespace and restraint; plain honest pricing; specific, human writing. None of that is technical.

---

## 4. Navigation and information architecture

### 4.1 Main navigation

| Item | Children |
|---|---|
| **Prints** | Shop all Prints; Prints by Series: Rainbow Siblings, When it Flows, Born to Bloom, In Full Bloom, Lines of Connection |
| **Paintings** | none (`/collections/paintings` returns 404, so this LIKELY points to `/collections/original-art`) |
| **Art Courses** | Botanical Brushstroke Mastery, Botanical Abstract Painting Course, The 3C's of Art, Dutch Pour Bloom Course, How to Title your Artwork (all external) |
| **Free Guides** | Art Supply List, Composition Cheat Sheet, Dutch Pour Quick Starting Guide |
| **Blog** | none |
| **My Story** | none |
| **Contact** | none |

Plus account and cart. No search entry point was observed in the main navigation, although Dawn's `predictive-search` component is present in the stylesheet.

### 4.2 Collections (CONFIRMED from `collections.json`)

| Handle | Title | `products_count` |
|---|---|---|
| `original-art` | Original Paintings | 135 |
| `prints` | Prints | 25 |
| `rinske-douna` | Rinske Douna | 174 |
| `rainbow-siblings` | The Rainbow Siblings | 6 |
| `rainbow-siblings-prints` | Rainbow Siblings (Prints) | 6 |
| `ton-sur-ton` | Ton sur ton | 8 |
| `collection-in-full-bloom` | Collection: In full bloom | 5 |
| `when-it-flows` | When it Flows | 4 |
| `born-to-bloom-giclee-prints` | Born to Bloom | 3 |
| `lines-of-connection` | Lines of Connection | 3 |
| `with-the-flow` | With the Flow | 2 |
| `digital-products` | Digital Products | 1 |

### 4.3 The series concept: the single best IA idea on the site

"Prints by Series" in the navigation, with each series as its own collection, is the strongest structural decision here. It gives a visitor a way into the work that is neither "everything" nor "one piece": a body of related work with a name. For an abstract artist this is far more useful than filtering by size or colour, because series is how the artist actually thinks and how a collector builds.

It also solves a real merchandising problem cheaply: small collections (2 to 6 products) feel curated rather than thin, whereas a 25-product grid feels like a catalogue.

**This is the clearest thing to take for Zita.** See section 15.

### 4.4 Visitor paths

- **Discovering artwork:** homepage originals grid, or Paintings in the navigation. Two clicks to a purchase decision. Clean.
- **Browsing by series:** navigation dropdown to a series collection. Only exposed for prints, not for originals, which is an asymmetry worth noting.
- **Learning about the artist:** My Story in the navigation, plus the homepage "Meet Rinske" block. Well signposted.
- **Story to commerce:** **weak.** The story page ends on a newsletter signup, not on a link to available work. Same terminal pattern as Dimitra Milan's About page.
- **Purchasing:** add to cart, then checkout.

### 4.5 IA problems found

- **`/collections/paintings` returns 404.** The Paintings concept lives at `original-art`. Any external link, old bookmark or printed reference using the obvious handle fails.
- **Duplicate series routes:** `rainbow-siblings` (6) and `rainbow-siblings-prints` (6) are two collections for what a visitor experiences as one idea.
- **An auto-generated vendor collection is exposed:** `rinske-douna` with 174 products. On a single-artist store this is meaningless to a visitor and competes with real collections for indexing.
- **A large published-versus-total gap on originals.** `collections.json` reports 135 products in `original-art`, but the collection page reports "15 products" and the collection's `products.json` returns roughly 15 to 16. LIKELY reading: around 120 sold originals are held in the collection but unpublished to the Online Store channel. **This is a genuine philosophical difference from Dimitra Milan**, who leaves roughly two thirds of her originals visible and sold out. See section 16.
- **No availability filter** on either collection, despite 6 of 15 visible originals being sold out.
- **Courses and guides leave the domain,** so a significant part of the business is invisible to the store's own analytics, search and merchandising.

---

## 5. Collection and product listing pages

Pages inspected: `/collections/prints` (21 products shown) and `/collections/original-art` (15 products shown).

### 5.1 Layout

1. Collection banner with the title
2. A single line of reassurance text: "Worldwide delivery with tracked & insured shipping" on Prints, "Free Shipping Worldwide" on Original Paintings
3. Filter and sort controls
4. Product count
5. Grid
6. Numbered pagination (Prints runs to 2 pages; Originals fits on one)

The banner is `main-collection-banner` and the grid is `main-collection-product-grid`, both CONFIRMED by section probe.

**The one-line collection intro is a good, cheap idea.** It answers the first objection an international art buyer has (can I actually get this, and will it arrive safely) in nine words, without a paragraph of marketing.

### 5.2 Filtering: Shopify native, and poorly configured

**CONFIRMED filters:** Brand, Price (min and max inputs), Product type. Plus "Clear all" and a "View (21)" apply control.

**LIKELY implementation:** Shopify's native storefront filtering via the Search & Discovery app, rendered by Dawn's facets. Evidence: the filter set is exactly Shopify's default automatic facets (Availability, Price, Product type, Brand/Vendor), the strings match Dawn's facet UI, and no third-party filtering app markup was observed.

**The configuration is weak, in an instructive way:**

- **Brand: Rinske Douna (21).** On a single-artist store every product has the same vendor. This filter can never narrow anything. It is pure noise.
- **Product type: Prints (21).** On a collection called Prints, every product is type Prints. Same problem.
- **No availability filter,** which is the one filter that would actually help on the originals collection where 6 of 15 are sold out.
- **Nothing art-specific:** no series, no size, no palette, no orientation, no medium.

**The underlying cause is product data, not the interface.** From `products.json`:

| Field | Originals | Prints |
|---|---|---|
| `product_type` | "Original Art" (one item blank) | "Prints" |
| `vendor` | "Rinske Douna" | "Rinske Douna" |
| `tags` | "original art", "botanical painting", "fluid art" | **none at all** |
| `options` | "Title" (default, single variant) | Size; Hahnemühle Extra Protective Layer |

Prints carry **no tags whatsoever**, which is why series cannot be filtered and has to be handled through manually curated collections instead. The tags on originals are inconsistent: some have one, some three.

**Lesson for Zita, and it is the same lesson the Dimitra audit produced:** filters are a product-data problem wearing an interface costume. Decide the taxonomy first (series, medium, orientation, size band, palette, availability), enforce it on every product, and only then design the filter UI.

### 5.3 Grid and cards

Card contents: image, title, price (with compare-at strikethrough on prints), "On Sale" badge, "Sold Out" badge, star rating with review count.

- **Prices are shown plainly.** No "enquire for price". For an artist selling $89 prints to $1,945 originals, this is the right call and it is worth stating as a principle: hiding prices on art is a conversion tax paid for a whiff of prestige.
- **Star ratings on cards are a mixed blessing.** Several show "5.0 / 5.0" with a review count of 0 or 1. A five-star average drawn from one review is not persuasive, and on unique original paintings a star rating is conceptually odd. Dimitra Milan makes the same error.
- **Sold Out badges** are present and honest.

### 5.4 Does it escape the generic ecommerce grid?

**Partly, and mostly for reasons outside the grid itself.** The uniform square artwork, the generous image size, the restrained card furniture and the single-line intro all help. But structurally it is a standard Dawn grid with default facets: no editorial breaks, no series storytelling inside the collection, no varied tile sizes, no curatorial sequencing.

**This is the biggest open opportunity for Zita.** Both reference sites have conventional collection pages. If collections become curated exhibitions for Zita, that will be a genuine differentiator rather than an imitation.

### 5.5 Mobile

INFERRED from Dawn's stylesheet, not visually verified: grid collapses using `--grid-mobile-horizontal-spacing` and `--grid-mobile-vertical-spacing` below 750px, and the facets move into Dawn's drawer pattern (hence the "Filter and sort" label, which is Dawn's mobile control).

---

## 6. Product and artwork detail pages

Two types exist and they use the **same template** with different data. Both render through `main-product`.

### 6.1 Original painting: "Wild at heart" ($1,095)

| Element | Content |
|---|---|
| Breadcrumb | Home > Wild at heart |
| Gallery | 7 images with 7 thumbnails |
| Title | Wild at heart |
| Price | $1,095.00 |
| Availability | "Only 1 in stock" |
| Quantity | Stepper with minus and plus |
| Buy | "Add to cart" |
| Shipping | "Shipping calculated at checkout" and "Spend $300 to get free shipping" |
| Description | Roughly 280 characters: original hand-painted artwork on her own stretched 3D canvas; canvas size 70x70cm (28x28in); sides black; sealed with satin varnish by Amsterdam; Certificate of Authenticity included; free shipping worldwide; ships from the Netherlands within 3 to 5 working days |
| Accordions or tabs | None |
| Related products | None |
| Reviews on page | None |

### 6.2 Print: "The Roots" (from $144.50, was $170.00)

| Element | Content |
|---|---|
| Gallery | 6 images with thumbnails |
| Price | $144.50, compare-at $170.00, "On Sale" |
| Options | **Size**: 16"x16" (40x40cm), 24"x24" (60x60cm), 32"x32" (80x80cm). **Hahnemühle Extra Protective Layer**: No, Yes |
| Variants | 6, spanning $144.50 to $314.50 |
| Availability | "In stock" |
| Buy | "Add to cart" |
| Description | From the Rainbow Siblings Collection; archival printing on acid-free archival textured cotton German Etching Giclée paper from Hahnemühle, "the world's oldest mill"; signed Certificate of Authenticity; small white borders on all sizes for framing |
| Accordions | None |
| Related products | None |

### 6.3 What the product pages do well

1. **Every physical question is answered in the description.** Exact canvas size in both metric and imperial, what the sides look like, what varnish was used, what paper, what mill, whether a certificate is included, where it ships from and how long it takes. For somebody spending $1,095 on an object they cannot touch, this is the information that actually closes the sale. **Dimitra Milan's original pages do not do this**, and it is the single clearest place where Rinske is stronger.
2. **Dual units.** 70x70cm (28x28in) removes a real barrier for an international audience. Trivial to do, frequently forgotten.
3. **Naming the supplier as a quality proxy.** "Hahnemühle, the world's oldest mill" borrows credibility that the artist does not have to build from scratch.
4. **Making the protective layer an explicit paid option** rather than hiding it in the description turns a technical detail into an upsell and a reassurance at the same time.
5. **Price transparency across a 20x range** ($89 to $1,945) with no gating.

### 6.4 What the product pages do badly

1. **No story.** The description is entirely specification. There is nothing about what the painting is, what it came from, what it is called what it is called, or where it sits in a series. For abstract work, where the buyer cannot read subject matter, the absence of any interpretive handle is a real gap. The blog and the story page prove Rinske can write; none of that writing reaches the product page.
2. **No structured artwork metadata.** No year, no medium field, no series link, no orientation, no edition size, as separate data. Everything is prose inside `body_html`, so nothing is filterable, comparable or reusable.
3. **A quantity stepper on a unique painting.** "Only 1 in stock" sits directly above a control inviting the buyer to choose 2. Minor, but it is the kind of detail that says "generic template".
4. **No related work and no series navigation.** A visitor looking at one painting has no path to the next. On a site whose best IA idea is series, the product page does not use it.
5. **No enquiry route on a $1,945 object.** There is no "ask a question", no "request more photographs", no viewing request. Dimitra Milan puts a commission enquiry form directly on the original artwork page, and that is the better pattern.
6. **No reviews on the page** although cards advertise star ratings, so the rating is a claim the product page never substantiates.

### 6.5 Data model observations

**CONFIRMED from `products.json`:**

- Originals: single variant, option "Title" (Shopify's default placeholder), `product_type` "Original Art", 6 to 9 images, descriptions around 280 characters with no headings.
- Prints: 6 variants from two options, `product_type` "Prints", no tags, compare-at prices set on every variant.
- **A handle defect:** the product titled **"The Dreamer" has the handle `the-mirage`**, while the product titled **"The Mirage" has the handle `the-mirage-1`**. This is a genuine SEO and shareability problem: the canonical URL for The Dreamer names a different artwork. It LIKELY arose from duplicating a product and renaming it without fixing the handle.
- **A blank `product_type`** on at least one product ("Commission for Sue", which also has 0 images and is publicly listed).
- Product count discrepancies between `collections.json` (`prints`: 25, `original-art`: 135) and the rendered collection pages (21 and 15). LIKELY explained by publication status, but worth verifying.

---

## 7. About and artist story page

This section matters most, because Ranjeeta dislikes the conventional photo-left, biography-right About page and wants something immersive.

### 7.1 What is actually there

**Observed:** `/pages/my-story` is a **single-column, text-only narrative of roughly 800 to 1,000 words**, organised into five titled chapters:

1. **"A seed was planted"**: the Prado in Madrid, two decades ago, standing in front of a painting and thinking *"I want to do this. I want to be an artist."*
2. **"The First Step"**: working for her father organising exhibitions, walking past an art store every day without going in; after his death, connecting with the artist Nitra Art in Antwerp, who taught her about paints and colour mixing and got her past the hesitation; painting together in a park that same day.
3. **"From Hobby to Obsession"**: graphic and web designer by day, painter by night, at the same desk converted into a studio.
4. **"The 100-Day Challenge"**: 2018, painting daily for 100 consecutive days while holding the design job; documenting on Instagram; an audience by day 30; tripled coffee by day 60; YouTube videos of the Dutch Pour technique; a first exhibition of 50 pieces in her boyfriend's fashion store.
5. **"The Journey Continues"**: leaving graphic design, describing the work as nature and emotion led, with organic shapes and transparent layers; originals, prints and online courses; closing with encouragement to aspiring artists.

Then a newsletter signup.

**Critically: there is essentially no imagery in the narrative.** I asked for every image on the page in document order. The result was two images, and **neither belongs to the story**: one is a collection thumbnail that lives in the expanded navigation menu, and one is an art-courses promotional image in a secondary position. There are **no full-bleed sections, no pull quotes, no drop caps, no portrait photography, no studio or process imagery, no timeline graphics, no alternating image and text, and no overlapping elements.**

### 7.2 Assessment

**As writing, it is excellent and it is the best content on the site.** It has a real structure (a seed, a first step, an obsession, a proving ground, a present tense), concrete sensory detail, named people, a specific date, a specific number, and genuine vulnerability. The 100-day challenge is a story with a beginning and an end, which is precisely what most artist biographies lack. The father's death is handled with restraint and is doing real emotional work. And the closing move, turning outward to encourage the reader, converts a biography into an invitation.

**As a page, it is visually plain.** It is a well-written essay in a default page template.

### 7.3 The conclusion Ranjeeta needs

**Rinske Douna is the wrong reference for the *look* of Zita's story page, and the right reference for its *structure*.** Dimitra Milan's About page is the visual model (full-bleed imagery, an expandable chapter timeline, a second-person section addressed to the visitor). Rinske's page is the narrative model: chaptered, specific, honest, with an ordinary beginning.

The good news is that the structure is the harder half. Chapters, specificity and a real turning point cannot be bought. Full-bleed images and a scroll reveal can be built in a day.

### 7.4 Techniques worth taking from this page

| Technique | Why it works |
|---|---|
| **Chapter headings with titles, not dates** | "A seed was planted" invites reading. "2018 to 2020" does not |
| **Open on a specific moment, not a summary** | A museum, a city, a sentence said to herself. Concrete beats comprehensive |
| **One quantified proof point** | 100 consecutive days, 50 pieces, day 30, day 60. Numbers are checkable and checkable builds trust |
| **Name the people who helped** | Nitra Art in Antwerp. Generosity reads as confidence |
| **Include the unglamorous middle** | The day job, the desk that doubled as a studio. This is what makes the rest believable |
| **End facing the reader** | Closing with encouragement rather than achievement turns a biography into a relationship |

**What to fix in our version:** give the narrative images, and end it somewhere better than a newsletter box. A story page that has just earned real emotional investment should offer the visitor the work.

---

## 8. Contact experience

**Observed at `/pages/contact`:**

- Heading: **"Send me an email"**
- Form fields: **Name**, **Email**, **Message**
- Submit button: **"Subscribe"**
- Below: the "Join my art gang! ;-)" newsletter block with its own email field and Subscribe button
- Email shown: `hello@rinskedouna.com` (the header shows `info@rinskedouna.com`)
- Social: Facebook, Instagram, YouTube
- **No phone number, no physical address, no image, no map, no response-time promise**

**LIKELY implementation:** Dawn's native `contact-form` section. The Name / Email / Message triple is Dawn's default field set.

### Assessment

**The heading is good.** "Send me an email" is warmer and more human than "Contact Us", and it sets the expectation that a person rather than a support queue will reply.

**Three things are wrong.**

1. **The submit button says "Subscribe".** On a contact form, this is a real defect. It creates genuine doubt about what pressing it does, which on a page whose entire job is to reduce friction is the worst possible confusion. This is either a mis-set theme setting or a mislabelled section.
2. **Two near-identical email fields on one page**, one in the contact form and one in the newsletter block, both with Subscribe buttons. Ambiguous.
3. **Inconsistent email addresses** between header and footer.

**The page is also entirely undesigned.** No photograph of the artist or the studio, nothing that makes writing to a stranger feel easy.

### Relevance to Zita

Ranjeeta plans to give an email address and a phone number but no physical address, while keeping a form. That is a sound plan, and Rinske's page shows what to avoid rather than what to copy:

- Label the submit button for the action (Send message).
- Do not put a newsletter signup with an email field directly beneath a contact form.
- Use one email address everywhere.
- Say when somebody will hear back. "I answer every email, usually within two working days" is worth more than any styling.
- Give the page one human image. A contact page with a face on it is materially easier to write to.
- Consider routing different intents (commission, press, wholesale, general) through one form with a subject selector, rather than through separate pages.

---

## 9. Policy and utility pages

**Observed:** the footer links to Shopify's native policy routes: `/policies/shipping-policy`, `/policies/refund-policy`, `/policies/terms-of-service`, `/policies/privacy-policy`, plus a separate merchant-authored page "Shipping and Returns (for prints only)".

**Not fetchable:** Shopify's `robots.txt` disallows `/policies/` and `/search`, so these returned `ROBOTS_DISALLOWED`. I did not read their content and will not characterise their layout beyond noting that they use Shopify's native policy template, which is CONFIRMED by the URL pattern.

**One observation worth recording:** the existence of both native policy pages **and** a separate hand-written "Shipping and Returns (for prints only)" page is a small IA smell. A visitor who wants to know about shipping an original now has two candidate pages and no signal about which applies.

**The principle is sound though, and we should follow it:** let utility pages be plain. Using Shopify's native policy template is the right call. It costs nothing, it stays legally current, and the visual restraint makes the artistic pages stand out by contrast. Not every page needs to be an experience.

---

## 10. Mobile and responsive experience

**Stated limitation.** This environment cannot render pages at specific viewport widths. Everything in this section is **INFERRED from Dawn's stylesheet** except where marked observed. A real device pass is required and is listed in the open questions.

### 10.1 Breakpoints (CONFIRMED in `base.css`)

| Band | Query |
|---|---|
| Mobile | `max-width: 749px` |
| Tablet | `min-width: 750px` and `max-width: 989px` |
| Desktop | `min-width: 990px` |

Dawn's two-breakpoint model. Simple, and worth adopting: two breakpoints are usually enough, and fewer breakpoints means fewer states to test.

### 10.2 Inferred behaviour

| Element | Desktop | Mobile |
|---|---|---|
| Navigation | `.header__inline-menu` horizontal | `.menu-drawer` slide-in drawer |
| Grid spacing | `--grid-desktop-horizontal-spacing`, `--grid-desktop-vertical-spacing` | `--grid-mobile-horizontal-spacing`, `--grid-mobile-vertical-spacing` |
| Section spacing | `--spacing-sections-desktop` | `--spacing-sections-mobile` |
| Collection facets | Inline sidebar or horizontal bar | Drawer, labelled "Filter and sort" (observed string) |
| Product gallery | `.product__media-gallery` with thumbnails | Dawn switches to a swipeable carousel with dots |
| Search | `.predictive-search` | Modal |
| Cart | `.cart-count-bubble`, `.cart__dynamic-checkout-buttons` | Dawn's drawer or page depending on settings |

### 10.3 Likely strengths

Square artwork is the best possible shape for a phone: a square image at full container width occupies a large share of the screen without the letterboxing that landscape work suffers. The uncropped, square-native catalogue should be excellent on mobile. Dawn's typography scales through `--font-body-scale` and `--font-heading-scale` rather than through separate mobile values, which keeps the ramp consistent.

### 10.4 Likely weaknesses

- **Three stacked bars** (utility row plus two announcement bars) consume a significant share of a 375px-tall-by-667px screen before any content.
- **The country and currency selector** renders 200-plus options and appears in the footer on every page.
- **The hero is a video still with overlaid text**, so text legibility over the image at narrow crops is a risk.
- **The "Hahnemühle Extra Protective Layer" option label** is long and will wrap awkwardly in a narrow variant picker.

---

## 11. Performance and accessibility observations

Only evidence-backed claims.

**Positive, CONFIRMED:**

- **Responsive images are in use.** Every image URL carries Shopify's CDN transform parameters (`?v=…&width=1080`, `&width=300`), which means `srcset` generation is working rather than one large file being served to every device.
- **Alt text is present** on product images, and the observed values are descriptive rather than filenames.
- **Dawn's semantic component set** is intact (`details-disclosure`, `.disclosure-has-popup`, `predictive-search`), which brings Dawn's keyboard and ARIA handling with it. Dawn is one of the better-tested themes for accessibility, so inheriting it is a real advantage.
- **Motion is minimal** (`--duration-short: .1s`, `--duration-default: .2s`, `--duration-long: .5s`), so there is little scroll motion to cause discomfort.

**Concerns:**

- **The sage `#94b397` fails contrast on white at 2.29:1.** Whether this matters depends on where it is used, which needs visual verification.
- **The contact form's "Subscribe" submit button** is an accessibility problem as much as a UX one: the accessible name of the control does not describe its action.
- **`prefers-reduced-motion`** was not verified. Dawn does ship reduced-motion handling, but I did not confirm it in this build.
- **Two `<h1>`-level page headings** may exist on the homepage (the hero overlay and the first section heading). Not verified.
- **The `{formbuilder:OTQ4MzI=}` string** is read aloud verbatim by a screen reader on the commissions page.
- **The star ratings** expose a rating with a review count of zero on at least one product, which is a truthfulness problem more than a technical one.

---

## 12. Technical and Shopify architecture hypothesis

### 12.1 Base and templates

| Item | Status | Evidence |
|---|---|---|
| Shopify | **CONFIRMED** | Digital wallet meta, CDN paths, JSON endpoints, sitemaps |
| Online Store 2.0 with JSON templates | **CONFIRMED** | Section Rendering API responds per-section with Dawn's template-key naming |
| Dawn architecture | **CONFIRMED** | `base.css` token and class vocabulary; 750/990 breakpoints; Dawn section IDs render |
| Exact theme name | **NOT IDENTIFIABLE** | `Shopify.theme` is inline JavaScript, unreachable in this environment |
| A second, non-Dawn theme in the store at slot 14 | **CONFIRMED** | `/cdn/shop/t/14/assets/base.css` uses normalize.css v7, `--font--title`, `.c-btn`, `.o-ratio`, em breakpoints |
| `product.json` template shared by originals and prints | **LIKELY** | Both render through `main-product`; layout and controls are identical |
| `collection.json` with banner plus grid | **CONFIRMED** | `main-collection-banner` and `main-collection-product-grid` both render |
| `page.json` for My Story, Contact, Commissions | **LIKELY** | All three use an unremarkable single-column page layout |
| Native policy templates | **CONFIRMED** | `/policies/…` routes |
| Blog templates | **CONFIRMED** | Two blogs: `news` and `rinske-douna`; 22 posts in `news` |

### 12.2 Sections, blocks and custom code

| Item | Status | Notes |
|---|---|---|
| Announcement bar group with two blocks | **LIKELY** | Two distinct messages render stacked |
| Image banner hero | **LIKELY** | Static image with overlay heading and one button |
| Featured collection sections for originals and prints | **LIKELY** | Static grids with a heading and a "View all" button |
| Rich text sections for "Meet Rinske" and "Art Courses" | **LIKELY** | Heading, paragraph, single button |
| Testimonial section | **LIKELY** | Three quote blocks, each with attribution |
| Newsletter section | **LIKELY** | Dawn's email signup |
| Contact form section | **LIKELY** | Dawn's `contact-form` with Name, Email, Message |
| **Custom Liquid sections** | **NONE FOUND** | No theme-asset URLs anywhere across seven pages; no `custom.css`; no section names outside the standard set |
| Custom CSS beyond theme settings | **SPECULATIVE** | Nothing observed. Dawn's `custom.css` slot is absent at slot 1 |
| Custom JavaScript | **SPECULATIVE** | Nothing observed |

### 12.3 Data

| Item | Status | Notes |
|---|---|---|
| Originals as single-variant products, option "Title" | **CONFIRMED** | Shopify default placeholder option |
| Prints as two-option, six-variant products | **CONFIRMED** | Size (3) x Protective Layer (2) |
| Series modelled as **manual collections**, not tags or metaobjects | **LIKELY** | Series collections exist with small counts; prints carry no tags at all |
| Artwork attributes (medium, year, dimensions) held as prose in `body_html`, **not** as metafields | **LIKELY** | Nothing structured is exposed, and no attribute appears as a filter |
| Metaobjects | **SPECULATIVE, and I doubt it** | No evidence of structured repeatable content anywhere |
| Shopify Search & Discovery for filtering | **LIKELY** | Filter set matches Shopify's automatic facets exactly |
| Review metafields (`reviews.rating`, `reviews.rating_count`) | **LIKELY** | Ratings render on cards but not on product pages, the classic signature of card-level metafield rendering |

### 12.4 Experiences that look custom but are not

This is the section the brief specifically asked for, and the answer is blunt: **almost nothing on this site needs custom code.** The hero, the product grids, the intro blocks, the testimonials, the newsletter, the contact form, the collection banner and the filters are all stock Dawn behaviour configured through the Theme Editor. The series navigation, which is the site's best structural idea, is just manual collections placed in a menu.

**The transferable insight:** the ceiling of a well-configured stock theme is higher than most people assume, and the things that make this site feel considered (photography, square-native artwork, honest pricing, specific writing, one testimonial per revenue line) cost no engineering at all.

---

## 13. What Rinske does better than a typical Shopify store

Separating design quality from technical complexity, as the brief asked. Every item below is **visually or editorially sophisticated and technically trivial.**

| # | What | Why it works |
|---|---|---|
| 1 | **Square-native artwork, never cropped** | Abstract work has no safe crop. Square canvases and square print sizes mean the grid, the hero and the phone all show the whole painting. A product decision that solves a design problem permanently |
| 2 | **Series as navigation** | Gives a visitor an entry point between "one piece" and "everything", and matches how an artist actually works and how a collector actually buys |
| 3 | **Complete physical specification on every product** | Size in both unit systems, canvas construction, edge treatment, varnish, paper and mill, certificate, origin and transit time. This is what closes a sale on an object you cannot touch |
| 4 | **Honest, visible pricing across a 20x range** | No gated prices. A $89 print and a $1,945 painting on the same site, both priced plainly |
| 5 | **One testimonial per revenue line** | Every visitor sees somebody like themselves who bought successfully |
| 6 | **A chaptered, specific, vulnerable artist story** | Real turning points, named people, concrete numbers, and an unglamorous middle |
| 7 | **The one-line collection intro** | Answers the international buyer's first objection in nine words |
| 8 | **A genuine blog with 22 craft-led posts** | Teaching posts rather than announcements. This is how an abstract artist earns search traffic and authority |
| 9 | **A light app stack** | Native forms, native filtering, native newsletter. Fast, cheap, and low-maintenance |
| 10 | **Restraint** | No countdown timers, no visitor counters, no popups observed, no urgency theatre on the artwork itself |

---

## 14. Weaknesses and things we should not inherit

| # | Problem | Severity | Detail |
|---|---|---|---|
| 1 | **Broken form embed on the commissions page** | **High** | `{formbuilder:OTQ4MzI=}` renders as literal text where the enquiry form should be. The commission funnel is dead on a page selling bespoke work |
| 2 | **Contact form submit button labelled "Subscribe"** | **High** | Creates real doubt about what the button does, on the page whose only job is to be easy |
| 3 | **Hero sells a course and links off-domain** | **High** | The best screen on an art storefront contains no art and its CTA leaves the site |
| 4 | **Product handle does not match the product** | **High (SEO)** | "The Dreamer" lives at `/products/the-mirage`; "The Mirage" lives at `/products/the-mirage-1` |
| 5 | **No story on any product page** | **High** | Pure specification. For abstract work, the buyer is given no interpretive handle at all |
| 6 | **Everything permanently "On Sale"** | Medium | Every print carries a compare-at price. A discount that never ends is just a price with a line through it, and it erodes the premium positioning of a fine-art print |
| 7 | **Useless filters** | Medium | "Brand: Rinske Douna (21)" on a single-artist store, and "Product type: Prints (21)" on the Prints collection. Neither can narrow anything |
| 8 | **No availability filter** where it would actually help | Medium | 6 of 15 originals are sold out |
| 9 | **Star ratings with 0 or 1 review**, and on unique originals | Medium | "5.0 / 5.0 (0)" is worse than no rating. Rating a one-of-a-kind painting is conceptually odd |
| 10 | **Ratings on cards but no reviews on product pages** | Medium | The card makes a claim the product page never substantiates |
| 11 | **Two email addresses** | Medium | `info@` in the header, `hello@` in the footer and on contact |
| 12 | **`/collections/paintings` 404s** | Medium | The obvious handle for a primary category is dead |
| 13 | **Duplicate and auto-generated collections exposed** | Medium | `rainbow-siblings` vs `rainbow-siblings-prints`; the vendor collection `rinske-douna` with 174 products |
| 14 | **Quantity stepper on a unique painting** | Low | Directly under "Only 1 in stock" |
| 15 | **No related work or series link on product pages** | Medium | The site's best IA idea is absent from the page where it would do the most work |
| 16 | **No enquiry path on high-value originals** | Medium | Nothing to do but buy or leave, at up to $1,945 |
| 17 | **Story page ends at a newsletter box** | Medium | Emotional investment earned and then not converted |
| 18 | **Three stacked bars above the fold** | Low | Chrome before artwork, worst on mobile |
| 19 | **No structured artwork metadata** | Medium | Nothing filterable, comparable or reusable; everything is prose |
| 20 | **A public product with no images and no type** | Low | "Commission for Sue" is listed publicly at $447.50 with 0 images |
| 21 | **Uniform section rhythm** | Medium | Every section the same width and cadence, so the homepage reads as a stack |

**None of these should be inherited.** Items 1, 2, 4 and 20 are the kind of decay that happens when nobody audits the storefront after launch, which is itself a lesson: whatever we build for Zita needs a periodic check.

---

## 15. Adopt, adapt, invent

### 15.1 ADOPT (general patterns, usable essentially as-is)

| # | What | Why it works | How it applies to Zita |
|---|---|---|---|
| 1 | **Dawn or a Dawn-derived base, Online Store 2.0** | Free, well-tested, accessible, fast, and its token system (`--color-base-*`, `--page-width`, `--spacing-sections-*`, `--font-*-scale`) is a genuinely good design-system foundation | Confirms the theme-first plan. We can build a bespoke Zita theme on Dawn's architecture rather than buying a premium theme, then replace the sections we care about |
| 2 | **Two breakpoints: 750px and 990px** | Fewer states to design and test; sufficient for almost any layout | Use exactly this. Do not invent a five-breakpoint system |
| 3 | **Shopify native storefront filtering (Search & Discovery)** | No app cost, no theme coupling, good performance | Adopt the mechanism. Reject Rinske's configuration entirely and drive it from a designed taxonomy |
| 4 | **Native Shopify contact form and newsletter** | Zero app overhead, native spam protection, fine for the volume an artist receives | Adopt, with the button labelled correctly |
| 5 | **Shopify native policy templates for utility pages** | Legally current, plain, and the restraint makes artistic pages stand out | Adopt |
| 6 | **Responsive images through Shopify's CDN transform parameters** | Already standard in Dawn | Adopt, and hold the line on it in custom sections |
| 7 | **Dual-unit dimensions on every artwork** | Removes a real barrier for international buyers | Adopt as a content rule enforced by a metafield, not by prose |
| 8 | **Naming the material supplier** | Borrowed credibility at zero cost | Adopt if Ranjeeta uses a nameable paper, canvas or pigment |
| 9 | **Visible prices, no gating** | Gated prices cost conversions and buy little prestige | Adopt |
| 10 | **A craft-led blog rather than an announcements blog** | Earns search traffic and demonstrates expertise | Adopt the editorial policy |
| 11 | **One-line reassurance at the top of a collection** | Answers the first objection immediately | Adopt |

### 15.2 ADAPT (valuable, but must be reinterpreted for Zita)

**1. Series as the organising principle**
- *What Rinske does:* exposes "Prints by Series" in the navigation, with each series as its own small collection.
- *Why it works:* it matches how an artist thinks and how a collector builds, and small curated collections feel intentional rather than thin.
- *Problem it solves:* an undifferentiated grid gives a visitor no way in.
- *Reinterpretation for Zita:* model series properly rather than as bare collections. Give each series a **metaobject** carrying a statement, a date range, a key image and a palette, so a series can be presented as a small exhibition with its own page, and so a product can link back to its series from the product page (which Rinske's does not). Series should work for originals as well as prints, which is an asymmetry Rinske has not fixed.

**2. Complete physical specification on every artwork**
- *What Rinske does:* size in both unit systems, canvas construction, edge treatment, varnish, paper, mill, certificate, origin, transit time.
- *Why it works:* it is the information that actually closes a sale on an object the buyer cannot touch, and it is exactly what Dimitra Milan's originals are missing.
- *Problem it solves:* hesitation at the point of purchase.
- *Reinterpretation for Zita:* hold every one of these as a **structured metafield**, not as prose. That makes them filterable, comparable, consistently formatted, and editable by Ranjeeta without touching a description. Then design a specification block that looks composed rather than like a spec sheet.

**3. The chaptered artist story**
- *What Rinske does:* five titled chapters with a real turning point, named people, a specific number, and an unglamorous middle.
- *Why it works:* narrative structure and specificity, not length.
- *Problem it solves:* the generic artist biography that says nothing checkable.
- *Reinterpretation for Zita:* take the **structure** from Rinske and the **visual treatment** from Dimitra Milan. Chapters as content, full-bleed artwork and studio imagery as form. Build chapters as repeatable blocks or a metaobject so Ranjeeta can add one later. End the page on the work, not on a newsletter box.

**4. One testimonial per revenue line**
- *What Rinske does:* three testimonials, one each for a course, an original and a print.
- *Why it works:* every visitor sees somebody like them who bought successfully.
- *Problem it solves:* social proof that only speaks to one kind of buyer.
- *Reinterpretation for Zita:* map Ranjeeta's real lines, then require each testimonial to name the specific artwork and link to it, so social proof doubles as discovery. Prefer a few long, specific stories over many short ones.

**5. Square-native artwork presentation**
- *What Rinske does:* square canvases and square print sizes, shown uncropped everywhere.
- *Why it works:* no crop decision is ever needed, and square is the best shape on a phone.
- *Problem it solves:* mixed aspect ratios produce either ugly crops or a ragged grid.
- *Reinterpretation for Zita:* Ranjeeta's work may not be square. If it is mixed, do not force a square crop. Consider a grid that respects true aspect ratio with a consistent *area* rather than a consistent shape, and photograph consistently so the variation looks intentional.

**6. The print upsell as an explicit option**
- *What Rinske does:* "Hahnemühle Extra Protective Layer: No / Yes" as a paid variant option.
- *Why it works:* it turns a technical detail into revenue and reassurance simultaneously.
- *Reinterpretation for Zita:* find the equivalent genuine choice (framing, mounting, protective coating, hanging kit) and make it an option with a plain explanation, not fine print. Shorten the label; Rinske's will wrap badly on mobile.

**7. The low-app, native-first stack**
- *What Rinske does:* native forms, native filtering, native newsletter, one form-builder app.
- *Why it works:* fast, cheap, low-maintenance, nothing to break on theme updates.
- *Reinterpretation for Zita:* adopt the philosophy and go further, since her one app is the thing that is currently broken. Every app should have to justify itself against a native alternative.

### 15.3 INVENT (where Zita needs her own answer)

| Area | Why neither reference is a good model |
|---|---|
| **Collection pages as curated exhibitions** | Both references have conventional grids. Rinske's is a stock Dawn grid with default facets; Dimitra's is a stock Impulse grid. Neither interleaves editorial content, varies tile scale, or sequences work curatorially. **This is the single biggest open opportunity and it is where Zita can be genuinely distinctive rather than derivative** |
| **Homepage rhythm and section transitions** | Rinske's homepage is an even stack of equal-width sections. Dimitra's alternates full-bleed and narrow measure, which is better but still a stack. Zita needs a considered cadence: where the page breathes, where it goes full width, where it breaks its own grid |
| **The original-artwork page as a gallery experience** | Rinske's original page is specification without story. Dimitra's is story-less too, and adds scarcity widgets that undercut the work. **Neither reference has solved the high-value original artwork page.** This has to be invented |
| **Motion** | Rinske has essentially none. Dimitra has stock theme scroll-reveals. Neither offers a motion language worth inheriting. Design a small, purposeful one and respect `prefers-reduced-motion` |
| **The relationship between an original and its print edition** | Rinske keeps them in separate collections with no cross-links. Dimitra has the same gap. Both miss it entirely, so there is nothing to copy. A bidirectional `product_reference` metafield solves it and neither reference does it |
| **Sold-work strategy** | The two references do opposite things (Rinske hides, Dimitra shows) and neither offers a re-engagement path. Zita needs a deliberate answer plus a notify-me route |
| **Typography** | Rinske's fonts could not be identified and her type system is Dawn defaults with no distinctive device. Dimitra leans on a wide-tracked uppercase micro-label. Zita should choose a typographic signature that belongs to her work |
| **Contact and enquiry** | Rinske's contact page is broken and undesigned. Invent a warm, single-route enquiry experience with a response-time promise |

---

## 16. Comparison with Dimitra Milan

Using the project's existing `docs/research/dimitra-milan-audit.md`.

**One correction for the record.** That audit could **not** confirm the font families: Dimitra Milan's theme declares them through inline CSS variables that were not extractable, exactly as Rinske's does. The Tenor Sans and Alegreya identification comes from your own observation rather than from that audit, so it should be verified in a browser before we rely on it. I have hit the same wall on both sites, which is itself worth noting: **font identification on a Shopify storefront requires view-source or developer tools, and no amount of fetching will substitute.**

### 16.1 Side by side

| | **Rinske Douna** | **Dimitra Milan** |
|---|---|---|
| Theme | Dawn architecture, exact name unconfirmed | **Impulse** by Archetype Themes (confirmed by vendor banner) |
| Theme cost | Free or low | Roughly $380 to $500 |
| Custom development | **None found** | One genuinely custom template (Dreamers Print Club) with bespoke theme assets |
| Page background | White or near-white (inferred) | Warm blush `#f7ecec` (confirmed) |
| Accent | Sage `#94b397`, fails contrast on white at 2.29:1 | Berry `#8e3857`, passes at 7.36:1 on white text |
| Typographic device | None distinctive | Wide-tracked uppercase micro-label throughout |
| Page rhythm | Uniform stack, one width | Alternating full-bleed and narrow measure |
| Hero | Course promo, links off-domain, **no artwork** | Full-bleed artwork with overlaid text |
| Originals catalogue | 15 published of about 135; sold work **hidden** | 85 published, roughly 67% **shown sold out** |
| Original product detail | **Complete specification**, no story | **One line** of specification, no story |
| Print product detail | Good: paper, mill, sizes, certificate, upsell option | Excellent: 14 images, framing, room scenes, FAQ |
| Artist story | **Strong chaptered narrative**, visually plain | Visually rich, expandable timeline, second-person section |
| Series concept | **Yes, in the navigation** | No equivalent |
| Price ladder in nav | Partial (prints, paintings, courses off-site) | **Yes, four tiers, $15/month to $23,040** |
| Enquiry on high-value work | **None** | Commission form on the product page |
| Urgency tactics | Free shipping progress bar only | Visitor counters and low-stock on unique originals |
| Blog | **22 craft-led posts** | None in navigation |
| App stack | Light; one app, currently broken | Heavier: reviews, subscriptions, email, fulfilment |
| Biggest strength | Product information and written honesty | Visual identity and the custom Print Club page |
| Biggest weakness | Visual sameness, broken details | Thin originals content, conversion tactics on unique art |

### 16.2 Where they agree

Both use a commercial or free Shopify theme configured rather than rebuilt. Both have conventional collection grids. Both end their story page on an email capture rather than on the work. Both show star ratings on unique original paintings. Both fail to link an original to its print edition. **Both leave the high-value original artwork page underdeveloped.**

That last point is the most useful convergence in this whole audit: **neither reference has solved the thing that matters most for Zita.** It is an open field.

### 16.3 What Rinske accomplishes that Dimitra does not

1. **Complete, trustworthy product specification** on originals.
2. **Series as a navigable concept.**
3. **A chaptered artist story with real vulnerability and checkable specifics.**
4. **A craft-led blog** that earns search traffic.
5. **Restraint.** No urgency theatre applied to the artwork.
6. **A light, cheap, maintainable stack.**
7. **Originals placed above prints** on the homepage.

### 16.4 What Dimitra accomplishes that Rinske does not

1. **A distinctive visual identity** from a warm ground, a reserved accent and a consistent typographic device.
2. **Editorial page rhythm** through alternating widths.
3. **A price ladder exposed in the navigation**, from $15 per month to five figures.
4. **Proof that custom sections inside a stock theme produce the most distinctive page**, without going headless.
5. **An enquiry route on high-value product pages.**
6. **Long-form collector stories** rather than star ratings.
7. **Artwork in the first viewport.**

### 16.5 The combination for Zita

The two references are close to complementary, which is lucky.

> **Dimitra's form, Rinske's substance, and Zita's own answer for collections and the originals page.**

Concretely:
- **Visual identity, page rhythm and story-page treatment** from Dimitra.
- **Product information discipline, series architecture, story structure, blog policy and restraint** from Rinske.
- **Custom sections inside a theme** as the architectural model, proven by Dimitra's Print Club page.
- **Collection pages, the originals page, motion, and the original-to-print relationship** invented, because neither reference has solved them.

---

## 17. Theme-first feasibility

### 17.1 Verdict

**Everything worth taking from this site is achievable with Online Store 2.0, Liquid, JSON templates, custom sections and blocks, snippets, CSS, small vanilla JavaScript, metafields, metaobjects and native Shopify data.** Rinske's site does not even approach the ceiling of that architecture: it is a stock theme with no custom sections at all.

**Nothing observed on this site justifies Hydrogen or headless.** Combined with the Dimitra Milan audit, where the most distinctive page was custom Liquid inside a commercial theme, the evidence across both references points the same way.

### 17.2 Mapping

| Capability | Approach | Needs more than the theme? |
|---|---|---|
| Series as curated exhibitions | Collections plus a `series` metaobject (statement, dates, key image, palette) and a custom collection template | No |
| Product to series link, both directions | `metaobject_reference` on the product; series page lists its products | No |
| Original to print edition link | `product_reference` metafield in both directions | No |
| Structured artwork specification | Metafields: medium, dimensions (cm and in), year, series, edition, substrate, finish, certificate, origin, transit | No |
| Filtering by series, medium, orientation, size band, availability | Search & Discovery over metafields and well-governed tags | No. Requires taxonomy discipline, not technology |
| Editorial collection pages | Custom sections interleaved with the product grid in a JSON template | No |
| Artwork-detail originals template | Alternate template `product.original.json` with its own sections | No |
| Print template with options | Native variants; a variant picker that disables non-existent combinations | No |
| Enquiry form on high-value products | Native Shopify form in a product block, with hCaptcha | No |
| Chaptered story page | Custom section with repeatable chapter blocks, or a `story_chapter` metaobject | No |
| Scroll reveals and staggered entrances | IntersectionObserver plus CSS transitions, roughly 30 lines, wrapped in `prefers-reduced-motion` | No |
| Testimonials tied to artworks | `testimonial` metaobject with a `product_reference` field | No |
| Contact with intent routing | Native form with a subject selector | No |
| Free shipping progress | Small Liquid and JS against `cart.total_price` and a threshold setting | No |
| Newsletter | Native Shopify customer capture, or an email platform when Ranjeeta picks one | App only if she wants automation |
| Notify-me on sold originals | Shopify native back-in-stock, or a custom form writing to a customer metafield | Possibly an app |
| Reviews | An app is the practical route if reviews are wanted at all | App |
| Courses | Out of scope for the theme. An external platform, as Rinske does, or a Shopify digital-product app | External |

### 17.3 The only things that genuinely need more

- **Reviews**, if we want them. My recommendation is to question whether star ratings belong on unique original artwork at all. Curated long-form testimonials as a metaobject may serve Zita better and need no app.
- **Back-in-stock or notify-me**, which may warrant an app depending on how it is framed for unique work.
- **Courses or digital products**, if Ranjeeta ever has them, which are better hosted externally or through a dedicated app.

Everything else is theme work.

### 17.4 Building a bespoke Zita theme on Dawn

**This is viable and I recommend it.** Dawn gives us an accessible, fast, well-tested foundation with a coherent token system, and Shopify maintains it. The approach:

1. Start from Dawn, keep its token architecture (`--color-base-*`, `--page-width`, `--spacing-sections-*`, `--font-*-scale`), and reset the values to Zita's palette and type.
2. Keep Dawn's cart, search, predictive search, facets, accessibility behaviour and checkout paths untouched. That is commerce infrastructure and there is no upside in rewriting it.
3. Replace the sections that carry the artistic identity: hero, collection template, originals product template, story page, series pages.
4. Add the metafield and metaobject definitions before building any of those sections, because the data model determines what the sections can do.
5. Keep custom JavaScript to IntersectionObserver reveals and a variant-availability enhancement. No libraries.

---

## 18. Final synthesis

### Key Takeaways

1. **Shopify CONFIRMED. Dawn architecture CONFIRMED. Exact theme name NOT identifiable** from public evidence in this environment, because `Shopify.theme` lives in an inline script. I am not guessing it.
2. **No custom section development was found anywhere.** Across seven pages, not one theme-asset URL appeared. This is a configuration achievement, not an engineering one.
3. **A second, non-Dawn theme sits unpublished in the store** at slot 14, on a completely different CSS architecture.
4. **The quality comes from photography, square-native artwork, product information and writing.** All four are content decisions available to us at no technical cost.
5. **Product information is the standout strength**, and it is precisely what Dimitra Milan's originals lack. Rinske answers every physical question; Dimitra answers almost none.
6. **The artist story is editorially excellent and visually plain**, which is the exact inverse of Dimitra Milan. Ranjeeta should take structure from Rinske and treatment from Dimitra.
7. **Series as navigation is the best structural idea on the site**, and it is cheap: manual collections in a menu.
8. **The homepage hero contains no artwork and its CTA leaves the domain.** For an art storefront this is the most questionable decision here.
9. **There are live defects on revenue pages:** a broken form shortcode on commissions, a contact button labelled "Subscribe", and a product handle that names a different painting.
10. **Neither reference site has solved the collection page or the high-value originals page.** That is where Zita can be genuinely original rather than derivative.

### What Makes Rinske Douna Feel High-End

Specific reasons, in order of contribution:

1. **Consistent, whole, uncropped square artwork at generous scale.** Nothing is cut off, so nothing feels like stock.
2. **Restraint.** No popups observed, no countdowns, no visitor counters, no urgency theatre on the work itself.
3. **Generous whitespace** through Dawn's section spacing tokens, unmodified and unhurried.
4. **Total material honesty.** Naming Hahnemühle, stating the varnish, giving both unit systems, saying where it ships from and how long it takes. Precision reads as confidence.
5. **Plain visible pricing** across a 20x range.
6. **Writing that sounds like a person**, from "Join my art gang! ;-)" to "capturing a feeling, not a perfect image".
7. **Minimal card furniture.** Title and price, so the eye stays on the painting.

Note what is absent from that list: custom layout, unusual typography, motion, and distinctive composition. **The site feels high-end because of discipline, not design ambition.** That is worth internalising, and it is also why Zita has room to be more ambitious without much risk.

### Adopt for Zita

1. Dawn or a Dawn-derived base on Online Store 2.0, rebuilt section by section.
2. Two breakpoints: 750px and 990px.
3. Shopify native Search & Discovery filtering, driven by a designed taxonomy.
4. Native contact form and newsletter; a light app stack by policy.
5. Native Shopify policy templates, deliberately plain.
6. Dual-unit dimensions on every artwork, enforced by metafield.
7. Visible prices, no gating.
8. A craft-led blog rather than an announcements blog.
9. A one-line reassurance at the top of every collection.

### Adapt for Zita

1. **Series as the organising principle**, upgraded to metaobjects, extended to originals, and linked from product pages.
2. **Complete physical specification**, held as structured metafields rather than prose, and designed to look composed.
3. **The chaptered artist story**, with Rinske's structure and Dimitra's visual treatment, ending on the work rather than on a newsletter box.
4. **One testimonial per revenue line**, each naming and linking a specific artwork.
5. **Whole-artwork presentation**, reinterpreted for whatever aspect ratios Ranjeeta actually paints.
6. **An explicit, well-explained finishing option** on prints.

### Invent for Zita

1. **Collection pages as curated exhibitions.** Neither reference has done this. Biggest opportunity.
2. **The original-artwork page as a gallery experience** with story, provenance, scale reference and a real enquiry route. Neither reference has solved it.
3. **Homepage rhythm** that is a composition rather than a stack.
4. **A small, purposeful motion language** with reduced-motion support.
5. **The original-to-print relationship**, which both references miss entirely.
6. **A deliberate sold-work strategy** plus a re-engagement path.
7. **A typographic signature** that belongs to Ranjeeta's work.

### Things We Should Not Inherit

1. A hero with no artwork and an off-domain CTA.
2. Broken app embeds and mislabelled form buttons.
3. Permanent sitewide "On Sale" pricing.
4. Filters that cannot narrow anything (Brand and Product type on a single-artist store).
5. Star ratings on unique originals, and ratings built on zero or one review.
6. Specification-only product descriptions with no story.
7. A story page with no imagery, ending at a newsletter box.
8. Product handles that do not match the product.
9. Two email addresses and two competing email capture fields.
10. Auto-generated vendor collections left exposed.
11. Three stacked bars above the fold.
12. A quantity stepper on a one-of-a-kind painting.

### Shopify Architecture Lessons

1. **A stock theme's ceiling is high.** Rinske reaches a credible, professional standard with zero custom sections. Anything we build above that is upside, not catching up.
2. **Dawn's token system is a real design system.** Adopt its structure rather than inventing one.
3. **The data model is the product.** Every weakness in Rinske's filtering, series linking and cross-selling traces back to prose in `body_html` and missing tags. **Define metafields and metaobjects before building sections.**
4. **Keep commerce infrastructure stock.** Cart, search, facets, checkout and accessibility behaviour should stay Dawn's. Spend the effort on the artistic surfaces.
5. **Custom sections inside a theme are the right unit of ambition**, proven by Dimitra's Print Club page and by the absence of any equivalent here.
6. **Apps are a liability surface.** The one app on this site is the thing that is visibly broken.
7. **Storefronts decay.** Whatever we ship needs a periodic audit, because broken shortcodes and mislabelled buttons are what happens otherwise.
8. **The `?section_id=` endpoint is a useful diagnostic** for inspecting any Shopify storefront's structure, including our own during development.

### Questions Requiring Further Technical Investigation

**Needs a browser with developer tools (all quick):**

1. **The actual font families.** Read the computed `font-family` on a heading and a paragraph, or find the `@font-face` block in view-source. Unresolvable by fetching.
2. **The real colour scheme values.** Read `--color-base-text`, `--color-base-background-1`, `--color-base-accent-1` and the button colours from `:root`, then re-run contrast properly.
3. **Where `#94b397` is actually used.** If it sits behind white text or is used as link colour on white, it fails WCAG at 2.29:1.
4. **The exact theme name** from the inline `Shopify.theme` object. One glance at view-source settles it.
5. **Mobile rendering** at 375px, 390px and 768px across homepage, both collections, both product types, the story page, navigation and cart.
6. **Whether `prefers-reduced-motion` is honoured.**
7. **Which review app** writes the rating metafields.
8. **Heading structure** on the homepage, specifically whether more than one `h1` exists.
9. **Core Web Vitals** on a throttled mobile connection, particularly the hero and the 200-plus-option country selector.

**Needs Shopify-side investigation:**

10. Confirm the 135-versus-15 gap on `original-art` is publication status rather than something else, and confirm 25 versus 21 on `prints`.
11. Confirm the form-builder app identity from the `{formbuilder:}` shortcode.
12. Verify current Search & Discovery capability for filtering on metafields, so we know whether series, orientation and size band can be faceted without an app.
13. Check metaobject limits and Theme Editor ergonomics for owner-managed series, chapters and testimonials.

### Questions for Ranjeeta

**About the work itself**

1. **What aspect ratios do you actually paint?** Rinske's square-native catalogue solves her grid problem permanently. If your work is mixed, we need a different presentation strategy, and it changes the collection design significantly.
2. **Do you work in series?** This is the most valuable structural idea in this audit, but it only works if it is true. If you paint one-offs, we should not fake it.
3. **How much are you willing to write per artwork?** Rinske writes specification; Dimitra writes almost nothing. The best version writes both. I would rather design the originals template around your honest answer than an aspirational one.
4. **Is there a story behind individual pieces that you want told?** For abstract work this is the difference between a product and an artwork.

**About the business**

5. **What are your actual revenue lines**, and which one should own the first screen? Rinske gives hers to courses, off-domain. Is there anything for you that competes with artwork for that space?
6. **Do you want sold work visible or hidden?** Rinske hides roughly 120 sold originals. Dimitra shows 57 sold out of 85. Both are defensible; they say different things.
7. **Do you take commissions**, and if so should the enquiry live on the artwork pages, as Dimitra does?
8. **Do you want prints and originals of the same image linked?** Neither reference does it, and it is free to build.
9. **What is your print production route**, and does it constrain sizes, finishes and options?

**About tone and identity**

10. **Which feeling do you want: Rinske's calm studio, or Dimitra's warm gallery?** They are genuinely different and the palette, typography and rhythm all follow from the answer. This is the single most useful thing you could tell us before we design anything.
11. **Do you want reviews and star ratings at all?** My recommendation is no stars on originals, and curated long-form testimonials instead.
12. **How do you want to sound?** Rinske writes "Join my art gang! ;-)". That is very much a voice. What is yours?

**About operations**

13. **What do you want to be able to change yourself** without a developer? That answer determines how much goes into metafields, metaobjects and theme settings rather than into code.
14. **Do you have a blog practice, or the appetite to start one?** Rinske's 22 craft posts are doing real work for her.

---

*Prepared as technical and design research for the Zita's Art Studio redesign. Rinske Douna's artwork, photography, written content, branding and distinctive page compositions are not to be reproduced. General design, UX and technical patterns identified in section 15 are adoptable or adaptable as noted.*