const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
    bgImagePath: {
        type: String,
        required: true,
    },
    textColor: {
        type: String,
        required: true
    },
    buttonColor: {
        type: String,
        required: true
    },
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;