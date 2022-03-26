require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.REMOTE_HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

pool.on("connect", () => {
  console.log("Connected!");
});

module.exports = { pool };
