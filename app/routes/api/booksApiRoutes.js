const upload = require("../../../utils/storage.js");

const bookController = require("../../controllers/bookController");
const express = require("express");
const bookRouter = express.Router();

// Create a new book (with optional cover image upload)
bookRouter.post("/", upload.single("cover"), bookController.createBook); // POST /books

// bookRouter.get("/", bookController.getAllBooks); // GET /books
bookRouter.get("/", bookController.searchBook); // GET /books
bookRouter.get("/:id", bookController.getBookById); // GET /books/:id
bookRouter.put("/:id", upload.single("cover"), bookController.updateBook); // PUT /books/:id
bookRouter.delete("/:id", bookController.deleteBook); // DELETE /books/:id

module.exports = bookRouter;
