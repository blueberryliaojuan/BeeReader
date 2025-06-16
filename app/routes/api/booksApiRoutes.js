const express = require("express");
const multer = require("multer");
const path = require("path");
const bookController = require("../../controllers/bookController");

// Configure multer to store uploaded files in public/images
const storage = multer.diskStorage({
  //Multer will store uploaded files in the actual public/images directory.
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../../../public/images")),
  //Express will correctly serve any /images/... requests as static resources.
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

const router = express.Router();

// Create a new book (with optional cover image upload)
router.post("/", upload.single("cover"), bookController.createBook); // POST /books

router.get("/", bookController.getAllBooks); // GET /books
router.get("/:id", bookController.getBookById); // GET /books/:id
router.put("/:id", bookController.updateBook); // PUT /books/:id
router.delete("/:id", bookController.deleteBook); // DELETE /books/:id

module.exports = router;
