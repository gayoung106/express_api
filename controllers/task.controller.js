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

taskController.getTasks = (req, res) => {
  const query = "select * from tasks";

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
    return res.status(200).json({
      status: "success",
      data: results,
    });
  });
};

module.exports = taskController;
