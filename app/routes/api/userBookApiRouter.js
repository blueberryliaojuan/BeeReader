const express = require("express");
const userBookApiRouter = express.Router();
const userBookController = require("../../controllers/userBookController");

// get user's reading list
userBookApiRouter.get("/", userBookController.getUserReadingList);

//add To ReadingList
userBookApiRouter.post("/", userBookController.addToReadingList);

//remove From ReadingList
userBookApiRouter.delete("/:bookId", userBookController.removeFromReadingList);

module.exports = userBookApiRouter;
