/* ════════════════════════════════
   MA105 Study Guide · script.js
   @wistaar
════════════════════════════════ */

// ── Theme ──
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

const ICONS = { light: '☀', dark: '☾' };

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? ICONS.dark : ICONS.light;
  themeToggle.title = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  localStorage.setItem('dm-theme', theme);
}

// Load saved theme or system preference
const saved = localStorage.getItem('dm-theme');
if (saved) {
  applyTheme(saved);
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ── Progress Bar ──
const progressBar = document.getElementById('progressBar');
const navbar      = document.getElementById('navbar');
const backToTop   = document.getElementById('backToTop');

window.addEventListener('scroll', onScroll, { passive: true });

function onScroll() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
  const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';

  // Back to top
  backToTop.classList.toggle('visible', scrollTop > 500);

  // Active nav link
  updateActiveLink();
}

// ── Active Nav Link ──
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const y = window.scrollY + 80;
  let active = null;
  sections.forEach(s => {
    if (y >= s.offsetTop) active = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.dataset.section === active);
  });
}

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    // Close mobile menu
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── Back to Top ──
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── Hamburger ──
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ── Intersection Observer (fade-in) ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll(
  '.question-card, .theory-block, .type-card, .formula-card, .prop-card'
).forEach(el => {
  el.classList.add('fade-in');
  io.observe(el);
});

// ── Keyboard shortcut ──
document.addEventListener('keydown', e => {
  if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (e.key === 'd' && !e.ctrlKey && !e.metaKey) {
    const cur = html.getAttribute('data-theme') || 'light';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  }
});
