/**
 * Contact page: inquiry-type UI, optional fields, URL preselect, client validation.
 * Native Shopify {% form 'contact' %} still handles the POST.
 */
(() => {
  const root = document.querySelector('[data-contact-form]');
  if (!root) return;

  const form = root.closest('form') || root.querySelector('form');
  if (!form) return;

  const STORAGE_KEY = 'zita-contact-draft';
  const TYPE_MAP = {
    general: root.dataset.typeGeneral || 'General inquiry',
    artwork: root.dataset.typeArtwork || 'Artwork inquiry',
    commission: root.dataset.typeCommission || 'Commission inquiry',
    trade: root.dataset.typeTrade || 'Trade / interior designer inquiry',
  };

  const summary = root.querySelector('[data-contact-summary]');
  const summaryList = root.querySelector('[data-contact-summary-list]');
  const summaryTitle = root.querySelector('[data-contact-summary-title]');
  const optionalBlocks = [...root.querySelectorAll('[data-contact-optional]')];
  const radios = [...form.querySelectorAll('input[name="contact[Inquiry type]"]')];
  const nameInput = form.querySelector('[name="contact[name]"]');
  const emailInput = form.querySelector('[name="contact[email]"]');
  const bodyInput = form.querySelector('[name="contact[body]"]');
  const success = root.querySelector('[data-contact-success]');

  const messages = {
    nameEmpty: root.dataset.msgNameEmpty || 'Please enter your name.',
    emailEmpty: root.dataset.msgEmailEmpty || 'Please enter your email address.',
    emailInvalid:
      root.dataset.msgEmailInvalid || 'Please enter an email address like name@example.com.',
    messageEmpty: root.dataset.msgMessageEmpty || 'Please write a short message.',
    summaryTitle: root.dataset.msgSummaryTitle || 'Please check [count] fields',
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let tried = root.dataset.serverErrors === 'true';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function selectedType() {
    const checked = radios.find((r) => r.checked);
    return checked ? checked.value : TYPE_MAP.general;
  }

  function setType(label, { focus = false } = {}) {
    radios.forEach((radio) => {
      radio.checked = radio.value === label;
    });
    syncOptionalFields();
    if (focus) {
      const active = radios.find((r) => r.checked);
      active?.focus({ preventScroll: true });
    }
  }

  function syncOptionalFields() {
    const type = selectedType();
    optionalBlocks.forEach((block) => {
      const match = block.dataset.contactOptional === type;
      block.hidden = !match;
      block.querySelectorAll('input, textarea, select').forEach((el) => {
        el.disabled = !match;
      });
    });
  }

  function fieldErrorEl(id) {
    return root.querySelector(`[data-contact-error="${id}"]`);
  }

  function setFieldInvalid(input, id, message) {
    if (!input) return;
    input.classList.toggle('is-invalid', Boolean(message));
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    const err = fieldErrorEl(id);
    if (err) {
      err.hidden = !message;
      err.textContent = message || '';
      if (message) {
        input.setAttribute('aria-describedby', err.id);
      } else {
        input.removeAttribute('aria-describedby');
      }
    }
  }

  function validate() {
    const errors = {};
    const name = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();
    const body = (bodyInput?.value || '').trim();

    if (!name) errors.name = messages.nameEmpty;
    if (!email) errors.email = messages.emailEmpty;
    else if (!emailPattern.test(email)) errors.email = messages.emailInvalid;
    if (!body) errors.message = messages.messageEmpty;

    return errors;
  }

  function renderErrors(errors) {
    setFieldInvalid(nameInput, 'name', errors.name);
    setFieldInvalid(emailInput, 'email', errors.email);
    setFieldInvalid(bodyInput, 'message', errors.message);

    const entries = Object.entries(errors);
    if (!summary || !summaryList || !summaryTitle) return;

    if (!entries.length) {
      summary.hidden = true;
      summaryList.innerHTML = '';
      return;
    }

    const title = messages.summaryTitle
      .replace('{{ count }}', String(entries.length))
      .replace('[count]', String(entries.length));
    summaryTitle.textContent = title;
    summaryList.innerHTML = '';
    entries.forEach(([key, msg]) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      const target =
        key === 'name' ? nameInput : key === 'email' ? emailInput : bodyInput;
      a.href = `#${target?.id || ''}`;
      a.textContent = msg;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        target?.focus();
      });
      li.appendChild(a);
      summaryList.appendChild(li);
    });
    summary.hidden = false;
    summary.focus({ preventScroll: true });
  }

  function saveDraft() {
    const draft = {
      type: selectedType(),
      name: nameInput?.value || '',
      email: emailInput?.value || '',
      message: bodyInput?.value || '',
      optionals: {},
    };
    form.querySelectorAll('[data-contact-optional] input, [data-contact-optional] textarea').forEach((el) => {
      if (el.name) draft.optionals[el.name] = el.value;
    });
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (_) {
      /* ignore quota / private mode */
    }
  }

  function readDraft() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
    } catch (_) {
      return null;
    }
  }

  function clearDraft() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (_) {
      /* ignore */
    }
  }

  function restoreDraft() {
    if (root.dataset.posted === 'true') return;
    const draft = readDraft();
    if (!draft) return;
    if (draft.type) setType(draft.type);
    if (nameInput && !nameInput.value) nameInput.value = draft.name || '';
    if (emailInput && !emailInput.value) emailInput.value = draft.email || '';
    if (bodyInput && !bodyInput.value) bodyInput.value = draft.message || '';
    Object.entries(draft.optionals || {}).forEach(([name, value]) => {
      const el = form.querySelector(`[name="${CSS.escape(name)}"]`);
      if (el && !el.value) el.value = value;
    });
    syncOptionalFields();
  }

  function scrollToForm() {
    const target = document.getElementById('message') || root;
    const top = target.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }

  function applyTypeFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const key = (params.get('type') || '').toLowerCase();
    const label = TYPE_MAP[key];
    if (label) setType(label);
    const artwork = params.get('artwork');
    if (artwork) {
      const artInput = form.querySelector('[name="contact[Artwork]"]');
      if (artInput && !artInput.value) artInput.value = artwork;
    }
  }

  function selectFromBand(label) {
    if (success) {
      const key = label === TYPE_MAP.commission ? 'commission' : 'trade';
      window.location.href = `${window.location.pathname}?type=${key}#message`;
      return;
    }
    setType(label, { focus: true });
    scrollToForm();
  }

  document.querySelectorAll('[data-contact-preselect]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-contact-preselect');
      const label = TYPE_MAP[key];
      if (label) selectFromBand(label);
    });
  });

  radios.forEach((radio) => {
    radio.addEventListener('change', () => {
      syncOptionalFields();
      saveDraft();
    });
  });

  [nameInput, emailInput, bodyInput].forEach((input) => {
    input?.addEventListener('input', () => {
      if (!tried) return;
      renderErrors(validate());
    });
  });

  form.addEventListener('submit', (e) => {
    const errors = validate();
    tried = true;
    if (Object.keys(errors).length) {
      e.preventDefault();
      renderErrors(errors);
      return;
    }
    // Keep draft until Shopify confirms success (data-posted). Do not disable the
    // submit control here — disabling the submitter during the submit event can
    // cancel the native POST and interferes with Shopify CAPTCHA re-submit.
    saveDraft();
  });

  applyTypeFromQuery();
  restoreDraft();
  syncOptionalFields();

  if (success) {
    const draft = readDraft();
    const typeEl = success.querySelector('[data-contact-success-type]');
    const fromEl = success.querySelector('[data-contact-success-from]');
    if (typeEl && draft?.type) typeEl.textContent = draft.type;
    if (fromEl && draft && (!fromEl.textContent || !fromEl.textContent.trim())) {
      const parts = [draft.name, draft.email].filter(Boolean);
      if (parts.length) fromEl.textContent = parts.join(' · ');
    }
    clearDraft();
    // Bring server-rendered success into view after Shopify's redirect.
    if (window.location.hash !== '#message') {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#message`);
    }
    requestAnimationFrame(() => {
      scrollToForm();
      success.focus({ preventScroll: true });
    });
  } else if (window.location.hash === '#message') {
    requestAnimationFrame(() => {
      scrollToForm();
      if (TYPE_MAP[(new URLSearchParams(window.location.search).get('type') || '').toLowerCase()]) {
        const active = radios.find((r) => r.checked);
        active?.focus({ preventScroll: true });
      }
    });
  }

  if (tried && root.dataset.serverErrors === 'true') {
    renderErrors(validate());
  }
})();
