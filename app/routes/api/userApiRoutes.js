const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/userController");

const multer = require("multer");
const upload = multer(); // Use multer for handling multipart/form-data, but not storing files
//when not storing files, use .none() to avoid file handling

// login
userRouter.post(
  "/signin",
  upload.none(),
  userController.verifyLoginCredentials
);

// register
userRouter.post("/signup", upload.none(), userController.createUser);
userRouter.post(
  "/checkEmailAvailability",
  userController.checkEmailAvailability
);

module.exports = userRouter;
