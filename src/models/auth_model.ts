const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {},
    password: {},
})

const authModel = mongoose.model("auth", authSchema);

module.exports = authModel;