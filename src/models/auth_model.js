const mongoose = require("mongoose");
const { validationResult, checkSchema } = require('express-validator');
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
    phoneNumber: {
        type:Number,
        required:true,
    },
    password: {
        type:String,
        required:true
    },
},)

module.exports = mongoose.model("auth", authSchema);