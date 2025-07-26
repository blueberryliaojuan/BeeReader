// Import page routes
const loginRoutes = require("./pages/loginRoutes");
const homeRoutes = require("./pages/homeRoutes");
const aboutRoutes = require("./pages/aboutRoutes");
const addNewBookRoutes = require("./pages/addNewBookRoutesRoutes");

// Import API routes
const userApiRoutes = require("./api/userApiRoutes");
const bookApiRoutes = require("./api/booksApiRoutes");
const userApiRouter = require("./api/userApiRoutes");

module.exports = (app) => {
  // Mount page routes
  app.use("/login", loginRoutes);
  app.use("/home", homeRoutes);
  app.use("/addNewBook", addNewBookRoutes);
  app.use("/about", aboutRoutes);

  // Mount API routes
  app.use("/api/users", userApiRoutes);
  app.use("/api/books", bookApiRoutes);
  app.use("/api/users", userApiRouter);

  // 404 handler
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
      // For API routes, return a JSON response
      return res.status(404).json({ error: "API not found 🙅" });
    }
    // For page routes, render a 404 page
    res.status(404).render("404", { title: "Page Not Found 🙅" });
  });
};
