// 프론트에서 fetch 어쩌고 하는 주소 만들어주는 거! 한 주소당 하나의 기능
// RestApi

const express = require("express");
const router = express.Router();

const taskApi = require("./task.api");

router.use("/tasks", taskApi);

module.exports = router;
