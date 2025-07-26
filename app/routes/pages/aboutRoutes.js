const express = require("express");
const aboutRouter = express.Router();

// About Page
aboutRouter.get("/", (req, res) => {
  res.render("about", { title: "About Page" });
});

module.exports = aboutRouter;
