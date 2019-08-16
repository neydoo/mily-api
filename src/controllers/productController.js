const Product = require("../models/Product");
const mongoose = require("mongoose");

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await Product.create(req.body);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ message: "server error", error: error });
    }
  }
  async listProducts(req, res) {
    try {
      const products = await Product.find({});

      return res
        .status(200)
        .json({ message: "products retrieved succesfully", products });
    } catch (err) {
      return res.status(500).json({ message: "server error", err });
    }
  }

  async viewProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id });

      return res.status(200).json({ message: "retrieved product", product });
    } catch (error) {
      return res.status(500).json({ message: "server error", err });
    }
  }

  async updateProduct(req, res) {
    try {
      //get product ID
      const id = req.params.productId;

      const product = req.body;

      const updatedProduct = await Product.update({ _id: id }, { product });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: "server error", error: error });
    }
  }

  async deleteProduct(req, res) {
    const id = req.params.productId;

    await Product.findByIdAndRemove({ _id: id });

    res.status(200).json({
      msg: "Success"
    });
  }
}

module.exports = new ProductController();
