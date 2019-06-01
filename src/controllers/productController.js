const productModel = require("../models/productModel");
const mongoose = require('mongoose');

class ProductController {

    async createProduct(req, res) {
        try {
            const product = await productModel.create(req.body);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({ "message": "server error", "error": error });
        }
    }

    async updateProduct(req, res) {
        try {
            //get product ID
            const id = req.params.productId;

            const product = await productModel.findById(id);

            const updatedProducts = await product.update(req.body);

            return res.status(200).json(updatedProducts);
        } catch (error) {
            return res.status(500).json({ "message": "server error", "error": error });
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.productId;

        await productModel.findByIdAndRemove({ _id: id });

        res.status(200).json({
            msg: "Success"
        });
    }

}

module.exports = new ProductController();