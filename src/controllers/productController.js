const Product = require("../models/productModel");
const mongoose = require('mongoose');

class ProductController {

    async createProduct(req, res) {
        try {
            const product = await Product.create(req.body);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ "message": "server error", "error": error });
        }
    }

}

module.exports = new ProductController();