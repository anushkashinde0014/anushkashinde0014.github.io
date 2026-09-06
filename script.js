const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const progress = document.querySelector('.scroll-progress');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark') setTheme('dark');

function setTheme(theme) {
  body.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  localStorage.setItem('portfolio-theme', theme);
}

themeToggle.addEventListener('click', () => setTheme(body.dataset.theme === 'dark' ? 'light' : 'dark'));
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
navItems.forEach((item) => item.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) {
        navItems.forEach((link) => link.classList.remove('active'));
        activeLink.classList.add('active');
      }
    }
  });
}, { threshold: 0.18, rootMargin: '-10% 0px -55% 0px' });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
sections.forEach((section) => observer.observe(section));

window.addEventListener('scroll', () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
}, { passive: true });

const form = document.querySelector('#contact-form');
const status = document.querySelector('.form-status');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  const invalid = fields.find((field) => !field.value.trim() || (field.type === 'email' && !field.validity.valid));
  if (invalid) {
    status.textContent = `Please check your ${invalid.labels[0].textContent.toLowerCase()}.`;
    invalid.focus();
    return;
  }
  status.textContent = 'Thanks, Anushka will get back to you soon.';
  form.reset();
});
