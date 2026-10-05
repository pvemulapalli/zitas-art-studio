# Zita's Art Studio — Project Brief

## Project

Redesign and rebuild the Shopify storefront for Zita's Art Studio, the artwork and studio practice of Ranjeeta.

Current site:

https://www.zitasartstudio.com/

---

## Mission

Create a distinctive digital gallery that sells art without feeling like a conventional Shopify storefront.

**Core principle: art-first, commerce-enabled.**

Shopify should remain the commerce and content-management infrastructure while the presentation feels bespoke to Ranjeeta.

---

## Artist

Ranjeeta is a Dallas-based abstract artist whose practice includes fluid painting, mixed media, original artwork, commissions and a developing print offering.

Her work is organized through genuine artistic series including:

- Elements
- Walking the Trail
- Sand and Cloud
- Colored by Nature
- BlackWhiteandGrey

Her existing writing reveals recurring ideas involving nature, impermanence, movement, light and dark, inward reflection, gratitude and cultural terminology including Sanskrit titles.

The current content inventory should be treated as the authoritative research source for details.

See:

[docs/research/zita-content-brand-inventory.md](research/zita-content-brand-inventory.md)

---

## Stakeholder Direction

Ranjeeta does not want to preserve the visual design of her current storefront.

She wants the redesigned site to feel:

- artistic
- sophisticated
- intentional
- spacious
- high-end
- artwork-focused
- less dependent on plain white backgrounds
- substantially less like a standard ecommerce theme

Her explicit preferences are recorded in:

[docs/design/ranjeeta-preferences.md](design/ranjeeta-preferences.md)

---

## Reference Sites

Primary references:

- Dimitra Milan
- Rinske Douna

Research:

[docs/research/dimitra-milan-audit.md](research/dimitra-milan-audit.md)

[docs/research/rinske-douna-audit.md](research/rinske-douna-audit.md)

Reference sites are not templates that must be copied.

Use the framework:

### Adopt

Use an existing design idea or technique when it genuinely suits Zita.

### Adapt

Take a useful concept and reinterpret it through Ranjeeta's identity and artwork.

### Invent

Create a Zita-specific solution where neither reference solves the problem well.

Do not reproduce copyrighted artwork, photography, written content, branding or an entire distinctive site/page composition.

---

## Approved Design Direction

**Claude Design V2** was approved by Ranjeeta in October 2026. In summary:

- primary emotion: **Inspired**
- nature-derived, artwork-derived palette with a teal family and editorial tones; restrained copper accents
- **Marcellus** (display) + **Mulish** (body/UI)
- tracked-capitals wordmark `ZITA'S | ART STUDIO`
- **Gesso / light neutral** artwork ground; no automatic per-artwork backgrounds
- aligned artwork grids; artwork never cropped; artwork → room image interaction
- full-width homepage carousel; approximately 2–3 active series foregrounded
- artwork-first collection pages with on-demand Filter & Sort and an optional editorial band
- gallery-like product pages; clear but visually subordinate commerce

Earlier exploration (Tenor Sans + Alegreya typography, a blue-led palette, asymmetric and staggered layouts) was superseded by Design V2.

The authoritative design documents are:

- [docs/design/zita-design-brief.md](design/zita-design-brief.md) — approved experience and visual direction
- [docs/design/design-v2-acceptance.md](design/design-v2-acceptance.md) — design approval record

---

## Shopify Constraint

Ranjeeta is on **Shopify Basic**.

The entire storefront must function on Shopify Basic.

Do not make the design dependent on Shopify Grow, Advanced, Plus or enterprise-only functionality.

When evaluating implementation options, prefer:

1. Native Shopify functionality
2. Custom Liquid / CSS / JavaScript
3. Free first-party Shopify functionality
4. Paid apps only when the benefit clearly justifies them

Do not recommend upgrading Shopify plans as the solution to a design or implementation problem.

---

## Technical Direction

Default architecture:

- Shopify Online Store 2.0
- Liquid
- JSON templates
- sections
- blocks
- snippets
- CSS
- small amounts of JavaScript
- metafields
- metaobjects where appropriate
- Shopify Search & Discovery where useful and Basic-compatible

Primary development environment:

- Cursor
- Git
- GitHub
- Shopify CLI
- development / preview themes

Hydrogen/Oxygen is not the default architecture.

