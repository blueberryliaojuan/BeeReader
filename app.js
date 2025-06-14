const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

//view engin setup
// Set the view engine to ejs
app.set("view engine", "ejs");
// Set the views directory
app.set("views", path.join(__dirname, "views"));

// ******* Express Middlewares *******
app.use(express.json()); // parse JSON data
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data
app.use(express.static(path.join(__dirname, "public"))); // serve static files from the 'public' directory

// ******* Third Party Middlewares ******
// Enable CORS for all routes
const cors = require("cors");
app.use(cors());
//parse cookies from http requests and put them in req.cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // parse cookies
//logging all requests
const logger = require("morgan");
app.use(logger("dev")); // logging middleware
//handle errors
const createError = require("http-errors");

// ******* Routing *******
// Import page routes
const homeRoutes = require("./app/routes/pages/homeRoutes");
const aboutRoutes = require("./app/routes/pages/aboutRoutes");
// Import API routes
const userApiRoutes = require("./app/routes/api/userApiRoutes");
const bookApiRoutes = require("./app/routes/api/booksApiRoutes");
// Mount page routes under "/"
app.use("/home", homeRoutes); // Mounts the router under "/home"
app.use("/about", aboutRoutes);
// Mount API routes under "/api/"
app.use("/api/users", userApiRoutes);
app.use("/api/books", bookApiRoutes);
//404
app.use((req, res, next) => {
  if (req.path.startsWith("/api/")) {
    // For API routes, return a JSON response
    return res.status(404).json({ error: "API not found 🙅" });
  }
  // For page routes, render a 404 page
  res.status(404).render("404", { title: "Page Not Found 🙅" });
});

// Start the server
function printBeeReader() {
  const BeeReader = [
    "█████╗  ███████╗███████╗██████╗ ███████╗ █████╗ █████╗  ███████╗██████╗ ",
    "██╔══██╗██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗",
    "██████╔╝█████╗  █████╗  ██████╔╝█████╗  ███████║██║  ██║█████╗  ██████╔╝",
    "██╔══██╗██╔══╝  ██╔══╝  ██╔══██╗██╔══╝  ██╔══██║██║  ██║██╔══╝  ██╔══██╗",
    "██████╔╝███████╗███████╗██║  ██║███████╗██║  ██║█████╔╝ ███████╗██║  ██║",
    "╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚════╝  ╚══════╝╚═╝  ╚═╝",
  ];
  BeeReader.forEach((line) => console.log(line));
}
app.listen(PORT, () => {
  printBeeReader();
  console.log("====================================");
  console.log(`🐝🐝🐝🐝🐝 Server is running on http://localhost:${PORT}`);
  console.log("====================================");
});
