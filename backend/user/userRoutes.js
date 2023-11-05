const express = require('express');
const router = express.Router();
const User = require('./userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Theme = require('../customTheme/themeModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');
require('dotenv').config();
function sendResetEmail(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'spl2bsse12@gmail.com',
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: 'spl2bsse12@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    text: `You have requested to reset your password. Please click the following link to reset your password:\n\n
          http://localhost:3000/reset-password\n\nThis is the token you need to provide in the form:\n\n${resetToken}\n\n
           If you did not request this reset, please ignore this email.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function generateResetToken() {
  return crypto.randomBytes(16).toString('hex');
}


router.post('/user/register', async (req, res) => {
  try {
    // const { firstname, lastname, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    const hashed = await bcrypt.hash(req.body.password, salt);
    // console.log(hashed);

    const newTheme = new Theme({
      bgImagePath: '/path/to/theme/image.jpg',
      textColor: '#000000', // Converts 'black' to '#000000'
      buttonColor: '#808080', // Converts 'grey' to '#808080'
    });

    await newTheme.save()

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashed,
      role: "user",
      theme: newTheme._id,
    });
    // console.log(user);

    const result = await user.save();
    // console.log(result);

    res.status(201).json({
      message: 'Registration successful'
    });
  } catch (error) {
    res.status(400).json({ message: 'Error: ' + error });
  }
});

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: 'No user found'
      });
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({
        message: 'Incorrect password'
      });
    }

    const accessToken = jwt.sign(user.toJSON(), 'secret', { expiresIn: '1h' });

    res.json({
      token: accessToken,
      _id: user._id,
      message: 'Login successful',
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ message: 'Error: ' + error });
  }
});

router.post('/user/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with that email.' });
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;

    await user.save();

    sendResetEmail(email, resetToken);

    res.json({ message: 'Password reset instructions sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error });
  }
});


router.post('/user/reset-password', async (req, res) => {
  const { email, token, newPassword } = req.body;
  console.log(email, token, newPassword);

  try {
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid user or token.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(newPassword, salt);

    user.password = hashed;
    user.resetPasswordToken = undefined;

    await user.save();

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error });
  }
});
router.post('/user/update-profile', authMiddleware.authenticate , async (req, res) => {
  console.log(req._id);
  const _id = req._id;
  const { firstname, lastname, email, password, newPassword } = req.body;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    if (password) {
      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters long.' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      const newpasswordMatch = await bcrypt.compare(newPassword, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: 'Incorrect password.' });
      }
      else if (newpasswordMatch) {
        return res.status(400).json({ message: 'This password is existing.' });
      }
      else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);
        user.password = hashed;
      }
    }
    if (firstname !== undefined) {
      user.firstname = firstname;
    }
    if (lastname !== undefined) {
      user.lastname = lastname;
    }
    if (email !== undefined) {
      user.email = email;
    }

    await user.save();
    res.json({ message: 'Profile updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error });
  }
});

router.get('/user/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await User.find({ role: 'user' }, 'firstname coins')
      .sort({ coins: -1 })
      .exec();
      console.log(leaderboardData);
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'An error occurred while fetching leaderboard data.' });
  }
});

router.get('/user/list', async (req, res) => {
  try {
    // console.log(User[0]);
    const userData = await User.find({ role: 'user' },'firstname lastname');
    console.log(userData);
    res.json(userData);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data.' });
  }
});

module.exports = router;
