# Dimitra Milan: Site Audit

| | |
|---|---|
| **Audit date** | 17 September 2026 |
| **Site URL** | https://www.dimitramilan.com/ |
| **Platform** | Shopify (confirmed) |
| **Theme** | **Impulse** by Archetype Themes (confirmed from theme stylesheet header) |
| **Theme type** | Commercial premium theme from the Shopify Theme Store, heavily configured, with at least one hand-built custom template |
| **Confidence** | High on platform, theme, apps, page structure and product data. Medium on which sections are native versus custom. Low on mobile rendering (inferred from the stylesheet, not visually verified) and on anything inside the Shopify admin. |
| **Method** | Live fetches of the rendered pages, the compiled theme stylesheet at `/cdn/shop/t/9/assets/theme.css`, and the public `products.json` endpoint. No admin access. |

> **Purpose and boundary.** This is technical and strategic research only. Nothing in Dimitra Milan's layouts, artwork, copy, branding or graphics should be reproduced for Zita's Art Studio. Section 11 separates the transferable principles from the specific expression, and names what we should deliberately avoid.

---

## 1. Platform and theme investigation

### 1.1 Shopify: confirmed

Direct evidence in the page source:

- `<meta name="shopify-digital-wallet" content="/55517610183/digital_wallets/dialog">`, which also exposes the shop ID `55517610183`
- Shopify session cookies `shopify-s` and `shopify-y` as meta tags
- Asset paths under `/cdn/shop/files/…` and `/cdn/shop/t/9/assets/…`
- Canonical Shopify routes in use: `/collections/…`, `/products/…`, `/pages/…`, `/policies/…`, `/cart`, `/account`, `/search`
- The public `/collections/<handle>/products.json` endpoint returns standard Shopify product JSON
- A "Powered by Shopify" link in the footer
- Shopify Markets country and currency selector, roughly 200 countries listed

### 1.2 Theme: Impulse by Archetype Themes (confirmed)

The compiled stylesheet at `https://www.dimitramilan.com/cdn/shop/t/9/assets/theme.css` opens with the vendor banner:

```css
@charset "UTF-8";/*!
  Impulse, by Archetype Themes
  http://archetypethemes.co
*/
```

That is a direct attribution from the theme author, not an inference. Impulse is a paid theme on the Shopify Theme Store (roughly $380 to $500 one time, currently on the 9.x line). The `t/9` path segment is the store's internal theme slot, not the theme version.

**Supporting fingerprints found in the same stylesheet**, all of which are Impulse signatures rather than generic Shopify:

| Fingerprint | What it indicates |
|---|---|
| `flickity-*` classes and `hero[data-arrows]`, `[data-bars=true]` page dots | Flickity carousel, Impulse's slideshow and product-media engine |
| `noUi-*` classes | noUiSlider, used for the price range filter on collection pages |
| `--colorBtnPrimary`, `--typeHeaderPrimary`, `--typeBaseSize`, `--buttonRadius` | Impulse's CSS custom property naming convention, populated from theme settings |
| `[data-button_style=angled\|square\|round]` | Impulse's button style setting, including the skewed "angled" variant |
| `.grid-product__image-mask`, `.grid-product__tag`, `.quick-add-btn` | Impulse product card markup |
| `predictive-search`, `newsletter-reminder`, `tool-tip`, `image-compare`, `product-recommendations[data-intent=complementary]` | Impulse custom elements (web components) |
| `.svg-mask--splat-1` … `--splat-4`, `--star`, `--rounded-wave` | Impulse decorative image masks |
| `.hotspots`, `.countdown-layout--hero`, `.scrolling-text` | Impulse promotional sections |
| `[data-aos=image-fade-in]`, `.appear-animation`, `.appear-delay-1…20`, `[data-disable-animations]` | Impulse's scroll-reveal system, an AOS-style implementation |
| Legacy `.spr-*` rules | Shopify Product Reviews styling still shipped in the theme, now superseded by Judge.me on this store |

### 1.3 Degree of customization

The honest read is **a heavily configured commercial theme, plus one genuinely custom template**.

Evidence for "configured, not rebuilt":
- The compiled `theme.css` is unmodified Impulse. The vendor banner is intact and the ruleset matches stock Impulse features, including sections this store does not appear to use (age verification popup, countdown timer, before/after image comparison).
- The palette, type scale, button style and animation behaviour all come through theme settings as CSS variables on `:root`, which is the normal Theme Editor path.
- The homepage, collection pages and standard product pages map cleanly onto stock Impulse sections.

Evidence for real custom development, concentrated on the **Dreamers Print Club** page:
- That page references bespoke image assets stored in the **theme assets directory**, not in Shopify Files: `/cdn/shop/t/9/assets/dreamers-colony-honeycomb-ink.webp`, `dreamers-colony-bee-gold.png`, `dreamers-colony-bee-dark.png`, `dreamers-colony-bee-honey.png`, `dreamers-colony-hive.webp`. Merchant-uploaded imagery lands under `/cdn/shop/files/`. Assets under `/cdn/shop/t/<id>/assets/` were placed there by someone editing theme code, which means Liquid written by hand with `{{ 'dreamers-colony-hive.webp' | asset_url }}`.
- The page carries a named in-page anchor, `#DreamersCollectivePurchase`, targeted by three separate CTAs. Stock Impulse sections do not emit that identifier.
- Its layout vocabulary (editorial kickers such as "The lead story", "Subscription desk", "The print desk", "The information desk", a numbered 01/02/03 explainer, a prepaid plan comparison table, a spec trio) has no equivalent in stock Impulse.

**This is the most useful finding in the whole audit.** The most distinctive page on the site was built by writing custom sections inside a commercial theme, not by abandoning the theme. That is precisely the architecture our project defaults to.

> **Diagnostic worth reusing:** the `/cdn/shop/files/` versus `/cdn/shop/t/<id>/assets/` split is a fast, reliable way to tell merchant-configured content from developer-built content on any Shopify storefront.

### 1.4 Third-party services and apps

**Confirmed from the markup:**

| Service | Evidence | Role |
|---|---|---|
| **Judge.me** | `review-images.judgeme.com` image host, `#judgeme_product_reviews` anchors, "Let customers speak for us" carousel, `/pages/reviews` | Product and store reviews. 333 reviews, 93% five star |
| **Loop Subscriptions** | App proxy path `/a/loop_subscriptions/customer`, linked from the footer as "Manage Subscription" and from the Print Club FAQ | Customer-facing subscription management portal |
| **Shopify native selling plans** | `selling_plan_allocations`, `selling_plan_group_id`, `requires_selling_plan: true` in variant JSON | The subscription contracts themselves are native Shopify, with Loop layered on for management |
| **hCaptcha** | Disclosure text on the commission form embedded in the original-artwork product page | Shopify's native form spam protection |
| **Kit (formerly ConvertKit)** | `https://dimitra-milan.kit.com/92854327c0`, the "Become a Dreamer" CTA on the About page | Primary email list, sitting alongside a separate Shopify-native footer newsletter form |
| **Shopify Markets** | ~200-country selector; AUD for Australia, USD for everywhere else | International pricing and currency |
| **PayPal** | `logo-paypal` in the footer payment icons | Accelerated checkout |
| **Meta and Google verification** | `facebook-domain-verification`, `google-site-verification` meta tags | Ads and Search Console |
| **Lumaprints** | `"vendor": "Lumaprints"` on most print products | Print-on-demand producer |

**Likely but not proven:** a fulfilment integration with Lumaprints (the vendor field alone only proves the name is recorded); an app or custom snippet behind the "users are viewing this just now" line on product pages, which renders with an empty count in the fetched HTML and is therefore populated by client-side JavaScript.

**Worth noting for our own stack:** two overlapping email capture systems (Kit and Shopify's native form) and two overlapping review presentations (the Judge.me widget and the theme's legacy `spr-*` styling) are both signs of accumulated tooling. We should decide the single system of record for each job up front.

