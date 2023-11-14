const { Schema } = require('mongoose');

// task for one user
const taskSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    goal: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
    },
    challenges: {
        type: String,
        required: true,
    },
    rewards: {
        type: String,
        required: true,
    },
    toDo: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
});

module.exports = taskSchema;
