const mongoose = require("../database");

const bcrypt = require("bcryptjs");

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

UserSChema.pre("save", async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    // this.name = hash;
    // this.email = hash;
    this.password = hash;
})

const User = mongoose.model("User", UserSChema);

module.exports = User;