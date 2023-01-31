const { CartItem } = require('../models/CartItem.model');
const { errorTemplate } = require('../utilities/errorTemplate');

const getCartItems = async (req, res) => {
  try {
    let cartItems = await CartItem.find({
      customerId: req.user_id,
    })
      .populate('productId')
      .lean()
      .exec();

    cartItems = cartItems.map((e) => {
      return { ...e, totalPrice: e.quantity * e.productId.price };
    });
    return res.status(200).json({
      error: false,
      data: cartItems,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const addCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const previousCartItem = await CartItem.findOne({
      productId,
      customerId: req.user_id,
    })
      .lean()
      .exec();

    let cartItem;
    if (previousCartItem) {
      cartItem = await CartItem.updateOne(
        {
          productId,
          customerId: req.user_id,
        },
        { quantity: previousCartItem.quantity + quantity },
        {
          new: true,
        }
      ).exec();
    } else {
      cartItem = await CartItem.create({
        customerId: req.user_id,
        productId,
        quantity,
      });
    }

    return res.status(200).json({
      error: false,
      data: cartItem,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (quantity === 0) {
    await deleteCartItem(req, res);
  } else {
    try {
      const updatedItem = await CartItem.findByIdAndUpdate(
        id,
        { quantity },
        {
          new: true,
        }
      )
        .lean()
        .exec();

      return res.status(200).json({
        error: false,
        data: updatedItem,
      });
    } catch (error) {
      return errorTemplate(res, 400, error.message);
    }
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  try {
    await CartItem.findByIdAndDelete(id).exec();

    return res.status(200).json({
      error: false,
      data: 'Deleted successfully',
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = { getCartItems, addCartItem, deleteCartItem, updateCartItem };
