const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

//view engin setup
app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
// Import routes
const homeRoutes = require("./app/routes/homeRoutes");
const aboutRoutes = require("./app/routes/aboutRoutes");
const userRoutes = require("./app/routes/userRoutes");
const bookRoutes = require("./app/routes/booksRoutes");
// Mount routes
app.use("/home", homeRoutes); // Mounts the router under "/home"
app.use("/about", aboutRoutes);
app.use("/user", userRoutes);
app.use("/books", bookRoutes);
//404
app.use((req, res, next) => {
  next(createError(404, "Page Not Found"));
});
//error handling
app.use((err, req, res, next) => {
  console.log("🙅", err);
  // set status code
  res.status(err.status || 500);
  // send back error info
  res.json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
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
