const express = require('express');
const productRouter = express.Router();

const productCtrl = require("../controllers/productController");

productRouter.post("/create-product", productCtrl.createProduct);

module.exports = productRouter;