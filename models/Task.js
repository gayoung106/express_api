const mysql = require("mysql2");

const Schema = mysql.Schema;

const taskSchema = Schema(
  {
    task: { type: String, required: true },
    isComplete: { type: Boolean, require: true, default: false },
  },
  { timestamps: true }
);

const Task = mysql.model("Task", taskSchema);
module.exports = Task;
