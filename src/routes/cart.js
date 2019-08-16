const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");

cartRouter.get("/cart/:id", cartController.viewCart);

cartRouter.get("/orders", cartController.viewAllCarts);

cartRouter.post("/create-order", cartController.saveCart);

module.exports = cartRouter;
