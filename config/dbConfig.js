/**
 * @file dbConfig.js
 * @description Database connection pool configuration and helper for BeeReader.
 *              Uses MySQL2's connection pool to manage efficient and reusable connections.
 * @author Juan Liao
 * @created 2025-06-09
 */
require("dotenv").config();

const mysql = require("mysql2");

/**
 * Connection Pool Mechanics:
 * - Shared Connections: Creates a fixed-size pool of DB connections (connectionLimit) shared among all requests.
 * - Efficient Reuse: Requests borrow a connection; if none available, they wait in queue.
 * - Automatic Release: Connections are returned to the pool after use, avoiding unnecessary reconnections.
 */

const dbPool = {
  pool: {},

  // Configuration for the MySQL database
  config: {
    // host: "localhost",
    // user: "beereader",
    // password: "beereader",
    // database: "beereader_dev",
    // port: 8889, // ⚠️ MAMP default port; adjust if using different environment
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0, // 0 means no limit for queued connections
  },

  /**
   * @function create
   * @description Initializes the connection pool using the defined config.
   *              Should be called once at application startup.
   */
  create() {
    console.log("====================================");
    console.log("📊 Database Pool is created");
    console.log("====================================");
    this.pool = mysql.createPool(this.config);
  },

  /**
   * @function connection
   * @description Executes an SQL query using a pooled connection.
   *              Automatically releases the connection back to the pool afterward.
   *
   * @param {string} sql - SQL query string with optional placeholders (e.g., "SELECT * FROM books WHERE id = ?")
   * @param {Array} arr - Array of values to safely inject into the SQL query
   * @param {Function} fn - Callback function to handle query result or error: (err, results) => {}
   *
   * @example
   * dbPool.connection("SELECT * FROM books WHERE id = ?", [1], (err, results) => {
   *   if (err) return console.error(err);
   *   console.log(results);
   * });
   */
  connection(sql, arr, fn) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error("❌ Fail to connect to database:", err);
        return fn(err);
      }
      console.log("✅✅✅ Database connection successful！");
      connection.query(sql, arr, (queryErr, results) => {
        connection.release();
        fn(queryErr, results);
      });
    });
  },
};

// Initialize pool on import
dbPool.create();

// Export for use in services/controllers
module.exports = dbPool;
