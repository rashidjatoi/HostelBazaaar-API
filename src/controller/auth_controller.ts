const AuthModel = require("../models/auth_model");


const authController = {
    // Register User
    registerUser: async (req, res) => {
        res.send("Register User Function")
    },
    // Login User
    loginUser: async (req, res) => {
        res.send("Login User Function")
    }
}

module.exports = authController;