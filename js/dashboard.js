

(function () {
  'use strict';

  const STORAGE_KEY = 'skillforge-dashboard';

  
  const AIRecommendations = {
    suggestions: [
      {
        icon: '🎯',
        text: 'Based on your React projects, consider applying for Frontend Developer internships at tech startups.',
        category: 'career',
      },
      {
        icon: '📚',
        text: 'Your Python skills are at 72%. Complete a data visualization project to reach 85% and unlock Data Analyst roles.',
        category: 'learning',
      },
      {
        icon: '🚀',
        text: 'Add a live demo link to "EcoTrack App" — portfolios with demos receive 3× more recruiter views.',
        category: 'portfolio',
      },
      {
        icon: '🤝',
        text: 'Connect with 2 peers who completed similar internships at Stripe and Google for referral insights.',
        category: 'network',
      },
    ],

    init() {
      const container = document.querySelector('[data-ai-recommendations]');
      if (!container) return;

      this.render(container);
      this.simulateRefresh(container);
    },

    render(container) {
      const list = container.querySelector('[data-ai-list]') || container;
      list.innerHTML = this.suggestions
        .map(
          (s) => `
        <li class="ai-panel__item">
          <span class="ai-panel__item-icon" aria-hidden="true">${s.icon}</span>
          <span>${s.text}</span>
        </li>
      `
        )
        .join('');
    },

    simulateRefresh(container) {
      const btn = document.querySelector('[data-ai-refresh]');
      if (!btn) return;

      btn.addEventListener('click', () => {
        btn.disabled = true;
        btn.textContent = 'Analyzing…';

        setTimeout(() => {
          const shuffled = [...this.suggestions].sort(() => Math.random() - 0.5);
          this.suggestions = shuffled;
          this.render(container);
          btn.disabled = false;
          btn.textContent = 'Refresh Insights';
        }, 1500);
      });
    },
  };

  
  const DashboardProgress = {
    init() {
      const bars = document.querySelectorAll('[data-dashboard-progress]');
      if (!bars.length) return;

      setTimeout(() => {
        bars.forEach((bar) => {
          bar.style.width = bar.dataset.dashboardProgress + '%';
        });
      }, 300);
    },
  };

  
  const DashboardGreeting = {
    init() {
      const greetingEl = document.querySelector('[data-greeting]');
      if (!greetingEl) return;

      const hour = new Date().getHours();
      let timeGreeting = 'Good evening';
      if (hour < 12) timeGreeting = 'Good morning';
      else if (hour < 17) timeGreeting = 'Good afternoon';

      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const name = saved.userName || 'Alex';
      greetingEl.textContent = `${timeGreeting}, ${name}!`;
    },
  };

  
  const LearningStreak = {
    init() {
      const streakEl = document.querySelector('[data-streak]');
      if (!streakEl) return;

      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      const streak = saved.streak || 12;
      streakEl.textContent = streak;

      const today = new Date().toDateString();
      if (saved.lastVisit !== today) {
        const newStreak = saved.lastVisit ? streak + 1 : streak;
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...saved, streak: newStreak, lastVisit: today })
        );
        streakEl.textContent = newStreak;
      }
    },
  };

  
  document.addEventListener('DOMContentLoaded', () => {
    AIRecommendations.init();
    DashboardProgress.init();
    DashboardGreeting.init();
    LearningStreak.init();
  });
})();
