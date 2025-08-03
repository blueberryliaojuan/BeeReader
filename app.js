/**
 * @file server.js
 * @description Main Express server for BeeReader web application.
 *              Sets up view engine, middleware, session, routes, and launches the server.
 * @author Juan Liao
 * @created 2025-06-09
 */
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

//only use this is to create table and init data at the first launch
// require("./initDB");
/* ============================================================================
   View Engine Configuration (EJS)
============================================================================ */
// Set EJS as the templating engine
app.set("view engine", "ejs");

// Set the directory where view templates are stored
app.set("views", path.join(__dirname, "views"));

/* ============================================================================
   Basic Routing
============================================================================ */
// Redirect root URL to the login page
// This route should be declared before any static file or middleware handling
app.get("/", (req, res) => {
  res.redirect("/login");
});

/* ============================================================================
   CORS (Cross-Origin Resource Sharing)
============================================================================ */
const cors = require("cors");
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin, // Allow requests from frontend dev server
    credentials: true, // Allow cookies/session to be sent cross-origin
  })
);

/* ============================================================================
   Session Management
============================================================================ */
const session = require("express-session");
app.use(
  session({
    secret: "my-secret-key", // Used to sign the session ID cookie
    saveUninitialized: false, // Do not save session until something is stored
    resave: false, // Avoid resaving unchanged sessions
    cookie: {
      maxAge: 1000 * 60 * 3, // Session valid for 30 mins
      httpOnly: true, // Prevent client-side JS from accessing the cookie
      secure: false, // Set to true if using HTTPS
      sameSite: "lax", // Prevent CSRF while allowing basic navigation
    },
  })
);

/* ============================================================================
   Built-in Express Middleware
============================================================================ */
// Parse incoming JSON payloads
app.use(express.json());

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

/* ============================================================================
   Other Third-Party Middleware
============================================================================ */
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // Parses cookies into req.cookies

const logger = require("morgan");
app.use(logger("dev")); // Logs HTTP requests to the console

// const createError = require("http-errors"); // Error generation utility

/* ============================================================================
   Routing
============================================================================ */
// Load all routes (index.js under ./app/routes will handle routing setup)
require("./app/routes/index.js")(app);

/* ============================================================================
   Server Startup
============================================================================ */

/**
 * @function printBeeReader
 * @description Prints an ASCII-style logo for BeeReader to the terminal.
 *              For aesthetic branding on server launch.
 */
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

// Launch the server on defined port
app.listen(PORT, () => {
  printBeeReader();
  console.log("====================================");
  // console.log(`🐝🐝🐝🐝🐝 Server is running on http://localhost:${PORT}`);
  console.log(`🐝🐝🐝🐝🐝 Server is running on port ${PORT}`);
  console.log("====================================");
});
