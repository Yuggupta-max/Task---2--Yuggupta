

const express = require('express');
const router = express.Router();
const { readData, writeData, generateId } = require('../utils/jsonStore');

const DATA_FILE = 'internships.json';


function validateInternship(req, res, next) {
  const { company, role, location } = req.body;

  if (!company || typeof company !== 'string' || !company.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: company is required',
    });
  }

  if (!role || typeof role !== 'string' || !role.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: role is required',
    });
  }

  if (!location || typeof location !== 'string' || !location.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: location is required',
    });
  }

  req.validatedInternship = {
    company: company.trim(),
    role: role.trim(),
    location: location.trim(),
  };

  next();
}


router.get('/', async (req, res, next) => {
  try {
    const internships = await readData(DATA_FILE);

    res.status(200).json({
      success: true,
      message: 'Internships fetched successfully',
      data: internships,
    });
  } catch (error) {
    next(error);
  }
});


router.post('/', validateInternship, async (req, res, next) => {
  try {
    const internships = await readData(DATA_FILE);
    const { company, role, location } = req.validatedInternship;

    const newInternship = {
      id: generateId(),
      company,
      role,
      location,
      createdAt: new Date().toISOString(),
    };

    internships.push(newInternship);
    await writeData(DATA_FILE, internships);

    res.status(201).json({
      success: true,
      message: 'Internship created successfully',
      data: newInternship,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
