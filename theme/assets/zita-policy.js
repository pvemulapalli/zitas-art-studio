/**
 * Native Shopify policy pages: On this page TOC from real headings,
 * eyebrow attribute, and table overflow wrappers.
 * No navigation is rendered when fewer than 3 heading entries exist.
 */
(() => {
  if (!document.body.classList.contains('template-policy')) return;

  const grid = document.querySelector('.policy-grid');
  const body = document.querySelector('.shopify-policy__body');
  if (!grid || !body) return;

  const labels = {
    onThisPage: grid.dataset.onThisPage || 'On this page',
  };

  body.querySelectorAll('table').forEach((table) => {
    if (table.parentElement?.classList.contains('policy-table-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'policy-table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);
  });

  const rte = body.querySelector('.rte') || body;
  let headingNodes = [...rte.querySelectorAll('h2')];
  if (headingNodes.length === 0) {
    headingNodes = [...rte.querySelectorAll('h3')];
  }

  // Prefer real semantic headings only (handoff ambiguity resolution).
  if (headingNodes.length < 3) return;

  const usedIds = new Set();
  const slugify = (text) => {
    const base =
      text
        .toLowerCase()
        .trim()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'section';
    let id = base;
    let n = 2;
    while (usedIds.has(id) || document.getElementById(id)) {
      id = `${base}-${n}`;
      n += 1;
    }
    usedIds.add(id);
    return id;
  };

  const entries = headingNodes.map((heading) => {
    const text = (heading.textContent || '').replace(/\s+/g, ' ').trim();
    if (!heading.id) heading.id = slugify(text);
    else usedIds.add(heading.id);
    return { id: heading.id, text, el: heading };
  }).filter((entry) => entry.text);

  if (entries.length < 3) return;

  const makeList = () => {
    const list = document.createElement('ul');
    list.className = 'policy-toc__list';
    list.setAttribute('aria-label', labels.onThisPage);
    entries.forEach((entry, index) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = `#${entry.id}`;
      a.textContent = entry.text;
      if (index === 0) {
        a.classList.add('is-current');
        a.setAttribute('aria-current', 'location');
      }
      li.appendChild(a);
      list.appendChild(li);
    });
    return list;
  };

  const desktopNav = document.createElement('nav');
  desktopNav.className = 'policy-toc policy-toc--desktop';
  desktopNav.setAttribute('aria-label', labels.onThisPage);
  const desktopLabel = document.createElement('p');
  desktopLabel.className = 'policy-toc__label';
  desktopLabel.textContent = labels.onThisPage;
  desktopNav.appendChild(desktopLabel);
  desktopNav.appendChild(makeList());

  const mobileDetails = document.createElement('details');
  mobileDetails.className = 'policy-toc policy-toc--mobile';
  const summary = document.createElement('summary');
  summary.textContent = labels.onThisPage;
  mobileDetails.appendChild(summary);
  mobileDetails.appendChild(makeList());

  // Desktop rail joins the grid; mobile disclosure sits before the body.
  body.parentNode.insertBefore(desktopNav, body);
  body.parentNode.insertBefore(mobileDetails, body);

  const allLinks = [
    ...desktopNav.querySelectorAll('a[href^="#"]'),
    ...mobileDetails.querySelectorAll('a[href^="#"]'),
  ];

  const setCurrent = (id) => {
    allLinks.forEach((link) => {
      const match = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-current', match);
      if (match) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };

  allLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const id = link.getAttribute('href')?.slice(1);
      if (id) setCurrent(id);
      if (mobileDetails.open) mobileDetails.open = false;
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((r) => r.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) setCurrent(visible[0].target.id);
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 1],
      }
    );
    entries.forEach((entry) => observer.observe(entry.el));
  }
})();
