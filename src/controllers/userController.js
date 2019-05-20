const JWT = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require('mongoose');

class UserController {

    async register(req, res) {
        try {
            const findUser = await User.findOne(req.body.email);
            if (findUser) {
                return res.status(401).json({ "Error": "Email is already in use" });
            }
            const newUser = await User.create(req.body);
            return res.status(200).json(newUser);

            JWT.sign({
                iss: "Albert",
                sub: newUser._id
            }, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(500).json({ "message": "server error", "error": error });
        }


    }

}

module.exports = new UserController();