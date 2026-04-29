/* ==========================================
   RETRO E-PORTFOLIO — main.js
   ========================================== */

'use strict';

/* ── NAVBAR SCROLL & BURGER ── */
const navbar   = document.getElementById('navbar');
const burger   = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = mobileMenu.querySelectorAll('a');
const progressBar = document.getElementById('progress-bar');
const backTop   = document.getElementById('back-top');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';

  if (scrollTop > 300) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }
}, { passive: true });

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── ACTIVE NAV LINK ── */
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + id) a.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

/* ── TYPEWRITER HERO ── */
const typeTarget = document.getElementById('typewriter');
const phrases = [
  'BSEd — Social Studies',
  'Future Educator',
  'Technology Enthusiast',
  'Samar State University'
];
let pi = 0, ci = 0, deleting = false, pause = false;

function typeLoop() {
  if (pause) return;
  const word = phrases[pi];

  if (!deleting) {
    typeTarget.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) {
      pause = true;
      setTimeout(() => { pause = false; deleting = true; typeLoop(); }, 2000);
      return;
    }
    setTimeout(typeLoop, 80);
  } else {
    typeTarget.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 45);
  }
}
typeLoop();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 5) * 0.08 + 's';
  revealObs.observe(el);
});

/* ── REFLECTION ACCORDION ── */
const reflToggles = document.querySelectorAll('.reflection-toggle');
reflToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const body = toggle.nextElementSibling;
    const isOpen = body.classList.contains('open');

    // Close all
    document.querySelectorAll('.reflection-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.reflection-toggle').forEach(t => t.classList.remove('active'));

    if (!isOpen) {
      body.classList.add('open');
      toggle.classList.add('active');
    }
  });
});

/* ── OPEN FIRST REFLECTION ── */
const firstToggle = document.querySelector('.reflection-toggle');
if (firstToggle) {
  firstToggle.click();
}

/* ── STAMP TILT ON LOAD ── */
document.querySelectorAll('.hero-stamp').forEach(el => {
  const tilt = (Math.random() - 0.5) * 8;
  el.style.transform = `rotate(${tilt}deg)`;
});

/* ── SUBTLE PARALLAX ON HERO BG ── */
const heroBgLines = document.querySelector('.hero-bg-lines');
if (heroBgLines) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBgLines.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
}
