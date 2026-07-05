// ===== NAVBAR: turn solid once the page is scrolled =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
  navMenu.classList.remove('open');
  hamburger.textContent = '☰';
}
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  navMenu.classList.toggle('open');
  hamburger.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
});
navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// ===== HERO IMAGE SLIDER =====
const slides = document.querySelectorAll('.slide');
const dotsBox = document.getElementById('dots');
let current = 0;
let heroTimer;

// build one dot per slide
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => { goToSlide(i); resetHeroTimer(); });
  dotsBox.appendChild(dot);
});
const dots = dotsBox.querySelectorAll('button');

function goToSlide(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;   // wraps around both ways
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
function nextSlide() { goToSlide(current + 1); }
function prevSlide() { goToSlide(current - 1); }

document.getElementById('nextBtn').addEventListener('click', () => { nextSlide(); resetHeroTimer(); });
document.getElementById('prevBtn').addEventListener('click', () => { prevSlide(); resetHeroTimer(); });

// auto-advance every 5 seconds
function startHeroTimer() { heroTimer = setInterval(nextSlide, 5000); }
function resetHeroTimer() { clearInterval(heroTimer); startHeroTimer(); }
startHeroTimer();

// ===== TESTIMONIALS SLIDER =====
const testis = document.querySelectorAll('.testi');
const testiDotsBox = document.getElementById('testiDots');
let tCurrent = 0;
let testiTimer;

testis.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => { goToTesti(i); resetTestiTimer(); });
  testiDotsBox.appendChild(dot);
});
const tDots = testiDotsBox.querySelectorAll('button');

function goToTesti(n) {
  testis[tCurrent].classList.remove('active');
  tDots[tCurrent].classList.remove('active');
  tCurrent = (n + testis.length) % testis.length;
  testis[tCurrent].classList.add('active');
  tDots[tCurrent].classList.add('active');
}
function startTestiTimer() { testiTimer = setInterval(() => goToTesti(tCurrent + 1), 6000); }
function resetTestiTimer() { clearInterval(testiTimer); startTestiTimer(); }
startTestiTimer();

// ===== SCROLL REVEAL ANIMATIONS =====
// Sections fade + rise into view as you scroll (modern, smooth feel)
if ('IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.section-title, .section-subtitle, .feature, .about-wrap, .program, .video-wrap, .gallery-item, .testi-slider, .cta, .contact-wrap'
  );
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';   // subtle stagger
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);   // animate once
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => io.observe(el));
}

// ===== SWIPE SUPPORT FOR SLIDERS (touch devices) =====
function addSwipe(element, onSwipeLeft, onSwipeRight) {
  if (!element) return;
  let startX = 0;
  element.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].screenX; }, { passive: true });
  element.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].screenX - startX;
    if (Math.abs(diff) > 50) { diff < 0 ? onSwipeLeft() : onSwipeRight(); }
  }, { passive: true });
}
addSwipe(document.querySelector('.hero-slider'),
  () => { nextSlide(); resetHeroTimer(); },
  () => { prevSlide(); resetHeroTimer(); });
addSwipe(document.getElementById('testiSlider'),
  () => { goToTesti(tCurrent + 1); resetTestiTimer(); },
  () => { goToTesti(tCurrent - 1); resetTestiTimer(); });

// ===== BACK-TO-TOP BUTTON =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

