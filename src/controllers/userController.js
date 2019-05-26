const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const checkAuth = require('../middleware/checkAuth');

dotenv.config();

class UserController {

    constructor() {
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.secret = this.secret.bind(this);

    }

    async register(req, res) {
        try {
            const findUser = await User.findOne({ email: req.body.email });

            if (findUser) {
                return res.status(401).json({ "Error": "Email is already in use" });
            }

            const newUser = new User(req.body);

            newUser.save((err, user) => {
                if (err) {
                    return next(err);
                }

                if (!user) {
                    return res.status(500).json({ "error": "Please Input user details" });
                }

                const token = this.signToken(user._id);

                res.json({
                    accessToken: token,

                });
            });

            // const token = await this.signToken(newUser.id);

            // return res.status(200).json({ "token": token });
        } catch (error) {
            return res.status(500).json({ "message": "server error", "error": error });
        }


    }


    async login(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                return res.status(500).json({ "Error": "Please enter email and password" });
            }


            const token = this.signToken(req.user);

            // console.log(token);

            res.status(200).json({
                accessToken: token,
                email: req.user.email,
                id: req.user.id,
                fullname: req.user.fullName
            });

        } catch (error) {
            return res.status(500).json({ "message": "server error", "error": error });
        }
    }

    async secret(req, res, next) {
        res.json({
            message: "secret resource",
            id: req.user.id,
            email: req.user.email
        });
    }

    signToken(id) {
        return JWT.sign({
            iss: "Albert",
            sub: id
        }, process.env.JWT_SECRET);
    }

    validateRegister(req, res, next) {
        req.sanitizeBody("firstname");
        req.sanitizeBody("lastname");
        req.checkBody("firstname", "first name cannot be blank")
            .trim()
            .notEmpty();
        req.checkBody("lastname", "last name cannot be blank")
            .trim()
            .notEmpty();
        req.checkBody("email", "Email is not valid").isEmail();
        req.checkBody(
            "password",
            "Password must be at least 6 characters long"
        ).len({
            min: 6
        });
        req.sanitizeBody("email").normalizeEmail({
            gmail_remove_dots: false,
            gmail_remove_subaddress: false
        });

        const errors = req.validationErrors();

        if (errors) {
            return res.status(500).json({ errors });
        }
        next();
    }

}



module.exports = new UserController();