document.addEventListener("DOMContentLoaded", () => {

  /* ---- FAB Social Toggle ---- */
  const fabSocialToggle = document.getElementById("fab-social-toggle");
  const fabSocialMenu = document.getElementById("fab-social-menu");

  if (fabSocialToggle && fabSocialMenu) {
    fabSocialToggle.addEventListener("click", () => {
      const isExpanded = fabSocialToggle.getAttribute("aria-expanded") === "true";
      fabSocialToggle.setAttribute("aria-expanded", !isExpanded);

      if (!isExpanded) {
        fabSocialToggle.classList.add("active");
        fabSocialMenu.classList.add("active");
      } else {
        fabSocialToggle.classList.remove("active");
        fabSocialMenu.classList.remove("active");
      }
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      if (!e.target.closest('.fab-social-wrapper') && fabSocialMenu.classList.contains('active')) {
        fabSocialToggle.setAttribute("aria-expanded", "false");
        fabSocialToggle.classList.remove("active");
        fabSocialMenu.classList.remove("active");
      }
    });
  }

  /* ---- Dark mode toggle ---- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const htmlEl = document.documentElement;

  function applyTheme(dark) {
    if (dark) {
      htmlEl.setAttribute('data-theme', 'dark');
      themeToggle.checked = true;
      themeToggle.setAttribute('aria-checked', 'true');
      if (themeLabel) themeLabel.textContent = 'Escuro';
    } else {
      htmlEl.removeAttribute('data-theme');
      themeToggle.checked = false;
      themeToggle.setAttribute('aria-checked', 'false');
      if (themeLabel) themeLabel.textContent = 'Claro';
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  /* Restore saved preference, or fall back to system preference */
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme === 'dark');
  } else {
    applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  themeToggle.addEventListener('change', () => applyTheme(themeToggle.checked));

  /* ---- Mobile menu toggle ---- */
  const menuButton = document.getElementById('menu-toggle');
  const nav = document.querySelector('.nav');

  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('active');
    menuButton.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute(
      'aria-label',
      isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
    );
  });

  /* Close menu on nav-link click */
  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuButton.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu de navegação');
    });
  });

  /* Close menu on outside click */
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
      nav.classList.remove('active');
      menuButton.classList.remove('active');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---- Header shrink on scroll ---- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ---- Scroll-reveal animation ---- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

