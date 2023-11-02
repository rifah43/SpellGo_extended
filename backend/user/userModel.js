const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        required: false
    },
    coins: {
        type: Number,
        default: 0,
        required: false
    },
    theme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theme' ,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
