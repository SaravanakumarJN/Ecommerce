const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    paymentId: {},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model('order', orderSchema);

module.exports = { Order };
