'use strict';
const track = document.getElementById('sliderTrack');
const container = document.getElementById('sliderContainer');
const slides = track.children;
const indicators = document.getElementById('indicators');
let currentIndex = 0;
let slideInterval;

function updateSlider() {
  const slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  [...indicators.children].forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('div');
  dot.classList.add('indicator');
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider();
  });
  indicators.appendChild(dot);
}

container.addEventListener('mouseenter', stopAutoSlide);
container.addEventListener('mouseleave', startAutoSlide);

window.addEventListener('resize', updateSlider);

updateSlider();
startAutoSlide();

///Hamburger

const hamburger = document.getElementById('hamburger');
const slideMenu = document.getElementById('slideMenu');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

// Toggle menu and overlay on hamburger click
hamburger.addEventListener('click', e => {
  e.stopPropagation();
  const isMenuVisible = slideMenu.style.display === 'flex';
  slideMenu.style.display = isMenuVisible ? 'none' : 'flex';
  overlay.style.display = isMenuVisible ? 'none' : 'block'; // Show/hide overlay
});

// Close menu when close button is clicked
closeBtn.addEventListener('click', () => {
  slideMenu.style.display = 'none';
  overlay.style.display = 'none'; // Hide overlay when close button is clicked
});

// Prevent clicks inside menu and overlay from closing the menu
slideMenu.addEventListener('click', e => {
  e.stopPropagation();
});
overlay.addEventListener('click', () => {
  slideMenu.style.display = 'none';
  overlay.style.display = 'none'; // Hide overlay when clicked
});

// Close menu on click anywhere else
document.addEventListener('click', () => {
  slideMenu.style.display = 'none';
  overlay.style.display = 'none'; // Hide overlay
});
