/**
 * Authentication middleware to protect routes by verifying user login status.
 *
 * Checks if a valid user session exists. If authenticated, passes control to the next middleware or route handler.
 * If not authenticated, redirects the client to the login page.
 *
 * @param {Object} req - Express request object, contains session info.
 * @param {Object} res - Express response object, used to redirect if unauthorized.
 * @param {Function} next - Callback to pass control to the next middleware/handler.
 *
 */

module.exports = function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated; continue processing request
    return next();
  }
  // User not authenticated; redirect to login page
  return res.redirect("/login");
};
