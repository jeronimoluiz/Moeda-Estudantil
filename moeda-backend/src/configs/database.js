const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.LOCALHOST,
  port: process.env.PORTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

module.exports = connection;