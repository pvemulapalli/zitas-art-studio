# Zita's Art Studio

Redesign and Shopify development project for  
[Zita's Art Studio](https://www.zitasartstudio.com/)

## Project Goal

Create a distinctive, art-first Shopify storefront for Ranjeeta's artwork.

The new site should feel like a bespoke digital gallery rather than a standard ecommerce theme while keeping Shopify's commerce, content management, accessibility, performance and owner-editability intact.

**Core principle: art-first, commerce-enabled.**

---

## Current Status

See **[docs/project-status.md](docs/project-status.md)** — the only canonical record of what is complete, in progress and next, and of the state of each Shopify store.

---

## Design Direction

**Claude Design V2** was approved by Ranjeeta in October 2026:

- artwork-first, nature-derived palette with a teal family and editorial tones
- **Marcellus** (display) + **Mulish** (body/UI)
- wordmark `ZITA'S | ART STUDIO`
- Gesso / light neutral artwork ground; aligned artwork grids; uncropped artwork
- full-width homepage carousel, series-led navigation, gallery-like product pages

Details: [Zita Design Brief](docs/design/zita-design-brief.md) and [Design V2 Acceptance](docs/design/design-v2-acceptance.md).

---

## Shopify Approach

The project uses a **Shopify Online Store 2.0, theme-first architecture** built from the Shopify Skeleton theme.

The storefront must work completely on **Shopify Basic**.

Preferred order of implementation:

1. Native Shopify capability
2. Small custom theme implementation
3. Free first-party Shopify functionality
4. Third-party apps only where genuinely justified

Shopify should provide the commerce infrastructure while the customer-facing experience feels bespoke.

---

## Repository Structure

```text
AGENTS.md                 orientation for AI agents
docs/
├── project-status.md     current status (canonical)
├── project-brief.md      project charter
├── architecture/         Shopify architecture, product schema, metafield definitions
├── design/               approved design direction and stakeholder preferences
├── learning/             Shopify learning log
└── research/             dated reference-site and content audits
references/
├── claude-design/
│   ├── handoff/          Claude Design implementation handoffs per page
│   └── screenshots/      Design V1 (historical) and V2 (approved) captures
├── dimitra-milan/        reference-site screenshots
├── rinske-douna/
└── zitas-current-site/
scripts/
└── metafields/           metafield-definition schema and provisioning script
theme/                    Zita V2 Shopify theme (Online Store 2.0)
```

---

## Document Map

**LIVING** documents are kept current. **HISTORICAL / FROZEN** documents are point-in-time records: do not rewrite them because implementation has moved on.

### Living

| Document | Role |
|---|---|
| [Project Status](docs/project-status.md) | Completed, in progress, next, environments, open inputs |
| [Project Brief](docs/project-brief.md) | Project charter: mission, constraints, principles |
| [Shopify Implementation Plan](docs/architecture/shopify-implementation-plan.md) | Authoritative architecture reference |
| [Product Schema](docs/architecture/product-schema.md) | V2 product data model |
| [Metafield Definitions](docs/architecture/metafield-definitions.md) | Metafield definitions and provisioning state |
| [Ranjeeta's Preferences](docs/design/ranjeeta-preferences.md) | Stakeholder preferences and decisions (updated only when Ranjeeta decides something new) |
| [Shopify Learning Log](docs/learning/shopify-learning-log.md) | Personal learning notes |

### Approved design (authoritative intent, frozen)

| Document | Role |
|---|---|
| [Zita Design Brief](docs/design/zita-design-brief.md) | Approved experience and visual direction |
| [Design V2 Acceptance](docs/design/design-v2-acceptance.md) | Design approval record |
| [Design V2 screenshots](references/claude-design/screenshots/v2/README.md) | Primary visual reference |

### Historical / frozen

| Document | Role |
|---|---|
| [Homepage handoff](references/claude-design/handoff/homepage/homepage-implementation-handoff.md) | Claude Design implementation handoff |
| [PLP handoff](references/claude-design/handoff/plp/plp-implementation-handoff.md) | Claude Design implementation handoff |
| `references/claude-design/handoff/*/reference/*.html` | Design reference HTML |
| [Design V1 screenshots](references/claude-design/screenshots/v1/README.md) | Superseded design exploration |
| [Dimitra Milan Audit](docs/research/dimitra-milan-audit.md) | Reference audit, September 2026 |
| [Rinske Douna Audit](docs/research/rinske-douna-audit.md) | Reference audit, September 2026 |
| [Zita Content & Brand Inventory](docs/research/zita-content-brand-inventory.md) | Content audit, September 2026 |

### Upstream theme files

`theme/README.md`, `theme/CONTRIBUTING.md`, `theme/CODE_OF_CONDUCT.md` and `theme/LICENSE.md` come from the upstream Shopify Skeleton theme. They are not Zita project documentation or status. `theme/LICENSE.md` must be retained.

---

## Shopify Learning

This project also serves as a hands-on Shopify engineering learning project, covering themes, Liquid, Online Store 2.0, metafields, metaobjects, Shopify CLI, GraphQL, Git and AI-assisted development. See the [Shopify Learning Log](docs/learning/shopify-learning-log.md).

---

## North Star

> Would a visitor ever guess this was based on a standard Shopify theme?
>
> Ideally, no.

The storefront should feel distinctly like Zita's Art Studio, while Shopify quietly handles the commerce underneath.
