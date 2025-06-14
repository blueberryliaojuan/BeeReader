const express = require("express");
const router = express.Router();
const userController = require("../../controllers/userController");

// About Page Route
router.get("/", (req, res) => res.send("Welcome to User Page!"));
router.post("/", (req, res) => res.send("Meet the Team"));

module.exports = router;
