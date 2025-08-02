const express = require("express");
const loginRouter = express.Router();

// Login Page
loginRouter.get("/", (req, res) => {
  res.render("login", {
    title: "Login Page",
    data: { title: "Log in" },
  });
});
module.exports = loginRouter;
