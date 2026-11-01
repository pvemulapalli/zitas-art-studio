/* Header: Originals mega menu (hover or click), compact-header menu overlay, and scroll-aware sticky bar. */
(() => {
  const desktopHeader = window.matchMedia('(min-width: 1000px)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const OPEN_DELAY = 80;
  const CLOSE_DELAY = 120;
  const SCROLL_DELTA = 8;
  const TOP_REVEAL = 24;

  const initStickyHeader = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    // Stick the Shopify section shell — sticky on `.site-header` fails because the
    // section parent is only header-tall and becomes the sticky containing block.
    const shell = header.closest('.shopify-section') || header;
    if (shell.dataset.stickyBound === 'true') return;
    shell.dataset.stickyBound = 'true';

    let lastY = window.scrollY;
    let ticking = false;

    const isNavLocked = () => {
      if (header.matches(':focus-within')) return true;
      if (header.querySelector('.mobile-menu > details[open]')) return true;
      if (header.querySelector('zita-mega-menu details[open]')) return true;
      return false;
    };

    const syncLockClass = () => {
      shell.classList.toggle('is-nav-locked', isNavLocked());
      syncPageHeaderState();
    };

    // Lets other sticky chrome (e.g. PLP filter toolbar) sit below the header when it is shown,
    // and reclaim the top edge only while the header is scroll-hidden.
    const syncPageHeaderState = () => {
      const hidden =
        shell.classList.contains('is-scroll-hidden') &&
        !shell.classList.contains('is-nav-locked') &&
        !header.matches(':focus-within');
      document.documentElement.classList.toggle('is-header-hidden', hidden);
    };

    const update = () => {
      ticking = false;
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      syncLockClass();

      if (reduceMotion.matches || y <= TOP_REVEAL || isNavLocked()) {
        shell.classList.remove('is-scroll-hidden');
        syncPageHeaderState();
        lastY = y;
        return;
      }

      if (Math.abs(delta) < SCROLL_DELTA) return;

      shell.classList.toggle('is-scroll-hidden', delta > 0);
      syncPageHeaderState();
      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Some browsers coalesce programmatic scrolls; scrollend keeps direction state honest.
    window.addEventListener('scrollend', update, { passive: true });
    header.addEventListener('toggle', syncLockClass, true);
    header.addEventListener('focusin', syncLockClass);
    header.addEventListener('focusout', () => window.setTimeout(syncLockClass, 0));
    syncLockClass();
    syncPageHeaderState();
  };

  class ZitaMegaMenu extends HTMLElement {
    connectedCallback() {
      this.details = this.querySelector('details');
      this.summary = this.querySelector('summary');
      this.panel = this.querySelector('.mega-menu');
      if (!this.details || !this.summary) return;

      this.defaultPreview = this.querySelector('.mega-menu__preview-item.is-active')?.dataset.previewIndex ?? '0';
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.addEventListener('pointerenter', (event) => this.onPointerEnter(event), { signal });
      this.addEventListener('pointerleave', (event) => this.onPointerLeave(event), { signal });
      this.summary.addEventListener('click', (event) => this.onSummaryClick(event), { signal });
      this.details.addEventListener('toggle', () => this.onToggle(), { signal });
      this.addEventListener('focusout', (event) => this.onFocusOut(event), { signal });
      document.addEventListener('keydown', (event) => this.onKeydown(event), { signal });
      document.addEventListener('click', (event) => this.onDocumentClick(event), { signal });
      desktopHeader.addEventListener('change', () => this.close(), { signal });

      this.querySelectorAll('.mega-menu__series-link').forEach((link) => {
        const show = () => this.showPreview(link.dataset.previewIndex);
        link.addEventListener('pointerenter', show, { signal });
        link.addEventListener('focus', show, { signal });
      });
    }

    disconnectedCallback() {
      this.controller?.abort();
      clearTimeout(this.openTimer);
      clearTimeout(this.closeTimer);
    }

    open({ byHover = false } = {}) {
      clearTimeout(this.openTimer);
      clearTimeout(this.closeTimer);
      if (this.details.open) return;
      this.openedByHover = byHover;
      this.details.open = true;
    }

    close({ returnFocus = false } = {}) {
      clearTimeout(this.openTimer);
      clearTimeout(this.closeTimer);
      this.openedByHover = false;
      this.details.open = false;
      if (returnFocus) this.summary.focus();
    }

    hoverEnabled(event) {
      return event.pointerType === 'mouse' && finePointer.matches && desktopHeader.matches;
    }

    onPointerEnter(event) {
      if (!this.hoverEnabled(event)) return;
      clearTimeout(this.closeTimer);
      if (!this.details.open) {
        this.openTimer = setTimeout(() => this.open({ byHover: true }), OPEN_DELAY);
      }
    }

    onPointerLeave(event) {
      if (event.pointerType !== 'mouse') return;
      clearTimeout(this.openTimer);
      if (!this.details.open) return;
      const nextItem = event.relatedTarget?.closest?.('.site-nav__item');
      if (nextItem && !nextItem.contains(this)) {
        this.close();
      } else {
        this.closeTimer = setTimeout(() => this.close(), CLOSE_DELAY);
      }
    }

    onSummaryClick(event) {
      clearTimeout(this.openTimer);
      // Clicking a menu the pointer has just opened keeps it open rather than toggling it shut.
      if (this.details.open && this.openedByHover) {
        event.preventDefault();
        this.openedByHover = false;
      }
    }

    onToggle() {
      if (!this.details.open) return;
      document.querySelectorAll('zita-mega-menu').forEach((menu) => {
        if (menu !== this) menu.close();
      });
      this.showPreview(this.defaultPreview);
      this.fitPanel();
    }

    fitPanel() {
      if (!this.panel) return;
      const header = this.closest('.site-header') || this;
      const available = window.innerHeight - Math.max(0, header.getBoundingClientRect().bottom);
      this.panel.style.setProperty('--mega-menu-max-height', `${Math.max(240, Math.round(available))}px`);
    }

    onKeydown(event) {
      if (event.key !== 'Escape' || !this.details.open) return;
      this.close({ returnFocus: this.contains(document.activeElement) });
    }

    onFocusOut(event) {
      if (this.details.open && event.relatedTarget && !this.contains(event.relatedTarget)) this.close();
    }

    onDocumentClick(event) {
      if (this.details.open && !this.contains(event.target)) this.close();
    }

    showPreview(index) {
      this.querySelectorAll('.mega-menu__preview-item').forEach((item) => {
        item.classList.toggle('is-active', item.dataset.previewIndex === index);
      });
      this.querySelectorAll('.mega-menu__series-link').forEach((link) => {
        link.classList.toggle('is-previewed', link.dataset.previewIndex === index);
      });
    }
  }

  class ZitaMobileMenu extends HTMLElement {
    connectedCallback() {
      this.details = this.querySelector('details');
      this.summary = this.querySelector('summary');
      this.panel = this.querySelector('.mobile-menu__panel');
      if (!this.details || !this.summary) return;

      this.inerted = [];
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.details.addEventListener('toggle', () => this.onToggle(), { signal });
      this.panel?.addEventListener(
        'click',
        (event) => {
          if (event.target.closest('a[href]')) this.close();
        },
        { signal }
      );
      document.addEventListener(
        'keydown',
        (event) => {
          if (event.key === 'Escape' && this.details.open) this.close({ returnFocus: true });
        },
        { signal }
      );
      desktopHeader.addEventListener(
        'change',
        () => {
          if (desktopHeader.matches) this.close();
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.releaseBackground();
    }

    close({ returnFocus = false } = {}) {
      this.details.open = false;
      if (returnFocus) this.summary.focus({ preventScroll: true });
    }

    onToggle() {
      if (this.details.open) {
        this.lockBackground();
        const first = this.panel?.querySelector('.mobile-menu__series') || this.panel?.querySelector('a[href]');
        first?.focus({ preventScroll: true });
      } else {
        this.releaseBackground();
        const focus = document.activeElement;
        if (!focus || focus === document.body || this.panel?.contains(focus)) {
          this.summary.focus({ preventScroll: true });
        }
      }
    }

    /* Everything outside the header becomes inert, which keeps Tab inside the bar and the menu. */
    lockBackground() {
      this.releaseBackground();
      let node = this.closest('.shopify-section') || this.closest('.site-header');
      while (node?.parentElement && node !== document.body) {
        for (const sibling of node.parentElement.children) {
          if (sibling !== node && !sibling.inert && !['SCRIPT', 'STYLE', 'LINK'].includes(sibling.tagName)) {
            sibling.inert = true;
            this.inerted.push(sibling);
          }
        }
        node = node.parentElement;
      }
    }

    releaseBackground() {
      this.inerted?.forEach((element) => {
        element.inert = false;
      });
      this.inerted = [];
    }
  }

  if (!customElements.get('zita-mega-menu')) customElements.define('zita-mega-menu', ZitaMegaMenu);
  if (!customElements.get('zita-mobile-menu')) customElements.define('zita-mobile-menu', ZitaMobileMenu);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStickyHeader, { once: true });
  } else {
    initStickyHeader();
  }

  // Theme Editor section reloads replace the shell; allow a fresh bind.
  document.addEventListener('shopify:section:load', (event) => {
    if (!event.target?.querySelector?.('.site-header')) return;
    const shell = event.target.closest?.('.shopify-section') || event.target;
    if (shell?.dataset) delete shell.dataset.stickyBound;
    initStickyHeader();
  });
})();