Only reconsider headless commerce if a required experience genuinely cannot be achieved reasonably within Shopify's native theme architecture.

---

## Content Management Principle

Ranjeeta should be able to manage normal content through Shopify without needing Cursor.

Use:

- Theme Editor settings
- section blocks
- products
- collections
- blogs/articles
- metafields
- metaobjects

Goal:

**developer-level creative freedom + owner-level content control**

---

## Artwork Experience

Artwork is always the hero.

Original-artwork product pages should feel like artwork-detail/gallery experiences rather than conventional ecommerce PDPs.

Likely information includes:

- title
- series
- artwork story
- year
- medium
- substrate
- dimensions
- room/context photography
- texture/detail photography
- framing/display information
- certificate information
- shipping
- exhibition history where relevant
- purchase or enquiry action

Prints may eventually use a separate experience depending on the future print strategy.

---

## Collection Experience

Collections should feel closer to curated exhibitions than standard product grids.

Useful concepts may include:

- artwork-led layouts
- series storytelling
- art-specific filtering
- featured artworks
- editorial interruptions
- variable image scale
- room-view imagery
- sold-work archive where appropriate

Purchasing and artwork discovery must remain clear.

---

## Exhibitions

The current exhibition history is a valuable credibility and storytelling asset.

Potential future organization:

- Upcoming
- Current
- Past
- Awards & Recognition

The leading architecture is an **Exhibition metaobject** referenced by the Exhibitions page and by products. It is provisional: the schema is not finalized and nothing has been implemented yet. See [implementation plan §15](architecture/shopify-implementation-plan.md#15-metaobject-policy).

---

## News / Press

Prefer native Shopify blogs/articles unless research demonstrates a compelling reason not to.

Possible content types:

- Exhibitions
- Awards
- Studio News
- Commission Stories
- Press when genuine press coverage exists

---

## Accessibility & Performance

Creative presentation must remain:

- keyboard accessible
- responsive
- readable
- performant
- compatible with reduced-motion preferences
- usable on touch devices
- supported by meaningful image alt text
- built with sufficient contrast

Mobile is a first-class design target.

---

## SEO

Existing SEO authority is currently limited, so the redesign is not heavily constrained by the current site structure.

Still follow good migration practice:

- preserve valuable URLs where useful
- create redirects when handles change
- avoid unnecessary broken links
- maintain canonical behavior
- use structured data appropriately
- improve product and image metadata

---

## Project Workflow

For each major page:

1. Audit
2. Research
3. Define
4. Explore
5. Architect
6. Implement
7. QA
8. Approve

Before coding a major page ask:

> What should this page make a visitor feel, understand, explore and ultimately do?

Final approval question:

> Does this feel like Zita's Art Studio?

---

## Project Status and Related Documents

This brief is the project charter. It does not track progress.

- **Current status:** [docs/project-status.md](project-status.md)
- **Design:** [design brief](design/zita-design-brief.md) · [Design V2 acceptance](design/design-v2-acceptance.md) · [Ranjeeta's preferences](design/ranjeeta-preferences.md)
- **Architecture:** [Shopify implementation plan](architecture/shopify-implementation-plan.md) · [product schema](architecture/product-schema.md) · [metafield definitions](architecture/metafield-definitions.md)

---

## Learning Objective

This project is also being used as a hands-on Shopify engineering learning environment.

The learning goal is to understand Shopify deeply through real implementation rather than treating AI-generated code as a black box.

Learning notes live at:

[docs/learning/shopify-learning-log.md](learning/shopify-learning-log.md)

Key areas include:

- theme architecture
- Liquid
- Online Store 2.0
- Shopify CLI
- product and collection data
- metafields
- metaobjects
- Search & Discovery
- GraphQL Admin API
- authentication and development tooling
- accessibility
- performance
- Git workflows
- AI-assisted Shopify development

For generated code, understand:

- why it exists
- where it belongs
- which Shopify objects it uses
- what Ranjeeta can edit
- what requires a developer
- what Shopify handles automatically

---

## Definition of Done

Every page should be:

**Creative** — distinctive to Zita.

**Functional** — commerce works correctly.

**Technical** — responsive, accessible, performant, SEO-conscious and maintainable.

**Operational** — Ranjeeta can manage appropriate content herself.

---

## North Star

> Would a visitor ever guess this was based on a standard Shopify theme?

Ideally, no.
