const AuthModel = require("../models/auth_model");
const { validationResult } = require("express-validator");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  // Register User
  registerUser: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array().map((err) => err.msg) });
      } else {
        const { firstName, lastName, email, phoneNumber, password, admin } = req.body;
        const salt = await bcrypt.genSalt(10);
        const securePassword = bcrypt.hashSync(password, salt);
        await AuthModel.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          password: securePassword,
          admin: admin
        }).then((user) => {
          return res.status(200).json({ message: "Account Created Successfully", user });
        });
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
        return res
          .status(400)
          .json({ errors: errors.array().map((err) => err.msg) });
      } else {
        const { email, password } = req.body;
        await AuthModel.findOne({ email })
          .then((user) => {
            bcrypt.compare(password, user.password).then((pass) => {
              if (pass) {
                const payload = {
                  user: {
                    id: user.id,
                    admin: user.admin
                  }
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET);
                res.json({ token: token, user });
              } else {
                return res
                  .status(400)
                  .json("Please Login with correct Password");
              }
            });
          })
          .catch((err) => {
            return res
              .status(400)
              .json({ error: "Please Login with correct Email" });
          });
      }
    } catch (error) {
      return res.status(400).json(error.message);
    }
  },
};

module.exports = authController;
