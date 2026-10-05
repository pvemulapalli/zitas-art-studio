# Agent orientation — Zita's Art Studio

Start here, then read **[docs/project-status.md](docs/project-status.md)** for what is done, in progress and next.

## What to trust

| Source | Role |
|---|---|
| `docs/project-status.md` | **Only** canonical project status and environment state |
| `docs/project-brief.md` | Project charter: mission, constraints, principles |
| `docs/architecture/` | Living technical source (architecture, product schema, metafield definitions) |
| `docs/design/zita-design-brief.md`, `docs/design/design-v2-acceptance.md` | Authoritative approved design intent (frozen) |
| `docs/design/ranjeeta-preferences.md` | Stakeholder decisions; update only for new decisions from Ranjeeta |
| `references/claude-design/handoff/**` | Historical page implementation handoffs. Do not silently rewrite; record deliberate deviations in the architecture docs |
| `references/claude-design/**/reference/*.html`, `references/claude-design/screenshots/**` | Historical design references |
| `docs/research/**` | Dated research snapshots |
| `theme/README.md`, `theme/CONTRIBUTING.md`, `theme/CODE_OF_CONDUCT.md`, `theme/LICENSE.md` | Upstream Shopify Skeleton files, not Zita project documentation or status |

## Ground rules

- All V2 work targets the Partner dev store `zitas-art-studio-development.myshopify.com`. Always pass `--store` explicitly.
- Ranjeeta's production store must remain untouched unless explicitly entering Phase B.
- Update status only in `docs/project-status.md`; do not add progress tracking to other documents.
