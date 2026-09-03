// Mobile navigation: keep its ARIA state and page scroll state in sync.
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.global-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  navigation.classList.toggle('open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Replace the botanical candle placeholder artwork with the actual product photo.
const botanicalVisual = document.querySelector('.visual-botanical');
if (botanicalVisual) {
  const botanicalImage = document.createElement('img');
  botanicalImage.src = './graceful-candle-botanical.jpg';
  botanicalImage.alt = '花を閉じ込めたボタニカルキャンドル';
  botanicalImage.loading = 'lazy';
  botanicalImage.style.width = '100%';
  botanicalImage.style.height = '100%';
  botanicalImage.style.objectFit = 'cover';
  botanicalImage.style.objectPosition = 'center center';
  botanicalImage.style.display = 'block';
  botanicalVisual.replaceChildren(botanicalImage);
  botanicalVisual.removeAttribute('role');
  botanicalVisual.removeAttribute('aria-label');
}

// Add a quiet header background after the hero starts to scroll away.
const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// Reveal content only when it enters the viewport; respect reduced-motion in CSS.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Keep the copyright year current without requiring regular file edits.
document.querySelector('#year').textContent = new Date().getFullYear();