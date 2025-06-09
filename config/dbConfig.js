//database
const mysql = require("mysql2");

const dbPool = {
  pool: {},
  config: {
    host: "localhost",
    user: "beeuser",
    password: "beeuser",
    database: "BeeReader",
    port: 8889, // MAMP default for MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
  create() {
    console.log("====================================");
    console.log("📊 Pool is created");
    console.log("====================================");
    this.pool = mysql.createPool(this.config);
  },
  connection(sql, arr, fn) {
    this.pool.getConnection((err, connection) => {
      if (err) {
        console.error("❌❌❌ Fail to connect database:", err);
      } else {
        console.log("✅✅✅ Database connection successful！");
      }
      //SQL语句，SQL参数，回调：执行完SQL语句后调用，把结果注入在回调函数的参数里面，作出响应
      if (SQL) connection.query(sql, arr, fn);
      connection.release(); //release connection
    });
  },
};

dbPool.create();
module.exports = dbPool;
