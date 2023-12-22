const authRouter = require("express").Router();
const AuthController = require("../controller/auth_controller");
const AuthModel = require("../models/auth_model");
const { check } = require("express-validator");

authRouter.post("/api/auth/register", [
    check('firstName', "Please Enter a First Name").not().isEmpty().trim().escape(),
    check('lastName', "Please Enter a Last Name").not().isEmpty().trim().escape(),
    check("email").isEmail().custom((value, { req }) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ 'email': req.body.email }).then((user) => {
                console.log(user);
                if (user) {
                    reject(new Error("E-mail already in use"));
                } else {
                    resolve(true);
                }
            }).catch((err) => {
                reject(new Error(err));
            });
        });
    }),
], AuthController.registerUser);


authRouter.post("/api/auth/login", AuthController.loginUser);

module.exports = authRouter;