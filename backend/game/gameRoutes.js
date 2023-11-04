const express = require('express');
const router = express.Router();
const Progress = require('./progressModel');
const Level = require('./levelModel');
const User = require('../user/userModel');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/game/rewards', authMiddleware.authenticate, async (req, res) => {
  try {
    // console.log(req);
    const { score, bestTime, levelNo } = req.body;
    const userId = req._id;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const level = await Level.findOne({ level_no: levelNo });
    if (!level) {
      return res.status(404).json({ error: 'Level not found' });
    }

    let progress = await Progress.findOne({ user_id: user._id, level_id: level._id });
    // console.log(progress, level, user, score, bestTime, levelNo);
    if (!progress) {
      progress = new Progress({
        level_id: level._id,
        user_id: user._id,
        best_time: bestTime,
        best_score: score,
        is_complete: true,
        algo: level.algorithm_name,
      });
      // level.is_complete = true;
      user.coins += Math.ceil(score);
    } else {
      if (bestTime < progress.best_time) {
        progress.best_time = bestTime;
      }
      if (score > progress.best_score) {
        progress.best_score = score;
      }
    }
    await user.save();
    // await level.save();
    await progress.save();

    res.status(201).json({ message: 'Reward saved successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/add/levels', async (req, res) => {
  try {
    const { algorithm_name, level_no } = req.body;
    const level = new Level({ algorithm_name, level_no });
    await level.save();
    res.status(201).json({ message: 'Level added successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to add a new level' });
  }
});

router.get('/progress/reports', authMiddleware.authenticate, async (req, res) => {
  try {
    const userId = req._id;
    const user = await User.find({ _id: userId });
    const progressReports = await Progress.find({ user_id: userId });
    if (!progressReports) {
      return res.status(404).json({ error: 'Progress Reports not found' });
    }
    // console.log(progressReports);
    res.status(201).json({ reports: progressReports , coins: user[0].coins});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to get progress reports' });
  }
});

router.get('/level/info', authMiddleware.authenticate, async (req, res) => {
  try {
    const levelInfo = await Level.find();
    if (!levelInfo) {
      return res.status(404).json({ error: 'Level Info not found' });
    }
    res.status(201).json({ levelInfo: levelInfo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to get level info' });
  }
});

router.get('/admin/level', async (req, res) => {
  try {
    const levelData = await Level.find({ algorithm_name: { $ne: 'general' } }); 
    console.log(levelData);
    res.json(levelData);
  } catch (error) {
    console.error('Error fetching levels:', error);
    res.status(500).json({ error: 'An error occurred while fetching level data.' });
  }
});

module.exports = router;