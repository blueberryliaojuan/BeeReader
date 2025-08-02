const express = require("express");
const userApiRouter = express.Router();
const userController = require("../../controllers/userController");

const multer = require("multer");
const upload = multer(); // Use multer for handling multipart/form-data, but not storing files
//when not storing files, use .none() to avoid file handling

// login
userApiRouter.post(
  "/signin",
  upload.none(),
  userController.verifyLoginCredentials
);

// register
userApiRouter.post("/signup", upload.none(), userController.createUser);
userApiRouter.post(
  "/checkEmailAvailability",
  userController.checkEmailAvailability
);

module.exports = userApiRouter;
