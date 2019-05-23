const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const userCtrl = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");


userRouter.post("/register", userCtrl.validateRegister, userCtrl.register);

userRouter.post("/login", passport.authenticate('local', {
    session: false
}), userCtrl.login);

userRouter.get("/secret", checkAuth, userCtrl.secret);

module.exports = userRouter;