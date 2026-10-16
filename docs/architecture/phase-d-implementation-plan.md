# Phase D — Editorial Pages & Commerce Repair Plan

**Status:** Approved with amendments (15 October 2026)  
**Progress tracking:** [project-status.md](../project-status.md) only  
**Companion:** [Shopify implementation plan](shopify-implementation-plan.md) §15–16, §23–24

This document records **architecture and sequencing decisions** for Phase D. It does not track day-to-day progress.

---

## 1. Scope

### In scope when readiness gates pass

| Workstream | Notes |
|---|---|
| **About the Artist** | Approved by Ranjeeta, including section-background amendment. Build only after Claude Design packages are in the repository. |
| **Exhibitions** | Approved, including Work and Series Links addendum. Build only after handoffs are in-repo **and** Basic metaobject feasibility proof passes. |
| **Commerce repair (gated)** | Isolated milestones. **Full `/cart` page is the primary cart experience** (C1). Cart drawer is **deferred by design** (not planned for current V2). Predictive search and currency selector remain separate gated enhancements. |

### Explicitly on hold

| Page / feature | Reason |
|---|---|
| Portfolio | Awaiting Ranjeeta’s approval |
| Contact / Trade / Commissions | Awaiting Ranjeeta’s approval |
| Policies | Awaiting Ranjeeta’s approval |
| News | Removed from scope |
| Standalone Commissions page | Removed from scope |
| Cart drawer UI | **Deferred by design** (15 Oct 2026) — full cart page is primary; not a missing V2 feature. May revisit only if user testing shows need |
| Predictive search overlay UI | Needs confirmed V2 design (separate from cart) |
| Country / currency selector UI | Needs confirmed V2 design |
| PLP quick add / image browsing | Optional; pending design review |

### Non-negotiable constraints

1. Do **not** begin About or Exhibitions theme implementation until the latest Claude Design handoffs, screenshots, reference files, and amendments are synchronized into the repository.
2. Preserve all existing approved V2 page designs and commerce functionality (Homepage, PLP, original PDP, header/nav, footer/shell).
3. Partner **dev store only** for Phase D builds; Ranjeeta’s production store untouched.
4. Small, reviewable Git commits; preview-test after each milestone.

---

## 2. Claude Design sync gate (About & Exhibitions)

### Confirmed repository state (15 October 2026)

**Sync gate passed.** `references/claude-design/handoff/` now includes **about** and **exhibitions** alongside homepage, plp, pdp, and header. Screenshots live under `references/claude-design/screenshots/v2/` (`about-*`, `exhibitions-*`). Package inventory: `references/claude-design/about-exhibitions-MANIFEST.md`.

### Required import layout

```text
references/claude-design/handoff/about/
  about-implementation-handoff.md   (or equivalent primary handoff)
  amendments/                       (section-background amendment, etc.)
  reference/                        (HTML or other interactive references, if any)

references/claude-design/handoff/exhibitions/
  exhibitions-implementation-handoff.md
  work-and-series-links-addendum.md (or equivalent)
  amendments/                       (if separate)
  reference/                        (if any)

references/claude-design/screenshots/v2/
  (About desktop/mobile captures)
  (Exhibitions desktop/mobile captures)
```

Update `references/claude-design/screenshots/v2/README.md` when new screenshot files are added.

### Readiness checklist — import Claude Design packages

Use this before any About or Exhibitions theme work:

- [x] About primary handoff markdown present under `references/claude-design/handoff/about/`
- [x] About section-background amendment present and readable
- [x] About desktop and mobile screenshots (or equivalent visual truth) in `screenshots/v2/` or linked from the handoff
- [x] About reference HTML (if Claude Design produced any) under `handoff/about/reference/`
- [x] Exhibitions primary handoff markdown under `references/claude-design/handoff/exhibitions/`
- [x] Work and Series Links addendum present
- [x] Exhibitions desktop and mobile screenshots present
- [x] Exhibitions reference HTML (if any) present
- [x] Handoffs name the **seven approved surfaces** and contrast-safe foreground rules (or point to a foundations doc that does)
- [x] Distinct About section compositions are specified (not collapsed into one generic pattern)
- [x] Selected Exhibitions vs historical Archive are specified as distinct experiences
- [x] Exhibited product references and related collection links are specified in the addendum
- [x] Files committed to Git (or clearly staged for the next commit) so Cursor and collaborators share the same source
- [x] Short note in [project-status.md](../project-status.md) that the sync gate has passed

**Do not** implement About or Exhibitions from chat summaries or external Claude Design workspace links alone.

---

## 3. About architecture decisions

| Decision | Rule |
|---|---|
| Template | Shopify Page + alternate JSON template (e.g. `page.about.json`) |
| Section architecture | **Derive from the approved handoff.** Do **not** force distinctive chapter compositions into a single generic repeatable image/text section. |
| Surfaces | Per-section Theme Editor surface controls; seven approved choices with contrast-safe foreground styles; defaults reproduce the approved design |
| Content | Owner-editable text, images/artwork, links; no hardcoded biography in Liquid |
| Reuse | Existing V2 primitives (`responsive-image`, `artwork-plate`, typography/buttons, surface tokens) only where they match the handoff composition |

