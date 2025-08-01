const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} = require('../Controllers/orderController.js');

const { verifyToken } = require('../Middleware/authMiddleware.js');

// 🧾 Place a new order (User)
router.post('/place', verifyToken, createOrder);

// 📦 Get orders for logged-in user
router.get('/my-orders', verifyToken, getMyOrders);

// 🛠️ Admin: Get all orders with pagination
router.get('/all', verifyToken, getAllOrders);

// 🟢 Admin: Update order status
router.put('/:id/status', verifyToken, updateOrderStatus);

module.exports = router;
