const upload = require("../../../utils/storage.js");

const bookController = require("../../controllers/bookController.js");
const express = require("express");
const bookApiRouter = express.Router();

// Create a new book (with optional cover image upload)
bookApiRouter.post("/", upload.single("cover"), bookController.createBook); // POST /books

// bookApiRouter.get("/", bookController.getAllBooks); // GET /books
bookApiRouter.get("/", bookController.searchBook); // GET /books
bookApiRouter.get("/:id", bookController.getBookById); // GET /books/:id
bookApiRouter.put("/:id", upload.single("cover"), bookController.updateBook); // PUT /books/:id
bookApiRouter.delete("/:id", bookController.deleteBook); // DELETE /books/:id

module.exports = bookApiRouter;