Final section filenames and block schemas are deferred until the handoff is in-repo.

---

## 4. Exhibitions architecture decisions

| Decision | Rule |
|---|---|
| Data model | Prefer structured **Exhibition metaobjects** if the Basic feasibility proof succeeds |
| Selected vs Archive | Preserve **Selected Exhibitions** and the **broader historical Archive** as distinct presentations. Do **not** limit the entire archive to 6–8 featured entries. Featured/selected entries may be a curated subset; the archive holds the full set. |
| Status | Investigate **date-derived status** (upcoming / current / past) with an **optional manual override**, including support for **undated historical** records (override or explicit past/archive placement; never invent dates) |
| Links | Support optional exhibited **product** references and related **collection** references per the Work and Series Links addendum |
| Incomplete data | Omit missing dates, images, and descriptions; do not invent them |
| Owner workflow | Ranjeeta must create, edit, reorder (or control selected vs archive placement), and link records without developer help |

### Metaobject feasibility proof (required before finalizing schema)

On the Partner **Basic** store, before locking architecture:

1. Create a temporary Exhibition-like metaobject definition with: title, optional dates, status/override fields as needed for the proof, **list of product references**, **list of collection references**, optional image.
2. Create 2–3 sample entries (including one undated).
3. Verify **Liquid / Online Store** can read entries on a test page or section (storefront access on Basic).
4. Verify multiple product refs and collection refs render as expected.
5. Walk Ranjeeta’s (or merchant-proxy) Admin path: create, edit, reorder/select, attach products/collections.
6. Record pass/fail and any Basic limitations in this document and [project-status.md](../project-status.md).

If the proof fails, document a Theme Editor / page-section fallback without abandoning Selected vs Archive.

---

## 5. Commerce architecture & repair packages

### Cart experience decision (15 October 2026)

**Decision:** The **full cart page** (`/cart`) is the **primary** cart experience for current V2. **Do not implement a cart drawer** in current V2 scope.

**Rationale:** Original artwork is a considered purchase; approved V2 prioritizes artwork presentation and a calm gallery experience; a dedicated cart page is appropriate when purchasing stays clear and convenient; avoid duplicate cart UIs without demonstrated customer benefit.

**Implications:**

| Requirement | Rule |
|---|---|
| Full cart page (C1) | Keep as primary cart UX; functionally approved (owner preview); broader regression QA before launch |
| Header bag | Preserve bag icon → `/cart` (no drawer open) |
| PDP Add to Bag | Clear confirmation + obvious **View bag** action (existing Ajax path; no drawer) |
| Continue shopping | Keep a useful Continue Exploring Originals (or equivalent) link on `/cart` |
| Checkout & inventory | Keep native checkout and inventory enforcement |
| Discount codes | Evaluate **separately** from any drawer; not tied to C2 |
| Accelerated checkout | **C3** — separate planned enhancement; not tied to a drawer |
| Future drawer | Flexibility preserved: introduce only if user testing demonstrates need |

**C2 status:** **Deferred by design decision** — not a missing feature, not blocked on design confirmation, and **not scheduled for implementation** in current V2.

### Commerce packages

Use the Commerce UX Gap Audit as the gap inventory. Implement as **isolated, testable milestones**.

| ID | Package | Status / when |
|---|---|---|
| **C1** | Full cart page repair (Skeleton → V2-usable `/cart`) | **Primary cart UX.** **Functionally approved** (owner preview); broader regression QA pending before launch — §7 |
| **C2** | Ajax cart drawer | **Deferred by design** — do not implement in current V2. Revisit only after user-testing evidence |
| **C3** | Native accelerated checkout / Shop Pay on original PDP | Separate planned enhancement; after placement confirmation; Admin payments enabled |
| **C4** | Predictive search overlay + styled `/search` | Separate planned enhancement; only after V2 search design is confirmed |
| **C5** | Markets country/currency selector | Only after V2 placement design + Markets Admin audit |
| **Optional** | PLP quick add / image browsing | Pending design review; not required for C1 |

**Preserve:** existing PDP JSON `/cart/add.js` inventory-safe path (confirmation + View bag), header bag badge section rendering linking to `/cart`, approved header architecture, accessibility patterns, native checkout.

---

## 6. Execution sequence

| Order | Milestone | Gate |
|---|---|---|
| **0a** | Sync About + Exhibitions Claude Design packages into Git | Checklist in §2 |
| **0b** | Exhibition metaobject Basic feasibility proof | §4 |
| **1 — FIRST THEME MILESTONE** | **C1 — Full cart page** (primary cart UX) | **Functionally approved** and committed — §7. Broader regression QA before launch. **C2 not in sequence.** |
| **2** | About implementation (handoff-faithful sections) | §2 gate passed |
| **3** | Exhibitions schema finalize + page build | §2 + §4 proof passed |
| **4** | Seed content + wire nav/announcement/recognition links | Content available |
| **5+** | C3 / C4 / C5 (and optional PLP enhancements) | Respective design/Admin gates — **not** C2 |
| **Deferred** | C2 cart drawer | By design decision (15 Oct 2026); not in current V2 |
| **Hold** | Portfolio, Contact, Policies | Ranjeeta approval |

