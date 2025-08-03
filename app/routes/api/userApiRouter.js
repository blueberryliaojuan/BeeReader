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
const { body } = require("express-validator");

const multer = require("multer");
const upload = multer(); // Middleware to parse multipart/form-data without storing files

//import customized middleware
const handleValidationErrors = require("../../../middlewares/validationHandler.js");

// validation rules
const loginValidationRules = [
  body("email").isEmail().withMessage("please enter correct email"),
  body("password").notEmpty().withMessage("password is needed"),
];
const registrationValidationRules = [
  body("email").isEmail().withMessage("please enter correct email"),
  body("password").notEmpty().withMessage("password is needed"),
  body("username").notEmpty().withMessage("username can not be empty"),
];

// User login: expects form data, no file upload
userApiRouter.post(
  "/signin",
  upload.none(),
  loginValidationRules,
  handleValidationErrors,
  userController.verifyLoginCredentials
);

// User registration: expects form data, no file upload
userApiRouter.post(
  "/signup",
  upload.none(),
  registrationValidationRules,
  handleValidationErrors,
  userController.createUser
);

// Email availability check: expects JSON or form data
userApiRouter.post(
  "/checkEmailAvailability",
  body("email").isEmail().withMessage("please enter correct email"),
  handleValidationErrors,
  userController.checkEmailAvailability
);

//update profile
userApiRouter.post(
  "/updateProfile/:id",
  upload.single("picture"),
  userController.updateProfile
);

//log out
userApiRouter.get("/logout", userController.logOut);

module.exports = userApiRouter;
