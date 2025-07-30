const express = require("express");
const userBookRouter = express.Router();
const userBookController = require("../../controllers/userBookController");

// get user's reading list
userBookRouter.get("/", userBookController.getUserReadingList);

//add To ReadingList
userBookRouter.post("/", userBookController.addToReadingList);

//remove From ReadingList
userBookRouter.delete("/:bookId", userBookController.removeFromReadingList);

module.exports = userBookRouter;
