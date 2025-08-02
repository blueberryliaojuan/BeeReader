const express = require("express");
const addNewBookRouter = express.Router();

addNewBookRouter.get("/", (req, res) => {
  res.render("addNewBook", {
    title: "addNewBook Page",
    data: { title: "add a new book" },
  });
});

module.exports = addNewBookRouter;
