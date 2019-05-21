const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

class UserController {

    constructor() {
        this.register = this.register.bind(this);
        // this.login = this.login.bind(this);
    }

    async register(req, res) {
        try {
            const findUser = await User.findOne({ email: req.body.email });
            if (findUser) {
                return res.status(401).json({ "Error": "Email is already in use" });
            }
            const newUser = await User.create(req.body);

            const token = await this.signToken(newUser.id);

            return res.status(200).json({ "token": token });
        } catch (error) {
            return res.status(500).json({ "message": "server error", "error": error });
        }


    }

    signToken(id) {
        return JWT.sign({
            iss: "Albert",
            sub: id
        }, process.env.JWT_SECRET);
    }

}

module.exports = new UserController();