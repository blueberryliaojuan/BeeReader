// Import page routes
const loginRoutes = require("./pages/loginRoutes");
const libraryRoutes = require("./pages/libraryRoutes");
const readingListRoutes = require("./pages/readingListRoutes");
const addNewBookRoutes = require("./pages/addNewBookRoutesRoutes");
const editBookRoutes = require("./pages/editBookRoutes");

// Import API routes
const userApiRoutes = require("./api/userApiRoutes");
const bookApiRoutes = require("./api/booksApiRoutes");
const userApiRouter = require("./api/userApiRoutes");

module.exports = (app) => {
  // Mount page routes
  app.use("/login", loginRoutes);
  app.use("/readingList", readingListRoutes);
  app.use("/library", libraryRoutes);
  app.use("/addNewBook", addNewBookRoutes);
  app.use("/editBook", editBookRoutes);

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
