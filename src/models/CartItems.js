/**
 * This model CartItems.js is for items that are ordered, they'll each have their Id, and have an orderId, to let us know
 * what order the item belongs to
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItem = new Schema({
  order: {
    type: ObjectId,
    ref: "Cart",
    required: true
  },
  items: {
    type: ObjectId,
    ref: 'Product',
    required: true
  },
  quantity:{
    type: Number,
    required: true
  }
});

const Cart = mongoose.model("Cart", CartItem);

module.exports = Cart;
