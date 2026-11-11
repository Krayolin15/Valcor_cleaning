(() => {
  const config = window.VALCOR_CONFIG || {};
  const logo = 'assets/logos/valcor-cleaning-logo.png';
  const footerLogo = 'assets/logos/valcor-cleaning-logo-white.png';
  const phone = config.telephone || 'Telephone to be confirmed';
  const phoneLink = config.telephoneLink || '';
  const email = config.email || 'Email to be confirmed';
  const serviceLinks = [
    ['Contract Cleaning','contract-cleaning.html'],
    ['Washroom Hygiene','hygiene-services.html'],
    ['Consumables Supply','consumables-supply.html'],
    ['Specialist Cleaning','specialised-cleaning.html'],
    ['Project & Once-off Cleaning','project-once-off-cleaning.html'],
    ['Commercial Division','commercial-cleaning.html'],
    ['Corporate Division','corporate-cleaning.html'],
    ['Industrial Division','industrial-cleaning.html'],
    ['All Services','services.html']
  ];
  const serviceMenu = serviceLinks.map(([label, href]) => `<a href="${href}">${label}<span>↗</span></a>`).join('');
  const phoneMarkup = phoneLink ? `<a href="tel:${phoneLink}">${phone}</a>` : `<span>${phone}</span>`;
  const emailMarkup = email ? `<a href="mailto:${email}">${email}</a>` : `<span>${email}</span>`;
  const header = `
    <div class="topbar"><div class="container topbar__inner"><div class="topbar__left"><span>A Valcor Group company</span><span class="topbar__dot"></span><span>Durban · KwaZulu-Natal</span></div><div class="topbar__right">${phoneMarkup}<span class="topbar__dot"></span>${emailMarkup}</div></div></div>
    <header class="site-header" data-header><div class="container nav-main">
      <a class="brand" href="index.html" aria-label="Valcor Cleaning and Hygiene home"><img src="${logo}" alt="Valcor Cleaning — Cleaner Spaces. Brighter Businesses."></a>
      <nav class="nav-links" aria-label="Main navigation">
        <a href="index.html" data-nav="index">Home</a><a href="about.html" data-nav="about">About</a>
        <div class="nav-services" data-services-menu><button class="nav-services__trigger" type="button" aria-expanded="false">Services <span>⌄</span></button><div class="nav-dropdown">${serviceMenu}</div></div>
        <a href="industries.html" data-nav="industries">Who we serve</a><a href="gallery.html" data-nav="gallery">Our work</a><a href="contact.html" data-nav="contact">Contact</a>
      </nav>
      <a class="button button--dark nav-quote" href="quote.html">Request a quote <span>↗</span></a>
      <button class="mobile-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-panel" data-mobile-toggle><span></span><span></span></button>
    </div></header>
    <nav class="mobile-panel" id="mobile-panel" aria-label="Mobile navigation" data-mobile-panel>
      <a href="index.html">Home <span>↗</span></a><a href="about.html">About Valcor <span>↗</span></a>
      <div class="mobile-panel__services"><button type="button" data-mobile-services aria-expanded="false">Services <span>＋</span></button><div class="mobile-panel__sub">${serviceMenu}</div></div>
      <a href="industries.html">Who we serve <span>↗</span></a><a href="gallery.html">Our work <span>↗</span></a><a href="contact.html">Contact <span>↗</span></a>
      <a class="button button--dark" href="quote.html">Request a quote <span>↗</span></a>
    </nav>`;
  const footer = `
    <footer class="site-footer"><div class="container footer-main">
      <div class="footer-brand"><a href="index.html"><img src="${footerLogo}" alt="Valcor Cleaning and Hygiene"></a><p>Professional cleaning and hygiene solutions for healthier, better-presented spaces. A Valcor Group company based in Durban, KwaZulu-Natal.</p><small class="footer-group">A VALCOR GROUP COMPANY</small></div>
      <div class="footer-column"><h3>Explore</h3><a href="index.html">Home</a><a href="about.html">About Valcor</a><a href="services.html">Our service portfolio</a><a href="industries.html">Who we serve</a><a href="gallery.html">Illustrative gallery</a><a href="contact.html">Contact</a></div>
      <div class="footer-column"><h3>Services</h3><a href="contract-cleaning.html">Contract cleaning</a><a href="hygiene-services.html">Washroom hygiene</a><a href="consumables-supply.html">Consumables supply</a><a href="specialised-cleaning.html">Specialist cleaning</a><a href="project-once-off-cleaning.html">Project & once-off</a></div>
      <div class="footer-column"><h3>Contact Valcor</h3><p>Durban, KwaZulu-Natal, South Africa</p>${phoneLink ? `<a href="tel:${phoneLink}">${phone}</a>` : `<p>${phone}</p>`}<a href="mailto:${email}">${email}</a><a href="quote.html">Request a quotation ↗</a><p class="footer-placeholder">Service scope, availability and pricing are confirmed in the relevant quotation and service agreement.</p></div>
    </div><div class="container footer-bottom"><span>© <span data-year></span> Valcor Cleaning & Hygiene. All rights reserved.</span><div class="footer-bottom__links"><span>A Valcor Group company</span><span>Cleaner spaces. Brighter businesses.</span></div></div></footer>`;

  document.querySelectorAll('[data-site-header]').forEach(el => el.innerHTML = header);
  document.querySelectorAll('[data-site-footer]').forEach(el => el.innerHTML = footer);
  const current = document.body.dataset.page || '';
  const active = current === 'index' ? 'index' : ['commercial-cleaning','corporate-cleaning','industrial-cleaning','specialised-cleaning','hygiene-services','services','contract-cleaning','consumables-supply','project-once-off-cleaning'].includes(current) ? 'services' : current;
  document.querySelectorAll(`[data-nav="${active}"]`).forEach(a => a.setAttribute('aria-current','page'));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const headerEl = document.querySelector('[data-header]');
  const toggle = document.querySelector('[data-mobile-toggle]');
  const panel = document.querySelector('[data-mobile-panel]');
  const servicesMenu = document.querySelector('[data-services-menu]');
  const serviceTrigger = servicesMenu?.querySelector('button');
  const mobileServices = document.querySelector('[data-mobile-services]');
  const closeMobile = () => {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open navigation');
    panel.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open ? 'Close navigation' : 'Open navigation');
    panel?.classList.toggle('is-open',open);
    document.body.classList.toggle('menu-open',open);
  });
  panel?.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMobile));
  mobileServices?.addEventListener('click', () => {
    const open = mobileServices.getAttribute('aria-expanded') !== 'true';
    mobileServices.setAttribute('aria-expanded',String(open));
    mobileServices.querySelector('span').textContent = open ? '−' : '＋';
    mobileServices.nextElementSibling.classList.toggle('is-open',open);
  });
  serviceTrigger?.addEventListener('click', () => {
    const open = servicesMenu.classList.toggle('is-open');
    serviceTrigger.setAttribute('aria-expanded',String(open));
  });
  document.addEventListener('click', e => {
    if (servicesMenu && !servicesMenu.contains(e.target)) {
      servicesMenu.classList.remove('is-open');
      serviceTrigger?.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMobile(); });
  const onScroll = () => {
    const y = window.scrollY;
    headerEl?.classList.toggle('is-scrolled',y > 20);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = document.querySelector('[data-scroll-progress]');
    if(progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    document.querySelector('[data-back-to-top]')?.classList.toggle('is-visible',y > 550);
  };
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  document.querySelector('[data-back-to-top]')?.addEventListener('click',e=>{e.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
  const loader = document.querySelector('[data-page-loader]');
  const hideLoader = () => setTimeout(()=>loader?.classList.add('is-hidden'),250);
  if(document.readyState === 'complete') hideLoader(); else window.addEventListener('load',hideLoader,{once:true});
  setTimeout(hideLoader,1800);
  document.querySelectorAll('[data-whatsapp-link]').forEach(link => {
    const number = (config.whatsappNumber || '').replace(/\D/g,'');
    if(number) { link.href = `https://wa.me/${number}`; link.target='_blank'; link.rel='noopener noreferrer'; link.setAttribute('aria-label','Chat with Valcor on WhatsApp'); }
    else { link.href = 'quote.html'; link.setAttribute('aria-label','Request a Valcor enquiry'); const label = link.querySelector('.whatsapp-float__label'); if(label) label.textContent = 'Request an enquiry'; }
  });
})();
