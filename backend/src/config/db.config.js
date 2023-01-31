const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
const connect = () => {
  return new mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connect };
