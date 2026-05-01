/* ════════════════════════════════════════════════════════
   AOS Portfolio — script.js  (v2 — audited)
   ════════════════════════════════════════════════════════ */
'use strict';

/* ── PRELOADER ────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('preloader')?.classList.add('hidden'), 700);
});

/* ── CUSTOM CURSOR ────────────────────────────────── */
(function () {
  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursorFollower');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function follow() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(follow);
  })();

  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button, .project-card, .stack-tab, .filter-btn, .channel-card')) {
      dot.style.width = dot.style.height = '16px';
      ring.style.opacity = '0.25';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button, .project-card, .stack-tab, .filter-btn, .channel-card')) {
      dot.style.width = dot.style.height = '9px';
      ring.style.opacity = '0.55';
    }
  });
})();

/* ── THEME TOGGLE ─────────────────────────────────── */
(function () {
  const btn  = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const html = document.documentElement;
  const saved = localStorage.getItem('aos-theme') || 'dark';

  html.setAttribute('data-theme', saved);
  setIcon(saved);

  btn?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('aos-theme', next);
    setIcon(next);
  });

  function setIcon(t) {
    if (icon) icon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
})();

/* ── NAVBAR ───────────────────────────────────────── */
(function () {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const links     = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  links.forEach(l => l.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    navToggle?.classList.remove('open');
    document.body.style.overflow = '';
  }));

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }, { passive: true });
})();

/* ── SMOOTH SCROLL ────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 78, behavior: 'smooth' });
  });
});

/* ── HERO CANVAS — particle field ────────────────── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const N = 55;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); init(); });

  function rand(a, b) { return Math.random() * (b - a) + a; }
  function init() {
    pts = Array.from({ length: N }, () => ({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-.22, .22), vy: rand(-.22, .22),
      r: rand(1, 2.2), a: rand(.15, .55)
    }));
  }
  init();

  function accent() {
    return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6ee7b7';
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const c = accent();

    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = c; ctx.globalAlpha = p.a; ctx.fill();
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = c;
          ctx.globalAlpha = (1 - d / 110) * 0.1;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── ROLE SLIDER ──────────────────────────────────── */
(function () {
  const roles = document.querySelectorAll('.role');
  if (!roles.length) return;
  let current = 0;
  setInterval(() => {
    roles[current].classList.remove('active');
    current = (current + 1) % roles.length;
    roles[current].classList.add('active');
  }, 2600);
})();

/* ── SCROLL REVEAL ────────────────────────────────── */
(function () {
  // Section labels get their own observer (translateX reveal)
  const labelObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); labelObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.section-label').forEach(el => labelObs.observe(el));

  // Staggered reveal for all key elements
  const selectors = [
    '.about-grid', '.domain-card', '.annotation-callout',
    '.stack-tabs', '.stack-panel',
    '.proj-group-label', '.project-card',
    '.contact-wrapper', '.channel-card',
    '.about-links', '.portrait-frame',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('scroll-reveal');
      el.style.transitionDelay = `${Math.min(i * 0.055, 0.4)}s`;
    });
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.scroll-reveal').forEach(el => obs.observe(el));
})();

/* ── STACK TABS ───────────────────────────────────── */
(function () {
  const tabs   = document.querySelectorAll('.stack-tab');
  const panels = document.querySelectorAll('.stack-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const t = tab.getAttribute('data-tab');
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.stack-panel[data-panel="${t}"]`)?.classList.add('active');
    });
  });
})();

/* ── PROJECT FILTER ───────────────────────────────── */
(function () {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');

      cards.forEach(card => {
        if (f === 'all') { card.classList.remove('hidden'); return; }
        const cats = (card.getAttribute('data-category') || '').split(' ');
        card.classList.toggle('hidden', !cats.includes(f));
      });

      // Hide/show group labels based on visible cards
      document.querySelectorAll('.proj-group-label').forEach(label => {
        const grid = label.nextElementSibling;
        if (!grid) return;
        const anyVisible = [...grid.querySelectorAll('.project-card')]
          .some(c => !c.classList.contains('hidden'));
        label.style.display = anyVisible ? '' : 'none';
      });
    });
  });
})();

/* ── PORTRAIT PARALLAX ────────────────────────────── */
(function () {
  const frame = document.querySelector('.portrait-frame');
  if (!frame) return;
  let rafId;

  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const dx = (e.clientX / window.innerWidth  - 0.5) * 10;
      const dy = (e.clientY / window.innerHeight - 0.5) * 10;
      frame.style.transition = 'transform 0.08s ease';
      frame.style.transform = `perspective(700px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
    });
  });

  document.addEventListener('mouseleave', () => {
    frame.style.transition = 'transform 0.7s ease';
    frame.style.transform  = 'perspective(700px) rotateY(0) rotateX(0)';
  });
})();
