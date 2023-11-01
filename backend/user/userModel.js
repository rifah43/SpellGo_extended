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
    role:{
      type: String,
      required: true
    },
    resetPasswordToken: {
        type: String,
        required: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;