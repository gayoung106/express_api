# express_api

- express, mysql을 이용한 api만들기
## 패키지 설치
`npm i express mysql2 parser-body cors dotenv`
`npm i nodemon`

### 구조
#### mysql 연결
* db - connection.js
```js
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
```

#### routes만들기
1. index.js
- 프론트에서 fetch 요청할 때 endpoint 만드는 그런거!
```js
const express = require("express");
const router = express.Router();

const taskApi = require("./task.api");

router.use("/tasks", taskApi);

module.exports = router;

```
2. task.api.js
```js
// api별 용도 변경하기
const express = require("express");
const { createTask } = require("../controllers/task.controller");

const router = express.Router();

router.post("/", createTask);

module.exports = router;

```
3. index.js의 기능
- 만약에 다른 api를 추가하고 싶으면?
- ex. product.api.js를 만들어서 요청 url 설정하고 -> index.js에서 라우트 설정하면 됨

#### controller
- 해당 api의 기능 및 데이터를 정의해주는 것!
```js
const connection = require("../db/connection");

const taskController = {};

taskController.createTask = async (req, res) => {
  const { task, isComplete } = req.body;

  if (!task) {
    return res.status(400).json({ status: "fail", error });
  }

  const query = "INSERT INTO tasks (task, isComplete) VALUES (?, ?)";
  const values = [task, isComplete || false];

  connection.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).json({ status: "fail", error });
    }
    return res.status(200).json({
      status: "success",
      data: {
        id: results.insertId,
        task,
        isComplete,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  });
};

module.exports = taskController;

```

# 주의사항
> mysql에서 다른 라이브러리 없이 만드는 방법이기(ORM) 때문에 model은 따로 필요가 없음
- mysql2는 데이터베이스 스키마를 정의하는 기능이 없기 때문에, 데이터베이스와 상호작용할 때는 SQL 쿼리를 직접 작성

워크벤치에서 직접 쿼리 적어서 만들어줌

![image](https://github.com/user-attachments/assets/bf79f4fd-d45f-48e0-8b7e-cc96d5ea9df8)

포스트맨 요청

![image](https://github.com/user-attachments/assets/c1aff448-d822-47d7-a82f-4a13f5a88a46)

