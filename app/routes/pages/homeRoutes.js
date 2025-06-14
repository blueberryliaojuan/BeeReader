const express = require("express");
const router = express.Router();

// Example: Home Page
router.get("/", (req, res) => {
  res.render("🏠home", { title: "Home Page" });
});

module.exports = router;
