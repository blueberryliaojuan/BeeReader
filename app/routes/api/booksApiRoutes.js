const express = require("express");
const bookController = require("../../controllers/bookController");
const router = express.Router();

router.post("/", bookController.createBook); // POST /books
router.get("/", bookController.getAllBooks); // GET /books
router.get("/:id", bookController.getBookById); // GET /books/:id
router.put("/:id", bookController.updateBook); // PUT /books/:id
router.delete("/:id", bookController.deleteBook); // DELETE /books/:id

module.exports = router;