About (2) and Exhibitions (3) must not start before their gates. C1 is functionally approved and committed; remaining cart work is pre-launch regression QA only (§7).

---

## 7. Readiness for the first implementation milestone (C1 — cart page)

**First theme code milestone:** repair `theme/sections/cart.liquid` / `theme/templates/cart.json` into a V2-styled, functional full cart page. **No drawer** (deferred by design — §5). Header bag continues to link to `/cart`.

### Pre-flight checklist

- [x] Working tree understood (`git status`); Phase D docs may be uncommitted alongside C1
- [x] Target Partner store: `zitas-art-studio-development.myshopify.com`
- [x] Preview via `shopify theme dev` (inventory rejection functionally confirmed)
- [x] PoC product Essence V2 available for add-to-cart → `/cart` testing
- [x] Commerce UX Gap Audit Issue 3 cart-page findings accepted as C1 scope
- [x] C1 uses existing V2 tokens/primitives; **no** cart-drawer design (and C2 deferred by decision)
- [x] No production store operations

### C1 implementation status (15 October 2026)

**Status:** **Functionally approved** (owner-led preview); committed locally; **not** pushed or deployed. **Broader regression QA pending before launch** (multi-unit, backorder/overselling, multi-line, no-JS, accessibility announcement, final checkout after rejected update) — see [project-status.md](../project-status.md).

**Shipped in theme:** `theme/sections/cart.liquid`; `theme/templates/cart.json`; `theme/locales/en.default.json`; `theme/assets/zita-cart.js`. Theme Check / JS syntax / locale JSON / `git diff --check` clean at commit.

**Owner preview confirmed:** PDP Add to Bag; header bag count; full cart page display; remove and re-add; Essence V2 quantity above available inventory blocked with corrected validation.

**As-built:** Native `/cart` form (`updates[key]`, update + checkout submits) as no-JS fallback. Quantity `max` is the stricter of variant quantity-rule max and (when inventory is tracked and policy is deny) available `inventory_quantity` — **not** inventory plus current line quantity. Form has no `novalidate`. With JS, “Update bag” posts changed lines to `/cart/change.js` by line key; success reloads the page; failure restores accepted quantities/subtotal/header count and announces an assertive inline error. Inventory-limited lines show a near-input message (“Only N available…”) with `aria-invalid` / `role="alert"`; original-template lines with deny inventory of 1 may show a quiet “One original available.” note. Continue-shopping link present. Checkout submits natively. Header bag → `/cart`. PDP Ajax confirmation + View bag unchanged (no drawer).

**Native form limitation (documented):** Without JS, browser `min`/`max` help, but a plain POST to `/cart` is **not** a guaranteed inventory ceiling — Shopify may still accept an oversold line until checkout or until the Ajax path rejects it.

### C1 acceptance (summary)

- Constrained line-item imagery (no full-bleed oversized product image)
- Quantity update, remove, subtotal, checkout, empty state, continue exploring originals
- Inventory-aware quantity limits + clear “Only N available…” messaging + `/cart/change.js` rejection handling
- Header bag → `/cart`; PDP Add to Bag confirmation + View bag remain clear (no drawer)
- Usable on desktop and mobile; Theme Check clean
- `/cart` is the **primary** cart management surface (drawer **deferred by design**, not pending C2)
- **Functionally approved** via owner preview; **broader regression QA** remains on the pre-launch checklist

---

## 8. Documentation maintenance

When Phase D work proceeds:

| Document | Responsibility |
|---|---|
| [project-status.md](../project-status.md) | Only place for progress, environments, blockers |
| This file | Architecture / sequencing decisions; update when decisions change |
| [shopify-implementation-plan.md](shopify-implementation-plan.md) | Point Phase D row and build sequence here; finalize §15 Exhibition schema after proof |
| Handoffs under `references/claude-design/` | Historical / frozen once imported |

---

## 9. Document status

| Version | Date | Note |
|---|---|---|
| 1.0 | 15 October 2026 | Approved Phase D plan with stakeholder amendments; cart page first; About/Exhibitions gated on handoff sync + metaobject proof |
| 1.1 | 15 October 2026 | C1 cart page implemented in theme; awaiting preview QA before commit |
| 1.2 | 15 October 2026 | C1 inventory validation correction (max formula, no novalidate, change.js + accessible errors); still awaiting browser QA |
| 1.3 | 15 October 2026 | C1 inventory messaging UX: near-input “Only N available” + optional one-original note; functional fix already preview-confirmed |
| 1.4 | 15 October 2026 | Commerce decision: full `/cart` is primary cart UX; C2 drawer deferred by design (not missing); C3/C4 remain separate; optional PLP quick-add pending design review |
| 1.5 | 15 October 2026 | C1 functionally approved (owner preview) and committed; broader regression QA pending before launch |
