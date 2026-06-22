

(function () {
  'use strict';

  
  const STORAGE_KEYS = {
    theme: 'skillforge-theme',
    skillProgress: 'skillforge-skill-progress',
  };

  
  const ThemeManager = {
    init() {
      const saved = localStorage.getItem(STORAGE_KEYS.theme);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? 'dark' : 'light');
      this.apply(theme);

      document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => this.toggle());
        btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggle();
          }
        });
      });

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEYS.theme)) {
          this.apply(e.matches ? 'dark' : 'light');
        }
      });
    },

    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      this.apply(current === 'dark' ? 'light' : 'dark');
    },
  };

  
  const Navigation = {
    init() {
      const toggle = document.querySelector('[data-menu-toggle]');
      const mobileNav = document.querySelector('[data-mobile-nav]');
      const overlay = document.querySelector('[data-mobile-overlay]');

      if (!toggle || !mobileNav) return;

      const open = () => {
        toggle.setAttribute('aria-expanded', 'true');
        mobileNav.classList.add('is-open');
        overlay?.classList.add('is-visible');
        document.body.style.overflow = 'hidden';
        mobileNav.querySelector('a')?.focus();
      };

      const close = () => {
        toggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        overlay?.classList.remove('is-visible');
        document.body.style.overflow = '';
        toggle.focus();
      };

      toggle.addEventListener('click', () => {
        toggle.getAttribute('aria-expanded') === 'true' ? close() : open();
      });

      overlay?.addEventListener('click', close);

      mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', close);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
          close();
        }
      });

      this.highlightActivePage();
    },

    highlightActivePage() {
      const current = window.location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach((link) => {
        const href = link.getAttribute('href');
        if (href === current || (current === '' && href === 'index.html')) {
          link.classList.add('site-nav__link--active', 'mobile-nav__link--active');
          link.setAttribute('aria-current', 'page');
        }
      });
    },
  };

  
  const StatsCounter = {
    init() {
      const counters = document.querySelectorAll('[data-counter]');
      if (!counters.length) return;

      const animate = (el) => {
        const target = parseInt(el.dataset.counter, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
              entry.target.dataset.counted = 'true';
              animate(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      counters.forEach((c) => observer.observe(c));
    },
  };


  const SkillTracker = {
    init() {
      this.animateBars();
      this.bindForm();
      this.loadSavedProgress();
    },

    animateBars() {
      const fills = document.querySelectorAll('[data-skill-fill]');
      if (!fills.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const fill = entry.target;
              fill.style.width = fill.dataset.skillFill + '%';
            }
          });
        },
        { threshold: 0.2 }
      );

      fills.forEach((f) => observer.observe(f));
    },

    bindForm() {
      const form = document.querySelector('[data-skill-form]');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = form.querySelector('[name="skill-name"]');
        const levelInput = form.querySelector('[name="skill-level"]');
        const name = nameInput.value.trim();
        const level = parseInt(levelInput.value, 10);

        if (!name || level < 0 || level > 100) return;

        this.addSkill(name, level);
        nameInput.value = '';
        levelInput.value = '';
      });
    },

    addSkill(name, level) {
      const container = document.querySelector('[data-custom-skills]');
      if (!container) return;

      const item = document.createElement('div');
      item.className = 'skill-item';
      item.innerHTML = `
        <span class="skill-item__name">${this.escapeHtml(name)}</span>
        <div class="skill-item__track" role="progressbar" aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100" aria-label="${this.escapeHtml(name)} progress">
          <div class="skill-item__fill" data-skill-fill="${level}" style="width: ${level}%"></div>
        </div>
        <span class="skill-item__pct">${level}%</span>
      `;
      container.appendChild(item);

      const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.skillProgress) || '[]');
      saved.push({ name, level });
      localStorage.setItem(STORAGE_KEYS.skillProgress, JSON.stringify(saved));
    },

    loadSavedProgress() {
      const container = document.querySelector('[data-custom-skills]');
      if (!container) return;

      const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.skillProgress) || '[]');
      saved.forEach(({ name, level }) => {
        const item = document.createElement('div');
        item.className = 'skill-item';
        item.innerHTML = `
          <span class="skill-item__name">${this.escapeHtml(name)}</span>
          <div class="skill-item__track" role="progressbar" aria-valuenow="${level}" aria-valuemin="0" aria-valuemax="100">
            <div class="skill-item__fill" data-skill-fill="${level}" style="width: 0"></div>
          </div>
          <span class="skill-item__pct">${level}%</span>
        `;
        container.appendChild(item);
      });

      this.animateBars();
    },

    escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },
  };

  
  const InternshipFilter = {
    init() {
      const roleFilter = document.querySelector('[data-filter-role]');
      const locationFilter = document.querySelector('[data-filter-location]');
      const typeFilter = document.querySelector('[data-filter-type]');
      const cards = document.querySelectorAll('[data-internship-card]');
      const noResults = document.querySelector('[data-no-results]');

      if (!cards.length) return;

      const filter = () => {
        const role = roleFilter?.value.toLowerCase() || '';
        const location = locationFilter?.value.toLowerCase() || '';
        const type = typeFilter?.value.toLowerCase() || '';
        let visible = 0;

        cards.forEach((card) => {
          const cardRole = card.dataset.role?.toLowerCase() || '';
          const cardLocation = card.dataset.location?.toLowerCase() || '';
          const cardType = card.dataset.type?.toLowerCase() || '';

          const show =
            (!role || cardRole.includes(role)) &&
            (!location || cardLocation.includes(location)) &&
            (!type || cardType === type);

          card.classList.toggle('is-hidden', !show);
          if (show) visible++;
        });

        noResults?.classList.toggle('is-visible', visible === 0);
      };

      [roleFilter, locationFilter, typeFilter].forEach((el) => {
        el?.addEventListener('change', filter);
        el?.addEventListener('input', filter);
      });
    },
  };

  
  const FormValidator = {
    init() {
      const form = document.querySelector('[data-contact-form]');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        form.querySelectorAll('[data-validate]').forEach((field) => {
          if (!this.validateField(field)) valid = false;
        });

        if (valid) {
          const success = document.querySelector('[data-form-success]');
          success?.classList.add('is-visible');
          form.reset();
          success?.focus();
        }
      });

      form.querySelectorAll('[data-validate]').forEach((field) => {
        field.addEventListener('blur', () => this.validateField(field));
        field.addEventListener('input', () => {
          if (field.closest('.form-group--error')) {
            this.validateField(field);
          }
        });
      });
    },

    validateField(field) {
      const group = field.closest('.form-group');
      const errorEl = group?.querySelector('.form-error');
      let message = '';

      const value = field.value.trim();
      const type = field.dataset.validate;

      if (type === 'required' && !value) {
        message = 'This field is required.';
      } else if (type === 'email') {
        if (!value) {
          message = 'This field is required.';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) message = 'Please enter a valid email address.';
        }
      } else if (type === 'minlength') {
        const min = parseInt(field.dataset.minLength, 10) || 10;
        if (value.length < min) message = `Must be at least ${min} characters.`;
      }

      group?.classList.toggle('form-group--error', !!message);
      if (errorEl) errorEl.textContent = message;
      field.setAttribute('aria-invalid', message ? 'true' : 'false');

      return !message;
    },
  };

  
  const LazyLoader = {
    init() {
      const images = document.querySelectorAll('img[data-src]');
      if (!images.length) return;

      if ('loading' in HTMLImageElement.prototype) {
        images.forEach((img) => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      });

      images.forEach((img) => observer.observe(img));
    },
  };

  
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    Navigation.init();
    StatsCounter.init();
    SkillTracker.init();
    InternshipFilter.init();
    FormValidator.init();
    LazyLoader.init();
  });
})();
