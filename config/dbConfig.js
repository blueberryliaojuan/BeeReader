//database
const mysql = require("mysql2");

/*
Connection Pool Mechanics:
Shared Connections: 
A pool has a fixed number of database connections created upfront (connectionLimit). 
These connections are shared among all incoming requests.
Efficient Reuse:
When you send a request, the pool assigns an available connection from the pool. 
If a connection is already in use, the request will wait until a connection becomes available.
Release After Use: 
After the query is executed, the connection is released back to the pool for reuse by another request.
*/
const dbPool = {
  pool: {},
  config: {
    host: "localhost",
    user: "beereader",
    password: "beereader",
    database: "beereader_dev",
    port: 8889, // default is 3306. while MAMP need port 8889 for MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  create() {
    console.log("====================================");
    console.log("📊 Database Pool is created");
    console.log("====================================");
    this.pool = mysql.createPool(this.config);
  },

  // Parameters:
  // 1. `sql` (String): A valid SQL statement to be executed.
  //    - Example: "SELECT * FROM books WHERE id = ?"
  // 2. `arr` (Array): An array containing the values to replace placeholders (`?`) in the SQL query.
  //    - Example: ["J.K. Rowling", 2000]
  //    - If no placeholders are used, pass an empty array: []
  // 3. `fn` (Function): A callback function that will be executed once the SQL query is completed.
  //    - The callback function accepts two parameters:
  //      - `err` (Object): Contains error details if the query fails; otherwise, `null`.
  //      - `results` (Array/Object): The data returned by the query (e.g., rows for a SELECT query or metadata for an INSERT query).
  //
  // This function:
  // - Establishes a connection to the database from the pool.
  // - Executes the provided SQL query with the specified parameters.
  // - Calls the callback function to handle errors or process results.
  // - Releases the connection back to the pool after execution.
  connection(sql, arr, fn) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error("❌❌❌ Fail to connect database:", err);
      } else {
        //connection initialization
        //this is logged only when a connection is successfully established
        //subsequent requests reuse those connections, and the log message won't appear
        console.log("✅✅✅ Database connection successful！");
      }
      //If no valid SQL statement is passed, the method won't execute the query, avoiding errors
      if (sql) connection.query(sql, arr, fn);
      // When you call connection.release(), you're not destroying the connection.
      // Instead, you're returning it to the pool, making it available for other queries.
      //By reusing connections, the pool avoids the overhead of creating and tearing down connections repeatedly, which saves resources and improves application performance.
      connection.release();
    });
  },
};

dbPool.create();
module.exports = dbPool;
