const Task = require('../models/task');
const taskController = {};

// Create Task
taskController.createTask = async (req, res) => {
  try {
    const { task, isCompleted } = req.body;
    const newTask = new Task({ task, isCompleted });
    await newTask.save();
    res.status(201).json({ status: 'ok', data: newTask });
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// Get All Tasks
taskController.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ status: 'ok', data: tasks });
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Update Task
taskController.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new Error('Task not found');

    const fields = Object.keys(req.body);
    fields.forEach((field) => (task[field] = req.body[field]));
    await task.save();

    res.status(200).json({ status: 'success', data: task });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Delete Task
taskController.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) throw new Error('Task not found');

    res.status(200).json({ status: 'success', data: deletedTask });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

module.exports = taskController;