---

## 2. Global design language

### 2.1 Colour

The palette is set entirely through theme settings and compiles to CSS variables on `:root`:

| Token | Value | Applied to |
|---|---|---|
| `--colorBody` | `#f7ecec` | Page background, a warm blush rather than white |
| `--colorTextBody` | `#501414` | Body text, a deep oxblood rather than black |
| `--colorBtnPrimary` / `--colorPrice` / `--colorAnnouncement` | `#8e3857` | Buttons, prices, announcement bar |
| `--colorLargeImageBg` | `#501414` | Placeholder behind large images |
| `--colorFooter` | `#ffffff` | Footer background |
| `--colorSaleTag` | `#c20000` | Sale badges |
| `--colorImageOverlayOpacity` | `.1` | Overlay on hero imagery |

**Why it works.** Three decisions are doing the heavy lifting. First, nothing on the page is pure white or pure black, so the chrome never competes with the artwork for the eye's white point. Second, the whole palette is a single warm rose family, which means it reads as a deliberate frame around paintings that are themselves warm and romantic, rather than as a brand colour applied on top of them. Third, the one saturated colour (`#8e3857`) is reserved almost entirely for actions and prices, so commercial elements are legible without being loud.

**Accessibility check** (computed, WCAG contrast ratios):

| Pair | Ratio | Verdict |
|---|---|---|
| Body text `#501414` on background `#f7ecec` | **12.52:1** | Passes AAA comfortably |
| White on primary button `#8e3857` | **7.36:1** | Passes AAA for normal text |
| Price `#8e3857` on background | **6.37:1** | Passes AA, passes AAA for large text |
| Footer text `#501414` on white | **14.47:1** | Passes AAA |

This is a good result and worth calling out: a soft, atmospheric palette does not require weak contrast. We can chase mood for Zita without paying for it in legibility.

Two caveats. Hero text is white over photography at only 10% overlay opacity, with a text shadow variable set to `0.2`. Contrast there depends entirely on the image behind it and is not guaranteed. And the country/currency selector renders roughly 200 links into the DOM twice per page, in the header drawer and again in the footer, which is a real weight cost on a page whose job is showing large images.

### 2.2 Typography

The type system is driven by theme variables (`--typeHeaderPrimary`, `--typeBasePrimary`, `--typeHeaderSize`, `--typeBaseSize`, `--typeHeaderSpacing`), whose values are injected inline per store. **The actual font families are not visible in the compiled stylesheet**, so I am not naming them. What the compiled rules do establish:

- A clear two-role system: a display family for `h1` to `h3`, a separate text family for body, buttons, inputs and small headings.
- Headings scale down on mobile by ratio, not by a separate value: `h1` is `calc(var(--typeHeaderSize) * .85)` below 769px and full size above.
- `h4`, `h5`, `h6`, `label`, `.subheading` and buttons all share one treatment: `0.8em`, uppercase, `0.3em` letter-spacing. This creates a single consistent "small label" voice across the site: section kickers, form labels, button text and the cart subtotal all read as the same typographic object.
- Buttons are uppercase, bold, `0.3em` tracked, with a minimum font size floor of 13px desktop and 11px mobile.
- A `data-type_header_capitalize` flag allows all headings to be forced to uppercase globally.

**Why it works.** The wide-tracked uppercase micro-label is the single most recognisable typographic move on the site. It does two jobs at once: it signals "gallery" and "editorial" rather than "shop", and because it is small and uniform, it lets headings and artwork carry all the visual weight. This is a cheap, highly transferable idea.

**Worth noting:** `0.3em` tracking on an 11px uppercase button on mobile is near the lower bound of comfortable reading. If we borrow the treatment, we should set the floor higher.

### 2.3 Whitespace, scale and layout rhythm

- Page container maxes out at 1500px with 17px side padding on mobile and 40px above 769px.
- Section vertical padding is 40px on mobile and 75px on desktop, so sections breathe roughly twice as much on desktop.
- Narrow and tiny container variants (1000px, 450px) exist for text-led and form-led blocks.
- Grid gutters are 17px mobile and 22px desktop.
- Hero and feature imagery is served at up to `width=2400`, and one source image on the homepage is requested at `width=5760`.

The page rhythm alternates deliberately: full-bleed image, then contained text, then a grid, then full-bleed image again. Nothing repeats the same width twice in a row for long. That alternation is what stops the page reading as a stack of Shopify sections even though, structurally, it largely is one.

**Why it works.** Artwork gets the full viewport; words get a narrow, comfortable measure. The contrast in width is itself the hierarchy. No decorative framing is needed.

### 2.4 Image treatment

- Fixed aspect-ratio containers with `object-fit: cover` (`.grid__image-ratio--square`, `--portrait` at 150%, `--landscape` at 75%, `--wide` at 56.25%), so grids stay even regardless of source dimensions.
- A `--colorSmallImageBg` placeholder colour fills the box before the image paints, which prevents layout shift and white flashes.
- Product cards carry a second image revealed on hover, used consistently across collections.
- Product images support click-to-zoom in a lightbox (`icon-search`, `Close (esc)`), with a 1800×1800 source.
- Modern formats are in use: `.webp` heroes alongside `.jpg`, with Shopify's `?width=` transform parameters.
- Decorative SVG masks are available in the theme but appear unused here, which is a good restraint call: no splatter-shaped crops on paintings.

**Why it works.** Uniform ratios in grids plus unconstrained scale in heroes. The grid is the index, the hero is the exhibition. Cropping paintings into fixed squares on a collection page is a real compromise, but it buys a calm, scannable index; the full, uncropped image is one click away.

### 2.5 Navigation, header and footer

**Header:** logo image (served at 280px and 220px widths), horizontal menu with two dropdown parents, then account, predictive search and a cart that opens as a right-hand drawer (350px mobile, 450px desktop). A rotating announcement bar sits above, with play and pause controls.

**Footer:** a link menu, a newsletter signup ("Join the Dreamer community", "Get a weekly peek into my studio and what's inspiring me"), four social links, the country and currency selector, and the Shopify attribution.

**Why it works.** The header is short, six items, and every one is a noun a collector would use. The cart is a drawer rather than a page, so adding to cart never interrupts browsing. The newsletter promise is specific ("a weekly peek into my studio") rather than generic, which is a much better ask than "subscribe for updates".

### 2.6 Motion

Motion is theme-native and restrained:

- Scroll-reveal: elements start at `opacity: 0` and `translateY(60px)` and settle over 1s on a `cubic-bezier(.165,.84,.44,1)` easing.
- Staggering: `appear-delay-1` through `appear-delay-20` and row-aware delays (`row-of-3`, `row-of-4`, `row-of-5`, `row-of-6`) so grid items cascade in rather than appearing as a block.
- Images fade in over 0.5s on load.
- A `shine` sweep animation runs across primary buttons on hover.
- A continuous `scrolling-text` marquee, used on the homepage.
- A global `[data-disable-animations=true]` escape hatch.

**Why it works.** Every animation is entrance-only and short. Nothing moves once it has arrived, except the marquee. The staggered grid cascade is the one moment of real delight and it costs nothing in comprehension.

**Gap to verify:** I found the `data-disable-animations` theme toggle but **no `prefers-reduced-motion` media query** in the compiled stylesheet. If that holds, the reduced-motion preference is not honoured. For Zita this is non-negotiable and belongs on the build checklist.

### 2.7 Overall artistic character

The site reads as **a warm gallery catalogue that happens to sell**. The devices that produce that feeling are not expensive: an off-white warm ground, one saturated accent held back for actions, small tracked uppercase labels, alternating full-bleed and narrow-measure rhythm, first-person copy, and entrance-only motion. None of that requires headless architecture or unusual technology. It requires discipline in the theme settings and a handful of custom sections.

---

## 3. Homepage

