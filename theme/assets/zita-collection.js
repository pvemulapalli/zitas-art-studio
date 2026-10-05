/*
 * Enhances the collection gallery's Filter & Sort form, which works on its own as a plain GET
 * form inside <details>. With JavaScript: filters apply as they change by re-rendering this
 * section through the Section Rendering API (falling back to normal navigation on any error),
 * the URL is kept in sync with history.replaceState, and the drawer behaves as a modal dialog
 * (background inert, Esc and scrim close it, focus returns to the trigger).
 */
if (!customElements.get('collection-gallery')) {
  customElements.define(
    'collection-gallery',
    class CollectionGallery extends HTMLElement {
      connectedCallback() {
        this.drawer = this.querySelector('[data-filter-drawer]');
        this.form = this.querySelector('[data-filter-form]');
        if (!this.drawer || !this.form) return;

        this.summary = this.drawer.querySelector('summary');
        this.live = this.querySelector('[data-filter-live]');
        this.inerted = [];
        this.controller = new AbortController();
        const { signal } = this.controller;

        this.drawer.addEventListener('toggle', () => this.onToggle(), { signal });
        this.drawer.addEventListener('keydown', (event) => this.onKeydown(event), { signal });
        this.addEventListener('click', (event) => this.onClick(event), { signal });
        this.form.addEventListener('change', () => this.apply(this.formUrl()), { signal });
        this.form.addEventListener('submit', (event) => this.onSubmit(event), { signal });
      }

      disconnectedCallback() {
        this.controller?.abort();
        this.request?.abort();
        this.releaseBackground();
      }

      onToggle() {
        if (this.drawer.open) {
          this.lockBackground();
          this.drawer.querySelector('.filter-drawer__close')?.focus();
        } else {
          this.releaseBackground();
          const focus = document.activeElement;
          if (!focus || focus === document.body || this.drawer.contains(focus)) {
            this.summary.focus({ preventScroll: true });
          }
        }
      }

      onKeydown(event) {
        if (event.key === 'Escape' && this.drawer.open) {
          event.preventDefault();
          this.close();
        }
      }

      onClick(event) {
        const closer = event.target.closest('[data-filter-close]');
        if (closer && this.drawer.contains(closer)) {
          event.preventDefault();
          this.close();
          return;
        }

        const link = event.target.closest('a[data-filter-link]');
        if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        this.apply(link.href);
      }

      async onSubmit(event) {
        event.preventDefault();
        const url = this.formUrl();
        if (url !== window.location.pathname + window.location.search) await this.apply(url);
        this.close();
      }

      close() {
        this.drawer.open = false;
      }

      /* Everything outside the drawer panel becomes inert, which also traps focus inside it. */
      lockBackground() {
        this.releaseBackground();
        let node = this.drawer;
        while (node.parentElement && node !== document.body) {
          for (const sibling of node.parentElement.children) {
            if (sibling !== node && !sibling.inert) {
              sibling.inert = true;
              this.inerted.push(sibling);
            }
          }
          node = node.parentElement;
        }
        this.summary.inert = true;
        this.inerted.push(this.summary);
      }

      releaseBackground() {
        this.inerted?.forEach((element) => {
          element.inert = false;
        });
        this.inerted = [];
      }

      formUrl() {
        const params = new URLSearchParams();
        for (const [key, value] of new FormData(this.form)) {
          if (String(value).trim() !== '') params.append(key, value);
        }
        const query = params.toString();
        return new URL(this.form.action).pathname + (query ? `?${query}` : '');
      }

      async apply(url) {
        const target = new URL(url, window.location.origin);
        const sectionUrl = new URL(target);
        sectionUrl.searchParams.set('section_id', this.dataset.sectionId);

        this.request?.abort();
        const request = new AbortController();
        this.request = request;
        this.setAttribute('aria-busy', 'true');

        try {
          const response = await fetch(sectionUrl, { signal: request.signal });
          if (!response.ok) throw new Error(`Section request failed: ${response.status}`);
          const html = await response.text();
          this.refresh(new DOMParser().parseFromString(html, 'text/html'));
          window.history.replaceState(window.history.state, '', target.pathname + target.search);
        } catch (error) {
          if (error.name !== 'AbortError') window.location.assign(target);
        } finally {
          if (this.request === request) this.removeAttribute('aria-busy');
        }
      }

      /* Swaps the server-rendered regions, keeping focus (and a half-typed price) where it was. */
      refresh(doc) {
        const active = document.activeElement;
        const activeId = this.contains(active) ? active.id : '';
        const typedValue = active?.matches?.('input[type="number"]') ? active.value : null;

        this.querySelectorAll('[data-refresh]').forEach((region) => {
          const next = doc.querySelector(`[data-refresh="${region.dataset.refresh}"]`);
          if (next) region.innerHTML = next.innerHTML;
        });

        const restored = activeId ? document.getElementById(activeId) : null;
        if (restored) {
          if (typedValue !== null) restored.value = typedValue;
          restored.focus({ preventScroll: true });
        } else if (!this.contains(document.activeElement)) {
          (this.drawer.open ? this.drawer.querySelector('.filter-drawer__close') : this.summary)?.focus({
            preventScroll: true,
          });
        }

        if (this.drawer.open && this.live) {
          this.live.textContent = this.querySelector('[data-refresh="count"]')?.textContent.trim() ?? '';
        }
      }
    }
  );
}
