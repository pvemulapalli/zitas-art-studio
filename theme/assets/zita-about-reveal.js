/**
 * About page scroll reveals — progressive enhancement only.
 * Content stays visible without JS, without IntersectionObserver,
 * on init failure, under reduced motion, and during Theme Editor reloads.
 */
(function () {
  var READY = 'about-reveal-ready';
  var ATTR = 'data-about-reveal';
  var VISIBLE = 'is-revealed';
  var observer = null;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function revealAll(root) {
    var nodes = (root || document).querySelectorAll('[' + ATTR + ']');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add(VISIBLE);
    }
  }

  function clearReady() {
    document.documentElement.classList.remove(READY);
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function init() {
    clearReady();

    if (prefersReducedMotion() || typeof IntersectionObserver !== 'function') {
      revealAll(document);
      return;
    }

    var nodes = document.querySelectorAll('[' + ATTR + ']');
    if (!nodes.length) return;

    try {
      document.documentElement.classList.add(READY);

      observer = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];
            if (!entry.isIntersecting) continue;
            entry.target.classList.add(VISIBLE);
            observer.unobserve(entry.target);
          }
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0 }
      );

      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var rect = el.getBoundingClientRect();
        var alreadyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
        if (alreadyInView) {
          el.classList.add(VISIBLE);
        } else {
          observer.observe(el);
        }
      }
    } catch (err) {
      clearReady();
      revealAll(document);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', function () {
    init();
  });

  document.addEventListener('shopify:section:unload', function () {
    clearReady();
  });

  if (window.matchMedia) {
    var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var onMotionChange = function () {
      init();
    };
    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', onMotionChange);
    } else if (motionQuery.addListener) {
      motionQuery.addListener(onMotionChange);
    }
  }
})();
