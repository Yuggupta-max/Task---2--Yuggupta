

const express = require('express');
const router = express.Router();
const validateProject = require('../middleware/validateProject');
const { readData, writeData, generateId } = require('../utils/jsonStore');

const DATA_FILE = 'projects.json';


router.get('/', async (req, res, next) => {
  try {
    const projects = await readData(DATA_FILE);

    res.status(200).json({
      success: true,
      message: 'Projects fetched successfully',
      data: projects,
    });
  } catch (error) {
    next(error);
  }
});


router.post('/', validateProject, async (req, res, next) => {
  try {
    const projects = await readData(DATA_FILE);
    const { title, category, description } = req.validatedProject;

    const newProject = {
      id: generateId(),
      title,
      category,
      description,
      createdAt: new Date().toISOString(),
    };

    projects.push(newProject);
    await writeData(DATA_FILE, projects);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
