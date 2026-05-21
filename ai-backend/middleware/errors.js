// Centralized error handler. Keeps OpenAI-specific error bodies out of the
// response so we don't leak internal details to clients.
export function errorHandler(err, req, res, _next) {
  const status = err.status && Number.isInteger(err.status) ? err.status : 500;
  if (status >= 500) {
    console.error(`[error] ${req.method} ${req.path}:`, err.message, err.body || '');
  }
  res.status(status).json({
    error: status >= 500 ? 'internal_error' : err.code || 'request_failed',
    message: status >= 500 ? 'Internal server error' : err.message,
  });
}

// Async wrapper so route handlers can throw / reject without try/catch.
export function asyncRoute(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
