// api별 용도 변경하기
// 1. 할 일 추가 post / tasks
// 2. 할 일 보여주기 get / tasks
// 3. 할 일 수정하기 put / tasks/:id
// 4. 할 일 삭제하기 delete /tasks/:id

const express = require("express");
const { createTask, getTasks } = require("../controllers/task.controller");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
// router.put("/:id", )
// router.delete("/:id", )

module.exports = router;
