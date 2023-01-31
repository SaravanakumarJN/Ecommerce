import axios from 'axios';
import { getItem } from './localStorage';
let { REACT_APP_BASE_URL: base_url } = process.env;
base_url = base_url || 'http://localhost:8080';

const loginUser = (payload) => {
  return axios
    .post(`${base_url}/api/auth/login`, payload)
    .then((res) => res.data);
};

const registerUser = (payload) => {
  return axios
    .post(`${base_url}/api/auth/register`, payload)
    .then((res) => res.data);
};

const getUserDetails = () => {
  let token = getItem('token');

  return axios
    .get(`${base_url}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const getProducts = () => {
  return axios.get(`${base_url}/api/product`).then((res) => res.data);
};

const getProductBySearch = (searchQuery) => {
  return axios
    .get(`${base_url}/api/product/name/${searchQuery}`)
    .then((res) => res.data);
};

const getProductById = (searchQuery) => {
  return axios
    .get(`${base_url}/api/product/id/${searchQuery}`)
    .then((res) => res.data);
};

const getProductByCategory = (searchQuery) => {
  return axios
    .get(`${base_url}/api/product/category/${searchQuery}`)
    .then((res) => res.data);
};

const getAllAdminProducts = () => {
  let token = getItem('token');

  return axios
    .get(`${base_url}/api/product/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const updateProduct = (payload, id = null) => {
  let token = getItem('token');

  return axios
    .patch(`${base_url}/api/product/id/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const addProduct = (payload, id = null) => {
  let token = getItem('token');

  return axios
    .post(`${base_url}/api/product/`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const getCategory = () => {
  return axios.get(`${base_url}/api/product/category`).then((res) => res.data);
};

const addCategory = (payload) => {
  let token = getItem('token');

  return axios
    .post(`${base_url}/api/product/category`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const addProductToCart = (payload) => {
  let token = getItem('token');

  return axios
    .post(`${base_url}/api/cart`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const getUserCartDetails = () => {
  let token = getItem('token');

  return axios
    .get(`${base_url}/api/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const updateProductInCart = (id, payload) => {
  let token = getItem('token');

  return axios
    .patch(`${base_url}/api/cart/id/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const deleteProductFromCart = (id) => {
  let token = getItem('token');

  return axios
    .delete(`${base_url}/api/cart/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

const placeOrder = () => {
  let token = getItem('token');

  return axios
    .post(`${base_url}/api/order/place-order`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export {
  loginUser,
  registerUser,
  getProducts,
  getUserDetails,
  getAllAdminProducts,
  getProductBySearch,
  getProductById,
  updateProduct,
  addProduct,
  getCategory,
  addCategory,
  addProductToCart,
  getUserCartDetails,
  deleteProductFromCart,
  updateProductInCart,
  getProductByCategory,
  placeOrder,
};
