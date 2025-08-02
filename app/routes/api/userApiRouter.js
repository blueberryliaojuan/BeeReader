/**
 * @file userApiRouter.js
 * @description
 * Express API router for user authentication and registration-related endpoints.
 * Uses multer middleware to parse multipart/form-data without storing files.
 * Routes include user login, registration, and email availability check.
 *
 * Routes:
 *  POST /api/users/signin                 - User login with email and password verification
 *  POST /api/users/signup                 - Create a new user account (registration)
 *  POST /api/users/checkEmailAvailability - Check if an email is already registered
 */

const express = require("express");
const userApiRouter = express.Router();
const userController = require("../../controllers/userController");

const multer = require("multer");
const upload = multer(); // Middleware to parse multipart/form-data without storing files

// User login: expects form data, no file upload
userApiRouter.post(
  "/signin",
  upload.none(),
  userController.verifyLoginCredentials
);

// User registration: expects form data, no file upload
userApiRouter.post("/signup", upload.none(), userController.createUser);

// Email availability check: expects JSON or form data
userApiRouter.post(
  "/checkEmailAvailability",
  userController.checkEmailAvailability
);

userApiRouter.get("/logout", userController.logOut);

module.exports = userApiRouter;
