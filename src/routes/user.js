const express = require('express');
const userRouter = express.Router();

const userCtrl = require("../controllers/userController");

userRouter.post("/register", userCtrl.register);

module.exports = userRouter;