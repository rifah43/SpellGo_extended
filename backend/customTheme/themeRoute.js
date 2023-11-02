const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const Theme = require('./themeModel.js')

router.post('/theme/edit', authMiddleware.authenticate, async (req, res) => {
    try {
        const { backgroundImage, textColor, buttonColor } = req.body;
        const themeID = req.theme;

        const theme = await Theme.findOne({ _id: themeID });
        if (!theme) {
            return res.status(404).json({ error: 'Theme not found' });
        }

        theme.bgImagePath = backgroundImage;
        theme.textColor = textColor;
        theme.buttonColor = buttonColor;

        theme.save();

        res.status(201).json({ message: 'Theme saved successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to save theme' });
    }
});

module.exports = router;