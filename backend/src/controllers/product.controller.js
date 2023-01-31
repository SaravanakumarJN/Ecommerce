const { Category } = require('../models/Category.model');
const { Product } = require('../models/Product.model');
const { errorTemplate } = require('../utilities/errorTemplate');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 0 } })
      .lean()
      .exec();
    return res.status(200).json({
      error: false,
      data: products,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id })
      .populate('categoryId')
      .lean()
      .exec();
    return res.status(200).json({
      error: false,
      data: product,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getProductByName = async (req, res) => {
  const { name } = req.params;

  try {
    if (name) {
      const products = await Product.find({
        name: new RegExp(name, 'i'),
      })
        .lean()
        .exec();

      res.status(200).json({ error: false, data: products });
    } else {
      return getProducts(req, res);
    }
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.find({}).lean().exec();
    return res.status(200).json({
      error: false,
      data: category,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getProductByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    if (category) {
      const categoryId = await Category.findOne({
        name: new RegExp(category, 'i'),
      })
        .lean()
        .exec();

      const products = await Product.find({ categoryId }).lean().exec();
      res.status(200).json({ error: false, data: products });
    } else {
      return getProducts(req, res);
    }
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getProductByCategoryId = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const products = await Product.find({ categoryId: id }).lean().exec();
      res.status(200).json({ error: false, data: products });
    } else {
      return getProducts(req, res);
    }
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const addCategory = async (req, res) => {
  let { name } = req.body;

  try {
    const category = await Category.create({
      name,
    });
    return res.status(200).json({
      error: false,
      data: category,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const addProduct = async (req, res) => {
  let { name, specification, price, quantity, categoryId } = req.body;
  let { user_id: sellerId } = req;

  try {
    const product = await Product.create({
      name,
      specification,
      price,
      quantity,
      categoryId,
      sellerId,
    });
    return res.status(200).json({
      error: false,
      data: product,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getAllProductsOfSeller = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user_id })
      .populate('categoryId')
      .lean()
      .exec();
    return res.status(200).json({
      error: false,
      data: products,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    let updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: updated,
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id).exec();

    return res.status(200).json({
      error: false,
      data: 'Deleted Successfully',
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  getCategory,
  getProductByCategory,
  addProduct,
  getAllProductsOfSeller,
  updateProduct,
  deleteProduct,
  addCategory,
  getProductByCategoryId
};
