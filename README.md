# 🚀 SkillForge Full Stack

### Task 2 – Frontend + Backend API Integration

SkillForge is a full-stack student career and portfolio platform that helps students showcase projects, track skills, explore internships, and receive AI-inspired career recommendations.

This project combines a responsive frontend built with HTML, CSS, and JavaScript with a RESTful backend API built using Node.js and Express.js.

---

## ✨ Features

### Frontend

- Responsive Landing Page
- Student Dashboard
- Project Portfolio Showcase
- Skill Tracking
- Internship Explorer
- Student Profile
- Contact Form
- Dark / Light Theme Toggle
- Search & Filter Functionality

### Backend API

- User Management
- Project Management
- Skill Management
- Internship Management
- AI-Inspired Recommendations
- Input Validation
- Error Handling Middleware
- JSON-Based Data Storage

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
├── data/
├── middleware/
├── routes/
├── utils/
│
├── index.html
├── dashboard.html
├── projects.html
├── skills.html
├── internships.html
├── profile.html
├── contact.html
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Yuggupta-max/Task---2--Yuggupta.git
cd Task---2--Yuggupta
```

---

# 🎨 Run Frontend

Open a new terminal and run:

```bash
npx live-server
```

Frontend URL:

```text
http://127.0.0.1:8080
```

---

# ⚙️ Run Backend API

Open another terminal in the same project folder and run:

```bash
npm install
npm start
```

Backend URL:

```text
http://localhost:3000
```

---

# 📡 API Endpoints

### Users

```http
GET  /api/users
POST /api/users
```

### Projects

```http
GET  /api/projects
POST /api/projects
```

### Skills

```http
GET  /api/skills
POST /api/skills
```

### Internships

```http
GET  /api/internships
POST /api/internships
```

### Recommendations

```http
GET /api/recommendations
```

---

# 🔗 Frontend & Backend Integration

The frontend communicates with the backend using REST APIs.

Example:

```javascript
fetch("http://localhost:3000/api/projects")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

Make sure both frontend and backend servers are running simultaneously.

---

# 🧪 API Testing

You can test API endpoints using:

- Postman
- Thunder Client
- Insomnia

Example:

```http
GET http://localhost:3000/api/projects
```

---

# 🎯 Learning Outcomes

This project demonstrates:

- Frontend Development
- Responsive Web Design
- REST API Development
- API Integration
- CRUD Operations
- Form Validation
- Error Handling
- Full Stack Development Concepts

---

# 🔮 Future Enhancements

- MongoDB Integration
- JWT Authentication
- Resume Builder
- File Upload Support
- Real AI Recommendations
- Cloud Deployment

---

# 👨‍💻 Author

### Yug Gupta

Task 2 – Full Stack Development Project

**SkillForge – Forge Your Skills. Showcase Your Future. 🚀**
**SkillForge** — *Forge Your Skills. Showcase Your Future.*
