const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("addNewBook", {
    title: "addNewBook Page",
    data: { title: "add a new book" },
  });
});

module.exports = router;
