const Task = require('../models/taskModel');

// @desc    Get all tasks for a user (optionally filtered by date range)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = { userId: req.user._id };

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            };
        }

        const tasks = await Task.find(query).sort({ date: 1, startTime: 1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    const { title, description, date, startTime, endTime, isImportant } = req.body;

    if (!title || !date) {
        res.status(400).json({ message: 'Title and Date are required' });
        return;
    }

    try {
        const task = await Task.create({
            userId: req.user._id,
            title,
            description,
            date,
            startTime,
            endTime,
            isImportant,
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Ensure user owns the task
        if (task.userId.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }

        // Ensure user owns the task
        if (task.userId.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'User not authorized' });
            return;
        }

        await task.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
