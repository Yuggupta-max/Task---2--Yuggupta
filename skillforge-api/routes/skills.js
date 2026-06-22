

const express = require('express');
const router = express.Router();
const validateSkill = require('../middleware/validateSkill');
const { readData, writeData, generateId } = require('../utils/jsonStore');

const DATA_FILE = 'skills.json';


router.get('/', async (req, res, next) => {
  try {
    const skills = await readData(DATA_FILE);

    res.status(200).json({
      success: true,
      message: 'Skills fetched successfully',
      data: skills,
    });
  } catch (error) {
    next(error);
  }
});


router.post('/', validateSkill, async (req, res, next) => {
  try {
    const skills = await readData(DATA_FILE);
    const { name, level } = req.validatedSkill;

    const newSkill = {
      id: generateId(),
      name,
      level,
      updatedAt: new Date().toISOString(),
    };

    skills.push(newSkill);
    await writeData(DATA_FILE, skills);

    res.status(201).json({
      success: true,
      message: 'Skill created successfully',
      data: newSkill,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
