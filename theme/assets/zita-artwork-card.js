/*
 * Touch-screen room swipe for artwork cards: keeps the artwork/room indicator in sync with
 * the native scroll-snap swipe, exposes the plate as a keyboard-scrollable region, and lets
 * a tap on the plate open the artwork (the card's link only covers the caption there).
 */
if (!customElements.get('plate-views')) {
  const touchQuery = window.matchMedia('(hover: none)');

  customElements.define(
    'plate-views',
    class PlateViews extends HTMLElement {
      connectedCallback() {
        const plate = this.closest('.artwork-plate--swipe');
        if (!plate) return;

        this.dots = plate.querySelectorAll('.artwork-plate__dot');
        this.label = plate.querySelector('.artwork-plate__tag-label');
        this.link = this.closest('.artwork-card')?.querySelector('.artwork-card__link');
        this.controller = new AbortController();
        const { signal } = this.controller;

        this.addEventListener('scroll', () => this.update(), { passive: true, signal });
        this.addEventListener('click', () => this.open(), { signal });
        touchQuery.addEventListener('change', () => this.setSemantics(), { signal });
        this.setSemantics();
      }

      disconnectedCallback() {
        this.controller?.abort();
      }

      setSemantics() {
        const label = this.dataset.regionLabel;
        if (touchQuery.matches && label) {
          this.setAttribute('role', 'region');
          this.setAttribute('aria-label', label);
          this.tabIndex = 0;
        } else {
          this.removeAttribute('role');
          this.removeAttribute('aria-label');
          this.removeAttribute('tabindex');
        }
      }

      open() {
        if (touchQuery.matches && this.link) window.location.href = this.link.href;
      }

      update() {
        const onRoom = this.scrollLeft > this.clientWidth / 2;
        this.dots.forEach((dot, index) => dot.classList.toggle('is-current', index === (onRoom ? 1 : 0)));
        if (this.label) {
          this.label.textContent = onRoom ? this.label.dataset.labelRoom : this.label.dataset.labelArt;
        }
      }
    }
  );
}
