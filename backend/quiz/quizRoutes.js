const express = require('express');
const router = express.Router();
const Question = require('./questionModel.js');
const Quiz = require('./quizModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const Level = require('../game/levelModel.js');
const User = require('../user/userModel.js');
const fs = require('fs');
const Progress = require('../game/progressModel.js');
require('dotenv').config();

router.get('/quiz/questions', authMiddleware.authenticate, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

router.delete('/quiz/questions/:id', authMiddleware.authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Question.findByIdAndDelete(id);
    if (result) {
      res.json({ success: true });
    } else {
      res.json({ success: false, msg: 'Question not found' });
    }
  } catch (error) {
    console.error('Failed to delete question:', error);
    res.status(500).json({ success: false, msg: 'Failed to delete question' });
  }
});

router.post('/quiz/questions/add', authMiddleware.authenticate, async (req, res) => {
  try {
    const { question, options, algorithm } = req.body;
    const answer = options.map((option) => {
      return {
        isCorrect: option.isCorrect,
        value: option.value,
      };
    });
    const newQuestion = new Question({
      question: question,
      answers: answer,
      algorithm_name: algorithm,
    });

    await newQuestion.save();

    res.status(201).json({ success: true, message: 'Question added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error adding the question' });
  }
});

router.get('/quiz/quiz', authMiddleware.authenticate, async (req, res) => {
  try {
    const completedLevels = await Progress.find({ user_id: req._id, is_complete: true });
    const algorithmNames = completedLevels.map(level => level.algo);
    const randomQuestions = await Question.aggregate([
      { $match: { algorithm_name: { $in: algorithmNames } } },
      { $sample: { size: 10 } }
    ]);

    console.log(randomQuestions);

    res.json(randomQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/quiz/evaluate', authMiddleware.authenticate, async (req, res) => {
  try {
    const userRole = req.role;
    const userId = req._id;
    const user = await User.findOne({ _id: userId });

    if (userRole !== 'user') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { questions, answers, timeSpent } = req.body;

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid questions or answers format' });
    }

    // console.log('Question IDs:', questions);
    const questionDocuments = await Question.find({ _id: { $in: questions } });
    // console.log('Question documents:', questionDocuments);
    let score = 0;
    let correct = 0;
    const results = [];
    let select = null;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const selectedAnswerId = answers[i];

      // Find the corresponding question document
      const questionDocument = questionDocuments.find(doc => doc._id.toString() === question);
      // console.log('Question document:', questionDocument);
      if (!questionDocument) {
        return res.status(400).json({ message: 'Invalid question ID' });
      }

      const selectedAnswer = questionDocument.answers.find((answer) => answer._id.toString() === selectedAnswerId);
      // console.log('Selected answer:', selectedAnswer);
      let isCorrect = false;

      if (selectedAnswer) {
        isCorrect = selectedAnswer.isCorrect;
        // console.log(`Question: ${questionDocument.question}`);
        // console.log(`Selected Answer: ${selectedAnswer.value}`);
        // console.log(`Is Correct: ${isCorrect}`);
      }
      //  else {
      //   console.log(`Question: ${questionDocument.question}`);
      //   console.log('Selected Answer: Not answered');
      //   console.log('Is Correct: N/A');
      // }

      if (isCorrect) {
        correct++;
      }
      select = selectedAnswer ? selectedAnswer.value : 'Not answered';
      results.push({
        question: questionDocument.question,
        selected_answer: selectedAnswer ? selectedAnswer.value : 'Not answered',
        correct_answer: isCorrect ? 'Correct' : 'Incorrect',
        correct_answer_text: questionDocument.answers.find((answer) => answer.isCorrect).value,
      });
    }

    score = Math.ceil(10 * (((300 - timeSpent) / 300) / 2 + (correct / 10) / 2));

    const quiz = new Quiz({
      user: req._id,
      questions: questionDocuments.map((doc) => doc.question),
      correct_answer: correct,
      timeRequired: timeSpent,
      points: score,
    });
    user.coins += Math.ceil(score);
    await user.save();

    await quiz.save();

    // Update user's reward points (you need to have the User model defined)
    // const userReward = await User.findByIdAndUpdate(user._id, {
    //   $inc: { points: score },
    // });

    const pdfDocument = new PDFDocument();
    pdfDocument.pipe(fs.createWriteStream('quiz_result.pdf'));

    //   pdfDocument.registerFont('customFont', './DaPandora-Regular.otf');
    // pdfDocument.font('customFont')
    pdfDocument
      .fontSize(20)
      .text('Quiz Result', { align: 'center' })
      .moveDown(1);

    // Loop through the results
    results.forEach((result, index) => {
      pdfDocument
        .fontSize(14)
        .text(`Question ${index + 1}: ${result.question}`)
        .fontSize(12)
        .text(`Selected Answer: ${result.selected_answer}`)
        .fontSize(12)
        .text(`Correct Answer: ${result.correct_answer_text}`)
        .fontSize(12)
        .text(`Result: ${result.correct_answer}`)
        .moveDown(1);
    });

    pdfDocument.moveDown(2);

    // Add a footer with the total score
    pdfDocument
      .fontSize(16)
      .text(`Total Score: ${score}`, { align: 'center' });

    pdfDocument.end();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'spl2bsse12@gmail.com',
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: 'spl2bsse12@gmail.com',
      to: req.email,
      subject: 'Quiz Result',
      text: 'Please see the attached quiz result.',
      attachments: [
        {
          filename: 'quiz_result.pdf',
          content: fs.createReadStream('quiz_result.pdf'),
        },
      ],
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      // console.log('Email sent:', info.response);
      res.status(200).json({ score, correct, incorrect: 10 - correct, results });
    });

    // Clean up - delete the generated PDF
    fs.unlink('quiz_result.pdf', (err) => {
      if (err) {
        console.error(err);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during quiz evaluation' });
  }
});

module.exports = router;