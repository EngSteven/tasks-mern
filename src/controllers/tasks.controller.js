import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
    const tasks = await Task.find().populate('user');
    res.json(tasks);
}

export const getUserTasks = async (req, res) => {
    const tasks = await Task.find(
        { user: req.user.id }
    ).populate('user');
    res.json(tasks);
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
}

export const createTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTasks = new Task({
        title,
        description,
        date,
        user: req.user.id
    });
    const savedTask = await newTasks.save();
    res.json(savedTask);
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    return res.sendStatus(204);
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); // new: true para que devuelva el objeto actualizado
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
}





