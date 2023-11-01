const mongoose = require('mongoose');
const User = require('../user/userModel.js');

const quizSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with the actual name of your User model
    required: true,
  },
  questions: [String],
  correct_answer: Number,
  timeRequired: Number,
  points: Number,
  // coinAchieved: Number,
});

module.exports = mongoose.model('Quiz', quizSchema);
