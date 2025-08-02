/**
 * @file bookService.js
 * @description Service module for managing book records: creation, retrieval, search, update, and soft deletion.
 * @created 2025-06-09
 */

const dbPool = require("../../config/dbConfig.js");
const { v4: uuidv4 } = require("uuid");

const bookService = {
  /**
   * Create a new book record.
   * @param {Object} data - Book data including title, author, year, genre, image_url
   * @returns {Promise<Object>} Resolves with the newly created book data including id
   */
  createBook(data) {
    // Validate mandatory fields (id, title, author, year should not be null)
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

  /**
   * Retrieve all books not marked as deleted.
   * @returns {Promise<Array>} Resolves with array of books
   */
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

  /**
   * Search for books by title or author.
   * @param {string} search - Search keyword
   * @returns {Promise<Array>} Resolves with matching book records
   */
  searchBook(search) {
    let SQL = "SELECT * FROM books WHERE is_deleted = 0";
    let parameters = [];

    if (search) {
      SQL += " AND (title LIKE ? OR author LIKE ?)";
      const keyword = `%${search}%`;
      parameters.push(keyword, keyword);
    }

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

  /**
   * Get a single book by its ID.
   * @param {string} id - Book ID
   * @returns {Promise<Object|null>} Resolves with the book object or null if not found
   */
  getBookById(id) {
    const SQL = "SELECT * FROM books WHERE id = ? AND is_deleted = 0";
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        console.log("results", results);
        resolve(results.length ? results[0] : null);
      });
    });
  },

  /**
   * Update book information by ID.
   * @param {string} id - Book ID
   * @param {Object} data - Updated book data
   * @returns {Promise<Object>} Resolves with the update operation results
   */
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

  /**
   * Soft delete a book by setting is_deleted flag and timestamp.
   * @param {string} id - Book ID
   * @returns {Promise<Object>} Resolves with the delete operation results
   */
  deleteBook(id) {
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
