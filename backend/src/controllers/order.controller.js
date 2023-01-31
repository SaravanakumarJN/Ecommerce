const mongoose = require('mongoose');

const { CartItem } = require('../models/CartItem.model');
const { Order } = require('../models/Order.model');
const { OrderItem } = require('../models/OrderItem.model');
const { errorTemplate } = require('../utilities/errorTemplate');
const { Product } = require('../models/Product.model');

const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find({ customerId: req.user_id }).lean().exec();
    orders = orders.map((e) => e._id);
    orders = await OrderItem.find({ orderId: { $in: orders } })
      .populate('productId')
      .lean()
      .exec();

    let structuredOrders = {};
    orders?.forEach((ele) => {
      if (!structuredOrders[ele.orderId]) {
        structuredOrders[ele.orderId] = [ele];
      } else {
        structuredOrders[ele.orderId].push(ele);
      }
    });
    structuredOrders = Object.values(structuredOrders);

    return res.status(200).json({
      error: false,
      data: structuredOrders,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getOrderById = async (req, res) => {
  let { id } = req.params;
  try {
    const order = await OrderItem.find({ orderId: id })
      .populate('productId')
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: order,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const placeOrder = async (req, res) => {
  try {
    let cartItems = await CartItem.find({ customerId: req.user_id })
      .lean()
      .exec();

    if (cartItems.length) {
      const order = await Order.create({ customerId: req.user_id });
      const { _id } = order;

      let orderItemPayload = [];
      let productPaylaod = [];
      cartItems.forEach((e) => {
        orderItemPayload.push({
          orderId: _id,
          productId: e.productId,
          quantity: e.quantity,
        });

        let pipline = {
          updateOne: {
            filter: {
              _id: e.productId,
            },
            update: { $inc: { quantity: -1 * e.quantity } },
          },
        };
        console.log(pipline.updateOne.update.$set);

        productPaylaod.push(pipline);
      });

      await Product.bulkWrite(productPaylaod);

      await CartItem.deleteMany({ customerId: req.user_id });
      await OrderItem.insertMany(orderItemPayload);

      return res.status(200).json({
        error: false,
        data: 'Order placed',
      });
    } else {
      return res.status(200).json({
        error: false,
        data: 'No item in cart',
      });
    }
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = { getAllOrders, getOrderById, placeOrder };
