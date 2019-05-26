const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const userCtrl = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");


userRouter.post("/register", userCtrl.validateRegister, userCtrl.register);

userRouter.post("/login", passport.authenticate('local', {
    session: false
}), userCtrl.login);

userRouter.get("/secret", passport.authenticate("jwt", { session: false }), userCtrl.secret);

module.exports = userRouter;