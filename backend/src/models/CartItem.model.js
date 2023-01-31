const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'product',
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    versionKey: false,
  }
);

const CartItem = mongoose.model('cartItem', cartItemSchema);

module.exports = { CartItem };
