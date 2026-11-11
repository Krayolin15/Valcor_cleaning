/* VALCOR motion system — scroll reveals, depth, image movement and interaction polish. */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsObserver = 'IntersectionObserver' in window;
  const root = document.documentElement;

  const revealGroups = [
    ['.page-hero__content > *', 'up'],
    ['.cta-band__content > *', 'up'],
    ['.section-heading', 'up'],
    ['.split-layout__visual', 'left'],
    ['.split-layout__copy', 'right'],
    ['.service-card', 'up'],
    ['.profile-card', 'up'],
    ['.profile-sector', 'up'],
    ['.profile-standard > *', 'up'],
    ['.process-grid > *', 'up'],
    ['.profile-checklist > *', 'up'],
    ['.gallery-filters > *', 'up'],
    ['.profile-sector-grid > *', 'up'],
    ['.profile-card-grid > *', 'up'],
    ['.values-grid > *', 'up'],
    ['.services-grid > *', 'up'],
    ['.gallery-grid > *', 'up'],
    ['.value-item', 'up'],
    ['.gallery-item', 'up'],
    ['.mission-grid > *', 'up'],
    ['.division-cards > *', 'up'],
    ['.division-strip__inner > *', 'up'],
    ['.contact-cards > *', 'up'],
    ['.contact-layout > *', 'up'],
    ['.quote-aside', 'left'],
    ['.quote-form', 'right'],
    ['.contact-form', 'right'],
    ['.map-placeholder .container > *', 'up'],
    ['.feature-list > *', 'up'],
    ['.section-bottom-link', 'up'],
    ['.footer-main > *', 'up'],
    ['.footer-bottom', 'up'],
    ['.page-hero__index', 'up']
  ];

  // Fill in sections that were not individually marked in the original pages.
  revealGroups.forEach(([selector, direction]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (!element.hasAttribute('data-reveal')) element.setAttribute('data-reveal', direction);
      if (element.parentElement && /grid|strip|list/.test(element.parentElement.className || '')) {
        const delay = Math.min(index % 6, 5) * 85;
        element.style.setProperty('--reveal-delay', `${delay}ms`);
      }
    });
  });

  // Stagger smaller rows so they arrive as a sequence rather than all at once.
  document.querySelectorAll('.feature-list, .quote-aside__steps').forEach(group => {
    [...group.children].forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 65}ms`);
      if (!item.hasAttribute('data-reveal')) item.setAttribute('data-reveal', 'up');
    });
  });

  // Images receive a separate slow zoom as their containing block enters view.
  const imageMotion = [
    ...document.querySelectorAll('.image-frame, .service-card__image, .gallery-item__image'),
    ...document.querySelectorAll('.profile-sector')
  ];
  imageMotion.forEach(element => element.setAttribute('data-image-motion', ''));

  // Hero and CTA backgrounds move at a softer speed than the page scroll.
  const parallaxLayers = [
    ...[...document.querySelectorAll('.home-hero__background, .cta-band__image, .page-hero')].map(element => ({ element, depth: 34 })),
    ...[...document.querySelectorAll('.image-frame img, .service-card__image img, .gallery-item__image img, .profile-sector img')].map(element => ({ element, depth: 16 }))
  ];

  if (reduceMotion || !supportsObserver) {
    document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('is-revealed'));
    imageMotion.forEach(element => element.classList.add('is-image-revealed'));
    return;
  }

  root.classList.add('motion-ready');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      revealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -7% 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element));

  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-image-revealed');
      imageObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
  imageMotion.forEach(element => imageObserver.observe(element));

  // Keep the depth motion restrained, and only update transforms once per frame.
  let ticking = false;
  const updateScrollMotion = () => {
    const viewport = window.innerHeight || 1;
    parallaxLayers.forEach(({ element, depth }) => {
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > viewport + 100) return;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const shift = (progress - 0.5) * -depth;
      element.style.setProperty('--scroll-shift', `${shift.toFixed(1)}px`);
    });
    ticking = false;
  };
  const requestScrollUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollMotion);
  };
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate, { passive: true });
  requestScrollUpdate();

  // Gentle pointer tilt on larger screens adds depth without affecting touch devices.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer) {
    document.querySelectorAll('.service-card, .profile-card, .division-cards > a').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', `${(x * 2.2).toFixed(2)}deg`);
        card.style.setProperty('--tilt-y', `${(-y * 2.2).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }
})();
