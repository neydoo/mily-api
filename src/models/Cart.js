const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;