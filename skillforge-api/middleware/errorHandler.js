

function errorHandler(err, req, res, next) {
  console.error('[Error]', err.message);

  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 && process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;
