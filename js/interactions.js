(() => {
  // Gallery filtering and accessible lightbox.
  const galleryItems = [...document.querySelectorAll('[data-gallery-item]')];
  const filters = document.querySelectorAll('[data-filter]');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(b=>b.classList.toggle('is-active',b===button));
    const filter = button.dataset.filter;
    galleryItems.forEach(item=>{item.hidden = !(filter === 'all' || item.dataset.category === filter);});
  }));
  const lightbox = document.querySelector('[data-lightbox]');
  if(lightbox && galleryItems.length){
    const image = lightbox.querySelector('[data-lightbox-image]');
    const caption = lightbox.querySelector('[data-lightbox-caption]');
    let visible = [], index = 0, lastFocus = null;
    const currentVisible = () => galleryItems.filter(item=>!item.hidden);
    const show = i => {
      visible = currentVisible(); if(!visible.length) return;
      index = (i + visible.length) % visible.length;
      const item = visible[index]; image.src = item.dataset.full; image.alt = item.dataset.alt || '';
      caption.textContent = item.dataset.alt || 'Obsidian Cleaning image';
    };
    const open = item => {
      lastFocus = document.activeElement; visible = currentVisible(); show(visible.indexOf(item));
      lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
      lightbox.querySelector('[data-lightbox-close]').focus();
    };
    const close = () => {lightbox.classList.remove('is-open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus();};
    galleryItems.forEach(item=>item.addEventListener('click',()=>open(item)));
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click',close);
    lightbox.querySelector('[data-lightbox-prev]').addEventListener('click',()=>show(index-1));
    lightbox.querySelector('[data-lightbox-next]').addEventListener('click',()=>show(index+1));
    lightbox.addEventListener('click',e=>{if(e.target===lightbox) close();});
    document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('is-open')) return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);});
  }
})();
