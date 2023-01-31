const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const { connect } = require('./config/db.config');
const { authRouter } = require('./routes/auth.routes');
const { productRouter } = require('./routes/product.routes');
const { cartRouter } = require('./routes/cart.routes');
const { orderRouter } = require('./routes/order.routes');
const { userRouter } = require('./routes/user.routes');

const app = express();
app.use(
  cors({
    origin: '*',
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/user', userRouter);

let port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connect();
  } catch (error) {
    console.log(`Error in connecting to DB: ${error.message}`);
  }
  app.listen(port, () => {
    console.log(`DB connected and server listening on port ${port}`);
  });
};

module.exports = { start };
