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
          this.cartVariantIds = this.parseIdSet(this.dataset.cartVariantIds);
          this.bundleComponentIds = this.parseIdSet(this.dataset.bundleComponentIds);
          this.addEventListener('submit', (event) => this.onSubmit(event), { signal });
          this.addEventListener('change', (event) => this.onChange(event), { signal });
          this.syncVariantState({ updateUrl: false });
        }

        disconnectedCallback() {
          this.controller?.abort();
        }

        parseIdSet(value) {
          return new Set(
            String(value || '')
              .split(',')
              .map((id) => id.trim())
              .filter(Boolean)
          );
        }

        get variants() {
          const node = this.querySelector('[data-product-variants]');
          if (!node) return null;
          if (!this._variants) {
            try {
              this._variants = JSON.parse(node.textContent);
            } catch (error) {
              this._variants = [];
            }
          }
          return this._variants;
        }

        onChange(event) {
          if (!event.target.closest('[data-option-index], [data-variant-select]')) return;
          this.clearPurchaseError();
          this.syncVariantState({ updateUrl: true });
        }

        clearPurchaseError() {
          this.querySelectorAll('[data-purchase-error]').forEach((element) => {
            element.hidden = true;
            element.textContent = '';
          });
        }

        showPurchaseError(message) {
          const text = String(message || '').trim();
          if (!text) {
            this.clearPurchaseError();
            return;
          }
          // One visible status near the purchase form (desktop + mobile). Avoid a second
          // announcement through the visually-hidden live region.
          if (this.live) this.live.textContent = '';
          const targets = [...this.querySelectorAll('[data-purchase-error]')];
          if (!targets.length) {
            announce(this.live, text);
            return;
          }
          targets.forEach((element) => {
            element.hidden = false;
            element.textContent = '';
            window.setTimeout(() => {
              element.textContent = text;
            }, 50);
          });
        }

        collectCartVariantIds(cart) {
          const ids = new Set();
          if (!Array.isArray(cart?.items)) return ids;
          cart.items.forEach((item) => {
            if (item?.id != null) ids.add(String(item.id));
            if (item?.variant_id != null) ids.add(String(item.variant_id));
            const components = item?.item_components;
            if (!Array.isArray(components)) return;
            components.forEach((component) => {
              if (component?.variant_id != null) ids.add(String(component.variant_id));
              if (component?.id != null) ids.add(String(component.id));
            });
          });
          return ids;
        }

        async refreshCartVariantIds() {
          try {
            const response = await fetch(`${this.dataset.cartUrl || '/cart'}.js`, {
              headers: { Accept: 'application/json' },
            });
            if (!response.ok) return this.cartVariantIds;
            const cart = await response.json();
            this.cartVariantIds = this.collectCartVariantIds(cart);
            return this.cartVariantIds;
          } catch (error) {
            return this.cartVariantIds;
          }
        }

        hasBundleComponentInCart(cartIds = this.cartVariantIds) {
          if (!this.bundleComponentIds.size || !cartIds?.size) return false;
          for (const id of this.bundleComponentIds) {
            if (cartIds.has(id)) return true;
          }
          return false;
        }

        isInventoryConflictDescription(description) {
          return /sold out|not available|cannot be added|can't add more|cannot find variant|inventory|in your cart|are in your cart/i.test(
            description
          );
        }

        resolveVariant() {
          const variants = this.variants;
          if (!variants?.length) return null;

          const optionSelects = [...this.querySelectorAll('[data-option-index]')];
          if (optionSelects.length) {
            const selected = optionSelects
              .sort((a, b) => Number(a.dataset.optionIndex) - Number(b.dataset.optionIndex))
              .map((select) => select.value);
            return (
              variants.find(
                (variant) =>
                  Array.isArray(variant.options) &&
                  variant.options.length === selected.length &&
                  variant.options.every((value, index) => value === selected[index])
              ) || null
            );
          }

          const legacy = this.querySelector('[data-variant-select]');
          if (!legacy) return null;
          const id = Number(legacy.value);
          return variants.find((variant) => Number(variant.id) === id) || null;
        }

        applyPurchaseState({ available, inBag, priceFormatted }) {
          const unavailableNote = this.querySelector('[data-variant-unavailable]');
          const addWrap = this.querySelector('[data-purchase-add]');
          const inBagWrap = this.querySelector('[data-purchase-in-bag]');
          const addButton = this.querySelector('[data-add-button]');
          const status = this.querySelector('[data-availability-status]');
          const statusLabel = this.querySelector('[data-availability-label]');
          const bar = this.querySelector('[data-pdp-region="bar"]');

          if (priceFormatted) {
            this.querySelectorAll('[data-price]').forEach((element) => {
              element.textContent = priceFormatted;
            });
          }

          if (unavailableNote) unavailableNote.hidden = available;
          if (statusLabel) {
            statusLabel.textContent = available
              ? this.dataset.availableLabel
              : this.dataset.soldLabel || 'Sold';
          }
          if (status) status.hidden = false;

          if (addButton) addButton.disabled = !available || inBag;
          if (addWrap) addWrap.hidden = inBag;
          if (inBagWrap) inBagWrap.hidden = !inBag;

          if (bar) {
            const barAdd = bar.querySelector('button[type="submit"]');
            if (barAdd) barAdd.disabled = !available || inBag;
          }
        }

        syncVariantState({ updateUrl }) {
          const idInput = this.querySelector('[data-variant-id]');
          const variants = this.variants;

          // Default single-variant products have no picker JSON — preserve server-rendered state,
          // only sync the in-bag / add toggle from cart variant ids.
          if (!variants?.length) {
            if (!idInput) return;
            const inBag = this.cartVariantIds.has(String(idInput.value));
            const addWrap = this.querySelector('[data-purchase-add]');
            const inBagWrap = this.querySelector('[data-purchase-in-bag]');
            const addButton = this.querySelector('[data-add-button]');
            const barAdd = this.querySelector('[data-pdp-region="bar"] button[type="submit"]');
            if (addWrap) addWrap.hidden = inBag;
            if (inBagWrap) inBagWrap.hidden = !inBag;
            if (addButton) addButton.disabled = inBag;
            if (barAdd) barAdd.disabled = inBag;
            return;
          }

          const variant = this.resolveVariant();
          if (variant && idInput) idInput.value = String(variant.id);

          const available = Boolean(variant?.available);
          const inBag = variant ? this.cartVariantIds.has(String(variant.id)) : false;
          this.applyPurchaseState({
            available: Boolean(variant) && available,
            inBag,
            priceFormatted: variant?.price_formatted,
          });

          if (variant?.featured_media_id) {
            const gallery = this.querySelector('product-gallery');
            const panels = gallery ? [...gallery.querySelectorAll('.pdp-media__panel[data-media-id]')] : [];
            const index = panels.findIndex((panel) => panel.dataset.mediaId === String(variant.featured_media_id));
            if (index >= 0 && typeof gallery.show === 'function') gallery.show(index);
            else if (index >= 0 && typeof gallery.setActive === 'function') gallery.setActive(index);
          }

          if (updateUrl && variant?.id && window.history?.replaceState) {
            const url = new URL(window.location.href);
            url.searchParams.set('variant', String(variant.id));
            window.history.replaceState({}, '', url);
          }

          this.updateAskLinks(variant);
        }

        updateAskLinks(variant) {
          const links = this.querySelectorAll('[data-ask-link]');
          if (!links.length) return;
          const variantLabel = Array.isArray(variant?.options)
            ? variant.options.filter(Boolean).join(' / ')
            : '';
          links.forEach((link) => {
            try {
              const url = new URL(link.href, window.location.origin);
              if (variantLabel) url.searchParams.set('variant', variantLabel);
              else url.searchParams.delete('variant');
              link.href = `${url.pathname}${url.search}${url.hash}`;
            } catch (error) {
              // Leave the server-rendered href if URL parsing fails.
            }
          });
        }

        get headerSectionId() {
          const section = document.querySelector('.site-header')?.closest('.shopify-section');
          return section?.id.replace('shopify-section-', '') || '';
        }

        productContextUrl(variantId) {
          const url = new URL(window.location.href);
          if (variantId) url.searchParams.set('variant', String(variantId));
          else url.searchParams.delete('variant');
          // Section Rendering API uses a separate `sections` query; strip any stale value.
          url.searchParams.delete('sections');
          return url;
        }

        sectionsRequestUrl(sectionIds, variantId) {
          const url = this.productContextUrl(variantId);
          url.searchParams.set('sections', sectionIds);
          return url;
        }

        preserveSelectedVariantUrl(variantId) {
          if (!variantId || !window.history?.replaceState) return;
          const url = this.productContextUrl(variantId);
          window.history.replaceState({}, '', url);
        }

        selectVariantById(variantId) {
          if (!variantId) return false;
          const variants = this.variants;
          if (!variants?.length) {
            const idInput = this.querySelector('[data-variant-id]');
            if (idInput) idInput.value = String(variantId);
            return Boolean(idInput);
          }

          const variant = variants.find((entry) => Number(entry.id) === Number(variantId));
          if (!variant) return false;

          const optionSelects = [...this.querySelectorAll('[data-option-index]')];
          if (optionSelects.length && Array.isArray(variant.options)) {
            optionSelects
              .sort((a, b) => Number(a.dataset.optionIndex) - Number(b.dataset.optionIndex))
              .forEach((select, index) => {
                if (variant.options[index] != null) select.value = variant.options[index];
              });
          } else {
            const legacy = this.querySelector('[data-variant-select]');
            if (legacy) legacy.value = String(variant.id);
          }

          const idInput = this.querySelector('[data-variant-id]');
          if (idInput) idInput.value = String(variant.id);
          return true;
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
          // Prefer the picker-managed variant input; form.elements.id can be ambiguous
          // when Shopify injects additional hidden fields into the product form.
          const variantId = Number(
            form.querySelector('[data-variant-id]')?.value || form.elements.id?.value
          );
          this.preserveSelectedVariantUrl(variantId);
          // Shopify enforces the inventory ceiling for JSON `items` adds but lets
          // form-encoded adds exceed it, so a one-of-one could land in a bag twice.
          // sections_url must include ?variant= so Liquid re-renders the same selection.
          const contextUrl = this.productContextUrl(variantId);
          const body = JSON.stringify({
            items: [{ id: variantId, quantity: 1 }],
            sections: sectionIds,
            sections_url: `${contextUrl.pathname}${contextUrl.search}`,
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
              this.clearPurchaseError();
              if (variantId) this.cartVariantIds.add(String(variantId));
              this.render(data.sections, fromBar, { restoreVariantId: variantId });
              announce(this.live, this.dataset.addedMessage);
            } else {
              await this.handleAddFailure({
                data,
                variantId,
                sectionIds,
                fromBar,
              });
            }
          } catch (error) {
            window.location.reload();
          } finally {
            this.busy = false;
            this.removeAttribute('aria-busy');
          }
        }

        async handleAddFailure({ data, variantId, sectionIds, fromBar }) {
          const description = String(data?.description || data?.message || '').trim();
          const selectedBefore = Array.isArray(this.variants)
            ? this.variants.find((entry) => Number(entry.id) === variantId)
            : null;

          // Keep ?variant= so section HTML matches the selection that failed.
          this.preserveSelectedVariantUrl(variantId);
          const sectionsUrl = this.sectionsRequestUrl(sectionIds, variantId);
          const sections = await fetch(`${sectionsUrl.pathname}${sectionsUrl.search}`).then((response) =>
            response.json()
          );
          this.render(sections, fromBar, { restoreVariantId: variantId });

          const stillForSale = Boolean(this.querySelector('[data-product-form]'));
          const selectedAfter = Array.isArray(this.variants)
            ? this.variants.find((entry) => Number(entry.id) === variantId)
            : null;
          const combinationUnavailable =
            (Array.isArray(this.variants) && this.variants.length > 0 && !selectedAfter) ||
            selectedAfter?.available === false ||
            selectedBefore?.available === false;

          // Parent already represented as in-cart after the section refresh.
          if (this.cartVariantIds.has(String(variantId))) {
            this.syncVariantState({ updateUrl: false });
            this.clearPurchaseError();
            announce(this.live, this.dataset.inBagMessage);
            return;
          }

          // Unavailable option combination — use the existing unavailable note + disabled ATC.
          // Do not invent a Sold badge from a 422 alone.
          if (combinationUnavailable && stillForSale) {
            this.clearPurchaseError();
            this.syncVariantState({ updateUrl: false });
            announce(this.live, this.dataset.unavailableMessage);
            return;
          }

          // Truly sold at the product level (Liquid removed the purchase form).
          if (!stillForSale) {
            this.clearPurchaseError();
            announce(this.live, this.dataset.soldMessage);
            return;
          }

          const cartIds = await this.refreshCartVariantIds();
          this.syncVariantState({ updateUrl: false });

          if (this.hasBundleComponentInCart(cartIds)) {
            // Confirmed: a known bundle component variant is already in the cart.
            this.showPurchaseError(this.dataset.bundleInCartMessage);
            return;
          }

          if (this.isInventoryConflictDescription(description)) {
            // Bundles / inventory rejection while this parent still looks available.
            // Do not flip the availability badge to Sold or permanently disable ATC.
            this.showPurchaseError(this.dataset.bundleAmbiguousMessage);
            return;
          }

          // Preserve a short Shopify description when it is already customer-safe prose.
          const safeDescription =
            description &&
            description.length <= 140 &&
            !/[{}\[\]\\]/.test(description) &&
            !/status|error|http|422|json/i.test(description)
              ? description
              : '';
          this.showPurchaseError(safeDescription || this.dataset.addErrorMessage);
        }

        render(sections, fromBar, { restoreVariantId } = {}) {
          const html = sections?.[this.dataset.sectionId];
          if (!html) throw new Error('Section not rendered');
          const doc = new DOMParser().parseFromString(html, 'text/html');

          this.querySelectorAll('[data-pdp-region]').forEach((region) => {
            const next = doc.querySelector(`[data-pdp-region="${region.dataset.pdpRegion}"]`);
            if (next) region.innerHTML = next.innerHTML;
          });

          this._variants = null;

          const headerHtml = sections[this.headerSectionId];
          if (headerHtml) {
            const nextBag = new DOMParser().parseFromString(headerHtml, 'text/html').querySelector('.site-header__bag');
            if (nextBag) document.querySelector('.site-header__bag')?.replaceWith(nextBag);
          }

          // Section HTML from cart/add can re-render the first available variant. Restore the
          // variant that was actually submitted so option selects, price, and in-cart state match.
          if (restoreVariantId) this.selectVariantById(restoreVariantId);
          this.syncVariantState({ updateUrl: Boolean(restoreVariantId) });

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
