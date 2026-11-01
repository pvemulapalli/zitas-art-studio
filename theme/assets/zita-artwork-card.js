/*
 * Artwork card enhancements:
 * - Touch room swipe (plate-views)
 * - Collection Quick Add via event delegation (survives collection filter re-renders)
 */
(() => {
  const touchQuery = window.matchMedia('(hover: none)');

  const headerSectionId = () => {
    const section = document.querySelector('.site-header')?.closest('.shopify-section');
    return section?.id?.replace(/^shopify-section-/, '') || '';
  };

  const updateBagBadge = (sections) => {
    const sectionId = headerSectionId();
    const html = sectionId ? sections?.[sectionId] : null;
    if (!html) return;
    const nextBag = new DOMParser().parseFromString(html, 'text/html').querySelector('.site-header__bag');
    if (nextBag) document.querySelector('.site-header__bag')?.replaceWith(nextBag);
  };

  const announce = (live, message) => {
    if (!live || !message) return;
    live.textContent = '';
    window.setTimeout(() => {
      live.textContent = message;
    }, 40);
  };

  if (!customElements.get('plate-views')) {
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

  document.addEventListener(
    'click',
    (event) => {
      const options = event.target.closest('[data-quick-add-options]');
      if (options) {
        event.stopPropagation();
        return;
      }

      const button = event.target.closest('[data-quick-add]');
      if (!button) return;

      event.preventDefault();
      event.stopPropagation();
      if (button.getAttribute('aria-disabled') === 'true' || button.classList.contains('is-busy')) return;

      const variantId = Number(button.dataset.variantId);
      if (!variantId) return;

      void (async () => {
        const card = button.closest('.artwork-card');
        const live = card?.querySelector('[data-quick-add-live]');
        const label = button.querySelector('.artwork-card__quick-add-text');
        const addLabel = button.dataset.addLabel || 'Add';
        const addingLabel = button.dataset.addingLabel || 'Adding…';
        const addedLabel = button.dataset.addedLabel || 'Added';
        const errorLabel = button.dataset.errorLabel || 'Could not add this artwork. Please try again.';
        const title = button.dataset.productTitle || 'Artwork';

        button.classList.add('is-busy', 'is-expanded');
        button.setAttribute('aria-disabled', 'true');
        if (label) label.textContent = addingLabel;

        const sectionId = headerSectionId();
        const body = {
          items: [{ id: variantId, quantity: 1 }],
        };
        if (sectionId) {
          body.sections = sectionId;
          body.sections_url = `${window.location.pathname}${window.location.search}`;
        }

        let response;
        let data;
        try {
          const root = window.Shopify?.routes?.root || '/';
          response = await fetch(`${root}cart/add.js`, {
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          data = await response.json();
        } catch (error) {
          button.classList.remove('is-busy');
          button.removeAttribute('aria-disabled');
          if (label) label.textContent = addLabel;
          announce(live, errorLabel);
          return;
        }

        if (response.ok) {
          updateBagBadge(data.sections || {});
          button.classList.remove('is-busy');
          button.classList.add('is-added', 'is-expanded');
          if (label) label.textContent = addedLabel;
          announce(live, `${title} added to your cart.`);
          window.setTimeout(() => {
            button.classList.remove('is-expanded');
          }, 1600);
          return;
        }

        button.classList.remove('is-busy');
        button.removeAttribute('aria-disabled');
        if (label) label.textContent = addLabel;
        const description = String(data?.description || data?.message || '').trim();
        announce(live, description || errorLabel);
      })();
    },
    true
  );
})();
