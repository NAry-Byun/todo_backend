const Task = require("./model/Task");

const taskController = {};

taskController.creatTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
    await newTask.save();
    res.status(200).json({ status: "ok", data: newTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const tasklist = await Task.find({}).select("-__v"); 
    res.status(200).json({ status: "ok", data: tasklist });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { task, isComplete },
      { new: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "ok", data: updatedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }
    res.status(200).json({ status: "ok", data: deletedTask });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

taskController.toggleAllTasks = async (req, res) => {
  try {
    const { isComplete } = req.body;
    await Task.updateMany({}, { isComplete }); 
    const updatedTasks = await Task.find({});
    res.status(200).json({ status: "ok", data: updatedTasks });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err });
  }
};

module.exports = taskController;