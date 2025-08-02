const express = require("express");
const editBookRouter = express.Router();

editBookRouter.get("/:id", (req, res) => {
  const bookId = req.params.id;

  fetch(`http://localhost:3000/api/books/${bookId}`, { credentials: "include" })
    .then((res) => {
      return res.json(); // Parse the response into javaScript object format
    })
    .then((result) => {
      console.log("result", result);
      res.render("editBook", {
        title: "Edit Book Page",
        data: result.data,
      });
    })
    .catch((error) => {
      console.error("Failed to fetch books:", error);
    });
});

module.exports = editBookRouter;
