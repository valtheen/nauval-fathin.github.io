(() => {
  'use strict';
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const params = new URLSearchParams(location.search);
  const preview = ['localhost', '127.0.0.1'].includes(location.hostname);
  const freeze = preview && params.has('t') ? Number(params.get('t')) : NaN;
  const forceReduced = preview && params.get('reduce') === '1';
  const motionControl = document.querySelector('.motion-toggle');
  const activeAnimations = new Map();
  let motionOff = false;
  try { motionOff = localStorage.getItem('nf-motion') === 'off'; } catch { /* Storage can be unavailable in private browsers. */ }
  const isReduced = () => preference.matches || forceReduced;
  const motionAllowed = () => !motionOff && !isReduced();
  const stopMotion = () => {
    activeAnimations.forEach(animation => animation.cancel());
    activeAnimations.clear();
  };
  function syncMotion() {
    root.dataset.motion = motionOff ? 'off' : isReduced() ? 'reduced' : 'full';
    stopMotion();
    if (motionControl) {
      motionControl.hidden = false;
      motionControl.textContent = motionOff ? 'Motion: off' : isReduced() ? 'Motion: reduced' : 'Motion: on';
      motionControl.setAttribute('aria-pressed', String(!motionOff));
      motionControl.title = isReduced() ? 'Reduced motion follows your device setting. Toggle to turn off all optional motion.' : 'Toggle optional animation';
    }
  }
  // Every animation is interruptible and leaves its final layout in ordinary CSS.
  function animate(element, frames, options = {}) {
    if (!element?.animate || motionOff) return;
    activeAnimations.get(element)?.cancel();
    const reduced = isReduced();
    const keyframes = reduced ? [{ opacity: 0.65 }, { opacity: 1 }] : frames;
    const animation = element.animate(keyframes, {
      duration: reduced ? 120 : 480,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      ...options,
      ...(reduced ? { duration: 120, delay: 0 } : {}),
      fill: 'backwards',
    });
    activeAnimations.set(element, animation);
    const release = () => {
      if (activeAnimations.get(element) === animation) activeAnimations.delete(element);
    };
    animation.onfinish = release;
    animation.oncancel = release;
    if (Number.isFinite(freeze) && freeze >= 0) {
      animation.pause();
      animation.currentTime = freeze * 1000;
    }
  }
  function reveal(element, delay = 0) {
    animate(element, [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }], { delay });
  }
  syncMotion();
  preference.addEventListener('change', syncMotion);
  motionControl?.addEventListener('click', () => {
    motionOff = !motionOff;
    try { localStorage.setItem('nf-motion', motionOff ? 'off' : 'on'); } catch { /* Keep the in-memory preference. */ }
    syncMotion();
  });
  window.addEventListener('storage', event => {
    if (event.key === 'nf-motion') { motionOff = event.newValue === 'off'; syncMotion(); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopMotion(); });
  window.addEventListener('pagehide', stopMotion);
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      try { motionOff = localStorage.getItem('nf-motion') === 'off'; } catch { /* Preserve current choice. */ }
      syncMotion();
    }
  });
  // Cross-document transitions never intercept a link or delay navigation.
  for (const eventName of ['pageswap', 'pagereveal']) {
    window.addEventListener(eventName, event => {
      if (motionOff) event.viewTransition?.skipTransition();
    });
  }

  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const mobile = window.matchMedia('(max-width: 760px)');
  function closeMenu() {
    if (!menu || !navigation) return;
    activeAnimations.get(navigation)?.cancel();
    menu.setAttribute('aria-expanded', 'false');
    navigation.hidden = mobile.matches;
  }
  if (menu && navigation) {
    menu.hidden = false;
    closeMenu();
    mobile.addEventListener('change', () => {
      const focusWasInside = navigation.contains(document.activeElement);
      closeMenu();
      if (mobile.matches && focusWasInside) menu.focus();
    });
    menu.addEventListener('click', () => {
      const expanded = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(expanded));
      navigation.hidden = !expanded;
      if (expanded) reveal(navigation);
      else activeAnimations.get(navigation)?.cancel();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        closeMenu(); menu.focus();
      }
    });
    document.addEventListener('click', event => {
      if (mobile.matches && !event.target.closest('.header-inner')) closeMenu();
    });
  }

  const filters = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.projects-grid [data-category]')];
  const validFilters = new Set(filters.map(button => button.dataset.filter));
  function applyFilter(requested, { updateURL = false, animated = true } = {}) {
    const filter = validFilters.has(requested) ? requested : 'all';
    // FLIP: batch current-position reads, DOM writes, then final-position reads.
    const first = new Map(cards.filter(card => !card.hidden).map(card => [card, card.getBoundingClientRect()]));
    cards.forEach(card => {
      activeAnimations.get(card)?.cancel();
      card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    const visible = cards.filter(card => !card.hidden);
    const last = visible.map(card => card.getBoundingClientRect());
    document.querySelector('.result-count').textContent = `${visible.length} project${visible.length === 1 ? '' : 's'}`;
    if (animated) visible.forEach((card, index) => {
      const before = first.get(card);
      const dx = before ? before.left - last[index].left : 0;
      const dy = before ? before.top - last[index].top : 12;
      const nearby = before && Math.hypot(dx, dy) <= 180;
      animate(card, [
        { opacity: nearby ? 1 : 0, transform: nearby ? `translate(${dx}px, ${dy}px)` : 'translateY(12px)' },
        { opacity: 1, transform: 'none' },
      ], { duration: 320, delay: before ? 0 : Math.min(index * 25, 100) });
    });
    if (updateURL) {
      const url = new URL(location.href);
      if (filter === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', filter);
      // A filtered collection must not retain an anchor pointing at a hidden card.
      const anchor = cards.find(card => `#${card.id}` === url.hash);
      if (anchor?.hidden) url.hash = '';
      try { history.replaceState(null, '', url); } catch { /* Local file previews still filter. */ }
    }
  }
  if (filters.length) {
    document.querySelector('.project-tools').hidden = false;
    const initialCard = cards.find(card => `#${card.id}` === location.hash);
    const requested = params.get('category');
    const initialFilter = initialCard && requested && !initialCard.dataset.category.split(' ').includes(requested) ? 'all' : requested;
    applyFilter(initialFilter, { animated: false });
    filters.forEach(button => button.addEventListener('click', () => {
      if (button.getAttribute('aria-pressed') !== 'true') applyFilter(button.dataset.filter, { updateURL: true });
    }));
    window.addEventListener('popstate', () => applyFilter(new URLSearchParams(location.search).get('category'), { animated: false }));
    window.addEventListener('hashchange', () => {
      const target = cards.find(card => `#${card.id}` === location.hash);
      if (target?.hidden) { applyFilter('all', { updateURL: true, animated: false }); target.scrollIntoView(); }
    });
  }

  // Content is visible by default, even without JS/WAAPI/IntersectionObserver.
  const entrance = document.querySelectorAll('.hero-copy > *, .hero-portrait, .page-heading > *, .contact-layout > *');
  entrance.forEach((element, index) => reveal(element, Math.min(index * 65, 325)));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting);
      visible.forEach((entry, index) => {
        observer.unobserve(entry.target);
        // Do not interrupt a card already animating in response to a filter.
        if (!activeAnimations.has(entry.target)) reveal(entry.target, Math.min(index * 55, 165));
        const bars = entry.target.querySelectorAll('.data-bars i');
        if (motionAllowed()) bars.forEach((bar, i) => animate(bar, [
          { transform: 'scaleY(0.15)' }, { transform: 'scaleY(1)' },
        ], { duration: 650, delay: i * 30 }));
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.numbers > div, .featured-grid .project-card, .exp-item, .about-grid > *, .approach > *, .cta').forEach(element => observer.observe(element));
    window.addEventListener('pagehide', () => observer.disconnect());
  }

  if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) {
    const routes = { '#about': 'about.html', '#path': 'about.html', '#work': 'projects.html', '#route': 'projects.html', '#contact': 'contact.html' };
    const target = routes[location.hash] || (location.hash.startsWith('#project-') ? `projects.html${location.hash}` : null);
    if (target) location.replace(target);
  }
})();
