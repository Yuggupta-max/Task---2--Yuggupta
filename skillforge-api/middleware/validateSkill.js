

function validateSkill(req, res, next) {
  const { name, level } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: skill name is required',
    });
  }

  const numericLevel = Number(level);

  if (level === undefined || level === null || Number.isNaN(numericLevel)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: level must be a number between 0 and 100',
    });
  }

  if (numericLevel < 0 || numericLevel > 100) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: level must be between 0 and 100',
    });
  }

  req.validatedSkill = {
    name: name.trim(),
    level: numericLevel,
  };

  next();
}

module.exports = validateSkill;
