const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

// About Page Route
router.get("/", (req, res) => res.send("Welcome to About Page!"));
router.get("/team", (req, res) => res.send("Meet the Team"));

module.exports = router;
