# SkillForge API

**AI-Powered Student Career & Portfolio Platform — REST API**

A Node.js + Express.js backend for SkillForge. It provides REST endpoints for users, projects, skills, internships, and AI-inspired career recommendations. Data is stored in JSON files — no database required.

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework & routing |
| **CORS** | Cross-origin requests from frontend |
| **dotenv** | Environment variable management |
| **JSON files** | Lightweight file-based storage |

---

## Project Structure

```
skillforge-api/
│
├── server.js              # App entry point
├── package.json
├── .env                   # Environment variables
│
├── routes/
│   ├── users.js           # User CRUD endpoints
│   ├── projects.js        # Project endpoints
│   ├── skills.js          # Skill tracking endpoints
│   ├── internships.js     # Internship listings
│   └── recommendations.js # AI mock recommendations
│
├── middleware/
│   ├── validateUser.js    # User input validation
│   ├── validateProject.js # Project input validation
│   ├── validateSkill.js   # Skill input validation
│   └── errorHandler.js    # Global error handler
│
├── utils/
│   └── jsonStore.js       # JSON file read/write helpers
│
├── data/
│   ├── users.json
│   ├── projects.json
│   ├── skills.json
│   ├── internships.json
│   └── recommendations.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
cd skillforge-api
npm install
```

### Environment Variables

Create or edit `.env` in the project root:

```env
PORT=3000
NODE_ENV=development
```

### Run the Server

```bash
# Production mode
npm start

# Development mode (auto-restart on file changes)
npm run dev
```

The API will be available at:

```
http://localhost:3000
```

---

## API Endpoints

### Base URL

```
http://localhost:3000
```

### Response Format

**Success:**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {}
}
```

**Error:**

```json
{
  "success": false,
  "message": "Validation failed: email is required"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK — Request succeeded |
| `201` | Created — Resource created |
| `400` | Bad Request — Validation failed |
| `404` | Not Found — Route does not exist |
| `500` | Internal Server Error |

---

## Endpoints Reference

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info and available endpoints |

---

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |

**POST Body:**

```json
{
  "name": "Yug Gupta",
  "email": "yug@example.com",
  "role": "Student"
}
```

**Validation:**
- `name` — required
- `email` — required, valid email format
- `role` — optional (defaults to `"Student"`)

---

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create a new project |

**POST Body:**

```json
{
  "title": "SkillForge Frontend",
  "category": "Web Development",
  "description": "Responsive student portfolio platform"
}
```

**Validation:**
- `title` — required
- `category` — required
- `description` — required

---

### Skills

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | Get all skills |
| POST | `/api/skills` | Add a new skill |

**POST Body:**

```json
{
  "name": "JavaScript",
  "level": 85
}
```

**Validation:**
- `name` — required
- `level` — required, number between 0 and 100

---

### Internships

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/internships` | Get all internships |
| POST | `/api/internships` | Add a new internship |

**POST Body:**

```json
{
  "company": "Google",
  "role": "Frontend Intern",
  "location": "Remote"
}
```

**Validation:**
- `company` — required
- `role` — required
- `location` — required

---

### AI Recommendations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recommendations` | Get mock AI career recommendations |

Returns personalized suggestions based on skills stored in `skills.json`.

**Example Response:**

```json
{
  "success": true,
  "message": "Recommendations generated successfully",
  "data": [
    {
      "title": "Learn React",
      "reason": "Based on your JavaScript progress"
    },
    {
      "title": "Apply for Internships",
      "reason": "Your skill average suggests you are ready for real-world experience"
    }
  ]
}
```

---

## Postman Testing Guide

Import these examples into [Postman](https://www.postman.com/) to test all endpoints.

### 1. Health Check

```
GET http://localhost:3000/
```

Expected: `200 OK` with API info.

---

### 2. Get All Users

```
GET http://localhost:3000/api/users
```

Expected: `200 OK` with array of users.

---

### 3. Create User (Success)

```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Yug Gupta",
  "email": "yug.new@example.com",
  "role": "Student"
}
```

Expected: `201 Created`

---

### 4. Create User (Validation Error)

```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "",
  "email": "not-an-email"
}
```

Expected: `400 Bad Request`

---

### 5. Get All Projects

```
GET http://localhost:3000/api/projects
```

Expected: `200 OK` with array of projects.

---

### 6. Create Project

```
POST http://localhost:3000/api/projects
Content-Type: application/json

{
  "title": "SkillForge Frontend",
  "category": "Web Development",
  "description": "Responsive student portfolio platform"
}
```

Expected: `201 Created`

---

### 7. Get All Skills

```
GET http://localhost:3000/api/skills
```

Expected: `200 OK` with array of skills.

---

### 8. Create Skill

```
POST http://localhost:3000/api/skills
Content-Type: application/json

{
  "name": "JavaScript",
  "level": 85
}
```

Expected: `201 Created`

---

### 9. Create Skill (Invalid Level)

```
POST http://localhost:3000/api/skills
Content-Type: application/json

{
  "name": "React",
  "level": 150
}
```

Expected: `400 Bad Request` — level must be between 0 and 100.

---

### 10. Get All Internships

```
GET http://localhost:3000/api/internships
```

Expected: `200 OK` with array of internships.

---

### 11. Create Internship

```
POST http://localhost:3000/api/internships
Content-Type: application/json

{
  "company": "Google",
  "role": "Frontend Intern",
  "location": "Remote"
}
```

Expected: `201 Created`

---

### 12. Get AI Recommendations

```
GET http://localhost:3000/api/recommendations
```

Expected: `200 OK` with array of recommendation objects.

---

### 13. Route Not Found

```
GET http://localhost:3000/api/unknown
```

Expected: `404 Not Found`

---

## Connecting to the Frontend

The SkillForge frontend runs on port `5000` (via `npm run dev` in the root folder). CORS is enabled on this API, so you can fetch data from the frontend like this:

```javascript
// Example: fetch projects from the SkillForge frontend
fetch('http://localhost:3000/api/projects')
  .then((res) => res.json())
  .then((result) => {
    if (result.success) {
      console.log(result.data);
    }
  });
```

Run both servers simultaneously:

```bash
# Terminal 1 — Frontend (from project root)
npm run dev

# Terminal 2 — Backend (from skillforge-api/)
npm start
```

---

## Architecture Notes

- **Modular routes** — Each resource has its own route file mounted in `server.js`.
- **Validation middleware** — Input is validated before reaching route handlers.
- **Error handler** — A single middleware catches and formats all errors.
- **JSON storage** — `utils/jsonStore.js` handles async file I/O with `fs.promises`.
- **No database** — Ideal for demos, prototypes, and internship portfolio projects.

---

## Author

**Yug Gupta** — SkillForge Full Stack Development Project

*Forge Your Skills. Showcase Your Future.*
