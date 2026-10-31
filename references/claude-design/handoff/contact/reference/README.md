# Contact reference source

This is the actual Claude Design source of the approved page, unmodified apart from one bug fix (see below). **REFERENCE ONLY.** Translate it into Liquid sections, snippets and a small JS module. Don't ship it.

- Open `source/Contact.dc.html` through a local static server (for example `npx serve source`), not file://.
- Use the Desktop / Mobile toggle in the top prototype bar. Mobile renders inside a phone frame, with review notes beside it.
- `Contact Form.dc.html` is the form component. It holds all field markup, conditional fields, validation and states. Its logic is plain JavaScript in the `<script data-dc-script>` block at the bottom.
- Review states are props on the page (`data-props` JSON at the bottom of `Contact.dc.html`). Edit the defaults to preview them:
  - `formState`: "live" | "errors" | "success" | "sendError". The send-failure state can only be seen this way.
  - `showCommissionPhotos`: true or false.
- The prototype bar links to other pages that aren't in this package. Ignore them.
- Fonts load from Google Fonts: Marcellus (display), Mulish (body and UI).
- **Fix made while packaging (30 Oct 2026):** when "Start a commission inquiry" or "Trade or designer inquiry" preselected a type, the tile highlight changed but the native radio's `checked` attribute could stay on the previous option. The form now syncs the radios to the selected type. Design unchanged.
