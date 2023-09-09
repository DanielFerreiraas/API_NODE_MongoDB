const mongoose = require("../database");

const UserSChema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default : Date.now
    }
});

const User = mongoose.model("User", UserSChema);

module.exports = User;