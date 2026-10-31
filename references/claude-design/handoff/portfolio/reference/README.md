# Portfolio reference source

This is the actual Claude Design source of the approved page, unmodified. **REFERENCE ONLY.** Translate it into Liquid sections, blocks and snippets. Don't ship it.

- Open `source/Portfolio.dc.html` through a local static server (for example `npx serve source`), not file://. It loads `support.js` and the sibling `.dc.html` components.
- Use the Desktop / Mobile toggle in the top prototype bar. Mobile renders inside a phone frame, with review notes beside it.
- **Room data** lives in the `blocks` array inside the `<script data-dc-script>` block at the bottom of `Portfolio.dc.html`. It mirrors the proposed Theme Editor block fields (series name, work, image, alt, pattern, second image, reflection, current).
- **Pattern logic** is in the same script: the Hang side alternates across Hang rooms only, numerals come from position, and the "Current series" marker is a per-room flag.
- **Variant preview:** set `"futureRoom"` → `"default": true` in the `data-props` JSON at the bottom of the file to see a sixth room slot in (it shows a placeholder image slot).
- Template markup is in `<x-dc>`. Every style is inline, and the values there are exact.
- `_ds/…` holds the design-system tokens and bundle (Button and TextLink components). `zita-v2.css` overrides the type tokens to Marcellus and Mulish.
- `art/` includes the five Portfolio works, plus images used only by the shared header's dropdown preview.
- The prototype bar links to other pages that aren't in this package. Ignore them.
