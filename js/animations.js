/* ==========================================================================
   MS GROUP — animations.js
   IntersectionObserver : déclenche les animations fade-in au scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // ne s'anime qu'une fois
      }
    });
  }, { threshold: 0.15 });

  document
    .querySelectorAll('.fade-left, .fade-right, .fade-top, .fade-bottom')
    .forEach((el) => observer.observe(el));
});
