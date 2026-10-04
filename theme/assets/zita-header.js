/* Header: Originals mega menu (hover or click) and the compact-header menu overlay. */
(() => {
  const desktopHeader = window.matchMedia('(min-width: 1000px)');
  const CLOSE_DELAY = 120;

  class ZitaMegaMenu extends HTMLElement {
    connectedCallback() {
      this.details = this.querySelector('details');
      this.summary = this.querySelector('summary');
      if (!this.details || !this.summary) return;

      this.controller = new AbortController();
      const { signal } = this.controller;

      this.addEventListener('pointerenter', (event) => this.onPointerEnter(event), { signal });
      this.addEventListener('pointerleave', (event) => this.onPointerLeave(event), { signal });
      this.summary.addEventListener('click', (event) => this.onSummaryClick(event), { signal });
      this.details.addEventListener('toggle', () => this.onToggle(), { signal });
      this.addEventListener('keydown', (event) => this.onKeydown(event), { signal });
      this.addEventListener('focusout', (event) => this.onFocusOut(event), { signal });
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
      clearTimeout(this.closeTimer);
    }

    open({ byHover = false } = {}) {
      clearTimeout(this.closeTimer);
      this.openedByHover = byHover;
      this.details.open = true;
    }

    close({ returnFocus = false } = {}) {
      clearTimeout(this.closeTimer);
      this.openedByHover = false;
      this.details.open = false;
      if (returnFocus) this.summary.focus();
    }

    onPointerEnter(event) {
      if (event.pointerType !== 'mouse' || !desktopHeader.matches) return;
      if (!this.details.open) this.open({ byHover: true });
      clearTimeout(this.closeTimer);
    }

    onPointerLeave(event) {
      if (event.pointerType !== 'mouse' || !this.details.open) return;
      this.closeTimer = setTimeout(() => this.close(), CLOSE_DELAY);
    }

    onSummaryClick(event) {
      // Clicking a menu the pointer has just opened pins it open rather than toggling it shut.
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
      this.showPreview('0');
    }

    onKeydown(event) {
      if (event.key === 'Escape' && this.details.open) {
        event.stopPropagation();
        this.close({ returnFocus: true });
      }
    }

    onFocusOut(event) {
      if (this.details.open && event.relatedTarget && !this.contains(event.relatedTarget)) this.close();
    }

    onDocumentClick(event) {
      if (this.details.open && !this.contains(event.target)) this.close();
    }

    showPreview(index) {
      this.querySelectorAll('.mega-menu__preview-item').forEach((item) => {
        item.hidden = item.dataset.previewIndex !== index;
      });
    }
  }

  class ZitaMobileMenu extends HTMLElement {
    connectedCallback() {
      this.details = this.querySelector('details');
      this.summary = this.querySelector('summary');
      if (!this.details || !this.summary) return;

      this.controller = new AbortController();
      const { signal } = this.controller;
      const header = this.closest('.site-header') || this;

      this.addEventListener(
        'keydown',
        (event) => {
          if (event.key === 'Escape' && this.details.open) {
            this.details.open = false;
            this.summary.focus();
          }
        },
        { signal }
      );

      header.addEventListener(
        'focusout',
        (event) => {
          if (this.details.open && event.relatedTarget && !header.contains(event.relatedTarget)) {
            this.details.open = false;
          }
        },
        { signal }
      );

      desktopHeader.addEventListener(
        'change',
        () => {
          if (desktopHeader.matches) this.details.open = false;
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
    }
  }

  if (!customElements.get('zita-mega-menu')) customElements.define('zita-mega-menu', ZitaMegaMenu);
  if (!customElements.get('zita-mobile-menu')) customElements.define('zita-mobile-menu', ZitaMobileMenu);
})();
