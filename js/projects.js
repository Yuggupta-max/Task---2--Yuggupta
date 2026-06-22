

(function () {
  'use strict';

  const ProjectManager = {
    apiUrl: 'http://localhost:3000/api/projects',
    elements: {},
    state: {
      projects: [],
    },

    init() {
      this.cacheElements();
      if (!this.elements.projectsGrid || !this.elements.projectForm) return;
      this.bindEvents();
      this.loadProjects();
    },

    cacheElements() {
      this.elements.projectsGrid = document.querySelector('[data-projects-grid]');
      this.elements.projectForm = document.querySelector('[data-project-form]');
      this.elements.projectStatus = document.querySelector('[data-project-status]');
      this.elements.noResults = document.querySelector('[data-no-results]');
      this.elements.searchInput = document.querySelector('[data-project-search]');
      this.elements.filterTags = document.querySelectorAll('[data-filter-tag]');
    },

    bindEvents() {
      this.elements.projectForm.addEventListener('submit', (event) => this.addProject(event));

      if (this.elements.searchInput) {
        this.elements.searchInput.addEventListener('input', () => this.applyFilter());
      }

      this.elements.filterTags.forEach((tag) => {
        tag.addEventListener('click', () => {
          this.elements.filterTags.forEach((t) => t.classList.remove('filter-tag--active'));
          tag.classList.add('filter-tag--active');
          this.applyFilter();
        });
      });
    },

    async loadProjects() {
      this.showStatus('Loading projects...', 'loading');

      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
          throw new Error('Unable to load projects. Please try again.');
        }

        const json = await response.json();
        this.state.projects = Array.isArray(json.data) ? json.data : [];
        this.renderProjects(this.state.projects);
        this.clearStatus();
      } catch (error) {
        this.renderProjects([]);
        this.showStatus(error.message || 'Unable to load projects. Please try again.', 'error');
      }
    },

    async addProject(event) {
      event.preventDefault();

      const formData = new FormData(this.elements.projectForm);
      const project = {
        title: formData.get('title')?.toString().trim() || '',
        category: formData.get('category')?.toString().trim() || '',
        description: formData.get('description')?.toString().trim() || '',
      };

      if (!project.title || !project.category || !project.description) {
        this.showStatus('Please fill in all fields before submitting.', 'error');
        return;
      }

      this.showStatus('Saving project…', 'loading');

      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        });

        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message || 'Unable to save project. Please try again.');
        }

        this.state.projects.unshift(json.data);
        this.renderProjects(this.state.projects);
        this.elements.projectForm.reset();
        this.showStatus('Project added successfully.', 'success');
      } catch (error) {
        this.showStatus(error.message || 'Unable to save project. Please try again.', 'error');
      }
    },

    renderProjects(projects) {
      this.elements.projectsGrid.innerHTML = '';

      if (!projects.length) {
        this.elements.noResults.textContent = 'No projects have been added yet. Use the form to add your first project.';
        this.elements.noResults.classList.add('is-visible');
        return;
      }

      this.elements.noResults.classList.remove('is-visible');

      projects.forEach((project) => {
        const card = document.createElement('article');
        card.className = 'glass-card project-card';
        card.setAttribute('role', 'listitem');
        card.dataset.projectCard = '';
        card.dataset.title = project.title;
        card.dataset.description = project.description;
        card.dataset.category = project.category.toLowerCase();

        card.innerHTML = `
          <div class="project-card__image-wrap">
            <img src="assets/images/project-placeholder.svg" alt="${this.escapeHtml(project.title)} project screenshot" class="project-card__image" loading="lazy" width="400" height="225">
          </div>
          <div class="project-card__tags">
            <span class="project-card__tag">${this.escapeHtml(project.category)}</span>
          </div>
          <h2 class="project-card__title">${this.escapeHtml(project.title)}</h2>
          <p class="project-card__desc">${this.escapeHtml(project.description)}</p>
          <div class="project-card__footer">
            <span class="project-card__meta">Added ${this.formatDate(project.createdAt)}</span>
            <a href="#" class="btn btn--sm btn--primary">View Details</a>
          </div>
        `;

        this.elements.projectsGrid.appendChild(card);
      });

      this.applyFilter();
    },

    applyFilter() {
      const query = this.elements.searchInput?.value.toLowerCase().trim() || '';
      const activeTag = Array.from(this.elements.filterTags).find((tag) => tag.classList.contains('filter-tag--active'))?.dataset.filterTag || 'all';
      const cards = Array.from(document.querySelectorAll('[data-project-card]'));
      let visibleCount = 0;

      cards.forEach((card) => {
        const title = card.dataset.title?.toLowerCase() || '';
        const description = card.dataset.description?.toLowerCase() || '';
        const category = card.dataset.category || '';
        const matchesSearch = !query || title.includes(query) || description.includes(query);
        const matchesTag = activeTag === 'all' || category === activeTag;
        const show = matchesSearch && matchesTag;

        card.classList.toggle('is-hidden', !show);
        card.setAttribute('aria-hidden', show ? 'false' : 'true');
        if (show) visibleCount += 1;
      });

      if (cards.length === 0) {
        this.elements.noResults.textContent = 'No projects have been added yet. Use the form to add your first project.';
        this.elements.noResults.classList.add('is-visible');
      } else if (visibleCount === 0) {
        this.elements.noResults.textContent = 'No projects match your search. Try different keywords or filters.';
        this.elements.noResults.classList.add('is-visible');
      } else {
        this.elements.noResults.classList.remove('is-visible');
      }
    },

    showStatus(message, status = 'success') {
      if (!this.elements.projectStatus) return;
      this.elements.projectStatus.innerHTML = `
        <div class="project-status__message project-status__message--${status}">
          <strong>${this.escapeHtml(message)}</strong>
        </div>
      `;
    },

    clearStatus() {
      if (!this.elements.projectStatus) return;
      this.elements.projectStatus.innerHTML = '';
    },

    formatDate(dateString) {
      if (!dateString) return 'Unknown date';
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        year: 'numeric',
      });
    },

    escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    },
  };

  document.addEventListener('DOMContentLoaded', () => {
    ProjectManager.init();
  });
})();
