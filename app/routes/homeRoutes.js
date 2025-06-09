const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// console.log("🏠Home Routes Loaded");
// Home Page Route
router.get("/", homeController.getHomePage);
router.get("/contact", homeController.getContactInHomePage);

module.exports = router;
