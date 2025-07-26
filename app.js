const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const session = require("express-session");

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

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, httpOnly: true },
  })
);

// ******* Routing *******
// Import and set up routes
require("./app/routes")(app);

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
