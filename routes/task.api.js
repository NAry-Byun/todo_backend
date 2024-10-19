const express = require("express");
const taskController = require("../controller/task.controller");
const router = express.Router();

router.put("/toggle-all", taskController.toggleAllTasks);

router.post("/", taskController.creatTask);

router.get("/", taskController.getTask);

router.put("/:id", taskController.updateTask);

router.delete("/:id", taskController.deleteTask);

module.exports = router;