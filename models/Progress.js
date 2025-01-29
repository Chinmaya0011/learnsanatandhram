const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    completedLevels: {
        type: [Number],
        default: [],
    },
});

const Progress = mongoose.model('Progress', ProgressSchema); 

module.exports = Progress;
