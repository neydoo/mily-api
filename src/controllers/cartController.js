const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");

class CartController {
  async saveCart(req, res) {
    try {
      const { cartItems } = req.body;
      const user = req.user.id;

      if (!cartItems) {
        return res.status(400).json({ message: "invalid data" });
      }
      const order = await Cart.create(user);

      cartItems.map(cartItem => {
        cartItem.order = order._id;
        CartItem.create(cartItem);
      });
      return res.status(200).json({ message: "saved cart succesfully" });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "there was an error saving cart" });
    }
  }

  async viewCart(req, res) {
    try {
      const { id } = req.params;

      const cart = await cartItems.find({ _id: id });
      if (!cart) {
        return res.status(200).json({ message: "invalid id" });
      }
      return res.status(200).json({ message: "cart retrieved", cart });
    } catch (err) {
      return res.status(400).json({ message: "error retrieving cart" });
    }
  }

  async viewAllCarts(req, res) {
    try {
      const userId = req.user.id;
      const userCart = await Cart.find({ user: userId });

      if (!userCart) {
        return res
          .status(400)
          .json({ message: "No orders available for user" });
      }
      return res.status(200).json({ message: "carts retrieved", userCart });
    } catch (error) {
      return res.status(400).json({ message: "error retrieving user's carts" });
    }
  }
}
module.exports = new CartController();
