// =========================================================
// PIXEL Y MENTE — interacciones del sitio
// =========================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- menú móvil ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('is-open'));
    });
    document.addEventListener('click', (e) => {
      if (!links.contains(e.target) && !toggle.contains(e.target)) {
        links.classList.remove('is-open');
      }
    });
  }

  /* ---------- marcar enlace activo según la página actual ---------- */
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    if (a.dataset.page === current) a.classList.add('active');
  });

  /* ---------- revelado suave al hacer scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- resaltado de tabla de contenidos (páginas de blog) ---------- */
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    const targets = Array.from(tocLinks).map(a => document.querySelector(a.getAttribute('href')));
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const idx = targets.indexOf(entry.target);
        if (idx === -1) return;
        if (entry.isIntersecting) {
          tocLinks.forEach(l => l.style.borderColor = '');
          tocLinks.forEach(l => l.style.color = '');
          tocLinks[idx].style.borderColor = 'var(--celeste)';
          tocLinks[idx].style.color = 'var(--text)';
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    targets.forEach(t => t && io2.observe(t));
  }

  /* ---------- formulario de contacto (demo, sin backend) ---------- */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.querySelector('#form-success');
      if (success) {
        success.classList.add('is-visible');
        success.setAttribute('role', 'status');
      }
      form.reset();
      if (success) success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  /* ---------- año en el footer ---------- */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});
