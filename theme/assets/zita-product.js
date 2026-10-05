/*
 * Original artwork PDP.
 * - product-gallery: from 750px the native scroll strip becomes a cross-fading stage driven by
 *   the thumbnail rail (click, arrow keys); on phones it keeps the swipe strip and updates the tag.
 * - product-artwork: Add to bag over /cart/add.js. Purchase state is never rebuilt in JavaScript:
 *   the server re-renders this section and the header in the same request, and the purchase
 *   regions and bag badge are swapped in. Without JavaScript the form posts to /cart/add.
 * - product-recommendations: loads related works through the Section Rendering API near the viewport.
 */
(() => {
  const wideQuery = window.matchMedia('(min-width: 750px)');
  const fill = (template, values) => template.replace(/\[(\w+)\]/g, (match, key) => values[key] ?? match);

  const announce = (live, message) => {
    if (!live || !message) return;
    live.textContent = '';
    window.setTimeout(() => {
      live.textContent = message;
    }, 50);
  };

  if (!customElements.get('product-gallery')) {
    customElements.define(
      'product-gallery',
      class ProductGallery extends HTMLElement {
        connectedCallback() {
          this.panels = [...this.querySelectorAll('.pdp-media__panel')];
          if (this.panels.length < 2) return;

          this.thumbs = [...this.querySelectorAll('.pdp-media__thumb')];
          this.stage = this.querySelector('.pdp-media__stage');
          this.captionLabel = this.querySelector('[data-caption-label]');
          this.captionCount = this.querySelector('[data-caption-count]');
          this.tag = this.querySelector('[data-tag]');
          this.live = this.closest('product-artwork')?.querySelector('[data-pdp-live]');
          this.index = 0;
          this.controller = new AbortController();
          const { signal } = this.controller;

          this.thumbs.forEach((thumb, index) => {
            thumb.addEventListener('click', () => this.show(index), { signal });
            thumb.addEventListener('pointerenter', () => this.preload(index), { signal });
            thumb.addEventListener('focus', () => this.preload(index), { signal });
          });
          this.addEventListener('keydown', (event) => this.onKeydown(event), { signal });
          this.stage.addEventListener('scroll', () => this.onScroll(), { passive: true, signal });
          this.classList.add('is-enhanced');
        }

        disconnectedCallback() {
          this.controller?.abort();
          clearTimeout(this.scrollTimer);
          clearTimeout(this.fadeTimer);
        }

        onKeydown(event) {
          if (!wideQuery.matches) return;
          const thumb = event.target.closest('.pdp-media__thumb');
          const steps = thumb
            ? { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
            : { ArrowRight: 1, ArrowLeft: -1 };
          const step = steps[event.key];
          if (!step || (!thumb && event.target !== this.stage)) return;
          event.preventDefault();
          this.show(this.index + step);
          if (thumb) this.thumbs[this.index].focus();
        }

        show(index) {
          const next = (index + this.panels.length) % this.panels.length;
          if (next === this.index) return;
          const previous = this.panels[this.index];
          this.panels.forEach((panel) => panel.classList.remove('is-previous'));
          previous.classList.add('is-previous');
          this.classList.add('has-swapped');
          this.setActive(next);
          clearTimeout(this.fadeTimer);
          this.fadeTimer = setTimeout(() => previous.classList.remove('is-previous'), 400);
        }

        setActive(index) {
          this.index = index;
          this.panels.forEach((panel, n) => panel.classList.toggle('is-active', n === index));
          this.thumbs.forEach((thumb, n) => {
            if (n === index) thumb.setAttribute('aria-current', 'true');
            else thumb.removeAttribute('aria-current');
          });
          const position = fill(this.dataset.position, { index: index + 1, count: this.panels.length });
          if (this.captionLabel) this.captionLabel.textContent = this.panels[index].dataset.label;
          if (this.captionCount) this.captionCount.textContent = position;
          this.preload(index);
          return position;
        }

        /* An inactive panel is display:none, so its lazy image only loads once it is about to show. */
        preload(index) {
          const image = this.panels[index]?.querySelector('img[loading="lazy"]');
          if (image) image.loading = 'eager';
        }

        onScroll() {
          if (wideQuery.matches) return;
          clearTimeout(this.scrollTimer);
          this.scrollTimer = setTimeout(() => {
            const index = Math.min(
              this.panels.length - 1,
              Math.max(0, Math.round(this.stage.scrollLeft / this.stage.clientWidth))
            );
            const changed = index !== this.index;
            const position = this.setActive(index);
            if (this.tag) this.tag.textContent = position;
            if (changed) {
              announce(this.live, fill(this.dataset.announcement, { index: index + 1, count: this.panels.length }));
            }
          }, 120);
        }
      }
    );
  }

  if (!customElements.get('product-artwork')) {
    customElements.define(
      'product-artwork',
      class ProductArtwork extends HTMLElement {
        connectedCallback() {
          this.live = this.querySelector('[data-pdp-live]');
          this.controller = new AbortController();
          const { signal } = this.controller;
          this.addEventListener('submit', (event) => this.onSubmit(event), { signal });
          this.addEventListener('change', (event) => this.onChange(event), { signal });
        }

        disconnectedCallback() {
          this.controller?.abort();
        }

        onChange(event) {
          const select = event.target.closest('[data-variant-select]');
          const price = select?.selectedOptions[0]?.dataset.price;
          if (!price) return;
          this.querySelectorAll('[data-price]').forEach((element) => {
            element.textContent = price;
          });
        }

        get headerSectionId() {
          const section = document.querySelector('.site-header')?.closest('.shopify-section');
          return section?.id.replace('shopify-section-', '') || '';
        }

        async onSubmit(event) {
          const form = event.target;
          if (!form.matches('[data-product-form]')) return;
          event.preventDefault();
          if (this.busy) return;
          this.busy = true;
          this.setAttribute('aria-busy', 'true');

          const fromBar = Boolean(event.submitter?.closest('[data-pdp-region="bar"]'));
          const sectionIds = [this.dataset.sectionId, this.headerSectionId].filter(Boolean).join(',');
          // Shopify enforces the inventory ceiling for JSON `items` adds but lets
          // form-encoded adds exceed it, so a one-of-one could land in a bag twice.
          const body = JSON.stringify({
            items: [{ id: Number(form.elements.id.value), quantity: 1 }],
            sections: sectionIds,
            sections_url: window.location.pathname,
          });

          let response;
          let data;
          try {
            response = await fetch(`${this.dataset.cartAddUrl}.js`, {
              method: 'POST',
              headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
              body,
            });
            data = await response.json();
          } catch (error) {
            form.submit();
            return;
          }

          try {
            if (response.ok) {
              this.render(data.sections, fromBar);
              announce(this.live, this.dataset.addedMessage);
            } else {
              // Usually 422: the only unit is already in a bag. Show whatever the store now says.
              const sections = await fetch(`${window.location.pathname}?sections=${sectionIds}`).then((r) => r.json());
              this.render(sections, fromBar);
              const stillForSale = Boolean(this.querySelector('[data-product-form]'));
              announce(this.live, stillForSale ? this.dataset.inBagMessage : this.dataset.soldMessage);
            }
          } catch (error) {
            window.location.reload();
          } finally {
            this.busy = false;
            this.removeAttribute('aria-busy');
          }
        }

        render(sections, fromBar) {
          const html = sections?.[this.dataset.sectionId];
          if (!html) throw new Error('Section not rendered');
          const doc = new DOMParser().parseFromString(html, 'text/html');

          this.querySelectorAll('[data-pdp-region]').forEach((region) => {
            const next = doc.querySelector(`[data-pdp-region="${region.dataset.pdpRegion}"]`);
            if (next) region.innerHTML = next.innerHTML;
          });

          const headerHtml = sections[this.headerSectionId];
          if (headerHtml) {
            const nextBag = new DOMParser().parseFromString(headerHtml, 'text/html').querySelector('.site-header__bag');
            if (nextBag) document.querySelector('.site-header__bag')?.replaceWith(nextBag);
          }

          const region = this.querySelector(`[data-pdp-region="${fromBar ? 'bar' : 'buy'}"]`);
          region?.querySelector('[data-view-bag], a, button:not(:disabled)')?.focus();
        }
      }
    );
  }

  if (!customElements.get('product-recommendations')) {
    customElements.define(
      'product-recommendations',
      class ProductRecommendations extends HTMLElement {
        connectedCallback() {
          if (!this.dataset.url || this.observer || this.childElementCount) return;
          this.observer = new IntersectionObserver(
            (entries) => {
              if (!entries.some((entry) => entry.isIntersecting)) return;
              this.observer.disconnect();
              this.load();
            },
            { rootMargin: '0px 0px 600px 0px' }
          );
          this.observer.observe(this);
        }

        disconnectedCallback() {
          this.observer?.disconnect();
        }

        async load() {
          try {
            const response = await fetch(this.dataset.url);
            if (!response.ok) return;
            const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
            const next = doc.querySelector('product-recommendations');
            if (next?.childElementCount) this.innerHTML = next.innerHTML;
          } catch (error) {
            // Related works are supplementary; the section simply stays empty.
          }
        }
      }
    );
  }
})();
