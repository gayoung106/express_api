require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // 환경 변수로 설정된 호스트
  user: process.env.DB_ACCOUNT, // 환경 변수로 설정된 사용자명
  password: process.env.DB_PASSWORD, // 환경 변수로 설정된 비밀번호
  database: "api", // 환경 변수로 설정된 데이터베이스 이름
});

connection.connect((err) => {
  if (err) {
    console.error("Error MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL", connection.threadId);
});

module.exports = connection;
