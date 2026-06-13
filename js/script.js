// ── Scroll-to-top ────────────────────────────────────────
const scrollBtn = document.getElementById('scroll-btn');

window.addEventListener('scroll', () => {
  if (scrollBtn) {
    scrollBtn.style.display = window.scrollY > 200 ? 'flex' : 'none';
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Mobile nav toggle ────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('navbar-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  // Close menu when a link is tapped
  navMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// ── Theme toggle (color-scheme approach) ─────────────────
// light-dark() CSS function reads the color-scheme property.
// Default is light; toggling sets it to dark.

function getScheme() {
  return localStorage.getItem('colorScheme') || 'dark';
}

function applyScheme(scheme) {
  document.documentElement.style.colorScheme = scheme;
  localStorage.setItem('colorScheme', scheme);

  // Update both toggle buttons (sidebar + mobile navbar)
  const icons = [
    document.getElementById('theme-icon'),
    document.getElementById('theme-icon-sidebar'),
  ];
  icons.forEach((icon) => {
    if (!icon) return;
    icon.className = scheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  });

  const btns = [
    document.getElementById('theme-toggle'),
    document.getElementById('theme-toggle-sidebar'),
  ];
  btns.forEach((btn) => {
    if (!btn) return;
    btn.setAttribute('aria-label', scheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

// Apply on page load
applyScheme(getScheme());

// Wire up both toggle buttons
['theme-toggle', 'theme-toggle-sidebar'].forEach((id) => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('click', () => {
    applyScheme(getScheme() === 'dark' ? 'light' : 'dark');
  });
});

// ── Tab key → 4 spaces in tool textareas ────────────────
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Tab' || !e.target.classList.contains('csv-textarea')) return;
  e.preventDefault();
  var ta = e.target, s = ta.selectionStart, end = ta.selectionEnd;
  ta.value = ta.value.substring(0, s) + '    ' + ta.value.substring(end);
  ta.selectionStart = ta.selectionEnd = s + 4;
  ta.dispatchEvent(new Event('input'));
});
