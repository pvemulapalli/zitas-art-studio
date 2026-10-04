/* Hero carousel: autoplay with pause rules, controls, keyboard, swipe and theme editor support. */
(() => {
  const mobileQuery = window.matchMedia('(max-width: 749px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const TICK = 250;
  const RESUME_GRACE = 1500;
  const AXIS_LOCK = 8;
  const SWIPE_THRESHOLD = 50;
  const EDGE_RESISTANCE = 0.35;

  class ZitaHeroCarousel extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('.hero__track');
      this.viewport = this.querySelector('.hero__viewport');
      this.slides = Array.from(this.querySelectorAll('.hero-slide'));
      if (!this.track || this.slides.length < 2) return;

      this.dots = Array.from(this.querySelectorAll('[data-dot]'));
      this.count = this.querySelector('[data-count]');
      this.creditLink = this.querySelector('[data-credit-link]');
      this.live = this.querySelector('[data-live]');
      this.playButton = this.querySelector('[data-play]');

      this.index = Math.max(0, this.slides.findIndex((slide) => slide.classList.contains('is-active')));
      this.interval = (Number(this.dataset.interval) || 7) * 1000;
      this.autoplay = this.dataset.autoplay === 'true';
      this.paused = !this.autoplay || reducedMotion.matches;
      this.hovered = false;
      this.focused = false;
      this.dragging = false;
      this.editorHold = false;
      this.lastChange = Date.now();

      this.controller = new AbortController();
      this.bindEvents(this.controller.signal);
      this.updatePlayButton();
      this.render(false);
      if (this.autoplay) this.timer = setInterval(() => this.tick(), TICK);
    }

    disconnectedCallback() {
      this.controller?.abort();
      clearInterval(this.timer);
    }

    bindEvents(signal) {
      const on = (target, type, handler, options = {}) => target.addEventListener(type, handler, { signal, ...options });

      this.dots.forEach((dot, index) => on(dot, 'click', () => this.go(index, true)));
      const prev = this.querySelector('[data-prev]');
      const next = this.querySelector('[data-next]');
      if (prev) on(prev, 'click', () => this.go(this.index - 1, true));
      if (next) on(next, 'click', () => this.go(this.index + 1, true));
      if (this.playButton) on(this.playButton, 'click', () => this.togglePlay());

      on(this, 'keydown', (event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          this.go(this.index + 1, true);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          this.go(this.index - 1, true);
        }
      });

      on(this, 'pointerenter', (event) => {
        if (event.pointerType === 'mouse') this.hovered = true;
      });
      on(this, 'pointerleave', (event) => {
        if (event.pointerType !== 'mouse') return;
        this.hovered = false;
        this.lastChange = Date.now();
      });
      on(this, 'focusin', (event) => {
        this.focused = event.target.matches(':focus-visible');
      });
      on(this, 'focusout', (event) => {
        if (this.contains(event.relatedTarget)) return;
        this.focused = false;
        this.lastChange = Date.now();
      });
      on(document, 'visibilitychange', () => {
        this.lastChange = Date.now();
      });
      on(mobileQuery, 'change', () => this.render(false));

      on(this.viewport, 'pointerdown', (event) => this.onPointerDown(event));
      on(this.viewport, 'pointermove', (event) => this.onPointerMove(event));
      on(this.viewport, 'pointerup', () => this.onPointerEnd());
      on(this.viewport, 'pointercancel', () => this.onPointerEnd());
      on(
        this.viewport,
        'click',
        (event) => {
          if (!this.suppressClick) return;
          event.preventDefault();
          event.stopPropagation();
          this.suppressClick = false;
        },
        { capture: true }
      );

      if (window.Shopify && window.Shopify.designMode) {
        on(document, 'shopify:block:select', (event) => {
          const slideIndex = this.slides.indexOf(event.target);
          if (slideIndex === -1) return;
          this.editorHold = true;
          this.go(slideIndex, false);
        });
        on(document, 'shopify:block:deselect', (event) => {
          if (this.slides.includes(event.target)) this.editorHold = false;
        });
      }
    }

    isRunning() {
      return !this.paused && !this.hovered && !this.focused && !this.dragging && !this.editorHold && !document.hidden;
    }

    tick() {
      if (!this.isRunning()) {
        this.lastChange = Math.max(this.lastChange, Date.now() - this.interval + RESUME_GRACE);
        return;
      }
      if (Date.now() - this.lastChange >= this.interval) this.go(this.index + 1, false);
    }

    go(index, byUser) {
      const total = this.slides.length;
      this.index = (index + total) % total;
      this.lastChange = Date.now();
      this.render(byUser);
    }

    render(announce) {
      const total = this.slides.length;

      this.slides.forEach((slide, index) => {
        const active = index === this.index;
        slide.classList.toggle('is-active', active);
        slide.toggleAttribute('inert', !active);
        if (active) {
          slide.removeAttribute('aria-hidden');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      this.dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === this.index)));

      if (this.count) {
        const pad = (value) => String(value).padStart(2, '0');
        this.count.textContent = `${pad(this.index + 1)} / ${pad(total)}`;
      }

      if (this.creditLink) {
        const slide = this.slides[this.index];
        this.creditLink.textContent = slide.dataset.credit || '';
        if (slide.dataset.creditUrl) {
          this.creditLink.href = slide.dataset.creditUrl;
        } else {
          this.creditLink.removeAttribute('href');
        }
      }

      this.track.style.transform = mobileQuery.matches ? `translateX(${-this.index * 100}%)` : '';

      if (this.live) {
        this.live.setAttribute('aria-live', announce ? 'polite' : 'off');
        this.live.textContent = this.slides[this.index].getAttribute('aria-label') || '';
      }
    }

    togglePlay() {
      this.paused = !this.paused;
      this.lastChange = Date.now();
      this.updatePlayButton();
    }

    updatePlayButton() {
      this.classList.toggle('is-paused', this.paused);
      if (!this.playButton) return;
      this.playButton.setAttribute('aria-label', this.paused ? this.dataset.labelPlay : this.dataset.labelPause);
    }

    onPointerDown(event) {
      if (event.pointerType === 'mouse' || event.button > 0) return;
      this.pointer = { x: event.clientX, y: event.clientY, dx: 0, horizontal: null };
      this.suppressClick = false;
    }

    onPointerMove(event) {
      const pointer = this.pointer;
      if (!pointer) return;

      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      if (pointer.horizontal === null && (Math.abs(dx) > AXIS_LOCK || Math.abs(dy) > AXIS_LOCK)) {
        pointer.horizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (!pointer.horizontal) return;

      pointer.dx = dx;
      this.dragging = true;
      this.suppressClick = true;

      if (mobileQuery.matches) {
        const atEdge = (this.index === 0 && dx > 0) || (this.index === this.slides.length - 1 && dx < 0);
        const offset = atEdge ? dx * EDGE_RESISTANCE : dx;
        this.track.classList.add('is-dragging');
        this.track.style.transform = `translateX(calc(${-this.index * 100}% + ${offset}px))`;
      }
    }

    onPointerEnd() {
      const pointer = this.pointer;
      if (!pointer) return;

      const dx = pointer.horizontal ? pointer.dx : 0;
      this.pointer = null;
      this.dragging = false;
      this.track.classList.remove('is-dragging');

      if (dx < -SWIPE_THRESHOLD) {
        this.go(this.index + 1, true);
      } else if (dx > SWIPE_THRESHOLD) {
        this.go(this.index - 1, true);
      } else {
        this.render(false);
      }
    }
  }

  if (!customElements.get('zita-hero-carousel')) customElements.define('zita-hero-carousel', ZitaHeroCarousel);
})();
