/*
 * Original artwork PDP.
 * - product-gallery: from 750px the native scroll strip becomes a cross-fading stage driven by
 *   the thumbnail rail (click, arrow keys); on phones it keeps the swipe strip and updates the tag.
 *   Every panel also opens a full-screen viewer: a native modal <dialog>, so the page behind is
 *   inert and Escape closes it. The larger rendition is only requested when the viewer opens.
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
          this.stage = this.querySelector('.pdp-media__stage');
          this.index = 0;
          this.controller = new AbortController();
          const { signal } = this.controller;

          this.viewer = this.querySelector('[data-viewer]');
          if (this.viewer) this.setUpViewer(signal);
          if (this.panels.length < 2) return;

          this.thumbs = [...this.querySelectorAll('.pdp-media__thumb')];
          this.captionLabel = this.querySelector('[data-caption-label]');
          this.captionCount = this.querySelector('[data-caption-count]');
          this.tag = this.querySelector('[data-tag]');
          this.live = this.closest('product-artwork')?.querySelector('[data-pdp-live]');

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
          if (!wideQuery.matches || event.target.closest('[data-viewer]')) return;
          const thumb = event.target.closest('.pdp-media__thumb');
          const opener = event.target.closest('[data-viewer-open]');
          const steps = thumb
            ? { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
            : { ArrowRight: 1, ArrowLeft: -1 };
          const step = steps[event.key];
          if (!step || (!thumb && !opener && event.target !== this.stage)) return;
          event.preventDefault();
          this.show(this.index + step);
          if (thumb) this.thumbs[this.index].focus();
          if (opener) this.openers[this.index].focus();
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

        setUpViewer(signal) {
          const viewer = this.viewer;
          this.openers = [...this.querySelectorAll('[data-viewer-open]')];
          this.viewerStage = viewer.querySelector('[data-viewer-stage]');
          this.viewerImage = viewer.querySelector('[data-viewer-image]');
          this.viewerLabel = viewer.querySelector('[data-viewer-label]');
          this.viewerCount = viewer.querySelector('[data-viewer-count]');
          this.viewerLive = viewer.querySelector('[data-viewer-live]');
          this.zoomButton = viewer.querySelector('[data-viewer-zoom]');
          this.viewerIndex = 0;
          this.zoomed = false;

          this.openers.forEach((opener, index) => {
            opener.addEventListener('click', () => this.openViewer(index), { signal });
          });
          viewer.querySelector('[data-viewer-close]').addEventListener('click', () => viewer.close(), { signal });
          viewer.querySelectorAll('[data-viewer-step]').forEach((button) => {
            button.addEventListener('click', () => this.showInViewer(this.viewerIndex + Number(button.dataset.viewerStep)), {
              signal,
            });
          });
          this.zoomButton.addEventListener('click', () => this.setZoom(!this.zoomed), { signal });
          this.viewerImage.addEventListener('click', (event) => this.onViewerImageClick(event), { signal });
          this.viewerStage.addEventListener(
            'click',
            (event) => {
              if (event.target === this.viewerStage && !this.zoomed && !this.swiped) viewer.close();
            },
            { signal }
          );
          this.viewerStage.addEventListener('pointerdown', (event) => this.onViewerPointerDown(event), { signal });
          this.viewerStage.addEventListener('pointerup', (event) => this.onViewerPointerUp(event), { signal });
          viewer.addEventListener('keydown', (event) => this.onViewerKeydown(event), { signal });
          viewer.addEventListener('close', () => this.onViewerClose(), { signal });
          window.addEventListener('resize', () => viewer.open && this.sizeViewerImage(), { signal });
          this.classList.add('has-viewer');
        }

        openViewer(index) {
          this.viewer.showModal();
          this.showInViewer(index);
        }

        async showInViewer(index) {
          const count = this.openers.length;
          this.viewerIndex = (index + count) % count;
          const opener = this.openers[this.viewerIndex];
          const panel = opener.closest('.pdp-media__panel');
          const image = this.viewerImage;
          const { srcset, alt } = opener.dataset;
          const token = Symbol('viewer-image');
          this.viewerToken = token;

          this.zoomed = false;
          this.viewer.classList.remove('is-zoomed');
          this.zoomButton.setAttribute('aria-pressed', 'false');
          this.viewer.classList.toggle('is-room', panel.classList.contains('pdp-media__panel--room'));
          this.natural = { width: Number(opener.dataset.width), height: Number(opener.dataset.height) };

          // Show the gallery rendition straight away when it has loaded, then swap in the larger one.
          const preview = panel.querySelector('.pdp-media__image');
          image.removeAttribute('srcset');
          if (preview?.complete && preview.currentSrc) image.src = preview.currentSrc;
          else image.removeAttribute('src');
          image.alt = alt;
          image.width = this.natural.width;
          image.height = this.natural.height;
          this.sizeViewerImage();

          const position = fill(this.dataset.position, { index: this.viewerIndex + 1, count });
          this.viewerLabel.textContent = panel.dataset.label;
          if (this.viewerCount) this.viewerCount.textContent = position;
          const announcement = count > 1 ? fill(this.dataset.announcement, { index: this.viewerIndex + 1, count }) : '';
          announce(this.viewerLive, [announcement, alt].filter(Boolean).join(': '));

          const loader = new Image();
          loader.sizes = image.sizes;
          loader.srcset = srcset;
          try {
            await loader.decode();
          } catch (error) {
            // A failed decode still leaves the gallery rendition in place.
          }
          if (this.viewerToken !== token) return;
          image.srcset = srcset;
        }

        /* Fits the image inside the stage without upscaling; zoom shows the largest rendition at 1:1. */
        sizeViewerImage() {
          const image = this.viewerImage;
          const stage = this.viewerStage;
          const style = getComputedStyle(stage);
          const boxWidth = stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
          const boxHeight = stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
          const { width, height } = this.natural;
          const scale = Math.min(boxWidth / width, boxHeight / height, 1);
          this.fitted = { width: width * scale, height: height * scale };
          this.zoomable = width >= this.fitted.width * 1.25;
          if (!this.zoomable) this.zoomed = false;

          const size = this.zoomed ? this.natural : this.fitted;
          image.style.width = `${Math.round(size.width)}px`;
          image.style.height = `${Math.round(size.height)}px`;
          image.sizes = `${Math.round(size.width)}px`;
          this.zoomButton.hidden = !this.zoomable;
          this.viewer.classList.toggle('is-zoomable', this.zoomable);
          this.viewer.classList.toggle('is-zoomed', this.zoomed);
          this.zoomButton.setAttribute('aria-pressed', String(this.zoomed));
        }

        setZoom(zoomed, point) {
          if (zoomed && !this.zoomable) return;
          const stage = this.viewerStage;
          const before = this.viewerImage.getBoundingClientRect();
          const stageBox = stage.getBoundingClientRect();
          const target = point || { x: stageBox.left + stageBox.width / 2, y: stageBox.top + stageBox.height / 2 };
          const fraction = {
            x: Math.min(1, Math.max(0, (target.x - before.left) / before.width)),
            y: Math.min(1, Math.max(0, (target.y - before.top) / before.height)),
          };

          this.zoomed = zoomed;
          this.sizeViewerImage();
          if (!zoomed) return;
          // Keep the point that was clicked under the pointer.
          const after = this.viewerImage.getBoundingClientRect();
          stage.scrollLeft += after.left + fraction.x * after.width - target.x;
          stage.scrollTop += after.top + fraction.y * after.height - target.y;
        }

        onViewerImageClick(event) {
          if (this.swiped || !this.zoomable) return;
          this.setZoom(!this.zoomed, { x: event.clientX, y: event.clientY });
        }

        onViewerKeydown(event) {
          const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
          const arrow = arrows[event.key];
          if (!arrow || event.altKey || event.ctrlKey || event.metaKey) return;
          if (this.zoomed) {
            event.preventDefault();
            this.viewerStage.scrollBy(arrow[0] * 120, arrow[1] * 120);
          } else if (arrow[0] && this.openers.length > 1) {
            event.preventDefault();
            this.showInViewer(this.viewerIndex + arrow[0]);
          }
        }

        onViewerPointerDown(event) {
          this.swipeStart = event.pointerType === 'mouse' || this.zoomed ? null : { x: event.clientX, y: event.clientY };
        }

        onViewerPointerUp(event) {
          const start = this.swipeStart;
          this.swipeStart = null;
          if (!start || this.openers.length < 2) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
          this.swipedAt = event.timeStamp;
          this.showInViewer(this.viewerIndex + (dx < 0 ? 1 : -1));
        }

        /* The click that follows a swipe must not zoom or close the viewer. */
        get swiped() {
          return this.swipedAt !== undefined && performance.now() - this.swipedAt < 500;
        }

        /* Leaves the gallery on the image last viewed and returns focus to its button. */
        onViewerClose() {
          this.viewerToken = null;
          this.zoomed = false;
          const index = this.viewerIndex;
          if (this.panels.length > 1 && index !== this.index) {
            if (wideQuery.matches) this.show(index);
            else this.stage.scrollTo({ left: index * this.stage.clientWidth, behavior: 'instant' });
          }
          this.openers[index]?.focus({ preventScroll: !wideQuery.matches });
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
