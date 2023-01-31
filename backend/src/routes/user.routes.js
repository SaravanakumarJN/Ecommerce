const express = require('express');
const router = express.Router();

const { getUserDetails } = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/authenticate');

router.get('/', authenticate, getUserDetails);

module.exports = {
  userRouter: router,
};
