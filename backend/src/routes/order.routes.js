const express = require('express');
const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  placeOrder,
} = require('../controllers/order.controller');
const { authenticate } = require('../middlewares/authenticate');

router.get('/', authenticate, getAllOrders);
router.get('/id/:id', authenticate, getOrderById);
router.post('/place-order', authenticate, placeOrder);

module.exports = {
  orderRouter: router,
};
