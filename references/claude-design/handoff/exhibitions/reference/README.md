# Exhibitions reference source

This is the actual Claude Design source of the approved page, including Addendum 01 (links to works and series). **REFERENCE ONLY.** Translate it into Liquid. Don't ship it.

- Open `source/Exhibitions.dc.html` through a local static server (for example `npx serve source`).
- Desktop / Mobile toggle: top prototype bar.
- Review states are props on the page. In this standalone copy, edit the defaults in the `data-props` JSON at the bottom of the file:
  - `showLinks` (default true) shows the SAMPLE work and series links. Set it to false to see the page with no links.
  - `showOnViewSample` (default false) shows the "On view" band layout with bracketed placeholder text. The approved behaviour is that the band is hidden when there are no current or upcoming exhibitions.
- The labelled image slots (Devi, Indulgence, Adiyogi) are placeholders for images still to be supplied.
