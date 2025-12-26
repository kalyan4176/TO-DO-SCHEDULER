const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String, // Format: "HH:mm"
    },
    endTime: {
        type: String, // Format: "HH:mm"
    },
    isImportant: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    progress: {
        type: Number, // 0 to 100
        default: 0,
        min: 0,
        max: 100,
    }
}, {
    timestamps: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
