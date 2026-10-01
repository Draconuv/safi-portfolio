/* ============================
   GSAP Animations
   ============================ */

gsap.registerPlugin(ScrollTrigger);

// --- Hero entrance ---
gsap.from('.hero-title', {
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.2,
});

gsap.from('.hero-subtitle', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.35,
});

gsap.from('.hero-cta', {
  y: 20,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
  delay: 0.5,
});

// --- Work cards stagger reveal ---
gsap.from('.work-card', {
  scrollTrigger: {
    trigger: '#work',
    start: 'top 85%',
  },
  y: 50,
  opacity: 0,
  duration: 0.7,
  ease: 'power3.out',
  stagger: 0.15,
});

// --- About text & image ---
gsap.from('.about-grid > div:first-child', {
  scrollTrigger: {
    trigger: '#about',
    start: 'top 85%',
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
});

gsap.from('.about-image', {
  scrollTrigger: {
    trigger: '#about',
    start: 'top 80%',
  },
  x: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.2,
});

// --- Testimonials stagger ---
gsap.from('.testimonial-card', {
  scrollTrigger: {
    trigger: '#testimonials',
    start: 'top 85%',
  },
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: 'power3.out',
  stagger: 0.12,
});

// --- Contact ---
gsap.from('.contact-text, .contact-links', {
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 85%',
  },
  y: 30,
  opacity: 0,
  duration: 0.7,
  ease: 'power3.out',
  stagger: 0.15,
});

// --- Smooth nav scroll ---
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
