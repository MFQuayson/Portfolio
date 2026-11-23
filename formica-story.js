'use strict';
(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const chapters = document.querySelectorAll('.formica-chapter');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.05 });
  chapters.forEach(chapter => { chapter.classList.add('motion-ready'); observer.observe(chapter); });
})();
