/* Keeps the artwork/room indicator in sync with the native scroll-snap swipe on touch screens. */
if (!customElements.get('plate-views')) {
  customElements.define(
    'plate-views',
    class PlateViews extends HTMLElement {
      connectedCallback() {
        const plate = this.closest('.artwork-plate--swipe');
        if (!plate) return;

        this.dots = plate.querySelectorAll('.artwork-plate__dot');
        this.label = plate.querySelector('.artwork-plate__tag-label');
        this.controller = new AbortController();
        this.addEventListener('scroll', () => this.update(), { passive: true, signal: this.controller.signal });
      }

      disconnectedCallback() {
        this.controller?.abort();
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
