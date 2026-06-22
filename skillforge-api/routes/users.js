

const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser');
const { readData, writeData, generateId } = require('../utils/jsonStore');

const DATA_FILE = 'users.json';


router.get('/', async (req, res, next) => {
  try {
    const users = await readData(DATA_FILE);

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error) {
    next(error);
  }
});


router.post('/', validateUser, async (req, res, next) => {
  try {
    const users = await readData(DATA_FILE);
    const { name, email, role } = req.validatedUser;

    
    const emailExists = users.some((u) => u.email === email);
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: email already registered',
      });
    }

    const newUser = {
      id: generateId(),
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeData(DATA_FILE, users);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
