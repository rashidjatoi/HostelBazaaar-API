const AuthModel = require("../models/auth_model");
const { validationResult } = require('express-validator');

const authController = {
    // Register User
    registerUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            res.send("Register User Function")
        }
    },
    // Login User
    loginUser: async (req, res) => {
        res.send("Login User Function")
    }
}

module.exports = authController;