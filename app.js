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

//  Redirect '/' to '/login'
//res.redirect("/") must be before all static and use()
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Enable CORS for all routes
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // my front end
    credentials: true, // allow cookie, this is important
  })
);

app.use(
  session({
    secret: "my-secret-key",
    saveUninitialized: false, //do not save empty
    resave: false, //if cookie is not set, then do not resave
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours,
      httpOnly: true, // JavaScript not allowed to change cookie, security
      secure: false, //if https, change to true
      sameSite: "lax",
    },
  })
);

// ******* Express Middlewares *******
app.use(express.json()); // parse JSON data
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data
app.use(express.static(path.join(__dirname, "public"))); // serve static files from the 'public' directory

// ******* Third Party Middlewares ******

//parse cookies from http requests and put them in req.cookies
const cookieParser = require("cookie-parser");
app.use(cookieParser()); // parse cookies
//logging all requests
const logger = require("morgan");
app.use(logger("dev")); // logging middleware
//handle errors
const createError = require("http-errors");

// ******* Routing *******
// Import and set up routes
require("./app/")(app);

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
