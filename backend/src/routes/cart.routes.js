const express = require('express');
const router = express.Router();

const {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} = require('../controllers/cart.controller');
const { authenticate } = require('../middlewares/authenticate');

router.get('/', authenticate, getCartItems);
router.post('/', authenticate, addCartItem);
router.patch('/id/:id', authenticate, updateCartItem);
router.delete('/id/:id', authenticate, deleteCartItem);

module.exports = {
  cartRouter: router,
};
