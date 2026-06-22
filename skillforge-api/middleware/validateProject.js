

function validateProject(req, res, next) {
  const { title, category, description } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: title is required',
    });
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: category is required',
    });
  }

  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: description is required',
    });
  }

  req.validatedProject = {
    title: title.trim(),
    category: category.trim(),
    description: description.trim(),
  };

  next();
}

module.exports = validateProject;
