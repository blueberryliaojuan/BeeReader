// middlewares/validationHandler.js

const { validationResult } = require("express-validator");

/**
 * Middleware to handle validation errors from express-validator.
 *
 * If any validation errors are present, responds with status 400 and
 * a structured error message. Otherwise, proceeds to the next middleware.
 *
 * @function handleValidationErrors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      state: "0",
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};

module.exports = handleValidationErrors;
