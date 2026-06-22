# SkillForge — Task 2

**AI-powered student career and project showcase platform** with an integrated frontend and REST API backend.

This repository is the Task 2 version of SkillForge, combining the static frontend pages with a Node.js/Express API in `skillforge-api`. The app enables portfolio browsing, skill tracking, internship discovery, and AI-inspired recommendations using API-driven data.

---

## Repository

- GitHub: `https://github.com/Yuggupta-max/Task---2--Yuggupta`
- Frontend: static HTML/CSS/JS in the repository root
- Backend: Express API in `skillforge-api`

---

## Quick Start

### Prerequisites

- Node.js v18 or newer
- npm

### Install Dependencies

```bash
cd "C:\Users\Yug Gupta\Downloads\SkillForge"
npm install
cd skillforge-api
npm install
```

### Run the App

Open two terminal windows.

1. Start the frontend server:

```bash
cd "C:\Users\Yug Gupta\Downloads\SkillForge"
npm run dev
```

2. Start the API server:

```bash
cd "C:\Users\Yug Gupta\Downloads\SkillForge\skillforge-api"
npm run dev
```

### Access the App

- Frontend: `http://localhost:5000`
- API: `http://localhost:3000`

---

## Features

- Responsive portfolio frontend with pages for dashboard, projects, skills, internships, profile, and contact
- Integrated REST API backend for users, projects, skills, internships, and recommendations
- Client-side dark/light mode with localStorage persistence
- Search and filter experience for projects and internship listings
- Form validation and accessible UI patterns
- Lightweight JSON-backed data storage for easy local development

---

## API Server

The backend is located in `skillforge-api`.

### Start the API

```bash
cd skillforge-api
npm run dev
```

### Default API URL

```text
http://localhost:3000
```

### Available Endpoints

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

## Project Structure

```
SkillForge/
├── index.html              # Landing page
├── dashboard.html          # Career dashboard with recommendations
├── projects.html           # Portfolio and project filtering
├── skills.html             # Skill tracking and progress display
├── internships.html        # Internship browsing and filters
├── profile.html            # User profile page
├── contact.html            # Contact form
├── css/
│   ├── style.css           # Core styles
│   └── responsive.css      # Responsive layout rules
├── js/
│   ├── main.js             # Shared frontend behavior
│   └── dashboard.js        # Dashboard-specific logic
├── assets/
│   ├── images/             # UI assets and illustrations
│   └── icons/              # Favicons and icons
├── package.json            # Frontend dev server config
├── README.md              # Project documentation
└── skillforge-api/         # Backend API service
    ├── package.json
    ├── server.js
    ├── routes/
    ├── middleware/
    ├── data/
    └── utils/
```

---

## Tech Stack

- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js, Express.js, CORS, dotenv
- Data storage: JSON files in `skillforge-api/data`
- Dev server: `serve` for frontend preview

---

## Backend Overview

The API serves JSON data and provides validation middleware for each resource.

### Routes

- `/api/users` — user records
- `/api/projects` — project portfolio data
- `/api/skills` — tracked skills data
- `/api/internships` — internship listings
- `/api/recommendations` — AI-inspired recommendation responses

### Validation

Requests to `POST` endpoints are validated in `skillforge-api/middleware` before saving.

---

## Running Locally

1. Install dependencies in both folders.
2. Start the frontend server at port `5000`.
3. Start the API server at port `3000`.
4. Open your browser at `http://localhost:5000`.

If the API port is busy, the backend will try `3001` and `3002` automatically.

---

## Notes

- This Task 2 repo is designed as a separate integrated app from Task 1.
- Use the root `index.html` and supporting pages with the `skillforge-api` backend for data.
- The backend uses file-based JSON storage, so changes persist locally without a database.

---

## Contact

If you need further updates or want this README tailored to specific deployment instructions, I can update it again.

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

**SkillForge** — *Forge Your Skills. Showcase Your Future.*
