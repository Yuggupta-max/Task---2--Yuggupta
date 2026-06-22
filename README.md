# 🚀 SkillForge Full Stack

### Task 2 – Frontend + Backend API Integration

SkillForge is a full-stack student career and portfolio platform that helps students showcase projects, track skills, explore internships, and receive AI-inspired career recommendations.

This project combines a responsive frontend with a RESTful backend API built using Node.js and Express.js.

---

## 🌟 Features

### Frontend

- Responsive Landing Page
- Student Dashboard
- Project Portfolio Showcase
- Skill Tracking
- Internship Explorer
- Profile Management
- Contact Form
- Dark / Light Theme
- Search & Filter Functionality

### Backend API

- User Management
- Project Management
- Skill Management
- Internship Management
- AI-Inspired Recommendations
- Input Validation
- Error Handling
- JSON File Storage

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6+)

### Backend

- Node.js
- Express.js
- CORS
- dotenv
- JSON File Storage

---

## 📂 Project Structure

```bash
Task---2--Yuggupta/
│
├── assets/
├── css/
├── js/
│
├── skillforge-api/
│   ├── data/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── index.html
├── dashboard.html
├── projects.html
├── skills.html
├── internships.html
├── profile.html
├── contact.html
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Yuggupta-max/Task---2--Yuggupta.git
cd Task---2--Yuggupta
```

---

## Frontend Setup

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5000
```

---

## Backend Setup

Open a new terminal:

```bash
cd skillforge-api
npm install
npm start
```

Backend URL:

```text
http://localhost:3000
```

---

# 📡 API Endpoints

## Users

```http
GET  /api/users
POST /api/users
```

## Projects

```http
GET  /api/projects
POST /api/projects
```

## Skills

```http
GET  /api/skills
POST /api/skills
```

## Internships

```http
GET  /api/internships
POST /api/internships
```

## Recommendations

```http
GET /api/recommendations
```

---

# 🧪 Testing APIs

You can test the API using:

- Postman
- Thunder Client
- Insomnia

Example:

```http
GET http://localhost:3000/api/projects
```

---

# 🔗 Frontend & Backend Integration

The frontend fetches data from the backend API.

Example:

```javascript
fetch("http://localhost:3000/api/projects")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Make sure both frontend and backend servers are running simultaneously.

---

# 🎯 Project Objectives

- Build a responsive frontend application
- Develop RESTful APIs using Express.js
- Implement CRUD operations
- Validate API requests
- Connect frontend with backend services
- Demonstrate full-stack development concepts

---

# 🔮 Future Improvements

- MongoDB Integration
- User Authentication (JWT)
- Resume Builder
- Real AI Recommendations
- Cloud Deployment
- File Upload Support

---

# 👨‍💻 Author

### Yug Gupta

Task 2 – Full Stack Development Project

**SkillForge – Forge Your Skills. Showcase Your Future. 🚀**

Built as a portfolio-worthy frontend project demonstrating modern web development practices without frameworks.

**SkillForge** — *Forge Your Skills. Showcase Your Future.*

**SkillForge** — *Forge Your Skills. Showcase Your Future.*
