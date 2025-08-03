/**
 * @file userService.js
 * @description Service module for user-related database operations:
 *              verifying users, checking email availability, and creating new users.
 * @created 2025-06-09
 */

const dbPool = require("../../config/dbConfig.js");
const { v4: uuidv4 } = require("uuid");

const userService = {
  /**
   * Verify user credentials by email.
   * @param {string} email - User email
   * @param {string} password - User password (should be hashed in real use)
   * @returns {Promise<Array>} Resolves with query results
   */
  verifyUser(email, password) {
    const SQL = "SELECT * FROM users WHERE email=?";
    const parameters = [email];

    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          return reject(err);
        } else return resolve(results);
      });
    });
  },

  /**
   * Check if the given email is available for registration.
   * @param {string} email - Email to check
   * @returns {Promise<boolean>} Resolves true if available, false if taken
   */
  checkEmailAvailability(email) {
    const SQL = "SELECT * FROM users WHERE email=?";
    const parameters = [email];

    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          return reject(err);
        } else return resolve(results.length === 0);
      });
    });
  },

  /**
   * Create a new user record.
   * @param {string} email - User email
   * @param {string} username - User name
   * @param {string} password - User password (should be hashed in real use)
   * @returns {Promise<Object>} Resolves with insertion results
   */
  createUser(email, username, password) {
    const id = uuidv4(); // Generate a unique user ID
    const SQL =
      "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)";
    const parameters = [id, username, email, password];

    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          return reject(err);
        } else return resolve(results);
      });
    });
  },

  updateProfile(id, data) {
    const sql = `
      UPDATE users
      SET username = ?, email = ?, phone = ?, address = ?, profile_picture = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const { username, email, phone, address, profile_picture } = data;
    const parameters = [username, email, phone, address, profile_picture, id];
    return new Promise((resolve, reject) => {
      dbPool.connection(SQL, parameters, (err, results) => {
        if (err) {
          return reject(err);
        } else return resolve(results);
      });
    });
  },
};

module.exports = userService;
