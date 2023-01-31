const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product"
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

const OrderItem = mongoose.model('orderItem', orderItemSchema);

module.exports = { OrderItem };
