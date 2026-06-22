

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUser(req, res, next) {
  const { name, email, role } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: name is required',
    });
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: email is required',
    });
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: email must be a valid email address',
    });
  }

  
  req.validatedUser = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role: role && typeof role === 'string' ? role.trim() : 'Student',
  };

  next();
}

module.exports = validateUser;
