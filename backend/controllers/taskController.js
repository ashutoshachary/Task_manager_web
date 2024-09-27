const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user_id: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      priority,
      due_date,
      user_id: req.user.id,
    });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user_id.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
  
      if (!task) return res.status(404).json({ msg: 'Task not found' });
  
      if (task.user_id.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });
  
      res.json({ msg: 'Task deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  };
  
  

exports.updateTask = async (req, res) => {
    const { status } = req.body;
    try {
      let task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ msg: 'Task not found' });
  
      if (task.user_id.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });
  
      task.status = status;
      task = await task.save();
      res.json(task);
    } catch (err) {
      res.status(500).send('Server error');
    }
  };
  