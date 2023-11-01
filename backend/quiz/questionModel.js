const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  isCorrect: Boolean,
  value: String,
});

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answers: [answerSchema],
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
