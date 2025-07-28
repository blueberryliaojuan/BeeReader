const dbPool = require("../../config/dbConfig.js");
const { v4: uuidv4 } = require("uuid");

const bookService = {
  createBook(data) {
    //id, title,author,year should not be null
    // Ensure mandatory fields are not null
    const SQL =
      "INSERT INTO books (id, title, author, year, genre, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    const id = uuidv4();
    const { title, author, year, genre, image_url } = data;

    const parameters = [
      id,
      title,
      author,
      parseInt(year, 10),
      genre || null,
      image_url || null,
    ];
    console.log("parameters", parameters);
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) return reject(err);
        resolve({ id, ...data });
      });
    });
  },

  getAllBooks() {
    const SQL = "SELECT * FROM books WHERE is_deleted = 0";
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, [], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  getBookById(id) {
    const SQL = "SELECT * FROM books WHERE id = ? AND is_deleted = 0";
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, [id], (err, results) => {
        if (err) {
          reject(err);
        }
        console.log("results", results);
        resolve(results.length ? results[0] : null);
      });
    });
  },

  updateBook(id, data) {
    const SQL =
      "UPDATE books SET title=?, author=?, year=?, genre=?, image_url=? WHERE id=?";

    const { title, author, year, genre, image_url } = data;
    const parameters = [title, author, year, genre, image_url, id];
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  deleteBook(id) {
    // Logic to delete a book by ID
    //const SQL = "DELETE FROM books where id=?"; // DELETE does not need "*"
    //soft delete
    const SQL =
      "UPDATE books SET is_deleted = TRUE, deleted_at = NOW() WHERE id = ?";
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, [id], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};

module.exports = bookService;
