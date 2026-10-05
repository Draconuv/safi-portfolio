// Safi profile — dependency-free interactions (rulebook §5.1)
// CSS + IntersectionObserver only. No animation libraries.

((() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Staggered reveal on scroll (also covers the hero entrance once)
  const revealables = document.querySelectorAll('.hero .eyebrow, .hero .hero-title, .hero .hero-sub, .hero .hero-cta, .section-head, .work-card, .int-card, .about-grid, .contact-text, .contact-email, .contact-links');
  revealables.forEach((el, i) => el.classList.add('reveal'));
  const heroEls = document.querySelectorAll('.hero .eyebrow, .hero .hero-title, .hero .hero-sub, .hero .hero-cta');
  heroEls.forEach((el, i) => el.style.setProperty('--d', String(i * 0.18) + 's'));
  document.querySelectorAll('.int-grid .int-card').forEach((el, i) => el.style.setProperty('--d', String((i % 2) * 0.08 + Math.floor(i / 2) * 0.04) + 's'));
  document.querySelectorAll('.work-grid .work-card').forEach((el, i) => el.style.setProperty('--d', String((i % 2) * 0.08 + Math.floor(i / 2) * 0.05) + 's'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        if (entry.target.dataset.count !== undefined) runCount(entry.target);
        if (entry.target.querySelector('.draw-svg')) drawIcon(entry.target.querySelector('.draw-svg'));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  revealables.forEach((el) => io.observe(el));

  // Scroll-linked nav shrink (site-wide, quiet)
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Demo 1 — magnetic button + ripple + confirm
  const magBtn = document.querySelector('.mag-btn');
  if (magBtn) {
    const stage = magBtn.closest('.int-stage');
    let raf = null;
    const magnetize = (e) => {
      const r = magBtn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.25;
      const y = (e.clientY - r.top - r.height / 2) * 0.35;
      magBtn.style.transform = `translate(${x}px, ${y}px)`;
    };
    stage.addEventListener('pointermove', magnetize);
    stage.addEventListener('pointerleave', () => { magBtn.style.transform = ''; });

    magBtn.addEventListener('click', () => {
      if (magBtn.classList.contains('is-done')) replayFlow();
      const r = magBtn.getBoundingClientRect();
      const rip = document.createElement('span');
      rip.className = 'mag-ripple';
      const size = Math.max(r.width, r.height);
      rip.style.width = rip.style.height = size + 'px';
      rip.style.left = (r.width / 2 - size / 2) + 'px';
      rip.style.top = (r.height / 2 - size / 2) + 'px';
      magBtn.appendChild(rip);
      setTimeout(() => rip.remove(), 650);
      magBtn.dataset.face = 'done';
      setConfirm(true);
    });

    const setConfirm = (done) => {
      magBtn.querySelector('.mag-label').textContent = done ? 'Saved offline' : 'Save for offline';
      magBtn.querySelector('.mag-icon').textContent = done ? '✓' : '↓';
      magBtn.classList.toggle('is-done', done);
      stage.setAttribute('data-state', done ? 'done' : 'idle');
    };

    const replayFlow = () => {
      setConfirm(true);
    };

    stage.addEventListener('dblclick', () => { setConfirm(false); stage.dataset.state = 'idle'; });
  }

  // Demo 2 — RTL stepper (right-to-left fill, replays on tap)
  const stepper = document.querySelector('.rtl-stepper');
  if (stepper) {
    const steps = Array.from(stepper.querySelectorAll('.rtl-step'));
    const label = stepper.parentElement.querySelector('.rtl-label');
    const labels = ['Step 1 of 3', 'Step 2 of 3', 'All done ✓'];
    let n = 0;
    const tick = () => {
      if (n < steps.length) {
        steps[n].classList.add('on');
        label.textContent = labels[n];
        n++;
        setTimeout(tick, 550);
      }
    };
    const play = () => {
      steps.forEach((s) => s.classList.remove('on'));
      n = 0;
      label.textContent = '';
      setTimeout(tick, 250);
    };
    stepper.closest('.int-card').addEventListener('click', () => { if (!reduced) play(); });
    const stepIo = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !reduced) play();
      stepIo.disconnect();
    }, { threshold: 0.4 });
    stepIo.observe(stepper);
  }

  // Demo 3 — line-drawn inbox icon
  function drawIcon(svg) {
    if (reduced) return;
    svg.classList.remove('is-drawn');
    void svg.getBoundingClientRect(); // restart animation
    svg.classList.add('is-drawn');
  }
  const drawCard = document.querySelector('.draw-svg')?.closest('.int-card');
  if (drawCard) drawCard.addEventListener('click', () => drawIcon(drawCard.querySelector('.draw-svg')));

  // Demo 4 — count-up stat
  function runCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    const t0 = performance.now();
    const dur = 1400;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const frame = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * ease(p)) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
  const statCard = document.querySelector('.stat-num')?.closest('.int-card');
  if (statCard) statCard.addEventListener('click', () => runCount(statCard.querySelector('.stat-num')));

  // Demo 5 — sticky shrink mini-viewport
  const vp = document.querySelector('.shrink-viewport');
  if (vp) {
    const miniNav = vp.querySelector('.mini-nav');
    const onScroll = () => miniNav.classList.toggle('shrunk', vp.scrollTop > 12);
    vp.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ----------------------------
  // Hero CTA crafting lab (temporary scaffold — remove after ruling)
  // Keys 1-4 or click the dots to switch hero CTA variant.
  // ----------------------------
  const cta = document.querySelector('.hero-cta');
  const lab = document.querySelector('.cta-lab');
  if (cta && lab) {
    const dots = Array.from(lab.querySelectorAll('button'));
    const setVariant = (name) => {
      cta.classList.remove('v2', 'v3', 'v4');
      if (name && name !== 'v1') cta.classList.add(name);
      dots.forEach((d) => d.classList.toggle('active', d.dataset.variant === name));
      try { localStorage.setItem('cta-variant', name); } catch (e) {}
    };
    dots.forEach((d) => d.addEventListener('click', (e) => {
      e.preventDefault();
      setVariant(d.dataset.variant);
    }));
    document.addEventListener('keydown', (e) => {
      if (e.target.matches && e.target.matches('input, textarea')) return;
      const map = { 1: 'v1', 2: 'v2', 3: 'v3', 4: 'v4' };
      if (map[e.key]) setVariant(map[e.key]);
    });
    let saved = 'v1';
    try { saved = localStorage.getItem('cta-variant') || 'v1'; } catch (e) {}
    setVariant(saved);
  }
})());