Sections in document order, with an assessment of each.

### 3.1 Announcement bar (rotating)

- **Purpose:** time-boxed campaign promotion. Currently: "🌸✨ Get Your Art Featured in the Dreamers Collective. Submissions close September 20th. ✨🌸", linked to `/pages/submit`.
- **Layout:** full-width berry band above the header, with play and pause slideshow controls.
- **Implementation:** stock Impulse announcement bar with multiple blocks.
- **Verdict:** conventional, used well. It carries a deadline, which is what makes it work.

### 3.2 Hero slideshow

Two full-bleed slides:

1. Image `Cozy_-_queenship.webp` at `width=2400`. "Unwrap Beauty" / "Discover the Collector Favorites" / button "See My Most Beloved" → `/collections/collector-favorites`.
2. Image `4938674132669804467.jpg`. "DREAMERS PRINT CLUB✨" / "Collect a monthly treasure from my studio to your home" / button "Learn More" → `/products/dreamers-print-club-2`.

- **Artwork treatment:** edge to edge, no frame, text overlaid directly on the painting with a light 10% overlay.
- **CTA strategy:** the two slides split the audience by price sensitivity. Slide one goes to high-intent collectors, slide two to the $15 per month entry point. The whole funnel is present in the first viewport.
- **Motion:** Flickity with autoplay, dot or bar indicators, arrows, and accessible pause controls.
- **Implementation:** stock Impulse hero slideshow section.
- **Verdict:** conventional structure, elevated by the imagery and by the deliberate high-low pairing.

### 3.3 Scrolling marquee

"Receive a Beautiful Fine Art Print Every Month" repeated roughly 35 times, the whole strip linked to the Print Club product.

- **Implementation:** confirmed native. `@keyframes scrolling-text` and `.scrolling-text__inner` with a `--move-speed` variable exist in stock Impulse. Hover pauses the animation.
- **Verdict:** conventional. It is the most "theme-like" moment on the page, and arguably the least distinctive. Worth noting it repeats the message the hero slide just made.

### 3.4 "Shop by collection"

Six tiles: Collect Fine Art Prints, Dreamers Print Club, t-shirts & totes, Catch up on past prints, Originals, Books.

- **Purpose:** the real navigation layer. It exposes collections that the six-item header menu cannot hold.
- **Implementation:** stock Impulse collection list section.
- **Verdict:** conventional, and slightly undercooked. The ordering puts prints and merchandise ahead of Originals, which is a revealing commercial choice rather than an artistic one.

### 3.5 Featured product

"Anchor of My Soul", $550, an 11×14in watercolour and graphite original, marked **Sold Out**. Two images, zoom enabled, full variant JSON embedded.

- **Verdict:** a sold-out original as the featured product is a deliberate statement (the work sells) but it is also a dead end for the visitor, with no waitlist or notify-me path. See section 11.2.

### 3.6 Promotional band: "new prints"

Kicker "new prints", heading "Beauty speaks louder than words", subheading "Give a special and unforgettable gift this holiday season", button "shop now" → `/collections/canvas-framed-prints`.

- **Verdict:** **stale content.** This is holiday copy live on 17 September. It is a small thing, and it is exactly the sort of decay that follows when campaign copy is hard-coded rather than scheduled. A lesson for our own build: seasonal blocks need an obvious owner-editable home and ideally a visible "last edited" cue.

### 3.7 Print Club feature block

