const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: [true, 'username already taken.']
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'account already exist with this email address.']
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;