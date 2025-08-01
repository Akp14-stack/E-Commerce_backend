const Order = require('../Models/Order');
const User = require('../Models/userModel');

// POST /api/orders/place
const createOrder = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({ status: false, message: 'Unauthorized: No user found' });
    }

    const { items, total, address, mobile, paymentMethod, razorpayOrderId, razorpayPaymentId } = req.body;

    // Basic validations
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ status: false, message: 'Cart items are required' });
    }

    if (!total || total <= 0) {
      return res.status(400).json({ status: false, message: 'Total amount must be valid' });
    }

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ status: false, message: 'Delivery address is required' });
    }

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ status: false, message: 'Valid 10-digit mobile number is required' });
    }

    const newOrder = await Order.create({
      user: userId,
      items,
      total,
      address,
      mobile,
      paymentMethod: paymentMethod || 'cod',
      razorpayOrderId,
      razorpayPaymentId,
    });

    res.status(201).json({ status: true, message: 'Order placed successfully', order: newOrder });

  } catch (err) {
    console.error('❌ Error placing order:', err);
    res.status(500).json({ status: false, message: 'Order failed', error: err.message });
  }
};

// GET /api/orders/my
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({ status: false, message: 'Unauthorized: No user found' });
    }

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ status: true, orders });
  } catch (err) {
    console.error('❌ Error fetching user orders:', err);
    res.status(500).json({ status: false, message: 'Failed to fetch orders', error: err.message });
  }
};

// GET /api/orders/all?page=1
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalOrders = await Order.countDocuments();
    const orders = await Order.find()
      .populate('user', 'name email mobile')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      status: true,
      orders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error('❌ Error fetching all orders:', err);
    res.status(500).json({ status: false, message: 'Error fetching orders', error: err.message });
  }
};

// PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ status: false, message: 'Status is required' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ status: false, message: 'Order not found' });
    }

    res.json({ status: true, message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    console.error('❌ Error updating order status:', err);
    res.status(500).json({ status: false, message: 'Failed to update status', error: err.message });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
