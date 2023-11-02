const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  level_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  is_complete: {
    type: Boolean,
    default: false,
  },
  best_time: {
    type: Number,
    default: 0,
  },
  best_score: {
    type: Number,
    default: 0,
  },
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;