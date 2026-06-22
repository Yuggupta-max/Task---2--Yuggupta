# SkillForge

**An AI-powered student career and project showcase platform** built with HTML5, CSS3, and Vanilla JavaScript.

SkillForge helps students build project portfolios, track learning progress, discover internships, and explore AI-inspired career recommendations through a modern frontend UI.

---

## Quick Start

Clone the repository:

```bash
git clone https://github.com/Yuggupta-max/Task---1--Yuggupta.git
cd Task---1--Yuggupta
```

Install dependencies:

```bash
npm install
```

Run the local preview server:

```bash
npm run dev
```

Open the app in your browser at:

```text
http://localhost:5000
```

> If you prefer not to use npm, you can also open `index.html` directly in the browser. Using `npm run dev` is recommended for best local behavior.

---

## API Server

The API backend is located in `skillforge-api`.

```bash
cd skillforge-api
npm install
npm run dev
```

Default API URL:

```text
http://localhost:3000
```

Available API endpoints:

- `GET /`
- `GET /api/users`
- `POST /api/users`
- `GET /api/projects`
- `POST /api/projects`
- `GET /api/skills`
- `POST /api/skills`
- `GET /api/internships`
- `POST /api/internships`
- `GET /api/recommendations`

---

## Recent Fix

- Corrected a CSS syntax issue in `css/style.css` where declarations were accidentally placed outside a selector block after the `@media (min-width: 900px)` rule.

---

## Features

| Feature | Description |
|---------|-------------|
| **Project Portfolios** | Searchable, filterable project cards with category tags |
| **Skill Tracking** | Animated progress bars, skill rings, custom skill logging |
| **AI Career Insights** | Simulated AI recommendations on the dashboard |
| **Internship Explorer** | Internship listings with filtering options |
| **Dark/Light Mode** | Theme toggle with localStorage persistence |
| **Responsive Design** | Layouts for mobile, tablet, and desktop |
| **Accessibility** | ARIA labels, skip links, keyboard navigation |
| **Form Validation** | Client-side validation for forms |

---

## Tech Stack

- **HTML5** — Semantic structure (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3** — Custom properties, Grid, Flexbox, `clamp()`, glassmorphism
- **JavaScript (ES6+)** — Modular code, localStorage, IntersectionObserver
- **Fonts** — [Inter](https://fonts.google.com/specimen/Inter), [Open Sans](https://fonts.google.com/specimen/Open+Sans)

No frameworks or CSS preprocessors.

---

## Project Structure

```
SkillForge/
├── index.html              # Landing page
├── dashboard.html          # Career dashboard with AI insights
├── projects.html           # Project portfolio with search/filter
├── skills.html             # Skill progress tracker
├── internships.html        # Internship explorer
├── profile.html            # Student profile page
├── contact.html            # Contact form with validation
├── css/
│   ├── style.css           # Core design system & components
│   └── responsive.css      # Breakpoint overrides (768px, 1024px)
├── js/
│   ├── main.js             # Shared modules (theme, nav, filters, etc.)
│   └── dashboard.js        # Dashboard-specific logic
├── assets/
│   ├── images/             # SVG illustrations (optimized, lightweight)
│   └── icons/              # Favicon
└── README.md
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#A5896F` | Buttons, accents, links |
| Secondary | `#A0D4E0` | Highlights, badges, focus rings |
| Background | `#F2F0EA` | Page background |

### Typography

- **Headings:** Inter (500–800)
- **Body:** Open Sans (400–600)
- **Scale:** Fluid sizing via `clamp()`

### Components

- Glassmorphism cards with `backdrop-filter: blur(16px)`
- Soft shadows and rounded corners (`border-radius: 14–32px`)
- Gradient buttons and progress bars

---

## JavaScript Modules

### `main.js`

| Module | Purpose |
|--------|---------|
| `ThemeManager` | Dark/light toggle, localStorage, system preference |
| `Navigation` | Mobile menu, active page highlighting, Escape key |
| `StatsCounter` | Animated number counters on scroll |
| `ProjectFilter` | Search + category tag filtering |
| `SkillTracker` | Progress bar animation, custom skill form, localStorage |
| `InternshipFilter` | Role, location, type filtering |
| `FormValidator` | Contact form validation with accessible errors |
| `LazyLoader` | Lazy image loading with IntersectionObserver fallback |

### `dashboard.js`

| Module | Purpose |
|--------|---------|
| `AIRecommendations` | Renders and refreshes simulated AI insights |
| `DashboardProgress` | Animates dashboard progress bars |
| `DashboardGreeting` | Time-based greeting |
| `LearningStreak` | Streak counter with localStorage |

---

## LocalStorage Keys

| Key | Data |
|-----|------|
| `skillforge-theme` | `"light"` or `"dark"` |
| `skillforge-skill-progress` | Array of `{ name, level }` custom skills |
| `skillforge-dashboard` | Dashboard preferences (streak, userName) |

---

## Accessibility

- Skip-to-content link on every page
- Semantic landmarks and ARIA labels
- `aria-expanded`, `aria-current`, `aria-invalid` on interactive elements
- Keyboard support: Escape closes mobile menu, focus management
- `prefers-reduced-motion` and `prefers-contrast` media queries
- Sufficient color contrast in both light and dark themes
- Form errors linked via `role="alert"`

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| **< 768px** (Mobile) | Single column, hamburger nav, stacked filters |
| **≥ 768px** (Tablet) | 2-column grids, desktop nav visible |
| **≥ 1024px** (Desktop) | 3-column projects, dashboard sidebar, 2-column internships |

---

## Getting Started

### Clone the Repository

Use the GitHub URL below to clone this repo to your local machine:

```bash
git clone https://github.com/Yuggupta-max/Task---1--Yuggupta.git
cd Task---1--Yuggupta
```

### Run with npm

Install dependencies and start the local preview server:

```bash
npm install
npm run dev
```

Then open your browser at:

```text
http://localhost:5000
```

### Open Directly in the Browser

If you prefer not to use npm, you can still open the site directly:

1. Open your file explorer.
2. Navigate to the cloned folder `Task---1--Yuggupta`.
3. Double-click `index.html` to open it in your default browser.

If you want to choose a specific browser, right-click `index.html` and select **Open with** from the context menu.

> `npm run dev` is recommended because it runs a local preview server and avoids file URL restrictions.

---

## Deployment

### GitHub Pages

1. Create a new GitHub repository
2. Push the `SkillForge` folder contents to the repo
3. Go to **Settings → Pages → Source → Deploy from branch**
4. Select `main` branch, `/ (root)` folder
5. Your site will be live at `https://<username>.github.io/<repo-name>/`

### Netlify

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the `SkillForge` folder onto the deploy area
3. Site goes live instantly with a custom URL

### Vercel

```bash
npm i -g vercel
cd SkillForge
vercel
```

Follow the prompts — no build step required (static site).

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Uses modern CSS (`backdrop-filter`, `clamp()`, CSS Grid) and JavaScript (ES6 modules via IIFE, IntersectionObserver).

---

## License

This project was created as an original academic/portfolio submission. Feel free to use and modify for learning purposes.

---

## Author

Built as a portfolio-worthy frontend project demonstrating modern web development practices without frameworks.

**SkillForge** — *Forge Your Skills. Showcase Your Future.*