Heading, explanation of the offer (a new 5×7" print each month, a written reflection, a chance to win an original watercolour), "Learn More" button.

- **Implementation:** stock Impulse image-with-text.
- **Verdict:** conventional layout, strong copy. Note the offer is explained three separate times on the homepage (hero, marquee, this block).

### 3.8 Manifesto block: "Are you an art collector?"

A short rich-text piece: "**Beware:** once you start, you will be addicted… **Life with art is meaningful, rich, passionate.**… you can't live without it."

- **Purpose:** this is the most interesting block on the page. It sells **the act of collecting**, not any product. It reframes the visitor's identity before asking them to buy.
- **Implementation:** a rich-text section, essentially free to build.
- **Verdict:** conventional in construction, distinctive in intent. High-value principle, near-zero technical cost.

### 3.9 Studio band

Full-bleed studio photograph (requested at `width=5760`), heading "welcome to my studio", subheading "Living as a professional artist since the age of 15", button "read my story" → About.

- **Verdict:** one line does the entire credibility job. A specific, verifiable, surprising fact beats a paragraph of biography.

### 3.10 Testimonials: "What the dreamers are saying…"

Eight long-form collector stories with five-star ratings and, in most cases, a thumbnail of the specific artwork that collector bought.

- **Purpose:** these are not product reviews. They are accounts of what living with the work did for someone, several hundred words each, covering grief, faith, an engagement, a move.
- **Verdict:** the strongest social proof on the site by a wide margin, and structurally trivial (a slider of blocks with quote, name, optional image). The value is entirely in the curation.

### 3.11 Artist statement band

Full-bleed painting, heading "Unfolding a Realm of Possibilities", a quotation about painting women and animals together, button "view original artwork" → `/collections/available-originals`.

- **Verdict:** the one place the artist explains her subject matter in her own voice, and it is placed immediately before the link to buy originals. Good sequencing.

### 3.12 Judge.me review carousel

"Let customers speak for us", 333 reviews, dated entries with product names.

- **Verdict:** an app block. **It renders twice on several templates.** See defects, section 11.2.

### 3.13 Footer

Menu (Manage Subscription, Search, Privacy Policy, Refund Policy, Terms, Contact Me, Shipping Policy), newsletter, social icons, country and currency selector, Shopify attribution.

### Conventional versus custom, summarised

| Feels conventional Shopify | Feels editorial or custom |
|---|---|
| Hero slideshow, marquee, collection tiles, featured product, review carousel | Manifesto block, testimonial curation, artist statement placement, the overall alternating rhythm |

**The important conclusion:** almost every homepage section is a stock Impulse section. The homepage feels distinctive because of imagery, copy, colour and sequencing, not because of custom code. That is both encouraging (we can achieve a lot cheaply) and a warning (stock sections can still produce a stack-of-sections feeling, which the homepage here does not fully escape).

---

## 4. Navigation and information architecture

### 4.1 Main menu

| Item | Destination | Children |
|---|---|---|
| Originals | `/collections/originals/Originals` | none |
| Fine Art Reproductions | `/collections/collector-favorites` | Canvas + Framed Prints, Collector Favorites, Tapestries, Fine Art Books, T's & Totes |
| Print Club | `/products/dreamers-print-club-2` | Submit to the Dreamers Collective, Dreamers Print Club, Dreamers Creator Club, Catch up on past prints |
| Commissions | `/pages/commissions` | none |
| About | `/pages/about-dimitra-milan` | none |
| Log in | `/account` | none |

Plus search and cart. Footer carries policies, contact and the subscription portal.

### 4.2 What the structure says

The IA is organised by **what the buyer gets**, not by how a gallery would catalogue work. Four commercial tiers are exposed as top-level peers:

1. **Originals**: one of a kind, $400 to $23,040
2. **Reproductions**: prints, tapestries, books, apparel, $25 to $400
3. **Print Club**: recurring, $15 per month
4. **Commissions**: bespoke, $650 to $3,450 and up

That is a complete price ladder visible in one menu bar, and it is the single smartest structural decision on the site. A visitor at any budget sees an entry point without scrolling.

### 4.3 How visitors actually move

- **Story → purchase:** homepage studio band → About → the About page ends on a Kit newsletter CTA, **not** on a link to buy. The story path terminates in email capture rather than commerce.
- **Originals → prints:** **broken.** There is no link from an original artwork page to its print edition, and none back. "In You, He Lives" exists both as a $12,096 original and a $125 to $250 print, and the two pages do not know about each other. This is the largest single missed opportunity on the site.
- **Print Club → community:** well developed. The Print Club product links to `/pages/submit`, which invites collectors to contribute to the newspaper, and the announcement bar promotes the deadline.
- **Purchase:** add to cart opens a drawer, checkout from there. No visible dynamic checkout or Shop Pay button on the product pages I fetched.

### 4.4 Structural defects worth recording

- **`/collections/originals/Originals`** is a malformed URL. Shopify reads the trailing segment as a tag filter, so the menu link points at a tag-filtered view rather than the clean collection, while the homepage tile points at `/collections/originals`. Two URLs for one destination, and the messier one is in the primary navigation.
- **Three overlapping originals collections** are referenced across the site: `/collections/originals`, `/collections/available-originals`, and the tag-filtered variant. The relationship between them is not explained to the visitor.
- **No journal or blog** in the navigation, despite an artist with a strong written voice. The writing lives inside product descriptions and a printed newspaper instead.

---

## 5. Collection pages

Representative page inspected: `/collections/originals` (85 products).

### 5.1 Layout

1. Full-bleed collection banner image at `width=2400`
2. `h1` "Originals"
3. Subheading "Allow yourself to live in a dream" (the collection description used as a single poetic line, not as SEO prose)
4. Filter drawer trigger and sort control
5. Product count: "85 products"
6. Grid
7. Numbered pagination (1, 2, 3, 4, Next), 28 products per page
8. Judge.me review carousel

### 5.2 Filtering and sorting

Filters exposed (Shopify Search & Discovery style, rendered by Impulse):

| Filter | Values |
|---|---|
| Availability | In stock (28), Out of stock (57) |
| Price | noUiSlider range |
| Product type | Original Painting (30), Watercolor Sketch (8) |
| Size | 16x20 (1), 30" x 40" (1), 18x24 Gallery Wrapped Canvas (1), 16x20 Linen Canvas in Painted Plexiglass Shadow Box (1) |
| Product rating count | 1 (9), 6 (1) |

Sort options: Featured, Most relevant, Best selling, Alphabetically A-Z and Z-A, Price low to high and high to low, Date old to new and new to old.

**Assessment.** Availability and price are genuinely useful on a collection where two thirds of the work is sold. The rest is a data hygiene problem showing through the interface:

- **Product type** covers only 38 of 85 products, so 47 items are untyped and invisible to that filter.
- **Size** has four values with one product each, and the values mix a dimension (`16x20`) with a full material description (`16x20 Linen Canvas in Painted Plexiglass Shadow Box`). As a filter it is useless; as a signal about catalogue discipline it is loud.
- **Product rating count** is a Judge.me metafield surfaced as a shopper-facing filter. No visitor wants to filter paintings by how many reviews they have.

The lesson is not about the theme. Filters expose the quality of the product data. If we want filtering for Zita (by medium, orientation, palette, size band, availability), the taxonomy has to be designed and enforced before the interface is built.

### 5.3 Grid and cards

- Uniform aspect-ratio tiles with `object-fit: cover`
- Primary image plus a secondary image swapped on hover, used consistently
- Card content: "Sold Out" badge where applicable, then title and price on one line
- No artist name (correctly, it is a single-artist store), no medium, no dimensions, no year

**Why the minimal card works.** With title and price only, the eye moves image to image rather than reading. The grid behaves like a contact sheet. The cost is that a visitor cannot tell a 48×60in oil from an 11×14in watercolour sketch without clicking, on a page where those differ by a factor of forty in price.

### 5.4 Merchandising

Sold-out work stays in the grid. 57 of 85 originals are unavailable. This is a real choice with a real trade-off: the collection reads as a **body of work and a sales record** rather than as an inventory list, which is powerful positioning for an artist. But the visitor's most common click result is a dead end, and there is no notify-me, no waitlist, and no cross-link to the print edition.

### 5.5 Editorial content

There is none inside the grid. No interleaved statements, no chapter breaks, no process imagery between rows. The collection page is the most conventional template on the site and the most obvious place where our project can do something better.

### 5.6 Mobile behaviour

Inferred from the stylesheet, not visually verified:
- Filters collapse into a drawer (`icon-X Close menu` markup is present)
- Grid gutter drops from 22px to 17px, page padding from 40px to 17px
- `.small--one-half` utilities suggest two columns on small screens
- Sort control remains a native `select`, which is the right call on mobile

---

## 6. Original artwork product page

Page inspected: `/products/glory-on-the-horizon`, $20,160.

### 6.1 What is on the page

| Element | Content |
|---|---|
| Gallery | 4 images, click to zoom to 1800×1800 in a lightbox |
| Title | "Glory on the Horizon" |
| Price | "Regular price $20,160.00" |
| Tax and shipping | "Shipping calculated at checkout", linked to the shipping policy |
| Description | "Original 48x60 in. mixed media oil painting" (one line, the entire description) |
| Urgency | "users are viewing this just now", "Low stock - 1 item left", "Inventory on the way" |
| Purchase | "Add to cart". No dynamic checkout button present in the fetched markup |
| Accordion | "Shipping information": warm first-person copy, 2 to 3 business days handling, 3 to 7 days transit, collector responsible for VAT and duties |
| Form | "Want to commission a painting?" with Name, Email, Message, protected by hCaptcha |
| Reviews | Judge.me: "Be the first to write a review" |
| Editorial band | "Discover the Depth of Your Story" with supporting image |
| Related | "You may also like" |
| Recently viewed | Present, empty |

### 6.2 How it differs from a conventional Shopify PDP

**Genuinely different, and good:**
- **A commission enquiry form on the product page itself.** On a $20,160 artwork, the visitor who is not going to click "Add to cart" now has somewhere to go. This is the right instinct: at this price point the product page is a lead-capture surface, not just a buy button.
- **Shipping copy written in the artist's voice**, opening with "I'm so excited to ship artwork to you!" and a short reflection on what living with art does. A logistics accordion turned into brand voice.
- **An editorial band below the fold** ("Discover the Depth of Your Story") rather than an immediate product grid.
- **Warm palette and generous image scale**, so the page reads closer to a catalogue entry than a listing.

**Where it is still a conventional Shopify PDP, to its cost:**
- The description is **one line of specification**. On a five-figure painting there is no title story, no symbolism, no process, no year, no provenance, no certificate of authenticity, no framing or hanging guidance, no scale reference. The artist writes beautifully; none of that writing appears here. The information that would justify the price is absent, while the information that a print buyer needs is abundant on the print pages.
- **Scarcity widgets on a one-of-a-kind object.** "Low stock - 1 item left" and "Inventory on the way" are meaningless-to-absurd on an original painting, and "users are viewing this just now" reads as a conversion tactic on an object whose whole proposition is that it is unique. This actively undercuts the positioning.
- **A star-rating widget on a unique work**, inviting reviews of a painting that exactly one person will ever own.
- **"You may also like" returns the product itself.** Confirmed: the recommendation block on "Glory on the Horizon" shows "Glory on the Horizon". A broken cross-sell on the highest-value page on the site.
- **No link to the print edition**, where one exists.

### 6.3 Layout and mobile

Standard Impulse two-column product layout, media left and details right, collapsing to stacked on mobile. The theme supports both thumbnail and stacked media gallery modes (`[data-media-gallery-layout=stacked]` appears in the stylesheet). Mobile behaviour not visually verified.

---

## 7. Print product page

Page inspected: `/products/in-you-he-lives-print`, $125 to $250.

### 7.1 Structure

- **Gallery:** 14 images, including framed and unframed renders, room scenes and detail shots. Variant-linked featured images, so selecting a frame colour changes the displayed image.
- **Information order:** the description appears **above** the price, which is an Impulse block-ordering choice and an unusual one. It means the visitor reads what the product is before seeing what it costs.
- **Description:** production detail (museum-quality giclée on cotton canvas, hand-stretched; hot press fine art paper with a 1in white mat and a 1.25in wood frame), made to order, free US shipping, international shipping calculated at checkout, VAT and duties disclaimer, then an "About the Painting" passage in the artist's voice.
- **Options:** three sets, rendered as labelled button groups rather than dropdowns:
  - Material: Framed Print, Canvas Print
  - Size: 12x16in, 18x24in, 24x32in
  - Frame Color: White Frame, Oak Frame, No Frame
- **Price:** updates per variant, $125 to $250.
- **Availability:** "In stock, ready to ship", "Inventory on the way".
- **Purchase:** "Add to cart".
- **Accordions:** Shipping information (3 to 5 business days production, UPS/FedEx/USPS, ships to nearly every country **except Germany**, tracking by email) and an FAQ (ready to hang, international, timing).
- **Social share:** Facebook, Twitter, Pinterest.

### 7.2 Product data observations (from `products.json`)

| Observation | Detail |
|---|---|
| Vendor | `Lumaprints` on most prints, `Dimitra Milan Art` on studio-fulfilled items |
| `product_type` | Inconsistent across the catalogue: `Canvas Print`, `Framed Print`, `Fine Art Reproduction`, `Paper Print`, and empty string |
| Option order | **Not consistent between products.** "Everlasting Light" is Size / Material / Frame Color; "In You, He Lives" is Material / Size / Frame Color. The selector therefore appears in a different order on different print pages |
| Variant coverage | Only 6 variants against 2×3×3 = 18 possible combinations, so many selectable combinations do not exist (for example Canvas 18x24) |
| SKUs | Partially populated. Some variants carry structured SKUs (`BOLAL_IYHL_FP_1`), others are `null` or empty |
| Pricing | Some products carry `compare_at_price` (a live sale), others do not |
| Tags | Almost everything is simply `["Prints"]`, which is why filtering is thin |

### 7.3 Compared with the original artwork page

| | Original | Print |
|---|---|---|
| Images | 4 | 14 |
| Description | 1 line of specification | ~250 words, production plus story |
| Options | None | 3 option sets |
| Framing guidance | None | Detailed |
| FAQ | None | Yes |
| Shipping detail | Moderate | Extensive |
| Price | $20,160 | $125 to $250 |

**The inversion is the finding.** The $125 product is documented thoroughly and the $20,160 product is documented in one sentence. Print pages get room scenes, framing options, an FAQ and an artist's reflection; the original gets its dimensions. That is backwards relative to what each buyer needs in order to commit, and it is almost certainly a consequence of print products arriving through a print-on-demand pipeline with rich boilerplate while originals are entered by hand one at a time.

**For Zita this is the clearest content lesson in the audit:** the originals template must demand more content than the prints template, not less.

---

## 8. Other templates worth studying

### 8.1 Dreamers Print Club: `/products/dreamers-print-club-2`

**The most distinctive page on the site, and the clearest custom build.** It is a product page that does not look like a product page.

Sequence:

1. **Custom masthead.** Micro-labels "Published monthly · Print + paper · Monthly from Dimitra's studio", a hand-drawn honeycomb graphic, kicker "The monthly art paper for dreamers", title "The Dreamers Collective", strapline "For the hopeful, the beauty-seekers, the truth-tellers", price line "A fine art print and art paper, $15 per month", and an anchor CTA "Choose your plan" → `#DreamersCollectivePurchase`.
2. **"A closer look at the monthly mail"**: an irregular image collage with individual captions ("Past edition shown", "The monthly paper", "5x7 Fine art print", "From the studio"), not a uniform grid.
3. **"The lead story"**: explains the offer, with a plan summary card and a numbered 01 / 02 / 03 explainer: the paper, the print, the collection.
4. **Standard product gallery** (10 images) sitting inside the custom page.
5. **"Subscription desk / Choose your Print Club plan"**: the purchase module, at the anchor target. It includes issue mapping ("September orders receive issue 2. October orders receive issue 3."), the deferred-purchase consent statement, a written plan comparison ($15 monthly; $45 every 3 months; $90 every 6 months; $165 for 12 deliveries, saving $15), and a 30-day replacement guarantee.
6. **"Inside the paper"**, a pull quote, then **"The print desk"** with a three-item spec trio (Print size 5×7in / Paper Archival quality / Frequency Every month).
7. **"Packed in Florida. Sent by standard mail."**: honest fulfilment detail, including that standard mail carries no tracking.
8. **Community submissions** CTA → `/pages/submit`.
9. **"The information desk / Subscription notes"**: a six-question FAQ covering contents, renewal, arrival, pause/skip/cancel, international, and refunds (there are none; cancel before the next cycle).
10. **Closing CTA**, then **"💌 Love for the Club 💌"** testimonials with city attributions.

**Why it works.** The page borrows a **newspaper's own vocabulary** to sell a newspaper: "the lead story", "the print desk", "the information desk", "Dreamers Post". The metaphor is carried through labels, not through decoration, so it costs nothing in usability and transforms the register. Meanwhile the commercial mechanics are unusually honest: exact plan costs, what arrives, no tracking, no refunds, how to cancel. Warm framing plus blunt terms is a combination that builds trust rather than spending it.

**Technical notes.** `requires_selling_plan: true`, so the product cannot be bought one time. Four selling plans across two selling plan groups: one monthly group and one prepaid group containing the 3, 6 and 12 delivery options.

### 8.2 About: `/pages/about-dimitra-milan`

- Full-bleed hero, "About Dimitra Milan", "I'm Dimitra Milan", "Welcome to my dream world".
- **"Your Dreams Matter"**: a section written in the second person, about the visitor, not the artist: "You are a brave soul who clings to hope when the world feels dark." Placing the visitor's story inside the artist's About page is the most transferable idea on this page.
- A YouTube subscribe CTA.
- **"Click the + signs to read my story"**: an expandable five-chapter timeline: Childhood & Creative Exploration, Starting My Art Career, Becoming an Industry Leader, Personal & Artistic Growth, Artistic Legacy. It is full of specific, checkable numbers: first gallery show at 14, first major sale over $2,000, publisher representation at 15, over $1M of work sold by 16, self-representation at 17, co-owner and instructor at 18, self-published book at 18, press in Teen Vogue, My Modern Met and Bored Panda.
- "My Whole World": a family section.
- Closing CTA to the Kit list, "Become a Dreamer".

**Note on freshness:** this page served a different announcement bar and a slightly different menu than the rest of the site, and reported 327 Judge.me reviews where other pages reported 333. That points to page-level caching rather than a content error, but it is worth remembering that a heavily cached storefront can serve inconsistent navigation.

### 8.3 Commissions: `/pages/commissions`

- Two hero images, "Personalized paintings, as the artist sees you…", "Bring your vision to life".
- Expectation setting that is unusually direct: keep an open mind and do not force specific imagery; requests accepted only with a deposit; custom work takes 1 to 6 months; the deposit is non-refundable but transferable to any other product on the site.
- **Published pricing**, which most artists avoid: sketches at 15x22 for $650, 20x24 for $900, 22x30 for $1,200; oils at $8 per square inch with a minimum 18x24 at $3,450.
- CTA to an **external Google Form**, plus a YouTube delivery video and three commission photographs.

**Assessment.** Publishing the price formula is the strong move: it qualifies enquiries before they arrive and removes the awkward first conversation. Routing a $3,450-plus enquiry to a Google Form is the weak one, especially since a Shopify-native contact form with hCaptcha already exists elsewhere on the site. (Minor arithmetic note: 18×24 at $8 per square inch is $3,456, not $3,450.)

### 8.4 Cart

A right-hand drawer rather than a page: subtotal, "Shipping, taxes, and discount codes calculated at checkout", a checkout button, and an empty state. Stock Impulse.

---

## 9. Responsive and mobile experience

**Stated limitation.** I could not render the site at mobile widths in this environment. Everything below is read directly from the compiled stylesheet, which is reliable for layout rules and unreliable as a substitute for looking at the thing. Section 13 lists what needs a real device pass.

### 9.1 Breakpoints

Impulse uses three: `max-width: 768px` (small), `max-width: 959px` (medium-down), `min-width: 769px` (medium-up). Some container queries are also in play for predictive search results (`@container (min-width: 800px)`).

### 9.2 Layout transformations found in the CSS

| Element | Desktop | Mobile |
|---|---|---|
| Page padding | 40px | 17px |
| Section padding (vertical) | 75px | 40px |
| Grid gutter | 22px | 17px |
| Cart drawer | 450px | 350px, capped at 95% viewport width |
| Navigation | Horizontal menu with dropdowns | Hamburger into a left drawer |
| Hero slideshow arrows | Bottom right, 40px | 33px, repositioned closer to the edge |
| Slideshow bar indicators | 120px wide | 45px wide |
| Hotspots section | 70% image / 30% content side by side | Stacked, both 100% |
| Text-with-icons blocks | Row, up to 5 per row | Column, full width |
| Complementary recommendations | Vertical list | Horizontal card with a 30% image column |
| Newsletter reminder popup | 240px, bottom left | Full width minus 40px |
| Predictive search results | Two-column results | Full-bleed, edge to edge, capped at 75vh |
| Feature rows | Side by side at 33/50/66% | Stacked with 20px inset |

### 9.3 Typographic changes

- `h1` renders at 85% of the header size variable, `h2` at 73%, `h3` at 62%.
- Body copy renders at 92% of the base size below 769px.
- Buttons drop to `max(calc(var(--typeBaseSize) - 5px), 11px)` with tighter padding.
- Headings lose 5px of bottom margin.

### 9.4 Interaction changes

- **`input, select, textarea { font-size: 16px !important }` below 959px.** This is the correct fix for iOS Safari zooming on focus, and it is applied globally.
- Hover-swap product images have no mobile equivalent, so the second product image is simply unavailable on touch. Not a defect, but it means mobile shoppers see less per card.
- `.supports-touch.lock-scroll` handles background scroll locking when drawers open, with a WebKit-specific exception.
- Touch targets: close buttons are 28px icons with padding, which is under the 44px recommendation before padding is counted. Worth measuring rather than assuming.

### 9.5 Likely strengths and likely weaknesses

**Likely to work well:** full-bleed artwork is if anything better on a phone, where the image occupies the entire screen. The narrow text measure is already mobile-appropriate. The drawer cart and drawer navigation are the right patterns. The 16px input fix is handled.

**Likely to need attention:** the country and currency list renders roughly 200 links twice per page, which is pure weight on a mobile connection. Hero text over photography at 10% overlay is riskier on small screens where the crop may land on a light area. Uppercase 11px at `0.3em` tracking is at the edge of comfortable. And the absence of a `prefers-reduced-motion` query, if confirmed, matters most on mobile where scroll-driven reveals fire constantly.

---

## 10. Technical and Shopify architecture hypothesis

Labelled by evidence strength. **CONFIRMED** means directly observed in markup, stylesheet or API response.

### 10.1 Platform and theme

| Item | Status | Evidence |
|---|---|---|
| Shopify | **CONFIRMED** | Digital wallet meta, `/cdn/shop/` paths, `products.json`, Powered by Shopify |
| Impulse by Archetype Themes | **CONFIRMED** | Vendor banner in `theme.css` |
| Shop ID `55517610183` | **CONFIRMED** | Digital wallet meta tag |
| Theme slot `t/9` | **CONFIRMED** | Asset path. Not the theme version |
| Online Store 2.0 with JSON templates | **LIKELY** | Section-per-page composition, per-template section ordering, Impulse 9.x is an OS 2.0 theme |

### 10.2 Templates

| Template | Status | Notes |
|---|---|---|
| `index.json` | **LIKELY** | Homepage composed of stock sections |
| `collection.json` | **LIKELY** | Banner, filters, grid, pagination |
| `product.json` (default) | **LIKELY** | Used by originals and prints alike |
| A dedicated Print Club product template | **LIKELY** | The page structure diverges completely from other product pages while remaining at a `/products/` URL |
| `page.json` variants for About and Commissions | **LIKELY** | Both differ structurally from each other and from a plain rich-text page |
| `cart` drawer | **CONFIRMED** | Rendered drawer markup |

### 10.3 Sections and blocks

| Item | Status | Notes |
|---|---|---|
| Announcement bar with rotating blocks | **CONFIRMED** | Play and pause controls present |
| Hero slideshow (Flickity) | **CONFIRMED** | Flickity classes and slide markup |
| Scrolling text marquee | **CONFIRMED** | `@keyframes scrolling-text` is stock Impulse |
| Collection list, image with text, rich text, testimonials, featured product | **LIKELY** | All map onto documented Impulse sections |
| Product blocks: price, variant picker, inventory status, collapsible tabs, contact form, share | **CONFIRMED** | All rendered; all are stock Impulse product blocks |
| Complementary product recommendations | **CONFIRMED** | `product-recommendations[data-intent=complementary]` custom element |
| Recently viewed | **CONFIRMED** | Section present, empty on first visit |
| **Custom Print Club sections** | **LIKELY** | Bespoke assets in the theme assets directory plus a custom anchor ID; the strongest custom-code evidence on the site |

### 10.4 Assets, CSS and JavaScript

| Item | Status | Notes |
|---|---|---|
| Stock, unmodified `theme.css` | **CONFIRMED** | Vendor banner intact, full stock ruleset |
| Custom theme assets `dreamers-colony-*.webp/png` | **CONFIRMED** | Served from `/cdn/shop/t/9/assets/`, therefore added via theme code |
| Flickity, noUiSlider, AOS-style reveal | **CONFIRMED** | Bundled with Impulse |
| Custom CSS for the Print Club layout | **LIKELY** | The layout has no stock equivalent; the CSS is probably in a separate asset or section `{% stylesheet %}` |
| Custom JavaScript beyond the theme | **SPECULATIVE** | Nothing observed that Impulse does not already ship, other than whatever populates the "users are viewing" counter |

### 10.5 Data model

| Item | Status | Notes |
|---|---|---|
| Native selling plans, two groups, four plans | **CONFIRMED** | `selling_plan_allocations` in variant JSON |
| `requires_selling_plan: true` on the Print Club product | **CONFIRMED** | Subscription-only product |
| Three-option variant structure for prints | **CONFIRMED** | Material, Size, Frame Color |
| Vendor field used to record the print producer | **CONFIRMED** | `"vendor": "Lumaprints"` |
| Shopify Search & Discovery filters | **LIKELY** | Availability, price, product type, and an option-derived Size filter |
| Metafields | **LIKELY** | Judge.me writes rating and rating count metafields; the "Product rating count" filter proves at least one is filterable |
| Metaobjects | **SPECULATIVE** | The Print Club issue mapping and plan comparison could be metaobject-driven, but nothing in the markup proves it. It may equally be hard-coded, which the stale holiday copy elsewhere would suggest is this store's habit |

### 10.6 Apps and services

| Item | Status |
|---|---|
| Judge.me | **CONFIRMED** |
| Loop Subscriptions | **CONFIRMED** (app proxy route) |
| Kit / ConvertKit | **CONFIRMED** |
| Shopify Markets | **CONFIRMED** |
| hCaptcha via Shopify forms | **CONFIRMED** |
| PayPal | **CONFIRMED** |
| Meta and Google verification | **CONFIRMED** |
| Lumaprints fulfilment integration | **LIKELY** |
| A visitor-count or urgency app | **LIKELY** |
| Any page builder app | **SPECULATIVE, and I doubt it.** The custom assets sit in the theme, which is what a developer does, not what a page builder does |

---

## 11. Lessons for Zita's Art Studio

### 11.1 Principles worth reinterpreting

**1. Expose the full price ladder in the primary navigation**

- *What Dimitra Milan does:* four commercial tiers as top-level menu peers, from $15 per month to $23,040.
- *Why it works:* every visitor finds an entry point in the first three seconds, and the presence of the expensive tier raises the perceived value of the cheap one.
- *Problem it solves:* artist sites usually force a single path and lose everyone whose budget does not match it.
- *For Zita, originally:* map her actual tiers, whatever they are, and give each a genuine home rather than mimicking the same four. If she has fewer tiers, that is the honest structure. Do not invent a subscription to fill a slot.

**2. Let the warm ground and one reserved accent do the branding**

- *What it does:* nothing is pure white or pure black; one saturated colour is held back almost entirely for actions and prices.
- *Why it works:* the chrome never competes with the paintings for the eye's white point, and commerce stays legible without shouting.
- *Problem it solves:* branded colour applied on top of artwork fights the artwork.
- *For Zita, originally:* derive a ground and an accent from **her** palette, not from this one. Test contrast at the start, not at the end. The audit shows a soft palette can hit 12:1.

**3. Use one small, wide-tracked uppercase label as the site's connective voice**

- *What it does:* kickers, form labels, button text and small headings all share a single micro-typographic treatment.
- *Why it works:* it signals gallery and editorial rather than shop, and it keeps headings and images carrying all the weight.
- *For Zita, originally:* pick a different device if it suits her better (a small italic serif, a lowercase letterspaced label, a rule-and-caption pattern). The principle is one repeated micro-element, not this specific one. Set a larger minimum size than 11px.

**4. Alternate full-bleed image with narrow-measure text as the page rhythm**

- *What it does:* artwork gets the whole viewport; words get roughly a 1000px measure.
- *Why it works:* the change in width is the hierarchy. No decorative framing is needed.
- *For Zita, originally:* build two or three container widths as design tokens and compose pages from their alternation. This is where an editorial or asymmetric take can go further: offset the narrow column rather than centring it, let a caption sit in the margin, allow one image to break the grid per page.

**5. Sell the act of collecting, not just the object**

- *What it does:* the "Are you an art collector?" block argues for living with art before offering anything to buy.
- *Why it works:* it changes the visitor's self-concept before the transaction, which is what actually moves a first-time buyer from a $40 print to a $4,000 original.
- *For Zita, originally:* one short, sincere passage in her own voice about what her work does in a room. Hers, not a paraphrase of this.

**6. Curate long-form collector stories rather than star ratings**

- *What it does:* several-hundred-word accounts of what a painting meant, with a thumbnail of the specific piece.
- *Why it works:* it is proof of emotional outcome, which is what an art buyer is actually buying, and it doubles as artwork discovery.
- *Problem it solves:* "★★★★★ Great quality" tells a collector nothing.
- *For Zita, originally:* a testimonial structure that requires a story and a linked artwork, and a deliberate decision to **not** show star ratings on originals.

**7. One specific, surprising credibility fact beats a biography**

- *What it does:* "Living as a professional artist since the age of 15" on the homepage; a dated, numeric timeline on the About page.
- *Why it works:* specificity is checkable, and checkable claims build trust that adjectives cannot.
- *For Zita, originally:* find the one true, specific, surprising fact about her practice and put it where the story link lives.

**8. Write the About page partly in the second person**

- *What it does:* "Your Dreams Matter" describes the visitor, not the artist.
- *Why it works:* it converts a biography into a mirror, which is the point of buying art in the first place.
- *For Zita, originally:* a section that names who her work is for, in her voice.

**9. Carry a metaphor through labels, not decoration**

- *What it does:* the Print Club page uses "the lead story", "the print desk", "the information desk" to sell a newspaper.
- *Why it works:* it transforms the register at zero cost to usability, because the labels still say exactly what the sections contain.
- *Problem it solves:* how to feel bespoke without sacrificing clarity.
- *For Zita, originally:* if a page has a strong organising idea (a studio, a sketchbook, a series, a season), let its vocabulary name the sections. Different metaphor, same technique. This is our strongest lead for escaping generic Shopify structure cheaply.

**10. Be blunt about commercial terms inside warm copy**

- *What it does:* exact plan prices, honest disclosure that standard mail has no tracking, a clear no-refunds statement, published commission pricing including a per-square-inch formula.
- *Why it works:* precision inside warmth reads as confidence. Vagueness inside warmth reads as evasion.
- *For Zita, originally:* publish the pricing logic for commissions and the real production and shipping timelines, in her voice.

**11. Turn a high-value product page into a lead-capture surface**

- *What it does:* a commission enquiry form sits on the original artwork page itself.
- *Why it works:* on a five-figure object, most visitors will not click Add to cart today, and they need somewhere else to go.
- *For Zita, originally:* on originals, pair the purchase control with a genuine secondary action (enquire, request more images, ask about payment terms, request a viewing). Make it native to the theme rather than an external form.

**12. Build the distinctive page inside the theme, not outside it**

- *What it does:* the most bespoke page on the site is custom Liquid sections and hand-placed theme assets inside a $500 commercial theme.
- *Why it works:* commerce, checkout, cart, search and apps all keep working, and the owner keeps the Theme Editor.
- *For Zita:* this is direct validation of our theme-first default. See section 12.

### 11.2 What we should not reproduce

| Do not copy | Why |
|---|---|
| **Scarcity and urgency widgets on originals** | "Low stock - 1 item left" and "users are viewing this just now" on a unique painting is conversion tooling applied where it contradicts the product's entire proposition |
| **Star ratings on one-of-a-kind work** | "Be the first to write a review" on a $20,160 painting that one person will ever own |
| **Thin descriptions on the most expensive products** | One line of specification on an original while the $125 print gets 250 words. The information investment should scale with price, not against it |
| **No connection between an original and its print edition** | Both exist, neither links to the other. A large, free cross-sell going unclaimed |
| **Dead-end sold-out grids** | Two thirds of originals are unavailable with no notify-me, no waitlist, no path to the print |
| **A broken "You may also like"** | It recommends the product you are already viewing |
| **Duplicate review carousels** | The Judge.me block renders twice on several templates |
| **Stale seasonal copy** | Holiday gifting copy live in September. Campaign content needs a scheduled or clearly owner-editable home |
| **Malformed navigation URLs** | `/collections/originals/Originals` is a tag-filtered variant sitting in the primary menu, competing with the clean collection URL |
| **Inconsistent product taxonomy** | `product_type` values that vary and are frequently blank; option order that differs between products; size filter values that mix dimensions with full material descriptions |
| **Option selectors offering combinations that do not exist** | 6 real variants presented through controls implying 18 |
| **Off-platform forms for high-value enquiries** | A Google Form for a $3,450-plus commission, on a site that already has a native form with spam protection |
| **Two email systems and two review presentations** | Decide the system of record for each job once |
| **~200 country links rendered twice per page** | Real weight on an image-heavy mobile page. Consider a lighter selector pattern |
| **Repeating one offer three times in a single homepage** | Hero slide, marquee and feature block all sell the Print Club before the visitor has seen any art |

---

## 12. Theme-first feasibility

### 12.1 Verdict

**Every experience observed on this site is achievable with Shopify Online Store 2.0, Liquid, JSON templates, custom sections and blocks, CSS, JavaScript, metafields and metaobjects.** Nothing here requires Hydrogen or Oxygen.

The site is in fact a live proof of the argument. Its most distinctive page, the Dreamers Print Club, is a custom-sectioned product template inside a commercial theme, with bespoke assets committed to the theme's asset directory. Whoever built it reached for custom Liquid, not for headless.

### 12.2 Mapping each observed experience

| Observed experience | Theme-first approach |
|---|---|
| Full-bleed hero slideshow with overlay text | Custom section with image, heading, subheading and link blocks. A small vanilla-JS or CSS scroll-snap slider avoids a carousel library entirely |
| Alternating full-bleed and narrow-measure rhythm | Container width tokens plus a section setting for width. No library |
| Editorial collection pages with interleaved storytelling | Custom collection sections, plus collection metafields for a statement, a chapter image, a curator's note |
| Artwork-detail product pages for originals | An alternate product template (`product.original.json`) with metafields for medium, dimensions, year, series, story, framing and provenance |
| Print product pages with material, size and frame options | Native variants, with a variant picker that disables combinations that do not exist |
| Linking an original to its print edition and back | A product metafield of type `product_reference` in both directions. Cheap, and it fixes the biggest gap on the reference site |
| Notify-me on sold-out originals | Shopify's native back-in-stock, or a small custom form writing to a customer metafield. Honest framing for unique work: "tell me when new work in this series is available" |
| Subscription product with monthly and prepaid plans | Native selling plans plus a subscription app for management |
| A metaphor-driven landing page | Custom sections with owner-editable text, exactly as the reference site does it |
| Expandable story timeline | `<details>` and `<summary>` with CSS, or a metaobject of story chapters rendered by a custom section |
| Scroll reveals and staggered grid entrances | IntersectionObserver plus CSS transitions, roughly 30 lines, wrapped in `prefers-reduced-motion` |
| Long-form collector stories | A `testimonial` metaobject with fields for quote, name, location and a linked artwork |
| Commission enquiry and pricing | Native Shopify form with hCaptcha, plus a metaobject-driven price table so Zita can update rates herself |
| Filtering by medium, orientation, size band, availability | Shopify Search & Discovery on well-governed product data. **The taxonomy is the work here, not the interface** |

### 12.3 Where headless would genuinely be the answer

For completeness, so that this is a judgement rather than a reflex. Hydrogen would earn its complexity if the project needed:

- A storefront experience that must live on a non-Shopify domain or inside a larger non-commerce application
- Deeply interactive product configuration or real-time 3D and AR beyond what Shopify's native model viewer supports
- A content model whose primary source is an external CMS driving most of the site, with commerce as a minority of pages
- Personalised, per-visitor page composition at a level Liquid and Search & Discovery cannot express
- Genuine multi-brand or multi-storefront reuse of one component library

**None of these describe Zita's Art Studio as scoped.** The visually unconventional brief is not itself a reason to go headless, and the reference site demonstrates why: the unconventional page is Liquid.

### 12.4 Costs headless would add, for the record

Theme Editor content management would be lost or rebuilt; app compatibility (reviews, subscriptions, email) would need re-integration through the Storefront API; SEO, redirects and metadata would become our responsibility; hosting, deploys and monitoring become an ongoing job; and Zita's ability to change a hero image without a developer would be at risk. Against the decision priorities in the project brief, headless scores badly on owner editability and maintainability while buying us nothing on artistic identity or artwork presentation.

---

## 13. Key takeaways

1. **Confirmed:** Shopify, running Impulse by Archetype Themes, a premium Theme Store theme, heavily configured and extended with at least one hand-built custom template.
2. **The distinctiveness is not technical.** Almost every homepage section is stock. The site feels like a gallery because of palette, type treatment, image scale, sequencing and voice.
3. **The one genuinely custom page is the best page.** The Print Club template shows exactly what we should aim for: bespoke Liquid sections inside a commercial theme, not a rewrite.
4. **The commercial architecture is the smartest decision.** Four price tiers, $15 per month to $23,040, all visible in one menu bar.
5. **Content investment is inverted.** The $125 print is documented thoroughly; the $20,160 original gets a single line. This is the clearest thing to do better.
6. **Conversion tooling is applied where it hurts.** Scarcity counters and star ratings on one-of-a-kind paintings work against the positioning the rest of the site builds.
7. **Product data governance is the real constraint on collection pages.** The filters are only as good as `product_type`, option naming and tags, and here those are inconsistent.
8. **Accessibility is better than the soft aesthetic suggests**, at 12.5:1 body contrast, but reduced-motion support appears to be missing.
9. **Theme-first is validated.** Nothing observed justifies Hydrogen.

---

## 14. Ideas worth reinterpreting for Zita

Ordered by value relative to effort.

| # | Idea | Effort | Value |
|---|---|---|---|
| 1 | Price-ladder navigation built on Zita's real tiers | Low | High |
| 2 | Warm non-white ground with one reserved accent, contrast-tested from the start | Low | High |
| 3 | A single repeated micro-label treatment as the connective typographic voice | Low | High |
| 4 | Two or three container widths, alternated as the page rhythm | Low | High |
| 5 | Bidirectional original ↔ print metafield links | Low | High |
| 6 | A short "why live with art" passage in Zita's voice | Low | High |
| 7 | Long-form collector stories with linked artwork, no star ratings on originals | Medium | High |
| 8 | An originals template that demands more content than the prints template: medium, dimensions, year, series, story, framing, scale reference | Medium | High |
| 9 | A metaphor carried through section labels on one signature page | Medium | High |
| 10 | Collection pages as curated exhibitions, with editorial breaks between grid rows | Medium | High |
| 11 | Second-person section on the About page, naming who the work is for | Low | Medium |
| 12 | A genuine secondary action on originals: enquire, request images, ask about terms | Medium | Medium |
| 13 | Notify-me on sold-out work, framed honestly for unique pieces | Medium | Medium |
| 14 | Published commission pricing logic, owner-editable via metaobject | Medium | Medium |
| 15 | IntersectionObserver reveals with proper reduced-motion support | Low | Medium |

---

## 15. Questions requiring further technical investigation

**Needs a real browser session**

1. Mobile rendering at 375px, 390px and 768px across homepage, collection, original PDP, print PDP and the Print Club page. Everything in section 9 is inferred from CSS.
2. Does the site honour `prefers-reduced-motion`? I found the theme toggle but no media query in the compiled stylesheet. Needs confirming with the preference enabled.
3. Actual font families and their loading strategy. The values are injected inline per store and were not in the compiled CSS. Check whether fonts come from Shopify's font library or a third party, and whether `font-display` is set.
4. Real Core Web Vitals on a throttled mobile connection, with attention to the roughly 200 country links rendered twice, the hero at `width=2400`, and the Judge.me widget.
5. Keyboard and screen-reader behaviour for the cart drawer, mobile navigation drawer, image lightbox, filter drawer and the Print Club plan selector. Focus trapping and return focus specifically.
6. Hero text legibility over photography at 10% overlay, at mobile crops.
7. Whether a dynamic checkout button (Shop Pay, PayPal express) renders on product pages. It was absent from the fetched markup but may be client-rendered.

**Needs Shopify or platform investigation**

8. Confirm Impulse's current version and its OS 2.0 section and block inventory, so we know exactly where stock capability ends and custom work begins.
9. Which Shopify app handles the "users are viewing this just now" counter, and whether it can be scoped to exclude originals.
10. Whether Shopify's native back-in-stock notification is appropriate for genuinely unique items, or whether a custom "notify me about new work" flow is better.
11. Search & Discovery filter capabilities against metafields, to confirm we can filter by medium, orientation and size band without an app.
12. Metaobject limits and Theme Editor ergonomics for owner-managed story chapters, exhibition notes and testimonials.
13. Current guidance on variant option availability, so we do not repeat the pattern of selectors offering combinations that do not exist.

**Needs a decision on Zita's side**

14. Which commercial tiers does Zita actually have, and are any missing that should exist?
15. Is there a recurring or community offer in her practice, or would a subscription be an imported idea rather than a real one?
16. How much writing is she willing to produce per original artwork? The originals template should be designed around the honest answer, not an aspirational one.
17. Which print or fulfilment partners are in play, and does that constrain the variant model?
18. Does she want sold-out work to remain visible as a body of work, accepting the dead-end trade-off, or be archived?

---

*Prepared as inspiration and technical research for the Zita's Art Studio redesign. No layouts, copy, artwork, branding or creative expression from dimitramilan.com are to be reproduced.*