/**
 * Cart page progressive enhancement (Phase D C1).
 * Intercepts "Update bag" and posts each changed line to /cart/change.js with the line key.
 * On success: full reload so Liquid, totals, and header badge match Shopify.
 * On failure: restore previously accepted quantities and announce an accessible error.
 * Inventory-limited lines show a clear near-input message when quantity exceeds availability.
 * Checkout submits natively. Without this script the form POSTs to /cart (browser max/min only).
 */
(() => {
  if (customElements.get('cart-page')) return;

  const messageFrom = (data, fallback) => {
    if (!data || typeof data !== 'object') return fallback;
    return (
      data.description ||
      data.message ||
      data.errors?.join?.(' ') ||
      (typeof data.errors === 'string' ? data.errors : null) ||
      fallback
    );
  };

  customElements.define(
    'cart-page',
    class CartPage extends HTMLElement {
      connectedCallback() {
        this.form = this.querySelector('[data-cart-form]');
        this.status = this.querySelector('[data-cart-status]');
        this.changeUrl = this.dataset.cartChangeUrl;
        if (!this.form || !this.changeUrl) return;

        this.controller = new AbortController();
        const { signal } = this.controller;
        this.busy = false;

        this.form.addEventListener('submit', (event) => this.onSubmit(event), { signal });
        this.form.addEventListener('input', (event) => this.onQuantityInput(event), { signal });
        this.reconcileOversold().catch(() => {});
      }

      disconnectedCallback() {
        this.controller?.abort();
      }

      inputs() {
        return [...this.form.querySelectorAll('[data-cart-qty]')];
      }

      lineError(input) {
        const id = input.dataset.lineError;
        return id ? document.getElementById(id) : null;
      }

      clearStatus() {
        if (!this.status) return;
        this.status.hidden = true;
        this.status.textContent = '';
      }

      showStatus(message) {
        if (!this.status || !message) return;
        this.status.hidden = false;
        this.status.textContent = message;
        this.status.focus({ preventScroll: false });
      }

      clearLineError(input) {
        input.setCustomValidity('');
        input.setAttribute('aria-invalid', 'false');
        const error = this.lineError(input);
        if (!error) return;
        error.hidden = true;
        error.textContent = '';
      }

      showLineError(input, message) {
        if (!message) return;
        input.setCustomValidity(message);
        input.setAttribute('aria-invalid', 'true');
        const error = this.lineError(input);
        if (error) {
          error.hidden = false;
          error.textContent = message;
        }
      }

      clearAllLineErrors() {
        this.inputs().forEach((input) => this.clearLineError(input));
      }

      availableMessage(input) {
        return input.dataset.availableMessage || '';
      }

      exceedsAvailable(input) {
        if (!this.availableMessage(input)) return false;
        const max = input.max === '' ? null : Number(input.max);
        const value = Number(input.value);
        return max != null && !Number.isNaN(max) && !Number.isNaN(value) && value > max;
      }

      syncQuantityValidity(input) {
        if (!(input instanceof HTMLInputElement) || !input.matches('[data-cart-qty]')) return;

        if (this.exceedsAvailable(input)) {
          this.showLineError(input, this.availableMessage(input));
          return;
        }

        this.clearLineError(input);
      }

      onQuantityInput(event) {
        const input = event.target;
        if (!(input instanceof HTMLInputElement) || !input.matches('[data-cart-qty]')) return;
        this.clearStatus();
        this.syncQuantityValidity(input);
      }

      restoreAccepted() {
        this.inputs().forEach((input) => {
          input.value = input.dataset.acceptedQuantity ?? input.defaultValue;
          this.clearLineError(input);
        });
      }

      setBusy(busy) {
        this.busy = busy;
        this.form.setAttribute('aria-busy', busy ? 'true' : 'false');
        this.form.querySelectorAll('button[type="submit"]').forEach((button) => {
          button.disabled = busy;
        });
      }

      async changeLine(key, quantity) {
        const response = await fetch(this.changeUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: key, quantity }),
        });

        let data = null;
        try {
          data = await response.json();
        } catch (error) {
          data = null;
        }

        if (!response.ok) {
          const error = new Error(messageFrom(data, this.dataset.errorGeneric));
          error.data = data;
          throw error;
        }

        /* Some Shopify responses return 200 with a status/message payload on failure. */
        if (data && (data.status === 422 || data.status === 'bad_request' || data.errors)) {
          const error = new Error(messageFrom(data, this.dataset.errorGeneric));
          error.data = data;
          throw error;
        }

        return data;
      }

      async reconcileOversold() {
        const fixes = this.inputs().filter((input) => {
          const max = input.max === '' ? null : Number(input.max);
          const value = Number(input.value);
          return max != null && !Number.isNaN(max) && value > max;
        });
        if (!fixes.length) return;

        this.setBusy(true);
        try {
          for (const input of fixes) {
            const max = Number(input.max);
            await this.changeLine(input.dataset.lineKey, max);
          }
          window.location.reload();
        } catch (error) {
          this.restoreAccepted();
          this.showStatus(error.message || this.dataset.errorGeneric);
          this.setBusy(false);
        }
      }

      async onSubmit(event) {
        const submitter = event.submitter;
        if (submitter?.getAttribute('name') === 'checkout') return;

        event.preventDefault();
        if (this.busy) return;

        this.clearStatus();
        this.inputs().forEach((input) => this.syncQuantityValidity(input));

        const invalid = this.inputs().find((input) => typeof input.checkValidity === 'function' && !input.checkValidity());
        if (invalid) {
          const inventoryMessage = this.exceedsAvailable(invalid) ? this.availableMessage(invalid) : '';
          const message = inventoryMessage || invalid.validationMessage || this.dataset.errorGeneric;

          invalid.value = invalid.dataset.acceptedQuantity ?? invalid.defaultValue;
          invalid.setCustomValidity('');
          invalid.setAttribute('aria-invalid', inventoryMessage ? 'true' : 'false');

          const error = this.lineError(invalid);
          if (error && message) {
            error.hidden = false;
            error.textContent = message;
          } else if (!inventoryMessage) {
            this.showStatus(message);
          }

          invalid.focus();
          return;
        }

        this.clearAllLineErrors();

        const changes = this.inputs()
          .map((input) => ({
            input,
            key: input.dataset.lineKey,
            quantity: Number(input.value),
            accepted: Number(input.dataset.acceptedQuantity),
          }))
          .filter((line) => line.key && !Number.isNaN(line.quantity) && line.quantity !== line.accepted);

        if (!changes.length) {
          this.showStatus(this.dataset.noChangesMessage);
          return;
        }

        this.setBusy(true);

        try {
          for (const line of changes) {
            await this.changeLine(line.key, line.quantity);
          }
          window.location.reload();
        } catch (error) {
          this.restoreAccepted();
          this.showStatus(error.message || this.dataset.errorGeneric);
          this.setBusy(false);
          changes[0]?.input?.focus();
        }
      }
    }
  );
})();
