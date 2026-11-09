'use strict';
(() => {
  const section = document.querySelector('.invest-story');
  if (!section || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  section.classList.add('is-motion-ready');
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      section.classList.add('is-visible');
      observer.disconnect();
    }
  }, { threshold: 0.08 });
  observer.observe(section);
})();
