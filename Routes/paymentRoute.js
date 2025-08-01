const express = require('express');
const router = express.Router();
const { createRazorpayOrder } = require('../Controllers/paymentController');

router.post('/order', createRazorpayOrder);

module.exports = router;
