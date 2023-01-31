const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByName,
  getProductByCategory,
  addProduct,
  getCategory,
  getAllProductsOfSeller,
  updateProduct,
  deleteProduct,
  addCategory,
  getProductByCategoryId
} = require('../controllers/product.controller');
const { authenticate } = require('../middlewares/authenticate');

router.get('/', getProducts);
router.get('/id/:id', getProductById);
router.get('/name/:name', getProductByName);
router.get('/category', getCategory);
router.get('/category/:id', getProductByCategoryId);
router.post('/category', authenticate, addCategory);
router.post('/', authenticate, addProduct);
router.patch('/id/:id', authenticate, updateProduct);
router.delete('/id/:id', authenticate, deleteProduct);
router.get('/all', authenticate, getAllProductsOfSeller);

module.exports = {
  productRouter: router,
};
