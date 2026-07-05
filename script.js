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
