const express = require('express');
const productRouter = express.Router();

const productCtrl = require("../controllers/productController");

productRouter.post("/create-product", productCtrl.createProduct);

productRouter.patch("/updateProduct/:productId", productCtrl.updateProduct);

productRouter.delete("/deleteProduct/:productId", productCtrl.deleteProduct);


module.exports = productRouter;