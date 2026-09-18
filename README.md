# Zita's Art Studio

Redesign and Shopify development project for  
[Zita's Art Studio](https://www.zitasartstudio.com/)

## Project Goal

Create a distinctive, art-first Shopify storefront for Ranjeeta's artwork.

The new site should feel like a bespoke digital gallery rather than a standard ecommerce theme while keeping Shopify's commerce, content management, accessibility, performance and owner-editability intact.

**Core principle: art-first, commerce-enabled.**

---

## Current Phase

**Research & Brand Discovery**

Reference-site research and the existing Zita content inventory are complete.

Next:

1. Complete Ranjeeta's design/content questions
2. Create the Zita Design Brief
3. Develop brand standards and visual concepts
4. Build a clickable prototype for review
5. Finalize Shopify architecture
6. Implement the approved experience in Shopify
7. QA and launch

---

## Project Documents

### Design

- [Ranjeeta's Preferences](docs/design/ranjeeta-preferences.md)

### Research

- [Dimitra Milan Audit](docs/research/dimitra-milan-audit.md)
- [Rinske Douna Audit](docs/research/rinske-douna-audit.md)
- [Zita Content & Brand Inventory](docs/research/zita-content-brand-inventory.md)

### Project

- [Project Brief](docs/project-brief.md)

### Shopify Learning

- [Shopify Learning Log](docs/learning/shopify-learning-log.md)

This project also serves as a hands-on Shopify engineering learning project, covering themes, Liquid, Online Store 2.0, metafields, metaobjects, Shopify CLI, GraphQL, Git and AI-assisted development.

---

## Design Direction

The final visual identity has not yet been approved.

Current areas being explored include:

- artwork-led layouts
- editorial and asymmetric compositions
- tonal backgrounds rather than continuous white
- a palette derived from Ranjeeta's artwork
- expressive typography
- series-based artwork discovery
- artwork-to-room-image transitions
- immersive artist storytelling
- richer exhibition presentation
- separate experiences for originals and prints where appropriate

Reference sites are being used to identify ideas and techniques that may be adopted, adapted or reinterpreted for Zita's own identity.

---

## Shopify Approach

The project will use a **Shopify theme-first architecture**.

The storefront must work completely on **Shopify Basic**.

Preferred order of implementation:

1. Native Shopify capability
2. Small custom theme implementation
3. Free first-party Shopify functionality
4. Third-party apps only where genuinely justified

Shopify should provide the commerce infrastructure while the customer-facing experience feels bespoke.

---

## Development Status

Theme implementation has **not started yet**.

Research and visual direction will be approved before production Shopify development begins.

---

## Repository Structure

```text
docs/
├── architecture/
├── decisions/
├── design/
├── learning/
└── research/

references/
```

As implementation begins, Shopify theme directories will be added to the repository.

---

## North Star

> Would a visitor ever guess this was based on a standard Shopify theme?
>
> Ideally, no.

The storefront should feel distinctly like Zita's Art Studio, while Shopify quietly handles the commerce underneath.
