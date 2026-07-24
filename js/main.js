/* ==========================================================================
   MS GROUP — main.js
   Header sticky, menu burger mobile, scroll fluide, lien actif au scroll
   ========================================================================== */

let menuBtn = document.getElementById('menu-btn');
            let menuClose = document.getElementById('menu-close');
            
            menuBtn.addEventListener('click', function() {
                document.querySelector('.navigation').classList.add('active');
            });
            menuClose.addEventListener('click', function() {
                document.querySelector('.navigation').classList.remove('active');
            });

  /* ---------- Header sticky (fond blanc au scroll) ---------- */
  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll);

  /* ---------- Bouton retour en haut ---------- */
  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  handleBackToTop();
  window.addEventListener('scroll', handleBackToTop);

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Lien actif au scroll (scrollspy) ---------- */
  const sections = document.querySelectorAll('main section[id]');

  function handleScrollSpy() {
    let currentId = 'hero';
    const scrollPos = window.scrollY + window.innerHeight * 0.3;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }
  handleScrollSpy();
  window.addEventListener('scroll', handleScrollSpy);

  /* ---------- Année courante dans le footer ---------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Slider témoignages ---------- */
  const track = document.getElementById('testimonial-track');
  const dotsContainer = document.getElementById('testimonial-dots');

  if (track && dotsContainer) {
    const slides = track.children;
    const total = slides.length;
    let current = 0;

    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
      current = index;
      track.style.transform = `translateX(-${current * 100}%)`;
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function nextSlide() {
      current = (current + 1) % total;
      goToSlide(current);
    }

    setInterval(nextSlide, 6000);
  }

