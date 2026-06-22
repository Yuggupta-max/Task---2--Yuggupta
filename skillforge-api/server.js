

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');


const usersRouter = require('./routes/users');
const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const internshipsRouter = require('./routes/internships');
const recommendationsRouter = require('./routes/recommendations');

const app = express();
const PORT = process.env.PORT || 3000;




app.use(cors());


app.use(express.json());


if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });
}




app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to SkillForge API',
    data: {
      version: '1.0.0',
      endpoints: {
        users: '/api/users',
        projects: '/api/projects',
        skills: '/api/skills',
        internships: '/api/internships',
        recommendations: '/api/recommendations',
      },
    },
  });
});


app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/internships', internshipsRouter);
app.use('/api/recommendations', recommendationsRouter);



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});



app.use(errorHandler);



const startPort = parseInt(process.env.PORT, 10) || 3000;
const fallbackPorts = [startPort, startPort + 1, startPort + 2];
let currentIndex = 0;

function listenOnPort(port) {
  const server = app.listen(port, () => {
    console.log(`SkillForge API running on http://localhost:${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      currentIndex += 1;
      if (currentIndex < fallbackPorts.length) {
        console.warn(`Port ${port} is already in use. Trying port ${fallbackPorts[currentIndex]}...`);
        listenOnPort(fallbackPorts[currentIndex]);
        return;
      }
      console.error(`Ports ${fallbackPorts.join(', ')} are all in use. Set a different PORT in your environment or stop the process using these ports.`);
    } else {
      console.error('Server error:', err);
    }
    process.exit(1);
  });
}

listenOnPort(fallbackPorts[currentIndex]);

module.exports = app;
