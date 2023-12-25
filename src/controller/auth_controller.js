const AuthModel = require("../models/auth_model");
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const authController = {
    // Register User
    registerUser: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array().map((err) => err.msg) });
            } else {
                const { firstName, lastName, email, phoneNumber, password } = req.body;
                const salt = await bcrypt.genSalt(10);
                const securePassword = bcrypt.hashSync(password, salt);
                await AuthModel.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: securePassword,
                }).then((user) => {
                    return res.status(200).json(user);
                })
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    },
    // Login User
    loginUser: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array().map((err) => err.msg) });
            } else {
                const { email, password } = req.body;
                await AuthModel.findOne({ email })
                    .then((user) => {
                        bcrypt.compare(password, user.password).then((pass) => {
                            if (pass) {
                                const token = jwt.sign(user.id, process.env.JWT_SECRET);
                                res.status(200).json({ token: token })
                            } else {
                                return res.status(400).json("Please Login with correct Password");
                            }
                        })
                    }).catch((err) => {
                        return res.status(400).json({ error: "Please Login with correct Email" });
                    })
            }
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}

module.exports = authController;