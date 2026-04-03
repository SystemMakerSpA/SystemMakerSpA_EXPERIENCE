// Navbar scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Burger menu
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});

document.querySelectorAll('.navbar__links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});

// Animated stats counter
function animateStats() {
  const counters = document.querySelectorAll('.hero__stat-number[data-target]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1200;
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      counter.textContent = current + (target > 9 ? '+' : '');
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + (target > 9 ? '+' : '');
      }
    }
    requestAnimationFrame(update);
  });
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
  animateStats();
});
