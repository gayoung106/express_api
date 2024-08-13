const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_ACCOUNT,
  password: process.env.DB_PASSWORD,
  database: "api",
});

// simple query
connection.query("SELECT * FROM user", function (err, results, fields) {
  console.log(err);
  console.log(results); // results contains rows returned by server
  console.log(fields); // fields contains extra meta data about results, if available
});

const serverPort = process.env.PORT;
app.listen(serverPort, () => console.log("server ok"));
