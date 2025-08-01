const express = require('express');
const app = express();
const userRoute = require('./Routes/userRoute');
const authRoute = require('./Routes/authRoute');
const productRoute = require('./Routes/productRoutes');
const orderRoute = require('./Routes/orderRoute.js');
const paymentRoute = require('./Routes/paymentRoute.js');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./Database/db.js');
require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.use('/api/payment', paymentRoute);

app.listen(7000, () => {
  console.log(`Server is running on http://localhost:7000`);
});